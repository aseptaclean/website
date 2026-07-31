# Phase 4 Session 1 — Audit and Baseline

**Date:** 2026-07-30
**Branch:** `phase-4-session-1` @ `88ab2a6`
**Scope:** Read-only audit per `docs/12-SESSION-PROMPTS.md` Session 1. No application code was written or modified this session. Two files were produced: this report and `docs/baseline/home-390.png` / `docs/baseline/home-1440.png`.

---

## Executive summary — the four findings that matter most

1. **The lead endpoint has no path to production traffic at all.** `src/pages/api/lead.ts` — the file AGENTS.md names as the one canonical endpoint — does not exist. The only implementation is `functions/api/lead.ts`, written as a Cloudflare Pages Function. But this repo has no `wrangler.toml`, no Cloudflare Pages project config, and no `@astrojs/cloudflare` adapter. The artifact that actually gets deployed (`sites/worker.js`, copied to `dist/server/index.js` for an `.openai/hosting.json` target) is a bare static-asset server with zero knowledge of `functions/`. In the current configuration, **neither file receives traffic** — see item 3.
2. **The `--ac-` token system does not exist yet.** `grep` for `--ac-` across `src/` returns zero results. `src/styles/tokens.css` still uses the pre-Phase-4 unprefixed names (`--color-*`, `--text-*`, `--step-*`, `--space-*`). The standing rule ("Keep `--ac-`. Adopt canonical values.") describes a target state, not the current one. See item 6.
3. **Headings still carry `font-size` at the tag level, exactly as `docs/11-COMPOSITION-AND-TYPE.md` describes as "the whole bug."** `src/styles/global.css:59-71` sets `h1 { font-size: var(--text-h1); }`, `h2 { font-size: var(--text-h2); }`, `h3 { font-size: var(--text-h3); }` globally, and `Hero.astro` and `HandoffStandard.astro` add component-level overrides on top. Session 3 of the plan has not been run. See item 4/5.
4. **`/private-residence-reset/` is fully built, linked in the footer, and in the sitemap** — but the repo's own governing documents disagree on whether it should exist yet. I did not silently resolve this; see the conflict note under item 4.

Otherwise, the compliance news is good: no hardcoded phone/email/address strings outside the config module, no Montserrat/Open Sans, no "hoarder" as a noun, no "free assessment" language, none of the four retired guarantee names, and no fabricated proof/placeholder blocks anywhere in rendered copy.

---

## 0. §0 resolution — canonical document identity

`docs/07-ONE-PAGE-DIRECTIVE.md` §0 could not read three files at the time it was written and left placeholders. They are resolved here with certainty, on two independent lines of evidence: (a) the precedence chain already written into the live `AGENTS.md` at the repo root, which names full filenames rather than the `…` placeholders in `docs/AGENTS-PRECEDENCE-BLOCK.md`, and (b) each candidate file's own content matching its assigned role.

| Placeholder | Resolves to | Evidence |
| --- | --- | --- |
| `{CANONICAL}` | `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | `AGENTS.md` line 32 names it explicitly as "the Phase 4 canonical master specification." Content matches: it is the file that reconciles the phase-definition conflict, the expansion-rule conflict, typography authority, and lists the Phase 4 acceptance conclusion — the role `docs/07` §0 and §1 describe. |
| `{RESIDENCE}` | `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | `AGENTS.md` line 37 names it explicitly, "Phase 2 only, not part of the launch build." Content matches: full `/private-residence-reset/` implementation spec (route, SEO, hero, Residence Baseline artifact, form variant). |
| `{OLD-VISUAL}` | `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` | Absent entirely from `AGENTS.md`'s precedence chain (every other numbered doc appears; this one does not), consistent with being superseded. `docs/11-COMPOSITION-AND-TYPE.md` line 5 states outright: "Supersedes: `09-PREMIUM-VISUAL-AND-TYP…` — archive it in Session 2." Content confirms it is the same file: fonts, color tokens, and an 8-movement homepage composition duplicated (and superseded) by `docs/11`. |

