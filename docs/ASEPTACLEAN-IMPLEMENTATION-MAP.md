# Aseptaclean design-spec implementation map

Required by `docs/ASEPTACLEAN-DESIGN-SPEC.md` §1. Records the actual source file for every route
the spec names, shared-component consumers, the old-to-new section mapping, the CSS entry point,
asset assignments, and actual canonical URLs. Written 2026-09-18, after implementing the spec's
homepage rebuild, Services hub retirement, Estate Cleanout addition, shared hero sizing, and
estate-campaign form relocation — see `docs/05-CURRENT-DECISIONS.md` (2026-09-18 entries) for the
full narrative and conflict resolutions, and `docs/ASEPTACLEAN-DESIGN-QA.md` for verification
results.

**Read this alongside the honest scope statement at the bottom.** Several of the spec's exact
per-service-page section matrices (§4.1–§4.5) were not rebuilt in this session; this map says so
route by route rather than implying full compliance.

## 1. Route → actual source file

| Route (spec name) | Actual canonical route | Source file |
| --- | --- | --- |
| Home `/` | `/` | `src/pages/index.astro` |
| Hoarding | `/hoarding-cleanup-san-jose/` | `src/pages/hoarding-cleanup-san-jose/index.astro` → `src/components/ac/AcServicePage.astro` + `src/data/servicePageCopy.ts` |
| Extreme Cleaning | `/extreme-cleaning-san-jose/` | `src/pages/extreme-cleaning-san-jose/index.astro` → `AcServicePage.astro` + `servicePageCopy.ts` |
| Detailed Deep Cleaning | `/deep-cleaning-san-jose/` | `src/pages/deep-cleaning-san-jose/index.astro` → `AcServicePage.astro` + `servicePageCopy.ts` |
| Crime Scene & Trauma | `/crime-scene-trauma-cleanup-san-jose/` | `src/pages/crime-scene-trauma-cleanup-san-jose/index.astro` → `AcServicePage.astro` + `servicePageCopy.ts` |
| Rodent Droppings & Animal Waste | `/rodent-dropping-cleanup-san-jose/` | `src/pages/rodent-dropping-cleanup-san-jose/index.astro` (bespoke, not `AcServicePage`) + `src/data/rodentServicePage.ts` |
| Estate Cleanout (new/updated public page) | `/estate-cleanout-san-jose/` | `src/pages/estate-cleanout-san-jose/index.astro` (bespoke; pre-existed this session, was unlinked — see §4 below) |
| About | `/about/` | `src/pages/about/index.astro` |
| Contact | `/contact/` | `src/pages/contact/index.astro` |
| Services `/services/` (retired) | 301 → `/#services` | Deleted: `src/pages/services/index.astro`. Redirect: `public/_redirects`. |
| Rodent campaign | `/rodent-dropping-cleanup-san-jose/assessment/` | `src/pages/rodent-dropping-cleanup-san-jose/assessment/index.astro` + `src/data/ppcRodent.ts` |
| Estate campaign | `/estate-cleanout-san-jose/assessment/` | `src/pages/estate-cleanout-san-jose/assessment/index.astro` + `src/data/ppcEstate.ts` |
| Hoarding campaign (unreviewed, untouched) | `/hoarding-cleanup-san-jose/assessment/` | `src/pages/hoarding-cleanup-san-jose/assessment/index.astro` + `src/data/ppcHoarding.ts` — not edited this session, per spec §6.3 |

The five existing service-page canonical slugs were **discovered from `src/data/launchArchitecture.ts`'s
`launchServiceLinks`**, not inferred from display labels — confirming spec §1.1's requirement that
"Extreme Cleaning" (display label) not be assumed to imply a `/extreme-cleaning/` slug. The actual
href is `/extreme-cleaning-san-jose/` and was not changed.

## 2. Shared-component consumers (who renders through what)

