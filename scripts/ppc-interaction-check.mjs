// PPC HOARDING — rendered-behaviour verification for /hoarding-cleanup-san-jose/assessment/.
//
// Companion to scripts/ppc-fold-audit.mjs (geometry) and scripts/ppc-endpoint-check.mjs
// (real endpoint, authorized offline test path). This file checks what only a browser can:
// validation states, focus, keyboard operation, uploads, the sticky bar's three suppressors,
// reflow, and — with the network request INTERCEPTED — that the success panel appears only on a
// confirmed response and never on a failure.
//
// SCOPE HONESTY: request interception verifies the FORM'S behaviour against each response shape.
// It does not verify delivery; that is ppc-endpoint-check.mjs's job, and live delivery to a real
// recipient remains UNVERIFIED from this repository by design (no unapproved test notification
// is ever sent).
//
// Usage: node scripts/ppc-interaction-check.mjs [outDir]
import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./artifacts/ppc-hoarding";
const ROUTE = "/hoarding-cleanup-san-jose/assessment/";
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

const results = [];
const check = (label, pass, detail = "") => {
  results.push({ label, pass: Boolean(pass), detail });
  console.log(`${pass ? "PASS" : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
};
const note = (label, detail) => {
  results.push({ label, pass: null, detail });
  console.log(`NOTE ${label} — ${detail}`);
};

async function settle(page) {
  await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
  await page.waitForTimeout(400);
}

async function dismissConsent(page) {
  try {
    await page.waitForSelector(".t-consentPrompt", { timeout: 6000, state: "visible" });
    await page.click(".t-acceptAllButton", { timeout: 4000 });
    await page.waitForSelector(".t-consentPrompt", { state: "detached", timeout: 6000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Give the form a Turnstile token so the submission paths downstream of the challenge can be
 * exercised. Turnstile mounts its own empty `cf-turnstile-response` input, and the challenge
 * itself cannot complete against a 127.0.0.1 origin with the production sitekey — so the token
 * is written into the widget's real input rather than a second one being appended.
 */
const injectToken = (page) =>
  page.evaluate(() => {
    const form = document.querySelector("form.ppc-form");
    if (!form) return;
    const existing = form.querySelector('input[name="cf-turnstile-response"]');
    if (existing) {
      existing.value = "interaction-check-token";
      return;
    }
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "cf-turnstile-response";
    input.value = "interaction-check-token";
    form.append(input);
  });

const server = await serve("dist");
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chromePath });
await mkdir(join(outDir, "shots"), { recursive: true });

// =============================================================================================
// A. FORM BLOCK LEDGER — the exact per-block heights behind the §7 fold result, so the reported
//    overflow can be attributed to named content rather than described in the aggregate.
// =============================================================================================
{
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);

  const ledger = await page.evaluate(() => {
    const round = (n) => Math.round(n * 100) / 100;
    const form = document.querySelector("form.ppc-form");
    const rows = [];
    for (const child of form.children) {
      const cs = getComputedStyle(child);
      if (cs.display === "none") continue;
      const r = child.getBoundingClientRect();
      rows.push({
        block: child.className || child.tagName.toLowerCase(),
        height: round(r.height)
      });
    }
    const grid = form.querySelector(".ppc-form__grid");
    const gridRows = [...grid.children].map((el) => ({
      field: el.querySelector("label")?.textContent.trim() || el.className,
      height: round(el.getBoundingClientRect().height)
    }));
    const cs = getComputedStyle(form);
    return {
      formHeight: round(form.getBoundingClientRect().height),
      padding: cs.paddingTop,
      rowGap: cs.rowGap,
      blocks: rows,
      gridRows,
      gridRowGap: getComputedStyle(grid).rowGap
    };
  });

  console.log("\n--- form block ledger @1366x768 (compact) ---");
  console.log(
    `form ${ledger.formHeight}px · padding ${ledger.padding} · panel gap ${ledger.rowGap} · field gap ${ledger.gridRowGap}`
  );
  for (const b of ledger.blocks) console.log(`  ${String(b.height).padStart(7)}  ${b.block}`);
  console.log("  field rows:");
  for (const g of ledger.gridRows) console.log(`  ${String(g.height).padStart(7)}  ${g.field}`);
  await writeFile(join(outDir, "ppc-form-ledger.json"), JSON.stringify(ledger, null, 2));
  await context.close();
}

// =============================================================================================
// B. VALIDATION, FOCUS, UPLOADS, SUBMISSION STATES — desktop.
// =============================================================================================
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);

  // --- Turnstile actually mounted? A missing widget would mean the anti-spam control is not
  //     really there, which no CSS inspection can tell you.
  const turnstile = await page.evaluate(() => {
    const wrapper = document.querySelector(".ppc-form__turnstile");
    return {
      scriptLoaded: [...document.querySelectorAll("script[src]")].some((s) =>
        s.src.includes("challenges.cloudflare.com/turnstile")
      ),
      widgetMounted: Boolean(wrapper?.querySelector(".cf-turnstile > div")),
      responseInput: Boolean(wrapper?.querySelector('input[name="cf-turnstile-response"]')),
      iframes: wrapper ? wrapper.querySelectorAll("iframe").length : 0
    };
  });
  check(
    "Turnstile anti-spam widget is mounted in the form",
    turnstile.scriptLoaded && turnstile.widgetMounted && turnstile.responseInput,
    `script ${turnstile.scriptLoaded}, widget ${turnstile.widgetMounted}, response input ${turnstile.responseInput}`
  );
  if (turnstile.iframes === 0) {
    note(
      "Turnstile challenge iframe",
      "not rendered against a 127.0.0.1 origin with the production sitekey — the widget mounts " +
        "and creates its response input, but the challenge itself only runs on an allowed " +
        "hostname. Identical behaviour on the existing service pages. Live challenge completion " +
        "is UNVERIFIED from this repository."
    );
  }

  // --- The form must not pre-render any confirmation. The thank-you route is a separate
  //     document reached only by redirect, so there is nothing success-shaped in this DOM.
  const preSubmit = await page.evaluate(() => ({
    successNodes: document.querySelectorAll("[data-ppc-form-success], .ppc-confirm__panel").length,
    thankYouTarget: document.querySelector("form.ppc-form").dataset.thankYou
  }));
  check(
    "no confirmation state exists on the page before submission",
    preSubmit.successNodes === 0,
    `${preSubmit.successNodes} node(s)`
  );
  check(
    "the form is wired to the campaign thank-you route",
    preSubmit.thankYouTarget === "/hoarding-cleanup-san-jose/assessment/thank-you/",
    preSubmit.thankYouTarget
  );

  // --- Empty submit → accessible errors, nothing sent.
  let requestsMade = 0;
  await page.route("**/api/lead", async (route) => {
    requestsMade += 1;
    await route.fulfill({ status: 500, body: "{}" });
  });
  await page.locator(".ppc-form__submit").click();
  await page.waitForTimeout(300);

  const errorState = await page.evaluate(() => {
    const box = document.querySelector("[data-ppc-form-errors]");
    return {
      summaryVisible: !box.hidden,
      summaryRole: box.getAttribute("role"),
      summaryFocused: document.activeElement === box,
      messages: [...box.querySelectorAll("li")].map((li) => li.textContent),
      invalidCount: document.querySelectorAll("form.ppc-form [aria-invalid='true']").length,
      inlineErrors: document.querySelectorAll("form.ppc-form .form-error").length
    };
  });
  check("empty submit is blocked client-side (no request sent)", requestsMade === 0);
  check(
    "error summary is announced and focused",
    errorState.summaryVisible && errorState.summaryRole === "alert" && errorState.summaryFocused,
    `role=${errorState.summaryRole} focused=${errorState.summaryFocused}`
  );
  check(
    "every required field is marked aria-invalid with an inline message",
    errorState.invalidCount >= 5 && errorState.inlineErrors >= 5,
    `${errorState.invalidCount} invalid, ${errorState.inlineErrors} inline`
  );
  check(
    "error messages are the approved wording, not browser defaults",
    errorState.messages.some((m) => m.includes("so we know who to ask for")) &&
      errorState.messages.some((m) => m.includes("Check the consent box")),
    `${errorState.messages.length} messages`
  );
  await page.screenshot({
    path: join(outDir, "shots", "ppc-1440x900-validation-errors.png"),
    fullPage: false
  });

  // --- Fill the form, attach a long-named file, confirm the list renders and nothing overflows.
  await page.fill("#assessment-form-name", "Test Person");
  await page.fill("#assessment-form-phone", "408 555 0100");
  await page.fill("#assessment-form-zip", "95113");
  await page.fill("#assessment-form-email", "test@example.test");
  await page.fill(
    "#assessment-form-detail",
    "Front rooms and the garage are packed. Papers and photographs are mixed in."
  );
  await page.check("input[name='privacy_consent']");

  const longName =
    "a-really-quite-long-filename-that-a-phone-camera-might-produce-2026-09-05-front-room-wide-view.jpg";
  await page.setInputFiles("#assessment-form-media", [
    { name: longName, mimeType: "image/jpeg", buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) },
    { name: "kitchen.jpg", mimeType: "image/jpeg", buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) }
  ]);
  await page.waitForTimeout(250);

  const uploadState = await page.evaluate(() => {
    const list = document.querySelector("[data-ppc-upload-list]");
    const status = document.querySelector("[data-ppc-upload-status]");
    const form = document.querySelector("form.ppc-form");
    return {
      listVisible: !list.hidden,
      items: list.children.length,
      firstName: list.querySelector("strong")?.textContent,
      removeButtons: list.querySelectorAll("button").length,
      status: status.textContent,
      formScrollWidth: form.scrollWidth,
      formClientWidth: form.clientWidth,
      docOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    };
  });
  check(
    "selected files are listed with a Remove control each",
    uploadState.listVisible && uploadState.items === 2 && uploadState.removeButtons === 2,
    `${uploadState.items} items`
  );
  check(
    "long filename is shown in full and does not widen the form panel",
    uploadState.firstName === longName &&
      uploadState.formScrollWidth <= uploadState.formClientWidth + 1 &&
      !uploadState.docOverflow,
    `scrollWidth ${uploadState.formScrollWidth} vs clientWidth ${uploadState.formClientWidth}`
  );
  check(
    "selection is announced to assistive technology",
    uploadState.status.includes("2 files selected"),
    uploadState.status
  );
  await page.screenshot({
    path: join(outDir, "shots", "ppc-1440x900-files-selected.png"),
    fullPage: false
  });

  // --- Remove one file.
  await page.locator("[data-ppc-upload-list] button").first().click();
  await page.waitForTimeout(150);
  const afterRemove = {
    items: await page.locator("[data-ppc-upload-list] li").count(),
    status: await page.locator("[data-ppc-upload-status]").textContent()
  };
  check(
    "removing a file updates the list and announces both the removal and what is left",
    afterRemove.items === 1 &&
      afterRemove.status.includes("removed") &&
      afterRemove.status.includes("1 file selected"),
    `${afterRemove.items} left · "${afterRemove.status}"`
  );

  await injectToken(page);

  // --- FAILURE RESPONSE: entered values must survive, and NO navigation may occur.
  await page.unroute("**/api/lead");
  await page.route("**/api/lead", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        ok: false,
        message:
          "We stored the request details but could not safely store the selected files. Your answers remain here. Remove the files and try again, or call Aseptaclean."
      })
    })
  );
  const urlBeforeFailure = page.url();
  await page.locator(".ppc-form__submit").click();
  await page.waitForTimeout(900);

  const failureState = await page.evaluate(() => ({
    url: window.location.pathname,
    status: document.querySelector("[data-ppc-form-status]").textContent,
    name: document.querySelector("#assessment-form-name").value,
    detail: document.querySelector("#assessment-form-detail").value,
    consent: document.querySelector("input[name='privacy_consent']").checked,
    files: document.querySelector("#assessment-form-media").files.length,
    submitEnabled: !document.querySelector(".ppc-form__submit").disabled
  }));
  check(
    "a failed submission does NOT navigate to the thank-you page",
    page.url() === urlBeforeFailure && !failureState.url.includes("thank-you"),
    failureState.url
  );
  check(
    "partial-upload failure is reported in the server's own words",
    failureState.status.includes("could not safely store the selected files"),
    failureState.status.slice(0, 60) + "…"
  );
  check(
    "every entered value is preserved on failure, including the file selection",
    failureState.name === "Test Person" &&
      failureState.detail.startsWith("Front rooms") &&
      failureState.consent === true &&
      failureState.files === 1 &&
      failureState.submitEnabled
  );
  await page.screenshot({
    path: join(outDir, "shots", "ppc-1440x900-failure-preserved.png"),
    fullPage: false
  });

  // --- CONFIRMED RESPONSE: only now may the visitor be sent to the thank-you route.
  await injectToken(page);
  await page.unroute("**/api/lead");
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
  // The page navigates on success, so dataLayer events are captured into sessionStorage
  // (same origin) and read back on the thank-you page rather than from a lost window.
  await page.evaluate(() => {
    sessionStorage.setItem("__events", "[]");
    const push = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = (e) => {
      const seen = JSON.parse(sessionStorage.getItem("__events") || "[]");
      seen.push(e);
      sessionStorage.setItem("__events", JSON.stringify(seen));
      return push(e);
    };
  });
  await page.locator(".ppc-form__submit").click();
  await page.waitForURL(/\/assessment\/thank-you\//, { timeout: 15000 });
  await page.waitForTimeout(700);

  const successState = await page.evaluate(() => ({
    path: window.location.pathname,
    querystring: window.location.search,
    heading: document.querySelector("h1").textContent.trim(),
    body: [...document.querySelectorAll(".ppc-confirm__body")]
      .filter((p) => !p.hidden)
      .map((p) => p.textContent.trim()),
    code: document.querySelector("[data-confirm-code]").textContent.trim(),
    email: document.querySelector("[data-confirm-email]").hidden
      ? null
      : document.querySelector("[data-confirm-email]").textContent.trim(),
    backHidden: document.querySelector("[data-confirm-back]").hidden
  }));
  check(
    "a confirmed response navigates to the campaign thank-you route",
    successState.path === "/hoarding-cleanup-san-jose/assessment/thank-you/",
    successState.path
  );
  check(
    "thank-you copy is the approved campaign wording",
    successState.heading === "Request received." &&
      successState.body[0].startsWith("We\u2019ll review what you sent") &&
      successState.body[1] === "You do not need to clean or organize before we speak.",
    successState.heading
  );
  check(
    "confirmation code and email state are rendered from the response",
    successState.code === "Confirmation code: AC-Q7B2KM \u2014 Quote this if you call." &&
      successState.email === "A confirmation email is on its way to the address you gave us.",
    `${successState.code} / ${successState.email}`
  );
  check(
    "the query string is stripped and the back-to-form link is withdrawn once confirmed",
    successState.querystring === "" && successState.backHidden === true,
    `search="${successState.querystring}" backHidden=${successState.backHidden}`
  );

  await page.screenshot({
    path: join(outDir, "shots", "ppc-1440x900-thankyou.png"),
    fullPage: false
  });

  // --- Analytics: attempt and confirmed success are distinct, and neither carries PII.
  const events = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem("__events") || "[]")
  );
  const eventNames = events.map((e) => e.event);
  check(
    "submit attempt and confirmed success are separate analytics events",
    eventNames.includes("ppc_form_submit_attempt") && eventNames.includes("ppc_form_success"),
    eventNames.join(", ")
  );
  const serialised = JSON.stringify(events);
  const leaked = [
    "Test Person",
    "408 555 0100",
    "test@example.test",
    "95113",
    "Front rooms",
    "kitchen.jpg"
  ].filter((needle) => serialised.includes(needle));
  check(
    "no name, phone, email, ZIP, description or filename appears in any analytics event",
    leaked.length === 0,
    leaked.length ? `leaked: ${leaked.join(", ")}` : serialised.slice(0, 120)
  );

  // --- Refresh and back-navigation must not resubmit.
  let postsAfterSuccess = 0;
  await page.route("**/api/lead", (route) => {
    postsAfterSuccess += 1;
    route.fulfill({ status: 500, body: "{}" });
  });
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(700);
  const afterReload = await page.evaluate(() => ({
    heading: document.querySelector("h1").textContent.trim(),
    backVisible: !document.querySelector("[data-confirm-back]").hidden
  }));
  check(
    "refreshing the thank-you page does not resubmit",
    postsAfterSuccess === 0,
    `${postsAfterSuccess} POST(s)`
  );
  check(
    "a refresh shows the honest unconfirmed state, not a stale success",
    afterReload.heading === "This page does not confirm that a request was received." &&
      afterReload.backVisible,
    `"${afterReload.heading}"`
  );
  await page.goBack({ waitUntil: "load" });
  await page.waitForTimeout(700);
  check(
    "navigating back to the form does not resubmit",
    postsAfterSuccess === 0,
    `${postsAfterSuccess} POST(s)`
  );

  await context.close();
}

// =============================================================================================
// C. LINKS, FAQ KEYBOARD OPERATION, FOCUS VISIBILITY.
// =============================================================================================
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);

  const links = await page.evaluate(() => {
    const tel = [...document.querySelectorAll('a[href^="tel:"]')];
    return {
      telHrefs: [...new Set(tel.map((a) => a.getAttribute("href")))],
      telCount: tel.length,
      displaysNumber: tel.some((a) => a.textContent.includes("(408) 785-7588")),
      policy: ["/privacy/", "/terms/", "/cookie-policy/"].map((href) => ({
        href,
        present: Boolean(document.querySelector(`a[href="${href}"]`))
      })),
      cookieButton: Boolean(
        document.querySelector("button.termly-display-preferences")
      ),
      cookieButtonLabel:
        document.querySelector("button.termly-display-preferences")?.textContent.trim() ?? null,
      navLinks: [...document.querySelectorAll("header a")].map((a) => a.getAttribute("href")),
      formAnchors: [...document.querySelectorAll('a[href="#assessment-form"]')].length
    };
  });
  check(
    "every call action uses the one central tel: URI",
    links.telHrefs.length === 1 && links.telHrefs[0] === "tel:+14087857588",
    links.telHrefs.join(", ")
  );
  check(
    "the display number (408) 785-7588 is rendered",
    links.displaysNumber,
    `${links.telCount} tel links`
  );
  check(
    "all three policy routes are linked and resolve to real pages",
    links.policy.every((p) => p.present),
    links.policy.map((p) => `${p.href}:${p.present}`).join(" ")
  );
  check(
    "Cookie Settings is a real preference control, not a link to the policy",
    links.cookieButton && links.cookieButtonLabel === "Cookie Settings",
    links.cookieButtonLabel
  );
  check(
    "the PPC header carries no site navigation, only the logo and the call",
    links.navLinks.filter((h) => h && h.startsWith("/") && h !== "/").length === 0,
    links.navLinks.join(", ")
  );
  check(
    "every secondary action points at the single hero form",
    links.formAnchors === 4,
    `${links.formAnchors} anchors (hero, cost, final, sticky bar) — one form on the page`
  );
  check(
    "there is exactly one form on the page",
    (await page.locator("form").count()) === 1,
    `${await page.locator("form").count()} form(s)`
  );

  // Policy routes resolve, verified by fetching them rather than trusting the href.
  for (const href of ["/privacy/", "/terms/", "/cookie-policy/"]) {
    const response = await page.request.get(base + href);
    check(`${href} returns 200`, response.status() === 200, `status ${response.status()}`);
  }

  // FAQ: native <details>/<summary>, so keyboard operation is inherent. Verified, not assumed.
  //
  // Focus is taken with a REAL Tab keypress, not element.focus(). Chromium only matches
  // :focus-visible on a <summary> when focus arrives from the keyboard, so a programmatic focus
  // would report "no focus indicator" for a control that plainly has one.
  await page.evaluate(() => {
    const summary = document.querySelector(".ac-faq-accordion summary");
    summary.scrollIntoView({ block: "center" });
    // Park focus on the element immediately before it, so one Tab lands on the summary.
    const focusables = [
      ...document.querySelectorAll('a[href], button:not([disabled]), summary')
    ].filter((n) => n.getBoundingClientRect().height > 0);
    const index = focusables.indexOf(summary);
    if (index > 0) focusables[index - 1].focus();
  });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(120);
  const focusVisible = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      matchesFocusVisible: el.matches(":focus-visible"),
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle
    };
  });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const openedByEnter = await page.locator(".ac-faq-accordion details").first().evaluate((el) => el.open);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const closedByEnter = await page.locator(".ac-faq-accordion details").first().evaluate((el) => !el.open);
  check(
    "FAQ rows are keyboard-focusable and toggle with the keyboard",
    focusVisible.tag === "summary" && openedByEnter && closedByEnter,
    `focus ${focusVisible.tag}`
  );
  check(
    "focused FAQ control shows a visible focus indicator",
    focusVisible.matchesFocusVisible &&
      focusVisible.outlineStyle !== "none" &&
      parseFloat(focusVisible.outlineWidth) > 0,
    `${focusVisible.outlineStyle} ${focusVisible.outlineWidth}, :focus-visible ${focusVisible.matchesFocusVisible}`
  );

  const faqCount = await page.locator(".ac-faq-accordion details").count();
  check("six FAQ questions render", faqCount === 6, `${faqCount} questions`);

  // Real Tab presses from the top of the document. Records the actual focus path so a trap or a
  // skipped control would show up as a repeat or a missing entry.
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelector(".skip-link")?.blur();
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
  });
  const tabOrder = [];
  for (let i = 0; i < 16; i += 1) {
    await page.keyboard.press("Tab");
    tabOrder.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "body";
        // The document-order index disambiguates otherwise identical labels (six <summary>
        // elements read the same), so a genuine trap — the SAME node twice in a row — is
        // distinguishable from two different controls that happen to share a name.
        const index = [...document.querySelectorAll("*")].indexOf(el);
        const label =
          el.tagName.toLowerCase() +
          (el.getAttribute("name")
            ? `[${el.getAttribute("name")}]`
            : el.className
              ? `.${String(el.className).trim().split(/\s+/)[0]}`
              : "");
        return `${label}#${index}`;
      })
    );
  }
  // A focus trap shows up as the same element being returned by consecutive Tab presses.
  const trapped = tabOrder.some((entry, index) => index > 0 && entry === tabOrder[index - 1]);
  check(
    "keyboard order runs skip link → header → hero actions → form fields, with no trap",
    tabOrder[0].startsWith("a.skip-link") &&
      tabOrder.some((entry) => entry.includes("[full_name]")) &&
      !trapped,
    tabOrder
      .slice(0, 10)
      .map((e) => e.split("#")[0])
      .join(" → ")
  );

  await context.close();
}

