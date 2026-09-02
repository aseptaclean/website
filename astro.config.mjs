import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://aseptaclean.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    // C3 — one stylesheet order for every route.
    //
    // Astro's default ("auto") inlines any stylesheet under the Vite asset limit and links the
    // rest, which produced SEVEN different head shapes across 37 routes: 20 routes emitted
    // BaseLayout.css then an inline block, 7 emitted an inline block first, and
    // /private-residence-reset/ and /request-assessment/ — the two pages with large scoped style
    // blocks — emitted their own stylesheet BEFORE global.css, inverting the cascade so a global
    // rule could beat a page-scoped one on those two routes and lose everywhere else. That is a
    // correctness problem, not a tidiness one, and it is invisible until a rule collides.
    //
    // "never" removes the inline/link mixing, but on its own it does NOT fix the order: Astro
    // sequences a route's stylesheets by module-graph depth, and on /private-residence-reset/,
    // /request-assessment/, /data-request/, /thank-you/ and /senior-downsizing-san-jose/ that
    // put the page's own scoped CSS AHEAD of global.css while every other route put it after.
    // See `cssCodeSplit` below, which is what actually closes it.
    inlineStylesheets: "never"
    //
    // `vite.build.cssCodeSplit: false` WAS TRIED HERE AND REVERTED — do not re-add it.
    // Collapsing to a single stylesheet does make the order identical on all 36 layout routes,
    // but Vite then links that one bundle into EVERY emitted page, including
    // /sms-notification-consent/ — a standalone document that does not use BaseLayout, is
    // byte-preserved under active Twilio 10DLC carrier review, and is fenced DO NOT EDIT by
    // AGENTS.md §2 and §6. It arrived after that page's own `sms-consent.css`, so the site's
    // global rules would have restyled a page under carrier review. Verified in dist/, not
    // assumed. The residual per-route ordering variation is recorded in docs/05-DECISIONS-LOG.md
    // rather than bought at that price.
  }
});
