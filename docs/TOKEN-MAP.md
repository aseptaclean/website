# Token Map — current `--ac-` values and contrast audit

**Regenerated 2026-08-11 from `src/styles/tokens.css` as committed.** The previous version of
this file documented a pre-v2 palette (`--ac-color-navy-900: #122840`, `--ac-color-steel-300`
darkened to `#59738d` from an original `#a8b8c8`, and other hex values) that predates the
FINAL-v2 port. Every hex below was copied directly from `tokens.css` at time of writing — do
not hand-maintain this file; regenerate it whenever `tokens.css` changes materially.

## Colors — full current values

| Token | Value | Role |
| --- | --- | --- |
| `--ac-color-navy-950` | `#0b1830` | Darkest navy — Final CTA band, deepest surfaces |
| `--ac-color-navy-900` | `#10233f` | Navy — dark section surface |
| `--ac-color-navy-800` | `#1c355e` | Navy, lighter step — dark section surface |
| `--ac-color-navy-700` | `#27436f` | Navy, lightest step |
| `--ac-color-blue-500` | `#4a7fc1` | Accent blue |
| `--ac-color-blue-deep` | `#2e5c9e` | Deep blue — links/accent text on light surfaces |
| `--ac-color-blue-pale` | `#e9f0f9` | Pale blue tint surface |
| `--ac-color-blue-ghost` | `#f4f8fc` | Faintest blue tint surface |
| `--ac-color-ink-900` | `#13202f` | Primary text (alias of ink-700) |
| `--ac-color-ink-700` | `#13202f` | Primary text — alias retained for existing component references |
| `--ac-color-ink-600` | `#46566b` | Secondary text (alias of ink-500) |
| `--ac-color-ink-500` | `#46566b` | Secondary text — alias retained for existing component references |
| `--ac-color-ink-400` | `#617087` | Muted text (captions, meta). Darkened from v2's literal `#8494a8` — see Contrast audit below |
| `--ac-color-rule` | `#e3e9f0` | Hairline rule (alias of line) |
| `--ac-color-line` | `#e3e9f0` | Hairline rule |
| `--ac-color-line-strong` | `#ccd6e2` | Stronger hairline rule |
| `--ac-color-paper` | `#ffffff` | White surface |
| `--ac-color-warm-white` | `#f5f8fb` | Warm-white surface (alias of bg-soft) |
| `--ac-color-bg-soft` | `#f5f8fb` | Warm-white surface |
| `--ac-color-gold` | `#c9a961` | Accent gold — decorative, dark-surface only (see audit) |
| `--ac-color-clear` | `#1e7a4f` | Status: clear/positive (alias of success) |
| `--ac-color-clear-pale` | `#e7f3ec` | Pale green status surface |
| `--ac-color-review` | `#9a6414` | Status: needs review/caution |
| `--ac-color-review-pale` | `#fbf3e4` | Pale amber status surface |
| `--ac-color-steel-300` | `#8494a8` | Steel — **borders and non-text decoration only** on light surfaces (see audit; not used as text color anywhere in `src/`) |
| `--ac-color-steel-200` | `color-mix(in srgb, var(--ac-color-steel-300) 55%, white)` → `#bbc4cf` | Hairline / stage-numeral tint, derived |
| `--ac-color-steel-100` | `#f5f8fb` | Pale canvas tint (same value as warm-white) |
| `--ac-color-steel-on-navy` | `#9fb2ca` | Steel-role text color for dark/navy surfaces — the on-navy counterpart already exists (see audit) |
| `--ac-color-focus` | `#2e5c9e` | Focus ring (alias of blue-deep) |
| `--ac-color-error` | `#a3392f` | Error state |
| `--ac-color-success` | `#1e7a4f` | Success state (alias of clear) |
| `--ac-color-accent-tint` | `var(--ac-color-blue-pale)` | Alias |
| `--ac-color-accent-text` | `var(--ac-color-blue-deep)` | Alias |

## Fonts

| Token | Value |
| --- | --- |
| `--ac-font-display` | `"Newsreader Variable", Georgia, serif` |
| `--ac-font-sans` | `"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--ac-font-mono` | `"IBM Plex Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace` |

