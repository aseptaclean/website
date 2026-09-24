import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { chromium } from "playwright-core";

const base = process.env.AC_LOCAL_BASE || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = "output/form-functional-qa";

const walk = async (directory) => {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else if (entry.name === "index.html") found.push(path);
  }
  return found;
};

const routeFor = (path) => {
  const name = relative("dist", path).replace(/\\/g, "/");
  return name === "index.html" ? "/" : `/${name.replace(/index\.html$/, "")}`;
};

const files = await walk("dist");
const routes = [];
for (const file of files) {
  const html = await readFile(file, "utf8");
  if (html.includes('action="/api/lead"')) routes.push(routeFor(file));
}
routes.sort();

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const results = [];
const failures = [];
const check = (route, label, passed, detail = "") => {
  const item = { route, label, passed: Boolean(passed), detail };
  results.push(item);
  if (!passed) failures.push(item);
};

const markerFor = (route) =>
  `ASEPTACLEAN LOCAL QA TEST ${route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;

const optionalEmailCampaigns = new Set([
  "/estate-cleanout-san-jose/assessment/",
  "/rodent-dropping-cleanup-san-jose/assessment/"
]);

const fill = async (page, form, route) => {
  const marker = markerFor(route);
  await form.locator('input[name="full_name"]').fill(marker);
  await form.locator('input[name="phone"]').fill("4085550100");
  const email = form.locator('input[name="email"]');
  if (await email.count()) await email.fill("qa@example.test");
  const zip = form.locator('input[name="property_zip"]');
  if (await zip.count()) await zip.fill("95113");

  for (const textarea of await form.locator("textarea:not([disabled])").all()) {
    await textarea.fill(`${marker} — no service requested.`);
  }
  for (const select of await form.locator("select:not([disabled])").all()) {
    const options = await select.locator("option").evaluateAll((nodes) =>
      nodes.map((node) => node.value).filter(Boolean)
    );
    if (options.length) await select.selectOption(options[0]);
  }
  const radioNames = await form
    .locator('input[type="radio"]:not([disabled])')
    .evaluateAll((nodes) => [...new Set(nodes.map((node) => node.name))]);
  for (const name of radioNames) {
    await form.locator(`input[type="radio"][name="${name}"]`).first().check();
  }
  for (const checkbox of await form.locator('input[type="checkbox"][required]:not([disabled])').all()) {
    await checkbox.evaluate((control) => {
      control.checked = true;
      control.dispatchEvent(new Event("input", { bubbles: true }));
      control.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }
  const file = form.locator('input[type="file"]');
  if (await file.count()) {
    await file.setInputFiles({
      name: "aseptaclean-local-qa.jpg",
      mimeType: "image/jpeg",
      buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9])
    });
  }
  await form.evaluate((element) => {
    element.querySelectorAll(".cf-turnstile").forEach((node) => node.remove());
  });
  return marker;
};

const multipart = async (request) => {
  const body = request.postDataBuffer();
  if (!body) return new Map();
  const parsed = await new Request("http://local.test/api/lead", {
    method: "POST",
    headers: { "content-type": request.headers()["content-type"] },
    body
  }).formData();
  return parsed;
};

const eventCapture = async (page, bucket) => {
  await page.exposeFunction("__captureFormQaEvent", (item) => bucket.push(item));
  await page.evaluate(() => {
    window.dataLayer ??= [];
    const push = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = (...items) => {
      for (const item of items) window.__captureFormQaEvent?.(item);
      return push(...items);
    };
  });
};

for (const route of routes) {
  console.log(`QA ${routes.indexOf(route) + 1}/${routes.length} ${route}`);
  const validationPage = await browser.newPage();
  let validationRequests = 0;
  const validationEvents = [];
  await validationPage.route("**/api/lead", async (intercept) => {
    validationRequests += 1;
    const data = await multipart(intercept.request());
    const errors = {};
    const email = String(data.get("email") ?? "");
    const zip = String(data.get("property_zip") ?? "");
    if (!email.includes("@") || email.endsWith("@invalid")) errors.email = "Enter a valid email address.";
    if (!/^\d{5}(?:-\d{4})?$/.test(zip)) errors.property_zip = "Enter a valid ZIP code.";
    if (data.get("privacy_consent") !== "yes") errors.privacy_consent = "Consent is required.";
    await intercept.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Review the highlighted information and submit again.", errors })
    });
  });
  await validationPage.goto(base + route, { waitUntil: "domcontentloaded" });
  await eventCapture(validationPage, validationEvents);
  const validationForm = validationPage.locator('form[action="/api/lead"]').first();
  const validationFormId = await validationForm.getAttribute("id");
  check(route, "distinct rendered form identity", Boolean(validationFormId), validationFormId ?? "missing id");

  const desktopLayout = await validationForm.evaluate((form) => {
    const rect = form.getBoundingClientRect();
    const controls = [...form.querySelectorAll("input:not([type=hidden]):not([aria-hidden=true]), select, textarea, button")];
    return {
      documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      formOverflow: rect.left < -0.5 || rect.right > document.documentElement.clientWidth + 0.5,
      clippedControls: controls.filter((control) => {
        const box = control.getBoundingClientRect();
        return box.width > 0 && (box.left < rect.left - 1 || box.right > rect.right + 1);
      }).map((control) => control.getAttribute("name") || control.tagName)
    };
  });
  check(route, "desktop form has no horizontal overflow", !desktopLayout.documentOverflow && !desktopLayout.formOverflow && desktopLayout.clippedControls.length === 0, JSON.stringify(desktopLayout));
  await validationPage.setViewportSize({ width: 390, height: 844 });
  const mobileLayout = await validationForm.evaluate((form) => {
    const rect = form.getBoundingClientRect();
    return {
      documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      formOverflow: rect.left < -0.5 || rect.right > document.documentElement.clientWidth + 0.5
    };
  });
  check(route, "mobile form has no horizontal overflow", !mobileLayout.documentOverflow && !mobileLayout.formOverflow, JSON.stringify(mobileLayout));

  await validationForm.evaluate((form) => {
    form.querySelectorAll(".cf-turnstile").forEach((node) => node.remove());
  });
  await validationForm.locator('input[name="full_name"]').focus();
  const keyboardNames = [];
  for (let index = 0; index < 24; index += 1) {
    const focused = await validationPage.evaluate(() => {
      const item = document.activeElement;
      return item instanceof HTMLInputElement || item instanceof HTMLSelectElement || item instanceof HTMLTextAreaElement || item instanceof HTMLButtonElement
        ? item.name || item.type || item.tagName
        : item?.tagName ?? "";
    });
    keyboardNames.push(focused);
    if (focused === "submit") break;
    await validationPage.keyboard.press("Tab");
  }
  const hasZip = await validationForm.locator('input[name="property_zip"]').count() === 1;
  const requiredKeyboardStops = ["phone", "email", ...(hasZip ? ["property_zip"] : []), "privacy_consent", "submit"];
  check(route, "keyboard reaches every contact field, consent and submit", requiredKeyboardStops.every((name) => keyboardNames.includes(name)), keyboardNames.join(" > "));

  await fill(validationPage, validationForm, route);
  await validationForm.locator('input[name="email"]').fill("invalid@invalid");
  const beforeEmail = validationRequests;
  await validationForm.evaluate((element) => element.requestSubmit());
  await validationPage.waitForTimeout(100);
  check(route, "invalid email is rejected without success", new URL(validationPage.url()).pathname === route && !validationEvents.some((item) => item?.event === "ppc_form_success") && validationRequests - beforeEmail <= 1);

  await validationForm.locator('input[name="email"]').fill("qa@example.test");
  if (hasZip) {
    await validationForm.locator('input[name="property_zip"]').fill("95A13");
    const beforeZip = validationRequests;
    await validationForm.evaluate((element) => element.requestSubmit());
    await validationPage.waitForTimeout(100);
    check(route, "invalid ZIP is rejected without success", new URL(validationPage.url()).pathname === route && !validationEvents.some((item) => item?.event === "ppc_form_success") && validationRequests - beforeZip <= 1);
  } else {
    check(route, "invalid ZIP is not applicable (form does not collect ZIP)", true);
  }

  if (hasZip) await validationForm.locator('input[name="property_zip"]').fill("95113");
  await validationForm.locator('input[name="privacy_consent"]').uncheck();
  const beforeConsent = validationRequests;
  await validationForm.evaluate((element) => element.requestSubmit());
  await validationPage.waitForTimeout(100);
  check(route, "missing consent is rejected without success", new URL(validationPage.url()).pathname === route && !validationEvents.some((item) => item?.event === "ppc_form_success") && validationRequests - beforeConsent <= 1);
  await validationPage.close();

  const failurePage = await browser.newPage();
  let failureRequests = 0;
  const failureEvents = [];
  await failurePage.route("**/api/lead", async (intercept) => {
    failureRequests += 1;
    await intercept.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Controlled local provider failure." })
    });
  });
  await failurePage.goto(base + route, { waitUntil: "domcontentloaded" });
  await eventCapture(failurePage, failureEvents);
  const forms = failurePage.locator('form[action="/api/lead"]');
  const count = await forms.count();
  check(route, "one installed inquiry form", count === 1, `count=${count}`);
  if (count !== 1) {
    await failurePage.close();
    continue;
  }
  const failureForm = forms.first();
  check(route, "production endpoint", (await failureForm.getAttribute("action")) === "/api/lead");
  check(route, "POST multipart form", (await failureForm.getAttribute("method")) === "post");
  check(route, "honeypot installed", (await failureForm.locator('[name="company_website"]').count()) === 1);
  check(route, "required consent installed", (await failureForm.locator('[name="privacy_consent"][required]').count()) === 1);
  const emailControl = failureForm.locator('input[name="email"][type="email"]');
  const emailIsRequired = await emailControl.getAttribute("required") !== null;
  check(
    route,
    optionalEmailCampaigns.has(route) ? "optional valid-email control" : "required valid-email control",
    await emailControl.count() === 1 && emailIsRequired === !optionalEmailCampaigns.has(route)
  );
  check(route, "idempotency key installed", (await failureForm.locator('[name="idempotency_key"]').count()) === 1);
  await fill(failurePage, failureForm, route);
  const originalName = await failureForm.locator('[name="full_name"]').inputValue();
  const originalFiles = await failureForm.locator('input[type="file"]').count()
    ? await failureForm.locator('input[type="file"]').evaluate((input) => input.files?.length ?? 0)
    : 0;
  await failureForm.evaluate((element) => element.requestSubmit());
  await failurePage.waitForResponse((response) => response.url().endsWith("/api/lead"));
  await failurePage.waitForTimeout(50);
  check(route, "rejection stays on form route", new URL(failurePage.url()).pathname === route);
  check(route, "rejection message is visible", (await failureForm.innerText()).includes("Controlled local provider failure."));
  check(route, "entered text preserved", (await failureForm.locator('[name="full_name"]').inputValue()) === originalName);
  if (originalFiles) {
    check(
      route,
      "selected photo preserved",
      (await failureForm.locator('input[type="file"]').evaluate((input) => input.files?.length ?? 0)) === originalFiles
    );
  }
  check(route, "one rejected request", failureRequests === 1, `requests=${failureRequests}`);
  check(route, "failed submission records no accepted lead", !failureEvents.some((item) => item?.event === "ppc_form_success"), JSON.stringify(failureEvents));
  await failurePage.close();

  const successPage = await browser.newPage();
  let successRequests = 0;
  let submitted = null;
  const successEvents = [];
  await successPage.route("**/api/lead", async (intercept) => {
    successRequests += 1;
    submitted = await multipart(intercept.request());
    await new Promise((resolve) => setTimeout(resolve, 250));
    await intercept.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        submissionId: "11111111-2222-4333-8444-555555555555",
        confirmationCode: "AC-TEST42",
        callbackWindow: "business-hours",
        confirmationEmailSent: true
      })
    });
  });
  await successPage.goto(base + route, { waitUntil: "domcontentloaded" });
  await eventCapture(successPage, successEvents);
  const successForm = successPage.locator('form[action="/api/lead"]').first();
  const routeSpecificFields = ["property_zip", "property_situation", "estate_role", "estate_contents_level", "estate_timeline", "property_status"];
  const renderedRouteFields = await successForm.locator(routeSpecificFields.map((name) => `[name="${name}"]`).join(",")).evaluateAll((nodes) => [...new Set(nodes.map((node) => node.name))]);
  const hasUploadControl = await successForm.locator('input[name="property_media[]"]').count() === 1;
  const marker = await fill(successPage, successForm, route);
  await successForm.evaluate((element) => {
    element.requestSubmit();
    element.requestSubmit();
  });
  await successPage.waitForURL(/thank-you/, { timeout: 10000 });
  check(route, "rapid repeated submit creates one request", successRequests === 1, `requests=${successRequests}`);
  check(route, "accepted submission reaches thank-you", new URL(successPage.url()).pathname.includes("thank-you"));
  const submittedKeys = submitted ? [...submitted.keys()] : [];
  check(route, "all common fields reach the rendered request", submitted && ["full_name", "phone", "email", "property_detail", "entry_route", "submitted_from", "privacy_consent", "idempotency_key"].every((key) => submitted.has(key)), submittedKeys.join(", "));
  check(route, "rendered service, role, condition and timeline fields reach the request", submitted && renderedRouteFields.every((key) => submitted.has(key)), `rendered=${renderedRouteFields.join(", ")} submitted=${submittedKeys.join(", ")}`);
  const expectedSituations = {
    "/hoarding-cleanup-san-jose/": "Hoarding or heavy clutter",
    "/hoarding-cleanup-san-jose/assessment/": "Hoarding or heavy clutter",
    "/rodent-dropping-cleanup-san-jose/": "Rodent droppings or animal waste",
    "/rodent-dropping-cleanup-san-jose/assessment/": "Rodent droppings or animal waste",
    "/crime-scene-trauma-cleanup-san-jose/": "Crime scene or trauma cleanup",
    "/extreme-cleaning-san-jose/": "Severe property condition",
    "/deep-cleaning-san-jose/": "Detailed deep cleaning",
    "/estate-cleanout-san-jose/": "Inherited or estate property",
    "/estate-cleanout-san-jose/assessment/": "Inherited or estate property"
  };
  if (expectedSituations[route]) {
    check(route, "route-specific service selection reaches the request", submitted?.get("property_situation") === expectedSituations[route], String(submitted?.get("property_situation") ?? "missing"));
  }
  check(route, "page-specific marker and route attribution reach the request", submitted && String(submitted.get("full_name")) === marker && String(submitted.get("property_detail")).includes(marker) && String(submitted.get("entry_route")).includes(route === "/" ? "/" : route.replace(/\/$/, "")), `entry=${submitted ? submitted.get("entry_route") : "missing"}`);
  const upload = submitted?.get("property_media[]");
  check(route, "supported photo bytes reach multipart request or upload is not offered", !hasUploadControl || (upload instanceof File && upload.type === "image/jpeg" && upload.size === 4), hasUploadControl ? `${upload?.constructor?.name} ${upload?.type ?? ""} ${upload?.size ?? ""}` : "not applicable");
  const attempts = successEvents.filter((item) => item?.event === "ppc_form_submit_attempt");
  const successes = successEvents.filter((item) => item?.event === "ppc_form_success");
  check(route, "accepted lead tracking fires once", attempts.length === 1 && successes.length === 1, `attempts=${attempts.length} successes=${successes.length}`);
  check(route, "tracking contains no submitted PII", !JSON.stringify(successEvents).includes(marker) && !JSON.stringify(successEvents).includes("qa@example.test") && !JSON.stringify(successEvents).includes("95113"), JSON.stringify(successEvents));
  await successPage.close();
}

await browser.close();
await mkdir(outDir, { recursive: true });
await writeFile(
  join(outDir, "results.json"),
  JSON.stringify({ base, routes, checks: results, failures }, null, 2)
);

console.log(`${results.length - failures.length}/${results.length} checks passed across ${routes.length} installed inquiry forms.`);
console.log(`Results: ${outDir}/results.json`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure.route} — ${failure.label}: ${failure.detail}`);
  process.exit(1);
}
