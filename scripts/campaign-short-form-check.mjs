// Endpoint integration matrix for the two shortened campaign forms. Providers are stubbed with
// company-owned test-domain recipients; no advertising, production CRM, or live email is used.
import { onRequestPost } from "/tmp/aseptaclean-campaign-short-lead-test.mjs";

class MemoryR2 {
  objects = new Map();
  failRecords = false;
  failUploads = false;

  async get(key) {
    const value = this.objects.get(key);
    return value ? { json: async () => JSON.parse(value) } : null;
  }

  async put(key, value) {
    if (this.failRecords && key.endsWith("submission.json")) throw new Error("record failure");
    if (this.failUploads && key.includes("/uploads/")) throw new Error("upload failure");
    this.objects.set(key, typeof value === "string" ? value : "binary");
  }
}

const campaigns = [
  {
    key: "rodent_assessment",
    route: "/rodent-dropping-cleanup-san-jose/assessment/",
    anchor: "#rodent-form",
    situation: "Rodent droppings or animal waste",
    role: "Property manager / landlord",
    service: "Rodent Droppings & Animal Waste Cleanup"
  },
  {
    key: "estate_assessment",
    route: "/estate-cleanout-san-jose/assessment/",
    anchor: "#request-walkthrough",
    situation: "Inherited or estate property",
    role: "Executor / personal representative",
    service: "Estate Cleanout"
  }
];

let sequence = 0;
const nextIdempotency = (label) =>
  `short-${label.replace(/[^a-z0-9-]/gi, "-")}-${String(++sequence).padStart(4, "0")}`;
const testEmail = "qa@aseptaclean.com";
const ownerEmail = "owner-alert-qa@aseptaclean.com";

const formFor = (campaign, overrides = {}) => {
  const values = {
    form_version: "2026-09-03.2",
    offer_type: "handoff_reset",
    campaign_context: campaign.key,
    property_situation: campaign.situation,
    entry_route: `${campaign.route}${campaign.anchor}`,
    submitted_from: `${campaign.route}${campaign.anchor}`,
    landing_page: campaign.route,
    full_name: `Controlled ${campaign.key} QA`,
    phone: "4085550100",
    email: "",
    campaign_role: "",
    property_detail: "",
    privacy_consent: "yes",
    submission_timestamp: new Date().toISOString(),
    idempotency_key: nextIdempotency(campaign.key),
    "cf-turnstile-response": "controlled-test-token",
    utm_source: "controlled_qa",
    utm_medium: "test",
    utm_campaign: `${campaign.key}_test`,
    gclid: "",
    company_website: "",
    ...overrides
  };
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) data.set(key, value);
  }
  return data;
};

const jpeg = (name = "controlled-test.jpg") =>
  new File([new Uint8Array([0xff, 0xd8, 0xff, 0xd9])], name, { type: "image/jpeg" });

const sent = [];
globalThis.fetch = async (url, init = {}) => {
  const target = String(url);
  if (target.includes("turnstile")) return Response.json({ success: true });
  if (target.includes("api.resend.com")) {
    sent.push({
      ...JSON.parse(init.body),
      idempotencyKey: new Headers(init.headers).get("idempotency-key")
    });
    return Response.json({ id: `controlled-resend-${sent.length}` });
  }
  throw new Error(`Unexpected provider request: ${target}`);
};

const post = (body, bucket = new MemoryR2()) =>
  onRequestPost({
    request: new Request("https://aseptaclean.example/api/lead", {
      method: "POST",
      headers: { origin: "https://aseptaclean.example" },
      body
    }),
    env: {
      LEAD_UPLOADS: bucket,
      TURNSTILE_SECRET_KEY: "controlled-test-secret",
      RESEND_API_KEY: "controlled-test-resend",
      EMAIL_FROM_ADDRESS: "qa@contact.aseptaclean.com",
      OWNER_ALERT_EMAIL: ownerEmail,
      ALLOWED_ORIGINS: "https://aseptaclean.example"
    },
    waitUntil() {}
  });

let failures = 0;
const check = (campaign, label, passed, detail = "") => {
  console.log(`${passed ? "PASS" : "FAIL"} ${campaign.key}: ${label}${detail ? ` — ${detail}` : ""}`);
  if (!passed) failures += 1;
};

