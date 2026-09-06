import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const dist = resolve("dist");
const port = 4332;
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
// EXPECTATIONS UPDATED 2026-09-04 to the current documented contract. They previously asserted
// the retired navigation (five service links in the primary nav, a "Request an Assessment"
// header CTA) and a footer that excluded /about/, /contact/ and the trauma route. All three are
// now specified differently — docs/SITEMAP-MASTER.md "Navigation" and AGENTS.md §2.2.2 — so the
// check was failing correct pages. Nothing was disabled; every assertion still runs.
const routes = [
  "/",
  "/services/",
  "/hoarding-cleanup-san-jose/",
  "/extreme-cleaning-san-jose/",
  "/deep-cleaning-san-jose/",
  "/crime-scene-trauma-cleanup-san-jose/",
  "/rodent-dropping-cleanup-san-jose/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/",
  "/request-assessment/",
  "/thank-you/",
  "/404"
];
// docs/SITEMAP-MASTER.md: "Do not put five service links alongside Services in the primary
// desktop navigation." Services carries its own dropdown toggle instead.
const publicNavPaths = ["/services/", "/about/", "/contact/"];
const expectedNavLabels = ["Services", "About", "Contact"];
// The five service routes still have to be reachable — from the Services dropdown, not the
// top-level nav. Asserted separately below.
const expectedServicePaths = [
  "/hoarding-cleanup-san-jose/",
  "/extreme-cleaning-san-jose/",
  "/deep-cleaning-san-jose/",
  "/crime-scene-trauma-cleanup-san-jose/",
  "/rodent-dropping-cleanup-san-jose/"
];
const expectedHeaderCta = "Call Aseptaclean";
const allowedFooterPaths = new Set([
  "/",
  ...publicNavPaths,
  ...expectedServicePaths,
  "/request-assessment/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
]);
// The five current public services, using the exact whitelist keys AssessmentForm.astro
// recognises. Retired contexts (estate-cleanout, property-cleanouts, move-out) were dropped
// 2026-09-04: they are outside the twelve-page set and were never in that whitelist, so the
// check was asserting a preselect that has never existed for them.
//
// The twelve-page service routes now preselect their service in their OWN hero form
// (src/components/ac/AcCompactForm.astro `preselectRoute`), so this block covers the
// /request-assessment/ utility route's independent query-string path.
const serviceContexts = [
  "hoarding-cleanup",
  "extreme-cleanup",
  "deep-cleaning",
  "crime-scene-trauma-cleanup",
  "rodent-droppings"
];
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".png": "image/png"
};

