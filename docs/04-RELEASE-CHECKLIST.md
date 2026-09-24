# Verification for this redesign

These are new-build checks. No claim in an old decisions log counts as a result here. Inspect the actual project scripts and use its required build/type checks. Do not add tests that simply mirror static CSS; verify meaningful behavior and rendered results.

## Documentation and scope

- [ ] Root website references point to the current README and scoped files; unrelated instructions intact.
- [ ] Exactly twelve requested page roles are accounted for; actual route aliases/utility pages documented separately.
- [ ] Main and trauma copy sources preserved; display changes match 20-COPY-MAP.md.
- [ ] Archive excluded from normal build instructions and active-doc search globs.
- [ ] No surviving active Sevenson or 45/30/25 authority, old master-copy authority, or primary assessment CTA.
- [ ] Public service label is Extreme Cleaning; route and integration enum not accidentally renamed.

## Calls and forms

- [ ] Header, heroes, footer and mobile call links use the verified central telephone value.
- [ ] All call actions use tel links; actual form submit remains a submit button.
- [x] Service links still navigate; secondary message links reach the correct form. Services
  navigation verified 2026-09-20 across all twelve public routes at 1440/820/390/320px; see
  `docs/ASEPTACLEAN-DESIGN-QA.md` and `output/navigation-qa/results.json`.
- [ ] Form labels/required fields/consent/provider behavior/anti-spam/service enum mapping preserved.
- [ ] Verify validation failure and successful submission in the project's supported test setup; success must correspond to an accepted request. Do not send unsolicited real notifications merely to test.
- [ ] Keep current upload/SMS features where they exist; no dead Send Photos link.
- [ ] No contact details or submitted data leaked into analytics.

## Copy-update layout verification (mandatory, added 2026-09-18)

Every copy update includes layout verification. Preserve approved wording, section order, shared
hero dimensions, typography, and spacing. Adjust responsive layout when content changes. Never
hide, truncate, shrink, or silently rewrite approved copy to force a fit. Inspect affected pages
on desktop, tablet, and mobile and fix visible regressions before declaring completion. If
rendered verification is unavailable, explicitly report the layout as unverified.

Source: `docs/Aseptaclean_Website_Design_Blueprint.md` (owner design blueprint) and AGENTS.md §0.4.
This applies to every copy-only change, not only full page rebuilds — a one-line heading edit
still needs the affected section (and its shared-component siblings) checked at the widths below.

## Visual QA

Capture all twelve page types at 390px and 1440px widths. Check shared components at 768px and 1024px too. For home and all five service heroes inspect 1440x900, 1536x864, 1366x768, and 1280x800 for form/call visibility; cover narrower mobile and text zoom for overflow/accessibility. Do not broaden testing after the concrete risks are resolved unless the repository requires it.

- [ ] Compare home to PDF p23–27, service pages to p28–33, and supporting cards/footer to 911 p3–4/p8.
- [ ] Photos remain visible; substantial image/text sections retain the reference proportions.
- [ ] Compact header; intended dark/light rhythm; no generic dashboard/card replacement.
- [ ] Complete call action/form/submit visible at target desktop sizes or precise short-viewport limitation documented.
- [ ] Nothing clipped to force a fit. Mobile stacks copy then form with call action visible before form.
- [ ] Cookie UI, call bar, keyboard focus, and safe-area space do not overlap content.
- [x] Correct heading hierarchy, readable contrast, keyboard-accessible nav/FAQ/forms. Navigation
  portion verified 2026-09-20: real disclosure buttons, `aria-expanded`/`aria-controls`, Enter,
  Escape with focus return, outside-pointer dismissal, visible focus, touch-sized controls and no
  menu/document overflow. FAQ/forms retain their separately recorded verification status.
- [ ] Every used photo has a real inventory row and appropriate alt text/proof status.

## Legal, routes, facts

- [ ] All three legal policies render real provider content or a working established fallback.
- [ ] Cookie Settings actually reopens preferences; existing analytics-consent behavior preserved.
- [ ] Protected SMS/privacy utilities and working form endpoints preserved.
- [ ] Correct canonical URL, internal links, no duplicated service pages, and intended sitemap/indexation for each route.
- [ ] Resolve the supplied historical rodent-indexation/sitemap/About-link failures against current source; do not relabel them passed because they were pre-existing.
- [ ] Claims gated on actual evidence; source-copy inclusion alone does not prove insurance/coverage/hours.
- [ ] Build and required checks pass. If a check is stale, update its documented expectation and rerun; do not disable it.

