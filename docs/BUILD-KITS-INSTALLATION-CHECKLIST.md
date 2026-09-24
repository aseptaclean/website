# Website build-kit installation checklist

Updated 2026-09-20. **Homepage, estate, hoarding, rodent, trauma, and extreme public-service packages plus estate and rodent landings, contact, and the submission-flow thank-you page and two email designs installed locally. Live email delivery and email-client testing remain unverified.** Reuse this file for every subsequent requested package; work on one package at a time. No push or deployment authorized.

## Reference and authority

- [x] Read root `AGENTS.md`, `START-HERE.md`, `docs/README.md`; no nested AGENTS.md found in the repository file inventory.
- [x] Inspect dirty working tree before extraction. Existing source, documentation, redirects, deleted Services page, assets and output are unrelated work to preserve.
- [x] Extract `aseptaclean-website-build-kits-2026-09-19-r01.zip` into `docs/reference/build-kits-2026-09-19-r01/`, retaining its enclosing folder and all ten package folders.
- [x] Read [00-MASTER-INDEX.md](reference/build-kits-2026-09-19-r01/aseptaclean-website-build-kits/00-MASTER-INDEX.md) and every package's `PACKAGE-STATUS.md` and `START-HERE.md`.

All package paths below are relative to `docs/reference/build-kits-2026-09-19-r01/aseptaclean-website-build-kits/aseptaclean-<package>/`. Every package starts with its status and start files. The homepage uses `01-APPROVED-COPY.md` for wording and `reference/home-preview.html` for composition, then `02-LAYOUT-AND-ASSETS.md` and `reference/home.css`; integration and QA are in files 04 and 05. Other packages use their exact fragment and visual preview as specified by their start file; extracted copy is supporting material, not permission to override HTML. Preserve CSS cascade order and use either embedded or extracted CSS, never both.

Current owner instructions govern this preparation. The homepage package's historical instruction against another progress document does not override the owner's explicit request for this one checklist. Package folders are references, not routes or an automatic replacement of repository instructions. Before implementation read `docs/ASEPTACLEAN-DESIGN-SPEC.md`, claims law (`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`), verified facts, integration contract and applicable QA records. Preserve supplied wording, images, section order and interactions; record any material authority conflict before resolving it. Provisional copy stays provisional and unchanged.

## Package-to-route inventory

Page file paths are relative to `src/pages/`. All nine page targets exist; none matches a redirect source in `public/_redirects`.

| Package | Target and classification | Existing page file | Package authority/support | Progress |
| --- | --- | --- | --- | --- |
| home | `/` — public homepage | `index.astro` | Copy document; `reference/home-preview.html`, `reference/home-fragment.html`; files 02–05 | Installed locally; verification/limitations below |
| contact | `/contact/` — public contact | `contact/index.astro` | `contact-fragment.html`, `contact.css`, `IMPLEMENTATION.md`; `contact-copy-provisional.txt` | Installed locally; copy provisional; verification below |
| estate-service | `/estate-cleanout-san-jose/` — public service | `estate-cleanout-san-jose/index.astro` | `estate-service-fragment.html`, `.css`; `01-APPROVED-COPY.md`, `02-IMPLEMENTATION-AND-QA.md` | Installed locally; verification below |
| estate-landing | `/estate-cleanout-san-jose/assessment/` — advertising landing | `estate-cleanout-san-jose/assessment/index.astro` | **Current:** `aseptaclean-estate-inherited-landing-2026-09-20-r01.zip`; `estate-inherited-landing-fragment.html`, preview, copy extraction and `IMPLEMENTATION-AND-QA.md` | Replaced locally 2026-09-20; current verification below |
| extreme-service | `/extreme-cleaning-san-jose/` — public service | `extreme-cleaning-san-jose/index.astro` | `extreme-service-fragment.html`, `.css`; `APPROVED-COPY.md`; detailed START-HERE | Installed locally; verification/limitations below |
| hoarding-service | `/hoarding-cleanup-san-jose/` — public service | `hoarding-cleanup-san-jose/index.astro` | `hoarding-service-fragment.html`, `.css`; `01-APPROVED-COPY.md`, `02-IMPLEMENTATION-AND-QA.md` | Installed locally; verification below |
| rodent-service | `/rodent-dropping-cleanup-san-jose/` — public service | `rodent-dropping-cleanup-san-jose/index.astro` | `rodent-service-preview.html`, `rodent-service-fragment.html`, `.css`; detailed START-HERE | Installed locally 2026-09-19; see verification below |
| rodent-landing | `/rodent-dropping-cleanup-san-jose/assessment/` — advertising landing | `rodent-dropping-cleanup-san-jose/assessment/index.astro` | `rodent-landing-fragment.html`, `.css`; `rodent-landing-copy-provisional.txt` | Installed locally; copy/photos provisional; launch blockers below |
| trauma-service | `/crime-scene-trauma-cleanup-san-jose/` — public service | `crime-scene-trauma-cleanup-san-jose/index.astro` | `trauma-service-fragment.html`, `.css`; `APPROVED-COPY.md`; detailed START-HERE | Installed locally; verification below |
| submission-flow | `/thank-you/` plus existing campaign receipt pages; customer and owner emails (not URL pages) | `thank-you.astro`; campaign files below | `submission-flow-fragment.html`, `IMPLEMENTATION.md`; three `*-design.html` and corresponding `.txt` templates | Generic `/thank-you/` and both email designs installed locally; campaign receipts preserved; live email-client/provider verification pending |

Submission-flow campaign routes, all existing and explicitly outside this thank-you-only installation: `/estate-cleanout-san-jose/assessment/thank-you/`, `/hoarding-cleanup-san-jose/assessment/thank-you/`, `/rodent-dropping-cleanup-san-jose/assessment/thank-you/`; each maps to `src/pages/<service>/assessment/thank-you.astro`. Their route-specific offers, wording, conversion recovery and deduplication remain unchanged. The approved white design is installed only on the existing generic `/thank-you/` successful-submission route. Do not create a `/submission-flow/` page.

Route evidence: actual Astro page files, `src/data/launchArchitecture.ts`, `src/data/ppcEstate.ts`, `src/data/ppcRodent.ts`, page canonical props and `public/_redirects`. Source currently includes all nine page targets in the indexable set, including both advertising pages; receipt routes remain noindex. This is source inspection, not a fresh build or live-site verification. Advertising pages stay out of public service menus/cards/footer directories.

Preserve `/services/ → /#services` (301), `/estate-cleanout` and `/estate-cleanout/ → /estate-cleanout-san-jose/assessment/` (301), and all other redirects. `/request-assessment/` remains retired/not-found. No package covers the hoarding advertising page, Detailed Deep Cleaning, About, legal pages or other auxiliary routes; do not infer an installation target for them.

## Integration boundaries and unresolved items

- Existing framework: static Astro, Cloudflare Pages Functions. `/api/lead` is implemented only by protected `functions/api/lead.ts`; do not edit it or install an Astro Cloudflare adapter.
- Existing forms: home/contact use `AcCompactForm`; hoarding/extreme/trauma use `AcServicePage` and its compact form; rodent public/campaign and estate campaign use `PpcHeroForm`. Preserve existing field names, requiredness, enums, consent, Turnstile, uploads, attribution and server-confirmed redirects. The estate public package's bottom form must be mapped to a supported existing form during its integration.
- Existing email targets: `sendCustomerEmail` and `sendOwnerFallbackEmail` in `functions/_lib/providers.ts`, through Resend. Both now send approved inline-style HTML with plain-text alternatives. Owner email continues to run when SMS fails/is skipped; accepted-storage ordering, delivery ledger, provider-failure handling and idempotent duplicate suppression remain unchanged in the protected endpoint.
- Submission-flow blocker: current receipt UI reads URL status flags; API returns a confirmation code and delivery status, not a secure receipt containing service/ZIP details. Design the accepted-receipt/data mapping before adding those details; never put personal information in query strings or invent sample receipt data. Endpoint protection remains applicable; report any implementation requirement that cannot be met without changing it.
- Supplied photographs are described as illustrative, and some packages explicitly require suitable production imagery. Preserve extracted bytes. Verify provenance/approval against repository asset rules before production use; never claim they show actual Aseptaclean jobs. Do not silently substitute assets.
- Package-specific CTA/layout decisions differ from older repository defaults. Reconcile only the requested package's scope, preserving working navigation/forms. `docs/03-INTEGRATION-CONTRACT.md` also retains stale hero-form and assessment-utility instructions: newer AGENTS.md owner decisions supersede them; do not restore those layouts/routes.
- Provisional copy on contact, estate landing and rodent landing is not approved by layout approval. Preserve its status; no rewriting or automatic promotion.

## Verification and reusable completion gates

- [x] ZIP integrity, unique archive paths and safe extraction paths checked: 88 files, 88 unique paths; all extracted files byte-identical to ZIP.
- [x] All 80 entries across 11 supplied checksum manifests pass (homepage reference files are also covered by its nested manifest).
- [x] Nine page targets and four existing thank-you candidates verified in source; redirects inspected without modification.
- [x] Pre-existing file hashes verified after preparation; only the required append to `docs/05-CURRENT-DECISIONS.md` differs, with its prior content preserved exactly.
- [ ] For the next requested package: reread status/start and controlling documents; inspect current target and dependencies; record concrete conflicts, field/asset mappings and touched files here.
- [ ] Implement only that package using Astro-compatible markup and scoped styles; omit preview wrappers, demo submissions and duplicated CSS/scripts. Preserve metadata/canonicals/indexing/analytics/consent/backend behavior unless the requested integration requires a scoped change.
- [ ] Run appropriate existing build/type/copy/route/analytics/form checks. Inspect shared-component consumers, including Detailed Deep Cleaning if changing AcServicePage. Record commands and actual outcomes here.
- [ ] Render affected pages and neighboring sections at 1440, 820, 390px, plus 320px overflow and 200% zoom; include package-required 1024/768 widths where specified. Record screenshot paths, hero consistency, crops, wrapping, keyboard/menu/FAQ/anchor/phone behavior and real supported success/error states.
- [ ] Submission-flow only: verify neutral direct navigation, accepted receipt, no-email cases, escaping, long input, protected attachments, actual delivery status and duplicate prevention; controlled email-client checks require their own authorized test context.

At the initial inventory checkpoint, build, browser, interaction, live submission and email-client tests were not run. No visual QA or delivery success is claimed. No pages implemented, no real inquiries/emails sent, no push or deployment.

Archive SHA-256: `02c5a3fa77742e13833ee315c17ce5e0a3697606b480c949d9708917ce466cce`.


## Homepage installation — 2026-09-19

**Scope:** only `aseptaclean-home` v1.2 → `/`. Other kits remain pending. No push/deploy or live leads/emails. Existing unrelated work preserved against the task-start file hashes in `output/home-kit-install/baseline-hashes.json`.

- [x] Reread package status/start, files 01–05 and repository instructions; inspect `reference/home-preview.html` in Chrome before adapting the fragment.
- [x] Use `01-APPROVED-COPY.md` for wording and final preview/CSS for composition. Hero sentence blocks, full-width Why/Services/Who/Area headings, three Why points below the 45/55 pair, horizontal six-card grid, all 34 cities, closing text without a button, and bottom form are installed.
- [x] Import one adapted CSS file and the unchanged atlas. No preview/export wrapper, demo success handler, demo detail panel or duplicate CSS/JS installed. Local Inter and build-time SVGs replace preview-host resources.
- [x] Preserve real public-service URLs, existing About/Contact navigation destinations, redirects, title/meta/social/canonical/robots/JSON-LD, analytics and legal/consent controls. Legacy anchors `services`, `why`, `who-we-help`, `process`, `service-area`, `home-contact`, `contact`, `hero` and `hero-form` remain available. Assessment links use the existing tracked `#home-contact` target and focus the first form field; section ID is `ac-form`.
- [x] Keep `AcCompactForm` submission/error/validation/Turnstile/upload code and backend unchanged. The opt-in `kit` prop changes labels/placeholders and service options only. Six approved service labels use existing accepted values; “Help me choose a service” posts `Not sure`, and Estate posts `Inherited or estate property`. Fields remain `full_name`, `phone`, `email`, `property_zip`, `property_situation`, `property_detail`; preserve multipart `property_media[]`, required consent, hidden fields, attribution and idempotency. Existing message requiredness remains, with no minimum length.

**Scoped authority resolutions:** this later homepage request and kit supersede the older homepage hero-height equality rule, CTA/copy, section compositions and illustrative-image restrictions for this supplied homepage only. Other pages retain their existing contract. Atlas images remain explicitly illustrative in accessible descriptions and are not presented as job evidence. Current user instruction to preserve navigation destinations takes precedence over the kit's proposed navigation destination changes: About → `/about/` and Contact → `/contact/` remain, with the real logo. Existing legal disclosures remain in the footer; form consent/upload/security additions are required production differences from the demo. All tracking stays in this checklist, superseding the kit's obsolete `PROGRESS.md` instruction.

**Files changed this step:**

