/**
 * PUBLIC COPY — transcribed from the owner-supplied copy documents.
 *
 * Sources (docs/20-COPY-MAP.md §1):
 *   docs/aseptaclean-all-website-copy.md          main public copy
 *   docs/aseptaclean-crime-scene-trauma-cleanup.md  supplemental trauma copy
 *
 * Only the display transformations in docs/20-COPY-MAP.md §3 and the claims-law removals in
 * §4 are applied. Nothing here was written for the site; every string is either lifted from a
 * source document or omitted from it for a recorded reason.
 *
 * BUSINESS FACTS ARE NOT IN THIS FILE. AGENTS.md §3 requires phone, email, hours, region,
 * service area, fee, and CTA labels to come from src/data/site.ts. Where a source paragraph
 * stated one, the fact is interpolated at the call site rather than retyped here.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface StepEntry {
  title: string;
  body: string;
}

// ---------------------------------------------------------------------------
// HOMEPAGE — docs/aseptaclean-all-website-copy.md, `<!-- PAGE: Homepage -->`
// ---------------------------------------------------------------------------

export const home = {
  /**
   * Hero. Source: Homepage opening block. The eyebrow is the source's own kicker.
   *
   * EYEBROW IS AN AUTHORIZED DISPLAY TRANSFORMATION, NOT SOURCE COPY. The source kicker is
   * "Specialty Property Cleanup". Profile AC-CP70-91130-1.1 §"Approved descriptor update in
   * version 1.1" and docs/20-COPY-MAP.md replace the standalone descriptor with the longer
   * owner-approved label in exactly three display roles: this eyebrow, the Services hub H1,
   * and the shared brand descriptor. The homepage H1 below is explicitly PRESERVED, and the
   * five service-page titles are untouched.
   *
   * ─────────────────────────────────────────────────────────────────────────────────────
   * CLAIMS OVERRIDE — READ THIS BEFORE "FIXING" IT. DO NOT REVERT WITHOUT AN OWNER.
   *
   * This string was applied and auto-reverted once already (2026-09-04) because AGENTS.md §7
   * and doc 21 §2.1/§2.2 ban `remediation` and `biohazard` as service claims, and doc 21 §5
   * names an "unlimited biohazard service family" as the thing TSW #933 does NOT authorize.
   *
   * On 2026-09-04 the conflict was escalated to the owner in full — including that it sits in
   * tension with legal.scopeDisclaimer ("...not a licensed general contractor, remediation
   * contractor...") rendered in this site's own footer — and the owner directed that the
   * descriptor publish as specified. The override is recorded as a scoped exception in
   * AGENTS.md §7, doc 21 §2.2 and docs/05-CURRENT-DECISIONS.md.
   *
   * The exception covers THIS descriptor in THOSE THREE display roles only. `remediation`,
   * `biohazard`, `decontamination`, `sanitization` and `sterilization` remain banned in every
   * other string on the site, and this is not licence to relax any other prohibition.
   * ─────────────────────────────────────────────────────────────────────────────────────
   */
  hero: {
    eyebrow: "Biohazard Remediation & Specialty Property Cleanup",
    heading: "When a property needs more than a normal cleaning company.",
    body: [
      "Rodent droppings and animal waste. Hoarding and heavy clutter. Severely neglected properties. Detailed cleaning for homes that need a serious reset.",
      "Aseptaclean helps you understand what needs to happen and gets the property back under control."
    ]
  },

  /**
   * "What are you dealing with?" — the introductory sentences above the service grid.
   *
   * The source's four condition-door blocks that followed these sentences are NOT rendered
   * here. docs/20-COPY-MAP.md "Homepage selection": "the service descriptions are represented
   * by the specified card excerpts instead of a second duplicate set of service blocks."
   * Their original text is untouched in the source file and still renders on /services/.
   */
  doorsIntro: {
    heading: "What are you dealing with?",
    lead: "You do not need to know the name of the service before you contact us.",
    body: ["Start with what is happening at the property."]
  },

  /**
   * The five service cards. docs/20-COPY-MAP.md: "use the corresponding Services block's
   * service name and first two prose paragraphs after its descriptive subheading", and for
   * trauma the precise routing excerpt from its own source hero.
   * Order follows docs/SITEMAP-MASTER.md.
   */
  serviceCards: [
    {
      title: "Hoarding Cleanup",
      description:
        "Hoarding cleanup is not just about removing things. Important belongings may be mixed into the clutter. Rooms may no longer be accessible. Years of buildup may be hidden underneath accumulated material.",
      href: "/hoarding-cleanup-san-jose/"
    },
    {
      // Display name per docs/20-COPY-MAP.md. Source block: "Severe Property Cleanup".
      title: "Extreme Cleaning",
      description:
        "Some properties need more than additional scrubbing. Heavy buildup, trash, animal waste, odors, neglected rooms, and sanitation concerns can turn an ordinary cleaning problem into a much larger project.",
      href: "/extreme-cleaning-san-jose/"
    },
    {
      title: "Detailed Deep Cleaning",
      description:
        "Not every difficult property is a severe-condition property. Sometimes the home simply needs significantly more attention than a normal maintenance cleaning allows.",
      href: "/deep-cleaning-san-jose/"
    },
    {
      // Trauma routing excerpt, from the supplemental source's own hero — the exact string
      // docs/20-COPY-MAP.md names. No broader homepage service claim is invented around it.
      title: "Crime Scene & Trauma Cleanup",
      description: "Professional cleanup after a traumatic event.",
      href: "/crime-scene-trauma-cleanup-san-jose/"
    },
    {
      title: "Rodent Droppings & Animal Waste Cleanup",
      description:
        "Rodents can leave more than visible droppings. Urine, nesting material, contaminated debris, odors, and affected surfaces may remain after the rodents have been removed.",
      href: "/rodent-dropping-cleanup-san-jose/"
    }
  ],

  /** White image/text introduction — the whole source section. */
  intro: {
    heading: "Some properties need",
    headingAccent: "more than cleaning.",
    body: [
      "A normal cleaning service works well when a home is already being maintained.",
      "That changes when you are dealing with rodent waste, years of buildup, heavy clutter, animal waste, inaccessible rooms, or a property that has been neglected for a long time.",
      "At that point, the first question is not “How fast can someone clean this?” It is “What actually needs to happen to this property?”"
    ],
    pullQuote: "That is where Aseptaclean starts."
  },

  /** Dark image/text scope section — the whole source section, question list preserved. */
  scope: {
    heading: "You should know what you are paying us to solve.",
    lead: "Aseptaclean is not built around vague service packages.",
    body: ["We want the scope to answer basic questions before work begins:"],
    pullQuote: "A clear job starts with a clear understanding of the problem."
  },

  /** Founder split — the whole source "Why Aseptaclean" section. */
  why: {
    heading: "Built around careful work.",
    lead: "Aseptaclean is founder-operated.",
    body: [
      "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.",
      "That experience shaped the way Aseptaclean approaches difficult property conditions:"
    ],
    pullQuote: "Look closely. Understand what is happening. Define the work clearly. Then do the job in the right order.",
    close: [
      "We do not treat a home like a laboratory.",
      "And we do not assume every difficult property is a major remediation project.",
      "We bring a careful, condition-first mindset to the work and explain what we see in plain English."
    ]
  },

  /** Final call section — the whole source closing section. */
  final: {
    heading: "You do not need to know exactly what kind of cleanup you need.",
    body: [
      "Show us the property. Send a few photos and tell us what is happening.",
      "We will review the condition and help you determine what the next step should be."
    ]
  },

  /** "How it starts" — the five-step sequence. */
  steps: [
    {
      title: "Show us the property.",
      body: "Send photos and a short description of what is happening. For many properties, that is enough for us to understand the general condition and determine the next step."
    },
    {
      title: "We review the condition.",
      body: "We look at the affected areas, access, contents, visible waste or buildup, and anything else that may change the work. If the property is larger or more complicated, we may recommend an on-site assessment."
    },
    {
      title: "We define the work.",
      body: "You receive a clear explanation of what we recommend, what is included, what is not included, and what the work will cost."
    },
    {
      title: "You approve the scope.",
      body: "Work does not begin based on assumptions. You know what you are agreeing to before the project starts."
    },
    {
      title: "We complete and review the agreed work.",
      body: "We work against the approved scope. If we uncover something that materially changes the project, we explain it before additional work is performed."
    }
  ] satisfies StepEntry[],

  /** "You should know what you are paying us to solve." */
  scopeQuestions: [
    "Which areas are included?",
    "What condition are we addressing?",
    "What cleaning or clearing work is planned?",
    "What is outside the scope?",
    "What may require another specialist?",
    "What could change the project?",
    "What will the work cost?"
  ],

  /** "We do not pretend every problem belongs to us." */
  focus: [
    "Rodent Droppings & Animal Waste Cleanup",
    "Hoarding Cleanup",
    "Extreme Cleaning",
    "Detailed Deep Cleaning"
  ],
  notProvided: [
    "Pest extermination",
    "Rodent trapping",
    "Rodent exclusion or entry-point sealing",
    "Structural repairs",
    "Remodeling or construction",
    "Work outside our current operating scope"
  ],

  /** "What affects the cost?" — cost drivers only. No figure (AGENTS.md §4). */
  costDrivers: [
    "Size of the affected area",
    "Current condition",
    "Amount of material or clutter",
    "Rodent or animal waste",
    "Number of affected rooms",
    "Surface types",
    "Contents",
    "Access",
    "Disposal needs",
    "Odors",
    "Amount of detailed hand cleaning required",
    "Conditions that become visible once areas are accessible"
  ],

  /**
   * Homepage FAQ. Six of the source document's seven questions ship verbatim.
   *
   * "What areas do you serve?" is the exception: its source answer says Aseptaclean serves
   * "the South Bay, Santa Clara County, the Peninsula, and selected surrounding Bay Area
   * communities". AGENTS.md §3 explicitly rejects "Santa Clara County" as the region wording
   * because the service footprint includes Atherton, which is in San Mateo County. The answer
   * is rebuilt at the call site from site.location.serviceArea and the verified city list.
   * See docs/20-COPY-MAP.md §4.
   */
  faq: [
    {
      question: "I do not know which service I need. What should I choose?",
      answer:
        "You do not have to choose one before contacting us. Send photos and tell us what is happening. We will help you determine which Aseptaclean service fits the property, if any."
    },
    {
      question: "Can I start by sending photos?",
      answer:
        "Yes. Photos are often the easiest place to start. Send wider photos of the affected rooms along with closer photos of the conditions you are concerned about. For more complicated properties, we may still recommend seeing the property in person."
    },
    {
      question: "Do I need to clean or move anything before you see the property?",
      answer:
        "Usually, no. We would rather understand the property in its actual condition. If something needs to be moved before an assessment, we can tell you."
    },
    {
      question: "What happens if you find more than expected?",
      answer:
        "If we uncover a condition that materially changes the approved work, we explain what we found before additional work is performed. We do not want major scope changes to show up as a surprise after the fact."
    },
    {
      question: "Does Aseptaclean provide pest control?",
      answer:
        "No. We handle accepted cleanup conditions left behind by rodent and animal activity. Extermination, trapping, exclusion, and entry-point sealing belong with an appropriate pest-control or wildlife-control provider."
    },
    {
      question: "How do you determine the price?",
      answer:
        "We look at the size, condition, access, contents, affected surfaces, waste, level of buildup, and amount of work required. For straightforward projects, photos may provide enough information to begin pricing. Larger or more complicated properties may need an on-site assessment."
    }
  ] satisfies FaqEntry[]
} as const;

