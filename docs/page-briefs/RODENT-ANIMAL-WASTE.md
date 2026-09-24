# Rodent & Animal Waste — approved public page

Current owner decision: 2026-09-18 approved HTML kit implementation. Canonical route confirmed:
`/rodent-dropping-cleanup-san-jose/`. Source: `src/pages/rodent-dropping-cleanup-san-jose/index.astro`.

This scoped instruction supersedes the former source-copy placement, public rodent section matrix,
shared hero sizing, and default CTA labels on this route only. The campaign at
`/rodent-dropping-cleanup-san-jose/assessment/` is unchanged.

## Approved sources

- [Kit instructions](../START-HERE%20copy.md), read in full.
- [Visual reference](../aseptaclean-rodent-approved.html).
- [Exact fragment](../rodent-approved-fragment.html).
- [Original stylesheet](../aseptaclean-rodent-approved.css).
- [Implementation and verification record](../aseptaclean-rodent-approved/IMPLEMENTATION-PROGRESS.md).

Keep shared public header, actual logo, six-service dropdown and footer. Within `#ac-rodent`, render
hero → three-item trust strip → six coverage items → attics/crawl spaces → belongings → navy
assessment band → four process steps → before-work scope → six FAQs → service area → assessment
strip → production contact form. No new Services hub or campaign navigation entries.

Belongings steps are a full-width sibling row below the text/image split, stacking at 620px.
Before-work image stays landscape 3:2 with no minimum height; its two scope columns are below the
split. FAQ heading is centered above a single maximum-800px accordion; first answer open.
Use content-driven heights, exact approved copy, and existing locally served Inter typography roles.

Page CTAs: `Request an Assessment` → `#rodent-form`; `Call (408) 785-7588` → central site phone URI.
The exact supplied illustrations are authorized for this page by this owner request; describe them
as illustrative, never completed jobs. No new image generation is authorized. Approved page-local
coverage follows the fragment; other pages' shared coverage data is unchanged.

The production `PpcHeroForm` preserves endpoint, fields, service enum, attribution, uploads, consent,
spam protection, validation and `/thank-you/` behavior. It replaces the entire demo form, including
its unsupported area selector and fake submission handler. Keep the existing assessment-fee
microcopy. Required claims-law §2.3 and §3.1 disclosures remain below the before-work scope columns.

Install CSS only at `src/styles/aseptaclean-rodent.css`, imported by this route. Preserve original
cascade and final layout/contrast overrides; map heading sizing to `.ac-type-rodent-*` roles.
Do not change shared components or deploy as part of this task.
