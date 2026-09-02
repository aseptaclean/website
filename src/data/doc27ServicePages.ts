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
  /**
   * Per-page overrides for ServicePageLayout's shared section framing.
   *
   * Recognised keys: `fitHeading` · `scopeHeading` · `scopeNote` · `methodHeading` ·
   * `pricingHeading` · `boundariesHeading` · `faqHeading` · `relatedHeading`, and — added
   * 2026-08-21 — `pledge` · `scopeFooter` · `quoteHeading` · `quoteLede` · `stepsHeading`.
   *
   * The five new keys exist because those five strings were hardcoded in the layout and therefore
   * identical on all fourteen pages. A record supplies one only where the page has something
   * specific to say; the layout's defaults cover the rest, so the template still works with
   * `section: null`. Do not fill all five on every page just because they exist — a page whose
   * pricing genuinely has nothing distinctive to say should inherit the default.
   */
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
  /**
   * Optional link to an ungated resource asset. Deliberately NOT part of `related`: that block
   * renders under "Often booked alongside", and the checklist is not booked — it is a free
   * document a reader can print or forward without contacting anyone. Only set where doc 19 §2's
   * linking rules put the asset. Added 2026-08-20 with the checklist launch (P9 row 10).
   */
  readonly resource?: {
    readonly label: string;
    readonly href: string;
    readonly note: string;
  };
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
    "relatedHeading": "If the property needs clearing first",
    "pledge": "Every room on the list, and what clean means for each one, agreed in writing first.",
    "scopeFooter": "If it is on the checklist it gets done. If it is not on the checklist, that is the conversation to have now rather than at the end.",
    "quoteHeading": "Size sets the floor. Condition sets the price.",
    "quoteLede": "Photos of the kitchen and the bathrooms tell us most of what we need. Square footage on its own rarely does."
  },
  eyebrow: "Detailed Cleaning · South Bay & Peninsula",
  seoTitle: "Deep Cleaning Services in San Jose | Aseptaclean",
  metaDescription: "One-time deep cleaning for kitchens, bathrooms and whole homes in the South Bay & Peninsula — quoted room by room from a written checklist, not a package.",
  h1: "Deep cleaning in San Jose, defined room by room before anyone starts",
  lead: "For homes that need substantially more detail than routine housekeeping—especially kitchens, bathrooms, fixtures, edges and the areas that are usually skipped.",
  fitWhen: [
    "Routine cleaning is no longer enough",
    "Kitchen or bathroom buildup needs focused work",
    "The home needs a one-time reset",
    "You want the scope defined before the crew arrives"
  ],
  outcomeHeading: "A deeper reset with the details written down.",
  // doc 27 §9.15.2 amendment 4 (approved 2026-08-18) — replaces "The quote identifies the
  // rooms, surfaces and detail level so both sides know what completion means."
  outcomeBody: "We do not rely on a vague label like “deep clean.” The quote lists the rooms, the surfaces, and the detail level — so when we say finished, you and we are reading the same page.",
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
  // Doc 27 §12.1's third relation is window-cleaning, still a crew-gated noindex draft; swapped
  // for the indexable category hub (route-audit failure mode #2). Restore when window is promoted.
  related: [
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" },
    { label: "Detailed Cleaning", href: "/detailed-cleaning/" },
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
    "relatedHeading": "If the unit still has contents in it",
    "pledge": "Scoped against your walkthrough date, not a generic turnover checklist.",
    "quoteHeading": "Priced on what the last occupant left behind.",
    "quoteLede": "Square footage, the date it has to be done, and how the place was left. Photos of the kitchen and bathrooms settle most of the rest.",
    "scopeFooter": "The list is what the walkthrough gets checked against, which is the point of writing it down before the keys change hands."
  },
  eyebrow: "Detailed Cleaning · South Bay & Peninsula",
  seoTitle: "Move-In & Move-Out Cleaning in San Jose | Aseptaclean",
  metaDescription: "Move-out and move-in cleaning in the South Bay & Peninsula, scoped in writing before the crew arrives and timed to your walkthrough date. Owner-operated.",
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
    { label: "Complex Property Cleanup", href: "/property-clearing/" }
  ]
} as const;

