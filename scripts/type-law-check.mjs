// TYPE LAW verification — AGENTS.md §6, .claude/skills/type-law.
//
// RULE 1 — no font-size on a heading tag or on any selector that resolves to one, except the
// `.ac-type-*` role classes, which ARE the mechanism.
//
// Verified the way the skill requires and NOT by grepping selector text: for every <h1>–<h6> on
// every built route, this walks the live CSSOM, finds every rule that both matches that element
// and declares `font-size`, and reports the winning selector. A plain class that happens to land
// on a heading is caught exactly like a bare `h2 { font-size }` — which is the failure mode that
// let a grep-based check pass a live violation on 2026-08-18.
//
// RULE 2 — H1:body ratio floor, ≥1.9:1 at every width. Computed styles, never token values: a
// clamp() tells you nothing about what renders, and a component override can defeat the token.
//
// Run against a real production build served by `astro preview`:
//   npm run build:local && npx astro preview &  then  node scripts/type-law-check.mjs
// ROUTES=/a/,/b/ limits the sweep; the default is every route in dist/.
import { chromium } from "playwright-core";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:4321";
const WIDTHS = [320, 360, 390, 414, 768, 1024, 1280, 1440, 1920];
const FLOOR = 1.9;
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Every directory in dist/ holding an index.html, plus "/".
const collectRoutes = async (dir = "dist", prefix = "/") => {
  const found = [];
  const entries = await readdir(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && e.name === "index.html")) found.push(prefix);
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (["_astro", "assets", "sms-notification-consent"].includes(entry.name)) continue;
    found.push(...(await collectRoutes(path.join(dir, entry.name), `${prefix}${entry.name}/`)));
  }
  return found;
};

// RULE 1 probe. Runs once per route at one width — selector matching does not vary with
// viewport, only which @media blocks are active, so this is repeated at the narrow width too.
const rule1 = () => {
  const violations = [];
  const sized = new Set();

  const sheetRules = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet; none are expected
    }
    const walk = (list, media) => {
      for (const rule of list) {
        if (rule.cssRules) {
          walk(rule.cssRules, rule.conditionText || media);
        } else if (rule.style && rule.style.getPropertyValue("font-size")) {
          sheetRules.push({
            selector: rule.selectorText || "",
            value: rule.style.getPropertyValue("font-size"),
            media: media || ""
          });
        }
      }
    };
    walk(rules, "");
  }

  for (const heading of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
    for (const rule of sheetRules) {
      if (!rule.selector) continue;
      let matches = false;
      try {
        matches = rule.selector
          .split(",")
          .some((part) => heading.matches(part.trim()));
      } catch {
        continue;
      }
      if (!matches) continue;
      sized.add(rule.selector);
      // The role classes ARE the mechanism (global.css says so, accurately). Everything else
      // that sizes a heading is a violation.
      const isRoleClass = /^\s*\.ac-type-[a-z0-9-]+\s*$/i.test(rule.selector);
      if (!isRoleClass) {
        violations.push({
          tag: heading.tagName.toLowerCase(),
          text: (heading.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50),
          selector: rule.selector,
          value: rule.value,
          media: rule.media
        });
      }
    }
    if (heading.getAttribute("style")?.includes("font-size")) {
      violations.push({
        tag: heading.tagName.toLowerCase(),
        text: (heading.textContent || "").trim().slice(0, 50),
        selector: "inline style attribute",
        value: heading.style.fontSize,
        media: ""
      });
    }
  }

  return { violations, sizingSelectors: [...sized] };
};

const rule2 = () => {
  const h1 = document.querySelector("h1");
  if (!h1) return null;
  const h1Size = parseFloat(getComputedStyle(h1).fontSize);
  const bodySize = parseFloat(getComputedStyle(document.body).fontSize);
  const lineHeight = parseFloat(getComputedStyle(h1).lineHeight) || h1Size * 1.2;
  const lines = Math.round(h1.getBoundingClientRect().height / lineHeight);
  const words = (h1.textContent || "").trim().split(/\s+/).filter(Boolean);
  return {
    h1Size,
    bodySize,
    ratio: Math.round((h1Size / bodySize) * 1000) / 1000,
    lines,
    lastWord: words[words.length - 1],
    wordCount: words.length,
    classes: h1.className.toString()
  };
};

