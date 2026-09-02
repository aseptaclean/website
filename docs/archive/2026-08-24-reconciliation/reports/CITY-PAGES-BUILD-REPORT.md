# City Pages — Build Report

**Audited:** 2026-08-21
**Build:** `npm run build:local` → 48 pages emitted, 46 after dev prune
**Scope:** the nine `/service-areas/{city}/…` routes, their data layer, their templates, and the
pre-existing routes they touch.

Every verification below was run against `dist/` — the HTML a visitor actually receives — not
against source. Where a claim could only be checked in a browser (overflow, computed type scale,
grid collapse), it was measured in headless Chrome at five viewport widths.

**No files were modified during this audit.** Findings are reported, not fixed.

---

## 1. Routes created

Nine routes, from two dynamic generators. All nine build and return HTTP 200.

### City hubs — 3

| Route | H1 | Status |
|---|---|---|
| `/service-areas/mountain-view/` | Property Cleaning & Complex Cleanup in Mountain View | `noindex, follow` |
| `/service-areas/sunnyvale/` | Property Cleaning & Complex Cleanup in Sunnyvale | `noindex, follow` |
| `/service-areas/campbell/` | Property Cleaning & Complex Cleanup in Campbell | `noindex, follow` |

### Service × city — 6

| Route | H1 | Status |
|---|---|---|
| `/service-areas/mountain-view/hoarding-cleanup/` | Hoarding Cleanup in Mountain View | `noindex, follow` |
| `/service-areas/mountain-view/estate-cleanout/` | Estate Cleanout in Mountain View | `noindex, follow` |
| `/service-areas/sunnyvale/hoarding-cleanup/` | Hoarding Cleanup in Sunnyvale | `noindex, follow` |
| `/service-areas/sunnyvale/estate-cleanout/` | Estate Cleanout in Sunnyvale | `noindex, follow` |
| `/service-areas/campbell/hoarding-cleanup/` | Hoarding Cleanup in Campbell | `noindex, follow` |
| `/service-areas/campbell/estate-cleanout/` | Estate Cleanout in Campbell | `noindex, follow` |

The 3 × 2 grid is complete. Both services are built in all three cities.

---

## 2. Files created

| Lines | File | Role |
|---:|---|---|
| 233 | `src/data/cityFacts.ts` | 14 verified city/provider facts, each with source URL, `verifiedAt`, `reviewAfter` |
| 248 | `src/data/serviceCityImplications.ts` | 18 operational implications, each citing `factIds` or declared `operating-model` |
| 318 | `src/data/serviceCityPages.ts` | The six join records — SEO identity, shared openings, 18 FAQs, coordination policy |
| 114 | `src/data/cityHubPages.ts` | The three hub records + `cityHubLinks` directory export |
| 46 | `src/data/publication.ts` | The three-state publication ladder (`draft` / `noindex` / `published-index`) |
| 595 | `src/pages/service-areas/[city]/[service].astro` | Generator for all six service × city pages |
| 381 | `src/pages/service-areas/[city]/index.astro` | Generator for all three city hubs |
| 1228 | `scripts/city-seo-guards.mjs` | Build-time indexation gate (`npm run qa:seo`) |
| 462 | `docs/city-pages-part2-UPDATED.md` | Build spec (link maps, guard list, publish gate) |
| 436 | `docs/city-service-data-UPDATED.md` | Approved copy package |

Two other untracked files — `src/components/RoutingDoors.astro` and `docs/27-CONVERSION-REWRITE.md` —
are **not** part of this build. They belong to the doc 27 §1 homepage routing work.

---

## 3. Files changed

