// ESTATE CAMPAIGN FORM CHECK — /estate-cleanout-san-jose/assessment/
//
// Exercises the REAL endpoint (functions/api/lead.ts, bundled) against the exact payload the
// estate campaign form posts, plus the failure modes the campaign's brief calls out:
// valid-with-blank-optional-details, invalid fields, a rejected service value, a rejected
// property-description value, missing consent, missing email, and a duplicate submission.
//
// WHY IT EXISTS. The estate campaign is the first form on this site where `property_detail` is
// OPTIONAL, and that relaxation is scoped by entry route inside functions/_lib/lead.ts. Two
// things can silently break it:
//   1. The browser stops requiring a description while the server still does — the visitor gets
//      a 422 on a field they were told was optional, and the lead is lost before storage.
//   2. The route scope leaks — every other form on the site quietly stops requiring one.
// Case 3 below is the regression guard for (2): the SAME payload from a non-campaign route must
// still be rejected.
//
// Providers are stubbed. This asserts endpoint behaviour and the message bodies handed to
// Resend; it does NOT prove a message was delivered to a real inbox. That is a separate,
// account-level verification and is reported as such.
//
// Run: npm run qa:estate
import { onRequestPost } from "/tmp/aseptaclean-estate-lead-test.mjs";

class MemoryR2 {
  objects = new Map();
  async head(key) {
    return this.objects.has(key) ? {} : null;
  }
  async get(key) {
    const value = this.objects.get(key);
    return value ? { json: async () => JSON.parse(value) } : null;
  }
  async put(key, value) {
    this.objects.set(key, typeof value === "string" ? value : "{}");
  }
}

const sent = [];
globalThis.fetch = async (url, init) => {
  const target = String(url);
  if (target.includes("turnstile")) return Response.json({ success: true });
  if (target.includes("api.resend.com")) {
    sent.push(JSON.parse(init.body));
    return Response.json({ id: `resend-${sent.length}` });
  }
  throw new Error(`Unexpected provider call: ${target}`);
};

const ESTATE_ROUTE = "/estate-cleanout-san-jose/assessment/";
const FORM_ANCHOR = `${ESTATE_ROUTE}#request-walkthrough`;

// EXACTLY what src/components/ppc/PpcHeroForm.astro posts from the estate page: the hidden
// identity fields, the four required contact fields, and the two optional answers. No field name
// here is invented — each one is rendered by that component.
const estateForm = (overrides = {}) => {
  const values = {
    form_version: "2026-09-03.2",
    offer_type: "handoff_reset",
    property_situation: "Inherited or estate property",
    entry_route: FORM_ANCHOR,
    submitted_from: FORM_ANCHOR,
    landing_page: ESTATE_ROUTE,
    full_name: "Estate Check",
    phone: "4085550142",
    email: "estate-check@example.test",
    property_zip: "95125",
    // OPTIONAL, and blank here on purpose — this is the case the brief requires to succeed.
    property_detail: "",
    property_status: "",
    privacy_consent: "yes",
    submission_timestamp: new Date().toISOString(),
    idempotency_key: crypto.randomUUID(),
    "cf-turnstile-response": "test-token",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "estate-sj",
    gclid: "TEST-GCLID-0001",
    ...overrides
  };
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
};

const post = (data) =>
  onRequestPost({
    request: new Request("https://aseptaclean.com/api/lead", { method: "POST", body: data }),
    env: {
      LEAD_UPLOADS: new MemoryR2(),
      TURNSTILE_SECRET_KEY: "test-secret",
      RESEND_API_KEY: "test-resend",
      EMAIL_FROM_ADDRESS: "leads@contact.aseptaclean.com",
      OWNER_ALERT_EMAIL: "owner@example.test"
    },
    waitUntil: () => {}
  });

let failures = 0;
const check = (label, condition, detail = "") => {
  if (condition) {
    console.log(`PASS ${label}`);
    return;
  }
  failures += 1;
  console.error(`FAIL ${label}${detail ? ` — ${detail}` : ""}`);
};

