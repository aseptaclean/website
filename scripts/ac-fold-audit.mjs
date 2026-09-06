// AC-CP70-91130-1.1 §7 above-the-fold acceptance gate + CSS profile role measurement.
//
// Serves dist/ and measures the REAL rendered DOM. Nothing here infers a pass from a CSS
// declaration, a token name or a successful build. Every number is read from
// getBoundingClientRect()/getComputedStyle() at scrollY = 0, 100% zoom, after fonts and
// above-the-fold images settle.
//
// §7 definitions implemented verbatim:
//   V = window.innerHeight
//   T = measured hero top at scroll zero, including all real header/utility space above it
//   B = height of any persistent bottom obstruction in the tested state (0 only when none)
//   S = 16px minimum clearance
//   PASS requires heroBottom <= V - B - 16, with no clipping, no inner scroll, no occlusion.
//
// Usage: node scripts/ac-fold-audit.mjs <outDir> [--label=before]
import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./.fold-audit";
const labelArg = process.argv.find((a) => a.startsWith("--label="));
const LABEL = labelArg ? labelArg.slice("--label=".length) : "run";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// The eight photographic-hero pages named in profile §4 / §7.
const PHOTO_HERO_PAGES = [
  ["/", "01-home", "photo_form"],
  ["/hoarding-cleanup-san-jose/", "02-hoarding", "photo_form"],
  ["/extreme-cleaning-san-jose/", "03-extreme", "photo_form"],
  ["/deep-cleaning-san-jose/", "04-deep-cleaning", "photo_form"],
  ["/crime-scene-trauma-cleanup-san-jose/", "05-trauma", "photo_form"],
  ["/rodent-dropping-cleanup-san-jose/", "06-rodent", "photo_form"],
  ["/services/", "07-services", "compact_photo"],
  ["/about/", "08-about", "compact_photo"]
];

// Profile §7 desktop matrix. These are CSS viewport pixels at 100% zoom.
const DESKTOP = [
  { label: "1440x900", width: 1440, height: 900 },
  { label: "1536x864", width: 1536, height: 864 },
  { label: "1366x768", width: 1366, height: 768 },
  { label: "1280x800", width: 1280, height: 800 }
];

const MOBILE = { label: "390x844", width: 390, height: 844 };

// Profile §8.3: the helper's data-ac-audit defaults are hooks, not claims about production
// classes. These are the ACTUAL classes this build emits, read out of dist/. A role with an
// empty selector stays UNVERIFIED — it is never silently treated as a pass.
const AC_CSS_AUDIT_SELECTORS = {
  container: ".ac-shell",
  header: ".site-nav",
  utility: "", // No utility/announcement row exists in this build. UNVERIFIED by design.
  hero: ".acx-hero, .acx-phero",
  heroGrid: ".acx-hero__grid",
  heroCopy: ".acx-hero__content, .acx-phero__copy",
  heroMedia: ".acx-hero__media, .acx-phero__media",
  heroOverlay: ".acx-hero__overlay, .acx-phero__overlay",
  heroForm: ".acx-hero__form",
  formFields: ".hero-form__grid",
  h1: "h1",
  primaryCall: ".acx-hero .acx-actions__primary, .acx-phero .acx-actions__primary",
  split: ".acx-split",
  splitImage: ".acx-split__media img",
  serviceGrid: ".acx-cards",
  serviceCard: ".acx-cards__item",
  cardImage: ".acx-cards__media",
  process: ".acx-steps",
  faq: ".ac-faq-accordion",
  footer: ".foot",
  footerGrid: ".foot__grid, .foot__cols",
  legal: ".foot__bot"
};

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

