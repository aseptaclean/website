# Doc 27 — §9.15 Connective & Humanized Copy (APPROVED 2026-08-18)

**Status:** Approved 2026-08-18, rulings per port session. This is the only source for the
slots below. See `docs/05-DECISIONS-LOG.md` for the rulings, including D2's rescission.

**Rules applied while writing:** doc 20 humanization (contractions, one concrete physical
detail where it earns its place, read-aloud gate); doc 27 claims boundaries (no
decontamination/remediation/sterilization/licensed language, no price figures, no safety or
habitability determinations, no invented proof); positioning — *they sell "trust me," we sell
"here is the document."*

---

## §9.15.1 — Connective strings

These fill every slot the templates need that doc 27 §9–§17 doesn't supply. Body copy is
untouched.

### Homepage

| Slot | String |
| --- | --- |
| Why-field lede (under §9.6 H2) | Most of what goes wrong on these projects gets decided before anyone picks anything up. |
| Handoff Record section label | The record |
| Handoff Record heading | Every project ends with a Property Handoff Record in your hands. |
| Handoff Record lede | A room-by-room account of what was decided, what left, what was cleaned, and what was held back for you. |
| Handoff Record CTA | See how a scope gets written → |
| Where-we-work label | Where we work |
| Where-we-work heading | South Bay & Peninsula, one address at a time. |
| FAQ section label | Common questions |
| FAQ heading | ~~Asked before almost every project.~~ → **Common questions before a project starts.** *Struck 2026-08-24 by explicit owner instruction: the former wording implied project-history frequency that is not yet supported.* |
| Form callout heading | Have a bigger or more complicated property? |
| Form callout body | The full assessment form captures access, decision authority, deadline, and disposal detail — useful when more than one person is involved in the decision. |
| Footer tagline | ~~Property clearing, detailed cleaning, and documented closeout for the South Bay & Peninsula.~~ → **Specialty property cleaning and complex cleanup for the South Bay & Peninsula.** *Struck 2026-08-21 by the sitewide positioning pass (owner instruction, rank 1): "property clearing" led the sitewide tagline on all 46 routes, and a closeout document was one of the three things the company was described as selling. The `site.location.serviceArea` binding from the B2 geography ruling is unchanged.* |

### Service pages (all 14)

| Slot | String |
| --- | --- |
| Hero pledge line (pattern) | ~~The scope names the rooms and the detail level before anyone arrives.~~ → **Rooms and detail levels are agreed before anyone arrives.** *Struck 2026-08-24 by the final copy-integrity pass to remove unnecessary repeated process language without changing the control.* |
| Scope-excerpt card header | ~~Scope excerpt · Sample~~ |
| Scope-excerpt card footer | ~~Sample only — not a client record. Your scope gets written against your property before anything is scheduled.~~ |
| Included panel header | ~~Work can include · Per approved scope~~ → **Work can include · As approved** *Struck 2026-08-24 by the final copy-integrity pass; approval remains explicit without repeating “scope” throughout the same template.* |
| Included panel footer | ~~The signed scope is the definition of finished for this project.~~ → **This is what we both mean by finished.** *Struck 2026-08-24 by the final copy-integrity pass; the approved-work header directly above retains the contractual boundary.* |
| Exclusions panel header | ~~Stop / notify / refer · Outside this scope~~ → **Stop / notify / refer · Not included** *Struck 2026-08-24 by the final copy-integrity pass; the mandatory legal scope disclaimer remains directly below the panel.* |
| Quote section label | What moves the number |
| Quote section heading | The quote comes from the property, not a package. |
| Quote CTA | Send photos, get a straight answer → |
| Process section label | How this starts |
| FAQ heading (pattern) | Questions we get on [service name]. |
| Related label | Often booked alongside |
| Form callout heading | Matthew reads every request himself. |
| Form callout body | ~~You'll hear back within one business day — a real answer about fit and next steps, not an autoresponder.~~ |

