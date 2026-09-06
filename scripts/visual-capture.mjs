// Visual capture for the 2026-09-04 rebuild. Serves dist/ and screenshots every public route at
// the documented viewport set, full page plus an above-the-fold crop.
//
// Usage:  node scripts/visual-capture.mjs [outputDir] [--routes=/,/services/]
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outputDirectory = process.argv[2] || "./.visual";
const routeArg = process.argv.find((a) => a.startsWith("--routes="));
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ALL_ROUTES = [
  ["/", "01-home"],
  ["/services/", "02-services"],
  ["/hoarding-cleanup-san-jose/", "03-hoarding"],
  ["/extreme-cleaning-san-jose/", "04-extreme"],
  ["/deep-cleaning-san-jose/", "05-deep-cleaning"],
  ["/crime-scene-trauma-cleanup-san-jose/", "06-trauma"],
  ["/rodent-dropping-cleanup-san-jose/", "07-rodent"],
  ["/about/", "08-about"],
  ["/contact/", "09-contact"],
  ["/privacy/", "10-privacy"],
  ["/terms/", "11-terms"],
  ["/cookie-policy/", "12-cookie-policy"],
  ["/request-assessment/", "13-request-assessment"]
];

const routes = routeArg
  ? routeArg
      .slice("--routes=".length)
      .split(",")
      .map((r) => [r, r.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"])
  : ALL_ROUTES;

// Documented viewport set — doc 30 §14 / design system §30–§31, plus a short desktop viewport
// to prove the hero form is not clipped when vertical space is tight.
const VIEWPORTS = [
  { label: "1440", width: 1440, height: 900 },
  { label: "1280x720", width: 1280, height: 720 },
  { label: "1024", width: 1024, height: 800 },
  { label: "768", width: 768, height: 900 },
  { label: "390", width: 390, height: 844 }
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8"
};

const root = new URL("../dist/", import.meta.url).pathname;

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  let filePath = join(root, normalize(decodeURIComponent(url.pathname)));
  try {
    const info = await stat(filePath).catch(() => null);
    if (!info || info.isDirectory()) filePath = join(filePath, "index.html");
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const problems = [];

for (const [route, label] of routes) {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (error) => consoleErrors.push(String(error)));

    // Third-party scripts (Termly consent, Cloudflare Turnstile) are abandoned rather than
    // awaited: they hold the connection open, so `networkidle` never fires, and neither one
    // affects the composition being captured. Their absence is why the Turnstile widget shows
    // as an empty slot in these captures — that is the capture harness, not the page.
    await context.route("**://*/**", (routeReq) => {
      const url = routeReq.request().url();
      if (url.startsWith(base)) return routeReq.continue();
      return routeReq.abort();
    });

    await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(400);

    // CAPTURE HARNESS ONLY — flip loading="lazy" to eager, then scroll once.
    // A synthetic window.scrollTo does not reliably trip Chrome's lazy-load heuristic, so
    // below-fold photography stayed unrequested (currentSrc empty) and the full-page capture
    // showed white boxes that look exactly like a broken layout. The site keeps lazy loading;
    // this only affects what the screenshot sees.
    await page.evaluate(async () => {
      document.querySelectorAll("img[loading='lazy']").forEach((img) => {
        img.loading = "eager";
      });
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });

    // Then wait for every <img> to actually finish decoding. Scrolling only STARTS the lazy
    // fetch; without this the capture races the decode and below-fold photography lands in the
    // screenshot as white boxes.
    await page
      .waitForFunction(
        () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
        null,
        { timeout: 15000 }
      )
      .catch(() => problems.push(`${route} @${viewport.label}: an image never finished loading`));
    await page.waitForTimeout(300);

    // Horizontal-overflow check at every width.
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scrollW: doc.scrollWidth, clientW: doc.clientWidth };
    });
    if (overflow.scrollW > overflow.clientW + 1) {
      problems.push(`${route} @${viewport.label}: horizontal overflow ${overflow.scrollW}>${overflow.clientW}`);
    }
    if (consoleErrors.length) {
      problems.push(`${route} @${viewport.label}: page error ${consoleErrors[0]}`);
    }

    await page.screenshot({
      path: join(outputDirectory, `${label}-${viewport.label}-fold.png`),
      fullPage: false
    });
    if (viewport.label === "1440" || viewport.label === "390") {
      await page.screenshot({
        path: join(outputDirectory, `${label}-${viewport.label}-full.png`),
        fullPage: true
      });
    }
    await context.close();
  }
}

await browser.close();
server.close();

if (problems.length) {
  console.log("PROBLEMS:");
  for (const problem of problems) console.log("  " + problem);
} else {
  console.log("No horizontal overflow or page errors at any captured viewport.");
}
console.log(`Screenshots: ${outputDirectory}`);
