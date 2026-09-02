# ASEPTACLEAN — CODEX HOMEPAGE REBUILD BRIEF

> **SUPERSEDED 2026-08-26 — NOT ACTIVE AUTHORITY. DO NOT BUILD FROM THIS FILE.**
>
> `docs/30-WEBSITE-MASTER-SPEC.md` is the single governing website strategy/design document, and
> its §17 is the homepage architecture. This brief is retained as historical rationale for
> decisions already shipped, which several `src/` comments and `docs/05-DECISIONS-LOG.md` entries
> cite by this path. That is traceability, not authority.
>
> This file is additionally unusable as written: its "Primary references" below name
> `ASEPTACLEAN-MASTER-WEBSITE-SITEMAP.md` and `Pasted markdown.md`, and **neither file exists in
> this repository.** Under `AGENTS.md` §1 "Missing or stale pointers," reconcile the pointer
> rather than acting on it.
>
> Its Interdoor-first visual lead is also retired — doc 30 §6.1 makes Sevenson the primary
> benchmark and §6.2 demotes Interdoor to a secondary spacing/image-rhythm reference.

**File purpose:** Give Codex one governing implementation brief for rebuilding the Aseptaclean homepage in the existing Astro codebase.

**Status:** SUPERSEDED — historical only. (Formerly: "Build direction approved for implementation testing.")

**Primary references**
- Design / composition reference: https://www.interdoor.uk/
- Environmental-services / authority reference: https://sevenson.com/
- Canonical Aseptaclean strategy: `ASEPTACLEAN-MASTER-WEBSITE-SITEMAP.md`
- Humanization / anti-AI research: `Pasted markdown.md` (humanized website specification)
- Existing codebase remains the source of truth for actual routes, service availability, indexation, lead handling, and deployed behavior.

---

# 0. READ THIS FIRST — DO NOT IMPROVISE THE STRATEGY

You are implementing an already-directed website.

You are **not** the art director.

Do not interpret this prompt as permission to redesign Aseptaclean from first principles.

The job is to translate the approved design direction into a responsive Astro homepage while preserving the site's existing route logic, SEO behavior, service gates, and operational claims.

## Source-of-truth hierarchy

When sources conflict, use this order:

1. **Current Astro codebase** for what actually exists, current URLs, current service flags, current legal/indexation behavior, form endpoints, shared data, and deployment behavior.
2. **`ASEPTACLEAN-MASTER-WEBSITE-SITEMAP.md`** for conversion strategy, target architecture, buyer focus, service gates, humanization requirements, and SEO governance.
3. **This file** for the new homepage visual direction, layout, responsive behavior, and implementation contract.
4. Existing screenshots/mockups only as secondary visual context.

Do not silently invent missing information.

If a requested element requires a claim, credential, price, service, location, review, project, image, or regulatory status that cannot be verified from the codebase or approved data, **omit it or use an explicit development placeholder**.

---

# 1. PRIMARY BUSINESS / BUYER STRATEGY

The homepage is primarily for:

> **The adult child or family decision-maker who has become responsible for an aging parent or relative's cluttered, neglected, heavily soiled, or otherwise overwhelming property and needs to get the situation under control.**

Typical triggers can include:

- hospital discharge / return home;
- assisted-living transition;
- estate or family transition;
- preparing a property for sale;
- discovering a property is worse than expected;
- a deadline that prevents further postponement;
- ordinary cleaning beginning and then proving insufficient.

The buyer's real job:

> **“I need someone competent to help me get this property under control, tell me what actually needs to happen, and not create a bigger problem while doing it.”**

The homepage must make this visitor feel recognized without forcing them to know a technical service name.

---

# 2. PRIMARY CONVERSION

Primary visible CTA:

> **Tell Us About the Property**

The existing technical route can remain:

`/request-assessment/`

Do not change the route merely to change the visible CTA.

Secondary CTA:

- phone call using the actual phone number already stored in the site data.

Do not place a large intake form in the homepage hero.

The homepage should establish recognition, competence, scope discipline, and fit first.

The detailed intake belongs on `/request-assessment/`.

---

# 3. VISUAL DIRECTION

