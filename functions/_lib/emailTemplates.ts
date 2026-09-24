import type { LeadRecord } from "./lead";

export interface RenderedEmail {
  fromName: "Aseptaclean" | "Aseptaclean Website";
  subject: string;
  text: string;
  html: string;
}

const BRAND = "Aseptaclean";
const BRAND_LOGO_URL = "https://aseptaclean.com/assets/brand/aseptaclean-wordmark.png";
const PHONE_DISPLAY = "(408) 785-7588";
const PHONE_URI = "tel:+14087857588";
const NOT_CAPTURED = "Not captured";

const scalar = (value: LeadRecord["data"][string] | undefined) =>
  typeof value === "string" ? value.trim() : "";

export const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const htmlLines = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");
const headerText = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
const firstName = (value: string) => value.trim().split(/\s+/)[0] || "there";
const dialablePhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  return digits.length >= 11 && digits.length <= 15 ? `tel:+${digits}` : "";
};

const sourcePage = (lead: LeadRecord) =>
  scalar(lead.data.entry_route) ||
  scalar(lead.data.landing_page) ||
  scalar(lead.data.submitted_from);

const serviceLabels: Record<string, string> = {
  "Hoarding or heavy clutter": "Hoarding Cleanup",
  "Severe property condition": "Extreme Cleaning",
  "Detailed deep cleaning": "Detailed Deep Cleaning",
  "Crime scene or trauma cleanup": "Crime Scene & Trauma Cleanup",
  "Rodent droppings or animal waste": "Rodent Droppings & Animal Waste Cleanup",
  "Inherited or estate property": "Estate Cleanout",
  "Move-in cleaning": "Detailed Deep Cleaning",
  "Move-out cleaning": "Detailed Deep Cleaning",
  "Not sure": "Cleanup"
};

export const serviceLabelFor = (lead: LeadRecord) => {
  if (lead.data.offer_type === "private_residence_reset") return "Private Residence Reset";
  const page = sourcePage(lead);
  if (page.startsWith("/estate-cleanout-san-jose/")) return "Estate Cleanout";
  if (page.startsWith("/hoarding-cleanup-san-jose/")) return "Hoarding Cleanup";
  if (page.startsWith("/extreme-cleaning-san-jose/")) return "Extreme Cleaning";
  if (page.startsWith("/deep-cleaning-san-jose/")) return "Detailed Deep Cleaning";
  if (page.startsWith("/crime-scene-trauma-cleanup-san-jose/")) {
    return "Crime Scene & Trauma Cleanup";
  }
  if (page.startsWith("/rodent-dropping-cleanup-san-jose/")) {
    return "Rodent Droppings & Animal Waste Cleanup";
  }
  const submitted = scalar(lead.data.property_situation);
  return serviceLabels[submitted] || submitted || "Cleanup";
};

const customerMessage = (lead: LeadRecord) =>
  scalar(lead.data.property_detail) || scalar(lead.data.additional_notes);

const customerRole = (lead: LeadRecord) =>
  scalar(lead.data.campaign_role) ||
  scalar(lead.data.estate_role) ||
  scalar(lead.data.relationship_to_property);

const pacificTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return iso;
  return `${new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  })
    .format(date)
    .replace(" at ", " · ")} Pacific`;
};

const formLabel = (lead: LeadRecord) => {
  const page = sourcePage(lead);
  let label = "Website inquiry";
  if (page.startsWith("/contact/")) label = "Contact page";
  else if (page === "/" || page.startsWith("/#")) label = "Homepage";
  else if (page.includes("/assessment/")) label = "Campaign assessment page";
  else if (page === "/private-residence-reset/") label = "Private Residence Reset page";
  else if (page) label = "Service page";
  const version = scalar(lead.data.form_version);
  return version ? `${label} · form ${version}` : label;
};

const attribution = (lead: LeadRecord) => {
  const values = [
    ["Source", scalar(lead.data.utm_source)],
    ["Medium", scalar(lead.data.utm_medium)],
    ["Campaign", scalar(lead.data.utm_campaign)],
    ["Term", scalar(lead.data.utm_term)],
    ["Content", scalar(lead.data.utm_content)],
    ["GCLID", scalar(lead.data.gclid)],
    ["Referrer", scalar(lead.data.referrer)]
  ].filter((entry) => entry[1]);
  return values.length ? values.map(([key, value]) => `${key}: ${value}`).join(" · ") : NOT_CAPTURED;
};

