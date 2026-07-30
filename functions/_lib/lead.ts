export interface R2ObjectBody {
  json<T>(): Promise<T>;
}

export interface R2Bucket {
  head(key: string): Promise<unknown | null>;
  get(key: string): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value: string | ArrayBuffer | ReadableStream,
    options?: {
      httpMetadata?: { contentType?: string };
      customMetadata?: Record<string, string>;
    }
  ): Promise<unknown>;
}

export interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number }
  ): Promise<void>;
}

export interface LeadEnvironment {
  LEAD_UPLOADS: R2Bucket;
  LEAD_RATE_LIMIT?: KVNamespace;
  TURNSTILE_SECRET_KEY: string;
  HUBSPOT_ACCESS_TOKEN?: string;
  HUBSPOT_PIPELINE_ID?: string;
  HUBSPOT_DEAL_STAGE_ID?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM_ADDRESS?: string;
  OWNER_ALERT_EMAIL?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM_NUMBER?: string;
  LEAD_ALERT_PHONE?: string;
  ALLOWED_ORIGINS?: string;
}

export type DeliveryState = "pending" | "succeeded" | "failed" | "skipped";

export interface DeliveryStep {
  state: DeliveryState;
  at: string;
  detail?: string;
}

export interface LeadRecord {
  id: string;
  receivedAt: string;
  callbackWindow: "business-hours" | "next-business-window";
  data: Record<string, string | string[]>;
  files: Array<{
    key: string;
    originalName: string;
    contentType: string;
    size: number;
  }>;
  delivery: Record<string, DeliveryStep>;
}

export interface ValidationResult {
  data: Record<string, string | string[]>;
  files: File[];
  errors: Record<string, string>;
}

const requiredFields = [
  "property_city",
  "property_type",
  "vacant_status",
  "property_situation",
  "desired_completion_date",
  "approximate_square_footage",
  "contents_removal",
  "heavy_cleaning",
  "garage_storage",
  "appliance_interiors",
  "cabinet_interiors",
  "animal_waste",
  "human_biological_material",
  "needles_sharps",
  "sewage",
  "mold",
  "pest_activity",
  "must_remain",
  "must_remove",
  "full_name",
  "phone",
  "email",
  "relationship_to_property",
  "authority_to_approve",
  "property_address",
  "preferred_contact_method",
  "privacy_consent",
  "scope_acknowledgment",
  "submission_timestamp",
  "idempotency_key"
] as const;

const allowedScalarFields = new Set([
  ...requiredFields,
  "form_version",
  "submitted_from",
  "access_notes",
  "best_contact_time",
  "additional_notes",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "landing_page",
  "referrer",
  "cf-turnstile-response"
]);

const allowedExtensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "heif",
  "mp4",
  "mov",
  "webm"
]);
const imageExtensions = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);
const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/quicktime",
  "video/webm"
]);
const yesNoUnsure = new Set(["yes", "no", "not_sure"]);
const allowedValues: Record<string, Set<string>> = {
  property_type: new Set([
    "Single-family home",
    "Townhome",
    "Condominium",
    "Apartment or unit",
    "Duplex or multifamily property",
    "Other residential property",
    "Not sure"
  ]),
  property_situation: new Set([
    "Inherited or estate property",
    "Preparing to sell",
    "Landlord turnover",
    "Difficult move-out",
    "Accumulated contents",
    "Overwhelmed property",
    "Already empty but requires detailed cleaning",
    "Other"
  ]),
  approximate_square_footage: new Set([
    "Under 1,000 sq. ft.",
    "1,000–1,499 sq. ft.",
    "1,500–1,999 sq. ft.",
    "2,000–2,999 sq. ft.",
    "3,000–3,999 sq. ft.",
    "4,000+ sq. ft.",
    "Not sure"
  ]),
  relationship_to_property: new Set([
    "Property owner",
    "Heir or family representative",
    "Executor or estate representative",
    "Landlord",
    "Property manager",
    "Real estate professional",
    "Other authorized representative"
  ]),
  preferred_contact_method: new Set(["Phone call", "Text message", "Email"]),
  authority_to_approve: new Set(["yes", "no"]),
  privacy_consent: new Set(["yes"]),
  scope_acknowledgment: new Set(["yes"]),
  vacant_status: yesNoUnsure,
  contents_removal: yesNoUnsure,
  heavy_cleaning: yesNoUnsure,
  garage_storage: yesNoUnsure,
  appliance_interiors: yesNoUnsure,
  cabinet_interiors: yesNoUnsure,
  animal_waste: yesNoUnsure,
  human_biological_material: yesNoUnsure,
  needles_sharps: yesNoUnsure,
  sewage: yesNoUnsure,
  mold: yesNoUnsure,
  pest_activity: yesNoUnsure
};
const allowedAreas = new Set([
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
]);

