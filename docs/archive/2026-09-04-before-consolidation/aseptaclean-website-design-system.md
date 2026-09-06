# Aseptaclean Website Design System & Layout Specification

## Purpose

This document defines the visual system, layout rules, component behavior, and page architecture for the Aseptaclean website.

It is inspired by the visual category and information architecture seen in established biohazard and specialty-cleanup companies such as 911 Bio Clean and ClearPath, but it must not copy their exact layouts, colors, component styling, imagery, wording, or visual signatures.

The goal is:

> Make Aseptaclean look like it belongs in the same serious professional category — without looking derivative.

Aseptaclean should feel like:

- A serious specialty cleanup company
- Operationally disciplined
- Calm
- Established
- Human
- Technically competent
- Premium without saying “premium”
- Property-services / restoration influenced
- Modern without looking like SaaS
- Structured without looking corporate or sterile

---

# 1. Visual Direction

## Overall Blend

Use this approximate design influence:

- **45% ClearPath layout thinking**
- **30% 911 Bio Clean restraint**
- **25% distinctly Aseptaclean**

The Aseptaclean identity should come from:

- Navy rather than green or bright blue
- Square or nearly square geometry
- Fewer cards
- Fewer shadows
- Thin rules
- Large section numbering
- Real operator identity
- Documentation as visual proof
- Restrained CTA frequency
- Strong photography
- Large image/text compositions
- High contrast between white and deep navy sections

---

# 2. Core Design Principles

## Use the same visual category, not the same website

Borrow:

- Clear page hierarchy
- Wide photography
- Large white-space sections
- Simple service recognition
- Strong alternating image/text sections
- Full-width authority bands
- Obvious calls to action
- Simple process sections
- Clean FAQ treatment
- Substantial footer
- Real field imagery

Do not copy:

- 911 Bio Clean green
- ClearPath blue
- ClearPath diagonal shapes
- Exact card grids
- Exact hero composition
- Exact process timeline
- Exact badge arrangements
- Exact CTA sections
- Exact navigation design
- Exact copy
- Exact icons
- Exact map styling
- Exact image treatment

---

# 3. Global Layout System

## Desktop Canvas

Use a centered content system.

```css
:root {
  --site-max-width: 1200px;
  --content-max-width: 1120px;
  --text-max-width: 620px;

  --gutter-desktop: 32px;
  --gutter-tablet: 24px;
  --gutter-mobile: 20px;
}
```

Primary container:

```css
.section-inner {
  width: min(1200px, calc(100% - 64px));
  margin-inline: auto;
}
```

Tablet:

```css
.section-inner {
  width: min(100% - 48px, 1200px);
}
```

Mobile:

```css
.section-inner {
  width: calc(100% - 40px);
}
```

---

# 4. Section Types

Aseptaclean should use three primary section types.

## Type A — Contained White Section

Use for:

- Service explanations
- Founder
- Cost
- FAQ
- Informational sections
- Detailed text

Structure:

```text
|        whitespace        |
|   [ 1200px content ]     |
|        whitespace        |
```

---

## Type B — Full-Width Background / Contained Content

Use for:

- Dark authority bands
- Trust sections
- Major reframes
- Final CTA
- Credential sections

Structure:

```text
████████████████████████████████
████    1200px content area  ███
████████████████████████████████
```

The background is full-bleed.

The content remains aligned to the site grid.

---

## Type C — Large Image / Text Split

Use frequently.

Desktop:

```text
| IMAGE 50–55% | TEXT 45–50% |
```

or reverse:

```text
| TEXT 45–50% | IMAGE 50–55% |
```

Do not make every section a card grid.

---

# 5. Vertical Spacing

Use generous whitespace.

```css
:root {
  --section-xl: 112px;
  --section-lg: 88px;
  --section-md: 64px;
  --section-sm: 40px;
}
```

Default desktop section:

```css
padding-block: 88px;
```

Major sections:

```css
padding-block: 96px 112px;
```

Smaller utility bands:

```css
padding-block: 48px;
```

Mobile sections:

```css
padding-block: 56px;
```

Do not compress major sections into 24–32px vertical gaps.

Whitespace is part of the brand.

---

# 6. Header

## Desktop Structure

