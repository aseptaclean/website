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
