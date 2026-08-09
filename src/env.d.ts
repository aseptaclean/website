/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_BUSINESS_NAME?: string;
  readonly PUBLIC_LEGAL_NAME?: string;
  readonly PUBLIC_PHONE?: string;
  readonly PUBLIC_SMS_NUMBER?: string;
  readonly PUBLIC_EMAIL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_PRIVACY_CONTACT?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_SERVICE_AREA?: string;
  readonly PUBLIC_RESPONSE_TIME?: string;
  readonly PUBLIC_ASSESSMENT_FEE?: string;
  readonly PUBLIC_STARTING_PRICE?: string;
  readonly PUBLIC_RESIDENCE_STARTING_PRICE?: string;
  readonly PUBLIC_FOUNDER_NAME?: string;
  readonly PUBLIC_INSURANCE_STATUS?: string;
  readonly PUBLIC_BUSINESS_HOURS?: string;
  readonly PUBLIC_GBP_URL?: string;
  readonly PUBLIC_YELP_URL?: string;
  readonly PUBLIC_NEXTDOOR_URL?: string;
  readonly PUBLIC_LOGO_URL?: string;
  readonly PUBLIC_LOGO_REVERSED_URL?: string;
  readonly PUBLIC_SITE_ICON_URL?: string;
  readonly PUBLIC_TSWMP_STATUS?: string;
  readonly PUBLIC_DEPLOYMENT_ENV?: string;
  readonly PUBLIC_LAUNCH_MODE?: string;
  readonly PUBLIC_FORM_ENABLED?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_TERMLY_PRIVACY_URL?: string;
  readonly PUBLIC_TERMLY_TERMS_URL?: string;
  readonly PUBLIC_TERMLY_COOKIE_POLICY_URL?: string;
  readonly PUBLIC_TERMLY_WEBSITE_UUID?: string;
  readonly PUBLIC_TERMLY_PRIVACY_POLICY_ID?: string;
  readonly PUBLIC_TERMLY_TERMS_POLICY_ID?: string;
  readonly PUBLIC_TERMLY_COOKIE_POLICY_ID?: string;
  readonly PUBLIC_TERMLY_CONSENT_ENABLED?: string;
}

interface Window {
  dataLayer?: Array<Record<string, unknown>>;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
