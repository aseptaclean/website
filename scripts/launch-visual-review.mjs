// Launch visual review — homepage, Services hub, five core service pages, About, Contact and the
// PPC landing page, desktop + mobile. Serves the real dist/ build and checks for concrete defects:
// broken images, horizontal overflow, leftover "illustrative reference" labels, duplicate H1s,
// and broken internal nav/CTA links. Captures full-page screenshots for manual visual review.
//
// Usage: node scripts/launch-visual-review.mjs <outDir>
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./artifacts/launch-visual-review";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/services/", label: "services-hub" },
  { path: "/hoarding-cleanup-san-jose/", label: "svc-hoarding" },
  { path: "/extreme-cleaning-san-jose/", label: "svc-extreme" },
  { path: "/deep-cleaning-san-jose/", label: "svc-deep-cleaning" },
  { path: "/crime-scene-trauma-cleanup-san-jose/", label: "svc-trauma" },
  { path: "/rodent-dropping-cleanup-san-jose/", label: "svc-rodent" },
  { path: "/about/", label: "about" },
  { path: "/contact/", label: "contact" },
  { path: "/hoarding-cleanup-san-jose/assessment/", label: "ppc-hoarding" }
];

const VIEWPORTS = [
  { label: "desktop-1440x900", width: 1440, height: 900 },
  { label: "mobile-390x844", width: 390, height: 844 }
];

const BANNED_STRINGS = [
  "illustrative reference",
  "reference image",
  "representative image",
  "sample image",
  "image placeholder",
  "development reference",
  "not aseptaclean project work",
  "[owner input",
  "replace_with_"
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
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
await mkdir(outDir, { recursive: true });

const step = (m) => process.stderr.write(`${m}\n`);
const report = [];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    step(`→ ${route.label} @ ${vp.label}`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    await page.route("**/*", (r) =>
      r.request().url().startsWith(base) ? r.continue() : r.fulfill({ status: 204, body: "" })
    );
    let navError = null;
    try {
      await page.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    } catch (e) {
      navError = e.message;
    }

    if (!navError) {
      await page.evaluate(async () => {
        const total = document.documentElement.scrollHeight;
        for (let y = 0; y < total; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        window.scrollTo(0, 0);
        const deadline = Date.now() + 4000;
        while (Date.now() < deadline) {
          if (Array.from(document.images).every((i) => i.complete)) break;
          await new Promise((r) => setTimeout(r, 100));
        }
      });
      await page.waitForTimeout(300);
    }

    const data = navError
      ? { navError }
      : await page.evaluate((banned) => {
          const brokenImages = Array.from(document.images)
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.currentSrc || i.src);

          const bodyText = document.body.innerText.toLowerCase();
          const bannedHits = banned.filter((s) => bodyText.includes(s));

          const h1s = Array.from(document.querySelectorAll("h1")).map((h) => h.textContent.trim());

          // Duplicate section detector: same heading text (h2) appearing more than once, a proxy
          // for an accidentally duplicated section.
          const h2Texts = Array.from(document.querySelectorAll("h2")).map((h) =>
            h.textContent.trim()
          );
          const h2Counts = {};
          for (const t of h2Texts) h2Counts[t] = (h2Counts[t] || 0) + 1;
          const duplicateH2 = Object.entries(h2Counts).filter(([, n]) => n > 1);

          const links = Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"));
          const telLinks = [...new Set(links.filter((h) => h.startsWith("tel:")))];

          const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;

          return {
            title: document.title,
            brokenImages,
            bannedHits,
            h1Count: h1s.length,
            h1s,
            duplicateH2,
            telLinks,
            overflowX,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            internalLinkCount: links.filter((h) => h.startsWith("/")).length
          };
        }, BANNED_STRINGS);

    if (!navError) {
      await page.screenshot({
        path: `${outDir}/${route.label}-${vp.label}.png`,
        fullPage: true
      });
    }

    report.push({ route: route.path, label: route.label, viewport: vp.label, ...data });
    await page.close();
  }
}

// Broken internal link check — one pass, all unique internal hrefs found across all pages.
step("→ checking internal link targets");
const allHrefs = new Set();
{
  const page = await browser.newPage();
  await page.route("**/*", (r) =>
    r.request().url().startsWith(base) ? r.continue() : r.fulfill({ status: 204, body: "" })
  );
  for (const route of ROUTES) {
    await page.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" }).catch(() => {});
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.startsWith("/") && !h.startsWith("//"))
    );
    hrefs.forEach((h) => allHrefs.add(h.split("#")[0] || "/"));
  }
  await page.close();
}
const linkChecks = [];
for (const href of allHrefs) {
  if (!href) continue;
  const res = await fetch(`${base}${href}`).catch((e) => ({ status: `ERROR:${e.message}` }));
  linkChecks.push({ href, status: res.status });
}
const brokenLinks = linkChecks.filter((l) => l.status !== 200);

await writeFile(`${outDir}/report.json`, JSON.stringify({ report, linkChecks }, null, 2));

console.log("\n=== DEFECT SUMMARY ===");
for (const r of report) {
  const problems = [];
  if (r.navError) problems.push(`NAV ERROR: ${r.navError}`);
  if (r.brokenImages?.length) problems.push(`broken images: ${r.brokenImages.join(", ")}`);
  if (r.bannedHits?.length) problems.push(`leftover reference label: ${r.bannedHits.join(", ")}`);
  if (r.h1Count !== 1) problems.push(`H1 count = ${r.h1Count} (expected 1): ${JSON.stringify(r.h1s)}`);
  if (r.duplicateH2?.length) problems.push(`duplicate H2: ${JSON.stringify(r.duplicateH2)}`);
  if (r.overflowX) problems.push(`horizontal overflow: scrollWidth ${r.scrollWidth} > clientWidth ${r.clientWidth}`);
  if (problems.length) {
    console.log(`\n[ISSUE] ${r.label} @ ${r.viewport} (${r.route})`);
    problems.forEach((p) => console.log(`   - ${p}`));
  } else {
    console.log(`OK      ${r.label.padEnd(18)} @ ${r.viewport}`);
  }
}

console.log("\n=== INTERNAL LINK CHECK ===");
console.log(`${linkChecks.length} unique internal hrefs checked, ${brokenLinks.length} broken`);
brokenLinks.forEach((l) => console.log(`   BROKEN: ${l.href} -> ${l.status}`));

await browser.close();
server.close();
console.log(`\nWrote ${outDir}/report.json and screenshots.`);
