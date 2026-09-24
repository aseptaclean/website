# Aseptaclean website — mandatory implementation specification

Revision: September 18, 2026. Supersedes earlier layout suggestions in this conversation. Status: implementation instructions, not implemented or deployed website code.

## 0. Read this first: scope and decision authority

The task is to implement this document in the existing Aseptaclean Astro/Cloudflare project, not to invent a new design. MUST and MUST NOT are requirements. Layout IDs, section order, dimensions, class contracts, responsive rules, and link destinations below are acceptance criteria.

This document includes CSS to install, explicit page compositions, DOM contracts, navigation behavior, content-preservation rules, and browser checks. The source repository was not available when this specification was written. Therefore existing filenames, canonical service routes, form schemas, asset paths, and component APIs MUST be discovered in the repository. Do not claim that the included CSS has already been integrated or browser-tested.

### 0.1 Instruction precedence

1. Explicit later owner instructions supersede this document.
2. This document controls layout and the expressly requested navigation changes.
3. Latest owner-approved copy and pricing sources control exact wording, claims, and amounts. This document does not approve new commercial claims.
4. Existing repository instructions still apply wherever they do not conflict with the owner's expressly requested changes. Record the new decisions in existing decision docs; do not silently leave contradictory instructions.
5. Screenshots and competitor examples are evidence only. They do not override this specification.

Do not reinterpret the assignment as an opportunity to improve the brand, choose another template, change service positioning, add features, or rewrite all copy.

### 0.2 Authorized changes

- Recompose the homepage into the exact 11-part structure in section 3.
- Apply the exact public-page and campaign compositions in sections 4–6.
- Retire the standalone Services overview page; preserve the Services dropdown.
- Add a separate public Estate Cleanout service page.
- Add Estate Cleanout to the homepage services grid, dropdown, and public footer.
- Standardize hero dimensions and typography.
- Install the CSS contract, adapting component wiring to the existing project.
- Preserve approved copy while moving it into the specified modules.
- Install permanent copy/layout maintenance instructions and perform browser verification.

### 0.3 Prohibited drift

MUST NOT add an extra homepage section, rearrange its sequence, reverse either specified 45/55 split, introduce a hero form, add a Services hub replacement, add campaign landing pages to service navigation, or remove an approved service.

MUST NOT add carousels, counters, animated statistics, scroll reveals, parallax, video backgrounds, diagonal banners, floating badges, giant icons, gradients, decorative blob shapes, popups, chat widgets, testimonials, employer logos, pricing tiers, or new tracking vendors. Existing necessary consent controls stay functional.

MUST NOT replace Inter, substitute brand colors, add a CSS framework, migrate the framework, rewrite the lead backend, introduce a CMS, or install a new component library for this work.

MUST NOT replace useful existing photographs merely for visual novelty. Do not generate job evidence, claims, or before/after results. No production image placeholders.

MUST NOT push or deploy as part of implementation. Finish with a working local preview and a factual handoff.

### 0.4 Permitted implementation discretion

The coding agent may choose imports, component file locations, internal variable names, and how to adapt existing components to the DOM/CSS contract. It may fix an asset path, scope conflicting CSS, select a crop focal point, and implement accessible disclosure behavior. These choices must not change the prescribed result.

The agent may not change layouts simply because another pattern is easier to code. If a requirement cannot be met, finish the independent work, document the exact conflict, and present the smallest concrete resolution. Do not treat routine file wiring or CSS cleanup as a reason to stop.

## 1. Repository preparation and required deliverables

Before editing, inspect the current worktree and applicable AGENTS.md/CLAUDE.md files. Preserve all unrelated uncommitted changes. Locate the actual Astro layouts, navigation data, global styles, form components, lead endpoint, route metadata, and Cloudflare redirect configuration. Historical component names such as AcPageHero, AcServicePage, AcIntro, AcCompactForm, and PpcHeroForm are search hints, not verified APIs.

Save this document at `docs/ASEPTACLEAN-DESIGN-SPEC.md`. If that exact path already exists, update it deliberately without deleting unrelated material. Create the following implementation records:

| Record | Required content |
| --- | --- |
| `docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md` | Actual source file for every route; shared component consumers; old-to-new section mapping; CSS entry/import location; asset assignments; actual canonical URLs |
| `docs/ASEPTACLEAN-COPY-MAP.md` | Source and destination of every moved copy block; exact approved text; new estate draft text clearly marked; removed verbatim duplicates with retained location |
| `docs/ASEPTACLEAN-DESIGN-QA.md` | Route/viewport results; actual hero heights; screenshot paths; interaction/build checks; unresolved failures; confirmation that nothing was deployed |
| Applicable `AGENTS.md` and `CLAUDE.md` | Permanent rule from section 11 and link to this specification; preserve all unrelated instructions |

Do not create competing versions of existing equivalent tracking documents; extend an existing equivalent and record its actual path instead. The main specification and CSS contract must have one maintained authority.

### 1.1 Route inventory

The public service slugs for the existing five services MUST come from current navigation/route source, not from display labels or guesses. In particular, the public label “Extreme Cleaning” does not authorize changing its canonical slug. Earlier briefs may show display-based illustrative URLs. Preserve the actual existing canonical route.

| Surface | Required action |
| --- | --- |
| Home `/` | Recompose; keep canonical identity |
| Five existing public service pages | Preserve actual routes; apply route-specific matrices |
| Estate public `/estate-cleanout-san-jose/` | Create if absent; update if present; no duplicate base page |
| About `/about/`, Contact `/contact/` | Preserve actual canonical equivalents; apply specified layouts |
| Services `/services/` and supported no-slash equivalent | Retire overview and redirect to homepage services section |
| Rodent `/rodent-dropping-cleanup-san-jose/assessment/` | Improve existing campaign independently |
| Estate `/estate-cleanout-san-jose/assessment/` | Improve existing campaign independently |
| Hoarding campaign, confirmation, policy, and other routes | Preserve route purpose/content; check shared-style regressions; do not invent redesigns for unreviewed pages |

## 2. Global visual contract

### 2.1 Exact values

Use these values rather than the approximate ranges from earlier drafts. All units are CSS pixels unless specified.

| Property | Desktop ≥1024 | Tablet 768–1023 | Mobile <768 |
| --- | --- | --- | --- |
| Main content maximum | 1200 | 1200 | Available width |
| Page gutter, each side | 40 | 32 | 20 |
| Header minimum height | 80 | 72 | 72 |
| Photo hero baseline height | 600 | 560 | 440 minimum; content expands |
| Hero top/bottom inset | 64 | 48 | 40 |
| Main section top/bottom padding | 80 | 64 | 48 |
| Compact section padding | 48 | 40 | 32 |
| Closing CTA padding | 40 | 32 | 32 |
| Split gap | 56 | 32 | 28 |
| Card/grid gap | 24 | 24 | 20 |
| H1 | 56 / 1.08 | 44 / 1.12 | 36 / 1.15 |
| H2 | 36 / 1.15 | 32 / 1.18 | 28 / 1.20 |
| H3 | 22 / 1.25 | 22 / 1.25 | 20 / 1.30 |
| Body | 18 / 1.60 | 18 / 1.60 | 16 / 1.60 |
| Small/supporting copy | 14 / 1.50 | 14 / 1.50 | 14 / 1.50 |
| Form input text | 16 | 16 | 16 |
| FAQ content maximum | 800 | 800 | Available width |
| Form content maximum | 680 | 680 | Available width |
| Editorial image ratio | 4:3 | 4:3 | 4:3 |
| Service image ratio | 16:10 | 16:10 | 16:10 |
| Founder portrait ratio | 3:4 | 3:4 | 3:4, max width 280 |
| Card radius / button radius | 8 / 6 | 8 / 6 | 8 / 6 |

Typeface: existing locally served Inter Variable; do not add another font download. Font weights: body 400, secondary emphasis 500, buttons/nav 600, headings 650–700.

Colors: Navy #1C355E; Deep Navy #122840; Slate Blue #6A9BC3; Steel #A8B8C8; Warm White #F7F8FA; white #FFFFFF. Body #263849; muted text #526574; borders #D8E0E7. Slate is an accent, not normal text on white. Dark sections use #FFFFFF headings and #E7EEF4 body copy; never inherit dark body text into a navy panel.

### 2.2 Hero height and text fit

Public Home + six service pages + About + Contact use the same photo-hero class. Both reviewed campaign heroes use the same size tokens; estate campaign alone uses the specified split composition. Count: nine public pages plus two reviewed campaigns.

The hero is measured from below the header to the bottom of its photographic/opening area. Trust signals and header are outside that measurement. No page-specific min-height, padding, heading-size, or viewport-height override is allowed.

CSS uses a shared `min-block-size` with safe content expansion rather than clipping. At normal desktop/tablet rendering, EVERY reviewed hero MUST equal the shared baseline within 1px. Expansion of just one page is a QA failure at those widths. If approved copy exceeds the baseline, increase the shared token in 8px increments to the smallest value that fits every reviewed hero at that breakpoint. Record the reason and measured result. If this requires a desktop height above720px or tablet height above680px, preserve the copy and report a concrete fit conflict rather than silently making every hero enormous. Never automatically resize all heroes at runtime with JavaScript.

On mobile, text enlargement, or zoom that produces narrow layout, allow content-driven height. Do not hide, ellipsize, or squeeze text to maintain an artificial equal height. Long copy is not permission to silently edit wording. Use exact approved copy and report an exceptional fit conflict if the shared height becomes excessively large.

All hero copy starts at the same top inset. Text is left-aligned. Public/photo hero text width is 560px maximum, tablet 520px, mobile full available width. Image focal point defaults to 65% 50%; per-image focal points may change and must be recorded. Flat navy overlay opacity .68; no gradient. Readability must still be checked over the actual chosen image.

### 2.3 Layout ownership

One `.ac-section` owns vertical padding; one `.ac-container` owns page gutters; a grid owns the gap. Do not nest padded sections to double spacing. Prose widths do not shrink whole grids. Grid children use `min-width:0`.

Desktop 45/55 means `minmax(0,45fr) minmax(0,55fr)` AFTER subtracting the gap. It does not mean 45% + 55% + gap. Main text/photo splits stack below 1024px: text first, image second, regardless of desktop image side. Preserve semantic DOM reading order; use desktop placement rules only for left-side images.

## 3. Exact homepage composition

Header and footer are outside `<main>`. The hero and its trust strip count together as homepage part 2. Within `<main>`, direct section order is: hero, why, services, who-we-help, cta-mid, process, service-area, cta-close, contact. No direct-main FAQ, pricing, testimonials, or additional About section.

