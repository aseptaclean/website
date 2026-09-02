# ASEPTACLEAN — CODEX HOMEPAGE REBUILD BRIEF
## V3 — Lean Sevenson Architecture

> **SUPERSEDED 2026-08-26 — NOT ACTIVE AUTHORITY. DO NOT BUILD FROM THIS FILE.**
>
> `docs/30-WEBSITE-MASTER-SPEC.md` §17 is the homepage architecture. **Nothing is lost by
> retiring this brief:** doc 30 §17's target architecture is the same five-section order this
> file produced — Hero · What We Handle · The Property Condition Changes the Work · Operating
> Evidence · Final CTA — which is also what `src/pages/index.astro` ships today. The direction
> was absorbed, not reversed.
>
> **The rank-2 elevation is spent.** `docs/05-DECISIONS-LOG.md`, "V3 lean-Sevenson homepage
> rebuild (2026-08-25)," treated this brief as an explicit current owner decision and therefore
> above doc 30. It recorded a build that has since shipped. Do not re-cite that entry to place
> this file above doc 30 — under `AGENTS.md` §1 a log entry "governs only the scope it actually
> decided."
>
> Retained as historical rationale because roughly eight `src/` files cite this path by section
> for shipped decisions (`Hero.astro` §9, `ConditionChangesWork.astro` §11,
> `OperatingEvidence.astro` §12, `Header.astro` §8, `Footer.astro` §17, `MobileCTA.astro` §18,
> `site.ts` §17, `services/index.astro` §14), as does `scripts/v3-homepage-check.mjs` for its
> §28 gates. That is traceability, not authority.

**Status:** SUPERSEDED — historical only. (Formerly: "Canonical homepage direction after the August 25, 2026 build audit.")

**Purpose:** This file supersedes earlier homepage section-order instructions wherever they conflict. The existing Astro repository remains the technical source of truth for routes, claims, service state, SEO, forms, data, and deployment behavior.

---

# 0. WHY THIS REVISION EXISTS

The current homepage audit found that the build had drifted away from the approved Sevenson direction below the fold.

The audited build was approximately:

- 11,704px tall at 1440px;
- 17,170px tall at 390px;
- 1,678 visible words in `<main>`;
- 8 H2s;
- 5 repeated variations of the same H2-left / content-right composition;
- only 2 large photographs below the hero.

The header and hero structure were broadly successful.

The problem was the rest of the page:

> too many explanatory sections, too much typography doing the work photography should do, and too much conversion-framework content on the homepage.

The corrective principle is:

> **Fewer, stronger homepage movements. Photography, capability, operating evidence, and restraint should create authority.**

Do not compensate for missing proof by adding more sections, more UI, larger headings, or more explanation.

---

# 1. SOURCE-OF-TRUTH HIERARCHY

## Technical truth

The current Astro repository controls:

- actual routes;
- service activation/gating;
- current public claims;
- phone number;
- form behavior;
- lead endpoint;
- schema;
- canonicals;
- robots;
- sitemap;
- redirects;
- service-area logic;
- deployment behavior.

Do not override repository truth from a design document.

## Strategy

Use the current master website sitemap for:

- primary buyer;
- conversion strategy;
- service architecture;
- content boundaries;
- SEO governance;
- future-service gating.

## Homepage visual direction

This V3 brief controls homepage:

- section architecture;
- visual hierarchy;
- section removal/merging;
- Sevenson alignment;
- responsive behavior;
- homepage proof strategy.

---

# 2. PRIMARY BUYER

The homepage is primarily for:

> **The adult child or family decision-maker who has become responsible for an aging parent or relative's cluttered, neglected, heavily soiled, or otherwise overwhelming property and needs to get the situation under control.**

The visitor should not need to know a technical service name.

The core visitor question is:

> **Can these people handle what is happening at this property, and what do I do next?**

---

# 3. PRIMARY CONVERSION

Primary CTA:

> **Tell Us About the Property**

Use the current verified assessment route in the repository.

The homepage must NOT contain the full lead/request form.

Detailed intake belongs on the request-assessment route.

Phone is secondary.

Do not present three equal mobile actions.

