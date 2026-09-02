import type { CitySlug, ServiceSlug } from "./cityFacts";
import type { Doc27ServicePage } from "./doc27ServicePages";
import { estatePage, hoardingPage } from "./doc27ServicePages";
import { builtOnly, isBuilt, type PublishStatus } from "./publication";

// SERVICE × CITY JOIN RECORDS — the six pages at /service-areas/{city}/{service}/.
//
// Copy is docs/city-service-data-UPDATED.md, verbatim: two shared service openings, six SEO
// identity blocks, eighteen city-specific FAQs, and the shared container-coordination policy.
// The two things this file deliberately does NOT hold:
//   · verified city facts        → src/data/cityFacts.ts
//   · operational implications   → src/data/serviceCityImplications.ts
// A page is assembled from all three at render time so a fact is written once and referenced by
// every page that needs it, rather than retyped per city.
//
// Scope and fit copy is not re-authored here either — each service reads the `fitWhen`,
// `workIncludes` and `boundaries` already approved on its parent San Jose service record. The
// copy package's inventory (Part E) calls those blocks "inherited from existing components — no
// new copy needed", and inheriting the record is how that is enforced rather than promised.

// Re-exported so the six join records and the three hub records name the same type from the same
// place. The definition and the three states live in src/data/publication.ts.
export type { PublishStatus };

export type ServiceDefinition = {
  slug: ServiceSlug;
  /** Breadcrumb and link label — "Hoarding Cleanup". */
  name: string;
  /** schema.org Service.serviceType. */
  serviceType: string;
  /** Parent service page, per the copy package's link map B2. */
  parentHref: string;
  /** Shared opening, used identically on all three of that service's city pages. */
  opening: {
    heading: string;
    paragraphs: readonly string[];
  };
  /** Approved scope/fit source. Never re-authored per city. */
  scopeSource: Doc27ServicePage;
};

export type ServiceCityPage = {
  city: CitySlug;
  cityName: string;
  service: ServiceSlug;
  path: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  /**
   * The three city-specific FAQs. Every question and answer renders in the page body as well as
   * in the FAQPage node — schema-only Q&A is a structured-data policy violation, so the schema is
   * built from this same array rather than from a second copy of the text.
   */
  faq: readonly { readonly question: string; readonly answer: string }[];
  /**
   * `noindex` on all six — built, reachable, `noindex, follow`, outside sitemap.xml. City
   * availability is not owner-confirmed (docs/city-pages-part2-UPDATED.md Part E, first checkbox
   * is open) and docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §7 makes a location page a licensing
   * decision before an SEO one. Not `draft`: the copy is finished and the page is meant to be
   * read. Flip one record at a time, only after `npm run qa:seo` reports that page clean.
   */
  publishStatus: PublishStatus;
};

/**
 * Owner-confirmed operating model (docs/city-pages-part2-UPDATED.md, Part E — the one checkbox
 * in that package that IS checked). This is an operating policy, not a claim about past work,
 * and it is the sentence that keeps every container reference on these pages inside
 * docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §4.3: nothing here may read as self-performed transport.
 */
export const containerCoordinationPolicy =
  "When a project requires a dumpster or debris container, Aseptaclean coordinates the applicable city-authorized or franchised provider, container placement, and disposal requirements as part of the scope. Aseptaclean performs the approved on-site sorting, bagging, staging, clearing, loading into the approved container when included, and follow-on cleaning. Aseptaclean does not transport customer debris off-site.";

export const serviceDefinitions: Readonly<Record<ServiceSlug, ServiceDefinition>> = {
  "hoarding-cleanup": {
    slug: "hoarding-cleanup",
    name: "Hoarding Cleanup",
    serviceType: "Hoarding cleanup",
    parentHref: "/hoarding-cleanup-san-jose/",
    opening: {
      heading: "The hardest part isn't the volume.",
      paragraphs: [
        "It's doing this without making someone feel ambushed — and without a decision getting made in an afternoon that can't be undone.",
        "Decisions come first. Room by room, before anything is removed: what stays, what leaves, what is held for the authorized decision-maker. Anything uncertain goes into a labeled clear bag and waits for that person to resolve it. Unmarked vehicles, plain clothing, no signage, and we don't discuss the property with neighbors."
      ]
    },
    scopeSource: hoardingPage
  },
  "estate-cleanout": {
    slug: "estate-cleanout",
    name: "Estate Cleanout",
    serviceType: "Estate cleanout",
    parentHref: "/estate-cleanout-san-jose/",
    opening: {
      heading: "You're responsible for a property you may not have lived in for decades.",
      paragraphs: [
        "There's a deadline you didn't choose, people who will ask what happened to things, and rooms nobody has opened in years.",
        "The scope is written and approved before anything is removed — room by room, what stays, what leaves, what gets cleaned, what's excluded. At completion you receive a Property Handoff Record showing what was decided, what was cleared, and what was held back. That's also the document you hand a sibling who asks."
      ]
    },
    scopeSource: estatePage
  }
};

