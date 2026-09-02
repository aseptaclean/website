# Current Build Audit

Audit date: 2026-08-21. Basis: current dirty worktree, fresh `npm run build:local`, emitted `dist/`, rendered DOM checks, source inspection, and comparison with governing repository documents. No website implementation was changed.

> **Superseded in part, later on 2026-08-21.** This audit read the build **before** the nine `/service-areas/[city]/…` routes were added. Every statement below that no city pages, city data model, city schema, or service × city generator exists is **obsolete** — three city hubs and six service × city pages are now built, all `noindex`. Page count moved 37 → 46 and `noindex` 13 → 22; sitemap URLs are unchanged at 23. The obsolete statements are marked in place and kept, because the audit is a dated record of what was found. Current state: `CURRENT-SITE-MAP.md`, `CITY-PAGES-BUILD-REPORT.md`, `AGENTS.md` §2. Every other finding in this audit stands.

## Executive overview

Aseptaclean is a substantial multi-page Astro site, not a one-page starter. The deployable build has ~~**37 HTML pages**~~ **46 HTML pages**, **23 sitemap URLs**, ~~**13 `noindex` pages**~~ **22 `noindex` pages**, one isolated indexable SMS-consent page, and a separate Cloudflare Pages Function at `/api/lead`. It contains a shared responsive shell, four service/index hubs, fifteen service pages, a full three-step assessment form, compact forms across most marketing pages, legal integrations, schema, redirects, consent-aware analytics, and a documented no-fake-proof strategy.

The system is close to a complete launch implementation in breadth, but not in evidence and release state. ~~No service×city pages exist~~ (**obsolete — nine city routes were built later the same day; see the note at the top**); no owned project photography exists; visible gray/photo-slot placeholders remain throughout; seven gated service surfaces are linked from indexable pages; several gated service pages visibly print an internal “LAUNCH GATE — not for publication” notice; `/data-request/` is explicitly unfinished; `/projects/` is intentionally empty of proof; and production configuration contains a service-area value that conflicts with the current code/business fact.

The current visual build is Inter-only, navy/white/cool-gray, artifact-led, and contractor-professional. That is internally clear in the code, but it conflicts with the three-font typography statement in `AGENTS.md` and with older documentation still present in the repository.

## Stack and architecture

- Framework: Astro `^7.2.2`, static output, directory-format routes, trailing slashes.
- Language: Astro, TypeScript, browser JavaScript, CSS.
- Deployment: Cloudflare Pages; `wrangler.toml` points at `dist/`; no Astro adapter.
- Server-side lead handling: `functions/api/lead.ts`, with shared logic in `functions/_lib/`.
- Storage/infrastructure declared: Cloudflare R2 upload bucket and KV rate limiter; Turnstile; optional HubSpot/Resend/Twilio secrets handled by the function environment.
- Fonts: self-hosted Inter Variable in the shared site. Newsreader and IBM Plex Mono packages are installed but unused.
- Consent/legal: Termly resource blocker and policy embeds.
- Analytics: consent-aware GA/GTM loading plus `dataLayer` events.
- Styling: global token/shared-component CSS plus scoped component/page CSS. No Tailwind, Sass, CSS Modules, CMS, content collections, Markdown pages, MDX, React/Vue/Svelte, or client UI framework.
- Build behavior: Astro emits 39 pages; `scripts/prune-dev-routes.mjs` removes `/dev/hero-variants/`, `/dev/type-specimen/`, and their orphaned assets, leaving 37.

## Route inventory

Exact per-route metadata and every text-bearing DOM element are also preserved in `CURRENT-WEBSITE-COPY.md`. Canonicals below are `https://aseptaclean.com` plus the route unless noted.

### Homepage

#### `/`

- Source/layout: `src/pages/index.astro` → `BaseLayout.astro`.
- Purpose/type: flagship positioning and routing homepage.
- Components: Hero, CredentialBar, RoutingDoors, ServiceCards, ConfidenceAndFit, WhyAseptaclean, AccentBand, HandoffStandard, HandoffRecord, Pricing, AreasWeServe, OperatorAccountability, FAQ, RequestForm, FinalCTA, plus global shell.
- H1: “Complex properties returned to a controlled, documented condition.”
- Primary/secondary CTA: “Request an assessment”; “Text a photo”; phone tertiary.
- Sections: hero/status → credentials → situation doors → three service families → confidence/fit → why field → deadline band → five-stage standard → sample Handoff Record → pricing → areas → operator → FAQ → compact form → final CTA.
- SEO: title “Property Cleanout & Deep Cleaning | San Jose & South Bay | Aseptaclean”; LocalBusiness, WebSite, WebPage, three Service nodes, FAQPage.
- Status: indexable, in sitemap. Structurally complete; production imagery is not complete because multiple labeled photo slots remain.

### Service and audience hubs

#### `/services/`

