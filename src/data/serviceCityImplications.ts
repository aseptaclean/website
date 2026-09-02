import type { CitySlug, ServiceSlug } from "./cityFacts";

// OPERATIONAL IMPLICATIONS — what a verified city fact means for one service at one address.
//
// Deliberately NOT in src/data/cityFacts.ts. A fact is checkable against a published city
// source; an implication is Aseptaclean's reading of that fact for a project, and the two must
// never render as the same kind of statement. Every record here either points back at the
// cityFacts ids that support it (`basis: "city-fact"`) or declares that it comes from the
// business's own confirmed operating model rather than from any city rule
// (`basis: "operating-model"`) — there is no third case, and no record may claim a fact it
// cannot name.
//
// Copy is docs/city-service-data-UPDATED.md's six "What this changes for a … here" blocks,
// verbatim. Nothing was written for this file.

export type ImplicationBasis = "city-fact" | "operating-model";

export type ServiceCityImplication = {
  id: string;
  city: CitySlug;
  service: ServiceSlug;
  heading: string;
  /** Operational implication derived from the supporting facts named in `factIds`. */
  body: string;
  /**
   * Supporting verified facts, by `CityFact.id`. Non-empty whenever `basis` is "city-fact";
   * empty only for "operating-model" records, which derive from the coordination policy and
   * decision-authority rules rather than from a city publication.
   */
  factIds: readonly string[];
  basis: ImplicationBasis;
};

// HOUSING COMPOSITION — resolved 2026-08-21, owner-directed. Four records here asserted a housing
// mix ("much of the city's housing is multifamily", "renter-majority housing", "the City's
// Housing Element reports…") that no CityFact supported and no source in this repository backed.
// They shipped unedited behind an internal `ownerReviewNote`, which the build report called the
// one substantive content risk in the build. The premises are now struck.
//
// What replaced them: nothing asserted about any city's housing stock. Each rewrite keeps the
// operational point — a managed building is a second approval, private staging decides whether
// the right-of-way rule applies — but states it as a CONDITION OF THE ADDRESS ("where the
// property is a condo or apartment"), which is what gets checked at assessment anyway, rather
// than as a demographic fact about the city. The two authority records dropped to
// `basis: "operating-model"` in the process, because what survives the cut is a decision-
// authority statement, not a reading of a city publication.
//
// Only Campbell had a sourced housing figure in the project (Census QuickFacts owner occupancy,
// now `campbell-owner-occupancy`), and only Campbell's record cites one. Do not reintroduce a
// housing premise for Mountain View or Sunnyvale without a CityFact carrying a real source URL.

