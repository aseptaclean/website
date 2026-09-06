import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
page.on("console", msg => console.log("CONSOLE:", msg.type(), msg.text()));
page.on("pageerror", err => console.log("PAGEERROR:", err.message));
page.on("requestfailed", req => console.log("REQFAILED:", req.url(), req.failure()?.errorText));
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
await page.waitForTimeout(800);
const imgInfo = await page.evaluate(() => {
  const img = document.querySelector('.evidence__media img');
  if (!img) return "NO IMG FOUND";
  return { src: img.currentSrc, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, complete: img.complete, computedDisplay: getComputedStyle(img).display, computedWidth: getComputedStyle(img).width, computedHeight: getComputedStyle(img).height };
});
console.log("IMG INFO:", JSON.stringify(imgInfo, null, 2));
await page.screenshot({ path: "/tmp/debug_evidence.png", clip: { x: 0, y: 0, width: 1440, height: 1200 } });
await browser.close();
