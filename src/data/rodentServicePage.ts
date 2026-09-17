// RODENT SERVICE PAGE COPY — /rodent-dropping-cleanup-san-jose/
//
// Source: docs/Aseptaclean_Rodent_Service_Page_Copy.md, owner-approved 2026-09-16. Verbatim
// wording and section order per that file. This replaces the page's former record in
// src/data/servicePageCopy.ts (removed there — see docs/05-CURRENT-DECISIONS.md, 2026-09-16).
//
// PRICING — SCOPED OWNER EXCEPTION (AGENTS.md §4, 2026-09-16). The $500 / $1,500 / $145 figures
// below are literal strings from the approved copy file, not `site.offer.assessmentFee` or
// `assessmentFraming()`. They apply to this route and its /assessment/ landing page only; every
// other route's pricing rule is unchanged.
//
// DOC 21 MANDATORY CLAUSES — the §2.3 animal/organic clause and the §3.1 pest-boundary sentence
// are appended verbatim at the end of `stillGettingIn`, on top of the approved copy (doc 21 is
// rank 3 and outranks the rank-4 copy source). See docs/05-CURRENT-DECISIONS.md, 2026-09-16.
//
// "DISINFECT" REMOVED AS AN OUTCOME CLAIM. Doc 21 §2.2 bans `disinfect` "as an outcome claim"
// outright — "no permitted-negation carve-out covers it," per the reconciliation already recorded
// on /animal-waste-cleanup-san-jose/index.astro for the same word in the same kind of source
// copy. Every sentence below that claimed Aseptaclean disinfects, or described disinfecting as
// part of the work, has been dropped or reworded to "clean" only; the mandatory §2.3 clause
// ("not a decontamination, sterilization, or health-safety determination") already covers the
// negation. The entire "Disinfect surfaces that can be treated." process step is removed rather
// than reworded, matching the sibling page's "drop the whole step" resolution for the same
// conflict. Recorded in docs/05-CURRENT-DECISIONS.md, 2026-09-16.
import { site } from "./site";