| Part / stable ID | Background and module | Exact arrangement and action |
| --- | --- | --- |
| 1. Site header | White; `.ac-header` | Logo left. Services disclosure, Who We Help, About, Service Area, Contact. Call button right. Desktop navigation appears at ≥1200px; below that use the mobile menu. Header sticky at top 0. |
| 2. `hero` | `.ac-hero` photo; `.ac-trust` below | Eyebrow → H1 → approved supporting copy → call + assessment actions. Main CTA to `#contact`; phone from current verified config. Exactly three trust items: existing approved registration wording, owner-operated, written plan/price. Never invent badge text. |
| 3. `why` | White; `.ac-split` | Left45: eyebrow, H2, locked Why copy, existing relevant proof, bottom action row. Right55: assigned authentic image. CTA immediately after copy, margin-top24; link `#contact`; secondary About link allowed. No second full-width button row. |
| 4. `services` | Warm white; `.ac-service-grid` | Centered heading/introduction. Six cards in fixed order below. Bottom centered CTA, margin-top32: “Help Me Choose a Service” → `#contact`. Cards link to public pages. |
| 5. `who-we-help` | White; `.ac-split` | Left45: heading and exactly four separated audience rows. Right55: relevant work/consultation/sorting photo. Groups: homeowners/families; executors/trustees/fiduciaries; property managers/landlords; businesses/facilities. No audience card grid. |
| 6. `cta-mid` | Deep navy; `.ac-cta--dark` | 48px padding desktop,32 mobile. Left: heading + one existing short invitation. Right: call + assessment actions. No imagery or badges. |
| 7. `process` | Warm white; `.ac-process` | Left-aligned heading and intro; four open numbered steps,4 desktop/2 tablet/1 mobile. No card backgrounds. Map existing content to contact, plan/price, work, review/documentation. |
| 8. `service-area` | White; `.ac-area-grid` | Left40: heading, approved region copy. Right60: existing accurate map if available. If no verified map, right column contains two named city groups using approved coverage. Never show a placeholder map. |
| 9. `cta-close` | Warm white; `.ac-cta--quiet` | Short closing invitation; one phone alternative and one `#contact` action. 40px desktop padding. Must not repeat the next form heading. |
| 10. `contact` | White; `.ac-form-shell` | 680px maximum centered. Existing form once. Heading left. Short fields two columns above640px; message/service/upload/consent/submit full width. No photo or sidebar. |
| 11. Footer | Deep navy; `.ac-footer` | Four groups: brand/contact, six public services, company, coverage. Bottom policy/copyright/cookie row. 4desktop/2tablet/1mobile columns. |

Six public service order: Hoarding Cleanup; Extreme Cleaning; Detailed Deep Cleaning; Crime Scene & Trauma Cleanup; Rodent Droppings & Animal Waste Cleanup; Estate Cleanout. Preserve current approved display wording where spelling differs; do not alter existing hrefs to match labels. Estate is appended, not inserted in the middle.

Service cards MUST use the same image ratio and markup. One H3, approved summary, one descriptive text link at bottom. Do not make the entire card a link containing other interactive links. Do not pad short cards with invented copy. Different description lengths are checked under section 11.

The current approved homepage headline and Why copy must be retrieved from the project's approved copy source. This spec does not authorize replacing them with wireframe placeholder text. If the latest “Specialized Property Cleanup. A Clear Path Forward.” headline is present as approved copy, retain it; do not infer approval merely from a historical draft.

## 4. Public service pages: fixed section matrices

All public service pages use standard header, shared photo hero, and standard footer. Unless an explicit row below says otherwise, section backgrounds alternate by position: odd numbered body sections white, even warm white. Compact scope notes remain inside their assigned section. Only the final CTA uses navy. No additional large dark exclusions panels.

All matrices below list BODY sections after the hero and before the footer, in order. IDs are unique per document. Section titles below identify content responsibilities; they are not permission to overwrite approved H2 text. Each section uses `.ac-section`, except compact area/related/closing modules use `.ac-section--compact`. Every existing substantive copy block must have a recorded destination.

### 4.1 Rodent public service

| ID | Layout | Required content/action |
| --- | --- | --- |
| `rodent-intro` | Prose, max800 | Existing problem/service introduction; no new hero repetition |
| `rodent-spaces` | `.ac-intro-grid`:35/65 desktop; right `.ac-grid--2` | KEEP corrected intro-left and four space panels right; stack intro above panels below1024 |
| `rodent-belongings` | `.ac-split` text-left/photo-right | Existing clean/keep/remove material decisions; retain useful photo |
| `rodent-method` | `.ac-grid--2` | Four existing method groups; keep distinct from sales process |
| `rodent-assessment` | `.ac-split` text-left/photo-right | KEEP current balanced assessment section and approved wording |
| `rodent-pricing` | `.ac-pricing` two cards, full-width fee strip below | Existing approved prices/conditions; don't duplicate fee detail in process |
| `rodent-boundaries` | `.ac-grid--2`, no image | Pest-control coordination left; cleanup scope boundaries right. Normal compact section, no oversized navy panel |
| `rodent-owner` | `.ac-owner`30/70 | Authentic portrait, approved short founder proof |
| `rodent-faq` | `.ac-faq-shell`800 | Existing FAQ; heading and questions share left edge |
| `rodent-area` | Compact prose | Actual approved coverage |
| `rodent-related` | `.ac-related` | Compact title/text links to relevant public services; no photos |
| `rodent-cta` | `.ac-cta--dark` | Call + `#contact` |
| `contact` | Centered existing form | Preserve rodent service value, assessment terms and success flow |

### 4.2 Hoarding public service

| ID | Layout | Required content/action |
| --- | --- | --- |
| `hoarding-intro` | Prose800 | Approved recognition/introduction; acknowledge representatives as well as occupants |
| `hoarding-scope` | `.ac-grid--2` | Four groups: approved sorting, removal, cleaning, records; map actual copy |
| `hoarding-belongings` | `.ac-split` | Left text and visible decision rows; right relevant sorting image |
| `hoarding-process` | Four-step `.ac-process` | Consolidate five-step layout by relocating assessment detail into pricing; retain all unique commitments |
| `hoarding-conditions` | Compact prose800 | Existing beyond-clutter/contamination scope and relevant public links |
| `hoarding-owner` | `.ac-owner` | Compact authentic founder proof |
| `hoarding-pricing` | `.ac-grid--3` | One card per approved condition/starting-price level. Preserve actual count; if >3, additional row. Conditions below full width. No invented levels |
| `hoarding-faq` | FAQ800 | Existing relevant questions |
| `hoarding-area` | Compact prose | Actual approved coverage |
| `hoarding-related` | Compact links | Relevant public services only |
| `hoarding-cta` | Navy CTA | Call + `#contact` |
| `contact` | Centered form | Existing hoarding terms and fields |

### 4.3 Extreme Cleaning public service

| ID | Layout | Required content/action |
| --- | --- | --- |
| `extreme-intro` | Prose800 | Merge repeated introductory framing without deleting unique facts |
| `extreme-conditions` | `.ac-grid--2` | Four current approved condition groups, text only |
| `extreme-scope` | `.ac-split` | Text left; relevant property image right; unique material/underlying-condition notes inside text |
| `extreme-process` | Four-step process | Existing contact/plan/work/review content |
| `extreme-pricing` | `.ac-grid--2` | Quote factors left, assessment/scope-change explanation right; no invented prices |
| `extreme-owner` | Owner30/70 | Short authentic proof |
| `extreme-faq` | FAQ800 | Existing questions |
| `extreme-area` | Compact prose | Coverage |
| `extreme-related` | Compact links | Relevant public services |
| `extreme-cta` | Navy CTA | Call + `#contact` |
| `contact` | Centered form | Existing service attribution |

### 4.4 Detailed Deep Cleaning public service

| ID | Layout | Required content/action |
| --- | --- | --- |
| `deep-intro` | Prose800 | Current service introduction |
| `deep-rooms` | `.ac-room-grid` three columns desktop, one below1024 | Kitchens; Bathrooms; Living areas and bedrooms. Heading ABOVE grid. Each column contains its complete checklist. No paired image, accordion, clipping, or fixed checklist height |
| `deep-materials` | `.ac-split` | Material-care copy left, existing window/detail photo right. Photo4:3; do not stretch it to checklist length |
| `deep-move` | Prose800 + visible list | Existing move-in/move-out scope |
| `deep-process` | Four-step process | Existing priorities/assessment/work/review substance |
| `deep-pricing` | Two text columns | Existing price/assessment detail and additional-time factors |
| `deep-faq` | FAQ800 | Existing questions |
| `deep-area` | Compact prose | Coverage |
| `deep-related` | Compact links | Relevant public services |
| `deep-cta` | Navy CTA | Call + `#contact` |
| `contact` | Centered form | Existing field semantics and route identity |

### 4.5 Crime Scene & Trauma public service

| ID | Layout | Required content/action |
| --- | --- | --- |
| `trauma-situations` | `.ac-grid--2` | Six existing approved situations: two columns/three rows desktop and tablet; one mobile. Do not invent situations to reach six if approved source differs; record source mismatch |
| `trauma-release` | `.ac-split` | Scene-release prerequisite and professional cleanup explanation left; non-graphic image right |
| `trauma-scope` | `.ac-grid--2` | Existing scope grouped under meaningful headings |
| `trauma-process` | Four-step process | Retain existing four-step structure |
| `trauma-belongings` | `.ac-split` | Discretion and belongings in two text groups left; appropriate image right |
| `trauma-records` | Two text columns | Regulated waste arrangements and documentation; no invented document mockup |
| `trauma-proof` | Compact prose800 | Approved registration and founder/process evidence, once |
| `trauma-pricing` | Two text columns | Actual quote factors and assessment explanation; no invented package |
| `trauma-faq` | FAQ800 | Existing sensitive, relevant questions |
| `trauma-area` | Compact prose | Coverage |
| `trauma-related` | Compact links | Relevant public services |
| `trauma-cta` | Navy CTA | Call first, then `#contact` |
| `contact` | Centered form | No compulsory graphic uploads; preserve current genuine flow |

### 4.6 New Estate Cleanout public service

This page is separate from its ad landing page. Preserve `/estate-cleanout-san-jose/assessment/` and its confirmation route. The public base page uses normal website navigation and its own estate-attributed bottom form.

