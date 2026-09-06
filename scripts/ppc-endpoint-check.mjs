// PPC HOARDING FORM → LEAD ENDPOINT, verified through the project's AUTHORIZED test path.
//
// Same harness contract as scripts/phase3-endpoint-check.mjs: the real functions/api/lead.ts is
// bundled by esbuild and executed against an in-memory R2, with Turnstile verification and every
// outbound provider call stubbed. NO live notification is sent — HubSpot, Resend and Twilio are
// either unconfigured (so the endpoint skips them) or answered by a local stub. Nothing here
// touches a production bucket, inbox, phone or CRM.
//
// What it proves about the PPC form specifically:
//   1. The exact payload PpcHeroForm.astro posts is ACCEPTED, with no photos.
//   2. The same payload with photos is accepted and the files are stored.
//   3. The fixed hidden service value "Hoarding or heavy clutter" survives to the stored record
//      and is the frozen CRM enum, not a new string.
//   4. Every field the client marks required is required by the SERVER too, and the optional
//      ones (email, photos) really are optional.
//   5. The partial-failure contract the UI surfaces is real: when upload storage fails, the
//      endpoint returns ok:false with the message that says the details stored but the files did
//      not — which is why the form never claims photos were received.
//   6. Campaign attribution fields are stored, and no submitted answer is required for them.
//
// Usage:
//   esbuild functions/api/lead.ts --bundle --platform=node --format=esm \
//     --outfile=/tmp/aseptaclean-lead-test.mjs && node scripts/ppc-endpoint-check.mjs
import { onRequestPost } from "/tmp/aseptaclean-lead-test.mjs";

class MemoryR2 {
  objects = new Map();
  /** Keys matching this pattern reject, to exercise the partial-upload-failure branch. */
  failOn = null;

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
    if (this.failOn && this.failOn.test(key)) {
      throw new Error(`simulated storage failure for ${key}`);
    }
    const body =
      typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
    this.objects.set(key, { body, options });
  }
}

globalThis.fetch = async (url) => {
  if (String(url).includes("turnstile")) return Response.json({ success: true });
  throw new Error(`Unexpected provider call: ${url}`);
};

// The FROZEN CRM enum value the PPC form ships as a hidden input. Must stay byte-identical to
// src/data/assessment.ts and to what functions/_lib/lead.ts allows.
const HOARDING_SITUATION = "Hoarding or heavy clutter";
const ROUTE = "/hoarding-cleanup-san-jose/assessment/";
const ENTRY = `${ROUTE}#assessment-form`;

let sequence = 0;
const nextKey = (label) => `ppc-${label}-${String(++sequence).padStart(4, "0")}`;

/** Exactly the fields PpcHeroForm.astro posts. Nothing extra, nothing renamed. */
const ppcForm = (overrides = {}) => {
  const data = new FormData();
  const values = {
    form_version: "2026-09-03.2",
    offer_type: "handoff_reset",
    property_situation: HOARDING_SITUATION,
    entry_route: ENTRY,
    submitted_from: ENTRY,
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "hoarding-sj",
    utm_term: "hoarding cleanup san jose",
    utm_content: "rsa-1",
    gclid: "TeSt-gclid-0001",
    landing_page: ROUTE,
    referrer: "https://www.google.com/",
    company_website: "",
    full_name: "PPC Test",
    phone: "4085550100",
    property_zip: "95113",
    email: "ppc-test@example.test",
    property_detail:
      "Front rooms and the garage are packed. There are papers and photographs mixed in.",
    privacy_consent: "yes",
    submission_timestamp: new Date().toISOString(),
    idempotency_key: nextKey("base"),
    "cf-turnstile-response": "test-token"
  };
  for (const [key, value] of Object.entries({ ...values, ...overrides })) {
    if (value === undefined) continue;
    data.set(key, value);
  }
  for (const key of Object.keys(overrides)) {
    if (overrides[key] === undefined) data.delete(key);
  }
  return data;
};

const jpeg = (name) =>
  new File([new Uint8Array([0xff, 0xd8, 0xff, 0xd9])], name, { type: "image/jpeg" });

const bucket = new MemoryR2();
const env = { LEAD_UPLOADS: bucket, TURNSTILE_SECRET_KEY: "test-secret" };
const post = (body, environment = env) =>
  onRequestPost({
    request: new Request("https://staging.aseptaclean.com/api/lead", {
      method: "POST",
      headers: { origin: "https://staging.aseptaclean.com" },
      body
    }),
    env: environment,
    waitUntil() {}
  });

