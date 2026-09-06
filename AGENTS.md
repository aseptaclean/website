# AGENTS.md — Aseptaclean repository operating rules

**Version:** 2026-09-04b — documentation consolidation installed. Replaces
`docs/AGENTS-PRECEDENCE-BLOCK.md` in full.
**Website work starts at `START-HERE.md`, then `docs/README.md`.** The 2026-09-04 owner package
consolidated the website documentation into scoped sources. `docs/README.md` is now the index
for website design, copy, placement, facts, integrations, assets, and release verification.
**Current owner decisions:** §2.2 below. Read it before §3, §4, or any website work — it is the
newest rank-2 authority in this file and it moves the primary CTA, the secondary CTA, the public
name of one service, the form submit label, the hero-form scope, and the visual direction.
**Why this file exists:** an alignment audit on 2026-08-11 found five competing precedence
chains in `docs/`, three of them pointing at files that do not exist, and a standing rule that
forbade the only working lead endpoint in the repository. This file is the single operative
chain. If any other document disagrees with this one, this one wins and the conflict goes in
`docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`.

---

## 0. Read this before touching anything

Three rules have caused, or nearly caused, production damage. They are absolute.

### 0.1 The lead endpoint

**`functions/api/lead.ts` is the only lead endpoint. It is correct. Do not touch it.**

- Do **not** create `src/pages/api/lead.ts`. It has never existed.
- Do **not** install `@astrojs/cloudflare`. The adapter emits `_worker.js`, which causes
  Cloudflare Pages to ignore `functions/` entirely and silently kills lead delivery.
- The public URL contract is `/api/lead`, **singular**. That is preserved by Pages routing,
  not by Astro.
- Deploy target is **Cloudflare Pages**. `output: "static"` plus a `functions/` directory.

`functions/api/lead.ts` is the **single canonical endpoint**. There is no second one, no
planned one, and no unimplemented one.

The previous version of this file said the opposite. If you find a document that still says
"one endpoint: `src/pages/api/lead.ts`," it is wrong — flag it, do not act on it.

**Two stale spellings, both corrected 2026-08-19.** `docs/27-COPY-CANONICAL.md` §18 named
`/api/leads` (plural) and called it an unimplemented release blocker; that section is
reconciled and the blocker struck. `PORT-PROMPT.md` §4 already recorded the correction.
Any remaining `/api/leads` in the document set is stale by definition — the plural route has
never existed.

### 0.2 Claims

`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` governs every public-facing word on this site,
including titles, meta descriptions, alt text, JSON-LD, form copy, and third-party profiles.
It outranks every design, copy, and composition document. Read it before writing copy.

Historically this pointer went to `04-CLAIMS-GUARDRAILS.md`, which does not exist. Doc 21 is
that file, written.

### 0.3 Never invent

No fabricated review, rating, testimonial, project count, case study, client logo, statistic,
badge, before/after image, or credential. No AI-generated people, properties, documents, or
crews. If a proof slot has no real asset, **the slot ships empty**. Empty beats fake, always.

---

## 1. Precedence chain

Conflicts resolve **up** this list. Never silently merge contradictory instructions; record
every material resolution in `docs/05-CURRENT-DECISIONS.md`.

| # | Authority | Governs |
| --- | --- | --- |
| 1 | Verified business, legal, licensing, insurance, and scope facts | What is true and permitted now |
| 2 | Explicit current owner decisions, including §2.2 below (2026-09-04) and the 2026-08-25 documentation reconciliation ruling in `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md` | Current business and website direction |
| 3 | `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` | Public claims and regulated-service boundaries |
| 4 | The two owner-supplied copy sources — `docs/aseptaclean-all-website-copy.md` and `docs/aseptaclean-crime-scene-trauma-cleanup.md` — as placed by `docs/20-COPY-MAP.md` | Exact public wording not superseded by a rank 1–3 authority |
| 5 | `docs/30-WEBSITE-MASTER-SPEC.md` — **the single governing website design document** | Layout, composition, responsive behavior, geometry, and the ClearPath/911 visual direction |
| 6 | Scoped specifications named in `docs/README.md`, plus the twelve `docs/page-briefs/` | Their named scope where consistent with ranks 1–5 |
| 7 | Current source plus a fresh production `dist/` build | Evidence of current technical state, not permission to override approved strategy |
| 8 | AI, developer, or tool preference | Implementation discretion only where higher authorities are silent |

**Do not assign every concern to one hierarchy.** `docs/README.md` §"Scoped sources of truth"
routes each question to its own controlling file: layout → doc 30 plus
`docs/styles/website-reference.css`; wording and placement → the two copy sources plus
`docs/20-COPY-MAP.md`; verified business facts → `docs/02-CURRENT-FACTS.md` and
`src/data/site.ts`; forms, calls, policies and consent → `docs/03-INTEGRATION-CONTRACT.md`;
imagery → `docs/06-ASSET-MANIFEST.md`; route scope → `docs/SITEMAP-MASTER.md`; verification →
`docs/04-RELEASE-CHECKLIST.md`. A layout instruction cannot create an insurance fact, and a
copy file cannot reinstate a retired design benchmark.

