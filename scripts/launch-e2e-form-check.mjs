// CONTROLLED PRODUCTION TEST of every distinct lead-capture implementation on the site, per the
// 2026-09-06 email-requirement fix: Homepage, one canonical service page, Contact, one legacy
// "Form B" page, and the PPC hoarding landing page.
//
// AUTHORIZATION — the owner explicitly authorized controlled test submissions through the real
// deployed forms, clearly labelled test records in HubSpot, and the resulting confirmation and
// internal notification emails, against the designated test inbox (the owner's own address,
// already the recipient of record in Resend history — see scripts/ppc-production-pipeline-check.mjs).
//
// WHY FIVE SEPARATE RUNS, NOT ONE: research against the deployed source (2026-09-06) found THREE
// distinct form implementations:
//   Form A — AcCompactForm.astro: name, phone, email, ZIP, situation (<select>), detail. Used on
//            the homepage hero, all 5 canonical service pages, and Contact.
//   Form B — QuickHandoffForm.astro (via RequestForm.astro / CityHero.astro): name, phone, email,
//            detail. No ZIP, no situation select, no upload. Used on ten legacy pages that are
//            still built and live (noindex, not in primary nav — see the 2026-09-06 email-
//            requirement handoff for the full inventory) plus the noindex dynamic city pages.
//            Tested here via /faq/, one of the ten.
//   Form C — PpcHeroForm.astro: name, phone, email, ZIP, detail, file upload, fixed hidden
//            situation. Used only on /hoarding-cleanup-san-jose/assessment/ (the PPC page).
// EMAIL IS NOW REQUIRED ON ALL THREE (2026-09-06 fix) — functions/_lib/lead.ts's
// commonRequiredFields gained `email`, so every surface below fills and asserts it, and every
// surface can exercise sendCustomerEmail()'s real send path, not just the PPC form.
//
// SAFETY RAILS (same as scripts/ppc-production-pipeline-check.mjs):
//   - Every submission's full_name carries "ASEPTACLEAN WEBSITE TEST — <timestamp> — <SURFACE>"
//     so each record is unmistakable in HubSpot and in any inbox.
//   - Phone is in the 555 reserved, non-routable range.
//   - The PPC upload is the existing 8-bit solid-colour test JPEG (no camera, no EXIF, no GPS,
//     no person, no property) already vetted in artifacts/ppc-hoarding/ac-website-test.jpg.
//   - SMS cannot fire: OWNER_ALERT_EMAIL is present but SMS_ALERTS_ENABLED is not "true" on the
//     production project (verified via `wrangler pages secret list`), so sendOwnerSms short-circuits.
//   - Nothing is deleted, and no existing record is created or removed by this script.
//
// Usage: node scripts/launch-e2e-form-check.mjs [--only=homepage,service-page,contact,request-form,ppc]
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

const BASE = process.env.AC_TARGET || "https://aseptaclean.pages.dev";
const TEST_EMAIL = process.env.AC_TEST_EMAIL || "matthewruiz824@gmail.com";
const TEST_PHONE = "4085550100"; // 555 reserved range — never routes to a real subscriber.
const TEST_ZIP = "95113";
const outDir = "./artifacts/launch-e2e";
const ppcPhotoPath = "./artifacts/ppc-hoarding/ac-website-test.jpg";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const stampIso = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const stampCompact = stampIso.replace(/[:]/g, "");

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",")) : null;

