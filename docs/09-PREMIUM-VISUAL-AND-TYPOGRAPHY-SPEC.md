# Phase 4 Premium Visual and Typography Specification

## 1. Design thesis

Aseptaclean should feel like:

> A private property-transition firm with field-operating discipline.

It should not resemble:

- a maid-service marketplace
- a junk-removal franchise
- a SaaS landing page
- a restoration contractor with unsupported scale
- a luxury real-estate brokerage
- an info-product sales page

The premium quality comes from specificity, hierarchy, original artifacts, restrained materials, typography, responsive composition, and complete states—not gradients, animation, or inflated claims.

## 2. Positive art direction

The page should combine:

- editorial clarity
- quiet residential materiality
- operational documentation
- calm navy authority
- warm, human reading rhythm
- visible finish lines and decision control

Do not use percentage-based inspiration formulas. Earlier files contradicted one another on those percentages. This specification uses direct Aseptaclean principles instead.

## 3. Typography

### Approved families

- Display/editorial: **Newsreader Variable**
- Body/UI/forms/navigation: **Instrument Sans Variable**

Both must be self-hosted in WOFF2 format and recorded in the asset/license manifest.

### Usage

Newsreader:
- H1
- major emotional H2 statements
- selected outcome pull lines
- final CTA headline
- no small labels
- no dense form copy

Instrument Sans:
- body
- navigation
- buttons
- forms
- H3 and process labels
- utility copy
- document fields
- footer

### Token baseline

```css
:root {
  --font-display: "Newsreader Variable", "Iowan Old Style", "Palatino Linotype", serif;
  --font-sans: "Instrument Sans Variable", "Helvetica Neue", Arial, sans-serif;

  --text-xs: clamp(.8125rem, .79rem + .08vw, .875rem);
  --text-sm: clamp(.9375rem, .90rem + .12vw, 1rem);
  --text-body: clamp(1.0625rem, 1.02rem + .16vw, 1.125rem);
  --text-lead: clamp(1.1875rem, 1.08rem + .45vw, 1.4375rem);
  --text-h3: clamp(1.375rem, 1.20rem + .70vw, 1.875rem);
  --text-h2: clamp(2rem, 1.55rem + 2vw, 3.5rem);
  --text-h1: clamp(2.75rem, 1.80rem + 4vw, 4.75rem);
}
```

### Rules

- body line-height: 1.6–1.72
- display line-height: .96–1.08
- body measure: 56–68ch
- lead measure: 42–54ch
- no justified text
- no paragraph smaller than 16px
- utility text may be smaller only when contrast and spacing remain strong
- manually tune H1 line breaks; do not rely on `text-wrap: balance` alone
- no single-word orphan line in major headings where avoidable
- no three consecutive text elements with nearly equal visual weight

## 4. Color and material system

Keep:

- Navy `#1C355E`
- Deep Navy `#122840`
- Slate Blue `#6A9BC3`
- Steel `#A8B8C8`
- Warm White `#F7F8FA`
- Text `#334155`

Use white paper surfaces, fine rules, restrained shadows, muted image treatment, and occasional signal/caution colors only for functional meaning.

No new decorative color.

## 5. Homepage composition

Use eight movements, not a repeated section template:

1. **Hero** — emotional result, compact support, one CTA, Handoff Record/threshold visual
2. **Recognition** — name the unresolved moment in a quiet editorial field
3. **What finished feels like** — larger display type and visual breathing room
4. **Category contrast** — a continuous comparison, not three cards
5. **Five-Stage Standard** — a single rail or sequence
6. **Handoff Record** — proof centerpiece with real operational detail
7. **Confidence** — scope, assurance, price, founder accountability
8. **Decision** — final CTA and next-step clarity

No section should exist merely to repeat the previous claim with a new background.

## 6. Private Residence Reset composition

The campaign page uses the same design system but a distinct signature:

- Residence Baseline document
- room-by-room scope map
- finish/priority notes
- controlled photographic crops of architectural details
- quiet, more residential rhythm
- no maid-service checkmark wall
- no package cards

Suggested movements:

1. Bring the residence back to a defined standard
2. This is not routine housekeeping
3. What a restored baseline feels like
4. Assess → Define → Reset → Verify → Maintain
5. Room-by-room Baseline document
6. Scope and exclusions
7. Assurance and privacy
8. Starting investment and fit
9. Quarterly care invitation
10. Assessment CTA

## 7. Document artifact system

Primary artifacts:

- Property Handoff Record
- Room-by-room Scope Document
- Residence Baseline Record
- Change Authorization
- Completion Record

Rules:

- accurate operational content
- labeled `SAMPLE` when not from a client
- paper is the brightest surface
- no fake dashboard chrome
- no decorative tilt, curled paper, coffee stains, or faux case-file theme
- use monospace only for field labels and status metadata
- no animation on the core artifact

## 8. Imagery

Allowed:

- original founder portrait
- original hands/clipboard/threshold photographs
- original South Bay residential exteriors
- licensed architectural interior details used as atmosphere, never as proof
- clean material/detail crops
- empty or presentation-ready rooms that are not represented as Aseptaclean work
- image license and source recorded

Prohibited:

- fake before/after
- AI-generated people
- smiling cleaning crews
- staged maids
- branded fleet not owned
- sensational hoarding imagery
- hazmat/PPE theater
- images implying regulated services
- generic moving-box motif

## 9. Interaction

- motion duration usually 120–220ms
- no scroll reveal required
- no fade-up on every section
- hover changes must be subtle and functional
- visible focus is non-negotiable
- controls preferred at 44–48px minimum height
- sticky mobile CTA must not cover fields, Termly controls, or footer links
- respect reduced motion

## 10. Responsive art direction

Mobile is not desktop stacked.

At 320–430px:

- hero copy appears before artifact/media
- one CTA remains dominant
- H1 is intentionally broken
- document artifacts become readable excerpts, not miniaturized desktop documents
- comparison sections become sequential statements, not narrow columns
- forms use one column
- sticky actions never cover validation or consent controls

At 768–1024px:

- avoid awkward half-desktop layouts
- use deliberate tablet compositions
- review header and document-artifact scale independently

## 11. Premium evidence gate

The implementation must pass:

- 5-second test: offer, audience, outcome, and next step are understood
- logo-swap test: page cannot become a generic cleaner or SaaS site
- screenshot review at 320, 390, 768, 1024, 1280, 1440
- no repeated card-wall composition
- no obvious AI-default accumulation
- no typography jump
- no horizontal overflow
- no weak mobile art direction
- no unsupported proof

Premium is a release judgment backed by evidence, not a CSS class or self-description.