| ID | Layout | Required content/action |
| --- | --- | --- |
| `estate-audience` | `.ac-split` | Text left: families, executors/trustees and authorized representatives; right meaningful property image |
| `estate-scope` | `.ac-grid--2` | Four responsibilities: approved sorting; contents clearing; coordinated donation/disposal; agreed cleaning. Full descriptions fit naturally |
| `estate-records` | `.ac-split` | Left45: belongings decisions and approved records; right55: authentic or truthfully illustrative sorting image. Visible keep/donate/discard/review rows |
| `estate-pricing` | Two text columns | Quote factors left; approved assessment offer right; no borrowed rodent/hoarding price |
| `estate-process` | Four-step process | Discuss property; agree instructions/scope; perform approved work; review property and records |
| `estate-owner` | Owner30/70 | Approved short founder proof |
| `estate-area` | Compact prose | Actual coverage |
| `estate-faq` | FAQ800 | Sorting first, remote coordination, valuables/documents, donation limits, contamination, disposal, timing. Draft from approved capability facts only |
| `estate-related` | Compact links | Hoarding and other relevant public pages; no assessment routes |
| `estate-cta` | Navy CTA | Call + `#contact` |
| `contact` | Centered form | Estate value added through existing schema where needed; preserve validation and lead delivery |

Inventory, photo records, donation receipts, and shredding must distinguish actual included deliverables from optional quoted work. Do not promise every item is catalogued by default. No estate legal administration, appraisal, sale-readiness guarantee, licensed contracting, or waste-hauling claim. New copy is a clearly identified draft based on current approved material; do not change existing locked copy to harmonize with it.

## 5. About and Contact

### 5.1 About body after shared hero

Order: `about-founder` → `about-principles` → `about-evidence` → `about-scope` → `about-cta` → standard footer.

- `about-founder`: white, standard80 padding, `.ac-owner`30/70, portrait left on desktop, approved FULL founder bio right. Text first on stacked layouts. Preserve the authentic portrait; no full-height stretched headshot.
- `about-principles`: warm white, `.ac-grid--3`, three text-only principles drawn from approved copy: follow steps, handle materials carefully, document work. No credential badges or giant icons.
- `about-evidence`: white, prose800 with three separated rows connecting the approved principles to client work. Relocate existing evidence here; no invented case study or additional claims.
- `about-scope`: warm white, compact padding, prose800. Preserve approved boundaries without the current giant navy panel.
- `about-cta`: navy, compact, call and `/contact/#contact` links. Do not add another embedded form to About.
- Hero uses the existing usable image; replace the generic empty-room image only with a relevant approved asset. No employer logos. Actual educational/employment background is text, not implied endorsement.

### 5.2 Contact body after shared hero

Order: `contact-methods` → `contact` → `contact-coverage` → standard footer.

- Header/hero use same public dimensions. Hero copy concise; action to `#contact`.
- `contact-methods`: white, compact, max800, three equal text groups for existing supported Call/Text/Email methods. Stack below768. Use actual contact data; do not invent SMS capability or email address.
- `contact`: warm white, centered680 form. Keep all existing form semantics. No left rail, photograph, second form, or competing CTA panel.
- `contact-coverage`: white, compact prose800, existing coverage and availability only. No new response-time promise.

## 6. Campaign landing pages remain separate

Campaign pages MUST NOT appear in the Services dropdown, homepage service cards, or footer service directory. Their focused headers contain logo and phone action only; no public-site dropdown. Do not change ad destinations, campaign indexing, offer terms, or thank-you routes as a side effect of this design work.

### 6.1 Rodent campaign

Route: existing `/rodent-dropping-cleanup-san-jose/assessment/`.

Header → shared photo hero → compact trust strip → `lp-rodent-scope` → `lp-rodent-pricing` → `lp-rodent-plan` → `lp-rodent-process` → `lp-rodent-owner` → `lp-rodent-faq` → `contact` → compact campaign footer.

| Module | Exact treatment |
| --- | --- |
| Hero | Keep current full photograph, left copy, call plus `#contact` actions. Same height/type tokens as public heroes |
| Trust | Three compact items using approved business facts; below measured hero, no additional hero line duplicating all three |
| Scope | White `.ac-split`: text left45, image right55. Combine current “rodents may be gone” and “small areas/larger mess” material. Preserve location lists and boundary facts. Remove the extra large navy scope block |
| Pricing | Warm white, two cards. Preserve current approved amounts; screenshots show $500 small area and $1,500 larger jobs, not independently validated pricing. Full-width assessment strip below; screenshots show $145 creditable visit. Use current approved source if newer |
| Plan | White, four text benefit blocks in2×2 grid. Preserve plan, belongings decisions, material care and written-price content |
| Process | Warm white, four open steps. Move fee explanation into pricing module; keep unique process facts |
| Owner | White,30/70 portrait/text; approved short bio; no repeated full resume |
| FAQ | Warm white, centered800, left-aligned heading and rows |
| Contact | White, centered680; free phone/photo review vs paid on-site visit distinction retained. Existing uploads/terms/service attribution preserved |
| Footer | Navy compact contact, actual coverage, policy/cookie links; no service-directory expansion |

All assessment CTAs target this campaign's bottom form. Fix the observed dark text on navy in any remaining dark elements. Do not hide the “not configured” preview state without actually resolving the environment/integration issue.

### 6.2 Estate campaign

Route: existing `/estate-cleanout-san-jose/assessment/`.

Header → split hero → trust strip → `lp-estate-scope` → `lp-estate-records` → `lp-estate-offer` → `lp-estate-process` → `lp-estate-owner` → `lp-estate-faq` → `contact` → compact campaign footer.

| Module | Exact treatment |
| --- | --- |
| Hero | `.ac-hero--split`, warm white; text45 left/image55 right; shared height tokens. Remove existing form from opening. Call + `#contact`. No background overlay in split variant |
| Trust | Three approved registration/insurance/owner-led items already supported by existing copy. Below hero, equal columns, stacked mobile |
| Scope | White. Heading/introduction above full-width2×2 responsibility grid. Transfer entire current long list out of its oversized image split. Do not delete unique service/donation/disposal/records detail. No image beside this long list |
| Records | Warm white,45/55 split: text LEFT, image RIGHT. Preserve keep/remove/review categories from campaign copy and agreed records; do not silently force the public-page category labels into campaign copy |
| Offer | White, two text columns: written plan/schedule left; change approval and actual walkthrough offer right. Consolidate the dense navy commitments block here; no invented starting amount |
| Process | Warm white, exactly three current steps, three columns desktop/tablet and one below768; do not force four merely because the public page has four |
| Owner | White,30/70 portrait/text; preserve “you'll know who to call” message |
| FAQ | Warm white, centered800, all existing questions retained |
| Contact | White, centered680; move existing form instance here with fields, optional details/photos, consent, attribution, success route intact |
| Footer | Compact navy, contact/coverage/policies only |

Preserve the estate free-walkthrough offer unless a newer owner-approved estate source changes it. Do not replace it with the rodent fee. If approved estate starting prices are available, place the exact approved values in the offer section; otherwise finish with the current offer and report that no approved numeric starting price was available. Keep illustrative-image labels where applicable.

### 6.3 Unreviewed campaigns

The supplied landing ZIP contains rodent and estate desktop screenshots, not a separate hoarding landing-page audit. Preserve the separate hoarding campaign's route-specific composition and content; inspect shared CSS regressions. Do not apply either reviewed campaign's full structure to it by inference.

## 7. Component and DOM contracts

Reuse suitable existing components rather than creating parallel implementations. The conceptual modules below MUST exist as shared implementations; filenames may match existing names. Record their actual mapping.

| Module | Required inputs / DOM hooks |
| --- | --- |
| Header | `public` or `campaign`; actual navigation/contact data; `.ac-header`, `.ac-header__inner`, `.ac-nav`, `.ac-mobile-menu` |
| Hero | Page heading, eyebrow, approved body, image source/alt, focal point, two actions; `photo` or approved estate-campaign `split`; `.ac-hero`, `.ac-hero__inner`, `.ac-hero__copy`, `.ac-hero__photo` |
| Trust strip | Exactly three approved entries; `.ac-trust` and `.ac-trust__item`; placed outside `.ac-hero` |
| Split | Text and media; `.ac-split` with `.ac-split__text` and `.ac-split__media`; default text-left45/media-right55 |
| Service card | Title, exact public href, summary, image/alt; `.ac-service-card`, image wrapper, body and bottom link |
| Process | Ordered steps; `.ac-process`, `.ac-process--three` only for estate campaign; semantic ordered list |
| FAQ | Existing accessible accordion or native details; shared800 shell; every row keyboard-operable |
| Form | Existing actual form component, not a new client-only mock; structural classes attached without changing names/values/handlers |
| Owner | `.ac-owner` with text first in DOM and portrait placed left only on desktop |
| CTA | Heading/body/actions; `.ac-cta--dark` or `.ac-cta--quiet`; no arbitrary third visual style |
| Footer | Public4-group or campaign compact; preserve actual legal/cookie links |

Wrap each redesigned page in `.ac-site` spanning header, main and footer. Do not add `.ac-site` to an untouched policy/confirmation layout unless deliberately testing and accepting its typography changes. Reuse existing font loader. Import the scoped CSS once through the appropriate shared layout.

### 7.1 Hero markup contract

The following is structural HTML. Replace bracketed values with actual approved source data. Do not ship bracketed placeholders. Use Astro's existing image component where appropriate while preserving wrapper/classes and sizing behavior.

```html
<div class="ac-site">
  <!-- actual shared header here -->
  <main>
    <section id="hero" data-section="hero">
      <div class="ac-hero">
        <div class="ac-hero__photo" aria-hidden="true">
          <img src="[actual decorative hero image]" alt="" fetchpriority="high">
        </div>
        <div class="ac-container ac-hero__inner">
          <div class="ac-hero__copy">
            <p class="ac-eyebrow">[approved eyebrow]</p>
            <h1>[approved H1]</h1>
            <div class="ac-hero__body ac-flow">[approved paragraphs]</div>
            <div class="ac-actions">
              <a class="ac-button ac-button--light" href="[verified tel href]">[call label]</a>
              <a class="ac-button ac-button--outline-light" href="#contact">[assessment label]</a>
            </div>
          </div>
        </div>
      </div>
      <!-- trust strip only on Home and the two reviewed campaigns -->
      <div class="ac-container">
        <div class="ac-trust">[three actual trust items]</div>
      </div>
    </section>
  </main>
  <!-- actual shared footer here -->
</div>
```

For the estate campaign split hero, omit the absolute decorative `.ac-hero__photo`, add `.ac-hero--split`, and place `.ac-hero__media` after `.ac-hero__copy` inside `.ac-hero__inner`. Use `.ac-button` and `.ac-button--outline` for its light surface. Text remains first on mobile. On public pages without a trust strip, omit its empty container entirely.

### 7.2 Other markup rules

