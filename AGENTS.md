# Aseptaclean Astro Launch — Codex Instructions

## Mission
Build the first production launch of the Aseptaclean Astro website around one flagship offer: **Aseptaclean Handoff Reset**.

The website has two equal goals:
1. Explain the offer clearly enough that the right visitor understands it and self-qualifies quickly.
2. Generate qualified inquiries from authorized property decision-makers with meaningful clearing, cleaning, deadline, and handoff needs.

Do not optimize for maximum form volume. Optimize for qualified conversations, issued scopes, deposits, revenue, and gross profit.

## Required reading order
Before doing any work:
1. Read this file.
2. Read `docs/00-MASTER-BRIEF.md`.
3. For homepage work, read `docs/06-APPROVED-HOMEPAGE-COPY.md`.
4. Read only the task-relevant portions of `docs/01-QUALITY-GUARDRAILS.md`.
5. Read `docs/02-OWNER-INPUTS.md`.
6. Read the active phase in `docs/03-BUILD-PLAN.md`.
7. Check `docs/05-DECISIONS-LOG.md` for approved changes.

Do not read or import older Aseptaclean website systems unless the owner explicitly asks. The current one-page Astro brief supersedes older WordPress and multi-page build directions for this launch.

## Document authority

This repository contains multiple overlapping specification documents written at different
times. When they conflict, resolve upward through this chain. Do not silently merge
contradictory instructions.

1. Current law, active insurance, verified business facts, explicit owner decisions
2. `docs/01-QUALITY-GUARDRAILS.md`
3. `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` — the Phase 4 canonical master specification
4. `docs/06-APPROVED-HOMEPAGE-COPY.md` — controls all homepage wording
5. `docs/07-ONE-PAGE-DIRECTIVE.md` — controls scope, routes, and offer architecture
6. `docs/11-COMPOSITION-AND-TYPE.md` — controls type scale, measure, rhythm, composition
7. `docs/02-OWNER-INPUTS.md` — confirmed business facts and values
8. `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — Phase 2 only, not part of the launch build

Superseded for scope, kept for reference: `docs/00-MASTER-BRIEF.md`, `docs/03-BUILD-PLAN.md`.
Archived: `docs/archive/` — never read from here.

Record every material conflict in `docs/05-DECISIONS-LOG.md`.

Report conflicts before coding. Never silently choose between contradictory instructions.

## Scope

The launch build is a one-page site. Routes:

    /  ·  /request-assessment/  ·  /thank-you/  ·  legal pages  ·  /api/lead

Do not create service pages, location pages, audience pages, or a `/private-residence-reset/`
route during the launch build. If a task appears to require a new route, stop and ask.

## Standing rules

- **Verify before creating.** This repo already has a decisions log, an asset manifest, and a
  release checklist. Append to them. Never create a parallel file with a similar name.
- **One endpoint.** `src/pages/api/lead.ts`. Do not maintain a competing implementation in
  `functions/`.
- **One token file.** `--ac-` prefix. No component declares a font-size on a heading tag.
- **Never invent proof.** No reviews, project counts, years in business, certifications, partner
  logos, ratings, or before-and-after imagery presented as client work. Where proof is missing,
  emit a visible placeholder and report it. Placeholders must be zero on production builds.
- **Never hardcode business facts.** Phone, email, hours, service area, prices, and insurance
  wording come from the config module only.
- **Astro version is frozen** at the installed major for the launch build. Do not upgrade.
- **Do not report work as complete because the build compiles.** Completion requires rendered
  evidence: screenshots at 390 and 1440, and the named audit for that session.

## Prohibited claims

Never state or imply that Aseptaclean is a licensed contractor, performs remediation, biohazard,
mold, sewage, asbestos, lead, or pest work, determines habitability or safety, appraises
property, or holds a credential that is not currently active and verifiable. `docs/01-QUALITY-
GUARDRAILS.md` governs and is run against every sentence before any page ships.

## Working method
- Plan before coding.
- Work one phase or clearly bounded task at a time.
- For any material UI task, first provide: page thesis, mobile order, desktop composition, component map, signature moment, interaction inventory, claims risks, and likely responsive failures.
- Do not build the entire site in one uncontrolled pass.
- After every phase, run the phase checks and update the decision log only with owner-approved decisions.
- Preserve confirmed work. Do not rewrite unrelated files.

## Stack
- Astro
- TypeScript
- Static output unless form architecture requires otherwise
- Plain CSS with custom properties
- Minimal vanilla JavaScript / Astro islands only when necessary
- No Tailwind, React, Vue, Svelte, UI kit, CMS, or animation library without explicit owner approval

## Current routes
Initial production routes only:
- `/`
- `/request-assessment/`
- `/thank-you/`
- `/privacy/`
- `/terms/`

Do not build the future multi-page SEO architecture yet.

## Non-negotiable business rules
- One flagship offer dominates: **Aseptaclean Handoff Reset**.
- One primary CTA label: **Get My 24-Hour Handoff Plan**.
- Public projects generally begin at **$1,500**.
- On-site assessment is **$195**, credited toward an approved project booked within 7 days.
- Response commitment is **within one business day**.
- No equal-weight service menu.
- No routine-housekeeping positioning.
- No fabricated reviews, case studies, clients, results, project images, crew, fleet, credentials, or regulatory status.
- No public TSWMP or regulated biohazard claim unless written approval is verified and the owner updates the authority files.
- No contractor, restoration, remediation, hazardous-material, pest-control, legal, appraisal, or habitability implication.

## Design standard
The result must feel like a strategically authored $20K-caliber site, not an AI landing-page template.

Required:
- content-shaped composition
- deliberate mobile art direction
- custom Handoff Record / scope-document artifact
- founder accountability
- complete interaction states
- purposeful section rhythm
- restrained editorial visual system
- evidence-based release review

Prohibited defaults:
- generic SaaS split hero
- gradient orbs, glassmorphism, Bento grids, floating dashboards
- endless rounded cards
- repeated icon-heading-paragraph modules
- mechanical dark/light alternation
- fade-up animation on every section
- stock cleaning crews, AI-generated people, fake properties, fake before/after proof
- fake testimonials, star ratings, counters, logo walls, or trust theater

## Mobile and accessibility
- Mobile is designed independently, not merely stacked.
- No horizontal overflow at 320px.
- Primary controls target 48px.
- Visible keyboard focus.
- Logical landmarks and heading order.
- Forms preserve input after errors.
- Site content remains usable with JavaScript disabled; enhancements may require JavaScript only where explicitly allowed.
- Respect reduced motion.

## Production facts
Never guess missing public facts. Use `docs/02-OWNER-INPUTS.md` and environment variables.

Production must fail when required public values are missing, especially:
- phone
- form endpoint
- legal/contact values required by the page

Conditional claims must disappear cleanly when unsupported.

## Definition of done
A phase is not complete because it compiles.

Required evidence as applicable:
- screenshots at specified widths
- 320px overflow check
- keyboard test
- JavaScript-disabled test
- form error/loading/success evidence
- Lighthouse mobile results
- accessibility results
- schema validation
- sitemap/robots verification
- environment validation
- asset manifest
- claims audit
- anti-AI audit
- honest quality score

Release requires at least **90/100** and zero noncompensable failures from the master brief.