**Service-page Form callout body struck 2026-08-20 — superseded, not rejected.** Doc 27 §8's
"What happens next" paragraph (appended as §27.8 below, owner-approved the same day) opens with
this row's heading sentence and then says the same thing at more length: *"…with a real answer
about whether the job fits and what's needed to price it — not an autoresponder."* §8 requires
that block beside **every** form, so `RequestForm.astro` now renders it on all 40 form
instances and `ServicePageLayout.astro` no longer passes this pair — printing both would put
the sentence on the page twice on all 14 service pages. **The heading row is NOT struck**: §8's
paragraph opens with that exact sentence, so it still ships and gate 6 still finds it. Struck
rather than deleted per the strike convention — the record of what it was replaced by matters.

**Scope-excerpt card struck 2026-08-20 — owner ruling. Both strings, together.**

The card was never built, and the reason it was never built is that **no source supplies the
table rows.** Doc 27 has no sample scope-excerpt content for any of the 14 services, and no real
project record exists to redact into one. That leaves only two ways to ship the header, and both
are prohibited: invent plausible-looking scope rows, which `AGENTS.md` §0.3 forbids outright
("no fabricated … case study"; "empty beats fake, always"), or render a labelled empty box,
which is a placeholder in a production build and forbidden by §7.

**The header never ships without the footer.** The footer is the disclaimer that stops a sample
scope being read as a real client record. They were approved as one unit and are struck as one
unit; do not restore either alone.

**Re-approval condition:** a real, owner-supplied, redacted Property Handoff Record artifact
exists to derive rows from. Until then this is not a gap to close — the absence is correct.
Recorded so the comparison is not re-opened by a future session reading only the approved
bundle. See `docs/05-DECISIONS-LOG.md`, 2026-08-20.

> **Placement note, learned the hard way.** This annotation was first written directly beneath
> the struck rows, **inside** the table. `scripts/gate6-copy-trace.mjs` reads a String-column
> table in `docs/27-SECTION-9-15-CONNECTIVE-COPY.md` by tracking its header row, so prose in the
> middle of a table ends it: the ten rows below the break stopped being extracted and silently
> left the gate's scope, and the run still reported PASS. Keep annotations **after** the table
> they discuss, never between its rows.

### Hubs (all 4)

| Slot | String |
| --- | --- |
| Cards section label | [N] services in this group |
| Cards heading | Pick the page that matches the property's next event. |

### Company pages

| Slot | String |
| --- | --- |
| About founder label | The operator |
| Process record CTA | Request an assessment → |
| Service-areas band heading | Not sure the address is in range? |
| Service-areas band CTA | Send the property details → |

### Navigation dropdown one-liners

| Item | One-liner |
| --- | --- |
| Deep Cleaning | Kitchens, baths, fixtures, and the edges that get skipped |
| Move-In & Move-Out | Vacant turnover, keys-and-photos ready |
| Post-Construction | Settled dust once the trades are out |
| Window Cleaning | Glass, tracks, and frames within safe reach |
| Extreme-Condition | Severely neglected property, reviewed first |
| Animal Waste | After the animals are gone |
| Rodent Droppings | Contained interior areas |
| Pigeon Droppings | Accessible exterior surfaces |
| Property Cleanouts | Full-contents clearing under one scope |
| Hoarding Cleanup | Sorted, approved, documented |
| Estate Cleanouts | Heirs, executors, real deadlines |
| Debris Removal | Approved, lawful disposal |
| Eviction Cleanouts | Turnover on a clock |
| Commercial & Janitorial | Project and recurring programs |

---

## §9.15.2 — Humanization amendments (before → after)

Six body-copy edits. Each adds one concrete, keepable operational detail. These amend doc 27
text, so each needs an explicit ✓.

**1. §9.6 Approval controls (homepage) and §9.12 FAQ answer**
- Before: *Uncertain items are held for review.* / *Uncertain items are not automatically discarded.*
- After: **Anything we're not sure about goes into a labeled clear bag and waits for your decision.**
- Why: "held for review" is category language; a labeled clear bag is a picture. It's also a
  commitment you can actually operate.

**2. §9.8 Stage 02 — Protect**
- Before: *Keep areas are identified. Uncertain and important items are separated and reported.*
- After: **Keep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.**

