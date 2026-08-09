import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright-core";

const root = process.cwd();
const distDir = resolve(root, "dist");
const outDir = resolve(root, "artifacts/full-site-check");
const shotDir = resolve(outDir, "screenshots");
await mkdir(outDir, { recursive: true });
await mkdir(shotDir, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".json": "application/json"
};

async function resolvePath(urlPath) {
  let p = urlPath.split("?")[0].split("#")[0];
  if (p === "/") p = "/index.html";
  let full = join(distDir, decodeURIComponent(p));
  try {
    const s = await stat(full);
    if (s.isDirectory()) full = join(full, "index.html");
  } catch {
    if (!extname(full)) {
      const withIndex = join(full, "index.html");
      try {
        await stat(withIndex);
        full = withIndex;
      } catch {
        const withHtml = `${full}.html`;
        try {
          await stat(withHtml);
          full = withHtml;
        } catch {
          // fall through, 404 handled by caller
        }
      }
    }
  }
  return full;
}

const server = createServer(async (req, res) => {
  try {
    const full = await resolvePath(req.url || "/");
    const body = await readFile(full);
    const ext = extname(full);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(body);
  } catch {
    try {
      const notFound = await readFile(join(distDir, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(notFound);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
});

await new Promise((r) => server.listen(4322, "127.0.0.1", r));
const baseUrl = "http://127.0.0.1:4322";
console.log(`Serving dist/ at ${baseUrl}`);

const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

const visited = new Map(); // path -> { status, title, ... }
const toVisit = ["/"];
const seedRoutes = [
  "/", "/about/", "/contact/", "/handoff-standard/", "/404",
  "/estate-cleanout-san-jose/", "/hoarding-cleanup-san-jose/",
  "/animal-waste-cleanup-san-jose/", "/senior-downsizing-san-jose/",
  "/estate-cleanout-checklist/", "/service-areas/", "/deep-cleaning-san-jose/",
  "/property-cleanouts-for-managers/", "/privacy/", "/terms/", "/cookie-policy/",
  "/thank-you/", "/request-assessment/", "/private-residence-reset/"
];
for (const r of seedRoutes) if (!toVisit.includes(r)) toVisit.push(r);

const brokenLinks = []; // { from, href, status }
const pageReports = [];
const externalLinksSeen = new Set();

function normalizeHref(href, fromPath) {
  if (!href) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) return { type: "contact", href };
  if (/^https?:\/\//i.test(href)) {
    try {
      const u = new URL(href);
      if (u.hostname === "aseptaclean.com" || u.hostname === "127.0.0.1") {
        return { type: "internal", href: u.pathname + u.search + u.hash };
      }
      return { type: "external", href };
    } catch {
      return { type: "external", href };
    }
  }
  if (href.startsWith("#")) return { type: "hash", href };
  // relative or absolute internal
  try {
    const u = new URL(href, `http://x${fromPath}`);
    return { type: "internal", href: u.pathname + u.search + u.hash };
  } catch {
    return null;
  }
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

while (toVisit.length) {
  const path = toVisit.shift();
  const cleanPath = path.split("#")[0] || "/";
  if (visited.has(cleanPath)) continue;

  const consoleErrors = [];
  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  let response;
  try {
    response = await page.goto(`${baseUrl}${cleanPath}`, { waitUntil: "load", timeout: 15000 });
    await page.waitForTimeout(500);
  } catch (e) {
    visited.set(cleanPath, { status: "ERROR", error: String(e) });
    continue;
  }
  const status = response?.status() ?? 0;

  const data = await page.evaluate(() => {
    const h1s = [...document.querySelectorAll("h1")];
    const schemaNodes = [...document.querySelectorAll('script[type="application/ld+json"]')];
    const schemas = [];
    const schemaErrors = [];
    for (const node of schemaNodes) {
      try {
        schemas.push(JSON.parse(node.textContent || ""));
      } catch (e) {
        schemaErrors.push(String(e));
      }
    }
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      robotsMeta: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "",
      h1Count: h1s.length,
      h1Text: h1s.map((h) => h.textContent?.trim()),
      schemaCount: schemas.length,
      schemaTypes: schemas.flatMap((s) => {
        const graph = s["@graph"] || [s];
        return graph.map((n) => n["@type"]).flat();
      }),
      schemaErrors,
      hasAggregateRating: document.documentElement.innerHTML.includes("AggregateRating"),
      links,
      lang: document.documentElement.getAttribute("lang")
    };
  });

  visited.set(cleanPath, { status, ...data, consoleErrors: [...consoleErrors] });

  for (const rawHref of data.links) {
    const norm = normalizeHref(rawHref, cleanPath);
    if (!norm) continue;
    if (norm.type === "external") {
      externalLinksSeen.add(norm.href);
      continue;
    }
    if (norm.type === "internal") {
      const p = norm.href.split("#")[0] || "/";
      if (!visited.has(p) && !toVisit.includes(p)) toVisit.push(p);
    }
  }
}

// Now verify every discovered internal link resolves with 200 (re-check via HEAD-like GET, using recorded statuses when possible)
for (const [path, info] of visited.entries()) {
  if (info.status !== 200 && info.status !== "ERROR") {
    brokenLinks.push({ path, status: info.status });
  } else if (info.status === "ERROR") {
    brokenLinks.push({ path, status: "ERROR", error: info.error });
  }
}

// Screenshots + per-page detail for "real" pages (exclude /dev/*)
const auditPaths = [...visited.keys()].filter((p) => !p.startsWith("/dev/"));
const widths = [390, 1440];
for (const path of auditPaths) {
  const info = visited.get(path);
  if (info.status !== 200) continue;
  const safeName = path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "_");
  for (const width of widths) {
    const shotPage = await browser.newPage({ viewport: { width, height: 900 } });
    try {
      await shotPage.goto(`${baseUrl}${path}`, { waitUntil: "load", timeout: 15000 });
      await shotPage.waitForTimeout(500);
      await shotPage.evaluate(() => document.fonts.ready);
      // Trigger scroll-linked IntersectionObserver reveals before capture.
      // Each step needs >=200ms dwell for the observer callback + CSS transition to land.
      await shotPage.evaluate(async () => {
        const step = Math.max(200, window.innerHeight);
        const total = document.documentElement.scrollHeight;
        for (let y = 0; y < total; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 250));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 300));
      });
      // Playwright's fullPage capture stitches multiple viewport screenshots while
      // scrolling internally; position:sticky/fixed elements re-anchor at each stitch
      // boundary and appear duplicated mid-page. Neutralize just those for this capture.
      await shotPage.evaluate(() => {
        for (const el of document.querySelectorAll("*")) {
          const pos = getComputedStyle(el).position;
          if (pos === "sticky" || pos === "fixed") {
            el.style.setProperty("position", "static", "important");
          }
        }
      });
      await shotPage.screenshot({ path: join(shotDir, `${safeName}__${width}.png`), fullPage: true });
    } catch (e) {
      console.error(`Screenshot failed for ${path} @ ${width}: ${e}`);
    }
    await shotPage.close();
  }
}

await browser.close();
server.close();

const report = {
  generatedAt: new Date().toISOString(),
  totalPagesCrawled: visited.size,
  pages: Object.fromEntries(visited),
  brokenLinks,
  externalLinksSeen: [...externalLinksSeen]
};
await writeFile(resolve(outDir, "crawl-report.json"), JSON.stringify(report, null, 2));
console.log(`Crawled ${visited.size} paths. Broken: ${brokenLinks.length}`);
console.log(`Report written to ${resolve(outDir, "crawl-report.json")}`);
