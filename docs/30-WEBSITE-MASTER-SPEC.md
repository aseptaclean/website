# Aseptaclean — single current website design specification

Effective 2026-09-04. Replaces the previous Sevenson-led master, the 45/30/25 design system, and BUILD-EXACT v2/v3 as design authorities. This document controls layout; source wording, verified facts, and integration behavior have their own scoped sources in README.md.

## 1. What 70% ClearPath / 30% 911 Bio Clean means

Reference: reference/clearpath-911-visual-reference.pdf. Pages are 1-based. These are screen captures placed in a PDF, not original CSS or complete mobile screenshots. Numerical values below are implementation targets chosen for Aseptaclean, not claimed measurements of competitor code. Ignore browser chrome, the macOS dock, and accidental capture clipping.

| Element | Reference | Required adaptation |
| --- | --- | --- |
| Home hero | ClearPath p23 | Large full-width property/cleanup photograph, dark overlay, left-aligned copy, compact form right. Visible call action in copy column. |
| Service hero | ClearPath p28 | Same photo-background + copy/form composition; service-specific image and headline. Do not substitute the old white-copy/isolated-photo split. |
| Services preview | 911 p3–4; ClearPath p24 | Simple photo cards with title, brief source excerpt, page link; five real services. |
| Main section rhythm | ClearPath p25–32 | Alternate substantial white image/text sections with occasional dark or accent bands. Photography occupies real space. |
| Process | ClearPath p25 and p30 | Compact horizontal steps, stacking cleanly on mobile. Source controls the number and wording of steps. |
| Calm content and geographic clarity | 911 p2, p4, p14–16, p22 | Readable white sections, restrained cards, short hierarchy, useful service-area presentation. |
| FAQ | ClearPath p33; 911 p16 | Simple full-width accordion rows within a readable centered column. |
| Footer | 911 p8 | Substantial dark footer with clear service, company, legal, and contact groups. |

ClearPath supplies the dominant composition and photographic rhythm. 911 supplies restraint in cards, reading sections, and supporting navigation. Aseptaclean's navy, logo, typography, real people, and source copy apply throughout; there is no third percentage.

Use standard reference layout patterns directly where specified. Do not copy competitor images, logos, distinctive badges, maps, written claims, or text. No reflexive “make it different” redesign of the hero or page architecture.

Use rectangular image/text boundaries for the calmer 911 influence. ClearPath's diagonal emergency badge and decorative geometry are not required. Do not add emergency availability language merely to fill a badge. This is an intentional adaptation, not a reason to remove the strong photo/copy composition.

## 2. Brand and geometry

Inter Variable throughout marketing UI. Navy #1C355E; deep navy #122840; slate blue #6A9BC3; steel #A8B8C8; warm white #F7F8FA. White body surfaces; deep navy for photo overlays, selective bands, footer. Slate accents must pass contrast against their actual background before use for text.

Use `docs/styles/website-reference.css` as the numerical reference, mapped into existing site tokens/components. Do not load two competing global stylesheets or duplicate token systems. CSS is subordinate implementation detail of this spec.

**Visual measurement and CSS audit baseline: `docs/reference/aseptaclean-css-profile.md`, profile AC-CP70-91130-1.1.** Copy, facts, routes, forms and policy requirements retain their current scoped authorities — the profile's own "Authority and scope" section states it does not authorize new claims, changed services, rewritten policies or deployment. **Profile §7 is a release criterion, not a goal:** on the eight photographic-hero pages the complete desktop hero must fit above `V − B − 16px` at 1440×900, 1536×864, 1366×768 and 1280×800, and the headline plus primary call must be visible at 390×844. Earlier "goal only" above-fold language is retired. Fit is established by measuring a real build — a `max-height` declaration proves nothing, and an unmeasured page is UNVERIFIED, never a pass.

