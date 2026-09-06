# ASEPTACLEAN — WEBSITE MASTER SPECIFICATION
## Canonical Site Architecture, Design System, Conversion, SEO, Content & Codex Build Standard

**Canonical repository path:** `docs/30-WEBSITE-MASTER-SPEC.md`  
**Status date:** August 25, 2026  
**Status:** ACTIVE — SITEWIDE GOVERNING WEBSITE STANDARD  
**Supersedes:** prior homepage rebuild briefs, standalone Sevenson homepage briefs, older website-design directions, obsolete mockup-port instructions, and prior homepage section-order specifications where they conflict with this document.

> **This is the one website strategy/design MD.**
>
> Do not create another page-specific design brief merely because a page needs work.  
> Page-specific implementation decisions belong in code, approved copy/data, issue notes, or the working prompt—not another competing website-standard document.

---

# 0. READ THIS FIRST

The website must do three things at the same time:

1. **Convert one primary buyer extremely well.**
2. **Capture legitimate service and local search intent without becoming a page factory.**
3. **Look and feel like a real Aseptaclean field operation—not a generic AI-generated local-service website.**

The governing design principle is:

> **What does this page need the visitor to understand, trust, navigate, or do?**

Design follows that answer.

Aseptaclean is **not** being redesigned merely to resemble another company.

Instead:

> **Sevenson is the primary benchmark for operating-company seriousness, restraint, photography, and environmental-services credibility. Aseptaclean's own buyer journey, services, proof, operating method, geography, and content determine the actual page layouts.**

---

# 1. AUTHORITY / PRECEDENCE

**Current owner correction — August 25, 2026:** Rodent-droppings cleanup,
animal-waste cleanup, and pigeon-droppings cleanup are not operationally gated.
The relevant current gate is TSWMP-dependent work. A route's `noindex` state
must not be treated as proof that the underlying service is unavailable.

Codex must not invent a new authority chain.

When sources conflict, use this order.

## 1.1 Business / legal / claims truth

1. Explicit current owner decision
2. Current verified legal / insurance / regulatory facts
3. Current active claims authority in the repository
4. Current shared business data (`src/data/site.ts` or the actual equivalent)

Do not allow a design document to activate a claim or service.

## 1.2 Exact public copy

Use specifically approved/locked route copy where the repository or approved copy authority marks it as locked.

This master specification defines **strategy and design**, not permission to overwrite locked public copy casually.

## 1.3 Website strategy / design / UX / SEO

This document governs.

## 1.4 Technical implementation truth

The current Astro repository governs what actually exists:

- routes;
- components;
- data modules;
- indexation;
- redirects;
- canonical behavior;
- lead endpoint;
- form mechanics;
- schema;
- deployment configuration.

If this document describes a route or file differently from the live repository, **inspect the repository before editing**.

## 1.5 Historical documents

Older homepage prompts, mockup-port prompts, changelogs, design experiments, archived plans, and superseded MDs are not design authority.

---

# 2. SOURCE BASIS

This standard consolidates the strongest useful conclusions from:

- the verified Aseptaclean route/indexation architecture;
- the family-decision-maker strategy;
- the August 25 homepage audit;
- the humanized-AI website research;
- **The Only Web Design Video You Will Ever Need**;
- **Brutally Honest Advice About Web Design in 9 mins**;
- the Alex Hormozi / CRO web-design source;
- the 2026 human-first web-design source;
- Sevenson Environmental Services as the **primary industry/visual benchmark**;
- Interdoor as a **secondary spacing / image-rhythm reference**;
- the existing Astro codebase as technical truth;
- **ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md** as the service-page sales/copy system, subject to current route, claims, pricing, and publication gates.

Do not imitate a source's brand, copy, claims, scale, or proof.

Extract principles.

---

# 3. PRIMARY CUSTOMER

The global conversion system is designed primarily for:

> **The adult child or family decision-maker who has become responsible for an aging parent or relative's cluttered, neglected, heavily soiled, or otherwise overwhelming property and needs to get the situation under control.**

Common triggers can include:

- hospital discharge / return home;
- assisted-living or senior-community transition;
- estate or family transition;
- preparing a property for sale;
- discovering a property is worse than expected;
- a move-out or handoff deadline;
- ordinary cleaning proving insufficient;
- pest activity revealing a larger property-condition problem.

The buyer's real job:

> **“I need someone competent to help me get this property under control, tell me what actually needs to happen, and not create a bigger problem while doing it.”**

## Important distinction

**One primary customer does not mean one keyword or one page.**

Use:

```text
ONE PRIMARY BUYER
        ↓
ONE PRIMARY DECISION SYSTEM
        ↓
MULTIPLE LEGITIMATE SEARCH ENTRY POINTS
        ↓
SAME TRUST / RISK-REDUCTION LOGIC
```

A visitor can enter through a service page, city page, resource, About, or homepage.

The page must first satisfy the visitor's immediate intent, then connect them to the same Aseptaclean decision system.

---

# 4. PRIMARY CONVERSION SYSTEM

Primary visible CTA:

> **Tell Us About the Property**

Technical destination:

`/request-assessment/`

unless the current repository proves otherwise.

Secondary actions:

- call;
- relevant page-specific navigation;
- text/photo action only where it is truly useful.

Do not make three actions visually equal.

## CTA rule from the design research

Do **not** repeat the same primary button after every section.

Use CTAs according to context.

Examples:

- capability section → **View Hoarding Cleanup**
- method section → **See How We Work**
- About section → **About Aseptaclean**
- conversion moment → **Tell Us About the Property**

The primary conversion should remain easy to reach, but the page must not feel like a button farm.

---

# 5. CRO / BUSINESS-FIRST DESIGN DOCTRINE

The website is not successful merely because it looks expensive.

The design sources consistently support:

- clarity before decoration;
- above-the-fold comprehension;
- strong hierarchy;
- real imagery;
- low friction;
- proof near decision points;
- fewer high-leverage changes instead of endless redesign;
- outcomes before feature lists;
- reducing perceived risk and effort;
- fast performance;
- customer-first information order.

## 5.1 Five-second requirement

An unfamiliar visitor should be able to determine quickly:

1. What does this company handle?
2. Is this relevant to my situation?
3. Why might this be different from ordinary cleaning?
4. What should I do next?

## 5.2 Above-the-fold priority

The hero receives disproportionate attention because every visitor sees it.

When conversion testing begins, prioritize:

1. headline;
2. primary hero image;
3. supporting line / CTA only when evidence suggests they are the constraint.

Do not redesign twenty sections to avoid testing the top of the page.

## 5.3 Risk reduction

Aseptaclean currently cannot rely on fabricated scale, review volume, or decades of projects.

Risk reduction must come from real mechanisms:

- clear scope;
- fit before sale;
- belongings / disposition control;
- change approval;
- documented handoff;
- truthful boundaries;
- direct operator accountability;
- real evidence as it accumulates.

---

# 6. SITEWIDE VISUAL DIRECTION

## 6.1 Primary reference — Sevenson

Reference:

`https://sevenson.com/`

Sevenson defines the target **class of website**, not a template to clone.

Borrow:

- serious environmental-services posture;
- conventional corporate usability;
- lean navigation hierarchy;
- large real project/field photography;
- blue / white / neutral restraint;
- simple type;
- factual capability language;
- photography doing visual work;
- corporate credibility without startup decoration;
- real operational proof;
- understated interaction;
- page structures appropriate to actual information.

Do NOT borrow:

- claims;
- history;
- project scale;
- client names;
- federal authority;
- credentials;
- exact layouts;
- exact typography;
- exact components;
- wording.

## 6.2 Secondary reference — Interdoor

Reference:

`https://www.interdoor.uk/`

Use selectively for:

- image-led routing;
- wide photographic panels;
- clean section transitions;
- negative space;
- modern crop treatment;
- restrained final-CTA composition.

Interdoor must not overtake Sevenson as the site personality.

## 6.3 Aseptaclean identity

The final site should feel like:

> **A serious South Bay specialty property-cleanup operator with environmental-services discipline and room to grow naturally into future regulated remediation work—without pretending those future capabilities are active today.**

It should NOT feel like:

- maid service;
- junk-hauling franchise;
- luxury lifestyle brand;
- SaaS;
- architecture firm;
- design agency;
- government portal;
- military command dashboard;
- theatrical hazmat company;
- fake laboratory;
- generic restoration template;
- AI component-library demo.

---

# 7. HUMAN-FIRST / ANTI-AI DOCTRINE

AI is the implementer.

AI is not the art director.

The problem is not that AI touched the site.

The problem is **generated-by-default design**.

## 7.1 Common default patterns to reject

Do not automatically use:

- centered hero + two buttons;
- pill eyebrow labels;
- gradient blobs;
- glassmorphism;
- 20–32px radii;
- shadow on every container;
- 3 equal cards after every heading;
- icon-in-circle feature rows;
- repeated white/light-gray bands;
- one identical spacing rhythm;
- generic testimonial slider;
- giant FAQ section on every page;
- generic CTA band;
- identical service-page templates;
- generic stock cleaners;
- AI-generated crew as evidence.

## 7.2 HUMANIZED system

