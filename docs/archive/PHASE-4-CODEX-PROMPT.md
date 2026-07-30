# Phase 4 Codex Execution Prompt

We are currently in Phase 4.

Do not restart the project, scaffold a second Astro site, or discard working Phase 1–3 code.

Read in this order:

1. `AGENTS.md`
2. `docs/00-MASTER-BRIEF.md`
3. `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`
4. `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md`
5. `docs/06-APPROVED-HOMEPAGE-COPY.md`
6. `docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md`
7. `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`
8. `docs/02-OWNER-INPUTS.md`
9. `docs/03-BUILD-PLAN.md`
10. `docs/04-RELEASE-CHECKLIST.md`
11. `docs/05-DECISIONS-LOG.md`

## Mission

Complete the Phase 4 deep audit and corrective build.

You must:

- inspect the actual repository before editing
- preserve working implementation
- fix every material premium-design, typography, responsive, accessibility, SEO, copy-pacing, form, legal/consent, integration, performance, claims, and production defect
- add the controlled Private Residence Reset campaign page and residence-specific assessment variant
- finish with evidence and a release decision

## First response before code

Provide:

1. current route and component inventory
2. current CSS/font/token inventory
3. current form and integration architecture
4. current Termly/legal behavior
5. baseline build/test results
6. baseline screenshots at 320, 390, 768, 1024, 1280, and 1440px
7. severity-ranked audit mapped to the controlling files
8. files you will preserve
9. files you will modify or add
10. implementation sequence and rollback risks

Then proceed through the active Phase 4 plan. Do not wait for a separate approval unless a true owner credential, legal value, or irreversible decision blocks the work.

## Required implementation decisions

- Handoff Reset remains the public flagship.
- Private Residence Reset is a controlled campaign page at `/private-residence-reset/`.
- Keep the campaign page outside primary navigation during the pilot.
- Quarterly Residence Reset Care remains private retention after the baseline.
- Replace the prior Montserrat/Open Sans implementation with self-hosted Newsreader Variable and Instrument Sans Variable.
- Preserve the approved homepage emotional outcome and strengthen its presentation.
- Use the shared `/api/lead` endpoint with explicit offer variants.
- Termly controls Privacy, Terms, Cookie Policy, consent, and Cookie Preferences.
- Do not expose real secrets or invent missing credentials.
- Do not invent proof, projects, reviews, imagery, licensing, regulatory authority, or operational capability.

## Final evidence

Return:

- exact changed-file list
- baseline/final screenshots
- type/token diff
- build/type/lint/test output
- Lighthouse mobile reports
- accessibility notes
- schema/canonical/sitemap/robots evidence
- form and provider-failure evidence
- Termly consent evidence
- client-bundle secret scan
- claims audit
- anti-AI audit
- 100-point score
- `SHIP`, `REVISE`, or `BLOCKED`

Do not call the work complete because it compiles.