- Every homepage direct section has both its specified `id` and matching `data-section` value.
- Split: `.ac-container.ac-split` contains text then media. Never use CSS `order` to reverse mobile reading order.
- Service card: `<article>` with image wrapper, then body containing H3, summary and descriptive link. Only image wrappers may clip their images.
- FAQ: section contains `.ac-container`, then `.ac-faq-shell`, heading, then `.ac-faq` disclosure list. Never put a full-container heading outside the narrow shell.
- Form: `.ac-form-shell` contains heading/copy and the existing form. Add `.ac-form-grid` to its actual field-group wrapper; long fields get `.ac-field--full`. Do not invent a replacement form API.
- Include one H1 per page; maintain logical heading order. Hidden headings must not substitute for visible section hierarchy.
- Hero decorative image uses empty alt; meaningful editorial images receive accurate alt. Real work claims require real approved assets. Reserve image dimensions to prevent layout shifts.

## 8. CSS to install

Install this CSS in one dedicated shared stylesheet, recommended `src/styles/aseptaclean-layout.css`, or the existing equivalent. Class spelling below is the contract. If an existing component uses different names, attach these classes or document an exact mapping; do not substitute approximate styling. Remove/scope legacy declarations that override the same layout properties. Do not pile page-specific overrides or `!important` on top.

This is CSS, not pseudo-code. It deliberately does not replace form validation, menu JavaScript, backend behavior, or existing font loading. Classes for native controls must be attached to the existing markup. Required semantic behavior is specified separately in section 9.

