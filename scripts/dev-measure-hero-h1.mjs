import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const widths = [390, 1440];

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto(`${baseUrl}/dev/hero-variants/`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const h1 = document.querySelector(".hv__h1");
      const body = document.querySelector("body");
      const h1Size = parseFloat(getComputedStyle(h1).fontSize);
      const bodySize = parseFloat(getComputedStyle(body).fontSize);
      return { h1Size, bodySize, ratio: h1Size / bodySize };
    });
    console.log(`${width}px -> h1=${result.h1Size}px body=${result.bodySize}px ratio=${result.ratio.toFixed(2)}:1`);
    await page.close();
  }
} finally {
  await browser.close();
}
