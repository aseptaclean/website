// AC-PPC-HOARDING-1.0 above-the-fold gate for /hoarding-cleanup-san-jose/assessment/.
//
// Same measurement contract as scripts/ac-fold-audit.mjs (profile AC-CP70-91130-1.1 §7), scoped
// to the campaign route and extended with the two tablet viewports the PPC brief adds:
//
//   V = window.innerHeight
//   T = measured hero top at scroll zero, including all real header space above it
//   B = height of any persistent bottom obstruction in the tested state (0 only when none)
//   S = 16px minimum clearance
//   PASS requires heroBottom <= V - B - 16, with no clipping, no inner scroll, no occlusion.
//
// Nothing here infers a result from a CSS declaration, a token name or a successful build. Every
// number is read from getBoundingClientRect()/getComputedStyle() at scrollY = 0, 100% zoom,
// device pixel ratio 1, after fonts and eager images settle.
//
// First-load (consent banner present) and consent-handled states are captured SEPARATELY. The
// banner is dismissed by clicking its real Accept control — never removed, hidden or blocked.
//
// Usage: node scripts/ppc-fold-audit.mjs <outDir>
import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const outDir = process.argv[2] || "./artifacts/ppc-hoarding";
const ROUTE = "/hoarding-cleanup-san-jose/assessment/";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Profile §7 desktop matrix, plus the brief's two tablet sizes. CSS viewport pixels, 100% zoom.
const VIEWPORTS = [
  { label: "1440x900", width: 1440, height: 900, kind: "desktop" },
  { label: "1536x864", width: 1536, height: 864, kind: "desktop" },
  { label: "1366x768", width: 1366, height: 768, kind: "desktop" },
  { label: "1280x800", width: 1280, height: 800, kind: "desktop" },
  { label: "1024x768", width: 1024, height: 768, kind: "stacked" },
  { label: "768x1024", width: 768, height: 1024, kind: "stacked" },
  { label: "390x844", width: 390, height: 844, kind: "stacked" }
];

