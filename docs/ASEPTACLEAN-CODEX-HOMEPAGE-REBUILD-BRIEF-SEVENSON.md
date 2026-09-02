# ASEPTACLEAN — CODEX HOMEPAGE REBUILD BRIEF
## Sevenson-Led Visual Direction — Canonical Build Specification

> **SUPERSEDED 2026-08-26 — NOT ACTIVE AUTHORITY. DO NOT BUILD FROM THIS FILE.**
>
> `docs/30-WEBSITE-MASTER-SPEC.md` is the single governing website strategy/design document, and
> its §17 is the homepage architecture. The Sevenson-led direction survives — doc 30 §6.1 and §45
> carry it sitewide — but it is doc 30 that carries it now, not this brief.
>
> Retained as historical rationale for decisions already shipped: `src/components/FinalCTA.astro`
> and `src/pages/index.astro` cite this path, as do `docs/05-DECISIONS-LOG.md` entries dated
> 2026-08-25. That is traceability, not authority. The word "Canonical" in the title above is
> a filename artifact and confers nothing — see `AGENTS.md` §1, "Active versus historical
> material."
>
> If a prompt tells you to "read `ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF-SEVENSON.md` before
> editing," that prompt predates 2026-08-26. Read doc 30 instead.

**Purpose:** Governing implementation brief for rebuilding the Aseptaclean homepage in the existing Astro codebase.

**Status:** SUPERSEDED — historical only. (Formerly: "Approved visual direction. This file supersedes earlier homepage mockup / visual-direction instructions where they conflict.")

---

# 0. READ THIS FIRST — DO NOT IMPROVISE THE STRATEGY

You are implementing an already-directed website.

You are **not** the art director.

Do not reinterpret Aseptaclean from first principles and do not merge multiple visual references into a new hybrid without instruction.

The goal is to build a serious, credible specialty property-cleanup company website with the visual posture of a real environmental-services contractor.

## Source-of-truth hierarchy

When sources conflict, use this order:

1. **Current Astro codebase**
   - actual routes
   - current service state
   - current public claims
   - indexation
   - form behavior
   - data modules
   - deployment behavior

2. **`ASEPTACLEAN-MASTER-WEBSITE-SITEMAP.md`**
   - target buyer
   - conversion strategy
   - service architecture
   - scope boundaries
   - SEO governance
   - future-service gating

3. **This file**
   - homepage visual direction
   - layout
   - responsive behavior
   - interaction behavior
   - anti-AI rules

4. Existing screenshots and mockups only as supporting visual context.

Do not silently invent missing information.

If a requested element requires a claim, credential, price, service, location, review, project, image, certification, or regulatory status that cannot be verified from the codebase or approved data, **omit it or use an explicit development placeholder**.

---

# 1. PRIMARY BUYER / BUSINESS STRATEGY

The homepage is primarily for:

> **The adult child or family decision-maker who has become responsible for an aging parent or relative's cluttered, neglected, heavily soiled, or otherwise overwhelming property and needs to get the situation under control.**

Typical triggers can include:

- hospital discharge / return home;
- assisted-living transition;
- estate or family transition;
- preparing a property for sale;
- discovering the property is worse than expected;
- a deadline that prevents further postponement;
- ordinary cleaning beginning and then proving insufficient.

The buyer's real job:

> **“I need someone competent to help me get this property under control, tell me what actually needs to happen, and not create a bigger problem while doing it.”**

The homepage must let the visitor recognize their situation without forcing them to know a technical service name.

---

# 2. PRIMARY CONVERSION

Primary CTA:

> **Tell Us About the Property**

Use the existing technical route:

`/request-assessment/`

unless the repository proves the route is different.

Secondary CTA:

- actual phone number stored in site data.

Do not put a large assessment form in the hero.

The homepage should establish:

1. recognition;
2. competence;
3. scope discipline;
4. boundaries;
5. fit;
6. trust;

before asking for detailed intake information.

---

# 3. LOCKED VISUAL DIRECTION

## 3.1 Primary visual reference — SEVENSON

Primary reference:

https://sevenson.com/

Aseptaclean should take its **overall visual personality and operating-company posture** from Sevenson.

Use Sevenson as the reference for:

- serious environmental-services tone;
- conventional corporate navigation;
- full-width photographic hero;
- centered hero messaging;
- large real-work imagery;
- blue / white corporate restraint;
- straightforward service presentation;
- simple typography;
- factual copy;
- limited animation;
- project / equipment / operational imagery as authority;
- quiet credibility rather than decorative credibility.

Do not copy Sevenson pixel-for-pixel.

Copy the **logic** behind why it feels like a real environmental-services company.

## 3.2 Secondary visual reference — INTERDOOR

Secondary reference:

https://www.interdoor.uk/

Interdoor is NOT the primary personality.

Use it only to improve:

- spacing;
- section rhythm;
- contemporary polish;
- negative space;
- image cropping;
- large-image category routing;
- below-the-fold visual pacing;
- stronger editorial hierarchy where useful.

Do not use Interdoor's oversized editorial hero typography on Aseptaclean's hero.

Do not create a 50/50 blend of Sevenson and Interdoor.

### Priority

**Sevenson = company personality + authority**

**Interdoor = refinement + rhythm**

**Aseptaclean strategy = buyer + copy + scope + boundaries**

---

# 4. DESIRED FEEL

The finished homepage should feel:

- serious;
- calm;
- competent;
- field-operational;
- environmental-services adjacent;
- procedural;
- accountable;
- visually restrained;
- capable of growing naturally into remediation work;
- like a real operating company rather than a web-design concept.

It should NOT feel like:

- SaaS;
- AI startup;
- luxury maid service;
- architecture firm;
- design agency;
- Web3;
- government portal;
- military dashboard;
- compliance dashboard;
- fake laboratory;
- theatrical hazmat company;
- generic restoration template.

---

# 5. CORE ANTI-AI RULE

Do not let the homepage resolve into:

> hero → 3 equal cards → 3 equal cards → process cards → trust cards → testimonial cards → FAQ cards → CTA band

The page should instead feel like:

> **large visual moment → recognition → quiet explanation → service evidence → operational explanation → real proof → accountability → action**

Different information must create different compositions.

Do not use one generic component repeatedly simply because it is reusable.

Implementation reuse is allowed.

Visual sameness is not required.

---

# 6. VISUAL SYSTEM

Use existing Aseptaclean design tokens where available.

Do not introduce a new brand system unless the current codebase lacks one.

## 6.1 Preferred palette

Use the existing approved Aseptaclean palette:

- Deep Navy: `#122840`
- Primary Navy: `#1C355E`
- Slate Blue: `#6A9BC3`
- Steel: `#A8B8C8`
- Warm White: `#F7F8FA`
- Body: `#334155`
- White: `#FFFFFF`

Do not introduce:

- hazard yellow as a theme;
- bright red as a theme;
- neon colors;
- decorative gradients;
- glow effects;
- glassmorphism;
- pastel marketing sections.

A **flat dark navy overlay** over photography is allowed when required for text legibility.

## 6.2 Typography

Use the site's existing approved type stack.

If the site currently uses Inter Variable, keep it.

Do not introduce a luxury serif or stylized display font.

Maximum: 2 font families.

### Desktop targets

Hero H1:
- approximately `48–58px`

Major H2:
- `42–64px`

Standard H2:
- `34–46px`

H3:
- `24–32px`

Large body:
- `18–20px`

Body:
- `16–18px`

### Mobile

Hero H1:
- `38–44px`

Major H2:
- `34–42px`

H3:
- `22–28px`

Body:
- `16–17px`

Use:

```css
text-wrap: balance;
```

for major headings where supported.

Use:

```css
text-wrap: pretty;
```

for body copy where useful.

Avoid manual `<br>` tags unless the line break is editorially necessary and verified across viewports.

Do not shrink headings aggressively to fix wrapping.

Correct in this order:

1. container width;
2. column allocation;
3. `max-width`;
4. line measure;
5. letter spacing;
6. type size only if necessary.

## 6.3 Corners / shadows

Use:
- square corners;
- or very small radius `0–8px`.

Do not use:
- 18px;
- 24px;
- 32px;
- pill cards.

Avoid shadows on ordinary sections.

Only use subtle elevation where functionally justified.

## 6.4 Buttons

Simple rectangular controls.

Primary:
- navy background;
- white text.

Hero:
- white background;
- navy text.

No:
- pills;
- glow;
- gradient;
- oversized floating controls.

Hover:
- simple color change;
- approximately `120–180ms`.

---

# 7. GLOBAL GRID / CONTAINERS

