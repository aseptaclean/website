# Phase 4 — Composition and Type Authority

**Status:** Archived and superseded by `docs/11-COMPOSITION-AND-TYPE.md`. No longer binding.
**Repo location:** `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md` (corrected 2026-08-11 — this
file moved to `docs/archive/` when it was superseded; the `docs/PHASE-4-COMPOSITION-AND-TYPE.md`
path above is stale).
**Supersedes:** `07-VISUAL-SYSTEM.md` and the v2 typography rules in `02-BUILD-SPEC.md` §3.
**Read with:** canonical spec §7–§12, `PHASE-4-ONE-PAGE-DIRECTIVE.md` §3 and §9.

This file exists because the site reads as templated, and the two symptoms being reported —
inconsistent heading sizes and inconsistent spacing — are not the disease. This file names the
disease and specifies the fix as values, not adjectives.

---

## 1. Why the headings are inconsistent — the actual mechanism

Two causes, both structural.

**Cause 1: headings are styled by tag, in component scope.**
When each component sets its own heading size, the page has no scale — it has a dozen local
opinions. An `h2` in one section renders larger than an `h2` in another because they were
written on different days. This is the whole bug.

> **Rule: semantic level is never visual size.**
> `h1`–`h4` carry document structure and nothing else. Every visible size comes from an
> explicit class drawn from the scale in §2. A component may never declare a font-size on a
> heading tag. Zero exceptions.

**Cause 2: the old clamp ranges collapse hierarchy at mobile.**
The v2 scale was `--ac-type-h1: clamp(2rem, 4vw, 3rem)` against `--ac-type-h2:
clamp(1.5rem, 2.5vw, 1.875rem)` and a `1rem` body.

At 320px that is 32px / 24px / 16px. The H1-to-body ratio is **2:1**. Editorial sites that
read as expensive run **3–4:1 at mobile and 4–6:1 at desktop**. A 2:1 ratio is the numerical
definition of flat. No amount of spacing work fixes it.

The canonical §9.2 scale runs 44px H1 against 17px body at 320px (**2.6:1**) and 76px against
18px at 1440px (**4.2:1**). Adopting it is most of the fix.

---

## 2. Type scale — roles, not tags

Adopt the canonical §9.2 values under the `--ac-` prefix. Assign each one exactly one job.
If a size has no job on this page, delete it.

| Token | Role | Where it appears on `/` | Face |
| --- | --- | --- | --- |
| `--ac-text-display` | The one line the page is remembered by | Movement 3 only. Once. | Newsreader |
| `--ac-text-h1` | Page thesis | Hero H1 only. Once. | Newsreader |
| `--ac-text-h2` | Movement headline | Once per movement, 7 total | Newsreader |
| `--ac-text-h3` | Sub-head inside a movement | Five-stage names, assurance items, FAQ questions | Instrument Sans |
| `--ac-text-lead` | The paragraph directly under an H1 or H2 | Max one per movement | Instrument Sans |
| `--ac-text-body` | Reading copy | Everywhere | Instrument Sans |
| `--ac-text-sm` | Captions, helper text, form hints | | Instrument Sans |
| `--ac-text-xs` | Eyebrows, labels, artifact field names, metadata, stage numerals | | Instrument Sans |

**Serif is spent, not sprinkled.** Newsreader appears in exactly nine places on the page:
one display line, one H1, seven H2s. Everything else is Instrument Sans. A serif used
everywhere reads as a template with a serif; a serif used nine times reads as authorship.

**The three-in-a-row ban is enforceable.** No three consecutive text elements may sit within
15% of each other on size, weight, and color at the same time. If an H3, a lead, and a body
paragraph stack, the H3 must differ in at least two of the three axes — size and weight, or
weight and color.

---

## 3. Measure — the strongest tell you are currently failing

One container width applied to every section is the single most reliable signal of a template.
Expensive editorial pages change measure aggressively and on purpose, and the change itself
carries meaning: narrow means intimate, wide means operational, full-bleed means arrival.

Four containers. Every section is assigned exactly one.

| Token | Width | Meaning | Use |
| --- | --- | --- | --- |
| `--ac-measure-intimate` | 42–48ch | One voice, close range | Recognition, founder statement, closing line |
| `--ac-measure-read` | 56–68ch | Sustained reading | Body copy inside any movement |
| `--ac-measure-wide` | 1180px | Operational, structural | Five-stage rail, scope lists, assurance |
| `--ac-measure-bleed` | 100vw | Arrival | Artifact movement, one dark band |

**Rule: no two consecutive movements share a container.** If movement 4 is `wide`, movement 5
is not `wide`.

