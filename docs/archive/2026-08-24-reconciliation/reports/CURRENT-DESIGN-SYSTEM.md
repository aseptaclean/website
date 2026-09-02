# Current Design System

Audited 2026-08-21 from `src/styles/`, component-scoped styles, page-scoped styles, and computed rendering at 390px and 768px. This records what the code does now; it is not a recommendation.

## Design direction

The implemented direction is an industrial, contractor-professional system: deep navy fields; white and cool-gray document surfaces; small uppercase blue chips; square controls; compact hairline cards; angled/clipped placeholder geometry; ledger/status-document motifs; one amber deadline/call accent; and restrained elevation. The design intentionally looks operational rather than residential-lifestyle oriented.

Most visual rules are global and reusable. The largest page-specific visual systems are the full assessment form, Private Residence Reset, Handoff Standard, Thank You, and the older Senior Downsizing page.

## Design source map

| Design concern | Current source |
| --- | --- |
| Color, type, measure, rhythm, spacing, radii, shadows | `src/styles/tokens.css` |
| Global reset, type roles, buttons, shells, cards, shared sections, responsive rules | `src/styles/global.css` |
| Font loading | `src/styles/fonts.css`; preload in `src/layouts/BaseLayout.astro` |
| Header/mega nav/mobile drawer | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Mobile action bar | `src/components/MobileCTA.astro` |
| Homepage hero | `src/components/Hero.astro` |
| Inner headers | `src/components/PageHeader.astro`; hub/service header rules in `global.css` |
| Service-page composition | `src/layouts/ServicePageLayout.astro` plus shared `global.css` classes |
| Service hubs | `src/components/ServiceHub.astro` |
| Compact form | `src/components/QuickHandoffForm.astro` |
| Full form | `src/components/AssessmentForm.astro` |
| Standalone SMS page | `public/sms-notification-consent/sms-consent.css` |
| Major route-specific exceptions | scoped `<style>` blocks in the relevant `.astro` page |

## Color system

### Canonical custom properties

| Token | Value | Implemented role |
| --- | --- | --- |
| `--ac-color-navy-950` | `#0b1830` | darkest ribbon/navy field; footer-adjacent dark |
| `--ac-color-navy-900` | `#10233f` | principal dark field, text headings, page headers |
| `--ac-color-navy-800` | `#1c355e` | primary buttons, cards' CTA bars, nav emphasis |
| `--ac-color-navy-700` | `#27436f` | retained darker-blue variant |
| `--ac-color-blue-500` | `#4a7fc1` | cool blue icons, secondary accents, link markers |
| `--ac-color-blue-deep` | `#2e5c9e` | focus/accent text |
| `--ac-color-blue-pale` | `#e9f0f9` | chips, icon backgrounds, pale CTA surfaces |
| `--ac-color-blue-ghost` | `#f4f8fc` | very pale blue surface |
| `--ac-color-ink-900` | `#13202f` | primary body text |
| `--ac-color-ink-700` | `#13202f` | alias of ink-900 |
| `--ac-color-ink-600` | `#46566b` | secondary text |
| `--ac-color-ink-500` | `#46566b` | alias of ink-600 |
| `--ac-color-ink-400` | `#617087` | muted text corrected for AA contrast |
| `--ac-color-line` / `--ac-color-rule` | `#e3e9f0` | hairline borders and gray photo slots |
| `--ac-color-line-strong` | `#ccd6e2` | stronger control/button border |
| `--ac-color-paper` | `#ffffff` | base/card surface |
| `--ac-color-warm-white` / `--ac-color-bg-soft` | `#f5f8fb` | alternating background and light panels |
| `--ac-color-gold` | `#c9a961` | retained legacy gold; not the primary warm accent |
| `--ac-color-amber` | `#c8912e` | deadline band and mobile Call action only |
| `--ac-color-amber-pale` | `#fbf0da` | review/status fill |
| `--ac-color-amber-ink` | `#8a6210` | review/status text |
| `--ac-color-status-green` | `#2f7d5b` | positive status/check marks |
| `--ac-color-status-green-pale` | `#e3f1ea` | positive status fill |
| `--ac-color-exclusion-red` | `#8c3b32` | stop/refer/exclusion panel header |
| `--ac-color-clear` / `--ac-color-success` | `#1e7a4f` | legacy success green |
| `--ac-color-review` | `#9a6414` | legacy review text |
| `--ac-color-review-pale` | `#fbf3e4` | legacy review fill |
| `--ac-color-steel-300` | `#8494a8` | numerals and metadata |
| `--ac-color-steel-200` | `color-mix(...55%, white)` | lighter steel |
| `--ac-color-steel-100` | `#f5f8fb` | alias-like light surface |
| `--ac-color-steel-on-navy` | `#9fb2ca` | muted dark-field text |
| `--ac-color-focus` | `#2e5c9e` | focus outline |
| `--ac-color-error` | `#a3392f` | validation errors |