- Source/layout: `src/pages/services/index.astro` → BaseLayout; PageHeader + RequestForm.
- Purpose: index of three work categories.
- H1: “What Aseptaclean handles”. Sections: compact header → three pillar cards → form.
- CTA: assessment/form; global Text a photo.
- SEO: “Services | Aseptaclean”; BreadcrumbList plus base graph.
- Status: indexable, sitemap, complete. It is linked through the Company mega/footer group.

#### `/detailed-cleaning/`

- Source/layout: route → BaseLayout → ServiceHub + RequestForm.
- H1: “One-time cleaning for properties that need a real reset.”
- Sections: hub header → credentials → four service cards → shared four-step process → deadline band → form.
- SEO: “Detailed Cleaning | San Jose | Aseptaclean”; BreadcrumbList.
- Status: indexable, sitemap, complete; post-construction/window child links point to `noindex` drafts.

#### `/specialty-cleaning/`

- Source/layout: route → BaseLayout → ServiceHub + RequestForm.
- H1: “Condition-reviewed cleaning for difficult properties.”
- Sections: hub header → credentials → four service cards → shared process → band → form.
- SEO: “Specialty Cleaning | San Jose | Aseptaclean”; BreadcrumbList.
- Status: `noindex`, absent sitemap. Partial/gated; it names and links rodent/pigeon pages even though the global nav does not.

#### `/property-clearing/`

- Source/layout: route → BaseLayout → ServiceHub + RequestForm.
- H1: “Clear the contents. Recover access. Prepare the property.”
- Sections: hub header → credentials → five service cards → shared process → band → form.
- SEO: “Property Clearing | San Jose | Aseptaclean”; BreadcrumbList.
- Status: indexable, sitemap, complete; eviction child remains `noindex`.

#### `/who-we-help/`

- Source/layout: `src/pages/who-we-help/index.astro` → BaseLayout; PageHeader + RequestForm.
- H1: “Whoever is responsible for the property”.
- Sections: header → family/estate, property-manager, senior/move-manager cards → form.
- SEO: “Who We Help | Aseptaclean”; BreadcrumbList.
- Status: indexable, sitemap, complete.

### Shared-template service pages

All fourteen routes below use a thin route file, a record in `src/data/doc27ServicePages.ts`, and `ServicePageLayout.astro`. Shared structure: optional visible gate banner → compact hero/breadcrumb/CTAs → optional compliance clause → fit grid → credentials → outcome with include/exclude panels → price-variable photo/record band and $195 assessment framing → four-step intake rail → FAQ/related links/resource → compact form. Shared schemas are Service, FAQPage, BreadcrumbList plus the base graph.

#### `/deep-cleaning-san-jose/`

- H1: “Deep cleaning in San Jose, defined room by room before anyone starts”.
- Title: “Deep Cleaning Services in San Jose | Aseptaclean”.
- Differentiated sections: right-scope fit; written checklist; work/boundaries; deep-cleaning variables; FAQ; related services.
- CTA: Request an assessment / Text a photo / Call.
- Status: indexable, sitemap, complete; placeholder photo bands remain.

#### `/move-out-cleaning-san-jose/`

- H1: “Move-out cleaning in San Jose, timed to your walkthrough date”.
- Title: “Move-In & Move-Out Cleaning in San Jose | Aseptaclean”.
- Differentiation: vacancy/handoff fit, next-person outcome, turnover variables and FAQs.
- Status: indexable, sitemap, complete; placeholder photo bands remain.

#### `/post-construction-cleaning-san-jose/`

- H1: “Post-construction cleaning in San Jose, after the trades are done”.
- Title: “Post-Construction Cleaning in San Jose | Aseptaclean”.
- Differentiation: completed-trade fit, construction-dust scope, residue/access boundaries.
- Status: `noindex`, absent sitemap, partial/gated on crew capacity. **Visible internal launch-gate notice is rendered above the hero.**

#### `/window-cleaning-san-jose/`

- H1: “Window cleaning in San Jose, tracks and frames included”.
- Title: “Interior Window Cleaning in San Jose | Aseptaclean”.
- Differentiation: glass/frames/tracks, access and mineral-deposit boundaries.
- Status: `noindex`, absent sitemap, partial/gated on crew capacity. Visible internal launch-gate notice.

#### `/extreme-cleaning-san-jose/`

- H1: “Extreme cleaning in San Jose for conditions that need a walkthrough first”.
- Title: “Extreme-Condition Cleaning in San Jose | Aseptaclean”.
- Differentiation: severe-condition fit, staged scope, stop/refer conditions; mandatory cleaning-only clause.
- Status: indexable, sitemap, complete; no visible gate banner.

#### `/animal-waste-cleanup-san-jose/`

