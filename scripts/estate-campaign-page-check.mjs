// ESTATE CAMPAIGN PAGE CHECK — real browser, real dist/, /estate-cleanout-san-jose/assessment/
//
// scripts/estate-campaign-form-check.mjs proves the ENDPOINT accepts and rejects the right
// payloads. This proves the BROWSER half: what renders, what the CTAs point at, what happens on
// success and on failure, and that a lead event is raised when — and only when — the endpoint
// said it accepted a lead.
//
// scripts/analytics-events-check.mjs does the equivalent for the hoarding campaign and is left
// alone; its selectors are bound to that route's form id. This file is its estate sibling and
// adds the render checks the campaign brief asks for at 390px and 1440px.
//
// SCOPE HONESTY. `/api/lead` is INTERCEPTED — no live lead, no CRM record, no email, no SMS. The
// container is never loaded (Termly gates it and no consent is given here), so nothing is
// transmitted to Google either; what is asserted is what the page pushes to `dataLayer`, which
// is the only thing this repository controls. Whether GA4 then records `generate_lead` depends
// on a GTM tag that lives outside this repository.
//
// Usage: node scripts/estate-campaign-page-check.mjs   (npm run qa:estate:page)
import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const ROUTE = "/estate-cleanout-san-jose/assessment/";
const THANKS = "/estate-cleanout-san-jose/assessment/thank-you/";
const FORM = "request-walkthrough";
const SHOTS = process.env.SHOT_DIR || "";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml"
};

