# Phase 4 Closeout Execution Prompt

We are still in Phase 4. Most of the corrective build already exists in the working tree (uncommitted). This prompt is not a restart — it closes out what remains before Phase 4 can ship.

Do not restart the project, scaffold a second Astro site, or discard existing Phase 1–4 work.

Read in this order:

1. `AGENTS.md`
2. `docs/00-MASTER-BRIEF.md`
3. `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`
4. `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md`
5. `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md`
6. `docs/06-APPROVED-HOMEPAGE-COPY.md`
7. `docs/06-ASSET-MANIFEST.md`
8. `docs/05-DECISIONS-LOG.md`
9. `docs/04-RELEASE-CHECKLIST.md`
10. This file.

## Where things stand (verified 2026-07-30)

Already built, uncommitted, in the working tree:

- Self-hosted Newsreader Variable + Instrument Sans Variable (`src/styles/fonts.css`, `tokens.css`, `global.css`, `package.json`).
- `/private-residence-reset/` campaign page + `ResidenceBaselineRecord.astro`, wired into `src/data/site.ts`.
- Termly-controlled legal routes (privacy, terms, cookie-policy) and `Analytics.astro` (consent-gated).
- Lead form/offer-variant plumbing in `functions/_lib/lead.ts` and `providers.ts`.
- Audit tooling: `scripts/phase4-deep-check.mjs`, `scripts/phase4-static-audit.mjs`.

Already confirmed passing (`artifacts/phase-4/reports/*.json`, `npm run check`):

- Type-check: 0 errors, 0 warnings.
- Static audit: one H1 per route, correct canonicals, sitemap includes campaign + cookie-policy, blanket `noindex`/`Disallow` (still staging), 0 client-bundle secret leaks, 0 banned-claim phrases.
- Responsive audit: 320/390/768/1024/1280/1440 captured for every route, 0 horizontal-overflow rows.

Known open defect:

- **axe accessibility: `color-contrast` (serious)** on `/`, `/private-residence-reset/`, `/request-assessment/`. Concentrated in decorative/index elements: `.qualification__index`, `.outcome__index`, `.founder__index`, `.residence-index`, step-number spans, `.assessment__eyebrow`, `.scope__stop`, `.pricing__figure > small`. These are not `aria-hidden` — axe treats them as real content, so they must pass contrast, not be excluded.

Not yet done at all:

- Lighthouse mobile reports.
- Manual verification that homepage/Residence Baseline composition actually satisfies the docs/09 and docs/10 spec (file existence was confirmed; conformance to the 8-movement/typography/credibility requirements was not).
- Imagery/asset-manifest and anti-AI visual audit.
- Real-credential end-to-end lead delivery test.
- Final scored evidence package and release decision. `docs/04-RELEASE-CHECKLIST.md` is still the blank template.
- Nothing in this body of work is committed to git.

## Mission for this pass

Close out every remaining Phase 4 item and reach a release decision. Do not re-do work that is already verified passing above — re-run it only to confirm no regression after you touch related code, and say explicitly that it was a regression check, not new work.

## Phase 1 — Fix the confirmed accessibility defect

1. In `src/styles/tokens.css`, find the color token(s) used by the flagged selectors (likely `--color-steel-300` and/or `--color-blue-500` on `--color-paper`/`--color-warm-white`/`--color-navy-900` backgrounds).
2. Correct to WCAG AA (4.5:1 for normal text; 3:1 only if the text is genuinely large-scale AND decorative — but since these nodes are not `aria-hidden`, treat them as real content requiring 4.5:1 unless you deliberately mark them `aria-hidden="true"` and confirm they are truly redundant with adjacent visible text).
3. Re-run `npm run qa:phase4:static` and `npm run qa:phase4:deep` (or equivalent axe pass). Confirm 0 violations on all three affected routes.
4. Save the rerun output as `artifacts/phase-4/final/axe-mobile.json` and `.../static-audit.json` — keep the originals in `artifacts/phase-4/reports/` as the "before" record.

## Phase 2 — Verify composition and credibility against spec

File existence does not mean spec conformance. Check each of these against the actual rendered markup/CSS, not just presence of the file:

1. Homepage: does the section order actually read as eight deliberate movements with one focal point each (docs/10, item 7), or is it still a flat sequence of equal-weight sections?
2. `HandoffRecord.astro`: does it show room-level status, keep/remove/review logic, authorized changes, exception handling, completion index, and sample labeling (docs/10, item 8) — or is it still a generic card?
3. `ResidenceBaselineRecord.astro` / `/private-residence-reset/`: confirm it has its own page signature (Residence Baseline Record, room-by-room priorities, finish/access notes) and is not a reskinned Handoff page or a card-grid cleaning page (docs/10, item 9; docs/08 build spec).
4. H1/H2 sizes at each of the 6 required widths: confirm they land inside the docs/09 typography spec, not the older 32–48px range. Use the existing `artifacts/phase-4/baseline` and `interim` screenshots for before/after comparison, and capture fresh ones for any route touched in Phase 1.

Report conflicts against docs/09 or docs/10 before silently picking one interpretation.

## Phase 3 — SEO intent separation and discoverability

1. Confirm homepage and campaign page copy genuinely differ in intent (property handoff/cleanout vs. whole-home deep reset) beyond just title/H1 — spot check body copy overlap.
2. Confirm there is exactly one low-emphasis, crawlable (real `<a href>`, not JS-only, not `display:none`/`visibility:hidden`) link from the homepage (or footer) to `/private-residence-reset/`, per docs/10 item 12. Report the file and line it lives in.
3. Confirm the campaign page is still excluded from primary navigation.

## Phase 4 — Imagery and anti-AI audit

1. Cross-check every image actually referenced in `src/` against `docs/06-ASSET-MANIFEST.md`. Flag any image in use that is not in the manifest, or any manifest entry that implies stock-as-client-work.
2. Confirm alt text is accurate and present for all content images.
3. Manually scan hero/section composition against the AGENTS.md prohibited-pattern list (gradient orbs, glassmorphism, Bento grids, floating dashboards, generic icon-heading-paragraph modules, mechanical dark/light alternation, fade-up-on-everything, stock crews/AI people/fake before-after proof, fake testimonials/star ratings/counters/logo walls).

## Phase 5 — Performance budgets and Lighthouse

1. Run Lighthouse (already a devDependency) in mobile config against `/`, `/private-residence-reset/`, and `/request-assessment/` on a production build. Save JSON + summary under `artifacts/phase-4/final/lighthouse/`.
2. Confirm LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on all three.
3. Compare `transferBytesBuiltAssets` in the static-audit output against the pre-Phase-4 baseline (if available) to confirm the new fonts/imagery did not regress page weight meaningfully. Flag it, don't silently accept it, if it grew a lot.

## Phase 6 — Lead system integration (owner-gated)

This phase cannot be completed with invented credentials — do not fabricate HubSpot/Resend/Twilio/Turnstile values.

1. Verify the code path handles missing/failed providers gracefully (fallback email, no silent data loss) by reading `functions/_lib/lead.ts` and `providers.ts`, and by running `npm run qa:phase3:endpoint` against mocked failures.
2. State plainly in the final evidence that the "5 consecutive real-credential staging sends" requirement from docs/10 item 6 requires the owner to supply real secrets in the actual deployment environment (Cloudflare), and cannot be satisfied inside this repo/session. Mark this a release **blocker** unless the owner confirms it was already done outside this session.

## Phase 7 — Final evidence package and release decision

Assemble and return:

- Exact changed-file list (`git diff --stat` / `git status`).
- Before/after screenshots at all 6 widths for every touched route.
- Token/type diff (tokens.css, fonts.css before/after).
- Build, type-check, lint, and test output.
- Lighthouse mobile reports (Phase 5).
- Accessibility notes: axe before/after, 0 remaining violations.
- Schema/canonical/sitemap/robots evidence (rerun static audit, confirm still passing).
- Form and provider-failure evidence (Phase 6).
- Termly consent evidence (screenshot of cookie preferences UI + proof Analytics.astro doesn't fire before consent).
- Client-bundle secret scan (rerun, confirm still 0 leaks).
- Claims audit (rerun, confirm still 0 matches).
- Anti-AI/imagery audit (Phase 4 findings).
- A 100-point score against `docs/04-RELEASE-CHECKLIST.md`, with every box explicitly checked or explained.
- A final call: `SHIP`, `REVISE`, or `BLOCKED` — and if `BLOCKED`, name the exact blocking item (expected: Phase 6 real-credential testing, unless already satisfied).

Do not call this complete because it compiles, and do not re-report items already verified above as if they were newly discovered.
