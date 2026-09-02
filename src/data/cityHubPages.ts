import type { CitySlug, ServiceSlug } from "./cityFacts";
import { builtOnly, type PublishStatus } from "./publication";

export type CityHubPage = {
  slug: CitySlug;
  city: string;
  path: `/service-areas/${CitySlug}/`;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  intro: string[];
  featuredServices: ReadonlyArray<{
    /** Resolved to that city's own service page by the hub route — see the note below. */
    service: ServiceSlug;
    name: string;
    description: string;
    /** Parent San Jose service page. The fallback target if the city page is ever removed. */
    parentHref: string;
  }>;
  futureServices: string;
  /**
   * The services named in `futureServices`, as the hairline list the hub renders them in. Same
   * nouns, same order, same source sentence — this is the approved paragraph split for layout,
   * not a second inventory, so a service may not appear here unless it appears there.
   *
   * Rendered as text, never as links: three of the six parent service pages are gated `noindex`
   * routes and one of those is deliberately kept free of inbound links from indexable pages.
   * The two indexable group hubs beside the heading are the route through.
   */
  futureServiceNames: readonly string[];
  publishStatus: PublishStatus;
};

// Card copy is shared across the three hubs; the LINK is not. Each card resolves to that city's
// own /service-areas/{city}/{service}/ page, which is the hub's actual child in the breadcrumb
// and which carries the parent link onward. Before those six routes existed (2026-08-21) these
// cards pointed straight at the San Jose parent, which skipped the middle tier the breadcrumb
// already advertised.
const featuredServices = [
  {
    service: "hoarding-cleanup",
    name: "Hoarding Cleanup",
    description:
      "Decision-led clearing and cleanup with uncertain items held for review rather than automatically discarded.",
    parentHref: "/hoarding-cleanup-san-jose/"
  },
  {
    service: "estate-cleanout",
    name: "Estate Cleanout",
    description:
      "For executors, trustees, and authorized decision-makers working toward a listing, transfer, or family handoff. Written scope, set-aside controls, and documented closeout.",
    parentHref: "/estate-cleanout-san-jose/"
  }
] as const;

