// SITUATION ENUM GUARD — fails the build when the service options a form can render drift
// away from the values functions/_lib/lead.ts will actually accept.
//
// WHY THIS EXISTS. On 2026-09-04 a sixth service option, "Crime scene or trauma cleanup", was
// added to src/data/assessment.ts. It rendered on the homepage hero, /contact/ and all five
// service-page heroes, and it was PRESELECTED on /crime-scene-trauma-cleanup-san-jose/. It was
// never added to `allowedValues.property_situation` in functions/_lib/lead.ts, so every
// submission that chose it was rejected 422 "Select a valid option." — before Turnstile, before
// storage, before HubSpot, before either email. The lead was lost silently and the visitor saw a
// validation error on a dropdown they had answered correctly. It shipped to production and was
// live on aseptaclean.com.
//
// The two lists are a contract between the form and the endpoint. Nothing in the type system
// connects them, and src/data/assessment.ts's own comment asserted (wrongly) that every value
// was already accepted server-side. This script is the connection: it runs the REAL validator
// against the REAL option list, so it cannot be satisfied by a stale copy of either.
//
// Runs in `npm run build`. Exit 1 fails the Cloudflare Pages build rather than deploying a form
// that rejects its own options.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const work = mkdtempSync(join(tmpdir(), "ac-situation-guard-"));
const bundle = (entry, out) => {
  execFileSync(
    "npx",
    [
      "esbuild",
      entry,
      "--bundle",
      "--platform=node",
      "--format=esm",
      // Suppress esbuild's own success summary so this guard's output is only its own verdict.
      // Real bundling errors still reach stderr and still throw.
      "--log-level=warning",
      `--outfile=${join(work, out)}`
    ],
    { stdio: ["ignore", "ignore", "inherit"] }
  );
  return pathToFileURL(join(work, out)).href;
};

let failed = false;
try {
  const { assessment } = await import(bundle("src/data/assessment.ts", "assessment.mjs"));
  const { validateLead } = await import(bundle("functions/_lib/lead.ts", "lead.mjs"));

  // A complete, otherwise-valid submission in the shape every <select>-bearing form posts
  // (AcCompactForm.astro: form_version present, offer_type !== private_residence_reset). Only
  // property_situation varies, so any error on that field is unambiguously an enum mismatch.
  const payload = (situation) => {
    const data = new FormData();
    for (const [key, value] of Object.entries({
      form_version: assessment.version,
      offer_type: "handoff_reset",
      full_name: "Enum Guard",
      phone: "4085550100",
      email: "guard@example.com",
      property_zip: "95113",
      property_situation: situation,
      property_detail: "x",
      privacy_consent: "yes",
      submission_timestamp: new Date().toISOString(),
      idempotency_key: crypto.randomUUID()
    })) {
      data.append(key, value);
    }
    return data;
  };

  console.log(`situation enum guard — ${assessment.situations.length} rendered option(s)`);
  for (const { value, label, route } of assessment.situations) {
    const { errors } = validateLead(payload(value));
    // Only property_situation is under test. Any other error means this guard's fixture drifted
    // from the required set, which is a bug in this script, not in the enum — say so plainly
    // rather than reporting a false enum mismatch.
    const other = Object.keys(errors).filter((key) => key !== "property_situation");
    if (other.length) {
      failed = true;
      console.error(
        `  FAIL  "${value}" — guard fixture is incomplete; unrelated errors: ${other.join(", ")}`
      );
      continue;
    }
    if (errors.property_situation) {
      failed = true;
      console.error(
        `  FAIL  "${value}" (shown as "${label}"${route ? `, preselected on ${route}` : ""}) ` +
          `is rendered by a form but REJECTED by functions/_lib/lead.ts: ${errors.property_situation}`
      );
      continue;
    }
    console.log(`  ok    "${value}" -> "${label}"`);
  }

  if (failed) {
    console.error(
      "\nEvery value in src/data/assessment.ts situations must appear in " +
        "allowedValues.property_situation in functions/_lib/lead.ts. Add the missing value(s) " +
        "there — do NOT rename the form value to match, it is the frozen CRM contract."
    );
  } else {
    console.log("situation enum guard: form options and endpoint validation agree.");
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