- `src/pages/index.astro` — approved homepage composition/copy; preserved metadata/schema and form identity.
- `src/styles/home-kit.css` — homepage-only extracted cascade, framework adapters and accessible focus colors. The prior `src/styles/aseptaclean-home.css` is preserved but no longer imported by home.
- `src/components/home/HomeHeader.astro`, `HomeFooter.astro`, `HomeIcon.astro` — homepage chrome and local SVGs; shared Header/Footer remain untouched.
- `src/data/homeKit.ts` — single homepage six-service map using existing URLs and accepted form values.
- `src/assets/aseptaclean/home-kit-photos.jpg` — byte-identical supplied atlas, p0 hero, p1 Why, p2 Who, p3–p8 service cards.
- `src/layouts/BaseLayout.astro` — optional homepage root and header/footer slots; unchanged defaults on other routes.
- `src/components/ac/AcCompactForm.astro` — opt-in kit display labels/placeholders/options; other callers keep their prior output/behavior.
- This checklist and appended `docs/05-CURRENT-DECISIONS.md`; evidence/scripts under `output/home-kit-install/`.

**Typography mapping:** original h1/h2/h3 sizes → `.ac-type-home-h1/h2/h3`; card, audience, band, process, county, quiet-band and footer overrides → `.ac-type-home-card/audience/band/step/county/quiet/footer`. Original responsive values and cascade order retained; no typography gate weakened. Reference focus slate has only 2.96:1 contrast on white; its existing darker slate `#526f87` is used for light-surface focus outlines, white on navy. No normal-state palette change.

| Verification | Actual result / evidence |
| --- | --- |
| `npm run build:local` | PASS; 54 Astro pages before dev-route pruning. `output/home-kit-install/build.log` |
| `npm run check` | PASS; 0 errors, 0 warnings, 24 hints. `check.log` |
| Computed type law, homepage, nine widths 320–1920 | PASS; every heading size through an `ac-type-*` role; minimum H1/body ratio 2.25. `type-law.log` |
| `npm run qa:situations` | PASS; six shared options and estate value accepted by real validator. Homepage explicitly reuses these values. |
| `npm run qa:phase3:endpoint` | PASS; controlled provider/storage adapter tests cover validation, uploads, duplicate submission, notifications and mappings. No production delivery. |
| `npm run qa:analytics` / `qa:analytics:events` | PASS, 13/13 tagging checks and 38/38 browser event/consent/attribution checks; `analytics-events.log`. |
| Exact homepage copy and metadata | PASS, 14 assertions against rendered kit copy and pre-change metadata/JSON-LD; `copy-metadata-results.json`. Demo substitutions and required production additions documented above. |
| Responsive and visual comparison | 1440, 1024, 820, 390 and 320px: no homepage horizontal overflow, duplicate IDs or missing content; one form, six service links, 34 cities. Hero heights 552.875 / 540.734 / 507.359 / 569.406 / 652.703px. Local-Inter reference hero dimensions and photo boxes match at every width. `visual-results.json`. |
| Accessibility | Zero automated WCAG A/AA violations at all five widths (`axe-*.json`); keyboard menu, Escape/focus return, service links, phone targets, form focus and error announcements checked. Normal/hover/keyboard-focus contrast results in `contrast-results.json`. |
| Zoom | 200% CSS zoom and equivalent 720×500 CSS-pixel desktop reflow pass overflow checks. Screenshots `actual-200-percent.png`, `actual-200-percent-reflow.png`; browser toolbar zoom was not separately automated. |
| Form behavior | 29 isolated browser assertions pass: required consent, field names/options, real action, errors retain input, busy state disables repeat clicks, accepted mocked response follows existing thank-you routing, no PII in receipt URL. `interaction-results.json`. Security response was synthetic only in intercepted test requests, never in screenshots/live traffic. |
| Shared consumers | 20 rendered checks: Contact and hoarding/extreme/deep/trauma at 1440/820/390/320. All retain shared header/footer, six existing dropdown options, Send Message and `/api/lead`; no homepage CSS/root leaks. `regression-results.json`. Two 320px overflow findings below. Other pre-existing built HTML files outside these five and home remain byte-identical to the pre-change build. |

**Screenshot paths:** all under `output/home-kit-install/`: `actual-{1440,1024,820,390,320}.png` and matched `reference-*.png`; individual hero/Why/services/area/form/footer captures use `actual-<width>-<section>.png`. Full-page captures retain chrome; final isolated sections are captured directly at document coordinates to avoid sticky-header overlays. Reference export supplies no font-face and falls back to Arial; the original was inspected, then a QA-only copy loads the same local Inter as production for matching geometry. Original kit files are unchanged. Other page captures: `regression-<route>-<width>.png`.

**Remaining issues / boundaries:**

1. Real Turnstile cannot verify the production site key on this local host; the homepage correctly disables submission and offers its existing recovery message. Live Turnstile → CRM/private storage/email delivery is unverified here. Local intercepted UI tests and provider-adapter tests are not a claim of live delivery.
2. `qa:copy` stops at the already-retired `dist/services/index.html`; no hub was restored and the unrelated audit script was not rewritten. The direct homepage copy audit passes.
3. `qa:launch` reports five existing estate-public-page links to hidden routes (property cleanouts, three estate city pages, FAQ), all outside this package; see `launch.log`.
4. The hoarding and deep-cleaning public pages expand to 366px at a 320px viewport when their existing flexible Turnstile has a 300px minimum plus form padding. Homepage CSS is absent there; shared form styles/security configuration were not changed. Recorded in `regression-overflow.json`; not silently fixed as part of this homepage-only install.

**Next action:** await the owner's next requested package. Do not start another package or push/deploy.


## Estate service installation — 2026-09-19

**Scope:** only `aseptaclean-estate-service` → `/estate-cleanout-san-jose/`. The estate advertising
page at `/estate-cleanout-san-jose/assessment/` remains separate and unchanged. No push/deploy,
live lead or production email. Task-start hashes: `output/estate-service-install/baseline-hashes.json`.

- [x] Read standing instructions, package start/status/implementation/copy, current route,
  form integration, claims, facts, design specification and prior QA.
- [x] Decode the preview wrapper and compare: exact fragment is embedded unchanged
  (`comparison.json`). No preview/export wrapper or demo submission code installed.
- [x] Preserve section order, approved main copy, explicit hero line break, belongings caption and
  three steps below both columns, 3:2 documentation photo with final 107% top-center crop,
  founder passage, seven native FAQs, 34 cities, quiet strip and bottom form.
- [x] Extract both supplied JPEGs byte-for-byte; import CSS once in original cascade order.
  Local Inter and local SVG icons replace Google Fonts and preview-host icon loading.
- [x] Preserve real public navigation, logo, policies/cookie control, canonical/indexation and
  metadata. FAQ schema uses the approved visible answers; breadcrumb no longer promotes the
  hidden property-clearing hub. Campaign links remain outside public service navigation.
- [x] Scope all layout/CSS to `#ac-estate`; default BaseLayout and shared form behavior remain
  unchanged for other callers. Fix inherited hero padding locally, without a shared token edit.
- [x] Retain exact assessment/call wording. All assessment links focus the bottom form;
  phone values come from `site.business`. Existing analytics intent event recognizes the new anchor.
- [x] Replace demo form with real `AcCompactForm`: required name/phone/email/ZIP/message/consent,
  multipart photos, Turnstile, timestamps, honeypot, idempotency and accepted-response redirect.
  Six approved need labels remain; `property_situation` is the supported estate enum, and selected
  need is included in `property_detail`. No message minimum length. Consent/legal text and upload
  limits are the existing production contract, not the preview's shortened consent.

**Scoped authority resolution:** this explicit installation supersedes earlier estate-page
copy/CTA/shared hero-height and image restrictions only for this supplied reference. Supplied
illustrations remain labeled/accessibly described as illustrations, never Aseptaclean job evidence.
The real logo/sitewide navigation, mandatory qualifications, policies, security and production form
contract are intentional differences from the demo. Documentation and founder qualifications sit
beside the relevant copy; service/disposal/pest boundaries remain in the footer. No pricing or
advertising-page copy was imported. The fragment's hard break is retained; its second phrase wraps
further at some widths exactly as the browser reference does, without reducing type to force a fit.

**Changed files:**

- `src/pages/estate-cleanout-san-jose/index.astro` — sole page target.
- `src/styles/estate-service-kit.css` — scoped kit cascade, heading roles, production adapters.
- `src/components/estate/EstateHeader.astro`, `EstateIcon.astro` — route chrome and local icons.
- `src/assets/aseptaclean/estate-service-0.jpg` (1536×1024 atlas; p8 hero/intro, p2 belongings)
  and `estate-service-1.jpg` (512×341 documentation photo). Source: owner-supplied approved kit;
  reference illustrations, not proof. SHA-256 values in `assets.json`. Accessible descriptions
  preserve those supplied by the fragment; no company employee/job attribution.
- `src/layouts/BaseLayout.astro` — opt-in estate root ID, unchanged defaults.
- `src/components/ac/AcCompactForm.astro` — opt-in approved estate labels and lossless need mapping;
  shared submission path remains the existing one.
- `src/components/Analytics.astro` — add `#estate-contact` to existing CTA intent matching.
- This checklist and appended `docs/05-CURRENT-DECISIONS.md`; evidence under
  `output/estate-service-install/`.

**Typography mapping:** `.ac-type-estate-h1/h2/h3` and the scoped `band`, `quiet`, `scope`,
`audience`, `step`, `county`, `footer` roles preserve exact reference values and breakpoint order.
No shared type token or type-law gate changed.

Final checks and their limits:

| Verification | Actual result / evidence |
| --- | --- |
| `npm run build:local` | PASS; 54 Astro pages before dev-route pruning. `output/estate-service-install/build.log`. |
| `npm run check` | PASS; 0 errors, 0 warnings, 31 hints. `check.log`. |
| `qa:situations`, `qa:analytics`, `qa:launch` | PASS. Fifteen approved indexable routes; no public promotion of hidden marketing routes. `situations.log`, `analytics.log`, `launch.log`. |
| `qa:phase3:endpoint`, `qa:estate` | PASS controlled adapter tests; validation, uploads, idempotency, CRM/notification mapping and campaign branch. `endpoint.log`, `estate-endpoint.log`. No production delivery. |
| Rendered copy/assets | PASS 10 assertions: approved headings/paragraphs/FAQs, 34 cities, no campaign price/offer, correct schema/anchors, one bottom form, no demo notices, all logo/photo requests load. `content-results.json`. |
| Responsive comparison | 1440/1024/820/768/390/320px: zero horizontal overflow or duplicate IDs. Hero and all photo-box dimensions equal the local-Inter reference at every width. Hero heights respectively 675.25/607.25/585/579.34/670.86/752.23px. `visual-results.json`, `comparison-results.json`. |
| Images and spacing | Landscape documentation image remains 3:2 with final reference crop. Belongings steps stay below both columns; mobile stack, caption, quiet strip, FAQs and neighbors inspected. Inherited hero padding and H3 tracking corrected only inside the estate scope. Documentation section grows for mandatory qualifications; the real form grows for production consent/upload/security requirements. |
| Accessibility | Zero automated WCAG A/AA violations at all six widths (`axe-*.json`). Keyboard Services/mobile menu, Escape/focus return, all seven accordions and CTA form focus pass. Local darker focus outline uses `#526f87`; white on dark surfaces. |
| Zoom | 200% CSS zoom and equivalent 720×500 desktop reflow pass overflow checks; `actual-200-percent.png`, `actual-200-percent-reflow.png`. Browser toolbar zoom was not separately automated. |
| Public form/interactions | 37/37 assertions pass (`interaction-results.json`): exact CTAs, focus, legal links, enums, error retention, busy state, one accepted mocked request and existing receipt routing without PII. |
| Upload/security/consent | 5/5 assertions pass (`upload-results.json`): missing need and security token send nothing; real file selection serializes multipart bytes, estate enum/entry route and need; rejection preserves message and photo. Security token is synthetic only in intercepted test traffic. |
| Shared consumers | 28 rendered checks across home, Contact, hoarding, extreme, deep, trauma and estate campaign at 1440/820/390/320. No estate root/CSS leakage; all retain their existing form contracts. `regression-results.json` and `regression-*.png`. External widgets blocked during deterministic layout checks; this does not establish that earlier third-party Turnstile overflow on other routes is resolved. |
| Estate advertising page | Source, campaign data/components/assets unchanged by task-start SHA-256 comparison (`preservation-results.json`). Current browser retains one H1, `/api/lead`, the existing “Request My Free Walkthrough” button, and no estate kit CSS at all four widths. Existing submission cases adapted **in evidence only** to its current `request-walkthrough-panel` ID: 23/23 pass, including optional fields, success/events, rejection/network failure and duplicate prevention (`campaign-form-browser.log`). |
| Estate typography | Computed estate heading roles and H1/body ratio pass; minimum 2.25 at 320px. `type-law-estate.log`. The all-route check’s unrelated failures are listed below, not reported as a full-site pass. |
| Preservation | No unexpected modifications to pre-existing files. Protected `functions/api/lead.ts`, original kit files, redirects, campaign pages/data/components, and unrelated pre-existing work retain their task-start hashes. `preservation-results.json`. |

