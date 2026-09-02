import type { APIRoute } from "astro";

import { cityHubPages } from "@data/cityHubPages";
import { indexableOnly } from "@data/publication";
import { serviceCityPages } from "@data/serviceCityPages";
import { site } from "@data/site";

// Every service page, category hub, /projects/, /faq/, and /service-areas/ that is absent from
// this list is absent deliberately. Those ship noindex={true} pending their own launch gate —
// see the `gate` field on each record in src/data/doc27ServicePages.ts. As of the 2026-08-16
// doc 27 copy migration that is 14 service pages, 3 category hubs, and the 5 company/areas
// routes. The estate checklist was in that group until 2026-08-20; it is now listed below.
//
// The three specialty pages (animal / rodent / pigeon) are gated specifically on
// docs/27-COPY-CANONICAL.md §21's compliance-release inputs — licensing-boundary confirmation,
// insurance wording, disposal procedure, PPE limits, final claims review. docs/SITEMAP-MASTER.md
// lists them "index ✅ ungated" on a 2026-08-09 owner override, but the owner reconfirmed the
// gated path on 2026-08-16. Do not add them here on the strength of the master column alone.
//
// Do not add anything back as a group; add each route individually when its gate clears.
// /services/ and /who-we-help/ shipped noindex in Chunks 1/2 but no longer fall in that
// category as of Chunk 3 — they're now linked from primary nav and footer, so they're listed.
// Every route here MUST render index,follow — a noindex page in the sitemap is a crawl-budget
// waste and a Search Console error. Cross-check against the `indexable` field in
// src/data/doc27ServicePages.ts and the `noindex` prop on each .astro route before adding.
const routes = [
  "/",
  "/about/",
  "/contact/",
  "/request-assessment/",
  "/handoff-standard/",
  "/privacy/",
  "/terms/",
  "/services/",
  "/who-we-help/",
  // Category hubs (2026-08-17). /specialty-cleaning/ is deliberately ABSENT: its cards name
  // rodent and pigeon dropping cleanup, so indexing it advertises services still held behind
  // doc 27 §21's compliance release and B&P §8550(a). It stays noindex with its children.
  "/detailed-cleaning/",
  "/property-clearing/",
  // Ungated service pages — gate === null and no [OWNER INPUT] placeholder.
  "/estate-cleanout-san-jose/",
  "/hoarding-cleanup-san-jose/",
  "/move-out-cleaning-san-jose/",
  "/extreme-cleaning-san-jose/",
  "/debris-removal-san-jose/",
  // Added 2026-08-17 after an audit against docs/SITEMAP-MASTER.md found both had been held
  // back on gates the master does NOT impose (it lists each as a plain "index"). The gates were
  // inherited from the pre-migration code: deep-cleaning's B10 gate existed because the OLD page
  // carried unfinalized checklist placeholders, and property-cleanouts' crew gate belonged to the
  // retired PM-framed page. Doc 27 §12.1/§14.1 supply complete copy — both verified at 0
  // placeholders. property-cleanouts targets "property cleanout san jose", doc 19's primary
  // homepage query, so holding it back was the single most costly error of that pass.
  "/deep-cleaning-san-jose/",
  "/property-cleanouts-san-jose/",
  // Company / areas.
  "/service-areas/",
  "/faq/",
  // Resource asset. Added 2026-08-20 when the owner cleared its copy review — the only gate it
  // ever carried (docs/05-DECISIONS-LOG.md, P9 row 10). doc 19 §2.2 always specified it "fully
  // ungated"; it shipped noindex only pending that review. Added together with its noindex flip
  // and two contextual inbound links, so it never sits in this file as a noindex entry.
  "/estate-cleanout-checklist/",
  // Campaign page. Added 2026-08-20 (A2/L1). It ships `index, follow` with Service and
  // BreadcrumbList schema and 814 words of commercial copy, but was absent from this file AND
  // had zero inbound links — indexable, and reachable by nothing. Absence from the sitemap was
  // never a gate on this route: AGENTS.md §2 records it as "campaign page, out of nav", which is
  // a NAV decision, not an index decision. It stays out of megaNav; it is now linked once from
  // the footer utility row and listed here.
  "/private-residence-reset/"
  // NOT listed, each for a specific reason:
  //   post-construction, window, eviction, commercial (crew capacity gate, per master) ·
  //   animal, rodent, pigeon (doc 27 §21 compliance release) ·
  //   senior-downsizing (its own launch gate; still noindex) ·
  //   /projects/ (2026-08-18) — the gate is "publishes when real photos exist" and zero
  //     photographed jobs exist. Indexing an empty proof page is the "never invent" rule
  //     (AGENTS.md §0.3) failing in the other direction: an empty slot that ships is fine,
  //     an empty slot that ranks is not. Re-add the route AND drop its noindex together.
];
if (site.urls.cookiePolicy) routes.push(site.urls.cookiePolicy);

// CITY ROUTES ARE DERIVED, NOT LISTED. The nine records in src/data/cityHubPages.ts and
// src/data/serviceCityPages.ts each carry a `publishStatus`, and only `published-index` earns a
// `<loc>` — see src/data/publication.ts. Every route above this line is hand-listed, and that is
// exactly how a noindex page ends up in a sitemap: someone adds the entry in one change and
// flips the robots tag in another. These nine cannot drift that way, because one field decides
// both. As of 2026-08-21 all nine are `noindex`, so this adds nothing; that is the correct
// output, not a bug.
//
// scripts/city-seo-guards.mjs asserts the invariant against the BUILT sitemap in both
// directions — every `<loc>` renders `index, follow`, and every indexable city page appears.
routes.push(
  ...indexableOnly(cityHubPages).map((page) => page.path),
  ...indexableOnly(serviceCityPages).map((page) => page.path)
);

export const GET: APIRoute = () => {
  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, site.urls.site)}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
