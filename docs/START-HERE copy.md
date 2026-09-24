# Aseptaclean — approved Rodent & Animal Waste service page

Status: design approved by the owner on 2026-09-18.
Scope: public Rodent & Animal Waste service page, not an advertising landing page.
Approval source: the owner said “lock this in !” after reviewing the landscape-layout version.

## Source of truth

- `aseptaclean-rodent-approved.html`: standalone interactive visual reference. Open this first.
- `rodent-approved-fragment.html`: exact approved markup, styles, demo interactions, and embedded image assets.
- `aseptaclean-rodent-approved.css`: every style block extracted in its original cascade order. The last rules deliberately override earlier rules. Do not drop these overrides.
- `SHA256SUMS.txt`: file integrity reference.

Implement the approved composition. Do not redesign, add sections, rewrite copy, change CTA wording, or replace imagery without an explicit request. Existing site integration rules still apply; preserve the measured appearance when adapting markup to framework or typography conventions. Report conflicts instead of silently substituting a different layout.

## Locked section order

1. Utility bar and sticky navigation.
2. Full-width photographic hero with left-aligned text and two CTAs.
3. Three-column trust strip.
4. Where we help: six coverage items.
5. Attics and crawl spaces: text left, image right.
6. Your belongings matter: text/image row, then three steps underneath.
7. Navy assessment CTA band.
8. Our process: four steps.
9. Before work begins: text/image row, then two scope columns underneath.
10. Common questions: centered heading, single accordion column, contact row below.
11. Service area.
12. Assessment CTA strip.
13. Contact form.
14. Footer.

## Critical layout decisions

### Your belongings matter

Use an outer content container. Inside it, create a 45/55 text/image grid with the approved gap. Place the three-step group after that grid as a sibling, not inside the left text column.

The steps must appear across the entire container in this order:

1. Review what is affected.
2. Agree on the next step.
3. Put the scope in writing.

Desktop: three equal columns, 28px gaps, 36px top margin, a thin top divider and 24px top padding. At widths of 620px or less: one column, 24px gaps, 28px top margin. Preserve the existing icons and supporting text.

### Before work begins

The tall image version was explicitly rejected. Never restore it.

Use an outer content container with a text/image grid. Keep the eyebrow, heading, introductory paragraph, and assessment button in the left column. Keep the documentation image in the right column at a 3:2 landscape ratio, with no minimum height. Vertically center the columns. Use proportional image scaling; never stretch the image to match text height.

Place the two scope blocks AFTER the text/image grid, across the container:

- Cleanup & Removal.
- Separate Services.

Desktop: two equal columns, 40px gap, 32px top margin. At 620px or less: stack into one column with a 24px gap. The landscape image remains proportional on mobile.

Do not put the scope blocks back into the left text column. That configuration created the excess space that prompted the revision.

### Common questions

Do not use a narrow left introduction beside a tall right accordion. That version was rejected because it left dead space below the introduction.

Use one centered container, maximum 800px wide. Put the centered eyebrow and heading above the accordion with a 30px bottom margin. Use a single full-width accordion column containing all six questions, in their existing order. Keep the first answer open initially, as in the approved reference.

Below the accordion, place the short contact sentence and call button in a horizontal row, with 28px top margin and 24px gap. At 620px or less, stack this row. Use native details/summary disclosure controls. Do not add fixed heights to answers or reserve space for collapsed answers.

## Copy and service boundaries

The included fragment records the exact copy displayed when this design was approved. It is a snapshot for this page, not a claim that it is the repository-wide approved-copy source. The repository-wide copy source has not been verified in this session.

- Include attics and crawl spaces.
- Include affected insulation removal where included in the written scope.
- Do not offer insulation replacement or pest control.
- Preserve the distinction between affected belongings that can be cleaned and materials proposed for removal.
- Do not invent starting prices, health guarantees, certifications, reviews, or technical methods.
- Keep CTA labels exactly `Request an Assessment` and `Call (408) 785-7588`.
- Telephone href: `tel:+14087857588`.

## Copy changes must not break the layout

Use content-driven section heights. Keep text columns at min-width:0 and allow natural wrapping. Never shrink type, clip text, use line clamps, or introduce a tall image to absorb extra text. Keep bottom rows outside split text columns. Preserve the FAQ’s single-column layout as answers grow.

For future copy edits, compare desktop and mobile renders against this reference. If a copy change materially changes section balance, identify the exact block and proposed adjustment instead of quietly changing unrelated typography or spacing.

## Production integration

The interactive form is a demo: it validates locally and does not send inquiries or upload photos. Do not ship its demo success handler as a working lead form. Preserve the production endpoint, validation, consent, Turnstile, upload behavior, tracking, and thank-you routing when implementing this design. Remove demo-only labels only after actual integration.

The mockup uses page-local navigation. Production must keep the approved shared public header and six-service dropdown, including Estate Cleanout; do not treat the local preview navigation as authorization to replace global navigation. Campaign pages remain separate from the dropdown. Do not restore the service hub.

Photos are illustrative. Embedded assets support faithful previewing; replacing them is a separate decision. Avoid implying they document actual completed jobs.

## Implementation sequence and checks

1. Read this file and open the standalone reference.
2. Inspect the existing page, shared components, project instructions, and form integration.
3. Map the approved sections to actual components before editing.
4. Apply the markup and CSS with the original cascade preserved.
5. Integrate the shared navigation and working form.
6. Review at 1440, 1024, 768, 390, and 320px.
7. Check every assessment anchor, phone link, menu, disclosure, label, and focus state.
8. Confirm no horizontal overflow, distorted photos, light-on-light text, clipped copy, or blank columns beside the FAQ.
9. Compare the three critical sections above to the approved reference.
10. Report actual verification results and remaining gaps. Do not claim browser checks or live submissions were performed if they were not.

This package records approval and is not a deployment. The prototype received markup/anchor and script checks during creation; production-browser and live-form verification remain implementation tasks.