---

# 4. PRIMARY VISUAL REFERENCE — SEVENSON

Primary reference:

https://sevenson.com/

Sevenson controls the overall visual personality:

- serious environmental-services posture;
- real operating-company feel;
- white corporate navigation;
- full-width photography;
- restrained blue / white system;
- simple typography;
- factual copy;
- limited animation;
- photography carrying visual authority;
- fewer, larger content moments;
- capability rather than decorative conversion UI.

Do not copy Sevenson pixel-for-pixel.

Borrow the logic.

## Secondary reference — Interdoor

Interdoor may influence:

- spacing;
- image crop;
- section rhythm;
- category-image treatment;
- contemporary polish.

It must NOT determine the page personality.

Priority:

**Sevenson first.  
Interdoor second.  
Aseptaclean strategy always.**

---

# 5. TARGET HOMEPAGE SILHOUETTE

The homepage should visually read like:

```text
SMALL UTILITY BAR
LEAN WHITE CORPORATE NAV

FULL-WIDTH PHOTOGRAPHIC HERO

WHAT WE HANDLE
large photographic capability routes

THE PROPERTY CONDITION CHANGES THE WORK
quiet differentiation + clear-scope message

OPERATING EVIDENCE / HOW ASEPTACLEAN WORKS
large image + real/sample artifact + accountability

FINAL IMAGE-LED CTA

CORPORATE FOOTER
```

That is the target.

Do NOT restore the old 13-section homepage architecture.

---

# 6. REQUIRED HOMEPAGE ORDER

## 01 — Utility + Main Navigation

## 02 — Hero

## 03 — What We Handle

## 04 — The Property Condition Changes the Work

## 05 — Operating Evidence / How Aseptaclean Works

## 06 — Final CTA

## 07 — Footer

No other standalone homepage section may be added unless it clearly earns its space and is separately approved.

---

# 7. CONTENT REMOVED FROM THE HOMEPAGE ARCHITECTURE

These ideas may remain elsewhere on the website, but they do NOT get independent homepage sections in this version:

- standalone “A Clear Scope Before Work Begins” section;
- separate long Services section;
- standalone Cost / Pricing section;
- standalone Fit / Boundaries section;
- large FAQ section;
- standalone founder section when no real founder photograph exists;
- separate Project Notes placeholder section without real project evidence;
- long exclusion lists;
- long service-area/city list;
- detailed deep-cleaning checklist;
- long cost-driver explanations;
- repeated explanations of why routine cleaning differs;
- repeated assessment CTA bands;
- homepage lead form.

Move useful content deeper instead of deleting useful website information.

---

# 8. HEADER

The current audited header is largely successful.

Preserve the lean horizontal feel.

## Desktop target

Utility:
- approximately 28–34px.

Main nav:
- approximately 64–72px.

Combined:
- roughly 95–105px.

Use a wide header container.

The header should feel stretched horizontally, not compressed into the center.

## 1024px behavior

Do not collapse the full navigation too early.

At approximately 1024px:

- preserve full navigation if it fits;
- keep the primary CTA visible;
- drop/reduce less important phone duplication before collapsing the whole nav.

If it truly does not fit comfortably, then collapse.

## Duplicate phone

Do not show the same phone number twice inside the header hierarchy.

Choose the most useful location.

## Sticky behavior

Utility may scroll away.

Main navigation may remain sticky.

---

# 9. HERO

Preserve the Sevenson-style hero structure:

> FULL-WIDTH PHOTOGRAPH  
> + FLAT DARK OVERLAY  
> + CENTERED COPY  
> + ONE PRIMARY CTA

## Headline

Use:

> **When a family property has become too much to handle.**

Do not rewrite it without approval.

## Supporting copy

Use the current approved short supporting line.

Keep it concise.

## Typography correction

The audited 54px H1 was too editorial relative to the target reference.

Desktop target:

- approximately **42–48px**;
- start around **44–46px** and tune visually.

Do not force the type to match Sevenson numerically if the actual font requires a small adjustment, but keep the same restrained scale.

Section H2s should generally land around:

- **36–42px** desktop.