// Runs in the page. Implements §7's V/T/B/S arithmetic against the real boxes.
const MEASURE = (selectors) => {
  const round = (n) => Math.round(n * 100) / 100;
  const V = window.innerHeight;

  const vis = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return (
      cs.display !== "none" &&
      cs.visibility !== "hidden" &&
      Number(cs.opacity) !== 0 &&
      r.width > 0 &&
      r.height > 0
    );
  };

  // B — every persistent (fixed/sticky) element that actually sits over the bottom of the
  // viewport in this state. Not assumed to be zero; measured.
  const bottomObstructions = [];
  const topObstructions = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.position !== "fixed" && cs.position !== "sticky") continue;
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.height <= 0) continue;
    const rec = {
      selector: el.tagName.toLowerCase() + (el.className && typeof el.className === "string"
        ? "." + el.className.trim().split(/\s+/).join(".")
        : ""),
      position: cs.position,
      top: round(r.top),
      bottom: round(r.bottom),
      height: round(r.height),
      zIndex: cs.zIndex
    };
    // Covers the bottom edge of the viewport.
    if (r.bottom >= V - 1 && r.top < V) bottomObstructions.push(rec);
    // Covers the top edge.
    else if (r.top <= 1 && r.bottom > 0) topObstructions.push(rec);
  }
  const dedupe = (list) => {
    const seen = new Set();
    return list.filter((o) => {
      const k = o.selector + o.height;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
  const bottoms = dedupe(bottomObstructions);
  const tops = dedupe(topObstructions);
  const B = bottoms.reduce((m, o) => Math.max(m, V - o.top), 0);

  const pick = (sel) => (sel ? document.querySelector(sel) : null);
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top: round(r.top),
      bottom: round(r.bottom),
      left: round(r.left),
      right: round(r.right),
      width: round(r.width),
      height: round(r.height)
    };
  };

  const hero = pick(selectors.hero);
  const header = pick(selectors.header);
  const utility = pick(selectors.utility);
  const h1 = pick(selectors.h1);
  const call = pick(selectors.primaryCall);
  const heroForm = pick(selectors.heroForm);
  const formEl = hero ? hero.querySelector("form") : null;

  // Header stack = every real header/utility/breadcrumb box above the hero, measured.
  const headerBox = box(header);
  const utilityBox = box(utility);
  const headerStack = (headerBox ? headerBox.height : 0) + (utilityBox ? utilityBox.height : 0);

  const heroBox = box(hero);
  const T = heroBox ? heroBox.top : null;

  // Inner-scroll / clipping detection — §7 forbids proving fit with an internally scrolling
  // form or a clipped hero.
  const innerScroll = [];
  const scanScroll = (root, name) => {
    if (!root) return;
    const nodes = [root, ...root.querySelectorAll("*")];
    for (const el of nodes) {
      const cs = getComputedStyle(el);
      const oy = cs.overflowY;
      const ox = cs.overflowX;
      const scrolls =
        (/(auto|scroll)/.test(oy) && el.scrollHeight - el.clientHeight > 1) ||
        (/(auto|scroll)/.test(ox) && el.scrollWidth - el.clientWidth > 1);
      const clips =
        /(hidden|clip)/.test(oy) && el.scrollHeight - el.clientHeight > 1;
      if (scrolls || clips) {
        innerScroll.push({
          within: name,
          tag: el.tagName.toLowerCase(),
          cls: typeof el.className === "string" ? el.className : "",
          overflowX: ox,
          overflowY: oy,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          kind: scrolls ? "scrollable" : "clipped"
        });
      }
    }
  };
  scanScroll(hero, "hero");

  const heroCs = hero ? getComputedStyle(hero) : null;

  const clearance = heroBox ? round(V - B - heroBox.bottom) : null;
  const budget = round(V - (T ?? 0) - B - 16);
  const overflow = heroBox ? round(Math.max(0, heroBox.bottom - (V - B - 16))) : null;

  return {
    viewport: { V, width: window.innerWidth, dpr: window.devicePixelRatio },
    scrollY: window.scrollY,
    fonts: document.fonts ? document.fonts.status : "unavailable",
    documentHeight: document.documentElement.scrollHeight,
    headerStack: round(headerStack),
    headerBox,
    utilityBox,
    topObstructions: tops,
    bottomObstructions: bottoms,
    B: round(B),
    T: T === null ? null : round(T),
    hero: heroBox,
    heroPosition: heroCs ? heroCs.position : null,
    heroMinHeight: heroCs ? heroCs.minHeight : null,
    heroMaxHeight: heroCs ? heroCs.maxHeight : null,
    heroOverflowY: heroCs ? heroCs.overflowY : null,
    h1: box(h1),
    h1Text: h1 ? h1.textContent.trim() : null,
    h1FontSize: h1 ? getComputedStyle(h1).fontSize : null,
    primaryCall: box(call),
    primaryCallHref: call ? call.getAttribute("href") : null,
    heroFormColumn: box(heroForm),
    formElement: box(formEl),
    submit: box(hero ? hero.querySelector('button[type="submit"], .hero-form__submit') : null),
    consent: box(hero ? hero.querySelector(".hero-form__consent") : null),
    honeypot: box(hero ? hero.querySelector(".hero-form__honeypot") : null),
    turnstile: box(hero ? hero.querySelector(".hero-form__turnstile") : null),
    credit: box(hero ? hero.querySelector(".acx-hero__credit, .acx-phero__caption") : null),
    availableHeroBudget: budget,
    clearanceBelowHero: clearance,
    overflowPx: overflow,
    innerScrollFindings: innerScroll,
    horizontalOverflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  };
};