Within rank 6, use each file only for its stated specialty: `docs/SITEMAP-MASTER.md` for the
twelve-page scope, navigation and route preservation; `docs/19-SYSTEM-AND-SITEMAP.md` and
`docs/25CITYPAGESPEC.md` for city-page planning and quality **outside** the twelve-page
redesign; `docs/20-COPY-VOICE.md` for new connective copy voice;
`docs/01-QUALITY-GUARDRAILS.md` for execution quality; `docs/04-RELEASE-CHECKLIST.md` for
release gates; and `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` for that route only.

### 1.1 The consolidated website documentation — installed 2026-09-04

```
ENTRY POINT   START-HERE.md  →  docs/README.md
DESIGN        docs/30-WEBSITE-MASTER-SPEC.md  +  docs/styles/website-reference.css
COPY          docs/aseptaclean-all-website-copy.md
              docs/aseptaclean-crime-scene-trauma-cleanup.md
PLACEMENT     docs/20-COPY-MAP.md  +  docs/page-briefs/  (twelve briefs)
FACTS         docs/02-CURRENT-FACTS.md
INTEGRATIONS  docs/03-INTEGRATION-CONTRACT.md
SCOPE/ROUTES  docs/SITEMAP-MASTER.md
ASSETS        docs/06-ASSET-MANIFEST.md
VERIFICATION  docs/04-RELEASE-CHECKLIST.md
HISTORY       docs/05-CURRENT-DECISIONS.md
```

There is **one** governing website design document, and it is doc 30. Do not create a second
one. A page that needs work gets its brief in `docs/page-briefs/`, a data or copy change, or a
working prompt — not another competing website-standard MD.

`docs/styles/website-reference.css` holds the numerical implementation targets for doc 30. It is
a reference to map into the existing token/component system, **not a second global stylesheet**.
Do not load it alongside `src/styles/global.css`, and do not duplicate its token names.

### 1.2 Retired website authorities — do not build from them

**Superseded 2026-09-04 by the owner documentation consolidation.** Originals are preserved
byte-for-byte under `docs/archive/2026-09-04-before-consolidation/`, and the two BUILD-EXACT
specs under `docs/archive/2026-09-04-retired-build-specs/`.

```
02-OWNER-INPUTS.md                                superseded by docs/02-CURRENT-FACTS.md
05-DECISIONS-LOG.md                               superseded by docs/05-CURRENT-DECISIONS.md
27-COPY-CANONICAL.md                              superseded by the two copy sources + 20-COPY-MAP
30-WEBSITE-MASTER-SPEC-CHANGELOG.md               history of the retired master
ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF.md       Interdoor-first brief
ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF-SEVENSON.md   Sevenson-led brief
ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md   V3 lean-Sevenson brief
ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md        service-page content, retired as authority
aseptaclean-website-design-system.md              the 45/30/25 split, retired
aseptaclean-BUILD-EXACT-v2 / v3                   retired standalone build specs
```

Each of the three homepage briefs self-declares "canonical" or "governing"; none is. **The
homepage architecture is `docs/page-briefs/HOME.md` under doc 30 §5.** Sevenson and Interdoor
are no longer design benchmarks; the direction is 70% ClearPath / 30% 911 Bio Clean per
doc 30 §1.

**Do not read `docs/archive/` during ordinary implementation** and do not include it in active
instruction globs. Some `src/` comments still cite retired paths as the historical reason a
shipped decision was made; that is traceability, not authority. Where such a comment states a
rule the consolidation reversed, correct the comment.

### 2.2 Current owner decisions — 2026-09-04

Rank 2. These supersede every lower-ranked statement of the same fact, including statements
made earlier in this file. Source: the owner documentation consolidation installed 2026-09-04
(`START-HERE.md`, `docs/README.md`, `docs/05-CURRENT-DECISIONS.md`).

**1. Visual direction — 70% ClearPath / 30% 911 Bio Clean.**
Reference: `docs/reference/clearpath-911-visual-reference.pdf` (34 screenshot pages; pages 1–22
are 911 Bio Clean, 23–34 are ClearPath). Doc 30 §1 maps each element to its reference page. The
reference is **visual evidence, not a copy or claims source** — see §2.2.7. This supersedes the
Sevenson-primary / Interdoor-secondary direction and the retired 45/30/25 split. There is no
third percentage: Aseptaclean's navy, logo, typography and source copy apply throughout.

**2. Primary marketing CTA — `Call Aseptaclean`. Secondary — `Send a Message`.**
Supersedes `Tell Us About the Property` (2026-08-25) *and* `Request an Assessment` as the
default visible actions. The secondary action scrolls/focuses the local form on pages that have
one, and links to `/contact/#contact-form` elsewhere. The phone is `(408) 785-7588` /
`tel:+14087857588`, rendered from `src/data/site.ts` only. **Verified against the repository:
`src/data/site.ts` and `.env.production` already carry exactly this number.**

The word *assessment* may still appear in explanatory prose about how work is scoped. Do not
globally replace it: headings, consent text, API names, enum values and provider content have
distinct meanings. See `docs/20-COPY-MAP.md` "Explicit display transformations".

**3. Form submit buttons — `Send Message`.**
Every form submit control is a real `<button type="submit">` labelled `Send Message`. It
submits its form. It is never a `tel:` link. Existing validation, consent, anti-spam, uploads,
CRM mappings, required/optional states and submission behaviour are unchanged.

**Hero-form scope — the homepage and all five service pages** share one responsive
`HeroWithForm` (doc 30 §3). The Services hub and About use a compact photographic introduction
with a secondary `Send a Message` link instead of a duplicate intake panel. Contact uses a
compact title plus a details/form split. Legal pages use a text title only. *This supersedes the
earlier "hero form on `/` only" rule.*

