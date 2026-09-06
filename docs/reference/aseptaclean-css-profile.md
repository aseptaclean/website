# Aseptaclean CSS and visual reference profile

**Profile:** AC-CP70-91130-1.1  
**Date:** 2026-09-05  
**Purpose:** A reusable, evidence-linked baseline for the 70% ClearPath / 30% 911 Bio Clean website direction.  
**Source:** The supplied 34-page `Untitled document (6)(1).pdf` and the current consolidated Aseptaclean documentation.  
**Status:** Reference profile created; the current live website has not been audited as part of this deliverable.

## Authority and scope

Use this document for visual composition and CSS measurement. `aseptaclean-all-website-copy.md` remains the main copy source, with the crime/trauma supplement where mapped. The current master, copy map and page briefs control approved placement, facts, routes and form requirements. This profile does not authorize new claims, changed services, rewritten policies or deployment.

Replace conflicting visual instructions with a pointer to this profile; do not retain multiple active numeric specifications. Retired Sevenson/BUILD-EXACT instructions must not overrule the current 70/30 direction. Do not replace the entire docs folder to install this reference.

## Approved descriptor update in version 1.1

Use **Biohazard Remediation & Specialty Property Cleanup** in place of the standalone “Specialty Property Cleanup” descriptor. This is an explicit owner-authorized display transformation of the main copy.

| Location | Display wording | Role |
| --- | --- | --- |
| Homepage hero eyebrow | Biohazard Remediation & Specialty Property Cleanup | Supporting category label above the existing main H1 |
| Services hub H1 | Biohazard Remediation & Specialty Property Cleanup | Main hub heading; primary navigation still says Services |
| Shared brand descriptor, where that exact old descriptor is used | Biohazard Remediation & Specialty Property Cleanup | Update the descriptor; preserve individual service names and unrelated sentences |

Keep the homepage's existing primary headline. Do not turn this category label into an additional H1 or replace the five service-page titles. In body prose, normal sentence case and “and” may be used where grammar requires it; the display label above is the exact audit target.

The longer descriptor must wrap naturally and pass §7 with the real text. Homepage eyebrow recipe: 14–16px, weight 650, line-height 1.35, normal letter spacing, sentence/title case; no forced uppercase, nowrap, ellipsis or tiny text. Services hub retains normal heading hierarchy and may wrap to multiple lines. Retest hero height after this wording change.

`descriptor-update.patch` updates the consolidated copy map and Home/Services briefs so the current rendering instructions agree. It preserves the original main-copy document and records this change in its existing display-transformation system. Apply against the matching files, or merge those exact three scoped changes if the repository has diverged. Do not apply a blanket text replacement across source prose, archives or legal policies.

## 1. What is measured, chosen or unknown

Use these labels in audits:

- **OBSERVED:** visible in a supplied screenshot; this establishes appearance, not implementation.
- **ESTIMATED:** an approximate relationship read from the image, not an exact competitor CSS value.
- **TARGET:** an Aseptaclean implementation value selected for the approved design direction.
- **DERIVED:** responsive or interactive guidance developed for Aseptaclean because the supplied screenshots do not show it.
- **UNVERIFIED:** missing evidence, inaccessible browser/provider, unmapped selector, or untested state.

The evidence folder contains 16 original embedded 2048×1280 images extracted from the PDF, with page references and hashes in `source-manifest.json`. Browser zoom, device pixel ratio, original CSS viewport, actual stylesheets, exact competitor fonts, hover behavior and mobile breakpoints are not established. Do not manufacture exact CSS measurements by assuming a scale factor. Browser chrome, the dock and capture boundaries are not website design features.

911 visibly uses rounded image corners and pronounced shadows on some green buttons. ClearPath uses rounded form/card corners, bright blue accents and angled boundaries. Aseptaclean's navy identity, restrained corners and reduced shadows are adaptations. Calling both references square, shadow-free and navy would be incorrect.

## 2. Translate 70/30 into component decisions

The percentage expresses design emphasis; it is not a pixel-similarity score.