const run = async () => {
  const routes = process.env.ROUTES
    ? process.env.ROUTES.split(",")
    : (await collectRoutes()).sort();
  const browser = await chromium.launch({ executablePath: chromePath });
  const rule1Hits = [];
  const rows = [];
  const wrapping = [];

  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(120);

    let worst = null;
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(90);

      const r1 = await page.evaluate(rule1);
      for (const violation of r1.violations) {
        rule1Hits.push({ route, width, ...violation });
      }

      const r2 = await page.evaluate(rule2);
      if (!r2) continue;
      if (!worst || r2.ratio < worst.ratio) worst = { ...r2, width };
      // §8.3 / doc 11 §8.2 — a one-word final line on a multi-line heading.
      if (r2.lines > 1 && r2.wordCount > 1) {
        const perLine = r2.wordCount / r2.lines;
        if (perLine > 2 && r2.lastWord && r2.lines >= 2) {
          const measured = await page.evaluate(() => {
            const h1 = document.querySelector("h1");
            const range = document.createRange();
            const node = [...h1.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
            if (!node) return null;
            range.selectNodeContents(node);
            const rects = [...range.getClientRects()];
            if (rects.length < 2) return null;
            const last = rects[rects.length - 1];
            const widest = Math.max(...rects.map((x) => x.width));
            return { lastWidth: Math.round(last.width), widest: Math.round(widest) };
          });
          if (measured && measured.lastWidth < measured.widest * 0.18) {
            wrapping.push({ route, width, lastWord: r2.lastWord, ...measured });
          }
        }
      }
    }
    if (worst) rows.push({ route, ...worst });
    await context.close();
  }

  await browser.close();

  console.log(`\n## Rule 1 — font-size on headings (${routes.length} routes × ${WIDTHS.length} widths)`);
  if (!rule1Hits.length) {
    console.log("CLEAN — every heading's size resolves through an .ac-type-* role class.");
  } else {
    const unique = new Map();
    for (const hit of rule1Hits) {
      const key = `${hit.selector}|${hit.value}|${hit.media}`;
      if (!unique.has(key)) unique.set(key, { ...hit, routes: new Set() });
      unique.get(key).routes.add(hit.route);
    }
    for (const hit of unique.values()) {
      console.log(
        `VIOLATION  ${hit.selector} { font-size: ${hit.value} } ${hit.media ? `@media ${hit.media}` : ""}`
      );
      console.log(`           on <${hit.tag}> "${hit.text}" · ${hit.routes.size} route(s): ${[...hit.routes].slice(0, 5).join(", ")}`);
    }
  }

  console.log(`\n## Rule 2 — H1:body ratio (floor ${FLOOR}:1 at every width)`);
  rows.sort((a, b) => a.ratio - b.ratio);
  console.log("| route | worst ratio | at width | h1 / body | pass |");
  console.log("|---|---:|---:|---|---|");
  for (const row of rows) {
    console.log(
      `| ${row.route} | ${row.ratio.toFixed(3)} | ${row.width} | ${row.h1Size} / ${row.bodySize} | ${row.ratio >= FLOOR ? "PASS" : "**FAIL**"} |`
    );
  }
  const failures = rows.filter((r) => r.ratio < FLOOR);
  console.log(`\n${failures.length ? `${failures.length} ROUTE(S) BELOW THE FLOOR` : `All ${rows.length} routes clear ${FLOOR}:1.`}`);

  console.log(`\n## H1 wrapping — one-word final lines`);
  console.log(wrapping.length ? JSON.stringify(wrapping, null, 2) : "None found.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
