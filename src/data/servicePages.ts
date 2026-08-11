// Phase 3/3b draft service-page content, built per docs/19-SYSTEM-AND-SITEMAP.md Part 2
// (§2.2 SEO spec) and Part 3 (§3.2 wireframe + tone deltas). Every page sourced from this
// file ships noindex={true} and is excluded from src/pages/sitemap.xml.ts's manual allowlist
// until its own launch gate clears — see docs/05-DECISIONS-LOG.md for the biohazard exclusion
// and each page's own gate note below. Sentences here are held to the same
// docs/01-QUALITY-GUARDRAILS.md bar as any live page; nothing here is placeholder-quality
// copy waiting to be rewritten later. [OWNER INPUT: …] markers are the only intentionally
// unfinished spots — real-call language, real-job proof lines, and gated operational facts
// doc 19 explicitly says must not be invented.

export const checklist = {
  title: "The Executor's Estate Cleanout Checklist",
  intro:
    "Five sections, in the order most executors face them. Nothing here requires hiring anyone — it holds up whether you do the work yourself, split it with family, or bring in a vendor.",
  sections: [
    {
      title: "Before anything is touched",
      items: [
        "Confirm your legal authority to act — as executor, trustee, or agent under power of attorney — before anyone removes or discards anything.",
        "Photograph every room as-found, including closets, drawers, and storage areas, before any sorting begins.",
        "Locate the will or trust documents, keys, deeds, vehicle titles, and account records.",
        "Secure the property: confirm locks work, mail is held or forwarded, and the property is not left visibly unattended."
      ]
    },
    {
      title: "Legal & authority",
      items: [
        "Identify who can legally approve disposal of contents — this is not always the same person handling logistics.",
        "Notify co-heirs in writing before significant items are removed or the property is cleared, even if the will is clear.",
        "Check for liens, code-violation notices, or unpaid property tax before assuming clear title to dispose of contents.",
        "Decide what happens to utilities — many vendors and inspectors need power and water on to do their work."
      ]
    },
    {
      title: "Sort, decide, document",
      items: [
        "Use a three-way framework for every room: keep, review, remove. Nothing has to be decided immediately.",
        "Set aside documents, photographs, jewelry, keys, and cash into one secured, clearly labeled location as soon as they're found.",
        "Never discard an item you're unsure about. Move it to \"review\" and revisit it later — it costs nothing to wait.",
        "Keep a written record of significant decisions: what was kept, what was removed, and who approved it."
      ]
    },
    {
      title: "Choosing a vendor",
      items: [
        "Insist on a written scope before work begins — what's included, what it costs, and what happens if the scope changes.",
        "Ask directly what is excluded from the quoted price. A verbal \"don't worry, we'll handle it\" is not a scope.",
        "Ask how discovered valuables are handled — is there a documented process, or does it depend on who happens to find them?",
        "Ask what documentation you receive at closeout — photographs, an exception list, a written record — and get the answer in writing.",
        "Confirm the vendor carries insurance and ask to see proof, not just a verbal assurance."
      ]
    },
    {
      title: "Closeout",
      items: [
        "Request completion photographs showing the property's final condition, not just a verbal \"all done.\"",
        "Get a written exception list — anything not completed or not part of the original scope should be named, not implied.",
        "Do a final walkthrough before signing off, in person or by reviewing photographs and video together.",
        "Keep all records — the scope, photographs, and any closeout documentation — with the estate file."
      ]
    }
  ],
  vendorCta:
    "This is also the section of the checklist Aseptaclean is named in, if you're reading it that way — but it's written to hold up regardless of who you hire.",
  footerNote:
    "This checklist is a neutral reference for executors and families. It does not require using Aseptaclean or any specific vendor."
} as const;

