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
  // 151 characters. The landing-page system's own meta for this route ends "in San Jose and
  // Santa Clara County", which is struck under item 2 above.
  metaDescription:
    "Not sure what kind of cleanup the property needs? Detailed cleaning, complex property cleanup and severe-condition work across the South Bay & Peninsula.",
  hero: {
    eyebrow: "Property cleanup services · South Bay & Peninsula",
    h1: "What kind of cleanup do you need?",
    // Landing-page system §43's hero lines, reconciled: its third line reads "Some have animal
    // waste, rodent droppings, or years of buildup." Rodent droppings are struck here under item
    // 1 above, and animal waste is held back to the one place on this page that carries doc 21
    // §2.3's mandatory limiting clause with it — the chooser's `condition` row.
    lede: [
      "Some homes need a detailed clean.",
      "Some need to be cleared before cleaning can begin.",
      "Some are past the point where a routine cleaning service will take them on.",
      "Start with what you are dealing with."
    ]
  },
  // PROBLEM CHOOSER. The doors themselves are homepage.routingDoors in src/data/site.ts —
  // owner-approved verbatim 2026-08-20, written for precisely this job ("name their situation
  // before naming your service") and rendering on ZERO pages since the V3 homepage rebuild
  // deleted RoutingDoors.astro on 2026-08-25. That deletion removed a duplicate routing system
  // from `/`; it did not retire the copy, and doc 30 §18 makes routing this page's whole job.
  // Only the framing below is new.
  chooser: {
    eyebrow: "Start with the problem",
    heading: "What are you dealing with?",
    lede: "You do not need the right service name. Pick the line that sounds like the property.",
    // Held below the six doors as a quiet ruled row rather than promoted to a seventh door:
    // /animal-waste-cleanup-san-jose/ ships noindex, and §20A.20 forbids using the hub as a
    // workaround for a publication gate. doc 21 §2.3's clause is verbatim-mandatory here and
    // travels with the row, never paraphrased.
    condition: {
      label: "Animal waste has affected floors, rooms, or surfaces",
      detail:
        "Repeated or heavy non-human animal urine or feces, after the animal issue itself has been dealt with.",
      linkLabel: "Animal waste cleanup",
      href: animalPage.slug,
      clause: animalPage.complianceClause
    }
  },
  notSure: {
    heading: "Not sure which one fits?",
    lede: "That is normal. A property does not always fit one clean service name.",
    // Landing-page system §43, minus its "Clutter + rodent droppings" pair (item 1 above).
    combinations: [
      "Animal waste and heavy buildup",
      "A property cleanout and a deep clean",
      "A move-out and a severe condition",
      "Several problems at the same time"
    ],
    close:
      "You do not have to work that out before you contact us. Describe the property, send photos if you have them, and we will tell you which kind of job it is."
  },
  // NORMAL vs DETAILED vs COMPLEX — landing-page system §43's qualifying block, reconciled to
  // real route names. Its purpose is to let the wrong customer leave early, which is why the
  // first level says outright that Aseptaclean is usually not the right fit.
  conditionLevels: [
    {
      name: "Routine house cleaning",
      body: "The home is already being maintained and the job is keeping it that way.",
      verdict: "Aseptaclean is usually not the right fit for this.",
      fit: false,
      href: null as string | null,
      linkLabel: null as string | null,
      examples: [] as readonly string[]
    },
    {
      name: "Detailed deep cleaning",
      body: "The home is usable and easy to move through. It needs more time and more detail than routine housekeeping.",
      verdict: "This is the level most one-time resets land on.",
      fit: true,
      href: deepCleaningPage.slug as string | null,
      linkLabel: "Deep cleaning" as string | null,
      examples: [
        "Grease and cooked-on buildup",
        "Baseboards, trim, and doors",
        "Window and door tracks",
        "Cabinet and appliance interiors",
        "Fixtures and hard-to-reach detail"
      ]
    },
    {
      name: "Complex property cleanup",
      body: "The condition changes how the work has to be planned, sequenced, and priced. Square footage stops being a useful guide.",
      verdict: "This is where Aseptaclean is usually the better fit.",
      fit: true,
      href: extremeCleaningPage.slug as string | null,
      linkLabel: "Extreme-condition cleaning" as string | null,
      examples: [
        "Contents that block the rooms",
        "Heavy buildup across several rooms",
        "Debris that has to be cleared first",
        "Animal waste on affected surfaces",
        "More than one of these at once"
      ]
    }
  ],
  // Landing-page system §43's reach block. It is the argument for why clearing and cleaning are
  // one scope rather than two vendors, and doc 30 §20A.19 lists its opening line among the
  // approved Aseptaclean sentences.
  reach: {
    heading: "You cannot clean a floor you cannot reach.",
    body: "You cannot clean a floor covered in boxes, a cabinet that is full, or a surface under debris nobody has moved. On some properties the order of the work is the plan:",
    sequence: ["Decide what stays", "Clear what can leave", "Reach the surface", "Clean"],
    close: "That is why some properties need more than a cleaning crew."
  },
  // ACTIVE SERVICE DIRECTORY. Grouped by the repository's real service families — the same three
  // groups megaNav uses — not by whatever grouping balances the layout (§20A.20's critical gate,
  // and the prompt's "do not invent a group merely because it looks balanced").
  //
  // `hub` is null on the specialty group ON PURPOSE. /specialty-cleaning/ ships noindex, and the
  // 2026-08-17 ruling recorded in docs/05-DECISIONS-LOG.md set it noindex precisely because its
  // cards name rodent and pigeon dropping cleanup. Linking it from an indexable hub would route
  // one click into the thing item 1 above exists to prevent.
  families: [
    {
      key: "clearing",
      name: "Complex property cleanup",
      summary:
        "For properties where the contents have to come out, or be decided on, before anything else can happen.",
      hub: { label: "Complex property cleanup", href: "/property-clearing/" } as {
        label: string;
        href: string;
      } | null,
      // The first entry in each group is the group's feature and gets the extra visual weight.
      services: [
        {
          page: hoardingPage,
          label: "Hoarding cleanup",
          thesis: "You stay in control of what stays and what leaves.",
          detail:
            "For packed homes where belongings still need sorting and decisions still have to be made. Nothing leaves the property without your written approval."
        },
        {
          page: estatePage,
          label: "Estate cleanout",
          thesis: "Protect what matters before the property gets cleared.",
          detail:
            "For families and executors working through a property before sale, transfer, or handoff."
        },
        {
          page: propertyCleanoutsPage,
          label: "Property cleanouts",
          thesis: "One vendor, one scope, one closeout record.",
          detail: "For owners and managers who need a vacancy back on schedule."
        },
        {
          page: debrisRemovalPage,
          label: "Debris removal",
          thesis: "We do the work on the property. The trip off-site belongs to the hauler.",
          detail:
            "For loose, non-hazardous debris that has to be cleared before cleaning or turnover."
        }
      ]
    },
    {
      key: "detailed",
      name: "Detailed cleaning",
      summary:
        "For properties that are usable but need substantially more detail than routine housekeeping.",
      hub: { label: "Detailed cleaning", href: "/detailed-cleaning/" } as {
        label: string;
        href: string;
      } | null,
      services: [
        {
          page: deepCleaningPage,
          label: "Deep cleaning",
          thesis: "More work and more detail than normal housekeeping.",
          detail:
            "Quoted room by room from a written checklist rather than sold as a package name."
        },
        {
          page: moveOutCleaningPage,
          label: "Move-in & move-out cleaning",
          thesis: "Get the property ready for the next handoff.",
          detail:
            "Scoped against the walkthrough date, for a vacant or nearly vacant property."
        }
      ]
    },
    {
      key: "specialty",
      name: "Severe and specialty conditions",
      summary:
        "For properties that need a condition review before anyone can quote the work honestly.",
      hub: null as { label: string; href: string } | null,
      services: [
        {
          page: extremeCleaningPage,
          label: "Extreme-condition cleaning",
          thesis: "The condition is past normal housekeeping and needs a property plan.",
          detail:
            "For heavily soiled properties where a normal cleaning quote would be unreliable."
        },
        {
          page: animalPage,
          label: "Animal waste cleanup",
          thesis:
            "The visible waste and the affected material underneath can be two different problems.",
          detail:
            "For accepted non-human animal waste, after the animal issue has been dealt with by the appropriate provider."
        }
      ]
    }
  ],
  boundary: {
    eyebrow: "Scope",
    heading: "We keep our scope clear.",
    lede: "Aseptaclean is a cleanup company. We do not pretend every property problem is ours to fix. If another provider is the right one, you hear it in the first conversation, with the name of the kind of provider who handles it.",
    fitHeading: "Usually worth discussing",
    outsideHeading: "Outside current scope — another provider handles it",
    // Landing-page system §43's "We do not want every job. We want the right job." — kept because
    // it is the sentence that makes the boundary read as a standard rather than a refusal.
    close: "We do not want every job. We want the right job."
  },
  start: {
    eyebrow: "How to start",
    heading: "You do not have to diagnose the property.",
    steps: [
      {
        title: "Tell us what is going on",
        detail: "You do not need the right service name. Describe what you are looking at."
      },
      {
        title: "Send photos when they help",
        detail:
          "The whole room, the worst area, anything unusual, and roughly how much of the property is affected."
      },
      {
        title: "We review the condition",
        detail:
          "Which service fits, whether more photos are needed, whether the property needs a walkthrough, and whether the job is inside our scope."
      },
      {
        title: "The scope is defined before work begins",
        detail:
          "What is included, what is excluded, and what completion means, in writing, before a date goes in the calendar."
      }
    ],
    methodLink: { label: "See how we work", href: "/handoff-standard/" }
  },
  close: {
    heading: "Still not sure what service you need?",
    lede: "That is fine. Show us what is there and we will tell you what the next step should be — including when the answer is another provider.",
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
