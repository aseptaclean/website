import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const args = new Set(process.argv.slice(2));
const modeIndex = process.argv.indexOf("--mode");
const mode =
  modeIndex >= 0 ? process.argv[modeIndex + 1] : process.env.PUBLIC_DEPLOYMENT_ENV;
const projectRoot = process.cwd();

function parseEnvFile(path) {
  if (!existsSync(path)) return {};

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      })
  );
}

const fileValues = {
  ...parseEnvFile(resolve(projectRoot, ".env")),
  ...parseEnvFile(resolve(projectRoot, `.env.${mode || "production"}`))
};
const values = { ...fileValues, ...process.env };

if (mode !== "production" && !args.has("--production")) {
  console.log(`Environment validation skipped for non-production mode "${mode || "local"}".`);
  process.exit(0);
}

const fullProductionRequired = [
  "PUBLIC_SITE_URL",
  "PUBLIC_BUSINESS_NAME",
  "PUBLIC_LEGAL_NAME",
  "PUBLIC_PHONE",
  "PUBLIC_SMS_NUMBER",
  "PUBLIC_EMAIL",
  "PUBLIC_FORM_ENDPOINT",
  "PUBLIC_PRIVACY_CONTACT",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "PUBLIC_TERMLY_WEBSITE_UUID",
  "PUBLIC_TERMLY_CONSENT_ENABLED",
  "PUBLIC_SERVICE_AREA",
  "PUBLIC_RESPONSE_TIME",
  "PUBLIC_BUSINESS_HOURS",
  "PUBLIC_ASSESSMENT_FEE",
  "PUBLIC_FOUNDER_NAME",
  "PUBLIC_TSWMP_STATUS",
  "PUBLIC_DEPLOYMENT_ENV",
  "PUBLIC_FORM_ENABLED",
  "TURNSTILE_SECRET_KEY",
  "HUBSPOT_ACCESS_TOKEN",
  "HUBSPOT_PIPELINE_ID",
  "HUBSPOT_DEAL_STAGE_ID",
  "RESEND_API_KEY",
  "EMAIL_FROM_ADDRESS",
  "OWNER_ALERT_EMAIL"
  // TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER / LEAD_ALERT_PHONE are
  // intentionally NOT required here. SMS owner alerts are gated behind SMS_ALERTS_ENABLED
  // pending Twilio 10DLC campaign approval (docs/05-DECISIONS-LOG.md); until that flag is
  // "true", email (Resend) is the sole notification path and Twilio credentials do not need
  // to exist for a production build to ship. See the SMS_ALERTS_ENABLED check below.
];
const privatePreviewRequired = [
  "PUBLIC_SITE_URL",
  "PUBLIC_BUSINESS_NAME",
  "PUBLIC_LEGAL_NAME",
  "PUBLIC_PHONE",
  "PUBLIC_SMS_NUMBER",
  "PUBLIC_EMAIL",
  "PUBLIC_SERVICE_AREA",
  "PUBLIC_RESPONSE_TIME",
  "PUBLIC_BUSINESS_HOURS",
  "PUBLIC_ASSESSMENT_FEE",
  "PUBLIC_FOUNDER_NAME",
  "PUBLIC_TSWMP_STATUS",
  "PUBLIC_DEPLOYMENT_ENV",
  "PUBLIC_LAUNCH_MODE",
  "PUBLIC_FORM_ENABLED"
];
const privatePreview = values.PUBLIC_LAUNCH_MODE === "preview";
const required = privatePreview
  ? privatePreviewRequired
  : fullProductionRequired;

const placeholderPattern =
  /(?:owner (?:input|verification) required|replace[-_ ]?me|example\.com|\{\{.+\}\})/i;
const missing = required.filter((key) => {
  const value = values[key]?.trim();
  return !value || placeholderPattern.test(value);
});

const errors = [];
if (missing.length) {
  errors.push(`Missing or placeholder values: ${missing.join(", ")}`);
}

