import type { APIRoute } from "astro";

import { site } from "@data/site";

// Phase 3/3b draft pages (estate, hoarding, animal, senior downsizing, checklist, service-areas
// hub, deep cleaning, property managers) are intentionally NOT listed here — they ship
// noindex={true} per docs/19-SYSTEM-AND-SITEMAP.md and this session's build directive, and stay
// out of the sitemap until each page's own launch gate clears. Do not add them back as a group;
// add each individually when its owner review / launch gate is cleared.
// /services/ and /who-we-help/ shipped noindex in Chunks 1/2 but no longer fall in that
// category as of Chunk 3 — they're now linked from primary nav and footer, so they're listed.
const routes = [
  "/",
  "/about/",
  "/contact/",
  "/handoff-standard/",
  "/privacy/",
  "/terms/",
  "/services/",
  "/who-we-help/"
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
