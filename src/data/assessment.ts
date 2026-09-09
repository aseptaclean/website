// Rebuilt 2026-09-03 for the short request-assessment form. Service pages already explain the
// service, qualify the customer, and set expectations — this form's only job is: identify the
// person, get a reliable contact method, confirm the ZIP is in the service area, capture the
// general problem and a short description, and collect photos if available. Everything else is
// gathered after submission. See docs/05-DECISIONS-LOG.md 2026-09-03 — this supersedes the
// longer questionnaire in docs/aseptaclean-all-website-copy.md's Request an Assessment section
// for form structure only (fields, labels, order), not that page's own hero copy.
export const assessment = {
  version: "2026-09-03.2",
  // SERVICE CHOICES — display labels and order per docs/03-INTEGRATION-CONTRACT.md "Forms",
  // 2026-09-04: "Display service choices: Hoarding Cleanup; Extreme Cleaning; Detailed Deep
  // Cleaning; Crime Scene & Trauma Cleanup; Rodent Droppings & Animal Waste Cleanup; Not Sure.
  // Map these labels to existing internal enum values."
  //
  // ****  `value` IS THE CRM CONTRACT AND IS FROZEN.  ****
  // `value` is what functions/_lib/lead.ts, HubSpot, and the owner-notification email expect.
  // `label` is what a visitor reads. Renaming a visible option does not authorize breaking the
  // CRM contract — so do not "tidy" `value` to match `label`.
  //
  // ****  ADDING AN OPTION HERE IS A TWO-FILE CHANGE.  ****
  // A new `value` must ALSO be added to `allowedValues.property_situation` in
  // functions/_lib/lead.ts, or the endpoint rejects it 422 "Select a valid option." before
  // Turnstile, storage, HubSpot or either email — the lead is lost and the visitor sees an error
  // on a dropdown they answered correctly.
  //
  // This comment previously asserted that every string below was "byte-identical to what
  // functions/_lib/lead.ts ... already expect". That was false for
  // "Crime scene or trauma cleanup", which the 2026-09-04 display-label change introduced as a
  // genuinely NEW sixth option rather than a relabel of an existing one. It shipped live and
  // broke every crime-scene submission until 2026-09-06. `npm run qa:situations`
  // (scripts/situation-enum-guard.mjs, also wired into `npm run build`) now runs the real
  // validator against this real list, so the two can no longer drift silently.
  //
  // `route` binds an option to the service page that preselects it. Used by the hero form on
  // each service page and by AssessmentForm.astro's `?service=` preselect.
  situations: [
    {
      value: "Hoarding or heavy clutter",
      label: "Hoarding Cleanup",
      route: "/hoarding-cleanup-san-jose/"
    },
    {
      value: "Severe property condition",
      label: "Extreme Cleaning",
      route: "/extreme-cleaning-san-jose/"
    },
    {
      value: "Detailed deep cleaning",
      label: "Detailed Deep Cleaning",
      route: "/deep-cleaning-san-jose/"
    },
    {
      value: "Crime scene or trauma cleanup",
      label: "Crime Scene & Trauma Cleanup",
      route: "/crime-scene-trauma-cleanup-san-jose/"
    },
    {
      value: "Rodent droppings or animal waste",
      label: "Rodent Droppings & Animal Waste Cleanup",
      route: "/rodent-dropping-cleanup-san-jose/"
    },
    { value: "Not sure", label: "Not Sure", route: undefined }
  ],
  upload: {
    acceptedTypes:
      ".jpg,.jpeg,.png,.webp,.heic,.heif,.mp4,.mov,.webm,image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm",
    allowedExtensions: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "heic",
      "heif",
      "mp4",
      "mov",
      "webm"
    ],
    imageExtensions: ["jpg", "jpeg", "png", "webp", "heic", "heif"],
    maxFiles: 10,
    maxImageBytes: 10 * 1024 * 1024,
    maxVideoBytes: 50 * 1024 * 1024,
    maxTotalBytes: 75 * 1024 * 1024,
    visibleLimits:
      "Up to 10 files. Images up to 10 MB each; videos up to 50 MB each; 75 MB combined."
  }
} as const;

// CAMPAIGN-FIXED SITUATION VALUES — accepted by the endpoint, NOT rendered in the visible
// service dropdown.
//
// A PPC landing page covers one service and posts its `property_situation` as a hidden input
// rather than asking a visitor to re-pick a service they already clicked an ad for. When that
// service has no entry in `situations` above — because it is not one of the six choices the
// shared dropdown offers — the value still has to be a member of
// `allowedValues.property_situation` in functions/_lib/lead.ts or the endpoint rejects it 422
// before Turnstile, storage, HubSpot and both emails. That is exactly the failure the
// crime-scene enum incident produced on 2026-09-06.
//
// So campaign-fixed values are declared HERE rather than typed into a page, and
// `scripts/situation-enum-guard.mjs` runs the real validator against this list as well as the
// rendered one. Adding a row is still a two-file change; the guard is what makes forgetting the
// second file a build failure instead of a silent lead loss.
//
// `"Inherited or estate property"` is not a new enum value — it has been in
// `allowedValues.property_situation` since before this campaign, and
// /estate-cleanout-san-jose/'s own comment already names it as the estate mapping. This entry
// promotes it from "tolerated from stale pages" to "actively posted by a live form".
export const campaignSituations = [
  {
    value: "Inherited or estate property",
    label: "Estate Cleanout",
    route: "/estate-cleanout-san-jose/assessment/"
  }
] as const;

// Every value a form on this site may post, rendered or campaign-fixed. Components validate a
// fixed `property_situation` against this set at build time.
export const postableSituationValues: readonly string[] = [
  ...assessment.situations.map((situation) => situation.value),
  ...campaignSituations.map((situation) => situation.value)
];