export const serviceCityImplications: ReadonlyArray<ServiceCityImplication> = [
  // ---------------------------------------------------------------- Mountain View × hoarding
  {
    id: "mv-hoarding-container-capacity",
    city: "mountain-view",
    service: "hoarding-cleanup",
    heading: "Container capacity is a scheduling question, not a same-week one.",
    body:
      "A high-volume hoarding project usually needs staging capacity. Where a driveway or private area can hold the container, the path to a start date is short. Where it can't — a narrow street, no driveway, a multifamily property — street placement carries a published 30-day permit process. That gets identified at assessment rather than discovered mid-project.",
    factIds: ["mv-franchised-box-provider", "mv-street-box-permit", "mv-box-placement"],
    basis: "city-fact"
  },
  {
    id: "mv-hoarding-street-width",
    city: "mountain-view",
    service: "hoarding-cleanup",
    heading: "The 36-foot street rule is the one people don't expect.",
    body:
      "If the street at the property is narrower than the City's 36-foot threshold, public-street container placement would not be available and a different staging plan would be required.",
    factIds: ["mv-box-placement"],
    basis: "city-fact"
  },
  {
    id: "mv-hoarding-sorting-sequence",
    city: "mountain-view",
    service: "hoarding-cleanup",
    heading: "Sorting doesn't wait on the container.",
    body:
      "The phases that take the longest on a hoarding project — decisions, set-aside, room-by-room sorting — don't depend on a box being present. The sequence is built so permit time and sorting time overlap instead of stacking.",
    factIds: ["mv-street-box-permit"],
    basis: "city-fact"
  },

  // ------------------------------------------------------------------ Mountain View × estate
  {
    id: "mv-estate-permit-window",
    city: "mountain-view",
    service: "estate-cleanout",
    heading: "A listing or transfer date has to be measured against the permit window.",
    body:
      "Where a container must go in the street, Mountain View's published 30-day process sits inside your timeline. Told at assessment, that's a plan. Discovered in week three, it's a missed date.",
    factIds: ["mv-street-box-permit"],
    basis: "city-fact"
  },
  {
    id: "mv-estate-authority",
    city: "mountain-view",
    service: "estate-cleanout",
    heading: "Authority gets confirmed before anything else moves.",
    body:
      "Estate work depends on who holds authority to dispose of property. That's identified at assessment, and unclear authority goes back to you or your counsel rather than being assumed.",
    factIds: [],
    basis: "operating-model"
  },
  {
    id: "mv-estate-access-authority",
    city: "mountain-view",
    service: "estate-cleanout",
    heading: "At a condo or apartment, the container question is also an access question.",
    body:
      "Where the estate property is in a managed building, private staging is often unavailable and a building manager controls loading access independently of the estate's authority. That's a second approval to secure, and it's identified up front.",
    factIds: [],
    basis: "operating-model"
  },

  // -------------------------------------------------------------------- Sunnyvale × hoarding
  {
    id: "sunnyvale-hoarding-row-review",
    city: "sunnyvale",
    service: "hoarding-cleanup",
    heading: "Right-of-way review becomes part of the project schedule when public staging is needed.",
    body:
      "Sunnyvale publishes a minimum ten-working-day review period for an encroachment permit when no revisions are required. Where the container can remain on private property, that particular right-of-way dependency may not apply.",
    factIds: ["sunnyvale-encroachment-permit"],
    basis: "city-fact"
  },
  {
    id: "sunnyvale-hoarding-72-hour",
    city: "sunnyvale",
    service: "hoarding-cleanup",
    heading: "A multi-day project can run into the 72-hour parking rule.",
    body:
      "A hoarding project may be staged across several days when the authorized decision-maker needs more time or the scope is divided into phases. A vehicle left in one location for more than 72 hours violates the municipal code, so parking and staging are planned around the actual address and project sequence.",
    factIds: ["sunnyvale-parking", "sunnyvale-street-sweeping"],
    basis: "city-fact"
  },
  {
    id: "sunnyvale-hoarding-private-staging",
    city: "sunnyvale",
    service: "hoarding-cleanup",
    heading: "Whether the address has private staging decides which rule governs the container.",
    body:
      "Where there's no driveway or private area, the container question becomes a right-of-way question, and that's identified at assessment rather than on the first morning.",
    factIds: ["sunnyvale-encroachment-permit"],
    basis: "city-fact"
  },

  // ---------------------------------------------------------------------- Sunnyvale × estate
  {
    id: "sunnyvale-estate-row-timing",
    city: "sunnyvale",
    service: "estate-cleanout",
    heading: "Right-of-way timing needs to be identified before a listing or transfer schedule is set.",
    body:
      "Where public staging is needed, Sunnyvale publishes a minimum ten-working-day review period for an encroachment permit when no revisions are required. That timing should be identified during assessment rather than after the cleanout schedule has already been committed.",
    factIds: ["sunnyvale-encroachment-permit"],
    basis: "city-fact"
  },
  {
    id: "sunnyvale-estate-access-authority",
    city: "sunnyvale",
    service: "estate-cleanout",
    heading: "Access authority may sit with someone outside the estate.",
    body:
      "Where the estate property is a condo or apartment, building management may control elevator and loading access independently of the executor's authority — a second approval, identified up front.",
    factIds: [],
    basis: "operating-model"
  },
  {
    id: "sunnyvale-estate-authority",
    city: "sunnyvale",
    service: "estate-cleanout",
    heading: "Authority is confirmed before the schedule is set.",
    body:
      "Who holds authority to dispose of estate property is established at assessment. Where it's unclear, it goes back to you or your counsel.",
    factIds: [],
    basis: "operating-model"
  },

  // --------------------------------------------------------------------- Campbell × hoarding
  {
    id: "campbell-hoarding-single-provider",
    city: "campbell",
    service: "hoarding-cleanup",
    heading: "One franchised provider means container capacity is a lead-time question.",
    body:
      "Campbell isn't an open market for debris boxes — availability runs through a single provider. On a high-volume hoarding project that's a scheduling dependency, and it's identified at assessment rather than assumed.",
    factIds: ["campbell-franchised-provider"],
    basis: "city-fact"
  },
  {
    id: "campbell-hoarding-box-size",
    city: "campbell",
    service: "hoarding-cleanup",
    heading: "Box size is a real decision here, not a default.",
    body:
      "With 8 to 40 cubic yards available, sizing against the sorted volume matters — and on a hoarding project the sorted volume is genuinely unknown until decisions are made. The scope accounts for that rather than guessing at the start.",
    factIds: ["campbell-container-sizes"],
    basis: "city-fact"
  },
  {
    id: "campbell-hoarding-holiday-window",
    city: "campbell",
    service: "hoarding-cleanup",
    heading: "Holiday-period right-of-way work near Downtown Campbell needs an additional planning check.",
    body:
      "The City imposes seasonal restrictions on non-emergency street construction in the Downtown area between Thanksgiving and Christmas. A cleanout that depends on public-right-of-way use in that area should be checked with Public Works during planning rather than assuming street use is available.",
    factIds: ["campbell-holiday-moratorium", "campbell-row-permit"],
    basis: "city-fact"
  },

  // ----------------------------------------------------------------------- Campbell × estate
  {
    id: "campbell-estate-private-staging",
    city: "campbell",
    service: "estate-cleanout",
    heading: "Whether a container can stay on private property is an address question here.",
    body:
      "The Census Bureau reports a 51.7% owner-occupancy rate for Campbell, but that citywide measure does not establish whether a particular property has usable private container space or permission to use it. Those conditions are confirmed property by property. If the plan requires public-right-of-way placement, Campbell Public Works determines whether an encroachment permit applies.",
    factIds: ["campbell-owner-occupancy", "campbell-row-permit"],
    basis: "city-fact"
  },
  {
    id: "campbell-estate-year-end-deadline",
    city: "campbell",
    service: "estate-cleanout",
    heading: "A year-end deadline near Downtown Campbell may require an additional Public Works check.",
    body:
      "The City imposes seasonal restrictions on non-emergency street construction in that area between Thanksgiving and Christmas. If the project depends on public-right-of-way use during that period, applicability should be confirmed during planning rather than assumed.",
    factIds: ["campbell-holiday-moratorium"],
    basis: "city-fact"
  },
  {
    id: "campbell-estate-authority",
    city: "campbell",
    service: "estate-cleanout",
    heading: "Authority is confirmed before the schedule is set.",
    body:
      "Who holds authority to dispose of estate property is established at assessment, and unclear authority goes back to you or your counsel.",
    factIds: [],
    basis: "operating-model"
  }
];

export const getImplications = (city: CitySlug, service: ServiceSlug) =>
  serviceCityImplications.filter(
    (item) => item.city === city && item.service === service
  );
