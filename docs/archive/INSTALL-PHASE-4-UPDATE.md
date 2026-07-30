# Install the Phase 4 Update

## What this package does

This package updates the controlling documentation for the current Phase 4 build. It:

- resolves the phase-number conflict
- changes Phase 4 into a deep audit and corrective build
- replaces the prior typography direction
- adds the Private Residence Reset campaign strategy and build spec
- adds Termly-specific requirements
- expands the release checklist
- gives Codex an exact Phase 4 execution prompt

## Copy into the existing project root

Replace:

- `AGENTS.md`
- `.env.example`
- `docs/00-MASTER-BRIEF.md`
- `docs/01-QUALITY-GUARDRAILS.md`
- `docs/02-OWNER-INPUTS.md`
- `docs/03-BUILD-PLAN.md`
- `docs/04-RELEASE-CHECKLIST.md`
- `docs/05-DECISIONS-LOG.md`
- `docs/06-APPROVED-HOMEPAGE-COPY.md`

Add:

- `docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md`
- `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`
- `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md`
- `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`
- `PHASE-4-CODEX-PROMPT.md`

## Do not delete or replace

- `src/`
- `public/`
- `package.json`
- `astro.config.mjs`
- `.env`
- `.git/`
- your current code, assets, or provider credentials

The package does not contain real secrets.

## Run

Open `PHASE-4-CODEX-PROMPT.md`, copy its full contents, and send it to Codex from the existing repository.

Codex must inspect the real source before changing it.
