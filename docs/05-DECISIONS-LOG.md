# Owner-Approved Decisions Log

Record only decisions explicitly approved by the owner. Do not use this file for temporary agent notes.

| Date | Decision | Reason | Files affected |
| --- | --- | --- | --- |
| 2026-07-29 | Current launch is Astro one-page first; multi-page expansion waits until real jobs begin coming in. | Prove the flagship offer and lead flow before expanding architecture. | Entire project |
| 2026-07-29 | `docs/00-MASTER-BRIEF.md` controls conflicting offer terms. | Owner decision. | Offer, copy, pricing, CTA, form |
| 2026-07-29 | Equal page goals: explain the offer clearly and generate qualified leads. | Owner decision. | Homepage and assessment funnel |
| 2026-07-29 | Public phone and SMS number is `(408) 785-7588`. | Owner-confirmed business fact. | Config, CTA links, form alerts, schema |
| 2026-07-29 | Business hours are Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday. | Owner-confirmed operating hours. | Header/footer, form messaging, callback standard |
| 2026-07-29 | Form route is `/api/lead`; after submission the customer receives a confirmation email and the owner receives an immediate SMS alert. | Required lead-delivery workflow. | Form endpoint, server integration, release QA |
| 2026-07-29 | Owner calls successful form submissions within 5 minutes during published business hours. Outside hours, contact occurs in the next business window. | Prevent false 24/7 promise while protecting speed-to-lead. | Form success copy, email copy, operations |
| 2026-07-29 | Google Business Profile URL, analytics IDs, and public mailing address are deferred. Logo asset may be supplied later; use a restrained text wordmark during development. | Not required to begin the build. | Owner inputs, build gates, visual QA |
| 2026-07-30 | Homepage copy must make the client feel the transition from an unresolved property to a property they can open, enter, and move forward with. Operational proof must support the emotion. | Owner explicitly approved the emotional-outcome direction and requested the website copy be updated. | Master brief Section 6.5 and Section 8; approved copy extract; homepage composition |
| 2026-07-30 | Use the owner-supplied Aseptaclean horizontal wordmarks and 512px site icon as the production brand assets. | Replaces the temporary development wordmark with authentic owner-provided artwork. | Header, footer, metadata, owner inputs, asset manifest |

## Phase 4 Session 1 — §0 canonical document resolution (2026-07-30)

`docs/07-ONE-PAGE-DIRECTIVE.md` §0 left three placeholders unresolved. Session 1's audit
(`docs/PHASE-4-AUDIT.md`) resolves them with certainty, confirmed by the precedence chain already
written into the repo's root `AGENTS.md` (which names full filenames, not the `…` placeholders in
`docs/AGENTS-PRECEDENCE-BLOCK.md`) and by each file's own content matching its assigned role:

- `{CANONICAL}` = `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` — the Phase 4 canonical master specification.
- `{RESIDENCE}` = `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — Private Residence Reset strategy/build spec, Phase 2 only.
- `{OLD-VISUAL}` = `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` — the older premium visual/typography document, superseded by `docs/11-COMPOSITION-AND-TYPE.md`.

No application code was changed to reach this resolution; it is a read-only confirmation. Full
reasoning and evidence are in `docs/PHASE-4-AUDIT.md` §0.

## Insurance publication decision
- Owner confirmed the UPCM policy is active.
- Approved public wording: `Insured. Certificate of Insurance available upon request.`
- Carrier, policy limits, and detailed coverage descriptions remain unpublished unless a current COI/declarations page is reviewed and explicitly approved.
