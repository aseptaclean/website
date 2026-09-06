// GATE 6 — copy trace. RETARGETED 2026-09-04, not disabled.
//
// This script used to read docs/27-COPY-CANONICAL.md and assert that every approved string in
// that canon appeared in the rendered build. The 2026-09-04 owner documentation consolidation
// retired doc 27 as a copy authority (docs/README.md "Conflict resolution" names it explicitly)
// and moved it to docs/archive/2026-09-04-before-consolidation/. The script therefore crashed
// with ENOENT — it was asserting against a file the project no longer treats as truth.
//
// The gate's QUESTION is still the right one: does every approved string reach the build? The
// current answer lives in scripts/copy-fidelity-audit.mjs, which asks exactly that against the
// current sources — docs/aseptaclean-all-website-copy.md and the trauma supplement, placed by
// docs/20-COPY-MAP.md and the twelve docs/page-briefs/. It also checks the display
// transformations and the explicit homepage omissions, which the old canon could not express.
//
// So gate 6 now runs that check rather than a retired one. Coverage is preserved and current;
// nothing is skipped. Pointing this at the archived doc instead would assert that superseded
// copy must still ship, which is the opposite of what the gate is for.
//
// If gate 6 needs to diverge from copy-fidelity-audit.mjs in future, give it its own assertions
// against a CURRENT source — do not resurrect the archived canon.
import { spawnSync } from "node:child_process";

console.log("GATE 6 — copy trace");
console.log("  source of truth: docs/aseptaclean-all-website-copy.md + trauma supplement");
console.log("  placement map:   docs/20-COPY-MAP.md + docs/page-briefs/");
console.log("  (docs/27-COPY-CANONICAL.md was retired 2026-09-04; see the note in this file)\n");

const result = spawnSync(process.execPath, ["scripts/copy-fidelity-audit.mjs"], {
  stdio: "inherit"
});

if (result.status !== 0) {
  console.error("\nGATE 6: FAIL");
  process.exit(result.status ?? 1);
}
console.log("\nGATE 6: PASS");
