import type { APIRoute } from "astro";

import { launchIndexablePaths } from "@data/launchArchitecture";
import { site } from "@data/site";

// Owner-approved 2026-09-03 launch set. Retained historical, marketing, city, campaign, and
// utility routes are deliberately absent and receive noindex through BaseLayout. The protected
// SMS consent document remains outside this system and outside the sitemap.
//
// Reads launchIndexablePaths, not launchPrimaryPaths — the two used to be identical, but
// launchIndexablePaths now excludes /rodent-dropping-cleanup-san-jose/ (that page ships its own
// noindex={true}; see launchArchitecture.ts's comment on the exclusion). Sourcing from
// launchPrimaryPaths here would have put a noindex page's URL in the sitemap, which is exactly
// the "sitemap claims indexable, robots tag says noindex" contradiction the 2026-09-03 route
// audit found. See docs/05-DECISIONS-LOG.md.
const routes = [...launchIndexablePaths];

export const GET: APIRoute = () => {
  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, site.urls.site)}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