### H — Hierarchy

Every page needs:

- one dominant idea;
- 2–4 secondary ideas;
- supporting detail.

Not eleven equally important sections.

### U — Unique evidence

Prefer:

- real photos;
- real operating mechanisms;
- real numbers;
- real boundaries;
- real project facts;
- real artifacts;
- real observations;
- real customer language.

### M — Motivated composition

Every major composition must answer:

> **Why is this information shown this way?**

“Because the component already existed” is not an answer.

### A — Authentic language

Use:

- customer vocabulary;
- operator vocabulary;
- specific verbs;
- concrete nouns;
- actual conditions.

### N — Natural rhythm

Use variation in:

- density;
- section height;
- image scale;
- copy length;
- composition.

Maintain a coherent system.

### I — Imperfect reality

Professionally present real:

- people;
- properties;
- work;
- equipment;
- documents;
- constraints.

Do not simulate perfection.

### Z — Zero-default discipline

Explicitly reject arbitrary:

- cards;
- gradients;
- icons;
- stock;
- section orders;
- generic marketing filler.

### E — Edge-case completeness

Build:

- loading;
- error;
- empty;
- validation;
- success;
- 404;
- keyboard;
- small screen;
- long-label;
- upload states.

### D — Deliberate consistency

Keep consistent:

- typography;
- colors;
- grid;
- buttons;
- inputs;
- spacing scale;
- interactions.

Vary:

- composition;
- narrative;
- photo role;
- density;
- page hierarchy.

---

# 8. DESIGN TOKENS / VISUAL SYSTEM

Use existing repository tokens when they already represent approved Aseptaclean brand decisions.

Do not create a second token system without need.

## 8.1 Palette

Preferred existing palette:

- Deep Navy: `#122840`
- Navy: `#1C355E`
- Slate Blue: `#6A9BC3`
- Steel: `#A8B8C8`
- Warm White: `#F7F8FA`
- Body / Slate: `#334155`
- White: `#FFFFFF`

Use color for hierarchy and action.

Do not make every section blue.

Avoid decorative gradients.

Semantic success/error/warning colors may exist for forms and states.

## 8.2 Typography

Use the existing approved site type stack.

If current implementation uses Inter Variable correctly, retain it.

Readability beats personality.

### Global targets

Desktop:

- H1: generally `42–52px`
- H2: generally `34–42px`
- H3: `24–30px`
- large body: `18–20px`
- body: `16–18px`

Mobile:

- H1: generally `36–42px`
- H2: `30–36px`
- H3: `22–27px`
- body: `16–17px`

These are ranges, not permission to make every H1 identical.

Service pages may use smaller, more conventional headings than a homepage.

Avoid typography being used as a substitute for missing photography.

## 8.3 Wrapping

Use when useful:

```css
text-wrap: balance;
text-wrap: pretty;
```

Avoid manual `<br>` tags unless editorially necessary and tested.

Fix wrapping in this order:

1. container width;
2. grid allocation;
3. max-width;
4. measure;
5. tracking;
6. font size only when necessary.

## 8.4 Radius / shadows

Default:

- square;
- or small radius `0–8px`.

Use larger radii only when an actual component needs them.

Avoid generic card shadows.

## 8.5 Buttons

Rectangular, obvious, conventional.

Primary:

- navy;
- white type.

On dark/image backgrounds:

- white button;
- navy type.

Minimum mobile touch target:

`44x44px`.

No glowing or magnetic buttons.

## 8.6 Grid

Desktop:

- 12-column mental model;
- main content ~`1180–1320px`;
- wide media ~`1360–1460px`;
- reading measure ~`620–720px`;
- gutters `24–32px`.

Tablet:

- 6–8 column mental model;
- side padding `26–32px`.

Mobile:

- 1–2 column layout;
- side padding `18–22px`.

The header may use a wider container than body copy.

## 8.7 Spacing

Use three rhythms.

Compact:

`48–64px`

Standard:

`80–104px`

Feature:

`112–144px`

Do not assign every section the same padding.

---

# 9. SITEWIDE HEADER

Target:

```text
SMALL UTILITY ROW
WHITE MAIN NAV
PAGE CONTENT
```

## Utility row

Small and quiet.

Use factual information only.

Possible:

- specialty property-cleaning descriptor;
- phone.

Do not add fake availability or credentials.

## Main navigation

White background.

Desktop:

- logo left;
- clear navigation;
- CTA right.

Likely labels:

- What We Handle
- Services
- How We Work
- About
- Service Areas
- Tell Us About the Property

Use actual route destinations.

`How We Work` may route to the current method/handoff page rather than inventing a new URL.

## Header sizing

Desktop target:

- utility `28–34px`;
- main nav `64–72px`;
- combined roughly `95–105px`.

Use horizontal width.

Do not create a giant header.

## Tablet

Do not collapse merely because viewport reaches 1024.

First:

- remove duplicate phone;
- tighten nav gaps;
- reduce secondary information.

Collapse only when it no longer fits comfortably.

## Mobile

Logo left.

Menu right.

Primary conversion visible in the menu.

No hover dependency.

---

# 10. SITEWIDE FOOTER

Conventional corporate footer.

Include only useful current links.

Groups can include:

- services;
- company;
- service areas;
- contact;
- legal.

Avoid:

- fake social accounts;
- fake certifications;
- repeated primary destination under multiple labels;
- giant final sales pitch after the real final CTA.

---

# 11. PHOTOGRAPHY SYSTEM

Photography is a **structural design element**.

It is not decoration added after layout.

## 11.1 Proof hierarchy

Strongest:

1. actual Aseptaclean project photography;
2. real before / during / after;
3. real operator;
4. real equipment;
5. real vehicle;
6. real property condition;
7. real documentation;
8. real scope / handoff artifact;
9. real client-authorized quote.

## 11.2 Temporary development imagery

Allowed to judge the design.

It must:

- be properly licensed;
- be documented as temporary;
- not imply completed Aseptaclean work.

## 11.3 Never fabricate evidence

Do not use:

- AI-generated technicians;
- AI-generated founder;
- fake remediation scenes;
- fake hoarding cleanup;
- fake before/after;
- fake job sites;
- fake client documents;
- fake reviews.

## 11.4 Future capture plan

Prioritize:

1. strong residential hero context;
2. three service/condition photos;
3. founder/operator at work;
4. one complete before/during/after project;
5. equipment;
6. vehicle;
7. real handoff record;
8. real Project Notes.

---

# 12. COPY SYSTEM

People skim.

Write for scanning.

Every word must earn its place.

## 12.1 Voice

Copy should be:

- plain;
- concrete;
- factual;
- calm;
- direct;
- low reading burden.

Do not make copy childish.

Use short sentences because clarity is valuable, not because the audience is incapable.

## 12.2 Ban generic filler

Avoid language such as:

- exceptional service;
- unmatched quality;
- tailored solutions;
- trusted partner;
- seamless;
- experience the difference;
- peace of mind;
- go above and beyond;
- every project is unique;
- innovative;
- cutting edge;
- elevate;
- empower.

Replace adjectives with mechanisms.

Bad:

> Transparent pricing.

Better:

> The written scope identifies what is included before work begins. Material additions are approved separately.

## 12.3 Competitor-language test

If another cleaning/restoration business can use a sentence unchanged, rewrite or remove it.

## 12.4 Evidence density

Do not judge page quality by word count alone.

Ask:

> **How much real evidence is present per screen?**

Evidence can include:

- exact property condition;
- specific material;
- real photo;
- scope boundary;
- operating artifact;
- real project example;
- location fact;
- process detail;
- real result;
- real number.

---

# 13. MOTION / INTERACTION

Motion must communicate or provide feedback.

Allowed:

- button states;
- navigation dropdown;
- mobile menu;
- accordion;
- subtle image hover;
- small meaningful reveal.

Typical timing:

- button/link: `120–200ms`;
- dropdown/accordion: `180–280ms`;
- meaningful reveal: `300–500ms`.

Avoid:

- parallax everywhere;
- cursor effects;
- perpetual animation;
- giant scroll transformations;
- animated gradients;
- 3D for decoration;
- motion that becomes more noticeable than the content.

Respect `prefers-reduced-motion`.

---

# 14. MOBILE-FIRST RULE

Do not build desktop and merely stack it.

The mobile experience must feel designed for mobile using the same content.

At mobile, Codex may:

- remove nonessential desktop elements;
- change image order;
- shorten navigation;
- restructure comparisons;
- alter section spacing;
- change CTA hierarchy.

Do not hide critical information behind hover.

Required visual QA widths:

- 320
- 360
- 375
- 390
- 430
- 768
- 1024
- 1280
- 1440

Also test 200% zoom.

---

# 15. CURRENT ROUTE SNAPSHOT

**Important:** This is the latest planning snapshot, not permission to override the repository.

Before a sitewide implementation pass, Codex must compare this table against `src/pages/`, route data, robots/indexation props, and sitemap output.