Instrument Sans Variable does not appear in `tokens.css` — it was retired when the FINAL-v2
port swapped the sans face to Inter Variable. See `AGENTS.md` §6 and
`docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` item 3 (amended).

## Type scale

| Token | Value |
| --- | --- |
| `--ac-text-xs` | `0.7rem` |
| `--ac-text-sm` | `0.86rem` |
| `--ac-text-body` | `1rem` |
| `--ac-text-lead` | `1.12rem` |
| `--ac-text-h3` | `1.35rem` |
| `--ac-text-h2` | `clamp(1.9rem, 3.4vw, 2.6rem)` |
| `--ac-text-h1` | `clamp(2.75rem, 5vw, 4.25rem)` |
| `--ac-text-display` | `clamp(2.5rem, 5vw, 3.8rem)` |

## Measure

| Token | Value |
| --- | --- |
| `--ac-measure-intimate` | `46ch` |
| `--ac-measure-read` | `62ch` |
| `--ac-measure-wide` | `1200px` |
| `--ac-measure-bleed` | `100vw` |

## Rhythm

| Token | Value |
| --- | --- |
| `--ac-rhythm-tight` | `clamp(2.5rem, 4vw, 3.5rem)` |
| `--ac-rhythm-standard` | `clamp(3.5rem, 7vw, 6rem)` |
| `--ac-rhythm-open` | `clamp(3.5rem, 7vw, 6rem)` |
| `--ac-rhythm-vast` | `clamp(3.5rem, 7vw, 6rem)` |
| `--ac-rhythm-band` | `clamp(2.5rem, 5vw, 3.5rem)` |

## Spacing, radius, shadow, misc

| Token | Value |
| --- | --- |
| `--ac-s1`…`--ac-s7` | `8px, 16px, 24px, 32px, 48px, 64px, 96px` |
| `--ac-space-1` | `0.25rem` |
| `--ac-space-2` | `0.5rem` |
| `--ac-space-3`…`--ac-space-7` | alias `--ac-s3`…`--ac-s7` |
| `--ac-space-8` | `4.5rem` |
| `--ac-gutter` | `clamp(1.25rem, 4vw, 3rem)` |
| `--ac-radius-small` / `--ac-radius-control` | alias `--ac-r-sm` |
| `--ac-r` | `12px` |
| `--ac-r-sm` | `6px` |
| `--ac-radius-card` | `12px` |
| `--ac-radius-chip` | `8px` |
| `--ac-shadow-card` | `0 1px 2px rgba(16, 35, 63, 0.05), 0 16px 40px -20px rgba(16, 35, 63, 0.22)` |
| `--ac-shadow-pop` | `0 2px 4px rgba(11, 24, 48, 0.08), 0 32px 64px -32px rgba(11, 24, 48, 0.35)` |
| `--ac-shadow-focus` | `0 0 0 3px color-mix(in srgb, var(--ac-color-focus) 30%, transparent)` |
| `--ac-transition-fast` | `180ms ease` |
| `--ac-sticky-cta-height` | `4.5rem` |

---

## Contrast audit — every color pairing that renders as text (2026-08-11)

Computed with the real WCAG 2.1 relative-luminance formula (sRGB → linear, `0.2126R +
0.7152G + 0.0722B`, contrast = `(L1+0.05)/(L2+0.05)`), not a visual estimate. Thresholds:
**AA-normal text ≥ 4.5:1**, **AA-large text (≥18.66px bold or ≥24px regular) ≥ 3:1**,
**AA non-text (borders/icons) ≥ 3:1**. `color-mix()` tokens (`--ac-color-steel-200`) were
resolved to their computed hex (`#bbc4cf`) before measuring.

### The two tokens named in this audit's brief

**`--ac-color-steel-300` (`#8494a8`) on white:** `3.10:1` — **fails AA-normal**, passes
AA-large and the 3:1 non-text threshold. This is not a live bug: `steel-300` is never used as
text color anywhere in `src/` (verified by grep) — every consumption site
(`LegalPolicy.astro`, `data-request.astro`, `QuickHandoffForm.astro`, `AssessmentForm.astro`,
`ResidenceBaselineRecord.astro`, `thank-you.astro`, `dev/type-specimen.astro`) uses it as a
`border` color, where the 3:1 non-text threshold is the applicable one and it passes (3.10:1
on white, 2.90:1 on warm-white — the warm-white border use is below 3:1 and worth flagging,
see below).

