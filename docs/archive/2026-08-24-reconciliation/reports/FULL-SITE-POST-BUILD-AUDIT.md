# Executive Summary

Audit date: 2026-08-23. This is an audit of the rendered production build and its source; no public implementation, copy, schema, route, or indexation state was changed.

The site is technically mature but is not ready for an unconditional public launch. It builds cleanly, has a coherent shared design system, preserves the lead architecture, has sound canonical/schema fundamentals, and generates the nine city routes from reusable data-driven templates. The blocking issues are semantic and operational rather than architectural: prohibited public price ranges, an ambiguous off-site-removal statement, an unconfirmed “Also serving” availability claim, unsupported or source-drifted local statements, and serious automated contrast failures.

The nine city routes are not ready to index. All nine pass the repository's machine publication guard, remain `noindex, follow`, stay out of the sitemap, have inbound crawl paths, and use the intended schemas. That guard does not validate whether a source still supports its exact claim or whether owner service availability has been confirmed. Campbell's Census record has drifted, one Mountain View implication exceeds its supporting fact, and the San Jose parent pages publicly label all six child routes “Also serving” before the owner availability gate is closed.

No fake reviews, ratings, testimonials, case studies, completed-project counts, city addresses, city-specific LocalBusiness entities, or `AggregateRating` markup were found. The site does contain four unsupported frequency/experience statements and four unsupported or inadequately sourced local statements. Projects remains honest about the absence of proof.

# Launch Readiness Score

**68/100 — not launch-ready.**

| Area | Assessment |
| --- | --- |
| Architecture/build | Strong: 46 deployable HTML pages, reusable layouts, clean build |
| Technical SEO | Strong: unique metadata/H1s, canonicals, robots, sitemap and schema pass documented exceptions |
| Positioning/copy | Mostly aligned, but public pricing, hauling ambiguity and unsupported experience cadence remain |
| City publication | Machine-ready; not human/semantic-ready |
| Accessibility | Core semantics are good; serious contrast findings block a clean pass |
| Responsive design | Mechanically sound at six widths; several 320px heading wraps need polish |
| Proof | Honest, but intentionally thin: no real project/founder photography or case studies |

# Critical Issues

1. **Customer-facing price ranges violate the governing no-price decision.** The Private Residence Reset variant of the assessment form exposes “Desired investment range” with `$2,000–$3,499`, `$3,500–$5,999`, and `$6,000+` at `/request-assessment/?offer=private-residence-reset`. Source: `src/components/AssessmentForm.astro:414-420`. AGENTS.md §4 permits only the $195 assessment fee.

2. **OPERATING-SCOPE CONFLICT — HAULING.** `/handoff-standard/` says: “Approved unwanted contents are consolidated, removed, or coordinated for disposal within the signed scope.” Source: `src/pages/handoff-standard/index.astro:32`. “Removed” is not limited to clearing rooms or loading an approved container and is not attributed to the applicable authorized/franchised provider; it can reasonably mean Aseptaclean transports debris off-site. The later headline, “You should not have to coordinate a hauler, a cleaner, disposal, access, family approvals, and a final walkthrough yourself” (`:159`), is permissible as coordination in isolation but compounds the ambiguity. No schema or metadata made an additional hauling claim.

3. **City availability is publicly asserted before the human gate is closed.** The San Jose Hoarding and Estate pages label their six city-child links **“Also serving”** (`src/layouts/ServicePageLayout.astro:413`) while the SEO guard still says owner confirmation of city availability is required. Linking is an accepted crawl-path decision; the availability label is a customer-facing business claim and is not neutralized by `noindex`.

# High-Priority Issues

1. **Local-content integrity is not sufficient for city publication.** See Local SEO Audit: one Mountain View implication is not proven by its cited fact; three indexable `/service-areas/` cluster statements have no verified source; Campbell's current source no longer supports the rendered 50.5%/2019–2023 Census statement.

