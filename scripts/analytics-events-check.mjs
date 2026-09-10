// ANALYTICS EVENT + CONSENT VERIFICATION — real browser, real Termly, real form, against dist/.
//
// scripts/analytics-tagging-check.mjs proves the container is installed once and correctly.
// This file proves the thing that actually matters: that a lead event is raised when, and ONLY
// when, functions/api/lead.ts accepted a lead — and that consent decides whether any of it can
// leave the browser at all.
//
// The claim this suite is built to falsify is "a page view, a click, or an attempted submission
// got counted as a lead." Every check below is a way for that to be caught.
//
// SCOPE HONESTY. The endpoint is INTERCEPTED. No live lead is created, no CRM record, no email,
// no SMS. What is verified is the browser's behaviour against each response shape. GTM is loaded
// as a stub in the event blocks so nothing is transmitted to Google during a test; the consent
// block uses the REAL Termly bundle and the real container URL, and asserts on whether the
// request is attempted, which is the only thing consent controls.
//
// Usage: node scripts/analytics-events-check.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const ROUTE = "/hoarding-cleanup-san-jose/assessment/";
const THANKS = "/hoarding-cleanup-san-jose/assessment/thank-you/";
const CONTAINER = "GTM-WSSQ62BN";
const GOOGLE_ADS_ID = "AW-18340008320";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml"
};

// Values typed into the form below. None of them may ever appear in an analytics event.
const PII = {
  name: "Test Person",
  phone: "408 555 0100",
  zip: "95113",
  email: "test@example.test",
  detail: "Front rooms and the garage are packed.",
  file: "kitchen.jpg"
};

let failures = 0;
let checks = 0;
const check = (ok, label, detail = "") => {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};

