// PORT-PROMPT.md §6 gate 6 — mechanical copy trace.
//
// Gate 6 asks that every visible string trace to an approved source. Until now that was done by
// reading, which is how seven approved §9.15.5 strings shipped absent while the gate was marked
// PASS twice (docs/05-DECISIONS-LOG.md, 2026-08-18 §7 vs §8, and 2026-08-19). This script makes
// the gate mechanical in the one direction that can be automated:
//
//   for every approved string in the copy canon, is it present in the rendered build?
//
// It does NOT do the converse — it cannot prove an arbitrary rendered string traces back to an
// approved source, because that requires judgement about what counts as a string. Absence is
// mechanically checkable; provenance is not. Read the result accordingly.
//
// EXTRACTION CONTRACT. Verbatim copy in the canon is marked one of two ways, and this script
// reads only those two:
//   1. a markdown blockquote (`> …`)
//   2. a table cell under a column headed String / Copy / Text / Line / Heading / Body / Label
// Prose paragraphs in those documents are commentary and specification, not copy, and are
// deliberately not extracted. If copy is ever added as a bare paragraph it is invisible here —
// mark it as a blockquote instead.
//
// Usage: node scripts/gate6-copy-trace.mjs [--verbose]
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const DIST = join(ROOT, "dist");
const VERBOSE = process.argv.includes("--verbose");

const SOURCES = [
  join(ROOT, "docs/27-SECTION-9-15-CONNECTIVE-COPY.md"),
  join(ROOT, "docs/27-COPY-CANONICAL.md"),
];

// A string is exempt from "must be present" when the canon itself says it does not ship, or
// when it belongs to a route held behind a gate. Each entry needs a reason — an exemption
// without one is how a real gap gets waved through.
const EXEMPT = [
  { match: /^DOES NOT SHIP/i,        reason: "canon marks the block as not shipping" },
  { match: /§9\.4|§9\.5/,            reason: "homepage four-card copy overruled for / (doc 18 three-card rule)" },
  { match: /api\/leads/,             reason: "doc 27 §18 endpoint text, corrected to /api/lead in §9.15.5" },
  { match: /biohazard|trauma|crime.scene|unattended.death/i,
                                     reason: "Phase 5 four-gate route, not built" },
  { match: /city page|\{city\}/i,    reason: "city routes deferred — no /service-areas/{city}/ exists" },
];

// ---------------------------------------------------------------- extraction
const COPY_COLUMN = /^(string|copy|text|line|heading|body|label|slot value)$/i;
const NOT_COPY_ROW = /^[-\s|]*$/;

// Headings whose content is meta — a log entry to paste, a flagged correction — not site copy.
const META_HEADING = /decisions-log entry|paste on approval|correction \(flag|needs owner|amendment|addendum note/i;
// A blockquote that cites a file, a section number or a ruling is commentary, not copy.
const COMMENTARY = /docs\/|src\/|\.md\b|\.astro\b|\.html\b|DOES NOT SHIP|decisions-log|Re-examined|rank-\d/i;

function extract(path) {
  const rel = relative(ROOT, path);
  const lines = readFileSync(path, "utf8").split("\n");
  const found = [];
  let heading = "";
  let header = null;
  let copyCol = -1;
  let blockFlag = null;

  const flagFor = (t) => {
    for (const e of EXEMPT) if (e.match.test(t)) return e.reason;
    return null;
  };
  const push = (text, lineNo) => {
    if (!isCopy(text)) return;
    if (META_HEADING.test(heading)) return;
    found.push({ text, src: `${rel}:${lineNo}`, heading, exempt: blockFlag ?? flagFor(text) });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^#{1,6}\s/.test(line)) {
      heading = line.replace(/^#+\s*/, "").trim();
      header = null; copyCol = -1; blockFlag = null;
      continue;
    }
    if (/DOES NOT SHIP|is \*\*void\*\*|superseded and must not|retired/i.test(line)) {
      blockFlag = blockFlag ?? "canon marks this block superseded or not shipping";
    }

    // Blockquote: join consecutive `>` lines — a wrapped quote is one string, not four.
    if (/^>\s?/.test(line)) {
      const start = i;
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      i--;
      const text = clean(buf.join(" "));
      if (!COMMENTARY.test(text)) push(text, start + 1);
      continue;
    }

    if (/^\|/.test(line)) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^-+:?$/.test(c))) continue;      // separator row
      if (!header) {                                            // header row
        header = cells;
        copyCol = cells.findIndex((c) => COPY_COLUMN.test(c.replace(/\*/g, "").trim()));
        continue;
      }
      if (copyCol === -1 || NOT_COPY_ROW.test(line)) continue;  // table carries no copy column
      const raw = cells[copyCol];
      if (raw !== undefined) push(clean(raw), i + 1);
      continue;
    }
    if (line.trim() === "") header = null;
  }
  return found;
}

