// Copy for the service-areas and company pages, transcribed from docs/27-COPY-CANONICAL.md
// §16 and §17 on 2026-08-16. Unlike the fourteen service pages in doc27ServicePages.ts, these
// five have no shared structure in doc 27 — each §17 subsection defines its own field set — so
// this file is hand-shaped per page rather than generated from one interface.
//
// Slugs follow docs/SITEMAP-MASTER.md, which keeps /handoff-standard/ for what doc 27 §17.1
// calls "Process" (master's Company row: "/handoff-standard/ (= Process)"). Doc 27's bare
// /process route is not built; master owns URLs, doc 27 owns words.
//
// The two disclaimers below are verbatim-mandated (doc 21 / AGENTS.md §0.2) and are rendered
// from src/data/site.ts's `legal` export, never retyped inline — see legal.documentationDisclaimer
// and legal.founderAuthorityLimit. Do not inline a copy of either string here.

export const serviceAreasPage = {
  slug: "/service-areas/",
  seoTitle: "South Bay & Peninsula Service Area | Aseptaclean",
  metaDescription:
    "Aseptaclean provides owner-operated cleaning and property clearing across the South Bay and Peninsula.",
  eyebrow: "Service area",
  h1: "South Bay and Peninsula properties, reviewed one address at a time.",
  lead: "Travel, access, parking, building rules and the project condition are considered before a scope is scheduled.",
  sectionLabel: "Primary service area",
  h2: "Start with the property—not a city-page promise.",
  body: "We currently review work in the cities below. Availability depends on the service, property condition, access and schedule.",
  primaryCities: [
    "San Jose",
    "Mountain View",
    "Sunnyvale",
    "Santa Clara",
    "Campbell"
  ],
  primaryCityStatus: "Assessment requests accepted",
  alsoReviewed: ["Los Altos", "Los Altos Hills", "Los Gatos", "Palo Alto", "Atherton"],
  publishingNote:
    "Individual city guides will be published only after each page has verified local operating details and real project proof. That keeps the site useful and avoids thin location pages."
} as const;

export const processPage = {
  slug: "/handoff-standard/",
  seoTitle: "Our Process | Aseptaclean",
  metaDescription:
    "How Aseptaclean scopes, protects, clears, resets and documents property work.",
  eyebrow: "The five-stage handoff standard",
  h1: "Decisions first. Work second. Proof at closeout.",
  lead: "The operating system is designed for properties where vague instructions create expensive mistakes.",
  stages: [
    {
      name: "Scope",
      body: "We document decision authority, the rooms involved, what stays, what may leave, what gets cleaned and what is excluded."
    },
    {
      name: "Protect",
      body: "Keep areas and uncertain items are marked. Documents, keys and valuables are separated for review."
    },
    {
      name: "Clear",
      body: "Only approved nonhazardous contents are consolidated, staged or coordinated for lawful disposal."
    },
    {
      name: "Reset",
      body: "The defined rooms and surfaces receive the approved detailed cleaning work."
    },
    {
      name: "Verify",
      body: "Completion photographs, documented exceptions and the Property Handoff Record close the scope."
    }
  ],
  recordHeading: "A clear end point for the approved work.",
  recordBody:
    "The Property Handoff Record summarizes the approved scope, completion status and documented exceptions. It is a project record—not a regulatory clearance, inspection approval, environmental certification or determination that a property is safe or habitable."
} as const;

export const projectsPage = {
  slug: "/projects/",
  seoTitle: "Projects & Property Handoffs | Aseptaclean",
  metaDescription:
    "The project types Aseptaclean reviews and the proof required before work is shown publicly.",
  eyebrow: "Projects",
  h1: "Real work will appear here only when it can be shown honestly.",
  lead: "No stock transformations, borrowed photographs or invented case studies. Public project records require client permission and verifiable scope details.",
  h2: "Property work with a defined handoff.",
  projectTypes: [
    "Estate and family-directed cleanouts",
    "Hoarding and heavy-content properties",
    "Move-out and listing-ready resets",
    "Post-construction final cleaning",
    "Small commercial detail projects"
  ],
  publicationStandardHeading: "What a future case study must include.",
  publicationStandardBody: [
    "Every published project should state the original condition, approved scope, important exclusions, work completed and documented exceptions. Before-and-after images must belong to Aseptaclean and have permission for public use.",
    "Until that proof exists, this page describes project types rather than pretending to be a portfolio."
  ]
} as const;

