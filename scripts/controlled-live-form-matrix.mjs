// Controlled production evidence only. Google analytics/advertising requests are blocked and
// advertising consent is never granted. The default recipient is the repository's established
// company-controlled QA address used by controlled-live-email-check.mjs; override only with a
// separately verified company-controlled address.
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = process.env.AC_TARGET || "https://aseptaclean.pages.dev";
const testEmail = process.env.AC_TEST_EMAIL || "matthewruiz824@gmail.com";
const routes = JSON.parse(process.env.AC_ROUTES_JSON || "[]");
if (!Array.isArray(routes) || routes.length === 0) {
  throw new Error("Set AC_ROUTES_JSON to an explicit JSON array of authorized routes.");
}

const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = `output/form-functional-qa/live-${runId}`;
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
const results = [];

try {
  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const slug = route === "/" ? "homepage" : route.replace(/^\/+|\/+$/g, "").replace(/\//g, "--");
    const marker = `ASEPTACLEAN CONTROLLED QA — ${slug} — ${runId}`;
    let endpoint = null;
    let blockedAnalyticsRequests = 0;

    await page.route("**/*", async (requestRoute) => {
      const request = requestRoute.request();
      const host = new URL(request.url()).hostname;
      if (blockedHosts.some((blocked) => host === blocked || host.endsWith(`.${blocked}`))) {
        blockedAnalyticsRequests += 1;
        return requestRoute.abort("blockedbyclient");
      }
      if (request.url().endsWith("/api/lead") && request.method() === "POST") {
        const response = await requestRoute.fetch();
        const body = await response.text();
        let payload = {};
        try {
          payload = JSON.parse(body);
        } catch {
          payload = { parseError: true };
        }
        endpoint = { status: response.status(), payload };
        return requestRoute.fulfill({ response, body });
      }
      return requestRoute.continue();
    });

    try {
      await page.goto(base + route, { waitUntil: "load", timeout: 45_000 });
      const forms = page.locator('form[action="/api/lead"]');
      const count = await forms.count();
      if (count !== 1) {
        results.push({ route, marker, status: "missing", formCount: count });
        await context.close();
        continue;
      }
      const form = forms.first();
      const formId = await form.getAttribute("id");
      await form.locator('input[name="full_name"]').fill(marker);
      await form.locator('input[name="phone"]').fill("4085550100");
      await form.locator('input[name="email"]').fill(testEmail);
      const zip = form.locator('input[name="property_zip"]');
      if (await zip.count()) await zip.fill("95113");
      for (const textarea of await form.locator("textarea:not([disabled])").all()) {
        await textarea.fill(`${marker}. No customer, property, appointment, or work authorization exists. Do not count as an advertising conversion or start an unrelated workflow.`);
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
        await checkbox.check();
      }
      const file = form.locator('input[type="file"]');
      const photoAttached = Boolean(await file.count());
      if (photoAttached) {
        await file.setInputFiles({
          name: `${slug}-controlled-qa.jpg`,
          mimeType: "image/jpeg",
          buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9])
        });
      }

      await page.waitForSelector('iframe[src*="challenges.cloudflare.com"]', { timeout: 15_000 }).catch(() => {});
      try {
        await page
          .frameLocator('iframe[src*="challenges.cloudflare.com"]')
          .locator('input[type="checkbox"]')
          .first()
          .click({ timeout: 8_000 });
      } catch {
        const frame = await page.$('iframe[src*="challenges.cloudflare.com"]');
        const box = frame ? await frame.boundingBox() : null;
        if (box) await page.mouse.click(box.x + 22, box.y + box.height / 2);
      }
      await page.waitForFunction(
        () => Boolean(document.querySelector('input[name="cf-turnstile-response"]')?.value),
        { timeout: 60_000 }
      );

      await form.locator('button[type="submit"]').click();
      await page.waitForURL(/\/thank-you(?:\/|\?)/, { timeout: 60_000 });
      results.push({
        route,
        marker,
        status: endpoint?.status === 201 && endpoint?.payload?.ok === true ? "accepted" : "failed",
        formId,
        photoAttached,
        analyticsPolicy: "Google analytics/advertising hosts blocked; consent not granted",
        blockedAnalyticsRequests,
        endpoint,
        thankYouPath: new URL(page.url()).pathname
      });
    } catch (error) {
      results.push({
        route,
        marker,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
        endpoint
      });
    } finally {
      await context.close();
      await writeFile(`${outDir}/results.json`, JSON.stringify({ base, runId, results }, null, 2));
    }
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ outDir, runId, results }, null, 2));
if (results.some((item) => item.status !== "accepted")) process.exitCode = 1;
