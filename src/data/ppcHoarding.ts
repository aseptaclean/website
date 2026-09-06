// HOARDING PPC CAMPAIGN COPY — docs/page-briefs/PPC-HOARDING-SAN-JOSE.md (AC-PPC-HOARDING-1.0).
//
// This file is the copy source for ONE route: /hoarding-cleanup-san-jose/assessment/.
// It is deliberately separate from src/data/servicePageCopy.ts. The brief is explicit:
// "Do not duplicate the SEO page into this route or replace its copy with this campaign copy."
// The normal SEO page at /hoarding-cleanup-san-jose/ is untouched by this file.
//
// Strings below are the brief's campaign copy verbatim, with three recorded exceptions, each
// forced by a HIGHER-ranked authority than the brief (AGENTS.md §1 precedence chain):
//
//   1. HERO EYEBROW — the brief writes "HOARDING CLEANUP · SAN JOSE & SANTA CLARA COUNTY".
//      AGENTS.md §3 names the verified region string and explicitly rejects "Santa Clara County"
//      as the coverage wording ("Atherton is San Mateo"); docs/02-CURRENT-FACTS.md "Geography"
//      forbids expanding coverage from a copy document. The eyebrow therefore renders the
//      verified `site.location.serviceArea` value, in the same shape every other hero uses
//      (`{service} · San Jose · {serviceArea}`). Recorded in docs/05-CURRENT-DECISIONS.md.
//
//   2. TSW #933 — the brief's section 08 lists the trauma-scene registration as a company
//      credential. docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §5 (rank 3) authorizes that credential
//      on "/crime-scene-trauma-cleanup-san-jose/, plus its named cross-links (footer,
//      /services/)" and AGENTS.md §3 repeats the same restriction. A PPC landing page is not on
//      that list, so the line does NOT ship here. See `credentialsDependency` below.
//
//   3. INSURED — already conditional in the brief, and it stays conditional here: it renders
//      only when `site.business.insuranceStatus` carries a verified value (AGENTS.md §3
//      suppression rule). That value is currently empty, so the item does not ship.
//
// Everything else is the brief's text as written.
import { site } from "./site";

