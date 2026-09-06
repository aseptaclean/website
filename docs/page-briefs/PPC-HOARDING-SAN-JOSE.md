# Aseptaclean — Hoarding PPC landing page

**Revision:** AC-PPC-HOARDING-1.0 · 2026-09-05  
**Hero, form and campaign-journey wording:** AC-PPC-HERO-ROOMS-1.1 · 2026-09-06 — see `ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md`. The walkthrough offered through this campaign is free (confirmed owner decision). That revision's strings are merged into this brief in place; where this document once carried the earlier wording, the earlier wording is superseded, not an alternative.  
**Design dependency:** AC-CP70-91130-1.1  
**Install this document:** `docs/page-briefs/PPC-HOARDING-SAN-JOSE.md`  
**Status:** Copy and implementation brief aligned to the supplied CSS profile and screenshot evidence. Actual repository, rendered page, form delivery and tracking remain UNVERIFIED.

## Purpose and authority

Build a dedicated paid-search landing page using Aseptaclean's existing visual system: 70% ClearPath / 30% 911 Bio Clean, Inter, navy palette, photographic hero, dark intake panel, large image/text sections and restrained FAQ rows. This is an additional campaign route; preserve the twelve existing public pages and the normal SEO Hoarding service page.

Read these current files before implementation:

1. `docs/reference/aseptaclean-css-profile.md` — visual authority, profile AC-CP70-91130-1.1.
2. `docs/styles/website-reference.css` — component recipes; map into existing production classes.
3. `docs/02-CURRENT-FACTS.md` — business facts and unresolved claims.
4. `docs/05-CURRENT-DECISIONS.md` — Call Aseptaclean is the primary marketing CTA.
5. This brief — campaign copy, section placement and explicit PPC exceptions.

The main copy document remains authoritative for normal website pages. This supplied campaign draft, with the edits recorded below, is the copy source for this PPC route only. Do not duplicate the SEO page into this route or replace its copy with this campaign copy.

### Explicit PPC exceptions — apply only to this route

| Role | PPC instruction | Shared design retained |
| --- | --- | --- |
| Header | Logo plus telephone/Call Aseptaclean; omit Services/About/Contact menus and dropdown | White header, existing logo, 72px desktop/64px mobile main-row target, same container |
| Hero | Approximately 55% copy / 45% form; the form remains 520–560px wide on tested desktop widths | Full-width photo, flat navy overlay, white copy, dark form panel, compact-height mode |
| Form | Fixed Hoarding service value; no redundant service selector; optional photos and email | Existing endpoint, validation, consent, anti-spam, controls and status behavior |
| CTA | Call Aseptaclean primary; a subordinate link to the form beside it — "Request a Free Walkthrough" in the hero (AC-PPC-HERO-ROOMS-1.1), "Start With Photos" in the mobile sticky bar | Verified central phone value; real form submit remains separate |
| Footer | Compact brand/contact/legal footer; omit the public site's four-column service directory | Deep navy, readable links, working policy and Cookie Settings controls |
| Indexing | Use the supplied `noindex, follow` configuration | Do not alter indexing on any other route |

These exceptions are deliberate. An audit must not restore the full navigation or four-column footer to this PPC page. The shared visual profile still controls colors, type, photography, controls, spacing and above-the-fold acceptance.

### Changes from the supplied draft

- Kept all eleven numbered content sections, the five-step process and six FAQ questions.
- Restored Call Aseptaclean as primary. The secondary CTA and the form submit label are both "Request a Free Walkthrough" per AC-PPC-HERO-ROOMS-1.1; "Start With Photos" survives only in the mobile sticky bar. The earlier "Send Message" submit label recorded here is superseded and does not ship on this route — it remains `site.offer.formSubmitCta` for every other form on the site.
- Shortened repetitive form helpers and success text. Required fields remain; photos and email remain optional.
- Combined sections 03–04 within one continuous visual band to avoid two separate oversized introductions to the same idea.
- Removed the two comparisons to a “cheap number.” Scope certainty makes the point without introducing a price-shopping frame.
- Chose one hero form and a final link back to it, resolving the draft's duplicate-form-or-anchor ambiguity.
- Made Insured conditional on the existing verified business-data flag. The supplied current facts file still records an unresolved insurance display check; do not invent verification or publish implementation notes as customer copy.