export const postConstructionPage: Doc27ServicePage = {
  slug: "/post-construction-cleaning-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Post-Construction Cleaning",
  section: null,
  eyebrow: "Detailed Cleaning · South Bay & Peninsula",
  seoTitle: "Post-Construction Cleaning in San Jose | Aseptaclean",
  metaDescription: "Post-construction and post-remodel cleaning for completed projects in the South Bay & Peninsula.",
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
  eyebrow: "Detailed Cleaning · South Bay & Peninsula",
  seoTitle: "Interior Window Cleaning in San Jose | Aseptaclean",
  metaDescription: "Interior and accessible window cleaning for homes, turnovers and post-construction projects in the South Bay & Peninsula.",
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
  section: {
    "fitHeading": "When a property has moved past what routine cleaning can reach",
    "scopeHeading": "What an extreme-condition scope covers",
    "scopeNote": "Priority areas are named and sequenced in writing, and anything outside the accepted scope is written down as an exclusion rather than discovered mid-job.",
    "methodHeading": "Five stages, with checkpoints between them on a multi-day property",
    "pricingHeading": "What moves the price on a severe-condition property",
    "boundariesHeading": "Conditions we stop on and refer out",
    "faqHeading": "Questions asked before a walkthrough is scheduled",
    "relatedHeading": "If the condition is really a contents problem",
    "pledge": "Nobody should quote a property like this over the phone. We look first, then put it in writing.",
    "scopeFooter": "Priority areas get named and sequenced. Anything we cannot take on is written down as an exclusion now, not discovered on day three.",
    "quoteHeading": "Severity and access, far more than square footage.",
    "quoteLede": "Send whatever photos you are comfortable sending. On a property in this condition we will almost always want to walk it before quoting a firm number."
  },
  eyebrow: "Specialty Cleaning · South Bay & Peninsula",
  seoTitle: "Extreme-Condition Cleaning in San Jose | Aseptaclean",
  metaDescription: "Condition-reviewed cleaning for heavily soiled San Jose properties. Priorities, exclusions and price agreed in writing before work — no package guesswork.",
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
  // Doc 27 §13.1 relates this to property-cleanouts (crew-gated draft) and animal-waste
  // (doc 27 §21 compliance gate). Both removed from this INDEXABLE page: the first is
  // route-audit failure mode #2, and the second put a §21-gated service on an indexable
  // surface — the same reasoning that keeps /specialty-cleaning/ noindex (log, 2026-08-17).
  // Whether animal-waste may be advertised from an indexable page is an owner/COI call, not
  // a copy call; restore the doc 27 set once §21 clears.
  related: [
    { label: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Complex Property Cleanup", href: "/property-clearing/" }
  ]
} as const;

export const animalPage: Doc27ServicePage = {
  slug: "/animal-waste-cleanup-san-jose/",
  gate: "Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.",
  complianceClause: "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
  indexable: false,
  doc27H1: "Animal Waste Cleanup",
  section: null,
  eyebrow: "Specialty Cleaning · South Bay & Peninsula",
  seoTitle: "Animal Waste Cleanup in San Jose | Aseptaclean",
  metaDescription: "Non-human animal waste cleanup for accepted residential and property conditions in the South Bay & Peninsula.",
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
  eyebrow: "Specialty Cleaning · South Bay & Peninsula",
  seoTitle: "Rodent Dropping Cleanup in San Jose | Aseptaclean",
  metaDescription: "Condition-reviewed rodent dropping cleanup for homes and properties across the South Bay & Peninsula.",
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
  eyebrow: "Specialty Cleaning · South Bay & Peninsula",
  seoTitle: "Pigeon Dropping Cleanup in San Jose | Aseptaclean",
  metaDescription: "Condition-reviewed pigeon dropping cleanup for accessible residential and commercial property areas in the South Bay & Peninsula.",
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
    "relatedHeading": "If the situation is an estate or a hoarding condition",
    "pledge": "Keep, remove and review are agreed before a single box moves.",
    "quoteHeading": "Volume, access, and how much sorting it takes.",
    "quoteLede": "A unit you can walk through prices differently from one you cannot. A photo from the doorway of each room is the fastest way to tell us which one this is.",
    "scopeFooter": "Keep, remove and do-not-touch are settled in the scope, so nobody on site is deciding on the day what your tenant’s belongings were."
  },
  eyebrow: "Complex Property Cleanup · South Bay & Peninsula",
  seoTitle: "Property Cleanout Services in San Jose | Aseptaclean",
  metaDescription: "Property cleanouts in the South Bay & Peninsula. Keep, remove and review are agreed in writing — nothing leaves the property without your approval.",
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
    "Sorting, bagging, staging and clearing rooms out",
    "Container coordination and loading, where a container is part of the job",
    "Cleaning after clearing, when you want it in the same scope"
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
    "Transporting the load off-site — that is the authorized hauler's"
  ],
  // 2026-08-21. The old first answer — "Disposal may use containers or appropriate third-party
  // providers depending on the city, volume and material type." — answered a yes/no question
  // without saying yes or no, on the page where the question gets asked most. It now starts with
  // the word "No" and then describes what we do instead, which is most of the job.
  faq: [
    { question: "Do you haul everything away yourself?", answer: "No. We are not a hauling company and nothing leaves the property in our vehicles. We do the on-site work — sorting, bagging, staging, carrying it out, loading the container — and we arrange that container through whichever provider your city authorizes, including where it is allowed to sit and what the disposal rules are. The trip off-site is theirs." },
    { question: "Can cleaning be added after the cleanout?", answer: "Yes. Once the rooms are clear, the floors and cabinets can be reviewed and cleaning can be included in the same plan, avoiding a separate mobilization later." }
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
    "relatedHeading": "If this is also an estate or a landlord turnover",
    // docs/20-COPY-VOICE.md rule 7 lists this exact sentence as untouchable — used verbatim,
    // not reworded, and it belongs at the top of this page more than any other.
    "pledge": "Nothing leaves the property without your written approval.",
    "scopeFooter": "Anything anyone is unsure about goes to review and stays there until the authorized decision-maker resolves it.",
    "quoteHeading": "Volume, decisions, and how many days it takes.",
    "quoteLede": "Photos help. For this service, a walkthrough supports an honest price and gives the family a chance to meet the operator before work begins."
  },
  eyebrow: "Complex Property Cleanup · South Bay & Peninsula",
  seoTitle: "Hoarding Cleanup in San Jose & South Bay | Aseptaclean",
  metaDescription: "Structured hoarding cleanup in the South Bay & Peninsula. Keep, remove and review decisions are agreed in writing — nothing leaves without your approval.",
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
    "Sorting, bagging and staging, with container coordination when the volume needs one",
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
  // property-cleanouts is a crew-gated noindex draft; swapped for the indexable turnover route
  // this heading already promises (route-audit failure mode #2). Restore doc 27 §14.2's set
  // when property-cleanouts is promoted.
  related: [
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Extreme-Condition Cleaning", href: "/extreme-cleaning-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" }
  ],
  // Anchor text is the target's own H1, which carries doc 19 §2.2's primary term for that route
  // ("estate cleanout checklist"). No canon document supplies a verbatim anchor string for it;
  // doc 19 §2's rule — "Anchor text = target page's primary term or a natural sentence" — is the
  // governing instruction, and this satisfies it. The note says why a hoarding reader wants an
  // executor's document, which is the whole reason this link is contextual and not nav furniture.
  resource: {
    label: "The Executor's Estate Cleanout Checklist",
    href: "/estate-cleanout-checklist/",
    note: "Written for executors clearing an estate, but the sorting and vendor-selection sections apply to any heavy-contents property."
  }
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
    "relatedHeading": "If the property also needs cleaning or has heavy accumulation",
    "pledge": "The authorized decision-maker sets the rules, and they are written down before anything moves.",
    "scopeFooter": "The signed scope is also the document you hand the sibling who asks what happened to something.",
    "quoteHeading": "How much sorting the family wants is the biggest variable.",
    "quoteLede": "A house where everything goes prices differently from one where every drawer gets reviewed first. Tell us which this is and roughly how big the property is."
  },
  eyebrow: "Complex Property Cleanup · South Bay & Peninsula",
  seoTitle: "Estate Cleanout in San Jose & South Bay | Aseptaclean",
  metaDescription: "Estate cleanout in the South Bay & Peninsula, run to the authorized decision-maker's instructions. Nothing leaves the property without written approval.",
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
    "Contents sorting, bagging and staging",
    "Container coordination and loading, where a container is part of the job",
    "Cleaning after the rooms are cleared, when you want it"
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
  // property-cleanouts is a crew-gated noindex draft; swapped for the indexable heavy-contents
  // route this heading already promises (route-audit failure mode #2). Restore doc 27 §14.3's
  // set when property-cleanouts is promoted.
  related: [
    { label: "Debris Removal", href: "/debris-removal-san-jose/" },
    { label: "Move-In & Move-Out Cleaning", href: "/move-out-cleaning-san-jose/" },
    { label: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" }
  ],
  // docs/19-SYSTEM-AND-SITEMAP.md §2 linking rules name this link explicitly: "Checklist ←
  // estate page + footer + every letter." It was the one specified inbound link the build never
  // had. Anchor text is the target's own H1, carrying its primary term — see the note on
  // hoardingPage.resource for why no canon anchor string exists.
  resource: {
    label: "The Executor's Estate Cleanout Checklist",
    href: "/estate-cleanout-checklist/",
    note: "Five sections, in the order most executors face them. Free to print and to pass on."
  }
} as const;