| Change | File | What |
|---|---|---|
| +109 / −14 | `src/data/site.ts` | Service-area label refactor; adds `location.regionLabel`, consumed by the service × city template |
| +218 / −10 | `src/layouts/ServicePageLayout.astro` | Optional `alsoServing` prop → renders the "Also serving" city-link block |
| +81 / −2 | `src/pages/property-clearing/index.astro` | Renders `cityHubLinks` |
| +10 / −19 | `src/pages/service-areas/index.astro` | Hardcoded empty city list → derived `cityHubLinks`; heading changed from "Cities with a completed project on record" to "Local planning guides" |
| +26 / −1 | `src/pages/sitemap.xml.ts` | City routes now **derived** from `publishStatus` rather than hand-listed |
| +863 / −0 | `docs/05-DECISIONS-LOG.md` | Four new decision entries |

The `service-areas/index.astro` heading change is worth calling out as correct: the old string
asserted a completed project in each city, which is a claim this business cannot evidence. The new
string does not.

`src/pages/index.astro` and the other ~60 modified files in the working tree belong to adjacent
work (homepage routing block, sitewide spacing, mockups) and were not changed by this build.

---

## 4. Data files

The build separates three things that are usually mixed, and the separation is enforced structurally
rather than editorially:

- **`cityFacts.ts`** — verified facts only. What a city or its authorized provider publishes, in
  language checkable against the source. 14 records, all verified 2026-08-21, all `reviewAfter`
  2027-08-21. Carries an optional `appliesTo` guard so a service-scoped rule cannot render on the
  wrong service.
- **`serviceCityImplications.ts`** — what those facts mean for one service. 18 records, each
  declaring `basis: "city-fact"` (with non-empty `factIds`) or `"operating-model"` (with none).
- **`serviceCityPages.ts`** — the join. SEO identity, shared service openings, city FAQs.

Scope and fit copy is **not** re-authored per city — each service reads `fitWhen`, `workIncludes`,
and `boundaries` from its approved parent San Jose record. Three FAQ answers that appear on multiple
pages are referenced constants, not retyped strings.

---

## 5. Templates

Two generators, per the spec's "one Astro template per type, driven by data — do not hand-code nine
routes."

**`[city]/index.astro`** — hero + breadcrumb, city intro, verified fact list with source links,
featured service cards, future-services block, `RequestForm`, closing CTA.

**`[city]/[service].astro`** — hero + breadcrumb, shared service opening, **container-coordination
policy**, fit list, scope split panel (work includes / stop-notify-refer), verified fact list,
operational implications, four-step process, city FAQ + "Keep reading" link block, `RequestForm`,
closing CTA.

Two safety mechanisms are built into path generation rather than left to discipline:

- A `draft` record produces no route at all, so no HTML and no link target.
- A service × city page is additionally gated on **its hub being built** — position 3 of its
  breadcrumb and one of its required links both point at the hub, so dropping a hub to `draft`
  withdraws its children in the same change.

---

## 6. Components reused

No new visual components were introduced. The city pages reuse `BaseLayout`, `SeoHead`,
`RequestForm`, `Header`, `Footer`, `MobileCTA`, and the existing global section shell (`.ac-sec`,
`.ac-shell`, `.ac-pgh`, `.ac-fit`, `.ac-split`, `.ac-panel`, `.ac-steps4`, `.ac-faq`, `.ac-crumb`).
Heading sizes come from the `.ac-type-*` role classes; neither template declares `font-size` on a
selector resolving to a heading element.

---

## 7. SEO implementation

| Item | Result |
|---|---|
| Unique H1 | 9/9 — exactly one `<h1>` per page, all distinct sitewide |
| Unique title | 9/9 — no collisions sitewide (58–71 chars) |
| Unique meta description | 9/9 — no collisions sitewide (153–188 chars) |
| Self-referencing canonical | 9/9 |
| Robots | 9/9 `noindex, follow` |
| Breadcrumbs | Hubs 3 levels, service pages 4 levels; rendered nav and `BreadcrumbList` agree |
| Sitemap | 23 entries, zero city routes — correct for `noindex` |

