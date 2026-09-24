# Aseptaclean — Approved Trauma & Crime Scene Cleanup Page

Approval: September 19, 2026. The owner approved the latest crime scene and trauma mockup with “lock it and update zip.” This revision supersedes the prior package copy and layout directions.

## Authority and files

- `trauma-service-preview.html`: standalone visual reference. Open in a browser. Its outer iframe is an export wrapper, not website implementation markup.
- `trauma-service-fragment.html`: exact approved source, including embedded illustrative imagery, scoped CSS, markup, and demo interactions.
- `trauma-service.css`: exact CSS extracted from the approved source, in original order. Later declarations intentionally resolve earlier layout and contrast rules.
- `APPROVED-COPY.md`: readable extraction; the HTML remains authoritative for wording, structure, and placement.

This approval applies to this service page. It does not change other approved pages or authorize publishing. Do not use the earlier rodent page's copy or a generic service template to override this reference.

## Installation sequence

1. Read repository instructions and inspect the existing trauma/crime-scene route, shared layout, navigation, form component, and styles. Preserve the canonical route rather than inventing a new URL.
2. Inspect the approved reference before editing. Preserve its navy and white palette, spacing, photographic proportions, heading hierarchy, and responsive behavior.
3. Implement the markup and scoped styles together. Importing CSS alone is not sufficient. Preserve project typography-role requirements with equivalent classes where needed; do not change the approved appearance to satisfy a selector convention.
4. Use `#ac-trauma` as the styling boundary. Scope header, main, and footer consistently. Adapt working shared components without breaking their behavior or restyling unrelated pages.
5. Integrate the production form and route handling; never install the mockup's fake submission handler as production behavior.
6. Verify the actual rendered result on desktop and mobile. Leave ready for review; do not push or deploy unless separately requested.

## Exact page order

1. Utility strip and white navigation, wordmark, phone CTA, mobile menu.
2. Full-width photographic hero with left navy overlay. Heading: “Trauma & Crime Scene Cleanup. Care Comes First.” Supporting copy and two CTAs match the source.
3. Attached three-part trust strip: CDPH Registered (Trauma Scene Waste · TSW 933); Written Plan & Price; Documented Work.
4. Six cleanup situations in a three-column, two-row desktop grid: Crime Scene Cleanup; Unattended Death Cleanup; Suicide Cleanup; Blood & Bodily Fluids; Accidents & Injuries; Affected Belongings.
5. Warm-background support section: “You do not have to handle this alone.” Full-width heading above text left and landscape illustrative photograph right. Three supporting points run across BELOW both columns.
6. Belongings section: full-width heading above text left, property discussion photograph right. Three decision steps run across the full width BELOW both columns, not inside the text column.
7. Navy assessment CTA band.
8. Four open process columns, numbered 01–04.
9. Warm-background scope section: “A written scope. Clear expectations.” Full-width heading above the text/image pair. Landscape photograph right. The two scope notes sit BELOW the split in a full-width two-column row.
10. Centered FAQ heading above a single accordion. First question starts open. Contact row below; no empty left sidebar.
11. Service-area introduction and two county lists: 15 Santa Clara County cities and 19 San Mateo County cities. Preserve the exact 34-city list; South San Francisco is excluded.
12. Compact closing assessment CTA strip.
13. Centered contact form.
14. Navy footer and legal row.

## Design requirements

- Brand palette: navy #1C355E, deep navy #122840, slate #6A9BC3. Preserve exact additional colors from CSS, including explicit contrast fixes.
- Main container: maximum 1120px; desktop inset 36px each side, compact layouts 20px each side.
- Standard section spacing: 68px vertically, 52px at the supplied compact breakpoint.
- Text/image splits: 45/55 proportions with 44px gap, reduced to 28px at compact widths; stack at 620px, with the support section stacking at 760px.
- Keep landscape documentation photos at 3:2. Do not stretch photographs to fill the height of long text. Preserve `background-size` and positioning per image.
- Preserve the supplied breakpoints at 850, 760, 620, 480, 380, and 360px as applicable. Adapt based on real rendered overflow only.
- Buttons consistently read “Request an Assessment” and “Call (408) 785-7588.” Assessment links reach the bottom form; phone links use `tel:+14087857588`.
- No numeric pricing, starting prices, assessment fee, or free offer on this page. General explanations of written scope and price remain approved. Do not borrow rodent pricing or campaign offers.
- No fabricated reviews, guaranteed insurance coverage, response-time promises, or blanket safety guarantees.
- Display availability as 7 AM–7 PM. CDPH TSW 933 relates to trauma scene waste, not contractor or estate-administration credentials.
- Section headings in the support, belongings, and before-work sections span above both columns. Give headings room; preserve type size and allow natural mobile wrapping.
- The wordmark is a text stand-in and photographs are illustrative. Use an approved real logo and suitable service photographs for production; flag missing assets. Do not claim these are photographs of actual Aseptaclean jobs.
- The hero uses the discreet interior-work tile from the embedded image sheet. Do not substitute the attic tile or add graphic incident imagery.

## Interactions and production integration

- In-page navigation scrolls to the matching section; mobile menu closes after selection and on Escape.
- FAQ questions are native keyboard-accessible details/summary controls.
- Respect reduced-motion preferences and maintain visible keyboard focus.
- Form includes name, phone, email, ZIP, cleanup type, optional message, optional photo selection, and consent. No minimum message length.
- Preserve production endpoint, actual field names, spam prevention, consent, analytics, validation, and successful-submission redirect. Map mockup labels to real backend fields rather than assuming names are compatible.
- Preview form submission validates locally and explicitly reports that nothing was sent. Photo selection only counts files locally; it does not upload them. Remove those demo behaviors only when real supported handling is connected.
- Do not add a working-looking upload control unless the backend supports uploading. Do not silently hide failures.
- The preview navigation and footer use local section links; retain the site's approved public navigation architecture in production and reconcile its appearance against this design. Campaign pages do not belong in public service navigation.
- Do not publish claims of certification, registration, emergency availability, or insurance arrangements that are not present and verified.

## Acceptance checks

Compare the rendered page against the approved HTML at 1440, 1024, 768, 390, and 320px, plus 200% zoom. Check hero wrapping, photo crops, button contrast, split proportions, below-image decision rows, FAQ balance, form sizing, footer, and horizontal overflow. Test menu, keyboard navigation, FAQ, anchors, phone links, validation, and the real inquiry flow in a test environment. Run the repository build and relevant existing checks.

The exact approved source, matching CSS extraction, copy extraction, anchors, unique IDs, 34-city list, absence of numeric prices, local form handler, script syntax, archive integrity, and preserved embedded image data were checked. Browser visual verification was not completed in this session because local preview navigation was blocked by the browser environment. This package is an approved design reference, not a deployed or production-tested page.

## Resume checkpoint

After each implementation phase, record changed files, finished sections, remaining differences, missing assets, checks performed, and the next action. Before resuming, read this document and that checkpoint. Do not redesign already approved sections.
