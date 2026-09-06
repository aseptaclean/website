// COPY FIDELITY — rewritten 2026-09-04 against docs/20-COPY-MAP.md and docs/page-briefs/.
//
// The previous version compared each built page to its whole source section line by line, in
// order, with no allowance for the documented placement map. It therefore failed on every page
// for things the map explicitly requires: the Extreme Cleaning rename, the suppressed insurance
// claim, the banned "gross filth" clause, the CTA display map, and the homepage's explicit
// editorial omissions. Its output could not distinguish a real omission from a required one.
//
// docs/20-COPY-MAP.md "Copy trace": "A stale copy validator should be updated to reflect this
// documented map; do not disable it or report its old failures as a pass." So this checks the
// three things the map actually asserts:
//
//   1. PLACEMENT   — every source block each page brief names is present on that page.
//   2. TRANSFORMS  — the display transformations are applied, everywhere.
//   3. OMISSIONS   — the homepage's listed omissions are genuinely absent from the homepage
//                    (and still present in the source file, which is never edited).
import { readFile } from "node:fs/promises";

const decode = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const textOf = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]*>/g, " ")
  )
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const norm = (value) =>
  value.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();

// 1. PLACEMENT — source headings each brief assigns to each route.
const PLACEMENT = {
  "/": [
    "dist/index.html",
    [
      "When a property needs more than a normal cleaning company.",
      "What are you dealing with?",
      "Some properties need",
      "more than cleaning.",
      "You should know what you are paying us to solve.",
      "How it starts",
      "Built around careful work.",
      "Frequently asked questions",
      "You do not need to know exactly what kind of cleanup you need."
    ]
  ],
  "/services/": [
    "dist/services/index.html",
    [
      "What can we help with?",
      "Not sure which category your property falls into?",
      "We do not force every property into the same service.",
      "How it works",
      "What Aseptaclean is not",
      "Which service should I choose?",
      "Start with what you see."
    ]
  ],
  "/hoarding-cleanup-san-jose/": [
    "dist/hoarding-cleanup-san-jose/index.html",
    [
      "Start where things are now.",
      "More than clearing things out",
      "A clear plan before the work begins",
      "We understand that important things can be mixed into the clutter.",
      "Sometimes the cleanup goes beyond clutter.",
      "Why Aseptaclean approaches these properties differently",
      "Are you going to judge the condition of the house?",
      "Are you going to throw everything away?",
      "Is the situation too bad?",
      "What does hoarding cleanup cost?",
      "You do not have to solve the whole property today."
    ]
  ],
  "/extreme-cleaning-san-jose/": [
    "dist/extreme-cleaning-san-jose/index.html",
    [
      "You can show us the property exactly as it is.",
      "This is not always a cleaning problem.",
      "What looks like one problem may actually be several.",
      "Our job is to make the situation manageable.",
      "We do not want to make the property look better while leaving the real problem behind.",
      "You should know what you are agreeing to.",
      "Why Aseptaclean",
      "Is this too bad for you?",
      "Do I need to clean first?",
      "Will you judge how the property got this way?",
      "Can I just send photos?",
      "You do not need to know what to call the problem."
    ]
  ],
  "/deep-cleaning-san-jose/": [
    "dist/deep-cleaning-san-jose/index.html",
    [
      "A deep clean should not mean the same thing in every home.",
      "We clean based on what the home actually needs.",
      'What does "detailed" actually mean?',
      // The three named room lists, restored verbatim 2026-09-04.
      "Kitchens",
      "Counters and backsplashes",
      "Bathrooms",
      "Showers and tubs",
      "Living areas and bedrooms",
      "Horizontal surfaces",
      "We look for the areas",
      "that make the biggest difference.",
      "Not every mark should be attacked the same way.",
      "How we approach a detailed deep clean",
      "Some work takes significantly more time.",
      "Move-in cleaning",
      "Move-out cleaning",
      "Why Aseptaclean",
      "Why not hire a normal house cleaner?",
      "Do I need to know exactly what I want cleaned?",
      "Do you clean everything in the house?",
      "Can you remove every stain or mark?",
      "What does detailed deep cleaning cost?",
      "Not sure whether you need detailed deep cleaning?"
    ]
  ],
  "/rodent-dropping-cleanup-san-jose/": [
    "dist/rodent-dropping-cleanup-san-jose/index.html",
    [
      "Found rodent droppings?",
      "Don't sweep or vacuum them first.",
      "Pest control handles the rodents.",
      "Seeing a few droppings does not always tell you the whole story.",
      "What we look at during an assessment",
      "How Aseptaclean approaches rodent cleanup",
      "Not every rodent cleanup is the same.",
      "Rodent contamination can affect more than floors.",
      "Why Aseptaclean",
      "What Aseptaclean does",
      "The pest-control company already cleaned some of it. Do I still need you?",
      "I only found a few droppings. Is this overkill?",
      "What if there are droppings inside cabinets?",
      "What if the rodents are still there?",
      "Can you tell me the price from photos?",
      "Start with photos."
    ]
  ],
  "/crime-scene-trauma-cleanup-san-jose/": [
    "dist/crime-scene-trauma-cleanup-san-jose/index.html",
    [
      "Professional cleanup after a traumatic event.",
      "Crime Scene & Trauma Cleanup Services",
      "After the scene is released, the cleanup becomes the property owner's responsibility.",
      "Why professional trauma cleanup is different",
      "What Aseptaclean does",
      "How the process works",
      "Discreet and",
      "private service.",
      "Personal belongings are handled with care.",
      "Regulated biohazard waste",
      "Why Aseptaclean",
      "Does insurance cover crime scene or trauma cleanup?",
      "How much does trauma cleanup cost?",
      "When can cleanup begin?",
      "Do I need to clean anything before you arrive?",
      "Do I have to send photos?",
      "Do I have to be at the property?",
      "What happens to affected belongings?",
      "Do you handle the biohazard waste?",
      "Can you work with my insurance company?",
      "You do not have to know what to do next."
    ]
  ]
};

