const env = import.meta.env;

const value = (key: keyof ImportMetaEnv, fallback = "") =>
  env[key]?.trim() || fallback;

// The single service-area string. Bound to two property names below (`serviceArea` for prose
// and schema, `regionLabel` for the credential bar and status ribbon) so existing consumers keep
// working, but there is exactly one literal — see the note on `location` for why.
const serviceAreaLabel = value("PUBLIC_SERVICE_AREA", "South Bay & Peninsula");

const rawPhone = value("PUBLIC_PHONE", "(408) 785-7588");

// E.164, 2026-09-04. This stripped punctuation only, so "(408) 785-7588" produced
// `tel:4087857588` — no country code. The owner instruction, AGENTS.md §3,
// docs/02-CURRENT-FACTS.md and docs/03-INTEGRATION-CONTRACT.md all specify `tel:+14087857588`.
// A bare 10-digit tel: URI is ambiguous outside the NANP and some handlers reject it.
//
// A leading `+` in the source value is preserved as-is; a bare 10-digit US number gains `+1`;
// an 11-digit number starting with 1 gains `+`. Anything else passes through digits-only rather
// than guessing a country code. `phone` (the DISPLAY string) is untouched.
const toE164 = (input: string) => {
  const trimmed = input.trim();
  if (trimmed.startsWith("+")) return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
};

