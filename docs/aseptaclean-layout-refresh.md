# Aseptaclean estate landing page — layout and image refresh

This revision supersedes the layout and section-order instructions in aseptaclean-estate-landing-page.md. Preserve its service boundaries, conditional offer claims, backend, consent, and tracking requirements. This handoff does not represent a live website change.

## Copy-ready prompt for the website Codex session

Implement this layout refresh on `/estate-cleanout-san-jose/assessment/` in the existing website repository. Use the existing page as your source for approved service copy and working functionality. Read repository instructions and inspect the current diff first. Preserve unrelated changes and the separate hoarding landing page.

911 Bio Clean is a structural reference only: clear introduction beside a form, relevant text/photo pairings, and an obvious contact path. Create Aseptaclean's own composition. Do not copy its page, imagery, wording, green styling, certification logos, or service promises.

### 1. Bright opening and working form

Remove the dark full-width living-room background. Use warm white #F7F8FA, navy #122840 text, Inter, and navy #1C355E buttons. Use a centered container capped at 1200px, with an approximately 54/46 desktop split and 40px gap. Top-align both columns. No viewport-height section or spacer divs.

Keep the estate/San Jose service label, existing H1, and short introduction. Keep the call button, walkthrough anchor, and “No need to sort or clean before contacting us.” Put “One person to call”, “Written plan and price”, and “Help from start to finish” in a restrained three-part line below the introduction rather than adding a large badge wall.

The form is a white panel with a subtle border, 16px corner radius, and restrained shadow. Heading: “Request a Free Walkthrough”. Supporting line: “Tell us a little about the property. We’ll contact you to discuss the next step.” Use visible navy labels and white inputs with clearly visible borders. Preserve required name, phone, email, and ZIP fields. Move optional property details and uploads into an accessible disclosure labeled “Add property details or photos (optional)”. Preserve consent text and controls visibly outside the disclosure. Do not shorten or change consent requirements as part of this visual task. Preserve all server integration, validation, notifications, attachment handling, and success/error behavior. Retain typed values if the disclosure closes. No minimum text length for optional details. Keep the submission button visually obvious.

On mobile: introduction, call/walkthrough buttons, then form. A walkthrough anchor must open any necessary panel, scroll to the form without the header hiding it, and move focus appropriately. Do not duplicate the form later in the page.

### 2. Get help with the whole cleanout

Place the accumulated-home illustration on the left, service explanation on the right. Use a 4:3 image around 400px tall maximum on desktop; no forced height on mobile. Use one short introductory paragraph followed by compact service rows drawn from the current approved offer: sorting/clearing/cleaning; belongings handling; donation coordination; project contact; completion records. Include shredding or expanded inventory only if their readiness was already confirmed; layout editing must not silently re-enable conditional claims.

Keep the proposal boundary near this list: “Your proposal explains which services, quantities, and records are included in your price.” Avoid several long introductory paragraphs above the actual offer. Do not remove unique service information just to shorten the page.

### 3. Keep what matters

Use a two-column section: explanation and Keep / Remove / Review on the left, careful-sorting illustration on the right. The three decisions must sit together beneath the explanation, not below a separate tall photo row. Preserve the wording about agreed searches and sorting effort. This replaces the oversized garage photo and its empty space.

### 4. Plan, price, and commitments

Merge “Know the price and schedule before you decide” with “Clear commitments from the start” into one compact navy section. Use a 60/40 desktop split: scope, price, expected schedule, exclusions on the left; approval of changes, belongings instructions, and the existing supported completion commitment on the right. No photograph here. Keep the clarification about newly exposed conditions and written approval of additional work. Do not reinstate a guarantee removed because its agreement terms remain unconfirmed. Add a clear call button and walkthrough anchor.

### 5. Three steps, with the same substantive process

Replace the five cramped columns with three evenly sized steps:

1. “Show us the home.” Call or share details, then walk through the property, belongings instructions, and any deadline with us.
2. “Review the plan and price.” See the agreed work and expected schedule before approving the project.
3. “We handle the cleanout.” We arrange the work, bring decisions to you, and review the finished work with you.

Preserve any supported update and completion-record details in these steps. On mobile use a vertical list. No oversized numbers or decorative progress animation.

### 6. Meet Matthew

Keep the authentic existing owner portrait. Use a roughly 320px-wide portrait on desktop beside the owner introduction, name, and call button. Crop using CSS object-position to preserve the face; never regenerate the owner's likeness. Reduce the surrounding empty space. Retain direct owner contact as the trust element. No fabricated reviews or company-crew photographs.

### 7. FAQs and final contact

Use accessible accordions for existing questions, retaining substantive answers and service limitations. End with a compact invitation and call/walkthrough buttons that point to the single working form. Preserve the footer, privacy links, and verified business details.

## Image replacement manifest

Remove the current dark living-room hero image, garage-storage image, and dirty-room image in the pricing section from this route. Do not delete shared assets used by other pages.

Two new generated illustrations accompany this brief as separate conversation images. Download and attach both to the website Codex session with this file. Match them by content; rename to `estate-accumulation-illustration` and `estate-sorting-illustration` in the site's asset directory. If attached assets are inaccessible, finish the layout with honest temporary placeholders and report the exact missing files; do not reuse rejected images or invent filesystem paths.

1. Accumulated home: a daylight residential room with substantial accumulated books, boxes, older furniture, and household belongings. Purpose: show the condition this service addresses. Alt text: “Illustration of a home with accumulated furniture, boxes, and belongings.”
2. Careful sorting: close view of family keepsakes and papers being sorted into boxes, with anonymous hands and no readable private information. Purpose: show the service and care. Alt text: “Illustration of family photographs and keepsakes being sorted into boxes.”

Each generated scene must have a small visible caption: “Illustrative image.” Do not call these Aseptaclean project photographs, proof of work, or before/after results. No generated employees, credentials, addresses, or client records. The two scenes are independent illustrations, not a before-and-after pair.

Use responsive image sources, explicit dimensions, and the project's existing image pipeline. Prefer WebP/AVIF where supported. Lazy-load below-the-fold images. Preserve useful framing across mobile and desktop. Avoid color casts, dark overlays, heavy filters, or embedded marketing text.

## Spacing and type

- Container max-width: 1200px; desktop horizontal padding 32px; mobile 20px.
- Section vertical padding: 64–80px desktop, 40–48px mobile. Use smaller gaps for related content inside a section.
- H1: fluid 36–54px, line-height 1.08–1.15. H2: 28–38px. Body: 17–18px, line-height 1.55–1.65.
- Keep prose lines near 55–65 characters. Avoid full-page-width paragraphs.
- Gap between paired content: 40–56px desktop. Top-align unless a deliberate centered alignment does not create empty space.
- Images: consistent 4:3 composition, modest 12–16px radius. Do not stretch a photo to the tallest text column.
- Use warm white, white, and one purposeful navy section; retain accessible contrast and visible focus states.
- At narrow widths, collapse all columns. No horizontal scroll, overlapping sticky elements, or enormous blank zones.

## Verification and delivery

Run the repository's build and appropriate targeted checks. Inspect the actual rendered page at 390px, 768px, and 1440px. Check image framing, form focus, optional disclosure, anchors, and contact buttons. Confirm existing successful and failed submission paths still behave correctly. Preserve consent-aware analytics: `generate_lead` only once after real backend success, never on button click or failure. Do not count a telephone click as a completed call. Preserve attribution and do not send personal information to analytics.

Deliver a preview and concise diff summary with screenshots. State which images were replaced and any missing assets or unverified behavior. Follow existing session authorization for commits and production deployment; this handoff alone does not authorize pushing an auto-deploy branch. Do not modify Google Ads campaigns. Finish with a reminder to check GA4 Recent events for `generate_lead`.