```text
---------------------------------------------------------
LOGO            Services   About   Contact      [CTA]
---------------------------------------------------------
```

Aseptaclean primary navigation:

- Services
- About
- Contact

Primary CTA:

**Request an Assessment**

Do not list individual service pages in the primary navigation.

## Header Dimensions

```css
header {
  min-height: 84px;
}
```

Container:

```css
max-width: 1200px;
padding-inline: 32px;
```

Logo:

```css
width: 150px;
max-width: 175px;
```

Navigation:

```css
font-size: 15px;
font-weight: 500;
gap: 32px;
```

CTA:

```css
height: 44px;
min-height: 44px;
padding-inline: 22px;
```

## Mobile Header

- Logo left
- Menu trigger right
- Primary CTA may sit inside mobile menu
- Avoid oversized mobile header
- Maintain 44–48px touch targets

---

# 7. Typography

Use:

```css
font-family: Inter, sans-serif;
```

## Homepage H1

```css
font-size: clamp(52px, 5vw, 64px);
line-height: 1.02;
font-weight: 650;
letter-spacing: -0.035em;
```

## Service Page H1

```css
font-size: clamp(44px, 4.5vw, 56px);
line-height: 1.04;
font-weight: 650;
letter-spacing: -0.03em;
```

## H2

```css
font-size: clamp(34px, 3.5vw, 42px);
line-height: 1.1;
font-weight: 650;
letter-spacing: -0.025em;
```

## H3

```css
font-size: 22px;
line-height: 1.2;
font-weight: 650;
```

On wider layouts, H3 may increase to:

```css
font-size: 24px;
```

## Body

```css
font-size: 17px;
line-height: 1.65;
font-weight: 400;
```

## Small Body

```css
font-size: 14px;
line-height: 1.5;
```

or

```css
font-size: 15px;
```

## Eyebrow / Section Label

Use a recurring Aseptaclean visual signature.

Example:

**03 / OUR PROCESS**

```css
font-size: 13px;
font-weight: 700;
letter-spacing: .10em;
text-transform: uppercase;
```

Do not copy 911 Bio Clean's green underlined section labels.

---

# 8. Color System

Use the existing Aseptaclean palette.

```css
:root {
  --navy-900: #122840;
  --navy-700: #1C355E;
  --slate-500: #6A9BC3;
  --steel-300: #A8B8C8;
  --warm-white: #F7F8FA;

  --white: #FFFFFF;
  --ink: #151A20;
  --body-text: #404851;
  --muted-text: #6B737C;
  --border: #D9DEE3;
}
```

## Approximate Page Distribution

Aim for:

- 55–60% white / warm white
- 25–30% photography
- 10–15% navy
- 5% slate / steel accent

Do not make the website mostly navy.

Do not introduce bright green.

Do not introduce ClearPath-style bright blue.

No gradients.

---

# 9. Homepage Hero

## Composition

Use a large full-width photographic hero.

```text
┌─────────────────────────────────────────────────────┐
│                                                     │
│              FULL-WIDTH PROPERTY PHOTO              │
│                                                     │
│   EYEBROW                                           │
│   LARGE H1                                          │
│   supporting copy                                   │
│                                                     │
│   [Request Assessment]   Send Photos →              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Use left-aligned copy.

Do not center all text.

## Hero Sizing

Desktop:

```css
min-height: 600px;
```

Alternative:

```css
aspect-ratio: 16 / 7;
```

Image:

```css
width: 100%;
height: 100%;
object-fit: cover;
```

## Overlay

Use a solid translucent navy overlay.

Do not use a gradient.

```css
background: rgba(10, 24, 40, 0.52);
```

Text block:

```css
max-width: 720px;
```

## Hero CTA Order

Primary:

**Request an Assessment**

Secondary:

**Send Photos**

Optional utility:

Phone number may remain visible, but should not dominate the hero.

## Hero Trust Line

Example:

**California TSW Practitioner · TSW #933 · Insured**

Keep the line restrained.

Do not create a giant badge wall above the fold.

---

# 10. Service Page Hero

Do not reuse the exact homepage hero on every service page.

Preferred structure:

```text
-----------------------------------------------------
SERVICE CATEGORY

