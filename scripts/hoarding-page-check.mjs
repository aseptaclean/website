// HOARDING CLEANUP PAGE verification — /hoarding-cleanup-san-jose/.
//
// Built 2026-08-26 for the gold-standard service-page rebuild (docs/30-WEBSITE-MASTER-SPEC.md
// §20, §20A, §21). Measures the route against the OLD/NEW audit table the task requires, runs
// the responsive and accessibility gates in doc 30 §14 and §20A.25, and writes screenshots to
// artifacts/hoarding-page/.
//
// Run against a real production build served by `astro preview` — not the dev server:
//   npm run build:local && npx astro preview &  then  node scripts/hoarding-page-check.mjs
//
// LABEL=baseline records the pre-rebuild state; LABEL=rebuild records the new one. Both write
// their JSON beside the screenshots so the two can be diffed without re-running the old build.
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:4321";
const ROUTE = process.env.ROUTE || "/hoarding-cleanup-san-jose/";
const LABEL = process.env.LABEL || "rebuild";
const OUT = path.join("artifacts/hoarding-page", LABEL);

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const FULLPAGE = [390, 768, 1440];
const SHOT_WIDTHS = [320, 390, 768, 1024, 1440];

const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const measure = () => {
  const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]) || 0;
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
  };
  const lineCount = (el) => {
    const lh = px(el, "lineHeight") || px(el, "fontSize") * 1.2;
    return lh ? Math.round(el.getBoundingClientRect().height / lh) : 0;
  };

  const main = document.querySelector("main");
  const body = document.body;

  const clone = main.cloneNode(true);
  clone.querySelectorAll("script,style").forEach((n) => n.remove());
  const words = (clone.textContent || "").trim().split(/\s+/).filter(Boolean).length;

  const headings = [...main.querySelectorAll("h1,h2,h3")].filter(vis).map((h) => ({
    tag: h.tagName.toLowerCase(),
    size: Math.round(px(h, "fontSize") * 100) / 100,
    weight: getComputedStyle(h).fontWeight,
    lines: lineCount(h),
    text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90)
  }));

  const sections = [...main.children].map((s) => {
    const r = s.getBoundingClientRect();
    return {
      name: s.className.toString().split(" ")[0] || s.id || s.tagName.toLowerCase(),
      h: Math.round(r.height),
      bg: getComputedStyle(s).backgroundColor
    };
  });

  // TYPE LAW 1 (AGENTS.md §6): resolve computed styles on heading ELEMENTS, never grep
  // selector text. Any heading whose size does not come from an .ac-type-* role class is a
  // violation; this reports the class list so the source can be identified.
  const headingRoles = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    tag: h.tagName.toLowerCase(),
    classes: h.className.toString(),
    hasRoleClass: /\bac-type-/.test(h.className.toString()),
    size: Math.round(px(h, "fontSize") * 100) / 100,
    text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60)
  }));

  const h1 = main.querySelector("h1");
  const bodySize = px(body, "fontSize");

  // Primary CTA count: anchors into the assessment route rendered as buttons.
  const assessmentLinks = [...main.querySelectorAll('a[href*="/request-assessment/"]')].map(
    (a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || "").trim().replace(/\s+/g, " "),
      w: Math.round(a.getBoundingClientRect().width),
      h: Math.round(a.getBoundingClientRect().height)
    })
  );

  const images = [...main.querySelectorAll("img")].map((i) => ({
    src: (i.currentSrc || i.src || "").split("/").pop(),
    alt: i.getAttribute("alt"),
    loading: i.getAttribute("loading"),
    w: Math.round(i.getBoundingClientRect().width),
    h: Math.round(i.getBoundingClientRect().height),
    objectPosition: getComputedStyle(i).objectPosition
  }));

  // Card/grid count: elements laid out as multi-column grids, which is the anti-AI check in
  // doc 30 §7.1 ("3 equal cards after every heading").
  const grids = [...main.querySelectorAll("*")].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.display !== "grid") return false;
    const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length;
    return cols > 1 && el.children.length > 1;
  }).map((el) => ({
    name: el.className.toString().split(" ")[0] || el.tagName.toLowerCase(),
    cols: getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length,
    items: el.children.length
  }));

  const heroSection = main.firstElementChild;
  const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;

  // Touch targets below 44px, links and buttons only.
  const smallTargets = [...main.querySelectorAll("a,button,summary")]
    .filter(vis)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { text: (el.textContent || "").trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) };
    })
    .filter((t) => t.h < 44 && t.w < 44);

  return {
    docHeight: Math.round(document.documentElement.scrollWidth ? body.scrollHeight : 0),
    mainHeight: Math.round(main.getBoundingClientRect().height),
    scrollWidth: Math.round(document.documentElement.scrollWidth),
    clientWidth: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    words,
    h1: h1 ? { size: Math.round(px(h1, "fontSize") * 100) / 100, lines: lineCount(h1), text: h1.textContent.trim() } : null,
    bodySize,
    h1BodyRatio: h1 ? Math.round((px(h1, "fontSize") / bodySize) * 100) / 100 : null,
    counts: {
      h1: main.querySelectorAll("h1").length,
      h2: main.querySelectorAll("h2").length,
      h3: main.querySelectorAll("h3").length,
      images: main.querySelectorAll("img").length,
      grids: grids.length,
      assessmentLinks: assessmentLinks.length,
      sections: main.children.length
    },
    headings,
    headingRoles: headingRoles.filter((h) => !h.hasRoleClass),
    sections,
    grids,
    assessmentLinks,
    images,
    heroHeight: heroRect ? Math.round(heroRect.height) : null,
    smallTargets
  };
};

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: chromePath });
  const report = { label: LABEL, route: ROUTE, at: new Date().toISOString(), widths: {} };
  const consoleErrors = [];

  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push({ width, text: m.text() });
    });
    page.on("pageerror", (e) => consoleErrors.push({ width, text: `pageerror: ${e.message}` }));

    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle" });
    // `astro preview` injects the dev toolbar; it is NOT in the built HTML (verified against
    // dist/) but it does land in screenshots, where it reads as a shipped UI element.
    await page.addStyleTag({ content: "astro-dev-toolbar{display:none !important}" });
    await page.waitForTimeout(250);
    report.widths[width] = await page.evaluate(measure);

    if (SHOT_WIDTHS.includes(width)) {
      await page.screenshot({ path: path.join(OUT, `fold-${width}.png`) });
    }
    if (FULLPAGE.includes(width)) {
      await page.screenshot({ path: path.join(OUT, `full-${width}.png`), fullPage: true });
    }

    if (width === 1440) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      report.axe1440 = axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        help: v.help
      }));
    }
    if (width === 390) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      report.axe390 = axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        help: v.help
      }));
    }

    await context.close();
  }

  // 200% zoom, doc 30 §14: emulated as a 720px-wide viewport at 2x scale.
  const zoomCtx = await browser.newContext({
    viewport: { width: 720, height: 800 },
    deviceScaleFactor: 2
  });
  const zoomPage = await zoomCtx.newPage();
  await zoomPage.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle" });
  report.zoom200 = await zoomPage.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  await zoomPage.screenshot({ path: path.join(OUT, "zoom-200.png"), fullPage: false });
  await zoomCtx.close();

  report.consoleErrors = consoleErrors;
  await browser.close();

  await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

  const w = report.widths;
  console.log(`\n=== ${LABEL.toUpperCase()} — ${ROUTE} ===`);
  console.log(`page height 390 / 768 / 1440: ${w[390].mainHeight} / ${w[768].mainHeight} / ${w[1440].mainHeight}`);
  console.log(`hero height 390 / 768 / 1024 / 1440: ${w[390].heroHeight} / ${w[768].heroHeight} / ${w[1024].heroHeight} / ${w[1440].heroHeight}`);
  console.log(`main words: ${w[1440].words}`);
  console.log(`H1/H2/H3: ${w[1440].counts.h1} / ${w[1440].counts.h2} / ${w[1440].counts.h3}`);
  console.log(`images: ${w[1440].counts.images}  grids: ${w[1440].counts.grids}  sections: ${w[1440].counts.sections}`);
  console.log(`assessment links: ${w[1440].counts.assessmentLinks}`);
  console.log(`H1 size 390 / 768 / 1024 / 1440: ${w[390].h1?.size} / ${w[768].h1?.size} / ${w[1024].h1?.size} / ${w[1440].h1?.size}`);
  console.log(`H1:body ratio 390 / 1440: ${w[390].h1BodyRatio} / ${w[1440].h1BodyRatio}`);
  const overflows = WIDTHS.filter((x) => w[x].overflow);
  console.log(`horizontal overflow at: ${overflows.length ? overflows.join(", ") : "none"}`);
  console.log(`zoom 200% overflow: ${report.zoom200.overflow}`);
  const badRoles = w[1440].headingRoles;
  console.log(`headings without an .ac-type-* role class: ${badRoles.length}${badRoles.length ? " → " + JSON.stringify(badRoles) : ""}`);
  console.log(`axe violations 1440 / 390: ${report.axe1440.length} / ${report.axe390.length}`);
  if (report.axe1440.length) console.log(JSON.stringify(report.axe1440, null, 2));
  if (report.axe390.length) console.log(JSON.stringify(report.axe390, null, 2));
  console.log(`console errors: ${consoleErrors.length}${consoleErrors.length ? " → " + JSON.stringify(consoleErrors.slice(0, 5)) : ""}`);
  const small = w[390].smallTargets;
  console.log(`touch targets under 44px at 390: ${small.length}${small.length ? " → " + JSON.stringify(small.slice(0, 6)) : ""}`);
  console.log(`\nartifacts → ${OUT}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
