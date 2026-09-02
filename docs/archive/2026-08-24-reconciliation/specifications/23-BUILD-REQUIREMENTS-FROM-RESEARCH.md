# 23 — Build Requirements Carried Forward From Research

**Created 2026-08-11.** Replaces `14-RESEARCH-FINDINGS.md` and
`15-UX-DESIGN-RESEARCH-FINDINGS.md`, both deleted.

## Why those files were deleted rather than kept

Every statistic in both sat behind an opaque `<cite index="NN-1">` marker with no URL,
publication, date, or sample size — unverifiable as published. Both cited source files that
have never existed in this repository (`01-STRATEGY.md`, `02-BUILD-SPEC.md`), including for the
performance budget one of them called a release blocker. `15`'s contrast table was measured
against token names from a mockup that is no longer the build target.

The reasoning in them was sound. The sourcing was not. **What survives is the four
requirements, stated as requirements. Treat them as directional judgment, not as measured
findings, and do not cite a number from either original document.**

---

## The four

### 1. The phone field needs a stated reason

Asking for a phone number costs conversions. Aseptaclean asks anyway, because a callback
within one business day is the actual promise being made — the number is the mechanism, not a
data grab.

**Requirement:** the copy directly above the phone field states why it is needed, in the
customer's terms. *"So we can call you back today"* rather than an unexplained required field.
Applies to `QuickHandoffForm.astro` and `AssessmentForm.astro`.

This is a one-line copy fix. It is not an argument for removing the field.

### 2. Forms stay single-column at every breakpoint

Including desktop. A name-and-phone side-by-side row is a common default and it is the wrong
default here — a single column reads as one continuous path rather than a grid to solve.

**Requirement:** verify single-column at 320, 390, 768, 1024, 1280, and 1440px. Desktop is the
one people forget.

### 3. Three fields inline on `/`, full set on `/request-assessment/`

The split is deliberate. The short form's only job is to catch someone ready right now, before
qualification can scare them off. The long form's job is to qualify someone who has already
decided to engage.

**Requirement:** do not merge them, do not add fields to the short form, do not shorten the
long one. Both post to `/api/lead`; `entry_route` distinguishes them.

Note the current state: `07` §7 required the short form to appear twice on `/` — hero and final
movement. The v2 port removed it from the hero by owner confirmation. It now lives in a
`#request` section, the final CTA, and the sticky bar. That is a deliberate deviation, recorded.

### 4. The sticky call bar is bottom-fixed and mobile-only

**Requirement:** no desktop equivalent. It must never obscure a form field, the submit button,
the consent checkbox, a cookie control, or a footer action. The observer that governs its
appearance targets a specific hero selector — that selector has been renamed twice and broken
the bar both times. Re-verify after any hero change.

---

## What was deliberately not carried forward

- Every conversion, bounce, and load-time statistic
- The named case studies (Vodafone, Swappie, Yelp)
- The 266% single-CTA figure
- The 18.7% phone-field figure
- `15` §3's contrast table — superseded by measured values in `TOKEN-MAP.md`
- The "eleven movements" framing — the page has fourteen sections
- Any font instruction — superseded, see `TOKEN-MAP.md` §2

The two original documents also carried honest self-limiting caveats worth preserving as a
standing posture: no category-specific test data exists for hoarding or estate cleanup, and no
one has published a test on the effect of a rendered operating-document artifact like the
Property Handoff Record on conversion. That device is genuinely novel in this category. Its
value is a judgment call, not a measured one — which is the correct way to hold it.
