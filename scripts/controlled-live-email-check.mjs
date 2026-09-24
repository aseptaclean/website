// One authorized production pipeline check. This deliberately blocks analytics/ad hosts and
// does not grant analytics consent, so the clearly labelled QA inquiry cannot be counted as an
// advertising conversion. It sends only to the repository's established owner-controlled QA
// recipient and the server-configured OWNER_ALERT_EMAIL.
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = process.env.AC_TARGET || "https://aseptaclean.pages.dev";
const testEmail = process.env.AC_TEST_EMAIL || "matthewruiz824@gmail.com";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = "output/form-functional-qa";
const marker = `ASEPTACLEAN NON-CONVERSION EMAIL QA TEST — ${new Date().toISOString()}`;
const blockedHosts = [
  "googletagmanager.com",
  "google-analytics.com",
  "googleadservices.com",
  "doubleclick.net"
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: process.env.AC_HEADLESS === "1",
  args: ["--disable-blink-features=AutomationControlled"]
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
let endpoint = null;
let blockedAnalyticsRequests = 0;

await page.route("**/*", async (route) => {
  const host = new URL(route.request().url()).hostname;
  if (blockedHosts.some((blocked) => host === blocked || host.endsWith(`.${blocked}`))) {
    blockedAnalyticsRequests += 1;
    return route.abort("blockedbyclient");
  }
  if (route.request().url().endsWith("/api/lead") && route.request().method() === "POST") {
    const response = await route.fetch();
    const body = await response.text();
    endpoint = {
      status: response.status(),
      payload: JSON.parse(body)
    };
    return route.fulfill({ response, body });
  }
  return route.continue();
});

try {
  await page.goto(`${base}/contact/`, { waitUntil: "load" });
  const form = page.locator("#contact-form");
  await form.locator("#contact-form-name").fill(marker);
  await form.locator("#contact-form-phone").fill("4085550100");
  await form.locator("#contact-form-email").fill(testEmail);
  await form.locator("#contact-form-zip").fill("95113");
  await form.locator("#contact-form-situation").selectOption("Not sure");
  await form.locator("#contact-form-detail").fill(
    `${marker}. Controlled end-to-end email QA only. No customer, property, service request, ` +
      "appointment, or work authorization exists. Do not count as an advertising conversion."
  );
  await form.locator('input[name="privacy_consent"]').check();

  await page.waitForSelector('iframe[src*="challenges.cloudflare.com"]', { timeout: 15000 }).catch(() => {});
  try {
    await page
      .frameLocator('iframe[src*="challenges.cloudflare.com"]')
      .locator('input[type="checkbox"]')
      .first()
      .click({ timeout: 8000 });
  } catch {
    const frame = await page.$('iframe[src*="challenges.cloudflare.com"]');
    const box = frame ? await frame.boundingBox() : null;
    if (box) await page.mouse.click(box.x + 22, box.y + box.height / 2);
  }
  await page.waitForFunction(
    () => Boolean(document.querySelector('input[name="cf-turnstile-response"]')?.value),
    { timeout: 60000 }
  );

  await form.locator('button[type="submit"]').click();
  await page.waitForURL(/\/thank-you\//, { timeout: 45000 });
  if (endpoint?.status !== 201 || endpoint?.payload?.ok !== true) {
    throw new Error(`Production endpoint did not accept the controlled test: ${JSON.stringify(endpoint)}`);
  }

  const result = {
    marker,
    target: `${base}/contact/`,
    recipient: testEmail.replace(/^(.{3}).*(@.*)$/, "$1***$2"),
    analyticsPolicy: "Google analytics and advertising hosts blocked; consent not granted",
    blockedAnalyticsRequests,
    endpoint,
    thankYouPath: new URL(page.url()).pathname,
    providerMeaning:
      "confirmationEmailSent=true means Resend accepted the customer message; it does not prove delivery or inbox receipt."
  };
  await writeFile(`${outDir}/controlled-live-email.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
