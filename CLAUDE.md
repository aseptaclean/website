# CLAUDE.md — Aseptaclean repository, Claude-specific entry point

This file exists for tools and agents that read `CLAUDE.md` specifically rather than `AGENTS.md`.
It is a pointer, not a second rule set: **`AGENTS.md` is the operative precedence chain and
governs every decision in this repository.** Read it in full before making any change. Nothing
below overrides it; where the two ever appear to disagree, `AGENTS.md` wins and the disagreement
should be corrected here, not acted on from this file.

## Start here

1. `AGENTS.md` — precedence chain, the three (now four) absolute rules in §0, current owner
   decisions in §2.2, route architecture, business facts, pricing, typography law, and standing
   prohibitions.
2. `START-HERE.md` → `docs/README.md` — the index for website design, copy, placement, facts,
   integrations, assets, and release verification.
3. `docs/30-WEBSITE-MASTER-SPEC.md` — the governing website design/layout document.
4. `docs/ASEPTACLEAN-DESIGN-SPEC.md` (byte-identical to `docs/Aseptaclean_Website_Design_Blueprint.md`,
   the file the owner attached and then expanded in place, 2026-09-18) — the current owner design
   specification. It is a MUST/MUST-NOT contract, not a suggestion: exact section IDs and order for
   the homepage and all six service pages, an exact CSS class contract (§8), exact hero/type/spacing
   pixel values (§2.1), navigation/redirect rules (§9), a content-transfer procedure (§10), and a
   browser acceptance contract with a read-only DOM measurement helper (§12.4). Read it in full
   before touching the homepage, any of the six service pages, About, Contact, or either reviewed
   campaign landing page (rodent, estate). Its own §14 is a pasteable implementation instruction —
   read that section specifically before starting a new implementation pass from this spec.
5. `docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md`, `docs/ASEPTACLEAN-COPY-MAP.md`, and
   `docs/ASEPTACLEAN-DESIGN-QA.md` — the three tracking records the spec's §1 requires. The QA
   record states plainly which routes/sections currently satisfy the spec's exact contract and
   which still use the repository's existing equivalent component/class system (permitted by the
   spec's own §8/§7 "document an exact mapping" allowance) — read it before assuming a page is
   fully compliant.

## The standing rule for every copy update

Installed 2026-09-18 from `docs/ASEPTACLEAN-DESIGN-SPEC.md` §11, AGENTS.md §0.4 carries the exact
text verbatim — read it there rather than a paraphrase here, since the spec is explicit that its
own wording is what must be installed.

In practice: after any copy or content change, identify every route and shared-component consumer
it touches, apply the change, then check the affected sections (and, for hero changes, all nine
shared-hero pages plus the two reviewed campaigns) at approximately 1440px, 1024px, 820px and
390px, plus a 320px overflow check and 200% zoom. Fix what breaks before reporting the task done.
If there is no way to run the project or render a preview in the current environment, say so
explicitly instead of claiming the layout was checked.

## Three things that have caused production damage (see AGENTS.md §0 for the full text)

- `functions/api/lead.ts` is the only lead endpoint. Do not create a second one; do not install
  `@astrojs/cloudflare`.
- `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` governs every public-facing word, including titles, meta
  descriptions, alt text, JSON-LD, and form copy.
- Never invent a review, credential, statistic, or before/after image. An empty proof slot ships
  empty.

## Reviewing your own work

Run `npm run check` and `npm run build:local` before calling a change complete. Use the
`claims-check`, `type-law`, `route-audit`, and `doc-precedence` skills (or their equivalent manual
checks) when a change touches copy, typography, routes/redirects, or conflicting instructions,
respectively.