**Schema.** Hubs emit `CollectionPage` + `BreadcrumbList`. Service pages emit `Service` +
`BreadcrumbList` + `FAQPage`. Verified on the built output:

- Exactly one `LocalBusiness` per page, always at `/#business`. No per-city business entity.
- No `address` on any business entity. `PostalAddress` appears only inside `areaServed` on a `City`
  node, carrying `addressRegion` + `addressCountry` only.
- No `AggregateRating`, no `Review`, no `priceRange` anywhere.
- No dangling `@id` references.
- `FAQPage` matches the rendered `<details>` markup **verbatim in both directions** — schema is
  built from the same array the body renders, so schema-only Q&A is structurally impossible.

**Sitemap derivation.** City routes are no longer hand-listed. `sitemap.xml.ts` derives them from
`publishStatus`, so the robots tag and the sitemap entry cannot disagree — the exact drift that puts
a `noindex` page in a sitemap. The guard asserts this against the built XML in both directions.

---

## 8. Internal links

Every one of the nine routes has at least one inbound link **from an indexable page**. Verified by
scanning all 46 built HTML files:

| Target | Inbound from |
|---|---|
| 3 city hubs | `/service-areas/` ✅, `/property-clearing/` ✅, + their own children |
| 3 hoarding × city | `/hoarding-cleanup-san-jose/` ✅, their hub, their sibling |
| 3 estate × city | `/estate-cleanout-san-jose/` ✅, their hub, their sibling |

✅ = indexable source.

Each service × city page carries the three required outbound links: **parent** service page,
**sibling** service in the same city, **hub** for that city. All link resolution goes through
`builtOnly()` / `isBuilt()` helpers, so a withdrawn record removes its own inbound links in the same
change — a card can never point at a route that was not built. No internal link on any city page
targets an unbuilt route.

---

## 9. Index / noindex status

**All nine routes ship `noindex, follow` and stay out of `sitemap.xml`.** This is deliberate, not an
oversight. Three gates are open:

1. Owner confirmation of city availability — the copy package's Part E checkbox is unchecked.
2. `docs/21` §7 — a location page is a licensing decision before an SEO one.
3. `AGENTS.md` §2 / `docs/19` §2.2 — the ≥1-completed-job gate on city pages.

`follow` is intentional: the pages are meant to be reachable and to pass link equity onward while
withheld from the index.

The guard reports **9/9 routes clean with 0 publish blockers**, meaning every machine-checkable
condition for `published-index` is already satisfied. What remains is the two owner confirmations,
which are not a machine's to make. Flip `publishStatus` one record at a time.

---

## 10. QA results

### `npm run qa:seo` — PASS

```
9/9 city routes pass every guard and are eligible for published-index
PASSED — 0 errors, 0 publish blocker(s).
```

46 pages scanned. Covers identity, schema, entity discipline, copy compliance, fact applicability
and freshness, implication integrity, link graph, and sitemap in both directions.

### `npm run qa:gate6` — PASS

`0 approved string(s) absent from the build.`

### `npx astro check` — PASS

`0 errors, 0 warnings, 4 hints` (the same four pre-existing hints).

### Responsive layout — PASS

Measured in headless Chrome at **320 / 390 / 768 / 1280 / 1440**, all nine city routes plus seven
pre-existing control routes.

| Width | Horizontal overflow | H1 count | H1:body ratio | Grid |
|---|---|---|---|---|
| 320 | 0px | 1 | 1.9 | single column |
| **390** | **0px** | **1** | **1.9** | **single column** |
| 768 | 0px | 1 | 1.9 | two column |
| 1280 | 0px | 1 | 2.6 | two column |
| 1440 | 0px | 1 | 2.6 | two column |

`document.scrollWidth === clientWidth` at every width on every route — **no horizontal overflow at
390px or anywhere else**. The `≤760px` breakpoint fires correctly: fact lists, service cards, the
tail grid, and the closing CTA all collapse to one column. Type-law holds (H1:body ≥ 1.9 at every
width).