Large service-specific headline.

Short paragraph.

[Request Assistance]       [Call]

                                  IMAGE
-----------------------------------------------------
```

Grid:

```css
display: grid;
grid-template-columns: 1.05fr .95fr;
gap: 64px;
align-items: center;
```

Preferred hero height:

```css
min-height: 520px;
```

Maximum typical height:

```css
600px;
```

Mobile:

- stack copy first
- image second
- retain CTA visibility above fold where practical

---

# 11. Split Image / Text Section

This is one of the primary reusable patterns.

Desktop:

```css
.split-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}
```

Alternate composition:

Section 1:

```text
IMAGE | COPY
```

Section 2:

```text
COPY | IMAGE
```

Section 3:

```text
IMAGE | COPY
```

Do not repeat the same direction endlessly.

## Images

Preferred ratio:

```css
aspect-ratio: 4 / 3;
```

Alternative:

```css
aspect-ratio: 5 / 4;
```

Always:

```css
object-fit: cover;
width: 100%;
```

---

# 12. Image Treatment

## Preferred Image Hierarchy

Prioritize:

1. Actual property condition
2. Founder / operator on site
3. PPE / loadout
4. Tools and equipment
5. Waste handling
6. Controlled work area
7. Real before / after
8. High-quality licensed stock only when necessary

## Image Geometry

```css
border-radius: 0;
```

A slight radius is acceptable only where needed:

```css
border-radius: 2px;
```

Maximum:

```css
border-radius: 4px;
```

Avoid ClearPath-style large rounded corners.

## Shadows

Do not use heavy shadows.

Default:

```css
box-shadow: none;
```

Use contrast, spacing, and borders rather than shadow to separate sections.

---

# 13. Service Cards

Use sparingly.

Preferred style:

```css
.service-card {
  border: 1px solid #D9DEE3;
  background: #FFFFFF;
  border-radius: 0;
}
```

Image:

```css
aspect-ratio: 4 / 3;
width: 100%;
object-fit: cover;
```

Content:

```css
padding: 24px;
```

Do not wrap every paragraph on the website inside a card.

Cards should primarily be used for:

- service routing
- select proof objects
- compact category summaries

---

# 14. Buttons

## Primary Button

```css
background: #1C355E;
color: #FFFFFF;
border: 1px solid #1C355E;
border-radius: 2px;

height: 48px;
padding-inline: 24px;

font-size: 15px;
font-weight: 650;
```

Hover:

```css
background: #122840;
border-color: #122840;
```

## Secondary Button

```css
background: transparent;
color: #1C355E;
border: 1px solid #1C355E;
border-radius: 2px;
```

## Rules

Do not use:

- Pill buttons
- Glow effects
- Gradients
- Oversized button shadows
- Rounded 20px+ CTA shapes

---

# 15. Process Section

Use the conceptual clarity of a multi-step process without copying either reference design.

Preferred desktop layout:

```text
01                 02                 03                 04
ASSESS             DEFINE             PERFORM            DOCUMENT
short text         short text         short text         short text
─────────────── thin connecting rule ──────────────────────────────
```

Large step number:

```css
font-size: 52px;
font-weight: 500;
color: #A8B8C8;
```

Step heading:

```css
font-size: 20px;
font-weight: 650;
```

Do not rely on icons.

Mobile:

```text
01
ASSESS
text

02
DEFINE
text

03
PERFORM
text

04
DOCUMENT
text
```

Use a vertical rhythm rather than a complicated mobile timeline.

---

# 16. Dark Authority Section

Use a full-width deep navy band periodically.

```css
.authority-section {
  background: #122840;
  color: #FFFFFF;
  padding-block: 88px;
}
```

Possible use:

```text
REGULATED CLEANUP

California Registered
Trauma Scene Waste Management Practitioner

TSW #933

                            supporting explanation
