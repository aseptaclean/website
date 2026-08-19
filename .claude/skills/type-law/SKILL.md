---
name: type-law
description: Enforces Aseptaclean's two non-negotiable typography rules — no font-size declared on any selector that resolves to a heading element, and an H1-to-body size ratio of at least 1.9:1 at every width. Use this skill whenever you change a heading, a type token, src/styles/tokens.css, src/styles/global.css, or any component .astro file containing a style block; whenever you add a new page or section with headings; and whenever asked to check typography, type scale, heading sizes, visual hierarchy, or why the page looks flat. Also use it before any release check. Both rules are verified by resolving computed styles in the built output, never by grepping selector text.
---

# Type law

Two rules. Both are load-bearing, both regress silently, and both are currently violated
somewhere in this repo.

## Rule 1 — no font-size on a heading tag or heading selector

`11` §1 states it without exception: *"A component may never declare a font-size on a heading
tag. Zero exceptions."* `18` retains it verbatim. It is item #1 on both failure audits.

Headings take their size from a `.ac-type-*` role class, which reads a `--ac-text-*` token.
That is the whole mechanism, and it exists so the type scale is one system rather than thirty
local decisions.

**What counts as a violation:** `h1 { font-size: … }`, `.hero h1 { font-size: … }`,
`.card-body h3 { font-size: … }`, `style="font-size:…"` on a heading element — any selector
that resolves to a heading and sets a size.

**This includes a plain class that happens to land on a heading tag.**
`.referral-note__heading { font-size: … }` applied to an `<h2>` is a violation as surely as
`h2 { font-size: … }`. **You cannot verify this rule by grepping selector text** — a grep for
`font-size` near an `h1`–`h6` selector cannot see it, and on 2026-08-18 exactly that method
reported a clean pass over a live violation on `/senior-downsizing-san-jose/`.

**How to verify (required method).** Build, then cross-reference: collect every class that
declares a `font-size` in `src/`, collect every class actually applied to an `<h1>`–`<h6>` in
the built HTML, and intersect. Anything in the intersection that is not an `.ac-type-*` role
class is a violation. Comments must be stripped before matching selectors — mockup references
like `/* .hero h1 */` otherwise produce false positives.

**What does not:** the `.ac-type-h1`, `.ac-type-h2`, `.ac-type-h3` rules in `global.css`.
Those *are* the mechanism. `global.css`'s own comment says so and it is accurate. Do not
"fix" them.

**Known violations to check first:** none currently. The previously listed `Hero.astro:101`
and `AssessmentForm.astro:2014` were cleared by the visual port; those line numbers now point
at unrelated code. As of 2026-08-18 the tree is clean under the cross-reference method above.

**How to fix correctly.** Do not delete the size — move it. Take the value the component was
declaring, put it in the matching `--ac-text-*` token in `tokens.css`, then delete the
component rule. If the component's value differs from the token's, that difference was an
undocumented override and you need to decide which one is right before you collapse them.

## Rule 2 — the H1:body ratio floor

**One floor: no H1 renders below 1.9:1 against the body baseline, at any width.**

Amended by owner ruling 2026-08-18. The previous split floor — 2.5:1 at 390px, 4:1 at 1440px —
is **superseded and must not be enforced or restored.** In the approved visual direction
contrast is carried by surface and colour variation per the reference specs; the old floors
predate that direction and were written when headline scale was the only contrast mechanism.

This is a floor, not a target. It exists so a heading cannot collapse toward body size. Do not
raise a heading token to chase the retired numbers — the token values are the approved design.

**Last measured (2026-08-18, all 37 built routes):** zero below 1.9:1. Thirteen band-header
routes sit at *exactly* 1.900:1 at 320px, driven by `--ac-text-h1-band`'s `1.9rem` minimum
against the 16px body. That is a pass with zero margin: **any** reduction of that token, or any
increase to the body size, breaks the floor on 13 routes at once. Re-measure after touching
either.

**Measure computed styles, not token values.** A `clamp()` in a token tells you nothing about
what actually renders at a given viewport, and a component override can defeat the token
entirely. Build, serve, and measure with a headless browser at a spread of widths — 320px is
the binding case, not 390px. `playwright-core` and a local Chromium are already in
`devDependencies`. Navigate once per route and resize; repeated `networkidle` navigations are
flaky here.

The hero-lead comparison remains useful as a design signal — the lead is what a reader's eye
actually compares the headline against — but it is **not** a gate and nothing fails on it.

## Procedure

1. Grep `src/` for `font-size` under any heading selector, and for inline `style` attributes
   on heading elements. Classify each hit against the two categories above.
2. Fix by relocating to tokens, not by deleting.
3. Build and measure computed h1 and body sizes across **every built route**, at 320, 360,
   390, 414, 768, 1024, 1280, 1440 and 1920px. Sweeping one or five routes is not enough —
   the H1 role class varies by page type, so the binding case is usually a route you did not
   think to check.
4. Report each route's **worst** ratio and the width it occurs at. 320px is normally binding.
5. If the 1.9:1 floor is missed, raise the *minimum* of the relevant `--ac-text-h1*` clamp
   (`--ac-text-h1`, `--ac-text-h1-hub` or `--ac-text-h1-band`, depending on which role class
   the failing route uses). Re-measure every route — those tokens are shared. Do not adjust
   body size to fix a ratio; body size is a readability decision and is correct at 16px.
6. Screenshot each width and check every heading for a widow, a one- or two-word final line,
   or an orphaned preposition. `11` §8.2 rejects all three.

## Report format

```
## Type law check

### Rule 1 — font-size on headings
<file:line> — <declaration> — <violation | mechanism, left alone> — <action>

### Rule 2 — ratio (floor 1.9:1 at every width)
| Route | worst ratio | at width | h1 / body | pass |

### Changes made
<token before → after, and why>

### Wrapping
<any widow or short final line found, at which width>
```

## One thing worth knowing about this codebase

`Hero.astro:38-51` renders a hardcoded five-row "Handoff Status" panel that is *not* driven by
`homepage.handoffStages`, while `HandoffStandard.astro` renders the same five stages from that
data. If a stage is ever renamed, the two will silently disagree. That is not a type-law
violation, but it is the same class of problem — a local hardcode shadowing a system — and it
is worth flagging whenever you are in these files.
