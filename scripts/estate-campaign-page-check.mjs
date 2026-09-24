// ESTATE / INHERITED-HOME CAMPAIGN PAGE CHECK
// Real browser + built dist. /api/lead is intercepted: no inquiry, email, SMS, or CRM write occurs.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const ROUTE = "/estate-cleanout-san-jose/assessment/";
const THANKS = "/estate-cleanout-san-jose/assessment/thank-you/";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [1440, 1024, 768, 390, 320];
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml"
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
      let requestPath = normalize(decodeURIComponent(req.url.split("?")[0]));
      if (requestPath.endsWith("/")) requestPath += "index.html";
      let file = join(root, requestPath);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      } catch {
        if (!extname(file)) file = join(root, requestPath + "/index.html");
      }
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () =>
    resolve({ server, base: `http://127.0.0.1:${server.address().port}` })
  ));
}

const { server, base } = await serve("dist");
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

async function openPage({ width = 1024, lead } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 1000 } });
  const page = await context.newPage();
  const posts = [];
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  await context.route("**/api/lead", async (route) => {
    posts.push(route.request().postData() || "");
    if (!lead) return route.abort("failed");
    await route.fulfill({ status: lead.status, contentType: "application/json", body: JSON.stringify(lead.body) });
  });
  await page.addInitScript(() => {
    const key = "__estate_page_check_events";
    const dataLayer = [];
    dataLayer.push = function (...items) {
      const clean = items.map((item) => JSON.parse(JSON.stringify(item, (_key, value) =>
        typeof value === "function" ? "[function]" : value
      )));
      const all = JSON.parse(sessionStorage.getItem(key) || "[]");
      sessionStorage.setItem(key, JSON.stringify([...all, ...clean]));
      for (const item of items) if (typeof item?.eventCallback === "function") item.eventCallback();
      return Array.prototype.push.apply(this, items);
    };
    window.dataLayer = dataLayer;
  });
  await page.goto(base + ROUTE, { waitUntil: "load" });
  return { context, page, posts };
}

async function fillForm(page) {
  await page.locator('[name="full_name"]').fill("Estate Test Person");
  await page.locator('[name="phone"]').fill("4085550142");
  await page.locator('[name="email"]').fill("estate-test@example.test");
  await page.locator('[name="campaign_role"]').selectOption("Executor / personal representative");
  await page.locator('[name="property_detail"]').fill("Keep family papers and photo albums.");
  await page.locator('[name="privacy_consent"]').check();
  await page.evaluate(() => {
    const form = document.querySelector("form[data-ppc-form]");
    form.querySelectorAll('[name="cf-turnstile-response"]').forEach((node) => node.remove());
    const token = document.createElement("input");
    token.type = "hidden";
    token.name = "cf-turnstile-response";
    token.value = "synthetic-estate-page-check-token";
    form.append(token);
  });
}

const eventNames = (page) => page.evaluate(() =>
  JSON.parse(sessionStorage.getItem("__estate_page_check_events") || "[]").map((item) => item.event).filter(Boolean)
);

