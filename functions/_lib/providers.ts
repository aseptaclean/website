import type { LeadEnvironment, LeadRecord } from "./lead";

const providerError = async (response: Response, provider: string) => {
  const body = (await response.text()).slice(0, 500);
  throw new Error(`${provider} returned ${response.status}: ${body}`);
};

const NOT_SUPPLIED = "Not supplied";

// Most fields are optional now that the short homepage form (name, phone, optional
// description, consent) shares this pipeline with the long assessment questionnaire —
// see docs/05-DECISIONS-LOG.md. This renders whatever was actually collected instead of
// printing "undefined" for the fields the short form never asks about.
const field = (value: LeadRecord["data"][string] | undefined) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : NOT_SUPPLIED;
  return value && String(value).trim() ? String(value) : NOT_SUPPLIED;
};

const isDetailedLead = (lead: LeadRecord) => Boolean(lead.data.form_version);

// ---------------------------------------------------------------------------------------------
// SOURCE, TIMESTAMP AND CAMPAIGN ATTRIBUTION — added 2026-09-05.
//
// MEASURED GAP, not a speculative one. Inspecting the real HubSpot deals this pipeline has
// produced (portal 244919964, e.g. deal 345516376815 / AC-4XV8GS) showed the summary carried
// Offer, code, request id, property, situation, description and an upload COUNT — and nothing
// about where the lead came from or when it was submitted. For an organic lead that is merely
// incomplete; for a paid-search lead it is disabling, because the deal cannot be attributed to
// the campaign, ad group or keyword that paid for it.
//
// The form has always collected these fields and functions/_lib/lead.ts has always stored them
// in R2 — they simply stopped at the CRM boundary. This closes that gap using the EXISTING deal
// property (`description`); no new HubSpot property is created.
//
// Lines are omitted entirely when their value is absent, so an organic submission does not gain
// a block of "Not supplied" noise.
const attributionLines = (lead: LeadRecord) => {
  const value = (key: string) => {
    const raw = lead.data[key];
    const text = typeof raw === "string" ? raw.trim() : "";
    return text || "";
  };
  const lines: string[] = [];

  const source = value("entry_route") || value("landing_page") || value("submitted_from");
  if (source) lines.push(`Source page: ${source}`);
  lines.push(`Submitted: ${lead.receivedAt}`);

  const campaign = [
    ["Source", value("utm_source")],
    ["Medium", value("utm_medium")],
    ["Campaign", value("utm_campaign")],
    ["Term", value("utm_term")],
    ["Content", value("utm_content")],
    ["GCLID", value("gclid")]
  ].filter(([, v]) => v);
  if (campaign.length) {
    lines.push(`Campaign: ${campaign.map(([k, v]) => `${k}=${v}`).join("; ")}`);
  }

  const referrer = value("referrer");
  if (referrer) lines.push(`Referrer: ${referrer}`);

  // Consent is a required field, so its presence is a fact worth recording on the record that
  // sales actually works from — not just in the R2 blob.
  if (value("privacy_consent") === "yes") {
    lines.push(`Consent: contact consent given at submission (${lead.receivedAt})`);
  }

  return lines;
};

// Optional property-description answer, added 2026-09-09 with the estate campaign. Rendered as
// its own line ONLY when the visitor selected something, so no other form's summary gains a line.
const propertyStatusLines = (lead: LeadRecord) => {
  const value = lead.data.property_status;
  const text = typeof value === "string" ? value.trim() : "";
  return text ? [`Property status: ${text}`] : [];
};

// Photo REFERENCES, not links. These are private R2 object keys: they are not URLs, they are not
// publicly resolvable, and nothing here exposes an uploaded property photo on an unrestricted
// address. They let the owner find the exact objects for a submission in the bucket.
const uploadLines = (lead: LeadRecord) => {
  if (!lead.files.length) return [`Private uploads: 0`];
  return [
    `Private uploads: ${lead.files.length} (private R2 objects, not public URLs)`,
    ...lead.files.map(
      (file, index) =>
        `  ${index + 1}. ${file.key} — ${file.originalName} (${file.contentType}, ${file.size} bytes)`
    )
  ];
};