export const rodentServicePage = {
  route: "/rodent-dropping-cleanup-san-jose/",
  formId: "rodent-form",

  seo: {
    title: "Rodent Dropping Cleanup in San Jose | Aseptaclean",
    description:
      "Rodent dropping cleanup in San Jose. Free phone and photo review, a written cleanup plan and price before you agree, and a $145 on-site assessment fully credited toward your cleanup."
  },

  hero: {
    eyebrow: `Rodent Cleanup · San Jose, ${site.location.serviceArea}`,
    heading: "Rodent Dropping Cleanup in San Jose",
    lead: "Get help with rodent waste in your kitchen, garage, living spaces, or stored items.",
    body: [
      "Aseptaclean removes rodent droppings, nests, and materials soiled by rodent waste. We clean the affected areas that can be treated.",
      "We check what needs attention, explain your options, and give you a written cleanup plan and price before you agree."
    ],
    secondaryLabel: "Request a Property Assessment",
    trustLine: "Owner-operated · Written cleanup plan and price"
  },

  spaces: {
    heading: "Different spaces need different cleanup plans.",
    id: "different-spaces",
    lead: "Waste in an empty cabinet is one kind of job. Waste mixed into boxes, furniture, and stored items is another.",
    body: ["We look at both the space and the things in it."],
    groups: [
      {
        title: "Kitchen cabinets, drawers, and pantries",
        body: [
          "You may find droppings on shelves, inside drawers, or near food and dishes.",
          "We check the affected areas we can reach. We discuss what needs to come out so the space can be cleaned.",
          "Your plan may include removing soiled shelf liners and materials and cleaning cabinet interiors.",
          "We also discuss how to handle the items inside. Food, dishes, and packaging need different care."
        ]
      },
      {
        title: "Garages and storage spaces",
        body: [
          "Waste may be along walls, beneath shelves, or mixed into stored belongings.",
          "We discuss which items need to be moved to reach the waste. We also help you decide what can be cleaned and what needs to go.",
          "A garage full of boxes may take more work than an empty garage of the same size. Your quote accounts for the space, the waste, and the items involved."
        ]
      },
      {
        title: "Closets, furniture, and living areas",
        body: [
          "Rodent waste may affect floors, baseboards, furniture, clothing, and other belongings.",
          "We check the material before choosing a cleaning method. A hard floor, fabric cushion, and paper item cannot all be treated the same way.",
          "We explain what we can clean, what may need removal, and what needs special care."
        ]
      },
      {
        title: "Several rooms or heavy rodent waste",
        body: [
          "When waste is spread across several areas, we make a plan for each space.",
          "We discuss where to start, how to move waste out, and what steps will help protect nearby rooms and belongings.",
          "Finding waste in one room does not mean every room needs the same work."
        ]
      }
    ]
  },

  keep: {
    heading: "What can you keep?",
    id: "what-can-you-keep",
    lead: "Some things can be cleaned. Others may need to go.",
    body: [
      "A plastic bin may be cleaned. A cardboard box soaked with rodent urine may need removal.",
      "We look at:"
    ],
    list: [
      "What the item is made of.",
      "How it has been affected.",
      "Whether the soiled parts can be reached and cleaned.",
      "Whether it needs special care."
    ],
    closing: [
      "Tell us about keepsakes, photos, records, or other important items before work starts. We discuss the options with you.",
      "Your cleanup plan lists the items or groups of materials you agree to have removed."
    ],
    image: "rodent-storage-contents",
    imageAlt:
      "A residential storage shelf holding cardboard boxes and a plastic tub, with dust and a small scattering of rodent droppings on the shelf"
  },

  process: {
    heading: "How we handle the cleanup.",
    id: "how-we-handle-cleanup",
    groups: [
      {
        title: "Plan the work area.",
        body: [
          "We decide where the work will take place and how to carry waste out. We explain the steps needed to help protect nearby spaces."
        ]
      },
      {
        title: "Remove waste and soiled materials.",
        body: [
          "We remove the droppings, nests, debris, and other affected materials included in your approved plan.",
          "We agree with you on which belongings to remove before work starts."
        ]
      },
      {
        title: "Clean the affected areas.",
        body: [
          "We choose cleaning methods that fit each surface and its condition.",
          "Some materials need different care or a separate service. We explain those limits."
        ]
      },
      {
        title: "Review the work with you.",
        body: [
          "We show you what we cleaned and removed. We explain any areas we could not reach and any issues that still need attention."
        ]
      }
    ]
  },

  assessmentVisit: {
    heading: "What we look at during a property assessment.",
    id: "property-assessment",
    lead: "A visit helps us see details that photos may miss.",
    body: ["We check:"],
    list: [
      "Where the waste is.",
      "How much of the space appears affected.",
      "Whether urine or nests are present.",
      "Which surfaces and belongings need attention.",
      "What must be moved to reach the work area.",
      "What may need removal.",
      "Whether part of the problem needs another service."
    ],
    closing: [
      "We check the areas we can reach. If boxes, walls, or other barriers keep an area out of view, we explain that limit."
    ],
    strongLine: "You receive a written cleanup plan and price before work begins.",
    closingAfter: [
      "If we later find a need for extra work, we discuss the work and price with you before you approve it."
    ],
    image: "rodent-hard-surface-detail",
    imageAlt: "A close view of dry rodent droppings scattered on a concrete floor against a painted baseboard"
  },

  // PRICING — scoped owner exception, AGENTS.md §4, 2026-09-16. Literal figures, not
  // site.offer.assessmentFee.
  pricing: {
    heading: "What does cleanup cost?",
    id: "what-does-cleanup-cost",
    small: {
      title: "Small-area cleanup — starts at $500",
      body: [
        "For a small amount of rodent waste in one area that is easy to reach.",
        "Your price depends on the mess, the materials, and the work needed."
      ]
    },
    larger: {
      title: "Larger cleanup jobs — start at $1,500",
      body: ["For larger areas, waste in several places, or more items and materials to remove.", "Your price depends on:"],
      factors: [
        "How much waste there is.",
        "How hard it is to reach.",
        "What needs cleaning or removal.",
        "What steps are needed to help protect nearby areas.",
        "How the waste must be disposed of."
      ],
      closing: "These are starting prices. Your written quote gives the price for your job."
    },
    assessment: {
      title: "On-site assessment — $145",
      body: [
        "We visit your property, check the affected areas we can reach, and give you a written cleanup plan and quote."
      ],
      strongLine: "If you hire us, the full $145 counts toward your cleanup bill.",
      closing: "The fee pays for the visit and review. Cleanup costs extra."
    }
    // Closing line ("Start with a **free phone and photo review**...") is rendered directly in
    // index.astro with an inline <strong>, since this data shape only stores plain strings.
  },

  // DOC 21 §2.3 + §3.1 MANDATORY CLAUSES appended at the end, verbatim, on top of the approved
  // copy — see docs/05-CURRENT-DECISIONS.md, 2026-09-16.
  stillGettingIn: {
    heading: "What if rodents are still getting in?",
    id: "rodents-still-getting-in",
    body: [
      "Tell us when you call. Rodents can leave new waste after cleanup, so the timing matters.",
      "A pest-control company can address the rodents and how they enter. Aseptaclean handles the cleanup.",
      "Some pest-control companies also clean. Ask what their work includes so you know what has already been handled."
    ],
    excludeTitle: "We do not:",
    exclude: [
      "Trap rodents or treat pests.",
      "Seal holes where rodents get in.",
      "Replace insulation.",
      "Make structural repairs.",
      "Work on heating or air systems."
    ],
    closing: ["We remove soiled materials when they are part of your approved cleanup plan."],
    complianceClauses: [
      "Cleaning only — not a decontamination, sterilization, or health-safety determination.",
      "Aseptaclean may clean accepted conditions left behind after an appropriately licensed pest operator has confirmed the active pest issue is resolved. Aseptaclean does not inspect for, identify, exclude, trap, or treat pests."
    ]
  },

  founder: {
    heading: "Meet Matthew, the owner.",
    id: "meet-matthew",
    body: [
      `${site.founder.name} founded Aseptaclean and runs the business.`,
      "He has a degree in biochemistry—the study of the chemistry of living things. He has also worked in drug manufacturing and hospital labs.",
      "That work taught him to follow clear steps, handle materials with care, and pay attention to details. He brings those habits to each cleanup."
    ]
  },

  faq: {
    heading: "Questions before you book.",
    id: "questions-before-you-book",
    items: [
      {
        question: "My pest-control company already cleaned. Do I still need you?",
        answer:
          "You may not. Ask which areas they cleaned and what they removed. Also ask whether their work included belongings in the affected areas. If they have already done the work your home needs, you may not need more cleanup."
      },
      {
        question: "I only found a few droppings. Does my whole home need cleaning?",
        answer:
          "Not based on that alone. Tell us where you found them and whether you have seen waste elsewhere. Photos can help us discuss whether a small cleanup fits the job or a visit is needed."
      },
      {
        question: "Can you give me a price from photos?",
        answer:
          "Some small jobs can be quoted from photos and a phone call. Larger jobs, blocked areas, or waste mixed into belongings may need a visit. We explain the $145 assessment fee before booking."
      },
      {
        question: "What photos should I send?",
        answer:
          "If you can take photos without disturbing the waste, send a wide view of the affected space, a closer view of what you found, and a view of nearby boxes, shelves, cabinets, or furniture. You do not need to move items or enter a hard-to-reach space to get photos."
      },
      {
        question: "How long does cleanup take?",
        answer:
          "The time depends on the waste, access, and what needs to be moved, cleaned, or removed. We discuss the expected schedule with your quote."
      },
      {
        question: "What should I do before your visit?",
        answer:
          "Leave the waste and affected items alone. You do not need to move them for our visit. Do not sweep or vacuum rodent droppings, urine, or nests. The CDC warns that this can send particles with germs into the air. If you have already cleaned some of the area, tell us what you did.",
        link: {
          label: "Read the CDC’s cleanup guide",
          href: "https://www.cdc.gov/healthy-pets/rodent-control/clean-up.html"
        }
      }
    ]
  },

  serving: {
    heading: "Serving San Jose, the South Bay, and the Peninsula.",
    id: "serving-san-jose",
    closing:
      "For other nearby cities, share your ZIP code so we can check service for your project."
  },

  form: {
    heading: "Tell us what you found.",
    lead: "Where did you find rodent waste? Is it in one spot or several rooms? Are boxes, furniture, or other items affected?",
    intro: "Share a few details so we can help with the next step.",
    submitLabel: "Request a Property Assessment",
    microcopy: "We will discuss your needs and explain any visit fee before we book. Sending this form does not approve cleanup work."
  }
} as const;
