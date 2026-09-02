# Current Site Map

Audited 2026-08-21 from a fresh `npm run build:local` output. Code and emitted files are implementation truth. Astro initially reports 48 HTML pages, then `scripts/prune-dev-routes.mjs` removes both `/dev/*` pages and their orphaned bundles. The deployable result is **46 HTML pages: 45 ordinary routes plus `/404`**. It also contains `robots.txt`, `sitemap.xml`, redirects, and the separate Cloudflare Pages Function at `/api/lead`.

> **Re-audited later on 2026-08-21, after the city build.** The earlier pass on this date recorded 37 pages and stated that no service × city architecture existed. That was true of the build it read and is false of the current one: nine `/service-areas/[city]/…` routes now exist. All nine are `noindex`, so the indexable set and `sitemap.xml` are unchanged at 23. Every count below is from the later build.

## URL tree

```text
/
├── about/
├── contact/
├── faq/
├── handoff-standard/
├── services/
├── who-we-help/
├── service-areas/                             area hub
│   ├── mountain-view/                        city hub [noindex]
│   │   ├── hoarding-cleanup/                 service × city [noindex]
│   │   └── estate-cleanout/                  service × city [noindex]
│   ├── sunnyvale/                            city hub [noindex]
│   │   ├── hoarding-cleanup/                 [noindex]
│   │   └── estate-cleanout/                  [noindex]
│   └── campbell/                             city hub [noindex]
│       ├── hoarding-cleanup/                 [noindex]
│       └── estate-cleanout/                  [noindex]
├── detailed-cleaning/                         service hub
│   ├── /deep-cleaning-san-jose/              top-level service route
│   ├── /move-out-cleaning-san-jose/
│   ├── /post-construction-cleaning-san-jose/ [noindex]
│   └── /window-cleaning-san-jose/            [noindex]
├── specialty-cleaning/                       service hub [noindex]
│   ├── /extreme-cleaning-san-jose/
│   ├── /animal-waste-cleanup-san-jose/       [noindex]
│   ├── /rodent-dropping-cleanup-san-jose/    [noindex]
│   └── /pigeon-dropping-cleanup-san-jose/    [noindex]
├── property-clearing/                        service hub
│   ├── /property-cleanouts-san-jose/
│   ├── /hoarding-cleanup-san-jose/
│   ├── /estate-cleanout-san-jose/
│   ├── /debris-removal-san-jose/
│   └── /eviction-cleanout-san-jose/          [noindex]
├── commercial-cleaning-san-jose/             [noindex]
├── senior-downsizing-san-jose/               [noindex]
├── estate-cleanout-checklist/                resource
├── private-residence-reset/                  campaign page
├── request-assessment/
├── thank-you/                                [noindex]
├── projects/                                 [noindex]
├── data-request/                             [noindex]
├── privacy/
├── terms/
├── cookie-policy/
├── sms-notification-consent/                 standalone carrier-review page
└── 404                                      [noindex]

Non-HTML public endpoints:

```text
/robots.txt                  src/pages/robots.txt.ts
/sitemap.xml                 src/pages/sitemap.xml.ts
/api/lead                    functions/api/lead.ts (Cloudflare Pages Function)
```

## Page-type inventory

| Type | Routes | Count |
| --- | --- | ---: |
| Homepage | `/` | 1 |
| Service index/hubs | `/services/`, `/detailed-cleaning/`, `/specialty-cleaning/`, `/property-clearing/` | 4 |
| Individual service pages | Fourteen city-suffixed service routes plus `/senior-downsizing-san-jose/` | 15 |
| Company/audience/process | `/about/`, `/who-we-help/`, `/handoff-standard/`, `/faq/`, `/contact/`, `/projects/` | 6 |
| Service-area hub | `/service-areas/` | 1 |
| City hubs | `/service-areas/[city]/` — Mountain View, Sunnyvale, Campbell | 3 |
| Service × city pages | `/service-areas/[city]/[service]/` — hoarding-cleanup, estate-cleanout, in each of the three cities | 6 |
| Resource/campaign | `/estate-cleanout-checklist/`, `/private-residence-reset/` | 2 |
| Conversion/utility | `/request-assessment/`, `/thank-you/`, `/data-request/`, `/404` | 4 |
| Legal/consent | `/privacy/`, `/terms/`, `/cookie-policy/`, `/sms-notification-consent/` | 4 |
| **Total HTML** |  | **46** |

## Template relationships

```text
BaseLayout.astro
├── StatusRibbon
├── Header / desktop mega nav / mobile drawer
├── SeoHead
├── page content
├── Footer
├── MobileCTA (unless disabled)
└── Analytics

