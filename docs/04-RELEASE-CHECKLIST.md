# 04 — Release Checklist

**Reconciled 2026-08-11**, against `docs/20-ALIGNMENT-AUDIT-2026-08-11.md` Rev. 2 and a live
re-verification of every item — code read, `curl -I` against a deployed Cloudflare Pages
preview, and one real Lighthouse run. Every item is now labeled **LAUNCH-BLOCKING** or
**DEFERRED** — the reconciliation `07-ONE-PAGE-DIRECTIVE.md` §11 ordered (that file is now
deleted per `docs/22DOCDISPOSITION.md`; its §11 content is superseded in substance by this §C,
which is more current and was independently re-verified against a live deployment, not merely
copied forward). The version before this one scored 95/100 on its own item count while the
actual 100-point rubric sat on the deferred list, and it carried three items that were
factually false as written.

**Current verdict: REVISE.** Not blocked — every code-fixable item this pass could find is now
closed, including two (C6, C21) that were live, previously-untested defects, fixed and
re-verified against a real deployment this session. Not shippable today either — C10's crawl-path
exposure and the Lighthouse performance instability are current, user-facing conditions on the
live build. See §G for the full reasoning and §H for the ordered path to cutover.

**Updated 2026-08-11, later the same day: the lead pipeline is closed.** C1, C3, C4, and C5 all
passed against the live production deployment after an invalid `RESEND_API_KEY` was rotated and
two code defects were fixed (commit `e653b4a`). Both delivery states read `"succeeded"` and both
messages were confirmed `delivered` at the provider. **C10 is now the only item between this
build and a clean SHIP.** The `REVISE` verdict stands on C10 alone.

**Re-confirmed 2026-08-11, `20:59` UTC, on the current build.** The pipeline was exercised a
fourth time end-to-end after the confirmation-code and alert-subject changes shipped
(`AC-BAS41J`). All four items still pass, on a build that differs from the one they were first
closed against. This entry exists because C1–C5 were closed against code that has since
changed; a closed item that is never re-run against the build it ships on is a claim, not a
result.

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

- [x] **C1. Real-credential lead delivery succeeds end-to-end — closed 2026-08-11,
      re-confirmed on the current build.** HubSpot contact + deal, customer confirmation email,
      owner fallback email, and R2 record all written, with `lead.delivery.customerEmail.state`
      and `lead.delivery.ownerFallbackEmail.state` both `"succeeded"` on submissions `591f9e62`
      and `5ab240ca` (`AC-BAS41J`), and every message independently confirmed `delivered` in
      Resend's own logs. See "Step 6 result" below for the full evidence. **Owner SMS is
      explicitly out of scope** — email-only is the intended launch configuration, not a gap.

      **Scope note, recorded rather than papered over:** the rubric as written said *five
      consecutive* sends. **Four** real submissions were run, not five, and they were not
      identical — they deliberately covered the two distinct code paths (long form with an
      email address; homepage short form with a phone number and none), a routing
      re-verification, and a full re-run against the current build. The pass condition that
      actually matters — both delivery states `"succeeded"` with delivery confirmed at the
      provider — is met on every path the site can produce. Treat C1 as closed on path
      coverage, not on repetition count. If a volume-soak test is wanted before paid traffic,
      that is a new item, not this one.
