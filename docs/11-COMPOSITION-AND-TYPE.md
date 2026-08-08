# 11 — Composition and Type Authority

**Status:** Active. Binds `/` and every future page.
**Repo location:** `docs/11-COMPOSITION-AND-TYPE.md`
**Supersedes:** `09-PREMIUM-VISUAL-AND-TYP…` — archive it in Session 2. Two typography
authorities in one folder is how a future session produces a wrong answer nobody can trace.

This file exists because the site reads as templated, and the two reported symptoms —
inconsistent heading sizes and inconsistent spacing — are not the disease. This file names the
disease and specifies the fix as values, not adjectives.

---

## 1. Why the headings are inconsistent — the actual mechanism

**Cause 1: headings are styled by tag, in component scope.**
When each component sets its own heading size, the page has no scale — it has a dozen local
opinions written on different days. An `h2` in one section renders larger than an `h2` in
another for no reason a reader can perceive. This is the whole bug.

> **Rule: semantic level is never visual size.**
> `h1`–`h4` carry document structure and nothing else. Every visible size comes from an
> explicit class drawn from the §2 scale. A component may never declare a font-size on a
> heading tag. Zero exceptions.

**Cause 2: the old clamp ranges collapse hierarchy at mobile.**
The prior scale ran `h1: clamp(2rem, 4vw, 3rem)` against a `1rem` body. At 320px that is
32px against 16px — a **2:1 ratio**. Editorial pages that read as expensive run **3–4:1 at
mobile and 4–6:1 at desktop**. A 2:1 ratio is the numerical definition of flat, and no amount
of spacing work fixes it.

The canonical type scale runs 44px against 17px at 320px (**2.6:1**) and 76px against 18px at
1440px (**4.2:1**). Adopting it is most of the fix.

---

## 2. Type scale — roles, not tags

Adopt the canonical type values under the `--ac-` prefix. Assign each one exactly one job. If a
size has no job on this page, delete it.

| Token | Role | Where on `/` | Face |
| --- | --- | --- | --- |
| `--ac-text-display` | The one line the page is remembered by | Movement 3 only. Once | Newsreader |
| `--ac-text-h1` | Page thesis | Hero only. Once | Newsreader |
| `--ac-text-h2` | Movement headline | Once per movement, 7 total | Newsreader |
| `--ac-text-h3` | Sub-head inside a movement | Stage names, assurance items, FAQ questions | Instrument Sans |
| `--ac-text-lead` | Paragraph directly under an H1 or H2 | Max one per movement | Instrument Sans |
| `--ac-text-body` | Reading copy | Everywhere | Instrument Sans |
| `--ac-text-sm` | Captions, helper text, form hints | | Instrument Sans |
| `--ac-text-xs` | Eyebrows, labels, artifact fields, metadata, numerals | | Instrument Sans |

**Serif is spent, not sprinkled.** Newsreader appears in exactly nine places: one display line,
one H1, seven H2s. A serif used everywhere reads as a template with a serif on it. A serif used
nine times reads as authorship.

**Three-in-a-row ban, enforceable.** No three consecutive text elements may sit within 15% of
each other on size, weight, and color simultaneously. If an H3, a lead, and a body paragraph
stack, the H3 must differ on at least two of the three axes.

---

## 3. Measure — the strongest tell currently being failed

One container width on every section is the most reliable signal of a template — more than
typeface, more than color. Expensive editorial pages change measure aggressively and on
purpose, and the change carries meaning: narrow is intimate, wide is operational, full-bleed is
arrival.

Four containers. Every section is assigned exactly one.

| Token | Width | Meaning | Use |
| --- | --- | --- | --- |
| `--ac-measure-intimate` | 42–48ch | One voice, close range | Recognition, founder statement, closing |
| `--ac-measure-read` | 56–68ch | Sustained reading | Body copy inside any movement |
| `--ac-measure-wide` | 1180px | Operational, structural | Stage rail, scope lists, assurance |
| `--ac-measure-bleed` | 100vw | Arrival | Artifact movement, one dark band |

**No two consecutive movements share a container.**

---

## 4. Rhythm — compression and release

Uniform vertical padding is the second tell. When every section is the same height above and
below, the eye stops registering section boundaries at all — which is precisely what "the
spacing feels off" describes.

| Token | Value | Meaning |
| --- | --- | --- |
| `--ac-rhythm-tight` | `clamp(2.5rem, 4vw, 3.5rem)` | Continuation — this belongs to what came before |
| `--ac-rhythm-standard` | `clamp(4rem, 6vw, 6rem)` | Default section |
| `--ac-rhythm-open` | `clamp(6rem, 9vw, 9rem)` | Breathe. Something changed |
| `--ac-rhythm-vast` | `clamp(9rem, 14vw, 14rem)` | The page stops. Twice maximum |
| `--ac-rhythm-band` | `clamp(5rem, 7vw, 7rem)` | Dark full-bleed bands |