function serve(root) {
  const server = createServer(async (req, res) => {
    try {
      let p = normalize(decodeURIComponent(req.url.split("?")[0]));
      if (p.endsWith("/")) p += "index.html";
      let file = join(root, p);
      try {
        const s = await stat(file);
        if (s.isDirectory()) file = join(file, "index.html");
      } catch {
        if (!extname(file)) file = join(root, p + "/index.html");
      }
      const buf = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
      res.end(buf);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

// Records every dataLayer push into sessionStorage, installed before any page script runs so
// nothing is missed, and surviving the redirect to the thank-you route (same origin).
const RECORDER = `
  window.dataLayer = window.dataLayer || [];
  (function () {
    var original = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = function () {
      try {
        var store = JSON.parse(sessionStorage.getItem("__ac_events") || "[]");
        for (var i = 0; i < arguments.length; i++) {
          store.push(JSON.parse(JSON.stringify(arguments[i], function (k, v) {
            return typeof v === "function" ? "[function]" : v;
          })));
        }
        sessionStorage.setItem("__ac_events", JSON.stringify(store));
      } catch (e) {}
      return original.apply(null, arguments);
    };
  })();
  // tel: navigation would leave the page; the site's own document-level listener still runs
  // because preventDefault does not stop propagation.
  window.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) e.preventDefault();
  }, true);
`;

// A stand-in for the container: it declares itself loaded and honours eventCallback, which is
// what PpcHeroForm waits on before redirecting. It does NOT replace dataLayer.push, so the
// recorder above stays intact.
const GTM_STUB = `
  window.google_tag_manager = window.google_tag_manager || {};
  window.google_tag_manager["${CONTAINER}"] = { dataLayer: {} };
  (function () {
    var seen = 0;
    function drain() {
      while (seen < window.dataLayer.length) {
        var entry = window.dataLayer[seen++];
        if (entry && typeof entry.eventCallback === "function") {
          try { entry.eventCallback(); } catch (e) {}
        }
      }
    }
    var push = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = function () { var r = push.apply(null, arguments); drain(); return r; };
    drain();
  })();
`;

const events = (page) =>
  page.evaluate(() => JSON.parse(sessionStorage.getItem("__ac_events") || "[]"));
const named = (list, name) => list.filter((e) => e && e.event === name);

// Accepting consent is what makes the container load, so the event blocks run in the state a
// measurable visitor is actually in. The container URL is answered locally by the stub, so
// nothing reaches Google. Dismissing the banner also clears the fixed overlay that would
// otherwise sit over the submit control.
async function stubbedPage(browser, { route = ROUTE } = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(RECORDER);
  const page = await context.newPage();
  await page.route("https://www.googletagmanager.com/**", (r) =>
    r.fulfill({ status: 200, contentType: "text/javascript", body: GTM_STUB })
  );
  await page.goto(base + route, { waitUntil: "load" });
  try {
    await page.getByRole("button", { name: "Accept", exact: true }).click({ timeout: 8000 });
    await page.waitForFunction((id) => Boolean((window.google_tag_manager || {})[id]), CONTAINER, {
      timeout: 8000
    });
  } catch {
    // The banner did not appear (already-consented context); the stub below still applies.
    await page.addScriptTag({ content: GTM_STUB });
  }
  return { context, page };
}

// Turnstile mounts its OWN empty `cf-turnstile-response` input asynchronously. Appending a second
// one makes `form.elements.namedItem` return a RadioNodeList instead of an input, which the form
// correctly treats as an unsatisfied challenge. So: settle to exactly one input, with a value.
const setTurnstileToken = (page) =>
  page.evaluate(() => {
    const form = document.querySelector("form.ppc-form");
    form.querySelectorAll('[name="cf-turnstile-response"]').forEach((node) => node.remove());
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "cf-turnstile-response";
    input.value = "events-check-token";
    form.append(input);
  });

async function fillForm(page, { withFile = true } = {}) {
  await page.fill("#assessment-form-name", PII.name);
  await page.fill("#assessment-form-phone", PII.phone);
  await page.fill("#assessment-form-zip", PII.zip);
  await page.fill("#assessment-form-email", PII.email);
  await page.fill("#assessment-form-detail", PII.detail);
  await page.check("input[name='privacy_consent']");
  if (withFile) {
    await page.setInputFiles("#assessment-form-media", [
      { name: PII.file, mimeType: "image/jpeg", buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) }
    ]);
  }
  // Late, so Turnstile has had the whole fill to mount its input first.
  await page.waitForTimeout(1200);
  await setTurnstileToken(page);
}

const server = await serve("dist");
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chromePath });

console.log(`\nAnalytics event + consent verification — ${base}\n`);

// =============================================================================================
// A. CONSENT. The real Termly bundle, the real container URL, no stub. Consent decides whether
//    the container is fetched at all — which is a stronger guarantee than Consent Mode, because
//    on refusal nothing is requested and no Google cookie can exist.
// =============================================================================================
console.log("A. Consent gating (real Termly, real container URL)");
{
  for (const decision of ["none", "Decline", "Accept"]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const containerRequests = [];
    page.on("request", (r) => {
      if (r.url().includes("googletagmanager.com")) containerRequests.push(r.url());
    });
    // Answer the container request locally so no test ever reaches Google.
    await page.route("https://www.googletagmanager.com/**", (r) =>
      r.fulfill({ status: 200, contentType: "text/javascript", body: GTM_STUB })
    );
    await page.goto(base + ROUTE, { waitUntil: "load" });
    await page.waitForTimeout(2500);

    if (decision !== "none") {
      await page.getByRole("button", { name: decision, exact: true }).click();
      await page.waitForTimeout(2500);
    }

    const state = await page.evaluate((id) => {
      const scripts = [...document.querySelectorAll("script")];
      const blocked = scripts.filter(
        (s) => s.type === "text/plain" && (s.textContent || "").includes("gtm.js")
      ).length;
      return {
        stillBlocked: blocked > 0,
        containerLive: Boolean((window.google_tag_manager || {})[id]),
        consentSignals: (window.dataLayer || []).filter((e) => e && e[0] === "consent").length,
        adsConfigs: (window.dataLayer || []).filter(
          (e) => e && e[0] === "config" && e[1] === "AW-18340008320"
        ).length,
        adsConversions: (window.dataLayer || []).filter(
          (e) =>
            (e && e[0] === "event" && e[1] === "conversion") ||
            (e && e.event === "conversion")
        ).length
      };
    }, CONTAINER);

    if (decision === "none") {
      check(
        containerRequests.length === 0 &&
          state.stillBlocked &&
          !state.containerLive &&
          state.adsConfigs === 0,
        "before consent neither GTM nor the Ads destination executes",
        `requests=${containerRequests.length} blocked=${state.stillBlocked} ads=${state.adsConfigs}`
      );
    } else if (decision === "Decline") {
      check(
        containerRequests.length === 0 && !state.containerLive && state.adsConfigs === 0,
        "after DECLINE neither the container nor Ads destination loads",
        `requests=${containerRequests.length} live=${state.containerLive} ads=${state.adsConfigs}`
      );
    } else {
      check(
        containerRequests.length > 0 && state.containerLive,
        `after ACCEPT Termly unblocks the container and ${CONTAINER} loads`,
        `requests=${containerRequests.length} live=${state.containerLive}`
      );
      check(
        state.consentSignals > 0,
        "Termly pushes a Google Consent Mode update on save",
        `${state.consentSignals} consent signal(s)`
      );
      check(
        state.adsConfigs === 1,
        `after ACCEPT the existing Google tag receives one ${GOOGLE_ADS_ID} config`,
        `${state.adsConfigs} Ads config command(s)`
      );
    }
    check(
      state.adsConversions === 0,
      `${decision}: a consent/page-view action never emits an Ads lead conversion`,
      `${state.adsConversions} conversion command(s)`
    );
    await context.close();
  }
}

// =============================================================================================
// B. THE EVENT MODEL. GTM stubbed, endpoint intercepted.
// =============================================================================================
console.log("\nB. Event model");

// --- B1. phone_click ------------------------------------------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  await page.click(".ppc-header a[href^='tel:']");
  await page.waitForTimeout(200);
  const clicks = named(await events(page), "phone_click");
  check(clicks.length === 1, "a tel: click raises exactly one phone_click", `${clicks.length}`);
  check(
    clicks[0]?.page_path === ROUTE &&
      typeof clicks[0]?.link_location === "string" &&
      clicks[0].link_location.length > 0,
    "phone_click carries page_path and link_location",
    JSON.stringify(clicks[0] ?? {})
  );
  check(
    !JSON.stringify(clicks).includes("+1408") && !/\d{3}[ -]?\d{4}/.test(JSON.stringify(clicks)),
    "phone_click carries no telephone number or visitor detail",
    JSON.stringify(clicks[0] ?? {})
  );
  await context.close();
}

