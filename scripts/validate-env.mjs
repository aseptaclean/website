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
  "PUBLIC_TERMLY_PRIVACY_URL",
  "PUBLIC_TERMLY_TERMS_URL",
  "PUBLIC_SERVICE_AREA",
  "PUBLIC_RESPONSE_TIME",
  "PUBLIC_BUSINESS_HOURS",
  "PUBLIC_ASSESSMENT_FEE",
  "PUBLIC_STARTING_PRICE",
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
  "OWNER_ALERT_EMAIL",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_FROM_NUMBER",
  "LEAD_ALERT_PHONE"
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
  "PUBLIC_STARTING_PRICE",
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

for (const key of ["PUBLIC_TERMLY_PRIVACY_URL", "PUBLIC_TERMLY_TERMS_URL"]) {
  if (!values[key]) continue;
  try {
    const url = new URL(values[key]);
    if (url.protocol !== "https:") errors.push(`${key} must use HTTPS.`);
  } catch {
    errors.push(`${key} must be a valid absolute URL.`);
  }
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
