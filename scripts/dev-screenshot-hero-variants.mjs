import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory =
  "/private/tmp/claude-501/-Users-biancapimentel-Documents-aseptaclean-codex-starter/23282378-cef6-4cf1-a324-ccc96aa54c11/scratchpad/hero-variant-shots";
const widths = [
  { width: 390, height: 1400, label: "390" },
  { width: 1440, height: 1600, label: "1440" }
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });

try {
  for (const { width, height, label } of widths) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`${baseUrl}/dev/hero-variants/`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: `${outputDirectory}/hero-variants-${label}.png`,
      fullPage: true
    });
    await page.close();
    console.log(`saved ${label}`);
  }
} finally {
  await browser.close();
}
