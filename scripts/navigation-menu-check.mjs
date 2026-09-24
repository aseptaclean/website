import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDir = process.env.QA_OUTPUT_DIR || "output/navigation-qa";

const publicRoutes = [
  "/",
  "/hoarding-cleanup-san-jose/",
  "/extreme-cleaning-san-jose/",
  "/deep-cleaning-san-jose/",
  "/crime-scene-trauma-cleanup-san-jose/",
  "/rodent-dropping-cleanup-san-jose/",
  "/estate-cleanout-san-jose/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
];

const campaignRoutes = [
  "/hoarding-cleanup-san-jose/assessment/",
  "/rodent-dropping-cleanup-san-jose/assessment/",
  "/estate-cleanout-san-jose/assessment/"
];

const expectedServices = [
  ["Hoarding Cleanup", "/hoarding-cleanup-san-jose/"],
  ["Extreme Cleaning", "/extreme-cleaning-san-jose/"],
  ["Detailed Deep Cleaning", "/deep-cleaning-san-jose/"],
  ["Crime Scene & Trauma", "/crime-scene-trauma-cleanup-san-jose/"],
  ["Rodent & Animal Waste", "/rodent-dropping-cleanup-san-jose/"],
  ["Estate Cleanout", "/estate-cleanout-san-jose/"]
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 760 }
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.route("**/*", (route) => {
  const url = new URL(route.request().url());
  if (["127.0.0.1", "localhost"].includes(url.hostname)) route.continue();
  else route.abort();
});
const page = await context.newPage();
const checks = [];

