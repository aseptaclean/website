// GENERATED FROM docs/27-COPY-CANONICAL.md §12–15 on 2026-08-16 — every string below is
// verbatim doc 27 copy, extracted mechanically rather than retyped so no sentence drifts in
// transcription. Slugs are docs/SITEMAP-MASTER.md's city-suffixed forms, not doc 27's bare
// routes (doc 19/master own URLs; doc 27 owns words — AGENTS.md §1 rank 6 over rank 7).
//
// H1s are NOT doc 27's — they are doc 19 §2.2's "target query + buyer's words", per the owner
// decision of 2026-08-17 ("high converting SEO"), which reversed the 2026-08-16 instruction to
// apply doc 27's literal service-name H1s. Doc 19 owns SEO and outranks doc 27 (AGENTS.md rank
// 6 > 7), so this restores the chain rather than overriding it. Doc 27's literal H1 is retained
// on every record as `doc27H1` — an audit field, deliberately never rendered, so the divergence
// stays visible. See docs/05-DECISIONS-LOG.md, "SEO/conversion pass on the doc 27 pages".
//
// Every page here ships noindex pending its own gate — see each `gate` field, and the
// noindex prop on the corresponding .astro route. The three specialty pages are gated on
// doc 27 §21's compliance-release inputs specifically; do not flip them without that record.

export interface Doc27ServicePage {
  readonly slug: string;
  readonly gate: string | null;
  /** Verbatim-mandatory organic-work clause; null where the page describes no organic work. */
  readonly complianceClause: string | null;
  /** True only when the page has no gate and no placeholder. Drives the noindex prop. */
  readonly indexable: boolean;
  /** doc 27's literal H1, retained so the SEO divergence stays auditable. */
  readonly doc27H1: string;
  /** Per-page overrides for ServicePageLayout's shared section framing. */
  readonly section: Readonly<Record<string, string>> | null;
  readonly eyebrow: string;
  readonly seoTitle: string;
  readonly metaDescription: string;
  readonly h1: string;
  readonly lead: string;
  readonly fitWhen: readonly string[];
  readonly outcomeHeading: string;
  readonly outcomeBody: string;
  readonly workIncludes: readonly string[];
  readonly quoteVariables: readonly string[];
  readonly boundaries: readonly string[];
  readonly faq: readonly { readonly question: string; readonly answer: string }[];
  readonly related: readonly { readonly label: string; readonly href: string | null }[];
}

export const deepCleaningPage: Doc27ServicePage = {
  slug: "/deep-cleaning-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "One-Time Deep Cleaning",
  section: {
    "fitHeading": "When a deep clean is the right scope",
    "scopeHeading": "What the written checklist covers",
    "scopeNote": "This is the itemized scope you would receive in writing before work begins. The signed scope controls the actual project.",
    "methodHeading": "The checklist is the product, not the adjective",
    "pricingHeading": "What moves a deep-cleaning price",
    "boundariesHeading": "What deep cleaning does not include",
    "faqHeading": "Questions about scope and scheduling",
    "relatedHeading": "If the property needs clearing first"
  },
  eyebrow: "Detailed Cleaning · San Jose & the South Bay",
  seoTitle: "Deep Cleaning Services in San Jose & the South Bay | Aseptaclean",
  metaDescription: "Detailed one-time deep cleaning for kitchens, bathrooms and whole homes in San Jose and Santa Clara County.",
  h1: "Deep cleaning in San Jose, defined room by room before anyone starts",
  lead: "For homes that need substantially more detail than routine housekeeping—especially kitchens, bathrooms, fixtures, edges and the areas that are usually skipped.",
  fitWhen: [
    "Routine cleaning is no longer enough",
    "Kitchen or bathroom buildup needs focused work",
    "The home needs a one-time reset",
    "You want the scope defined before the crew arrives"
  ],
  outcomeHeading: "A deeper reset with the details written down.",
  outcomeBody: "We do not rely on a vague label like “deep clean.” The quote identifies the rooms, surfaces and detail level so both sides know what completion means.",
  workIncludes: [
    "Detailed kitchen and bathroom cleaning",
    "Baseboards, reachable trim, doors and fixtures",
    "Shower glass, tile and surface buildup within cleanable limits",
    "Floors, edges and accessible areas beneath movable items",
    "Room-by-room work based on the approved scope"
  ],
  quoteVariables: [
    "Property size and number of rooms",
    "Current soil and buildup",
    "Access beneath or behind appliances",
    "Specialty finishes and delicate materials",
    "Deadline and desired outcome"
  ],
  boundaries: [
    "Permanent staining or surface damage",
    "Restoration, repair or refinishing",
    "Unapproved heavy contents removal",
    "Human biological material or regulated waste"
  ],
  faq: [
    { question: "Is this recurring housekeeping?", answer: "No. This page is for focused one-time deep cleaning. Recurring service can be discussed separately when capacity allows." },
    { question: "Do you move appliances?", answer: "Light, safely movable appliances may be included when access and flooring conditions allow. Gas-connected, built-in or unsafe items are excluded." }
  ],
  related: [
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" },
    { label: "Window Cleaning", href: "/window-cleaning-san-jose/" },
    { label: "Extreme-Condition Cleaning", href: "/extreme-cleaning-san-jose/" }
  ]
} as const;

