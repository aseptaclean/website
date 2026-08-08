# 14 — Research Findings and Recommended Changes

**Status:** Active. Read alongside `13-REMEDIATION-PASS.md`.
**Repo location:** `docs/14-RESEARCH-FINDINGS.md`
**Basis:** Web research conducted July 31 2026. Sources cited inline; none of this is invented.

Everything before this file in the build was my design judgment. This file separates
judgment from evidence, and changes three specific things because the evidence contradicts
what's currently planned.

---

## 1. What the research confirms you already have right

**The founder-forward approach is correct, and the research is more specific than I gave it
credit for.** For high-ticket local services, buyers are sold by the practitioner, not the
company — naming the person doing the work carries more trust weight than a company name or
badge, and the research literally frames it as <cite index="13-1">credentials over coupons for local high-ticket services</cite>. Your founder section is not a nice-to-have. Keep it, and if
anything give it more prominence, not less.

**Real photography over stock is not a preference, it's table stakes.** The 2026 home-services
playbook explicitly calls for <cite index="14-1">replacing generic stock photos with real project imagery to build immediate trust with high-end homeowners</cite>. This confirms what your own build docs already concluded — it just raises the priority. Photography is not a "nice to have once the design settles." It's the single highest-leverage unbuilt asset on the page.

**The single-offer, single-page structure is correct.** Landing page doctrine for paid traffic
is one page mirroring one promise, <cite index="16-1">a single call to action above the fold, local proof stacked, forms kept to three fields or fewer, loading in under three seconds</cite>. That's the one-page collapse decision, validated.

**Your guarantee strategy is not just good copy — it has a quantified payoff.** Guarantees
that shift risk from buyer to seller are one of the best-documented levers in conversion
research: refund abuse in most industries <cite index="18-1">rarely exceeds 5%, while conversion often lifts 50–100% or more</cite>. Your Handoff Assurance block is doing real, measurable work, not just reassurance theater.

**The shame-reduction register in your voice doc matches the clinical consensus, not just
good instincts.** Hoarding-adjacent competitors and advocacy sources converge on the same
point: <cite index="30-1">society still frames hoarding as a character flaw rather than a legitimate condition, and that framing deepens the shame that keeps people from calling anyone at all</cite>. Bio-One's own materials describe walking away from a reality-TV partnership specifically because the show's <cite index="37-1">dramatic, unrealistic depiction of hoarding conflicted with their goal of ending the stigma</cite>. Your "we describe the property, not the person" rule isn't just tone — it's the actual mechanism that gets the phone to ring.

---

## 2. What the research says to change

### 2.1 Reviews are a harder blocker than the strategy doc already states — this needs to move up your priority list, not just stay acknowledged

You already know you have zero reviews. What the research adds is how binary that gap is:
<cite index="51-1">93 to 97% of consumers read reviews before choosing a local business, and average consumer trust checks span roughly six review platforms before deciding</cite>. The average local business
carries <cite index="49-1">around 39 Google reviews</cite>, and <cite index="56-1">a complete, review-backed profile makes a business roughly 2.7 times more likely to be perceived as reputable</cite>. This is not a soft trust signal you can substitute with good copy. It is closer to a pass/fail gate on whether a stranger calls at all.

**Action:** the "first 3–5 jobs at reduced margin for proof" plan in your strategy doc is
correctly identified but currently reads as one line among many. Given what the review data
actually says, this should be treated as the single highest-priority operational item after
launch — ahead of any further design or copy work on the page itself. No page structure fixes
a review count of zero.

### 2.2 One real tension the research surfaces — flagging it rather than resolving it for you

Form-field research is consistent that phone number is the single highest-abandonment field
in a lead form, with one dataset putting the cost at <cite index="38-1">roughly an 18.7% conversion decrease when a phone field is present</cite>, and that <cite index="41-1">three-field forms convert meaningfully better than four-field forms in the general dataset</cite>.

Your current form design (name, phone, "what's going on") makes phone required. **I'm not
recommending you drop it**, and here's why: that research is drawn overwhelmingly from B2B
lead-gen and e-commerce contexts, where a phone number invites an unwanted sales call. Your
category is the opposite — phone is the entire point, because callback speed within one
business day is the guarantee you're making. Dropping it to email would break the actual
promise the form makes. But it's worth being honest that this field is doing measurable
abandonment damage, and it means the copy directly above the phone field carries more weight
than it currently does — it has to make the reason for the phone number ("so we can call you
back today") explicit rather than assumed. This is a one-line copy fix, not a field-count fix.

### 2.3 Multi-step vs. single-step — your instinct was right, and now it's backed

Research on form structure shows multi-step forms measurably outperform single-page forms
specifically when the total field count is <cite index="39-1">six or more fields — the lift is real for six-plus fields but roughly neutral or slightly negative for forms of three fields or fewer</cite>. This is a direct, quantified confirmation of the split you already made: 3-field inline form on `/`, full progressive multi-step form on `/request-assessment/`. Don't second-guess that split — the data says it's the correct shape for each context, not just a nice compromise.

### 2.4 One thing worth testing that isn't in the build yet: single-column form layout

Layout research (separate from field count) found single-column forms complete measurably
faster than multi-column layouts <cite index="44-1">roughly 15 seconds faster to complete</cite>. Confirm the mockup form is single-column at every breakpoint, including desktop — a name/phone side-by-side row is a common default that this data argues against.

---

## 3. What this changes in the actual build

| Change | Priority | Where |
| --- | --- | --- |
| Move "contract first 3–5 jobs for reviews/photos" to the top of the post-launch action list, above further design work | High | `07-ONE-PAGE-DIRECTIVE.md` §13, `01-STRATEGY.md` §7 |
| Add one line of copy directly above the phone field explaining why it's asked for | Low effort, do now | Hero form, final-movement form |
| Confirm single-column form layout at every breakpoint | Low effort, do now | Session 3C |
| No change to field count or the 3-field/multi-step split | — | Already correct |
| No change to founder section — if anything, expand it | — | Already correct |
| No change to guarantee structure | — | Already correct |

---

## 4. What this research did not cover

I did not find category-specific A/B test data for hoarding/estate cleanup specifically —
that data likely doesn't exist publicly, since it's a small, non-franchise-dominated category.
Everything above is either general home-services/local-service research or adjacent-category
(hoarding cleanup marketing, generally) research, applied by analogy. Treat it as directional,
not as a controlled experiment run on your exact page.
