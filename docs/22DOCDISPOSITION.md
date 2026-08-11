# 22 — Documentation Disposition and Sitemap Reconciliation

**Date:** 2026-08-11. **Status:** ACTIVE worklist. Execute, then delete this file.

`docs/` currently holds **30 markdown files, 11,146 lines**. An agent cannot hold that. Nine of
those files are superseded, orphaned, or describe build states that never existed, and one of
them — `AGENTS-PRECEDENCE-BLOCK.md` — actively instructs deleting the working lead endpoint.

**Target: 17 files, ~6,100 lines. A 45% cut, with nothing live lost.**

The rule throughout: **extract what is still binding, then delete.** Never delete a file whose
live content has not been moved somewhere in the precedence chain first.

---

## 1. Delete outright — nothing live inside

| File | Lines | Why |
| --- | --- | --- |
| `AGENTS-PRECEDENCE-BLOCK.md` | 78 | Its "One endpoint: `src/pages/api/lead.ts`" rule is inverted. That file has never existed; `functions/api/lead.ts` is the only implementation. Replaced by root `AGENTS.md`. **Delete first.** |
| `17-REFERENCE-TRANSLATION-MARTEL.md` | 368 | Orphaned and dangerous. Depends on four files that do not exist, names eight tokens and five components that do not exist, and specifies a TrustBar reading `licensed · insured · owner-led · unmarked` — which `18` §7 and doc 21 forbid outright. |
| `03-BUILD-PLAN.md` | 119 | Superseded for routes and scope. Its only surviving rule (build fails on missing env vars) is implemented in `scripts/validate-env.mjs`. |
| `12-SESSION-PROMPTS.md` | 366 | All nine sessions have run. Predates `18-VISUAL-DIRECTION.md` and still instructs "The Mark at three appearances maximum" (cap superseded) and to apply `11` §5 "exactly" (contradicted by `18` §6). Replaced by `CLAUDE-CODE-PROMPTS.md`. |
| `13-REMEDIATION-PASS.md` | 188 | Its §1 describes an approximation at commit `88ab2a6` that never built the `--ac-` architecture. D1–D11 are all resolved or superseded. Not a valid regression guard. |
| `PHASE-4-AUDIT.md` | 224 | Every finding remediated and re-verified. Historical only; the decisions log preserves the outcomes. |
| `archive/` — all 6 files | 1,320 | `09-PREMIUM-VISUAL…`, `INSTALL-PHASE-4-UPDATE`, `PHASE-4-CLOSEOUT-PROMPT`, `PHASE-4-CODEX-PROMPT`, `PHASE-4-COMPOSITION-AND-TYPE`, `PHASE-4-ONE-PAGE-DIRECTIVE`, `PHASE-4-SESSION-PROMPTS`. All superseded by numbered successors. Four of the nine dangling doc references point into this directory. |
| `aseptaclean-homepage-mockup.html` | — | Superseded by `aseptaclean-FINAL-v2.html`. `15`'s contrast findings reference its dead token names (`--steel-400`, `--body-gray`). |
| `aseptaclean-clinical-direction.html` | — | Superseded direction, never adopted. |
| the `site map` project doc | — | Describes a `/services/*` + `/locations/*` architecture with biohazard, trauma-scene, decomposition, rodent-droppings, and post-infestation routes plus a `/projects/` case-study hub. Parts are unlawful to publish per doc 21 §3 and §5. **Superseded by `19` — see §4 below.** **Superseded-banner note (2026-08-11): no file matching this description exists anywhere in the current `docs/` tree (checked `docs/`, `docs/archive/`, and every `.html` file). This row, `AGENTS.md` §5, and §4b below are the only record of it and now function as its superseded notice. If a source file for it surfaces later, add this same banner to it directly; until then treat this entry as authoritative and never build `/services/{service}/`, `/locations/{city}-ca/`, `/projects/`, or any biohazard/rodent route from it.** |