---

## 4. Rhythm — compression and release

Uniform vertical padding is the second tell. A page where every section is `5rem` top and
bottom reads as an accordion of sameness, and the eye stops registering section boundaries at
all — which is exactly what "the spacing feels off" describes.

Five rhythm values. Assigned, not chosen ad hoc.

| Token | Value | Meaning |
| --- | --- | --- |
| `--ac-rhythm-tight` | `clamp(2.5rem, 4vw, 3.5rem)` | Continuation — this belongs to what came before |
| `--ac-rhythm-standard` | `clamp(4rem, 6vw, 6rem)` | Default section |
| `--ac-rhythm-open` | `clamp(6rem, 9vw, 9rem)` | Breathe. Something changed |
| `--ac-rhythm-vast` | `clamp(9rem, 14vw, 14rem)` | The page stops. Used twice, maximum |
| `--ac-rhythm-band` | `clamp(5rem, 7vw, 7rem)` | Dark full-bleed bands |

**The ratio between adjacent sections must be at least 1.5x or exactly 1.0x.** Anything between
reads as an inconsistency rather than a decision. This one rule fixes most of what currently
feels wrong.

---

## 5. The composition map — binding, per movement

Every cell is a decision. Claude Code implements this table; it does not improvise around it.

| # | Movement | Container | Rhythm | Surface | Type entry |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | `wide`, asymmetric — copy at 58% not 50% | `open` top, `standard` bottom | Warm white | `h1` + `lead` + `xs` trust line |
| 2 | Recognition | `intimate` | `standard` | Warm white, hairline top rule | `h2` + `body`. No lead |
| 3 | What finished feels like | `bleed`, content held at `intimate` and optically centered | `vast` | White, elevated from canvas | `display`. One paragraph. Nothing else |
| 4 | Category contrast | `wide` | `standard` | Navy 900 full-bleed band | `h2` + two-column comparison at `body` |
| 5 | Five-Stage Standard | `wide` | `open` | Warm white | `h2` + 5× (`xs` numeral + `h3` + `body`) |
| 6 | Property Handoff Record | `bleed`, artifact 1320px | `vast` | Steel 100, artifact on white with paper edge | `h2` + `xs` field labels only |
| 7 | Confidence and fit | `wide`, three internal blocks at differing widths | `standard` | Warm white | `h2` + `h3` items + `body` |
| 8 | Final decision | `intimate` | `open` | Navy 950 full-bleed | `h2` + `lead` + CTA |
| — | FAQ | `read` | `tight` — it continues from 8 | Warm white | `h3` questions + `body` answers |
| — | Footer | `wide` | `standard` | Navy 950 | `xs` throughout |

Read the Container column top to bottom: `wide → intimate → bleed → wide → wide → bleed →
wide → intimate`. Read Rhythm: `open → standard → vast → standard → open → vast → standard →
open → tight`. That variation *is* the design. A page whose two columns read as a single
repeated value is a template regardless of how good the fonts are.

**Constraint check:** movements 4 and 5 are both `wide` and consecutive — resolve by setting
movement 5 to an asymmetric internal grid (rail at 22%, content at 78%) so the optical measure
differs even though the container matches. Never leave two identical compositions adjacent.

---

## 6. The detail layer — what expensive sites have that cheap sites don't

Cheap pages contain nothing below 14px. Expensive pages carry a substantial amount of small
utility type doing real work, and that density is most of what reads as craft.

Ship all five:

1. **Eyebrows.** `--ac-text-xs`, uppercase, `0.08em` tracking, steel 300, above every H2. The
   eyebrow states the section's function, not a slogan: `SCOPE` `WHAT IS EXCLUDED`
   `THE RECORD`. Seven total.
2. **Stage numerals.** `01`–`05` on the five-stage rail, in Newsreader at `--ac-text-h3`,
   steel 200, positioned as a margin element rather than inline. Numbered markers are earned
   here because the content is a genuine sequence. They appear nowhere else on the page.
3. **Hairline rules.** 1px steel 200, used to mark a change of register, never as decoration.
   Maximum six on the page.
4. **Artifact metadata.** Field labels, status stamps, and photo indices at `--ac-text-xs` in
   Instrument Sans. This is the densest type on the page and it should look like it.
5. **The Mark.** Solid navy rectangle behind one word. Three appearances maximum: the H1, the
   movement 3 display line, and the final CTA headline. It is the only decorative device.

---

## 7. Spend boldness once

