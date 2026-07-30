import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL("../artifacts/phase-1/", import.meta.url);
const routes = [
  "/",
  "/request-assessment/",
  "/thank-you/",
  "/privacy/",
  "/terms/"
];
const widths = [320, 390, 768, 1280];
const failures = [];
const evidence = [];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });

    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle"
      });
      const status = response?.status();
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth
      }));

      if (status !== 200) failures.push(`${route} returned ${status} at ${width}px`);
      if (dimensions.scrollWidth > dimensions.clientWidth) {
        failures.push(
          `${route} overflows at ${width}px: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`
        );
      }

      const slug = route === "/" ? "home" : route.split("/").filter(Boolean)[0];
      await page.screenshot({
        path: new URL(`${slug}-${width}.png`, outputDirectory).pathname,
        fullPage: true
      });
      evidence.push(`${route} ${width}px: status ${status}, no overflow`);
    }

    await page.close();
  }

  const keyboardPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await keyboardPage.goto(baseUrl, { waitUntil: "networkidle" });
  await keyboardPage.keyboard.press("Tab");
  const firstFocus = await keyboardPage.evaluate(
    () => document.activeElement?.textContent?.trim()
  );
  if (firstFocus !== "Skip to main content") {
    failures.push(`First keyboard focus was "${firstFocus}", not the skip link`);
  }
  await keyboardPage.keyboard.press("Enter");
  const skipTarget = await keyboardPage.evaluate(
    () => document.activeElement?.id
  );
  if (skipTarget !== "main-content") {
    failures.push(`Skip link focused "${skipTarget}", not main-content`);
  }

  const menu = keyboardPage.locator(".mobile-nav summary");
  await menu.focus();
  await keyboardPage.keyboard.press("Enter");
  const menuOpen = await keyboardPage.locator(".mobile-nav").evaluate(
    (element) => element.hasAttribute("open")
  );
  if (!menuOpen) failures.push("Mobile navigation did not open from the keyboard");

  const shortTargets = await keyboardPage
    .locator(".site-header a, .site-header summary, .mobile-cta a")
    .evaluateAll((elements) =>
      elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label: element.textContent?.trim(),
            width: rect.width,
            height: rect.height
          };
        })
        .filter(
          (item) =>
            item.width > 0 &&
            item.height > 0 &&
            (item.width < 48 || item.height < 48)
        )
    );
  if (shortTargets.length) {
    failures.push(`Controls below 48px: ${JSON.stringify(shortTargets)}`);
  }

  await keyboardPage.keyboard.press("Escape");
  const menuClosed = await keyboardPage.locator(".mobile-nav").evaluate(
    (element) => !element.hasAttribute("open")
  );
  if (!menuClosed) failures.push("Escape did not close the mobile navigation");

  await keyboardPage.locator("footer").scrollIntoViewIfNeeded();
  const overlap = await keyboardPage.evaluate(() => {
    const cta = document.querySelector(".mobile-cta")?.getBoundingClientRect();
    const lastFooterLink = [...document.querySelectorAll(".site-footer a")]
      .at(-1)
      ?.getBoundingClientRect();
    if (!cta || !lastFooterLink) return false;
    return lastFooterLink.bottom > cta.top;
  });
  if (overlap) failures.push("Mobile CTA overlaps the final footer link");

  const robots = await (
    await keyboardPage.request.get(`${baseUrl}/robots.txt`)
  ).text();
  if (!robots.includes("Disallow: /")) {
    failures.push("Staging robots.txt does not disallow crawling");
  }

  const noindex = await keyboardPage
    .locator('meta[name="robots"]')
    .getAttribute("content");
  if (noindex !== "noindex, nofollow") {
    failures.push(`Staging robots meta was "${noindex}"`);
  }

  await keyboardPage.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\nPhase 1 browser checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

for (const item of evidence) console.log(`PASS ${item}`);
console.log("PASS keyboard skip link and mobile navigation, including Escape");
console.log("PASS staging noindex and robots blocking");
console.log("PASS 48px visible shared navigation targets and footer clearance");
