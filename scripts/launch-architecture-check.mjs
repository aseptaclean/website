import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

const dist = resolve("dist");

// READ THE REAL LAUNCH DATA, 2026-09-04. This list used to be hand-synced with
// src/data/launchArchitecture.ts and had drifted: it predated /cookie-policy/ joining the public
// set, so the check reported a correct page as a failure. This script runs as plain Node and
// cannot import the .ts module, so it parses the literals out of it instead. Drift is now
// impossible without editing the same file the site reads.
const launchSource = await readFile(resolve("src/data/launchArchitecture.ts"), "utf8");

// Rebuild launchPrimaryPaths in source order, expanding the launchServiceLinks spread in place.
// Scoped to the launchServiceLinks block — an unscoped `href:` match also picked up
// launchPrimaryNavLinks and appended /services/, /about/ and /contact/ a second time.
const serviceLinksStart = launchSource.indexOf("export const launchServiceLinks = [");
if (serviceLinksStart < 0) throw new Error("launchArchitecture.ts: launchServiceLinks not found");
const serviceHrefs = [
  ...launchSource
    .slice(serviceLinksStart, launchSource.indexOf("] as const;", serviceLinksStart))
    .matchAll(/href: "(\/[a-z0-9-]+\/)"/g)
].map((m) => m[1]);
const primaryStart = launchSource.indexOf("export const launchPrimaryPaths = [");
if (primaryStart < 0) throw new Error("launchArchitecture.ts: launchPrimaryPaths not found");
const primaryBody = launchSource.slice(primaryStart, launchSource.indexOf("] as const;", primaryStart));

const expectedPublicAll = [];
for (const line of primaryBody.split("\n")) {
  if (line.includes("...launchServiceLinks")) {
    expectedPublicAll.push(...serviceHrefs);
    continue;
  }
  const literal = /^\s*"(\/[^"]*)"/.exec(line);
  if (literal) expectedPublicAll.push(literal[1]);
}

// Routes deliberately held out of the indexable set. Parsed from the same file, so a page can
// only be excused here by being excused in the code the site itself reads.
const exceptionsStart = launchSource.indexOf("export const launchIndexableExceptions = {");
const indexableExceptions = new Set(
  exceptionsStart < 0
    ? []
    : [
        ...launchSource
          .slice(exceptionsStart, launchSource.indexOf("} as const;", exceptionsStart))
          .matchAll(/"(\/[^"]+\/)":/g)
      ].map((m) => m[1])
);

// The full public/design set, and the narrower set that should actually be indexed.
const expectedPublic = expectedPublicAll.filter((route) => !indexableExceptions.has(route));
const publicSet = new Set(expectedPublicAll);
const allowedUtilityLinks = new Set([
  "/data-request/",
  "/thank-you/",
  "/sms-notification-consent/"
]);
const protectedSmsPath = "/sms-notification-consent/";
const failures = [];

const normalizePath = (value) => {
  const url = new URL(value, "https://aseptaclean.com");
  if (url.origin !== "https://aseptaclean.com") return null;
  const pathname = url.pathname;
  return pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
};

const findHtml = async (directory) => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findHtml(path)));
    else if (entry.name === "index.html" || entry.name === "404.html") files.push(path);
  }
  return files;
};

const routeForFile = (file) => {
  const rel = relative(dist, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404";
  return `/${rel.replace(/\/index\.html$/, "")}/`;
};

const htmlFiles = await findHtml(dist);
const pages = new Map();
for (const file of htmlFiles) pages.set(routeForFile(file), await readFile(file, "utf8"));

for (const route of expectedPublic) {
  const html = pages.get(route);
  if (!html) {
    failures.push(`${route} is missing from dist`);
    continue;
  }
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`${route} is noindex`);
  }
  if (!/<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']+/i.test(html)) {
    failures.push(`${route} is missing a canonical`);
  }
}

for (const route of indexableExceptions) {
  const html = pages.get(route);
  if (!html) {
    failures.push(`${route} is held out of the index but is missing from dist`);
    continue;
  }
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`${route} is in launchIndexableExceptions but ships indexable`);
  }
}

for (const [route, html] of pages) {
  if (publicSet.has(route) || route === protectedSmsPath) continue;
  if (!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    failures.push(`${route} remains indexable outside the launch set`);
  }
  if (/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) {
    failures.push(`${route} retains structured data while hidden from launch`);
  }
}

const smsHtml = pages.get(protectedSmsPath) || "";
if (!smsHtml) failures.push(`${protectedSmsPath} is missing`);

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizePath(match[1]));
if (JSON.stringify(sitemapPaths) !== JSON.stringify(expectedPublic)) {
  failures.push(`sitemap paths differ: ${sitemapPaths.join(", ")}`);
}

for (const route of expectedPublic) {
  const html = pages.get(route) || "";
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(?:mailto:|tel:|sms:|#)/i.test(href)) continue;
    const linkedPath = normalizePath(href);
    if (!linkedPath) continue;
    if (!pages.has(linkedPath) && linkedPath !== "/404/") {
      failures.push(`${route} has broken internal link ${linkedPath}`);
      continue;
    }
    if (!publicSet.has(linkedPath) && !allowedUtilityLinks.has(linkedPath)) {
      failures.push(`${route} promotes hidden route ${linkedPath}`);
    }
  }
}

if (failures.length) {
  console.error(`FAILED — ${failures.length} launch architecture finding(s)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`PASS — ${pages.size} built routes inventoried`);
console.log(`PASS — exactly ${expectedPublic.length} owner-approved routes are indexable and in sitemap.xml`);
if (indexableExceptions.size) {
  console.log(
    `NOTE — ${indexableExceptions.size} route(s) built and linked but deliberately noindex: ${[...indexableExceptions].join(", ")}`
  );
}
console.log("PASS — every retained route is noindex with structured data suppressed");
console.log("PASS — public pages do not promote hidden marketing routes");
console.log("PASS — protected SMS consent route remains built and outside sitemap.xml");