### Hardcoded color variations

The system is not token-pure. Meaningful hardcoded values include:

- Footer `#0a1725`; hero/page-header backing `#1b3350`; mockup field gradient `#1c355e → #122840 → #0d1e30`.
- White `#fff` is used directly throughout.
- Footer/legal muted steel `#7f96b4`, ribbon/footer copy `#8fa6bf`, hero/field ledes `#b9c6d6`, `#a9bdd3`, and `#93a9c2`.
- Hover navy `#16294a`, deadline text `#2a1d02` and `#5c4308`, pale error surfaces `#fdf7f6`, `#ebd9d6`, `#eedfdc`, and icon red `#b5544a`.
- Numerous alpha-white/alpha-navy gradients and shadows are component-local.

These values are deliberate ports in many comments, but their mix with tokens means `tokens.css` alone is not a complete color source of truth.

## Typography

### Actual font families

- Shared site headings, body, navigation, buttons, labels, forms, and metadata: **Inter Variable**, self-hosted WOFF2, weight range 100–900, `font-display: swap`.
- `--ac-font-display` aliases `--ac-font-sans`; no second display family is rendered.
- `@fontsource-variable/newsreader` and `@fontsource/ibm-plex-mono` remain package dependencies but have no `@font-face` rule and no rendered consumer.
- Standalone `/sms-notification-consent/`: Montserrat/Open Sans from Google Fonts, intentionally isolated.

This differs from the repository-level AGENTS typography block, which still describes Newsreader + Inter + IBM Plex Mono. Current CSS and computed output are Inter-only.

### Type roles

| Role/class | Size | Weight | Line height | Letter spacing / behavior |
| --- | --- | ---: | --- | --- |
| Body | `1rem` (16px) | 400 | `1.6` globally | Inter |
| `.ac-type-display`, homepage `.ac-type-h1` | `clamp(2.5rem, 4.6vw, 3.7rem)` | 500 | `1.1` | `-0.018em`, pretty wrap |
| `.ac-type-h1-hub` | `clamp(2.2rem, 4vw, 3.1rem)` | 500 | `1.12` | `-0.015em`, max `20ch` |
| `.ac-type-h1-band` | `clamp(1.9rem, 3.4vw, 2.6rem)` | 700 | `1.15` | `-0.015em`, max `24ch` |
| `.ac-type-h2` | `clamp(1.85rem, 3.2vw, 2.5rem)` | 600 | `1.14` | `-0.015em` |
| `.ac-type-h2-field` | `clamp(1.7rem, 3vw, 2.25rem)` | 600 | `1.14` | max `22ch` |
| `.ac-type-h2-record` | `clamp(1.6rem, 2.7vw, 2.1rem)` | 600 | `1.14` | record cards |
| `.ac-type-h2-final` | `clamp(2rem, 3.6vw, 2.9rem)` | 600 | `1.14` | max `20ch` |
| `.ac-type-h2-overlay` | `clamp(1.55rem, 2.6vw, 2.05rem)` | 600 | `1.14` | service overlay |
| `.ac-type-h2-referral` | `clamp(1.5rem, 2.6vw, 1.9rem)` | inherited elsewhere | inherited | senior page only |
| `.ac-type-h3` | `1.0625rem` (17px) | 800 | `1.2` | `-0.015em` |
| `.ac-type-h3-card` | `0.9375rem` (15px) | 700 | `1.3` | cards/items |
| `.ac-type-h3-band` | `1.25rem` (20px) | 800 | `1.2` | max `34ch` |
| `.ac-type-h4` | `1rem` | 800 | `1.14` | credential headings |
| `.ac-type-h4-mega` | `1.125rem` | 800 | `1.2` | mega-menu hub |
| `.ac-type-lead` | `1.0625rem` (17px) | 400 | `1.45` | lead copy |
| `.ac-type-body` | `1rem` | inherited | `1.66` | body role |
| `.ac-type-sm` | `0.8125rem` (13px) | inherited | `1.4` | small copy |
| `.ac-type-xs` | `0.75rem` (12px) | inherited | `1.3` | `0.02em` |
| `.ac-label`, `.ac-eyebrow` | `11px` | 600 | normal | uppercase, `0.05em`; 6×12px chip |
| `.ac-type-label-head` | `11px` | 600 | `1.4` | uppercase, `0.06em` |
| Nav items/CTA | `13.5px` | 600/700 | centered in 66px bar | nowrap |
| Buttons | `0.9rem` (14.4px) | 600 | `1.2` | `-0.01em` |
| Form labels | generally `0.875rem`–`0.9375rem`, component-local | 600–700 | component-local | no transform |