// Typed into the form below. None of these may ever appear in an analytics event.
const PII = {
  name: "Estate Test Person",
  phone: "408 555 0142",
  zip: "95125",
  email: "estate-test@example.test"
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
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` })
    );
  });
}

const { server, base } = await serve("dist");
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

// Every page in this suite: third-party hosts blocked (nothing leaves the machine), dataLayer
// mirrored into a plain array so pushes can be read back, and /api/lead under our control.
async function openPage({
  route = ROUTE,
  viewport = { width: 1440, height: 900 },
  lead
} = {}) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  await context.route("**://*.termly.io/**", (r) => r.abort());
  await context.route("**://*.googletagmanager.com/**", (r) => r.abort());
  await context.route("**://challenges.cloudflare.com/**", (r) => r.abort());

  const posts = [];
  await context.route("**/api/lead", async (r) => {
    posts.push(r.request().postData() ?? "");
    if (!lead) return r.abort();
    if (lead.abort) return r.abort("failed");
    await r.fulfill({
      status: lead.status,
      contentType: "application/json",
      body: JSON.stringify(lead.body)
    });
  });

  // TWO records, and the difference matters:
  //   window.__events  this document only — used to prove a page raises NOTHING on its own
  //   sessionStorage   survives the success redirect — used to read the events the FORM raised
  //                    just before it navigated, which is the only place they exist
  await page.addInitScript(() => {
    const KEY = "__ac_events_all";
    window.__events = [];
    const raw = [];
    raw.push = function (...items) {
      for (const item of items) {
        const plain = JSON.parse(
          JSON.stringify(item, (key, value) => (typeof value === "function" ? "[function]" : value))
        );
        window.__events.push(plain);
        try {
          const all = JSON.parse(window.sessionStorage.getItem(KEY) ?? "[]");
          all.push(plain);
          window.sessionStorage.setItem(KEY, JSON.stringify(all));
        } catch {
          /* storage unavailable — the per-document record still applies */
        }
        // Run GTM's callback contract ourselves so the form's transmission window resolves
        // without a container. Without this the success path waits out its own 1s timeout.
        if (typeof item?.eventCallback === "function") item.eventCallback();
      }
      return Array.prototype.push.apply(this, items);
    };
    window.dataLayer = raw;
  });

  await page.goto(base + route, { waitUntil: "load" });
  return { context, page, posts };
}

const events = (page) => page.evaluate(() => window.__events ?? []);
const allEvents = (page) =>
  page.evaluate(() => {
    try {
      return JSON.parse(window.sessionStorage.getItem("__ac_events_all") ?? "[]");
    } catch {
      return [];
    }
  });
const named = async (page, name) => (await events(page)).filter((e) => e.event === name);
const namedAll = async (page, name) => (await allEvents(page)).filter((e) => e.event === name);

// Turnstile's script host is blocked here, but the widget's placeholder div is server-rendered,
// so the form's token gate still engages and would refuse every submit. Settle to exactly ONE
// `cf-turnstile-response` input carrying a value — the same technique
// scripts/analytics-events-check.mjs uses, and for the same reason: appending a second input
// makes `form.elements.namedItem` return a RadioNodeList, which the form correctly treats as an
// unsatisfied challenge. The anti-spam control itself is unchanged; it is satisfied, not removed.
const setTurnstileToken = (page) =>
  page.evaluate(() => {
    const form = document.querySelector("form.ppc-form");
    form.querySelectorAll('[name="cf-turnstile-response"]').forEach((node) => node.remove());
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "cf-turnstile-response";
    input.value = "estate-check-token";
    form.append(input);
  });

// The optional fields live inside a <details> disclosure. Opening it is a visitor action, so the
// helper performs it rather than reaching past the control.
const openOptional = (page) => page.locator(`#${FORM} .ppc-optional__summary`).click();

async function fillRequired(page, extra = {}) {
  await page.fill(`#${FORM}-name`, PII.name);
  await page.fill(`#${FORM}-phone`, PII.phone);
  await page.fill(`#${FORM}-zip`, PII.zip);
  await page.fill(`#${FORM}-email`, PII.email);
  if (extra.detail || extra.status) {
    await openOptional(page);
    if (extra.detail) await page.fill(`#${FORM}-detail`, extra.detail);
    if (extra.status) await page.selectOption(`#${FORM}-status`, extra.status);
    // Close it again where the case is specifically about values surviving a close.
    if (extra.closeAfter) await openOptional(page);
  }
  await page.check(`#${FORM} input[name="privacy_consent"]`);
  await setTurnstileToken(page);
}

const OK_BODY = {
  ok: true,
  submissionId: "3f2a1b44-0000-4000-8000-abcdefabcdef",
  confirmationCode: "AC-Q7B2KM",
  callbackWindow: "business-hours",
  confirmationEmailSent: true
};

console.log(`\nEstate campaign page check — ${base}${ROUTE}\n`);

// ── A. RENDER ────────────────────────────────────────────────────────────────────────────────
console.log("A. Render — 1440px and 390px");
for (const viewport of [
  { width: 1440, height: 900, label: "desktop 1440x900" },
  { width: 768, height: 1024, label: "tablet 768x1024" },
  { width: 390, height: 844, label: "mobile 390x844" }
]) {
  const { context, page } = await openPage({ viewport });

  const overflow = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    win: window.innerWidth,
    // Every element that sticks out past the viewport, if any.
    culprits: [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 4)
      .map((el) => `${el.tagName.toLowerCase()}.${el.className || "—"}`.slice(0, 60))
  }));
  check(
    overflow.doc <= overflow.win + 1,
    `${viewport.label}: the document does not scroll horizontally`,
    `${overflow.doc} vs ${overflow.win} ${overflow.culprits.join(", ")}`
  );

  const h1 = await page.locator("h1").allTextContents();
  check(h1.length === 1, `${viewport.label}: exactly one H1`, JSON.stringify(h1));

  // The refresh removed the dark photographic hero. Assert the replacement, not just its absence:
  // a warm-white opening surface with no image inside it.
  const opening = await page.evaluate(() => {
    const hero = document.querySelector(".est-hero");
    if (!hero) return { ok: false };
    return {
      ok: true,
      background: getComputedStyle(hero).backgroundColor,
      images: hero.querySelectorAll("img").length,
      formPanels: hero.querySelectorAll("form.ppc-form.is-light").length
    };
  });
  check(
    opening.ok && opening.images === 0 && opening.formPanels === 1,
    `${viewport.label}: the opening is a bright panel with no photographic background`,
    JSON.stringify(opening)
  );

  // Every image on the page keeps its 4:3 proportion — no photo stretched to a text column.
  const proportions = await page.evaluate(() =>
    [...document.querySelectorAll(".est-figure img")].map((img) => {
      const r = img.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), ratio: +(r.width / r.height).toFixed(2) };
    })
  );
  check(
    proportions.length === 2 && proportions.every((p) => Math.abs(p.ratio - 4 / 3) < 0.02),
    `${viewport.label}: both illustrations render at 4:3`,
    JSON.stringify(proportions)
  );

  const captions = await page.locator(".est-figure__caption").allTextContents();
  check(
    captions.length === 2 && captions.every((c) => c.trim() === "Illustrative image"),
    `${viewport.label}: each illustration carries the "Illustrative image" caption`,
    JSON.stringify(captions)
  );

  if (SHOTS) {
    await mkdir(SHOTS, { recursive: true });
    await page.screenshot({
      path: join(SHOTS, `estate-${viewport.width}.png`),
      fullPage: true
    });
  }
  await context.close();
}

