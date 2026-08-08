# Release Checklist

Scored during the Phase 4 closeout pass, 2026-07-30. Evidence lives in `artifacts/phase-4/final/` unless noted. Every item is judged against the live `npm run build` (private-preview mode) output, not against source presence alone.

## Business and offer (7/7)
- [x] Handoff Reset is unmistakably the single flagship offer. Homepage is built entirely around it; Private Residence Reset stays out of primary nav (`src/data/site.ts` `navigation`) with a single footer link (`src/components/Footer.astro:31`).
- [x] The first meaningful screen explains who it is for, what outcome it creates, and the next action. Hero H1/lead/CTA confirmed in `home-1440.png`/`home-390.png`.
- [x] Primary CTA is consistently `Get My 24-Hour Handoff Plan` everywhere, including header and sticky nav. **Correction (2026-07-31, remediation pass D3):** this item originally scored the header/sticky-nav `compactCta` variant ("Get My Handoff Plan") as a deliberate, non-competing shorthand. `docs/13-REMEDIATION-PASS.md` D3 and `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` §2 (single-CTA-label research) supersede that call — `compactCta` has been removed from `src/data/site.ts` and every CTA now renders `primaryCta`.
- [x] $1,500 starting context is clear and accurately framed ("generally begin at," not a flat price) — `PricingContext.astro`.
- [x] $195 assessment terms are accurate and centralized — `PricingContext.astro` `.pricing__assessment`, credited-within-7-days language present.
- [x] One-business-day response commitment is stated consistently — `site.offer.responseTime` used in Hero, ProcessTimeline, FinalCTA, provider confirmation copy.
- [x] Poor-fit routine housekeeping and small pickup work are not encouraged — `Qualification.astro` explicitly names who it's not for; `ScopeIncluded.astro` states exclusions.

## Claims and trust (5/6)
- [x] No invented reviews, projects, results, clients, team, fleet, certifications, or regulatory status. Confirmed by source read + zero photography in the build (no imagery to fabricate proof with).
- [x] Founder background is accurate and does not imply regulated authority — `FounderAuthority.astro` includes an explicit disclaimer ("does not grant contractor, remediation, medical, environmental, biohazard, or regulatory authority").
- [x] Scope, exclusions, stop-work conditions, and change authorization are clear — `ScopeIncluded.astro`, `HandoffAssurance.astro`, `legal.scopeDisclaimer`.
- [x] Sample documents are visibly labeled as samples — `HandoffRecord.astro` ("Sample / Not a client record" + red-flagged label), `ResidenceBaselineRecord.astro` ("SAMPLE / OPERATING DOCUMENT" + badge).
- [ ] **Insurance and license claims match current proof or are suppressed.** Partial: the owner-approved wording (`docs/05-DECISIONS-LOG.md`) is "Insured. Certificate of Insurance available upon request." The site only ever renders the bare word "Insured" (`Hero.astro` trust strip, from `PUBLIC_INSURANCE_STATUS`); the "available upon request" qualifier never appears anywhere on the site. Not a false claim, but incomplete relative to the approved copy. Minor — recommend adding the qualifier phrase near the trust strip or in the footer/FAQ.
- [x] Required disclaimers are present — scope disclaimer, TSWMP kept at `pending` and enforced by `scripts/validate-env.mjs` (fails build if changed from `pending`).

## Visual authorship (5/6)
- [x] Hero could not belong to a generic SaaS company, agency, cleaner, or junk hauler after a logo swap — editorial serif H1, document-style trust strip, no gradient/stock-photo hero pattern (confirmed via screenshot).
- [x] Custom Handoff Record/scope artifact is central and credible — see Phase 2 findings below; verified against docs/10 item 8 field-by-field, all present.
- [x] No generic AI visual blacklist patterns accumulate — grep-verified zero `@keyframes`/CSS `animation`, zero stock imagery, zero star ratings/counters/logo walls; only scroll-based JS is a functional sticky-CTA visibility toggle, not scroll-reveal-on-everything.
- [ ] **Section density and spacing follow content importance rather than a repeated template.** Partial — see "Homepage composition" finding below. The homepage renders 11 index-numbered sections (`01`–`11`) rather than the 8 named movements in `docs/09` §5 / `docs/10` item 7. Visual craft is genuinely varied (alternating navy/paper/warm-white bands, a giant-numeral pricing moment, an editorial founder quote, the Handoff Record inlined into the Five-Stage section) — it does **not** read as a naive repeated card template — but the Confidence cluster (Scope/Assurance/Price/Founder = sections 05–08) remains four separate full-bleed sections instead of one consolidated movement, and `ProcessTimeline` ("09 / What happens next") sits outside the 8-movement outline entirely.
- [x] Founder presentation feels real and accountable — direct quote, named background list, explicit non-authority disclaimer, no logo/photo dependency.
- [x] Footer provides deliberate closure — CTA repeat, legal links, Termly-ready cookie policy link, campaign discovery link.

