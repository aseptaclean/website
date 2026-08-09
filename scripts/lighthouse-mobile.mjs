import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { resolve } from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const root = process.cwd();
const distDir = resolve(root, "dist");
const outDir = resolve(root, "artifacts/full-site-check/lighthouse");
await mkdir(outDir, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon"
};

async function resolvePath(urlPath) {
  let p = urlPath.split("?")[0];
  if (p === "/") p = "/index.html";
  let full = join(distDir, decodeURIComponent(p));
  if (!extname(full)) full = join(full, "index.html");
  return full;
}

const server = createServer(async (req, res) => {
  try {
    const full = await resolvePath(req.url || "/");
    const body = await readFile(full);
    res.writeHead(200, { "Content-Type": MIME[extname(full)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(4327, "127.0.0.1", r));
const baseUrl = "http://127.0.0.1:4327";

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox"],
  chromePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});

const routes = ["/", "/about/"];
const results = [];

for (const route of routes) {
  const runnerResult = await lighthouse(`${baseUrl}${route}`, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      disabled: false
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
  });

  const lhr = runnerResult.lhr;
  const scores = {
    performance: Math.round((lhr.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((lhr.categories["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((lhr.categories.seo?.score ?? 0) * 100)
  };
  results.push({ route, scores });
  await writeFile(
    join(outDir, `${route === "/" ? "home" : route.replace(/\//g, "")}.json`),
    JSON.stringify(lhr, null, 2)
  );
  console.log(`${route}: performance=${scores.performance} a11y=${scores.accessibility} best-practices=${scores.bestPractices} seo=${scores.seo}`);
}

await chrome.kill();
server.close();
await writeFile(join(outDir, "summary.json"), JSON.stringify(results, null, 2));
console.log("Lighthouse summary written.");
