import { onRequestPost } from "/tmp/aseptaclean-lead-test.mjs";

class MemoryR2 {
  objects = new Map();

  async head(key) {
    return this.objects.has(key) ? {} : null;
  }

  async get(key) {
    const value = this.objects.get(key);
    return value
      ? { json: async () => JSON.parse(new TextDecoder().decode(value.body)) }
      : null;
  }

  async put(key, value, options = {}) {
    const body =
      typeof value === "string"
        ? new TextEncoder().encode(value)
        : new Uint8Array(value);
    this.objects.set(key, { body, options });
  }
}

const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  if (String(url).includes("turnstile")) {
    return Response.json({ success: true });
  }
  throw new Error(`Unexpected provider call: ${url}`);
};

const makeForm = () => {
  const data = new FormData();
  const values = {
    property_city: "San Jose",
    property_type: "Single-family home",
    vacant_status: "yes",
    property_situation: "Preparing to sell",
    desired_completion_date: "2026-09-15",
    approximate_square_footage: "1,500–1,999 sq. ft.",
    contents_removal: "yes",
    heavy_cleaning: "yes",
    garage_storage: "no",
    appliance_interiors: "not_sure",
    cabinet_interiors: "yes",
    animal_waste: "no",
    human_biological_material: "no",
    needles_sharps: "no",
    sewage: "no",
    mold: "no",
    pest_activity: "no",
    must_remain: "Family photographs",
    must_remove: "Unwanted household contents",
    full_name: "Staging Test",
    phone: "4085550100",
    email: "staging@example.test",
    relationship_to_property: "Property owner",
    authority_to_approve: "yes",
    property_address: "Private staging address",
    preferred_contact_method: "Phone call",
    privacy_consent: "yes",
    scope_acknowledgment: "yes",
    submission_timestamp: new Date().toISOString(),
    idempotency_key: "phase3-staging-submission-0001",
    "cf-turnstile-response": "test-token",
    landing_page: "/request-assessment/",
    referrer: "https://example.test/source"
  };
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  data.append("areas_involved[]", "Whole interior");
  data.append(
    "property_media[]",
    new File([new Uint8Array([0xff, 0xd8, 0xff, 0xd9])], "property.jpg", {
      type: "image/jpeg"
    })
  );
  return data;
};

const bucket = new MemoryR2();
const env = {
  LEAD_UPLOADS: bucket,
  TURNSTILE_SECRET_KEY: "test-secret"
};
const requestFor = (body) =>
  new Request("https://staging.aseptaclean.com/api/lead", {
    method: "POST",
    headers: { origin: "https://staging.aseptaclean.com" },
    body
  });

try {
  const response = await onRequestPost({
    request: requestFor(makeForm()),
    env,
    waitUntil() {}
  });
  const payload = await response.json();
  if (response.status !== 201 || payload.ok !== true) {
    throw new Error(`Expected 201 success, received ${response.status}.`);
  }
  const leadKey = `leads/${payload.submissionId}/submission.json`;
  const stored = await bucket.get(leadKey);
  const lead = await stored?.json();
  if (!lead || lead.files.length !== 1) {
    throw new Error("Recoverable lead record or private upload is missing.");
  }
  if (
    lead.delivery.coreStorage.state !== "succeeded" ||
    lead.delivery.uploads.state !== "succeeded" ||
    lead.delivery.hubspot.state !== "skipped" ||
    lead.delivery.customerEmail.state !== "skipped" ||
    lead.delivery.ownerSms.state !== "skipped" ||
    lead.delivery.ownerFallbackEmail.state !== "skipped"
  ) {
    throw new Error("Delivery status ledger is incomplete.");
  }

  const duplicate = await onRequestPost({
    request: requestFor(makeForm()),
    env,
    waitUntil() {}
  });
  const duplicatePayload = await duplicate.json();
  if (!duplicatePayload.ok || !duplicatePayload.duplicate) {
    throw new Error("Idempotent duplicate handling failed.");
  }

  const invalid = makeForm();
  invalid.delete("property_city");
  const invalidResponse = await onRequestPost({
    request: requestFor(invalid),
    env,
    waitUntil() {}
  });
  if (invalidResponse.status !== 422) {
    throw new Error("Required-field server validation failed.");
  }

  const invalidUpload = makeForm();
  invalidUpload.set("idempotency_key", "phase3-invalid-upload-0001");
  invalidUpload.delete("property_media[]");
  invalidUpload.append(
    "property_media[]",
    new File(["not an image"], "property.txt", { type: "text/plain" })
  );
  const invalidUploadResponse = await onRequestPost({
    request: requestFor(invalidUpload),
    env,
    waitUntil() {}
  });
  if (invalidUploadResponse.status !== 422) {
    throw new Error("Server file-type validation failed.");
  }

  console.log(`PASS staging adapter submission: ${payload.submissionId}`);
  console.log("PASS recoverable R2 core record before provider delivery");
  console.log("PASS private upload storage and delivery status ledger");
  console.log("PASS duplicate submission response");
  console.log("PASS required-field server validation");
  console.log("PASS server file-type validation");
} finally {
  globalThis.fetch = originalFetch;
}