| Component | File | Used by |
| --- | --- | --- |
| `AcHeroWithForm` | `src/components/ac/AcHeroWithForm.astro` | Homepage; `AcServicePage` (→ hoarding, extreme cleaning, deep cleaning, trauma) |
| `AcPageHero` | `src/components/ac/AcPageHero.astro` | Rodent service page, About, Contact, rodent campaign |
| `AcServicePage` | `src/components/ac/AcServicePage.astro` | Hoarding, Extreme Cleaning, Detailed Deep Cleaning, Crime Scene & Trauma |
| `PpcBrightHero` | `src/components/ppc/PpcBrightHero.astro` | Estate campaign only |
| `AcSplit` | `src/components/ac/AcSplit.astro` | Homepage (Why, Who We Help); rodent page/campaign; `AcServicePage` split sections |
| `AcIntro` | `src/components/ac/AcIntro.astro` | Homepage (Services, Process); rodent/hoarding/etc. FAQ and process wrappers; Contact FAQ |
| `AcServiceCards` | `src/components/ac/AcServiceCards.astro` | Homepage service grid; `AcServicePage`'s "related services" row |
| `AcCtaBand` (new) | `src/components/ac/AcCtaBand.astro` | Homepage only (two CTA bands) |
| `AcSteps` | `src/components/ac/AcSteps.astro` | Homepage process; rodent page/campaign |
| `Header` / `Footer` | `src/components/Header.astro` / `Footer.astro` | Every page via `BaseLayout` |
| `FaqAccordion` | `src/components/FaqAccordion.astro` | `AcServicePage` FAQ sections; rodent page/campaign; Contact (new) |

Every consumer listed above was inspected before its shared component was changed, per spec §0.4/§7.

## 3. Homepage: old-to-new section mapping

| Spec §3 ID | This build's section | Component + file | Notes |
| --- | --- | --- | --- |
| `hero` | Hero + trust strip, wrapped in one `<section id="hero" data-section="hero">` | `AcHeroWithForm` + `AcTrustStrip`, `src/pages/index.astro` | Two nested `<section>`s inside one wrapper so `main > section` reports exactly one "hero" entry |
| `why` | Why Aseptaclean | `AcSplit` (`splitFr=[45,55]`, `reverse`), `index.astro` | Combines the former standalone "difference" intro and founder "Why" split — see `ASEPTACLEAN-COPY-MAP.md` |
| `services` | Services grid | `AcIntro` + `AcServiceCards` (`layout="six"`), `index.astro` | Stable id `services`; six cards, Estate Cleanout appended sixth |
| `who-we-help` | Who We Help | `AcSplit` (`splitFr=[45,55]`, `reverse`), `index.astro` | New section — see `ASEPTACLEAN-COPY-MAP.md` for its new copy |
| `cta-mid` | First CTA band | `AcCtaBand` (`tone="dark"`), `index.astro` | |
| `process` | Our process | `AcIntro` + `AcSteps` (4 steps) + folded-in scope proof, `index.astro` | Consolidated from 5 steps — see copy map |
| `service-area` | Service Area | Bespoke `<section id="service-area">`, `index.astro` | Text 40% / two grouped city lists 60% (no map asset exists in the repo) |
| `cta-close` | Second CTA band | `AcCtaBand` (`tone="light"`), `index.astro` | |
| `contact` | Contact form | Bespoke `<section id="home-contact" data-section="contact">` + `AcCompactForm`, `index.astro` | `id="home-contact"`/`formId="hero-form"` preserved literally — load-bearing for `scripts/launch-e2e-form-check.mjs` and `Analytics.astro` |

## 4. Estate Cleanout — pre-existing state discovered

Before this session, `/estate-cleanout-san-jose/index.astro` **already existed**, fully built (a
bespoke, single-file page, not the generic `AcServicePage` template), but was **not** a member of
`launchServiceLinks` in `src/data/launchArchitecture.ts`. Consequence: it was absent from the
header dropdown and footer, and — because `BaseLayout`'s `noindex` gate reads
`isLaunchPublicPath`, which reads `launchPrimaryPaths`, which spreads `launchServiceLinks`' hrefs —
it was also shipping `noindex` and excluded from `sitemap.xml`. Adding one entry to
`launchServiceLinks` (`src/data/launchArchitecture.ts`) fixed all three simultaneously. No new
page file was created for the base route; `src/pages/estate-cleanout-san-jose/index.astro` was
edited in place for hero-sizing alignment only (see §6 below), not rebuilt to the spec's §4.6
matrix.

## 5. Services hub retirement — files touched

| File | Change |
| --- | --- |
| `src/pages/services/index.astro` | Deleted |
| `public/_redirects` | Added `/services/ → /#services` (301) |
| `src/data/launchArchitecture.ts` | `launchPrimaryNavLinks`'s "Services" entry now `/#services`; `/services/` removed from `launchPrimaryPaths`; `launchServiceLinks` gained Estate Cleanout (sixth entry) |
| `src/components/Header.astro` | Services entry is replaced by the shared non-navigating `ServiceDisclosure` button; branch matches `link.label === "Services"` |
| `src/components/Footer.astro` | "Company" column "Services" link → `/#services` |
| `src/components/ac/AcServicePage.astro`, `src/pages/rodent-dropping-cleanup-san-jose/index.astro` | BreadcrumbList JSON-LD "Services" node (→ deleted `/services/`) removed; trail now Home → page directly |

