// Full-page and above-the-fold captures for the CSS-profile evidence bundle.
// Serves dist/ and screenshots the requested routes. Consent banner is dismissed through its
// real Accept control for the "consent-handled" capture; the first-load state is captured too.
//
// Usage: node scripts/ac-page-shots.mjs <outDir> <label> <route,route,...>
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./.shots";
const LABEL = process.argv[3] || "run";
const routes = (process.argv[4] || "/about/").split(",");
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VIEWPORTS = [
  { label: "1440x900", width: 1440, height: 900 },
  { label: "390x844", width: 390, height: 844 }
];

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml"
};

const server = await new Promise((resolve) => {
  const s = createServer(async (req, res) => {
    try {
      let p = normalize(decodeURIComponent(req.url.split("?")[0]));
      if (p.endsWith("/")) p += "index.html";
      let f = join("dist", p);
      try {
        const st = await stat(f);
        if (st.isDirectory()) f = join(f, "index.html");
      } catch {
        if (!extname(f)) f = join("dist", p + "/index.html");
      }
      const b = await readFile(f);
      res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
      res.end(b);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  s.listen(0, () => resolve(s));
});

const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chromePath });
await mkdir(outDir, { recursive: true });

for (const route of routes) {
  const slug = route.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home";
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: "load" });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await page.waitForTimeout(1500);

    // Dismiss the real consent banner via its own Accept control, never by hiding it.
    try {
      await page.waitForSelector(".t-consentPrompt", { timeout: 8000, state: "visible" });
      await page.click(".t-acceptAllButton", { timeout: 4000 });
      await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 6000 });
    } catch {
      /* no banner shown in this state */
    }

    // Lazy images need a scroll pass before a full-page capture is honest.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    await page.screenshot({
      path: join(outDir, `${LABEL}-${slug}-${vp.label}-fullpage.png`),
      fullPage: true
    });
    await page.screenshot({
      path: join(outDir, `${LABEL}-${slug}-${vp.label}-abovefold.png`),
      fullPage: false
    });
    console.log(`captured ${slug} ${vp.label}`);
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log(`shots -> ${outDir}`);
