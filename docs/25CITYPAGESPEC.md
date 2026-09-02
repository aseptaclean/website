# 25 — City Page Specification

**Created 2026-08-11.** Owner decision: build city pages. This spec defines the version that
survives, because the default version does not.

**Authority boundary — amended 2026-08-25.** This file governs city-page specificity,
anti-doorway quality, and publication gates only. Doc 30 governs website strategy, design,
conversion, and technical SEO. Default visible primary CTA is **Tell Us About the Property**.
Do not create `/service-areas/san-jose/`; do not embed a Google Map; and do not add or maintain
`FAQPage` schema merely to pursue a Google FAQ rich result.

> ## Status — amended 2026-08-21. The pages are built.
>
> Nine city routes exist and ship `noindex, follow`: **3 city hubs** at
> `/service-areas/[city]/` and **6 service × city pages** at
> `/service-areas/[city]/[service]/` (Mountain View · Sunnyvale · Campbell ×
> hoarding-cleanup · estate-cleanout). One gate remains, and it is owner confirmation of city
> availability — not a completed job.
>
> **§2 (the swap test), §3 (the four content angles), §4 (landmarks), and §5 (no Google Map) are
> unchanged and remain the standard.** They are why these pages are not doorway pages.
>
> **One change: the completed-job prerequisite is superseded.** §3.3's real anonymized project,
> §6's `Project` row, and §7's "everything else waits on a completed job" are **optional
> proof enhancement**, not preconditions for a route to exist. What replaced the prerequisite is
> the seven-condition model in `docs/19-SYSTEM-AND-SITEMAP.md` §2.2 and `AGENTS.md` §2.1:
> verified city facts with sources · service-specific local implications · no fabricated
> experience claims · proper internal links · unique useful copy · source and freshness controls
> · passing SEO quality gates. Each superseded passage below is marked in place and kept.
>
> **Nothing here licenses inventing a project.** The element §3.3 calls "the hardest to fake" is
> now optional precisely so that no one is tempted to fake it. See `docs/05-DECISIONS-LOG.md`,
> 2026-08-21.

---

## 1. The risk, stated once

Google's spam policies name **scaled content abuse** and **doorway pages** explicitly. A set
of pages that differ only by city name is the canonical example. They do not rank ten times —
they teach Google the domain is templated, and that judgment attaches to the whole site, not
just those pages.

The site currently has zero reviews and zero proof. It cannot absorb a quality-signal hit.

That is not an argument against city pages. It is an argument against *thin* city pages.

## 2. The swap test — the only rule that matters

> Replace the city name throughout the page. **At least five statements must become false.**

Not "sound odd." False. If a sentence stays true after the swap, it is not local content —
it is site content wearing a city's name.

A page that fails this test does not ship. Everything below exists to produce statements that
fail the swap.

---

## 3. The four content angles that actually work

### 3.1 Disposal, permits, and hauler rules — your strongest material

Every city in the service area regulates debris removal differently, the research is already
done, and **no competitor in the South Bay has this on a page.**

| City | The reality |
| --- | --- |
| **San José** | Non-exclusive franchise required for residential clean-out material and C&D debris. Only City-authorized haulers may place temporary bins. Debris box in the right-of-way beyond 72 hours needs a Public Works encroachment permit. SJMC Ch. 9.10. |
| **Santa Clara** | Mission Trail Waste Systems holds an **exclusive** franchise — the only company permitted to place debris boxes citywide, **except on industrially-zoned parcels**, where seven non-exclusive haulers may operate. Booking the wrong vendor exposes the property owner to citations. |
| **Sunnyvale** | SMC 8.16.140(c)(4) expressly exempts material removed by an *on-site clean-up contractor* as an incidental part of the service. The most permissive city in the area. |
| **Palo Alto** | PAMC 5.20.040(b) reaches anyone who undertakes to "receive, collect, remove, transport, or dispose of" refuse for a fee — the verbs are disjunctive. **BLOCKED: no Palo Alto page until Public Works confirms.** |
| **Mountain View · Campbell · Los Altos · Los Altos Hills · Los Gatos · Atherton** | Not yet researched. Each needs its own confirmation before its page ships. |

This is genuinely useful to a property manager choosing a vendor, it demonstrates operational
competence instead of claiming it, and it cannot be scraped from anywhere.

**It also fails the swap test five times over on its own.**

### 3.2 Property stock and access

Real constraints that change scope and price:

- **Sunnyvale, Mountain View, Palo Alto** — Eichler tracts. Flat roofs, atriums, radiant slab
  floors, single-pane glass, no attic. Nothing stages through an attic and floor protection
  works differently over slab.
- **Santa Clara, Campbell** — post-war ranch stock, detached garages, side-gate-only access.
  Whether a 30-inch gate is the widest path changes the whole removal plan.
- **Downtown San José** — mid-rise condos where everything moves through one elevator on a
  reserved freight window, and the debris box cannot sit on the street without a permit.
- **Los Altos Hills, Atherton** — long private drives and grade. A full-size box often cannot
  reach the door; material shuttles. That is a real line item, not a flourish.
- **Willow Glen, Naglee Park** — 1920s bungalows, narrow interior stairs, no side yard.

### 3.3 One real anonymized project — **optional as of 2026-08-21**

One paragraph: situation, constraint, what was done, what the completion record showed. No
address, no names. This is the hardest element to fake, which is exactly why it works — ~~and
why `19-SYSTEM-AND-SITEMAP.md` gates city pages on having actually worked there.~~

**Superseded.** Doc 19 §2.2's completed-job hard gate was lifted on 2026-08-21 by owner ruling.
This angle is still the strongest of the four when the material exists, and it is now a
**proof-enhancement layer**: add it to a city's pages when a real job there produces
documentable, owner-approved material. Its absence does not block the route, and none of the
nine built pages carries one. Angles §3.1, §3.2, and §3.4 do the work in the meantime, and §3.1
(disposal, permits, hauler rules) is the one carrying it — every such claim on the built pages
renders with a publisher and a source URL.

**The reason it is "hardest to fake" is the reason it must never be faked.** No invented project,
no composite, no illustrative example written as if it happened. `AGENTS.md` §0.3.

### 3.4 Genuinely local FAQs

Questions a real person types:

> "Do I need a permit to leave a debris box on the street in Santa Clara?"
> "Who is allowed to haul debris from a San José property?"
> "Can a full-size debris box reach a Los Altos Hills driveway?"

Answer them accurately. Accuracy is the differentiator; every competitor answers "we handle
everything."

---

## 4. Landmarks — the distinction that decides it

**A landmark mentioned because it explains something about the work is content. A landmark
mentioned because it is a keyword is spam.**

Fails:
> Proudly serving San José including Santana Row, the Winchester Mystery House, SAP Center,
> Japantown, and Willow Glen.

That helps nobody decide anything, and the pattern is exactly what scaled-content detection
looks for.

Works:
> Properties in the blocks around SoFA and Japantown are mostly 1920s bungalows and mid-rise
> condos. In the bungalows the constraint is usually a narrow side yard and no alley; in the
> condos it is elevator scheduling and where a debris box can legally sit.

Same geography. One is a list, the other is knowledge.

**Rule: a place name may appear only inside a sentence that says something operationally true
about that place.** No standalone lists of neighborhoods or landmarks anywhere.

---

## 5. The service-area map

**Do not embed a Google Map.**

- 300KB+ and multiple third-party requests, against a documented LCP concern
- Loads Google trackers, so it must sit behind Termly consent — meaning it does not render at
  all for anyone who declines
- **Zero SEO value.** Google cannot read an iframe's contents as page content
- It always looks like a Google Maps embed, which cuts against the restrained visual direction

**Do this instead:**

1. **Inline SVG** outline of the South Bay and Peninsula with served cities marked, in brand
   navy. Inline, not `<img>`, so the city names are real crawlable text. Under 15KB. On-brand.
   Accessible via `<title>`, `<desc>`, and a text list beside it.
2. **The text list is what ranks** — the map is for humans. Cities as real links to their
   pages once those exist.
3. **`areaServed` in the LocalBusiness JSON-LD** is the actual machine-readable service area.
   That is the map Google reads. Get that right and the visual is purely a human aid.

---

## 6. Page structure

**Amended 2026-08-21 — the architecture is two tiers, not one.** Both are nested under the hub,
per doc 19. Not root-level slugs, and never under `/locations/`.

```
/service-areas/[city]/              city hub          — 3 built
/service-areas/[city]/[service]/    service × city    — 6 built
```

Both are generated from data records (`src/data/cityHubPages.ts`, `src/data/serviceCityPages.ts`)
by two dynamic route files. A new city or service is a record. Do not hand-author a route file.

