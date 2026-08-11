# 21 — Claims and Compliance Law

**Status:** ACTIVE. Precedence rank 2, below only current law, active insurance, verified
business facts, and explicit owner decisions.
**Created:** 2026-08-11.
**Supersedes:** nothing. **Closes:** the dangling `04-CLAIMS-GUARDRAILS.md` pointer that
`01-QUALITY-GUARDRAILS.md` and several other documents have referenced since inception.
That file never existed. This is it.

This document governs **every public-facing word**: page copy, titles, meta descriptions,
alt text, JSON-LD, form labels and helper text, confirmation emails, SMS templates, the
answering-service script, referral letters, Google Business Profile fields, and any third-party
profile. It outranks every design, composition, and copy document in the repository.

> **Not legal advice.** Four items in §7 require confirmation with the issuing agency or
> California counsel before the corresponding copy publishes.

---

## 1. The three questions

Before any sentence about what Aseptaclean does, answer:

1. **Is it true today?** Not planned, not pending, not "essentially." Today.
2. **Is it within the active insurance policy's covered operations?**
3. **Does the wording imply a credential, license, or regulated capability we do not hold?**

Any "no" and the sentence does not ship. There is no version of this rule where an unverified
claim ships behind a hedge.

---

## 2. Regulated-service boundaries — absolute

### 2.1 Never state or imply

That Aseptaclean is a **licensed contractor**; performs **remediation**, **biohazard**,
**mold**, **sewage**, **asbestos**, or **lead** work; performs **pest control** of any kind;
determines **habitability**, **safety**, or **clearance**; **appraises** property; provides
legal, medical, or environmental determinations; or holds any credential that is not currently
active and verifiable.

### 2.2 Banned words as service claims

`remediation` · `remediate` · `biohazard` · `decontamination` · `decontaminate` ·
`sanitization` · `sanitize` · `sterilization` · `sterilize` · `disinfect` as an outcome claim ·
`licensed` · `certified` without a named active certificate · `clearance` · `safe` ·
`habitable` · `medical-grade` · `pharmaceutical-grade` · `hospital-grade`

**Permitted negations.** The banned words may appear inside an explicit disclaimer that
narrows scope — that is their only legitimate use. Any automated grep gate must whitelist the
mandated negation clauses in §2.3 rather than fail them.