An element-level scan flagged `.ac-marks` as extending past the viewport at ≥768px. This is a false
positive and **not** a defect: it is a decorative absolutely-positioned element inside
`header.ac-pgh`, which sets `overflow: hidden`. It is clipped, produces no scrollbar, appears
identically on all seven pre-existing control pages, and dates to commit `4ab46d1`.

### Compliance copy — PASS

Scanned `<main>` on all nine pages:

- **No fake experience claims.** Zero matches across 13 patterns (`we've`, `our crews`, `years of`,
  `hundreds of`, `in our experience`, …).
- **No hauling claims.** Zero matches across 8 patterns. Nothing reads as self-performed transport.
- **No public prices or permit-fee amounts.** Zero matches. Operational figures survive correctly —
  "30-day processing period", "36 feet curb-to-curb", "8 to 40 cubic yards", "ten working days" are
  all present and all correctly permitted.
- **No fake local offices.** No per-city `LocalBusiness`, no address, no "our office in {city}", no
  "serving {city} since". The only street address on any city page is **301 Carl Road** — the City
  of Sunnyvale's SMaRT Station, a third-party public facility, rendered inside an attributed fact
  with its source link. Not an Aseptaclean location.

Two phrases initially looked borderline — "when families call us about a hoarding condition" and
"keeps the crew productive". Both are **inherited verbatim** from `/hoarding-cleanup-san-jose/`,
which is already indexed and in the sitemap. Not new claims introduced by this build.

### Dumpster coordination boundary — ACCURATE, with one gap

The policy sentence renders **verbatim on all six** service × city pages:

> When a project requires a dumpster or debris container, Aseptaclean coordinates the applicable
> city-authorized or franchised provider, container placement, and disposal requirements as part of
> the scope. Aseptaclean performs the approved on-site sorting, bagging, staging, clearing, loading
> into the approved container when included, and follow-on cleaning. **Aseptaclean does not
> transport customer debris off-site.**