**Screenshots and local preview:** `http://127.0.0.1:4521/estate-cleanout-san-jose/`.
All captures are under `output/estate-service-install/`: matched `actual-{1440,1024,820,768,390,320}.png`
and `reference-*.png`; section captures at 1440/820/390/320 use `-hero`, `-belongings`,
`-documentation`, `-area`, `-form`, `-footer`. The original preview was decoded and compared
byte-for-byte; the QA-only reference uses the same local Inter and SVG glyphs for stable metrics.
Original package files remain untouched. Final H3 tracking correction is reflected in refreshed
actual captures; no font-size or wording reduction was used.

**Remaining verification limits / existing audit failures:**

1. **DEFERRED — live delivery:** real production-host Turnstile → CRM/private storage/email has not
   been exercised. Local UI tests intercept `/api/lead`; endpoint tests use controlled adapters.
   Third-party hosts are blocked for deterministic screenshot/interaction runs. No real inquiry sent.
2. **FAIL — legacy `qa:estate:page`:** the script expects the former hero trust bar and old form ID;
   it reports the old-layout mismatch and throws on missing `titleSizes`. The unchanged campaign is
   separately checked by current-layout screenshots and the 23-case form subset above. The original
   audit script was not rewritten as part of a public-service-only install.
3. **FAIL — legacy `qa:copy`:** still attempts to open retired `dist/services/index.html` and stops
   with ENOENT (`copy.log`). Direct estate rendered-copy comparison passes; no hub restored.
4. **FAIL — all-route type-law:** 49 routes × 9 widths, all H1/body ratios pass, but existing non-role
   heading selectors remain on `/private-residence-reset/` and nine city routes. Their source/styles
   were not touched. Estate has no such violations (`type-law.log`, `type-law-estate.log`).

**Stop:** only home and estate-service kits are installed. Other eight packages remain pending.
Nothing pushed or deployed.

## Route-by-route inquiry-form QA — 2026-09-22

- [x] Inventory the fresh built site instead of assuming shared-component coverage: 36 installed
  form routes, one form on each; About contains no form.
- [x] Exercise each actual rendered form at desktop and mobile for native validation, keyboard
  order, exact fields and originating route, route-specific service values, consent, supported
  photos, visible failure with retained entries, rapid-click suppression, thank-you navigation and
  accepted-lead-only tracking. Result: **992/992 passed** in
  `output/form-functional-qa/results.json`.
- [x] Extend endpoint/upload coverage through type, count, individual-size, combined-size and
  private-storage failures. Result: **47/47 passed** in `scripts/ppc-endpoint-check.mjs`.
- [x] Add the accepted-lead tracking contract and session dedupe to AcCompact and Quick Handoff;
  give Quick Handoff its real form ID and page-specific `entry_route`. Preserve all layout, copy,
  consent, Turnstile, honeypot, route and endpoint contracts.
- [x] Complete five new controlled production submissions plus the existing Contact control using
  the established company QA address, route-unique markers, blocked advertising hosts and no
  analytics consent. All six stored in private R2, created CRM deals, reached their thank-you page,
  and received separate Resend acceptance IDs for customer and owner messages. The rodent photo
  was retrieved through authenticated R2 access and matched the submitted bytes exactly.
- [ ] Resend acceptance does not establish delivery or inbox receipt; neither provider delivery
  events nor the two inboxes are available here.
- [ ] Thirty route/form production submissions remain blocked by the five-attempt/15-minute live
  limiter. Do not bypass the protective limiter. Production also lacks the local Estate form and
  several local upload controls, and maps live Trauma/Extreme submissions to the wrong situation.
  Deploy and repeat the production matrix only with current owner authorization.

Full controlled identifiers, commands, evidence boundaries and production discrepancies are in
`docs/04-RELEASE-CHECKLIST.md`, “2026-09-22 — exhaustive route-by-route inquiry-form QA”. No push
or deployment was performed.

## Hoarding public service installation — 2026-09-19

**Scope:** `aseptaclean-hoarding-service` → `/hoarding-cleanup-san-jose/` only. No push,
deployment, production lead, or installation of another package. Existing unrelated edits preserved.

- [x] Read root/package instructions, claims/integration requirements, design specification and QA.
- [x] Implement from `hoarding-service-fragment.html`; decode `hoarding-service-preview.html` and
  confirm it embeds that exact fragment (`output/hoarding-service-install/comparison.json`).
- [x] Preserve exact hero phrases and intentional break, all five full-width headings, introduction
  points and belongings process beneath both columns, before-work information blocks, quote-only
  pricing section, seven native FAQs, 34 cities, quiet strip, and centered bottom form.
- [x] No starting prices, numeric tiers/minimums, or campaign free-walkthrough offer.
- [x] Preserve image bytes and original cascade: 1.35 intro/belongings ratio and 3:2 before-work
  photograph at every tested width. Assets and hashes: `output/hoarding-service-install/assets.json`.
- [x] Use local Inter and SVG icons, real logo, six public-service navigation destinations, Your Quote
  links, real policy/cookie controls and configured phone values. No campaign service-menu entries.
- [x] Preserve `service-form`, `/api/lead`, hoarding entry attribution, required fields and consent,
  timestamps, honeypot, idempotency, Turnstile, server-confirmed receipt redirect and error handling.
  Five approved need labels map to `Hoarding or heavy clutter`; the selected need is carried losslessly
  in `property_detail`. Optional photos use the existing multipart upload contract. No message minimum.
- [x] All assessment links focus the bottom form. Submit remains **Send Message**, as required by the
  standing production form rule. Original service-page consent remains unchanged.
- [x] Build: 54 pages; Astro check: zero errors/warnings (35 hints); situation enum guard, existing
  endpoint/provider test suite and `git diff --check` pass. Logs in the evidence directory.
- [x] Rendered comparison at 1440, 1024, 820, 768, 390 and 320px: no public-route horizontal overflow,
  duplicate IDs, missing assets or clipped actions. Inspect desktop/tablet/mobile screenshots.
- [x] Typography CSSOM check at nine widths 320–1920: heading sizes use `.ac-type-*` roles;
  worst H1/body ratio 2.0. Full-width heading and below-both-columns geometry measured directly.
- [x] Final axe scans: zero violations at all six widths. Photographic pixel sampling after the
  621–1100px overlay repair: minimum heading contrast 4.35:1 (large-text threshold 3:1),
  body contrast 5.37:1 and eyebrow contrast 7.45:1 (normal-text threshold 4.5:1).
- [x] 37 interaction assertions, five upload assertions and ten copy/schema/asset assertions pass.
  Includes menu/Escape/focus, all seven FAQ keyboard toggles, CTAs, missing need/security, real selected
  photo serialization, retained fields on rejection, busy state and accepted-response routing.
- [x] 200% CSS zoom and equivalent 720px desktop reflow: no overflow; screenshots recorded.
  Native browser-toolbar zoom was not separately automated.
- [x] 32 regression renders cover home, Contact, estate public/campaign, extreme/deep/trauma and
  hoarding advertising at 1440/820/390/320. No hoarding stylesheet/root leaks. Campaign source and
  protected endpoint hashes are unchanged. Shared changes are opt-in, except adding the new
  assessment anchor to analytics intent recognition; existing destinations remain recognized.

**Measured hero heights**, equal to the preview at each width: 1440 → 515.875px; 1024 → 503.313px;
820 → 482.813px; 768 → 477.563px; 390 → 614.188px; 320 → 651.438px. The explicit break remains;
phrases naturally wrap further on mobile, matching the preview without shrinking text to force fit.

**Authority/adaptation record:** this requested approved package supersedes earlier hoarding public
copy, CTA and hero-height defaults only on this route. The supplied illustrative photos remain
illustrations, never company job proof. Original image bytes/crops include a thin neighboring-atlas
strip at some edges; preserved from the preview. Mandatory documentation/scope/disposal/pest
qualifications and working navigation/forms replace the demo-only production gaps. A tablet-only
navy overlay correction addresses measured photographic contrast without changing geometry.

**Files changed:** `src/pages/hoarding-cleanup-san-jose/index.astro`;
`src/styles/hoarding-service-kit.css`; `src/components/hoarding/HoardingHeader.astro` and
`HoardingIcon.astro`; two `src/assets/aseptaclean/hoarding-service-*.jpg` files;
opt-in additions in `src/layouts/BaseLayout.astro` and `src/components/ac/AcCompactForm.astro`;
`src/components/Analytics.astro`; this checklist and the required current-decisions entry.
No advertising page, endpoint, global stylesheet, service data or other package was edited.

**Evidence:** `output/hoarding-service-install/actual-{1440,1024,820,768,390,320}.png` and matching
`reference-*.png`; hero/belongings/documentation/area/form/footer section screenshots at
1440/820/390/320; `actual-200-percent.png`, `actual-200-percent-reflow.png`;
`visual-results.json`, `geometry-contrast.json`, `axe-*.json`, `interaction-results.json`,
`upload-results.json`, `content-results.json`, `regression-results.json`, `type-law.log`.

**Remaining issues / limits:**

1. Live Turnstile, CRM/storage and email delivery cannot be verified by blocked-external/local
   browser tests. Intercepted UI tests and provider-adapter tests passed; no real lead was sent.
   The live widget's responsive rendering also needs a permitted deployed-host check.
2. Regression captures flagged overflow on the unchanged hoarding advertising page at 390/320px;
   a subsequent immediate geometry probe did not reproduce it. Its source/styles were not changed,
   and it has no hoarding-kit CSS/root. Record as an intermittent campaign follow-up, outside this
   public-service installation; do not silently fix its layout here.
3. Supplied assets remain explicitly illustrative; they are not verified completed-job photography.
   The source atlas edge strips are visible in the approved preview and remain preserved.

**Stop:** package installed locally; do not start another package, push or deploy.

## Rodent public service installation — 2026-09-19

**Scope:** only `aseptaclean-rodent-service` → `/rodent-dropping-cleanup-san-jose/`.
No other kit installed, campaign-page edits, live lead, push or deployment.

- [x] Read repository and package instructions, claims/integration rules, owner design spec and QA.
- [x] Decode `rodent-service-preview.html`; its embedded fragment exactly equals
  `rodent-service-fragment.html` (`output/rodent-service-install/comparison.json`). Original package
  files remain untouched. Reference captures use local Inter and existing same-name SVG icons.
- [x] Preserve exact section order and public copy: $500 small jobs / $1,500 larger jobs, separate
  $145 assessment band and exact credit terms in pricing, cost FAQ and form introduction.
- [x] Preserve attics/crawl spaces, scoped insulation removal, belongings decisions and exclusions
  for pest control, sealing, repairs and replacement insulation. Existing mandatory scope clauses
  remain beside exclusions; no company-owned hauling or new credential claims.
- [x] Full-width headings; attic points and belongings steps beneath both columns; six native FAQs
  in one centered maximum-800px column, first answer initially open; 15 + 19 cities; bottom form.
- [x] Extract original JPEG bytes (`assets.json`); keep reference photo geometry, including the
  3:2 documentation image with 107% proportional top crop and no minimum height. No image stretching
  to fill text height. The supplied atlas's visible edge strips are also in the approved preview.
- [x] Keep shared public Header/Footer, real logo, six-service dropdown, policy/cookie controls and
  centrally configured phone. Add only the supplied route-local utility bar.
- [x] Preserve `PpcHeroForm`, `rodent-form-panel`, original attribution ending `#rodent-form`,
  `/api/lead`, fixed service enum, required fields, consent, file upload limits, timestamps,
  honeypot, idempotency, Turnstile and accepted-response receipt routing. No message minimum.
  The required Affected Area choice uses a default-empty shared slot; page-local `formdata` maps
  it into the supported message field without changing endpoint/schema. Submission label is
  **Send Message** under standing production rules; marketing links retain package wording.
- [x] All assessment anchors focus the first form field. Existing `#rodent-form` inbound anchor is
  retained, and analytics additionally recognizes package anchor `#rodent-contact`.

**Actual verification:**

| Check | Result / evidence under `output/rodent-service-install/` |
| --- | --- |
| Build | PASS, 54 Astro pages before dev pruning; `build.log`. |
| Astro check | PASS, zero errors/warnings, 37 hints; `check.log`. |
| Situation enum, analytics tagging, launch architecture | PASS; `situations.log`, `analytics.log`, `launch.log`. |
| Existing endpoint/provider tests | PASS, controlled adapters; `endpoint.log`. No live delivery. |
| Copy, schema, geometry, regression assertions | 71/71 PASS; `content-geometry-results.json`. Exact public section text, FAQ schema, 34 cities, one bottom form, images, heading typography and critical rows. |
| Responsive | 1440/1024/820/768/390/320px: zero document overflow or duplicate IDs; hero and every photo box match the local-font preview. `visual-results.json`. |
| Hero heights | Respectively 639.969 / 567.922 / 489.813 / 484.156 / 596.594 / 641.375px. Hard break retained; text wraps naturally just as in the reference. No shared hero token changed. |
| Accessibility | Zero automated WCAG A/AA violations at all six widths; `axe-*.json`. |
| CTAs, FAQs, form | 79/79 PASS; `interaction-results.json`, `interactions.log`. Six service destinations, phone links, all five assessment links at four widths, native keyboard FAQ toggles, required fields/area, absent security token, multipart photo bytes, lossless area mapping, server/network error retention, busy state and accepted-response receipt navigation without PII. |
| Mobile menu | Expanded six-service menu fits at 820/390/320 with no overflow; Escape/focus and link destinations checked. `menu-results.json`, `menu-*.png`. Hidden closed-menu descendants in the raw visual probe are not visible/document overflow. |
| Zoom | 200% CSS zoom and equivalent 720px desktop reflow pass; `actual-200-percent.png`, `actual-200-percent-reflow.png`. Native toolbar zoom was not separately automated. |
| Typography | Existing CSSOM type-law check on this route at nine widths; explicit `.ac-type-rodent-*` roles preserve preview sizes; minimum H1/body ratio 2.118 at 320. `type-law.log`. |
| Shared form consumers | All three advertising pages rendered at 1440/820/390/320. No rodent root/style or area selector leaks, one existing `/api/lead` form each; `regression-*.png`. The shared component change is only an empty named slot for consumers that do not provide it. |
| Preservation | Task-start hashes confirm unchanged campaigns, endpoint and original package. Final comparison also detected concurrent changes to AcCompactForm, BaseLayout and the trauma route that this task did not edit; preserved as-is. `baseline-hashes.json`, `preservation-results.json`. |

