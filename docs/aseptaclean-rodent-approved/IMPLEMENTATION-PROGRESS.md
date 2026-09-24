# Approved Rodent public service implementation

Status: implementation complete and ready for local review, 2026-09-18. No push or deployment authorized.

## Sources and actual route

- Canonical public route: `/rodent-dropping-cleanup-san-jose/`; source: `src/pages/rodent-dropping-cleanup-san-jose/index.astro`.
- Kit arrived at `docs/START-HERE copy.md`, `docs/aseptaclean-rodent-approved.html`, `docs/rodent-approved-fragment.html`, and `docs/aseptaclean-rodent-approved.css`, rather than the requested subfolder. Originals remain untouched.
- Read root START-HERE, AGENTS/CLAUDE, documentation index, owner design spec and QA, claims law, integration contract, existing page, layout and production form.
- Working tree already contains substantial owner work. Baseline file hashes saved in `output/rodent-approved/source-baseline.json`; unrelated edits must be preserved.

## Decisions and integration mapping

- Current explicit request governs this public route's copy, section order, content-driven hero, imagery, CTA wording and proportions over older shared-hero/matrix requirements. Campaign remains unchanged.
- Keep BaseLayout's actual shared header/footer and logo, six-service navigation, consent and mobile call control. Mockup utility/page-local navigation/footer are not installed.
- Adapt `rodent-contact` to existing `rodent-form` consistently; keep actual form `rodent-form-panel`, attribution `/rodent-dropping-cleanup-san-jose/#rodent-form`, `/api/lead`, enum `Rodent droppings or animal waste`, and `/thank-you/`. This preserves the existing analytics anchor matcher without shared changes.
- Reuse PpcHeroForm with production fields, uploads, required states, consent, Turnstile, honeypot, validation, errors and success routing. Demo area selector and demo handler do not replace the backend schema. Submit uses the newly requested `Request an Assessment` label.
- Preserve required claims-law §2.3 and §3.1 disclosure paragraphs inside Before work begins, after the two scope columns. Approved copy otherwise stays exact.
- Use supplied illustrative imagery under the explicit current request; do not generate imagery or call it completed work. Approved city list is page-local owner copy (includes Menlo Park, Redwood City and San Mateo beyond the older shared coverage list); do not expand other pages' coverage.
- Convert heading size selectors to dedicated `.ac-type-rodent-*` roles with the same values; preserve other stylesheet declarations and override order.

## Progress

Implementation, build, responsive review, interaction checks and the final handoff record are complete.
Remaining external-verification limits are listed at the end of this record.

## Completed implementation

- Installed the exact approved body sequence, native six-question FAQ (first open), all five
  assessment anchors, and verified central phone links.
- Preserved the three-step full-width belongings row and stacked mobile layout; before-work
  columns remain below the split and image stays 3:2; FAQ maximum is 800px.
- Extracted both embedded images byte-for-byte (SHA-256 matched), retained original sprite
  positions and landscape override. All 86 checked approved body text blocks are present verbatim.
- Production form integrated without changes to its component or backend. Field names, fixed
  situation, required flags, photo limits, consent and attribution remain intact. Existing fee
  microcopy remains as a production integration difference from the demo.
- Original style-block cascade preserved in one page-only import; heading sizes moved into
  dedicated role classes. Mapped the reference's Inter name to locally served Inter Variable,
  and reset inherited prose measures inside the page. No type shrinking, clipping or fixed
  section heights used.
- Shared header/footer retained, including six public services and Estate Cleanout. No campaign
  source, shared component, shared stylesheet, route configuration or endpoint changed.
- Updated public route brief and current decisions; updated the existing public rodent copy
  fixture, with optional `ROUTES` filtering for focused audits.

## Changed deliverable files

1. `src/pages/rodent-dropping-cleanup-san-jose/index.astro`
2. `src/styles/aseptaclean-rodent.css` (new)
3. `public/images/rodent-approved/illustrative-photo-grid.jpg` (new)
4. `public/images/rodent-approved/illustrative-documentation.jpg` (new)
5. `scripts/copy-fidelity-audit.mjs`
6. `docs/page-briefs/RODENT-ANIMAL-WASTE.md`
7. `docs/05-CURRENT-DECISIONS.md` (appended only)
8. `docs/aseptaclean-rodent-approved/IMPLEMENTATION-PROGRESS.md` (this record)

Evidence and local QA scripts are in `output/rodent-approved/`. The existing broad site check also
wrote `artifacts/current-site-verification.json`; a copy is preserved in the evidence folder.
Source baseline comparison confirms this task changed only the public rodent route among existing
`src/` and `functions/` files, plus the new page stylesheet. See `source-isolation.json`.

## Actual verification

Local built preview: **http://127.0.0.1:4321/rodent-dropping-cleanup-san-jose/**.
Astro development preview also started at **http://127.0.0.1:4322/rodent-dropping-cleanup-san-jose/**.
Browser: installed Playwright Core with local Google Chrome. No browser skill was available in the
session catalog. Browser and server execution required the permitted sandbox escalation.

