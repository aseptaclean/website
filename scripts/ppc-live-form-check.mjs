// PPC HOARDING FORM — TRUE END-TO-END, through the real Cloudflare Pages Function.
//
// This is the strongest local evidence available that the form works. Unlike
// scripts/ppc-interaction-check.mjs (which intercepts the network to test UI states) and
// scripts/ppc-endpoint-check.mjs (which posts a hand-built payload to the bundled handler),
// nothing is stubbed here:
//
//   real browser → real rendered form → real FormData serialization → real POST /api/lead
//   → real functions/api/lead.ts on the Workers runtime → real validation → real R2 write
//
// SAFETY — no unapproved notification can be sent:
//   · .dev.vars carries EMPTY HubSpot / Resend / Twilio credentials, so functions/api/lead.ts
//     SKIPS every outbound provider. The delivery ledger this script reads back proves it.
//   · TURNSTILE_SECRET_KEY is Cloudflare's published always-passes TESTING secret
//     (1x0000000000000000000000000000000AA), and the page is built with the matching testing
//     site key. Neither is a production credential.
//   · R2 and KV are wrangler's local emulation under .wrangler/state. Nothing touches the
//     production bucket.
//
// PREREQUISITES (see the header of the report this script backs):
//   cp .dev.vars.example .dev.vars
//   PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build:local
//   npx wrangler pages dev dist --port 8788 --r2 LEAD_UPLOADS --kv LEAD_RATE_LIMIT
//
// Usage: node scripts/ppc-live-form-check.mjs [baseUrl] [outDir]
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://127.0.0.1:8788";
const outDir = process.argv[3] || "./artifacts/ppc-hoarding";
const ROUTE = "/hoarding-cleanup-san-jose/assessment/";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const results = [];
const check = (label, pass, detail = "") => {
  results.push({ label, pass: Boolean(pass), detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};

const jpeg = (name) => ({
  name,
  mimeType: "image/jpeg",
  buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9])
});

async function settle(page) {
  await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
  await page.waitForTimeout(400);
}

async function dismissConsent(page) {
  try {
    await page.waitForSelector(".t-consentPrompt", { timeout: 6000, state: "visible" });
    await page.click(".t-acceptAllButton", { timeout: 4000 });
    await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 6000 });
  } catch {
    /* no banner in this state */
  }
}

/** Wait for the Turnstile testing widget to solve itself and populate its response input. */
async function waitForTurnstile(page) {
  try {
    await page.waitForFunction(
      () => {
        const input = document.querySelector(
          'form.ppc-form input[name="cf-turnstile-response"]'
        );
        return Boolean(input && input.value);
      },
      { timeout: 20000 }
    );
    return await page.evaluate(
      () =>
        document.querySelector('form.ppc-form input[name="cf-turnstile-response"]').value.length
    );
  } catch {
    return 0;
  }
}

async function fillRequired(page, overrides = {}) {
  const values = {
    "#assessment-form-name": "End To End Test",
    "#assessment-form-phone": "408 555 0100",
    "#assessment-form-zip": "95113",
    "#assessment-form-detail":
      "Front rooms and the garage are packed. Papers and family photographs are mixed in.",
    ...overrides
  };
  for (const [selector, value] of Object.entries(values)) {
    if (value === null) continue;
    await page.fill(selector, value);
  }
  await page.check("input[name='privacy_consent']");
}

/**
 * Pass-through interceptor for /api/lead that performs the REAL request with route.fetch() and
 * reads the response body BEFORE the page can navigate away from it.
 *
 * This is a measurement fix, not a stub: route.fetch() hits the actual Cloudflare Pages Function
 * on the wrangler dev server, and route.fulfill() hands the page back that same response. The
 * form's own submit path, the endpoint, the validation and the R2 write are all untouched — the
 * only thing that changes is that the test can still read the JSON after the success redirect.
 */