- H1: “Animal waste cleanup in San Jose, handled without judgment”.
- Title: “Animal Waste Cleanup in San Jose | Aseptaclean”.
- Differentiation: source-controlled cleanup, accepted surfaces/materials, mandatory cleaning-only clause.
- Status: `noindex`, absent sitemap, compliance-gated. Visible internal launch-gate notice containing operational/legal release detail.

#### `/rodent-dropping-cleanup-san-jose/`

- H1: “Rodent dropping cleanup in San Jose, after pest control has done its part”.
- Title: “Rodent Dropping Cleanup in San Jose | Aseptaclean”.
- Differentiation: separation from pest control/construction; mandatory cleaning-only clause.
- Status: `noindex`, absent sitemap, compliance-gated. Visible internal launch-gate notice. No inbound link from indexable routes.

#### `/pigeon-dropping-cleanup-san-jose/`

- H1: “Pigeon dropping cleanup in San Jose for balconies, roofs and entryways”.
- Title: “Pigeon Dropping Cleanup in San Jose | Aseptaclean”.
- Differentiation: accessible-area scope; height/access boundaries; mandatory cleaning-only clause.
- Status: `noindex`, absent sitemap, compliance-gated. Visible internal launch-gate notice. No inbound link from indexable routes.

#### `/property-cleanouts-san-jose/`

- H1: “Property cleanouts in San Jose that keep a vacancy on schedule”.
- Title: “Property Cleanout Services in San Jose | Aseptaclean”.
- Differentiation: keep/remove/review decisions, contents/access/disposal drivers.
- Status: indexable, sitemap, complete.

#### `/hoarding-cleanup-san-jose/`

- H1: “Hoarding cleanup in San Jose, without throwing away what matters”.
- Title: “Hoarding Cleanup in San Jose & South Bay | Aseptaclean”.
- Differentiation: family-addressed dignity copy, staged decision zones, no forced removal, checklist resource.
- Status: indexable, sitemap, complete.

#### `/estate-cleanout-san-jose/`

- H1: “Estate cleanout in San Jose without deciding everything today”.
- Title: “Estate Cleanout in San Jose & South Bay | Aseptaclean”.
- Differentiation: authority/sorting/sale-handoff copy, executor FAQs, checklist resource.
- Status: indexable, sitemap, complete.

#### `/debris-removal-san-jose/`

- H1: “Debris removal in San Jose for whole-property projects”.
- Title: “Property Debris Removal | San Jose & South Bay | Aseptaclean”.
- Differentiation: defined lawful disposal plan, City-authorized hauler language, material boundaries.
- Status: indexable, sitemap, complete.

#### `/eviction-cleanout-san-jose/`

- H1: “Eviction cleanouts in San Jose, documented for the owner file”.
- Title: “Eviction Cleanout Services in San Jose | Aseptaclean”.
- Differentiation: lawful-possession precondition, owner file and turnover timing.
- Status: `noindex`, absent sitemap, crew-capacity gated. Visible internal launch-gate notice.

#### `/commercial-cleaning-san-jose/`

- H1: “Commercial cleaning in San Jose with a scope you can inspect”.
- Title: “Commercial Janitorial Cleaning in San Jose | Aseptaclean”.
- Differentiation: frequencies/areas/program inspection; clinical/industrial exclusions.
- Status: `noindex`, absent sitemap, crew-capacity gated. Visible internal launch-gate notice. It is a direct global-nav item.

### Older standalone service page

#### `/senior-downsizing-san-jose/`

- Source/layout: route → BaseLayout; CompactHero, ServiceScope, ServiceMethodRail, ServiceProof, ServicePricing, ServiceFAQ, RequestForm.
- H1: “Support for a parent's move to a smaller place”.
- Sections: hero → recognition → scope → referral note → five stages → proof → pricing → FAQ → form.
- Title: “Senior Downsizing & Move-Out Support | San Jose | Aseptaclean”.
- Schema: Service, FAQPage, BreadcrumbList.
- Status: `noindex`, absent sitemap; partial and explicitly on a delete-or-write gate. It uses the older service composition rather than `ServicePageLayout`.

### Company, process, area, and proof pages

#### `/about/`

- Source/layout: `src/pages/about/index.astro` → BaseLayout; PageHeader + RequestForm.
- H1: “A controlled-process mindset for properties that need careful decisions.”
- Sections: founder story → verified background → three decision principles → contextual links → form.
- Title: “About Aseptaclean | Owner-Operated Property Cleaning”. Schema: Person + BreadcrumbList.
- Status: indexable, sitemap, complete. No real founder portrait is present.

#### `/handoff-standard/`

- Source/layout: route-specific page → BaseLayout; PageHeader + RequestForm.
- H1: “Decisions first. Work second. Proof at closeout.”
- Sections: full five-stage standard → annotated Handoff Record → who relies on it → form.
- Title: “Our Process | Aseptaclean”. Schema: BreadcrumbList.
- Status: indexable, sitemap, content-rich and complete.

