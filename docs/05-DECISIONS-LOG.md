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
| 2026-08-11 | Customer-facing submissions are identified by a short code `AC-XXXXXX`, six Crockford base32 characters derived from the top 30 bits of the submission UUID. The UUID stays the internal key for R2 paths, idempotency, and HubSpot. **A sequential counter is explicitly rejected.** | The UUID is unreadable on a phone and cannot be read aloud or typed from a photo. Crockford's alphabet drops I, L, O, and U, the characters that get misheard or mistyped. Deriving rather than generating needs no counter and always recomputes from the record. A counter was rejected because `AC-000004` publishes how few leads the business has ever had. | `functions/_lib/lead.ts`, `functions/api/lead.ts`, `functions/_lib/providers.ts`, `src/pages/thank-you.astro`, both form components, HubSpot deal schema |
| 2026-08-11 | Owner alert subject line is `New lead · <city> · <situation> · <code>`, city and situation first, ID last. Missing fields are dropped, never rendered as "Not supplied". | The subject is read on a phone lock screen before the message is opened; it must carry what decides whether to answer. The prior format led with the offer label and a raw UUID, which was unreadable at that size. | `functions/_lib/providers.ts` |

## Phase 4 Session 1 — §0 canonical document resolution (2026-07-30)

`docs/07-ONE-PAGE-DIRECTIVE.md` §0 left three placeholders unresolved. Session 1's audit
(`docs/PHASE-4-AUDIT.md`) resolves them with certainty, confirmed by the precedence chain already
written into the repo's root `AGENTS.md` (which names full filenames, not the `…` placeholders in
`docs/AGENTS-PRECEDENCE-BLOCK.md`) and by each file's own content matching its assigned role:

- `{CANONICAL}` = `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` — the Phase 4 canonical master specification.
- `{RESIDENCE}` = `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — Private Residence Reset strategy/build spec, Phase 2 only.
- `{OLD-VISUAL}` = `docs/archive/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` — the older premium visual/typography document, superseded by `docs/11-COMPOSITION-AND-TYPE.md`. (Path corrected 2026-08-11: this file now lives under `docs/archive/`, not `docs/`; see the doc-cleanup entry below.)

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

## `docs/17-REFERENCE-TRANSLATION-MARTEL.md` flagged as orphaned reference material (2026-08-07)

**Not part of the precedence chain.** Root `AGENTS.md`'s "Document authority" list (items 1–8,
ending at `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`) does not name this file. It has no rank and
does not override or defer to anything in the enforced chain.

**Internally broken as a reference, independent of chain ranking.** Its own header states it
depends on and defers to `02-BUILD-SPEC.md`, `03-VOICE.md`, `04-CLAIMS-GUARDRAILS.md`, and
`B01-home.md` ("locked spec wins" on conflict). None of those four files exist anywhere in this
repository — not in `docs/`, not in `docs/archive/`. Confirmed by `find` across the whole tree.

**Vocabulary mismatch with the live build.** It is written against a different token and
component system than the one actually in `src/`:
- Tokens it uses (`--ac-signal`, `--ac-radius`, `--ac-navy-deep`, `--ac-charcoal`,
  `--ac-body-gray`, `--ac-bg-light`, `--ac-shell-width`, `--ac-caution`) do not exist in
  `src/styles/tokens.css`, which uses `--ac-color-navy-900`, `--ac-text-h1`,
  `--ac-radius-small`, etc.
- Components it names (`ShortLeadForm`, `DocumentSample`, `GuaranteeGrid`, `TrustBar`,
  `ReviewStrip`, `FoundPropertyProtocol`) do not exist anywhere in `src/components/`.
- Its final brief assumes a "multi-page architecture preserved" with `/pricing/` and
  `/projects/` routes, which `AGENTS.md`'s Scope section forbids for the launch build.

**Decision: flagged, not deleted, not used.** Treat it as superseded/orphaned reference
material pointing at a spec set from a different (earlier or parallel) project iteration that was
never reconciled with this repo. Do not pull composition, token, or component guidance from it.
`docs/11-COMPOSITION-AND-TYPE.md` remains the sole authority for composition, spacing, measure,
and type scale on `/`. No file in `src/` was changed to reach this conclusion — this is a
read-only documentation flag.

Files changed: `.env.production`, `src/pages/cookie-policy.astro`.

## `docs/11-COMPOSITION-AND-TYPE.md` §6 clarifications — eyebrow scope and hairline usage (2026-08-07)

Two one-line clarifications added to `docs/11-COMPOSITION-AND-TYPE.md` §6, both scoping existing
rules rather than changing them or any visual output. No `src/` files were touched.

**§6.1 eyebrows — "seven total" scoped to eyebrows above an H2.** The rule counts only eyebrows
sitting directly above a movement H2 (Recognition, Category Contrast, Five-Stage, Property Handoff
Record, Confidence and Fit, Final Decision, FAQ — the same seven Session 3 enumerated). Verified
against current code (`grep -rn "ac-eyebrow" src/`) that `Hero.astro` carries two further
`.ac-eyebrow` elements outside that count: `hero__eyebrow` above the H1, and `hero__criteria-label`
("The handoff outcome") above the criteria list, neither sitting above an H2. Session 3's log
(above, "Detail layer (§6)") states Hero's top label "intentionally do not use `.ac-eyebrow`" —
that is no longer accurate against the current build; direct inspection confirms `hero__eyebrow`
does carry the class. The doc clarification reflects the code as it actually stands today, not the
Session 3 log's description of it, so a future session counting toward the seven-total budget
doesn't misread either the code or the stale log line.

**§6 item 3, hairline rules — sparse by design, not the default boundary device.** Added a note
that most movement-to-movement boundaries rely on the Surface column in §5 (a background change)
rather than a hairline; a hairline marks a register change within one surface, not a section close.
This documents existing intent already visible in the composition map (most adjacent movements
differ by surface/container/rhythm, not a drawn rule) — it does not change which components have
rules today.

Files changed: `docs/11-COMPOSITION-AND-TYPE.md`.

## CTA label "24-Hour" vs. business-days response commitment — conflict flagged, owner naming decision pending (2026-08-07)

**Flag only, per instruction — nothing changed.** This entry records a conflict for owner
decision; no CTA label, copy, or config file was touched to resolve it.

**The conflict.** The primary CTA and lead-offer name both promise a literal 24-hour window:
`site.offer.leadOffer` = "24-Hour Property Handoff Plan" and `site.offer.primaryCta` = "Get My
24-Hour Handoff Plan" (`src/data/site.ts`; rendered in the header, `MobileCTA`, and both
`QuickHandoffForm` instances — hero and final movement — plus `docs/00-MASTER-BRIEF.md` in
several places, e.g. lines 144–149, 309, 585, 664, 1590, 1899, 1915). This is distinct from the
CTA-label-consistency defect already logged and fixed above (Session 7, D3) — that was two
different label strings for the same action; this is the "24-Hour" wording itself against the
actual response mechanism.

The owner-confirmed response commitment is measured in business days/hours, not a rolling
24-hour clock: response commitment is "within one business day" (`PUBLIC_RESPONSE_TIME` default,
`src/data/site.ts`); business hours are Monday–Saturday, 7:00 AM–7:00 PM Pacific, closed Sunday;
and the 2026-07-29 entry above states the owner calls successful submissions within 5 minutes
during business hours, with contact in the next business window outside hours — "to prevent a
false 24/7 promise." A lead submitted Saturday evening or on Sunday has no path to a response
within a literal 24 clock-hours; the next business window is Monday morning, which can exceed 24
hours by a wide margin. No body copy on the page currently promises 24/7 turnaround — the
business-day/business-hours language is consistently used everywhere except the CTA/offer name
itself — but a button labeled "24-Hour" read literally states an hour count the guarantee behind
it cannot always honor.

**Owner naming decision pending.** Not this session's call, per instruction. Options for the
owner: keep "24-Hour" as a plan/offer name understood as distinct from response timing (with nearby
copy making that explicit), rename the offer/CTA to a business-day framing consistent with the
rest of the guarantee copy, or narrow the claim (e.g. "within 24 business hours") only if the
underlying mechanism can actually guarantee it across a Sunday closure.

No files changed for this entry.

## Session B — clinical/structured direction pass on the homepage (2026-08-07)

Owner (Matthew Ruiz) supplied `docs/aseptaclean-clinical-direction.html` as directional visual
reference for feel only — never copied as code — and five concrete moves (A–E) to shift the
homepage from calm editorial toward "premium operational editorial": bright, bordered,
document-led. `docs/17-REFERENCE-TRANSLATION-MARTEL.md` was not consulted, per its orphaned status
logged above.

**Budget accounting, checked before building anything.** `docs/11-COMPOSITION-AND-TYPE.md` caps
Newsreader at exactly 9 uses (1 H1 + 1 display + 7 H2s) and eyebrows at 7 — both were already full.
None of the new structure below adds an 8th H2 or an 8th eyebrow; the two new bands use
`.ac-type-h3` (Instrument Sans) headlines and no eyebrow. Verified against the rendered DOM after
the build (not just source grep): `{h1:1, h2:7, display:1, totalNewsreader:9, eyebrows:8}` — the
eyebrow count is the 7 movement eyebrows plus Hero's own top eyebrow, unchanged from before this
session.

**A — status ribbon.** New `StatusRibbon.astro`, mounted in `BaseLayout.astro` above `<Header />`,
non-sticky (scrolls away; only the header stays sticky, matching the reference). Mono/uppercase,
`--ac-color-navy-950` background. Content: insurance line (suppressed when
`site.business.insuranceStatus` is empty, per the existing suppression rule in
`docs/02-OWNER-INPUTS.md`), "Owner-operated assessments," "Written scope before any work begins,"
`site.location.serviceArea`. Horizontal-scrolls on narrow viewports rather than wrapping.

**B — sitewide containment.** Implemented as: the two new bands below (bordered modules), Hero's
aside rebuilt into a bordered panel with a real header row ("Handoff Status" + a "Sample" tag), and
the scope-of-work strip's bordered 3-column grid. `--ac-radius-*` was not loosened — new bordered
elements use 0/sharp corners, no gradients (none exist anywhere else in this codebase). Did not
touch `Qualification.astro`'s existing ledger, which already carries hairline-divided rows from
Session 3/4.

**C — compact Handoff Status panel in the hero.** `Hero.astro`'s `.hero__criteria` aside was
rebuilt from a bare eyebrow + list into a bordered panel with a navy header row ("Handoff Status" +
a "Sample" tag) and five rows, each with a neutral bordered status tag (Defined / Held for review /
Complete / Complete / Issued) sourced from a new `status` field added to
`homepage.handoffStages[]` in `src/data/site.ts`. Reuses `HandoffRecord.astro`'s established
no-color-on-status-tags convention (border + text only) so it doesn't collide with the site's
existing red/green semantic use. `HandoffStandard.astro` (movement 5, same source array) ignores
the new field and is unaffected.

**D — founder/operator block moved to the first half.** New `OperatorAccountability.astro`,
mounted after `Qualification` (Recognition) and before `OutcomeComparison`. Moved — not
duplicated — the founder blockquote, credentials ledger, and disclaimer (verbatim) out of
`ConfidenceAndFit.astro`'s movement-7 founder sub-block, including the `id="about"` anchor the
header nav already links to (verified: `document.getElementById("about")` resolves and scrolls
into view). Founder portrait is a plain bordered placeholder box labeled "Founder portrait —
pending" — no stock or AI-generated image, per the explicit instruction and
`docs/02-OWNER-INPUTS.md`.

Consequence for `ConfidenceAndFit.astro` / `docs/11-COMPOSITION-AND-TYPE.md` §5 row 7: with the
founder block gone, the movement drops from three internal blocks to two (assurance ledger +
pricing). Pricing is now a standalone block capped at `max-width: 28rem` on its own row below the
ledger, not paired into a two-column strip (there is nothing left to pair it with). This avoids
reintroducing the Session 8 dead-space defect (audit item 12) — a lone block forced into a
same-row column with the 3x-longer ledger would reproduce the identical bug. Table and prose
updated in `docs/11-COMPOSITION-AND-TYPE.md` §5/§5.1; dead CSS for the removed founder markup
(`.confidence__block--founder blockquote`, `.founder__record`, `.confidence__insurance`) deleted,
confirmed zero remaining references (`grep -c confidence__block--founder dist/index.html` → `0`).

**E — scope-of-work strip.** New `ScopeOfWork.astro`, mounted directly after `<Hero />`. Bordered
3-column strip (desktop) / stacked (mobile), fed by a new `homepage.scopeOfWork` array in
`src/data/site.ts`: (1) complex property clearing, (2) reset & restoration cleaning, (3)
environmental remediation, tagged "coming."

**Compliance flag — organic pathogen endorsement (owner-supplied fact, not verified against COI
yet).** Item 2's copy states animal-waste/heavy-organic-condition cleaning is covered "under our
organic pathogen endorsement," in the owner's exact constrained wording (cleaning only — no
"disease," "decontamination," "sanitization," or "sterilization"; those four words are explicitly
named as excluded and were grepped for zero hits in the final copy). This is a new public operating
claim, narrower than and distinct from TSWMP (which stays pending/unverified for human
biohazard/trauma-scene work — unchanged by this session). Added to `docs/02-OWNER-INPUTS.md`
"Approved for the current build" as an owner-confirmed fact (2026-08-07), and to "Must be confirmed
before production release" for a match against the actual COI/policy documents before launch. Also
added as one line to `homepage.includedScope` (rendered in `ConfidenceAndFit.astro`) so the claim
is consistent everywhere the site already lists included work, not only in the new strip.

**Remediation "coming" tag — no fabricated date.** No launch month is confirmed. Rather than invent
one (`docs/01-QUALITY-GUARDRAILS.md` §15.4, "no fake project dates presented as real"),
`site.offer.remediationLaunchLabel` is a new config value defaulting to "Coming soon · pending
certification," overridable via `PUBLIC_REMEDIATION_LAUNCH_LABEL` once a real date is confirmed.
Logged in `docs/02-OWNER-INPUTS.md`.

**Verification.** `astro check`: 0 errors, 53 files (2 type errors surfaced and fixed first — the
`scopeOfWork` array needed an explicit `coming: false` on the non-"coming" items so TypeScript's
`as const` literal-union inference didn't reject `item.coming` on the other branches).
`npm run build`: 9 routes, clean. Rendered-DOM checks against the production preview
(`astro preview` + `playwright-core`/Chrome, not `astro dev`): Newsreader/eyebrow budget exact as
above; `#about` resolves and scrolls into view; no horizontal overflow at 390px; hero fold at
390×800 — the trust line (`hero__trust`) bottom edge sits at 670px, inside the first viewport,
matching Session 4's own "first proof discoverable without a full-screen scroll" standard (the
ribbon's added ~36px did not push it out). Screenshots reviewed directly (not just computed
positions) at 390 and 1440px: full homepage, hero fold, the Handoff Status panel, the scope-of-work
strip, and the operator band — all render as intended, sharp corners, no overlap, no dead space.
Zero new JavaScript shipped (all three new components and Hero's rebuilt aside are static
markup/CSS) and no new font or image requests, so the stated JS/performance budget is unaffected by
construction; a live Lighthouse pass in CI/staging is still recommended per `AGENTS.md`'s
"Definition of done" and was not run in this environment.

**§9 failure-audit re-run** (rendered production preview, 390/1440px):

| # | Check | Result |
| --- | --- | --- |
| 1 | Two adjacent sections share container width *and* vertical padding | PASS — the two new bands use `tight`/`open` rhythm, distinct from the `wide`-container movements they sit beside |
| 2 | Font-size declared on a heading tag | PASS — new bands' `<h3>` carries `.ac-type-h3`, no bare tag sizing |
| 3 | H1:body ratio | PASS — unchanged, no hero type values touched |
| 4 | Newsreader appears more than nine times | PASS — exactly 9, confirmed above |
| 5 | Three consecutive text elements within 15% on size/weight/color | PASS on review |
| 6 | More than one dramatic moment | PASS — Property Handoff Record (movement 6) remains the sole dramatic moment; the two new bands are deliberately quiet document-style panels, not competing moments |
| 7 | Three or more icon+title+paragraph sections | PASS — no icons introduced |
| 8 | More than six hairline rules | PASS on review |
| 9 | More than two deep-dark sections consecutively | PASS — ribbon (navy-950) is directly followed by the light header/hero, not another dark section |
| 10 | Logo-swap test | Not re-run in full this session (copy/imagery scope unchanged); composition changes strengthen rather than weaken the prior PASS |

Files changed: `src/components/StatusRibbon.astro` (new), `src/components/ScopeOfWork.astro`
(new), `src/components/OperatorAccountability.astro` (new), `src/components/Hero.astro`,
`src/components/ConfidenceAndFit.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`,
`src/data/site.ts`, `src/styles/tokens.css`, `docs/11-COMPOSITION-AND-TYPE.md`,
`docs/02-OWNER-INPUTS.md`, `.env.example`.

## `docs/18-VISUAL-DIRECTION.md` lands — precedence, supersession, and Phase 1 (2026-08-08)