Dead code **not** touched (confirmed via import-graph search — no live importer under `src/pages/`
for any of these, so none is a "consumer" the retirement needed to update): `src/data/site.ts`'s
`megaNav` and `navigation` exports; `src/data/servicePages.ts`'s separate `servicesHub` record;
`HomeServiceGrid.astro`, `WhatWeHandle.astro`, `ServicesHero.astro`, `ServicesEditorialHero.astro`,
`ServicesIntro.astro`, `ServiceDirectory.astro`, `ServicesProcess.astro`, `ServicesAuthority.astro`,
`HomeScopeAuthority.astro`, `HomeTrustStrip.astro`, `HomeServiceArea.astro`, `ServiceConditionLevels.astro`,
`ServicesClose.astro`, `ServiceProblemChooser.astro`.

## 6. Shared hero sizing — CSS entry points touched

| File | What changed |
| --- | --- |
| `src/components/ac/AcHeroWithForm.astro` (`.acx-hero`) | `min-height`: 440/592/736px at base/48rem/64rem (see below for why 736/592, not the spec's initial 600/560 target). Content inset stepped to 40/48/64px (was a flat 36px). |
| `src/components/ac/AcPageHero.astro` (`.acx-phero`) | Same min-height table. Content inset stepped to 40/48/64px (was `clamp(40px, 5vw, 64px)`). |
| `src/pages/estate-cleanout-san-jose/index.astro` (`.ec-hero`) | Same min-height table (was flat `540px`). Shell changed from `display:flex; align-items:center` (vertical centering) to normal top-aligned block flow with the same stepped inset. Two pre-existing page-specific breakpoints (`≤70rem`: 500px, `≤44rem`: 460px) that silently overrode the shared floor were found and removed. |
| `src/components/ppc/PpcBrightHero.astro` (`.est-hero`, estate campaign) | Same min-height table added (had none before). |

These four components/pages are every consumer of a shared hero on the nine public pages plus the
two reviewed campaigns the spec names. Rodent's public page, About, and Contact all render through
`AcPageHero` and inherited the change with no page-specific edit needed.

**Why 736px desktop / 592px tablet, not the spec's initial 600/560 target.** Spec §2.2's own
repair procedure: "If approved copy exceeds the baseline, increase the shared token in 8px
increments to the smallest value that fits every reviewed hero at that breakpoint." Measured at
600/560, Extreme Cleaning's approved hero copy (the longest of the eleven reviewed heroes) rendered
at 736px desktop / 589px tablet — both above the 600/560 floor. Raising the shared token to
736/592 (the next 8px increment) and rebuilding confirmed **exact equality (0px variance) across
all eleven reviewed pages at both breakpoints**, except one documented exception — see
`docs/ASEPTACLEAN-DESIGN-QA.md` "Hero equality" for the full measured table and the one exception
(the estate campaign's tablet width, where its own text/image stacking breakpoint is wider than the
tablet range).

## 7. `.ac-site` / `.ac-*` DOM-contract marker classes — where they were attached

Per spec §8's "If an existing component uses different names, attach these classes or document an
exact mapping" — both were done: classes attached where cheap and safe, an exact mapping recorded
here for everything else.

| Spec class | Attached to (additional class, not a replacement) | File |
| --- | --- | --- |
| `.ac-site` | `<body>` | `src/layouts/BaseLayout.astro` (every page) |
| `.ac-hero` | `.acx-hero` section, `.acx-phero` section, `.ec-hero` section | `AcHeroWithForm.astro`, `AcPageHero.astro`, estate `index.astro` |
| `.ac-hero__copy` | `.acx-hero__content`, `.acx-phero__copy`, `.ec-hero__content` | same three files |
| `.ac-split` | `.acx-split__grid` | `AcSplit.astro` |
| `.ac-split__text` | `.acx-split__copy` | `AcSplit.astro` |
| `.ac-split__media` | `.acx-split__media` (figure) | `AcSplit.astro` |
| `.ac-dropdown__panel` | `.services-nav__panel` | `Header.astro` |

| Spec class not attached | Existing equivalent (documented mapping, no class added) | Why not attached |
| --- | --- | --- |
| `.ac-container` | `.ac-shell` (already a sitewide, pre-existing utility class — confusingly similar name, different origin) | Purely cosmetic naming; adding a second class with identical rules to every shell element sitewide was judged higher risk/lower value than documenting the 1:1 mapping |
| `.ac-service-card` / `.ac-service-card__link` | `.acx-cards__item` (article-equivalent) / the same element also serves as `.acx-cards__link` | **Structural mismatch, not just naming.** The spec's contract is `<article>` → image wrapper → body → separate descriptive link at the bottom. The existing component makes the ENTIRE card one `<a>` (whole-card-clickable), which is a common, valid, accessible pattern and is what spec §0.3/§12.2 elsewhere warns against for the opposite reason ("Do not make the entire card a link containing other interactive links") — there is only one interactive element per card here, so that specific failure mode does not apply, but the DOM shape genuinely differs from the contract's `article > ... > link` structure. Not restructured this session; flagged as a real, documented deviation rather than silently left unmapped. |
| `.ac-faq-shell` | `AcIntro`'s new `narrow` prop (`.is-narrow .acx-intro__inner`) | Achieves the identical visual/measured result (heading + accordion share one centered ~820px, left-aligned) via an additive prop on the existing shared component rather than a new class; see §8 below |
| `.ac-form-shell` | `.home-contact__shell`, `.svc-contact__shell`, `.rodent-form__shell`, `.est-final__shell` (per-page, ~680px centered) | Same value (680px), different class per page; not consolidated into one shared name this session |
| `.ac-process` | `.acx-steps` (`AcSteps.astro`) | Same 4/2/1 responsive column behavior already existed |
| `.ac-cta--dark` / `.ac-cta--quiet` | `AcCtaBand`'s `tone="dark"` / `tone="light"` | New component built for this session's homepage; prop-based tone instead of a second class name |

## 8. FAQ container fix (spec §12.2 "FAQ" row / evidence-appendix "High" finding)

`AcIntro.astro` gained an additive `narrow` prop: when set, the heading and the slotted content
share one centered ~820px container, both left-aligned (spec target: 800px, tolerance not
pixel-exact but visually equivalent — see QA record for the measured value). Applied to:
`AcServicePage.astro`'s FAQ branch (reaches hoarding, extreme cleaning, deep cleaning, trauma), the
rodent service page's FAQ, the rodent campaign's FAQ, and the new Contact FAQ.

## 9. Assets — new/reused image assignments this session

| Section | File path | Alt text | Real vs. illustrative |
| --- | --- | --- | --- |
| Homepage — Who We Help | `src/assets/aseptaclean/property-interior-introduction.png` | "An unfurnished residential interior looking from the living room toward an adjoining hallway" | Illustrative (owner package), already in use elsewhere on the site |
| Homepage — 6th service card (Estate Cleanout) | `src/assets/aseptaclean/hoarding-garage-contents.png` | "Household belongings staged in a garage, sorted into groups ahead of an estate cleanout" | Illustrative; same file already used as the public Estate Cleanout page's own hero image |
| Estate campaign hero (replaces the removed form column) | `src/assets/aseptaclean/hoarding-garage-contents.png` | "Household belongings staged in a garage, sorted into groups ahead of an estate cleanout" | Same file, reused rather than either of the two illustrations already placed one/two sections below on the same page |

No new stock search or generated imagery was used, per spec §8.1/§10's asset-fallback order —
every image above was already present in `src/assets/aseptaclean/` before this session.

## 10. Honest scope statement — what the spec asks for that is NOT done

- **Spec §4.1–§4.5's exact per-service-page section matrices** (exact IDs like `rodent-spaces`,
  `hoarding-scope`, `deep-rooms`, `trauma-situations`, etc., and their exact `.ac-grid--2`/
  `.ac-room-grid`/`.ac-owner` layout classes) were **not implemented** for the five pre-existing
  service pages (hoarding, extreme cleaning, deep cleaning, crime scene & trauma, rodent) beyond
  the shared hero-sizing alignment (§6 above) and the FAQ container fix (§8 above), both of which
  do reach all five. The pages retain their existing, working, previously-approved section
  structure and component names (`AcServicePage`'s `split`/`twoLists`/`faq` section kinds, or the
  rodent page's own bespoke sections).
- **Spec §4.6's exact Estate Cleanout matrix** (`estate-audience`, `estate-scope`, `estate-records`,
  etc.) was not implemented; the pre-existing bespoke page structure (§4 above) was kept and only
  its hero sizing was aligned.