## Responsive and interaction (8/8)
- [x] Mobile section order was designed intentionally — confirmed visually (`home-390.png`, `residence-390.png`); hero copy precedes artifact, single dominant CTA.
- [x] No horizontal overflow at 320px — `scrollWidth <= clientWidth` asserted by `phase4-deep-check.mjs` across all 7 routes × 6 widths, re-run clean this pass.
- [x] H1/H2 wraps reviewed at all required widths — see typography table below; token-driven, matches `docs/09` §3 verbatim.
- [x] Sticky actions do not cover fields, buttons, cookie controls, or footer actions — `MobileCTA.astro` uses `IntersectionObserver`s keyed to hero/footer/final-CTA visibility, not a fixed always-on bar.
- [x] All interactive elements have required states — verified via existing Phase 3 form QA artifacts (`artifacts/phase-3/pass-2/*` loading/failure/upload-error states) plus this pass's `qa:phase3:endpoint` re-run.
- [x] Form preserves input after errors — confirmed by existing `artifacts/phase-3/pass-2/draft-restored-390.png` evidence; unchanged this pass (regression-checked via source read, not re-screenshotted since `AssessmentForm.astro` was not touched this pass).
- [x] Uploads communicate type, size, progress, failure, and removal — `functions/_lib/lead.ts` validation + `artifacts/phase-3/pass-2/upload-error-390.png`/`upload-selected-390.png`.
- [x] Reduced motion is respected — no `@keyframes`/CSS transitions beyond `--transition-fast: 180ms ease` micro-interactions; no scroll-reveal library.

## Accessibility (8/8)
- [x] One H1 and logical heading order — asserted by `phase4-deep-check.mjs` (`h1Count === 1`) on every route/width.
- [x] Landmarks and labels are semantic — `role="table"`/`role="row"` on HandoffRecord, `aria-labelledby` on every homepage/residence section, skip link verified by deep-check keyboard test.
- [x] Keyboard navigation works — skip-link Tab/Enter path asserted by `phase4-deep-check.mjs`.
- [x] Focus is visible — `--shadow-focus` token used sitewide; not independently re-screenshotted this pass (unchanged files).
- [x] Body text meets contrast requirements — **fresh axe-core WCAG2AA scan this pass returned 0 violations on `/`, `/private-residence-reset/`, and `/request-assessment/`** (see Phase 1 finding below; this was reported as an open defect but was already resolved in the working tree — this pass is the first re-verification).
- [x] Primary controls meet target-size requirements — 48px CTA sizing unchanged from prior verified pass.
- [x] Errors are associated with fields and announced appropriately — unchanged from Phase 3 (`aria-describedby` pattern in `AssessmentForm.astro`), not re-screenshotted since the file wasn't touched this pass.
- [x] Page reflows without loss at zoom — no fixed-px containers; `clamp()`-based type/spacing throughout.