**3. §9.13 Homepage assessment body**
- Before: *Include the city, approximate size, current condition and deadline.*
- After: **Tell us the city, roughly how big it is, what shape it's in, and when it has to be done. Two or three phone photos are more useful than a long description.**

**4. §12.1 Deep-cleaning outcome body**
- Before: *The quote identifies the rooms, surfaces and detail level so both sides know what completion means.*
- After: **The quote lists the rooms, the surfaces, and the detail level — so when we say finished, you and we are reading the same page.**

**5. §17.5 Contact — text photos card**
- Before: *Send wide views and close details of the affected areas.*
- After: **Stand in the doorway and get the whole room, then step in close on the worst spots.**

**6. §9.11 Founder body — no change proposed.** "More than a truck and a guess" already passes
the read-aloud gate. Flagged so it isn't "improved" later.

---

## §9.15.3 — Design decisions to record

| # | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| D1 | Amber `#C8912E` deadline band | Keep as sole warm accent / recolor navy | **Keep.** One rationed accent against navy matches how the reference brands spend color. |
| D2 | Why-field icon grid | Keep icon-heading-paragraph ×4 / replace with one plain large statement | ~~**Replace.**~~ **RESCINDED by owner 2026-08-18 — keep the mockup's 4-up icon grid.** The blacklist citation was inaccurate: doc 01 §5.2 forbids that pattern "repeated 6–12 times"; this is ×4. Mockup is pixel authority. |
| D3 | Header wordmark | Mockup logotype / owner's real horizontal wordmark | **Real wordmark** (asset manifest, 2026-07-30) at port. |
| D4 | Header-band sweep signature | Keep navy sweep (Steri-Clean geometry, our palette) / develop original mark later | **Keep for launch;** revisit only after real proof assets exist. |
| D5 | Newsreader | Retired from display type in this direction | **Confirm retirement** — record so type doesn't drift back. |

---

## §9.15.4 — Decisions-log entry (paste on approval)

> **2026-08-18 — Design direction and copy canon updated.** `aseptaclean-FINAL-v2.html`
> superseded as port target by the PDF-derived direction (SERVPRO/Steri-Clean structural specs,
> Aseptaclean palette), owner-approved in mockup form: homepage, service hub, service page,
> About, Process, Service Areas, Contact — seven templates covering all 36 routes. Doc 27
> §9.15 adopted for all connective copy and the six humanization amendments. Rulings: D1–D5
> per §9.15.3. Doc 27 §30 (no further redesign before conversion/proof data) re-armed against
> the new direction. Port to Claude Code proceeds with validation gates: class-coverage check,
> 390/1440 screenshots, zero placeholders, zero mono, real wordmark.

---

## §9.15.5 — Addendum (close-out batch)

### Footer legal line (was in mockups, unapproved until now)
> © [year] Aseptaclean, LLC · Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, or appraiser.

### Form states
| State | String |
| --- | --- |
| Success (doc 27 §18, verbatim) | Got it. I'll review the details and contact you about the next step. |
| Submission error | Something went wrong on our end and the form didn't send. Call or text {site.business.phone} and we'll take it from there. |
| Missing phone | Add a phone number so Matthew can reach you about the property. |
| Missing consent | Check the consent box so we're allowed to call or text you back. |

**Amended 2026-08-19 — the submission-error string.** It previously carried the literal
`408-785-7588`. That was an error in this document: `AGENTS.md` §3 makes `src/data/site.ts` the
single source of truth for business facts and forbids hardcoding them in a component, and
`AGENTS.md` outranks this document on business facts. The literal also used a different format
from the one the site renders everywhere else (`(408) 785-7588`), so it would have shipped two
spellings of the same number. `{site.business.phone}` is a token, not copy — it interpolates at
render and follows the env value. Logged in `docs/05-DECISIONS-LOG.md`, 2026-08-19.

### Thank-you page connective
| Slot | String |
| --- | --- |
| Section label | While you wait |
| Heading | Photos speed everything up. |
| Body | Stand in the doorway and get the whole room, then step in close on the worst spots. Text them to the number below and mention your name. |

