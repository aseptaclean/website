const env = import.meta.env;

const value = (key: keyof ImportMetaEnv, fallback = "") =>
  env[key]?.trim() || fallback;

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
    yelpUrl: value("PUBLIC_YELP_URL"),
    nextdoorUrl: value("PUBLIC_NEXTDOOR_URL"),
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
    leadOffer: "Property Handoff Plan",
    responseTime: value(
      "PUBLIC_RESPONSE_TIME",
      "within one business day"
    ),
    assessmentFee: Number(value("PUBLIC_ASSESSMENT_FEE", "195")),
    assessmentFeeTerms: "Credited toward an approved project booked within 7 days.",
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
    // docs/19-SYSTEM-AND-SITEMAP.md Part 5 + docs/05-DECISIONS-LOG.md "Service-area decision —
    // 10-city South Bay & Peninsula footprint": Atherton (and, to a lesser degree, Palo Alto /
    // Los Altos Hills) sit in San Mateo County, not Santa Clara County, so this footprint reads
    // "South Bay & Peninsula" rather than a county-only label anywhere it appears.
    regionLabel: "South Bay & Peninsula",
    cities: [
      "San Jose",
      "Mountain View",
      "Sunnyvale",
      "Santa Clara",
      "Campbell",
      "Los Altos",
      "Los Altos Hills",
      "Los Gatos",
      "Palo Alto",
      "Atherton"
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

// docs/aseptaclean-FINAL-v2.html nav — ported verbatim (05-DECISIONS-LOG.md), extended in
// Chunk 3 of the IA expansion (owner-approved plan, 2026-08-11) with flat links to the
// /services/ and /who-we-help/ hub pages. No dropdown/submenu — owner decision after
// confirming no doc (07/18/19) specs a nested-nav shape. The original "Services" entry
// pointed at the homepage's /#service-cards anchor; now that /services/ exists as a real
// page, it replaces that anchor entry rather than duplicating the "Services" label.
export const navigation = [
  { label: "Services", href: "/services/" },
  { label: "Who We Help", href: "/who-we-help/" },
  { label: "Method", href: "/#standards" },
  { label: "The Record", href: "/#record" },
  // Repointed 2026-08-18: /about/ and /faq/ are real, indexable routes, so the homepage
  // anchors were sending every nav click on every non-home page back to `/` and stranding the
  // two pages with nav-level internal links from nowhere. /contact/ added for the same reason —
  // it was indexable and footer-linked but absent from primary nav. Nav and footer now agree.
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" }
] as const;

// ---------------------------------------------------------------------------
// Mega-menu — 2026-08-18 visual port. Shape is doc 27 §8's nav tree, rendered as the
// mockups' full-width mega panels (PORT-PROMPT §3) and mirrored verbatim by the mobile
// drawer (§9.15.5). One-liners are §9.15.1's "Navigation dropdown one-liners" table,
// verbatim; hub blurbs are the hub H1s from doc 27 §10. No string here was written.
//
// Owner ruling 3 (2026-08-18) sets the group shape: THREE hub panels, with Commercial a
// single direct link to /commercial-cleaning-san-jose/ and no hub panel of its own.
// Service Areas is likewise a direct link — §8 lists five per-city anchors, but
// /service-areas/{city}/ routes do not exist and the same ruling forbids new routes.
//
// THREE §8 items are deliberately absent. Each is a HOLD pending an owner ruling, not an
// oversight — see docs/05-DECISIONS-LOG.md, visual port session 3:
//   1. Rodent Dropping Cleanup   2. Pigeon Dropping Cleanup
//      Cal. B&P §8505 expressly includes rodents; §8550(a) makes it unlawful to
//      "advertise, to engage in, or offer to engage in" that practice unlicensed, and a
//      sitewide header advertises on all 36 routes. docs/18-VISUAL-DIRECTION.md §7 (rank 5,
//      unrescinded) says rodent-specific handling is "not named anywhere" until written crew
//      PPE and protocol exist, and doc 27 §21's compliance release is unmet. This is the one
//      constraint owner ruling 3 does not reach: it set the menu's shape, not its lawfulness.
//   3. /projects/ — removed from the sitewide footer on 2026-08-18 with an explicit
//      "restore in the same change that lifts the noindex — not before." Putting it in the
//      header instead would reverse that decision from inside the same port effort.
// The crew-gated noindex routes (post-construction, window, eviction, animal waste,
// commercial, the specialty hub) ARE linked: ruling 3 put a noindex route into the nav by
// name, which settles noindex-in-nav as an accepted trade — it does not settle the statute.
export interface MegaNavChild {
  readonly label: string;
  readonly href: string;
  /** §9.15.1 nav one-liner. */
  readonly note: string;
  readonly icon: string;
}

export interface MegaNavGroup {
  readonly label: string;
  /** Direct-link groups render as a plain nav item with no panel. */
  readonly href?: string;
  readonly hub?: {
    readonly label: string;
    readonly href: string;
    readonly blurb: string;
    readonly cta: string;
  };
  readonly children?: readonly MegaNavChild[];
}

export const megaNav: readonly MegaNavGroup[] = [
  {
    label: "Detailed Cleaning",
    hub: {
      label: "Detailed Cleaning",
      href: "/detailed-cleaning/",
      blurb: "One-time cleaning for properties that need a real reset.",
      cta: "View the hub"
    },
    children: [
      {
        label: "Deep Cleaning",
        href: "/deep-cleaning-san-jose/",
        note: "Kitchens, baths, fixtures, and the edges that get skipped",
        icon: "home"
      },
      {
        label: "Move-In & Move-Out",
        href: "/move-out-cleaning-san-jose/",
        note: "Vacant turnover, keys-and-photos ready",
        icon: "truck"
      },
      {
        label: "Post-Construction",
        href: "/post-construction-cleaning-san-jose/",
        note: "Settled dust once the trades are out",
        icon: "build"
      },
      {
        label: "Window Cleaning",
        href: "/window-cleaning-san-jose/",
        note: "Glass, tracks, and frames within safe reach",
        icon: "window"
      }
    ]
  },
  {
    label: "Specialty Cleaning",
    hub: {
      label: "Specialty Cleaning",
      href: "/specialty-cleaning/",
      blurb: "Condition-reviewed cleaning for difficult properties.",
      cta: "View the hub"
    },
    children: [
      {
        label: "Extreme-Condition",
        href: "/extreme-cleaning-san-jose/",
        note: "Severely neglected property, reviewed first",
        icon: "shield"
      },
      {
        label: "Animal Waste",
        href: "/animal-waste-cleanup-san-jose/",
        note: "After the animals are gone",
        icon: "paw"
      }
    ]
  },
  {
    label: "Property Clearing",
    hub: {
      label: "Property Clearing",
      href: "/property-clearing/",
      blurb: "Clear the contents. Recover access. Prepare the property.",
      cta: "View the hub"
    },
    children: [
      {
        label: "Property Cleanouts",
        href: "/property-cleanouts-san-jose/",
        note: "Full-contents clearing under one scope",
        icon: "box"
      },
      {
        label: "Hoarding Cleanup",
        href: "/hoarding-cleanup-san-jose/",
        note: "Sorted, approved, documented",
        icon: "layers"
      },
      {
        label: "Estate Cleanouts",
        href: "/estate-cleanout-san-jose/",
        note: "Heirs, executors, real deadlines",
        icon: "doc"
      },
      {
        label: "Debris Removal",
        href: "/debris-removal-san-jose/",
        note: "Approved, lawful disposal",
        icon: "haul"
      },
      {
        label: "Eviction Cleanouts",
        href: "/eviction-cleanout-san-jose/",
        note: "Turnover on a clock",
        icon: "clock"
      }
    ]
  },
  {
    label: "Commercial",
    href: "/commercial-cleaning-san-jose/"
  },
  {
    label: "Service Areas",
    href: "/service-areas/"
  },
  {
    label: "Company",
    hub: {
      label: "About Aseptaclean",
      href: "/about/",
      blurb: "Owner-operated. Written scope. Documented closeout.",
      cta: "Read the story"
    },
    children: [
      {
        label: "About",
        href: "/about/",
        note: "Founder and background",
        icon: "person"
      },
      {
        label: "The Handoff Standard",
        href: "/handoff-standard/",
        note: "The five-stage standard",
        icon: "list"
      },
      {
        label: "FAQ",
        href: "/faq/",
        note: "Common questions",
        icon: "help"
      },
      {
        label: "Contact",
        href: "/contact/",
        note: "Phone, email, hours",
        icon: "mail"
      },
      {
        label: "Request an assessment",
        href: "/request-assessment/",
        note: "Full intake form",
        icon: "form"
      }
    ]
  }
];

export const legal = {
  // Base contact-consent statement. Owner ruling 2026-08-19: BOTH forms carry this wording
  // identically, and a form needing wider scope appends a separate sentence after it rather than
  // restating contact consent in different words. Single source so the two cannot drift again —
  // they already had, and the divergence was only found by a mechanical copy trace.
  //
  // 10DLC-RELEVANT. This is consent language on a site cited in an active Twilio 10DLC campaign
  // review (release checklist C9). Pending owner/counsel confirmation. Do not edit on style
  // grounds, and do not re-type it into a component — reference it.
  //
  // Split into fragments because "Privacy Policy" ships as a link: one flat string cannot carry
  // the anchor, and the moment a component re-types the surrounding text the drift is back.
  consentBase: {
    lead: "I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the",
    privacyLabel: "Privacy Policy",
    tail: "."
  },
  // Appended after consentBase on the full assessment form only (owner ruling 2026-08-19,
  // option B). It adds the two scopes the long form needs beyond contact consent — property-media
  // use, and the Terms — as separate sentences, rather than restating contact consent in
  // different words as the previous string did. Same `privacy_consent` checkbox, so it remains
  // one consent act. 10DLC-relevant on the same terms as consentBase; do not re-type either.
  consentAssessmentAppendix: {
    lead: "I understand that my information and property media will be used to evaluate the requested project. I have also read the",
    termsLabel: "Terms and Conditions",
    tail: "."
  },
  scopeDisclaimer:
    "Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.",
  documentationDisclaimer:
    "Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.",
  // docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §2.4 — verbatim, mandatory wherever the founder's
  // background appears.
  founderAuthorityLimit:
    "This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority."
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
        "We write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.",
      record: "Room-by-room plan",
      status: "Defined"
    },
    {
      name: "Protect",
      // doc 27 §9.15.2 amendment 2 (approved 2026-08-18) — replaces "Keep areas are
      // identified. Uncertain and important items are separated and reported."
      detail:
        "Keep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.",
      record: "Keep and review controls",
      status: "Held for review"
    },
    {
      name: "Clear",
      detail:
        "Approved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.",
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
        "Completion photographs, documented exceptions and a Property Handoff Record close the approved scope.",
      record: "Closeout package",
      status: "Issued"
    }
  ],
  sampleRecord: {
    projectId: "HR-1042",
    decisionMaker: "Owner of record",
    clearingScope: "Approved nonhazardous contents",
    cleaningScope: "Kitchen, bath and accessible surfaces",
    excludedConditions: "Attached to signed scope",
    rooms: [
      {
        area: "Entry + living",
        disposition: "Keep",
        note: "Furnishings remain; cleaning included"
      },
      {
        area: "Kitchen",
        disposition: "Keep",
        note: "Cabinet and appliance interiors per scope"
      },
      {
        area: "Primary closet",
        disposition: "Review",
        note: "Contents held for owner decision"
      },
      {
        area: "Garage",
        disposition: "Remove",
        note: "Approved contents cleared; surfaces detailed"
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
        "Whole-property clearing for heavy accumulation, estate, and abandoned-contents conditions — nonhazardous contents, within a signed scope.",
      imageLabel: "Process kit, flat-lay",
      imageStatus: "owned"
    },
    {
      title: "Reset & restoration cleaning",
      detail:
        "Deep reset cleaning after clearing — kitchens, baths, cabinet and appliance interiors, floors and accessible surfaces — for the next handoff.",
      imageLabel: "Clean kitchen or bath detail",
      imageStatus: "atmosphere"
    },
    {
      title: "Animal & organic condition cleaning",
      detail:
        "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination, sterilization, or health-safety determination.",
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
    "Property size and access",
    "Volume of approved contents",
    "Sorting and review required",
    "Cleaning condition",
    "Disposal requirements",
    "Labor and deadline"
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
  ]
} as const;
