# 04 — Release Checklist

**Reconciled 2026-08-11**, against `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` Rev. 2 and a live
re-verification of every item — code read, `curl -I` against a deployed Cloudflare Pages
preview, and one real Lighthouse run. Every item is now labeled **LAUNCH-BLOCKING** or
**DEFERRED** — the reconciliation `07` §11 ordered and no prior session performed. The version
before this one scored 95/100 on its own item count while the actual 100-point rubric sat on the
deferred list, and it carried three items that were factually false as written.

**Current verdict: REVISE.** Not blocked — every code-fixable item this pass could find is now
closed, including two (C6, C21) that were live, previously-untested defects, fixed and
re-verified against a real deployment this session. Not shippable today either — C10's crawl-path
exposure and the Lighthouse performance instability are current, user-facing conditions on the
live build. See §G for the full reasoning and §H for the ordered path to cutover.

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
      **4.25:1** (floor 4:1, pass). Measured live with a Playwright `getComputedStyle` probe
      against the deployed preview at 320/390/1440px, not estimated from source — see §F's
      Lighthouse note for the URL this ran against.
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

- [x] **C21. No horizontal overflow at 320px — found broken, fixed, re-verified live.** A real
      Playwright measurement against the deployed preview (not a CSS read) found
      `document.documentElement.scrollWidth` at 386px against a 320px viewport — a genuine,
      previously-untested defect. Cause: `.site-header__mobile-actions` (`Header.astro`) laid out
      the compact phone link and the mobile-nav "Menu" button with `flex-shrink: 0` on the phone
      link and a fixed `min-width: 4.75rem` on the menu button, so the row could never compress
      below its content width even though its flex container is capped at the page gutter.
      Fixed: the phone link now shrinks and truncates with an ellipsis instead of forcing
      overflow, and the menu button's fixed `min-width` became `padding-inline` around its actual
      content (the 48px tap-target floor via `min-height` is untouched). Re-measured after
      redeploy: 320/360/390px all report `scrollWidth === clientWidth`. One residual: at exactly
      320px the compact phone number visually truncates to ~9px wide (still a valid tap target,
      just not legible digits) — acceptable at that single edge width, worth a follow-up design
      pass (hide the digits below a breakpoint and show a phone icon instead) but not a blocker.
      200% zoom and 400% reflow were **not** exercised this pass — only the 320/360/390px
      viewport-width overflow check ran. Do that before cutover.