const photoStatus = (lead: LeadRecord) => {
  const uploadState = lead.delivery.uploads?.state;
  if (uploadState === "failed") return "Upload failed; no photo is available.";
  if (!lead.files.length) return "None attached";
  return `${lead.files.length} private attachment${lead.files.length === 1 ? "" : "s"} received`;
};

const photoReferences = (lead: LeadRecord) =>
  lead.files.map(
    (file, index) =>
      `${index + 1}. ${file.originalName} — protected R2 object ${file.key} (${file.contentType}, ${file.size} bytes)`
  );

const consentStatus = (lead: LeadRecord) => {
  const state = scalar(lead.data.privacy_consent) === "yes" ? "Checked" : "Not recorded";
  const version = scalar(lead.data.form_version);
  return [state, version ? `form version ${version}` : "text version not separately recorded", pacificTime(lead.receivedAt)].join(" · ");
};

const confirmationStatus = (lead: LeadRecord) => {
  if (!scalar(lead.data.email)) return "not requested (no customer email)";
  const state = lead.delivery.customerEmail?.state;
  if (state === "succeeded") return "sent";
  if (state === "failed") return "not sent (delivery failed)";
  if (state === "skipped") return "not sent (provider unavailable)";
  return "pending";
};

const shell = (content: string, preview: string) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(preview)}</title>
  <style>
    :root { color-scheme: light only; }
    @media only screen and (max-width:620px) {
      .ac-pad { padding:25px 22px !important; }
      .ac-title { font-size:26px !important; }
      .ac-phone { font-size:25px !important; }
      .ac-action { display:block !important; margin-right:0 !important; text-align:center !important; }
      .ac-label { width:100px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#eef2f5;color:#122840;color-scheme:light;font-family:Inter,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eef2f5;border-collapse:collapse;">
    <tr><td align="center" style="padding:28px 12px 40px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:710px;border-collapse:collapse;background:#ffffff;border-top:5px solid #1c355e;">
        <tr><td class="ac-pad" style="padding:35px 43px;background:#ffffff;color:#122840;">
          ${content}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const brandHtml = `<div style="font-size:23px;line-height:1.2;font-weight:700;letter-spacing:-0.8px;color:#1c355e;">${BRAND}</div>`;
const brandLogoHtml = `<a href="https://aseptaclean.com/" aria-label="Aseptaclean home" style="display:inline-block;text-decoration:none;"><img src="${BRAND_LOGO_URL}" width="209" alt="Aseptaclean" style="display:block;width:209px;max-width:100%;height:auto;border:0;"></a>`;
const dividerHtml = `<div style="border-top:1px solid #d9e1e8;margin:25px 0;height:1px;line-height:1px;">&nbsp;</div>`;
const headingHtml = (value: string) =>
  `<h2 class="ac-title" style="margin:30px 0 22px;font-size:29px;line-height:1.2;letter-spacing:-0.7px;font-weight:650;color:#122840;">${escapeHtml(value)}</h2>`;
const sectionHeadingHtml = (value: string) =>
  `<h3 style="margin:0 0 12px;font-size:15px;line-height:1.4;font-weight:650;color:#122840;">${escapeHtml(value)}</h3>`;
const paragraphHtml = (value: string, extra = "") =>
  `<p style="margin:0 0 17px;font-size:15px;line-height:1.75;color:#536779;${extra}">${htmlLines(value)}</p>`;
const detailsHtml = (rows: Array<[string, string]>) => `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin:0 0 20px;border-collapse:collapse;">
  ${rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `<tr>
    <td class="ac-label" width="126" valign="top" style="width:126px;padding:7px 16px 7px 0;font-size:14px;line-height:1.5;color:#536779;">${escapeHtml(label)}</td>
    <td valign="top" style="padding:7px 0;font-size:14px;line-height:1.5;font-weight:550;color:#122840;overflow-wrap:anywhere;word-break:break-word;">${value}</td>
  </tr>`
    )
    .join("\n  ")}
</table>`;

export const buildCustomerConfirmationEmail = (lead: LeadRecord): RenderedEmail => {
  const name = scalar(lead.data.full_name);
  const phone = scalar(lead.data.phone);
  const zip = scalar(lead.data.property_zip);
  const service = serviceLabelFor(lead);
  const message = customerMessage(lead);
  const role = customerRole(lead);
  const subject = headerText(`We received your ${service.toLocaleLowerCase("en-US")} inquiry | ${BRAND}`);
  const details: Array<[string, string]> = [
    ["Service", escapeHtml(service)],
    ...(role ? [["Role", escapeHtml(role)] as [string, string]] : []),
    ...(zip ? [["Property ZIP", escapeHtml(zip)] as [string, string]] : []),
    ["Contact number", escapeHtml(phone)]
  ];

  const text = [
    BRAND,
    "",
    "We received your inquiry.",
    "",
    `Hi ${firstName(name)},`,
    "",
    "Thank you for reaching out. We’ll review what you shared and contact you to discuss the property and the next step.",
    "",
    `Your inquiry · ${lead.code}`,
    `Service: ${service}`,
    ...(role ? [`Role: ${role}`] : []),
    ...(zip ? [`Property ZIP: ${zip}`] : []),
    ...(phone ? [`Contact number: ${phone}`] : []),
    ...(message ? ["", "What you shared", message] : []),
    "",
    `Need to add something? Reply to this email or call ${PHONE_DISPLAY}.`,
    "",
    "Thank you,",
    BRAND,
    "South Bay & Peninsula",
    "",
    "This email confirms receipt of your inquiry. It does not book an assessment or authorize work."
  ].join("\n");

  const html = shell(
    [
      brandLogoHtml,
      headingHtml("We received your inquiry."),
      paragraphHtml(`Hi ${firstName(name)},`),
      paragraphHtml("Thank you for reaching out. We’ll review what you shared and contact you to discuss the property and the next step."),
      dividerHtml,
      sectionHeadingHtml(`Your inquiry · ${lead.code}`),
      detailsHtml(details),
      ...(message
        ? [sectionHeadingHtml("What you shared"), paragraphHtml(message, "border-left:2px solid #a8b8c8;padding-left:17px;")]
        : []),
      dividerHtml,
      `<p style="margin:0 0 17px;font-size:15px;line-height:1.75;color:#536779;">Need to add something? Reply to this email or call <a href="${PHONE_URI}" style="color:#1c355e;text-decoration:underline;">${PHONE_DISPLAY}</a>.</p>`,
      `<p style="margin:0 0 17px;font-size:15px;line-height:1.75;color:#536779;">Thank you,<br><strong style="color:#122840;">${BRAND}</strong><br>South Bay &amp; Peninsula</p>`,
      `<p style="margin:0;font-size:12px;line-height:1.6;color:#647587;">This email confirms receipt of your inquiry. It does not book an assessment or authorize work.</p>`
    ].join(""),
    `We received your ${service} inquiry.`
  );

  return { fromName: "Aseptaclean", subject, text, html };
};

export const buildOwnerLeadNotificationEmail = (
  lead: LeadRecord,
  smsStatus: string
): RenderedEmail => {
  const name = scalar(lead.data.full_name);
  const email = scalar(lead.data.email);
  const phone = scalar(lead.data.phone);
  const phoneHref = dialablePhone(phone);
  const zip = scalar(lead.data.property_zip);
  const service = serviceLabelFor(lead);
  const message = customerMessage(lead);
  const role = customerRole(lead);
  const propertyStatus = scalar(lead.data.property_status);
  const estateContents = scalar(lead.data.estate_contents_level);
  const estateTimeline = scalar(lead.data.estate_timeline);
  const page = sourcePage(lead) || NOT_CAPTURED;
  const photos = photoStatus(lead);
  const references = photoReferences(lead);
  const received = pacificTime(lead.receivedAt);
  const confirmation = confirmationStatus(lead);
  const replyLine = email ? `Reply goes to ${firstName(name)}.` : "No customer reply address was supplied.";
  const smsLine = smsStatus ? `Owner SMS: ${smsStatus}` : "";
  const subject = headerText(
    scalar(lead.data.campaign_context)
      ? `New lead: ${service} · ${name}`
      : `New lead: ${service} · ${zip || "ZIP not supplied"} · ${name}`
  );
  const emailHref = email ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Your Aseptaclean inquiry")}` : "";

  const detailRows: Array<[string, string]> = [
    ["Reference", escapeHtml(lead.code)],
    ["Service", escapeHtml(service)],
    ...(propertyStatus
      ? [["Property status", escapeHtml(propertyStatus)] as [string, string]]
      : []),
    ...(role ? [["Role", escapeHtml(role)] as [string, string]] : []),
    ...(estateContents ? [["Contents level", escapeHtml(estateContents)] as [string, string]] : []),
    ...(estateTimeline ? [["Timeline", escapeHtml(estateTimeline)] as [string, string]] : []),
    ["Received", escapeHtml(received)],
    ["Email", email ? `<a href="mailto:${escapeHtml(encodeURIComponent(email))}" style="color:#1c355e;text-decoration:underline;">${escapeHtml(email)}</a>` : "Not supplied"],
    ["Form", escapeHtml(formLabel(lead))],
    ["Page", escapeHtml(page)],
    ["Attribution", escapeHtml(attribution(lead))],
    ["Photos", escapeHtml(photos)],
    ["Contact consent", escapeHtml(consentStatus(lead))]
  ];

  const text = [
    BRAND,
    "",
    `New ${service.toLocaleLowerCase("en-US")} inquiry.`,
    "",
    `Name: ${name}`,
    ...(zip ? [`Property ZIP: ${zip}`] : []),
    `Phone: ${phone}`,
    ...(phoneHref ? [`Call: ${phoneHref}`] : []),
    ...(email ? [`Email: ${email}`] : []),
    ...(propertyStatus ? [`Property status: ${propertyStatus}`] : []),
    ...(role ? [`Role: ${role}`] : []),
    ...(estateContents ? [`Contents level: ${estateContents}`] : []),
    ...(estateTimeline ? [`Timeline: ${estateTimeline}`] : []),
    ...(message ? ["", "Customer message", message] : []),
    "",
    "Lead details",
    `Reference: ${lead.code}`,
    `Service: ${service}`,
    `Received: ${received}`,
    `Form: ${formLabel(lead)}`,
    `Page: ${page}`,
    `Attribution: ${attribution(lead)}`,
    `Photos: ${photos}`,
    ...references,
    `Contact consent: ${consentStatus(lead)}`,
    "",
    `${replyLine} Customer confirmation: ${confirmation}. No appointment booked.`,
    ...(smsLine ? [smsLine] : [])
  ].join("\n");

  const actions = [
    phoneHref
      ? `<a class="ac-action" href="${escapeHtml(phoneHref)}" style="display:inline-block;margin:5px 8px 16px 0;padding:12px 18px;background:#1c355e;color:#ffffff;text-decoration:none;font-size:14px;line-height:1.4;font-weight:600;">Call ${escapeHtml(firstName(name))}</a>`
      : "",
    email
      ? `<a class="ac-action" href="${escapeHtml(emailHref)}" style="display:inline-block;margin:5px 0 16px;padding:11px 18px;background:#ffffff;color:#1c355e;border:1px solid #b8c7d4;text-decoration:none;font-size:14px;line-height:1.4;font-weight:600;">Email ${escapeHtml(firstName(name))}</a>`
      : ""
  ].join("");

  const referenceHtml = references.length
    ? `<ul style="margin:8px 0 20px;padding-left:22px;color:#536779;font-size:12px;line-height:1.6;">${references
        .map((reference) => `<li style="margin:0 0 5px;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(reference)}</li>`)
        .join("")}</ul>`
    : "";

  const html = shell(
    [
      brandHtml,
      headingHtml(`New ${service.toLocaleLowerCase("en-US")} inquiry.`),
      `<p style="margin:0 0 12px;font-size:15px;line-height:1.75;color:#536779;"><strong style="color:#122840;">${escapeHtml(name)}</strong>${zip ? `<br>Property ZIP: ${escapeHtml(zip)}` : ""}</p>`,
      phoneHref
        ? `<a class="ac-phone" href="${escapeHtml(phoneHref)}" style="display:inline-block;margin:0 0 8px;font-size:29px;line-height:1.25;font-weight:650;letter-spacing:-0.7px;color:#1c355e;text-decoration:none;">${escapeHtml(phone)}</a>`
        : `<p style="margin:0 0 8px;font-size:15px;color:#536779;">Phone not supplied</p>`,
      `<div>${actions}</div>`,
      ...(message ? [dividerHtml, sectionHeadingHtml("Customer message"), paragraphHtml(message)] : []),
      dividerHtml,
      sectionHeadingHtml("Lead details"),
      detailsHtml(detailRows),
      referenceHtml,
      `<p style="margin:0;font-size:12px;line-height:1.6;color:#647587;">${escapeHtml(replyLine)} Customer confirmation: ${escapeHtml(confirmation)}. No appointment booked.${smsLine ? `<br>${escapeHtml(smsLine)}` : ""}</p>`
    ].join(""),
    `New ${service} lead from ${name}.`
  );

  return { fromName: "Aseptaclean Website", subject, text, html };
};