The page has exactly one dramatic moment: **the Property Handoff Record at movement 6.**
Full-bleed steel canvas, `vast` rhythm on both sides, the document rendered large enough to
read on desktop, paper edge and sample stamp.

Everything else stays quiet. Movement 3 is the emotional peak but it achieves that through
scale and emptiness, not ornament — one display line on white with vast space is the
restrained move, and it only lands if nothing around it competes.

If a second element starts competing with the artifact, cut the second element.

---

## 8. What you cannot copy from the showcase sites

The Astro sites that look expensive are mostly developer tools with real product screenshots,
commissioned illustration, and orchestrated scroll motion. You have none of those and buying
them badly is worse than not having them.

Your equivalent is the operating document. The canonical spec already reached this conclusion
in §7.1 — *a private property-transition firm with field-operating discipline* — and it is
correct. The page gets its premium quality from typographic scale, measure variation, rhythm,
and one credible artifact. Not from imagery.

**Motion budget:** one scroll-triggered reveal on the artifact, `prefers-reduced-motion`
respected. Nothing else. Fade-up on every section is on the canonical §7.3 anti-AI blacklist
and it is the fastest way to make a careful page look generated.

**The real ceiling is still photography.** Founder portrait, a threshold image, and authentic
South Bay residential detail will lift this page further than any remaining CSS work. Until
those exist, the composition above is the ceiling — and it is a high one.

---

## 9. Failure audit — run this before calling the page done

Screenshot `/` at 390px and 1440px, then answer each in writing:

- [ ] Do any two adjacent sections share container width *and* vertical padding? → fail
- [ ] Is any font-size declared on a heading tag anywhere in the codebase? → fail
- [ ] Is the H1-to-body size ratio below 2.5:1 at 390px or 4:1 at 1440px? → fail
- [ ] Does Newsreader appear more than nine times on the page? → fail
- [ ] Are there three consecutive text elements within 15% on size, weight, and color? → fail
- [ ] Is there more than one dramatic moment? → fail
- [ ] Do three or more sections use icon + title + paragraph as their structure? → fail
- [ ] Are there more than six hairline rules? → fail
- [ ] More than two deep-dark sections consecutively? → fail
- [ ] Cover the logo. Could this be a generic cleaning company, a SaaS product, or a junk
      hauler? → fail, and name which movements caused it

---

## 10. Session prompt — replaces Session 3 in `PHASE-4-SESSION-PROMPTS.md`

```
Read docs/PHASE-4-COMPOSITION-AND-TYPE.md in full, plus canonical spec §7, §8, §9, §10, §11, §12.

This session rebuilds the type and composition system. Do not patch the new system alongside
the old one — remove the old one.

1. Fonts: remove Montserrat and Open Sans entirely. Self-host Newsreader Variable and
   Instrument Sans Variable as WOFF2 in src/assets/fonts. font-display: swap. Preload only the
   first-viewport files and weights actually used. Record source and license in
   docs/06-ASSET-MANIFEST.md. [Path corrected 2026-08-11 — no `docs/ASSET-MANIFEST.md` has ever
   existed; the real file is numbered `06-`. This session's own text is otherwise historical and
   superseded — see AGENTS.md §6 for the current font stack.]

2. Tokens: keep the --ac- prefix. Implement the §2 type scale, the §3 measure tokens, the §4
   rhythm tokens, and the canonical §8 color values. Write the old-to-new map into
   docs/TOKEN-MAP.md. Delete every token no longer consumed. Exactly one token file.

3. Enforce the §1 rule globally: strip every font-size declaration from every heading tag in
   every component. Headings carry semantics only. All visible sizing comes from explicit
   role classes drawn from the §2 scale. Report every file you changed.

4. Apply the §5 composition map exactly. Container, rhythm, surface, and type entry per
   movement are given values, not suggestions. Where the map flags the movement 4/5 adjacency,
   implement the asymmetric internal grid described.

5. Build the §6 detail layer: eyebrows, stage numerals, hairline rules, artifact metadata,
   and The Mark at three appearances maximum.

6. Enforce canonical §12.2 cascade rules. Watch for the specificity collision between
   section-level and element-level selectors on padding and margin — that is where the current
   spacing inconsistency lives. Report and fix every canonical §12.4 audit failure.

7. Render /dev/type-specimen, noindex, excluded from the sitemap: the full scale, every
   surface, every container width, and every rhythm value, at 320, 390, 768, 1024, 1280, 1440
   and at 200% zoom.

Then run the §9 failure audit against the rendered homepage and report every line as PASS or
FAIL with a screenshot. Do not tell me the design is fixed because the build compiles.

Stop and show me the specimen and the audit before touching page copy.
```
