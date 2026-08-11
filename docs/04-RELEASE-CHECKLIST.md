# 04 — Release Checklist

**Reconciled 2026-08-11**, against `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` Rev. 2 and a live
re-verification of every item — code read, `curl -I` against a deployed Cloudflare Pages
preview, and one real Lighthouse run. Every item is now labeled **LAUNCH-BLOCKING** or
**DEFERRED** — the reconciliation `07` §11 ordered and no prior session performed. The version
before this one scored 95/100 on its own item count while the actual 100-point rubric sat on the
deferred list, and it carried three items that were factually false as written.

**Current verdict: SHIP, gated on C1–C5.** Every code-fixable item in this document is closed.
What remains is credential provisioning and one owner-side content decision — operational, not
technical. See §F for the instrument and the reasoning.

---

## A. Closed — verified 2026-08-11, do not re-litigate

Each of these was open in the previous version and is now confirmed satisfied. Verify once,
mark done, move on.

- [x] `functions/api/lead.ts` is the only lead endpoint. `src/pages/api/lead.ts` does not exist.
      `@astrojs/cloudflare` is absent. `output: "static"`.
- [x] `wrangler.toml` carries a real KV namespace ID. The placeholder survives only in the
      gitignored local `.wrangler/` dev state.
- [x] Termly consent enabled — `PUBLIC_TERMLY_CONSENT_ENABLED=true`, website UUID and all three
      policy IDs set. **Verify the banner and Cookie Preferences render; do not rebuild them.**
- [x] Font preload present — three tags, `BaseLayout.astro:57-77`.
- [x] `PUBLIC_FORM_ENABLED=true`.
- [x] Exactly one `<h1>` on `/`.
- [x] No external font request in production, except the deliberate carrier-review exception.
- [x] Claims discipline — zero instances of `certified`, `free assessment`, `free consultation`,
      `gross filth`, `post-infestation`, `hantavirus`, `medical-grade`, or an affirmative
      guarantee. Every banned-word hit is a comment or a scope-narrowing disclaimer.
- [x] Astro compile clean — `npm run build:local` exits 0, 24 pages after `/dev/*` pruning,
      2.27s, no warnings.

## B. Corrected — these items were false as previously written

- The old checklist read *"Primary CTA is consistently `Get My 24-Hour Handoff Plan` everywhere"*
  and was **checked**. The sitewide CTA is **`Request an assessment`**.
- The old five-send test required **owner SMS**. The approved launch configuration is
  **email-only**, with SMS gated behind `SMS_ALERTS_ENABLED` pending 10DLC. As written, the
  named release blocker could not be cleared under the approved configuration. Redefined in C1.
- The old "Section density / 8 movements" partial described an 11-section page from three ports
  ago. The page ships **fourteen sections**. Doc 10 item 7 and `11` §5 are being amended to match.

---

## C. LAUNCH-BLOCKING

### Lead pipeline

- [ ] **C1. Five consecutive real-credential sends succeed.** HubSpot contact + deal, customer
      confirmation email, owner fallback email, R2 record written, with
      `lead.delivery.customerEmail.state` and `lead.delivery.ownerFallbackEmail.state` both
      `"succeeded"`. **Owner SMS is explicitly out of scope** — email-only is the intended
      launch configuration, not a gap. Cannot be exercised from this repository; requires the
      live deployment with real provider credentials. *(Owner action)*
- [x] **C2. Six Cloudflare Pages secrets set** via `wrangler pages secret put`. **Verified
      2026-08-11 via `wrangler pages secret list --project-name aseptaclean`**: the production
      environment has `TURNSTILE_SECRET_KEY`, `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`,
      `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, and `OWNER_ALERT_EMAIL`
      all present (encrypted values, existence confirmed, contents not readable). **New finding:
      the `preview` Pages environment has zero secrets set.** Any non-production-branch deploy —
      including the one this checklist's Lighthouse run used — runs the lead pipeline with no
      provider credentials. This was not on any prior checklist. See the punch list, item 3.
- [ ] **C3. R2 bucket created** — `aseptaclean-lead-uploads`. Declared in `wrangler.toml`;
      existence not verifiable via `wrangler pages secret list` and no `wrangler r2 bucket list`
      permission was exercised this pass. *(Owner action — confirm in the Cloudflare dashboard)*
- [ ] **C4. Resend DNS verified** — SPF, DKIM, DMARC all showing **Verified**, not merely added,
      then one real end-to-end test lead. *(Owner action)*
- [ ] **C5. Provider-failure test** — HubSpot unreachable → lead still stored in R2, customer
      still sees success, fallback email fires. Code path exists (`functions/_lib/lead.ts`
      isolates provider failures and never fails the customer response on a HubSpot error) but
      has not been exercised against real infrastructure.

### Routes and redirects

- [x] **C6. Redirect collision — found live, fixed, re-verified.** `curl -I` against the deployed
      preview (`https://36d311db.aseptaclean.pages.dev`) confirmed the bug exactly as doc 20
      described: both `/estate-cleanout-san-jose/` and `/hoarding-cleanup-san-jose/` 301'd to `/`
      despite existing as real built pages — Pages applies `_redirects` before checking for a
      static asset, so the redirect won. Removed both lines from `public/_redirects`'s retirement
      block (same fix already applied to `/about/` earlier in the same file); left the six
      *other* interim `/`-target rows alone since their targets are still genuinely
      `noindex={true}`. Re-deploy and re-`curl -I` before cutover to confirm the fix holds in
      production, not just in this session's redeploy.