At 390px computed homepage H1 is 40px/44px; hub H1 is 35.2px/39.424px; compact company-band H1 is 30.4px/34.96px; body is 16px/25.6px. At 768px those clamp minima still apply. At 1440px the homepage H1 reaches 59.2px and hub H1 reaches 49.6px.

Headings do not receive size from bare `h1`–`h4` selectors; role classes carry the size. One specialized senior-page class supplies size only while its companion class supplies the rest.

### Measures

- Intimate: `46ch`.
- Reading: `62ch`; a zero-specificity `:where(p, li)` cap applies by default.
- Wide: `1200px`.
- Bleed: `100vw`.
- Section headers: usually `52ch`; page/header ledes generally `56ch`–`58ch`.

## Spacing and layout

### Spacing tokens

Primary mockup scale: `8, 16, 24, 32, 48, 64, 96px` through `--ac-s1`…`--ac-s7`.

Legacy/utility scale also exists: `4, 8, 24, 32, 48, 64, 96, 72px` through `--ac-space-1`…`--ac-space-8`. Because both sets coexist and scoped components add values such as 10, 12, 14, 18, 20, 22, 26, 30, 34, 36, 38, 40, 42, 44, 52, 56, 60, 62, 66, 68, 70 and 86px, this is a disciplined but not closed spacing scale.

### Containers and gutters

- `.ac-shell`: `width: min(100% - 48px, 1200px)`, centered; fixed 24px side gutter.
- `.ac-measure-*`: `width: min(100% - 2 × clamp(1.25rem, 4vw, 3rem), measure)`, centered.
- At 390px `.ac-shell` computes to 342px (24px gutters).
- At 768px it computes to 720px.
- At ≥1248px it caps at 1200px.

### Section rhythm

| Wrapper | Desktop | Mobile ≤760px |
| --- | --- | --- |
| default `main > section` / `.ac-sec` | 68px block padding | 60px |
| `.ac-sec--tight` | 48px | 40px |
| homepage hero inner shell | 86px top/bottom plus curved divider allowance | unchanged |
| hub/service `.ac-ph > .ac-shell` | 66px top / 62px bottom | 44px block |
| company/legal `.ac-pgh > .ac-shell` | 42px top / 44px bottom | unchanged |
| service fit strip inner shell | 34px top / 36px bottom | unchanged |
| credential strip | 24px | 18px |
| amber band | 96px minimum height | 22px block padding |
| photo band | 420px image, or 400px short | 280px / 270px |
| footer | 64px top; 52px before legal divider; 20/30px legal padding | same grid spacing |

## Radii, borders, and shadows

- Panel radius: `12px` (`--ac-r`).
- Controls: `2px` (`--ac-r-sm`, `--ac-radius-control`).
- Cards: `6px`.
- Section labels: `4px`; status tags `3px`; icon chip `11px`; saturated field `30px` desktop/`20px` mobile.
- Borders are primarily 1px `#e3e9f0`; strong controls use `#ccd6e2`.
- Standard card shadow: `0 2px 10px rgba(18,40,64,.06)`.
- Pop/mega shadow: `0 22px 40px -24px rgba(18,40,64,.35)`.
- Focus ring: 3px solid `#2e5c9e`, 4px offset globally; form controls add component-local focus borders/shadows.

## Buttons and CTA hierarchy

| Variant | Dimensions/style | Hover/focus | Typical labels |
| --- | --- | --- | --- |
| `.button`, `.btn`, `.btn-primary` | min-height 48px; 14×24px padding; 2px radius; navy-800/white; 14.4px 600 | navy-950, −1px lift, larger shadow; global 3px focus ring | Request an assessment, form actions |
| `.btn-light` | white/navy; 1px strong border; no shadow | navy border, no movement | secondary action on light |
| `.btn-ghost-dark` | transparent white 8%; white 25% border | white 16% fill | secondary action on navy |
| `.btn--w` | white/navy; 4px radius | `#e9eff6`, no movement | hero primary |
| `.btn--o` | transparent/white; inset 1.5px white border; 4px radius | 9% white fill | Text a photo, Call |
| `.btn-on-light` | white/navy with small dark shadow | remains white | alternate light control |
| Amber band link | navy-900; 15×26px; no shared radius rule | `#0a1725` | Request an assessment |
| Card CTA bar | full-width navy strip; 14×20px; 13px 700 | `#16294a` | service-page label |
| Mobile fixed bar | full-width 3-way split; 13–15px vertical padding | no explicit hover requirement | Request / Text / Call |