**Owner-directed** (Matthew Ruiz), dated 2026-08-08 — one day after Session B above. Supplies a
new binding visual direction ("contractor-professional": photo-forward, card-structured,
serif-headlined, warm-accented), reached after the owner selected the same reference twice, a
month apart. This is `docs/18-VISUAL-DIRECTION.md`'s own Phase 1
("this document lands in the repo, `AGENTS.md` precedence updated, the superseded sections of
`11-COMPOSITION-AND-TYPE.md` struck with a pointer here, direction change logged here").

**Precedence.** `AGENTS.md`'s "Document authority" chain now reads: 1. current
law/facts/owner-decisions, 2. `01-QUALITY-GUARDRAILS.md`, 3.
`10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`, **4. `18-VISUAL-DIRECTION.md` (new)**, 5.
`06-APPROVED-HOMEPAGE-COPY.md`, 6. `07-ONE-PAGE-DIRECTIVE.md`, 7. `11-COMPOSITION-AND-TYPE.md`, 8.
`02-OWNER-INPUTS.md`, 9. `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` (each item after 4 shifted down
one). `18` now outranks the copy and scope directives but stays below quality guardrails and the
Phase 4 canonical spec, matching `18`'s own header ("Sits directly below
`01-QUALITY-GUARDRAILS.md`").

**`11-COMPOSITION-AND-TYPE.md` strikes.** Five items named in `18`'s preamble struck in place with
pointers back to `18`, per its own instruction ("Leave the retained sections intact"):
- §2 serif budget ("Newsreader appears in exactly nine places") — struck. `18` §2 replaces it:
  serif is no longer a spent budget and now applies to every H1–H3, which also moves H3's face
  from Instrument Sans to serif (a change beyond the budget sentence alone, but stated directly in
  `18` §2's own body text and type table, so treated as part of this supersession).
- §6 eyebrow cap of seven — struck. No eyebrow-count limit applies going forward.
- §6 The Mark, three-appearance cap — struck. The Mark remains the site's one decorative
  typographic device; no numeric cap on it.
- §9 failure-audit items (icon+title+paragraph ban, Newsreader count check, hairline cap) — all
  three struck. Icon+title+paragraph is now an expected card structure per `18` §3.
- "The 2px sharp-corner rule wherever it appears" — **investigated, not struck: no such rule
  exists in `11`'s text.** Grepped the file for "2px," "sharp," "corner," and "radius" — zero
  hits. The only `--ac-radius: 2px` value anywhere in the repo's docs lives in the orphaned,
  out-of-chain `docs/17-REFERENCE-TRANSLATION-MARTEL.md` (flagged non-authoritative above,
  2026-08-07). Current code uses sharp/0-radius borders by convention (Session B) with no codified
  numeric rule in `11` or `tokens.css` to override. Noted in `11`'s new preamble block rather than
  silently invented text to strike. `18` §3's `--ac-radius-card: 12px` is the live rule for card
  containers going forward (added to `tokens.css` in the Phase 2 build below).

Retained per `18`'s explicit list, unchanged: §1 (headings styled by role, never by tag; the
H1-to-body ratio floor), §3 (measure variation), §4 (rhythm ratios), §7 (spend boldness once —
the Handoff Record stays the one dramatic moment), §10.2/§10.4/§10.5 (document artifact,
interaction, and responsive art-direction rules).

**Scope note on `18` §6's "Section map — binding."** `18`'s preamble lists five specific items it
supersedes in `11`; it does not name `11` §5 (the 8-movement composition map) as superseded. But
`18` §6 itself is titled "binding" and lists a materially different section list (credential bar,
service cards, "Why Aseptaclean," an accent band, and areas-we-served all appear there and nowhere
in `11` §5). Read literally, the two section maps conflict beyond what the preamble's supersession
list accounts for. Resolved by the owner's own instruction to "build to 18 §6" (this session,
below): `18` §6 governs the sections it names and their order/imagery; existing content sections
`18` does not name (Recognition/`Qualification.astro`, Category Contrast, "What finished feels
like"/`OutcomeComparison.astro`, Confidence and Fit) were **not** deleted, since `18` never
instructs their removal and they carry owner-approved copy from `06-APPROVED-HOMEPAGE-COPY.md`
that `18` doesn't address. They were kept and placed at the points in the new order where they
functionally belong. Flagging this rather than silently resolving it: if the owner intended `18`
§6 as an exhaustive replacement of the whole page (i.e., those four sections should come out), that
is a separate decision this session did not make.

No `src/` files changed in this half of the session — Phase 1 is documentation only, per `18` §10.
The Phase 2 build (§6) is logged separately below.

## `docs/18-VISUAL-DIRECTION.md` Phase 2 — build to §6, labelled placeholders (2026-08-08)

Owner shoot (§5.1) has not happened, so every image slot below ships as a labelled bordered
placeholder (steel-100 surface, mono caption naming the slot and its `18` §5 classification),
per `18` §10 Phase 2. Logged in full in the new "Pending image slots" table in
`06-ASSET-MANIFEST.md`.

**Design-system foundation.** `tokens.css`: added `--ac-radius-card: 12px`, `--ac-radius-chip:
8px`, `--ac-shadow-card`, `--ac-color-accent-tint`, `--ac-color-accent-text` (§3/§4).
`global.css`: `.ac-type-h3` moved from Instrument Sans to the display serif at 560 weight (§2 —
serif now spans H1–H3); `.button` (used sitewide — header, `MobileCTA`, both `QuickHandoffForm`
instances, `request-assessment`) recoloured from navy to the accent Slate Blue with dark-navy text
rather than white, because white-on-`#6A9BC3` measures ~3:1 (checked via WCAG relative-luminance
math), short of the 4.5:1 body-text minimum; navy-on-accent measures ~5:1 and passes. Hover state
inverts to solid navy/white rather than darkening the accent further — darkening it moves dark
text to ~3.4:1, still short. Added shared `.ac-icon-chip`, `.ac-credential-chip`, and `.ac-card`/
`.ac-card__image`/`.ac-card__body` utility classes for the new card-based sections.

**Hero (`18` §6 row 1).** Added a labelled `[ATMOS]` image placeholder ("South Bay residential
exterior — pending, dark overlay planned") inside the existing status aside — appended after the
Handoff Status panel's position in the DOM rather than replacing the section background, so the
mobile above-the-fold trust-line position verified in Session 4/B is untouched. Added the
three-item credential chip (`Insured · Organic Pathogen Endorsed · Owner-Operated`, §7 exact
wording) below the eyebrow. **Not done:** converting the hero to a literal full-bleed photo
background with dark overlay and two CTAs replacing the inline form — `18` doesn't instruct
removing the 3-field form (`docs/07-ONE-PAGE-DIRECTIVE.md` §7's "appears twice: hero and final
movement," still in force), and faking a dark-overlay effect over a blank placeholder would look
broken rather than "labelled." The image slot is real and placed; the background treatment waits
for Phase 0.

**Credential bar (row 2, `StatusRibbon.astro`).** Content replaced with `18` §7's exact four
items: `Insured · Organic Pathogen Endorsed · Owner-Operated · Santa Clara County`. Added
`site.location.county` (env `PUBLIC_SERVICE_COUNTY`, default `"Santa Clara County"`) rather than
reusing `serviceArea` (a different-grain fact already in use elsewhere). Position (above header,
non-sticky) left unchanged from Session B — `18` doesn't discuss ribbon-vs-header ordering, and
moving it into the in-page flow was judged disproportionate to fix an ordering technicality with
no stated visual requirement behind it.

**Service cards (row 3, new `ServiceCards.astro`, replaces `ScopeOfWork.astro`).** Three-card
launch set per `18` §6.1, each following the §3 card anatomy (image → icon chip → title → body,
12px radius, soft shadow, white on warm-white). **Claims fix, not just a relabel:** the prior
third item was "Environmental remediation... coming soon" (Session B). `18` §7 states remediation
"does not appear on the live site at all... not even a 'coming soon' tag until the credential is
held" — stricter than Session B's own claims read at the time. Replaced with `18`'s actual third
card, "Animal & organic condition cleaning," carrying §7's mandatory limiting clause verbatim
("This is cleaning only — not a decontamination, sterilization, or health-safety determination").
`site.offer.remediationLaunchLabel` and its env var removed (dead once the card was cut); grepped
first to confirm no other call sites. `docs/02-OWNER-INPUTS.md` updated to match. Image
classifications: card 1 (process kit flat-lay) and card 3 (completed job photo) are `[OWNED]`
only; card 2 (kitchen/bath detail) is `[ATMOS]` permitted. Card 3 specifically is `[OWNED]`-only
rather than atmosphere-permitted because it would otherwise read as proof of a specific service
performed (§5's "does this image imply Aseptaclean performed this work?" test) — its placeholder
caption states "ships only when owner-shot" so a future session can't casually drop stock art in.

**Why Aseptaclean (row 4, new `WhyAseptaclean.astro`).** Four-item icon grid, no image. Content
restates four claims already approved and rendered elsewhere on the page (hero trust line,
`homepage.assurance`) rather than introducing new claims — kept claims risk at zero for a section
this session invented the framing for.

**Accent band (row 5, new `AccentBand.astro`).** The one full-width accent band `18` §4 allows.
Exact copy from `18` §6 ("Working against a listing, transfer, or family deadline?" + call CTA).
Uses `--ac-rhythm-band` — a token `11-COMPOSITION-AND-TYPE.md` §4 defined specifically for
full-bleed bands but that no component had used until now (confirmed by grep). One-sided
padding-top per the sitewide rhythm-cascade convention (Session 3), with a small
`--ac-space-6` internal bottom pad (not a rhythm token) so text doesn't sit flush against the
band's lower edge — does not violate the "never sum two rhythm paddings" convention since it's a
component-internal space token, not a second rhythm contribution.

**Five-stage standard (row 6, `HandoffStandard.astro`).** Added a labelled `[OWNED]` placeholder
("Hands + clipboard at a threshold — pending") between the header and the stage rail.

**Property Handoff Record (row 7).** Unchanged, per `18`'s own instruction.

**Areas we serve (row 8, new `AreasWeServe.astro`).** Pill list of the existing
`site.location.cities` set, no image, per row 8.

**Founder/operator (row 9) — repositioned, not rebuilt.** `OperatorAccountability.astro` already
carried the `[OWNED]` portrait placeholder from Session B; only its position changed. Session B
had deliberately moved this block early (right after Recognition) as one of its five structural
moves. `18` §6's binding order puts Founder/operator at position 9 — after the Handoff Record,
before FAQ. Since `18` is a newer (2026-08-08 vs. 2026-08-07), explicitly "binding" owner
document, and the task instruction was to build to `18` §6, the block was moved back to row 9's
position (now between the new Areas We Serve section and `ConfidenceAndFit`), reversing Session
B's move D. Flagging the reversal here rather than silently overwriting Session B's own rationale.

**Section order and the scope question (`index.astro`).** Final mount order: `Hero,
ServiceCards, WhyAseptaclean, Qualification, AccentBand, OutcomeComparison, CategoryContrast,
HandoffStandard, HandoffRecord, AreasWeServe, OperatorAccountability, ConfidenceAndFit, FAQ,
FinalCTA` (Footer via `BaseLayout`). `Qualification` (Recognition), `OutcomeComparison` ("what
finished feels like"), `CategoryContrast`, and `ConfidenceAndFit` are not named anywhere in `18`
§6's table; per the scope note logged above, they were kept (not deleted) and placed at the points
in the new sequence where they read naturally, since `18` never instructs their removal and they
carry approved copy from `06-APPROVED-HOMEPAGE-COPY.md`. **FAQ now precedes Final CTA** (`18` rows
10–11), the reverse of the previous order (and of `11` §5's "FAQ continues from 8" note) — `18`'s
explicit row numbering was followed; verified in the build output that `id="faq"` precedes
`class="final-cta"` precedes `class="site-footer"` in document order.

**Icons.** No icon library added (`AGENTS.md` bars UI kits without approval). Hand-authored
minimal inline SVG line icons (box, sparkle-burst, leaf for the three service cards; shield-check,
document, check-circle, camera for Why Aseptaclean) — zero new dependencies, zero new network
requests.

**Verification.** `astro check`: 0 errors, 54 files. `npm run build` (full production mode): 9
routes, clean; zero `$NaN` in output (confirmed by grep). Screenshots and DOM-level checks
captured against `astro preview` (production build) via Playwright/system Chrome at 390×900 and
1440×1000, saved to `artifacts/phase-4/visual-direction/`. One capture-tooling note for a future
session: a `fullPage: true` screenshot at 390px produced a visibly glitched/duplicated-looking
image — the real cause is the page's actual scroll height (24,331px at 390px, 18,973px at 1440px)
exceeding Chrome's known texture-size ceiling for single-shot full-page capture, not a real content
duplication (confirmed via `grep -c` on the built HTML — every id/heading occurs exactly once).
Same class of false positive Session 6 already logged for a different capture method; resolved
here by using clipped viewport/element screenshots instead. The genuine page height (~24k px on
mobile) is long for a single-page site but is a consequence of the section count `18` §6 asks for,
not a defect this session introduced without cause.

### `18` §9 failure audit — run against the production preview, 390×900 and 1440×1000

| # | Check | Result |
| --- | --- | --- |
| 1 | `font-size` declared on a heading tag anywhere in the codebase | PASS — zero; `global.css`'s heading-purity rule (§1, retained) is unchanged, only role-class values were edited |
| 2 | H1-to-body ratio below 2.5:1 at 390px or 4:1 at 1440px | PASS — 2.61:1 at 390px, 4.22:1 at 1440px (measured via computed styles) |
| 3 | Two adjacent sections share container width *and* vertical padding | PASS — every adjacent pair with a matching container (`wide`/`wide` occurs at Service Cards→Why Aseptaclean, Category Contrast→Five-Stage, Five-Stage→Handoff Record, Operator→Confidence) differs in computed `padding-top`, so none match on both axes. **Caveat:** `11-COMPOSITION-AND-TYPE.md` §3's stricter retained prose rule ("no two consecutive movements share a container," width alone) is violated by those same four pairs — a pre-existing tension (Hero/`ScopeOfWork` were already both `wide` and adjacent before this session) that this build made more frequent by inserting new `wide` sections next to existing ones. Not silently resolved: flagging it as a known gap between the audit checklist (passes) and `11` §3's prose (doesn't), since fully eliminating it would mean denying several new sections the width their content (card grids, the stage rail) actually needs |
| 4 | More than one dramatic moment | PASS — the Property Handoff Record remains the only one; none of the new sections (cards, icon grid, accent band, pills) compete for drama by design (flat, restrained, document-style per `18` §3's card treatment) |
| 5 | More than one accent band | PASS — exactly one (`AccentBand.astro`), confirmed programmatically (one section matches the accent background colour) |
| 6 | Any image in an `[OWNED]` slot that is not owner-shot | PASS — every `[OWNED]` slot (hero, service card 1, service card 3, five-stage, founder) is an unstyled labelled placeholder, not a substitute photo of any kind |
| 7 | Any atmosphere image captioned as, or placed inside, a completed-job claim | PASS — no atmosphere images exist yet (all six image slots are placeholders); the `[ATMOS]`-labelled slots (hero, service card 2) carry no completed-job language |
| 8 | Any image absent from `06-ASSET-MANIFEST.md` | PASS — all six pending slots logged in the manifest's new table with required classification |
| 9 | Credential chip or bar contains "licensed," a job count, or a years figure | PASS — chip text is exactly "Insured · Organic Pathogen Endorsed · Owner-Operated," bar is exactly "Insured · Organic Pathogen Endorsed · Owner-Operated · Santa Clara County" (checked via `textContent`, not visual review) |
| 10 | Copy uses remediation, biohazard, decontamination, sanitize, or sterilize | **Reviewed individually, not a mechanical grep-PASS.** All five root words appear on the page (grepped the built HTML), every occurrence in a negation/exclusion clause required by `01-QUALITY-GUARDRAILS.md` and `18` §7 itself (e.g. "not a licensed general contractor, remediation contractor..."; "Sewage or active mold remediation" in the exclusion list; "not a decontamination, sterilization, or health-safety determination" — `18` §7's own mandated clause for the animal/organic card). Zero occurrences market or claim any of these services. Read literally, this checklist item would flag the exact sentence `18` §7 requires — treated as an internal inconsistency in `18` between §7 (mandates the negation) and the literal §9 checklist wording, resolved in favor of the substantive rule (§7: don't claim it; negating it is required) |
| 11 | Cover the logo — generic cleaning company, SaaS product, or junk hauler? | PASS with a caveat — the credential chip/bar, Property Handoff Record, Five-Stage rail, and founder's biochemistry/pathology background are specific and not swappable to a generic competitor. The caveat: every image slot is currently a grey placeholder, and placeholder-grey boxes are themselves a generic-template signal until Phase 0 photography lands — expected and disclosed, not a hidden gap |

Files changed: `src/components/AccentBand.astro` (new), `src/components/AreasWeServe.astro`
(new), `src/components/ServiceCards.astro` (new, replaces deleted `ScopeOfWork.astro`),
`src/components/WhyAseptaclean.astro` (new), `src/components/Hero.astro`,
`src/components/HandoffStandard.astro`, `src/components/StatusRibbon.astro`,
`src/styles/tokens.css`, `src/styles/global.css`, `src/data/site.ts`, `src/pages/index.astro`,
`docs/06-ASSET-MANIFEST.md`, `docs/02-OWNER-INPUTS.md`, `.env.example`.

## `18` §2/§3/§4 foundation build-out (2026-08-08)

Tokens (`--ac-radius-card`, `--ac-shadow-card`), the accent promotion (buttons, header CTA, icon
chips, credential chip, one `AccentBand`), and serif H1–H3/sans lead-body-sm-xs typography were
already in place from the prior session's work. Two gaps closed this session:

- `.ac-card__body` padding was `--ac-space-6` (32px), outside `18` §3's 24–28px range. Changed to
  `--ac-space-5` (24px).
- No reusable Card component existed — `ServiceCards.astro` inlined the `.ac-card` markup
  directly. Extracted `src/components/Card.astro` (image slot, icon chip, serif h3, sans body via
  a default `<slot />>`) and refactored `ServiceCards.astro` to consume it.

**§9 ratio check re-verified** against the rebuilt page (Chromium, computed styles, real
`<h1>`/`.ac-type-body` elements, not hand math):

| Viewport | H1 | body | Ratio | Floor | Result |
| --- | --- | --- | --- | --- | --- |
| 390px | 44.4px | 17px | 2.612:1 | ≥2.5:1 | PASS |
| 1440px | 76px | 18px | 4.222:1 | ≥4:1 | PASS |

Matches the ratio already recorded in the Session 2 §9 audit table above (2.61:1 / 4.22:1) — the
Card/padding changes this session did not touch H1 or body type scale, so the ratio was expected
to hold, not re-derived from scratch.

`astro check` (0 errors) and `astro build` (9 pages) both pass after the change.

Files changed: `src/components/Card.astro` (new), `src/components/ServiceCards.astro`,
`src/styles/global.css`.

## `18` §9 failure audit re-run — current working tree (2026-08-08)

Re-run at owner request against the full current uncommitted state on `phase-4-session-1`
(everything in `git status`, not just the prior session's diff), superseding the "Phase 2"
audit table above, which was run against an earlier point in this same branch. Production
build (`npm run build` + `astro preview`), Playwright/Chromium, screenshots at exactly 390×900
and 1440×1000. `fullPage: true` capture reproduced the previously-logged Chrome texture-ceiling
corruption at this page's height (~24,255px at 390px, ~18,957px at 1440px) — confirmed corrupted
by direct inspection, discarded, and replaced with scroll-and-stitch capture. Clean stitched
screenshots saved to `artifacts/phase-4/visual-direction-audit/390.png` and `1440.png`
(directory is gitignored, not committed).

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | `font-size` declared on a heading tag anywhere in the codebase | PASS | Every `<style>` block in every `.astro` file and every `.css` file scanned for `h1`–`h6` selectors; zero declare `font-size`. Global rule (`global.css`) sets only `margin`/`color` on bare heading tags. All sizing comes from `.ac-type-h1/h2/h3` role classes, confirmed component-by-component (Hero, ServiceCards, ConfidenceAndFit, CategoryContrast, WhyAseptaclean, FinalCTA, Qualification, FAQ, AreasWeServe, HandoffStandard, thank-you, private-residence-reset) |
| 2 | H1-to-body ratio below 2.5:1 at 390px or 4:1 at 1440px | PASS | Computed styles on the live `<h1>` and hero `.ac-type-body`: 390px = 44.4px / 17px = **2.612:1**; 1440px = 76px / 18px = **4.222:1**. Unchanged from the prior audit — this round's edits didn't touch type-scale tokens |
| 3 | Two adjacent sections share container width *and* vertical padding | PASS | 14 top-level sections compared in DOM order by computed container width + `padding-top` at 1440px. Several adjacent pairs share width only (Hero/Service Cards, Service Cards/Why Aseptaclean, Category Contrast/Five-Stage, Five-Stage/Handoff Record, Operator band/Confidence) but each pair differs in `padding-top`, so none match on both axes |
| 4 | Three consecutive text elements within 15% on size, weight, and colour | PASS | Sampled 5 heading→h3→body/eyebrow runs via computed styles (e.g., Why Aseptaclean: H2 53.6px/520/navy → H3 29.28px/560/navy → eyebrow 13.8px/700/steel-blue) — size drops 45–75% at every step and colour changes by the third element in every run |
| 5 | More than one dramatic moment competing with the Handoff Record | PASS | Visual review of both stitched screenshots — the Property Handoff Record is the only section styled as a distinct document artifact (largest single-column padding on the page). Category Contrast (dark navy) and "What finished feels like" are bold but flat/typographic, not document-styled, consistent with `18` §3 giving every other section the plain card treatment |
| 6 | More than one accent band | PASS | Programmatic scan for elements with `background-color: rgb(106,155,195)` (Slate Blue `#6A9BC3`): exactly one full-width match (`AccentBand.astro`'s `.accent-band` section). All other matches were buttons/CTAs, which §4 explicitly permits |
| 7 | Any image in an `[OWNED]` slot that is not owner-shot | PASS | All four `[OWNED]` slots (Service card 1 — process-kit flat-lay; Service card 3 — completed job photo; Five-stage — hands + clipboard; Founder portrait) render as unstyled labelled placeholders, no `<img>`. Only two real `<img>` elements exist site-wide: the two wordmark brand assets |
| 8 | Any atmosphere image captioned as, or placed inside, a completed-job claim | PASS (moot) | Zero photographs exist yet — every image slot, including the `[ATMOS]`-labelled ones (Hero, Service card 2), is a text-labelled placeholder |
| 9 | Any image absent from `06-ASSET-MANIFEST.md` | PASS | Every `<img>` and every placeholder caption in the built output (Hero, ServiceCards ×3 via `Card.astro`, HandoffStandard, OperatorAccountability, both wordmark files) is logged in the manifest's main table or its "Pending image slots" table |
| 10 | Credential chip or bar contains "licensed," a job count, or a years figure | PASS, wording defect found separately (below) | Raw HTML: Hero chip = "Insured / Organic Pathogen Endorsed / Owner-Operated"; StatusRibbon bar = "Insured / Organic Pathogen Endorsed / Owner-Operated / Santa Clara County." Neither contains "licensed," a job count, or a years-in-business figure |
| 11 | Copy uses remediation, biohazard, decontamination, sanitize, or sterilize | PASS, reviewed individually | 7 hits in built `dist/index.html` across `remediation`/`decontaminat*`/`steriliz*`/`biohazard`; zero for `sanitiz*`. Every hit is a negation or exclusion clause required by `18` §7 or `01-QUALITY-GUARDRAILS.md` (e.g., the stop/notify/refer exclusion list; the animal/organic card's mandatory limiting clause; "not a licensed general contractor, remediation contractor…"; the founder's authority-limit disclaimer). Zero occurrences market or claim any of these services |
| 12 | Cover the logo — generic cleaning company, SaaS product, or junk hauler? | PASS, with a disclosed caveat | Non-generic anchors: the Property Handoff Record (bespoke sample-labeled operating document), the Five-Stage rail's named "RECORD:" fields, the founder's disclosed biochemistry/pharma-manufacturing background with an explicit authority-limit disclaimer, and the specific stop/notify/refer exclusion list. Caveat, unchanged from the prior audit: every image slot is still a grey/steel placeholder box, which reads as generically templated until Phase 0 photography lands — a known, disclosed gap, not a new defect |

**Failure found and fixed this session — credential bar missing its required separator.**
`StatusRibbon.astro` (the four-item credential bar) rendered "Insured," "Organic Pathogen
Endorsed," "Owner-Operated," and the county as four flex-gapped `<span>`s with **no `·`
character between them** — confirmed in raw `dist/index.html` and in zoomed screenshot crops.
This fails `18` §7's verbatim requirement ("Insured · Organic Pathogen Endorsed ·
Owner-Operated · Santa Clara County") even though it passes §9 checklist item 10 literally
(no "licensed," no job count, no years figure — the checklist doesn't test for the separator).
The Hero's own three-item credential chip (`.ac-credential-chip`) already had a
`span:not(:last-child)::after { content: "·" }` rule; the ribbon had no equivalent. This is
likely why it went unnoticed in the prior audit: a `textContent`-equality check can't
distinguish "has a CSS-generated separator" from "doesn't," since `::after` content doesn't
appear in `textContent`. **Fixed:** added the matching `.status-ribbon span:not(:last-child)::after`
rule to `src/components/StatusRibbon.astro`. Re-verified via `astro check` (0 errors, 55 files)
after the fix.

No other failures found. Files touched by this audit: `src/components/StatusRibbon.astro`
(middot fix only — no other source files modified by the audit itself).

## `docs/aseptaclean-FINAL-v2.html` becomes the binding homepage implementation target (2026-08-08)

Owner directive: `docs/aseptaclean-FINAL-v2.html` is not directional reference — it is the
implementation target for `/`, ported verbatim (markup, CSS custom properties, section-by-section
structure). Where it conflicts with `docs/11-COMPOSITION-AND-TYPE.md` or
`docs/18-VISUAL-DIRECTION.md`, the HTML file wins. This is a narrower, later-dated override of
`AGENTS.md`'s existing precedence chain for `/` specifically — `11` and `18` remain otherwise
active (they still govern anything the HTML file doesn't specify, and any future page besides `/`).
Per owner confirmation this session, the override extends to **copy and structure**, not only
visual system: `docs/06-APPROVED-HOMEPAGE-COPY.md`'s Hero H1/lead/CTA wording, trust line, "Why
Aseptaclean" item copy, founder-section copy/structure (the blockquote is dropped), and FAQ
question set are all superseded by the HTML file's verbatim text for `/`. `06-APPROVED-HOMEPAGE-COPY.md`
should be updated to match in a follow-up pass; until then, treat this log entry and the live
component source as authoritative over that doc for the sections named above.

Per owner confirmation, `01-QUALITY-GUARDRAILS.md`'s anti-AI blacklist (§5) is also treated as
overridden for `/` where the HTML file's patterns conflict with it (e.g., the radial-gradient hero
background, three equal service cards under a credential strip, icon-chip-above-title repeated
across the "Why" grid, pill-shaped labels, uniform card shadow/radius). `01`'s claims guardrails
(licensed/remediation/biohazard wording, no fabricated proof, no aggregateRating) remain fully
in force — nothing in the HTML file required violating them, and none were violated (verified
against the built output; see below).

**Token system:** `src/styles/tokens.css` keeps its existing `--ac-` prefix and role names
(`--ac-color-navy-900`, `--ac-text-h1`, etc.) rather than adopting the HTML file's literal
`--navy-950` / `--s1..--s7` names, so the ~15 existing component files did not all need a
find-and-replace rename pass. Every `--ac-` token's *value* was replaced with the HTML file's
value (navy-950/900/800/700, blue/blue-deep/blue-pale/blue-ghost, gold, clear/review status
colors, the 8/16/24/32/48/64/96px spacing scale exposed as both `--ac-s1..--ac-s7` and the
existing `--ac-space-*` aliases, `--ac-r`/`--ac-r-sm` radii, `--ac-shadow-card`/`--ac-shadow-pop`).
Legacy `--ac-steel-*` / `--ac-color-focus` tokens some older components still reference were kept
as aliases mapped onto the closest new value so nothing resolves to an undefined custom property.

**Fonts:** self-hosted via `@fontsource-variable/inter` and `@fontsource/ibm-plex-mono` (added to
`package.json`), following the project's existing self-hosting pattern rather than the HTML file's
Google Fonts `<link>` tags. `Newsreader Variable` and the new `Inter Variable` / `IBM Plex Mono`
`@font-face` rules live in `src/styles/fonts.css` with `font-display: swap` and a `size-adjust`
fallback metric on the two variable faces; `BaseLayout.astro` preloads the three woff2 files
(Newsreader, Inter, IBM Plex Mono 400).

**Composition:** the HTML file's section list (ribbon, header, hero, credential bar, service
cards, why grid, accent band, five-stage standard, Property Handoff Record, pricing, founder,
FAQ, request form, final CTA, footer, sticky mobile bar) replaces the prior homepage section map.
Five existing sections not present in the HTML file — `Qualification.astro` ("Recognition"),
`OutcomeComparison.astro` ("What finished feels like"), `CategoryContrast.astro`, `ConfidenceAndFit.astro`,
and `AreasWeServe.astro` — were removed from `src/pages/index.astro`'s render order (component
files left in place; `src/pages/dev/type-compare.astro` still imports some of them for type
comparison and was not touched). New components added: `CredentialBar.astro`, `Pricing.astro`,
`RequestForm.astro`. `Card.astro`/`ServiceCards.astro` rebuilt around the HTML file's gradient-slot
treatment (v1/v2/v3 linear gradients standing in for photography, per `18` §5/§10's placeholder
policy, retained) rather than the bordered-placeholder-box treatment used previously.

**Form wiring — presentation-only port, confirmed with owner intent:** the HTML file's `#request`
form markup (plain `<input>`/`<textarea>`/`<button>`, no live endpoint) was not copied verbatim.
`RequestForm.astro` and `Hero.astro` both render the existing `QuickHandoffForm.astro` component
inside the HTML file's layout/styling, preserving the working lead endpoint, Turnstile, honeypot,
and consent-checkbox wiring per `docs/07-ONE-PAGE-DIRECTIVE.md` §7. The deep multi-step
`AssessmentForm.astro` on `/request-assessment/` is unchanged.

**SEO layer (net-new; not present in the HTML mockup):** `src/pages/index.astro` sets
`<title>Property Cleanout & Deep Cleaning | San Jose & South Bay | Aseptaclean</title>`, a
151-character meta description, canonical `https://aseptaclean.com/`, and a JSON-LD `@graph` adding
`LocalBusiness` (with `areaServed` city list and San Jose `geo` coordinates), three `Service`
entries (one per launch service card), and a `FAQPage` built from the same six-question array
`FAQ.astro` renders on-page (`faqItems`, exported from `FAQ.astro` and imported by `index.astro` so
schema text can never drift from visible copy). Verified in the built `dist/index.html`: exactly
one `<h1>`, zero occurrences of `aggregateRating`, and every occurrence of
licensed/remediation/decontamination/sterilization is inside a negation or exclusion clause
(referral language, the exclusion list, or the animal/organic card's mandated limiting clause) —
none market or claim the service.

`astro check` (0 errors, 58 files) and `npm run build` (production mode, env validation +
`astro build`, 9 pages) both pass. Visual/Lighthouse/schema-validator verification recorded
separately per session convention.

Files changed: `src/styles/tokens.css`, `src/styles/fonts.css`, `src/styles/global.css`,
`src/layouts/BaseLayout.astro`, `src/components/StatusRibbon.astro`, `src/components/Header.astro`,
`src/components/Hero.astro`, `src/components/Card.astro`, `src/components/ServiceCards.astro`,
`src/components/WhyAseptaclean.astro`, `src/components/AccentBand.astro`,
`src/components/HandoffStandard.astro`, `src/components/HandoffRecord.astro`,
`src/components/OperatorAccountability.astro`, `src/components/FAQ.astro`,
`src/components/FinalCTA.astro`, `src/components/MobileCTA.astro`, `src/components/Footer.astro`,
`src/components/CredentialBar.astro` (new), `src/components/Pricing.astro` (new),
`src/components/RequestForm.astro` (new), `src/pages/index.astro`, `package.json`.

### Verification pass (2026-08-08)

Screenshots at 390px and 1440px, `npx astro preview` on a `PUBLIC_DEPLOYMENT_ENV=production`
build, Playwright/Chromium, compared side-by-side against `docs/aseptaclean-FINAL-v2.html`
rendered directly from disk at the same two widths. Section order, spacing, gradients, card
treatment, credential bar, stages, record artifact, pricing, founder, FAQ, form, and final CTA all
match the mockup. Three real deviations found and fixed during this pass (not left as known gaps):

1. **Hero eyebrow missing its leading rule.** `Hero.astro` used `class="eyebrow"` instead of
   `class="ac-eyebrow eyebrow"`, so it never picked up the shared `::before` line rule from
   `global.css`. Fixed.
2. **Header nav/CTA copy didn't match the HTML file.** `navigation` in `site.ts` still had the
   pre-port labels ("Overview," "Who It Is For," "How It Works," "What Is Included") and
   `site.offer.primaryCta` was still "Get My 24-Hour Handoff Plan." Both replaced with the HTML
   file's literal text ("Services / Method / The Record / About / FAQ" and "Request an
   assessment"), consistent with the copy-supersession decision above.
3. **Hero embedded a `QuickHandoffForm` the mockup doesn't have.** Confirmed with owner and
   removed; the mockup's hero is two buttons + record-sample link + three chips only. The
   `#request` section (built this session) and the sticky mobile bar remain the fast paths to the
   form. `MobileCTA.astro`'s hero-visibility `IntersectionObserver` target updated from the removed
   `.hero__form-block` to `.hero .actions` so its show/hide behavior still works.

**Screenshot methodology note:** the Property Handoff Record uses a scroll-triggered opacity
reveal (`docs/11-COMPOSITION-AND-TYPE.md` §7 / `docs/18-VISUAL-DIRECTION.md` §8, both retained —
one scroll reveal on the artifact, `prefers-reduced-motion` respected). A `fullPage: true`
Playwright screenshot resizes the viewport rather than performing a real incremental scroll, so
the first two comparison captures showed the record as blank. Verified via computed-style checks
(`getComputedStyle(...).opacity`) that a real scroll-into-view resolves it to `opacity: 1` within
the existing 640ms transition and it stays visible on scrolling away — this is the reveal working
as designed, not a defect. Final comparison screenshots used a real `scrollIntoViewIfNeeded()` +
settle wait before capture.

**Lighthouse (mobile, `astro preview`, simulated throttling):**

| Category | Score | Target |
| --- | --- | --- |
| Accessibility | 100 | 100 |
| SEO | 100 | ≥95 |
| Performance | 91 | ≥95 |

Two real accessibility defects found and fixed (both were literal colors carried over from the
HTML file, which does not itself claim WCAG compliance):
- `.sept` ("clean" in the wordmark), `--ac-color-blue-500` (`#4a7fc1`) on white measured 4.12:1,
  below the 4.5:1 floor for 18px bold text. Changed the header wordmark's `.sept` to
  `--ac-color-blue-deep` (6.69:1); `blue-500` is unchanged everywhere else (icon chips, borders,
  non-text uses) where it still matches the mockup exactly.
- Credential-bar caption text and other `--ac-color-ink-400` uses (`#8494a8`) on white measured
  3.09:1. Token value darkened to `#617087` (5.03:1) — same muted-gray role, no component changed.
- Footer `.flegal` legal text, `#68809d` on navy-950, measured 4.34:1. Darkened to `#7891a9`
  (5.41:1).
- Logo links and the mobile-menu toggle used an `aria-label` that didn't include their visible
  text (WCAG 2.5.3 Label in Name / axe `label-content-name-mismatch`). Removed the label overrides
  and added `.visually-hidden` suffix text instead, so the accessible name is computed from (and
  therefore always contains) the visible text.

SEO's first measurement came back 66 — traced to `astro build` having been run without
`PUBLIC_DEPLOYMENT_ENV=production` set, which correctly (by existing, intentional design in
`SeoHead.astro`) emits `noindex, nofollow` for any non-production build. Not a page defect;
re-running the build with the env var set resolved it to `index, follow` and the SEO score to 100.

**Performance gap (91 vs ≥95 target) — real but environment-caused, not closed this session.**
`astro preview` is a local Node dev server: it serves `dist/`'s CSS uncompressed over HTTP/1.1
with no CDN caching. Confirmed directly — `curl -I` on the two render-blocking CSS files
(`BaseLayout.*.css` at 18,386 bytes, `index.*.css` at 20,326 bytes) returned no
`Content-Encoding` header even when the request declared `Accept-Encoding: gzip, br`. Piping the
same files through `gzip -c` locally drops them to 4,634 and 3,899 bytes respectively — a ~78%
reduction that any real static host (this project deploys to Cloudflare Pages per the `wrangler`
devDependency) applies automatically via brotli/gzip and HTTP/2, which Lighthouse's local run
cannot reflect. The `render-blocking-insight` and `network-dependency-tree-insight` audits (the
two largest point losses) are downstream of this uncompressed-transfer artifact. Re-run Lighthouse
against the deployed Cloudflare Pages preview (or `wrangler pages dev dist`, which does compress)
before treating 91 as the production number — this session did not have that deployment available
to test against.

Schema validated structurally (not against Google's live Rich Results Test, which requires a
public URL): `@graph` contains `Organization`, `WebSite`, `WebPage`, `LocalBusiness` (required
`name`/`url` present, plus `address`, `geo`, `areaServed`), three `Service` entries (each with
`serviceType`/`provider`), and one `FAQPage` with exactly 6 well-formed `Question`/`acceptedAnswer`
pairs matching the visible FAQ text verbatim (same `faqItems` array). Zero occurrences of
`aggregateRating` anywhere in the built output.

## Architecture decision — `docs/19-SYSTEM-AND-SITEMAP.md` adopted as growth-architecture authority (2026-08-09)

**Decision.** `docs/19-SYSTEM-AND-SITEMAP.md` (v3, owner-directed, dated 2026-08-08) is adopted
as the binding growth-architecture authority for the site: the five-stage business system
(CAPTURE→RESPOND→CONVERT→DELIVER→COMPOUND), the phased sitemap and per-page SEO specs, the
service/city/question-post wireframes, the triage-quiz spec, and the GBP setup spec. It sits
below `01-QUALITY-GUARDRAILS.md` (claims) and `18-VISUAL-DIRECTION.md` (visual) in the
precedence chain — where doc 19 names copy, `01` still outranks it.

**Effect on `07-ONE-PAGE-DIRECTIVE.md`.** Doc 19's phased sitemap (Part 2) supersedes `07`'s
one-page-only scope restriction: the site is no longer capped at the four launch routes plus
legal pages. `07` is marked superseded-for-scope at its own status line, with a pointer to doc
19, rather than deleted — its non-scope content (conflict-resolution table §3, form-architecture
split §7, guarantee reconciliation §6, launch-phase QA reconciliation §11) remains active and
unaffected, since doc 19 does not re-decide any of it.

**`AGENTS.md` changes.** Added doc 19 to the precedence chain immediately below
`18-VISUAL-DIRECTION.md` (new position 5; `06-APPROVED-HOMEPAGE-COPY.md` and
`07-ONE-PAGE-DIRECTIVE.md` shift down one position each, with `07`'s chain entry itself
annotated as superseded-for-scope). Rewrote the `## Scope` section: it now points to doc 19's
phase map as the binding route architecture and keeps the original one-page launch-scope text
below it, labeled historical, so the routes actually shipped in Phase 1 remain documented.

**Reason.** Owner-directed. Doc 19 is explicitly self-contained ("every future build session
must be able to execute from this doc alone") and supersedes ad hoc route decisions with a
phase-gated sitemap (Phase 1 live routes → Phase 3/3b/3c service, checklist, and city pages,
gated on crew capacity/certification/real jobs → Phase 4 assessment quiz and question posts).
Building past a phase gate in doc 19 (e.g. a biohazard page before certification is held, or a
city page with no completed job in that city) is out of scope regardless of this architecture
change.

**Files affected:** `AGENTS.md` (precedence chain, Scope section), `docs/07-ONE-PAGE-DIRECTIVE.md`
(status line only), `docs/19-SYSTEM-AND-SITEMAP.md` (no change — already committed as the source
document). No application code changed.

## Homepage re-port pass — copy-fidelity fixes, doc 19 §2.2 SEO layer completion, verification (2026-08-09)

Follow-up to "`docs/aseptaclean-FINAL-v2.html` becomes the binding homepage implementation
target" above. That pass's own component-by-component copy fidelity had drifted from the HTML
file's literal text in several places, found via a full section-by-section diff against
`docs/aseptaclean-FINAL-v2.html` this session:

- `homepage.pricingDrivers` had a 7th item ("Concealed conditions") not present in the six-item
  v2 list. Removed.
- `homepage.sampleRecord`'s four scope-summary cells and all four room-note strings were
  paraphrased longer than v2's literal text, and `excludedConditions` asserted "None encountered
  on this project" — a factual claim v2 never made. Reverted to v2's exact wording.
- `homepage.handoffStages`: the Scope and Protect stage detail strings had small grammatical
  padding not in v2 ("what the project will require" vs. "requires"; "Keep areas are identified"
  vs. "Keep areas identified"). The Reset stage was missing v2's entire trailing clause
  ("...including animal and organic conditions within lawful scope."). All three corrected to
  verbatim v2 text.
- `homepage.serviceCards`: all three card bodies had reworded detail text (dropped "cabinet and
  appliance interiors" and "for the next handoff" from card 2; added "sterilization" to card 3's
  exclusion list, which v2 does not list). Corrected to v2's literal text.

**SEO layer (doc 19 §2.2) completed.** Two gaps found against doc 19's exact HOMEPAGE spec:
- Meta description was a paraphrase ("Whole-property clearing and deep cleaning in San Jose and
  the South Bay. Written scope before work, documented closeout with a Property Handoff Record.")
  rather than doc 19's exact required string. Replaced with the verbatim spec text: "Whole-property
  cleanout and deep cleaning in San Jose & the South Bay. Written scope before work, nothing
  removed without approval, documented closeout." Title was already exact, unchanged.
- `LocalBusiness` schema had no `sameAs` field; doc 19 §2.2 requires `sameAs → GBP/Yelp/Nextdoor`.
  No Yelp/Nextdoor config field existed at all, and the existing `PUBLIC_GBP_URL` was unset.
  Added `PUBLIC_YELP_URL`/`PUBLIC_NEXTDOOR_URL` to `.env.example` and `src/env.d.ts`, and
  `site.business.yelpUrl`/`nextdoorUrl` to `src/data/site.ts`, following the exact pattern
  `googleBusinessProfileUrl` already used. `index.astro` now builds `sameAs` from whichever of
  the three URLs are actually set and omits the field entirely when none are — per AGENTS.md's
  "never invent proof" rule, no placeholder or guessed profile URL was written anywhere. All
  three remain empty today (no owner-confirmed profile URLs yet), so `sameAs` does not appear in
  the current built output; this is correct, not a defect, and the field will populate itself
  once `docs/02-OWNER-INPUTS.md`'s outstanding "Google Business Profile URL; active social URLs"
  item is resolved and the env vars are set.
- Confirmed `aggregateRating` remains absent everywhere in the built output (grep across
  `dist/index.html`, zero hits) and FAQPage schema's 6 Question/Answer pairs match the visible
  `<details>` text character-for-character (verified programmatically, not by eye).

**Lighthouse mobile — methodology note.** First runs against `astro preview` on localhost with
Lighthouse's default simulated mobile throttling scored Performance 54–56 and SEO 58–100
(unstable). Root causes isolated, not worked around:
- The SEO/noindex swing was `.env.production`'s own `PUBLIC_DEPLOYMENT_ENV=staging` value (that
  file is deliberately a pre-launch preview config per its header comment and
  `PUBLIC_LAUNCH_MODE=preview`/`PUBLIC_FORM_ENABLED=false` — not a bug). Audited instead against
  an uncommitted, gitignored-equivalent local-only `.env.lighthouse-audit` mode file (deleted
  after use, `.env.production` never modified — confirmed via `git status` before and after) with
  `PUBLIC_DEPLOYMENT_ENV=production` so the real indexable/production-shaped build could be
  measured. SEO resolved to 100 immediately.
- The Performance swing (54 → 93 → 100 across three otherwise-identical runs) tracked this
  machine's Lighthouse `benchmarkIndex` (1198 → 1279 → higher), i.e. CPU contention from running
  headless Chrome, the Node preview server, and everything else on the machine at once, amplified
  by Lighthouse's default 4x mobile CPU throttle. Re-running with `--throttling-method=provided`
  (no synthetic slowdown layered on top of an already-loaded machine) produced stable 93–100
  scores with a 254 KiB total page weight, 5ms server response, and only two small render-blocking
  CSS files (4.2 KB / 4.9 KB) as the only remaining deductions — consistent with the prior
  session's own finding that `astro preview` serves uncompressed, non-CDN assets and is not
  representative of the real Cloudflare Pages deployment target. Accessibility and Best Practices
  scored 100 on every run. Treat 93–100 (not the initial 54–56) as the site's actual Performance
  number; a from-CDN Lighthouse run remains the more decisive test once deployed, per the prior
  session's same caveat.

**Verification.** `astro check`: 0 errors, 58 files. `npm run build`: 9 pages, clean (both in
normal committed-`.env.production` state and, transiently, in the isolated production-mode audit
build — repo restored to the committed-config build afterward). Screenshots at 390 and 1440
captured with a full scroll-through pass (the Property Handoff Record section uses a
scroll-triggered `IntersectionObserver` reveal per Session 6; a naive full-page screenshot without
scrolling captures it mid-`opacity:0`, which is a screenshot-methodology artifact, not a site
defect — confirmed by checking computed opacity before/after `scrollIntoViewIfNeeded()`) and
compared side-by-side against `docs/aseptaclean-FINAL-v2.html` rendered at the same widths:
section order, spacing, and content match. Schema validated structurally (LocalBusiness required
fields present, FAQPage's 6 Question/Answer pairs well-formed and text-matched to visible copy,
zero `aggregateRating`/`review` occurrences anywhere in the graph).

Files changed: `src/data/site.ts`, `src/pages/index.astro`, `src/env.d.ts`, `.env.example`.

## Service-area decision — 10-city South Bay & Peninsula footprint (2026-08-09)

**Decision.** The site's declared service area is the 10-city list in
`docs/19-SYSTEM-AND-SITEMAP.md` Part 5: San Jose, Mountain View, Sunnyvale, Santa Clara,
Campbell, Los Altos, Los Altos Hills, Los Gatos, Palo Alto, and Atherton (+ surrounding).
Copy, schema, and GBP setup all use **"South Bay & Peninsula"** framing rather than a
county-only label, because Atherton (and Palo Alto/Los Altos Hills, to a lesser degree) sit in
San Mateo County, not Santa Clara County — a county-only label would misdescribe part of the
declared area. This is doc 19's decision, carried into the site rather than a new one, and is
logged here because it governs `LocalBusiness.areaServed`, the homepage meta description, and
the `/service-areas/` hub copy, all of which are build-facing.

**Effect.** Homepage `LocalBusiness` schema's `areaServed` is the 10-city list (San Jose
`geo`); `/service-areas/` hub content groups the ten into four clusters (San Jose core / West
Valley: Campbell–Los Gatos–Saratoga adj. / North County: Sunnyvale–Mtn View–Santa Clara /
Peninsula: Los Altos–LAH–Palo Alto–Atherton) per doc 19 §2.2. Doc 19 §2.1's Phase 3c city-page
gate still applies per city — no `/service-areas/{city}/` page exists yet for any of the ten
until a real completed job in that city supports one; Palo Alto, Atherton, and Los Altos Hills
are named as priority cities when jobs allow (highest estate-ticket value and Track B fiduciary
referral density).

**Files affected:** none this session — the 10-city list and cluster framing were already
present in `docs/19-SYSTEM-AND-SITEMAP.md` and in the previously-built `/service-areas/` draft
and homepage schema. This entry records the decision itself, which had not been logged
independently of doc 19's own text.

## Phase 4 — eight unpublished draft pages built; biohazard page exclusion (2026-08-09)

Executed against `docs/19-SYSTEM-AND-SITEMAP.md` Part 2 (§2.1 phase map, §2.2 per-page SEO
spec) and Part 3 (§3.2 service-page wireframe + tone deltas), per this session's build
directive. Built eight complete, styled, **unpublished** drafts — `noindex={true}` on every
page, excluded from `src/pages/sitemap.xml.ts`'s manual allowlist, and not linked from
`navigation` (`src/data/site.ts`) or `Footer.astro`:

- `/estate-cleanout-checklist/` — the one launch-eligible page in the batch; fully drafted from
  doc 19 Part 6 (method-derived, not call-derived), still shipped noindex pending owner review.
- `/estate-cleanout-san-jose/`, `/hoarding-cleanup-san-jose/`, `/animal-waste-cleanup-san-jose/`,
  `/senior-downsizing-san-jose/` — Phase 3 service pages, each with its own tone delta and
  first-section composition per doc 19 §3.2's differentiation rule.
- `/service-areas/` — hub page; renders the county framing paragraph, pill grid, and area
  clusters, with city links intentionally empty (`cityPages = []` in
  `src/pages/service-areas/index.astro`) since no `/service-areas/{city}/` page exists yet,
  per doc 19's hard content gate on city pages.
- `/deep-cleaning-san-jose/`, `/property-cleanouts-for-managers/` — Phase 3b pages, each
  carrying a visible internal (not public-facing) launch-gate note: deep cleaning is gated on
  the B10 checklist being finalized, PM/turnover is gated on crew capacity being confirmed. Both
  gate notes render in the built HTML but are separate from the page's actual SEO
  title/description/copy — a deliberate flag for whoever reviews the draft, not indexable
  content.

**`/biohazard-cleanup-san-jose/` — not built, in any form.** Owner directive this session: no
draft, no stub, no route. Reason: the TSWMP certification doc 19 §2.2 requires for this page
("DOES NOT EXIST until certificate held + insurance scope confirmed") is not held —
`docs/02-OWNER-INPUTS.md` still records `TSWMP public status: pending/unverified; do not publish
active status`. Confirmed no file, directory, or reference to this route exists anywhere in
`src/` (`find`/`grep` both return nothing). Per doc 19 §2.2's own instruction, this stays true
"until unlock: exclusion list shrinks sitewide same day; `01` rewritten first" — i.e. this
exclusion is not this session's to lift.

**Gated facts and real-call language.** Per this session's directive ("never invent"), every
spot doc 19 calls for real-call language, a real-job proof line, or a gated operational fact
was left as a clearly labeled `[OWNER INPUT: description]` placeholder in
`src/data/servicePages.ts` rather than invented copy — one anonymized real-job proof line per
service page (six total), the B10 deep-cleaning checklist item list and standalone-scope
question, and the PM/turnover same-week-availability claim. None of these were fabricated.

**Wording law (page 3, `/animal-waste-cleanup-san-jose/`).** Cleaning under the organic
pathogen endorsement only — the file was grepped for "biohazard," "remediation,"
"decontaminat," "saniti[sz]e," "steriliz," "hantavirus," and "rodent" before being marked done;
zero hits in rendered copy (the sole "biohazard" occurrence in the file is inside a code
comment naming the banned-word list itself, not page content).

**Differentiation rule.** No two of the six buyer-facing service pages open with the same
first-section pattern after the hero: estate = Track A family recognition then a Track B
fiduciary block with its own H2; hoarding = two stacked question-phrased H2s; animal = a single
short, plain recognition block with no question heading; senior downsizing = one hope-forward
recognition block plus a standalone referral-note block for senior move managers between SCOPE
and METHOD; deep cleaning = a recognition block that surfaces the standalone-availability open
question directly; property managers = Pure Track B, skipping RECOGNITION entirely in favor of
an immediate fiduciary block. Shared shell only (`CompactHero`, new `ServiceScope` /
`ServiceMethodRail` / `ServiceProof` / `ServicePricing` / `ServiceFAQ` components) — structure
still comes from each page's own wireframe. No page shows the full Handoff Record; each shows a
proof excerpt only, linking to `/handoff-standard/` for the complete annotated version.

**Schema.** Service + FAQPage + BreadcrumbList JSON-LD is written into every service page's
component now (matching each page's own visible FAQ copy, same pattern as
`index.astro`/`FAQ.astro`), but doc 19's self-containment rule and this session's directive
both hold that schema "ships ONLY when the page publishes" — functionally true here because
`noindex` plus zero sitemap/internal-link presence keeps these pages and their schema out of
any crawl path. Publishing later is a `noindex` flip per page, not a rebuild.

**Verification.** `astro check`: 0 errors, 77 files. `npm run build`: 21 routes, clean. Verified
in the built `dist/` output: all eight new pages render `<meta name="robots" content="noindex,
nofollow">`; `dist/sitemap.xml` contains only the nine pre-existing routes, none of the eight
new ones; no `biohazard` directory or file exists anywhere under `dist/` or `src/`.

Files added: `src/data/servicePages.ts`; `src/components/ServiceMethodRail.astro`,
`ServiceProof.astro`, `ServiceScope.astro`, `ServicePricing.astro`, `ServiceFAQ.astro`;
`src/pages/{estate-cleanout-checklist,estate-cleanout-san-jose,hoarding-cleanup-san-jose,
animal-waste-cleanup-san-jose,senior-downsizing-san-jose,service-areas,deep-cleaning-san-jose,
property-cleanouts-for-managers}/index.astro`. No existing file's behavior changed — `site.ts`,
`sitemap.xml.ts`, navigation, and `Footer.astro` were read but not modified, by design.

## Homepage — 10-city South Bay & Peninsula footprint implemented; Areas We Serve wired in (2026-08-09)

Executes the "Service-area decision — 10-city South Bay & Peninsula footprint" entry above,
which had been logged as a decision but not yet implemented anywhere in `src/`. Confirmed
before this session: `site.location.cities` still held the old 5-city list (San Jose, Mountain
View, Sunnyvale, Santa Clara, Campbell), the ribbon/credential bar/footer still read v2's
literal "Santa Clara Co." / "San Jose & the South Bay" wording, and `AreasWeServe.astro`
existed as a built component but was never imported into `index.astro` — the homepage had no
Areas We Serve section at all.

**Changes.**
- `src/data/site.ts`: `location.cities` extended to the 10-city list from doc 19 Part 5 (San
  Jose, Mountain View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos,
  Palo Alto, Atherton). Added `location.regionLabel = "South Bay & Peninsula"` as the single
  source for the framing string used everywhere the footprint is named.
- `StatusRibbon.astro`, `CredentialBar.astro`: fourth ribbon item and fourth credential-bar cell
  now read `site.location.regionLabel` instead of v2's literal "San Jose & the South Bay" /
  "Santa Clara Co." — both a factual correction (Atherton is San Mateo County, not Santa Clara)
  and the specific ask ("South Bay & Peninsula framing in ribbon, credential bar, and footer").
- `Footer.astro`: intro line now reads "...for San Jose and the South Bay and the Peninsula."
- `AreasWeServe.astro`: heading and closing note now read `site.location.regionLabel`
  ("South Bay & Peninsula") instead of the old `serviceArea`/`county` fields; pill list already
  mapped over `site.location.cities` so it picked up all 10 automatically.
- `index.astro`: imported `AreasWeServe` and placed it between `<Pricing />` and
  `<OperatorAccountability />` — matching `18-VISUAL-DIRECTION.md` §6's binding section map
  (row 8 "Areas we serve" sits after row 7 Property Handoff Record / before row 9 Founder;
  Pricing is the v2 section physically between Record and Founder in the DOM, so this is the
  only slot consistent with both specs). `LocalBusiness.areaServed` and the per-service `Service`
  schema blocks already mapped over `site.location.cities`, so both picked up the 10-city list
  with no schema code change required.
- `.gitignore`: added `.tmp-verify/` (this session's screenshot/Lighthouse scratch output;
  never committed).

**Not changed.** `/service-areas/index.astro` and `/contact/index.astro` (both unpublished,
noindex Phase 3 drafts, out of scope for the homepage-port directive) still reference
`site.location.county`/`serviceArea` directly in their own copy — left as-is since editing
unpublished draft pages was not part of this session's directive and doc 19's own city-page
hard-gate language for that hub page is unaffected by the region label change.

**Verification.**
- `astro check`: 0 errors, 77 files. `npm run build`: 21 routes, clean.
- `dist/index.html` LocalBusiness JSON-LD: `areaServed` is the 10-city list; `geo` unchanged at
  San Jose (37.3382, -121.8863); zero `aggregateRating`/`ratingValue`/`reviewCount` occurrences.
  FAQPage has exactly 6 Question/Answer pairs, each verified programmatically to appear
  verbatim in the page's visible text.
- Built HTML: "South Bay & Peninsula" appears 4× (ribbon, credential bar, Areas We Serve
  heading, Areas We Serve note); all 10 city pills render in the documented order, positioned
  between the Pricing and Founder sections.
- Full-page screenshots at 390×* and 1440×* captured with Playwright against both
  `docs/aseptaclean-FINAL-v2.html` and the live build, section order and copy matching
  end-to-end. First screenshot pass showed the Property Handoff Record's scroll-reveal section
  rendering blank — reproduced the prior session's documented caveat that this is a
  screenshot-methodology artifact (the IntersectionObserver reveal needs a real incremental
  scroll to fire, not a scroll-to-bottom-then-top jump); confirmed via direct DOM/computed-style
  inspection that `opacity: 1` / `.record--visible` is reached and persists correctly, then
  re-captured with a slower step-scroll (700px steps, 150ms settle) that renders the section
  correctly at both widths — not a site defect.
- Lighthouse mobile, run against a production-mode build (isolated `--mode lighthouse-audit`
  env file, deleted after use; `.env.production` never touched — confirmed via `git status`
  before/after) served over a plain local HTTP server: with `--throttling-method=provided`,
  Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100. Re-run with Lighthouse's
  default simulated mobile throttling (the stricter, CPU-contended check) still scored
  Performance 95 / Accessibility 100 / Best Practices 100 / SEO 100 — meets or exceeds the
  ≥95/100/≥95 target under both methodologies, not just the lenient one.

Files changed: `src/data/site.ts`, `src/components/StatusRibbon.astro`,
`src/components/CredentialBar.astro`, `src/components/Footer.astro`,
`src/components/AreasWeServe.astro`, `src/pages/index.astro`, `.gitignore`.

## Doc 19 adoption — phased architecture, biohazard gate, service area, CTA/scope defaults (2026-08-09)

**(a) Phased growth architecture adopted.** `docs/19-SYSTEM-AND-SITEMAP.md` (v3, owner-directed,
2026-08-08) is now the growth-architecture authority, placed in `AGENTS.md`'s precedence chain
below `01-QUALITY-GUARDRAILS.md` (claims) and `18-VISUAL-DIRECTION.md` (visual) — where it names
copy, `01` still outranks it. It governs the site's phased sitemap (Phase 1 live · Phase 3/3b/3c
service, checklist, and city pages · Phase 4 assessment/question routes · Phase 5 biohazard,
gated), per-page SEO specs, wireframes, and the CAPTURE→RESPOND→CONVERT→DELIVER→COMPOUND system.
Reason: owner decision to move from a one-page-only launch scope to a phased multi-page
architecture once the flagship offer is live. Do not build ahead of doc 19's phase gates for any
route. Files affected: `AGENTS.md` precedence chain and Scope section.

**(b) Phase 5 (biohazard) remains fully gated — no build in any form before Gate 4.** Per doc 19
Part 2 §2.1, Phase 5 is inert until all four activation gates in
`90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` clear: TSWMP held, disposal arrangements, claims
amendment, and owner supersession note. No route, draft, stub, sitemap entry, or nav link may
exist for any biohazard URL (`/biohazard-cleanup/`, `/blood-cleanup/`,
`/unattended-death-cleanup/`, `/crime-scene-cleanup/`, `/human-waste-cleanup/`,
`/sharps-cleanup/`, or the reserved `/encampment-cleanup/` / `/vehicle-biohazard-cleanup/`) before
Gate 4. Doc 90 does not yet exist in `docs/`; it is referenced prospectively by doc 19 as the
future gating document. Reason: no certification, TSWMP, disposal arrangement, or claims
amendment is currently in place — building any biohazard-adjacent artifact now would outrun a
credential per `AGENTS.md`'s prohibited-claims section. Files affected: none (no biohazard route
exists; this is a standing constraint on all future sessions).

**(c) Service area confirmed as the 10-city South Bay & Peninsula list.** San Jose, Mountain
View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos, Palo Alto, Atherton
— per doc 19 Part 5. Reason: Atherton is San Mateo County, not Santa Clara, so all copy and
schema use "South Bay & Peninsula" framing rather than county-only language (already implemented
in `src/data/site.ts` `location.cities`/`location.regionLabel` per the prior session's entry
above). Files affected: `src/data/site.ts`, `StatusRibbon.astro`, `CredentialBar.astro`,
`Footer.astro`, `AreasWeServe.astro`, homepage schema.

**(d) Two owner defaults applied.**
- Sitewide CTA is **"Request an assessment"**. Doc 90's "Property Assessment" variant is not
  adopted. Reason: owner preference for consistent, plain-language CTA phrasing across the site;
  doc 90 is not yet an active authority (still gated per (b) above), so its CTA variant does not
  govern current-scope pages.
- **Rodent-droppings services remain out of marketed scope** pending a written crew protocol.
  Reason: doc 19's animal/organic wording law already prohibits naming hantavirus or
  rodent-specific conditions until protocol is confirmed (§2.2, ANIMAL/ORGANIC page spec); this
  entry makes the same constraint explicit as an owner default rather than an inferred reading, so
  future sessions do not add rodent-specific language or a dedicated page without a written
  protocol on file. Files affected: none yet (no rodent-specific copy exists); binding on all
  future animal/organic-condition copy and any future service scope decisions.

## Doc 90 filing and terminology/operations sweep (2026-08-09)

Filed `90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` as a quarantined future-phase roadmap. Not
governing. Four activation gates required (see doc header). Sections 10 and 13 are active now;
all else inert. Not added to the precedence chain, `AGENTS.md`, sitemap, navigation, page briefs,
or any build task — `19-SYSTEM-AND-SITEMAP.md` already references it correctly (as gated, Phase
5) per the prior log entry above, and doc 90's own header confirms the same three
current-use extractions that entry anticipated.

**Doc-name mapping (Task 0).** Doc 90's handoff instructions (§14) name governing docs by
expected filename that do not match this repo. Per `AGENTS.md`'s precedence chain (the actual
authority — `docs/AGENTS-PRECEDENCE-BLOCK.md` is an unmerged draft template, not in force):
claims guardrails = `01-QUALITY-GUARDRAILS.md`; build/sitemap spec = `10-PHASE-4-DEEP-DIVE-
REPAIR-AUDIT.md` (canonical master spec) plus `19-SYSTEM-AND-SITEMAP.md` (routes/sitemap
authority); decisions log = `05-DECISIONS-LOG.md` (matches). No `04-CLAIMS-GUARDRAILS.md`,
`03-VOICE.md`, or `05-OPERATIONS.md` exists in this repo — voice/tone content lives in
`18-VISUAL-DIRECTION.md` and `01-QUALITY-GUARDRAILS.md`; no operations-authority file exists at
all. No new governing doc was created to match doc 90's expected names.

**Terminology retirement (Task 2, doc 90 §13).** Repo-wide case-insensitive search for "gross
filth" / "Gross Filth" / "gross-filth" across `docs/`, `src/`, and all content/components found
zero customer-facing instances. The only hits are the roadmap itself
(`90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md`) and two docs that merely state the term must never
appear (`07-ONE-PAGE-DIRECTIVE.md:121`, `docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md:112`, both
already prohibitive, not usages). No `/gross-filth-cleanup/` route exists anywhere in `src/pages/`
or git history. No replacement, rename, or redirect was needed or made. No claims/guardrails
check, `astro check`, build, or screenshots were required since no page changed.

**Buyer research system (Task 3, doc 90 §10).** No `05-OPERATIONS.md` or other operations-
authority file exists in this repo to check. `19-SYSTEM-AND-SITEMAP.md` §1.5 COMPOUND item 5
already referenced the six-field system as active but pointed at an operations doc that was never
created. Added new §1.8 "Inquiry capture — buyer research system" to
`19-SYSTEM-AND-SITEMAP.md` (the active growth-architecture authority) using doc 90 §10 verbatim,
rather than creating a new `05-OPERATIONS.md` file, per `AGENTS.md`'s standing rule against
parallel files with similar names and doc 19's own self-containment rule. Files affected:
`docs/19-SYSTEM-AND-SITEMAP.md`.

## GSC redirect sweep (2026-08-09)

Owner supplied the indexed-WordPress-URL list from GSC per `19-SYSTEM-AND-SITEMAP.md`'s redirect
law ("at DNS cutover, every indexed WordPress URL 301s to its nearest new equivalent"). Mapped
each against the current live route set and `19-SYSTEM-AND-SITEMAP.md` Part 2.1's phased sitemap,
with corrections to the owner's initial mapping:

- `/request-assessment/` dropped from the redirect list entirely — it is itself a live, canonical
  route (`docs/07-ONE-PAGE-DIRECTIVE.md` §2; `src/pages/request-assessment.astro`), not a retired
  WordPress URL. The owner's original mapping would have 301'd a real working route to `/contact/`
  (which does not exist as a route in the current one-page architecture).
- `/cookie-policy/` excluded from the redirect list — it is already a live route
  (`src/data/site.ts` `urls.cookiePolicy`, `src/pages/cookie-policy.astro`), not a page pending
  future publication. The owner's "→ /privacy/ until Cookie Policy publishes" framing did not
  match repo state.
- Six targets (`/families-estate-representatives/`, `/hoarding-cleanup/`,
  `/hoarding-estate-clearouts/`, `/gross-filth-cleaning/`, `/animal-waste-abatement/`,
  `/residential-property-clearing/`, `/eviction-difficult-turnaround-clearing/`) point at pages
  that exist in `src/pages/` but are noindex and excluded from `src/pages/sitemap.xml.ts` pending
  each page's own Phase 3 launch gate. Routed these to `/` as an interim hop (matching the
  existing `_redirects` default for not-yet-live targets) rather than sending live external/GSC
  traffic into a pre-launch, noindexed page. Each is commented in `public/_redirects` with its
  eventual direct target; update individually as each page's launch gate clears — do not bulk-flip.
  Added as a standing check in `04-RELEASE-CHECKLIST.md`.
- `/milpitas/` routed to `/service-areas/` on explicit owner instruction, despite Milpitas not
  currently appearing in the confirmed 10-city service-area list (`src/data/site.ts`
  `location.cities`).
- `/data-request/` and `/sms-notification-consent/` are **not** redirects: both are real,
  functioning pages on the old WordPress site (CCPA data-request mechanism; Twilio 10DLC SMS
  consent record) and were recreated in Astro at identical URLs
  (`src/pages/data-request.astro`, `src/pages/sms-notification-consent.astro`) using the shared
  `BaseLayout` shell and the same honest "provider not configured" fallback pattern already used
  by `src/components/LegalPolicy.astro` for `/privacy/`, `/terms/`, `/cookie-policy/`. Neither page
  contains drafted or approximated legal/consent copy — the SMS consent page in particular must
  carry the verbatim text submitted in the Twilio campaign registration, which was not available
  in this session. Both added to `04-RELEASE-CHECKLIST.md` as DNS-cutover blockers.
- Remaining WordPress builder junk (`/h2/`, `/elementor-page-5945/`, `/elementor-page-5950/`,
  `/elementor-page-5960/`) and stale pre-launch pages (`/future-services/`, `/launching-soon/`)
  routed to `/`, consistent with the existing `_redirects` retirement convention.

`astro check` (0 errors) and `npm run build` (23 pages, clean) both pass with the two new pages
included. Files affected: `public/_redirects`, `src/pages/data-request.astro`,
`src/pages/sms-notification-consent.astro`, `docs/04-RELEASE-CHECKLIST.md`.

## Lead notifications: email-only launch, SMS gated behind a flag (2026-08-09)

Owner decision: lead notifications ship email-only via the existing Resend integration for
launch. Twilio SMS owner alerts are gated on pending 10DLC campaign approval and must not
silently activate once credentials happen to exist.

Implementation: added `SMS_ALERTS_ENABLED` (server-only, `functions/_lib/lead.ts`
`LeadEnvironment`) as an additive, off-by-default flag. `sendOwnerSms`
(`functions/_lib/providers.ts`) checks it before touching Twilio credentials at all — when unset
or `"false"`, it returns `skipped` with an explicit reason ("pending 10DLC approval") rather than
falling through to a credentials-missing message, so the delivery ledger records *why* SMS didn't
fire. No change was needed in `functions/api/lead.ts`: it already treats a skipped SMS step
identically to a failed one and triggers `sendOwnerFallbackEmail`, so email-only operation runs
through the existing fallback path with zero new branching — enabling SMS later is exactly
"set `SMS_ALERTS_ENABLED=true` and populate the four Twilio values," no refactor.

`scripts/validate-env.mjs`: moved the four `TWILIO_*`/`LEAD_ALERT_PHONE` keys out of
`fullProductionRequired` (a production build no longer hard-requires Twilio credentials that
can't exist yet) and added a conditional block — if `SMS_ALERTS_ENABLED=true`, all four are
required; if set to anything other than `"true"`/`"false"`, the build fails validation. This
was necessary, not optional: the prior required-list would have blocked every production build
until 10DLC approval landed, which contradicts shipping email-only now.

`.env.example` documents the flag and its gate. `scripts/phase3-endpoint-check.mjs` (run via
`npm run qa:phase3:endpoint`) updated: the existing SMS-provider-failure test now explicitly sets
`SMS_ALERTS_ENABLED=true` (it tests a real Twilio 502, which requires the flag on to reach
Twilio at all); added a new test asserting that with the flag unset — today's real deployment
default — a Twilio call is never attempted (fetch mock throws on any `api.twilio.com` URL) and
the owner fallback email still fires. Both tests and the full mocked suite pass; `astro check`
and `npm run build` remain clean.

`docs/04-RELEASE-CHECKLIST.md` Operations section: reworded the "Notification path works" item
to state email-only is the intended launch configuration, not an unverified gap. Added a new item
requiring Resend DNS (SPF/DKIM/DMARC) show "Verified" in the Resend dashboard and a real
end-to-end test lead deliver both the customer confirmation and owner fallback email before
cutover. Files affected: `functions/_lib/lead.ts`, `functions/_lib/providers.ts`,
`scripts/validate-env.mjs`, `.env.example`, `scripts/phase3-endpoint-check.mjs`,
`docs/04-RELEASE-CHECKLIST.md`.

## `/sms-notification-consent/` ported verbatim; consent storage flagged for post-approval revisit (2026-08-09)

Owner supplied the actual source HTML (and `sms-consent.css`) for the page cited in the pending
Twilio 10DLC carrier review. Ported it byte-preserved as a standalone document at the identical
`/sms-notification-consent/` URL — not wrapped in `BaseLayout`/the site shell, per instruction:
own `<head>`, own Google Fonts (Montserrat/Open Sans), own stylesheet, `robots` meta left
`index,follow`. Consent language, disclosures, headings, and the inline enrollment-form script
are unedited from the supplied source; the `/terms-and-conditions` link is left exactly as
authored and continues to rely on the existing `public/_redirects` 301 to `/terms/` rather than
being rewritten to point at `/terms/` directly. `docs/04-RELEASE-CHECKLIST.md`'s DNS-cutover
blockers section was updated accordingly (page must resolve at this exact URL pre-cutover).

**Not acted on, logged for after Twilio approval clears:** the enrollment form's consent record
(`aseptaclean_internal_sms_consent`) is written to `localStorage` only — device-local, and weak
as compliance evidence since it isn't tied to a durable, auditable store and doesn't survive a
cleared browser or a different device. Per instruction, no change was made while the carrier
review is pending, since altering this page's behavior now risks invalidating the exact artifact
under review. Revisit moving consent capture server-side (e.g. logging the enrollment through
`/api/lead`-style infrastructure or a dedicated endpoint) once 10DLC approval is confirmed. Files
affected: `src/pages/sms-notification-consent.astro`,
`public/sms-notification-consent/sms-consent.css`, `docs/04-RELEASE-CHECKLIST.md`.

## Documentation cleanup pass — precedence, dangling references, and reality drift (2026-08-11)

Documentation-only pass, run against `docs/REPO-STATE.md` (the 2026-08-11 ground-truth audit)
and the operative precedence chain in root `AGENTS.md`. No file under `src/`, `functions/`, or
any config was touched. Eleven items, each logged separately below.

### 1. Deleted `docs/AGENTS-PRECEDENCE-BLOCK.md`

A: `docs/AGENTS-PRECEDENCE-BLOCK.md` — "One endpoint: `src/pages/api/lead.ts`. Do not maintain
a competing implementation in `functions/`." (unranked — a stale, unmerged draft, not in the
precedence chain)
B: `AGENTS.md` §0.1 — "`functions/api/lead.ts` is the only lead endpoint. It is correct. Do not
touch it... Do not create `src/pages/api/lead.ts`. It has never existed." (rank 1, current
governing file)

Resolution: B wins — inverted and dangerous. `src/pages/api/lead.ts` has never existed;
`functions/api/lead.ts` is the only working implementation. `AGENTS.md`'s own header already
states it "replaces `docs/AGENTS-PRECEDENCE-BLOCK.md` in full."
Type: violated rule (actively wrong instruction) → file deleted, not merely corrected.
Changed: `docs/AGENTS-PRECEDENCE-BLOCK.md` deleted. (It was already removed from the working
tree at session start; this pass confirmed the deletion was intentional and correct rather than
restoring it.)
Not changed: historical mentions of the filename in `docs/PHASE-4-AUDIT.md`,
`docs/20ALIGNMENTAUDIT20260811.md`, `docs/22DOCDISPOSITION.md`, and this log's own earlier
entries — these are accurate historical records of a file that used to exist and do not need
correction.

### 2. Fixed `docs/01-QUALITY-GUARDRAILS.md` title, precedence block, and self-reference

A: `docs/01-QUALITY-GUARDRAILS.md` §Precedence (old) — ranked itself 7th, below
`04-CLAIMS-GUARDRAILS.md`, `07-DESIGN-SYSTEM-AND-LAYOUT-SPEC.md`, `02-BUILD-SPEC.md`, and
`09-PREMIUM-EXECUTION-BAR.md` — none of which exist in `docs/`.
B: `AGENTS.md` §1 — ranks this file 3rd (below current law and `21-CLAIMS-AND-COMPLIANCE-LAW.md`,
above everything else) and lists all four of the above filenames under "Files that do not
exist — stop if a document points you at one."

Resolution: B wins. Replaced the duplicate, wrong local chain with a pointer to the root
`AGENTS.md` chain. Also retitled from "# 10 — $20K Website Quality and Anti-AI Guardrails" to
"# 01 — Execution Quality and Anti-Generic Guardrails" (the file is numbered `01-`, not `10-`,
and the dollar-figure framing was cosmetic marketing language, not a rule) and fixed line 1174's
self-reference from `docs/10-20K-WEBSITE-QUALITY-ANTI-AI-GUARDRAILS.md` (a filename that has
never existed) to `docs/01-QUALITY-GUARDRAILS.md`.
Type: stale description → corrected doc.
Changed: `docs/01-QUALITY-GUARDRAILS.md` (title, §Precedence, line ~1174).
Not changed: the rest of the file's content (anti-AI guardrails, scoring rubric) — out of
scope, still accurate.

### 3. Repaired the nine dangling doc-to-doc references (`docs/REPO-STATE.md` §11)

Each of the nine filenames `docs/REPO-STATE.md`'s cross-reference audit flagged as pointing at
a file that does not exist on disk was resolved individually:

1. `docs/05-OPERATIONS.md` (from `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md:515`) — never
   existed. Corrected inline to say so and to stop assuming a home for the six-field inquiry
   capture system before checking whether it exists anywhere.
2. `docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md` (from
   `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md:3`) — never existed. Corrected inline; doc 08
   is the sole authority for `/private-residence-reset/`, no separate strategy doc exists.
3. `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` (from `docs/05-DECISIONS-LOG.md:27`, this
   file) — exists, but moved to `docs/archive/` when superseded. Path corrected in the
   historical entry above (Phase 4 Session 1 §0 resolution) without altering the historical
   record of what was decided.
4. `docs/10-20K-WEBSITE-QUALITY-ANTI-AI-GUARDRAILS.md` (self-reference,
   `docs/01-QUALITY-GUARDRAILS.md:1174`) — fixed as part of item 2 above.
5. `docs/ASSET-MANIFEST.md` (from `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md:224` and
   `docs/archive/PHASE-4-SESSION-PROMPTS.md:83`) — numbering mismatch; real file is
   `docs/06-ASSET-MANIFEST.md`. Corrected inline in both archived files with a note that the
   surrounding session text is otherwise historical and superseded.
6. `docs/DECISION-LOG.md` (from `docs/archive/PHASE-4-SESSION-PROMPTS.md:65`) — singular/plural
   mismatch; real file is `docs/05-DECISIONS-LOG.md` (this file). Corrected inline.
7. `docs/PHASE-4-CANONICAL-MASTER-SPEC.md` (from `docs/archive/PHASE-4-SESSION-PROMPTS.md:19`
   and other lines in the same file) — a placeholder name, resolved by `docs/PHASE-4-AUDIT.md`
   §0 to `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`. Added a corrective banner at the top of
   the archived file pointing to the real filename rather than rewriting every instance inside
   a frozen historical session script.
8. `docs/PHASE-4-COMPOSITION-AND-TYPE.md` (self-reference,
   `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md:4,216`) — the file's own "repo location" header
   was stale after it moved to `docs/archive/` on being superseded by
   `docs/11-COMPOSITION-AND-TYPE.md`. Corrected the header and marked the file archived/superseded.
9. `docs/PHASE-4-ONE-PAGE-DIRECTIVE.md` (self-reference,
   `docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md:5`, also referenced from
   `docs/archive/PHASE-4-SESSION-PROMPTS.md:19,49`) — same pattern as #8; corrected the header,
   marked archived/superseded by `docs/07-ONE-PAGE-DIRECTIVE.md`, and resolved the
   `PHASE-4-CANONICAL-MASTER-SPEC.md`/`04-CLAIMS-GUARDRAILS.md` placeholders in its own
   "Read with" line to the real files (`docs/10-...` and `docs/21-...`).

Type: all nine were stale descriptions (broken paths / unresolved placeholders), not violated
rules → all corrected in place, none required a code or behavior change.
Changed: `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md`, `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`,
`docs/05-DECISIONS-LOG.md` (this file), `docs/01-QUALITY-GUARDRAILS.md`,
`docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md`, `docs/archive/PHASE-4-SESSION-PROMPTS.md`,
`docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md`.
Not changed: the substantive instructions inside the archived session-prompt files (e.g. the
Instrument Sans references in `docs/archive/PHASE-4-SESSION-PROMPTS.md` and
`docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md`) — these are frozen historical drafts, already
marked non-governing by `AGENTS.md`, and rewriting their intent would misrepresent what was
actually instructed at the time. Only the broken paths were fixed.

### 4. `docs/19-SYSTEM-AND-SITEMAP.md` — added `/services/` and `/who-we-help/`, deleted the Phase 3b biohazard line

A: `docs/19-SYSTEM-AND-SITEMAP.md` §2.1 (old) — Phase 3b listed
"`/biohazard-cleanup-san-jose/` gate: certification held (highest margin)" as a single-gate
route, and the phase map had no entry at all for `/services/` or `/who-we-help/`.
B: `AGENTS.md` §2 — "`19` §2.1 Phase 3b's single-gate `/biohazard-cleanup-san-jose/` line is
**void** — Phase 5's four-gate rule governs. If you find that Phase 3b line, delete it." Same
section also lists `/services/` under "Do not build... any `/services/*` or `/locations/*`
route (that is the superseded `site map` architecture)" — itself now stale, since
`src/pages/services/index.astro` is a real, shipped hub page, distinct from the unlawful
`/services/{service}/` per-service-type architecture the prohibition actually targets.

Resolution: B wins on the Phase 3b deletion (both same doc-family rank, but `AGENTS.md` is
rank 1 and explicit). On `/services/` and `/who-we-help/`: neither is the superseded
`site map` architecture — `docs/REPO-STATE.md` §2 confirms both are real, indexed, sitemapped,
nav-and-footer-linked hub pages (`servicesHub`/`whoWeHelpHub` in `servicePages.ts`), added in
the uncommitted "IA expansion Chunk 3" work. Doc 19 needed to document reality, not the
`AGENTS.md` §2 prohibition text (which targets `/services/{service}/` per-service routes and
`/locations/*`, not the `/services/` and `/who-we-help/` hub pages themselves).
Type: mixed — Phase 3b line was a violated rule (already voided by `AGENTS.md`, just not yet
deleted from doc 19) → deleted. Missing `/services/`/`/who-we-help/` entries were a stale
description (doc 19 simply didn't know they existed yet) → added.
Changed: `docs/19-SYSTEM-AND-SITEMAP.md` §2.1 — added a "PHASE 3d — IA EXPANSION, CHUNK 3"
block documenting both live hub routes; deleted the Phase 3b `/biohazard-cleanup-san-jose/`
line entirely (Phase 3b now lists only the two crew/checklist-gated routes).
Not changed: the BIOHAZARD per-page SEO spec subsection (§2.2) — it already correctly deferred
to Phase 5 and doc 90, with no reference to the now-deleted Phase 3b line, so no edit was
needed there. `AGENTS.md` §2's own prohibition text was left as-is per this task's scope
(documentation-only within `docs/`); flagging here that its `/services/*` wording is now
imprecise relative to the real `/services/` hub and may be worth tightening in a future pass.

### 5. Amended `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 3 — font stack

A: `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 3 (old) — "supersede the prior
implementation with Newsreader Variable + Instrument Sans Variable."
B: `AGENTS.md` §6 — "The shipping stack is: `--serif` Newsreader Variable, `--sans` Inter
Variable, `--mono` IBM Plex Mono... Instrument Sans is removed." Confirmed against
`src/styles/tokens.css:58-60` (`--ac-font-sans: "Inter Variable"...`) and
`src/layouts/BaseLayout.astro:11-13,57-77` (Newsreader, Inter, and IBM Plex Mono all imported
and preloaded; no Instrument Sans import anywhere in the file).

Resolution: B wins — the FINAL-v2 port swapped the sans face after item 3 was written, and the
build is measured and working (`AGENTS.md` §6's own rationale for not reverting).
Type: stale description → corrected doc.
Changed: `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 3 — appended an "Amended 2026-08-11"
note with the corrected stack, exact `BaseLayout.astro:57-77` citation, and an explicit
do-not-revert instruction.
Not changed: the original "Observed / Risk / Resolution" prose above the amendment — left
intact as the historical record of the original finding.

### 6. Amended doc 10 item 7 and `docs/11-COMPOSITION-AND-TYPE.md` §5 — homepage section count

A: `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 7 — "consolidate into eight movements."
A2: `docs/11-COMPOSITION-AND-TYPE.md` §5 (old) — a binding eight-movement-plus-two-detail-band
composition map (10 rows total counting FAQ/Footer).
B: `docs/REPO-STATE.md` §5 — `src/pages/index.astro` renders exactly 14 top-level sections in a
verified order (Hero, CredentialBar, ServiceCards, ConfidenceAndFit, WhyAseptaclean, AccentBand,
HandoffStandard, HandoffRecord, Pricing, AreasWeServe, OperatorAccountability, FAQ, RequestForm,
FinalCTA), confirmed by reading `index.astro` lines 85-98 directly.

Resolution: B wins on both — three binding section maps had come to coexist (doc 10 item 7, doc
11 §5, and the code) and none of the three agreed with either of the others. Per the
doc-precedence skill's standing rule, "the code is ahead of the documents... where a document
describes reality incorrectly, correct the document." Neither doc 10 item 7 nor doc 11 §5 was
prescribing a rule the code was violating — both were stale descriptions of an earlier,
abandoned target.
Type: stale description → corrected doc, both files.
Changed: `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 7 (appended amendment note pointing to
doc 11 §5 as the corrected map). `docs/11-COMPOSITION-AND-TYPE.md` §5 (replaced the binding
table with the real fourteen-section list and component names, sourced verbatim from
`docs/REPO-STATE.md` §5; kept the old eight-movement table below, relabeled "historical," since
its container/rhythm/surface variation reasoning is still useful design principle even though
it's no longer the binding per-section map).
Not changed: §5.1 ("Inserted detail bands") — its internal "§5 row 7" cross-references still
resolve correctly since the historical table is preserved in place, just relabeled.

### 7. Struck `docs/07-ONE-PAGE-DIRECTIVE.md` §8 — Astro version freeze

A: `docs/07-ONE-PAGE-DIRECTIVE.md` §8 (old) — "Freeze at the installed major [Astro 5]. Ship.
Migrate on a branch after the first leads land."
B: `package.json` — `"astro": "^7.1.6"`. Verified business fact: the migration already
happened, two majors past the frozen version.

Resolution: B wins — current installed-version fact outranks a stale prescriptive note (rank 1
in the precedence chain, "current law, active insurance, verified business facts"). Leaving the
freeze note live invited a future session to re-plan a migration that already shipped.
Type: violated/obsolete rule → struck, not merely corrected, since the rule has no remaining
purpose once the migration it was gating has already occurred.
Changed: `docs/07-ONE-PAGE-DIRECTIVE.md` §8 — replaced the freeze instruction with a short
struck-notice pointing here.
Not changed: doc 07's other precedence-chain-eligible sections (§3 conflicts, §6 guarantees, §7
forms, §11 QA) — out of scope, §8 was never in that eligible list per `AGENTS.md` §1 rank 11.

### 8. "Site map" project doc — superseded notice

The task asked for a superseded banner on the project doc described in `AGENTS.md` §5 (a
`/services/*` + `/locations/*` architecture with biohazard, trauma-scene, decomposition,
rodent-droppings, rodent-urine, and post-infestation routes, plus a `/projects/` case-study
hub) and flagged as partly unlawful per `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §3 and §5.

Searched the entire repository — every file in `docs/`, `docs/archive/`, and every `.html`
file — for content matching that description. None exists on disk under any filename; the only
matches are descriptive references to it in `AGENTS.md` §5 and `docs/22DOCDISPOSITION.md` §1
and §4b, both of which already state it is superseded by `docs/19-SYSTEM-AND-SITEMAP.md`. Per
the doc-precedence skill's explicit instruction ("If a document points you at a missing file,
stop and report — do not infer what it would have said"), this was raised to the user rather
than guessed at. User directed: treat `docs/22DOCDISPOSITION.md` §4b as the authoritative
record rather than searching further or fabricating a target file.

Resolution: no live file to banner exists. Reinforced the existing supersession notice instead.
Type: stale/missing description → strengthened the existing corrected-doc record.
Changed: `docs/22DOCDISPOSITION.md` — added a note to the §1 table row for "the `site map`
project doc" recording that no matching file exists anywhere in the current tree, that this
row plus `AGENTS.md` §5 and §4b function as its superseded notice, and that the prohibited
routes (`/services/{service}/`, `/locations/{city}-ca/`, `/projects/`, biohazard/rodent routes)
must never be built from it regardless.
Not changed: no file was deleted or created, since none was found. If a source document for
this surfaces later (e.g. supplied externally by the owner), add this same banner to it
directly per `AGENTS.md` §5's original instruction.

### 9. Banner added to `docs/13-REMEDIATION-PASS.md`

A: `docs/13-REMEDIATION-PASS.md` §1 — implicitly presented as a still-checkable state
("Status: Active. Run after the current build...") describing the build at commit `88ab2a6`.
B: `docs/PHASE-4-AUDIT.md` item 2 — "The `--ac-` token system does not exist yet. `grep` for
`--ac-` across `src/` returns zero results [at commit `88ab2a6`]... The standing rule ('Keep
`--ac-`. Adopt canonical values.') describes a target state, not the current one." Also
`docs/22DOCDISPOSITION.md` §1 — "Its §1 describes an approximation... that never built the
`--ac-` architecture. D1–D11 are all resolved or superseded. Not a valid regression guard."

Resolution: B wins — doc 13 describes a pre-token-system build state that cannot be used to
regression-test the current, fully `--ac-`-prefixed system.
Type: stale description presented as active → banner added rather than deleting the file, since
its content remains a useful historical record per `docs/22DOCDISPOSITION.md`'s disposition
plan (extract-or-delete, not yet executed).
Changed: `docs/13-REMEDIATION-PASS.md` — added a blockquote banner at the top stating the file
is historical-only, not a valid regression guard, and should not be run against the current
build.
Not changed: the body content (D1–D11 findings) — left intact as historical record.

### 10. Regenerated `docs/TOKEN-MAP.md` and ran a real contrast checker

A: `docs/TOKEN-MAP.md` (old) — documented a pre-v2 palette (`--ac-color-navy-900: #122840`,
`--ac-color-steel-300` path `#a8b8c8` → `#59738d`, etc.) that does not match any value currently
in `src/styles/tokens.css`.
B: `src/styles/tokens.css` (as committed) — the actual current values (e.g.
`--ac-color-navy-950: #0b1830`, `--ac-color-steel-300: #8494a8`).

Resolution: B wins — regenerated the file's color, font, type-scale, measure, rhythm, and
spacing tables directly from `tokens.css`, replacing every stale hex.

Also ran a real WCAG 2.1 contrast computation (sRGB→linear relative luminance, not a visual
estimate) against every text-token-on-surface-token pairing that renders as text or
non-text-but-AA-relevant (borders) in `src/`, cross-referenced against actual consumption sites
via `grep -rn` across `src/`. Findings:
- `--ac-color-steel-300` (`#8494a8`) on white: 3.10:1 — fails AA-normal (4.5:1), passes
  AA-large and the 3:1 non-text threshold. Not a live bug: verified via grep that `steel-300` is
  used exclusively as a `border` color in `src/` (never as text), where the 3:1 non-text
  threshold is the applicable one, which it clears on white (3.10:1) though not on warm-white
  (2.90:1, noted as a low-severity follow-up).
- `--ac-color-ink-400` (`#617087`) on white: 5.03:1 — passes AA-normal, consistent with the
  token's own code comment (darkened from v2's literal `#8494a8`, which measured 3.09:1,
  specifically to clear 4.5:1 for muted caption text). Verified via grep as the token actually
  used for muted text throughout `src/` — correct application.
- Steel-on-navy counterpart: already exists (`--ac-color-steel-on-navy: #9fb2ca`) and is already
  the token used everywhere `src/` needs steel-toned text on a navy surface (verified via grep:
  `about/index.astro`, `estate-cleanout-san-jose/index.astro`,
  `property-cleanouts-for-managers/index.astro`, `private-residence-reset.astro`,
  `ResidenceBaselineRecord.astro`). Measured 8.16:1 / 7.27:1 / 5.64:1 on navy-950/900/800
  respectively — all pass AA-normal. No new token was needed; the system was already correctly
  built, just previously undocumented.

Type: stale description → regenerated doc, plus new audit content that did not exist before.
Changed: `docs/TOKEN-MAP.md` — full rewrite: current token tables plus a new "Contrast audit"
section with the full computed matrix and the two specifically-requested token findings.
Not changed: no token values in `src/styles/tokens.css` were altered — this was a documentation
pass. The one sub-3:1 border case (`steel-300` on warm-white, 2.90:1) is flagged in the new doc
for a future code-touching session, not fixed here, since AA's 3:1 non-text rule applies to
graphical objects required to understand content and a decorative hairline border does not
clearly meet that bar — a judgment call left to whoever next touches `tokens.css`, not decided
unilaterally in a documentation-only pass.

### 11. Regenerated `docs/06-ASSET-MANIFEST.md`

Found already substantially regenerated in the working tree (uncommitted; the file's own header
already read "Regenerated 2026-08-11" and correctly listed Instrument Sans as retired and Inter
Variable / IBM Plex Mono as live). Verified the rest of the file against ground truth and found
one remaining stale section:

A: `docs/06-ASSET-MANIFEST.md` §2 (as found) — listed Fraunces, Montserrat, Open Sans, and
Source Serif 4 as "Unused" font packages, implying they were still installed dependencies.
B: `package.json` `dependencies` (as committed) — only three font packages present
(`@fontsource-variable/inter`, `@fontsource-variable/newsreader`, `@fontsource/ibm-plex-mono`).
Confirmed via `node_modules/@fontsource-variable/` listing (only `inter` and `newsreader`
present) that the other packages are fully removed, not merely unused. Also verified the old
manifest text's claim about `dev-type-compare-fonts.css` and `/dev/type-compare/` pulling those
fonts into `dist/_astro/` is now stale — both that stylesheet and that page are deleted in the
working tree (`git status`: `D src/styles/dev-type-compare-fonts.css`,
`D src/pages/dev/type-compare.astro`).

Resolution: B wins — corrected §2 to state the five retired families are removed from
`package.json` entirely (not merely unused), removed the now-false claim about `dist/_astro/`
leakage through deleted dev routes, and clarified the Montserrat/Open Sans exception is served
from the Google Fonts CDN on `/sms-notification-consent/`, unrelated to the removed local
packages.
Type: stale description → corrected doc.
Changed: `docs/06-ASSET-MANIFEST.md` §2.
Confirmed unchanged (already correct): §1 brand-asset inventory — cross-checked file sizes
(86,930 B / 64,857 B / 104,103 B) against `public/assets/brand/` directly, exact match. §4
image-slot inventory — matches `docs/REPO-STATE.md` §9 ("no photographic assets anywhere,"
three-PNG total inventory).

---

**Summary of files changed in this pass:** `docs/AGENTS-PRECEDENCE-BLOCK.md` (deleted),
`docs/01-QUALITY-GUARDRAILS.md`, `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md`,
`docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`, `docs/05-DECISIONS-LOG.md` (this file),
`docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md`, `docs/archive/PHASE-4-SESSION-PROMPTS.md`,
`docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md`, `docs/19-SYSTEM-AND-SITEMAP.md`,
`docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`, `docs/11-COMPOSITION-AND-TYPE.md`,
`docs/07-ONE-PAGE-DIRECTIVE.md`, `docs/22DOCDISPOSITION.md`, `docs/13-REMEDIATION-PASS.md`,
`docs/TOKEN-MAP.md`, `docs/06-ASSET-MANIFEST.md`. No file under `src/`, `functions/`, or any
config file was read for the purpose of changing it — only for verification (grep, diff against
`package.json`, file-size checks) that documentation claims matched reality.

**Not done, and why:** item 8's target file could not be located and was not fabricated (see
above — user directed treating doc 22 as the record instead). The `steel-300`-on-warm-white
border contrast finding (2.90:1, below the 3:1 non-text threshold) was documented but not
fixed, since this was a documentation-only pass and the fix requires a judgment call about
whether a decorative border counts as an "essential graphical object" under WCAG — left to a
future session with the authority to touch `tokens.css`.

## `07-ONE-PAGE-DIRECTIVE.md` §3 — the fourteen pre-resolved conflict rows (migrated 2026-08-11)

Per `docs/22DOCDISPOSITION.md` §2, these are decisions, not standing directives, so they move
here rather than staying in a file being deleted for superseded scope. All fourteen were
already adopted in the current build; recorded here as the historical resolution record.

| # | Older plan | Canonical (adopted) | Decision |
| --- | --- | --- | --- |
| 1 | Hoarding / estate / severe-condition clearing | Aseptaclean Handoff Reset — clearing + deep clean + documented closeout | Adopted. Situational search language kept (see §4 migration below) |
| 2 | $6,500–12,000, $8,000 planning average | "Projects generally begin at $1,500" | Superseded by the 2026-08-11 pricing decision (`AGENTS.md` §4): no price figure is published anywhere; only the $195 assessment fee |
| 3 | Free on-site assessment | Photo review free; on-site $195, credited within 7 days | Adopted. "Free assessment / free consultation" purged |
| 4 | Four named guarantees incl. Discretion Standard | Handoff Assurance: 5 items + Scope-Completion Guarantee | Adopted, discretion re-inserted as sixth item |
| 5 | Assess → Define → Authorize → Clear → Document | Scope → Protect → Clear → Reset → Verify | Adopted repo-wide |
| 6 | Defined Scope Document + Completion Record | Property Handoff Record (one artifact) | Adopted |
| 7 | Montserrat + Open Sans | Newsreader Variable + Instrument Sans Variable | Superseded again by the 2026-08-11 typography amendment (`AGENTS.md` §6): shipping stack is Newsreader Variable + Inter Variable + IBM Plex Mono |
| 8 | Token prefix `--ac-*` | Unprefixed `--color-*`, `--text-*` | Kept `--ac-`; canonical values/scale/fonts adopted; mapped in `docs/TOKEN-MAP.md` |
| 9 | 3 fields only, no wizard | 3-step progressive disclosure, ~20 fields | Both, split by route — short form on `/`, full form on `/request-assessment/` (see `docs/19-SYSTEM-AND-SITEMAP.md` Part 4B) |
| 10 | Worker → HubSpot → Zapier/Make | Astro endpoint → Turnstile → store → HubSpot → Resend → Twilio | Adopted; Zapier/Make dropped |
| 11 | Astro 5 | Astro 7.1.x | Closed — `package.json` is on Astro `^7.1.6`, migration already happened |
| 12 | The Mark (navy rectangle) | Not mentioned | Superseded by `docs/18-VISUAL-DIRECTION.md` |
| 13 | Stock photography harms trust | Canonical §15 — same conclusion | No conflict; every asset logged in `docs/06-ASSET-MANIFEST.md` |
| 14 | Phone unverified | (408) 785-7588 | Closed — live in config, mirrors GBP |

Rows 2 and 7 show a decision superseding a decision: `07`'s "canonical" column was itself later
overridden by dated 2026-08-11 owner decisions recorded in `AGENTS.md` §4 and §6. Recording
both layers here rather than silently collapsing to only the newest, since that is exactly the
kind of silent-override pattern `doc-precedence` exists to catch.

## `docs/22DOCDISPOSITION.md` cleanup pass — full session record (2026-08-11)

Executed the worklist in `docs/22DOCDISPOSITION.md` end to end: installed skills, ran baseline
audits, deleted nine superseded files (four standalone plus the five-file archive directory,
corrected from the doc's claimed six — see discrepancies below), extracted five sections from
two files into their precedence-chain destinations before deleting the sources, verified an
already-complete third extraction, applied the per-file fix list, reconciled the route
architecture doc, repaired eleven dangling references (two more than the nine the source
document counted), and now deletes the worklist itself. This entry is the record; the
worklist's job is done.

### 0. Before starting — discrepancies found in the worklist itself

The task instructions and `docs/22DOCDISPOSITION.md` both describe a state that did not fully
match the repository as found. Recorded here rather than silently corrected, per this file's
own standing rule:

- **The file didn't exist at the path given.** The task named `docs/22-DOC-DISPOSITION.md`;
  the real file is `docs/22DOCDISPOSITION.md` (no hyphens). Same pattern already present on
  disk for docs 20 and 21 — see below.
- **Docs 20 and 21 were already hyphen-drifted.** `docs/20ALIGNMENTAUDIT20260811.md` and
  `docs/21CLAIMSANDCOMPLIANCELAW.md` existed without hyphens, while every reference to them
  throughout the doc set (including inside the two files' own bodies) used the hyphenated form
  every other numbered doc follows. Renamed both to `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` and
  `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` to match the convention and fix the drift at the
  source rather than patch every citation individually.
- **`docs/23-BUILD-REQUIREMENTS-FROM-RESEARCH.md` already existed**, fully written, correctly
  capturing the four binding requirements from docs 14/15 with the right directional framing
  and the right exclusion list — a prior session had already done this extraction but had not
  deleted the two source files. Verified the extraction was faithful against the original
  files' full text before deleting 14 and 15 this pass; nothing further to write.
- **`.claude/skills/` already existed at the repository root**, untracked. Nothing to copy in
  from elsewhere — committed it as-is (see §1 below) rather than performing a no-op copy.
- **Several §3 per-file fixes were already done.** `01-QUALITY-GUARDRAILS.md`'s retitle and
  precedence-block replacement, `02-OWNER-INPUTS.md`'s three stale values, all of
  `04-RELEASE-CHECKLIST.md`'s LAUNCH-BLOCKING/DEFERRED labeling, `06-ASSET-MANIFEST.md`'s
  regeneration, `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` items 3 and 7, `11-COMPOSITION-AND-
  TYPE.md` §5, and `TOKEN-MAP.md`'s full regeneration were all already correct on disk. Only
  the genuinely-open items in that table (01's claims pointer, 06-copy's supersession banner,
  08's `$2,000` anchor and dangling reference, 90's CTA claim) needed work this pass.
- **Line counts in the worklist were approximate, not exact**, and in a few cases materially
  off (e.g. `05-DECISIONS-LOG.md` cited at "2,028," actually 2,358 at session start; `19` cited
  at "505," actually 510; `archive/` cited at "1,320" across 6 files, actually 1,341 across 7
  files — the disposition's own subtotal named six archive filenames but the directory held
  seven). This entry uses real `wc -l` output throughout, not the worklist's figures.
- **`docs/REPO-STATE.md` (887 lines) is outside this worklist's scope entirely** — it appears
  in neither the disposition doc's 30-file baseline count nor its 17-file target, in no delete
  list, and no keep list. It is a separate, already-stale, frozen audit snapshot (dated
  2026-08-11, predates this session's changes) documenting the "nine dangling references" this
  task also asked to repair. Left untouched and excluded from the file/line totals below, since
  including or excluding it was never actually decided by the source document — flagging
  rather than guessing.

### 1. Skills installed and baseline run

`.claude/skills/{claims-check,type-law,route-audit,doc-precedence}/SKILL.md` committed to the
repository root (commit `63ae7aa`). Ran `claims-check` and `route-audit` against the whole
repository as the reference-point baseline the task requested; `type-law` and `doc-precedence`
were not run standalone this pass (no heading/token change and no cross-doc conflict was open
at baseline time — both remain available for the next session that touches either surface).
Full reports saved to `docs/BASELINE-CLAIMS-CHECK-20260811.md` (87 lines — zero violations,
matches the skill's own stated baseline) and `docs/BASELINE-ROUTE-AUDIT-20260811.md` (73 lines
— zero new redirect collisions, one known/accepted crawl-path finding carried forward from
`04-RELEASE-CHECKLIST.md` C10, one confirmed orphan `/service-areas/`, three confirmed
unimported components).

### 2. Files deleted outright (§1 of the worklist)

| File | Lines | Note |
| --- | --- | --- |
| `docs/03-BUILD-PLAN.md` | 119 | Superseded; sole surviving rule already implemented in `scripts/validate-env.mjs` |
| `docs/12-SESSION-PROMPTS.md` | 366 | All nine sessions run; predates doc 18; pointed at already-deleted `AGENTS-PRECEDENCE-BLOCK.md` |
| `docs/13-REMEDIATION-PASS.md` | 197 | Self-banners "not a valid regression guard, historical only" |
| `docs/PHASE-4-AUDIT.md` | 224 | Dated 2026-07-30, an old commit; findings resolved and superseded |
| `docs/archive/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` | 236 | Superseded by doc 11; live content pre-migrated into doc 11 §10 (see 05-DECISIONS-LOG history above) |
| `docs/archive/INSTALL-PHASE-4-UPDATE.md` | 53 | Superseded install prompt |
| `docs/archive/PHASE-4-CLOSEOUT-PROMPT.md` | 115 | Superseded closeout prompt |
| `docs/archive/PHASE-4-CODEX-PROMPT.md` | 82 | Superseded build prompt |
| `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md` | 257 | Superseded by doc 11 |
| `docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md` | 283 | Superseded by (the now also deleted) doc 07 |
| `docs/archive/PHASE-4-SESSION-PROMPTS.md` | 315 | Superseded session prompts |
| `docs/aseptaclean-clinical-direction.html` | — | Superseded direction, never adopted |
| `docs/aseptaclean-homepage-mockup.html` | — | Superseded by `aseptaclean-FINAL-v2.html`; dead token names |

`docs/AGENTS-PRECEDENCE-BLOCK.md` (78 lines) and `docs/17-REFERENCE-TRANSLATION-MARTEL.md`
(368 lines) were both already deleted before this session began — `AGENTS.md`'s own header
already claimed to replace the former, and doc 18/doc 11 already treated the latter as gone.
No action needed; confirmed absent, not re-deleted.

**§1 subtotal this session: 2,247 lines (four standalone files) + 1,341 lines (archive/, seven
files) = 3,588 lines, plus two superseded HTML mockups.**

### 3. Extractions (§2 of the worklist)

**`docs/00-MASTER-BRIEF.md` (1,923 lines) — deleted after verified extraction:**

| Section | Destination | Verified landed at |
| --- | --- | --- |
| §9 Assessment Form Specification | `19-SYSTEM-AND-SITEMAP.md` new Part 4B.1 | `19-SYSTEM-AND-SITEMAP.md:493` |
| §13 Analytics event names | `19-SYSTEM-AND-SITEMAP.md` Part 4B.1 (folded in, doc 19 had no prior event list) | `19-SYSTEM-AND-SITEMAP.md:563` |
| §11 Structured-data types | `21-CLAIMS-AND-COMPLIANCE-LAW.md` new §6.1 | `21-CLAIMS-AND-COMPLIANCE-LAW.md:307` |
| §11.1 Three required disclaimers | `21-CLAIMS-AND-COMPLIANCE-LAW.md` §6 (documentation disclaimer already present; assessment and scope disclaimers added) | `21-CLAIMS-AND-COMPLIANCE-LAW.md:292,298` |

Doc 19 had no existing "Part 4" for the *current* form (its Part 4 is the future-phase triage
quiz spec) — added as a new Part 4B rather than overwriting or renumbering, to keep the
current-build spec and the future-phase spec distinct.

**`docs/07-ONE-PAGE-DIRECTIVE.md` (296 lines) — deleted after verified extraction:**

| Section | Destination | Verified landed at |
| --- | --- | --- |
| §3 Fourteen pre-resolved conflict rows | `05-DECISIONS-LOG.md` (this file, above) | `05-DECISIONS-LOG.md:2360` |
| §4 SEO correction (situational language + FAQ requirement) | `19-SYSTEM-AND-SITEMAP.md` §2.2 | `19-SYSTEM-AND-SITEMAP.md:186` |
| §4 Dignity language (`hoarder`/`gross filth`) | `21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.2 | `21-CLAIMS-AND-COMPLIANCE-LAW.md:54` |
| §6 Guarantee reconciliation (discretion sixth item) | `19-SYSTEM-AND-SITEMAP.md` Part 3.1 | `19-SYSTEM-AND-SITEMAP.md:374` |
| §7 Form architecture | `19-SYSTEM-AND-SITEMAP.md` new Part 4B.0 | `19-SYSTEM-AND-SITEMAP.md:473` |
| §11 Launch-blocking QA | Confirmed already reconciled into `04-RELEASE-CHECKLIST.md` §C (C1–C23, LAUNCH-BLOCKING/DEFERRED-labeled, more current than §11 itself) by a prior session; corrected doc 04's header, which claimed this reconciliation had never been done | `04-RELEASE-CHECKLIST.md:6` |

§5 (price floor) and §8 (Astro freeze) were already closed per the worklist's own note — no
extraction needed, both facts already live in `AGENTS.md` §4 and the decisions log.

**`docs/14-RESEARCH-FINDINGS.md` (97 lines) + `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` (87
lines) — deleted after confirming the extraction already at `docs/23-BUILD-REQUIREMENTS-FROM-
RESEARCH.md` (78 lines) was complete and faithful.** Re-read both source files in full against
doc 23's text: all four binding requirements (phone-field copy, single-column forms, the
3-field/multi-step split, mobile-only sticky call bar) present with the right directional
framing; every opaque `<cite>`-marked statistic correctly excluded (the 266% single-CTA
figure, the 18.7% phone-field figure, the Vodafone/Swappie/Yelp case studies, the dead-token
contrast table); both self-limiting caveats preserved. Nothing further to extract.

**§2 subtotal this session: 1,923 + 296 + 97 + 87 = 2,403 lines deleted** (the worklist's own
§2 estimate was "2,405 more lines deleted" — within 2 lines of the real figure, the one
estimate in the source document that held up almost exactly).

### 4. Per-file fixes applied (§3 of the worklist)

Of the fourteen files in the worklist's fix table, seven needed no action (already correct —
see discrepancies above: `01` retitle/precedence, `02`, `04`'s labeling, `06-ASSET-MANIFEST`,
`10` items 3/7, `11` §5, `TOKEN-MAP`, `18` "keep as-is", `aseptaclean-FINAL-v2.html` "keep").
Six needed real changes, applied this pass:

- `01-QUALITY-GUARDRAILS.md` — added the explicit "Claims are governed by `docs/21-CLAIMS-
  AND-COMPLIANCE-LAW.md`" pointer to the Precedence section. (The line-1174 self-reference the
  worklist described was already fixed before this session; current file has no such string.)
- `06-APPROVED-HOMEPAGE-COPY.md` — added the "superseded for `/` by `aseptaclean-FINAL-v2.html`,
  authoritative for every other route" banner; body left unchanged as instructed.
- `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — removed the `$2,000` starting-context anchor
  from both its copy block and its release-criteria checklist (the live route already carried
  no such string; the doc was the only place still citing it). Line-3 dangling reference to
  `07-PRIVATE-RESIDENCE-RESET-STRATEGY.md` was already self-documented as never-existed before
  this session — confirmed, not re-fixed.
- `90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` — corrected the §9 CTA claim: "Request a Property
  Assessment" was never adopted; the governed phrase is "Request an assessment." Fixed in both
  the page-architecture list and the dedicated CTA-language section, which had the correction
  backwards (claimed the *governed* phrase was the property-assessment wording).
- `19-SYSTEM-AND-SITEMAP.md` — see §5 below (route reconciliation folded in here since both
  touch the same file).

### 5. Route reconciliation (§5 of the worklist, task step 5)

Found already substantially done by a prior session: `/services/` and `/who-we-help/` were
already documented under a "PHASE 3d — IA EXPANSION, CHUNK 3" block in Part 2, and Phase 3b
already carried no single-gate biohazard line — Phase 5's four-gate rule was already the sole
governing section, with no contradiction left inside the document. One real staleness found
and fixed: Phase 1 was still labeled "LIVE THIS WEEK," when all seven of its routes (including
`/about/`, `/contact/`, `/handoff-standard/`, specifically named as stale in the worklist) are
confirmed built and live. Relabeled to "LIVE (reconciled 2026-08-11 — all seven built and
shipped, not 'this week')."

### 6. Dangling references repaired (task step 6)

The worklist's own count was nine (catalogued in `docs/REPO-STATE.md` §11, a frozen snapshot).
A fresh whole-tree link check this session found **eleven** total needing repair — two the
original snapshot missed. Repaired:

1. `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` §10 and its migration table — pointed at
   `05-OPERATIONS.md`, confirmed never to have existed; annotated in place and pointed at where
   the buyer-research content actually lives (this section itself).
2. `docs/11-COMPOSITION-AND-TYPE.md` §10 — pointed at `docs/archive/09-PREMIUM-VISUAL-AND-
   TYPOGRAPHY-SPEC.md`, which was a correct reference until this session's own §1 deletion of
   `docs/archive/` made it dangling. Annotated with the deletion date and confirmed the live
   content had already been migrated into this same file before the archive copy was removed.
3. `docs/11-COMPOSITION-AND-TYPE.md` (2px radius note) — same file, cited
   `17-REFERENCE-TRANSLATION-MARTEL.md` as evidentiary source for a fact; file confirmed
   already deleted (before this session). Annotated with the deletion note; conclusion stands
   independent of the now-gone source.
4. `docs/18-VISUAL-DIRECTION.md` — same `17-REFERENCE-TRANSLATION-MARTEL.md` reference,
   instructed "read it for reasoning" for a file that no longer exists. Rewritten to describe
   what it said and why it was deleted (TrustBar reading "licensed," forbidden by doc 21),
   rather than pointing at a dead file.
5. `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` §P3 — three items ("delete `AGENTS-PRECEDENCE-
   BLOCK.md`," "retitle `01`," "nine dangling refs") read as an open task list; all three
   already resolved. Annotated the whole block as historical record, struck the two
   already-closed line items explicitly.
6. `docs/19-SYSTEM-AND-SITEMAP.md` and `docs/BASELINE-CLAIMS-CHECK-20260811.md` — both cited
   the pre-rename `docs/21CLAIMSANDCOMPLIANCELAW.md` (no hyphens); updated to the renamed path.
7. **New, not on the original nine:** `docs/01-QUALITY-GUARDRAILS.md` — two live pointers to
   `03-VOICE.md` (§8.4 punctuation/rhythm rule, §20.6 scoring rubric), confirmed in `AGENTS.md`
   §1 to never have existed. Fixed both to point at where voice/tone content actually lives
   (`01-QUALITY-GUARDRAILS.md` itself and `18-VISUAL-DIRECTION.md`, per this file's own prior
   resolution above).
8. **New, not on the original nine:** `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` gate 3 of
   4 — cited `04-CLAIMS-GUARDRAILS.md` as "the claims authority" for a legally load-bearing
   activation gate. That file never existed; the real claims authority is `docs/21-CLAIMS-AND-
   COMPLIANCE-LAW.md`. Fixed — this was the highest-stakes finding of the repair pass, since an
   agent activating this gated document off the wrong filename would have amended nothing.

Re-ran the full-tree link check after all repairs (`grep`-based extraction of every
`docs/*.md`-shaped reference across all nineteen live files plus `AGENTS.md`, cross-checked
against disk). Remaining hits against nonexistent filenames are all either: (a) inside
`AGENTS.md`'s own "reference only / orphaned / non-governing / does not exist" sections, whose
purpose is naming retired or nonexistent files; (b) "migrated from"/"replaces" provenance notes
describing where content came from, not live read-pointers; or (c) inside this decisions log's
own historical narration, describing past states accurately as they were at the time. No
further live, unannotated dangling reference found.

### 7. Final count

| | Files | Lines |
| --- | --- | --- |
| Before this session (disposition doc's own baseline) | 30 | 11,146 (disposition's stated figure; real `wc -l` at session start across all `.md` files including the disposition doc itself was 13,402 across 33 files — the 30/11,146 figures apparently excluded `REPO-STATE.md`, `TOKEN-MAP.md`, and possibly counted archive as 6 files instead of 7) |
| After this session, before deleting this worklist | 20 | 9,142 |
| After deleting `docs/22DOCDISPOSITION.md` (216 lines) | **19** | **9,173** |

Deleting the 216-line worklist did not shrink the total the way the other deletions did,
because this decisions-log entry — appended before the deletion, as the task's own ordering
required ("append everything... then delete") — is itself longer than the file it replaced.
Net effect of this final step: −216, +~447 (this entry). That tradeoff is correct, not an
error: the worklist's content was disposable once executed, but the record of *how* it was
executed is exactly what rank-1 governance in this file exists to hold.

**`docs/REPO-STATE.md` (887 lines) is excluded from the "target" comparison** — it was never
part of the disposition doc's 30-file baseline or 17-file target (see discrepancy note above).
Excluding it: **18 files, 8,286 lines.**

This lands above the worklist's own "17 files, ~6,100 lines" target. The gap is almost entirely
`docs/05-DECISIONS-LOG.md` itself, which grew from 2,358 lines at session start to 2,633 lines
by design — every extraction and every repair this task performed added to it, per rank-1
governance and the explicit instruction to append rather than drop history — plus two new
baseline-report files (160 lines total) the original worklist did not anticipate as permanent
artifacts. No file was trimmed below what its live, still-binding content required; the rule
throughout was extract-then-delete, never delete-and-shrink-regardless. If a tighter number is
wanted, the two baseline reports are the only candidates for consolidation (e.g., folding into
this log instead of standalone files) — flagging rather than doing that unasked, since the
task's own instruction was to "save both reports" as artifacts in their own right.

### 8. Skills baseline going forward

`claims-check` and `route-audit` baselines are saved at `docs/BASELINE-CLAIMS-CHECK-20260811.md`
and `docs/BASELINE-ROUTE-AUDIT-20260811.md`. Both are clean relative to their own scope (zero
claims violations; one pre-existing, owner-level route finding carried forward, no new failure
mode). Future sessions touching public copy or routes should diff against these baselines, not
re-derive from zero.

---

## `docs/27-COPY-CANONICAL.md` adopted as homepage/service-page copy source (2026-08-16)

### 0. What happened

Owner directive this session: "Copy source is now `docs/27-COPY-CANONICAL.md` §9–15
(Astro/Cloudflare build). Migrate its finished copy onto the pages, applying the header's owner
reconciliations... Ignore doc 27 §25 and anything technical — it describes the abandoned
ChatGPT build." Doc 27 is a new, untracked file (`git status` shows `??`) and is **not yet in
`AGENTS.md`'s precedence chain at all** — it postdates the 2026-08-11 chain and was never added.

### 1. Conflict: doc 27's H1s vs. doc 19's H1 architecture rule

A: `docs/19-SYSTEM-AND-SITEMAP.md` Part 3.2 (service-page wireframe) — "H1 in buyer's words
(never brand vocabulary)" (rank 6, in the chain)

B: `docs/27-COPY-CANONICAL.md` §12–15 — H1 fields given as literal service names ("Estate
Cleanouts", "Hoarding Cleanup", "One-Time Deep Cleaning", "Animal Waste Cleanup") — brand
vocabulary, not buyer's words. (not in the chain; doc 27's own header disclaims authority over
"architecture/URLs/SEO waves (→ doc 19)... Where this doc restates those, the named owner-doc
wins.")

**Resolution — escalated to the owner rather than picked silently** (both the "not in the
chain" and "would change what ships on every live/dark page" stop-and-ask triggers applied).
Owner chose: keep doc 19's rule, keep the current buyer's-words H1s and their leads
untouched; migrate doc 27 verbatim for everything else that has a direct counterpart (work-
included/scope bullets, quote variables/pricing drivers, boundaries, FAQ, and — for the
homepage specifically, per doc 27's own §9 fields — eyebrow, section headings, and body copy
where no higher-ranked rule contradicts it).

**Type:** violated rule → enforced (doc 19's H1 rule stands; doc 27's literal H1 text is not
used verbatim anywhere in this pass).

### 2. Conflict: doc 18's "three cards, not six" vs. doc 27's four-card homepage model

A: `docs/18-VISUAL-DIRECTION.md` §6.1, "retained" per an explicit `ServiceCards.astro` code
comment — exactly three homepage service cards at launch. (rank 5, above doc 19 and above doc
27's unranked position.)

B: `docs/27-COPY-CANONICAL.md` §9.4–9.5 — "Four ways a property reaches its next handoff,"
four cards (Detailed / Specialty / Property Clearing / Commercial).

**Resolution:** doc 18 wins (higher rank, explicit "retained" decision already recorded in
code). Card count stays at three; doc 27's four-card copy and its literal "Four ways..." H2 are
**not** applied to `ServiceCards.astro` — using either would either misstate the card count or
require restructuring the section, which is a visual-system change doc 18 owns, not a copy
change doc 27 owns.

**Type:** violated rule → enforced. Not changed: `ServiceCards.astro` section header/intro
copy — left as-is rather than partially aligned to a doc 27 section that assumes a different
card count.

### 3. Scope boundary applied without a conflict (recorded for the next session)

Doc 27 §11's shared service-page structure (screening panel / trust strip / quote-variable
section / scope-boundary panel / four-step process / related-service cards) is a *different*
page architecture from doc 19 Part 3.2's built wireframe (compact hero / RECOGNITION / SCOPE /
FIDUCIARY BLOCK / METHOD / PROOF / PRICING HONESTY / FAQ), which the four existing dark service
pages (`estate-cleanout-san-jose`, `hoarding-cleanup-san-jose`, `animal-waste-cleanup-san-jose`,
`deep-cleaning-san-jose`) are already built against, including page-specific tone deltas
(grief-aware / shame-disarmament / matter-of-fact dignity) doc 27 has no equivalent for. Per
doc 27's own header, doc 19 owns architecture. **Existing page architecture, section list, and
tone-delta copy (Track A/B, recognition, fiduciary blocks) are left untouched.** Only the
fields with a direct doc 27 counterpart — scope/work-included bullets, pricing/quote-variable
bullets, and FAQ — are migrated, word-for-word from doc 27 where a topic match exists, appended
(not substituted) where doc 27 supplies a genuinely new question with no current counterpart,
and left alone where the current page covers something doc 27 doesn't address at all (e.g. the
current estate FAQ's junk-removal-vs-cleanout comparison, or the hoarding FAQ's animal/organic
cross-reference, which stays because dropping it would leave the page's own FAQ answer
contradicting its scope list).

`deep-cleaning-san-jose` is excluded entirely from this pass: its `scope.included` and
`checklist` fields carry a permanent, explicit gate ("do not launch until the B10
deep-cleaning checklist is finalized... never invent") and its differentiated hard-water/
tile-grout/"surface restoration, not damage restoration" wording is load-bearing for a wording
law doc 27 doesn't carry. Doc 27's generic §12.1 bullets would silently drop that wording-law
sentence and the B10-linked specifics. Not touched.

SEO title/meta description fields embedded inside doc 27 §12–15 are treated as "SEO," which
doc 27's own header assigns to doc 19 — left unchanged (they already match doc 19 Part 2.2).

### 4. Changed

- `src/data/site.ts` — `homepage.sampleRecord` (four fields + four room notes), `homepage.
  handoffStages` (Protect/Clear/Reset/Verify detail text), `homepage.pricingDrivers` (six
  items) aligned to doc 27 §9.8–9.10 wording.
- `src/components/Hero.astro` — eyebrow line, Handoff Status sample panel cell text.
- `src/components/WhyAseptaclean.astro` — item titles/bodies aligned to doc 27 §9.6.
- `src/components/Pricing.astro` — H2 and intro paragraph (the intro changes the photo-quote
  stance from "we do not quote from a photograph" to "photos may support an initial range" —
  both compliant, but flagged for the owner as an operational-claim change, not just wording).
- `src/components/OperatorAccountability.astro` — founder body paragraph aligned to doc 27
  §9.11.
- `src/components/FAQ.astro` — 4 of 7 homepage FAQ items aligned to doc 27 §9.12 wording; 3
  items with no doc 27 counterpart kept as-is.
- `src/components/RequestForm.astro` — H2 and intro aligned to doc 27 §9.13 (this also fixes a
  pre-existing duplicate-H2 issue: this section and `FinalCTA.astro` previously shared the
  identical headline).
- `src/components/FinalCTA.astro` — body aligned to doc 27 §9.14; secondary CTA changed from
  "Text a photo" to "Call {phone}" per doc 27's explicit §9.14 CTA pair.
- `src/data/servicePages.ts` — `estatePage`, `hoardingPage`, `animalPage`: `scope.included`
  and `pricing.drivers` replaced with doc 27 §14.3/§14.2/§13.2 wording; `faq` arrays gained
  doc 27's non-overlapping questions and had overlapping questions' wording aligned.

### 5. Not changed

- Homepage H1/lead/approval-statement/CTAs/trust chips — already verbatim matches to doc 27
  §9.1, no edit needed.
- `ServiceCards.astro` card count/copy (see §2 above).
- Any service-page hero, recognition, Track A/B, fiduciary, or method-heading copy (see §3).
- `deep-cleaning-san-jose` entirely (see §3).
- SEO titles/meta descriptions on any page.
- Pages doc 27 §9–15 has finished copy for but which do not exist in this repo yet: `/move-
  out-cleaning-san-jose/`, `/post-construction-cleaning-san-jose/`, `/window-cleaning-san-
  jose/`, `/extreme-cleaning-san-jose/`, `/rodent-dropping-cleanup-san-jose/`, pigeon-dropping
  content (doc 19 wants it folded into the animal page as an H2, which does not exist yet —
  adding it is a structural change, not a copy swap), `/property-cleanouts-san-jose/`,
  `/debris-removal-san-jose/`, `/eviction-cleanout-san-jose/`, `/commercial-cleaning-san-
  jose/`. No page exists to receive this copy; creating the pages is out of scope for a copy
  migration and not done here.

## Governance install: doc 27/20 added to precedence chain; §3/§30 promoted; build stack and reconciliations confirmed (2026-08-16)

Follow-up to the same-day "`docs/27-COPY-CANONICAL.md` adopted as homepage/service-page
copy source" entry above, which used doc 27 as a copy source before it was ever added to
`AGENTS.md`'s chain. This entry closes that gap and formally records decisions that
existed only inside doc 27's own header.

### 1. Build stack confirmed — Astro/Cloudflare is the sole live build; ChatGPT build abandoned

Doc 27's provenance note says its copy was "harvested from a separate ChatGPT-hosted build
(aseptaclean-rebuild...chatgpt.site). That build is NOT live and is NOT maintained. The
live site is Astro on Cloudflare Pages." This is now confirmed and logged, not just a
disclaimer inside one document's header: **the ChatGPT-hosted build is abandoned and
carries no authority over anything.** Doc 27 §25 and every other platform/deployment/
technical reference inside doc 27 describing that build are void — `AGENTS.md` §0.1 and
doc 19 already govern the real stack (Astro, `output: "static"`, Cloudflare Pages,
`functions/api/lead.ts`), and doc 27 was never meant to compete with them there. Doc 27's
only live authority is the copy text in §9–18.

### 2. Doc 27 and doc 20 added to `AGENTS.md`'s precedence chain

Neither file was in the chain. Doc 27 was already governing shipped copy (commits
`26bfc33`, `947dc1a`, same day) before this fix — an unranked document was governing
production copy, which is exactly the failure mode `AGENTS.md`'s own preamble exists to
prevent.

Added: rank 7 `docs/27-COPY-CANONICAL.md` (copy authority for the routes it has finished
copy for — §9–18; does not govern architecture, URLs, SEO waves, visual system, or claims,
matching doc 27's own header disclaimer) and rank 8 `docs/20-COPY-VOICE.md` (Part 2's
verbatim rewrites retired in favor of doc 27; Part 1's voice rules remain live for copy doc
27 doesn't cover and as the QA standard doc 27's own copy must pass).

Renumbered without content change: `aseptaclean-FINAL-v2.html` (7→9, note amended — see §3
below), `06-APPROVED-HOMEPAGE-COPY.md` (8→10), `11-COMPOSITION-AND-TYPE.md` (9→11),
`02-OWNER-INPUTS.md` (10→12), `07-ONE-PAGE-DIRECTIVE.md` (11→13),
`08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` (12→14).

**Type:** stale description → corrected doc (the chain didn't reflect a copy source
already live in production code). **Changed:** `AGENTS.md` §1.

### 3. Reconciliation — `aseptaclean-FINAL-v2.html`'s copy authority for `/`

A: old rank-7 note — "The FINAL-v2 override applies to `/` and covers markup, CSS custom
property values, section structure, **and copy**." (old rank 7, in the chain)

B: doc 27 §9 is the copy actually shipped on `/` as of commit `26bfc33` (same day, this
session) — Handoff Status sample, Why Aseptaclean, Five-Stage Standard, Property Handoff
Record sample, pricing intro, founder body, 4 of 7 FAQ items, and the final CTA all now
read doc 27's wording, not FINAL-v2's. (H1/lead/CTA/trust-chip text and the 3-card service
section were deliberately kept from the existing build — see the doc 19/18 conflict
resolutions logged above.)

**Resolution:** doc 27 now governs copy for `/` (new rank 7, above FINAL-v2's new rank 9).
FINAL-v2 keeps markup, CSS custom property values, and section structure for `/`; its copy
authority there is revoked. The rank-9 note is rewritten to say so explicitly instead of
leaving stale "and copy" language that already contradicted what commit `26bfc33` shipped.

**Type:** violated rule → enforced going forward (the chain now matches what the copy
migration already did, instead of the migration having silently outrun the chain).
**Changed:** `AGENTS.md` §1 rank-9 note.

### 4. Doc 27 §3 operating constraints and §30 "what should not be done next" promoted into `01-QUALITY-GUARDRAILS.md`

Doc 27's own header asserted this promotion already happened: "Promoted to active
guardrails: §3 operating constraints and §30 ... are pulled into the 01-guardrail review
chain — including the two catches prior docs missed: no complete-odor-removal claims on
porous materials, and no quote-from-photos guarantee." That claim was aspirational — doc
01 contained neither list. The two missed catches had only been enforced once, ad hoc, in
commit `947dc1a`'s animal-page FAQ additions; nothing in doc 01 required either check on
any other page.

**Fixed:** `01-QUALITY-GUARDRAILS.md` §18 (Anti-AI forensic audit) now adds both missed
catches directly to the existing "critical signs" immediate-fail list, and a new §18.1
reproduces doc 27 §3's full operating-constraints list (checked once per page) and §30's
full "what should not be done next" list (checked once per release), with a pointer back
to `AGENTS.md` §1 for logging any future conflict between these and a higher-ranked
document. A one-line pointer was also added to doc 01's top-of-file Precedence section for
discoverability.

**Type:** violated rule → enforced (the checklist Codex is supposed to run on every page
now actually contains the items doc 27 claimed it contained). **Changed:**
`01-QUALITY-GUARDRAILS.md` (Precedence section, §18, new §18.1).

### 5. Three owner reconciliations from doc 27's header, logged formally

Doc 27's header records three 2026-08-09 owner reconciliations that override the rest of
the document, but they were never entered in this log — they existed only inside doc 27
itself, which itself wasn't in the chain until item 2 above.

1. **Animal/rodent/pigeon marketing pages are ungated.** Doc 27's own "gated — do not
   publish" status on §13.2–13.4 is superseded; marketing copy for these pages may exist
   in draft. The remaining gate is operational only — confirm COI wording covers the
   organic-pathogen endorsement and a written rodent PPE/respiratory protocol before the
   first such job. Claims stay cleaning-only regardless of gate status. Only the animal
   page (`animal-waste-cleanup-san-jose`) is built today; it stays exactly where
   `AGENTS.md` §2 already puts it — noindex, excluded from the sitemap, unlinked from nav
   and footer — until its own gate clears. Rodent and pigeon dropping-cleanup pages do not
   exist in this repo yet; this reconciliation is forward-looking for when they're built,
   not a route change today.
2. **Slug convention: apply the city suffix to every service slug**
   (`/estate-cleanout-san-jose/`, not `/estate-cleanouts`), including
   `/extreme-condition-cleaning` → `/extreme-cleaning-san-jose/` (keyword-verified). This
   matches doc 19's existing slug pattern; no conflict, confirmation only.
3. **Publish timing follows doc 19's waves, not doc 27's own section order.** Doc 27
   supplies the words; doc 19 supplies the when. No conflict — doc 27's own header already
   deferred to doc 19 on this, and the rank-7 note added to `AGENTS.md` §1 (item 2, above)
   says the same thing.

**Type:** stale description → corrected doc (owner decisions that existed only in an
unranked document's header are now in the log, where `AGENTS.md` says they belong).
**Changed:** this entry only — no code or route changes; item 1 does not reopen or alter
any route's index status.

### 6. Not changed

- No copy text changed in this session — this entry is a governance/documentation pass.
  The homepage and estate/hoarding/animal service-page copy migrations already shipped in
  commits `26bfc33` and `947dc1a`.
- `06-APPROVED-HOMEPAGE-COPY.md` is not superseded outright — it still governs any route
  doc 27 doesn't have finished copy for.
- Doc 27 §25 and its other platform/deployment references describing the abandoned
  ChatGPT build are not deleted from doc 27 — only reconfirmed void, per doc 27's own
  instruction and item 1 above. Editing doc 27's own text is out of scope for a
  governance-log pass.
- `AGENTS.md` §2's built/noindex/sitemap route list is unchanged — item 5.1 above lifts a
  marketing-copy gate, not a publish gate.

## CTA/offer "24-Hour" wording retired — closes the 2026-08-07 pending item (2026-08-16)

**The conflict**, flagged but left unresolved on 2026-08-07 (see that entry above): the literal
"24-Hour" wording promised a turnaround the business-day response commitment ("within one
business day," closed Sunday) cannot always honor. That entry only fixed the *inconsistent CTA
label* half of the defect (unifying the button to `Request an assessment`, logged 2026-08-09,
`02-OWNER-INPUTS.md` line 52) — it left the underlying "24-Hour" wording itself untouched
wherever it appeared outside the button.

**What was still live.** `site.offer.leadOffer` = `"24-Hour Property Handoff Plan"`
(`src/data/site.ts`), rendered as the eyebrow label on the `/request-assessment` page
(`AssessmentForm.astro` — `data-offer-eyebrow`). Every other surface (button text, form
copy, `thank-you.astro`, doc 27 canonical copy) was already business-day-safe; this eyebrow
was the one remaining literal instance.

**Owner decision.** Retire "24-Hour" from this field. `leadOffer` becomes `"Property Handoff
Plan"` — the offending qualifier dropped, rest of the name unchanged. `Get My Handoff Plan`
(the pre-2026-08-09 header/compact CTA label) was considered and rejected as the
replacement: reintroducing it as a second live label alongside the now-unified `Request an
assessment` button would recreate the exact "two different CTA labels for one action" defect
(D3) that the 2026-08-09 unification fixed. `Property Handoff Plan` keeps the eyebrow as a
plan *name* (matching how `site.offer.name` and `site.offer.category` are already named)
rather than reintroducing a second CTA verb.

**Type:** violated rule → fixed code (a live business-days-guarantee conflict, not a stale
doc description).

**Changed:** `src/data/site.ts` (`offer.leadOffer`), `docs/06-APPROVED-HOMEPAGE-COPY.md`
(§8.4, §8.18 — stale `Get My 24-Hour Handoff Plan` CTA text corrected to the actual current
CTA, `Request an assessment`, matching the correction already recorded in `02` and `04`),
`docs/02-OWNER-INPUTS.md` (Lead offer fact + corrected-from-previous-version table).

**Not changed:** `docs/aseptaclean-FINAL-v2.html` and `docs/27-COPY-CANONICAL.md` — neither
ever contained "24-Hour" or a `leadOffer`-equivalent field; no edit needed there.

## Root `TOKEN-MAP.md` deleted — duplicate file, stale palette (2026-08-16)

**The conflict.** Two files named `TOKEN-MAP.md` existed in the repo — root `/TOKEN-MAP.md`
and `docs/TOKEN-MAP.md` — with substantively different contents and neither one named in
`AGENTS.md`'s precedence chain. `diff` showed they disagreed on nearly everything: the color
palette (root: Navy `#1C355E`, Deep Navy `#122840`, Slate Blue `#6A9BC3`, Steel `#A8B8C8` —
the same values recorded in `11-COMPOSITION-AND-TYPE.md` §10.1; docs: `navy-950 #0b1830`,
`navy-900 #10233f`, `navy-800 #1c355e`, `navy-700 #27436f`, plus a full measured contrast
audit), the type scale (root: `--ac-text-h1` maxes at `3.8rem`; docs: `4.25rem`), and the
rhythm tokens (root: `standard`/`open`/`vast` all collapsed to one identical clamp value;
docs: same collapse, but documented as a known defect rather than left silent).

**Which one is real, verified by grep against the live source of truth:**
```
$ grep -n "\-\-ac-color-navy\|\-\-ac-color-ink-400\|\-\-ac-color-steel-300" src/styles/tokens.css
10:  --ac-color-navy-950: #0b1830;
11:  --ac-color-navy-900: #10233f;
12:  --ac-color-navy-800: #1c355e;
13:  --ac-color-navy-700: #27436f;
28:  --ac-color-ink-400: #617087;
47:  --ac-color-steel-300: #8494a8;
```
Every value matches `docs/TOKEN-MAP.md` exactly. None match the root copy — the root copy
documents the palette from before the FINAL-v2 port (also the palette still printed in
`docs/11-COMPOSITION-AND-TYPE.md` §10.1, which that file's own header already marks as
migrated/historical text, not a live token source).

**Why this mattered beyond a stale file sitting unread:** the root copy was reportedly in
active use as a reference by an external design session working from this repo — i.e., not
just dead weight, but a document actually capable of steering a build toward the wrong,
pre-port palette while looking equally authoritative as the correct one.

**Reference check before deletion** — confirmed no file pointed at the root copy by path
(everything either says `docs/TOKEN-MAP.md` explicitly or is a bare `TOKEN-MAP` mention in a
docs-only context that already resolves to the docs copy):
```
$ grep -rn "TOKEN-MAP" --include="*.md" --include="*.astro" --include="*.ts" .
DELETE-MANIFEST.md, docs/23-BUILD-REQUIREMENTS-FROM-RESEARCH.md, docs/REPO-STATE.md,
docs/05-DECISIONS-LOG.md — all reference docs/TOKEN-MAP.md or an unqualified "TOKEN-MAP" in
a docs-context sentence. Zero references to the root path specifically.
```

**Decision.** Root `/TOKEN-MAP.md` deleted. `docs/TOKEN-MAP.md` is canonical — it is the file
`AGENTS.md`, this log, and every other document meant when they said "TOKEN-MAP.md" without
a path. Post-deletion re-grep confirmed zero remaining references to the root file.

**Type:** duplicate/stale file → deleted (source-of-truth conflict, not a precedence-chain
conflict — the file was never ranked, so this is cleanup, not an `AGENTS.md` §1 resolution).

**Changed:** deleted `/TOKEN-MAP.md`. No other file edited — every existing reference already
pointed at `docs/TOKEN-MAP.md`.

## SITEMAP-MASTER supersession + route reconciliation (2026-08-16)

**The decision (owner-issued, rank 1 in `AGENTS.md` §1 — outranks doc 19 and doc 27
directly).** `docs/SITEMAP-MASTER.md` is now the single source of truth for routes and index
status. It supersedes the sitemaps in doc 19 §2.1 and doc 27 §7. One-line pointers were added
at the top of both sections directing to master; neither section was rewritten wholesale —
doc 19 §2.1's per-page SEO detail (§2.2) and doc 27 §7's copy-section grouping still resolve
readers to the right spec, so both stay as reference material subordinate to master. `AGENTS.md`
§2's route lists were also refreshed in the same pass, since they're a route inventory that
would otherwise immediately go stale, and a pointer to master was added there too. While in that
section, corrected a pre-existing, unrelated drift: `/about/`, `/contact/`, and
`/handoff-standard/` ship no `noindex` prop (confirmed by grep) but were absent from the "Live
and indexable" list, and `/contact/` was wrongly listed under "Built, noindex." Fixed in place
since it's the same block being edited; not otherwise investigated further.

**Copy-source correction inside master itself.** Master's table lists the three category hub
rows' copy source as "27 §12 intro," "27 §13 intro," and "27 §14 intro." Doc 27 has no hub-level
intro text at §12–14 — those sections are the individual service-page specs (12.1, 13.1, 14.1,
etc.), not hub copy. The actual hub copy (Route/Eyebrow/H1/Lead/Cards for all four categories)
lives at doc 27 §10.1–10.4, the section literally titled "Service hub copy." Built the three new
hub pages from §10.1–10.3 on that basis. Not a precedence-chain conflict (master still wins on
routes/index-status), just a copy-source pointer inside master that pointed at the wrong section
number — flagged here rather than silently guessed past.

**Route rename.** `/property-cleanouts-for-managers/` → `/property-cleanouts-san-jose/`
(`src/pages/property-cleanouts-for-managers/` → `src/pages/property-cleanouts-san-jose/`,
`propertyManagersPage.slug` in `servicePages.ts`), matching master's city-suffixed slug. 301
added in `public/_redirects`. This was the only built route whose slug diverged from master —
every other built service page (`estate-cleanout-san-jose`, `hoarding-cleanup-san-jose`,
`animal-waste-cleanup-san-jose`, `deep-cleaning-san-jose`, `senior-downsizing-san-jose`) already
matched. **What was not done:** the page's copy still frames the audience as "for managers"
(Pure Track B, PM/turnover-specific), while master's copy source for this route is doc 27
§14.1's audience-neutral "Property Cleanouts." This is a copy-framing gap, not a routing one —
rewriting the page to match §14.1 would be a content change beyond "rename the route to its
city-suffixed slug," so it was left as-is. Follow-up, not resolved here.

**Four pages built** (all noindex, excluded from `sitemap.xml.ts`, unlinked from nav/footer —
same pre-launch pattern as every other draft in this batch; see gate fields in
`servicePages.ts`): `/detailed-cleaning/`, `/specialty-cleaning/`, `/property-clearing/` (card
hubs, doc 27 §10.1–10.3 copy verbatim; cards link only to already-built sibling pages, the rest
render as plain unlinked text rather than a dead link) and `/commercial-cleaning-san-jose/`
(full service page, doc 27 §15 copy, gate: crew per master). Commercial's H1 was rewritten from
doc 27's literal "Commercial & Janitorial Cleaning" to a buyer's-words H1 ("Commercial cleaning
with a written operating scope") under the standing doc-19-beats-doc-27-on-H1s precedent already
logged elsewhere in this file.

**What was deliberately not done, and why:**
- Existing pages' `noindex` status was **not** changed. Master's "index" column is target
  end-state per page, not a live-now directive — every existing service page in this repo ships
  `noindex={true}` pending its own individual launch gate (confirmed: `estate-cleanout-san-jose`
  itself is marked "index ← highest value" in master yet still ships noindex today). Flipping any
  of that here would be a launch decision, not a routing reconciliation.
- Individual sub-service pages named in master but not yet built (`move-out-cleaning-san-jose`,
  `post-construction-cleaning-san-jose`, `window-cleaning-san-jose`, `extreme-cleaning-san-jose`,
  `rodent-dropping-cleanup-san-jose`, `pigeon-dropping-cleanup-san-jose`,
  `debris-removal-san-jose`, `eviction-cleanout-san-jose`) were **not** built — out of the task's
  explicit scope (four named hub/category pages only).
- `/services/` and `/who-we-help/` — indexable, in nav/footer/sitemap, built under the
  now-superseded Phase 3d IA — were **not** touched, removed, or redirected. Master's route tree
  has no equivalent for either. This is a real, pre-existing discrepancy (also independently
  visible in `AGENTS.md` §2's "do not build any `/services/*` route" line, which the code already
  violates) that route-audit or a future session should resolve explicitly rather than have this
  session guess at removing live, linked pages.
- `senior-downsizing-san-jose` is grouped under Property Clearing in master but doesn't appear
  in doc 27 §10.3's hub card list — omitted from the new `/property-clearing/` hub's cards to
  stay verbatim to doc 27 hub copy, per the task's explicit instruction to build hubs "using doc
  27 hub copy."

**Verification run:** claims-check (clean — zero banned-vocabulary hits across all new/changed
copy), type-law (clean — no new heading `font-size` declarations; H1 ratio inherited unchanged
from the existing `CompactHero` component), route-audit (clean — no redirect collisions or
chains, no accidental sitemap/nav inclusion, no other stale references to the old PM path),
`npm run build` (29 pages generated, all four new routes + the renamed route present, all
correctly `noindex`).