const clean = (value: string, max = 4000) =>
  value.replace(/\u0000/g, "").trim().slice(0, max);

export function validateLead(formData: FormData): ValidationResult {
  const data: Record<string, string | string[]> = {};
  const errors: Record<string, string> = {};

  for (const field of allowedScalarFields) {
    const value = formData.get(field);
    if (typeof value === "string") data[field] = clean(value);
  }
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && clean(honeypot)) {
    errors.form = "Submission rejected.";
  }

  data["areas_involved[]"] = formData
    .getAll("areas_involved[]")
    .filter((value): value is string => typeof value === "string")
    .map((value) => clean(value, 120))
    .filter(Boolean);

  for (const field of requiredFields) {
    if (!data[field] || (Array.isArray(data[field]) && !data[field].length)) {
      errors[field] = "This field is required.";
    }
  }
  for (const [field, choices] of Object.entries(allowedValues)) {
    const submitted = data[field];
    if (typeof submitted === "string" && submitted && !choices.has(submitted)) {
      errors[field] = "Select a valid option.";
    }
  }
  if (!(data["areas_involved[]"] as string[]).length) {
    errors["areas_involved[]"] = "Select at least one area.";
  } else if (
    (data["areas_involved[]"] as string[]).some((area) => !allowedAreas.has(area))
  ) {
    errors["areas_involved[]"] = "Select valid property areas.";
  }
  if (
    typeof data.email === "string" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Enter a valid email address.";
  }
  if (
    typeof data.phone === "string" &&
    data.phone.replace(/\D/g, "").length < 10
  ) {
    errors.phone = "Enter a valid phone number.";
  }
  if (data.privacy_consent !== "yes") {
    errors.privacy_consent = "Consent is required.";
  }
  if (data.scope_acknowledgment !== "yes") {
    errors.scope_acknowledgment = "Acknowledgment is required.";
  }
  if (
    typeof data.idempotency_key === "string" &&
    !/^[a-zA-Z0-9-]{8,100}$/.test(data.idempotency_key)
  ) {
    errors.idempotency_key = "The submission key is invalid.";
  }
  if (
    typeof data.desired_completion_date === "string" &&
    !/^\d{4}-\d{2}-\d{2}$/.test(data.desired_completion_date)
  ) {
    errors.desired_completion_date = "Enter a valid completion date.";
  }
  if (
    typeof data.submission_timestamp === "string" &&
    Number.isNaN(Date.parse(data.submission_timestamp))
  ) {
    errors.submission_timestamp = "The submission timestamp is invalid.";
  }
  const files = formData
    .getAll("property_media[]")
    .filter((value): value is File => value instanceof File && value.size > 0);
  if (files.length > 10) errors["property_media[]"] = "Upload no more than 10 files.";

  let totalBytes = 0;
  for (const file of files) {
    totalBytes += file.size;
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const perFileLimit = imageExtensions.has(extension)
      ? 10 * 1024 * 1024
      : 50 * 1024 * 1024;
    if (
      !allowedExtensions.has(extension) ||
      !allowedMimeTypes.has(file.type.toLowerCase())
    ) {
      errors["property_media[]"] = "One or more files has an unsupported type.";
    } else if (file.size > perFileLimit) {
      errors["property_media[]"] = "One or more files exceeds its size limit.";
    }
  }
  if (totalBytes > 75 * 1024 * 1024) {
    errors["property_media[]"] = "The combined upload exceeds 75 MB.";
  }

  return { data, files, errors };
}

export function callbackWindow(
  date = new Date()
): LeadRecord["callbackWindow"] {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    hour12: false
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const openDay = weekday !== "Sun";
  return openDay && hour >= 7 && hour < 19
    ? "business-hours"
    : "next-business-window";
}

export async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function safeFileName(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() ?? "bin";
  return `property-file.${extension.replace(/[^a-z0-9]/g, "") || "bin"}`;
}

export function json(
  payload: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = {}
) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...headers
    }
  });
}