```

Or:

```text
COPY | FIELD IMAGE
```

Do not fill it with badges.

The section itself should feel authoritative.

---

# 17. Credential / Trust Strip

Use a restrained horizontal strip.

Example:

```text
CALIFORNIA TSW PRACTITIONER   |   TSW #933   |   INSURED
```

Implementation:

```css
.trust-strip {
  display: flex;
  justify-content: center;
  gap: 32px;
  border-block: 1px solid #D9DEE3;
  padding: 24px 0;
}
```

Use 1px vertical dividers where needed.

Mobile:

- stack or wrap cleanly
- do not shrink text until unreadable

---

# 18. Founder / Operator Section

Use a real photograph.

Preferred layout:

```text
┌──────────────────────┬────────────────────────────┐
│                      │  FOUNDER & PRINCIPAL       │
│    REAL PORTRAIT     │                            │
│                      │  Matthew Ruiz              │
│                      │                            │
│                      │  short explanation         │
│                      │                            │
│                      │  B.S. Biochemistry         │
│                      │  Pharmaceutical Mfg.       │
│                      │  Surgical Pathology        │
└──────────────────────┴────────────────────────────┘
```

Grid:

```css
grid-template-columns: .9fr 1.1fr;
gap: 72px;
```

or 50/50.

Do not use a stock photo of a fake crew.

Do not make this section an autobiography.

Purpose:

> Make the person responsible for the work visible.

---

# 19. Proof Section

Until substantial reviews and project history exist, show operational proof.

Examples:

- Real equipment
- PPE
- Loadout
- Work preparation
- TSW certificate
- Sample written scope
- Sample assessment
- Sample completion record
- Sample waste documentation

All sample artifacts must visibly say:

**SAMPLE**

Do not imply they came from a real customer project when they did not.

Preferred proof layout:

```text
[large image] [artifact]
[artifact]    [equipment photo]
```

Use asymmetry rather than a generic 3-card row where practical.

---

# 20. Forms

Do not place the entire assessment form inside the homepage hero.

Use the short assessment flow.

Form max width:

```css
max-width: 720px;
```

Input:

```css
height: 50px;
border: 1px solid #A8B8C8;
border-radius: 2px;
padding-inline: 14px;
```

Textarea:

```css
min-height: 130px;
padding: 14px;
```

Vertical gap:

```css
gap: 18px;
```

Use visible persistent labels.

Do not use floating labels.

Do not use placeholder-only labels.

---

# 21. FAQ

Use a simple accordion.

Preferred structure:

```text
Frequently Asked Questions

When can cleanup begin?                         +
────────────────────────────────────────────────
Do I need to send photos?                       +
────────────────────────────────────────────────
Does insurance cover this?                      +
────────────────────────────────────────────────
```

Style:

```css
.faq-item {
  border-top: 1px solid #D9DEE3;
  padding: 22px 0;
}
```

Recommended FAQ width:

```css
max-width: 850px;
```

Do not put every FAQ item in a rounded card.

---

# 22. CTA Bands

Use one or two major CTA bands per long page.

Do not repeat a giant CTA after every section.

Preferred:

```text
██████████████████████████████████████████

       Show us what you're dealing with.

 You don't need to know which service you need.

       [ Request an Assessment ]  Call →

██████████████████████████████████████████
```

Implementation:

```css
.final-cta {
  background: #122840;
  color: #FFFFFF;
  padding: 88px 32px;
  text-align: center;
}
```

---

# 23. Service Area Section

Use the same idea as established restoration / biohazard companies: make the operating region easy to understand visually.

Do not copy an existing map graphic.

Create a clean original Bay Area map or geographic graphic.

Preferred content:

- Santa Clara County
- San Mateo County
- Alameda County
- Santa Cruz County

Supporting line:

**Additional Bay Area locations reviewed by project.**

Do not make a grid of dozens of city buttons.

---

# 24. Footer

Use a substantial deep footer.

Background:

```css
background: #0D1724;
color: #FFFFFF;
```

Top padding:

```css
padding-top: 72px;
```

Suggested structure:

```text
ASEPTACLEAN

Specialty property cleanup
San Francisco Bay Area

SERVICES
Crime Scene & Trauma
Rodent & Animal Waste
Hoarding
Severe Property
Detailed Deep Cleaning

COMPANY
About
Contact
Request Assessment

SERVICE AREA
Santa Clara County
San Mateo County
Alameda County
Santa Cruz County