function record(name, pass, detail = undefined) {
  checks.push({ name, pass, detail });
}

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of publicRoutes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });

    let trigger = page.locator("[data-service-disclosure-trigger]:visible").first();
    if (!(await trigger.count())) {
      const drawerTrigger = page.locator("[data-mobile-nav] > summary:visible, details.mobilemenu > summary:visible").first();
      if (await drawerTrigger.count()) await drawerTrigger.click();
      trigger = page.locator("[data-service-disclosure-trigger]:visible").first();
    }

    record(`${viewport.name} ${route} Services trigger visible`, (await trigger.count()) === 1);
    if (!(await trigger.count())) continue;

    const beforeUrl = page.url();
    await trigger.click();
    record(`${viewport.name} ${route} Services does not navigate`, page.url() === beforeUrl);
    record(`${viewport.name} ${route} expanded state`, (await trigger.getAttribute("aria-expanded")) === "true");

    const controls = await trigger.getAttribute("aria-controls");
    const panel = page.locator(`#${controls}`);
    record(`${viewport.name} ${route} controlled panel exists`, Boolean(controls) && (await panel.count()) === 1);
    record(`${viewport.name} ${route} controlled panel visible`, await panel.isVisible());

    const links = await panel.locator("a").evaluateAll((nodes) => nodes.map((node) => [node.textContent?.trim(), node.getAttribute("href")]));
    record(`${viewport.name} ${route} approved service links`, JSON.stringify(links) === JSON.stringify(expectedServices), links);

    const geometry = await page.evaluate((panelId) => {
      const panelElement = document.getElementById(panelId);
      const rect = panelElement?.getBoundingClientRect();
      return {
        documentOverflow: document.documentElement.scrollWidth - innerWidth,
        panel: rect ? { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom } : null,
        viewport: { width: innerWidth, height: innerHeight }
      };
    }, controls);
    const panelFits = Boolean(
      geometry.panel &&
      geometry.panel.left >= -0.5 &&
      geometry.panel.right <= geometry.viewport.width + 0.5 &&
      geometry.panel.top >= -0.5 &&
      geometry.panel.bottom <= geometry.viewport.height + 0.5
    );
    record(`${viewport.name} ${route} panel within viewport`, panelFits, geometry);
    record(`${viewport.name} ${route} no horizontal overflow`, geometry.documentOverflow <= 0, geometry.documentOverflow);

    await page.keyboard.press("Escape");
    record(`${viewport.name} ${route} Escape closes`, (await trigger.getAttribute("aria-expanded")) === "false");
    record(`${viewport.name} ${route} Escape returns focus`, await trigger.evaluate((node) => node === document.activeElement));

    await trigger.press("Enter");
    record(`${viewport.name} ${route} keyboard Enter opens`, (await trigger.getAttribute("aria-expanded")) === "true");
    await page.evaluate(() => document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerType: "touch" })));
    record(`${viewport.name} ${route} outside pointer closes`, (await trigger.getAttribute("aria-expanded")) === "false");

    const logo = page.locator('header a[href="/"], nav a[href="/"]').first();
    record(`${viewport.name} ${route} logo home link`, (await logo.count()) === 1);
    const visibleNavLinks = await page.locator("header a:visible, nav a:visible").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")).filter(Boolean));
    record(`${viewport.name} ${route} other navigation links retained`, visibleNavLinks.length >= 2, visibleNavLinks);

    if (viewport.name === "desktop") {
      const headerHrefs = [...new Set(await page.locator("header a[href], nav a[href]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")).filter(Boolean)))];
      const brokenHeaderHrefs = [];
      for (const href of headerHrefs) {
        if (href.startsWith("tel:") || href.startsWith("mailto:")) continue;
        const target = new URL(href, page.url());
        if (target.origin !== new URL(baseUrl).origin) continue;
        if (target.pathname === new URL(page.url()).pathname && target.hash) {
          const targetExists = await page.evaluate((hash) => Boolean(document.getElementById(decodeURIComponent(hash.slice(1)))), target.hash);
          if (!targetExists) brokenHeaderHrefs.push(href);
          continue;
        }
        const response = await page.request.get(`${baseUrl}${target.pathname}`);
        if (!response.ok()) brokenHeaderHrefs.push(`${href} (${response.status()})`);
      }
      record(`desktop ${route} logo and other header destinations resolve`, brokenHeaderHrefs.length === 0, { headerHrefs, brokenHeaderHrefs });
    }

    const shouldCapture =
      (route === "/" && viewport.name === "desktop") ||
      (route === "/rodent-dropping-cleanup-san-jose/" && viewport.name === "tablet") ||
      (route === "/estate-cleanout-san-jose/" && ["mobile", "narrow"].includes(viewport.name));
    if (shouldCapture) {
      await trigger.click();
      await page.screenshot({ path: `${outputDir}/${viewport.name}-${route.replaceAll("/", "-") || "home"}.png`, fullPage: false });
      await page.keyboard.press("Escape");
    }
  }
}

for (const route of campaignRoutes) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  record(`campaign ${route} has no Services disclosure`, (await page.locator("[data-service-disclosure]").count()) === 0);
  const campaignLogoHref = await page.locator("header a:has(img)").first().getAttribute("href");
  record(`campaign ${route} logo remains a working link`, Boolean(campaignLogoHref), campaignLogoHref);
  const campaignHeaderHrefs = await page.locator("header a[href]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")).filter(Boolean));
  const brokenCampaignHrefs = await page.evaluate((hrefs) => hrefs.filter((href) => href.startsWith("#") && !document.getElementById(decodeURIComponent(href.slice(1)))), campaignHeaderHrefs);
  record(`campaign ${route} simplified header links resolve`, brokenCampaignHrefs.length === 0, { campaignHeaderHrefs, brokenCampaignHrefs });
}

for (const [, href] of expectedServices) {
  const response = await page.request.get(`${baseUrl}${href}`);
  record(`service route ${href} responds`, response.ok(), response.status());
}

await browser.close();
const failures = checks.filter((check) => !check.pass);
const report = { generatedAt: new Date().toISOString(), baseUrl, checks, failures };
await writeFile(`${outputDir}/results.json`, `${JSON.stringify(report, null, 2)}\n`);

console.log(`${checks.length - failures.length}/${checks.length} checks passed`);
if (failures.length) {
  for (const failure of failures) console.error("FAIL", failure.name, failure.detail ?? "");
  process.exitCode = 1;
}