- Desktop content width: max 1320px; gutters 32px, tablet 24px, mobile 20px.
- Header: compact white navigation, target 72px desktop / 64px mobile. Preserve a real utility bar if required and measure the combined height; do not blindly assume a fixed 99px offset.
- Desktop section padding: normally 72–88px; mobile 40–52px. Dense supporting sections may be smaller. Do not give each small source paragraph an entire padded section.
- Split sections: near 50/50 columns, 48–64px gap, image height roughly 380–480px on desktop. Crop by subject, not a universal center point.
- Buttons: rectangular, modest 4px corner radius, minimum 48px touch height. Forms/pictures may use restrained 6–8px radius where suitable. No pill-button system, dashboard panels, decorative gradients, floating glass cards, or oversized ornamental numbering.
- Hero form: dark readable panel with a subtle border over the background photograph. Use a solid/semitransparent navy surface; backdrop blur is not required. Body content forms use light fields.
- H1: responsive 34–52px; body 16–18px, line height 1.5–1.65; one semantic H1 per page. Preserve source text instead of hard-coded line breaks to force a screenshot silhouette.

## 3. Hero and form fit

Home and the five service pages share one responsive HeroWithForm component. The hub and About use shorter photographic introductions without the full intake panel. Contact uses a compact title plus call/details/form split. Legal pages use a text title.

Desktop >=1200px: fluid copy column + 520–560px form column, approximately 52px gap. If actual content needs more width or height, adjust measured spacing and the breakpoint, not the phone number, required consent, or source wording.

At smaller widths stack copy then form. Keep the call action near the headline; do not make mobile users scroll through the entire form before finding the phone action. A mobile fixed call control is permitted if it does not obscure forms, content, focus, or cookie controls and the page reserves its actual height plus safe-area inset.

Above-fold targets: at 1440x900 and 1536x864, show the headline, call action, entire compact form, and submit button without clipping. Also inspect 1366x768 and 1280x800; aim for the same with measured compact spacing. On short viewports, zoomed text, or long required consent, allow normal vertical scrolling. A fixed height with overflow:hidden is never an acceptable way to claim the hero fits. Do not promise the entire hero fits on every device.

Use content-aware height, never a giant minimum-height copied from an old mockup. Account for real header/utility height, browser viewport, consent copy, form status, anti-spam widget, and any image disclosure. Keep disclosure text under the layout, not as a second horizontal flex child that steals the form's width. Do not delete existing helper/consent copy merely to meet a geometry target.

### 3.1 Route exception — stacked hero photograph on `/crime-scene-trauma-cleanup-san-jose/`

Owner-authorised 2026-09-06. **One route. Stacked widths only (<1200px). Desktop is unchanged.**

The stacking rule above leaves the hero photograph sized against the combined copy + form box.
`object-fit: cover` scales the source to the larger of the two box ratios, so on this route a
390px viewport gave a 390×1575 media box for the 1672×941 master: **13.9% of the source width
survived**, and the form panel covered everything past ~47% of the height. The hero showed a hood
and a respirator and no recognisable work. No `object-position` value can repair that — the crop
is a property of the box, not of the focal point, which is why the 2026-09-06 first pass reported
it as a limit rather than claiming a fix.

On this route, below 1200px:

- the hero copy and the primary call action sit in a photo-backed upper region, as before;
- **the photograph is sized against that upper region only**;
- the intake form follows immediately in normal flow, on the section's own solid navy.

Measured result (`scripts/trauma-hero-mobile-check.mjs`):

| Width | Media box | Source width kept | Source height kept |
|---|---|---:|---:|
| 390 | 390×749 | 29.3% (was 13.9%) | 100% (was ~53%, form-obscured) |
| 768 | 768×485 | 89.2% | 100% |
| 1024 | 1024×471 | 100% | 81.8% |
| ≥1280 | unchanged | 100% | 72.8–77.8% |

