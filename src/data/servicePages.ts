// Page copy that is NOT sourced from docs/27-COPY-CANONICAL.md §12–15 lives here: the estate
// checklist asset, senior downsizing (doc 19 only — doc 27 has no §12–15 section for it), the
// service-areas hub, and the category/audience hub pages.
//
// The fourteen individual service pages that DO have doc 27 §12–15 copy moved to
// src/data/doc27ServicePages.ts on 2026-08-16 and are imported below only so the hubs can link
// to their canonical slugs. Do not re-add page copy for them here — one page, one copy source.
import {
  animalPage,
  commercialPage,
  crimeScenePage,
  deepCleaningPage,
  estatePage,
  extremeCleaningPage,
  debrisRemovalPage,
  evictionCleanoutPage,
  hoardingPage,
  moveOutCleaningPage,
  pigeonPage,
  postConstructionPage,
  propertyCleanoutsPage,
  rodentPage,
  windowCleaningPage
} from "@data/doc27ServicePages";
// The fee framing and the figure both live in site.ts (AGENTS.md §3). Imported so the FAQ
// answer below states them rather than retyping "$195" as a literal, which §3 forbids.
import { site } from "@data/site";

// Phase 3/3b draft service-page content, built per docs/19-SYSTEM-AND-SITEMAP.md Part 2
// (§2.2 SEO spec) and Part 3 (§3.2 wireframe + tone deltas). Every page sourced from this
// file ships noindex={true} and is excluded from src/pages/sitemap.xml.ts's manual allowlist
// until its own launch gate clears — see docs/05-DECISIONS-LOG.md for the biohazard exclusion
// and each page's own gate note below. Sentences here are held to the same
// docs/01-QUALITY-GUARDRAILS.md bar as any live page; nothing here is placeholder-quality
// copy waiting to be rewritten later. As of 2026-08-18 this file carries ZERO [OWNER INPUT: …]
// markers — the last one (seniorDownsizingPage.proof.jobLine) was deleted rather than filled,
// because no approved copy exists for it and doc 19 forbids inventing one. Keep it that way:
// a slot with no real asset gets deleted or left unrendered, never stubbed.

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
  // Owner ruling 2026-08-20 (P9 row 10), in two passes. Pass 1 struck the self-reference —
  // "This is also the section of the checklist Aseptaclean is named in, if you're reading it
  // that way" — because the neutral frame is what makes the asset forwardable by a third party
  // and the section does its work without pointing at the brand. Do not restore it.
  //
  // Pass 2 is the line below, owner-supplied verbatim. The struck clause had been the only thing
  // separating the surviving text from the H2 above it ("Whoever you hire, ask for something
  // like this at the end"), so removing it left the body restating its own heading. This ties
  // the sentence to the section's subject — the artifact — instead. Do not "simplify" it back
  // toward the heading's wording.
  //
  // NO AUTOMATED COPY VERIFICATION COVERS THIS STRING. See the header comment on
  // src/pages/estate-cleanout-checklist/index.astro: this route's copy has no doc 27 source and
  // is outside qa:gate6's corpus entirely. Changes here are verified by reading the rendered
  // section in dist/ and grepping it, never by a green gate run.
  vendorCta:
    "The record it produces should stand on its own, regardless of who you hire.",
  footerNote:
    "This checklist is a neutral reference for executors and families. It does not require using Aseptaclean or any specific vendor."
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
    recordValue: "Entry + living — Keep — Furnishings remain; included in the cleaning pass"
    // `jobLine` deleted 2026-08-18, not replaced. It held the last [OWNER INPUT: …] string in
    // src/. docs/27-COPY-CANONICAL.md has no approved copy for this slot — the doc covers no
    // senior-downsizing page at all (§12–15 name 14 service pages, none of them this one) and
    // its §11 shared service-page structure has no proof/real-job step in the sequence. The
    // slot came from doc 19 §3.2, which also forbids inventing its content. Zero completed
    // jobs are documented (AGENTS.md §5), so there is no real line to write and writing one
    // would violate §0.3. ServiceProof now omits the job half when no line is supplied —
    // an empty slot ships, an empty *labeled* slot does not. Restore by passing `jobLine`
    // once a real anonymized line clears the doc 19 §1.5 job-close checklist.
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
      // Doc 27 §7 owner-approved framing, 2026-08-20. The opening sentence is the existing
      // approved answer and stays; the fee sentence it used to carry ("A $195 on-site
      // assessment, credited toward an approved project booked within 7 days, gives you a
      // written price instead of a guess.") is replaced by §7 verbatim.
      //
      // THIS IS THE ONE SURFACE WHERE THE CREDIT TERM IS LOST. Everywhere else the credit is
      // its own rendered element and was kept alongside §7; here it was inside the same
      // sentence as the figure, so replacing the sentence removes it. Flagged to the owner
      // rather than papered over by appending the credit back onto approved copy.
      answer: `It depends on property size, volume, and condition. ${site.offer.assessmentFraming(site.offer.assessmentFee)}`
    }
  ]
} as const;