**Screenshots reviewed:** `actual-{1440,1024,820,768,390,320}.png` against `reference-*.png`;
clean section captures `review-{1440,820,390,320}-{hero,attic,belongings,documentation,faq,form}.png`.
The clean section captures hide fixed navigation/call bars solely for capture, avoiding screenshot
stitching overlays. Full-page and menu captures retain production chrome.
Local built preview: `http://127.0.0.1:4521/rodent-dropping-cleanup-san-jose/`.

**Changed files:** public rodent route; `src/styles/aseptaclean-rodent.css`; two
`src/assets/aseptaclean/rodent-service-*.jpg` files; empty-slot addition to
`src/components/ppc/PpcHeroForm.astro`; one anchor alternative in `src/components/Analytics.astro`;
this checklist and required `docs/05-CURRENT-DECISIONS.md` entry. No global CSS, base layout,
shared navigation/footer, service/campaign data, or advertising-page source changed.

**Intentional production adaptations / limits:** original navigation, footer, complete consent,
security, upload limits and mandatory scope qualifications replace demo gaps. Illustrative imagery
is not job proof. The form and exclusions are consequently taller than the demo. All deterministic
browser runs block external hosts; intercepted submission tests verify client behavior, not real
Turnstile challenges, CRM/storage or email delivery. Live widget rendering/delivery still requires
a permitted deployed-host check. No live inquiry was sent. Nothing pushed or deployed. Stop here.

**Concurrent-work note:** the final hash comparison observed additional edits to
`src/components/ac/AcCompactForm.astro`, `src/layouts/BaseLayout.astro`, and
`src/pages/crime-scene-trauma-cleanup-san-jose/index.astro` after the earlier preservation check.
This task did not make or revert those edits. The checks above establish the rodent installation;
they do not certify that concurrent work.

## Trauma public service installation — 2026-09-19

**Scope:** only `aseptaclean-trauma-service` → `/crime-scene-trauma-cleanup-san-jose/`.
Implemented locally from `trauma-service-fragment.html`; standalone preview inspected as visual
reference only. No other package installed, no push/deployment, and no live inquiry sent.

- [x] Read standing/package instructions, claims, verified registration facts, integration and
  design requirements. Preserve original package files and unrelated work.
- [x] Preserve approved hero, attached three-item trust strip, six cleanup situations, support
  section, belongings/three decision steps, navy CTA, four process columns, written-scope section,
  six FAQs (first open), 34-city list, closing CTA and centered bottom form, in source order.
- [x] Full-width support/belongings/scope headings span both columns; support points, belongings
  steps and scope notes remain below both columns at every measured width.
- [x] No numerical prices, assessment fee, free-service offer, fabricated proof or insurance promise.
- [x] Extract two embedded JPEGs byte-for-byte; retain image positions and proportions, including
  1.35 support/belongings images and 3:2 scope photograph. All assets load. Hashes: `assets.json`.
- [x] Preserve canonical, metadata, indexation, Service/Breadcrumb identity and coverage; update FAQ
  schema to the approved visible questions/answers. Local Inter and typography-role classes.
- [x] Production logo, six public service destinations, configured phone, policy links and cookie
  preference control replace preview stand-ins. Campaign routes stay out of service navigation.
- [x] Assessment actions reach/focus the local bottom form. Phone actions use the configured `tel:`
  destination. Menu keyboard/Escape/focus/selection and all six native FAQ toggles pass.
- [x] Retain `service-form`, `/api/lead`, trauma attribution, required identity/contact/ZIP/consent,
  honeypot, timestamps, idempotency, Turnstile, server errors and accepted-response receipt routing.
  Six approved cleanup types map to `Crime scene or trauma cleanup`; the chosen type is retained in
  `property_detail`. Message/photos are optional, with no message minimum. Actual multipart photos
  use the existing upload contract. Submit is **Send Message**; service consent wording is unchanged.
- [x] Fresh production build: 54 pages; Astro check: zero errors/warnings (49 hints). Situation enum,
  analytics tagging/events, existing endpoint/provider suite and whitespace checks pass.
- [x] Final browser renders at **1440, 1024, 820, 768, 390 and 320px**: no document overflow,
  duplicate IDs, missing imagery or clipped actions. Desktop/tablet/mobile section captures reviewed.
- [x] Axe: zero WCAG A/AA violations at all six widths. Actual-photo background sampling after
  the overlay correction: minimum eyebrow contrast 7.66:1, heading 10.17:1, body 8.59:1.
  CTA/light/dark surface contrast included in the accessibility scans.
- [x] 37 interaction assertions, five upload assertions and ten content/schema/asset assertions pass.
  Includes missing cleanup type/security, real multipart photo selection, rejection with retained
  input, busy state and accepted response routing. Tests intercept the endpoint; they send no leads.
- [x] Native Chrome **200% zoom**: 1440px outer window, 720px layout viewport, DPR 2; zero overflow
  at hero, belongings, form and footer. Also tested CSS zoom and equivalent narrow reflow.
- [x] Typography measured at nine widths 320–1920: scoped role selectors only; worst H1/body ratio
  **2.25:1**, no one-word final H1 lines. See checker limitation below.
- [x] 32 regression renders: homepage, Contact, estate public/campaign, hoarding public/campaign,
  Extreme Cleaning and Detailed Deep Cleaning at 1440/820/390/320. No trauma CSS/root leakage or
  horizontal overflow. Shared form changes are opt-in; existing destinations/values remain intact.

**Hero heights** match the reference exactly: 1440 → 590.0625px; 1024 → 577.921875px;
820 → 499.8125px; 768 → 494.15625px; 390 → 555.078125px; 320 → 620.78125px. The latest
route-specific kit controls these dimensions, replacing the older shared-height requirement
for this route only. Copy, image crop and text sizing were not reduced to force a fit.

**Adaptations / authority resolutions:** latest explicit owner kit instruction controls route
wording, structure, imagery, CTA labels and geometry. Supplied visuals remain illustrative.
Keep standing production consent, submit wording, scope/documentation disclaimers and legal links.
A stronger navy gradient above 620px corrects measured photographic small-text contrast without
altering dimensions or photo positions. Original approved atlas-edge strips remain visible.
Full decision record: `docs/05-CURRENT-DECISIONS.md`, 2026-09-19 trauma entry.

**Changed files:** trauma public route; new `src/styles/trauma-service-kit.css`;
`src/components/trauma/TraumaHeader.astro` and `TraumaIcon.astro`; two
`src/assets/aseptaclean/trauma-service-*.jpg` assets; opt-in `traumaKit` support in
`src/layouts/BaseLayout.astro` and `src/components/ac/AcCompactForm.astro`; trauma form-anchor
recognition in `src/components/Analytics.astro`; this checklist and current-decisions entry.
Protected endpoint/provider files match task-start hashes. Concurrent external work changed
`src/styles/aseptaclean-rodent.css` and the Extreme Cleaning route/components, including opt-in
additions in shared form/layout files. This installation did not write or revert those changes.
Regression captures reflect the build available when captured, not a freeze of that concurrent
work. See `changed-baseline-files.json`.

**Evidence:** `output/trauma-service-install/actual-{1440,1024,820,768,390,320}.png` and matching
`reference-*.png`; hero/belongings/documentation/area/form/footer captures at 1440/820/390/320;
`native-200-percent-{hero,belongings,form,footer}.png`, `native-zoom.json`;
`visual-results.json`, `geometry-contrast.json`, `axe-*.json`, `interaction-results.json`,
`upload-results.json`, `content-results.json`, `optional-message.json`, `regression-results.json`,
`type-law-scoped.log`, build/check/analytics/endpoint logs. Original preview decoding contains the
exact fragment; reference-only adaptations supply local Inter and equivalent SVG glyphs.

**Verification limits:**

1. Live Turnstile, CRM/private-storage and email delivery were not exercised. External hosts are
   blocked in deterministic screenshot/UI tests. The supported compact widget size is configured,
   but its actual deployed-host rendering and challenge need a live preview check. No real lead sent.
2. The unchanged repository type-law checker rejects root-qualified selectors such as
   `#ac-trauma .ac-type-trauma-0` despite their role classes. Its ratio check passes; a QA-only copy
   permitting this exact root prefix passes the full computed-style audit. Original checker intact.
3. Supplied photographs are illustrative, not verified Aseptaclean job photography. The package's
   image-sheet edge strips are preserved intentionally, including at mobile sizes.

**Stop:** trauma package installed locally and reviewed. Do not begin another package, push or deploy.

## Extreme public service installation — 2026-09-19

**Scope:** `aseptaclean-extreme-service` → `/extreme-cleaning-san-jose/` only. Installed from
`extreme-service-fragment.html`; compared with the decoded `extreme-service-preview.html`.
No other kit installed, campaign altered, real inquiry sent, push or deployment.

- [x] Read standing/package rules, current design/claims/integration instructions; preserve unrelated work.
- [x] Preview embeds the exact supplied fragment (`output/extreme-service-install/comparison.json`).
- [x] Preserve separate hero spans: **“Extreme Cleaning.” / “A Fresh Start for Your Property.”**
  All approved cleanup situations, full-width headings, support points and belongings steps beneath
  both columns, four process columns, two scope notes, six centered native FAQs (first open), 34 cities,
  closing strip and centered bottom form retain their wording/order. No pricing added.
- [x] Extract both original JPEGs byte-for-byte; keep approved crops and proportions. All four photo
  boxes exactly match the reference at every checked width; documentation photograph stays 3:2.
  Supplied imagery remains illustrative, not completed-job evidence; no new images generated.
- [x] Keep real logo, six public service navigation destinations, configured phone, policy/cookie links,
  and existing metadata/canonical/indexation. FAQ schema matches the installed visible answers.
- [x] Keep `service-form`, original entry attribution `/extreme-cleaning-san-jose/#service-form`,
  `/api/lead`, required identity/contact/ZIP/consent, honeypot, timestamps, idempotency and Turnstile.
  Six exact approved cleanup labels map to existing **Severe property condition**; the selection is
  preserved in `property_detail`. Message/photos optional; no message minimum; real multipart uploads.
  Submit remains **Send Message** under the standing production rule. No preview handler installed.
- [x] Production build: 54 Astro pages before pruning; Astro check: 0 errors, 0 warnings, 49 hints.
  Situation enum, existing endpoint/provider suite, analytics tagging (13/13), analytics events (38/38) and launch architecture pass.
- [x] **1440/1024/820/768/390/320px:** zero document overflow/duplicate IDs; images and actions visible.
  Exact approved hero heights: **530.156 / 522.063 / 499.813 / 494.156 / 572.672 / 638.375px**.
  Latest route-specific package supersedes earlier shared hero dimensions for this route only.
- [x] All six axe WCAG A/AA scans: zero violations. Pixel-sampled photographic contrast after a local
  desktop/tablet overlay correction: minimum heading **5.32:1**, body **4.97:1**, eyebrow **8.60:1**.
  Photo position, sizing, text and geometry unchanged by this correction.
- [x] 37 interaction assertions, five upload assertions and ten copy/schema/asset assertions pass.
  Checks include menu/Escape/focus, FAQ keyboard toggles, required need/security, multipart photo bytes,
  preserved input/photo after rejection, busy state, accepted-response routing and no PII in URLs.
- [x] 34 additional assertions pass and cover all five in-main assessment links at four widths, exact hero blocks,
  3:2 image ratio, expanded narrow menus, optional empty message and network-failure recovery.
- [x] Native Chrome **200% zoom**: outer width 1440, layout viewport 720, DPR 2, no overflow at hero,
  belongings, form or footer. CSS zoom and equivalent reflow also pass.
- [x] Typography CSSOM audit at nine widths 320–1920: only `.ac-type-*` size roles; minimum H1/body
  ratio **2.25:1**. Evidence-local checker recognizes the route-scoped role selector.
- [x] 44 regression renders cover 11 neighboring public/campaign routes at 1440/820/390/320, including
  every current AcCompactForm page. No extreme stylesheet/root leaks. All 49 built BaseLayout consumers also
  checked for route-scope isolation. Two unchanged estate campaign overflow captures noted below.