## Layout contract

### Shared values — reuse, do not fork a second design system

| Element | Target |
| --- | --- |
| Palette | Navy #1C355E; deep navy #122840; slate #6A9BC3; steel #A8B8C8; paper #F7F8FA |
| Typeface | Inter Variable; verify the font actually loads |
| Container | Maximum 1320px; gutters 32px at >=1200px, 24px at 768–1199px, 20px below 768px |
| H1 | clamp(34px, 3.65vw, 52px), 1.1 line-height, weight 700; compact desktop clamp(34px, 3vw, 46px) |
| Hero lead | 20–22px, about 1.35 line-height; a paragraph, not a second large H1/H2 |
| H2 | clamp(28px, 2.8vw, 40px), about 1.15 line-height |
| Body | 16–18px, 1.5–1.65 line-height; group related sentences into paragraphs |
| Section padding | clamp(48px, 6vw, 88px); trust strip, header and footer use their own compact spacing |
| Image/text split | Equal tracks, 56px gap desktop / 32px tablet; stack below 768px |
| Controls | At least 44px high, 16px input text; buttons at least 48px high; visible labels |
| Corners | Buttons/inputs 4px; form 8px; supporting images 0–8px |
| Form panel | Dark navy, white fields, 22px normal padding; 18px in compact desktop/mobile mode |

### Hero geometry and reading order

At >=1200px use two columns with a 52px gap. Allocate about 45% of the remaining width to the form, clamped to 520–560px. Give the rest to copy. This respects the shared form-width target and the requested approximate 55/45 relationship; do not use `55% 45%` plus a gap, which would overflow the container.

| Viewport | Container | Copy / gap / form | Copy/form split excluding gap |
| --- | --- | --- | --- |
| 1440px | 1320px | 708 / 52 / 560px | 55.8 / 44.2 |
| 1536px | 1320px | 708 / 52 / 560px | 55.8 / 44.2 |
| 1366px | 1302px | 690 / 52 / 560px | 55.2 / 44.8 |
| 1280px | 1216px | 640.2 / 52 / 523.8px | 55 / 45 |

These are target calculations before scrollbar differences, not measurements of a completed page.

Below 1200px stack in DOM order: eyebrow → H1 → reassuring lead → body → call action and secondary link → form. Use a 24–28px copy/form gap. No trust strip, separate photo, badge carousel, services menu or explanatory section may appear between the hero copy and form. Below 541px use one field column; preserve name, phone, ZIP, email, description, upload, consent, submit order.

Use one background photograph behind the hero. Do not create a third image column or a detached miniature photo beside the copy. The flat overlay is `rgba(18,40,64,.66)` as the starting recipe; verify contrast against the actual image. No decorative gradients, blur/glass effects, angled wedges, floating badges, giant radius or heavy shadows.

### Section composition

| Section | Composition | Image and hierarchy |
| --- | --- | --- |
| 01 Hero | Full-width photo, copy left, dark form right | Respectful accumulation photo; one H1; reassurance is a lead paragraph |
| 02 Trust | Slim paper-colored band; 24px block padding; four inline items, or three if Insured is not verified | Text with small existing icons optional; no badges or cards; 2 columns on mobile |
| 03–04 Decisions | One white section. Intro copy left, substantial photo right. KEEP / REMOVE / REVIEW row below both columns, with 32px separation | Keep both section anchors; one main H2 for the band and subordinate heading for the three-part row; no duplicate 88px padding between 03 and 04 |
| 05 Recognition | Paper background, contained equal image/text split, image left on desktop | Worn kitchen/context photo; condition list in the text column; no separate card for every bullet |
| 06 Process | White section, title above five compact horizontal steps | All five steps remain. Two columns at 541–1199px, one at <=540px; H3 step titles, modest numbers |
| 07 Hidden conditions | Deep navy photo/text band, copy left and substantial photo right | ClearPath-style visual weight with rectangular boundary; no emergency/24-hour badge |
| 08 Why Aseptaclean | White founder image/copy split, image left | Genuine founder image only; credentials as modest text after biography, not hero seals |
| 09 Cost | Paper background; readable copy max 880px; compact two-column factor list on desktop | No pricing cards or invented minimum price. Call primary, form link secondary |
| 10 FAQ | White; max 880px; separated accordion rows | Six real questions; keyboard-operable controls; answers in normal flow |
| 11 Final action | Deep navy contained band; copy left, call and form link right; stack on mobile | No second form. No new photo required |
| Footer | Compact deep navy continuation, subtle rule | Brand/contact, existing Privacy/Terms/Cookie links and genuine Cookie Settings control |

