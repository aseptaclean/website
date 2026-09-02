// Rebuilt 2026-09-02 for the lean request-assessment form. The service pages already explain
// the service, qualify the customer, and set expectations — this form's only job is to collect
// enough to start a conversation. See docs/30-WEBSITE-MASTER-SPEC.md §25 and AGENTS.md §2 for
// which services are active (rodent-droppings and animal-waste are noindex but NOT operationally
// gated — their situations stay in this list).
export const assessment = {
  version: "2026-09-02.1",
  // Shown only to a direct visitor with no `?service=` context. Keys line up with
  // AssessmentForm.astro's serviceContexts map so a direct-visitor answer and a service-page
  // referral land on the same `property_situation` value server-side.
  situations: [
    { value: "Accumulated contents", label: "Too much stuff / packed property" },
    { value: "Inherited or estate property", label: "Estate or property cleanout" },
    { value: "Already empty but requires detailed cleaning", label: "Detailed deep cleaning" },
    { value: "Difficult move-out", label: "Move-out cleaning" },
    { value: "Overwhelmed property", label: "Property is past normal cleaning" },
    { value: "Rodent droppings", label: "Rodent droppings" },
    { value: "Animal waste", label: "Animal waste" },
    { value: "Other", label: "Something else / not sure" }
  ],
  // At most one extra qualifying question per service, per the assessment rebuild rule. Keyed
  // by the same `?service=` value AssessmentForm.astro already recognizes. Detailed deep
  // cleaning has none — current workflow does not need one.
  serviceQuestions: {
    "hoarding-cleanup": {
      name: "belongings_must_be_kept",
      label: "Are there belongings that must be kept?",
      options: ["Yes", "No", "Not sure"]
    },
    "move-out": {
      name: "desired_completion_date",
      label: "When does the property need to be ready?",
      type: "date"
    },
    "rodent-droppings": {
      name: "pest_control_involved",
      label: "Has pest control already been involved?",
      options: ["Yes", "No", "Scheduled", "Not sure"]
    },
    "animal-waste": {
      name: "animal_waste_pattern",
      label: "Is this a one-time accident or a repeated condition?",
      options: ["One-time", "Repeated", "Not sure"]
    },
    "extreme-cleanup": {
      name: "belongings_block_access",
      label: "Are belongings blocking access to the areas that need cleaning?",
      options: ["Yes", "No", "Some areas", "Not sure"]
    },
    "estate-cleanout": {
      name: "items_must_be_saved",
      label: "Are there specific items or documents that must be saved?",
      options: ["Yes", "No", "Not sure"]
    },
    "property-cleanouts": {
      name: "items_must_remain",
      label: "Does anything need to stay at the property?",
      options: ["Yes", "No", "Not sure"]
    }
  },
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