## Final report

Report actual implemented routes, screenshots, call/form verification, policy preservation, source-copy trace, and remaining specific limitations. Distinguish docs-only work, local implementation, preview, and deployment. Do not claim a live-site change from this ZIP alone.

## 2026-09-20 — final inquiry-form functional QA

### Result

- [x] Production action is `/api/lead` on all 36 built inquiry-form routes; method, field names,
  required email, consent, honeypot, Turnstile widget, submission timestamp and idempotency key
  are present.
- [x] Mocked browser rejection preserves entered text and selected photos and stays on the form.
- [x] Rapid repeated submission produces one request; accepted responses alone reach the correct
  thank-you route. Result: **479/479 checks passed**. Machine-readable route-by-route evidence:
  `output/form-functional-qa/results.json`.
- [x] Endpoint/provider mocks cover required fields, email syntax, consent, spam rejection,
  supported/unsupported files, service enum mapping, estate role/property status/contents/timeline,
  full message and private photo references, HubSpot contact/deal mapping, owner notification and
  customer confirmation HTML/text.
- [x] Resend calls now use distinct stable per-lead idempotency keys for the customer and owner
  messages. Transient network/408/429/5xx failures receive at most three bounded attempts; the
  persisted delivery ledger records final success or failure. `scripts/ppc-endpoint-check.mjs`:
  **44/44 passed**, including second-attempt recovery and final-failure persistence.
- [x] No active form has an optional email field: the 2026-09-06 owner decision requires email on
  every active form. Defensive provider/template behavior still skips customer confirmation when
  no valid address exists; the no-email owner-notification state is covered by
  `scripts/submission-email-check.mjs`.
- [x] The Quick Handoff description is genuinely optional in label, DOM and backend. Its stale
  `required` attribute was removed. Shared Quick Handoff and AcCompact submission handlers now
  guard the entire in-flight path against repeat submission.
- [x] Conversion gating: `scripts/analytics-events-check.mjs` passed **38/38**. Rejected/local-
  invalid/network-failed submissions produce no success event; an accepted lead produces one;
  three rapid submits produce one request, attempt and success; no submitted PII enters events.
- [x] Server credentials remain Cloudflare Pages secrets. A production build search found none of
  `RESEND_API_KEY`, `HUBSPOT_ACCESS_TOKEN`, `TURNSTILE_SECRET_KEY`, `OWNER_ALERT_EMAIL`, or
  `EMAIL_FROM_ADDRESS` in `dist/` or `public/`.

### Installed form inventory

The route-by-route browser result covers these 36 rendered instances:

- Shared current forms: `/`, `/contact/`, `/estate-cleanout-san-jose/`,
  `/hoarding-cleanup-san-jose/`, `/extreme-cleaning-san-jose/`,
  `/deep-cleaning-san-jose/`, `/crime-scene-trauma-cleanup-san-jose/`, and
  `/rodent-dropping-cleanup-san-jose/`.
- Campaign forms: `/hoarding-cleanup-san-jose/assessment/`,
  `/rodent-dropping-cleanup-san-jose/assessment/`, and
  `/estate-cleanout-san-jose/assessment/`.
- Other built forms: `/commercial-cleaning-san-jose/`, `/debris-removal-san-jose/`,
  `/detailed-cleaning/`, `/estate-cleanout-checklist/`, `/eviction-cleanout-san-jose/`, `/faq/`,
  `/handoff-standard/`, `/pigeon-dropping-cleanup-san-jose/`,
  `/post-construction-cleaning-san-jose/`, `/projects/`, `/property-clearing/`,
  `/senior-downsizing-san-jose/`, `/service-areas/`, all three city hubs, all six city/service
  pages, `/specialty-cleaning/`, `/who-we-help/`, and `/window-cleaning-san-jose/`.

### Controlled live email evidence