function clean(s) {
  return s
    .replace(/`([^`]*)`/g, "$1")            // code spans
    .replace(/\*\*([^*]*)\*\*/g, "$1")      // bold
    .replace(/\*([^*]*)\*/g, "$1")          // italic
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")// links
    .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s*[→›»]\s*$/, "")            // trailing CTA arrow — a glyph, not a word
    .replace(/\s+/g, " ")
    .trim();
}

// The canon writes a variable slot as {token} or [service name]. Both interpolate at render,
// so they match anything short in that position rather than failing as literals.
const PLACEHOLDER = /\{[^}]+\}|\[[^\]]+\]/;
const toRegex = (t) => new RegExp(
  t.split(PLACEHOLDER)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[^<]{0,40}"), "i");

// Some table cells hold two slot labels joined by · or / ("Scope excerpt · Sample"). They render
// as separate elements, so the joined form never appears. Checked as parts, reported as such.
const partsOf = (t) => t.split(/\s+[·/]\s+/).map((p) => p.trim()).filter((p) => p.length >= 12);

// Copy, as opposed to a spec fragment: real prose, not a bare identifier, path, or hex value.
function isCopy(t) {
  if (t.length < 12) return false;
  if (!/\s/.test(t)) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(t)) return false;
  if (/^https?:\/\//.test(t)) return false;
  if (/^\//.test(t) && !/\s/.test(t)) return false;
  if (!/[a-z]/.test(t)) return false;                 // ALL-CAPS spec labels
  if (/^(see|per|note|source|rule|gate|gates|gate\b)/i.test(t) && t.length < 40) return false;
  if (/^[A-Za-z0-9_.-]+\.(md|ts|astro|css|html|mjs)\b/.test(t)) return false;
  return true;
}

// ---------------------------------------------------------------- rendered build
function htmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const visible = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/&#39;|&rsquo;|&apos;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
  .replace(/&middot;/g, "·").replace(/&copy;/g, "©").replace(/&mdash;/g, "-").replace(/&ndash;/g, "-")
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-")
  .replace(/\s+/g, " ").trim();

// Client-side strings live in bundled JS, not in rendered text, so each route is searched in
// both its visible text and its raw source.
const rawNorm = (s) => s
  .replace(/\\u0026#39;|&#39;/g, "'")
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-")
  .replace(/\s+/g, " ");

if (!statSync(DIST, { throwIfNoEntry: false })) {
  console.error("dist/ not found — run `npm run build:local` first.");
  process.exit(2);
}

const files = htmlFiles(DIST);
const routes = files.map((f) => ({
  route: "/" + relative(DIST, f).replace(/index\.html$/, "").replace(/\\/g, "/"),
  text: visible(readFileSync(f, "utf8")),
  raw: rawNorm(readFileSync(f, "utf8")),
}));

// ---------------------------------------------------------------- trace
const seen = new Set();
const candidates = [];
for (const src of SOURCES) {
  for (const c of extract(src)) {
    const key = c.text.toLowerCase();
    if (seen.has(key)) continue;        // same string approved in two places is one string
    seen.add(key);
    candidates.push(c);
  }
}

const hitsFor = (text) => {
  if (PLACEHOLDER.test(text)) {
    const re = toRegex(text);
    return routes.filter((r) => re.test(r.text) || re.test(r.raw));
  }
  return routes.filter((r) => r.text.includes(text) || r.raw.includes(text));
};

const results = candidates.map((c) => {
  const hits = hitsFor(c.text);
  if (hits.length) return { ...c, count: hits.length, routes: hits.map((h) => h.route), partial: false };
  // not found whole — is it a joined pair of slot labels whose parts both render?
  const parts = partsOf(c.text);
  if (parts.length > 1) {
    const each = parts.map((p) => ({ p, n: hitsFor(p).length }));
    if (each.every((e) => e.n > 0)) {
      return { ...c, count: Math.min(...each.map((e) => e.n)), routes: [], partial: true,
               detail: each.map((e) => `"${e.p}" ×${e.n}`).join(" + ") };
    }
  }
  return { ...c, count: 0, routes: [], partial: false };
});

const present = results.filter((r) => r.count > 0 && !r.partial);
const partial = results.filter((r) => r.partial);
const absent  = results.filter((r) => r.count === 0 && !r.exempt);
const exempt  = results.filter((r) => r.count === 0 && r.exempt);

console.log("## Gate 6 — copy trace\n");
console.log(`Sources      : ${SOURCES.map((s) => relative(ROOT, s)).join(", ")}`);
console.log(`Routes       : ${routes.length}`);
console.log(`Approved strings extracted: ${results.length}`);
console.log(`  present : ${present.length}`);
console.log(`  partial : ${partial.length}  (joined slot labels — every part renders, the joined form does not)`);
console.log(`  absent  : ${absent.length}`);
console.log(`  exempt  : ${exempt.length}  (canon says they do not ship, or their route is gated)\n`);

if (partial.length) {
  console.log("### Partial — slot labels that render as separate elements");
  for (const r of partial) {
    console.log(`  ${r.src}  [${r.heading}]`);
    console.log(`     "${r.text}"  ->  ${r.detail}`);
  }
  console.log();
}

if (VERBOSE) {
  console.log("### Present");
  for (const r of present.sort((a, b) => b.count - a.count)) {
    console.log(`  ${String(r.count).padStart(3)} route(s)  ${r.text.slice(0, 88)}${r.text.length > 88 ? "…" : ""}`);
  }
  console.log();
}

if (exempt.length) {
  console.log("### Exempt — absent, and expected to be");
  for (const r of exempt) {
    console.log(`  ${r.src}  [${r.heading}]`);
    console.log(`     "${r.text.slice(0, 96)}${r.text.length > 96 ? "…" : ""}"`);
    console.log(`     reason: ${r.exempt}`);
  }
  console.log();
}

console.log("### Absent — approved copy not found in the build");
if (!absent.length) console.log("  none\n");
for (const r of absent) {
  console.log(`  ${r.src}  [${r.heading}]`);
  console.log(`     "${r.text.slice(0, 110)}${r.text.length > 110 ? "…" : ""}"`);
}

console.log(`\nGATE 6: ${absent.length === 0 ? "PASS" : "FAIL"} — ${absent.length} approved string(s) absent from the build`);
process.exit(absent.length === 0 ? 0 : 1);