- **Spec §5.1/§5.2's exact About/Contact section IDs and order** were not implemented; both pages
  keep their existing section structure. Contact gained a new FAQ section (relocated from the
  homepage) but not the spec's exact `contact-methods`/`contact`/`contact-coverage` three-section
  shape.
- **The literal `.ac-*` CSS contract (§8)** is saved as a reference file
  (`src/styles/aseptaclean-layout.css`) but is not loaded/applied; only the specific classes listed
  in §7 above were attached as markers, and only on the homepage and the shared hero/split
  components.

This is the single largest gap between this session's actual output and the spec's literal text.
It is recorded here, in `docs/05-CURRENT-DECISIONS.md`, and in the final handoff, rather than
implied to be complete. Rebuilding five mature, previously-approved service pages to an entirely
new section-ID/class contract is a substantial follow-up effort in its own right.

## 11. Second pass, 2026-09-18 — owner-supplied `aseptaclean-home.css`, homepage only

A separate, later owner instruction the same day attached a second, self-contained CSS file
(`docs/aseptaclean-home.css`, header comment: "approved desktop homepage concept / responsive
stylesheet") with its own literal `.ac-home`-scoped class/DOM contract, distinct from and simpler
than the sitewide `.ac-site` contract in §6–§7 above. The instruction was explicit and homepage-only:
install this exact file, wrap the homepage in `.ac-site.ac-home`, and restructure the homepage's own
markup to carry the required classes — not a document-a-mapping allowance this time. No visual
mockup image was attached or found in the repository; the three PNGs present
(`ChatGPT Image Sep 6, 2026...png`) are unrelated AI-generated crime-scene stock photos, flagged to
the owner rather than treated as the mockup. `docs/aseptaclean-home.css` is the untouched, literal
copy of what was attached.

**Files touched this pass:**

| File | Change |
| --- | --- |
| `docs/aseptaclean-home.css` | New. Byte-identical copy of the attachment, kept as the pristine record. |
| `src/styles/aseptaclean-home.css` | New. Consumed copy — identical to the above except heading font-size rules (see Type Law fix below). Imported only from `src/pages/index.astro`. |
| `src/layouts/BaseLayout.astro` | `ac-home` class added to `<main>` only (not `<body>`), conditional on `Astro.url.pathname === "/"`. See scope decision below. |
| `src/pages/index.astro` | Full rewrite of the template (frontmatter data/copy sourcing unchanged). Every section now hand-written with the literal `.ac-hero`/`.ac-trust`/`.ac-split`/`.ac-service-grid`/`.ac-cta`/`.ac-process`/`.ac-area-grid`/`.ac-form-shell` classes instead of the `AcHeroWithForm`/`AcTrustStrip`/`AcSplit`/`AcServiceCards`/`AcCtaBand`/`AcSteps`/`AcIntro` components from §6–§7. `AcCompactForm` (the actual form) and `AcCheckList` (the scope-questions list) are the only shared components still used — both inert/unaffected elsewhere. |
| `scripts/type-law-check.mjs` | Bug fix, unrelated to content — see below. |

**Why the shared components were not reused for this pass:** `AcHeroWithForm`, `AcSplit`,
`AcServiceCards`, `AcCtaBand`, `AcSteps`, `AcIntro`, `AcEyebrow`, `AcActions` each render their own
`acx-*`-prefixed classes with their own scoped `<style>` block (the §6–§7 system). Adding the new
`.ac-*` classes on top of those components' existing output would apply two independent styling
systems to the same elements, with the winner decided by cascade tie-breaks rather than by design —
exactly the "pile page-specific overrides on top" anti-pattern the contract itself warns against.
Since none of the sections this pass touches are shared with other pages (hero/why/services/
who-we-help/cta/process/service-area are only ever rendered by the homepage), hand-writing plain
markup for them is zero-risk to any other route and gives pixel-exact compliance with the attached
file's own DOM contract instead of an approximate mapping.

**Header and Footer are intentionally excluded from `.ac-home` and were not restructured.** Three
reasons, in order of weight:

1. **Type Law.** `src/styles/global.css` sizes Footer's three column headings (`<h2 class="foot__h">`)
   through the shared `.ac-type-label-head` role class. `.ac-home h2 { font-size: 36px }` has higher
   selector specificity than that single-class role selector and would win if Footer were inside
   `.ac-home`'s scope — a live Type Law violation (AGENTS.md §6, "zero exceptions"), and one that
   cannot be fixed by overriding font-size again on `.foot__h` without committing the exact same
   violation a second time. Scoping `.ac-home` to `<main>` only removes Footer (and Header, which has
   no headings) from the selector's reach entirely.
2. **Shared, working navigation.** Header.astro's desktop/mobile breakpoint (1184px, via its own
   `<details>`/`<summary>` disclosure and `data-services-toggle` JS), Escape-key handling, and focus
   management are unchanged and untested by this pass by design — "preserve … working navigation" was
   explicit in the instruction, and Header/Footer render identically on every other route.