const phoneE164 = rawPhone ? toE164(rawPhone) : "";
const phoneUri = phoneE164 ? `tel:${phoneE164}` : "";
const smsUri = phoneE164 ? `sms:${phoneE164}` : "";

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
    // Machine-readable form of `hours` above, for schema.org `openingHours`. Same owner fact
    // (AGENTS.md §3 "Mon–Sat 7:00 AM – 7:00 PM PT, closed Sunday"), expressed in the compact
    // format the property requires — the prose string is not a valid `openingHours` value.
    // Kept here rather than built in SeoHead because AGENTS.md §3 forbids hardcoding any
    // business fact in a component. Change both together or they drift.
    hoursSchema: "Mo-Sa 07:00-19:00",
    // No fallback. AGENTS.md §3 / doc 21 §2.5: no current COI is verified in this repository,
    // so this trust statement stays release-gated — suppressed, not defaulted to the recorded
    // wording — until the owner or broker verifies it against current documentation.
    insuranceStatus: value("PUBLIC_INSURANCE_STATUS"),
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
    // 2026-08-21 positioning pass. Was "Whole-property clearing, deep cleaning, and documented
    // closeout", which described the clearing lane as if it were the whole business and put the
    // closeout document on the same footing as the work. The umbrella of record is specialty
    // property cleaning and complex cleanup — see docs/city-pages-part2-UPDATED.md, whose three
    // owner-approved city hubs are titled "Property Cleaning & Complex Cleanup in {city}".
    // This field has no consumer in src/ today; corrected anyway so it cannot seed the old
    // framing if one is added.
    category: "Specialty property cleaning and complex property cleanup",
    utilityLabel: "Specialty Property Cleaning + Complex Cleanup",
    leadOffer: "Property Handoff Plan",
    responseTime: value(
      "PUBLIC_RESPONSE_TIME",
      "within one business day"
    ),
    assessmentFee: Number(value("PUBLIC_ASSESSMENT_FEE", "195")),
    assessmentFeeTerms: "Credited toward an approved project booked within 7 days.",
    // CTA SYSTEM — owner decision 2026-09-04 (AGENTS.md §2.2.2/§2.2.3,
    // docs/03-INTEGRATION-CONTRACT.md "Call actions" and "Forms", docs/20-COPY-MAP.md).
    // Four distinct roles. They must stay separate: `formSubmitCta` labels a real
    // <button type="submit"> and must never become a telephone link; `primaryCta` is a
    // telephone link and must never label a submit control.
    //
    //   primaryCta    the marketing action  → site.business.phoneUri   "Call Aseptaclean"
    //   secondaryCta  the message action    → local form, else /contact/#contact-form
    //   formSubmitCta the form control      → submits the form         "Send Message"
    //   formHeading   the form's own title  → source wording
    //
    // `secondaryCta` changed 2026-09-04 from "Request an Assessment" → "Send a Message".
    // `/request-assessment/` was retired outright 2026-09-06 (owner decision) — see
    // docs/05-CURRENT-DECISIONS.md. The word "assessment" still appears in explanatory prose
    // about how work is scoped — do not globally replace it.
    primaryCta: "Call Aseptaclean",
    secondaryCta: "Send a Message",
    formSubmitCta: "Send Message",
    // Form title and supporting line, both source wording from the main copy's
    // "Request an Assessment" block (docs/03-INTEGRATION-CONTRACT.md "Forms").
    formHeading: "Tell us about the property.",
    formLede: "You do not need to know exactly what service you need.",
    // Where a "Send a Message" action goes when the page has no form of its own.
    contactFormUrl: "/contact/#contact-form",
    // The tertiary text/photo action, kept under its own name. Before 2026-09-04 this string
    // lived in `secondaryCta` and was rendered on `sms:` links across ~20 routes; when the CTA
    // ruling repointed `secondaryCta` at /request-assessment/, every one of those call sites
    // would have labelled an SMS link "Request an Assessment". Splitting the field keeps each
    // action's label attached to the action it actually performs.
    smsCta: "Text a photo",
    // Doc 27 §7 — the assessment-fee framing, owner-approved verbatim 2026-08-20 with the
    // ruling "photo review is free; the $195 applies only when an on-site walkthrough is
    // required". Ships as ONE paragraph at every fee surface, replacing four different
    // in-component wordings of the same fact.
    //
    // The ruling is not new. docs/05-DECISIONS-LOG.md, row 3 of the migrated `07` §3 table,
    // already records "Photo review free; on-site $195, credited within 7 days" as ADOPTED,
    // with the phrases "free assessment" / "free consultation" purged. §7 states that same
    // fact and reaches for neither banned phrase, so AGENTS.md §7's prohibition is intact and
    // this is not a new claim — it is the adopted one, finally written down on the page.
    //
    // A function, not a literal, so the figure interpolates from `assessmentFee` above:
    // AGENTS.md §3 makes the number a business fact that must never be retyped in a component.
    // The words around it are owner-approved copy and must not be re-worded at a call site.
    assessmentFraming: (fee: number) =>
      "Photos are often enough to start, and reviewing them costs nothing. When a property " +
      `needs an on-site walkthrough, the assessment is $${fee} — and you keep what it ` +
      "produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. " +
      "It's yours whether or not you hire us."
    // remediationLaunchLabel removed — docs/18-VISUAL-DIRECTION.md §7: environmental/human
    // biohazard remediation does not appear on the live site at all (not even a "coming soon"
    // tag) until the credential is held. See docs/05-DECISIONS-LOG.md.
  },
  residenceOffer: {
    name: "Private Residence Reset",
    category: "Structured whole-home deep reset",
    primaryCta: "Request a Private Residence Assessment",
    // /request-assessment/ (this offer's original destination) was retired 2026-09-06. This
    // page has no embedded form of its own, so the fallback rule applies: link to Contact.
    // The offer_type=private_residence_reset backend branch in functions/_lib/lead.ts is
    // unaffected but currently unreachable from any UI entry point — see
    // docs/05-CURRENT-DECISIONS.md, 2026-09-06.
    assessmentUrl: "/contact/#contact-form"
  },
  location: {
    // ONE service-area string, sitewide — owner ruling 2026-08-20 (B2). This is the NAP wording
    // of record and must match GBP and Yelp character for character: "South Bay & Peninsula",
    // ampersand, never "and". `regionLabel` is bound to the same value below rather than being a
    // second literal, so the two names cannot drift apart the way `serviceArea` and `county` did.
    //
    // `county` is DELETED, not renamed. It defaulted to "Santa Clara County" — a claim the
    // 10-city footprint contradicts, because Atherton is in San Mateo County. It had zero
    // consumers in src/ when it was removed, so nothing rendered it; the value survived only in
    // docs/18-VISUAL-DIRECTION.md §7's credential-bar description, which is struck in the same
    // pass. `PUBLIC_SERVICE_COUNTY` is removed from .env.example and src/env.d.ts with it.
    serviceArea: serviceAreaLabel,
    regionLabel: serviceAreaLabel,
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
    ],
    // Service-area centroid for schema.org `geo`, per docs/19-SYSTEM-AND-SITEMAP.md §2.2
    // ("geo San Jose"). This is the coordinate of the city named in the service area — it is
    // NOT an office, and the LocalBusiness node deliberately carries no `address` alongside it
    // (AGENTS.md §3: "service-area business — no published street address, ever", and "never
    // infer a physical office from service-area coverage").
    geo: { latitude: 37.3382, longitude: -121.8863 }
  },
  urls: {
    site: value("PUBLIC_SITE_URL", "https://aseptaclean.com"),
    // Canonical homepage URL, WITH the trailing slash. `site` above is an origin and has none,
    // so every BreadcrumbList that used it for the "Home" item advertised
    // `https://aseptaclean.com` while the homepage canonical said `https://aseptaclean.com/` —
    // two URLs for one page, on 28 routes. Use this for the Home crumb, never `site`.
    home: new URL("/", value("PUBLIC_SITE_URL", "https://aseptaclean.com")).href,
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
      blurb: "Cleaning for properties that need a walkthrough first.",
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
  // LABEL CHANGED 2026-08-21, ROUTE UNCHANGED. The customer-facing category was "Property
  // Clearing"; it is now "Complex Property Cleanup". `/property-clearing/` and every link,
  // redirect and canonical pointing at it are untouched — this is a copy change, not a route
  // change. Reason: "clearing" names one step of the work and reads as hauling to a buyer, while
  // the three owner-approved city hubs in docs/city-pages-part2-UPDATED.md are all titled
  // "Property Cleaning & Complex Cleanup", making "complex cleanup" the umbrella of record.
  // Property clearing survives as a CONCEPT throughout the body copy and in the verbatim scope
  // disclaimer below — only the category label moved.
  {
    label: "Complex Property Cleanup",
    hub: {
      label: "Complex Property Cleanup",
      href: "/property-clearing/",
      blurb: "When the contents have to come out before anything else can happen.",
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
        // Was "Approved, lawful disposal", which reads as a disposal service we perform.
        note: "Bagged, staged, loaded; container coordinated",
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
      // "About" → /about/ REMOVED 2026-08-26, for the same reason and under the same rule as
      // "Request an assessment" below: docs/30-WEBSITE-MASTER-SPEC.md §10 forbids a "repeated
      // primary destination under multiple labels" in the footer. This group's `hub` is already
      // /about/, and Footer.astro renders the hub as "About Aseptaclean hub" immediately above
      // its children — so /about/ shipped twice, a line apart, under two different names, on all
      // 45 routes. The hub link is the one that survives because it is the labelled head of the
      // column; the child was the second spelling of it.
      //
      // The ROUTE IS NOT ORPHANED. /about/ keeps the footer hub link, the header "About" nav
      // item, and its inbound links from the homepage evidence section's sibling routes.
      //
      // Added 2026-08-20, owner ruling. Both pages ship indexable and in sitemap.xml but had
      // ZERO inbound links anywhere in the build — reachable by a crawler through the sitemap
      // and by a visitor not at all.
      //
      // How they were orphaned: Chunk 3 of the IA expansion (2026-08-11) added them to the
      // `navigation` array above, and the 2026-08-18 visual port repointed Header and Footer to
      // `megaNav`. Nothing removed the links; the array holding them stopped being read.
      // `navigation` is now a dead export with no consumer — left in place, flagged, not
      // deleted in this commit because that is cleanup, not the ruling.
      //
      // megaNav feeds BOTH the footer columns and the header mega-panel, so these also appear in
      // the header Company dropdown. That is a consequence of the shared structure, not a second
      // decision — and it is the behaviour site.ts:168 already established when nav and footer
      // were deliberately brought into agreement.
      {
        label: "Services",
        href: "/services/",
        note: "Everything we handle",
        icon: "layers"
      },
      {
        label: "Who We Help",
        href: "/who-we-help/",
        note: "Executors, agents, managers",
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
      }
      // "Request an assessment" → /request-assessment/ REMOVED 2026-08-25.
      // docs/ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md §17: "Do not list the
      // assessment route twice under different names." megaNav feeds BOTH the footer link grid
      // and the header Company dropdown, so this one entry produced the duplicate in both places
      // on all 45 routes — in the footer beside the utility row's "Tell Us About the Property",
      // and in the header directly beneath the navy CTA button pointing at the same href.
      //
      // The ROUTE IS NOT ORPHANED and this is not a nav-reduction ruling. /request-assessment/
      // remains the primary conversion destination and is linked from the header CTA, the hero,
      // the closing CTA, the footer utility row, the mobile bar and every service page.
      // site.offer.primaryCta ("Tell Us About the Property") is the single owner-approved visible
      // label for it as of the 2026-08-25 ruling; "Request an assessment" was the older spelling
      // that survived here after the button was renamed.
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
      // 2026-08-21. Was "Approved unwanted contents are consolidated, staged or coordinated for
      // lawful disposal within the signed scope." — accurate but vague about who does what, and
      // "coordinated for lawful disposal" is the kind of phrasing doc 21 §4.3 warns reads as
      // self-performed. This names the on-site work Aseptaclean actually does and puts the
      // container next to it as coordination.
      detail:
        "Approved contents are sorted, bagged, and cleared out of the rooms in the scope. When the job needs a container, we arrange it with the provider the city authorizes.",
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
  //
  // 2026-08-21 positioning pass. Still three cards, still the same three imagery slots, and the
  // animal card is unchanged including its verbatim-mandatory §2.3 clause. What changed is the
  // FRAMING: card 1 was "Complex property clearing" and led the row, which read the business as
  // a cleanout company with cleaning attached. Detailed cleaning now leads and the clearing lane
  // is named "Complex property cleanup" to match the umbrella. The image label and status travel
  // with their own card — the flat-lay was always the clearing card's slot, the kitchen detail
  // the cleaning card's.
  serviceCards: [
    {
      title: "Detailed cleaning",
      detail:
        "Deep cleaning, move-out and move-in turnovers, and post-construction work. Kitchens, baths, cabinet and appliance interiors, floors, and the edges most cleaners skip.",
      imageLabel: "Clean kitchen or bath detail",
      imageStatus: "atmosphere"
    },
    {
      title: "Complex property cleanup",
      detail:
        "Hoarding conditions, estate contents, and whole-property cleanouts. We sort, bag, stage, and clear what you approve, and coordinate the container and disposal route when one is needed.",
      imageLabel: "Process kit, flat-lay",
      imageStatus: "owned"
    },
    {
      title: "Animal & organic condition cleaning",
      detail:
        "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination, sterilization, or health-safety determination.",
      imageLabel: "Completed job photo",
      imageStatus: "owned"
    }
  ],
  // Doc 27 §1 routing block — "Start where you are". Owner-approved verbatim 2026-08-20.
  //
  // Six doors in the buyer's own words, one per segment. This is the §0.1 principle ("name
  // their situation before naming your service") applied to `/`, whose job §1 defines as
  // ROUTING, not selling — which is why it sits above the service tiles and carries no claim
  // of its own. Every string here is doc 27 §1's table verbatim; nothing was written for it.
  //
  // `slug` is a route, not a link. Whether a door RENDERS as a link is decided at the call
  // site by reading each page's own `indexable` flag out of doc27ServicePages.ts — the same
  // mechanism ServiceCards.astro already uses. That is deliberate: it makes an
  // indexable→noindex crawl path (register P2 / release-checklist C10) impossible to create by
  // editing this file, and it means each door starts linking on its own the day its route's
  // gate clears, with no copy change.
  //
  // The commercial door is the live case. /commercial-cleaning-san-jose/ ships `indexable:
  // false`, so it fails the filter and does not render. Reported to the owner 2026-08-20
  // rather than linked. See docs/05-DECISIONS-LOG.md.
  routingDoors: [
    {
      label: "I'm settling an estate",
      detail: "A parent or relative has died and the property has to be dealt with.",
      slug: "/estate-cleanout-san-jose/"
    },
    {
      label: "A family member is hoarding",
      detail: "Someone I love needs help and this has to be handled carefully.",
      slug: "/hoarding-cleanup-san-jose/"
    },
    {
      label: "I manage or own rental property",
      detail: "A unit needs to turn over, or a tenant left belongings behind.",
      slug: "/property-cleanouts-san-jose/"
    },
    {
      label: "I'm listing a property",
      detail: "It has to be photo-ready by a date I can't move.",
      slug: "/move-out-cleaning-san-jose/"
    },
    {
      label: "My home needs a real reset",
      detail: "I want a deep clean where someone actually names what's included.",
      slug: "/deep-cleaning-san-jose/"
    },
    {
      label: "I manage a commercial space",
      detail: "A project or turnover that needs a defined scope.",
      slug: "/commercial-cleaning-san-jose/"
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
  // 2026-08-21. The included list was ordered clearing-first and named cleaning as four lines at
  // the bottom, which understated the larger half of the business. Reordered so the cleaning work
  // reads first, and split the old single "Nonhazardous contents clearing" line into the steps
  // Aseptaclean actually performs on site — sorting, bagging, staging, clearing, and loading an
  // approved container — because "clearing" alone is what left readers assuming a truck.
  includedScope: [
    "Kitchen and bathroom deep cleaning",
    "Cabinet and appliance interiors when included",
    "Floors, baseboards, doors, and accessible surfaces",
    "Move-out, move-in, and post-construction detail work",
    "Sorting, bagging, and staging of approved contents",
    "Clearing approved contents out of rooms, garages, and storage areas",
    "Light non-structural disassembly",
    "Loading an approved container when that is part of the job",
    "Container placement and disposal coordination",
    "Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement",
    "Completion photographs and remote closeout"
  ],
  // The off-site transport line is new (2026-08-21) and is the plainest statement of the
  // operating boundary in docs/21-CLAIMS-AND-COMPLIANCE-LAW.md §4.1 anywhere on `/`. It belongs
  // in the exclusion column rather than in a disclaimer bar: a reader comparing us to a junk
  // hauler is reading this list, and that is where the difference matters.
  excludedScope: [
    "Hauling debris off the property — an authorized provider does that",
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
