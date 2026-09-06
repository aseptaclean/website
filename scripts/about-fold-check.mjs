/**
 * Profile AC-CP70-91130-1.1 §7 above-the-fold acceptance, measured on the real build.
 *
 * §7 defines: V = visible viewport height, T = measured hero top at scrollY 0 including all real
 * header/utility space above it, B = persistent bottom obstruction, S = 16px clearance.
 * Requirement: hero bottom <= V - B - S, with headline and primary call visible, and no clipping,
 * internal hero scrolling or horizontal overflow.
 *
 * This script measures. It does not repair, and it never reports UNVERIFIED as a pass.
 *
 *   node scripts/about-fold-check.mjs --label before
 */
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4322";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const labelIndex = process.argv.indexOf("--label");
const label = labelIndex > -1 ? process.argv[labelIndex + 1] : "run";
const route = process.env.QA_ROUTE || "/about/";
const slug = route.replace(/\//g, "-").replace(/^-|-$/g, "") || "root";

const outputDirectory = new URL(
  `../artifacts/css-profile-1.1/${slug}/${label}/`,
  import.meta.url
);

// §7 desktop matrix. Mobile is a separate, different gate (headline + primary call only).
const DESKTOP = [
  { w: 1440, h: 900 },
  { w: 1536, h: 864 },
  { w: 1366, h: 768 },
  { w: 1280, h: 800 }
];
const MOBILE = [{ w: 390, h: 844 }];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const rows = [];
const failures = [];

/** Measures the real geometry at scrollY 0 after fonts and images settle. */
const measure = async (page) =>
  page.evaluate(() => {
    window.scrollTo(0, 0);
    const px = (v) => Math.round(v * 100) / 100;

    const hero =
      document.querySelector(".acx-phero") ||
      document.querySelector(".home-hero") ||
      document.querySelector("main section:first-of-type");
    const heroBox = hero.getBoundingClientRect();

    // The consent provider renders inside a shadow root, so a plain querySelectorAll misses it
    // entirely and reports B=0 while a banner is visibly covering the hero. Walk shadow roots.
    const walk = (root, out = []) => {
      for (const el of root.querySelectorAll("*")) {
        out.push(el);
        if (el.shadowRoot) walk(el.shadowRoot, out);
      }
      return out;
    };

    // T must include every real fixed/sticky surface above the hero, not just the header tag.
    let headerStack = 0;
    let bottomObstruction = 0;
    const obstructions = [];
    for (const el of walk(document.body)) {
      const cs = getComputedStyle(el);
      if (cs.position !== "fixed" && cs.position !== "sticky") continue;
      if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
      const r = el.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      const parent = el.parentElement;
      if (parent && ["fixed", "sticky"].includes(getComputedStyle(parent).position)) continue;
      if (r.top <= 0 || r.top < window.innerHeight / 2) {
        headerStack = Math.max(headerStack, r.bottom);
      }
      // A banner that floats a few px clear of the viewport edge still occludes the hero, so
      // allow a small gap rather than requiring it to touch the bottom exactly.
      if (r.bottom >= window.innerHeight - 32 && r.top > window.innerHeight / 2) {
        bottomObstruction = Math.max(bottomObstruction, window.innerHeight - r.top);
        obstructions.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          height: px(window.innerHeight - r.top)
        });
      }
    }

    const h1 = hero.querySelector("h1");
    const call = hero.querySelector('a[href^="tel:"]');
    const secondary = hero.querySelector('a[href*="contact"]');

    return {
      V: window.innerHeight,
      T: px(heroBox.top),
      heroBottom: px(heroBox.bottom),
      heroHeight: px(heroBox.height),
      headerStack: px(headerStack),
      B: px(bottomObstruction),
      obstructions,
      h1Bottom: h1 ? px(h1.getBoundingClientRect().bottom) : null,
      h1Text: h1 ? h1.textContent.trim() : null,
      callBottom: call ? px(call.getBoundingClientRect().bottom) : null,
      callText: call ? call.textContent.trim().replace(/\s+/g, " ") : null,
      callHref: call ? call.getAttribute("href") : null,
      secondaryHref: secondary ? secondary.getAttribute("href") : null,
      secondaryText: secondary ? secondary.textContent.trim() : null,
      // Clipping / internal scroll detection on the hero wrapper itself.
      heroOverflowY: getComputedStyle(hero).overflowY,
      heroScrollH: hero.scrollHeight,
      heroClientH: hero.clientHeight,
      docScrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      minFontPx: Math.min(
        ...[...hero.querySelectorAll("p,a,li,span")]
          .filter((n) => n.textContent.trim())
          .map((n) => parseFloat(getComputedStyle(n).fontSize))
      )
    };
  });