export const moveOutCleaningPage: Doc27ServicePage = {
  slug: "/move-out-cleaning-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Move-In & Move-Out Cleaning",
  section: {
    "fitHeading": "When a move-out clean is the right scope",
    "scopeHeading": "What the move-out scope covers",
    "scopeNote": "Written before the crew arrives, so the final walkthrough is checked against a list instead of an opinion. The signed scope controls the actual project.",
    "methodHeading": "Five stages, closed out before the keys change hands",
    "pricingHeading": "What moves a move-out cleaning price",
    "boundariesHeading": "What move-out cleaning does not include",
    "faqHeading": "Questions tenants, owners and agents ask before scheduling",
    "relatedHeading": "If the unit still has contents in it"
  },
  eyebrow: "Detailed Cleaning · San Jose & the South Bay",
  seoTitle: "Move-In & Move-Out Cleaning in San Jose | Aseptaclean",
  metaDescription: "Move-out and move-in cleaning in San Jose and Santa Clara County, scoped in writing before the crew arrives and timed to your walkthrough date. Owner-operated.",
  h1: "Move-out cleaning in San Jose, timed to your walkthrough date",
  lead: "Vacant-property cleaning built around the handoff: keys, listing photos, a final walkthrough, a lease turnover or a clean start in a new home.",
  fitWhen: [
    "A property is vacant or nearly vacant",
    "A tenant or owner is preparing for handoff",
    "Cabinets, appliances and fixtures need detailing",
    "There is a firm move or listing deadline"
  ],
  outcomeHeading: "Cleaned for the next person—not merely touched up.",
  outcomeBody: "The work is organized around the property’s next event, with priority given to the rooms and surfaces that affect a walkthrough, listing or move-in.",
  workIncludes: [
    "Kitchen, bathroom and cabinet interiors",
    "Baseboards, doors, trim and reachable fixtures",
    "Interior glass and tracks when included",
    "Floor cleaning based on surface type",
    "Final-detail pass against the approved scope"
  ],
  quoteVariables: [
    "Square footage and occupancy status",
    "Cabinet, appliance and window count",
    "Condition left by the prior occupant",
    "Elevator, parking and access limits",
    "Turnover deadline"
  ],
  boundaries: [
    "Carpet extraction unless separately arranged",
    "Wall repair or paint correction",
    "Abandoned contents not included in the quote",
    "Damage caused by wear, staining or failed finishes"
  ],
  faq: [
    { question: "Does the home need to be empty?", answer: "Vacant properties are the best fit. Limited remaining contents can be discussed, but they affect access and price." },
    { question: "Can you work around a closing or lease deadline?", answer: "Sometimes. Availability depends on property size, condition and how soon the scope is approved." }
  ],
  // Doc 27 §12.2 relates this page to deep-cleaning, window and post-construction. All three
  // are noindex crew-gated drafts, which made this indexable page send 3 of 3 internal links
  // into drafts — route-audit failure mode #2. Doc 19 owns internal linking (rank 6 > 7), same
  // boundary as the H1 ruling, so the targets are the indexable clearing routes a vacating
  // owner actually needs next. Restore doc 27's set when those three are promoted.
  related: [
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" },
    { label: "Property Clearing", href: "/property-clearing/" }
  ]
} as const;