export const estatePage = {
  slug: "/estate-cleanout-san-jose/",
  gate: null as string | null,
  hero: {
    eyebrow: "Estate Cleanout · San Jose & the South Bay",
    h1: "Clearing a parent's estate without deciding everything today",
    lead: "You don't have to sort every box, decide every item, or empty the house alone before Aseptaclean can help. Tell us the situation and the deadline; we'll tell you what has to happen and in what order."
  },
  trackA: {
    eyebrow: "For the family",
    heading: "Grief doesn't pause for an estate timeline, and it shouldn't have to",
    body: [
      "Most families reach out to us not knowing what to do first — the listing date is set, or the lease is ending, and the property still holds a lifetime of someone else's decisions. That's normal. You are not behind.",
      "A written scope means you decide what stays, what leaves, and what gets cleaned — once, on your terms — instead of re-deciding it every time someone new walks through the door."
    ]
  },
  trackB: {
    eyebrow: "For executors and attorneys",
    heading: "For executors, attorneys, and property managers",
    body: [
      "A cleanout vendor without a written scope creates exposure for whoever signed the engagement — disputes over discarded property, no record of what was removed, no accountable party if something goes missing.",
      "Aseptaclean issues a signed scope before work begins and a Property Handoff Record at closeout: what stayed, what left, what was cleaned, and what discovered items were isolated and reported. One accountable operator, one document trail."
    ],
    recordExcerpt: {
      label: "From a Property Handoff Record",
      field: "Discovered item log",
      value: "Item Log 01 · Jewelry box isolated in primary closet · reported to owner, not disturbed"
    }
  },
  scope: {
    heading: "What an estate cleanout covers",
    included: [
      "Nonhazardous contents clearing, room by room",
      "Bagging, consolidation, and approved disposal coordination",
      "Garage, attic, and storage-area clearing",
      "Kitchen and bathroom deep cleaning after clearing",
      "Discovered-item isolation and reporting — documents, photographs, jewelry, keys, cash",
      "Completion photographs and a documented closeout"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard."
  },
  method: {
    heading: "Five stages, one accountable operator"
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Room-by-room disposition",
    recordValue: "Primary closet — Review — Contents held for owner decision before clearing",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed estate cleanout — property type, city, and what made the situation specific, per docs/19-SYSTEM-AND-SITEMAP.md §1.5 job-close checklist. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Property size",
      "Volume of contents",
      "Cleaning condition",
      "Access and stairs",
      "Disposal requirements",
      "Labor and deadline"
    ]
  },
  faq: [
    {
      question: "Do we have to decide what to keep before you start?",
      answer: "No. The written scope identifies keep, remove, and review areas — items you're unsure about go into review, not the discard pile."
    },
    {
      question: "What if family members disagree about what leaves?",
      answer: "One authorized decision-maker approves the scope and any changes to it. That doesn't resolve family disagreement, but it does mean the work follows one clear approval instead of whoever happens to be on-site that day."
    },
    {
      question: "Can an out-of-state executor manage this remotely?",
      answer: "Yes, when access and decision authority are clear. Scope review, approvals, updates, and closeout can be handled electronically."
    },
    {
      question: "What happens to documents, photos, or valuables you find?",
      answer: "Discovered keys, documents, photographs, cash, jewelry, and similar items are isolated and reported, not disturbed or discarded. We do not guarantee every concealed item will be found."
    },
    {
      question: "How is this different from a junk removal company?",
      answer: "A hauler can remove contents. Clearing and cleaning are defined together here, completed under one signed scope, and closed with a documented Property Handoff Record — not just an empty room."
    },
    {
      question: "How much does an estate cleanout cost?",
      answer: "It depends on property size, volume, condition, access, and disposal needs. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price instead of a guess."
    }
  ]
} as const;