**4. Public service name — `Extreme Cleaning`.**
Source content is the `Severe Property Cleanup` section of
`docs/aseptaclean-all-website-copy.md`. The canonical route `/extreme-cleaning-san-jose/` is
retained. Display strings only — page title, eyebrow, nav, card title, form option label,
service-name references. No `href` change and no internal enum rename.

**5. Copy sources.** `docs/aseptaclean-all-website-copy.md` is the main public copy;
`docs/aseptaclean-crime-scene-trauma-cleanup.md` is the supplemental trauma copy. Both are
preserved byte-for-byte. Apply only the transformations and placements in
`docs/20-COPY-MAP.md` and the twelve `docs/page-briefs/`.

**6. The twelve public pages**, enumerated with their routes in `docs/SITEMAP-MASTER.md`:
Homepage · Services hub · Hoarding Cleanup · Extreme Cleaning · Detailed Deep Cleaning ·
Crime Scene & Trauma Cleanup · Rodent Droppings & Animal Waste Cleanup · About · Contact ·
Privacy Policy · Terms and Conditions · Cookie Policy.
`/thank-you/`, `/404`, `/data-request/` and `/sms-notification-consent/` remain working utility
routes. Absence from the new navigation does not authorize deleting or deindexing any other
existing route — that needs an explicit keep/redirect/retire mapping.

**`/request-assessment/` is retired outright — owner decision, 2026-09-06, superseding this
paragraph's earlier text.** It previously survived here as "removed from primary CTA/nav but
stays a working, indexable form destination"; the owner has since ruled the standalone page
"must be unavailable," `noindex` alone is insufficient, and it must return a real not-found
response. `src/pages/request-assessment.astro` is deleted and the path is out of
`launchPrimaryPaths`. Every CTA and link that pointed at it now points at the destination
page's own embedded form or, where a page has none, at `/contact/`. Full resolution:
`docs/05-CURRENT-DECISIONS.md`, 2026-09-06. `/hoarding-cleanup-san-jose/assessment/` is a
**different route** — the approved PPC landing page — and is unaffected by this retirement.

**7. The reference PDF is not a claims source.** It shows `LICENSED & INSURED`, OSHA, IICRC,
CDPH, and Google-review badges belonging to other companies, plus 24/7 emergency language.
§0.3 and §7 are unchanged and unweakened: none of that is rendered on this site. Reproduce
composition, not credentials, and never add availability language to fill a badge slot.

**8. Retired website authorities** are listed in §1.2 above with their archive paths. Do not
build from them and do not substitute their copy.

### Active versus historical material

- Files under `docs/archive/` are historical evidence only. They never override this file,
  current source, the current build, or an active document.
- Reference HTML, PDFs, screenshots, mockups, dated audits, and implementation reports are
  visual or historical evidence only unless a current owner decision explicitly promotes them.
- A filename containing `FINAL`, `APPROVED`, `UPDATED`, `MASTER`, or `CANONICAL` does not confer
  authority by itself.
- `src/data/site.ts` is the implementation source for shared business facts. It must reflect
  verified facts and current owner decisions; it does not outrank them. Route copy lives in
  approved page briefs and specifically locked canonical copy. Current source proves what ships
  now but is not permission to preserve superseded strategy merely because it already exists.
- `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md` records history. The newest valid entry wins only within the scope
  it actually decided; an old audit finding is not an instruction.

### Missing or stale pointers

If an active document points to a missing file, an archived file as authority, `/api/leads`,
`src/pages/api/lead.ts`, `/services/{slug}`, or `/locations/{city}`, stop and reconcile the
pointer rather than acting on it. Historical mentions inside archived reports may remain.

---

## 2. Current route architecture

**Scope note, 2026-09-04.** For the twelve redesigned public pages, `docs/SITEMAP-MASTER.md` is
the current scope, navigation and route-preservation authority, and `src/data/launchArchitecture.ts`
is the implementation source for indexation. This section remains the record of what the build
actually emits across **all** routes, including the auxiliary and city routes outside the
redesign. Absence from the new twelve-page navigation does not authorize deleting, redirecting
or deindexing any route listed here.

The site is **no longer one-page.** `19-SYSTEM-AND-SITEMAP.md` Part 2 supersedes the deleted
one-page directive (see §1 "Files that do not exist").

**Regenerated 2026-08-21 by reading `dist/` after `npm run build:local`. Code is truth.**
This pass added the nine `/service-areas/{city}/…` routes built on 2026-08-21, which the
2026-08-19 regeneration predates. The route counts, the `noindex` list, and the crawl-path
table below all moved; the indexable set and `sitemap.xml` did not.

The 2026-08-19 regeneration note is kept because the failure it records still governs how this
section is maintained. The previous version of this section was stale on **eleven** index-status rows — it listed
`/detailed-cleaning/`, `/property-clearing/`, `/deep-cleaning-san-jose/`,
`/property-cleanouts-san-jose/`, `/estate-cleanout-san-jose/`, `/hoarding-cleanup-san-jose/`
and `/service-areas/` as noindex when all seven ship indexable and in `sitemap.xml`, and it
omitted eight built routes entirely. Do not hand-edit these lists; regenerate them from a
fresh build.

