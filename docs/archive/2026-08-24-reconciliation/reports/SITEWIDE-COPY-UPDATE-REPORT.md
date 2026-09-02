# Sitewide Copy Update — Positioning Reconciliation

**Date:** 2026-08-21. **Scope:** customer-facing copy only. No routing, data-model, form-logic or
design change. **Basis:** owner instruction (precedence rank 1), reconciled against
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` (rank 2), `docs/20-COPY-VOICE.md`,
`docs/city-service-data-UPDATED.md` and `docs/city-pages-part2-UPDATED.md`.

The code was the implementation truth and the code is what changed. No replacement-copy markdown
file was produced in place of editing the site.

---

## 1. The positioning change in one line

The site described a cleanout company with cleaning attached. It now describes what the business
actually is:

> **Specialty property cleaning and complex cleanup** — properties that need more structure,
> detail, or condition-specific planning than routine cleaning.

That umbrella is not new. It is the wording of the three owner-approved city hubs in
`docs/city-pages-part2-UPDATED.md` ("Property Cleaning & Complex Cleanup in {city}"), which the
rest of the site had not caught up to.

---

## 2. Pages changed

| Route | What changed |
| --- | --- |
| `/` | SEO title, meta description, hero eyebrow, H1, hero lead, three service-family cards (retitled + reordered), service-card section heading and lead, confidence/fit lead and both panel footers, included/excluded scope lists, Clear-stage detail, pricing explanation, three FAQ answers, one new FAQ, final CTA heading and body |
| `/property-clearing/` | Category renamed to **Complex Property Cleanup** (label only), title, meta, H1, lead, breadcrumb, breadcrumb schema, coverage-block heading and body |
| `/services/` | Meta description, section H2, intro, all three pillar titles/details/link sets |
| `/detailed-cleaning/` | Meta description, hub lead |
| `/specialty-cleaning/` | Meta description, H1, lead |
| `/debris-removal-san-jose/` | Lead, outcome heading, outcome body, `workIncludes`, boundaries, all FAQs (one added), hero pledge, pricing heading and lede, scope note, two section headings |
| `/property-cleanouts-san-jose/` | `workIncludes`, boundaries, both FAQs, hero pledge, scope footer, pricing heading and lede, eyebrow |
| `/hoarding-cleanup-san-jose/` | `workIncludes`, hero pledge, scope footer, pricing heading and lede, eyebrow |
| `/estate-cleanout-san-jose/` | `workIncludes`, hero pledge, scope footer, pricing heading and lede, eyebrow |
| `/deep-cleaning-san-jose/` | Hero pledge, scope footer, pricing heading and lede |
| `/move-out-cleaning-san-jose/` | Hero pledge, scope footer, pricing heading and lede |
| `/extreme-cleaning-san-jose/` | Hero pledge, scope footer, pricing heading and lede |
| `/eviction-cleanout-san-jose/` | Eyebrow; visible launch-gate banner removed |
| `/about/` | Title-adjacent meta description, H1, lead |
| `/faq/` | One new question — "Are you a hauling company?" |
| `/service-areas/` | Meta description, section H2 |
| `/private-residence-reset/` | One line in the "separately scoped" list |
| 6 × `/service-areas/{city}/{service}/` | Hero pledge now inherits the parent service's own line instead of a shared hardcode |
| `/post-construction-…/`, `/window-…/`, `/animal-waste-…/`, `/rodent-…/`, `/pigeon-…/`, `/commercial-…/` | Visible launch-gate banner removed |
| Every route | Footer tagline; nav and footer category label "Property Clearing" → "Complex Property Cleanup"; Debris Removal nav one-liner |

---

## 3. Source files changed

| File | Role |
| --- | --- |
| `src/data/site.ts` | Offer category, three homepage service cards, Clear-stage detail, included/excluded scope, `megaNav` group label + hub blurbs + one child note |
| `src/data/doc27ServicePages.ts` | Interface doc for five new `section` keys; eyebrows on five records; debris/cleanouts/hoarding/estate body copy; per-page overrides on all seven indexable records |
| `src/data/doc27CompanyPages.ts` | About H1/lead/meta, service-areas H2/meta/publishing note, new `/faq/` question |
| `src/data/servicePages.ts` | Three hub H1s/leads/eyebrow, `servicesHub` intro + pillars, `hubClose` body, service-areas intro, debris one-liner |
| `src/layouts/ServicePageLayout.astro` | Five hardcoded strings became overridable; visible gate banner removed; `.gate-note` CSS deleted |
| `src/components/Hero.astro` | Eyebrow, H1, lead |
| `src/components/ServiceCards.astro` | Section heading/lead; link maps rekeyed to the new card titles |
| `src/components/ConfidenceAndFit.astro` | Section lead, fit line, both panel footers |
| `src/components/Pricing.astro` | Pricing explanation |
| `src/components/FAQ.astro` | Three answers rewritten, one question added |
| `src/components/FinalCTA.astro` | Heading and body |
| `src/components/Footer.astro` | Tagline |
| `src/pages/index.astro` | Title, meta description |
| `src/pages/{property-clearing,services,detailed-cleaning,specialty-cleaning}/index.astro` | Titles, metas, headings, crumb, breadcrumb schema |
| `src/pages/{debris-removal,eviction-cleanout,property-cleanouts,estate-cleanout,hoarding-cleanup}-san-jose/index.astro` | `groupName` prop |
| `src/pages/service-areas/[city]/[service].astro` | Pledge reads from the parent service record |
| `src/pages/private-residence-reset.astro` | One list item |
| `docs/27-COPY-CANONICAL.md` | 15 superseded strings struck with inline reasons + replacements |
| `docs/27-SECTION-9-15-CONNECTIVE-COPY.md` | Footer tagline struck with reason + replacement |
| `docs/05-DECISIONS-LOG.md` | Full ruling appended |

---

## 4. Major positioning changes

### 4.1 The homepage stopped selling paperwork

The H1 was *"Complex properties returned to a controlled, documented condition."* — a sentence
about a document, in a register nobody speaks. It is now **"Some properties need more than a
routine cleaning."**, with the service terms moved into the lead so no keyword was lost.

The strongest existing ideas are all still on the page and in the same positions: the written
scope before work, the untouched pledge *"Nothing leaves the property without your written
approval."*, the Handoff Assurance, the five-stage standard, the sample record, owner
accountability. What changed is that they now support the result instead of being the offer.

### 4.2 Cleaning leads, cleanup follows

The three homepage cards were `Complex property clearing` → `Reset & restoration cleaning` →
`Animal & organic`. They are now `Detailed cleaning` → `Complex property cleanup` →
`Animal & organic condition cleaning`. Same three cards (doc 18 §6.1), same three image slots and
imagery policies, new order and two new titles. `/services/` follows the same set.

### 4.3 "Property Clearing" → "Complex Property Cleanup" — label only

**Recommendation taken: rename the visible label, keep the URL.** `/property-clearing/` is
unchanged — same route, same canonical, same sitemap entry, same inbound links, no redirect added
because nothing moved. Changed: nav group, footer column heading, hub H1/title/crumb, breadcrumb
schema, and the eyebrow on five service pages.

"Property clearing" survives as a *concept* in body copy, in the hub lead, and verbatim in
`legal.scopeDisclaimer`, which is claims-mandated and was not touched.

### 4.4 The hauling boundary is now unmistakable and stated four times, not forty

Aseptaclean may sort, bag, stage, clear rooms, load an approved container, coordinate the
city-authorized provider, coordinate placement and disposal requirements, and clean afterwards.
It does not transport debris off-site. That distinction is now stated plainly on the four surfaces
where a buyer actually asks:

- `/` — the excluded-scope list ("Hauling debris off the property — an authorized provider does
  that") and a new FAQ, *"Do you haul the stuff away?"*
- `/debris-removal-san-jose/` — in the lead, the outcome body, the hero pledge, the boundary list,
  and a new FAQ, *"So who actually hauls it away?"*
- `/property-cleanouts-san-jose/` — the FAQ *"Do you haul everything away yourself?"* previously
  answered without saying yes or no; it now starts with **"No."**
- `/faq/` — a new question, *"Are you a hauling company?"*

Hoarding and estate carry it once each inside `workIncludes`, not as a disclaimer. Nothing was
plastered into every paragraph.

**Nothing legitimate was removed.** Property clearing, cleanouts, contents removal from rooms,
dumpster coordination, disposal coordination and container loading are all still described — in
more detail than before, because the on-site work is most of the job and the copy had been
compressing it into the single word "clearing".

### 4.5 Template repetition cut where it mattered

Four sentences were hardcoded in `ServicePageLayout.astro` and therefore printed identically on
all fourteen service pages; two of them also appeared verbatim on `/`. They are now overridable
through the `section` record that already existed, with defaults preserved.

| String | Before | After |
| --- | --- | --- |
| Hero pledge | 14 service pages + 6 city pages | 7 gated pages only |
| Scope-panel footer | 14 | 7 gated pages only |
| "The quote comes from the property, not a package." | 14 | 7 gated pages only |
| "Photos may support an initial range…" | 14 + `/` | 7 gated pages only |

Every indexable service page and all six service × city pages now say these in their own words.
The seven pages still inheriting defaults are the `noindex` gated set — correct, and deliberately
not padded with copy invented to differentiate a page nobody can reach.

Also de-duplicated: the `/detailed-cleaning/` lead (restated its own H2 eleven lines later), the
`hubClose` body (third rendering of the photos-then-walkthrough pair), and `/services/`'s H2
(would have near-duplicated the retitled `/` heading one click away).

### 4.6 Visible internal copy removed

Six gated service pages rendered a pink banner reading **"LAUNCH GATE — not for publication:"**
followed by internal crew-capacity and compliance-release notes, as real public HTML — highest-risk
inconsistency #1 in `CURRENT-BUILD-AUDIT.md`. The banner is gone from all seven affected routes.

Gating is unchanged: `page.gate` still drives `indexable`, still keeps each route out of
`sitemap.xml`, and now emits as an HTML comment so a developer reading source still sees why.

---

## 5. Old copy removed or replaced

Fifteen strings were doc-27-approved copy. Rather than delete them, each is struck in place in
`docs/27-COPY-CANONICAL.md` / `docs/27-SECTION-9-15-CONNECTIVE-COPY.md` with the replacement and a
reason, per that document set's existing strike convention — which is why `npm run qa:gate6` passes
rather than reporting fifteen missing approved strings.

| Removed | Replaced with | Why |
| --- | --- | --- |
| "Complex properties returned to a controlled, documented condition." (×2 — positioning statement and hero H1) | "Some properties need more than a routine cleaning." | Described a document, named no service, unsayable out loud |
| "Property clearing · deep cleaning · documented closeout" | "Detailed cleaning · Complex cleanup · South Bay & Peninsula" | Named only the clearing lane |
| "Hoarding, estate and severe-condition properties—cleared, cleaned and closed out under one signed scope…" | "Deep cleaning, move-out and post-construction work, severe-condition cleanup, hoarding and estate cleanouts…" | Half the business was missing |
| "Property Cleanout & Deep Cleaning \| San Jose & South Bay \| Aseptaclean" | "Deep Cleaning & Complex Property Cleanup \| San Jose \| Aseptaclean" | Led with the narrowest lane |
| "Approved unwanted contents are consolidated, staged or coordinated for lawful disposal…" | "Approved contents are sorted, bagged, and cleared out of the rooms in the scope. When the job needs a container, we arrange it…" | "Coordinated for lawful disposal" is the self-performed phrasing doc 21 §4.3 prohibits |
| "We do not force every property into a package. Photos may support an initial range…" | "There is no package price, because there is no standard property. Send photos…" | Sentences 2–3 were the pair duplicated on all 14 service pages |
| "Removal planning for loose, non-hazardous property debris…" | "Loose, non-hazardous debris cleared out of a property… We do the clearing and the loading on site; the container and the trip to the facility come from the hauler your city authorizes." | Left the transport boundary unstated on the page most likely to be misread |
| "The quote separates labor, containers, third-party hauling and follow-on cleaning…" | "Aseptaclean is not a hauling company. We sort, bag, stage, carry out and load; a City-authorized hauler engaged for the project supplies the container and takes the material off-site…" | Substance kept, responsibility split now stated |
| "Debris removed through a defined and legal disposal plan." | "Debris gone, through a disposal route that holds up." | Plain English |
| "A controlled-process mindset for properties that need careful decisions." | "Careful work on properties where the decisions matter." | Internal vocabulary |
| "Aseptaclean is an owner-operated cleaning and property clearing business…" | "…owner-operated specialty property cleaning and complex cleanup business…" | Positioning of record |
| "Start with what you know. We will help define the rest." / "Tell us what you are looking at, what must remain…" | doc 20 Part 2's own approved contraction rewrites, incl. the photo sentence the build had dropped | Approved 2026-08-09, never applied |
| "Work stops on that item… explain which qualified provider is needed" | "…tell you which qualified provider is needed" | Spoken register |
| Footer tagline "Property clearing, detailed cleaning, and documented closeout for the {region}." | "Specialty property cleaning and complex cleanup for the {region}." | "Property clearing" led the tagline on all 46 routes |

Also replaced, with no doc 27 source: the confidence/fit lead (three fears stated at the reader —
the fear-based construction the brief rules out), the homepage's 120-word hoarding FAQ answer that
inlined the entire exclusion list mid-sentence, `serviceAreasPage.h2` ("Start with the property—not
a city-page promise.", which argued against three city pages the same route links to), and
`/private-residence-reset/`'s "Hauling or disposal" line under a heading reading "Separately scoped
or outside the offer".

---

## 6. Deliberately left unchanged

| Item | Why |
| --- | --- |
| Every URL, redirect, canonical, sitemap entry | This was a copy pass. Sitemap still 23 URLs; 46 routes; 22 `noindex` — identical to `AGENTS.md` §2 |
| `legal.scopeDisclaimer`, `documentationDisclaimer`, `founderAuthorityLimit` | Verbatim-mandatory, doc 21 §2.3/§2.4/§6 |
| "Cleaning only — not a decontamination, sterilization, or health-safety determination." | Verbatim-mandatory. Verified byte-identical on all five surfaces that carry it |
| "Nothing leaves the property without your written approval." | doc 20 rule 7 untouchable. Reused verbatim as the hoarding hero pledge |
| The six Handoff Assurance items | doc 20 rule 7 — guarantee terms, restructure around, never reword |
| `/sms-notification-consent/` | Byte-preserved under active Twilio 10DLC carrier review |
| Consent, Turnstile, form-field and error copy | Form logic and 10DLC-relevant strings out of scope |
| The six routing doors on `/` | doc 27 §1, owner-approved verbatim 2026-08-20, and already the buyer's own words |
| `/handoff-standard/`, `/estate-cleanout-checklist/`, `/who-we-help/`, `/contact/`, `/projects/`, legal pages | Not implicated by the positioning change; the checklist is owner-ruled copy from 2026-08-20 |
| Animal waste, rodent-dropping and pigeon-dropping pages | Untouched apart from the gate banner. Confirmed still present, still linked from `/specialty-cleaning/`, mandatory clause intact. No human-biohazard or remediation language introduced |
| Template defaults on the seven gated pages | Differentiating unreachable pages would mean writing copy to fill slots |
| The `$195` figure and its framing | Only published figure; owner-approved verbatim 2026-08-20 |

---

## 7. Verification

| Check | Result |
| --- | --- |
| `npm run check` | **PASS** — 0 errors, 0 warnings, 4 pre-existing hints |
| `npm run build:local` | **PASS** — 48 built, 46 emitted after dev prune |
| `npm run qa:seo` | **PASS** — 0 errors, 0 publish blockers, 9/9 city routes clean |
| `npm run qa:gate6` | **PASS** — 0 approved strings absent (was FAIL — 15) |
| One H1 per page | **46/46** |
| Metadata | Title, description, canonical, robots, OG present on every page except the two documented exemptions |
| Title / meta / H1 uniqueness | **46 distinct of 46**, zero duplicates in each |
| Internal links | **Zero broken** across all 46 pages |
| Hauling claims | Every transport-verb sentence attributes transport to the authorized provider. Zero self-performed claims |
| Fabricated experience | **Zero** matches against the city-guard pattern set, run sitewide |
| Banned claims vocabulary | Every hit is inside a mandated negation or a scope exclusion — the permitted use under doc 21 §2.2 |
| Visible gate / dev copy | **Zero** matches for "not for publication", "LAUNCH GATE", "Page in development", "UNPUBLISHED", "OWNER INPUT", "REPLACE_WITH" |
| Route architecture | 46 routes, 23 sitemap URLs, 22 `noindex` — unchanged |
| Typography | No `font-size` added by this pass; no heading markup changed |
| Aphorism cap (doc 20 rule 2) | `/` now at 1, was heading for 2 |

---

## 8. Unresolved / for the owner

1. **The rename is a copy decision with an SEO tail.** `/property-clearing/` keeps its URL, so
   nothing breaks — but the visible label and the slug now differ. If the owner prefers the URL to
   follow, that is a separate routing change with a redirect, and should not be bundled into a copy
   pass.
2. **`/services/` links to two `noindex` routes** (senior downsizing, animal waste) from an
   indexable page. Pre-existing, unchanged by this pass, and tracked as register item P2.
3. **The seven gated service pages still inherit all four template defaults.** Intentional. Each
   needs its own copy at the moment its gate clears, not before.
4. **`homepage.whyAseptaclean`, `qualification`, `contrast`, `founderCredentials` and
   `offer.category` have no consumer in `src/`.** `offer.category` was corrected anyway;
   the other four were left as-is. They are dead data, not shipping copy — worth deleting in a
   cleanup commit rather than a copy commit.
5. **`serviceAreasPage.publishingNote` was factually stale** — it still required "real project
   proof" for city pages, a rule superseded by owner ruling on 2026-08-21. Corrected in place even
   though nothing renders it.
6. **Pre-existing aphorism density on `/handoff-standard/`** — seven "X, not Y" constructions, all
   in the record artifact's "Protects:" captions. Left alone: they are a structural table pattern,
   not prose, and that page was outside this pass.
7. **Photo slots, `/data-request/`, `/projects/`, the Private Residence Reset investment ranges and
   the retired stage names on that page** remain as `CURRENT-BUILD-AUDIT.md` records them. All are
   outside a copy-positioning pass; the investment-range conflict in particular is a pricing
   decision (`AGENTS.md` §4), not a wording one.