async function settle(page) {
  await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
  // Only above-the-fold images matter for a scroll-zero measurement, but waiting for all
  // eager images avoids a reflow mid-measure.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const imgs = [...document.images].filter((i) => i.loading !== "lazy");
        let left = imgs.filter((i) => !i.complete).length;
        if (!left) return resolve();
        const done = () => (--left <= 0 ? resolve() : null);
        imgs.filter((i) => !i.complete).forEach((i) => {
          i.addEventListener("load", done, { once: true });
          i.addEventListener("error", done, { once: true });
        });
        setTimeout(resolve, 5000);
      })
  );
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);
}

const auditExpr = await readFile(new URL("./audit-css-profile.js", import.meta.url), "utf8");

const server = await serve("dist");
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chromePath });

await mkdir(join(outDir, "shots"), { recursive: true });

const results = [];

// Profile §7 "Banners, states and evidence": the genuine first-load state and the ordinary
// consent-handled state are captured SEPARATELY. The site ships a real Termly consent banner
// (role=alertdialog, bottom, non-modal) that occupies ~349px at 390px wide. It is a genuine
// persistent obstruction on first load and must be counted in B there — but it is not the
// ordinary browsing state, and it is never disabled or hidden to obtain a measurement.
const CONSENT_BANNER = ".t-consentPrompt";
const CONSENT_ACCEPT = ".t-acceptAllButton";

async function waitForConsent(page) {
  try {
    await page.waitForSelector(CONSENT_BANNER, { timeout: 9000, state: "visible" });
    return true;
  } catch {
    return false;
  }
}