`docs/SITEMAP-MASTER.md` remains the **planning** authority — publish waves, gates, and copy
sources per route. It is not the authority on what the current build actually emits. Where it
disagrees with the lists below, the build wins and the disagreement is flagged in that file.

**46 built routes** = 45 pages + `/404`. Was 37; the nine city routes below joined 2026-08-21.
Astro emits 48 pages and `scripts/prune-dev-routes.mjs` removes the two `/dev/*` routes.
`/api/lead` is a Cloudflare Pages Function, not an Astro route, and never appears in
`sitemap.xml`.

**STALE as of 2026-09-03 — superseded by the launch-architecture reduction.** The 23-route list
below predates `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`'s "Public launch architecture reduced to the
locked-copy pages" and "Full-site visual-redesign prompt reconciled..." entries (2026-09-03),
which narrowed the public/indexable set to the twelve paths in `src/data/launchArchitecture.ts`
(`launchIndexablePaths`): `/`, `/services/`, `/about/`, `/contact/`, the five current service
routes (`/hoarding-cleanup-san-jose/`, `/extreme-cleaning-san-jose/`,
`/rodent-dropping-cleanup-san-jose/`, `/deep-cleaning-san-jose/`,
`/crime-scene-trauma-cleanup-san-jose/`), `/request-assessment/`, `/privacy/`, `/terms/`. Every
route below not in that list is currently `noindex, follow` regardless of what this table says.
Treat `launchArchitecture.ts` as the current source of truth for indexation; this table is kept
for historical route-count context only and was not rewritten route-by-route.
```
/                                   /faq/
/about/                             /handoff-standard/
/contact/                           /request-assessment/
/cookie-policy/                     /service-areas/    links down to 3 city hubs
/privacy/                           /services/         see note below
/terms/                             /who-we-help/
/detailed-cleaning/                 /property-clearing/            (hubs)
/deep-cleaning-san-jose/            /move-out-cleaning-san-jose/
/debris-removal-san-jose/           /extreme-cleaning-san-jose/
/estate-cleanout-san-jose/          /hoarding-cleanup-san-jose/
/property-cleanouts-san-jose/       /estate-cleanout-checklist/    (launched 2026-08-20)
/private-residence-reset/           (campaign page — footer-linked, NOT in nav)
```

**Indexable, deliberately absent from `sitemap.xml` (1)** — was 3; two resolved 2026-08-20
```
/sms-notification-consent/ byte-preserved, under Twilio 10DLC carrier review — DO NOT EDIT
```
`/private-residence-reset/` **left this list** — it is now in `sitemap.xml` with one
low-emphasis footer link (see the crawl-path note below). `/data-request/` **left it in the
other direction** — it now ships `noindex, follow`.

**`/data-request/` is `noindex, follow`.** As of 2026-08-24 it provides a complete email-based
privacy-request path without exposing a preview or unfinished-provider message. The provider
form is still not wired, so keep the route out of the index until that workflow is configured
and verified. Flip robots and the `sitemap.xml` entry together when it clears release-checklist
C8.

**`/sms-notification-consent/` is unchanged and was not touched.** Two items in the 2026-08-20
SEO pass targeted it — a `noindex` flip and a move onto the shared `SeoHead` path, which would
also have repointed its two `/terms-and-conditions/` links. Both were **stopped and reported**
rather than executed: this page is byte-preserved under an ACTIVE carrier review, §6 below
fences it explicitly, and the two links in question are consent disclosures the carrier reads.
See `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`, 2026-08-20.

**`noindex`, excluded from `sitemap.xml` (22)** — was 13; the nine city routes joined 2026-08-21
```
/404                                /projects/
/thank-you/                         /data-request/   (see note above — reversible)
/specialty-cleaning/                (hub — noindex while its group is gated)
/animal-waste-cleanup-san-jose/     /rodent-dropping-cleanup-san-jose/
/pigeon-dropping-cleanup-san-jose/  /commercial-cleaning-san-jose/
/eviction-cleanout-san-jose/        /post-construction-cleaning-san-jose/
/window-cleaning-san-jose/          /senior-downsizing-san-jose/   (P1 — delete-or-write)

/service-areas/mountain-view/       /service-areas/mountain-view/hoarding-cleanup/
/service-areas/sunnyvale/           /service-areas/mountain-view/estate-cleanout/
/service-areas/campbell/            /service-areas/sunnyvale/hoarding-cleanup/
                                    /service-areas/sunnyvale/estate-cleanout/
    3 city hubs (left)              /service-areas/campbell/hoarding-cleanup/
    6 service × city (right)        /service-areas/campbell/estate-cleanout/
```
Each stays noindex until its own gate clears. Do not bulk-flip.

**Owner clarification, 2026-08-26 — `noindex` is not a statement about service availability.**
Rodent-droppings cleanup, animal-waste cleanup, and pigeon-droppings cleanup are **not
operationally gated services**. The current gate is TSWMP-dependent work. Keep three things
separate and decide each on its own evidence:

1. **operational availability** — what Aseptaclean may lawfully and safely perform now;
2. **TSWMP / regulatory scope** — pending, and it gates the work that actually requires it;
3. **SEO / indexation state** — a publication decision, and nothing more.