// ── A2. TRUST BAR ────────────────────────────────────────────────────────────────────────────
console.log("\nA2. Trust bar");
{
  // Every width the request names, plus an enlarged-text pass at the narrowest.
  for (const width of [320, 390, 768, 1024, 1440]) {
    const { context, page } = await openPage({ viewport: { width, height: 900 } });
    const bar = await page.evaluate(() => {
      const panel = document.querySelector(".est-trust__panel");
      if (!panel) return { present: false };
      const cs = getComputedStyle(panel);
      const items = [...panel.querySelectorAll(".est-trust__item")];
      // "Matching the page's existing content width" means matching the EDGES the rest of the
      // page's content sits on — not the shell's border-box width, which includes its own inline
      // padding. Compared against a real section grid rather than a computed number.
      const edges = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return `${Math.round(r.left)}→${Math.round(r.right)}`;
      };
      return {
        present: true,
        radius: cs.borderTopLeftRadius,
        padding: cs.paddingTop,
        borderWidth: cs.borderTopWidth,
        background: cs.backgroundColor,
        columns: cs.gridTemplateColumns.split(" ").length,
        alignItems: cs.alignItems,
        panelEdges: edges(panel),
        heroEdges: edges(document.querySelector(".est-hero__grid")),
        offerEdges: edges(document.querySelector(".est-offer__grid")),
        // Vertical rules between columns, horizontal rules when stacked.
        verticalRules: items.filter((el) => parseFloat(getComputedStyle(el).borderLeftWidth) > 0)
          .length,
        horizontalRules: items.filter((el) => parseFloat(getComputedStyle(el).borderTopWidth) > 0)
          .length,
        tops: items.map((el) => Math.round(el.getBoundingClientRect().top)),
        // Nothing that carries TEXT may clip, truncate or overflow its box. SVG is excluded on
        // purpose: `overflow: hidden` is the UA default on an <svg> element, so including it
        // would flag every icon on the page as a clipped text node.
        clipping: items.some((el) =>
          [el, ...el.querySelectorAll("p, span, div")].some((node) => {
            const s = getComputedStyle(node);
            if (s.display === "inline") return false;
            return (
              s.overflow === "hidden" ||
              s.textOverflow === "ellipsis" ||
              node.scrollWidth > node.clientWidth + 1
            );
          })
        ),
        justified: items.some((el) =>
          [...el.querySelectorAll("p")].some((p) => getComputedStyle(p).textAlign === "justify")
        ),
        nowrapDescriptions: [...panel.querySelectorAll(".est-trust__desc")].filter(
          (p) => getComputedStyle(p).whiteSpace === "nowrap"
        ).length,
        keepTogether: [...panel.querySelectorAll(".est-trust__keep")].map(
          (el) => getComputedStyle(el).whiteSpace
        ),
        icons: [...panel.querySelectorAll(".est-trust__icon svg")].map((svg) => {
          const r = svg.getBoundingClientRect();
          return `${Math.round(r.width)}x${Math.round(r.height)}`;
        }),
        titleSizes: [...panel.querySelectorAll(".est-trust__title")].map(
          (el) => `${getComputedStyle(el).fontSize}/${getComputedStyle(el).fontWeight}`
        ),
        descStyles: [...panel.querySelectorAll(".est-trust__desc")].map(
          (el) => `${getComputedStyle(el).fontSize}/${getComputedStyle(el).lineHeight}`
        ),
        // Heading-element purity: the titles must NOT be h1–h6 (AGENTS.md §6 law 1).
        headingTags: [...panel.querySelectorAll("h1,h2,h3,h4,h5,h6")].length,
        itemCount: items.length
      };
    });

    const stacked = width < 800;
    check(bar.present, `${width}px: the trust bar renders`);
    check(
      bar.radius === "12px" && bar.padding === (width <= 640 ? "20px" : "24px") &&
        bar.borderWidth === "1px" && bar.background === "rgb(255, 255, 255)",
      `${width}px: one white container, 1px border, 12px radius, ${width <= 640 ? 20 : 24}px padding`,
      JSON.stringify({ r: bar.radius, p: bar.padding, b: bar.borderWidth, bg: bar.background })
    );
    check(
      bar.panelEdges === bar.heroEdges && bar.panelEdges === bar.offerEdges,
      `${width}px: the bar sits on the page's existing content edges`,
      `bar ${bar.panelEdges} · hero ${bar.heroEdges} · offer ${bar.offerEdges}`
    );
    check(
      stacked ? bar.columns === 1 : bar.columns === bar.itemCount,
      `${width}px: ${stacked ? "stacked into one column" : `${bar.itemCount} column(s), no fixed widths left behind`}`,
      `${bar.columns} column(s) for ${bar.itemCount} item(s)`
    );
    check(
      stacked
        ? bar.verticalRules === 0 && bar.horizontalRules === bar.itemCount - 1
        : bar.verticalRules === bar.itemCount - 1 && bar.horizontalRules === 0,
      `${width}px: ${stacked ? "horizontal" : "vertical"} separators between items only`,
      `v=${bar.verticalRules} h=${bar.horizontalRules} items=${bar.itemCount}`
    );
    if (!stacked && bar.itemCount > 1) {
      check(
        new Set(bar.tops).size === 1,
        `${width}px: every item is top-aligned`,
        JSON.stringify(bar.tops)
      );
    }
    check(bar.alignItems === "start", `${width}px: items keep their natural heights`, bar.alignItems);
    check(!bar.clipping, `${width}px: nothing is clipped, truncated or ellipsised`);
    check(!bar.justified, `${width}px: no justified text`);
    check(
      bar.nowrapDescriptions === 0 && bar.keepTogether.every((v) => v === "nowrap"),
      `${width}px: nowrap is scoped to the kept-together token, never a whole description`,
      JSON.stringify({ desc: bar.nowrapDescriptions, keep: bar.keepTogether })
    );
    check(
      new Set(bar.icons).size === 1 && bar.icons[0] === "20x20",
      `${width}px: icons are one consistent size`,
      JSON.stringify(bar.icons)
    );
    check(
      bar.titleSizes.every((v) => v === "16px/650") && bar.descStyles.every((v) => v === "14px/20.3px"),
      `${width}px: 16px semibold headings, 14px/1.45 supporting text`,
      JSON.stringify({ t: bar.titleSizes, d: bar.descStyles })
    );
    check(
      bar.headingTags === 0,
      `${width}px: the bar declares no heading element (type law 1)`,
      `${bar.headingTags} found`
    );

    const docWidth = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));
    check(
      docWidth.doc <= docWidth.win + 1,
      `${width}px: no horizontal document scroll with the bar in place`,
      `${docWidth.doc} vs ${docWidth.win}`
    );

    await context.close();
  }

  // ENLARGED TEXT — 200% root font at the narrowest supported width, a harsher condition than
  // browser zoom (which scales the viewport with the text). Scoped to the BAR: the assertion is
  // that its own content reflows rather than clipping or forcing its column wider than the
  // viewport. Whether the whole document also fits at a 32px root is a separate, page-wide
  // property measured against the hoarding route as a control below.
  {
    const { context, page } = await openPage({ viewport: { width: 320, height: 900 } });
    await page.addStyleTag({ content: "html { font-size: 32px }" });
    await page.waitForTimeout(300);
    const enlarged = await page.evaluate(() => {
      const panel = document.querySelector(".est-trust__panel");
      const items = [...panel.querySelectorAll(".est-trust__item")];
      const clipped = items.some((el) =>
        [el, ...el.querySelectorAll("p, span, div")].some(
          (n) => getComputedStyle(n).display !== "inline" && n.scrollWidth > n.clientWidth + 1
        )
      );
      // The bar's own content requirement, measured BEFORE it is detached — a detached subtree
      // reports zero and would make this read as a suspiciously perfect result.
      const intrinsic = Math.max(
        0,
        ...items.flatMap((el) => [...el.querySelectorAll("p")].map((p) => Math.ceil(p.scrollWidth)))
      );
      // CAUSATION, not correlation. A full-width block stretches to whatever the document's
      // scroll width already is, so "the panel is wider than the viewport" proves nothing about
      // which element forced it. Removing the bar and re-measuring does.
      const withBar = document.documentElement.scrollWidth;
      document.querySelector(".est-trust").remove();
      const withoutBar = document.documentElement.scrollWidth;
      return { clipped, withBar, withoutBar, intrinsic, win: window.innerWidth };
    });
    check(
      !enlarged.clipped && enlarged.withBar === enlarged.withoutBar,
      "320px at 200% root font: the bar reflows without clipping and does not widen the document",
      `doc ${enlarged.withBar} with the bar, ${enlarged.withoutBar} without it; widest bar ` +
        `paragraph needs ${enlarged.intrinsic}px of a ${enlarged.win}px viewport`
    );
    await context.close();
  }

  // All three trust items were explicitly approved for this route on 2026-09-09.
  {
    const { context, page } = await openPage();
    const text = await page.evaluate(() =>
      [...document.querySelectorAll(".est-trust p, .est-trust span")]
        .map((el) => el.textContent.trim())
        .join(" | ")
    );
    check(
      /CDPH Registered/.test(text) && /Trauma Scene Waste/.test(text) &&
        /Management Practitioner/.test(text) && /TSW 933/.test(text),
      "the approved CDPH / TSW 933 item ships on this route",
      JSON.stringify(text)
    );
    check(
      /Insured/.test(text) && !/[Cc]ertificate/.test(text),
      "the approved one-word Insured item ships without broader certificate wording",
      JSON.stringify(text)
    );
    check(
      /Owner-Led Projects/.test(text) && /Matthew Ruiz/.test(text),
      "the owner-led item ships — permitted proof under doc 21 §6"
    );
    await context.close();
  }

  // CONTROL: is the 32px-root document overflow something this bar introduced, or a property the
  // campaign layout already had? Measured on the untouched hoarding route under identical
  // conditions. Reported either way — a page-wide reflow limit is worth knowing about even when
  // it is not a regression.
  {
    const { context, page } = await openPage({
      route: "/hoarding-cleanup-san-jose/assessment/",
      viewport: { width: 320, height: 900 }
    });
    await page.addStyleTag({ content: "html { font-size: 32px }" });
    await page.waitForTimeout(300);
    const control = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));
    const { context: c2, page: p2 } = await openPage({ viewport: { width: 320, height: 900 } });
    await p2.addStyleTag({ content: "html { font-size: 32px }" });
    await p2.waitForTimeout(300);
    const estate = await p2.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));
    check(
      estate.doc <= control.doc,
      "320px at 200% root font: the estate route is no worse than the untouched hoarding route",
      `estate ${estate.doc} vs hoarding ${control.doc} (viewport ${estate.win}) — a 32px root font ` +
        `overflows both; this is a pre-existing campaign-layout property, not a trust-bar defect`
    );
    await context.close();
    await c2.close();
  }
}