| Route | Type | Snapshot search state | Role |
|---|---|---:|---|
| `/` | Home | index+sitemap | Primary family-decision conversion |
| `/about/` | Company | index+sitemap | Accountability / company |
| `/contact/` | Contact | index+sitemap | Direct contact |
| `/faq/` | Resource | index+sitemap | Buyer questions |
| `/handoff-standard/` | Method | index+sitemap | How the work is controlled / handed off |
| `/services/` | Service hub | index+sitemap | Service routing |
| `/who-we-help/` | Audience hub | index+sitemap | Situation / decision-maker routing |
| `/service-areas/` | Local hub | index+sitemap | Geography routing |
| `/detailed-cleaning/` | Service family | index+sitemap | Detailed-cleaning family |
| `/deep-cleaning-san-jose/` | Service | index+sitemap | Detailed/deep cleaning |
| `/move-out-cleaning-san-jose/` | Service | index+sitemap | Move-out / turnover |
| `/post-construction-cleaning-san-jose/` | Service | noindex | Gated |
| `/window-cleaning-san-jose/` | Service | noindex | Gated |
| `/specialty-cleaning/` | Service family | noindex | Gated |
| `/extreme-cleaning-san-jose/` | Service | index+sitemap | Severe-condition cleaning |
| `/animal-waste-cleanup-san-jose/` | Service | noindex | **Operationally available; route publication/indexation still controlled separately** |
| `/rodent-dropping-cleanup-san-jose/` | Service | noindex | **Operationally available; route publication/indexation still controlled separately** |
| `/pigeon-dropping-cleanup-san-jose/` | Service | noindex | **Operationally available; route publication/indexation still controlled separately** |
| `/property-clearing/` | Service family | index+sitemap | Complex Property Cleanup family |
| `/property-cleanouts-san-jose/` | Service | index+sitemap | Property cleanouts |
| `/hoarding-cleanup-san-jose/` | Service | index+sitemap | Gold-standard service-page candidate |
| `/estate-cleanout-san-jose/` | Service | index+sitemap | Estate cleanouts |
| `/debris-removal-san-jose/` | Service | index+sitemap | On-site debris cleanup / coordination |
| `/eviction-cleanout-san-jose/` | Service | noindex | Gated |
| `/commercial-cleaning-san-jose/` | Service | noindex | Gated |
| `/senior-downsizing-san-jose/` | Audience/service | noindex | Gated |
| `/estate-cleanout-checklist/` | Resource | index+sitemap | Search / lead-support content |
| `/private-residence-reset/` | Offer/campaign | index+sitemap | Distinct premium offer |
| `/request-assessment/` | Conversion | index+sitemap | Primary lead form |
| `/thank-you/` | Utility | noindex | Submission success |
| `/projects/` | Proof | noindex | Project Notes when real evidence exists |
| `/data-request/` | Legal utility | noindex | Privacy workflow |
| `/privacy/` | Legal | index+sitemap | Privacy |
| `/terms/` | Legal | index+sitemap | Terms |
| `/cookie-policy/` | Legal | index+sitemap | Cookies |
| `/sms-notification-consent/` | Protected utility | index / no sitemap | Carrier-review page |
| `/service-areas/mountain-view/` | City hub | noindex | Publication-gated |
| `/service-areas/sunnyvale/` | City hub | noindex | Publication-gated |
| `/service-areas/campbell/` | City hub | noindex | Publication-gated |
| `/service-areas/mountain-view/hoarding-cleanup/` | Service × city | noindex | Publication-gated |
| `/service-areas/mountain-view/estate-cleanout/` | Service × city | noindex | Publication-gated |
| `/service-areas/sunnyvale/hoarding-cleanup/` | Service × city | noindex | Publication-gated |
| `/service-areas/sunnyvale/estate-cleanout/` | Service × city | noindex | Publication-gated |
| `/service-areas/campbell/hoarding-cleanup/` | Service × city | noindex | Publication-gated |
| `/service-areas/campbell/estate-cleanout/` | Service × city | noindex | Publication-gated |
| `/404` | Error | noindex | Error state |

Do not infer from `noindex` that a route should be deleted.

Do not infer from route existence that a service is ready to market.

---

# 16. PAGE-FAMILY PRINCIPLE

The entire site should share one visual DNA.

It should **not** share one layout.

Every page family has a different job.

The content determines the composition.

This is required to prevent AI-template repetition.

---

# 17. HOMEPAGE — `/`

## Job

Make the primary family decision-maker recognize the situation, understand Aseptaclean's capability, see one meaningful differentiator/evidence mechanism, and know what to do next.

The homepage is **not** the entire business plan.

## Target architecture — updated 2026-09-03

**This section was stale.** It previously described the 2026-08-25 five-section reduction
verbatim. `docs/05-DECISIONS-LOG.md`, "Homepage section count reopened; the 2026-08-25 V3 lean
cut is superseded for composition only" (2026-09-03) is a later, equally-authoritative owner
decision revising the section count and composition specifically; that entry flagged this
section as needing its own edit to match, which this is. The architecture below is current.

```text
UTILITY
LEAN NAV

01 FULL-WIDTH PHOTOGRAPHIC HERO
   ~620-680px, flat navy overlay, left-aligned copy, one primary CTA

02 TRUST STRIP
   thin proof strip immediately below the hero — only currently verified proof

03 FIRST AUTHORITY SPLIT
   large image/copy section, image ~50-55% of the section, image left

04 SERVICES INTRO
   compact, centered, no service content inside it

05 SERVICE PHOTOGRAPHY
   large photographic service routing, no icons, no small equal cards —
   3 + 2 layout across the current public service routes

06 DARK REFRAME
   full-width photographic or solid navy visual break

07 PROCESS
   four-step process, large numerals, no cards

08 REGULATED / AUTHORITY SPLIT
   a major credibility section on operating boundaries/scope — large image/copy split

09 FOUNDER
   copy-only unless a real founder photograph exists — never a fabricated or stock portrait
   presented as the founder

10 SERVICE AREA
   two columns — an original geography graphic (never a copied reference-site map) and the
   real city list

11 FAQ
   the existing homepage question set, centered, max-width ~850px

12 FINAL CTA
   deep navy, large, quiet finish

FOOTER
```

## Hero

Sevenson-like structure:

- full-width photograph;
- flat dark overlay;
- left-aligned copy;
- one primary CTA plus one secondary text link.

Do not put the form in the hero.

## Trust strip

Thin proof strip, immediately below the hero. Show only currently verified proof — gate any
claim (e.g. "Insured") on the same insurance-verification signal every other surface on the site
already reads, exactly as `CredentialBar.astro` does. Never fabricate a badge or credential that
is not already stated elsewhere on the site.

## Service photography

This replaces duplicate recognition + giant service sections. Large photographic modules, not
icons and not small equal cards. Represent the current public service routes — every route
already public/indexable in `launchArchitecture.ts` may appear; do not expose a gated route.

## Differentiation / regulated authority split