- [x] Task-start hashes confirm protected endpoint, campaign source and supplied package unchanged;
  only the four intended existing source files differ. `preservation-results.json`.

**Evidence:** `output/extreme-service-install/actual-{1440,1024,820,768,390,320}.png` and
matching `reference-*.png`; hero/belongings/documentation/area/form/footer detail captures at
1440/820/390/320; `native-200-percent-{hero,belongings,form,footer}.png`; `comparison.json`,
`geometry-contrast.json`, `axe-*.json`, `interaction-results.json`, `upload-results.json`,
`content-results.json`, `final-results.json`, `regression-results.json`, `type-law.log` and build logs.
Local built route: `http://127.0.0.1:4521/extreme-cleaning-san-jose/`.

**Production adaptations and limitations:**

1. Real form/security/consent/upload limits, logos, navigation and mandatory scope/documentation/legal
   notices replace demo gaps; form/footer therefore differ in height from the preview. Marketing CTA
   wording follows this approved package; the actual submit follows the standing **Send Message** rule.
2. Deterministic browser tests block external hosts and intercept form requests. Live Turnstile,
   CRM/storage/email delivery and deployed widget rendering remain unverified. No live lead sent.
3. Original illustrative image atlas edge strips are visible in the reference and retained. Suitable
   production-photo provenance remains a release follow-up; these are never represented as actual jobs.
4. Unchanged `/estate-cleanout-san-jose/assessment/` showed overflow in regression captures at 390/320.
   No extreme kit styles or root occur there; its source is byte-preserved. Outside this installation.

**Changed files:** public extreme route; `src/styles/extreme-service-kit.css`;
`src/components/extreme/ExtremeHeader.astro` and `ExtremeIcon.astro`; two
`src/assets/aseptaclean/extreme-service-*.jpg` files; opt-in `extremeKit` additions in BaseLayout and
AcCompactForm; assessment-anchor recognition in Analytics; this checklist, current decisions and asset
manifest. No global styles, endpoint, service data, redirects or other page package changed.

**Stop:** installed locally for review. Do not begin another package, push or deploy.

## Estate campaign landing installation — 2026-09-19

**Scope:** only `aseptaclean-estate-landing` → `/estate-cleanout-san-jose/assessment/`.
Installed locally from `estate-landing-fragment.html` and compared with the decoded
`estate-landing-preview.html`. **Layout approved; copy and illustrative photos remain
provisional. Not launch-approved.** Public `/estate-cleanout-san-jose/` remains byte-identical
to task start. No other package installed, real inquiry sent, push or deployment.

- [x] Read package status/start/implementation and applicable standing design, claims, facts,
  integration and QA rules; preserve the pre-existing dirty tree.
- [x] Preview embeds the exact fragment. Retain original style-block cascade in one scoped
  stylesheet; extract both JPEG atlases byte-for-byte. No duplicate embedded CSS or demo script.
- [x] Preserve warm split hero, complete-row actions, assurance strip, three photographic
  service rows (p8/p3/p5), overlapping belongings panel, three process steps, left-aligned
  record icons, navy call band, four native FAQs, centered intake and compact campaign footer.
- [x] All **48** supplied marketing text blocks remain present and unchanged. The only extra
  pre-form paragraph is the existing disposal boundary. No new approval is inferred.
- [x] Keep original title, description, indexability, canonical URL, schema shell, redirects,
  receipt route, campaign data and public/campaign separation. The shared head still loads
  the existing consent and analytics integration. No campaign entries added to public navigation.
- [x] Configured logos and phone values replace demo stand-ins. Keep phone clicks distinct
  from leads, native FAQ keyboard behavior and local CTA focus/scroll behavior. Preserve old
  `#request-walkthrough` links while supplied CTAs target `#estate-contact`.
- [x] Use existing `PpcHeroForm`, ID `request-walkthrough-panel`, entry attribution
  `/estate-cleanout-san-jose/assessment/#request-walkthrough`, `Inherited or estate property`,
  `/api/lead`, existing thank-you route, timestamps, idempotency, honeypot and challenge.
  Required email/contact/ZIP/consent stay required. Details/photos and property-description
  selection remain optional. No demonstration validation can report submission success.
- [x] Required kit role selector uses the existing supported `additional_notes` field with
  `Role: <choice>` values; no backend/schema change. Email precedes ZIP as in the kit.
  Optional fields are visible inline. Real multipart uploads and existing limits remain.
- [x] Submit uses **Send Message**. Preserve the approved **Free Walkthrough** offer beside
  the form, production consent, scope/disposal/documentation limits, policy links and working
  Termly preference hook. These required additions make form/footer taller than the demo.
- [x] Compact Turnstile widget selected for this route's 280px form width at 320px; all other
  shared-form callers retain their prior flexible setting. Security/token flow unchanged.
- [x] Fresh `npm run build`: **54 Astro pages before pruning**. `npm run check`: **0 errors,
  0 warnings, 56 hints**. Existing estate endpoint/provider checks, analytics tagging **13/13**,
  launch architecture and changed-source whitespace checks pass.
- [x] Final visual renders at **1440, 1024, 820, 768, 390, 320px**: zero document overflow,
  duplicate IDs or axe WCAG A/AA violations. Reviewed hero, scope rows, belongings,
  documentation, form and footer; all supplied image proportions/crops retained.
- [x] Hero heights exactly match the font-corrected local reference at every width:
  **664.141 / 603.047 / 543.406 / 524.500 / 863.297 / 886.922px**, respectively.
  All five photo rectangles also match exactly. This route-specific package supersedes the
  older shared hero-height requirement for this campaign only.
- [x] **31/31** campaign success/error/conversion assertions: invalid input sends nothing;
  rejection/network failure produces no lead; input survives errors; accepted response redirects;
  rapid submits send once; receipt refresh does not duplicate success; phone click is not a lead.
- [x] **101/101** final additional assertions: URL parameters retained; UTM/GCLID attribution,
  canonical, phone links, every visible form CTA, keyboard FAQs, missing role/security, multipart
  role/photo/tracking payload, retained values/files after rejection and compact widget setting.
  Requests are intercepted and external hosts blocked; no real inquiry or analytics transmission.
- [x] Native Chrome **200% zoom**: outer window 1440px, layout viewport 720px, DPR 2; no
  overflow at hero, belongings, form or footer. Full-page 200% CSS zoom also passes.
- [x] Computed type check at nine widths 320–1920: heading sizes use `.ac-type-*` roles;
  minimum H1/body ratio **2.125:1**. Evidence-local checker allows the exact route-root prefix;
  repository checker remains unchanged and otherwise rejects qualified role selectors.
- [x] **28** regression renders at 1440/820/390/320: public estate page, both other campaign
  pages, all three campaign receipt pages and rodent public page. No kit root/CSS leaks or
  overflow. All shared-layout/form consumers inspected; opt-in defaults preserved.
- [x] Baseline hashes confirm public estate source, other page source, protected endpoint and
  provider code, campaign data, redirects, legal/consent sources and supplied package unchanged.

**Preview comparison method:** preserve the original preview and decode its iframe `srcdoc`,
which contains the exact supplied fragment. For deterministic local rendering only, remove its
preview-only CSP/CDN scripts, supply local Inter with the correct variable weight range, and
render its icon names using the same SVG paths as production. Initial reference screenshots
used fallback Arial because its CSP blocked the local font; those captures were replaced.
No reference package file was edited. Atlas edge strips visible in the source are retained.

**Changed implementation files:** campaign page;
`src/styles/estate-landing-kit.css`; `src/components/estate/EstateLandingIcon.astro`;
`src/assets/aseptaclean/estate-landing-{0,1}.jpg`; optional header/footer slots and estate root
flag in `src/layouts/PpcLayout.astro`; optional `turnstileSize` prop in
`src/components/ppc/PpcHeroForm.astro`. Documentation: this checklist, current decisions and
asset manifest. No public estate page, global CSS, analytics code, endpoint or redirect edits.

**Evidence:** `output/estate-landing-install/actual-{1440,1024,820,768,390,320}.png`, matching
`reference-*.png`, and hero/area/belongings/documentation/form/footer detail captures at
1440/820/390/320; `native-200-percent-{hero,belongings,form,footer}.png`;
`zoom-200-percent.png`, `native-zoom.json`, `visual-results.json`, `axe-*.json`,
`extra-results.json`, `content-results.json`, `regression-results.json`, `assets.json`,
`preservation-results.json`, and build/check/interaction/endpoint/analytics/launch/type-law logs.

**Launch blockers and verification limits:**

1. **Copy is provisional.** Owner review must resolve inventory/document handling and shredding
   readiness, previously gated in `src/data/ppcEstate.ts`; reconcile “assessment” CTA/FAQ language
   with the existing free-walkthrough offer and confirmation flow. Installation preserves the
   requested draft; it does not establish new capabilities or change the offer.
2. **Photography is provisional.** Provenance and production approval remain unresolved.
   Illustrative captions remain; images are not represented as actual Aseptaclean jobs or crews.
3. **Live integrations unverified.** Turnstile's deployed-host rendering/challenge, CRM/storage,
   email delivery and downstream GTM/GA conversion receipt need controlled staging/release checks.
   Local token injection and intercepted responses test client behavior only. Cookie preference
   hook/provider configuration is preserved; the external Termly panel was blocked during QA.

**Stop:** estate landing installed locally for review. Do not start another package, push or deploy.

## Rodent campaign landing installation — 2026-09-20

**Scope:** only `aseptaclean-rodent-landing` →
`/rodent-dropping-cleanup-san-jose/assessment/`. Installed locally from
`rodent-landing-fragment.html` and compared against `rodent-landing-preview.html`.
**Layout installed; supplied copy and photography remain provisional. Not launch-approved.**
No real inquiries, external analytics transmission, push or deployment. Stop after this package.

- [x] Read standing rules, package status/start/master index, design spec, claims law, facts,
  integration contract and existing QA record. Preserve the pre-existing dirty tree.
- [x] Decode preview iframe: it contains the exact fragment. Preserve all **16** style blocks
  in their original cascade in one route-scoped CSS file, with no duplicate CSS or demo script.
  Decode the two embedded JPEG atlases without changing bytes; retain original image proportions.
- [x] Preserve editorial split hero, complete-row CTA/phone actions, assurance strip, **three
  photographic service rows**, warm overlapping planning section, **three process steps**,
  navy call band, centered **four native FAQs**, bottom form and compact campaign footer.
- [x] Preserve title, description, canonical, indexability, shared schema/analytics/consent shell,
  campaign data, phone configuration, receipt URL and URL parameters. No public navigation entry.
  Public rodent page and pricing source/component remain byte-identical to task start.
- [x] Preserve `rodent-form-panel`, old `#rodent-form` anchor, entry route
  `/rodent-dropping-cleanup-san-jose/assessment/#rodent-form`, fixed
  `Rodent droppings or animal waste`, `/api/lead`, timestamps, idempotency, honeypot, uploads,
  required email/details/contact/ZIP/consent, and genuine server-confirmed redirect.
  New `#rodent-contact` actions focus the first form field; existing analytics recognizes them.
- [x] Required affected-area selector maps to supported `additional_notes` with
  `Affected area: <choice>` values. Route-only `formdata` handler prefixes area to outgoing
  `property_detail`, ensuring existing CRM and owner summaries receive it. UI details and files
  remain intact after rejection; retries do not accumulate prefixes. Shared form/backend unchanged.
- [x] Real submit is **Send Message**. Existing campaign **$145** assessment disclosure stays in
  the form and unchanged metadata. No public service price cards, $500/$1,500 figures, or borrowed
  free-walkthrough offer. Existing production consent/policies replace the demo consent sentence.
- [x] Reuse existing logo data, SVG icons, header/footer slots and compact Turnstile option.
  Add only an opt-in `rodentLandingKit` flag in PpcLayout; existing consumers keep their defaults.
- [x] `npm run build`: **54 pages before pruning**; `npm run check`: **0 errors, 0 warnings,
  61 hints** (including local evidence scripts). Analytics tagging **13/13** and launch audit pass.
  Changed tracked files pass `git diff --check`.
- [x] Final rendered checks at **1440, 1024, 820, 768, 390, 320px**: no horizontal overflow,
  duplicate IDs or axe WCAG A/AA violations. Visual inspection includes hero, rows, planning,
  form and footer, with long FAQ boundary content expanded. No clipping or copy truncation.
- [x] **31/31** intercepted campaign success/error/conversion assertions, **101/101** attribution,
  CTA/FAQ/phone/upload/retention assertions, **28/28** final checks for missing challenge, focused
  form/sticky behavior, expanded FAQ and absence of demo behavior/borrowed offers: **160 total**.
  Real requests never reach an endpoint/provider; external hosts are blocked.
- [x] Native **200% Chrome zoom**: outer window 1440px, layout width 720px, DPR 2; zero overflow
  at hero, planning, form and footer. Full-page 200% CSS zoom also has zero overflow.
- [x] Computed heading CSSOM review at nine widths, 320–1920: all heading sizes resolve through
  explicit `.ac-type-*` roles; minimum H1/body ratio **1.938:1**, above standing 1.9 floor.
  Evidence-local checker recognizes the exact route-root prefix; repository checker is unchanged.