## 3.1 Design thesis

Use:

**Interdoor**
for:
- large real photography;
- strong page rhythm;
- generous negative space;
- restrained palette;
- image-led service routing;
- large editorial headings;
- sections that use different compositions instead of one repeating template;
- simple final image + CTA composition.

Use:

**Sevenson**
for:
- environmental-services seriousness;
- operational authority;
- simple professional navigation;
- service architecture;
- health/safety posture;
- real work as proof;
- factual language;
- project / equipment photography;
- conventional interactions that feel trustworthy rather than performative.

Use:

**Aseptaclean's own strategy**
for:
- family-property buyer;
- condition-first recognition;
- scope control;
- client-control / risk reduction;
- service boundaries;
- fit / not-fit;
- Project Notes;
- current lawful scope;
- future biohazard gating.

## 3.2 Desired feel

The site should feel:

- calm;
- competent;
- serious;
- private;
- procedural;
- field-operational;
- established enough to trust;
- small enough to remain accountable;
- capable of growing naturally into a remediation company.

It should **not** feel like:

- SaaS;
- a startup;
- a Web3 site;
- a house-cleaning template;
- a luxury lifestyle site;
- an architecture portfolio;
- a fake government portal;
- a military dashboard;
- a theatrical hazmat company;
- a generic AI-generated service site.

---

# 4. CORE ANTI-AI RULE

The page must not visually resolve into:

> hero → 3 equal cards → 3 equal cards → process cards → trust cards → testimonial slider → FAQ → CTA band

The humanization standard is:

> **emphasis → quiet → detail → evidence → action**

Use a consistent design system with **distinct content-specific compositions**.

Different information should produce different visual forms.

Do not make the same visual component responsible for every idea.

---

# 5. VISUAL SYSTEM

Use the existing Aseptaclean brand tokens where available.

Do not introduce a new brand system unless the current code lacks one.

## 5.1 Preferred palette

Use existing values where already defined. Target palette:

- Deep navy: `#122840`
- Primary navy: `#1C355E`
- Slate blue: `#6A9BC3`
- Steel: `#A8B8C8`
- Warm white: `#F7F8FA`
- Body: `#334155`
- Pure white: `#FFFFFF`

No decorative gradients.

A transparent navy image overlay is allowed when required for text legibility. It should be a flat overlay, not a decorative gradient effect.

Do not copy Sevenson's green CTA.

Do not introduce hazard yellow/red as a brand color simply because future biohazard work is planned.

## 5.2 Typography

Do not introduce a new font family without explicit approval.

Prefer the existing approved site font stack.

If the site currently uses Inter Variable, retain it.

Maximum: 2 font families.

### Desktop type targets

- Hero H1: `clamp(56px, 6vw, 94px)`
- Major H2: `48–76px` depending on section importance
- Standard H2: `36–48px`
- H3: `24–34px`
- Large body: `18–20px`
- Body: `16–18px`
- Small / captions: `12–14px`

### Mobile

- H1: `38–44px`
- Major H2: `34–42px`
- H3: `22–28px`
- Body: `16–17px`

Use:
- `text-wrap: balance` for major headings;
- `text-wrap: pretty` for paragraphs where supported;
- `hyphens: none`;
- controlled `ch` widths;
- no manual `<br>` fixes unless the break is editorially required across intended viewports.

Do not shrink typography aggressively merely to avoid a line wrap.

Correct in this order:
1. container width;
2. column allocation;
3. max-width / `ch` measure;
4. letter-spacing;
5. type size only if necessary.

## 5.3 Corners / shadows

Do not use 20–30px rounded cards.

Preferred:
- most images / sections: square or very small radius;
- allowed radius: `0–8px`;
- no global radius token applied to every object.

No shadows on ordinary sections/cards.

Only use subtle elevation if a real overlapping document or menu state genuinely needs it.

## 5.4 Borders

Use borders sparingly.

Do not turn the page into a compliance dashboard with black boxes around everything.

Use:
- thin dividers;
- subtle section boundaries;
- table / comparison rules where the content benefits from structure.

## 5.5 Buttons

Simple rectangular buttons.