```css
.ac-site {
  --ac-navy: #1c355e;
  --ac-deep: #122840;
  --ac-slate: #6a9bc3;
  --ac-steel: #a8b8c8;
  --ac-white: #fff;
  --ac-warm: #f7f8fa;
  --ac-text: #263849;
  --ac-muted: #526574;
  --ac-border: #d8e0e7;
  --ac-on-dark: #e7eef4;
  --ac-max: 1200px;
  --ac-gutter: 40px;
  --ac-section-y: 80px;
  --ac-compact-y: 48px;
  --ac-split-gap: 56px;
  --ac-grid-gap: 24px;
  --ac-header-height: 80px;
  --ac-hero-height: 600px;
  --ac-hero-inset: 64px;
  --ac-radius: 8px;
  color: var(--ac-text);
  background: var(--ac-white);
  font-family: Inter, system-ui, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  isolation: isolate;
}
.ac-site *, .ac-site *::before, .ac-site *::after { box-sizing: border-box; }
.ac-site [hidden] { display: none; }
.ac-site img { display: block; max-inline-size: 100%; }
.ac-site :where(h1,h2,h3,p,ul,ol,figure) { margin: 0; }
.ac-site :where(h1,h2,h3) { color: var(--ac-deep); overflow-wrap: break-word; }
.ac-site h1 { font-size: 56px; line-height: 1.08; font-weight: 700; letter-spacing: -.025em; }
.ac-site h2 { font-size: 36px; line-height: 1.15; font-weight: 650; letter-spacing: -.02em; }
.ac-site h3 { font-size: 22px; line-height: 1.25; font-weight: 650; }
.ac-site a { color: var(--ac-navy); text-underline-offset: .2em; }
.ac-site :where(button,input,select,textarea) { font: inherit; }
.ac-site :where(a,button,input,select,textarea,summary):focus-visible {
  outline: 3px solid var(--ac-navy); outline-offset: 4px;
}
.ac-site .ac-dark :where(a,button,input,select,textarea,summary):focus-visible,
.ac-site .ac-hero:not(.ac-hero--split) :focus-visible {
  outline-color: var(--ac-white);
}
.ac-site .ac-container {
  inline-size: min(var(--ac-max), calc(100% - var(--ac-gutter) * 2));
  margin-inline: auto;
}
.ac-site .ac-section { padding-block: var(--ac-section-y); }
.ac-site .ac-section--compact { padding-block: var(--ac-compact-y); }
.ac-site .ac-white { background: var(--ac-white); }
.ac-site .ac-warm { background: var(--ac-warm); }
.ac-site .ac-dark { background: var(--ac-deep); color: var(--ac-on-dark); }
.ac-site .ac-dark :where(h1,h2,h3,a) { color: var(--ac-white); }
.ac-site :where(section,[id]) { scroll-margin-block-start: calc(var(--ac-header-height) + 24px); }
.ac-site .ac-flow > * + * { margin-block-start: 16px; }
.ac-site .ac-prose { max-inline-size: 65ch; }
.ac-site .ac-prose-shell { max-inline-size: 800px; margin-inline: auto; }
.ac-site .ac-section-heading { max-inline-size: 800px; margin-block-end: 32px; }
.ac-site .ac-section-heading > * + * { margin-block-start: 16px; }
.ac-site .ac-section-heading--center { text-align: center; margin-inline: auto; }
.ac-site .ac-eyebrow { font-size: 13px; line-height: 1.4; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.ac-site .ac-small, .ac-site figcaption { font-size: 14px; line-height: 1.5; color: var(--ac-muted); }
.ac-site figcaption { margin-block-start: 8px; }
.ac-site .ac-dark .ac-small { color: var(--ac-on-dark); }
.ac-site .ac-list { padding-inline-start: 22px; }
.ac-site .ac-list li + li { margin-block-start: 8px; }
.ac-site .ac-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-block-start: 24px; }
.ac-site .ac-actions--center { justify-content: center; margin-block-start: 32px; }
.ac-site .ac-button {
  display: inline-flex; align-items: center; justify-content: center;
  min-block-size: 48px; padding: 12px 20px; border: 1px solid var(--ac-navy);
  border-radius: 6px; background: var(--ac-navy); color: var(--ac-white);
  font-size: 16px; line-height: 1.4; font-weight: 600; text-align: center;
  text-decoration: none; white-space: normal; overflow-wrap: anywhere;
  cursor: pointer; transition: background-color 140ms ease, border-color 140ms ease;
}
.ac-site .ac-button:hover { background: var(--ac-deep); border-color: var(--ac-deep); }
.ac-site .ac-button--outline { background: transparent; color: var(--ac-navy); }
.ac-site .ac-button--outline:hover { background: var(--ac-warm); }
.ac-site .ac-button--light { background: var(--ac-white); color: var(--ac-deep); border-color: var(--ac-white); }
.ac-site .ac-button--light:hover { background: var(--ac-on-dark); border-color: var(--ac-on-dark); }
.ac-site .ac-button--outline-light { background: transparent; color: var(--ac-white); border-color: var(--ac-white); }
.ac-site .ac-button--outline-light:hover { background: rgb(255 255 255 / .12); border-color: var(--ac-white); }
.ac-site .ac-dark .ac-button--light { color: var(--ac-deep); }
.ac-site .ac-button:disabled { opacity: .6; cursor: not-allowed; }
.ac-site .ac-header { position: sticky; inset-block-start: 0; z-index: 50; background: var(--ac-white); border-block-end: 1px solid var(--ac-border); }
.ac-site .ac-header__inner { min-block-size: var(--ac-header-height); display: flex; align-items: center; gap: 24px; }
.ac-site .ac-logo { flex: 0 0 auto; display: inline-flex; align-items: center; min-block-size: 44px; }
.ac-site .ac-logo img { inline-size: 160px; block-size: auto; max-block-size: 48px; object-fit: contain; }
.ac-site .ac-nav { margin-inline-start: auto; display: flex; align-items: center; gap: 24px; font-size: 16px; font-weight: 600; }
.ac-site .ac-nav :where(a,button) { min-block-size: 44px; display: inline-flex; align-items: center; }
.ac-site .ac-nav > a { text-decoration: none; }
.ac-site .ac-menu-trigger { border: 0; background: transparent; color: var(--ac-navy); padding: 10px 0; cursor: pointer; }
.ac-site .ac-dropdown { position: relative; }
.ac-site .ac-dropdown__panel { position: absolute; inset-block-start: 100%; inset-inline-start: 0; inline-size: 300px; padding: 12px; background: var(--ac-white); border: 1px solid var(--ac-border); border-radius: 8px; box-shadow: 0 8px 24px rgb(18 40 64 / .1); }
.ac-site .ac-dropdown__panel a { display: flex; padding: 10px 12px; text-decoration: none; }
.ac-site .ac-dropdown__panel a:hover { background: var(--ac-warm); }
.ac-site .ac-header__call { margin-inline-start: auto; }
.ac-site .ac-nav + .ac-header__call { margin-inline-start: 0; }
.ac-site .ac-mobile-toggle, .ac-site .ac-mobile-menu { display: none; }
.ac-site .ac-hero { position: relative; isolation: isolate; color: var(--ac-white); background: var(--ac-deep); }
.ac-site .ac-hero__photo { position: absolute; inset: 0; z-index: -2; overflow: hidden; }
.ac-site .ac-hero__photo img { inline-size: 100%; block-size: 100%; object-fit: cover; object-position: var(--ac-hero-position, 65% 50%); }
.ac-site .ac-hero:not(.ac-hero--split)::before { content: ""; position: absolute; inset: 0; background: rgb(18 40 64 / .68); z-index: -1; }
.ac-site .ac-hero__inner { min-block-size: var(--ac-hero-height); padding-block: var(--ac-hero-inset); }
.ac-site .ac-hero__copy { max-inline-size: 560px; min-inline-size: 0; }
.ac-site .ac-hero h1 { color: inherit; margin-block-start: 12px; }
.ac-site .ac-hero__body { margin-block-start: 20px; }
.ac-site .ac-hero .ac-eyebrow { color: inherit; }
.ac-site .ac-hero--split { background: var(--ac-warm); color: var(--ac-text); }
.ac-site .ac-hero--split h1 { color: var(--ac-deep); }
.ac-site .ac-hero--split .ac-hero__inner { display: grid; grid-template-columns: minmax(0,45fr) minmax(0,55fr); gap: var(--ac-split-gap); align-items: start; }
.ac-site .ac-hero__media { min-inline-size: 0; }
.ac-site .ac-hero__media img { inline-size: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--ac-radius); }
.ac-site .ac-trust { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border: 1px solid var(--ac-border); background: var(--ac-white); }
.ac-site .ac-trust__item { padding: 24px; color: var(--ac-text); }
.ac-site .ac-trust__item + .ac-trust__item { border-inline-start: 1px solid var(--ac-border); }
.ac-site .ac-trust__item strong { display: block; font-size: 18px; line-height: 1.35; }
.ac-site .ac-trust__item p { margin-block-start: 8px; font-size: 14px; line-height: 1.5; }
.ac-site .ac-split, .ac-site .ac-owner, .ac-site .ac-intro-grid, .ac-site .ac-area-grid { display: grid; gap: var(--ac-split-gap); align-items: start; }
.ac-site .ac-split { grid-template-columns: minmax(0,45fr) minmax(0,55fr); }
.ac-site .ac-owner { grid-template-columns: minmax(0,30fr) minmax(0,70fr); }
.ac-site .ac-owner__media { grid-column: 1; grid-row: 1; }
.ac-site .ac-owner__text { grid-column: 2; grid-row: 1; }
.ac-site .ac-intro-grid { grid-template-columns: minmax(0,35fr) minmax(0,65fr); }
.ac-site .ac-area-grid { grid-template-columns: minmax(0,40fr) minmax(0,60fr); }
.ac-site :where(.ac-split,.ac-owner,.ac-intro-grid,.ac-area-grid) > * { min-inline-size: 0; }
.ac-site .ac-split__media img, .ac-site .ac-area-grid img { inline-size: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--ac-radius); }
.ac-site .ac-area-grid .ac-map { object-fit: contain; }
.ac-site .ac-owner__media img { inline-size: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: 50% 30%; border-radius: var(--ac-radius); }
.ac-site .ac-rows { margin-block-start: 24px; }
.ac-site .ac-row { padding-block: 16px; border-block-end: 1px solid var(--ac-border); }
.ac-site .ac-row:first-child { padding-block-start: 0; }
.ac-site .ac-row p { margin-block-start: 8px; }
.ac-site .ac-grid--2, .ac-site .ac-grid--3, .ac-site .ac-service-grid, .ac-site .ac-room-grid, .ac-site .ac-pricing { display: grid; gap: var(--ac-grid-gap); align-items: start; }
.ac-site .ac-grid--2, .ac-site .ac-pricing { grid-template-columns: repeat(2,minmax(0,1fr)); }
.ac-site .ac-grid--3, .ac-site .ac-room-grid, .ac-site .ac-service-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
.ac-site :where(.ac-grid--2,.ac-grid--3,.ac-service-grid,.ac-room-grid,.ac-pricing) > * { min-inline-size: 0; }
.ac-site .ac-service-grid { align-items: stretch; }
.ac-site .ac-service-card { display: flex; flex-direction: column; border: 1px solid var(--ac-border); border-radius: var(--ac-radius); background: var(--ac-white); }
.ac-site .ac-service-card__image { aspect-ratio: 16 / 10; overflow: hidden; border-radius: 7px 7px 0 0; }
.ac-site .ac-service-card__image img { inline-size: 100%; block-size: 100%; object-fit: cover; }
.ac-site .ac-service-card__body { display: flex; flex-direction: column; flex: 1; padding: 24px; }
.ac-site .ac-service-card__body p { margin-block-start: 12px; }
.ac-site .ac-service-card__link { margin-block-start: auto; padding-block-start: 24px; font-weight: 600; }
.ac-site .ac-panel { padding: 24px; border: 1px solid var(--ac-border); border-radius: var(--ac-radius); background: var(--ac-white); }
.ac-site .ac-pricing { align-items: stretch; }
.ac-site .ac-price { margin-block: 12px; font-size: 36px; line-height: 1.15; font-weight: 700; color: var(--ac-deep); }
.ac-site .ac-assessment-strip { margin-block-start: 24px; padding-block-start: 24px; border-block-start: 1px solid var(--ac-border); }
.ac-site .ac-room-grid .ac-list { margin-block-start: 20px; }
.ac-site .ac-process { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: var(--ac-grid-gap); padding: 0; list-style: none; }
.ac-site .ac-process--three { grid-template-columns: repeat(3,minmax(0,1fr)); }
.ac-site .ac-process__step { min-inline-size: 0; border-block-start: 1px solid var(--ac-steel); padding-block-start: 16px; }
.ac-site .ac-process__number { display: block; font-size: 28px; line-height: 1.2; color: var(--ac-muted); margin-block-end: 12px; }
.ac-site .ac-process h3 { font-size: 20px; line-height: 1.3; }
.ac-site .ac-process p { margin-block-start: 12px; }
.ac-site .ac-cta { padding-block: 48px; }
.ac-site .ac-cta__inner { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 32px; }
.ac-site .ac-cta__inner > * { min-inline-size: 0; }
.ac-site .ac-cta__inner .ac-actions { margin-block-start: 0; max-inline-size: 460px; }
.ac-site .ac-cta__inner p { margin-block-start: 12px; max-inline-size: 60ch; }
.ac-site .ac-cta--dark { background: var(--ac-deep); color: var(--ac-on-dark); }
.ac-site .ac-cta--dark h2 { color: var(--ac-white); }
.ac-site .ac-cta--quiet { background: var(--ac-warm); padding-block: 40px; }
.ac-site .ac-faq-shell { max-inline-size: 800px; margin-inline: auto; }
.ac-site .ac-faq-shell > h2 { margin-block-end: 32px; text-align: start; }
.ac-site .ac-faq { inline-size: 100%; }
.ac-site .ac-faq details { border-block-end: 1px solid var(--ac-border); }
.ac-site .ac-faq summary { min-block-size: 56px; padding-block: 18px; font-weight: 600; color: var(--ac-deep); cursor: pointer; }
.ac-site .ac-faq__answer { padding-block: 0 24px; max-inline-size: 65ch; }
.ac-site .ac-faq__answer > * + * { margin-block-start: 12px; }
.ac-site .ac-related { display: flex; flex-wrap: wrap; gap: 12px 24px; padding: 0; list-style: none; }
.ac-site .ac-related a { display: inline-flex; align-items: center; min-block-size: 44px; }
.ac-site .ac-form-shell { max-inline-size: 680px; margin-inline: auto; }
.ac-site .ac-form-shell > h2 { margin-block-end: 16px; }
.ac-site .ac-form { margin-block-start: 24px; }
.ac-site .ac-form-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px; }
.ac-site .ac-field { min-inline-size: 0; }
.ac-site .ac-field--full { grid-column: 1 / -1; }
.ac-site .ac-field label { display: block; font-size: 16px; font-weight: 600; margin-block-end: 8px; }
.ac-site .ac-input { display: block; inline-size: 100%; min-inline-size: 0; min-block-size: 48px; padding: 12px; border: 1px solid var(--ac-steel); border-radius: 6px; color: var(--ac-text); background: var(--ac-white); font-size: 16px; line-height: 1.5; }
.ac-site textarea.ac-input { min-block-size: 144px; resize: vertical; }
.ac-site input[type="file"].ac-input { padding: 8px; overflow-wrap: anywhere; }
.ac-site .ac-consent, .ac-site .ac-field label.ac-consent { display: grid; grid-template-columns: 20px minmax(0,1fr); gap: 12px; align-items: start; font-size: 14px; line-height: 1.5; }
.ac-site .ac-consent input { inline-size: 20px; block-size: 20px; margin: 3px 0 0; }
.ac-site .ac-field-error { color: #a32121; font-size: 14px; margin-block-start: 8px; }
.ac-site .ac-input[aria-invalid="true"] { border-color: #a32121; }
.ac-site .ac-form__submit { inline-size: 100%; }
.ac-site .ac-footer { background: var(--ac-deep); color: var(--ac-on-dark); padding-block: 48px 24px; font-size: 16px; }
.ac-site .ac-footer :where(a,h2,h3) { color: var(--ac-white); }
.ac-site .ac-footer__grid { display: grid; grid-template-columns: 1.4fr 1.2fr 1fr 1fr; gap: 32px; }
.ac-site .ac-footer__grid > * { min-inline-size: 0; }
.ac-site .ac-footer h3 { font-size: 18px; margin-block-end: 16px; }
.ac-site .ac-footer ul { list-style: none; padding: 0; }
.ac-site .ac-footer li + li { margin-block-start: 10px; }
.ac-site .ac-footer a { overflow-wrap: anywhere; }
.ac-site .ac-footer__legal { margin-block-start: 32px; padding-block-start: 24px; border-block-start: 1px solid #456078; display: flex; flex-wrap: wrap; gap: 12px 24px; font-size: 14px; }
.ac-site .ac-footer--campaign .ac-footer__grid { grid-template-columns: 1fr 1fr; }
@media (max-width: 1199px) {
  .ac-site .ac-nav { display: none; }
  .ac-site .ac-header__call { margin-inline-start: auto; }
  .ac-site .ac-mobile-toggle { display: inline-flex; min-inline-size: 44px; min-block-size: 44px; align-items: center; justify-content: center; border: 1px solid var(--ac-border); border-radius: 6px; background: var(--ac-white); color: var(--ac-navy); }
  .ac-site .ac-mobile-menu:not([hidden]) { display: block; border-block-start: 1px solid var(--ac-border); padding-block: 16px; max-block-size: calc(100dvh - var(--ac-header-height)); overflow-y: auto; }
  .ac-site .ac-mobile-menu a { display: block; padding-block: 12px; min-block-size: 44px; text-decoration: none; }
}
@media (max-width: 1023px) {
  .ac-site { --ac-gutter: 32px; --ac-section-y: 64px; --ac-compact-y: 40px; --ac-split-gap: 32px; --ac-header-height: 72px; --ac-hero-height: 560px; --ac-hero-inset: 48px; }
  .ac-site h1 { font-size: 44px; line-height: 1.12; }
  .ac-site h2 { font-size: 32px; line-height: 1.18; }
  .ac-site .ac-hero__copy { max-inline-size: 520px; }
  .ac-site .ac-split, .ac-site .ac-owner, .ac-site .ac-intro-grid, .ac-site .ac-area-grid { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-owner__media, .ac-site .ac-owner__text { grid-column: auto; grid-row: auto; }
  .ac-site .ac-owner__media { max-inline-size: 280px; }
  .ac-site .ac-service-grid, .ac-site .ac-grid--3 { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .ac-site .ac-room-grid { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-process { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .ac-site .ac-process--three { grid-template-columns: repeat(3,minmax(0,1fr)); }
  .ac-site .ac-cta__inner { grid-template-columns: minmax(0,1fr); align-items: start; }
  .ac-site .ac-cta--quiet { padding-block: 32px; }
  .ac-site .ac-footer__grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (max-width: 767px) {
  .ac-site { --ac-gutter: 20px; --ac-section-y: 48px; --ac-compact-y: 32px; --ac-split-gap: 28px; --ac-grid-gap: 20px; --ac-hero-height: 440px; --ac-hero-inset: 40px; font-size: 16px; }
  .ac-site h1 { font-size: 36px; line-height: 1.15; }
  .ac-site h2 { font-size: 28px; line-height: 1.2; }
  .ac-site h3 { font-size: 20px; line-height: 1.3; }
  .ac-site .ac-header__inner { gap: 10px; }
  .ac-site .ac-logo img { inline-size: 120px; }
  .ac-site .ac-header__call { padding-inline: 12px; }
  .ac-site .ac-hero__copy { max-inline-size: none; }
  .ac-site .ac-hero--split .ac-hero__inner { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-trust { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-trust__item { padding: 20px; }
  .ac-site .ac-trust__item + .ac-trust__item { border-inline-start: 0; border-block-start: 1px solid var(--ac-border); }
  .ac-site .ac-grid--2, .ac-site .ac-grid--3, .ac-site .ac-service-grid, .ac-site .ac-pricing, .ac-site .ac-process, .ac-site .ac-process--three { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-process__step { display: grid; grid-template-columns: 36px minmax(0,1fr); column-gap: 16px; }
  .ac-site .ac-process__number { grid-column: 1; grid-row: 1 / span 2; }
  .ac-site .ac-process__step h3, .ac-site .ac-process__step p { grid-column: 2; }
  .ac-site .ac-cta { padding-block: 32px; }
  .ac-site .ac-footer__grid, .ac-site .ac-footer--campaign .ac-footer__grid { grid-template-columns: minmax(0,1fr); }
}
@media (max-width: 639px) {
  .ac-site .ac-form-grid { grid-template-columns: minmax(0,1fr); }
  .ac-site .ac-actions { align-items: stretch; flex-direction: column; }
  .ac-site .ac-actions .ac-button { inline-size: 100%; }
  .ac-site .ac-header__call .ac-call-long { display: none; }
  .ac-site .ac-header__call .ac-call-short { display: inline; }
}
@media (min-width: 640px) {
  .ac-site .ac-header__call .ac-call-short { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ac-site *, .ac-site *::before, .ac-site *::after { transition-duration: 0s; animation: none; scroll-behavior: auto; }
}
```