Do not return to repeated 52px homepage H2s.

## Hero image correction

Do not use the current derelict/condemned-building image as the intended final direction.

The hero should communicate:

- a real family property;
- an overwhelming or neglected condition that Aseptaclean could reasonably address;
- residential context;
- seriousness without implying structural abandonment or demolition.

Real Aseptaclean photography is preferred.

A temporary development image is acceptable during layout work.

Do not present it as project proof.

## CTA

One:

> **Tell Us About the Property**

Phone remains secondary elsewhere.

---

# 10. WHAT WE HANDLE

This section REPLACES BOTH:

- the old “What Are You Dealing With?” recognition section;
- the old long standalone Services section.

The homepage does not need two separate routing systems for the same idea.

## Purpose

Achieve both:

1. “That looks like my situation.”
2. “Yes, Aseptaclean handles this type of problem.”

## Visual treatment

Photography leads.

Use three substantial image-led capability routes.

Suggested customer-facing categories:

### Overwhelming contents & hoarding

Short factual sentence.

### Neglected & heavily soiled properties

Short factual sentence.

### Estate, move-out & property transitions

Short factual sentence.

Use actual active routes/service-state data from the repository.

Do not expose gated services.

## Copy length

Each primary item should normally contain:

- title;
- one short sentence;
- one link.

Do not add three explanatory paragraphs.

Do not add a checklist panel.

Do not add a second service grid immediately afterward.

## Secondary service links

If important active service routes do not fit the three primary situations, use a restrained plain-text “More services” treatment below.

Do not create another card grid.

## Photography

At desktop, images should be visually substantial.

The section should feel closer to industrial/environmental capability photography than a SaaS feature grid.

Temporary licensed development imagery is allowed.

Production proof must be real.

---

# 11. THE PROPERTY CONDITION CHANGES THE WORK

This section ABSORBS the useful content from the old:

- “A Clear Scope Before Work Begins” section;
- routine-cleaning-vs-project comparison.

Do not keep both.

## Heading

> **The property condition changes the work.**

## Purpose

Explain one differentiating idea:

> routine maintenance and condition-specific property work are not the same job.

## Copy

Keep the explanation short.

Approved direction:

> Routine cleaning assumes the property is already being maintained. When contents, buildup, access, condition, or deadlines change the job, the work needs to be defined around the property.

Include the key scope idea naturally:

> **The scope is defined before work begins.**

## Comparison

A restrained comparison is allowed.

Example:

| Routine cleaning | Aseptaclean project |
| --- | --- |
| Maintained property | Condition-specific |
| Standard checklist | Defined scope |
| Routine visit | Project handoff |

Use only operationally true claims.

No cards.

No five-row process registry.

No sentence explaining that the columns are “not better and worse.”

No internal design rationale.

## Composition

This should be a quiet visual reset after the photo-heavy capability section.

Use typography, space, and rules.

Not another image grid.

---

# 12. OPERATING EVIDENCE / HOW ASEPTACLEAN WORKS

This single section REPLACES the old separate:

- Handoff Record section;
- founder/accountability section;
- fake/empty Project Notes area;
- generic trust block.

The goal is one concentrated credibility movement.

## Purpose

Translate Sevenson’s real-project authority into evidence Aseptaclean can truthfully support at its current scale.

Authority should come from:

- operating process;
- accountability;
- documentation;
- real people;
- real property work as it becomes available.

## Structure

Preferred composition:

> LARGE REAL / TEMPORARY OPERATIONAL IMAGE  
> +  
> SHORT COMPANY / PROCESS COPY  
> +  
> RESTRAINED REAL OR SAMPLE ARTIFACT  
> +  
> ONE DEEPER-PAGE LINK

Possible headline direction:

> **Clear work. Documented handoff.**

or another short factual heading if existing approved copy is stronger.

## Handoff artifact

The existing sample handoff record may be used because it is real/sample evidence, provided its sample status remains explicit.

Do not place a small card in a huge empty navy field.

The artifact must be integrated into a composition that works with or without a background photograph.

## Founder/accountability

Do not render an empty bordered founder-photo box.