Primary:
- navy fill;
- white text.

Secondary:
- text link or white fill / navy text depending on background.

Avoid:
- pills;
- glowing hover states;
- magnetic effects;
- animated gradients.

Hover:
- immediate or short `120–180ms` color change.

---

# 6. GLOBAL PAGE GRID

## Desktop

- Fluid canvas
- Main content max width: `1240–1320px`
- Wide media max width: `1400–1460px`
- 12-column layout when useful
- Gutter: `24–32px`
- Outer page padding: `32–44px`

## Tablet

- 8-column mental model
- Side padding: `26–32px`
- Gap: `24px`

## Mobile

- 4-column mental model
- Side padding: `18–22px`

Do not use one identical `max-width` for every section if wide media requires a broader container.

---

# 7. SPACING / PAGE RHYTHM

Do not set every `<section>` to the same vertical padding.

Use three rhythms.

## Compact

`48–64px`

For:
- supporting proof;
- utility information;
- small transitions;
- compact comparisons.

## Standard

`80–104px`

For:
- regular content sections.

## Feature

`120–152px`

For:
- hero transitions;
- major statements;
- major project proof;
- important image-led features.

The page should visibly alternate between dense and quiet moments.

---

# 8. HEADER BEHAVIOR

## Desktop

Use a professional two-level structure if it fits existing architecture.

### Utility row

Small, quiet row.

Possible content:
- service geography;
- phone.

Do not overload it.

### Main navigation

White background.

Contains:
- Aseptaclean wordmark / logo;
- `What We Handle`
- `Services`
- `How We Work`
- `About`
- `Service Areas`
- phone
- CTA: `Tell Us About the Property`

Main navigation should become sticky.

Utility bar does not need to remain sticky.

### Services dropdown / mega menu

Only use a mega menu if the current site architecture already has one or if the existing service count genuinely requires it.

If implemented:
- group services by real service family;
- never show hard-gated future biohazard services;
- no tiny floating SaaS-style menu;
- use a simple large white/dark panel with text categories.

## Tablet

At roughly `900–1024px`, reduce nav density.

Use hamburger when horizontal navigation no longer fits comfortably.

Do not wait until text overlaps.

## Mobile

- logo left;
- menu button right;
- no hover dependency;
- drawer / full-width menu;
- phone and primary CTA separated near bottom.

Touch targets minimum `44x44px`.

---

# 9. HOMEPAGE SECTION ORDER

This is the target structure.

Do not add extra sections to make the page feel fuller.

1. Utility + navigation
2. Full-width hero
3. Condition / recognition imagery
4. Clear-scope explanatory section
5. Current services — image-led
6. Why the property condition changes the work
7. Project Notes / real-world proof
8. Cost / scope context
9. Founder / accountability
10. Fit / boundaries
11. FAQ
12. Final image-led CTA
13. Footer

Some sections may be omitted from first release if real evidence does not exist yet.

Do not fill missing proof with fake content.

---

# 10. HERO — FULL-WIDTH PHOTOGRAPHY

## Composition

Reference logic: Interdoor + Sevenson.

Use a large, full-width real property / field image.

Desktop target:
- approximately `620–760px` tall;
- or `65–78vh` with reasonable min/max constraints.

A flat navy overlay may sit over the image for legibility.

Text:
- left aligned;
- large;
- bottom-left / lower-left composition rather than centered hero copy.

## Approved headline direction

Use:

> **When a family property has become too much to handle.**

Do not replace this with generic lines like:
- “Some properties need more.”
- “Professional cleaning solutions.”
- “Your trusted cleanup partner.”

## Supporting copy

Use concise, factual language.

Approved direction:

> Aseptaclean helps families deal with cluttered, neglected, and difficult property conditions with a clear scope before work begins.

If more context is needed:

> Start with what is happening at the property. We determine what fits the current scope, what work belongs in the project, and what needs to happen next.

## CTA

Primary:
> Tell Us About the Property

Secondary:
> Call [actual site phone]

No form in hero.

No star rating unless a real, current, verifiable rating exists and is approved.

No credential badges.

No fake statistics.

---