3. **Scope.** The instruction was homepage-only. Restyling Header/Footer to the new contract would
   necessarily change how they look and behave on all ~50 other routes, or require a second,
   route-conditional visual system for shared chrome — out of scope for this pass.

**Practical effect:** the new stylesheet's `.ac-header`/`.ac-nav`/`.ac-dropdown`/`.ac-mobile-*`/
`.ac-footer*` rules exist in `src/styles/aseptaclean-home.css` (kept, since the file is otherwise
installed as attached) but never match a real element — Header and Footer keep their existing
`site-nav`/`foot` markup, classes, and sitewide-approved visual design, completely unchanged. One
observable, minor, disclosed consequence: Header's own nav breakpoint (1184px) is ~16px narrower
than the new stylesheet's own `.ac-nav` breakpoint (1199px), so at exactly 1024–1199px the header
already shows its mobile menu rather than the desktop bar the new file's own comments imply at that
width. This is the existing, sitewide, already-approved header behavior — unchanged by this pass —
not a defect introduced here.

**Type Law fix — `.ac-home h1/h2/h3` and several `.ac-home .<component> h2/h3` selectors renamed to
standalone `.ac-type-home-*` role classes.** The attached file sizes every heading with a bare-tag or
class+element selector (`.ac-home h1`, `.ac-home .ac-cta h2`, `.ac-home .ac-process h3`, etc.) — the
exact pattern AGENTS.md's Type Law (§6, verified by resolving computed styles, not by reading
selector text) forbids with zero exceptions. Verified directly with an isolated Chromium check
(`Element.matches()` against the live DOM) before concluding this was real, independent of any
tooling. Every value was moved into a same-named, bare `.ac-type-home-*` class in
`src/styles/aseptaclean-home.css`, and the matching class added to each heading in `index.astro`.
No numeric value, weight, or breakpoint changed — only the mechanism.