// ── B. CONTACT AFFORDANCES ───────────────────────────────────────────────────────────────────
console.log("\nB. Calls and walkthrough requests");
{
  const { context, page } = await openPage();

  const tel = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="tel:"]')].map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent.trim()
    }))
  );
  check(tel.length >= 3, "the page carries several call links", `${tel.length} found`);
  check(
    tel.every((a) => a.href === "tel:+14087857588"),
    "every call link is the verified E.164 number",
    JSON.stringify([...new Set(tel.map((a) => a.href))])
  );

  const walkthrough = await page.evaluate(
    (formId) =>
      [...document.querySelectorAll(`a[href="#${formId}"]`)].map((a) => a.textContent.trim()),
    FORM
  );
  check(
    walkthrough.length >= 3,
    "every walkthrough CTA links to the real form anchor",
    `${walkthrough.length}: ${JSON.stringify(walkthrough)}`
  );
  check(
    await page.locator(`form#${FORM}`).count() === 1,
    "the anchor resolves to exactly one real form on the page"
  );
  check(
    await page.locator(`form#${FORM}`).getAttribute("action") === "/api/lead",
    "the form posts to the site's one lead endpoint",
    String(await page.locator(`form#${FORM}`).getAttribute("action"))
  );
  check(
    (await page.locator(`#${FORM}-detail`).getAttribute("required")) === null &&
      (await page.locator(`#${FORM}-detail`).getAttribute("minlength")) === null,
    "the details field is optional with no minimum length"
  );
  check(
    (await page.locator(`#${FORM}-status`).inputValue()) === "",
    "the property-description selector starts unselected"
  );

  // ── The optional-details disclosure ──────────────────────────────────────────────────────
  const disclosure = page.locator(`#${FORM} [data-ppc-optional]`);
  check(
    (await disclosure.count()) === 1 &&
      (await page.locator(`#${FORM} .ppc-optional__summary`).textContent())?.trim() ===
        "Add property details or photos (optional)",
    "the optional fields sit behind a labelled disclosure"
  );
  check(
    (await disclosure.evaluate((el) => el.open)) === false &&
      (await page.locator(`#${FORM}-detail`).isVisible()) === false,
    "the disclosure starts closed"
  );
  // Consent must never be behind it.
  check(
    (await page
      .locator(`#${FORM} input[name="privacy_consent"]`)
      .evaluate((el) => Boolean(el.closest("[data-ppc-optional]")))) === false &&
      (await page.locator(`#${FORM} input[name="privacy_consent"]`).isVisible()) === true,
    "the consent control is visible and outside the disclosure"
  );
  await openOptional(page);
  check(
    (await disclosure.evaluate((el) => el.open)) === true &&
      (await page.locator(`#${FORM}-detail`).isVisible()) === true &&
      (await page.locator(`#${FORM}-media`).isVisible()) === true,
    "opening the disclosure reveals the details and photo controls"
  );
  // Typed values survive a close — the refresh requires it, and it is what makes the control
  // safe to collapse before submitting.
  await page.fill(`#${FORM}-detail`, "Mum's house, three bedrooms.");
  await openOptional(page);
  check(
    (await disclosure.evaluate((el) => el.open)) === false &&
      (await page.locator(`#${FORM}-detail`).inputValue()) === "Mum's house, three bedrooms.",
    "a typed value survives closing the disclosure"
  );
  for (const field of ["name", "phone", "zip", "email"]) {
    check(
      (await page.locator(`#${FORM}-${field}`).getAttribute("required")) !== null,
      `${field} is required`
    );
  }
  check(
    await page.locator(`#${FORM} a[href="/privacy/"]`).count() === 1,
    "the existing privacy link is present in the consent block"
  );
  check(
    (await page.locator(`#${FORM} input[name="privacy_consent"]`).isChecked()) === false,
    "consent is not pre-checked"
  );

  // Keyboard reachability of the hero's own two actions.
  const focusRing = await page.evaluate(() => {
    const link = document.querySelector('.est-hero__actions a[href^="tel:"]');
    link.focus();
    const style = getComputedStyle(link);
    return { focused: document.activeElement === link, outline: style.outlineWidth };
  });
  check(focusRing.focused, "the hero call action is keyboard focusable");

  await context.close();
}