// --- B2. form_start, once ---------------------------------------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  const before = named(await events(page), "form_start");
  check(before.length === 0, "form_start does not fire on page view alone", `${before.length}`);

  await page.fill("#assessment-form-name", PII.name);
  await page.fill("#assessment-form-phone", PII.phone);
  await page.fill("#assessment-form-detail", PII.detail);
  await page.check("input[name='privacy_consent']");
  await page.waitForTimeout(200);

  const starts = named(await events(page), "form_start");
  check(
    starts.length === 1,
    "form_start fires exactly once across four separate field interactions",
    `${starts.length}`
  );
  check(
    starts[0]?.form_id === "assessment-form" && starts[0]?.page_path === ROUTE,
    "form_start carries form_id and page_path",
    JSON.stringify(starts[0] ?? {})
  );
  await context.close();
}

// --- B3. server rejection is an error, never a lead -------------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  await page.route("**/api/lead", (route) =>
    route.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Review the highlighted information and submit again.", errors: { phone: "This field is required." } })
    })
  );
  await fillForm(page);
  await page.click(".ppc-form__submit");
  await page.waitForTimeout(900);

  const list = await events(page);
  check(
    named(list, "ppc_form_submit_attempt").length === 1,
    "a valid attempt raises exactly one ppc_form_submit_attempt",
    `${named(list, "ppc_form_submit_attempt").length}`
  );
  check(
    named(list, "ppc_form_success").length === 0,
    "a 422 rejection raises NO ppc_form_success — the conversion source never fires on failure",
    JSON.stringify(list.map((e) => e.event))
  );
  check(
    named(list, "ppc_form_error").length === 1 &&
      named(list, "ppc_form_error")[0].error_type === "server_validation",
    "a 422 raises one ppc_form_error categorised server_validation",
    JSON.stringify(named(list, "ppc_form_error")[0] ?? {})
  );
  check(
    page.url().includes(ROUTE) && !page.url().includes("thank-you"),
    "a rejected submission does not navigate to the thank-you route",
    page.url().replace(base, "")
  );
  await context.close();
}

