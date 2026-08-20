# MASTER SITEMAP — reconciled, single source of truth
**2026-08-09. Merges owner's full nav tree + doc 27 copy + doc 19 SEO slugs + owner ungating.**
**This table supersedes the sitemap in BOTH doc 19 §2.1 and doc 27 §7. Copy = doc 27 §9–17.**

> **Reconciled against `dist/` 2026-08-19 after `npm run build:local`.** The **Planned** column
> is what this document has always said — the publish intent, unchanged. **As built** is what
> the current build actually emits. They disagree on **ten rows**, every one of them a page
> planned as `index` that ships `noindex`.
>
> **This document remains the planning authority** — waves, gates, and copy sources. It is not
> the authority on current build state; `AGENTS.md` §2 now carries that, regenerated from the
> same build. Where the two columns below disagree, **the build is the fact and the plan is the
> intent.** Neither is a defect on its own: most of these are gates that have not cleared. What
> would be a defect is reading the Planned column as a description of the live site, which is
> what happened before this reconciliation.

| Group | Route (canonical, city-suffixed) | Page | Planned | As built (2026-08-19) | Copy source |
|---|---|---|---|---|---|
| Home | `/` | Homepage | index | ✅ index | 27 §9 |
| **Detailed Cleaning** | `/detailed-cleaning/` | Category hub | index | ✅ index | 27 §12 intro |
| | `/deep-cleaning-san-jose/` | Deep Cleaning | index | ✅ index | 27 §12.1 |
| | `/move-out-cleaning-san-jose/` | Move-In & Move-Out | index | ✅ index | 27 §12.2 |
| | `/post-construction-cleaning-san-jose/` | Post-Construction | index (gate: crew) | ⚠️ **noindex** | 27 §12.3 |
| | `/window-cleaning-san-jose/` | Window Cleaning | index (gate: crew) | ⚠️ **noindex** | 27 §12.4 |
| **Specialty Cleaning** | `/specialty-cleaning/` | Category hub | index | ⚠️ **noindex** | 27 §13 intro |
| | `/extreme-cleaning-san-jose/` | Extreme Cleaning | index | ✅ index | 27 §13.1 |
| | `/animal-waste-cleanup-san-jose/` | Animal Waste Cleanup | index ✅ ungated | ⚠️ **noindex** (P2) | 27 §13.2 |
| | `/rodent-dropping-cleanup-san-jose/` | Rodent Dropping Cleanup | index ✅ ungated (PPE SOP before 1st job) | ⚠️ **noindex** | 27 §13.3 |
| | `/pigeon-dropping-cleanup-san-jose/` | Pigeon Dropping Cleanup | index ✅ ungated | ⚠️ **noindex** | 27 §13.4 |
| **Property Clearing** | `/property-clearing/` | Category hub | index | ✅ index | 27 §14 intro |
| | `/property-cleanouts-san-jose/` | Property Cleanouts | index | ✅ index | 27 §14.1 |
| | `/hoarding-cleanup-san-jose/` | Hoarding Cleanup | index | ✅ index | 27 §14.2 |
| | `/estate-cleanout-san-jose/` | Estate Cleanouts | index ← highest value | ✅ index | 27 §14.3 |
| | `/debris-removal-san-jose/` | Debris Removal | index (minimums framing) | ✅ index | 27 §14 + doc19 guard |
| | `/eviction-cleanout-san-jose/` | Eviction Cleanouts | index (gate: crew) | ⚠️ **noindex** | 27 §14.5 |
| | `/senior-downsizing-san-jose/` | Senior Downsizing | index | ⚠️ **noindex** (P1) | doc 19 (not in 27 — write to voice) |
| **Commercial** | `/commercial-cleaning-san-jose/` | Commercial & Janitorial | index (gate: crew) | ⚠️ **noindex** | 27 §15 |
| **Service Areas** | `/service-areas/` | Area hub (10 cities) | index | ✅ index | 27 §16 |
| | `/service-areas/{city}/` | Per-city | as earned (real job + original content) | **not built** — `cityPages = []`, consistent with the gate | doc 19 gate |
| **Company** | `/handoff-standard/` (= Process) | The Handoff Standard | index | ✅ index | doc 19 / 27 §17.1 |
| | `/projects/` | Projects | publishes when real photos exist | ✅ noindex, gate unmet | 27 §22 |
| | `/about/` | About | index | ✅ index | 27 §17 |
| | `/faq/` | FAQ | index | ✅ index | 27 §17 |
| | `/contact/` | Contact | index | ✅ index | 27 §17 |
| **Resources** | `/estate-cleanout-checklist/` | Ungated checklist asset | index | ✅ index, in `sitemap.xml`, 3 inbound links | doc 19 Part 6 |
| | ~~`/assessment/`~~ | ~~Triage quiz~~ | ~~Phase 4~~ | ~~not built~~ — **CANCELLED 2026-08-20, owner ruling** | ~~doc 19 Part 4~~ |
| **Legal** | `/privacy/` `/terms/` `/cookie-policy/` | | as configured | ✅ index, in `sitemap.xml` | existing |
| | `/data-request/` `/sms-notification-consent/` | | as configured | ✅ index, **deliberately not in `sitemap.xml`** | existing |
| **Utility** | `/thank-you/` `/404` | | noindex / n/a | ✅ noindex | existing |
| **Undocumented until now** | `/services/` | Services index — "What Aseptaclean handles" | *absent from this table* | ✅ index, in `sitemap.xml`, **0 inbound links** | — |
| | `/who-we-help/` | Audience page | *absent from this table* | ✅ index, in `sitemap.xml`, **0 inbound links** | — |
| | `/private-residence-reset/` | Campaign page | *absent from this table* | ✅ index, not in `sitemap.xml`, **0 inbound links** | doc 08 |