**Note on `docs/08`:** its own line 3 says "This implementation spec applies the approved strategy in `docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md`" — that filename does not exist anywhere in `docs/`. Either the strategy document was never created as a separate file or was consolidated into `08` itself. Flagging as a dangling reference, not a blocker.

This resolution has been appended to `docs/05-DECISIONS-LOG.md`.

---

## 1. Full `docs/` inventory

| File | One-line purpose |
| --- | --- |
| `00-MASTER-BRIEF.md` (1919 lines) | The original full business/strategy brief — offer, ICP, five-stage mechanism, risk reversal, homepage copy source. Superseded for scope by `07`, kept for reference per `AGENTS.md`. |
| `01-QUALITY-GUARDRAILS.md` (1215 lines) | "$20K-caliber" quality bar and anti-AI blacklist — the claims/craft rulebook run against every sentence before shipping. Second-highest authority after current law. |
| `02-OWNER-INPUTS.md` | The confirmed-business-facts gate: approved values vs. what still needs owner confirmation before production release, plus suppression rules. |
| `03-BUILD-PLAN.md` | Original phase-by-phase (0–6) multi-page build plan. Superseded for scope/routes by `07`; kept for reference. |
| `04-RELEASE-CHECKLIST.md` | The living, scored release checklist. Currently shows a Phase 4 closeout pass dated 2026-07-30 with a final call of **BLOCKED** (real-credential lead delivery never exercised). |
| `05-DECISIONS-LOG.md` | Append-only log of owner-approved decisions. This session appends the §0 resolution. |
| `06-APPROVED-HOMEPAGE-COPY.md` | Authoritative homepage wording (a convenience extract of Master Brief §8) — emotional-outcome edition. Controls all homepage copy per the precedence chain. |
| `06-ASSET-MANIFEST.md` | Log of every real asset (brand wordmarks, fonts, sample documents) with source, license, and proof status. Duplicate `06-` prefix is cosmetic per `07` §12. |
| `07-ONE-PAGE-DIRECTIVE.md` | **This session's driving document.** Collapses the multi-page plan to a four-route site, resolves 14 named conflicts, sets the `/` section map and config. |
| `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | The Private Residence Reset campaign page implementation spec — Phase 2, not part of the launch build. `{RESIDENCE}`. |
| `09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` | The older premium visual/typography spec (8-movement homepage, Newsreader/Instrument Sans, color tokens). Superseded by `11`. `{OLD-VISUAL}`. |
| `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | **The Phase 4 canonical master specification.** `{CANONICAL}`. Diagnoses authority drift across the doc set and sets the repair agenda this whole session plan executes. |
| `11-COMPOSITION-AND-TYPE.md` | Binding type-scale, measure, and rhythm authority for `/`. Names the exact mechanism ("headings styled by tag") behind the site's current inconsistency and supersedes `09`. |
| `12-SESSION-PROMPTS.md` | The nine-session build script this document's own instructions were copied from. |
| `AGENTS-PRECEDENCE-BLOCK.md` | A patch block meant to be merged into root `AGENTS.md`; contains the pre-resolution `…` placeholders. Root `AGENTS.md` already carries the resolved version — this file is now stale/reference-only. |
| `archive/` (6 files, not opened) | Per `AGENTS.md`: "never read from here." Filenames only: `INSTALL-PHASE-4-UPDATE.md`, `PHASE-4-CLOSEOUT-PROMPT.md`, `PHASE-4-CODEX-PROMPT.md`, `PHASE-4-COMPOSITION-AND-TYPE.md`, `PHASE-4-ONE-PAGE-DIRECTIVE.md`, `PHASE-4-SESSION-PROMPTS.md` — these read as earlier drafts of the current `07`/`11`/`12` docs, already superseded and correctly archived. |

---

## 2. Repository inventory

