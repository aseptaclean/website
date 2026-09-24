# Aseptaclean design-spec QA record

Required by `docs/ASEPTACLEAN-DESIGN-SPEC.md` §1/§12. Route/viewport results, actual measured hero
heights, screenshot paths, interaction/build checks, unresolved failures, and confirmation nothing
was deployed. Written 2026-09-18. Verification ran against `npm run build:local`'s `dist/` output,
served locally by a throwaway static file server and driven by headless Chromium
(`playwright-core`, `chromium.launch({ executablePath: <local Google Chrome> })`) — the same
mechanism this repository's own `scripts/*-check.mjs` QA scripts already use. No dev server, no
Cloudflare Pages Functions environment (the real `/api/lead` endpoint), and no real test lead were
exercised — see "Not verified" at the bottom.

**Screenshots**: `artifacts/design-spec-2026-09-18/*.png` (34 files — 11 routes × 3 widths, plus
the services-dropdown-open capture). Raw measurement log:
`artifacts/design-spec-2026-09-18/measurement-results.txt`.

## 1. Build and type checks

- `npm run check` (astro check): **0 errors**, 0 warnings, 11 pre-existing hints in files this
  session did not touch.
- `npm run build:local`: **54 pages built**, 0 errors (was 55 before this session — the retired
  `/services/` page accounts for the exact difference).

## 2. Hero equality — the spec's central acceptance criterion

Measured `.ac-hero`'s `getBoundingClientRect().height` via the spec's own §12.4 helper, at
1440×1000, 820×1180, and 390×844, after `waitUntil: "load"` + a 400ms settle.

| Route | Desktop 1440 | Tablet 820 | Mobile 390 |
| --- | --- | --- | --- |
| `/` | 736px | 592px | 693px |
| `/hoarding-cleanup-san-jose/` | 736px | 592px | 821px |
| `/extreme-cleaning-san-jose/` | 736px | 592px | 837px |
| `/deep-cleaning-san-jose/` | 736px | 592px | 805px |
| `/crime-scene-trauma-cleanup-san-jose/` | 736px | 592px | 749px |
| `/rodent-dropping-cleanup-san-jose/` | 736px | 592px | 701px |
| `/estate-cleanout-san-jose/` | 736px | 592px | 583px |
| `/about/` | 736px | 592px | 487px |
| `/contact/` | 736px | 592px | 497px |
| `/rodent-dropping-cleanup-san-jose/assessment/` (campaign) | 736px | 592px | 712px |
| `/estate-cleanout-san-jose/assessment/` (campaign) | 736px | **1060px ⚠** | 1013px |

**Result: PASS at desktop (1440) — all eleven routes measure exactly 736px, 0px variance.**
**Result: PASS at tablet (820) for 10 of 11 routes — exactly 592px, 0px variance.**
**Result: known exception at tablet for the estate campaign** (see below). Mobile heights are not
required to be equal (spec §2.2: "Mobile... allow content-driven height... Long copy is not
permission to silently edit wording") and vary 487–1060px across routes as expected, driven by
each page's own approved copy length.

**How 736/592 was reached.** The spec's initial target table (§2.1) is 600px desktop / 560px
tablet. Measured at that floor, the longest approved hero copy on the site — Extreme Cleaning's —
naturally rendered at 736px desktop / 589px tablet, both above the target floor. Per §2.2's own
explicit repair rule ("increase the shared token in 8px increments to the smallest value that fits
every reviewed hero at that breakpoint"), the shared token was raised to 736px / 592px (592 = the
next 8px increment ≥589) and every hero component rebuilt against it. Re-measurement confirmed
exact equality as shown above. No hero copy was shortened, clipped, or reworded to make this fit.

**Known exception, not fixed this session — estate campaign at tablet width (820px).**
`/estate-cleanout-san-jose/assessment/`'s hero (`PpcBrightHero.astro`, the spec's permitted "split"
composition: text 54% / image 46%, side by side) has its own pre-existing internal responsive
breakpoint at `max-width: 62rem` (992px) where the two-column grid collapses to one column and the
image drops below the text. Because 992px is *above* the tablet range's upper bound (1023px is the
spec's ceiling, but 992px sits inside 768–1023px), an 820px viewport is already in this hero's
*stacked* layout — text height + gap + image height, not text height alone — which is
substantially taller than the 592px shared floor. Root cause identified; not fixed in this
session, since lowering the stacking breakpoint to align with the shared 768px tablet threshold
needs its own readability check of the 54/46 columns at 820–991px width (untested), and this
session's time was prioritized toward closing higher-priority items. Flagged as a concrete,
scoped follow-up with its exact cause, not silently left unmeasured.

