# Final approval note — 2026-09-19

The final mockup has horizontal service cards, six approved form fields, and no photo-upload input. It is a demo only: service cards open local detail panels and submission shows an explicitly labeled demo state without sending anything. The production requirements below still apply when implementation is separately authorized. Preserve existing working upload capability, validation, consent, endpoint, redirects and analytics. Do not add nonfunctional controls. No website modification, push or deployment is authorized by this ZIP update. Do not create Markdown progress files.

# Homepage behavior and production integration

Read00 before implementing. The approved prototype demonstrates appearance and local interaction. It is not a production backend contract.

## 1. Inspect and record before wiring

Locate the actual homepage, layout, Header/Footer components, form component, lead endpoint, upload handler, Turnstile configuration, consent controls, service data, redirects and analytics events. Do not assume their paths or names from old conversation summaries.

Record in `PROGRESS.md`:

- Current file paths and import relationships.
- Current six public service labels, exact routes, stable service keys and backend option values.
- Existing lead schema, required fields, upload limits and response shape.
- Existing success route, server-side protection and tracking trigger.
- Existing menu accessibility behavior.
- Typography rules and required checks from project instructions.

If source code is unavailable, stop claiming implementation access. Documentation or screenshots alone cannot connect the live form.

## 2. Navigation destination matrix

| Element | Prototype | Production |
|---|---|---|
| Brand | Scrolls to #ac-top | Same on homepage |
| Desktop Services trigger | Opens disclosure | Existing accessible dropdown, matched styling |
| Service menu entries | Open local detail panel | Link to existing canonical PUBLIC service routes |
| Who We Help | #ac-who | Same |
| Why Aseptaclean | #ac-why | Same |
| Service Area | #ac-area | Same |
| Contact | #ac-form | Same |
| Assessment CTA | #ac-form | Same; correct scroll position and focus |
| Telephone CTA | tel:+14087857588 | Same |
| Service tile | Opens local detail panel | Full tile links to corresponding PUBLIC service page |
| Footer service link | Opens local detail panel | Existing canonical PUBLIC service route |
| Footer Our Process | #ac-process | Same |
| Footer South Bay/Peninsula | #ac-area | Same |
| Privacy/Terms/Cookie Preferences | Absent in mockup | Retain actual site's destinations and consent action |

Production route adaptation is explicit: **do not ship the prototype's service-detail panel as the only path to public service pages.** Preserve tile appearance and replace button semantics with anchors. This prevents broken service discoverability while keeping the approved initial layout. There is no newly designed service hub.

Do not guess the Extreme Cleaning slug from its display name. Estate Cleanout must resolve to its public page, not the `/assessment/` campaign page. Keep `/services/` retired and preserve its existing redirect to `/#services` or update the anchor consistently if the project needs the new `#ac-services` identifier. Specifically: an existing `/#services` redirect must still land at the services section. Add a non-duplicate legacy anchor at that section or intentionally update all relevant internal redirects and document it; never leave the old destination broken.

## 3. Anchors and menus

- Section targets are unique and match the exact skeleton in02.
- Scroll offset90px matches the approved sticky header. At zoom or if header wraps, ensure targets are not hidden; adjust scroll offset based on measured header only when necessary for accessibility.
- Use native anchors with functional fallback. Do not intercept external URLs, telephone links or service routes in a generic scroll handler.
- Smooth scrolling must honor reduced-motion. The preview's detail-panel scroll calls do not all honor it; fix that in production rather than reproducing the defect.
- Assessment actions should reach the form and, when appropriate, focus the first field without double-scrolling.
- Existing legacy `#contact`, `#services` or other documented inbound anchors need explicit compatibility handling. Do not duplicate element IDs.
- Mobile menu closes after selection; Escape closes and returns focus to its trigger. Desktop dropdown is keyboard-operable. Preserve actual `aria-expanded` state if using buttons.
- No hover-only essential actions; phone/form paths remain reachable on narrow screens.

## 4. Production service rendering

Render service tiles/menu/footer links from a shared six-item data array so labels/order/destinations do not drift. Use the exact visible copy in01 but preserve stable route identifiers. Prefer server-rendered Astro markup so navigation and content exist without client JS. Do not depend on chat-provided Lucide globals.

