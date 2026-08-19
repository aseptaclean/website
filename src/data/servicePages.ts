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
  vendorCta:
    "This is also the section of the checklist Aseptaclean is named in, if you're reading it that way — but it's written to hold up regardless of who you hire.",
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
      answer: "It depends on property size, volume, and condition. A $195 on-site assessment, credited toward an approved project booked within 7 days, gives you a written price instead of a guess."
    }
  ]
} as const;

export const serviceAreasHub = {
  slug: "/service-areas/",
  gate: null as string | null,
  intro:
    "Aseptaclean serves San Jose and the surrounding South Bay & Peninsula — property cleanouts, estate clearing, and deep cleaning under one written scope, wherever the property sits in the service area.",
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
        { label: "Property cleanouts for managers", href: propertyCleanoutsPage.slug }
      ]
    },
    {
      title: "Animal & organic condition cleaning",
      detail:
        "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination, sterilization, or health-safety determination.",
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
  lead: "Choose the page that matches the property's next event — not a generic package that hides the difference between a deep clean, turnover and construction cleanup.",
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
  h1: "Condition-reviewed cleaning for difficult properties.",
  lead: "These jobs require more screening and clearer boundaries. Photos can begin the review; complex conditions often need a walkthrough.",
  cards: [
    { title: "Extreme-Condition Cleaning", href: extremeCleaningPage.slug as string | null },
    { title: "Animal Waste Cleanup", href: animalPage.slug as string | null },
    { title: "Rodent Dropping Cleanup", href: rodentPage.slug as string | null },
    { title: "Pigeon Dropping Cleanup", href: pigeonPage.slug as string | null }
  ]
} as const;

export const propertyClearingHub = {
  slug: "/property-clearing/",
  gate: null as string | null,
  eyebrow: "Property clearing",
  h1: "Clear the contents. Recover access. Prepare the property.",
  lead: "Property clearing is organized around authority, sorting rules, access and a legal disposal plan before cleaning begins.",
  cards: [
    { title: "Property Cleanouts", href: propertyCleanoutsPage.slug as string | null },
    { title: "Hoarding Cleanup", href: hoardingPage.slug as string | null },
    { title: "Estate Cleanouts", href: estatePage.slug as string | null },
    { title: "Debris Removal", href: debrisRemovalPage.slug as string | null },
    { title: "Eviction Cleanouts", href: evictionCleanoutPage.slug as string | null }
  ]
} as const;

// Shared hub close (doc 27 §10, below 10.4) — same block on every category hub above.
export const hubClose = {
  label: "One rule across every service",
  heading: "We define the work before we schedule it.",
  body: "Photos can start the review. Larger, heavier or more complicated properties may require a walkthrough before a firm quote."
} as const;
