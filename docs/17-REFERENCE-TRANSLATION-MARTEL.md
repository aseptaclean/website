# 17 — Reference Translation (Martel): Premium Contractor Layout → Aseptaclean

**Purpose:** Extract the transferable design principles from the reference set (a clean modern
electrical-contractor site, plus the previously-studied BluSky and acquisition.com screenshots)
and translate them into an original Aseptaclean design system — without copying any branding,
copy, imagery, or proprietary asset.

**Depends on / does not override:** `02-BUILD-SPEC.md` (tokens, components — authoritative),
`03-VOICE.md`, `04-CLAIMS-GUARDRAILS.md`, `B01-home.md`. Where this file and a locked spec
conflict, the locked spec wins. This file adds *visual rhythm and composition rules* on top of
the existing token system; it does not fork it. Everything below is expressed in existing
`--ac-*` tokens so it is directly buildable.

**One-line thesis:** Adopt the reference's *spacing, rhythm, two-color restraint, card system,
and typographic scale*. Reject its *proof claims, emotional register, hero photography, and
warm accent*. The reference's real job-site photos become our document artifacts.

---

## 1. What works in the reference

### 1.1 The electrical-contractor site (primary reference)

**Vertical rhythm and whitespace.** Sections breathe. Generous top/bottom padding (visually
~96–128px desktop) makes a thin site feel deliberate and expensive. Emptiness is used as a
confidence signal — the opposite of the cramped, everything-above-the-fold competitor sites in
`01-STRATEGY.md` §3. This is the single most transferable move.

**Two-color discipline.** Navy + one accent + white/light-gray, and nothing else. No gradient
soup, no icon rainbow. Restraint reads as competence. Directly aligned with `02-BUILD-SPEC.md` §4.

**Typographic contrast.** A high-contrast serif *display* for headings against a clean humanist
sans *body*. The serif does most of the "premium/established" work. Headings are large, centered
for section openers, and confident. Body is left-aligned, ~16–18px, comfortable measure.

**Consistent card system.** Every card is the same object: image top → tinted icon chip → title
→ 1–2 sentence description. Predictability reads as systematized, not templated-cheap, *because*
the system is held rigidly.

**Alternating section backgrounds.** White → light-gray → navy → color-block, in a repeating
rhythm, to separate sections without borders. One saturated color-block section (their emergency
band) creates a single visual "loud" moment and anchors a CTA.

**Real, unglamorous work photography.** Their images are actual job sites — panels, racks,
chargers, generators — not stock people in aprons. This is genuinely on-strategy and matches our
own "real photos or none" rule. Credibility through specific evidence, not stock emotion.

**Scannable capability lists.** Green-check bullet grids for "what we do" — fast to scan, reads
as a checklist (which itself signals process). This maps almost perfectly onto our set-aside /
scope-list mechanic.

**Persistent phone CTA.** Accent-colored phone button pinned top-right in the header, repeated in
every CTA band. The phone number is never more than a glance away — matches our mobile-first,
call-first requirement.

### 1.2 BluSky / restoration reference (secondary)

**Documentation- and case-study-forward proof.** Named case studies with situation → outcome
structure, and a "current clients" strip. This is the *format* our `/projects/` case studies
should take once jobs close — it's exactly our documentation-as-differentiator wedge, already
productized by a larger competitor.

### 1.3 acquisition.com reference (tertiary)

**Offer-stack density and single-decision pages.** Aggressive value-stacking and one dominant
CTA per view. The *principle* — stack the deliverables visibly, drive one action — is already in
`01-STRATEGY.md` §6 (the seven-deliverable assessment). Its *aesthetic* (purple, loud, hype) is
wrong for us and should be ignored entirely.

---

## 2. What is weak or inappropriate for Aseptaclean