**The ratio between adjacent sections must be at least 1.5x, or exactly 1.0x.** Anything between
reads as an inconsistency rather than a decision. This single rule fixes most of what currently
feels wrong.

---

## 5. The composition map — binding, per movement

Every cell is a decision. Codex implements this table and does not improvise around it.

| # | Movement | Container | Rhythm | Surface | Type entry |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | `wide`, asymmetric — copy at 58% not 50% | `open` top, `standard` bottom | Warm white | `h1` + `lead` + `xs` trust line |
| 2 | Recognition | `intimate` | `standard` | Warm white, hairline top rule | `h2` + `body`. No lead |
| 3 | What finished feels like | `bleed`, content held at `intimate`, optically centered | `vast` | White, elevated from canvas | `display`. One paragraph. Nothing else |
| 4 | Category contrast | `wide` | `standard` | Navy 900 full-bleed band | `h2` + two-column comparison at `body` |
| 5 | Five-Stage Standard | `wide`, rail 22% / content 78% | `open` | Warm white | `h2` + 5× (`xs` numeral + `h3` + `body`) |
| 6 | Property Handoff Record | `bleed`, artifact 1320px | `vast` | Steel 100, artifact on white with paper edge | `h2` + `xs` field labels only |
| 7 | Confidence and fit | `wide`, three internal blocks at differing widths | `standard` | Warm white | `h2` + `h3` items + `body` |
| 8 | Final decision | `intimate` | `open` | Navy 950 full-bleed | `h2` + `lead` + CTA |
| — | FAQ | `read` | `tight` — continues from 8 | Warm white | `h3` questions + `body` answers |
| — | Footer | `wide` | `standard` | Navy 950 | `xs` throughout |

Read the Container column top to bottom: `wide → intimate → bleed → wide → wide → bleed → wide
→ intimate`. Read Rhythm: `open → standard → vast → standard → open → vast → standard → open →
tight`. **That variation is the design.** A page whose two columns read as one repeated value
is a template regardless of how good the fonts are.

Movements 4 and 5 are both `wide` and adjacent — resolved by the asymmetric internal grid on 5,
so optical measure differs even though the container matches. Never leave two identical
compositions adjacent.

Row 7's "three internal blocks at differing widths" means differing *proportional* widths sized
to each block's actual content length — not three equal-width columns, and not any fixed ratio
either. The assurance ledger, pricing, and founder blocks do not carry comparable amounts of
content, and CSS Grid sizes a row's height to its tallest cell regardless of how the `fr` widths
are split between cells. Forcing all three into one parallel row — at `5fr/4fr/3fr` or any other
fixed split — stretches the row to the longest block's height and leaves the shorter blocks
trailing in empty space for the rest of that height. This is what produced the dead-space defect
fixed in Phase 4 Session 8 (`05-DECISIONS-LOG.md`, audit item 12): the assurance ledger got
capped at `max-width: 64%` instead of a column fraction, and pricing/founder were paired into
their own shorter two-column strip below it rather than kept as a third parallel column. Do not
revert this movement to three equal (or fixed-ratio) columns — the fix is the width-to-content
match, not a CSS bug to patch differently.

---

## 6. The detail layer — what expensive pages have that cheap ones don't

Cheap pages contain nothing below 14px. Expensive pages carry a substantial amount of small
utility type doing real work, and that density is most of what reads as craft.

1. **Eyebrows.** `--ac-text-xs`, uppercase, `0.08em` tracking, steel 300, above every H2. States
   the section's function, not a slogan: `SCOPE` · `WHAT IS EXCLUDED` · `THE RECORD`. Seven total.
2. **Stage numerals.** `01`–`05` on the stage rail, Newsreader at `--ac-text-h3`, steel 200,
   positioned as a margin element rather than inline. Numbered markers are earned here because
   the content is a genuine sequence. They appear nowhere else.
3. **Hairline rules.** 1px steel 200, marking a change of register, never decoration. Six maximum.
4. **Artifact metadata.** Field labels, status stamps, photo indices at `--ac-text-xs`. This is
   the densest type on the page and should look like it.
5. **The Mark.** Solid navy rectangle behind one word. Three appearances maximum: the H1, the
   movement 3 display line, the final CTA headline. The only decorative device on the site.

---

## 7. Spend boldness once

The page has exactly one dramatic moment: **the Property Handoff Record at movement 6.**
Full-bleed steel canvas, `vast` rhythm both sides, the document rendered large enough to read on
desktop, paper edge and sample stamp.

