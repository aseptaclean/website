import type { APIRoute } from "astro";

import { site } from "@data/site";

// Every service page, category hub, /projects/, /faq/, /service-areas/, and the estate checklist
// is intentionally NOT listed here. All ship noindex={true} pending their own launch gate — see
// the `gate` field on each record in src/data/doc27ServicePages.ts. As of the 2026-08-16 doc 27
// copy migration that is 14 service pages, 3 category hubs, and the 5 company/areas routes.
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
  // Company / areas.
  "/service-areas/",
  "/projects/",
  "/faq/"
  // NOT listed, each for a specific reason:
  //   deep-cleaning (B10 gate) · post-construction, window, eviction, commercial,
  //   property-cleanouts (crew capacity gate) · animal, rodent, pigeon (doc 27 §21) ·
  //   senior-downsizing (carries an [OWNER INPUT] placeholder — fix the copy before indexing)
];
if (site.urls.cookiePolicy) routes.push(site.urls.cookiePolicy);

export const GET: APIRoute = () => {
  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, site.urls.site)}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
