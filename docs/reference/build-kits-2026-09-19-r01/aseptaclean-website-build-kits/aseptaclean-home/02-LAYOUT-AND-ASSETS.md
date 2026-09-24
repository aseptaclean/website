# Final homepage layout and assets

Version 1.2 · 2026-09-19. The approved standalone reference and complete CSS are authoritative. Preserve the cascade, including final overrides. Root: `#ac-home-locked-mockup` around utility, header, main and footer.

## Layout

- Container: maximum 1120px, width `calc(100% - 72px)`; 40px total side space at 850px and below.
- Base font: Inter, 16px/1.6. H1 clamp(36px,5.1vw,56px); H2 clamp(28px,3.2vw,38px). Preserve font size; full-width heading rows provide desktop line length. Allow natural mobile wraps.
- Colors: navy #1c355e, deep #122840, slate #6a9bc3, ink #172c42, supporting text #435565, warm #f4f6f8. Preserve contrast on buttons in every state.
- Section order: utility/header; hero/trust; Why; services; Who; navy CTA; four-step process; coverage; pale closing text; form; footer.
- Utility, header, hero and trust retain original proportions, sticky behavior, responsive navigation and hero sentence break. Hero is content-sized; desktop trust overlaps 30px, mobile does not overlap.

## Why

`.why-layout`: two columns 45fr/55fr, 44px column gap (28px below 850px), 28px row gap. Full-width `.why-heading` contains eyebrow and “Careful work. Clear Steps.”. Then `.why-copy` left and `.why-photo` right. The photo has width 100%, height auto, aspect ratio 1.35, top alignment. Do not stretch it to match copy height.

`.why-points` spans both columns: three equal columns, 28px gap, 25px top padding and a thin top rule. Bold labels sit above supporting text. The CTA spans the following row. No image caption. At 620px and below, all content stacks in source order and proof points use one column.

## Services

Full-width heading and supporting text beneath. Two equal card columns, 20px gap. Cards are horizontal, white with a thin border, no shadow. Desktop image 132x150px; text area padding 21px 38px 21px 20px; title 19px/1.3 and description 14px/1.6. Arrow sits at upper right. Text determines card growth; never clamp it or stretch photos.

At 950px and below: images 105x135px, title 18px. At 760px and below: one card column, image 112x138px. At 390px and below: image 86x116px, title 17px. Keep descriptions 14px. Final CSS includes hover, expanded and keyboard-focus states. No generic CTA beneath the grid. Keep six services in approved order.

## Who

The eyebrow and heading span the full row above the original audience/image pair. Row gap 24px. Audience rows retain their icons and separators. Original image aspect ratio is preserved. Responsive source order is heading, audience, image.

## Coverage

Full-width eyebrow/heading. Desktop columns .95fr/1.15fr/1.15fr for introduction and the two counties. Gap 32px. City lists use two CSS columns per county; 13px text, 1.5 line height, 10px item spacing. No dot separators. County headings have 18px bottom spacing. The outside-cities note spans the full width below a divider.

At 900px and below: intro spans full width and counties sit in two columns without vertical borders. At 520px and below: counties stack, each retains two city columns and 14px city text. Use all 34 approved cities; no South San Francisco.

## Closing, form and footer

Pale closing band: centered text, 32px vertical padding, no button. Form immediately follows in its own white section, max 620px wide. Preserve the six-field approved draft, security/consent and actual backend requirements when implemented. The demo has explicit no-submission messaging and no upload field. Do not remove working production uploads merely to match the demo.

Footer retains the original four-column desktop/two-column mobile layout and final readable colors. Demo attribution must not become company-project proof or production legal text.

## Assets

`home-photos.jpg` remains the original illustrative 3x3 atlas. Background size 300% 300%; p0 hero, p1 Why documentation, p2 property discussion, p3 hoarding, p4 extreme cleaning, p5 deep cleaning, p6 trauma, p7 rodent, p8 estate. Preserve imagery and crop assignments. These are not actual jobs or employee photos.

Use local Inter and local/build-time icons in production. Do not install the standalone visualization wrapper or depend on a chat-provided Lucide global in production.