#### `/faq/`

- Source/layout: route → BaseLayout; PageHeader, ServiceFAQ, AccentBand, RequestForm.
- H1: “Straight answers before the property is scheduled.”
- Sections: FAQ disclosures → still-deciding band → question CTA → form.
- Title: “Frequently Asked Questions | Aseptaclean”. Schema: FAQPage + BreadcrumbList.
- Status: indexable, sitemap, complete.

#### `/contact/`

- Source/layout: route → BaseLayout; PageHeader + RequestForm.
- H1: “Start with the property details.”
- Sections: contact details/service area → form.
- Title: “Contact Aseptaclean | San Jose & South Bay Property Cleanouts”. Schema: BreadcrumbList.
- Status: indexable, sitemap, complete as implemented; planned embedded map is absent.

#### `/service-areas/`

- Source/layout: route → BaseLayout; PageHeader, AreasWeServe, AccentBand, RequestForm.
- H1: “South Bay & Peninsula properties, reviewed one address at a time.”
- Sections: ten-city strip → regional clusters → conditional completed-city links (not rendered) → shared service links → band → form.
- Title: “South Bay & Peninsula Service Area | Aseptaclean”. Schema: BreadcrumbList.
- Status: indexable, sitemap, complete as a hub; zero city detail pages exist.

#### `/projects/`

- Source/layout: route → BaseLayout; PageHeader + RequestForm.
- H1: “Real work will appear here only when it can be shown honestly.”
- Sections: project types → future case-study evidence standard → form.
- Title: “Projects & Property Handoffs | Aseptaclean”. Schema: BreadcrumbList.
- Status: `noindex`, absent sitemap, intentionally partial/empty because no documented projects exist. No inbound link from indexable routes.

### Resource and campaign

#### `/estate-cleanout-checklist/`

- Source/layout: route-specific page → BaseLayout; PageHeader + RequestForm.
- H1: “The Executor's Estate Cleanout Checklist”.
- Sections: print action → five checklist sections → requested closeout record → neutral-resource note → form.
- Title: “The Executor's Estate Cleanout Checklist (Free) | Aseptaclean”. Schema: ItemList + BreadcrumbList.
- Status: indexable, sitemap, complete, with print CSS.

#### `/private-residence-reset/`

- Source/layout: `src/pages/private-residence-reset.astro` → BaseLayout; ResidenceBaselineRecord; otherwise page-specific.
- H1: “Bring the entire residence back to a defined standard.”
- Sections: hero → not-housekeeping contrast → desired outcome → five-stage residence path → baseline record → included/outside scope → instruction controls → assessment/maintenance fit → final CTA.
- Primary CTA: “Request a Private Residence Assessment” to the assessment variant. MobileCTA disabled.
- Title: “Private Residence Reset in San Jose & South Bay | Aseptaclean”. Schema: Service + BreadcrumbList.
- Status: indexable, sitemap, content-complete. It visibly uses “Assess → Define → Reset → Verify → Maintain,” conflicting with the standing prohibition on retired mechanism names.

### Conversion and utility

#### `/request-assessment/`

- Source/layout: route → BaseLayout; AssessmentForm + CredentialBar. MobileCTA disabled.
- H1: “Start with the property. We’ll review the path to handoff.”
- Sections: three-step full form → credentials → operator response note.
- Primary CTA: “Submit My Handoff Plan Request”; variant text for Private Residence Reset.
- Title: “Request a Property Assessment | Aseptaclean”. Schema: BreadcrumbList.
- Status: indexable, sitemap, structurally complete. Runtime success depends on production environment, Turnstile, function bindings, and provider secrets.
- The Private Residence Reset variant enables a “Desired investment range” field with `$2,000–$3,499`, `$3,500–$5,999`, and `$6,000+` options. Those are public price figures and conflict with AGENTS §4's rule that the $195 assessment is the only figure published.

#### `/thank-you/`

- Source/layout: route-specific → BaseLayout.
- Default H1: “This page does not confirm that a request was received.” It conditionally becomes a real confirmation only with expected submission state.
- Sections: safe fallback/confirmation → photo next step.
- Title: “Thank You | Aseptaclean”. Schema: BreadcrumbList.
- Status: `noindex`, absent sitemap, complete defensive implementation; no inbound indexable link.

#### `/data-request/`

- Source/layout: route-specific → BaseLayout.
- H1: “Data Request”. Section: “Request form not published in this preview” with email path.
- Title: “Data Request | Aseptaclean”. Schema: BreadcrumbList.
- Status: `noindex`, absent sitemap, **placeholder/unfinished** until the DSAR provider is wired. No inbound indexable link.

#### `/404`

- Source/layout: `src/pages/404.astro` → BaseLayout; PageHeader.
- H1: “That page isn’t here.” Section: links to home, services, contact.
- Title: “Page Not Found | Aseptaclean”. Base schema only; emits `page_not_found` event.
- Status: `noindex`, not in sitemap, complete.

