# Token Map — old names to `--ac-` names

Session 3 of `docs/12-SESSION-PROMPTS.md`. `src/styles/tokens.css` is the one surviving token
file. Every consumption site across `src/` was updated to the new names in the same pass; there
are no remaining references to the old names (`grep -rn -- "--step-\|--text-h\|--content-" src/`
returns zero hits after this session).

## Colors — value unchanged, prefix added

| Old | New | Value |
| --- | --- | --- |
| `--color-navy-900` | `--ac-color-navy-900` | `#122840` (Deep Navy) |
| `--color-navy-800` | `--ac-color-navy-800` | `#1c355e` (Navy) |
| `--color-blue-500` | `--ac-color-blue-500` | `#6a9bc3` (Slate Blue) |
| `--color-steel-300` | `--ac-color-steel-300` | `#a8b8c8` (Steel) |
| `--color-ink-700` | `--ac-color-ink-700` | `#334155` (Text) |
| `--color-ink-500` | `--ac-color-ink-500` | `#5d6a79` |
| `--color-paper` | `--ac-color-paper` | `#ffffff` |
| `--color-warm-white` | `--ac-color-warm-white` | `#f7f8fa` |
| `--color-rule` | `--ac-color-rule` | `#d8e0e7` |
| `--color-focus` | `--ac-color-focus` | `#b45309` |
| `--color-error` | `--ac-color-error` | `#a12622` |
| `--color-success` | `--ac-color-success` | `#256146` |

### 2026-07-31 correction — `--ac-color-steel-300` failed WCAG AA contrast

`docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` §3 ran an actual contrast check (not a visual estimate)
against every token pairing and found `--ac-color-steel-300` at its original value (`#a8b8c8`)
measured **2.03:1 on white** — normal-size eyebrow/label text needs 4.5:1, so this was a real AA
failure across every light-surface use (`.ac-eyebrow`, footer/record borders, muted copy), not a
hypothetical one.

Darkened `--ac-color-steel-300` to `#59738d` (4.93:1 on white / 4.64:1 on warm-white, both >4.5:1;
4.93:1 as a border also clears the 3:1 non-text threshold). Same hue, lower lightness — the
"steel" role and every light-surface use of it are unaffected beyond getting darker/more legible.

That darkened value fails badly on the navy-900 surface, though (3.04:1 — the token is reused as
muted/eyebrow text on the one dark section, `FinalCTA`, plus `Footer`, `CategoryContrast`, the
`.residence-method`/`.residence-decision` dark bands in `private-residence-reset.astro`, and the
`HandoffRecord`-style dark footer band in `ResidenceBaselineRecord.astro`). No single hex clears
4.5:1 against both a white and a navy-900 surface at once, so a second token,
`--ac-color-steel-on-navy: #a8b8c8`, preserves the *original* steel-300 value (7.38:1 on
navy-900) for exactly those dark-surface call sites. Every other `steel-300` reference in `src/`
sits on a light surface and correctly points at the (now darker) base token — verified by
cross-referencing every `background: var(--ac-color-navy-900|navy-800)` section against every
`steel-300`/`.ac-eyebrow` usage in the same file.

`--ac-color-steel-200` and `--ac-color-steel-100` still derive from `--ac-color-steel-300` via
`color-mix()` and are unaffected in role (hairlines, canvas tint) — they're non-text/decorative,
so AA text contrast doesn't apply, and both only ever appear on light surfaces.

### New (derived, not invented brand colors)

`docs/11-COMPOSITION-AND-TYPE.md` §6/§7 calls for "steel 200" (hairlines, stage numerals) and
"steel 100" (Movement 6 canvas surface) but gives no hex for either — only one steel value has
ever existed in this repo. Both are derived as lightness tints of the existing steel via
`color-mix()`, the same mechanism `--shadow-focus` already used in this file, rather than
introducing new arbitrary hex values:

- `--ac-color-steel-200: color-mix(in srgb, var(--ac-color-steel-300) 55%, white)` — mid tone,
  visible enough for a 1px hairline or a stage numeral, quieter than eyebrow text.
- `--ac-color-steel-100: color-mix(in srgb, var(--ac-color-steel-300) 20%, white)` — pale canvas
  tint, distinct enough from `--ac-color-paper` that the Handoff Record's paper edge is visible
  against it, but subtle enough not to compete with the artifact.