**Subtotal deleted: 2,663 lines + 3 HTML files.**

---

## 2. Extract, then delete — live content inside

Do not delete these until the named sections have been moved. Verify the move, log it, then delete.

### `00-MASTER-BRIEF.md` — 1,923 lines, the single biggest file

Superseded by doc 10 as its own banner admits. Three sections are still the only home for
their content:

| Section | Move to |
| --- | --- |
| §9 Assessment Form Specification (3-step field list, microcopy, completion message, form behavior, lead-response standard) | `19-SYSTEM-AND-SITEMAP.md` Part 4 |
| §13 Analytics event names (`handoff_plan_click`, `assessment_start`, `assessment_submit`, `photo_upload`, `qualified_lead`, `quote_issued`, `deposit_collected`) | `19` Part 4 — doc 10 has no analytics event list |
| §11 Structured-data types and §11.1 the three required disclaimers | `21-CLAIMS-AND-COMPLIANCE-LAW.md` §6 |

Everything else in it — the offer, the mechanism, the copy, the tech spec — has a newer home.

### `07-ONE-PAGE-DIRECTIVE.md` — 298 lines

Superseded for scope by `19`. Four sections are explicitly **not** superseded and are cited by
the audit:

| Section | Move to |
| --- | --- |
| §3 the fourteen pre-resolved conflict rows | `05-DECISIONS-LOG.md` — they are decisions, not directives |
| §4 the SEO correction (situational hoarding/estate language, the required FAQ question, `hoarder` never a noun) | `19` §2.2 and `21` §2.2 |
| §6 guarantee reconciliation (the sixth discretion item) | `19` §3 — the item already renders; record the requirement |
| §7 form architecture (3 fields on `/`, full set on `/request-assessment/`) | `19` Part 4 |
| §11 launch-blocking QA | `04-RELEASE-CHECKLIST.md` — this is the reconciliation `07` §11 ordered and nobody performed |

§5 (the price floor) and §8 (freeze at Astro 5) are both **closed**: pricing was decided
2026-08-11, and `package.json` is on Astro `^7.1.6` so the migration already happened.

### `14-RESEARCH-FINDINGS.md` + `15-UX-DESIGN-RESEARCH-FINDINGS.md` — 184 lines

Every statistic in both sits behind an opaque `<cite index="NN-1">` marker with no URL,
publication, date, or sample size — **unverifiable as published.** Both cite files that do not
exist (`01-STRATEGY.md`, `02-BUILD-SPEC.md`). `15`'s contrast table is measured against dead
token names from the retired mockup.

Four findings still impose real build requirements. Move them into a new short
`docs/23-BUILD-REQUIREMENTS-FROM-RESEARCH.md`, marked as directional rather than measured:

1. Copy directly above the phone field must state why the number is needed — "so we can call
   you back today." A one-line copy fix, not a field-count fix.
2. Forms stay single-column at every breakpoint, desktop included.
3. Three-field inline on `/`, multi-step on `/request-assessment/`. The split is correct;
   do not second-guess it.
4. Sticky call bar stays bottom-fixed and mobile-only. No desktop equivalent.

Then delete both. Keep their honest self-limiting caveats in the new file — "treat as
directional, not as a controlled experiment run on your exact page."

**Subtotal after extraction: 2,405 more lines deleted.**

---

## 3. Keep — and exactly what to fix in each