If a real founder/operator photograph exists:

integrate it naturally into this section.

If not:

use concise factual accountability copy without pretending an image exists.

Detailed founder credentials belong on About.

## Project Notes

Do not fabricate Project Notes.

When Aseptaclean has a real completed documented job, this section can evolve toward stronger real project evidence.

## Link

Use a factual deeper-page route such as:

- How We Work;
- Handoff Standard;
- About;

only if the repository confirms the route.

---

# 13. COST / PRICING

There is NO standalone homepage pricing section in V3.

Detailed pricing factors belong on:

- service pages;
- request-assessment;
- appropriate deeper pages.

If a verified, approved minimum/start price is intentionally public and strategically important, it may appear as one restrained sentence in an appropriate location.

Do not automatically preserve any price found in the current build.

Verify current business data first.

Do not create pricing packages.

---

# 14. FIT / BOUNDARIES

There is NO standalone Fit / Boundaries homepage section in V3.

Useful boundaries belong on:

- service pages;
- services hub;
- request-assessment;
- relevant FAQ.

The homepage may contain one short factual line where necessary to avoid a misleading service implication.

Do not dump an eight-item exclusion list onto the homepage.

---

# 15. FAQ

Do not render the large homepage FAQ section.

Use the existing FAQ page if it exists and is active.

A simple footer/navigation link is sufficient.

Do not keep FAQ content on the homepage just to make the page longer or chase rich results.

---

# 16. FINAL CTA

Keep the current successful image-led closing concept.

## Heading

> **Tell us what is happening at the property.**

## Supporting copy

Short.

The visitor does not need to know a service name.

## Primary CTA

> **Tell Us About the Property**

## Secondary action

Phone is acceptable.

Do not add:

- huge form;
- badges;
- testimonials;
- statistics;
- three equal CTA buttons.

## Photography

The image should feel like a real South Bay residential/property context.

Real Aseptaclean imagery is preferred.

Temporary development imagery must be identified as temporary during build review.

---

# 17. FOOTER

Keep a conventional serious corporate footer.

Fix duplicate destinations/labels.

Do not list the assessment route twice under different names.

Do not add fake social links, proof, credentials, or future services.

---

# 18. MOBILE CTA CORRECTION

The audited `MobileCTA` showed three equal buttons.

That is not allowed for the homepage.

The homepage must have a clear primary action.

Preferred mobile behavior:

- primary: Tell Us About the Property;
- secondary: Call;
- optional text/photo action may live inside request-assessment or a lower-priority text link.

If `MobileCTA.astro` is shared by other pages, do NOT delete or globally alter behavior without checking impact.

Disable or adapt it for the homepage specifically if necessary.

---

# 19. DEVELOPMENT IMAGE RULING

For homepage DEVELOPMENT ONLY, this V3 brief supersedes the older temporary-image-count limitation.

Use enough properly licensed temporary images to evaluate a photography-led Sevenson composition.

This is NOT permission to represent temporary images as Aseptaclean proof.

Rules:

- mark temporary assets in development reporting;
- no AI-generated technicians;
- no fake Aseptaclean crew;
- no fake remediation;
- no fake before/after;
- no fake founder;
- no fake Project Notes;
- no fake customer evidence.

Before launch, any image that implies actual Aseptaclean work must be replaced with legitimate Aseptaclean evidence.

---

# 20. PHOTOGRAPHY PRIORITY

The visual system should be built to accept real evidence over time.

Priority real-photo library:

1. family-property hero image;
2. three property-condition/capability images;
3. founder/operator working image;
4. before/during/after from one completed project;
5. active work;
6. equipment;
7. vehicle;
8. real handoff/document artifact;
9. later legitimate remediation work after activation.

Do not compensate for these missing assets with decorative UI.

---

# 21. SECTION RHYTHM

The final page should feel approximately:

```text
lean header

large photo

three photographic capabilities

quiet differentiation

large operating/evidence composition

large final photo + CTA

footer
```

Avoid:

```text
heading + text
heading + text
heading + list
heading + table
heading + list
heading + FAQ
```

Photography and negative space should create the rhythm.

---

# 22. COPY RULE