ServicePageLayout.astro
├── BaseLayout
├── shared compact service header and breadcrumbs
├── optional hidden launch-gate note
├── fit grid
├── CredentialBar
├── outcome + scope + price-variable sections
├── photo-slot/record overlay
├── boundaries
├── shared four-step start rail
├── FAQ + related links + optional resource
└── RequestForm

ServiceHub.astro
├── shared hub header
├── CredentialBar
├── service-card grid
├── shared four-step process
└── AccentBand
```

Fourteen route files are intentionally thin selectors for objects in `src/data/doc27ServicePages.ts`; `ServicePageLayout.astro` renders them. The senior-downsizing page is older and uses a separate component chain (`CompactHero`, `ServiceScope`, `ServiceMethodRail`, `ServiceProof`, `ServicePricing`, and `ServiceFAQ`). The three group hubs use `ServiceHub.astro`. Company and audience routes use `PageHeader.astro` but otherwise contain route-specific markup.

`/sms-notification-consent/` is a separate HTML document. It does not use `BaseLayout`, shared SEO, navigation, footer, tokens, or the self-hosted Inter font; it loads `public/sms-notification-consent/sms-consent.css` and Google-hosted Montserrat/Open Sans and is fenced from edits during carrier review.

## Index and sitemap state

### Indexable and listed in `sitemap.xml` (23)

`/`, `/about/`, `/contact/`, `/cookie-policy/`, `/deep-cleaning-san-jose/`, `/debris-removal-san-jose/`, `/detailed-cleaning/`, `/estate-cleanout-checklist/`, `/estate-cleanout-san-jose/`, `/extreme-cleaning-san-jose/`, `/faq/`, `/handoff-standard/`, `/hoarding-cleanup-san-jose/`, `/move-out-cleaning-san-jose/`, `/privacy/`, `/private-residence-reset/`, `/property-cleanouts-san-jose/`, `/property-clearing/`, `/request-assessment/`, `/service-areas/`, `/services/`, `/terms/`, `/who-we-help/`.

### Indexable and deliberately absent from `sitemap.xml` (1)

`/sms-notification-consent/`. It emits `robots=index,follow` with no canonical and remains isolated from the shared site.

### `noindex, follow` and absent from `sitemap.xml` (22)

`/404`, `/animal-waste-cleanup-san-jose/`, `/commercial-cleaning-san-jose/`, `/data-request/`, `/eviction-cleanout-san-jose/`, `/pigeon-dropping-cleanup-san-jose/`, `/post-construction-cleaning-san-jose/`, `/projects/`, `/rodent-dropping-cleanup-san-jose/`, `/senior-downsizing-san-jose/`, `/specialty-cleaning/`, `/thank-you/`, `/window-cleaning-san-jose/`.

Plus the nine city routes added 2026-08-21: `/service-areas/mountain-view/`, `/service-areas/sunnyvale/`, `/service-areas/campbell/`, and, under each of those three, `hoarding-cleanup/` and `estate-cleanout/`.

Publication state for the city routes is data, not markup: `publishStatus` on each record in `src/data/cityHubPages.ts` and `src/data/serviceCityPages.ts`, read through `src/data/publication.ts`. `draft` emits no route at all, `noindex` builds and stays out of `sitemap.xml`, `published-index` is the only state that ranks. All nine sit at `noindex`.

## Internal-link structure

The shared header and footer are the dominant crawl graph. They link the three service hubs; eleven detailed service pages; Commercial; Service Areas; About; Services; Who We Help; Handoff Standard; FAQ; Contact; Request Assessment; the estate checklist; Private Residence Reset; and legal routes. Every shared-layout page therefore exposes almost the same global destination set.

Content-level patterns:

- Homepage → five currently indexable buyer-situation doors → three service families → service pages → method, service area, founder, FAQ, form.
- Service hub → child service cards → four-step start rail → assessment.
- Shared service page → breadcrumb to family hub → related-service links → optional estate checklist → assessment.
- Company/audience pages → contextual service/method links → assessment.
- Service Areas → ten city names as text, service links, Senior Downsizing, and **down to the three built city hubs**. `/property-clearing/` also links to all three.
- City hub → its own two service × city pages (falling back to the parent service page if one is withdrawn) → up to `/service-areas/` → assessment.
- Service × city page → up to its parent San Jose service page → across to its sibling service **in the same city only** → back to its city hub → assessment. No city-to-city links exist in the build.
- `/hoarding-cleanup-san-jose/` and `/estate-cleanout-san-jose/` → "Also serving" blocks → their three city pages each. These links are derived from built records, so a city dropped to `draft` loses its link in the same change.
- Estate and hoarding pages → Executor's Checklist; checklist → estate page and assessment.
- Private Residence Reset → query-parameter assessment variant; it stays outside the main nav and has one footer crawl path.

Five `noindex` pages receive zero links from indexable routes: `/thank-you/`, `/projects/`, `/data-request/`, `/rodent-dropping-cleanup-san-jose/`, and `/pigeon-dropping-cleanup-san-jose/`. `/404` is excluded from that orphan test. Rodent and pigeon routes do receive links from other gated pages, but not from the indexable set. The other sixteen `noindex` routes receive at least one link from indexable pages — the original seven principally through the global navigation/footer, and all nine city routes through the contextual paths listed above.

No pagination exists. Breadcrumbs are hand-assembled per route/template; there is no generic router-aware breadcrumb generator.

## Service × city architecture

**Built 2026-08-21. Two tiers, nine routes, all `noindex, follow`.**

```text
/service-areas/[city]/              3 city hubs        src/pages/service-areas/[city]/index.astro
/service-areas/[city]/[service]/    6 service × city   src/pages/service-areas/[city]/[service].astro
```

Cities: `mountain-view`, `sunnyvale`, `campbell`. Services: `hoarding-cleanup`, `estate-cleanout`. The 3 × 2 grid is complete.

- Two dynamic route files, both using `getStaticPaths()` over data records filtered by `builtOnly()`. There is no `[...slug].astro` and no hand-authored city route file. **A new city or service is a data record, not a page.**
- `src/data/cityHubPages.ts` — the three hub records: slug, city, path, H1, SEO identity, intro prose, featured services, `publishStatus`. Exports `cityHubLinks` (built hubs only) for the pages that link down.
- `src/data/serviceCityPages.ts` — the six service × city records: SEO identity, shared opening, coordination policy, FAQs, `publishStatus`. Scope and fit are read from the parent San Jose service record rather than re-authored.
- `src/data/cityFacts.ts` — **verified facts only.** Each carries `sourceName`, `sourceUrl`, `sourceType`, `verifiedAt`, `reviewAfter`, and an optional `appliesTo` service guard. Rendered with the source link visible.
- `src/data/serviceCityImplications.ts` — what those facts change for a given service, kept in a separate file so an inference can never be mistaken for a published rule. Each declares `basis: "city-fact"` with resolving `factIds`, or `"operating-model"` with none.
- `src/data/publication.ts` — the three-rung ladder (`draft` / `noindex` / `published-index`) read by both generators, the sitemap, and the guard script.
- `site.location.cities` in `src/data/site.ts` still supplies ten city names to the service-area UI and `LocalBusiness.areaServed` schema. It is a separate list from the three cities that have pages, and the two are not required to match.
- `serviceAreasPage.clusters` and `serviceAreasHub` still supply shared region text.
- The service-area hub's city-link section renders from `cityHubLinks`. **The statement that `cityPages` is empty is obsolete** — it now holds the three built hubs.
- Individual `-san-jose` service URLs are unchanged: regional, template-driven, not generated from a city data model. San José deliberately has no city page; it is served by those routes.

`npm run qa:seo` (`scripts/city-seo-guards.mjs`) is the indexation gate. It runs against `dist/`, checks identity, schema, claims, fact freshness, and the link graph, and reports `9/9 city routes pass every guard`. Guard findings on a `noindex` page are recorded as publish blockers rather than build failures; a compliance finding is a hard error on any built page, gated or not.

**The completed-job prerequisite in `docs/19-SYSTEM-AND-SITEMAP.md` was superseded on 2026-08-21 by owner ruling.** These pages launched without prior job history in any of the three cities, on verified city facts and service-specific implications instead. Real completed projects remain a future proof-enhancement layer. The one gate still open on all nine routes is owner confirmation of city availability. See `docs/05-DECISIONS-LOG.md`, `AGENTS.md` §2.1, and doc 19 §2.2.

## Redirect layer

`public/_redirects` contains explicit Cloudflare Pages 301s for retired/WordPress paths. It intentionally has no wildcard catch-all. Important mappings include `/terms-and-conditions/ → /terms/`, `/process-documentation/ → /handoff-standard/`, `/locations/` and named legacy city slugs → `/service-areas/`, `/hoarding-cleanup/ → /hoarding-cleanup-san-jose/`, and `/property-cleanouts-for-managers/ → /property-cleanouts-san-jose/`. Some gated legacy intents still redirect to `/` rather than a `noindex` target.

**Open item on the legacy city slugs.** `/mountain-view/`, `/sunnyvale/`, and `/campbell/` still redirect to `/service-areas/`, which is correct **while** the matching city hubs are `noindex` — redirecting into a gated page would be worse. Repoint each at its own hub in the same change that flips that city to `published-index`. Do not repoint them early.

## Architecture source-of-truth map

| Concern | Actual implementation source |
| --- | --- |
| Route existence | `src/pages/` plus production pruning in `scripts/prune-dev-routes.mjs` |
| Shared page shell | `src/layouts/BaseLayout.astro` |
| Service-page template | `src/layouts/ServicePageLayout.astro` |
| Service-page records | `src/data/doc27ServicePages.ts` |
| Other page/hub records | `src/data/servicePages.ts`, `src/data/doc27CompanyPages.ts` |
| City hub / service × city records | `src/data/cityHubPages.ts`, `src/data/serviceCityPages.ts` |
| Verified city facts and their sources | `src/data/cityFacts.ts` |
| Operational implications drawn from those facts | `src/data/serviceCityImplications.ts` |
| Publication state (`draft` / `noindex` / `published-index`) | `src/data/publication.ts` |
| City-route indexation gate | `scripts/city-seo-guards.mjs` (`npm run qa:seo`), run against `dist/` |
| Global navigation and footer destinations | `megaNav` in `src/data/site.ts` |
| Sitemap inclusion | `src/pages/sitemap.xml.ts` |
| Index/noindex | each route's `BaseLayout`/`ServicePageLayout` props and `SeoHead.astro` |
| Redirects | `public/_redirects` |
| Planned future architecture | `docs/19-SYSTEM-AND-SITEMAP.md`, `docs/SITEMAP-MASTER.md` (not proof of build) |
