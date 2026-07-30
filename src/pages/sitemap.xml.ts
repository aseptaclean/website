import type { APIRoute } from "astro";

import { site } from "@data/site";

const routes = ["/", "/request-assessment/", "/privacy/", "/terms/"];

export const GET: APIRoute = () => {
  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, site.urls.site)}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
