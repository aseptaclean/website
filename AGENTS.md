# AGENTS.md — Aseptaclean repository operating rules

**Version:** 2026-08-25. Replaces `docs/AGENTS-PRECEDENCE-BLOCK.md` in full.
**Why this file exists:** an alignment audit on 2026-08-11 found five competing precedence
chains in `docs/`, three of them pointing at files that do not exist, and a standing rule that
forbade the only working lead endpoint in the repository. This file is the single operative
chain. If any other document disagrees with this one, this one wins and the conflict goes in
`docs/05-DECISIONS-LOG.md`.

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
every material resolution in `docs/05-DECISIONS-LOG.md`.

| # | Authority | Governs |
| --- | --- | --- |
| 1 | Verified business, legal, licensing, insurance, and scope facts | What is true and permitted now |
| 2 | Explicit current owner decisions, including the 2026-08-25 documentation reconciliation ruling in `docs/05-DECISIONS-LOG.md` | Current business and website direction |
| 3 | `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` | Public claims and regulated-service boundaries |
| 4 | Specifically locked approved canonical copy in `docs/27-COPY-CANONICAL.md` | Exact public wording not superseded by a rank 1–3 authority or an explicit newer copy approval |
| 5 | `docs/30-WEBSITE-MASTER-SPEC.md` — **the single governing website document** | Customer and website strategy, UX, UI, CRO, design system, responsive behavior, evidence strategy, technical SEO standards, and AI implementation behavior |
| 6 | Specialized route, city, system, release, voice, and route-specific specifications, including `docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` | Their named scope where consistent with ranks 1–5 |
| 7 | Current source plus a fresh production `dist/` build | Evidence of current technical state, not permission to override approved strategy |
| 8 | AI, developer, or tool preference | Implementation discretion only where higher authorities are silent |

`docs/30-WEBSITE-MASTER-SPEC-CHANGELOG.md` is historical context only. It is not an
implementation authority.

Within rank 6, use each file only for its stated specialty: `docs/19-SYSTEM-AND-SITEMAP.md`
and `docs/SITEMAP-MASTER.md` for route planning and publication gates;
`docs/25CITYPAGESPEC.md` for city-page quality; `docs/20-COPY-VOICE.md` for new-copy voice;
`docs/01-QUALITY-GUARDRAILS.md` for execution quality; `docs/04-RELEASE-CHECKLIST.md` for
release gates; `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` for that route only; and
`docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` for service-page content only, under §1.1
below.

### 1.1 The two website documents — installed 2026-08-26

```
GOVERNING                docs/30-WEBSITE-MASTER-SPEC.md
SUPPORTING SERVICE COPY  docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md
```

There is **one** governing website strategy/design document, and it is doc 30. Do not create a
second one. A page that needs work gets an approved brief in `docs/page-briefs/`, a data or copy
change, or a working prompt — not another competing website-standard MD.

`docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` survives because it holds detailed
service-page **content**: positioning, copy direction, headlines, educational ideas, objection
handling, FAQs, qualification language, CTA wording, service-specific assessment questions, and
proof/caption concepts. Doc 30 §20A is where that content is reconciled into the standard; read
§20A before implementing from the landing-page file.

**It is content, never authority.** It cannot, on its own, establish or change:

- a route, a route rename, a canonical URL, or a redirect;
- indexation or sitemap membership;
- operational service status or a gated-service launch;
- TSWMP scope;
- a published price — including its `$1,350` starting-price sentences, which appear ten times and
  are barred by §4 below until an owner decision reverses §4. See doc 30 §20A.17 and §20A.23;
- a health, safety, disinfection, or credential claim — doc 21 (rank 3) governs those;
- a form endpoint, or a service-area promise beyond current verified geography.

Where it conflicts with doc 30, **doc 30 wins**. Where doc 30 shows a shorter example of copy the
landing-page file states at length, that is not a licence to rewrite approved service copy.

### 1.2 Retired homepage briefs — do not build from them

**Superseded 2026-08-26 by owner decision.** These three are historical rationale only. They keep
their paths because roughly ten `src/` files and four `docs/05-DECISIONS-LOG.md` entries cite them
by path as the reason a shipped decision was made; moving them would strand those pointers.

```
docs/ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF.md            Interdoor-first brief
docs/ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF-SEVENSON.md   Sevenson-led brief
docs/ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md   V3 lean-Sevenson brief
```

Each self-declares "canonical" or "governing"; none of them is, as of 2026-08-26. **Doc 30 §17 is
the homepage architecture.** The 2026-08-25 log entry that elevated the V3 brief to rank 2 and
ruled it above doc 30 is spent — it recorded a homepage build that has since shipped, and doc 30
§17 now carries the same five-section order it produced. Do not re-cite it to outrank doc 30.