Explain only the useful distinctions — maintained routine cleaning vs. condition-specific
project; defined scope; handoff; where Aseptaclean's responsibility begins and ends. Do not
create a giant process register here — that is the process section's job. Regulated-credential
content (e.g. TSWMP/TSW #933) may only appear on routes and cross-links `AGENTS.md` §3
explicitly authorizes for that credential; if the homepage is not on that list, use the
site's other honest-boundary/scope copy instead of introducing an unauthorized credential claim.

## Process

Four steps, large numerals, thin connecting rule, no icons, no cards.

## Founder

Copy-only unless a real, currently-approved founder photograph exists in the repository — never
a stock or fabricated portrait presented as the founder. Carry the mandatory founder-authority-
limit clause (doc 21 §2.4) verbatim wherever the founder's background appears.

## Service area

Two columns: an original geography graphic (never a graphic copied from a reference site) paired
with the real service-area city list. Not a directory of city buttons.

## Final CTA / operating evidence

Concentrate trust into substantial movements rather than scattering many small proof elements.
No empty founder-photo box. No fake Project Notes. No fabricated review, statistic, or
before/after.

## Excluded standalone homepage sections

Do not restore independent:

- long Cost section;
- Fit/Boundaries exclusion list (stays on `/services/`);
- a second, larger FAQ (the homepage keeps its own shorter set; `/faq/` remains the standalone
  full list);
- separate service directory beyond the routing grid;
- separate Clear Scope section beyond the authority split;
- project placeholder;
- homepage lead form.

Useful depth belongs deeper.

---

# 18. SERVICES HUB — `/services/`

## Job

Help a visitor understand the current service families and get to the correct active service without overwhelming them.

Use the **problem-chooser + active-directory** logic in Section 20A.20. Do not hard-code gated services into the public chooser merely because approved future copy exists.

## Visual direction

More conventional than homepage.

Use:

- service-family photography;
- short family descriptions;
- clear routing;
- service-state truth.

Avoid a giant grid of 12 identical cards.

## Suggested architecture

```text
SERVICE-HUB HERO
short intro + relevant field image

PRIMARY SERVICE FAMILIES
large image-led family treatments

ACTIVE SERVICES
structured text routing grouped by family

HOW TO CHOOSE
short situation-based guidance

METHOD / SCOPE LINK
one operating mechanism

ASSESSMENT CTA
```

If a service is gated, do not present it as active simply to fill the page.

---

# 19. SERVICE-FAMILY HUBS
Examples:
- `/property-clearing/`
- `/detailed-cleaning/`
- future/public `/specialty-cleaning/` only when active

## Job

Explain the family and route into child services.

## Design

Use one major photographic opening.

Then use a mix of:

- feature service;
- secondary service list;
- short decision guidance;
- related evidence.

Do not turn every child service into an equal square card.

One or two high-priority services may receive much more visual weight.

---

# 20. INDIVIDUAL SERVICE PAGES

Examples include:

- `/hoarding-cleanup-san-jose/`
- `/estate-cleanout-san-jose/`
- `/property-cleanouts-san-jose/`
- `/deep-cleaning-san-jose/`
- `/move-out-cleaning-san-jose/`
- `/extreme-cleaning-san-jose/`

## Job

Answer a specific high-intent search/customer question thoroughly enough that the visitor does not have to return to the homepage to understand the service.

Section **20A — Service Landing Page Conversion System** governs the service-specific sales argument, service CTA, educational idea, proof pattern, qualification logic, assessment branching, and reconciliation with current route/gate truth.

## Required questions

Every service page should answer:

1. Is this my situation?
2. What does Aseptaclean mean by this service?
3. What can the work include?
4. What can change the scope?
5. What does the client control?
6. What is outside scope?
7. How is price/scope determined?
8. What evidence exists?
9. What happens next?

## Composition principle

Do not use one universal service-page visual template.

A strong service page may use:

```text
WIDE SERVICE HERO

CONDITION / RECOGNITION
text + real image

WHAT THE WORK CAN INCLUDE
structured list / annotated image / artifact

WHY CONDITION MATTERS
large text-image comparison

CLIENT CONTROL / BOUNDARIES
quiet structured content

REAL EVIDENCE
photo / Project Note / artifact when available

COST / SCOPE
editorial list, not pricing cards

RELATED SERVICES

CTA
```

But composition should change when content demands it.

## Gold standard

Use `/hoarding-cleanup-san-jose/` as the first fully governed service-page implementation.

After it works, apply principles—not exact markup—to the next service pages.

---


# 20A. SERVICE LANDING PAGE CONVERSION SYSTEM

This section incorporates the useful service-page strategy from
`ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` into the canonical website
standard.

The landing-page source is valuable because it gives each service a distinct
sales argument, condition-recognition sequence, educational content,
qualification logic, service-specific CTAs, and real-proof requirements.

It must **not** be copied into production without reconciliation.

The current repository, decisions log, route state, claims authority, pricing
rules, and publication gates still win.

---

## 20A.1 THE MOST IMPORTANT RECONCILIATION RULE

The service landing-page source contains **content ideas and copy**.

It does NOT independently authorize:

- a new route;
- a route rename;
- an indexation change;
- a gated service launch;
- a new public price;
- a new health/safety claim;
- a new credential;
- a new form endpoint;
- a new service-area promise.

Therefore:

```text
SERVICE LANDING COPY
        ↓
MAP TO CURRENT ROUTE
        ↓
CHECK ACTIVE / GATED STATE
        ↓
CHECK CLAIMS / PRICING / SCOPE
        ↓
CHECK CURRENT COPY AUTHORITY
        ↓
THEN IMPLEMENT
```

Do not reverse that order.

---

## 20A.2 ROUTE RECONCILIATION — DO NOT USE THE SHORT SLUGS BLINDLY

The landing-page source proposes clean short URLs.

The current Astro build already has established canonical routes.

Preserve the current routes unless a separate route-migration decision is
approved.

| Landing-page concept | Current repository route | Current state / handling |
|---|---|---|
| Rodent Droppings Cleanup | `/rodent-dropping-cleanup-san-jose/` | Built. **Service is not operationally gated.** Current `noindex` state is a separate publication/SEO decision. |
| Hoarding Cleanup | `/hoarding-cleanup-san-jose/` | Active/indexable. First gold-standard service page. |
| Detailed Deep Cleaning | `/deep-cleaning-san-jose/` | Active/indexable. Use this route rather than creating `/detailed-deep-cleaning/`. |
| Move-In Deep Cleaning | **No dedicated current route verified** | Future candidate only. Must pass page-creation gate before a new route exists. |
| Move-Out Deep Cleaning | `/move-out-cleaning-san-jose/` | Active/indexable. |
| Estate & Property Cleanout | Primary mapping: `/estate-cleanout-san-jose/`; broader cleanout intent also exists at `/property-cleanouts-san-jose/` | Do not collapse the two distinct existing intents accidentally. |
| Animal Waste Cleanup | `/animal-waste-cleanup-san-jose/` | Built. **Service is not operationally gated.** Current `noindex` state is a separate publication/SEO decision. |
| Pigeon Droppings Cleanup | `/pigeon-dropping-cleanup-san-jose/` | Built. **Service is not operationally gated.** Current `noindex` state is a separate publication/SEO decision. |
| Extreme Property Cleanup | `/extreme-cleaning-san-jose/` | Active/indexable. |
| Service Hub | `/services/` | Active/indexable. |

### Route naming rule

Do not create redirects or duplicate short-slug pages merely because the
landing-page copy used cleaner shorthand URLs.

The current canonical route may use a slightly different visible H1/title.

SEO metadata and H1 should be decided using:

- actual route intent;
- current search positioning;
- approved copy;
- canonical rules.

---

## 20A.3 MOVE-IN CLEANING IS NOT YET A ROUTE DECISION

The landing-page system contains strong move-in cleaning copy.

That does not mean Codex should create `/move-in-cleaning/`.

Before creating a dedicated page, apply the page-creation gate:

1. distinct user/search intent;
2. meaningful difference from `/deep-cleaning-san-jose/` and `/move-out-cleaning-san-jose/`;
3. service is actually offered;
4. truthful operating information exists;
5. internal-link role is clear;
6. route will remain useful even with zero search traffic.

Until that decision is explicitly made:

- preserve the move-in copy as a future content candidate;
- do not add the route;
- do not add it to navigation/sitemap/schema;
- do not make the Services Hub imply a dedicated page exists.

---

## 20A.4 OPERATIONAL SERVICE STATE VS TSWMP GATE VS SEO PUBLICATION

**Owner clarification — August 25, 2026:**

Rodent-droppings cleanup, animal-waste cleanup, and pigeon-droppings cleanup
are **not operationally gated services**.

The relevant current gate is **TSWMP-dependent work**.

Codex must keep these three concepts separate:

### A. SERVICE AVAILABILITY

Aseptaclean may currently market and perform accepted work within its lawful,
insured, non-TSWMP-dependent scope for:

- rodent-droppings cleanup;
- animal-waste cleanup;
- pigeon-droppings cleanup.

Do not label these services “future,” “inactive,” or “gated” merely because a
route is currently `noindex`.

### B. TSWMP GATE

Any work that legally or operationally requires the pending TSWMP authority /
program must remain gated until that requirement is cleared and documented.

Do not infer TSWMP-dependent authority from the existence of a cleanup route.

If a condition crosses into TSWMP-regulated handling, stop at the current
approved boundary and follow the applicable referral / partner / future-service
logic.

### C. SEO / PUBLICATION STATE

`noindex` is a search-publication state.

It is **not evidence that the underlying service is unavailable**.

A route may be:

- operationally available but `noindex`;
- operationally available and indexable;
- operationally unavailable and `noindex`.

Codex must determine these dimensions independently.

### Service Hub implication

The Services Hub may route to rodent-droppings, animal-waste, and
pigeon-droppings cleanup if current owner/site architecture approves them as
public services.

Do not hide them solely because their current route has `noindex`.

Before changing indexation, separately verify:

- current SEO/publication decision;
- unique page quality;
- claims accuracy;
- sitemap/canonical state.

### Extreme cleaning

`/extreme-cleaning-san-jose/` remains an active/indexable service subject to
current repository truth.

Do not let family-hub indexation determine whether an individual service is
operationally available.

---

## 20A.5 EACH SERVICE PAGE IS A SPECIALIST

This principle from the landing-page source is adopted sitewide.

Do not build one service-page template and replace nouns.

The design system stays consistent.

The **argument changes**.

| Service | Specialist thesis |
|---|---|
| Hoarding | **You stay in control of what stays and what leaves.** |
| Estate / property cleanout | **Protect what matters before the property gets cleared.** |
| Detailed deep cleaning | **This is more work and more detail than normal housekeeping.** |
| Move-out | **Get the property ready for the next handoff.** |
| Extreme property cleanup | **The condition is past normal housekeeping and needs a property plan.** |
| Rodent droppings | **The visible droppings may not be the whole affected area.** |
| Animal waste | **The visible waste and the affected material underneath may be different problems.** |
| Pigeon droppings | **Heavy dry buildup needs different handling from ordinary dirt.** |
| Future move-in page | **Use the empty-home window before furniture and belongings block access.** |

The visitor should feel:

> **These people understand this exact problem.**

That is more important than maintaining identical visual sections across all
services.

---

## 20A.6 THE 11 SERVICE-PAGE JOBS ARE NOT 11 REQUIRED VISUAL SECTIONS

The landing-page source defines a strong customer-question sequence:

1. confirm service;
2. recognize condition;
3. teach;
4. reframe the obvious/basic solution;
5. explain method;
6. define scope;
7. prove;
8. qualify;
9. explain price;
10. answer objections;
11. convert.

Adopt the **jobs**.

Do NOT automatically create eleven giant bands.

A human-designed page may combine these jobs into 5–8 strong visual movements.

Example:

```text
01 SEARCH-CONFIRMING HERO
   service + specialist thesis + service-specific CTA

02 CONDITION / PROBLEM RECOGNITION
   combines recognition + reframe

03 FIELD NOTE / EDUCATIONAL IDEA
   teaches one useful thing

04 SCOPE + METHOD
   combines what we do + what we do not + sequence

05 REAL EVIDENCE
   before / during / after + captions + scope

06 FIT + PRICE LOGIC
   qualification + price driver explanation

07 SERVICE-SPECIFIC FAQ
   only the strongest objections

08 FINAL ACTION
```

This is a content framework, not a component stack.

If a page is stronger with six movements, use six.

If evidence warrants eight, use eight.

Do not force the page to become 15,000px long merely to satisfy a checklist.

---

## 20A.7 SERVICE HERO = SEARCH CONFIRMATION

Service-page heroes serve a different job from the homepage hero.

The homepage can use an emotional/situation-led headline.

A high-intent service page should immediately confirm the search.

Recommended hierarchy:

```text
location / service context
exact or unmistakable service H1
unique specialist thesis
service-specific primary CTA
phone as secondary
service-relevant image
```

### Hero alignment

Do not assume every service hero must copy the centered homepage hero.

Sevenson provides visual DNA, not one universal composition.

Service pages may use:

- left-aligned copy + large documentary image;
- full-width image with restrained overlay;
- asymmetric image/text composition;

depending on the content and photo.

The H1 must remain immediately clear.

### Hero image

Show:

- the actual condition;
- the work;
- or the result.

Avoid:

- smiling stock cleaners;
- stock families;
- staged hazmat;
- random exterior homes;
- generic spray-bottle imagery;
- AI-generated contamination.

---

## 20A.8 SERVICE-SPECIFIC CTA SYSTEM

Adopt the landing-page source's service-specific CTA logic.

The global navigation can still use:

> **Tell Us About the Property**

Service pages can use a more natural starting action.

Examples:

| Service | Preferred page CTA direction |
|---|---|
| Hoarding | Tell Us About the Property / Start Privately |
| Rodent droppings | Send Photos for Review |
| Animal waste | Send Photos of the Area |
| Pigeon droppings | Send Photos for Review |
| Detailed deep cleaning | Request a Deep Clean Estimate |
| Move-out | Get My Move-Out Estimate |
| Extreme cleanup | Send Photos for Review |
| Estate / property cleanout | Tell Us About the Property |

Do not globally replace these with:

- Contact Us;
- Get a Quote;
- Learn More.

### Destination rule

Service-specific CTAs should normally feed the **same primary assessment
system**, not create nine unrelated lead pipelines.

Use the existing `/request-assessment/` route and lead endpoint.

Preferred implementation:

```text
service page CTA
      ↓
/request-assessment/?service=<verified-service-key>
      ↓
assessment page recognizes service context
      ↓
shows a short relevant question branch
      ↓
same lead endpoint
```

Use existing route/query/data conventions if the repository already has a
better mechanism.

Do not invent query keys without inspecting the current form code.

---

## 20A.9 ONE ASSESSMENT ENGINE, SERVICE-SPECIFIC QUESTION BRANCHES

The landing-page source correctly identifies that different services need
different qualification questions.

Do not duplicate a large independent form implementation across every service
page unless the current technical system intentionally supports that.

Preferred architecture:

> **One assessment route + one lead endpoint + service-specific conditional fields.**

Core fields stay stable:

- name;
- phone;
- city;
- situation description;
- timing;
- photos where useful.

Then ask only the 3–6 questions that materially improve:

- fit;
- scope;
- urgency;
- next step.

Examples:

### Hoarding / cleanout

- relationship / authority;
- occupied or vacant;
- amount of property affected;
- keep/remove decisions;
- deadline;
- photos.

### Rodent

- where droppings were found;
- whether active pest issue is controlled;
- amount/areas affected;
- accessibility;
- photos.

### Detailed cleaning

- beds/baths;
- whole home vs selected areas;
- priority details;
- windows/appliances/cabinet interiors;
- timing;
- photos.

### Move-out

- handoff date;
- whether property will be empty;
- landlord/inspection list;
- appliances/cabinets/windows;
- photos.

### Animal / pigeon

- source/type;
- affected area/surface;
- whether source is still active;
- access;
- duration/amount;
- photos.

Do not turn the first conversion step into a 30-field intake packet.

---

## 20A.10 MOBILE STICKY ACTIONS

Adopt the useful part of the landing-page source:

```text
CALL | SERVICE-SPECIFIC PRIMARY ACTION
```

This resolves the earlier three-equal-button problem.

Rules:

- only two actions;
- primary action must remain visually dominant or at least unmistakable;
- no label wrapping at 320–430px;
- do not cover form controls/footer links;
- respect safe-area insets;
- if the shared `MobileCTA.astro` is used, inspect all route impacts before changing it globally.

Examples:

- Call | Send Photos
- Call | Get Estimate
- Call | Start Privately

---

## 20A.11 ONE STRONG EDUCATIONAL IDEA PER SPECIALTY PAGE

Adopt this principle.

Education creates authority without bragging.

It must be:

- relevant;
- useful;
- short;
- verified;
- not fear-based.

Examples from the landing-page system:

- rodent: dry sweeping/vacuuming of untreated dry droppings is not the recommended handling approach;
- pigeon: accumulated dry waste should not simply be disturbed into dust;
- animal waste: surface cleaning may not solve material that penetrated absorbent surfaces;
- hoarding: define the item-decision process before clearing;
- move-out: cleaning and damage are different problems;
- extreme: a surface cannot be cleaned until it is reachable.

### Health/safety verification rule

Any health, disease, worker-safety, disinfection, or public-health statement
must be checked against a high-authority current source before publication.

Examples include:

- CDC;
- NIOSH;
- OSHA;
- EPA product-label requirements;
- applicable California/local authority.

Do not convert a useful field note into fear marketing.

**Authority > fear.**

---

## 20A.12 EXPLAIN THE BASIC OPTION BEFORE SELLING THE PREMIUM OPTION

Service pages should make clear **why the obvious lower-cost/basic solution may
or may not fit**.

Examples:

- normal housekeeping vs detailed deep cleaning;
- junk pickup vs planned property cleanout;
- pest control vs cleanup;
- bird control vs cleanup;
- fragrance/deodorizer vs source cleanup;
- clearing vs cleaning;
- cleaning vs repair.

Do not insult the cheaper option.

Sometimes it is the correct option.

That honesty strengthens qualification.

---

## 20A.13 SCOPE + EXCLUSIONS ARE CONVERSION CONTENT

Do not hide boundaries because they seem negative.

Every service page should make it possible to understand:

### What may be included?

and

### What is not included / may need another provider?

Use the current legal/operational truth.

This is especially important for:

- pest control;
- bird control;
- construction;
- structural repair;
- drywall;
- flooring;
- insulation;
- hauling/off-site transport;
- regulated biological material;
- active hazardous conditions.

Boundary language is a trust mechanism.

Do not expand scope through SEO wording.

---

## 20A.14 PROCESS SHOULD FEEL LIKE FIELD PROCEDURE, NOT SAAS CARDS

Adopt the process-first idea, but do not render four or five equal rounded
cards.

Use:

- vertical numbered sequence;
- alternating photo/procedure blocks;
- annotated artifact;
- thin rules;
- large numbers used sparingly.

The exact steps should follow the real service.

The global operating idea can remain:

> **See the problem. Set the plan. Do the work. Check the result.**

But route-specific process copy should stay consistent with the current Handoff
Standard and actual operations.

Do not create a second contradictory company process.

---

## 20A.15 PROOF = BEFORE + DURING + AFTER, NOT JUST DIRTY → CLEAN

This is adopted.

For cleaning pages:

- BEFORE;
- DURING;
- AFTER.

For hoarding / cleanout:

- START;
- SORTED / DECISION ZONES;
- CLEARED;
- CLEANED.

Useful proof captions can include:

- real city;
- property type;
- condition;
- relevant surface;
- approved scope;
- constraint;
- outcome.

Do not publish client-identifying details without permission.

### Evidence-density rule

A service page should gain authority from evidence per screen, not raw word
count.

Prefer:

- real photo;
- specific condition;
- real scope;
- real surface;
- real boundary;
- real operating detail;
- real project context.

over another paragraph of generic persuasion.

---

## 20A.16 QUALIFICATION IS ALLOWED — BUT DO NOT BUILD A GIANT WALL OF REJECTION

The landing-page source's:

> This May Be a Good Fit If...

and

> You May Not Need Us If...

is strategically useful.

Keep the concept.

Do not automatically make it a huge standalone section on every route.

It may appear as:

- two quiet columns;
- short end-of-page qualifier;
- side note near pricing;
- comparison;
- FAQ answer.

The purpose is to help the wrong customer self-select out, not to sound
hostile.

---

## 20A.17 PRICING — RECONCILE BEFORE PUBLICATION

The landing-page source contains:

> **Qualifying 2-bed / 2-bath homes start at $1,350.**

for detailed cleaning and move-related cleaning.

Other current source files contain conflicting historical/current pricing
rules, including audits that identify public price fields/ranges as a
governance conflict.

Therefore:

> **DO NOT AUTOMATICALLY PUBLISH `$1,350` JUST BECAUSE IT APPEARS IN THE LANDING-PAGE COPY.**

Before implementing a public price, Codex must check:

1. current explicit owner decision;
2. `AGENTS.md`;
3. current decisions log;
4. current copy authority;
5. current repository pricing data;
6. whether this is a service starting price vs prohibited investment-range selector.

### If public starting price is currently approved

Use:

- one clear starting-price sentence;
- exact qualifier;
- price drivers.

Do not use pricing tiers/cards.

### If no current price is approved

Use:

- price drivers;
- photo review;
- walkthrough logic;
- no fake starting number.

Specialty-condition pages should not invent a flat price.

---

## 20A.18 SERVICE-SPECIFIC FAQ — KEEP IT TIGHT

The landing-page source has strong service-specific objection handling.

Adopt the questions.

Do not assume every answer must appear on the commercial page.

Prioritize roughly:

- 4–7 highest-value service-specific questions;
- questions that directly affect fit/scope/next step.

Move general questions to `/faq/`.

This prevents every service page from becoming an enormous FAQ document while
preserving useful search/customer content.

Do not add `FAQPage` schema merely to chase rich results.

---

## 20A.19 COPY STYLE FROM THE LANDING-PAGE SOURCE IS APPROVED AS A DIRECTION

The following traits are adopted:

- short sentences;
- common words;
- active voice;
- concrete examples;
- useful headings;
- clear point of view;
- easy to understand, not childish.

Strong Aseptaclean-style lines include:

> **A cleared house is not always a clean house.**

> **Cleaning and damage are not the same thing.**

> **You cannot clean a floor you cannot reach.**

> **More scrubbing is not always the answer.**

> **Cleanup fixes the mess. It does not stop the birds from coming back.**

> **We do not want to turn a small problem into a large cleanup job.**

Use these only where they fit the actual service.

Do not spread the same slogan across unrelated routes.

---

## 20A.20 SERVICE HUB — INCORPORATE THE PROBLEM-CHOOSER IDEA, NOT THE NINE-CARD LIST

The landing-page source correctly separates:

- **problem chooser** for conversion;
- **full service directory** for browsing/search.

Adopt that logic.

Recommended service-hub order:

```text
01 HERO
02 VISUAL PROBLEM CHOOSER
03 NOT SURE? ROUTING
04 NORMAL vs DETAILED vs COMPLEX CONDITION
05 ACTIVE SERVICE DIRECTORY
06 SCOPE / BOUNDARY NOTE
07 HOW TO START
08 REAL EVIDENCE
09 FINAL CTA
```

### Critical gate

The directory must be built from **current active/public service state**.

Do not publish the landing document's nine-service list as though all nine are
live.

The current repo includes active and gated services.

Filter/reconcile deliberately.

The service hub must never become a workaround for a publication gate.

---

## 20A.21 SERVICE PAGE VISUAL LANGUAGE — ALIGN WITH SEVENSON WITHOUT COPYING IT

Use the service landing system's:

- strong photography;
- deliberate asymmetry;
- clear section changes;
- technical/document details;
- large process numbers;
- captions;
- restrained borders.

But correct one phrase from the landing source:

> “large typography” does not mean oversized editorial type everywhere.

Sevenson remains the primary sitewide benchmark.

Service pages should feel:

- serious;
- operational;
- photographic;
- restrained;
- information-rich without becoming dense;
- more like an environmental/property-services capability page than a modern
  lead-gen template.

Use photography to carry visual weight.

Do not make text and colored bands compensate for missing images.

---

## 20A.22 SERVICE-PAGE SEO RULE

Service pages are legitimate long-form search entry pages.

They can be much more detailed than the homepage.

But length must come from useful intent coverage, not filler.

Each indexable service page should be the strongest answer to:

- what this service is;
- when it fits;
- what condition looks like;
- why a basic option may not fit;
- what Aseptaclean does;
- what it does not do;
- what changes scope;
- what evidence exists;
- what price logic applies;
- what happens next.

Do not create a second page for a keyword variation if the existing canonical
service page already answers the intent well.

---

## 20A.23 CONTENT FROM THE LANDING-PAGE FILE THAT SHOULD NOT OVERRIDE SOURCE TRUTH

The following must be treated as **conditional copy**, not automatic public
truth:

- short proposed URLs;
- move-in dedicated route;
- public `$1,350` starting prices;
- health/safety guidance until verified;
- claims about disinfecting;
- any access capability such as roofs/high work;
- any disposal/removal language that could imply off-site hauling;
- all gated specialty-service calls to action;
- service-area language beyond current verified geography;
- real-work captions before actual proof exists.

When a conflict appears:

**flag it. Do not silently reconcile it in favor of more persuasive copy.**

---

## 20A.24 ROUTE-SPECIFIC CONTENT IMPLEMENTATION ORDER

After the homepage and assessment system are stable:

1. `/hoarding-cleanup-san-jose/`
   - first full service-page implementation;
   - use control-of-belongings thesis;
   - prove mobile/desktop service-page system.

2. `/estate-cleanout-san-jose/`
   - protect-important-items thesis;
   - preserve distinction from broader property cleanouts.

3. `/property-cleanouts-san-jose/`
   - adapt the broader property-clearing logic;
   - do not duplicate Estate page.

4. `/deep-cleaning-san-jose/`
   - detailed-not-routine thesis;
   - verify any public starting price before implementation.

5. `/move-out-cleaning-san-jose/`
   - handoff thesis;
   - keep security-deposit language honest.

6. `/extreme-cleaning-san-jose/`
   - property-plan / beyond-normal-housekeeping thesis.

7. Rodent / animal-waste / pigeon-droppings routes
   - **not operationally gated**;
   - reconcile their current `noindex` state as an SEO/publication decision;
   - TSWMP-dependent scope remains gated.

8. Move-in route decision
   - evaluate separately;
   - do not create by template momentum.

---

## 20A.25 SERVICE-PAGE QA

In addition to the sitewide QA, every service page must answer:

1. Can a searcher identify the exact service within seconds?
2. Can they recognize their condition without reading the entire page?
3. Is there one genuinely useful educational insight?
4. Is the obvious/basic alternative explained fairly?
5. Is the scope understandable?
6. Are exclusions understandable?
7. Is there real evidence or an honest proof gap?
8. Can a poor-fit customer self-select out?
9. Is price or pricing logic clear without unsupported numbers?
10. Does the CTA match how this customer naturally wants to start?
11. Does the assessment path preserve the service context?
12. Does mobile feel purpose-built?
13. Does the page visually belong to Aseptaclean / the Sevenson-led system?
14. Could the page be generated by simply swapping the service noun?
15. Does the page contain enough real evidence to justify its length?

If #14 is yes:

**FAIL.**


# 21. HOARDING CLEANUP PAGE — GOLD-STANDARD SPECIAL NOTES

The page should feel private, dignified, serious, and operational.

Do not use:

- sensational gross-out photography;
- shaming language;
- cartoon clutter icons;
- entertainment framing.

Useful content can include:

- access;
- contents;
- client decisions;
- sorting/clearing boundaries;
- cleaning after contents are addressed;
- timeline / deadline factors;
- what requires another provider;
- property handoff;
- real project evidence when available.

The buyer should feel:

> **They understand the complexity without making the situation feel humiliating.**

---

# 22. HOW WE WORK / HANDOFF — `/handoff-standard/`

## Visible navigation label

`How We Work` is acceptable.

Do not create a new `/how-we-work/` route unless a deliberate route decision is made.

## Job

Hold the deeper operational content removed from the homepage.

Core framework:

```text
ASSESS
DEFINE
AUTHORIZE
PERFORM
DOCUMENT
```

## Visual structure

Do not use five colorful process cards.

Prefer:

- sequential sections;
- image/document alternation;
- numbered text used sparingly;
- actual sample artifacts;
- change-authorization explanation;
- handoff record.

This page should feel almost like an operating standard written for a customer.

---

# 23. ABOUT — `/about/`

## Job

Reassure.

The visitor is asking:

- Is this a real company?
- Who is responsible?
- Why should I trust how they approach difficult properties?
- What does the operator actually know?
- Are they honest about limitations?

## Architecture

```text
ABOUT HERO
real operator/company image when available

WHY ASEPTACLEAN EXISTS
short factual story

OPERATING PRINCIPLE
scope / accountability / documentation

BACKGROUND
only verified useful experience

HOW THE COMPANY WORKS
link to method / evidence

CURRENT BOUNDARIES
brief, honest

CTA
```

Do not make the page a résumé.

Do not invent company history or scale.

A real working operator photograph is much more valuable than a giant founder statement.

---

# 24. WHO WE HELP — `/who-we-help/`

## Job

Route visitors by situation, not industry jargon.

Potential situations can include only current legitimate customer groups.

Examples:

- family managing a difficult property;
- estate / inherited property;
- property transition / move-out;
- owner needing a severe-condition reset.

## Design

Use situation-led photography and concise decision routing.

This page can be image-led like a sector page.

Do not duplicate the entire service hub.

---

# 25. REQUEST ASSESSMENT — `/request-assessment/`

## Job

Turn recognition/trust into a usable lead with the least reasonable friction.

The form should begin with the property situation—not technical service selection.

## Recommended field logic

Core:

- property city;
- name;
- phone/email;
- what is happening at the property;
- what needs to happen next;
- timing/deadline;
- photos if available.

Ask additional questions only when they materially improve qualification or reduce back-and-forth.

## UI

Quiet, functional, trustworthy.

Do not create a visually dramatic landing page around the form.

## Required states

Implement:

- validation;
- submitting;
- success;
- server/network error;
- wrong file type;
- file too large;
- upload feedback/progress where applicable;
- removed-file state;
- accessible error association;
- disabled state;
- keyboard focus.

Preserve the actual lead endpoint.

---

# 26. CONTACT — `/contact/`

## Job

Provide direct communication for visitors who do not need the full property-assessment flow.

Keep:

- phone;
- relevant contact method;
- clear link to Tell Us About the Property.

Do not duplicate the entire assessment form unless there is a real reason.

---

# 27. FAQ — `/faq/`

## Job

Hold sitewide buyer questions that are too detailed for the homepage.

Use simple accessible structure.

Do not turn it into a decorative card wall.

Group questions when useful:

- assessment;
- scope;
- property access;
- belongings;
- changes;
- timing;
- service boundaries;
- payment/pricing only where approved.

Do not publish invented answers merely to target keywords.

---

# 28. PROJECT NOTES — `/projects/`

## Public concept

**Project Notes**

## Job

Become the site's strongest proof engine as real work accumulates.

No fake case studies.

## Project Note anatomy

Each real note can include:

- property/context;
- appropriate privacy-preserving location;
- initial condition;
- major constraint;
- approved scope;
- important exclusions;
- sequence/approach;
- client decisions;
- outcome/handoff;
- real media;
- related service;
- related city where helpful.

Photography should dominate.

The writing should be factual and restrained.

If no proof exists, keep the route `noindex` / honest rather than filling it with simulated projects.

---

# 29. SERVICE AREAS HUB — `/service-areas/`

## Job

Explain real coverage and route to legitimate city pages.

This is not a list of 100 SEO cities.

Use:

- verified primary geography;
- short operational explanation;
- approved city routes;
- no fake office locations.

Aseptaclean remains one real service-area business entity.

---

# 30. CITY HUB PAGES

Current built examples:

- Mountain View
- Sunnyvale
- Campbell

## Job

Provide genuinely useful local context—not a city-name swap.

A city page must have:

- verified service availability;
- useful local context relevant to the work;
- distinct writing;
- relevant service routes;
- evidence when available;
- accurate geography;
- no fake local office.

## Visual design

Same site DNA.

Different composition from the service page.

Possible:

```text
LOCAL HERO
real/appropriate local or property image

WHAT ASEPTACLEAN HANDLES IN THIS AREA

RELEVANT SERVICES

LOCAL OPERATING NOTE
only verified facts

RELATED PROJECT NOTE
when real

ASSESSMENT CTA
```

Do not manufacture neighborhood lists for visual filler.

---

# 31. SERVICE × CITY PAGES

Current built combinations are publication-gated.

## Publication rule

A service × city page should not become indexable merely because the template renders.

It needs unique value at the intersection of:

- service intent;
- city context;
- useful local evidence;
- actual availability.

If it can be created by replacing one city string, it fails.

## Layout

Do not clone the parent service page.

Use shorter, locally focused architecture.

The parent service page holds the deep service explanation.

The local page should add local relevance, not repeat 1,500 words.

---

# 32. RESOURCE PAGES

Example:

`/estate-cleanout-checklist/`

## Job

Solve a real information need and naturally connect to the service.

Resource pages should look like useful editorial content, not lead-gen templates.

Use:

- clear article hierarchy;
- useful lists;
- diagrams/photos when warranted;
- contextual service link;
- restrained CTA.

Do not create dozens of thin resources for SEO volume.

---

# 33. PRIVATE RESIDENCE RESET / DISTINCT OFFER PAGE

`/private-residence-reset/`

This sits outside the main service taxonomy.

Treat it as a distinct offer only if current owner decisions still support it.

Its design may be more focused/conversion-oriented than a normal service page, but it must still live inside the same Aseptaclean visual system.

Do not allow an offer page to become a generic Hormozi-style landing-page template full of fake urgency, pricing tiers, or unsupported guarantees.

---

# 34. LEGAL / UTILITY PAGES

Includes:

- privacy;
- terms;
- cookie policy;
- data request;
- SMS consent;
- thank-you;
- 404.

These do not need photographic Sevenson layouts.

Use the same:

- header/footer where appropriate;
- typography;
- colors;
- accessibility;
- spacing system.

The design job is clarity and trust.

## SMS consent

Preserve its protected technical/copy requirements.

Do not redesign carrier-review content casually.

## Thank-you

Clearly confirm the submission.

Explain the actual next step.

Do not invent a response-time promise.

## 404

Useful, simple, branded.

Provide routes back to:

- home;
- services;
- assessment.

---

# 35. SEARCH / SEO SYSTEM

SEO is not page multiplication.

The site already has a meaningful route architecture.

The next gains should come from:

- stronger pages;
- original evidence;
- correct indexation;
- better internal links;
- local/entity consistency;
- useful media;
- Search Console feedback;
- GBP alignment.

## 35.1 Every indexable page requires

- distinct intent;
- useful content;
- unique title;
- useful meta description;
- one meaningful H1;
- self-referencing canonical;
- crawlable internal links;
- correct robots state;
- correct sitemap state;
- semantic HTML;
- fast loading;
- mobile usability;
- accessible content;
- justified schema.

## 35.2 Local SEO

Do not:

- create fake offices;
- create fake LocalBusiness entities per city;
- mass-generate city pages;
- stuff neighborhood names;
- claim service where it is not actually available.

## 35.3 AI / generative search visibility

Strong inputs include:

- clear entity identity;
- specific service definitions;
- original first-hand material;
- Project Notes;
- real images;
- concise answers to real questions;
- logical site architecture;
- strong internal linking;
- crawlability.

Humanized content and strong search content should reinforce each other.

---

# 36. SCHEMA

Use schema only when supported by real content.

Do not add:

- fake reviews;
- fake aggregate ratings;
- false locations;
- services that are gated;
- FAQ schema merely because a FAQ exists.

Keep organization/local-business representation consistent with one real service-area business.

---

# 37. PROOF LADDER

Aseptaclean's proof system should evolve honestly.

## Stage 1 — current limited proof

Use:

- clear operating method;
- sample operating artifacts;
- verified background;
- real service boundaries;
- real photos of equipment/property/operator as they become available.

## Stage 2

Add:

- real customer-authorized project photos;
- real reviews;
- real Project Notes.

## Stage 3

Add:

- repeated project patterns;
- stronger case evidence;
- real specialty/remediation proof only after legal/operational activation.

Never skip stages by fabricating Stage 3 visuals.

---

# 38. REGULATED / TSWMP-GATED SERVICES

Route existence, route indexation, and operational authority are three
different things.

**Owner clarification — August 25, 2026:**

Rodent-droppings cleanup, animal-waste cleanup, and pigeon-droppings cleanup
are **not operationally gated** simply because their current routes are
`noindex`.

The current gate applies to **TSWMP-dependent work** and any other separately
regulated scope whose authority has not yet been cleared.

Human-biohazard, regulated waste, or other TSWMP-dependent service marketing
must remain gated until the applicable activation requirements are verified.

Do not activate TSWMP-dependent scope through:

- homepage;
- services nav;
- internal links;
- schema;
- city page;
- title/meta;
- Project Notes;
- imagery;
- copy implication.

At the same time, do not incorrectly suppress lawful non-TSWMP cleanup
services merely because their route is `noindex`.

The visual system may be future-ready.

The public claims must remain current-truth only.

---

# 39. SERVICE-SCOPE LANGUAGE

Do not casually expand operational scope through copy.

Examples that require precision:

- hauling;
- disposal;
- demolition;
- pest control;
- remediation;
- decontamination;
- regulated waste;
- structural work.

Where actual operating model is coordination rather than hauling, say so accurately.

Do not let SEO copy broaden the service beyond current legal/insurance/operating boundaries.

---

# 40. ACCESSIBILITY

Required:

- semantic HTML;
- meaningful heading hierarchy;
- keyboard operation;
- visible focus;
- sufficient contrast;
- real labels;
- accessible errors;
- alt text for meaningful imagery;
- empty alt for decorative imagery;
- 44px mobile targets;
- no hover-only critical information;
- reduced motion;
- 200% zoom without content loss;
- no page-level horizontal overflow.

Accessibility is part of design, not a launch cleanup task.

---

# 41. PERFORMANCE

A beautiful slow site fails.

## Images

Use:

- responsive sizes;
- explicit dimensions;
- modern formats where pipeline supports them;
- lazy loading below fold;
- hero priority loading when appropriate;
- object-position intentionally tuned by breakpoint.

## JavaScript

Prefer Astro/native HTML/CSS.

Do not add:

- UI frameworks;
- animation libraries;
- carousel packages;
- state frameworks;

just to reproduce simple interactions.

Use current stack before adding dependencies.

---

# 42. FORM / EDGE-STATE STANDARD

Human-quality design includes failure states.

For interactive experiences, check as applicable:

- default;
- hover;
- focus;
- active;
- disabled;
- loading;
- empty;
- success;
- validation error;
- server error;
- offline;
- oversized upload;
- invalid upload;
- removed file;
- long text;
- small screen.

Do not deliver screenshot-perfect ideal states while real interaction states are broken.

---

# 43. CARD RULE

A card is not a default container.

Before using a card ask:

> **Is this information a discrete object that benefits from containment?**

Good reasons:

- project record;
- service choice among peers;
- artifact/document;
- review;
- resource preview.

Bad reason:

> There is some text here.

Every page QA must count card/grid patterns and justify them.

---

# 44. PAGE-RHYTHM RULE

The site should have design-system consistency and editorial variation.

Good:

```text
large image
quiet content
evidence
dense detail
image
action
```

Bad:

```text
eyebrow
H2
paragraph
3 cards

eyebrow
H2
paragraph
3 cards

eyebrow
H2
paragraph
3 cards
```

Do not make every page different for novelty.

Do not make every page identical for reuse.

---

# 45. SITEWIDE SEVENSON ALIGNMENT RULE

Aseptaclean should remain visibly related to Sevenson's **class of operating-company website** through the whole site.

Check for:

- serious corporate navigation;
- strong field/property photography;
- restrained type;
- blue/white/neutral system;
- capability-first structure;
- operational evidence;
- simple calls to action;
- no startup decoration.

But page structure follows content.

**Homepage ≠ service page ≠ About ≠ city page ≠ assessment form.**

The common DNA is visual and behavioral.

The composition is page-specific.

---

# 46. CODEX IMPLEMENTATION CONTRACT

Before changing an important page:

1. inspect the actual route;
2. inspect its data source;
3. identify current indexation;
4. identify locked copy;
5. identify active/gated service status;
6. capture the rendered baseline;
7. state the page's job;
8. identify real evidence available.

Then implement.

Do not ask the AI to invent the page from “modern premium website.”

## AI may decide

- low-level CSS implementation;
- semantic component split;
- responsive details within approved design logic;
- technical refactoring that preserves output.

## AI may NOT decide without approval

- new service;
- new city;
- new claim;
- new certification;
- new proof;
- new public price;
- new guarantee;
- new page family;
- new visual brand;
- regulated-service activation;
- major route migration;
- mass page generation.

---

# 47. SITEWIDE QA

Every important page must pass:

## 47.1 Five-second test

Can an unfamiliar person tell:

- what this page is about;
- whether it applies to them;
- what the next step is?

## 47.2 Logo-swap test

Could a competitor replace the logo and leave the page almost unchanged?

If yes, increase specificity.

## 47.3 Silhouette test

Blur/squint at the page.

Is the hierarchy obvious?

Does it look like a generic AI landing template?

## 47.4 Card test

Count cards.

Justify each.

## 47.5 Section-repeat test

Does the same layout pattern repeat more than twice without a content reason?

## 47.6 Evidence test

Separate:

- real evidence;
- temporary imagery;
- unsupported claim;
- placeholder.

## 47.7 Stock test

Does the image prove anything?

If not, why is it there?

## 47.8 Copy test

Could hundreds of competitors say this?

If yes, rewrite.

## 47.9 Page-family differentiation test

Does this page look like its sibling with only words/photos replaced?

If yes, fail.

## 47.10 Mobile test

At 390px can someone understand:

- page intent;
- fit;
- differentiator;
- trust;
- next step?

## 47.11 Wrapping test

Check:

- 320;
- 360;
- 375;
- 390;
- 430;
- 768;
- 1024;
- 1280;
- 1440.

Fail for avoidable:

- heading orphan;
- CTA wrap;
- nav collision;
- overflow;
- desktop `<br>` damaging mobile;
- tiny type used only to make layout fit.

## 47.12 Human-art-direction test

For every major section answer:

> Why is this composition correct for this content?

---

# 48. PUBLICATION / INDEXATION GATE

An important page is not ready simply because it compiles.

Before making or keeping a page indexable, verify:

## Intent

- distinct user/search intent;
- useful content;
- correct page-family role.

## Business truth

- service actually available;
- geography accurate;
- claims approved;
- pricing approved if shown;
- no fake proof.

## Humanization

- real specificity;
- justified composition;
- evidence;
- no generic AI filler;
- no unjustified template repetition.

## Conversion

- one clear primary action;
- appropriate supporting actions;
- low friction;
- useful confirmation state.

## Technical

- HTTP success;
- canonical;
- robots;
- sitemap;
- title/meta;
- semantic H1;
- internal links;
- schema accuracy;
- accessibility;
- responsive;
- performance;
- no console errors.

If a material gate fails:

> **DO NOT INDEX / DO NOT PROMOTE YET.**

---

# 49. BUILD SEQUENCE

Stop redesigning every route simultaneously.

Use this sequence.

## Phase 0 — stabilize + reconcile

- verify actual current routes;
- verify dirty worktree;
- remove abandoned homepage components only after importer check;
- establish this document as the sole website strategy/design standard;
- archive/remove superseded homepage briefs from active authority;
- correct known build/claims/accessibility regressions.

## Phase 1 — Homepage

Complete the lean Sevenson-led homepage.

Then visually QA full page.

Do not endlessly redesign it after approval.

## Phase 2 — Request Assessment

Make the primary CTA destination excellent.

Validate form and lead delivery end to end.

## Phase 3 — Service Hub

Rebuild `/services/` into the correct sitewide visual system.

## Phase 4 — Gold-standard service page

Rebuild:

`/hoarding-cleanup-san-jose/`

Use Section 20A and the hoarding-specific content source to establish the service-page quality bar.

Before implementing copy, reconcile the current route strings/data with any newer approved service-page copy. Do not rename the route.

Use it to establish the service-page quality bar.

## Phase 5 — Core service pages

Prioritize active/indexable pages:

- estate cleanout;
- property cleanouts;
- deep cleaning;
- move-out;
- severe-condition/extreme cleaning;
- debris cleanup/coordination;

subject to current repo/service truth.

Do not activate gated pages merely because their design is ready.

## Phase 6 — Service-family hubs

- property clearing;
- detailed cleaning;
- specialty only when publication state supports it.

## Phase 7 — Company / trust pages

- handoff standard / How We Work;
- About;
- Who We Help;
- FAQ;
- Contact.

## Phase 8 — Local system

- Service Areas hub;
- Mountain View;
- Sunnyvale;
- Campbell;
- service × city pages only when local-content gates pass.

## Phase 9 — Project Notes

Publish only real permissioned evidence.

## Phase 10 — Resources / experiments

Build from real search/customer demand.

## Phase 11 — measurement loop

Measure:

- CTA usage;
- assessment completion;
- qualified lead rate;
- search entry pages;
- calls/text;
- objections;
- conversion by route.

Change one important variable at a time when possible.

---

# 50. DOCUMENTATION CLEANUP

This file occupies the canonical website strategy/design role.

Codex should identify older documents that compete with it, including previous:

- homepage rebuild briefs;
- Sevenson homepage briefs;
- Interdoor-first homepage briefs;
- obsolete one-page instructions;
- mockup-port design authority;
- duplicate website master specs.

Do not delete historical records blindly.

Instead:

1. identify current import/tool/agent references;
2. archive or mark obsolete;
3. update `AGENTS.md` / `docs/README.md` only if those files are the repository's active authority index and the change is safe;
4. ensure no active instruction tells Codex to follow an obsolete homepage architecture.

The goal is **one active website strategy/design MD**, not a folder of competing creative direction.

---

# 51. FINAL DESIGN TARGET

The completed website should feel like:

> **A real specialty property-cleanup company operating with calm, serious, environmental-services discipline.**

It should be:

- credible;
- searchable;
- useful;
- easy to understand;
- photographically grounded;
- mobile intentional;
- technically sound;
- honest about current scope;
- ready to hold increasing real proof over time.

It should not be:

> **a conversion framework wearing Sevenson colors.**

Nor should it be:

> **a Sevenson clone with Aseptaclean's logo.**

The correct result is:

> **Aseptaclean's customer journey and operating reality, executed with the restraint, photographic authority, and serious-company posture that made Sevenson a useful reference.**

---

# 52. FINAL CODEX RULE

Before adding any element, section, page, claim, image, interaction, or route, answer:

> **What job does this do for this visitor on this page?**

If there is no specific answer:

**do not add it.**
