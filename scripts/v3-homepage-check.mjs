// V3 lean-Sevenson homepage verification.
// Measures the rebuilt `/` against the 2026-08-25 audit baseline, checks the responsive and
// accessibility gates in docs/ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md §28, and
// writes screenshots to artifacts/v3-homepage/.
//
// Run against a real production build served by `astro preview` — not the dev server.
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:4321";
const OUT = "artifacts/v3-homepage";

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const FULLPAGE = [390, 768, 1024, 1440];
const SECTION_SHOTS = [
  ["fold", null],
  ["handle", "#service-cards"],
  ["differentiation", "section[aria-labelledby='condition-work-title']"],
  ["evidence", "#record"],
  ["close", "section[aria-labelledby='final-cta-title']"]
];

const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const measure = () => {
  const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]) || 0;
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
  };
  const lineCount = (el) => {
    const lh = px(el, "lineHeight") || px(el, "fontSize") * 1.2;
    return lh ? Math.round(el.getBoundingClientRect().height / lh) : 0;
  };

  const main = document.querySelector("main");
  const body = document.body;

  const h1 = document.querySelector("h1");
  const hero = document.querySelector(".home-hero");
  const overlayEl = document.querySelector(".home-hero__overlay");
  const heroImg = document.querySelector(".home-hero__media img");
  const heroCta = document.querySelector(".home-hero__primary");

  // Visible words in <main>: strip script/style, collapse whitespace.
  const clone = main.cloneNode(true);
  clone.querySelectorAll("script,style").forEach((n) => n.remove());
  const words = (clone.textContent || "").trim().split(/\s+/).filter(Boolean).length;

  const headings = [...main.querySelectorAll("h1,h2,h3")].filter(vis).map((h) => ({
    tag: h.tagName.toLowerCase(),
    size: Math.round(px(h, "fontSize") * 100) / 100,
    weight: getComputedStyle(h).fontWeight,
    lines: lineCount(h),
    text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80)
  }));

  const sections = [...main.children].map((s) => {
    const r = s.getBoundingClientRect();
    return {
      name: s.className.toString().split(" ")[0] || s.id || s.tagName.toLowerCase(),
      h: Math.round(r.height),
      bg: getComputedStyle(s).backgroundColor
    };
  });

  // Every image inside <main> that is at least a third of the viewport wide — the "large
  // photographic moment" count the audit compares against.
  const photos = [...main.querySelectorAll("img")].filter(vis).map((img) => {
    const r = img.getBoundingClientRect();
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      area: Math.round(r.width * r.height),
      big: r.width >= window.innerWidth / 3 && r.height >= 200,
      alt: img.getAttribute("alt") || "",
      loading: img.getAttribute("loading")
    };
  });

  const ctas = [...document.querySelectorAll("a[href='/request-assessment/'],a[href^='tel:'],a[href^='sms:']")]
    .filter(vis)
    .map((a) => {
      const r = a.getBoundingClientRect();
      const cs = getComputedStyle(a);
      let where = "?";
      for (const p of ["home-hero", "close", "foot", "mbar", "site-nav", "utility-bar", "evidence"]) {
        if (a.closest(`.${p}`)) { where = p; break; }
      }
      return {
        text: (a.textContent || "").trim().replace(/\s+/g, " "),
        href: a.getAttribute("href"),
        where,
        w: Math.round(r.width),
        h: Math.round(r.height),
        bg: cs.backgroundColor,
        filled: cs.backgroundColor !== "rgba(0, 0, 0, 0)"
      };
    });

  // Horizontal overflow: any element wider than the documentElement.
  const docW = document.documentElement.clientWidth;
  const overflow = [...document.querySelectorAll("body *")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.right > docW + 1 || r.left < -1;
    })
    .slice(0, 8)
    .map((el) => ({
      sel: el.tagName.toLowerCase() + "." + el.className.toString().split(" ")[0],
      right: Math.round(el.getBoundingClientRect().right),
      left: Math.round(el.getBoundingClientRect().left)
    }));

  const navDesktop = document.querySelector(".site-nav__desktop");
  const navActions = document.querySelector(".site-nav__actions");
  const mobileNav = document.querySelector(".mobile-nav");
  const utility = document.querySelector(".utility-bar");
  const siteNav = document.querySelector(".site-nav");
  const mbar = document.querySelector(".mbar");

  const phoneLinks = [...document.querySelectorAll("a[href^='tel:']")].filter(vis);
  const headerPhones = phoneLinks.filter((a) => a.closest(".utility-bar,.site-nav,.mobile-nav")).length;

  return {
    docHeight: Math.round(body.scrollHeight),
    mainWords: words,
    h2Count: headings.filter((h) => h.tag === "h2").length,
    h1Count: document.querySelectorAll("h1").length,
    bodyFontSize: px(body, "fontSize"),
    h1: h1 ? {
      size: Math.round(px(h1, "fontSize") * 100) / 100,
      weight: getComputedStyle(h1).fontWeight,
      lines: lineCount(h1),
      maxWidth: Math.round(h1.getBoundingClientRect().width),
      ratio: Math.round((px(h1, "fontSize") / px(body, "fontSize")) * 100) / 100
    } : null,
    hero: hero ? {
      h: Math.round(hero.getBoundingClientRect().height),
      top: Math.round(hero.getBoundingClientRect().top + window.scrollY),
      overlay: overlayEl ? getComputedStyle(overlayEl).backgroundColor : null,
      objectPosition: heroImg ? getComputedStyle(heroImg).objectPosition : null,
      ledeMaxWidth: (() => {
        const l = document.querySelector(".home-hero__lede");
        return l ? Math.round(l.getBoundingClientRect().width) : null;
      })(),
      cta: heroCta ? {
        w: Math.round(heroCta.getBoundingClientRect().width),
        h: Math.round(heroCta.getBoundingClientRect().height),
        padX: getComputedStyle(heroCta).paddingLeft,
        radius: getComputedStyle(heroCta).borderRadius
      } : null
    } : null,
    header: {
      utilityH: utility ? Math.round(utility.getBoundingClientRect().height) : 0,
      navH: siteNav ? Math.round(siteNav.getBoundingClientRect().height) : 0,
      desktopNavVisible: navDesktop ? vis(navDesktop) : false,
      ctaVisible: navActions ? vis(navActions) : false,
      hamburgerVisible: mobileNav ? getComputedStyle(mobileNav).display !== "none" : false,
      phoneLinksInHeader: headerPhones
    },
    mbar: mbar && getComputedStyle(mbar).display !== "none"
      ? [...mbar.querySelectorAll("a")].map((a) => ({
          text: (a.textContent || "").trim(),
          w: Math.round(a.getBoundingClientRect().width),
          bg: getComputedStyle(a).backgroundColor
        }))
      : null,
    sections,
    headings,
    photos: photos.filter((p) => p.big),
    photoCount: photos.length,
    bigPhotoCount: photos.filter((p) => p.big).length,
    ctas,
    overflow,
    missingAlt: [...document.querySelectorAll("main img")].filter(
      (i) => i.getAttribute("alt") === null
    ).length
  };
};

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: chromePath });
  const report = { base: BASE, generated: new Date().toISOString(), widths: {} };
  const consoleErrors = [];

  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1
    });
    const page = await ctx.newPage();
    // The Termly consent banner is a fixed third-party overlay. It is real and it ships, but it
    // covers whatever section happens to be under it at capture time, so it is blocked for
    // measurement and screenshots. Console errors from it are counted separately below.
    await page.route("**://app.termly.io/**", (route) => route.abort());
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`${width}px :: ${m.text()}`);
    });
    page.on("pageerror", (e) => consoleErrors.push(`${width}px :: pageerror :: ${e.message}`));

    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // Every below-fold photograph is loading="lazy". A fullPage screenshot does NOT trigger
    // them, so capturing here without this walk produces empty boxes that look like broken
    // images and are not. Scroll the whole page, wait for every <img> to report complete, then
    // return to the top before measuring or capturing.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 150));
    });
    // Scoped to <main>. `document.images` also contains the logo inside the closed <details>
    // mobile drawer, which is lazy and content-visibility:hidden and therefore never loads —
    // waiting on it times out at every width and proves nothing about the page.
    await page
      .waitForFunction(
        () => [...document.querySelectorAll("main img")].every((i) => i.complete && i.naturalWidth > 0),
        undefined,
        { timeout: 20000 }
      )
      .catch(() => console.warn(`  (${width}px) not all <main> images completed before timeout`));

    report.widths[width] = await page.evaluate(measure);

    // Fold + full-page screenshots at the requested widths.
    if (FULLPAGE.includes(width)) {
      await page.screenshot({ path: path.join(OUT, `home-${width}-full.png`), fullPage: true });
    }
    await page.screenshot({ path: path.join(OUT, `home-${width}-fold.png`) });

    // Section shots at 1440 only.
    if (width === 1440) {
      for (const [name, sel] of SECTION_SHOTS) {
        if (!sel) continue;
        const el = await page.$(sel);
        if (el) await el.screenshot({ path: path.join(OUT, `s-${name}-1440.png`) });
      }
    }

    // Axe on the two widths that matter most.
    if (width === 390 || width === 1440) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      report.widths[width].axe = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        help: v.help,
        targets: v.nodes.slice(0, 3).map((n) => n.target.join(" "))
      }));
    }

    await ctx.close();
  }

  // 200% zoom: emulate by halving the viewport at a 2x scale factor.
  {
    const ctx = await browser.newContext({
      viewport: { width: 720, height: 450 },
      deviceScaleFactor: 2
    });
    const page = await ctx.newPage();
    await page.route("**://app.termly.io/**", (route) => route.abort());
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    report.zoom200 = await page.evaluate(measure);
    await page.screenshot({ path: path.join(OUT, "home-zoom200.png") });
    await ctx.close();
  }

  // Reduced motion.
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce"
    });
    const page = await ctx.newPage();
    await page.route("**://app.termly.io/**", (route) => route.abort());
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    report.reducedMotion = await page.evaluate(() => {
      const img = document.querySelector(".route__media img");
      const cta = document.querySelector(".home-hero__primary");
      return {
        routeImgTransition: img ? getComputedStyle(img).transitionDuration : null,
        heroCtaTransition: cta ? getComputedStyle(cta).transitionDuration : null
      };
    });
    await ctx.close();
  }

  // Keyboard walk: tab through and record the focus order and whether an outline is drawn.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.route("**://app.termly.io/**", (route) => route.abort());
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const order = [];
    for (let i = 0; i < 26; i += 1) {
      await page.keyboard.press("Tab");
      order.push(
        await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 42),
            href: el.getAttribute?.("href") || null,
            outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
            visible: r.width > 0 && r.height > 0
          };
        })
      );
    }
    report.keyboard = order.filter(Boolean);
    await ctx.close();
  }

  // Internal link check on `/`.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.route("**://app.termly.io/**", (route) => route.abort());
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const hrefs = await page.evaluate(() =>
      [...new Set([...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")))]
    );
    const broken = [];
    for (const href of hrefs) {
      const res = await page.request.get(BASE + href);
      if (!res.ok()) broken.push({ href, status: res.status() });
    }
    report.links = { checked: hrefs.length, broken, hrefs };
    await ctx.close();
  }

  report.consoleErrors = consoleErrors;
  await browser.close();
  await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

  // Console summary.
  const b = { 1440: 11704, 1024: 11813, 768: 14219, 390: 17170 };
  console.log("\n=== V3 HOMEPAGE — OLD vs NEW ===");
  for (const w of [390, 768, 1024, 1440]) {
    const n = report.widths[w];
    const o = b[w];
    console.log(
      `${String(w).padStart(4)}px  height ${String(o).padStart(6)} -> ${String(n.docHeight).padStart(6)}` +
      `  (${Math.round(((n.docHeight - o) / o) * 100)}%)   words ${n.mainWords}   H2 ${n.h2Count}` +
      `   bigPhotos ${n.bigPhotoCount}   H1 ${n.h1.size}px/${n.h1.lines}ln  ratio ${n.h1.ratio}`
    );
  }
  console.log("\n=== HERO / HEADER ===");
  for (const w of WIDTHS) {
    const n = report.widths[w];
    console.log(
      `${String(w).padStart(4)}px hero ${n.hero.h}px  H1 ${n.h1.size}px ${n.h1.lines}ln  ` +
      `obj ${n.hero.objectPosition}  nav ${n.header.desktopNavVisible ? "full" : "drawer"}` +
      ` cta ${n.header.ctaVisible ? "yes" : "no"}  hdrPhones ${n.header.phoneLinksInHeader}` +
      `  overflow ${n.overflow.length}`
    );
  }
  const axe1440 = report.widths[1440].axe || [];
  const axe390 = report.widths[390].axe || [];
  console.log(`\nAxe 1440: ${axe1440.length} violations   Axe 390: ${axe390.length} violations`);
  [...axe1440, ...axe390].forEach((v) => console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes})`, v.targets));
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.forEach((e) => console.log("  " + e));
  console.log(`Broken internal links: ${report.links.broken.length}`, report.links.broken);
  console.log(`Missing alt in main: ${report.widths[1440].missingAlt}`);
  console.log(`\nWrote ${OUT}/report.json`);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