export const hoardingPage = {
  slug: "/hoarding-cleanup-san-jose/",
  gate: null as string | null,
  hero: {
    eyebrow: "Hoarding Cleanup · San Jose & the South Bay",
    h1: "Help for a parent's house that's become too full to manage",
    lead: "You're not here to fix a person — you're trying to get a property back to a livable, safe condition without a stranger judging what they find. That's the job, and it's a common one."
  },
  recognition: {
    eyebrow: "For the family managing this",
    heading: "Will everything be thrown away?",
    body: [
      "No. Nothing is removed without written approval. Items you're unsure about go into a review category and stay there until someone decides — not automatically into a dumpster.",
      "You called us because this is more than a weekend of cleaning, and because you'd rather have one accountable company handle it than coordinate a hauler, a cleaner, and your own nerves at the same time."
    ],
    secondQuestion: {
      heading: "Will the crew judge what they find?",
      body: "No signage, unmarked scheduling where needed, and a crew whose job is the property's condition — not commentary on how it got that way. We've cleared properties in every condition; nothing about this situation is unusual to us."
    }
  },
  scope: {
    heading: "What hoarding cleanup covers",
    included: [
      "Room-by-room sorting into keep, remove, and review categories",
      "Heavy accumulation clearing, including pathways, blocked exits, and stacked contents",
      "Nonhazardous contents bagging, consolidation, and approved disposal",
      "Deep cleaning after clearing — floors, surfaces, kitchen and bathroom",
      "Animal and organic condition cleaning under our organic pathogen endorsement, where present",
      "Discovered-item isolation and reporting"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard."
  },
  fiduciary: {
    heading: "For adult children managing a parent's property",
    body: "A written scope means the decision about what leaves doesn't rest on whoever's standing in the room that day. It's documented before clearing starts, and the closeout record shows what was done — useful if siblings or other family want to know later."
  },
  method: {
    heading: "Five stages, one accountable operator"
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Change authorization",
    recordValue: "Change Auth 01 · Kitchen appliance interiors added to cleaning scope · owner-approved",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed hoarding cleanup — property type, city, and what made the situation specific, per docs/19-SYSTEM-AND-SITEMAP.md §1.5 job-close checklist. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Property size",
      "Volume of contents",
      "Cleaning condition",
      "Access and stairs",
      "Disposal requirements",
      "Labor and deadline"
    ]
  },
  faq: [
    {
      question: "Will everything be thrown away?",
      answer: "No. The scope identifies keep, remove, and review areas before any clearing starts. Uncertain items are not automatically discarded."
    },
    {
      question: "Will you judge the condition of the property?",
      answer: "No. We've cleared properties in every condition. The job is getting the property to a documented, livable handoff state — not commentary on how it got there."
    },
    {
      question: "Can this be done without my parent present?",
      answer: "Yes, when access and decision authority are clear. We work from an approved written scope, not room-by-room instructions given in person."
    },
    {
      question: "What if you find something valuable or important?",
      answer: "Discovered keys, documents, photographs, cash, jewelry, and similar items are isolated and reported, not disturbed or discarded."
    },
    {
      question: "Do you handle animal waste or odor along with the clutter?",
      answer: "Yes — cleaning of animal-affected and organic conditions is included under our organic pathogen endorsement, as cleaning within lawful scope."
    },
    {
      question: "How discreet is the crew and the vehicle?",
      answer: "Unmarked vehicles, plain clothing, and no signage. We do not discuss the property with neighbors, and scheduling can be arranged around who is home or visible nearby."
    }
  ]
} as const;

// Wording law (docs/19-SYSTEM-AND-SITEMAP.md §2.2 + owner directive): cleaning under the
// organic pathogen endorsement only. Never biohazard, remediation, decontaminate, sanitize,
// or sterilize. No rodent or hantavirus naming. Every string on this page was written and
// re-checked against that list — see the guardrails pass in the session report.
export const animalPage = {
  slug: "/animal-waste-cleanup-san-jose/",
  gate: null as string | null,
  hero: {
    eyebrow: "Animal Waste & Organic Condition Cleaning · San Jose",
    h1: "Cleaning for homes with heavy animal waste or organic buildup",
    lead: "We have cleaned properties in this condition before, and we don't need the backstory. Tell us what you're looking at, and we'll tell you what's involved."
  },
  recognition: {
    heading: "This is a cleaning job, and we treat it like one",
    body: [
      "Whatever the property looks or smells like right now, someone else has called us about something similar. The condition doesn't change how we talk to you or what we charge to find out.",
      "Cleaning of animal-affected and heavy organic conditions is covered under our organic pathogen endorsement — a defined, insured cleaning scope, not a guess at what might be safe."
    ]
  },
  scope: {
    heading: "What this covers",
    included: [
      "Cleaning of animal waste, heavy soiling, and organic buildup under our organic pathogen endorsement",
      "Surface, floor, and accessible-area cleaning throughout affected rooms",
      "Contents clearing where waste or organic material has affected belongings",
      "Cabinet, appliance-interior, and baseboard cleaning within the approved scope",
      "Odor-contributing material removal as part of the cleaning scope",
      "Completion photographs and a documented closeout"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard."
  },
  method: {
    heading: "Five stages, one accountable operator"
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Approved cleaning scope",
    recordValue: "Kitchen & bath deep clean, floors, accessible surfaces",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed animal waste / organic condition cleaning job — property type, city, and what made the situation specific, per docs/19-SYSTEM-AND-SITEMAP.md §1.5 job-close checklist. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Property size",
      "Volume of contents",
      "Cleaning condition",
      "Access and stairs",
      "Disposal requirements",
      "Labor and deadline"
    ]
  },
  faq: [
    {
      question: "Is this a health-safety or regulatory determination?",
      answer: "No. This is cleaning of animal-affected and heavy organic conditions under our organic pathogen endorsement — a defined cleaning scope, not a health-safety or regulatory determination of any kind."
    },
    {
      question: "Will the crew judge the condition of the property?",
      answer: "No. We've cleaned properties in this condition before. The job is the cleaning, not commentary on how the property got that way."
    },
    {
      question: "Do you clean cat urine, pet waste, and related odor?",
      answer: "Yes, as part of the cleaning scope under our organic pathogen endorsement, within lawful and insured operating scope."
    },
    {
      question: "What if the condition turns out to be outside your scope?",
      answer: "Work in the affected area stops, the condition is documented, and you're notified before any next step is taken."
    },
    {
      question: "How discreet is the crew and the vehicle?",
      answer: "Unmarked vehicles, plain clothing, and no signage. We do not discuss the property with neighbors."
    },
    {
      question: "How much does this cost?",
      answer: "It depends on the area affected, volume, and access. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price."
    }
  ]
} as const;