const siteUrl = values.PUBLIC_SITE_URL;
if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== "https:") errors.push("PUBLIC_SITE_URL must use HTTPS.");
    if (url.origin !== "https://aseptaclean.com") {
      errors.push("PUBLIC_SITE_URL must use the approved https://aseptaclean.com origin.");
    }
  } catch {
    errors.push("PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

const formEndpoint = values.PUBLIC_FORM_ENDPOINT;
if (formEndpoint) {
  if (formEndpoint.startsWith("/")) {
    if (formEndpoint !== "/api/lead") {
      errors.push("Relative PUBLIC_FORM_ENDPOINT must equal /api/lead.");
    }
  } else {
    try {
      const url = new URL(formEndpoint);
      if (url.protocol !== "https:") errors.push("PUBLIC_FORM_ENDPOINT must use HTTPS.");
    } catch {
      errors.push("PUBLIC_FORM_ENDPOINT must be /api/lead or a valid HTTPS URL.");
    }
  }
}

if (values.PUBLIC_PHONE) {
  const phoneDigits = values.PUBLIC_PHONE.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.push("PUBLIC_PHONE must contain 10–15 digits.");
  }
}

for (const key of ["PUBLIC_EMAIL", "PUBLIC_PRIVACY_CONTACT"]) {
  if (values[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[key])) {
    errors.push(`${key} must be a valid email address.`);
  }
}

for (const key of ["EMAIL_FROM_ADDRESS", "OWNER_ALERT_EMAIL"]) {
  if (values[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[key])) {
    errors.push(`${key} must be a valid email address.`);
  }
}

for (const key of [
  "PUBLIC_TERMLY_PRIVACY_URL",
  "PUBLIC_TERMLY_TERMS_URL",
  "PUBLIC_TERMLY_COOKIE_POLICY_URL"
]) {
  if (!values[key]) continue;
  try {
    const url = new URL(values[key]);
    if (url.protocol !== "https:") errors.push(`${key} must use HTTPS.`);
    if (
      url.hostname !== "termly.io" &&
      !url.hostname.endsWith(".termly.io")
    ) {
      errors.push(`${key} must use a Termly-controlled hostname.`);
    }
  } catch {
    errors.push(`${key} must be a valid absolute URL.`);
  }
}

if (
  values.PUBLIC_TERMLY_CONSENT_ENABLED &&
  !["true", "false"].includes(values.PUBLIC_TERMLY_CONSENT_ENABLED)
) {
  errors.push("PUBLIC_TERMLY_CONSENT_ENABLED must be true or false.");
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
for (const key of [
  "PUBLIC_TERMLY_WEBSITE_UUID",
  "PUBLIC_TERMLY_PRIVACY_POLICY_ID",
  "PUBLIC_TERMLY_TERMS_POLICY_ID",
  "PUBLIC_TERMLY_COOKIE_POLICY_ID"
]) {
  if (values[key] && !uuidPattern.test(values[key])) {
    errors.push(`${key} must be a valid UUID copied from Termly.`);
  }
}

if (!privatePreview) {
  const termlyPolicies = [
    [
      "Privacy Policy",
      "PUBLIC_TERMLY_PRIVACY_POLICY_ID",
      "PUBLIC_TERMLY_PRIVACY_URL"
    ],
    [
      "Terms and Conditions",
      "PUBLIC_TERMLY_TERMS_POLICY_ID",
      "PUBLIC_TERMLY_TERMS_URL"
    ],
    [
      "Cookie Policy",
      "PUBLIC_TERMLY_COOKIE_POLICY_ID",
      "PUBLIC_TERMLY_COOKIE_POLICY_URL"
    ]
  ];
  for (const [label, idKey, urlKey] of termlyPolicies) {
    if (!values[idKey] && !values[urlKey]) {
      errors.push(`${label} requires either ${idKey} or ${urlKey}.`);
    }
  }
  if (values.PUBLIC_TERMLY_CONSENT_ENABLED !== "true") {
    errors.push("Public production requires PUBLIC_TERMLY_CONSENT_ENABLED=true.");
  }
}

if (values.SMS_ALERTS_ENABLED === "true") {
  for (const key of [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_FROM_NUMBER",
    "LEAD_ALERT_PHONE"
  ]) {
    if (!values[key]?.trim()) {
      errors.push(`${key} is required when SMS_ALERTS_ENABLED=true.`);
    }
  }
} else if (values.SMS_ALERTS_ENABLED && values.SMS_ALERTS_ENABLED !== "false") {
  errors.push("SMS_ALERTS_ENABLED must be true or false.");
}

if (values.PUBLIC_TSWMP_STATUS && values.PUBLIC_TSWMP_STATUS !== "pending") {
  errors.push("PUBLIC_TSWMP_STATUS must remain \"pending\" until written approval is recorded.");
}

if (privatePreview && values.PUBLIC_FORM_ENABLED !== "false") {
  errors.push("Private preview builds require PUBLIC_FORM_ENABLED=false.");
}
if (!privatePreview && values.PUBLIC_FORM_ENABLED !== "true") {
  errors.push("Public production builds require PUBLIC_FORM_ENABLED=true.");
}

if (
  values.PUBLIC_DEPLOYMENT_ENV &&
  !(
    values.PUBLIC_DEPLOYMENT_ENV === "production" ||
    (privatePreview && values.PUBLIC_DEPLOYMENT_ENV === "staging")
  )
) {
  errors.push(
    "PUBLIC_DEPLOYMENT_ENV must be production, or staging for an explicit private preview."
  );
}

if (errors.length) {
  console.error("Production environment validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production environment validation passed.");