On mobile, sections 03, 05 and 07 place their explanatory heading/copy before the supporting photograph; the founder heading and portrait may lead the biography as one logical group. Set the DOM order accordingly, using CSS placement for the desktop alternate sides. Never reorder the hero form ahead of its copy.

### Image allocation

Use the existing approved asset manifest. The Adobe list is a candidate shortlist, not evidence of licensing. Prefer distinct photos for adjacent sections; do not add images to every block just to meet a quota.

| Slot | Candidate from the existing shortlist | Treatment |
| --- | --- | --- |
| Hero | Adobe 312817856, household accumulation | Wide source; meaningful clutter visible around the copy/form; no stock person |
| Decisions | Adobe 252453815, belongings detail | 6:5 desktop / 4:3 mobile; this resembles the hero scene, so avoid a near-identical crop |
| Recognition | Adobe 193810892, worn kitchen | Context for cleaning conditions; do not imply cleaning repairs damaged finishes |
| Hidden conditions | Adobe 206493513, stored garage contents | Context for inaccessible areas, not evidence of contamination or an Aseptaclean job |
| Founder | Actual approved Matthew Ruiz photograph | No AI or stock substitute; if missing, collapse the image track and record the asset dependency |

Hero export target 2400×1350, supporting 1800×1500; these dimensions never determine the rendered hero height. Only licensed originals or authorized company imagery may ship. Do not use watermarked previews or label stock images as company results.

## Campaign copy and component contents

The heading levels below organize this specification. In the rendered page, only the hero headline — “Get back to living in the rooms you’ve been working around.” per AC-PPC-HERO-ROOMS-1.0 — is H1; primary sections are H2 and process/FAQ/subsection titles use H3 or accessible control text as appropriate.

# PAGE CONFIGURATION

**URL**

`/hoarding-cleanup-san-jose/assessment/`

**SEO**

`noindex, follow`

**Navigation**

Do not use the normal full navigation.

Header:

**ASEPTACLEAN**

Right side:

**(408) 785-7588**
**Call Aseptaclean**

The conversion objectives are:

1. Call Aseptaclean — primary marketing action.
2. Send property details and optional photos — secondary conversion path.

Use the supplied route as a new campaign route after checking for an existing collision. Do not rename the normal Hoarding SEO route. Keep this noindex campaign route out of the public navigation and XML sitemap. Reuse existing legal-policy routes and cookie preferences. The logo can retain its normal home link; do not make it an inert imitation.

---

# SECTION 01 — HERO

> **Hero and form wording superseded by revision AC-PPC-HERO-ROOMS-1.0**
> (`docs/page-briefs/ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md`), merged here 2026-09-05 and installed
> in `src/data/ppcHoarding.ts`. That revision governs the hero eyebrow, H1, lead, body, secondary
> CTA and supporting line, plus the hero form's heading, subtext and submit label — and nothing
> else. Every other instruction in this brief, including the layout contract, the field table,
> validation, consent, upload handling and the sections below, remains active and unchanged.
> The superseded wording is not reproduced here: this brief carries one active version only.

**Layout:** Desktop 55/45 split. Copy left. Compact form right.

**Eyebrow**

Hoarding Cleanup in San Jose

# Get back to living in the rooms you've been working around.

**Supporting lead — render as a paragraph, not a heading:**

A bedroom you can sleep in. A kitchen you can use. Space to sit down.

**Body**

Aseptaclean helps clear accumulated belongings and clean the agreed areas. We establish what stays, what goes and what needs your review before removal begins.

**Primary CTA**

Call Aseptaclean · (408) 785-7588

Link: `tel:+14087857588` through the central phone configuration. Keep the phone CTA visually primary.

**Secondary link**

Request a Free Walkthrough

Link: `#assessment-form`. Photos are optional; the link goes to the form, not a forced file picker or an unverified SMS workflow.

Per AC-PPC-HERO-ROOMS-1.1 (owner decision 2026-09-06, the campaign walkthrough is free). This one string is also the secondary action in section 09 and section 11.

**Reassurance**