The homepage should be dramatically shorter than the audited 1,678-word build.

Target discipline:

- hero: very short;
- What We Handle: one sentence each;
- differentiation: roughly 80–140 words total;
- evidence/company section: roughly 100–180 words total;
- final CTA: short.

Do not treat these as rigid SEO word counts.

The principle is:

> **Every sentence must earn homepage space.**

Move depth to deeper pages.

Do not destroy useful SEO/service content on those deeper pages.

---

# 23. TYPOGRAPHY

Use the existing approved site font stack.

Targets:

Hero H1:
- desktop ~42–48px;
- mobile ~36–42px.

Homepage H2:
- desktop ~36–42px;
- mobile ~30–36px.

Body:
- desktop 16–18px;
- mobile 16–17px.

Avoid repeated 52px H2s.

Avoid giant editorial headings used as a substitute for imagery.

Use balanced wrapping where appropriate.

---

# 24. CARDS / CONTAINERS

Cards are allowed only for semantic objects.

Do not create containers simply because content exists.

Avoid:

- rounded card farms;
- icon cards;
- fake proof cards;
- process cards;
- checklist panels on the homepage;
- giant bordered placeholder boxes.

Artifact/document treatment may have restrained physical framing where it helps comprehension.

---

# 25. RESPONSIVE TARGET

The page should become substantially shorter than the audited build.

Do not chase an exact pixel height, but use the audit as a warning.

The old build was:

- ~11,704px at 1440;
- ~17,170px at 390.

The revised architecture should be dramatically leaner.

Do not preserve excessive mobile height merely because all content stacks.

## 1024

Treat as tablet/desktop hybrid.

Keep full nav + CTA if it fits comfortably.

## 768

Simplify intentionally.

## 390

The visitor should understand in the first screen:

- who this is for;
- what kind of problem is handled;
- what to do next.

The rest should not feel like 40+ screens of scrolling.

---

# 26. TECHNICAL SAFETY

Do not alter without separate approval:

- route inventory;
- canonical logic;
- robots;
- sitemap;
- redirects;
- lead endpoint;
- schema;
- service-area generation;
- gated service activation;
- current legal/insurance claim logic.

Do not expose future regulated human-biohazard services.

---

# 27. DEAD CODE CLEANUP

The audit identified orphaned components from the previous homepage attempt.

Before deleting anything:

- confirm import count;
- confirm no other route uses the component.

If truly orphaned from the abandoned homepage build, remove them.

Do not delete shared components.

---

# 28. REQUIRED POST-BUILD QA

Test:

- 320px
- 360px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 200% zoom
- keyboard navigation
- reduced motion

Verify:

- no horizontal overflow;
- no missing imports;
- no console errors;
- no broken internal links;
- correct hero crop;
- correct responsive nav;
- CTA remains clear;
- image dimensions prevent layout shift;
- typography wraps cleanly;
- temporary images are documented;
- no new fake evidence.

---

# 29. SEVENSON SELF-CRITIQUE

After implementation answer:

## A. Photography test

Is photography carrying the visual page, or did UI/text take over again?

## B. Section-count test

Does every surviving section do a unique homepage job?

## C. Repetition test

Did any major layout pattern repeat more than twice?

## D. Copy test

Which sentences could still be cut?

## E. Evidence test

What is real proof vs temporary imagery?

## F. Operating-company test

Does this look like a serious company that performs physical property work, or a marketing agency landing page?

## G. Logo-swap test

Could another generic cleaning company swap its logo and retain most of the page?

If yes, identify why.

---

# 30. FINAL TARGET

The final homepage should feel like:

> **A real specialty property-cleanup company borrowing the restrained operating-company posture of Sevenson — not a conversion framework wearing Sevenson colors.**

The homepage should show:

- who Aseptaclean helps;
- what kinds of property situations it handles;
- why condition-specific work is different;
- how Aseptaclean creates control/accountability;
- what the visitor should do next.

Everything else can live deeper in the website.

Do not try to explain the entire business on the homepage.

Do not try to manufacture authority through UI.

**Let real work, photography, capability, and restraint carry the page.**