# 11. SECTION — “WHAT ARE YOU DEALING WITH?”

## Purpose

Recognition.

The visitor should not have to know a technical service name.

## Desktop layout

Use 3 large image-led panels rather than 3 generic cards.

Recommended situations:

### A. Heavy buildup / neglected property

Description:
> The condition has moved beyond routine upkeep and needs a defined one-time project.

### B. Hoarding / overwhelming contents

Description:
> Contents, access, decisions, clearing, and cleaning may all affect the scope.

### C. Estate / move-out / property reset

Description:
> A property has to become manageable for sale, occupancy, transition, or handoff.

Use actual current route/service logic to determine destination links.

Do not feature a gated service merely because it creates visual variety.

## Photography

Production:
- only real Aseptaclean work or clearly licensed non-proof editorial imagery approved by the owner.

Development:
- neutral placeholders or temporary reference images are acceptable only when labeled / dev-only.

Do not present stock or AI imagery as completed Aseptaclean work.

## Tablet

3 panels → `2 + 1`.

The third panel may span full width.

## Mobile

1 panel per row.

Images remain large.

Do not shrink them into tiny card thumbnails.

---

# 12. SECTION — “A CLEAR SCOPE BEFORE WORK BEGINS”

## Purpose

Explain why difficult properties require a different process.

This should be a quieter section after the image-heavy recognition area.

## Composition

Desktop:
- asymmetric `5/7` or `6/6`;
- large heading on one side;
- concise factual explanation on the other;
- optional real field image or real scope/document detail if available.

Do not make five process cards.

Do not create a fake dashboard.

## Approved copy direction

Heading:

> **A clear scope before work begins.**

Body:

> A routine cleaning checklist assumes the property is already being maintained. Difficult properties often require a different approach.

> Aseptaclean reviews the condition, determines what belongs in the project, identifies boundaries, and defines the work before execution begins.

Possible supporting rows:

- Condition
- Included work
- Boundaries
- Material changes
- Handoff

These should be simple rows / text, not card components.

---

# 13. CURRENT SERVICES — IMAGE-LED, NOT CARD-LED

## Goal

Use the visual logic from Sevenson's services pages and Interdoor's image-led product/service presentation.

Avoid 6 identical service cards.

Use large image + copy sections.

### Primary service family

**Complex Property Cleanup**

Make this visually dominant.

Explain current scope using approved data.

Potential routes can include:
- property-clearing;
- hoarding cleanup;
- estate cleanout;
- property cleanouts.

Do not alter URLs just for visual naming.

### Detailed Property Cleaning

Possible child routes:
- deep cleaning;
- move-out cleaning;
- other currently active/indexable detailed-cleaning services.

### Severe / difficult-condition cleaning

Use only if current service state permits.

## Layout rhythm

Do not repeat the same split more than twice consecutively.

Example:
1. text left / image right;
2. image left / text right;
3. full-width image with text overlay;
4. compact routing list.

Content determines layout.

## Copy rule

Each service must answer:
- what condition it is for;
- why ordinary service may not fit;
- what outcome the customer is trying to reach.

Do not use fluffy adjectives.

---

# 14. SECTION — “THE PROPERTY CONDITION CHANGES THE WORK”

Use a simple editorial comparison.

No rounded comparison cards.

Possible structure:

| Routine cleaning | Aseptaclean project |
| --- | --- |
| Maintained condition | Condition-specific |
| Standard checklist | Defined scope |
| Predictable labor | Labor follows actual condition |
| Routine visit | Project / handoff |
| Limited contents decisions | May require client decisions and scope boundaries |

Only state what is operationally true.

---

# 15. PROJECT NOTES / PROOF ENGINE

## Strategic rule

Project Notes are the site's proof engine.

Do not fabricate case studies.

If there are no permissioned real projects ready for publication:
- keep the section compact;
- use real non-client operational evidence;
- or omit the section rather than filling it with fake work.

## Project Note structure

When real proof exists, each entry should include:

- property / context;
- location at appropriate privacy level;
- condition;
- key constraint;
- approved scope;
- exclusions;
- approach / sequence;
- outcome / handoff;
- real photographs;
- related service;
- related city where useful.