export const seniorDownsizingPage = {
  slug: "/senior-downsizing-san-jose/",
  gate: null as string | null,
  hero: {
    eyebrow: "Senior Downsizing & Move-Out Support · San Jose",
    h1: "Support for a parent's move to a smaller place",
    lead: "This is about a move, not a loss. Sorting, deciding what comes along, and getting the property ready for its next chapter — all under one written plan."
  },
  recognition: {
    heading: "A fresh start, handled at a pace that works",
    body: [
      "Downsizing means deciding what matters enough to bring, what a family member might want, and what's simply ready to go. None of that has to happen in a single overwhelming weekend.",
      "A written scope means your parent — or you, managing it for them — knows exactly what's being cleared, cleaned, and kept before anyone starts, with nothing removed that wasn't approved first."
    ]
  },
  scope: {
    heading: "What downsizing support covers",
    included: [
      "Sorting with a keep / donate-or-gift / clear framework, room by room",
      "Set-aside handling for items going to family members or a new residence",
      "Nonhazardous contents clearing and approved disposal coordination",
      "Deep cleaning of the property after clearing, for listing or handoff",
      "Discovered-item isolation and reporting — documents, photographs, jewelry, keys",
      "Completion photographs and a documented closeout"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard."
  },
  method: {
    heading: "Five stages, one accountable operator"
  },
  referralNote: {
    heading: "For senior move managers and care coordinators",
    body: "If you're recommending a vendor to a client's family, this is the page to share before the move: a written scope, documented closeout, and a single accountable operator for the clearing and cleaning together."
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Room-by-room disposition",
    recordValue: "Entry + living — Keep — Furnishings remain; included in the cleaning pass",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed senior downsizing job — property type, city, and what made the situation specific, per docs/19-SYSTEM-AND-SITEMAP.md §1.5 job-close checklist. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Property size",
      "Volume of contents",
      "Cleaning condition",
      "Access and stairs",
      "Disposal requirements",
      "Labor and deadline"
    ]
  },
  faq: [
    {
      question: "Can my parent be involved in deciding what stays?",
      answer: "Yes — the written scope is built around whoever the authorized decision-maker is, whether that's your parent, you, or both together."
    },
    {
      question: "What if we're not sure yet what's coming to the new place?",
      answer: "Items you're unsure about go into a review category and stay there. Nothing is cleared automatically while a decision is still open."
    },
    {
      question: "Can you coordinate around a moving company or move date?",
      answer: "Yes. Share the moving date and any moving-company timing when you request an assessment, and it's factored into scheduling."
    },
    {
      question: "Do you clean the property after it's cleared, for the next residents?",
      answer: "Yes — deep cleaning after clearing is part of the same signed scope, so the property is ready for its next handoff, not left for a separate cleaning company."
    },
    {
      question: "What happens to items my parent wants to give to family?",
      answer: "Set-aside items are identified and handled separately from clearing, so gifts and keepsakes don't get mixed in with what's being removed."
    },
    {
      question: "How much does this cost?",
      answer: "It depends on property size, volume, and condition. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price instead of a guess."
    }
  ]
} as const;