export async function verifyTurnstile(
  env: LeadEnvironment,
  token: string,
  remoteIp: string
) {
  if (!env.TURNSTILE_SECRET_KEY) return false;
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
    remoteip: remoteIp
  });
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body }
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function syncHubSpot(env: LeadEnvironment, lead: LeadRecord) {
  if (
    !env.HUBSPOT_ACCESS_TOKEN ||
    !env.HUBSPOT_PIPELINE_ID ||
    !env.HUBSPOT_DEAL_STAGE_ID
  ) {
    return { skipped: true, detail: "HubSpot credentials are not configured." };
  }
  const email = typeof lead.data.email === "string" ? lead.data.email : "";
  const phone = String(lead.data.phone ?? "").trim();
  if (!email && !phone) {
    return {
      skipped: true,
      detail: "No email or phone was collected on this submission; HubSpot needs one identifier."
    };
  }

  const headers = {
    authorization: `Bearer ${env.HUBSPOT_ACCESS_TOKEN}`,
    "content-type": "application/json"
  };
  const name = String(lead.data.full_name).trim().split(/\s+/);

  const findContactByProperty = async (propertyName: string, value: string) => {
    if (!value) return undefined;
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName, operator: "EQ", value }] }],
          limit: 1
        })
      }
    );
    if (!response.ok) await providerError(response, "HubSpot contact search");
    const result = (await response.json()) as { results?: Array<{ id: string }> };
    return result.results?.[0]?.id;
  };

  // Email is now the identifier: every active form requires one (2026-09-06), so this is the
  // match every submission dedupes on. Phone is looked up separately, ONLY to detect a
  // conflict — matching (or overwriting) a contact by phone alone would let two different
  // people's records collapse into one just because they share a phone number (a landline, a
  // family member, a reused mobile number). See docs/05-CURRENT-DECISIONS.md 2026-09-06 "HubSpot
  // contact matching".
  const emailContactId = await findContactByProperty("email", email);
  const phoneContactId = await findContactByProperty("phone", phone);
  const phoneOnDifferentContact = Boolean(phoneContactId) && phoneContactId !== emailContactId;

  // Defensive fallback only: every active form now requires email, so `email` is never empty
  // here in practice. If it somehow is (a stale cached page posting an old form shape), fall
  // back to the previous phone-match behavior rather than always creating a duplicate contact.
  let contactId = emailContactId ?? (email ? undefined : phoneContactId);
  const contactProperties = {
    ...(email ? { email } : {}),
    firstname: name[0] ?? "",
    lastname: name.slice(1).join(" "),
    // Skip writing phone onto a record when that exact number is already the identifying phone
    // on a DIFFERENT contact — writing it here would either steal that contact's number or leave
    // two contacts sharing one. The number still reaches the deal (see the conflict line added to
    // `summary` below); it is just not force-written onto a possibly-unrelated contact record.
    ...(phone && !phoneOnDifferentContact ? { phone } : {}),
    // The short request-assessment form (2026-09-03) collects a ZIP, not a city. field()
    // renders "Not supplied" for humans reading a summary; writing that into a real CRM
    // property would make it look like a ZIP named "Not supplied".
    ...(lead.data.property_zip ? { zip: String(lead.data.property_zip) } : {})
  };
  const contactResponse = await fetch(
    contactId
      ? `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`
      : "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: contactId ? "PATCH" : "POST",
      headers,
      body: JSON.stringify({ properties: contactProperties })
    }
  );
  if (!contactResponse.ok) await providerError(contactResponse, "HubSpot contact");
  if (!contactId) {
    contactId = ((await contactResponse.json()) as { id: string }).id;
  }

  const isResidence = lead.data.offer_type === "private_residence_reset";
  const summary = (
    !isDetailedLead(lead)
      ? [
          `Offer: Quick request (short form)`,
          `Confirmation code: ${lead.code}`,
          `Request ID: ${lead.id}`,
          `Description: ${field(lead.data.property_detail || lead.data.additional_notes)}`,
          ...attributionLines(lead),
          ...uploadLines(lead)
        ]
      : isResidence
      ? [
          `Offer: Private Residence Reset`,
          `Confirmation code: ${lead.code}`,
          `Request ID: ${lead.id}`,
          `Residence: ${field(lead.data.property_address)}, ${field(lead.data.property_city)} ${field(lead.data.property_zip)}`,
          `Situation: ${field(lead.data.property_situation)}`,
          `Size / levels: ${field(lead.data.approximate_square_footage)}; ${field(lead.data.number_of_levels)}`,
          `Occupancy: ${field(lead.data.occupancy_status)}`,
          `Deadline: ${field(lead.data.desired_completion_date)}`,
          `Priority rooms: ${field(lead.data.priority_rooms)}`,
          `Detail priorities: ${field(lead.data.detail_priorities)}`,
          `Important finishes: ${field(lead.data.important_finishes)}`,
          `Pets / presence: ${field(lead.data.pets)}; ${field(lead.data.someone_present)}`,
          `Access: ${field(lead.data.access_notes)}`,
          `Safety routing: ${field(lead.data.safety_routing)}`,
          `Investment: ${field(lead.data.investment_range)}`,
          `Authority: ${field(lead.data.authority_to_approve)}`,
          ...attributionLines(lead),
          ...uploadLines(lead)
        ]
      : [
          `Offer: Assessment request`,
          `Confirmation code: ${lead.code}`,
          `Request ID: ${lead.id}`,
          `Property ZIP: ${field(lead.data.property_zip)}`,
          `Situation: ${field(lead.data.property_situation)}`,
          // Estate campaign only, and only when the visitor actually chose one — the selector is
          // optional and starts unselected, so an absent answer must not become a "Not supplied"
          // line on every other assessment deal.
          ...propertyStatusLines(lead),
          `Description: ${field(lead.data.property_detail)}`,
          ...attributionLines(lead),
          ...uploadLines(lead)
        ]
  )
    .concat(
      // Surfaced on the deal (not silently dropped) so the owner can manually confirm whether
      // this is the same person before treating the two contacts as one — see the contact
      // property write above, which deliberately did not merge them automatically.
      phoneOnDifferentContact
        ? [
            `Phone conflict: ${phone} is already on a different HubSpot contact (id ${phoneContactId}) than the one matched by email (id ${contactId}). The phone number was NOT written to either contact record automatically — verify manually before treating these as the same person.`
          ]
        : []
    )
    .join("\n");
  const dealResponse = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: {
        // Neither the short homepage form nor the short assessment form asks for a city, so
        // append the ZIP only when there is one rather than naming the deal "… — Not supplied".
        dealname: [
          isResidence ? "Private Residence Reset" : "Assessment request",
          String(lead.data.full_name),
          ...(lead.data.property_zip ? [String(lead.data.property_zip)] : [])
        ].join(" — "),
        pipeline: env.HUBSPOT_PIPELINE_ID,
        dealstage: env.HUBSPOT_DEAL_STAGE_ID,
        offer_type: isResidence
          ? "Private Residence Reset"
          : "Handoff Reset",
        // Custom deal property (created 2026-08-11). Lets the owner pull up the deal from
        // the code a customer reads out, and is the join key between the CRM record, the
        // R2 record, and the confirmation email.
        confirmation_code: lead.code,
        description: summary
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3
            }
          ]
        }
      ]
    })
  });
  if (!dealResponse.ok) await providerError(dealResponse, "HubSpot deal");
  const deal = (await dealResponse.json()) as { id: string };
  return { skipped: false, detail: `Contact ${contactId}; deal ${deal.id}` };
}

