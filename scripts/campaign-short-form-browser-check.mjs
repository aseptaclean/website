import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = process.env.AC_LOCAL_BASE || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = "output/campaign-short-form-qa";
const campaigns = [
  {
    key: "rodent",
    route: "/rodent-dropping-cleanup-san-jose/assessment/",
    formId: "rodent-form-panel",
    context: "rodent_assessment",
    situation: "Rodent droppings or animal waste",
    submit: "Send Message",
    thankYou: "/rodent-dropping-cleanup-san-jose/assessment/thank-you/"
  },
  {
    key: "estate",
    route: "/estate-cleanout-san-jose/assessment/",
    formId: "request-walkthrough-panel",
    context: "estate_assessment",
    situation: "Inherited or estate property",
    submit: "Request an Assessment",
    thankYou: "/estate-cleanout-san-jose/assessment/thank-you/"
  }
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const results = [];
let failures = 0;
const check = (campaign, label, passed, detail = "") => {
  const result = { campaign: campaign.key, label, passed: Boolean(passed), detail };
  results.push(result);
  console.log(`${passed ? "PASS" : "FAIL"} ${campaign.key}: ${label}${detail ? ` — ${detail}` : ""}`);
  if (!passed) failures += 1;
};

const blockExternalTracking = async (page) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (
      ["googletagmanager.com", "google-analytics.com", "googleadservices.com", "doubleclick.net"].some(
        (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
      )
    ) {
      return route.abort("blockedbyclient");
    }
    return route.continue();
  });
};

const removeTurnstile = (form) =>
  form.evaluate((element) => element.querySelectorAll(".cf-turnstile").forEach((node) => node.remove()));

const fillRequired = async (form) => {
  await form.locator('input[name="full_name"]').fill("Controlled browser QA");
  await form.locator('input[name="phone"]').fill("4085550100");
  await form.locator('input[name="privacy_consent"]').check();
};

const fillOptional = async (form, withPhoto) => {
  await form.locator('input[name="email"]').fill("qa@aseptaclean.com");
  await form.locator('select[name="campaign_role"]').selectOption({ index: 1 });
  await form.locator('textarea[name="property_detail"]').fill("Controlled optional browser QA details.");
  if (withPhoto) {
    await form.locator('input[name="property_media[]"]').setInputFiles({
      name: "controlled-browser-qa.jpg",
      mimeType: "image/jpeg",
      buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9])
    });
  }
};

const successPayload = {
  ok: true,
  submissionId: "11111111-2222-4333-8444-555555555555",
  confirmationCode: "AC-1A2B3C",
  callbackWindow: "next-business-window",
  confirmationEmailSent: true
};