### Request-assessment page connective
| Slot | String |
| --- | --- |
| Section label | What happens next |
| Heading | Matthew reads every request himself. |
| Steps 01–03 | Send the details below — two or three phone photos help more than a long description. / If the property is complicated, we'll say whether a walkthrough is needed before a firm number. / The scope and price come to you in writing before anything is scheduled. |

### FAQ / Projects connective
| Slot | String |
| --- | --- |
| FAQ sidebar label | Still deciding? |
| FAQ band heading | Didn't find your question? |
| Projects icon-row label | Project types |

### Mobile drawer labels
Menu groups mirror the desktop mega-menu verbatim; close control is "×"; CTA and call button reuse existing approved strings.

### Doc 27 §18 correction (flag, needs owner ✓)
§18 names the endpoint `/api/leads` and calls it an unimplemented release blocker. The live, tested endpoint is `/api/lead` (functions/api/lead.ts → HubSpot + Resend + Turnstile, verified end-to-end). Amend §18 to `/api/lead` and strike the blocker paragraph.

---

# Doc 27 §1, §7, §8 — conversion rewrite, approved sections (APPROVED 2026-08-20)

**Status:** owner-approved 2026-08-20, sections **1, 7 and 8 only**. Source document is
`docs/27-CONVERSION-REWRITE.md`. Appended here so `scripts/gate6-copy-trace.mjs` extracts and
enforces these strings — that script reads only this file and `docs/27-COPY-CANONICAL.md`, so
copy approved anywhere else is outside the gate until it lands here.

**Sections 2–6 of `27-CONVERSION-REWRITE.md` are NOT authorized and are deliberately absent
from this file.** They rewrite the openings of the estate, hoarding, property-cleanouts,
move-out and deep-cleaning service pages. No service-page body was touched in this pass, no H1
was changed, doc 19 titles were not touched, and the NAP wording shipped earlier on 2026-08-20
is unaltered. Do not append §§2–6 here without a separate owner approval — appending copy to
this file is what puts it under the gate, so an unapproved paste here becomes an enforced
requirement to ship it.

---

## §27.1 — Homepage routing block, "Start where you are"

Doc 27 §1 defines the homepage's job as **routing, not selling**. The block ships between the
credential strip and the service tiles, per the owner's placement instruction.

**Section heading** — §1 names the block and supplies no other heading string. That name is the
rendered `<h2>`; no eyebrow was written, because writing one to fill the `.ac-sec__head` slot
would be copy invented for a slot (`AGENTS.md` §0.3).

> Start where you are

| Door | Copy |
| --- | --- |
| I'm settling an estate | A parent or relative has died and the property has to be dealt with. |
| A family member is hoarding | Someone I love needs help and this has to be handled carefully. |
| I manage or own rental property | A unit needs to turn over, or a tenant left belongings behind. |
| I'm listing a property | It has to be photo-ready by a date I can't move. |
| My home needs a real reset | I want a deep clean where someone actually names what's included. |
| I manage a commercial space | ~~A project or turnover that needs a defined scope.~~ |

**The commercial door is HELD, not rejected — owner decision required.** The other five doors
link to indexable routes and ship. `/commercial-cleaning-san-jose/` ships `indexable: false`
(`src/data/doc27ServicePages.ts`), and `/` is indexable, so linking it would open an
indexable→noindex crawl path — register **P2**, release-checklist **C10**, and the exact
failure `ServiceCards.astro` already refuses to create for the Animal & organic card. The
owner's instruction was to *report before linking rather than create the crawl path*, so it is
reported and the door does not render.

It is struck **only** so gate 6 reports it as `struck` rather than `absent`; the strike
convention's usual meaning (adjudicated out) does **not** apply here. `homepage.routingDoors`
in `src/data/site.ts` still carries all six rows verbatim. The sixth renders the day its route
turns indexable, with no copy change — the render filter reads each page's own `indexable`
flag, so the door cannot be linked by editing a copy file. **Un-strike this row when the
commercial gate clears.**

---

## §27.7 — The assessment fee

**Owner ruling, 2026-08-20:** photo review is free; the **$195 applies only when an on-site
walkthrough is required**. Ships verbatim wherever the fee appears.

