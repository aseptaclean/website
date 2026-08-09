# Asset Manifest

| File | Source / owner | License or permission | Purpose | Alt text | Crop / responsive treatment | Proof status |
| --- | --- | --- | --- | --- | --- | --- |
| `public/assets/brand/aseptaclean-wordmark.png` | Owner-supplied `IMG_6795 2.PNG` | Supplied by owner for Aseptaclean brand use, 2026-07-30 | Primary wordmark on light header surfaces | Empty inside the home link; the link has the accessible name `Aseptaclean home` | Exact artwork, proportionally resized from 2127×510 to 900×215; no crop; responsive CSS width | Authentic brand asset; not project proof |
| `public/assets/brand/aseptaclean-wordmark-reversed.png` | Owner-supplied `IMG_6800.PNG` | Supplied by owner for Aseptaclean brand use, 2026-07-30 | Reversed wordmark on the dark footer | `Aseptaclean` | Exact artwork, proportionally resized from 2127×510 to 900×215; no crop | Authentic brand asset; not project proof |
| `public/assets/brand/aseptaclean-site-icon-512.png` | Owner-supplied `aseptaclean-site-icon-512.png` | Supplied by owner for Aseptaclean brand use, 2026-07-30 | Browser favicon and touch icon | Not rendered as page content | Exact 512×512 supplied artwork; no crop | Authentic brand asset; not project proof |
| `@fontsource-variable/newsreader` Latin variable WOFF2 build asset | Newsreader project via Fontsource | SIL Open Font License 1.1; package license retained in `node_modules/@fontsource-variable/newsreader/LICENSE` | Editorial display headings and selected outcome statements | Not applicable | Weight-variable Latin webfont; emitted and self-hosted by the Astro build | Type asset; not project proof |
| `@fontsource-variable/instrument-sans` Latin variable WOFF2 build asset | Instrument Sans project via Fontsource | SIL Open Font License 1.1; package license retained in `node_modules/@fontsource-variable/instrument-sans/LICENSE` | Body, navigation, controls, forms, labels, and operating documents | Not applicable | Weight-variable Latin webfont; emitted and self-hosted by the Astro build | Type asset; not project proof |
| `src/components/HandoffRecord.astro` | Aseptaclean operating-method content, rendered in native HTML/CSS | Project-owned implementation | Sample room status, approved change, exception, completion-photo index, and closeout evidence | Semantic figure/table labels | Readable stacked excerpt on narrow screens; four-column record at larger widths | Visibly labeled sample; not a client record |
| `src/components/ResidenceBaselineRecord.astro` | Phase 4 approved campaign specification, rendered in native HTML/CSS | Project-owned implementation | Sample room priorities, finishes, access, exceptions, and completion review | Semantic figure/list labels | Readable room excerpts on narrow screens; expanded record at larger widths | Visibly labeled sample; not a client record |

## Pending image slots — `docs/18-VISUAL-DIRECTION.md` §6, no file yet

Phase 0 (owner shoot, `18` §5.1) has not happened. Every row below renders as a labelled,
bordered placeholder (steel-100 surface, mono caption stating the slot and its required
classification) per `18` §10 Phase 2 — "Image slots ship as labelled placeholders until Phase 0
assets land. Placeholders are acceptable in development; they are a release blocker in
production." None of these are real files; nothing here is a licensed/stock asset in use today.

| Section | Slot | Required classification (`18` §5) | Component |
| --- | --- | --- | --- |
| Hero | South Bay residential exterior, dark overlay | `[ATMOS]` permitted | `src/components/Hero.astro` |
| Service cards — Complex property clearing | Process kit, flat-lay | `[OWNED]` only | `src/components/ServiceCards.astro` |
| Service cards — Reset & restoration cleaning | Clean kitchen or bath detail | `[ATMOS]` permitted | `src/components/ServiceCards.astro` |
| Service cards — Animal & organic condition cleaning | Completed job photo | `[OWNED]` only — implies work performed; slot stays empty rather than substitute atmosphere stock (`18` §5) | `src/components/ServiceCards.astro` |
| Five-stage standard | Hands + clipboard at a threshold | `[OWNED]` only | `src/components/HandoffStandard.astro` |
| Founder / operator | Founder portrait | `[OWNED]` only | `src/components/OperatorAccountability.astro` (placeholder pre-dates this pass, Session B) |

Before any of these ship a real file: confirm the classification above, source per `18` §5.1/§5.2,
and move the row into the main table with source/licence/alt text/crop/proof-status filled in.

## Rules

- Do not add stock cleaning crews, generated people, fake properties, or synthetic before-and-after proof.
- Record the source, permission, purpose, alt text, crops, and proof status before an asset is used.
- Sample operating documents must be visibly labeled `SAMPLE` and must not imply completed client work.
- Every image slot is logged here — including placeholders — per `docs/18-VISUAL-DIRECTION.md` §5:
  "Every image is logged in `06-ASSET-MANIFEST.md`... No exceptions."
