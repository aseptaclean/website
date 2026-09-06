// CONTROLLED PRODUCTION TEST of the quick/short lead path — /contact/#request.
//
// This is the materially different form path from /request-assessment/: no email field, so it
// exercises isDetailedLead()===false in functions/_lib/providers.ts, HubSpot dedupe by PHONE
// instead of email, sendCustomerEmail's "no email collected" skip branch, and the short-form
// summary shape in the owner alert. Same safety rails as ppc-production-pipeline-check.mjs.
//
// Usage: node scripts/contact-quick-form-production-check.mjs [--dry-run]
import { chromium } from "playwright-core";

const DRY_RUN = process.argv.includes("--dry-run");
const BASE = process.env.AC_TARGET || "https://aseptaclean.pages.dev";
const ROUTE = "/contact/";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const TEST_PHONE = "4085550101"; // 555 reserved range, distinct from the long-form test's .0100

const stamp = new Date().toISOString().replace(/\.\d+Z$/, "Z");
const MARKER = `ASEPTACLEAN WEBSITE TEST — ${stamp}`;

const results = [];
const check = (label, pass, detail = "") => {
  results.push({ label, pass: Boolean(pass), detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};

console.log(`marker: ${MARKER}`);
console.log(`target: ${BASE}${ROUTE}`);
if (DRY_RUN) {
  console.log("\nDRY RUN — nothing will be submitted.");
  process.exit(0);
}

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: false,
  args: ["--disable-blink-features=AutomationControlled"]
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
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
check("live contact page loads", page.url().includes(ROUTE), page.url());

try {
  await page.waitForSelector(".t-consentPrompt", { timeout: 8000, state: "visible" });
  await page.click(".t-acceptAllButton", { timeout: 5000 });
  await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 8000 });
} catch {
  /* no banner in this state */
}
await page.locator("#request-quick-form-name").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

await page.fill("#request-quick-form-name", MARKER);
await page.fill("#request-quick-form-phone", TEST_PHONE);
await page.fill(
  "#request-quick-form-detail",
  `${MARKER}. Automated integration test of the quick/short lead path (no email field). No service is being requested and no work is authorized. Please disregard and delete this record if unwanted.`
);
await page.check('input[name="privacy_consent"]');
check("consent checkbox is checked before submit", await page.isChecked('input[name="privacy_consent"]'));
check("no email field exists on this form", (await page.locator('input[name="email"]').count()) === 0);

await page.waitForSelector("iframe", { timeout: 15000 }).catch(() => {});
let clickedCheckbox = false;
try {
  const csFrame = page.frameLocator('iframe[src*="challenges.cloudflare.com"]');
  await csFrame.locator('input[type="checkbox"]').first().click({ timeout: 8000 });
  clickedCheckbox = true;
} catch {
  const frameEl = await page.$('iframe[src*="challenges.cloudflare.com"]');
  const box = frameEl ? await frameEl.boundingBox() : null;
  if (box) {
    await page.mouse.click(box.x + 22, box.y + box.height / 2);
    clickedCheckbox = true;
  }
}
console.log(`  clicked checkbox: ${clickedCheckbox}`);

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
check("real Turnstile challenge completes on the production domain", token > 0, token ? `token ${token} chars` : "no token");

if (token > 0) {
  await page.locator("[data-quick-form-submit]").click();
  await page.waitForTimeout(1500);
  try {
    await page.waitForURL(/\/thank-you\//, { timeout: 45000 });
  } catch {
    /* recorded below */
  }
  await page.waitForTimeout(1000);

  check(
    "production endpoint accepted the submission",
    captured?.status === 201 && captured?.payload?.ok === true,
    captured ? `HTTP ${captured.status} — ${JSON.stringify(captured.payload)}` : "no response captured"
  );
  check("visitor reached the thank-you route", page.url().includes("/thank-you/"), page.url());

  console.log("\n--- submission reference ---");
  console.log(`  submissionId:     ${captured?.payload?.submissionId}`);
  console.log(`  confirmationCode: ${captured?.payload?.confirmationCode}`);
  console.log(`  confirmationEmailSent: ${captured?.payload?.confirmationEmailSent}`);
}

await browser.close();

const failures = results.filter((r) => !r.pass);
console.log(`\n${results.length - failures.length}/${results.length} checks passed`);
if (failures.length) process.exit(1);