The preview's local detail-panel mechanism remains useful for the supplied standalone reference only. If the owner later requests that panel in production, retain real service links and confirm its interaction scope before adding complexity. It is not required for this build.

## 5. Real form contract

Keep the existing tested form component/handler, but adapt its markup and styles to02. Removing old outer-card presentation is authorized. Replacing the handler with a simulated success state is forbidden.

| Concern | Requirement |
|---|---|
| Name/phone/email/ZIP | Preserve backend field names and validation; display labels from01 |
| Required fields | Follow existing approved validation; demo `required` attributes are not authority |
| Service select | Map visible labels to existing option values; six supported public choices plus an accepted undecided value |
| Message | No minimum character/word count; remove such constraints in client and server if present, without removing other validation |
| Photos | Optional real upload only; preserve existing file count, type, size and server handling |
| Consent | Preserve approved wording, privacy link and actual required state |
| Spam protection | Preserve server verification and honeypot/Turnstile behavior |
| Autocomplete | Use appropriate production tokens; demo `autocomplete=off` is not required |
| Busy state | Prevent duplicate submissions; visible submitting status; restore controls on failure |
| Errors | Accessible inline/error-summary messages; retain entered values |
| Success | Only after server acceptance; use existing success/thank-you route |
| Analytics | Existing consent-aware event mapping, no duplicate conversion on refresh |

If uploads are not implemented, do not leave an input that pretends to upload. Inspect whether the existing endpoint can support the approved feature. Implement within the existing infrastructure where authorized and feasible; otherwise record the exact limitation and mark the form incomplete. Do not change the design silently or claim all form functions work.

Do not bypass Turnstile to get screenshots. If the widget overflows at320px, use a supported compact/flexible configuration compatible with the installed implementation. Do not clip it, scale it illegibly, or use `overflow-x:hidden` to conceal the issue.

Preserve production environment configuration. Use documented test keys/local environment only for test submissions. Do not invent environment values or silently send production leads while testing.

## 6. Never copy these preview handlers into production

`reference/home-demo.js` exists for reference parity and can run the standalone mockup. Its submission handler calls `preventDefault()`, hides the form and shows a demo confirmation **without sending data**. Its upload handler only counts local files. Its service buttons open a local panel instead of navigating.

Production MUST NOT use those behaviors as actual integration. Do not rename “Demo request complete” to “Request received” and treat that as a working form. Do not claim photo uploads because filenames/counts appear.

## 7. Icons

Use the existing local/package icon mechanism or build-time SVGs. Do not require a global injected by ChatGPT. Required names:

`menu`, `arrow-up-right`, `arrow-right`, `shield-check`, `user-round-check`, `clipboard-check`, `check`, `house`, `file-check`, `key-round`, `building-2`.

Decorative icons use `aria-hidden=true`. Controls have visible labels or accessible names. Match the explicit CSS icon dimensions. Where the prototype inherits a runtime icon default, use24×24px as the baseline and verify against the approved reference. Do not introduce emoji or a different icon style.

## 8. Shared components and typography rules

Use a homepage variant/prop or scoped wrapper for shared components. Header/Footer are in scope visually; their navigation, focus, links and other routes must remain working. Being shared is not justification for leaving them in the old design.

If project rules prohibit element selectors for typography, move the same values into explicit homepage role classes and add those classes to markup. Preserve every responsive and component override. Do not delete the typography gate, change its rules, reduce heading sizes or claim a rule violation requires excluding the footer. Document the selector-to-role mapping in the progress log.

## 9. Accessibility and semantics

- One H1; meaningful H2/H3 structure. Do not convert headings to generic divs to evade rules.
- Use ordered-list semantics for the process if adapting the preview's divs; do not change its visible layout.
- Visible labels tied to controls; errors associated with fields; status changes announced appropriately.
- Full tiles may be anchors, but cannot contain nested interactive links/buttons.
- Keep focus indicators and ensure they contrast on navy and white.
- Images are descriptive or decorative appropriately; no misleading real-job claims.
- With JS disabled, service links, telephone links and primary content remain available. Follow the project's supported progressive form behavior; do not invent a fallback success.
- Security/consent controls remain real, not decorative mockup elements.