export const debrisRemovalPage: Doc27ServicePage = {
  slug: "/debris-removal-san-jose/",
  gate: null,
  complianceClause: null,
  indexable: true,
  doc27H1: "Debris Removal",
  section: {
    "fitHeading": "When debris is the thing standing between you and the next phase",
    "scopeHeading": "What a debris removal scope covers",
    "scopeNote": "Labor, the container, and any follow-on cleaning are quoted as separate lines, so you can see what the disposal actually costs instead of finding it buried in one number.",
    "methodHeading": "Five stages, so the disposal route is settled before anything is loaded",
    "pricingHeading": "What moves a debris removal price",
    "boundariesHeading": "Materials we do not take",
    "faqHeading": "Questions about fees, materials and who does the hauling",
    "relatedHeading": "If the debris is part of a larger cleanup",
    // Per-page overrides added 2026-08-21 — see the interface note. This page is the one most
    // likely to be misread as a hauling service, so it says the boundary in its own hero rather
    // than inheriting the generic scope pledge.
    "pledge": "We do the work at the property. The drive to the landfill belongs to the authorized hauler.",
    "quoteHeading": "The container is a line you can see, not a number we bury.",
    "quoteLede": "Send photos of what has to go and where it sits. Volume, weight and how far it has to travel to the container are what actually move this price.",
    "scopeFooter": "What we load and what the hauler carries are separate lines in the scope, and they stay separate on the invoice."
  },
  eyebrow: "Complex Property Cleanup · South Bay & Peninsula",
  seoTitle: "Property Debris Removal | San Jose & South Bay | Aseptaclean",
  // Length trimmed 2026-08-18 by dropping the "and" before "disposal" and swapping the region
  // label — NOT by shortening the hauler clause. "engaged for the project" is doc 21 §4.2
  // permitted copy verbatim; without it the sentence reads as a standing disposal chain, which
  // is the "we handle disposal" self-performed phrasing §4.3 prohibits outright.
  metaDescription: "Property debris removal in the South Bay & Peninsula. Written scope, staged loading, disposal handled by a City-authorized hauler engaged for the project.",
  h1: "Debris removal in San Jose for whole-property projects",
  // 2026-08-21. OLD lead: "Removal planning for loose, non-hazardous property debris that must be
  // cleared before cleaning, turnover or the next phase of work." Accurate, but "removal planning"
  // is not a thing anyone searches for or says, and the sentence left the reader to guess who
  // drives the load away. The boundary is now in the lead, in a sentence rather than a caveat.
  lead: "Loose, non-hazardous debris cleared out of a property before cleaning, turnover or the next phase of work. We do the clearing and the loading on site; the container and the trip to the facility come from the hauler your city authorizes.",
  fitWhen: [
    "Loose debris is blocking cleaning or access",
    "A turnover left material the owner has approved for discard",
    "The job needs a container and someone to sort out where it can sit",
    "The material can be identified before it is moved"
  ],
  outcomeHeading: "Debris gone, through a disposal route that holds up.",
  // OLD: "The quote separates labor, containers, third-party hauling and follow-on cleaning so
  // disposal costs are not hidden inside a vague cleanout number." Kept the substance; added the
  // sentence that names the split in responsibility, which is the thing this page most needs to
  // be unambiguous about (docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §4.3).
  outcomeBody: "Aseptaclean is not a hauling company. We sort, bag, stage, carry out and load; a City-authorized hauler engaged for the project supplies the container and takes the material off-site. The quote keeps those on separate lines so you can see what each one costs.",
  workIncludes: [
    "Material and volume review",
    "Bagging and staging of approved debris",
    "Carrying material out and loading the approved container",
    "Coordinating the authorized container provider and placement",
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
    "Hauling the load off-site — the authorized provider does that",
    "Hazardous or unknown materials",
    "Construction demolition",
    "Items nobody has authorized for removal"
  ],
  faq: [
    { question: "Are disposal fees included?", answer: "The written quote says whether container, facility or hauling fees are included, estimated or billed to you separately. You will not find out afterward." },
    { question: "So who actually hauls it away?", answer: "A City-authorized hauler engaged for the project. Nothing leaves a job site in an Aseptaclean vehicle. We arrange the container, sort out where it is allowed to sit, load it, and clean up after it — the transport itself is theirs." },
    { question: "Do you take hazardous materials?", answer: "No. Unknown chemicals, regulated waste and other hazardous materials need a provider set up for them. We can identify and set that material aside so it does not end up in the container by accident." }
  ],
  // property-cleanouts and eviction-cleanouts are crew-gated noindex drafts; swapped for the
  // indexable clearing routes so this page stops spending 2 of 3 internal links on drafts
  // (route-audit failure mode #2). Restore doc 27 §14.4's set when those two are promoted.
  related: [
    { label: "Estate Cleanouts", href: "/estate-cleanout-san-jose/" },
    { label: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
    { label: "Complex Property Cleanup", href: "/property-clearing/" }
  ]
} as const;

export const evictionCleanoutPage: Doc27ServicePage = {
  slug: "/eviction-cleanout-san-jose/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).",
  complianceClause: null,
  indexable: false,
  doc27H1: "Eviction Cleanouts",
  section: null,
  eyebrow: "Complex Property Cleanup · South Bay & Peninsula",
  seoTitle: "Eviction Cleanout Services in San Jose | Aseptaclean",
  metaDescription: "Eviction cleanout and turnover cleaning for property owners and managers in the South Bay & Peninsula.",
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
  eyebrow: "Commercial · South Bay & Peninsula",
  seoTitle: "Commercial Janitorial Cleaning in San Jose | Aseptaclean",
  metaDescription: "Project-based and select recurring commercial janitorial cleaning for small facilities in the South Bay & Peninsula.",
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
