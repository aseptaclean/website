import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory =
  "/private/tmp/claude-501/-Users-biancapimentel-Documents-aseptaclean-codex-starter/250b590d-a198-4ccb-8308-3159393a93a5/scratchpad/screenshots";

const targets = [
  { path: "/", label: "home" },
  { path: "/crime-scene-trauma-cleanup-san-jose/", label: "crime-scene" },
  { path: "/deep-cleaning-san-jose/", label: "deep-cleaning" },
  { path: "/extreme-cleaning-san-jose/", label: "extreme-cleaning" },
  { path: "/rodent-dropping-cleanup-san-jose/", label: "rodent" },
  { path: "/hoarding-cleanup-san-jose/", label: "hoarding" }
];

const widths = [
  { width: 1440, height: 1600, label: "1440" },
  { width: 1024, height: 1400, label: "1024" },
  { width: 768, height: 1400, label: "768" },
  { width: 390, height: 1400, label: "390" }
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });

try {
  for (const target of targets) {
    for (const { width, height, label } of widths) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(`${baseUrl}${target.path}`, { waitUntil: "networkidle" });
      // Force lazy-loaded below-fold images to load before capture.
      await page.evaluate(async () => {
        const total = document.body.scrollHeight;
        for (let y = 0; y < total; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `${outputDirectory}/${target.label}-${label}.png`,
        fullPage: true
      });
      await page.close();
      console.log(`saved ${target.label}-${label}`);
    }
  }
} finally {
  await browser.close();
}