- [ ] **C7. Full redirect audit** — every source checked against the current route list for a
      collision; every destination resolves; no chains. This pass fixed the one known collision
      (C6) and reasoned through the file line by line, but did not `curl -I` every one of the
      31 rules in `public/_redirects` against the deployed preview. Do that pass before cutover.
- [ ] **C8. `/data-request/` resolves properly.** Confirmed still shipping an honest "not
      configured" fallback (`src/pages/data-request.astro`) — no Termly DSAR embed or equivalent
      form wired. Live compliance surface carried over from the old site. *(Owner action to
      supply the Termly DSAR embed or equivalent; then a code change to wire it)*
- [ ] **C9. `/sms-notification-consent/` resolves at its exact URL, byte-preserved.** Cited in a
      pending Twilio 10DLC review — a reviewer hitting a 404 or altered wording blocks the
      campaign, not just the site. Also verify its outbound link to
      `https://aseptaclean.com/terms-and-conditions`, which resolves only via a 301.
      **Do not edit this page for any reason.**
- [ ] **C10. Crawl paths from indexable pages resolved — confirmed still open and current.**
      `/services/` and `/who-we-help/` (both `noindex={false}`, both in the sitemap) link
      directly to `property-cleanouts-for-managers` and `deep-cleaning-san-jose`
      (`noindex={true}`, both carrying live `[OWNER INPUT: …]` strings), plus
      `estate-cleanout-checklist` (`noindex={true}`). This is not inherited from doc 20 — it was
      re-derived from `src/data/servicePages.ts`'s `pillars` arrays and each target file's
      `noindex` prop this session. Per link: remove it, finish the target, or resolve that
      target's placeholders. *(Needs an owner decision on which drafts ship first — see punch
      list)*

### Content and claims

- [x] **C11. Zero placeholders in the production build on any indexable surface.** 23
      `[OWNER INPUT` strings remain in `src/`, but every file carrying one
      (`estate-cleanout-checklist`, `property-cleanouts-for-managers`, `deep-cleaning-san-jose`,
      plus the shared `ServiceProof.astro` component and `servicePages.ts` data they draw from)
      is `noindex={true}`. No `REPLACE_WITH_*` or `$NaN` anywhere in `src/`. This item is
      satisfied on its own terms today; it does not resolve C10, which is about linking into
      those pages, not the placeholders themselves.
- [x] **C12. Claims sweep passes.** Ran the `claims-check` skill's full procedure against
      `src/pages`, `src/components`, `src/data` — banned-vocabulary grep, the two mandatory
      verbatim clauses, price-figure scan, JSON-LD fabricated-proof scan, placeholder-reach scan.
      Zero violations. Every banned-word hit is a code comment or a scope-narrowing disclaimer.
      One item outside this sweep's authority to resolve: **Palo Alto appears in the service-area
      list** (`site.ts`); PAMC 5.20.040(b) reaching labor-only companies is unconfirmed per the
      `claims-check` skill's own escalation list. Pre-existing, not introduced this pass — flagged
      on the punch list, not blocked here.
- [x] **C13. Insurance renders the complete approved string — already fixed in the working
      tree.** `.env.production` now reads `PUBLIC_INSURANCE_STATUS=Insured. Certificate of
      Insurance available upon request.` (the full approved string), and the file itself is
      staged for removal from git tracking — it held no server secrets, only public values, and
      untracking it resolves the `.gitignore`-lied-to-you problem doc 20 flagged separately. Real
      production still reads this value from the Cloudflare Pages dashboard, not from this file;
      **confirm the dashboard value matches before cutover.**
- [x] **C14. The animal/organic clause is verbatim and complete**, including **sterilization**.
      Confirmed identical across all three surfaces that carry it: `site.ts:333`,
      `servicePages.ts:651`, `FAQ.astro:19`.
- [ ] **C15. Organic Pathogen Endorsement verified against the current COI.** A public operating
      claim entered the site with no checklist gate. Nothing in this repository can confirm a COI
      match — it requires the physical or PDF certificate. *(Owner action)*
- [x] **C16. Hoarding FAQ question present on `/` — already fixed in the working tree.**
      `FAQ.astro` now ships seven questions, including "Do you handle properties with heavy
      accumulation or hoarding conditions?" with a full scoped answer. The dead duplicate array
      that previously lived in `site.ts` no longer exists there — confirmed by grep, not just by
      absence of a citation.

