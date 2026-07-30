import type { LeadEnvironment, LeadRecord } from "./lead";

const providerError = async (response: Response, provider: string) => {
  const body = (await response.text()).slice(0, 500);
  throw new Error(`${provider} returned ${response.status}: ${body}`);
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

  const headers = {
    authorization: `Bearer ${env.HUBSPOT_ACCESS_TOKEN}`,
    "content-type": "application/json"
  };
  const email = String(lead.data.email);
  const name = String(lead.data.full_name).trim().split(/\s+/);
  const contactProperties = {
    email,
    firstname: name[0] ?? "",
    lastname: name.slice(1).join(" "),
    phone: String(lead.data.phone),
    city: String(lead.data.property_city)
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

  const summary = [
    `Request ID: ${lead.id}`,
    `Property: ${lead.data.property_address}, ${lead.data.property_city}`,
    `Situation: ${lead.data.property_situation}`,
    `Deadline: ${lead.data.desired_completion_date}`,
    `Authority: ${lead.data.authority_to_approve}`,
    `Contents removal: ${lead.data.contents_removal}`,
    `Heavy cleaning: ${lead.data.heavy_cleaning}`,
    `Known conditions: animal waste=${lead.data.animal_waste}; biological material=${lead.data.human_biological_material}; sharps=${lead.data.needles_sharps}; sewage=${lead.data.sewage}; mold=${lead.data.mold}; pests=${lead.data.pest_activity}`,
    `Must remain: ${lead.data.must_remain}`,
    `Must remove: ${lead.data.must_remove}`,
    `Private uploads: ${lead.files.length}`
  ].join("\n");
  const dealResponse = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers,
    body: JSON.stringify({
      properties: {
        dealname: `New Request — ${lead.data.property_city} — ${lead.data.full_name}`,
        pipeline: env.HUBSPOT_PIPELINE_ID,
        dealstage: env.HUBSPOT_DEAL_STAGE_ID,
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
  const callback =
    lead.callbackWindow === "business-hours"
      ? "Because your request arrived during published business hours, our operating standard is to call within 5 minutes."
      : "Because your request arrived outside published business hours, we will call during the next business window.";
  return sendResend(env, {
    to: String(lead.data.email),
    subject: "We received your Aseptaclean Handoff Plan request",
    text: `Thank you, ${lead.data.full_name}.\n\nWe received your request (${lead.id}). ${callback}\n\nWithin one business day, Aseptaclean will provide a fit decision, preliminary scope direction, and clear next step.\n\nSubmitting this request does not authorize work, create a service agreement, or reserve a project date.`
  });
}

export async function sendOwnerSms(env: LeadEnvironment, lead: LeadRecord) {
  if (
    !env.TWILIO_ACCOUNT_SID ||
    !env.TWILIO_AUTH_TOKEN ||
    !env.TWILIO_FROM_NUMBER ||
    !env.LEAD_ALERT_PHONE
  ) {
    return { skipped: true, detail: "Twilio credentials are not configured." };
  }
  const callbackPhone = String(lead.data.phone).replace(/[^\d+]/g, "");
  const body = new URLSearchParams({
    From: env.TWILIO_FROM_NUMBER,
    To: env.LEAD_ALERT_PHONE,
    Body: `New Handoff request ${lead.id}: ${lead.data.full_name}, ${lead.data.property_city}, ${lead.data.property_situation}. ${lead.receivedAt}. Source: ${lead.data.landing_page || lead.data.submitted_from}. Call: tel:${callbackPhone}`
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
  smsFailure: string
) {
  if (!env.OWNER_ALERT_EMAIL) {
    return Promise.resolve({
      skipped: true,
      detail: "Owner alert email is not configured."
    });
  }
  return sendResend(env, {
    to: env.OWNER_ALERT_EMAIL,
    subject: `SMS fallback: new Handoff request ${lead.id}`,
    text: `The owner SMS alert failed: ${smsFailure}\n\n${lead.data.full_name}\n${lead.data.phone}\n${lead.data.email}\n${lead.data.property_city}\n${lead.data.property_situation}\nSubmitted: ${lead.receivedAt}`
  });
}