Primary conversion is Request an assessment. Text a photo is the lighter secondary. Phone is a contextual tertiary or the amber mobile action. Text links and card bars are navigation, not equivalent conversion buttons.

## Core component specifications

| Component | Purpose and variants | Visual/responsive behavior | Production use |
| --- | --- | --- | --- |
| `StatusRibbon` | Four-item trust/contact strip | 34px dark bar; wraps to ~97px at 390px | All shared-layout pages |
| `Header` | Sticky desktop nav, four mega groups, direct links, mobile drawer | 66px; mega panel 250px + 2-column links; switches to burger at ≤1050px; CSS checkbox drawer | All shared-layout pages |
| `SeoHead` | Shared title/meta/canonical/robots/OG/Twitter/JSON-LD graph | Nonvisual; image prop switches Twitter to large-image and adds `og:image` | All shared-layout pages through BaseLayout |
| `MobileCTA` | Fixed Request/Text/Call bar | only ≤760px; 43px measured at 390px; primary 1.5× flex | Most pages; disabled on assessment and private residence |
| `Footer` | Brand + four link columns + utility/legal bar | 5 columns desktop, 2 columns ≤1050px; no 1-column mobile rule | All shared-layout pages |
| `Hero` | Homepage two-column thesis/status document with curved divider | navy gradient; H1 + CTAs + panel; collapses to one column ≤1050px | Homepage |
| `PageHeader` | Compact company/legal header | navy, 42/44px padding, decorative angled sweep hidden ≤760px | 13 route files |
| `CompactHero` | Older gradient/dot compact hero | `clamp(2.75rem,6vw,4.5rem)` padding; max 49rem | Senior Downsizing only |
| `CredentialBar` | Four credibility cells | 4 columns desktop; 2 columns ≤760px | Homepage, hubs, service template, assessment |
| `RoutingDoors` | Six buyer-situation doors filtered by indexability | 3/2/1 grid across desktop/tablet/mobile | Homepage |
| `ServiceCards` | Three family cards with placeholder media | 4-track base but three cards; 2 columns ≤1050px, 1 ≤760px | Homepage |
| `Card` | Generic image-slot service card | 172px clipped image, 6px card, full-width CTA | **Unused** |
| `WhyAseptaclean` | Four-item navy field | rounded 30px field; 4/2/1 layout | Homepage |
| `ConfidenceAndFit` | inclusion/exclusion panels and assurance | two-column split → one column ≤760px | Homepage |
| `AccentBand` | amber deadline/response band with two actions | flex wrap; CTA loses auto margin on mobile | Homepage, FAQ, Service Areas, hubs |
| `HandoffStandard` | five-stage rail | 5 columns → 2 ≤1050px → 1 ≤760px | Homepage |
| `HandoffRecord` | large photo-slot band + overlapping sample record/table | 420px image; 620px record; mobile image 280px and −140px overlap | Homepage |
| `Pricing` | price drivers + assessment framing | two columns → one; tight rhythm | Homepage |
| `AreasWeServe` | ten-city icon list | shared icon-row 4/2/1 | Homepage, Service Areas |
| `OperatorAccountability` | founder/accountability block | route-specific two-column layout, collapses ≤760px | Homepage |
| `FAQ` | homepage `<details>` FAQ list | native disclosure behavior; shared FAQ styling | Homepage |
| `FinalCTA` | dark closing CTA field | white/outline CTAs wrap | Homepage |
| `ServiceHub` | reusable hub header/cards/process/band | card count controls grid; 2/1 responsive | Three group hubs |
| `ServicePageLayout` | reusable 14-page service system | common fit, outcome, panels, record overlay, FAQ, related links | Fourteen services |
| `RequestForm` | dark two-column compact assessment section | copy + `QuickHandoffForm`; collapses on mobile | 15 route files plus homepage |
| `QuickHandoffForm` | name/phone/email/details/consent compact form | 48px controls, error summary, Turnstile, stacked mobile | Every `RequestForm` |
| `AssessmentForm` | 3-step full intake with variant routing and uploads | rail/content split ≥1024px; responsive 2/3-column field groups; single-column small mobile | `/request-assessment/` |
| `LegalPolicy` | Termly embed with hosted/email fallback | document panel, 60rem breakpoint | Three legal routes |
| `ResidenceBaselineRecord` | sample room-by-room operating document | table/record composition; switches at 42rem | Private Residence Reset |
| `ServiceScope`, `ServiceMethodRail`, `ServiceProof`, `ServicePricing`, `ServiceFAQ` | older service-section chain | mostly 40rem/56.25rem breakpoints | Senior Downsizing only (ServiceFAQ also FAQ page) |
| `RelatedServices`, `ServiceBoundaries`, `ServiceChecklist`, `ServiceFitPanel` | legacy service-section components | independent warm/white panels and 40/56.25rem grids | **Unused** |
| `Analytics` | consent-aware GA/GTM loader and data-layer events | no visual UI | Shared layout |