for (const campaign of campaigns) {
  // Name + phone + consent only: accepted, owner notified, no customer message attempted.
  sent.length = 0;
  const minimalBucket = new MemoryR2();
  const minimalResponse = await post(formFor(campaign), minimalBucket);
  const minimalPayload = await minimalResponse.json();
  const minimalOwner = sent.find((message) => message.to === ownerEmail);
  check(
    campaign,
    "name and phone only is accepted",
    minimalResponse.status === 201 && minimalPayload.ok === true,
    `status ${minimalResponse.status} ${JSON.stringify(minimalPayload)}`
  );
  check(campaign, "owner notification is sent without customer email", Boolean(minimalOwner) && sent.length === 1);
  check(campaign, "customer confirmation is skipped without email", !sent.some((message) => message.to === testEmail));
  check(campaign, "fixed service and campaign identity are stored", (() => {
    const stored = [...minimalBucket.objects.entries()].find(([key]) => key.endsWith("submission.json"));
    if (!stored) return false;
    const lead = JSON.parse(stored[1]);
    return lead.data.property_situation === campaign.situation && lead.data.campaign_context === campaign.key;
  })());

  // All optional fields, no photo: both templates contain supplied values and no undefined text.
  sent.length = 0;
  const completeResponse = await post(
    formFor(campaign, {
      email: testEmail,
      campaign_role: campaign.role,
      property_detail: "Controlled optional details for integration QA.",
      utm_term: "controlled term"
    })
  );
  const completePayload = await completeResponse.json();
  const customer = sent.find((message) => message.to === testEmail);
  const owner = sent.find((message) => message.to === ownerEmail);
  check(campaign, "all optional text fields is accepted", completeResponse.status === 201 && completePayload.ok === true);
  check(campaign, "customer confirmation is sent when email is valid", Boolean(customer));
  check(campaign, "customer template includes service and role", Boolean(customer?.text.includes(campaign.service) && customer?.text.includes(`Role: ${campaign.role}`)));
  check(campaign, "owner template includes role, details, source, and attribution", Boolean(owner?.text.includes(`Role: ${campaign.role}`) && owner?.text.includes("Controlled optional details") && owner?.text.includes(campaign.route) && owner?.text.includes("controlled_qa")));
  check(campaign, "neither email template renders undefined", sent.every((message) => !/undefined/i.test(message.text) && !/undefined/i.test(message.html)));

  // Supported photo upload.
  sent.length = 0;
  const photoBucket = new MemoryR2();
  const photoForm = formFor(campaign, { email: testEmail, campaign_role: campaign.role });
  photoForm.append("property_media[]", jpeg(`${campaign.key}.jpg`));
  const photoResponse = await post(photoForm, photoBucket);
  const photoPayload = await photoResponse.json();
  const storedPhotoLead = JSON.parse(photoBucket.objects.get(`leads/${photoPayload.submissionId}/submission.json`) || "{}");
  check(campaign, "supported photo submission is accepted", photoResponse.status === 201 && photoPayload.ok === true);
  check(campaign, "photo is stored and reported to owner", storedPhotoLead.files?.length === 1 && sent.some((message) => message.to === ownerEmail && message.text.includes("1 private attachment received")));

  // Client/server invalid cases.
  const invalidCases = [
    ["missing name", { full_name: "" }, "full_name"],
    ["missing phone", { phone: "" }, "phone"],
    ["missing consent", { privacy_consent: "" }, "privacy_consent"],
    ["malformed optional email", { email: "not-an-email" }, "email"],
    ["unsupported role", { campaign_role: "Unlisted role" }, "campaign_role"],
    ["mismatched service identity", { property_situation: "Not sure" }, "campaign_context"],
    ["mismatched source route", { entry_route: "/contact/", submitted_from: "/contact/", landing_page: "/contact/" }, "campaign_context"]
  ];
  for (const [label, overrides, field] of invalidCases) {
    const response = await post(formFor(campaign, overrides));
    const payload = await response.json();
    check(campaign, `${label} is rejected`, response.status === 422 && Boolean(payload.errors?.[field]), `status ${response.status}`);
  }

  const invalidUpload = formFor(campaign);
  invalidUpload.append("property_media[]", new File(["bad"], "bad.txt", { type: "text/plain" }));
  const invalidUploadResponse = await post(invalidUpload);
  const invalidUploadPayload = await invalidUploadResponse.json();
  check(campaign, "unsupported photo type is rejected", invalidUploadResponse.status === 422 && Boolean(invalidUploadPayload.errors?.["property_media[]"]));

  const failedBucket = new MemoryR2();
  failedBucket.failRecords = true;
  sent.length = 0;
  const failedResponse = await post(formFor(campaign), failedBucket);
  const failedPayload = await failedResponse.json();
  check(campaign, "storage failure returns an honest failure and sends no email", failedResponse.status === 503 && failedPayload.ok === false && sent.length === 0);

  // Duplicate submission: one stored lead and one set of provider messages.
  sent.length = 0;
  const duplicateBucket = new MemoryR2();
  const duplicateKey = nextIdempotency(`${campaign.key}-duplicate`);
  const first = await (await post(formFor(campaign, { email: testEmail, idempotency_key: duplicateKey }), duplicateBucket)).json();
  const sentAfterFirst = sent.length;
  const second = await (await post(formFor(campaign, { email: testEmail, idempotency_key: duplicateKey }), duplicateBucket)).json();
  check(campaign, "duplicate submission returns the same lead and code", second.duplicate === true && second.submissionId === first.submissionId && second.confirmationCode === first.confirmationCode);
  check(campaign, "duplicate submission does not resend either email", sent.length === sentAfterFirst);
}

if (failures) {
  console.error(`\n${failures} campaign short-form check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll campaign short-form endpoint checks passed.");
}