export const postConstructionPage: Doc27ServicePage = {
  slug: "/post-construction-cleaning-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Post-Construction Cleaning",
  section: null,
  eyebrow: "Detailed Cleaning · San Jose & the South Bay",
  seoTitle: "Post-Construction Cleaning in San Jose | Aseptaclean",
  metaDescription: "Post-construction and post-remodel cleaning for completed projects in San Jose and Santa Clara County.",
  h1: "Post-construction cleaning in San Jose, after the trades are done",
  lead: "Detailed removal of settled construction dust and surface residue after repairs or remodeling are complete and the trades are out of the work area.",
  fitWhen: [
    "Renovation dust remains on horizontal surfaces",
    "Cabinets, fixtures and floors need a final detail",
    "The construction work is substantially complete",
    "The property must be prepared for occupancy or presentation"
  ],
  outcomeHeading: "A final-clean scope for completed renovation work.",
  outcomeBody: "Post-construction cleaning is priced differently from ordinary house cleaning because fine dust travels, resettles and requires a deliberate top-to-bottom sequence.",
  workIncludes: [
    "Controlled dry removal of fine settled dust",
    "Detailed wiping of reachable surfaces and fixtures",
    "Cabinet, trim, ledge and baseboard detailing",
    "Interior glass cleaning when included",
    "Final floor cleaning appropriate to the surface"
  ],
  quoteVariables: [
    "Project size and construction type",
    "Whether trades are fully finished",
    "Amount and distribution of fine dust",
    "Height, access and glass quantity",
    "Protective films, stickers or adhesive residue"
  ],
  boundaries: [
    "Active construction areas",
    "Paint, grout, concrete or adhesive correction",
    "High-access exterior work without approved equipment",
    "Contractor punch-list or structural work"
  ],
  faq: [
    { question: "Can cleaning start while contractors are still working?", answer: "A rough pass may be possible, but the final clean should happen after dusty trades finish and the work area is released." },
    { question: "Do you remove paint or hardened construction residue?", answer: "Only when the material and surface can be handled safely and the task is specifically included. Surface correction is not assumed." }
  ],
  related: [
    { label: "Window Cleaning", href: "/window-cleaning-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" }
  ]
} as const;

export const windowCleaningPage: Doc27ServicePage = {
  slug: "/window-cleaning-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Window Cleaning",
  section: null,
  eyebrow: "Detailed Cleaning · San Jose & the South Bay",
  seoTitle: "Interior Window Cleaning in San Jose | Aseptaclean",
  metaDescription: "Interior and accessible window cleaning for homes, turnovers and post-construction projects in Santa Clara County.",
  h1: "Window cleaning in San Jose, tracks and frames included",
  lead: "Detail cleaning for interior glass, frames, sills and accessible tracks as a standalone project or part of a larger property reset.",
  fitWhen: [
    "Interior glass is hazy or marked",
    "A move or listing requires clearer windows",
    "Remodeling left dust on glass and frames",
    "Tracks and sills need detailed attention"
  ],
  outcomeHeading: "Clearer glass with the frames and tracks accounted for.",
  outcomeBody: "The quote separates glass, screens, frames and tracks so you are not comparing an exterior wash with a detailed interior-window service.",
  workIncludes: [
    "Interior glass cleaning",
    "Reachable frames and sills",
    "Accessible track vacuuming and wiping",
    "Spot detailing around latches and edges",
    "Exterior ground-level glass when specifically approved"
  ],
  quoteVariables: [
    "Window count, size and configuration",
    "Interior versus exterior access",
    "Screens, tracks and divided panes",
    "Construction residue or mineral deposits",
    "Height and safe ladder access"
  ],
  boundaries: [
    "Unsafe roof or high-ladder access",
    "Glass restoration or scratch removal",
    "Failed seals or permanent mineral etching",
    "Removal of materials that could damage glass or film"
  ],
  faq: [
    { question: "Do you clean exterior windows?", answer: "Ground-level and safely accessible exterior windows may be included. High-access work is reviewed separately and may be referred." },
    { question: "Can you remove hard-water spots?", answer: "Light deposits may improve, but mineral restoration and etched glass require a different process and are not promised as standard cleaning." }
  ],
  related: [
    { label: "One-Time Deep Cleaning", href: "/deep-cleaning-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" },
    { label: "Post-Construction Cleaning", href: "/post-construction-cleaning-san-jose/" }
  ]
} as const;

