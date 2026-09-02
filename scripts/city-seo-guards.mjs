#!/usr/bin/env node
//
// scripts/city-seo-guards.mjs — the indexation gate for the nine city routes.
//
// Runs against dist/ AFTER a production build, because every guard here is about what a visitor
// or a crawler actually receives. Grepping source would pass a page whose FAQ schema is built
// from a different array than its FAQ markup; reading rendered HTML cannot.
//
// WHAT IT CHECKS
//   Identity      unique H1 / title / meta description sitewide · self-referencing canonical
//   Schema        BreadcrumbList everywhere · Service on the six service×city pages ·
//                 CollectionPage on the three hubs · FAQPage matching the rendered FAQ verbatim
//                 in both directions · exactly one LocalBusiness entity at /#business ·
//                 no address, no AggregateRating, no Review, no priceRange, anywhere
//   Copy          fake-experience claims · hauling / self-transport claims · unsupported
//                 remediation-and-biohazard claims · public project prices and permit-fee
//                 dollar amounts
//   Data          city facts rendered on the wrong service · facts past reviewAfter ·
//                 implications whose factIds do not resolve
//   Graph         required internal links out · at least one inbound link in ·
//                 sitemap.xml contains published-index pages and nothing else
//
// TWO SEVERITIES, AND THE SPLIT IS DELIBERATE
//
//   error    Fails the run. Two kinds of finding earn it:
//              · a COMPLIANCE finding on any built page, indexable or not. docs/21 governs every
//                word a visitor can read, and `noindex` is not a cure for an unlawful sentence —
//                the page is still published, still readable, still linked from the site. A
//                claims violation on a gated draft is the same exposure as one on the homepage.
//              · any finding at all on a `published-index` page. Once a page is in the index,
//                every guard is load-bearing.
//   blocker  Recorded and printed, exit 0. An INDEX-QUALITY finding on a `noindex` page: the
//            page is in a legal state today (docs/city-pages-part2-UPDATED.md D3 — "all must
//            pass or the page ships noindex"), and the finding is the list of what must clear
//            before its publishStatus can move up. Blocking the build on these would mean a
//            gated draft could never be committed, which is backwards.
//
// A page with zero blockers is a page whose publishStatus may be raised to `published-index`,
// subject to the two owner confirmations that are not a machine's to make.
//
// Usage:  npm run qa:seo          (after npm run build)
//         npm run qa:seo -- --json  machine-readable report on stdout
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = resolve(root, "dist");
const asJson = process.argv.includes("--json");
const SITE = "https://aseptaclean.com";

// Routes exempt from the sitewide identity guards, each for a reason that is not "it would be
// inconvenient to fix". Nothing in the city set is exemptible and nothing here is.
const EXEMPT = new Map([
  [
    "/404.html",
    "Served for arbitrary unmatched URLs, so it has no self to canonicalize. Permanently " +
      "noindex, not a content page, and its title is the one string on the site that is meant " +
      "to be generic."
  ],
  [
    "/sms-notification-consent/",
    "Standalone document under Twilio 10DLC carrier review — .claude/skills/route-audit says " +
      "it must never be edited. It bypasses BaseLayout and SeoHead deliberately, so it has no " +
      "canonical and no JSON-LD, and it is in no sitemap and no nav. The guard records the gap " +
      "rather than reporting a defect nobody is permitted to fix. Revisit when carrier review " +
      "clears."
  ]
]);

const findings = [];
/** @param {"error"|"blocker"} severity */
const report = (severity, guard, route, detail) =>
  findings.push({ severity, guard, route, detail });
const error = (guard, route, detail) => report("error", guard, route, detail);

/**
 * Index-quality findings: hard error on an indexable page, publish-blocker on a noindex one.
 * Compliance findings never route through here — they call `error` directly.
 */
const quality = (page, guard, detail) =>
  report(page.indexable ? "error" : "blocker", guard, page.route, detail);

if (!existsSync(dist)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

// ---------------------------------------------------------------------------------------------
// Data records, bundled out of TypeScript.
//
// The guards need `appliesTo`, `reviewAfter`, `factIds`, and `publishStatus` as values, not as
// text — a regex over the .ts source would be a second, weaker parser that drifts from the one
// Astro uses. esbuild is already a build-time dependency of this repo (see the qa:phase3:endpoint
// script, which bundles the lead endpoint the same way).
//
// src/data/site.ts is bundled too, for one string: `legal.scopeDisclaimer`, the mandated
// negation clause the claims guard must whitelist rather than fail (docs/21 §2.2, in as many
// words). Reading it from the same module the pages render means editing the legal copy updates
// the whitelist in the same change — a hand-copied clause here would go stale silently and start
// failing correct pages. site.ts reads `import.meta.env`, which plain Node does not define, so
// esbuild substitutes an empty object and every `value()` call falls through to its literal
// default. `scopeDisclaimer` has no env input, so the string is exactly what ships.
// ---------------------------------------------------------------------------------------------
const loadData = async () => {
  let esbuild;
  try {
    esbuild = await import("esbuild");
  } catch {
    console.error(
      "esbuild is required by this check and is not resolvable. `npm install`, then retry."
    );
    process.exit(1);
  }
  const scratch = await mkdtemp(join(tmpdir(), "aseptaclean-seo-"));
  const outfile = join(scratch, "city-data.mjs");
  await esbuild.build({
    stdin: {
      contents: `
        export { cityFacts, getCityFactsForService } from "./src/data/cityFacts";
        export { cityHubPages } from "./src/data/cityHubPages";
        export { serviceCityImplications } from "./src/data/serviceCityImplications";
        export {
          containerCoordinationPolicy,
          serviceCityPages,
          serviceDefinitions
        } from "./src/data/serviceCityPages";
        export { isBuilt, isIndexable, isInSitemap } from "./src/data/publication";
        export { legal, site } from "./src/data/site";
      `,
      resolveDir: root,
      loader: "ts"
    },
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    define: { "import.meta.env": "{}" },
    outfile
  });
  const mod = await import(pathToFileURL(outfile).href);
  await rm(scratch, { recursive: true, force: true });
  return mod;
};

const data = await loadData();

// ---------------------------------------------------------------------------------------------
// HTML reading. No DOM library in this repo's dependency tree, so the extraction is explicit
// about what it does and does not do — it reads text and attributes, it does not build a tree.
// ---------------------------------------------------------------------------------------------
const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  rarr: "→",
  times: "×",
  deg: "°"
};

