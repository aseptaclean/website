# Implementation and QA

## Phase 1: inspect
Read repository instructions, current estate service route, shared components, and production form. Identify CSS collisions. Preserve existing canonical routes, tracking, consent, metadata, and working navigation. Keep typography role-class rules by mapping exact visual values to compliant classes.

## Phase 2: match the reference
Scope utility bar, header, main, and footer under #ac-estate. Preserve CSS source order: final landscape-image rules override earlier stretched-image rules. Import extracted CSS once only if removing inline style blocks.

Exact section order:
1. Utility bar and sticky navigation.
2. Photographic navy hero: “Estate Cleanout.” then “Care for What Matters.”
3. Three trust groups overlapping the hero bottom on desktop.
4. Introduction for families, executors, and trustees; text left, photo right.
5. Six scope entries: sorting, inventory, papers, cleanout, donations, cleaning.
6. Belongings split with three decision steps across the full width BELOW both text and image.
7. Navy assessment CTA band.
8. Inventory/documentation split with a landscape 3:2 image; two information blocks below both columns, followed by the founder passage. Never stretch the image vertically to match lengthy text. Preserve the latest CSS crop.
9. Four process steps.
10. Written scope/pricing section with two explanatory columns and both CTAs. No numeric starting price is approved in this reference.
11. Centered FAQ heading above accordion, contact row below. No empty left sidebar.
12. Service area introduction and two county groups containing the approved 34 cities. Preserve responsive city columns and the South San Francisco exclusion.
13. Quiet assessment strip.
14. Centered inquiry form.
15. Navy footer and legal row.

Core dimensions: 1120px content maximum; 72px total desktop gutters; 68px vertical section padding; 45:55 split with 44px gap; 620px form maximum; 800px FAQ maximum. Exact CSS controls all dimensions. Breakpoints: 850, 760, 620, 480, and 360px. At 620px main splits stack text first, trust groups become a non-overlapping column, and mobile navigation replaces desktop navigation. Scope grid: three columns, two at 760px, one at 480px.

## Phase 3: connect functionality
Consistent CTAs: “Request an Assessment” to the estate form; “Call (408) 785-7588” to tel:+14087857588. Preserve working sitewide navigation; page-scoped variants may be required. Do not remove global navigation across other pages based on this mockup.

Preserve actual form endpoint, field names/service values, spam protection, consent, validation, analytics, and successful-submission redirect. Map demo inputs to the existing backend contract. No minimum message length. Photo upload must be real and supported, never a visual-only production control. Replace the demo event handler with actual submission handling. Confirm success only after server acceptance. Test submission in a test environment; do not generate production leads without authorization. Keep demo status notices truthful until functionality is connected.

Use the approved logo and suitable approved photographs. Embedded photographs and sprite crops are illustrative references, not evidence of actual jobs. Report missing image assets; do not use the complete mockup as a page background. Load Inter and render Lucide icons through supported project dependencies; data-lucide placeholders alone do not display icons.

Preserve scope conditions: inventory detail is agreed in writing; donation coordination and shredding are unconfirmed and must not be promised. Disposal and remote access/update arrangements are confirmed per job. Appraisals and estate sales are excluded; cleanup records do not replace estate accounting. Do not invent prices, credentials, guarantees, or coverage.

## Phase 4: verify
Run build and relevant existing checks. Compare the rendered page against the reference at 1440, 1024, 768, 390, and 320px, plus 200% zoom. Check typography, contrast, image crops, spacing, horizontal overflow, and icon/font loading. Exercise mobile menu and Escape, keyboard focus, FAQs, anchors, phone links, and validation. Check shared-component regressions. Report unavailable browser/submission checks explicitly.

Deliver actual desktop/mobile screenshots, local preview, changed files, and remaining differences. Do not push or deploy.

## Verification status at lock — 2026-09-19
Completed source checks: one H1; valid in-page anchor destinations; form controls nested in labels; seven native FAQ accordions; 34 cities; demo submit handler prevents submission and contains no network calls. Photos remain embedded illustrative assets. HTML and CSS are synchronized.

NOT verified in a browser: appearance at 1440/1024/390/320px, image rendering, contrast in the actual host, horizontal overflow, font/icon rendering, menu/FAQ keyboard behavior, file selection, and native form validation. Cloud browser rejected localhost access and then blocked file-protocol navigation. Do not claim those tests passed.

This ZIP update does not change production code. Before any future implementation is called complete, run the browser and functional checks above in an accessible test environment. Report results in the conversation; do not create another specification or progress-log document unless requested.