Exactly one clearly labelled non-customer test was submitted through the deployed Contact form to
the repository's existing company-controlled QA address. Google analytics/advertising hosts were
blocked and analytics consent was not granted. The endpoint returned HTTP 201 with `ok: true`, the
browser reached `/thank-you/`, and the remote R2 record confirms:

- submission `fe0dc671-57ca-4409-a571-6e262335a146` / `AC-ZR6WCW` stored successfully;
- HubSpot accepted contact `534181480123` and deal `349669259979`;
- Resend accepted customer email `01a0bfad-a631-70cf-98c8-024f86377e2d`;
- Resend accepted owner email `01a0bfad-ac4c-71f7-bad5-2b263a2a0989`;
- SMS was skipped by configuration and owner email was the active notification path.

Evidence: `output/form-functional-qa/controlled-live-email.json` and
`output/form-functional-qa/live-delivery-ledger.json`.

**Evidence boundary:** “accepted” is not “delivered” or “received.” This workspace has neither
Resend event/API access nor access to the customer/owner inbox, and no delivery-event webhook is
implemented in the repository. Delivery events and inbox receipt for both messages remain an
exact launch blocker; mocked delivery was not substituted. The new local retry/idempotency change
also remains undeployed, as required by the no-deploy instruction.

### Commands completed

- `npm run check` — 0 errors (repository-wide hints only).
- `npm run build` — passed, 54 generated pages, `/dev/*` pruned.
- `npm run qa:submission-emails` — passed.
- `npm run qa:phase3:endpoint` — passed.
- `npm run qa:estate` — passed.
- `scripts/ppc-endpoint-check.mjs` — 44/44 passed.
- `npm run qa:forms:functional` — 479/479 passed across 36 forms.
- `npm run qa:analytics:events` — 38/38 passed.

No push or deployment was performed.

## 2026-09-22 — exhaustive route-by-route inquiry-form QA

### Scope and result

- [x] A fresh local build discovered **36 installed inquiry forms on 36 distinct routes**; every
  route has exactly one form. `/about/` has no inquiry form and is recorded as not applicable,
  not passed.
- [x] Each installed form was exercised through its rendered desktop and mobile page. The suite
  covers required controls, malformed email, malformed ZIP where offered, consent, keyboard order,
  exact multipart fields and page attribution, route-specific service/role/condition/timeline
  values, supported photos where offered, mocked 503 retention/error behavior, rapid-click
  idempotency, accepted redirect, and exactly-once privacy-safe tracking. Result:
  **992/992 checks passed**. Evidence: `output/form-functional-qa/results.json`.
- [x] Endpoint/provider mocks cover unsupported type, more than 10 files, individual files over
  10 MB, combined uploads over 75 MB, private-storage failure without false success, notification
  field mapping, stable email idempotency, and duplicate lead suppression. Result:
  `scripts/ppc-endpoint-check.mjs` **47/47 passed**.
- [x] Fix shared AcCompact and Quick Handoff forms so all installed form families emit the same
  accepted-lead-only event model. Add one per-form session claim to prevent thank-you recovery from
  double-counting; no submitted PII enters tracking.
- [x] Give Quick Handoff forms their rendered `id` and preserve the actual originating route in
  `entry_route` instead of reporting every instance as `/#request`.
- [x] Preserve the protected endpoint, approved copy/layout, consent, Turnstile, honeypot,
  attribution, idempotency, routes and server-side credentials. `functions/api/lead.ts` was not
  edited.

### Controlled production evidence

All controlled browser submissions used the repository's established company QA address and a
unique route marker. Google analytics/advertising hosts were blocked and consent was not granted,
so the runs could not count as advertising conversions. No customer address was guessed or used.

