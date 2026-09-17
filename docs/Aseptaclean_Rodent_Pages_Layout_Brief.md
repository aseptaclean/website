# Aseptaclean — Rodent Cleanup Pricing and Contact Layout

Implementation brief · September 17, 2026

## 1. Task and target pages

Implement this layout in the existing Aseptaclean website repository on BOTH pages:

1. Service page: `/rodent-dropping-cleanup-san-jose/`
2. Ad landing page: `/rodent-dropping-cleanup-san-jose/assessment/`

Locate the actual Astro routes, layouts, shared components, styles, form handler, and project instructions before editing. These are public URL paths, not confirmed source-file paths.

This is a focused redesign of the pricing, assessment explanation, and contact-form sections. Preserve the current approved copy elsewhere on both pages. Do not replace both pages with the same full-page template.

Deliver implemented code and working local previews for both routes, not just advice or a plan. Publishing is outside this task.

## 2. What needs to change

The current screenshots show:

- Cleanup prices embedded in long headings and paragraphs instead of presented as clear choices.
- A pricing section that occupies excessive vertical space.
- A short introduction on the left of a tall form, leaving a large empty column.
- A duplicated “Tell us what you found” heading outside and inside the form.
- File guidance, consent text, and actions that feel visually disconnected.
- A disabled submit button and a message stating that submissions are not configured in the preview.

Keep the existing brand colors and restrained visual style. Improve grouping, hierarchy, alignment, and responsive behavior.

## 3. Required section structure

Use this order on both pages:

1. Compact pricing heading and introduction.
2. Two equal-width cleanup price cards.
3. One shared sentence explaining price factors.
4. A separate assessment strip with the $145 fee and credit terms.
5. One centered contact form with one heading and a short introduction.
6. A phone contact link immediately beneath the form.

The two price cards represent different project sizes. The assessment is a separate step, not a third cleanup package. Do not display it as a competing third pricing card.

## 4. Approved pricing-section copy

Eyebrow: **Cleanup pricing**

### Know where pricing starts.

You receive a written cleanup plan and price before work begins.

#### Card 1: Small-area cleanup

**Starting at $500**

For a small amount of rodent waste in one area that is easy to reach.

#### Card 2: Larger cleanup jobs

**Starting at $1,500**

For larger areas, waste in several places, or more items and materials to remove.

#### Shared note below the two cards

Final pricing depends on the amount of waste, access, materials, protective measures, and disposal needs.

### On-site assessment · $145

We check the affected areas we can reach and provide a written cleanup plan and quote. The fee covers the visit and review; cleanup is priced separately.

**The full $145 is credited toward your cleanup if you hire us.**

Assessment-strip button: **Request a Property Assessment**

Button behavior: scroll to this page’s contact form. Account for the sticky header so the form heading remains visible. Use the existing form anchor if one already exists; avoid duplicate IDs.

### Pricing and scope rules

- Keep “Starting at” visibly attached to both cleanup prices.
- Do not call these fixed all-inclusive prices.
- Do not introduce a $4,000 ceiling or present $1,500–$4,000 as a guaranteed range.
- Do not call the $145 on-site assessment free.
- Keep the credit condition directly beside the fee explanation.
- Free phone/photo review and paid on-site assessment must remain distinct.
- Preserve contaminated-material removal when included in the approved job scope.
- Do not add air sealing, insulation replacement, extermination, or entry-point sealing.
- Do not introduce new promises about insulation removal or structural work. This layout task does not expand the existing service scope.
- Do not invent discounts, response times, reviews, certifications, or guarantees.

## 5. Pricing layout specification

### Desktop

- Use a centered content container, maximum approximately 1120px wide.
- Use approximately 64px top and bottom section padding, adjusted to the site's existing spacing scale.
- Keep the heading and introduction together with about 24–32px before the cards.
- Use a two-column grid with equal-width cards and a 24px gap.
- Use a warm-white or very light neutral section background and white cards.
- Use subtle 1px borders, approximately 12px corner radii, and no heavy shadows.
- Card padding: approximately 28–32px.
- Card order: title, small “Starting at” label, large price, short explanation.
- Prices: approximately 40–48px, visually stronger than card titles.
- Card titles: approximately 20–22px. Body copy: 16–18px with comfortable line height.
- Let cards stretch to equal height naturally. Do not use fixed heights that clip text.
- Place the shared price-factor note directly below the cards; do not turn it into another large checklist.
- Separate the assessment strip with a subtle top border and about 24–32px spacing.
- Assessment strip: explanatory text on the left, one assessment CTA on the right. Stack when space is limited.
- Remove redundant call/assessment button pairs immediately above the form. Keep the assessment-strip action and the form's submit action.