// ---------------------------------------------------------------------------
// SERVICES HUB — `<!-- PAGE: Services -->`
// ---------------------------------------------------------------------------

export const servicesHub = {
  families: [
    {
      title: "Hoarding Cleanup",
      subtitle: "When belongings and clutter have made the home difficult to manage.",
      body: [
        "Hoarding cleanup is not just about removing things.",
        "Important belongings may be mixed into the clutter. Rooms may no longer be accessible. Years of buildup may be hidden underneath accumulated material.",
        "We help break the property into manageable steps, establish what stays and what goes, clear affected areas, and address the cleaning conditions underneath."
      ],
      bestFor: [
        "Heavy clutter",
        "Accumulated belongings",
        "Rooms that are no longer usable",
        "Trash mixed with personal property",
        "Families helping a loved one",
        "Properties requiring sorting before cleaning"
      ],
      linkLabel: "Learn About Hoarding Cleanup",
      href: "/hoarding-cleanup-san-jose/"
    },
    {
      // Display name per docs/20-COPY-MAP.md §3.1. The source's closing sentence
      // ("These situations are sometimes described as gross filth cleanup or extreme cleaning.
      // We call it severe property cleanup because the condition matters more than the label.")
      // is dropped — AGENTS.md §7 bans "gross filth" anywhere, and the rename makes the second
      // half of the sentence self-contradictory.
      title: "Extreme Cleaning",
      subtitle: "When the condition has gone beyond a normal deep clean.",
      body: [
        "Some properties need more than additional scrubbing.",
        "Heavy buildup, trash, animal waste, odors, neglected rooms, and sanitation concerns can turn an ordinary cleaning problem into a much larger project.",
        "We assess what is actually happening, define the affected areas, and build the cleanup around the condition of the property."
      ],
      bestFor: [
        "Severely neglected homes",
        "Heavy dirt and buildup",
        "Animal urine or feces",
        "Trash accumulation",
        "Strong odors",
        "Heavily soiled kitchens or bathrooms",
        "Properties left in poor condition after an occupant"
      ],
      linkLabel: "Learn About Extreme Cleaning",
      href: "/extreme-cleaning-san-jose/"
    },
    {
      title: "Detailed Deep Cleaning",
      subtitle: "For homes that need more than routine cleaning.",
      body: [
        "Not every difficult property is a severe-condition property.",
        "Sometimes the home simply needs significantly more attention than a normal maintenance cleaning allows.",
        "Aseptaclean provides condition-based detailed cleaning for homes with heavy buildup, neglected details, demanding kitchens and bathrooms, or properties that need a thorough reset."
      ],
      bestFor: [
        "Homes that have not been thoroughly cleaned in a long time",
        "Heavy kitchen or bathroom buildup",
        "Move-in cleaning",
        "Detailed move-out cleaning",
        "Homes preparing for sale",
        "High-detail residential cleaning",
        "Properties where standard cleaning has not been enough"
      ],
      linkLabel: "Learn About Detailed Deep Cleaning",
      href: "/deep-cleaning-san-jose/"
    },
    {
      // The fifth service row. docs/20-COPY-MAP.md: "Services gains one trauma row from the
      // trauma hero and its 'Crime Scene & Trauma Cleanup Services' block." The main copy
      // document has no Services block for this service — it predates the trauma-page launch —
      // so this row is built from the trauma source rather than from invented family copy.
      title: "Crime Scene & Trauma Cleanup",
      subtitle: "Professional cleanup after a traumatic event.",
      body: [
        "When law enforcement, emergency responders, or the coroner have completed their work and released the scene, blood, bodily fluids, affected belongings, and regulated waste may still remain.",
        "Aseptaclean can assess and provide cleanup for accepted situations."
      ],
      bestFor: [
        "Suicide cleanup, after the scene has been released",
        "Homicide and crime scene cleanup, once law enforcement has finished processing the scene",
        "Unattended death and decomposition cleanup",
        "Blood and bodily fluid cleanup after an accident, injury, or medical event",
        "Workplace and accident cleanup",
        "Vehicle biohazard cleanup"
      ],
      linkLabel: "Learn About Crime Scene & Trauma Cleanup",
      href: "/crime-scene-trauma-cleanup-san-jose/"
    },
    {
      title: "Rodent Droppings & Animal Waste Cleanup",
      subtitle: "Pest control stops the activity. We address what was left behind.",
      body: [
        "Rodents can leave more than visible droppings.",
        "Urine, nesting material, contaminated debris, odors, and affected surfaces may remain after the rodents have been removed.",
        "We assess where activity occurred, determine what accessible areas need attention, and clean the affected property according to the agreed scope. Aseptaclean does not provide trapping, extermination, or rodent exclusion."
      ],
      bestFor: [
        "Mouse or rat droppings",
        "Rodent urine",
        "Nesting material",
        "Contaminated garages or storage areas",
        "Droppings inside cabinets or drawers",
        "Animal feces",
        "Properties requiring cleanup after pest-control work"
      ],
      linkLabel: "Learn About Rodent Droppings & Animal Waste Cleanup",
      href: "/rodent-dropping-cleanup-san-jose/"
    }
  ],

  /** "How it works" — the hub's own five steps. */
  steps: [
    {
      title: "Show us what is happening.",
      body: "Start with photos, video, or a short description of the property. For larger or more complicated situations, we may recommend an on-site assessment."
    },
    {
      title: "We assess the condition.",
      body: "We look at the affected areas, access, contents, buildup, contamination concerns, and anything else that may change the work."
    },
    {
      title: "We build the scope.",
      body: "You receive a clear explanation of what we recommend, what is included, and what the work will cost."
    },
    {
      title: "We complete the agreed work.",
      body: "The project is approached according to the condition of the property rather than a one-size-fits-all checklist."
    },
    {
      title: "We review the result.",
      body: "We identify what was completed and anything outside the agreed scope that may still require attention."
    }
  ] satisfies StepEntry[],

  /** "What Aseptaclean is not" — clear expectations. */
  notList: [
    {
      title: "We are not a recurring maid service.",
      body: "If you need weekly or biweekly maintenance cleaning, another company will probably be a better fit."
    },
    {
      title: "We are not a pest-control company.",
      body: "We clean conditions left behind by rodent and animal activity. We do not provide extermination, trapping, or exclusion."
    },
    {
      title: "We are not a junk-hauling company.",
      body: "Material removal may be part of certain cleanup projects, but the reason you hire Aseptaclean is to address the condition of the property—not simply to make items disappear."
    },
    {
      title: "We are not a general contractor.",
      body: "If a property requires structural repairs or other licensed construction work, that work falls outside our cleanup scope."
    }
  ],

  /** "Which service should I choose?" */
  chooser: [
    { situation: "The home is overwhelmed with belongings.", service: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
    { situation: "The property is heavily neglected or unsanitary.", service: "Extreme Cleaning", href: "/extreme-cleaning-san-jose/" },
    {
      situation: "The home is generally in good condition but needs a serious reset.",
      service: "Detailed Deep Cleaning",
      href: "/deep-cleaning-san-jose/"
    },
    {
      situation: "A scene has been released and cleanup is now the property owner's responsibility.",
      service: "Crime Scene & Trauma Cleanup",
      href: "/crime-scene-trauma-cleanup-san-jose/"
    },
    {
      situation: "You found mouse or rat droppings, urine, or animal waste.",
      service: "Rodent Droppings & Animal Waste Cleanup",
      href: "/rodent-dropping-cleanup-san-jose/"
    }
  ]
} as const;