### Legal and consent

#### `/privacy/`, `/terms/`, `/cookie-policy/`

- Source/layout: corresponding route → BaseLayout; PageHeader + LegalPolicy.
- H1s: “Privacy Policy”, “Terms and Conditions”, “Cookie Policy”.
- Sections: Termly runtime embed plus provider/email fallback “If the policy does not load”.
- Titles match H1 + Aseptaclean. Schemas: BreadcrumbList.
- Status: indexable and in sitemap. Complete only when Termly IDs/scripts resolve; fallback is implemented.

#### `/sms-notification-consent/`

- Source/layout: standalone `src/pages/sms-notification-consent.astro`; standalone CSS.
- H1: “Internal SMS Alert Enrollment”.
- Sections: message purpose → enrollment form → messaging disclosures → privacy.
- CTA: “Enroll in SMS Alerts”.
- Title: “Internal SMS Alert Enrollment | Aseptaclean”. No canonical, Open Graph, Twitter metadata, or JSON-LD. Robots is `index,follow`.
- Status: indexable but absent sitemap; byte-preserved under carrier review. Its design and SEO are intentionally inconsistent with the shared site.

## Components and systems

There are **38 component files** in `src/components/`. **33 have a production consumer** and **5 appear unused** (`Card`, `RelatedServices`, `ServiceBoundaries`, `ServiceChecklist`, `ServiceFitPanel`). Detailed dimensions and responsive rules are in `CURRENT-DESIGN-SYSTEM.md`.

Major reusable systems:

- Global layout/SEO/navigation/footer/mobile actions/analytics.
- Three service hubs through `ServiceHub`.
- Fourteen service pages through one data-driven layout.
- Compact assessment form reused by 15 route files and the homepage.
- Full three-step assessment with validation, draft persistence, attribution, upload validation/progress, Turnstile, and variant routing.
- Shared business facts, nav, disclaimers, homepage records, cities, and CTAs in `src/data/site.ts`.
- Shared legal embed/fallback.
- Shared sample-document/status visual language.

## Copy architecture and duplication

Copy is code-owned; there is no CMS.

- Direct route markup: route-specific pages and some section framing.
- `src/data/site.ts`: business facts, CTAs, navigation, legal disclaimers, homepage arrays.
- `src/data/doc27ServicePages.ts`: fourteen service records.
- `src/data/doc27CompanyPages.ts`: six company/area page records.
- `src/data/servicePages.ts`: hubs, checklist, senior page, one-liners, shared four-step copy.
- `src/data/assessment.ts`: form choices and limits.
- Component literals: shared section headings, labels, helper copy, success/error text.

The fourteen service pages are highly templated structurally: all share the hero pledge, credential strip, outcome framing, include/exclude panel labels, price framing, assessment paragraph, four-step intake process, FAQ/related layout, and form. Differentiation lives in each record's H1, lead, four fit bullets, outcome heading/body, five inclusions, five quote variables, four boundaries, two FAQs, related links, optional resource, and some section labels. Roughly half of the meaningful service-page body is page-specific data and half is shared framing/form/shell; exact percentages vary because the shared form is long.

There is no city swapping or service×city generation. “San Jose” is manually present in the fixed H1/title/slug records while the lead/body often speaks to the South Bay & Peninsula.

## SEO implementation

### Implemented

- Shared unique title, description, canonical, `index, follow`/`noindex, follow`, Open Graph type/site/title/description/URL, and Twitter summary card.
- No shared OG image is supplied, so cards use `summary`, not `summary_large_image`.
- Base JSON-LD graph on shared pages: LocalBusiness, WebSite, WebPage with one business `@id`.
- Page-specific schema: Service, FAQPage, BreadcrumbList, Person, ItemList as appropriate.
- No AggregateRating or fabricated review schema.
- LocalBusiness includes legal name, email, optional telephone/logo/social profiles, hours, founder, ten-city `areaServed`, and San Jose centroid; it deliberately has no street address.
- Static sitemap with 23 URLs and environment-sensitive robots endpoint.
- Explicit Cloudflare redirects for legacy paths.
- One H1 on every rendered page checked.
- Internal linking through mega nav/footer, contextual related services, breadcrumbs, service hubs, checklist links, and forms.
- Logo alt text is present; decorative SVGs are mostly `aria-hidden`.

### Missing, partial, or exceptional