So do not describe those three services as "future," "inactive," or "gated" because their routes
are `noindex`, and do not read an indexable route as proof that TSWMP-dependent work is cleared.
Full text: `docs/archive/2026-09-04-before-consolidation/30-WEBSITE-MASTER-SPEC.md` §20A.4
(retired master, kept as the traceable source of this three-way separation). This clarification
changes **no** route's `publishStatus`, robots tag, or sitemap membership on its own — each gate
stands until it is separately cleared. `/rodent-dropping-cleanup-san-jose/`'s indexation is
decided in §2.1's rodent entry, not here.

**The `megaNav`-exclusion sentence below is historical, describing retired code.** The
`megaNav` object in `src/data/site.ts` that this paragraph refers to is no longer what renders
primary navigation as of the 2026-09-03 launch-architecture reduction; current navigation comes
from `src/data/launchArchitecture.ts`, whose `launchServiceLinks` deliberately **does** include
Rodent Droppings & Animal Waste Cleanup in the Services dropdown/list (see
`docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`, "Public launch architecture reduced to the locked-copy pages" and
"Full-site visual-redesign prompt reconciled..."). Business & Professions Code §8550(a) and doc
21 §3 still govern *wording* (no pest-identification or extermination claims on that page) but
no longer justify omitting the route from primary navigation. This does not touch the separate
reason `/pigeon-dropping-cleanup-san-jose/` remains out of the current nine/twelve-route
allow-list entirely: it is not one of the five current public service routes.

**The nine city routes are `noindex, follow` on ONE remaining gate: owner confirmation of city
availability.** That is a business fact, not a machine decision, and it is the only thing left.
Every automated gate already passes — `npm run qa:seo` reports **9/9 city routes clean, 0 errors,
0 publish blockers**. They are not held back by a completed-job requirement; see the city-page
paragraph at the end of this section, which records that requirement's supersession.

**`/estate-cleanout-checklist/` left this list on 2026-08-20** — the first of P9's ten gated
rows to clear. Its gate was an owner copy review, not an operational or compliance fact, which
is why it could close inside the repository when the other nine cannot. **This sets no
precedent for the remaining nine**; see `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md` for their conditions.

**Crawl-path note — open. Scope corrected 2026-08-20.** The global nav and footer link every
service page from every page, so the indexable set links into the gated set wholesale. Register
item P2 originally described this as `/animal-waste-cleanup-san-jose/` being "linked from
indexable `/services/` and `/service-areas/`", and a later correction restated it as "all 21
indexable routes link into all 11 noindex service routes". **Both are wrong, and the second is
wrong in shape as well as arithmetic** — "all into all" implies a uniform grid, and it is not
one. Measured from `dist/`, twice, because this pass moved one route across the boundary:

| | indexable routes (link sources) | `noindex` routes | receiving ≥1 link | receiving ZERO |
| --- | --- | --- | --- | --- |
| **As audited**, before the 2026-08-20 pass | 25 | 12 | 7 | 4 |
| **As built**, after the 2026-08-20 pass | 24 | 13 | 7 | 5 |
| **As built**, after the 2026-08-21 city build | 24 | 22 | 16 | 5 |

The zero-receiver counts exclude `/404`, which is not a route anything should link to. The five
are `/thank-you/`, `/projects/` (removed from the footer 2026-08-18),
`/rodent-dropping-cleanup-san-jose/` and `/pigeon-dropping-cleanup-san-jose/` (both held out of
`megaNav` on B&P §8550(a)), and `/data-request/` (added by its `noindex` flip above).

The 2026-08-20 delta was entirely `/data-request/` moving from the indexable column to the
`noindex` one; no gated route changed its inbound status. **The 2026-08-21 delta is nine new
gated routes, and all nine are deliberately linked from indexable pages** — the three hubs from
`/service-areas/` and `/property-clearing/`, the six service×city pages from neutral local-
planning blocks on `/hoarding-cleanup-san-jose/` and `/estate-cleanout-san-jose/`. The former
"Also serving" availability claim was removed 2026-08-24 while owner confirmation remains open.
So P2's crawl-path scope grew by nine instances and did not shrink.
Still release-checklist C10, still not a defect to fix casually — narrowing it means changing
the nav, not editing a link.

**`/services/` — resolved 2026-08-20, owner ruling.** The prohibition below previously forbade
"any `/services/*` route" as the superseded `site map` architecture, while `/services/` shipped
built, indexable, and in `sitemap.xml`: a single index hub titled *"What Aseptaclean handles"*
linking to the three group hubs. **The narrow reading is confirmed** — the rule targets the
superseded `/services/{slug}` detail tree, and this hub is outside it. The prohibition text has
been amended to name `/services/{slug}` explicitly so this does not recur. The route is legitimate
and stays indexable.

**`/services/` and `/who-we-help/` were orphans — being fixed separately.** Both are indexable
and in `sitemap.xml` but had **zero inbound links**, reachable by crawlers through the sitemap
and by visitors not at all. Owner ruling 2026-08-20: **add both to the footer Company column.**
That is a `src/` change and ships in its own commit, separate from the documentation pass that
recorded the problem.

**Do not build, in any form — no route, draft, stub, sitemap entry, or nav link**
```
/biohazard-cleanup*/  /blood-cleanup/  /unattended-death-cleanup/
/human-waste-cleanup/  /sharps-cleanup/
/encampment-cleanup/
garage-cleanout · basement-cleanout · furniture-removal · mattress-disposal
any reviews page, until reviews exist
/services/{slug}  and  /locations/{city}    (the superseded `site map` architecture)
```

