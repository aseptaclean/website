---
name: route-audit
description: Audits Aseptaclean route output, redirects, sitemap membership, internal links, and indexation against a fresh production build and the approved authority hierarchy. Use this skill whenever routes, redirects, sitemap files, navigation, crawl paths, or indexation change, or before DNS cutover. A build is evidence of current technical behavior; it does not override owner decisions, claims law, the active website master, or route publication gates.
---

# Route audit

**Owner-reconciled snapshot, 2026-08-25:** the documented current state is 46 built routes,
24 indexable routes, 23 routes in `sitemap.xml`, one indexable route deliberately absent from
the sitemap, 22 `noindex` routes, and nine city routes held at `noindex`. Re-derive these
figures from a fresh production build whenever a route-affecting change is authorized; do not
reuse this snapshot as proof after such a change.

The examples below are historical failure modes, not assertions that the same defects remain.

## The four failure modes

### 1. A redirect source that is now a real route

At one point pages were rebuilt under names that the redirect file still retired;
`/estate-cleanout-san-jose/` and `/hoarding-cleanup-san-jose/` were both redirect sources and
built pages. That incident established the collision check below.

A prior audit checked that every redirect *destination* resolves. Nobody checked whether a
*source* collides with a route created later. That is the check.

**Cloudflare Pages precedence between `_redirects` and static assets decides the outcome, and
it must be observed, not reasoned about.** Deploy to a preview and `curl -I` the URL. If the
redirect wins, a finished page is unreachable and every internal link to it is dead. If the
asset wins, the rule is harmless but still misleading and should go.

### 2. An indexable page linking into a noindex draft

The repository has previously linked indexable hubs into gated `noindex` routes. Treat every
such crawl path as an explicit finding and compare it with the route's publication gate.

That is a crawl path from an indexed hub into unfinished content, and a user path from the
main navigation into pages that may display `[OWNER INPUT: …]` on screen. Check whether those
strings render as visible text or sit in unconsumed data — one is embarrassing, the other is
harmless, and the distinction determines urgency.

### 3. An orphan that redirects point into

The service-area hub has previously been an orphan while redirects pointed into it. The
current documented state is indexable and sitemap-listed; verify rather than assuming either.

### 4. A route no document records

Built routes have previously been absent from all route documentation. Compare the build with
both `docs/19-SYSTEM-AND-SITEMAP.md` and `docs/SITEMAP-MASTER.md`.

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

**5. Reconcile against both route authorities.** Report routes in the build but not the
documents, and planned routes not in the build. Correct stale descriptions of current output;
do not use existing code to override higher-ranked route strategy or publication gates.

**6. Check the never-build list.** No route, draft, stub, sitemap entry, or nav link may exist
for: `/biohazard-cleanup*`, `/blood-cleanup/`, `/unattended-death-cleanup/`,
`/crime-scene-cleanup/`, `/human-waste-cleanup/`, `/sharps-cleanup/`, `/encampment-cleanup/`,
`/vehicle-biohazard-cleanup/`, any `/locations/*` path, any project-detail route without real
permissioned proof, garage-cleanout,
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

**Do not add a route to the sitemap because it exists.** Publication and indexation are gated
per route. Exclusion is not an oversight merely because a page builds.