// --- B4. network failure -----------------------------------------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  await page.route("**/api/lead", (route) => route.abort("failed"));
  await fillForm(page);
  await page.click(".ppc-form__submit");
  await page.waitForTimeout(900);

  const list = await events(page);
  check(
    named(list, "ppc_form_error").length === 1 &&
      named(list, "ppc_form_error")[0].error_type === "network",
    "a network failure raises one ppc_form_error categorised network",
    JSON.stringify(named(list, "ppc_form_error")[0] ?? {})
  );
  check(
    named(list, "ppc_form_success").length === 0,
    "a network failure raises NO ppc_form_success",
    JSON.stringify(list.map((e) => e.event))
  );
  await context.close();
}

// --- B5. client-side validation is not a submission at all -------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  let posts = 0;
  await page.route("**/api/lead", (route) => {
    posts += 1;
    route.fulfill({ status: 201, contentType: "application/json", body: "{}" });
  });
  await page.click(".ppc-form__submit"); // empty form
  await page.waitForTimeout(500);
  const list = await events(page);
  check(
    posts === 0 &&
      named(list, "ppc_form_submit_attempt").length === 0 &&
      named(list, "ppc_form_error").length === 0 &&
      named(list, "ppc_form_success").length === 0,
    "a locally invalid submit sends nothing and raises no attempt, error or success event",
    `posts=${posts} events=${JSON.stringify(list.map((e) => e.event))}`
  );
  await context.close();
}

// --- B6. confirmed success, once, and not doubled on the thank-you route ------------------------
{
  const { context, page } = await stubbedPage(browser);
  await page.route("**/api/lead", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        submissionId: "11111111-2222-3333-4444-555555555555",
        confirmationCode: "AC-Q7B2KM",
        callbackWindow: "business-hours",
        confirmationEmailSent: true
      })
    })
  );
  await fillForm(page);
  await page.click(".ppc-form__submit");
  await page.waitForURL(/thank-you/, { timeout: 15000 });
  await page.waitForTimeout(900);

  const list = await events(page);
  const successes = named(list, "ppc_form_success");
  check(
    named(list, "ppc_form_submit_attempt").length === 1 && successes.length === 1,
    "a confirmed lead raises exactly one attempt and exactly one ppc_form_success",
    `attempt=${named(list, "ppc_form_submit_attempt").length} success=${successes.length}`
  );
  check(
    successes[0]?.recovered === undefined,
    "the success came from the form, not the thank-you recovery — the recovery did not double it",
    JSON.stringify(successes[0] ?? {})
  );
  check(
    successes[0]?.form_id === "assessment-form" &&
      successes[0]?.offer_type === "handoff_reset" &&
      successes[0]?.photos_attached === true,
    "ppc_form_success carries form_id, offer_type and photos_attached as a boolean",
    JSON.stringify(successes[0] ?? {})
  );
  const order = list.map((e) => e.event).filter(Boolean);
  check(
    order.indexOf("form_start") < order.indexOf("ppc_form_submit_attempt") &&
      order.indexOf("ppc_form_submit_attempt") < order.indexOf("ppc_form_success"),
    "the events arrive in order: form_start → attempt → success",
    order.join(" → ")
  );

  const leaked = Object.values(PII).filter((v) => JSON.stringify(list).includes(v));
  check(
    leaked.length === 0,
    "no name, phone, email, ZIP, description or filename appears in any event",
    leaked.length ? `leaked: ${leaked.join(", ")}` : "clean"
  );

  // Re-entering the thank-you URL in the same session must not mint a second lead.
  await page.goto(`${base}${THANKS}?received=1&code=AC-Q7B2KM`, { waitUntil: "load" });
  await page.waitForTimeout(700);
  check(
    named(await events(page), "ppc_form_success").length === 1,
    "revisiting the thank-you URL with the same code does not raise a second ppc_form_success",
    `${named(await events(page), "ppc_form_success").length}`
  );
  await context.close();
}

