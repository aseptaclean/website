// Visual-port evidence capture (PORT-PROMPT.md §6 gate 7). Serves dist/ over a local static
// server, then for each gate-7 route screenshots 390px and 1440px, measures the H1:body ratio
// on COMPUTED styles (AGENTS.md §6 type law #2 is measured, not read off tokens), checks for
// horizontal overflow and page-level JS errors, and captures the mobile drawer open at 390px.
//
// The scroll-settle before each fullPage capture is not cosmetic: Chromium's
// captureBeyondViewport photographed unstyled regions at the bottom of the taller pages
// without it, which reads as a broken footer in the evidence when the DOM is fine.
//
// Usage: node scripts/port-shots.mjs <output-dir>
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "/Users/biancapimentel/Documents/aseptaclean-codex-starter/dist";
const OUT = process.argv[2];
await mkdir(OUT, { recursive: true });

const MIME = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript",
  ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml", ".woff2":"font/woff2",
  ".xml":"application/xml", ".txt":"text/plain", ".ico":"image/x-icon" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = join(ROOT, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404); return res.end("nf"); }
  const body = await readFile(f);
  res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
  res.end(body);
});
await new Promise(r => server.listen(4321, r));

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const routes = [
  ["home", "/"],
  ["hub-detailed-cleaning", "/detailed-cleaning/"],
  ["service-deep-cleaning", "/deep-cleaning-san-jose/"],
  ["request-assessment", "/request-assessment/"],
  ["about", "/about/"],
];
const results = [];
for (const [name, path] of routes) {
  for (const [w, h, tag] of [[390, 900, "390"], [1440, 1000, "1440"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    // NOT networkidle: the Turnstile widget holds open blob: requests to
    // challenges.cloudflare.com for the life of the page, so network never goes idle and every
    // capture times out. Wait for load + webfonts instead — fonts are what actually has to
    // settle before a screenshot is meaningful.
    await page.goto(`http://localhost:4321${path}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => requestAnimationFrame(r));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 250));
    });
    await page.screenshot({ path: join(OUT, `${name}-${tag}.png`), fullPage: true });

    // measured H1 : body ratio on COMPUTED styles
    const m = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const px = el => parseFloat(getComputedStyle(el).fontSize);
      return { h1: h1 ? px(h1) : null, body: px(document.body),
               scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
    });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    results.push({ route: path, width: w, h1: m.h1, body: m.body, pageHeight: height,
      ratio: m.h1 ? +(m.h1 / m.body).toFixed(2) : null,
      hOverflow: m.scrollW > m.clientW ? `${m.scrollW}>${m.clientW}` : "none",
      jsErrors: errors.length });
    await ctx.close();
  }
}

// mobile drawer OPEN at 390. Captured against the VIEWPORT, not fullPage: the drawer is
// position:fixed;inset:0, so a fullPage capture stretches the page behind it and photographs
// the document instead of the drawer.
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:4321/", { waitUntil: "load" });  // see note above re Turnstile
await page.evaluate(() => document.fonts.ready);
await page.click("label.burger");
await page.waitForTimeout(400);
await page.screenshot({ path: join(OUT, "drawer-open-390.png") });          // as it opens

const groups = await page.$$("#ac-drawer details");
for (const g of groups) await g.evaluate(el => el.open = true);
await page.waitForTimeout(250);
await page.locator("#ac-drawer").screenshot({ path: join(OUT, "drawer-open-390-expanded.png") });
const drawerLinks = await page.$$eval("#ac-drawer a[href]", as => as.map(a => a.getAttribute("href")));
await ctx.close();

console.log(JSON.stringify({ results, drawerLinks }, null, 2));
await browser.close();
server.close();