### 8.1 CSS integration rules and allowed exceptions

- Attach `.ac-dark` alongside `.ac-cta--dark` and to `.ac-footer` so text and focus styles use their intended dark-surface treatment. Use the correct light/outline-light buttons on navy, normal/outline on white.
- `.ac-grid--2` and `.ac-grid--3` are unboxed layout grids. Do not put `.ac-panel` on every child. Panel chrome is reserved for service cards, pricing cards, and the existing approved rodent spaces panels.
- Existing FAQ markup may use buttons/panels instead of native details. Preserve its accessible behavior and map the equivalent row/trigger/panel styles exactly; document selector mapping. Do not break analytics or IDs by replacing markup without need.
- Existing service names, titles, FAQ counts, and approved pricing-card counts are content facts. Fixed visual counts in this plan must not be achieved by inventing/deleting facts. A mismatch requires a documented content-map decision; do not improvise a new layout silently.
- Do not override the main container width inside a page. Forms and FAQ use narrow shells INSIDE the container, not a separate page gutter system.
- Standard media wraps are 4:3. A real map uses `object-fit:contain`; never crop place names or coverage boundaries. Founder portrait is3:4. All images preserve subject framing at tested sizes.
- Allowed asset fallback order: current section's relevant usable image → another relevant approved project image → preserve current image and list replacement as an asset task. No new stock search or generated imagery during this layout pass. If no usable image exists for a REQUIRED new estate slot, use a relevant existing approved estate image truthfully, not an empty placeholder.
- Values changed after browser measurement must be documented. Only the shared hero-height tokens may increase under the deterministic8px fit rule. A section-specific CSS patch to fake equality is prohibited.
- Body default browser margin must already be reset by the existing site layout. If absent, add the minimal existing-site reset deliberately; do not blanket-reset untouched applications or embedded widgets.
- CSS comments may identify deviations; they do not authorize them. Do not use `!important`, inline height/spacing hacks, negative margins, `height:100vh`, or `overflow:hidden` on content wrappers.
- Per-image focal position is the only routine inline visual custom property allowed, such as `style="--ac-hero-position:70% 45%"`. Semantic state/data attributes are allowed.

## 9. Navigation, routes, and functional wiring

### 9.1 Public header and dropdown

“Services” is a button with `type="button"`, `aria-expanded`, and `aria-controls`. It toggles exactly the six PUBLIC service links. Do not use a dead `/services/` link. Do not make it hover-only. Pressing Escape closes the dropdown and returns focus to its trigger. Clicking outside closes it. Normal Tab order reaches every link. Do not apply application-menu roles to ordinary site links.

Top-level destinations: Who We Help → `/#who-we-help`; About → actual About route; Service Area → `/#service-area`; Contact → actual Contact route; call → verified existing `tel:` value. On the homepage same-page anchors may use just `#...`.

Below1200px, the menu button toggles `.ac-mobile-menu` using its hidden state and `aria-expanded`. Mobile navigation displays the six service links as a clearly labeled group. Selecting a destination closes the menu. Escape returns focus to the toggle. The header remains sticky, not fixed. Expanded mobile menu may scroll within available screen height; the page itself must not become a nested-scroll application. Preserve existing consent stacking and ensure the header does not obscure it.

On narrow mobile, the visible header phone button says “Call”; its accessible name identifies Aseptaclean and the telephone destination. Use `.ac-call-long`/`.ac-call-short` spans to avoid squeezing a full number beside logo/menu. Desktop campaign header can show the verified number. Logo remains a home link. Never duplicate interactive navigation IDs between desktop and mobile trees.

### 9.2 Retire the Services hub

1. Locate `/services/` implementation and all references in source/content/navigation/schema/sitemap.
2. Record any unique useful content and its public-service-page destination.
3. Replace homepage “View All Services” with “Help Me Choose a Service” → `#contact`.
4. Replace directory-style footer links with the actual six public service hrefs.
5. Replace “Services” breadcrumb destination with `/#services` where applicable; keep individual page titles and schema accurate.
6. Remove the standalone overview from route output and sitemap, preserving unrelated `/services/...` routes if the actual repository uses them.
7. Configure a permanent redirect for only the retired overview path and its no-slash equivalent to `/#services` using the project's existing hosting mechanism. Inspect existing redirects first. Do not introduce a `/services/*` wildcard.
8. Verify response status/location, no loops/chains, homepage anchor visibility below sticky header, and actual query-parameter handling. Do not assume server-side redirect tests validate the browser fragment behavior.
9. Keep old URL availability via redirect; do not substitute a blank page or a soft404.

### 9.3 Estate service addition

Create or update the public base route independently of its `/assessment/` child. Add its navigation/card/footer data in the same single source used by the other services. Do not hardcode a second service list into each component.

Use the existing public-service SEO pattern for title, description, canonical, breadcrumb and truthful structured data. Add only the public route to the normal service sitemap according to the site's established policy. Do not change campaign `noindex`/canonical behavior without a separate explicit reason and documented approval basis.

### 9.4 Forms and conversions

Move the EXISTING form instance into its specified location. Preserve `action`, method, actual field names, hidden fields, service enum values, required states, upload limits, consent wording, anti-spam controls, validation, attribution and thank-you destinations. Add the estate service through existing validation schema if absent; update all relevant server/client mappings consistently.

No minimum message character count. Do not introduce mandatory photos. Do not drop existing uploaded files during an error retry. Labels stay visible; placeholder text is not a label. Errors identify the affected field, are programmatically associated, and retain the person's entered information.

Hero and mid-page assessment buttons are anchors, not submit buttons. A form is submitted only through its existing submit action. Do not show success or fire conversion events before genuine backend success. Never hide disabled/unconfigured preview behavior to make screenshots look finished.

Use a supported safe test mode or mocked delivery boundary to test validation and success/error UI. Label those results accurately; mocked delivery is not proof of live email delivery. Do not send test leads or messages to real recipients without authorization. Preserve consent-aware tracking and genuine-success deduplication.

## 10. Exact content-transfer and asset procedure

For every edited route, inventory the current text blocks before changing layout. Record old heading, exact text/source, destination ID, and action (`keep`, `move`, `verbatim-duplicate removed`, or `new estate draft`). No substantive block may disappear because the agent considers it too long.

Only exact duplicate statements may be removed without a copy decision, and their retained destination must be recorded. Similar but nonidentical statements can contain distinct scope or conditions; preserve them as separate paragraphs/list items inside the assigned module. Do not convert factual caveats into invisible footnotes or accordions without the specified destination.

If current copy contains more detail than a compact step can accommodate, move assessment/pricing detail to that route's assigned pricing/offer section and leave the approved step heading/summary intact where available. If a new summary is required, show it as a proposed copy edit; do not silently replace the approved sentence. Complete all unaffected implementation work.

Copy fit targets below are REVIEW TRIGGERS, not truncation limits:

| Content | Preferred amount | Required response if longer |
| --- | --- | --- |
| Hero headline | 6–10 words when new copy is drafted | Preserve approved headline; verify wrap/height; no forced desktop line breaks that break mobile |
| Hero support | 2–3 short paragraphs, approximately80 words total | Use approved wording; apply shared hero fit rule; flag unusually tall outcome |
| Service-card summary | 20–45 words | Preserve approved copy; compare row whitespace; propose shorter summary if necessary rather than secretly editing |
| Process description | 20–35 words | Relocate detailed price/assessment material to designated section; document exact content transfer |
| Audience row | Heading + one short sentence | Retain approved text; allow natural wrapping; no tiny fonts |
| Trust item | Label + one explanatory line/short sentence | Move duplicated explanatory detail to the assigned proof section; flag necessary wording that prevents compact layout |

Asset map MUST record page/section, actual file path, alt text, decorative vs meaningful, real vs illustrative status, and desktop/mobile focal point. Existing correct image labels stay. New estate page may reuse a relevant existing estate image; do not invent work photographs or imply the same image documents different actual jobs.

## 11. Permanent future-copy rule to install

Append the following to the applicable repository instruction files. Preserve unrelated instructions. Add to both AGENTS.md and CLAUDE.md if both tools are used; create a short file containing this rule and a spec link if missing. Also link the rule from existing content-maintenance documentation.

```markdown
## Aseptaclean copy and layout requirements

Read docs/ASEPTACLEAN-DESIGN-SPEC.md before any layout or copy change affecting the website. Its explicit page structures, CSS tokens, responsive rules, and public/campaign separation are mandatory unless the owner explicitly changes them.

A copy update is not complete until the affected rendered layouts have been checked at desktop, tablet, and mobile sizes. Preserve approved wording, required section order, hero sizing, typography, spacing, image proportions, and CTA hierarchy.

Do not clip, line-clamp, ellipsize, shrink page-specific fonts, compress line-height, add filler, or silently rewrite approved copy to force a fit. Do not add/reorder sections or swap grid patterns without an explicit design change. Map substantive text to its intended existing section. Fix routine responsive fit problems within the approved CSS contract.

For hero copy changes, verify the shared desktop/tablet height across all affected public pages and reviewed campaigns; use the documented shared token adjustment rule, never a one-page height override. Mobile and accessibility layouts may grow to keep all text and actions visible.

Inspect every affected shared-component consumer. Check changed sections and neighboring sections at1440,820,390px and check320px overflow and200% zoom. Record actual results and screenshot paths. A passing build is not a visual review. If the browser/runtime is unavailable, report the layout as unverified and do not claim completion of visual QA.

Keep campaign landing pages out of Services dropdowns, homepage public-service cards, and the footer service directory. Preserve route-specific offers, form identities, attribution, consent, and genuine success behavior.

Do not push or deploy unless the owner authorizes it in the current work context. Report changed files/routes, actual checks, and unresolved issues clearly.
```