## Desktop

- main content max width: approximately `1240–1320px`
- wide media can reach `1400–1460px`
- outer page padding: `32–44px`
- content gutters: `24–32px`

## Tablet

- side padding: `26–32px`
- gap: approximately `24–40px`

## Mobile

- side padding: `18–22px`

Do not force every section into the exact same content width.

Large imagery may use a wider container than text-heavy sections.

---

# 8. SPACING / RHYTHM

Do not apply identical padding to every section.

Use three rhythms.

## Compact

`48–64px`

For:
- supporting proof;
- utility information;
- comparisons;
- FAQ transitions.

## Standard

`80–104px`

For:
- normal content sections.

## Feature

`112–144px`

For:
- major visual sections;
- large statements;
- services;
- Project Notes;
- final CTA.

The page should alternate between visually dense and visually quiet moments.

---

# 9. HEADER — SEVENSON-STYLE CORPORATE HIERARCHY

Use the overall hierarchy:

> UTILITY ROW  
> ↓  
> WHITE MAIN NAVIGATION  
> ↓  
> FULL-WIDTH HERO

## 9.1 Utility row

Keep it small and factual.

Possible content:

Left:
> Specialty Property Cleaning + Complex Cleanup

Right:
> actual phone number

Do not invent:
- 24/7 availability;
- response times;
- certifications;
- service areas.

If current repository data makes a different factual utility line more accurate, use it.

## 9.2 Main navigation

White background.

Logo / wordmark left.

Navigation:

- What We Handle
- Services
- How We Work
- About
- Service Areas

Right side:

- actual phone number if space permits;
- primary CTA: `Tell Us About the Property`

Use existing assessment route.

The main nav should feel like a normal serious operating company.

Do not use:

- rounded floating nav;
- translucent header;
- glassmorphism;
- pill navigation;
- floating icon buttons.

## 9.3 Sticky behavior

Main navigation should become sticky.

Utility row may scroll away.

Do not create intrusive scroll behavior.

---

# 10. HERO — LOCKED SEVENSON-LED STRUCTURE

This section supersedes all previous hero instructions that specified:

- a 7/5 asymmetric hero;
- lower-left editorial composition;
- Interdoor-sized typography;
- split-screen layout.

## 10.1 Structure

Use:

> FULL-WIDTH PHOTOGRAPH  
> +  
> FLAT DARK OVERLAY  
> +  
> CENTERED HERO COPY  
> +  
> ONE PRIMARY CTA

Do not use:

- split hero;
- hero form;
- floating form;
- service tiles;
- statistics;
- trust badges;
- process strip;
- credential strip;
- dashboard graphics;
- status labels;
- decorative metadata.

## 10.2 Hero headline

Approved:

> **When a family property has become too much to handle.**

Desktop target:

`48–58px`

Do not use 80–100px fashion/editorial typography.

Suggested text max width:

`850–1000px`

## 10.3 Supporting copy

Approved direction:

> **Aseptaclean helps families deal with cluttered, neglected, and difficult property conditions with a clear scope before work begins.**

Keep it short.

Suggested max width:

`700–850px`

## 10.4 CTA

Primary:

> **Tell Us About the Property**

Use a simple white rectangular button.

- white background;
- dark navy text;
- no shadow;
- no pill;
- no gradient.

Do not place a second large CTA inside the hero.

Phone can remain in header / utility bar.

## 10.5 Desktop hero height

Target approximately:

`560–650px`

at ~1440px viewport width.

Do not make the hero 800–900px tall unless the actual approved image composition requires it.

## 10.6 Image

Use:
- approved real Aseptaclean photography when available.

If not:
- use an explicit development placeholder;
- or temporary licensed reference imagery approved for development.

Do not generate:
- fake Aseptaclean crew;
- fake remediation;
- fake biohazard work;
- fake before/after.

Do not present temporary imagery as proof.

## 10.7 Overlay

Use one flat overlay.

Example:

```css
background: rgba(10, 30, 45, 0.48);
```

Tune between approximately `0.42–0.60` based on image contrast.

Do not use decorative gradients.

---

# 11. SECTION — “WHAT ARE YOU DEALING WITH?”

## Purpose

Recognition.

Visitors should be able to identify their situation without knowing a service name.

## Desktop

Use three large image-led panels.

These are **not generic cards**.

Approved customer-facing concepts:

### Heavy buildup or neglected property

> The condition has moved beyond routine upkeep and needs a defined one-time project.

### Hoarding or overwhelming contents

> Contents, access, decisions, clearing, and cleaning may all affect the scope.

### Estate, move-out, or property reset

> A property has to become manageable for sale, occupancy, transition, or handoff.

Use current repository route/service logic for destination URLs.

Do not expose hard-gated future services.

## Visual treatment

Photography should dominate.

Use:
- large images;
- short title;
- one short explanation;
- simple link behavior.

Do not add:
- icons;
- badges;
- pill labels;
- floating white boxes;
- excessive copy.

## Tablet

Use:
- 2 + 1.

## Mobile

Use:
- one large image route per row.

Images should remain visually substantial.

---

# 12. SECTION — “A CLEAR SCOPE BEFORE WORK BEGINS”

This should intentionally become **quieter** after the image-led recognition section.

Use:
- generous negative space;
- strong left-aligned copy;
- restrained structure.

Heading:

> **A clear scope before work begins.**

Approved copy direction:

> A routine cleaning checklist assumes the property is already being maintained.

> Difficult property conditions can require a different approach.

> Aseptaclean reviews the condition, determines what belongs in the project, identifies boundaries, and defines the work before execution begins.

Supporting rows may include:

- Condition
- Included work
- Boundaries
- Material changes
- Handoff

Use simple text rows or rules.

Do not create:

- 5 process cards;
- numbered circles;
- icon grid;
- timeline graphic;
- fake process dashboard.

---

# 13. CURRENT SERVICES — SEVENSON-STYLE IMAGE + COPY

This is an important change from the earlier image-card-grid direction.

Do not make the main service section a 4-card or 6-card grid.

Use **large service compositions**, similar in spirit to Sevenson's service pages.

Photography should carry the visual weight.

## Structure examples

Service 1:
- text left;
- large image right.

Service 2:
- large image left;
- text right.

Service 3:
- wide image-led section.

Supporting services:
- smaller text routing treatment if needed.

Do not mechanically repeat the exact same 50/50 split four times.

## Service content

Use only active public routes from the repository.

Possible families must be verified from current data.

Likely concepts may include:

- Complex Property Cleanup
- Property / Hoarding Cleanup
- Detailed Property Cleaning
- Move-In / Move-Out
- Post-Construction Cleaning

Do not assume all are currently public/indexable.

## Copy must answer

For each service:

1. What condition is this for?
2. Why might routine cleaning not fit?
3. What outcome is the client trying to reach?

Avoid generic copy such as:

- professional solutions;
- exceptional service;
- tailored solutions;
- trusted experts;
- peace of mind;
- experience the difference.

---

# 14. SECTION — “THE PROPERTY CONDITION CHANGES THE WORK”

Use a simple factual comparison.

Do not use rounded comparison cards.

Possible structure:

| Routine cleaning | Aseptaclean project |
| --- | --- |
| Maintained property | Condition-specific |
| Standard checklist | Defined scope |
| Predictable labor | Labor follows actual condition |
| Routine visit | Project / handoff |
| Limited contents decisions | Client decisions may affect scope |

Use:
- typography;
- rules;
- spacing.

Only state what is operationally true.

---

# 15. PROJECT NOTES / PROOF ENGINE

Sevenson feels authoritative because it shows real work.

Aseptaclean should use the same **principle**, not fake the same scale.

## Project Note structure

When real material exists, include:

- property context;
- location at appropriate privacy level;
- condition;
- major constraint;
- approved scope;
- exclusions where helpful;
- sequence / approach;
- outcome / handoff;
- real photographs;
- related service.

Use large imagery.

Do not style every Project Note like a generic blog card.

## If proof is not ready

Do not fabricate it.

Choose one:

- keep section small;
- show a clearly labeled development placeholder;
- omit section until assets exist.

Do not create:
- fake projects;
- fake before/after;
- fake testimonials;
- fake statistics;
- AI-generated workers.

---

# 16. COST / SCOPE CONTEXT

Do not build an instant calculator.

Do not build Basic / Premium / Elite pricing cards.

Use a simple editorial list or table.

Possible approved price drivers can include only what current operations support:

- property condition;
- total size;
- affected areas;
- contents;
- removal volume;
- access;
- labor;
- equipment;
- disposal / container coordination where applicable;
- schedule;
- detail level;
- separately approved additions.