| Component | Reference emphasis | Aseptaclean execution |
| --- | --- | --- |
| Home and five service heroes | ClearPath | Full-width photo background, dark overlay, copy left, form right on desktop |
| Main section rhythm | ClearPath | Substantial photography, alternating light sections, occasional dark photo/text band |
| White explanatory sections | Both | Comfortable reading space beside a large, relevant photograph |
| Homepage service cards | 911 | Photo, title, short source excerpt, service link; five cards in 3+2 desktop layout |
| Services hub | Adapted image/text family | Five substantial service rows, distinct from homepage cards |
| Process | ClearPath | Compact horizontal steps; retain five main-source steps and four trauma steps |
| FAQ | ClearPath | Wide, clearly separated questions; restrained expand/collapse treatment |
| Footer | 911 | Dark footer; four Aseptaclean content groups rather than source's three visible groups |
| Colors, type and calls | Aseptaclean | Navy palette, Inter, primary Call Aseptaclean, forms retained |

## 3. Source evidence index

Page numbers refer to PDF pages, starting at 1. Top/bottom identifies the original image on that page. Use the full image; do not stretch it to match a different viewport.

| ID | Evidence | Relevant observation |
| --- | --- | --- |
| CP-HOME-A | [ClearPath p23 top](css-profile-evidence/clearpath-p23-top.png) | Header and photographic homepage hero |
| CP-HOME-B | [ClearPath p23 bottom](css-profile-evidence/clearpath-p23-bottom.png) | Headline/form relationship; broad right panel and two-column fields |
| CP-CARDS | [ClearPath p24 bottom](css-profile-evidence/clearpath-p24-bottom.png) | Rounded padded cards; middle blue treatment is visible, cause/state unknown |
| CP-DARK | [ClearPath p25 top](css-profile-evidence/clearpath-p25-top.png) | Dark copy left, large photo right, angled boundary |
| CP-PROCESS | [ClearPath p25 bottom](css-profile-evidence/clearpath-p25-bottom.png) | Compact horizontal process |
| CP-HUMAN | [ClearPath p26 bottom](css-profile-evidence/clearpath-p26-bottom.png) | Large human/vehicle photo beside text |
| CP-SERVICE | [ClearPath p28 top](css-profile-evidence/clearpath-p28-top.png) | Service photo hero with copy and form; lower boundary outside capture |
| CP-SPLIT | [ClearPath p28 bottom](css-profile-evidence/clearpath-p28-bottom.png) | Contained rounded photo beside text; full-bleed is not universal |
| CP-DETAIL | [ClearPath p29 top](css-profile-evidence/clearpath-p29-top.png) | Supporting content and image relationship |
| CP-PROCESS-2 | [ClearPath p30 top](css-profile-evidence/clearpath-p30-top.png) | Four-step source composition; does not override Aseptaclean step count |
| CP-FAQ | [ClearPath p33 top](css-profile-evidence/clearpath-p33-top.png) | Bordered FAQ rows and expanded light surface |
| BC-HOME | [911 p1 top](css-profile-evidence/911-p01-top.png) | Secondary source's branding and opening composition |
| BC-SPLIT | [911 p2 top](css-profile-evidence/911-p02-top.png) | Tall image strips beside explanatory text; generous white space |
| BC-CARDS | [911 p3 bottom](css-profile-evidence/911-p03-bottom.png) | Three simple photo/text cards; green buttons with visible shadows |
| BC-AREA | [911 p4 bottom](css-profile-evidence/911-p04-bottom.png) | Supporting coverage/content composition |
| BC-FOOTER | [911 p8 bottom](css-profile-evidence/911-p08-bottom.png) | Dark footer with three visible groups and lower gray strip |

Estimated relationships: the ClearPath hero form occupies roughly 40–45% of the screenshot width; its photo/text bands allocate approximately half the composition to the image. Both card examples appear to use photographs around 3:2. These are estimates, not recovered CSS declarations.

**The existing Aseptaclean card target is 4:3.** This profile retains it and labels the difference. A future revision may choose 3:2 for closer source proportions, but an audit must not silently introduce that change or fail the existing 4:3 choice as an implementation mistake.

## 4. Page applicability

