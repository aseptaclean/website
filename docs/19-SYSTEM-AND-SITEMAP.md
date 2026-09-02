# 19 — The System, Sitemap & Wireframes (v3 — self-contained)

**Status:** Active specialized planning authority for routes and growth architecture,
owner-reconciled 2026-08-25.
**Repo location:** `docs/19-SYSTEM-AND-SITEMAP.md`
**Relationship:** Governed by the hierarchy in root `AGENTS.md`. Verified facts, current owner
decisions, doc 21, specifically locked doc 27 copy, and doc 30 outrank this file.
**Copy source:** specifically locked page wording comes from `27-COPY-CANONICAL.md`; new copy
must follow doc 20 and doc 21. This file owns specialized route planning and publication waves
only where consistent with higher authorities.

**No standalone execution:** do not build from this document alone. Read `AGENTS.md`, doc 21,
doc 30, the applicable page brief, locked copy, and current technical evidence first.

> ## Owner reconciliation — 2026-08-25
>
> Doc 30 now governs customer/website strategy, design, conversion, responsive behavior,
> evidence, technical SEO, and AI implementation. This file remains a specialized route and
> growth-planning document only.
>
> - Default visible primary CTA: **Tell Us About the Property**. The route remains
>   `/request-assessment/`.
> - Do not create `/service-areas/san-jose/`.
> - Do not embed a Google Map on Contact; use service-area information.
> - `/assessment/` remains cancelled. Part 4 below is preserved historical material only.
> - Visible FAQs may remain useful, but `FAQPage` schema is not a mechanical requirement and
>   must not be added or maintained merely to pursue a Google FAQ rich result.
> - Current public process: **Scope → Protect → Clear → Reset → Verify**.
> - Astro + Cloudflare Pages remains the approved platform.

---

## PART 1 — THE SYSTEM

One machine, five stages. Every business activity maps to exactly one stage; if it
doesn't map, it doesn't happen.

```
CAPTURE → RESPOND → CONVERT → DELIVER → COMPOUND
```

### 1.1 CAPTURE — channels, cost, cadence, metric

| Channel | Cost | Cadence | Success metric |
| --- | --- | --- | --- |
| Google Business Profile | $0 | Photos 2–3×/wk · services mirror site page names exactly · every review answered <24h | Map Pack impressions; calls from profile |
| Local Services Ads | $400–500/mo hard cap | On once GBP verified + 3 reviews · dispute non-fit leads weekly | Cost/call <$150 |
| Referral ring A (professionals) | ~$100 one-time | See §1.5 letter program | Active relationships; referred leads/mo |
| Referral ring B (adjacent trades) | $0 | 15 reciprocal-overflow calls: cleaning cos, haulers, restoration | Agreements active |
| Organic search | time | Per Part 2 phases | GSC impressions ↑ by d90 |
| Nextdoor / Yelp free / FB groups | $0 | Claimed, NAP-identical, present not promotional | Messages/profile views |

**NAP law:** identical business name, phone, and service-area wording across site
footer, GBP, Yelp, Nextdoor, Angi, BBB, and the state registry listing. Audit quarterly.

### 1.2 RESPOND — the CAC divisor
- Live answering during business hours; after-hours text-back within 15 min.
- First human contact <5 min on every paid (LSA) lead — answer speed is an LSA
  ranking factor.
- One-business-day assessment response: sacred, stated on every page.
- "Text a photo" always offered (lowest-shame entry for Track A).

**Answering-service script requirements** (hand to the service verbatim):
must capture name, callback number, property city, deadline if any, and the sentence
"Matthew or the team will call you back within one business day — usually much sooner."
Must never: quote prices, promise scope, use the words remediation/biohazard/licensed,
or press for details the caller hesitates on. Tone: calm, unhurried, zero judgment.

### 1.3 CONVERT — on page and on call
- One dominant visible CTA per page → **Tell Us About the Property** or call, using the
  approved route and page-brief hierarchy.
- On the call: photo-first triage; fixed number only after walkthrough; "no obligation
  to authorize work" said out loud.
- The former Phase 4 triage quiz is cancelled; do not build or link `/assessment/`.

### 1.4 DELIVER — unchanged
Five-Stage Standard, signed scope, Handoff Record. The product is the proof.

### 1.5 COMPOUND — the job-close checklist (every job, no exceptions)
1. **Review ask, on the spot, at the reveal moment.** Script:
   *"If this made a hard week easier, a short Google review genuinely helps other
   families find us — here's the direct link. Mention the city if you're comfortable;
   never any details you'd rather keep private."* Send the GBP short link by text
   before leaving the property.
2. Photo capture with **written** permission; faces/addresses excluded; log in
   `06-ASSET-MANIFEST.md` with permission record.
3. If referred: handwritten thank-you to the referrer mailed same week.
4. Job specifics logged (city, property type, condition class, deadline type) →
   fuels city pages and service-page proof lines.
5. Verbatim customer phrases captured via the six-field inquiry system
   (trigger / frustration / desired outcome / fear / objection / vocabulary —
   per 90-FUTURE §10, active now, formalized in operations doc) → feeds page
   copy and new FAQs through normal claims-checked revision.

