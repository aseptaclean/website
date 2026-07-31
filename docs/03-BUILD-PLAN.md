# Codex Build Plan — One-Page Astro Launch

> **Superseded scope.** `07-ONE-PAGE-DIRECTIVE.md` controls route architecture and scope as of
> Phase 4. The multi-page phase sequence below is cancelled. Kept for reference only — do not
> use it to justify building any route or page not listed in `07` §2.

Work through these phases in order. Stop at each approval gate.

## Phase 0 — Audit and implementation plan

Do not write production code.

Deliver:
- interpretation of the flagship offer and buyer
- proposed repository structure
- mobile-first page order
- desktop composition map
- component plan
- form architecture recommendation
- environment-variable map
- claims and production-fact risks
- image/artifact plan
- performance risks
- list of questions that materially block implementation

Stop for owner approval.

## Phase 1 — Foundation

Build only:
- Astro project scaffold
- TypeScript configuration
- centralized site configuration
- environment validation
- tokens and global styles
- BaseLayout and SEO head
- header, anchored navigation, mobile CTA, footer
- initial routes with empty semantic shells
- sitemap, robots, staging noindex behavior
- asset-manifest template

Stop when:
- production build fails on required missing variables
- blank routes render at 320, 390, 768, and 1280px
- keyboard navigation works
- no horizontal overflow exists

## Phase 2 — Homepage composition and copy

Before code, show 2 composition directions that both follow the brief but differ materially in rhythm and signature treatment. Recommend one and explain why.

Build the approved direction in three passes:
1. Hero through category contrast
2. Outcome, Five-Stage Handoff Standard, scope, and assurance
3. Pricing, founder, next steps, FAQ, final CTA, footer closure

Required signature artifact:
- an accurately rendered SAMPLE Property Handoff Record or room-by-room scope artifact

Stop after each pass for screenshot review.

## Phase 3 — Request-assessment funnel

Build:
- `/request-assessment/`
- three-step assessment form
- progressive enhancement
- local progress preservation where practical
- file upload states
- inline and summary errors
- loading, disabled, success, and failure states
- UTM/source capture
- server/form endpoint integration architecture
- `/thank-you/` noindex route

Do not claim completion until real test submissions are received by the configured destination.

## Phase 4 — Legal and operational routes

Build:
- `/privacy/`
- `/terms/`
- final thank-you behavior
- footer legal links
- scope and assessment disclaimers

Legal copy must remain clearly marked for legal review where applicable.

## Phase 5 — Integration and analytics

Verify:
- form submissions
- notification path
- confirmation behavior
- analytics events
- thank-you conversion event
- consent behavior
- centralized business facts
- no placeholder leak

## Phase 6 — Premium QA and anti-AI audit

Run the full release review from the master brief and quality guardrails.

Required:
- screenshots: 320, 390, 768, 1024, 1280, 1440px
- keyboard notes
- JS-disabled result
- form-state evidence
- Lighthouse mobile
- accessibility audit
- schema validation
- sitemap/robots check
- asset/license manifest
- claims audit
- anti-AI forensic audit
- 100-point score

Release decision must be `SHIP`, `REVISE`, or `BLOCKED` with evidence.
