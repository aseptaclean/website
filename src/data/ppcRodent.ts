// RODENT ASSESSMENT LANDING PAGE — /rodent-dropping-cleanup-san-jose/assessment/
//
// Source: docs/Aseptaclean_Rodent_Landing_Page_Copy.md, owner-approved 2026-09-16. New route —
// no equivalent rodent landing page existed before this (checked src/pages, src/data/ppc*.ts and
// public/_redirects). Mirrors the working hoarding/estate PPC pattern (PpcLayout, PpcHeroForm,
// dedicated thank-you route) with one scoped difference: the intake form sits at the bottom of
// the page, not in the hero (AGENTS.md §2.2.3 scoped exception, 2026-09-16).
//
// PRICING — scoped owner exception (AGENTS.md §4, 2026-09-16), same as the service page: literal
// $500 / $1,500 / $145 figures from the approved copy, not site.offer.assessmentFee.
//
// NOT A FREE-WALKTHROUGH CAMPAIGN. Unlike the hoarding/estate PPC routes, this page publishes the
// real $145 on-site assessment fee, so it needs no confirmation-email branch in
// functions/_lib/providers.ts — the existing default "Assessment request" branch already applies.
//
// "DISINFECT" REMOVED AS AN OUTCOME CLAIM — same reconciliation as src/data/rodentServicePage.ts.
// Doc 21 §2.2 bans it outright, no carve-out. The "Are sanitizing and disinfecting the same?" FAQ
// (including its EPA link) is dropped in full rather than kept in hedged form, matching the
// resolution already recorded for the same conflict on /animal-waste-cleanup-san-jose/. Recorded
// in docs/05-CURRENT-DECISIONS.md, 2026-09-16.
import { site } from "./site";

