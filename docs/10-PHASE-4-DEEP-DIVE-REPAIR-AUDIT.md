# Phase 4 Deep-Dive Audit and Repair Authority

## Scope of this audit

This is a documentation-and-architecture deep dive based on the active Aseptaclean master brief, quality guardrails, build plan, approved homepage copy, visual-system files, lead-system plan, and the approved Private Residence Reset strategy.

The current Phase 4 source repository and rendered pages were not supplied with this update. Therefore:

- this file identifies documented conflicts, architecture risks, and required repair work
- Codex must inspect the real repository and produce code-level evidence
- no agent may state that the website is fixed until the source, screenshots, and integrations pass the release gate

## Executive diagnosis

The strategic foundation is stronger than the visible implementation. The main risk is not a missing animation or one small font size. It is authority drift: multiple documents describe different phases, type scales, inspiration weightings, route rules, and visual expectations. An AI coding agent can follow each document locally and still produce a generic, inconsistent site.

Phase 4 must consolidate authority and repair the system globally before adding more isolated components.

## Critical findings

### 1. Phase definition conflict

Observed:

- one master labels Phase 4 as QA
- the starter build plan labels Phase 4 as legal/operational routes and Phase 6 as premium QA
- the owner states the project is currently in Phase 4

Risk:

- Codex may skip premium remediation because it believes visual work belongs to a later phase
- it may build legal pages while preserving a weak homepage

Resolution:

- Phase 4 is now the full deep-audit, corrective, adjacent-page, and release-hardening phase
- prior work is preserved only when it passes

### 2. Expansion-rule conflict

Observed:

- the one-page brief prohibited expansion until jobs arrived
- the owner approved the attached Private Residence Reset campaign strategy

Resolution:

- add one controlled exception: `/private-residence-reset/`
- Handoff Reset remains the flagship
- no broader services menu
- quarterly care remains private backend

### 3. Typography authority conflict

Observed:

- the integrated master suggested H1 around 32–48px and H2 around 24–30px
- the larger design specification allowed H1 up to 76px and H2 up to 48px
- other files declared Montserrat/Open Sans locked
- the visible result was judged insufficiently premium

Risk:

- timid hierarchy at some widths
- oversized or inconsistent hierarchy at others
- generic corporate-service character
- agents arguing that the font choice is correct merely because it is documented

Resolution:

- supersede the prior implementation with Newsreader Variable + Instrument Sans Variable
- use one exact token system
- manually review wraps across all required widths
- self-host and performance-test the fonts

**Amended 2026-08-11.** The shipping stack is **Newsreader Variable + Inter Variable + IBM
Plex Mono**, not Instrument Sans Variable — the FINAL-v2 port swapped the sans face and the
build is measured and working. All three are self-hosted via `@fontsource`/`@fontsource-variable`
and preloaded in `src/layouts/BaseLayout.astro:57-77`. Instrument Sans is retired: removed from
`docs/06-ASSET-MANIFEST.md`, no longer referenced by any font-loading code. See `AGENTS.md` §6
and `docs/05-DECISIONS-LOG.md` for the resolution. Do not revert to Instrument Sans — that would
re-open font loading, LCP, and every H1:body ratio measurement on a near-done site for no
user-visible benefit.

### 4. Visual-direction conflict

Observed:

- different files assigned contradictory percentage weightings to BluSky and Steri-Clean
- many instructions were prohibitions rather than a positive Aseptaclean composition

Resolution:

- remove percentage formulas
- use the positive thesis: private property-transition firm with field-operating discipline
- use the eight-movement homepage and Residence Baseline campaign composition
- require original operational artifacts and mobile art direction

### 5. Legal-route conflict with Termly

Observed:

- the build plan instructed Codex to write `/privacy/` and `/terms/`
- the owner uses Termly for privacy, terms, cookie policy, consent, and preferences

Risk:

- duplicated or stale legal content
- consent behavior that does not match policy generation

Resolution:

- Termly controls policy content
- local routes may embed or link Termly-controlled content
- add `/cookie-policy/`
- add Cookie Preferences
- gate optional analytics through consent
- do not draft substitute legal text