// EMAIL_FROM_ADDRESS sends from contact.aseptaclean.com, the only domain verified in
// Resend, and that domain has receiving disabled — a reply to the From address would
// bounce. Every message therefore carries an explicit Reply-To, but not the same one:
// the customer confirmation replies to monitored Google Workspace mail on the apex,
// while the owner alert replies straight to the lead so hitting reply on the alert
// lands in the customer's inbox.
const CUSTOMER_REPLY_TO = "info@aseptaclean.com";

// HOARDING PPC CAMPAIGN ROUTE. Owner decision 2026-09-06: the walkthrough offered through this
// campaign is free, and only through this campaign. The confirmation email is therefore scoped by
// the route the submission came from rather than by `offer_type` — this campaign posts the SHARED
// `handoff_reset` offer type, so keying on that would have rewritten the confirmation for every
// other form on the site and repriced an assessment the owner did not reprice.
const HOARDING_CAMPAIGN_ROUTE = "/hoarding-cleanup-san-jose/assessment/";

// ESTATE PPC CAMPAIGN ROUTE, added 2026-09-09 (docs/aseptaclean-estate-landing-page.md). Same
// shape and same reasoning as the hoarding route above: this campaign also offers a free
// walkthrough, it also posts the shared `handoff_reset` offer type, and its confirmation
// therefore has to be scoped by route rather than by offer type. Its wording is the estate
// campaign's own — the page, the thank-you route and this email say the same thing.
const ESTATE_CAMPAIGN_ROUTE = "/estate-cleanout-san-jose/assessment/";