| Check | Actual result |
| --- | --- |
| `npm run build` | PASS; environment and situation guards passed, 54 Astro pages built, development routes pruned |
| `npm run check` | PASS; 0 errors, 0 warnings, 13 existing hints |
| `ROUTES=/rodent-dropping-cleanup-san-jose/ npm run qa:copy` | PASS; 47 mapped blocks and original source-copy preservation |
| Direct approved-fragment fidelity comparison | PASS; 86 body blocks present, both image hashes match |
| Route-scoped `scripts/type-law-check.mjs` | PASS at 9 widths (320–1920); role-only heading sizes, minimum H1/body ratio 2.118 |
| `npm run qa:analytics` | PASS; 13/13 tagging checks |
| `npm run qa:phase3:endpoint` | PASS; existing endpoint checks using memory storage/provider mocks, including uploads, validation, duplicate submission and delivery-failure behavior |
| Page interaction checks | PASS; 20 checks recorded in `interaction-results.json` |
| Axe page-content WCAG A/AA audit | PASS; zero violations (`axe.json`) |
| `npm run qa:current` | Completed all 51 built routes × 6 widths; four findings on unchanged campaign pages, listed below; no finding on changed public rodent route |
| Full unfiltered `npm run qa:copy` | Stops at stale `dist/services/index.html` fixture, because the Services hub was already retired; not reported as a pass |
| Focused diff whitespace check | PASS |

Responsive measurements from the final build:

| Width | Horizontal overflow | Hero height (content-driven) | Before-work ratio | FAQ width |
| --- | --- | --- | --- | --- |
| 1440 | 0px | 612.78px | 1.500 | 800px |
| 1024 | 0px | 540.73px | 1.500 | 800px |
| 820 | 0px | 462.62px | 1.500 | 780px |
| 768 | 0px | 456.97px | 1.500 | 728px |
| 390 | 0px | 542.22px | 1.500 | 350px |
| 320 | 0px | 587.00px | 1.500 | 280px |

No duplicate IDs or broken visible image elements. Three belongings columns at desktop/tablet,
one at 390/320. Scope columns remain below the image row. No horizontal overflow in the 200%
desktop-zoom equivalent (720 CSS pixels with 2x device scale); this is an emulation, not a manual
Chrome toolbar zoom test. Broad site check additionally inspected 375px and found no public rodent
clipping/overflow or serious accessibility issue.

Interactions verified: six public destination links, Services keyboard toggle and Escape focus
return, mobile navigation and Escape, all five assessment anchors landing below sticky navigation,
assessment-click analytics, verified telephone hrefs, all six FAQs by keyboard, expanded long FAQ
at mobile, required-field errors, unsupported upload rejection, valid photo selection, one-character
message, preserved multipart service/UTM/photo fields, error retention on mocked 503, accepted mocked
201 → actual thank-you UI, and no repost on thank-you refresh.

## Screenshots and reference comparison

- Full actual page: `output/rodent-approved/page-1440.png`, `page-1024.png`, `page-820.png`,
  `page-768.png`, `page-390.png`, `page-320.png`.
- Section close-ups: `hero-*`, `belongings-*`, `before-*`, `faq-*`, `form-*` at 1440/768/390/320.
  Taller same-width viewports are used for close-ups so fixed shared controls do not cover sections.
- Actual interactions: `services-open-1440.png`, `navigation-390.png`, `form-anchor-390.png`,
  `faq-expanded-390.png`, `zoom-200-equivalent.png`.
- The supplied standalone HTML was opened in Chrome. Its iframe export clips below-fold paint in
  a full-page screenshot, so `reference-1440.png`/`reference-390.png` and `reference-{section}-*`
  render the supplied fragment directly, with its original styles, extracted Lucide icons and
  the site's required local Inter face. `reference-standalone-1440.png` retains the original
  exported-wrapper capture. Source kit files were not changed.
- Visually reviewed hero, trust/coverage flow, belongings, before-work, FAQ, form and surrounding
  sections at desktop/mobile; measured each required width. Kept exact approved photo crops,
  including thin collage-edge artifacts already embedded in the supplied reference assets.
- Homepage, hoarding public page and rodent campaign regression captures: `baseline-*` and
  `after-*`. They contain no rodent CSS/scope, and their sources remain unchanged. Screenshots
  are not pixel-identical: the baseline allowed external vendors while deterministic QA blocked
  them (notably Turnstile widget height). Do not treat those captures as a pixel-diff pass.

## Remaining differences and limitations

Implementation is ready for local owner review. No outstanding code/layout repair was identified
on the changed public page.

Intentional mockup differences: actual shared header/footer/logo and mobile call bar; production
form fields, upload UI, consent, security control and existing fee microcopy; mandatory cleanup and
pest-boundary disclosures; local Inter Variable rather than the reference's Arial fallback. Inter
has different metrics and may wrap to an extra line; original font sizes are preserved and heights
remain content-driven. No unsupported mockup area-selector field was introduced.

**No real lead was sent.** Browser submission tests intercepted `/api/lead` and injected a local-only
mock verification token; endpoint tests used mocked storage/providers. Live Turnstile completion,
Cloudflare Pages upload storage and real CRM/email/SMS delivery remain unverified here. The plain
local preview does not execute Cloudflare Pages Functions. Production form wiring is retained;
there is no demo submission handler or fabricated success state in shipped code.

The broad audit's four pre-existing findings are on untouched routes: rodent campaign color
contrast, and missing BreadcrumbList schema on the estate, hoarding and rodent campaign routes.
The full copy audit also retains a stale Services-hub fixture. They were left outside this public
page implementation and are not hidden as passing checks.

No push or deployment performed. All unrelated pre-existing working-tree changes preserved.
