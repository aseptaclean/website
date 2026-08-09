const env = import.meta.env;

const value = (key: keyof ImportMetaEnv, fallback = "") =>
  env[key]?.trim() || fallback;

const isProductionBuild = value("PUBLIC_DEPLOYMENT_ENV") === "production";

// docs/07-ONE-PAGE-DIRECTIVE.md §10 marks the flagship starting price OWNER DECISION REQUIRED
// (see §5 — the $1,500 problem). This placeholder must never resolve in a production build.
const OWNER_DECISION_REQUIRED =
  "[OWNER DECISION REQUIRED — see docs/07-ONE-PAGE-DIRECTIVE.md §5]";
const rawStartingPrice = value("PUBLIC_STARTING_PRICE", OWNER_DECISION_REQUIRED);
if (isProductionBuild && rawStartingPrice === OWNER_DECISION_REQUIRED) {
  throw new Error(
    "PUBLIC_STARTING_PRICE is unresolved. docs/07-ONE-PAGE-DIRECTIVE.md §5 requires an owner " +
      "decision (raise the floor, publish a band, or label $1,500 as a Handoff Finish entry " +
      "point) before this value may reach a production build."
  );
}
// Non-production builds/previews (e.g. bare `astro dev`) load no PUBLIC_STARTING_PRICE, so
// rawStartingPrice falls back to the placeholder string above and Number(...) of it is NaN.
// Resolve to a real number when possible; otherwise null so the UI renders a text fallback
// instead of formatting NaN as currency ("$NaN").
const parsedStartingPrice = Number(rawStartingPrice);
const startingPrice = Number.isFinite(parsedStartingPrice) ? parsedStartingPrice : null;

const rawPhone = value("PUBLIC_PHONE");
const phoneUri = rawPhone ? `tel:${rawPhone.replace(/[^\d+]/g, "")}` : "";
const smsUri = rawPhone ? `sms:${rawPhone.replace(/[^\d+]/g, "")}` : "";

const termlyWebsiteUuid = value("PUBLIC_TERMLY_WEBSITE_UUID");
const termlyPrivacyPolicyId = value("PUBLIC_TERMLY_PRIVACY_POLICY_ID");
const termlyTermsPolicyId = value("PUBLIC_TERMLY_TERMS_POLICY_ID");
const termlyCookiePolicyId = value("PUBLIC_TERMLY_COOKIE_POLICY_ID");
const termlyPrivacyUrl = value("PUBLIC_TERMLY_PRIVACY_URL");
const termlyTermsUrl = value("PUBLIC_TERMLY_TERMS_URL");
const termlyCookiePolicyUrl = value("PUBLIC_TERMLY_COOKIE_POLICY_URL");
const termlyConsentEnabled =
  value("PUBLIC_TERMLY_CONSENT_ENABLED") === "true" &&
  Boolean(termlyWebsiteUuid);