This matches `docs/21` §4 exactly: labor-only work is described (sorting, bagging, staging, clearing,
loading into the vendor's container), transport is explicitly disclaimed, and the container is always
attributed to the authorized provider. The guard enforces it — a service page that mentions a
container without rendering this sentence verbatim is a hard error.

**Gap:** the three city hubs discuss containers (5, 2, and 5 mentions) but do **not** render this
sentence, and the guard skips hubs for this check. See finding #2.

### Existing pages — NO REGRESSION

- All 7 control routes (`/`, `/service-areas/`, `/hoarding-cleanup-san-jose/`,
  `/estate-cleanout-san-jose/`, `/property-clearing/`, `/services/`, `/contact/`) return 200, render
  exactly one H1, and show zero horizontal overflow at all five widths.
- Gate 6 confirms no approved copy string went missing.
- `astro check` clean.
- The guard scans **all 46 pages**, not just the nine, and reports zero errors sitewide.
- Only 6 tracked source files were touched; each diff was reviewed and is additive or a
  correct substitution.
- `public/_redirects`: no source collides with a new route. `/mountain-view/`, `/sunnyvale/`, and
  `/campbell/` are top-level legacy paths redirecting to `/service-areas/` — no conflict with
  `/service-areas/{city}/`.

---

## 11. Unresolved issues

### 1. "Also serving" blocks were built against a logged deferral — **needs a decision-log entry**

`docs/05-DECISIONS-LOG.md:5959` records these blocks as **"Deferred, not built"**, with an explicit
precondition:

> Build these blocks in the same change that flips the six pages to `index`.

They are built now, and the six pages are still `noindex`. Two of the site's most valuable indexable
routes each open three crawl paths into `noindex` pages:

```
/hoarding-cleanup-san-jose/  [index, follow]  → 3 × [noindex, follow]
/estate-cleanout-san-jose/   [index, follow]  → 3 × [noindex, follow]
```

This is the register **P2** / release-checklist **C10** pattern the log was avoiding. Three separate
log entries (5959, 5993, 6132) still assert these blocks do not exist.

There is a real tension here, and the build resolved it the defensible way: **without** these blocks
the six pages would be reachable only from `noindex` hubs and siblings, which the guard reports as a
publish blocker (`D4 inboundLinkCount >= 1` requires an indexable source). So building them was
necessary to reach 0 blockers. But the reversal was never recorded. Per the `doc-precedence` skill,
an unrecorded reversal of a logged decision is exactly this repo's known failure mode. **Log it —
don't remove the blocks.**

### 2. Container-coordination boundary is absent from the three city hubs

All three hubs discuss debris boxes and containers; none renders the boundary sentence, because
`city-seo-guards.mjs:913` skips it (`if (page.kind !== "service") continue;`).

This is **not** a `docs/21` §4.3 violation today — each hub names the authorized provider, so nothing
reads as self-performed transport:

- Mountain View: *"Recology is the only company allowed to drop a debris box in this city"* and
  *"The container still has to be arranged through the applicable authorized provider."*
- Sunnyvale: *"container service runs through the city's contracted hauler"* (attributed fact).
- Campbell: *"exclusive franchise agreement with West Valley Collection and Recycling"* (attributed
  fact).

Campbell's hub intro is the weakest — it discusses container placement in prose without naming who
provides it, leaving the boundary to be inferred from a fact further down the page. **Recommendation:**
extend the guard's container check to hubs and render the policy there too. Low severity, but the
service-page template's own comment argues the boundary should be *stated*, not inferred.

### 3. Four unsourced housing-composition claims — **RESOLVED 2026-08-21**

> **Closed.** Owner ruled the premises struck. All four sentences below are gone from the built
> output, and a sweep found two more the audit below missed — both in city-hub intro prose
> (`/service-areas/sunnyvale/`, `/service-areas/campbell/`) — which were fixed in the same pass.
> The one housing figure the project actually had a source for (Campbell owner occupancy, U.S.
> Census QuickFacts, named in the research package's own fact list) is now
> `campbell-owner-occupancy` in `cityFacts.ts`, cited by id from the Campbell estate implication.
> Mountain View and Sunnyvale gained no housing fact, because the project holds no source for one.
> `npm run qa:seo`: 9/9 clean. Full reasoning in `docs/05-DECISIONS-LOG.md`, closing entry.
> The audit below is left standing as the record of what was found.

Four implications assert demographic facts that no `CityFact` supports and no source URL backs. They
render in the "What this changes…" prose section, which by design carries no source links — unlike
every claim in "Verified city information", which does:

| Route | Claim |
|---|---|
| `/service-areas/mountain-view/estate-cleanout/` | "Much of the city's housing is multifamily…" |
| `/service-areas/sunnyvale/estate-cleanout/` | "Much of Sunnyvale's housing is multifamily." |
| `/service-areas/sunnyvale/hoarding-cleanup/` | "Sunnyvale's housing skews multifamily…" |
| `/service-areas/campbell/estate-cleanout/` | "The City's Housing Element reports that single-family detached homes make up a substantial share…" |

Handled correctly so far: the approved copy was rendered unedited and flagged in data via
`ServiceCityImplication.ownerReviewNote`, which is never rendered. **This is the one substantive
content risk in the build.** The Campbell sentence attributes a specific document ("the City's
Housing Element") without a link. Either source them into `cityFacts.ts` with URLs or soften them
before any of these four pages is flipped to `published-index`.

### 4. Documentation is stale by nine routes

> **CLOSED 2026-08-21.** Both documents — and five others carrying the same stale claim — were
> reconciled in a documentation-only pass. `AGENTS.md` §2 was regenerated from a fresh build and
> gained §2.1 "City pages — two tiers, both built"; doc 19 §2.2's hard gate was superseded in
> place with the seven-condition model that replaced it. The completed-job requirement is
> recorded as history, not deleted. Also updated: `docs/SITEMAP-MASTER.md`,
> `docs/25CITYPAGESPEC.md`, `docs/27-COPY-CANONICAL.md` §16/§20, `CURRENT-SITE-MAP.md`, and
> `CURRENT-BUILD-AUDIT.md`. Ruling and full file list: `docs/05-DECISIONS-LOG.md`, 2026-08-21,
> *"The completed-job prerequisite for city pages is superseded."* No website code was touched.
> The audit below is left standing as the record of what was found.

- `AGENTS.md` §2 route inventory contains **zero** references to the nine city routes. Line 167 still
  shows `(cityPages = [])`, which is now false. Line 280 still states the ≥1-completed-job
  requirement as operative.
- `docs/19-SYSTEM-AND-SITEMAP.md:364` still carries *"Hard gate: ≥1 completed job in that city…
  No verified original content → no page."*

The conflict **was** properly resolved and logged (`docs/05-DECISIONS-LOG.md:5957` — build them,
ship `noindex`, make no completed-job claim), and the code honors that ruling. But neither governing
document was updated, so both still read as prohibiting what shipped. The log itself flags this at
line 5986.

### 5. Minor / non-blocking

- **Meta descriptions run 153–188 chars**; five of nine exceed ~160 and will truncate in SERPs. Titles
  run to 71 chars. Cosmetic, and moot while `noindex`, but worth trimming before the flip.
- **`_redirects` targets.** `/mountain-view/`, `/sunnyvale/`, `/campbell/` → `/service-areas/`.
  Correct **while** the hubs are `noindex` (redirecting into a `noindex` page would be worse).
  Revisit at flip time so they point at the matching city hub.
- **14 city facts hit `reviewAfter` on 2027-08-21.** The guard turns staleness into a publish blocker
  automatically, so this needs no tracking — but it does mean these pages carry a hard annual
  reverification obligation.
- **`qa:phase4:static` fails** on "private preview robots.txt does not block crawling". Pre-existing,
  unrelated to this build, and already documented at `docs/05-DECISIONS-LOG.md:6156` — the assertion
  is unconditional while a production build correctly emits `Allow: /`.

---

## Verdict

**The build is complete and technically clean. It is ready to publish as `noindex` — which is
exactly what it does today. It is not yet ready to be indexed.**

All nine routes exist, render, validate, and pass every automated gate with zero errors and zero
publish blockers. Nothing here is broken and no existing page regressed.

Three things should happen before any `publishStatus` is raised:

1. **Owner confirmation** of city availability (gates all nine — not a machine decision).
2. ~~**Resolve the four housing-composition claims** (gates four of the six service pages).~~
   **DONE 2026-08-21.** Premises struck on all four, plus two more found in the hub intros; one
   sourced Census housing fact added to `cityFacts.ts`. `npm run qa:seo` 9/9. See §3.
3. ~~**Record the "Also serving" reversal** in the decisions log, and refresh `AGENTS.md` §2 and
   `docs/19` §2.2 so the governing documents stop contradicting what shipped.~~
   **DONE 2026-08-21.** The "Also serving" reversal is logged. The governing documents are
   reconciled: `AGENTS.md` §2 regenerated from a fresh build plus a new §2.1, doc 19 §2.2's hard
   gate superseded in place, and five further documents corrected. The completed-job requirement
   is superseded, not erased — a local page may now launch without prior job history in that city
   when it carries verified city facts, service-specific local implications, no fabricated
   experience claims, proper internal links, unique useful copy, source and freshness controls,
   and passing SEO quality gates. See §4 above.

**Item 1 is the only one still open, and it is an authority decision, not a machine one:** owner
confirmation of city availability gates all nine routes. Items 2 and 3 are closed.