| Reference element | Why it fails for us |
| --- | --- |
| **"20+ Years / 100% / Quality Guaranteed / Trusted" stat bar** | Zero jobs, zero reviews. These are past-performance and superlative claims banned in `04-CLAIMS-GUARDRAILS.md` §2 and `03-VOICE.md` §5. Forging them is the fastest way to look fake to a fiduciary and to a scared family. |
| **"Get a Free Quote" CTA** | Guardrails require "free on-site assessment with a written scope," not "quote." We do not quote; we scope. |
| **Staged/heroic hero photo** (worker shot from below, sky) | Our service can't be photographed pre-proof without shame or sensationalism. `B01`/`B02` explicitly forbid hero imagery. Our signature is the document, not a person. |
| **Vague trust icons** (pen = "Expert Team", star = "Quality") | Decorative icon theater. Says nothing falsifiable. We replace icons-as-vibe with named, falsifiable guarantees. |
| **"Areas We Serve" pill cloud** | Thin city-stuffing with no original content — precisely what `02-BUILD-SPEC.md` §5 and `06-location-mountain-view.md` §8 prohibit. Reads as SEO filler and risks penalty. |
| **Warm gold accent** | Approachable and generic. Our premium cue is cold clinical restraint; a warm pop pulls us toward "friendly local contractor," away from contamination-control authority. |
| **12–16px rounded cards** | Consumer-friendly softness. Our `--ac-radius: 2px` reads precise and lab-grade. Rounding to match the reference would erase a differentiator. |
| **Confident, "we're the experts" register** | Correct for electrical. Wrong for a shame-buyer at 11pm. Our register is calm competence that names their fear, per `03-VOICE.md` §1. |
| **Multiple co-equal CTAs competing** | Our research (in memory) says single dominant CTA lifts conversion sharply. Call + form is fine; a scatter of equal buttons is not. |

---

## 3. Design principles worth adopting

1. **Whitespace is the premium signal.** Spend it lavishly and consistently.
2. **Two colors do all the work.** Navy + one restrained accent (ours: signal-green) + neutrals.
3. **Type contrast carries authority.** A display face against a clean body, held to a strict scale.
4. **One card object, applied rigidly.** Consistency reads as a system, not a template.
5. **Rhythm through alternating backgrounds, not borders.** One loud section, everything else quiet.
6. **Evidence over emotion.** Real artifacts (for us: documents) beat stock feeling.
7. **Checklists signal process.** Use the scannable list form for our set-aside/scope mechanics.
8. **The phone is always one glance away.** Persistent, accent-colored, every band.

---

## 4. Specific rules for Aseptaclean (buildable, in-token)

**R1 — No hero photograph anywhere.** Home hero is split (copy left, `ShortLeadForm` right per
`B01`). Service/location/pricing heroes are compact, text-led. The pale hero wash
(`--ac-blue-pale` → white, left→right) is the *only* hero decoration.

**R2 — The document artifact is the single bold moment.** `DocumentSample` at full scale is where
the page spends boldness (home §8). Everything above and below stays navy-and-hairline quiet.
This is our replacement for the reference's hero photo and its stat bar.

**R3 — Replace the stat bar with the guarantee grid.** Where the reference puts "20+ / 100% /
5★", we put the four named guarantees (`GuaranteeGrid`, `--ac-signal`). Falsifiable forward
commitments, not past-performance claims.

**R4 — Keep sharp corners.** `--ac-radius: 2px` on every card, button, input, chip. Do not round.

**R5 — Keep the accent cold.** Signal-green (`--ac-signal #2f6f4f`) for guarantees/confirmation;
caution-amber (`--ac-caution #8a5a1f`) reserved strictly for exclusions/scope boundaries. **No
warm brand accent, no gold.**

**R6 — One saturated section maximum per page.** Use `--ac-navy-deep` as the single "loud"
band (a CTA band or the guarantee panel), mirroring the reference's one color-block moment.
Never two.

**R7 — Capability/what-we-do lists use the checklist form**, but styled as a record (hairline
rule, monospace field label option) — echoing `FoundPropertyProtocol`, not a generic green-tick grid.

**R8 — Section backgrounds alternate on a fixed cycle:** `--ac-white` → `--ac-bg-light` →
`--ac-white` → (loud band) → `--ac-white`. No borders between sections; the tonal shift separates them.

**R9 — CTA wording is fixed by guardrails:** "Request a property assessment" / "Call" / "Text a
photo." Never "Get a free quote."

**R10 — Phone persistent everywhere:** header `tel:` link + accent button (desktop), header phone
icon (mobile), sticky Call / Text-a-photo bar below 48rem (per `02-BUILD-SPEC.md` §6).

---

## 5. Recommended page structure & section order

This does **not** replace `B01-home.md` §4 or the one-page directive — it confirms and refines the
rhythm. Section order for the one-page launch / home:

1. Announcement bar — service area + phone (`--ac-navy`)
2. Header — logo · nav · phone `tel:` + accent button
3. **Hero (split)** — H1 · approval line · 2 short paras · Call / Text-a-photo · `ShortLeadForm` card right. Pale wash. No photo.
4. TrustBar — licensed · insured · owner-led · unmarked vehicles. Text only. *(This is where the reference put its stat bar; ours is honest and text-based.)*
5. "You are probably dealing with one of these" — 4 situation cards (not service cards)
6. **GuaranteeGrid** — the four guarantees. The conversion engine. Full space. *(replaces the reference's stat bar)*
7. Defined Clearing Method — 5 steps, restrained, one line each
8. **DocumentSample (full scale)** — the single bold moment *(replaces the hero photo)*
9. FoundPropertyProtocol — set-aside checklist artifact
10. Cost-honesty band — one paragraph + link to `/pricing/`
11. Founder band — pharma/pathology→documentation line *(our authentic authority, replaces "20 years experience")*
12. ReviewStrip — renders nothing until real reviews exist
13. Service area — core cities plainly; wider Bay Area labeled qualified coverage *(NOT a pill cloud)*
14. For professionals — single short Track-B routing band
15. FAQ — 6 real questions, native `<details>`
16. Final CTA band (`--ac-navy-deep`, the one loud section) — Call · Text · form
17. Footer — nav groups, NAP, license/insurance, scope disclaimer, guarantee links

**Section length target:** each major section occupies roughly 1.0–1.5 viewport heights of
scroll on desktop; no section shorter than a comfortable half-viewport (avoids the cramped
competitor feel), none longer than ~2 viewports except the document + protocol pairing.

---

## 6. Component guidelines (typography, color, spacing, imagery, buttons, cards, icons)

### 6.1 Typography

Body/scale stay as `02-BUILD-SPEC.md` §3. **Open question flagged for decision:** the heading
face.

- **Option A (locked):** Montserrat 600/700. Modern, clean, safe, decided. Slightly generic.
- **Option B (recommended to test):** a restrained transitional/serif display for **H1–H2 only**,
  keeping Open Sans body. Rationale: a serif *is* the typography of a record/document — it
  reinforces the entire "we write things down" thesis at the type level, and it's the single
  biggest lever behind why the reference reads premium. Self-hostable candidates worth a
  side-by-side: **Source Serif 4**, **Newsreader**, or **Fraunces** (Fraunces has an optical/precise
  character that suits a clinical brand; keep weight ≤ 600 to avoid funeral-home gravitas).
  H3 and below stay sans for UI clarity.

Rules regardless of choice:
- H1 ≤ 3rem (`--ac-type-h1`). Section-opener H2 centered; in-section H2/H3 left-aligned.
- Body 1rem min, measure 55–65ch, line-height 1.55–1.7. `text-wrap: balance` on H1–H3.
- One weight step between levels; never more than two type sizes visible in a single card.

### 6.2 Color

Use existing tokens only.
- Backgrounds: `--ac-white`, `--ac-bg-light`, `--ac-navy`, `--ac-navy-deep`.
- Text: `--ac-charcoal` headings on light, `--ac-body-gray` body on light, `--ac-text-on-dark` on navy.
- Accent (single, cold): `--ac-signal` for guarantees/confirmation. `--ac-caution` only for
  exclusions. **No gold, no third accent.**
- Contrast: verify `--ac-body-gray` on `--ac-bg-light` ≥ 4.5:1 (per §13 floor — patched already
  in the mockup; hold it).

### 6.3 Spacing

- Section padding (block): `--ac-section-standard` default; `--ac-section-spacious` for hero,
  guarantee grid, and the document block; `--ac-section-tight` for TrustBar and dense list bands.
- Shell: `--ac-shell-width` (1280px) for full sections; `--ac-shell-narrow` (48rem) for
  assessment, article, and any pure-reading column.
- Card internal padding: `--ac-space-5` to `--ac-space-6`. Grid gaps: `--ac-space-5` desktop,
  `--ac-space-4` mobile.
- Between stacked cards on mobile: `--ac-space-5` minimum (do not compress the guarantee grid).

### 6.4 Imagery

- **No stock photography of people, crews, boxes, or hoarded interiors — ever.**
- Permitted imagery: rendered document artifacts (primary), real anonymized project photos with
  signed release (only once they exist), the founder portrait (once available).
- Until real photos exist, image slots are filled by `DocumentSample`, `FoundPropertyProtocol`,
  and `[PROOF PLACEHOLDER]` blocks — never a stock stand-in.
- Any future real photo: explicit `width`/`height`, AVIF/WebP, `loading="lazy"` below fold,
  `fetchpriority="high"` only on an LCP image (the split hero has none, so LCP is text).

### 6.5 Buttons

- Sharp (`--ac-radius: 2px`), min-height 48px, full-width below 48rem.
- Primary: `--ac-navy` fill / white text. Ghost: navy outline / navy text. On dark: white/navy invert.
- The phone button in the header is the *one* place a warm treatment would normally live — resist
  it; use navy fill or a signal-green outline, not gold.
- Never more than one *primary* button per view; secondary actions are ghost or plain `tel:` links.

### 6.6 Cards

- One object type: hairline border (`--ac-hairline`) OR soft single shadow (not both), 2px radius,
  optional `--ac-navy` top rule (the "blue top rule" Card variant) for emphasis cards.
- Situation cards (home §5): title + one sentence + link. No icons required.
- Guarantee cards: `--ac-signal` marker, name, one-line promise, optional document chip.
- Do not mix rounded and sharp; do not add drop-shadow depth stacks. One elevation level total.

### 6.7 Icons

- Minimal. Line icons only, single-color, small, used for wayfinding (phone, sms, chevrons) — not
  as decorative "trust" fillers. If an icon isn't functional, cut it.
- No tinted rounded-square icon chips as a decorative motif (that's the reference's look). Our
  decorative signature is **The Mark** (solid navy rectangle behind a word) and the document
  artifact — nothing else.

---

## 7. Desktop & mobile layout rules

**Desktop (≥ 72rem):**
- 12-col mental grid, 1280px shell, `--ac-gutter` gutters.
- Hero: 7/5 or 6/6 split (copy / form). Form card sits at H1 height, not hero bottom.
- Guarantee grid: 4-up or 2×2 with generous gap; never cramped.
- Situation/service cards: 3-up or 4-up, equal height.
- Section-opener H2 centered with ~640px max intro paragraph beneath.

**Breakpoints:** 72 / 68 / 58 / 48rem. Change layout before shrinking type (per §14).

**Mobile (< 48rem) — the primary target (70% of traffic, often 11pm, often upset):**
- Everything single-column. Guarantee grid stacks 1-up with `--ac-space-5` gaps.
- Hero form drops directly beneath H1 + first paragraph, not at hero bottom.
- Sticky bottom Call / Text-a-photo bar after 400px scroll; never covers a submit button;
  suppressed below the form on `/request-assessment/`.
- Phone reachable from header without opening the menu.
- All CTAs full-width, ≥48px. Inputs ≥48px, `inputmode="tel"` on phone.
- Test at 320px: no horizontal overflow, `overflow-wrap: break-word` global.
- Document artifact: scales to `inline`/`chip` on mobile so it stays legible without pinch-zoom.

---

## 8. Conversion & trust-building recommendations

- **Substitute proof, don't fabricate it.** Every place the reference asserts credibility with a
  number, we assert it with a *falsifiable forward commitment* (guarantee) or a *rendered artifact*
  (document). This is stronger for a zero-review business because it's checkable and no competitor
  has it.
- **Single dominant action per view.** Call is primary on mobile; the 3-field form is the primary
  desktop hero action. Text-a-photo is the low-friction secondary (highest-leverage per strategy).
- **Founder as authority engine.** The pharma/pathology→documentation story replaces "years in
  business." Give it a face, a name, and space (home §11) — it's true, verifiable, non-copyable.
- **Cost honesty band** early enough to be seen; being the only SERP result that discusses money
  outperforms a testimonial you don't have.
- **Case-study format (later):** adopt the restoration-reference structure — situation →
  constraint → what was set aside → outcome → documentation — the moment the first job closes.
- **Speed-to-lead is a design requirement, not just ops:** the form/worker path must fire the SMS
  alert within seconds; the sticky bar exists to convert the mobile caller before they dial the
  next company.

---

## 9. Copy in principle / reinterpret / reject

**Copy in principle (extract the rule, not the execution):**
- Generous, consistent vertical rhythm and whitespace.
- Two-color restraint.
- Display-vs-body typographic contrast and a strict type scale.
- One rigid card object.
- Alternating backgrounds; one loud section; one persistent phone CTA.
- Scannable checklist form for capability lists.
- Real, specific, unglamorous evidence over stock emotion.

**Reinterpret (same intent, our materials):**
- Their hero photo → our full-scale document artifact.
- Their stat bar → our guarantee grid.
- Their green-tick capability grid → our set-aside/scope checklist artifact.
- Their case-study strip → our documentation-forward `/projects/`.
- Their tinted icon chips → The Mark + document chip, used sparingly.

**Reject outright:**
- All past-performance/superlative claims (20+ / 100% / Quality Guaranteed / Trusted).
- "Get a free quote" wording.
- Any hero or stock photography of people.
- Warm gold accent; third colors; gradient stacks.
- Rounded 12–16px cards (keep 2px).
- The "Areas We Serve" pill cloud / city-stuffing.
- The confident-salesman emotional register.
- Multiple co-equal competing CTAs.

---

## 10. Final design brief (hand directly to designer/developer)

**Project:** Aseptaclean — one-page launch site (multi-page architecture preserved), Astro 5 +
Cloudflare Pages. Authoritative token file: `02-BUILD-SPEC.md` §3. Voice: `03-VOICE.md`. Claims:
`04-CLAIMS-GUARDRAILS.md`. Do not deviate from these.

**Positioning to express visually:** a premium, clinical, documentation-obsessed
property-clearing and contamination-control company. Feel: precise, restrained, lab-grade,
discreet, authoritative, safe. Not a friendly local contractor, not a maid service.

**Look & feel:**
- Palette: navy (`--ac-navy` / `--ac-navy-deep`) + neutrals (`--ac-white` / `--ac-bg-light`);
  single cold accent `--ac-signal` (guarantees), `--ac-caution` reserved for exclusions only.
  No gold, no third accent, no gradients beyond the single pale hero wash.
- Corners: sharp, 2px everywhere. One elevation level (hairline OR soft shadow, never both).
- Type: Open Sans body (locked). Headings: build with Montserrat 600/700 **and** deliver a
  variant with a restrained serif (Source Serif 4 / Newsreader / Fraunces ≤600) for H1–H2 so the
  owner can pick; H3+ stays sans. Self-host woff2, `font-display: swap`. H1 ≤ 3rem.
- Imagery: NO stock, NO people, NO hoarding photos. Image slots are filled by rendered document
  artifacts (`DocumentSample`, `FoundPropertyProtocol`) and visible `[PROOF PLACEHOLDER]` blocks
  until real signed-release photos exist.

**Layout:**
- 1280px shell, generous section padding (`--ac-section-standard`/`-spacious`), alternating
  white/light-gray backgrounds, exactly one saturated `--ac-navy-deep` band per page.
- Section order per §5 above (consistent with `B01-home.md`).
- Split hero, no photo: copy + 3-field `ShortLeadForm` card. The full-scale document artifact is
  the single bold visual moment; everything else stays quiet.
- Guarantee grid (four named guarantees) replaces any stats bar. Founder band replaces any
  "years experience." Text TrustBar (licensed/insured/owner-led/unmarked) — no badge images.
- Service area listed plainly; no pill-cloud city list.

**Conversion:**
- Single dominant action per view. Call primary on mobile; hero form primary on desktop;
  Text-a-photo as low-friction secondary. CTA wording: "Request a property assessment" / "Call" /
  "Text a photo." Never "free quote."
- Persistent phone: header `tel:` (desktop button + mobile icon) and sticky Call / Text-a-photo
  bar below 48rem after 400px scroll; never covering submit buttons; suppressed under the form on
  `/request-assessment/`.

**Mobile-first (primary target):** single column, ≥48px controls, form under H1 in hero,
guarantee grid stacked with generous gaps, document artifact scales to inline/chip, zero
horizontal overflow at 320px.

**Quality bars:** Lighthouse ≥95/100/100/100 mobile; LCP <2.0s; JS <50KB; CLS <0.05; WCAG 2.2 AA;
renders fully with JS disabled; zero `[PROOF PLACEHOLDER]` on production builds. Run the
`04-CLAIMS-GUARDRAILS.md` §5 checklist against every screen before shipping.

**Explicitly forbidden:** stock/hero photography of people; gold/warm accent; rounded 12–16px
cards; past-performance or superlative claims; "free quote"; city pill clouds; multiple co-equal
CTAs; any claim the owner cannot currently substantiate.
