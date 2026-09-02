// Measures REAL worst-case text contrast in the hoarding hero, rather than eyeballing a
// screenshot. Text over a photograph has no single background colour — it has a distribution —
// so this samples the actual composited pixels inside the copy column's bounding box and
// reports the worst case each text colour has to survive.
//
// Method: draw the hero <img> onto a canvas using the same object-fit/object-position geometry
// the browser resolved, composite the flat overlay over it in the same sRGB space the browser
// does, then walk every pixel under the copy box.
//
// Run against `astro preview`:  node scripts/hoarding-hero-contrast.mjs
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL || "http://localhost:4321";
const ROUTE = "/hoarding-cleanup-san-jose/";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const probe = () => {
  const rel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const lum = (r, g, b) => 0.2126 * rel(r) + 0.7152 * rel(g) + 0.0722 * rel(b);
  const ratio = (a, b) => {
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
  };
  const parseRgb = (value) => {
    const n = value.match(/[\d.]+/g).map(Number);
    return { r: n[0], g: n[1], b: n[2], a: n[3] === undefined ? 1 : n[3] };
  };

  const hero = document.querySelector(".hc-hero");
  const img = document.querySelector(".hc-hero__media img");
  const overlayEl = document.querySelector(".hc-hero__overlay");
  const content = document.querySelector(".hc-hero__content");

  const overlay = parseRgb(getComputedStyle(overlayEl).backgroundColor);
  const heroRect = hero.getBoundingClientRect();

  // Reproduce object-fit: cover + object-position for this box.
  const boxW = heroRect.width;
  const boxH = heroRect.height;
  const natW = img.naturalWidth;
  const natH = img.naturalHeight;
  const scale = Math.max(boxW / natW, boxH / natH);
  const drawW = natW * scale;
  const drawH = natH * scale;
  const [posX, posY] = getComputedStyle(img).objectPosition.split(" ").map(parseFloat);
  const offX = ((boxW - drawW) * posX) / 100;
  const offY = ((boxH - drawH) * posY) / 100;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(boxW);
  canvas.height = Math.round(boxH);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, offX, offY, drawW, drawH);

  const results = {};
  const targets = [
    [".hc-hero__eyebrow", "eyebrow"],
    [".hc-hero h1", "h1"],
    [".hc-hero__lede", "lede"],
    [".hc-hero__thesis", "thesis"],
    [".hc-hero__call", "call link"],
    [".hc-hero__reassurance", "reassurance"],
    [".hc-hero__development-note", "development note"]
  ];

  for (const [selector, name] of targets) {
    const el = document.querySelector(selector);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.round(r.left - heroRect.left));
    const y = Math.max(0, Math.round(r.top - heroRect.top));
    const w = Math.min(canvas.width - x, Math.round(r.width));
    const h = Math.min(canvas.height - y, Math.round(r.height));
    if (w <= 0 || h <= 0) continue;

    const data = ctx.getImageData(x, y, w, h).data;
    const fg = parseRgb(getComputedStyle(el).color);
    const size = parseFloat(getComputedStyle(el).fontSize);
    const weight = Number(getComputedStyle(el).fontWeight);
    // WCAG "large text": ≥24px, or ≥18.66px at 700+.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = large ? 3 : 4.5;

    let worst = Infinity;
    let brightest = null;
    for (let i = 0; i < data.length; i += 4) {
      // Composite the flat overlay over the photo pixel.
      const br = data[i] * (1 - overlay.a) + overlay.r * overlay.a;
      const bg = data[i + 1] * (1 - overlay.a) + overlay.g * overlay.a;
      const bb = data[i + 2] * (1 - overlay.a) + overlay.b * overlay.a;
      // Composite the (possibly translucent) text colour over that.
      const tr = fg.r * fg.a + br * (1 - fg.a);
      const tg = fg.g * fg.a + bg * (1 - fg.a);
      const tb = fg.b * fg.a + bb * (1 - fg.a);
      const c = ratio(lum(tr, tg, tb), lum(br, bg, bb));
      if (c < worst) {
        worst = c;
        brightest = [Math.round(br), Math.round(bg), Math.round(bb)];
      }
    }

    results[name] = {
      color: getComputedStyle(el).color,
      fontSize: size,
      weight,
      large,
      required,
      worstRatio: Math.round(worst * 100) / 100,
      worstBackdrop: `rgb(${brightest.join(" ")})`,
      pass: worst >= required
    };
  }

  return {
    overlay: getComputedStyle(overlayEl).backgroundColor,
    objectPosition: getComputedStyle(img).objectPosition,
    heroHeight: Math.round(heroRect.height),
    results
  };
};

const run = async () => {
  const browser = await chromium.launch({ executablePath: chromePath });
  for (const width of [1440, 1024, 768, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const out = await page.evaluate(probe);
    console.log(`\n=== ${width}px · overlay ${out.overlay} · object-position ${out.objectPosition} · hero ${out.heroHeight}px ===`);
    for (const [name, r] of Object.entries(out.results)) {
      console.log(
        `${r.pass ? "PASS" : "FAIL"}  ${name.padEnd(18)} ${String(r.worstRatio).padStart(5)}:1 ` +
          `(needs ${r.required}) ${String(r.fontSize).padStart(4)}px w${r.weight}  worst backdrop ${r.worstBackdrop}`
      );
    }
    await context.close();
  }
  await browser.close();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