| Page | Hero | Form | Photography |
| --- | --- | --- | --- |
| Homepage | Full photo background | Desktop right; mobile after copy/call | Strong throughout mapped sections |
| Hoarding Cleanup | Full photo background | Same hero form family | Relevant service imagery |
| Extreme Cleaning | Full photo background | Same hero form family | Relevant service imagery |
| Detailed Deep Cleaning | Full photo background | Same hero form family | Relevant service imagery |
| Crime Scene & Trauma Cleanup | Full photo background | Same hero form family | Relevant, respectful imagery |
| Rodent Droppings & Animal Waste Cleanup | Full photo background | Same hero form family | Relevant service imagery |
| Services hub | Shorter photo introduction | No mandatory hero form | Five image/text rows |
| About | Shorter photo introduction | No mandatory hero form | Genuine founder/relevant images |
| Contact | Compact text title | Details/call beside form; stacked mobile | Decorative hero image not required |
| Privacy Policy | Legal text shell | No sales form in policy body | No marketing image required |
| Terms and Conditions | Legal text shell | No sales form in policy body | No marketing image required |
| Cookie Policy | Legal text shell | No sales form in policy body | No marketing image required |

Legal pages do not fail for lacking a trust strip, photo hero or closing sales block. Contact does not fail for lacking a background photograph. Reused component names may differ: judge the rendered role.

## 5. CSS tokens and geometry

All values in this section are Aseptaclean **TARGETS**, not recovered competitor CSS. Allow approximately 1–2 CSS px for geometry rounding. Report larger deviations and their cause. Color equivalents in RGB are valid.

| Role | Target |
| --- | --- |
| Navy / deep navy | #1C355E / #122840 |
| Slate / steel / paper | #6A9BC3 / #A8B8C8 / #F7F8FA |
| Font | Inter Variable; system fallback while unavailable |
| Hero H1 | clamp(34px, 3.65vw, 52px); line-height 1.1; weight 700 |
| Compact desktop hero H1 | clamp(34px, 3vw, 46px) at width >=1200 and height <=850 |
| Main H2 | clamp(28px, 2.8vw, 40px); line-height about 1.15 |
| Card / process H3 | 20–24px / 18–22px; weight 650–700 guidance |
| Body | 16–18px; line-height 1.5–1.65 |
| Form input | At least 16px text and 44px control height, excluding checkbox/radio/hidden |
| Consent/helper | Reference 14px; line-height about 1.45 |
| Main container | min(1320px, available viewport width minus two gutters) |
| Gutters | 32px >=1200; 24px at 768–1199; 20px <=767 |
| Header main row | Nominal 72px desktop / 64px mobile; measure utility separately |
| Normal section padding | clamp(48px, 6vw, 88px); special roles use their own padding |
| Split gap | 56px desktop; 32px below 1200 |
| Button | Minimum 48px high; padding 12px 22px; radius4px |
| Form panel | Padding 22px; radius8px; gap 12px; field gap 10px vertical/14px horizontal |
| Narrow form | Padding 18px; one field column at <=540px |
| Image corners | Restrained0–8px; target choice rather than source square-corner claim |
| Footer | Padding 56px top/28px bottom; 4 desktop,2 tablet,1 mobile groups |
| FAQ / legal measure | About880px maximum |

Container examples, before scrollbar differences: 1440px viewport → 1320px shell with 60px outer margin; 1280→ 1216px shell/32px margin; 390→ 350px shell/20px margin. Investigate header rows outside68–84px desktop or60–72px mobile; these are review bands, not permission to hide utility content.

Verify actual font loading: a computed `font-family: Inter` declaration alone does not prove Inter rendered. Do not shrink approved text or force competitor line breaks just to match a screenshot. Check text contrast against the actual background image/overlay; white on slate is not automatically readable.

## 6. Component acceptance criteria

### CSS-01 — Header and navigation

White full-width header; constrained inner row. Logo, Services/About/Contact, Call Aseptaclean. Services has a real hub link and accessible dropdown control for five services. Do not put all five service names alongside Services as primary peers. Measure actual initial utility+header stack separately from sticky state.

Fail for an empty mobile ribbon, doubled containers, oversized logo-driven row, hidden desktop call, or crowded peer service links. Main header minimum height is a recipe; real content must remain readable.

### CSS-02 — Photographic hero with form

Home plus all five service pages. Use CP-HOME-A/B and CP-SERVICE. Full-width cover photograph, flat navy overlay, readable white copy, right dark form panel. At >=1200px: `grid-template-columns: minmax(0,1fr) minmax(520px,560px)` and 52px gap. At1440, the1320px shell yields approximately 708px copy track +52px gap +560px form.