- [x] **24** regression renders: public rodent, other two campaign pages, and all three campaign
  receipts at 1440/820/390/320. Zero rodent-kit leakage or overflow. These cover all other
  PpcLayout consumers; shared form, icon renderer and global styles were not changed.
- [x] Task-start hashes prove all other existing source/reference files unchanged, including
  public rodent, protected endpoint/providers, shared form/analytics, campaign data/receipts,
  redirects, legal policies and supplied package. Only intended implementation/doc files differ.

### Explicit differences from the supplied preview

Standing rules govern these adaptations; full resolution is in `05-CURRENT-DECISIONS.md`:

1. Correct mistaken utility label **Estate Cleanout → Rodent Dropping Cleanup**.
2. Replace the prohibited affirmative disinfection lead with the existing campaign sentence
   “Aseptaclean removes rodent droppings, nests, and materials soiled by rodent waste.” Replace
   **Disinfect / Suitable surfaces that can be treated.** with **Review / We show you what we
   cleaned and removed.** from the existing campaign review step. Add required cleaning-only,
   pest-operator and disposal boundaries; make the package-required air-sealing exclusion explicit.
   **36 of 40** compared pre-form marketing text blocks are unchanged; the other four are these
   documented lead/process/boundary changes. No provisional text is promoted to approved copy.
3. Preserve production-required email/details, existing field names/consent/security/uploads and
   submit label instead of the demo's optional fields and fake success. Form/footer are therefore
   taller; the existing assessment-fee disclosure remains. Demo preview notice/handler removed.
4. Supplied 25/27px H1 minimums violate the standing 1.9 ratio. Raise the minimum to **31px**;
   do not shrink body text or line-height. This keeps desktop/tablet geometry and grows mobile
   heroes naturally. Role-class mapping preserves CSS cascade and the remaining supplied sizes.
5. Actual logos replace text stand-ins. Hero alt text describes its actual discussion image,
   rather than the stale garage label. Footer retains legal, scope, documentation and cookie links.

| Width | Installed hero height | Reference hero height | Photo dimensions |
| --- | ---: | ---: | --- |
| 1440 | 664.141px | 664.141px | All five match |
| 1024 | 603.047px | 603.047px | All five match |
| 820 | 543.406px | 543.406px | All five match |
| 768 | 524.500px | 524.500px | All five match |
| 390 | 836.766px | 786.906px | All five match |
| 320 | 884.141px | 801.828px | All five match |

**Comparison method:** retain original preview and decoded source; for deterministic local
reference rendering remove preview CSP/CDN scripts, use local Inter variable font with correct
weight range, and render icon names through the existing static SVG paths. Reference source files
are unchanged. Atlas edge strips visible in the supplied preview are retained, not newly introduced.
Tall element screenshots can composite the existing fixed bar into the image; actual
`form-anchor-*.png` viewport captures verify that it hides during input focus. Existing bar behavior
otherwise remains unchanged. No live Termly or Turnstile rendering success is claimed.

**Changed files:** `src/pages/rodent-dropping-cleanup-san-jose/assessment/index.astro`,
`src/layouts/PpcLayout.astro`, new `src/styles/rodent-landing-kit.css`, two new
`src/assets/aseptaclean/rodent-landing-{0,1}.jpg`; this checklist, current decisions and asset manifest.
Evidence scripts/results live under `output/rodent-landing-install/`. No other package installed.

**Evidence:** `output/rodent-landing-install/actual-{1440,1024,820,768,390,320}.png` and matching
`reference-*.png`; section captures `*-hero`, `*-area`, `*-belongings`, `*-form`, `*-footer`;
`form-anchor-*.png`, `faq-boundaries-*.png`, `native-200-percent-*.png`, `zoom-200-percent.png`;
`comparison.json`, `visual-results.json`, `axe-*.json`, `extra-results.json`, `final-results.json`,
`content-results.json`, `native-zoom.json`, `regression-results.json`, `preservation-results.json`,
and build/check/analytics/launch/interaction/type-law logs.
Local built page: `http://127.0.0.1:4541/rodent-dropping-cleanup-san-jose/assessment/`.

**Launch blockers / remaining verification:**

- **Copy approval:** supplied copy remains provisional. Owner review must confirm remaining
  scope promises, particularly affected-insulation removal and attic/crawl-space work, and accept
  the documented claims-law adaptations. Layout installation is not approval of those capabilities.
- **Photo provenance:** illustrative atlases require rights/provenance and production approval,
  including the standing prohibition on generated people/properties/documents/crews. They are
  not evidence of real Aseptaclean jobs. Resolve or supply compliant assets before launch.
- **Live integrations:** real deployed-host Turnstile challenge, Termly preferences, CRM/storage,
  email delivery and downstream advertising conversion receipt remain unverified. Local injected
  tokens/intercepted responses prove client behavior only. No real inquiry was sent.

**Stop:** rodent landing installed locally for review. No push, deployment, or next package.

## Contact installation — 2026-09-20

**Scope:** only `aseptaclean-contact` → existing `/contact/`. Installed from
`contact-fragment.html`; compared with `contact-preview.html`. **Layout installed locally;
copy remains provisional. No real inquiries, push or deployment. Submission-flow untouched.**

- [x] Read standing instructions, package status/start/implementation/master index, design spec,
  claims law, integrations, facts and existing QA. Preserve the pre-existing dirty worktree.
- [x] Preserve the compact white wordmark header, white introduction, wider left form/right
  information column, thin top rules and warm-white footer. No photo, card, navy hero or overlay.
  Below 580px the details follow the form; field stacking follows the supplied 720px breakpoint.
- [x] Retain all **19** source style blocks in original order in `src/styles/contact-kit.css`,
  imported once by the contact page. Map heading selectors to `.ac-type-contact-h1/h2/h3`;
  use existing local Inter and SVG icon renderer. Original package bytes remain unchanged.
  Inherited unused CSS, including its photo variable, is retained as instructed; no photo renders.
- [x] Reuse `BaseLayout` metadata, canonical, indexation, schema, analytics and Termly shell with
  its existing header/footer slots. Opt-in `contactKit` body ID defaults false elsewhere. No
  shared navigation or footer change. Contact has no mobile call bar, matching this package.
- [x] Reuse `AcCompactForm`, keeping `contact-form`, `/contact/` entry/submitted-from fields,
  `/api/lead`, `form_version`, offer identity, timestamps, idempotency, honeypot, Turnstile,
  consent and genuine `/thank-you/` handling. All other consumers retain default behavior.
- [x] Form names: `full_name`, `phone`, `email`, `property_zip`, `property_situation`,
  `property_detail`, `property_media[]`, `privacy_consent`. Required email/message are preserved;
  ZIP keeps the existing five-digit/ZIP+4 contract. Seven visible package choices map to existing
  accepted CRM values, including `Inherited or estate property` and `Not sure`.
- [x] Contact-only native constraint checking stops invalid requests before fetch and focuses the
  error summary; contact-only busy guard prevents simultaneous submits. Existing server messages,
  retry/input retention, security reset and success handling remain. Submit is `Send Message`.
- [x] **Uploads supported:** protected endpoint reads `property_media[]`, validates files and writes
  private objects through configured `LEAD_UPLOADS` R2 binding. Contact adds the existing photo
  control with multipart encoding; 10 photos, 10 MB each, 75 MB combined. No simulated upload
  confirmation. Failed storage is an error, with selected files/answers retained.
- [x] `npm run build`: **54 pages before pruning**. `npm run check`: **0 errors, 0 warnings,
  63 hints** (including evidence scripts). Analytics tagging **13/13**, launch architecture and
  existing local endpoint suite pass. Changed tracked implementation files pass `git diff --check`.
- [x] Final screenshots at **1440, 1024, 820, 768, 390, 320px**: no horizontal overflow,
  duplicate IDs or axe WCAG A/AA violations. Introduction/header dimensions and column widths
  match the locally rendered preview at all six widths; images below document actual results.
- [x] **80/80** form checks: labels, keyboard order/selection/consent, phone href/intent event,
  missing challenge, invalid fields, server rejection, network error, malformed response,
  HTTP 200 with `ok:false`, missing backend config, honeypot, unsupported photos, upload-storage
  failure, retained inputs/files, one request on rapid submit, real endpoint acceptance using
  in-memory storage, byte-matching private photo storage, confirmation code/email state and all
  seven service mappings. Requests intercepted; no external provider or live inquiry.
- [x] **67/67** additional checks: validation/error layouts and accessibility at 1440/820/768/
  390/320, form anchor, keyboard focus, heading role/ratio across 12 widths from 320–1920, source
  copy comparison, actual backend rejection of >10 photos, >10 MB photos and missing email/consent.
- [x] Native Chrome **200% zoom**: outer width 1440, layout viewport 720, DPR 2; no overflow at
  introduction, form, information column or footer. Heading minimum ratio across tested widths
  is **1.9375:1**. Inputs remain 16px and content is not clipped/truncated.
- [x] **36** regression renders at 1440/820/390/320: all six other shared compact-form consumers
  (home, estate, hoarding, extreme, trauma, deep cleaning), About, Privacy and Thank You.
  No overflow or contact CSS/root leakage. BaseLayout's remaining consumers keep false defaults.
- [x] Task-start hashes confirm all other source/reference files unchanged, including the endpoint,
  providers, analytics, site facts, campaign pages/data, receipt pages, legal sources, redirects and
  supplied packages. Only three existing implementation files changed; one CSS file added.

### Explicit adaptations and provisional-copy status

The current request/package supersedes the older Contact composition and shared hero-height rule
**only for `/contact/`**. This does not authorize another package or shared visual redesign.

1. Preserve all introduction, information and header wording except hours. Hours render the
   centrally verified `site.business.hours`, including Monday–Saturday/closed Sunday, rather than
   the provisional time-only sentence. Operating-day confirmation remains a copy-review item;
   no new days or availability promise is inferred.
2. Production-required email and message lose the demo's “Optional” label. Retain optional photos.
   Existing consent, clarification, security and legal/cookie controls replace the demo consent
   and notice. The form and footer therefore grow. The standing submit label is `Send Message`;
   the supplied heading `Send an inquiry` stays unchanged.
3. Required name/field mapping and accepted service enums replace demo field names. Back links
   use `/`, preserving the existing main-site destination. No new analytics events or attribution
   scheme; the contact form's existing route identity and phone tracking remain.
4. Raise only the supplied H1 clamp minimum **30 → 31px**, required by the standing 1.9 ratio
   between mobile and tablet breakpoints. Preserve 33px mobile rule, other sizes, line-height and
   wording. This does not change introduction heights at the six comparison widths.
5. Use the requested wordmark text, existing SVG arrow and self-hosted Inter. No assets generated
   or substituted. Footer retains the existing legal/scope/documentation and cookie controls.

| Width | Installed/reference introduction height | Form/details columns |
| --- | ---: | --- |
| 1440 | 204.578px / 204.578px | 641.266px / 413.719px |
| 1024 | 204.578px / 204.578px | 539.156px / 347.844px |
| 820 | 194.531px / 194.531px | 434.594px / 280.391px |
| 768 | 191.969px / 191.969px | 403px / 260px |
| 390 | 237.250px / 237.250px | Single 350px column |
| 320 | 237.250px / 237.250px | Single 280px column |

**Comparison method:** preview iframe contains the exact fragment. Preserve the source and decode
it for local comparison, removing preview-only CSP/CDN scripts and loading local Inter with the
correct variable-weight range; use the same SVG path. Original reference files unchanged. Error
form detail captures suppress sticky header/skip-link screenshot artifacts; viewport zoom captures
retain the real header. No live widget success is inferred from blocked-provider screenshots.

**Changed implementation:** `src/pages/contact/index.astro`,
`src/components/ac/AcCompactForm.astro`, `src/layouts/BaseLayout.astro`, new
`src/styles/contact-kit.css`. Documentation: this checklist, current decisions, and short Contact
updates in the implementation/copy/QA records.

**Evidence:** `output/contact-install/actual-{1440,1024,820,768,390,320}.png`, matching
`reference-*.png`, `validation-*.png`, `error-form-*.png`, `state-*-390.png`,
`native-200-percent-{intro,form,details,footer}.png`; `visual-results.json`, `axe-*.json`,
`interaction-results.json`, `final-results.json`, `native-zoom.json`, `regression-results.json`,
`preservation-results.json`, and build/check/endpoint/analytics/launch/interaction logs.
Local built page: `http://127.0.0.1:4543/contact/`.

**Remaining limits:** supplied copy is provisional and needs separate owner review. Live deployed
Turnstile/Termly behavior, R2 access, CRM/email delivery and downstream analytics receipt remain
unverified; local injected tokens and in-memory storage prove client/endpoint behavior, not live
provider operation. There is **no missing-upload-backend blocker**. No provider credentials or
real inquiries were used. No submission-flow changes, push or deployment. Stop after Contact.

## Submission-flow thank-you installation — 2026-09-20

**Scope:** only the thank-you-page surface from `aseptaclean-submission-flow`, installed on the
existing generic `/thank-you/` successful-submission route. Customer-confirmation and owner-
notification email templates are deliberately not implemented. Campaign thank-you pages remain
unchanged. No real inquiry, email, push or deployment.

