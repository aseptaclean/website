import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
const distDev = join(dist, "dev");

if (existsSync(distDev)) {
  rmSync(distDev, { recursive: true, force: true });
  console.log("Pruned /dev/* from production build output (dist/dev).");
}

// C5 — sweep _astro/ for bundles no surviving page references.
//
// Removing dist/dev/ deletes the dev ROUTES but not the CSS and JS Astro emitted for them:
// `hero-variants.<hash>.css` was shipping in every production build, an orphaned stylesheet
// downloadable at a public URL and belonging to a page that does not exist. Deleting the two
// known dev bundles by name would fix today and rot the moment someone adds a third dev route,
// so this sweeps by reference instead: any asset whose filename appears in no remaining text
// file under dist/ is unreachable and goes.
//
// Conservative by construction — it only removes files nothing points at, and it runs AFTER the
// dev-route removal above so assets referenced solely by a pruned page are correctly orphaned.
// It reads references as plain substrings rather than parsing, so an asset referenced from an
// import map, a source map, or inline CSS still counts as reachable and is kept.
const assetsDir = join(dist, "_astro");

if (existsSync(assetsDir)) {
  const TEXT = /\.(html|css|js|mjs|xml|txt|json|map)$/i;

  const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
      const full = join(dir, entry);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });

  const assets = readdirSync(assetsDir);
  // Everything textual in dist EXCEPT the asset being tested — an asset referencing itself
  // (a CSS file naming its own sourcemap, say) must not count as being reachable.
  const referenceFiles = walk(dist).filter((f) => TEXT.test(f));
  const haystacks = new Map(
    referenceFiles.map((f) => [f, readFileSync(f, "utf8")])
  );

  const orphans = assets.filter((asset) => {
    const assetPath = join(assetsDir, asset);
    for (const [file, contents] of haystacks) {
      if (file === assetPath) continue;
      if (contents.includes(asset)) return false;
    }
    return true;
  });

  for (const orphan of orphans) {
    rmSync(join(assetsDir, orphan), { force: true });
  }

  if (orphans.length > 0) {
    console.log(
      `Pruned ${orphans.length} unreferenced asset(s) from dist/_astro: ${orphans.join(", ")}`
    );
  }
}
