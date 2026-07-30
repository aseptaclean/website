import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL(
  "../artifacts/phase-4/private-preview/",
  import.meta.url
);
const widths = [320, 390, 768, 1280];
const routes = [
  "/privacy/",
  "/terms/",
  "/cookie-policy/",
  "/thank-you/"
];
const expectTermlyConfig = process.env.EXPECT_TERMLY_CONFIG === "true";
const failures = [];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    if (expectTermlyConfig) {
      await page.route("https://app.termly.io/**", (route) => route.abort());
    }
    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle"
      });
      const state = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        robots: document
          .querySelector('meta[name="robots"]')
          ?.getAttribute("content"),
        canonical: document
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href"),
        visibleH1Count: [...document.querySelectorAll("h1")].filter(
          (heading) => heading.getClientRects().length > 0
        ).length
      }));
      if (response?.status() !== 200) {
        failures.push(`${route} returned ${response?.status()} at ${width}px`);
      }
      if (state.scrollWidth > state.clientWidth) {
        failures.push(
          `${route} overflows at ${width}px: ${state.scrollWidth}px > ${state.clientWidth}px`
        );
      }
      if (state.robots !== "noindex, nofollow") {
        failures.push(`${route} robots metadata was "${state.robots}"`);
      }
      if (
        state.canonical !==
        `https://aseptaclean.com${route}`
      ) {
        failures.push(`${route} canonical was "${state.canonical}"`);
      }
      if (state.visibleH1Count !== 1) {
        failures.push(`${route} has ${state.visibleH1Count} visible H1 elements`);
      }
      const slug = route.split("/").filter(Boolean)[0];
      await page.screenshot({
        path: new URL(`${slug}-${width}.png`, outputDirectory).pathname,
        fullPage: true
      });
    }
    await page.close();
  }

  const keyboardPage = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  if (expectTermlyConfig) {
    await keyboardPage.route("https://app.termly.io/**", (route) =>
      route.abort()
    );
  }
  await keyboardPage.goto(`${baseUrl}/privacy/`, {
    waitUntil: "networkidle"
  });
  await keyboardPage.keyboard.press("Tab");
  const firstFocus = await keyboardPage.evaluate(
    () => document.activeElement?.textContent?.trim()
  );
  if (firstFocus !== "Skip to main content") {
    failures.push(`First keyboard focus was "${firstFocus}"`);
  }
  await keyboardPage.keyboard.press("Enter");
  if (
    (await keyboardPage.evaluate(() => document.activeElement?.id)) !==
    "main-content"
  ) {
    failures.push("Skip link did not focus main content");
  }
  await keyboardPage.locator("footer").scrollIntoViewIfNeeded();
  const footerTargets = await keyboardPage
    .locator(".site-footer a, .site-footer button")
    .evaluateAll((elements) =>
      elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label: element.textContent?.trim(),
            height: rect.height,
            width: rect.width
          };
        })
        .filter(({ height, width }) => height > 0 && width > 0 && height < 48)
    );
  if (footerTargets.length) {
    failures.push(
      `Footer controls below 48px: ${JSON.stringify(footerTargets)}`
    );
  }
  await keyboardPage.close();

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 }
  });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(`${baseUrl}/privacy/`, {
    waitUntil: "domcontentloaded"
  });
  const noScriptText = await noScriptPage.locator("main").innerText();
  const noScriptPass = expectTermlyConfig
    ? noScriptText.includes("JavaScript is disabled") &&
      noScriptText.includes("Contact Aseptaclean")
    : noScriptText.includes("Policy not published in this preview") &&
      noScriptText.includes("Contact Aseptaclean");
  if (!noScriptPass) {
    failures.push("JavaScript-disabled legal fallback is incomplete");
  }
  await noScriptContext.close();

  const directVisitPage = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  await directVisitPage.goto(`${baseUrl}/thank-you/`, {
    waitUntil: "networkidle"
  });
  if (
    !(await directVisitPage
      .locator("[data-unconfirmed]")
      .getByText("This page does not confirm that a request was received.")
      .isVisible())
  ) {
    failures.push("Direct thank-you visit did not show the unconfirmed state");
  }
  const thankYouText = await directVisitPage.locator("main").innerText();
  for (const statement of [
    "within one business day",
    "does not authorize work",
    "does not",
    "reserve a project date"
  ]) {
    if (!thankYouText.includes(statement)) {
      failures.push(`Thank-you route is missing "${statement}"`);
    }
  }
  await directVisitPage.close();

  if (expectTermlyConfig) {
    const providerFailurePage = await browser.newPage({
      viewport: { width: 390, height: 900 }
    });
    await providerFailurePage.route("https://app.termly.io/**", (route) =>
      route.abort()
    );
    await providerFailurePage.goto(`${baseUrl}/privacy/`, {
      waitUntil: "networkidle"
    });
    const providerState = await providerFailurePage.evaluate(() => ({
      embedPresent: Boolean(document.querySelector('[name="termly-embed"]')),
      fallbackVisible: Boolean(
        document.querySelector(".legal-policy__fallback")?.getClientRects()
          .length
      ),
      consentScriptPresent: Boolean(
        document.querySelector('script[data-name="termly-embed-banner"]')
      ),
      preferencesPresent: Boolean(
        document.querySelector(".termly-display-preferences")
      )
    }));
    if (Object.values(providerState).some((value) => !value)) {
      failures.push(
        `Configured provider failure state failed: ${JSON.stringify(providerState)}`
      );
    }
    await providerFailurePage.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\nPhase 4 browser checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS affected routes at 320, 390, 768, and 1280px");
console.log("PASS no horizontal overflow, one H1, canonical, and preview noindex");
console.log("PASS keyboard skip link, visible footer targets, and 48px controls");
console.log("PASS JavaScript-disabled legal fallback");
console.log("PASS safe direct-visit thank-you state and operational boundaries");
if (expectTermlyConfig) {
  console.log(
    "PASS configured Termly embed, consent hook, Cookie Preferences control, and blocked-provider fallback"
  );
}