| Old selector (attached file, as given) | New role class | Value(s) |
| --- | --- | --- |
| `.ac-home h1` (+ two responsive re-declarations) | `.ac-type-home-h1` | 56/46/36px |
| `.ac-home h2` (+ two responsive re-declarations) | `.ac-type-home-h2` | 36/32/28px |
| `.ac-home h3` (+ one responsive re-declaration) | `.ac-type-home-h3` | 21/—/20px |
| `.ac-home .ac-row h3` | `.ac-type-home-row-h3` | 18px |
| `.ac-home .ac-service-card h3` | `.ac-type-home-card-h3` | 20px |
| `.ac-home .ac-cta h2` (+ mobile) | `.ac-type-home-cta-h2` | 28/26px |
| `.ac-home .ac-cta--quiet h2` (+ mobile) | `.ac-type-home-cta-h2-quiet` | 24/23px |
| `.ac-home .ac-process h3` | `.ac-type-home-process-h3` | 20px |
| `.ac-home .ac-area-cities h3` | `.ac-type-home-area-h3` | 18px (margin stays on the original selector — not a font-size property) |
| `.ac-home .ac-footer h3` | *(left as-is)* | Dead selector — Footer is outside `.ac-home`'s scope (see above), so it can never match a real element; not a violation, not touched. |

Verified clean with a from-scratch, independently-written check (not the project's own script, to
avoid trusting the same logic twice) that walks every loaded stylesheet's CSSOM and tests every real
`h1`–`h6` on the built homepage: **zero non-role-class rule matches any heading.**