try {
  console.log(`\nEstate campaign page check — ${base}${ROUTE}\n`);
  console.log("A. Responsive render and supplied composition");
  for (const width of viewports) {
    const { context, page } = await openPage({ width });
    const state = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
      const ratio = (node) => {
        const r = node.getBoundingClientRect();
        return +(r.width / r.height).toFixed(2);
      };
      return {
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        h1: document.querySelector("h1")?.innerText.trim().replace(/\s+/g, " "),
        duplicateIds: [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))],
        rootId: document.body.id,
        heroImages: document.querySelectorAll(".estate-editorial-media .campaign-hero-photo").length,
        heroRatio: ratio(document.querySelector(".estate-editorial-media .campaign-hero-photo")),
        serviceRatios: [...document.querySelectorAll(".estate-service-line .campaign-service-photo")].map(ratio),
        requiredSections: [".ref-areas", ".ref-plan", ".estate-records", ".ref-call", "#estate-faq", "#estate-contact"]
          .every((selector) => document.querySelector(selector)),
        faqs: document.querySelectorAll("#estate-faq details").length,
        forms: document.querySelectorAll("form[data-ppc-form]").length,
        assessmentLinks: document.querySelectorAll('a[href="#estate-contact"]').length,
        phoneLinks: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
        visibleFieldNames: [...document.querySelectorAll("form[data-ppc-form] input, form[data-ppc-form] select, form[data-ppc-form] textarea")]
          .filter((control) => control.type !== "hidden" && control.name !== "company_website" && control.name !== "privacy_consent")
          .map((control) => control.name),
        removedFieldsAbsent: ["property_zip", "estate_role", "estate_contents_level", "estate_timeline"]
          .every((name) => !document.querySelector(`[name="${name}"]`)),
        submit: document.querySelector("[data-ppc-form-submit-label]")?.textContent.trim(),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content
      };
    });
    check(!state.overflow, `${width}px: no horizontal overflow`);
    check(state.h1 === "A Home Left Behind. A Clear Path Forward.", `${width}px: supplied hero copy is intact`, state.h1);
    check(state.duplicateIds.length === 0, `${width}px: no duplicate IDs`, state.duplicateIds.join(", "));
    check(state.rootId === "ac-inherited-estate" && state.requiredSections, `${width}px: inherited-estate layout and required sections render`);
    check(state.heroImages === 1 && Math.abs(state.heroRatio - 1.5) < 0.02, `${width}px: hero image keeps its 3:2 proportion`, String(state.heroRatio));
    const expectedServiceRatio = width < 580 ? 1 : 1.5;
    check(state.serviceRatios.length === 3 && state.serviceRatios.every((value) => Math.abs(value - expectedServiceRatio) < 0.02), `${width}px: service-row image crops match the supplied responsive cascade`, JSON.stringify(state.serviceRatios));
    check(state.faqs === 5 && state.forms === 1, `${width}px: five FAQs and one bottom form render`);
    check(state.assessmentLinks >= 4 && state.phoneLinks.every((href) => href === "tel:+14087857588"), `${width}px: assessment anchors and phone links are correct`);
    check(
      JSON.stringify(state.visibleFieldNames) === JSON.stringify(["full_name", "phone", "email", "campaign_role", "property_detail", "property_media[]"]) &&
        state.removedFieldsAbsent && state.submit === "Request an Assessment",
      `${width}px: shortened six-field estate form and CTA wording render`,
      JSON.stringify(state.visibleFieldNames)
    );
    check(state.canonical === "https://aseptaclean.com/estate-cleanout-san-jose/assessment/" && state.robots === "index, follow", `${width}px: canonical and indexing settings are preserved`);
    await context.close();
  }

  console.log("\nB. Keyboard and 200% reflow");
  {
    const { context, page } = await openPage({ width: 390 });
    await page.locator("#estate-faq summary").nth(1).focus();
    await page.keyboard.press("Enter");
    check(await page.locator("#estate-faq details").nth(1).evaluate((node) => node.open), "FAQ opens from the keyboard");
    await page.locator('.estate-hero-bottom-actions a[href="#estate-contact"]').click();
    check((await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "full_name", "assessment CTA moves focus to the bottom form");
    await context.close();
  }
  {
    const { context, page } = await openPage({ width: 720 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    check(!overflow, "200% zoom reflow equivalent (720 CSS px): no horizontal overflow");
    await context.close();
  }

  console.log("\nC. Mocked submission success and failure");
  {
    const { context, page, posts } = await openPage({ lead: {
      status: 201,
      body: { ok: true, confirmationCode: "AC-Q7B2KM", callbackWindow: "business-hours", confirmationEmailSent: true }
    }});
    await fillForm(page);
    await page.locator("[data-ppc-form-submit]").click();
    await page.waitForURL(`**${THANKS}`);
    const posted = posts[0] || "";
    check(posted.includes('name="campaign_role"') && posted.includes('name="campaign_context"'), "success request carries the estate role and fixed campaign context");
    check(posted.includes("Executor / personal representative") && posted.includes("estate_assessment"), "success request retains the estate role and campaign values");
    const names = await eventNames(page);
    check(names.includes("ppc_form_submit_attempt") && names.includes("ppc_form_success") && !names.includes("ppc_form_error"), "accepted submission raises the conversion event once", names.join(" → "));
    check(new URL(page.url()).pathname === THANKS, "accepted submission uses the existing campaign thank-you route", page.url());
    await context.close();
  }
  {
    const { context, page, posts } = await openPage({ lead: {
      status: 422,
      body: { ok: false, message: "Test rejection. No inquiry was sent.", errors: { campaign_role: "Select a valid option." } }
    }});
    await fillForm(page);
    await page.locator("[data-ppc-form-submit]").click();
    await page.waitForTimeout(250);
    const posted = posts[0] || "";
    check(posted.includes('name="campaign_role"') && posted.includes('name="campaign_context"'), "rejected request still carries estate role and campaign context");
    check((await page.locator('[name="full_name"]').inputValue()) === "Estate Test Person", "server rejection preserves entered values");
    check((await page.locator("[data-ppc-form-status]").textContent()).includes("Test rejection"), "server rejection is announced in the form");
    const names = await eventNames(page);
    check(names.includes("ppc_form_error") && !names.includes("ppc_form_success"), "rejected submission raises no conversion event", names.join(" → "));
    check(new URL(page.url()).pathname === ROUTE, "rejected submission stays on the campaign route", page.url());
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(`\n${checks - failures}/${checks} estate campaign page checks passed.`);
if (failures) process.exitCode = 1;