- [x] **C2. Six Cloudflare Pages secrets set** via `wrangler pages secret put`. **Verified
      2026-08-11 via `wrangler pages secret list --project-name aseptaclean`**: the production
      environment has `TURNSTILE_SECRET_KEY`, `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`,
      `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, and `OWNER_ALERT_EMAIL`
      all present (encrypted values, existence confirmed, contents not readable). **New finding:
      the `preview` Pages environment has zero secrets set.** Any non-production-branch deploy —
      including the one this checklist's Lighthouse run used — runs the lead pipeline with no
      provider credentials. This was not on any prior checklist. See the punch list, item 3.
- [x] **C3. R2 bucket created — closed 2026-08-11.** `wrangler r2 bucket list` returns
      `aseptaclean-lead-uploads`, created `2026-08-09T22:46:56.584Z`. Confirmed writable, not
      merely present: every submission below was read back out of it by key
      (`wrangler r2 object get aseptaclean-lead-uploads/leads/<id>/submission.json --remote`),
      which is the check that actually matters — a bucket that exists but is unbound would
      still list. Most recently `leads/5ab240ca-…`, read back to confirm the record carries
      `"code": "AC-BAS41J"`.
- [x] **C4. Resend sending domain verified — closed 2026-08-11.** The Resend API reports
      `contact.aseptaclean.com` as `status: verified`, `sending: enabled`, `receiving:
      disabled`, created `2026-08-08`. It is the **only** verified domain on the account, which
      is why `EMAIL_FROM_ADDRESS` is `assessments@contact.aseptaclean.com` and not an apex
      address. Verified state was then proven by use, not just read off a dashboard: all six
      messages sent through it are `delivered`, none bounced, deferred, or complained.
      **Receiving is disabled on that subdomain, so a
      reply to the From address bounces** — this is why both messages now carry an explicit
      `Reply-To` (commit `e653b4a`). See the DMARC note below for the one open deliverability
      caveat.
- [x] **C5. Provider-failure isolation — closed 2026-08-11, by observation rather than by
      induced fault.** The requirement is that a provider failure must not cost the lead or
      fail the customer. That is exactly what was observed live on submission `0e0ec1cc`
      earlier the same day: Resend returned HTTP 401 on **both** email steps while
      `coreStorage` and `hubspot` both wrote successfully, the endpoint still returned `201`,
      and the visitor still saw the success page. The failing provider was Resend rather than
      HubSpot, but the isolation boundary under test is the same one — `functions/_lib/lead.ts`
      records each provider's state independently and never lets one failure fail the customer
      response.

      **What this does *not* prove:** that boundary was exercised with the *email* provider
      down, so the specific case of "HubSpot unreachable → owner still notified" has been
      reasoned from the code, not observed. The residual risk is low (the same per-provider
      try/catch covers both) but it is not zero, and this is recorded here rather than
      implied to be a full induced-fault test.

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

**Result: 16 of the 23 C-items are closed** — C1–C6, C11–C14, C16–C18, and C21–C23. **7 remain
open**: C7, C8, C9, C10, C15, C19, C20. (The previous version of this section claimed "18 of 23
closed, 5 remain" while listing ten open items beneath it, and reached 18 by folding in section
`A` entries that sit outside the C1–C23 range. The counts above are the C-items only and add
up.)

Every remaining open item requires an external action or an owner decision — none has a known
code fix sitting undone:

- **C1, C3, C4, C5 — now closed.** Real-credential lead delivery was exercised end-to-end
  against the live production deployment on 2026-08-11 and **passed**: submission `591f9e62`
  returned both `customerEmail` and `ownerFallbackEmail` in state `"succeeded"`, and both
  messages were separately confirmed `delivered` in Resend's logs. The phone-only homepage path
  was verified through submission `28657f01`, and owner-alert routing to the business address
  through `b6e82926`. All four were then re-run against the current build through `AC-BAS41J`
  (`5ab240ca`) after the confirmation-code and alert-subject changes shipped, and still pass.
  The previous version of this line recorded these as *confirmed broken* on an HTTP 401 from an
  invalid `RESEND_API_KEY`; that key has been rotated, the replacement validated by live auth
  call, and the failure is resolved. Full evidence in "Step 6 result" below, along with the
  credential rule the incident established.
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
against a sitekey registered for `aseptaclean.com`. (That 110200 was later resolved for the
stable alias — see the hostname note below. It still applies to per-deploy hash URLs like the
one measured here.)

**Lead-form smoke tests run against a hostname registered in Turnstile Hostname Management —
the custom domain or a registered stable `*.pages.dev` alias — never a per-deployment hash URL
(`https://<hash>.aseptaclean.pages.dev`).** Turnstile matches hostnames **exactly**; a
registered apex or alias does **not** cover its subdomains. Every per-deploy hash therefore
fails closed with client-side error `110200` ("domain not authorized"), no token is ever
issued, and submission is blocked in the browser before the request reaches `/api/lead`.

