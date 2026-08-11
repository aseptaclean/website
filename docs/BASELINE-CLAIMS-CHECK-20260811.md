# Baseline claims-check — 2026-08-11

Run at the start of the docs/ consolidation session (docs/22DOCDISPOSITION.md), against the
whole repository, to serve as the reference point for every future change. Procedure per
`.claude/skills/claims-check/SKILL.md`, authority `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`.

Surfaces reviewed: all strings in `src/pages/**/*.astro`, `src/components/**/*.astro`,
`src/data/site.ts`, `src/data/servicePages.ts`.

## Violations found

None.

## Left deliberately

- `src/components/StatusRibbon.astro:5` — code comment enforcing absence of "licensed." The
  control, not a claim.
- `src/components/FAQ.astro:19` — verbatim animal/organic clause, complete with "sterilization."
  Correct.
- `src/components/FAQ.astro:24` — "refer you to the appropriate licensed specialist" — refers
  the customer *out* to a third party's license, does not claim one for Aseptaclean.
- `src/components/FAQ.astro:39` — exclusion list naming "remediation," "habitability," etc. as
  services Aseptaclean does *not* perform. Negation.
- `src/components/AssessmentForm.astro:1134,1169` — `sanitizeReferrer` is a JS identifier
  (input-sanitization function), unrelated to the claims sense of "sanitize."
- `src/data/site.ts:74-75` — code comments documenting why remediation language is absent.
- `src/data/site.ts:171` — scope disclaimer, verbatim negation ("not a licensed general
  contractor, remediation contractor, pest-control operator...").
- `src/data/site.ts:173` — documentation disclaimer, verbatim negation ("not regulatory
  clearance... or a determination that a property is safe or habitable").
- `src/data/site.ts:177` — founder authority clause, verbatim and complete.
- `src/data/site.ts:310-311,314` — code comments explaining exclusion of biohazard/remediation
  content and the licensed/self-shot image rule.
- `src/data/site.ts:333` — verbatim animal/organic clause.
- `src/data/site.ts:378` — "Sewage or active mold remediation" inside an exclusion list (what
  the company does *not* do).
- `src/data/servicePages.ts:4,245-246,436,630` — code comments enforcing absence of banned
  vocabulary.
- `src/data/servicePages.ts:538` — distinguishes "surface and finish restoration through
  cleaning" (permitted) from damage-restoration, "a separate licensed industry we do not
  perform" (correct negation).
- `src/data/servicePages.ts:651` — verbatim animal/organic clause.
- `src/pages/who-we-help/index.astro:9`, `src/pages/services/index.astro:8` — code comments
  documenting the deliberate absence of a biohazard nav segment/pillar.
- `src/pages/animal-waste-cleanup-san-jose/index.astro:8-9` — code comment recording the banned-
  word grep already run against this page.
- `src/pages/hoarding-cleanup-san-jose/index.astro:10` — code comment confirming "hoarder" as a
  noun does not appear on the page.

**Mandatory verbatim clauses** — both present, complete, and identical everywhere they appear:
- Animal/organic clause (incl. required word "sterilization"): `FAQ.astro:19`, `site.ts:333`,
  `servicePages.ts:651`.
- Founder authority clause: `site.ts:177`.

**Structural prohibitions** — clean. No fabricated review, rating, testimonial, project count,
case study, client logo, badge, statistic, or before/after image found anywhere in `src/`. No
stat bar. No stock/AI-generated crew, property, or document imagery (zero `<img>` tags exist in
`src/` at all — a pass by absence, per `docs/04-RELEASE-CHECKLIST.md` C20). No human-biohazard
service implied. No pest inspection/treatment implied. Disposal is framed only as
hauler-engaged, never self-performed, everywhere it's mentioned.

**Price figures** — only `$195` appears as a published service price. `AssessmentForm.astro:412-
414` has `$2,000–$3,499` / `$3,500–$5,999` / `$6,000+` as **customer self-reported budget-range
options** in the intake form, not a published price claim — different category, not a
violation, but flagged here so a future pass doesn't mistake it for one.

**Placeholders** — 23 `[OWNER INPUT:` strings exist, confined to five files
(`ServiceProof.astro`, `servicePages.ts`, `estate-cleanout-checklist/index.astro`,
`property-cleanouts-for-managers/index.astro`, `deep-cleaning-san-jose/index.astro`), and every
consuming page ships `noindex`. Acceptable per the skill's own rule (noindex draft = OK,
indexable/linked-from-indexable-hub = not OK). Matches `docs/04-RELEASE-CHECKLIST.md` C11
exactly.

## Needs an owner call

- **Palo Alto service-area listing** (`src/data/site.ts`) — PAMC 5.20.040(b) may reach
  labor-only companies; unconfirmed. Pre-existing, not introduced this session. Already flagged
  on `docs/04-RELEASE-CHECKLIST.md` C12's punch list — not re-litigated here.
- **Insurance/endorsement wording vs. current COI** — `docs/04-RELEASE-CHECKLIST.md` C15,
  unresolved, requires the physical/PDF certificate. Not resolvable by editing copy.

## Verdict

Clean. Zero violations across the full repository. This matches the skill's own stated
baseline ("audits found zero instances...") and `docs/04-RELEASE-CHECKLIST.md` C12's prior
sweep. This report is the reference point — any future finding should be a *new* regression
against this baseline, not a rediscovery of something already resolved here.