### Routes — `src/pages/`
- `index.astro` → `/`
- `request-assessment.astro` → `/request-assessment/`
- `thank-you.astro` → `/thank-you/`
- `privacy.astro` → `/privacy/`
- `terms.astro` → `/terms/`
- `cookie-policy.astro` → `/cookie-policy/`
- `private-residence-reset.astro` → `/private-residence-reset/`
- `robots.txt.ts`, `sitemap.xml.ts` — dynamic endpoints, not pages

No `src/pages/api/` directory exists at all.

### Components — `src/components/` (21 files)
`Analytics`, `AssessmentForm`, `CategoryContrast`, `FAQ`, `FinalCTA`, `Footer`, `FounderAuthority`, `HandoffAssurance`, `HandoffRecord`, `HandoffStandard`, `Header`, `Hero`, `LegalPolicy`, `MobileCTA`, `OutcomeComparison`, `PricingContext`, `ProcessTimeline`, `Qualification`, `ResidenceBaselineRecord`, `ScopeIncluded`, `SeoHead` (21 total; see item 4 for per-component detail).

### Stylesheets — `src/styles/`
- `tokens.css` — the single token file (unprefixed naming; see item 6)
- `global.css` — base element styles, including the global heading `font-size` rules flagged in item 5
- `fonts.css` — two `@font-face` declarations, self-hosted WOFF2 from `node_modules/@fontsource-variable/*`

### `functions/`
- `functions/api/lead.ts` — full Cloudflare Pages Function: origin check, R2 storage (`env.LEAD_UPLOADS`), optional KV rate limiting (`env.LEAD_RATE_LIMIT`), Turnstile, idempotency, then HubSpot/Resend/Twilio via `functions/_lib/providers.ts`, with fallback-email-on-SMS-failure logic.
- `functions/_lib/lead.ts` — validation, hashing, callback-window, filename-safety helpers.
- `functions/_lib/providers.ts` — the four provider integrations (Turnstile, HubSpot, Resend, Twilio).

This is a complete, well-built implementation. It has no deployment wiring in this repo — see item 3.

### `scripts/` (10 files)
QA/build tooling: `validate-env.mjs` (build-time env gate), `prepare-sites-output.mjs` (packages `dist/` for the `.openai` hosting target), and eight `phase{1,2,3,4}-*-check.mjs` Playwright/endpoint QA scripts accumulated across phases.

### `artifacts/`
Evidence archive, one directory per phase: `brand/`, `phase-1/` … `phase-4/` (with `phase-4/{baseline,live,final,interim,private-preview,reports}` subfolders) — screenshots, Lighthouse output, and QA reports from prior sessions.

### `sites/`
- `worker.js` — a minimal `fetch(request, env)` handler that serves static assets via `env.ASSETS.fetch`, with trailing-slash/extension-less path rewriting to `index.html`. This is **not** a Cloudflare Pages/Workers deployment in the conventional sense (no `wrangler.toml` anywhere in the repo) — it is packaged by `scripts/prepare-sites-output.mjs` into `dist/server/index.js` alongside `dist/.openai/hosting.json` (`{"project_id": "appgprj_..."}`), i.e. the actual deployment target is an OpenAI-hosted "Sites" project, not a directly configured Cloudflare account. See item 3.

### Dependencies (`package.json`)
- **`astro`: `^7.1.6`** — installed version confirmed at `node_modules/astro/package.json` = `7.1.6`. This matches the freeze in `07-ONE-PAGE-DIRECTIVE.md` §8 ("Astro 7.1.x... freeze at installed major").
- **`@astrojs/cloudflare`: not installed. Not present anywhere in `package.json`, `node_modules/@astrojs/`, or the lockfile.** `astro.config.mjs` sets `output: "static"` with no adapter at all — confirms item 3.
- `@fontsource-variable/instrument-sans`: `^5.3.0`
- `@fontsource-variable/newsreader`: `^5.3.0`
- devDependencies: `@astrojs/check ^0.9.4`, `@axe-core/playwright ^4.12.1`, `lighthouse ^13.4.1`, `playwright-core ^1.62.0`, `typescript ^5.9.2`
- No React/Vue/Svelte/UI kit/CMS/animation library — matches the AGENTS.md stack constraint.