| Route | Submission | R2 / CRM evidence | Customer message | Owner message | Photo |
| --- | --- | --- | --- | --- | --- |
| `/` | `f6468bbe-78e0-440e-ad84-02ffca37697b` / `AC-YS38QF` | stored; HubSpot deal `350161436406` | Resend accepted `01a0cc81-994d-7259-bd55-263a95b33585` | Resend accepted `01a0cc81-a068-77cb-b2a7-e6c9b503c212` | production form did not expose its local upload control |
| `/hoarding-cleanup-san-jose/` | `81be63c5-b5b7-47cf-aa43-b0c15a76926a` / `AC-G6Z67H` | stored; HubSpot deal `350163235571` | Resend accepted `01a0cc82-d0e4-755d-a014-23df4ce2bd28` | Resend accepted `01a0cc82-d778-7382-a3bc-1989696f0ef8` | production form did not expose its local upload control |
| `/rodent-dropping-cleanup-san-jose/` | `c03f76ab-91a0-48a6-ba42-72b26a9c90ea` / `AC-R0ZQDA` | stored; HubSpot deal `350163235575` | Resend accepted `01a0cc83-4f04-75ab-bcc6-237c0b741819` | Resend accepted `01a0cc83-5739-7425-8c1c-eaa05ffaad91` | private R2 object retrieved authenticated; 4 bytes and submitted SHA-256 matched |
| `/crime-scene-trauma-cleanup-san-jose/` | `926fcd08-8a40-4e1e-b841-5f96cacfa745` / `AC-J9QWT2` | stored; HubSpot deal `349792758509`; **production stored the wrong Hoarding situation** | Resend accepted `01a0cc83-c4ae-7501-8a8c-65790cd77db0` | Resend accepted `01a0cc83-ca3a-731e-9d02-9f6f2d05838b` | production form did not expose its local upload control |
| `/extreme-cleaning-san-jose/` | `672ad7d8-d9f6-4945-afa0-f08e125945f3` / `AC-CWNDFP` | stored; HubSpot deal `349969246960`; **production stored the wrong Hoarding situation** | Resend accepted `01a0cc84-3637-7085-b885-f97358021b38` | Resend accepted `01a0cc84-3b71-7076-a74d-60952a5321d9` | production form did not expose its local upload control |
| `/contact/` | prior controlled run `fe0dc671-57ca-4409-a571-6e262335a146` / `AC-ZR6WCW` | stored; HubSpot deal `349669259979` | Resend accepted `01a0bfad-a631-70cf-98c8-024f86377e2d` | Resend accepted `01a0bfad-ac4c-71f7-bad5-2b263a2a0989` | no file supplied in that live run |

Production evidence is under `output/form-functional-qa/live-2026-09-23T04-23-31-867Z/`,
`output/form-functional-qa/live-2026-09-23T04-24-52-216Z/`,
`output/form-functional-qa/controlled-live-email.json`, and
`output/form-functional-qa/live-delivery-ledger.json`. The rodent upload was private and was read
with authenticated storage access; no public object URL was created.

### Evidence boundaries and open release blockers

- [ ] **Inbox delivery is blocked.** HTTP 201 plus the R2 delivery ledger proves that Resend
  accepted both messages; it does not prove a delivered event or receipt in either inbox. This
  workspace has neither Resend event access nor owner/customer inbox access.
- [ ] **Thirty routes still need their one-per-form controlled production submission.** The live
  endpoint enforces five attempts per IP per 15 minutes. Five new accepted tests exhausted that
  protective window; bypassing or changing the limiter was neither authorized nor appropriate.
- [ ] **Production deployment is pending.** The current local forms/tracking fixes are unpublished.
  In particular, the deployed Estate service route has no form; deployed Home, Hoarding, Trauma
  and Extreme forms lack the upload control present locally; deployed Trauma and Extreme map the
  service situation incorrectly. The local route-specific mapping assertions pass, but these
  production defects are not resolved until the current build is deployed and retested.
- [ ] Downstream production analytics receipt was deliberately not exercised during controlled
  email testing. Local rendered-page tests prove one success event per accepted response and none
  for validation or provider failures.
- [ ] The established QA email resolves to an existing HubSpot contact, but the test phone resolves
  to another test contact. HubSpot correctly avoided overwriting the existing phone and recorded
  the conflict. Align the controlled QA identity before further CRM delivery runs.

### Final regression commands

- `npm run build:local` — passed, 54 generated pages before pruning.
- `npm run check` — 0 errors, 0 warnings, 63 hints.
- `npm run qa:forms:functional` — 992/992 across 36 forms.
- `node scripts/ppc-endpoint-check.mjs` — 47/47.
- `npm run qa:submission-emails`, `npm run qa:phase3:endpoint`, `npm run qa:estate` — passed.
- `npm run qa:analytics:events` — 38/38.
- `npm run qa:launch` and `git diff --check` — passed.

No push or deployment was performed.