// The ACTUAL classes this build emits, read out of dist/. A role with an empty selector stays
// UNVERIFIED — it is never silently treated as a pass.
const SELECTORS = {
  header: ".ppc-header",
  utility: "", // No utility/announcement row exists on this route. UNVERIFIED by design.
  hero: ".ppc-hero",
  heroGrid: ".ppc-hero__grid",
  heroCopy: ".ppc-hero__content",
  heroForm: ".ppc-form-shell",
  form: "form.ppc-form",
  h1: "h1",
  primaryCall: ".ppc-hero .acx-actions__primary",
  secondary: ".ppc-hero .acx-actions__secondary",
  submit: ".ppc-form__submit",
  consent: ".ppc-form__consent",
  turnstile: ".ppc-form__turnstile",
  upload: '.ppc-form input[type="file"]',
  stickyBar: ".ppc-bar",
  footer: ".ppc-foot"
};

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

  // B — every persistent (fixed/sticky) element actually covering the bottom of the viewport in
  // this state. Measured, never assumed to be zero.
  const bottoms = [];
  const tops = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.position !== "fixed" && cs.position !== "sticky") continue;
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.height <= 0) continue;
    const rec = {
      selector:
        el.tagName.toLowerCase() +
        (el.className && typeof el.className === "string"
          ? "." + el.className.trim().split(/\s+/).join(".")
          : ""),
      position: cs.position,
      top: round(r.top),
      bottom: round(r.bottom),
      height: round(r.height),
      zIndex: cs.zIndex
    };
    if (r.bottom >= V - 1 && r.top < V) bottoms.push(rec);
    else if (r.top <= 1 && r.bottom > 0) tops.push(rec);
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
  const bottomObstructions = dedupe(bottoms);
  const topObstructions = dedupe(tops);
  const B = bottomObstructions.reduce((m, o) => Math.max(m, V - o.top), 0);

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
  const grid = pick(selectors.heroGrid);
  const copyCol = pick(selectors.heroCopy);
  const formCol = pick(selectors.heroForm);
  const formEl = pick(selectors.form);
  const h1 = pick(selectors.h1);
  const call = pick(selectors.primaryCall);
  const secondary = pick(selectors.secondary);
  const submit = pick(selectors.submit);
  const consent = pick(selectors.consent);
  const turnstile = pick(selectors.turnstile);
  const upload = pick(selectors.upload);
  const bar = pick(selectors.stickyBar);

  const headerBox = box(header);
  const utilityBox = box(utility);
  const headerStack = (headerBox ? headerBox.height : 0) + (utilityBox ? utilityBox.height : 0);
  const heroBox = box(hero);
  const T = heroBox ? heroBox.top : null;

  // Inner scroll / clipping — §7 forbids proving fit with an internally scrolling form or a
  // clipped hero. A <textarea>'s own overflow is normal control behaviour, not a hero defect,
  // so it is recorded separately rather than counted as a failure.
  const innerScroll = [];
  if (hero) {
    for (const el of [hero, ...hero.querySelectorAll("*")]) {
      const cs = getComputedStyle(el);
      const oy = cs.overflowY;
      const ox = cs.overflowX;
      const scrolls =
        (/(auto|scroll)/.test(oy) && el.scrollHeight - el.clientHeight > 1) ||
        (/(auto|scroll)/.test(ox) && el.scrollWidth - el.clientWidth > 1);
      const clips = /(hidden|clip)/.test(oy) && el.scrollHeight - el.clientHeight > 1;
      if (!scrolls && !clips) continue;
      // `.visually-hidden` is the site's 1px clip technique for screen-reader-only live
      // regions. It reports as "clipped" by construction and is not a hero fit defect.
      if (typeof el.className === "string" && el.className.includes("visually-hidden")) continue;
      innerScroll.push({
        tag: el.tagName.toLowerCase(),
        cls: typeof el.className === "string" ? el.className : "",
        overflowX: ox,
        overflowY: oy,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        kind: scrolls ? "scrollable" : "clipped",
        isFormControl: ["textarea", "select", "input"].includes(el.tagName.toLowerCase())
      });
    }
  }

  const heroCs = hero ? getComputedStyle(hero) : null;
  const gridCs = grid ? getComputedStyle(grid) : null;
  const h1Cs = h1 ? getComputedStyle(h1) : null;
  const bodyCs = getComputedStyle(document.body);

  // Readable-floor probe: the profile forbids buying fit by shrinking any of these. Its own
  // exclusions are applied literally — "excluding checkbox/radio/hidden" — and the anti-spam
  // honeypot is excluded with them: it is a deliberately off-screen decoy, not a control a
  // visitor reads or taps, and measuring it would report a floor breach that does not exist.
  const controls = formEl
    ? [
        ...formEl.querySelectorAll(
          'input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([tabindex="-1"]), textarea'
        )
      ].map((el) => ({
        name: el.getAttribute("name"),
        type: el.getAttribute("type") || el.tagName.toLowerCase(),
        fontSize: parseFloat(getComputedStyle(el).fontSize),
        height: round(el.getBoundingClientRect().height)
      }))
    : [];

  return {
    viewport: { V, width: window.innerWidth, dpr: window.devicePixelRatio },
    scrollY: window.scrollY,
    fonts: document.fonts ? document.fonts.status : "unavailable",
    documentHeight: document.documentElement.scrollHeight,
    headerStack: round(headerStack),
    headerBox,
    utilityBox,
    topObstructions,
    bottomObstructions,
    B: round(B),
    T: T === null ? null : round(T),
    hero: heroBox,
    heroPosition: heroCs ? heroCs.position : null,
    heroMinHeight: heroCs ? heroCs.minHeight : null,
    heroMaxHeight: heroCs ? heroCs.maxHeight : null,
    heroOverflowY: heroCs ? heroCs.overflowY : null,
    heroGridTemplate: gridCs ? gridCs.gridTemplateColumns : null,
    heroGridGap: gridCs ? gridCs.columnGap : null,
    copyColumn: box(copyCol),
    formColumn: box(formCol),
    formElement: box(formEl),
    h1: box(h1),
    h1Text: h1 ? h1.textContent.trim() : null,
    h1FontSize: h1Cs ? parseFloat(h1Cs.fontSize) : null,
    bodyFontSize: parseFloat(bodyCs.fontSize),
    h1BodyRatio: h1Cs
      ? Math.round((parseFloat(h1Cs.fontSize) / parseFloat(bodyCs.fontSize)) * 1000) / 1000
      : null,
    primaryCall: box(call),
    primaryCallHref: call ? call.getAttribute("href") : null,
    secondaryAction: box(secondary),
    secondaryHref: secondary ? secondary.getAttribute("href") : null,
    submit: box(submit),
    submitLabel: submit ? submit.textContent.trim() : null,
    consent: box(consent),
    consentFontSize: consent ? parseFloat(getComputedStyle(consent).fontSize) : null,
    turnstile: box(turnstile),
    upload: box(upload),
    controlFloors: controls,
    stickyBarVisible: bar ? !bar.hidden && vis(bar) : false,
    stickyBar: bar && !bar.hidden ? box(bar) : null,
    bodyPaddingBottom: bodyCs.paddingBottom,
    innerScrollFindings: innerScroll,
    availableHeroBudget: round(V - (T ?? 0) - B - 16),
    clearanceBelowHero: heroBox ? round(V - B - heroBox.bottom) : null,
    overflowPx: heroBox ? round(Math.max(0, heroBox.bottom - (V - B - 16))) : null,
    horizontalOverflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  };
};