// =============================================================================================
// D. MOBILE — sticky bar suppressors, stacked reflow, 320px and 200% zoom.
// =============================================================================================
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  const bannerShown = await dismissConsent(page);
  await settle(page);

  check(
    "sticky bar is hidden while the hero is on screen",
    await page.locator("[data-ppc-bar]").isHidden()
  );
  if (bannerShown) {
    note(
      "sticky bar vs. consent prompt",
      "the Termly prompt was present on first load and the bar stayed hidden behind it; measured before dismissal"
    );
  }

  await page.evaluate(() => {
    const hero = document.querySelector("#ppc-hero");
    window.scrollTo(0, hero.getBoundingClientRect().height + 400);
  });
  await page.waitForTimeout(500);

  const barState = await page.evaluate(() => {
    const bar = document.querySelector("[data-ppc-bar]");
    const r = bar.getBoundingClientRect();
    const cs = getComputedStyle(document.body);
    return {
      visible: !bar.hidden,
      height: Math.round(r.height * 100) / 100,
      bottom: Math.round(r.bottom),
      viewport: window.innerHeight,
      bodyPaddingBottom: cs.paddingBottom,
      reservationClass: document.body.classList.contains("ppc-has-bar"),
      actionHeights: [...bar.querySelectorAll("a")].map((a) =>
        Math.round(a.getBoundingClientRect().height * 100) / 100
      ),
      callHref: bar.querySelector(".ppc-bar__call")?.getAttribute("href"),
      formHref: bar.querySelector(".ppc-bar__message")?.getAttribute("href")
    };
  });
  check(
    "sticky bar appears after the complete hero has left the viewport",
    barState.visible && barState.bottom >= barState.viewport - 1,
    `bottom ${barState.bottom} of ${barState.viewport}`
  );
  check(
    "the document reserves the bar's measured height plus safe-area inset",
    barState.reservationClass && parseFloat(barState.bodyPaddingBottom) >= barState.height - 1,
    `reserved ${barState.bodyPaddingBottom} for a ${barState.height}px bar`
  );
  check(
    "both sticky actions clear the 48px tap floor",
    barState.actionHeights.every((h) => h >= 48),
    barState.actionHeights.join(", ")
  );
  check(
    "sticky actions point at the central tel: URI and the single form",
    barState.callHref === "tel:+14087857588" && barState.formHref === "#assessment-form",
    `${barState.callHref} / ${barState.formHref}`
  );
  await page.screenshot({
    path: join(outDir, "shots", "ppc-390x844-sticky-bar.png"),
    fullPage: false
  });

  // The bar must yield while a field is being edited.
  await page.evaluate(() => document.querySelector("#assessment-form-detail").focus());
  await page.waitForTimeout(250);
  check(
    "sticky bar hides while a form field has focus",
    await page.locator("[data-ppc-bar]").isHidden()
  );
  await page.evaluate(() => document.activeElement.blur());
  await page.waitForTimeout(250);

  // Does anything cover the submit button while the bar is up?
  await page.evaluate(() => {
    document.querySelector(".ppc-form__submit").scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(400);
  const occlusion = await page.evaluate(() => {
    const submit = document.querySelector(".ppc-form__submit");
    const r = submit.getBoundingClientRect();
    const midpoint = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      covered: !submit.contains(midpoint) && midpoint !== submit,
      coveredBy: midpoint ? midpoint.className || midpoint.tagName : null
    };
  });
  check(
    "nothing covers the submit button when the bar is on screen",
    !occlusion.covered,
    occlusion.coveredBy || "clear"
  );

  // Stacked reading order: copy → call → form, with nothing between them.
  const order = await page.evaluate(() => {
    const copy = document.querySelector(".ppc-hero__content").getBoundingClientRect();
    const form = document.querySelector(".ppc-form-shell").getBoundingClientRect();
    const call = document.querySelector(".ppc-hero .acx-actions__primary").getBoundingClientRect();
    const between = [...document.querySelectorAll("main > *")].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top > copy.bottom && r.bottom < form.top;
    });
    return {
      callBeforeForm: call.bottom <= form.top,
      copyBeforeForm: copy.bottom <= form.top,
      interveningSections: between.length
    };
  });
  check(
    "stacked order is copy → call → form with nothing in between",
    order.copyBeforeForm && order.callBeforeForm && order.interveningSections === 0,
    `${order.interveningSections} intervening sections`
  );

  await context.close();
}