**Bonus fix (`scripts/type-law-check.mjs`), unrelated to the CSS itself:** the project's own Rule-1
checker silently reported "CLEAN" on every route, including a deliberately-reintroduced violation
used to test it. Root cause: modern Chromium gives every plain `CSSStyleRule` its own `.cssRules`
property (part of the CSS Nesting spec) — usually an empty `CSSRuleList`, which is still a truthy
object — and the walker's `if (rule.cssRules)` treated that as "this is a container, recurse and
skip checking it," so no plain style rule was ever actually checked. Fixed by requiring
`rule.cssRules.length` before recursing, and checking a rule's own `font-size` regardless of whether
it also carries an (empty) `cssRules`. Re-verified against `/`, `/about/`, `/contact/`, and
`/hoarding-cleanup-san-jose/` with no new false positives.

**Trust content:** the three trust items are the same real, approved facts `AcTrustStrip.astro`
already computes (owner-operated; serving the region; response time — insurance is release-gated,
AGENTS.md §3, and does not render), reproduced inline in `index.astro` rather than through the
component so they could be placed in the new `.ac-trust`/`.ac-trust__item` icon+strong DOM shape.
No new fact, description, or icon-as-credential was introduced; icons are plain decorative
checkmarks, not badges.

**Conflicts found between the attached file and the existing site, and how each was resolved:**

1. **Hero minimum heights, 560/520/440px vs. the sitewide 696/680/440px.** The instruction was
   explicit and current ("Do not carry over the older 736px hero rule" — itself already corrected to
   696/680 earlier the same day, see §6 above). Treated as a later, more specific, explicitly-scoped
   owner decision for the homepage only. `AcHeroWithForm.astro` (still used by the four sibling
   service pages) was **not** changed; the homepage no longer calls it at all, so the two hero systems
   coexist without conflict.
2. **`.ac-eyebrow` name collision.** `src/styles/global.css` already owns a bare `.ac-eyebrow` as a
   pill-chip label (background, padding, border-radius) used by ~20 existing call sites. The new
   file's `.ac-home .ac-eyebrow` has higher specificity for the properties it sets (color, size) but
   not for the ones it doesn't (background/padding/radius/margin/display), which silently inherited
   the old chip's light-blue background — rendering the hero eyebrow as near-invisible light text on
   a light chip. Fixed by explicitly resetting `background`, `padding`, `border-radius`, `margin`,
   and `display` inside `.ac-home .ac-eyebrow` in `src/styles/aseptaclean-home.css`, rather than
   editing the shared `global.css` rule (which the other ~20 call sites still need unchanged).
3. **`.ac-split` name collision.** `global.css` also has a bare `.ac-split` (different grid ratio,
   used elsewhere). Checked property-by-property: the new `.ac-home .ac-split` rule declares
   `display`, `grid-template-columns`, `gap`, and `align-items` — the complete set the colliding
   global rule also sets — so the higher-specificity new rule wins every property with nothing left
   to leak through. Confirmed with computed-style inspection (45fr/55fr columns render correctly at
   every breakpoint). No change needed.
4. **`.ac-field` name collision.** `global.css` also has a bare `.ac-field`. Not used anywhere in the
   new `index.astro` markup (the form's own fields keep `AcCompactForm`'s existing, unrelated field
   classes) — confirmed moot by grep, no change needed.

**Form:** `AcCompactForm` renders exactly as before — same `formId="hero-form"`, same
`functions/api/lead.ts` endpoint, same field names/validation/consent/Turnstile/thank-you redirect.
Only its outer wrapper gained `.ac-form-shell` (layout) and `.ac-form` (per the attached file's own
instruction to add wrapper classes, not touch the form internals) classes.

**Known, pre-existing, out-of-scope finding — not introduced by this pass.** At exactly 320px
viewport width, the page overflows horizontally by 23px. Root cause: the Cloudflare Turnstile widget
(`data-size="flexible"`) renders at a fixed ~300px width in this local/unverified preview
environment regardless of its flexible-sizing attribute. Confirmed identical (same 23px, same cause)
on `/contact/`, a page this session did not touch — this is a sitewide, pre-existing condition of
`AcCompactForm`'s Turnstile integration in non-production environments, not a homepage-specific
defect, and out of scope for a homepage-only task to fix.

## 2026-09-18 — Correction superseding the previous homepage-only-main mapping

`BaseLayout` applies `.ac-home` to the homepage body, covering Header, main and Footer.
`Header` and `Footer` receive an opt-in homepage prop; shared disclosure JavaScript remains,
with homepage section links closing the mobile drawer. Existing `.site-nav*` and `.foot*`
classes map directly to the supplied header/footer composition in `aseptaclean-home.css`.
Typography still uses `.ac-type-*` roles. Global styles and other routes' CSS are unchanged.