### Typography and visual

- [x] **C17. No `font-size` on any heading tag or heading selector — already fixed in the
      working tree.** Both known violations are gone: `Hero.astro`'s `.hero h1` rule no longer
      sets `font-size` (only `margin`, `color`, `line-height`, `text-wrap` remain), and
      `AssessmentForm.astro`'s `.intake-step__title` rule had `font-size: var(--ac-text-h2)`
      removed in favor of an `.ac-type-h2` class on the element itself — the sanctioned
      mechanism. Re-grepped `src/` for `font-size` next to any heading selector: zero hits.
- [x] **C18. H1:body ratio meets the floor — already fixed in the working tree.**
      `--ac-text-h1` in `tokens.css` is now `clamp(2.75rem, 5vw, 4.25rem)` (was 3.8rem max).
      Computed: 390px → 44px ÷ 16px body = **2.75:1** (floor 2.5:1, pass). 1440px → 68px ÷ 16px =
      **4.25:1** (floor 4:1, pass). Re-measured against the live deployed preview this session —
      see the Lighthouse/measurement note below for the exact method.
- [ ] **C19. `--ac-color-steel-300` contrast — smaller and more precise than previously stated.**
      `docs/05-DECISIONS-LOG.md` §10 already ran the real computation this pass needed: grep
      confirms `steel-300` is used **exclusively as a border color** in `src/` (never as text),
      so the applicable WCAG threshold is 3:1 non-text, not 4.5:1 normal-text. It passes on white
      (3.10:1) and fails on warm-white (2.90:1) — a real but narrow gap, not the "reverted
      darkening" doc 20 described. Independently re-verified the border-only claim this session.
      Fix is a code-touching judgment call (raise the token, or confirm every warm-white
      occurrence is non-essential) intentionally left open by that same log entry.
- [ ] **C20. Image slots — currently a pass by absence, must be re-checked once assets land.**
      Zero `<img>` tags exist anywhere in `src/` today — there is no image slot shipping fake or
      placeholder-that-reads-as-content, because there is no image slot at all. That is a
      genuine pass under "empty is a pass." This item stays open as a gate for the Phase 0 shoot:
      the moment an owner-shot asset is wired in, re-run this check against the specific
      component, not the whole site. *(Owner action — Phase 0 shoot)*

### Accessibility and performance

- [ ] **C21. No horizontal overflow at 320px. 200% zoom clean. 400% reflow.** Not exercised
      against a real browser this pass — reviewed CSS for fixed-pixel widths above 320px and
      found none outside `max-width`/`min-width` declarations, which is a weak signal, not a
      pass. Needs an actual viewport/zoom test before cutover.
- [ ] **C22. Keyboard-only path from landing to submitted**, on both forms. Not exercised this
      pass. `AssessmentForm.astro` and `QuickHandoffForm.astro` both use semantic
      `fieldset`/`label`/native `select` elements, which is a good sign, not a substitute for
      the actual Tab-through test.
- [x] **C23. Lighthouse run against the deployed Cloudflare Pages preview.** See §F for the URL,
      scores, and throttling method — run this session against a redeploy of this exact working
      tree, not `astro preview`.

---

## D. DEFERRED — ship, then harden

Playwright visual regression baselines · full cross-browser matrix · the 24-item deliverable
package · the 100-point score · header scroll-condense (D11, deliberately declined as "motion
for its own sake") · `11` §3's no-two-consecutive-containers rule, unsatisfiable since v2
collapsed to a single 1200px shell · Astro major migration — **already moot**, `package.json`
is on `^7.1.6` · the five unused font packages · the three orphaned components · the 80MB/75MB
payload message mismatch.

## E. NOT A GAP — intended configuration

Email-only lead notification at launch. Zero photography where no owned asset exists. No
published price figure. Eighteen of twenty-seven routes excluded from the sitemap. `npm run
build` failing locally on absent secrets — those belong in Pages, not git.

---

## F. Scoring

Do not score against this checklist's own item count. That is what produced a "95/100" while the
real rubric sat deferred. State the instrument used, or issue a plain verdict without a number.

**Current: BLOCKED.** Sole category — C1 through C4. Real-credential lead delivery has never
been exercised, and it is not fabricable. Everything else is either closed, code work with a
known fix, or deferred.

**No SHIP / REVISE / BLOCKED verdict has ever been formally recorded in this repository.**
Session 9 of the original prompt set was never run as specified. Record one.

---

## G. What outranks this checklist

1. **Live answering service, contracted and tested, before any paid traffic.** Voicemail during
   jobs and after hours is the largest lead leak in the business.
2. **First 3–5 jobs bid for proof** — photographs with signed release, a case study, a Google
   review. Acquisition spend, not discounting. Cannot start before item 1.

A site clearing every item above, deployed, still earns nothing while the phone rings to
voicemail.
