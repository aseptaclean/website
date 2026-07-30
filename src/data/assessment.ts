export const assessment = {
  version: "2026-07-30.2",
  steps: [
    {
      number: "01",
      shortLabel: "Property",
      label: "Property fit",
      description: "Location, transition, size, and timing"
    },
    {
      number: "02",
      shortLabel: "Scope",
      label: "Scope and condition",
      description: "Areas, clearing, cleaning, and condition flags"
    },
    {
      number: "03",
      shortLabel: "Authority",
      label: "Authority and contact",
      description: "Decision authority and response details"
    }
  ],
  propertyTypes: [
    "Single-family home",
    "Townhome",
    "Condominium",
    "Apartment or unit",
    "Duplex or multifamily property",
    "Other residential property",
    "Not sure"
  ],
  propertySituations: [
    "Inherited or estate property",
    "Preparing to sell",
    "Landlord turnover",
    "Difficult move-out",
    "Accumulated contents",
    "Overwhelmed property",
    "Already empty but requires detailed cleaning",
    "Move-in whole-home reset",
    "Seasonal or pre-event whole-home reset",
    "Second-home reopening",
    "Establishing a whole-home cleaning baseline",
    "Other"
  ],
  squareFootageRanges: [
    "Under 1,000 sq. ft.",
    "1,000–1,499 sq. ft.",
    "1,500–1,999 sq. ft.",
    "2,000–2,999 sq. ft.",
    "3,000–3,999 sq. ft.",
    "4,000+ sq. ft.",
    "Not sure"
  ],
  areas: [
    "Whole interior",
    "Kitchen",
    "Bathrooms",
    "Bedrooms",
    "Living or common areas",
    "Closets",
    "Garage",
    "Attic",
    "Basement",
    "Shed or storage area",
    "Exterior contents",
    "Other"
  ],
  scopeQuestions: [
    {
      name: "contents_removal",
      label: "Is unwanted contents removal needed?"
    },
    {
      name: "heavy_cleaning",
      label: "Is heavy cleaning needed?"
    },
    {
      name: "garage_storage",
      label: "Is a garage or storage area included?"
    },
    {
      name: "appliance_interiors",
      label: "Should appliance interiors be considered?"
    },
    {
      name: "cabinet_interiors",
      label: "Should cabinet interiors be considered?"
    }
  ],
  conditionQuestions: [
    {
      name: "animal_waste",
      label: "Known animal waste?"
    },
    {
      name: "human_biological_material",
      label: "Known human blood, bodily fluids, or other biological material?",
      stopFlag: true
    },
    {
      name: "needles_sharps",
      label: "Known needles or sharps?",
      stopFlag: true
    },
    {
      name: "sewage",
      label: "Known sewage?",
      stopFlag: true
    },
    {
      name: "mold",
      label: "Known or suspected mold?",
      stopFlag: true
    },
    {
      name: "pest_activity",
      label: "Known pest activity?"
    }
  ],
  relationships: [
    "Property owner",
    "Heir or family representative",
    "Executor or estate representative",
    "Landlord",
    "Property manager",
    "Real estate professional",
    "Other authorized representative"
  ],
  contactMethods: ["Phone call", "Text message", "Email"],
  contactTimes: [
    "Morning — 8 a.m. to noon",
    "Afternoon — noon to 5 p.m.",
    "Evening — after 5 p.m.",
    "No preference"
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
