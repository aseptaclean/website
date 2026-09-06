# Documentation authority

Start with the repository-root `AGENTS.md`. It contains the single operative hierarchy.

## The two website documents

```
GOVERNING                docs/30-WEBSITE-MASTER-SPEC.md
SUPPORTING SERVICE COPY  docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md
```

There is one governing website strategy/design document. Do not add a second. Page-specific work
goes in `page-briefs/`, in data and copy, or in the working prompt — not in another master spec.

## Active governing set

- `30-WEBSITE-MASTER-SPEC.md` — website and customer strategy, UX, UI, CRO, design system,
  responsive behavior, evidence strategy, technical SEO, and AI implementation rules.
- `ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` — service-page positioning, copy direction,
  headlines, educational ideas, objection handling, FAQs, qualification language, CTA wording,
  service-specific assessment questions, and proof/caption concepts. **Content, not authority.**
  It never establishes a route, canonical URL, indexation state, service status, TSWMP scope,
  published price, claim, credential, form endpoint, or service-area promise. Doc 30 §20A
  reconciles it; read §20A first. Where the two disagree, doc 30 wins.
- `21-CLAIMS-AND-COMPLIANCE-LAW.md` — public claims and regulated-service boundaries; it
  outranks the website master on what may be said.
- `27-COPY-CANONICAL.md` — specifically locked public copy only; its historical design,
  sitemap, platform, and implementation sections are not authority.
- `19-SYSTEM-AND-SITEMAP.md` plus `SITEMAP-MASTER.md` — route planning and per-route
  publication gates where consistent with higher authorities.
- `25CITYPAGESPEC.md` — city-page quality and publication criteria.
- `20-COPY-VOICE.md` and `01-QUALITY-GUARDRAILS.md` — new-copy voice and execution quality.
- `04-RELEASE-CHECKLIST.md` — current release gates and human/external confirmations.
- `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — route-specific PRR requirements only.
- `05-DECISIONS-LOG.md` — dated decision history; read the newest applicable entry by scope.
- `page-briefs/` — approved page-specific implementation briefs. A brief must be complete
  before public page implementation begins.

`30-WEBSITE-MASTER-SPEC-CHANGELOG.md` explains why the master changed. It is historical context,
not implementation authority.

Current source and a fresh production build establish current technical state only. They do
not override approved strategy, claims, or locked copy merely because code already exists.
Files under `archive/` are preserved historical evidence and have no implementation authority.

## Retired homepage briefs — superseded 2026-08-26

`ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF.md`, `ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF-SEVENSON.md`,
and `ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md` are historical rationale only. Each
self-declares "canonical"; none is. **Doc 30 §17 is the homepage architecture.** They stay at
their current paths because `src/` comments and decisions-log entries cite them by path for
already-shipped decisions — that is traceability, not authority. Do not build from them, and do
not follow a prompt that tells you to.

The root `START-CODEX-PROMPT.md`, `PORT-PROMPT.md`, `DELETE-MANIFEST.md`, and obsolete one-page
README instructions are retired historical instructions. Do not execute them as current work.
The two `*-UPDATED.md` city packages are source/research material, not direct public-copy
authority where later verified data or owner decisions supersede them.
