# Restoration-category design & layout scan

**Source:** `docs/Untitled document (3).pdf` — 16 pages, image-only (no text layer), full-page
screenshots of four restoration brands.
**Scope:** page architecture, section order, grid structure, and component layout.
**Palette is out of scope by decision — Aseptaclean brand colors stay as they are.** Category
colors are recorded in §2 only as context for *where* accent is spent, not as a proposal.

> **Authority: none.** Reference input, not a spec with standing in the AGENTS.md precedence
> chain. §8 lists where category convention collides with rules this repo already enforces.

---

## 1. What is in the PDF

| Pages | Brand | Read |
| --- | --- | --- |
| 1–5 | **BELFOR** | Global disaster restoration. Dense, authoritative, photo-led. |
| 6–8 | **SERVPRO** | Franchise consumer brand. Light, card-based, geo-localized. |
| 9–13 | **BluSky** | National commercial contractor. Calm, corporate, centered. |
| 13–16 | **Steri-Clean** | Biohazard, crime scene, **hoarding**. |

**Steri-Clean is the only real comparable.** Its footer service list — animal waste, biohazard,
blood, crime scene, decomposition, hoarding, homeless encampment, odor, rodent, suicide, tear gas
— is substantially your service list. The other three sell water/fire/storm/mold, which you don't.
Where this document recommends something, it usually comes from Steri-Clean.

---

## 2. Where the category spends accent (structure, not hue)

Recorded because the *distribution* is portable even though the hue is not. Measured pixel share:

| Brand | Accent | Share of page |
| --- | --- | --- |
| BELFOR | `#DE1B23` | ~2% |
| SERVPRO | `#FF6602` | ~2.4% |
| BluSky | `#007CBC` | ~1.2% (navy `#0C233F` carries ~9% as a *field*) |
| Steri-Clean | crimson gradient | large field on one section only |

Every brand runs **one** accent, rationed to roughly 2%, against a near-neutral dark, on a
predominantly white page (BELFOR 53% white, SERVPRO 78%). Accent is reserved for: primary CTA
fill, eyebrow text, the short rule under a heading, phone numbers, active nav.

Your existing navy/blue system already has this architecture. Nothing to change.

---

## 3. The homepage skeleton the category converges on

Both BELFOR and Steri-Clean resolve to the same seven-beat sequence:

1. **Dark photographic hero** — eyebrow + rule, large H1, one-line subhead, two CTAs.
2. **Immediate proof strip** — *directly* under the hero, before any selling. Stats or credentials.
3. **Service grid** — icon + title + 2-line description, repeated.
4. **Who we are** — two-column, text left, real photo right, CTA below text.
5. **Differentiator / process**.
6. **FAQ accordion**.
7. **Contact form** — split layout, form in a raised card.
Then a **fat 4–5 column footer**.

Your homepage currently runs **fourteen** sections:

```
Hero · CredentialBar · ServiceCards · ConfidenceAndFit · WhyAseptaclean · AccentBand
HandoffStandard · HandoffRecord · Pricing · AreasWeServe · OperatorAccountability
FAQ · RequestForm · FinalCTA
```

You have every beat the category has, plus five more. The category's advantage is not that it has
better sections — it's that it has **half as many**, so each one lands. Your `HandoffRecord` and
`HandoffStandard` are genuinely differentiated assets that no competitor here has; they are
currently the 7th and 8th things a visitor sees, after four other selling sections.

**The layout finding is compression, not addition.**

---

## 4. Layout devices worth taking

**4.1 Overlay card breaking a photo band (BELFOR, p3–4).** A white card sits on top of a
full-bleed photograph, offset to the left, roughly 45% of the container width. The card's bottom
edge *is* a full-width solid accent CTA bar — flush, no radius, no gap, spanning the card edge to
edge. This is the strongest single device in the whole scan: it makes one CTA unmissable without
a popup. Your `HandoffRecord` figure would carry this well.

**4.2 Section label chip (Steri-Clean, p14).** A small pill — "About Us", "Our Services" —
sitting above the H2 as a discrete tag with a light fill and generous horizontal padding. Reads
as a wayfinding marker. You have `.ac-eyebrow` (mono caps + 24×2px rule) doing this job already;
the chip is an alternative treatment, not an addition.

**4.3 Inset rounded section panel (Steri-Clean).** Whole sections render as a large rounded
rectangle inset from the page edge rather than full-bleed — roughly 24–32px corner radius, with
the page background visible around it. This is how Steri-Clean separates its services block from
the white page without a hard edge. It is the one place the category is *softer* than you.

**4.4 Three-column icon list (Steri-Clean, p14–15).** Twelve services in 3 columns × 4 rows.
Small icon (~24px) hard-left, aligned to the first text line; title bold; 2–3 line description.
Very compact — twelve services in roughly one viewport. Compare your `ServiceCards`, which uses
large image-topped cards and fits three. If you ever surface the full service list, this is the
pattern that scales.

**4.5 Stat row (Steri-Clean, p13).** Four figures — `26+` years, `25K+` clients, `40` states,
`600+` reviews — as large accent numerals with a two-line label beneath, sitting immediately
under the hero on the hero's own background. See §8.3 before using this.

**4.6 Header architecture (BELFOR, all pages).** Three tiers: a thin utility bar (Locations /
About / Careers / language / Search), then the main nav, then a **solid accent CTA block flush to
the right viewport edge, spanning the full header height with no radius and no margin**. The
flush-to-edge full-height CTA is what makes it read as industrial rather than corporate. Your
header CTA is a padded pill inside the measure — this is a small, cheap change with real effect.

