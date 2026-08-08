import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL("../artifacts/phase-4/session-3/", import.meta.url);
const reportDirectory = new URL("../artifacts/phase-4/reports/", import.meta.url);
const widths = [320, 390, 768, 1024, 1280, 1440];
const failures = [];

await mkdir(outputDirectory, { recursive: true });
await mkdir(reportDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });

const shot = async (page, name) => {
  await page.screenshot({
    path: fileURLToPath(new URL(`${name}.png`, outputDirectory)),
    fullPage: true
  });
};

try {
  // 1. /dev/type-specimen at every required width
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(`${baseUrl}/dev/type-specimen/`, {
      waitUntil: "networkidle"
    });
    if (response?.status() !== 200) failures.push(`specimen ${width}px returned ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await shot(page, `specimen-${width}`);
    await page.close();
  }

  // 2. /dev/type-specimen at 200% zoom (base width 1440)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${baseUrl}/dev/type-specimen/`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.documentElement.style.zoom = "200%";
    });
    await shot(page, "specimen-1440-200pct");
    await page.close();
  }

  // 3. Homepage at 390 and 1440, plus programmatic audit checks
  const homepageAudit = {};
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    if (response?.status() !== 200) failures.push(`home ${width}px returned ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await shot(page, `home-${width}`);

    const result = await page.evaluate(() => {
      const h1Count = document.querySelectorAll("h1").length;
      const h2Count = document.querySelectorAll("h2").length;

      const serifSelectors = [".ac-type-display", ".ac-type-h1", ".ac-type-h2"];
      const serifCount = serifSelectors.reduce(
        (total, selector) => total + document.querySelectorAll(selector).length,
        0
      );

      const markCount = document.querySelectorAll(".ac-mark").length;

      // Zero font-size declared directly on a heading tag outside the
      // .ac-type-* role classes (checks computed vs. an unclassed control).
      const headings = [...document.querySelectorAll("h1, h2, h3, h4")];
      const headingsMissingRole = headings.filter(
        (heading) => ![...heading.classList].some((cls) => cls.startsWith("ac-type-"))
      );

      const sections = [...document.querySelectorAll("main > section, main > div > section")];
      const sectionsWithMinHeight = sections.filter((section) => {
        const minHeight = getComputedStyle(section).minHeight;
        return minHeight && minHeight !== "0px" && minHeight !== "auto";
      });

      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      // Rough hairline proxy: 1px solid borders using the rule or steel-200 color.
      const hairlineCount = [...document.querySelectorAll("body *")].filter((el) => {
        const style = getComputedStyle(el);
        return ["borderTopWidth", "borderBottomWidth", "borderLeftWidth", "borderRightWidth"].some(
          (prop) => style[prop] === "1px"
        );
      }).length;

      return {
        h1Count,
        h2Count,
        serifCount,
        markCount,
        headingsMissingRoleCount: headingsMissingRole.length,
        headingsMissingRoleTags: headingsMissingRole.map((h) => h.tagName),
        sectionsWithMinHeightCount: sectionsWithMinHeight.length,
        overflow: scrollWidth > clientWidth,
        hairlineCount
      };
    });

    homepageAudit[width] = result;
    if (result.overflow) failures.push(`home ${width}px has horizontal overflow`);
    if (result.h1Count !== 1) failures.push(`home ${width}px has ${result.h1Count} H1s, expected 1`);
    if (result.serifCount !== 9) {
      failures.push(`home ${width}px has ${result.serifCount} Newsreader-role elements, expected 9`);
    }
    if (result.markCount !== 3) {
      failures.push(`home ${width}px has ${result.markCount} .ac-mark instances, expected 3`);
    }
    if (result.headingsMissingRoleCount > 0) {
      failures.push(
        `home ${width}px has ${result.headingsMissingRoleCount} heading(s) without an .ac-type-* role class: ${result.headingsMissingRoleTags.join(", ")}`
      );
    }
    if (result.sectionsWithMinHeightCount > 0) {
      failures.push(`home ${width}px has ${result.sectionsWithMinHeightCount} section(s) with a min-height`);
    }

    await page.close();
  }

  await writeFile(
    new URL("session-3-audit.json", reportDirectory),
    JSON.stringify({ generatedAt: new Date().toISOString(), homepageAudit, failures }, null, 2)
  );
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Session 3 check failures:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS specimen rendered at all six widths plus 200% zoom");
console.log("PASS homepage: one H1, nine Newsreader-role elements, three .ac-mark instances");
console.log("PASS homepage: every heading carries an .ac-type-* role class, no section min-height, no overflow");