const SURFACES = [
  {
    key: "homepage",
    label: "Homepage",
    url: "/",
    formSelector: "#hero-form",
    formId: "hero-form",
    type: "A",
    hasZip: true,
    hasSituation: true,
    situationValue: "Not sure",
    thankYouPattern: /\/thank-you\//
  },
  {
    key: "service-page",
    label: "Service page (/hoarding-cleanup-san-jose/)",
    url: "/hoarding-cleanup-san-jose/",
    formSelector: "#service-form",
    formId: "service-form",
    type: "A",
    hasZip: true,
    hasSituation: true,
    situationValue: "Hoarding or heavy clutter",
    thankYouPattern: /\/thank-you\//
  },
  {
    key: "contact",
    label: "Contact",
    url: "/contact/",
    formSelector: "#contact-form",
    formId: "contact-form",
    type: "A",
    hasZip: true,
    hasSituation: true,
    situationValue: "Detailed deep cleaning",
    thankYouPattern: /\/thank-you\//
  },
  {
    key: "request-form",
    label: "Legacy Form B page (/faq/)",
    url: "/faq/",
    // QuickHandoffForm.astro's <form> carries no `id` — it is the only [data-quick-form] on
    // this page, so that attribute selector scopes it instead.
    formSelector: "form[data-quick-form]",
    formId: "request-quick-form",
    type: "B",
    hasZip: false,
    hasSituation: false,
    thankYouPattern: /\/thank-you\//
  },
  {
    key: "ppc",
    label: "PPC hoarding landing page",
    url: "/hoarding-cleanup-san-jose/assessment/",
    formSelector: "#assessment-form",
    formId: "assessment-form",
    type: "C",
    hasZip: true,
    // situation is a fixed hidden input on this form ("Hoarding or heavy clutter") — nothing to
    // select.
    hasSituation: false,
    thankYouPattern: /\/hoarding-cleanup-san-jose\/assessment\/thank-you\//
  }
].filter((s) => !only || only.has(s.key));

await mkdir(join(outDir, "shots"), { recursive: true });

console.log(`target:    ${BASE}`);
console.log(`recipient: ${TEST_EMAIL.replace(/^(.{3}).*(@.*)$/, "$1***$2")} (every surface)`);
console.log(`surfaces:  ${SURFACES.map((s) => s.key).join(", ")}`);
console.log();

const allResults = [];

