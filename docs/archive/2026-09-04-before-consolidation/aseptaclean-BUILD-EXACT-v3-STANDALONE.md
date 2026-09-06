# ASEPTACLEAN LOCKED WEBSITE BUILD SPECIFICATION
## Page-by-page copy + HTML structure + CSS + implementation rules

**Status:** BUILD AUTHORITY  
**Purpose:** Prevent implementation drift.  
**Visual baseline:** The homepage geometry, proportions, CSS, section order, and component behavior embedded in THIS FILE. No separate mockup file is required.  
**Secondary design reference:** `ACWEB003_design_profile.md` for structural discipline only.  
**Copy authority:** THIS FILE ONLY for the rendered result. The visible copy embedded below is source-locked from Aseptaclean-owned copy sources identified in Section 0.1. Do not reuse page copy from `ACWEB003_design_profile.md`.

---

# 0. NON-NEGOTIABLE BUILD RULES

## STANDALONE FILE RULE

This document is intentionally self-contained.

Do NOT expect, request, or depend on a separate HTML mockup file.

The approved homepage mockup has already been translated into this document as:

- exact section order
- exact component architecture
- exact grid ratios
- exact hero proportions
- exact form proportions
- exact service-card arrangement
- exact section heights
- exact dark/light rhythm
- exact CSS
- exact responsive behavior
- exact copy

If this file and an older repository mockup conflict, THIS FILE wins for the current redesign.



This file is not a suggestion document.

The public website must be implemented according to the section order, copy, layout geometry, and CSS rules below.

## Codex / AI implementation rules

DO NOT:

- invent a different layout
- replace the approved composition with a preferred framework pattern
- add extra marketing sections
- remove specified sections because they feel repetitive
- rewrite approved copy
- "improve" headlines
- add new service claims
- replace large photographs with icon cards
- replace split sections with generic centered text
- convert square components to rounded SaaS cards
- add gradients
- add glassmorphism
- add decorative blobs
- use large pill buttons
- invent reviews, statistics, certifications, team size, partnerships, agency logos, project photos, or before/after proof
- use copy from `ACWEB003_design_profile.md`
- restore the old long assessment form
- create duplicate routes
- change route architecture unless separately instructed

DO:

- preserve current verified routes
- preserve current working forms, HubSpot/CRM/email/SMS integrations, analytics, validation, upload logic, and legal consent
- use shared components and a shared stylesheet
- render the supplied copy exactly except for punctuation/HTML escaping
- use the approved homepage HTML mockup as the visual standard
- use real Aseptaclean images when available
- use approved licensed illustrative photography when real job imagery is not available
- keep illustrative photography distinct from actual proof
- use one H1 per page
- run rendered visual QA at 390, 768, 1024, and 1440px
- run the full production build before reporting completion

## Authority order when instructions conflict

1. **This locked build specification**
2. **The homepage geometry, CSS, and section specifications embedded in this file**
3. **Current repository routes and functioning integrations**
4. **Current verified factual company information**
5. `ACWEB003_design_profile.md` for useful structural reference only
6. Older design/copy documents

The attached ACWEB003 profile is NOT authoritative for:

- copy
- colors
- amber accents
- fonts
- rounded/pill geometry
- WordPress/Elementor instructions
- old service architecture
- old claims
- old launch restrictions

Its useful ideas are structural only:
global CSS, consistent classes, fixed section order, hero-with-form, strict responsive rules, a shared component inventory, and change control.

---


# 0.1 SOURCE-LOCKED COPY AUTHORITY

The visual design is approved. The copy is now locked to Aseptaclean-owned source material.

## Copy sources allowed

### Source A — Core current service copy
`aseptaclean-all-website-copy.md`

Use for:
- Homepage
- Services hub
- Hoarding Cleanup
- Severe Property Cleanup
- Rodent Droppings & Animal Waste Cleanup
- Detailed Deep Cleaning
- assessment/reassurance language

### Source B — Current trauma copy
`aseptaclean-crime-scene-trauma-cleanup.md`

Use for:
- Crime Scene & Trauma Cleanup
- homepage/service-hub trauma routing copy
- TSW / regulated-waste language when that exact wording is needed

### Source C — Current company capability language
`Aseptaclean_Capability_Statement_Final.pdf` or the repository equivalent containing the same approved company facts.

Use only for:
- current company descriptor
- TSW #933
- insured wording
- regulated-waste transport/disposal wording
- county service area
- principal background

### Source D — Existing About / Contact copy
Current repository canonical About and Contact copy, including the strings captured in `CURRENT-WEBSITE-COPY.md`.

Use only where Sources A–C do not contain a dedicated About or Contact block.

## Explicitly prohibited as visible-copy sources

Do not take visible marketing copy from:
- `ACWEB003_design_profile.md`
- old launch playbooks
- competitor sites
- Codex-generated prose
- previous AI mockup filler text
- stale service architecture documents

## Source-lock editing rule

The final rendered copy below may:
- SELECT source sentences
- MOVE source sentences into a more appropriate visual section
- OMIT repetitive source sentences
- CHANGE heading level for HTML semantics
- combine source sentences into one visual component

The final rendered copy may NOT:
- paraphrase source sentences
- invent bridge copy
- invent a new claim
- "improve" a headline
- add adjectives
- create an unsupported guarantee
- add keyword stuffing

If a necessary visible string is not supplied below and cannot be found in the named source, STOP and report the missing slot.

Do not write new copy to fill it.

## Trace format

Every page section below includes:

`COPY SOURCE:` file → source heading/section

That trace is mandatory and should remain in the repository build documentation even though it does not render publicly.

---

# 1. DESIGN TARGET

The finished site should visually belong beside established specialty cleanup / biohazard remediation websites such as the supplied 911 Bio Clean and ClearPath references.

The site should feel:

- photographic
- serious
- calm
- direct
- established
- operational
- human
- easy to understand
- property-services oriented
- not like SaaS
- not like a medical dashboard
- not like a generic house-cleaning template

## Approved homepage visual rhythm

The approved mockup established this exact rhythm:

1. compact sticky white header
2. full-width dark photographic hero
3. short intake form inside hero
4. slim trust strip
5. three-image/property visual + copy section
6. photographic service cards
7. dark 50/50 image/copy section
8. compact four-step process
9. large regulated-authority section
10. real founder section
11. service-area map section
12. simple FAQ
13. deep-navy CTA
14. substantial footer

The rest of the site must look like it belongs to this same system.

---

# 2. BRAND TOKENS

## IMPORTANT COLOR NOTE

Layout is locked more tightly than color.

The values below match the approved mockup and current Aseptaclean direction. If the repository contains a newer explicitly approved brand palette, update ONLY the root token values. Do not redesign components or introduce new colors.

Do not restore the legacy amber scheme from ACWEB003.

```css
:root {
  --ac-navy-900: #122840;
  --ac-navy-700: #1C355E;
  --ac-slate-500: #6A9BC3;
  --ac-steel-300: #A8B8C8;
  --ac-warm-white: #F7F8FA;

  --ac-white: #FFFFFF;
  --ac-dark: #0D1724;

  --ac-ink: #151A20;
  --ac-body: #404851;
  --ac-muted: #6B737C;
  --ac-border: #D9DEE3;

  --ac-shell: 1180px;
  --ac-reading: 620px;

  --ac-gutter-desktop: 32px;
  --ac-gutter-tablet: 24px;
  --ac-gutter-mobile: 20px;

  --ac-radius-sm: 2px;
  --ac-radius-md: 4px;

  --ac-section-xl: 96px;
  --ac-section-lg: 80px;
  --ac-section-md: 64px;
  --ac-section-sm: 44px;

  --ac-header-h: 82px;
}
```

---

# 3. TYPOGRAPHY

Use the site's current approved Inter family.

Do not switch to Outfit/Figtree from the legacy profile.

```css
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ac-ink);
  background: var(--ac-white);
  font-size: 16px;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4 {
  margin-top: 0;
  color: var(--ac-ink);
  font-weight: 700;
  text-wrap: balance;
}

.ac-h1-home {
  font-size: clamp(46px, 4.8vw, 60px);
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.ac-h1-service {
  font-size: clamp(42px, 4.2vw, 54px);
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.ac-h2 {
  font-size: clamp(30px, 3vw, 38px);
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.ac-h3 {
  font-size: 22px;
  line-height: 1.18;
  letter-spacing: -0.015em;
}

p {
  margin: 0 0 1.05em;
  color: var(--ac-body);
}

.ac-lead {
  font-size: 18px;
  line-height: 1.55;
}

.ac-eyebrow {
  display: block;
  margin-bottom: 14px;
  color: var(--ac-slate-500);
  font-size: 12px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: .11em;
  text-transform: uppercase;
}
```

## Copy-density limits

These limits are intentional.

- Hero body: 35–75 words
- Large image/text section: 60–120 words
- Dark authority section: 35–90 words
- Service-card description: 25–50 words
- Process step: 20–40 words
- FAQ answer: 30–80 words
- Never place 250–400 words beside a single image

---

# 4. GLOBAL LAYOUT CSS

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

img {
  display: block;
  max-width: 100%;
}

.ac-shell {
  width: min(var(--ac-shell), calc(100% - 64px));
  margin-inline: auto;
}

.ac-section {
  padding-block: var(--ac-section-lg);
}

.ac-section--tight {
  padding-block: 56px;
}

.ac-section--warm {
  background: var(--ac-warm-white);
}

.ac-section--navy {
  background: var(--ac-navy-900);
  color: var(--ac-white);
}

.ac-section--navy h1,
.ac-section--navy h2,
.ac-section--navy h3 {
  color: var(--ac-white);
}

.ac-section--navy p {
  color: #D8E2EA;
}

.ac-centered {
  max-width: 760px;
  margin-inline: auto;
  text-align: center;
}

.ac-reading {
  max-width: var(--ac-reading);
}
```

---

# 5. BUTTONS

```css
.ac-btn {
  display: inline-flex;
  min-height: 46px;
  padding-inline: 22px;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid var(--ac-navy-700);
  border-radius: var(--ac-radius-sm);

  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;

  transition:
    background-color .18s ease,
    border-color .18s ease,
    color .18s ease;
}

.ac-btn--primary {
  color: var(--ac-white);
  background: var(--ac-navy-700);
}

.ac-btn--primary:hover {
  background: var(--ac-navy-900);
  border-color: var(--ac-navy-900);
}

.ac-btn--outline {
  color: var(--ac-navy-700);
  background: transparent;
}

.ac-btn--on-dark {
  color: var(--ac-navy-900);
  background: var(--ac-white);
  border-color: var(--ac-white);
}

.ac-arrowlink {
  color: var(--ac-navy-700);
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
}
```

No pills.
No button glow.
No gradient.

---

# 6. GLOBAL HEADER + SERVICES DROPDOWN

## Required desktop DOM

```html
<header class="ac-header">
  <div class="ac-shell ac-header__inner">
    <a class="ac-brand" href="/">...</a>

    <nav class="ac-nav" aria-label="Primary navigation">
      <div class="ac-nav-services">
        <a class="ac-nav__link" href="/services/">Services</a>

        <button
          class="ac-nav-services__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="ac-services-menu"
          aria-label="Show services"
        >
          <!-- chevron -->
        </button>

        <div id="ac-services-menu" class="ac-services-menu">
          <!-- current verified service links -->
        </div>
      </div>

      <a class="ac-nav__link" href="/about/">About</a>
      <a class="ac-nav__link" href="/contact/">Contact</a>
    </nav>

    <a class="ac-btn ac-btn--primary" href="/request-assessment/">
      Request an Assessment
    </a>
  </div>
</header>
```

## Desktop CSS

```css
.ac-header {
  position: sticky;
  top: 0;
  z-index: 60;
  height: var(--ac-header-h);
  background: var(--ac-white);
  border-bottom: 1px solid rgba(18, 40, 64, .08);
}

.ac-header__inner {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 40px;
  align-items: center;
}

.ac-brand {
  color: var(--ac-navy-900);
  text-decoration: none;
}

.ac-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.ac-nav__link {
  color: var(--ac-ink);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
}

