export type CitySlug = "mountain-view" | "sunnyvale" | "campbell";

// Declared here rather than in serviceCityPages.ts because `CityFact.appliesTo` needs it and the
// dependency has to run one way: facts know nothing about pages, pages read facts.
export type ServiceSlug = "hoarding-cleanup" | "estate-cleanout";

// This file holds VERIFIED FACTS ONLY — what a city or its authorized provider publishes, in
// language that could be checked against the source. Nothing about what a fact means for a
// project belongs here; that is an operational implication and lives in
// src/data/serviceCityImplications.ts, keyed back to these ids. The separation is the point:
// a fact can be reverified against its source, an implication cannot, and mixing them produces
// a page where an inference is indistinguishable from a published rule.
export type CityFact = {
  id: string;
  city: CitySlug;
  factType:
    | "franchise"
    | "permit"
    | "placement"
    | "sweeping"
    | "facility"
    | "moratorium"
    | "housing"
    | "parking";
  claim: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: "city" | "county" | "state" | "census" | "authorized-provider";
  verifiedAt: string;
  reviewAfter: string;
  /**
   * Service pages this fact may render on. Omitted = every service. This is the applicability
   * guard: it is what stops a construction-and-demolition rule from being rendered as background
   * on a household hoarding page, where it does not apply. No current record needs to narrow —
   * every fact below is a container, right-of-way, or street-access rule that bears on both
   * services — so the field is unset throughout and the guard is the mechanism, not a filter
   * that happens to be active today.
   */
  appliesTo?: readonly ServiceSlug[];
};