**Exception, 2026-09-03 — `/crime-scene-trauma-cleanup-san-jose/` and
`/vehicle-biohazard-cleanup/` scope only.** Owner confirmed the California TSWMP registration
(TSW #933) is now active and verified, lifting the Phase 5 gate for exactly one built route,
`/crime-scene-trauma-cleanup-san-jose/` (Vehicle Biohazard Cleanup ships as a situation on that
page, not as its own route). See `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`, "TSWMP verified; Phase 5 gate
lifted for Crime Scene & Trauma Cleanup only." `TSWMP` in §3 below is updated to reflect this.
**The rest of this prohibition list is untouched** — `/biohazard-cleanup*/`, `/blood-cleanup/`,
`/unattended-death-cleanup/`, `/human-waste-cleanup/`, `/sharps-cleanup/`, and
`/encampment-cleanup/` remain fully forbidden. Do not cite this exception as precedent for any
other route on this list; each would need its own owner verification of the underlying fact.

**The `/services/*` prohibition was narrowed 2026-08-20 by owner ruling.** It previously read
"any `/services/*` or `/locations/*` route", which on its face forbade `/services/` itself —
a route that is built, indexable, and in `sitemap.xml`. The rule was always aimed at the
superseded per-service and per-city **detail trees**, not at a single index hub. It now names
`/services/{slug}` and `/locations/{city}` explicitly so the point does not need re-litigating
every time someone greps the prohibition list and finds a live route matching it.

**Still forbidden:** any child route under `/services/` — `/services/deep-cleaning/`,
`/services/hoarding/`, and so on. Service detail pages live at city-suffixed top-level slugs
(`/deep-cleaning-san-jose/`), which is where `docs/19-SYSTEM-AND-SITEMAP.md` put them and where
every internal link and redirect already points. **Any `/locations/*` route remains forbidden
in full**, including a bare `/locations/` index — that narrowing applies to `/services/` only,
because only `/services/` has a built hub the owner has confirmed.
`19` §2.1 Phase 3b's single-gate `/biohazard-cleanup-san-jose/` line is **void** — Phase 5's
four-gate rule governs. If you find that Phase 3b line, delete it.

### 2.1 City pages — two tiers, both built

**City pages nest under `/service-areas/`. There are two tiers, and both exist in the build.**

```
/service-areas/                     area hub — indexable, in sitemap.xml
/service-areas/[city]/              city hub          — 3 built
/service-areas/[city]/[service]/    service × city    — 6 built (3 cities × 2 services)
```

Cities: `mountain-view` · `sunnyvale` · `campbell`.
Services: `hoarding-cleanup` · `estate-cleanout`. The 3 × 2 grid is complete.

Both tiers come from dynamic generators — `src/pages/service-areas/[city]/index.astro` and
`src/pages/service-areas/[city]/[service].astro` — reading `src/data/cityHubPages.ts`,
`src/data/serviceCityPages.ts`, `src/data/cityFacts.ts`, and
`src/data/serviceCityImplications.ts`. **Do not hand-author a city route file.** A new city or
service is a data record, not a page.

Publication is per-record via `publishStatus` in `src/data/publication.ts` — `draft` (no route
at all), `noindex` (built, reachable, out of `sitemap.xml`), `published-index`. All nine records
sit at `noindex` today.

**Any `/locations/*` route remains forbidden in full.** The city system lives under
`/service-areas/` and nowhere else.

#### The completed-job requirement is superseded — history and current rule

**Superseded 2026-08-21 by owner ruling. The historical rule is recorded here, not deleted.**

> **The former rule, as this file carried it:** *"City pages nest under `/service-areas/{city}/`
> and require ≥1 completed job in that city plus original content that could only be about that
> city. No verified content → no page."* Doc 19 §2.2 stated the same gate as a hard gate, and
> doc 25 §7, doc 27 §20, and `docs/SITEMAP-MASTER.md` all restated it.

That rule was written to prevent doorway pages at a time when the project had no city data layer,
no sourced-fact model, and no automated quality gate — a completed job was the only available
proxy for "this page is about somewhere real." Those controls now exist, so the proxy has been
replaced by the thing it was standing in for.

**Current rule — a local page may launch with no prior Aseptaclean job history in that city,
provided it carries all seven of:**

1. **Verified city facts** — each with a named publisher and a source URL, in `cityFacts.ts`.
2. **Service-specific local implications** — what those facts change about *this* service at
   *this* address, in `serviceCityImplications.ts`, each declaring its `basis`.
3. **No fabricated experience claims.** Absolute, and it outranks the rest of this list. No job
   count, no "we have worked in", no anonymized project, no review, no rating, no proof image.
   §0.3 is unchanged and unweakened.
4. **Proper internal links** — up to the parent service page, across to the city hub, and at
   least one inbound link from a page that already exists.
5. **Unique useful copy** — unique H1, title, meta, and body that survives the doc 25 §2 swap
   test. A page that is the template wearing a city's name still does not ship.
6. **Applicable source and freshness controls** — every fact carries `verifiedAt` and
   `reviewAfter`; a fact past `reviewAfter` blocks indexation until it is reverified.
7. **Passing SEO quality gates** — `npm run qa:seo` (`scripts/city-seo-guards.mjs`) clean for
   that route, run against `dist/`, not source.

**Real completed projects remain a future proof-enhancement layer, not a prerequisite for the
route to exist.** When a real job in a city produces documentable, owner-approved material, it is
added to that city's pages as proof. Until then the route stands on verified facts. Nothing in
this supersession permits inventing the proof it makes optional.

**What this supersession does NOT do:**

- It does **not** override `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` (rank 3). §7 there still makes
  every city page a licensing decision before it is an SEO decision, and that gate is untouched.
- It does **not** raise any `publishStatus`. All nine routes remain `noindex, follow`, and owner
  confirmation of city availability still gates all nine.
- It does **not** license bulk city expansion. Doc 25's "ship two or three, not ten" stands, as
  does doc 01's "no more than one thin city page published at a time."

Full ruling and the reconciliation of every affected document: `docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md`,
2026-08-21, *"The completed-job prerequisite for city pages is superseded."*

---

## 3. Business facts — implementation data source

Everything below lives in `src/data/site.ts`. Never hardcode any of it in a component.

```
brand            Aseptaclean
legal            Aseptaclean, LLC
founder          Matthew Ruiz — Founder & Principal Operator
phone            (408) 785-7588   tel:+14087857588   sms:+14087857588
email            info@aseptaclean.com        (inbox test still required)
hours            Mon–Sat 7:00 AM – 7:00 PM PT, closed Sunday
address          service-area business — no published street address, ever
region           South Bay & Peninsula        (NOT "Santa Clara County" — Atherton is San Mateo)
insurance        wording recorded; current COI verification required before publication
endorsement      wording recorded; current COI verification required before publication
primary CTA      Call Aseptaclean            (owner decision 2026-09-04, §2.2.2)
secondary CTA    Send a Message              → local form, else /contact/#contact-form
form submit      Send Message                (owner decision 2026-09-04, §2.2.3)
form heading     Tell us about the property. (docs/03-INTEGRATION-CONTRACT.md)
assessment fee   $195, credited toward an approved project booked within 7 days
starting price   NOT PUBLISHED — see §4
response         within one business day
TSWMP            verified active 2026-09-03 — California Registered Trauma Scene Waste
                 Management Practitioner, TSW #933. Published only on
                 /crime-scene-trauma-cleanup-san-jose/ and its cross-links (footer, /services/,
                 doc27ServicePages.ts). See docs/archive/2026-09-04-before-consolidation/05-DECISIONS-LOG.md.
```

**Suppression rules — all six are absolute.** Unverified insurance wording → suppress the
insurance statement. Inactive social account → omit it. Never render an empty phone link.
Never show a success state against a non-working endpoint. Never expose a placeholder in a
production build. Never infer a physical office from service-area coverage.

**CTA decision, owner-approved 2026-09-04 — supersedes the 2026-08-25 ruling below.** The
default visible primary CTA is `Call Aseptaclean`; the secondary is `Send a Message`, which
scrolls/focuses the local form where one exists and otherwise links to `/contact/#contact-form`.
Form submit controls are labelled `Send Message` and always submit the form. See §2.2.2 and
§2.2.3. **`/request-assessment/` itself was retired outright 2026-09-06** (see §2.2.6) — it is
no longer a CTA destination of any kind, primary or otherwise.

*Superseded, kept for traceability — CTA decision, owner-approved 2026-08-25:*
`Tell Us About the Property` superseded `Request an assessment` as the default visible primary
CTA. The route remained `/request-assessment/`, and “request an assessment” could still appear
where that term was contextually required.

Do not change protected SMS, 10DLC, legal-consent, privacy, or regulated-condition wording
without verifying its controlling requirements.

No current COI or equivalent policy document is present in the repository. Until the owner or
broker verifies the exact insurance and endorsement wording against current documentation,
those public trust claims remain release-gated. Do not preserve them merely because an older
document or environment value contains them.

---

## 4. Pricing — owner decision, 2026-08-11

**No price figure is published anywhere on the site.** Owner rationale: with zero reviews and
zero completed-project proof, a published floor invites price shoppers and undercuts the
positioning. This closed the open pricing question in the since-deleted one-page directive
§5; that decision is inherited here and needs no other source.

Implementation:
- Remove `PUBLIC_STARTING_PRICE` from every rendered surface. Keep the env var and the
  build-time validation only if the value is genuinely consumed; if nothing renders it,
  delete the variable and its gate rather than leaving a dead check.
- **Keep the cost drivers.** Silence is weaker than "here is what moves the number." The
  pricing section states what determines price — property size and access, volume of approved
  contents, sorting and review required, cleaning condition, disposal requirements, labor and
  schedule, concealed conditions — and then routes to the assessment.
- The **$195 on-site assessment fee stays published.** It is a real, fixed, defensible number
  and it is the only figure on the site.
  - **Scoped exception — owner decision 2026-09-06.** The walkthrough offered through the
    hoarding PPC campaign at `/hoarding-cleanup-san-jose/assessment/` is free. That route
    publishes no figure at all: it has never rendered `site.offer.assessmentFraming()`, and this
    decision does not change `PUBLIC_ASSESSMENT_FEE`, the framing paragraph, or the fee on any
    other surface. A later rank-2 owner decision outranks an earlier one within the scope it
    actually decided, and the scope decided here is one campaign. Recorded in
    `docs/05-CURRENT-DECISIONS.md`; wording lives in
    `docs/page-briefs/ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md` (AC-PPC-HERO-ROOMS-1.1).
- `/private-residence-reset/`'s `$2,000` anchor is removed under the same rule.
- Revisit once there are ≥5 completed projects with photographs and ≥5 Google reviews.

---

## 5. `site map` — superseded, do not build from

The project doc named `site map` describes a `/services/*` + `/locations/*` architecture with
biohazard, trauma-scene, decomposition, rodent-droppings, rodent-urine, and post-infestation
routes, plus a `/projects/` hub with named case studies. **All of it is superseded and parts
of it are unlawful to publish.**

- Biohazard/trauma routes as this superseded doc describes them (a `/services/{slug}` or
  `/locations/{city}` detail tree, decomposition and post-infestation named separately) remain
  superseded regardless of the TSWMP exception above — that exception authorizes exactly the
  one built route named in §2, not a return to this doc's architecture.
- Rodent- and infestation-named service routes carry real Structural Pest Control Board
  exposure — see doc 21 §3.
- The `/projects/` case studies do not exist. Zero completed jobs are documented.

`19-SYSTEM-AND-SITEMAP.md` is the architecture authority. Give `site map` a superseded banner
or remove it from the working set.

---

## 6. Typography — current implementation

The shipping site uses **Inter Variable only**. Display and monospace role tokens resolve to
Inter so headings, body, UI, and record labels share one self-hosted face. Newsreader and IBM
Plex Mono were retired by the 2026-08-18 owner-approved visual port and their unused packages
were removed 2026-08-24.

**Never a Google Fonts CDN request in production.** One exception, deliberate and fenced:
`/sms-notification-consent/` is
byte-preserved under carrier review and loads Montserrat/Open Sans from Google. Do not
"fix" that page. Exclude it from any font grep gate.

### The two typography laws that do not bend

1. **No `font-size` declaration on any heading tag. Zero exceptions.** Not in a component
   `<style>` block, not inline. Headings get size from their `.ac-type-*` role class.
   **This is verified by resolving computed styles on heading elements in the built output —
   not by grepping selector text.** A class that sets a size and lands on an `<h1>`–`<h6>`
   violates this law exactly as a bare `h2 { font-size }` does, and a selector-text grep
   cannot see it. Amended 2026-08-18 after a grep-based check passed a live violation.
2. **H1:body ratio floor — ≥1.9:1 at every width.** Measured on computed styles, not on token
   values. Amended by owner ruling 2026-08-18: the previous split floor (≥2.5:1 at 390px,
   ≥4:1 at 1440px) is **superseded and no longer enforced**. In the approved direction
   contrast is carried by surface and colour variation, which the old floors predate. Do not
   re-raise a heading token to chase the retired numbers.

---

## 7. Standing prohibitions

- No `licensed` in any credential chip, bar, schema, or answering-service script.
- No `remediation`, `biohazard`, `decontamination`, `sanitization`, `sterilization` as a
  service claim. See doc 21 for the exact permitted and forbidden constructions.
  **Scoped exception 1, 2026-09-04:** on `/crime-scene-trauma-cleanup-san-jose/` only, the
  trauma source's factual waste-pathway wording (`Regulated biohazard waste`, and the
  situation names in its `Crime Scene & Trauma Cleanup Services` block) publishes under the
  active TSW #933 registration — doc 21 §5 as reconciled. This authorizes the registered
  trauma scope and nothing else.
  **Scoped exception 2, 2026-09-04 — owner override.** The shared brand descriptor
  **“Biohazard Remediation & Specialty Property Cleanup”** publishes in exactly three display
  roles: the homepage hero eyebrow, the Services hub H1, and the shared brand descriptor. This
  string was applied, auto-reverted on these prohibitions, escalated with every objection
  quoted — including that the same pages' footer reads “not a … remediation contractor” — and
  then **explicitly authorized by the owner**, which is rank 2 and outranks doc 21 at rank 3.
  Full record: `docs/05-CURRENT-DECISIONS.md` 2026-09-04 item C, and the OWNER OVERRIDE section
  of `docs/20-COPY-MAP.md`. **Do not revert it as a claims violation** — that has already
  happened once. Outside these two exceptions `remediation`, `decontamination` and contractor
  language stay forbidden everywhere, including the trauma page. Neither exception licenses a
  new service, credential or capability claim.
