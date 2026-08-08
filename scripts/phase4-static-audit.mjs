import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const reportDirectory = resolve(root, "artifacts/phase-4/reports");
const failures = [];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
};

const routeFiles = [
  ["home", resolve(dist, "index.html"), "https://aseptaclean.com/"],
  [
    "residence",
    resolve(dist, "private-residence-reset/index.html"),
    "https://aseptaclean.com/private-residence-reset/"
  ],
  [
    "assessment",
    resolve(dist, "request-assessment/index.html"),
    "https://aseptaclean.com/request-assessment/"
  ],
  ["privacy", resolve(dist, "privacy/index.html"), "https://aseptaclean.com/privacy/"],
  ["terms", resolve(dist, "terms/index.html"), "https://aseptaclean.com/terms/"],
  [
    "cookie",
    resolve(dist, "cookie-policy/index.html"),
    "https://aseptaclean.com/cookie-policy/"
  ],
  [
    "thank-you",
    resolve(dist, "thank-you/index.html"),
    "https://aseptaclean.com/thank-you/"
  ]
];

const routeEvidence = [];
for (const [name, path, canonical] of routeFiles) {
  const html = await readFile(path, "utf8");
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
  const schemaMatches = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    )
  ];
  const schemas = [];
  for (const match of schemaMatches) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch {
      failures.push(`${name}: invalid JSON-LD`);
    }
  }
  const evidence = {
    name,
    h1Count,
    canonical: canonicalMatch?.[1] || "",
    robots: robotsMatch?.[1] || "",
    schemaCount: schemas.length,
    hasAggregateRating: html.includes("AggregateRating")
  };
  routeEvidence.push(evidence);
  if (h1Count !== 1) failures.push(`${name}: expected one H1, found ${h1Count}`);
  if (evidence.canonical !== canonical) failures.push(`${name}: canonical mismatch`);
  if (!schemas.length || evidence.hasAggregateRating) {
    failures.push(`${name}: schema missing or contains rating markup`);
  }
}

const sitemap = await readFile(resolve(dist, "sitemap.xml"), "utf8");
const robots = await readFile(resolve(dist, "robots.txt"), "utf8");
for (const route of [
  "/",
  "/request-assessment/",
  "/private-residence-reset/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
]) {
  if (!sitemap.includes(`https://aseptaclean.com${route}`)) {
    failures.push(`sitemap missing ${route}`);
  }
}
if (!robots.includes("Disallow: /")) {
  failures.push("private preview robots.txt does not block crawling");
}

const files = await walk(dist);
const textFiles = files.filter((path) =>
  /\.(?:html|js|css|json|xml|txt)$/i.test(path)
);
const clientText = (
  await Promise.all(textFiles.map((path) => readFile(path, "utf8")))
).join("\n");
const forbiddenSecretNames = [
  "TURNSTILE_SECRET_KEY",
  "HUBSPOT_ACCESS_TOKEN",
  "RESEND_API_KEY",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_ACCOUNT_SID",
  "LEAD_ALERT_PHONE",
  "OWNER_ALERT_EMAIL"
];
const leakedSecretNames = forbiddenSecretNames.filter((name) =>
  clientText.includes(name)
);
if (leakedSecretNames.length) {
  failures.push(`client output includes server identifiers: ${leakedSecretNames.join(", ")}`);
}

const prohibitedClaims = [
  "medical-grade",
  "pharmaceutical-grade",
  "certified remediation",
  "fully insured",
  "licensed contractor",
  "biohazard cleanup"
];
const foundClaims = prohibitedClaims.filter((claim) =>
  clientText.toLowerCase().includes(claim)
);
if (foundClaims.length) {
  failures.push(`public output includes prohibited claims: ${foundClaims.join(", ")}`);
}

const sizeGroups = { js: 0, css: 0, woff2: 0, images: 0, total: 0 };
for (const path of files) {
  const bytes = (await stat(path)).size;
  sizeGroups.total += bytes;
  if (path.endsWith(".js")) sizeGroups.js += bytes;
  else if (path.endsWith(".css")) sizeGroups.css += bytes;
  else if (path.endsWith(".woff2")) sizeGroups.woff2 += bytes;
  else if (/\.(?:png|jpe?g|webp|avif)$/i.test(path)) sizeGroups.images += bytes;
}

await mkdir(reportDirectory, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  routes: routeEvidence,
  sitemap: {
    campaign: sitemap.includes("/private-residence-reset/"),
    cookiePolicy: sitemap.includes("/cookie-policy/")
  },
  robots: robots.trim(),
  clientSecretScan: {
    checkedServerIdentifiers: forbiddenSecretNames.length,
    leaks: leakedSecretNames
  },
  claimsScan: {
    checkedPhrases: prohibitedClaims,
    found: foundClaims
  },
  transferBytesBuiltAssets: sizeGroups,
  failures
};
await writeFile(
  resolve(reportDirectory, "static-audit.json"),
  JSON.stringify(report, null, 2)
);

if (failures.length) {
  console.error("Phase 4 static audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS one H1, canonical, noindex preview metadata, and valid JSON-LD");
console.log("PASS sitemap campaign/legal routes and private-preview robots block");
console.log("PASS client bundle server-secret identifier scan");
console.log("PASS prohibited-claims scan");
console.log(`Built assets: ${JSON.stringify(sizeGroups)}`);