### Mobile

- Stack price cards in their existing order when two readable columns no longer fit, around 640–700px.
- Stack the assessment text and its button.
- Use approximately 20px horizontal padding and 36–44px vertical section padding.
- Keep “Starting at” and the associated price clearly grouped.
- Do not create horizontal scrolling or shrink the text to fit desktop columns.

## 6. Contact-section copy and hierarchy

Eyebrow: **Start with a free phone and photo review**

### Tell us what you found.

Share a few details. We will discuss the work and whether an on-site assessment is needed.

Some small jobs can be quoted without a separate visit.

Show this introduction once, directly above the form. Remove the duplicate form-card heading and duplicate introductory paragraph.

### Visible field order

1. Full name
2. Phone number
3. Email
4. Property ZIP code
5. What needs cleanup?
6. Add photos or videos (optional), if the existing form supports both
7. Existing consent checkbox and wording
8. Submit button
9. Assessment-fee clarification
10. Phone alternative

Use this helper or placeholder for the message field:

> Where did you find rodent waste? Are any boxes, furniture, or other items affected?

Submit button: **Request a Property Assessment**

Below the button:

> We will explain the $145 assessment fee before booking a visit. The full fee is credited toward your cleanup if you hire us.

Phone alternative:

> Prefer to talk? **Call (408) 785-7588**

Use `tel:+14087857588` for the phone link.

## 7. Contact layout specification

- Remove the outer two-column introduction/form layout shown in the screenshots.
- Center the entire introduction and form in a single container approximately 680px wide.
- Left-align the heading, explanatory text, field labels, and supporting text inside that container.
- Keep the form section visually distinct from pricing with a white background and generous, consistent section padding.
- Do not add filler content or an unrelated stock image to occupy the empty left column.
- Use a two-column grid only for the four short input fields on desktop: name/phone, then email/ZIP.
- Message, uploads, consent, submit button, and fee clarification must span the full form width.
- Stack all fields into one column at approximately 480px and below.
- Use approximately 18–20px gaps between fields, input heights of at least 48px, and input text of at least 16px.
- Keep the message box around 110–140px tall initially, with vertical resizing allowed.
- Use visible labels, not placeholder-only labels.
- Make the submit button full-width and navy when enabled, with clear hover, focus, loading, and disabled states.
- Keep consent text readable at approximately 14px; do not shrink it to hide its length.
- Preserve the existing consent wording, checkbox behavior, and actual privacy/terms links. Do not invent destination URLs or rewrite legal terms as part of this visual change.
- Preserve upload capabilities and enforcement. The screenshots show up to 10 files, images up to 10 MB each, videos up to 50 MB each, and 75 MB combined. Verify those against the existing implementation before presenting them as supported limits.
- It is acceptable to place detailed upload limits in an accessible “File limits” disclosure, while keeping the optional upload label and supported media types visible.
- Place the phone alternative below the form in the same container, separated by a subtle rule. Do not leave it floating across the page outside the form's alignment.

## 8. Brand styling

Reuse existing design tokens and the installed Inter font where available:

| Role | Color |
| --- | --- |
| Primary buttons | Navy `#1C355E` |
| Headings | Deep Navy `#122840` |
| Restrained accent | Slate Blue `#6A9BC3` |
| Supporting border tone | Steel `#A8B8C8`, or the existing lighter border token |
| Section background | Warm White `#F7F8FA` |
| Card/form surface | White `#FFFFFF` |

Use dark, readable body text. Preserve keyboard focus indicators. Do not use pale blue for essential text on white. Keep the page bright; avoid a large dark pricing panel.

## 9. Keep the two page roles distinct

### Service page

- Retain normal site navigation, footer, educational content, and relevant internal links.
- Apply the new pricing and centered contact components within that existing page.
- Preserve its service-specific title, meta description, canonical URL, and valid structured data.
- Do not delete educational content to make it identical to the ad landing page.

### Ad landing page

