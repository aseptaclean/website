# Approved Aseptaclean homepage build kit

Version 1.2 · 2026-09-19 · Homepage `/` only.

Owner approval: “excellent. lock this in. update the zip”. This package now contains the final approved interactive mockup, including all approved copy and layout revisions. Older homepage packages and earlier wording/layout descriptions do not override it.

## Authority

1. Latest explicit owner instructions.
2. `01-APPROVED-COPY.md` for final wording; `reference/home-preview.html` for final visual composition and interactive demo.
3. `02-LAYOUT-AND-ASSETS.md` and `reference/home.css` for layout and styling.
4. Existing production integration contracts for forms, consent, routes, security and analytics.

The current task authorizes updating this ZIP, not editing the website, pushing or deploying. Do not create another Markdown specification or progress document.

## Open the mockup

Open `reference/home-preview.html` in a browser. It is a standalone export of the approved inline mockup. It includes the illustrative image atlas. No information is submitted; use sample data only. The export's preview wrapper is not production markup.

`reference/home-fragment.html` is the editable fragment with its image URL pointing at `home-photos.jpg`. `home.css` and `home-demo.js` are matching extractions, not additional files to load alongside their already embedded copies. Asset integrity is recorded in `reference/SHA256SUMS.txt`.

## Final decisions

- Preserve the two-sentence hero break and all approved copy.
- Why heading: “Careful work. Clear Steps.”, full-width above body/image columns.
- Why background mentions Stanford Health Care surgical pathology and BioMarin pharmaceutical manufacturing. Three proof points run across the bottom, then the CTA. Do not stretch the image. The image caption is removed.
- Services heading uses the full row; supporting sentence below. Six horizontal photo/text cards in two desktop columns, one column at 760px and below.
- Who heading: “Help for the people responsible”, full-width above the columns.
- Area heading: “South Bay and Peninsula.”, full-width. The 34 owner-approved cities appear in county columns; South San Francisco is excluded.
- No general CTA under the service grid. Closing pale band retains text but has no button; the assessment form follows.
- Final contrast corrections remain in force. No text clipping, image stretching or reduced type to conceal layout issues.
- Photography is illustrative, not evidence of company work. No actual work photos were supplied.

## Production boundary

Only implement in the existing website when separately instructed. Follow file 04 for real integrations; never copy the mockup's fake submission or service detail behavior into production. Preserve canonicals and distinct campaign routes. Use the repository's local Inter and icon mechanism. Run the actual page checks in file 05 before claiming production completion.