- SMS page has no canonical, OG/Twitter tags, or schema and uses a separate robots syntax.
- No real content images exist, so there is effectively no meaningful content-image alt-text system to assess.
- Five `noindex` pages receive zero links from indexable routes; seven other gated routes are linked from indexable pages.
- ~~No city pages, city canonicals, city schema, or local-fact fields exist.~~ **Obsolete.** Nine city routes now exist, each with a self-referencing canonical, `CollectionPage`/`Service` + `BreadcrumbList` schema, and sourced local-fact records in `src/data/cityFacts.ts`.
- No pagination exists.
- `wrangler.toml` sets `PUBLIC_SERVICE_AREA = "San Jose and the South Bay"`, while source/defaults and governing facts say “South Bay & Peninsula”; Cloudflare builds using that file can render a different NAP/service-area string than the audited local build.
- `README.md` still describes a one-page launch and obsolete source files; it is not reliable architecture documentation.

## Responsive implementation

The shared system is primarily 1200px max-width with 24px shell gutters, 1050px navigation/grid collapse, and 760px mobile collapse/fixed CTA. Component-local breakpoints add 640, 672, 768, 864, 900, 960, 1000, 1024px and 384px cases.

Rendered representative pages at 390px had no document-level horizontal overflow. The closed off-canvas drawer is transformed one viewport to the right and was the only element geometry reported outside the viewport. At 390px the ribbon wraps from 34px to about 97px, the nav stays 66px, the fixed CTA is about 43px tall, and the footer remains two columns. At 768px the burger remains but the mobile CTA is gone; common grids are two columns. At wide desktop shells cap at 1200px.

Potential pressure points, not confirmed breakages:

- Long 390px homepage H1 occupies six lines/264px.
- Footer's persistent two-column layout is dense on narrow screens.
- Mobile action bar measured ~43px high, marginally below a 44px touch-target convention.
- Many route-specific breakpoints make responsive behavior harder to reason about globally.
- Placeholder photo bands preserve large vertical areas without real imagery.

## Accessibility implementation

### Implemented

- Semantic `nav`, `main`, `footer`, sections, articles, lists, tables, forms, labels, fieldsets/legends, and native details/summary.
- Skip link to focusable `main`.
- One H1 per rendered route and corrected service-page H2 sequence.
- Global visible focus ring; component focus states; keyboard-operable desktop mega triggers; Escape/outside-click close logic.
- Mobile drawer works through CSS checkbox/details without JavaScript; close/open labels have hidden text.
- Form labels, required indicators, `aria-invalid`, error summaries, live/status regions, focused validation errors, and Turnstile guidance.
- Decorative SVGs and geometry are usually `aria-hidden`; logo alt text is meaningful.
- Reduced-motion rule disables smooth scroll/transitions.
- Print-specific hiding and checklist print support.
- Astro check: 0 errors; four non-blocking hints.

### Missing or unclear

- Full color-contrast verification was not rerun across every component/state; code comments document several targeted corrections.
- No complete current axe report is stored by this audit.
- Header does not visibly mark the current route with `aria-current`.
- Mobile drawer uses styled labels rather than native buttons and the checkbox itself is `aria-hidden`; behavior works, but announced expanded state is not explicit.
- Fixed mobile CTA's measured height is around 43px at 390px.
- Termly-injected policy and consent UI accessibility depends partly on third-party runtime output.
- No actual photography exists, so future image alt quality remains untested.

## Visual assets

Shipped meaningful bitmap assets:

| Asset | Dimensions/format | Use | Status |
| --- | --- | --- | --- |
| `public/assets/brand/aseptaclean-wordmark.png` | 900×215 PNG RGBA | desktop/mobile header and schema logo | production-ready |
| `public/assets/brand/aseptaclean-wordmark-reversed.png` | 900×215 PNG RGBA | footer | production-ready, lazy-loaded |
| `public/assets/brand/aseptaclean-site-icon-512.png` | 512×512 PNG RGB | favicon/apple touch icon | production-ready |

The site uses inline SVG icons and CSS geometry extensively. No service/project/property photography, illustration, or background image is shipped. Labeled gray/navy photo slots are placeholders. `docs/baseline/home-390.png` and `home-1440.png` are audit references, not public assets. `docs/Untitled document (3).pdf` is not linked into the site.

## Current build quality

### Strong

- Static architecture and Cloudflare Function separation are clear and correct.
- Shared SEO graph, canonicals, sitemap/index gates, redirects, and no-fake-review discipline are substantial.
- Data-driven 14-page service system makes copy differences auditable.
- Forms are unusually complete: validation, consent, Turnstile, uploads, draft persistence, safe failure states, and endpoint gating.
- Shared responsive shell, mobile drawer, fixed actions, focus handling, reduced motion, and print behavior are implemented.
- The visual system has a clear operational-document signature rather than generic lifestyle styling.

### Inconsistent

- Inter-only code versus three-font AGENTS statement and unused font dependencies.
- Shared service template versus older Senior Downsizing chain and page-specific Private Residence composition.
- Shared SEO versus isolated SMS page.
- Token system versus hardcoded approved color/spacing values.
- Current “South Bay & Peninsula” source/default versus stale `wrangler.toml` value.
- Governing five-stage mechanism versus Private Residence's retired Assess/Define/Maintain sequence.