// Three answers appear on more than one page. They are referenced, not retyped, for the same
// reason the facts are: one string, one place to correct it.
const AUTHORIZED_DECISION_MAKER_FAQ = {
  question: "Who decides what gets removed?",
  answer:
    "The authorized decision-maker identified at assessment. Items marked uncertain or disputed are not discarded until that person resolves them."
} as const;

const SET_ASIDE_FAQ = {
  question: "What happens to documents and valuables found during clearing?",
  answer:
    "Documents, keys, photographs, and similar items are set aside and reported to the authorized decision-maker rather than removed."
} as const;

const ABANDONED_PROPERTY_FAQ = {
  question: "Do you decide whether property is legally abandoned?",
  answer:
    "No. That determination isn't ours to make. We document what's found and hold it for your instruction."
} as const;

const PACING_FAQ = {
  question: "Can the work be paced over several days?",
  answer:
    "Yes. On hoarding projects the pace is set by the family and the authorized decision-maker."
} as const;

const RESPONSE_TIME_FAQ = {
  question: "How soon will I hear back?",
  answer:
    "Assessment requests are reviewed within one business day. Scheduling depends on scope, access, and container coordination."
} as const;

export const serviceCityPages: ReadonlyArray<ServiceCityPage> = [
  {
    city: "mountain-view",
    cityName: "Mountain View",
    service: "hoarding-cleanup",
    path: "/service-areas/mountain-view/hoarding-cleanup/",
    h1: "Hoarding Cleanup in Mountain View",
    seoTitle: "Hoarding Cleanup in Mountain View | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Owner-operated hoarding cleanup in Mountain View. Written scope before anything is removed, container coordination through the city's franchised hauler, documented closeout.",
    faq: [
      {
        question: "How long does the container process take?",
        answer:
          "Mountain View publishes a 30-day processing period for a permit to place a box in the public street. If the container remains entirely on private property, that City street-encroachment permit is not required; the container still must be arranged through the applicable authorized provider. Which placement applies to the property is determined at assessment."
      },
      AUTHORIZED_DECISION_MAKER_FAQ,
      {
        question: "What happens if hazardous materials turn up?",
        answer:
          "Work stops on that item. Hazardous materials require separate handling through an authorized program and are identified and reported rather than removed as part of a cleanout."
      }
    ],
    publishStatus: "noindex"
  },
  {
    city: "mountain-view",
    cityName: "Mountain View",
    service: "estate-cleanout",
    path: "/service-areas/mountain-view/estate-cleanout/",
    h1: "Estate Cleanout in Mountain View",
    seoTitle: "Estate Cleanout in Mountain View | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Estate cleanouts in Mountain View for executors and trustees. Written scope, set-aside of documents and valuables, Property Handoff Record at completion.",
    faq: [
      {
        question: "Can this be coordinated with a realtor or an estate sale?",
        answer:
          "Yes, when it's identified up front. Sequencing around an estate sale, a listing date, or a contractor can be written into the approved scope."
      },
      SET_ASIDE_FAQ,
      ABANDONED_PROPERTY_FAQ
    ],
    publishStatus: "noindex"
  },
  {
    city: "sunnyvale",
    cityName: "Sunnyvale",
    service: "hoarding-cleanup",
    path: "/service-areas/sunnyvale/hoarding-cleanup/",
    h1: "Hoarding Cleanup in Sunnyvale",
    seoTitle: "Hoarding Cleanup in Sunnyvale | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Owner-operated hoarding cleanup in Sunnyvale. Decisions and written scope before removal, container coordination through the city's contracted hauler, documented closeout.",
    faq: [
      {
        question: "Does everything go to SMaRT?",
        answer:
          "SMaRT is the regional facility located in Sunnyvale. The lawful route for any specific load depends on the material and the transporting party, and disposal routing is confirmed as part of the scope rather than assumed."
      },
      {
        question: "What about an apartment or condo?",
        answer:
          "Access, elevators, loading areas, and building rules are reviewed at assessment. On multifamily properties those change the staging plan and the timeline more than the volume does."
      },
      PACING_FAQ
    ],
    publishStatus: "noindex"
  },
  {
    city: "sunnyvale",
    cityName: "Sunnyvale",
    service: "estate-cleanout",
    path: "/service-areas/sunnyvale/estate-cleanout/",
    h1: "Estate Cleanout in Sunnyvale",
    seoTitle: "Estate Cleanout in Sunnyvale | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Estate cleanouts in Sunnyvale for executors and trustees. Written scope before removal, set-aside of documents and valuables, Property Handoff Record at completion.",
    faq: [
      SET_ASIDE_FAQ,
      {
        question: "Can this be sequenced around an estate sale or a listing?",
        answer:
          "Yes, when identified up front. That sequencing becomes part of the approved scope."
      },
      RESPONSE_TIME_FAQ
    ],
    publishStatus: "noindex"
  },
  {
    city: "campbell",
    cityName: "Campbell",
    service: "hoarding-cleanup",
    path: "/service-areas/campbell/hoarding-cleanup/",
    h1: "Hoarding Cleanup in Campbell",
    seoTitle: "Hoarding Cleanup in Campbell | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Owner-operated hoarding cleanup in Campbell. Decisions and written scope before removal, container coordination through the city's franchised hauler, documented closeout.",
    faq: [
      {
        question: "Does the construction-debris rule apply to a household cleanout?",
        answer:
          "Campbell's approved-hauler requirement for construction and demolition material applies to C&D specifically. A household hoarding cleanout is a different material stream. Which rules apply is confirmed by the scope of work, not assumed from the address."
      },
      AUTHORIZED_DECISION_MAKER_FAQ,
      PACING_FAQ
    ],
    publishStatus: "noindex"
  },
  {
    city: "campbell",
    cityName: "Campbell",
    service: "estate-cleanout",
    path: "/service-areas/campbell/estate-cleanout/",
    h1: "Estate Cleanout in Campbell",
    seoTitle: "Estate Cleanout in Campbell | South Bay & Peninsula | Aseptaclean",
    metaDescription:
      "Estate cleanouts in Campbell for executors and trustees. Written scope before removal, set-aside of documents and valuables, Property Handoff Record at completion.",
    faq: [SET_ASIDE_FAQ, ABANDONED_PROPERTY_FAQ, RESPONSE_TIME_FAQ],
    publishStatus: "noindex"
  }
];