Do not use “case study” language if the content is simply a short factual field note.

## Visual format

Use large real images.

Avoid:
- testimonial card wall;
- fake before/after;
- stock imagery;
- AI-generated technician imagery.

---

# 16. COST / SCOPE CONTEXT

Do not build a fake instant calculator.

Use a simple editorial list / table.

Approved price drivers can include only what is supported by current operations:

- property condition;
- total size;
- affected areas;
- contents / removal volume;
- access / site logistics;
- labor;
- equipment;
- disposal / container coordination where applicable;
- schedule;
- detail level;
- separately approved additions.

If current published starting prices exist in approved site data and are intended to remain public, use them.

Do not invent prices.

---

# 17. FOUNDER / ACCOUNTABILITY

## Purpose

Aseptaclean cannot imitate Sevenson's century of history.

Its trust advantage should be:

- founder/operator accountability;
- direct scope control;
- clear boundaries;
- real operating process;
- honest fit decisions.

## Composition

Use:
- real founder/operator photo when available;
- image on one side;
- simple copy on the other.

No resume dump.

No invented experience claims.

Approved direction:

> Aseptaclean was built around a simple operating principle: understand the condition first, define the work clearly, and do not leave important scope decisions to assumption.

If the founder/operator image is unavailable, use a neutral placeholder in development and omit fake founder imagery in production.

---

# 18. FIT / BOUNDARIES

This is important.

Use a simple two-column comparison on desktop.

## Usually worth discussing

Examples:
- overwhelming family property;
- hoarding / accumulation within current boundaries;
- estate or property transition;
- severe-condition / detailed cleaning;
- current service geography;
- authorized decision-maker.

## May require another provider

Examples:
- regulated biohazard remediation not yet activated;
- structural demolition / contractor work;
- pest-control chemical application;
- work outside insurance / legal / operational scope.

Use actual current scope from the repository / master.

Do not imply future regulated services are active.

---

# 19. FAQ

Keep quiet.

No decorative card wrapper around every answer.

Use `<details>` / `<summary>` or existing accessible accordion pattern.

Real buyer questions only.

Examples:

- Do I need to know the right service name?
- Can you review a property from photos?
- What happens if additional work is found?
- Do I need to be at the property?
- What if part of the job is outside Aseptaclean's current scope?
- How are belongings / disposition decisions handled?

Do not use FAQ schema as a growth tactic merely for Google rich results.

---

# 20. FINAL CTA

Use the Interdoor-style logic:

**real image + large statement + simple CTA**

Not a giant lead form.

Suggested copy:

> **Tell us what is happening at the property.**

Supporting line:

> You do not need to know the service name. Send the property details and photos if available. We can determine whether it fits Aseptaclean's current scope and what the next step should be.

Button:
> Tell Us About the Property

Secondary:
> Call [phone]

Link to `/request-assessment/`.

---

# 21. FOOTER

Conventional corporate footer.

Use:
- Aseptaclean summary;
- service links;
- company links;
- service area;
- phone;
- legal links.

No giant marketing slogan.

No fake certifications.

No inactive social links.

No duplicated CTA band after the final CTA.

---

# 22. IMAGE POLICY

This is non-negotiable.

## Production proof hierarchy

Strongest:
1. real Aseptaclean project photography;
2. real equipment;
3. real vehicle;
4. real technician / operator;
5. real PPE / setup;
6. real operating document;
7. real before / after;
8. real Project Note.

Allowed with context:
- licensed editorial / environment imagery that is **not** presented as proof of Aseptaclean's completed work.

Avoid:
- AI-generated crew;
- AI-generated remediation;
- fake before / after;
- staged fake hazmat scenes;
- generic smiling cleaner stock;
- fake dashboard;
- fake scope document presented as actual client evidence.

## Required real-photo shot library

Build toward:

### Property context
Wide room / property view.

### Condition
What created the need for service.

### Process
Actual work.

### Detail
Surface / area / buildup / residue.

### Equipment
Actual setup and tools.

### Completion
Finished scope.

### Operator
Working, not posing.

### Documentation
Scope / checklist / handoff.