.ac-nav-services {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ac-nav-services__toggle {
  width: 28px;
  height: 32px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ac-services-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 310px;
  padding: 8px 0;
  background: var(--ac-white);
  border: 1px solid var(--ac-border);
  border-radius: var(--ac-radius-sm);
  box-shadow: 0 8px 24px rgba(18, 40, 64, .08);
}

.ac-services-menu a {
  display: block;
  padding: 11px 16px;
  color: var(--ac-ink);
  font-size: 14px;
  text-decoration: none;
}
```

## Required behavior

- "Services" text always links to the Services hub.
- Separate chevron toggles the dropdown.
- Desktop dropdown opens with click; hover/focus support is allowed.
- Escape closes.
- Click outside closes.
- Focus is returned logically.
- Mobile keeps Services link and separate expand control.
- Do not turn Services into a mega-menu.

Dropdown order:

1. Crime Scene & Trauma Cleanup
2. Rodent Droppings & Animal Waste Cleanup
3. Hoarding Cleanup
4. Severe Property Cleanup
5. Detailed Deep Cleaning

Use current verified repository routes.

---

# 7. SHARED COMPONENTS

# 7.1 HomeHeroWithForm

Use on homepage.

```css
.ac-homehero {
  position: relative;
  min-height: 555px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #1B2C3D;
}

.ac-homehero__image,
.ac-homehero__overlay {
  position: absolute;
  inset: 0;
}

.ac-homehero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-homehero__overlay {
  background: rgba(13, 27, 43, .56);
}

.ac-homehero__grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.08fr .72fr;
  gap: 74px;
  align-items: center;
}

.ac-homehero__copy {
  color: var(--ac-white);
}

.ac-homehero__copy h1 {
  color: var(--ac-white);
  max-width: 700px;
}

.ac-homehero__copy p {
  max-width: 650px;
  color: #EFF4F8;
}

.ac-homehero__actions {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 26px;
}
```

## Hero form

```css
.ac-heroform {
  padding: 28px;
  background: rgba(17, 30, 45, .84);
  border: 1px solid rgba(255, 255, 255, .34);
  border-radius: var(--ac-radius-sm);
}

.ac-heroform__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.ac-heroform__grid .ac-full {
  grid-column: 1 / -1;
}

.ac-heroform input,
.ac-heroform select,
.ac-heroform textarea {
  width: 100%;
  padding: 12px 13px;
  color: var(--ac-white);
  background: rgba(255, 255, 255, .12);
  border: 1px solid rgba(255, 255, 255, .28);
  border-radius: var(--ac-radius-sm);
  font: inherit;
  font-size: 13px;
}

.ac-heroform textarea {
  min-height: 92px;
}
```

---

# 7.2 ServiceHeroSplit

Use on individual service pages.

```css
.ac-servicehero {
  background: var(--ac-warm-white);
}

.ac-servicehero__grid {
  min-height: 530px;
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  align-items: stretch;
}

.ac-servicehero__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 64px 64px 0;
}

.ac-servicehero__media {
  min-height: 530px;
}

.ac-servicehero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

No card around the image.

---

# 7.3 TrustStrip

```css
.ac-truststrip {
  background: var(--ac-white);
  border-block: 1px solid var(--ac-border);
}

.ac-truststrip__grid {
  min-height: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  text-align: center;
}

.ac-truststrip__item {
  color: var(--ac-navy-900);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .04em;
}

.ac-truststrip__item:not(:last-child) {
  border-right: 1px solid var(--ac-border);
}
```

---

# 7.4 EditorialSplit

```css
.ac-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.ac-split--wide-image {
  grid-template-columns: 1.05fr .95fr;
}

.ac-split--wide-copy {
  grid-template-columns: .95fr 1.05fr;
}

.ac-split__media {
  min-height: 400px;
}

.ac-split__media img {
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
  border-radius: var(--ac-radius-sm);
}
```

Reverse order by modifier/class.
Do not duplicate component code.

---

# 7.5 ThreeImageMosaic

Homepage or Rodent distinction section only.

```css
.ac-mosaic {
  min-height: 390px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ac-mosaic__item {
  overflow: hidden;
}

.ac-mosaic__item:nth-child(2) {
  transform: translateY(26px);
}

.ac-mosaic__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Use no more than twice site-wide.

---

# 7.6 ServiceVisualCard

```css
.ac-servicecard {
  background: transparent;
}

.ac-servicecard__media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #D7DDE2;
}

.ac-servicecard__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-servicecard__body {
  padding-top: 18px;
}
```

No rounded outer card.
No heavy shadow.
No icon-first card.

---

# 7.7 DarkSplit

```css
.ac-darksplit {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 490px;
}

.ac-darksplit__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px;
  background: var(--ac-dark);
}

.ac-darksplit__copy h2 {
  color: var(--ac-white);
}

.ac-darksplit__copy p {
  max-width: 560px;
  color: #CFD8E2;
}

.ac-darksplit__media {
  min-height: 490px;
}

.ac-darksplit__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

# 7.8 PhotoAuthorityBand

```css
.ac-photoband {
  position: relative;
  min-height: 420px;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.ac-photoband__image,
.ac-photoband__overlay {
  position: absolute;
  inset: 0;
}

.ac-photoband__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-photoband__overlay {
  background: rgba(18, 40, 64, .82);
}

.ac-photoband__content {
  position: relative;
  z-index: 2;
  width: min(760px, calc(100% - 40px));
  margin-inline: auto;
  text-align: center;
  color: var(--ac-white);
}
```

---

# 7.9 ProcessFour

```css
.ac-process {
  padding-block: 88px;
}

.ac-process__header {
  max-width: 720px;
  margin: 0 auto 46px;
  text-align: center;
}

.ac-process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

.ac-process__step {
  position: relative;
  padding-right: 18px;
}

.ac-process__number {
  margin-bottom: 16px;
  color: var(--ac-steel-300);
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
}

.ac-process__step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 24px;
  right: -14px;
  width: 28px;
  height: 1px;
  background: var(--ac-border);
}
```

No process cards.

---

# 7.10 ScopeGrid / CostGrid

```css
.ac-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.ac-rule-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ac-rule-list li {
  padding: 12px 0;
  border-top: 1px solid var(--ac-border);
}

.ac-rule-list li:last-child {
  border-bottom: 1px solid var(--ac-border);
}
```

---

# 7.11 FAQ

```css
.ac-faq {
  max-width: 850px;
  margin-inline: auto;
}

.ac-faq__item {
  border-top: 1px solid var(--ac-border);
}

.ac-faq__item:last-child {
  border-bottom: 1px solid var(--ac-border);
}

.ac-faq__button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 0;
  border: 0;
  background: transparent;
  color: var(--ac-ink);
  font: inherit;
  font-weight: 750;
  text-align: left;
  cursor: pointer;
}

.ac-faq__answer {
  padding: 0 0 18px;
  color: var(--ac-body);
  font-size: 14px;
}
```

---

# 7.12 FinalCTA

```css
.ac-finalcta {
  padding-block: 86px;
  text-align: center;
  color: var(--ac-white);
  background: var(--ac-navy-900);
}

.ac-finalcta h2 {
  max-width: 760px;
  margin-inline: auto;
  color: var(--ac-white);
}

.ac-finalcta p {
  max-width: 660px;
  margin-inline: auto;
  color: #D8E2EA;
}
```

---

# 7.13 Footer

```css
.ac-footer {
  padding: 68px 0 24px;
  color: var(--ac-white);
  background: var(--ac-dark);
}

.ac-footer__grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr 1fr;
  gap: 48px;
}

.ac-footer__bar {
  margin-top: 44px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,.12);
}
```

---

# 8. IMAGE RULES

Photography is a design requirement.

## Homepage

5–7 meaningful photographic moments.

## Long service page

3–5 meaningful photographic moments.

## About

1 real founder portrait + 1–2 operational images.

## Contact

0–1 optional image.

## Real proof versus illustrative photography

REAL PROOF must be real:

- founder portrait
- actual Aseptaclean job photos
- actual before/after
- actual Aseptaclean vehicle
- actual team
- actual equipment if represented as Aseptaclean equipment

ILLUSTRATIVE PHOTOGRAPHY may be licensed stock:

- property condition
- cleanup context
- residential/commercial interiors
- restrained PPE
- cabinets/storage/garage
- severe conditions
- detailed cleaning
- controlled trauma-cleanup context

Never label stock as "our work."

No gore.
No dead bodies.
No horror-style imagery.
No fake law-enforcement scenes.
No theatrical hazmat imagery.

---



# 8.1 HOMEPAGE VISUAL CHECKSUM — NO EXTERNAL MOCKUP REQUIRED