You do not need to sort or clean before contacting us.

---

## HERO FORM

**Single instance:** `id="assessment-form"`. Reuse the working form component with a PPC variant. Set the existing backend service value for Hoarding; verify its real value rather than inventing one. Retain existing required hidden fields and spam protection.

### Start with the house as it is.

Tell us a little about the property. We'll contact you to discuss the situation and arrange a free walkthrough.

| Desktop row | Left field | Right field | Validation |
| --- | --- | --- | --- |
| 1 | Full Name* | Phone Number* | Both required; name/tel autocomplete; telephone keyboard |
| 2 | Property ZIP Code* | Email (optional) | ZIP required; preserve existing supported ZIP validation; email validated only if supplied |
| 3, full width | Tell us what's going on* | — | Required textarea; helper below |
| 4, full width | Photos (optional) | — | Existing working upload control; no mandatory upload |

**Description helper:** Which rooms or areas are affected?

**Photo helper:** Wide room views and close-ups help.

Render actual file-type, size and count limits only from the supported upload configuration. Retain required upload notices and the real selected-file/error states; do not invent limits or silently drop files. A multi-line dropzone is not required: prefer the compact accessible control already supported by the application.

**Consent:** Reuse the existing approved contact/SMS consent text and controls exactly where applicable. The original draft's bracketed consent placeholder is not publishable copy. Do not invent legal language, precheck optional marketing consent, hide notices or reduce type to force fit. If approved consent or upload delivery is missing, complete the page locally and report that specific launch dependency.

**Submit button:** Request a Free Walkthrough

Scoped to this campaign form only. `site.offer.formSubmitCta` ("Send Message") still labels every other form on the site. The button requests contact; it does not confirm an appointment, which the microcopy below states explicitly. The walkthrough offered here is free by owner decision of 2026-09-06 (AC-PPC-HERO-ROOMS-1.1); that decision is scoped to this route and does not reprice the $195 on-site assessment published elsewhere.

**Under-button microcopy:** Sending this form does not schedule or authorize work.

Call Aseptaclean is a telephone link; Request a Free Walkthrough is a real submit button. Do not wire the submit button to a call, an anchor or a fabricated success state.

---

# SECTION 02 — TRUST STRIP

Four concise items across desktop when Insured is verified; otherwise render the remaining three with equal tracks:

**Insured** — display only when the existing verified insurance flag permits it. This note is implementation guidance, not public copy.

**Clear Scope Before Work**

**Photos Welcome**

**Direct Operator Review**

---

# SECTION 03 — CORE DIFFERENTIATOR

# Not everything has to go.

In an accumulated home, the difficult part is not always removing things.

It is knowing what should be removed — and what should not.

Important documents may be mixed with old papers.

Family photographs may be underneath boxes.

Valuables, medications, sentimental belongings and everyday possessions may be mixed into areas that have become difficult to use.

Aseptaclean does not assume everything in the property is disposable.

Before approved removal begins, the project can establish what stays, what goes and what needs another decision.

---

# SECTION 04 — KEEP / REMOVE / REVIEW

**Layout:** Three-column system on desktop.

# A clear plan before things start moving.

### KEEP

Items, belongings or areas that are supposed to remain.

### REMOVE

Material already approved for clearing or disposal.

### REVIEW

Anything uncertain that needs a decision before it is removed.

**Strong line**

The goal is to move the property forward without creating unnecessary loss or confusion.

---

# SECTION 05 — RECOGNITION

# When everything is mixed together, the project can feel impossible.

Accumulated belongings may be only one part of the condition.

Once rooms begin to open up, there may also be:

- Heavy dirt and buildup
- Trash or unwanted material
- Surfaces that have not been accessible for a long time
- Rodent droppings or animal waste
- Strong odors
- Neglected kitchens or bathrooms
- Additional cleaning conditions underneath stored material

That is why Aseptaclean does not begin with a generic cleaning checklist.

**We start with the property.**

---

# SECTION 06 — PROCESS

# How Aseptaclean approaches the cleanup

## 01 — Understand the Property

We review which areas are affected, the amount and type of accumulation, access, visible conditions and any concerns that may change the work.

## 02 — Establish the Decisions

We determine the agreed rules for what stays, what goes and what needs review.

## 03 — Define the Scope

The proposed work, assumptions and known exclusions are established before production begins.

