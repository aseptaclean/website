# Token Map

**Regenerated 2026-08-11 from `src/styles/tokens.css`.** The previous version was written on
2026-07-31 and three later passes changed the token layer without updating it — the
2026-08-08 FINAL-v2 port replaced every `--ac-` token's *value* while keeping the names, so
every hex in the old map was wrong. Contrast figures below are **computed**, not estimated.

Prefix: `--ac-`. Owner-ratified — a global rename is churn with regression risk and no
user-visible benefit.

---

## 1. Color — with measured contrast

Ratios computed per WCAG 2.x relative luminance. Threshold is **4.5:1** for normal text,
**3:1** for text at 24px+ or 18.5px+ bold.

### Text colors

| Token | Hex | on `paper` #ffffff | on `warm-white` #f5f8fb | on `navy-900` #10233f |
| --- | --- | --- | --- | --- |
| `--ac-color-ink-900` / `ink-700` | `#13202f` | **16.47** ✓ | **15.45** ✓ | — |
| `--ac-color-ink-600` / `ink-500` | `#46566b` | **7.49** ✓ | **7.03** ✓ | — |
| `--ac-color-ink-400` | `#617087` | **5.03** ✓ | **4.72** ✓ | — |
| `--ac-color-steel-300` | `#8494a8` | **3.10** ⚠ large only | **2.90** ✗ **FAILS** | 5.08 ✓ |
| `--ac-color-steel-on-navy` | `#9fb2ca` | — | — | **7.27** ✓ (8.16 on navy-950) |
| `--ac-color-blue-500` | `#4a7fc1` | **4.12** ⚠ large only | — | — |
| `--ac-color-blue-deep` | `#2e5c9e` | **6.69** ✓ | — | 5.83 ✓ on `blue-pale` |
| `--ac-color-navy-800` | `#1c355e` | **12.21** ✓ | — | — |
| `paper` on `navy-800` | primary button | **12.21** ✓ | — | — |

### Two real failures

**`--ac-color-steel-300` at `#8494a8` fails on both light surfaces.** 3.10:1 on white is large-
text-only; 2.90:1 on warm-white fails outright. The previous token map records this exact token
being darkened to `#59738d` (4.93:1) during session 3 to fix a measured AA failure. **The v2
port reverted it to v2's literal value and the fix was lost.** Anywhere this token carries body
copy, eyebrows, or captions on a light surface is a live accessibility defect. Either restore a
darker value or confirm every remaining use is decorative and `aria-hidden`.

**`--ac-color-steel-200` computes to `#bbc4cf` at 1.76:1.** It is `color-mix(in srgb,
var(--ac-color-steel-300) 55%, white)`. Decorative only — hairlines and rules. It must never
carry text, and if it inherits steel-300's eventual correction its computed value shifts too.

### Status and accent

| Token | Hex | Context | Ratio |
| --- | --- | --- | --- |
| `--ac-color-gold` | `#c9a961` | on `navy-900` | **6.99** ✓ |
| `--ac-color-gold` | `#c9a961` | on `paper` | **2.25** ✗ — navy surfaces only |
| `--ac-color-clear` / `success` | `#1e7a4f` | on `clear-pale` #e7f3ec | **4.66** ✓ |
| `--ac-color-clear` | `#1e7a4f` | on `paper` | 5.31 ✓ |
| `--ac-color-review` | `#9a6414` | on `review-pale` #fbf3e4 | **4.53** ✓ — passes by 0.03 |
| `--ac-color-review` | `#9a6414` | on `paper` | 4.99 ✓ |
| `--ac-color-error` | `#a3392f` | on `paper` | 6.60 ✓ |

`review` on `review-pale` clears by three hundredths. Any future tint adjustment to either
value breaks it. Treat the pair as locked.

### Non-text

`--ac-color-line` / `--ac-color-rule` `#e3e9f0` (1.22:1) · `--ac-color-line-strong` `#ccd6e2`
(1.47:1) · `--ac-color-steel-100` `#f5f8fb` · `--ac-color-paper` `#ffffff` ·
`--ac-color-warm-white` / `bg-soft` `#f5f8fb` · `--ac-color-blue-pale` `#e9f0f9` ·
`--ac-color-blue-ghost` `#f4f8fc` · `--ac-color-accent-tint` → `blue-pale` ·
`--ac-color-accent-text` → `blue-deep` · `--ac-color-focus` `#2e5c9e`.

Navy family: `navy-950` `#0b1830` · `navy-900` `#10233f` · `navy-800` `#1c355e` ·
`navy-700` `#27436f`.

### Aliases retained for un-ported components

`ink-700` → same value as `ink-900` · `ink-500` → same as `ink-600` · `rule` → same as `line` ·
`steel-300`, `steel-200`, `steel-100`, `steel-on-navy`, `focus` are all legacy-compatibility
tokens mapped onto v2 equivalents. Nothing resolves to an undefined custom property.

### Open item

Hairlines in the rebuilt components use `--ac-color-rule`, while the detail layer specifies
`--ac-color-steel-200` for register-change hairlines. Both exist and mean different things.
Pick one, apply it consistently, document which.

---

## 2. Fonts

| Token | Value |
| --- | --- |
| `--ac-font-display` | `"Newsreader Variable", Georgia, serif` |
| `--ac-font-sans` | `"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--ac-font-mono` | `"IBM Plex Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace` |

Three `@font-face` rules in `src/styles/fonts.css`, self-hosted from `node_modules` via
`@fontsource`. All three preloaded in `BaseLayout.astro:57-77` — Newsreader, Inter, IBM Plex
Mono 400. The mono 500 weight is not preloaded.