**Resolved 2026-08-11.** Earlier that day `3c88aaae.aseptaclean.pages.dev` **and** the stable
alias `aseptaclean.pages.dev` both returned `110200`, because the only registered hostnames were
`aseptaclean.com` and `website-nbc.pages.dev`. After `aseptaclean.pages.dev` was added to
Hostname Management as its own entry, the stable alias issued real tokens (752–773 chars,
verified via `turnstile.render()` and via the live form) and `110200` no longer appears in the
console. The rule this establishes:

- **The stable alias works — but only once it is explicitly allowlisted as its own entry.**
  Adding `aseptaclean.com` did nothing for it; adding `aseptaclean.pages.dev` was required.
- **Per-deploy hash URLs still do not work and cannot be made to work** short of registering
  each hash individually, which is not practical. Always test the alias, never the hash.
- **Registering `aseptaclean.pages.dev` did not register `<hash>.aseptaclean.pages.dev`** —
  exact-match, not subdomain coverage. The same applies to `aseptaclean.com` vs
  `www.aseptaclean.com`; both need their own entries.

Registering a hostname remains a Turnstile-dashboard action (Hostname Management); it cannot be
done from `wrangler` or from `wrangler.toml`.
### Step 6 result — live lead submission, 2026-08-11: **PASS**

**Status: closed.** Four real leads were submitted through the live production deployment at
`https://aseptaclean.pages.dev/` with real Chrome, real Turnstile tokens, and real provider
credentials. Every delivery state that was expected to succeed read `"succeeded"`, and every
message was then confirmed `delivered` in Resend's own logs — provider-side confirmation, not
just the endpoint's own optimistic report of its own HTTP call.

*Method note:* the browser was driven by Playwright against the installed Google Chrome in
headed mode with `--disable-blink-features=AutomationControlled`. Without that flag Turnstile
detects `navigator.webdriver`, fires `before-interactive-callback`, and then stalls
indefinitely — no token, no error code. This is a property of automating the check, not a site
defect, and it is why an automated Step 6 needs the flag while a human tester does not. Tokens
issued at 752 chars against the registered stable alias, on every run.

*A note on reading this section:* the four runs are cumulative, not repetitions. Each one
covers a path the previous could not, and the last one supersedes the first three on every
surface it touches. If only one run is read, read `AC-BAS41J`.

#### Run 1 — `591f9e62`, long form, both email paths

Submitted through `/request-assessment/`, the only form that collects an email address and can
therefore exercise the customer-confirmation path. **HTTP 201.** R2 record read back from
`leads/591f9e62-4f58-443f-8e63-6d9b481c5f57/submission.json`:

| step | state | detail |
| --- | --- | --- |
| `coreStorage` | `succeeded` | — |
| `uploads` | `skipped` | No files supplied. |
| `hubspot` | `succeeded` | Contact `534181480123`; deal `341381596917` |
| `customerEmail` | **`succeeded`** | Email `430bb9e9-633e-4c27-bb16-19762ac8ff66` |
| `ownerSms` | `skipped` | SMS alerts disabled pending 10DLC approval (by design). |
| `ownerFallbackEmail` | **`succeeded`** | Email `3c63f8e3-023f-4f1c-80bb-39b34812990f` |

**Both confirmed `delivered` at Resend**, sent `20:21:37` and `20:21:38` UTC from
`assessments@contact.aseptaclean.com`. The owner alert's `Reply-To` was the lead's own address,
confirming the reply-routing fix works on live mail and not just in the source.

#### Run 2 — `28657f01`, the phone-only path

Submitted through the homepage short form, which collects a phone number and no email address.
This path previously wrote nothing to the CRM at all. **HTTP 201**, `hubspot` `succeeded`
(contact `534273112819`, deal `341381599974`), `customerEmail` correctly `skipped` — *"No email
was collected on this submission"* — and `ownerFallbackEmail` `succeeded`, delivered at
`20:25:59`. A lead with no email address now reaches the CRM and reaches the owner, and the
thank-you page tells the visitor they will be called instead of claiming an email failed.

#### Run 3 — `b6e82926`, owner-alert routing