## 04 — Work Through the Property

Approved clearing and cleanup proceeds through the affected areas in a controlled order.

## 05 — Review What Was Completed

We review the approved work and identify anything outside the original scope that may still require attention.

---

# SECTION 07 — HIDDEN CONDITIONS

**Layout:** Deep navy photo/text band, as mapped above.

# What becomes visible later can change the job.

A floor that has not been visible for years may look different once accumulated belongings are removed.

A cabinet may reveal an additional condition.

An odor may have a source that could not previously be accessed.

An affected surface may require more work than could be seen during the initial review.

This is why clear scope matters.

**If a newly accessible condition would materially change the approved work, it should be identified and discussed before additional work proceeds.**

You should understand what is being proposed before additional work begins.

---

# SECTION 08 — WHY ASEPTACLEAN

**Layout:** Founder image / copy split.

# Look carefully first. Then decide what the property actually needs.

Aseptaclean was built around a condition-first operating approach.

Founder Matthew Ruiz's background includes biochemistry, pharmaceutical manufacturing and surgical pathology — environments where details, contamination and following the right process matter.

That experience shaped a simple operating mindset:

**Understand the condition. Define the work. Then move through the property in the right order.**

### Company Credentials

**Insured** — display only when the existing verified insurance flag permits it. This note is implementation guidance, not public copy.

**California Registered Trauma Scene Waste Management Practitioner — TSW #933**

The trauma-scene registration is a company credential and is not presented as a hoarding-specific certification.

---

# SECTION 09 — COST

# What does hoarding cleanup cost?

There is no honest flat price for this type of work.

A property with moderate accumulation is very different from a home involving multiple affected rooms, extensive sorting, difficult access, sanitation concerns or substantial cleaning underneath.

The scope can be affected by:

- Amount of material
- Amount of sorting required
- Number of affected rooms or areas
- Property access
- Sanitation conditions
- Disposal requirements
- Odors
- Cleaning required after areas are cleared

After we understand the property, we can explain what we recommend, what is included and what the work will cost.

**You should know what is included before work begins.**

**Primary CTA**

Call Aseptaclean · (408) 785-7588

**Secondary link**

Start With Photos → `#assessment-form`

---

# SECTION 10 — FAQ

# Common questions

## Are you going to judge the condition of the house?

No.

You do not need to make the property look better before contacting us.

You do not need to have an explanation ready.

Show us what is happening.

We'll start there.

---

## Are you going to throw everything away?

No.

We do not assume everything in an accumulated home is disposable.

What stays, what goes and what needs review should be established before approved removal begins.

If particular documents, photographs, valuables, rooms or belongings need attention, tell us.

---

## Do I need to clean or organize before you see the property?

No.

We would rather understand the property in its current condition.

Cleaning or moving things first can make it harder to understand what the project actually involves.

---

## Is the situation too bad?

You do not need to make that determination yourself.

Some properties need straightforward clearing and cleaning.

Others involve years of accumulation, sanitation problems, animal or rodent contamination, odors or rooms that have not been accessible for a long time.

Show us what is happening and let us determine the appropriate next step.

---

## Can I start with photos?

Yes.

Photos are often the easiest way to begin.

Take wide photos that show the overall room, then closer photos of the areas that concern you most.

For larger or more complicated properties, a free walkthrough may still be needed before pricing the work.

---

## Can you give me a price from one photo?

Sometimes photos provide enough information to determine the next step, but a single photo may not show the amount of material, access, sorting requirements or conditions underneath.

We would rather tell you when more information is needed than give you a number we cannot responsibly stand behind.

---

# SECTION 11 — FINAL CTA + LINK TO FORM

**Layout:** Deep navy conversion section.

# You do not have to solve the whole property today.

## Start by showing us where things are now.

You do not need to clean.

You do not need to organize.

You do not need to know what service to request.

Call us, or send a short description with any photos you have. We'll review what you are dealing with and determine the appropriate next step.

**Primary CTA**

Call Aseptaclean · (408) 785-7588

**Secondary link**

Start With Photos → `#assessment-form`

Use a real same-page link to the single hero form on every device. Preserve entered data, scroll it below any sticky header and place focus at the form heading or first field without opening the file picker automatically.

---

# FORM SUCCESS STATE

## Request received.