for (const [route, slug, heroKind] of PHOTO_HERO_PAGES) {
  for (const vp of [...DESKTOP, MOBILE]) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "load" });
    await settle(page);

    // ---- State A: genuine first load, consent banner present if the provider shows one.
    const bannerShown = await waitForConsent(page);
    await settle(page);
    const firstLoad = await page.evaluate(MEASURE, AC_CSS_AUDIT_SELECTORS);
    await page.screenshot({
      path: join(outDir, "shots", `${LABEL}-${slug}-${vp.label}-firstload.png`),
      fullPage: false
    });

    // ---- State B: ordinary consent-handled state. The banner is DISMISSED by clicking its
    // real Accept control — not removed, not hidden, not blocked at the network layer.
    if (bannerShown) {
      try {
        await page.click(CONSENT_ACCEPT, { timeout: 4000 });
        await page.waitForSelector(CONSENT_BANNER, { state: "detached", timeout: 6000 });
      } catch {
        /* leave it; the state below will record the banner still present */
      }
      await settle(page);
    }

    const m = await page.evaluate(MEASURE, AC_CSS_AUDIT_SELECTORS);

    // Profile §8.4 — run the shipped read-only collector with the real selector map.
    const roles = await page.evaluate(
      ([expr, sel]) => {
        window.AC_CSS_AUDIT_SELECTORS = sel;
        // eslint-disable-next-line no-eval
        return eval(expr);
      },
      [auditExpr, AC_CSS_AUDIT_SELECTORS]
    );

    const isDesktop = vp.label !== MOBILE.label;
    let verdict;
    let reason;

    if (!m.hero) {
      verdict = "UNVERIFIED";
      reason = "Hero selector unmapped or absent";
    } else if (isDesktop) {
      const problems = [];
      if (m.overflowPx > 0) problems.push(`hero bottom exceeds V-B-16 by ${m.overflowPx}px`);
      if (m.innerScrollFindings.length)
        problems.push(`inner scroll/clip inside hero: ${m.innerScrollFindings.length}`);
      if (m.horizontalOverflow) problems.push("document scrolls horizontally");
      if (heroKind === "photo_form") {
        if (!m.formElement) problems.push("hero form missing");
        if (!m.submit) problems.push("submit control missing");
        if (!m.consent) problems.push("consent copy missing");
      }
      verdict = problems.length ? "FAIL" : "PASS";
      reason = problems.length ? problems.join("; ") : `clearance ${m.clearanceBelowHero}px >= 16px`;
    } else {
      // §7 mobile: full headline + primary call above the fold; the form may extend below.
      const problems = [];
      if (!m.h1 || m.h1.bottom > m.viewport.V) problems.push("H1 not fully above the fold");
      if (!m.primaryCall) problems.push("primary call missing");
      else if (m.primaryCall.bottom > m.viewport.V - m.B)
        problems.push(
          `primary call bottom ${m.primaryCall.bottom} below usable fold ${m.viewport.V - m.B}`
        );
      verdict = problems.length ? "FAIL" : "PASS";
      reason = problems.length ? problems.join("; ") : "headline and call above the fold";
    }

    const shot = join(outDir, "shots", `${LABEL}-${slug}-${vp.label}.png`);
    // Uncropped initial viewport, scroll zero. Never fullPage — a stitched capture cannot
    // prove above-the-fold fit (profile §7 "Banners, states and evidence").
    await page.screenshot({ path: shot, fullPage: false });

    // The first-load state is reported separately and never counted as the gate result.
    // A banner that covers hero content is labelled banner-obstructed, not a visual pass.
    const flHeroBottom = firstLoad.hero ? firstLoad.hero.bottom : null;
    const firstLoadState = {
      consentBannerPresent: bannerShown,
      B: firstLoad.B,
      bottomObstructions: firstLoad.bottomObstructions,
      heroBottom: flHeroBottom,
      clearanceBelowHero: firstLoad.clearanceBelowHero,
      overflowPx: firstLoad.overflowPx,
      obstructsHeroCall:
        bannerShown &&
        firstLoad.primaryCall !== null &&
        firstLoad.primaryCall.bottom > firstLoad.viewport.V - firstLoad.B,
      status: bannerShown ? "BANNER-OBSTRUCTED (recorded separately, not a pass)" : "no banner observed"
    };

    results.push({
      label: LABEL,
      route,
      slug,
      heroKind,
      viewport: vp.label,
      state: "consent-handled (ordinary browsing state)",
      verdict,
      reason,
      firstLoadState,
      measured: m,
      unmappedRoles: Object.entries(roles.roles)
        .filter(([, v]) => v.status === "UNVERIFIED")
        .map(([k, v]) => ({ role: k, reason: v.reason })),
      screenshot: shot
    });

    process.stdout.write(
      `${verdict.padEnd(10)} ${slug.padEnd(16)} ${vp.label.padEnd(9)} ` +
        `V=${m.viewport.V} T=${m.T} B=${m.B} heroBottom=${m.hero ? m.hero.bottom : "n/a"} ` +
        `clear=${m.clearanceBelowHero} overflow=${m.overflowPx} — ${reason}\n`
    );

    await context.close();
  }
}

await browser.close();
server.close();

await writeFile(join(outDir, `fold-audit-${LABEL}.json`), JSON.stringify(results, null, 2));

const desktopFails = results.filter((r) => r.viewport !== MOBILE.label && r.verdict === "FAIL");
const mobileFails = results.filter((r) => r.viewport === MOBILE.label && r.verdict === "FAIL");
console.log(
  `\n${LABEL}: desktop ${results.filter((r) => r.viewport !== MOBILE.label).length - desktopFails.length}/` +
    `${results.filter((r) => r.viewport !== MOBILE.label).length} PASS, ` +
    `mobile ${results.filter((r) => r.viewport === MOBILE.label).length - mobileFails.length}/` +
    `${results.filter((r) => r.viewport === MOBILE.label).length} PASS`
);
console.log(`JSON: ${join(outDir, `fold-audit-${LABEL}.json`)}`);
