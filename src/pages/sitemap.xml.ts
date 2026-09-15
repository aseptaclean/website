import type { APIRoute } from "astro";

import { launchIndexablePaths } from "@data/launchArchitecture";
import { site } from "@data/site";

// The shared indexable set includes the owner-approved public and assessment pages.
// Other legacy, city and utility routes remain excluded, including thank-you pages
// and the protected SMS consent document. See docs/05-CURRENT-DECISIONS.md (2026-09-15).
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