const isFromRoute = (lead: LeadRecord, route: string) =>
  [lead.data.entry_route, lead.data.landing_page, lead.data.submitted_from].some(
    (value) => typeof value === "string" && value.startsWith(route)
  );

const isHoardingCampaignLead = (lead: LeadRecord) => isFromRoute(lead, HOARDING_CAMPAIGN_ROUTE);
const isEstateCampaignLead = (lead: LeadRecord) => isFromRoute(lead, ESTATE_CAMPAIGN_ROUTE);

async function sendResend(
  env: LeadEnvironment,
  message: { to: string; subject: string; text: string; replyTo?: string }
) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM_ADDRESS) {
    return { skipped: true, detail: "Resend credentials are not configured." };
  }
  const { replyTo, ...email } = message;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM_ADDRESS,
      ...email,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });
  if (!response.ok) await providerError(response, "Resend");
  const result = (await response.json()) as { id: string };
  return { skipped: false, detail: `Email ${result.id}` };
}

export function sendCustomerEmail(env: LeadEnvironment, lead: LeadRecord) {
  const email = typeof lead.data.email === "string" ? lead.data.email : "";
  if (!email) {
    return Promise.resolve({
      skipped: true,
      detail: "No email was collected on this submission; confirmation email needs one."
    });
  }
  const isResidence = lead.data.offer_type === "private_residence_reset";
  const isHoardingCampaign = !isResidence && isHoardingCampaignLead(lead);
  const isEstateCampaign = !isResidence && !isHoardingCampaign && isEstateCampaignLead(lead);
  const callback =
    lead.callbackWindow === "business-hours"
      ? "Because your request arrived during published business hours, our operating standard is to call within 5 minutes."
      : "Because your request arrived outside published business hours, we will call during the next business window.";
  return sendResend(env, {
    to: email,
    replyTo: CUSTOMER_REPLY_TO,
    subject: isResidence
      ? "We received your Private Residence Reset assessment"
      : isHoardingCampaign || isEstateCampaign
        ? "We received your walkthrough request"
        : "We received your Aseptaclean assessment request",
    // The customer sees the short code and not the UUID. Giving them two references for
    // one request invites them to quote the wrong one; the UUID stays internal.
    //
    // The campaign branch mirrors the campaign form's own subtext ("discuss the situation and
    // arrange a free walkthrough") so the button, the thank-you page and this email say the same
    // thing. It states the non-appointment boundary outright, because a visitor who just clicked
    // "Request a Free Walkthrough" is the one most likely to read a confirmation as a booking.
    text: isResidence
      ? `Thank you, ${lead.data.full_name}.\n\nWe received your Private Residence Reset assessment. Your confirmation code is ${lead.code} — quote it if you call. ${callback}\n\nWithin one business day, Aseptaclean will review the residence, desired baseline, priority rooms, access, and whether an on-site walkthrough is required.\n\nSubmitting this request does not authorize work, create a service agreement, or reserve a project date.`
      : isHoardingCampaign
        ? `Thank you, ${lead.data.full_name}.\n\nWe received your request. Your confirmation code is ${lead.code} — quote it if you call. ${callback}\n\nAseptaclean will review the information and photos you provided, then contact you to discuss the situation and arrange a free walkthrough.\n\nThis request does not confirm an appointment. Submitting it does not authorize work, create a service agreement, or reserve a project date.`
        // Mirrors the estate campaign form's own subtext and its thank-you body — "contact you to
        // discuss the property and arrange the next step" — so the button, the confirmation page
        // and this message say the same thing. It states the non-booking boundary outright,
        // because someone who has just clicked "Request My Free Walkthrough" is the most likely
        // to read a confirmation as a booked visit.
        : isEstateCampaign
        ? `Thank you, ${lead.data.full_name}.\n\nWe received your request. Your confirmation code is ${lead.code} — quote it if you call. ${callback}\n\nAseptaclean will review what you sent, then contact you to discuss the property and arrange a free walkthrough.\n\nNo need to sort or clean before we speak. This request does not book a crew or confirm an appointment. Submitting it does not authorize work, create a service agreement, or reserve a project date.`
        : `Thank you, ${lead.data.full_name}.\n\nWe received your assessment request. Your confirmation code is ${lead.code} — quote it if you call. ${callback}\n\nAseptaclean will review the information and photos you provided. If we can determine the next step from what you sent, we will explain it. If we need to see more, we may ask for additional photos, speak with you by phone, or recommend an on-site assessment.\n\nSubmitting this request does not authorize work, create a service agreement, or reserve a project date.`
  });
}