// 2. TRANSFORMS — must hold on every public page.
const BANNED_EVERYWHERE = [
  ["Severe Property Cleanup", "display rename to Extreme Cleaning was not applied"],
  ["severe property cleanup", "display rename to Extreme Cleaning was not applied"],
  ["gross filth", "AGENTS.md §7 bans this phrase anywhere"],
  ["Request an Assessment", "superseded marketing CTA — secondary is now Send a Message"]
];

// 3. OMISSIONS — homepage sections docs/20-COPY-MAP.md explicitly does not render on `/`.
const HOMEPAGE_OMISSIONS = [
  "Show us the condition first.",
  "We do not pretend every problem belongs to us.",
  "Real trust starts with clear expectations.",
  "Who calls Aseptaclean?",
  "What affects the cost?"
];

const failures = [];
const notes = [];

for (const [route, [file, blocks]] of Object.entries(PLACEMENT)) {
  const text = textOf(await readFile(file, "utf8"));
  const missing = blocks.filter((block) => !text.includes(norm(block)));
  if (missing.length) {
    failures.push(`${route}: ${missing.length} mapped source block(s) missing`);
    missing.forEach((block) => failures.push(`    - ${block}`));
  } else {
    notes.push(`PASS ${route} — all ${blocks.length} mapped source blocks present`);
  }

  for (const [phrase, why] of BANNED_EVERYWHERE) {
    if (text.includes(phrase)) failures.push(`${route}: contains "${phrase}" — ${why}`);
  }
}

const homepageText = textOf(await readFile("dist/index.html", "utf8"));
const leaked = HOMEPAGE_OMISSIONS.filter((section) => homepageText.includes(norm(section)));
if (leaked.length) {
  failures.push(`/: ${leaked.length} explicitly omitted section(s) rendered on the homepage`);
  leaked.forEach((section) => failures.push(`    - ${section}`));
} else {
  notes.push(`PASS / — all ${HOMEPAGE_OMISSIONS.length} explicit homepage omissions absent`);
}

// The source documents are never edited. Confirm the omitted text still exists in the source.
const source = await readFile("docs/aseptaclean-all-website-copy.md", "utf8");
const lostFromSource = HOMEPAGE_OMISSIONS.filter((section) => !source.includes(section));
if (lostFromSource.length) {
  failures.push(`source document was edited — missing: ${lostFromSource.join(", ")}`);
} else {
  notes.push("PASS source copy document still contains every omitted section verbatim");
}

notes.forEach((note) => console.log(note));
if (failures.length) {
  console.error(`\nFAILED — ${failures.length} copy-fidelity finding(s)`);
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}
console.log("\nPASS — placement, display transformations, and explicit omissions all hold");
