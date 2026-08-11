---
name: type-law
description: Enforces Aseptaclean's two non-negotiable typography rules — no font-size declared on any heading tag or heading selector, and an H1-to-body size ratio of at least 2.5:1 at 390px and 4:1 at 1440px. Use this skill whenever you change a heading, a type token, src/styles/tokens.css, src/styles/global.css, or any component .astro file containing a style block; whenever you add a new page or section with headings; and whenever asked to check typography, type scale, heading sizes, visual hierarchy, or why the page looks flat. Also use it before any release check. These two rules are the documented fix for the page reading as flat and they regress easily because the natural instinct is to size a heading locally inside the component that owns it.
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

**What does not:** the `.ac-type-h1`, `.ac-type-h2`, `.ac-type-h3` rules in `global.css`.
Those *are* the mechanism. `global.css`'s own comment says so and it is accurate. Do not
"fix" them.

**Known violations to check first:** `Hero.astro:101` and `AssessmentForm.astro:2014`.

**How to fix correctly.** Do not delete the size — move it. Take the value the component was
declaring, put it in the matching `--ac-text-*` token in `tokens.css`, then delete the
component rule. If the component's value differs from the token's, that difference was an
undocumented override and you need to decide which one is right before you collapse them.

## Rule 2 — the H1:body ratio floor

| Viewport | Floor | Last measured | Result |
| --- | --- | --- | --- |
| 390px | 2.5:1 | 40 / 16 = 2.50:1 | at the floor, zero margin |
| 1440px | 4:1 | 60.8 / 16 = 3.80:1 | **failing** |

`18` calls this *"the actual fix for 'the page looks flat.'"* It is not a stylistic
preference — a headline that does not dominate reads as a template, and this business is
selling on the impression that a person with judgment built the page.

**Measure computed styles, not token values.** A `clamp()` in a token tells you nothing about
what actually renders at a given viewport, and a component override can defeat the token
entirely. Build, serve, and measure with a headless browser. `playwright-core` and a local
Chromium are already in `devDependencies`.

Measure the h1 against **both** the `<body>` baseline and the hero lead paragraph. The lead
is what a reader's eye actually compares the headline to, and against it the ratios are
2.23:1 and 3.39:1 — considerably worse than against the 16px baseline.

## Procedure

1. Grep `src/` for `font-size` under any heading selector, and for inline `style` attributes
   on heading elements. Classify each hit against the two categories above.
2. Fix by relocating to tokens, not by deleting.
3. Build and measure computed h1 and body sizes at 320, 390, 768, 1024, 1280, and 1440px.
4. Report the ratio at each width against both the body baseline and the hero lead.
5. If a floor is missed, adjust the `--ac-text-h1` clamp — raising the maximum affects the
   wide end, raising the minimum affects the narrow end. Re-measure. Do not adjust body size
   to fix the ratio; body size is a readability decision and is already correct at 16px.
6. Screenshot each width and check every heading for a widow, a one- or two-word final line,
   or an orphaned preposition. `11` §8.2 rejects all three.

## Report format

```
## Type law check

### Rule 1 — font-size on headings
<file:line> — <declaration> — <violation | mechanism, left alone> — <action>

### Rule 2 — ratio
| Viewport | h1 | body | lead | ratio (body) | ratio (lead) | floor | pass |

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