We'll review what you sent and contact you to discuss the situation and arrange a free walkthrough.

You do not need to clean or organize before we speak.

Show only after the real submission succeeds. If photo upload fails while details succeed, report the partial outcome accurately and provide the supported retry/contact path. Never claim photos were received unless the upload was confirmed. Failure preserves entered fields and gives an accessible retry message. Do not promise an unverified response time.

**Boundary line:** Sending this form does not schedule or authorize work, it does not confirm an appointment, and it does not create a service agreement.

Per AC-PPC-HERO-ROOMS-1.1. "Arrange" is load-bearing: the submission requests contact and a free walkthrough, and nothing on this page or in the confirmation email may read as a booked visit. The superseded wording offered "more photos, a conversation or an onsite assessment" as possible next steps, which contradicted the free walkthrough this campaign now advertises.

**Customer confirmation email.** The campaign branch is selected by the submission's entry route, not by `offer_type` — this form posts the shared `handoff_reset` type, so keying on that would rewrite the confirmation for every other form on the site. Campaign text: "…Aseptaclean will review the information and photos you provided, then contact you to discuss the situation and arrange a free walkthrough. This request does not confirm an appointment." Submissions from every other form keep the unchanged confirmation, including its on-site assessment sentence.

---

# MOBILE STICKY CTA

Below 1200px, show after the complete hero has left the viewport:

**Call Aseptaclean** | **Start With Photos**

The call receives primary styling; the form link is secondary. Hide the bar while the hero/form is visible or the user is editing a form field, and when a modal cookie panel needs that space. Use existing viewport/keyboard handling where available; test it rather than assuming fixed positioning avoids the keyboard.

Reserve the actual bar height plus safe-area inset at the bottom of the document while shown. It must not cover legal links, focused controls or the submit button. Both actions have at least 48px tap height. No desktop fixed bar is needed.

---

# PAGE DESIGN RULES

Serious, calm, private, photographic and premium without luxury staging. Use the shared Aseptaclean component family and the exact section mapping above.

Do not add giant SaaS cards, decorative gradients, excessive animation, fake ratings or review counts, countdowns, urgency claims, discount banners, shame-based or graphic imagery, stock technicians or oversized certification badges.

The visual hierarchy remains: search relevance → easy first step → differentiation → process → scope clarity → authority → cost → objections → conversion. This is a composition guide, not a claim of measured conversion performance.


## Scoped CSS integration recipe

Use this only after mapping the shared reference recipes into the actual application. Set `ac-ppc` on this route's outer page root, with header/main/footer inside it; all exceptions below are scoped to that root. Existing class names may differ: adapt selectors instead of adding a second unused stylesheet. Reuse the actual Inter/font, button, field, form, FAQ and token definitions. Do not paste reference global resets over the live application.