export async function sendOwnerSms(env: LeadEnvironment, lead: LeadRecord) {
  if (env.SMS_ALERTS_ENABLED !== "true") {
    return {
      skipped: true,
      detail: "SMS alerts are disabled (SMS_ALERTS_ENABLED is not \"true\"); pending 10DLC approval."
    };
  }
  if (
    !env.TWILIO_ACCOUNT_SID ||
    !env.TWILIO_AUTH_TOKEN ||
    !env.TWILIO_FROM_NUMBER ||
    !env.LEAD_ALERT_PHONE
  ) {
    return { skipped: true, detail: "Twilio credentials are not configured." };
  }
  const callbackPhone = String(lead.data.phone).replace(/[^\d+]/g, "");
  const isResidence = lead.data.offer_type === "private_residence_reset";
  const source = field(lead.data.entry_route || lead.data.landing_page || lead.data.submitted_from);
  const body = new URLSearchParams({
    From: env.TWILIO_FROM_NUMBER,
    To: env.LEAD_ALERT_PHONE,
    Body: !isDetailedLead(lead)
      ? `New quick request ${lead.id}: ${lead.data.full_name}, ${field(lead.data.property_detail || lead.data.additional_notes)}. ${lead.receivedAt}. Source: ${source}. Call: tel:${callbackPhone}`
      : isResidence
      ? `New PRIVATE RESIDENCE RESET ${lead.id}: ${lead.data.full_name}, ${field(lead.data.property_city)}, ${field(lead.data.property_situation)}; priorities: ${field(lead.data.priority_rooms)}. ${lead.receivedAt}. Source: ${source}. Call: tel:${callbackPhone}`
      : `New ASSESSMENT REQUEST ${lead.id}: ${lead.data.full_name}, ZIP ${field(lead.data.property_zip)}, ${field(lead.data.property_situation)}. ${lead.receivedAt}. Source: ${source}. Call: tel:${callbackPhone}`
  });
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`,
        "content-type": "application/x-www-form-urlencoded"
      },
      body
    }
  );
  if (!response.ok) await providerError(response, "Twilio");
  const result = (await response.json()) as { sid: string };
  return { skipped: false, detail: `Message ${result.sid}` };
}

export function sendOwnerFallbackEmail(
  env: LeadEnvironment,
  lead: LeadRecord,
  smsStatus: string
) {
  if (!env.OWNER_ALERT_EMAIL) {
    return Promise.resolve({
      skipped: true,
      detail: "Owner alert email is not configured."
    });
  }
  const isResidence = lead.data.offer_type === "private_residence_reset";
  const offerLabel = !isDetailedLead(lead)
    ? "Quick request"
    : isResidence
    ? "Private Residence Reset"
    : "Assessment request";
  // SMS_ALERTS_ENABLED off (the default until 10DLC approval) means email is the sole,
  // expected notification channel — not a degraded fallback — so the copy must not read
  // as an incident. Any other skip/failure reason means SMS was actually attempted.
  const smsIsByDesign = env.SMS_ALERTS_ENABLED !== "true";
  const callbackPhone = String(lead.data.phone).replace(/[^\d+]/g, "");
  // Replying to a lead alert should reach the lead, not Aseptaclean. The short form
  // collects no email, so this is absent on that path and no Reply-To is set.
  const customerEmail = typeof lead.data.email === "string" ? lead.data.email : "";
  // The subject is read on a phone lock screen before the message is ever opened, so it
  // leads with the two facts that decide whether to pick up — where the property is and
  // what is wrong with it — and trails the code. Absent parts are dropped entirely:
  // field()'s "Not supplied" is honest in a body but wastes the only line that gets read.
  // Situation falls back to the offer label so the short form, which collects neither a
  // city nor a situation, still says something more than its own code.
  const subjectPart = (value: LeadRecord["data"][string] | undefined, max: number) => {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
  };
  const subject = [
    smsIsByDesign ? "New lead" : "SMS fallback",
    subjectPart(lead.data.property_zip, 24),
    subjectPart(lead.data.property_situation, 34) || offerLabel,
    lead.code
  ]
    .filter(Boolean)
    .join(" · ");
  const leadSummary = [
    `Confirmation code: ${lead.code}`,
    `Request ID: ${lead.id}`,
    `Name: ${lead.data.full_name}`,
    `Phone: ${lead.data.phone}`,
    `Email: ${field(lead.data.email)}`,
    `ZIP: ${field(lead.data.property_zip)}`,
    `Situation: ${field(lead.data.property_situation)}`,
    ...propertyStatusLines(lead),
    ...(!isResidence
      ? [`Description: ${field(lead.data.property_detail || lead.data.additional_notes)}`]
      : []),
    ...uploadLines(lead),
    `Callback window: ${lead.callbackWindow}`,
    ...attributionLines(lead),
    `Call: tel:${callbackPhone}`
  ].join("\n");
  return sendResend(env, {
    to: env.OWNER_ALERT_EMAIL,
    ...(customerEmail ? { replyTo: customerEmail } : {}),
    subject,
    text: smsIsByDesign
      ? `New ${offerLabel} lead received. (SMS owner alerts are off pending 10DLC approval; email is the active notification channel.)\n\n${leadSummary}`
      : `The owner SMS alert did not deliver: ${smsStatus}\n\n${leadSummary}`
  });
}