This instruction cannot guarantee that an AI will never deviate. Enforcement comes from the installed repository instructions, scoped shared components/CSS, and passing the concrete checks below. Do not describe a document-only change as automatic website enforcement.

## 12. Browser acceptance contract

Run the actual site in the repository's supported local preview, including the Cloudflare function environment when testing the real form path. Do not substitute static screenshot mockups. Use the available browser skill or existing browser automation; read its instructions before use. No new dependency is required if the environment already has a suitable browser tool.

### 12.1 Required viewport coverage

- All nine public pages and both reviewed campaigns:1440×1000,820×1180,390×844.
- Shared hero comparison on those eleven pages:1440,1024,820 widths at100% browser zoom after fonts load.
- All changed routes:320px horizontal-overflow/content check. Check sticky header/CTA behavior on a short desktop viewport1440×700.
- Representative longest hero, longest service checklist, longest FAQ, form, and menu:200% browser zoom with content and controls visible.
- Unreviewed routes using changed shared components: inspect at1440 and390. Do not redesign them unless a regression requires a scoped fix.

After font/image loading, scroll the full page to trigger lazy-loaded images, then capture full-page AND section screenshots. Full-page miniatures alone are insufficient to assess text/spacing.

### 12.2 Pass/fail criteria

| Check | PASS condition | FAIL example |
| --- | --- | --- |
| Homepage structure | Exact direct-section sequence defined in section3; header/footer outside main; trust inside hero group but outside photo area | Extra FAQ/reviews block or reversed Why image |
| Service inventory | Exactly six correct public links in dropdown and homepage cards; estate included | Assessment URL in dropdown, missing service, new hub link |
| Public/campaign separation | Public estate and campaign estate both resolve with their own page purpose and form identity | Public page redirects to ad page or both share wrong success route |
| Hero equality | All eleven measured photo/opening areas within1px of shared breakpoint token; same top inset | One page grows taller at normal desktop zoom or trust counted inside measurement |
| Desktop45/55 | Rendered text/media widths reflect45/55 of available grid space after gap; tolerance1px | Percent widths plus gap overflow or a50/50 substitute |
| Card grid | 3columns desktop,2tablet,1mobile; six cards; same16:10 crops; row bottoms aligned | Fifth/sixth cards centered separately, variable crops, clipped summaries |
| Deep checklist | Heading above three desktop columns; complete lists; stacked below1024; no adjacent image | Three lists stacked beside one stretched photo |
| FAQ |800px maximum shell centered; heading/list left edges within1px; open answer fits | Full-width heading over left-only accordion |
| Forms |680px max; one DOM form per contact destination; no hero form; exact field semantics preserved | Duplicate hidden form or custom fake success |
| Contrast | Body text readable on actual surfaces; measure normal text ≥4.5:1, large text ≥3:1 | Inherited dark paragraphs in navy scope panel |
| Copy completeness | Every original substantive block accounted for in copy map | Deleted conditions, fabricated benefits, silently shortened approved headline |
| Image rendering | All visible images load; correct subject/crop; no placeholder assets | Broken footer logo or missing new estate hero |
| Responsive fit | Document scrollWidth ≤ viewport clientWidth +1px; no clipped controls or content | Full phone number forcing mobile header offscreen |
| Navigation | Keyboard/touch accessible; Escape and focus return; anchors clear sticky header | Hover-only services or hidden focused links |
| Related links | Compact text links, actual public routes, no giant image cards | Full services directory repeated near form |
| Scope | No new frameworks/widgets/features and no unapproved deployment | Template rebuild, tracking replacement, new animations |

### 12.3 Visual-balance review triggers

Check service-card link spacing: if the empty space between summary bottom and bottom link exceeds64px on desktop, inspect the row as a whole. Do not fix it with filler or truncation. Preserve approved wording and present a concrete summary-edit proposal if the specified grid cannot look balanced.

Check required splits: if text extends more than160px below its paired image at desktop, inspect the content transfer and paragraph/list spacing. Do not stretch the image or add blank margins. If the content remains too long, record a proposed full-width continuation INSIDE the same section for owner review; do not change the prescribed split silently. Finish the other sections.

These are explicit review triggers, not claims that visual quality can be fully automated. Measured compliance plus human-readable screenshots is required.

### 12.4 Read-only browser measurement helper

Run this function in the browser's page evaluation context after fonts and visible images load. It only reads rendered DOM geometry. Record output per route/viewport. The helper is not a substitute for interaction tests or visual inspection.

```js
() => {
  const root = document.querySelector('.ac-site');
  if (!root) throw new Error('Missing .ac-site root');
  const rect = el => el ? {
    x: el.getBoundingClientRect().x,
    y: el.getBoundingClientRect().y,
    width: el.getBoundingClientRect().width,
    height: el.getBoundingClientRect().height
  } : null;
  const hero = root.querySelector('.ac-hero');
  const copy = root.querySelector('.ac-hero__copy');
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  const counts = ids.reduce((out, id) => {
    out[id] = (out[id] || 0) + 1;
    return out;
  }, Object.create(null));
  return {
    pathname: location.pathname,
    viewport: { width: innerWidth, height: innerHeight },
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    hero: rect(hero),
    heroToken: getComputedStyle(root).getPropertyValue('--ac-hero-height').trim(),
    heroTextTopInset: hero && copy ? copy.getBoundingClientRect().top - hero.getBoundingClientRect().top : null,
    mainSections: [...root.querySelectorAll('main > section')].map(el => el.dataset.section || el.id),
    formCount: root.querySelectorAll('form').length,
    heroFormCount: root.querySelectorAll('.ac-hero form').length,
    publicServiceLinks: [...root.querySelectorAll('.ac-dropdown__panel a')].map(a => a.getAttribute('href')),
    cards: [...root.querySelectorAll('.ac-service-card')].map(el => ({
      box: rect(el),
      image: rect(el.querySelector('.ac-service-card__image')),
      href: el.querySelector('.ac-service-card__link')?.getAttribute('href')
    })),
    faqs: [...root.querySelectorAll('.ac-faq-shell')].map(el => ({
      shell: rect(el), heading: rect(el.querySelector('h2')), list: rect(el.querySelector('.ac-faq'))
    })),
    splits: [...root.querySelectorAll('.ac-split')].map(el => ({
      section: el.closest('section')?.id,
      gap: getComputedStyle(el).columnGap,
      text: rect(el.querySelector('.ac-split__text')),
      media: rect(el.querySelector('.ac-split__media'))
    })),
    duplicateIds: Object.keys(counts).filter(id => counts[id] > 1),
    brokenVisibleImages: [...root.querySelectorAll('img')]
      .filter(img => img.getClientRects().length && img.complete && img.naturalWidth === 0)
      .map(img => img.getAttribute('src'))
  };
}
```

Expected homepage section array: `["hero","why","services","who-we-help","cta-mid","process","service-area","cta-close","contact"]`. Missing `data-section` is acceptable on public service bodies if their specified IDs are used. Duplicate IDs, hero forms, broken visible images, or horizontal overflow above1px are failures requiring repair.

Image requests still loading are not reported as broken by the helper. Wait for them or report loading failures/timeouts accurately. Responsive duplicate navigation may exist in the DOM; inspect visible links and keyboard behavior, not just the desktop dropdown selector.

### 12.5 Required interaction checks

- Open and close Services with pointer and keyboard. Follow each of its six links.
- Open mobile navigation, tab through it, close via Escape, verify focus return.
- Follow hero and mid-page form anchors on every changed route. Confirm the heading/first field is visible below the sticky header.
- Open the longest FAQ answer on each changed FAQ component variant and inspect mobile wrapping.
- Verify correct telephone links and public/campaign form service attribution.
- Test form validation, error retention, and supported success path in safe mode; distinguish mocked and actual integration checks.
- Verify `/services` and `/services/` redirect; preserve unrelated routes and query handling.
- Inspect footer logo, policy links, and cookie preferences.
- Run the existing relevant build/lint/type checks. Do not add implementation-mirroring unit tests for CSS values when direct browser assertions cover the actual risk.

## 13. Implementation sequence and stop conditions

1. Read specification and repository; produce route/component/copy/asset inventory.
2. Install repository rules and one scoped CSS source; adapt existing shared components to the contract.
3. Implement homepage exact structure; check desktop/tablet/mobile before spreading components further.
4. Implement the six public service matrices including new Estate Cleanout; preserve actual routes.
5. Implement About and Contact; remove Services hub, update service navigation and redirect.
6. Implement rodent and estate campaign matrices independently; move estate form; preserve offers and tracking.
7. Run route/viewport acceptance checks; repair observed regressions.
8. Produce final QA record and screenshots. Nothing pushed/deployed.

Do not stop after installing the Markdown or after producing a plan if the task is to implement the website. Do not declare done while required visual checks failed or were never run. If source/browser is unavailable, clearly separate completed documentation/code changes from unverified implementation. If a copy/asset conflict blocks one section, finish all independent work and present that exact unresolved section with a concrete resolution.

## 14. Pasteable implementation instruction

```text
Implement docs/ASEPTACLEAN-DESIGN-SPEC.md exactly in this repository. Read the entire file, including CSS, every page matrix, content rules, and browser acceptance checks, before editing.

This is an implementation task, not a planning task or a new design exploration. Use the supplied CSS and DOM contracts, adapt existing components, preserve approved copy and backend behavior, and follow the exact page orders. Do not substitute your own layout, framework, typography, colors, components, or section count.

Retire the standalone Services hub. Keep six public service links, including a separate Estate Cleanout service page. Keep all campaign landing pages out of public service navigation and preserve their routes/offers/attribution.

Install the permanent copy/layout rule in AGENTS.md and CLAUDE.md. Complete the implementation-map and copy-map records. Run the actual site, inspect every required route/viewport, record measured hero heights and structural checks, fix visual failures, and provide screenshots plus the QA record.

Proceed through all authorized work without pausing for routine file or CSS decisions. If approved content conflicts with a specified layout, preserve the wording, complete independent work, and report the specific conflict with a concrete proposed resolution. Do not silently redesign or claim unperformed verification. Do not push or deploy.
```

