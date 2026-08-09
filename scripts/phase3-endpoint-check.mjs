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
    offer_type: "handoff_reset",
    entry_route: "/",
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

const makeResidenceForm = () => {
  const data = makeForm();
  data.set("offer_type", "private_residence_reset");
  data.set("entry_route", "/private-residence-reset/");
  data.set("idempotency_key", "phase4-residence-submission-0001");
  data.set("property_situation", "Establishing a whole-home cleaning baseline");
  data.set("property_zip", "95113");
  data.set("number_of_levels", "2");
  data.set("occupancy_status", "Occupied");
  data.set("priority_rooms", "Kitchen, primary suite, and living areas");
  data.set("detail_priorities", "Cabinet faces, high dusting, trim, and interior windows");
  data.set("important_finishes", "Natural stone and oiled wood");
  data.set("pets", "Interior cat");
  data.set("someone_present", "Part of the time");
  data.set("investment_range", "$3,500–$5,999");
  data.set("safety_routing", "no_known_condition");
  for (const field of [
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
    "areas_involved[]"
  ]) {
    data.delete(field);
  }
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

  const residenceResponse = await onRequestPost({
    request: requestFor(makeResidenceForm()),
    env,
    waitUntil() {}
  });
  const residencePayload = await residenceResponse.json();
  if (residenceResponse.status !== 201 || residencePayload.ok !== true) {
    throw new Error(
      `Residence variant expected 201 success, received ${residenceResponse.status}.`
    );
  }
  const residenceStored = await bucket.get(
    `leads/${residencePayload.submissionId}/submission.json`
  );
  const residenceLead = await residenceStored?.json();
  if (
    residenceLead?.data.offer_type !== "private_residence_reset" ||
    residenceLead?.data.priority_rooms !==
      "Kitchen, primary suite, and living areas"
  ) {
    throw new Error("Residence offer mapping was not stored correctly.");
  }

  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("turnstile")) {
      return Response.json({ success: true });
    }
    if (target.includes("api.resend.com")) {
      return Response.json({ id: "email-test-id" });
    }
    if (target.includes("api.twilio.com")) {
      return new Response("simulated SMS provider failure", { status: 502 });
    }
    throw new Error(`Unexpected provider call: ${url}`);
  };
  const providerFailureForm = makeForm();
  providerFailureForm.set(
    "idempotency_key",
    "phase4-provider-failure-submission-0001"
  );
  const providerFailureResponse = await onRequestPost({
    request: requestFor(providerFailureForm),
    env: {
      ...env,
      RESEND_API_KEY: "test-resend-key",
      EMAIL_FROM_ADDRESS: "test@example.test",
      OWNER_ALERT_EMAIL: "owner@example.test",
      SMS_ALERTS_ENABLED: "true",
      TWILIO_ACCOUNT_SID: "test-account",
      TWILIO_AUTH_TOKEN: "test-token",
      TWILIO_FROM_NUMBER: "+14085550101",
      LEAD_ALERT_PHONE: "+14085550102"
    },
    waitUntil() {}
  });
  const providerFailurePayload = await providerFailureResponse.json();
  const providerFailureStored = await bucket.get(
    `leads/${providerFailurePayload.submissionId}/submission.json`
  );
  const providerFailureLead = await providerFailureStored?.json();
  if (
    providerFailureResponse.status !== 201 ||
    providerFailureLead?.delivery.customerEmail.state !== "succeeded" ||
    providerFailureLead?.delivery.ownerSms.state !== "failed" ||
    providerFailureLead?.delivery.ownerFallbackEmail.state !== "succeeded"
  ) {
    throw new Error("SMS failure did not preserve success and trigger fallback email.");
  }

  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.includes("turnstile")) {
      return Response.json({ success: true });
    }
    if (target.includes("api.resend.com")) {
      return Response.json({ id: "email-test-id" });
    }
    throw new Error(`Unexpected provider call (Twilio must not be reached when disabled): ${url}`);
  };
  const smsDisabledForm = makeForm();
  smsDisabledForm.set("idempotency_key", "phase4-sms-disabled-submission-0001");
  const smsDisabledResponse = await onRequestPost({
    request: requestFor(smsDisabledForm),
    env: {
      ...env,
      RESEND_API_KEY: "test-resend-key",
      EMAIL_FROM_ADDRESS: "test@example.test",
      OWNER_ALERT_EMAIL: "owner@example.test",
      // SMS_ALERTS_ENABLED intentionally omitted — today's real deployment default
      // pending Twilio 10DLC approval. Twilio credentials present but must be ignored.
      TWILIO_ACCOUNT_SID: "test-account",
      TWILIO_AUTH_TOKEN: "test-token",
      TWILIO_FROM_NUMBER: "+14085550101",
      LEAD_ALERT_PHONE: "+14085550102"
    },
    waitUntil() {}
  });
  const smsDisabledPayload = await smsDisabledResponse.json();
  const smsDisabledStored = await bucket.get(
    `leads/${smsDisabledPayload.submissionId}/submission.json`
  );
  const smsDisabledLead = await smsDisabledStored?.json();
  if (
    smsDisabledResponse.status !== 201 ||
    smsDisabledLead?.delivery.customerEmail.state !== "succeeded" ||
    smsDisabledLead?.delivery.ownerSms.state !== "skipped" ||
    smsDisabledLead?.delivery.ownerFallbackEmail.state !== "succeeded"
  ) {
    throw new Error(
      "SMS_ALERTS_ENABLED=false/unset did not skip Twilio and fall back to owner email."
    );
  }

  console.log(`PASS staging adapter submission: ${payload.submissionId}`);
  console.log("PASS recoverable R2 core record before provider delivery");
  console.log("PASS private upload storage and delivery status ledger");
  console.log("PASS duplicate submission response");
  console.log("PASS required-field server validation");
  console.log("PASS server file-type validation");
  console.log("PASS Private Residence Reset schema and offer mapping");
  console.log("PASS simulated SMS provider failure and owner fallback email");
  console.log("PASS SMS_ALERTS_ENABLED=false/unset skips Twilio and uses owner fallback email");
} finally {
  globalThis.fetch = originalFetch;
}