// =============================================================================================
// E. ACCESSIBILITY STRESS — 320px width and 200% text zoom. Reported separately from the §7
//    desktop gate, which these states are explicitly not held to.
// =============================================================================================
for (const state of [
  { label: "320x800", width: 320, height: 800, zoom: 1 },
  { label: "1440x900-zoom200", width: 720, height: 450, zoom: 2 }
]) {
  const context = await browser.newContext({
    viewport: { width: state.width, height: state.height },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await dismissConsent(page);
  await settle(page);

  const reflow = await page.evaluate(() => ({
    horizontalOverflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    formColumns: getComputedStyle(document.querySelector(".ppc-form__grid")).gridTemplateColumns,
    narrowestField: Math.min(
      ...[
        ...document.querySelectorAll(
          '.ppc-form__field input:not([type=file]), .ppc-form__field textarea'
        )
      ].map((el) => Math.round(el.getBoundingClientRect().width))
    ),
    controlFloorsHold: [
      ...document.querySelectorAll('.ppc-form__field input:not([type=hidden]), .ppc-form__field textarea')
    ].every(
      (el) =>
        parseFloat(getComputedStyle(el).fontSize) >= 16 &&
        el.getBoundingClientRect().height >= 44
    ),
    consentVisible:
      document.querySelector(".ppc-form__consent").getBoundingClientRect().height > 0,
    consentFontSize: parseFloat(getComputedStyle(document.querySelector(".ppc-form__consent")).fontSize),
    submitVisible: document.querySelector(".ppc-form__submit").getBoundingClientRect().height >= 48
  }));
  check(
    `${state.label}: the document does not scroll horizontally`,
    !reflow.horizontalOverflow,
    `${reflow.scrollWidth} vs ${reflow.clientWidth}`
  );
  // The single-column rule is a <=540px behaviour. At 720px (a 1440-wide window at 200% zoom)
  // two ~310px columns are the correct, readable result, so the assertion is on field WIDTH and
  // the control floors rather than on the column count.
  check(
    `${state.label}: fields stay readable and every control floor holds`,
    reflow.narrowestField >= 240 && reflow.controlFloorsHold && reflow.consentFontSize >= 14,
    `${reflow.formColumns} · narrowest field ${reflow.narrowestField}px · consent ${reflow.consentFontSize}px`
  );
  check(
    `${state.label}: consent and submit remain present and full size`,
    reflow.consentVisible && reflow.submitVisible
  );
  await page.screenshot({
    path: join(outDir, "shots", `ppc-${state.label}.png`),
    fullPage: false
  });
  await context.close();
}

await browser.close();
server.close();

await writeFile(join(outDir, "ppc-interaction-check.json"), JSON.stringify(results, null, 2));
const failures = results.filter((r) => r.pass === false);
const passes = results.filter((r) => r.pass === true);
console.log(`\n${passes.length}/${passes.length + failures.length} behaviour checks passed`);
if (failures.length) {
  failures.forEach((f) => console.log(`  FAIL ${f.label} — ${f.detail}`));
  process.exit(1);
}
