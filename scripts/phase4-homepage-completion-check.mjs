// Phase 3 + 4 QA — the completed Sevenson-led homepage.
//
// Measures the built output rather than the source: section order and rhythm, computed
// typography, image geometry, link integrity, horizontal overflow, keyboard focus, and the two
// typography laws. Modelled on scripts/phase2-recognition-scope-check.mjs, which this extends to
// the whole page.
//
// Type law rule 1 is verified the way AGENTS.md §6 requires — by resolving computed styles and
// cross-referencing the classes that actually land on heading elements against the classes that
// declare a font-size in src/ — never by grepping selector text.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:4321";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = new URL("../artifacts/phase-4-homepage-completion/", import.meta.url);
const srcDir = new URL("../src/", import.meta.url);
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const shotWidths = [320, 390, 768, 1024, 1440];

await mkdir(outDir, { recursive: true });

// ---------------------------------------------------------------------------
// Type law rule 1, static half: every class in src/ that declares a font-size.
// Comments are stripped first — a mockup reference like `/* .hero h1 */` would otherwise read
// as a live selector (the exact false-positive mode the law's own note warns about).
// ---------------------------------------------------------------------------
const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) out.push(...(await walk(child)));
    else if (/\.(astro|css)$/.test(entry.name)) out.push(child);
  }
  return out;
};

const sizingClasses = new Set();
for (const file of await walk(srcDir)) {
  const text = (await readFile(file, "utf8"))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  // Each rule block that contains a font-size declaration contributes every class in its selector.
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/(^|[;\s])font-size\s*:/.test(m[2])) continue;
    for (const c of m[1].matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) sizingClasses.add(c[1]);
  }
}

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const report = [];
const failures = [];
const notes = [];

