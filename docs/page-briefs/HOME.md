# Page Brief — Homepage (`/`)

**Status:** Strategy approved 2026-08-25. Final copy and implementation are not authorized by
this brief. Current route, indexation, sitemap membership, and deployed presentation remain
unchanged until a separate implementation task.

> **Reconciled 2026-08-26 against the installed `docs/30-WEBSITE-MASTER-SPEC.md`.** Two pointers
> in this brief were left aimed at the previous master and are corrected here rather than in
> place, because the owner-approved strategy below still stands.
>
> 1. **§8's "Clinical Field Editorial" no longer exists in doc 30.** That was the previous
>    master's named direction. The current visual authority is doc 30 §6 (Sevenson primary,
>    Interdoor secondary, §6.3 Aseptaclean identity), §7 anti-AI doctrine, and §8 design tokens.
>    Everything else §8 asks for — approved tokens, Inter-only typography, evidence-led
>    composition, minimal repeated cards, no imported mockup as authority — is unchanged.
> 2. **§7 is a content checklist, not the rendered section order.** Doc 30 §17 (rank 5) governs
>    homepage architecture and targets five sections: Hero · What We Handle · The Property
>    Condition Changes the Work · Operating Evidence · Final CTA. This brief is rank 6. The
>    twelve items in §7 are the narrative obligations the homepage must satisfy; several are met
>    inside those five sections or on `/faq/`, `/services/`, and the service pages rather than as
>    twelve standalone homepage blocks. Doc 30 §17 "Excluded standalone homepage sections" is
>    explicit about which ones do not get their own block. Where the two disagree, doc 30 wins.

## 1. Page purpose

Help an adult child or family decision-maker recognize that Aseptaclean may fit a difficult
family property, understand how control and privacy are protected, and begin a low-pressure
property conversation without first choosing a technical service category.

## 2. Primary visitor

The primary homepage customer is the adult child or family decision-maker managing an aging
parent's or relative's difficult property. Property owners, executors, trustees, fiduciaries,
realtors, and other referral partners remain legitimate secondary audiences, but must not
dilute the homepage's primary recognition path.

## 3. Search and customer intent

- Branded and direct-navigation intent.
- Early-stage recognition: the property has become too much for the family to handle.
- Visitors may not know whether they need detailed cleaning, property clearing, estate
  cleanout, hoarding cleanup, or another approved service category.

## 4. Customer condition and objections

Assume stress, privacy concerns, divided family authority, uncertainty about belongings, fear
of judgment, and uncertainty about scope or cost. Address whether the family stays in control,
how important belongings and changes are handled, whether pressure is applied, and whether
Aseptaclean is the right fit.

## 5. Approved facts and copy boundaries

- Visible primary CTA: **Tell Us About the Property**.
- Secondary CTA: **Call Aseptaclean**.
- Destination: `/request-assessment/` remains technically stable.
- Approved H1 direction: **When a family property has become too much to handle.** This is a
  candidate, not final locked copy. Finalize through copy review before implementation.
- Strategic customer-facing category: **Complex Property Cleanup**. Existing route URLs and
  established service terms remain intact.
- Public process: **Scope → Protect → Clear → Reset → Verify**.
- Evidence label: **Project Notes**. Do not imply a completed case study where none exists.
- Use only current verified service-area wording and facts approved under the authority chain.
- Do not publish a general starting investment. The separately approved $195 on-site
  assessment fee may appear only where context and current verification permit it.
- Suppress insurance and Organic Pathogen Endorsement wording until verified against the
  current Certificate of Insurance.

## 6. Evidence available

Use only real, permissioned evidence: verified business facts, founder accountability,
approved process controls, and authentic project artifacts if and when they exist. No
fabricated reviews, counts, badges, case studies, client logos, people, properties, documents,
before/after assets, or AI-generated proof imagery. An empty proof slot remains empty.

## 7. Required narrative sequence

1. Recognition of the family property situation.
2. Reassurance that the visitor does not need to know the service name.
3. Why an ordinary cleaning or hauling engagement may not fit.
4. The five-stage process.
5. What remains under client control: scope, belongings, changes, and finish expectations.
6. Routing to approved service and situation pages.
7. Project Notes/evidence, only to the extent real material exists.
8. Founder accountability.
9. Cost and scope drivers without a public starting-price anchor.
10. Fit / not-fit boundaries.
11. Visible FAQ content where useful, without adding `FAQPage` schema solely for a rich result.
12. Final primary CTA.

## 8. Composition and design system

Follow `docs/30-WEBSITE-MASTER-SPEC.md`: Clinical Field Editorial, calm procedural hierarchy,
real-field restraint, approved tokens, Inter-only typography, evidence-led composition, and
minimal repeated cards. Do not redesign from generic patterns, import a reference mockup as
authority, introduce a new palette/typeface/radius system, or revive WordPress/Elementor plans.

## 9. Prohibited patterns

No fake proof, stat bar, theatrical hazmat imagery, luxury-for-luxury styling, maid-service
cues, SaaS dashboard language, “gross filth,” regulated-service overclaims, generalized price
anchor, Handoff Reset as a global flagship promise, Google Map, or forced service-selection
step before the visitor can explain the situation.

## 10. Responsive and wrapping requirements

Preserve the master token system and typography laws. Test every section at the governed
viewport set. Avoid heading widows, short final lines, orphaned prepositions, horizontal
overflow, clipped controls, and CTA labels that collapse ambiguously. Responsive changes must
preserve narrative order and the primary/secondary CTA hierarchy.

## 11. SEO and indexation

The homepage remains indexable and in `sitemap.xml`. Keep its canonical stable. Do not change
routes or indexation in this work. Homepage metadata must serve the primary family-decision
intent without inventing local availability, proof, credentials, or regulated capabilities.

## 12. Claims and compliance

`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` governs every visible and machine-readable string,
including metadata, alt text, schema, form text, and evidence captions. Keep cleaning,
clearing, disposal-provider, pest-control, contractor, and TSWMP boundaries explicit.

## 13. CTA hierarchy

- Primary: **Tell Us About the Property** → `/request-assessment/`.
- Secondary: **Call Aseptaclean** → verified phone link.
- Contextual service navigation is tertiary and must not compete visually with the primary.

## 14. Edge states

- If no Project Notes asset is approved, omit the proof asset rather than substituting stock.
- If insurance verification is unresolved, suppress insurance/endorsement claims.
- If a linked service or city route is gated, preserve its approved publication state; do not
  bulk-index or silently expose draft claims.
- Never render a placeholder, inactive contact path, empty phone link, or false success state.

## 15. QA and approval gates

Before implementation: final copy review, claims check, owner confirmation of H1/supporting
copy, evidence inventory, and page-level composition review. After a separately authorized
implementation: standard build, route, accessibility, responsive, typography, claims, metadata,
internal-link, and production endpoint verification.

## 16. Open decisions

- Final locked H1 and supporting hero copy.
- Exact approved Project Notes material, if any.
- Exact homepage cost/scope wording.
- Whether current verified COI supports public insurance and endorsement statements.
- Final section-level copy and evidence assignments.
