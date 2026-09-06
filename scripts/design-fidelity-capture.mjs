import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { mkdir, readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const baselineDist = process.env.BASELINE_DIST;
if (!baselineDist) throw new Error("Set BASELINE_DIST to the built 9751691 dist directory");

const targets = [
  ["home", "/"],
  ["services", "/services/"],
  ["hoarding", "/hoarding-cleanup-san-jose/"],
  ["severe", "/extreme-cleaning-san-jose/"],
  ["rodent", "/rodent-dropping-cleanup-san-jose/"],
  ["detailed", "/deep-cleaning-san-jose/"],
  ["assessment", "/request-assessment/"]
];
const widths = [390, 1440];
const output = "/tmp/aseptaclean-design-compare";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png"
};

const staticServer = (root, port) => {
  const server = createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url || "/", "http://local").pathname);
      if (pathname === "/") pathname = "/index.html";
      let file = join(root, pathname);
      const info = await stat(file).catch(() => null);
      if (info?.isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  return new Promise((resolveListen) => server.listen(port, "127.0.0.1", () => resolveListen(server)));
};

await mkdir(output, { recursive: true });
const servers = [
  await staticServer(resolve(baselineDist), 4341),
  await staticServer(resolve("dist"), 4342)
];
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true
});

try {
  const versions = process.env.CAPTURE_CURRENT_ONLY ? [["current", 4342]] : [["baseline", 4341], ["current", 4342]];
  for (const [version, port] of versions) {
    await mkdir(join(output, version), { recursive: true });
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      await context.route(new RegExp(`^https?:\\/\\/(?!127\\.0\\.0\\.1:${port})`), (route) => route.abort());
      const page = await context.newPage();
      for (const [name, route] of targets) {
        await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: join(output, version, `${name}-${width}.png`), fullPage: true });
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  servers.forEach((server) => server.close());
}

console.log(`Captured baseline/current comparisons in ${output}`);