try {
  for (const { w, h } of [...DESKTOP, ...MOBILE]) {
    const isDesktop = w >= 1200;
    const context = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: 1,
      isMobile: !isDesktop,
      hasTouch: !isDesktop
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);

    // §7 "Banners, states and evidence": the genuine first-load state and the ordinary
    // consent-handled state are measured and reported SEPARATELY. The acceptance gate is the
    // consent-handled state; the first-load banner is reported as an obstruction, never hidden.
    for (const state of ["first-load", "consent-handled"]) {
      if (state === "consent-handled") {
        // Handle consent the way a visitor does — click the provider's own Accept control.
        // Never remove the provider or the required UI to manufacture a screenshot.
        const accepted = await page.evaluate(() => {
          const walk = (root, out = []) => {
            for (const el of root.querySelectorAll("*")) {
              out.push(el);
              if (el.shadowRoot) walk(el.shadowRoot, out);
            }
            return out;
          };
          const btn = walk(document.body).find(
            (el) =>
              /^(button|a)$/i.test(el.tagName) &&
              /^accept( all)?$/i.test((el.textContent || "").trim())
          );
          if (btn) { btn.click(); return true; }
          return false;
        });
        if (!accepted) {
          failures.push(`${route} ${w}x${h}: UNVERIFIED — no consent Accept control found`);
          continue;
        }
        // The provider may reload the document when consent is stored; wait for the hero to
        // exist again before measuring rather than racing the navigation.
        await page.waitForTimeout(900);
        await page.waitForSelector(".acx-phero, .home-hero, main section", { timeout: 15000 });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        await page.waitForTimeout(400);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);
      }

      const m = await measure(page);
      const budget = m.V - m.B - 16;
      const overflow = Math.round((m.heroBottom - budget) * 100) / 100;
      const horizontal = m.docScrollW > m.clientW;
      const internalScroll = m.heroScrollH > m.heroClientH + 1;
      const gated = state === "consent-handled";

      let pass;
      if (isDesktop) {
        // §7 desktop: the ENTIRE compact hero must sit above V - B - 16.
        pass = overflow <= 0 && !horizontal && !internalScroll;
      } else {
        // §7 mobile: full headline + primary call above the fold; the rest may extend below.
        pass =
          m.h1Bottom !== null &&
          m.callBottom !== null &&
          m.h1Bottom <= m.V - m.B &&
          m.callBottom <= m.V - m.B &&
          !horizontal;
      }

      rows.push({
        viewport: `${w}x${h}`, state, isDesktop, gated, ...m,
        budget, overflow, horizontal, internalScroll, pass
      });

      // Only the consent-handled state gates the release; first-load is recorded as evidence.
      if (!pass && gated) {
        failures.push(
          `${route} ${w}x${h} [${state}]: ${isDesktop
            ? `hero bottom ${m.heroBottom} > budget ${budget} (overflow ${overflow}px)`
            : `headline bottom ${m.h1Bottom} / call bottom ${m.callBottom} vs usable ${m.V - m.B}`}` +
            `${horizontal ? " | HORIZONTAL OVERFLOW" : ""}${internalScroll ? " | INTERNAL HERO SCROLL" : ""}`
        );
      }

      await page.screenshot({
        path: new URL(`${slug}-${label}-${w}x${h}-${state}-viewport.png`, outputDirectory).pathname
      });
      await page.screenshot({
        path: new URL(`${slug}-${label}-${w}x${h}-${state}-full.png`, outputDirectory).pathname,
        fullPage: true
      });
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const report = { profile: "AC-CP70-91130-1.1 §7", route, label, baseUrl, rows, failures };
await writeFile(
  new URL(`${slug}-${label}-measurements.json`, outputDirectory),
  `${JSON.stringify(report, null, 2)}\n`
);

console.log(`\nProfile AC-CP70-91130-1.1 §7 — ${route} [${label}]\n`);
for (const r of rows) {
  const verdict = r.gated ? (r.pass ? "PASS" : "FAIL") : r.pass ? "info(ok)" : "info(obstructed)";
  console.log(
    `${verdict.padEnd(16)} ${r.viewport.padEnd(9)} ${r.state.padEnd(16)} V=${r.V} T=${r.T} ` +
      `header=${r.headerStack} B=${r.B} heroBottom=${r.heroBottom} budget=${r.budget} ` +
      `overflow=${r.overflow > 0 ? "+" : ""}${r.overflow}px h1Bottom=${r.h1Bottom} ` +
      `callBottom=${r.callBottom} minFont=${r.minFontPx}px`
  );
}
console.log(`\nScreenshots + JSON: ${outputDirectory.pathname}`);
if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exitCode = 1;
} else {
  console.log("\nAll measured viewports pass §7.");
}