export const serviceAreasHub = {
  slug: "/service-areas/",
  gate: null as string | null,
  // No consumer in src/ today — /service-areas/ renders `clusters` and the doc27CompanyPages
  // record, not this string. Corrected with the 2026-08-21 positioning pass anyway, for the same
  // reason as publishingNote above.
  intro:
    "Aseptaclean covers San Jose and the surrounding South Bay & Peninsula: detailed cleaning, complex property cleanup, and animal or organic condition work, under one written scope wherever the property sits.",
  clusters: [
    {
      name: "West Valley",
      note: "Campbell, Saratoga-adjacent addresses, and western San Jose. Share the property address so access and project logistics can be reviewed for that specific site."
    },
    {
      name: "Peninsula edge",
      note: "Mountain View, Sunnyvale, and Santa Clara. Share the property address so access and project logistics can be reviewed for that specific site."
    },
    {
      name: "South County",
      note: "Southern San Jose. Share the property address and approved contents scope so the sort-and-clear phase can be planned for that specific site."
    }
  ]
} as const;

// SERVICES HUB — rebuilt 2026-08-26 to docs/30-WEBSITE-MASTER-SPEC.md §18 and §20A.20, whose
// architecture is problem-chooser first, active-directory second. It replaces the three-pillar
// card grid this export used to carry (Chunk 1 of the 2026-08-11 nested-hub IA expansion), which
// restated homepage.serviceCards verbatim and gave nine routes the same visual weight.
//
// WHY THE PILLAR SHAPE WENT. §20A.20's "critical gate" is that the directory be built from
// current active/public service state, and §18 adds "avoid a giant grid of 12 identical cards."
// The pillars did the opposite on both counts: they were three equal cards, and pillar three
// existed to name a family whose only route ships noindex. The families survive — they are the
// `families` array below — but they now carry hierarchy instead of uniformity.
//
// ROUTES ARE IMPORTED, NEVER RETYPED. Every href below is a `.slug` off a doc27ServicePages
// record, so a slug cannot drift and a gated route cannot be linked by editing a copy string.
// The call site filters on each record's own `indexable` flag, which is the mechanism site.ts's
// routingDoors comment describes: a gated route starts linking on its own the day its gate
// clears, with no copy change here.
//
// THREE THINGS THIS FILE DELIBERATELY DOES NOT DO — see docs/05-DECISIONS-LOG.md, 2026-08-26:
//   1. It does not name or link rodent-droppings or pigeon-droppings cleanup. Those two are
//      operationally available (doc 30 §20A.4) but they are held off every advertising surface
//      on Cal. B&P §8550(a) and doc 21 §3 — rank 3, and AGENTS.md §2 states outright that the
//      operational-availability clarification does not reach that constraint. `/services/` is
//      indexable; today ZERO indexable pages link to either route, and this rebuild keeps it so.
//   2. It does not use the landing-page system's "San Jose & Santa Clara County" geography.
//      Owner ruling 2026-08-09: the label is "South Bay & Peninsula", because Atherton and part
//      of the declared footprint sit in San Mateo County.
//   3. It does not imply a dedicated move-in route exists (doc 30 §20A.3). Move-in cleaning is
//      named only as half of the real route's real label, "Move-in & move-out cleaning".
export const servicesHub = {
  slug: "/services/",
  gate: null as string | null,
  seoTitle: "Property Cleanup Services in San Jose | Aseptaclean",
  metaDescription:
    "Not sure what kind of cleanup the property needs? Detailed cleaning, complex property cleanup and severe-condition work across the South Bay & Peninsula.",
  // Locked copy's exact hero — docs/aseptaclean-all-website-copy.md, "PAGE: Services".
  // The profile AC-CP70-91130-1.1 descriptor swap is BLOCKED here on claims grounds; see the
  // note on `home.hero` in src/data/publicCopy.ts and docs/05-CURRENT-DECISIONS.md 2026-09-04.
  hero: {
    eyebrow: "Specialty Property Cleanup",
    h1: "When the property needs more than a normal cleaning company.",
    lede: [
      "Some properties are simply dirty.",
      "Others are harder to deal with.",
      "There may be heavy buildup, accumulated belongings, rodent contamination, animal waste, neglected rooms, strong odors, or years of conditions that have made the property difficult to use.",
      "Aseptaclean helps homeowners, families, property owners, and managers understand what needs attention and get the property back under control."
    ]
  },
  // PROBLEM CHOOSER. The doors themselves are homepage.routingDoors in src/data/site.ts —
  // owner-approved verbatim 2026-08-20, written for precisely this job ("name their situation
  // before naming your service") and rendering on ZERO pages since the V3 homepage rebuild
  // deleted RoutingDoors.astro on 2026-08-25. That deletion removed a duplicate routing system
  // from `/`; it did not retire the copy, and doc 30 §18 makes routing this page's whole job.
  // Only the framing below is new.
  // Locked copy's exact "Not sure which category your property falls into?" section —
  // docs/aseptaclean-all-website-copy.md. The old six-door routing mechanism (estate cleanout,
  // property cleanouts, move-out cleaning, commercial) pointed at routes the 2026-09-03 launch
  // architecture no longer publishes, so `chooser.condition` (the one animal-waste addendum) is
  // no longer rendered — see ServiceProblemChooser.astro's `showCondition` guard, unchanged.
  chooser: {
    eyebrow: "Not sure which category your property falls into?",
    heading: "You do not need to know.",
    lede: "That is one of the reasons we start with an assessment.",
    condition: {
      label: "Animal waste has affected floors, rooms, or surfaces",
      detail:
        "Repeated or heavy non-human animal urine or feces, after the animal issue itself has been dealt with.",
      linkLabel: "Animal waste cleanup",
      href: null as string | null,
      clause: animalPage.complianceClause
    }
  },
  notSure: {
    heading: "Our job is to understand the condition before recommending the work.",
    lede: "A property may appear to need deep cleaning until rodent contamination is discovered. A cluttered home may also have sanitation problems underneath the contents. A property that looks severe in photos may turn out to need a much smaller scope once we see it.",
    combinations: [
      "Deep cleaning + rodent contamination",
      "Heavy clutter + sanitation problems underneath",
      "A property that looks severe but needs a smaller scope",
      "Several problems at the same time"
    ],
    close:
      "There is no benefit to selling you more cleanup than the property needs. If the job is straightforward, we will tell you. If the property needs a more involved approach, we will explain why."
  },
  // Locked copy's exact "Which service should I choose?" — docs/aseptaclean-all-website-copy.md.
  // Repurposes the qualifying-column layout (numbered, editorial, no cards) for the four public
  // services instead of the old three routine/detailed/complex tiers.
  conditionLevels: [
    {
      name: "The home is overwhelmed with belongings.",
      body: "Start with Hoarding Cleanup.",
      verdict: "Belongings still need sorting and decisions still have to be made.",
      fit: true,
      href: hoardingPage.slug as string | null,
      linkLabel: "Hoarding Cleanup" as string | null,
      examples: [] as readonly string[]
    },
    {
      name: "The property is heavily neglected or unsanitary.",
      body: "Start with Severe Property Cleanup.",
      verdict: "Heavy buildup, trash, odors, and sanitation concerns change the job.",
      fit: true,
      href: extremeCleaningPage.slug as string | null,
      linkLabel: "Severe Property Cleanup" as string | null,
      examples: [] as readonly string[]
    },
    {
      name: "You found mouse or rat droppings, urine, or animal waste.",
      body: "Start with Rodent Droppings & Animal Waste Cleanup.",
      verdict: "Pest control stops the activity. We address what was left behind.",
      fit: true,
      href: rodentPage.slug as string | null,
      linkLabel: "Rodent Droppings & Animal Waste Cleanup" as string | null,
      examples: [] as readonly string[]
    },
    {
      name: "The home is generally in good condition but needs a serious reset.",
      body: "Start with Detailed Deep Cleaning.",
      verdict: "For homes that need more than routine cleaning.",
      fit: true,
      href: deepCleaningPage.slug as string | null,
      linkLabel: "Detailed Deep Cleaning" as string | null,
      examples: [] as readonly string[]
    },
    {
      name: "There has been a crime, trauma, or unattended death and the scene has been released.",
      body: "Start with Crime Scene & Trauma Cleanup.",
      verdict: "Blood, bodily fluids, and regulated waste require a different, dedicated process.",
      fit: true,
      href: crimeScenePage.slug as string | null,
      linkLabel: "Crime Scene & Trauma Cleanup" as string | null,
      examples: [] as readonly string[]
    }
  ],
  // Locked copy's "We do not force every property into the same service" — reuses the reach
  // block's copy+sequence layout for a different argument since the new copy has no "you cannot
  // clean a floor you cannot reach" content.
  reach: {
    heading: "We do not force every property into the same service.",
    body: "There is no benefit to selling you more cleanup than the property needs. If part of the problem belongs with another professional — such as pest control, structural repair, HVAC work, or another specialty — we will make that clear.",
    sequence: [
      "Show us what is happening",
      "We assess the condition",
      "We build the scope",
      "We complete and review the agreed work"
    ],
    close: "A good scope starts with knowing where our responsibility begins and ends."
  },
  // ACTIVE SERVICE DIRECTORY. Grouped by the repository's real service families — the same three
  // groups megaNav uses — not by whatever grouping balances the layout (§20A.20's critical gate,
  // and the prompt's "do not invent a group merely because it looks balanced").
  //
  // `hub` is null on the specialty group ON PURPOSE. /specialty-cleaning/ ships noindex, and the
  // 2026-08-17 ruling recorded in docs/05-DECISIONS-LOG.md set it noindex precisely because its
  // cards name rodent and pigeon dropping cleanup. Linking it from an indexable hub would route
  // one click into the thing item 1 above exists to prevent.
  // Locked copy's exact four services — docs/aseptaclean-all-website-copy.md, "What can we help
  // with?" — the only services authorized by the current public launch architecture. One family
  // group, since the reduced set no longer needs the old three-group split.
  families: [
    {
      key: "current",
      name: "What can we help with?",
      summary: "Start with the condition. Build the right scope. Do the work in the right order.",
      hub: null as { label: string; href: string } | null,
      services: [
        {
          page: hoardingPage,
          label: "Hoarding Cleanup",
          thesis: "When belongings and clutter have made the home difficult to manage.",
          detail:
            "Hoarding cleanup is not just about removing things. Important belongings may be mixed into the clutter. Rooms may no longer be accessible. Years of buildup may be hidden underneath accumulated material. We help break the property into manageable steps, establish what stays and what goes, clear affected areas, and address the cleaning conditions underneath.",
          bestFor: [
            "Heavy clutter",
            "Accumulated belongings",
            "Rooms that are no longer usable",
            "Trash mixed with personal property",
            "Families helping a loved one",
            "Properties requiring sorting before cleaning"
          ]
        },
        {
          page: extremeCleaningPage,
          label: "Severe Property Cleanup",
          thesis: "When the condition has gone beyond a normal deep clean.",
          detail:
            "Some properties need more than additional scrubbing. Heavy buildup, trash, animal waste, odors, neglected rooms, and sanitation concerns can turn an ordinary cleaning problem into a much larger project. We assess what is actually happening, define the affected areas, and build the cleanup around the condition of the property. These situations are sometimes described as gross filth cleanup or extreme cleaning — we call it severe property cleanup because the condition matters more than the label.",
          bestFor: [
            "Severely neglected homes",
            "Heavy dirt and buildup",
            "Animal urine or feces",
            "Trash accumulation",
            "Strong odors",
            "Heavily soiled kitchens or bathrooms",
            "Properties left in poor condition after an occupant"
          ]
        },
        {
          page: rodentPage,
          label: "Rodent Droppings & Animal Waste Cleanup",
          thesis: "Pest control stops the activity. We address what was left behind.",
          detail:
            "Rodents can leave more than visible droppings. Urine, nesting material, contaminated debris, odors, and affected surfaces may remain after the rodents have been removed. Aseptaclean focuses on the cleanup side of the problem — we assess where activity occurred, determine what accessible areas need attention, and clean the affected property according to the agreed scope. Aseptaclean does not provide trapping, extermination, or rodent exclusion.",
          bestFor: [
            "Mouse or rat droppings",
            "Rodent urine",
            "Nesting material",
            "Contaminated garages or storage areas",
            "Droppings inside cabinets or drawers",
            "Animal feces",
            "Properties requiring cleanup after pest-control work"
          ]
        },
        {
          page: deepCleaningPage,
          label: "Detailed Deep Cleaning",
          thesis: "For homes that need more than routine cleaning.",
          detail:
            "Not every difficult property is a severe-condition property. Sometimes the home simply needs significantly more attention than a normal maintenance cleaning allows. Aseptaclean provides condition-based detailed cleaning for homes with heavy buildup, neglected details, demanding kitchens and bathrooms, or properties that need a thorough reset. We look at the condition before deciding what the cleaning should involve.",
          bestFor: [
            "Homes that have not been thoroughly cleaned in a long time",
            "Heavy kitchen or bathroom buildup",
            "Move-in cleaning",
            "Detailed move-out cleaning",
            "Homes preparing for sale",
            "High-detail residential cleaning",
            "Properties where standard cleaning has not been enough"
          ]
        }
      ]
    },
    // A separate family rather than a fifth tile in "current": this is a distinct, regulated
    // service (TSW #933) with its own gate history (see doc27ServicePages.ts), not a variation
    // on sort/clear/clean. Kept to one feature service so the section stays an asymmetric
    // addition rather than a forced second grid — doc 30 §18 / the design system's "avoid tiny
    // icon cards, use an asymmetric layout rather than forcing equal tiles" guidance.
    {
      key: "trauma",
      name: "Crime scene, trauma, or unattended death",
      summary: "Discreet cleanup after the scene has been released, with a defined regulated-waste pathway.",
      hub: null as { label: string; href: string } | null,
      services: [
        {
          page: crimeScenePage,
          label: "Crime Scene & Trauma Cleanup",
          thesis: "Professional cleanup after a traumatic event, once the scene has been released.",
          detail:
            "When law enforcement, emergency responders, or the coroner have completed their work and released the scene, blood, bodily fluids, affected belongings, and regulated waste may still remain. Aseptaclean provides discreet crime scene and trauma cleanup for homes, businesses, vehicles, and other accepted properties, and manages regulated trauma-scene waste through an authorized third-party transportation partner.",
          bestFor: [
            "Suicide or self-harm cleanup",
            "Homicide and crime scene cleanup",
            "Unattended death and decomposition",
            "Blood and bodily fluid cleanup",
            "Workplace and accident cleanup",
            "Vehicle biohazard cleanup"
          ]
        }
      ]
    }
  ],
  // Locked copy's exact "Why Aseptaclean" section — docs/aseptaclean-all-website-copy.md.
  // Verbatim, including the founder-background sentence — flagged for claims-law review in the
  // implementation report rather than altered; see docs/05-DECISIONS-LOG.md 2026-09-03.
  why: {
    eyebrow: "Why Aseptaclean",
    heading: "Difficult properties need more than a checklist.",
    paragraphs: [
      "Aseptaclean was built around work where condition, detail, and process matter.",
      "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.",
      "That experience shaped the way we approach property cleanup today:"
    ],
    statement: "Look closely. Understand the problem. Build the right process. Then do the work.",
    closing: [
      "We are not trying to make every home sound hazardous.",
      "And we are not trying to turn every cleaning request into a major remediation project.",
      "We want to understand what is actually happening and recommend the level of work that makes sense."
    ]
  },
  // Locked copy's exact "What Aseptaclean is not" section — docs/aseptaclean-all-website-copy.md.
  // Four headed items, verbatim. homepage.qualification / homepage.excludedScope (rendered by
  // ServiceScopeBoundary.astro's own columns below `notItems`) are a separate, older sitewide
  // exclusion/fit list — see that component's header note on why they must not be edited or
  // duplicated. They stay on the page; the MD's own four-item list is added alongside them
  // rather than replacing them, since neither source supersedes the other.
  boundary: {
    eyebrow: "Clear expectations matter",
    heading: "What Aseptaclean is not",
    lede: "Clear expectations matter.",
    notItems: [
      {
        title: "We are not a recurring maid service.",
        detail: "If you need weekly or biweekly maintenance cleaning, another company will probably be a better fit."
      },
      {
        title: "We are not a pest-control company.",
        detail: "We clean conditions left behind by rodent and animal activity. We do not provide extermination, trapping, or exclusion."
      },
      {
        title: "We are not a junk-hauling company.",
        detail: "Material removal may be part of certain cleanup projects, but the reason you hire Aseptaclean is to address the condition of the property—not simply to make items disappear."
      },
      {
        title: "We are not a general contractor.",
        detail: "If a property requires structural repairs or other licensed construction work, that work falls outside our cleanup scope."
      }
    ],
    notClose: "We stay focused on the work we are there to perform.",
    fitHeading: "Usually worth discussing",
    outsideHeading: "Outside current scope — another provider handles it",
    close: "We do not force every property into the same service."
  },
  // Locked copy's exact "How it works" five-step sequence — docs/aseptaclean-all-website-copy.md.
  start: {
    eyebrow: "How it works",
    heading: "You do not have to diagnose the property.",
    steps: [
      {
        title: "Show us what is happening.",
        detail:
          "Start with photos, video, or a short description of the property. For larger or more complicated situations, we may recommend an on-site assessment."
      },
      {
        title: "We assess the condition.",
        detail:
          "We look at the affected areas, access, contents, buildup, contamination concerns, and anything else that may change the work."
      },
      {
        title: "We build the scope.",
        detail:
          "You receive a clear explanation of what we recommend, what is included, and what the work will cost."
      },
      {
        title: "We complete the agreed work.",
        detail:
          "The project is approached according to the condition of the property rather than a one-size-fits-all checklist."
      },
      {
        title: "We review the result.",
        detail:
          "We identify what was completed and anything outside the agreed scope that may still require attention."
      }
    ]
  },
  // Locked copy's exact close — docs/aseptaclean-all-website-copy.md, "Start with what you see."
  close: {
    heading: "Start with what you see.",
    lede: "Take a few photos of the areas that concern you. Tell us what has been happening and what you want help with. We will review the condition and help you determine the right next step.",
    note: "Submitting a request does not authorize work or create a service agreement."
  }
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
      links: [{ label: "Property cleanouts for managers", href: propertyCleanoutsPage.slug }]
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

// Category hub pages added 2026-08-16 per docs/SITEMAP-MASTER.md, reconciling the built routes
// against the master sitemap. Copy is doc 27 §10.1–10.3 (the only hub-copy section doc 27
// actually has — the master's "27 §12/13/14 intro" copy-source column has no corresponding hub
// text at those locations; §12–14 are the individual service-page specs. See
// docs/05-DECISIONS-LOG.md for that correction). Route/eyebrow/H1/lead/card-title text is
// verbatim doc 27; no new claim is introduced. As of 2026-08-16 every sibling service page in
// all three categories is built, so every card now resolves to a real route and the null-href
// "page in development" state is unused — the hub components still handle null so a future card
// can be added before its page exists. Ships noindex, excluded from sitemap.xml.ts, unlinked
// from nav/footer, same as every other pre-launch page in this file.
export const detailedCleaningHub = {
  slug: "/detailed-cleaning/",
  gate: null as string | null,
  eyebrow: "Detailed cleaning",
  h1: "One-time cleaning for properties that need a real reset.",
  // 2026-08-21. The old lead ("Choose the page that matches the property's next event — not a
  // generic package…") restated the H2 that ServiceHub renders eleven lines below it ("Pick the
  // page that matches the property's next event."). Same page, same instruction, twice.
  lead: "Deep cleaning, move-out and move-in turnovers, post-construction work, and interior windows — each priced off a written checklist instead of a package name.",
  cards: [
    { title: "One-Time Deep Cleaning", href: deepCleaningPage.slug as string | null },
    { title: "Move-In & Move-Out Cleaning", href: moveOutCleaningPage.slug as string | null },
    { title: "Post-Construction Cleaning", href: postConstructionPage.slug as string | null },
    { title: "Window Cleaning", href: windowCleaningPage.slug as string | null }
  ]
} as const;

export const specialtyCleaningHub = {
  slug: "/specialty-cleaning/",
  gate: null as string | null,
  eyebrow: "Specialty cleaning",
  // 2026-08-21. "Condition-reviewed" is internal vocabulary; no customer says it.
  h1: "Cleaning for properties that need a walkthrough first.",
  lead: "Heavily soiled properties, animal waste and organic conditions. These need more screening and clearer boundaries than a normal cleaning job, and photos are where the review starts.",
  cards: [
    { title: "Extreme-Condition Cleaning", href: extremeCleaningPage.slug as string | null },
    { title: "Animal Waste Cleanup", href: animalPage.slug as string | null },
    { title: "Rodent Dropping Cleanup", href: rodentPage.slug as string | null },
    { title: "Pigeon Dropping Cleanup", href: pigeonPage.slug as string | null }
  ]
} as const;

// LABEL CHANGED 2026-08-21, ROUTE UNCHANGED — see the note above the Complex Property Cleanup
// group in src/data/site.ts. The old H1 was a three-part imperative ("Clear the contents. Recover
// access. Prepare the property.") and the old lead opened by defining its own category name, both
// patterns the positioning brief rules out. Property clearing remains a named concept in the lead.
export const propertyClearingHub = {
  slug: "/property-clearing/",
  gate: null as string | null,
  eyebrow: "Complex property cleanup",
  h1: "When the contents have to come out before anything else can happen.",
  lead: "Hoarding conditions, estate contents, tenant turnovers and whole-property clearing — sorted and cleared to a written plan, with a container arranged when the volume needs one.",
  cards: [
    { title: "Property Cleanouts", href: propertyCleanoutsPage.slug as string | null },
    { title: "Hoarding Cleanup", href: hoardingPage.slug as string | null },
    { title: "Estate Cleanouts", href: estatePage.slug as string | null },
    { title: "Debris Removal", href: debrisRemovalPage.slug as string | null },
    { title: "Eviction Cleanouts", href: evictionCleanoutPage.slug as string | null }
  ]
} as const;

// Shared hub close (doc 27 §10, below 10.4) — same block on every category hub above.
// 2026-08-21. The old body — "Photos can start the review. Larger, heavier or more complicated
// properties may require a walkthrough before a firm quote." — was the third rendering of the same
// photos-then-walkthrough pair a reader meets, after Pricing.astro on `/` and the quote card on
// every service page. All three now say their own thing; the four-step rail directly below this
// block already asks for the photos, so nothing was lost by changing what this one talks about.
export const hubClose = {
  label: "One rule across every service",
  heading: "We define the work before we schedule it.",
  body: "The rooms, the detail level and the exclusions are settled before a date goes in the calendar. That written scope is what the finished work gets measured against."
} as const;

// doc 27 §11 "Shared four-step process" — verbatim. Added 2026-08-18 for the visual port: the
// hub and service-page mockups both render this as the four-up grid inside the navy field
// section, and it had no data home. Icons are the mockups' own .it svg paths.
export const sharedFourStep = [
  {
    title: "01 — Initial review",
    detail: "Send the city, approximate size, condition, deadline and clear photos.",
    icon:
      '<rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="3.2"/>'
  },
  {
    title: "02 — Walkthrough if needed",
    detail: "Complex access, contents or conditions are checked before a firm quote.",
    icon:
      '<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'
  },
  {
    title: "03 — Written scope",
    detail: "Price, inclusions, exclusions and assumptions are approved before scheduling.",
    icon:
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6"/>'
  },
  {
    title: "04 — Completion",
    detail: "The work is performed against the agreed plan and priorities.",
    icon: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'
  }
] as const;

// §9.15.1's "Navigation dropdown one-liners", keyed by service-page slug so the hub card grid
// can print a one-line descriptor under each card title.
//
// SLOT REASSIGNMENT, flagged deliberately: §9.15.1 approved these strings for the nav
// dropdown, and the hub mockup's card blurbs ("Kitchens, bathrooms, fixtures, edges and the
// areas that are usually skipped.") are mockup-only — they appear in neither §9.15 nor doc 27,
// whose §10 lists card TITLES only. PORT-PROMPT §1 forbids writing copy for an unfilled slot,
// so rather than invent a blurb this reuses an already-approved string describing the same
// service. Reported for owner confirmation; swap here if §10 gains real card copy.
export const serviceOneLiners: Record<string, string> = {
  "/deep-cleaning-san-jose/": "Kitchens, baths, fixtures, and the edges that get skipped",
  "/move-out-cleaning-san-jose/": "Vacant turnover, keys-and-photos ready",
  "/post-construction-cleaning-san-jose/": "Settled dust once the trades are out",
  "/window-cleaning-san-jose/": "Glass, tracks, and frames within safe reach",
  "/extreme-cleaning-san-jose/": "Severely neglected property, reviewed first",
  "/animal-waste-cleanup-san-jose/": "After the animals are gone",
  "/rodent-dropping-cleanup-san-jose/": "Contained interior areas",
  "/pigeon-dropping-cleanup-san-jose/": "Accessible exterior surfaces",
  "/property-cleanouts-san-jose/": "Full-contents clearing under one scope",
  "/hoarding-cleanup-san-jose/": "Sorted, approved, documented",
  "/estate-cleanout-san-jose/": "Heirs, executors, real deadlines",
  // 2026-08-21: was "Approved, lawful disposal", which reads as a disposal service Aseptaclean
  // performs. Kept in step with the same label's `note` in megaNav (src/data/site.ts).
  "/debris-removal-san-jose/": "Bagged, staged, loaded; container coordinated",
  "/eviction-cleanout-san-jose/": "Turnover on a clock",
  "/commercial-cleaning-san-jose/": "Project and recurring programs"
};