2. **Serious color-contrast failures occur in shared visible components.** Axe at 390px found failures on homepage photo-slot/portrait labels, city-hub photo-slot labels, city implication numerals, and shared process numerals. Affected selectors include `src/styles/global.css:1053`, `:1310`, `:2039` and `src/styles/city-pages.css:360`, `:416`.

3. **Deployed service-area wording can differ from the audited production build.** `wrangler.toml:57` sets `PUBLIC_SERVICE_AREA = "San Jose and the South Bay"`; AGENTS.md and `.env.production` say “South Bay & Peninsula.” Because the Cloudflare Pages configuration supplies deployed public variables, the live footer/site can regress despite the local production build passing.

4. **Private Residence Reset uses a retired process.** `src/pages/private-residence-reset.astro:7-11` renders “Assess → Define → Reset → Verify → Maintain,” conflicting with the standing “Scope → Protect → Clear → Reset → Verify” sequence. The page is indexable.

5. **Launch-visible gated services require an explicit availability review.** Six noindex service pages are linked globally and seven noindex services receive links from indexable pages. This is an owner-accepted navigation/indexation tradeoff, not automatically a defect; however, removing visible gate banners made operational availability a required pre-launch human check.

# Medium-Priority Issues

- Unsupported experience/frequency language appears without documented project evidence:
  - “Asked before almost every project.” — `src/components/FAQ.astro:68`
  - “Most jobs are one of these.” — `src/components/ServiceCards.astro:96`
  - “Two things bring most people here … Often both.” — `src/data/servicePages.ts:247`
  - “the service we most often want to walk first” — `src/data/doc27ServicePages.ts:616`
- “a second vendor mobilizing later costs more than adding it now” is an unsupported categorical cost comparison (`src/data/doc27ServicePages.ts:587`).
- Operational vocabulary is over-repeated. Across 45 ordinary rendered routes, `scope` appears 495 times, `assessment` 497, `handoff` 185 and `documented` 120. Shared shell/form copy contributes, but the aggregate can make the company sound process/documentation-led rather than service-led.
- At 320px several long H1s produce awkward single-word lines, notably homepage, city hubs, Hoarding San Jose, About, and Private Residence Reset. There is no overflow.
- The fixed mobile CTA is approximately 42px high at narrow widths. It meets WCAG 2.2's 24px minimum but falls below the common 44px comfort target.
- Header/navigation does not expose a current-route indicator such as `aria-current`; city breadcrumbs do.
- Lighthouse mobile performance was 51 for `/` and 62 for `/about/` in the local production run. Accessibility was 97/100, SEO 100/100 and Best Practices 96/100. Termly and Turnstile are material third-party contributors; validate on the production hostname before launch.

# Low-Priority / Cleanup

- Five apparently dead components: `Card.astro`, `RelatedServices.astro`, `ServiceBoundaries.astro`, `ServiceChecklist.astro`, and `ServiceFitPanel.astro`.
- Astro reports four hints: unused `pageReports`, ineffective `await`, unused `LegalPolicy.title`, and unused `commercialPage` import.
- Newsreader and IBM Plex Mono packages remain installed but only Inter is emitted. `src/styles/fonts.css` acknowledges pending cleanup.
- Page-scoped CSS is extensive (55 Astro files contain `<style>`), with repeated rules and mixed breakpoint conventions. This is maintainability debt, not a current rendering failure.
- The automated crawler's hardcoded seed `/property-cleanouts-for-managers/` is stale; it reports a false broken-route finding even though no rendered page links there.

# Route Inventory

Legend: **I+S** = `index,follow`, sitemap; **I−S** = indexable, intentionally absent from sitemap; **N−S** = `noindex,follow`, absent from sitemap. All ordinary routes have a self-canonical. SMS has no canonical by protected exception; `/404` has none by definition. `Shared service` means `ServicePageLayout.astro`; `city hub` and `city service` are generated by the two dynamic templates. “Global” inbound means the shared navigation/footer provides broad discovery; exact indexable-source exceptions are described under Internal Links.

