// Phase 2 QA — "What are you dealing with?" + "A clear scope before work begins."
// Captures screenshots and resolves computed geometry/typography from the built output.
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL("../artifacts/phase-2-recognition-scope/", import.meta.url);
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const report = [];
const failures = [];

// Freshness guard. A stale preview server left bound to the port from an earlier session will
// happily answer 200 with the previous build and every assertion below will pass against the
// wrong output. Refuse to run unless the served markup is the build we just produced.
{
  const probe = await browser.newPage();
  await probe.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const fresh = await probe.evaluate(() => ({
    note: !!document.querySelector(".condition-recognition__development-note"),
    imgs: [...document.querySelectorAll(".condition-route__media img")].length,
    stretched: !!document.querySelector(".condition-route__copy h3 a")
  }));
  await probe.close();
  if (!fresh.note || fresh.imgs !== 3 || !fresh.stretched) {
    await browser.close();
    throw new Error(
      `Stale or unexpected build at ${baseUrl} ` +
        `(note:${fresh.note} imgs:${fresh.imgs} stretched:${fresh.stretched}). ` +
        `Rebuild and make sure no other server holds the port.`
    );
  }
}

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    // The Termly consent banner is a fixed third-party overlay that covers the lower half of
    // the viewport on first visit. Block it so the screenshots show the composition being
    // reviewed rather than the banner. It is unrelated to these two sections.
    await page.route("**://app.termly.io/**", (r) => r.abort());
    // Cloudflare Turnstile (committed in AssessmentForm.astro, unrelated to these sections)
    // always 400s in a headless localhost preview because the origin is not a valid widget
    // context. Track it separately so it cannot mask a real first-party error.
    // Classify by request origin, not by console text: the console mirror of a failed request
    // ("Failed to load resource: ... 400") carries no URL, so text matching cannot tell a
    // third-party failure from a first-party one. Responses do carry the URL, so judge there.
    const origin = new URL(baseUrl).origin;
    const isThirdPartyText = (t) =>
      t.includes("challenges.cloudflare.com") ||
      t.includes("Cloudflare Turnstile") ||
      /Failed to load resource/i.test(t); // duplicate of a response event judged by URL below
    const consoleErrors = [];
    const thirdPartyErrors = [];
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      (isThirdPartyText(m.text()) ? thirdPartyErrors : consoleErrors).push(m.text());
    });
    page.on("pageerror", (e) => {
      const t = `pageerror: ${e.message}`;
      (isThirdPartyText(t) ? thirdPartyErrors : consoleErrors).push(t);
    });
    page.on("response", (r) => {
      if (r.status() < 400) return;
      const t = `${r.status()} ${r.url()}`;
      (r.url().startsWith(origin) ? consoleErrors : thirdPartyErrors).push(t);
    });

    await page.goto(baseUrl, { waitUntil: "load" });
    // Force lazy images in the two sections to load before measuring.
    await page.evaluate(async () => {
      document.querySelectorAll(".condition-route__media img").forEach((i) => {
        i.loading = "eager";
      });
      await Promise.all(
        [...document.querySelectorAll(".condition-route__media img")].map((i) =>
          i.complete ? null : new Promise((r) => i.addEventListener("load", r, { once: true }))
        )
      );
    });
    await page.waitForTimeout(250);

    const data = await page.evaluate(() => {
      const px = (v) => Math.round(parseFloat(v) * 100) / 100;
      const rec = document.querySelector(".condition-recognition");
      const scope = document.querySelector(".scope-explanation");
      const recCS = getComputedStyle(rec);
      const scopeCS = getComputedStyle(scope);
      const h1 = document.querySelector("h1");
      const bodyProbe = document.querySelector(".condition-route__copy p");

      const panels = [...document.querySelectorAll(".condition-route")].map((a) => {
        const media = a.querySelector(".condition-route__media");
        const img = a.querySelector("img");
        const r = media.getBoundingClientRect();
        return {
          cls: a.className.replace("condition-route condition-route--", ""),
          mediaW: px(r.width),
          mediaH: px(r.height),
          ratio: px(r.width / r.height),
          objectPosition: getComputedStyle(img).objectPosition,
          natural: `${img.naturalWidth}x${img.naturalHeight}`,
          rendered: img.currentSrc.split("/").pop()
        };
      });

      const h2rec = rec.querySelector("h2");
      const h2scope = scope.querySelector("h2");
      const scopeInner = scope.querySelector(".scope-explanation__inner");
      const scopeCols = getComputedStyle(scopeInner).gridTemplateColumns;

      // Links inside each recognition panel (accessibility: one per panel).
      const linkCounts = [...document.querySelectorAll(".condition-route")].map(
        (a) => a.querySelectorAll("a").length
      );

      return {
        docScrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        recPadTop: px(recCS.paddingTop),
        recPadBottom: px(recCS.paddingBottom),
        recBg: recCS.backgroundColor,
        scopePadTop: px(scopeCS.paddingTop),
        scopePadBottom: px(scopeCS.paddingBottom),
        scopeBg: scopeCS.backgroundColor,
        scopeCols,
        h1Size: px(getComputedStyle(h1).fontSize),
        bodySize: px(getComputedStyle(bodyProbe).fontSize),
        h2RecSize: px(getComputedStyle(h2rec).fontSize),
        h2ScopeSize: px(getComputedStyle(h2scope).fontSize),
        h3Size: px(getComputedStyle(document.querySelector(".ac-type-h3-home-route")).fontSize),
        h2RecLines: Math.round(
          h2rec.getBoundingClientRect().height / px(getComputedStyle(h2rec).lineHeight)
        ),
        panels,
        linkCounts,
        scopeRowCols: getComputedStyle(
          document.querySelector(".scope-explanation__rows > div")
        ).gridTemplateColumns
      };
    });

    // Let late-arriving console/network errors land before they are judged, otherwise the
    // assertion reads a still-empty array and reports a false pass.
    await page.waitForTimeout(1500);

    const overflow = data.docScrollW > data.clientW;
    if (overflow) {
      failures.push(`${width}px: horizontal overflow ${data.docScrollW} > ${data.clientW}`);
    }
    if (consoleErrors.length) {
      failures.push(`${width}px: console errors -> ${consoleErrors.join(" | ")}`);
    }
    const ratio = data.h1Size / data.bodySize;
    if (ratio < 1.9) {
      failures.push(`${width}px: H1:body ratio ${ratio.toFixed(2)} < 1.9`);
    }
    for (const c of data.linkCounts) {
      if (c !== 1) failures.push(`${width}px: recognition panel has ${c} links (expected 1)`);
    }

    report.push({
      width,
      overflow,
      consoleErrors: [...consoleErrors],
      thirdPartyErrors: [...thirdPartyErrors],
      h1BodyRatio: Number(ratio.toFixed(2)),
      ...data
    });

    if ([320, 390, 768, 1024, 1440].includes(width)) {
      await page
        .locator(".condition-recognition")
        .screenshot({ path: new URL(`recognition-${width}.png`, outputDirectory).pathname });
      await page
        .locator(".scope-explanation")
        .screenshot({ path: new URL(`scope-${width}.png`, outputDirectory).pathname });
      await page.screenshot({
        path: new URL(`page-${width}.png`, outputDirectory).pathname,
        fullPage: false
      });
    }

    await page.close();
  }
} finally {
  await browser.close();
}

