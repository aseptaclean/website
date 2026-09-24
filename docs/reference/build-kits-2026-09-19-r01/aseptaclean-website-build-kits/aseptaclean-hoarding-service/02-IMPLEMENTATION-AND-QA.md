# Implementation and QA

## Phase 1 — inspect
Read repository instructions, the current hoarding service route, shared components, styles, and functioning form. Preserve canonical URLs and unrelated edits. Identify style collisions first. Map typography to required role classes while preserving the approved appearance.

## Phase 2 — match the approved reference
Keep #ac-hoarding around utility bar, header, main, and footer. Preserve CSS order: the final landscape-image rules override earlier stretched-image rules. Import extracted CSS only once if removing embedded style blocks.

Section order:
1. Utility bar and sticky navigation, including “Your Quote”.
2. Hero: “Take Back Your Space.” then “Leave The Cleanup To Us.”
3. Three trust groups, overlapping the hero bottom on desktop.
4. Introduction: full-width eyebrow and heading above the body/photo split. Three supporting points span the full width beneath both columns and stack on mobile.
5. Full-width cleanup-scope heading with supporting introduction underneath, followed by six scope entries.
6. Full-width belongings heading above the text/photo split; three decision steps across the FULL WIDTH below both columns.
7. Navy assessment CTA band.
8. Full-width before-work heading above the text/photo split, landscape 3:2 photograph, then two information blocks below both columns. Do not stretch the image vertically.
9. Four process steps.
10. Written quote section with full-width heading and supporting introduction beneath it: “A plan for your home. A price you can review.” Two explanatory columns and assessment/call CTAs. NO starting prices, numeric tiers, or minimums.
11. Centered FAQ heading above accordion; contact row beneath. FAQ explains how quotes are prepared, not starting-price inclusions.
12. Service area with 15 Santa Clara County cities and 19 San Mateo County cities; South San Francisco excluded.
13. Quiet assessment strip.
14. Centered contact form.
15. Navy footer including “Your Quote”.

Exact HTML/CSS controls dimensions. Core values: 1120px content maximum, 72px total desktop gutters, 68px section padding, 45:55 split with 44px gap, 620px form maximum, 800px FAQ maximum. Breakpoints: 850, 760, 620, 480, 360px. Main splits stack text first at 620px, trust groups become a non-overlapping column, and mobile navigation replaces desktop links. Scope grid changes from three columns to two at 760px, then one at 480px. Preserve contrast corrections and the hero’s intentional line break. The five headings listed in START-HERE.md have no forced breaks and use the full section width. Preserve remaining intentional breaks; allow natural wrapping on narrow screens.

## Phase 3 — integrate
Use consistent “Request an Assessment” links to the hoarding form and “Call (408) 785-7588” links to tel:+14087857588. Preserve sitewide navigation functionality through page-scoped variants as needed. Do not remove global service navigation based on this in-page demo.

Keep existing form endpoint, field names/service values, validation, consent, spam protection, uploads, analytics, and successful-submission redirect. Map mockup inputs to the backend contract. No minimum message length. The demo handler only displays a local validation confirmation; replace it with production handling and show success only after server-confirmed acceptance. Do not create visual-only upload controls in production. Keep preview notices truthful until the form is functional. Test in a test environment; do not send a real production lead without authorization.

Use approved logo assets and suitable production photos with matching composition. Embedded photos are illustrative; report missing assets. Never use a screenshot of the entire page as the webpage. Explicitly provide Inter and render Lucide icons with the supported project mechanism.

Preserve copy boundaries: instructions from the authorized contact govern removal; inventory detail is agreed; contamination cleanup gets its own scope and price; repairs and pest control are outside the cleanout service. Disposal arrangements are confirmed per job; do not imply company-owned hauling or a verified dumpster-coordination service. Do not add guarantees, credentials, pricing, or coverage claims.

## Phase 4 — check and hand off
Run build and relevant existing checks. Compare the actual rendered implementation to the reference at 1440, 1024, 768, 390, and 320px and at 200% zoom. Inspect typography, spacing, photo cropping, contrast, overflow, icon/font rendering, and the landscape before-work section. Verify mobile menu/Escape, keyboard focus, FAQs, assessment anchors, telephone links, and form validation. Check other routes for shared-component regressions. Report browser or submission tests that could not be performed.

Deliver actual desktop/mobile screenshots, preview access, changed files, and remaining differences. No push or deployment.

## Verification status at lock — 2026-09-19
Completed source checks: one H1, unique IDs, valid in-page anchor destinations, seven native FAQ accordions, 34 cities, labeled form controls, unchanged local demo script with no network calls, JavaScript syntax check, synchronized CSS and copy, and ZIP integrity. The five requested headings span their sections and the introduction points follow the text/photo pair in source order. Embedded image bytes were preserved.

Not verified in a browser: desktop/mobile rendering, heading wraps at specific viewport widths, actual contrast, image/font/icon rendering, horizontal overflow, menu and FAQ interaction, keyboard focus, file selection, and native validation. Browser access to the local preview was blocked; file-protocol navigation was rejected by browser security policy. Do not claim browser tests passed or bypass that restriction. Use an accessible authorized test environment for future verification.

No production edits, pushes, deployments, real inquiries, or uploads occurred. Report future implementation and QA results in the conversation; do not create another specification or progress-log document unless requested.