### Partial

- Photography/art direction: layout slots exist, assets do not.
- Local SEO: service-area hub and schema cities exist; ~~but city pages/data model/generator do not~~ **obsolete — all three now exist**, gated at `noindex` pending owner confirmation of city availability.
- Proof system: samples and process evidence exist; real projects/reviews do not.
- Several service pages are fully written but gated on crew/compliance inputs.
- Legal pages depend on Termly runtime.

### Missing

- ~~Service×city pages and local-fact records.~~ **Obsolete — both were built later on 2026-08-21.**
- Real case studies, reviews, client proof, and owned work photography (correctly not fabricated). These remain missing, and as of 2026-08-21 they are a **proof-enhancement layer for the city pages, not a prerequisite** for those routes to exist.
- Planned contact-page map.
- DSAR provider/form.
- Full current cross-route automated accessibility/visual report committed as an audit artifact.

### Dead / unused

- Components: `Card`, `RelatedServices`, `ServiceBoundaries`, `ServiceChecklist`, `ServiceFitPanel`.
- Export: `navigation` in `src/data/site.ts`; current Header/Footer consume `megaNav` instead.
- Installed fonts: Newsreader and IBM Plex Mono.
- `/dev/*` pages exist in source but are pruned from production.
- Several README/file-role references describe missing or retired documents.

### Placeholder / release-sensitive

- Every “Photo slot” label and flat image block.
- `/data-request/` preview message.
- `/projects/` intentionally empty proof state.
- Visible internal launch-gate banners on gated shared-template service pages.
- Assessment success still depends on deployed bindings/providers even though the code path exists.
- Private Residence Reset assessment variant contains published investment-range figures despite the no-public-pricing rule.

## Strategy/specification comparison

| Requirement | Source | Built? | Actual implementation | Notes |
| --- | --- | ---: | --- | --- |
| Cloudflare Pages static Astro + `functions/api/lead.ts` | AGENTS §0.1 | YES | `output: static`; no adapter; Pages Function exists | Correct canonical endpoint; not modified |
| Multi-page architecture | doc 19 / AGENTS §2 | YES | 37 HTML pages | README is stale |
| No prohibited biohazard route tree | AGENTS §2; doc 21 | YES | none built | Correct |
| No fabricated proof | AGENTS §0.3; doc 21 §6 | YES | project page stays empty/noindex; sample records labeled | Strong alignment |
| Three homepage service cards | doc 18 §6.1 | YES | exactly three | Media remains placeholder |
| Contractor-professional visual system | doc 18 | YES | navy, cool-gray, artifact-led, square controls | Strong alignment |
| Inter-only typography | current doc 18 preamble/code | YES | one self-hosted Inter face | CONFLICT with AGENTS typography block |
| Newsreader + Inter + IBM stack | AGENTS §6 | NO | Newsreader/IBM installed but unused | Instruction conflict requires owner reconciliation |
| No font size on heading tags; role classes | AGENTS §6 | YES | shared role-class system | Representative computed audit agrees |
| H1/body ratio ≥1.9 | AGENTS §6 | YES | 40/16 minimum on homepage, 35.2/16 hub, 30.4/16 band | Company-band ratio is exactly 1.9 |
| Approved 68/60 and 48/40 section rhythm | doc 18 §4.1 | YES | implemented globally | Matches code comments and computed output |
| Homepage thesis/routing/method/record/form | docs 18/27 | YES | all major systems present | Additional routing block is implemented |
| Service page: buyer H1, scope, boundaries, pricing, FAQ, form | docs 19/27 | YES | shared 14-page layout | Uses four-step intake rail, not five-stage project rail |
| Five-stage service-page method | doc 19 §3.2 | PARTIAL | linked Handoff Standard; visible page rail is four-step “How this starts” | Copy doc 27 supplies the four steps; architectural tension remains |
| Service pages 900–1,200 words | doc 19 §3.2 | PARTIAL | substantial but templated; many are shorter before shared form/shell | No word-count gate in build |
| ~~City pages only after real city job~~ **RULE SUPERSEDED 2026-08-21** | doc 19 / AGENTS §2 | n/a | 3 city hubs + 6 service × city pages built, all `noindex` | The completed-job prerequisite was lifted by owner ruling; the replacement is seven conditions incl. sourced facts and a passing `qa:seo`. Compliance with the *new* rule: YES — `qa:seo` 9/9 clean |
| Service×city generator/data | doc 19 §2.2 | YES | two dynamic routes over four data modules | Was "planned, not current"; built 2026-08-21 |
| Full service-area hub | docs 19/27 | YES | ten cities + clusters + service links + links down to 3 built city hubs | Was "no completed-city links yet" |
| Contact page includes map | doc 19 §3.6 | NO | contact details + form only | Missing planned element |
| Thank-you confirms receipt | doc 19 §3.4 | PARTIAL | confirms only with trusted state; otherwise explicit non-confirmation | Defensive behavior avoids false success |
| About founder/credentials/disclaimer | docs 19/21/27 | YES | Person schema and authority disclaimer | Portrait absent |
| Projects publish only with real photos | doc 19 | YES | route exists but `noindex`, empty-proof message | Correctly gated |
| Full assessment with working lead endpoint | docs 10/27; release checklist | YES/PARTIAL | robust client + server path exists | External secrets/provider availability cannot be proven from static audit |
| $195 assessment fee appears; no project starting price | AGENTS §4 | YES | assessment fee appears; no public project floor | Correct on those surfaces |
| $195 is the only public price figure | AGENTS §4 | CONFLICT | residence assessment variant exposes three investment ranges | Pre-existing, flagged; not fixed |
| Current five-stage names only | AGENTS §7 | CONFLICT | shared site uses Scope/Protect/Clear/Reset/Verify; Private Residence uses Assess/Define/Reset/Verify/Maintain | Public-copy conflict |
| Exact approved insurance line | doc 21 §2.5 | PARTIAL | ribbon/credential use shortened variants; full text lives in data | Doc 21 explicitly called this incomplete |
| Animal/organic limiting clause verbatim | doc 21 §2.3 | YES | rendered on relevant service/home surfaces | Exact mandatory sentence present |
| Technical SEO/title/canonical/robots/OG/schema | doc 27 §19 | YES | shared SeoHead implementation | SMS page is the deliberate exception |
| Analytics minimum events | doc 27 §26 | PARTIAL | page view variant, phone, assessment click/start/submit, 404 | No evidence here of every requested downstream conversion event |
| Owned/atmosphere imagery policy | docs 18/21 | PARTIAL | no deceptive images; slots empty | Honest but visually unfinished |

