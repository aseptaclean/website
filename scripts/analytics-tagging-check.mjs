// ANALYTICS TAGGING GUARD — runs against a fresh `dist/`, never against source.
//
// The failure this exists to prevent is not "the snippet is missing". It is the opposite: a second
// base tag, added on one page or one layout, quietly doubling every `page_view` and every
// conversion in GA4. That is invisible in source review and obvious here.
//
// Checks, over EVERY emitted HTML page:
//   1. exactly one GTM container installation per page that carries one at all
//   2. no second GA4 base tag anywhere — no gtag.js loader, no `gtag('config', 'G-…')`
//   3. the container is Termly-gated with the attribute Termly actually reads
//   4. the container sits in <head>, and its <noscript> immediately after <body>
//   5. no page carries a raw GA4 measurement ID outside the container
//   6. every route built from the shared layouts carries the container
//
// Usage: node scripts/analytics-tagging-check.mjs [distDir]
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const distDir = process.argv[2] || "./dist";
const CONTAINER_ID = "GTM-WSSQ62BN";

// /sms-notification-consent/ is byte-preserved under an ACTIVE Twilio 10DLC carrier review and is
// fenced DO NOT EDIT by AGENTS.md §2 and §6. It is a standalone document that does not use
// BaseLayout, so it carries no container, and that is correct rather than a gap.
const EXEMPT = new Set(["sms-notification-consent/index.html"]);

let failures = 0;
let checks = 0;

const check = (ok, label, detail = "") => {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const countOf = (haystack, needle) => haystack.split(needle).length - 1;

const files = (await htmlFiles(distDir)).sort();
if (!files.length) {
  console.error(`No HTML found in ${distDir}. Run a build first.`);
  process.exit(1);
}

const withContainer = [];
const missingContainer = [];
const duplicateContainer = [];
const ungated = [];
const notInHead = [];
const noscriptMisplaced = [];
const ga4BaseTag = [];
const rawMeasurementId = [];

for (const file of files) {
  const rel = relative(distDir, file);
  const html = await readFile(file, "utf8");

  const loaderCount = countOf(html, "googletagmanager.com/gtm.js");
  const noscriptCount = countOf(html, "googletagmanager.com/ns.html");

  if (loaderCount === 0 && noscriptCount === 0) {
    if (!EXEMPT.has(rel)) missingContainer.push(rel);
    continue;
  }
  withContainer.push(rel);

  if (loaderCount !== 1 || noscriptCount !== 1) {
    duplicateContainer.push(`${rel} (loader×${loaderCount}, noscript×${noscriptCount})`);
  }

  // Termly reads `[data-categories]`. `data-type` is not a Termly attribute and would leave the
  // script inert at type="text/plain" forever.
  const loaderIndex = html.indexOf("googletagmanager.com/gtm.js");
  const tagStart = html.lastIndexOf("<script", loaderIndex);
  const openingTag = html.slice(tagStart, html.indexOf(">", tagStart) + 1);
  if (
    !openingTag.includes('type="text/plain"') ||
    !openingTag.includes('data-categories="analytics"')
  ) {
    ungated.push(`${rel} → ${openingTag.slice(0, 120)}`);
  }

  const headEnd = html.indexOf("</head>");
  if (headEnd === -1 || loaderIndex > headEnd) notInHead.push(rel);

  // "Immediately after the opening <body>" — nothing but whitespace between them.
  const bodyOpen = html.indexOf("<body");
  const bodyTagEnd = html.indexOf(">", bodyOpen) + 1;
  const afterBody = html.slice(bodyTagEnd, bodyTagEnd + 400);
  if (!/^\s*<noscript>\s*<iframe[^>]*googletagmanager\.com\/ns\.html/.test(afterBody)) {
    noscriptMisplaced.push(`${rel} → ${afterBody.slice(0, 80).replace(/\s+/g, " ")}`);
  }
}

for (const file of files) {
  const rel = relative(distDir, file);
  const html = await readFile(file, "utf8");
  if (html.includes("googletagmanager.com/gtag/js")) ga4BaseTag.push(rel);
  if (/gtag\s*\(\s*["'`]config["'`]/.test(html)) ga4BaseTag.push(`${rel} (gtag config)`);
  if (/\bG-[A-Z0-9]{8,}\b/.test(html)) rawMeasurementId.push(rel);
}

console.log(`\nAnalytics tagging check — ${files.length} HTML page(s) in ${distDir}\n`);

check(
  missingContainer.length === 0,
  `every non-exempt page carries the ${CONTAINER_ID} container`,
  missingContainer.length ? `missing on ${missingContainer.length}: ${missingContainer.slice(0, 5).join(", ")}` : `${withContainer.length} page(s)`
);
check(
  duplicateContainer.length === 0,
  "exactly one container installation per page (one loader, one noscript)",
  duplicateContainer.slice(0, 5).join("; ")
);
check(
  ungated.length === 0,
  'the container is Termly-gated with type="text/plain" data-categories="analytics"',
  ungated.slice(0, 3).join("; ")
);
check(
  notInHead.length === 0,
  "the container script is inside <head>",
  notInHead.slice(0, 5).join(", ")
);
check(
  noscriptMisplaced.length === 0,
  "the <noscript> iframe is immediately after the opening <body>",
  noscriptMisplaced.slice(0, 3).join("; ")
);
check(
  ga4BaseTag.length === 0,
  "no second GA4 base tag (no gtag.js loader, no gtag config call) anywhere in the build",
  ga4BaseTag.slice(0, 5).join(", ")
);
check(
  rawMeasurementId.length === 0,
  "no raw GA4 measurement ID is hardcoded in any page",
  rawMeasurementId.slice(0, 5).join(", ")
);
check(
  countOf(await readFile(files.find((f) => f.endsWith("index.html")), "utf8"), CONTAINER_ID) > 0,
  `the configured container ID is ${CONTAINER_ID}`
);

console.log(`\n${checks - failures}/${checks} checks passed.`);
process.exit(failures ? 1 : 0);