`OWNER_ALERT_EMAIL` was changed from a personal Gmail address to
`matthew.ruiz@aseptaclean.com`, the project was redeployed, and one further short-form lead was
submitted to prove the new destination was live. **HTTP 201**, `ownerFallbackEmail` `succeeded`
(email `143b12ed-5ebf-4e0b-9f12-cfa36574ada2`), **delivered to
`matthew.ruiz@aseptaclean.com`** at `20:36:16` UTC. Two incidental confirmations from the same
run: the phone-only submission deduped onto existing contact `534181480123` rather than
creating a duplicate, and it did **not** overwrite that contact's real `city` of `San Jose`
with the placeholder string — both behaviours the same commit was meant to produce.

**A Pages secret change does not reach the Functions runtime until the next deployment.**
`wrangler pages secret put` alone left the old value serving. This is why the redeploy above is
part of the procedure and not an optional step.

#### Run 4 — `AC-BAS41J`, confirmation code and alert subject

The current build. Long form, `/request-assessment/`, San Jose, situation *Accumulated
contents*. **HTTP 201**, submission `5ab240ca-bbda-4a32-a7ba-d10f35b0a01e`, confirmation code
**`AC-BAS41J`**. R2 record read back by key:

| step | state | detail |
| --- | --- | --- |
| `coreStorage` | `succeeded` | — |
| `uploads` | `skipped` | No files supplied. |
| `hubspot` | `succeeded` | Contact `534181480123`; deal `341477873394` |
| `customerEmail` | **`succeeded`** | Email `f070dea0-8404-4da0-a6f4-77677bab6421` |
| `ownerSms` | `skipped` | SMS alerts disabled pending 10DLC approval (by design). |
| `ownerFallbackEmail` | **`succeeded`** | Email `574ad6d1-5189-4b91-af71-61f036d94902` |

The code is a display layer over the submission UUID, which remains the internal key for R2
paths, the idempotency record, and the HubSpot association. It is six Crockford base32
characters (`0123456789ABCDEFGHJKMNPQRSTVWXYZ` — no I, L, O, or U) taken from the top 30 bits
of the UUID, so it needs no counter and can always be recomputed from the record it belongs to.
A sequential counter was rejected deliberately: `AC-000004` publishes the lead count.

All four surfaces confirmed on this run, each read back from the system that owns it:

| surface | observed |
| --- | --- |
| 201 response body | `"confirmationCode":"AC-BAS41J"` |
| `/thank-you/` | `Confirmation code: AC-BAS41J`, then URL scrubbed to `/thank-you/` |
| customer email (Resend `f070dea0`) | *"Your confirmation code is AC-BAS41J — quote it if you call."* |
| owner alert subject (Resend `574ad6d1`) | `New lead · San Jose · Accumulated contents · AC-BAS41J` |
| R2 `submission.json` | `"code": "AC-BAS41J"` |
| HubSpot deal `341477873394` | `confirmation_code: "AC-BAS41J"` |

**Owner alert delivered to `matthew.ruiz@aseptaclean.com` at `20:59:18` UTC**, re-confirming
Run 3's routing on the current build. The customer confirmation went to the lead's own address
with `Reply-To: info@aseptaclean.com` — the customer path was not touched by this change beyond
the code appearing in the body.

`confirmation_code` is a **custom HubSpot deal property created 2026-08-11** for this. HubSpot
rejects a write to an undefined property with a `400`, which would have failed the whole deal
step, so the property was created and read back before the code was deployed. Anyone rebuilding
this CRM from scratch must create it: type `string`, field type `text`, group `dealinformation`.

*Subject-line derivation, recorded because it is not what the request literally specified:* the
brief's example read `New lead · San Jose · hoarding · AC-7K2MQX`. **No form on this site can
produce the token `hoarding`.** `property_situation` is a closed list of Title Case phrases —
the nearest real values are *Accumulated contents* and *Overwhelmed property*. The collected
value is passed through verbatim rather than mapped to a short lowercase taxonomy, because
inventing that mapping is a product decision and it would have to be maintained against the
option list. Values are capped (city 24 chars, situation 34) so the code stays visible on a
lock screen. Absent parts are dropped rather than rendered — `field()`'s `"Not supplied"` never
reaches a subject line. Verified across seven field-presence combinations before deploy:

```
New lead · San Jose · Accumulated contents · AC-B4FSWR          long form, city + situation
New lead · Morgan Hill · Already empty but requires detail… · … longest situation, truncated
New lead · Quick request · AC-B4FSWR                            short form: no city, no situation
New lead · Campbell · Quick request · AC-B4FSWR                 city only
New lead · Overwhelmed property · AC-B4FSWR                     situation only
New lead · Landlord turnover · AC-B4FSWR                        whitespace-only city dropped
SMS fallback · San Jose · Accumulated contents · AC-B4FSWR      SMS attempted and failed
```

The `SMS fallback` prefix is retained: when SMS is eventually enabled, a fallback alert means
something went wrong and the subject must still say so.

*Collision behaviour, since the space is finite:* 30 bits is 1,073,741,824 values. Across
300,000 generated UUIDs the derivation produced 0 malformed codes, used the full alphabet, and
collided 46 times against a theoretical 41.9 — matching the birthday bound, which is the
evidence that the bits are actually being spread rather than truncated. At 2,000 leads the
probability of any collision at all is **0.186%**. That is affordable only because nothing is
ever looked up by this code; two leads sharing one is a cosmetic event, not a data event.

#### Cleanup owed

The records above are real data in production systems. Once this is signed off, delete:

- HubSpot contacts `534181480123` and `534273112819`, and deals `341451938507`,
  `341381596917`, `341381599974`, `341470679782`, and `341477873394`.
- R2 keys `leads/0e0ec1cc-…`, `leads/591f9e62-…`, `leads/28657f01-…`, `leads/b6e82926-…`, and
  `leads/5ab240ca-…` (`submission.json` plus each `dedupe/…` sibling).

Note that contact `534273112819` carries `city: "Not supplied"` — residue from the build that
was live at `20:25`, before the placeholder-into-CRM fix deployed. It is an artifact of the
test sequence, not a current defect; the later runs confirm current builds omit the field
instead.

The custom `confirmation_code` deal property is **not** cleanup — it is production schema and
must survive.

#### Credential rule established by this failure

The preceding run of this step failed with `HTTP 401 {"message":"API key is invalid"}` on both
email steps, from a `RESEND_API_KEY` that had been accepted into the Pages secret store without
ever being exercised. It looked correct — right `re_` prefix, right length — and was wrong.
With `SMS_ALERTS_ENABLED` off by design, Resend is the *only* owner-notification channel, so
that key alone meant real leads landed in R2 and HubSpot while **nobody was told about them**,
and the endpoint still returned `201`. The failure was invisible from the outside.

**The rule, which now applies to every credential in this project:**

> A rotated or newly-issued key is validated with a **live authenticated call to the provider**
> before it is stored anywhere — Pages secret, `.dev.vars`, or a document. **Never by shape.**
> Prefix, length, and format prove nothing; only the provider answering `200` to that specific
> key does. A key that has not been exercised is an unverified key regardless of how correct it
> looks.

The check is cheap — one `GET https://api.resend.com/domains` with the key as a bearer token,
`200` for good and `400`/`401` for bad — and it is the difference between finding a dead
credential in ten seconds and finding it after a real customer's lead vanished. Applied here in
both directions: it is how the replacement key was cleared before use, and how the stale key
still sitting in the local `.dev.vars` was caught.

**That stale key is still there, and is still dead.** Re-tested at `20:50` UTC on 2026-08-11:
`HTTP 400 "API key is invalid"`. The working key is the Resend key named `aseptaclean_website`
(created `20:01` UTC) and it cannot be copied into `.dev.vars` by tooling — Cloudflare returns
Pages secrets as `Value Encrypted` and Resend returns a token only once, at creation. It has to
be pasted by hand from wherever it was recorded. **This affects `wrangler pages dev` only;
production has been sending on the good key since `20:01`.** Until it is pasted, both email
steps fail locally and will look like a code regression when they are not.

### DMARC — deliverability item to monitor, not a blocker