---

# 23. RESPONSIVE BEHAVIOR

The video reference provided desktop behavior only.

Do not claim tablet/mobile behavior was observed.

The following is the required Aseptaclean adaptation.

## 23.1 Desktop — 1280 / 1440

- full navigation visible;
- hero full-width;
- hero heading approximately 2–3 lines;
- 3 recognition images;
- alternating service split compositions;
- 4-column footer if content fits;
- sticky main navigation;
- utility row may scroll away.

## 23.2 Tablet — 768 / 1024

Do not simply make desktop smaller.

Target:

- horizontal nav collapses before crowding;
- hamburger by ~900–960px if necessary;
- hero remains image-led;
- hero headline ~48–58px;
- 3 recognition tiles become `2 + 1`;
- text/image service split can remain two-column at 1024 if readable;
- at 768 use 1-column or strong 45/55 split depending on content;
- section padding ~70–90px;
- gaps ~36–52px;
- footer 2 columns.

## 23.3 Mobile — 320 / 360 / 375 / 390 / 430

Header:
- logo left;
- menu right;
- utility row reduced to service area + phone or removed if it creates clutter;
- mobile menu must be keyboard accessible.

Hero:
- hero image remains substantial;
- H1 38–44px;
- no tiny photo strip;
- text remains left aligned;
- CTA full width or near full width;
- phone below CTA;
- no horizontal overflow.

Recognition:
- one image tile per row.

Services:
- one service composition at a time;
- choose text-first or image-first intentionally;
- do not mechanically alternate every section if it hurts mobile reading order.

Footer:
- one column.

Mobile sticky actions:
optional but recommended:
- `Call`
- `Tell Us About the Property`

Must:
- not cover form fields;
- not cover cookie controls;
- hide or change near conversion form if redundant.

---

# 24. FORM / REQUEST-ASSESSMENT BEHAVIOR

The detailed form remains on `/request-assessment/`.

Do not force service selection as the first question.

The user should be able to begin with:

- property city;
- contact information;
- what they are seeing;
- what needs to happen next;
- deadline / timing;
- photos.

Form implementation must include:

- validation;
- error state;
- success state;
- disabled / submitting state;
- upload state;
- wrong file type;
- oversize file handling;
- network failure;
- keyboard focus;
- accessible error association.

Preserve the existing lead endpoint unless a separate approved change is required.

---

# 25. INTERACTION / MOTION

The reference sites work because interaction is restrained.

Use:

### Buttons / links
`120–180ms`

### Menu / accordion
`180–260ms`

### Optional content reveal
`300–400ms` max

Avoid:
- parallax;
- scroll locking;
- text fly-ins;
- constant marquees;
- magnetic buttons;
- 3D;
- animated gradients;
- cursor gimmicks;
- scroll-triggering every section.

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove nonessential motion */
}
```

---

# 26. PERFORMANCE

Do not trade speed for design.

## Images

Hero:
- real responsive image or optimized local asset;
- use `srcset` / `sizes`;
- width/height attributes;
- hero may use eager load / `fetchpriority="high"` if appropriate.

Below fold:
- `loading="lazy"`;
- responsive sizes;
- AVIF/WebP where existing pipeline supports it.

Avoid background-image for every important content image if it harms responsive loading, alt text, or LCP optimization.

## JavaScript

Use Astro / native HTML/CSS wherever possible.

Do not add:
- animation library;
- slider library;
- UI component framework;
- Tailwind;
- React/Vue/Svelte

unless already present and necessary.

Do not introduce a new dependency to solve something native HTML/CSS can handle.

---

# 27. ACCESSIBILITY

Must pass:

- semantic headings;
- one meaningful H1;
- visible keyboard focus;
- meaningful alt text;
- decorative images empty alt if appropriate;
- keyboard operable menu;
- no hover-only critical information;
- sufficient text contrast;
- minimum 44px touch targets on mobile;
- correct form labels;
- accessible error states;
- skip link if existing shell supports it;
- reduced motion;
- 200% zoom without content loss.

Do not hide important explanatory copy only inside hover overlays on mobile.

---

# 28. SEO / ROUTE SAFETY

Do not modify route/indexation behavior while rebuilding the homepage unless specifically required.

Preserve:

- canonicals;
- robots;
- sitemap logic;
- redirects;
- current noindex routes;
- schema behavior;
- service-area config;
- lead endpoint.

Do not surface hard-gated future routes.

Do not add human-biohazard service pages or claims before the separate activation gate clears.

Do not create new city pages.

Do not mass-generate service × city pages.

The homepage should route into existing legitimate search pages.

---

# 29. CURRENT CODEBASE SOURCE-OF-TRUTH MAP

Before editing, inspect:

- `src/pages/`
- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ServicePageLayout.astro`
- `src/components/`
- `src/data/site.ts`
- `src/data/doc27ServicePages.ts`
- `src/data/servicePages.ts`
- `src/data/doc27CompanyPages.ts`
- `src/pages/sitemap.xml.ts`
- `public/_redirects`
- `functions/api/lead.ts`