try {
  for (const campaign of campaigns) {
    // Rendered DOM, exact order, required states, hidden campaign/service identity, and layout.
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await blockExternalTracking(page);
    await page.goto(base + campaign.route, { waitUntil: "domcontentloaded" });
    const declineCookies = page.getByRole("button", { name: "Decline", exact: true });
    await declineCookies.waitFor({ state: "visible", timeout: 3_000 }).catch(() => {});
    if (await declineCookies.isVisible().catch(() => false)) await declineCookies.click();
    const form = page.locator(`#${campaign.formId}`);
    const shape = await form.evaluate((element) => {
      const controls = [...element.querySelectorAll("input, select, textarea")];
      const visible = controls
        .filter((control) => {
          if (control.type === "hidden") return false;
          if (control.name === "company_website" || control.name === "privacy_consent") return false;
          return true;
        })
        .map((control) => ({
          name: control.name,
          required: control.required,
          label: element.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent?.replace(/\s+/g, " ").trim()
        }));
      return {
        visible,
        hiddenContext: element.querySelector('input[name="campaign_context"]')?.value,
        hiddenService: element.querySelector('input[name="property_situation"]')?.value,
        submit: element.querySelector('button[type="submit"]')?.textContent?.replace(/\s+/g, " ").trim(),
        hasZip: Boolean(element.querySelector('[name="property_zip"]')),
        hasTimeline: Boolean(element.querySelector('[name="estate_timeline"]')),
        hasCondition: Boolean(element.querySelector('[name="property_status"], [name="estate_contents_level"], [name="additional_notes"]'))
      };
    });
    const expectedOrder = ["full_name", "phone", "email", "campaign_role", "property_detail", "property_media[]"];
    check(campaign, "visible fields are in the required six-field order", JSON.stringify(shape.visible.map((field) => field.name)) === JSON.stringify(expectedOrder), JSON.stringify(shape.visible));
    check(campaign, "only name and phone are required among visible fields", shape.visible.every((field, index) => field.required === (index < 2)));
    check(campaign, "removed ZIP, condition, timeline, and area inputs are absent", !shape.hasZip && !shape.hasTimeline && !shape.hasCondition);
    check(campaign, "hidden campaign and service identity match page configuration", shape.hiddenContext === campaign.context && shape.hiddenService === campaign.situation);
    check(campaign, "submit wording is preserved", shape.submit === campaign.submit, shape.submit);

    for (const viewport of [
      { width: 1440, height: 900, name: "desktop" },
      { width: 820, height: 1000, name: "tablet" },
      { width: 390, height: 844, name: "mobile" },
      { width: 320, height: 800, name: "narrow" }
    ]) {
      await page.setViewportSize(viewport);
      await form.scrollIntoViewIfNeeded();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      check(campaign, `${viewport.name} layout has no horizontal overflow`, !overflow);
      if (viewport.name !== "narrow") {
        await form.screenshot({
          path: `${outDir}/${campaign.key}-${viewport.name}.png`,
        });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await form.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    check(
      campaign,
      "mobile sticky actions do not cover the visible form or consent",
      await page.locator("[data-ppc-bar]").evaluate((bar) => bar.hidden)
    );
    // Browser 200% zoom on a 1280px display exposes a 640-CSS-pixel layout viewport. Testing the
    // actual narrow viewport (rather than CSS `zoom`) lets responsive rules reflow as they do in
    // Chrome and catches real horizontal clipping without manufacturing a 195px viewport.
    await page.setViewportSize({ width: 640, height: 900 });
    const zoomOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    check(campaign, "200% zoom reflow keeps the form readable without horizontal overflow", !zoomOverflow);
    await page.close();

    // Minimal success and all-optionals success, with and without photos, redirect correctly.
    for (const scenario of [
      { name: "name-phone-only", optional: false, photo: false },
      { name: "all-optionals-no-photo", optional: true, photo: false },
      { name: "all-optionals-with-photo", optional: true, photo: true }
    ]) {
      const successPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await blockExternalTracking(successPage);
      let requests = 0;
      let posted;
      await successPage.route("**/api/lead", async (route) => {
        requests += 1;
        posted = await new Request("http://local.test/api/lead", {
          method: "POST",
          headers: { "content-type": route.request().headers()["content-type"] },
          body: route.request().postDataBuffer()
        }).formData();
        await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify(successPayload) });
      });
      await successPage.goto(base + campaign.route, { waitUntil: "domcontentloaded" });
      const successForm = successPage.locator(`#${campaign.formId}`);
      await removeTurnstile(successForm);
      await fillRequired(successForm);
      if (scenario.optional) await fillOptional(successForm, scenario.photo);
      await successForm.locator('button[type="submit"]').click();
      await successPage.waitForURL((url) => url.pathname === campaign.thankYou, { timeout: 10_000 });
      check(campaign, `${scenario.name} submits once`, requests === 1);
      check(campaign, `${scenario.name} reaches campaign thank-you`, new URL(successPage.url()).pathname === campaign.thankYou);
      check(campaign, `${scenario.name} carries fixed service and attribution`, posted?.get("campaign_context") === campaign.context && posted?.get("property_situation") === campaign.situation && posted?.get("landing_page") === campaign.route);
      check(campaign, `${scenario.name} carries photo state correctly`, Number(posted?.getAll("property_media[]").filter((file) => file instanceof File && file.size).length || 0) === (scenario.photo ? 1 : 0));
      await successPage.close();
    }

    // Invalid local input never leaves the page or raises a success event.
    const invalidPage = await browser.newPage();
    await blockExternalTracking(invalidPage);
    let invalidRequests = 0;
    await invalidPage.route("**/api/lead", (route) => { invalidRequests += 1; return route.abort(); });
    await invalidPage.goto(base + campaign.route, { waitUntil: "domcontentloaded" });
    const invalidForm = invalidPage.locator(`#${campaign.formId}`);
    await removeTurnstile(invalidForm);
    await invalidForm.locator('input[name="email"]').fill("invalid-email");
    await invalidForm.evaluate((element) => element.requestSubmit());
    await invalidPage.waitForTimeout(100);
    check(campaign, "invalid inputs are rejected before submission", invalidRequests === 0 && (await invalidForm.locator('[aria-invalid="true"]').count()) > 0);
    await invalidPage.close();

    // A server failure preserves fields and does not redirect or claim success.
    const failurePage = await browser.newPage();
    await blockExternalTracking(failurePage);
    await failurePage.route("**/api/lead", (route) =>
      route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, message: "Controlled submission failure." }) })
    );
    await failurePage.goto(base + campaign.route, { waitUntil: "domcontentloaded" });
    const failureForm = failurePage.locator(`#${campaign.formId}`);
    await removeTurnstile(failureForm);
    await fillRequired(failureForm);
    await failureForm.locator('button[type="submit"]').click();
    await failurePage.waitForTimeout(150);
    check(campaign, "submission failure stays on page and preserves input", new URL(failurePage.url()).pathname === campaign.route && (await failureForm.locator('input[name="full_name"]').inputValue()) === "Controlled browser QA" && (await failureForm.locator('[data-ppc-form-status]').textContent())?.includes("Controlled submission failure."));
    await failurePage.close();

    // Two programmatic submits during one delayed request exercise the in-flight guard directly.
    const duplicatePage = await browser.newPage();
    await blockExternalTracking(duplicatePage);
    let duplicateRequests = 0;
    await duplicatePage.route("**/api/lead", async (route) => {
      duplicateRequests += 1;
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify(successPayload) });
    });
    await duplicatePage.goto(base + campaign.route, { waitUntil: "domcontentloaded" });
    const duplicateForm = duplicatePage.locator(`#${campaign.formId}`);
    await removeTurnstile(duplicateForm);
    await fillRequired(duplicateForm);
    await duplicateForm.evaluate((element) => { element.requestSubmit(); element.requestSubmit(); });
    await duplicatePage.waitForURL((url) => url.pathname === campaign.thankYou, { timeout: 10_000 });
    check(campaign, "duplicate clicks produce one network submission", duplicateRequests === 1, `requests=${duplicateRequests}`);
    await duplicatePage.close();
  }
} finally {
  await browser.close();
  await writeFile(`${outDir}/results.json`, JSON.stringify({ base, results }, null, 2));
}

if (failures) {
  console.error(`\n${failures} browser check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll browser checks passed. Screenshots and results: ${outDir}`);
}