export const aboutPage = {
  slug: "/about/",
  seoTitle: "About Aseptaclean | Owner-Operated Property Cleaning",
  metaDescription:
    "Meet Matthew Ruiz and learn how Aseptaclean approaches cleaning and property clearing work.",
  eyebrow: "About Aseptaclean",
  h1: "A controlled-process mindset for properties that need careful decisions.",
  lead: "Aseptaclean is an owner-operated cleaning and property clearing business serving the South Bay and Peninsula.",
  founderHeading: "Matthew Ruiz stays close to the scope.",
  founderBody:
    "Matthew is directly involved in scope review, project planning and operating oversight. His background includes a B.S. in Biochemistry from UC Riverside, pharmaceutical manufacturing, and histology and surgical pathology.",
  operatingPrinciples: [
    {
      title: "Clear authority",
      body: "We identify who can approve contents decisions and scope changes."
    },
    {
      title: "Written boundaries",
      body: "Inclusions, exclusions and assumptions are written before scheduling."
    },
    {
      title: "Direct accountability",
      body: "You speak with the operator reviewing the property—not a distant call center."
    }
  ]
} as const;

export const faqPage = {
  slug: "/faq/",
  seoTitle: "Frequently Asked Questions | Aseptaclean",
  metaDescription:
    "Answers about Aseptaclean estimates, photos, scope, pricing, access and service boundaries.",
  eyebrow: "FAQ",
  h1: "Straight answers before the property is scheduled.",
  lead: "If a condition cannot be responsibly assessed online, we will say so.",
  items: [
    {
      question: "Can you assess a property from photos?",
      answer:
        "Photos can support an initial review or range when they clearly show every affected room, access, contents volume and condition. Larger or uncertain projects usually need a walkthrough before a firm quote."
    },
    {
      question: "Do you list prices online?",
      answer:
        "No. Property condition, contents, access, disposal needs, cleaning detail and deadline materially change the work. The agreed price is written after review."
    },
    {
      question: "Will you remove anything without approval?",
      answer:
        "No. The scope identifies keep, remove and review areas. Uncertain items are held for a decision."
    },
    {
      question: "Are you insured?",
      answer: "Yes. A certificate of insurance is available on request."
    },
    {
      question: "Do you handle hazardous or human biological material?",
      answer:
        "No. Human biological material, regulated medical waste, hazardous chemicals and other out-of-scope conditions are stopped and referred to an appropriate provider."
    },
    {
      question: "Do you perform repairs or demolition?",
      answer:
        "No. Aseptaclean is not a contractor. Structural work, demolition, pest treatment and specialty remediation are outside the current scope."
    },
    {
      question: "Can I manage the project remotely?",
      answer:
        "Often, yes. Access, decision authority, scope approvals, updates and closeout can be handled electronically when the project allows."
    },
    {
      question: "How soon will you respond?",
      answer:
        "Assessment requests are reviewed within one business day. Job scheduling depends on scope, access, labor and deadline."
    }
  ]
} as const;

export const contactPage = {
  slug: "/contact/",
  // Retitled 2026-08-18. The old "Request a Property Assessment | Aseptaclean" duplicated the
  // intent of /request-assessment/ and gave the two routes near-identical titles in the SERP,
  // so neither read as the contact page.
  seoTitle: "Contact Aseptaclean | San Jose Property Clearing",
  metaDescription:
    "Request an Aseptaclean cleaning or property clearing assessment in the South Bay and Peninsula.",
  eyebrow: "Contact",
  h1: "Start with the property details.",
  lead: "Share the city, approximate size, current condition, access and deadline. Clear photos help us decide whether a walkthrough is needed.",
  callNote: "For immediate questions about fit and timing.",
  // doc 27 §9.15.2 amendment 5 (approved 2026-08-18) — replaces "Send wide views and close
  // details of the affected areas."
  textNote: "Stand in the doorway and get the whole room, then step in close on the worst spots.",
  serviceAreaNote: "Availability depends on the address, scope and schedule."
} as const;