The homepage must visually resolve to the following silhouette at 1440px.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ WHITE STICKY HEADER ~82px                                                  │
│ logo            Services / About / Contact       Request an Assessment     │
├────────────────────────────────────────────────────────────────────────────┤
│ DARK FULL-WIDTH PHOTO HERO ~555px                                          │
│                                                                            │
│ LEFT ~60%                                  RIGHT ~40%                       │
│ eyebrow                                    dark translucent short form      │
│ large H1                                   2-column inputs                  │
│ short lead                                 textarea                        │
│ 2 CTAs                                     submit                          │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE TRUST STRIP ~80px — 3 equal proof items                              │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE REFRAME SPLIT ~500px                                                 │
│ 3 narrow vertical images ~48%          copy ~52%                           │
├────────────────────────────────────────────────────────────────────────────┤
│ WARM-WHITE COMPACT SERVICE INTRO                                           │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE SERVICE ROUTING                                                      │
│ 3 image cards across                                                       │
│        2 centered image cards beneath                                      │
├────────────────────────────────────────────────────────────────────────────┤
│ DARK 50/50 SPLIT ~490px                                                    │
│ copy left                                  full-height photo right          │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE FOUR-STEP PROCESS ~380–440px                                         │
├────────────────────────────────────────────────────────────────────────────┤
│ DEEP-NAVY REGULATED AUTHORITY 2-COL ~420–480px                             │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE FOUNDER SPLIT ~500px                                                 │
├────────────────────────────────────────────────────────────────────────────┤
│ WARM-WHITE SERVICE AREA / MAP SPLIT ~400px                                 │
├────────────────────────────────────────────────────────────────────────────┤
│ WHITE FAQ — narrow ~850px                                                  │
├────────────────────────────────────────────────────────────────────────────┤
│ DEEP-NAVY FINAL CTA ~320–380px                                             │
├────────────────────────────────────────────────────────────────────────────┤
│ VERY DARK 4-COLUMN FOOTER — substantial                                    │
└────────────────────────────────────────────────────────────────────────────┘
```

If the rendered homepage does not broadly match this silhouette, section proportion, and image share, it is not complete.

Do not compensate for a missing image by creating a text-only section.
Do not increase section padding to create artificial luxury spacing.
Do not convert the service modules into rounded cards.
Do not remove the hero form.
Do not convert the dark 50/50 split into a centered navy statement.


# 9. HOMEPAGE
## Route: `/`

## Build objective

Use the homepage geometry, CSS, and proportions defined in this file as the geometry target.

## Exact DOM order

```text
Header
HomeHeroWithForm
TrustStrip
ReframeSplitWithMosaic
ServiceIntro
ServiceCardGrid
DarkSplit
ProcessFour
RegulatedAuthoritySplit
FounderSplit
ServiceAreaSplit
FAQ
FinalCTA
Footer
```

Do not change the order.

---

## HOME 01 — HERO

**COMPONENT:** `HomeHeroWithForm`

**COPY SOURCE:** Source A → Homepage hero, plus Source C only for the current Bay Area/company-service descriptor.

### Render exactly

**Eyebrow**

Specialty Property Cleanup

**H1**

When a property needs more than a normal cleaning company.

**Lead**

Specialty cleanup for biological contamination, trauma, decomposition, severe property conditions, rodent contamination, and animal waste throughout the San Francisco Bay Area.

**Supporting sentence**

Aseptaclean helps you understand what needs to happen and gets the property back under control.

**Primary CTA**

Request an Assessment

**Secondary CTA**

Send Photos

### Form

**Heading**

Show us what is happening.

**Supporting copy**

You do not need to know exactly what service you need.

You do not need to clean before contacting us.

And you do not need to write a long explanation.

### Hero-form fields

Use the owner-approved short intake fields:

- Full Name
- Phone Number
- Property ZIP Code
- What are you dealing with?
- Tell us what's going on

Dropdown:

- Crime Scene & Trauma
- Rodent Droppings or Animal Waste
- Hoarding or Heavy Clutter
- Severe Property Condition
- Detailed Deep Cleaning
- Not Sure

Submit:

Request an Assessment

Do not pull the legacy long form from Source A into the hero.

---

## HOME 02 — TRUST STRIP

**COPY SOURCE:** Source B + Source C.

Render exactly:

- California Registered Trauma Scene Waste Management Practitioner
- TSW #933
- Insured

No additional credential claims.

---

## HOME 03 — REFRAME SPLIT + THREE-IMAGE MOSAIC

**COMPONENTS:** `ThreeImageMosaic` + `EditorialSplit`

**COPY SOURCE:** Source A → Homepage → "Some properties need more than cleaning."

**H2**

Some properties need more than cleaning.

**Body**

A normal cleaning service works well when a home is already being maintained.

That changes when you are dealing with rodent waste, years of buildup, heavy clutter, animal waste, inaccessible rooms, or a property that has been neglected for a long time.

At that point, the first question is not:

**“How fast can someone clean this?”**

It is:

**“What actually needs to happen to this property?”**

That is where Aseptaclean starts.

### Layout

Mosaic left.
Copy right.

Do not add bullets.
Do not add a new CTA inside this section.

---

## HOME 04 — SERVICE INTRO

**COPY SOURCE:** Source A → Homepage → "What are you dealing with?"

**H2**

What are you dealing with?

**Body**

You do not need to know the name of the service before you contact us.

Start with what is happening at the property.

---

## HOME 05 — SERVICE CARD GRID

**COMPONENT:** `ServiceVisualCard`

Desktop row 1:
3 cards.

Desktop row 2:
2 centered cards.

### Card 1 — Crime Scene & Trauma Cleanup

**COPY SOURCE:** Source B → trauma hero.

**Title**

Crime Scene & Trauma Cleanup

**Body**

Aseptaclean provides discreet crime scene and trauma cleanup for homes, businesses, vehicles, and other accepted properties throughout the Bay Area.

**Link**

Crime Scene & Trauma Cleanup →

### Card 2 — Rodent Droppings & Animal Waste Cleanup

**COPY SOURCE:** Source A → Homepage → rodent service router.

**Title**

Rodent Droppings & Animal Waste Cleanup

**Body**

Droppings, urine, nesting material, animal waste, odors, or affected areas after pest activity may need more than a quick sweep or surface clean.

Aseptaclean handles the cleanup side after rodent or animal activity.

**Link**

Rodent Droppings & Animal Waste Cleanup →

### Card 3 — Hoarding Cleanup

**COPY SOURCE:** Source A → Homepage → hoarding service router.

**Title**

Hoarding Cleanup

**Body**

Heavy clutter, accumulated belongings, blocked rooms, trash mixed with personal items, or years of contents can make it hard to know where to begin.

We help break the property into clear steps so the work can move forward without treating everything inside as disposable.

**Link**

Hoarding Cleanup →

### Card 4 — Severe Property Cleanup

**COPY SOURCE:** Source A → Homepage → severe service router.

**Title**

Severe Property Cleanup

**Body**

Heavy buildup, trash, animal waste, strong odors, neglected rooms, heavily soiled kitchens or bathrooms, and difficult sanitation conditions can change the job completely.

These properties need a cleanup plan built around their actual condition.

**Link**

Severe Property Cleanup →

### Card 5 — Detailed Deep Cleaning

**COPY SOURCE:** Source A → Homepage → detailed deep cleaning service router.

**Title**

Detailed Deep Cleaning

**Body**

Some homes are not severely affected. They simply need more time, more hand work, and more attention than a normal cleaning appointment allows.

Aseptaclean provides detailed one-time cleaning for major home resets, move-in preparation, move-out preparation, and properties with heavy kitchen, bathroom, or whole-home buildup.

**Link**

Detailed Deep Cleaning →

Do not shorten or rewrite the cards in code.

---

## HOME 06 — DARK SPLIT

**COMPONENT:** `DarkSplit`

**COPY SOURCE:** Source A → Homepage → "Show us the condition first."

**H2**

Show us the condition first.

**Body**

Difficult property cleanup rarely fits a standard checklist.

Two homes can look similar and need completely different work.

One may need detailed cleaning.

Another may have rodent waste inside cabinets and storage areas.

Another may have heavy clutter hiding years of buildup underneath.

Another may have conditions that require a different specialist before cleanup can continue.

**Strong closing line**

We look at what is actually there before deciding what the work should involve.

**CTA**

Request an Assessment

Layout:
copy left.
full-height image right.

---

## HOME 07 — PROCESS

**COMPONENT:** `ProcessFour`

**COPY SOURCE:** Source A → Homepage → "How it starts."

**Section H2**

How it starts

### 01 — Show us the property.

Send photos and a short description of what is happening.

For many properties, that is enough for us to understand the general condition and determine the next step.

### 02 — We review the condition.

We look at the affected areas, access, contents, visible waste or buildup, and anything else that may change the work.

If the property is larger or more complicated, we may recommend an on-site assessment.

### 03 — We define the work.

You receive a clear explanation of what we recommend, what is included, what is not included, and what the work will cost.

Work does not begin based on assumptions.

You know what you are agreeing to before the project starts.

### 04 — We complete and review the agreed work.

We work against the approved scope.

If we uncover something that materially changes the project, we explain it before additional work is performed.

Do not render a fifth process column.

The source's approval concept is retained inside Step 03.

---

## HOME 08 — REGULATED AUTHORITY SECTION

**COMPONENT:** two-column dark authority section.

**COPY SOURCE:** Source C → Registration / Waste Handling / Project Approach.

### Left

**H2**

California Registered Trauma Scene Waste Management Practitioner

**Large proof**

TSW #933

**Supporting proof**

Insured

### Right

**H3**

Waste Handling

**Body**

Regulated waste transportation and disposal are coordinated through an authorized third-party waste transportation partner. Waste documentation is retained as applicable to the project.

**H3**

Project Approach

- Site assessment before production
- Defined scope of work before cleanup begins
- Project and waste documentation maintained as applicable

Do not add certification logos unless the actual logo is permitted and supplied.

---

## HOME 09 — FOUNDER

**COMPONENT:** `EditorialSplit`

**COPY SOURCE:** Source A → Homepage → "Why Aseptaclean."

**H2**

Why Aseptaclean

**H3**

Built around careful work.

**Body**

Aseptaclean is founder-operated.

Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.

That experience shaped the way Aseptaclean approaches difficult property conditions:

**Look closely. Understand what is happening. Define the work clearly. Then do the job in the right order.**

We do not treat a home like a laboratory.

And we do not assume every difficult property is a major remediation project.

We bring a careful, condition-first mindset to the work and explain what we see in plain English.

Use the real founder portrait.

---

## HOME 10 — SERVICE AREA

**COMPONENT:** map + copy split.

**COPY SOURCE:** Source C → Service Area.

**H2**

Service Area

**List**

Santa Clara County  
San Mateo County  
Alameda County  
Santa Cruz County

**Closing line**

Additional Bay Area locations reviewed by project.

Do not add city chips to this version.

---

## HOME 11 — FAQ

**COPY SOURCE:** Source A → Homepage FAQ.

### I do not know which service I need. What should I choose?

You do not have to choose one before contacting us.

Send photos and tell us what is happening.

We will help you determine which Aseptaclean service fits the property, if any.

### Can I start by sending photos?

Yes.

Photos are often the easiest place to start.

Send wider photos of the affected rooms along with closer photos of the conditions you are concerned about.

For more complicated properties, we may still recommend seeing the property in person.

### Do I need to clean or move anything before you see the property?

Usually, no.

We would rather understand the property in its actual condition.

If something needs to be moved before an assessment, we can tell you.

### What happens if you find more than expected?

If we uncover a condition that materially changes the approved work, we explain what we found before additional work is performed.

We do not want major scope changes to show up as a surprise after the fact.

### How do you determine the price?

We look at the size, condition, access, contents, affected surfaces, waste, level of buildup, and amount of work required.

For straightforward projects, photos may provide enough information to begin pricing.

Larger or more complicated properties may need an on-site assessment.

### What areas do you serve?

Aseptaclean serves the South Bay, Santa Clara County, the Peninsula, and selected surrounding Bay Area communities.

Contact us with the property location and we will confirm whether it falls within our current service area.

---

## HOME 12 — FINAL CTA

**COPY SOURCE:** Source A → Homepage closing CTA.

**H2**

You do not need to know exactly what kind of cleanup you need.

**Body**

Show us the property.

Send a few photos and tell us what is happening.

We will review the condition and help you determine what the next step should be.

**Primary**

Request an Assessment

**Secondary**

Send Photos

---

# 10. SERVICES HUB
## Route: `/services/`

## Exact DOM order

```text
Header
CompactPageHero
ServiceEditorialSplit x5
ProcessFour
AuthorityBand
FinalCTA
Footer
```

---

## SERVICES 01 — HERO

**COPY SOURCE:** Source A → Services hero.

**H1**

Specialty Property Cleanup

**H2 / lead**

When the property needs more than a normal cleaning company.

**Body**

Some properties are simply dirty.

Others are harder to deal with.

There may be heavy buildup, accumulated belongings, rodent contamination, animal waste, neglected rooms, strong odors, or years of conditions that have made the property difficult to use.

Aseptaclean helps homeowners, families, property owners, and managers understand what needs attention and get the property back under control.

**Strong line**

Start with the condition. Build the right scope. Do the work in the right order.

**CTA**

Request an Assessment

**Supporting line**

Not sure which service you need?  
Send us photos and tell us what is happening.

---

## SERVICES 02 — CRIME SCENE & TRAUMA

**COPY SOURCE:** Source B → trauma hero + trauma service list intro.

Image left / copy right.

**H2**

Crime Scene & Trauma Cleanup

**Body**

Aseptaclean provides discreet crime scene and trauma cleanup for homes, businesses, vehicles, and other accepted properties throughout the Bay Area.

Aseptaclean can assess and provide cleanup for accepted situations involving:

**List**

- Suicide Cleanup
- Homicide & Crime Scene Cleanup
- Unattended Death & Decomposition Cleanup
- Blood & Bodily Fluid Cleanup
- Workplace & Accident Cleanup
- Vehicle Biohazard Cleanup

**Link**

Crime Scene & Trauma Cleanup →

---

## SERVICES 03 — HOARDING

**COPY SOURCE:** Source A → Services → Hoarding Cleanup.

Copy left / image right.

**H2**

Hoarding Cleanup

**H3**

When belongings and clutter have made the home difficult to manage.

**Body**

Hoarding cleanup is not just about removing things.

Important belongings may be mixed into the clutter. Rooms may no longer be accessible. Years of buildup may be hidden underneath accumulated material.

We help break the property into manageable steps, establish what stays and what goes, clear affected areas, and address the cleaning conditions underneath.

**Link**

Learn About Hoarding Cleanup →

---

## SERVICES 04 — SEVERE PROPERTY

**COPY SOURCE:** Source A → Services → Severe Property Cleanup.

Image left / copy right.

**H2**

Severe Property Cleanup

**H3**

When the condition has gone beyond a normal deep clean.

**Body**

Some properties need more than additional scrubbing.

Heavy buildup, trash, animal waste, odors, neglected rooms, and sanitation concerns can turn an ordinary cleaning problem into a much larger project.

We assess what is actually happening, define the affected areas, and build the cleanup around the condition of the property.

**Link**

Learn About Severe Property Cleanup →

---

## SERVICES 05 — RODENT / ANIMAL WASTE

**COPY SOURCE:** Source A → Services → Rodent Droppings & Animal Waste Cleanup.

Copy left / image right.

**H2**

Rodent Droppings & Animal Waste Cleanup

**H3**

Pest control stops the activity. We address what was left behind.

**Body**

Rodents can leave more than visible droppings.

Urine, nesting material, contaminated debris, odors, and affected surfaces may remain after the rodents have been removed.

Aseptaclean focuses on the cleanup side of the problem.

We assess where activity occurred, determine what accessible areas need attention, and clean the affected property according to the agreed scope.

**Boundary**

Aseptaclean does not provide trapping, extermination, or rodent exclusion.

**Link**

Learn About Rodent Droppings & Animal Waste Cleanup →

---

## SERVICES 06 — DETAILED DEEP CLEANING

**COPY SOURCE:** Source A → Services → Detailed Deep Cleaning.

Image left / copy right.

**H2**

Detailed Deep Cleaning

**H3**

For homes that need more than routine cleaning.

**Body**

Not every difficult property is a severe-condition property.

Sometimes the home simply needs significantly more attention than a normal maintenance cleaning allows.

Aseptaclean provides condition-based detailed cleaning for homes with heavy buildup, neglected details, demanding kitchens and bathrooms, or properties that need a thorough reset.

We look at the condition before deciding what the cleaning should involve.

**Link**

Learn About Detailed Deep Cleaning →

---

## SERVICES 07 — PROCESS

**COPY SOURCE:** Source A → Services → "How it works."

### 01 — Show us what is happening.

Start with photos, video, or a short description of the property.

For larger or more complicated situations, we may recommend an on-site assessment.

### 02 — We assess the condition.

We look at the affected areas, access, contents, buildup, contamination concerns, and anything else that may change the work.

### 03 — We build the scope.

You receive a clear explanation of what we recommend, what is included, and what the work will cost.

### 04 — We complete the agreed work.

The project is approached according to the condition of the property rather than a one-size-fits-all checklist.

**Section closing line**

We identify what was completed and anything outside the agreed scope that may still require attention.

---

## SERVICES 08 — WHY ASEPTACLEAN

**COPY SOURCE:** Source A → Services → Why Aseptaclean.

**H2**

Why Aseptaclean

**H3**

Difficult properties need more than a checklist.

**Body**

Aseptaclean was built around work where condition, detail, and process matter.

Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.

That experience shaped the way we approach property cleanup today:

**Look closely. Understand the problem. Build the right process. Then do the work.**

We are not trying to make every home sound hazardous.

And we are not trying to turn every cleaning request into a major remediation project.

We want to understand what is actually happening and recommend the level of work that makes sense.

---

## SERVICES 09 — FINAL CTA

**COPY SOURCE:** Source A → Services closing CTA.

**H2**

Start with what you see.

**Body**

Take a few photos of the areas that concern you.

Tell us what has been happening and what you want help with.

We will review the condition and help you determine the right next step.

**Primary**

Request an Assessment

**Secondary**

Start With Photos

---

# 11. CRIME SCENE & TRAUMA CLEANUP
## Route: current verified repository route

## Exact DOM order

```text
Header
ServiceHeroSplit
TrustStrip
SituationSplit
AfterReleaseSplit
ProfessionalDifferenceSplit
ScopeGrid
ProcessFour
PhotoAuthorityBand
RegulatedWasteBand
WhyAseptacleanSplit
InsuranceCostGrid
FAQ
FinalCTA
Footer
```

No demolition, reconstruction, or contractor-license discussion.

---

## TRAUMA 01 — HERO

**COPY SOURCE:** Source B → hero.

**Eyebrow**

Crime Scene & Trauma Cleanup

**Location line**

San Francisco Bay Area

**H1**

Professional cleanup after a traumatic event.

**Body**

When law enforcement, emergency responders, or the coroner have completed their work and released the scene, blood, bodily fluids, affected belongings, and regulated waste may still remain.

Aseptaclean provides discreet crime scene and trauma cleanup for homes, businesses, vehicles, and other accepted properties throughout the Bay Area.

**Primary**

Request Assistance

**Secondary**

Call Aseptaclean

**Proof**

California Registered Trauma Scene Waste Management Practitioner  
TSW #933 · Insured

---

## TRAUMA 02 — SERVICE SITUATIONS

**COPY SOURCE:** Source B → "Crime Scene & Trauma Cleanup Services."

**H2**

Crime Scene & Trauma Cleanup Services

**Intro**

Aseptaclean can assess and provide cleanup for accepted situations involving:

### Suicide Cleanup

Cleanup of blood, bodily fluids, and affected areas following a suicide or serious self-harm incident after the scene has been released.

### Homicide & Crime Scene Cleanup

Professional cleanup after homicide, assault, or another violent event once law enforcement has finished processing the scene.

### Unattended Death & Decomposition Cleanup

Cleanup following an unattended death, including biological material, affected contents, and odor-related conditions within the approved scope.

### Blood & Bodily Fluid Cleanup

Cleanup following significant blood loss caused by an accident, injury, medical event, or other incident.

### Workplace & Accident Cleanup

Cleanup following serious injuries or accidents involving blood or bodily fluids in workplaces, commercial properties, and residential settings.

### Vehicle Biohazard Cleanup

Cleanup of accepted blood, bodily fluid, and other biological contamination inside personal or commercial vehicles.

**Closing**

Not sure which service describes the situation?

**Call us and tell us what happened. We will help determine the appropriate next step.**

---

## TRAUMA 03 — AFTER RELEASE

**COPY SOURCE:** Source B → "After the scene is released..."

**H2**

After the scene is released, the cleanup becomes the property owner's responsibility.

**Body**

Law enforcement, firefighters, paramedics, and coroners respond to the emergency and investigation.

They generally do not perform the cleanup that remains afterward.

That may leave a homeowner, family member, property manager, or business owner trying to understand what needs to happen next.

Aseptaclean steps in after the scene has been released to assess the affected area and define the cleanup.

**Strong line**

You do not need to clean or prepare the area before contacting us.

---

## TRAUMA 04 — WHY PROFESSIONAL TRAUMA CLEANUP IS DIFFERENT

**COPY SOURCE:** Source B → same heading.

**H2**

Why professional trauma cleanup is different

**Body**

Blood and bodily fluids should not be treated like an ordinary household spill.

The visible area may not show the full extent of what was affected.

Depending on the incident, biological material may reach:

- Floors
- Walls
- Furniture
- Cabinets and nearby surfaces
- Personal belongings
- Fabrics and other porous materials
- Vehicles
- Areas surrounding the primary scene

The material and condition matter.

A hard surface may require a different approach than fabric, carpeting, or personal contents.

**Strong line**

Aseptaclean assesses the affected area before defining the cleanup.

---

## TRAUMA 05 — WHAT ASEPTACLEAN DOES

**COPY SOURCE:** Source B → same heading.

**H2**

What Aseptaclean does

**Intro**

Depending on the approved scope, trauma-scene cleanup may include:

- Assessment of the affected area
- Establishment of the cleanup work area
- Blood and bodily fluid cleanup
- Cleaning and disinfection of accepted affected surfaces
- Handling of affected personal contents
- Packaging of regulated trauma-scene waste
- Coordination of regulated waste transportation and disposal
- Project and waste documentation as applicable
- Final review of the completed scope

**Closing**

Every scene is different.

The work is defined around the actual condition of the property rather than a standard package.

Do not rewrite the "cleaning and disinfection" line unless a current claims guardrail specifically requires a legal change.

If a guardrail does require a change, STOP and report the exact conflict before changing visible copy.

---

## TRAUMA 06 — PROCESS

**COPY SOURCE:** Source B → "How the process works."

### 01 — Contact Aseptaclean

Tell us where the property is, whether the scene has been released, and the general nature of the incident.

You do not need to provide graphic photographs simply to make first contact.

### 02 — We assess the scene

We review the affected areas, surfaces, contents, access, and waste conditions.

From there, we define the proposed scope of work and pricing.

### 03 — Cleanup begins after approval

Aseptaclean performs the approved cleanup and manages accepted regulated trauma-scene waste generated during the project.

### 04 — Final review and documentation

The completed areas are reviewed against the approved scope.

Project and waste records are maintained as applicable to the job.

---

## TRAUMA 07 — DISCRETION BAND

**COPY SOURCE:** Source B → "Discreet and private service."

**H2**

Discreet and private service

**Body**

A traumatic event can attract attention that the people involved never asked for.

We keep communication focused on the authorized client and the work that needs to be completed.

Aseptaclean does not publicly share identifiable project photographs or details without permission.

We do not discuss the circumstances of the scene with neighbors, media, or unrelated third parties.

And we do not require unnecessary graphic information just to determine whether we can help.

**Strong line**

The cleanup should not make a private situation more public.

---

## TRAUMA 08 — REGULATED WASTE

**COPY SOURCE:** Source B → "Regulated biohazard waste."

**H2**

Regulated biohazard waste

**Body**

Trauma-scene cleanup can generate waste that cannot simply be treated as ordinary household trash.

Aseptaclean is a **California Registered Trauma Scene Waste Management Practitioner, TSW #933.**

Regulated waste transportation and disposal are coordinated through an authorized third-party waste transportation partner.

Waste documentation is maintained as applicable to the project.

---

## TRAUMA 09 — WHY ASEPTACLEAN

**COPY SOURCE:** Source B → "Why Aseptaclean."

**H2**

Why Aseptaclean

**Body**

Aseptaclean provides biohazard remediation and specialty property cleanup throughout the San Francisco Bay Area.

Our approach is straightforward:

**Assess the scene. Define the scope. Perform the approved cleanup. Document the work.**

Aseptaclean is:

- California Registered Trauma Scene Waste Management Practitioner — TSW #933
- Insured
- Owner-operated
- Supported by an established regulated waste transportation and disposal pathway
- Focused on defined scope and documented work

Our founder's background includes a B.S. in Biochemistry, pharmaceutical manufacturing, and surgical pathology.

That background helped shape Aseptaclean's emphasis on careful, procedure-driven work.

---

## TRAUMA 10 — INSURANCE + COST

**COPY SOURCE:** Source B → insurance + cost sections.

### Does insurance cover crime scene or trauma cleanup?

It may.

Homeowners, renters, commercial, vehicle, or other insurance policies may provide coverage depending on the circumstances and the policy.

The insurance carrier determines whether a loss is covered.

Aseptaclean can provide documentation related to our work, including estimates, scopes, invoices, and available project records that may assist with the claims process.

You do not need to know whether insurance applies before contacting us.

### How much does trauma cleanup cost?

Every scene is different.

Pricing may depend on:

- Size of the affected area
- Amount of blood or bodily fluid
- Number of affected areas
- Surface and material types
- Personal contents involved
- Waste volume
- Access
- Odor conditions
- Duration of the condition
- Amount of cleanup required

Once we understand the scene, we can explain the proposed scope and cost.

---

## TRAUMA 11 — FAQ

**COPY SOURCE:** Source B → FAQ.

### When can cleanup begin?

Aseptaclean begins after the scene has been released by the appropriate authority.

We do not interfere with an active crime scene or investigation.

### Do I need to clean anything before you arrive?

No.

You do not need to clean, move belongings, or prepare the affected area before contacting us.

### Do I have to send photos?

No.

A short explanation is enough to begin.

If photographs would help us evaluate the project, we will tell you what would be useful.

### Do I have to be at the property?

Not always.

If access has been authorized and there is a clear decision-maker for the project, portions of the work may be coordinated remotely.

### What happens to affected belongings?

It depends on the item and its condition.

Some belongings may be suitable for cleaning. Others may require disposal.

Important items are not automatically discarded without considering the condition and the client's instructions.

### Do you handle the biohazard waste?

Yes.

Accepted regulated trauma-scene waste generated during Aseptaclean's cleanup is packaged and managed through the appropriate regulated waste process.

Transportation and disposal are coordinated through our third-party waste transportation partner.

---

## TRAUMA 12 — FINAL CTA

**COPY SOURCE:** Source B → closing CTA.

**H2**

You do not have to know what to do next.

**Body**

Most people who contact us have never dealt with a situation like this before.

Start with a call or private assistance request.

Tell us:

- Where the property is
- Whether the scene has been released
- What happened
- Which area appears to be affected

We will help you determine the next step.

**Primary**

Request Assistance

**Secondary**

Call Aseptaclean

---

# 12. RODENT DROPPINGS & ANIMAL WASTE CLEANUP
## Route: current verified route

## Exact DOM order

```text
Header
ServiceHeroSplit
PestControlMosaicSplit
CDCCompactCallout
AffectedAreaSplit
AssessmentSplit
ProcessFour
BoundaryBand
CostGrid
FAQ
FinalCTA
Footer
```

---

## RODENT 01 — HERO

**COPY SOURCE:** Source A → Rodent hero.

**H1**

Rodent Droppings & Animal Waste Cleanup

**H2 / lead**

The rodents may be gone. What they left behind still needs attention.

**Body**

Droppings are often only the part you can see.

Rodents can leave behind urine, nesting material, contaminated debris, odors, and waste in cabinets, storage areas, garages, living spaces, and other areas they have traveled through.

Aseptaclean cleans the conditions left behind after rodent activity.

**Strong line**

We assess where the contamination is, determine what needs attention, and build the cleanup around the actual condition of the property.

**Primary**

Request an Assessment

**Secondary line**

Or start by sending us photos of the affected areas.

---

## RODENT 02 — CDC CALLOUT

**COPY SOURCE:** Source A → rodent CDC section.

**H2**

Found rodent droppings? Don’t sweep or vacuum them first.

**Body**

It may seem like the fastest way to get rid of them.

It isn’t the recommended way to handle rodent waste.

The CDC advises against sweeping or vacuuming dry rodent urine, droppings, or nesting material before it has been properly wetted and disinfected. Disturbing dry waste can put contaminated particles into the air.

If you have already vacuumed or swept the area, don’t panic.

Just tell us what happened when you contact us.

**Strong line**

The important thing is understanding the condition before more cleanup is done.

---

## RODENT 03 — PEST CONTROL DISTINCTION

**COPY SOURCE:** Source A → "Pest control handles the rodents."

**H2**

Pest control handles the rodents.

**H3**

We handle what they left behind.

**Body**

These are two different parts of solving a rodent problem.

A pest-control company may trap or remove rodents and determine how they are entering the property.

That does not automatically mean the affected areas have been cleaned.

After rodent activity, a property may still have:

- Droppings
- Urine contamination
- Nesting material
- Contaminated debris
- Odors
- Soiled cabinets and drawers
- Affected storage areas
- Waste underneath belongings
- Contamination on accessible floors and other surfaces

**Strong line**

Stopping the infestation matters. Cleaning the affected property matters too.

Aseptaclean focuses on the cleanup side.

Use ThreeImageMosaic on the opposite side.

---

## RODENT 04 — FIRST VISIBLE AREA

**COPY SOURCE:** Source A → "Seeing a few droppings..."

**H2**

Seeing a few droppings does not always tell you the whole story.

**Body**

Rodents move.

The place where you first noticed droppings may not be the only place they have been.

You may see waste along a garage wall and later find it behind stored items.

You may find droppings in one kitchen cabinet and discover additional activity in nearby drawers or storage areas.

Urine may not be as obvious as feces.

Nesting material may be hidden.

That is why we do not build the scope around a quick glance at the most visible pile of droppings.

**Strong line**

We want to understand where the activity occurred and which accessible areas were actually affected.

---

## RODENT 05 — ASSESSMENT

**COPY SOURCE:** Source A → "What we look at during an assessment."

**H2**

What we look at during an assessment

### Where droppings are present

One isolated area is very different from evidence throughout multiple rooms.

### How widespread the activity appears to be

We look beyond the first visible spot to understand whether other accessible areas show evidence of rodent activity.

### What surfaces are affected

A hard floor, cabinet interior, upholstered item, stored cardboard, carpet, and unfinished material cannot automatically be treated the same way.

### Whether contents are involved

Boxes, stored belongings, shelving, furniture, food-storage areas, and other contents can make the cleanup more involved.

### Whether urine, nesting material, or odors are present

Droppings may be only one part of the condition.

**Strong line**

You should know what problem we are solving before you pay us to solve it.

---

## RODENT 06 — PROCESS

**COPY SOURCE:** Source A → "How Aseptaclean approaches rodent cleanup."

### 01 — Assess the affected area

We begin by understanding where rodent activity has occurred and how much of the property appears to be affected.

For smaller situations, photos may be enough to determine the next step.

Larger or more complicated properties may need an on-site assessment.

### 02 — Define the cleanup area

We establish what areas and surfaces are included before work begins.

This matters because visible droppings in one location do not automatically mean every room needs the same level of work.

### 03 — Control the cleanup

Rodent waste should not simply be dry-swept around a property.

The cleanup method is selected based on the condition, affected surfaces, and extent of contamination.

Droppings, nesting material, and other affected material included in the scope are addressed before detailed surface cleaning is completed.

Once visible waste has been addressed, the affected surfaces included in the scope are cleaned and disinfected using products and methods appropriate for the material and condition.

### 04 — Review the property

We review what was completed and identify anything we found that may require attention outside the original scope.

**Strong closing lines**

The goal is not to make the droppings disappear.

The goal is to properly address the affected area.

---

## RODENT 07 — BOUNDARY BAND

**COPY SOURCE:** Source A → "What Aseptaclean does—and what we don’t."

**H2**

What Aseptaclean does—and what we don’t

**H3**

We are not a pest-control company.

**Body**

We do not provide trapping, extermination, or rodent exclusion.

If rodents are still active, pest-control work may need to happen before or alongside the cleanup plan.

**H3**

We do not hide work outside our scope.

**Body**

If we identify concerns involving building repairs, inaccessible structural areas, HVAC systems, or another specialty, we will explain that rather than pretending cleanup alone solves the problem.

**Strong line**

We want you to know exactly what Aseptaclean is responsible for.

---

## RODENT 08 — COST

**COPY SOURCE:** Source A → rodent pricing FAQ.

**H2**

Can you tell me the price from photos?

**Body**

Often, photos can help us determine whether the job appears small and straightforward or whether an on-site assessment is needed.

For more extensive contamination, pricing may depend on:

- Number of affected areas
- Amount of droppings and waste
- Length and extent of rodent activity
- Contents
- Surface types
- Access
- Animal waste
- Odors
- Amount of detailed cleaning required
- Conditions found once affected areas become accessible

**Strong line**

We would rather understand the job before giving you a price than give you a cheap number that changes once work starts.

---

## RODENT 09 — FAQ

**COPY SOURCE:** Source A → rodent FAQs.

### The pest-control company already cleaned some of it. Do I still need you?

Maybe. Maybe not.

We are not going to tell you that every sighting of a rodent dropping requires a major remediation project.

If the affected area has already been properly cleaned and there is nothing meaningful left for us to address, we will tell you.

If droppings, urine, nesting material, odors, or affected areas remain, we can determine what additional cleanup makes sense.

**The assessment should answer that question—not a sales script.**

### I only found a few droppings. Is this overkill?

Not necessarily.

A small, isolated amount is different from a widespread infestation.

Send us photos.

If it appears straightforward, we can tell you.

If the pictures suggest a larger problem, we can explain why we recommend looking further.

You should not have to buy a large cleanup just because you called a specialty company.

### What if there are droppings inside cabinets?

Tell us.

Cabinets, drawers, pantries, and food-storage areas deserve particular attention because rodents can move through multiple connected spaces.

Photos of the affected cabinets and surrounding areas are helpful when we are determining the scope.

### What if the rodents are still there?

The active rodent problem needs to be addressed.

Aseptaclean does not provide pest control.

If rodents continue entering the property after cleanup, they can contaminate the area again.

That is why cleanup and pest control need to be treated as two connected parts of the problem.

---

## RODENT 10 — FINAL CTA

**COPY SOURCE:** Source A → rodent closing CTA.

**H2**

Start with photos.

**Body**

If you found rodent droppings and do not know how serious the problem is, you do not need to figure it out yourself.

Take a few clear photos of:

- Where you found the droppings
- The surrounding area
- Any nearby cabinets, storage, or contents
- Any other areas where you have seen signs of rodents

Then tell us what you know.

**Strong line**

We’ll help you determine what needs attention and what the next step should be.

**Primary**

Request an Assessment

**Secondary**

Start With Photos

---

# 13. HOARDING CLEANUP
## Route: current verified route

## Exact DOM order

```text
Header
ServiceHeroSplit
RecognitionSection
BelongingsSplit
MoreThanClearingSplit
ProcessFour
SanitationPhotoBand
WhyAseptacleanSplit
CostGrid
FAQ
FinalCTA
Footer
```

---

## HOARDING 01 — HERO

**COPY SOURCE:** Source A → Hoarding hero.

**H1**

Hoarding Cleanup

**H2 / lead**

When a home has become overwhelming, we help you get it back under control.

**Body**

You do not need to clean before calling us.

You do not need to organize anything first.

And you do not need to know exactly what kind of cleanup you need.

Show us the home exactly as it is.

Aseptaclean will assess the condition, help define what stays and what needs to go, and build a clear plan for working through the property.

**CTA**

Request a Private Assessment

---

## HOARDING 02 — RECOGNITION

**COPY SOURCE:** Source A → "Start where things are now."

**H2**

Start where things are now.

**Body**

Homes can become difficult to manage for all kinds of reasons.

Sometimes belongings slowly accumulate over the years.

Sometimes an illness, loss, family situation, animal problem, or major life change causes things to get away from someone.

And sometimes a family member walks into a property and realizes the situation is much bigger than they expected.

Whatever brought you here, you do not have to solve it before contacting us.

**Strong line**

Our job is to figure out what needs to happen next.

---

## HOARDING 03 — IMPORTANT BELONGINGS

**COPY SOURCE:** Source A → "We understand that important things..."

**H2**

We understand that important things can be mixed into the clutter.

**Items**

Family photos.  
Documents.  
Jewelry.  
Keys.  
Medications.  
Financial records.  
Keepsakes.  
Items that may look unimportant to someone else but matter deeply to the family.

**Body**

That is why we do not walk into a property assuming everything needs to disappear.

Before removal begins, there should be a clear understanding of what can go, what stays, and what needs a closer look.

---

## HOARDING 04 — MORE THAN CLEARING

**COPY SOURCE:** Source A → "More than clearing things out."

**H2**

More than clearing things out

**Body**

Removing clutter may only be one part of the job.

Once rooms begin to open up, we may find years of buildup underneath, including:

- Heavy soil and neglected surfaces
- Trash or spoiled material
- Strong odors
- Rodent droppings or nesting material
- Animal urine or feces
- Pest-affected areas
- Heavily soiled kitchens and bathrooms
- Rooms that have not been accessible for a long time

That is why we do not approach every property as a simple cleanout.

**Strong line**

We look at the condition of the property first, then build the cleanup around what is actually there.

---

## HOARDING 05 — PROCESS

**COPY SOURCE:** Source A → "A clear plan before the work begins."

### 01 — Assess the property

We look at the condition of the rooms, the amount of material, access, sanitation concerns, odors, and anything else that may affect the work.

### 02 — Understand what matters

Not everything in a cluttered home is trash.

We identify what should stay, what can be removed, and what needs to be reviewed before anything happens.

### 03 — Work through the property in order

The home is cleared and cleaned systematically so we can reach the areas that actually need attention.

### 04 — Address what was underneath

Once areas become accessible, we can properly clean the surfaces and conditions that were hidden by clutter.

**Section close**

At the end, we review the agreed scope and make sure nothing important was missed.

---

## HOARDING 06 — SANITATION BAND

**COPY SOURCE:** Source A → "Sometimes the cleanup goes beyond clutter."

**H2**

Sometimes the cleanup goes beyond clutter.

**Body**

A home may also have sanitation problems underneath what you can see.

Rodent activity, animal waste, spoiled material, sharps, heavy buildup, and other contamination can change how an area should be handled.

When we find those conditions, we adjust the cleanup to the problem in front of us.

The goal is not simply to make the house look better.

**Strong line**

The goal is to deal with what is actually making the property difficult to use.

---

## HOARDING 07 — WHY ASEPTACLEAN

**COPY SOURCE:** Source A → Hoarding → "Why Aseptaclean approaches these properties differently."

**H2**

Why Aseptaclean approaches these properties differently

**Body**

Aseptaclean was built around a simple idea:

**Look carefully first. Then decide what the property actually needs.**

Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology—environments where details, contamination, and following the right process matter.

That experience shaped how we work today.

We do not rush into a difficult property and start moving things just to make fast visual progress.

We assess the condition.

We establish the plan.

Then we work through the property in the right order.

---

## HOARDING 08 — COST

**COPY SOURCE:** Source A → "What does hoarding cleanup cost?"

**H2**

What does hoarding cleanup cost?

**Body**

There is no honest flat price for this type of work.

A home with moderate clutter is very different from a property with years of accumulation, extensive sorting, animal contamination, or heavy cleaning underneath.

The cost depends on things such as:

- How much material is in the property
- How much sorting is required
- Number of affected rooms
- Access
- Property size
- Sanitation conditions
- Disposal needs
- Odors
- Amount of detailed cleaning required

After we understand the property, we can explain what we recommend, what is included, and what the work will cost.

For some properties, photos or video may be enough to get started.

For larger or more complicated situations, we may recommend an on-site assessment.

---

## HOARDING 09 — FAQ

**COPY SOURCE:** Source A → Hoarding question sections.

### Are you going to judge the condition of the house?

No.

If you have been putting off the call because you are embarrassed about the property, you are not the only person who has felt that way.

You do not need to make the home look better for us.

You do not need an explanation ready.

You can simply show us what is going on.

We'll start there.

### Are you going to throw everything away?

No.

We do not assume everything in a cluttered home is disposable.

What stays, what goes, and what needs to be reviewed should be established before removal begins.

If there are particular belongings, rooms, documents, or valuables that need special attention, tell us.

We will build that into the plan.

### Is the situation too bad?

You can still call us.

Some properties need straightforward clearing and detailed cleaning.

Others involve years of accumulation, heavy sanitation issues, animal or rodent contamination, strong odors, or rooms that have not been usable for a long time.

The first step is not deciding whether your home is “bad enough.”

The first step is letting us see what is actually happening.

---

## HOARDING 10 — FINAL CTA

**COPY SOURCE:** Source A → closing CTA.

**H2**

You do not have to solve the whole property today.

**Body**

You only need to take the first step.

Send us a few photos, tell us what is going on, or request a private assessment.

We'll help you understand what needs to happen from there.

**CTA**

Request a Private Assessment

---

# 14. SEVERE PROPERTY CLEANUP
## Route: current verified route

## Exact DOM order

```text
Header
ServiceHeroSplit
RecognitionSection
DarkReframeBand
ConditionSplit
ApproachSplit
ProcessFour
ScopeChangeSection
WhyAseptacleanSplit
CostGrid
FAQ
FinalCTA
Footer
```

---

## SEVERE 01 — HERO

**COPY SOURCE:** Source A → Severe hero.

**H1**

Severe Property Cleanup

**H2 / lead**

When a property has gone beyond normal cleaning, we help get it back under control.

**Body**

Some homes need more than a deep clean.

There may be heavy buildup, trash, animal waste, rodent contamination, strong odors, neglected rooms, or areas that have not been usable for a long time.

You do not need to clean before calling.

You do not need to know what service to ask for.

**Strong line**

Show us the property as it is. We’ll help you understand what needs to happen next.

**CTA**

Request a Private Assessment

---

## SEVERE 02 — RECOGNITION

**COPY SOURCE:** Source A → "This is not always a cleaning problem." + selected exact source sentences from "What looks like one problem..."

**H2**

This is not always a cleaning problem.

**Body**

A property can reach a point where simply sending in a cleaning crew is not the right answer.

We may be dealing with:

- Heavy dirt and buildup
- Trash or spoiled material
- Animal urine or feces
- Rodent droppings or nesting material
- Strong or persistent odors
- Pest-affected areas
- Heavily soiled kitchens or bathrooms
- Long-neglected rooms
- Areas blocked by accumulated belongings or debris
- Properties left in poor condition after an occupant

These situations are sometimes called gross filth cleanup or extreme cleaning.

We look at them differently.

---

## SEVERE 03 — DARK REFRAME

**COPY SOURCE:** Source A → same severe section.

**H2**

The question is not just, “How dirty is it?”

**Body**

The better question is:

**“What is causing the property to be difficult to use, and what has to happen to correct it?”**

---

## SEVERE 04 — CONDITION SPLIT

**COPY SOURCE:** Source A → "What looks like one problem may actually be several."

**H2**

What looks like one problem may actually be several.

**Body**

A room may look dirty when the larger issue is underneath stored material.

An odor may have a specific source.

Rodent contamination may extend into cabinets, shelving, or storage areas.

Animal waste may have affected the surface underneath it.

Years of buildup may be hiding conditions that cannot be evaluated until the area is opened up.

That is why we do not start with a generic cleaning checklist.

**Strong line**

We start with the property in front of us.

---

## SEVERE 05 — APPROACH

**COPY SOURCE:** Source A → "Our job is to make the situation manageable."

**H2**

Our job is to make the situation manageable.

**Body**

Large cleanups can feel impossible when everything is mixed together.

So we break the project down.

Do not add a separate paragraph beyond the four process steps below.

---

## SEVERE 06 — PROCESS

**COPY SOURCE:** Source A → severe four-part process.

### 01 — First, we understand the property.

What happened?

Which areas are affected?

What concerns are already known?

What can and cannot be accessed?

### 02 — Then we define the work.

We identify what needs attention, what can be cleaned, what may need to be removed, and what decisions need to be made before work begins.

### 03 — Then we work through the property in the right order.

Not randomly.

Not just where the mess is easiest to see.

We work through the agreed scope so the property becomes easier to manage as the project moves forward.

### 04 — At the end, we review what was completed.

You should know what was addressed, what was outside the scope, and whether anything still needs attention.

---

## SEVERE 07 — SCOPE CHANGES

**COPY SOURCE:** Source A → "You should know what you are agreeing to."

**H2**

You should know what you are agreeing to.

**Body**

Severe property cleanups can change once hidden areas become accessible.

A cabinet may be opened.

Stored material may be moved.

A floor that has not been visible in years may be uncovered.

That can reveal something that was impossible to see at the beginning.

If we find a condition that materially changes the agreed scope, we stop and explain what we found before additional work is performed.

**Strong line**

No major surprise work added after the fact.

---

## SEVERE 08 — WHY ASEPTACLEAN

**COPY SOURCE:** Source A → severe Why Aseptaclean.

**H2**

Why Aseptaclean

**Body**

Aseptaclean was built around work where details matter.

Our founder’s background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.

That experience shaped a simple way of working:

**Look closely. Understand the condition. Then decide what the property actually needs.**

We do not assume every difficult property needs the same solution.

We do not start with a one-size-fits-all checklist.

And we do not rush through a property just to create a dramatic before-and-after.

We want the work to make sense for the condition that is actually there.

---

## SEVERE 09 — COST

**COPY SOURCE:** Source A → severe cost.

**H2**

What does severe property cleanup cost?

**Body**

There is no useful flat price for this type of work.

Two homes of the same size can require completely different amounts of work.

Price may depend on:

- How much of the property is affected
- Amount of material or debris
- Level of buildup
- Animal or rodent contamination
- Access
- Sorting or clearing required
- Disposal needs
- Odor conditions
- Number of affected rooms
- Level of detailed cleaning required
- Conditions that become visible once areas are opened up

Once we understand the property, we can explain what we recommend, what is included, and what the work will cost.

**Strong line**

We would rather give you a realistic scope than a low number that changes once the job begins.

---

## SEVERE 10 — FAQ

**COPY SOURCE:** Source A → severe question sections.

### Is this too bad for you?

You do not need to decide that before calling.

If the property feels beyond what a normal house cleaner should be handling, send us photos or tell us what is happening.

We will help you figure out whether this is the right type of cleanup.

### Do I need to clean first?

No.

Please show us the property as it is.

You do not need to pick things up, move things around, or make the home presentable before we see it.

### Will you judge how the property got this way?

No.

There are a lot of reasons a home can become difficult to manage.

Illness.

Loss.

Animals.

A difficult tenant.

A family situation.

Years of things slowly getting away from someone.

We are there to deal with the property, not criticize the person behind it.

### Can I just send photos?

Yes.

Photos or video are often the easiest way to start.

They may give us enough information to understand the general condition and determine whether an on-site assessment is needed.

For more complicated properties, we may need to see the space in person before giving you a reliable scope.

---

## SEVERE 11 — FINAL CTA

**COPY SOURCE:** Source A → severe closing CTA.

**H2**

You do not need to know what to call the problem.

**Body**

Maybe it is severe cleaning.

Maybe it is gross filth cleanup.

Maybe it involves rodents or animal waste.

Maybe the property has simply reached a point where you do not know who to call.

That is fine.

**Strong line**

Send us a few photos and tell us what is happening.

We will help you figure out the next step.

**CTA**

Request a Private Assessment

---

# 15. DETAILED DEEP CLEANING
## Route: current verified route

## Exact DOM order

```text
Header
ServiceHeroSplit
RecognitionSection
KitchenSplit
BathroomSplit
MaterialsSection
ProcessFour
MoveInMoveOutGrid
WhyAseptacleanSplit
CostGrid
FAQ
FinalCTA
Footer
```

---

## DEEP 01 — HERO

**COPY SOURCE:** Source A → Detailed Deep Cleaning hero.

**H1**

Detailed Deep Cleaning

**H2 / lead**

When a normal cleaning is not enough.

**Body**

Some homes do not need routine cleaning.

They need time, detail, and a much closer look.

Maybe the property has been neglected for a while. Maybe buildup has accumulated in the kitchen or bathrooms. Maybe you are moving into a home and want it properly reset before bringing your belongings in.

Aseptaclean provides detailed deep cleaning for homes that need more than a standard cleaning checklist.

**Strong line**

We look at the condition of the home first, identify what needs the most attention, and build the cleaning around the property in front of us.

**Primary**

Request an Assessment

**Secondary line**

Or send us photos of the areas you want cleaned.

---

## DEEP 02 — RECOGNITION

**COPY SOURCE:** Source A → "A deep clean should not mean..."

**H2**

A deep clean should not mean the same thing in every home.

**Body**

Two homes can have the same number of bedrooms and require completely different amounts of work.

One may need detailed dust removal and bathrooms.

Another may have years of grease buildup in the kitchen.

Another may have mineral deposits, neglected edges, dirty cabinets, heavy soil around fixtures, and rooms that have not been properly cleaned in a long time.

That is why we do not believe a serious deep clean should start with:

**“How many bedrooms and bathrooms?”**

That matters.

But the condition matters more.

---

## DEEP 03 — KITCHEN

**COPY SOURCE:** Source A → "What does detailed actually mean?" → Kitchens.

**H2**

Kitchens

**List**

- Counters and backsplashes
- Cabinet exteriors
- Appliance exteriors
- Accessible areas around appliances
- Sink and faucet detailing
- Grease and food residue
- Fixtures
- Doors and frames
- Baseboards and edges
- Floors
- Detailed buildup around commonly used areas

**Section note**

The exact scope depends on the property.

---

## DEEP 04 — BATHROOM + DETAIL WORK

**COPY SOURCE:** Source A → Bathrooms + "We look for the areas that make the biggest difference."

**H2**

Bathrooms

**List**

- Showers and tubs
- Tile and grout surfaces
- Sinks and counters
- Fixtures
- Toilet exterior and surrounding areas
- Mirrors
- Cabinet exteriors
- Doors and frames
- Baseboards and edges
- Floors
- Buildup around high-use areas

**H3**

We look for the areas that make the biggest difference.

**Body**

A home can be technically “clean” and still not feel clean.

That often happens because the obvious surfaces were handled while the details were ignored.

Grease remains around the edges of a kitchen.

Dust is sitting on trim and ledges.

Bathroom buildup is still visible around fixtures.

Doors and frames have years of hand marks.

Baseboards were never addressed.

Corners were rushed.

**Strong line**

Aseptaclean focuses on the condition of the space, not just the center of the floor.

---

## DEEP 05 — MATERIALS MATTER

**COPY SOURCE:** Source A → "Not every mark should be attacked the same way."

**H2**

Not every mark should be attacked the same way.

**Body**

Different materials react differently to cleaning.

Natural stone is not the same as porcelain.

Painted cabinetry is not the same as unfinished wood.

Metal fixtures may have finishes that can be damaged by aggressive products.

Some mineral buildup can be improved.

Some staining may be permanent.

Some surfaces may already be worn, etched, scratched, or damaged.

That is why more chemical and more scrubbing are not always better.

**Strong line**

We look at the surface before deciding how aggressively it should be cleaned.

If something appears to be damage rather than removable soil, we will tell you.

---

## DEEP 06 — PROCESS

**COPY SOURCE:** Source A → "How we approach a detailed deep clean."

### 01 — Understand your priorities

Tell us what is bothering you most.

Maybe it is the kitchen.

Maybe it is the bathrooms.

Maybe the entire property needs attention before move-in.

That gives us a starting point.

### 02 — Look at the condition

Photos may be enough for straightforward properties.

Larger or more detailed projects may require a walkthrough so we can see the condition, materials, access, and level of buildup.

### 03 — Define the scope

Before work begins, we identify what is included and what requires additional time or approval.

### 04 — Clean in a logical order

We work through the agreed areas systematically so details are not lost in the rush to make the home look finished.

At completion, we review the agreed scope and identify anything we could not reasonably correct through cleaning.

---

## DEEP 07 — MOVE-IN / MOVE-OUT

**COPY SOURCE:** Source A → Move-in Cleaning + Move-out Cleaning.

Two columns.

### Move-in cleaning

**H3**

Start with the home before your belongings go in.

A vacant home is one of the best opportunities to clean areas that may become difficult to reach once furniture and belongings arrive.

A detailed move-in clean can focus on the areas you will interact with every day:

Kitchens.

Bathrooms.

Cabinetry.

Fixtures.

Doors.

Trim.

Floors.

High-touch surfaces.

And the details that are easier to address while the home is empty.

**Strong line**

Walk into the home feeling like you are starting with your space—not someone else's residue.

### Move-out cleaning

**H3**

Leave the property properly reset.

A move-out can expose years of buildup that furniture and belongings were hiding.

We can assess the empty property and build the cleaning around what actually needs attention.

This may be useful for:

- Homeowners preparing to sell
- Tenants with demanding move-out requirements
- Property managers
- Families preparing a home for the next occupant
- Properties needing a deeper reset after long-term occupancy

If the condition goes beyond detailed cleaning into heavy waste, animal contamination, rodent activity, or severe neglect, we will tell you.

A different Aseptaclean service may be the better fit.

---

## DEEP 08 — WHY ASEPTACLEAN

**COPY SOURCE:** Source A → Detailed Deep Cleaning → Why Aseptaclean.

**H2**

Why Aseptaclean

**Body**

Aseptaclean was built around a higher level of attention to condition and process.

Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.

That experience reinforced something simple:

**Details matter, surfaces matter, and the way work is performed matters.**

We bring that mindset into residential cleaning without pretending your home is a laboratory.

It simply means we do not believe in rushing through the same checklist regardless of what the property actually needs.

We look first.

Then we build the work around the condition.

---

## DEEP 09 — COST

**COPY SOURCE:** Source A → Detailed Deep Cleaning cost.

**H2**

What does detailed deep cleaning cost?

**Body**

There is no useful flat price based only on square footage.

Pricing can depend on:

- Property size
- Current condition
- Number of rooms
- Kitchen and bathroom condition
- Amount of buildup
- Level of detail requested
- Contents and access
- Inside cabinets or drawers
- Interior windows
- Specialty surfaces
- Amount of hand work required
- Move-in or move-out condition

Once we understand the property and your priorities, we can explain what is included and what the work will cost.

**Strong line**

We would rather scope the job correctly than give you a low number and rush the work to make the price work.

---

## DEEP 10 — FAQ

**COPY SOURCE:** Source A → detailed cleaning question sections.

### Why not hire a normal house cleaner?

Sometimes you should.

If your home needs regular maintenance cleaning, Aseptaclean may not be the best fit.

Our detailed deep cleaning service is intended for homes that need more time, more attention, or more corrective work than a routine cleaning visit normally allows.

If what you need is straightforward, we will tell you.

**We are not trying to turn every cleaning request into a large project.**

### Do I need to know exactly what I want cleaned?

No.

You can tell us what bothers you.

You can send photos.

You can walk us through the home.

We can help turn that into a clear scope.

### Do you clean everything in the house?

Only what is included in the agreed scope.

That is intentional.

“Deep clean the whole house” can mean very different things to different people.

We would rather define the work clearly than leave you guessing about what was supposed to be included.

### Can you remove every stain or mark?

No cleaning company can honestly promise that.

Some conditions are removable soil.

Others are staining, wear, etching, discoloration, damaged finishes, or material deterioration.

We will make a reasonable effort within the agreed scope, but we will not damage a surface chasing a result that cleaning cannot safely produce.

---

## DEEP 11 — FINAL CTA

**COPY SOURCE:** Source A → detailed closing CTA.

**H2**

Not sure whether you need detailed deep cleaning?

**Body**

Send us photos.

Show us the kitchen.

Show us the bathrooms.

Show us the areas that bother you.

Tell us what you want the home to feel like when the work is finished.

**Strong line**

We will help you determine the right level of cleaning from there.

**Primary**

Request an Assessment

**Secondary**

Start With Photos

---

# 16. ABOUT
## Route: `/about/`

## Copy authority note

Sources A and B do not contain a dedicated About page.

This page therefore uses Source D, the current Aseptaclean About copy already present in the repository, plus Source C only for current TSW/company-fact additions.

Do not use ACWEB003's About copy.

## Exact DOM order

```text
Header
CompactPhotoHero
FounderSplit
OperatingPrinciples
CompanyProofBand
FinalCTA
Footer
```

---

## ABOUT 01 — HERO

**COPY SOURCE:** Source D → `/about/`.

**Eyebrow**

About Aseptaclean

**H1**

A controlled-process mindset for properties that need careful decisions.

**Lead**

Aseptaclean is an owner-operated cleaning and property clearing business serving the South Bay & Peninsula.

Do not rewrite the H1.

---

## ABOUT 02 — FOUNDER

**COPY SOURCE:** Source D → `/about/`.

**Eyebrow**

Founder & Principal Operator

**H2**

Matthew Ruiz stays close to the scope.

**Body**

Matthew is directly involved in scope review, project planning and operating oversight. His background includes a B.S. in Biochemistry from UC Riverside, pharmaceutical manufacturing, and histology and surgical pathology.

**Founder quote**

“Difficult properties are not handled well through vague promises. Before work begins, I want you to know what is included, what is excluded, what happens when something unexpected is found, and what you will receive when the job is closed. That is the standard I built Aseptaclean around.”

Use the real founder portrait.

---

## ABOUT 03 — VERIFIED BACKGROUND

**COPY SOURCE:** Source D → `/about/`, with Source C current TSW facts appended as a separate factual column.

**H2**

Verified background

**Body**

This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.

**Proof list**

- Insured. Certificate of Insurance available upon request.
- California Registered Trauma Scene Waste Management Practitioner
- TSW #933

Do not reuse the stale sentence that says Aseptaclean lacks remediation/regulatory authority as a business-wide statement now that TSW registration is current; keep only the founder-background disclaimer exactly as shown above.

---

## ABOUT 04 — OPERATING PRINCIPLES

**COPY SOURCE:** Source D → `/about/`.

**Eyebrow**

Operating principles

**H2**

How the work is decided before it starts

### Clear authority

We identify who can approve contents decisions and scope changes.

### Written boundaries

Inclusions, exclusions and assumptions are written before scheduling.

### Direct accountability

You speak with the operator reviewing the property—not a distant call center.

Layout:
three horizontal principle rows or three columns at desktop.
Do not invent a fourth principle.

---

## ABOUT 05 — FINAL CTA

**COPY SOURCE:** Source D → `/about/` assessment block.

**Eyebrow**

Request an assessment

**H2**

Tell us about the property.

**Body**

The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.

**CTA**

Request an assessment

Do not render the full form on About.
Link to `/request-assessment/`.

---

# 17. CONTACT
## Route: `/contact/`

## Copy authority note

Use Source D for dedicated Contact copy.

Bind phone/email/hours/service facts to the repository's current verified data source rather than duplicating stale literal values where the project already centralizes those values.

## Exact DOM order

```text
Header
CompactHero
ContactDetailsGuidanceSplit
AssessmentBand
ServiceArea
Footer
```

---

## CONTACT 01 — HERO

**COPY SOURCE:** Source D → `/contact/`.

**Eyebrow**

Contact

**H1**

Start with the property details.

**Body**

Share the city, approximate size, current condition, access and deadline. Clear photos help us decide whether a walkthrough is needed.

---

## CONTACT 02 — CONTACT DETAILS

**COPY SOURCE:** Source D → `/contact/`.

**Hidden/semantic H2**

Contact details

**Phone helper**

For immediate questions about fit and timing.

**Photo helper**

Stand in the doorway and get the whole room, then step in close on the worst spots.

**Email helper**

Assessment requests are reviewed within one business day.

Use the current repository values for:
- phone
- email
- current published hours

Do not invent a street address.

---

## CONTACT 03 — SERVICE AREA

**COPY SOURCE:** Source D for currently published city language OR Source C for county-level public service area if the site has already moved to the county model.

Preferred current public display:

- Santa Clara County
- San Mateo County
- Alameda County
- Santa Cruz County

**Source C closing line**

Additional Bay Area locations reviewed by project.

Do not show 14 city chips unless those city routes are current and intentionally part of the live architecture.

---

## CONTACT 04 — ASSESSMENT BAND

**COPY SOURCE:** Source D → `/contact/`.

**Eyebrow**

Request an assessment

**H2**

Tell us about the property.

**Body**

The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.

**Subheading**

What happens next

**Body**

Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.

**CTA**

Request an assessment

If the "within one business day" commitment is no longer operationally approved in the repository, STOP and report the stale copy instead of silently rewriting it.

---

# 18. REQUEST AN ASSESSMENT
## Route: `/request-assessment/`

## Copy authority note

Use Source A for the intro/reassurance language.

The old Source A questionnaire is intentionally NOT rendered because the owner has since approved a shorter first-contact form.

Form field labels below are owner-approved interface copy and are part of this locked spec.

## Exact DOM order

```text
Header
CompactHero
FormReassuranceSplit
PrivacyNote
Footer
```

---

## ASSESSMENT 01 — HERO

**COPY SOURCE:** Source A → Request an Assessment hero.

**H1**

Request an Assessment

**H2 / lead**

Show us what is happening.

**Body**

You do not need to know exactly what service you need.

You do not need to clean before contacting us.

And you do not need to write a long explanation.

Tell us what is going on, send a few photos if you can, and Aseptaclean will review the situation and help determine the next step.

---

## ASSESSMENT 02 — SHORT FORM

Use exactly these fields and no others:

### Full Name *

### Phone Number *

### Email
Optional.

### Property ZIP Code *

### What are you dealing with? *

Options:

- Crime Scene & Trauma
- Rodent droppings or animal waste
- Hoarding or heavy clutter
- Severe property condition
- Detailed deep cleaning
- Not sure

### Tell us what's going on *

**Helper copy source:** Source A.

You do not need to make this perfect.

A few sentences are enough.

### Have photos?
Optional file upload.

**Photo helper copy source:** Source A.

Photos help us understand the property faster.

You do not need to move anything around before taking pictures.

### SMS consent

Preserve the repository's existing legally approved SMS/Twilio consent copy exactly.

Do not replace it with copy from this document.

### Submit

Submit Assessment

---

## ASSESSMENT 03 — WHAT HAPPENS NEXT

**COPY SOURCE:** Source A → Request an Assessment → "What happens after you contact us?"

**H2**

What happens after you contact us?

### 1. You tell us about the property.

We ask a few questions about the condition, location, affected areas, and what you need help with.

### 2. You send photos or video when possible.

Photos often help us understand whether the situation appears straightforward or whether an on-site assessment would be more appropriate.

### 3. We review the condition.

We determine what type of cleanup appears to fit the property and whether we need additional information.

### 4. We explain the next step.

That may be:

- A preliminary scope based on the information provided
- A request for additional photos
- A phone call
- An on-site assessment
- A recommendation for another type of professional if the condition falls outside our scope

**Strong line**

You do not have to diagnose the property yourself.

---

## ASSESSMENT 04 — SUBMISSION / PRIVACY NOTE

**COPY SOURCE:** Source A → "Before you submit."

By sending this assessment request, you are asking Aseptaclean to review the information you provide and contact you about the property.

Submitting the form does not create a service agreement or guarantee that the property falls within our scope.

If additional information or an on-site assessment is needed before pricing, we will tell you.

---

## ASSESSMENT 05 — SUCCESS STATE

**COPY SOURCE:** Source A → final "What happens next?"

**Heading**

What happens next?

**Body**

Once we receive your request, we review the information and photos you provided.

If we can determine the next step from what you sent, we will explain it.

If we need to see more, we may ask for additional photos, speak with you by phone, or recommend an on-site assessment.

**Strong line**

Our goal is to understand the property before telling you what it needs.

# 19. FOOTER COPY

Use everywhere.

## Brand

**Aseptaclean**

Aseptaclean provides specialized cleanup for properties affected by biological contamination, trauma, decomposition, severe conditions, rodent contamination, and animal waste.

408-785-7588

## Services

Crime Scene & Trauma Cleanup  
Rodent Droppings & Animal Waste Cleanup  
Hoarding Cleanup  
Severe Property Cleanup  
Detailed Deep Cleaning

## Company

About  
Contact  
Request an Assessment

## Service Area

Santa Clara County  
San Mateo County  
Alameda County  
Santa Cruz County

Additional Bay Area locations reviewed by project.

Bottom:

© 2026 Aseptaclean, LLC  
Privacy · Terms

Use current verified legal links.

---

# 20. RESPONSIVE CSS

```css
@media (max-width: 1024px) {
  .ac-shell {
    width: calc(100% - 48px);
  }

  .ac-homehero__grid {
    grid-template-columns: 1fr;
    gap: 34px;
    padding-block: 54px;
  }

  .ac-homehero {
    min-height: auto;
  }

  .ac-servicehero__grid,
  .ac-split,
  .ac-two-col,
  .ac-darksplit,
  .ac-founder-grid,
  .ac-area-grid {
    grid-template-columns: 1fr;
  }

  .ac-process__grid {
    grid-template-columns: 1fr 1fr;
  }

  .ac-process__step:nth-child(2)::after {
    display: none;
  }

  .ac-footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .ac-nav {
    display: none;
  }
}

