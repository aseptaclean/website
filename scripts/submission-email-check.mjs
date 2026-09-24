import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["functions/_lib/emailTemplates.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  write: false
});
const source = Buffer.from(bundle.outputFiles[0].contents).toString("base64");
const {
  buildCustomerConfirmationEmail,
  buildOwnerLeadNotificationEmail,
  serviceLabelFor
} = await import(
  `data:text/javascript;base64,${source}`
);

const longMessage = `Please keep <family photos> & records.\n${"Long message sentence. ".repeat(150)}`;
const lead = {
  id: "11111111-2222-4333-8444-555555555555",
  code: "AC-TEST42",
  receivedAt: "2026-07-15T19:00:00.000Z",
  callbackWindow: "business-hours",
  data: {
    full_name: "Avery <script>alert(1)</script> O'Neil\r\nBcc: bad@example.test",
    email: "avery.o'neil@example.test",
    phone: "(408) 555-0199",
    property_zip: "95112",
    property_situation: "Hoarding or heavy clutter",
    property_detail: longMessage,
    privacy_consent: "yes",
    form_version: "2026-09-03.2",
    entry_route: "/contact/#contact-form",
    utm_source: "google & partners",
    utm_medium: "cpc",
    utm_campaign: "cleanup <south-bay>",
    gclid: "test-click-id"
  },
  files: [
    {
      key: "leads/11111111-2222-4333-8444-555555555555/uploads/01-room-photo.jpg",
      originalName: "room <before> & notes.jpg",
      contentType: "image/jpeg",
      size: 4096
    }
  ],
  delivery: {
    uploads: { state: "succeeded", at: "2026-07-15T19:00:00.000Z" },
    customerEmail: { state: "succeeded", at: "2026-07-15T19:00:01.000Z" }
  }
};

const customer = buildCustomerConfirmationEmail(lead);
const owner = buildOwnerLeadNotificationEmail(lead, "simulated SMS failure");

assert.equal(customer.fromName, "Aseptaclean");
assert.equal(customer.subject, "We received your hoarding cleanup inquiry | Aseptaclean");
assert.match(customer.text, /Your inquiry · AC-TEST42/);
assert.match(customer.text, /Please keep <family photos> & records\./);
assert.match(customer.html, /Please keep &lt;family photos&gt; &amp; records\.<br>/);
assert.doesNotMatch(customer.html, /<script>alert\(1\)<\/script>/);
assert.doesNotMatch(customer.html, /Jamie Parker|AC-1048/);
assert.ok(customer.html.includes("Long message sentence.".repeat(1)));
assert.ok(customer.text.length > 3000, "long customer messages must not be silently truncated");
assert.match(customer.html, /background:#ffffff/);
assert.match(customer.html, /color-scheme:light/);
assert.match(
  customer.html,
  /<img src="https:\/\/aseptaclean\.com\/assets\/brand\/aseptaclean-wordmark\.png" width="209" alt="Aseptaclean"/
);
assert.doesNotMatch(
  customer.html,
  /font-size:23px;line-height:1\.2;font-weight:700;letter-spacing:-0\.8px/
);
assert.match(customer.html, /It does not book an assessment or authorize work\./);

assert.equal(owner.fromName, "Aseptaclean Website");
assert.equal(
  owner.subject,
  "New lead: Hoarding Cleanup · 95112 · Avery <script>alert(1)</script> O'Neil Bcc: bad@example.test"
);
assert.doesNotMatch(owner.subject, /[\r\n]/);
assert.match(owner.text, /Received: July 15, 2026 · 12:00 PM Pacific/);
assert.match(owner.text, /Customer confirmation: sent\./);
assert.match(owner.text, /Contact consent: Checked · form version 2026-09-03\.2/);
assert.match(owner.text, /protected R2 object leads\//);
assert.doesNotMatch(owner.text, /https?:\/\/[^\s]*uploads/);
assert.match(owner.html, /room &lt;before&gt; &amp; notes\.jpg/);
assert.doesNotMatch(owner.html, /<script>alert\(1\)<\/script>/);
assert.match(owner.html, /Source: google &amp; partners/);
assert.match(owner.html, /Customer confirmation: sent/);

const noEmailLead = {
  ...lead,
  data: { ...lead.data, email: "", property_zip: "", property_detail: "" },
  files: [],
  delivery: {
    uploads: { state: "skipped", at: lead.receivedAt },
    customerEmail: { state: "skipped", at: lead.receivedAt }
  }
};
const ownerWithoutEmail = buildOwnerLeadNotificationEmail(noEmailLead, "");
assert.match(ownerWithoutEmail.subject, /ZIP not supplied/);
assert.doesNotMatch(ownerWithoutEmail.html, />Email Avery</);
assert.doesNotMatch(ownerWithoutEmail.html, />Customer message</);
assert.match(ownerWithoutEmail.text, /No customer reply address was supplied\./);
assert.match(ownerWithoutEmail.text, /Customer confirmation: not requested \(no customer email\)\./);
assert.match(ownerWithoutEmail.text, /Photos: None attached/);

for (const [submitted, expected] of [
  ["Hoarding or heavy clutter", "Hoarding Cleanup"],
  ["Severe property condition", "Extreme Cleaning"],
  ["Detailed deep cleaning", "Detailed Deep Cleaning"],
  ["Crime scene or trauma cleanup", "Crime Scene & Trauma Cleanup"],
  ["Rodent droppings or animal waste", "Rodent Droppings & Animal Waste Cleanup"],
  ["Inherited or estate property", "Estate Cleanout"],
  ["Not sure", "Cleanup"]
]) {
  assert.equal(
    serviceLabelFor({
      ...lead,
      data: { ...lead.data, entry_route: "/contact/", property_situation: submitted }
    }),
    expected
  );
}
assert.equal(
  serviceLabelFor({
    ...lead,
    data: {
      ...lead.data,
      entry_route: "/estate-cleanout-san-jose/assessment/",
      property_situation: "Not sure"
    }
  }),
  "Estate Cleanout"
);
assert.equal(
  serviceLabelFor({
    ...lead,
    data: { ...lead.data, offer_type: "private_residence_reset" }
  }),
  "Private Residence Reset"
);

const renderDir = await mkdtemp(join(tmpdir(), "aseptaclean-email-render-"));
await Promise.all([
  writeFile(join(renderDir, "customer-confirmation.html"), customer.html),
  writeFile(join(renderDir, "customer-confirmation.txt"), customer.text),
  writeFile(join(renderDir, "owner-lead-notification.html"), owner.html),
  writeFile(join(renderDir, "owner-lead-notification.txt"), owner.text)
]);

console.log("PASS customer confirmation HTML and text rendering");
console.log("PASS owner lead notification HTML and text rendering");
console.log("PASS submitted-field escaping and header newline removal");
console.log("PASS long message, optional field and no-email handling");
console.log("PASS Pacific time, consent, attribution and protected photo references");
console.log("PASS service enum and route-context display mappings");
console.log(`Rendered local test messages: ${renderDir}`);