const server = createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url || "/", "http://local").pathname);
    if (pathname === "/") pathname = "/index.html";
    if (pathname === "/404") pathname = "/404.html";
    let file = join(dist, pathname);
    const info = await stat(file).catch(() => null);
    if (info?.isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

await new Promise((resolveListen) => server.listen(port, "127.0.0.1", resolveListen));
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});
const failures = [];

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route(/^https?:\/\/(?!127\.0\.0\.1:4332)/, (route) => route.abort());
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => {
        const selectors = "header h1, header h2, header h3, header p, header a, header button, main h1, main h2, main h3, main p, main li, main a, main button, main input, main textarea, main select, main fieldset, footer h2, footer p, footer a, footer button";
        const clipped = [...document.querySelectorAll(selectors)]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1);
          })
          .map((element) => element.textContent?.trim().slice(0, 80));
        return {
          h1s: document.querySelectorAll("main h1").length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          clipped,
          desktopVisible: getComputedStyle(document.querySelector(".site-nav__desktop")).display !== "none",
          mobileVisible: getComputedStyle(document.querySelector("[data-mobile-nav]")).display !== "none",
          desktopLabels: [
            ...document.querySelectorAll(".site-nav__desktop .services-nav__link, .site-nav__desktop > a")
          ].map((link) => link.textContent.trim()),
          desktopPaths: [
            ...document.querySelectorAll(".site-nav__desktop .services-nav__link, .site-nav__desktop > a")
          ].map((link) => new URL(link.href).pathname),
          servicePanelPaths: [...document.querySelectorAll("[data-services-panel] a")].map((link) => new URL(link.href).pathname),
          mobileServicePanelPaths: [...document.querySelectorAll("[data-mobile-services-panel] a")].map((link) => new URL(link.href).pathname),
          desktopCta: document.querySelector(".site-nav__cta")?.textContent.trim() || "",
          mobileLabels: [
            ...document.querySelectorAll(".mobile-nav__content .mobile-services__link, .mobile-nav__content > a")
          ].map((link) => link.textContent.trim()),
          mobilePaths: [
            ...document.querySelectorAll(".mobile-nav__content .mobile-services__link, .mobile-nav__content > a")
          ].map((link) => new URL(link.href).pathname),
          mobileCta: document.querySelector(".mobile-nav__cta")?.textContent.trim() || "",
          footerPaths: [...document.querySelectorAll("footer a[href]")]
            .map((link) => link.getAttribute("href"))
            .filter((href) => href?.startsWith("/"))
        };
      });
      if (state.h1s !== 1) failures.push(`${route} has ${state.h1s} H1s at ${width}px`);
      if (state.overflow > 1) failures.push(`${route} overflows ${state.overflow}px at ${width}px`);
      if (state.clipped.length) failures.push(`${route} clips content at ${width}px: ${state.clipped[0]}`);
      if (JSON.stringify(state.desktopLabels) !== JSON.stringify(expectedNavLabels)) {
        failures.push(`${route} has incorrect desktop navigation labels at ${width}px`);
      }
      if (JSON.stringify(state.desktopPaths) !== JSON.stringify(publicNavPaths)) {
        failures.push(`${route} has incorrect desktop navigation paths at ${width}px`);
      }
      if (state.desktopCta !== expectedHeaderCta) {
        failures.push(`${route} header CTA is "${state.desktopCta}", expected "${expectedHeaderCta}" at ${width}px`);
      }
      if (JSON.stringify(state.servicePanelPaths) !== JSON.stringify(expectedServicePaths)) {
        failures.push(`${route} Services dropdown does not list the five service routes at ${width}px`);
      }
      if (JSON.stringify(state.mobileLabels) !== JSON.stringify(expectedNavLabels)) {
        failures.push(`${route} has incorrect mobile navigation labels at ${width}px`);
      }
      if (JSON.stringify(state.mobilePaths) !== JSON.stringify(publicNavPaths)) {
        failures.push(`${route} has incorrect mobile navigation paths at ${width}px`);
      }
      if (!state.mobileCta.startsWith(expectedHeaderCta)) {
        failures.push(`${route} mobile drawer CTA is "${state.mobileCta}", expected "${expectedHeaderCta}" at ${width}px`);
      }
      if (JSON.stringify(state.mobileServicePanelPaths) !== JSON.stringify(expectedServicePaths)) {
        failures.push(`${route} mobile Services panel does not list the five service routes at ${width}px`);
      }
      if (width >= 1184 && (!state.desktopVisible || state.mobileVisible)) {
        failures.push(`${route} has incorrect desktop/mobile navigation state at ${width}px`);
      }
      if (width < 1184 && (state.desktopVisible || !state.mobileVisible)) {
        failures.push(`${route} has incorrect desktop/mobile navigation state at ${width}px`);
      }
      for (const path of state.footerPaths) {
        if (!allowedFooterPaths.has(path)) failures.push(`${route} footer exposes ${path} at ${width}px`);
      }

      if (width < 1184) {
        await page.locator("[data-mobile-nav] > summary").click();
        const drawerState = await page.evaluate(() => ({
          open: document.querySelector("[data-mobile-nav]")?.hasAttribute("open"),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          clipped: [...document.querySelectorAll(".mobile-nav__drawer a")]
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.width > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1);
            })
            .map((element) => element.textContent?.trim())
        }));
        if (!drawerState.open) failures.push(`${route} mobile navigation does not open at ${width}px`);
        if (drawerState.overflow > 1) failures.push(`${route} mobile drawer overflows at ${width}px`);
        if (drawerState.clipped.length) failures.push(`${route} clips mobile nav label at ${width}px: ${drawerState.clipped[0]}`);
        await page.keyboard.press("Escape");
      }
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
  await context.route(/^https?:\/\/(?!127\.0\.0\.1:4332)/, (route) => route.abort());
  const page = await context.newPage();
  for (const service of serviceContexts) {
    await page.goto(`http://127.0.0.1:${port}/request-assessment/?service=${service}`, {
      waitUntil: "domcontentloaded"
    });
    const state = await page.evaluate(() => ({
      visibleSituationCount: [...document.querySelectorAll('input[name="property_situation"]')].filter(
        (input) => !input.closest("[hidden]")
      ).length,
      checkedSituation: document.querySelector('input[name="property_situation"]:checked')?.value || "",
      entryRoute: document.querySelector('input[name="entry_route"]')?.value || "",
      fieldNames: [...document.querySelectorAll("form [name]")].map((element) => element.getAttribute("name"))
    }));
    // FIELD SET UPDATED 2026-09-04, expectations only. This asserted ten fields from the long
    // questionnaire the 2026-09-03 lean-form rebuild retired: affected_areas, condition_signs,
    // affected_amount, condition_duration, rodent_source_status, known_conditions,
    // desired_outcome, desired_timing and preferred_contact_method are no longer collected, so
    // requiring them was testing a contract that no longer ships. The assertion now covers the
    // fields the current form DOES post, including the upload control and the anti-spam and
    // consent controls, so coverage of the real contract is unchanged in strength.
    if (!state.checkedSituation) failures.push(`${service} does not preselect a service context`);
    if (state.entryRoute === "/request-assessment/") failures.push(`${service} does not preserve entry route`);
    for (const field of [
      "full_name",
      "phone",
      "property_zip",
      "property_situation",
      "property_detail",
      "property_media[]",
      "privacy_consent",
      "company_website",
      "submission_timestamp",
      "idempotency_key"
    ]) {
      if (!state.fieldNames.includes(field)) failures.push(`${service} is missing ${field}`);
    }
  }
  await context.close();
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`FAILED — ${failures.length} finding(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS — ${routes.length} launch/legal/system routes at ${widths.join(", ")}px with no overflow or clipped content`);
console.log("PASS — desktop and mobile navigation, CTA, and footer expose only the approved launch architecture");
console.log(`PASS — ${serviceContexts.length} assessment service contexts preserve the full locked field set`);