Hero padding 36px top/bottom; 20px in short desktop mode. Height follows content. Stack below 1200px with copy → call → form. No fixed-height clipping, bottom-pinned headline under an empty spacer,376px form at 1440, or opaque surface hiding all photography. Only move source material as the copy map permits.

**Required desktop acceptance:** the entire hero, including the headline, Call Aseptaclean action, complete form, submit button, consent/helpers and bottom padding, must fit above the fold at every desktop viewport in §7. A scrollable hero extending below the fold is a FAIL for desktop fit even when nothing is clipped. Do not hide consent or delete approved copy to obtain a pass. The specific rules and repair sequence below govern this requirement.

### CSS-03 — Compact photographic introduction

Services hub and About. Photo/overlay family with shorter copy and call plus subordinate message link. No mandatory full intake panel. Derived padding 56–72px desktop,40–48px mobile; natural height. Do not grade against the home form geometry.

### CSS-04 — Form panel

Use the geometry above. Two field columns where they fit; wide service/details/consent rows. Preserve actual required fields, consent, helper text and anti-spam. Aseptaclean reference uses white fields; ClearPath's gray fields are not mandatory. Full-width Send Message submit button remains a real form submit. Call Aseptaclean remains a telephone link, not a replacement submit.

Map the five public service labels to existing backend values. Visible focus/error/status states are required. CSS inspection cannot prove CRM delivery. Never claim success without exercising an authorized test path.

### CSS-05 — Contained white image/text split

CP-SPLIT, CP-DETAIL and BC-SPLIT support contained images. Equal desktop tracks,56px gap, substantial photograph. Nominal 6:5 image; at 1320px shell, each track is632px and a6:5 photo is about 527px tall. Earlier380–480px image-height guidance is compositional, not a conflicting hard maximum. Mobile image4:3, logical reading order,24–32px gap.

Fail for tiny images inside huge empty columns, stretched photos or blank reserved rectangles. Do not require every image to bleed to the viewport edge.

### CSS-06 — Dark photo/text band

Use CP-DARK's visual weight: roughly equal dark copy/photo tracks. Edge-to-edge or contained variant follows the page brief. Retain visible photography and align copy with the main content rhythm. Aseptaclean uses a rectangular boundary; no invented emergency badge or24/7 promise.

One primary call plus a clearly subordinate message path is valid. Large empty space, absent planned photo or competing equal-weight actions are review issues.

### CSS-07 — Homepage service cards

Five services, primarily BC-CARDS. Photo → semantic H3 → short mapped excerpt → service-page link. Three cards then two centered at >=1200px; two columns541–1199px; one <=540px. Gap28px desktop and 24px mobile reference. Image4:3; body begins about 20px below image.

Fail for giant editorial service doors on home, missing trauma, invented sixth service, full service-page copy in each card, or every service link replaced by a telephone link. Do not infer a mandatory highlighted middle card from a single screenshot.

### CSS-08 — Services hub rows

Five substantial image/text rows with title, approved source text and service link. Alternate image side where sensible; mobile follows consistent logical order. These longer rows are deliberately different from the homepage chooser.

### CSS-09 — Process

CP-PROCESS/CP-PROCESS-2: compact horizontal equal-track grid with 24px gap, modest number/icon, title and source body. Main source has five steps; trauma has four. Two columns541–1199px; one <=540px. Do not delete a step to imitate four source icons or inflate into a giant zigzag timeline.

### CSS-10 — Founder and service area

Use a genuine founder image. If absent, collapse the photo track and record the asset dependency; do not use a stock person as founder proof. Verified coverage and readable geographic content matter; a map is optional where the brief allows text. Missing map alone is not a failure.

### CSS-11 — FAQ

CP-FAQ. About880px maximum width; clear question boundaries, reference20px block padding, visible expand/collapse affordance, normal-flow answers. Restrained rules or outlined rows are compatible. Test keyboard use, focus, expanded state and long answers. A screenshot does not establish functionality.

### CSS-12 — Closing call and footer

Approved closing copy, Call Aseptaclean primary, message link secondary. Dark911-inspired footer with four Aseptaclean groups; two tablet, one mobile. Source's three groups do not require dropping a needed group. Use readable14–16px footer copy. Legal links must work; Cookie Settings must open preferences rather than merely navigate to a policy.

Primary phone: central verified `tel:+14087857588`, display `(408) 785-7588`. Keep forms available. Do not restore Request Assessment as the primary CTA.

