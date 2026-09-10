// ESTATE PPC CAMPAIGN COPY — docs/aseptaclean-estate-landing-page.md (owner handoff, 2026-09-09).
//
// This file is the copy source for ONE route: /estate-cleanout-san-jose/assessment/.
// It is deliberately separate from src/data/servicePageCopy.ts and from
// src/data/doc27ServicePages.ts. The SEO page at /estate-cleanout-san-jose/ is untouched by this
// file, keeps its own copy record, and is NOT duplicated here — the same separation
// src/data/ppcHoarding.ts maintains for the hoarding campaign.
//
// Every visible string below comes from the brief's section 2 ("Customer-facing landing page
// copy"), in the order supplied. Sections 1, 3 and 4 of that document are implementation
// instructions and MUST NOT reach the page. The exceptions are recorded individually below —
// each one is either forced by a higher-ranked authority (AGENTS.md §1 precedence chain) or is an
// omission the brief's own readiness table requires.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// A. SUBSTITUTIONS FORCED BY A HIGHER AUTHORITY
// ─────────────────────────────────────────────────────────────────────────────────────────────
//
//   A1. "SANTA CLARA COUNTY" → the verified service area.
//       The brief writes the hero eyebrow as "ESTATE & HOARDING CLEANOUTS · SAN JOSE & SANTA
//       CLARA COUNTY" and closes with "San Jose & Santa Clara County". AGENTS.md §3 names the
//       verified region string and explicitly rejects "Santa Clara County" as the coverage
//       wording ("Atherton is San Mateo"); docs/02-CURRENT-FACTS.md "Geography" forbids widening
//       or narrowing coverage from a copy document. Both places therefore render
//       `site.location.serviceArea`. This is the same resolution src/data/ppcHoarding.ts recorded
//       for the same phrase in the hoarding brief. Recorded in docs/05-CURRENT-DECISIONS.md.
//
//   A2. "Call (408) 785-7588" → `site.offer.primaryCta` + the verified number.
//       AGENTS.md §2.2.2 fixes the primary marketing CTA label as "Call Aseptaclean", rendered
//       from src/data/site.ts only. The campaign label is assembled the same way the hoarding
//       campaign assembles it — "Call Aseptaclean · (408) 785-7588" — so the approved label and
//       the brief's visible number both ship, and no number is ever typed into a component.
//       The founder section's "Call Matthew · (408) 785-7588" is a distinct, personal label and
//       is preserved, also assembled from src/data/site.ts.
//
//   A3. HOURS. The brief records Mon–Sat 7 AM–7 PM Pacific as UNCONFIRMED and instructs: use
//       verified existing hours or omit the line. Section 2 contains no hours line, so nothing is
//       added to the page body. The compact PPC footer renders `site.business.hours`, which is
//       the verified value (AGENTS.md §3) and matches the brief's draft anyway.
//
//   A4. FORM FIELD LABELS. The brief lists the intake fields as "Your name / Phone number /
//       Email / Property ZIP code". The shipped form's labels are the site's existing, approved
//       ones ("Full Name", "Phone Number", "Email", "Property ZIP Code") because
//       docs/03-INTEGRATION-CONTRACT.md "Forms" requires preserving the real form's field names,
//       required/optional states, validation, anti-spam, consent text and helper copy rather than
//       re-typing a screenshot. The fields, their order and their required/optional states are
//       exactly what the brief specifies. The strings the brief actually writes for this block —
//       the title, the supporting sentence, the two optional-field questions, the submit label and
//       the boundary microcopy — all ship verbatim below.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// B. OMISSIONS REQUIRED BY THE BRIEF'S OWN READINESS TABLE (its §"Conditional promises")
// ─────────────────────────────────────────────────────────────────────────────────────────────
//
// The brief prepares the full offer but gates six components on evidence of readiness, with a
// written fallback for each. Evidence was looked for in the repository — the owner-approved copy
// sources, src/data/site.ts, the service pages, and docs/02-CURRENT-FACTS.md — and the result is
// recorded here so a later pass can reverse an omission the day the fact lands. Nothing below is
// shown to a customer as disabled, pending, or "coming soon": the omitted material simply is not
// on the page (brief: "Do not show disabled features, internal readiness notes, or 'coming soon'
// cards to customers").
//
//   B1. DOCUMENT SHREDDING — OMITTED IN FULL. No shredding provider, approval process, or
//       destruction-record deliverable exists anywhere in this repository; `grep -ri shred`
//       across src/ and the active docs/ set returns the brief itself and nothing else. Fallback
//       applied as written: the shredding card, the shredding FAQ ("Who decides which papers get
//       shredded?"), and the shredding reference in the completion package are all absent. The
//       brief's own instruction — "Never imply onsite shredding or guaranteed certificates" —
//       is satisfied by saying nothing about it at all.
//
//   B2. INVENTORY AND HANDOFF RECORDS — OMITTED, BELONGINGS INSTRUCTIONS RETAINED. The site
//       does establish that discovered items are isolated and reported (src/data/site.ts
//       `homepage.assurance` "Important discovered items reported", and the discovered-item log
//       named in src/data/servicePages.ts). It does NOT establish a designated-item photograph
//       and list, labeled-box handoff, or a belongings handover record. Fallback applied: the
//       "Belongings set aside" card keeps the instruction sentence and drops the photograph/list
//       promise; "designated belongings handed over" is removed from the completion package; and
//       the inventory FAQ ("Will you make a list of everything in the house?") is not rendered.
//
//   B3. DONATION ARRANGEMENTS — RETAINED, CONDITIONAL WORDING PRESERVED. Donation coordination
//       is an established, published capability: /estate-cleanout-san-jose/ already ships an
//       owner-approved donation section ("Donation can be part of the plan, but acceptance is
//       controlled by the donation center — not by us"), and the keep / donate / clear framework
//       appears in src/data/servicePages.ts. The brief's hedges are kept exactly as written —
//       "suitable items that an organization will accept" and "Available donation receipts" —
//       and the "Can everything be donated?" FAQ answers "No." So nothing here promises that any
//       given item will be accepted or that a receipt will exist.
//
//   B4. COMPLETION RECORDS — RETAINED. SCHEDULED UPDATES — OMITTED. Completion photographs and
//       a written summary of the work are an established deliverable across the whole site: the
//       Property Handoff Record (src/data/site.ts `homepage.handoffStages` "Verify",
//       /handoff-standard/, and every service page). A scheduled progress-update cadence is not
//       established anywhere — `grep -ri "scheduled update\|progress update"` over src/ returns
//       nothing. Fallback applied to the unconfirmed half only: the page promises one direct
//       project contact and a completion review, and never a schedule of updates. Process step 4
//       drops "provide scheduled updates" for the same reason. The out-of-town FAQ still says we
//       "can discuss ... scheduled photo updates", which is an offer to discuss, not a promise.
//
//   B5. MISSED-TASK CORRECTION — FALLBACK SENTENCE USED. The brief conditions the promise on
//       confirming that the customer agreement contains reporting, access and exclusion terms.
//       No service agreement exists in this repository to read, and the nearest published
//       commitment (src/data/site.ts `homepage.assurance` "Missed scope items corrected") is
//       narrower than the brief's sentence — it says "no additional LABOR charge", inside a
//       24-hour reporting window and a two-business-day return. Publishing "at no additional
//       charge" here would be a broader promise than the verified one. The brief's supplied
//       replacement therefore ships verbatim: "We review the completed work against your written
//       scope with you." Reversible the moment the agreement's terms are confirmed.
//
//   B6. FINANCING — OFF, as the brief defaults it. Section 2 contains no financing copy, and
//       none is added. No APR, approval odds, monthly payment, or provider name appears anywhere
//       on this route.
//
//   B7. CREW AND TIMELINE — assessed-project language kept as written. No 1–2 day promise, no
//       fixed crew size, no capacity claim. "We arrange staffing around the work your property
//       needs" and "we arrange the crew and services" are the brief's own wording and both stay.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// C. FREE WALKTHROUGH — SCOPE EXTENSION, FLAGGED FOR OWNER CONFIRMATION BEFORE PUBLIC RELEASE
// ─────────────────────────────────────────────────────────────────────────────────────────────
//
// AGENTS.md §7 bans "free assessment" and "free consultation" sitewide and states that the
// 2026-09-06 free-WALKTHROUGH exception "reaches no other route" than
// /hoarding-cleanup-san-jose/assessment/. This brief is a later owner-supplied document
// (2026-09-09) whose entire offer is built on "Request a Free Walkthrough", and it supplies no
// fallback for that phrase — which is the brief's way of treating it as settled.
//
// Implemented on the same terms the hoarding exception was granted, and no wider:
//   · This route publishes NO price figure at all. `site.offer.assessmentFee`,
//     `site.offer.assessmentFraming()` and the $195 on-site assessment fee are untouched and
//     still published everywhere else they appear. This file has never rendered either.
//   · Nothing here calls the walkthrough an "assessment" or a "consultation". It is a
//     walkthrough, in every one of its occurrences.
//   · No shared label moved: `site.offer.formSubmitCta` ("Send Message") still labels every
//     other form on the site.
// This is the ONE item on this route that needs an explicit owner sign-off before the page goes
// public. It is recorded in docs/05-CURRENT-DECISIONS.md and reported with the build.
import { site } from "./site";