## Highest-risk inconsistencies

1. **Visible gate instructions:** gated service pages render internal operational/legal notes to users in a pink banner despite the text “not for publication.” This is actual public HTML, not a comment.
2. **Published price-range conflict:** the Private Residence Reset assessment variant exposes `$2,000–$3,499`, `$3,500–$5,999`, and `$6,000+`, despite the rule that $195 is the only published figure.
3. **Production NAP/config drift:** `wrangler.toml` says “San Jose and the South Bay”; audited code/default and governing facts say “South Bay & Peninsula.”
4. **Mechanism conflict:** Private Residence Reset publicly uses retired stage names forbidden by AGENTS.
5. **Typography authority conflict:** shared code is Inter-only while AGENTS still declares a three-font shipping stack.
6. **No real imagery:** multiple large placeholder slots remain across the highest-value pages.
7. **Global links into gated pages:** seven `noindex` routes receive indexable-page links through current navigation/content.
8. **Stale repository guidance:** README and several comments still describe prior architecture or counts, increasing maintenance risk.
9. **External release dependencies:** DSAR, Termly, Turnstile, lead-provider secrets, COI confirmation, and gated service capacity/compliance remain outside static proof.

## Verification performed

- `npm run build:local`: PASS; 39 Astro pages emitted, 2 dev pages pruned, deployable 37.
- Rendered metadata/heading/schema/link crawl of all 37 pages: completed.
- Computed responsive sampling at 390px and 768px: no document-level horizontal overflow in representative routes.
- `npm run check`: 0 errors; 4 hints (unused audit variable, ineffective `await`, unused LegalPolicy prop, unused servicePages import).
- `npm run qa:phase4:static`: failed only because it expected a private-preview robots file while this audit intentionally built production mode, whose robots output allows crawling. This is a test-mode mismatch, not evidence that production robots is wrong.

## Exact implementation sources to edit later

| Concern | Source of truth in current code |
| --- | --- |
| Design | `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/fonts.css`, then component/page scoped styles |
| Copy | `src/data/site.ts`, `src/data/doc27ServicePages.ts`, `src/data/doc27CompanyPages.ts`, `src/data/servicePages.ts`, `src/data/assessment.ts`, plus component/route literals |
| Page architecture | `src/pages/`, `src/layouts/BaseLayout.astro`, `src/layouts/ServicePageLayout.astro`, `src/components/ServiceHub.astro` |
| SEO | `src/components/SeoHead.astro`, route props/schema, `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `public/_redirects` |
| Local SEO data | `site.location` in `src/data/site.ts`; `serviceAreasPage` in `src/data/doc27CompanyPages.ts`; service-area records in `src/data/servicePages.ts` |
| Navigation/crawl graph | `megaNav` in `src/data/site.ts`, contextual links in route/data records, Footer/Header components |
| Forms | `src/components/AssessmentForm.astro`, `QuickHandoffForm.astro`, `src/data/assessment.ts`, `functions/api/lead.ts` |