@media (max-width: 820px) {
  .ac-servicehero__copy {
    padding: 52px 0 34px;
  }

  .ac-servicehero__media {
    min-height: 300px;
  }

  .ac-split__media,
  .ac-darksplit__media {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .ac-shell {
    width: calc(100% - 40px);
  }

  :root {
    --ac-header-h: 68px;
  }

  .ac-section {
    padding-block: 52px;
  }

  .ac-homehero__grid {
    padding-block: 46px;
  }

  .ac-homehero__copy h1 {
    font-size: clamp(40px, 12vw, 52px);
  }

  .ac-heroform__grid {
    grid-template-columns: 1fr;
  }

  .ac-heroform__grid .ac-full {
    grid-column: auto;
  }

  .ac-process__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .ac-process__step::after {
    display: none !important;
  }

  .ac-truststrip__grid {
    grid-template-columns: 1fr;
  }

  .ac-truststrip__item {
    padding: 14px 0;
  }

  .ac-truststrip__item:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--ac-border);
  }

  .ac-footer__grid {
    grid-template-columns: 1fr;
  }

  .ac-btn {
    min-height: 48px;
  }
}
```

---

# 21. ACCESSIBILITY REQUIREMENTS

- One H1 per page
- H2 for main sections
- H3 for subsections / FAQ questions where semantically appropriate
- visible form labels preferred
- every input has programmatic label
- 44px minimum touch targets
- visible keyboard focus
- Services dropdown keyboard accessible
- Escape closes dropdown
- FAQ keyboard accessible
- all meaningful images have useful alt text
- decorative images use empty alt
- no text embedded only in images
- support `prefers-reduced-motion`
- phone is a `tel:` link
- do not remove focus outlines

---

# 22. IMAGE SLOT MAP

## Homepage

1. Hero wide field/property image — 16:9 or wider
2. Mosaic image 1 — vertical/4:5
3. Mosaic image 2 — vertical/4:5
4. Mosaic image 3 — vertical/4:5
5. Crime Scene service card — 4:3
6. Rodent service card — 4:3
7. Hoarding service card — 4:3
8. Severe service card — 4:3
9. Detailed Deep Cleaning card — 4:3
10. Dark split operator/property image — 4:3
11. Regulated waste/operation image — 4:3
12. Founder portrait — 4:5
13. Original Bay Area service map graphic

Do not force all 13 to be unique on day one if that is operationally impossible, but do not repeat the same image more than twice on the homepage.

## Crime Scene & Trauma

1. Hero controlled cleanup image
2. Situations operational image
3. After-scene-release image
4. Professional-cleanup image
5. Discretion photo band
6. Why Aseptaclean operational/founder image

## Rodent

1. Hero affected-property image
2–4. Pest-control distinction mosaic
5. What may be affected image
6. Cleanup image

## Hoarding

1. Hero property image
2. Important belongings/property image
3. More-than-clearing image
4. Sanitation photo band
5. Why Aseptaclean image

## Severe

1. Hero neglected-property image
2. Condition image
3. Approach/reset image
4. Why Aseptaclean image

## Detailed Deep Cleaning

1. Hero refined residential image
2. Kitchen detail
3. Bathroom/detail
4. Why Aseptaclean/property reset

## About

1. Real founder portrait
2. Real operational image

No stock founder.

---

# 23. CODING / COMPONENT IMPLEMENTATION

The current project is Astro. Do not follow the old WordPress/Elementor build instructions from ACWEB003.

Preferred component structure:

```text
src/
  components/
    Header.astro
    Footer.astro
    HomeHeroWithForm.astro
    ServiceHero.astro
    TrustStrip.astro
    EditorialSplit.astro
    ThreeImageMosaic.astro
    ServiceVisualCard.astro
    DarkSplit.astro
    PhotoAuthorityBand.astro
    ProcessFour.astro
    ScopeGrid.astro
    FAQ.astro
    FinalCTA.astro
    ServiceArea.astro
