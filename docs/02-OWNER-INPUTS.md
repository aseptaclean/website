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
- Flagship offer: `Aseptaclean Handoff Reset`
- Category: whole-property clearing, deep cleaning, and documented closeout
- Lead offer: `24-Hour Property Handoff Plan`
- Response commitment: `within one business day`
- Paid on-site assessment: `$195`, credited toward an approved project booked within 7 days
- Public starting position: full projects generally begin at `$1,500`
- Primary CTA: `Get My 24-Hour Handoff Plan`
- TSWMP public status: pending/unverified; do not publish active status
- Launch proof state: no assumed reviews, case studies, completed projects, or authentic before/after portfolio
- Approved brand assets: owner-supplied Aseptaclean horizontal wordmarks and 512px site icon, received 2026-07-30

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
