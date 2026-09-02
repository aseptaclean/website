// PUBLICATION STATE — one ladder, three rungs, read by the route generators, the sitemap, and
// scripts/city-seo-guards.mjs.
//
// Before 2026-08-21 there were two states (`draft-noindex` | `published-index`) and the middle
// rung did double duty: a page that was finished but gated and a page that was not finished yet
// both carried the same value, so "not ready to be read" and "not ready to be indexed" were
// indistinguishable in the data. They are different decisions with different failure modes — the
// first must not be reachable at all, the second must be reachable and crawlable but withheld
// from the index — so they are now different values.
//
//   draft            Not built. No route, no HTML, no sitemap entry, and no link may point at it.
//                    Use while copy is unfinished or unapproved: the page does not exist yet.
//   noindex          Built and reachable. Renders `noindex, follow` and stays out of sitemap.xml.
//                    Use for a finished page held behind a gate (owner confirmation, licensing,
//                    compliance release). `follow` is deliberate — see SeoHead.astro.
//   published-index  Built, `index, follow`, listed in sitemap.xml. The only state that ranks.
//
// The ladder is one-directional in effort and reversible in fact: moving up requires the guard
// run in scripts/city-seo-guards.mjs to pass for that page; moving down is always safe.
export type PublishStatus = "draft" | "noindex" | "published-index";

/** Does the route generator emit HTML for this record at all? `draft` records are not built. */
export const isBuilt = (status: PublishStatus) => status !== "draft";

/**
 * Does this page render `index, follow`? Note that SeoHead additionally forces `noindex` on every
 * non-production deployment, so this is the page's *intent*, not a promise about a given build.
 */
export const isIndexable = (status: PublishStatus) => status === "published-index";

/**
 * Does this page belong in sitemap.xml? Identical to `isIndexable` by design and kept as its own
 * name because the two questions have drifted apart before: a noindex route listed in the sitemap
 * is a Search Console error, and an indexable route missing from it is a discovery failure. Both
 * are asserted against the built output by scripts/city-seo-guards.mjs.
 */
export const isInSitemap = (status: PublishStatus) => status === "published-index";

/** Records that produce a route, in declaration order. */
export const builtOnly = <T extends { publishStatus: PublishStatus }>(records: readonly T[]) =>
  records.filter((record) => isBuilt(record.publishStatus));

/** Records that may be listed in sitemap.xml. */
export const indexableOnly = <T extends { publishStatus: PublishStatus }>(
  records: readonly T[]
) => records.filter((record) => isInSitemap(record.publishStatus));