await writeFile(
  new URL("report.json", outputDirectory),
  JSON.stringify({ failures, report }, null, 2)
);

for (const r of report) {
  console.log(
    `${String(r.width).padStart(5)}px  ovf:${r.overflow ? "YES" : "no "}  ` +
      `H1:${r.h1Size} body:${r.bodySize} ratio:${r.h1BodyRatio}  ` +
      `H2rec:${r.h2RecSize} H2scope:${r.h2ScopeSize} H3:${r.h3Size}  ` +
      `recPad:${r.recPadTop}/${r.recPadBottom} scopePad:${r.scopePadTop}/${r.scopePadBottom}  ` +
      `err:${r.consoleErrors.length} (3p:${r.thirdPartyErrors.length})`
  );
  console.log(
    `        panels: ` +
      r.panels.map((p) => `${p.cls} ${p.mediaW}x${p.mediaH} @${p.objectPosition}`).join(" | ")
  );
}

console.log(`\nscope columns @1440: ${report.at(-1).scopeCols}`);
console.log(`scope row columns @1440: ${report.at(-1).scopeRowCols}`);
console.log(`recognition bg: ${report.at(-1).recBg} | scope bg: ${report.at(-1).scopeBg}`);

if (failures.length) {
  console.error(`\nFAILURES (${failures.length}):`);
  failures.forEach((f) => console.error(` - ${f}`));
  process.exitCode = 1;
} else {
  console.log("\nAll checks passed.");
}