Everything else in §3 still binds here and was verified: no fixed height, no max-height, no
`overflow: hidden`; content sets the height and the page scrolls; the call action stays directly
under the headline and ahead of the form in DOM order; no field, consent line, helper text or
disclosure was removed, shrunk or reordered. The rendered text and every `alt` string on the
route are byte-identical before and after the change — this is a geometry change and nothing else.

Implementation: `stackedLayout="split-band"` on `AcHeroWithForm`, opt-in and defaulted to the
sitewide `overlay` behaviour, set from `heroStackedLayout` on the trauma record in
`src/data/servicePageCopy.ts`. The homepage and the other four service heroes pass nothing and
are unaffected; `acx-hero--split` appears in exactly one built page. **Do not generalise this to
another hero without its own recorded owner decision.**

## 4. Shared components

SiteHeader, CallLink, HeroWithForm, CompactPhotoHero, ServiceCardGrid, ImageTextSplit, DarkImageTextSplit, ProcessSteps, FounderSplit, ServiceArea, FAQAccordion, ContactForm, FinalCallSection, SiteFooter, LegalPageShell. Reuse the real repository equivalents where possible. Names describe responsibilities, not mandatory new files.

Service cards: five cards across two rows on wide screens; use three on the first row and two centered on the second. Do not invent a sixth service to fill the grid. Two columns at tablet; one at narrow mobile. Image ratio about 4:3. Consistent titles and short excerpts; no massive full-page copy crammed into cards.

Image/text splits alternate sides between substantial sections. Do not mechanically alternate after every paragraph. One or two dark breaks in a long service page are sufficient. Full-width photography must remain visible through the overlay.

Process: five steps where the main copy has five; four on trauma. Do not delete a source step to imitate a competitor's count. No tall desktop zigzag timeline; 911's long timeline is not part of the selected 30%.

FAQ: keyboard-accessible disclosure buttons with expanded state and associated panel; preserve questions and answers. No manufactured review carousel or fake statistics band.

## 5. Page architecture

Page briefs contain exact source-section placement. All listed content appears somewhere; explicitly omitted homepage repetition is listed in 20-COPY-MAP.md. Main source sentences remain intact except the named display overrides.

Homepage: Header → photographic hero/form → verified trust row → introductory image/text split → five-service photo grid → dark image/text scope section → source process → founder section → verified service area → source FAQ → final call section → footer.

Services: Header → compact photographic hero with call/message actions → five editorial service rows with images and page links → compact source process → remaining hub guidance/FAQ grouping → call section → footer.

Services use the common photo hero/form, then page-specific arrangements in their briefs. Avoid duplicating the homepage architecture word for word on every page.

About: compact photo introduction → real founder portrait and background → operating principles → factual company context → final call → footer.

Contact: compact title → call/details + working form → verified service area → footer.

Privacy, Terms and Conditions, Cookie Policy: shared header → breadcrumb/title → provider policy → accessible fallback if needed → footer. No sales sections inside the policy.

## 6. Conversion hierarchy

Call Aseptaclean is the primary action. Send a Message remains secondary. Service cards and menus still navigate to service information. Form submit is Send Message. The word assessment can remain in explanatory copy about how work is scoped; it is no longer the default action label.

Do not convert every existing Request an Assessment string by blind global replacement: headings, explanatory prose, consent, API names, and protected provider content have distinct meanings. Apply the precise display map and leave real integration identifiers intact.

## 7. Visual completion

Compare actual rendered screenshots against the corresponding PDF references, not just against this prose. Verify composition, photo proportion, section density, form fit, and readable text. “No overflow” is necessary but does not establish visual similarity.

A missing image is an asset task, not permission to transform a photographic page into text-only navy bands. Use truthful licensed illustration where allowed by 06-ASSET-MANIFEST.md. If assets are unavailable, finish the structure and record the exact image slot; do not declare the visual result complete or publish unlabeled dummy assets.

Do not redesign the page system during later page implementation. Apply fixes to the shared component and check affected page types. Update this spec when a current owner decision changes its design, rather than hiding a new exception in a long log.