export const site = {
  business: {
    name: value("PUBLIC_BUSINESS_NAME", "Aseptaclean"),
    legalName: value("PUBLIC_LEGAL_NAME", "Aseptaclean, LLC"),
    email: value("PUBLIC_EMAIL", "info@aseptaclean.com"),
    phone: rawPhone,
    phoneUri,
    smsNumber: value("PUBLIC_SMS_NUMBER"),
    smsUri,
    privacyContact: value("PUBLIC_PRIVACY_CONTACT"),
    hours: value(
      "PUBLIC_BUSINESS_HOURS",
      "Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday"
    ),
    insuranceStatus: value(
      "PUBLIC_INSURANCE_STATUS",
      "Insured. Certificate of Insurance available upon request."
    ),
    addressPolicy: "service-area business — no published street address",
    googleBusinessProfileUrl: value("PUBLIC_GBP_URL"),
    logoUrl: value(
      "PUBLIC_LOGO_URL",
      "/assets/brand/aseptaclean-wordmark.png"
    ),
    logoReversedUrl: value(
      "PUBLIC_LOGO_REVERSED_URL",
      "/assets/brand/aseptaclean-wordmark-reversed.png"
    ),
    siteIconUrl: value(
      "PUBLIC_SITE_ICON_URL",
      "/assets/brand/aseptaclean-site-icon-512.png"
    )
  },
  founder: {
    name: value("PUBLIC_FOUNDER_NAME", "Matthew Ruiz"),
    title: "Founder & Principal Operator"
  },
  offer: {
    name: "Aseptaclean Handoff Reset",
    category:
      "Whole-property clearing, deep cleaning, and documented closeout",
    leadOffer: "24-Hour Property Handoff Plan",
    responseTime: value(
      "PUBLIC_RESPONSE_TIME",
      "within one business day"
    ),
    assessmentFee: Number(value("PUBLIC_ASSESSMENT_FEE", "195")),
    assessmentFeeTerms: "Credited toward an approved project booked within 7 days.",
    startingPrice,
    // docs/aseptaclean-FINAL-v2.html — every CTA reads "Request an assessment" and anchors to
    // #request (05-DECISIONS-LOG.md supersedes docs/06-APPROVED-HOMEPAGE-COPY.md §8.4 for `/`).
    primaryCta: "Request an assessment"
    // remediationLaunchLabel removed — docs/18-VISUAL-DIRECTION.md §7: environmental/human
    // biohazard remediation does not appear on the live site at all (not even a "coming soon"
    // tag) until the credential is held. See docs/05-DECISIONS-LOG.md.
  },
  residenceOffer: {
    name: "Private Residence Reset",
    category: "Structured whole-home deep reset",
    startingPrice: Number(
      value("PUBLIC_RESIDENCE_STARTING_PRICE", "2000")
    ),
    primaryCta: "Request a Private Residence Assessment",
    assessmentUrl:
      "/request-assessment/?offer=private-residence-reset"
  },
  location: {
    serviceArea: value(
      "PUBLIC_SERVICE_AREA",
      "San Jose and the South Bay"
    ),
    // docs/18-VISUAL-DIRECTION.md §7 credential bar reads "... · Santa Clara County" —
    // a distinct, more specific fact than the metro-area serviceArea phrase above.
    county: value("PUBLIC_SERVICE_COUNTY", "Santa Clara County"),
    cities: [
      "San Jose",
      "Mountain View",
      "Sunnyvale",
      "Santa Clara",
      "Campbell"
    ]
  },
  urls: {
    site: value("PUBLIC_SITE_URL", "https://aseptaclean.com"),
    formEndpoint: value("PUBLIC_FORM_ENDPOINT"),
    privacyPolicy: "/privacy/",
    terms: "/terms/",
    cookiePolicy: "/cookie-policy/"
  },
  integrations: {
    formEnabled: value("PUBLIC_FORM_ENABLED") === "true",
    turnstileSiteKey: value("PUBLIC_TURNSTILE_SITE_KEY"),
    analytics: {
      gaId: value("PUBLIC_GA_ID"),
      gtmId: value("PUBLIC_GTM_ID")
    },
    termly: {
      websiteUuid: termlyWebsiteUuid,
      consentEnabled: termlyConsentEnabled,
      consentScriptUrl: termlyConsentEnabled
        ? `https://app.termly.io/resource-blocker/${encodeURIComponent(termlyWebsiteUuid)}?autoBlock=on`
        : "",
      policyScriptUrl: "https://app.termly.io/embed-policy.min.js",
      policies: {
        privacy: {
          id: termlyPrivacyPolicyId,
          hostedUrl: termlyPrivacyUrl
        },
        terms: {
          id: termlyTermsPolicyId,
          hostedUrl: termlyTermsUrl
        },
        cookie: {
          id: termlyCookiePolicyId,
          hostedUrl: termlyCookiePolicyUrl
        }
      }
    }
  },
  deployment: {
    environment: value("PUBLIC_DEPLOYMENT_ENV", "local"),
    isPublicProduction: value("PUBLIC_DEPLOYMENT_ENV") === "production"
  }
} as const;