| File | Lines | Action |
| --- | --- | --- |
| `01-QUALITY-GUARDRAILS.md` | 1,215 | Retitle from `# 10 — $20K Website Quality…` to `# 01 — Execution Quality and Anti-Generic Guardrails`. Replace its internal precedence block — it ranks itself 7th below four nonexistent files. Fix line 1174's self-reference to a former filename. Add: "Claims are governed by `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`." |
| `02-OWNER-INPUTS.md` | 75 | Three stale values: primary CTA is `Request an assessment`; the service area is the 10-city list; region is `South Bay & Peninsula`, not `Santa Clara County`. Add: where `02` and the decisions log disagree, the log wins — revoking `07` §10. |
| `04-RELEASE-CHECKLIST.md` | 79 | Rewrite the final section from doc 20 Rev. 2 §E. Label every item LAUNCH-BLOCKING or DEFERRED — the reconciliation `07` §11 ordered and nobody ran. |
| `05-DECISIONS-LOG.md` | 2,028 | **Never delete.** It is the only historical record and it outranks `02`. Append every change from this cleanup. |
| `06-APPROVED-HOMEPAGE-COPY.md` | 357 | Banner: superseded for `/` by `aseptaclean-FINAL-v2.html`; authoritative for every other route. Do not rewrite the body. |
| `06-ASSET-MANIFEST.md` | 39 | Regenerate. Lists Instrument Sans (retired), omits Inter Variable and IBM Plex Mono (both live). The entire shipped image inventory is three brand PNGs. |
| `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | 236 | Keep — the route is live. Fix its line-3 reference to `07-PRIVATE-RESIDENCE-RESET-STRATEGY.md`, which has never existed. Remove the `$2,000` anchor per the pricing decision. |
| `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | 253 | Amend item 3 (fonts are Newsreader + Inter + IBM Plex Mono) and item 7 (fourteen sections, not eight). |
| `11-COMPOSITION-AND-TYPE.md` | 339 | Amend §5 to the fourteen-section reality. Keep §1's ratio law — it is the one thing currently failing in code. |
| `18-VISUAL-DIRECTION.md` | 293 | Keep as-is. |
| `19-SYSTEM-AND-SITEMAP.md` | 505 | The sitemap authority — see §4. Add `/services/` and `/who-we-help/`. Delete the Phase 3b single-gate biohazard line. Absorb `00` §9/§13 and `07` §4/§6/§7. |
| `90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` | 530 | Keep, gated. Fix its §9 CTA claim — "Request a Property Assessment" was not adopted. |
| `TOKEN-MAP.md` | 129 | Regenerate from current `tokens.css`. Every hex in it is stale post-v2. |
| `aseptaclean-FINAL-v2.html` | — | Keep. Binding implementation target for `/`. |

Plus the three new files: root `AGENTS.md`, `20-ALIGNMENT-AUDIT`, `21-CLAIMS-AND-COMPLIANCE-LAW`.

---

## 4. The sitemap — yes, and it exists in three places that disagree

You asked whether we are building the site map in the files. **Two different things are called
that, and both need attention.**

### 4a. `sitemap.xml` — real and working

`src/pages/sitemap.xml.ts` holds a **9-route allowlist**: `/`, `/about/`, `/contact/`,
`/handoff-standard/`, `/privacy/`, `/terms/`, `/services/`, `/who-we-help/`, and
`/cookie-policy/` conditionally. Eighteen of the twenty-seven built routes are deliberately
excluded. That mechanism is correct and does not need changing.

### 4b. The information architecture — three incompatible versions

| Source | Says | Status |
| --- | --- | --- |
| `19-SYSTEM-AND-SITEMAP.md` | 5 phases, flat `/{service}-san-jose/` slugs, cities nested under `/service-areas/{city}/` | **Authority — but out of date** |
| the `site map` project doc | `/services/{service}/` + `/locations/{city}-ca/` + `/projects/` case studies + biohazard and rodent routes | **Superseded, partly unlawful** |
| the actual repo | 27 routes including `/services/` and `/who-we-help/` hubs | **Ahead of both docs** |

The code has drifted past both documents. Doc 19 does not know `/services/` or `/who-we-help/`
exist, even though they are in the nav, the footer, and the sitemap. Doc 19's Phase 1 still
lists `/about/`, `/contact/`, and `/handoff-standard/` as "live this week" — all three are built.

**Reconcile to this, in `19` Part 2:**