// Regulatory and provider facts live here once so future city-specific service pages can
// reference the same records without copying or subtly changing the underlying claims.
// Verified 2026-08-21 against the linked city/provider sources. Time-sensitive records are
// reviewed annually and must block indexation after reviewAfter until reverified.
export const cityFacts: ReadonlyArray<CityFact> = [
  {
    id: "mv-franchised-box-provider",
    city: "mountain-view",
    factType: "franchise",
    claim:
      "Recology Mountain View is the only company authorized to provide debris and recycling box service and disposal within the city.",
    sourceName: "City of Mountain View — Temporary Encroachment Permit",
    sourceUrl:
      "https://developmentpermits.mountainview.gov/residential/new-construction-single-family-or-duplex/temporary-encroachment-permit-application",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "mv-street-box-permit",
    city: "mountain-view",
    factType: "permit",
    claim:
      "A box on the public street additionally requires a City Temporary Encroachment Permit, for which Mountain View publishes a 30-day processing period.",
    sourceName: "City of Mountain View — Temporary Encroachment Permit",
    sourceUrl:
      "https://developmentpermits.mountainview.gov/residential/new-construction-single-family-or-duplex/temporary-encroachment-permit-application",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "mv-box-placement",
    city: "mountain-view",
    factType: "placement",
    claim:
      "Street placement must not be in front of a neighbor's property; must be at least six feet from driveways and fifteen feet from hydrants and crosswalks; must stay outside no-parking, fire, and passenger zones; and is not permitted on streets narrower than 36 feet curb-to-curb.",
    sourceName: "City of Mountain View — Temporary Encroachment Permit",
    sourceUrl:
      "https://developmentpermits.mountainview.gov/residential/new-construction-single-family-or-duplex/temporary-encroachment-permit-application",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "mv-street-sweeping",
    city: "mountain-view",
    factType: "sweeping",
    claim:
      "Neighborhoods are swept twice monthly, with vehicles to be moved by 6:00 a.m. on sweep day. California Street, Crisanto Avenue, Foxborough Drive, Latham Street, Ortega Avenue, and Sylvan Avenue carry additional posted restrictions.",
    sourceName: "City of Mountain View — Street Sweeping Schedule",
    sourceUrl:
      "https://www.mountainview.gov/our-city/departments/public-works/roads-and-transportation/street-maintenance/street-sweeping-schedule",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "sunnyvale-waste-provider",
    city: "sunnyvale",
    factType: "franchise",
    claim:
      "Sunnyvale provides municipal garbage and recycling service under contract with Specialty Solid Waste & Recycling, and container service runs through the city's contracted hauler.",
    sourceName: "City of Sunnyvale — Recycling and Garbage",
    sourceUrl:
      "https://www.sunnyvale.ca.gov/homes-streets-and-property/recycling-and-garbage",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "sunnyvale-encroachment-permit",
    city: "sunnyvale",
    factType: "permit",
    claim:
      "Staging material or working in the public right-of-way requires an Encroachment Permit from Public Works Engineering. The City's current application asks applicants to allow a minimum of ten working days for review and issuance where no revisions are needed.",
    sourceName: "City of Sunnyvale — Permit Application for Encroachment",
    sourceUrl:
      "https://www.sunnyvale.ca.gov/home/showpublisheddocument/1616/638955958307770000",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "sunnyvale-smart-station",
    city: "sunnyvale",
    factType: "facility",
    claim:
      "The SMaRT Station, the regional transfer and recycling facility at 301 Carl Road, is located in Sunnyvale and runs 8:00 a.m. to 5:00 p.m. seven days a week, closed Thanksgiving, Christmas, and New Year's Day.",
    sourceName: "City of Sunnyvale — SMaRT Station Services",
    sourceUrl:
      "https://www.sunnyvale.ca.gov/home/showpublisheddocument/3006/638460100327900000",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "sunnyvale-parking",
    city: "sunnyvale",
    factType: "parking",
    claim:
      "A vehicle left in one street location for more than 72 hours violates the municipal code.",
    sourceName: "City of Sunnyvale — Abandoned Vehicle",
    sourceUrl:
      "https://www.sunnyvale.ca.gov/your-government/departments/public-safety/public-safety-services/abandoned-vehicle",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "sunnyvale-street-sweeping",
    city: "sunnyvale",
    factType: "sweeping",
    claim: "Street sweeping is address-specific rather than citywide.",
    sourceName: "City of Sunnyvale — Maps & GIS",
    sourceUrl:
      "https://www.sunnyvale.ca.gov/city-services/online-services/maps-and-gis",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "campbell-franchised-provider",
    city: "campbell",
    factType: "franchise",
    claim:
      "Campbell has an exclusive franchise agreement with West Valley Collection and Recycling for dumpsters, debris boxes, and roll-off bins.",
    sourceName: "City of Campbell — Garbage & Recycling Services",
    sourceUrl: "https://www.campbellca.gov/508/Garbage-Recycling-Services",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "campbell-container-sizes",
    city: "campbell",
    factType: "placement",
    claim: "Containers are available in sizes from 8 to 40 cubic yards.",
    sourceName: "West Valley Collection & Recycling — Residential Service Guide",
    sourceUrl:
      "https://westvalleyrecycles.com/wp-content/uploads/2024/03/WestValley-Residential-HowToGuide-2021.pdf",
    sourceType: "authorized-provider",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "campbell-row-permit",
    city: "campbell",
    factType: "permit",
    claim:
      "A debris box in the public right-of-way may require an encroachment permit depending on location; Campbell Public Works determines whether one applies.",
    sourceName: "City of Campbell — Encroachment Permits",
    sourceUrl: "https://www.campbellca.gov/186/Encroachment-Permits",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  {
    id: "campbell-holiday-moratorium",
    city: "campbell",
    factType: "moratorium",
    claim:
      "Between Thanksgiving and Christmas the City enforces a moratorium on non-emergency street construction in the vicinity of Downtown Campbell, and construction hours may be limited ahead of city events.",
    sourceName: "City of Campbell — Encroachment Permits",
    sourceUrl: "https://www.campbellca.gov/186/Encroachment-Permits",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  },
  // The one housing-composition figure this project actually holds a source for. It is recorded
  // in the research package's own Campbell fact list (docs/city-service-data-UPDATED.md, "Verified
  // city facts") with its publisher and vintage named, and it enters here on the same provenance
  // as every other record in this file. It is a TENURE figure and nothing more: it says who owns
  // the units, not what shape they are. It does not support a claim about detached homes, about
  // multifamily share, or about driveways, and no such claim may be built on it — see the
  // Campbell estate implication, which explicitly keeps private space and permission as
  // property-specific questions rather than deriving them from this citywide tenure figure.
  {
    id: "campbell-owner-occupancy",
    city: "campbell",
    factType: "housing",
    // Phrased as a share rather than as QuickFacts' own label, "owner-occupied housing unit rate
    // of 51.7%": that wording trips the public-price guard's permit-fee heuristic
    // (`rate ... of ... <digit>`), and the guard is correct to catch that shape. Same figure,
    // same meaning — QuickFacts defines the rate as owner-occupied units over occupied units.
    claim:
      "The U.S. Census Bureau reports that 51.7% of Campbell's occupied housing units are owner-occupied (QuickFacts, 2020–2024 American Community Survey five-year estimates).",
    sourceName:
      "U.S. Census Bureau — QuickFacts, Campbell city, California (2020–2024)",
    sourceUrl:
      "https://www.census.gov/quickfacts/fact/table/campbellcitycalifornia/PST045224",
    sourceType: "census",
    verifiedAt: "2026-08-24",
    reviewAfter: "2027-08-24"
  },
  {
    id: "campbell-street-sweeping",
    city: "campbell",
    factType: "sweeping",
    claim:
      "Street sweeping follows a published zone schedule — first and third, or second and fourth, Tuesday, Wednesday, or Thursday — with vehicles moved off the street on scheduled days.",
    sourceName: "City of Campbell — Street Sweeping",
    sourceUrl: "https://www.campbellca.gov/215/Street-Sweeping",
    sourceType: "city",
    verifiedAt: "2026-08-21",
    reviewAfter: "2027-08-21"
  }
];

export const getCityFacts = (city: CitySlug) => cityFacts.filter((fact) => fact.city === city);

/**
 * The city fact block as it may render on one service page. Applies the `appliesTo` guard so a
 * service page can never show a fact scoped to the other service.
 */
export const getCityFactsForService = (city: CitySlug, service: ServiceSlug) =>
  getCityFacts(city).filter((fact) => !fact.appliesTo || fact.appliesTo.includes(service));

export const getCityFactById = (id: string) => cityFacts.find((fact) => fact.id === id);