const decodeEntities = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);

/**
 * One normalizer, used on both sides of every text comparison. Curly quotes and dashes fold to
 * ASCII because the same sentence is authored once and rendered through markup that may or may
 * not have converted them — that difference is typographic, never semantic, and treating it as a
 * mismatch would make the FAQ guard cry wolf on correct pages.
 */
const normalize = (value) =>
  decodeEntities(value)
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();

const stripTags = (html) =>
  normalize(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  );

const attr = (html, pattern) => {
  const match = html.match(pattern);
  return match ? decodeEntities(match[1]) : null;
};

/**
 * Body copy only — everything inside <main>. The site-wide header, footer, and mobile CTA carry
 * the mandated disclaimer clauses from docs/21 §2.3 and §2.4, which contain, by design, several
 * of the words the claims guard forbids ("licensed", "remediation", "sterilization") inside their
 * negations. Scoping to <main> is what lets the guard be strict about the words without having to
 * whitelist the exact negation strings and re-whitelist them every time the legal copy is edited.
 */
const mainRegion = (html) => {
  const open = html.indexOf("<main");
  if (open === -1) return null;
  const start = html.indexOf(">", open);
  const end = html.lastIndexOf("</main>");
  if (start === -1 || end === -1 || end < start) return null;
  return html.slice(start + 1, end);
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
};

const routeForFile = (file) => {
  const rel = relative(dist, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
};

const htmlFiles = (await walk(dist)).sort();
const pages = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const main = mainRegion(html);
  const graph = [];
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      const parsed = JSON.parse(match[1]);
      graph.push(...(Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed]));
    } catch (cause) {
      error("schema-parse", routeForFile(file), `JSON-LD block is not valid JSON: ${cause.message}`);
    }
  }
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const hrefs = [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)].map((m) => decodeEntities(m[1]));

  pages.push({
    file,
    route: routeForFile(file),
    html,
    main,
    mainText: main ? stripTags(main) : "",
    title: attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
    canonical: attr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i),
    robots: attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/i),
    headings,
    hrefs,
    graph,
    // Rewritten below for the nine city routes from their publishStatus record. For every other
    // page the rendered robots tag is the only statement of intent available here.
    indexable: !(attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/i) || "").includes("noindex")
  });
}

const byRoute = new Map(pages.map((page) => [page.route, page]));

// ---------------------------------------------------------------------------------------------
// The nine city routes, joined to their records.
// ---------------------------------------------------------------------------------------------
// The two record shapes spell the city differently — a hub carries `slug` + `city` (display
// name), a service×city record carries `city` (slug) + `cityName`. Both are normalized to
// `citySlug` / `cityDisplay` here, once, because reading `record.city` generically silently
// compares a display name against a slug: every fact lookup on a hub matched nothing and every
// fact guard on the three hubs quietly passed. Caught by a freshness test that fired on the six
// service pages and not on the hubs that render the same fact.
const cityRecords = [
  ...data.cityHubPages.map((record) => ({
    kind: "hub",
    record,
    path: record.path,
    citySlug: record.slug,
    cityDisplay: record.city
  })),
  ...data.serviceCityPages.map((record) => ({
    kind: "service",
    record,
    path: record.path,
    citySlug: record.city,
    cityDisplay: record.cityName
  }))
];

const cityPages = [];
for (const entry of cityRecords) {
  const page = byRoute.get(entry.path);
  const built = data.isBuilt(entry.record.publishStatus);

  if (built && !page) {
    error(
      "publication-state",
      entry.path,
      `publishStatus is "${entry.record.publishStatus}" but no HTML was built for this route.`
    );
    continue;
  }
  if (!built) {
    if (page) {
      error(
        "publication-state",
        entry.path,
        'publishStatus is "draft" but the route was built. A draft record must produce no HTML.'
      );
    }
    continue;
  }
  if (!page.main) {
    error("markup", entry.path, "No <main> region found; body-copy guards cannot run.");
    continue;
  }
  page.indexable = data.isIndexable(entry.record.publishStatus);
  cityPages.push({ ...page, ...entry });
}

// ---------------------------------------------------------------------------------------------
// GUARD — publication states are the three known values.
// ---------------------------------------------------------------------------------------------
const STATES = new Set(["draft", "noindex", "published-index"]);
for (const { record, path } of cityRecords) {
  if (!STATES.has(record.publishStatus)) {
    error(
      "publication-state",
      path,
      `Unknown publishStatus "${record.publishStatus}". Expected draft | noindex | published-index.`
    );
  }
}

// ---------------------------------------------------------------------------------------------
// GUARD 1/2/3 — unique H1, title, meta description. Sitewide, because a city page can only
// duplicate one of these by colliding with a page outside its own group.
//
// The two exempt routes are skipped — see EXEMPT at the top of this file for why each one is.
// ---------------------------------------------------------------------------------------------
const uniquenessPages = pages.filter((page) => !EXEMPT.has(page.route));

for (const page of uniquenessPages) {
  if (page.headings.length !== 1) {
    const detail = `Expected exactly one <h1>, found ${page.headings.length}.`;
    const cityPage = cityPages.find((entry) => entry.route === page.route);
    if (cityPage) quality(cityPage, "h1-count", detail);
    else if (page.indexable) error("h1-count", page.route, detail);
  }
}