// --- B7. double submit ---------------------------------------------------------------------------
{
  const { context, page } = await stubbedPage(browser);
  let posts = 0;
  await page.route("**/api/lead", async (route) => {
    posts += 1;
    await new Promise((r) => setTimeout(r, 400));
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, confirmationCode: "AC-Q7B2KM", callbackWindow: "business-hours", confirmationEmailSent: true })
    });
  });
  await fillForm(page, { withFile: false });
  await page.evaluate(() => {
    const button = document.querySelector(".ppc-form__submit");
    button.click();
    button.click();
    button.click();
  });
  await page.waitForURL(/thank-you/, { timeout: 15000 });
  await page.waitForTimeout(700);
  const list = await events(page);
  check(
    posts === 1 &&
      named(list, "ppc_form_submit_attempt").length === 1 &&
      named(list, "ppc_form_success").length === 1,
    "three rapid submits produce one request, one attempt and one success",
    `posts=${posts} attempts=${named(list, "ppc_form_submit_attempt").length} successes=${named(list, "ppc_form_success").length}`
  );
  await context.close();
}

// =============================================================================================
// C. THANK-YOU RECOVERY. Explicit and once-only — never "a thank-you page view is a lead".
// =============================================================================================
console.log("\nC. Thank-you route recovery");
{
  const { context, page } = await stubbedPage(browser, { route: THANKS });
  await page.waitForTimeout(500);
  check(
    named(await events(page), "ppc_form_success").length === 0,
    "a bare thank-you page view raises NO ppc_form_success",
    JSON.stringify((await events(page)).map((e) => e.event))
  );
  await context.close();
}
{
  const { context, page } = await stubbedPage(browser, {
    route: `${THANKS}?received=1&code=AC-NOTREAL`
  });
  await page.waitForTimeout(500);
  check(
    named(await events(page), "ppc_form_success").length === 0,
    "a thank-you view with a malformed confirmation code raises NO ppc_form_success",
    JSON.stringify((await events(page)).map((e) => e.event))
  );
  await context.close();
}
{
  const { context, page } = await stubbedPage(browser, {
    route: `${THANKS}?received=1&code=AC-Q7B2KM`
  });
  await page.waitForTimeout(600);
  const first = named(await events(page), "ppc_form_success");
  check(
    first.length === 1 && first[0].recovered === true,
    "a confirmed thank-you URL whose lead was never recorded raises one recovered ppc_form_success",
    JSON.stringify(first[0] ?? {})
  );
  await page.goto(`${base}${THANKS}?received=1&code=AC-Q7B2KM`, { waitUntil: "load" });
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(600);
  check(
    named(await events(page), "ppc_form_success").length === 1,
    "reloading and re-entering that same URL never raises a second one",
    `${named(await events(page), "ppc_form_success").length}`
  );
  await context.close();
}

