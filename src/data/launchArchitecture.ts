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

// The twelve public pages of docs/SITEMAP-MASTER.md. /request-assessment/ was retired outright
// 2026-09-06 by explicit owner decision — it previously stayed here as a working, indexable
// utility route after losing the primary-CTA/nav slot (AGENTS.md §2.2.6, now superseded on this
// point). See docs/05-CURRENT-DECISIONS.md, 2026-09-06, "Standalone Request Assessment page
// retired." The route file no longer exists, so a real not-found response is unconditional here
// — it does not depend on this array.
export const launchPrimaryPaths = [
  "/",
  "/services/",
  "/about/",
  "/contact/",
  ...launchServiceLinks.map((link) => link.href),
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
] as const;

// ---------------------------------------------------------------------------
// INDEXATION
// ---------------------------------------------------------------------------
// Owner-requested SEO update, 2026-09-15: include the rodent service page and
// both assessment landing pages. This supersedes their earlier noindex decisions
// for search visibility only; it does not certify operational requirements.
// See docs/05-CURRENT-DECISIONS.md.
export const launchIndexableExceptions = {} as const;

// Campaign pages may be indexed without joining the main navigation.
// /rodent-dropping-cleanup-san-jose/assessment/ joined 2026-09-17, on the same basis as the
// other two (owner decision; see docs/05-CURRENT-DECISIONS.md, 2026-09-17). It postdates the
// 2026-09-15 decision above — it did not exist yet on that date.
export const launchLandingPaths = [
  "/estate-cleanout-san-jose/assessment/",
  "/hoarding-cleanup-san-jose/assessment/",
  "/rodent-dropping-cleanup-san-jose/assessment/"
] as const;

export const launchIndexablePaths = new Set<string>(
  [...launchPrimaryPaths, ...launchLandingPaths].filter(
    (path) => !(path in launchIndexableExceptions)
  )
);

export const normalizeLaunchPath = (value: string) => {
  const path = value.split(/[?#]/, 1)[0] || "/";
  return path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
};

export const isLaunchPublicPath = (value: string) =>
  launchIndexablePaths.has(normalizeLaunchPath(value));
