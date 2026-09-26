import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4321";
const shotDir = resolve("output/rodent-assessment-pricing-review-2026-09-26");
await mkdir(shotDir, { recursive: true });

const routes = [
  { key: "estate", path: "/estate-cleanout-san-jose/assessment/", thankYou: "/estate-cleanout-san-jose/assessment/thank-you/" },
  { key: "rodent", path: "/rodent-dropping-cleanup-san-jose/assessment/", thankYou: "/rodent-dropping-cleanup-san-jose/assessment/thank-you/" }
];
const widths = [320, 390, 430, 768, 820, 1440];
const failures = [];
const results = [];
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });

const check = (condition, message) => { if (!condition) failures.push(message); };
const dismissConsent = async (page) => {
  await page.locator('[data-tid="banner-accept"]').click({ timeout:5000 }).catch(() => {});
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    document.querySelector(".skip-link")?.blur();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
};

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await dismissConsent(page);
    await page.locator(".lp-photo img").scrollIntoViewIfNeeded();
    await page.locator(".lp-photo img").evaluate((img) => img.decode?.());
    await page.evaluate(() => window.scrollTo(0, 0));
    const geometry = await page.evaluate(() => {
      const rect = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x:r.x, y:r.y, width:r.width, height:r.height };
      };
      const form = document.querySelector("form[data-ppc-form]");
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        hero: rect(".lp-hero"), services: rect(".lp-services"), process: rect(".lp-process"), contact: rect(".lp-contact"),
        serviceArticles: [...document.querySelectorAll(".lp-services article")].map((el) => ({ x:el.getBoundingClientRect().x, width:el.getBoundingClientRect().width })),
        callHref: document.querySelector(".lp-call")?.getAttribute("href"),
        canonical,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
        required: [...form?.querySelectorAll("[required]") ?? []].map((el) => el.getAttribute("name")),
        optionalOpen: document.querySelector("[data-ppc-optional]")?.hasAttribute("open"),
        previewNotice: document.body.textContent.includes("Preview only") || document.body.textContent.includes("not fully configured"),
        prices: [...document.querySelectorAll(".lp-pricing__price")].map((el) => el.textContent?.trim()),
        assessmentPrices: [...document.querySelectorAll(".lp-assessment__price")].map((el) => el.textContent?.trim()),
        assessmentText: document.querySelector(".lp-assessment")?.textContent ?? "",
        pageText: document.querySelector(".approved-landing")?.textContent ?? "",
        heroCallHref: document.querySelector(".lp-hero-actions a[href^='tel:']")?.getAttribute("href"),
        optionalLabel: document.querySelector("[data-ppc-optional] summary")?.textContent?.trim(),
        faqCount: document.querySelectorAll(".lp-faq details").length,
        imageOk: [...document.images].filter((img) => img.getClientRects().length).every((img) => img.complete && img.naturalWidth > 0)
      };
    });
    check(geometry.overflow <= 1, `${route.key} ${width}: horizontal overflow ${geometry.overflow}px`);
    check(geometry.callHref === "tel:+14087857588", `${route.key} ${width}: wrong call href ${geometry.callHref}`);
    check(geometry.canonical?.endsWith(route.path), `${route.key} ${width}: wrong canonical ${geometry.canonical}`);
    check(!geometry.robots?.includes("noindex"), `${route.key} ${width}: unexpectedly noindex`);
    check(!geometry.previewNotice, `${route.key} ${width}: preview notice remains`);
    if (route.key === "rodent") {
      check(geometry.prices.join("|") === "$500|$1,500", `${route.key} ${width}: cleanup prices are missing or changed`);
      check(geometry.assessmentPrices.join("|") === "$295|$495", `${route.key} ${width}: assessment prices are missing or changed`);
      check(geometry.assessmentText.includes("assessments starting at $750"), `${route.key} ${width}: custom assessment starting price is missing`);
      check(geometry.assessmentText.includes("Your full assessment fee goes toward your cleanup"), `${route.key} ${width}: full-credit statement is missing`);
      check(!geometry.pageText.includes("$145"), `${route.key} ${width}: old $145 copy remains on the landing page`);
      check(geometry.heroCallHref === "tel:+14087857588", `${route.key} ${width}: hero phone CTA is incorrect`);
      check(geometry.optionalLabel?.includes("Add photos or details — optional"), `${route.key} ${width}: optional-fields label is incorrect`);
      check(geometry.faqCount === 3, `${route.key} ${width}: expected three assessment FAQs`);
    }
    check(geometry.imageOk, `${route.key} ${width}: image failed to load`);
    check(geometry.required.includes("full_name") && geometry.required.includes("phone") && geometry.required.includes("privacy_consent"), `${route.key} ${width}: required fields incomplete`);
    check(!geometry.required.includes("email") && !geometry.required.includes("property_detail"), `${route.key} ${width}: optional fields marked required`);
    if (width === 1440) check(new Set(geometry.serviceArticles.map((item) => Math.round(item.x))).size === 3, `${route.key}: desktop services are not three columns`);
    if (width === 390 || width === 1440) await page.screenshot({ path: `${shotDir}/${route.key}-${width}.png`, fullPage: true });
    results.push({ route:route.key, width, ...geometry });
    await page.close();
  }

  const interaction = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await interaction.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" });
  await interaction.evaluate(() => document.fonts.ready);
  await dismissConsent(interaction);
  await interaction.click('a[href="#contact"]');
  check(await interaction.locator('input[name="full_name"]').evaluate((el) => el === document.activeElement), `${route.key}: callback CTA did not focus the form`);
  await interaction.locator("[data-ppc-optional] summary").focus();
  await interaction.keyboard.press("Enter");
  check(await interaction.locator('[name="email"]').isVisible(), `${route.key}: optional fields did not expand`);
  check(await interaction.locator("[data-ppc-optional] summary").evaluate((el) => el === document.activeElement), `${route.key}: optional-fields control lost keyboard focus`);
  if (route.key === "rodent") {
    const firstFaq = interaction.locator(".lp-faq details").first();
    await firstFaq.locator("summary").focus();
    await interaction.keyboard.press("Enter");
    check(await firstFaq.evaluate((el) => el.hasAttribute("open")), `${route.key}: FAQ did not open from keyboard`);
    await interaction.keyboard.press("Space");
    check(!(await firstFaq.evaluate((el) => el.hasAttribute("open"))), `${route.key}: FAQ did not close from keyboard`);
  }
  await interaction.setInputFiles('[name="property_media[]"]', { name:"synthetic-test.png", mimeType:"image/png", buffer:Buffer.from("89504e470d0a1a0a", "hex") });
  check((await interaction.locator("[data-ppc-upload-list]").textContent())?.includes("synthetic-test.png"), `${route.key}: upload selection was not shown`);
  await interaction.fill('[name="email"]', "not-an-email");
  await interaction.click('[data-ppc-form-submit]');
  check(await interaction.locator('[data-ppc-form-errors]').isVisible(), `${route.key}: invalid-input summary was not shown`);
  await interaction.close();

  const failure = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await failure.route("**/api/lead", async (handler) => handler.fulfill({ status:503, contentType:"application/json", body:JSON.stringify({ ok:false, message:"Synthetic test failure. Please try again." }) }));
  await failure.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" });
  await failure.evaluate(() => document.fonts.ready);
  await dismissConsent(failure);
  await failure.fill('[name="full_name"]', "Synthetic Landing Test");
  await failure.fill('[name="phone"]', "408-555-0100");
  await failure.locator('[name="privacy_consent"]').setChecked(true, { force: true });
  await failure.evaluate(() => { const form=document.querySelector("form"); let input=form?.querySelector('[name="cf-turnstile-response"]'); if (!(input instanceof HTMLInputElement)) { input=document.createElement("input"); input.type="hidden"; input.name="cf-turnstile-response"; form?.append(input); } input.value="synthetic-token"; });
  await failure.click('[data-ppc-form-submit]');
  await failure.locator('[data-ppc-form-status]').waitFor({ state:"visible" });
  check((await failure.locator('[data-ppc-form-status]').textContent())?.includes("Synthetic test failure"), `${route.key}: failure message not surfaced`);
  check(await failure.inputValue('[name="full_name"]') === "Synthetic Landing Test", `${route.key}: failure did not retain entries`);
  await failure.close();

  const successEvents = [];
  const success = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await success.exposeFunction("recordSyntheticEvent", (event) => successEvents.push(event));
  await success.route("**/api/lead", async (handler) => handler.fulfill({ status:200, contentType:"application/json", body:JSON.stringify({ ok:true, confirmationCode:"AC-ABC234", callbackWindow:"business-hours", confirmationEmailSent:false }) }));
  await success.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" });
  await success.evaluate(() => document.fonts.ready);
  await dismissConsent(success);
  await success.evaluate(() => { const original=window.dataLayer?.push.bind(window.dataLayer); if (!window.dataLayer) window.dataLayer=[]; window.dataLayer.push=(...items) => { for (const item of items) window.recordSyntheticEvent?.(item); return original ? original(...items) : window.dataLayer.length; }; });
  await success.fill('[name="full_name"]', "Synthetic Landing Test");
  await success.fill('[name="phone"]', "408-555-0100");
  await success.locator('[name="privacy_consent"]').setChecked(true, { force: true });
  await success.evaluate(() => { const form=document.querySelector("form"); let input=form?.querySelector('[name="cf-turnstile-response"]'); if (!(input instanceof HTMLInputElement)) { input=document.createElement("input"); input.type="hidden"; input.name="cf-turnstile-response"; form?.append(input); } input.value="synthetic-token"; });
  await Promise.all([success.waitForURL((url) => url.pathname === route.thankYou), success.click('[data-ppc-form-submit]')]);
  check(successEvents.filter((event) => event?.event === "ppc_form_success").length === 1, `${route.key}: success conversion did not fire exactly once`);
  await success.close();

  const zoom = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await zoom.goto(`${base}${route.path}`, { waitUntil:"domcontentloaded" });
  await zoom.evaluate(() => document.fonts.ready);
  await dismissConsent(zoom);
  await zoom.evaluate(() => { document.body.style.zoom = "2"; });
  const zoomOverflow = await zoom.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(zoomOverflow <= 1, `${route.key}: 200% zoom horizontal overflow ${zoomOverflow}px`);
  await zoom.screenshot({ path:`${shotDir}/${route.key}-200-percent.png`, fullPage:true });
  await zoom.close();
}

await browser.close();
console.log(JSON.stringify({ failures, results }, null, 2));
if (failures.length) process.exit(1);