### CSS-13 — Contact and legal shells

Contact: compact title, call/details left and form right, stacked mobile. Legal: header, title/breadcrumb, actual provider policy, genuine fallback and footer. Wrapper around 880px maximum. Audit the accessible outer shell and actual provider state; provider typography does not need marketing-H1 parity.

Fail for broken/missing policy, unusable fallback, nested tiny scroll box or cookie controls hidden behind another surface. Do not add photo heroes, trust bands or sales blocks as audit repairs.

## 7. Above-the-fold acceptance — required in version 1.1

The previous “goal” language is superseded. Above-the-fold fit is a release criterion for the supplied desktop matrix, not a subjective recommendation. This is an Aseptaclean requirement; the source screenshots alone do not establish it.

### Desktop: complete hero without scrolling

For home and all five service pages, the entire photo hero must fit: all headline/intro copy placed in the hero, Call Aseptaclean, full form including submit/consent/helpers/anti-spam, and bottom padding. Services hub and About must fit their complete compact photo introductions. Contact and legal pages require their title/intro and principal navigation to appear promptly; their entire form or policy body is not a hero-fit requirement.

Test each of the eight photographic-hero pages at **1440×900, 1536×864, 1366×768 and 1280×800**, in CSS viewport pixels at 100% browser zoom and `scrollY = 0`. Do not substitute physical display resolution. Wait for actual fonts, images and normal form/provider widgets to settle.

Define:

- `V`: actual visible viewport height, normally `window.innerHeight` at desktop 100% zoom.
- `T`: measured hero top at scroll zero, including all real header/utility/breadcrumb space above it.
- `B`: height of any persistent bottom obstruction in the tested browsing state, including safe area once. Use zero only when none exists.
- `S`: 16px minimum clearance below the hero.
- **Available hero budget = V − T − B − S.**

The hero's measured bottom must be **<= V − B − 16px**, and its actual top, headline, call and full form must remain visible below any fixed top obstruction. Use the real wrapper boundary, not just the image or button. No internal hero/form scrolling, clipping, collapsed required field or covered control is allowed. Verify horizontally as well as vertically. A CSS `max-height` declaration alone does not establish any of this.

Examples with a 72px measured initial header and no bottom obstruction:

| Viewport | Available entire-hero budget | Padding per side | Maximum content-track height |
| --- | --- | --- | --- |
| 1440×900 | 812px | 36px | 740px |
| 1536×864 | 776px | 36px | 704px |
| 1366×768 | 680px | 20px | 640px |
| 1280×800 | 712px | 20px | 672px |

These examples are not fixed hero heights. If a real utility row adds 28px, subtract 28px. If a persistent bottom bar occupies 80px, subtract another 80px. Do not pretend the header always totals 72px or subtract a safe area twice.

### Compact desktop CSS and repair order

The reference CSS uses natural content height, with compact mode at width >=1200px and height <=850px. Compact values: hero padding 20px per side; H1 clamp(34px, 3vw, 46px); hero action top margin 16px; hero form padding 18px, main gap 8px, field row gap 8px/column gap 14px, textarea minimum 64px. Inputs retain >=16px text and >=44px height; buttons retain >=48px height; helpers remain readable at 14px. These override the normal form geometry only inside a short-desktop hero.

If a required desktop page fails, repair in this order:

1. Remove unintended margins, duplicate wrappers, empty utility rows, spacers, inflated logos and unnecessary hero `min-height` rules. Keep genuine content.
2. Confirm the specified 520–560px form track, two-column field arrangement, compact media query and typography actually win in the production cascade.
3. Place only the copy already assigned to the hero there; relocate mapped introduction/process/detail material to its prescribed next section. Do not silently rewrite the main source.
4. Recheck real form helper/consent/anti-spam sizing and responsive wrapping. Preserve every required control and its normal behavior.
5. If approved content still cannot fit within these readable limits, report a **FAIL with measured overflow in pixels and the exact content/layout conflict**. Propose a specific copy-placement or form-layout revision; do not call the existing result aligned.

Do not force `height: 100vh`, scale the hero down, clip overflow, add an internally scrolling form, conceal required consent, or use tiny text. Keep overflowing content accessible while the fit defect is repaired. A shorter visible background does not mean the content fits.

### Mobile/tablet: the headline and call lead the first screen

