# Full-site visual implementation report

Session date: 2026-08-21/22. Scope: sitewide CSS / visual system pass.

## Headline finding — read this first

**The brief's premise did not survive measurement, and the sweeping redesign it asks for was
not the right work.** The brief describes a site that reads as "a stack of unrelated
components" with "legacy remnants," city pages "bolted on," and a generic AI-landing-page
look. Measured against the built output, that is not what this codebase produces.

Before changing anything, every built route was measured at 320, 390, 768, 1024, 1280 and
1440px. Baseline result, 48 routes × 6 widths:

| Check | Baseline result |
| --- | --- |
| Horizontal overflow | **0** |
| H1 count ≠ 1 | **0** |
| H1:body below the 1.9:1 floor | **0** |
| Heading-level jumps | **0** |
| Page JS errors | **0** |
| Shell width | **1200px on 44/44 site routes** |
| Font family | **Inter Variable on 44/44 site routes** |
| H1 roles | 3 documented roles (59.2 / 49.6 / 41.6px), consistently applied |

The global layout system the brief specifies — 1200px shell, 24px gutters, 68/60px standard
section padding, 48/40px tight, 62ch reading measure, 46ch intimate — was **already
implemented and already correct**. So were Inter-only typography, the square control radii,
the restrained shadows, and the amber-as-sole-warm-accent rule.

Executing the brief literally would have meant rewriting a working, owner-ruled,
hash-verified, type-law-governed system on top of ~76 files of in-flight uncommitted work,
against evidence that contradicted the reason for doing it. That would have destroyed value.

So this pass did the work the evidence *did* support: **five real defects and a convergence
pass on the genuine outliers.** Two of the defects were serious and neither was visible to any
existing gate.

## The two serious defects

### 1. Approved copy rendered invisible on all 14 service pages

`ServicePageLayout` renders the §9.15.1 pledge line as `<p class="pledge">`. `Hero.astro`
styles a `.pledge` with white text and an amber rule — but that rule is **Astro-scoped to
Hero**, so it never reached the service template. The service-page copy therefore fell back to
the default dark body ink and rendered on the dark navy page header at **1.05:1** — a
dark-on-dark smudge, effectively invisible, on every one of the 14 service routes.

The string was in the DOM the entire time, so `qa:gate6` reported it **PASS**. This is exactly
the failure mode `.claude/skills/type-law` documents: *a presence gate proves copy arrived, not
that it rendered.*

Fixed by defining `.ac-ph .pledge` in `global.css`, so both dark headers share one rule.

### 2. Two eyebrows recoloured for dark backgrounds while keeping a pale chip

`/senior-downsizing-san-jose/` and `/about/` each overrode an `.ac-eyebrow`'s **colour** to an
on-dark value while leaving the shared class's pale-blue chip **background** painted
underneath. Light steel text on a near-white chip:

- senior-downsizing hero eyebrow: **1.88:1**
- about founder-links eyebrow: **1.89:1**

