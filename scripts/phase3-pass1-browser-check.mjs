import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL(
  "../artifacts/phase-3/final/",
  import.meta.url
);
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
    const response = await page.goto(`${baseUrl}/request-assessment/`, {
      waitUntil: "networkidle"
    });
    const result = await page.evaluate(() => {
      const heading = document.querySelector("h1");
      const form = document.querySelector("form");
      const fieldsets = form?.querySelectorAll(":scope > fieldset");
      const firstControl = document.querySelector("#property-city");
      const stickyCta = document.querySelector(".mobile-cta");
      const submit = document.querySelector('button[type="submit"]');

      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: heading?.textContent?.trim(),
        h1Bottom: heading?.getBoundingClientRect().bottom,
        firstControlTop: firstControl?.getBoundingClientRect().top,
        fieldsetCount: fieldsets?.length,
        hasMultipartEncoding:
          form?.getAttribute("enctype") === "multipart/form-data",
        hasStickyCta: Boolean(stickyCta),
        submitDisabled: submit?.hasAttribute("disabled"),
        requiredControls: form?.querySelectorAll("[required]").length
      };
    });

    if (response?.status() !== 200) {
      failures.push(`Assessment returned ${response?.status()} at ${width}px`);
    }
    if (result.scrollWidth > result.clientWidth) {
      failures.push(
        `Assessment overflows at ${width}px: ${result.scrollWidth}px > ${result.clientWidth}px`
      );
    }
    if (result.fieldsetCount !== 3) {
      failures.push(`Expected 3 top-level steps at ${width}px`);
    }
    if (!result.hasMultipartEncoding) {
      failures.push(`Multipart form encoding is missing at ${width}px`);
    }
    if (result.hasStickyCta) {
      failures.push(`Homepage sticky CTA rendered on assessment at ${width}px`);
    }
    if (!result.requiredControls || result.requiredControls < 20) {
      failures.push(`Required field constraints are incomplete at ${width}px`);
    }
    if (!result.submitDisabled) {
      failures.push(
        `Submit should remain disabled while the endpoint is unavailable at ${width}px`
      );
    }

    await page.screenshot({
      path: new URL(`assessment-${width}.png`, outputDirectory).pathname,
      fullPage: true
    });

    if (width === 390) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      await page.screenshot({
        path: new URL("mobile-first-viewport-390.png", outputDirectory).pathname
      });
    }

    console.log(
      `PASS ${width}px: status ${response?.status()}, three semantic steps, no overflow`
    );
    await page.close();
  }

  const keyboardPage = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  await keyboardPage.goto(`${baseUrl}/request-assessment/`, {
    waitUntil: "networkidle"
  });
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

  await keyboardPage.locator("#property-city").focus();
  const cityFocusVisible = await keyboardPage.locator("#property-city").evaluate(
    (element) => element.matches(":focus-visible")
  );
  if (!cityFocusVisible) {
    failures.push("Property city did not receive visible keyboard focus");
  }
  await keyboardPage.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\nPhase 3 Pass 1 browser checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS skip-link focus and visible form-control focus");
console.log("PASS disabled preview submission with no configured endpoint");