- Retain the focused header and existing ad-aligned hero and service promise.
- Keep assessment CTAs directed to its own form and call CTAs directed to the phone number.
- Keep the contact form near the bottom; do not move it into the hero.
- Preserve its own metadata, indexing configuration, tracking context, and confirmation route unless an actual defect requires a documented fix.

### Shared implementation

Prefer reusable pricing/assessment markup or components and scoped styling for these two pages. Reuse the existing working form component where possible. If that component is shared across other services, add opt-in layout variants or compose a rodent-specific wrapper instead of unintentionally redesigning every form on the site.

Keep page-specific form IDs, source attribution, hidden values, service selection, CTA anchors, and submission destinations intact. Do not copy a form ID or thank-you path from another service without inspecting how it works.

## 10. Fix or accurately diagnose the submission issue

The screenshot states: “Online submission is not fully configured in this preview. Your answers will not be sent.”

Investigate why before changing the warning or button:

1. Inspect the current form handler, configuration checks, upload integration, and the repository's documented preview command.
2. Determine whether the warning is caused by an Astro-only local preview that does not run Cloudflare Pages Functions, missing configuration, or a real form defect.
3. Use the project's supported preview environment for full form behavior. Do not assume the root cause from the screenshot alone.
4. Preserve or restore real submission through the existing backend.
5. Preserve validation, spam controls, required fields, consent handling, and supported uploads. Do not add a minimum character count to the message field.
6. Show success and navigate to the appropriate confirmation page only after an actual successful backend response.
7. Preserve existing analytics/conversion behavior and prevent duplicate success events.
8. On failure, retain entered values and provide a readable error plus the phone alternative.

Do not merely enable the button, hide the warning, or display fake success. If credentials or configuration are unavailable, complete the layout and report the exact remaining integration blocker. Do not log or expose secrets. Use a local stub or documented test mode for development; do not send test leads or test notifications to real recipients without authorization.

## 11. Verification and acceptance criteria

Inspect BOTH routes at desktop and mobile widths, including approximately 1440px, 768px, 390px, and 320px.

- [ ] Both routes display the updated pricing, assessment, and contact layout.
- [ ] The $500 and $1,500 cards sit side by side when space allows and stack cleanly when it does not.
- [ ] The $145 assessment is separate from the cleanup cards, with its full-credit condition visible.
- [ ] The form is centered with no empty outer left column.
- [ ] “Tell us what you found” appears once within each contact section.
- [ ] No horizontal overflow, clipped text, cramped buttons, or overlapping sticky header.
- [ ] Labels, focus states, consent, uploads, and disclosures work with keyboard navigation.
- [ ] Assessment buttons reach the correct same-page form; call links use the correct phone number.
- [ ] Existing fields, data mapping, form attribution, legal links, and confirmation behavior are preserved.
- [ ] The normal service-page navigation and focused landing-page header remain distinct.
- [ ] The repository's build/type checks pass where applicable.
- [ ] Submission success/error handling is verified in a safe test environment, or a precise blocker is reported.
- [ ] Desktop and mobile screenshots of both updated sections are supplied for review.

## 12. Required handoff

Report the changed files, preview URLs for both pages, screenshots, checks completed, and any unresolved submission configuration. Clearly distinguish a verified working backend from a layout-only preview.

## 13. Copy-and-paste implementation prompt

Implement the attached `Aseptaclean_Rodent_Pages_Layout_Brief.md` in the existing Aseptaclean website repository. Apply it to BOTH `/rodent-dropping-cleanup-san-jose/` and `/rodent-dropping-cleanup-san-jose/assessment/`.

Build the actual changes: two cleanup pricing cards, a separate $145 assessment strip with full-credit terms, and one centered contact form with no duplicate heading or empty side column. Follow the brief's copy, brand styling, responsive behavior, and acceptance criteria.

Inspect project instructions and the existing Astro components/form integration first. Preserve unrelated content, the different roles of the two pages, routes, metadata, consent, upload support, tracking, and submission behavior. Scope shared-component changes so other service pages are not redesigned unintentionally.

Investigate the disabled submission message and repair any code/configuration issue that can be resolved with available access. Do not hide the warning or fake a successful submission. Complete the layout even if an external configuration blocker remains, and report that blocker precisely.

Run the appropriate build checks and inspect desktop/mobile layouts for both routes. Return changed files, working preview URLs, screenshots, verification results, and remaining blockers. Implement and preview; do not deploy as part of this task.