---

## 3. The lead endpoint — no duplication, but no traffic path either

`src/pages/api/lead.ts` does **not exist**. There is nothing to duplicate. The only implementation is `functions/api/lead.ts`.

But nothing in this repository wires `functions/` into the actual deployment:
- No `wrangler.toml`, `wrangler.jsonc`, or any Cloudflare Pages/Workers project file exists anywhere in the tree.
- `astro.config.mjs` uses `output: "static"` with no adapter — Astro itself has no server-side routing capability in this build, so `src/pages/api/lead.ts` (even if it existed) would not function as a live endpoint without switching to `output: "server"`/`"hybrid"` plus `@astrojs/cloudflare`.
- The actual production artifact, per `scripts/prepare-sites-output.mjs`, is `sites/worker.js` copied verbatim to `dist/server/index.js`, deployed against `.openai/hosting.json`'s `project_id`. That worker is a pure static-file server (`env.ASSETS.fetch` plus path rewriting) with no reference to `functions/`, no R2/KV bindings, and no route for `/api/lead`.

**Conclusion: in the current configuration, neither endpoint receives production traffic.** `functions/api/lead.ts` is a complete, correct implementation of the canonical lead architecture with nowhere to run. This is consistent with (and explains) `04-RELEASE-CHECKLIST.md`'s own finding: `PUBLIC_FORM_ENABLED=false` in `.env.production`, no provider credentials anywhere, and a final release call of **BLOCKED** on exactly this gap. Do not delete `functions/api/lead.ts` — it is the one substantial, working piece of lead-delivery logic in the repo. The open question is which deployment target this project is actually shipping to (Cloudflare Pages, as every doc assumes, or the OpenAI Sites hosting the build artifacts are shaped for) — that determines whether the fix is "add `wrangler.toml` and a Pages Functions binding config" or "port the lead logic into an `src/pages/api/lead.ts` server route under a different adapter." This is an owner/architecture decision, not something to guess at.

---

## 4. Routes and components against directive §2 — KEEP / DELETE / ABSORB / REWRITE

### Routes

| Route | Call | Reasoning |
| --- | --- | --- |
| `/` | **KEEP** | The flagship, per §2. |
| `/request-assessment/` | **KEEP** | Named in §2. |
| `/thank-you/` | **KEEP** | Named in §2, noindex confirmed. |
| `/privacy/`, `/terms/`, `/cookie-policy/` | **KEEP** | §2 lists these as Termly-controlled legal routes (directive's own text shows `/privacy-policy/` but the live routes are `/privacy/` — cosmetic naming difference, not a scope violation; all three are Termly-integration surfaces via `LegalPolicy.astro`). |
| `/private-residence-reset/` | **CONFLICT — flagging, not resolving.** | `docs/07` §2 places this under "Phase 2, after `/` is live and converting" — not part of the launch build. `AGENTS.md`'s own Scope section is more direct: "Do not create... a `/private-residence-reset/` route during the launch build. If a task appears to require a new route, stop and ask." But `docs/10` (canonical, and higher-precedence than `07` in `AGENTS.md`'s own chain) already resolved this as "add one controlled exception... Handoff Reset remains the flagship... no broader services menu" — and `04-RELEASE-CHECKLIST.md` shows the page was built and scored under that resolution, out of primary nav, with a single footer link, matching `10`'s conditions. The route currently exists, is fully built, is in the sitemap, and has one footer link — i.e., it already matches the shape `10` and `08` describe. What's unresolved is timing: `07` §2's gate is "after `/` is live and converting," and `/` is not yet converting (form disabled, `04` = BLOCKED). Recommend the owner decide explicitly: keep it live as `10` permits, or pull it until the gate in `07` §2 is met. I have not deleted it. |
| API routes | **N/A** | No `src/pages/api/` exists; see item 3. |

Every other route from the old multi-page plan (services, locations, audience, resources pages) — none exist in `src/pages/`. Nothing to delete there.

### Components

