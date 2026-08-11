# DELETE MANIFEST — read this before removing anything

**Paste this whole file into Claude Code before any cleanup session.**

The dangerous half of this document is §2, not §1. An agent told to "clean up the docs" will
reach for the biggest files, and the two biggest are the decisions log and the quality
guardrails — both of which must survive. Read §2 first.

---

## 0. Rules

1. **Nothing is deleted until the tree is committed.** `git status` currently shows two
   untracked live pages and four modified tracked files. Commit first, on a branch.
2. **Extract before delete.** Three files in §3 contain the only copy of live content. Move it,
   verify it landed, then delete. Never the other order.
3. **One file per commit for anything in §3.** If an extraction was wrong, that has to be
   revertible in isolation.
4. **If a file is not named in this manifest, do not delete it.** Report it and ask. This
   manifest is exhaustive as of 2026-08-11.

---

## 1. DELETE — safe, nothing live inside

Delete in this order. The first one is urgent.

```
docs/AGENTS-PRECEDENCE-BLOCK.md                     78 lines
docs/17-REFERENCE-TRANSLATION-MARTEL.md            368
docs/03-BUILD-PLAN.md                              119
docs/12-SESSION-PROMPTS.md                         366
docs/13-REMEDIATION-PASS.md                        188
docs/PHASE-4-AUDIT.md                              224
docs/archive/                                    1,320   (all 6 files, whole directory)
docs/aseptaclean-homepage-mockup.html
docs/aseptaclean-clinical-direction.html
```

**Why each:**

- **`AGENTS-PRECEDENCE-BLOCK.md`** — its standing rule is *"One endpoint. `src/pages/api/lead.ts`.
  Do not maintain a competing implementation in `functions/`."* That file has never existed and
  `functions/api/lead.ts` is the only working lead endpoint. An agent obeying this file breaks
  lead delivery. **Delete this one first, before reading anything else.**
- **`17-REFERENCE-TRANSLATION-MARTEL.md`** — orphaned and hazardous. Depends on four files that
  do not exist, names eight tokens and five components that do not exist, and specifies a
  TrustBar reading `licensed · insured · owner-led · unmarked`. The word `licensed` is
  prohibited in every credential surface by doc 21 §2.2 and `18` §7.
- **`03-BUILD-PLAN.md`** — superseded for routes and scope. Its one surviving rule (build fails
  on missing env vars) is already implemented in `scripts/validate-env.mjs`.
- **`12-SESSION-PROMPTS.md`** — all nine sessions have run. Predates `18-VISUAL-DIRECTION.md`
  and still instructs "The Mark at three appearances maximum" (cap superseded) and to apply
  `11` §5 "exactly" (contradicted by `18` §6). Replaced by `CLAUDE-CODE-PROMPTS.md`.
- **`13-REMEDIATION-PASS.md`** — §1 describes an approximation at commit `88ab2a6` that never
  built the `--ac-` token architecture. Using it as a regression guard guards the wrong artifact.
- **`PHASE-4-AUDIT.md`** — every finding remediated and independently re-verified. The decisions
  log preserves the outcomes.
- **`docs/archive/`** — six files, all superseded by numbered successors. Four of the nine
  dangling doc references point into this directory; deleting it closes them.
- **The two HTML mockups** — superseded by `aseptaclean-FINAL-v2.html`. `15`'s contrast findings
  reference dead token names from the homepage mockup, which is part of why they are unusable.

---

## 2. DO NOT DELETE — protected

### Documents

| File | Lines | Why it survives |
| --- | --- | --- |
| `docs/05-DECISIONS-LOG.md` | 2,028 | **Rank 1 authority.** The only historical record of what was decided and why. It outranks `02-OWNER-INPUTS.md`. It is the second-largest file in `docs/` and will look like an obvious cleanup target. It is not. |
| `docs/01-QUALITY-GUARDRAILS.md` | 1,215 | Largest file. Amend it — retitle, replace its broken internal precedence block — but the body is live. |
| `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` | new | Rank 2. Every other doc's claims pointer resolves here. Deleting it re-opens the dangling `04-CLAIMS-GUARDRAILS.md` reference that has been broken since inception. |
| `docs/aseptaclean-FINAL-v2.html` | — | Binding implementation target for `/`. Two other HTML files in the same directory get deleted — **do not delete this one by association.** |
| `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | 253 | Rank 4 canonical spec. Amend items 3 and 7; keep the file. |
| `docs/18-VISUAL-DIRECTION.md` | 293 | Rank 5. Current and correct. |
| `docs/19-SYSTEM-AND-SITEMAP.md` | 505 | Rank 6, the architecture authority. Needs additions, not deletion. |
| `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` | 530 | Non-governing but it is the instrument that *enforces* the biohazard exclusion. Its four gates are cited by `19` Phase 5. Deleting it removes the gate definition. |
| `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | 236 | `/private-residence-reset/` is a live route. |
| `docs/06-APPROVED-HOMEPAGE-COPY.md` | 357 | Superseded for `/` only. Still authoritative for every other route. |
| `docs/11-COMPOSITION-AND-TYPE.md` | 339 | §1's ratio law is the one rule currently failing in code. |
| `docs/02` · `04` · `06-ASSET-MANIFEST` · `TOKEN-MAP` | small | All four are being **rewritten**, not deleted. Replace contents; keep paths. |

