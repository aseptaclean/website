# Aseptaclean — PPC hero copy update

Revision: AC-PPC-HERO-ROOMS-1.1  
Date: 2026-09-06 (supersedes AC-PPC-HERO-ROOMS-1.0 of the same date)  
Scope: Selected PPC hero and form wording only.

## Revision 1.1 — the walkthrough is free

Confirmed owner business decision, 2026-09-06: **the walkthrough offered through the PPC hoarding campaign is free.** Revision 1.1 replaces 1.0's "Request a Walkthrough" secondary CTA and submit button with "Request a Free Walkthrough", and replaces 1.0's form subtext. The 1.0 strings are superseded, not alternatives — do not ship both.

The exception is scoped to `/hoarding-cleanup-san-jose/assessment/` and its thank-you route. It does not reprice anything else: the $195 on-site assessment fee remains published on every other surface (`AGENTS.md` §4), `site.offer.assessmentFee` and `site.offer.assessmentFraming()` are untouched, and `site.offer.formSubmitCta` ("Send Message") still labels every other form on the site.

`free assessment` and `free consultation` remain banned sitewide (`AGENTS.md` §7, `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.2). This campaign offers a free **walkthrough**; no string calls it an assessment.

## Purpose

Install the selected “get usable rooms back” copy on the existing PPC hoarding landing page. This file captures the chosen direction from the hook review. It does not rewrite the rest of the landing page or change any images.

Target route: `/hoarding-cleanup-san-jose/assessment/`. Verify this route against the actual repository. Do not substitute the public SEO Hoarding page.

Install this file at `docs/page-briefs/ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md`.

## Sources and precedence

Read `AGENTS.md`, the current `PPC-HOARDING-SAN-JOSE.md`, and the existing CSS profile before editing. Search for equivalent filenames if their paths differ.

This update takes precedence over older PPC hero and form-copy variants only. The current PPC brief continues to govern the rest of the page. `aseptaclean-all-website-copy.md` remains the main public website copy source. The existing CSS profile governs visual design.

No ZIP or book is required to apply this update. All replacement wording is included below.

## Exact hero copy

### Eyebrow

Hoarding Cleanup in San Jose

### H1

Get back to living in the rooms you’ve been working around.

### Supporting lead

A bedroom you can sleep in. A kitchen you can use. Space to sit down.

### Body

Aseptaclean helps clear accumulated belongings and clean the agreed areas. We establish what stays, what goes and what needs your review before removal begins.

### Primary CTA

Call Aseptaclean · (408) 785-7588

Link: `tel:+14087857588`

### Secondary CTA

Request a Free Walkthrough

Link to the existing inquiry form using a working in-page anchor. Keep the phone CTA visually primary. This is the campaign's one secondary CTA string and it renders in three places on the route — the hero, the cost section and the final action band.

### Reassurance

You do not need to sort or clean before contacting us.

## Exact form-copy changes

### Heading

Start with the house as it is.

### Subtext

Tell us a little about the property. We’ll contact you to discuss the situation and arrange a free walkthrough.

### Submit button

Request a Free Walkthrough

Scoped to this campaign form only.

## Downstream campaign journey

The free walkthrough must be consistent across the whole campaign-specific journey, not just the hero. These are the other strings revision 1.1 governs:

- **FAQ “Can I start with photos?”** — closes with “For larger or more complicated properties, a free walkthrough may still be needed before pricing the work.” The superseded wording said “an onsite assessment”.
- **Campaign thank-you page** (`/hoarding-cleanup-san-jose/assessment/thank-you/`) — “We’ll review what you sent and contact you to discuss the situation and arrange a free walkthrough.” The superseded wording offered “more photos, a conversation or an onsite assessment”.
- **Campaign thank-you boundary line** — states outright that the submission “does not confirm an appointment”, alongside the existing does-not-schedule-or-authorize-work language.
- **Customer confirmation email** — a campaign branch keyed on the submission's entry route, ending “…then contact you to discuss the situation and arrange a free walkthrough. This request does not confirm an appointment.” Every other form keeps the existing confirmation text, including its on-site assessment sentence.

No other campaign copy changes. The approved hero H1, lead, body, reassurance line and all eleven numbered sections are preserved.

## Boundaries

- Replace the existing hero/form wording rather than appending another version or creating duplicate sections.
- Preserve the remaining approved landing-page sections, their copy, existing images, navigation, routes, metadata and tracking. Keep the PPC page’s `noindex, follow` setting.
- Preserve form fields, required email, validation, consent, spam protection, integration field names, optional uploads, submission handling, thank-you route, HubSpot mapping and owner notification.
- The customer confirmation email keeps its existing integration, trigger, provider and delivery path. Revision 1.1 changes only its message text, and only for submissions from this campaign's entry route — see “Downstream campaign journey” above. Submissions from every other form receive the unchanged confirmation.
- The form requests contact; it does not confirm an appointment. Do not introduce booking confirmation language or unsupported response-time guarantees. Offering a free walkthrough does not make the walkthrough booked: the copy arranges one, it never confirms one.
- Do not add claims about credentials, insurance, job duration, results, testimonials or service capabilities as part of this edit.
- Do not install, replace, optimize or remap images. Image work is being handled separately.
- Do not replace the entire `docs/` directory or the full public website copy file.

## Layout acceptance

Preserve the established 70% ClearPath / 30% 911 Bio Clean design, Inter typography, navy/slate palette, photo treatment and button styles.

Retain the roughly 55/45 desktop PPC hero with copy on the left and form on the right. Below the existing desktop breakpoint, stack the hero copy and call CTA first, then the form immediately.

Adjust headline wrapping, spacing and padding only as needed to accommodate the new wording within the existing CSS profile.

Verify the full desktop hero, including form consent and submit button, is visible above the fold at 1440 × 900, 1536 × 864, 1366 × 768 and 1280 × 800. Include header height and persistent interface elements in the measurement.

On mobile at 390 × 844, prioritize the complete headline and primary call CTA in the initial view; let the form continue naturally below. Also inspect the stacked layout at 768 × 1024 and 1024 × 768.

Do not clip content, hide fields or consent, introduce internal scrolling, scale the hero or shrink text below the profile’s readable sizes. If the complete desktop hero cannot fit within these constraints, report the measured conflict rather than silently changing the approved wording or hiding content.

## Implementation and verification

1. Locate the PPC page components and current sources. Inspect existing work before editing so concurrent image changes are preserved.
2. Apply the exact hero and form copy above to the rendered page.
3. Merge the same wording into the active `PPC-HOARDING-SAN-JOSE.md`, replacing its superseded hero/form wording. Reference revision AC-PPC-HERO-ROOMS-1.0. Preserve all unrelated sections. Do not leave both old and new copy marked active.
4. Run the available build checks and visually inspect the page at the specified viewports. Verify one H1, exact wording, no duplicated hero text, phone link, form anchor, readable wrapping and no overflow.
5. Confirm the change has not modified form integration code. This copy-only task does not require sending real emails or creating real HubSpot leads. Do not claim end-to-end delivery was tested from code inspection or UI checks.
6. Report changed files, the installed headline, checks completed, rendered screenshots or measurements, and any specific blockers. Distinguish completed verification from checks that could not run.

Implement the changes; do not stop at a plan. Do not publish or deploy.
