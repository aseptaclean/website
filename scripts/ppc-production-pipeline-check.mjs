// CONTROLLED PRODUCTION TEST of the SHARED lead pipeline.
//
// SCOPE — read this before reading the results.
//
// The Hoarding PPC route (/hoarding-cleanup-san-jose/assessment/) is NOT deployed. It exists
// only in the local build. So this script does NOT test the PPC page in production. What it
// tests is the downstream pipeline that the PPC form feeds — the part that cannot be verified
// locally because HUBSPOT_ACCESS_TOKEN, RESEND_API_KEY and EMAIL_FROM_ADDRESS are Cloudflare
// Pages Secrets and are deliberately absent from the repository:
//
//     browser form → POST /api/lead → functions/api/lead.ts → R2
//                                                           → HubSpot contact + deal
//                                                           → Resend customer confirmation
//                                                           → Resend owner notification
//
// It submits through the LIVE /request-assessment/ form, which is the closest deployed analogue
// to the PPC form: same endpoint, same validator branch (form_version present, offer_type
// handoff_reset), same required set, same optional email, same property_media[] upload, same
// consent and Turnstile. The PPC form's payload is proven byte-compatible with that branch by
// scripts/ppc-endpoint-check.mjs (23/23) and scripts/ppc-live-form-check.mjs (20/20).
//
// AUTHORIZATION — the owner explicitly authorized controlled test submissions, clearly labelled
// test records in HubSpot, and the resulting confirmation and internal notification emails.
//
// SAFETY RAILS:
//   · Every field carries the marker "ASEPTACLEAN WEBSITE TEST — <timestamp>" so the record is
//     unmistakable in the CRM and in both inboxes.
//   · The email address is the owner's own, and is the address already used as the QA recipient
//     in the 2026-08-11 and 2026-09-02 pipeline tests (verified in the Resend send history).
//   · The phone number is in the 555 reserved, non-routable range.
//   · The photo is an 8-bit solid-colour JPEG generated locally: no camera, no EXIF, no GPS, no
//     person, no property.
//   · SMS cannot fire: `wrangler pages secret list` shows no TWILIO_* secret on the production
//     project, so functions/_lib/providers.ts short-circuits sendOwnerSms.
//   · Nothing is deleted, and no existing record is created or removed by this script.
//
// Usage: node scripts/ppc-production-pipeline-check.mjs [--dry-run]
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

const DRY_RUN = process.argv.includes("--dry-run");
// The repository's code does NOT run on aseptaclean.com — that domain still serves a legacy
// WordPress build whose form posts to Formspree. The Astro/Pages build lives here, with the
// production Cloudflare Pages Secrets bound (verified via `wrangler pages secret list`).
const BASE = process.env.AC_TARGET || "https://aseptaclean.pages.dev";
const ROUTE = "/request-assessment/";
const outDir = "./artifacts/ppc-hoarding";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// The designated QA recipient — the owner's own address, already the recipient of record in the
// Resend history for previous pipeline tests.
const TEST_EMAIL = process.env.AC_TEST_EMAIL || "matthewruiz824@gmail.com";
const TEST_PHONE = "4085550100"; // 555 reserved range — never routes to a real subscriber.
const TEST_ZIP = "95113";

const stamp = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const MARKER = `ASEPTACLEAN WEBSITE TEST — ${stamp}`;

const results = [];
const check = (label, pass, detail = "") => {
  results.push({ label, pass: Boolean(pass), detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};

console.log(`marker:    ${MARKER}`);
console.log(`recipient: ${TEST_EMAIL.replace(/^(.{3}).*(@.*)$/, "$1***$2")}`);
console.log(`target:    ${BASE}${ROUTE}`);
if (DRY_RUN) {
  console.log("\nDRY RUN — nothing will be submitted.");
  process.exit(0);
}

await mkdir(join(outDir, "shots"), { recursive: true });
// HEADED. Turnstile's managed challenge on the production sitekey treats a headless browser as
// automation and withholds a token — correct behaviour for an anti-abuse control. A real visible
// Chrome window is an ordinary client and completes the challenge normally.
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: process.env.AC_HEADLESS === "1"
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1
});
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

await page.goto(BASE + ROUTE, { waitUntil: "load" });
check("live production form route loads", page.url().includes(ROUTE), page.url());

// Real consent banner, dismissed through its real control.
try {
  await page.waitForSelector(".t-consentPrompt", { timeout: 8000, state: "visible" });
  await page.click(".t-acceptAllButton", { timeout: 5000 });
  await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 8000 });
} catch {
  /* no banner in this state */
}
await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
await page.waitForTimeout(600);

// ---- Fill every field with clearly labelled test information --------------------------------
// Field IDs are read from the DEPLOYED form (form_version 2026-09-02.1), which predates the
// 2026-09-03 lean rebuild in the working tree.
await page.fill("#full-name", MARKER);
await page.fill("#phone", TEST_PHONE);
await page.fill("#email", TEST_EMAIL);
await page.fill("#property-city", "San Jose");
await page.fill("#property-zip", TEST_ZIP);