### Code and config — do not touch during any doc cleanup

```
functions/api/lead.ts          the only lead endpoint. 279 lines. Correct.
functions/_lib/lead.ts         433 lines
functions/_lib/providers.ts    310 lines
wrangler.toml                  real KV namespace ID, live R2 binding
src/pages/sms-notification-consent.astro    byte-preserved, Twilio 10DLC carrier review
public/sms-notification-consent/            same
public/_redirects              32 rules — audit it, do not prune it
.env.production                tracked in git; a separate decision, not a cleanup
```

**Never install `@astrojs/cloudflare`.** It emits `_worker.js`, which makes Pages ignore
`functions/` entirely and silently kills lead delivery. It was installed, tested, and
deliberately removed once already.

**Never edit `/sms-notification-consent/`.** A carrier reviewer hitting altered wording blocks
the 10DLC campaign, not just the site. It intentionally loads Montserrat/Open Sans from Google
Fonts and hardcodes `index,follow` outside the deployment gate. Both look like bugs. Leave them.

### Delete only after their extraction is verified

`CategoryContrast.astro` (115), `OutcomeComparison.astro` (44), `Qualification.astro` (84) —
unimported, and doc 20 Rev. 2 confirms every content obligation they held is met elsewhere.
The one exception is the hoarding FAQ question, which must land in `FAQ.astro` first. **Confirm
that before deleting these three.**

---

## 3. EXTRACT, THEN DELETE — live content inside

Do not delete these until every listed section has been moved and verified.

### `docs/00-MASTER-BRIEF.md` — 1,923 lines

| Section | Destination |
| --- | --- |
| §9 Assessment Form Specification — 3-step field list, microcopy, completion message, form behavior, lead-response standard | `19` Part 4 |
| §13 Analytics event names — `handoff_plan_click`, `phone_click`, `assessment_start`, `assessment_step_1_complete`, `assessment_step_2_complete`, `assessment_submit`, `photo_upload`, `qualified_lead`, `quote_issued`, `deposit_collected` | `19` Part 4 — **doc 10 has no analytics list at all; this is the only copy** |
| §11 structured-data types + §11.1 the three required disclaimers | `21` §6 |

### `docs/07-ONE-PAGE-DIRECTIVE.md` — 298 lines

| Section | Destination |
| --- | --- |
| §3 fourteen pre-resolved conflict rows | `05-DECISIONS-LOG.md` — they are decisions, not directives |
| §4 SEO correction — situational hoarding/estate language, the required FAQ question, `hoarder` never a noun | `19` §2.2 and `21` §2.2 |
| §6 guarantee reconciliation — the sixth discretion item | `19` §3 |
| §7 form architecture — 3 fields on `/`, full set on `/request-assessment/` | `19` Part 4 |
| §11 launch-blocking QA | `04-RELEASE-CHECKLIST.md` |

§5 (price floor) and §8 (freeze at Astro 5) are **closed** — pricing decided 2026-08-11,
`package.json` is on Astro `^7.1.6`. Do not carry them forward.

### `docs/14-RESEARCH-FINDINGS.md` + `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` — 184 lines

Replaced by `docs/23-BUILD-REQUIREMENTS-FROM-RESEARCH.md`, already written.
**Do not carry over any statistic from either file.** Every one sits behind an opaque
`<cite index="NN-1">` marker with no URL, publication, date, or sample size, and both docs cite
source files that have never existed.

---

## 4. Files being replaced wholesale — overwrite, do not delete

New contents supplied. Replace in place so git history stays continuous:

```
docs/TOKEN-MAP.md                            regenerated from current tokens.css, with measured contrast
docs/06-ASSET-MANIFEST.md                    regenerated from the real asset inventory
docs/02-OWNER-INPUTS.md                      three stale values corrected
docs/04-RELEASE-CHECKLIST.md                 reconciled, every item labeled
docs/23-BUILD-REQUIREMENTS-FROM-RESEARCH.md  new
```

---

## 5. Result

| | Before | After |
| --- | --- | --- |
| Markdown files in `docs/` | 30 | 17 |
| Lines in `docs/` | 11,146 | ~6,100 |
| Dangling doc references | 9 | 0 |
| Documents claiming to be canonical | 4 | 1 |
| Precedence chains | 5 | 1 |

Nothing live is lost. Every deletion above is either superseded, remediated, or extracted first.