// ── C. MOBILE STICKY BAR ─────────────────────────────────────────────────────────────────────
console.log("\nC. Mobile contact bar");
{
  const { context, page } = await openPage({ viewport: { width: 390, height: 844 } });
  // Settle at the true bottom. One scrollTo is not enough: lazy images resolve and the bar's own
  // ResizeObserver adds the body reservation, both of which move the end of the document. A
  // sticky bar necessarily overlays content MID-scroll — the question this asks is whether the
  // reservation leaves the footer fully reachable once the page is at rest.
  for (let attempt = 0; attempt < 8; attempt += 1) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(400);
  }

  const overlap = await page.evaluate(() => {
    const bar = document.querySelector(".ppc-bar");
    if (!bar) return { present: false };
    const b = bar.getBoundingClientRect();
    const hits = [...document.querySelectorAll(".ppc-foot a, .ppc-foot button")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && r.bottom > b.top && r.top < b.bottom;
      })
      .map((el) => el.textContent.trim().slice(0, 30));
    const foot = document.querySelector(".ppc-foot").getBoundingClientRect();
    return {
      present: true,
      visible: b.height > 0,
      hits,
      reserved: Math.round(foot.bottom) <= Math.round(b.top)
    };
  });
  check(
    overlap.present && overlap.visible,
    "the sticky contact bar appears once the hero has left the viewport"
  );
  check(
    overlap.hits?.length === 0 && overlap.reserved,
    "at the bottom of the page the sticky bar covers no footer link or Cookie Settings control",
    JSON.stringify(overlap)
  );

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.locator(`#${FORM}-name`).focus();
  await page.waitForTimeout(400);
  const whileEditing = await page.evaluate(() => {
    const bar = document.querySelector(".ppc-bar");
    const consent = document.querySelector('input[name="privacy_consent"]');
    if (!bar || !consent) return { ok: false };
    const b = bar.getBoundingClientRect();
    const c = consent.getBoundingClientRect();
    return { ok: true, hidden: b.height === 0, clash: c.bottom > b.top && c.top < b.bottom };
  });
  check(
    whileEditing.ok && (whileEditing.hidden || !whileEditing.clash),
    "the sticky bar never covers a form control while a field is focused",
    JSON.stringify(whileEditing)
  );

  await context.close();
}