// Availability in these three cities is not yet owner-confirmed in the approved copy package, so
// all three sit on the middle rung: built, reachable, `noindex, follow`, outside sitemap.xml.
// They are not `draft` — the copy is finished and the routes are meant to be reachable — and the
// distinction is now expressible. See src/data/publication.ts.
export const cityHubPages: ReadonlyArray<CityHubPage> = [
  {
    slug: "mountain-view",
    city: "Mountain View",
    path: "/service-areas/mountain-view/",
    h1: "Property Cleaning & Complex Cleanup in Mountain View",
    seoTitle: "Mountain View Property Cleaning & Complex Cleanup | Aseptaclean",
    metaDescription:
      "Specialty property cleaning and complex cleanup in Mountain View, including estate and hoarding projects. Written scope, authorized container coordination when needed, documented closeout.",
    intro: [
      "Recology is the only company allowed to drop a debris box in this city. That part is simple. What isn't simple is where the box goes.",
      "If the container can remain entirely on private property, the City's street encroachment permit is not required. The container still has to be arranged through the applicable authorized provider. If it has to sit in the street, Mountain View requires a Temporary Encroachment Permit and publishes a 30-day processing window for one. That's a scheduling dependency, not something to discover after a date has already been promised.",
      "And on a street narrower than 36 feet curb-to-curb, a box in the road isn't slow. It's not allowed at all. We sort that out at the assessment, standing in the driveway, before anyone commits to a date."
    ],
    featuredServices,
    futureServices:
      "Deep cleaning, move-out cleaning, post-construction cleaning, animal-waste cleanup, rodent-dropping cleanup, property cleanouts, and related services can be added as their city-specific pages are published. If the situation does not match an existing page, describe the property and Aseptaclean will confirm whether it fits the current scope.",
    futureServiceNames: [
      "Deep cleaning",
      "Move-out cleaning",
      "Post-construction cleaning",
      "Animal-waste cleanup",
      "Rodent-dropping cleanup",
      "Property cleanouts"
    ],
    publishStatus: "noindex"
  },
  {
    slug: "sunnyvale",
    city: "Sunnyvale",
    path: "/service-areas/sunnyvale/",
    h1: "Property Cleaning & Complex Cleanup in Sunnyvale",
    seoTitle: "Sunnyvale Property Cleaning & Complex Cleanup | Aseptaclean",
    metaDescription:
      "Specialty property cleaning and complex cleanup in Sunnyvale, including estate and hoarding projects. Written scope, authorized container coordination when needed, documented closeout.",
    intro: [
      "Sunnyvale publishes a minimum ten-working-day review period for encroachment work when no revisions are required, so public-right-of-way staging needs to be identified before the project schedule is committed.",
      "The property itself can matter just as much as the City process. Where the address is a condo or apartment, private staging may be limited and building-management rules can control elevators, loading areas, or shared access independently of whoever hired us."
    ],
    featuredServices,
    // The approved paragraph for these two cities ends with a build directive — "Do not expose a
    // child route until that service is active and its city record passes the publish gate." —
    // which was shipping to visitors as page copy. It is an instruction to the builder, not a
    // sentence for the reader, and it is enforced in code by src/data/publication.ts, where a
    // `draft` record produces no route at all. Struck from the rendered string and recorded in
    // docs/05-DECISIONS-LOG.md; the customer-facing sentence is unchanged.
    futureServices:
      "Deep cleaning, move-out cleaning, post-construction cleaning, animal-waste cleanup, rodent-dropping cleanup, and related services can be added as their city-specific pages are published.",
    futureServiceNames: [
      "Deep cleaning",
      "Move-out cleaning",
      "Post-construction cleaning",
      "Animal-waste cleanup",
      "Rodent-dropping cleanup"
    ],
    publishStatus: "noindex"
  },
  {
    slug: "campbell",
    city: "Campbell",
    path: "/service-areas/campbell/",
    h1: "Property Cleaning & Complex Cleanup in Campbell",
    seoTitle: "Campbell Property Cleaning & Complex Cleanup | Aseptaclean",
    metaDescription:
      "Specialty property cleaning and complex cleanup in Campbell, including estate and hoarding projects. Written scope, authorized container coordination when needed, documented closeout.",
    intro: [
      "Container placement in Campbell depends on the actual property rather than on anything true of the city as a whole. Where usable private driveway space exists, a container may be able to stay off the public right-of-way; where it does not, Public Works requirements become part of the plan.",
      "Near Downtown Campbell, the calendar can matter too. The City imposes seasonal restrictions on non-emergency street construction between Thanksgiving and Christmas. A project that depends on public-right-of-way use during that period should be checked with Public Works during planning."
    ],
    featuredServices,
    // The approved paragraph for these two cities ends with a build directive — "Do not expose a
    // child route until that service is active and its city record passes the publish gate." —
    // which was shipping to visitors as page copy. It is an instruction to the builder, not a
    // sentence for the reader, and it is enforced in code by src/data/publication.ts, where a
    // `draft` record produces no route at all. Struck from the rendered string and recorded in
    // docs/05-DECISIONS-LOG.md; the customer-facing sentence is unchanged.
    futureServices:
      "Deep cleaning, move-out cleaning, post-construction cleaning, animal-waste cleanup, rodent-dropping cleanup, and related services can be added as their city-specific pages are published.",
    futureServiceNames: [
      "Deep cleaning",
      "Move-out cleaning",
      "Post-construction cleaning",
      "Animal-waste cleanup",
      "Rodent-dropping cleanup"
    ],
    publishStatus: "noindex"
  }
];

/**
 * Directory links, used by /service-areas/ and /property-clearing/. `draft` hubs are excluded:
 * a draft record produces no route, so linking to one would publish a 404 from two indexable
 * pages. A `noindex` hub IS listed — that inbound link is the `inboundLinkCount >= 1` term the
 * page needs before it can ever be flipped to `published-index`.
 */
export const cityHubLinks = builtOnly(cityHubPages).map(({ city, path }) => ({
  city,
  href: path
}));
