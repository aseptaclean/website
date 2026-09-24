# Implement the locked estate assessment landing page

## Authority and scope
Reproduce estate-landing-fragment.html exactly before making any optional improvements. This is a campaign landing page, not a service-page redesign. Preserve unrelated pages, routing, forms, consent policy, analytics and tracking integrations. Do not deploy as part of source integration unless separately requested.

## Approved composition, in order
1. Compact utility/header with Aseptaclean brand, phone and assessment CTA; no full service navigation.
2. Warm-white editorial hero: left headline and supporting copy, substantial landscape photo right. Heading line 1: “Estate Cleanouts.” Heading line 2: “A Clear Path Forward”. Preserve capitalization and two-line hierarchy on desktop. CTA and phone are BELOW the complete text/image row. Local service note sits beside the actions. Below is the slim assurance strip.
3. The work ahead: full-width headline “From a full property to a clear next step.” with support below. Three full-width photographic rows with thin horizontal dividers. Each desktop row has photo LEFT, service heading MIDDLE, description RIGHT. Headings: Sort & set aside; Clear the contents; Clean for what’s next. Preserve all descriptions visible. No large decorative numerals, equal card grid, tabs, stage selector, or single-photo split section. These alternatives were rejected. At small widths photo sits left of stacked heading/description.
4. Warm belongings section: photo with overlapping navy text panel. Three numbered process descriptions span the width beneath the image and panel.
5. Documentation section: full-width heading “Know what was handled. Have a record of the work.” Supporting introduction below. Three open columns: Item inventory, Photo documentation, Document handling. Small icons MUST be left of the text, never above it. Keep scope qualifier below.
6. Navy out-of-town contact band.
7. Centered FAQ disclosures.
8. Centered assessment form at bottom.
9. Compact footer.

## Styling and assets
Use Inter and existing Aseptaclean navy #1C355E, deep navy #122840, slate blue #6A9BC3, warm white #F7F8FA. Match the source's actual padding, spacing, type, image proportions and breakpoints. All selectors are scoped to ac-estate-editorial. Preserve ALL style blocks in cascade order during first implementation. Earlier selectors remain in the source; later overrides are intentional. Only consolidate after visual comparison proves equivalence.

Photo atlas is embedded as a data URI; .photo uses 300% background sizing. Work-ahead rows use p8, p3, p5 respectively. Photos are illustrative, not evidence of completed jobs. Do not present them as before/after proof. Do not stretch images to fill arbitrary section heights. Lucide icon names are in data-lucide attributes; initialize through the production site's icon system. The standalone wrapper may require internet for its CDN resources.

## Content and interactions
CTA: Request an Assessment. Phone: (408) 785-7588; tel:+14087857588. Keep these available throughout. In-page CTA links lead to #estate-contact. Keep FAQ native keyboard-accessible disclosures. Preview form validates locally and does not submit; replace that demo handling with the existing production form integration before launch. Remove preview-only notice only when submission actually works. Preserve accessible labels, field requirements and consent requirements. Keep existing production tracking and conversion semantics; do not count demo validation as a conversion.

No prices, credentials, guarantees, donation arrangements or scope promises should be added without verification. The present content is draft; this lock approves layout, not final copy. Inventory and document handling are scoped services, not an automatic full appraisal or legal ownership determination.

## Integration sequence
1. Identify the assessment route and its existing submission/tracking behavior.
2. Integrate exact supplied visual structure and all styles under the page scope.
3. Connect the production icon, font, form and image systems while preserving appearance.
4. Compare at 1024px and wider, 768px, 390px and 320px. Verify headline breaks, full-width section headings, icons on the left, image proportions, wrapping and no horizontal overflow.
5. Verify phone links, in-page anchors, keyboard FAQ/form use, real submission success/error states and existing analytics gates. Avoid unrelated changes.
6. Report changed files, checks actually run and any unresolved issues. Keep layout fixed during future copy review unless explicitly asked to redesign.

## Validation performed for this package
Static markup checks confirmed three photographic service rows and valid in-page anchor targets. JavaScript syntax checked with Node. ZIP contents/integrity and source checksums checked. No browser-based visual validation or deployment is claimed.