// =============================================================================================
// D. ATTRIBUTION. The hidden fields exist; what matters is that a real Google Ads landing URL
//    survives the whole interaction and arrives in the POST body, and that an organic visit does
//    not overwrite a stored value with an empty one.
// =============================================================================================
console.log("\nD. Attribution preservation");
{
  const landing =
    `${ROUTE}?utm_source=google&utm_medium=cpc&utm_campaign=hoarding-sj` +
    `&utm_term=hoarding%20cleanup&utm_content=ad1&gclid=TeSt-GCLID_123`;
  const { context, page } = await stubbedPage(browser, { route: landing });

  let posted = null;
  await page.route("**/api/lead", async (route) => {
    posted = route.request().postData() ?? "";
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, confirmationCode: "AC-ATTR11", callbackWindow: "business-hours", confirmationEmailSent: true })
    });
  });

  const readHidden = () =>
    page.evaluate(() => {
      const form = document.querySelector("form.ppc-form");
      const value = (name) => form.querySelector(`input[name="${name}"]`)?.value ?? null;
      return {
        utm_source: value("utm_source"),
        utm_medium: value("utm_medium"),
        utm_campaign: value("utm_campaign"),
        utm_term: value("utm_term"),
        utm_content: value("utm_content"),
        gclid: value("gclid"),
        landing_page: value("landing_page"),
        referrer: value("referrer"),
        idempotency_key: value("idempotency_key")
      };
    });

  const onLoad = await readHidden();
  check(
    onLoad.utm_source === "google" &&
      onLoad.utm_medium === "cpc" &&
      onLoad.utm_campaign === "hoarding-sj" &&
      onLoad.utm_term === "hoarding cleanup" &&
      onLoad.utm_content === "ad1" &&
      onLoad.gclid === "TeSt-GCLID_123",
    "all five UTM values and the gclid are read from the landing URL",
    JSON.stringify(onLoad)
  );
  check(
    onLoad.landing_page === ROUTE && /^[a-f0-9-]{8,}/i.test(onLoad.idempotency_key ?? ""),
    "landing_page and a generated idempotency key are populated on load",
    `${onLoad.landing_page} / ${(onLoad.idempotency_key ?? "").slice(0, 12)}…`
  );

  await fillForm(page, { withFile: false });
  const afterInteraction = await readHidden();
  check(
    JSON.stringify({ ...onLoad, referrer: null }) ===
      JSON.stringify({ ...afterInteraction, referrer: null }),
    "every attribution value survives filling the form unchanged",
    JSON.stringify(afterInteraction)
  );

  await page.click(".ppc-form__submit");
  await page.waitForURL(/thank-you/, { timeout: 15000 });
  check(
    typeof posted === "string" &&
      posted.includes("google") &&
      posted.includes("hoarding-sj") &&
      posted.includes("TeSt-GCLID_123") &&
      posted.includes('name="utm_term"') &&
      posted.includes('name="utm_content"'),
    "all five UTM values and the gclid are present in the /api/lead request body",
    posted ? "post body carries the campaign block" : "no request captured"
  );
  check(
    !/[?&](utm_|gclid)/.test(page.url()) && !page.url().includes("TeSt-GCLID"),
    "no attribution or personal value is carried into the thank-you URL",
    page.url().replace(base, "")
  );
  await context.close();
}
{
  // An organic visit must leave the fields empty rather than writing "" over something.
  const { context, page } = await stubbedPage(browser);
  const organic = await page.evaluate(() => {
    const form = document.querySelector("form.ppc-form");
    return ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].map(
      (n) => form.querySelector(`input[name="${n}"]`)?.value
    );
  });
  check(
    organic.every((v) => v === ""),
    "an organic visit leaves the campaign fields empty and writes no placeholder",
    JSON.stringify(organic)
  );
  await context.close();
}

await browser.close();
server.close();

console.log(`\n${checks - failures}/${checks} analytics checks passed.`);
process.exit(failures ? 1 : 0);
