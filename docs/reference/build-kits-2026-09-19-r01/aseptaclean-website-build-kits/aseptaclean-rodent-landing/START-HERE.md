# Rodent landing page — updated locked design

September 19, 2026. This version supersedes the earlier angled-hero rodent landing mockup. User requested the locked estate landing design applied to rodent cleanup.

Open rodent-landing-preview.html. The exact source is rodent-landing-fragment.html; styles are also extracted in rodent-landing.css in original cascade order. Do not load the CSS twice. This is a landing-page build kit, separate from the rodent public service-page package. Copy remains provisional. No site deployment performed.

## Required layout
- Warm-white editorial hero: text left, large photo right, CTA and phone below the entire row. Headline: Rodent Dropping Cleanup. / Take Back Your Space.
- Slim assurances below hero.
- Full-width section heading; three photographic service rows with photo left, heading middle, description right. Kitchens & living spaces; garages & belongings; attics & crawl spaces. All descriptions visible, no cards or stage selectors.
- Warm planning section with overlapping navy panel, then three open numbered process items across the bottom.
- Navy call band, centered FAQs, bottom assessment form, compact footer.
- Retain rodent-specific content, insulation/pest-control boundaries, affected-area form selection and phone +14087857588. Estate inventory, shredding and executor copy do not belong on this page and were not carried over.

## Integration
Reproduce the supplied source before optional refactoring. All CSS is scoped to ac-rodent-editorial. Preserve every style block in order; final overrides are intentional. Brand: Inter, navy #1C355E, deep navy #122840, slate #6A9BC3, warm white #F7F8FA. Keep image aspect ratios and responsive stacking. Embedded atlas photos are illustrative, not job evidence. Lucide data-lucide attributes need the production icon initializer. Standalone preview may require CDN connectivity.

Use the existing rodent campaign route and preserve its canonical, metadata, tracking and existing production form behavior. Do not modify unrelated pages. The preview form validates locally and sends nothing. Connect actual production submission and consent flow before launch; only then remove the preview notice. Do not count demo form validation as a conversion. Keep phone and assessment CTAs functional.

Verify at desktop, tablet, 390px and 320px: no overflow, headline wrapping, image proportions, rows, keyboard disclosures, labels, phone links and form success/error states. Do not stretch images to fill spare space. Do not add pricing or new service promises during layout integration. Insulation replacement, air sealing and pest control are not part of this cleanup offer.

## Checks actually performed
Three service rows and valid internal anchors verified; JavaScript syntax checked with Node; package integrity checked. Browser visual validation and live deployment were not performed.