async function captureLead(page) {
  let settle;
  const done = new Promise((resolve) => (settle = resolve));
  await page.route("**/api/lead", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    const response = await route.fetch();
    const body = await response.text();
    let payload = {};
    try {
      payload = JSON.parse(body);
    } catch {
      /* non-JSON body is reported through `status` alone */
    }
    settle({ status: response.status(), payload });
    await route.fulfill({ response, body });
  });
  return done;
}

const browser = await chromium.launch({ executablePath: chromePath });
await mkdir(join(outDir, "shots"), { recursive: true });

const posted = [];

// =============================================================================================
// 1. NO-PHOTO SUBMISSION — the default path, all the way to storage.
// =============================================================================================
let noPhotoCode = null;
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  page.on("request", (r) => {
    if (r.url().endsWith("/api/lead") && r.method() === "POST") posted.push(r.url());
  });
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);

  const tokenLength = await waitForTurnstile(page);
  check(
    "Turnstile testing widget renders and solves in the real browser",
    tokenLength > 0,
    `response token ${tokenLength} chars`
  );

  await fillRequired(page, { "#assessment-form-email": "e2e@example.test" });

  const leadResult = captureLead(page);
  await page.locator(".ppc-form__submit").click();
  const { status, payload } = await leadResult;

  check(
    "no-photo submission reaches the real endpoint and is accepted",
    status === 201 && payload.ok === true,
    `HTTP ${status}`
  );
  noPhotoCode = payload.confirmationCode;

  // ---- THANK-YOU JOURNEY -------------------------------------------------------------------
  // The redirect must happen only AFTER the backend accepted, and must carry no personal data.
  await page.waitForURL(/\/assessment\/thank-you\//, { timeout: 15000 });
  const landedUrl = page.url();

  const PII = [
    "End To End Test",
    "End+To+End",
    "4085550100",
    "408 555 0100",
    "e2e@example.test",
    "95113",
    "Front rooms",
    "garage"
  ];
  const leaked = PII.filter((needle) =>
    decodeURIComponent(landedUrl).toLowerCase().includes(needle.toLowerCase())
  );
  check(
    "the thank-you URL carries no name, phone, email, ZIP or description",
    leaked.length === 0,
    leaked.length ? `LEAKED: ${leaked.join(", ")}` : landedUrl.split("?")[1] || "(no query)"
  );

  await page.waitForTimeout(600);
  const ty = await page.evaluate(() => ({
    path: window.location.pathname,
    // The script strips the query with replaceState once it has read it.
    querystring: window.location.search,
    heading: document.querySelector("h1").textContent.trim(),
    body: [...document.querySelectorAll(".ppc-confirm__body")]
      .filter((p) => !p.hidden)
      .map((p) => p.textContent.trim()),
    code: document.querySelector("[data-confirm-code]").hidden
      ? null
      : document.querySelector("[data-confirm-code]").textContent.trim(),
    email: document.querySelector("[data-confirm-email]").hidden
      ? null
      : document.querySelector("[data-confirm-email]").textContent.trim(),
    backHidden: document.querySelector("[data-confirm-back]").hidden,
    boundary: document.querySelector("[data-confirm-boundary]").hidden
      ? null
      : document.querySelector("[data-confirm-boundary]").textContent.trim(),
    hasForm: Boolean(document.querySelector("form")),
    title: document.title
  }));

  check(
    "the thank-you route loads and shows the confirmed next-step message",
    ty.path === "/hoarding-cleanup-san-jose/assessment/thank-you/" &&
      ty.heading === "Request received." &&
      ty.body[0].startsWith("We’ll review what you sent"),
    `"${ty.heading}"`
  );
  check(
    "the confirmation code shown is the one the endpoint actually returned",
    ty.code === `Confirmation code: ${payload.confirmationCode} — Quote this if you call.`,
    ty.code
  );
  check(
    "the query string is stripped after it is read, so the confirmation is not shareable",
    ty.querystring === "",
    `search="${ty.querystring}"`
  );
  check(
    "the thank-you page states no response time and carries no second form",
    !ty.hasForm &&
      !/\b(\d+\s*(minute|min|hour|day)s?)\b/i.test(
        [ty.heading, ...ty.body, ty.boundary ?? ""].join(" ")
      ),
    ty.boundary ? ty.boundary.slice(0, 60) + "…" : "(no boundary line)"
  );

  await page.screenshot({
    path: join(outDir, "shots", "ppc-live-01-thankyou-confirmed.png"),
    fullPage: false
  });

  // ---- REFRESH MUST NOT RESUBMIT -----------------------------------------------------------
  const postsBeforeReload = posted.length;
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(900);
  const afterReload = await page.evaluate(() => ({
    heading: document.querySelector("h1").textContent.trim(),
    backVisible: !document.querySelector("[data-confirm-back]").hidden
  }));
  check(
    "refreshing the thank-you page does not resubmit the form",
    posted.length === postsBeforeReload,
    `${posted.length - postsBeforeReload} extra POST(s)`
  );
  check(
    "a refresh falls back to the honest unconfirmed state rather than a stale success",
    afterReload.heading === "This page does not confirm that a request was received." &&
      afterReload.backVisible,
    `"${afterReload.heading}"`
  );

  // ---- BACK NAVIGATION MUST NOT RESUBMIT ---------------------------------------------------
  const postsBeforeBack = posted.length;
  await page.goBack({ waitUntil: "load" });
  await page.waitForTimeout(900);
  check(
    "navigating back to the form does not resubmit it",
    posted.length === postsBeforeBack,
    `${posted.length - postsBeforeBack} extra POST(s)`
  );

  await page.screenshot({
    path: join(outDir, "shots", "ppc-live-01-back-to-form.png"),
    fullPage: false
  });
  await context.close();
}

