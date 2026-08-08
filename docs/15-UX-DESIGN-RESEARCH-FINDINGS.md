# 15 — UI/UX and Design Research Findings

**Status:** Active. Companion to `14-RESEARCH-FINDINGS.md`, which covered buyer psychology
and conversion copy. This file covers the fifth lens: interface mechanics, performance, and
accessibility — the ones that are measurable rather than a matter of taste.
**Repo location:** `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md`

---

## 1. Page speed is not a technical nice-to-have — it is a conversion variable with a
quantified cost, and your build spec already set the right target

The research is unusually consistent across sources: pages loading in <cite index="62-1">around one second convert near 3%, while pages taking six seconds drop to roughly 1%</cite>, and separately, <cite index="65-1">pages under one second show a median conversion rate of 4.4% against 1.7% for pages over four seconds</cite>. On mobile specifically, <cite index="63-1">every added second of load time can cost up to 20% of conversions</cite>, and <cite index="59-1">bounce probability rises 32% as load time moves from one to three seconds</cite>.

This is not abstract. Real companies have measured it directly: <cite index="57-1">Vodafone gained 8% more sales from a 31% LCP improvement, and Swappie cut load time 23% and grew mobile revenue 42% by fixing Core Web Vitals</cite>. Yelp <cite index="64-1">cut mobile First Contentful Paint from 4.4 to 1.8 seconds and saw 15% more conversions on their contact page</cite> — the closest documented parallel to a lead-generation contact page like yours.

**What this means for the build:** `02-BUILD-SPEC.md`'s LCP <2.0s and JS <50KB targets in
`13-REMEDIATION-PASS.md`'s scope are not conservative — they're load-bearing. The Google Fonts
`@import` in the mockup file is a real LCP risk if carried into production; the canonical spec's
instruction to self-host Newsreader and Instrument Sans as WOFF2 rather than pull from Google's
CDN is the correct call and should not get relaxed for convenience.

**Action:** treat the performance budget as a release blocker with the same weight as the form
and phone fixes, not a secondary polish item. A beautifully composed page that loads in four
seconds on mobile is measurably worse than a plainer page that loads in one.

---

## 2. The sticky mobile call bar and the single-CTA rule are both backed by data — and the
data explains exactly why D3 and D11 in the remediation pass mattered

**Sticky mobile CTAs work, specifically on mobile, specifically at the bottom of the screen.**
A large-scale 2026 study across e-commerce sessions found <cite index="73-1">sticky bottom-bar CTAs generated 31% more conversions than non-sticky equivalents, with 18 percentage points less cart abandonment</cite>. Independent research on 33 separate sticky-element experiments concluded the effect is real but conditional: <cite index="68-1">the most successful placement is at the bottom of the screen, on mobile specifically — desktop sticky elements showed much weaker or no effect</cite>. This directly confirms the sticky call bar spec in `02-BUILD-SPEC.md` §6 — bottom-fixed, mobile-only, is the right shape, not a guess.

**One CTA beats several, by a wide margin.** Direct testing found <cite index="74-1">reducing a page to a single call to action increased conversion 266% compared to multiple competing CTAs</cite>. This is the exact mechanism behind D3 and D11 in the remediation pass: a header CTA reading "Get My Handoff Plan" sitting sixty pixels above a hero CTA reading "Get My 24-Hour Handoff Plan" is not two reinforcing prompts, it is two competing ones, and the research says that measurably costs conversion, not just looks sloppy.

**Action:** treat CTA-label consistency as more than a copy-editing fix. Every CTA on the page,
including the header, sticky bar, hero, and final movement, needs to read as one action with one
name — this is D3 in the remediation pass, and the research raises its priority from "tidiness"
to "quantified conversion cost."

---

## 3. Self-audit: the mockup file has at least one real accessibility problem, found by
checking it against WCAG contrast math rather than eyeballing it

Your build spec requires <cite index="80-1">body text at minimum 16px with line-height at least 1.5x</cite> and WCAG AA contrast: <cite index="77-1">4.5:1 for normal text, 3:1 for text at 24px or larger (or 18.5px+ bold)</cite>. Checking the actual token values in `aseptaclean-homepage-mockup.html` against that standard:

| Token pairing | Used for | Estimated contrast | Likely status |
| --- | --- | --- | --- |
| `--steel-400` (#7d8a9a) on white / `--steel-50` | Eyebrows, captions, price driver labels | ~3.2–3.6:1 | **Likely fails** — eyebrows render at 12px, which is normal text under the WCAG size threshold, not large text |
| `--body-gray` (#546478) on white | Lead paragraphs, body copy | ~5.5–6:1 | Passes |
| `--steel-300` (#a9b6c4) as separator/quote text | Trustline dividers | ~2:1 | Fails as text, acceptable only if treated as pure decoration with `aria-hidden` |

**This is a real finding, not a hypothetical one — I built this into the mockup myself and it
needs to be corrected before this reference is used as a build target.** The eyebrow color in
particular is used across all eleven movements, so it's a single token fix, not eleven separate
ones. Either darken `--steel-400` until it clears 4.5:1 at 12px, or increase eyebrow size to the
24px+ large-text threshold and keep the lighter tone — the second option breaks the restrained
eyebrow treatment the composition doc calls for, so darkening the token is the better fix.

**Action:** run an actual contrast-checker tool (not estimation) against every token pairing in
`docs/TOKEN-MAP.md` before Session 3B ships. This is a five-minute mechanical check that a Codex
session should run and report, not something to catch by eye in a screenshot review.

---

## 4. What this changes in the actual build

| Change | Priority | Where |
| --- | --- | --- |
| Treat LCP/JS budget as a release blocker, equal weight to form/phone fixes | High | `04-RELEASE-CHECKLIST.md`, Session 9 |
| Self-host fonts as WOFF2, never Google Fonts CDN in production | High — already specified, don't relax it | Session 3 |
| Darken `--steel-400` (or equivalent eyebrow token) until it clears 4.5:1 at 12px | Medium, mechanical | `docs/TOKEN-MAP.md` |
| Run an actual contrast-checker against every token pairing, not a visual estimate | Medium, mechanical | Session 3B audit |
| Confirm sticky call bar is mobile-only, bottom-fixed — do not add a desktop equivalent, the data doesn't support it | Low, confirm only | Session 3C |
| One CTA label across header, sticky bar, hero, and final movement — no exceptions | High, already flagged as D3 | Session 3C |

---

## 5. What this research did not cover

I did not find controlled data on serif-versus-sans display type specifically for trust
perception, or on the specific effect of a rendered "operating document" artifact like the
Property Handoff Record on conversion — that's a genuinely novel device in this category, so
no one has published a test on it. The type-scale and composition guidance in
`11-COMPOSITION-AND-TYPE.md` remains design judgment, not measured fact, same caveat as before.