export const ppcRodent = {
  route: "/rodent-dropping-cleanup-san-jose/assessment/",
  formId: "rodent-form",

  seo: {
    title: "Rodent Dropping Cleanup for Your Home — San Jose | Aseptaclean",
    description:
      "Found rodent waste in your cabinets, garage, or stored items? Free phone and photo review, a written cleanup plan and price before you agree, and a $145 on-site assessment fully credited toward your cleanup."
  },

  hero: {
    eyebrow: `Rodent Cleanup · San Jose, ${site.location.serviceArea}`,
    heading: "Rodent Dropping Cleanup for Your Home",
    lead: "Found rodent waste in your cabinets, garage, or stored items? We can help.",
    body: [
      "Aseptaclean removes rodent droppings, nests, and materials soiled by rodent waste. We clean the affected areas that can be treated."
    ],
    boldLine: "Know what can be cleaned, what needs to go, and what the work will cost—before you agree.",
    secondaryLabel: "Request a Property Assessment",
    trustLine: "Owner-operated · Written cleanup plan and price"
  },

  mess: {
    heading: "The rodents may be gone. Their mess is still there.",
    id: "the-mess",
    body: ["Droppings under furniture. Urine in cabinets. Nests in boxes.", "You may be wondering:"],
    list: [
      "Can I keep my things?",
      "What needs to be thrown away?",
      "How much cleaning does my home need?"
    ],
    closing: [
      "We check the areas we can reach and explain your options. If part of the problem needs another service, we tell you."
    ],
    image: "rodent-utility-room-context"
  },

  plan: {
    heading: "A clear plan for your home and your things.",
    id: "clear-plan",
    groups: [
      {
        title: "Plan the work.",
        body: [
          "We decide where the work will take place and how to carry waste out. We explain the steps needed to help protect nearby rooms and belongings."
        ]
      },
      {
        title: "Talk with you about what stays.",
        body: [
          "Some items can be cleaned. Others may need to go.",
          "We explain the options and agree with you on what to remove before work starts."
        ]
      },
      {
        title: "Use the right method for each surface.",
        body: [
          "A cardboard box and a plastic bin need different care.",
          "We choose cleaning methods that fit the material."
        ]
      },
      {
        title: "Put the plan and price in writing.",
        body: [
          "Your quote lists the areas we will clean, the work included, and the price.",
          "You review and approve it before we start."
        ]
      }
    ]
  },

  help: {
    heading: "Help with small areas or a larger mess.",
    id: "help-with",
    lead: "We clean rodent waste in:",
    list: [
      "Kitchen cabinets, drawers, and pantries.",
      "Garages, closets, and storage spaces.",
      "Floors, baseboards, and furniture surfaces we can reach.",
      "Stored items and piles of debris.",
      "Several rooms or areas with heavy rodent waste."
    ],
    closing: [
      "We remove soiled items and materials when they are part of your approved plan.",
      "We do not seal holes where rodents get in or replace insulation."
    ],
    image: "rodent-storage-contents"
  },

  // Numbered in the source ("1. ... 2. ... 3. ... 4. ..."), so this renders through AcSteps.
  howItWorks: {
    heading: "How it works.",
    id: "how-it-works",
    steps: [
      {
        title: "Tell us what you found.",
        body: "Start with a free phone and photo review. Tell us where you found the waste and whether a pest-control company has treated the problem. We discuss a starting price and whether we need to visit."
      },
      {
        title: "Get your cleanup plan and price.",
        body: "If a visit is needed, we check the areas we can reach. We talk through what needs cleaning and what may need removal. Then we give you a written plan and quote. The visit costs $145. If you hire us for the cleanup, that $145 counts toward your cleanup bill."
      },
      {
        title: "Let us handle the cleanup.",
        body: "We complete the work you approved. This may include removing rodent waste and soiled materials and cleaning surfaces that can be treated."
      },
      {
        title: "Review the work with us.",
        body: "We show you what we cleaned and removed. We also explain any issues that still need attention or were not part of the job."
      }
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
    id: "questions",
    items: [
      {
        question: "My pest-control company offers cleanup. Do I need you too?",
        answer:
          "You may not need both. Ask your provider what their cleanup includes: which areas will they clean, will they handle items in those areas, what will they remove, and how will they help protect nearby spaces. If they have already done the work your home needs, you may not need more cleanup."
      },
      {
        question: "Will you throw everything away?",
        answer:
          "No. Some things can be cleaned. Others may need to go or need special care. We explain the options and discuss what to remove with you."
      },
      {
        // DOC 21 §2.3 + §3.1 mandatory clauses appended verbatim, on top of the approved answer —
        // see docs/05-CURRENT-DECISIONS.md, 2026-09-16.
        question: "What if rodents are still getting in?",
        answer:
          "Tell us when you call. Rodents can leave new waste after cleanup. We discuss when to clean based on the pest-control work your home needs. We do not trap rodents, treat pests, or seal entry holes. Cleaning only — not a decontamination, sterilization, or health-safety determination. Aseptaclean may clean accepted conditions left behind after an appropriately licensed pest operator has confirmed the active pest issue is resolved. Aseptaclean does not inspect for, identify, exclude, trap, or treat pests."
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

  // PRICING — scoped owner exception, AGENTS.md §4, 2026-09-16. Literal figures.
  cost: {
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
        "What steps are needed to protect nearby areas.",
        "How the waste must be disposed of."
      ]
    },
    strongLine: "You receive a written price before work starts.",
    assessment: {
      title: "On-site assessment — $145",
      body: [
        "We visit your property, check the affected areas we can reach, and give you a written cleanup plan and quote."
      ],
      strongLine: "If you hire us, the full $145 counts toward your cleanup bill.",
      closing: "The fee pays for the visit and review. Cleanup costs extra."
    }
    // Closing line ("Start with a **free phone and photo review**...") is rendered directly in
    // assessment/index.astro with an inline <strong>, since this data shape only stores plain
    // strings.
  },

  form: {
    heading: "Tell us what you found.",
    lead: "Where did you find rodent waste? Is it in one spot or several rooms? Are boxes, furniture, or other items affected?",
    intro: "Share a few details so we can help with the next step.",
    submitLabel: "Request a Property Assessment",
    microcopy: "We will discuss your needs and explain any visit fee before we book."
  },

  thankYou: {
    route: "/rodent-dropping-cleanup-san-jose/assessment/thank-you/",
    seo: {
      title: "Your request | Aseptaclean",
      description: "Status of the rodent cleanup request you sent to Aseptaclean."
    },
    eyebrow: "Rodent Cleanup · San Jose",
    heading: "Request received.",
    body: [
      "We’ll review what you sent and discuss your needs, including any visit fee, before we book.",
      "Sending this form does not approve cleanup work."
    ],
    emailSent: "A confirmation email is on its way to the address you gave us.",
    emailPending:
      "We could not send a confirmation email just now. That does not affect your request — we have it.",
    codeLabel: "Confirmation code",
    codeNote: "Quote this if you call.",
    boundary:
      "Sending this form does not schedule or authorize work, it does not confirm an appointment, and it does not create a service agreement.",
    unconfirmed: {
      heading: "This page does not confirm that a request was received.",
      body: "If you have just submitted the form, your confirmation was shown once. If you arrived here another way, or refreshed this page, send your details again and we will pick it up.",
      backLabel: "Back to the form"
    }
  },

  stickyBar: {
    secondaryLabel: "Request a Property Assessment"
  }
} as const;

export const ppcRodentCallLabel = `Call ${site.business.phone}`;