// ── 1. The success case the brief specifies: required fields only, optional details BLANK ────
{
  sent.length = 0;
  const response = await post(estateForm());
  const payload = await response.json();
  check(
    "estate form: required fields with BLANK optional details is accepted",
    response.status === 201 && payload.ok === true,
    `status ${response.status} ${JSON.stringify(payload.errors ?? payload.message ?? "")}`
  );
  check(
    "estate form: a confirmation code is returned for the browser's once-only lead claim",
    /^AC-[0-9A-HJKMNP-TV-Z]{6}$/.test(String(payload.confirmationCode)),
    String(payload.confirmationCode)
  );
  const customer = sent.find((message) => message.to === "estate-check@example.test");
  check(
    "estate form: the customer confirmation uses the campaign's walkthrough wording",
    Boolean(customer) &&
      customer.subject === "We received your walkthrough request" &&
      customer.text.includes("arrange a free walkthrough") &&
      customer.text.includes("does not book a crew"),
    JSON.stringify(customer?.subject)
  );
  const owner = sent.find((message) => message.to === "owner@example.test");
  check(
    "estate form: the owner alert carries the lead and the campaign source route",
    Boolean(owner) && owner.text.includes(ESTATE_ROUTE) && owner.text.includes("95125"),
    JSON.stringify(owner?.subject)
  );
  check(
    "estate form: an unanswered property-description selector adds no line to the owner alert",
    Boolean(owner) && !owner.text.includes("Property status:"),
    "an optional, unselected field must not print an empty row"
  );
}

// ── 2. One character of detail, and an answered property-description selector ────────────────
{
  sent.length = 0;
  const response = await post(
    estateForm({ property_detail: "x", property_status: "Estate after a loss" })
  );
  const payload = await response.json();
  check(
    "estate form: a single character of optional detail is accepted (no minimum length)",
    response.status === 201 && payload.ok === true,
    `status ${response.status}`
  );
  const owner = sent.find((message) => message.to === "owner@example.test");
  check(
    "estate form: an answered property-description selector reaches the owner alert",
    Boolean(owner) && owner.text.includes("Property status: Estate after a loss"),
    owner?.text?.split("\n").slice(0, 10).join(" | ")
  );
}

// ── 3. REGRESSION GUARD: the relaxation must not leak off this campaign route ────────────────
{
  const response = await post(
    estateForm({
      entry_route: "/contact/#contact-form",
      submitted_from: "/contact/#contact-form",
      landing_page: "/contact/"
    })
  );
  const payload = await response.json();
  check(
    "other forms still require a description (the optional-detail rule is route-scoped)",
    response.status === 422 && payload.ok === false && Boolean(payload.errors?.property_detail),
    `status ${response.status} ${JSON.stringify(payload.errors ?? {})}`
  );
}

// ── 4-7. Failure modes. None of them may return ok:true. ─────────────────────────────────────
const rejections = [
  ["email is required on every active form", { email: "" }, "email"],
  ["a malformed email is rejected", { email: "not-an-address" }, "email"],
  ["consent is required", { privacy_consent: "" }, "privacy_consent"],
  ["a short phone number is rejected", { phone: "40855" }, "phone"],
  ["a malformed ZIP is rejected", { property_zip: "9512" }, "property_zip"],
  [
    "an unsupported service value is rejected before storage",
    { property_situation: "Estate cleanout" },
    "property_situation"
  ],
  [
    "an unsupported property-description value is rejected",
    { property_status: "Vacation rental" },
    "property_status"
  ]
];

for (const [label, overrides, field] of rejections) {
  const response = await post(estateForm(overrides));
  const payload = await response.json();
  check(
    `estate form: ${label}`,
    response.status === 422 && payload.ok === false && Boolean(payload.errors?.[field]),
    `status ${response.status} ${JSON.stringify(payload.errors ?? {})}`
  );
}

// ── 8. Duplicate submission — one lead, one code, so the browser's claim key cannot double ───
{
  const key = crypto.randomUUID();
  const env = {
    LEAD_UPLOADS: new MemoryR2(),
    TURNSTILE_SECRET_KEY: "test-secret",
    RESEND_API_KEY: "test-resend",
    EMAIL_FROM_ADDRESS: "leads@contact.aseptaclean.com",
    OWNER_ALERT_EMAIL: "owner@example.test"
  };
  const send = (data) =>
    onRequestPost({
      request: new Request("https://aseptaclean.com/api/lead", { method: "POST", body: data }),
      env,
      waitUntil: () => {}
    });
  const first = await (await send(estateForm({ idempotency_key: key }))).json();
  const second = await (await send(estateForm({ idempotency_key: key }))).json();
  check(
    "estate form: a repeated submission returns the SAME confirmation code, not a second lead",
    second.ok === true &&
      second.duplicate === true &&
      second.confirmationCode === first.confirmationCode,
    `${first.confirmationCode} vs ${second.confirmationCode}`
  );
}

console.log(
  failures
    ? `\n${failures} check(s) FAILED`
    : "\nestate campaign form check: all checks passed."
);
process.exit(failures ? 1 : 0);
