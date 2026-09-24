import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4321";
const outDir = resolve("output/public-pages-space-audit");
const allPages = [
  ["home", "/"],
  ["hoarding", "/hoarding-cleanup-san-jose/"],
  ["extreme", "/extreme-cleaning-san-jose/"],
  ["deep", "/deep-cleaning-san-jose/"],
  ["trauma", "/crime-scene-trauma-cleanup-san-jose/"],
  ["rodent", "/rodent-dropping-cleanup-san-jose/"],
  ["estate", "/estate-cleanout-san-jose/"]
];
const pages = process.env.PAGE ? allPages.filter(([name]) => name === process.env.PAGE) : allPages;
const widths = process.env.WIDTH ? [Number(process.env.WIDTH)] : [320, 390, 720, 768, 1440];
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});
const results = [];
await mkdir(outDir, { recursive: true });

for (const [name, path] of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.route("**://app.termly.io/**", (route) => route.abort());
    await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const images = [...document.images];
      images.forEach((img) => { img.loading = "eager"; });
      await Promise.all(images.map((img) => img.decode?.().catch(() => {})));
      window.scrollTo(0, 0);
    });
    const metrics = await page.evaluate(() => {
      const rect = (el) => {
        const box = el?.getBoundingClientRect();
        return box ? {
          top: Math.round(box.top + scrollY),
          bottom: Math.round(box.bottom + scrollY),
          left: Math.round(box.left),
          width: Math.round(box.width)
        } : null;
      };
      const editorialSplits = [...document.querySelectorAll(
        ".section > .wrap > .split:has(> :first-child > :is(.intro-heading, .full-section-heading, .wide-heading))"
      )].map((split) => {
        const heading = split.querySelector(":scope > :first-child > :is(.intro-heading, .full-section-heading, .wide-heading)");
        return {
          section: split.closest("section")?.id || split.closest("section")?.className || "section",
          heading: rect(heading),
          copy: rect(heading?.nextElementSibling),
          media: rect(split.lastElementChild),
          columns: getComputedStyle(split).gridTemplateColumns
        };
      });
      const homePairs = [
        ["home-why", document.querySelector("#ac-why .why-heading"), document.querySelector("#ac-why .why-heading + p"), document.querySelector("#ac-why .why-photo")],
        ["home-who", document.querySelector("#ac-who .audience-heading"), document.querySelector("#ac-who .audience-heading + .audience"), document.querySelector("#ac-who .assigned-photo")]
      ];
      homePairs.forEach(([section, heading, copy, media]) => {
        if (heading && copy && media) editorialSplits.push({
          section,
          heading: rect(heading),
          copy: rect(copy),
          media: rect(media),
          columns: getComputedStyle(heading.closest(".why-layout, .split")).gridTemplateColumns
        });
      });
      const main = document.querySelector("main");
      const blocks = [...(main?.children ?? [])].filter((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== "none" && rect.height > 0;
      }).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: String(el.className).split(/\s+/).slice(0, 3).join("."),
          top: Math.round(rect.top + scrollY),
          height: Math.round(rect.height),
          textLength: (el.textContent || "").trim().length,
          images: el.querySelectorAll("img").length
        };
      });
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        pageHeight: document.documentElement.scrollHeight,
        editorialSplits,
        blocks,
        forms: [...document.querySelectorAll("main form")].map((form) => {
          const formRect = form.getBoundingClientRect();
          return {
            width: Math.round(formRect.width),
            height: Math.round(formRect.height),
            parentWidth: Math.round(form.parentElement?.getBoundingClientRect().width || 0),
            parentColumns: form.parentElement ? getComputedStyle(form.parentElement).gridTemplateColumns : "",
            children: [...form.children].filter((el) => getComputedStyle(el).display !== "none").map((el) => {
              const rect = el.getBoundingClientRect();
              return {
                className: String(el.className),
                tag: el.tagName.toLowerCase(),
                top: Math.round(rect.top - formRect.top),
                height: Math.round(rect.height),
                marginTop: Math.round(parseFloat(getComputedStyle(el).marginTop))
              };
            })
          };
        }),
        unloadedImages: [...document.images].filter((img) => !img.complete || !img.naturalWidth).map((img) => img.src)
      };
    });
    await page.screenshot({ path: `${outDir}/${name}-${width}.png`, fullPage: true });
    results.push({ name, path, width, ...metrics });
    await page.close();
  }
}

await browser.close();
await writeFile(`${outDir}/results.json`, `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify({
  pages: pages.length,
  widths,
  failures: results.filter((result) =>
    result.overflow > 1 ||
    result.unloadedImages.length ||
    (result.width >= 1024 && result.editorialSplits.some(({ heading, copy, media }) =>
      !heading || !copy || !media ||
      Math.abs(media.top - heading.top) > 2 ||
      copy.top - heading.bottom > 40
    ))
  )
}, null, 2));