**Dignity language — migrated from `07-ONE-PAGE-DIRECTIVE.md` §4, 2026-08-11.** `hoarder`
never appears as a noun, anywhere — situational language only ("heavy accumulation,"
"hoarding conditions"). `gross filth` never appears at all, in any form. (Status: already
clean — confirmed by this session's baseline `claims-check` sweep and by
`hoarding-cleanup-san-jose/index.astro`'s own code comment recording the same grep.)

### 2.3 The animal / organic limiting clause — verbatim, mandatory

Wherever animal or organic condition work is described, this clause appears in full:

> **Cleaning only — not a decontamination, sterilization, or health-safety determination.**

The word **sterilization** is required. A prior fidelity pass removed it to match
`aseptaclean-FINAL-v2.html`; that was a claims regression and the clause must be restored to
this exact wording. Doc 18 §7 and this document both outrank v2 on claims.

### 2.4 The founder authority limit — verbatim, mandatory

Wherever the founder's background appears:

> This background reflects controlled-process discipline. It does not grant contractor,
> remediation, medical, environmental, or regulatory authority.

Permitted background statements: BS Biochemistry, UC Riverside · prior pharmaceutical
manufacturing experience · prior histology and surgical pathology experience · experience in
procedure-driven, documentation-sensitive environments · direct involvement in scope review,
planning, communication, and oversight.

### 2.5 Insurance and endorsement

Approved, complete: **"Insured. Certificate of Insurance available upon request."**
The site currently renders the bare word "Insured" in several places and the "available upon
request" qualifier appears nowhere. Not false, but incomplete against the approved string —
fix it.

`Organic Pathogen Endorsed` is owner-confirmed and permitted, **cleaning language only**. It
may never be expanded into a disease, decontamination, sanitization, or sterilization claim.
Both the insurance line and the endorsement must be matched against the current COI before
production release; unverified → suppress the statement entirely.

**The credential chip may never say "licensed."**

---

## 3. Structural pest control — the live exposure

This is the highest-risk open item in the current scope, because animal waste work is a
**current** Phase 1 service and a `/animal-waste-cleanup-san-jose/` page is already drafted.

**Cal. B&P §8505** defines structural pest control to expressly include **rodents**, and the
regulated practice covers far more than pesticide application. It includes *"identification of
infestations,"* *"the making of an inspection or inspections for the purpose of identifying …
infestations,"* and *"the making of inspection reports, recommendations, estimates, and bids,
whether oral or written."*

**Cal. B&P §8550(a)** makes it unlawful to **"advertise, to engage in, or offer to engage in"**
the practice unlicensed. Note *advertise* — **this is a marketing statute, not only an
operations statute.** It reaches page copy, meta descriptions, GBP service listings, and ad
text directly.

The §8555(g) exemption for non-pesticide exclusion **expressly excludes mice, rats, and
pigeons.** Post-*Merrifield v. Lockyer* enforcement is reportedly lenient on that point. That
is enforcement discretion, not statutory safety.

### 3.1 Hard scope boundary — put this in copy and in the standard agreement

> Aseptaclean cleans and decontaminates the conditions left behind **after** a licensed pest
> operator has confirmed the infestation is resolved. Aseptaclean does not inspect for,
> identify, exclude, trap, or treat pests.

### 3.2 Five constructions that must not ship

1. **"Post-Infestation Cleanup" as a named service.** Rename. `Rodent Contamination Cleanup`
   or `Animal Waste Cleanup` capture the same search intent without pairing the brand to
   §8505's regulated subject matter.
2. **Any sealing, exclusion, or entry-point work** described as a service.
3. **Infestation identification written into an assessment report** — §8505 covers written
   *and oral* reports, recommendations, estimates, and bids.
4. **Any bait, repellent, trap, or rodenticide** mention as something Aseptaclean does.
5. **Copy implying Aseptaclean resolves the rodent problem** rather than the contamination.

### 3.3 The reframe that is both safer and stronger

The 2026-08-11 market fact-check found the animal-waste lane is **not underserved**. Doc 19
§2.2 calls it the "fastest ranking win"; that premise is false. It is contested from three
directions in San José: Bio-One SJ (dedicated rodent-droppings page), Steri-Clean SJ, and Bio
Hazard Plus on the biohazard side; 911 Hazmat Cleanup and Fire & Water Damage Recovery on the
restoration side; and Attic Pros (**4.8 stars, 1,900+ reviews**, Diamond Certified), Attic
Bros, and Critter Control on the pest/attic side.

The category is **fragmented with no integrated owner** — pest control does exclusion and
insulation but under-sells decontamination; biohazard firms treat rodent work as a footnote to
trauma; restoration bundles it into water and fire.

**The defensible position is the handoff, and it is the SPCB-compliant one by construction:**

> The pest company handled the animals. We handle what they left behind.

Build the page around the sequence — exclusion (theirs) → waste and material removal →
cleaning → verification (ours) — with a named referral relationship to an SPCB-licensed
Branch 2 operator. That operator is simultaneously the legal margin, a lead source, and a
local backlink.

**Do not compete on review volume.** Attic Pros has 1,900+. Compete on documented process and
chain of custody, which a 1,900-review pest company structurally cannot claim.

### 3.4 Hantavirus

No hantavirus, and no rodent-specific handling language, appears anywhere until written crew
protocol and PPE requirements exist. When it eventually does: **hantavirus is not a bloodborne
pathogen.** 8 CCR §5193 is not the operative standard for dry rodent-dropping cleanup —
§5144 (respiratory protection), §3203 (IIPP), and PPE standards are. Conflating them is a
visible expertise failure to any informed buyer and a competence claim we cannot support.

---

## 4. Hauling and disposal — what may be said

**Operating fact, owner-confirmed 2026-08-11:** Aseptaclean does not haul. An approved
third-party vendor is engaged for transport and disposal on every job.

This is verified as the correct compliance posture. San José's non-exclusive franchise is
container- and transport-anchored — the agreement grants the right to *"collecting,
transporting and disposing"* of material *"collected in roll-off or front-load containers."*
The City's own guidance tells customers to *"hire a City permitted debris box company."*
Labor-only work — sorting, packing, carrying out, loading into the vendor's bin — is not the
franchised activity.

### 4.1 The operating rule that protects the position

> **Nothing leaves a job site in an Aseptaclean vehicle. Ever. No exceptions for small loads.**

One breach collapses the labor-only position: a van load is collecting and transporting
another party's material for compensation without a franchise, and because the container-based
definition arguably does not reach a pickup load, it likely falls under Republic Services'
*exclusive* commercial franchise instead. San José publishes no contractor-incidental hauling
exemption. Sunnyvale does; San José does not.

### 4.2 Permitted copy

> Disposal and transport are handled by a City-authorized hauler engaged for the project.

That sentence is accurate, and it is a differentiator — most competitors cannot describe their
disposal chain at all. It belongs in the scope section and in the Property Handoff Record.

### 4.3 Not permitted

Any copy implying Aseptaclean hauls, transports, disposes of, or operates a debris box.
Any copy implying hazardous waste transport. Any "we handle disposal" phrasing that reads as
self-performed.

### 4.4 Household hazardous waste

The vendor model does not cover HHW. It cannot go in the debris box. Copy may say that
Aseptaclean **identifies, segregates, stages, and documents** it — never that Aseptaclean
transports or disposes of it. **Residential and commercial differ materially**: for a
residence the resident is the generator under the household waste exclusion; for a commercial
cleanout that exclusion does not apply and the owner is a regulated generator. Do not write
one sentence that covers both. Open question, unresolved: whether a contractor may deliver a
resident's HHW to County HHW on their behalf. Until confirmed, **no scope of work promises
HHW removal.**

### 4.5 Sharps

HSC §118286 specifically prohibits placing home-generated sharps in *"roll-off containers for
construction, demolition debris, or recyclables."* Directly on point for a hoarding cleanout.
The existing Stericycle mail-back channel is the compliant answer and is a genuine proof asset
— a documented chain of custody most competitors cannot describe. Copy may describe
segregation into a compliant container and routing via a registered mail-back program.

### 4.6 Construction & demolition diversion — an unused sales asset

San José's C&D diversion program is **permit-triggered, not cleanout-triggered**. A hoarding
or estate cleanout with no building permit carries no obligation. **But post-construction
cleaning on a permitted job sits inside the general contractor's compliance perimeter** —
75% diversion to a City-Certified facility, weight tickets submitted before Final Building
Inspection, and the City is explicit that the GC is responsible *"including waste generated by
the subcontractors."*

Debris Aseptaclean generates counts against the GC's 75%. **"We hand you the weight tickets"
is the single strongest contractor-audience line available and it appears in no document in
this set.** GCs lose diversion deposits over missing paperwork. Confirm the debris-box vendor
routes to a City-Certified facility — non-exclusive haulers must disclose when they do not —
and make ticket handover a standard deliverable on permitted jobs.

---

## 5. Human biohazard — the gate

TSWMP registration is **deliberately deferred** (owner, 2026-08-11). The deferral is sound.
Two conditions make it safe:

**5.1 Nothing publishes ahead of registration.** No trauma, unattended-death, blood, or
decomposition service page. No GBP category. No service listing. No line in a capabilities
deck. No draft, stub, sitemap entry, or nav link. Advertising a regulated service you are not
registered to perform is its own exposure, independent of performing it.

**5.2 The trigger is discovery, not intent.** HSC §§118321–118321.6 attach to commercial
removal of *"human blood, human body fluids, and other associated residues from the scene of a
serious human injury, illness, or death."* **Hoarding and severe-condition jobs hit this
without warning** — decomposition, an unattended death discovered mid-job, bodily fluids under
accumulated material. The deferral is safe only if the STOP gate fires reliably on discovery,
the crew knows the tell, and **there is a named registered practitioner to refer to.** That
referral must exist before the first job that needs it, not during. It also runs both
directions — a registered practitioner who refers clearing work back is exactly the local
authority relationship the SEO strategy is asking for.

When registration lands, CDPH publishes a **public list of registered practitioners.** That is
a third-party-verifiable credential and a stronger trust asset than anything currently in the
trust stack.

---

## 6. Proof discipline

Zero completed documented projects. Zero reviews. That is the operating reality and the site
must not paper over it.

**Permitted proof today:** the named offer · the Five-Stage Handoff Standard · the Handoff
Assurance · sample documents **visibly labeled SAMPLE** · founder identity and accountability ·
accurate scope boundaries · the verified insurance line · a working assessment and response
system · the disposal chain.

**Forbidden:** any fabricated review, rating, testimonial, project count, years-in-business
figure, case study, client logo, partner relationship, badge, statistic, or before/after image.
No stat bar of any kind. No stock or AI-generated crews, properties, documents, or people.

**Image rule.** One test per slot: *does this image imply Aseptaclean performed this work?*
No → licensed or self-shot atmosphere is permitted, capped at three slots. Yes → **it must be
owner-shot, or the slot stays empty.** Empty beats fake. A non-owner-shot image in an
`[OWNED]` slot is a hard release blocker.

**Documentation disclaimer**, wherever the Property Handoff Record or any sample appears:

> Project records document the work performed. They are not regulatory clearance, inspection
> approval, environmental certification, or a determination that a property is safe or
> habitable.

**Assessment disclaimer** — migrated from `00-MASTER-BRIEF.md` §11.1, 2026-08-11. Place next
to the form consent:

> Submitting this form authorizes Aseptaclean to contact you. It does not authorize work or
> create a service agreement.

**Scope disclaimer** — migrated from `00-MASTER-BRIEF.md` §11.1, 2026-08-11. Place in the
footer and near exclusions where practical:

> Aseptaclean performs property clearing and approved cleaning within its current lawful and
> insured scope. Aseptaclean is not a licensed general contractor, remediation contractor,
> pest-control operator, appraiser, or provider of medical or legal services.

### 6.1 Structured data

Migrated from `00-MASTER-BRIEF.md` §11, 2026-08-11. Use accurate JSON-LD. Recommended types:
`Organization` · appropriate `LocalBusiness` subtype · `WebSite` · `WebPage` · `Person` for
founder · `BreadcrumbList` on supporting pages.

Do not add fake aggregate ratings. Do not mark up self-serving reviews in a way that implies
guaranteed organic review stars — consistent with §6's proof discipline above.

Values are sourced from `src/data/site.ts` (see `AGENTS.md` §3), never hardcoded in a
component: business name, legal name, site URL, phone, email, logo URL, founder name, service
area, business hours, and social profiles — each subject to the same suppression rules as
§6's proof discipline (unverified → omit, never a placeholder in a production build).

---

## 7. Open items requiring external confirmation

Do not publish the corresponding copy until each clears. Record the outcome in
`05-DECISIONS-LOG.md`.

| # | Item | Blocks | Who to ask |
| --- | --- | --- | --- |
| 1 | SJMC §9.10.020 definition of "collect" — does labor-only loading into a franchised hauler's bin require a franchise? | Nothing today; confirms the whole disposal position | San José ESD, zerowaste@sanjoseca.gov / (408) 975-2591 |
| 2 | SPCB scope boundary for post-pest cleaning and assessment language | `/animal-waste-cleanup-san-jose/` launch | California counsel; Structural Pest Control Board |
| 3 | May a contractor deliver a resident's HHW on their behalf? | Any HHW language in a scope of work | Santa Clara County HHW |
| 4 | PAMC 5.20.040(b) — "receive, collect, remove" are disjunctive from "transport" | Any Palo Alto work or location page | Palo Alto Public Works |
| 5 | COI match for the insurance line and the organic pathogen endorsement | Both trust statements | Insurance broker |

**Per-city rule for the phased sitemap:** no location page ships before that city's hauler
position and business licensing are confirmed. Every city page is a licensing decision before
it is an SEO decision.

---

## 8. Pre-publication checklist

Run against every new or edited public-facing string.

- [ ] Every claim is true **today**, not planned or pending
- [ ] No banned word from §2.2 outside a mandated negation clause
- [ ] The §2.3 animal/organic clause is verbatim and complete, including **sterilization**
- [ ] The §2.4 founder authority limit is verbatim wherever background appears
- [ ] No `licensed` anywhere, in any surface, including schema
- [ ] No pest identification, inspection, exclusion, or treatment implied (§3.2)
- [ ] No hauling, transport, or disposal implied as self-performed (§4.3)
- [ ] No human biohazard service, in any form, anywhere (§5.1)
- [ ] No fabricated proof of any kind; no stat bar (§6)
- [ ] No `hoarder` as a noun; no `gross filth`
- [ ] No hantavirus or rodent-specific handling language
- [ ] No price figure other than the $195 assessment fee
- [ ] No placeholder, `[OWNER INPUT: …]`, or `REPLACE_WITH_*` string
- [ ] Documentation disclaimer present wherever a record or sample appears
- [ ] JSON-LD contains no aggregate rating, review, or unverifiable credential