// ── D. SUBMISSION BEHAVIOUR AND THE LEAD EVENT ───────────────────────────────────────────────
console.log("\nD. Submission and the lead event");

// D1 — locally invalid: nothing leaves the browser, no event of any kind.
{
  const { context, page, posts } = await openPage({ lead: { status: 201, body: OK_BODY } });
  await page.fill(`#${FORM}-name`, PII.name);
  await page.click(`#${FORM} [data-ppc-form-submit]`);
  await page.waitForTimeout(400);
  const all = await events(page);
  check(posts.length === 0, "a locally invalid submit sends no request", `${posts.length}`);
  check(
    !all.some((e) => ["ppc_form_submit_attempt", "ppc_form_success"].includes(e.event)),
    "a locally invalid submit raises no attempt and no success event",
    JSON.stringify(all.map((e) => e.event))
  );
  check(
    (await page.locator(`#${FORM} [data-ppc-form-errors]`).isVisible()) === true,
    "the error summary is announced"
  );
  await context.close();
}

// D2 — SUCCESS with the optional details left BLANK. The brief's headline case.
{
  const { context, page, posts } = await openPage({ lead: { status: 201, body: OK_BODY } });
  await fillRequired(page);
  await page.click(`#${FORM} [data-ppc-form-submit]`);
  await page.waitForURL(/thank-you/, { timeout: 8000 });

  check(posts.length === 1, "a valid submit sends exactly one request", `${posts.length}`);
  check(
    posts[0].includes('name="property_situation"') &&
      posts[0].includes("Inherited or estate property"),
    "the request carries the established estate service value"
  );
  // The confirmation page strips its own query with replaceState on first read, so by the time
  // this resolves the URL is the bare route — which is the point: it cannot be shared, bookmarked
  // or refreshed into looking like a second request.
  check(
    page.url().endsWith(THANKS),
    "a confirmed submission lands on the campaign confirmation route with its query stripped",
    page.url()
  );

  // The success event was raised on the FORM page, before the redirect; read it from the
  // thank-you document's own record plus sessionStorage, which is what dedupes across the two.
  const claimed = await page.evaluate(() => window.sessionStorage.getItem("ac_ppc_lead:AC-Q7B2KM"));
  check(claimed === "1", "the lead is claimed once, keyed on the endpoint's confirmation code");

  const onThanks = await named(page, "ppc_form_success");
  check(
    onThanks.length === 0,
    "the confirmation page does NOT raise a second success for an already-claimed lead",
    JSON.stringify(onThanks)
  );
  check(
    (await page.locator("h1").textContent()).includes("Request received"),
    "the confirmation page states the confirmed outcome"
  );

  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(300);
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "refreshing the confirmation page raises no lead event"
  );
  await context.close();
}