## 15. Evidence appendix — observations, not alternate design instructions

The following observations explain why the required changes were selected. They do not authorize deviations from sections0–14. The earlier approximate layout suggestions have been replaced by the exact values and matrices above.


## Evidence and limitations

Reviewed all 63 supplied screenshots: 21 in aftermath.zip, 11 in Enviro.zip (Alliance Environmental Group), and 31 in servpro.zip. These are desktop screenshots, not working website source. They show homepage, service, About, contact, and repeated shared patterns; they do not demonstrate mobile behavior, accessibility, speed, or conversion performance.

Reviewed all 87 current Aseptaclean screenshots covering Home, Hoarding, Extreme Cleaning, Detailed Deep Cleaning, Crime Scene & Trauma, Rodent Cleanup, About and Contact. No mobile screenshots or source code were included. Also inspected the live Aseptaclean homepage and rodent service page visually; also inspected desktop captures of Services, About, and Crime Scene & Trauma. Read live section inventories for Contact, Hoarding, Extreme Cleaning, and Detailed Deep Cleaning. The subsequently supplied ZIP provides desktop visual evidence for those pages; responsive behavior and functionality still need testing in the active project.

Read project documents:
- Aseptaclean_Service_Hero_And_Spaces_Update.md (September 17).
- Aseptaclean_Rodent_Pages_Layout_Brief.md (September 17).
- aseptaclean-layout-refresh.md (September 9; estate landing-page brief).

The project folder contains screenshots and design/copy briefs; no website source checkout was present in this session's workspace. Earlier documentation identifies aseptaclean/website and shared Astro components, but their current code was not independently inspected in this review. Local unpublished changes may be ahead of production.

Full-page captures initially showed unloaded images below the viewport. Scrolling demonstrated that service imagery loads; do not report all blank regions in these captures as broken images. The live-site inspection showed older hero forms, but the owner’s current screenshots show the homepage and all five main service pages already using photo heroes without forms and centered bottom forms. Preserve that completed work. The current rodent spaces grid is also already corrected; do not present its implementation as outstanding.

## Priority findings from the CURRENT aseptaclean.zip

These findings supersede any earlier live-site diagnosis of missing hero/form work. Screenshot times refer to September 17, 2026.

| Priority | Screenshot / section | Observed issue | Specific action |
| --- | --- | --- | --- |
| Keep | 10:28:25; 10:29:40; 10:30:08; 10:30:36; 10:31:11; 10:31:37 — heroes | The requested photo/no-form treatment is already implemented | Keep full-width imagery and left text; improve copy length/crop selectively |
| High | 10:30:43–10:30:47 — Detailed Deep Cleaning, “What does detailed actually mean?” | Three long room checklists stack in one right column beside one vertically centered photo; the image/text pair extends over several viewports | Remove this split wrapper for the checklist. Place heading above three room columns with all headings top-aligned, complete lists beneath. Stack on mobile. Move the window image to the shorter material/detail section or omit it if redundant. Do not truncate unique scope items |
| High | 10:28:46; 10:29:56; 10:30:23; 10:30:59; 10:31:27–28; 10:31:54 — FAQs | Heading is centered across a broad area while the accordion occupies the left portion, leaving a disconnected right void | Put heading and accordion inside the same centered 760–840px container; align both left. Preserve accessible disclosure behavior |
| High | 10:28:39; 10:29:47; 10:30:51 — five-stage processes | Narrow text columns and unequal paragraph lengths make the sequence harder to scan | Consolidate to four meaningful stages where appropriate; keep substance. Short stage titles, brief descriptions; 4/2/1 responsive columns. Existing four-step trauma process is a useful base |
| High | 10:28:29 vs 10:28:42 — homepage | General “difference” explanation precedes services while founder proof sits much later; Who We Help is absent | Move approved Why content directly after the hero, with text left/image right. Add the audience section in the requested position |
| Medium | 10:28:33–35 — homepage service cards | Cards have usable imagery but a marked imbalance between trauma copy and long neighboring descriptions | Use a 3×2 grid after adding the newly requested Estate Cleanout service; use similar concise description lengths and consistent photo crops. Do not pad the trauma card with generic claims |
| Medium | 10:30:00; 10:30:29; 10:31:02; 10:31:31; 10:31:55–57 — related services | Full-height four-card grids repeat near the end of every service page and delay the form | Compact related links or short horizontal image/title tiles; let contact dominate. Preserve relevant internal links |
| Medium | 10:30:13–19 — extreme cleaning | Multiple consecutive sections explain that conditions are complex and require care | Combine repeated explanations; preserve actual condition categories, work steps and scope-change procedure |
| Medium | 10:31:50 — rodent pest control | Large dark section gives exclusions disproportionate visual weight | Short coordination explanation plus compact scope list. Keep real boundaries; flag contradictory disinfection/decontamination wording separately |
| Medium | 10:32:22 — Contact | Three tiny contact-method columns fit inside the left half beside a tall form, leaving uneven white space | Put compact contact methods above the centered form, or use a narrow vertical contact rail beside a larger form. Prefer the centered structure for consistency |
| Medium | 10:32:10–14 — About | Useful portrait/bio, but generic property hero and a large scope/limitations section dilute the founder story | Retain portrait; use approved founder bio and concise operating principles; reduce the oversized boundary presentation |
| Check | 10:28:54 and repeated footers | Footer logo appears as a tiny broken-image/alt-text mark in supplied captures | Verify asset path, loading and contrast in the active build before calling this a confirmed persistent defect |
| Check | 10:28:48 and subsequent bottom forms | Preview explicitly says submissions are not configured and disables sending | Treat as an integration/environment check, not a spacing defect. Test the supported Cloudflare preview; never hide the message or fake success |

Image strategy: several sections reuse neglected rooms where the topic is careful sorting, discretion, or founder discipline. Keep relevant condition images, but replace mismatched placements with real work/consultation/detail images as available. Repeating a dirty room does not prove the process. Do not invent before/after results or represent illustrative scenes as actual jobs.

The screenshot toolbar at the bottom and screenshot thumbnails in corners belong to capture/browser UI; do not treat them as website elements to remove.

## What to learn from the references

| Reference / screenshot time | What works | What is weak | Aseptaclean decision |
| --- | --- | --- | --- |
| Aftermath, 10:10:19 PM | Full-width photo, left text, clear CTA pair, attached trust strip | Heavy blue treatment makes the image less useful; large claims dominate | Borrow composition, use Aseptaclean colors and only supported claims |
| Aftermath, 10:10:20 PM | Intro and substantial work photo read as one section | Badge can overpower evidence | Use a clean 45/55 split for Why Aseptaclean; no floating badge |
| Aftermath, 10:10:06–10:10:10 PM | Related text and photos | Overlapping panels, long copy, awkward staggered edges | Keep text and images in normal grid columns; no overlaps |
| Aftermath, 10:10:22–10:10:24 PM | Reasons separated into short units | Tall stacked cards create a large empty opposite column | Use three short reasons inside the Why section |
| Aftermath, 10:10:25–10:10:27 PM | Explicit service names and links | Large wall of similar icon cards | Keep Aseptaclean's smaller image-led service set |
| Aftermath, 10:10:29 PM | Compact mid-page call invitation | Decorative diagonals add little | Use one restrained navy CTA band |
| Aftermath, 10:10:30 PM | Different audiences are easy to recognize | Another card grid repeats the service treatment | Translate audiences into labeled rows beside one photo |
| Aftermath, 10:10:34 PM | Four understandable process stages | Paragraphs are still fairly dense | Four short steps with simple numbers, no boxes |
| Aftermath, 10:10:12, 10:10:32 PM | Customer evidence has prominence | Long testimonial blocks and repeated treatment | Add one genuine quote within Why when available; no fabricated filler |
| Aftermath, 10:10:14 PM | FAQs have clear row boundaries | Sidebar repeats CTA and credentials | Use a centered FAQ column on service pages |
| Aftermath, 10:10:35–10:10:38 PM | Clear closing contact path | CTA plus long form plus footer is heavy | Short closing invitation, compact form, concise footer |
| Alliance, 10:11:10 PM | Large readable headline and full photo | Respirator close-up and hero form compete for attention | Use relevant property/work image with quiet left space; bottom form |
| Alliance, 10:11:13 PM | Image beside concise service list | Collapsed information can hide basic scope | Use visible room/situation groups; reserve accordions for FAQs |
| Alliance, 10:11:14, 10:11:18 PM | Bright photo/text sections | Long copy outgrows the paired photo | Limit split-section length; use rows or a full-width subsection for overflow |
| Alliance, 10:11:16 PM | Video gives a human explanation | Adds weight if it merely repeats text | Optional founder video on About later; never needed to launch |
| Alliance, 10:11:20–10:11:25 PM | Reviews and credentials visibly separated | Large colored block, long quotes, resource area with unused space | Compact genuine evidence; omit unpopulated resources |
| Alliance, 10:11:25–10:11:30 PM | FAQs, form, and locations are recognizable | Tall form beside company image; large branch directory | Center Aseptaclean's form and show its real service geography |
| SERVPRO, 10:07:10 PM | Hero, phone, trust strip are obvious | Angular banners and national proof are brand-specific | Borrow hierarchy, not shapes or national claims |
| SERVPRO, 10:07:14 PM | Image-led services are easy to browse | Tiny imagery/labels; extra link list adds density | Larger consistent crops, short descriptions, one clear service link |
| SERVPRO, 10:07:16 PM | Industry labels scan quickly | Twelve industries dilute focus for a small specialist | Four relevant audience groups for Aseptaclean |
| SERVPRO, 10:07:19–10:07:33 PM | Contact, local content, reviews, and company story are present | Repetition, multiple proof sections, uneven density | Give each topic one purposeful location |
| SERVPRO, 10:07:38–10:07:48 PM | About has a clear intro and supporting links | Flag photograph says little about the operator; sparse sections | Lead with Matthew and his actual work background |
| SERVPRO, 10:07:58–10:08:05 PM | Service hero and section links establish orientation | General service directory interrupts the specific service journey | Use service-specific content first; related links late and compact |
| SERVPRO, 10:08:08–10:08:19 PM | Consistent image/text pairs explain different situations | Many repeated pairs make the service page excessively long | Use situation grids plus one or two purposeful photo splits |
| SERVPRO, 10:08:24–10:08:34 PM | Process guidance and insurance explanation have distinct roles | Reviews/About/footer content extend an already long page | Keep only service-relevant detail; link to About |

Do not reuse competitor images, logos, testimonials, claims, or wording. A design pattern is not evidence that it converts better.