**4.7 Filter-style section entry (BELFOR, p4).** Heading + one-line subhead + two adjacent
buttons (one solid, one outlined) acting as content filters, with a small accent "SEE ALL" tab
anchored to the card row. Useful if `/projects/` grows.

**4.8 Numbered step rail (Steri-Clean, p16).** Contact form split: heading and phone on the left,
white form card on the right. Inside the card, a left rail numbers steps `01 / 02 / 03` with the
active step in accent and the rest ghosted. **You already have a five-stage Handoff Standard that
maps onto this directly** — this is the most natural fit in the entire scan for your existing
content.

---

## 5. Grid and rhythm

- **Container:** all four sit around 1200–1280px max width. Yours is `--ac-measure-wide: 1200px`. Match.
- **Hero split:** BELFOR ~55/45 text-to-image; Steri-Clean ~60/40 in its about block. Your hero
  is `1.25fr 1fr` (56/44). Match.
- **Service grids:** 4-up for damage types, 3-up for detailed service lists, 2-up for
  residential/commercial forks.
- **Section rhythm:** noticeably tighter than yours. Your `--ac-rhythm-standard` is
  `clamp(3.5rem, 7vw, 6rem)`; the category runs closer to 4–5rem at desktop with more internal
  density. Combined with §3's compression, this is what makes their pages feel faster.
- **Radius:** BELFOR 0px on buttons and blocks; BluSky and Steri-Clean ~4px on controls but
  24–32px on section panels. Yours is 12px cards / 6px controls — squarer controls would read
  more industrial without touching color.

---

## 6. The largest gap: there is no photography

The whole category is photo-led. Real crews in branded uniforms, real damaged property, real
before/after, real team group shots. BELFOR opens with hero *video*. Steri-Clean's about section
is a photograph of ~40 staff. SERVPRO shows green vans and technicians.

**Aseptaclean currently ships zero photographs.** There is no `<img>` in any component or page;
`public/assets/` contains only three brand files. Every image slot — `.ac-card__image` — renders
a CSS gradient with a dot pattern and a glyph placeholder.

No layout change will close the credibility distance between a page built on placeholder glyphs
and a page built on photographs of real work. If you make one investment off this scan, it is
photography, not CSS:

- One hero image or short loop of actual work in progress.
- One owner/operator portrait for `OperatorAccountability` (the category always shows faces).
- Three service images for `ServiceCards` to replace the glyph placeholders.
- One real (redacted) Property Handoff Record for `HandoffRecord` — your strongest asset,
  currently rendered as styled HTML rather than shown as an artifact.

`docs/06-ASSET-MANIFEST.md` is the place this belongs.

---

## 7. Concrete layout recommendations

**Do first — no new claims, no palette change:**
1. **Compress the homepage** from 14 sections toward 8–9. Candidates to merge or move to inner
   pages: `ConfidenceAndFit` + `WhyAseptaclean` (overlapping jobs), `AreasWeServe` (already has
   `/service-areas/`), `Pricing` (already has its own treatment).
2. **Promote `HandoffRecord`** to position 3–4. It is your only genuinely uncopyable asset and it
   currently sits below five other sections.
3. **Header CTA flush to the right edge**, full header height, square corners.
4. **Square the controls** — buttons and chips to 0–4px, keep cards at 12px.
5. **Apply the overlay-card + full-width-CTA-bar device** (§4.1) to `HandoffRecord`.
6. **Numbered step rail** (§4.8) on `HandoffStandard` and/or `AssessmentForm`.

**Do when photography exists:**
7. Dark photographic hero replacing the current gradient-only treatment.
8. Owner portrait in `OperatorAccountability`.
9. Real service imagery in `ServiceCards`.

---

## 8. Collisions with rules this repo already enforces

**8.1 The persistent "24 HOUR EMERGENCY HOTLINE" block.** Every brand pins one. You removed
"24-Hour" from the lead offer in commit `44fcc30` precisely because it conflicted with the
business-day guarantee, and `site.offer.responseTime` is **"within one business day."** Adopt the
*pinned contact affordance* if you want it — you already have `MobileCTA` — but not the emergency
framing. A fixed "24 hour" block would contradict your own stated response time site-wide.

**8.2 The category sells urgency; you sell planned, documented work.** BELFOR and SERVPRO are
dispatched mid-disaster. Their layout front-loads speed. Yours front-loads control and
documentation. Compress the page, but don't import the urgency choreography — it sets an
expectation your offer does not meet. Steri-Clean is the better model: it leads with
"compassionate," "discreet," and "privacy," which is much closer to where you already sit.

**8.3 Stat rows and credential strips are claims.** "26+ years," "25K+ clients," "IICRC
Certified," "#1 Choice," and client logo walls are third-party or volumetric proof.
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` governs these and AGENTS.md's "never invent proof" rule is
absolute. The *layout* is free; the *content* is not. Run `/claims-check` before any stat row
ships, and populate it only with owner-confirmed figures.

**8.4 Section reordering touches recorded decisions.** The homepage order is specified in
`docs/aseptaclean-FINAL-v2.html` and ratified in `docs/05-DECISIONS-LOG.md`. Compressing it per
§7.1 reverses that. Run `/doc-precedence` and log the change — this is exactly the class of
conflict that skill exists for.

---

## 9. Honest read

If "restoration vibe" means BELFOR — black, red, hard rectangles, emergency hotline — that is a
repositioning toward disaster response, and it fights your compliance posture (§8.1, §8.2).

If it means Steri-Clean — serious, discreet, navy, compact service lists, real photographs of
real people — you are already most of the way there in palette and voice. What separates you from
it is **section count, density, and the complete absence of photography** (§3, §6), not color.

The cheapest real gain is §7.1 and §7.2: half as many sections, with the Handoff Record near the
top. The largest real gain is photography.