```text
LIVE AND INDEXED (9 in sitemap)
  /                          homepage
  /about/                    E-E-A-T, brand-search catcher
  /contact/                  NAP anchor, GBP landing
  /handoff-standard/         method + Property Handoff Record
  /services/                 hub          ← NEW, undocumented until now
  /who-we-help/              hub          ← NEW, undocumented until now
  /privacy/  /terms/  /cookie-policy/     Termly-controlled

LIVE, NOT INDEXED
  /request-assessment/       canonical route — never redirect it
  /private-residence-reset/  campaign, out of nav, one crawlable link
  /thank-you/                conversion destination
  /data-request/             compliance surface, must resolve before cutover
  /sms-notification-consent/ byte-preserved, 10DLC review — DO NOT EDIT
  /404/                      branded
  /api/lead                  Pages Function

BUILT, noindex, EXCLUDED FROM SITEMAP — each behind its own gate
  /estate-cleanout-san-jose/         ⚠ also a _redirects source — see doc 20 P0-2
  /hoarding-cleanup-san-jose/        ⚠ also a _redirects source — see doc 20 P0-2
  /animal-waste-cleanup-san-jose/    gate: doc 21 §3 rewrite + SPCB confirmation
  /senior-downsizing-san-jose/
  /deep-cleaning-san-jose/           gate: B10 checklist finalized
  /property-cleanouts-for-managers/  gate: crew capacity confirmed
  /estate-cleanout-checklist/
  /service-areas/                    orphan — 7 redirects point in, 0 links out to it

DEV — pruned by scripts/prune-dev-routes.mjs, which never runs locally
  /dev/type-specimen/  /dev/type-compare/

NEVER BUILD
  /biohazard-cleanup*/ · /blood-cleanup/ · /unattended-death-cleanup/
  /crime-scene-cleanup/ · /human-waste-cleanup/ · /sharps-cleanup/
  /encampment-cleanup/ · /vehicle-biohazard-cleanup/
  any /locations/* or /projects/* route (superseded `site map` architecture)
  garage-cleanout · basement-cleanout · furniture-removal · mattress-disposal
  any reviews page until reviews exist
```

Three things this reconciliation surfaces that no document currently records: `/services/` and
`/who-we-help/` are undocumented, `/service-areas/` is an orphan with seven redirects pointing
into it, and two noindex drafts are simultaneously listed as retired redirect sources.

---

## 5. Skills — make the checks automatic instead of remembered

Four skills ship in `.claude/skills/`. They exist because the same three checks keep having to
be re-run by hand, and one of them — claims — is the thing that must never regress. A prompt
you have to remember to paste is a control that fails silently.

| Skill | Triggers on | Replaces |
| --- | --- | --- |
| `claims-check` | any edit to public-facing copy, before commit or launch | manually re-running doc 21 §8 |
| `type-law` | any change to headings, tokens, or type | the ratio-floor and heading-`font-size` audits |
| `route-audit` | any change to routes, `_redirects`, sitemap, or nav | the redirect-collision and orphan checks |
| `doc-precedence` | any time two documents disagree | guessing, or silently merging |

Install by copying `.claude/skills/` into the repository root. They are repo-specific by
design — the file paths and the banned-word list are this project's, not generic.

---

## 6. Order of execution

1. **Commit the working tree** (doc 20 P0-1) — nothing else until this is done.
2. Delete §1's list. Start with `AGENTS-PRECEDENCE-BLOCK.md`.
3. Extract §2's sections, verify each landed, then delete the source files.
4. Apply §3's per-file fixes.
5. Reconcile `19` Part 2 to §4b.
6. Install `.claude/skills/`, then run `claims-check` and `route-audit` against the whole repo
   as a baseline.
7. Repair the nine dangling references. Re-run a link check across `docs/`.
8. Append everything to `05-DECISIONS-LOG.md`. Delete this file.