- No `hoarder` as a noun. No `gross filth` anywhere.
- No hantavirus or rodent-specific handling language until written crew protocol exists.
- No stat bar — no job counts, years in business, or review counts.
- No `free assessment` or `free consultation` — the on-site assessment is $195. Both phrases stay
  banned everywhere, including on the PPC route below. **Scoped exception, owner decision
  2026-09-06:** the walkthrough offered through the hoarding PPC campaign is free, and
  `/hoarding-cleanup-san-jose/assessment/` (plus its thank-you route and its confirmation email
  branch) says `free walkthrough` in its secondary CTA, form subtext, submit button, one FAQ
  answer and its thank-you body. It is a walkthrough, never an "assessment" or a "consultation",
  and the exception reaches no other route. See §4.
- No retired mechanism names: `Assess → Define → Authorize → Clear → Document` is dead.
  The sequence is `Scope → Protect → Clear → Reset → Verify`.
- No retired guarantee names. The block is the **Handoff Assurance**.
- No placeholder, `[OWNER INPUT: …]` string, or `REPLACE_WITH_*` value in a production build.

---

## 8. Before you close a session

Append to `docs/05-CURRENT-DECISIONS.md`: what changed, what conflicted, what you did not do and
why, and any rule in this file you had to work around. A conflict you resolved silently is a
defect, even when the resolution was right.