export const ppcEstate = {
  route: "/estate-cleanout-san-jose/assessment/",
  // The brief's own suggested anchor. Deliberately not "assessment-form": AGENTS.md §7's scoped
  // exception is for a WALKTHROUGH, and the anchor is a visible URL fragment.
  formId: "request-walkthrough",

  seo: {
    // The brief's suggested title, verbatim. Distinct from the SEO page's "Estate Cleanout in San
    // Jose | Aseptaclean" (singular), which `npm run qa:seo`'s unique-title guard requires.
    title: "Estate Cleanouts in San Jose | Aseptaclean",
    // The brief's suggested description with substitution A1 applied.
    description:
      "Help clearing a parent's home after a loss. Sorting, contents clearing and cleaning in " +
      `San Jose and the ${site.location.serviceArea}. Request a free walkthrough.`
  },

  // ── HERO ───────────────────────────────────────────────────────────────────────────────────
  // BRIGHT OPENING — docs/aseptaclean-layout-refresh.md §1 (owner, 2026-09-09), which supersedes
  // the earlier document's layout and section order and keeps its service boundaries, offer
  // claims, backend, consent and tracking. The dark full-bleed photographic hero is gone; the
  // copy is unchanged apart from one move recorded here.
  //
  // THE THREE-PART LINE. "One person to call. A written plan and price. Help from start to
  // finish." was a body paragraph; the refresh asks for those three items "in a restrained
  // three-part line below the introduction rather than adding a large badge wall". Same words,
  // split at the sentence breaks the source already had. Nothing was added to them, and they are
  // rendered as text with hairline separators — not badges, chips, icons or a credential row.
  hero: {
    eyebrow: `Estate & Hoarding Cleanouts · San Jose · ${site.location.serviceArea}`,
    heading: "A parent’s home to clear. You don’t have to do it all yourself.",
    lead: "After a loss, a house full of belongings can be a lot to take on.",
    body: [
      "Aseptaclean helps you sort what matters, clear unwanted contents, and clean the home—even when years of belongings fill every room."
    ],
    points: ["One person to call", "A written plan and price", "Help from start to finish"],
    secondaryLabel: "Request a Free Walkthrough",
    supportingLine: "No need to sort or clean before contacting us."
  },

  // ── TRUST BAR ──────────────────────────────────────────────────────────────────────────────
  // Below the hero and form. Three items were requested; TWO OF THEM ARE RELEASE-GATED and are
  // wired to their real verification flags rather than hardcoded, so each appears automatically
  // the moment its fact is recorded — and cannot appear before then.
  //
  //   1. TSW #933 — WITHHELD. GATED ON AN OWNER DECISION, NOT ON A MISSING FACT.
  //      The registration is real and verified active (AGENTS.md §3). Its PUBLICATION SCOPE is
  //      what blocks it: docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §5 (rank 3) authorizes the
  //      credential on "/crime-scene-trauma-cleanup-san-jose/, plus its named cross-links
  //      (footer, /services/)", and AGENTS.md §3 repeats the same restriction verbatim. Measured
  //      against the current build, "933" appears in exactly one emitted page — the trauma route.
  //      An estate cleanout landing page is not on that list, and §5 is explicit that
  //      registration authorizes "one registered scope", not a company-wide credential.
  //      THE IDENTICAL REQUEST WAS ALREADY REFUSED ON THE SIBLING CAMPAIGN ROUTE: see
  //      src/data/ppcHoarding.ts exception 2 and its `credentialsDependency`, which records the
  //      same reasoning for /hoarding-cleanup-san-jose/assessment/ on 2026-09-05.
  //      TO SHIP IT: an explicit owner decision widening the doc 21 §5 display scope to this
  //      route, recorded in docs/05-CURRENT-DECISIONS.md. Then flip the flag below — the copy,
  //      the layout and the column proportions are already built and waiting.
  //
  //   2. INSURED — SUPPRESSED BY THE STANDING RULE, AUTOMATICALLY.
  //      AGENTS.md §3's suppression rules: "Unverified insurance wording → suppress the insurance
  //      statement." doc 21 §2.5: the recorded wording "is not publication-approved merely because
  //      it appears in this file… if current verification is not available, suppress it."
  //      `PUBLIC_INSURANCE_STATUS` is empty in .env.production and wrangler.toml carries an
  //      explicit comment saying it is intentionally absent pending a COI. So this item renders
  //      only when that value is set — the same gate CredentialBar, HomeTrustStrip,
  //      HomeRegulatedAuthority, ServicesAuthority and the hoarding trust strip all already use.
  //      THE OFFERED FALLBACK IS DELIBERATELY NOT USED. "Business insurance coverage" is still an
  //      affirmative statement about policy coverage, and doc 21 §2.5 extends the suppression to
  //      "every statement about policy coverage, limits, specialty coverage, or insurance-linked
  //      certification". A softer wording does not clear the gate; a verified COI does.
  //      TO SHIP IT: record the verified COI wording in `PUBLIC_INSURANCE_STATUS`. The
  //      certificate-availability line is already the approved doc 21 §2.5 string and ships with it.
  //
  //   3. OWNER-LED PROJECTS — SHIPS NOW. Founder identity and accountability is named in doc 21
  //      §6 as permitted proof today, it is what the page's own founder section already says, and
  //      it asserts no credential, rating, count or capability.
  trustBar: {
    label: "How Aseptaclean works",
    // Requested desktop proportions, carried per item so the bar stays balanced at one, two or
    // three items instead of leaving an empty track behind a suppressed claim.
    tsw: {
      span: 46,
      icon: "record" as const,
      title: "CDPH Registered",
      lines: ["Trauma Scene Waste", "Management Practitioner"],
      keepTogether: "TSW 933"
    },
    insured: {
      span: 24,
      icon: "shield" as const,
      title: "Insured",
      lines: ["Certificate available", "upon request"]
    },
    ownerLed: {
      span: 30,
      icon: "person" as const,
      title: "Owner-Led Projects",
      lines: ["Work directly with", `${site.founder.name}`]
    }
  },

  // ── THE INTAKE FORM ────────────────────────────────────────────────────────────────────────
  // Strings from the brief's "Tell us about the property" block, with the two the layout refresh
  // §1 replaces. See substitution A4 for why the four contact-field labels stay the site's
  // existing ones.
  form: {
    // REFRESH §1, verbatim: heading "Request a Free Walkthrough", supporting line "Tell us a
    // little about the property. We'll contact you to discuss the next step." This supersedes the
    // earlier "Tell us about the property" / "We'll contact you to discuss the property and
    // arrange the next step." pairing on this route only — src/data/site.ts `offer.formHeading`
    // is untouched and still titles every other form on the site.
    title: "Request a Free Walkthrough",
    intro:
      "Tell us a little about the property. We’ll contact you to discuss the next step.",
    submitLabel: "Request My Free Walkthrough",
    // REFRESH §1: the optional fields move into "an accessible disclosure labeled 'Add property
    // details or photos (optional)'". Consent stays outside it, visible and unchanged.
    optionalDisclosureLabel: "Add property details or photos (optional)",
    // OPTIONAL, and starts unselected. Values are posted to `property_status`, an optional field
    // added to functions/_lib/lead.ts for this form; the SERVICE value posted to
    // `property_situation` is the frozen CRM enum below and is not selected by the visitor.
    statusLabel: "What best describes the property?",
    statusOptions: [
      "Estate after a loss",
      "Inherited home",
      "Occupied home",
      "Other"
    ],
    // OPTIONAL free text. No minimum word or character requirement, in the browser or on the
    // server — see functions/_lib/lead.ts `detailOptionalCampaignRoutes`.
    detailLabel: "What do you need help with?",
    // The brief's own line about photographs (its process step 1), reused as the upload helper so
    // the control's optionality is stated in the brief's words rather than invented ones.
    photoHelper: "Photos are helpful, but optional.",
    microcopy: "Sending this request does not book a crew or authorize work."
  },

  // ── CONFIRMATION ROUTE ─────────────────────────────────────────────────────────────────────
  // Same contract as the hoarding campaign's thank-you route: reached ONLY by redirect after
  // functions/api/lead.ts returns a confirmed `ok: true`, by GET, carrying `received`, `code`,
  // `email` and `callback` and nothing personal. A separate route from the sitewide /thank-you/
  // because that page renders the full site header and Services dropdown, which this campaign's
  // PPC exception removes.
  thankYou: {
    route: "/estate-cleanout-san-jose/assessment/thank-you/",
    seo: {
      // NEUTRAL. The default server-rendered state of this page is the UNCONFIRMED one, so a
      // title reading "Request received" would contradict what a crawler or a no-JS visitor sees.
      title: "Your request | Aseptaclean",
      description: "Status of the estate cleanout request you sent to Aseptaclean."
    },
    eyebrow: `Estate Cleanouts · San Jose · ${site.location.serviceArea}`,
    heading: "Request received.",
    // The brief's own form microcopy, expanded to the confirmation tense. "Arrange" is
    // deliberate: the visitor has requested contact, and nothing here says a visit is booked.
    body: [
      "We’ll contact you to discuss the property and arrange the next step.",
      "No need to sort or clean before we speak."
    ],
    emailSent: "A confirmation email is on its way to the address you gave us.",
    emailPending:
      "We could not send a confirmation email just now. That does not affect your request — we have it.",
    codeLabel: "Confirmation code",
    codeNote: "Quote this if you call.",
    // No response-time promise: AGENTS.md §3 records the verified response as "within one
    // business day" and docs/02-CURRENT-FACTS.md forbids inventing one. This states what happens,
    // not when.
    boundary:
      "Sending this request does not book a crew or authorize work, it does not confirm an appointment, and it does not create a service agreement.",
    unconfirmed: {
      heading: "This page does not confirm that a request was received.",
      body: "If you have just submitted the form, your confirmation was shown once. If you arrived here another way, or refreshed this page, send your details again and we will pick it up.",
      backLabel: "Back to the form"
    }
  },

  // ── SECTION 2 — "Get help with the whole cleanout." ─────────────────────────────────────────
  // The brief's six-part offer section. FIVE parts render: the document-shredding card is omitted
  // under B1. Two further cards carry the B2 and B4 fallbacks. Presented as a simple text grid
  // with restrained rules, not a wall of repeated cards (brief's "Presentation" note).
  //
  // REFRESH §2: "one short introductory paragraph followed by compact service rows", and
  // "Avoid several long introductory paragraphs above the actual offer" — but also "Do not remove
  // unique service information just to shorten the page." So the first paragraph leads the
  // section and the other two move BELOW the rows, where they read as what they are: how the
  // plan is assembled and where the scope is agreed. No sentence was cut.
  offer: {
    heading: "Get help with the whole cleanout.",
    lead: "Moving furniture is only part of the job. There may be family photos to find, papers to protect, donations to arrange, and cleaning underneath everything.",
    closing: [
      "We bring those tasks into one plan, so you spend less time arranging separate services and managing the work yourself.",
      "At your walkthrough, we discuss what you need and build your proposal around it."
    ],
    items: [
      {
        title: "Sorting, clearing & cleaning",
        // "arranging disposal" is coordination, not self-performed transport — the boundary
        // docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §4.3 draws and the brief repeats ("Do not describe
        // Aseptaclean as a waste transporter"). The footer's scope disclaimer states it outright.
        body: "Help going through belongings, clearing approved contents, arranging disposal, and cleaning the agreed rooms and surfaces."
      },
      {
        // B2: heading truncated from "Belongings set aside and recorded" — "and recorded" is the
        // inventory promise the fallback removes. The instruction sentence is retained as the
        // fallback requires; the "Designated items are photographed and listed, with labeled boxes
        // where needed" sentence is not rendered.
        title: "Belongings set aside",
        body: "We agree on what to keep and what needs your review."
      },
      // B1: the "Private papers handled separately" card is omitted in full.
      {
        title: "Donation arrangements",
        body: "We help coordinate donations for suitable items that an organization will accept. Available donation receipts are included in your project records."
      },
      {
        // B4: heading was "Updates without being there all day"; the promise of a schedule of
        // updates is what the fallback removes, so the heading names the contact instead.
        title: "One contact, without being there all day",
        body: "You have one project contact. If a decision is needed, we explain what needs your attention."
      },
      {
        // B1 + B2 + B4: shredding records, "designated belongings handed over" and disposal
        // records are all removed. Completion photographs and a written summary of the work are
        // the established Property Handoff Record deliverable and stay; donation records stay
        // conditional ("available").
        title: "A clear record when we finish",
        body: "Your completion package includes photos, a summary of the work, and available donation records."
      }
    ],
    // The bounding sentence, verbatim. It is what keeps every record promise above tied to the
    // written proposal rather than to the page.
    strongLine:
      "Your proposal explains which services, quantities, and records are included in your price.",
    // REQUIRED BY docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §4.2, not by the brief. Three strings on
    // this page describe arranging disposal, and §4.3 forbids any phrasing that reads as
    // self-performed transport — a rank-3 requirement that outranks the brief at rank 4. The
    // wording is the one already published on /estate-cleanout-san-jose/, not a new formulation,
    // and §4.2 places it "in the scope section", which on this page is the offer block above.
    // The brief itself asks for the same distinction: "distinguish contents clearing from
    // disposal coordination."
    disposalBoundary:
      "Aseptaclean is not a hauling company. We sort, bag, stage, carry out and load approved material; disposal and transport off the property are handled by a City-authorized hauler engaged for the project."
  },

  // ── SECTION 3 — "Keep what matters. Make a plan for the rest." ──────────────────────────────
  // Three-column KEEP / REMOVE / REVIEW on desktop, stacked on mobile.
  decisions: {
    heading: "Keep what matters. Make a plan for the rest.",
    body: [
      "You may already know what you want to keep. You may still be unsure. Either way, we agree on the instructions before clearing begins."
    ],
    // The brief gives this row no heading of its own, so none is invented; the group carries an
    // accessible name instead (see PpcDecisions `rowLabel`).
    rowLabel: "How belongings are categorised",
    row: [
      { title: "KEEP", body: "Belongings to remain or be set aside." },
      { title: "REMOVE", body: "Contents approved for clearing." },
      { title: "REVIEW", body: "Items that need a decision before they go." }
    ],
    rowNote:
      "Tell us about important papers, photographs, jewelry, or other belongings you want us to look for. We’ll discuss the search and sorting needed and include the agreed work in your plan.",
    strongLine: "You make the important decisions. We help carry them out."
  },

  // ── SECTION 4 — PLAN, PRICE AND COMMITMENTS (merged) ────────────────────────────────────────
  // REFRESH §4 merges "Know the price and schedule before you decide" and "Clear commitments from
  // the start" into ONE compact navy section, 60/40, with no photograph. Every sentence from both
  // original sections survives; only their container changed. The refresh also confirms two
  // things this file already did:
  //   · "Keep the clarification about newly exposed conditions and written approval of
  //     additional work" — both are below, unchanged.
  //   · "Do not reinstate a guarantee removed because its agreement terms remain unconfirmed" —
  //     §B5's fallback sentence stays, and the missed-task promise stays out.
  // This route still publishes no price figure of any kind (AGENTS.md §4, and section C above).
  scope: {
    heading: "Know the price and schedule before you decide.",
    body: [
      "A packed house can hide a lot of work. Your walkthrough helps us understand the contents, access, sorting, disposal, and cleaning involved.",
      "You receive:"
    ],
    list: [
      "A written description of the work.",
      "The price for that scope.",
      "An expected start and completion schedule.",
      "Clear details about anything not included."
    ],
    closing: "We arrange staffing around the work your property needs.",
    pullQuote:
      "If clearing reveals a condition that changes the job, we explain the additional work and price before asking for your approval.",
    commitmentsHeading: "Clear commitments from the start.",
    commitments: [
      {
        title: "You approve changes to the price.",
        body: "Additional work requires your written approval before additional charges."
      },
      {
        title: "Your belongings instructions guide the work.",
        body: "We follow the agreed rules for what stays, what goes, and what needs review."
      },
      {
        // B5: the brief's supplied fallback sentence, verbatim, in place of the missed-task
        // correction promise. The heading is kept because the fallback sentence is still a
        // statement about standing behind the agreed work. The layout refresh independently
        // instructs that this not be reverted.
        title: "We stand behind the agreed work.",
        body: "We review the completed work against your written scope with you."
      }
    ]
  },

  // ── SECTION 5 — THREE STEPS ─────────────────────────────────────────────────────────────────
  // REFRESH §5 replaces the five cramped columns with three evenly sized steps and supplies their
  // titles and lead sentences verbatim. Its own constraint — "Preserve any supported update and
  // completion-record details in these steps", "preserving the substantive information" — is why
  // each body carries a second sentence: the five-step version's substantive facts are folded in
  // rather than dropped.
  //   step 1  ← old 1 + 2   photos optional, walkthrough of belongings and deadline
  //   step 2  ← old 3       scope, price, exclusions seen before committing
  //   step 3  ← old 4 + 5   crew and services arranged, decisions brought to you, final review
  //                         and completion records
  // §B4 still applies: no schedule of updates is promised anywhere in these steps.
  process: {
    heading: "A straightforward process.",
    steps: [
      {
        title: "Show us the home.",
        body: "Call or share details, then walk through the property, belongings instructions, and any deadline with us. Photos are helpful, but optional."
      },
      {
        title: "Review the plan and price.",
        body: "See the agreed work and expected schedule before approving the project. You see the scope, the price for that scope, and anything not included before committing."
      },
      {
        title: "We handle the cleanout.",
        body: "We arrange the crew and services, bring decisions to you, and review the finished work with you. You receive your completion records when we finish."
      }
    ]
  },

  // ── SECTION 7 — "You'll know who to call." ──────────────────────────────────────────────────
  // No founder BACKGROUND claim appears here — no biochemistry, pharmaceutical or pathology
  // reference — so doc 21 §2.4's verbatim authority-limit clause is not triggered and is not
  // added. (It is mandatory only "wherever the founder's background appears", which is why the
  // hoarding campaign's §08 carries it and this section does not.) The portrait is the real,
  // owner-supplied photograph; AGENTS.md §0.3 forbids any substitute.
  founder: {
    heading: "You’ll know who to call.",
    body: [
      `I’m ${site.founder.name}, the owner of ${site.business.name}.`,
      "I’ll discuss the property with you, explain the proposed work, and be your point of contact throughout the project.",
      "You don’t need to know how to organize a cleanout before we talk. Tell me what you’re facing and what you need to happen next."
    ]
  },

  // ── SECTION 8 — "Questions families ask" ────────────────────────────────────────────────────
  // Eight of the brief's ten questions. The inventory question is omitted under B2 and the
  // shredding question under B1; the remaining eight are verbatim and in the supplied order.
  faq: {
    heading: "Questions families ask",
    items: [
      {
        question: "Do I have to sort everything first?",
        answer:
          "No. Contact us with the home as it is. We’ll discuss where you need sorting help and anything you already know you want to keep."
      },
      {
        question: "Can you handle a home with every room packed?",
        answer:
          "We assess heavily accumulated homes. The contents, access, and property conditions determine the crew, equipment, and services needed."
      },
      {
        question: "What if I live out of town?",
        answer:
          "We can discuss access arrangements, scheduled photo updates, and how you’ll approve decisions remotely. You’ll need someone authorized to provide access and approve the work."
      },
      // OMITTED under B2: "Will you make a list of everything in the house?"
      {
        question: "Can you find specific belongings?",
        answer:
          "Tell us what you’re looking for. We can agree on search areas and sorting time, but we cannot guarantee that a missing item will be found."
      },
      // OMITTED under B1: "Who decides which papers get shredded?"
      {
        question: "Can everything be donated?",
        answer:
          "No. Donations depend on an organization’s needs and the condition of the items. We discuss suitable options and arrange disposal for approved items that cannot be accepted."
      },
      {
        question: "What if there are rodent droppings or other contamination?",
        // The brief's answer, plus the two clauses docs/21-CLAIMS-AND-COMPLIANCE-LAW.md makes
        // MANDATORY wherever animal or organic condition work is described. Doc 21 is rank 3 and
        // outranks the brief's copy at rank 4, so these are added rather than omitted — and
        // neither is invented: both ship verbatim on /estate-cleanout-san-jose/ already.
        //   · §2.3, verbatim and complete including "sterilization".
        //   · §3.1's hard scope boundary — this page names a rodent condition, and B&P §8550(a)
        //     reaches advertising, not just work. Without it, "we assess those conditions" could
        //     read as an infestation assessment, which is the regulated act.
        // The brief's own sentence is unchanged and still leads the answer.
        answer:
          "We assess those conditions and explain the cleanup needed. Your proposal identifies what is included. Newly exposed conditions may require a change to the scope. " +
          "Cleaning only — not a decontamination, sterilization, or health-safety determination. " +
          "Aseptaclean may clean accepted conditions left behind after an appropriately licensed pest operator has confirmed the active pest issue is resolved. Aseptaclean does not inspect for, identify, exclude, trap, or treat pests."
      },
      {
        question: "How long does a cleanout take?",
        answer:
          "The amount of belongings, sorting, access, and cleaning all affect the schedule. We provide an expected timeline after the assessment."
      },
      {
        question: "Will the house be ready to sell?",
        // Names the boundary rather than promising a sale-ready property — the brief's own "Do not
        // expand into repair, demolition, appraisal, legal estate advice, or guaranteed property
        // clearance", and doc 21 §2.1's habitability/clearance boundary.
        answer:
          "We can clear the approved contents and clean the agreed areas. Repairs, inspections, or other preparation may still be needed before listing."
      }
    ]
  },

  // ── SECTION 9 — "Let's make a plan for the house." ──────────────────────────────────────────
  final: {
    heading: "Let’s make a plan for the house.",
    body: [
      "You have enough to manage. Start with a conversation about the property, and we’ll help you understand what it will take to clear it."
    ],
    // Substitution A1.
    areaLine: `San Jose · ${site.location.serviceArea}`
  },

  // ── IMAGERY ────────────────────────────────────────────────────────────────────────────────
  // Two owner-supplied illustrations installed 2026-09-09 with the layout refresh, which removed
  // this route's dark living-room hero, its garage-storage image and its dirty-room pricing
  // image. None of those three files was deleted — every one of them still ships on the pages
  // that own it (`home-hero-neglected-interior` on `/`, `hoarding-garage-contents` on
  // /hoarding-cleanup-san-jose/ and the hoarding campaign, `home-property-scope-detail` on `/`).
  //
  // CAPTIONS. The refresh requires a small visible "Illustrative image" caption on each new
  // scene. That reverses the 2026-09-05 sitewide caption removal FOR THESE TWO IMAGES ON THIS
  // ROUTE ONLY — a later rank-2 owner instruction over an earlier one, within the scope it
  // actually decided. No other image on this site regains a caption.
  //
  // Neither scene is presented as an Aseptaclean project, result, crew or before/after pair, and
  // the two are independent illustrations. The alt text is the refresh's own, verbatim.
  images: {
    caption: "Illustrative image",
    accumulationAlt:
      "Illustration of a home with accumulated furniture, boxes, and belongings.",
    sortingAlt: "Illustration of family photographs and keepsakes being sorted into boxes."
  },

  stickyBar: {
    // Shorter than the hero CTA because the bar is a 2-up control strip at ≤1200px. It under-
    // claims rather than over-claims, and it points at the same form.
    secondaryLabel: "Request a Walkthrough"
  }
} as const;

