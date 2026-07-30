import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pass = process.env.PHASE2_PASS || "pass-1";
const outputDirectory = new URL(`../artifacts/phase-2/${pass}/`, import.meta.url);
const widths = [320, 390, 768, 1024, 1280, 1440];
const failures = [];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const heading = document.querySelector("h1");
      const cta = document.querySelector(".hero__action .button");
      const viewport = {
        width: document.documentElement.clientWidth,
        height: window.innerHeight
      };

      return {
        status: document.readyState,
        clientWidth: viewport.width,
        scrollWidth: document.documentElement.scrollWidth,
        h1: heading?.textContent?.trim(),
        h1Bottom: heading?.getBoundingClientRect().bottom,
        ctaBottom: cta?.getBoundingClientRect().bottom,
        hasOutcome: Boolean(document.querySelector("#how-it-works")),
        hasStandard: Boolean(document.querySelector("#standards")),
        hasScope: Boolean(document.querySelector("#included")),
        hasPricing: Boolean(document.querySelector(".pricing")),
        hasFounder: Boolean(document.querySelector("#about")),
        hasTimeline: Boolean(document.querySelector(".timeline")),
        hasFaq: Boolean(document.querySelector("#faq")),
        hasFinalCta: Boolean(document.querySelector(".final-cta")),
        hasSampleRecord: Boolean(
          [...document.querySelectorAll("p")].some((element) =>
            element.textContent?.includes("Sample / Not a client record")
          )
        ),
        firstViewportCta: Boolean(
          cta && cta.getBoundingClientRect().top < viewport.height
        )
      };
    });

    if (response?.status() !== 200) {
      failures.push(`Homepage returned ${response?.status()} at ${width}px`);
    }
    if (result.scrollWidth > result.clientWidth) {
      failures.push(
        `Homepage overflows at ${width}px: ${result.scrollWidth}px > ${result.clientWidth}px`
      );
    }
    if (!result.firstViewportCta) {
      failures.push(`Primary hero CTA is below the first viewport at ${width}px`);
    }
    if (!result.hasOutcome || !result.hasStandard || !result.hasScope) {
      failures.push(`One or more Pass 2 sections are missing at ${width}px`);
    }
    if (!result.hasSampleRecord) {
      failures.push(`SAMPLE Property Handoff Record label is missing at ${width}px`);
    }
    if (
      !result.hasPricing ||
      !result.hasFounder ||
      !result.hasTimeline ||
      !result.hasFaq ||
      !result.hasFinalCta
    ) {
      failures.push(`One or more Pass 3 sections are missing at ${width}px`);
    }

    await page.screenshot({
      path: new URL(`home-${width}.png`, outputDirectory).pathname,
      fullPage: true
    });

    console.log(
      `PASS ${width}px: status ${response?.status()}, no overflow, hero CTA visible`
    );
    await page.close();
  }

  const keyboardPage = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  await keyboardPage.goto(baseUrl, { waitUntil: "networkidle" });
  await keyboardPage.keyboard.press("Tab");
  const firstFocus = await keyboardPage.evaluate(
    () => document.activeElement?.textContent?.trim()
  );
  if (firstFocus !== "Skip to main content") {
    failures.push(`First focus was "${firstFocus}", not the skip link`);
  }
  await keyboardPage.keyboard.press("Enter");
  const skipTarget = await keyboardPage.evaluate(
    () => document.activeElement?.id
  );
  if (skipTarget !== "main-content") {
    failures.push(`Skip link focused "${skipTarget}", not main-content`);
  }

  const stickyCta = keyboardPage.locator(".mobile-cta");
  if (await stickyCta.isVisible()) {
    failures.push("Sticky CTA is visible while the hero CTA is still in view");
  }
  await keyboardPage.locator(".qualification").scrollIntoViewIfNeeded();
  await keyboardPage.waitForTimeout(250);
  if (!(await stickyCta.isVisible())) {
    failures.push("Sticky CTA did not appear after the hero CTA left view");
  }
  await keyboardPage.locator(".final-cta").scrollIntoViewIfNeeded();
  await keyboardPage.waitForTimeout(250);
  if (await stickyCta.isVisible()) {
    failures.push("Sticky CTA remained visible over the final CTA");
  }
  await keyboardPage.locator(".site-footer").scrollIntoViewIfNeeded();
  await keyboardPage.waitForTimeout(250);
  if (await stickyCta.isVisible()) {
    failures.push("Sticky CTA remained visible over the footer");
  }
  await keyboardPage.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\nPhase 2 browser checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS keyboard skip link and sticky CTA visibility boundaries");