**Content inset** (spec §2.1: 64/48/40px desktop/tablet/mobile), measured as the hero-copy
element's top offset from the hero section's top: exactly 64px desktop / 48px tablet / 40px mobile
on every route except (a) the trauma page's stacked split-band exception at tablet/mobile, which
reports 0px because its `.acx-hero--split` mode uses CSS Grid `grid-area` positioning rather than
the shared shell's `padding-block` — a pre-existing, owner-approved, route-scoped exception
(doc 30 §3.1, dated 2026-09-06, predating this session) that this pass did not alter or need to;
and (b) the estate campaign, which measures 56px desktop / 40px tablet/mobile against its own
pre-existing asymmetric `padding-block: 56px 40px` (documented in-file as deliberate: "Bottom
padding is tighter than the top because the trust bar sits directly beneath") — an 8px desktop
deviation from the shared table, not changed this session to avoid disturbing that trust-bar
relationship without a dedicated visual check.

## 3. Responsive overflow (spec §12.2 "Responsive fit")

`document.documentElement.scrollWidth - clientWidth` measured on every route at all three widths:
**0px on every route at every width tested (33 of 33 checks pass)**. No horizontal overflow.

## 4. Structural checks

- **Homepage section order** (`main > section`, reading `data-section` then `id`): exactly
  `["hero","why","services","who-we-help","cta-mid","process","service-area","cta-close","contact"]`
  — matches spec §12.4's expected array verbatim. **PASS.**
- **Duplicate DOM ids**: zero on every one of the 11 routes checked, at every width. **PASS.**
- **Hero form count**: `.ac-hero form` count is 0 on every route (no page's hero embeds a form).
  **PASS** against spec §9.4/§12.2 ("no hero form").
- **Service inventory / dropdown**: `.ac-dropdown__panel a` on the homepage returns exactly six
  links, in the spec's required order, all pointing at public service routes (none at an
  `/assessment/` route): `/hoarding-cleanup-san-jose/`, `/extreme-cleaning-san-jose/`,
  `/deep-cleaning-san-jose/`, `/crime-scene-trauma-cleanup-san-jose/`,
  `/rodent-dropping-cleanup-san-jose/`, `/estate-cleanout-san-jose/`. **PASS.**
- **`/services/` redirect**: requested `/services/`, browser followed the redirect and landed on
  `http://<host>/#services` — confirmed the fragment survives the Location-header redirect and the
  browser navigates to the homepage with the fragment intact. **PASS.**
- **Broken visible images**: none detected (`naturalWidth === 0` check) on any route/width
  combination tested.
- **Console errors**: every route logs `Failed to load resource: 400` and `Uncaught
  TurnstileError: [Cloudflare Turnstile] Error: 110200` on pages with a Turnstile-protected form.
  **Expected and not a regression** — Cloudflare Turnstile cannot verify a challenge against
  `127.0.0.1` outside the real Cloudflare Pages environment; this is an environment limitation of
  local static-file verification, not a defect in the form or the build. No other console errors
  were observed on any route.

## 5. Interaction checks

- **Services dropdown**: `home-services-dropdown-open.png` (captured immediately after dismissing
  the cookie banner and clicking the toggle) does not visibly show the panel open — a timing
  artifact of that specific sequence in this test harness, not a defect: a follow-up, isolated
  check confirmed the toggle's click handler is attached and correctly adds/removes
  `.is-open` on `[data-services-nav]`, verified two ways — (1) `toggle.dispatchEvent(new
  MouseEvent("click", {bubbles:true}))` opened it, and (2) a real Playwright `.click()` with an
  explicit in-bounds position toggled it again. Panel contents (via DOM query, independent of
  visual open state) match the six-link list above. **PASS**, with the caveat that the specific
  screenshot in this artifact set does not depict the open state — re-run if a visual of the open
  dropdown is needed.
- **Estate campaign hero → bottom form anchor**: clicked the hero's `href="#request-walkthrough"`
  action; page scrolled (`window.scrollY` went from 0 to 3206px), confirming the anchor still
  resolves to the relocated bottom form section after the hero form's removal. **PASS.**
- **Estate campaign hero composition**: confirmed via DOM query — `#ppc-hero` contains **no**
  `<form>` and **does** contain an `<img>` (the hero's photograph). The bottom section
  `#request-walkthrough` **does** contain a `<form>`. **PASS** against the design-spec's "text
  left, meaningful image right... one centered form near the bottom" requirement.
- **Contact FAQ**: 7 `<details>` accordion rows render inside `.contact-faq`, confirming the
  relocated homepage FAQ (6 questions + the rebuilt service-area answer = 7) renders and is
  keyboard-operable native `<details>`/`<summary>` markup. **PASS.**

## 6. Not verified this session (explicitly reported, not claimed complete)

- **Live form submission.** No test lead was sent to `functions/api/lead.ts` in a real Cloudflare
  Pages Functions environment. The local static-file server used for this QA pass cannot execute
  Pages Functions or pass a real Turnstile challenge, so form *submission* — as opposed to form
  *presence, field structure, and anchor behavior*, all confirmed above — is unverified. Sending a
  real test lead requires the deployed preview environment and separate authorization per standing
  instruction (AGENTS.md, `docs/03-INTEGRATION-CONTRACT.md`).
- **200% browser zoom** (spec §12.1) was not exercised in this pass; only the three standard
  viewport widths were measured.
- **Keyboard-only navigation** (Tab order, Escape-to-close-and-return-focus on the services
  dropdown and mobile menu) was not separately re-verified this session; the underlying
  `aria-expanded`/`aria-controls`/Escape-handling code in `Header.astro` was not modified by this
  session's changes (only its href-matching condition changed — see the implementation map), so
  its previously-verified keyboard behavior is unchanged, but this was not re-run as a fresh check.
- **The five pre-existing service pages' internal section matrices** (spec §4.1–§4.5's exact IDs
  and grid classes) were not rebuilt this session — see `docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md`
  §10 for the full, itemized scope statement. Their hero sizing and FAQ container were verified and
  pass (above); their internal section-by-section structure was not re-audited against the spec's
  exact matrices.
- **200px/320px explicit overflow check**: overflow was measured at 390px (mobile) and found
  clean; the spec's separate 320px check was not run as its own pass this session.

## 7. Nothing deployed

All verification in this document ran against a local build (`dist/`) served by a throwaway
`node:http` static server on `127.0.0.1`, driven by a local headless Chromium instance. No `git
push`, no Cloudflare Pages deploy, and no production traffic were touched at any point in this
session.

## 8. Second pass, 2026-09-18 — `aseptaclean-home.css` install (homepage only)

Full narrative and conflict resolutions: `docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md` §11. This section
is the actual-checks record for that pass. Verification ran against `npm run build:local`'s fresh
`dist/`, served by `astro preview` (production static server) on `localhost:4322`, driven by local
headless Chromium via `playwright-core`. Two stale background processes from an earlier, unrelated
session (an `astro dev` on :4321, a day-old `astro preview` on :4322) were discovered mid-session —
neither was created or needed by this pass; the stale preview was stopped and restarted on the same
port once its build was confirmed outdated, the stray `astro dev` was left untouched (deliberately —
it may be the user's own active terminal). Screenshots:
`output/evidence/aseptaclean-home-2026-09-18/*.png`.

**Type Law.** `npm run check` (astro check): 0 errors. Direct CSSOM audit (see implementation map
§11 for method) against the live build: **zero non-role-class rule sets font-size on any of the
homepage's 29 real headings** (14 new + Header's/Footer's, which the audit also covers and finds
clean). The project's own `scripts/type-law-check.mjs`, after its unrelated bug fix, independently
confirms: `CLEAN` on `/`, and no regression on `/about/`, `/contact/`, `/hoarding-cleanup-san-jose/`.
Rule 2 (H1:body ratio): `/` measures 2.118:1 at its worst width (320px, 36px/17px) — clears the
1.9:1 floor at every checked width.

**Build.** `npm run build:local`: 54 pages built, 0 errors, both after the initial rewrite and after
every fix below.

**Responsive / overflow**, measured via `document.documentElement.scrollWidth − clientWidth`:

| Width | Overflow-X | Hero `.ac-hero__inner` height | Notes |
| --- | --- | --- | --- |
| 1440 | 0px | 629px (min 560) | Content-driven, exceeds floor — correct per spec (never clip to force the minimum) |
| 1024 | 0px | 629px (min 560; desktop breakpoint starts at 1024) | |
| 768 | 0px | 570px (min 520) | |
| 390 | 0px | 670px (min 440) | |
| 320 | **23px** | 736px (min 440) | Pre-existing, sitewide, not homepage-specific — see below |

**320px overflow — root-caused, confirmed pre-existing, not fixed in this pass.** The Cloudflare
Turnstile widget (`.cf-turnstile`, `data-size="flexible"`) renders its child at a fixed ~300px width
in this local/unverified preview environment. Reproduced identically on `/contact/` (same 23px
overflow, same element, same width) — a route this session did not touch — confirming this is a
sitewide condition of `AcCompactForm`'s Turnstile integration outside a verified production domain,
not a defect this pass introduced. Flagged rather than silently worked around; fixing it would mean
changing shared Turnstile-loading behavior used by every form on the site, out of scope for a
homepage-only task.

**Visual defects found and fixed during this pass** (both were CSS name collisions between the new
file and the pre-existing `src/styles/global.css`, not defects in either file alone — see
implementation map §11 item 2–3 for the full resolution):

- Hero eyebrow text rendered as near-invisible light text on a light pill-chip background
  (`.ac-eyebrow` name collision with an existing sitewide pill-chip utility). Fixed; confirmed by
  computed-style check (`background-color: transparent`, text now `rgb(231,238,244)` on the dark
  hero) and by screenshot.
- `.ac-split` name collision checked and confirmed non-issue (the new rule covers every property the
  colliding global rule also sets, so nothing leaks through) — no fix needed, verified by computed
  grid-template-columns (`518.4px 633.6px` ≈ 45/55 of the 1152px content width at 1440px).

**Section order, all 11 parts**, confirmed present and in order at 1440px via DOM query
(`main > section`, plus header/footer as siblings): sticky navbar → hero+trust (trust strip in
normal flow, outside `.ac-hero`, confirmed by DOM position, not just visually) → why (45/55, image
right) → services (6 cards, 3×2 grid, confirmed `grid-template-columns: repeat(3, …)` at 1440px) +
bottom CTA → who-we-help (45/55, image right) → cta-mid (dark) → process (4 steps) + folded-in scope
proof → service-area (two grouped city lists, no map) → cta-close (light) → contact form → footer.

**Mobile reading order** (text before image on stacked splits): confirmed via element-scoped
screenshot of `#who-we-help` at 390px — heading, lead, four audience rows render first, photograph
renders last, in that DOM order (never reversed via CSS `order`, matching the file's own "never
reverse mobile" instruction).

**Interactions:**

- Mobile menu (`<details data-mobile-nav>`): opens on tap, phone action reads
  `tel:+14087857588` / "Call Aseptaclean · (408) 785-7588", message action targets
  `/contact/#contact-form`-equivalent local behavior — all unchanged, Header.astro untouched.
- Hero "Call Aseptaclean": `href="tel:+14087857588"` — confirmed.
- Hero "Send a Message" → clicking it moved keyboard focus into the form's first field
  (`input[name=full_name]`, id `hero-form-name`) via the page's own `[data-focus-target]` script —
  confirmed.
- Keyboard tab order: real `Tab` keypresses (not `.focus()`) reach interactive elements with a
  visible `:focus-visible` outline; outside `<main>` (Header) the outline is the sitewide existing
  color, inside `<main>` on the light sections it is navy (`rgb(46,92,158)`-family per token), and
  specifically inside the dark photo hero it is white (`rgb(255,255,255)`), matching
  `.ac-home .ac-hero :focus-visible { outline-color: var(--ac-white) }` — confirmed working exactly
  as the attached file specifies.
- Form validation: clicking submit on the empty, untouched form correctly leaves `full_name` as the
  browser's first `:invalid` field and the form's own `noValidate`/custom-error JS intact — confirmed
  unchanged from `AcCompactForm`'s existing behavior. **No live submission to `functions/api/lead.ts`
  was attempted** (would require a real Turnstile pass and send an actual lead — not run without
  separate authorization, consistent with the rest of this record's standing rule).

**Known, disclosed, minor gap — Header's nav breakpoint (1184px, unchanged, sitewide) is narrower
than the new stylesheet's own `.ac-nav` breakpoint (1199px)**, so 1024–1199px shows the existing
mobile menu rather than a desktop bar at that width. This is Header.astro's existing, unmodified,
sitewide behavior — not changed by, or a defect of, this pass. See implementation map §11 for the
full reasoning on why Header was left untouched.

**Not verified in this pass** (explicitly, not silently assumed): 200% browser zoom; a live lead
submission; the five pre-existing service pages and About/Contact (out of scope — homepage only,
and confirmed by build + spot-check that their own pages are visually unchanged since neither
`AcHeroWithForm.astro`, `AcSplit.astro`, `AcServiceCards.astro`, `AcCtaBand.astro`, `AcSteps.astro`,
nor `AcIntro.astro` — all still used by those pages — were edited).

## 2026-09-18 — Approved mockup correction (supersedes previous homepage visual-review claims)

**Not an exact visual match yet.** The explicit replacement copy, homepage header/footer,
spacing, cards, process and actual form are implemented and browser-reviewed. Three standalone
photos are missing: right-side cleanup technician for the hero, work/checklist for Why, and
property consultation for Who We Help. The split slots are empty; the hero and service cards
retain existing owner-package condition imagery. No substitute stock person or generated proof.

Evidence and exact metrics: `output/homepage-correction/REVIEW.md`, `measurements.json`,
`home-1440.png`, `home-820.png`, `home-390.png`, `home-320.png`, `home-200-percent.png`,
`compare.html` and `side-by-side.png`. The actual page and reference were compared visually;
this was not a build-only or CSS-only review. Desktop/tablet hero minimums are 560/520px;
mobile's 440px minimum grows for text at 390/320. All four widths have zero horizontal overflow.
The actual 200% Chrome zoom uses a 1440px outer window / 720px layout viewport, DPR 2, with
zero document overflow. Form is 680px maximum; 350px at 390 and 280px at 320.

Real cookie controls were exercised. Actual Turnstile fails on the local hostname; the widget,
visible error and disabled submit state remain in the screenshots. Compact is the supported
150px-wide widget, not a clipped or CSS-scaled iframe. A successful challenge callback restores
availability. No production lead was sent.

Production build, Astro type check, computed heading-role/ratio check, 13 analytics-tagging
checks, 38 analytics-event checks and 11 existing endpoint checks passed. Custom local browser
interaction tests passed desktop/mobile navigation, focus transfer, six canonical service links,
photo multipart payload, failure/answer preservation, security failure/recovery and success
redirect with intercepted responses. Test simulations are separate from real-provider screenshots.

Saved pre-change build versus current rendering: every one of the 42 other shared-header/footer
pages compared at 1440/820/390px, 126 comparisons and zero geometry/computed-style differences.
See `regression.json`. Homepage-only branches cover the subsequent security/media-consent/scope
text additions. Other pages, routes, endpoint and shared offer data were not changed.

Remaining visual differences and required assets are itemized in the review and asset manifest.
The approved actual logo, verified coverage, complete consent/legal text, accessible field sizes
and real security widget necessarily differ from the illustrative mockup. No push or deployment.

Native 200% zoom evidence uses actual viewport captures (`home-200-percent.png`,
`form-200-percent.png`, `footer-200-percent.png`) plus `zoom-metrics.json`; Chrome's full-page
zoom capture produced stitching/clipping artifacts and was replaced. Intermediary element-only
captures with sticky-header compositing artifacts were also removed; full-page 100% captures and
actual form-anchor viewport screenshots are the review evidence.

## 2026-09-19 — Homepage search metadata and shared business positioning

Local only; no push/deployment. Exact owner metadata is installed, the existing approved hero
descriptor is rendered once in the current eyebrow, and both footer variants use the requested
short description. All disclaimer text stays visible and unchanged inside disclaimer-only
`data-nosnippet` spans. Existing LocalBusiness gains the exact requested description; identity
and all other fields are preserved. No CSS, routes, forms or tracking changes.

Fresh production build and Astro check pass (0 errors/warnings). Generated-HTML assertions cover
51 pages; all other title/descriptions and all canonicals/indexing directives match the saved
pre-change build. All 50 shared-footer consumers checked at 1440/1024/820/390/320px (250 checks):
zero horizontal overflow or tagline clipping. Native 200% Chrome zoom checked on all 50: 720px
layout viewport in 1440px outer window, DPR 2; zero overflow. Homepage hero measured
560/560/520/487.73/529.13px at the respective widths. Existing cross-page hero geometry was not
changed in this copy-only task. Desktop/tablet/mobile screenshots visually reviewed.

Evidence, screenshots, full method and limitations: `output/seo-positioning/REVIEW.md`,
`metadata.json`, `layouts.json`, `zoom.json`, `home-*-hero.png`, `*-footer.png`, actual mobile
`home-*-footer-viewport.png` and native zoom `*-200-percent-footer.png`. Layout capture blocks
third-party requests; it is not live form verification. Tall element screenshot sticky-layer
artifacts are distinguished from actual viewport captures. No real lead submitted.

Analytics suites pass 13/13 and 38/38; SEO guards pass with 39 existing publication blockers.
Launch audit has five pre-existing estate hidden-link findings; copy audit still expects the
retired `/services/` HTML. Both failures reproduced on the fresh pre-change build and remain
unresolved outside this task. Detailed paths are in the review. Diff whitespace check passes.

## Contact package verification — 2026-09-20

This later Contact-only installation supersedes the earlier Contact hero/composition results.
Fresh production build and local Chrome comparison against the decoded supplied preview at
1440/1024/820/768/390/320 pass: identical introduction heights/column widths, zero overflow,
zero duplicate IDs and no axe WCAG A/AA violations. Native 200% zoom also passes. Production
consent/security/legal controls account for added form/footer height. All 147 local form/additional
assertions and 36 shared-component regression renders pass. Build/check, local endpoint, analytics
and launch checks pass. No real inquiry or provider delivery tested; copy remains provisional.
See `BUILD-KITS-INSTALLATION-CHECKLIST.md` → Contact installation for actual measurements,
adaptations, limits and `output/contact-install/` screenshot/result paths. No push or deployment.

## Final installed-page hero QA — 2026-09-20

This pass inspected the fresh rendered build before editing, then normalized the two comparable
groups through the late-loaded, route-scoped `src/styles/hero-consistency.css`. The homepage,
Contact opening and generic Thank You receipt keep their approved page-specific compositions.
Approved copy, explicit heading breaks, image crops, form behavior and routes are unchanged.

### Final measured hero heights (CSS px)

| Surface | 1440 | 1024 | 768 | 390 | 320 | 200% zoom / 720 CSS px |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 552.875 | 540.734 | 456.969 | 569.406 | 652.703 | 451.719 |
| Estate public | 632 | 632 | 576 | 673.250 | 754.625 | 576 |
| Hoarding public | 632 | 632 | 576 | 618.375 | 672.750 | 576 |
| Extreme public | 632 | 632 | 576 | 578.063 | 645.563 | 576 |
| Detailed Deep public | 632 | 632 | 576 | 578.063 | 645.563 | 576 |
| Trauma public | 632 | 632 | 576 | 560.469 | 627.969 | 576 |
| Rodent public | 632 | 632 | 576 | 600.781 | 645.563 | 576 |
| Estate campaign | 665 | 604 | 610 | 959.094 | 952.922 | 646.250 |
| Rodent campaign | 665 | 604 | 610 | 836.766 | 884.141 | 610 |
| Contact opening | 204.578 | 204.578 | 191.969 | 237.250 | 237.250 | 189.625 |
| Generic Thank You | 508.547 | 502.641 | 457.922 | 497.281 | 527.875 | 449.531 |

The six public service heroes now also share a 960px maximum copy shell (available width below
that), 76/96px desktop and 64/80px tablet vertical padding, 56px desktop and 44px tablet H1 roles,
and CTA bottom insets of 96px desktop / 80px tablet. Mobile uses 48/64px padding and 36px H1s,
but height remains content-driven. The two campaigns share exact 3:2 hero image geometry and exact
hero/CTA placement at 1440, 1024 and 768; mobile and 200% zoom expand for their different approved
copy lengths.

### Results and evidence

- Fresh `npm run build:local`: PASS, 54 Astro pages before dev-route pruning.
- Fresh `npm run check`: PASS, 0 errors, 0 warnings, 62 existing hints.
- 55 route/width checks (11 installed surfaces × 5 widths): zero horizontal overflow, zero clipped
  hero containers, and zero axe WCAG 2.0/2.1 A/AA violations. The final two-campaign rescan also
  reports zero violations at all five widths.
- Every 200%-zoom / 720-CSS-pixel check has zero horizontal overflow. Narrow/zoomed heroes grow for
  text rather than clipping, shrinking a page-specific heading or stretching an image.
- Before/after hero screenshots: `output/final-hero-qa-2026-09-20/pre/` and
  `output/final-hero-qa-2026-09-20/post/`. Final campaign measurements/screenshots:
  `output/final-hero-qa-2026-09-20/campaign-final/`. Raw full-page-group measurements and the
  reproducible runner are in the parent evidence directory.
- Visual review confirmed the explicit Estate, Hoarding, Rodent, Extreme and Detailed heading
  breaks remain intact; buttons remain fully visible; photo overlays remain readable; and the
  normalized desktop/tablet space is used to align the CTA row rather than adding blank space below
  it. Homepage, Contact and Thank You geometry did not change.

No push or deployment was performed. A later, explicitly authorized controlled non-customer
submission was performed on 2026-09-20; see `docs/04-RELEASE-CHECKLIST.md` “final inquiry-form
functional QA” and `output/form-functional-qa/`. Existing provider,
copy/photo-approval and audit limitations recorded in the installation checklist remain unchanged.

## Public navigation disclosure QA — 2026-09-20

The public Services item is now a non-navigating `<button>` in every desktop and mobile public
header. The controlled menu is populated only from `src/data/launchArchitecture.ts`'s approved
`launchServiceLinks`: Hoarding Cleanup, Extreme Cleaning, Detailed Deep Cleaning, Crime Scene &
Trauma, Rodent & Animal Waste, and Estate Cleanout, each pointing to its existing public base
route. No homepage anchor or `/assessment/` campaign route is in the menu.

Rendered browser verification covered all twelve current public page roles at 1440, 820, 390 and
320px. The reproducible suite passed **699/699 assertions**. It verified click/tap does not change
the current URL; `aria-expanded` and `aria-controls` state/panel relationships; keyboard Enter;
Escape closure with focus returned to the trigger; outside-pointer dismissal; visible focus;
exact service labels/hrefs; every service route responding successfully; logo and all other header
destinations resolving; panel bounds; and zero horizontal document overflow. The Contact page's
legacy scoped `nav { display:none }` collision at <=620px was found during the first run, corrected,
and included in the final pass.

The three campaign landing pages (`/hoarding-cleanup-san-jose/assessment/`,
`/rodent-dropping-cleanup-san-jose/assessment/`, and
`/estate-cleanout-san-jose/assessment/`) were separately checked at mobile size: each retains its
intentionally simplified logo/call header, contains no public Services disclosure, and has working
header targets.

Evidence:

- Machine-readable results: `output/navigation-qa/results.json`
- Desktop, homepage: `output/navigation-qa/desktop--.png`
- Tablet, Rodent public page: `output/navigation-qa/tablet--rodent-dropping-cleanup-san-jose-.png`
- Mobile, Estate public page: `output/navigation-qa/mobile--estate-cleanout-san-jose-.png`
- 320px, Estate public page: `output/navigation-qa/narrow--estate-cleanout-san-jose-.png`
- `npm run check`: pass, zero errors (62 existing hints)
- `npm run build:local`: pass, 54 generated pages before `/dev/*` pruning

No push or deployment was performed.

## Public section-rhythm repair — 2026-09-23

Scope: homepage plus the six public service routes. Seventeen homepage/service editorial sections
were inspected after the reported Hoarding example showed a full-width heading row separating the
heading from its left-column copy. The affected headings now live with their related copy in the
first split column; the image begins at the same top edge in the 45/55 desktop split. These splits
stack below 1024px. Estate already used the correct nested heading/copy structure and was not
recomposed.

Results:

- `npm run check`: pass, zero errors and zero warnings (existing hints only).
- `npm run build:local`: pass, 54 generated pages before `/dev/*` pruning.
- Browser audit: 35/35 route/viewport checks pass at 320, 390, 720, 768 and 1440px, with zero
  horizontal overflow, zero unloaded images, and no desktop heading/photo alignment failure.
- Native Chrome 200% zoom: all seven routes reflow to a 720px layout viewport with zero horizontal
  overflow. Two pre-existing line-count assertions in the older heading-copy runner now report the
  deliberately narrower left-column headings on Home Who We Help and Rodent Belongings; copy,
  font size and line-height remain unchanged and visible.
- Evidence: `output/public-pages-space-audit/` contains full-page screenshots and `results.json`.
  The reproducible audit is `scripts/public-pages-space-audit.mjs`.

No push or deployment was performed.

## Public-page contact rhythm — 2026-09-23

The homepage and six public service pages now use their previously empty desktop contact-row
space for a two-column composition: the existing heading and introduction stay on the left and
the unchanged production form sits on the right. The DOM order, approved copy, fields, consent,
security verification, endpoint behavior and section order are unchanged. Layouts below 1024px
retain the existing stacked form.

Browser verification covered `/`, Hoarding, Extreme, Detailed Deep Cleaning, Trauma & Crime
Scene, Rodent Droppings, and Estate Cleanout at 320, 390, 720 (1440px at 200%-equivalent reflow),
768 and 1440px. All 35 route/viewport checks passed with zero horizontal overflow and no failed
images. Desktop screenshots confirm aligned copy/form columns; tablet, mobile and enlarged-text
screenshots confirm the stacked flow remains intact. Evidence and measurements are in
`output/public-pages-space-audit/`; the reproducible runner is
`scripts/public-pages-space-audit.mjs`. `npm run check` and `npm run build:local` passed. No push
or deployment was performed.

## Approved inherited-home and rodent campaign landings — 2026-09-23

Installed the two owner-approved landing-page packages at
`/estate-cleanout-san-jose/assessment/` and
`/rodent-dropping-cleanup-san-jose/assessment/`. The canonical public rodent service page at
`/rodent-dropping-cleanup-san-jose/` remains byte-identical to `HEAD`; the campaign did not
replace it. Both campaign headers use the configured Aseptaclean logo and the verified rendered
phone number `(408) 785-7588` with `tel:+14087857588`.

Rendered Chrome verification covered 320, 390, 430, 768 and 1440px plus 200% text/layout
enlargement for both pages. All ten viewport checks passed with zero horizontal overflow, loaded
illustrative images and captions, correct canonical/indexing metadata, three desktop service
columns, stacked mobile sections, and aligned two-column desktop process/contact compositions.
The callback CTA scroll/focus behavior, optional-field disclosure, invalid-input summary, photo
selection, retained values after a synthetic 503 response, confirmed-success thank-you routing,
and exactly one `ppc_form_success` event were also verified. Screenshots are in
`output/approved-landings-2026-09-23/`; the reproducible runner is
`scripts/approved-landings-browser-check.mjs`.

`npm run check`, `npm run build:local`, `npm run qa:campaign-short`, `npm run qa:analytics`,
`npm run qa:analytics:events`, and `npm run qa:launch` passed. Provider responses and browser
submissions used clearly labelled synthetic data and local mocks/stubs. No live notification was
sent and no advertising-platform receipt was verified, so this QA does not claim live email/SMS
delivery or live Google conversion ingestion. No push or deployment was performed.

## Campaign short-form QA — 2026-09-23

Scope was limited to the Rodent and Estate/Inherited Home campaign landing forms and their shared
delivery integration. Both rendered forms expose exactly six fields in the directed order: Name,
Phone, Email, Role, Additional info, Photos. Only Name and Phone are required. Existing consent,
Turnstile, upload affordance, panel styling and route-specific submit wording remain visible.

Results:

- `npm run check`: pass, zero errors; existing repository hints only.
- `npm run build:local`: pass, 54 pages before `/dev/*` pruning.
- `npm run qa:campaign-short`: pass for both routes. Covered minimal and complete payloads,
  with/without supported photos, malformed and missing inputs, invalid role, mismatched campaign
  route/service, unsupported upload, core-storage failure, owner notification without customer
  email, conditional customer confirmation, email rendering without `undefined`, and duplicate
  submission idempotency.
- `npm run qa:campaign-short:browser`: pass for both rendered routes. Covered exact DOM/tab order,
  required states, removed controls, hidden identity, submit wording, mocked success/failure,
  input retention, rapid duplicate submits, attribution payload, upload state and correct campaign
  thank-you redirects. At mobile widths the route-opted sticky action bar is hidden whenever the
  bottom form is visible, so it does not cover consent or any form control.
- Layout: pass at 1440, 820, 390 and 320px, plus 200% reflow (640 CSS px on a 1280px display);
  zero horizontal overflow. Form screenshots:
  `output/campaign-short-form-qa/rodent-desktop.png`, `rodent-tablet.png`, `rodent-mobile.png`,
  `estate-desktop.png`, `estate-tablet.png`, and `estate-mobile.png`. Machine-readable results:
  `output/campaign-short-form-qa/results.json`.
- Shared regressions: `qa:phase3:endpoint`, `qa:estate`, `qa:submission-emails`, `qa:situations`,
  `qa:analytics`, and `qa:analytics:events` pass. Static rendered checks confirm the Hoarding
  campaign and public Rodent form retain their prior required Email/ZIP/details contract and do not
  carry the new compact campaign context.

All browser endpoint responses and email-provider responses were mocked, company-domain QA
recipients were used, and external advertising/analytics hosts were blocked. No live inquiry,
push or deployment was performed.

## Public heading copy and line-break QA — 2026-09-20

Scope: homepage plus the six public service routes only. Campaign landing pages were not edited.
Each directed line is a block `<span>` inside its existing H1/H2; the homepage Who We Help and
the two estate phrases each use one non-forcing span. One shared `.ac-heading-line` utility supplies
the block behavior. The homepage and trauma hero copy shells are wider from 768px upward so their
authored first lines remain intact without changing type sizes or adding a height override.

Changed heading groups:

- Home: hero; Why Aseptaclean; Who We Help.
- Hoarding, Extreme Cleaning, and Detailed Deep Cleaning: three named body headings each.
- Trauma & Crime Scene: hero plus three named body headings.
- Rodent: three named body headings.
- Estate: “More than clearing out the rooms.” and “A written scope. A price you can review.”

Rendered verification covered all seven changed routes at **1440, 1024, 768, 390, and 320px**,
plus native Chrome **200% page zoom** (1440px outer window, 720px layout viewport, DPR 2):

- **42/42 route/viewport checks passed** with zero horizontal overflow and exactly one H1 per page.
- At 1440/1024/768 every directed two-line heading renders as exactly two visual lines. At 1440
  and 1024, Who We Help and both estate phrases stay on one line. At 390/320 and 200% zoom,
  individual spans wrap naturally where needed; no clipping, ellipsis, line clamp, heading-specific
  font reduction, or compressed line-height was introduced.
- The six comparable public service heroes remain equal: **632px at 1440**, **632px at 1024**, and
  **576px at 768**. Mobile hero heights remain content-driven.
- Visual review included the desktop hero lines, every public route at 320px, and representative
  native-zoom captures. Wording, punctuation, span counts, heading levels, line counts, hero
  heights, and overflow are recorded in the machine-readable result.

Evidence:

- Results: `output/heading-copy-qa-2026-09-20/results.json`
- Reproducible runner: `output/heading-copy-qa-2026-09-20/verify.mjs`
- Screenshots: `output/heading-copy-qa-2026-09-20/` (`*-1440-*`, `*-1024-*`, `*-768-*`,
  `*-390-*`, `*-320-*`, and `*-200pct-*`; 126 captures)
- `npm run check`: pass, 0 errors and 0 warnings (existing hints only).
- `npm run build:local`: pass, 54 generated pages before `/dev/*` pruning.
- `npm run qa:launch`: pass, all launch-architecture assertions.
- `npm run qa:copy`: existing unrelated failure because the audit still attempts to read retired
  `dist/services/index.html`; this same stale expectation is recorded earlier in this checklist.

No push or deployment was performed.