`AcCompactForm` receives an opt-in homepage presentation/upload prop and external `headingId`.
The existing `.hero-form*` wrappers map to the supplied form grid/field roles through homepage
selectors; the panel border/background/padding are removed only there. Field names, consent,
handler and endpoint are unchanged. Optional `property_media[]` photos use the existing backend.
The compact Turnstile widget and visible failure/success callbacks are homepage-only.

Cards use the mockup's shallow photographic proportions (2.4:1), compact body copy and aligned
links. The two 45/55 split-image slots intentionally have no image pending suitable assets.
On narrow stacked layouts, empty media slots do not add a spacer. No unrelated photograph is
used to simulate the missing documentation/customer imagery.

After actual side-by-side inspection, homepage container max is 1248px (96px gutters at 1440),
section padding 36px desktop / 44px tablet/mobile, card image ratio 2.4:1, form gaps 16px, message
minimum 112px, and footer city grid two columns. These are mockup-matching refinements; the
560/520/440px hero minimums, role-class font sizes and 48px controls remain. Media consent uses
the existing approved appendix only on the photo-enabled homepage variant.

## Contact package override — 2026-09-20

The current Contact-only owner request supersedes this record's older Contact composition.
`src/pages/contact/index.astro` now implements the open white package: custom compact header,
`.contact-open-heading`, `.contact-open-body` with wider left `AcCompactForm` and right details,
custom warm footer. Canonical remains `/contact/`. `src/styles/contact-kit.css` is imported once
by that route and preserves all 19 source style blocks in order. `BaseLayout.contactKit` assigns
`ac-contact-page`; default false elsewhere. Heading selectors map to `.ac-type-contact-h1/h2/h3`.
`AcCompactForm.contactKit` preserves production contracts and enables supported photos; no backend
change. Other consumers: home, estate, hoarding, extreme, trauma and deep cleaning. See the Contact
entry in `BUILD-KITS-INSTALLATION-CHECKLIST.md` for complete mapping, adaptations and QA evidence.

## Public Services navigation disclosure — 2026-09-20

`src/components/ServiceDisclosure.astro` is the single implementation for the public Services
control in desktop and mobile navigation. It reads the six approved labels and canonical public
routes directly from `launchServiceLinks`; no homepage section URL or `/assessment/` campaign URL
is present in its panel. `Header.astro` and the Home, Estate, Hoarding, Extreme, Detailed and Trauma
page-specific headers consume it. Rodent, About, Contact and legal pages reach it through the
shared `Header.astro`; Contact's former one-line header slot was removed so this public page uses
the standard navigation. `contact-kit.css` now explicitly yields shared-header display/summary
geometry to `Header.astro`.

The three `/assessment/` campaign routes remain on `PpcLayout` or their equivalent explicitly
simplified header slots and do not render `ServiceDisclosure`. The disclosure's button owns
`aria-expanded` and `aria-controls`; its controlled panel owns `aria-labelledby`. One shared
script handles pointer/click toggling, keyboard activation, Escape/focus return, focus departure,
outside-pointer dismissal, drawer reset and link closure without hover behavior.

## Owner-approved inherited-home and rodent landing composition — 2026-09-23

`src/styles/approved-landing.css` is the route-scoped implementation of both approved ZIP
layouts. `src/pages/estate-cleanout-san-jose/assessment/index.astro` and
`src/pages/rodent-dropping-cleanup-san-jose/assessment/index.astro` provide the approved copy,
order and route-specific image while sharing that stylesheet. Their compact header maps the
package mark slot to `site.business.logoUrl` and maps the package phone control to
`site.business.phone` / `site.business.phoneUri`.

The lower form remains the production `PpcHeroForm`; its `approvedLanding` option changes only
presentation and disclosure placement. Existing campaign context, attribution, consent,
Turnstile, idempotency, uploads, endpoint handling, analytics and success redirects remain in
that component. `PpcLayout.showStickyBar={false}` suppresses the unrelated legacy sticky bar only
on these approved compositions. The public rodent service route is not a consumer and remains
unchanged.

## Shared public contact rhythm — 2026-09-23

`src/styles/public-page-rhythm.css` is imported only by the homepage and the six public service
routes. At desktop widths it maps each route’s existing closing `.formwrap` to an aligned
copy/form grid and understands both direct `AcCompactForm` output and Rodent’s
`.ppc-form-shell`. Below 1024px it adds no rules, so the existing route kits retain their tablet,
mobile and enlarged-text stacking. Campaign landing pages are not consumers.