Below 1200px, preserve the readable stacked layout. At 390×844, 768×1024 and 1024×768, require the full headline and primary Call Aseptaclean action to be visible without scrolling in the ordinary browsing state. The form follows the hero copy/call immediately and may extend below the fold. Full-form desktop acceptance is **not** applied to stacked phone/tablet layouts. Compact Services/About introductions should fit their first screen at these sizes as well.

At 320px width, unusually short windows, open software keyboards and increased text/zoom, prioritize reflow, accessible controls and preserved content; record actual fit without clipping or shrinking it to fabricate success. These accessibility stress states are reported separately from the specified 100%-zoom desktop gate.

### Banners, states and evidence

Capture the genuine first-load state and the ordinary consent-handled state separately. Measure and report any banner, chat control or call bar that covers hero content. A modal consent state may legitimately block interaction until handled; label it as modal-obstructed, not a visual pass. Do not disable providers or remove required UI for screenshots. Persistent nonmodal obstructions must be included in the usable budget and repaired if they cover the call/form.

**Below fold:** content extends below the viewport but is scroll-accessible. **Clipped:** a containing boundary cuts content off. **Occluded:** another surface covers it. These are different defects. On the required desktop matrix, below-fold hero content still fails the above-fold requirement. An unmapped selector or unavailable browser is UNVERIFIED, never a pass.

For each page/viewport/state, report measured hero top/bottom, header stack, form bottom including helpers, call bottom, viewport height, bottom obstruction, 16px clearance, and overflow in pixels. Include an uncropped viewport screenshot from scroll zero; a scrolled or cropped screenshot cannot prove above-fold fit. Check ordinary validation/error states separately for accessible content without requiring arbitrarily long error messages to retain initial-load fit.

## 8. Repeatable audit procedure

1. Record profile ID, commit/dirty state, preview URL without secrets, viewport CSS dimensions, scroll position and font/image readiness.
2. Apply the page table before judging missing components. Read the current copy map; distinguish deliberate omissions from lost source content.
3. Map the measurement helper's roles to actual DOM selectors. Its defaults are `data-ac-audit` hooks, not claims about current production classes. Override them using the real classes in `window.AC_CSS_AUDIT_SELECTORS`. Do not change markup during a read-only audit.
4. Run `scripts/audit-css-profile.js` as a browser expression and save the returned JSON. It reads computed styles and geometry; it does not fetch, submit, click, modify DOM or assign a score. Unmatched roles return UNVERIFIED.
5. Compare against `aseptaclean-css-targets.json`, this profile and actual component screenshots. Bounds/overflow data alone do not prove clipping or occlusion.
6. Trace each mismatch to its winning stylesheet declaration, selector and media query using source/DevTools. Computed CSS does not identify which rule won.
7. Compare like-for-like crops without stretching or pixel-diffing different text. Preserve source evidence and build evidence separately.
8. Report visual fidelity, numerical conformity, copy placement, functionality and build errors separately. Include the §7 above-fold matrix for every photographic-hero page. A successful build does not establish visual alignment.

| Check | Page/viewport | Expected | Actual measurement | Status | Winning rule | Specific correction | Screenshot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CSS-02 | Fill from actual audit | Photo hero +520–560px form | Measured rendered evidence | PASS/FAIL/REVIEW/UNVERIFIED/N/A | Real file/selector/query | Smallest coherent repair | Actual capture |

PASS requires applicable criteria, mapped evidence and visual confirmation. N/A needs a page-type reason. REVIEW records a content-dependent tradeoff. Do not treat missing selector data as a pass.

Common mistakes to avoid: reviving retired homepage instructions; banning service hero forms; adding marketing bands to legal pages; restoring all copy-validator misses without applying the map; calling below-fold content clipped; treating unused `.ac-*` reference CSS as proof that `.acx-*` components received it; blaming photos when the layout is wrong.

## 9. Package use and change control

`docs/styles/website-reference.css` provides implementation recipes. Map its values into the existing component system; do not stack it on top of conflicting globals. It does not implement navigation interactions, backend form behavior, policy providers or photography licensing.

When a target changes, update this profile version, target JSON and reference CSS together and point the current master to the revision. Keep screenshot observations separate from changed Aseptaclean targets. Use `CSS-AUDIT-PROMPT.md` for the next audit and attach the actual build/preview so the reviewer can measure it.