**Instrument Sans Variable is retired.** Doc 10 item 3 still mandates it; that mandate is
amended. The previous token map named no typeface at all, which is why the swap went unrecorded.

**Five installed font packages are unused** — `@fontsource-variable/fraunces`,
`instrument-sans`, `montserrat`, `open-sans`, `source-serif-4`. No `@font-face` rule references
any of them. Montserrat and Open Sans are the *retired* faces. `fraunces-*.woff2`,
`montserrat-*.woff2`, and `open-sans-*.woff2` were nonetheless found in `dist/_astro/`, pulled
in by `src/styles/dev-type-compare-fonts.css` via the two `/dev/` pages. Since
`prune-dev-routes.mjs` never runs locally, they may be shipping. Verify against a real Pages
build, then remove the packages.

**One deliberate exception:** `/sms-notification-consent/` loads Montserrat and Open Sans from
Google Fonts. It is byte-preserved under Twilio 10DLC carrier review. Exclude it from any font
grep gate. Do not edit it.

---

## 3. Type scale

| Token | Value | Computed |
| --- | --- | --- |
| `--ac-text-xs` | `0.7rem` | 11.2px |
| `--ac-text-sm` | `0.86rem` | 13.76px |
| `--ac-text-body` | `1rem` | 16px |
| `--ac-text-lead` | `1.12rem` | 17.92px |
| `--ac-text-h3` | `1.35rem` | 21.6px |
| `--ac-text-h2` | `clamp(1.9rem, 3.4vw, 2.6rem)` | 30.4 → 41.6px |
| `--ac-text-h1` | `clamp(2.5rem, 5vw, 3.8rem)` | 40 → 60.8px |
| `--ac-text-display` | `clamp(2.5rem, 5vw, 3.8rem)` | identical to h1 |

### The ratio floor is currently failing

| Viewport | h1 | body | ratio | floor | |
| --- | --- | --- | --- | --- | --- |
| 390px | 40px | 16px | 2.50:1 | 2.5:1 | at the floor, zero margin |
| 1440px | 60.8px | 16px | **3.80:1** | 4:1 | **FAIL** |

Against the hero lead (17.92px) instead of the baseline: **2.23:1 and 3.39:1** — worse on both.
Raising the `--ac-text-h1` maximum to `4rem` gives exactly 4:1; `4.25rem` gives margin.

**Two heading-selector `font-size` violations remain:** `Hero.astro:101` (`.hero h1`) and
`AssessmentForm.astro:2014`. `11` §1 bans this with zero exceptions. The `.ac-type-h1/h2/h3`
rules in `global.css` are the intended mechanism and are **not** violations.

`--ac-text-display` and `--ac-text-h1` are now identical, so the display role — "the one line
the page is remembered by" — has no distinct expression. Either differentiate it or retire it.

---

## 4. Measure

`--ac-measure-intimate` `46ch` · `--ac-measure-read` `62ch` · `--ac-measure-wide` `1200px` ·
`--ac-measure-bleed` `100vw`.

`11` §3's rule — "no two consecutive movements share a container" — is not satisfiable as
built; v2 collapsed the page to a single 1200px shell. Known and accepted, logged as deferred.

---

## 5. Rhythm, spacing, radii, shadows

**Rhythm** — applied as `padding-top` only, one-sided cascade:
`tight` `clamp(2.5rem,4vw,3.5rem)` · `standard` / `open` / `vast` all
`clamp(3.5rem,7vw,6rem)` · `band` `clamp(2.5rem,5vw,3.5rem)`.

Note: `standard`, `open`, and `vast` now resolve to the **same value**. The three-tier rhythm
system collapsed in the v2 port, which means `11` §4's "adjacent sections must differ by at
least 1.5x, or exactly 1.0x" can only ever produce 1.0x between them. Flat by construction.

**Spacing** — v2 scale `--ac-s1` 8px · `s2` 16 · `s3` 24 · `s4` 32 · `s5` 48 · `s6` 64 ·
`s7` 96. Aliases: `--ac-space-1` `0.25rem` · `space-2` `0.5rem` · `space-3…7` → `s3…s7` ·
`space-8` `4.5rem`.

**Other** — `--ac-gutter` `clamp(1.25rem,4vw,3rem)` · `--ac-r` `12px` · `--ac-r-sm` `6px` ·
`--ac-radius-card` `12px` · `--ac-radius-chip` `8px` · `--ac-radius-small` / `radius-control`
→ `--ac-r-sm` · `--ac-shadow-card` `0 1px 2px rgba(16,35,63,.05), 0 16px 40px -20px rgba(16,35,63,.22)` ·
`--ac-shadow-pop` `0 2px 4px rgba(11,24,48,.08), 0 32px 64px -32px rgba(11,24,48,.35)` ·
`--ac-shadow-focus` `0 0 0 3px color-mix(in srgb, var(--ac-color-focus) 30%, transparent)` ·
`--ac-transition-fast` `180ms ease` · `--ac-sticky-cta-height` `4.5rem`.

---

## 6. Action list from this regeneration

1. `--ac-color-steel-300` fails AA on both light surfaces. The session-3 fix was reverted by
   the v2 port. Restore or confirm decorative-only.
2. `--ac-text-h1` maximum is below the ratio floor at 1440px.
3. Two heading-selector `font-size` declarations remain.
4. Five unused font packages; three of their `.woff2` files may be shipping.
5. `rhythm-standard`, `-open`, and `-vast` are identical — the rhythm system is inert.
6. `--ac-text-display` duplicates `--ac-text-h1`.
7. Hairline token split between `--ac-color-rule` and `--ac-color-steel-200` unresolved.