export const ppcHoarding = {
  route: "/hoarding-cleanup-san-jose/assessment/",
  formId: "assessment-form",

  seo: {
    // noindex is not set here — BaseLayout/PpcLayout derive it from launchArchitecture.ts, which
    // does not list this campaign route. Verified in the rendered output, not assumed.
    //
    // DISTINCT FROM THE SEO PAGE'S TITLE. `npm run qa:seo`'s unique-title guard caught this
    // route sharing "Hoarding Cleanup in San Jose | Aseptaclean" with
    // /hoarding-cleanup-san-jose/. The H1 is unchanged — the brief fixes that string — but the
    // document title now names what this page is: the campaign's intake step.
    title: "Hoarding Cleanup in San Jose — Send Property Details | Aseptaclean",
    description:
      "Hoarding cleanup in San Jose. Show us the property as it is — we review what is happening, help establish what stays and what goes, and explain the next step."
  },

  // FREE WALKTHROUGH — OWNER DECISION 2026-09-06, SCOPED TO THIS ROUTE.
  //
  // The walkthrough offered through this PPC campaign is free. That is a rank-2 explicit current
  // owner decision (AGENTS.md §1 precedence chain) and it outranks the older rank-2 pricing
  // decision recorded in AGENTS.md §4 — but ONLY here. The $195 on-site assessment fee is
  // unchanged and still published everywhere else it appears; `site.offer.assessmentFee` and
  // `site.offer.assessmentFraming()` are untouched, and this file has never rendered either.
  //
  // Scope of the exception, in full: the campaign secondary CTA, this campaign form's subtext and
  // submit label, one FAQ answer, this campaign's thank-you body, and the confirmation email
  // branch keyed on this campaign's entry route in functions/_lib/providers.ts. No shared form
  // label moved — `site.offer.formSubmitCta` ("Send Message") still labels every other form.
  //
  // The words "free assessment" and "free consultation" remain banned sitewide (AGENTS.md §7,
  // docs/21 §2.2). This campaign offers a free WALKTHROUGH; it does not reprice the assessment,
  // and no string here calls the walkthrough an assessment. Recorded in docs/05-CURRENT-DECISIONS.md.
  //
  // HERO AND FORM WORDING — docs/page-briefs/ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md, revision
  // AC-PPC-HERO-ROOMS-1.1, installed 2026-09-06 (1.0 installed 2026-09-05). That file supersedes
  // the older PPC hero and form-copy variants and nothing else; every other string in this record
  // still comes from PPC-HOARDING-SAN-JOSE.md.
  //
  // EXCEPTION 1 ABOVE NO LONGER APPLIES TO THE EYEBROW. It existed because the older brief wrote
  // the eyebrow as "HOARDING CLEANUP · SAN JOSE & SANTA CLARA COUNTY", and AGENTS.md §3 rejects
  // that coverage wording. AC-PPC-HERO-ROOMS-1.0 specifies "Hoarding Cleanup in San Jose", which
  // names only the verified city and makes no coverage claim, so it ships verbatim and no
  // substitution is needed. Exceptions 2 and 3 are untouched — this update changes no credential.
  hero: {
    eyebrow: "Hoarding Cleanup in San Jose",
    heading: "Get back to living in the rooms you’ve been working around.",
    // Brief: "Supporting lead". Still a paragraph, never a second oversized heading.
    lead: "A bedroom you can sleep in. A kitchen you can use. Space to sit down.",
    body: [
      "Aseptaclean helps clear accumulated belongings and clean the agreed areas. We establish what stays, what goes and what needs your review before removal begins."
    ],
    secondaryLabel: "Request a Free Walkthrough",
    supportingLine: "You do not need to sort or clean before contacting us."
  },

  form: {
    title: "Start with the house as it is.",
    intro:
      "Tell us a little about the property. We’ll contact you to discuss the situation and arrange a free walkthrough.",
    // Submit label is scoped to THIS form only. site.offer.formSubmitCta ("Send Message") still
    // labels every other form on the site; AC-PPC-HERO-ROOMS-1.1 changes the campaign form alone.
    // It requests contact and does not confirm an appointment — the under-button microcopy below
    // is unchanged and still says so explicitly.
    submitLabel: "Request a Free Walkthrough",
    descriptionHelper: "Which rooms or areas are affected?",
    photoHelper: "Wide room views and close-ups help.",
    microcopy: "Sending this form does not schedule or authorize work."
  },

  // THANK-YOU ROUTE — the campaign's own confirmation destination.
  //
  // Reached by redirect ONLY after functions/api/lead.ts returns a confirmed `ok: true`, using
  // the same query contract /thank-you/ already uses: `received`, `code`, `email`, `callback`.
  // No name, phone, email address, ZIP or description is ever put in the URL — `code` is the
  // derived AC-XXXXXX display code, not an identifier anything is stored under.
  //
  // It is a separate route from the sitewide /thank-you/ for one reason: /thank-you/ renders the
  // full site header and Services dropdown, which is exactly what this campaign's PPC exception
  // removes. Same query contract, same honest default, same visual system — compact shell.
  thankYou: {
    route: "/hoarding-cleanup-san-jose/assessment/thank-you/",
    // NEUTRAL TITLE. The default server-rendered state of this page is the *unconfirmed* one,
    // so a title reading "Request received" would contradict the body a crawler, a share
    // preview or a no-JS visitor actually sees.
    seo: {
      title: "Your request | Aseptaclean",
      description: "Status of the hoarding cleanup request you sent to Aseptaclean."
    },
    eyebrow: "Hoarding Cleanup · San Jose",
    heading: "Request received.",
    // FREE WALKTHROUGH, AND STILL NOT AN APPOINTMENT. The old first sentence offered "an onsite
    // assessment" as one possible next step, which read against this campaign's free walkthrough
    // and against the $195 on-site assessment the rest of the site publishes. It now names the
    // one thing this campaign actually offers. "Arrange" is deliberate: the visitor has requested
    // contact, and nothing here says a visit is booked.
    body: [
      "We’ll review what you sent and contact you to discuss the situation and arrange a free walkthrough.",
      "You do not need to clean or organize before we speak."
    ],
    // Rendered only when the endpoint reported the confirmation email as actually sent.
    emailSent: "A confirmation email is on its way to the address you gave us.",
    // Rendered when an address was supplied but Resend did not accept the message. Reporting
    // "sent" there would describe a message that does not exist.
    emailPending:
      "We could not send a confirmation email just now. That does not affect your request — we have it.",
    codeLabel: "Confirmation code",
    codeNote: "Quote this if you call.",
    // No response-time promise. AGENTS.md §3 records the verified response as "within one
    // business day"; this page states what happens, not when.
    // "Does not confirm an appointment" is stated outright rather than left to be inferred from
    // "schedule": the campaign now advertises a free walkthrough, so the one thing a visitor is
    // most likely to over-read into a confirmation page is that the visit is booked.
    boundary:
      "Sending this form does not schedule or authorize work, it does not confirm an appointment, and it does not create a service agreement.",
    // The honest default for anyone who lands here without a confirmed submission — the same
    // convention /thank-you/ uses, so a refresh or a shared link never implies a request exists.
    unconfirmed: {
      heading: "This page does not confirm that a request was received.",
      body: "If you have just submitted the form, your confirmation was shown once. If you arrived here another way, or refreshed this page, send your details again and we will pick it up.",
      backLabel: "Back to the form"
    }
  },

  // SECTION 02 — trust strip. "Insured" is appended only when the verified flag permits it, so
  // the strip renders three items today and four the day a COI is recorded. The count is passed
  // to CSS as --ac-trust-count so the tracks stay equal either way (brief's scoped recipe).
  trust: [
    ...(site.business.insuranceStatus ? [site.business.insuranceStatus] : []),
    "Clear Scope Before Work",
    "Photos Welcome",
    "Direct Operator Review"
  ],

  // SECTIONS 03–04 — combined into one continuous white band, per the brief's own
  // "Changes from the supplied draft" note and its section-composition table.
  decisions: {
    heading: "Not everything has to go.",
    body: [
      "In an accumulated home, the difficult part is not always removing things.",
      "It is knowing what should be removed — and what should not.",
      "Important documents may be mixed with old papers.",
      "Family photographs may be underneath boxes.",
      "Valuables, medications, sentimental belongings and everyday possessions may be mixed into areas that have become difficult to use.",
      "Aseptaclean does not assume everything in the property is disposable.",
      "Before approved removal begins, the project can establish what stays, what goes and what needs another decision."
    ],
    rowHeading: "A clear plan before things start moving.",
    row: [
      {
        title: "KEEP",
        body: "Items, belongings or areas that are supposed to remain."
      },
      {
        title: "REMOVE",
        body: "Material already approved for clearing or disposal."
      },
      {
        title: "REVIEW",
        body: "Anything uncertain that needs a decision before it is removed."
      }
    ],
    strongLine:
      "The goal is to move the property forward without creating unnecessary loss or confusion."
  },

  // SECTION 05 — recognition.
  recognition: {
    heading: "When everything is mixed together, the project can feel impossible.",
    lead: "Accumulated belongings may be only one part of the condition.",
    body: ["Once rooms begin to open up, there may also be:"],
    list: [
      "Heavy dirt and buildup",
      "Trash or unwanted material",
      "Surfaces that have not been accessible for a long time",
      "Rodent droppings or animal waste",
      "Strong odors",
      "Neglected kitchens or bathrooms",
      "Additional cleaning conditions underneath stored material"
    ],
    closing: ["That is why Aseptaclean does not begin with a generic cleaning checklist."],
    pullQuote: "We start with the property."
  },

  // SECTION 06 — process. All five steps retained (brief + profile CSS-09).
  process: {
    heading: "How Aseptaclean approaches the cleanup",
    steps: [
      {
        title: "Understand the Property",
        body: "We review which areas are affected, the amount and type of accumulation, access, visible conditions and any concerns that may change the work."
      },
      {
        title: "Establish the Decisions",
        body: "We determine the agreed rules for what stays, what goes and what needs review."
      },
      {
        title: "Define the Scope",
        body: "The proposed work, assumptions and known exclusions are established before production begins."
      },
      {
        title: "Work Through the Property",
        body: "Approved clearing and cleanup proceeds through the affected areas in a controlled order."
      },
      {
        title: "Review What Was Completed",
        body: "We review the approved work and identify anything outside the original scope that may still require attention."
      }
    ]
  },

  // SECTION 07 — hidden conditions, deep navy photo/text band.
  hidden: {
    heading: "What becomes visible later can change the job.",
    body: [
      "A floor that has not been visible for years may look different once accumulated belongings are removed.",
      "A cabinet may reveal an additional condition.",
      "An odor may have a source that could not previously be accessed.",
      "An affected surface may require more work than could be seen during the initial review.",
      "This is why clear scope matters."
    ],
    pullQuote:
      "If a newly accessible condition would materially change the approved work, it should be identified and discussed before additional work proceeds.",
    closing: "You should understand what is being proposed before additional work begins."
  },

  // SECTION 08 — why Aseptaclean. Founder split.
  founder: {
    heading: "Look carefully first. Then decide what the property actually needs.",
    body: [
      "Aseptaclean was built around a condition-first operating approach.",
      `Founder ${site.founder.name}’s background includes biochemistry, pharmaceutical manufacturing and surgical pathology — environments where details, contamination and following the right process matter.`,
      "That experience shaped a simple operating mindset:"
    ],
    pullQuote:
      "Understand the condition. Define the work. Then move through the property in the right order.",
    credentialsHeading: "Company Credentials",
    // Only verified, in-scope credentials. Empty today: the insurance line is release-gated on a
    // COI (AGENTS.md §3) and TSW #933 is out of publication scope for this route (see exception 2
    // at the top of this file). AGENTS.md §0.3: "If a proof slot has no real asset, the slot
    // ships empty. Empty beats fake, always."
    credentials: [
      ...(site.business.insuranceStatus ? [site.business.insuranceStatus] : [])
    ],
    credentialsDependency:
      "TSW #933 display scope beyond /crime-scene-trauma-cleanup-san-jose/ and its named " +
      "cross-links requires an owner decision (docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §5). " +
      "Insured requires a verified COI recorded in PUBLIC_INSURANCE_STATUS."
  },

  // SECTION 09 — cost.
  cost: {
    heading: "What does hoarding cleanup cost?",
    body: [
      "There is no honest flat price for this type of work.",
      "A property with moderate accumulation is very different from a home involving multiple affected rooms, extensive sorting, difficult access, sanitation concerns or substantial cleaning underneath.",
      "The scope can be affected by:"
    ],
    factors: [
      "Amount of material",
      "Amount of sorting required",
      "Number of affected rooms or areas",
      "Property access",
      "Sanitation conditions",
      "Disposal requirements",
      "Odors",
      "Cleaning required after areas are cleared"
    ],
    closing:
      "After we understand the property, we can explain what we recommend, what is included and what the work will cost.",
    strongLine: "You should know what is included before work begins."
  },

  // SECTION 10 — six real questions, verbatim.
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "Are you going to judge the condition of the house?",
        answer:
          "No. You do not need to make the property look better before contacting us. You do not need to have an explanation ready. Show us what is happening. We’ll start there."
      },
      {
        question: "Are you going to throw everything away?",
        answer:
          "No. We do not assume everything in an accumulated home is disposable. What stays, what goes and what needs review should be established before approved removal begins. If particular documents, photographs, valuables, rooms or belongings need attention, tell us."
      },
      {
        question: "Do I need to clean or organize before you see the property?",
        answer:
          "No. We would rather understand the property in its current condition. Cleaning or moving things first can make it harder to understand what the project actually involves."
      },
      {
        question: "Is the situation too bad?",
        answer:
          "You do not need to make that determination yourself. Some properties need straightforward clearing and cleaning. Others involve years of accumulation, sanitation problems, animal or rodent contamination, odors or rooms that have not been accessible for a long time. Show us what is happening and let us determine the appropriate next step."
      },
      {
        question: "Can I start with photos?",
        answer:
          "Yes. Photos are often the easiest way to begin. Take wide photos that show the overall room, then closer photos of the areas that concern you most. For larger or more complicated properties, a free walkthrough may still be needed before pricing the work."
      },
      {
        question: "Can you give me a price from one photo?",
        answer:
          "Sometimes photos provide enough information to determine the next step, but a single photo may not show the amount of material, access, sorting requirements or conditions underneath. We would rather tell you when more information is needed than give you a number we cannot responsibly stand behind."
      }
    ]
  },

  // SECTION 11 — final action.
  final: {
    heading: "You do not have to solve the whole property today.",
    subheading: "Start by showing us where things are now.",
    body: [
      "You do not need to clean.",
      "You do not need to organize.",
      "You do not need to know what service to request.",
      "Call us, or send a short description with any photos you have. We’ll review what you are dealing with and determine the appropriate next step."
    ]
  },

  stickyBar: {
    secondaryLabel: "Start With Photos"
  }
} as const;

// The one campaign phone string, assembled from the central verified value and nothing else
// (AGENTS.md §3: never hardcode a business fact in a component).
export const ppcCallLabel = `${site.offer.primaryCta} · ${site.business.phone}`;