Do not assume filenames that do not exist.

If the repository differs from the above, report the actual structure before proceeding.

---

# 30. IMPLEMENTATION ARCHITECTURE

Prefer small semantic Astro components where useful, but do not create a component system that forces visual uniformity.

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

Important:

A reusable component may support layout variants, but **do not render every service as the exact same card** merely because a component exists.

Implementation reuse is allowed.

Visual sameness is not required.

---

# 31. DATA / CONTENT RULE

Do not hard-code claims that already belong in data modules.

Where the repository already stores:
- phone;
- service area;
- service names;
- URLs;
- page state;
- indexation / route props;
- service availability;

reuse those values.

Do not duplicate them in multiple components.

For copy that is currently approved only in the master specification, place it in a sensible homepage content/data module if the current architecture supports that pattern.

---

# 32. NO-INVENTION LIST

Codex must not invent:

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
- real-project photography;
- regulated human-biohazard services.

If uncertain, omit.

---

# 33. COPY RULES

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

# 34. BUILD SEQUENCE

Do not rebuild the entire site at once.

## Phase 0 — Audit

Before changing files:

1. Run the site locally.
2. Identify the real current homepage files/components/styles.
3. Record current routes and indexation behavior.
4. Record the current global tokens / CSS.
5. Record current nav behavior.
6. Record current lead CTA path.
7. Capture baseline screenshots at:
   - 390
   - 768
   - 1024
   - 1440
8. Identify CSS that is currently causing generic card/repetition patterns.

Return a short audit summary before major structural edits if operating interactively.

## Phase 1 — Global shell

Implement/refine:

- utility row;
- main navigation;
- responsive menu;
- existing footer if needed.

Do not break other routes.

## Phase 2 — Hero

Build the image-led hero and verify desktop/mobile wrapping.

## Phase 3 — Recognition

Build the 3 image-led condition routes.

## Phase 4 — Scope section

Build the quieter content section.

## Phase 5 — Services

Implement image-led service compositions using current active services only.

## Phase 6 — Proof / cost / accountability / fit

Add only with real supported content.

## Phase 7 — Final CTA

Use image + copy + route to `/request-assessment/`.

## Phase 8 — QA

Run full responsive / accessibility / performance review.

---

# 35. REQUIRED VIEWPORT QA

Test manually or with browser screenshots at:

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

- 200% browser zoom;
- keyboard navigation;
- reduced-motion mode;
- slow network / image loading;
- JS disabled where practical for core content;
- very long location/service names;
- form errors;
- mobile landscape if time permits.

There must be **zero horizontal page overflow**.

---

# 36. HEADING / WRAPPING QA

For every major heading check:

- no single dangling word unless intentional;
- no ugly 1-word final line on mobile if a reasonable width adjustment can prevent it;
- no collision with image;
- no clipping at 320px;
- no manual break that becomes ugly at another viewport;
- no excessive H1 shrinking.

Hero H1 target:

Desktop:
- 2–3 lines.

Tablet:
- 2–4 lines.

Mobile:
- 3–5 lines.

Do not allow the design to fail because the exact browser width differs from the designer's screenshot.

---