If approved public starting prices already exist in site data and are intentionally public, reuse them.

Do not invent pricing.

---

# 17. FOUNDER / ACCOUNTABILITY

Sevenson uses history, scale, and major projects as trust.

Aseptaclean should **not imitate that history**.

Its trust advantage should be:

- founder/operator accountability;
- direct scope control;
- defined boundaries;
- real operating process;
- honest fit decisions.

## Composition

Use:
- real founder/operator photo when available;
- image on one side;
- short factual copy on the other.

Approved direction:

> **Aseptaclean was built around a simple operating principle: understand the condition first, define the work clearly, and do not leave important scope decisions to assumption.**

No:
- founder manifesto;
- resume dump;
- invented years of experience;
- inflated company scale.

---

# 18. FIT / BOUNDARIES

Use a simple two-column structure.

## Usually worth discussing

Examples may include:

- overwhelming family property;
- hoarding / accumulation within current boundaries;
- estate or property transition;
- severe-condition / detailed cleaning;
- current service geography;
- authorized decision-maker.

## May require another provider / outside current scope

Examples may include:

- regulated biohazard remediation not yet activated;
- structural demolition / contractor work;
- pest-control chemical application;
- anything outside current legal / insurance / operating scope.

Use actual repository/service-state logic.

Do not imply future regulated services are active.

---

# 19. FAQ

Keep quiet.

Use accessible `<details>` / `<summary>` or the site's existing accessible accordion.

Do not create a decorative FAQ card wall.

Use real buyer questions.

Possible examples:

- Do I need to know the right service name?
- Can you review the property from photos?
- What happens if additional work is found?
- Do I need to be at the property?
- What if part of the job is outside Aseptaclean's current scope?
- How are belongings / disposition decisions handled?

Do not add FAQ solely for search-engine rich-result tactics.

---

# 20. FINAL CTA

Use a simple image + statement composition.

This can use Interdoor's cleaner final-CTA rhythm while keeping Sevenson's operating-company tone.

Use:

> LARGE REAL IMAGE  
> +  
> LARGE SIMPLE STATEMENT  
> +  
> ONE CTA

Heading:

> **Tell us what is happening at the property.**

Supporting copy:

> **You do not need to know the service name. Send the property details and photos if available. We can determine whether it fits Aseptaclean's current scope and what the next step should be.**

CTA:

> **Tell Us About the Property**

Route to `/request-assessment/`.

Secondary phone link is acceptable.

Do not embed a huge form here.

---

# 21. FOOTER

Use a conventional serious-company footer.

Include:

- Aseptaclean summary;
- services;
- company;
- service area;
- contact;
- legal.

No:
- fake certifications;
- fake client logos;
- inactive social links;
- giant redundant CTA after the final CTA.

---

# 22. IMAGE POLICY

This is non-negotiable.

## Production proof hierarchy

Strongest:

1. real Aseptaclean property / project photography;
2. real before / after;
3. real equipment;
4. real vehicle;
5. real operator / technician;
6. real PPE / setup;
7. real operating document;
8. real Project Note.

Allowed with context:

- licensed editorial/environment imagery that is NOT presented as proof of completed Aseptaclean work.

Avoid:

- AI-generated crew;
- AI-generated remediation;
- fake before/after;
- staged fake hazmat scene;
- generic smiling cleaner stock;
- fake scope dashboard;
- fake compliance art.

## Required photography library to build over time

### Hero
One strong real project / property-context image.

### Property condition
Wide room/property views.

### Condition details
Buildup, contents, residue, affected areas.

### Process
Actual work in progress.

### Equipment
Actual setup/tools.

### Completion
Finished approved scope.

### Operator
Working, not posing.

### Documentation
Scope/checklist/handoff.

### Future remediation
Only legitimate real remediation work after regulated service activation.

---

# 23. TABLET BEHAVIOR

The supplied reference recording showed desktop behavior.

Tablet behavior below is Aseptaclean's required adaptation.

## 1024px

- preserve some desktop two-column service compositions;
- hero remains centered and photographic;
- hero H1 approximately `44–50px`;
- section gaps reduce;
- nav may collapse if crowding appears.

## 768px

- simplify more aggressively;
- hero H1 approximately `38–44px`;
- recognition becomes `2 + 1`;
- service sections may stack where readability requires;
- footer becomes 2 columns.