## Cards, panels, and section rules

- Cards are white with 1px hairline, 6px radius, restrained shadow, and no whole-card lift. Only the CTA bar responds.
- Image slots are not images: flat `#e3e9f0` blocks with uppercase labels and clipped chevrons. Mobile service tiles reveal their navy overlays permanently because hover is unavailable.
- Saturated navy `.ac-field` is the principal signature surface, with 30px/20px outer radius.
- Fit strips use warm white and green checks; scope exclusions use pale red with a red header.
- Sample record surfaces deliberately mimic operational artifacts using metadata rows, status tags, tables, and strong navy headers.
- Section labels are small uppercase pale-blue rectangles, not rounded marketing pills.

## Forms

### Compact form

`QuickHandoffForm.astro` includes name, phone, optional email, property details, consent, Turnstile, error summary, submit status, and endpoint-disabled fallback. Inputs have 48px minimum height, 2px radius, 12px padding; textarea minimum height is 80px. Validation adds `aria-invalid`, focuses and scrolls the error summary, and resets Turnstile after failure. Submission uses `fetch` + `FormData`.

### Full assessment

`AssessmentForm.astro` is a progressive three-step form with a no-JS all-fields fallback, route/offer variant, branching residence-only questions, attribution fields, local/session draft persistence, upload validation/removal, Turnstile, error summary with focus routing, XMLHttpRequest upload progress, and endpoint-disabled messaging. Controls are at least 48px; textarea is at least 128px; choices are bordered control rows. Layout changes at 40rem and 64rem, with additional ≤39.99rem and ≤24rem rules.

## Responsive system

Primary shared breakpoints:

- `1050px`: desktop mega navigation becomes burger/drawer; 4/5-column grids become 2; footer becomes 2 columns.
- `760px`: most content grids become 1 column; section padding changes; fixed mobile CTA appears; curved/angled treatments simplify; decorative header sweep disappears.
- `400px`: mobile CTA type/padding tighten.
- `64rem` (1024px): full assessment and several legacy layouts switch to desktop composition.
- `40rem` (640px): form and older component grids switch between one and two/three columns.
- Additional local breakpoints: 42rem, 48rem, 54rem, 56.25rem, 60rem, 62.5rem, and 24rem.

Measured at 390px, representative pages had `scrollWidth === clientWidth` (no actual document horizontal overflow). The automated element list flags the closed drawer because it is translated one viewport to the right; it does not increase document scroll width. At 390px the ribbon wraps to 97px, the nav remains 66px, the fixed action bar is 43px, and the footer remains two columns at approximately 153px each. That two-column footer is dense but did not overflow.

At 768px the mobile CTA is gone while the burger remains; grids are mostly two columns and standard section padding returns to 68px. Wide desktop caps content at 1200px rather than stretching.

## Interaction and accessibility styling

- Global `:focus-visible` is a 3px blue outline with 4px offset.
- Mega menus open on hover, focus-within, or click; Escape and outside click close them.
- Mobile drawer uses a checkbox and `<details>` so basic open/close and groups work without JavaScript; JavaScript adds body-scroll lock and Escape handling.
- FAQ uses native `<details>/<summary>`.
- Reduced-motion mode disables smooth scrolling and collapses transition duration to `0.01ms`.
- Skip link remains off-canvas until focused.
- Print rules remove navigation, ribbon, mobile actions, drawer, and skip link; the estate checklist adds its own print treatment.

## Implemented inconsistencies

- Current site is Inter-only while AGENTS.md still names a three-font stack; two installed font packages are unused.
- Breakpoints mix pixels and rems and are more numerous than the nominal 1050/760 system.
- Tokens coexist with many approved hardcoded colors and spacing values.
- Footer never collapses below two columns, even at 390px.
- `/sms-notification-consent/` has a separate font, CSS, spacing, and SEO system by design.
- Senior Downsizing and Private Residence Reset use distinct older/local component systems rather than the current shared service template.
- Five reusable-looking component files are dead: `Card`, `RelatedServices`, `ServiceBoundaries`, `ServiceChecklist`, and `ServiceFitPanel`.
