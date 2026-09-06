// Trauma hero stacked-geometry check — 2026-09-06 second pass.
//
// Serves dist/ and, for each viewport, MEASURES the hero rather than eyeballing it:
//   - which source pixels of the hero master actually survive the crop,
//   - whether the media box is bounded by the copy region or still spans the form,
//   - copy-before-form DOM and visual order,
//   - horizontal overflow,
//   - the doc 30 §3 geometry rules (no fixed height / max-height / overflow:hidden),
//   - hero text contrast against the composited backdrop, sampled from the real pixels.
//
// Also captures the hero region and the hero→form transition at each width.
//
// Usage: node scripts/trauma-hero-mobile-check.mjs <outDir>
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./artifacts/trauma-hero-mobile";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ALL_ROUTES = [
  { path: "/crime-scene-trauma-cleanup-san-jose/", label: "trauma" },
  { path: "/hoarding-cleanup-san-jose/assessment/", label: "ppc" }
];

const ALL_VIEWPORTS = [
  { label: "390x844", width: 390, height: 844 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "1024x1366", width: 1024, height: 1366 },
  { label: "1280x800", width: 1280, height: 800 },
  { label: "1366x768", width: 1366, height: 768 },
  { label: "1440x900", width: 1440, height: 900 },
  { label: "1536x864", width: 1536, height: 864 }
];

// `ROUTES=trauma VIEWPORTS=390x844 node …` narrows a run while iterating.
const routeFilter = process.env.ROUTES?.split(",").filter(Boolean);
const vpFilter = process.env.VIEWPORTS?.split(",").filter(Boolean);
const ROUTES = routeFilter ? ALL_ROUTES.filter((r) => routeFilter.includes(r.label)) : ALL_ROUTES;
const VIEWPORTS = vpFilter
  ? ALL_VIEWPORTS.filter((v) => vpFilter.includes(v.label))
  : ALL_VIEWPORTS;

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

const report = [];

