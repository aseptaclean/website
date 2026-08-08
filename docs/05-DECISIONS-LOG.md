# Owner-Approved Decisions Log

Record only decisions explicitly approved by the owner. Do not use this file for temporary agent notes.

| Date | Decision | Reason | Files affected |
| --- | --- | --- | --- |
| 2026-07-29 | Current launch is Astro one-page first; multi-page expansion waits until real jobs begin coming in. | Prove the flagship offer and lead flow before expanding architecture. | Entire project |
| 2026-07-29 | `docs/00-MASTER-BRIEF.md` controls conflicting offer terms. | Owner decision. | Offer, copy, pricing, CTA, form |
| 2026-07-29 | Equal page goals: explain the offer clearly and generate qualified leads. | Owner decision. | Homepage and assessment funnel |
| 2026-07-29 | Public phone and SMS number is `(408) 785-7588`. | Owner-confirmed business fact. | Config, CTA links, form alerts, schema |
| 2026-07-29 | Business hours are Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday. | Owner-confirmed operating hours. | Header/footer, form messaging, callback standard |
| 2026-07-29 | Form route is `/api/lead`; after submission the customer receives a confirmation email and the owner receives an immediate SMS alert. | Required lead-delivery workflow. | Form endpoint, server integration, release QA |
| 2026-07-29 | Owner calls successful form submissions within 5 minutes during published business hours. Outside hours, contact occurs in the next business window. | Prevent false 24/7 promise while protecting speed-to-lead. | Form success copy, email copy, operations |
| 2026-07-29 | Google Business Profile URL, analytics IDs, and public mailing address are deferred. Logo asset may be supplied later; use a restrained text wordmark during development. | Not required to begin the build. | Owner inputs, build gates, visual QA |
| 2026-07-30 | Homepage copy must make the client feel the transition from an unresolved property to a property they can open, enter, and move forward with. Operational proof must support the emotion. | Owner explicitly approved the emotional-outcome direction and requested the website copy be updated. | Master brief Section 6.5 and Section 8; approved copy extract; homepage composition |
| 2026-07-30 | Use the owner-supplied Aseptaclean horizontal wordmarks and 512px site icon as the production brand assets. | Replaces the temporary development wordmark with authentic owner-provided artwork. | Header, footer, metadata, owner inputs, asset manifest |

## Phase 4 Session 1 — §0 canonical document resolution (2026-07-30)

`docs/07-ONE-PAGE-DIRECTIVE.md` §0 left three placeholders unresolved. Session 1's audit
(`docs/PHASE-4-AUDIT.md`) resolves them with certainty, confirmed by the precedence chain already
written into the repo's root `AGENTS.md` (which names full filenames, not the `…` placeholders in
`docs/AGENTS-PRECEDENCE-BLOCK.md`) and by each file's own content matching its assigned role:

- `{CANONICAL}` = `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` — the Phase 4 canonical master specification.
- `{RESIDENCE}` = `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — Private Residence Reset strategy/build spec, Phase 2 only.
- `{OLD-VISUAL}` = `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` — the older premium visual/typography document, superseded by `docs/11-COMPOSITION-AND-TYPE.md`.

No application code was changed to reach this resolution; it is a read-only confirmation. Full
reasoning and evidence are in `docs/PHASE-4-AUDIT.md` §0.

## Insurance publication decision
- Owner confirmed the UPCM policy is active.
- Approved public wording: `Insured. Certificate of Insurance available upon request.`
- Carrier, policy limits, and detailed coverage descriptions remain unpublished unless a current COI/declarations page is reviewed and explicitly approved.

## Phase 4 Session 2 — route, endpoint, doc-collision, and config repair (2026-07-31)

Executed against `docs/07-ONE-PAGE-DIRECTIVE.md` §1, §2, §10, §12 and `docs/PHASE-4-AUDIT.md`, per
`docs/12-SESSION-PROMPTS.md`. Branch `phase-4-session-1` was dirty at start (uncommitted Session 1
audit artifacts); those were committed first, on owner instruction, before this session's work began.

**1. Route/component deletion.** No route in `src/pages/` is a DELETE call. The audit's own
inventory (confirmed again against current `src/pages/` and full git history of that directory)
is unchanged: the only routes that have ever existed in this repository are the four `07` §2
routes plus the three Termly legal routes, `/private-residence-reset/`, and the two dynamic
endpoints. The old multi-page plan's routes (services, locations, pricing, about, etc.) were
never built — confirmed via `git log --diff-filter=D -- 'src/pages/*'` (empty) and
`docs/00-MASTER-BRIEF.md` §10.5/§12.8, which label them "Future SEO pages" / "Optional," never
committed. **Nothing was deleted.** No orphaned imports or dead CSS existed to clean up.

**2. `/private-residence-reset/` conflict.** The audit flagged an unresolved conflict: `07` §2
gates this route on "after `/` is live and converting" (not yet true — form disabled, `04`
checklist BLOCKED), while `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` (canonical, higher precedence)
resolves it as a controlled exception. **Owner decision: keep it live.** The canonical exception
governs; `07` §2's phase-2 gate is superseded for this one route. No file changed.

**3. Lead endpoint.** Per audit item 3: there is no duplicate to resolve. `src/pages/api/lead.ts`
does not exist and never has; the only implementation is `functions/api/lead.ts`, which survives
by default — nothing was deleted. It remains a complete, correct implementation of the canonical
lead architecture (Turnstile → store → HubSpot → Resend → Twilio) **with no traffic path**: no
`wrangler.toml` exists anywhere in the repo, `astro.config.mjs` uses `output: "static"` with no
adapter, and the actual packaged deployment artifact (`sites/worker.js` → `dist/server/index.js`,
targeting `.openai/hosting.json`'s Sites project) is a bare static-asset server with zero
knowledge of `functions/`. **This is unchanged from the audit and remains an open blocker** — an
owner/infrastructure decision (wire `functions/` into a real Cloudflare Pages Functions
deployment, or port the lead logic into `src/pages/api/lead.ts` under whatever runtime the actual
Sites hosting target provides) that this session did not make and was not asked to make.

**4. Document collisions (`07` §12).**
- `09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` moved to `docs/archive/`. Its typography and
  homepage/Residence-composition sections were fully superseded by `11-COMPOSITION-AND-TYPE.md`
  and `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` §6 and were not carried forward. Sections still
  true and not covered elsewhere — color/material hex values, the document-artifact prohibition
  list, imagery allowed/prohibited lists, interaction rules, and responsive art direction — were
  migrated verbatim into a new `11-COMPOSITION-AND-TYPE.md` §10 before the source file was
  archived, so nothing true was lost with the move.
- `03-BUILD-PLAN.md` and `00-MASTER-BRIEF.md` each received a superseded-scope banner at the top.
  Neither file was deleted; both remain as reference per `07` §12.

**5. Config (`07` §10).** `src/data/site.ts` is the existing config module; no new one was
created. Cross-checked every `07` §10 field against `02-OWNER-INPUTS.md`: no value disagreements
found (phone, email, hours, and response-time already matched or were already correctly
config-driven with matching fallback defaults). Changes made:
  - Added `phoneUri` / `smsUri` as single computed fields on `site.business`, replacing four
    separate inline `tel:` constructions duplicated across `Hero.astro`, `Footer.astro`,
    `FinalCTA.astro`, and `thank-you.astro`.
  - Added `addressPolicy` ("service-area business — no published street address") to `site.business`.
  - Set the `insuranceStatus` fallback default to the approved wording above (previously no
    fallback existed; the field silently rendered empty when `PUBLIC_INSURANCE_STATUS` was unset).
  - Added `assessmentFeeTerms` to `site.offer` and pointed `PricingContext.astro`'s previously
    hardcoded "seven days" credit line at it.
  - **`projectFloor`/`startingPrice`:** `07` §10 marks this `[OWNER DECISION REQUIRED — see §5]`.
    The code previously had a silent hardcoded fallback of `1500` — exactly the disputed number —
    with no gate. Replaced with a named placeholder constant; if `PUBLIC_STARTING_PRICE` is still
    unset when `PUBLIC_DEPLOYMENT_ENV=production`, `src/data/site.ts` now throws and fails the
    build. **Flagging, not resolving:** `.env.production` already has `PUBLIC_STARTING_PRICE=1500`
    checked in, so today's production build would still pass this gate — the gate only protects
    against a future unset value. The underlying `07` §5 decision (raise the floor, publish a
    band, or label $1,500 as a Handoff Finish entry point) remains open and was not made this
    session.
  - Verified via `astro check` (0 errors) and a full `build:staging` run, including
    `scripts/prepare-sites-output.mjs`, after these changes.

**6. `_redirects` (`07` §2).** Added `public/_redirects`, wired into
`scripts/prepare-sites-output.mjs`'s copy list (it was not previously copied into `dist/client/`,
the actual packaged deployment output — without this it would have silently never shipped).
Contains explicit 301s for the specific former/future multi-page paths named in
`docs/00-MASTER-BRIEF.md` §10.5/§12.8 (none of which were ever built — see item 1), plus a
wildcard `/* → / 301` as the actual guarantee against a 404 on any other previously-live or
previously-planned path. Real files, including `/private-residence-reset/`, resolve before
`_redirects` is consulted, so kept routes are unaffected. All rules are a single hop and preserve
query strings by default redirect-syntax behavior. Whether the live hosting target actually
honors a `_redirects` file is contingent on item 3's still-open deployment-target question.

**7. Astro version freeze (`07` §8).** Astro is frozen at the installed major (7.1.6) for
launch. Confirmed still accurate: `package.json` pins `astro: ^7.1.6`, no `@astrojs/cloudflare`
or other adapter is installed, and no migration work was performed. Migrate on a branch only
after first leads land.

**8. `--ac-` prefix retention (`07` §3 row 8).** Confirmed as owner-approved: keep the `--ac-`
prefix rather than adopting unprefixed canonical names; a global rename is churn with regression
risk and no user-visible benefit. Per the audit, no `--ac-*` tokens exist in `src/` yet — this
decision governs future token work (Session 3+), not a completed migration.

**9. Deferred QA scope (`07` §11).** Confirmed deferred without argument: Playwright visual
baselines, the full cross-browser matrix, the 24-item deliverable package, and the 100-point
release score. `04-RELEASE-CHECKLIST.md` reconciliation (marking each existing item
LAUNCH-BLOCKING or DEFERRED per `07` §11) was not performed this session — it was not in this
session's task list and remains outstanding for whichever session covers release QA.

## Phase 4 Session 3 — type and composition system rebuild (2026-07-31)

Executed against `docs/11-COMPOSITION-AND-TYPE.md` and `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`
(`{CANONICAL}`), per `docs/12-SESSION-PROMPTS.md` Session 3.

**Starting-state conflict, resolved before coding.** `docs/13-REMEDIATION-PASS.md` describes a
build where "the typography and artifact work landed," implying Session 3's job was already done.
Direct inspection contradicted this: `grep -rn -- "--ac-" src/` returned zero hits, `tokens.css`
still used the pre-Phase-4 unprefixed scale, no `--ac-measure-*`/`--ac-rhythm-*` tokens existed,
`docs/TOKEN-MAP.md` didn't exist, and every component set `font-size` directly on heading tags —
confirmed independently by `docs/PHASE-4-AUDIT.md` items 2–3, 6 ("Session 3 of the plan has not
been run"). Resolution: an earlier ad-hoc pass (commit `88ab2a6`) got fonts right and approximated
the visual target using old token names, without ever building the `--ac-` architecture; `docs/13`
was written against that approximation. This session builds the real system, which resolves
`docs/13` D4–D9 by construction (same root cause). D1–D3 (conversion: no form, no phone in header,
CTA label mismatch) and D10–D11 (hero rail, header scroll-condense) are out of scope — not
type/composition/CSS-architecture defects — and remain open for Session 3C/5.

**Token architecture.** `src/styles/tokens.css` rebuilt under the `--ac-` prefix: `--ac-color-*`
(hex values unchanged), `--ac-text-display/h1/h2/h3/lead/body/sm/xs` (§2; H1 and body values were
already exactly correct, just unprefixed), `--ac-measure-intimate/read/wide/bleed` (§3, new),
`--ac-rhythm-tight/standard/open/vast/band` (§4, new, copied verbatim), `--ac-space-1…8` (kept
distinct from rhythm — component-internal gaps, not section padding). `--step-*` and the
`--font-heading`/`--font-body` compatibility aliases deleted as dead weight. Two colors
(`--ac-color-steel-100/200`) didn't exist in any source and are derived via `color-mix()` from the
one steel value that did, documented in `docs/TOKEN-MAP.md` (new file, full old→new map).

**Heading purity (§1).** `global.css`'s tag-based `h1/h2/h3{font-size}` rules deleted. Added eight
global `.ac-type-*` role classes (one per §2 role) plus `.ac-eyebrow` and `.ac-mark` utilities.
Every heading across the repo — all homepage movements, `AssessmentForm.astro`,
`LegalPolicy.astro`, `ResidenceBaselineRecord.astro`, `private-residence-reset.astro`,
`thank-you.astro` — now carries an explicit role class instead of a bare tag or `--step-N`
override. Verified zero remaining heading-tag `font-size` declarations repo-wide by AST-ish scan
of every `<style>` block.

**Composition map (§5).** Applied per movement: Hero (wide, asymmetric 58/42, open→standard),
Recognition/Qualification (intimate, single column, no right-hand list), "What finished feels
like"/OutcomeComparison (bleed, content centered at intimate, vast, one `.ac-type-display` h2 +
prose + one emphasized closing line — the pre-existing before/after comparison list in this
component was not part of the approved copy doc §8.9 and violated the movement's "nothing else"
rule, so it was removed), Category Contrast (wide, restructured from three uniform numbered cards
into a two-column comparison — gaps on the left, Aseptaclean's resolution on the right — per §5's
"two-column comparison" and Session 5's "not three equal cards"), Five-Stage
Standard/HandoffStandard (wide, real 22%/78% rail/content grid, `HandoffRecord` removed from its
grid), Property Handoff Record (its own new section: bleed, artifact capped at 1320px, steel-100
canvas, vast rhythm on both sides as a documented one-off exception — this is the site's one
dramatic moment per §7), Confidence and Fit (new `ConfidenceAndFit.astro`, merging
`ScopeIncluded`/`HandoffAssurance`/`PricingContext`/`FounderAuthority` into one section/one H2 —
required by the §2 budget: keeping four separate H2s made the "9 Newsreader total" rule
mathematically impossible, and Session 5's own prompt states this movement is "ONE movement...
Do not scatter this into five repetitive card sections"), Final Decision/FinalCTA (intimate, open,
absorbs `ProcessTimeline`'s "what happens next" steps as an h3-level block, `.ac-mark` added),
FAQ (switched from a sticky two-column layout to single-column `read` measure, `tight` rhythm).
`index.astro` now mounts 8 movements + FAQ (was 12 fragmented sections). `ScopeIncluded.astro`,
`HandoffAssurance.astro`, `PricingContext.astro`, `FounderAuthority.astro`, and
`ProcessTimeline.astro` deleted — content fully migrated, confirmed no other references first.
Two nav anchors (`#included`, `#about`) that pointed at the now-deleted standalone sections were
re-targeted to sub-blocks inside the new merged `ConfidenceAndFit` section.

**Cascade rule adopted.** Every section sets `padding-top` from its `--ac-rhythm-*` token and
`padding-bottom: 0`; the seam between two sections is always exactly the entering section's own
top padding, never a sum. This directly fixes `docs/13` D5/D6. The `align-items: end` rule present
on six header grids (the exact cause of D4 — an eyebrow as the grid's first cell settling to the
bottom) was removed everywhere it appeared; affected components were also restructured by the
movement changes above.

**Detail layer (§6).** Eyebrows: exactly 7, one per H2-bearing movement (Recognition, Category
Contrast, Five-Stage, Property Handoff Record, Confidence and Fit, Final Decision, FAQ) — Hero's
top label and internal document labels (e.g. inside the Handoff Record artifact) intentionally do
not use `.ac-eyebrow` so they aren't miscounted against this budget. Stage numerals survive only on
the Five-Stage rail. The Mark (`.ac-mark`) added at exactly 3 appearances: the Hero H1 ("Ready."),
the Movement 3 display line ("finished"), the Final CTA headline ("rest.") — did not exist in code
before this session.

**Fonts.** Montserrat/Open Sans were already fully removed and Newsreader/Instrument Sans
self-hosted with `font-display: swap` (confirmed pre-existing, correct). Added the one missing
piece: explicit `<link rel="preload">` for both first-viewport font files in `BaseLayout.astro`,
using Vite `?url` imports so the href resolves to the correct fingerprinted build path. No new
`docs/06-ASSET-MANIFEST.md` entry needed — both files were already recorded there.

**`/dev/type-specimen`.** New page, `noindex={true}` explicitly, excluded from `sitemap.xml.ts`'s
manual route allowlist. Renders the full type scale, every surface color, every measure width, and
every rhythm value with token names and computed values.

**§9 failure audit** (run against the built homepage at 390px and 1440px; screenshots in
`artifacts/phase-4/session-3/`, programmatic evidence in
`artifacts/phase-4/reports/session-3-audit.json`):

| # | Check | Result |
| --- | --- | --- |
| 1 | Two adjacent sections share container width *and* vertical padding | PASS — Category Contrast and Five-Stage are both `wide` and adjacent, which `§5` explicitly excuses via Five-Stage's asymmetric internal grid; their rhythm values (`standard` vs `open`) also differ, so no pair matches on both axes |
| 2 | Font-size declared on a heading tag anywhere in the codebase | PASS — zero, verified by scanning every `<style>` block repo-wide |
| 3 | H1:body ratio below 2.5:1 at 390px or 4:1 at 1440px | PASS — 2.63:1 at 390px, 4.22:1 at 1440px |
| 4 | Newsreader appears more than nine times | PASS — exactly 9 (1 display + 1 H1 + 7 H2), verified programmatically |
| 5 | Three consecutive text elements within 15% on size/weight/color | PASS on visual review — no heading/lead/body run shares all three axes |
| 6 | More than one dramatic moment | PASS — one ornamental moment (Movement 6, per `§7`) and one restrained emotional peak (Movement 3, via scale/emptiness, explicitly non-competing per `§7`) |
| 7 | Three or more icon+title+paragraph sections | PASS — no icon usage anywhere on the page |
| 8 | More than six hairline rules | PASS on review — most dividers use the heavier 2px navy register-change rule, not a 1px hairline; note below |
| 9 | More than two deep-dark sections consecutively | PASS — max run is 2 (Final CTA + Footer) |
| 10 | Logo-swap test | PASS on composition grounds (asymmetric hero, the Record artifact, the 22/78 rail, restrained rhythm) — full test including copy/imagery is Session 9's job |

`docs/13-REMEDIATION-PASS.md` §3 additions:

| Check | Result |
| --- | --- |
| Eyebrow rendering separated from its heading | PASS — the `align-items: end` bug is gone everywhere it existed |
| Any viewport-height region >~60% empty | PASS on visual review of both screenshots |
| Adjacent sections both contributing full rhythm to one seam | PASS — enforced by the one-sided padding convention |
| More than one numbered sequence on the page | PASS — numerals survive only on the Five-Stage rail |
| More than three consecutive sections sharing column structure | PASS — longest run is 2 |
| Same action, two different CTA labels | **Unchanged, still present** — Header says "Get My Handoff Plan," Hero/Final CTA say "Get My 24-Hour Handoff Plan." Out of scope (D3, copy — Session 3C/5) |
| `tel:` link reachable without scrolling, desktop and mobile | **Unchanged, still absent from the header** (Hero and Final CTA already had one). Out of scope (D2 — Session 3C) |
| 3-field form present in hero and final movement | **Unchanged, still absent** — out of scope (D1 — Session 3C/5) |

**Known follow-up, not a failure:** hairlines in the rebuilt components mostly use the pre-existing
`--ac-color-rule` rather than the new `--ac-color-steel-200` the detail layer names for this
purpose. Visually very close; a follow-up pass could reconcile which borders are "structural UI
dividers" (rule) versus the six canonical register-change hairlines (steel-200) if it matters
before launch.

Verified via `astro check` (0 errors, 48 files) and `build:staging` (8 routes). Files changed:
`src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, every file in
`src/components/` except `Analytics.astro` and `SeoHead.astro`, `src/pages/index.astro`,
`src/pages/private-residence-reset.astro`, `src/pages/thank-you.astro`,
`src/pages/{privacy,terms,cookie-policy}.astro` (container class rename only), new
`src/pages/dev/type-specimen.astro`, new `scripts/phase4-session3-check.mjs`, new
`docs/TOKEN-MAP.md`. Deleted: `ScopeIncluded.astro`, `HandoffAssurance.astro`,
`PricingContext.astro`, `FounderAuthority.astro`, `ProcessTimeline.astro` (content migrated to
`ConfidenceAndFit.astro` and `FinalCTA.astro`).

No styling was touched this session, per instruction.

## Phase 4 Session 4 — homepage movements 1–4 (2026-07-31)

Executed against `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` (`{CANONICAL}`),
`docs/06-APPROVED-HOMEPAGE-COPY.md`, `docs/01-QUALITY-GUARDRAILS.md`, `docs/07-ONE-PAGE-DIRECTIVE.md`
§4/§7/§9, and `docs/11-COMPOSITION-AND-TYPE.md` §5, per `docs/12-SESSION-PROMPTS.md` Session 4.

**Starting-state check.** Session 3 had already rebuilt the token/composition system and
restructured every movement's container/rhythm/surface, but direct inspection of the four
movement components found the actual Session-4-scoped content work — the inline form, the
situational search language, and two composition deviations Session 3's own audit missed — still
outstanding. This session closed those gaps rather than rebuilding what already existed.

**Movement 1 — hero.** The 3-field inline form required by directive §7 did not exist anywhere on
`/`; the hero's only CTA was a link to `/request-assessment/`. Built `QuickHandoffForm.astro`, a
shared component (name, phone, "What are you looking at?" textarea, consent checkbox, honeypot,
`offer_type`/`entry_route` hidden fields) so the hero and the final-movement instance (Session 5)
stay identical instead of drifting. Its submit button carries the approved primary CTA label
("Get My 24-Hour Handoff Plan"), which resolves "ONE primary CTA" and "the 3-field form" as a
single unit rather than two competing actions. It posts through the same
`site.urls.formEndpoint` gate `AssessmentForm.astro` already uses (disabled + a visible notice
when unconfigured) — full `/api/lead` wiring, UTM/idempotency fields, and JS-disabled submission
testing remain Session 7/8 scope, not duplicated here.

Two direct-inspection findings, fixed:
- The hero had two `.ac-type-lead` paragraphs. `11-COMPOSITION-AND-TYPE.md` §2 caps lead at one
  per movement ("max one per movement"), and the session prompt asks for a "compact lead" —
  singular. Demoted the second paragraph to `ac-type-body` and reordered it below the trust line
  (it is supporting detail, not the hook).
- The "handoff outcome" list (Clear/Reset/Verify) carried `01`/`02`/`03` numerals.
  `11-COMPOSITION-AND-TYPE.md` §6 point 2 reserves numbered stage markers for the Five-Stage rail
  alone ("They appear nowhere else") — Session 3's own §9 audit had claimed this check passed,
  but the numerals were present in the code. Removed them; the list now reads as a plain
  label/detail ledger.

**First proof above the fold.** The trust line ("Insured · Written scope · Nothing removed
without approval · No unapproved charges · Documented closeout") was the last element in the
hero, after the CTA, the outcome ledger, and the urgent-call line — on a real mobile viewport
(390×800) it sat well below the fold. Moved it to immediately follow the lead paragraph, ahead of
the supporting detail paragraph and the form. Verified by screenshot at 390×800: the full trust
line is now visible with no scroll. Screenshots in `artifacts/phase-4/session-4/`.

**Movement 2 — recognition (`Qualification.astro`).** Added the situational search language
required by directive §4 — heavy accumulation, inherited/estate property, whole-house cleanout, a
property nobody can get to — as a third prose paragraph ("Sometimes it is heavy accumulation that
has built up for years...."), written as situations, not a keyword list. `hoarder` does not appear
anywhere in the movement (grep-verified, zero hits repo-wide across the four files touched this
session). Also found and fixed a composition-map mismatch: the section's surface was
`--ac-color-paper` (white) with no border, but `11-COMPOSITION-AND-TYPE.md` §5 row 2 specifies
"Warm white, hairline top rule." Changed the background to `--ac-color-warm-white` and added a
`--ac-color-steel-200` top hairline; removed hero's own `border-bottom` (which would have produced
two adjacent hairlines at the same seam) so the entering section owns the boundary, consistent
with the one-sided-padding cascade convention from Session 3.

**Movement 3 — what finished feels like (`OutcomeComparison.astro`).** The composition map and
the session prompt both specify "one display line, one paragraph, nothing else," but the
component had two body paragraphs plus a separately-styled lead closing line — three text
elements. Merged them into one `ac-type-body` paragraph, word-for-word from
`06-APPROVED-HOMEPAGE-COPY.md` §8.9 with no paraphrasing — only the paragraph break and the
separate lead role were removed. The closing sentence ("The property is no longer following you
around. It can move forward.") stays emphasized via inline `<strong>` rather than a second type
role, so it still reads as the payoff line without adding a second "type entry" to the movement.

**Movement 4 — category contrast (`CategoryContrast.astro`).** Reviewed against the composition
map, the approved copy, and the blacklist. Already compliant from Session 3's rework (two-column
comparison, not three cards; navy-900 full-bleed band; closing line lands on the emptied-vs-ready
contrast per `06-APPROVED-HOMEPAGE-COPY.md` §8.10 verbatim). No changes made.

**Anti-AI blacklist — checked against `01-QUALITY-GUARDRAILS.md` §5, movements 1–4 plus the new
form component:**
- 5.1 generic hero formulas — PASS. Asymmetric 58/42 hero, one CTA (the form's submit), no
  gradient/badges/stat bar/fake rating; first proof (trust line) now above the fold.
- 5.2 generic component furniture — PASS. No card grids, no rounded-rectangle sections, no pills,
  no icon-above-heading repetition; the hero criteria list and category contrast are both plain
  ledgers/comparisons, not cards.
- 5.3 generic page rhythm — PASS. Containers read wide → intimate → bleed → wide across
  movements 1–4 (§5's binding sequence); rhythm reads open → standard → vast → standard, each
  transition at ≥1.5x or 1.0x per §4's rule.
- 5.4 generic AI art direction — PASS. No imagery introduced this session; nothing to violate.
- 5.5 generic AI copy — PASS. Grepped all four files plus the form for the banned-phrase list
  ("At Aseptaclean, we…", "We understand that…", "seamless", "robust", "cutting-edge",
  "best-in-class", "It is not just X. It is Y.", "50+ years") — zero hits.
- 5.6 generic motion — PASS. No motion added; nothing scroll-triggered in movements 1–4.
- Numbered-marker rule (§6 detail layer, not §5, but checked alongside it) — the one real finding,
  fixed (see above): stage numerals had leaked into the hero criteria list.

**`01-QUALITY-GUARDRAILS.md` sentence-level pass, movements 1–4:** every visible sentence in
`Hero.astro`, `Qualification.astro`, `OutcomeComparison.astro`, and `CategoryContrast.astro` is
either verbatim from `06-APPROVED-HOMEPAGE-COPY.md` or (the one new paragraph in movement 2, and
the form's labels/consent copy) written in the same direct, concrete register — no rhetorical
questions as headings, no "whether you are," no three parallel benefits of suspiciously equal
length, no filler transitions. §14.2 (CTA language) — "Get My 24-Hour Handoff Plan" is specific,
not "Learn More"/"Get Started"/"Contact Us." §14.3 — no false urgency anywhere. §14.4 (forms) — the
new form has visible labels, required fields marked with `*` plus a "fields marked * are required"
note (matching `AssessmentForm.astro`'s existing convention), plain consent language, and degrades
to native HTML validation with JavaScript disabled. No guardrails failures found in movements 1–4
as rebuilt.

**Verification.** `astro check`: 0 errors, 51 files. `npm run build`: 8 routes, clean. Screenshots
at 320/390/768/1024/1440px confirm no horizontal overflow at any width and acceptable H1
line-breaking (no single-word widows introduced). Screenshots in `artifacts/phase-4/session-4/`.

**Known follow-ups, out of scope for this session:**
- The global sticky `MobileCTA` bar and the hero's own form submit button now both say
  "Get My [24-Hour] Handoff Plan" and can appear close together once a visitor scrolls to the
  form. Pre-existing header/CTA label mismatch (D3) is unchanged; this makes it more visible.
  Reconciling CTA labels sitewide remains Session 3C/5 scope per the Session 3 log.
- `QuickHandoffForm.astro` posts through the same interim `site.urls.formEndpoint` gate
  `AssessmentForm.astro` uses. Unifying both forms onto `/api/lead` with the full hidden-field set
  (UTM parameters, business-hours status, idempotency key) and JS-disabled submission testing is
  Session 7/8 scope, per `docs/12-SESSION-PROMPTS.md`.
- Movement 5 onward (Five-Stage Standard, Property Handoff Record, Confidence and Fit, Final
  decision, FAQ, footer) were not touched — out of scope per this session's "movements 1-4 of `/`
  only" instruction. The final-movement instance of `QuickHandoffForm` is Session 5's job.

## Phase 4 Session 5 — homepage movements 5–8, FAQ, footer (2026-07-31)

Executed against `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` (`{CANONICAL}`),
`docs/06-APPROVED-HOMEPAGE-COPY.md`, `docs/01-QUALITY-GUARDRAILS.md`, `docs/07-ONE-PAGE-DIRECTIVE.md`
§6/§9, and `docs/11-COMPOSITION-AND-TYPE.md` §5, per `docs/12-SESSION-PROMPTS.md` Session 5.

**Movement 6 — not rebuilt, by design.** The session-prompt sequence assumes movement 6 is still a
placeholder at this point ("the artifact is Session 6"). In this repo it already exists as a real,
working artifact — built in the pre-session ad-hoc pass and refined under the composition system in
Session 3 (confirmed compliant against §5 row 6: bleed, 1320px, vast both sides, steel-100 canvas,
`SAMPLE` label, documentation disclaimer in the caption). Regressing it to a placeholder would
destroy working content for no reason, so it was left untouched. Any remaining Session-6-shaped work
on it (e.g. `§10.2`'s "monospace only for field labels" — its field labels currently use Instrument
Sans, not a monospace face) stays open for whichever session actually owns that artifact.

**Movement 5 — Five-Stage Handoff Standard (`HandoffStandard.astro`).** Structurally already a
continuous rail (numeral + heading + body + "Record:" line per stage), not icon cards — no change
needed there. Repo-wide grep for the retired Assess/Define/Authorize/Clear/Document sequence,
"Defined Scope Document," "Completion Record," and the other retired guarantee names returned zero
hits anywhere, including alt text and schema. Two fixes:
- Surface was `--ac-color-paper` (white); `11-COMPOSITION-AND-TYPE.md` §5 row 5 specifies "Warm
  white." Changed to `--ac-color-warm-white`.
- All five stage `detail` strings in `homepage.handoffStages` (`src/data/site.ts`) were paraphrased
  from `06-APPROVED-HOMEPAGE-COPY.md` §8.11 (tighter, imperative-mood rewrites, e.g. "Define what
  stays..." for "We write down what stays..."). Corrected all five to the verbatim approved
  sentences, since the copy doc's own header states its wording is authoritative and this file was
  already open for the surface fix.

**Movement 7 — Confidence and fit (`ConfidenceAndFit.astro`).** Same surface defect: was
`--ac-color-paper`, changed to `--ac-color-warm-white` per §5 row 7. That flip made one inner
callout box invisible — `.pricing__assessment` (the "$195 on-site assessment" box) previously used
`--ac-color-warm-white` as a tint *against* a white section; with the section now warm-white itself,
the box would have blended into its background. Repointed it to `--ac-color-paper` so it still reads
as a raised card. Content fixes per directive §6 and §9:
- Added a sixth Handoff Assurance item, **Discretion**, written operationally per §6 ("unmarked
  vehicles, plain clothing, and no signage. We do not discuss the property with neighbors, and
  scheduling can be arranged around who is home or visible nearby") rather than as an adjective
  ("discreet"). No claim beyond what the business can actually commit to today.
- The §9 section map lists "fit/non-fit" as required content for this movement specifically (not
  merely satisfied by movement 2 carrying similar language elsewhere on the page). Added the
  approved closing sentence from `06-APPROVED-HOMEPAGE-COPY.md` §8.8 — "Routine housekeeping,
  single-item pickup, and low-cost hauling are not the primary fit." — as a second intro paragraph.
  Confirmed this exact sentence is *not* currently present in `Qualification.astro` either (a
  movement-2 gap, out of scope for this session's file list — noted below, not fixed).

**Movement 8 — Final decision (`FinalCTA.astro`).** This was the largest gap. The session prompt
asks for exactly three things: "return to the outcome, the 3-field form, the call CTA." What
existed was a lead paragraph (paraphrased), a five-item "what happens next" list absorbed from the
deleted `ProcessTimeline.astro` in Session 3, and a link-button to `/request-assessment/` — no
inline form, and the list's content duplicates movement 5 (Five-Stage Standard) one section
earlier. Per `07-ONE-PAGE-DIRECTIVE.md` §9, that "what happens next" content was never mapped to
movement 8 in the first place (row 5 absorbs "old process page" into the Five-Stage Standard; row 8
absorbs only "final CTA band"). Removed the five-item list entirely. Rebuilt the movement from
`06-APPROVED-HOMEPAGE-COPY.md` §8.18, verbatim:
- Lead paragraph corrected to the approved sentence ("Tell us what you are looking at, what must
  remain..." — was paraphrased to "Tell us what must stay, what likely needs to leave...").
- Added the second approved paragraph ("We will review the situation...") as `ac-type-body`, not a
  second lead — `11-COMPOSITION-AND-TYPE.md` §2 caps lead at one per movement, same resolution used
  on the hero in Session 4.
- Added the approved closing line ("The goal is not simply an empty room...") as bold body text —
  this is the "return to the outcome" the session prompt asks for, a direct callback to movement 3.
- Replaced the link-button with the second `QuickHandoffForm` instance (`docs/07` §7: "Appears
  twice: hero and final movement"), submit button carrying the primary CTA label.
- Fixed the secondary phone CTA's wording — was "Call {phone} for an urgent or complex property,"
  approved copy §8.18 gives "Call {phone} and tell us what you are looking at" (a *different*,
  correctly-distinct line from the hero's own §8.7 urgent-call wording, which was already correct).
- Fixed a rhythm bug: `.final-cta` had both `padding-top: open` *and* `padding-bottom: tight`, while
  `FAQ.astro` (the next section) already sets its own `padding-top: tight`. Under the one-sided-
  padding cascade convention established in Session 3, that doubled the intended "tight" seam.
  Removed the redundant `padding-bottom`.

**Making the shared form dark-surface-aware.** `QuickHandoffForm.astro`'s labels, consent text, and
link assumed a light section (navy text, navy links) — illegible on `FinalCTA`'s navy-900
background. Rather than fork a second form for the dark instance (which `docs/07` §7 explicitly
prohibits — "Do not duplicate the form"), added three CSS custom properties
(`--quick-form-label-color`, `--quick-form-muted-color`, `--quick-form-link-color`) with light-
surface defaults, and set `FinalCTA.astro` overrides scoped to `.final-cta__form-block :global(.quick-form)`
so only its instance is affected. Verified by screenshot at 390 and 1440: all text and the Privacy
Policy link are legible against the dark background; input fields (white boxes with dark text)
needed no change since they're self-contained regardless of section color.

**FAQ (`FAQ.astro` + `src/data/site.ts` + `src/pages/index.astro`).** Added the required eleventh
question — "Do you handle properties with heavy accumulation or hoarding conditions?" — answered
factually, inside the lawful scope, with the exclusion list attached (the same seven exclusions from
`06-APPROVED-HOMEPAGE-COPY.md` §8.12, restated in sentence form). "Hoarding" appears only as an
adjective in the question, matching the directive's own approved phrasing; "hoarder" as a noun does
not appear anywhere (grep-verified across every file touched this session). Built the missing
`FAQPage` JSON-LD: `index.astro` now maps `homepage.faq` directly into a `schema` prop consumed by
`BaseLayout`/`SeoHead`'s existing (previously unused) `schema` merge point, so the schema is
generated from the exact same array `FAQ.astro` renders — verified in the production build output
that all 11 questions appear in `@graph` and the last entry's `acceptedAnswer.text` matches the
rendered answer character for character. Fixed the same surface defect as movements 5 and 7 (paper
→ warm-white).

**Footer (`Footer.astro`).** Was showing only `legal.scopeDisclaimer`; the session prompt requires
"both required disclaimers." Added `legal.documentationDisclaimer` (previously only used in the
Property Handoff Record's caption). Grouped the two disclaimers under a `.site-footer__disclaimers`
wrapper so the existing 2fr/1fr desktop grid (disclaimers | copyright) still reads as two columns
instead of the copyright line orphaning onto its own row.

**Anti-AI blacklist — checked against `01-QUALITY-GUARDRAILS.md` §5, movements 5–8, FAQ, footer:**
- 5.1/5.2 — PASS. No icon cards on the Five-Stage rail (checked explicitly per this session's own
  instruction); Confidence-and-fit's three blocks are asymmetric columns (5fr/4fr/3fr), not equal
  cards; FAQ uses native `<details>`, no accordion-as-card styling.
- 5.3 generic page rhythm — PASS. Full rhythm sequence open → standard → vast → standard → open →
  vast → standard → open → tight → standard; every adjacent pair is ≥1.5x or exactly 1.0x per §4's
  rule (verified numerically, not just visually).
- 5.5 generic AI copy — PASS. Grepped all files touched this session for the banned-phrase list;
  zero hits.
- 5.6 generic motion — PASS. No motion added.
- Retired-concept purge (directive §3) — PASS, repo-wide grep for the old A/D/A/C/D sequence and
  guarantee names returned nothing.

**`01-QUALITY-GUARDRAILS.md` failures found and fixed:** the three surface-color deviations from
the binding composition map (movements 5, 7, FAQ), the illegible dark-surface form (would have
failed §13 accessibility/contrast and §14.4 forms-are-part-of-the-design on sight), the doubled
rhythm gap between movement 8 and FAQ, and movement 8's copy paraphrasing (§15 content fidelity to
the approved-copy authority). No other failures found in the sections this session touched.

**Verification.** `astro check`: 0 errors. `npm run build`: 8 routes, clean. Confirmed the
production build resolves `PUBLIC_STARTING_PRICE` to `$1,500` correctly (the plain `astro dev`
preview shows `$NaN` for that figure because no `.env` value is loaded in bare dev mode — a
dev-server-only artifact, not a build defect; `.env.production` is what ships). No horizontal
overflow at 390px. Screenshots of all five updated sections at 390/1440px in
`artifacts/phase-4/session-5/`.

**Known follow-ups, out of scope for this session:**
- `Qualification.astro` (movement 2) is still missing the "require a written plan for what stays,
  what leaves, and what gets cleaned" bullet and the "not the primary fit" closing sentence from
  `06-APPROVED-HOMEPAGE-COPY.md` §8.8 — noticed while confirming movement 7's fit/non-fit content
  didn't already exist elsewhere. Movement 2 is Session 4's file, not this session's; left as-is.
- The Property Handoff Record's field labels (movement 6) use Instrument Sans where
  `11-COMPOSITION-AND-TYPE.md` §10.2 specifies monospace for field labels/status metadata. Movement
  6 was explicitly out of scope this session (see above).
- Several existing FAQ answers (dumpster coordination, discovered-items) carry minor paraphrase
  drift from §8.17's exact wording, predating this session. Only the new eleventh question and the
  schema wiring were this session's job; the other ten were left as found.

## Phase 4 Session 6 — Property Handoff Record (2026-07-31)

Executed against `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` (`{CANONICAL}`) artifact-system
section and `docs/11-COMPOSITION-AND-TYPE.md` §5/§7/§10.2, per `docs/12-SESSION-PROMPTS.md`
Session 6. This is the artifact Session 5 explicitly deferred ("stays open for whichever session
actually owns that artifact").

**Rebuilt `HandoffRecord.astro` from a 4-field sample table to a complete operating-document
artifact.** The prior version (placement/tokens only, carried over from the pre-session build)
covered property/scope-version/closeout, a 4-column room table, and a 4-item closeout strip — well
short of the session prompt's required field list. Added, in `src/data/site.ts`
(`homepage.sampleRecord`, restructured from an array to an object — grepped repo-wide, the array
was consumed only by this component, so the shape change is safe):

- **Masthead:** project identifier (`Project HR-1042`) alongside the existing `SAMPLE / Not a
  client record` line, plus a bordered `SAMPLE` stamp badge (`aria-hidden`, since the adjacent
  sentence already carries the same information accessibly) — the visible SAMPLE label the prompt
  requires, now doubled (text + stamp) rather than relying on red text alone.
- **Scope reference panel:** authorized decision-maker (role-based — "Owner of record — single
  point of approval," not a fabricated name, to stay clear of the "fabricated client data"
  prohibition), approved clearing scope, approved cleaning scope, and excluded conditions. These
  are written as this-project reference lines ("None encountered on this project — full exclusion
  list attached to the signed scope"), not a reprint of `homepage.includedScope`/`excludedScope`
  (the full marketing-facing lists already rendered in `ConfidenceAndFit.astro`) — an operating
  record cites the signed scope, it doesn't restate the whole contract.
- **Room disposition table:** reused the four sample rooms, replaced the old Clear/Reset/Verify
  stage-status columns with Area / Status / Note, where Status is the keep/remove/review
  disposition the prompt names, rendered as a restrained bordered tag distinguished by symbol
  (✓/–/?) rather than color, so it doesn't collide with the site's existing red/green semantic
  color use (exclusions/guarantees elsewhere on the page).
- **Closeout reference panel**, expanded from 4 to 6 fields: change authorization reference,
  discovered-item log reference (new — distinct from the exception log), exception status,
  completion photograph index (now with numbered ranges — "Photos 01–18 starting condition ·
  19–42 closeout condition"), final review status, and closeout date. Closeout date is written as
  a process milestone ("Confirmed at final walkthrough, prior to handoff") rather than an absolute
  calendar date, to stay clear of the prompt's "fake project dates presented as real" prohibition
  while still giving the field real content.

**Monospace field labels — closed the gap Session 5 flagged.** `§10.2` calls for monospace field
labels/status metadata on document artifacts; the component had none (Instrument Sans throughout).
Added a component-scoped `--record-font-mono` system stack (`ui-monospace, "SF Mono", "Cascadia
Mono", "Roboto Mono", Menlo, Consolas, monospace` — no new font file, since Session 3 only
self-hosted Newsreader and Instrument Sans) applied narrowly to label/status/tab/stamp elements via
one scoped selector, leaving reading content (notes, values) in Instrument Sans for legibility.
`ResidenceBaselineRecord.astro` has the same gap but is out of scope (not movement 6, not named in
this session's prompt) and was left untouched.

**"Permitted" devices from the session prompt, implemented:**
- *Tabs* — small inset folder-tab headers (`SCOPE REFERENCE` / `ROOM DISPOSITION` / `CLOSEOUT
  REFERENCE`) connected to each panel's top rule. Deliberately not a protruding flag or interactive
  JS tab-switcher — inset avoids any horizontal-overflow risk and keeps the artifact JS-optional.
- *Layered documents* — two paper edges (`::before`/`::after` on a new `.record-stack` wrapper)
  offset 10px/20px behind the primary sheet. `.record-movement` got `overflow-x: hidden` as an
  explicit guard so this decorative offset can never introduce horizontal scroll regardless of
  viewport width (verified — see below).
- *Restrained check states* — the Keep/Remove/Review status tags above.
- *Date or status stamps* — the SAMPLE stamp badge. No rotation/tilt anywhere (prohibited by
  `§10.2` — "no decorative tilt, curled paper, coffee stains").
- *Numbered photo references* — the photograph index field.

**Motion — the one scroll-triggered reveal.** Added an inline `<script>` that, only when
`IntersectionObserver` exists and `prefers-reduced-motion: reduce` does not match, adds a
`record--pre-reveal` (opacity 0, translateY 28px) class to the artifact and removes it (via
`record--visible`, 640ms fade/rise) once 20% of it enters the viewport, then disconnects. If the
condition isn't met (reduced motion, or JS never runs at all) the class is never added and the
artifact stays at its default opacity: 1 — satisfying `§10.4` ("content must exist and remain
readable before motion initializes... may not gate access"): a JS failure fails open to fully
visible, not hidden.

**Verification:**
- `astro check`: 0 errors.
- `npm run build`: 8 routes, clean production build.
- Sitewide regression re-run (`scripts/phase4-session3-check.mjs` against the production preview):
  PASS — one H1, nine Newsreader-role elements, three `.ac-mark` instances unchanged, every heading
  still carries an `.ac-type-*` role class, no section `min-height`, no horizontal overflow at
  390/1440px.
- Reduced motion (Playwright `reducedMotion: "reduce"` context): artifact never enters the
  `record--pre-reveal`-without-`record--visible` state; computed opacity is `1` immediately.
- JavaScript disabled (`javaScriptEnabled: false` context): computed opacity is `1` — the artifact
  is never gated behind script execution.
- Screenshots at 390 and 1440 (both the full homepage and a scroll-triggered, post-reveal crop of
  the artifact itself) in `artifacts/phase-4/session-6/`, captured against the production preview
  build (`astro build` + `astro preview`) rather than `astro dev` — the dev-only Astro dev toolbar
  (a fixed bottom-viewport pill with its own icon set) showed up in earlier `astro dev` captures and
  was mistakable for a page defect; confirmed absent from the production bundle.
- Confirmed only one file imports `HandoffRecord` (`src/pages/index.astro`, already in the correct
  movement-6 position from Session 3 — placement was not touched this session).

**Not changed:** movement 6's position in `index.astro` (already correct), the surrounding
movements, and `ResidenceBaselineRecord.astro` (separate artifact, separate route, not in this
session's scope).

## Phase 4 Session 7 — remediation-pass D1–D11 re-audit and conversion/composition fixes (2026-07-31)

Executed against `docs/13-REMEDIATION-PASS.md`, `docs/14-RESEARCH-FINDINGS.md`, and
`docs/15-UX-DESIGN-RESEARCH-FINDINGS.md`, cross-checked against `docs/aseptaclean-homepage-mockup.html`
(reference for spacing/hierarchy/eyebrow-numbering conventions only, not copied directly).

**Starting-state audit, run against the live production build (`npm run build` + `astro preview`,
not `astro dev`, so `PUBLIC_PHONE`/`PUBLIC_STARTING_PRICE` resolve correctly).** Ran
`scripts/phase4-session3-check.mjs` plus a new one-off Playwright script covering the specific
D1–D11 claims (CTA text per instance, `tel:` link presence/location, eyebrow offset, hero-rail
stage count, header height at rest and after 500px scroll, sticky-bar hidden state). Findings:

| Defect | Status found | Evidence |
| --- | --- | --- |
| D1 (no form) | Resolved (Sessions 4–5) | `QuickHandoffForm` confirmed present in hero and final movement |
| D2 (no phone) | Partial | `tel:` links existed in hero, final CTA, footer, but not the header; `MobileCTA.astro`'s visibility script targeted `.hero__action`, a class Session 4 renamed to `.hero__form-block` — the selector never matched, so `heroActionVisible` stayed `false` permanently and the sticky bar rendered on every scroll position, screenshotted overlapping the hero form's own consent checkbox at 390px |
| D3 (CTA labels disagree) | Still present | Header and `MobileCTA` both rendered `site.offer.compactCta` ("Get My Handoff Plan"); hero/final form submits rendered `primaryCta` ("Get My 24-Hour Handoff Plan") |
| D4–D9 | Resolved (Session 3) | Re-verified: 9 Newsreader-role elements, one `01–05` numeral sequence (Five-Stage rail only), all eyebrows at 0px offset from their cell top, zero sections with `min-height`, zero horizontal overflow at 390/1440 |
| D10 (hero rail shows 3 of 5 stages) | Still present | `Hero.astro`'s `.hero__criteria` list was hardcoded to Clear/Reset/Verify, omitting Scope and Protect — Session 3's log had marked D10 "out of scope, remains open," and neither Session 4 nor 5 touched it |
| D11 (header oversized, never condenses) | Partial | Resting height already down to 73px (`min-height: 4.5rem`) from the ~130px the remediation pass described — Session 3's rebuild fixed this by construction — but no scroll-condense behavior existed (73px before and after a 500px scroll) |

Fixed D2, D3, and D10 this session per the user's stated priority (D1/D2 first, then the rest of
what the audit found still open). D11's remaining "condense on scroll" behavior was left alone —
the resting height is already well inside a reasonable range and directive `00-MASTER-BRIEF.md`
§19.6's actual requirement ("no sticky control covering a form field or submit button") is met;
adding scroll-triggered height animation for a header already at 73px looked like motion for its
own sake rather than a real defect, so it was not built.

**D2 — phone reachability (`Header.astro`, `MobileCTA.astro`).**
- Added a `tel:` link to the header, sourced from `site.business.phoneUri` (never hardcoded, per
  the session brief's own instruction — confirmed `PUBLIC_PHONE` was already set in
  `.env.production`, so this did not require stopping to report a missing config value). Desktop
  nav gets it as a plain-text link before the CTA button; mobile gets a compact version in a new
  `.site-header__mobile-actions` wrapper that sits beside the hamburger, visible without opening
  the menu, replacing the previous mobile header (which had no CTA and no phone at all outside the
  expanded menu).
- Fixed the stale `.hero__action` selector in `MobileCTA.astro` to `.hero__form-block` (the actual
  class since Session 4). Verified by script: `mobileCtaHiddenAtTop` went from `false` to `true`,
  and the 390px scrolled screenshot no longer shows the sticky bar sitting on top of the hero
  form's consent line.
- Added a `scrollY > 400` gate to the show/hide logic, matching the remediation pass's literal
  spec ("appears after 400px of scroll"), and tightened the bar's hide breakpoint from
  `min-width: 64rem` to `min-width: 48rem` — the remediation pass and `docs/15` §2 both specify
  the sticky call bar as phone/mobile-only ("do not add a desktop equivalent, the data doesn't
  support it"); 64rem (1024px) was catching tablets.
- Turned `MobileCTA` into the "sticky call bar" the spec asks for rather than building a second,
  competing sticky element: it now renders a compact `Call {phone}` link beside the existing
  primary-CTA button in one bar, so mobile visitors get both actions without two stacked sticky
  bars fighting for the same 48rem-wide screen. Screenshotted mid-page (scrollY ≈ 2160, between
  hero and final CTA) at 390px — bar shows `Call (408) 785-7588` and `Get My 24-Hour Handoff Plan`
  side by side with no overflow.

**D3 — CTA label consistency.** Removed `site.offer.compactCta` from `src/data/site.ts` entirely
(grepped first — its only two call sites were `Header.astro` and `MobileCTA.astro`, both being
fixed this session; no dead-shim left behind). Both now render `site.offer.primaryCta`. At 1440px
the longer label wrapped to two lines in the header nav's tighter flex row; added
`white-space: nowrap` scoped to `.desktop-nav .button` and confirmed by screenshot at both 1440px
and the 1024px minimum desktop breakpoint that it now sits on one line with no overflow.
Corrected `docs/04-RELEASE-CHECKLIST.md`'s item 8, which had scored the label mismatch as a
"deliberate variant, not a defect" — that call is superseded by `docs/13` D3 and the single-CTA
research in `docs/15` §2 (266% conversion lift from a single CTA label), so the checklist entry
now points at this session's fix instead of re-justifying the old split.

**D10 — hero rail.** `Hero.astro`'s `.hero__criteria` list now maps directly over
`homepage.handoffStages` (the same array `HandoffStandard.astro` renders) instead of a hardcoded
3-item Clear/Reset/Verify list, showing all five stage names with their `record` field as the
compact secondary line (Scope/Room-by-room plan, Protect/Keep and review controls, Clear/Clearing
status, Reset/Cleaning status, Verify/Closeout package). Chose "all five stages, compressed" over
"a single proof element" (the remediation pass's other option) specifically because tying the rail
to the same source array as the Five-Stage Standard section prevents the two from drifting apart
again the way the old hardcoded list had. Deliberately did not add `01–05` numerals to this
instance — `docs/13` D7's numeral budget reserves that treatment for the Five-Stage rail itself,
and the rail's own eyebrow ("The handoff outcome") was left unchanged rather than renamed to avoid
reading as a second, competing "Five-Stage Standard" label so early on the page.

**False-positive checked and ruled out.** The Property Handoff Record artifact rendered fully
blank in an initial full-page Playwright screenshot, which looked like a regression. Investigated
before reporting it: `.record-stack`'s computed opacity was `1` and all content present once the
element was actually scrolled into view (`scrollIntoViewIfNeeded` + a real screenshot of the
element), and a real hash-navigation test (`/#standards`) confirmed the site's sticky header does
not obscure scroll-targeted headings either. Both were artifacts of the one-shot `fullPage: true`
screenshot method not triggering the artifact's `IntersectionObserver` reveal (Session 6's
existing, correct behavior) and of `scrollIntoViewIfNeeded`'s scroll behavior differing from
native fragment navigation — not real defects. Not filed as findings; noted here so a future
session doesn't re-discover the same false alarm from the same screenshot method.

**Verification.** `astro check`: 0 errors, 51 files. `npm run build` (full production mode,
`.env.production`, validated by `scripts/validate-env.mjs`): 8 routes, clean.
`scripts/phase4-session3-check.mjs` re-run against the rebuilt production preview: PASS on all
three checks (one H1, nine Newsreader-role elements, three `.ac-mark` instances, every heading has
an `.ac-type-*` role class, no section `min-height`, no horizontal overflow at 390/1440px) — no
regressions from Session 3's baseline. Targeted D1–D11 script re-run post-fix: header and sticky
bar both report `Get My 24-Hour Handoff Plan`; header `tel:` href present; hero rail reports all
five stage names in order; sticky bar `hidden` at page load and immediately after a 500px scroll
(still within the hero); no horizontal overflow at either width. Screenshots at 390 and 1440
(full-page top state, scrolled-500 state, header at 1024/1440, hero rail, mid-page sticky bar, and
the Handoff Record artifact) in `artifacts/phase-4/session-7/`.

**Known follow-up, not fixed this session:** D11's scroll-condense behavior (header does not
shrink further on scroll, though it no longer needs to at 73px resting height) — judged
lower-value than motion-for-motion's-sake per `01-QUALITY-GUARDRAILS.md`'s stance against generic
motion, deferred pending explicit direction to pursue it.

## Phase 4 Session 8 — defect #12: Confidence and fit dead space (2026-07-31)

**Root cause.** `ConfidenceAndFit.astro`'s `.confidence__blocks` rendered the assurance ledger
(scope-boundary content plus the folded-in Handoff Assurance list, `id="included"`), the pricing
block, and the founder block as three CSS Grid columns at `5fr/4fr/3fr` (`min-width: 70rem`). A
single-row, three-column grid track's height is set by its tallest cell regardless of the
`fr` weighting — the `fr` values only distribute *width*, not height. The assurance ledger's
content (scope-boundary list, excluded-conditions aside, five-item assurance ledger, and a closing
note) runs roughly 3x longer than the pricing or founder columns, so the row rendered at the
ledger's full height while the pricing and founder columns ended early and left their remaining
~2 viewports of row height empty beneath them — audit item 12 in the merged `11-COMPOSITION-AND-
TYPE.md` §9 / `13-REMEDIATION-PASS.md` §3 failure-audit list ("Does any viewport-height region of
the page render more than ~60% empty?"). This check had previously been marked PASS on visual
review (Session 3, before the scope/assurance merge and the pricing/founder content both landed in
the same row) — the defect was introduced by later content growth into an already-fragile
equal-row-height structure, not by anything in this session's own prior work.

**Fix.** Restructured `.confidence__blocks` from a flat three-column row to two stacked pieces:
the assurance ledger block stays first, capped at `max-width: 64%` (roughly two-thirds) so it
takes only the width its content needs instead of stretching a whole grid row to its own height;
pricing and founder are grouped under a new `.confidence__support` wrapper rendered as a
shorter two-column strip (`repeat(2, minmax(0, 1fr))`) below it, sized to their own — much
shorter — content. DOM order is unchanged (scope/assurance → pricing → founder), so no `id`
anchors (`#included`, `#about`) moved and no other component's links needed updating. Mobile
(`< 70rem`) was not touched: `.confidence__blocks` and the new `.confidence__support` wrapper both
fall back to an unstyled single-column grid with the same `var(--ac-space-8)` gap the flat
three-block stack already used, so the stacked order and spacing at 390px are identical before and
after — confirmed by screenshot, `artifacts/phase-4/session-8/confidence-defect12-after-390.png`.

Explicitly **not** done: forcing the three blocks back to equal-width columns. That was the
mechanism that produced the defect (a short column's row-height is still set by the tall column
in the same row, no matter how the widths are split), not a rendering bug to patch around — see
the `11-COMPOSITION-AND-TYPE.md` §5 row 7 note added alongside this entry.

**Verification.** `astro check`: 0 errors, 49 files. Before/after screenshots at 1440px in
`artifacts/phase-4/session-8/confidence-defect12-{before,after}-1440.png`: before shows the
pricing and founder columns ending around a third of the way down the row with the remaining
~two-thirds of their column width empty for the rest of the row's height; after shows the
assurance ledger's content followed immediately by the pricing/founder strip with no trailing
empty band. Re-ran audit item 12 ("does any viewport-height region render more than ~60% empty?")
against the rebuilt section only — **PASS**. Full `§9` re-audit and `docs/13-REMEDIATION-PASS.md`
§3 re-audit were not re-run in full; this session was scoped to defect #12 only.
motion; left as a discretionary item for a future session if the owner wants it.

## Phase 4 Session 9 — Cloudflare Pages deployment target resolved (2026-08-01)

**Owner decision, confirmed:** this project deploys to Cloudflare Pages. This closes the open
question `docs/PHASE-4-AUDIT.md` item 3/§"Deployment target" and `05` Session 2 item 3 both left
unresolved — the artifact previously produced by the build (`sites/worker.js` copied to
`dist/server/index.js`, targeting `.openai/hosting.json`'s Sites project) was never the real
target. `functions/api/lead.ts` is **not** ported or rewritten; it is a complete, correct Cloudflare
Pages Function and stays exactly as-is. What changed is wiring it to actually run.

**Adapter question, resolved by testing, not by assumption.** The initial instruction was to
install `@astrojs/cloudflare` and configure it as the Astro adapter. Installed and tested it first:
configuring it (even with `output: "static"`, zero on-demand routes) makes Astro emit its own
`dist/**/wrangler.json` targeting **Cloudflare Workers static-assets deploy** (`wrangler deploy`) —
a different Cloudflare product from **Cloudflare Pages** (`wrangler pages deploy` + a top-level
`functions/` directory), which is what `functions/api/lead.ts` is written for and what the owner
confirmed. Per Cloudflare's own docs, a build that emits `_worker.js` causes Pages to ignore the
`functions/` directory entirely — wiring the adapter in as configured would have silently killed
the one working piece of lead-delivery logic in the repo. Separately confirmed the adapter isn't
needed for anything: `wrangler pages dev dist` (zero adapter, zero config) already auto-discovers
and correctly invokes the top-level `functions/` directory by Cloudflare Pages' own convention.
Presented both findings to the owner; **owner chose to skip the adapter.** `@astrojs/cloudflare`
was installed, tested, and removed again — not present in the final `package.json`.
`astro.config.mjs` is unchanged (`output: "static"`, no adapter).

**`wrangler.toml` added** at the repo root: `pages_build_output_dir = "./dist"`, an `[[r2_buckets]]`
binding `LEAD_UPLOADS` (private lead/upload storage) and a `[[kv_namespaces]]` binding
`LEAD_RATE_LIMIT` (submission rate limiting), matching `LeadEnvironment` in
`functions/_lib/lead.ts` field-for-field. The KV `id` is a placeholder
(`REPLACE_WITH_REAL_KV_NAMESPACE_ID`) — the owner must run `wrangler kv namespace create
LEAD_RATE_LIMIT` and `wrangler r2 bucket create aseptaclean-lead-uploads` against the real
Cloudflare account and paste the real IDs before production deploy; this does not block local dev,
which uses Wrangler's local KV/R2 emulation regardless of the `id` value. All remaining
`LeadEnvironment` fields (`TURNSTILE_SECRET_KEY`, `HUBSPOT_*`, `RESEND_API_KEY`,
`EMAIL_FROM_ADDRESS`, `OWNER_ALERT_EMAIL`, `TWILIO_*`, `LEAD_ALERT_PHONE`, `ALLOWED_ORIGINS`) are
secrets, intentionally left out of `wrangler.toml` (which is committed): production uses `wrangler
pages secret put <NAME>`, local dev uses a new git-ignored `.dev.vars` (template committed as
`.dev.vars.example`, pre-filled with Cloudflare's public Turnstile testing secret key, which always
passes verification and is safe to share). `wrangler` added as a devDependency
(`^4.118.0`, matching `@astrojs/cloudflare`'s own peer requirement, kept for parity even though the
adapter itself was removed).

**`scripts/prepare-sites-output.mjs` deleted**, along with `.openai/hosting.json` and
`sites/worker.js` (now-empty `.openai/` and `sites/` directories removed with it) — all three were
purely the retired OpenAI Sites hosting artifacts this decision replaces. `package.json`'s `build`
script no longer calls the deleted script (Cloudflare Pages needs nothing beyond the plain `astro
build` static output plus the untouched top-level `functions/` directory — no restructuring into a
`dist/client`/`dist/server` split). Added a `pages:dev` script (`build` then `wrangler pages dev
dist`) as the local Pages dev entrypoint. `scripts/phase4-static-audit.mjs` updated from
`dist/client` to `dist` to match — it was the only other script referencing the old split
directory.

**Independent bug found and fixed while testing this end to end:** `public/_redirects`' wildcard
catch-all (`/*  /  301`, added in Session 2 as a "safety net," on the documented but incorrect
assumption that real files resolve before `_redirects` is consulted) in fact redirects **every**
request, including `/` itself, per Cloudflare's own docs ("redirects are always followed, regardless
of whether or not an asset matches the incoming request"). Reproduced directly: `wrangler pages dev`
served a 301-to-`/` loop for the homepage, every real route, and the actual named legacy paths.
Deployed as committed, this would have made the entire live site unreachable — not a hypothetical,
a launch-blocking regression this session's Cloudflare testing happened to catch before deploy.
Fix: removed the wildcard line; the eleven explicit named legacy-path redirects (§2's retired
routes) are kept as-is and still work exactly as documented. Unmatched paths now fall through to
Cloudflare Pages' standard 404 instead of a redirect loop — confirmed real routes now return `200`
and named legacy paths still return a single-hop `301` to `/`, both via `wrangler pages dev`.

**Verified end to end**, entirely through `wrangler pages dev` against a real `npm run build`
output (no mocked HTTP layer): `GET /` and `GET /private-residence-reset/` return `200` (previously
301-looped); `GET /about/` (retired path) still returns a single-hop `301` to `/`; `GET /api/lead`
returns `405` with an `Allow: POST` header; a full valid multipart `POST /api/lead` (Turnstile
response satisfied via Cloudflare's public always-pass testing secret) returns `201` with a real
`submissionId`, the lead record round-trips through the local R2 emulation (confirmed by
resubmitting the same `idempotency_key` and getting back `duplicate: true` with the identical
`submissionId` — proof of an actual write-then-read, not just a 201), and the local KV emulation
persists a rate-limit key under `.wrangler/state/v3/kv/`. HubSpot/Resend/Twilio correctly report
`skipped` (no real credentials supplied yet, by design — this session used mocked/test credentials
only, per instruction; no real provider keys exist anywhere in the repo). Malformed submissions
still return `422` with the full per-field error map, unchanged.

**Still open, unchanged by this session:** real HubSpot/Resend/Twilio provider credentials, the
real R2 bucket and KV namespace IDs, and `PUBLIC_FORM_ENABLED=true` in production — `04-RELEASE-
CHECKLIST.md`'s blocking item (5 consecutive real-credential staging sends) still has not been run
and is not satisfied by this session's mocked-credential testing. This session closes the
*wiring/deployment-target* gap only: `functions/api/lead.ts` now has a real, verified traffic path
on the platform the owner confirmed; it did not before.

Files changed: `astro.config.mjs` (no change — reverted after the adapter test), `package.json`,
`package-lock.json`, new `wrangler.toml`, new `.dev.vars.example`, `.gitignore`
(`.dev.vars`, `.wrangler/`), `public/_redirects`, `scripts/phase4-static-audit.mjs`. Deleted:
`scripts/prepare-sites-output.mjs`, `.openai/hosting.json`, `sites/worker.js`.

## Termly wired — Privacy and Terms live, Cookie Policy held for post-deploy (2026-08-07)

**Owner confirmed Termly is on a paid plan** and supplied the real policy UUIDs. Mapped onto the
`PUBLIC_TERMLY_*` variables `src/data/site.ts`/`src/env.d.ts` already expected (no new variables
invented) and set directly in `.env.production` — these render client-side, so they are public
config, not `wrangler` secrets, consistent with how every other `PUBLIC_*` value in this file is
handled:
- `PUBLIC_TERMLY_PRIVACY_POLICY_ID=1f1dee92-08da-4cde-9c53-e7798ab17692`
- `PUBLIC_TERMLY_TERMS_POLICY_ID=5502eb89-1cb1-43ce-ae8a-b589abee0466`
- `PUBLIC_TERMLY_COOKIE_POLICY_ID=02262c90-99a5-446e-9bff-b0beb7b3d24a`
- `PUBLIC_TERMLY_CONSENT_ENABLED=false` (explicit HOLD — see below)
- `PUBLIC_TERMLY_WEBSITE_UUID=`, `PUBLIC_TERMLY_PRIVACY_URL=`, `PUBLIC_TERMLY_TERMS_URL=`,
  `PUBLIC_TERMLY_COOKIE_POLICY_URL=` left blank (see "Still outstanding" below).

**Privacy and Terms confirmed live.** Verified by a real `npm run build` (`validate:env` +
`astro build --mode production`) and inspecting the built output directly: `dist/privacy/` and
`dist/terms/` both render the `termly-embed` iframe div with the correct `data-id` UUID and load
`embed-policy.min.js`; neither contains the "Policy not published in this preview" fallback
string. This is a real, provider-controlled policy render, not a stub.

**Cookie Policy: ID wired, display intentionally held.** The owner flagged that the current Cookie
Policy in Termly was scanned against the old WordPress site and is wrong — it must not be shown
until it is regenerated against the live site post-deploy. `PUBLIC_TERMLY_COOKIE_POLICY_ID` is set
(so the value exists and the eventual re-enable is a flag flip, not a re-wiring), but
`src/pages/cookie-policy.astro` was changed to only pass `policy.id`/`policy.hostedUrl` through to
`LegalPolicy.astro` when `site.integrations.termly.consentEnabled` is `true` — otherwise it passes
empty strings, which renders the same "Policy not published" fallback state as an unconfigured
policy. Verified in the build output: `dist/cookie-policy/` contains zero occurrences of the
Cookie Policy UUID and shows the fallback copy.

**Deliberately coupled to the same flag as the consent banner, not a separate one.** The owner's
own stated plan bundles both into one post-deploy step ("regenerate the Cookie Policy... and turn
the banner on"), and `BaseLayout.astro`'s consent-banner script was already gated on
`PUBLIC_TERMLY_CONSENT_ENABLED=true` + a non-empty `PUBLIC_TERMLY_WEBSITE_UUID` before this
session. Reusing that one flag for both means there is exactly one switch to flip at launch,
instead of two that could drift out of sync (e.g. the banner pointing users to a cookie policy
page that still shows the old-WordPress-derived fallback, or vice versa). Verified in the same
build: no `termly-embed-banner` script and no footer "Cookie Preferences" control render anywhere
on the site while the flag is `false`.

**Analytics/marketing scripts confirmed silent pre-consent**, per the earlier audit's requirement.
`Analytics.astro`'s GA/GTM snippets are gated on the same `consentEnabled` flag and use
`type="text/plain" data-type="analytics"` (Termly's auto-block convention — inert until Termly's
resource blocker rewrites the type post-consent). `PUBLIC_GA_ID`/`PUBLIC_GTM_ID` are also unset in
`.env.production`, so nothing renders on either count today; confirmed zero
`data-type="analytics"` script tags in the built homepage.

**Still outstanding — owner action required before the banner can ever be turned on:**
`PUBLIC_TERMLY_WEBSITE_UUID` was not supplied with a real value (the owner's message contained the
literal placeholder text, not an actual UUID) and was left blank rather than filled with a
non-real value. Because `consentEnabled` requires a truthy website UUID *and*
`PUBLIC_TERMLY_CONSENT_ENABLED=true`, the banner (and, by the coupling above, the Cookie Policy
page) stays held either way — but the real account-level UUID from the Termly dashboard still
needs to be pasted into `PUBLIC_TERMLY_WEBSITE_UUID` as part of the post-deploy re-enable step.

**Post-deploy checklist (do not lose this):**
1. Regenerate the Cookie Policy in Termly against the live (new) site.
2. Paste the real `PUBLIC_TERMLY_WEBSITE_UUID` into `.env.production` if not already set.
3. Flip `PUBLIC_TERMLY_CONSENT_ENABLED=true` in `.env.production`.
4. Re-run `npm run build` — `scripts/validate-env.mjs` already enforces this: once
   `PUBLIC_LAUNCH_MODE` leaves `preview` (full public production), it requires
   `PUBLIC_TERMLY_CONSENT_ENABLED=true` and a UUID-formatted `PUBLIC_TERMLY_WEBSITE_UUID`, and
   fails the build otherwise — this was not changed and remains the safety net.

Files changed: `.env.production`, `src/pages/cookie-policy.astro`.
