# AGENTS.md — precedence block

Merge this into the existing `AGENTS.md` at the repo root. Do not replace the file; keep any
build, test, or environment instructions already there.

`AGENTS.md` is loaded on every Codex run. Everything else in `docs/` is loaded only when a prompt
names it. That makes this the only place a precedence chain is reliably enforced — which is why
it goes here and not only in a document the agent may never open.

Keep it short. An `AGENTS.md` of several hundred lines gets skimmed.

---

```markdown
## Document authority

This repository contains multiple overlapping specification documents written at different
times. When they conflict, resolve upward through this chain. Do not silently merge
contradictory instructions.

1. Current law, active insurance, verified business facts, explicit owner decisions
2. `docs/01-QUALITY-GUARDRAILS.md`
3. `docs/10-PHASE-4-DEEP-DIVE-REPAIR….md` — the Phase 4 canonical master specification
4. `docs/06-APPROVED-HOMEPAGE-COPY.md` — controls all homepage wording
5. `docs/07-ONE-PAGE-DIRECTIVE.md` — controls scope, routes, and offer architecture
6. `docs/11-COMPOSITION-AND-TYPE.md` — controls type scale, measure, rhythm, composition
7. `docs/02-OWNER-INPUTS.md` — confirmed business facts and values
8. `docs/08-PRIVATE-RESIDENCE-RESET….md` — Phase 2 only, not part of the launch build

Superseded for scope, kept for reference: `docs/00-MASTER-BRIEF.md`, `docs/03-BUILD-PLAN.md`.
Archived: `docs/archive/` — never read from here.

Record every material conflict in `docs/05-DECISIONS-LOG.md`.

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
```

---

## Two substitutions before you paste

- Line 3 of the chain: replace with the exact filename Session 1 confirms for the canonical
  specification.
- Line 8: replace with the exact Private Residence Reset filename.

If Session 1 finds that the canonical specification is not `10-PHASE-4-DEEP-DIVE-REPAIR…`,
fix it here first. Every session prompt in `docs/12-SESSION-PROMPTS.md` depends on this chain
being correct.