for (const surface of SURFACES) {
  const marker = `ASEPTACLEAN WEBSITE TEST — ${stampIso} — ${surface.label.toUpperCase()}`;
  const results = [];
  const check = (label, pass, detail = "") => {
    results.push({ label, pass: Boolean(pass), detail });
    console.log(`  ${pass ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
  };

  console.log(`\n=== ${surface.label} (${surface.url}) ===`);
  console.log(`  marker: ${marker}`);

  // HEADED. Turnstile's managed challenge on the production sitekey treats a headless browser as
  // automation and withholds a token. --disable-blink-features=AutomationControlled avoids
  // navigator.webdriver detection that otherwise stalls the challenge indefinitely.
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: process.env.AC_HEADLESS === "1",
    args: ["--disable-blink-features=AutomationControlled"]
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();

  let captured = null;
  await page.route("**/api/lead", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    const response = await route.fetch();
    const body = await response.text();
    try {
      captured = { status: response.status(), payload: JSON.parse(body) };
    } catch {
      captured = { status: response.status(), payload: {} };
    }
    await route.fulfill({ response, body });
  });

  try {
    await page.goto(BASE + surface.url, { waitUntil: "load" });
    check("live production route loads", page.url().includes(surface.url), page.url());

    try {
      await page.waitForSelector(".t-consentPrompt", { timeout: 8000, state: "visible" });
      await page.click(".t-acceptAllButton", { timeout: 5000 });
      await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 8000 });
    } catch {
      /* no banner in this state */
    }
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.waitForTimeout(600);

    const form = page.locator(surface.formSelector);
    await form.scrollIntoViewIfNeeded();

    await form.locator(`#${surface.formId}-name`).fill(marker);
    await form.locator(`#${surface.formId}-phone`).fill(TEST_PHONE);
    if (surface.hasZip) {
      await form.locator(`#${surface.formId}-zip`).fill(TEST_ZIP);
    }

    if (surface.hasSituation) {
      await form.locator(`#${surface.formId}-situation`).selectOption(surface.situationValue);
      check(
        "situation option selected (native <select>, unmodified)",
        (await form.locator(`#${surface.formId}-situation`).inputValue()) === surface.situationValue
      );
    }

    // Required on every surface as of the 2026-09-06 email-requirement fix.
    await form.locator(`#${surface.formId}-email`).fill(TEST_EMAIL);
    check(
      "email field present and required",
      await form.locator(`#${surface.formId}-email`).evaluate((el) => el.required)
    );

    await form.locator(`#${surface.formId}-detail`).fill(
      `${marker}. Automated integration test of the Aseptaclean lead pipeline via the ${surface.label} form. ` +
        "No service is being requested and no work is authorized. Please disregard and delete this record if unwanted."
    );

    if (surface.type === "C") {
      await form.locator(`#${surface.formId}-media`).setInputFiles([ppcPhotoPath]);
      check(
        "safe test photo attached",
        (await form.locator("[data-ppc-upload-list] li").count()) === 1
      );
    }

    await form.locator('input[name="privacy_consent"]').check();
    await page.waitForTimeout(400);
    check("consent checkbox is checked before submit", await form.locator('input[name="privacy_consent"]').isChecked());

    // ---- Real Turnstile on the real domain --------------------------------------------------
    await page.waitForSelector("iframe", { timeout: 15000 }).catch(() => {});
    let clickedCheckbox = false;
    try {
      const csFrame = page.frameLocator('iframe[src*="challenges.cloudflare.com"]');
      await csFrame.locator('input[type="checkbox"]').first().click({ timeout: 8000 });
      clickedCheckbox = true;
    } catch {
      /* strategy 1 failed, fall through */
    }
    if (!clickedCheckbox) {
      try {
        const frameEl = await page.$('iframe[src*="challenges.cloudflare.com"]');
        const box = frameEl ? await frameEl.boundingBox() : null;
        if (box) {
          await page.mouse.click(box.x + 22, box.y + box.height / 2);
          clickedCheckbox = true;
        }
      } catch {
        /* strategy 2 failed, fall through */
      }
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(outDir, "shots", `${surface.key}-01-filled.png`) });

    let token = 0;
    try {
      await page.waitForFunction(
        () => {
          const i = document.querySelector('input[name="cf-turnstile-response"]');
          return Boolean(i && i.value);
        },
        { timeout: 60000 }
      );
      token = await page.evaluate(
        () => document.querySelector('input[name="cf-turnstile-response"]').value.length
      );
    } catch {
      token = 0;
    }
    check(
      "real Turnstile challenge completes on the production domain",
      token > 0,
      token ? `token ${token} chars` : "challenge did not complete — submission cannot proceed"
    );

    if (token > 0) {
      await form.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(1500);
      try {
        await page.waitForURL(surface.thankYouPattern, { timeout: 45000 });
      } catch {
        /* recorded below by the URL assertion */
      }
      await page.waitForTimeout(1200);

      check(
        "production endpoint accepted the submission",
        captured?.status === 201 && captured?.payload?.ok === true,
        captured ? `HTTP ${captured.status} — ${JSON.stringify(captured.payload)}` : "no response captured"
      );
      check(
        "visitor reached the correct thank-you route",
        surface.thankYouPattern.test(page.url()),
        page.url().split("?")[0]
      );

      const ty = await page.evaluate(() => ({
        heading: document.querySelector("h1")?.textContent.trim()
      }));
      check(
        "thank-you page shows a received state, not the unconfirmed default",
        ty.heading !== "This page does not confirm that a request was received.",
        `"${ty.heading}"`
      );
      check(
        "server reports the customer confirmation email as sent (Resend accepted it)",
        captured?.payload?.confirmationEmailSent === true,
        `confirmationEmailSent=${captured?.payload?.confirmationEmailSent}`
      );

      await page.screenshot({ path: join(outDir, "shots", `${surface.key}-02-thankyou.png`) });

      console.log(`  submissionId:     ${captured?.payload?.submissionId}`);
      console.log(`  confirmationCode: ${captured?.payload?.confirmationCode}`);
      console.log(`  confirmationEmailSent: ${captured?.payload?.confirmationEmailSent}`);
    }
  } finally {
    await browser.close();
  }

  allResults.push({
    surface: surface.key,
    label: surface.label,
    url: BASE + surface.url,
    marker,
    phone: TEST_PHONE,
    email: TEST_EMAIL,
    submissionId: captured?.payload?.submissionId ?? null,
    confirmationCode: captured?.payload?.confirmationCode ?? null,
    confirmationEmailSent: captured?.payload?.confirmationEmailSent ?? null,
    results
  });
}

await writeFile(
  join(outDir, `launch-e2e-form-check-${stampCompact}.json`),
  JSON.stringify(allResults, null, 2)
);

const totalChecks = allResults.flatMap((r) => r.results);
const failures = totalChecks.filter((r) => !r.pass);
console.log(`\n${totalChecks.length - failures.length}/${totalChecks.length} checks passed across ${allResults.length} surfaces`);
if (failures.length) process.exit(1);
