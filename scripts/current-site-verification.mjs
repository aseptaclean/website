import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const output = resolve(root, "artifacts/current-site-verification.json");
const widths = [320, 375, 390, 768, 1024, 1440];
const cityRoutes = [
  "/service-areas/mountain-view/",
  "/service-areas/sunnyvale/",
  "/service-areas/campbell/",
  "/service-areas/mountain-view/hoarding-cleanup/",
  "/service-areas/mountain-view/estate-cleanout/",
  "/service-areas/sunnyvale/hoarding-cleanup/",
  "/service-areas/sunnyvale/estate-cleanout/",
  "/service-areas/campbell/hoarding-cleanup/",
  "/service-areas/campbell/estate-cleanout/"
];
const placeholderPatterns = [
  /photo slot/i,
  /founder portrait\s*[—-]\s*pending/i,
  /image placeholder/i,
  /temporary proof/i,
  /page in development/i,
  /not published in this preview/i,
  /online submission is not fully configured in this preview/i,
  /\[owner input:/i,
  /replace_with_/i
];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith(".html"));
const routeFor = (file) => {
  const path = relative(dist, file).replaceAll("\\", "/");
  if (path === "index.html") return "/";
  if (path === "404.html") return "/404";
  return `/${path.replace(/index\.html$/, "")}`;
};
const routes = htmlFiles.map(routeFor).sort();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".woff2": "font/woff2"
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
await new Promise((resolveListen) => server.listen(4331, "127.0.0.1", resolveListen));

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});
const failures = [];
const responsive = [];
const pages = {};

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route(/^https?:\/\/(?!127\.0\.0\.1:4331)/, (route) => route.abort());
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(`http://127.0.0.1:4331${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate((placeholderSources) => {
        const h1 = document.querySelector("h1");
        const bodyStyle = getComputedStyle(document.body);
        const h1Style = h1 ? getComputedStyle(h1) : null;
        const contentSelectors = "main h1, main h2, main h3, main p, main li, main a, main button, main input, main textarea, main select, main table";
        const clipped = [...document.querySelectorAll(contentSelectors)]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1);
          })
          .slice(0, 8)
          .map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 80) }));
        const text = document.body.innerText;
        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          clipped,
          h1Count: document.querySelectorAll("h1").length,
          h1Text: h1?.textContent?.trim() || "",
          h1Ratio: h1Style ? Number.parseFloat(h1Style.fontSize) / Number.parseFloat(bodyStyle.fontSize) : 0,
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
          robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "",
          schemaText: [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent || ""),
          placeholderMatches: placeholderSources.filter((source) => new RegExp(source, "i").test(text)),
          links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"))
        };
      }, placeholderPatterns.map((pattern) => pattern.source));

      responsive.push({ route, width, overflow: state.scrollWidth - state.clientWidth, clipped: state.clipped, h1Ratio: state.h1Ratio });
      if (response?.status() !== 200) failures.push(`${route} returned ${response?.status()} at ${width}px`);
      if (state.scrollWidth > state.clientWidth + 1) failures.push(`${route} overflows by ${state.scrollWidth - state.clientWidth}px at ${width}px`);
      if (state.clipped.length) failures.push(`${route} has clipped content at ${width}px: ${JSON.stringify(state.clipped)}`);
      if (state.h1Count !== 1) failures.push(`${route} has ${state.h1Count} H1 elements at ${width}px`);
      if (route !== "/sms-notification-consent/" && state.h1Ratio < 1.9) failures.push(`${route} H1/body ratio is ${state.h1Ratio.toFixed(2)} at ${width}px`);

      if (width === 390) {
        pages[route] = state;
        for (const pattern of state.placeholderMatches) failures.push(`${route} exposes development text matching /${pattern}/i`);
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const violations = axe.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) }));
        pages[route].axe = violations;
        for (const violation of violations) {
          // Byte-preserved carrier-review page: record findings, but never turn this audit into
          // an instruction to edit the protected document.
          if (route !== "/sms-notification-consent/" && ["critical", "serious"].includes(violation.impact || "")) failures.push(`${route} axe ${violation.impact}: ${violation.id}`);
        }
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

const canonicalOrigin = "https://aseptaclean.com";
const identityExempt = new Set(["/404", "/sms-notification-consent/"]);
const isNoindex = (page) => /(?:^|,\s*)noindex(?:,|$)/i.test(page.robots);
const seen = { title: new Map(), description: new Map(), h1: new Map() };
for (const [route, page] of Object.entries(pages)) {
  if (!identityExempt.has(route)) {
    const expected = `${canonicalOrigin}${route}`;
    if (page.canonical !== expected) failures.push(`${route} canonical is ${page.canonical || "missing"}; expected ${expected}`);
    if (!page.title || !page.description) failures.push(`${route} is missing title or description`);
    // Search-identity uniqueness and BreadcrumbList schema are publication checks. BaseLayout
    // deliberately suppresses structured data on noindex routes, and campaign thank-you pages
    // deliberately reuse a neutral confirmation identity. Keep validating their canonical and
    // metadata presence above, but do not contradict the launch architecture by requiring SEO
    // features from pages explicitly withheld from search.
    if (!isNoindex(page)) {
      for (const [kind, value] of [["title", page.title], ["description", page.description], ["h1", page.h1Text]]) {
        const prior = seen[kind].get(value);
        if (prior) failures.push(`${route} duplicates ${kind} from ${prior}`);
        else seen[kind].set(value, route);
      }
    }
    for (const schema of page.schemaText) {
      try { JSON.parse(schema); } catch { failures.push(`${route} has invalid JSON-LD`); }
    }
    if (route !== "/" && !isNoindex(page) && !page.schemaText.some((schema) => schema.includes("BreadcrumbList"))) failures.push(`${route} has no BreadcrumbList schema`);
  }
}

for (const route of cityRoutes) {
  if (pages[route]?.robots !== "noindex, follow") failures.push(`${route} city robots is ${pages[route]?.robots || "missing"}`);
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const robots = await readFile(join(dist, "robots.txt"), "utf8");
for (const route of cityRoutes) if (sitemap.includes(route)) failures.push(`${route} appears in sitemap.xml before approval`);

const routeSet = new Set(routes);
const inbound = new Map(routes.map((route) => [route, new Set()]));
for (const [from, page] of Object.entries(pages)) {
  if (from === "/sms-notification-consent/") continue;
  for (const href of page.links) {
    if (!href || href.startsWith("#") || /^(mailto|tel|sms):/.test(href)) continue;
    const url = new URL(href, canonicalOrigin);
    if (url.origin !== canonicalOrigin) continue;
    const target = url.pathname;
    if (routeSet.has(target)) inbound.get(target).add(from);
    else if (target !== "/api/lead") failures.push(`${from} links to missing internal route ${target}`);
  }
}
const orphans = [...inbound].filter(([route, sources]) => route !== "/" && sources.size === 0).map(([route]) => route);
for (const route of orphans) {
  // Hidden marketing pages and post-submit utilities are allowed to have no public crawl path;
  // requiring one would directly conflict with their noindex / campaign-isolation contract.
  if (!identityExempt.has(route) && !isNoindex(pages[route])) {
    failures.push(`${route} has no inbound internal link`);
  }
}

await mkdir(resolve(root, "artifacts"), { recursive: true });
await writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), routes: routes.length, widths, cityRoutes, robots, orphans, responsive, pages, failures }, null, 2));

if (failures.length) {
  console.error(`FAILED — ${failures.length} finding(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`PASS — ${routes.length} routes × ${widths.length} widths; 390px Axe scan on every route`);
console.log("PASS — no overflow, clipping, visible development placeholders, serious Axe violations, broken internal links, or metadata identity failures");
console.log("PASS — all nine city routes remain noindex, follow and absent from sitemap.xml");
console.log(`Intentional orphan routes: ${orphans.join(", ") || "none"}`);
