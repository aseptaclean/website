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

No styling was touched this session, per instruction.