PHONE / CONTACT
```

Bottom utility bar:

```css
border-top: 1px solid rgba(255,255,255,.12);
```

Keep legal / privacy links in the bottom utility row.

---

# 25. Composition Rules

Never use the same section composition more than twice in a row.

Rotate between:

1. Centered text section
2. Image left / text right
3. Text left / image right
4. Dark full-width band
5. Four-step process
6. Large photographic section
7. Simple bordered grid
8. FAQ
9. CTA

The site should feel intentionally art-directed rather than template-generated.

---

# 26. Homepage Wireframe

Use this general page order.

```text
HEADER
────────────────────────────────────────────

HERO
Large full-width photograph
Left-aligned copy
Primary CTA
Secondary CTA

TRUST STRIP
TSW #933 / Insured / Owner Operated

WHAT ARE YOU DEALING WITH?
2 x 2 service photography grid

REFRAME
Dark navy full-width section

IMAGE / TEXT
Why specialty cleanup differs

PROCESS
01 Assess
02 Define
03 Perform
04 Document

CREDENTIAL SECTION
Large TSW / regulated waste handling proof

FOUNDER
Real photo + founder explanation

REAL OPERATION / PROOF
Equipment / sample documentation / real photos

SERVICE AREA
Bay Area graphic + counties

FAQ

FINAL NAVY CTA

FOOTER
```

---

# 27. Homepage Service Routing

Preferred service grid:

```text
[IMAGE]
Crime Scene & Trauma Cleanup
Blood, bodily fluids, unattended death and other trauma-scene conditions.

[IMAGE]
Rodent Droppings & Animal Waste Cleanup

[IMAGE]
Hoarding & Severe Property Cleanup

[IMAGE]
Detailed Deep Cleaning
```

Desktop:

```css
grid-template-columns: repeat(2, 1fr);
gap: 32px;
```

Mobile:

```css
grid-template-columns: 1fr;
```

Do not use tiny icon cards.

Photography should carry the section.

---

# 28. Crime Scene & Trauma Service Page Wireframe

Use:

```text
HEADER

SERVICE HERO
copy | relevant image

TRUST STRIP
TSW #933 / insured / regulated waste path

RECOGNITION
After authorities leave...

SITUATIONS HANDLED
split text + photograph

WHY PROFESSIONAL CLEANUP
photograph + copy

WHAT WE DO
clear scope list

PROCESS
4 steps

DISCRETION
dark photographic section

REGULATED WASTE
credential / authority section

WHY ASEPTACLEAN
founder / mechanism

INSURANCE

FAQ

FINAL CTA

FOOTER
```

Do not include demolition / structural removal language on the current public page.

---

# 29. Other Service Page Pattern

All service pages should use the same design system but not identical composition.

General architecture:

```text
HEADER

SERVICE HERO

RECOGNITION

WHY THIS IS DIFFERENT

SERVICE-SPECIFIC SCOPE

PROCESS

PROOF / OPERATION

WHY ASEPTACLEAN

COST CONTEXT

FAQ

FINAL CTA