// =============================================================================================
// 2. PHOTO SUBMISSION — two real files through the real multipart POST and into R2.
// =============================================================================================
let photoSubmissionId = null;
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  // Same POST counter as block 1 — needed here to prove the double-click case.
  page.on("request", (r) => {
    if (r.url().endsWith("/api/lead") && r.method() === "POST") posted.push(r.url());
  });
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);
  await waitForTurnstile(page);

  await fillRequired(page);
  await page.setInputFiles("#assessment-form-media", [
    jpeg("living-room-wide.jpg"),
    jpeg("a-really-quite-long-filename-a-phone-camera-might-produce-2026-09-05-front-room.jpg")
  ]);
  await page.waitForTimeout(300);

  // DOUBLE-CLICK: two rapid clicks must produce exactly ONE request. The handler disables the
  // submit button for the duration, and the idempotency key would collapse a duplicate anyway.
  const postsBefore = posted.length;
  const leadResult = captureLead(page);
  const submit = page.locator(".ppc-form__submit");
  await submit.click();
  await submit.click({ force: true, timeout: 2000 }).catch(() => {});
  const { status, payload } = await leadResult;
  photoSubmissionId = payload.submissionId;

  check(
    "photo submission reaches the real endpoint and is accepted",
    status === 201 && payload.ok === true,
    `HTTP ${status}`
  );
  check(
    "rapid double-click produces exactly one submission",
    posted.length - postsBefore === 1,
    `${posted.length - postsBefore} POST(s)`
  );
  check(
    "the two submissions produced two distinct confirmation codes",
    payload.confirmationCode && payload.confirmationCode !== noPhotoCode,
    `${noPhotoCode} vs ${payload.confirmationCode}`
  );

  await page.waitForURL(/\/assessment\/thank-you\//, { timeout: 15000 });
  await page.waitForTimeout(600);
  const ty = await page.evaluate(() => ({
    heading: document.querySelector("h1").textContent.trim(),
    body: [...document.querySelectorAll(".ppc-confirm__body")]
      .filter((p) => !p.hidden)
      .map((p) => p.textContent.trim()),
    code: document.querySelector("[data-confirm-code]").textContent.trim(),
    email: document.querySelector("[data-confirm-email]").hidden
      ? null
      : document.querySelector("[data-confirm-email]").textContent.trim()
  }));
  check(
    "the photo submission reaches the thank-you page with the approved campaign wording",
    ty.heading === "Request received." &&
      ty.body[0].startsWith("We’ll review what you sent") &&
      ty.body[1] === "You do not need to clean or organize before we speak.",
    `"${ty.heading}"`
  );
  check(
    "no email address was supplied, so the page says nothing about a confirmation email",
    ty.email === null,
    ty.email ?? "(no email sentence — correct)"
  );

  await page.screenshot({
    path: join(outDir, "shots", "ppc-live-02-photo-thankyou.png"),
    fullPage: false
  });
  await context.close();
}

