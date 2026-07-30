import type { APIRoute } from "astro";

import { site } from "@data/site";

export const GET: APIRoute = () => {
  const body = site.deployment.isPublicProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site.urls.site)}\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
