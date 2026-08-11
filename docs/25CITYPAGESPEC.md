# 25 — City Page Specification

**Created 2026-08-11.** Owner decision: build city pages. This spec defines the version that
survives, because the default version does not.

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

### 3.3 One real anonymized project

One paragraph: situation, constraint, what was done, what the completion record showed. No
address, no names. This is the hardest element to fake, which is exactly why it works — and
why `19-SYSTEM-AND-SITEMAP.md` gates city pages on having actually worked there.

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

Route: `/service-areas/{city}/` — nested under the hub, per doc 19. Not root-level slugs.

```
H1            Property Clearing & Deep Cleaning in {City}
Opening       2–3 sentences on what this page covers. No "proudly serving."
Local reality Disposal, permits, hauler rules for this city — §3.1
Property stock What the housing here actually is, and what that changes — §3.2
Project       One anonymized job in this city — §3.3
Services       Links to the service pages. Do not restate them.
Local FAQ      3–5 questions, city-specific — §3.4
Nearby         2–3 adjacent cities, in a sentence, not a list
CTA            Request an assessment
```

**Unique per page:** title, meta description, H1, opening, local reality, property stock,
project, FAQs. **Shared:** the service links, CTA, header, footer.

**Minimum 400 words of genuinely city-specific prose.** Under that, do not ship it.

---

## 7. Sequencing

Doc 19's priority when jobs allow: **Palo Alto, Atherton, Los Altos Hills** — highest property
values, lowest price sensitivity. Palo Alto is legally blocked, so it drops out.

**Ship two or three. Not ten.** Prove they rank and convert before scaling. Ten pages built on
an unproven pattern is ten pages to fix.

Order:
1. **San José** — largest market, disposal rules fully researched, and the city you actually
   operate in
2. **Santa Clara** — the exclusive-franchise story is the single most differentiated piece of
   content available, and it is genuinely useful
3. **Los Altos Hills** or **Atherton** — highest value, once a job exists there

Everything else waits on a completed job in that city.

---

## 8. Before any of them ship

- [ ] Swap test run on each page — five statements must become false
- [ ] Word count ≥400 of city-specific prose
- [ ] No standalone neighborhood or landmark list anywhere
- [ ] Disposal and permit claims confirmed with that city, not inferred
- [ ] `/service-areas/` hub linked from somewhere — it currently has zero inbound internal
      links while seven redirects point into it
- [ ] Unique title, meta, H1, canonical
- [ ] `areaServed` JSON-LD correct
- [ ] `21-CLAIMS-AND-COMPLIANCE-LAW.md` §8 clean
- [ ] Palo Alto absent until Public Works confirms