FOOTER
```

Change section direction, imagery, and composition between pages.

Do not make every service page look cloned.

---

# 30. Mobile Rules

Target approximately:

```text
390px mobile width
```

Mobile principles:

- One-column layout
- 20px side gutters
- 56px major section padding
- 44–48px tap targets
- Avoid tiny text
- Avoid multi-column icon grids
- Keep primary CTA obvious
- Stack split sections cleanly
- Put copy before image when the copy is needed to explain the section
- Keep image heights reasonable
- Avoid excessive hero height
- Avoid horizontal overflow
- Keep forms single-column
- Ensure accordion controls are full-width
- Preserve visual hierarchy rather than simply shrinking desktop

---

# 31. Tablet Rules

Around:

```text
768px–1024px
```

Use:

- 24px gutters
- reduced split-section gaps
- allow 2-column service cards where appropriate
- stack complex split sections sooner rather than squeezing content
- maintain large headings but reduce from desktop maximum

---

# 32. Border System

Default border:

```css
border: 1px solid #D9DEE3;
```

Dark section borders:

```css
border-color: rgba(255,255,255,.14);
```

Use borders for:

- FAQ separators
- trust strip
- service cards
- documentation samples
- selected process details

Do not outline every section.

---

# 33. Radius System

Preferred:

```css
--radius-none: 0;
--radius-sm: 2px;
--radius-md: 4px;
```

Use:

- 0px for most structural elements
- 2px for buttons / form controls
- 4px maximum for selected images or media

Do not use:

- 12px
- 16px
- 20px
- full pill radius

unless explicitly instructed for a specific component later.

---

# 34. Shadow System

Default:

```css
box-shadow: none;
```

If a very subtle elevation is absolutely necessary:

```css
box-shadow: 0 4px 18px rgba(18, 40, 64, 0.06);
```

Use sparingly.

Do not make cards float.

---

# 35. Iconography

Avoid icon-heavy design.

If icons are used:

- simple line icons
- consistent stroke weight
- navy / slate
- no bright multicolor icon set
- no cartoon illustration style
- no oversized icon circles

Use typography, photography, and layout first.

---

# 36. Photography Direction

The website should increasingly replace stock imagery with real field imagery.

Preferred photography:

- Technician / operator working
- PPE
- Equipment
- Property condition
- Controlled work areas
- Waste handling
- Job preparation
- Real cleanup process
- Before / after
- Real founder portrait

Do not use:

- Generic smiling cleaning crews
- Fake laboratory scenes
- Doctors / surgeons
- Obvious AI-generated cleanup crews
- Dramatic horror-style crime scene imagery
- Excessive biohazard symbols
- Stock images that exaggerate danger

Borrow clinical discipline, not medical theater.

---

# 37. Distinct Aseptaclean Visual Signature

The design should develop recurring elements that belong specifically to Aseptaclean.

Recommended signature:

## Section Numbering

Example:

```text
03 / OUR PROCESS
```

## Thin Vertical Rules

Use a 1px navy or steel vertical rule beside selected headings.

## Large Rectangular Photography

Square or nearly square edges.

## Strong Navy Bands

Use sparingly for authority and conversion.

## Documentation as Proof

Sample scopes, assessments, and records become part of the visual identity.

Do not use ClearPath diagonal blue geometry.

Do not use 911 Bio Clean green accent logic.

---

# 38. Homepage Visual Hierarchy

The visitor should understand in this order:

1. This company handles difficult cleanup
2. My situation fits
3. They appear legitimate
4. They have a clear process
5. They operate in my area
6. I know what to do next

Do not lead with:

- founder biography
- long scientific explanations
- giant credential walls
- giant service lists
- process jargon
- regulatory text

---

# 39. Service Page Visual Hierarchy

The visitor should understand:

1. This is the service I searched for
2. This company handles this exact situation
3. This is why the work is different from ordinary cleaning
4. This is what they do
5. This is how the process works
6. They appear legitimate
7. I understand how contact works
8. I can act now

---

# 40. Do Not Do

Do not build the site like:

- SaaS software
- A generic cleaning template
- A medical clinic
- A government dashboard
- A franchise clone
- An AI-generated landing page
- A giant card grid
- A bright startup
- A luxury lifestyle brand

Do not use:

- gradients
- glassmorphism
- giant pill buttons
- large rounded cards
- excessive shadows
- repetitive 3-column icon rows
- fake review widgets
- fake badges
- fake crew photos
- fake statistics
- large biohazard-symbol backgrounds
- excessive animation
- floating decorative shapes
- autoplay video

---

# 41. Implementation Discipline

Before changing the site:

1. Inspect the current repository.
2. Identify reusable layout components.
3. Preserve working routes.
4. Preserve forms and integrations.
5. Preserve current approved copy unless specifically replacing it.
6. Do not invent new service categories.
7. Do not create city-page spam.
8. Do not create unsupported credentials.
9. Do not add fake proof.
10. Do not redesign unrelated internal pages.

---

# 42. Final Design Goal

When someone compares:

- Aseptaclean
- 911 Bio Clean
- ClearPath
- Bio-One
- Aftermath

the reaction should be:

> These companies operate in the same serious professional category.

But the reaction should never be:

> Aseptaclean copied one of them.

Aseptaclean should feel more restrained, more operational, more documentation-driven, and more visually controlled.

The core visual identity is:

> **Large photography. Strong hierarchy. Deep navy. Square geometry. Real operator proof. Clear process. Minimal decoration.**
