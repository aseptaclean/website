# 13 — Build Remediation Pass

**Status:** Active. Run after the current build, before any further movement work.
**Repo location:** `docs/13-REMEDIATION-PASS.md`
**Basis:** Desktop review of the rendered page at ~1440px, July 30 2026.
**Amends:** `11-COMPOSITION-AND-TYPE.md` — §3 of this file adds audit items that document
did not contain, because it was written before the build existed.

The typography and artifact work landed. The remaining problems are three CSS bugs, one
structural monotony problem, and two conversion holes that outrank all of the above.

---

## 1. What is working — do not touch these

- Newsreader display and Instrument Sans body. The H1-to-body ratio now reads correctly.
- The Property Handoff Record. It reads as an operating document, the SAMPLE label is present,
  the area table and exception log are credible, the disclaimer sits with it. This is the
  signature moment and it earns its place.
- The `$1,500` numeral set in Newsreader at display scale. Strongest single composition on the page.
- The scope-boundary section with the caution rule and the stop/notify/refer framing.
- The founder section structure — headline, pull quote, verified-background rail, and the
  "does not constitute contractor authority" note.
- Navy full-bleed bands as a surface change.

---

## 2. Defects — ranked by cost

### 2.1 Conversion holes. These cost more than every visual issue combined.

**D1 — There is no form on the page.** Every CTA is a click-through. `07-ONE-PAGE-DIRECTIVE.md`
§7 requires the 3-field inline form in the hero and in the final movement. A person at peak
intent is being asked to navigate before they can act. Highest-cost defect on the page.

**D2 — The phone number appears nowhere.** Not in the header, not in the hero, not in the final
CTA. This is a distress purchase in a local service category. The approved copy includes an
urgent-call line and it has not been built. There is no `tel:` link anywhere visible.

**D3 — CTA labels disagree.** Header says `Get My Handoff Plan`. Hero and final section say
`Get My 24-Hour Handoff Plan`. One action, two names. The approved label is the one with
`24-Hour` in it — that is where the offer lives. Fix the header.

### 2.2 CSS bugs. Precise, cheap, and they are most of why the page reads as unfinished.

**D4 — Eyebrows are bottom-aligned in their grid cell.** `03 / THE COORDINATION GAP`,
`04 / FIVE-STAGE CONTROL`, `05 / SCOPE BOUNDARY`, and `06 / THE HANDOFF ASSURANCE` all render
at the bottom of the left column, vertically stranded far below the headline they label.
`07 / STARTING CONTEXT` renders correctly at the top. That inconsistency is a grid alignment
bug — the cell is stretching and the eyebrow is settling to the end. An eyebrow that is not
adjacent to its heading is not an eyebrow.

**D5 — Dead vertical space at section boundaries.** Multiple full viewports render almost
entirely empty. Three likely causes, check all three:
- two-column grids where the short column leaves the row height set by the tall column
- `vast` rhythm applied to the bottom of one section and the top of the next, stacking to ~28rem
- a `min-height` on section wrappers

The result is not `vast` pacing. It is a page that looks like content failed to load.

**D6 — Section padding is not collapsing between adjacent bands.** Related to D5. Adjacent
sections must not both contribute full rhythm to the same seam.

### 2.3 Composition

**D7 — Numbering has become noise.** There are now five competing numbered systems on one page:
movement eyebrows `01–11`, the five stages `01–05`, the assurance items `01–05`, the FAQ
`01–10`, and the fit and contrast lists `01–04`. `11-COMPOSITION-AND-TYPE.md` §6 permits
numerals in exactly one place, because numbering means sequence and five sequences mean none.
**Keep numerals on the five stages only.** Strip them from the assurance list, the FAQ, the fit
list, and the contrast list. Movement eyebrows keep their number only if the eyebrow is
otherwise identical in treatment — prefer removing them there too.

**D8 — Most sections are the same two-column composition.** Eyebrow and headline left, list
right, repeated through recognition, contrast, five-stage, assurance, scope, and FAQ. Surface
alternates between white and navy, but structure does not change. Alternating surface on an
unchanging grid is not composition variation — it is stripes. This is the §5 map not being
applied: `intimate`, `bleed`, and `read` containers are not appearing.

**D9 — Serif overrun.** Newsreader now appears roughly fourteen times, plus a long founder pull
quote set in serif at display scale. The budget is nine. The founder quote at that length and
size is the heaviest offender.

**D10 — The hero rail shows three of five stages.** `01 Clear / 02 Reset / 03 Verify` omits
Scope and Protect, so the hero contradicts the named Five-Stage Handoff Standard two movements
later. It is also a weak use of the most valuable rail on the page.