export const serviceAreasHub = {
  slug: "/service-areas/",
  gate: null as string | null,
  intro:
    "Aseptaclean serves San Jose and the surrounding South Bay — property cleanouts, estate clearing, and deep cleaning under one written scope, wherever the property sits in the county.",
  clusters: [
    {
      name: "West Valley",
      note: "Campbell, Saratoga-adjacent, and the western San Jose neighborhoods — closer-lot properties where access and parking often shape the plan."
    },
    {
      name: "Peninsula edge",
      note: "Mountain View, Sunnyvale, and Santa Clara — a mix of longtime family homes and faster-turnover rentals, both needing the same documented handoff."
    },
    {
      name: "South County",
      note: "San Jose's southern neighborhoods, where larger lots and multi-generational households often mean a bigger sort-and-clear phase before cleaning begins."
    }
  ]
} as const;

// Gate: docs/19-SYSTEM-AND-SITEMAP.md §2.1 Phase 3b — "gate: B10 checklist finalized."
// The B10 deep-cleaning checklist items themselves are gated facts; do not invent them.
// EXPANDED SPEC (this session's build directive): checklist categories as H2s, surface-
// restoration scope, the damage-restoration wording law. Category items below are drawn only
// from docs/19-SYSTEM-AND-SITEMAP.md §2.2's owner-confirmed detail scope ("shower glass
// hard-water and mineral-deposit treatment, tile & grout deep cleaning, bathroom fixture and
// finish detailing, cabinet & appliance interiors, baseboards/doors/switch plates"); every item
// beyond that confirmed list is an [OWNER INPUT] placeholder, never invented, per this session's
// directive and the B10-unfinalized gate.
// WORDING LAW: "surface restoration" / "finish restoration" through cleaning is permitted and
// accurate here. "Restoration" in the damage sense — water, fire, flood, smoke — is a different
// licensed industry and never appears on this page or in its schema.
export const deepCleaningPage = {
  slug: "/deep-cleaning-san-jose/",
  gate: "B10 checklist unfinalized — page built as an unpublished draft; do not launch until the B10 deep-cleaning checklist is finalized (docs/19-SYSTEM-AND-SITEMAP.md §2.1 Phase 3b).",
  hero: {
    eyebrow: "Deep Cleaning & Surface Restoration · San Jose & the South Bay",
    h1: "Deep cleaning for a property that's ready to be occupied again",
    lead: "For properties that are already cleared and just need the detailed clean before a listing, move-in, or inspection."
  },
  recognition: {
    heading: "The written checklist is the product, not an adjective",
    body: [
      "Some properties don't need clearing — the contents are already gone, and what's left is getting the space to a move-in or listing-ready condition through surface and finish restoration by cleaning: hard-water and mineral-deposit treatment, tile and grout work, and detailed interior cleaning, not a general promise to make things \"sparkling.\"",
      "[OWNER INPUT: confirm whether Deep Cleaning is offered as a standalone scope independent of a prior Aseptaclean clearing job, before this section is finalized.]"
    ]
  },
  checklist: {
    eyebrow: "The room-by-room checklist",
    intro:
      "This is the itemized scope you'd get in writing before work begins — sold as a checklist, not an outcome adjective. Every item below is either confirmed operational capability or flagged for owner confirmation before this page can launch.",
    categories: [
      {
        heading: "Bathrooms & glass",
        items: [
          "Shower glass hard-water and mineral-deposit treatment",
          "Tile and grout deep cleaning",
          "Bathroom fixture and finish detailing",
          "[OWNER INPUT: remaining bathroom checklist items from the finalized B10 list]"
        ]
      },
      {
        heading: "Kitchen & appliances",
        items: [
          "Cabinet interiors",
          "Appliance interiors",
          "[OWNER INPUT: remaining kitchen checklist items from the finalized B10 list — e.g. countertop and backsplash detail, sink and faucet finish treatment]"
        ]
      },
      {
        heading: "Floors & surfaces",
        items: [
          "Baseboards",
          "Doors",
          "Switch plates",
          "[OWNER INPUT: floor-surface-specific checklist items from the finalized B10 list — e.g. hard-surface floor treatment by flooring type]"
        ]
      },
      {
        heading: "Whole-house detail",
        items: [
          "[OWNER INPUT: the finalized B10 whole-house detail checklist items — do not publish specifics until B10 is finalized]"
        ]
      }
    ]
  },
  scope: {
    heading: "What deep cleaning covers",
    included: [
      "Kitchen deep clean, including cabinet and appliance interiors",
      "Bathroom deep clean, including fixtures and grout-level detail",
      "Shower glass hard-water and mineral-deposit treatment",
      "Floors, baseboards, doors, and accessible surfaces throughout",
      "Surface and finish restoration through cleaning — not damage restoration",
      "[OWNER INPUT: the finalized B10 deep-cleaning checklist item list — do not publish an item list until B10 is finalized]"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard. This is surface and finish restoration through cleaning only; we do not perform water, fire, flood, or smoke damage restoration."
  },
  method: {
    heading: "One written scope, one documented closeout"
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Approved cleaning scope",
    recordValue: "Kitchen & bath deep clean, floors, accessible surfaces",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed deep-cleaning job — property type, city, and what made the situation specific. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Property size",
      "Cleaning condition",
      "Access and stairs",
      "Cabinet and appliance interior scope",
      "Labor and deadline"
    ]
  },
  faq: [
    {
      question: "Do I need to clear the property first?",
      answer: "Yes — this scope covers cleaning, not contents clearing. [OWNER INPUT: confirm the exact hand-off condition required before a deep-cleaning appointment.]"
    },
    {
      question: "Can this be scheduled around a move-out or move-in date?",
      answer: "Yes. Share the target date when requesting an assessment and it's factored into scheduling."
    },
    {
      question: "What's included in the cabinet and appliance interior cleaning?",
      answer: "[OWNER INPUT: finalized B10 checklist detail — do not publish specifics until B10 is finalized.]"
    },
    {
      question: "Is this the same as water, fire, or smoke damage restoration?",
      answer: "No. This is surface and finish restoration through cleaning — hard-water treatment, tile and grout work, detailed interior cleaning. Water, fire, flood, and smoke damage restoration is a separate licensed industry we do not perform."
    },
    {
      question: "How much does deep cleaning cost?",
      answer: "It depends on property size, condition, and the scope of interior detail requested. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price."
    }
  ]
} as const;