```

Global CSS:

```text
src/styles/aseptaclean.css
```

or use the repository's current shared stylesheet if already established.

Do not create separate page-specific design systems.

Pages should compose shared components.

---

# 24. COPY IMPLEMENTATION RULE

All visible marketing copy in these pages comes from this specification.

Do not pull wording from:

- ACWEB003 design profile
- old master copy if it conflicts with this file
- old launch playbooks
- competitor websites
- Codex-generated copy

When HTML requires line breaks, preserve meaning and wording.

Allowed changes:

- curly quote normalization
- punctuation escaping
- link wrapper placement
- list markup
- capitalization required by HTML/component context

Not allowed:

- headline rewrites
- new claims
- adding adjectives
- extra paragraphs
- new reassurance copy
- "SEO optimization" that changes visible copy
- keyword-stuffed location copy

---

# 25. ROUTE RULE

Use current repository routes.

Do not create a duplicate route simply because the specification uses a descriptive page name.

Before implementing a page:

1. identify current public route
2. confirm it is canonical
3. update that page
4. preserve canonical/sitemap behavior
5. do not create an alternate version without explicit approval

---

# 26. VISUAL QA CHECKLIST

For each page at 1440px:

## Composition
- does it look photographic rather than text-heavy?
- does the page alternate composition?
- is the image large enough to carry visual weight?
- are there no three consecutive centered text sections?
- are there no generic SaaS cards?
- do dark sections create real rhythm changes?
- does copy fit comfortably beside imagery?

## Homepage
- hero resembles approved HTML mockup
- hero form is compact
- trust strip immediately follows hero
- mosaic section exists
- services are photo-led
- dark 50/50 split exists
- process is four columns
- authority section feels substantial
- founder is visible
- footer has weight

## Service pages
- hero image is large
- 3–5 meaningful photographic moments
- section count stays controlled
- process is four steps
- FAQ is compact
- copy does not become a long article

## Mobile
Test:
390px
768px
1024px
1440px

No:
- horizontal overflow
- crushed H1
- tiny buttons
- dropdown inaccessible
- giant blank image panels
- form overflow
- footer overlap

---

# 27. BUILD / QA COMMANDS

Use repository-appropriate commands.

Minimum:

```bash
npm run build:local
```

and if available:

```bash
npm run check
```

or:

```bash
npx astro check
```

Also verify:

- current routes render
- all nav links work
- Services dropdown works
- phone links work
- Request Assessment links work
- hero form works
- assessment form works
- photo upload works
- SMS consent remains intact
- FAQ works
- no broken images
- no console errors introduced
- sitemap/canonical behavior remains valid

---

# 28. FINAL REPORT FORMAT FOR CODEX

Codex must report:

## PAGE
Exact route updated.

## DOM STRUCTURE
List the sections actually rendered, in order.

## COPY
Confirm copy came from this locked spec with no material rewrite.

## CSS / COMPONENTS
List shared components and selectors used.

## IMAGES
For each slot:
- real Aseptaclean asset
- approved illustrative stock
- still required

## RESPONSIVE
Report:
390
768
1024
1440

## FUNCTIONAL QA
Forms, nav, dropdown, links, FAQ, uploads, consent.

## BUILD
Exact output.

## DRIFT CHECK
Explicitly confirm:
- no new sections invented
- no copy rewritten
- no legacy amber/pill design introduced
- no fake proof introduced
- no duplicate routes created

---

# 29. FINAL DESIGN STATEMENT

The approved direction is fully encoded in this file.

The website must use that same visual language across all public pages:

**compact white header + dark photographic hero + short form + thin trust strip + large photographic sections + restrained service cards + dark/light rhythm + compact process + factual authority + real founder + simple FAQ + heavy footer.**

Do not reinterpret this into a different visual system.


# 30. SOURCE-COPY DRIFT GATE

Before the task is considered complete:

1. Extract every visible string from each changed public page.
2. Compare it to this specification.
3. Report every mismatch.
4. Correct accidental mismatches.
5. Do not correct a mismatch by inventing new copy.
6. If claims/safety guardrails force a change to source-locked copy, report:
   - route
   - exact locked string
   - exact guardrail
   - proposed safe replacement
   - whether owner approval is required

## Required zero-drift checks

Homepage:
- H1 exact
- service card copy exact
- process copy exact
- founder copy exact
- FAQ exact

Services:
- all five service modules exact

Crime Scene & Trauma:
- no demolition/reconstruction copy
- TSW #933 wording exact
- insurance wording exact
- waste wording exact

Rodent:
- CDC copy not paraphrased
- pest-control boundary exact

Hoarding:
- belongings language exact
- judgment FAQ exact

Severe:
- severe/gross-filth explanatory language exact
- scope-change copy exact

Detailed Deep Cleaning:
- material/surface language exact
- move-in/move-out copy exact

About:
- founder quote exact
- founder-background disclaimer exact

Contact:
- no invented address
- phone/email/hours bound to verified repository data

Assessment:
- short form only
- legal SMS consent preserved from current repository
- no legacy long questionnaire

## Completion rule

If any public page still contains model-written bridge copy not explicitly supplied in this specification, the implementation is NOT complete.