// docs/aseptaclean-FINAL-v2.html nav — ported verbatim (05-DECISIONS-LOG.md). Labels match the
// mockup exactly; hrefs point at this build's actual section ids (the mockup used bare "#").
export const navigation = [
  { label: "Services", href: "/#included" },
  { label: "Method", href: "/#standards" },
  { label: "The Record", href: "/#record" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" }
] as const;

export const legal = {
  scopeDisclaimer:
    "Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.",
  documentationDisclaimer:
    "Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable."
} as const;

export const homepage = {
  qualification: [
    {
      label: "Unwanted contents, heavy cleaning needs, or both",
      detail: "The remaining work is more than routine housekeeping or a single-item pickup."
    },
    {
      label: "One authorized decision-maker",
      detail: "A clear person can approve the scope, changes, and final decisions."
    },
    {
      label: "A real completion deadline",
      detail: "The listing, transfer, tenancy, inspection, or family decision has a target date."
    },
    {
      label: "A visible, documented closeout",
      detail: "The handoff needs a written plan for what stays, what leaves, and what gets cleaned."
    }
  ],
  contrast: [
    {
      party: "A hauler",
      action: "may remove the contents.",
      remainder:
        "Dust, residue, cabinet debris, appliance buildup, and unfinished rooms can remain."
    },
    {
      party: "A cleaner",
      action: "may handle the surfaces.",
      remainder:
        "The property may need to be completely empty before the cleaning can begin."
    },
    {
      party: "Aseptaclean",
      action: "manages the handoff condition.",
      remainder:
        "Clearing and cleaning are defined together, completed under the approved scope, and closed with documentation."
    }
  ],
  outcome: {
    before: [
      "Contents are still undecided",
      "Clearing and cleaning are disconnected",
      "The deadline is difficult to verify"
    ],
    after: [
      "Approved contents are removed",
      "Keep and review items are separated",
      "Completion and exceptions are documented"
    ]
  },
  handoffStages: [
    {
      name: "Scope",
      detail:
        "We write down what stays, what goes, what gets cleaned, what is excluded, and what the project will require.",
      record: "Room-by-room plan",
      status: "Defined"
    },
    {
      name: "Protect",
      detail:
        "Keep areas are identified. Uncertain and important discovered items are separated and reported. We do not decide what mattered to your family.",
      record: "Keep and review controls",
      status: "Held for review"
    },
    {
      name: "Clear",
      detail:
        "Approved unwanted contents are consolidated, removed, or coordinated for disposal within the signed scope.",
      record: "Clearing status",
      status: "Complete"
    },
    {
      name: "Reset",
      detail:
        "The property receives the detailed cleaning included for its next handoff.",
      record: "Cleaning status",
      status: "Complete"
    },
    {
      name: "Verify",
      detail:
        "You receive completion photographs, documented exceptions, and a Property Handoff Record showing how the approved scope was closed.",
      record: "Closeout package",
      status: "Issued"
    }
  ],
  sampleRecord: {
    projectId: "HR-1042",
    decisionMaker: "Owner of record — single point of approval",
    clearingScope:
      "Nonhazardous contents, bagging and consolidation, garage and storage-area clearing, approved disposal coordination",
    cleaningScope:
      "Kitchen and bathroom deep cleaning, cabinet and appliance interiors, floors, baseboards, and accessible surfaces",
    excludedConditions:
      "None encountered on this project — full exclusion list attached to the signed scope",
    rooms: [
      {
        area: "Entry + living",
        disposition: "Keep",
        note: "Furnishings remain in place; included in the detailed cleaning pass"
      },
      {
        area: "Kitchen",
        disposition: "Keep",
        note: "Cabinet and appliance interiors detailed per approved scope"
      },
      {
        area: "Primary closet",
        disposition: "Review",
        note: "Contents held for owner decision before any clearing proceeds"
      },
      {
        area: "Garage",
        disposition: "Remove",
        note: "Unwanted contents cleared; surfaces swept and detailed"
      }
    ],
    changeAuthorization:
      "Change Auth 01 · Kitchen appliance interiors added to cleaning scope · owner-approved",
    discoveredItemLog:
      "Item Log 01 · Jewelry box isolated in primary closet · reported to owner, not disturbed",
    exceptionStatus: "1 open exception — primary closet contents pending owner review",
    photographIndex: "Photos 01–18 starting condition · 19–42 closeout condition",
    finalReviewStatus: "Approved scope closed",
    closeoutDate: "Confirmed at final walkthrough, prior to handoff"
  },
  // docs/18-VISUAL-DIRECTION.md §6.1 — "Three cards, not six." Launch set is exactly these
  // three; add a fourth only once completed jobs generate owned photography for it. Per §7,
  // environmental remediation does not appear on the live site until the credential is held —
  // the prior "coming soon" remediation card (Session B, 05-DECISIONS-LOG.md) is removed, not
  // just relabeled. `imageStatus` records which imagery policy (§5) governs the slot until a
  // real photo lands: "owned" = must be owner-shot or the slot stays empty; "atmosphere" =
  // licensed/self-shot atmosphere permitted.
  serviceCards: [
    {
      title: "Complex property clearing",
      detail:
        "Whole-property clearing for heavy accumulation, estate, and abandoned-contents conditions — nonhazardous contents only, within a signed scope.",
      imageLabel: "Process kit, flat-lay",
      imageStatus: "owned"
    },
    {
      title: "Reset & restoration cleaning",
      detail:
        "Deep reset cleaning after clearing — kitchens, baths, interiors, and accessible surfaces, within the signed scope.",
      imageLabel: "Clean kitchen or bath detail",
      imageStatus: "atmosphere"
    },
    {
      title: "Animal & organic condition cleaning",
      detail:
        "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. This is cleaning only — not a decontamination, sterilization, or health-safety determination.",
      imageLabel: "Completed job photo",
      imageStatus: "owned"
    }
  ],
  // docs/18-VISUAL-DIRECTION.md §6 row 4 — "Why Aseptaclean," a four-item icon grid, [NONE]
  // image. Each line restates a claim already approved and rendered elsewhere on the page
  // (Hero's trust line, homepage.assurance) rather than introducing a new claim.
  whyAseptaclean: [
    {
      title: "One accountable company",
      detail:
        "Clearing, cleaning, and closeout documentation are managed under one written scope instead of coordinated across separate vendors."
    },
    {
      title: "Written scope, not verbal promises",
      detail:
        "What stays, what leaves, what gets cleaned, and what is excluded is written down before work begins."
    },
    {
      title: "Nothing removed without approval",
      detail:
        "Uncertain items are identified for review, not automatically discarded, and added work requires documented authorization."
    },
    {
      title: "Documented closeout",
      detail:
        "Completion photographs, noted exceptions, and a Property Handoff Record show how the approved scope was closed."
    }
  ],
  includedScope: [
    "Nonhazardous contents clearing",
    "Bagging and consolidation",
    "Light non-structural disassembly",
    "Garage and storage-area clearing",
    "Kitchen and bathroom deep cleaning",
    "Cabinet and appliance interiors when included",
    "Floors, baseboards, doors, and accessible surfaces",
    "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement",
    "Approved disposal coordination",
    "Completion photographs and remote closeout"
  ],
  excludedScope: [
    "Human blood, bodily fluids, or regulated medical waste",
    "Needles or sharps requiring regulated handling",
    "Sewage or active mold remediation",
    "Asbestos, lead, unknown chemicals, or hazardous materials",
    "Structural repair, construction, or demolition",
    "Pest extermination or chemical treatment",
    "Appraisal, estate-sale, legal, or habitability determinations"
  ],
  assurance: [
    {
      title: "Nothing removed without approval",
      detail:
        "The scope identifies keep, remove, and review areas. Uncertain items are not automatically discarded."
    },
    {
      title: "No unapproved charges",
      detail:
        "Added labor, services, rentals, disposal, or materials require documented customer authorization."
    },
    {
      title: "Written scope changes",
      detail:
        "Customer requests or concealed conditions that materially change the work are documented before work proceeds."
    },
    {
      title: "Missed scope items corrected",
      detail:
        "If an item specifically included in the signed scope is missed, notify Aseptaclean with a photograph within 24 hours of completion. Aseptaclean will return within two business days to correct that item at no additional labor charge."
    },
    {
      title: "Important discovered items reported",
      detail:
        "Keys, documents, photographs, cash, jewelry, and similar discovered items are isolated and reported."
    },
    {
      title: "Discretion",
      detail:
        "Unmarked vehicles, plain clothing, and no signage. We do not discuss the property with neighbors, and scheduling can be arranged around who is home or visible nearby."
    }
  ],
  pricingDrivers: [
    "Property size",
    "Volume of contents",
    "Cleaning condition",
    "Access and stairs",
    "Disposal requirements",
    "Labor and deadline",
    "Concealed conditions"
  ],
  founderCredentials: [
    "B.S. in Biochemistry, University of California, Riverside",
    "Pharmaceutical manufacturing experience",
    "Histology and surgical pathology experience",
    "Direct involvement in scope review, planning, communication, and operating oversight"
  ],
  nextSteps: [
    {
      title: "Tell us what you are looking at",
      detail:
        "Tell us what must stay, what must go, the current condition, and the deadline. Photos are strongly recommended."
    },
    {
      title: "Receive the Handoff Plan",
      detail:
        "Within one business day, receive a fit decision, preliminary scope direction, and clear next step."
    },
    {
      title: "Confirm the scope",
      detail:
        "Complete an on-site assessment when required. Review the written scope, price, exclusions, and schedule."
    },
    {
      title: "Approve and schedule",
      detail:
        "Sign the scope and submit the required deposit before a project date is reserved."
    },
    {
      title: "Walk back into a property that can move forward",
      detail:
        "After completion, receive photographs, noted exceptions, and the Property Handoff Record."
    }
  ],
  faq: [
    {
      question: "Can I approve the project remotely?",
      answer:
        "Yes, when access and decision authority are clear. Scope review, approvals, updates, and closeout can be handled electronically."
    },
    {
      question: "How do you know what should stay?",
      answer:
        "The written scope identifies keep, remove, and review areas. Uncertain items are not automatically discarded."
    },
    {
      question: "What happens if you find important documents or valuables?",
      answer:
        "Discovered keys, documents, photographs, cash, jewelry, and similar items are isolated and reported. Aseptaclean does not guarantee that every concealed item will be found."
    },
    {
      question: "Can you coordinate a dumpster?",
      answer:
        "Approved disposal or dumpster coordination may be included when appropriate for the project and current legal operating scope."
    },
    {
      question: "Can you clean after the property has already been emptied?",
      answer:
        "Yes. Some already-cleared properties may qualify for a detailed Handoff Finish scope after review."
    },
    {
      question: "What can change the price?",
      answer:
        "Customer-requested changes, concealed or undisclosed conditions, disposal changes, access limitations, or prohibited materials may require a written scope change."
    },
    {
      question: "What happens if a hazardous condition is discovered?",
      answer:
        "Work in the affected area stops. The condition is documented and the customer is notified before any next step is taken."
    },
    {
      question: "How quickly can the project begin?",
      answer:
        "Availability depends on scope, access, labor, disposal requirements, and existing commitments. A start date is reserved after scope approval and deposit."
    },
    {
      question: "Can you work with my realtor, property manager, or family member?",
      answer:
        "Yes, provided one authorized decision-maker controls approvals and payment."
    },
    {
      question: "Do I have to be present?",
      answer:
        "Not always. Remote projects can be managed when access, authority, communication, and scope are clear."
    },
    {
      question:
        "Do you handle properties with heavy accumulation or hoarding conditions?",
      answer:
        "Yes, within our current lawful and insured operating scope. Heavy accumulation and whole-house cleanouts go through the same written-scope process as every project: keep, remove, and review areas are identified before work begins, and nothing is discarded automatically. Some conditions remain outside our current scope: human blood, bodily fluids, or regulated medical waste; sewage cleanup or active mold remediation; asbestos, lead, unknown chemicals, or hazardous materials; structural repair, construction, or demolition; pest extermination or chemical treatment; and appraisal, estate-sale, legal, or habitability determinations. If we observe one of these conditions, work in the affected area stops and you are notified before the project moves forward."
    }
  ]
} as const;