const results = [];
const check = (label, condition, detail = "") => {
  results.push({ label, pass: Boolean(condition), detail });
  console.log(`${condition ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};

// ---------------------------------------------------------------------------------------------
// 1. NO-PHOTO SUBMISSION — the default path. Photos are optional and their absence is not an error.
const noPhoto = await post(ppcForm({ idempotency_key: nextKey("no-photo") }));
const noPhotoPayload = await noPhoto.json();
check(
  "no-photo submission accepted",
  noPhoto.status === 201 && noPhotoPayload.ok === true,
  `status ${noPhoto.status}`
);
const noPhotoLead = await (
  await bucket.get(`leads/${noPhotoPayload.submissionId}/submission.json`)
)?.json();
check(
  "no-photo lead stored with zero files and uploads skipped",
  noPhotoLead?.files.length === 0 && noPhotoLead?.delivery.uploads.state === "skipped",
  `files ${noPhotoLead?.files.length}, uploads ${noPhotoLead?.delivery.uploads.state}`
);
check(
  "fixed Hoarding service value reaches the stored record unchanged",
  noPhotoLead?.data.property_situation === HOARDING_SITUATION,
  JSON.stringify(noPhotoLead?.data.property_situation)
);
check(
  "campaign route recorded on the lead",
  noPhotoLead?.data.entry_route === ENTRY && noPhotoLead?.data.landing_page === ROUTE
);
check(
  "campaign attribution stored",
  noPhotoLead?.data.utm_source === "google" && noPhotoLead?.data.gclid === "TeSt-gclid-0001"
);
check(
  "confirmation code returned in the AC-XXXXXX shape the success panel renders",
  /^AC-[0-9A-HJKMNP-TV-Z]{6}$/.test(noPhotoPayload.confirmationCode || ""),
  noPhotoPayload.confirmationCode
);

// ---------------------------------------------------------------------------------------------
// 2. PHOTO SUBMISSION — two supported files, including a long filename.
const withPhotos = ppcForm({ idempotency_key: nextKey("photos") });
withPhotos.append("property_media[]", jpeg("living-room-wide.jpg"));
withPhotos.append(
  "property_media[]",
  jpeg(
    "a-really-quite-long-filename-that-a-phone-camera-might-produce-2026-09-05-front-room.jpg"
  )
);
const photoResponse = await post(withPhotos);
const photoPayload = await photoResponse.json();
check(
  "photo submission accepted",
  photoResponse.status === 201 && photoPayload.ok === true,
  `status ${photoResponse.status}`
);
const photoLead = await (
  await bucket.get(`leads/${photoPayload.submissionId}/submission.json`)
)?.json();
check(
  "both photos stored privately and the uploads step succeeded",
  photoLead?.files.length === 2 && photoLead?.delivery.uploads.state === "succeeded",
  `files ${photoLead?.files.length}, uploads ${photoLead?.delivery.uploads.state}`
);
check(
  "long original filename preserved on the record, storage key sanitised",
  photoLead?.files[1]?.originalName.startsWith("a-really-quite-long-filename") &&
    photoLead?.files[1]?.key.endsWith("property-file.jpg"),
  photoLead?.files[1]?.key
);

// ---------------------------------------------------------------------------------------------
// 3. REQUIRED FIELDS — the client mirrors exactly this set, so each must fail server-side too.
for (const field of [
  "full_name",
  "phone",
  "property_zip",
  "property_detail",
  "property_situation",
  "privacy_consent"
]) {
  const invalid = ppcForm({ idempotency_key: nextKey(`missing-${field}`), [field]: undefined });
  const response = await post(invalid);
  const payload = await response.json();
  check(
    `omitting ${field} is rejected 422 with a field-level error`,
    response.status === 422 && Boolean(payload.errors?.[field]),
    `status ${response.status}`
  );
}

// ---------------------------------------------------------------------------------------------
// 4. OPTIONAL FIELDS — email really is optional, and is validated only when supplied.
const noEmail = await post(ppcForm({ idempotency_key: nextKey("no-email"), email: undefined }));
check("email omitted is accepted", (await noEmail.json()).ok === true, `status ${noEmail.status}`);

const badEmail = await post(
  ppcForm({ idempotency_key: nextKey("bad-email"), email: "not-an-address" })
);
const badEmailPayload = await badEmail.json();
check(
  "invalid email is rejected with a field-level error",
  badEmail.status === 422 && Boolean(badEmailPayload.errors?.email),
  `status ${badEmail.status}`
);

// ---------------------------------------------------------------------------------------------
// 5. UPLOAD VALIDATION — unsupported type rejected server-side, matching the client's own check.
const badFile = ppcForm({ idempotency_key: nextKey("bad-file") });
badFile.append("property_media[]", new File(["notes"], "notes.txt", { type: "text/plain" }));
const badFileResponse = await post(badFile);
check(
  "unsupported file type rejected 422",
  badFileResponse.status === 422,
  `status ${badFileResponse.status}`
);

// ---------------------------------------------------------------------------------------------
// 6. ANTI-SPAM — the honeypot the form ships is enforced by the endpoint.
const honeypot = await post(
  ppcForm({ idempotency_key: nextKey("honeypot"), company_website: "https://spam.example" })
);
check("filled honeypot is rejected", honeypot.status === 422, `status ${honeypot.status}`);

// ---------------------------------------------------------------------------------------------
// 7. IDEMPOTENCY — a resubmit of the same key returns the original, not a second lead.
const repeatKey = nextKey("repeat");
await post(ppcForm({ idempotency_key: repeatKey }));
const duplicate = await post(ppcForm({ idempotency_key: repeatKey }));
const duplicatePayload = await duplicate.json();
check(
  "duplicate submission returns the original record",
  duplicatePayload.ok === true && duplicatePayload.duplicate === true
);

// ---------------------------------------------------------------------------------------------
// 8. PARTIAL FAILURE — details stored, files did not. This is the contract the success panel
//    depends on: the endpoint refuses to report ok, so the UI can never claim photos arrived.
const failingBucket = new MemoryR2();
failingBucket.failOn = /\/uploads\//;
const partial = ppcForm({ idempotency_key: nextKey("partial") });
partial.append("property_media[]", jpeg("kitchen.jpg"));
const partialResponse = await post(partial, {
  LEAD_UPLOADS: failingBucket,
  TURNSTILE_SECRET_KEY: "test-secret"
});
const partialPayload = await partialResponse.json();
check(
  "upload failure returns ok:false, never a success state",
  partialResponse.status === 503 && partialPayload.ok !== true,
  `status ${partialResponse.status}`
);
check(
  "upload-failure message reports the partial outcome accurately",
  typeof partialPayload.message === "string" &&
    partialPayload.message.includes("could not safely store the selected files"),
  partialPayload.message
);

const failed = [...failingBucket.objects.keys()].filter((k) => k.endsWith("submission.json"));
const partialRecord = failed.length ? await (await failingBucket.get(failed[0]))?.json() : null;
check(
  "the recoverable lead record survives an upload failure",
  partialRecord?.delivery.uploads.state === "failed" &&
    partialRecord?.delivery.coreStorage.state === "succeeded",
  `uploads ${partialRecord?.delivery.uploads.state}`
);


// ---------------------------------------------------------------------------------------------
// 9. PROVIDER PAYLOAD CONTRACT — what HubSpot and the two emails actually receive.
//
// The providers themselves are STUBBED (no live call leaves this process), but the payloads
// asserted here are the exact bodies functions/_lib/providers.ts builds, so this verifies the
// mapping that the real integration performs — including the source/timestamp/attribution and
// photo-reference lines added 2026-09-05 after inspecting the real HubSpot deals.
const hubspot = [];
const resend = [];
globalThis.fetch = async (url, init = {}) => {
  const target = String(url);
  if (target.includes("turnstile")) return Response.json({ success: true });
  if (target.includes("api.resend.com")) {
    if (init.body) resend.push(JSON.parse(String(init.body)));
    return Response.json({ id: "email-stub-id" });
  }
  if (target.includes("api.hubapi.com")) {
    if (init.body) hubspot.push({ url: target, body: JSON.parse(String(init.body)) });
    if (target.endsWith("/search")) return Response.json({ results: [] });
    if (target.endsWith("/contacts")) return Response.json({ id: "contact-stub-id" });
    if (target.endsWith("/deals")) return Response.json({ id: "deal-stub-id" });
  }
  throw new Error(`Unexpected provider call: ${url}`);
};

const providerForm = ppcForm({ idempotency_key: nextKey("providers") });
providerForm.append("property_media[]", jpeg("front-room.jpg"));
const providerBucket = new MemoryR2();
const providerResponse = await post(providerForm, {
  LEAD_UPLOADS: providerBucket,
  TURNSTILE_SECRET_KEY: "test-secret",
  HUBSPOT_ACCESS_TOKEN: "stub-token",
  HUBSPOT_PIPELINE_ID: "default",
  HUBSPOT_DEAL_STAGE_ID: "3959465687",
  RESEND_API_KEY: "stub-key",
  EMAIL_FROM_ADDRESS: "assessments@contact.aseptaclean.com",
  OWNER_ALERT_EMAIL: "owner@example.test"
});
const providerPayload = await providerResponse.json();
check(
  "submission with all providers configured is accepted",
  providerResponse.status === 201 && providerPayload.ok === true,
  `status ${providerResponse.status}`
);

const contactWrite = hubspot.find((h) => h.url.endsWith("/contacts") && h.body.properties?.phone);
const dealWrite = hubspot.find((h) => h.url.endsWith("/deals"));
const summary = dealWrite?.body.properties?.description ?? "";

check(
  "HubSpot contact carries name, phone, email and ZIP",
  contactWrite?.body.properties.firstname === "PPC" &&
    contactWrite?.body.properties.phone === "4085550100" &&
    contactWrite?.body.properties.email === "ppc-test@example.test" &&
    contactWrite?.body.properties.zip === "95113",
  JSON.stringify(contactWrite?.body.properties)
);
check(
  "HubSpot deal uses the existing property model (pipeline, stage, offer_type, confirmation_code)",
  dealWrite?.body.properties.pipeline === "default" &&
    dealWrite?.body.properties.dealstage === "3959465687" &&
    dealWrite?.body.properties.offer_type === "Handoff Reset" &&
    /^AC-[0-9A-HJKMNP-TV-Z]{6}$/.test(dealWrite?.body.properties.confirmation_code ?? ""),
  dealWrite?.body.properties.confirmation_code
);
check(
  "HubSpot deal is associated to the contact",
  dealWrite?.body.associations?.[0]?.to?.id === "contact-stub-id"
);
check(
  "HubSpot summary carries the Hoarding service value",
  summary.includes("Situation: Hoarding or heavy clutter")
);
check(
  "HubSpot summary carries the FULL description, untruncated",
  summary.includes("Front rooms and the garage are packed. There are papers and photographs mixed in."),
  `${summary.length} chars`
);
check(
  "HubSpot summary carries the landing-page source (regression: was missing)",
  summary.includes(`Source page: ${ENTRY}`),
  summary.split("\n").find((l) => l.startsWith("Source page:")) ?? "ABSENT"
);
check(
  "HubSpot summary carries the submission timestamp (regression: was missing)",
  /Submitted: \d{4}-\d{2}-\d{2}T/.test(summary),
  summary.split("\n").find((l) => l.startsWith("Submitted:")) ?? "ABSENT"
);
check(
  "HubSpot summary carries campaign attribution (regression: was missing)",
  summary.includes("Campaign: Source=google; Medium=cpc; Campaign=hoarding-sj") &&
    summary.includes("GCLID=TeSt-gclid-0001"),
  summary.split("\n").find((l) => l.startsWith("Campaign:")) ?? "ABSENT"
);
check(
  "HubSpot summary records consent (regression: was missing)",
  /Consent: contact consent given at submission/.test(summary),
  summary.split("\n").find((l) => l.startsWith("Consent:")) ?? "ABSENT"
);
check(
  "HubSpot summary carries private photo REFERENCES, not public URLs",
  summary.includes("front-room.jpg") &&
    summary.includes("leads/") &&
    !/https?:\/\/[^\s]*uploads/.test(summary),
  summary.split("\n").find((l) => l.includes("leads/"))?.trim() ?? "ABSENT"
);

const customerEmail = resend.find((m) => m.to === "ppc-test@example.test");
const ownerEmail = resend.find((m) => m.to === "owner@example.test");
check(
  "customer confirmation goes to the submitted address from the verified domain",
  customerEmail?.from === "assessments@contact.aseptaclean.com" &&
    customerEmail?.reply_to === "info@aseptaclean.com",
  `${customerEmail?.from} → ${customerEmail?.to}, reply-to ${customerEmail?.reply_to}`
);
check(
  "customer confirmation confirms an inquiry, not a booking or authorized work",
  /does not authorize work, create a service agreement, or reserve a project date/.test(
    customerEmail?.text ?? ""
  )
);
check(
  "owner notification is a lead alert with the details needed to act",
  ownerEmail?.subject.startsWith("New lead") &&
    /Name:/.test(ownerEmail?.text ?? "") &&
    /Phone:/.test(ownerEmail?.text ?? "") &&
    /Call: tel:/.test(ownerEmail?.text ?? ""),
  ownerEmail?.subject
);
check(
  "owner notification replies to the lead, and carries source and photo references",
  ownerEmail?.reply_to === "ppc-test@example.test" &&
    ownerEmail?.text.includes(`Source page: ${ENTRY}`) &&
    ownerEmail?.text.includes("leads/"),
  ownerEmail?.reply_to
);

// ---------------------------------------------------------------------------------------------
const failures = results.filter((r) => !r.pass);
console.log(
  `\n${results.length - failures.length}/${results.length} checks passed ` +
    `— PPC payload against functions/api/lead.ts, all providers stubbed, no live notifications.`
);
if (failures.length) process.exit(1);