### 1.6 Referral letter program (ring A)
**Targets (~40):** probate & estate-planning attorneys (15), probate/trust-sale
realtors (10), senior move managers (5), top PM firms (10) — all Santa Clara County.

> **NOT struck by the 2026-08-20 "Santa Clara County" sweep — read this before "fixing" it.**
> Owner ruling B2 removes that phrase everywhere it states the SERVICE AREA. This instance
> states something else: which counties to prospect for referral partners. It is an operational
> targeting instruction, not a public claim, and no visitor ever reads it.
> **It is, separately, probably stale** — §2.2's city-page priority names Palo Alto, Atherton and
> Los Altos Hills as "highest estate tickets + densest Track B fiduciary referral market in the
> Bay Area," and two of those three are outside Santa Clara County. Widening the ring-A target
> list to match the footprint is a business decision the owner has not made, so it is flagged
> here and left as written rather than edited under an SEO ruling. See `docs/05-DECISIONS-LOG.md`.
**Package:** one-page letter + printed Executor's Checklist (Part 6) + sample Handoff
Record. Physical mail. Follow-up call week 2: "Did the checklist land? Want a stack
for clients?"

**Letter template (adapt, don't expand):**
> Dear {Name} — When a client's estate includes a property full of belongings, the
> question you get is "who actually handles this?" I've enclosed two things that make
> that conversation easier: a one-page Estate Cleanout Checklist for executors, and a
> sample of the Property Handoff Record we issue at closeout — written scope, room
> disposition, discovered-item log, photographs. Everything we clear is approved in
> writing first; everything we finish is documented. If it's useful, I'll send a stack
> of checklists for your office. Either way, the checklist is yours to hand out.
> — Matthew Ruiz, Founder & Principal Operator, Aseptaclean · {phone} · {site}

Never in the letter: referral fees (creates fiduciary conflict for attorneys),
"licensed," "remediation," discounts.

### 1.7 Unit economics governing all spend
Blended job ≈ $3,500 · qualified-lead value ≈ $875 (25% close) · full stack budget
$800–1,000/mo (answering 250–350 · LSA 400–500 · letters/citations 50–100) ·
one closed job/mo pays the stack ~4×. LSA buys cash flow now; SEO compounds CAC
toward zero over 12 months.

---

## PART 2 — SITEMAP + PER-PAGE SEO SPEC

### 2.1 Site architecture & nav (owner tree adopted 2026-08-09)

The route tree below is retained for its SEO-spec detail. Reconcile it with
`docs/SITEMAP-MASTER.md`, the current owner decisions recorded in `AGENTS.md`, and a fresh
build. Neither rank-6 route document silently overrides the other.

Nav = grouped dropdowns once Phase 3 pages publish; flat nav until then.
Every page: keyword-slugged URL, one primary query, one h1.

```
HOME  /

DETAILED CLEANING
  /deep-cleaning-san-jose/              deep cleaning services san jose
  /move-out-cleaning-san-jose/          move out cleaning san jose
  /post-construction-cleaning-san-jose/ post construction cleaning san jose
  /window-cleaning-san-jose/            window cleaning san jose

SPECIALTY CLEANING
  /extreme-cleaning-san-jose/            extreme cleaning san jose (verified query form)
  /animal-waste-cleanup-san-jose/       animal waste cleanup san jose
  /rodent-dropping-cleanup-san-jose/    rodent dropping cleanup san jose
  (pigeon guano = H2 on animal page; split only if GSC shows volume)

PROPERTY CLEARING
  /property-cleanouts-san-jose/         ~~property cleanout san jose (category hub)~~
                                        tenant abandonment cleanout san jose
  /estate-cleanout-san-jose/            estate cleanout san jose  ← highest value
  /hoarding-cleanup-san-jose/           hoarding cleanup san jose
  /eviction-cleanout-san-jose/          eviction cleanout san jose (PM/turnover page)
  /debris-removal-san-jose/             debris removal san jose (minimums framing)
  /senior-downsizing-san-jose/          senior downsizing services san jose

COMMERCIAL
  /commercial-cleaning-san-jose/        commercial cleaning san jose (janitorial)

SERVICE AREAS                                 ← two nested tiers, both BUILT 2026-08-21
  /service-areas/                             area hub (San Jose core stays in service pages)
    /service-areas/[city]/                    city hub          — 3 built
      /service-areas/[city]/[service]/        service × city    — 6 built
  built cities:   mountain-view · sunnyvale · campbell
  built services: hoarding-cleanup · estate-cleanout      (3 × 2 grid, complete)
  Santa Clara + Peninsula cities: not built. Add as data records, never as route files.

PROCESS    /handoff-standard/           (brand moat page)
PROJECTS   /projects/                   (publishes when real job photos exist)
ABOUT      /about/    FAQ /faq/ or homepage section    CONTACT /contact/
RESOURCES (footer): /estate-cleanout-checklist/  (no `/assessment/` route)
```

**Term assignment — owner ruling 2026-08-20. Resolves the §2.1/§2.2 conflict above.**
This section assigned **property cleanout san jose** to `/property-cleanouts-san-jose/` as a
"category hub". §2.2 assigns the same term to the **HOMEPAGE** as its primary query, and §2.2's
PM/TURNOVER entry independently gives `/property-cleanouts-san-jose/` a different primary
(*tenant abandonment cleanout*). Two routes were therefore chartered to compete for one query,
which is the cannibalisation this document exists to prevent, and the conflict survived the
2026-08-16 rename and the 2026-08-17 sitemap correction because each pass read only one of the
two sections.

**Resolved: `/` owns `property cleanout san jose`. `/property-cleanouts-san-jose/` owns
`tenant abandonment cleanout san jose`.** §2.1's assignment is struck above and replaced with
§2.2's, so the two sections now agree. §2.2 is unchanged and remains the per-page spec. See
`docs/05-DECISIONS-LOG.md`, 2026-08-20.

**Publish order (SEO value × readiness):**
Wave 1 (live now): home, about, contact, handoff-standard, thank-you, legal, 404.
Wave 2 (month 2): estate → hoarding → animal → rodent → senior downsizing →
checklist → service-areas hub → property-cleanouts hub → debris (minimums copy).
Wave 3 (as crew/scope confirms): deep cleaning, move-out, extreme cleaning,
eviction/PM, post-construction, window, commercial.
Wave 4: /projects/ (first job photos), ~~city pages (first job per city)~~, quiz.

**Wave 4's city-page condition is superseded (2026-08-21, owner ruling).** "First job per city"
is no longer what releases a city page — see the CITY PAGES entry in §2.2 for the seven
conditions that replaced it. Nine city routes are already built and shipping `noindex`; their
one remaining gate is owner confirmation of city availability. `/projects/` is unaffected and
still waits on first job photos. The quiz was **CANCELLED 2026-08-20** — see
`docs/SITEMAP-MASTER.md`.

**Homepage nav until Wave 2:** Services (scrolls to cards) · Method · The
Record · About · FAQ · phone · CTA — unchanged.

### 2.2 Per-page SEO spec (the part that must not live in chat)

**HOMEPAGE `/`**
- Primary intent: family decision-maker seeking help with an overwhelming relative's property.
- Supporting search terms must be validated during the homepage copy/SEO brief; do not restore
  the former single-service keyword target merely because it is recorded in history.
- Title and meta: finalize through `docs/page-briefs/HOME.md`, the active master, claims law,
  and current verified service-area wording. No exact replacement is locked here.
- Schema: LocalBusiness using only verified service areas and active profiles. Add `FAQPage`
  only with a current semantic justification, never solely to pursue a rich result. NO
  `aggregateRating` without real reviews.

**ESTATE `/estate-cleanout-san-jose/`** — highest value page on the site
- Primary: estate cleanout san jose
- Secondary: estate cleanout services, house cleanout after death, probate house
  cleanout, executor property cleanout, inherited house cleanout, deceased estate
  cleanout bay area
- Title: `Estate Cleanout in San Jose | South Bay & Peninsula | Aseptaclean`
- Meta: `Estate and probate property cleanouts with a signed scope, held-for-review
  controls, and a documented Handoff Record. South Bay & Peninsula.`
- Audience split: Track A grieving family (top) + Track B executor/attorney (own H2)
- Schema: Service + Breadcrumb; `FAQPage` only under the sitewide conditional rule above.

**HOARDING `/hoarding-cleanup-san-jose/`**
- Primary: hoarding cleanup san jose
- Secondary: hoarder house cleanout, hoarding cleaning services, help cleaning a
  hoarder's house, hoarding cleanup for elderly parent, cluttered house cleanout
- Title: `Hoarding Cleanup in San Jose | South Bay & Peninsula | Aseptaclean`
- Meta: `Compassionate hoarding cleanup with nothing removed without written
  approval. Discreet, judgment-free, documented. South Bay & Peninsula.`
- Audience: written to the ADULT CHILD, not the person who hoards. Question-phrased
  H2s ("Will everything be thrown away?") to feed AI Overviews.
- Schema: Service + Breadcrumb; `FAQPage` only under the sitewide conditional rule above.

**ANIMAL/ORGANIC `/animal-waste-cleanup-san-jose/`** — built but gated `noindex`
- Primary: animal waste cleanup san jose
- Secondary: pet waste cleaning house, cat urine cleanup home, animal hoarding
  cleanup, house with animal waste cleaning
- Title: `Animal Waste & Organic Condition Cleaning | San Jose | Aseptaclean`
- Meta: `Cleaning of animal-affected and heavy organic conditions under our organic
  pathogen endorsement. Cleaning only — documented, discreet, South Bay.`
- Wording law: cleaning under endorsement. Never biohazard/remediation/decontaminate/
  sanitize/sterilize.
- The 2026-08-09 marketing note is superseded by the 2026-08-25 conservative gated-content
  decision. Animal-, rodent-, and pigeon-related routes stay gated until their current business,
  insurance, operating-protocol, claims, and publication conditions are verified.
- Schema: Service + Breadcrumb; `FAQPage` only under the sitewide conditional rule above.

**RODENT DROPPINGS `/rodent-dropping-cleanup-san-jose/`** — built but gated `noindex`
- Primary: rodent dropping cleanup san jose · Secondary: mouse droppings cleaning
  attic, rat droppings removal house, rodent waste cleaning bay area
- Near-zero local competition; strong candidate for fastest standalone ranking
  after animal/organic. Cleaning language only — no disease/hantavirus risk
  claims, no "decontamination." May launch as an H2 section on the animal page
  only after every current gate is cleared; do not use impressions to bypass them.
- Title: `Rodent Dropping Cleanup | San Jose | South Bay & Peninsula | Aseptaclean`

**PIGEON DROPPINGS** — H2 section on the animal/organic page (pigeon guano
cleanup san jose). Split to its own page only if GSC shows real query volume.

**DEBRIS REMOVAL `/debris-removal-san-jose/`** (owner override; positioning-guarded)
- Primary: debris removal san jose · Secondary: property debris removal, cleanout
  debris hauling san jose
- MANDATORY FRAMING: whole-property and project debris only, stated project
  minimums above the fold, positioned as a component of documented cleanouts —
  never single-item/curbside pricing, never hourly, never "cheap hauling"
  language. This page exists to CAPTURE the query and educate upward into
  cleanout scope, not to compete with junk haulers on price.
- Title: `Property Debris Removal | San Jose | South Bay & Peninsula | Aseptaclean`

**CHECKLIST `/estate-cleanout-checklist/`** — link magnet, letter destination
- Primary: estate cleanout checklist
- Secondary: executor checklist house, how to clean out a parent's house, estate
  cleanout steps
- Title: `The Executor's Estate Cleanout Checklist (Free) | Aseptaclean`
- Fully ungated. Print stylesheet. Contents in Part 6.

**DEEP CLEANING & SURFACE RESTORATION `/deep-cleaning-san-jose/`** (gate: B10)
- Primary: deep cleaning services san jose
- Secondary: move out cleaning san jose, whole house deep cleaning, pre-listing
  house cleaning, bathroom deep cleaning, shower glass hard water removal, tile
  and grout deep cleaning, kitchen appliance deep cleaning
- Title: `Deep Cleaning & Surface Restoration | San Jose | Aseptaclean`
- Meta: `Detailed deep cleaning with a written room-by-room checklist — shower
  glass and hard-water treatment, tile and grout, appliance interiors, whole-house
  reset. San Jose & the Peninsula.`
- Selling mechanic: the WRITTEN CHECKLIST is the product — sell the itemized
  room-by-room scope, never outcome adjectives ("sparkling," "spotless"). Page
  structure: checklist categories as H2s (Bathrooms & glass / Kitchen & appliances /
  Floors & surfaces / Whole-house detail), each with its itemized ✓-list.
- Detail scope (owner-confirmed capabilities, feeds B10): shower glass hard-water
  and mineral-deposit treatment, tile & grout deep cleaning, bathroom fixture and
  finish detailing, cabinet & appliance interiors, baseboards/doors/switch plates.
- WORDING LAW: "surface restoration" / "finish restoration" through cleaning is
  permitted and accurate. "Restoration" in the damage sense — water, fire, flood,
  smoke — is a different licensed industry and NEVER appears on this page or in
  its schema. No sanitize/disinfect/sterilize claims (guardrails).

**PM/TURNOVER `/property-cleanouts-san-jose/`** (renamed 2026-08-16 per docs/SITEMAP-MASTER.md;
was `/property-cleanouts-for-managers/`) (gate: crew)
- Primary: tenant abandonment cleanout · Secondary: eviction cleanout san jose,
  rental property cleanout, foreclosure cleanout, apartment turnover cleaning
- Pure Track B: vacancy-cost framing, same-week availability messaging allowed only
  if operationally true.

**BIOHAZARD** (gate: ALL FOUR activation gates in 90-FUTURE-PHASE-BIOHAZARD-
STRATEGY.md — TSWMP held, disposal arrangements, claims amendment, owner
supersession note)
- URL slate, vocabulary, page architecture, guarantees, and proof ladder are
  governed by doc 90 §2–§9 at activation — NOT by this doc. Doc 90's Tier B
  URL table (6 URLs, anti-cannibalization rule) supersedes any biohazard slug
  previously listed here. Keywords re-validated against live SERP at activation
  per doc 90 §9.
- DOES NOT EXIST in any form — no draft, stub, or route — before Gate 4.
- Note: doc 90's aside listing "extreme cleaning / move-out / post-construction"
  as current-scope URLs is stale relative to this sitemap; THIS doc is the
  architecture authority for current scope. Log any future page proposal from
  that list through normal governance, not doc 90.

**ABOUT `/about/`**
- Primary: brand queries (aseptaclean, aseptaclean reviews, who owns aseptaclean)
- Title: `About Aseptaclean | Founder, Standards & Insurance | San Jose`
- Meta: `Founded by Matthew Ruiz — a controlled-process background from pharmaceutical
  manufacturing and surgical pathology, applied to property cleanouts. Insured,
  owner-operated, documented.`
- Contents: founder story, credentials block, authority-limit disclaimer VERBATIM,
  insurance statement, the standard's origin quote. E-E-A-T page — attorneys will
  read this before referring. Person schema (Matthew Ruiz) linked to LocalBusiness.

**CONTACT `/contact/`**
- Primary: aseptaclean contact / phone (brand-nav intent)
- Title: `Contact Aseptaclean | South Bay & Peninsula`
- Contents: phone (public number — same everywhere, NAP law), email, service-area
  list, hours, response promise, form component, and clear service-area information. Do not
  embed a Google Map or imply a customer-facing storefront. This is the GBP
  website-field landing candidate alongside /.

**HANDOFF STANDARD `/handoff-standard/`**
- Primary: (seeded term) property handoff record · aseptaclean handoff standard
- Title: `The Aseptaclean Handoff Standard | Five Stages, One Record`
- Contents: five-stage method in full, complete annotated sample Handoff Record,
  what each record field protects, who relies on it (family / executor / attorney /
  PM). The citable "our standard" URL for letters and referrers. Fixes the live
  footer link. Breadcrumb schema; `FAQPage` only under the sitewide conditional rule above.

**SENIOR DOWNSIZING `/senior-downsizing-san-jose/`**
- Primary: senior downsizing services san jose
- Secondary: downsizing help for elderly parents, assisted living move cleanout,
  senior move cleanout, downsizing a parent's home bay area
- Title: `Senior Downsizing & Move-Out Support | San Jose | Aseptaclean`
- Meta: `Respectful downsizing support when a parent moves — sorting, set-aside
  controls, clearing, and cleaning under one signed scope. South Bay & Peninsula.`
- Tone delta: NOBODY DIED. A parent is moving. Hope-forward, not grief-forward;
  the parent may read this page themselves — write it so that is safe.
- Referral tie: the page senior-move managers need to see before sending clients.
- Schema: Service + Breadcrumb; `FAQPage` only under the sitewide conditional rule above.

**SERVICE AREAS HUB `/service-areas/`**
- Primary: property cleanout near me (adjacent) · aseptaclean service area
- Title: ~~`Service Areas | San Jose & Santa Clara County | Aseptaclean`~~ **VOID — do not
  restore.** Owner ruling B2 (2026-08-20) strikes every "Santa Clara County" service-area claim
  sitewide: the 10-city footprint contains Atherton, which is in San Mateo County, so the label
  is factually wrong wherever it appears. **This title is the one place B1 and B2 collide** —
  B1 restores divergent titles to this section verbatim, and doing that here would reintroduce
  the exact string B2 removes. B2 wins on facts, and this title was therefore NOT restored.
  The shipped title stays `South Bay & Peninsula Service Area | Aseptaclean`
  (`src/data/doc27CompanyPages.ts`), which already carries the ruled NAP wording.
  Reported to the owner rather than resolved silently — see `docs/05-DECISIONS-LOG.md`.
- Contents: South Bay & Peninsula framing paragraph, 10-city pill grid, one short paragraph per area
  cluster (San Jose core / West Valley: Campbell–Los Gatos–Saratoga adj. / North County: Sunnyvale–Mtn View–Santa Clara / Peninsula: Los Altos–LAH–Palo Alto–Atherton), links down to city pages
  as they exist. Parent for all Phase 3c pages.

**CITY PAGES — two tiers, both BUILT 2026-08-21**

```
/service-areas/[city]/              city hub          — 3 built
/service-areas/[city]/[service]/    service × city    — 6 built
```

- Built cities: `mountain-view` · `sunnyvale` · `campbell`
- Built services: `hoarding-cleanup` · `estate-cleanout` — the 3 × 2 grid is complete
- Identity as built, city hub: H1 *"Property Cleaning & Complex Cleanup in {City}"*, title
  *"{City} Property Cleaning & Complex Cleanup | Aseptaclean"*
- Identity as built, service × city: H1 *"{Service} in {City}"*, title
  *"{Service} in {City} | South Bay & Peninsula | Aseptaclean"* — the primary query is the
  service-plus-city term (*estate cleanout mountain view*), which is the reason this tier exists
  and the reason San José is deliberately absent from it
- Nested under `/service-areas/` (updated from root-level slugs). Any `/locations/*` route
  remains forbidden.
- All nine ship `noindex, follow` and are outside `sitemap.xml`. One gate remains: **owner
  confirmation of city availability.** Every automated gate passes — `npm run qa:seo` reports
  9/9 clean.
- Generated from data, never hand-authored: `src/data/cityHubPages.ts`,
  `src/data/serviceCityPages.ts`, `src/data/cityFacts.ts`,
  `src/data/serviceCityImplications.ts`. A new city is a record, not a file.
- Priority for the next cities: Atherton and Los Altos Hills — highest estate tickets and the
  densest Track B fiduciary referral market in the Bay Area. **Palo Alto is legally blocked**
  until Public Works confirms (doc 25 §7). This priority no longer waits on jobs; it waits on
  verified city facts and owner availability confirmation.

> ### The hard gate on this entry is superseded — 2026-08-21, owner ruling
>
> **The former rule, verbatim, kept as the historical record:**
>
> > *Hard gate: ≥1 completed job in that city + 150–250 words that could only be about that
> > city + one anonymized real-job specific. No verified original content → no page.*
>
> That gate was authored when the project had no city data layer, no sourced-fact model, and no
> automated quality gate. A completed job was the only proxy available for "this page is about a
> real place." Those controls now exist, so the proxy is replaced by what it stood for.
>
> **A local page may now launch with no prior Aseptaclean job history in that city** when it
> carries all seven of:
>
> 1. **Verified city facts** — named publisher and source URL, in `cityFacts.ts`.
> 2. **Service-specific local implications** — what each fact changes for *this* service at
>    *this* address, in `serviceCityImplications.ts`, each declaring its `basis`.
> 3. **No fabricated experience claims.** Absolute, and it outranks the other six. No job count,
>    no anonymized project, no review, rating, or proof image. `AGENTS.md` §0.3 is unchanged.
> 4. **Proper internal links** — up to the parent service page, across to the city hub, and at
>    least one inbound link from an existing page.
> 5. **Unique useful copy** — unique H1, title, meta, and body that survives the doc 25 §2 swap
>    test. A template wearing a city's name still does not ship.
> 6. **Applicable source and freshness controls** — `verifiedAt` and `reviewAfter` on every
>    fact; a fact past `reviewAfter` blocks indexation until reverified.
> 7. **Passing SEO quality gates** — `npm run qa:seo` clean for that route, measured against
>    `dist/`, not source.
>
> **The word-count and swap-test half of the old gate survives and is stricter, not looser.**
> Only the *completed-job* prerequisite is lifted. Doc 25 §6's 400-word minimum of genuinely
> city-specific prose governs; the 150–250 figure above is superseded by it.
>
> **Real completed projects remain a future proof-enhancement layer, not a prerequisite for the
> route to exist.** Doc 25 §6's REAL PROJECT row and §3.3's REAL JOB row below become optional
> enrichment, added when a real job produces documentable, owner-approved material. Their
> absence is not a defect. Inventing them is still §0.3 fabrication.
>
> **This does not override `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §7** (rank 3), which still
> makes every city page a licensing decision before it is an SEO decision.
>
> Full ruling: `docs/05-DECISIONS-LOG.md`, 2026-08-21.

**QUESTION POSTS `/questions/…`** — first two, in order:
- `/questions/estate-cleanout-cost/` — Primary: how much does an estate cleanout
  cost. Answer honestly with the approved driver framework and the $195 assessment fee;
  do not publish a generalized range or starting investment. Highest-volume informational query in
  the category; links to estate page.
- `/questions/junk-removal-vs-estate-cleanout/` — intercepts hauler-term searchers,
  educates the difference (scope, approval controls, documentation, cleaning),
  funnels upward to estate page. Never disparages haulers — ring B are partners.

**Linking rules:** homepage ↔ service pages (cards + breadcrumbs). /service-areas/
→ down to city hubs; city hubs → down to their service × city pages; every city page
→ up to its parent service page. ~~never sideways~~ — **amended 2026-08-21.** One sideways
link is permitted and built: a service × city page links to its **sibling service in the same
city** (estate ↔ hoarding in that city). It is not permitted across cities, which is what the
original rule existed to prevent — a lattice of city-to-city links is the doorway-page pattern.
Parent service pages link back down through neutral local-planning blocks that do not assert
availability; those links are derived from built records, so a city dropped to `draft` loses its
link in the same change.
/questions/ posts → service pages. Checklist ← estate page + footer + every letter.
/handoff-standard/ ← footer + estate/PM fiduciary blocks + letters. /about/ ←
founder section "More about the operator →". Anchor text = target page's primary
term or a natural sentence; never "click here."

**Redirect law:** at DNS cutover, every indexed WordPress URL 301s to its nearest new
equivalent. Pull the list from GSC + `site:` operator before cutover. Line item on
`04-RELEASE-CHECKLIST.md`.

---

## PART 3 — WIREFRAMES

### 3.1 Homepage — BUILT
`docs/30-WEBSITE-MASTER-SPEC.md` and the approved homepage page brief are the future
implementation authorities. The archived `aseptaclean-FINAL-v2.html` is historical visual
evidence only and must not be ported verbatim. A previously proposed discretion line was:
*"Unmarked assessment · no photographs shared without permission"* — VERIFY the
vehicle is actually unmarked before shipping the word "unmarked."

### 3.2 Service page template
```
[Ribbon / Nav — shared components]
COMPACT DARK HERO (~55% homepage hero height)
  eyebrow: {SERVICE} · ~~SAN JOSE & THE SOUTH BAY~~ SOUTH BAY & PENINSULA
           (struck 2026-08-20 — owner ruling B2 sets ONE service-area string
            sitewide, "South Bay & Peninsula", ampersand and never "and". An
            explicit owner decision is rank 2 and outranks this document's
            rank 6. All 14 service-page eyebrows now carry the single string.)
  H1 in buyer's words (never brand vocabulary)
  lead: 2 lines, recognition-first
  [Tell Us About the Property →] [Call Aseptaclean]   + approved trust controls
RECOGNITION      H2 to the actual searcher; 2 short paras; dignity-first
SCOPE            "What this covers" ✓-list + link to exclusions
FIDUCIARY BLOCK  (estate & PM pages only) H2 "For executors, attorneys, and
                 property managers" — liability, documentation, single
                 accountable party, Record excerpt
METHOD           5 stages condensed to 5 rows w/ record tags
PROOF            Handoff Record excerpt + ONE anonymized real-job line
PRICING HONESTY  drivers + $195 assessment credit (no invented figures)
FAQ              4–6 in searcher phrasing; structured data only with a current semantic need,
                 never solely to pursue a deprecated FAQ rich result
FORM PANEL       same component as homepage (#request)
[Footer — shared]  · 900–1,200 words total · Breadcrumb schema
```
Per-page tone deltas: ESTATE = grief-aware, decision-relief ("you don't have to
decide everything today"). HOARDING = shame-disarmament, family-addressed, zero
clinical labels for the person. ANIMAL = matter-of-fact dignity; hardest-shame
buyer; lead with "we have seen worse and we don't judge" energy without saying it.

### 3.3 City page template

**Amended 2026-08-21 — the built template supersedes the sketch below.** Two tiers ship, not
one, and the REAL JOB row is now optional enrichment rather than a required section. See §2.2.

**City hub — `/service-areas/[city]/`, as built**
```
Compact hero: breadcrumb · H1 "Property Cleaning & Complex Cleanup in {City}"
INTRO             what the address changes
LOCAL PLANNING    verified city facts, each rendered WITH its source link
FEATURED          cards to that city's own service pages (parent link as fallback)
SERVICE AREA      surrounding-cities context
FORM · CTA
Schema: CollectionPage + BreadcrumbList
```

**Service × city — `/service-areas/[city]/[service]/`, as built**
```
Compact hero: breadcrumb · H1 "Estate Cleanout in {City}"
OPENING           shared service opening + container-coordination policy
SCOPE AND FIT     read from the parent San Jose service record, not re-authored
LOCAL PLANNING    verified city facts, each rendered WITH its source link
WHAT THIS CHANGES service-specific implications, keyed to those facts
PROCESS           four steps
FAQ               3 city-specific, schema-matched verbatim in both directions
LINKS             sibling service in this city · parent service page · city hub
FORM · CTA
Schema: Service + BreadcrumbList; add FAQPage only with a current semantic justification,
never solely to pursue a deprecated rich result
```

**Two deltas from the original sketch, both deliberate:**

- ~~`REAL JOB — one anonymized specific from the actual job there`~~ — **optional enrichment,
  not a required section.** Superseded 2026-08-21; the route does not wait on it. Adding a
  fabricated one is `AGENTS.md` §0.3 fabrication and is never permitted.
- ~~`150–250 words`~~ — superseded upward by doc 25 §6's **400-word minimum** of genuinely
  city-specific prose.

**A verified fact is never rendered without its source link.** Facts live in `cityFacts.ts` with
a publisher, URL, `verifiedAt`, and `reviewAfter`; the operational conclusions drawn from them
live separately in `serviceCityImplications.ts`. Do not merge the two — a fact can be reverified
against its source and an inference cannot, and mixing them produces a page where the difference
is invisible.

**Original 2026-08-09 sketch, kept as the historical record:**
```
Compact hero: H1 "Estate Cleanout in {City}"
LOCAL REALITY   150–250 words possible only for this city (neighborhoods worked,
                housing stock, disposal/transfer-station logistics)
REAL JOB        one anonymized specific from the actual job there
SERVICES        3 cards linking UP to service pages
AREAS           existing pill component
FAQ (2–3 city-specific, schema) · FORM
```

### 3.4 Thank-you page `/thank-you/`
Confirms receipt · restates "one business day" · sets expectation ("have photos
ready if you can") · conversion event fires here · no nav-away CTAs.

### 3.5 About page
Compact dark hero: eyebrow THE OPERATOR · H1 "The person defining the work stays
accountable for how it's carried out." → founder portrait + story (3–4 short paras:
pathology/pharma → why this business) → credentials rows (existing component) →
authority-limit disclaimer verbatim → insurance line → the standard-origin quote →
link block: Handoff Standard / Services / Contact → form panel.

### 3.6 Contact page
Compact hero: H1 "Contact Aseptaclean" → two-column: [phone, email, hours,
response promise, service-area pills] ∥ [form panel] → service-area information → NAP block
matching GBP exactly.

### 3.7 Handoff Standard page
Compact hero: H1 "The Aseptaclean Handoff Standard" → five stages FULL version
(homepage shows condensed) → the complete sample Record, annotated: each field
gets a one-line "what this protects" note → "Who relies on this" 4-up (family /
executor / attorney / property manager) → CTA. This is the page letters cite.

### 3.8 Branded 404
Ribbon/nav/footer intact · "That page isn't here." · three links: Home, Services,
Contact · form panel omitted · logs 404 path to analytics for redirect patching.

---

## PART 4 — HISTORICAL TRIAGE QUIZ SPEC (CANCELLED; DO NOT BUILD)

**Owner decision 2026-08-20, reaffirmed 2026-08-25:** `/assessment/` is cancelled. The material
below is historical product exploration only. Do not create a route, draft, link, sitemap entry,
or GBP booking destination from it. The approved conversion route remains
`/request-assessment/`, with a future situation-first architecture governed by doc 30 and an
approved page brief.

Questions (plain words, one screen each):
1. How full is the property? — A lived-in, needs deep cleaning · B heavy in places
   · C most rooms hard to use · D not sure, haven't been inside recently
2. Is there a deadline? — listing/sale · transfer/tenancy · inspection · none/not sure
3. Any animal or organic conditions? — yes · no · not sure
4. Who can approve decisions? — just me · shared/family · court-appointed · unsure

Result logic (gated on name + phone):
- Q1 A + any → **Deep Cleaning likely fits** (or reset-cleaning path pre-B10)
- Q1 B/C → **Full Handoff Reset likely fits**
- Q3 yes/not-sure → append endorsed animal/organic-cleaning line
- Q1 D or Q4 unsure/court → **On-site assessment recommended first** ($195, credited)
- Any deadline selected → result includes "tell us the date on the call"

Result page = 3 lines: the likely path, what happens next, the one-business-day
promise. No diagnosis language, no condition labels for people, no price quotes.
`01` governs result copy. Lead arrives pre-qualified with all four answers attached.

---

## PART 5 — GBP SETUP SPEC

- Entity: service-area business (address hidden). areaServed = San Jose, Mountain
  View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos,
  Palo Alto, Atherton (+ surrounding). Note: Atherton = San Mateo County — GBP
  service area and all copy use "South Bay & Peninsula" framing, not county-only.
- Primary category: match whatever the top-3 Map Pack results for "estate cleanout
  san jose" use (likely House Cleaning Service or Junk Removal Service). Record the
  choice + date here when made: ______.
- Secondary categories: every honest fit (house cleaning, junk removal if chosen
  secondary, etc.). Never aspirational categories (no biohazard until certified).
- Services listed = site page names verbatim, each with 2–3 sentence description in
  guardrail-compliant wording.
- Description (750ch limit) draft: "Aseptaclean provides whole-property cleanout and
  deep cleaning for estate, hoarding, and severe-condition properties in San Jose and
  the South Bay. Written scope before any work, nothing removed without approval, and
  a documented closeout on every project. Owner-operated and insured."
- Photos: logo, founder, vehicle, kit flat-lay at open; then 2–3/wk cadence.
- Booking link → the current approved conversion destination. Do not use the cancelled
  `/assessment/` route. UTM-tag the approved destination.
- Reviews: script in §1.5. Respond to all <24h, personally, no AI-paste tone.

---

## PART 6 — EXECUTOR'S CHECKLIST CONTENTS (the asset)

One printed page / one web page. Sections + representative items (full copy drafted
at build time, guardrails applied):
1. **Before anything is touched** — confirm authority to act; photograph every room
   as-found; locate will/trust docs, keys, deeds, titles; secure the property.
2. **Legal & authority** — who can approve disposal; notify co-heirs in writing;
   check for liens/code notices; utilities decision.
3. **Sort–decide–document** — keep/review/remove framework; set-aside list (documents,
   photos, jewelry, keys, cash); never discard "unsure" items; written record of
   every decision.
4. **Choosing a vendor** (neutral — this section earns the links) — insist on written
   scope; ask what is excluded; ask how discovered valuables are handled; ask what
   documentation you receive at closeout; confirm insurance.
5. **Closeout** — completion photos; exception list; final walkthrough; records
   retained with estate file.
Footer: sample Handoff Record thumbnail + soft CTA. No hard sell anywhere in the
body — the neutrality is what makes attorneys hand it out.

---

## PART 7 — MEASUREMENT & SCOREBOARD

**Tooling:** GSC (site + sitemap submitted day 1) · GA4 with form-submit and
tel-click events · call tracking = at minimum GBP's native call reporting + LSA's
built-in; add a tracking number ONLY as a forwarding layer that never breaks NAP
(use one primary public number everywhere; tracking numbers on ads only, never on
the site/GBP). UTM discipline on GBP booking link and LSA.

| Window | Ships | Success = |
| --- | --- | --- |
| D1–14 | Site live incl. /about/ /contact/ /handoff-standard/ 404 · schema valid · GBP complete · citations done · 301s verified · GSC/GA4/call events on · answering live | GBP verified; 0 broken redirects; 0 dead internal links; events firing |
| D15–45 | LSA on · 20 letters out + follow-up calls · first reviews · Estate + Hoarding drafts from real call notes | 5+ reviews · LSA <$150/call · 2+ referral conversations |
| D46–90 | Estate, Hoarding, Animal pages + Checklist live · first city page if a job supports it | 10+ reviews · Map Pack for brand + 1 service term · GSC impressions trending up |

Rankings at d90 = noise. Impressions climbing = the compounding has started.
Rankings follow months 4–9.

**Standing rules:** (1) Nothing in Phases 3–4 ever blocks Phase 1 revenue activity.
(2) No page, schema block, GBP field, or letter ships copy that outruns a credential,
a crew, or a contract. (3) `01-QUALITY-GUARDRAILS.md` governs every word in this
system, including structured data and third-party profiles.
