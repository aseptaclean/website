import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL("../artifacts/phase-4/reports/", import.meta.url);
const widths = [320, 390, 768, 1024, 1280, 1440];
const routes = [
  ["/", "Property Cleanout & Deep Cleaning San Jose | Aseptaclean"],
  [
    "/private-residence-reset/",
    "Private Residence Reset in San Jose & South Bay | Aseptaclean"
  ],
  ["/request-assessment/", "Request a Property Assessment | Aseptaclean"],
  ["/privacy/", "Privacy Policy | Aseptaclean"],
  ["/terms/", "Terms and Conditions | Aseptaclean"],
  ["/cookie-policy/", "Cookie Policy | Aseptaclean"],
  ["/thank-you/", "Thank You | Aseptaclean"]
];
const failures = [];
const audit = [];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

try {
  for (const width of widths) {
    for (const [route, title] of routes) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle"
      });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        let schemaValid = true;
        const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')];
        try {
          schemas.forEach((node) => JSON.parse(node.textContent || ""));
        } catch {
          schemaValid = false;
        }
        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll("h1").length,
          h1Font: h1 ? getComputedStyle(h1).fontFamily : "",
          bodyFont: getComputedStyle(document.body).fontFamily,
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          schemaCount: schemas.length,
          schemaValid,
          aggregateRating: document.body.innerHTML.includes("AggregateRating")
        };
      });
      audit.push({ route, width, status: response?.status(), ...result });
      if (response?.status() !== 200) failures.push(`${route} returned ${response?.status()}`);
      if (result.scrollWidth > result.clientWidth) {
        failures.push(`${route} overflows at ${width}px`);
      }
      if (result.h1Count !== 1) failures.push(`${route} has ${result.h1Count} H1s`);
      if (!result.h1Font.includes("Newsreader Variable")) {
        failures.push(`${route} did not render Newsreader at ${width}px`);
      }
      if (!result.bodyFont.includes("Instrument Sans Variable")) {
        failures.push(`${route} did not render Instrument Sans at ${width}px`);
      }
      if (result.title !== title) failures.push(`${route} title mismatch`);
      if (!result.schemaCount || !result.schemaValid || result.aggregateRating) {
        failures.push(`${route} structured data failed`);
      }
      await page.close();
    }
  }

  const campaign = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await campaign.goto(`${baseUrl}/private-residence-reset/`, {
    waitUntil: "networkidle"
  });
  const campaignState = await campaign.evaluate(() => ({
    primaryNavHasCampaign: [...document.querySelectorAll("header nav a")].some(
      (link) => link.textContent?.includes("Private Residence")
    ),
    footerCampaignVisible: [...document.querySelectorAll("footer a")].some(
      (link) => link.textContent?.includes("Private Residence Reset")
    ),
    sampleCount: [...document.querySelectorAll("main *")].filter(
      (element) => element.textContent?.trim() === "SAMPLE"
    ).length,
    ctaHref: document
      .querySelector(
        'a[href*="offer=private-residence-reset"]'
      )
      ?.getAttribute("href")
  }));
  if (
    campaignState.primaryNavHasCampaign ||
    !campaignState.footerCampaignVisible ||
    !campaignState.sampleCount ||
    campaignState.ctaHref !==
      "/request-assessment/?offer=private-residence-reset"
  ) {
    failures.push(`Campaign controls failed: ${JSON.stringify(campaignState)}`);
  }
  await campaign.close();

  const residenceForm = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  await residenceForm.goto(
    `${baseUrl}/request-assessment/?offer=private-residence-reset`,
    { waitUntil: "networkidle" }
  );
  const formState = await residenceForm.evaluate(() => ({
    offer: document
      .querySelector('input[name="offer_type"]')
      ?.value,
    entryRoute: document
      .querySelector('input[name="entry_route"]')
      ?.value,
    title: document.querySelector("h1")?.textContent?.trim(),
    residenceVisible: Boolean(
      document.querySelector("[data-residence-only]:not([hidden])")
    ),
    handoffVisible: Boolean(
      document.querySelector("[data-handoff-only]:not([hidden])")
    ),
    requiredResidence: [
      ...document.querySelectorAll("[data-residence-required]")
    ].every(
      (control) =>
        (control instanceof HTMLInputElement ||
          control instanceof HTMLSelectElement ||
          control instanceof HTMLTextAreaElement) &&
        control.required &&
        !control.disabled
    )
  }));
  if (
    formState.offer !== "private_residence_reset" ||
    formState.entryRoute !== "/private-residence-reset/" ||
    !formState.title?.includes("residence") ||
    !formState.residenceVisible ||
    formState.handoffVisible ||
    !formState.requiredResidence
  ) {
    failures.push(`Residence form switch failed: ${JSON.stringify(formState)}`);
  }
  await residenceForm.close();

  const accessibility = [];
  for (const route of ["/", "/private-residence-reset/", "/request-assessment/"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 900 }
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    accessibility.push({
      route,
      violations: results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.map((node) => node.target)
      }))
    });
    for (const violation of results.violations) {
      if (["critical", "serious"].includes(violation.impact || "")) {
        failures.push(`${route} axe ${violation.impact}: ${violation.id}`);
      }
    }
    await context.close();
  }

  const keyboard = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await keyboard.goto(`${baseUrl}/private-residence-reset/`, {
    waitUntil: "networkidle"
  });
  await keyboard.keyboard.press("Tab");
  const firstFocus = await keyboard.evaluate(
    () => document.activeElement?.textContent?.trim()
  );
  await keyboard.keyboard.press("Enter");
  const skipTarget = await keyboard.evaluate(() => document.activeElement?.id);
  if (firstFocus !== "Skip to main content" || skipTarget !== "main-content") {
    failures.push(`Campaign keyboard skip failed: ${firstFocus}/${skipTarget}`);
  }
  await keyboard.close();

  const noScript = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 }
  });
  const noScriptCampaign = await noScript.newPage();
  await noScriptCampaign.goto(`${baseUrl}/private-residence-reset/`, {
    waitUntil: "domcontentloaded"
  });
  const noScriptText = await noScriptCampaign.locator("main").innerText();
  if (
    !noScriptText.includes("Bring the entire residence back") ||
    !noScriptText.includes("Residence Baseline Record")
  ) {
    failures.push("Campaign content is incomplete with JavaScript disabled");
  }
  await noScript.close();

  const sitemap = await fetch(`${baseUrl}/sitemap.xml`).then((response) =>
    response.text()
  );
  const robots = await fetch(`${baseUrl}/robots.txt`).then((response) =>
    response.text()
  );
  if (
    !sitemap.includes("/private-residence-reset/") ||
    !sitemap.includes("/cookie-policy/") ||
    !robots.includes("Disallow: /")
  ) {
    failures.push("Sitemap or staging robots evidence failed");
  }

  await writeFile(
    new URL("responsive-audit.json", outputDirectory),
    JSON.stringify(audit, null, 2)
  );
  await writeFile(
    new URL("axe-mobile.json", outputDirectory),
    JSON.stringify(accessibility, null, 2)
  );
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Phase 4 deep checks failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS seven routes at 320, 390, 768, 1024, 1280, and 1440px");
console.log("PASS no overflow, one H1, approved fonts, metadata, and JSON-LD");
console.log("PASS controlled campaign navigation, sample label, and assessment CTA");
console.log("PASS explicit Private Residence Reset form variant");
console.log("PASS axe WCAG mobile scan with no serious or critical violations");
console.log("PASS keyboard skip link and JavaScript-disabled campaign content");
console.log("PASS sitemap campaign route, cookie policy, and staging robots block");
