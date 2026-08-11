---
name: route-audit
description: Audits Aseptaclean's route architecture for the four failure modes that have already occurred in this repo — a _redirects source colliding with a route that now exists, an indexable page linking into a noindex draft, an orphaned route that redirects point into but nothing links to, and a built route no document records. Use this skill whenever you add, rename, or remove a page under src/pages; whenever you edit public/_redirects, src/pages/sitemap.xml.ts, Footer.astro, Header.astro, or the nav data in src/data/site.ts; and whenever asked to check routes, redirects, the sitemap, internal linking, crawl paths, noindex status, or what pages exist. Also run it before any DNS cutover. Route wiring in this repo has drifted ahead of every document that describes it, so assume the docs are wrong and the code is truth.
---

# Route audit

This repo has 27 route files, a 9-route sitemap allowlist, a 32-rule redirect file, and three
documents describing three different architectures. The code is ahead of all of them. Every
finding below has actually happened here at least once.

## The four failure modes

### 1. A redirect source that is now a real route

`public/_redirects` was written during a route collapse. Pages were later rebuilt under names
the redirect file still retires. Currently `/estate-cleanout-san-jose/` and
`/hoarding-cleanup-san-jose/` are **both** 301'd to `/` at lines 21 and 24 **and** exist as
built pages linked from `/services/`.

A prior audit checked that every redirect *destination* resolves. Nobody checked whether a
*source* collides with a route created later. That is the check.

**Cloudflare Pages precedence between `_redirects` and static assets decides the outcome, and
it must be observed, not reasoned about.** Deploy to a preview and `curl -I` the URL. If the
redirect wins, a finished page is unreachable and every internal link to it is dead. If the
asset wins, the rule is harmless but still misleading and should go.

### 2. An indexable page linking into a noindex draft

`/services/` and `/who-we-help/` are indexable and in the sitemap. They link to eight `noindex`
drafts, and `servicePages.ts` carries eleven `[OWNER INPUT: …]` strings across them.

That is a crawl path from an indexed hub into unfinished content, and a user path from the
main navigation into pages that may display `[OWNER INPUT: …]` on screen. Check whether those
strings render as visible text or sit in unconsumed data — one is embarrassing, the other is
harmless, and the distinction determines urgency.

### 3. An orphan that redirects point into

`/service-areas/` is `noindex`, excluded from the sitemap, and has zero internal links
anywhere in `src/` — while seven `_redirects` rules funnel old city URLs into it. Anyone
following an old link lands on a noindex page nothing else references.

### 4. A route no document records

`/services/` and `/who-we-help/` appear in no version of the sitemap documentation, despite
being in the nav, the footer, and the sitemap allowlist. `19-SYSTEM-AND-SITEMAP.md` is the
architecture authority and does not know they exist.

## Procedure

**1. Enumerate reality first.** Build the table from the filesystem, not from a document.
For every file under `src/pages/`: the URL it produces, its own `noindex` prop, whether it is
in `sitemap.xml.ts`'s allowlist, and every place in `src/` that links to it.

Note the global gate while you are here: `SeoHead.astro` forces `noindex` on every page unless
`PUBLIC_DEPLOYMENT_ENV === "production"`, regardless of the page's own prop. A page-level
`noindex={false}` does not mean indexed. `sms-notification-consent.astro` bypasses this
entirely with a hardcoded `<meta name="robots" content="index,follow">` — that is deliberate
and **that page must never be edited**; it is under Twilio 10DLC carrier review.

**2. Cross-check `_redirects` in both directions.** Every destination resolves to a real
route — and every *source* is checked against the route list for a collision. Also check for
chains: no destination may be another rule's source.

**3. Trace crawl paths.** For every indexable route, follow its outbound links. Any link from
an indexable page to a `noindex` page is a finding. Report the target's placeholder count.

**4. Find orphans in both directions.** Routes with zero inbound internal links. Routes that
redirects point at but nothing links to. Components in `src/components/` that no page imports —
currently `CategoryContrast.astro`, `OutcomeComparison.astro`, and `Qualification.astro`.

**5. Reconcile against `19-SYSTEM-AND-SITEMAP.md` Part 2.** Report routes in the code but not
the doc, and routes in the doc but not the code. The doc is corrected to match the code, never
the reverse — but a route that exists and should not is a separate and more serious finding.

**6. Check the never-build list.** No route, draft, stub, sitemap entry, or nav link may exist
for: `/biohazard-cleanup*`, `/blood-cleanup/`, `/unattended-death-cleanup/`,
`/crime-scene-cleanup/`, `/human-waste-cleanup/`, `/sharps-cleanup/`, `/encampment-cleanup/`,
`/vehicle-biohazard-cleanup/`, any `/locations/*` or `/projects/*` path, garage-cleanout,
basement-cleanout, furniture-removal, mattress-disposal, or a reviews page. These are gated by
owner decision and, for the biohazard set, by statute — see
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §5.

## Report format

```
## Route audit

### Redirect collisions
<source> — <status> — <route exists? y/n> — <observed behavior on preview>

### Indexable → noindex crawl paths
<from> → <to> — <to's placeholder count> — <recommendation>

### Orphans
Routes with no inbound links: <list>
Redirect targets with no inbound links: <list>
Unimported components: <list>

### Doc reconciliation
In code, not in doc 19: <list>
In doc 19, not in code: <list>

### Never-build check
<clean, or every violation>
```

## Two things to resist

**Do not remove a redirect because the destination looks wrong.** Several rules deliberately
point at `/` as an interim hop while a Phase 3 draft is gated. They are meant to be updated
individually as each gate clears, never bulk-flipped.

**Do not add a route to the sitemap because it exists.** Eighteen of twenty-seven routes are
excluded on purpose. The allowlist is a decision, not an oversight.