// Gate: docs/19-SYSTEM-AND-SITEMAP.md §2.1 Phase 3b — "gate: crew capacity confirmed."
// Same-week availability language is explicitly conditional on operational truth per §2.2;
// none is published here without owner confirmation.
export const propertyManagersPage = {
  slug: "/property-cleanouts-for-managers/",
  gate: "Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for PM/turnover volume is confirmed (docs/19-SYSTEM-AND-SITEMAP.md §2.1 Phase 3b).",
  hero: {
    eyebrow: "Property Cleanouts for Managers · San Jose & the South Bay",
    h1: "Turnover cleanouts that keep a vacancy on schedule",
    lead: "Tenant abandonment, eviction cleanout, and foreclosure turnovers — one written scope, one accountable vendor, one closeout record for the file."
  },
  fiduciary: {
    heading: "For property managers and owners",
    body: [
      "A vacancy that sits unclear about scope, cost, or timeline is a vacancy that's losing money. A signed scope before work starts means no surprise change orders mid-turnover.",
      "The Property Handoff Record at closeout — photographs, discovered-item log, exception list — gives you documentation for the owner file or the next tenant walkthrough, not just a verbal \"it's done.\""
    ]
  },
  scope: {
    heading: "What a turnover cleanout covers",
    included: [
      "Abandoned-contents clearing, including tenant-left belongings within lawful scope",
      "Nonhazardous debris and contents removal, bagging, and disposal coordination",
      "Deep cleaning after clearing — kitchen, bathroom, floors, accessible surfaces",
      "Discovered-item isolation and reporting, per your abandonment-notice requirements",
      "Completion photographs and a documented closeout for the owner file"
    ],
    exclusionsNote:
      "Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard."
  },
  availability: {
    heading: "Availability",
    body: "[OWNER INPUT: confirm actual same-week or turnaround availability for PM-volume work before publishing any specific timeline claim — docs/19-SYSTEM-AND-SITEMAP.md §2.2 permits this messaging only if operationally true.]"
  },
  method: {
    heading: "One written scope, one documented closeout"
  },
  proof: {
    recordLabel: "From a Property Handoff Record",
    recordField: "Exception status",
    recordValue: "1 open exception — primary closet contents pending owner review",
    jobLine: "[OWNER INPUT: one anonymized real-job specific from a completed PM/turnover cleanout — property type, city, and what made the situation specific. Do not invent.]"
  },
  pricing: {
    heading: "What affects the price — no invented figures",
    drivers: [
      "Unit size",
      "Volume of abandoned contents",
      "Cleaning condition",
      "Access and stairs",
      "Disposal requirements",
      "Turnaround deadline"
    ]
  },
  faq: [
    {
      question: "Can you work directly with our office instead of the owner?",
      answer: "Yes, provided one authorized decision-maker at your office controls approvals and payment."
    },
    {
      question: "How do discovered tenant belongings get handled?",
      answer: "Discovered items are isolated and reported so you can apply your own abandonment-notice and holding-period procedures before anything is discarded."
    },
    {
      question: "Can you turn a unit around within a specific window?",
      answer: "[OWNER INPUT: confirm actual turnaround capability before publishing — do not claim same-week availability until crew capacity is confirmed.]"
    },
    {
      question: "Do you provide documentation for the owner file?",
      answer: "Yes — a Property Handoff Record with completion photographs, an exception list, and a change-authorization log for anything added to the original scope."
    },
    {
      question: "How much does a turnover cleanout cost?",
      answer: "It depends on unit size, volume, condition, and turnaround needs. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price."
    }
  ]
} as const;