const collide = (accessor, guard, label) => {
  const seen = new Map();
  for (const page of uniquenessPages) {
    const raw = accessor(page);
    if (!raw) {
      const detail = `Missing ${label}.`;
      const cityPage = cityPages.find((entry) => entry.route === page.route);
      if (cityPage) quality(cityPage, guard, detail);
      else if (page.indexable) error(guard, page.route, detail);
      continue;
    }
    const key = normalize(raw).toLowerCase();
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(page);
  }
  for (const [value, group] of seen) {
    if (group.length < 2) continue;
    const routes = group.map((page) => page.route).join(", ");
    for (const page of group) {
      const detail = `Duplicate ${label} shared by ${group.length} routes (${routes}): "${value}"`;
      const cityPage = cityPages.find((entry) => entry.route === page.route);
      if (cityPage) quality(cityPage, guard, detail);
      else if (page.indexable) error(guard, page.route, detail);
    }
  }
};

collide((page) => page.headings[0], "unique-h1", "H1");
collide((page) => page.title, "unique-title", "title");
collide((page) => page.description, "unique-meta-description", "meta description");

// ---------------------------------------------------------------------------------------------
// GUARD 4 — self-referencing canonical.
// ---------------------------------------------------------------------------------------------
for (const page of pages) {
  if (EXEMPT.has(page.route)) continue;
  const expected = new URL(page.route, SITE).href;
  const cityPage = cityPages.find((entry) => entry.route === page.route);
  if (!page.canonical) {
    const detail = "No <link rel=canonical>.";
    if (cityPage) quality(cityPage, "canonical", detail);
    else if (page.indexable) error("canonical", page.route, detail);
    continue;
  }
  if (page.canonical !== expected) {
    // A city page canonicalized anywhere but itself is the specific failure D4 names: an
    // unfinished local page is noindex, never a canonical pointer at its parent service page.
    const detail = `Canonical is not self-referencing: ${page.canonical} (expected ${expected}).`;
    if (cityPage) quality(cityPage, "canonical", detail);
    else if (page.indexable) error("canonical", page.route, detail);
  }
}

// ---------------------------------------------------------------------------------------------
// Schema helpers.
// ---------------------------------------------------------------------------------------------
const typesOf = (node) => {
  const value = node?.["@type"];
  return Array.isArray(value) ? value : value ? [value] : [];
};
const nodesOfType = (graph, type) => graph.filter((node) => typesOf(node).includes(type));

/** Every value in the graph, walked, so a forbidden key cannot hide inside a nested object. */
function* walkNodes(value) {
  if (Array.isArray(value)) {
    for (const item of value) yield* walkNodes(item);
  } else if (value && typeof value === "object") {
    yield value;
    for (const item of Object.values(value)) yield* walkNodes(item);
  }
}

const BUSINESS_ID = `${SITE}/#business`;

