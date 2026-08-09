# Aseptaclean Codex Starter

## What this package is

This package is the control system for building the current Aseptaclean Astro one-page launch.

Do **not** paste every document into each Codex prompt. Put these files in the repository root. Codex reads `AGENTS.md` before working, and that file tells it which deeper source to read for the current task.

## File roles

- `AGENTS.md` — short always-on operating instructions and precedence
- `docs/00-MASTER-BRIEF.md` — single source of truth for the business, offer, page, copy, funnel, technical requirements, and acceptance criteria
- `docs/01-QUALITY-GUARDRAILS.md` — deep $20K-quality and anti-AI craft standard
- `docs/02-OWNER-INPUTS.md` — confirmed facts and unresolved production values
- `docs/03-BUILD-PLAN.md` — phased execution and stop conditions
- `docs/04-RELEASE-CHECKLIST.md` — final release gate
- `docs/05-DECISIONS-LOG.md` — only owner-approved changes
- `.env.example` — centralized runtime/public configuration
- `START-CODEX-PROMPT.md` — first task to paste into Codex

## Recommended workflow

1. Create or open the Git repository that will contain the Astro site.
2. Copy this package into the repository root.
3. Do not include the older WordPress or multi-page website documents in the active instruction set.
4. Open the repository in Codex.
5. Paste the contents of `START-CODEX-PROMPT.md`.
6. Review and approve the plan before allowing code changes.
7. Run one phase at a time from `docs/03-BUILD-PLAN.md`.
8. Require screenshots and test evidence at every phase gate.
9. Update `docs/05-DECISIONS-LOG.md` only after an owner decision.
10. Do not launch until `docs/04-RELEASE-CHECKLIST.md` and the master 90/100 gate pass.

## Local commands

- `npm install` — install the locked dependencies
- `npm run dev` — start local development
- `npm run check` — run Astro and TypeScript diagnostics
- `npm run build:staging` — create a crawl-blocked staging build
- `npm run build` — validate all required public production values, then build
- `npm run qa:phase1` — run the Phase 1 browser checks against a local preview

Copy `.env.example` to the environment-specific configuration managed by the
deployment platform. Do not commit private credentials. A public production build
requires verified phone, form endpoint, privacy contact, and deployment values;
optional unsupported claims remain suppressed when their values are empty.

## What not to do

- Do not hand Codex one huge prompt and say “build the whole website.”
- Do not mix current Astro instructions with the older WordPress or multi-page system.
- Do not let Codex invent missing phone, insurance, license, form, or analytics values.
- Do not approve the site from one desktop screenshot.
- Do not accept “premium,” “accessible,” or “optimized” without evidence.
- Do not expand to multiple SEO pages before the flagship offer begins generating real jobs and the owner authorizes expansion.
# website