// Chunk 1 of the nested-hub-layer IA expansion (2026-08-11 owner sitemap paste, see the
// session plan referenced in src/pages/services/index.astro's header comment). Hybrid IA
// decision: this hub links DOWN to the existing flat service-page slugs above — it does not
// introduce or require any new nested child routes. Card copy is pulled verbatim from
// site.ts's already-approved homepage.serviceCards (docs/18-VISUAL-DIRECTION.md §6 row 3) so
// no new claim is introduced by this page. No biohazard pillar — out of scope per
// docs/05-DECISIONS-LOG.md / docs/19 Phase 5 / docs/90.
export const servicesHub = {
  slug: "/services/",
  gate: null as string | null,
  intro:
    "Every project starts with the same written scope, whichever kind of work the property needs — clearing heavy accumulation, cleaning after it's cleared, or resetting a property that just needs deep cleaning on its own.",
  pillars: [
    {
      title: "Complex property clearing",
      detail:
        "Whole-property clearing for heavy accumulation, estate, and abandoned-contents conditions — nonhazardous contents, within a signed scope.",
      links: [
        { label: "Estate cleanout", href: estatePage.slug },
        { label: "Hoarding cleanup", href: hoardingPage.slug },
        { label: "Property cleanouts for managers", href: propertyManagersPage.slug }
      ]
    },
    {
      title: "Animal & organic condition cleaning",
      detail:
        "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination or health-safety determination.",
      links: [{ label: "Animal waste cleanup", href: animalPage.slug }]
    },
    {
      title: "Reset & restoration cleaning",
      detail:
        "Deep reset cleaning after clearing — kitchens, baths, cabinet and appliance interiors, floors and accessible surfaces — for the next handoff.",
      links: [
        { label: "Deep cleaning", href: deepCleaningPage.slug },
        { label: "Senior downsizing", href: seniorDownsizingPage.slug }
      ]
    }
  ]
} as const;