The first brief additionally points at `ASEPTACLEAN-MASTER-WEBSITE-SITEMAP.md` and
`Pasted markdown.md`, neither of which exists in this repository. Under "Missing or stale
pointers" below, that alone disqualifies it from active use.

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
- `docs/05-DECISIONS-LOG.md` records history. The newest valid entry wins only within the scope
  it actually decided; an old audit finding is not an instruction.

### Missing or stale pointers

If an active document points to a missing file, an archived file as authority, `/api/leads`,
`src/pages/api/lead.ts`, `/services/{slug}`, or `/locations/{city}`, stop and reconcile the
pointer rather than acting on it. Historical mentions inside archived reports may remain.

---

## 2. Current route architecture

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

**Indexable, in `sitemap.xml` (23)** — unchanged by the city build; was 22 before
`/private-residence-reset/` was added 2026-08-20
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
See `docs/05-DECISIONS-LOG.md`, 2026-08-20.

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
Full text: doc 30 §20A.4. This clarification changes **no** route's `publishStatus`, robots tag,
or sitemap membership — every gate above stands until it is separately cleared.

This does not touch the separate reason `/rodent-dropping-cleanup-san-jose/` and
`/pigeon-dropping-cleanup-san-jose/` are held out of `megaNav`: Business & Professions Code
§8550(a) and doc 21 §3, which are rank 3 and unaffected by an operational-availability
clarification.

**The nine city routes are `noindex, follow` on ONE remaining gate: owner confirmation of city
availability.** That is a business fact, not a machine decision, and it is the only thing left.
Every automated gate already passes — `npm run qa:seo` reports **9/9 city routes clean, 0 errors,
0 publish blockers**. They are not held back by a completed-job requirement; see the city-page
paragraph at the end of this section, which records that requirement's supersession.

**`/estate-cleanout-checklist/` left this list on 2026-08-20** — the first of P9's ten gated
rows to clear. Its gate was an owner copy review, not an operational or compliance fact, which
is why it could close inside the repository when the other nine cannot. **This sets no
precedent for the remaining nine**; see `docs/05-DECISIONS-LOG.md` for their conditions.

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
/crime-scene-cleanup/ /human-waste-cleanup/  /sharps-cleanup/
/encampment-cleanup/  /vehicle-biohazard-cleanup/
garage-cleanout · basement-cleanout · furniture-removal · mattress-disposal
any reviews page, until reviews exist
/services/{slug}  and  /locations/{city}    (the superseded `site map` architecture)
```

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

Full ruling and the reconciliation of every affected document: `docs/05-DECISIONS-LOG.md`,
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
primary CTA      Tell Us About the Property
secondary CTA    Call Aseptaclean
assessment fee   $195, credited toward an approved project booked within 7 days
starting price   NOT PUBLISHED — see §4
response         within one business day
TSWMP            pending / unverified — never published in any form
```

**Suppression rules — all six are absolute.** Unverified insurance wording → suppress the
insurance statement. Inactive social account → omit it. Never render an empty phone link.
Never show a success state against a non-working endpoint. Never expose a placeholder in a
production build. Never infer a physical office from service-area coverage.

**CTA decision, owner-approved 2026-08-25.** `Tell Us About the Property` supersedes
`Request an assessment` as the default visible primary CTA. The route remains
`/request-assessment/`, and “request an assessment” may still appear where that term is
contextually required. Do not change protected SMS, 10DLC, legal-consent, privacy, or
regulated-condition wording without verifying its controlling requirements.

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
- `/private-residence-reset/`'s `$2,000` anchor is removed under the same rule.
- Revisit once there are ≥5 completed projects with photographs and ≥5 Google reviews.

---

## 5. `site map` — superseded, do not build from

The project doc named `site map` describes a `/services/*` + `/locations/*` architecture with
biohazard, trauma-scene, decomposition, rodent-droppings, rodent-urine, and post-infestation
routes, plus a `/projects/` hub with named case studies. **All of it is superseded and parts
of it are unlawful to publish.**

- Biohazard/trauma routes violate the Phase 5 four-gate rule and the owner's TSWMP deferral.
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
- No `hoarder` as a noun. No `gross filth` anywhere.
- No hantavirus or rodent-specific handling language until written crew protocol exists.
- No stat bar — no job counts, years in business, or review counts.
- No `free assessment` or `free consultation` — the on-site assessment is $195.
- No retired mechanism names: `Assess → Define → Authorize → Clear → Document` is dead.
  The sequence is `Scope → Protect → Clear → Reset → Verify`.
- No retired guarantee names. The block is the **Handoff Assurance**.
- No placeholder, `[OWNER INPUT: …]` string, or `REPLACE_WITH_*` value in a production build.

---

## 8. Before you close a session

Append to `docs/05-DECISIONS-LOG.md`: what changed, what conflicted, what you did not do and
why, and any rule in this file you had to work around. A conflict you resolved silently is a
defect, even when the resolution was right.