```
H1            Property Clearing & Deep Cleaning in {City}
Opening       2–3 sentences on what this page covers. No "proudly serving."
Local reality Disposal, permits, hauler rules for this city — §3.1
                → each fact rendered WITH its publisher and source link
Property stock What the housing here actually is, and what that changes — §3.2
                → only where a sourced fact supports it. Six unsourced housing claims were
                  struck from the built pages on 2026-08-21; do not reintroduce one.
Project       ~~One anonymized job in this city — §3.3~~  OPTIONAL as of 2026-08-21
Services       Links to the service pages. Do not restate them.
Local FAQ      3–5 questions, city-specific — §3.4
Nearby         2–3 adjacent cities, in a sentence, not a list
CTA            Tell Us About the Property
```

**Unique per page:** title, meta description, H1, opening, local reality, property stock, FAQs —
and the project, where one exists. **Shared:** the service links, CTA, header, footer.

**Minimum 400 words of genuinely city-specific prose. Under that, do not ship it.** This did not
change on 2026-08-21 and it is not relaxed by the project section becoming optional — a page
with no project owes those words to the other three angles, not to the template. It supersedes
doc 19 §3.3's older 150–250 figure.

---

## 7. Sequencing

Doc 19's priority when jobs allow: **Palo Alto, Atherton, Los Altos Hills** — highest property
values, lowest price sensitivity. Palo Alto is legally blocked, so it drops out.

**Ship two or three. Not ten.** Prove they rank and convert before scaling. Ten pages built on
an unproven pattern is ten pages to fix.

~~Order:~~
~~1. **San José** — largest market, disposal rules fully researched, and the city you actually
   operate in~~
~~2. **Santa Clara** — the exclusive-franchise story is the single most differentiated piece of
   content available, and it is genuinely useful~~
~~3. **Los Altos Hills** or **Atherton** — highest value, once a job exists there~~

~~Everything else waits on a completed job in that city.~~

> **Amended 2026-08-21. "Ship two or three, not ten" above is unchanged and still governs — it
> is why three cities were built and not ten.** What changed is the release condition and the
> order.
>
> **A city no longer waits on a completed job there.** It waits on verified city facts with real
> sources, service-specific implications drawn from them, unique copy that survives §2's swap
> test, correct internal links, live freshness controls, a clean `npm run qa:seo`, and owner
> confirmation of availability. Full model: `docs/19-SYSTEM-AND-SITEMAP.md` §2.2.
>
> **Built (all `noindex`):** Mountain View · Sunnyvale · Campbell. These three led because their
> disposal, container, and encroachment rules were the ones actually researched and sourced —
> the same reasoning the old order applied, run on facts on hand rather than jobs on hand.
>
> **San José has no city page and should not get one.** It is served by the city-suffixed service
> pages (`/estate-cleanout-san-jose/` and siblings); a `/service-areas/san-jose/` route would
> cannibalise the site's highest-value indexable pages. This reverses the old order's item 1.
>
> **Next, in order:** Santa Clara (the exclusive-franchise story is still the most differentiated
> content available) → Atherton or Los Altos Hills (highest value). **Palo Alto stays out until
> Public Works confirms** — legally blocked, unchanged.

---

## 8. Before any of them ship

**Amended 2026-08-21.** "Ship" now means **raise `publishStatus` to `published-index`**, not
"create the route" — a finished page may exist at `noindex` while its gate is open. Several
items below are now machine-checked by `npm run qa:seo` against `dist/` and are marked `[auto]`.

- [ ] Swap test run on each page — five statements must become false
- [ ] Word count ≥400 of city-specific prose
- [ ] No standalone neighborhood or landmark list anywhere
- [ ] Disposal and permit claims confirmed with that city, not inferred
- [ ] Every rendered fact carries a publisher, a source URL, and a `verifiedAt` — and is not
      past its `reviewAfter` `[auto]`
- [ ] Every implication resolves to a fact id, or declares `basis: "operating-model"` `[auto]`
- [ ] No fabricated experience claim — no job count, project, review, or rating `[auto]`
- [ ] ~~`/service-areas/` hub linked from somewhere — it currently has zero inbound internal
      links while seven redirects point into it~~ ✅ **DONE.** The hub is linked from 45 of 46
      built pages via the global nav and footer. Superseded by the per-route inbound-link guard:
      every city page must receive ≥1 inbound link `[auto]`
- [ ] Unique title, meta, H1, canonical `[auto]`
- [ ] `areaServed` JSON-LD correct
- [ ] `21-CLAIMS-AND-COMPLIANCE-LAW.md` §8 clean — and §7's licensing decision made for that
      city, which no script can make
- [ ] Owner has confirmed the service is actually available in that city
- [ ] Palo Alto absent until Public Works confirms