**Totals as built: 37 routes** — 21 index + in `sitemap.xml`, 3 index + deliberately excluded,
13 `noindex`.

### Unresolvable rows — need a decision, not a lookup

**All four were ruled on 2026-08-20. Kept here with their resolutions rather than deleted —
the record of what was open is worth as much as the answer.**

1. ~~**`/assessment/` (Triage quiz, doc 19 Part 4).**~~ ✅ **CANCELLED, owner ruling 2026-08-20.**
   The row is struck above. `/request-assessment/` is the built and canonical route for this
   intent, and it is indexable, in the sitemap, and linked. No triage quiz will be built. This
   closes the *not yet* vs *abandoned* ambiguity that code alone could not resolve.
2. **`/services/` and `/who-we-help/` — orphans.** ✅ **Ruled 2026-08-20: add both to the footer
   Company column.** They stay indexable; the fix is the missing inbound link, not the index
   status. Shipping as a `src/` change in its own commit.
3. **`/services/` versus the standing prohibition.** ✅ **Narrow reading confirmed, owner ruling
   2026-08-20.** `AGENTS.md` §2's prohibition now names `/services/{slug}` and `/locations/{city}`
   explicitly, so a live `/services/` hub no longer reads as violating it. Child routes under
   `/services/` remain forbidden, as does every `/locations/*` route including a bare index.
4. **The ten planned-index / built-noindex rows.** ⏳ **Enumerated 2026-08-20 and referred to the
   owner as a group.** See `docs/05-DECISIONS-LOG.md`, 2026-08-20, for the full table with each
   route's shipped gate text. The headline correction: this document's "ungated ✅" marking on
   the three animal/rodent/pigeon routes is **the stale side of that disagreement, not the
   build.** `src/data/doc27ServicePages.ts` records that **owner decision 2026-08-16 chose the
   gated path over this file's ungated column** — so the build is correct and the 2026-08-09
   override was superseded seven days later. Corrected in the reconciliation notes below.

**Gated pages (Phase 5, DO NOT BUILD):** all biohazard routes — doc 90 four gates / TSWMP.

**Reconciliation notes:**
- City suffix on every service slug (doc 19 wins over 27's bare slugs) — local SEO.
- Category HUB pages kept (doc 27 wins over doc 19's omission) — needed for grouped nav.
- ~~animal/rodent/pigeon indexable now (owner override 2026-08-09) — 27's "noindex pending gate" superseded.~~
  **✅ STRUCK 2026-08-20 — this note was the stale side, not the build.** All three ship
  `noindex`, correctly. `src/data/doc27ServicePages.ts` carries the reason in each route's
  `gate` field: *"Ships noindex per §21 'Current status' and §13 'gated'; **owner decision
  2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column**."* The 2026-08-09
  override was superseded on 2026-08-16 and this line was never updated. Doc 27 §21's
  compliance-release inputs — insurance wording for the specific terminology, the
  pest-control/cleanup licensing boundary, disposal procedure, PPE and work-zone limits, final
  claims review — are still not on record. **Do not flip these three to `index` on the strength
  of the 2026-08-09 override; it no longer stands.**
- Publish order still follows doc 19 waves; "gate: crew" pages hold until capacity confirmed.
- Nav = grouped dropdowns per doc 27 §8 once Phase-2 pages publish; flat until then.
  **Built state:** grouped dropdowns ship now, and the nav links **every** service page from
  **every** page — so all 21 indexable routes link into the 11 `noindex` ones. Release
  checklist C10. See `AGENTS.md` §2 "Crawl-path note".
