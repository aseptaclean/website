# Owner Inputs and Production Fact Gate

This file separates approved business facts from unresolved production values. Code must read mutable public values from centralized configuration/environment variables.

## Approved for the current build

- Public brand: `Aseptaclean`
- Legal entity: `Aseptaclean, LLC`
- Founder: `Matthew Ruiz`
- Founder title: `Founder & Principal Operator`
- Website: `https://aseptaclean.com`
- Public email: `info@aseptaclean.com` — final inbox test still required
- Primary geography: `San Jose and the South Bay`
- Supported city framing: San Jose, Mountain View, Sunnyvale, Santa Clara, Campbell, and surrounding South Bay communities
- County, for the `docs/18-VISUAL-DIRECTION.md` §7 credential bar: `Santa Clara County`
- Flagship offer: `Aseptaclean Handoff Reset`
- Category: whole-property clearing, deep cleaning, and documented closeout
- Lead offer: `24-Hour Property Handoff Plan`
- Response commitment: `within one business day`
- Paid on-site assessment: `$195`, credited toward an approved project booked within 7 days
- Public starting position: full projects generally begin at `$1,500`
- Primary CTA: `Get My 24-Hour Handoff Plan`
- TSWMP public status: pending/unverified; do not publish active status
- Organic pathogen endorsement: owner-confirmed 2026-08-07 — Aseptaclean may publicly state that
  heavy organic conditions and animal-waste cleaning are covered under its own organic pathogen
  endorsement. This is a distinct, narrower claim than TSWMP (human trauma-scene/biohazard) above
  and does not change TSWMP's pending status. Publish only in the constrained form already used in
  `src/data/site.ts` (`homepage.scopeOfWork`, `homepage.includedScope`): cleaning language only —
  never "disease," "decontamination," "sanitization," or "sterilization." Verify against the actual
  COI/policy documents before public launch (see "Must be confirmed" below).
- Environmental remediation: not currently offered and, per `docs/18-VISUAL-DIRECTION.md` §7,
  **does not appear on the live site at all** — not as an offered service, not as a "coming soon"
  item — until the credential is actually held. `site.offer.remediationLaunchLabel` and the
  "coming soon" remediation card that previously used it were removed for this reason
  (`docs/05-DECISIONS-LOG.md`).
- Launch proof state: no assumed reviews, case studies, completed projects, or authentic before/after portfolio
- Approved brand assets: owner-supplied Aseptaclean horizontal wordmarks and 512px site icon, received 2026-07-30
- Founder portrait: not yet supplied. The homepage shows a plain bordered placeholder, not a stock
  or AI-generated image, until a real photograph is provided.

## Founder facts approved for careful framing

- Bachelor of Science in Biochemistry, University of California, Riverside
- Prior pharmaceutical manufacturing experience
- Prior histology and surgical pathology experience
- Experience in procedure-driven, documentation-sensitive environments
- Direct founder involvement in scope review, project planning, communication, and operating oversight

Do not imply that this background grants contractor, remediation, medical, environmental, biohazard, or regulatory authority.

## Must be confirmed before production release

- `PUBLIC_PHONE`
- `PUBLIC_SMS_NUMBER`
- exact active insurance wording matched to the current COI and covered scope
- the organic pathogen endorsement claim above, matched to the current COI and covered scope
- any business-license wording or number displayed publicly
- business hours
- production form endpoint
- CRM submission mapping
- SMS/email lead notification path
- Google Business Profile URL
- active social URLs; omit inactive accounts
- analytics IDs and consent configuration
- privacy contact
- any public mailing address

## Suppression rules

- If insurance wording is unverified, suppress the insurance trust statement.
- If a social account is inactive, omit it.
- Never show an empty phone link.
- Never show a fake form success state against a nonworking endpoint.
- Never expose placeholders in a production build.
- Never infer a physical office from service-area coverage.