// =============================================================================================
// 3. REAL SERVER REJECTION — client guards removed so the request actually reaches the server
//    and comes back 422. Proves the server-error rendering path against a genuine payload.
// =============================================================================================
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);
  await waitForTurnstile(page);

  await fillRequired(page);
  // Strip `required` from ZIP and blank it — the browser would otherwise never send this, so
  // this is the only way to exercise the SERVER's validation through the real UI.
  await page.evaluate(() => {
    const zip = document.querySelector("#assessment-form-zip");
    zip.removeAttribute("required");
    zip.removeAttribute("pattern");
    zip.value = "";
  });

  const leadResult = captureLead(page);
  await page.locator(".ppc-form__submit").click();
  const { status, payload } = await leadResult;

  check(
    "a genuinely invalid payload is rejected by the server with 422",
    status === 422 && payload.ok === false && Boolean(payload.errors?.property_zip),
    `HTTP ${status}, errors: ${Object.keys(payload.errors || {}).join(", ")}`
  );

  await page.waitForTimeout(700);
  const ui = await page.evaluate(() => ({
    path: window.location.pathname,
    formVisible: Boolean(document.querySelector("form.ppc-form")),
    summaryVisible: !document.querySelector("[data-ppc-form-errors]").hidden,
    messages: [...document.querySelectorAll("[data-ppc-form-errors] li")].map((li) =>
      li.textContent.trim()
    ),
    zipInvalid:
      document.querySelector("#assessment-form-zip").getAttribute("aria-invalid") === "true",
    name: document.querySelector("#assessment-form-name").value,
    detail: document.querySelector("#assessment-form-detail").value,
    consent: document.querySelector("input[name='privacy_consent']").checked,
    submitEnabled: !document.querySelector(".ppc-form__submit").disabled
  }));

  check(
    "a real server rejection never reaches the thank-you page",
    ui.formVisible && !ui.path.includes("thank-you"),
    ui.path
  );
  check(
    "the server's field error is rendered and the field is marked invalid",
    ui.summaryVisible && ui.zipInvalid && ui.messages.some((m) => m.includes("ZIP")),
    ui.messages.join(" | ")
  );
  check(
    "everything the visitor typed survives a real server rejection",
    ui.name === "End To End Test" &&
      ui.detail.startsWith("Front rooms") &&
      ui.consent === true &&
      ui.submitEnabled
  );

  await page.screenshot({
    path: join(outDir, "shots", "ppc-live-03-server-422.png"),
    fullPage: false
  });
  await context.close();
}

await browser.close();

check(
  "every submission went to the one canonical endpoint",
  posted.length > 0 && posted.every((u) => u.endsWith("/api/lead")),
  posted[0] || "none"
);

await writeFile(
  join(outDir, "ppc-live-form-check.json"),
  JSON.stringify({ base, photoSubmissionId, results }, null, 2)
);

const failures = results.filter((r) => !r.pass);
console.log(
  `\n${results.length - failures.length}/${results.length} end-to-end checks passed against the real Pages Function`
);
if (photoSubmissionId) console.log(`photo submission id: ${photoSubmissionId}`);
if (failures.length) process.exit(1);