## Fonts

| Old | New |
| --- | --- |
| `--font-display` | `--ac-font-display` |
| `--font-sans` | `--ac-font-sans` |
| `--font-heading` (alias → `--font-sans`) | **deleted** — was a Phase 1–3 compatibility shim; every heading now gets its font-family from the `.ac-type-*` role class it carries, so no separate "heading font" indirection is needed |
| `--font-body` (alias → `--font-sans`) | **deleted** — same reason |

## Type scale — docs/11 §2

| Old | New | Value | Note |
| --- | --- | --- | --- |
| `--text-xs` | `--ac-text-xs` | 13→14px | unchanged |
| `--text-sm` | `--ac-text-sm` | 15→16px | unchanged |
| `--text-body` | `--ac-text-body` | 17→18px | unchanged — already matched §2's body target |
| `--text-lead` | `--ac-text-lead` | 19→23px | unchanged |
| `--text-h3` | `--ac-text-h3` | 22→30px | unchanged |
| `--text-h2` | `--ac-text-h2` | 32→56px | unchanged |
| `--text-h1` | `--ac-text-h1` | 44→76px | unchanged — already matched §2's exact H1 numbers (2.6:1 at 320px, 4.2:1 at 1440px) |
| `--step--1` … `--step-4` | **deleted** | — | redundant alias set mapped 1:1 onto the tokens above; replaced by the `.ac-type-*` role classes below, which every component now uses directly instead of reaching for a raw scale-step variable |
| *(none)* | `--ac-text-display` | ~64→96px | new — §2 names this role ("the one line the page is remembered by," used once at Movement 3) but gives no exact px. Built larger than H1 so the two serif appearances read as distinct roles: ratio to body is ~3.8:1 at 320px and ~5.3:1 at 1440px, both above H1's own ratio. |

## Measure — docs/11 §3 (new; replaces the old container-width tokens)

| Old | New | Value |
| --- | --- | --- |
| `--content-narrow` (42rem) | `--ac-measure-intimate` | 45ch (within the given 42–48ch range) |
| `--content-lead` (52ch) | *(removed — no distinct role for this width remained)* | — |
| `--content-reading` (65ch) | `--ac-measure-read` | 62ch (within the given 56–68ch range) |
| `--content-wide` (78rem) | `--ac-measure-wide` | 1180px (the exact value §3 gives) |
| *(none)* | `--ac-measure-bleed` | 100vw — new, no prior equivalent existed |

`.container` (the old single width class) is replaced by four `.ac-measure-*` classes in
`global.css`, one per token, each responsible for its own gutter/centering behavior.

## Rhythm — docs/11 §4 (new; no prior equivalent)

| New | Value |
| --- | --- |
| `--ac-rhythm-tight` | `clamp(2.5rem, 4vw, 3.5rem)` |
| `--ac-rhythm-standard` | `clamp(4rem, 6vw, 6rem)` |
| `--ac-rhythm-open` | `clamp(6rem, 9vw, 9rem)` |
| `--ac-rhythm-vast` | `clamp(9rem, 14vw, 14rem)` |
| `--ac-rhythm-band` | `clamp(5rem, 7vw, 7rem)` |

Copied verbatim from §4's table. Every component's ad-hoc `padding-block: clamp(...)` literal is
replaced by one of these, applied as `padding-top` only (see the cascade rule in
`docs/05-DECISIONS-LOG.md`'s Session 3 entry for why it's one-sided).

## Spacing and misc — value unchanged, prefix added, kept as a distinct concern from rhythm

| Old | New |
| --- | --- |
| `--space-1` … `--space-8` | `--ac-space-1` … `--ac-space-8` |
| `--gutter` | `--ac-gutter` |
| `--radius-small` | `--ac-radius-small` |
| `--radius-control` | `--ac-radius-control` |
| `--shadow-focus` | `--ac-shadow-focus` |
| `--transition-fast` | `--ac-transition-fast` |
| `--sticky-cta-height` | `--ac-sticky-cta-height` |

`--ac-space-*` remains in active use for component-internal gaps (card padding, grid/list gaps) —
a different concern from the section-level `--ac-rhythm-*` scale, and both survive side by side.