- [x] Read package `START-HERE.md`, `PACKAGE-STATUS.md`, `IMPLEMENTATION.md`,
  `thank-you-page-design.html`, `thank-you-page.txt` and the thank-you view in
  `submission-flow-preview.html`; preserve the corrected white surface and readable navy/slate
  contrast.
- [x] Replace the prior generic confirmation composition with the accepted compact brand/phone
  header, inquiry-received indicator, exact success headline/body, conditional receipt summary,
  call action, no-appointment qualifier and simple footer. Continue using central business phone,
  hours and name values.
- [x] Remove every fictional sample value. `Jamie Parker`, `AC-1048`, sample service and sample ZIP
  do not render. The current backend supplies only its generated `confirmationCode` for this
  summary, so Service and Property ZIP rows are omitted rather than reconstructed from submitted
  fields or invented.
- [x] Add a same-tab accepted-receipt handoff shared by existing generic form consumers. It is
  written only after an HTTP-success response with `payload.ok === true`; it contains no submitted
  fields or delivery claims. `/thank-you/` ignores and scrubs legacy query flags, so
  `?received=1` cannot fabricate a success state and receipt data is absent from public URLs and
  cacheable HTML.
- [x] Preserve rejection/network/validation behavior on the originating form. No receipt is stored
  on a rejected response; the form remains visible with entered values and its existing error
  summary. `functions/api/lead.ts`, providers, validation, consent, uploads, storage and email code
  are unchanged.
- [x] Preserve existing campaign conversion tracking. `PpcHeroForm` still fires
  `ppc_form_success` only after backend acceptance and claims the existing
  `ac_ppc_lead:<confirmationCode>` session key before navigation. Only its generic
  `/thank-you/` destination uses the new receipt handoff; all dedicated campaign destinations keep
  their existing query contract and once-only recovery logic. The generic receipt page emits no
  conversion on direct visits, refreshes or accepted-state rendering. The repository's existing
  analytics suite passes **38/38**, and the generic rodent PPC-form path separately confirms one
  success event, the existing claim key and no duplicate after receipt refresh.
- [x] Direct navigation, malformed/legacy success query, mocked HTTP 422 rejection and mocked HTTP
  201 acceptance tested in Chrome with every `/api/lead` request intercepted. Acceptance redirects
  once to clean `/thank-you/`, displays the real mocked backend reference and survives refresh
  without reposting. Rejection stays on `/contact/`, retains the entered name, shows its form error,
  stores no receipt and fires no lead conversion.
- [x] Responsive success layout checked at 1440×1000, 390×844 and 320×700; direct state checked at
  1440×1000; 200% CSS zoom checked at a 720×700 layout viewport. All have zero horizontal overflow,
  retain visible actions/footer and the success page remains white. Automated WCAG 2 A/AA and
  WCAG 2.1 A/AA checks report zero violations on the direct desktop and 390/320 success states.
- [x] Focused browser suite passes **42/42** assertions across direct/forged visits, contact-form
  rejection and acceptance, generic PPC acceptance/deduplication, desktop/mobile/320px layout and
  200% zoom. All endpoint responses are intercepted; no provider request or real inquiry is sent.
- [x] `npm run build:local`: pass, 54 Astro pages before development-route pruning.
  `npm run check`: pass, 0 errors and 0 warnings (63 existing hints).

**Changed implementation:** `src/pages/thank-you.astro`, new
`src/scripts/acceptedInquiryReceipt.ts`, and the success handoff in `AcCompactForm.astro`,
`QuickHandoffForm.astro`, `AssessmentForm.astro` and `PpcHeroForm.astro`. The protected lead
endpoint and all email/provider files are untouched.

**Evidence:** `output/submission-flow-install/browser-results.json`,
`success-{1440,390,320}.png`, `direct-1440.png`, `failure-390.png` and
`success-200-percent.png`. Results are local mocked-delivery UI evidence only; they do not prove
live Turnstile, storage, CRM, provider email or analytics delivery.

**Checkpoint:** thank-you page installed locally in that task. Email implementation was deferred
to the separately authorized step recorded below; dedicated campaign-receipt redesign, push and
deployment were not started.

## Submission-flow email installation — 2026-09-20

**Scope:** only the approved customer-confirmation and owner-lead-notification designs from
`aseptaclean-submission-flow`. The thank-you page, campaign receipts, forms, protected lead
endpoint, CRM/SMS behavior and public pages were not changed. No email was sent, and no push or
deployment was performed.

- [x] Read package `START-HERE.md`, `PACKAGE-STATUS.md`, `IMPLEMENTATION.md`, both email design
  HTML files and both text extracts. Preserve the corrected white surface, navy headings/actions,
  slate body copy, thin dividers and light-only color scheme.
- [x] Add provider-compatible, table-based HTML with inline presentation styles, a small responsive
  email-client media query, no JavaScript/SVG/external assets, and a complete plain-text alternative
  for each message.
- [x] Use Resend through the existing provider module. Customer From is `Aseptaclean`; owner From is
  `Aseptaclean Website`; the underlying sender remains configured `EMAIL_FROM_ADDRESS`. Customer
  Reply-To remains the repository's monitored address; owner Reply-To is the validated customer
  email when present and omitted otherwise. Owner To remains `OWNER_ALERT_EMAIL`; no address was
  invented or copied into source.
- [x] Replace every sample value with the accepted lead record: server-generated confirmation code,
  mapped public service label, validated name/email/phone/ZIP/message, actual source form/page and
  attribution, accepted time formatted in `America/Los_Angeles`, recorded consent/form version,
  and current customer-email delivery state. Missing optional sections are omitted or stated as
  unavailable; phone-only owner messages omit the email action and say confirmation was not
  requested.
- [x] Escape every submitted value in HTML and remove CR/LF from provider subject headers. Long
  messages and line breaks remain intact. Customer messages never receive attachment links.
  Owner messages show attachment count plus private R2 object references only; no public or
  guessable upload URL is generated.
- [x] Preserve accepted-submission ordering and duplicate behavior without editing
  `functions/api/lead.ts`: durable R2 storage and the dedupe record precede provider calls; rejected
  submissions never reach email functions; provider failure remains recorded without converting an
  accepted lead into a form failure; an idempotent resubmission returns the original receipt without
  another email attempt. Existing SMS-success/fallback routing is unchanged.
- [x] Local template rendering covers both HTML and text, special characters/header injection,
  long messages, absent optional fields/email, Pacific daylight-saving conversion, consent,
  attribution, photo status and protected references. Render files were written to a temporary local
  directory only; they contain synthetic `.test` data and were not delivered.
- [x] Mocked Resend integration checks inspect the exact provider payloads, display names, subjects,
  HTML/text bodies, reply routing, protected upload references, accepted failure behavior and
  duplicate suppression. All provider calls were intercepted; 40/40 endpoint assertions pass.

**Changed implementation:** new `functions/_lib/emailTemplates.ts`; scoped Resend payload changes in
`functions/_lib/providers.ts`; new `scripts/submission-email-check.mjs` and
`qa:submission-emails`; updated provider assertions in `scripts/phase3-endpoint-check.mjs` and
`scripts/ppc-endpoint-check.mjs`. The protected `functions/api/lead.ts` is byte-unchanged.

**Verification:** `npm run qa:submission-emails` passes all focused render/escaping assertions and
produces four temporary local render files. `npm run qa:phase3:endpoint` passes its storage,
validation, provider, SMS-fallback and duplicate suite. The PPC endpoint/provider harness passes
40/40 with in-memory R2 and mocked Turnstile, HubSpot and Resend, including simulated Resend failure
after acceptance and no repeated attempts on the duplicate request. `npm run check` reports zero
errors; the two initial new-code unused-variable hints were removed before final verification.

**Exact remaining blocker:** the repository identifies Resend as the provider and has a configured
production `OWNER_ALERT_EMAIL`, but local configuration does not contain `RESEND_API_KEY` or
`EMAIL_FROM_ADDRESS`; those are intentionally Cloudflare Pages runtime secrets. Their presence,
verified-sender status and production values cannot be established from this workspace. The current
instruction also prohibits sending. Consequently no live delivery, inbox receipt, spam placement,
or Gmail/Apple Mail/Outlook rendering claim is made. Before deployment, verify those two secrets in
Cloudflare and run controlled recipient tests in supported clients; this requires a separately
authorized test-send context.

**Stop:** both requested email designs are implemented and locally verified. No other
submission-flow surface was changed; nothing was sent, pushed or deployed.

## Final ten-package integration verification — 2026-09-20

**Scope:** integrated local verification of all ten installed packages. No About or Detailed Deep
Cleaning page was added or redesigned. No real lead/email, push, or deployment. The protected
`functions/api/lead.ts` remains byte-untouched.

### Regression repaired

- [x] The submission-flow owner-notification template had dropped the estate campaign's optional
  `property_status` answer. Restore that accepted field as a conditional `Property status` row in
  both HTML and plain text. Blank answers still produce no empty row.
- [x] Update the estate endpoint assertion and package interaction evidence scripts to the installed
  submission-flow contract: accepted generic receipts use same-tab/session handoff and a clean
  `/thank-you/` URL, not the superseded `received`, `code`, or `email` query parameters. This changes
  stale test expectations only; public page copy/layout and endpoint behavior were not redesigned.
- [x] Rerun the estate endpoint test: all 16 assertions pass, including blank optional details,
  property-status delivery, rejection cases and duplicate suppression.

### Integrated browser and reference results

- [x] Fresh rendered pass covers the ten surfaces at **1440, 820, 390 and 320px** (40 page/width
  checks): home, Contact, Estate public, Estate campaign, Extreme public, Hoarding public, Rodent
  public, Rodent campaign, Trauma public and generic Thank You. All 40 have zero horizontal
  document overflow, correct visible-H1 state, no duplicate IDs, no broken in-page targets, correct
  central phone destinations, no campaign links in public chrome, correct `/api/lead` form action
  where applicable, loaded visible imagery and zero axe WCAG 2.0/2.1 A/AA violations.
- [x] Current actual screenshots and 1440px local-reference captures are under
  `output/final-integration-2026-09-20/`; measurements are in `integration-results.json`. Reference
  heading comparison is exact except intentional production adaptations already authorized by the
  packages: the homepage demo-success heading is not shipped; rodent public uses the real shared
  footer headings; and the rodent campaign omits the preview's affirmative `Disinfect` heading under
  claims law. No approved page wording was rewritten to force a match.
- [x] Navigation/dropdown and mobile-menu keyboard open, Escape/focus return, selection close,
  CTA-to-form focus, native FAQ toggles, 200% CSS zoom/reflow and accepted/error form paths pass in
  the focused home, estate, hoarding, rodent, trauma and extreme package suites. Contact passes
  **80/80** assertions, including validation, all seven CRM mappings, private upload byte storage,
  upload rejection/failure, retained input/file state, rapid-submit prevention and clean accepted
  receipt routing.
- [x] Estate and rodent campaign browser suites pass **31/31 each**: local validation, attribution,
  genuine-success-only conversion, failure/network behavior, once-only confirmation recovery,
  clean receipt URLs and no PII in analytics. Generic Thank You passes direct/forged navigation,
  accepted/rejected contact and PPC flows, refresh deduplication, 390/320 layouts, accessibility and
  200% zoom. No provider request or real inquiry was sent.
- [x] Fresh unrelated-consumer regression renders add **60 checks** at 1440/820/390/320 across
  Detailed Deep Cleaning, About, Privacy, the public/shared-form consumers, the untouched hoarding
  campaign and all three campaign receipt pages. They show zero horizontal overflow, zero
  package-root/style leakage and no changed form action. No missing About or Detailed Deep Cleaning
  page was created; their existing routes were verification consumers only.
- [x] Metadata/canonical/indexation inspection passes for the ten targets: nine installed page
  targets are index/follow and generic `/thank-you/` is noindex/follow. `qa:launch` passes with
  exactly 15 approved indexable routes and no public promotion of hidden routes. Redirect source
  remains unchanged: `/services/` → `/#services`; `/estate-cleanout` aliases → the estate campaign;
  `/request-assessment/` remains unavailable. Redirect HTTP handling was source-inspected, not
  exercised against Cloudflare Pages in this local static environment.
- [x] Fresh build/type/integration results: `npm run build:local` passes (54 Astro pages before
  dev-route pruning); `npm run check` passes with 0 errors/0 warnings and 63 hints; situation enum,
  static analytics tagging (13/13), analytics events/consent/attribution (38/38), launch architecture,
  submission-email rendering, general endpoint adapter and estate endpoint suites pass. Full-site
  H1/body ratios pass at all nine audited widths (worst installed-package ratio 1.938:1).

### Remaining blockers and audit debt

1. **Approval blockers:** Contact, estate-campaign and rodent-campaign copy remains provisional and
   awaits owner approval unchanged. Estate/rodent campaign illustrative photographs still require
   rights/provenance and production approval; they are not Aseptaclean job evidence.
2. **Live-provider blockers:** deployed-host Turnstile and Termly, Cloudflare R2, CRM/SMS, Resend
   secrets/verified sender, inbox delivery/spam placement, email-client rendering and downstream ad
   receipt remain unverified. All successful submissions and emails in this pass were mocked or used
   in-memory adapters. No real notification was sent.