// D2b — the same success, read back across the redirect. The events are raised on the FORM page
// microseconds before it navigates, so they are recovered from the cross-document record.
{
  const { context, page } = await openPage({ lead: { status: 201, body: OK_BODY } });
  await fillRequired(page, { status: "Estate after a loss" });
  await page.click(`#${FORM} [data-ppc-form-submit]`);
  await page.waitForURL(/thank-you/, { timeout: 8000 });
  await page.waitForTimeout(300);
  const success = await namedAll(page, "ppc_form_success");
  const attempt = await namedAll(page, "ppc_form_submit_attempt");
  check(
    attempt.length === 1 && success.length === 1,
    "one attempt and exactly one ppc_form_success across the whole confirmed journey",
    `attempt=${attempt.length} success=${success.length}`
  );
  check(
    success[0]?.form_id === FORM && success[0]?.page_path === ROUTE,
    "the success event identifies this form and this route, and is raised BEFORE the redirect",
    JSON.stringify(success[0])
  );
  const serialised = JSON.stringify(await allEvents(page));
  check(
    !Object.values(PII).some((value) => serialised.includes(value)) &&
      !serialised.includes("Estate after a loss"),
    "no name, phone, email, ZIP or submitted answer appears in any event"
  );
  await context.close();
}

// D3 — a rejected submission is not a lead, and nothing the visitor typed is lost.
{
  const { context, page } = await openPage({
    lead: {
      status: 422,
      body: {
        ok: false,
        message: "Review the highlighted information and submit again.",
        errors: { property_zip: "Enter a valid ZIP code." }
      }
    }
  });
  await fillRequired(page, { detail: "Mum's house, three bedrooms." });
  await page.click(`#${FORM} [data-ppc-form-submit]`);
  await page.waitForTimeout(800);

  const success = await named(page, "ppc_form_success");
  const errored = await named(page, "ppc_form_error");
  check(success.length === 0, "a 422 raises NO ppc_form_success", JSON.stringify(success));
  check(
    errored.length === 1 && errored[0].error_type === "server_validation",
    "a 422 raises one categorised ppc_form_error",
    JSON.stringify(errored[0])
  );
  check(!page.url().includes("thank-you"), "a rejected submission does not navigate", page.url());
  check(
    (await page.locator(`#${FORM}-name`).inputValue()) === PII.name &&
      (await page.locator(`#${FORM}-email`).inputValue()) === PII.email &&
      (await page.locator(`#${FORM}-detail`).inputValue()) === "Mum's house, three bedrooms.",
    "every entered value is preserved after a submission error"
  );
  check(
    (await page.locator(`#${FORM} [data-ppc-form-submit]`).isDisabled()) === false,
    "the submit control is re-enabled after a failure"
  );
  check(
    (await page.locator(`#${FORM} [data-ppc-form-status]`).textContent())?.includes("Review the highlighted"),
    "the server's own message is shown to the visitor"
  );
  await context.close();
}