Do not simply enlarge the mobile design.

---

# 24. MOBILE BEHAVIOR

Test at:

- 320
- 360
- 375
- 390
- 430

## Header

- logo left;
- menu right;
- no hover dependency;
- accessible drawer / full-width menu.

Utility row:
- reduce to essential factual content;
- remove if it creates clutter.

## Hero

Preserve the same fundamental structure:

> FULL-WIDTH IMAGE  
> +  
> CENTERED COPY  
> +  
> ONE CTA

H1:
- `38–44px`

Body:
- `16–17px`

Hero height:
- approximately `500–620px` depending on crop and wrapping.

Do not create a completely different mobile hero.

## Recognition

- one image route per row.

## Services

- one composition at a time;
- choose image-first or text-first intentionally;
- do not mechanically alternate if reading order suffers.

## Footer

- one column.

## Optional mobile sticky actions

Potential:

- Call
- Tell Us About the Property

Only implement if it improves usability.

Must not cover:
- form fields;
- cookie controls;
- footer links;
- other interactive elements.

---

# 25. MOTION / BEHAVIOR

The reference direction is restrained.

Allowed:

- navigation dropdown;
- mobile menu;
- simple image hover;
- link underline;
- button state;
- FAQ accordion;
- subtle carousel only if truly needed.

Avoid:

- parallax;
- scroll locking;
- giant reveal animations;
- text fly-ins;
- animated counters;
- 3D;
- moving gradients;
- cursor effects;
- magnetic buttons;
- constant marquee.