async function settle(page) {
  await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const imgs = [...document.images].filter((i) => i.loading !== "lazy");
        let left = imgs.filter((i) => !i.complete).length;
        if (!left) return resolve();
        const done = () => (--left <= 0 ? resolve() : null);
        imgs
          .filter((i) => !i.complete)
          .forEach((i) => {
            i.addEventListener("load", done, { once: true });
            i.addEventListener("error", done, { once: true });
          });
        setTimeout(resolve, 5000);
      })
  );
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(120);
}

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

const server = await serve("dist");
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: chromePath });

await mkdir(join(outDir, "shots"), { recursive: true });

const results = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(base + ROUTE, { waitUntil: "load" });
  await settle(page);

  // ---- State A: genuine first load, provider consent banner present if it shows one.
  const bannerShown = await waitForConsent(page);
  await settle(page);
  const firstLoad = await page.evaluate(MEASURE, SELECTORS);
  await page.screenshot({
    path: join(outDir, "shots", `ppc-${vp.label}-firstload.png`),
    fullPage: false
  });

  // ---- State B: ordinary consent-handled state, reached by clicking the REAL Accept control.
  if (bannerShown) {
    try {
      await page.click(CONSENT_ACCEPT, { timeout: 4000 });
      await page.waitForSelector(CONSENT_BANNER, { state: "detached", timeout: 6000 });
    } catch {
      /* leave it; the measurement below records the banner still present */
    }
    await settle(page);
  }

  const m = await page.evaluate(MEASURE, SELECTORS);

  // Uncropped initial viewport at scroll zero. Never fullPage — a stitched capture cannot prove
  // above-the-fold fit (profile §7).
  await page.screenshot({
    path: join(outDir, "shots", `ppc-${vp.label}.png`),
    fullPage: false
  });

  const problems = [];
  const notes = [];

  if (!m.hero) {
    problems.push("hero selector unmapped or absent");
  } else if (vp.kind === "desktop") {
    if (m.overflowPx > 0) problems.push(`hero bottom exceeds V-B-16 by ${m.overflowPx}px`);
    if (!m.formElement) problems.push("hero form missing");
    if (!m.submit) problems.push("submit control missing");
    if (!m.consent) problems.push("consent copy missing");
    if (!m.upload) problems.push("upload control missing");
  } else {
    // Profile §7 stacked rule: full headline + primary call above the fold; the form follows the
    // copy immediately and may extend below.
    if (!m.h1 || m.h1.bottom > m.viewport.V) problems.push("H1 not fully above the fold");
    if (!m.primaryCall) problems.push("primary call missing");
    else if (m.primaryCall.bottom > m.viewport.V - m.B) {
      problems.push(
        `primary call bottom ${m.primaryCall.bottom} below usable fold ${m.viewport.V - m.B}`
      );
    }
    if (m.formColumn && m.copyColumn && m.formColumn.top < m.copyColumn.bottom) {
      problems.push("form does not follow the hero copy in the stacked order");
    }
  }

  // Floors that must hold at every viewport, desktop or stacked.
  for (const control of m.controlFloors || []) {
    if (control.fontSize < 16) {
      problems.push(`${control.name} text ${control.fontSize}px is under the 16px floor`);
    }
    if (control.height < 44) {
      problems.push(`${control.name} control ${control.height}px is under the 44px floor`);
    }
  }
  if (m.submit && m.submit.height < 48) {
    problems.push(`submit ${m.submit.height}px is under the 48px floor`);
  }
  if (m.consentFontSize !== null && m.consentFontSize < 14) {
    problems.push(`consent ${m.consentFontSize}px is under the 14px readable floor`);
  }
  if (m.h1BodyRatio !== null && m.h1BodyRatio < 1.9) {
    problems.push(`H1:body ratio ${m.h1BodyRatio} is under the 1.9:1 floor`);
  }
  if (m.horizontalOverflow) problems.push("document scrolls horizontally");

  const structuralScroll = (m.innerScrollFindings || []).filter?.((f) => !f.isFormControl) ?? [];
  if (structuralScroll.length) {
    problems.push(`inner scroll/clip inside hero: ${structuralScroll.length}`);
  }
  if (m.heroMaxHeight && m.heroMaxHeight !== "none") {
    problems.push(`hero declares max-height ${m.heroMaxHeight}`);
  }
  if (m.heroMinHeight && !["0px", "auto", "none"].includes(m.heroMinHeight)) {
    notes.push(`hero min-height ${m.heroMinHeight}`);
  }

  const verdict = problems.length ? "FAIL" : "PASS";
  const reason = problems.length
    ? problems.join("; ")
    : vp.kind === "desktop"
      ? `complete hero fits: clearance ${m.clearanceBelowHero}px >= 16px`
      : "headline and call above the fold, form immediately after the copy";

  results.push({
    route: ROUTE,
    viewport: vp.label,
    kind: vp.kind,
    state: "consent-handled (ordinary browsing state)",
    verdict,
    reason,
    notes,
    firstLoadState: {
      consentBannerPresent: bannerShown,
      B: firstLoad.B,
      bottomObstructions: firstLoad.bottomObstructions,
      heroBottom: firstLoad.hero ? firstLoad.hero.bottom : null,
      clearanceBelowHero: firstLoad.clearanceBelowHero,
      overflowPx: firstLoad.overflowPx,
      obstructsHeroCall:
        bannerShown &&
        firstLoad.primaryCall !== null &&
        firstLoad.primaryCall.bottom > firstLoad.viewport.V - firstLoad.B,
      status: bannerShown
        ? "BANNER-OBSTRUCTED (recorded separately, never counted as a pass)"
        : "no banner observed"
    },
    measured: m,
    screenshots: {
      consentHandled: join(outDir, "shots", `ppc-${vp.label}.png`),
      firstLoad: join(outDir, "shots", `ppc-${vp.label}-firstload.png`)
    }
  });

  process.stdout.write(
    `${verdict.padEnd(5)} ${vp.label.padEnd(10)} V=${m.viewport.V} header=${m.headerStack} ` +
      `T=${m.T} B=${m.B} heroBottom=${m.hero ? m.hero.bottom : "n/a"} ` +
      `formBottom=${m.formElement ? m.formElement.bottom : "n/a"} ` +
      `clear=${m.clearanceBelowHero} overflow=${m.overflowPx} — ${reason}\n`
  );

  await context.close();
}

await browser.close();
server.close();

await writeFile(join(outDir, "ppc-fold-audit.json"), JSON.stringify(results, null, 2));

const desktop = results.filter((r) => r.kind === "desktop");
const stacked = results.filter((r) => r.kind !== "desktop");
console.log(
  `\ndesktop ${desktop.filter((r) => r.verdict === "PASS").length}/${desktop.length} PASS · ` +
    `stacked ${stacked.filter((r) => r.verdict === "PASS").length}/${stacked.length} PASS`
);
console.log(`JSON: ${join(outDir, "ppc-fold-audit.json")}`);