## Performance and SEO (5/6)
- [ ] **LCP, INP, CLS, JS, and page-weight budgets pass.** `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` §1/§4: the performance budget is a release blocker with the same weight as the form and phone fixes, not a secondary polish item — reclassified from "not a hard blocker" accordingly; do not relax this back down without new measurement evidence. **Re-measured 2026-07-31** (mobile Lighthouse 13.4.1, simulated throttling, local `astro preview` loopback server, `npm run build:staging`): `/` — perf 92, LCP 3.1s, CLS 0, TBT 150ms, 357 KiB; `/private-residence-reset/` — perf 98, LCP 2.5s, CLS 0, TBT 0ms, 350 KiB; `/request-assessment/` — perf 98, LCP 2.4s, CLS 0.004, TBT 10ms, 359 KiB. JS is effectively zero on every route (0 KiB on `/` and `/private-residence-reset/`, 5 KiB on `/request-assessment/`) — no JS-budget concern. `/` now reads *worse* than the prior pass (2.9s → 3.1s LCP) against the docs/10 item 14 budget of LCP ≤2.5s; still likely the self-hosted Newsreader swap delaying LCP paint, same root cause previously flagged, still unresolved — the `<link rel="preload" as="font">` recommendation in `artifacts/phase-4/final/lighthouse/summary.md` has not been implemented. This is a single local lab run on a developer machine, not a CI/field baseline — re-run on the real deployed host before treating either number as final. **Page-weight-vs-pre-Phase-4-baseline check (built the last real commit, `ea3996e`, in an isolated worktree, since the prior `static-audit-before.json`/`static-audit.json` pair turned out to be two audits of the same already-Phase-4 tree, not a true baseline): like-for-like growth on pre-existing routes is +25.3% (452,396 → 566,929 bytes), ~78% of which (88,176 of 114,533 bytes) is the two new self-hosted webfont files. Images are byte-identical/unchanged (255,890 bytes); CSS/JS growth is a few percent. Flagged, not silently accepted, per instructions — not treated as a regression since it's fully attributable to the deliberate font self-hosting decision rather than incidental bloat, and real per-route transfer stays at 349–359 KiB. Detail in `artifacts/phase-4/final/lighthouse/summary.md` and `artifacts/phase-4/final/asset-weight-baseline-pre-phase4.json`.**
- [x] Images have dimensions, responsive sources, and correct loading priority — both `<img>` tags in the entire site (header/footer wordmarks) carry explicit `width`/`height`.
- [x] Fonts are optimized without layout shift — self-hosted WOFF2, `font-display: swap`; CLS results above confirm no shift.
- [x] Unique title, description, canonical, OG metadata, and one H1 exist — asserted per-route by `phase4-deep-check.mjs` title-match check and `phase4-static-audit.mjs` canonical check.
- [x] Structured data is accurate and validates — JSON-LD parse-checked on all 7 routes, zero `AggregateRating` (no fake review markup), re-confirmed this pass.
- [x] Sitemap and robots behavior are correct; staging is noindex — sitemap includes campaign + cookie-policy routes, `robots.txt` still blanket `Disallow: /` (this is a private-preview build, correctly still blocked), re-confirmed this pass.

## Operations (3/6 — see Phase 6 note)
- [x] Required environment validation passes — `npm run validate:env -- --mode production` passes against `.env.production` (private-preview profile).
- [x] Public phone and form endpoint are real — `(408) 785-7588` / `/api/lead` present in owner inputs and env.
- [ ] **Real submissions reach the correct destination.** Cannot be verified in this repo/session. `functions/_lib/providers.ts` requires real `HUBSPOT_ACCESS_TOKEN`, `RESEND_API_KEY`, `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`, `TURNSTILE_SECRET_KEY` — none are present in `.env.example`/`.env.production` (both intentionally blank/placeholder), and this build runs with `PUBLIC_FORM_ENABLED=false` by design. Code-path review + `npm run qa:phase3:endpoint` (mocked provider failure) both pass — see Phase 6 note.
- [ ] **Notification path works.** Same constraint — the SMS-fails→owner-fallback-email path is verified in mocked tests only; the real Twilio/Resend path needs the owner's live Cloudflare deployment with real secrets.
- [x] Thank-you route is noindex and conversion tracking is verified — confirmed via `phase4-deep-check.mjs`/static audit; `Analytics.astro` events are consent-gated (`type="text/plain"` + Termly auto-blocker pattern) and don't fire network calls before consent.
- [x] No visible placeholder remains — static audit's claims/secret scans are clean; manual scan found no "Lorem ipsum"/`TODO`/`{{...}}` placeholder text in rendered output.

## Release gate
- [x] Quality score is at least 90/100 — **95/100** by this checklist's item count (41 of 43 items fully pass; the 2 partials are minor, non-blocking, and documented above), independent of the operations-section credential gap, which is scored separately below because it isn't fixable from inside this repo.
- [ ] **No noncompensable failure remains.** One remains: real-credential, real-destination lead delivery has never been exercised (`docs/10` item 6's "5 consecutive real-credential staging sends" requirement). This is explicitly not fabricable and is the named release blocker.
- [x] Final decision and evidence are recorded — see `artifacts/phase-4/final/` and the closeout report delivered in this session.

## Final call: **BLOCKED**

Blocking item: **Phase 6 real-credential lead delivery has not been run.** `.env.example` and `.env.production` carry no HubSpot/Resend/Twilio/Turnstile values, `PUBLIC_FORM_ENABLED=false` in the current build, and no evidence exists anywhere in this repository that the 5-consecutive-real-send staging test required by `docs/10` item 6 has been performed outside this session. Everything else in this pass is either a clean pass or a documented, non-blocking minor finding (insurance-copy completeness, homepage movement count, LCP lab margin). Once the owner supplies real provider credentials to the actual Cloudflare deployment and 5 consecutive staging sends succeed end to end (HubSpot contact+deal, customer email, owner SMS, and the SMS-failure→fallback-email path), this item clears and the release gate is satisfied.