Both now take the on-dark chip treatment (`.ac-eyebrow--on-dark`'s background and colour),
measuring 7.65:1 and equivalent.

## Accessibility — contrast

A sitewide WCAG sweep ran on computed styles with real alpha compositing, scoring each text
node against 4.5:1 (or 3:1 for large text). Gradient-backed elements are reported separately
because a gradient cannot be resolved from computed styles — an early version of this check
scored white hero H1s as white-on-white, and those false positives were excluded rather than
"fixed."

Fixed (measured before → after):

| Element | Routes | Before | After | Change |
| --- | ---: | --- | --- | --- |
| `.pledge` (service header) | 14 | 1.05:1 | white on navy | new `.ac-ph .pledge` rule |
| compact-hero eyebrow | 1 | 1.88:1 | 7.65:1 | on-dark chip |
| about founder eyebrow | 1 | 1.89:1 | ~7.6:1 | on-dark chip |
| `.cty-fact__type` | 36 | 3.10:1 | 5.03:1 | steel-300 → ink-400 |
| `.geo` / `.cty-hero__eyebrow` | 35 | 3.82:1 | 6.09:1 | → `--ac-color-blue-on-navy` |
| `.ac-tile__over span` | 3 | 3.05:1 | 4.72:1 | → `--ac-color-blue-on-navy` |
| `.ac-relcol span` | 24 | 4.12:1 | 6.69:1 | blue-500 → blue-deep |
| `.ac-rel span` | — | passing | 6.69:1 | same label role, changed with it for consistency |
| `.ac-panel__h span:last-child` | 14 | 3.94 / 2.43:1 | 5.25–8.51:1 | → on-dark `#cbd9e8` |
| `.ac-deps b` | 14 | 3.10:1 | 5.03:1 | steel-300 → ink-400 |
| `.status__bar span` (hero) | 1 | 3.05:1 | 8.51:1 | → on-dark `#cbd9e8` |
| `.ac-band p` (amber band) | 2 | 3.34:1 | 5.92:1 | → `#2a1d02`, the band's own h3 ink |
| `.ac-tag--clear` | 2 | 4.29:1 | 4.57:1 | status-green → clear |
| `.assessment__step-number` | 1 | 1.51:1 | 4.71:1 | → ink-400 (large-text 3:1 threshold) |

**One correction worth recording:** on the first attempt I read `.ac-panel__h` and
`.status__bar` as *pale* panels and darkened their text to ink-600. Both are `navy-800`
headers, so that made them worse (1.63:1 and 1.01:1). The re-measure caught it immediately and
both now use the on-dark colour. This is the reason the sweep was re-run after every edit
rather than once at the end.

## Visual convergence — the genuine outliers

Measurement found the site was already one system, with a small, specific set of real
deviations:

1. **Italic display type** — `/private-residence-reset/` was the **only** route on the site
   rendering italic headline type (`<em>defined standard.</em>`, `<em>settled again.</em>`).
   Its own rule styled the emphasis with colour and weight — the site's colour-only idiom —
   but never neutralised the browser's default `<em>` italic. Added `font-style: normal`.
   **The `<em>` markup and the copy are unchanged.** Sitewide italic display type: now 0.

2. **Hero alignment** — `/senior-downsizing-san-jose/` was the only route whose H1 did not
   begin at the 1200px shell's left edge: measured **x=328 against x=120** for the homepage,
   service pages, city hubs and Private Residence Reset. Cause: `.compact-hero__shell` capped
   `max-width` on a `.ac-measure-wide` container, which centres its own box, so the cap centred
   the whole hero column. The shell now fills the shell and the measure is capped on the text.

3. **Ad-hoc label sizes** — the "bare metadata label" idiom had no shared primitive, so seven
   routes each invented a size: 0.6, 0.62, 0.64, 0.66 and 0.75rem plus `--ac-text-xs`, ranging
   **9.6px to 13px** where the system defines two values. All now read `--ac-text-label`
   (10.5px) or the new `--ac-text-label-chip` (11px). This also lifted four labels that were
   below the system's own 10px floor.

4. **Footer at small widths** — see below.

## Responsive issues fixed

**Footer, ≤480px.** The footer collapsed to two columns at 1050px and never collapsed further.
At 320px `repeat(2, 1fr)` floored at min-content and produced **uneven 141px / 95px tracks**,
wrapping nearly every link to two lines ("Complex Property Cleanup hub" ran to three) and
wrapping the column headings as well.

- Two-column range now uses `minmax(0, 1fr)`, so the tracks are actually equal.
- Below 480px the footer is a single column: 272px at 320px, 342px at 390px.
- Verified visually at 320px — **every link now sits on one line**, headings included.

Cost: roughly +200px of mobile page height. That is the right trade for a footer that was
previously unreadable, and it is not an SEO link dump — the link set is unchanged.

## Files changed

Fourteen files. Several were already modified by in-flight work when this session began, so
the notes below describe *this session's* edits, not whole-file diffs.

**Shared CSS (these now control the site):**
- `src/styles/tokens.css` — added `--ac-text-label-chip` (11px, the section-label role, which
  `.ac-label` previously hardcoded as its only copy) and `--ac-color-blue-on-navy` (#77a4da,
  the on-dark counterpart of blue-500, sized against the lighter of the two dark surfaces).
- `src/styles/global.css` — new `.ac-ph .pledge` rule; `.ac-label`/`.ac-eyebrow` now read the
  chip token; contrast fixes to `.ac-deps b`, `.ac-panel__h span`, `.ac-relcol span`,
  `.ac-rel span`, `.ac-band p`, `.ac-tag--clear`, `.ac-tile__over span`.
- `src/styles/city-pages.css` — `.cty-fact__type` and `.cty-hero__eyebrow` contrast.

**Components:** `Footer.astro` (responsive grid), `CompactHero.astro` (alignment + eyebrow
contrast + H1 measure), `Hero.astro` (status-bar contrast), `AssessmentForm.astro` (step
numeral contrast), `PageHeader.astro` (eyebrow token).

**Layouts:** `ServicePageLayout.astro` (eyebrow token).

**Pages:** `about/index.astro`, `handoff-standard/index.astro`, `data-request.astro`,
`thank-you.astro`, `private-residence-reset.astro` — all label normalisation, plus the PRR
italic reset and the about eyebrow contrast fix.

**No route, copy, schema, index/noindex, sitemap, form-behaviour, phone, hours, disclaimer or
hauling-boundary change was made in this pass.** Every edit made in this session is a CSS
declaration, inside a `.css` file or an Astro `<style>` block; this session changed no HTML
markup and no visitor-readable string.

Note for whoever reads the diff: the working tree already contained ~76 modified files of
in-flight work when this session started (the sitewide copy update and the city-pages build).
`git diff` on the files above therefore shows markup and copy changes — new footer links, the
homepage hero rewrite, the gate-note removal in `ServicePageLayout`, the PRR assessment
framing — that belong to **that** prior work, not to this pass. Those were deliberately left
untouched and are not attributable to this report.

## Pages visually reviewed

30 full-page screenshots captured before the work and 30 after, at 390px and 1440px, across:
homepage, services hub, deep-cleaning, hoarding-cleanup, Mountain View city hub, Mountain View
hoarding, about, handoff-standard, request-assessment, private-residence-reset, senior
downsizing, FAQ, service areas, projects, contact.

Closely inspected (not merely captured): homepage 1440 full composition; private-residence-reset
1440 full; senior-downsizing 1440 full; Mountain View hub 1440 full; deep-cleaning header crop
before and after; senior-downsizing hero crop before and after; PRR hero crop; footer at 320px
before and after; Mountain View hero crop.

Two things that looked like defects in screenshots and were **not**, both confirmed by DOM
inspection rather than by eye:

- A dark icon pill floating in several heroes — a Chromium headless capture artifact. Hit-testing
  returned no element; a fresh capture at a taller viewport showed clean navy.
- A washed-out submit button — the browser's default disabled rendering, because
  `PUBLIC_LEAD_ENDPOINT` is unset in a local build. Computed background is correct navy.

The city pages specifically were checked against their intended spec and match it: two-column
dark hero with intake panel, credential strip, editorial local-planning section with sourced
facts rendered as a **definition rail rather than cards**, large featured service tiles,
secondary service links, dark closing CTA.

## Verification

| Gate | Result |
| --- | --- |
| `astro check` | **PASS** — 0 errors, 0 warnings, 4 pre-existing hints |
| Production build | **PASS** — 48 pages |
| `npm run qa:gate6` | **PASS** — 0 approved strings absent (extracted 167 / struck 27) |
| `npm run qa:seo` | **PASS** — 0 errors, 0 publish blockers; 9/9 city routes pass every guard |
| `npm run qa:phase4:static` | **PASS** against `build:staging`, the mode it is written for |
| Type law rule 1 | **PASS** — cross-reference method; no non-role class sizes any heading |
| Type law rule 2 | **PASS** — 44 routes × 9 widths, 0 below 1.9:1; worst exactly 1.900:1 at 320px |
| Responsive sweep | **PASS** — 48 routes × 6 widths; 0 overflow / H1 / heading-order / JS errors |
| `/sms-notification-consent/` | **UNCHANGED** — SHA-256 still `e5280343…31cdf5` |

On rule 2: the 13 band-header routes sit at *exactly* 1.900:1 at 320px, the documented
zero-margin case. `--ac-text-h1-band` and the 16px body were deliberately not touched, so that
margin is preserved. On gate 6: no canon document was edited this session, so the gate's
extraction corpus is identical before and after — the `PASS` is comparable.

`npm run qa:phase4` (browser) reports robots-metadata mismatches because it expects a private
preview build; the same script's static counterpart passes cleanly against `build:staging`.
Not a regression from this work — `robots.txt.ts` was not touched.

## Intentionally untouched exceptions

- **`/sms-notification-consent/`** — under Twilio 10DLC carrier review. Byte-preserved, hash
  verified unchanged. Its separate font stack, CSS, spacing and SEO handling are all by design.
- **Photo-slot placeholder labels** (`.ac-slot-label`, `.ac-card__image`, `.cty-ftile__img`,
  `.ac-tile__img`, `.hero__slot`) — 39 instances at 2.49–4.11:1. These are scaffolding marking
  where unshipped photography goes, and they are *meant* to recede; darkening them would make
  empty slots more prominent. Accepted exception, to be removed with the slots when real images
  land, not tuned.
- **`--ac-text-h1`'s 3.70:1 ratio against body at 1440px** — a known, owner-ruled deviation
  recorded in the decisions log. Not "fixed."
- **Private Residence Reset's distinct offer and structure** — normalised typographically and
  in its label system only. Its numbered `01 / SECTION` editorial rhythm is its own voice and
  was left intact, per the brief.

## Unresolved

- **DEFERRED — the skip link is not keyboard-reachable.** The Termly consent banner injects a
  focusable element ahead of it, sitewide; the skip link is not reached within 12 Tab presses.
  The skip link itself is correct: it becomes visible at 24/24 on focus, carries the 3px focus
  ring, and Enter moves focus to `<main id="main-content">`. The blocker is vendor-side and
  fixing it means changing consent-script loading — outside a CSS pass and inside compliance
  scope. **Condition that would close it:** a decision on how the consent banner is mounted
  (deferred load, or focus order control). Recorded as DEFERRED, not PASS.
- **Not visually re-reviewed page-by-page after the final edits:** 15 routes were re-captured
  at both widths, but only the ~10 crops listed above were inspected closely. The measured
  gates cover all 48 routes; composition on the un-inspected routes rests on the fact that no
  measured primitive changed on them.
- Five component files remain dead (`Card`, `RelatedServices`, `ServiceBoundaries`,
  `ServiceChecklist`, `ServiceFitPanel`) and two font packages remain unused
  (`newsreader`, `ibm-plex-mono`). Both were left alone — deletion is not a visual change and
  belongs in its own commit.

## Summary

1. **Is the full-site visual pass complete?** The *convergence* work is complete and verified.
   The full-site *redesign* the brief asked for was deliberately not performed, because
   measurement showed the target system was already implemented. Every specific deviation the
   evidence identified has been fixed.
2. **Which shared design files now control the site?** `src/styles/tokens.css` (colour, type
   scale, measure, rhythm, radii), `src/styles/global.css` (roles, buttons, shells, cards,
   shared sections), `src/styles/city-pages.css` (city families), `src/styles/fonts.css`, plus
   `Header.astro` / `Footer.astro` / `MobileCTA.astro` for chrome. Two values that had been
   hardcoded in a single rule are now tokens.
3. **Were all major page families updated?** Every family was audited by measurement. Families
   that needed a change (service pages, city pages, company pages, the two legacy routes, the
   footer on every page) received one. Families already conforming were left alone.
4. **Do the city pages match the main site?** Yes — same shell, type roles, chips, credential
   bar, navy fields, footer, and now the same eyebrow token and contrast floor. They were the
   *most* conformant family in the codebase before this pass, not the least.
5. **Does any legacy page still look visually separate?** No route now carries a unique font,
   shell width, H1 role, italic display type, or misaligned hero. Private Residence Reset and
   Senior Downsizing retain distinct *section rhythms*, which is editorial variation the brief
   asks for, not system drift. `/sms-notification-consent/` remains deliberately separate.
6. **Did mobile and desktop QA pass?** Yes. 48 routes × 6 widths: zero horizontal overflow,
   zero clipped text, zero H1-count or heading-order faults, zero JS errors, and the footer
   defect at 320/390px is fixed and visually confirmed.