// Chunk 2 of the nested-hub-layer IA expansion (2026-08-11 owner sitemap paste, see the plan
// referenced in src/pages/who-we-help/index.astro's header comment). Audience framing, not
// service framing — segment copy is re-angled from already-approved material elsewhere in this
// file and in site.ts (estatePage.trackB, hoardingPage.fiduciary, seniorDownsizingPage.
// referralNote, propertyManagersPage.fiduciary, homepage.qualification/contrast) rather than
// inventing new claims. Every segment below links DOWN to existing flat service-page slugs —
// no new nested child routes.
//
// SCOPE DECISION: the owner's original pasted sitemap listed seven audiences (property owners,
// families & estate representatives, property managers, realtors, contractors, fiduciaries/
// attorneys, commercial properties). Trimmed to three segments this pass because that's what
// existing copy actually supports as a distinct, non-thin page:
//   - Families & estate representatives — merges "property owners" and "fiduciaries/attorneys"
//     into the families segment. estatePage.trackB and hoardingPage.fiduciary already frame
//     executors/attorneys/property-managers-as-fiduciary together with the family audience
//     rather than as a separate persona with its own distinct copy — splitting them into two
//     pages would mean duplicating the same paragraphs under two URLs, not writing two real
//     pages.
//   - Property managers — propertyManagersPage is already a full fiduciary-framed page for this
//     exact audience; site.ts's FAQ ("Can you work with my realtor, property manager...")
//     corroborates.
//   - Seniors & move managers — seniorDownsizingPage plus its referralNote block, which already
//     explicitly addresses senior move managers and care coordinators as a secondary audience.
// NOT built — would require net-new claims doc 19/04-CLAIMS-GUARDRAILS.md don't currently
// support:
//   - Realtors — appears only as a third party a finished property gets "shown to" (docs/00,
//     docs/06) and in one FAQ line. No realtor-framed value prop (listing timelines, staging-
//     ready condition, etc.) exists anywhere to re-angle.
//   - Contractors — zero mentions anywhere in src/data.
//   - Commercial properties — site content (residenceOffer, service-area cities, FAQ) is
//     residential-cleanout framed throughout; no commercial-property scope, pricing driver, or
//     claim exists to re-angle.
// Revisit if/when the owner supplies real realtor/contractor/commercial-specific content.
export const whoWeHelpHub = {
  slug: "/who-we-help/",
  gate: null as string | null,
  intro:
    "Aseptaclean works with whoever is responsible for a property's next step — a family member, an executor, a property manager, or a move manager coordinating on someone else's behalf. Every situation gets the same written scope and documented closeout.",
  segments: [
    {
      title: "Families & estate representatives",
      detail:
        "For the family member sorting a parent's home, and for the executor, attorney, or trustee who needs a written scope and a documented closeout for the estate file.",
      points: [
        "Nothing is removed without written approval — uncertain items go into a review category, not a dumpster.",
        "One accountable operator for clearing and cleaning together, with a signed scope before work begins and a Property Handoff Record at closeout.",
        "Discovered documents, photographs, jewelry, keys, and cash are isolated and reported, not disturbed or discarded."
      ],
      links: [
        { label: "Estate cleanout", href: estatePage.slug },
        { label: "Hoarding cleanup", href: hoardingPage.slug },
        { label: "Estate cleanout checklist (free resource)", href: "/estate-cleanout-checklist/" }
      ]
    },
    {
      title: "Property managers",
      detail:
        "For property managers and owners turning over a vacant unit — tenant abandonment, eviction cleanout, or foreclosure turnover — who need the vacancy back on schedule without a surprise change order mid-turnover.",
      points: [
        "A signed scope before work starts, so cost and timeline are set before the crew arrives.",
        "Discovered tenant belongings are isolated and reported so your abandonment-notice and holding-period procedures apply before anything is discarded.",
        "A Property Handoff Record at closeout — photographs, exception list, discovered-item log — for the owner file."
      ],
      links: [{ label: "Property cleanouts for managers", href: propertyManagersPage.slug }]
    },
    {
      title: "Seniors & move managers",
      detail:
        "For a parent moving to a smaller place, and for the senior move managers and care coordinators recommending a vendor to a client's family before the move.",
      points: [
        "Sorting follows a keep / donate-or-gift / clear framework, at a pace that doesn't force a single overwhelming weekend.",
        "Set-aside items for family members are handled separately from clearing, so gifts and keepsakes don't get mixed in with what's removed.",
        "Clearing and the post-move deep clean happen under one signed scope, so the property is ready for its next handoff."
      ],
      links: [{ label: "Senior downsizing", href: seniorDownsizingPage.slug }]
    }
  ]
} as const;