```css
/* AC-PPC-HOARDING-1.0; depends on AC-CP70-91130-1.1 recipes.
   Load with the page component after the shared component rules.
   This is a sizing recipe, NOT a rendered acceptance result. */
.ac-ppc .ac-header__row { justify-content: space-between; }
.ac-ppc .ac-hero__grid {
  grid-template-columns:
    minmax(0, 1fr) clamp(520px, calc(45% - 23.4px), 560px);
  gap: 52px;
  align-items: center;
}
.ac-ppc .ac-hero__grid > * { min-width: 0; }
.ac-ppc .ac-hero__lead {
  font-size: clamp(20px, 1.6vw, 22px);
  line-height: 1.35;
  font-weight: 650;
  margin: 0 0 16px;
}
.ac-ppc .ac-hero__body { margin: 0; max-width: 58ch; }
.ac-ppc .ac-form { width: 100%; }
.ac-ppc .ac-form__header { display: grid; gap: 4px; }
.ac-ppc .ac-form__title {
  font-size: 24px; line-height: 1.2; margin: 0;
}
.ac-ppc .ac-form__intro,
.ac-ppc .ac-form__helper,
.ac-ppc .ac-form__consent,
.ac-ppc .ac-form__microcopy {
  font-size: 14px; line-height: 1.45; margin: 0;
}
.ac-ppc .ac-form__helper { margin-top: 4px; }
.ac-ppc .ac-form__grid { align-items: start; }
.ac-ppc .ac-form__field { min-width: 0; }
.ac-ppc .ac-form input[type="file"] { max-width: 100%; }
.ac-ppc .ac-form__status:empty { display: none; }
.ac-ppc #assessment-form { scroll-margin-top: 88px; }
/* Replace 88px with measured sticky-header stack + 16px where needed. */
.ac-ppc .ac-trust {
  padding-block: 24px;
  background: var(--ac-paper);
}
.ac-ppc .ac-trust__grid {
  display: grid;
  grid-template-columns: repeat(var(--ac-trust-count, 4), minmax(0, 1fr));
  gap: 16px 24px;
}
/* Set --ac-trust-count to the number of actually rendered items. */
.ac-ppc .ac-decisions__row {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px; margin-top: 32px;
}
.ac-ppc .ac-decisions__item {
  border-top: 1px solid var(--ac-steel); padding-top: 20px;
}
.ac-ppc .ac-cost { max-width: 880px; margin-inline: auto; }
.ac-ppc .ac-final__grid {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  align-items: center; gap: 32px;
}
.ac-ppc .ac-footer { padding-block: 28px; }
.ac-ppc .ac-footer__legal {
  display: flex; flex-wrap: wrap; gap: 12px 24px;
}
@media (max-width: 1199px) {
  .ac-ppc .ac-hero__grid { grid-template-columns: 1fr; gap: 28px; }
  .ac-ppc .ac-form { max-width: 680px; }
  .ac-ppc .ac-final__grid { grid-template-columns: 1fr; }
}
@media (min-width: 1200px) and (max-height: 850px) {
  .ac-ppc .ac-hero__shell { padding-block: 20px; }
  .ac-ppc .ac-hero .ac-title { font-size: clamp(34px, 3vw, 46px); }
  .ac-ppc .ac-hero .ac-actions { margin-top: 16px; }
  .ac-ppc .ac-hero .ac-form { padding: 18px; gap: 8px; }
  .ac-ppc .ac-hero .ac-form__grid { gap: 8px 14px; }
  .ac-ppc .ac-hero .ac-form textarea { min-height: 64px; }
}
@media (max-width: 767px) {
  .ac-ppc .ac-trust__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 540px) {
  .ac-ppc .ac-form__grid,
  .ac-ppc .ac-decisions__row { grid-template-columns: 1fr; }
}
```

The background/overlay, font tokens, 36px normal hero padding, 72/64px header, containers, primary buttons, focus states, split grids, process and FAQ come from the shared profile. The code above intentionally only adds PPC rules. Implement sticky-bar state and reserved bottom spacing through the existing layout mechanism; CSS alone does not supply state, focus, upload, consent or form delivery.

## Above-the-fold release gate

Keep the original profile's strict gate. At 100% zoom and scroll zero, the complete desktop hero must end at or above `viewport height − persistent bottom obstruction − 16px`. Include actual header/utility height, all hero copy, complete form, helpers, consent, initial anti-spam controls, submit button and bottom padding.

| Viewport | Example content budget with 72px header, no bottom obstruction | Required result |
| --- | --- | --- |
| 1440×900 | 740px after 36px top/bottom hero padding and 16px clearance | Full hero fits |
| 1536×864 | 704px after 36px top/bottom padding and clearance | Full hero fits |
| 1366×768 | 640px after 20px top/bottom padding and clearance | Full hero fits |
| 1280×800 | 672px after 20px top/bottom padding and clearance | Full hero fits |
| 390×844 | Stacked layout | Entire H1 and primary call visible initially; form follows copy immediately and may continue below fold |
| 768×1024 | Stacked layout | Same headline/call and immediate form order requirement |
| 1024×768 | Stacked layout | Same headline/call and immediate form order requirement |

No fixed hero height, `100vh` forcing, negative-margin escape, scaling, clipped content or internally scrolling form. Keep inputs >=16px/44px, buttons >=48px and helpers/consent at readable 14px. Do not hide fields, legal text or upload notices, even if they cause a failure.

The compact form wording and two-column fields make fit more plausible; actual consent and upload UI determine whether it passes. If it overflows, first remove unintended margins/spacers, confirm the cascade, group fields correctly and apply compact mode. If that still fails, report exact overflow and the offending content/control. Keep the content accessible and propose the smallest explicit revision; never mark it aligned because the overflow can be scrolled to.