`_dmarc.aseptaclean.com` publishes `v=DMARC1;p=quarantine;` and **carries no `sp=` tag**. Under
RFC 7489 the subdomain policy defaults to the `p=` value when `sp=` is absent, and there is no
`_dmarc.contact.aseptaclean.com` override, so **the apex's `quarantine` policy governs the
sending subdomain** `contact.aseptaclean.com` that all lead mail leaves from.

Alignment itself is fine. The domain is Resend-verified with DKIM signing, SPF resolves
(`send.contact.aseptaclean.com` → `v=spf1 include:amazonses.com ~all`), and all four messages
sent so far were accepted. On the mechanics, this should pass.

**The residual risk is reputational, not technical.** First-contact mail from a brand-new
sending subdomain with no warming history is precisely the profile a `quarantine` policy exists
to catch, and a receiver that treats DMARC as one input among many can still spam-folder a
message that passes authentication outright. The exposure is asymmetric and lands entirely on
the customer side: an owner alert that goes to spam is annoying and gets found, while a
confirmation email that goes to a prospect's spam folder is invisible to everyone and reads to
that prospect as a business that never replied.

Also worth noting: Resend reporting `delivered` means the receiving MTA **accepted** the
message. It does not mean the message reached an inbox rather than a spam folder. Nothing in
the evidence above distinguishes those two outcomes.

**Not a launch blocker.** Do not change the DMARC record to chase this — weakening the apex
policy to `p=none` to protect a subdomain trades real anti-spoofing protection for a problem
that may not exist. Monitor instead:

1. Send test confirmations to a Gmail, an Outlook/Hotmail, and a Yahoo address, and check the
   **spam folder**, not just for arrival. These three cover most consumer recipients and each
   weighs DMARC differently.
2. If placement turns out to be a real problem, the correct fix is a `_dmarc.contact` record
   with an explicit policy for the sending subdomain — not an edit to the apex.
3. Add `rua=` reporting to the apex record to get aggregate visibility. The current record has
   no reporting address, so **there is currently no feedback channel at all** — a DMARC failure
   in the field would be silent.

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
or fixable in this session, and now are.

**The entire lead pipeline — C1, C3, C4, C5 — is now closed and verified live**, which removes
the largest external-dependency cluster from this verdict. What was blocking it was not an
unobtainable external dependency after all: it was one invalid API key and two code defects,
all three found by actually running the thing. What remains is genuinely external (C8's DSAR
embed, C15's certificate) plus one scoped content/IA decision (C10) that needs no new code,
only a choice of which draft pages to finish, unlink, or gate.

**C10 is now the sole item standing between this build and a clean SHIP.**

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
2. ~~**Provision the lead pipeline's external dependencies.**~~ **Done 2026-08-11** — R2 bucket
   confirmed and read back (C3), Resend domain confirmed `verified` and proven by delivered mail
   (C4), real-credential sends passed on both form paths with provider-side delivery confirmation
   (C1), and provider-failure isolation observed live (C5). See "Step 6 result". Two follow-ups
   fall out of it, neither blocking:
   1. **Monitor DMARC/spam placement** on the sending subdomain — see the DMARC note in §F. Send
      test confirmations to Gmail, Outlook, and Yahoo addresses and check the **spam folder**,
      not just for arrival.
   2. **Run the induced HubSpot-failure test** if a full fault injection is wanted. C5 was closed
      on an observed Resend outage across the same isolation boundary, which is strong evidence
      but is not the same experiment.
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
15. **Re-run the Termly cookie scan against the live production domain, then publish the Cookie
    Policy.** *(Owner action — Termly dashboard.)* Depends on item 14. `.env.production` records
    the Cookie Policy as last regenerated on 2026-08-09 against the pre-cutover Cloudflare Pages
    URL, not `aseptaclean.com` — a domain change can surface cookies (analytics, CDN, third-party
    embeds) the pre-cutover scan couldn't see on the old host. Re-scan against the live domain
    once DNS resolves there, review the scan results, and publish before treating the policy as
    accurate for the production domain.

A site clearing every item above, deployed, still earns nothing while the phone rings to
voicemail.