// ---------------------------------------------------------------------------------------------
// GUARD 9/10/11/12 — entity discipline, sitewide.
//
//   9   ONE business entity sitewide. No page may define a second: at most one LocalBusiness
//       node per page, always at /#business, and never a separate Organization alongside it.
//       Zero is not a violation — a page with no JSON-LD at all (the standalone SMS consent
//       document) creates no competing entity. The nine city routes are held to exactly one,
//       checked with the rest of their schema below.
//   10  no address of any kind. AGENTS.md §3: service-area business, no published street
//       address, ever. A PostalAddress on a City node is areaServed, not a location, and is
//       allowed to carry region and country only.
//   11  no AggregateRating and no Review. AGENTS.md §0.3 — nothing invented, and zero real
//       reviews exist to mark up.
//   12  no priceRange.
// ---------------------------------------------------------------------------------------------
for (const page of pages) {
  const business = nodesOfType(page.graph, "LocalBusiness");
  const organizations = nodesOfType(page.graph, "Organization").filter(
    (node) => !typesOf(node).includes("LocalBusiness")
  );

  if (business.length > 1) {
    error(
      "single-entity",
      page.route,
      `${business.length} LocalBusiness nodes on one page. One entity, one @id, sitewide.`
    );
  }
  for (const node of business) {
    if (node["@id"] !== BUSINESS_ID) {
      error("single-entity", page.route, `LocalBusiness @id is "${node["@id"]}", expected ${BUSINESS_ID}.`);
    }
  }
  for (const node of organizations) {
    error(
      "single-entity",
      page.route,
      `Second business entity: an Organization node at "${node["@id"] ?? "(no @id)"}". ` +
        "One entity only — LocalBusiness at /#business."
    );
  }

  // Every internal @id reference must resolve to a node defined on the same page, or it is a
  // dangling pointer — the failure mode that retired /#organization.
  const defined = new Set(page.graph.map((node) => node["@id"]).filter(Boolean));
  for (const node of walkNodes(page.graph)) {
    const keys = Object.keys(node);
    const ref = node["@id"];
    if (keys.length === 1 && typeof ref === "string" && ref.startsWith(SITE) && !defined.has(ref)) {
      error("dangling-reference", page.route, `@id reference "${ref}" resolves to no node on this page.`);
    }

    for (const forbidden of ["aggregateRating", "ratingValue", "reviewCount", "ratingCount"]) {
      if (forbidden in node) {
        error("no-aggregate-rating", page.route, `Forbidden schema property "${forbidden}".`);
      }
    }
    if ("priceRange" in node) {
      error("no-price-range", page.route, 'Forbidden schema property "priceRange".');
    }
    if (typesOf(node).includes("Review") || "review" in node) {
      error("no-reviews", page.route, "Review markup is present and no verified reviews exist.");
    }
    if (typesOf(node).includes("PostalAddress")) {
      for (const key of ["streetAddress", "postalCode", "addressLocality", "postOfficeBoxNumber"]) {
        if (node[key]) {
          error(
            "no-address",
            page.route,
            `PostalAddress carries "${key}": ${JSON.stringify(node[key])}. ` +
              "Service-area business — region and country only."
          );
        }
      }
    }
    if (typesOf(node).some((type) => type === "LocalBusiness" || type === "Organization")) {
      if (node.address) {
        error("no-address", page.route, "Business entity carries an address. Service-area business.");
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------
// GUARD 5/6/8 — required schema on the city routes.
// ---------------------------------------------------------------------------------------------
for (const page of cityPages) {
  const self = new URL(page.path, SITE).href;

  // The one entity must actually be present here — these pages reference it as `Service.provider`
  // and as the WebPage's `about`, and a reference to a node no page defines is the dangling-@id
  // failure that retired /#organization.
  const business = nodesOfType(page.graph, "LocalBusiness");
  if (business.length !== 1) {
    quality(page, "single-entity", `Expected exactly one LocalBusiness node, found ${business.length}.`);
  }

  const breadcrumbs = nodesOfType(page.graph, "BreadcrumbList");
  if (breadcrumbs.length !== 1) {
    quality(page, "breadcrumb-schema", `Expected one BreadcrumbList, found ${breadcrumbs.length}.`);
  }
  for (const crumb of breadcrumbs) {
    const items = crumb.itemListElement ?? [];
    const expectedDepth = page.kind === "hub" ? 3 : 4;
    if (items.length !== expectedDepth) {
      quality(
        page,
        "breadcrumb-schema",
        `BreadcrumbList has ${items.length} items, expected ${expectedDepth}.`
      );
    }
    items.forEach((item, index) => {
      if (item.position !== index + 1) {
        quality(page, "breadcrumb-schema", `ListItem ${index + 1} has position ${item.position}.`);
      }
      // Every crumb but the last must be a URL that was actually built — a breadcrumb into a
      // 404 is worse than no breadcrumb.
      const isLast = index === items.length - 1;
      const target = typeof item.item === "string" ? item.item : item.item?.["@id"];
      if (!target) {
        quality(page, "breadcrumb-schema", `ListItem ${index + 1} ("${item.name}") has no item URL.`);
        return;
      }
      if (isLast && target !== self) {
        quality(page, "breadcrumb-schema", `Final crumb points at ${target}, not this page (${self}).`);
      }
      const targetRoute = target.startsWith(SITE) ? target.slice(SITE.length) || "/" : null;
      if (targetRoute && !byRoute.has(targetRoute)) {
        quality(page, "breadcrumb-schema", `Crumb ${index + 1} points at unbuilt route ${targetRoute}.`);
      }
    });
  }

  if (page.kind === "service") {
    const services = nodesOfType(page.graph, "Service");
    if (services.length !== 1) {
      quality(page, "service-schema", `Expected one Service node, found ${services.length}.`);
    }
    for (const node of services) {
      if (node.url !== self) {
        quality(page, "service-schema", `Service.url is "${node.url}", expected ${self}.`);
      }
      const providerId = node.provider?.["@id"];
      if (providerId !== BUSINESS_ID) {
        quality(
          page,
          "service-schema",
          `Service.provider must reference the one business entity ${BUSINESS_ID}; found "${providerId}".`
        );
      }
      if (!node.serviceType) {
        quality(page, "service-schema", "Service node has no serviceType.");
      }
      const areaName = node.areaServed?.name;
      if (areaName !== page.cityDisplay) {
        quality(
          page,
          "service-schema",
          `Service.areaServed is "${areaName}", expected "${page.cityDisplay}".`
        );
      }
    }
    if (nodesOfType(page.graph, "CollectionPage").length > 0) {
      quality(page, "collection-schema", "CollectionPage belongs on the city hub, not a service page.");
    }
  }

  if (page.kind === "hub") {
    // GUARD 8 — CollectionPage is appropriate here and only here: the hub's job is to collect
    // that city's service pages. The service×city pages are single-subject and take Service.
    const collections = nodesOfType(page.graph, "CollectionPage");
    if (collections.length !== 1) {
      quality(page, "collection-schema", `Expected one CollectionPage, found ${collections.length}.`);
    }
    for (const node of collections) {
      if (node.url !== self) {
        quality(page, "collection-schema", `CollectionPage.url is "${node.url}", expected ${self}.`);
      }
      if (node.about?.name !== page.cityDisplay) {
        quality(
          page,
          "collection-schema",
          `CollectionPage.about is "${node.about?.name}", expected "".`
        );
      }
    }
    if (nodesOfType(page.graph, "Service").length > 0) {
      quality(page, "service-schema", "Service schema belongs on a service×city page, not the hub.");
    }
  }
}

// ---------------------------------------------------------------------------------------------
// GUARD 7 — FAQPage matches the rendered FAQ exactly, in BOTH directions.
//
// Schema-only Q&A is a structured-data policy violation; rendered Q&A missing from the schema is
// the same defect pointed the other way and means the two were authored separately, which is the
// condition the shared array exists to prevent.
// ---------------------------------------------------------------------------------------------
for (const page of cityPages) {
  const faqNodes = nodesOfType(page.graph, "FAQPage");
  const renderedFaq = [...page.main.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map(
    (match) => {
      const block = match[1];
      const summary = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
      return {
        question: summary ? stripTags(summary[1]) : "",
        answer: stripTags(block.replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/i, " "))
      };
    }
  );

  if (page.kind === "hub") {
    if (faqNodes.length > 0 && renderedFaq.length === 0) {
      quality(page, "faq-schema", "FAQPage schema present but the page renders no FAQ.");
    }
    continue;
  }

  if (faqNodes.length !== 1) {
    quality(page, "faq-schema", `Expected one FAQPage node, found ${faqNodes.length}.`);
    continue;
  }

  const questions = (faqNodes[0].mainEntity ?? []).map((node) => ({
    question: normalize(String(node.name ?? "")),
    answer: normalize(String(node.acceptedAnswer?.text ?? ""))
  }));

  if (questions.length !== renderedFaq.length) {
    quality(
      page,
      "faq-schema",
      `FAQPage marks up ${questions.length} question(s); the page renders ${renderedFaq.length}.`
    );
  }

  for (const item of questions) {
    if (!page.mainText.includes(item.question)) {
      quality(page, "faq-schema", `Schema question does not appear in the rendered body: "${item.question}"`);
    }
    if (!page.mainText.includes(item.answer)) {
      quality(
        page,
        "faq-schema",
        `Schema answer does not appear verbatim in the rendered body: "${item.answer.slice(0, 90)}…"`
      );
    }
  }
  for (const item of renderedFaq) {
    if (!questions.some((entry) => entry.question === item.question)) {
      quality(page, "faq-schema", `Rendered question is absent from FAQPage schema: "${item.question}"`);
    }
  }
}

// ---------------------------------------------------------------------------------------------
// COPY GUARDS. Compliance class — hard error on any built page.
//
// Each pattern is matched against <main> text only (see mainRegion above) and reported with the
// surrounding sentence, so a maintainer can tell a real violation from a near-miss without
// hunting for it.
// ---------------------------------------------------------------------------------------------
const context = (text, index, span = 90) =>
  `…${text.slice(Math.max(0, index - span), index + span).trim()}…`;

/** Is the match inside an explicit negation? "Aseptaclean does not transport" is the policy. */
const NEGATORS = /\b(?:not|never|no|cannot|doesn't|don't|isn't|aren't|without|rather than)\b/i;
const negated = (text, index) => NEGATORS.test(text.slice(Math.max(0, index - 45), index));

// MANDATED NEGATION CLAUSES — masked out before the copy guards run.
//
// docs/21 §2.2 is explicit that the banned words have exactly one legitimate use, inside a
// disclaimer that narrows scope, and that "any automated grep gate must whitelist the mandated
// negation clauses rather than fail them". Every one of these six pages renders the scope
// disclaimer inside its Stop/notify/refer panel, and that sentence names "licensed general
// contractor" and "remediation contractor" precisely in order to disclaim both.
//
// Masking is exact-match and preserves length, so reported match offsets stay accurate and a
// PARAPHRASE of a mandated clause is not whitelisted — only the clause as written. That is the
// intended strictness: the clauses are verbatim requirements, and a page that reworded one has a
// real problem the guard should surface.
const NEGATION_CLAUSES = [
  normalize(data.legal.scopeDisclaimer),
  // THE ONE PERMITTED PRICE FIGURE. docs/27 §7, owner-approved verbatim: photo review is free,
  // and the on-site assessment is $195. It is the only dollar amount that may appear in customer
  // copy anywhere on this site, so the approved paragraph is masked rather than flagged. Built
  // from `site.offer.assessmentFraming(assessmentFee)` — the same function the pages call — so
  // the mask tracks the figure if the owner ever changes it, and so a DIFFERENT $195 sentence,
  // written at a call site instead of taken from the approved copy, still fails. No city page
  // renders this today; the entry exists so that adding the fee block to one is not a build
  // failure against a paragraph the owner already approved.
  normalize(data.site.offer.assessmentFraming(data.site.offer.assessmentFee)),
  // docs/21 §2.3 and §2.4, verbatim and mandatory. Neither currently renders on a city route;
  // both are listed so that adding the animal/organic block or the founder bio to one of these
  // pages later does not turn a required sentence into a build failure.
  "Cleaning only - not a decontamination, sterilization, or health-safety determination.",
  "This background reflects controlled-process discipline. It does not grant contractor, " +
    "remediation, medical, environmental, or regulatory authority."
].map((clause) => normalize(clause));

const maskNegations = (text) => {
  let masked = text;
  for (const clause of NEGATION_CLAUSES) {
    if (!clause) continue;
    let at = masked.indexOf(clause);
    while (at !== -1) {
      masked = masked.slice(0, at) + " ".repeat(clause.length) + masked.slice(at + clause.length);
      at = masked.indexOf(clause, at + clause.length);
    }
  }
  return masked;
};

const scan = (page, pattern, guard, message, { allowNegated = false } = {}) => {
  for (const match of page.guardText.matchAll(pattern)) {
    if (allowNegated && negated(page.guardText, match.index)) continue;
    error(guard, page.route, `${message} — matched "${match[0]}" at ${context(page.guardText, match.index)}`);
  }
};

// --- Fake experience claims (D3 #1). The business has no publishable project history; every
// --- construction below asserts one. AGENTS.md §0.3.
const EXPERIENCE_PATTERNS = [
  /\bwe['’]ve\b/gi,
  /\bwe have\b/gi,
  /\bour crews?\b/gi,
  /\bin our experience\b/gi,
  /\bwe regularly\b/gi,
  /\bmost of our\b/gi,
  /\byears of\b/gi,
  /\bhundreds of\b/gi,
  /\bthousands of\b/gi,
  /\bclients often\b/gi,
  /\bfamilies usually\b/gi,
  /\bwe (?:often|frequently|commonly|typically|usually) (?:see|find|encounter|work|handle)\b/gi,
  /\b(?:completed|handled|cleared) (?:over|more than) \d/gi
];

// --- Hauling / self-transport (docs/21 §4.1, §4.3). Nothing leaves a job site in an Aseptaclean
// --- vehicle, so no sentence may read as though one does. Negations are permitted: the
// --- container-coordination policy sentence on all six service pages says, in as many words,
// --- that Aseptaclean does not transport customer debris off-site.
const HAULING_PATTERNS = [
  /\bwe (?:haul|transport|dispose of|cart|truck)\b/gi,
  /\bAseptaclean (?:hauls|transports|disposes of|removes debris from)\b/gi,
  /\bour (?:trucks?|vans?|vehicles?|dumpsters?|debris boxes?|roll-?offs?)\b/gi,
  /\bwe(?:['’]ll)? (?:take|haul|carry) it away\b/gi,
  /\bwe handle (?:the )?disposal\b/gi,
  /\bhauled away by (?:us|Aseptaclean)\b/gi,
  /\bjunk removal\b/gi,
  /\bwe provide (?:the )?(?:dumpster|debris box|container)\b/gi
];

// --- Remediation / biohazard and the rest of docs/21 §2.2. On these pages the words have no
// --- lawful use at all: the mandated negation clauses live in the footer and in the service
// --- pages' own disclaimer blocks, both outside <main> or outside this route set.
const CLAIMS_PATTERNS = [
  /\bremediat\w*/gi,
  /\bdecontaminat\w*/gi,
  /\bsteriliz\w*/gi,
  /\bsanitiz\w*/gi,
  /\bdisinfect\w*/gi,
  /\bbiohazard\w*/gi,
  /\bhabitab\w*/gi,
  /\bclearance\b/gi,
  /\bguarantee\w*/gi,
  /\blicensed\b/gi,
  /\bcertified\b/gi,
  /\bmedical-grade\b/gi,
  /\bhospital-grade\b/gi,
  /\bpharmaceutical-grade\b/gi,
  /\bhoarder\b/gi,
  /\bgross filth\b/gi,
  /\bfree assessment\b/gi,
  /\bmold\b/gi,
  /\basbestos\b/gi,
  /\bsewage\b/gi
];

// --- Public prices and permit-fee amounts (D3 #3).
//
// THE RESTRICTION IS CURRENCY, NOT NUMBERS. These pages are useful precisely because they carry
// verified operational figures, and every one of them must survive this guard untouched:
//   "30-day processing period" · "36 feet curb-to-curb" · "more than 72 hours" ·
//   "8:00 a.m. to 5:00 p.m." · "8 to 40 cubic yards" · "six feet from driveways" ·
//   "fifteen feet from hydrants" · "ten working days" · "within one business day"
// So the patterns key on a currency symbol, a currency word, or a fee named with an amount —
// never on a bare quantity. The self-test below this block asserts exactly that, and will fail
// the run if someone later tightens these into a general number-detector.
const PRICE_PATTERNS = [
  /\$\s?\d[\d,]*(?:\.\d{2})?/g,
  /\b\d[\d,]*(?:\.\d{2})?\s*(?:dollars|USD)\b/gi,
  /\b(?:fee|cost|price|rate|deposit|charge)s?\s+(?:of|is|are|starts? at|from)\s+\$?\s?\d/gi,
  /\bstarting at\s+\$?\s?\d/gi,
  /\bper (?:hour|job|room|yard|load)\s*[:\-]?\s*\$?\s?\d/gi
];

const PRICE_MUST_PASS = [
  "Mountain View publishes a 30-day processing period for a permit to place a box in the public street.",
  "is not permitted on streets narrower than 36 feet curb-to-curb",
  "A vehicle left in one street location for more than 72 hours violates the municipal code.",
  "runs 8:00 a.m. to 5:00 p.m. seven days a week",
  "Containers are available in sizes from 8 to 40 cubic yards.",
  "at least six feet from driveways and fifteen feet from hydrants and crosswalks",
  "allow a minimum of ten working days for review and issuance",
  "Assessment requests are reviewed within one business day.",
  "vehicles to be moved by 6:00 a.m. on sweep day",
  "first and third, or second and fourth, Tuesday, Wednesday, or Thursday"
];
const PRICE_MUST_FAIL = [
  "Estate cleanouts start at $1,800.",
  "The encroachment permit fee is 245 dollars.",
  "Permit fee: $312.50",
  "Rates from $95 per hour."
];

for (const sample of PRICE_MUST_PASS) {
  const hit = PRICE_PATTERNS.find((pattern) => new RegExp(pattern.source, pattern.flags).test(sample));
  if (hit) {
    error(
      "guard-self-test",
      "scripts/city-seo-guards.mjs",
      `The price guard rejects a permitted operational number: "${sample}" matched ${hit}. ` +
        "Operational figures — permit review time, clearance distances, parking limits, street " +
        "widths, facility hours, container sizes — are explicitly allowed."
    );
  }
}
for (const sample of PRICE_MUST_FAIL) {
  const caught = PRICE_PATTERNS.some((pattern) =>
    new RegExp(pattern.source, pattern.flags).test(sample)
  );
  if (!caught) {
    error(
      "guard-self-test",
      "scripts/city-seo-guards.mjs",
      `The price guard no longer catches a public price: "${sample}".`
    );
  }
}

for (const page of cityPages) {
  page.guardText = maskNegations(page.mainText);
  for (const pattern of EXPERIENCE_PATTERNS) {
    scan(page, pattern, "fake-experience-claim", "Asserts operating history this business cannot evidence");
  }
  for (const pattern of HAULING_PATTERNS) {
    scan(page, pattern, "hauling-claim", "Reads as self-performed transport or disposal (docs/21 §4.3)", {
      allowNegated: true
    });
  }
  for (const pattern of CLAIMS_PATTERNS) {
    scan(page, pattern, "regulated-claim", "Regulated-service claim (docs/21 §2.1, §2.2)");
  }
  for (const pattern of PRICE_PATTERNS) {
    scan(page, pattern, "public-price", "Public project price or permit-fee amount in customer copy");
  }
}

// The container-coordination policy is the sentence that keeps every debris-box reference on
// these pages inside docs/21 §4.3. If a page discusses containers without it, the boundary is
// left to be inferred.
const CONTAINER_TOPIC = /\b(?:debris box|dumpster|container|roll-?off)\b/i;
const policyText = normalize(data.containerCoordinationPolicy);
for (const page of cityPages) {
  if (page.kind !== "service") continue;
  if (!CONTAINER_TOPIC.test(page.mainText)) continue;
  if (!page.mainText.includes(policyText)) {
    error(
      "hauling-claim",
      page.route,
      "Page discusses containers but does not render the container-coordination policy verbatim."
    );
  }
}

// ---------------------------------------------------------------------------------------------
// DATA GUARDS — applicability, freshness, fact/implication integrity.
// ---------------------------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const factById = new Map(data.cityFacts.map((fact) => [fact.id, fact]));

for (const page of cityPages) {
  const cityFactsAll = data.cityFacts.filter((fact) => fact.city === page.citySlug);
  const permitted =
    page.kind === "service"
      ? data.getCityFactsForService(page.citySlug, page.record.service)
      : cityFactsAll;
  const permittedIds = new Set(permitted.map((fact) => fact.id));

  for (const fact of cityFactsAll) {
    const rendered = page.mainText.includes(normalize(fact.claim));

    // GUARD — city facts used on the wrong service. A fact whose `appliesTo` excludes this
    // service must not be on the page at all: that is the exact failure the field exists to
    // prevent (a construction-and-demolition rule rendered as background on a household
    // hoarding page). Compliance class — a misapplied regulatory claim is a false statement
    // about the law to a reader, and noindex does not make it true.
    if (rendered && !permittedIds.has(fact.id)) {
      error(
        "fact-applicability",
        page.route,
        `Fact "${fact.id}" is scoped to [${(fact.appliesTo ?? []).join(", ")}] and must not render ` +
          `on a ${page.record.service} page.`
      );
    }

    if (!rendered && permittedIds.has(fact.id)) {
      quality(
        page,
        "fact-coverage",
        `Fact "${fact.id}" applies to this page but its claim is not in the rendered body. ` +
          "The fact list and the data have drifted."
      );
    }

    if (!rendered) continue;

    // GUARD — every rendered fact must be attributed on the page. A regulatory claim without its
    // published source is indistinguishable from an assertion.
    if (!page.html.includes(fact.sourceUrl)) {
      error(
        "fact-attribution",
        page.route,
        `Fact "${fact.id}" renders without its source link (${fact.sourceUrl}).`
      );
    }
    if (!fact.verifiedAt) {
      quality(page, "fact-freshness", `Fact "${fact.id}" has no verifiedAt date.`);
    }

    // GUARD — stale facts. Past reviewAfter the claim is unverified, so it blocks indexation
    // until someone rechecks it against the source. On a page that is ALREADY indexed this is an
    // error: the site is publishing an unverified regulatory claim to the open web.
    if (fact.reviewAfter && fact.reviewAfter <= today) {
      quality(
        page,
        "fact-freshness",
        `Fact "${fact.id}" passed reviewAfter ${fact.reviewAfter} (today ${today}). ` +
          `Reverify against ${fact.sourceName} and update verifiedAt/reviewAfter, or withdraw it.`
      );
    }
  }
}

// Implication integrity is a property of the data, not of one page, so it is checked once.
for (const implication of data.serviceCityImplications) {
  // Reported against the route the implication renders on, so a data defect groups with that
  // page's other findings instead of under a bare "city/service" label nobody can click.
  const where = `/service-areas/${implication.city}/${implication.service}/`;
  if (implication.basis === "city-fact" && implication.factIds.length === 0) {
    error("implication-basis", where, `Implication "${implication.id}" claims a city-fact basis but names no factIds.`);
  }
  if (implication.basis === "operating-model" && implication.factIds.length > 0) {
    error(
      "implication-basis",
      where,
      `Implication "${implication.id}" is operating-model but names factIds; one basis or the other.`
    );
  }
  for (const id of implication.factIds) {
    const fact = factById.get(id);
    if (!fact) {
      error("implication-basis", where, `Implication "${implication.id}" references unknown fact "${id}".`);
      continue;
    }
    if (fact.city !== implication.city) {
      error(
        "implication-basis",
        where,
        `Implication "${implication.id}" cites "${id}", a ${fact.city} fact, on a ${implication.city} page.`
      );
    }
    if (fact.appliesTo && !fact.appliesTo.includes(implication.service)) {
      error(
        "fact-applicability",
        where,
        `Implication "${implication.id}" cites "${id}", which does not apply to ${implication.service}.`
      );
    }
  }
}

// ---------------------------------------------------------------------------------------------
// LINK GUARD — required links out, at least one contextual link in.
// ---------------------------------------------------------------------------------------------
const inbound = new Map();
for (const page of pages) {
  for (const href of page.hrefs) {
    if (!href.startsWith("/")) continue;
    const target = href.split("#")[0].split("?")[0];
    if (!inbound.has(target)) inbound.set(target, new Set());
    inbound.get(target).add(page.route);
  }
}

for (const page of cityPages) {
  const outbound = new Set(page.hrefs.map((href) => href.split("#")[0].split("?")[0]));
  const required = [["/service-areas/", "the service-areas directory"]];

  if (page.kind === "service") {
    const definition = data.serviceDefinitions[page.record.service];
    const hub = data.cityHubPages.find((entry) => entry.slug === page.citySlug);
    required.push([definition.parentHref, "the parent San Jose service page"]);
    if (hub && data.isBuilt(hub.publishStatus)) required.push([hub.path, "the city hub"]);
    const sibling = data.serviceCityPages.find(
      (entry) =>
        entry.city === page.citySlug &&
        entry.service !== page.record.service &&
        data.isBuilt(entry.publishStatus)
    );
    if (sibling) required.push([sibling.path, "the sibling service in this city"]);
  } else {
    for (const child of data.serviceCityPages.filter(
      (entry) => entry.city === page.citySlug && data.isBuilt(entry.publishStatus)
    )) {
      required.push([child.path, `the ${child.service} page for this city`]);
    }
  }

  for (const [href, label] of required) {
    if (!outbound.has(href)) {
      quality(page, "internal-links", `Missing required link to ${label} (${href}).`);
    }
  }

  // No link may point at a route that was not built — the orphan/404 failure this repo has hit
  // before. Checked for every internal link on the page, not only the required ones.
  for (const href of outbound) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (/\.(?:xml|txt|pdf|png|jpe?g|svg|webp|ico|json)$/i.test(href)) continue;
    if (href.startsWith("/api/")) continue;
    if (!byRoute.has(href)) {
      error("internal-links", page.route, `Links to ${href}, which was not built.`);
    }
  }

  // D4's `inboundLinkCount >= 1`. The source must itself be reachable — a page linked only from
  // another gated draft has no crawl path — so drafts and the page itself do not count.
  const sources = [...(inbound.get(page.path) ?? [])].filter((route) => route !== page.route);
  const indexableSources = sources.filter((route) => byRoute.get(route)?.indexable);
  if (sources.length === 0) {
    quality(page, "internal-links", "Orphan: no page on the site links to this route.");
  } else if (indexableSources.length === 0) {
    quality(
      page,
      "internal-links",
      `Reachable only from noindex pages (${sources.join(", ")}). D4 requires at least one ` +
        "contextual inbound link from an indexable page before this route can be published."
    );
  }
}

// ---------------------------------------------------------------------------------------------
// SITEMAP — published-index pages, and nothing else.
// ---------------------------------------------------------------------------------------------
const sitemapPath = resolve(dist, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  error("sitemap", "/sitemap.xml", "sitemap.xml was not built.");
} else {
  const xml = await readFile(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeEntities(match[1]));
  const listed = new Set(
    locs.map((loc) => (loc.startsWith(SITE) ? loc.slice(SITE.length) || "/" : loc))
  );

  if (locs.length !== listed.size) {
    error("sitemap", "/sitemap.xml", `Contains duplicate <loc> entries (${locs.length} entries, ${listed.size} unique).`);
  }

  for (const route of listed) {
    const page = byRoute.get(route);
    if (!page) {
      error("sitemap", "/sitemap.xml", `Lists ${route}, which was not built.`);
      continue;
    }
    if (!page.indexable) {
      error(
        "sitemap",
        "/sitemap.xml",
        `Lists ${route}, which renders "${page.robots}". A noindex page in the sitemap is a ` +
          "Search Console error and a crawl-budget waste."
      );
    }
  }

  // The other direction, for the nine city routes: published-index must be present, and the two
  // lower rungs must be absent.
  for (const entry of cityRecords) {
    const status = entry.record.publishStatus;
    const present = listed.has(entry.path);
    if (data.isInSitemap(status) && !present) {
      error("sitemap", entry.path, `publishStatus is "${status}" but the route is absent from sitemap.xml.`);
    }
    if (!data.isInSitemap(status) && present) {
      error("sitemap", entry.path, `publishStatus is "${status}" but the route is listed in sitemap.xml.`);
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------------------------
const errors = findings.filter((finding) => finding.severity === "error");
const blockers = findings.filter((finding) => finding.severity === "blocker");

if (asJson) {
  console.log(
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        pagesScanned: pages.length,
        cityRoutes: cityPages.map((page) => ({
          route: page.route,
          publishStatus: page.record.publishStatus,
          robots: page.robots
        })),
        errors,
        blockers
      },
      null,
      2
    )
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

const groupOf = (list) => {
  const grouped = new Map();
  for (const finding of list) {
    if (!grouped.has(finding.route)) grouped.set(finding.route, []);
    grouped.get(finding.route).push(finding);
  }
  return grouped;
};

console.log(`\nCity SEO / indexation guards — ${pages.length} built pages scanned\n`);
console.log("Publication states");
for (const page of cityPages) {
  console.log(`  ${page.record.publishStatus.padEnd(16)} ${page.route.padEnd(48)} ${page.robots}`);
}
const drafts = cityRecords.filter((entry) => entry.record.publishStatus === "draft");
for (const entry of drafts) {
  console.log(`  ${"draft".padEnd(16)} ${entry.path.padEnd(48)} (not built)`);
}

// Printed every run, so an exemption is a visible standing decision rather than a silent hole.
console.log("\nExempt from the sitewide identity guards");
for (const [route, why] of EXEMPT) {
  console.log(`  ${route}\n    ${why.replace(/(.{86}\s)/g, "$1\n    ")}`);
}

if (errors.length > 0) {
  console.log(`\nERRORS — ${errors.length}\n`);
  for (const [route, list] of groupOf(errors)) {
    console.log(`  ${route}`);
    for (const finding of list) console.log(`    [${finding.guard}] ${finding.detail}`);
  }
}

if (blockers.length > 0) {
  console.log(`\nPUBLISH BLOCKERS — ${blockers.length} (page stays noindex until these clear)\n`);
  for (const [route, list] of groupOf(blockers)) {
    console.log(`  ${route}`);
    for (const finding of list) console.log(`    [${finding.guard}] ${finding.detail}`);
  }
}

const clean = cityPages.filter(
  (page) => !blockers.some((finding) => finding.route === page.route) &&
    !errors.some((finding) => finding.route === page.route)
);
console.log(
  `\n${clean.length}/${cityPages.length} city routes pass every guard and are eligible for ` +
    "published-index once the owner confirms city availability.\n"
);

if (errors.length > 0) {
  console.error(`FAILED — ${errors.length} error(s).\n`);
  process.exit(1);
}
console.log(`PASSED — 0 errors, ${blockers.length} publish blocker(s).\n`);