// D4 — a network failure is a failure, not a lead.
{
  const { context, page } = await openPage({ lead: { abort: true } });
  await fillRequired(page);
  await page.click(`#${FORM} [data-ppc-form-submit]`);
  await page.waitForTimeout(1000);
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "a network failure raises NO ppc_form_success"
  );
  check(
    (await named(page, "ppc_form_error")).some((e) => e.error_type === "network"),
    "a network failure raises one ppc_form_error categorised network",
    JSON.stringify(await named(page, "ppc_form_error"))
  );
  check(
    (await page.locator(`#${FORM} [data-ppc-form-submit]`).isDisabled()) === false,
    "the submit control is re-enabled after a network failure"
  );
  await context.close();
}

// D5 — a double-click is one lead.
{
  const { context, page, posts } = await openPage({ lead: { status: 201, body: OK_BODY } });
  await fillRequired(page);
  // All three dispatched synchronously, before any navigation can remove the control — a real
  // double-click, not three sequential attempts.
  await page.evaluate((formId) => {
    const button = document.querySelector(`#${formId} [data-ppc-form-submit]`);
    button.click();
    button.click();
    button.click();
  }, FORM);
  await page.waitForURL(/thank-you/, { timeout: 8000 });
  await page.waitForTimeout(300);
  check(
    posts.length === 1 && (await namedAll(page, "ppc_form_success")).length === 1,
    "three rapid submits produce one request and one success",
    `posts=${posts.length} success=${(await namedAll(page, "ppc_form_success")).length}`
  );
  await context.close();
}

// ── E. A PHONE CLICK IS NOT A CALL AND NOT A LEAD ────────────────────────────────────────────
console.log("\nE. Call clicks stay distinct");
{
  const { context, page } = await openPage();
  await context.route("tel:**", (r) => r.abort());
  await page.evaluate(() => {
    document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
      a.addEventListener("click", (event) => event.preventDefault());
    });
  });
  await page.locator('.est-hero__actions a[href^="tel:"]').click();
  await page.waitForTimeout(300);
  const clicks = await named(page, "phone_click");
  check(clicks.length === 1, "a tel: click raises exactly one phone_click", `${clicks.length}`);
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "a phone click is never counted as a lead"
  );
  check(
    !JSON.stringify(clicks).includes("4087857588") &&
      !JSON.stringify(clicks).includes("785-7588"),
    "phone_click carries no telephone number",
    JSON.stringify(clicks[0])
  );
  await context.close();
}

// ── F. THE CONFIRMATION ROUTE'S HONEST DEFAULT ───────────────────────────────────────────────
console.log("\nF. Confirmation route");
{
  const { context, page } = await openPage({ route: THANKS });
  check(
    (await page.locator("h1").textContent()).includes("does not confirm"),
    "a bare confirmation-page view states that nothing is confirmed"
  );
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "a bare confirmation-page view raises NO lead event"
  );
  await context.close();
}
{
  const { context, page } = await openPage({ route: `${THANKS}?received=1&code=AC-NOTREAL` });
  await page.waitForTimeout(300);
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "a malformed confirmation code raises NO lead event"
  );
  await context.close();
}
{
  const { context, page } = await openPage({ route: `${THANKS}?received=1&code=AC-7HJ4NP` });
  await page.waitForTimeout(300);
  const recovered = await named(page, "ppc_form_success");
  check(
    recovered.length === 1 && recovered[0].recovered === true,
    "a confirmed lead never recorded by the form raises exactly one recovered event",
    JSON.stringify(recovered[0])
  );
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(300);
  check(
    (await named(page, "ppc_form_success")).length === 0,
    "reloading that same URL never raises a second one"
  );
  await context.close();
}

await browser.close();
server.close();

console.log(
  `\n${checks - failures}/${checks} estate page checks passed.${failures ? ` ${failures} FAILED.` : ""}`
);
process.exit(failures ? 1 : 0);
