# Current website documentation — start here

Effective 2026-09-04. This file replaces the previous website-documentation authority index.

## Scoped sources of truth

| Concern | Current source | Boundary |
| --- | --- | --- |
| Current task, page scope, CTA change | Owner instructions summarized in START-HERE.md | Later explicit owner instructions supersede this snapshot within their scope. |
| Design, layout, responsive behavior | 30-WEBSITE-MASTER-SPEC.md | Single design authority. Reference CSS implements it. |
| Visual measurement and CSS audit baseline | reference/aseptaclean-css-profile.md, profile **AC-CP70-91130-1.1**, with reference/aseptaclean-css-targets.json and styles/website-reference.css | Measurement and composition only. Copy, facts, routes, forms and policy requirements retain their current scoped authorities; the profile does not authorize new claims, changed services, rewritten policies or deployment. §7 above-the-fold fit is a release criterion, verified against a real build. |
| Main marketing copy | aseptaclean-all-website-copy.md | Preserved original text, with explicit display transformations in 20-COPY-MAP.md. |
| Trauma-specific copy | aseptaclean-crime-scene-trauma-cleanup.md | Supplements the main source for trauma and its routing summaries only. |
| Page composition and source placement | page-briefs/ and 20-COPY-MAP.md | These implement the master; no independent design system or alternate copy source. |
| Campaign (paid-traffic) landing pages | page-briefs/PPC-HOARDING-SAN-JOSE.md, with the route inventory in SITEMAP-MASTER.md § "Campaign routes" | Each campaign brief governs its own route only. It carries its own copy — never the SEO page's — and its scoped PPC exceptions (compact header/footer, no navigation, `noindex, follow`, out of `sitemap.xml`) are deliberate. It cannot change any other route's copy, indexation or navigation. |
| Page names and route intent | SITEMAP-MASTER.md | Actual URL existence must be checked in the real repository. |
| Company facts and factual restrictions | 02-CURRENT-FACTS.md | Copy does not establish a missing fact or remove an existing factual restriction. |
| Forms, legal and integration preservation | 03-INTEGRATION-CONTRACT.md | Preserve real provider text, consent behavior, endpoints, and data mappings. |
| Image requirements | 06-ASSET-MANIFEST.md | Current policy and inventory requirements; no fabricated proof. |
| Release verification | 04-RELEASE-CHECKLIST.md | Evidence from the new build, never old logs. |
| Change history | 05-CURRENT-DECISIONS.md | Brief current record only; accepted changes must also update the controlling file. |

The root AGENTS.md remains the repository instruction entry point. On installation, reconcile only its superseded website design/copy/CTA references with this current owner-directed package. Unrelated rules and actual factual, access, consent, and provider protections remain applicable.

## Conflict resolution

Do not assign every concern to a single gigantic hierarchy. For layout, read the design spec. For wording, read the copy and placement map. For contact values, read verified application data. For policies, use the real provider-controlled documents. A layout instruction cannot create an insurance fact; a historical copy file cannot reinstate Sevenson as the design benchmark.

The following are retired design/copy authorities: old BUILD-EXACT v2/v3, the 45/30/25 design system, prior Sevenson briefs, old doc 27, the long decisions log, and old homepage briefs. Their originals are preserved under archive/2026-09-04-before-consolidation/. Do not read that tree during ordinary implementation or include it in active instruction globs. Use it only to recover specifically needed historical evidence.

The two active source-copy files deliberately retain their original CTA wording and historical service labels. Apply the display override table; do not treat those retained source strings as contradictory current UI instructions.

## Missing real-repository information

This package cannot verify current routes, root instructions, assets, policy provider IDs, form endpoints, phone-provider setup, or production build state. Resolve these from the actual repository without inventing substitutes. Isolate a missing fact to its affected component; continue independent authorized work.