### 6. Lead architecture is not complete until tested

The desired architecture is valid:

- shared Astro assessment
- `/api/lead`
- Turnstile
- private uploads
- HubSpot contact and deal
- Resend customer email
- Twilio owner SMS
- fallback email

But it is not production-ready until real credentials and five consecutive staging tests pass.

## High-priority findings

### 7. Homepage information density

The approved emotional copy is strong, but the current architecture can turn it into a long sequence of similarly weighted sections.

Repair:

- consolidate into eight movements
- one focal point per section
- create deliberate visual pauses
- combine scope, assurance, price, and founder where useful
- preserve exact claims while improving pacing

**Amended 2026-08-11.** The eight-movement target above was superseded during build. The
homepage that actually ships (`src/pages/index.astro`) renders **fourteen top-level sections**:
Hero, CredentialBar, ServiceCards, ConfidenceAndFit, WhyAseptaclean, AccentBand,
HandoffStandard, HandoffRecord, Pricing, AreasWeServe, OperatorAccountability, FAQ,
RequestForm, FinalCTA. Three binding section maps had coexisted in this doc set (this item,
`docs/11-COMPOSITION-AND-TYPE.md` §5's eight-movement-plus-two-bands table, and the code) and
none matched the code or each other. The code is truth here — see `docs/11-COMPOSITION-AND-TYPE.md`
§5 for the corrected map and `docs/05-DECISIONS-LOG.md` for the resolution.

### 8. Handoff Record needs to function as evidence

It must not be a white card with fake lines.

Required:

- room-level status
- keep/remove/review logic
- authorized changes
- exception handling
- completion photographs/index
- sample labeling
- real document hierarchy

### 9. Private Residence Reset needs a distinct page signature

It cannot reuse the Handoff page layout or become a card-grid cleaning page.

Required signature:

- Residence Baseline Record
- room-by-room priorities
- finish and access notes
- controlled architectural detail imagery
- calm residential rhythm

### 10. Shared form needs offer variants

Do not duplicate the whole endpoint.

Required:

- one form engine
- schema/config per offer
- one endpoint
- explicit `offer_type`
- separate CRM mapping, confirmation copy, and SMS summary

### 11. SEO needs intent separation

Homepage:

- property handoff, cleanout + deep cleaning, San Jose/South Bay

Campaign page:

- whole-home deep reset, move-in/seasonal/pre-event/second-home cleaning

Avoid cannibalization through unique titles, H1s, copy, and canonical URLs.

## Medium-priority findings

### 12. Internal-link balance

The campaign page should remain outside primary navigation but must be discoverable.

Use one low-emphasis crawlable link. Do not hide it with CSS or rely only on JavaScript.

### 13. Imagery policy

A no-image site may feel thin; generic cleaning imagery destroys credibility.

Use:

- original founder/threshold/document photographs
- original local exteriors
- licensed architectural detail imagery as atmosphere
- asset manifest and accurate alt text

Never imply licensed stock is client work.

### 14. Performance budgets

Target current good Core Web Vitals thresholds:

- LCP <= 2.5 seconds
- INP <= 200 milliseconds
- CLS <= 0.1

Recommended build budgets:

- minimal client JavaScript
- page CSS kept lean
- self-hosted font transfer minimized
- explicit image dimensions
- responsive AVIF/WebP
- no blocking analytics before consent

### 15. Accessibility as premium execution

Required:

- semantic landmarks and heading order
- visible focus
- field-level and summary errors
- 320px reflow
- 200% zoom
- large primary controls
- no sticky-element obstruction
- text spacing resilience
- reduced motion

## Phase 4 acceptance conclusion

The build is ready only when:

- the homepage visibly meets the new typography and composition standard
- the Handoff Record is credible
- the assessment and lead system are verified end to end
- Termly controls legal and consent behavior
- the Private Residence Reset page is live without diluting the flagship
- SEO intent is separated
- mobile is independently designed
- the evidence package earns at least 90/100 with no release blockers