3. **Existing repository audit failure — not changed here:** `qa:copy` and `qa:gate6` still request
   retired `dist/services/index.html` and stop with ENOENT. The retired Services page was not restored.
4. **Owner-approved-copy conflict requiring a decision:** `qa:seo` reports the same H1 on the supplied
   hoarding and rodent public references (`Take Back Your Space. Leave the Cleanup to Us.`). Both
   pages match their supplied package wording, so this integration pass does not rewrite either.
5. **Full-site type-law audit debt outside a layout rewrite:** every route clears the 1.9 H1/body
   ratio, while the selector audit still reports package-local role declarations plus existing
   private-residence/city selectors. Scoped package checks and rendered layouts pass; the global
   audit's role-recognition expectations need a separate authorized reconciliation rather than
   changing approved visual typography here.

**Readiness:** the integrated implementation is **ready for owner/design review**, with the one
confirmed installation regression repaired. It is **not production-release ready** until the
provisional copy/photo approvals and live-provider checks above are resolved, and the duplicate-H1
SEO decision is made. Nothing was pushed or deployed.

## Detailed Deep Cleaning approved-page installation — 2026-09-20

**Scope:** only the existing `/deep-cleaning-san-jose/` public service route. The supplied archive
was checksum-verified and extracted intact under
`docs/reference/detailed-deep-approved-2026-09-19-r01/`. The implementation follows
`detailed-deep-approved-fragment.html`; the complete HTML is the visual reference and
`APPROVED-COPY.md` is supporting documentation. No iframe, demo submit handler, second copy of the
embedded stylesheet, unrelated page change, real inquiry, push, or deployment.

- [x] Preserve the existing URL, canonical URL, exact title and meta description, indexation,
  structured-data route identity, current public navigation destinations, phone destination,
  redirects and shared analytics installation. `functions/api/lead.ts`, `public/_redirects` and
  `src/data/launchArchitecture.ts` retain their task-start SHA-256 hashes.
- [x] Rebuild the route in Astro from the supplied fragment with page-scoped `#ac-detailed` CSS,
  the existing approved reversed logo and the two supplied illustrative photographs. Extract the
  data-URI photographs once into local assets; do not load the preview's embedded CSS beside the
  installed stylesheet.
- [x] Preserve the exact two-line hero, section sequence, full-width section headings, landscape
  image geometry, decision/check rows beneath both split columns, one-column FAQ accordion and
  bottom contact form. Render one H1, one form and no form in the hero. Keep numeric pricing absent
  and retain the documented exclusions for heavy waste/biohazard scope, repairs, pest control,
  damaged-material replacement, inaccessible areas and unlisted cabinet/appliance interiors.
- [x] Adapt only production-owned chrome and behavior: use the current public service links,
  central phone/business data, privacy/terms/cookie destinations, Termly preference control,
  legal qualifiers, `Send Message` submit label and the existing compact production form. The
  supplied `Request an Assessment` page CTA wording is retained and points to the local bottom form.
- [x] Connect the bottom form to `POST /api/lead` with the frozen `Detailed deep cleaning` situation
  value and map the supplied cleaning-need choice into the existing `property_detail` field. Keep
  the existing name/contact/message validation, consent, honeypot, Turnstile, status/error handling,
  accepted-receipt redirect and analytics behavior. The existing backend supports private uploads,
  so the installed `property_media[]` control is functional and was retained.
- [x] Compare actual and reference renders at **1440, 1024, 768, 390 and 320px**, plus 200% zoom
  (720 CSS px at 2× device scale, producing a 1440px physical capture). Every required width has zero horizontal
  overflow, intact wrapping, loaded/cropped imagery, visible CTAs, correct desktop/mobile menu
  state, single-column FAQ layout and no duplicate IDs. The three main split-section photographs
  retain the reference geometry: 3:2, 1.35:1 and 3:2 at desktop.
- [x] Check accessibility and interaction in headless Chrome. Axe reports zero WCAG 2.0/2.1 A/AA
  violations at all five required widths. Glyph-level sampling over the photographic hero reports
  a worst text contrast of **6.00:1**. Mobile menu keyboard open, Escape close/focus return, native
  FAQ keyboard toggle and CTA-to-form focus all pass.
- [x] Test two form paths with every `/api/lead` request intercepted: a mocked rejection retains
  values and shows the existing error state; a mocked accepted response redirects to
  `/thank-you/`. The multipart request contains the uploaded test bytes, correct service enum and
  selected cleaning-need mapping. No real inquiry or provider request was sent.
- [x] Run repository checks. `npm run build:local` passes (54 Astro pages before dev-route pruning);
  `npm run check` passes with zero errors and only pre-existing diagnostics elsewhere in the tree;
  `qa:situations`, `qa:analytics` (13/13), `qa:launch` and `qa:phase3:endpoint` pass;
  `git diff --check` passes.

**Changed implementation:** `src/pages/deep-cleaning-san-jose/index.astro`, new
`src/components/detailed/DetailedHeader.astro`, new `src/components/detailed/DetailedIcon.astro`,
new `src/styles/detailed-deep-service-kit.css`, two new `src/assets/aseptaclean/detailed-deep-`
`service-{0,1}.jpg` assets, and opt-in Detailed-kit adapters in `BaseLayout.astro`,
`AcCompactForm.astro` and `Analytics.astro`. Shared-file edits are additive and limited to this
route's opt-in body scope, form mapping/upload presentation and local CTA-intent anchor.

**Evidence:** `output/detailed-deep-install/visual-results.json`,
`interaction-results.json`, `zoom-results.json`, `contrast-results.json`, `axe-*.json`, and paired
`actual-*` / `reference-*` screenshots for all five widths. These are local rendered and mocked-
submission results, not proof of deployed provider delivery.

**Outstanding issues:** the legacy `npm run qa:copy` audit still stops at the already-retired
`dist/services/index.html` with ENOENT, as documented by earlier installations; the retired page was
not restored and this is not a Detailed Deep Cleaning regression. Live deployed Turnstile/Termly,
R2, CRM/email/SMS delivery and downstream analytics receipt remain unverified. The next action is
owner/design review of the paired screenshots, followed by separately authorized live-environment
verification. Stop after this page; nothing was pushed or deployed.

## Estate inherited-home campaign replacement — 2026-09-20

**Scope and authority:** only the existing `/estate-cleanout-san-jose/assessment/` campaign route.
The owner explicitly made `aseptaclean-estate-inherited-landing-2026-09-20-r01.zip` the replacement
design for this route, superseding the older estate landing package despite the archive's earlier
packaging note that it did not itself authorize replacement. The ZIP SHA-256 is
`42a177b99d86e19b6f9df6331d4d4cc24fc458315e6cf645557922083115d2ed`; every included checksum
passes. Its intact contents are retained under
`docs/reference/estate-inherited-landing-2026-09-20-r01/`. The fragment is the implementation
source, the preview is the visual reference and the text extraction is the proofreading reference.
The public `/estate-cleanout-san-jose/` page and `/hoarding-cleanup-san-jose/` remain outside scope
and were not edited. No duplicate URL, push, deployment or real inquiry was created.

- [x] Preserve the exact hero wording, supplied CTA wording, CSS cascade, responsive photograph
  proportions and section order: editorial hero, photographic service rows, belongings/process,
  estate records, out-of-town call band, five FAQs and the bottom assessment form. Use the existing
  approved wordmark and the package's existing illustrative atlas assets; their bytes already
  matched `src/assets/aseptaclean/estate-landing-{0,1}.jpg`, so no duplicate images were added.
- [x] Preserve `/estate-cleanout-san-jose/assessment/`, its canonical URL, `index, follow` state,
  launch-architecture membership, `/estate-cleanout` redirects, `Inherited or estate property`
  campaign identity, hidden attribution/idempotency values, analytics, receipt route and existing
  conversion deduplication. `functions/api/lead.ts`, `public/_redirects`,
  `src/data/launchArchitecture.ts` and `src/data/ppcEstate.ts` were not edited.
- [x] Keep estate/inherited-home cleanouts as the primary offer. Heavy clutter and hoarding remain
  property conditions inside that offer, not a separate general-hoarding campaign. No pricing,
  free-assessment promise, appraisal, ownership determination, dispute-resolution claim or new
  service promise was added.
- [x] Replace only demo form behavior with the existing `PpcHeroForm` production flow: required
  contact data, privacy consent, honeypot, Turnstile, validation, private upload limits, error state,
  accepted receipt and conversion tracking remain. The backend already supports private
  `property_media[]` storage, so the working upload stays and the preview-only “no inquiry was sent”
  notice is absent. The real submit retains the supplied `Request an Assessment` wording.
- [x] Add route-scoped validation and lossless delivery for `estate_role`,
  `estate_contents_level` and `estate_timeline`. Role is required as displayed; all three fields use
  exact allowlists and reach the owner email, plaintext alert and HubSpot deal summary. The general
  endpoint and other forms retain their prior validation contracts.
- [x] Proofread the fragment against `estate-inherited-landing-copy.txt`. **No obvious spelling,
  punctuation or accidental text-spacing error required a source-copy correction.** No substantive
  wording was rewritten; the package's own editorial/draft status is not promoted to final approval.
- [x] Map every supplied heading size to explicit `.ac-type-estate-landing-*` role classes. The
  route-scoped type-law audit is clean at nine widths; the worst H1/body ratio is 2.125:1 at 768px,
  and no one-word final H1 line occurs.
- [x] Compare rendered and reference pages at **1440, 1024, 768, 390 and 320px**, plus 200% CSS zoom
  and a 720-CSS-pixel 2× reflow equivalent. All widths have zero horizontal overflow, no duplicate
  IDs, intact hero wording, expected 3:2 hero/desktop service imagery and supplied 1:1 mobile
  service crops. Heading wrapping, neighboring sections, all five FAQs, phone destinations and
  assessment anchors pass. Paired captures and measurements are under
  `output/estate-inherited-landing-install/`.
- [x] Run accessibility and interaction checks. Axe reports zero WCAG 2.0/2.1 A/AA violations at
  every requested width; supplied colors therefore clear the automated contrast audit. Native FAQ
  keyboard toggling and assessment-link focus transfer to `full_name` pass.
- [x] Exercise browser submission without real delivery. Mocked 201 success posts all three new
  fields and values, raises `form_start → ppc_form_submit_attempt → ppc_form_success`, then uses the
  existing estate receipt. Mocked 422 failure posts the same retained data, preserves entered
  values, announces the server error and raises `ppc_form_error` with no success event.
- [x] Run repository checks: `npm run build:local` passes (54 Astro pages before dev pruning);
  `npm run check` passes with 0 errors, 0 warnings and 62 existing hints; estate endpoint validation,
  the general endpoint adapter, situation enum, static analytics (13/13), browser analytics/events
  (38/38), launch architecture and updated estate page suite (62/62) pass.

**Changed implementation and tests:**
`src/pages/estate-cleanout-san-jose/assessment/index.astro`,
`src/styles/estate-landing-kit.css`, the estate opt-in body scope in `src/layouts/PpcLayout.astro`,
route-scoped field handling in `functions/_lib/lead.ts`, `functions/_lib/providers.ts` and
`functions/_lib/emailTemplates.ts`, plus `scripts/estate-campaign-form-check.mjs` and
`scripts/estate-campaign-page-check.mjs`. The latter replaces assertions for the retired landing
composition with checks for this current reference. Evidence and the reproducible local browser
runner are in `output/estate-inherited-landing-install/`.

**Remaining blockers:** deployed Turnstile/Termly, private R2, CRM/email/SMS provider delivery,
downstream analytics receipt and real email-client rendering remain unverified; all accepted and
rejected form tests were local/mocked. The package's illustrative-photo provenance/production
approval and its stated editorial/draft status still require owner review before release. No real
notification was sent. Stop after this page; nothing was pushed or deployed.

## Final installed-page hero QA — 2026-09-20

- [x] Read this installation checklist and the active design/release QA sources, then inspect a
  fresh rendered baseline before editing.
- [x] Measure and capture Home, six public services, Estate/Rodent campaigns, Contact and generic
  Thank You at 1440, 1024, 768, 390 and 320px, plus 200% zoom.
- [x] Add one late-loaded scoped hero contract. Public services now measure exactly 632px at
  1440/1024 and 576px at 768, with equal copy shells, vertical padding, H1 scale and CTA bottom
  alignment. Mobile remains content-driven.
- [x] Keep the campaigns separate from public navigation while equalizing their hero shells to
  665px at 1440, 604px at 1024 and 610px at 768. Both retain a 3:2 image ratio and equal CTA
  placement at those widths; mobile/zoom may grow for approved copy.
- [x] Preserve homepage, Contact and Thank You compositions without geometry changes. Preserve all
  heading breaks/copy, image crops, forms, routes and provider behavior.
- [x] Final build and type checks pass. Across 55 route/width checks: zero overflow, clipping or axe
  WCAG A/AA violations; every 200%-zoom check is overflow-free. `git diff --check` passes.

Full measurements, comparison screenshots and remaining live-provider/approval limits are recorded
in `docs/ASEPTACLEAN-DESIGN-QA.md` → “Final installed-page hero QA” and
`output/final-hero-qa-2026-09-20/`. Nothing pushed or deployed.