Respect reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  /* remove nonessential motion */
}
```

---

# 26. FORM / REQUEST-ASSESSMENT

Detailed intake remains on:

`/request-assessment/`

unless repository data says otherwise.

Do not force a service choice as the first question.

The visitor should be able to begin with:

- property city;
- contact information;
- what they are seeing;
- what needs to happen next;
- deadline / timing;
- photos.

Preserve the existing lead endpoint.

Required states:

- validation;
- error;
- success;
- disabled/submitting;
- upload progress/feedback;
- wrong file type;
- oversize file;
- network failure;
- keyboard focus;
- accessible error association.

---

# 27. PERFORMANCE

Do not trade speed for design.

## Images

Hero:
- optimized responsive image;
- use `<picture>` / `<img>` where practical;
- explicit width/height;
- `srcset`;
- `sizes`;
- eager load / `fetchpriority="high"` where appropriate.

Below fold:
- lazy load;
- responsive sizes;
- use existing AVIF/WebP pipeline if supported.

Avoid putting all meaningful images in CSS backgrounds if it harms:
- alt text;
- responsive loading;
- performance.

## JavaScript

Use Astro / native HTML / CSS wherever possible.

Do not add:

- animation library;
- slider library;
- UI framework;
- React/Vue/Svelte;
- Tailwind

unless already in the repository and genuinely required.

Do not introduce dependencies to solve something native HTML/CSS can handle.

---

# 28. ACCESSIBILITY

Must support:

- semantic headings;
- one meaningful H1;
- visible keyboard focus;
- meaningful alt text;
- empty alt for decorative images where appropriate;
- keyboard-operable menu;
- no hover-only critical information;
- sufficient contrast;
- 44px touch targets;
- correct form labels;
- accessible errors;
- reduced motion;
- 200% zoom without content loss.

Do not hide critical explanations only in hover states.

---

# 29. SEO / ROUTE SAFETY

Do not alter:

- canonical behavior;
- robots;
- sitemap logic;
- redirects;
- current noindex state;
- schema behavior;
- service-area configuration;
- lead endpoint;

unless specifically required and separately approved.

Do not surface hard-gated future routes.

Do not create new city pages.

Do not mass-generate service × city pages.

Do not activate human-biohazard service pages/claims before the separate activation gate clears.

---

# 30. CURRENT CODEBASE — INSPECT BEFORE EDITING

Before implementation inspect:

- `src/pages/`
- `src/pages/index.astro`
- `src/layouts/`
- `src/components/`
- `src/data/site.ts`
- service data modules
- company-page data modules
- sitemap implementation
- redirects
- lead API endpoint
- global CSS/tokens

Do not assume filenames that do not exist.

If repository structure differs, report the actual architecture first.

---

# 31. IMPLEMENTATION ARCHITECTURE

Small semantic Astro components are fine.

Possible homepage components:

- `HomeHero.astro`
- `ConditionRecognition.astro`
- `ScopeExplanation.astro`
- `ServiceFeature.astro`
- `ProjectNotesPreview.astro`
- `CostScope.astro`
- `FounderAccountability.astro`
- `FitBoundaries.astro`
- `HomeFAQ.astro`
- `FinalPropertyCTA.astro`

A component may support layout variants.

Do not force every service through the exact same card treatment.

---

# 32. COPY RULES

Reject generic marketing language.

Do not use:

- exceptional service;
- unmatched quality;
- tailored solutions;
- go above and beyond;
- trusted partner;
- experience the difference;
- seamless;
- elevate;
- empower;
- innovative;
- unlock;
- synergy;
- dynamic;
- peace of mind;
- every project is unique.

Replace adjectives with operating facts.

Bad:

> We provide transparent pricing.

Better:

> The scope defines what is included before work begins. Material additions are discussed before the approved scope is expanded.

Bad:

> We are meticulous.

Better:

> The approved scope identifies the areas, surfaces, fixtures, clearing, cleaning, and detail work included in the project.

Copy should be:

- factual;
- easy to scan;
- concrete;
- low reading burden;
- based on real operations.

---

# 33. NO-INVENTION LIST

Do not invent:

- certifications;
- licenses;
- CDPH status;
- OSHA credentials;
- HAZWOPER credentials;
- review count;
- star rating;
- years in business;
- jobs completed;
- employees;
- biohazard readiness;
- service areas;
- project names;
- client logos;
- customer quotes;
- prices;
- guarantees;
- 24/7 availability;
- insurance claims;
- project photography;
- regulated human-biohazard services.

If uncertain, omit.

---

# 34. BUILD SEQUENCE

Do not build the homepage in one blind pass.

## Phase 0 — Audit

Before editing:

1. run the current site;
2. identify homepage files/components/styles;
3. record current routes/indexation;
4. identify design tokens;
5. identify nav behavior;
6. identify CTA route;
7. capture baseline screenshots at:
   - 390
   - 768
   - 1024
   - 1440
8. identify generic/repetitive visual patterns.

Do not change files during this phase.

## Phase 1 — Header + Hero

Build:
- utility row;
- white corporate nav;
- responsive menu;
- Sevenson-led centered photographic hero.

Capture screenshots.

Stop.

## Phase 2 — Recognition + Scope

Build:
- What Are You Dealing With;
- A Clear Scope Before Work Begins.

Capture screenshots.

Stop.

## Phase 3 — Services + Condition Difference

Build:
- Sevenson-style image + copy services;
- Property Condition Changes the Work.

Capture screenshots.

Stop.

## Phase 4 — Proof + Cost + Accountability + Fit + FAQ + Final CTA

Only use real / verified content.

Capture screenshots.

Stop.

## Phase 5 — QA

Responsive;
accessibility;
performance;
anti-AI audit.

---

# 35. REQUIRED VIEWPORT QA

Test:

- `320px`
- `360px`
- `375px`
- `390px`
- `430px`
- `768px`
- `1024px`
- `1280px`
- `1440px`

Also test:

- 200% zoom;
- keyboard navigation;
- reduced motion;
- slow network;
- delayed image loading;
- mobile landscape if practical.

There must be zero page-level horizontal overflow.

---

# 36. WRAPPING QA

Check every major heading for:

- no clipping;
- no collisions;
- no ugly one-word final line when preventable;
- no manual line break that fails at other widths;
- no aggressive type shrinking.

Hero target:

Desktop:
- approximately 2–3 lines.

Tablet:
- approximately 2–4 lines.

Mobile:
- approximately 3–5 lines.

---

# 37. ANTI-AI SELF-CRITIQUE

After implementation, explicitly run these tests.

## Logo-swap test

Could another cleaning/restoration company replace the Aseptaclean logo and keep 90% of the page?

If yes:
- identify generic sections;
- rewrite / restructure them using Aseptaclean-specific operations and buyer situations.

## Silhouette test

Blur/squint at the page.

Does it look like:

> hero → equal cards → equal cards → CTA?

If yes:
- identify and restructure the repetitive sections.

## Card test

List every remaining card/grid treatment.

Explain why each must be a card.

If there is no semantic reason:
- remove the card treatment.

## Section-repeat test

Identify repeated compositions.

Do not repeat the same structure mechanically because a component exists.

## Evidence test

List every visible piece of real Aseptaclean evidence.

Then list missing proof assets separately.

Do not invent missing proof.

## Copy test

Identify sentences another cleaning/restoration company could use unchanged.

Rewrite them using:
- Aseptaclean's scope mechanism;
- buyer situations;
- service boundaries;
- real operations;
- current evidence.

## Mobile comprehension test

At 390px, a visitor should be able to answer:

1. Who does Aseptaclean help?
2. What situations may fit?
3. Why is this different from routine cleaning?
4. What happens next?
5. What should I click?

If any answer is unclear, fix hierarchy.

---

# 38. ACCEPTANCE CRITERIA

The homepage is not approved merely because it compiles.

## Strategy

- family decision-maker is primary;
- no forced technical service choice above fold;
- primary CTA is `Tell Us About the Property`;
- current lawful scope only;
- future regulated biohazard not prematurely marketed.

## Visual

- Sevenson-led operating-company feel;
- full-width photographic hero;
- centered hero copy;
- large real-image moments;
- restrained blue/white/slate palette;
- no gradients;
- no glow;
- no glassmorphism;
- no SaaS card farm;
- no icon wall;
- no dashboard aesthetic;
- no fake compliance graphics;
- no stock/AI imagery presented as real Aseptaclean proof.

## Layout

- sections use motivated compositions;
- service sections are image + copy driven;
- spacing varies by importance;
- not every section uses the same template;
- desktop/tablet/mobile each feel intentionally composed.

## Behavior

- sticky nav works;
- mobile nav works;
- keyboard access works;
- no hover-only critical content;
- responsive images behave;
- no layout shifts from missing dimensions.

## Technical

- current SEO/indexation preserved;
- no route regressions;
- no broken internal links;
- no horizontal overflow;
- no console errors;
- no unnecessary new dependencies.

## Content

- no invented proof;
- no invented credentials;
- no fake stats;
- no false service claims;
- copy is factual and specific.

---

# 39. FINAL DELIVERABLES FROM CODEX

After implementation return:

1. files changed;
2. visual changes made;
3. existing logic intentionally preserved;
4. unverifiable claims/assets omitted;
5. real Aseptaclean photos/assets still needed;
6. screenshots at:
   - 390
   - 768
   - 1024
   - 1440
7. responsive issues found and fixed;
8. accessibility issues found and fixed;
9. performance issues found and fixed;
10. anti-AI self-critique;
11. remaining launch blockers.

Do not finish with:

> “Looks good.”

Explain what was actually verified.

---

# 40. DO NOT DO THESE THINGS

Do not:

- rebuild every public route;
- rewrite the sitemap;
- change indexation;
- change the lead endpoint;
- add Tailwind because it is familiar;
- add a UI library;
- add animation packages;
- use 3 equal cards everywhere;
- add Lucide icons beside every heading;
- invent project proof;
- generate AI worker photos;
- use generic luxury interiors as proof;
- imply biohazard services are active;
- create a government portal;
- create a military/compliance dashboard;
- use hazard yellow as the theme;
- create fake certification bars;
- add a hero intake form;
- create a 7/5 split hero;
- put the hero text in the lower-left editorial style;
- use 90–100px Interdoor typography in the hero;
- hide critical copy in hover;
- turn the homepage into a technical manual;
- copy Sevenson or Interdoor pixel-for-pixel.

Borrow the logic.

Do not copy the brand.

---

# 41. FINAL TARGET

The finished homepage should feel like:

> **A real South Bay specialty property-cleanup company with the seriousness of an environmental contractor, the visual restraint of Sevenson, slightly cleaner contemporary spacing influenced by Interdoor, and Aseptaclean's own condition-first scope strategy.**

It should communicate:

- real company;
- real physical work;
- clear scope;
- clear boundaries;
- serious operator;
- factual competence;
- no fake authority;
- no decorative authority.

Do not try to impress a web designer.

Make the company look competent.

The visual system should become stronger automatically as Aseptaclean accumulates:

- real property photography;
- real project photos;
- equipment;
- vehicle;
- operator images;
- Project Notes;
- reviews;
- legitimate future remediation work;
- legitimate future regulatory credentials.

The website must be designed to **hold real proof**, not simulate it.