// TSW #933 DISPLAY SCOPE ON THIS ROUTE. False until an explicit owner decision widens
// docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §5's authorized surfaces to include this campaign page and
// that decision is recorded in docs/05-CURRENT-DECISIONS.md. Flipping this one boolean is the
// entire change — the item, its copy, its icon and its 46fr column are already built.
//
// Do NOT flip it to "make the trust bar look complete". §5 authorizes one registered scope, and
// the same request was already escalated and refused on /hoarding-cleanup-san-jose/assessment/.
export const publishTswOnEstateCampaign = false;

// The trust-bar items that may actually publish today, in the requested order. Each gate is
// evaluated here rather than inside a component, so the reason a slot is empty stays with the
// fact that empties it. AGENTS.md §0.3: "If a proof slot has no real asset, the slot ships
// empty. Empty beats fake, always."
export const ppcEstateTrustItems = [
  ...(publishTswOnEstateCampaign ? [ppcEstate.trustBar.tsw] : []),
  ...(site.business.insuranceStatus ? [ppcEstate.trustBar.insured] : []),
  ppcEstate.trustBar.ownerLed
];

// The two campaign call labels, assembled from the central verified values and nothing else
// (AGENTS.md §3: never hardcode a business fact in a component).
export const ppcEstateCallLabel = `${site.offer.primaryCta} · ${site.business.phone}`;

// Substitution A2's second half — the founder section's personal call label. `founder.name` is
// the verified value; only the given name is used, exactly as the brief writes it.
export const ppcEstateFounderCallLabel = `Call ${site.founder.name.split(" ")[0]} · ${site.business.phone}`;
