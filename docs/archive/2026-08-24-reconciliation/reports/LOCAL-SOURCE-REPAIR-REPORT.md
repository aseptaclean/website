# Local Source Repair Report

**Date:** 2026-08-24  
**Scope:** The four local-source integrity findings in `FULL-SITE-POST-BUILD-AUDIT.md` only.

## Repairs

### Mountain View street-width implication

Retained `mv-box-placement`, including Mountain View's rule that public-street debris-box
placement is not permitted below 36 feet curb-to-curb. Replaced the unsupported assertion that
Mountain View has residential streets below that width with a conditional operational
implication: if the street at the property is below the threshold, public-street placement is
unavailable and a different staging plan is required.

Trace: `mv-hoarding-street-width` → `mv-box-placement`.

### Campbell Census record

Reverified the linked [U.S. Census Bureau QuickFacts table](https://www.census.gov/quickfacts/fact/table/campbellcitycalifornia/PST045224).
It reports Campbell's owner-occupied housing unit rate as **51.7% for 2020–2024**.

Updated `campbell-owner-occupancy`:

- claim: 51.7%, 2020–2024 ACS five-year estimates;
- source name: now identifies the 2020–2024 period;
- source URL: now points to the exact current QuickFacts table;
- `verifiedAt`: `2026-08-24`;
- `reviewAfter`: `2027-08-24`.

The related estate-cleanout implication now says explicitly that this citywide tenure statistic
does not establish private container space or permission at a particular property. It makes no
claim about detached homes or driveway availability.

Trace: `campbell-estate-private-staging` → `campbell-owner-occupancy` +
`campbell-row-permit`.

### `/service-areas/` cluster copy

Removed the three unsupported generalizations about lot size and parking, home tenure and rental
turnover, and lot/household composition. The cards now provide only their geographic grouping and
ask for the property address or approved contents scope so site-specific logistics can be
reviewed. No replacement demographic or housing-form fact was introduced.

## Fact and implication integrity

- The city data contains 15 `CityFact` records. Every rendered fact carries an official,
  Census, or authorized-provider URL plus `verifiedAt` and `reviewAfter` metadata.
- The city service data contains 18 operational implications. Each is classified as either
  `city-fact`, with valid same-city `factIds`, or `operating-model`, with no fact IDs. The route
  generator renders verified facts and operational implications in separate sections.
- `npm run qa:seo` verifies rendered fact coverage, source-link attribution, applicability,
  freshness, and implication ID integrity against the built HTML. It passed with zero findings.
- A rendered-output sweep confirmed the superseded Census value/period and all four unsupported
  phrases are absent.

## QA

- `npm run check`: PASS — 0 errors, 0 warnings, 4 pre-existing hints.
- `npm run build`: PASS — 48 pages generated; 46 deployable after pruning two dev routes.
- `npm run qa:seo`: PASS — 46 pages scanned; 9/9 city routes clean; 0 errors and 0 publish
  blockers.
- Publication status: unchanged. All three city hubs and all six service × city routes remain
  `noindex, follow` and outside `sitemap.xml`.

No routes, layouts, city additions, or city publication states changed.