// Freshness guard: a stale server on the port answers 200 with the previous build and every
// assertion below passes against the wrong output.
{
  const probe = await browser.newPage();
  await probe.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const fresh = await probe.evaluate(() => ({
    services: !!document.querySelector("#service-cards.services"),
    compare: !!document.querySelector(".condition-work"),
    cost: !!document.querySelector("#pricing.cost"),
    founder: !!document.querySelector("#about.founder"),
    fit: !!document.querySelector("#confidence-and-fit.fit"),
    close: !!document.querySelector(".close")
  }));
  await probe.close();
  const missing = Object.entries(fresh)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    await browser.close();
    throw new Error(`Stale or unexpected build at ${baseUrl} — missing: ${missing.join(", ")}`);
  }
}

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.route("**://app.termly.io/**", (r) => r.abort());

    const origin = new URL(baseUrl).origin;
    const isThirdParty = (t) =>
      t.includes("challenges.cloudflare.com") ||
      t.includes("Cloudflare Turnstile") ||
      /Failed to load resource/i.test(t);
    const consoleErrors = [];
    const thirdPartyErrors = [];
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      (isThirdParty(m.text()) ? thirdPartyErrors : consoleErrors).push(m.text());
    });
    page.on("pageerror", (e) => {
      const t = `pageerror: ${e.message}`;
      (isThirdParty(t) ? thirdPartyErrors : consoleErrors).push(t);
    });
    page.on("response", (r) => {
      if (r.status() < 400) return;
      const t = `${r.status()} ${r.url()}`;
      (r.url().startsWith(origin) ? consoleErrors : thirdPartyErrors).push(t);
    });

    await page.goto(baseUrl, { waitUntil: "load" });

    // Force every lazy image in before measuring geometry.
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll("img")];
      imgs.forEach((i) => {
        i.loading = "eager";
      });
      await Promise.all(
        imgs.map((i) =>
          i.complete ? null : new Promise((r) => i.addEventListener("load", r, { once: true }))
        )
      );
    });
    await page.waitForTimeout(300);

    const data = await page.evaluate(() => {
      const px = (v) => Math.round(parseFloat(v) * 100) / 100;
      const cs = (el) => getComputedStyle(el);

      const sections = [
        [".home-hero", "hero"],
        [".condition-recognition", "recognition"],
        [".scope-explanation", "scope"],
        [".services", "services"],
        [".condition-work", "comparison"],
        [".ac-photoband", "record"],
        [".cost", "cost"],
        [".founder", "founder"],
        [".fit", "fit"],
        [".faq", "faq"],
        [".close", "close"]
      ]
        .map(([sel, name]) => {
          const el = document.querySelector(sel);
          if (!el) return { name, present: false };
          const s = cs(el);
          const r = el.getBoundingClientRect();
          return {
            name,
            present: true,
            padTop: px(s.paddingTop),
            padBottom: px(s.paddingBottom),
            height: Math.round(r.height),
            bg: s.backgroundColor
          };
        });

      // Order in the DOM, so a reordering regression is visible as data.
      const domOrder = [...document.querySelectorAll("main > *")].map(
        (el) => el.className?.toString().split(/\s+/)[0] || el.tagName.toLowerCase()
      );

      // ---- typography ----
      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
        tag: h.tagName.toLowerCase(),
        classes: [...h.classList],
        size: px(cs(h).fontSize),
        weight: cs(h).fontWeight,
        lines: Math.round(h.getBoundingClientRect().height / px(cs(h).lineHeight)),
        text: (h.textContent || "").trim().slice(0, 70),
        // Last visual line word count — the widow check.
        lastWord: (h.textContent || "").trim().split(/\s+/).slice(-1)[0]
      }));

      const bodyProbe =
        document.querySelector(".services__header p") || document.querySelector("main p");
      const bodySize = px(cs(bodyProbe).fontSize);
      const h1 = document.querySelector("h1");

      // ---- images ----
      const images = [...document.querySelectorAll("main img")].map((i) => {
        const r = i.getBoundingClientRect();
        return {
          file: (i.currentSrc || i.src).split("/").pop(),
          w: Math.round(r.width),
          h: Math.round(r.height),
          objectPosition: cs(i).objectPosition,
          alt: i.alt,
          hasAlt: i.hasAttribute("alt"),
          loading: i.loading,
          intrinsic: `${i.naturalWidth}x${i.naturalHeight}`
        };
      });

      // ---- links ----
      const links = [...document.querySelectorAll("main a")].map((a) => ({
        href: a.getAttribute("href"),
        text: (a.textContent || "").trim().slice(0, 50),
        h: Math.round(a.getBoundingClientRect().height)
      }));

      // ---- touch targets: interactive elements under 44px high ----
      const smallTargets = [...document.querySelectorAll("main a, main button, main summary")]
        .map((el) => ({
          text: (el.textContent || "").trim().slice(0, 40),
          h: Math.round(el.getBoundingClientRect().height),
          w: Math.round(el.getBoundingClientRect().width)
        }))
        .filter((t) => t.h > 0 && t.h < 44);

      // ---- overflow: which element, not just whether ----
      const docW = document.documentElement.clientWidth;
      const overflowing = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > docW + 1 || r.left < -1);
        })
        .slice(0, 6)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className?.toString().split(/\s+/)[0]}`);

      return {
        docScrollW: document.documentElement.scrollWidth,
        clientW: docW,
        overflowing,
        sections,
        domOrder,
        headings,
        bodySize,
        h1Size: px(cs(h1).fontSize),
        images,
        links,
        smallTargets,
        faqCount: document.querySelectorAll(".ac-faq details").length,
        h1Count: document.querySelectorAll("h1").length
      };
    });

    await page.waitForTimeout(1200);

    // ---- assertions ----
    const overflow = data.docScrollW > data.clientW;
    if (overflow) {
      failures.push(
        `${width}px: horizontal overflow ${data.docScrollW} > ${data.clientW}` +
          (data.overflowing.length ? ` — ${data.overflowing.join(", ")}` : "")
      );
    }
    if (consoleErrors.length) {
      failures.push(`${width}px: first-party console errors -> ${consoleErrors.join(" | ")}`);
    }
    if (data.h1Count !== 1) failures.push(`${width}px: ${data.h1Count} h1 elements (expected 1)`);

    const ratio = data.h1Size / data.bodySize;
    if (ratio < 1.9) failures.push(`${width}px: H1:body ${ratio.toFixed(2)} < 1.9 (type law #2)`);

    // Type law #1: a class that both sizes text and lands on a heading must be an .ac-type-* role.
    for (const h of data.headings) {
      const offenders = h.classes.filter(
        (c) => sizingClasses.has(c) && !c.startsWith("ac-type-")
      );
      if (offenders.length) {
        failures.push(
          `${width}px: type law #1 — <${h.tag}> "${h.text}" sized by non-role class ${offenders.join(", ")}`
        );
      }
      if (!h.classes.some((c) => c.startsWith("ac-type-"))) {
        notes.push(`${width}px: <${h.tag}> "${h.text}" carries no .ac-type-* role class`);
      }
    }

    // Hierarchy: the page H1 must outrank every H2, and each H2 its sibling H3s.
    const maxH2 = Math.max(0, ...data.headings.filter((h) => h.tag === "h2").map((h) => h.size));
    const maxH3 = Math.max(0, ...data.headings.filter((h) => h.tag === "h3").map((h) => h.size));
    if (maxH2 >= data.h1Size) {
      failures.push(`${width}px: H2 ${maxH2}px >= H1 ${data.h1Size}px (hierarchy inverted)`);
    }
    if (maxH3 >= maxH2) {
      failures.push(`${width}px: H3 ${maxH3}px >= H2 ${maxH2}px (hierarchy inverted)`);
    }

    for (const img of data.images) {
      if (!img.hasAlt) failures.push(`${width}px: <img> ${img.file} has no alt attribute`);
    }
    for (const l of data.links) {
      if (!l.href) failures.push(`${width}px: anchor "${l.text}" has no href`);
    }

    report.push({
      width,
      overflow,
      h1BodyRatio: Number(ratio.toFixed(2)),
      maxH2,
      maxH3,
      consoleErrors: [...consoleErrors],
      thirdPartyErrors: [...thirdPartyErrors],
      ...data
    });

    if (shotWidths.includes(width)) {
      await page.screenshot({
        path: new URL(`home-${width}-full.png`, outDir).pathname,
        fullPage: true
      });
      for (const [sel, name] of [
        [".services", "services"],
        [".condition-work", "comparison"],
        [".cost", "cost"],
        [".founder", "founder"],
        [".fit", "fit"],
        [".close", "close"]
      ]) {
        await page
          .locator(sel)
          .screenshot({ path: new URL(`${name}-${width}.png`, outDir).pathname })
          .catch(() => {});
      }
    }

    await page.close();
  }

  // ---- keyboard, reduced motion, 200% zoom, internal links ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.route("**://app.termly.io/**", (r) => r.abort());
    await page.goto(baseUrl, { waitUntil: "load" });

    // Tab through and record anything focusable with no visible focus indicator.
    const focus = await page.evaluate(() => {
      const targets = [...document.querySelectorAll("main a, main button, main summary")];
      const bad = [];
      for (const el of targets) {
        el.focus();
        const s = getComputedStyle(el, ":focus-visible");
        const outline = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
        const boxShadow = s.boxShadow !== "none";
        const underline = s.textDecorationLine !== "none";
        if (!outline && !boxShadow && !underline) {
          bad.push((el.textContent || "").trim().slice(0, 40) || el.tagName);
        }
      }
      return bad;
    });
    if (focus.length) notes.push(`no visible focus indicator: ${focus.join(" | ")}`);

    // FAQ keyboard operation.
    const faq = await page.evaluate(() => {
      const d = document.querySelector(".ac-faq details");
      if (!d) return "no FAQ";
      const s = d.querySelector("summary");
      s.focus();
      const before = d.open;
      s.click();
      const after = d.open;
      s.click();
      return before === false && after === true ? "ok" : `before=${before} after=${after}`;
    });
    if (faq !== "ok") failures.push(`FAQ details did not toggle: ${faq}`);

    // Internal links must resolve in the built output.
    const hrefs = await page.evaluate(() =>
      [...new Set([...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")))]
    );
    const linkStatus = [];
    for (const href of hrefs) {
      const r = await page.request.get(new URL(href, baseUrl).href, { maxRedirects: 0 });
      linkStatus.push({ href, status: r.status() });
      if (r.status() >= 400) failures.push(`internal link ${href} -> ${r.status()}`);
    }

    // In-page anchors that other routes point at must still exist here.
    const anchors = await page.evaluate(() =>
      ["service-cards", "pricing", "about", "confidence-and-fit", "faq", "record"].map((id) => ({
        id,
        present: !!document.getElementById(id)
      }))
    );
    for (const a of anchors) {
      if (!a.present) failures.push(`in-page anchor #${a.id} is gone (linked from other routes)`);
    }

    await page.close();

    // 200% zoom == half the viewport at the same layout width.
    const zoom = await browser.newPage({ viewport: { width: 640, height: 720 }, deviceScaleFactor: 2 });
    await zoom.route("**://app.termly.io/**", (r) => r.abort());
    await zoom.goto(baseUrl, { waitUntil: "load" });
    const zoomOverflow = await zoom.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth
    }));
    if (zoomOverflow.scroll > zoomOverflow.client) {
      failures.push(`200% zoom: horizontal overflow ${zoomOverflow.scroll} > ${zoomOverflow.client}`);
    }
    await zoom.screenshot({ path: new URL("home-zoom200.png", outDir).pathname, fullPage: false });
    await zoom.close();

    // Reduced motion.
    const rm = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce"
    });
    await rm.route("**://app.termly.io/**", (r) => r.abort());
    await rm.goto(baseUrl, { waitUntil: "load" });
    const transitions = await rm.evaluate(() =>
      [...document.querySelectorAll("main *")]
        .map((el) => ({
          sel: `${el.tagName.toLowerCase()}.${el.className?.toString().split(/\s+/)[0]}`,
          d: getComputedStyle(el).transitionDuration,
          a: getComputedStyle(el).animationDuration
        }))
        .filter((t) => (parseFloat(t.d) || 0) > 0 || (parseFloat(t.a) || 0) > 0)
        .slice(0, 10)
    );
    await rm.close();

    report.push({ keyboardFocusIssues: focus, faq, linkStatus, anchors, zoomOverflow, transitions });
  }
} finally {
  await browser.close();
}

await writeFile(
  new URL("report.json", outDir),
  JSON.stringify({ failures, notes, sizingClasses: [...sizingClasses].sort(), report }, null, 2)
);

console.log(`failures: ${failures.length}`);
for (const f of failures) console.log("  FAIL " + f);
console.log(`notes: ${notes.length}`);
for (const n of [...new Set(notes)]) console.log("  note " + n);