**D11 — The header is oversized and never condenses.** It occupies roughly 130px at all scroll
positions, with a heavy filled CTA that competes with the hero CTA directly below it.

---

## 3. Audit additions to `11-COMPOSITION-AND-TYPE.md` §9

Append these. They are not in that file because it predates the build.

- [ ] Does any eyebrow render vertically separated from the heading it labels? → fail
- [ ] Does any viewport-height region of the page render more than ~60% empty? → fail
- [ ] Do adjacent sections both contribute full rhythm to the same seam? → fail
- [ ] Is more than one numbered sequence present on the page? → fail
- [ ] Do more than three consecutive sections share the same column structure? → fail
- [ ] Does the same action carry two different CTA labels anywhere? → fail
- [ ] Is there a `tel:` link reachable without scrolling on desktop and mobile? → fail if no
- [ ] Is the 3-field form present in the hero and the final movement? → fail if no

---

## 4. Session 3B — composition and CSS remediation

```
Read docs/13-REMEDIATION-PASS.md and docs/11-COMPOSITION-AND-TYPE.md §5, §6, §9.

Fix defects D4 through D11. Do not rewrite copy. Do not add sections.

D4 — Eyebrow alignment. Find the grid or flex rule that lets the eyebrow settle to the end of
its cell. Eyebrows are top-aligned and adjacent to their heading in every movement, without
exception. Report the rule that caused it and confirm the same pattern does not exist elsewhere.

D5/D6 — Dead space. Audit every section boundary. For each, report the computed top padding,
bottom padding, and the resulting seam. No seam may exceed the larger of the two adjacent
rhythm values — adjacent rhythms do not sum. Remove any min-height on section wrappers. For
two-column rows where one column is materially shorter, align content to the start rather than
letting the row stretch. Screenshot every boundary before and after.

D7 — Numbering. Numerals survive on the Five-Stage Handoff Standard only. Remove them from the
assurance list, the FAQ, the property-fit list, and the category-contrast list. Remove them
from movement eyebrows unless you can show a reason the reader needs a movement count.

D8 — Composition. Apply the §5 map as written. Right now nearly every movement is
eyebrow-and-headline-left, list-right. Required changes:
  - Recognition moves to the intimate container, single column, no right-hand list
  - What finished feels like moves to bleed with content held intimate and optically centered
  - FAQ moves to the read container
  - Five-Stage keeps wide but uses the 22/78 asymmetric internal grid
  - No more than three consecutive sections may share a column structure
Report the container assignment for every section as a table when you finish.

D9 — Serif budget. Count every Newsreader instance and report the number. Reduce to nine.
The founder pull quote moves to Instrument Sans at lead size — it is too long to carry at
display scale in serif.

D10 — Hero rail. It currently shows three of the five stages, contradicting the Five-Stage
Handoff Standard. Replace it with either all five stages in compressed form or a single
proof element. Do not show a partial sequence.

D11 — Header. Reduce resting height. Condense on scroll. The header CTA is secondary to the
hero CTA and must not out-weigh it visually.

Then run the §9 audit including the additions in docs/13-REMEDIATION-PASS.md §3. Report every
line PASS or FAIL with screenshots at 390 and 1440. Append the result to docs/05-DECISIONS-LOG.md.
```

---

## 5. Session 3C — conversion remediation

```
Read docs/13-REMEDIATION-PASS.md §2.1, docs/07-ONE-PAGE-DIRECTIVE.md §7 and §10,
docs/06-APPROVED-HOMEPAGE-COPY.md.

D1 — Build the 3-field inline form and place it in the hero and in the final movement.
Fields: name, phone, "What are you looking at?" textarea. Consent line, honeypot, hidden
context values. No wizard, no progress bar, no additional required fields. It posts to
/api/lead with offer_type=handoff_reset and an entry_route that distinguishes it from
/request-assessment/. The header and section CTAs continue to link to the full form.

D2 — Phone. Pull the number from the config module. Add:
  - a tel: link in the header, reachable without opening any menu
  - the urgent-call line from the approved copy in the hero
  - the phone in the final movement beside the CTA
  - a sticky call bar below 48rem that appears after 400px of scroll and never covers a
    submit button
Never hardcode the number. If it is not yet in config, stop and report that instead.

D3 — CTA labels. One action, one name. Use the approved label everywhere.

Verify: keyboard-only path from landing to submitted. Form works with JavaScript disabled.
Screenshots at 390 and 1440 showing the hero form and the phone in both positions.
```

---

## 6. What this pass does not fix

The page still has no photography and no proof. Founder portrait, a threshold image, and real
South Bay residential detail remain the ceiling on how finished this can look, and reviews and
completed-project photography remain the ceiling on whether it converts. Neither is a CSS
problem and neither should delay launch.