# 37. POST-BUILD ANTI-AI SELF-CRITIQUE

After implementation, Codex must explicitly answer these questions:

## Logo-swap test

Could a generic restoration/cleaning company replace the Aseptaclean logo and leave 90% of the homepage unchanged?

If yes:
- identify the generic sections;
- make them more specific to Aseptaclean.

## Silhouette test

Blur/squint at the page.

Does it look like:
hero → equal cards → equal cards → CTA?

If yes:
- change composition hierarchy.

## Card test

List every card/grid row.

For each:
- why is a card the correct semantic form?
- if there is no good answer, remove the card treatment.

## Section-repeat test

How many sections use:

eyebrow → H2 → paragraph → 3-column grid?

If more than two:
- redesign the repeated composition.

## Evidence test

Which sections contain actual business evidence?

If none:
- do not fake it;
- flag the missing real-world assets required.

## Copy test

Identify any sentence that a competitor could use unchanged.

Rewrite or flag it.

## Mobile test

At 390px can the visitor identify:

1. who Aseptaclean helps;
2. what kind of property conditions may fit;
3. why this is not routine cleaning;
4. what happens next;
5. what to click?

If not:
- revise hierarchy.

---

# 38. ACCEPTANCE CRITERIA

The homepage is not approved merely because it compiles.

It must satisfy all of the following.

## Strategy

- family decision-maker is clearly primary;
- no forced technical service choice above fold;
- primary CTA is `Tell Us About the Property`;
- current lawful scope only;
- future biohazard not prematurely marketed.

## Visual

- real-company environmental-services feel;
- large image moments;
- clear hierarchy;
- restrained palette;
- no gradients / glow / glassmorphism;
- no card farm;
- no icon wall;
- no fake compliance graphics;
- no dashboard aesthetic;
- no stock/AIGC presented as real Aseptaclean proof.

## Layout

- different sections use motivated compositions;
- service sections are image-led;
- spacing varies by importance;
- no repetitive 80px-section stack;
- desktop and mobile feel intentionally composed.

## Behavior

- sticky nav works;
- mobile nav works;
- keyboard access works;
- no hover-only critical content;
- responsive images behave;
- no layout shifts caused by missing image dimensions.

## Technical

- existing SEO/indexation behavior preserved;
- no route regressions;
- no broken internal links;
- no horizontal overflow;
- no console errors;
- no new unnecessary dependencies.

## Content

- no invented proof;
- no invented credentials;
- no fake statistics;
- no false service claims;
- copy is factual and business-specific.

---

# 39. FINAL DELIVERABLES FROM CODEX

After implementing, return:

1. **Files changed**
2. **What changed visually**
3. **What existing logic was intentionally preserved**
4. **Any claims/assets omitted because they were not verifiable**
5. **Any real Aseptaclean photos/assets still needed**
6. **Screenshots at**
   - 390px
   - 768px
   - 1024px
   - 1440px
7. **Responsive issues found and fixed**
8. **Accessibility issues found and fixed**
9. **Performance issues found and fixed**
10. **Anti-AI self-critique**
11. **Any remaining launch blockers**

Do not finish with “looks good.”

Explain what was verified.

---

# 40. DO NOT DO THESE THINGS

Do not:

- redesign every public route;
- rewrite the entire sitemap;
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
- create a government-portal look;
- use hazard yellow as a theme;
- create fake compliance/certification bars;
- add a giant hero form;
- hide critical copy in hover effects;
- turn the homepage into a technical manual;
- copy Interdoor or Sevenson pixel-for-pixel.

Borrow their **design logic**, not their branding.

---

# 41. TARGET OUTCOME

The finished homepage should feel like:

> **A real South Bay specialty property company with disciplined operations, clear boundaries, strong visual evidence, and a credible path toward more advanced remediation work.**

It should not try to look large.

It should look **specific, controlled, accountable, and real**.

The design should become stronger automatically as Aseptaclean accumulates:

- real properties;
- real project photographs;
- real equipment;
- real vehicle;
- real people;
- real Project Notes;
- real reviews;
- real regulated-service credentials after activation.

The visual system must be designed to hold that proof rather than simulate it.