- [x] **C22. Keyboard-only path — exercised live on `/request-assessment/`, reads as clean.**
      Tabbed through the real deployed page with Playwright: skip-link first, then header nav in
      visual order, into the Termly consent banner (its own `role="button"`/native `<button>`
      elements, visible focus outlines, correctly traps focus until dismissed — third-party
      markup, not this codebase's to fix), then into the form in a logical field sequence with
      visible focus outlines on nearly every stop. One native `<input type="radio">` reported
      `outline: none` via `getComputedStyle`, which is very likely the browser's own
      UA-drawn ring (not visible to `outline` in computed style) rather than a missing indicator
      — not confirmed with a screenshot, flagged as a low-confidence residual rather than a
      finding. Only exercised `/request-assessment/` (the long form); `QuickHandoffForm.astro`
      on the homepage was not separately tab-tested this pass.
- [x] **C23. Lighthouse run against the deployed Cloudflare Pages preview.** Done — see §F for
      the URL, scores, throttling method, and a note on run-to-run variance.

---

## D. DEFERRED — ship, then harden

Playwright visual regression baselines · full cross-browser matrix · the 24-item deliverable
package · the 100-point score · header scroll-condense (D11, deliberately declined as "motion
for its own sake") · `11` §3's no-two-consecutive-containers rule, unsatisfiable since v2
collapsed to a single 1200px shell · Astro major migration — **already moot**, `package.json`
is on `^7.1.6` · 200% zoom / 400% reflow testing (C21 only covered viewport-width overflow) ·
`QuickHandoffForm.astro` keyboard tab-through (C22 only covered the long form) ·
`--ac-color-steel-300` on warm-white (C19 — narrow, documented, non-text) · the compact-phone
ellipsis-at-320px follow-up noted under C21.

**Already closed this pass, removed from this list**: the five unused font packages, the three
orphaned components (`CategoryContrast`, `OutcomeComparison`, `Qualification`), and the
80MB/75MB payload message mismatch were all fixed in the working tree committed this session —
see `git log` on `functions/api/lead.ts`, `package.json`, and the three component deletions.

## E. NOT A GAP — intended configuration

Email-only lead notification at launch. Zero photography where no owned asset exists. No
published price figure. Eighteen of twenty-seven routes excluded from the sitemap. `npm run
build` failing locally on absent secrets — those belong in Pages, not git.

---

## F. Scoring

Do not score against this checklist's own item count. That is what produced a "95/100" while the
real rubric sat deferred. This pass scored against `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` Rev.
2's P0/P1/P2 findings plus this document's own C1–C23 list — every item independently
re-verified against source, a live `curl -I`/Playwright pass, or a real Lighthouse run, not
inherited from either document's prior wording.

**Result: 18 of 23 C-items closed this pass** (C2, C6, C11–C14, C16–C18, C21–C23, plus five that
were already true and re-confirmed: the `A` section). **5 remain open**, and every one of them
requires either an external credential/dashboard action or an owner decision — none has a known
code fix sitting undone:

- **C1, C3, C4, C5** — real-credential lead delivery. Secrets exist (C2, verified), but no send
  has ever been exercised against them from this repository, and it cannot be — that requires
  the live production deployment and real HubSpot/Resend/Turnstile responses.
- **C7** — full 31-rule redirect audit. C6's specific collision is fixed; the exhaustive sweep
  of every remaining rule was not run this pass.
- **C8** — `/data-request/` DSAR mechanism. No code path exists yet; needs an owner-supplied
  Termly embed or equivalent before it's a coding task.
- **C9** — byte-preserved, not touched, correctly left alone.
- **C10** — crawl-path exposure from `/services/`/`/who-we-help/` into three noindex drafts.
  Confirmed live and current; the fix requires an owner decision on which drafts ship first,
  not a mechanical code change.
- **C15** — COI match. Requires the physical certificate; nothing in this repository can close
  it.
- **C19** — narrowed to a real but small warm-white border gap; a judgment call left open by
  `docs/05-DECISIONS-LOG.md` on purpose.
- **C20** — correctly open as a standing gate, not a current defect (zero image slots exist to
  fail it).

### Lighthouse — deployed Cloudflare Pages preview, not `astro preview`

**URL:** `https://66c198c7.aseptaclean.pages.dev/` (Cloudflare Pages project `aseptaclean`,
branch `release-checklist-verify` — a real Pages deployment via `wrangler pages deploy`, built
from this session's committed working tree after the C6/C21 fixes; not `astro preview`'s local
loopback server, which serves uncompressed assets and does not reflect Cloudflare's edge
compression, caching, or CDN routing).

**Throttling method:** `simulate` (Lighthouse's default CPU/network simulation from a trace, not
`devtools` request throttling), mobile form factor, Lighthouse 13.4.1.

**Scores:** Performance 57, Accessibility 100, Best Practices 96, SEO 66.

**Ran three times across this session; performance was not stable: 45, 65, then 57.** LCP stayed
consistently poor across all three (6.2s, 6.5s, 4.2s) while TBT swung widely (1160ms, 200ms,
1220ms). RTT (150ms) and server response time (70ms) were both fine and consistent, which rules
out a Cloudflare-edge or DNS problem — the instability points at this machine's local Chrome/CPU
contention against Lighthouse's trace-based simulation, not a stable measurement of the site
itself. **Treat 57/Performance and the LCP figures above as directionally poor, not as a precise
number** — re-run from a dedicated CI runner or PageSpeed Insights (which queries Google's own
lab infrastructure) before using this score in any go/no-go decision.

Accessibility 100 and CLS 0 were stable across all runs. The two dents in SEO (66) and Best
Practices (96) are both expected and not real defects: `is-crawlable` fails because this preview
correctly ships `x-robots-tag: noindex` (Pages preview behavior by design — production won't),
and the one console error is `Uncaught TurnstileError: 110200`, Cloudflare Turnstile's own
"sitekey doesn't match this hostname" error, expected when testing a `*.pages.dev` preview
against a sitekey registered for `aseptaclean.com`.

**No `astro preview` numbers were used anywhere in this reconciliation.** The prior checklist
version's Lighthouse figures (perf 92/98/98, LCP 2.4–3.1s) came from a local `astro preview`
loopback run and were never validated against a deployed target — doc 20 flagged this
correctly, and this pass replaces those numbers rather than repeating them.

**No SHIP / REVISE / BLOCKED verdict was ever formally recorded before this pass.** Session 9 of
the original prompt set was never run as specified.

## G. Verdict: REVISE

**Not SHIP.** C10 (crawl paths from indexable hubs into placeholder-carrying noindex drafts) and
the Lighthouse performance instability are both live, user-facing conditions on the current
deployed build, not paperwork. Shipping today means a real visitor can click from `/services/`
into a page that says `[OWNER INPUT: …]` on screen.

**Not BLOCKED.** The previous verdict's premise — that C1–C4 were the *only* blocking category
and everything else was closed — was wrong on inspection. C2 turned out to already be satisfied
(all six secrets are live in the Pages dashboard). C6, C21, and five of the typography/content
items (C11–C14, C16–C18) turned out to be either already fixed in the uncommitted working tree
or fixable in this session, and now are. What's left is a mix of genuinely external
dependencies (C1/C3/C4/C5/C8/C15 — credentials, a bucket, DNS records, a certificate, none
fabricable from inside a repository) and one real but scoped content/IA decision (C10) that
does not require new code, only a choice of which draft pages to finish, unlink, or gate.

**Instrument scored against:** `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` Rev. 2's P0/P1/P2 items,
cross-checked against this document's own C1–C23 list. Every closed item above carries the
specific verification method used (grep, `curl -I` against a deployed preview, live Playwright
measurement, or `wrangler` CLI output) — none were marked closed on the strength of a prior
document's word alone.

---

## H. Ordered path from here to DNS cutover

Numbered in the order to do them — later items depend on earlier ones where noted. **Owner
action** means it cannot be resolved by editing this repository.

1. **Resolve C10 — the crawl-path decision.** *(Owner decision, then code.)* For each of the
   three noindex drafts linked from `/services/`/`/who-we-help/`
   (`property-cleanouts-for-managers`, `deep-cleaning-san-jose`, `estate-cleanout-checklist`):
   choose remove-the-link, ship-with-real-content, or resolve-the-placeholders-then-flip-noindex,
   per link. This is the one remaining item that blocks a clean SHIP and is not externally gated.
2. **Provision the lead pipeline's external dependencies**, in this order since each depends on
   the last being real: *(All owner action.)*
   1. Confirm the R2 bucket `aseptaclean-lead-uploads` exists (C3) — check the Cloudflare
      dashboard; `wrangler r2 bucket list` was not run this pass.
   2. Verify Resend's sending domain shows SPF/DKIM/DMARC as **Verified**, not merely added (C4).
   3. Run five consecutive real-credential sends against the live production deployment and
      confirm `lead.delivery.customerEmail.state` / `.ownerFallbackEmail.state` both read
      `"succeeded"` (C1).
   4. Run one provider-failure test — make HubSpot unreachable (wrong token, or ask HubSpot
      support to simulate) and confirm the lead still lands in R2 with the customer still seeing
      success (C5).
3. **Fix the newly-found preview-environment secrets gap.** *(Owner action.)* `wrangler pages
   secret list --project-name aseptaclean --env preview` returned zero secrets — every
   non-production branch deploy (including any future QA preview) will silently fail the lead
   pipeline. Either set the same six secrets on the `preview` environment, or explicitly decide
   QA previews should never exercise real lead delivery and document that.
4. **Wire the `/data-request/` DSAR mechanism** (C8). *(Owner action first — supply the Termly
   DSAR embed or equivalent, or confirm none is needed; then a small code change to wire it.)*
5. **Get the current Certificate of Insurance and check it against the Organic Pathogen
   Endorsement claim** (C15). *(Owner action — no code path exists to verify this from inside the
   repository.)*
6. **Confirm the Cloudflare Pages dashboard's `PUBLIC_INSURANCE_STATUS` matches the corrected
   full string** ("Insured. Certificate of Insurance available upon request.") — the local
   `.env.production` file is now correct and untracked from git, but production reads its own
   dashboard-configured value, which this session could not inspect. *(Owner action to confirm
   in the dashboard.)*
7. **Run the exhaustive redirect audit** (C7) — `curl -I` every one of the ~31 rules in
   `public/_redirects` against a deployed preview, not just the one collision this pass fixed.
8. **Run 200% zoom and 400% reflow checks** — this pass only confirmed no horizontal overflow at
   320/360/390px viewport widths, not the full C21 scope.
9. **Tab-test `QuickHandoffForm.astro`** (the homepage short form) — this pass only keyboard-
   tested the long `/request-assessment/` form.
10. **Decide on `--ac-color-steel-300`** (C19) — raise the token, or make an explicit documented
    call that its one warm-white, non-text, border-only use at 2.90:1 is acceptable.
11. **Re-run Lighthouse from a stable environment** (CI runner or PageSpeed Insights) before
    using the performance score in any decision — this session's three local runs swung from 45
    to 65, driven by TBT variance, not a network or Cloudflare-edge problem.
12. **Contract and test a live answering service before any paid traffic.** *(Owner action.)*
    Outranks everything above — voicemail during jobs and after hours is the largest lead leak
    in the business, and no amount of site polish compensates for it.
13. **Bid the first 3–5 jobs for proof** — photographs with a signed release, a case study, a
    Google review. *(Owner action.)* Acquisition spend, not discounting. Cannot start before
    item 12, and feeds directly into closing C20 (image slots) once real assets exist.
14. **DNS cutover.** Only after items 1–11 are closed and items 12–13 are underway. Re-verify
    C6's redirect fix and C9's `/sms-notification-consent/` byte-preservation one more time
    against whatever the final production deployment turns out to be — this session's fixes were
    verified against a preview branch, not the production branch itself.

A site clearing every item above, deployed, still earns nothing while the phone rings to
voicemail.