Movement 3 is the emotional peak but achieves it through scale and emptiness, not ornament — one
display line on white with vast space. It only lands if nothing around it competes.

If a second element starts competing with the artifact, cut the second element.

---

## 8. What cannot be copied from the showcase sites

The Astro sites that read as expensive are mostly developer tools with real product
screenshots, commissioned illustration, and orchestrated scroll motion. This business has none
of those, and buying them badly is worse than not having them.

The equivalent here is the operating document. The canonical design thesis — a private
property-transition firm with field-operating discipline — is correct. The page earns its
quality from typographic scale, measure variation, rhythm, and one credible artifact. Not from
imagery.

**Motion budget:** one scroll-triggered reveal on the artifact, `prefers-reduced-motion`
respected. Nothing else. Fade-up on every section is on the canonical anti-AI blacklist and is
the fastest way to make a careful page look generated.

**The real ceiling is photography.** Founder portrait, a threshold image, and authentic South
Bay residential detail will lift this page further than any remaining CSS work. Log each one in
`06-ASSET-MANIFEST.md` as it is acquired. Until they exist, the composition above is the
ceiling — and it is a high one.

---

## 9. Failure audit — run before calling the page done

Screenshot `/` at 390px and 1440px, then answer each in writing:

- [ ] Do any two adjacent sections share container width *and* vertical padding? → fail
- [ ] Is any font-size declared on a heading tag anywhere in the codebase? → fail
- [ ] Is the H1-to-body ratio below 2.5:1 at 390px or 4:1 at 1440px? → fail
- [ ] Does Newsreader appear more than nine times on the page? → fail
- [ ] Three consecutive text elements within 15% on size, weight, and color? → fail
- [ ] More than one dramatic moment? → fail
- [ ] Three or more sections using icon + title + paragraph as their structure? → fail
- [ ] More than six hairline rules? → fail
- [ ] More than two deep-dark sections consecutively? → fail
- [ ] Cover the logo. Could this be a generic cleaning company, a SaaS product, or a junk
      hauler? → fail, and name which movements caused it

Record the result in `05-DECISIONS-LOG.md`. Do not report the design as fixed because the build
compiles.

---

## 10. Migrated from `09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` (archived Session 2)

`09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` is archived to `docs/archive/` per `07` §12 — its
typography (old clamp scale) and homepage-composition sections (§3, §5, §6 of that file) are
fully superseded by §1–§7 above and by `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` §6, and were not
carried forward. The sections below were still true and outside this file's original scope, so
they move here rather than disappearing with the archived file.

### 10.1 Color and material system

- Navy `#1C355E`
- Deep Navy `#122840`
- Slate Blue `#6A9BC3`
- Steel `#A8B8C8`
- Warm White `#F7F8FA`
- Text `#334155`

White paper surfaces, fine rules, restrained shadows, muted image treatment, and occasional
signal/caution colors only for functional meaning. No new decorative color.

### 10.2 Document artifact system

Applies to the Property Handoff Record and any other primary artifact (Room-by-room Scope
Document, Residence Baseline Record, Change Authorization, Completion Record):

- accurate operational content
- labeled `SAMPLE` when not from a client
- paper is the brightest surface
- no fake dashboard chrome
- no decorative tilt, curled paper, coffee stains, or faux case-file theme
- monospace only for field labels and status metadata
- no animation on the core artifact

### 10.3 Imagery

Allowed: original founder portrait; original hands/clipboard/threshold photographs; original
South Bay residential exteriors; licensed architectural interior details used as atmosphere,
never as proof; clean material/detail crops; empty or presentation-ready rooms not represented as
Aseptaclean work. Image license and source recorded in `06-ASSET-MANIFEST.md`.

Prohibited: fake before/after; AI-generated people; smiling cleaning crews; staged maids; branded
fleet not owned; sensational hoarding imagery; hazmat/PPE theater; images implying regulated
services; generic moving-box motif.

### 10.4 Interaction

- motion duration usually 120–220ms
- no scroll reveal required beyond the §7/§8 artifact reveal
- no fade-up on every section
- hover changes must be subtle and functional
- visible focus is non-negotiable
- controls preferred at 44–48px minimum height
- sticky mobile CTA must not cover fields, Termly controls, or footer links
- respect reduced motion

### 10.5 Responsive art direction

Mobile is not desktop stacked.

At 320–430px: hero copy appears before artifact/media; one CTA remains dominant; H1 is
intentionally broken; document artifacts become readable excerpts, not miniaturized desktop
documents; comparison sections become sequential statements, not narrow columns; forms use one
column; sticky actions never cover validation or consent controls.

At 768–1024px: avoid awkward half-desktop layouts; use deliberate tablet compositions; review
header and document-artifact scale independently.
