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
  if (!email) {
    return {
      skipped: true,
      detail: "No email was collected on this submission; HubSpot contact sync needs one."
    };
  }

  const headers = {
    authorization: `Bearer ${env.HUBSPOT_ACCESS_TOKEN}`,
    "content-type": "application/json"
  };
  const name = String(lead.data.full_name).trim().split(/\s+/);
  const contactProperties = {
    email,
    firstname: name[0] ?? "",
    lastname: name.slice(1).join(" "),
    phone: String(lead.data.phone),
    city: field(lead.data.property_city)
  };
  const searchResponse = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: email }] }
        ],
        limit: 1
      })
    }
  );
  if (!searchResponse.ok) await providerError(searchResponse, "HubSpot contact search");
  const search = (await searchResponse.json()) as {
    results?: Array<{ id: string }>;
  };
  let contactId = search.results?.[0]?.id;
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
          `Request ID: ${lead.id}`,
          `Description: ${field(lead.data.property_detail || lead.data.additional_notes)}`,
          `Private uploads: ${lead.files.length}`
        ]
      : isResidence
      ? [
          `Offer: Private Residence Reset`,
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
          `Private uploads: ${lead.files.length}`
        ]
      : [
          `Offer: Handoff Reset`,
          `Request ID: ${lead.id}`,
          `Property: ${field(lead.data.property_address)}, ${field(lead.data.property_city)}`,
          `Situation: ${field(lead.data.property_situation)}`,
          `Deadline: ${field(lead.data.desired_completion_date)}`,
          `Authority: ${field(lead.data.authority_to_approve)}`,
          `Contents removal: ${field(lead.data.contents_removal)}`,
          `Heavy cleaning: ${field(lead.data.heavy_cleaning)}`,
          `Known conditions: animal waste=${field(lead.data.animal_waste)}; biological material=${field(lead.data.human_biological_material)}; sharps=${field(lead.data.needles_sharps)}; sewage=${field(lead.data.sewage)}; mold=${field(lead.data.mold)}; pests=${field(lead.data.pest_activity)}`,
          `Must remain: ${field(lead.data.must_remain)}`,
          `Must remove: ${field(lead.data.must_remove)}`,
          `Private uploads: ${lead.files.length}`
        ]
  ).join("\n");
  const dealResponse = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: {
        dealname: isResidence
          ? `Private Residence Reset — ${lead.data.full_name} — ${field(lead.data.property_city)}`
          : `Handoff Reset — ${lead.data.full_name} — ${field(lead.data.property_city)}`,
        pipeline: env.HUBSPOT_PIPELINE_ID,
        dealstage: env.HUBSPOT_DEAL_STAGE_ID,
        offer_type: isResidence
          ? "Private Residence Reset"
          : "Handoff Reset",
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

async function sendResend(
  env: LeadEnvironment,
  message: { to: string; subject: string; text: string }
) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM_ADDRESS) {
    return { skipped: true, detail: "Resend credentials are not configured." };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ from: env.EMAIL_FROM_ADDRESS, ...message })
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
  const callback =
    lead.callbackWindow === "business-hours"
      ? "Because your request arrived during published business hours, our operating standard is to call within 5 minutes."
      : "Because your request arrived outside published business hours, we will call during the next business window.";
  return sendResend(env, {
    to: email,
    subject: isResidence
      ? "We received your Private Residence Reset assessment"
      : "We received your Aseptaclean Handoff Plan request",
    text: isResidence
      ? `Thank you, ${lead.data.full_name}.\n\nWe received your Private Residence Reset assessment (${lead.id}). ${callback}\n\nWithin one business day, Aseptaclean will review the residence, desired baseline, priority rooms, access, and whether an on-site walkthrough is required.\n\nSubmitting this request does not authorize work, create a service agreement, or reserve a project date.`
      : `Thank you, ${lead.data.full_name}.\n\nWe received your request (${lead.id}). ${callback}\n\nWithin one business day, Aseptaclean will provide a fit decision, preliminary scope direction, and clear next step.\n\nSubmitting this request does not authorize work, create a service agreement, or reserve a project date.`
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
      : `New HANDOFF RESET ${lead.id}: ${lead.data.full_name}, ${field(lead.data.property_city)}, ${field(lead.data.property_situation)}. ${lead.receivedAt}. Source: ${source}. Call: tel:${callbackPhone}`
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
    : "Handoff Reset";
  // SMS_ALERTS_ENABLED off (the default until 10DLC approval) means email is the sole,
  // expected notification channel — not a degraded fallback — so the copy must not read
  // as an incident. Any other skip/failure reason means SMS was actually attempted.
  const smsIsByDesign = env.SMS_ALERTS_ENABLED !== "true";
  const callbackPhone = String(lead.data.phone).replace(/[^\d+]/g, "");
  const leadSummary = [
    `Request ID: ${lead.id}`,
    `Name: ${lead.data.full_name}`,
    `Phone: ${lead.data.phone}`,
    `Email: ${field(lead.data.email)}`,
    `City: ${field(lead.data.property_city)}`,
    `Situation: ${field(lead.data.property_situation)}`,
    ...(!isDetailedLead(lead)
      ? [`Description: ${field(lead.data.property_detail || lead.data.additional_notes)}`]
      : []),
    `Callback window: ${lead.callbackWindow}`,
    `Submitted: ${lead.receivedAt}`,
    `Call: tel:${callbackPhone}`
  ].join("\n");
  return sendResend(env, {
    to: env.OWNER_ALERT_EMAIL,
    subject: smsIsByDesign
      ? `New lead: ${offerLabel} ${lead.id}`
      : `SMS fallback: ${offerLabel} ${lead.id}`,
    text: smsIsByDesign
      ? `New ${offerLabel} lead received. (SMS owner alerts are off pending 10DLC approval; email is the active notification channel.)\n\n${leadSummary}`
      : `The owner SMS alert did not deliver: ${smsStatus}\n\n${leadSummary}`
  });
}