> Photos are often enough to start, and reviewing them costs nothing. When a property needs an
> on-site walkthrough, the assessment is $195 — and you keep what it produces: a written,
> room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not
> you hire us.

**This ruling is not new; it is the adopted one, finally written on the page.**
`docs/05-DECISIONS-LOG.md`, row 3 of the migrated `07` §3 table, already records *"Photo review
free; on-site $195, credited within 7 days"* as **adopted**, with the phrases "free assessment"
and "free consultation" purged. §7 states that same fact and reaches for neither banned phrase,
so `AGENTS.md` §7's standing prohibition is intact. The figure is the only price figure on the
site (`AGENTS.md` §4) and interpolates from `site.offer.assessmentFee` — it is never retyped.

**The credit term is NOT dropped, and §7 does not authorize dropping it.** §7 is silent on
"credited toward an approved project booked within 7 days," which is an owner-adopted term
(log row 3) and a business fact in `AGENTS.md` §3 / `site.offer.assessmentFeeTerms`. Deleting
it by replacing the blocks verbatim would be a larger unauthorized act than keeping it, so it
survives as its own adjacent string on every surface where it was already its own element:

> Credited toward an approved project booked within 7 days.

**One surface loses it, and needs an owner call.** In the senior-downsizing FAQ answer
(`src/data/servicePages.ts`, "How much does this cost?") the credit sat inside the same
sentence as the figure, so replacing that sentence with §7 removes it there. It was not
re-appended, because appending to owner-approved copy is a rewrite. **Owner: confirm whether
the credit should follow §7 onto that answer.**

---

## §27.8 — CTA and form microcopy, sitewide

**Primary CTA** — unchanged, and confirmed as the only one. Zero instances of "Get an Estimate"
exist anywhere in `src/` or `dist/`; the string has never shipped.

> Request an assessment →

**Secondary CTA** — appears everywhere the primary does. Previously hardcoded in `Hero.astro`
against `AGENTS.md` §3; now `site.offer.secondaryCta`.

> Text a photo

**Above the form**

> Tell us about the property.

> The city, roughly how big it is, what shape it's in, and when it has to be done. Two or three
> phone photos are more useful than a long description.

**Directly under the submit button**

> This starts a conversation. It does not book work or authorize anything.

This **replaces** doc 27 §18's "This only starts the conversation. It does not book or authorize
work." (shipped 2026-08-19). It does **not** replace the
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §6 assessment disclaimer — *"Submitting this form
authorizes Aseptaclean to contact you. It does not authorize work or create a service
agreement."* — which is a claims-law requirement, outranks this document at chain rank 2, and
still ships. §8's line is reassurance beside the button, not the legal clause.

**What happens next — beside every form**

> Matthew reads every request himself. You'll hear back within one business day with a real
> answer about whether the job fits and what's needed to price it — not an autoresponder.

"Within one business day" is the approved response commitment (`AGENTS.md` §3 `response`) and is
the only interval this block claims. Supersedes the §9.15.1 service-page Form callout body,
struck above.

**Success state** — already shipped verbatim; carried here so §8 is complete in one place. It
is the same string as §9.15.5's "Form states" success row, not a second one.

> Got it. I'll review the details and contact you about the next step.

---

## Extraction note for gate 6

Four things in the block above are deliberate and should not be "fixed" by a later session:

1. **The commercial door and the §9.15.1 callout body are `~~struck~~`** for two different
   reasons — held-pending-gate and superseded-by-§8 respectively. Both are recorded inline at
   their strike. Neither is a gap.
2. **The §27.7 fee paragraph carries a literal `$195`.** It renders through
   `site.offer.assessmentFraming(site.offer.assessmentFee)`, so the document and the build
   agree only while `PUBLIC_ASSESSMENT_FEE` is 195. If that env value ever changes, this
   blockquote must change with it or gate 6 will correctly report it absent.
3. **"Request an assessment →" and "Got it. I'll review…" already existed** in §9.15.1 and
   §9.15.5. They are restated here for completeness and will extract twice; a duplicate present
   string is harmless to the gate.
4. **§§2–6 are absent on purpose.** See the status note at the top of this section.