export const extremeCleaningPage: Doc27ServicePage = {
  slug: "/extreme-cleaning-san-jose/",
  gate: null,
  complianceClause: "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
  indexable: true,
  doc27H1: "Extreme-Condition Cleaning",
  section: null,
  eyebrow: "Specialty Cleaning · San Jose & the South Bay",
  seoTitle: "Extreme-Condition Cleaning in San Jose | Aseptaclean",
  metaDescription: "Planned cleaning for heavily soiled and difficult-property conditions in San Jose and Santa Clara County.",
  h1: "Extreme cleaning in San Jose for conditions that need a walkthrough first",
  lead: "For heavily soiled properties where routine cleaning is unrealistic and the work needs condition review, priorities, exclusions and a controlled scope.",
  fitWhen: [
    "Multiple rooms have severe buildup",
    "Access is limited by contents or condition",
    "The property needs staged recovery",
    "A normal cleaning quote would be unreliable"
  ],
  outcomeHeading: "A difficult property broken into controllable work.",
  outcomeBody: "The goal is not to hide the condition behind a generic cleaning package. We identify the priority areas, define what can be safely handled and document what remains outside scope.",
  workIncludes: [
    "Condition-based work plan",
    "Priority-area cleaning",
    "Heavy soil removal within current scope",
    "Approved contents handling",
    "Progress checkpoints for multi-stage work"
  ],
  quoteVariables: [
    "Severity and affected square footage",
    "Contents volume and access",
    "Waste type and disposal requirements",
    "Utilities, ventilation and occupancy",
    "Crew size and project duration"
  ],
  boundaries: [
    "Human biological material or trauma scenes",
    "Regulated medical or hazardous waste",
    "Structural repair, demolition or pest treatment",
    "Conditions outside current training, insurance or lawful scope"
  ],
  faq: [
    { question: "Can you quote this from photos?", answer: "Photos can support an initial range. Severe or complicated conditions usually require an in-person walkthrough before a firm scope." },
    { question: "Is every extreme-condition job accepted?", answer: "No. We decline or refer conditions that exceed our current legal, insurance, training or equipment scope." }
  ],
  related: [
    { label: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
    { label: "Property Cleanouts", href: "/property-cleanouts-san-jose/" },
    { label: "Animal Waste Cleanup", href: "/animal-waste-cleanup-san-jose/" }
  ]
} as const;

export const animalPage: Doc27ServicePage = {
  slug: "/animal-waste-cleanup-san-jose/",
  gate: "Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.",
  complianceClause: "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
  indexable: false,
  doc27H1: "Animal Waste Cleanup",
  section: null,
  eyebrow: "Specialty Cleaning · San Jose & the South Bay",
  seoTitle: "Animal Waste Cleanup in San Jose | Aseptaclean",
  metaDescription: "Non-human animal waste cleanup for accepted residential and property conditions in Santa Clara County.",
  h1: "Animal waste cleanup in San Jose, handled without judgment",
  lead: "Condition-based cleanup for accepted non-human animal waste, odor sources and heavily affected surfaces after the animal issue is controlled.",
  fitWhen: [
    "Pet waste affects floors or hard surfaces",
    "A vacant property has animal-related soil",
    "The source is non-human and can be safely accessed",
    "The scope needs separation from pest or repair work"
  ],
  outcomeHeading: "Cleanup after the animal source is controlled.",
  outcomeBody: "We separate cleaning from pest treatment, veterinary issues and structural replacement. The quote covers only the surfaces and materials we can reasonably clean within the approved scope.",
  workIncludes: [
    "Initial condition and material review",
    "Removal of accepted surface waste",
    "Cleaning of approved nonporous surfaces",
    "Odor-source reduction within cleanable materials",
    "Bagging and staging as defined in the scope"
  ],
  quoteVariables: [
    "Waste type, amount and age",
    "Porous versus nonporous surfaces",
    "Affected rooms and contents",
    "Ventilation and safe access",
    "Disposal path and local requirements"
  ],
  boundaries: [
    "Live animal handling or pest control",
    "Human waste or human biological material",
    "Removal of contaminated structural materials",
    "Guaranteed odor removal from damaged porous materials"
  ],
  faq: [
    { question: "Do you remove live animals?", answer: "No. Animal control or a pest professional must address live animals and active entry before cleanup." },
    { question: "Will the odor be completely gone?", answer: "Not always. Waste absorbed into subfloor, drywall or other porous materials may require removal or repair by an appropriate provider." }
  ],
  related: [
    { label: "Rodent Dropping Cleanup", href: "/rodent-dropping-cleanup-san-jose/" },
    { label: "Pigeon Dropping Cleanup", href: "/pigeon-dropping-cleanup-san-jose/" },
    { label: "Extreme-Condition Cleaning", href: "/extreme-cleaning-san-jose/" }
  ]
} as const;

export const rodentPage: Doc27ServicePage = {
  slug: "/rodent-dropping-cleanup-san-jose/",
  gate: "Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.",
  complianceClause: "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
  indexable: false,
  doc27H1: "Rodent Dropping Cleanup",
  section: null,
  eyebrow: "Specialty Cleaning · San Jose & the South Bay",
  seoTitle: "Rodent Dropping Cleanup in San Jose | Aseptaclean",
  metaDescription: "Condition-reviewed rodent dropping cleanup for homes and properties across Santa Clara County.",
  h1: "Rodent dropping cleanup in San Jose, after pest control has done its part",
  lead: "Cleanup of accepted rodent-dropping conditions after active pest control and entry-point work are handled by the appropriate provider.",
  fitWhen: [
    "Droppings remain after pest activity",
    "The affected areas can be safely accessed",
    "Pest control has addressed the active source",
    "The property needs a written cleanup scope"
  ],
  outcomeHeading: "Cleanup separated from pest control and construction.",
  outcomeBody: "Aseptaclean defines the cleanable surfaces and affected areas. Extermination, exclusion, insulation and structural work remain separate trades.",
  workIncludes: [
    "Affected-area review and work-zone planning",
    "Controlled collection using appropriate wet methods",
    "Cleaning of approved accessible surfaces",
    "Contents handling when specifically included",
    "Final visual review against the scope"
  ],
  quoteVariables: [
    "Extent and age of contamination",
    "Attic, crawlspace or living-area access",
    "Insulation and porous materials",
    "Contents volume",
    "Pest-control status"
  ],
  boundaries: [
    "Pest extermination or entry-point sealing",
    "Insulation removal or replacement",
    "Structural demolition or repair",
    "Conditions requiring a different regulated remediation provider"
  ],
  faq: [
    { question: "Should pest control come first?", answer: "Yes. Active infestation and entry points should be addressed before final cleanup so the condition does not immediately return." },
    { question: "Do you remove attic insulation?", answer: "No. Insulation removal and replacement are outside this cleaning scope and may require an appropriately licensed provider." }
  ],
  related: [
    { label: "Animal Waste Cleanup", href: "/animal-waste-cleanup-san-jose/" },
    { label: "Pigeon Dropping Cleanup", href: "/pigeon-dropping-cleanup-san-jose/" },
    { label: "Extreme-Condition Cleaning", href: "/extreme-cleaning-san-jose/" }
  ]
} as const;

export const pigeonPage: Doc27ServicePage = {
  slug: "/pigeon-dropping-cleanup-san-jose/",
  gate: "Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.",
  complianceClause: "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
  indexable: false,
  doc27H1: "Pigeon Dropping Cleanup",
  section: null,
  eyebrow: "Specialty Cleaning · San Jose & the South Bay",
  seoTitle: "Pigeon Dropping Cleanup in San Jose | Aseptaclean",
  metaDescription: "Condition-reviewed pigeon dropping cleanup for accessible residential and commercial property areas in Santa Clara County.",
  h1: "Pigeon dropping cleanup in San Jose for balconies, roofs and entryways",
  lead: "Cleanup for accepted pigeon-dropping conditions on safely accessible surfaces after roosting, exclusion and active bird issues are addressed.",
  fitWhen: [
    "Droppings affect an accessible balcony or surface",
    "The active bird source has been addressed",
    "The work area can be controlled",
    "The property needs a defined cleaning scope"
  ],
  outcomeHeading: "A controlled cleanup plan for accessible affected areas.",
  outcomeBody: "The assessment determines whether the work can be handled as cleaning or needs a specialized access, bird-control or remediation provider.",
  workIncludes: [
    "Condition and access review",
    "Controlled wet cleanup of accepted deposits",
    "Cleaning of approved nonporous surfaces",
    "Bagging and staging as defined",
    "Work-area closeout review"
  ],
  quoteVariables: [
    "Deposit amount and affected surface",
    "Height and fall exposure",
    "Ventilation and public access",
    "Surface porosity and damage",
    "Bird-exclusion status"
  ],
  boundaries: [
    "Bird removal, trapping or exclusion",
    "Roof work or unsafe high access",
    "Structural repair or damaged-material replacement",
    "Conditions beyond current equipment or regulatory scope"
  ],
  faq: [
    { question: "Do you install bird spikes or exclusion systems?", answer: "No. Bird exclusion is separate from cleanup and should be completed by the appropriate provider." },
    { question: "Can you clean a roof?", answer: "Only safely accessible areas are considered. Roof and high-access conditions may be declined or referred." }
  ],
  related: [
    { label: "Animal Waste Cleanup", href: "/animal-waste-cleanup-san-jose/" },
    { label: "Rodent Dropping Cleanup", href: "/rodent-dropping-cleanup-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" }
  ]
} as const;

export const propertyCleanoutsPage: Doc27ServicePage = {
  slug: "/property-cleanouts-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Property Cleanouts",
  section: {
    "fitHeading": "When a property cleanout is the right scope",
    "scopeHeading": "What a property cleanout covers",
    "scopeNote": "Clearing and any cleaning that follows are defined together in one signed scope, so the property is not handed between two vendors.",
    "methodHeading": "One vendor, one scope, one closeout record for the file",
    "pricingHeading": "What moves a cleanout price",
    "boundariesHeading": "What a cleanout does not include",
    "faqHeading": "Questions owners and managers ask first",
    "relatedHeading": "If the situation is an estate or a hoarding condition"
  },
  eyebrow: "Property Clearing · San Jose & the South Bay",
  seoTitle: "Property Cleanout Services in San Jose | Aseptaclean",
  metaDescription: "Planned property cleanouts for homes, rentals and difficult properties across Santa Clara County.",
  h1: "Property cleanouts in San Jose that keep a vacancy on schedule",
  lead: "Structured clearing for properties with unwanted contents, debris or accumulated material—organized around access, decision rights and the next use of the property.",
  fitWhen: [
    "A property cannot be cleaned until contents are cleared",
    "Items must be separated into keep, remove and uncertain",
    "A landlord or owner needs a turnover plan",
    "The volume requires staging or container coordination"
  ],
  outcomeHeading: "A property cleared with decisions made before removal.",
  outcomeBody: "Cleanouts go wrong when every item is treated as trash. We define authority, sorting rules, staging and disposal before the crew begins.",
  workIncludes: [
    "Walkthrough and contents-volume review",
    "Defined keep, remove and do-not-touch zones",
    "Bagging, sorting and staging",
    "Container or approved disposal coordination",
    "Optional cleaning after clearing"
  ],
  quoteVariables: [
    "Volume, weight and material types",
    "Stairs, elevators and loading access",
    "Decision-maker availability",
    "Container and disposal requirements",
    "Cleaning required after removal"
  ],
  boundaries: [
    "Unknown hazardous materials",
    "Documents, valuables or keepsakes without direction",
    "Structural demolition",
    "Unpermitted hauling or disposal"
  ],
  faq: [
    { question: "Do you haul everything away yourself?", answer: "Disposal may use containers or appropriate third-party providers depending on the city, volume and material type." },
    { question: "Can cleaning be added after the cleanout?", answer: "Yes. A separate cleaning phase can be scoped once surfaces and rooms become accessible." }
  ],
  related: [
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" }
  ]
} as const;

export const hoardingPage: Doc27ServicePage = {
  slug: "/hoarding-cleanup-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Hoarding Cleanup",
  section: {
    "fitHeading": "When families call us about a hoarding condition",
    "scopeHeading": "What hoarding cleanup covers",
    "scopeNote": "Nothing leaves without written approval. Items anyone is unsure about go to a review category and stay there until someone decides.",
    "methodHeading": "Five stages, so nobody has to decide everything at once",
    "pricingHeading": "What moves the price on a heavy-contents property",
    "boundariesHeading": "Conditions we stop on and refer out",
    "faqHeading": "Questions families ask before requesting a plan",
    "relatedHeading": "If this is also an estate or a landlord turnover"
  },
  eyebrow: "Property Clearing · San Jose & the South Bay",
  seoTitle: "Hoarding Cleanup in San Jose | Aseptaclean",
  metaDescription: "Structured hoarding cleanup and property clearing for accepted non-human conditions in Santa Clara County.",
  h1: "Hoarding cleanup in San Jose, without throwing away what matters",
  lead: "A staged clearing and cleaning process for heavily accumulated properties, with decisions, priorities and boundaries established before items are moved.",
  fitWhen: [
    "Accumulated contents block rooms or pathways",
    "A family or owner needs a staged plan",
    "Items require keep/remove review",
    "Cleaning cannot begin until access is restored"
  ],
  outcomeHeading: "Progress without treating the property like a dumpster.",
  outcomeBody: "The work is divided into zones and decisions. That protects important items, keeps the crew productive and makes the next phase of cleaning possible.",
  workIncludes: [
    "Condition and access walkthrough",
    "Keep, remove and review categories",
    "Room-by-room clearing plan",
    "Bagging, staging and disposal coordination",
    "Cleaning of released areas when included"
  ],
  quoteVariables: [
    "Volume and density of contents",
    "Decision-making requirements",
    "Waste types and pests",
    "Utilities and safe access",
    "Number of stages and crew days"
  ],
  boundaries: [
    "Forced removal without authorized direction",
    "Human biological material or regulated waste",
    "Pest treatment or structural repair",
    "Unknown chemicals, weapons or hazardous materials"
  ],
  faq: [
    { question: "Do you throw everything away?", answer: "No. Removal rules are agreed in advance, and uncertain items can be placed in a review area for the authorized decision-maker." },
    { question: "Can the cleanup happen in stages?", answer: "Yes. Staging is often the safest and most practical approach for dense or emotionally difficult properties." }
  ],
  related: [
    { label: "Property Cleanouts", href: "/property-cleanouts-san-jose/" },
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Extreme-Condition Cleaning", href: "/extreme-cleaning-san-jose/" }
  ]
} as const;

export const estatePage: Doc27ServicePage = {
  slug: "/estate-cleanout-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Estate Cleanouts",
  section: {
    "fitHeading": "When an estate cleanout is the right next step",
    "scopeHeading": "What an estate cleanout covers",
    "scopeNote": "Keep, remove and review are decided once, in writing, instead of being re-decided every time someone new walks through the property.",
    "methodHeading": "Five stages, one accountable operator, one record for the estate file",
    "pricingHeading": "What moves the price on an estate property",
    "boundariesHeading": "What an estate cleanout does not include",
    "faqHeading": "Questions families and executors ask before requesting a plan",
    "relatedHeading": "If the property also needs cleaning or has heavy accumulation"
  },
  eyebrow: "Property Clearing · San Jose & the South Bay",
  seoTitle: "Estate Cleanout Services in San Jose | Aseptaclean",
  metaDescription: "Estate cleanout, contents clearing and follow-on cleaning across San Jose and Santa Clara County.",
  h1: "Estate cleanout in San Jose without deciding everything today",
  lead: "A deliberate process for sorting, staging and clearing estate contents before sale, transfer, renovation or family handoff.",
  fitWhen: [
    "A family or representative is managing estate contents",
    "Items must be separated before removal",
    "The property is being prepared for sale or transfer",
    "Cleaning is needed after rooms are cleared"
  ],
  outcomeHeading: "A respectful clearout built around authority and decisions.",
  outcomeBody: "The person authorizing removal identifies what must be preserved. The scope then separates sorting, staging, disposal and final cleaning.",
  workIncludes: [
    "Authorized decision-maker walkthrough",
    "Keep, donate, remove and review zones",
    "Contents staging and bagging",
    "Container or disposal coordination",
    "Optional post-clearout cleaning"
  ],
  quoteVariables: [
    "Property and contents volume",
    "Required sorting detail",
    "Stairs, access and parking",
    "Donation or disposal instructions",
    "Deadline for sale or handoff"
  ],
  boundaries: [
    "Valuation, appraisal or estate-sale services",
    "Legal decisions about ownership",
    "Removal without authorized direction",
    "Hazardous materials or structural work"
  ],
  faq: [
    { question: "Do you buy or appraise estate items?", answer: "No. Appraisal, resale and estate-sale services are separate. We follow the authorized sorting and removal plan." },
    { question: "Can you clean the home afterward?", answer: "Yes. Move-out or detailed cleaning can be added after the rooms are cleared and accessible." }
  ],
  related: [
    { label: "Property Cleanouts", href: "/property-cleanouts-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" }
  ]
} as const;

export const debrisRemovalPage: Doc27ServicePage = {
  slug: "/debris-removal-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Debris Removal",
  section: null,
  eyebrow: "Property Clearing · San Jose & the South Bay",
  seoTitle: "Property Debris Removal in San Jose | Aseptaclean",
  metaDescription: "Property debris removal, staging and disposal coordination for accepted materials in Santa Clara County.",
  h1: "Debris removal in San Jose for whole-property projects",
  lead: "Removal planning for loose, non-hazardous property debris that must be cleared before cleaning, turnover or the next phase of work.",
  fitWhen: [
    "Loose debris blocks cleaning or access",
    "A turnover left approved discard material",
    "A container or disposal route must be planned",
    "The material can be identified before removal"
  ],
  outcomeHeading: "Debris removed through a defined and legal disposal plan.",
  outcomeBody: "The quote separates labor, containers, third-party hauling and follow-on cleaning so disposal costs are not hidden inside a vague cleanout number.",
  workIncludes: [
    "Material and volume review",
    "Bagging and staging of approved debris",
    "Loading coordination",
    "Container or appropriate hauler coordination",
    "Broom-clean or detailed cleaning when included"
  ],
  quoteVariables: [
    "Material type, weight and volume",
    "Distance from debris to loading area",
    "Stairs, elevators and parking",
    "Container fees and local rules",
    "Labor required for sorting"
  ],
  boundaries: [
    "Hazardous or unknown materials",
    "Construction demolition",
    "Unpermitted transport or disposal",
    "Items not authorized for removal"
  ],
  faq: [
    { question: "Are disposal fees included?", answer: "The written quote states whether container, facility or third-party hauling fees are included, estimated or billed separately." },
    { question: "Do you take hazardous materials?", answer: "No. Unknown chemicals, regulated waste and other hazardous materials require an appropriate disposal provider." }
  ],
  related: [
    { label: "Property Cleanouts", href: "/property-cleanouts-san-jose/" },
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Eviction Cleanouts", href: "/eviction-cleanout-san-jose/" }
  ]
} as const;

export const evictionCleanoutPage: Doc27ServicePage = {
  slug: "/eviction-cleanout-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Eviction Cleanouts",
  section: null,
  eyebrow: "Property Clearing · San Jose & the South Bay",
  seoTitle: "Eviction Cleanout Services in San Jose | Aseptaclean",
  metaDescription: "Eviction cleanout and turnover cleaning for property owners and managers in Santa Clara County.",
  h1: "Eviction cleanouts in San Jose, documented for the owner file",
  lead: "Contents clearing and cleaning after lawful possession has been restored and the property owner or manager has authority to direct removal.",
  fitWhen: [
    "Possession has been lawfully returned",
    "Abandoned contents require authorized handling",
    "The unit needs clearing before repairs or turnover",
    "A deadline is tied to re-rental or inspection"
  ],
  outcomeHeading: "A cleanout that begins only after authority is clear.",
  outcomeBody: "Aseptaclean does not decide what is legally abandoned. The authorized owner or manager provides direction; we then execute the approved clearing and cleaning scope.",
  workIncludes: [
    "Authorized walkthrough and documentation",
    "Approved contents bagging and staging",
    "Debris and container coordination",
    "Condition-based cleaning after access is restored",
    "Scope changes documented when hidden conditions appear"
  ],
  quoteVariables: [
    "Contents and debris volume",
    "Legal authorization and removal instructions",
    "Property condition and pests",
    "Access, elevators and parking",
    "Turnover deadline"
  ],
  boundaries: [
    "Legal eviction activity or tenant communication",
    "Removal before lawful possession",
    "Unknown hazardous materials",
    "Repairs, demolition or pest treatment"
  ],
  faq: [
    { question: "Can you remove items before the eviction is complete?", answer: "No. The owner or manager must confirm lawful possession and authority before contents are handled." },
    { question: "Can you clean after the unit is emptied?", answer: "Yes. Turnover cleaning can be included as a second phase after access to surfaces is restored." }
  ],
  related: [
    { label: "Property Cleanouts", href: "/property-cleanouts-san-jose/" },
    { label: "Debris Removal", href: "/debris-removal-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" }
  ]
} as const;

export const commercialPage: Doc27ServicePage = {
  slug: "/commercial-cleaning-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Commercial & Janitorial Cleaning",
  section: null,
  eyebrow: "Commercial · San Jose & the South Bay",
  seoTitle: "Commercial Janitorial Cleaning in San Jose | Aseptaclean",
  metaDescription: "Project-based and select recurring commercial janitorial cleaning for small facilities in Santa Clara County.",
  h1: "Commercial cleaning in San Jose with a scope you can inspect",
  lead: "Defined cleaning programs for small commercial properties that need reliable scope, clear frequencies and direct owner communication.",
  fitWhen: [
    "A small facility needs a written cleaning scope",
    "The current service misses important details",
    "A one-time commercial deep clean is needed",
    "Management wants one accountable point of contact"
  ],
  outcomeHeading: "A commercial scope that can actually be inspected.",
  outcomeBody: "The agreement identifies frequencies, areas and periodic tasks. That prevents the common failure where every expectation is buried under the word “janitorial.”",
  workIncludes: [
    "Restroom and break-area cleaning",
    "Touchpoint and common-area cleaning",
    "Floor care within the agreed method",
    "Waste removal to onsite receptacles",
    "Periodic detail tasks when scheduled"
  ],
  quoteVariables: [
    "Facility type and square footage",
    "Frequency and service window",
    "Occupancy and security requirements",
    "Consumables and onsite equipment",
    "Floor types and periodic tasks"
  ],
  boundaries: [
    "Clinical infection-control programs unless separately qualified",
    "Industrial production cleaning",
    "High-access exterior work",
    "Repairs, pest control or regulated waste"
  ],
  faq: [
    { question: "Do you offer nightly janitorial service?", answer: "Select schedules may be available depending on location, facility type, service window and current capacity." },
    { question: "Do you provide supplies?", answer: "Cleaning supplies can be included. Paper goods, liners and client consumables are defined separately in the proposal." }
  ],
  related: [
    { label: "One-Time Deep Cleaning", href: "/deep-cleaning-san-jose/" },
    { label: "Post-Construction Cleaning", href: "/post-construction-cleaning-san-jose/" },
    { label: "Window Cleaning", href: "/window-cleaning-san-jose/" }
  ]
} as const;
