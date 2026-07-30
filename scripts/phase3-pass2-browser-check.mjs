import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4321";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = new URL(
  "../artifacts/phase-3/pass-2/",
  import.meta.url
);
const widths = [320, 390, 768, 1024, 1280, 1440];
const failures = [];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

const fillStepOne = async (page) => {
  await page.locator("#property-city").fill("San Jose");
  await page.locator("#property-type").selectOption("Single-family home");
  await page.locator('[name="vacant_status"][value="yes"]').check();
  await page
    .locator("#property-situation")
    .selectOption("Preparing to sell");
  await page.locator("#completion-date").fill("2026-09-15");
  await page
    .locator("#square-footage")
    .selectOption("1,500–1,999 sq. ft.");
};

const fillStepTwo = async (page) => {
  await page
    .locator('[name="areas_involved[]"][value="Whole interior"]')
    .check();
  for (const name of [
    "contents_removal",
    "heavy_cleaning",
    "garage_storage",
    "appliance_interiors",
    "cabinet_interiors",
    "animal_waste",
    "human_biological_material",
    "needles_sharps",
    "sewage",
    "mold",
    "pest_activity"
  ]) {
    await page.locator(`[name="${name}"][value="no"]`).check();
  }
  await page
    .locator("#must-remain")
    .fill("Family photographs and the labeled hall closet.");
  await page
    .locator("#must-remove")
    .fill("Unwanted furniture and boxed household contents.");
};

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(`${baseUrl}/request-assessment/`, {
      waitUntil: "networkidle"
    });
    const result = await page.evaluate(() => {
      const steps = [...document.querySelectorAll("[data-step]")];
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        visibleSteps: steps.filter((step) => !step.hasAttribute("hidden"))
          .length,
        currentIndicator:
          document.querySelector('[data-step-indicator][aria-current="step"]')
            ?.textContent,
        enhanced:
          document.querySelector("[data-assessment-form]")?.getAttribute(
            "data-enhanced"
          )
      };
    });

    if (response?.status() !== 200) {
      failures.push(`Assessment returned ${response?.status()} at ${width}px`);
    }
    if (result.scrollWidth > result.clientWidth) {
      failures.push(
        `Enhanced assessment overflows at ${width}px: ${result.scrollWidth}px > ${result.clientWidth}px`
      );
    }
    if (result.visibleSteps !== 1 || result.enhanced !== "true") {
      failures.push(
        `Progressive step state failed at ${width}px: ${JSON.stringify(result)}`
      );
    }
    console.log(
      `PASS ${width}px: one enhanced step visible, no horizontal overflow`
    );
    await page.close();
  }

  const statePage = await browser.newPage({
    viewport: { width: 390, height: 900 }
  });
  await statePage.goto(`${baseUrl}/request-assessment/?utm_source=qa`, {
    waitUntil: "networkidle"
  });

  await statePage.screenshot({
    path: new URL("step-1-390.png", outputDirectory).pathname,
    fullPage: true
  });

  await statePage.locator("[data-next-step]").first().click();
  const errorState = await statePage.evaluate(() => ({
    summaryVisible: !document
      .querySelector(".intake-form__errors")
      ?.hasAttribute("hidden"),
    summaryLinks: document.querySelectorAll(".intake-form__errors a").length,
    invalidControls: document.querySelectorAll('[aria-invalid="true"]').length,
    focusedClass: document.activeElement?.className
  }));
  if (
    !errorState.summaryVisible ||
    errorState.summaryLinks < 6 ||
    errorState.invalidControls < 6 ||
    errorState.focusedClass !== "intake-form__errors"
  ) {
    failures.push(`Step 1 accessible error state failed: ${JSON.stringify(errorState)}`);
  }
  await statePage.screenshot({
    path: new URL("step-1-errors-390.png", outputDirectory).pathname,
    fullPage: true
  });

  await fillStepOne(statePage);
  await statePage.locator("[data-next-step]").first().click();
  const stepTwoState = await statePage.evaluate(() => ({
    stepOneHidden: document.querySelector("#property-fit")?.hasAttribute("hidden"),
    stepTwoVisible: !document
      .querySelector("#scope-condition")
      ?.hasAttribute("hidden"),
    focus: document.activeElement?.textContent?.trim(),
    current:
      document.querySelector('[data-step-indicator][aria-current="step"]')
        ?.getAttribute("data-step-indicator"),
    utm: document.querySelector('[name="utm_source"]')?.getAttribute("value")
  }));
  if (
    !stepTwoState.stepOneHidden ||
    !stepTwoState.stepTwoVisible ||
    stepTwoState.focus !== "Scope and condition" ||
    stepTwoState.current !== "1"
  ) {
    failures.push(`Step 2 transition/focus failed: ${JSON.stringify(stepTwoState)}`);
  }
  const capturedUtm = await statePage.locator('[name="utm_source"]').inputValue();
  if (capturedUtm !== "qa") {
    failures.push(`UTM source was "${capturedUtm}", not "qa"`);
  }
  await statePage.screenshot({
    path: new URL("step-2-390.png", outputDirectory).pathname,
    fullPage: true
  });

  const upload = statePage.locator("[data-upload-input]");
  await upload.setInputFiles({
    name: "property-kitchen.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from("phase-3-upload-selection")
  });
  const selectedState = await statePage.evaluate(() => ({
    selectedItems: document.querySelectorAll("[data-upload-list] li").length,
    emptyHidden: document
      .querySelector("[data-upload-empty]")
      ?.hasAttribute("hidden"),
    removeLabel: document
      .querySelector("[data-upload-list] button")
      ?.getAttribute("aria-label")
  }));
  if (
    selectedState.selectedItems !== 1 ||
    !selectedState.emptyHidden ||
    !selectedState.removeLabel?.includes("property-kitchen.jpg")
  ) {
    failures.push(`Upload selected state failed: ${JSON.stringify(selectedState)}`);
  }
  await statePage.locator(".upload-field").screenshot({
    path: new URL("upload-selected-390.png", outputDirectory).pathname
  });

  await statePage.locator("[data-upload-list] button").click();
  if (!(await statePage.locator("[data-upload-empty]").isVisible())) {
    failures.push("Upload empty state did not return after file removal");
  }

  await upload.setInputFiles({
    name: "unsupported-property-file.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("unsupported")
  });
  const uploadErrorState = await statePage.evaluate(() => ({
    errorVisible: !document
      .querySelector("[data-upload-error]")
      ?.hasAttribute("hidden"),
    invalid: document
      .querySelector("[data-upload-input]")
      ?.getAttribute("aria-invalid"),
    rowState: document
      .querySelector("[data-upload-list] li")
      ?.getAttribute("data-state")
  }));
  if (
    !uploadErrorState.errorVisible ||
    uploadErrorState.invalid !== "true" ||
    uploadErrorState.rowState !== "error"
  ) {
    failures.push(
      `Upload invalid-type state failed: ${JSON.stringify(uploadErrorState)}`
    );
  }
  await statePage.locator(".upload-field").screenshot({
    path: new URL("upload-error-390.png", outputDirectory).pathname
  });

  await upload.setInputFiles({
    name: "property-entry.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from("valid-selection")
  });
  await fillStepTwo(statePage);
  await statePage.locator("#scope-condition [data-next-step]").click();
  const stepThreeState = await statePage.evaluate(() => ({
    visible: !document
      .querySelector("#authority-contact")
      ?.hasAttribute("hidden"),
    focus: document.activeElement?.textContent?.trim(),
    current:
      document.querySelector('[data-step-indicator][aria-current="step"]')
        ?.getAttribute("data-step-indicator")
  }));
  if (
    !stepThreeState.visible ||
    stepThreeState.focus !== "Authority and contact" ||
    stepThreeState.current !== "2"
  ) {
    failures.push(`Step 3 transition/focus failed: ${JSON.stringify(stepThreeState)}`);
  }
  await statePage.screenshot({
    path: new URL("step-3-390.png", outputDirectory).pathname,
    fullPage: true
  });

  await statePage.locator("#full-name").fill("Browser QA");
  await statePage.locator("#phone").fill("4085550100");
  await statePage.locator("#email").fill("browser-qa@example.test");
  await statePage
    .locator("#relationship")
    .selectOption("Property owner");
  await statePage
    .locator('[name="authority_to_approve"][value="yes"]')
    .check();
  await statePage.locator("#property-address").fill("Private QA address");
  await statePage
    .locator('[name="preferred_contact_method"][value="Phone call"]')
    .check();
  await statePage.locator('[name="privacy_consent"]').check();
  await statePage.locator('[name="scope_acknowledgment"]').check();
  await statePage.evaluate(() => {
    const form = document.querySelector("[data-assessment-form]");
    const submit = document.querySelector("[data-submit-button]");
    if (form instanceof HTMLFormElement) form.action = "/api/lead";
    if (submit instanceof HTMLButtonElement) submit.disabled = false;
    const token = document.createElement("input");
    token.type = "hidden";
    token.name = "cf-turnstile-response";
    token.value = "browser-qa-token";
    form?.append(token);
  });

  let submissionAttempt = 0;
  await statePage.route("**/api/lead", async (route) => {
    submissionAttempt += 1;
    await new Promise((resolve) => setTimeout(resolve, 650));
    if (submissionAttempt === 1) {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          message:
            "Test delivery failure. Your answers remain here so you can try again."
        })
      });
      return;
    }
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        submissionId: "browser-qa-12345678",
        callbackWindow: "business-hours",
        confirmationEmailSent: true
      })
    });
  });

  await statePage.locator("[data-submit-button]").click();
  await statePage.waitForTimeout(100);
  const loadingState = await statePage.evaluate(() => ({
    busy: document
      .querySelector("[data-assessment-form]")
      ?.getAttribute("aria-busy"),
    disabled: document
      .querySelector("[data-submit-button]")
      ?.hasAttribute("disabled"),
    label: document
      .querySelector("[data-submit-label]")
      ?.textContent?.trim()
  }));
  if (
    loadingState.busy !== "true" ||
    !loadingState.disabled ||
    loadingState.label !== "Sending request…"
  ) {
    failures.push(`Loading state failed: ${JSON.stringify(loadingState)}`);
  }
  await statePage.locator(".intake-form__actions").screenshot({
    path: new URL("submission-loading-390.png", outputDirectory).pathname
  });
  await statePage
    .locator("[data-submit-status]")
    .filter({ hasText: "Test delivery failure" })
    .waitFor();
  const failureState = await statePage.evaluate(() => ({
    buttonEnabled: !document
      .querySelector("[data-submit-button]")
      ?.hasAttribute("disabled"),
    city: document.querySelector("#property-city")?.value,
    failure: document
      .querySelector("[data-submit-status]")
      ?.textContent?.trim()
  }));
  if (
    !failureState.buttonEnabled ||
    failureState.city !== "San Jose" ||
    !failureState.failure?.includes("answers remain")
  ) {
    failures.push(`Submission failure state failed: ${JSON.stringify(failureState)}`);
  }
  await statePage.locator(".intake-form__actions").screenshot({
    path: new URL("submission-failure-390.png", outputDirectory).pathname
  });

  await statePage.locator("[data-submit-button]").click();
  await statePage.waitForURL("**/thank-you/**");
  const successState = {
    confirmed: await statePage.locator("[data-confirmed]").isVisible(),
    reference: await statePage
      .locator("[data-submission-reference]")
      .textContent(),
    sanitizedUrl: statePage.url()
  };
  if (
    !successState.confirmed ||
    !successState.reference?.includes("browser-qa-12345678") ||
    successState.sanitizedUrl !== "http://127.0.0.1:4321/thank-you/"
  ) {
    failures.push(`Successful submission redirect failed: ${JSON.stringify(successState)}`);
  }
  await statePage.close();

  const persistenceContext = await browser.newContext({
    viewport: { width: 390, height: 900 }
  });
  const persistencePage = await persistenceContext.newPage();
  await persistencePage.goto(`${baseUrl}/request-assessment/`, {
    waitUntil: "networkidle"
  });
  await persistencePage.locator("#property-city").fill("Campbell");
  await persistencePage
    .locator("#property-type")
    .selectOption("Townhome");
  await persistencePage.waitForTimeout(400);
  await persistencePage.reload({ waitUntil: "networkidle" });
  const restoration = {
    city: await persistencePage.locator("#property-city").inputValue(),
    propertyType: await persistencePage.locator("#property-type").inputValue(),
    noticeVisible: await persistencePage.locator("[data-draft-status]").isVisible()
  };
  if (
    restoration.city !== "Campbell" ||
    restoration.propertyType !== "Townhome" ||
    !restoration.noticeVisible
  ) {
    failures.push(`Draft restoration failed: ${JSON.stringify(restoration)}`);
  }
  await persistencePage.screenshot({
    path: new URL("draft-restored-390.png", outputDirectory).pathname,
    fullPage: true
  });
  await persistenceContext.close();

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 }
  });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(`${baseUrl}/request-assessment/`, {
    waitUntil: "domcontentloaded"
  });
  const noScriptState = await noScriptPage.evaluate(() => ({
    visibleSteps: [...document.querySelectorAll("[data-step]")].filter(
      (step) => !step.hasAttribute("hidden")
    ).length,
    enhancedActionsVisible: [...document.querySelectorAll("[data-enhanced-actions]")].some(
      (action) => !action.hasAttribute("hidden")
    ),
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  if (
    noScriptState.visibleSteps !== 3 ||
    noScriptState.enhancedActionsVisible ||
    noScriptState.scrollWidth > noScriptState.clientWidth
  ) {
    failures.push(`No-JavaScript path failed: ${JSON.stringify(noScriptState)}`);
  }
  await noScriptPage.screenshot({
    path: new URL("no-javascript-320.png", outputDirectory).pathname,
    fullPage: true
  });
  await noScriptContext.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\nPhase 3 Pass 2 browser checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("PASS inline errors, linked summary, and summary focus");
console.log("PASS step transitions and step-heading focus management");
console.log("PASS upload selected, removal, empty, and invalid-type states");
console.log("PASS local/session progress restoration without file persistence");
console.log("PASS UTM source capture");
console.log("PASS no-JavaScript three-step form at 320px");
console.log("PASS loading, failure with preserved answers, and success redirect states");