/** The record, whatever its publication state. Callers that render a LINK want the next one. */
export const getServiceCityPage = (city: CitySlug, service: ServiceSlug) =>
  serviceCityPages.find((page) => page.city === city && page.service === service);

/**
 * The record only if it produces a route. Link resolution must use this: a `draft` record has no
 * HTML, so a card pointing at its path is a published 404.
 */
export const getBuiltServiceCityPage = (city: CitySlug, service: ServiceSlug) => {
  const page = getServiceCityPage(city, service);
  return page && isBuilt(page.publishStatus) ? page : undefined;
};

/**
 * The other service in the same city — the sibling link required on every one of these pages.
 * Skips `draft` records: an unbuilt sibling is not a link, it is a 404, and the caller already
 * renders the block conditionally.
 */
export const getSiblingServiceCityPage = (city: CitySlug, service: ServiceSlug) =>
  serviceCityPages.find(
    (page) => page.city === city && page.service !== service && isBuilt(page.publishStatus)
  );

/** City-scoped service links, so the city hub and the generator cannot drift apart. */
export const getCityServiceLinks = (city: CitySlug) =>
  builtOnly(serviceCityPages)
    .filter((page) => page.city === city)
    .map((page) => ({
      service: page.service,
      name: serviceDefinitions[page.service].name,
      href: page.path
    }));

/**
 * Service-scoped city links — the mirror of `getCityServiceLinks`, used by the "Also serving"
 * block on the two parent San Jose service pages. This is link map B1's second and third groups
 * (docs/city-pages-part2-UPDATED.md), which is also guard D3 #10's "at least one contextual
 * inbound link" and the `inboundLinkCount >= 1` term in D4's indexation expression.
 *
 * Anchor text is composed from `serviceDefinitions[].name`, the same source the sibling link on
 * each service×city page already uses, rather than a second hand-typed spelling of each service
 * name. That renders "Hoarding Cleanup in Mountain View" where B1's table cell reads "Hoarding
 * cleanup in Mountain View" — a capitalization difference only, taken deliberately so the
 * service name has one source of truth in this file instead of two that can drift.
 *
 * Derived from `serviceCityPages` and filtered to built records, so a city withdrawn from the
 * array — or dropped to `draft` — loses its inbound link in the same change. A parent page can
 * never advertise a page that is not built.
 */
export const getServiceCityLinks = (service: ServiceSlug) =>
  builtOnly(serviceCityPages)
    .filter((page) => page.service === service)
    .map((page) => ({
      city: page.city,
      cityName: page.cityName,
      href: page.path,
      anchor: `${serviceDefinitions[page.service].name} in ${page.cityName}`
    }));