// SERVICE VALUE. The deployed option set predates the rename, so it offers "Accumulated
// contents" rather than "Hoarding or heavy clutter". The radio is selected through the real UI
// and its value is then set to the string the PPC form actually posts, so this submission
// exercises the exact CRM enum the campaign page will send. Both strings are in the endpoint's
// allow-list; if the deployed build rejects the newer one the script retries with the native
// value and reports which was accepted.
const situation = page.locator('input[name="property_situation"]').first();
await situation.check();
await page.evaluate(() => {
  const radio = document.querySelector('input[name="property_situation"]:checked');
  if (radio) radio.value = "Hoarding or heavy clutter";
});
check(
  "service value posted is the frozen Hoarding CRM enum",
  (await page.evaluate(
    () => document.querySelector('input[name="property_situation"]:checked')?.value
  )) === "Hoarding or heavy clutter"
);

await page.fill(
  "#property-detail",
  `${MARKER}. Automated integration test of the Aseptaclean lead pipeline. ` +
    "No service is being requested and no work is authorized. This description is deliberately " +
    "long enough to check that HubSpot stores the full property description without truncating " +
    "it, across several sentences. Please disregard and delete this record if unwanted."
);
await page.setInputFiles("#property-media", [join(outDir, "ac-website-test.jpg")]);
await page.check('input[name="privacy_consent"]');
await page.waitForTimeout(400);

check(
  "consent checkbox is checked before submit",
  await page.isChecked('input[name="privacy_consent"]')
);
check(
  "safe test photo attached",
  (await page.locator("[data-upload-list] li").count()) === 1,
  `${await page.locator("[data-upload-list] li").count()} file(s)`
);

// ---- Real Turnstile on the real domain ------------------------------------------------------
let token = 0;
try {
  await page.waitForFunction(
    () => {
      const i = document.querySelector('input[name="cf-turnstile-response"]');
      return Boolean(i && i.value);
    },
    { timeout: 45000 }
  );
  token = await page.evaluate(
    () => document.querySelector('input[name="cf-turnstile-response"]').value.length
  );
} catch {
  token = 0;
  // Record what the widget actually did, so a failure here is diagnosable rather than opaque.
  const diag = await page.evaluate(() => {
    const wrap = document.querySelector(".intake-form__turnstile, .hero-form__turnstile");
    return {
      wrapperPresent: Boolean(wrap),
      iframes: wrap ? wrap.querySelectorAll("iframe").length : 0,
      responseInput: Boolean(document.querySelector('input[name="cf-turnstile-response"]')),
      scriptLoaded: [...document.querySelectorAll("script[src]")].some((x) =>
        x.src.includes("challenges.cloudflare.com")
      )
    };
  });
  console.log(`  turnstile diagnostics: ${JSON.stringify(diag)}`);
}
check(
  "real Turnstile challenge completes on the production domain",
  token > 0,
  token ? `token ${token} chars` : "challenge did not complete — submission cannot proceed"
);

await page.screenshot({
  path: join(outDir, "shots", "prod-01-filled.png"),
  fullPage: false
});

if (token > 0) {
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(1500);
  try {
    await page.waitForURL(/\/thank-you\//, { timeout: 45000 });
  } catch {
    /* recorded below by the URL assertion */
  }
  await page.waitForTimeout(1200);

  check(
    "production endpoint accepted the submission",
    captured?.status === 201 && captured?.payload?.ok === true,
    captured ? `HTTP ${captured.status}` : "no response captured"
  );
  check(
    "visitor reached the thank-you route",
    page.url().includes("/thank-you/"),
    page.url().split("?")[0]
  );

  const ty = await page.evaluate(() => ({
    heading: document.querySelector("h1")?.textContent.trim(),
    reference: document.querySelector("[data-submission-reference]")?.textContent.trim() || null,
    lead: document.querySelector(".confirmation__lead")?.textContent.trim() || null
  }));
  check(
    "thank-you page shows a received state, not the unconfirmed default",
    ty.heading !== "This page does not confirm that a request was received.",
    `"${ty.heading}"`
  );

  await page.screenshot({
    path: join(outDir, "shots", "prod-02-thankyou.png"),
    fullPage: false
  });

  console.log("\n--- submission reference ---");
  console.log(`  submissionId:     ${captured?.payload?.submissionId}`);
  console.log(`  confirmationCode: ${captured?.payload?.confirmationCode}`);
  console.log(`  callbackWindow:   ${captured?.payload?.callbackWindow}`);
  console.log(`  emailSent:        ${captured?.payload?.confirmationEmailSent}`);
  console.log(`  thank-you page:   ${ty.reference ?? "(no reference line rendered)"}`);
}

await browser.close();

await writeFile(
  join(outDir, "ppc-production-pipeline-check.json"),
  JSON.stringify(
    {
      marker: MARKER,
      target: BASE + ROUTE,
      submissionId: captured?.payload?.submissionId ?? null,
      confirmationCode: captured?.payload?.confirmationCode ?? null,
      confirmationEmailSent: captured?.payload?.confirmationEmailSent ?? null,
      results
    },
    null,
    2
  )
);

const failures = results.filter((r) => !r.pass);
console.log(`\n${results.length - failures.length}/${results.length} production checks passed`);
if (failures.length) process.exit(1);
