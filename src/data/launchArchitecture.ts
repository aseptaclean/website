// PUBLIC SERVICE ORDER — docs/SITEMAP-MASTER.md "Navigation", 2026-09-04. That file sets the
// dropdown/footer/grid order explicitly, and docs/20-COPY-MAP.md restates it: "Public service
// order follows SITEMAP-MASTER.md." This replaces the earlier crime-scene-first ordering.
//
// "Severe Property Cleanup" → "Extreme Cleaning" is a DISPLAY LABEL ONLY (docs/20-COPY-MAP.md
// "Explicit display transformations"). The href is untouched: the canonical route stays
// /extreme-cleaning-san-jose/, and every existing link, redirect, canonical and internal enum
// pointing at it keeps working. The source content for that page is still the copy document's
// "Severe Property Cleanup" section — the service was renamed, not rewritten.
export const launchServiceLinks = [
  { label: "Hoarding Cleanup", navLabel: "Hoarding Cleanup", href: "/hoarding-cleanup-san-jose/" },
  { label: "Extreme Cleaning", navLabel: "Extreme Cleaning", href: "/extreme-cleaning-san-jose/" },
  {
    label: "Detailed Deep Cleaning",
    navLabel: "Detailed Deep Cleaning",
    href: "/deep-cleaning-san-jose/"
  },
  {
    label: "Crime Scene & Trauma Cleanup",
    navLabel: "Crime Scene & Trauma",
    href: "/crime-scene-trauma-cleanup-san-jose/"
  },
  {
    label: "Rodent Droppings & Animal Waste Cleanup",
    navLabel: "Rodent & Animal Waste",
    href: "/rodent-dropping-cleanup-san-jose/"
  }
] as const;

// docs/SITEMAP-MASTER.md "Navigation": Services / About / Contact, with Services carrying its own
// dropdown toggle. The five service links do not join this list.
export const launchPrimaryNavLinks = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" }
] as const;

// The twelve public pages of docs/SITEMAP-MASTER.md, plus /request-assessment/, which stays a
// working, indexable form destination after being removed as the primary CTA and from primary
// navigation (AGENTS.md §2.2.6).
export const launchPrimaryPaths = [
  "/",
  "/services/",
  "/about/",
  "/contact/",
  ...launchServiceLinks.map((link) => link.href),
  "/request-assessment/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
] as const;

// ---------------------------------------------------------------------------
// INDEXATION
// ---------------------------------------------------------------------------
//
// /rodent-dropping-cleanup-san-jose/ is in the twelve-page DESIGN scope and is fully built, but
// its indexation is held by an unresolved operational dependency, not by a stale note. The
// evidence, re-checked 2026-09-04 against the archived record:
//
//   - The 2026-08-09 owner override that would have ungated animal-waste / rodent / pigeon was
//     itself SUPERSEDED on 2026-08-16, when the owner "chose the gated path over
//     SITEMAP-MASTER's ungated column" for those three routes.
//   - The gate is the specialty-page compliance release, whose six inputs are: written insurance
//     confirmation for the specific service and terminology; confirmation of pest-control /
//     cleanup licensing boundaries; confirmed waste-handling and disposal procedure; confirmed
//     equipment, PPE, work-zone and access limitations; final claims review; and confirmation
//     that public language matches actual training and field capacity.
//     (docs/archive/2026-09-04-before-consolidation/27-COPY-CANONICAL.md §21.)
//   - None of the six is recorded anywhere as cleared.
//
// docs/SITEMAP-MASTER.md is explicit about how to handle exactly this: "An obsolete 'TSW pending'
// note is not current proof, but an unresolved actual operational requirement also cannot be
// marked cleared by a design task. Record the specific remaining factual dependency and complete
// the rest of the page." So the page ships complete and `noindex, follow` — an ordinary
// crawlable-but-unindexed state. It keeps its nav, footer and grid links.
//
// This is NOT an operational-availability statement: AGENTS.md §2.1 separates operational
// availability, TSWMP scope, and SEO/indexation state, and rodent work is not TSWMP-gated.
//
// TO CLEAR: record the six inputs as satisfied in docs/02-CURRENT-FACTS.md, then delete the
// filter below. Do not delete it as part of a styling or layout change.
export const launchIndexableExceptions = {
  "/rodent-dropping-cleanup-san-jose/":
    "Specialty-page compliance release: six operational inputs (insurance wording, licensing " +
    "boundaries, disposal procedure, PPE/work-zone limits, final claims review, training/field " +
    "capacity) are unresolved. Owner decision 2026-08-16 chose the gated path. See " +
    "docs/02-CURRENT-FACTS.md."
} as const;

export const launchIndexablePaths = new Set<string>(
  launchPrimaryPaths.filter((path) => !(path in launchIndexableExceptions))
);

export const normalizeLaunchPath = (value: string) => {
  const path = value.split(/[?#]/, 1)[0] || "/";
  return path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
};

export const isLaunchPublicPath = (value: string) =>
  launchIndexablePaths.has(normalizeLaunchPath(value));