No component **filename** references a retired concept (four named guarantees, "Defined Scope Document," "Completion Record," or the Assess/Define/Authorize/Clear/Document sequence) — confirmed by repo-wide grep, zero hits outside `docs/`.

| Component | Call | Notes |
| --- | --- | --- |
| `Hero.astro` | **REWRITE** | Correct content; violates the no-font-size-on-heading-tag rule directly (`h1 { font-size: var(--text-h1); }` at line 142). Needs the §1/§3 token and role-class rework. |
| `Qualification.astro` | **REWRITE** | Content is sound (fit/non-fit framing) but per `docs/07` §9 row 7, "fit/non-fit" belongs inside the single **Confidence and fit** movement, not as a standalone first section. Currently occupies homepage position 2 on its own. |
| `OutcomeComparison.astro` | **KEEP, reposition** | This is movement 3 ("What finished feels like") in substance, but sits at position 3 in the current flat 12-section stack rather than as the `bleed`/`vast`-rhythm dramatic pause `docs/11` §5 specifies. Content stands; composition needs the §5 treatment. |
| `CategoryContrast.astro` | **KEEP** | Matches directive movement 4 in name and content ("continuous comparison," not three cards). Heading font-size violation present (`h2`, `h3` selectors — verify against global default before assuming override). |
| `HandoffStandard.astro` | **KEEP, minor fix** | Matches movement 5 (Five-Stage rail: Scope → Protect → Clear → Reset → Verify — the correct, current sequence, not the retired one). Contains a heading-tag font-size violation at `.standard__stages h3 { font-size: var(--step-1); }`. |
| `HandoffRecord.astro` | **KEEP** | The Property Handoff Record artifact, correctly nested inside `HandoffStandard`, matching movement 6's role. Labeled "Sample / Not a client record" correctly. |
| `ScopeIncluded.astro` | **ABSORB** | Directive §9 row 7 groups scope into the single Confidence-and-fit movement with assurance/price/founder. Currently a standalone section (position 6/12), exactly the fragmentation `04-RELEASE-CHECKLIST.md` already flagged. |
| `HandoffAssurance.astro` | **ABSORB + REWRITE** | Same fragmentation issue. Also: only 5 assurance items are present (`src/data/site.ts` `homepage.assurance`); the directive §6-mandated sixth item — discretion, written operationally (unmarked vehicles, plain clothing, no signage, no neighbor conversation) — has not been added. |
| `PricingContext.astro` | **ABSORB** | Same fragmentation issue; content (starting price, $195 assessment) is accurate and config-driven. |
| `FounderAuthority.astro` | **ABSORB** | Same fragmentation issue; content and disclaimer are correct. |
| `ProcessTimeline.astro` | **DELETE (or fold in)** | This is the "old process page" §9 row 5 says is absorbed into the Five-Stage Standard. It currently duplicates that sequence as an unrelated standalone "09 / What happens next" section, sitting entirely outside the 8-movement map — exactly what `04-RELEASE-CHECKLIST.md` already identified as a defect. Its content (a numbered "tell us → receive plan → confirm scope → approve → walk back in" list) is useful as *final-decision* framing but should not be a 12th full section. |
| `FAQ.astro` | **KEEP, content gap** | Structurally correct (native `<details>`, matches directive's "canonical set plus one addition" instruction) but the required addition — "Do you handle properties with heavy accumulation or hoarding conditions?" per `docs/07` §4 — is **not present** in `src/data/site.ts`'s 10-item FAQ list. |
| `FinalCTA.astro` | **KEEP** | Matches movement 8. Heading font-size violation present (`h2`). |
| `Header.astro`, `Footer.astro`, `MobileCTA.astro`, `Analytics.astro`, `SeoHead.astro`, `LegalPolicy.astro` | **KEEP** | Site-wide chrome/infrastructure, not homepage movements; no retired-concept references; config-driven throughout. |
| `AssessmentForm.astro` | **KEEP** | Backs `/request-assessment/`; references `PUBLIC_FORM_ENDPOINT`/Turnstile via config, correctly gates on `formEnabled`. |
| `ResidenceBaselineRecord.astro` | **KEEP** | Backs `/private-residence-reset/`, matches `docs/08` §7's Residence Baseline artifact spec; uses its own distinct "Assess → Define → Reset → Verify → Maintain" sequence, which is the correct spec-defined sequence for that page (`docs/08` §6), not the retired Handoff sequence. |

**Net homepage shape today: 12 flat, equally-weighted sections** (`Hero, Qualification, OutcomeComparison, CategoryContrast, HandoffStandard, ScopeIncluded, HandoffAssurance, PricingContext, FounderAuthority, ProcessTimeline, FAQ, FinalCTA`) against a target of **8 movements**. This matches `04-RELEASE-CHECKLIST.md`'s own "Homepage composition" partial finding almost exactly — this audit did not discover a new problem here, it confirms and re-locates an already-flagged one. Session 3/4/5 of the plan (type/composition rebuild, then movement-by-movement rewrite) has not yet been executed.

---

## 5. Grep sweep — hardcoded facts, banned phrases, retired terms, fonts, placeholders

| Search | Result |
| --- | --- |
| Hardcoded phone (`(408)`, `785-7588`, etc.) | **Zero hits in `src/`.** Only appears in `.env.production` (correct location) and `docs/`. |
| Hardcoded email (`info@aseptaclean.com`) | **One hit**, and it's the correct one: `src/data/site.ts:21`, the config module's own fallback default (`value("PUBLIC_EMAIL", "info@aseptaclean.com")`). This is centralization working as intended, not a violation. |
| Hardcoded street address | **Zero hits.** Consistent with `addressPolicy`: "service-area business — no published street address." |
| "free assessment" / "free on-site" / "free consultation" | **Zero hits in `src/`.** |
| "hoarder" used as a noun | **Zero hits in `src/`.** (Appears only inside `docs/` discussing the rule itself.) |
| "Nothing Leaves", "Fixed Scope", "Discretion Standard", "Next-Day Scope" | **Zero hits anywhere in `src/`.** |
| Montserrat, Open Sans | **Zero hits in `src/`.** Fonts are already Newsreader Variable / Instrument Sans Variable throughout `fonts.css` and `tokens.css`. |
| Proof placeholder blocks | **None found.** No `Lorem ipsum`, `TODO`, `FIXME`, or `{{...}}` template-leak markers in rendered copy. The only `placeholder=` hits are legitimate HTML form-field placeholder attributes in `AssessmentForm.astro`. |
| Retired sequence "Assess/Define/Authorize/Clear/Document" | **Zero hits.** (`ResidenceBaselineRecord`'s "Assess/Define/Reset/Verify/Maintain" is a different, spec-correct sequence for that page — see item 4.) |
| §4 situational search language (heavy accumulation, inherited/estate, whole-house cleanout, "a property nobody can get to") | **Partial gap.** "Estate" appears in `src/data/assessment.ts` (form field options: "Inherited or estate property," "Executor or estate representative") but the homepage Recognition-type copy (`Qualification.astro`) does not carry this situational language yet — it implies the situation ("family members may disagree," "managing from another city") without the SEO-bearing phrasing `docs/07` §4 specifically asks for. Not a violation of a prohibition, but an unmet requirement. |

---

## 6. `--ac-*` token inventory

**There are none.** `grep -rn -- "--ac-" src/` returns zero results. Every `--ac-*` token referenced anywhere in this repository exists only inside `docs/` (as specification, not implementation) — 07, 11, 12, and the archived Phase 4 drafts.

The current, actually-implemented token system in `src/styles/tokens.css` uses the **unprefixed** naming the directive explicitly says to retire in favor of `--ac-`:

| Category | Current tokens (no `--ac-` prefix) | Consumption |
| --- | --- | --- |
| Color | `--color-navy-900`, `--color-navy-800`, `--color-blue-500`, `--color-steel-300`, `--color-ink-700`, `--color-ink-500`, `--color-paper`, `--color-warm-white`, `--color-rule`, `--color-focus`, `--color-error`, `--color-success` | Every component's `<style>` block; `global.css` |
| Font family | `--font-display`, `--font-sans`, plus compatibility aliases `--font-heading`/`--font-body` (both mapped to `--font-sans` — the comment at `tokens.css:19-20` notes this is an intentional Phase 1–3 compatibility shim) | All components |
| Type scale | `--text-xs` … `--text-h1`, plus a parallel `--step--1` … `--step-4` alias set mapped 1:1 onto the same values | `global.css` (base heading rules), most components for body/lead/small text |
| Spacing | `--space-1` … `--space-8` | Nearly every component |
| Layout | `--content-wide`, `--content-reading`, `--content-lead`, `--content-narrow`, `--gutter`, `--radius-small`, `--radius-control` | Section containers |
| Misc | `--shadow-focus`, `--transition-fast`, `--sticky-cta-height` | Focus rings, `MobileCTA.astro` |

None of this maps to `docs/11` §2's role-based scale (`--ac-text-display/h1/h2/h3/lead/body/sm/xs`), §3's measure tokens (`--ac-measure-intimate/read/wide/bleed`), or §4's rhythm tokens (`--ac-rhythm-tight/standard/open/vast/band`). `docs/TOKEN-MAP.md`, which `07` §3 row 8 and `12` Session 3 both call for, does not exist yet either. This is Session 3 work in full, not partially done.

---

## 7. Config module

**`src/data/site.ts`** is the existing, single config module holding phone, email, hours, service area, pricing, CTAs, and integration settings (Termly, analytics, form endpoint, Turnstile key). It reads from `import.meta.env` with typed fallback defaults via a local `value()` helper, matching `docs/07` §10's field list almost exactly (phone, phoneUri equivalent via computed `tel:` hrefs in consuming components, email, hours, serviceArea, insuranceLine as `insuranceStatus`, assessmentFee, projectFloor as `startingPrice`, responseTime, founder). `src/data/assessment.ts` holds the separate assessment-form field/option data. No new config module should be created — none of this needs to change structurally, only be populated with the `docs/07` §10 values (already mostly done) and reconciled against `02-OWNER-INPUTS.md` where gaps remain (e.g., `PUBLIC_PHONE`/`PUBLIC_SMS_NUMBER` are blank in the committed `.env.example`, populated only in the private `.env.production`, which is correct handling, not a gap).

---

## 8. Screenshots

Captured from the already-running local dev server (`astro dev`, `localhost:4321`) using Playwright's bundled Chromium, full-page:

- `docs/baseline/home-390.png`
- `docs/baseline/home-1440.png`

Visually, both confirm item 4's finding: a long, flat sequence of full-width, equally-weighted sections (12 in total) rather than the 8-movement composition with varying container/rhythm/surface `docs/11` §5 specifies. The Property Handoff Record artifact and the navy category-contrast band are the only two moments that visually interrupt the pattern; per `docs/11`'s own failure audit, this reads closer to a template than to authored variation, though not egregiously — no more than two dark sections ever run consecutively, and the artifact panel is genuinely distinct.

---

## What I did not do

Per instructions, I did not delete, rewrite, or reconfigure anything. `functions/api/lead.ts`, `src/styles/tokens.css`, `docs/09`, `docs/03`, `docs/00`, and every component above are untouched. The only two artifacts this session produced are this file and the two baseline screenshots.

## Open questions for the owner before Session 2 proceeds

1. **Deployment target.** Is this project actually deploying to Cloudflare Pages (as every doc assumes), or to the OpenAI Sites hosting implied by `.openai/hosting.json` and `sites/worker.js`? This determines whether Session 2's "resolve the duplicate lead endpoint" step is even the right framing — right now there is no duplicate, there is an orphaned implementation and a missing one.
2. **`/private-residence-reset/`** — keep it live under `docs/10`'s "controlled exception," or pull it until `docs/07` §2's "after `/` is live and converting" gate is actually met?

I'm stopping here per the session script. Let me know how you'd like to proceed on Session 2, and on the two questions above.
