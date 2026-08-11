# Private Residence Reset — Phase 4 Build Specification

This implementation spec applies the approved strategy for the Private Residence Reset offer. (`docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md` does not exist and never has — see `AGENTS.md` §1, "files that do not exist." No separate strategy document exists; this file is the sole authority for the route.)

## 1. Strategic role

- Handoff Reset remains the public flagship.
- Private Residence Reset is a controlled campaign page.
- Quarterly Residence Reset Care is private retention after an initial baseline.
- Do not create a generic residential-cleaning menu.
- Do not place this offer as an equal card on the homepage.
- Keep the page outside the primary navigation during the three-residence pilot.

## 2. Route and indexing

- URL: `/private-residence-reset/`
- indexable
- self-referencing canonical
- included in sitemap when enabled
- one low-emphasis crawlable internal link, preferably in a footer utility group or a contextually relevant line
- no sitewide high-emphasis navigation link during the pilot

## 3. SEO

Suggested title:

`Private Residence Reset in San Jose & South Bay | Aseptaclean`

Suggested meta description:

`A structured whole-home deep reset with a written room-by-room scope, controlled changes, and final completion review. Serving San Jose and the South Bay.`

Primary search intent:

- whole-home deep cleaning
- move-in deep cleaning
- detailed house cleaning
- seasonal deep cleaning
- pre-event home cleaning
- second-home reopening cleaning
- San Jose / South Bay local service intent

Use natural language. Do not keyword-stuff or publicly lead with “luxury cleaning.”

Recommended schema:

- `WebPage`
- `Service`
- `BreadcrumbList`
- global `Organization` / `LocalBusiness` only once through the shared schema system
- no rating or review markup

## 4. Hero

Eyebrow:

`PRIVATE RESIDENCE RESET`

H1:

`Bring the entire residence back to a defined standard.`

Lead:

`A structured, detail-intensive whole-home reset for homeowners who need more than routine maintenance cleaning—and want the property, priorities, sequencing, and completion handled under one written scope.`

Primary CTA:

`Request a Private Residence Assessment`

Microcopy:

`Send property details and photographs. Aseptaclean will review the home, desired outcome, priority areas, and whether an on-site walkthrough is required.`

Starting context:

**Removed per the 2026-08-11 pricing decision (`AGENTS.md` §4) — no price figure is published
anywhere on the site.** Route to cost drivers and the $195 assessment fee instead, same
mechanism as the homepage pricing section. Already reflected in the live route
(`src/pages/private-residence-reset.astro` carries no `$2,000` string).

## 5. Emotional outcome section

Heading:

`Walk back into a residence that feels settled again.`

Copy direction:

- the deeper details no longer accumulate in the background
- priority rooms feel finished rather than merely surface-clean
- the client does not have to manage an open-ended task list
- important finishes, restricted areas, access, and pet instructions are already documented
- completion is reviewed room by room

Avoid vague “peace of mind” claims. Make the finished baseline concrete.

## 6. Required page movements

1. hero
2. restrained trust strip
3. `This is not routine housekeeping`
4. emotional outcome / restored baseline
5. Aseptaclean Residence Baseline: Assess, Define, Reset, Verify, Maintain
6. Residence Baseline document artifact
7. included, approved detail areas, and separately scoped work
8. assurance, change control, privacy, and property instructions
9. starting investment and fit
10. Quarterly Residence Reset Care invitation
11. assessment CTA

## 7. Visual signature

Create a `SAMPLE Residence Baseline Record` showing:

- property/room list
- priority level
- included surfaces
- finish/surface notes
- restricted areas
- pet/access notes
- included appliance/cabinet interiors
- exceptions
- completion review status

It must feel like a real operating document, not a decorative dashboard.

## 8. Scope

Use the approved source strategy. Never say “everything included.”

Separately scoped or excluded work must remain clear, including:

- organizing
- laundry
- extensive dishes
- upholstery/carpet extraction
- exterior windows
- heavy contents movement
- animal-waste/severe contamination
- post-construction residue
- hauling/disposal
- hazardous or regulated work
- work outside current lawful or insured scope

## 9. Quarterly care

Present as:

`Select residences may qualify for Quarterly Residence Reset Care after the initial baseline is established.`

Do not:

- publish a generic recurring calendar
- invite weekly maid-service inquiries
- show fixed quarterly package pricing
- use heavy annual discounts
- imply all homes qualify

The value is continuity, baseline records, reserved windows, and reduced client management.

## 10. Assessment integration

Campaign CTA:

`/request-assessment/?offer=private-residence-reset`

The shared form engine must switch to the residence variant and set:

- `offer_type=private_residence_reset`
- `entry_route=/private-residence-reset/`
- residence-specific subject line
- residence-specific HubSpot deal name
- residence-specific confirmation email
- residence-specific owner SMS summary

Residence fields:

- full name
- email
- phone
- preferred contact
- service address, city, ZIP
- approximate square footage
- number of levels
- occupied or temporarily vacant
- desired completion date
- current situation
- priority rooms/areas
- appliance/cabinet/window/closet/high-dusting priorities
- important surfaces or finishes
- pets
- parking/access
- whether someone will be present
- authority to approve
- desired investment range
- photographs/video
- additional context
- consent acknowledgment

Do not show hazardous-condition questions as if those services are available. Use a concise safety-routing question where needed.

## 11. CRM and analytics

HubSpot deal property:

- `offer_type`
- value: `Private Residence Reset`

Suggested deal name:

`Private Residence Reset — {contact name} — {city}`

Suggested events:

- `private_residence_page_view`
- `private_residence_assessment_click`
- `assessment_start` with offer parameter
- `assessment_submit` with offer parameter
- `qualified_lead` with offer parameter
- `quote_issued`
- `deposit_collected`
- `quarterly_care_offered`
- `quarterly_care_accepted`

Consent-gate optional analytics through Termly.

## 12. Release criteria

- Handoff Reset remains the obvious flagship on the homepage
- page cannot be mistaken for a maid-service package page
- no price figure renders anywhere on the page — cost drivers and the $195 assessment fee only, per `AGENTS.md` §4
- form variant reaches HubSpot correctly
- customer receives the correct email
- owner SMS clearly identifies the residence offer
- no instant-book calendar is public
- quarterly care remains conditional
- no fake portfolio or review proof
- mobile and desktop screenshots pass the premium audit
