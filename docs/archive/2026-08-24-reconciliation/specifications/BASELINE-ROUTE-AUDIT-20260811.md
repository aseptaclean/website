# Baseline route audit — 2026-08-11

Run at the start of the docs/ consolidation session (docs/22DOCDISPOSITION.md), against the
whole repository, to serve as the reference point for every future change. Procedure per
`.claude/skills/route-audit/SKILL.md`.

## Redirect collisions

Checked every source in `public/_redirects` (31 rules, 30 named sources + 1 splat) against the
25 real routes under `src/pages/`. **Zero collisions found.** The one known historical
collision — `/estate-cleanout-san-jose/` and `/hoarding-cleanup-san-jose/` retirement lines
301'ing over real built pages — is confirmed already fixed: neither line exists in the current
`public/_redirects` (removed per `docs/04-RELEASE-CHECKLIST.md` C6). No `curl -I` against a live
preview was run this pass (no deployed preview available from this environment); this is a
static source-list diff only. Re-verify against a live preview before cutover per C7.

## Indexable → noindex crawl paths

- `/services/` → 8 noindex drafts (`estate-cleanout-san-jose`, `hoarding-cleanup-san-jose`,
  `animal-waste-cleanup-san-jose`, `senior-downsizing-san-jose`, `deep-cleaning-san-jose`,
  `property-cleanouts-for-managers`, `estate-cleanout-checklist`, `service-areas`) —
  placeholder count: `servicePages.ts` carries 23 `[OWNER INPUT:` strings across the pillar
  data these link to. Matches `docs/04-RELEASE-CHECKLIST.md` C10 exactly.
- `/who-we-help/` → same set, same mechanism (`whoWeHelpHub.segments` in `servicePages.ts`).
- `/contact/` has no page-level `noindex` prop (defaults to indexed, gated globally by
  `SeoHead.astro`'s production-only rule) and is linked from both hubs — not itself a
  noindex target, no finding here.

Recommendation: unchanged from C10 — this is an owner-level decision on which drafts ship
first, not something this audit can resolve by editing routes.

## Orphans

**Routes with no inbound internal links:** `/service-areas/` — confirmed zero `href`
references anywhere in `src/pages` or `src/components`, and absent from `site.ts` nav/footer
data. `servicePages.ts:405` merely *defines* its slug string as page metadata; that is not an
inbound link.

**Redirect targets with no inbound links:** `/service-areas/` again — 7 `_redirects` rules
(`/locations/`, `/san-jose/`, `/santa-clara/`, `/sunnyvale/`, `/mountain-view/`, `/campbell/`,
`/milpitas/`) all 301 into it. Matches doc 22 §4b's count exactly.

**Unimported components:** `OutcomeComparison.astro` and `Qualification.astro` — zero imports
anywhere in `src/pages` or `src/layouts`. `CategoryContrast.astro` — also zero real imports;
its only hit is a comment in `about/index.astro:264` referencing it by name, not an import.

## Doc reconciliation (vs. `docs/19-SYSTEM-AND-SITEMAP.md` Part 2)

**In code, not in doc 19:** `/services/` and `/who-we-help/` — both live, in nav, footer, and
`sitemap.xml.ts`, absent from doc 19's Phase map and per-page SEO spec entirely.

**In doc 19, not in code:** doc 19 Phase 1 still lists `/about/`, `/contact/`, and
`/handoff-standard/` as "live this week" — all three are already built and live. Stale framing,
not a missing route.

This is addressed by this session's task step 5 (reconcile Part 2 to doc 22 §4b) — see the
disposition report for the applied fix.

## Never-build check

Clean. Zero hits for any of: `/biohazard-cleanup*`, `/blood-cleanup/`,
`/unattended-death-cleanup/`, `/crime-scene-cleanup/`, `/human-waste-cleanup/`,
`/sharps-cleanup/`, `/encampment-cleanup/`, `/vehicle-biohazard-cleanup/`, any `/locations/*` or
`/projects/*` route, garage-cleanout, basement-cleanout, furniture-removal, mattress-disposal,
or a reviews page, anywhere under `src/pages/`.

## Verdict

One open finding carried forward unchanged from `docs/04-RELEASE-CHECKLIST.md` (C10, the
indexable→noindex crawl path) — owner decision, not fixable by this audit. One orphan
(`/service-areas/`) and three unimported components, both already known and both addressed by
documentation (not code deletion) in this session's disposition work. No new failure mode
found. This report is the reference point for future changes.