**`--ac-color-ink-400` (`#617087`) on white:** `5.03:1` — **passes AA-normal**, consistent
with the token's own code comment in `tokens.css` (darkened from v2's literal `#8494a8`,
which measured 3.09:1, specifically to clear 4.5:1). On warm-white it drops to `4.72:1` —
still passes. `ink-400` is used exclusively as text color across `src/` (`CredentialBar`,
`RequestForm`, `HandoffStandard`, `HandoffRecord`, `Pricing`, `OperatorAccountability`,
`ServiceProof`, `ServiceMethodRail`, and several page files) — correct application, no
findings.

**Does steel need an on-navy counterpart?** No further work needed — **it already exists**.
`--ac-color-steel-on-navy` (`#9fb2ca`) is a distinct token specifically for steel-role text on
dark surfaces, and it is already the one used everywhere `src/` needs steel-toned text on
navy (`about/index.astro`, `estate-cleanout-san-jose/index.astro`,
`property-cleanouts-for-managers/index.astro`, `private-residence-reset.astro`,
`ResidenceBaselineRecord.astro`). Measured: `8.16:1` on navy-950, `7.27:1` on navy-900,
`5.64:1` on navy-800 — all pass AA-normal comfortably. Plain `steel-300` on navy would
underperform this (`5.71:1` / `5.08:1` / `3.94:1` — the navy-800 case fails AA-normal), which
is exactly why the separate token exists. No hex needs to change; the system is correctly
built, just previously undocumented.

### Full text-on-surface matrix

Surfaces measured: white/paper, warm-white, blue-pale, blue-ghost, navy-950, navy-900,
navy-800, clear-pale, review-pale.

| Text token | Best surface | Worst surface actually used in `src/` | Notes |
| --- | --- | --- | --- |
| `ink-900` / `ink-700` | white 16.47:1 | navy-800 1.35:1 (never paired this way in `src/`) | Passes AA-normal on every light surface used |
| `ink-600` / `ink-500` | white 7.49:1 | navy surfaces all fail (not used there) | Passes AA-normal on every light surface used |
| `ink-400` | white 5.03:1 | blue-pale 4.38:1 (FAIL if used there — not currently used on blue-pale in `src/`) | Passes on white/warm-white/blue-ghost, the surfaces it's actually used on |
| `blue-deep` (links/accent text) | white 6.69:1 | navy surfaces fail (not used as text there) | Passes AA-normal on all light surfaces |
| `blue-500` | navy-950 4.29:1 | white 4.12:1 | **Fails AA-normal on every surface it could sit on** — passes AA-large only. Not found used as a text color in `src/` (decorative/accent use only); flag if ever promoted to body text |
| `gold` | navy-950 7.86:1 | white 2.25:1 | Only usable as text on navy surfaces — matches its documented "dark-surface only" role |
| `clear` / `success` | white 5.31:1 | navy-900 2.96:1 | Passes on light/pale surfaces used; do not place on navy as normal text |
| `review` | white 4.99:1 | navy-800 2.45:1 | Passes on light/pale surfaces used |
| `error` | white 6.60:1 | navy surfaces fail | Passes on all light surfaces |
| `steel-300` | navy-950 5.71:1 (text) / white 3.10:1 (non-text) | warm-white 2.90:1 (non-text, borderline below 3:1) | Border-only use in `src/`; the one sub-3:1 case (warm-white) is a hairline border, low-severity |
| `steel-on-navy` | navy-950 8.16:1 | navy-800 5.64:1 | Correct token for steel-role text on any navy surface; passes everywhere it's used |

**One finding worth a follow-up, not fixed here (documentation-only task):** `steel-300` as a
`border` color on `warm-white` measures `2.90:1`, just under the 3:1 non-text AA threshold.
Low severity — it's a 1px hairline border, not a text or essential-graphic element, and AA's
3:1 non-text rule applies to "graphical objects required to understand content," which a
decorative card border is not. Noted for whoever next touches `tokens.css`; no code changed
as part of this documentation pass per the task scope.