Measure first-load and consent-handled states separately. Record cookie/chat/bar obstruction rather than suppressing it for screenshots. Modal-obstructed is not a pass. Test validation errors, selected files, long filenames, success/failure, keyboard navigation, 320px width and 200% zoom separately for access and reflow; arbitrary error text and accessibility stress states do not have to retain initial desktop fold fit.

## Form and PPC behavior acceptance

- Resolve the existing form endpoint, actual backend Hoarding value, notification destination, anti-spam and approved consent before wiring this variant. Do not create a disconnected imitation form.
- Confirm both no-photo submission and supported photo submission through the project's authorized test path. Do not send an unapproved message to a live recipient just to claim a test pass; use test mode where available and report live delivery as unverified otherwise.
- Confirm phone links use the central number and `tel:+14087857588`, display `(408) 785-7588`, and remain usable without analytics.
- Reuse existing campaign attribution fields only where supported and consistent with the site's consent behavior. Do not put names, phone numbers, free-text descriptions, photo contents or filenames into analytics events.
- Count form success only after confirmed submission, not on button click. A telephone-link click is an intent event, not proof of a connected or qualified call. Do not label either as revenue or a booked job.
- Preserve `noindex, follow` for this route and verify it in rendered output. Do not block page access as a substitute for the supplied noindex setting.
- Show supplied founder/registration facts using the existing current business-data rules. Keep the trauma registration separate from hoarding certification; retain any applicable existing founder-background qualification. Do not add coverage areas, response times, reviews or contractor claims.

## Installation and documentation change

Add this one brief under `docs/page-briefs/PPC-HOARDING-SAN-JOSE.md`. Add a scoped entry to the current decisions/route inventory:

> Additional campaign route: `/hoarding-cleanup-san-jose/assessment/`, a dedicated noindex PPC landing page. Uses AC-CP70-91130-1.1 with only the exceptions in `page-briefs/PPC-HOARDING-SAN-JOSE.md`: compact navigation/footer, approximate 55/45 hero and Hoarding-specific intake. Call Aseptaclean remains primary. Existing SEO routes remain unchanged.

Reference it from the docs index and include it in campaign-page audits. Do not replace the whole docs folder, rewrite the shared CSS profile or silently add this PPC route to the public navigation. Preserve the uploaded draft as historical source if the repository keeps source snapshots; only this revised brief should be active for this campaign.

## Implementation prompt for Codex

```text
Implement the dedicated Aseptaclean Hoarding PPC page specified in
docs/page-briefs/PPC-HOARDING-SAN-JOSE.md.

First inspect the current repository, active documentation, actual shared
components and CSS cascade. Read AC-CP70-91130-1.1 and inspect its supplied
ClearPath/911 screenshot evidence. Reuse the existing visual system and real
form integration. Apply only this brief's scoped PPC exceptions. Preserve
existing SEO pages and normal public-site navigation.

Build the supplied campaign route, copy and all mapped sections. Use the
photographic 55/45 desktop hero, a 520–560px dark form panel and a flat navy
overlay. Below 1200px place the copy/call first and form immediately after it.
Keep Call Aseptaclean primary; Start With Photos links to the single form.
Do not use a generic SaaS or text-only landing-page template.

Use only approved/licensed images and the actual founder photo. Keep current
fact-based credential display checks. Resolve the approved consent and real
upload integration; do not ship placeholders or fake success behavior.

Implement the copy, component layout, scoped styles and responsive behavior,
then run the project's required checks. Measure the entire hero at 1440×900,
1536×864, 1366×768 and 1280×800. Capture scroll-zero viewport screenshots and
record header, hero/form bottoms, obstruction, 16px clearance and overflow.
Check 390×844, 768×1024 and 1024×768 for headline/call visibility and immediate
form order. Test keyboard/focus, supported upload, no-photo submission,
validation, success/failure, FAQ, call links and sticky-bar behavior through
authorized test paths. Do not send unapproved live test notifications.

Fix concrete mismatches within the documented readable limits. If required
content still cannot fit, report the exact failure; do not clip, hide content
or declare a scrollable desktop hero above the fold. Missing browser access,
selectors, font verification or delivery evidence means UNVERIFIED, not PASS.

Return changed files, remaining launch dependencies and a concise evidence
table. Do not claim visual alignment from a successful build alone. Prepare
the completed local implementation for review; this brief does not request
publishing or launching ads.
```
