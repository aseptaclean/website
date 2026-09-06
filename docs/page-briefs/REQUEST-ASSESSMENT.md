# Page Brief — Tell Us About the Property (`/request-assessment/`) — RETIRED 2026-09-06

**Superseded in full.** The owner explicitly retired the standalone `/request-assessment/`
route on 2026-09-06: "The standalone Request Assessment page, expected at `/request-assessment/`,
must be unavailable." `src/pages/request-assessment.astro` is deleted, the route is removed from
`src/data/launchArchitecture.ts`, and every internal link/CTA that pointed at it now points at a
page's own embedded form (`#request` / `#contact-form` / `#assessment-form`) or `/contact/`.
Full resolution: `docs/05-CURRENT-DECISIONS.md`, 2026-09-06, "Standalone Request Assessment page
retired." This brief is kept for historical record only — do not build from it, and do not
recreate this route under this or any other path.

**Everything below this line describes the retired page and no longer applies.**

---

**Status (historical):** Situation-first architecture approved 2026-08-25. This brief does not
authorize a form rebuild. The current route, endpoint, protected consent/privacy/SMS/10DLC
language, indexation, and integration remain unchanged until a separate implementation task.

## 1. Page purpose

Let a stressed visitor describe the property in ordinary language, establish a safe contact
path, and defer technical qualification until after the visitor has explained the situation.

## 2. Primary visitor

Adult child or family decision-maker handling an aging parent's or relative's property. The
flow must also remain usable for owners, executors, trustees, fiduciaries, realtors, and
approved referral partners without making them the page's dominant voice.

## 3. Entry intent

The visitor may arrive from any approved service, situation, city, contact, or homepage path.
Do not assume they understand internal service categories. Preserve route/referrer context
where lawful and useful, but do not make a service taxonomy the first task.

## 4. First-stage information architecture

Begin with a compact, situation-first set:

1. Name.
2. Preferred contact method and the minimum contact field needed for that choice.
3. Property location at an appropriate level of specificity.
4. Open description: what is happening at the property and what help is being considered.
5. Optional photo upload only if storage, privacy, accessibility, file limits, and consent are
   fully specified and verified before implementation.

Do not require the visitor to choose a technical service category before submitting this
description. Operational qualification may follow in a later step or human conversation.

## 5. Approved copy and claims boundaries

- Visible primary CTA entering the page: **Tell Us About the Property**.
- Secondary global CTA: **Call Aseptaclean**.
- Keep `/request-assessment/`; do not create a replacement route.
- Do not describe the assessment as free. The currently approved on-site assessment fee is
  $195, credited toward an approved project booked within seven days, subject to current fact
  verification and appropriate placement.
- Do not publish a general starting price or desired-investment framing.
- Protected consent, privacy, SMS, 10DLC, carrier-reviewed, and regulated-scope language may
  not be paraphrased, reordered, deleted, or expanded without verified authority.

## 6. Integration boundary

`functions/api/lead.ts` is the only lead endpoint and `/api/lead` is the singular public URL.
Astro static output plus Cloudflare Pages Functions remains the platform. Do not create an
Astro API route, install the Cloudflare Astro adapter, create `/api/leads`, migrate platforms,
or alter the endpoint under this brief.

## 7. Required narrative sequence

1. Calm explanation of what the visitor can share.
2. Privacy and response expectation using verified copy.
3. Situation-first form fields.
4. Protected consent/disclosure content in its legally and operationally approved position.
5. Clear submit action and accurate processing state.
6. Verified confirmation state and next-step expectation.
7. Alternative call path for visitors who prefer not to submit online.

## 8. Form and interaction rules

Use explicit labels, not placeholder-only labels. Mark required and optional fields in text.
Preserve keyboard order, accessible error association, focus movement, file-upload clarity,
and submitted-value retention after correctable errors. Prevent duplicate submission without
hiding delivery failures. Never show success unless the endpoint confirms success.

## 9. Responsive requirements

Use a single clear reading and tab order on narrow screens. Keep labels, helper text,
disclosures, errors, and action controls adjacent to their fields. No horizontally compressed
multi-column field grids on mobile. CTA and consent text must wrap without ambiguity.

## 10. SEO and indexation

Keep the route's current indexation and sitemap state unchanged. Metadata should describe a
property-assessment contact path without claiming free service, guaranteed acceptance,
regulated capability, or availability in an unconfirmed city. Do not add `FAQPage` schema
solely to pursue a rich result.

## 11. Evidence and privacy

Do not request sensitive information merely because the form can store it. Define data
retention, access, photo handling, processor boundaries, and deletion behavior before adding
new collection fields. Do not expose submitted details in URLs, analytics events, logs, or
client-side error text.

## 12. Edge states

- Client validation error.
- Server validation error.
- Network interruption or timeout.
- Duplicate submission attempt.
- Optional upload rejected by type/size or interrupted.
- Endpoint unavailable: show an accurate failure state and the verified call alternative.
- Successful submission: state only what will actually happen and the verified response time.

## 13. QA and approval gates

Before implementation: field inventory, data-minimization review, final locked copy, protected
language diff review, privacy/consent review, endpoint-contract review, upload/storage decision,
and owner approval of the final sequence. After separately authorized implementation: endpoint
delivery test, spam/inbox test, error-state tests, keyboard/screen-reader review, responsive
review, analytics privacy review, and claims check.

## 14. Open decisions

- Exact first-stage field set and which contact channels are offered.
- Whether photo upload belongs in the first stage, a later stage, or human follow-up.
- Exact second-stage qualification fields and whether the stage is on-page or operational.
- Final protected consent/privacy wording and placement, if any change is proposed.
- Final success, failure, and response-expectation copy.
- Retention and processor rules for newly collected information.