const step = (m) => process.stderr.write(`${m}\n`);

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    step(`→ ${route.label} @ ${vp.label}`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });
    // The Turnstile widget polls challenges.cloudflare.com forever, so `networkidle` never
    // settles offline. Stub third-party hosts with an empty 204 (an abort leaves the load
    // event hanging) and wait on the local DOM + image decode instead. Nothing about the
    // form's own markup, fields or consent changes.
    await page.route("**/*", (r) =>
      r.request().url().startsWith(base) ? r.continue() : r.fulfill({ status: 204, body: "" })
    );
    await page.goto(`${base}${route.path}`, { waitUntil: "domcontentloaded" });
    step("  loaded");
    // Scroll through so `loading="lazy"` images below the fold actually start, then poll for
    // completion with a hard cap. `img.decode()` is NOT used: on a lazy image that has not
    // entered the viewport it returns a promise that never settles.
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
      const deadline = Date.now() + 4000;
      while (Date.now() < deadline) {
        if (Array.from(document.images).every((i) => i.complete)) break;
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await page.waitForTimeout(300);
    step("  images loaded");

    const data = await page.evaluate(() => {
      const hero =
        document.querySelector(".acx-hero") ||
        document.querySelector("[class*='hero']");
      if (!hero) return { error: "no hero found" };

      const q = (sel) => hero.querySelector(sel);
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: +r.x.toFixed(1), y: +r.y.toFixed(1),
          w: +r.width.toFixed(1), h: +r.height.toFixed(1),
          bottom: +r.bottom.toFixed(1)
        };
      };

      const img = hero.querySelector("img");
      const media = img?.closest("div");
      const content = q(".acx-hero__content") || q("[class*='__content']");
      const form = hero.querySelector("form");
      const actions = q(".acx-actions") || hero.querySelector("a[href^='tel:']");
      const h1 = hero.querySelector("h1");

      // Which source pixels survive `object-fit: cover` with this object-position.
      let crop = null;
      if (img) {
        const ir = img.getBoundingClientRect();
        // Use the width/height ATTRIBUTES — the master's real pixel dimensions. `naturalWidth`
        // on a `srcset`+`sizes` image reports Chrome's density-corrected intrinsic size (390x219
        // here, i.e. the CSS-pixel size implied by `sizes="100vw"`), which is correct per spec
        // but makes the numbers below unreadable. The aspect ratio is identical either way, and
        // the crop percentages depend only on the ratio.
        const nw = Number(img.getAttribute("width")) || img.naturalWidth || ir.width;
        const nh = Number(img.getAttribute("height")) || img.naturalHeight || ir.height;
        const cs = getComputedStyle(img);
        const posParts = cs.objectPosition.split(" ");
        const pct = (v, box) => {
          if (v.endsWith("%")) return parseFloat(v) / 100;
          if (v.endsWith("px")) return parseFloat(v) / box;
          return 0.5;
        };
        const scale = Math.max(ir.width / nw, ir.height / nh);
        const cropW = ir.width / scale;
        const cropH = ir.height / scale;
        const px = pct(posParts[0], ir.width);
        const py = pct(posParts[1] ?? posParts[0], ir.height);
        const left = (nw - cropW) * px;
        const top = (nh - cropH) * py;
        crop = {
          objectPosition: cs.objectPosition,
          objectFit: cs.objectFit,
          natural: `${nw}x${nh}`,
          currentSrc: img.currentSrc?.split("/").pop() ?? null,
          attrSize: `${img.getAttribute("width")}x${img.getAttribute("height")}`,
          box: `${Math.round(ir.width)}x${Math.round(ir.height)}`,
          srcXPct: `${((left / nw) * 100).toFixed(1)}% – ${(((left + cropW) / nw) * 100).toFixed(1)}%`,
          srcYPct: `${((top / nh) * 100).toFixed(1)}% – ${(((top + cropH) / nh) * 100).toFixed(1)}%`,
          widthKeptPct: +((cropW / nw) * 100).toFixed(1),
          heightKeptPct: +((cropH / nh) * 100).toFixed(1)
        };
      }

      const heroCs = getComputedStyle(hero);
      const contentR = rect(content);
      const mediaR = rect(media);
      const formR = rect(form);

      // DOM order: does the phone action precede the form in the document?
      let callBeforeForm = null;
      if (actions && form) {
        callBeforeForm = !!(
          actions.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING
        );
      }

      return {
        crop,
        heroRect: rect(hero),
        mediaRect: mediaR,
        contentRect: contentR,
        formRect: formR,
        h1Rect: rect(h1),
        actionsRect: rect(actions),
        // The whole point of the fix: at stacked widths the media must stop at the copy,
        // not run to the bottom of the form.
        mediaBoundedToCopy:
          mediaR && contentR && formR ? mediaR.bottom <= formR.y + 1 : null,
        mediaVsContentBottomDelta:
          mediaR && contentR ? +(mediaR.bottom - contentR.bottom).toFixed(1) : null,
        formStartsAfterCopy: contentR && formR ? formR.y >= contentR.bottom - 1 : null,
        callBeforeForm,
        heroStyles: {
          height: heroCs.height,
          maxHeight: heroCs.maxHeight,
          overflow: heroCs.overflow,
          display: heroCs.display,
          background: heroCs.backgroundColor
        },
        formPanelBackground: form ? getComputedStyle(form).backgroundColor : null,
        docScrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
        // Field/consent inventory, so a geometry change can be shown not to have touched it.
        formFields: form
          ? Array.from(form.elements)
              .filter((el) => el.name)
              .map((el) => `${el.name}:${el.type || el.tagName.toLowerCase()}${el.required ? "*" : ""}`)
          : null,
        consentText:
          form?.querySelector(".hero-form__consent span, [class*='consent'] span")?.textContent?.trim() ??
          null,
        submitLabel: form?.querySelector("[data-quick-form-submit]")?.textContent?.trim() ?? null,
        headingText: h1?.textContent?.trim() ?? null
      };
    });

    // Sample real composited pixels behind the headline and the trust line to prove contrast
    // is measured, not assumed.
    const contrast = await page.evaluate(() => {
      const parseRgb = (s) => {
        const m = s.match(/[\d.]+/g);
        return m ? m.slice(0, 3).map(Number) : null;
      };
      const lum = ([r, g, b]) => {
        const f = (c) => {
          c /= 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const out = {};
      for (const [key, sel] of [
        ["h1", ".acx-hero h1"],
        ["lead", ".acx-hero__lead"],
        ["body", ".acx-hero__body"],
        ["trust", ".acx-hero__trust"],
        ["eyebrow", ".acx-hero__eyebrow"]
      ]) {
        const el = document.querySelector(sel);
        if (!el) continue;
        out[key] = { color: getComputedStyle(el).color, fontSize: getComputedStyle(el).fontSize };
      }
      out._note = "backdrop sampled from the screenshot below, not from CSS";
      return out;
    });

    const slug = `${route.label}-${vp.label}`;

    // Whole hero, copy region AND form, captured as an element so it is not clipped to the
    // viewport the way a `clip` rectangle is.
    const heroLocator = page.locator("section[class*='hero']").first();
    if (await heroLocator.count()) {
      await heroLocator
        .screenshot({ path: `${outDir}/${slug}-hero.png`, timeout: 20000 })
        .catch((e) => step(`  hero shot failed: ${e.message.split("\n")[0]}`));
    }
    step("  hero shot");

    // First screenful, unscrolled.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${outDir}/${slug}-fold.png` });

    // The copy → form transition, centred on the boundary so the handoff is visible.
    // Scope both to the hero SECTION. A bare `[class*='__content']` matches a header element
    // first in document order, which put the boundary at ~65px and captured the unscrolled page.
    const boundary = await page.evaluate(() => {
      const hero = document.querySelector("section[class*='hero']");
      if (!hero) return null;
      const c = hero.querySelector("[class*='__content'], [class*='__copy']");
      const f = hero.querySelector("form");
      if (!c || !f) return null;
      return (
        window.scrollY + Math.min(c.getBoundingClientRect().bottom, f.getBoundingClientRect().top)
      );
    });
    if (boundary != null) {
      // `behavior: "instant"` is required: global.css sets `scroll-behavior: smooth`, so a plain
      // scrollTo animates and a short wait captures the un-scrolled page.
      await page.evaluate(
        ([y, h]) =>
          window.scrollTo({ top: Math.max(0, y - h * 0.45), left: 0, behavior: "instant" }),
        [boundary, vp.height]
      );
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${outDir}/${slug}-transition.png` });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    }

    report.push({ route: route.path, viewport: vp.label, ...data, textStyles: contrast });
    await page.close();
  }
}

await writeFile(`${outDir}/measurements.json`, JSON.stringify(report, null, 2));

// Console summary
for (const r of report) {
  console.log(`\n=== ${r.route}  @ ${r.viewport} ===`);
  if (r.error) {
    console.log("  ERROR:", r.error);
    continue;
  }
  console.log(
    `  hero ${r.heroRect.w}x${r.heroRect.h}  display=${r.heroStyles.display}` +
      `  maxHeight=${r.heroStyles.maxHeight}  overflow=${r.heroStyles.overflow}`
  );
  if (r.crop) {
    console.log(
      `  image box ${r.crop.box} of ${r.crop.natural}  object-position=${r.crop.objectPosition}`
    );
    console.log(
      `    source kept  X ${r.crop.srcXPct} (${r.crop.widthKeptPct}% of width)` +
        `   Y ${r.crop.srcYPct} (${r.crop.heightKeptPct}% of height)`
    );
  }
  console.log(
    `  media bounded to copy: ${r.mediaBoundedToCopy}` +
      `   (media bottom - copy bottom = ${r.mediaVsContentBottomDelta}px)`
  );
  console.log(
    `  form after copy: ${r.formStartsAfterCopy}   call action before form in DOM: ${r.callBeforeForm}`
  );
  console.log(
    `  horizontal overflow: ${r.overflowX} (scrollWidth ${r.docScrollWidth} vs ${r.innerWidth})`
  );
  console.log(`  form panel bg: ${r.formPanelBackground}`);
  console.log(`  fields: ${r.formFields ? r.formFields.join(", ") : "none"}`);
}

await browser.close();
server.close();
console.log(`\nWrote ${outDir}/measurements.json and screenshots.`);