| URL | Source / layout / type | State | H1 | Relationships and contextual links | Completion |
| --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/index.astro` / `BaseLayout` / home | I+S | Some properties need more than a routine cleaning. | Site root; global service, area, FAQ, assessment links | Complete |
| `/about/` | `src/pages/about/index.astro` / Base / company | I+S | Careful work on properties where the decisions matter. | Global; process/assessment links | Complete |
| `/animal-waste-cleanup-san-jose/` | route file / Shared service | N−S | Animal waste cleanup in San Jose, handled without judgment | Specialty child; global + parent/assessment | Gated |
| `/commercial-cleaning-san-jose/` | route file / Shared service | N−S | Commercial cleaning in San Jose, built around the property | Specialty child; global + parent/assessment | Gated |
| `/contact/` | route file / Base / contact | I+S | A direct way to start. | Global; form/phone/text | Complete |
| `/cookie-policy/` | route file / `LegalPolicy` | I+S | Cookie Policy | Footer legal | Complete |
| `/data-request/` | `src/pages/data-request.astro` / Base / legal utility | N−S | Request your data | No indexable inbound | Partial: provider/form not published |
| `/debris-removal-san-jose/` | route file / Shared service | I+S | Debris removal in San Jose, with the cleanup handled too | Complex-cleanup child; global + parent/assessment | Complete |
| `/deep-cleaning-san-jose/` | route file / Shared service | I+S | Deep cleaning in San Jose for homes that need more than maintenance | Detailed child; global + parent/assessment | Complete |
| `/detailed-cleaning/` | route file / Base / hub | I+S | Detailed cleaning for homes that need more than maintenance | Global; service children/assessment | Complete |
| `/estate-cleanout-checklist/` | route file / Base / resource | I+S | Estate cleanout checklist | Contextual resource/assessment | Complete |
| `/estate-cleanout-san-jose/` | route file / Shared service | I+S | Estate cleanout in San Jose, handled with care from first room to final handoff | Complex child and parent of 3 city services | Complete |
| `/eviction-cleanout-san-jose/` | route file / Shared service | N−S | Eviction cleanout in San Jose, ready for the next decision | Complex child; global + parent/assessment | Gated |
| `/extreme-cleaning-san-jose/` | route file / Shared service | I+S | Extreme cleaning in San Jose for properties that need a full reset | Specialty child; global + parent/assessment | Complete |
| `/faq/` | route file / Base / company | I+S | Straight answers before you commit. | Global; services/assessment | Complete |
| `/handoff-standard/` | route file / Base / process | I+S | The handoff should be as clear as the scope. | Global/contextual; assessment | Complete; scope conflict |
| `/hoarding-cleanup-san-jose/` | route file / Shared service | I+S | Hoarding cleanup in San Jose, handled without judgment | Complex child and parent of 3 city services | Complete |
| `/move-out-cleaning-san-jose/` | route file / Shared service | I+S | Move-out cleaning in San Jose, ready for the handoff | Detailed child; global + parent/assessment | Complete |
| `/pigeon-dropping-cleanup-san-jose/` | route file / Shared service | N−S | Pigeon dropping cleanup in San Jose, limited to cleaning | Specialty child; intentionally restricted links | Gated |
| `/post-construction-cleaning-san-jose/` | route file / Shared service | N−S | Post-construction cleaning in San Jose, ready for the next use | Detailed child; global + parent/assessment | Gated |
| `/privacy/` | route file / LegalPolicy | I+S | Privacy Policy | Footer legal | Complete |
| `/private-residence-reset/` | root route / Base / campaign | I+S | Private Residence Reset | Footer/contextual; assessment variant | Complete; process drift |
| `/projects/` | route file / Base / proof | N−S | Project documentation will appear here when it is real. | No indexable inbound | Honest placeholder |
| `/property-cleanouts-san-jose/` | route file / Shared service | I+S | Property cleanouts in San Jose, with the next use in mind | Complex child; global + parent/assessment | Complete |
| `/property-clearing/` | route file / Base / hub | I+S | Complex property cleanup, organized around what happens next | Global; service children/assessment | Complete |
| `/request-assessment/` | root route / Base / conversion | I+S | Request an assessment | Global CTA; lead form | Complete; PRR price exposure |
| `/rodent-dropping-cleanup-san-jose/` | route file / Shared service | N−S | Rodent dropping cleanup in San Jose, limited to cleaning | Specialty child; intentionally restricted links | Gated |
| `/senior-downsizing-san-jose/` | route file / Base / specialty | N−S | Senior downsizing support in San Jose, organized one decision at a time | Limited hub links; assessment | Gated/older bespoke page |
| `/service-areas/` | route file / Base / area hub | I+S | Property cleaning and cleanup across the South Bay & Peninsula | Global; city hubs/services | Complete; unsupported cluster copy |
| `/service-areas/mountain-view/` | `[city]/index.astro` / Base / city hub | N−S | Specialty property cleaning and cleanup in Mountain View | Area parent; 2 services/assessment | Complete, publication-gated |
| `/service-areas/sunnyvale/` | same dynamic city template | N−S | Specialty property cleaning and cleanup in Sunnyvale | Area parent; 2 services/assessment | Complete, publication-gated |
| `/service-areas/campbell/` | same dynamic city template | N−S | Specialty property cleaning and cleanup in Campbell | Area parent; 2 services/assessment | Complete, source-gated |
| `/service-areas/mountain-view/hoarding-cleanup/` | `[city]/[service].astro` / city service | N−S | Hoarding cleanup in Mountain View, planned around the property | Hoarding parent; hub/sibling/assessment | Complete; unsupported implication |
| `/service-areas/mountain-view/estate-cleanout/` | same dynamic service template | N−S | Estate cleanout in Mountain View, planned around the property | Estate parent; hub/sibling/assessment | Complete, publication-gated |
| `/service-areas/sunnyvale/hoarding-cleanup/` | same dynamic service template | N−S | Hoarding cleanup in Sunnyvale, planned around the property | Hoarding parent; hub/sibling/assessment | Complete, publication-gated |
| `/service-areas/sunnyvale/estate-cleanout/` | same dynamic service template | N−S | Estate cleanout in Sunnyvale, planned around the property | Estate parent; hub/sibling/assessment | Complete, publication-gated |
| `/service-areas/campbell/hoarding-cleanup/` | same dynamic service template | N−S | Hoarding cleanup in Campbell, planned around the property | Hoarding parent; hub/sibling/assessment | Complete, source-gated |
| `/service-areas/campbell/estate-cleanout/` | same dynamic service template | N−S | Estate cleanout in Campbell, planned around the property | Estate parent; hub/sibling/assessment | Complete, source-gated |
| `/services/` | route file / Base / service index | I+S | What Aseptaclean handles | Footer; three service hubs | Complete |
| `/sms-notification-consent/` | standalone protected route | I−S | SMS Notification Consent | Intentional orphan | Complete/protected exception |
| `/specialty-cleaning/` | route file / Base / hub | N−S | Specialty cleaning for conditions outside the routine | Global; specialty children | Gated hub |
| `/terms/` | route file / LegalPolicy | I+S | Terms of Use | Footer legal | Complete |
| `/thank-you/` | root route / Base / conversion state | N−S | Your request is in. | Form-success destination only | Complete, intentional utility |
| `/who-we-help/` | route file / Base / audience hub | I+S | One property. Different pressures. | Footer; services/assessment | Complete |
| `/window-cleaning-san-jose/` | route file / Shared service | N−S | Window cleaning in San Jose for the final handoff | Detailed child; global + parent/assessment | Gated |
| `/404` | `src/pages/404.astro` / Base / error | N−S | This page is not part of the plan. | Error route | Complete |

The production build initially generates 48 pages, then correctly prunes two `/dev/*` routes, leaving 46 deployable HTML pages. The city system is data-driven: three hubs come from `src/pages/service-areas/[city]/index.astro` plus `cityHubPages.ts`; six service pages come from `[city]/[service].astro` plus `serviceCityPages.ts`, `cityFacts.ts`, and `serviceCityImplications.ts`. There are no nine duplicated page implementations.

# Copy / Positioning Audit

The dominant positioning is now **specialty property cleaning and complex cleanup**. Header taxonomy, `/services/`, the three hubs, city hubs, service-page eyebrows, forms and closing CTAs form one understandable system. The site does not primarily present as a generic house cleaner, remediation contractor, or collection of unrelated businesses.

The remaining drift is material: the Handoff Standard ambiguity can make Aseptaclean sound like the disposing party; “Debris Removal” remains a prominent indexable service label, though its body correctly explains the provider boundary; and repeated operational language makes parts of the site feel like documentation/process consulting. No prohibited `gross filth`, noun-form `hoarder`, affirmative human-biohazard service, fake review, or fabricated project proof was found. The experience and cost statements quoted above require evidence or qualification before launch.

# Visual / CSS Audit

The current site reads as one design system: Inter, restrained navy/cool-gray palette, consistent 1200px shell, shared header/footer, buttons, form patterns, spacing and CTA bands. Shared service pages and hubs are visually related without being identical. City pages extend this system rather than creating a separate microsite.

Private Residence Reset is intentionally more editorial and remains visually compatible, though its process copy is stale. Senior Downsizing uses an older bespoke composition but is not visually broken; it is correctly gated. `/data-request/` and `/projects/` visibly read as unfinished/empty by design. The protected SMS page is a deliberate separate system. The chief CSS defect is contrast, followed by accumulated page-scoped duplication and breakpoint inconsistency.

# Responsive Audit

The 13 required representative pages were rendered and visually inspected at 320, 390, 768, 1024, 1280 and 1440px: 78 page/viewport combinations. Screenshots and contact sheets are under ignored `artifacts/full-site-check/responsive/`.

- **Pass:** zero horizontal overflow; one H1 throughout; forms and cards stay within the viewport; CTAs do not clip; mobile navigation remains usable; sticky CTA padding prevents final-content obstruction; footer remains usable.
- **Needs polish:** multiple 320px H1s leave single-word lines; the mobile fixed CTA is slightly below the preferred 44px comfort target.
- **Third-party behavior:** Termly can overlay the lower viewport at 320/1024 and can precede the site's skip link in focus order. Turnstile returns localhost error `110200`/HTTP 400 because localhost is not an approved hostname. These are local-environment observations; production-domain smoke testing remains required.

Mobile therefore passes mechanical layout QA, but not a fully clean visual/accessibility release gate.

# City Page Audit

All intended treatments are present. City hubs have a strong hero, integrated assessment form, editorial planning section, prioritized Hoarding/Estate tiles, restrained future-service structure, and closing CTA. Service × city pages visually distinguish white, sourced **Verified city facts** from pale-blue numbered **Operational implications**; they do not merge into one generic block.

The same reusable templates produce every city variant, and the content model preserves fact IDs and publication state. Design is not the city blocker. Semantic source integrity and owner availability confirmation are.

# Local SEO Audit

The 15 `CityFact` records all contain a source URL, source type, `verifiedAt`, and `reviewAfter`; there are 11 unique official/provider URLs. Operational implication records structurally cite fact IDs unless explicitly based on the operating model. Mountain View, Sunnyvale and Campbell provider, permit, facility, parking/moratorium and sweeping sources were checked against their current official pages where accessible.

The following require the exact label **UNSUPPORTED LOCAL CLAIM**:

1. **UNSUPPORTED LOCAL CLAIM** — “Mountain View has residential streets below that width…” (`src/data/serviceCityImplications.ts:70`). The cited fact proves the city's under-36-foot container restriction, not that Mountain View has residential streets below that width.
2. **UNSUPPORTED LOCAL CLAIM** — “Campbell, Saratoga-adjacent, and the western San Jose neighborhoods — closer-lot properties where access and parking often shape the plan.” (`src/data/servicePages.ts:220`). No fact/source supports the property-form generalization.
3. **UNSUPPORTED LOCAL CLAIM** — “Mountain View, Sunnyvale, and Santa Clara — a mix of longtime family homes and faster-turnover rentals…” (`src/data/servicePages.ts:224`). No source supports the tenure/turnover comparison.
4. **UNSUPPORTED LOCAL CLAIM** — “San Jose's southern neighborhoods, where larger lots and multi-generational households often mean a bigger sort-and-clear phase…” (`src/data/servicePages.ts:228`). No source supports the housing/household generalization.

Campbell additionally has a **source-drift blocker**: `cityFacts.ts:232` renders 50.5% owner occupancy and identifies 2019–2023 estimates, while the linked current Census QuickFacts surface now reports 51.7% for 2020–2024. The record itself warns that it must be manually re-read at the publish gate. This is not necessarily fabrication, but the live source no longer substantiates the exact rendered claim.

# Technical SEO Audit

All ordinary indexable pages have unique titles, unique meta descriptions, one H1, self-canonical, correct robots and appropriate JSON-LD. City service pages use `Service`, `BreadcrumbList`, and body-matched `FAQPage` when FAQ exists. City hubs use `CollectionPage` and `BreadcrumbList`.

Schema consistently references one real Aseptaclean LocalBusiness entity at `/#business`. There are no fake city locations, street addresses, per-city LocalBusiness copies, `AggregateRating`, review schema, unsupported `priceRange`, schema-only FAQs, or unrelated canonicals. `/404` and the byte-protected SMS route are documented exceptions.

# Indexation Audit

| State | Count | Routes |
| --- | ---: | --- |
| Index, follow + sitemap | 23 | `/`, About, Contact, three legal pages, Debris, Deep, Detailed hub, Estate Checklist, Estate SJ, Extreme, FAQ, Handoff, Hoarding SJ, Move-out, PRR, Property Cleanouts, Property Clearing, Assessment, Service Areas, Services, Who We Help |
| Index, follow; absent sitemap | 1 | `/sms-notification-consent/` — protected carrier-review exception |
| Noindex, follow; absent sitemap | 22 | 404, Data Request, Projects, Thank You, Specialty hub, 7 gated San Jose services, Senior Downsizing, and all 9 city routes |
| Other | 0 | — |

All nine city routes currently have `noindex, follow`, are absent from the sitemap, have self-canonicals and at least one inbound link, and pass machine requirements for a future state change. Human decisions/checks remaining: confirm actual service availability in each city; resolve the “Also serving” assertion; re-verify Campbell Census data; substantiate/remove the Mountain View implication; clear the contrast failures; and complete a final owner copy/source review. Do not index them before those items close.

# Internal Links

A static scan of all 46 deployable HTML files found **zero broken rendered internal `href` or form-action targets**. The crawler's sole reported `/property-cleanouts-for-managers/` failure is a stale seed in `scripts/full-site-audit.mjs`, not a site link.

There are five noindex orphans excluding 404: Data Request, Projects, Thank You, Rodent Dropping, and Pigeon Dropping. Their isolation is intentional or gate-related. SMS is an intentional indexable orphan. City hubs receive indexable links from `/service-areas/` and `/property-clearing/`; each city child receives an indexable parent-service link. City hubs link to both city services; city services link to their hub, sibling service, San Jose parent, Handoff Standard and Assessment.

Six globally exposed gated service routes receive links from all 23 ordinary indexable source pages: Animal Waste, Commercial, Eviction, Post-construction, Specialty hub, and Window Cleaning. Senior Downsizing receives three indexable links. All nine city routes receive indexable inbound links. These are documented owner choices, not automatically broken links, but they expose availability and quality expectations to users despite `noindex`.

# Navigation

The taxonomy now leads with Detailed Cleaning, Specialty Cleaning and Complex Property Cleanup and is consistent across desktop mega navigation, mobile navigation and footer. It no longer reads primarily as hauling. “Debris Removal” and property-clearance concepts remain visible as individual services but sit under the correct umbrella. Header, mobile and footer destinations agree. The missing current-route indicator is the main accessibility/navigation gap.

# Forms / Conversion

Compact forms, full assessment form, city forms, Text a Photo and phone CTAs render at all tested widths. Consent copy remains intact; native labels, fieldsets/legends and validation hooks are present. The endpoint remains the single Cloudflare Pages Function at `functions/api/lead.ts`, public contract `/api/lead`; no Astro API route or adapter regression exists.

`npm run qa:phase3:endpoint` passed configuration, validation, deduplication, R2 persistence, HubSpot/Resend routing, Private Residence Reset mapping, SMS fallback and a staging submission. Local Turnstile refusal is hostname configuration, not an endpoint failure. The unresolved conversion defect is the public PRR investment-range pricing quoted under Critical Issues.

# Accessibility

Positive findings: one H1 in all 78 responsive cases; generally sound heading order; keyboard-capable native navigation/FAQ behavior; visible global focus styles; skip link; labels; fieldsets/legends; `aria-invalid` and error handling; reduced-motion support; decorative/brand image handling; and adequate content clearance above the sticky CTA. The honeypot is intentionally hidden and is not a missing-label failure.

Axe at 390px on all 13 representative routes found serious contrast violations in shared photo-slot/portrait labels, city implication numerals and process numerals. This prevents an accessibility pass. Termly can become the first focusable element ahead of the site's skip link. Inline text links have small geometric boxes but are standard inline targets; the fixed CTA meets WCAG 2.2's minimum while remaining below the more comfortable 44px target.

# Performance / Front-End Quality

The built first-party payload is moderate: main CSS about 46KB, Assessment CSS about 22KB, PRR CSS about 15KB, assessment JS about 14KB, Inter WOFF2 about 47KB, and brand images about 250KB total. There is no large photography payload. The production bundle emits Inter only.

Lighthouse mobile locally scored performance 51 on home and 62 on About, with SEO 100 and accessibility 97/100. Third-party Termly on ordinary routes and Turnstile on form routes introduce external/render-blocking sensitivity; these scores should be repeated on the deployed hostname. CSS duplication, mixed breakpoints, unused font dependencies and dead components are worthwhile post-launch cleanup, not reasons to refactor before the critical findings are resolved. Motion is restrained and reduced-motion-aware.

# Proof / Images

The public asset inventory contains three real brand files only: `aseptaclean-site-icon-512.png`, `aseptaclean-wordmark.png`, and `aseptaclean-wordmark-reversed.png`. The only real `<img>` uses are brand marks. No stock images, generated property images, generated people, project photos or case-study imagery were found.

There are 40 visible “Photo slot” placeholders across 21 routes, plus a founder portrait placeholder. They reserve layout without pretending to be proof. `/projects/` explicitly says documentation will appear when real and remains noindex. No page visually claims a completed project, testimonial, review, rating or before/after result.

# Documentation Drift

- `README.md:5`, `:25`, `:51`, and `:55` still describe a one-page launch and forbid multi-page expansion. The file roles/workflow are obsolete relative to AGENTS.md and the current 46-page build.
- `wrangler.toml:57` has the stale public service-area value “San Jose and the South Bay.”
- `CURRENT-BUILD-AUDIT.md:11` still foregrounds visible launch-gate banners even though the later copy pass removed them. It should be regenerated, not extended with more layered corrections.
- `CITY-PAGES-BUILD-REPORT.md` preserves the earlier completed-job gate conflict before later reconciliation. Its historical/current sections should be explicitly separated.
- `FULL-SITE-VISUAL-IMPLEMENTATION-REPORT.md` scopes “44/44” routes ambiguously and reports a contrast pass that missed the selectors found by the current Axe run.
- `src/data/site.ts:242` still refers to “all 36 routes”; `src/components/Footer.astro:52` refers to 37. Other comments still describe city routes as absent. These are code-comment drift.
- `CURRENT-SITE-MAP.md`, current AGENTS.md, and the amended `docs/19-SYSTEM-AND-SITEMAP.md` align with the 46-route/current city-gate state.

# QA Results

| Check | Result | Interpretation |
| --- | --- | --- |
| `npm run check` | PASS: 0 errors, 0 warnings, 4 hints | Real pass; cleanup hints remain |
| `npm run build` | PASS: 48 generated, 2 dev routes pruned, 46 deployable | Production restored after staging QA |
| `npm run qa:seo` | PASS: 46 pages, 9/9 city routes, 0 errors/blockers | Structural pass; does not catch semantic source drift |
| `npm run qa:gate6` | PASS: 0 absent; 167 extracted | Copy-trace pass; 141 unreachable slots limit coverage |
| `npm run qa:phase3:endpoint` | PASS | Lead architecture and staging path intact |
| `npm run qa:phase4:static` on staging | PASS | H1/canonical/noindex/JSON-LD/sitemap/claims/assets pass |
| `npm run qa:phase4:deep` | INCOMPLETE | First sandbox launch aborted; approved launch then hung on external browser behavior and was terminated. Superseded for viewport/a11y evidence by the completed custom sweep, but the script itself needs hardening. |
| Responsive Playwright sweep | 78/78 rendered; 0 overflow; 0 H1-count failures | Real mechanical pass at all six required widths |
| Axe at 390px | FAIL: serious contrast violations | Real accessibility failure |
| Static internal-link scan | PASS: 0 broken rendered targets | Real pass |
| Full crawler | 45 paths; one stale-seed false positive | Tool expectation issue, not a site link failure |
| Lighthouse mobile | Home 51/97/96/100; About 62/100/96/100 | Current local result; production hostname retest required |
| Turnstile local browser check | HTTP 400 / `110200` | Intentional hostname/test-environment exception; production smoke test required |

# Recommended Fix Order

1. Remove the PRR public investment price ranges while preserving the approved $195 assessment fee.
2. Resolve every **OPERATING-SCOPE CONFLICT — HAULING**, beginning with `/handoff-standard/`, and re-sweep visible copy, metadata and schema for clear authorized-provider attribution.
3. Obtain the owner decision on actual Mountain View, Sunnyvale and Campbell availability; reconcile the public “Also serving” label with that decision.
4. Correct all four **UNSUPPORTED LOCAL CLAIM** items and re-verify/update the Campbell Census record against an authoritative current source.
5. Fix the shared contrast selectors, rerun Axe on the full representative set, then address 320px H1 orphans and the mobile CTA comfort target.
6. Reconcile `wrangler.toml` with the canonical “South Bay & Peninsula” production fact and run a deployed-environment string smoke test.
7. Replace the retired Private Residence Reset process and review the unsupported experience/frequency and cost-comparison statements against available evidence.
8. Confirm every globally visible gated service is actually available; keep or narrow its navigation exposure by explicit owner decision.
9. Repeat production-domain forms, Turnstile, Termly keyboard/focus, Lighthouse, link, schema, robots and sitemap QA.
10. Only then change the nine city publication states and sitemap membership in one controlled release; verify all nine immediately after deploy.
11. Reconcile stale documentation and test seeds.
12. Perform dead-component, dependency, CSS and breakpoint cleanup as a separate non-launch refactor.
