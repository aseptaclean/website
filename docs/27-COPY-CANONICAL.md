# 27 — Copy Canonical (Astro/Cloudflare build)

**Role:** Authoritative COPY source for the live Astro/Cloudflare site. Sections
9–15 (homepage + all service-page copy) supersede prior page copy and doc 20's
draft rewrites. Doc 20's voice RULES remain the standard new copy must meet.

**Not authoritative for:** architecture/URLs/SEO waves (→ doc 19), visual system
(→ doc 18), claims (→ 01-QUALITY-GUARDRAILS). Where this doc restates those, the
named owner-doc wins.

**Provenance note:** copy harvested from a separate ChatGPT-hosted build
(aseptaclean-rebuild...chatgpt.site). That build is NOT live and is NOT
maintained. The live site is Astro on Cloudflare Pages. Ignore every
platform/deployment/technical reference in this document (esp. §25) — it
describes the abandoned build.

**Owner reconciliations applied 2026-08-09 (override this doc's originals):**
1. Animal / rodent / pigeon pages: UNGATED for marketing per owner decision.
   This doc's "gated — do not publish" status on §13.2–13.4 is SUPERSEDED.
   Real remaining gate is operational: confirm COI wording covers the organic
   pathogen endorsement + written rodent PPE/respiratory protocol before the
   first such job. Marketing copy may publish; claims stay cleaning-only.
2. Slug: /extreme-condition-cleaning → /extreme-cleaning-san-jose/ (keyword-
   verified). Apply the city suffix to ALL service slugs per doc 19
   (/estate-cleanout-san-jose/, not /estate-cleanouts).
3. Publish timing follows doc 19's waves, NOT this doc's order. This doc
   provides the WORDS; doc 19 provides the WHEN.

**Promoted to active guardrails:** §3 operating constraints and §30 "what
should not be done next" are pulled into the 01-guardrail review chain —
including the two catches prior docs missed: no complete-odor-removal claims
on porous materials, and no quote-from-photos guarantee.

---

## 1. Document authority

This is the unified master document for the Aseptaclean website build. It consolidates the approved positioning, visual direction, sitemap, copy, SEO system, forms, compliance boundaries, technical structure, launch controls, and future publishing requirements.

When this document conflicts with an older design draft, discarded concept, generic template, or unapproved placeholder, this document controls unless a newer written decision explicitly replaces it.

This document does not replace legal, insurance, licensing, environmental, waste-handling, or regulatory advice. Any page describing a condition-sensitive service must remain within Aseptaclean's verified lawful and insured operating scope.

---

## 2. Executive build summary

The site is designed to sell three connected outcomes:

1. Detailed cleaning for homes and properties that need more than routine housekeeping.
2. Condition-reviewed specialty cleaning for difficult but accepted non-human conditions.
3. Structured property clearing for estates, hoarding conditions, turnovers, debris, and authorized cleanouts.

Commercial and janitorial work is retained as a separate supporting category.

The site does not compete on being the cheapest cleaner. It competes on controlled scope, decision clarity, owner accountability, careful exclusions, and documented closeout.

### Central positioning statement

> Complex properties returned to a controlled, documented condition.

### Core operating promise

> Nothing leaves the property without your written approval.

### Proof structure

Until Aseptaclean has a substantial public project portfolio, the website relies on verifiable operating proof rather than fabricated social proof:

- Written scope before work
- Owner-operated review
- Clear keep, remove, and review controls
- No unapproved charges
- Completion photographs when included
- Documented exceptions
- Property Handoff Record
- Insurance certificate available on request

The site contains no fake statistics, fake reviews, invented projects, borrowed transformations, or stock-photo proof.

---

## 3. Business facts and fixed constraints

### Approved facts

- Legal business name: Aseptaclean, LLC
- Founder and operator: Matthew Ruiz
- Phone: 408-785-7588
- Service model: owner-operated assessment and scope review
- Insurance: insured; certificate of insurance available on request
- Geographic positioning: South Bay and Peninsula
- Education: B.S. Biochemistry, University of California, Riverside
- Professional background: pharmaceutical manufacturing
- Professional background: histology and surgical pathology

### Required founder disclaimer

> This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.

### Operating constraints

- Do not present Aseptaclean as a licensed contractor.
- Do not claim structural repair, demolition, pest control, extermination, insulation removal, environmental clearance, or regulated remediation.
- Do not claim that project documentation certifies that a building is safe, sanitary, habitable, remediated, or regulator-approved.
- Do not promise complete odor removal from damaged porous materials.
- Do not claim that every property can be quoted from photographs.
- Do not publish package pricing that ignores condition, access, volume, disposal, or deadline.
- Do not imply that Aseptaclean can haul or dispose of materials through an unverified or unlawful disposal path.
- Do not publish city SEO pages that merely swap place names.
- Do not publish claims for animal, rodent, or pigeon-waste services until the current compliance and insurance gates are cleared.

### Required record disclaimer

> Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.

### Footer scope statement

> ~~Aseptaclean performs services only within its current lawful and insured scope. Structural work, pest treatment, regulated materials and other specialist conditions are excluded or referred when required.~~

**Struck 2026-08-19 — owner ruling, claims-sensitive. The shipped wording wins:**

> Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.

Source of truth is `src/data/site.ts` → `legal.scopeDisclaimer`; it renders in the footer on 36
routes. **Reason:** the struck version enumerates *excluded work categories*; the shipped version
uses the `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2 **credentials-not-held** construction, which
is the more defensive of the two and is the construction doc 21 governs. Under `AGENTS.md` §1 doc
21 outranks this document on every regulated-service boundary, so the shipped line is also the
higher-ranked one. **This statement appeared twice in this document (here and under "Legal
line"); both were struck in the same change** so the conflict cannot re-enter from the copy that
was missed. Do not restore either. See `docs/05-DECISIONS-LOG.md`, 2026-08-19.

---

## 4. Audience and buying situations

### Primary audiences

- Homeowners with a difficult one-time cleaning need
- Families managing an estate or accumulated property
- Executors and authorized estate representatives
- Landlords and property managers
- Real estate agents and listing teams
- Buyers and sellers approaching a handoff deadline
- Contractors or project managers needing final post-construction cleaning
- Small commercial property operators

### High-intent situations

- Listing deadline
- Move-in or move-out
- Estate transfer
- Lawful post-eviction possession
- Renovation completion
- Heavy-content property recovery
- Hoarding-related clearing
- Severe-condition cleaning
- Non-human animal-waste condition, when accepted
- Small commercial deep cleaning or janitorial review

### Customer anxieties the site must answer

- Will important items be thrown away?
- Can this be assessed remotely?
- What exactly is included?
- Will the price change without approval?
- Can the company handle the condition safely and legally?
- Does the company understand the deadline?
- Who is accountable for the job?
- What happens if an out-of-scope condition is discovered?
- How will I know the agreed work was completed?

---

## 5. Offer and conversion strategy

The website does not sell a vague “cleaning package.” It sells a controlled assessment and a written plan.

### Primary call to action

**Request an assessment**

### Secondary calls to action

- Call 408-785-7588
- Text property photos
- Discuss a property
- View service
- View service areas

### Why public package pricing is not used

Price is affected by:

- Property size
- Current condition
- Contents volume and density
- Sorting and decision requirements
- Room and surface detail
- Access, stairs, parking, elevators, and loading path
- Utilities and occupancy
- Disposal path and third-party costs
- Material type and weight
- Crew size and duration
- Deadline
- Specialist conditions or exclusions

The site should never make the assessment feel like an unnecessary sales obstacle. It is the mechanism that protects the customer from vague scope and protects Aseptaclean from underpricing uncontrolled work.

### Risk-reversal language

- Nothing leaves without written approval.
- Scope, assumptions, and exclusions are written before scheduling.
- Uncertain items can be held for review.
- Added work requires documented authorization.
- Out-of-scope conditions are stopped, documented, and referred when required.
- The request form starts a conversation; it does not book or authorize work.

---

## 6. Visual design system

### Design objective

The site should feel like a serious property-recovery and restoration-adjacent operator, not a cheerful maid-service template, luxury lifestyle site, generic AI landing page, or emergency-response company making unsupported claims.

### Visual principles

- Editorial composition
- Strong typographic hierarchy
- Restrained color
- Square geometry
- Visible rules and document-like panels
- Real operating information instead of decorative icons
- No stock photography
- No oversized gradient blobs
- No glassmorphism
- No meaningless dashboard graphics
- No excessive pill-shaped UI
- No fake review carousel
- No floating badges that imitate certifications
- No repeated centered marketing sections

### Color system

| Token | Value | Use |
| --- | --- | --- |
| Deep night | `#0C2036` | Hero, footer, dark information sections |
| Night blue | `#142E4A` | Deadline band and supporting dark panels |
| Steel blue | `#7895AD` | Labels, rules, status text, accents |
| Pale sky | `#BED1DF` | Hero emphasis and quiet highlights |
| Ink | `#172638` | Primary body text |
| Muted slate | `#617080` | Secondary copy |
| Paper | `#F5F3ED` | Editorial section backgrounds |
| Paper secondary | `#EBE8DF` | Contact and supporting backgrounds |
| Rule | `#D4D8D8` | Borders and section separators |
| White | `#FFFFFF` | Cards, buttons, clean fields |

### Typography

| Role | Typeface | Treatment |
| --- | --- | --- |
| Display headings | Newsreader | Medium weight, tight tracking, editorial line breaks |
| Body copy | Inter | Regular and semibold, high readability |
| Utility labels | IBM Plex Mono | Small uppercase labels and status text |

### Type behavior

- Homepage H1: approximately 48–72 px responsive
- Interior-page H1: approximately 46–70 px responsive
- Section H2: approximately 34–54 px responsive
- Card H3: approximately 19–25 px
- Body: approximately 16–19 px depending on context
- Utility labels: approximately 9–11 px uppercase mono
- Use deliberate line breaks created by container width, not manual breaks that fail on mobile.

### Layout behavior

- Maximum content width: approximately 1180 px
- Desktop horizontal gutters: 24 px minimum per side
- Mobile horizontal gutters: 15 px minimum per side
- Major section spacing: approximately 94–105 px desktop and 65–72 px mobile
- Hero uses a two-column editorial grid on desktop and a single column on mobile.
- Service cards use four columns on wide screens, two on tablets, and one on mobile.
- Form fields remain in one column.
- Footer uses four columns on desktop and one column on mobile.

### Reusable visual components

- Utility ribbon
- Aseptaclean wordmark with square “A” mark
- Dropdown navigation groups
- Handoff Status sample panel
- Credibility strip
- Service-group cards
- Four-point operating difference grid
- Deadline band
- Five-stage process rows
- Property Handoff Record sample
- Quote-variable list
- Founder credentials grid
- Expandable FAQ rows
- Assessment form
- Related-service cards
- Scope-boundary panel
- Mobile call/text action bar

---

## 7. Complete sitemap and index status

**Superseded by `docs/SITEMAP-MASTER.md` (2026-08-16), which is now the single source of
truth for routes and index status.** The bare (non-city-suffixed) slugs below are
historical — master's city-suffixed slugs are canonical. This section's grouping still
identifies which doc-27 copy section backs each route.

| Group | Route | Page | Search status |
| --- | --- | --- | --- |
| Home | `/` | Home | Index |
| Detailed Cleaning | `/detailed-cleaning` | Detailed Cleaning hub | Index |
| Detailed Cleaning | `/deep-cleaning` | One-Time Deep Cleaning | Index |
| Detailed Cleaning | `/move-in-move-out-cleaning` | Move-In & Move-Out Cleaning | Index |
| Detailed Cleaning | `/post-construction-cleaning` | Post-Construction Cleaning | Index |
| Detailed Cleaning | `/window-cleaning` | Window Cleaning | Index |
| Specialty Cleaning | `/specialty-cleaning` | Specialty Cleaning hub | Index |
| Specialty Cleaning | `/extreme-condition-cleaning` | Extreme-Condition Cleaning | Index |
| Specialty Cleaning | `/animal-waste-cleanup` | Animal Waste Cleanup | Built; noindex pending gate |
| Specialty Cleaning | `/rodent-dropping-cleanup` | Rodent Dropping Cleanup | Built; noindex pending gate |
| Specialty Cleaning | `/pigeon-dropping-cleanup` | Pigeon Dropping Cleanup | Built; noindex pending gate |
| Property Clearing | `/property-clearing` | Property Clearing hub | Index |
| Property Clearing | `/property-cleanouts` | Property Cleanouts | Index |
| Property Clearing | `/hoarding-cleanup` | Hoarding Cleanup | Index |
| Property Clearing | `/estate-cleanouts` | Estate Cleanouts | Index |
| Property Clearing | `/debris-removal` | Debris Removal | Index |
| Property Clearing | `/eviction-cleanouts` | Eviction Cleanouts | Index |
| Commercial | `/commercial` | Commercial hub | Index |
| Commercial | `/janitorial-services` | Commercial & Janitorial Cleaning | Index |
| Service Areas | `/service-areas` | South Bay & Peninsula service area | Index |
| Company | `/process` | Process | Index |
| Company | `/projects` | Projects | Index |
| Company | `/about` | About | Index |
| Company | `/faq` | FAQ | Index |
| Company | `/contact` | Contact | Index |

### Deferred city routes

The future preferred routes are:

- `/service-areas/san-jose`
- `/service-areas/mountain-view`
- `/service-areas/sunnyvale`
- `/service-areas/santa-clara`
- `/service-areas/campbell`

They are intentionally not published as thin pages.

---

## 8. Header navigation

### Utility ribbon

- Insured — COI available on request
- Owner-operated assessments
- South Bay & Peninsula
- 408-785-7588

### Detailed Cleaning

- Hub: Detailed Cleaning
- Deep Cleaning
- Move-In & Move-Out
- Post-Construction
- Window Cleaning

### Specialty Cleaning

- Hub: Specialty Cleaning
- Extreme-Condition Cleaning
- Animal Waste Cleanup
- Rodent Dropping Cleanup
- Pigeon Dropping Cleanup

### Property Clearing

- Hub: Property Clearing
- Property Cleanouts
- Hoarding Cleanup
- Estate Cleanouts
- Debris Removal
- Eviction Cleanouts

### Commercial

- Hub: Commercial
- Commercial & Janitorial

### Service Areas

- Hub: Service Areas
- San Jose anchor
- Mountain View anchor
- Sunnyvale anchor
- Santa Clara anchor
- Campbell anchor

### Company

- About hub
- Process
- Projects
- About
- FAQ
- Contact

### Header call to action

**Request an assessment**

---

## 9. Homepage copy and section order

### 9.1 Hero

**Eyebrow**  
Property clearing · deep cleaning · documented closeout

**H1**  
Complex properties returned to a controlled, documented condition.

**Lead**  
Hoarding, estate and severe-condition properties—cleared, cleaned and closed out under one signed scope, by one accountable operator.

**Approval statement**  
Nothing leaves the property without your written approval.

**Primary CTA**  
Request an assessment →

**Secondary CTA**  
Text a photo

**Trust chips**

- Written scope before work
- No unapproved charges
- Documented closeout

### 9.2 Handoff Status sample

| Item | Supporting detail | Status |
| --- | --- | --- |
| Scope | Room-by-room, signed | Defined |
| Set-aside items | Documents · valuables · keys | Held |
| Clearing | Approved contents | Complete |
| Reset cleaning | Defined surfaces | Complete |
| Closeout record | Photos + exceptions | Issued |

Label the panel **Sample**. It must never be presented as a real customer record.

### 9.3 Credibility strip

| Heading | Supporting line |
| --- | --- |
| Insured | COI available on request |
| Owner-operated | Founder reviews the scope |
| Written scope | Decisions before work |
| South Bay & Peninsula | Service-area business |

### 9.4 Service-group introduction

> **DOES NOT SHIP — §9.4 and §9.5 are overruled for `/`.** Re-examined 2026-08-17 and upheld
> against this document a second time; see `docs/05-DECISIONS-LOG.md`, "Homepage four-card
> section — doc 27 §9.4–9.5 blocked on two independent grounds." Two rank-5 rules in
> `docs/18-VISUAL-DIRECTION.md` beat this section, and one of them is a claims constraint:
>
> 1. **§6.1** gates card count on owned photography — "add cards only as completed jobs
>    generate owned photography." The repo ships zero photographs, so the gate is unmet.
> 2. **§7** states "hantavirus and rodent-specific handling are not named anywhere until crew
>    PPE and protocol are confirmed in writing." §9.5's Specialty Cleaning card names rodent
>    and pigeon waste. `/` is the site's most indexable page, and doc 27's own **§21** holds
>    those routes behind a compliance release (B&P §8550(a)).
>
> The shipped section is three cards — see `src/components/ServiceCards.astro`. Do not apply
> §9.4–9.5 to `/` without clearing **both** gates; clearing only the photography one still
> leaves the §9.5 Specialty card unlawful to publish.

**Eyebrow**  
Scope of work

**H2**  
Four ways a property reaches its next handoff.

**Supporting copy**  
Choose the service group that matches the condition. The exact work is still defined property by property.

### 9.5 Homepage service cards

> **DOES NOT SHIP — §9.5 is overruled for `/` on the same two grounds as §9.4 above.**
> Repeated here rather than inherited from §9.4, deliberately: the annotation in §9.4 already
> said "§9.4 **and §9.5**", but `qa:gate6` clears its block flag at every heading, so the four
> card bodies below were reported as **absent** — as if approved copy had gone missing from the
> build — through four consecutive gate runs. They were never missing; they are not supposed to
> ship. An exemption that depends on a parser's block scope is not an exemption.
>
> This is the same failure as the footer scope statement on 2026-08-19: annotate one of two
> places and the conflict re-enters through the other. The shipped section is three cards —
> `src/components/ServiceCards.astro`. Do not apply §9.5 to `/` without clearing **both** gates
> in §9.4; clearing only the photography gate still leaves the Specialty card unlawful to
> publish.

#### Detailed Cleaning

Deep cleaning, move-in and move-out work, post-construction cleaning and window detailing.

#### Specialty Cleaning

Extreme-condition cleaning and accepted animal, rodent and pigeon-waste conditions.

#### Property Clearing

Property cleanouts, hoarding cleanup, estate clearing, debris removal and eviction cleanouts.

#### Commercial

Project-based commercial cleaning and select recurring janitorial programs.

### 9.6 Why Aseptaclean

**Eyebrow**  
Why Aseptaclean

**H2**  
The difference is what happens before and after the work itself.

#### One accountable company

Clearing, cleaning and closeout documentation stay under one written scope.

#### Written scope

What stays, what leaves, what gets cleaned and what is excluded are written down first.

#### Approval controls

Anything we’re not sure about goes into a labeled clear bag and waits for your decision. Added work requires documented authorization.

> **Amended 2026-08-19 — §9.15.2 humanization amendment 1, applied.** Was: *"Uncertain items
> are held for review."* "Held for review" is category language; a labeled clear bag is a
> picture, and a commitment that can actually be operated. Second sentence unchanged. Verified
> present in `dist/index.html`.

#### Documented closeout

Completion photographs and noted exceptions show how the approved scope closed.

### 9.7 Deadline band

**Heading**  
Working against a listing, transfer or family deadline?

**Supporting line**  
Assessment response within one business day

**CTA**  
Request an assessment →

### 9.8 Five-stage standard

**Eyebrow**  
Five-stage standard

**H2**  
One company stays accountable from the first decision to final closeout.

#### 01 — Scope

We write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.

> **Reconciled 2026-08-19 — code is truth. One comma.** Canon omitted the serial comma before
> *"and what the project requires"*; `dist/index.html` ships it. That single character is the
> entire divergence, and it held gate 6 at FAIL for the string. Recorded rather than fixed
> silently because a punctuation-only absence looks like a gate defect and gets dismissed as
> one — this one was real, and the gate was right.
>
> **A third variant exists.** `/handoff-standard/` renders *"…and what the project **will**
> require."* Same sentence, different tense, on a page whose copy comes from §17.1. Not
> reconciled here: §17.1 is its own section and is handled below. Flagged so the next editor
> does not "fix" one and leave the other.

Record: Room-by-room plan

#### 02 — Protect

Keep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.

> **Amended 2026-08-19 — §9.15.2 humanization amendment 2, applied.** Was: *"Keep areas are
> identified. Uncertain and important items are separated and reported."* Verified present in
> `dist/index.html`. This governs the **homepage** five-stage rail only; §17.1's Protect stage
> on `/handoff-standard/` is separate copy and was not in scope for this amendment — see the
> note there.

Record: Keep and review controls

#### 03 — Clear

Approved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.

Record: Clearing status

#### 04 — Reset

The property receives the detailed cleaning included for its next handoff.

Record: Cleaning status

#### 05 — Verify

Completion photographs, documented exceptions and a Property Handoff Record close the approved scope.

Record: Closeout package

### 9.9 Property Handoff Record sample

**Project identifier**  
Project HR-1042

**Required label**  
Sample · not a client record

**Facts**

- Authorized decision-maker: Owner of record
- Clearing scope: Approved nonhazardous contents
- Cleaning scope: Kitchen, bath and accessible surfaces
- Exceptions: Attached to signed scope

**Sample room status**

| Area | Decision | Note |
| --- | --- | --- |
| Entry + living | Keep | Furnishings remain; cleaning included |
| Kitchen | Keep | Cabinet and appliance interiors per scope |
| Primary closet | Review | Contents held for owner decision |
| Garage | Remove | Approved contents cleared; surfaces detailed |

**Required disclaimer**

> Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.

### 9.10 Pricing explanation

**Eyebrow**  
What it costs

**H2**  
One number, in writing, after the property is reviewed.

**Body**  
We do not force every property into a package. Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.

**Final pricing depends on**

- Property size and access
- Volume of approved contents
- Sorting and review required
- Cleaning condition
- Disposal requirements
- Labor and deadline

### 9.11 Founder section

**Eyebrow**  
The operator, not a call center

**H2**  
The person defining the work stays accountable for how it is carried out.

**Body**  
Matthew Ruiz is directly involved in scope review, project planning and operating oversight—a controlled-process background applied to properties that require more than a truck and a guess.

> **§9.15.2 humanization amendment 6 — reviewed 2026-08-19, deliberately no change.**
> *"More than a truck and a guess"* already passes the read-aloud gate in
> `docs/20-COPY-VOICE.md` Part 1. Recorded so a later pass does not "improve" it. Do not
> soften or replace this line without an owner ruling.

**Credentials**

- Education: B.S. Biochemistry, UC Riverside
- Background: Pharmaceutical manufacturing
- Background: Histology and surgical pathology

**Required disclaimer**

> This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.

### 9.12 Homepage FAQ

#### Can I approve the project remotely?

Yes, when access and decision authority are clear. Scope review, approvals, updates and closeout can be handled electronically.

#### Will you throw anything away without asking?

No. The scope identifies keep, remove and review areas. Anything we’re not sure about goes into a labeled clear bag and waits for your decision.

> **Amended 2026-08-19 — §9.15.2 humanization amendment 1, second half, applied.** Was:
> *"Uncertain items are not automatically discarded."* Same substitution as §9.6, so the two
> homepage surfaces stay identical rather than drifting. Verified in `dist/index.html`, both
> in the visible FAQ and in the `FAQPage` JSON-LD.
>
> **Open, not a defect in this section.** The homepage *Handoff Assurance* block still renders
> *"The scope identifies keep, remove, and review areas. Uncertain items are not automatically
> discarded."* — a third surface carrying the pre-amendment wording. It was never named by
> amendment 1 and is not canon text in this document, so this pass leaves it alone. It is
> logged as register item **P6**: the same page now says the uncertain-items commitment two
> different ways.

#### What happens if a specialist condition is discovered?

Work stops on that item. We document the condition and explain which qualified provider is needed before work continues.

#### How quickly can the project begin?

Assessment requests are reviewed within one business day. Scheduling depends on scope, access, labor and the deadline.

### 9.13 Homepage assessment section

**Eyebrow**  
Request an assessment

**H2**  
Tell us about the property.

**Body**  
Tell us the city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.

> **Amended 2026-08-19 — §9.15.2 humanization amendment 3, applied.** Was: *"Include the city,
> approximate size, current condition and deadline. You can text property photos after
> submitting the form."* Verified present on **28 routes** — every route rendering
> `src/components/QuickHandoffForm.astro`, not only `/`.

### 9.14 Final call to action

**Eyebrow**  
Final decision

**H2**  
Start with what you know. We will help define the rest.

**Body**  
Tell us what you are looking at, what must remain and when the property needs to be ready.

**CTAs**

- Request an assessment →
- Call 408-785-7588

---

## 10. Service hub copy

### 10.1 Detailed Cleaning hub

**Route:** `/detailed-cleaning`  
**Eyebrow:** Detailed cleaning  
**H1:** One-time cleaning for properties that need a real reset.  
**Lead:** Choose the page that matches the property’s next event—not a generic package that hides the difference between a deep clean, turnover and construction cleanup.

Cards:

- One-Time Deep Cleaning
- Move-In & Move-Out Cleaning
- Post-Construction Cleaning
- Window Cleaning

### 10.2 Specialty Cleaning hub

**Route:** `/specialty-cleaning`  
**Eyebrow:** Specialty cleaning  
**H1:** Condition-reviewed cleaning for difficult properties.  
**Lead:** These jobs require more screening and clearer boundaries. Photos can begin the review; complex conditions often need a walkthrough.

Cards:

- Extreme-Condition Cleaning
- Animal Waste Cleanup
- Rodent Dropping Cleanup
- Pigeon Dropping Cleanup

### 10.3 Property Clearing hub

**Route:** `/property-clearing`  
**Eyebrow:** Property clearing  
**H1:** Clear the contents. Recover access. Prepare the property.  
**Lead:** Property clearing is organized around authority, sorting rules, access and a legal disposal plan before cleaning begins.

Cards:

- Property Cleanouts
- Hoarding Cleanup
- Estate Cleanouts
- Debris Removal
- Eviction Cleanouts

### 10.4 Commercial hub

**Route:** `/commercial`  
**Eyebrow:** Commercial  
**H1:** Commercial cleaning with a written operating scope.  
**Lead:** Project-based deep cleaning and select recurring janitorial programs for small commercial properties across Santa Clara County.

Card:

- Commercial & Janitorial Cleaning

### Shared hub close

**Label:** One rule across every service  
**Heading:** We define the work before we schedule it.  
**Body:** Photos can start the review. Larger, heavier or more complicated properties may require a walkthrough before a firm quote.

---

## 11. Shared service-page structure

Every individual service page follows this sequence:

1. Header and navigation
2. Service category and geographic context
3. H1, service lead, assessment CTA, and phone CTA
4. “This service may fit when” screening panel
5. Owner-operated/insured/written-scope trust strip
6. Work-included section
7. Quote-variable section
8. Scope-boundary panel
9. Four-step start process
10. Service-specific FAQs
11. Related services
12. Full assessment form
13. Footer and mobile action bar

### Shared four-step process

#### 01 — Initial review

Send the city, approximate size, condition, deadline and clear photos.

#### 02 — Walkthrough if needed

Complex access, contents or conditions are checked before a firm quote.

#### 03 — Written scope

Price, inclusions, exclusions and assumptions are approved before scheduling.

#### 04 — Completion

The work is performed against the agreed scope and priorities.

---

## 12. Detailed Cleaning service-page copy

### 12.1 One-Time Deep Cleaning

**Route:** `/deep-cleaning`  
**SEO title:** Deep Cleaning Services in San Jose & the South Bay | Aseptaclean  
**Meta description:** Detailed one-time deep cleaning for kitchens, bathrooms and whole homes in San Jose and Santa Clara County.  
**H1:** One-Time Deep Cleaning

**Lead**  
For homes that need substantially more detail than routine housekeeping—especially kitchens, bathrooms, fixtures, edges and the areas that are usually skipped.

**This service may fit when**

- Routine cleaning is no longer enough
- Kitchen or bathroom buildup needs focused work
- The home needs a one-time reset
- You want the scope defined before the crew arrives

**Outcome heading**  
A deeper reset with the details written down.

**Outcome body**  
We do not rely on a vague label like “deep clean.” The quote lists the rooms, the surfaces, and the detail level — so when we say finished, you and we are reading the same page.

> **Amended 2026-08-19 — §9.15.2 humanization amendment 4, applied.** Was: *"The quote
> identifies the rooms, surfaces and detail level so both sides know what completion means."*
> Verified present in `dist/deep-cleaning-san-jose/index.html`.

**Work can include**

- Detailed kitchen and bathroom cleaning
- Baseboards, reachable trim, doors and fixtures
- Shower glass, tile and surface buildup within cleanable limits
- Floors, edges and accessible areas beneath movable items
- Room-by-room work based on the approved scope

**Quote variables**

- Property size and number of rooms
- Current soil and buildup
- Access beneath or behind appliances
- Specialty finishes and delicate materials
- Deadline and desired outcome

**Boundaries**

- Permanent staining or surface damage
- Restoration, repair or refinishing
- Unapproved heavy contents removal
- Human biological material or regulated waste

**FAQ**

**Is this recurring housekeeping?**  
No. This page is for focused one-time deep cleaning. Recurring service can be discussed separately when capacity allows.

**Do you move appliances?**  
Light, safely movable appliances may be included when access and flooring conditions allow. Gas-connected, built-in or unsafe items are excluded.

**Related services:** Move-In & Move-Out Cleaning, Window Cleaning, Extreme-Condition Cleaning

### 12.2 Move-In & Move-Out Cleaning

**Route:** `/move-in-move-out-cleaning`  
**SEO title:** Move-In & Move-Out Cleaning in San Jose | Aseptaclean  
**Meta description:** Vacant move-in, move-out and apartment cleaning across San Jose and Santa Clara County.  
**H1:** Move-In & Move-Out Cleaning

**Lead**  
Vacant-property cleaning built around the handoff: keys, listing photos, a final walkthrough, a lease turnover or a clean start in a new home.

**This service may fit when**

- A property is vacant or nearly vacant
- A tenant or owner is preparing for handoff
- Cabinets, appliances and fixtures need detailing
- There is a firm move or listing deadline

**Outcome heading**  
Cleaned for the next person—not merely touched up.

**Outcome body**  
The work is organized around the property’s next event, with priority given to the rooms and surfaces that affect a walkthrough, listing or move-in.

**Work can include**

- Kitchen, bathroom and cabinet interiors
- Baseboards, doors, trim and reachable fixtures
- Interior glass and tracks when included
- Floor cleaning based on surface type
- Final-detail pass against the approved scope

**Quote variables**

- Square footage and occupancy status
- Cabinet, appliance and window count
- Condition left by the prior occupant
- Elevator, parking and access limits
- Turnover deadline

**Boundaries**

- Carpet extraction unless separately arranged
- Wall repair or paint correction
- Abandoned contents not included in the quote
- Damage caused by wear, staining or failed finishes

**FAQ**

**Does the home need to be empty?**  
Vacant properties are the best fit. Limited remaining contents can be discussed, but they affect access and price.

**Can you work around a closing or lease deadline?**  
Sometimes. Availability depends on property size, condition and how soon the scope is approved.

**Related services:** One-Time Deep Cleaning, Window Cleaning, Post-Construction Cleaning

### 12.3 Post-Construction Cleaning

**Route:** `/post-construction-cleaning`  
**SEO title:** Post-Construction Cleaning in San Jose | Aseptaclean  
**Meta description:** Post-construction and post-remodel cleaning for completed projects in San Jose and Santa Clara County.  
**H1:** Post-Construction Cleaning

**Lead**  
Detailed removal of settled construction dust and surface residue after repairs or remodeling are complete and the trades are out of the work area.

**This service may fit when**

- Renovation dust remains on horizontal surfaces
- Cabinets, fixtures and floors need a final detail
- The construction work is substantially complete
- The property must be prepared for occupancy or presentation

**Outcome heading**  
A final-clean scope for completed renovation work.

**Outcome body**  
Post-construction cleaning is priced differently from ordinary house cleaning because fine dust travels, resettles and requires a deliberate top-to-bottom sequence.

**Work can include**

- Controlled dry removal of fine settled dust
- Detailed wiping of reachable surfaces and fixtures
- Cabinet, trim, ledge and baseboard detailing
- Interior glass cleaning when included
- Final floor cleaning appropriate to the surface

**Quote variables**

- Project size and construction type
- Whether trades are fully finished
- Amount and distribution of fine dust
- Height, access and glass quantity
- Protective films, stickers or adhesive residue

**Boundaries**

- Active construction areas
- Paint, grout, concrete or adhesive correction
- High-access exterior work without approved equipment
- Contractor punch-list or structural work

**FAQ**

**Can cleaning start while contractors are still working?**  
A rough pass may be possible, but the final clean should happen after dusty trades finish and the work area is released.

**Do you remove paint or hardened construction residue?**  
Only when the material and surface can be handled safely and the task is specifically included. Surface correction is not assumed.

**Related services:** Window Cleaning, Move-In & Move-Out Cleaning, Debris Removal

### 12.4 Window Cleaning

**Route:** `/window-cleaning`  
**SEO title:** Interior Window Cleaning in San Jose | Aseptaclean  
**Meta description:** Interior and accessible window cleaning for homes, turnovers and post-construction projects in Santa Clara County.  
**H1:** Window Cleaning

**Lead**  
Detail cleaning for interior glass, frames, sills and accessible tracks as a standalone project or part of a larger property reset.

**This service may fit when**

- Interior glass is hazy or marked
- A move or listing requires clearer windows
- Remodeling left dust on glass and frames
- Tracks and sills need detailed attention

**Outcome heading**  
Clearer glass with the frames and tracks accounted for.

**Outcome body**  
The quote separates glass, screens, frames and tracks so you are not comparing an exterior wash with a detailed interior-window service.

**Work can include**

- Interior glass cleaning
- Reachable frames and sills
- Accessible track vacuuming and wiping
- Spot detailing around latches and edges
- Exterior ground-level glass when specifically approved

**Quote variables**

- Window count, size and configuration
- Interior versus exterior access
- Screens, tracks and divided panes
- Construction residue or mineral deposits
- Height and safe ladder access

**Boundaries**

- Unsafe roof or high-ladder access
- Glass restoration or scratch removal
- Failed seals or permanent mineral etching
- Removal of materials that could damage glass or film

**FAQ**

**Do you clean exterior windows?**  
Ground-level and safely accessible exterior windows may be included. High-access work is reviewed separately and may be referred.

**Can you remove hard-water spots?**  
Light deposits may improve, but mineral restoration and etched glass require a different process and are not promised as standard cleaning.

**Related services:** One-Time Deep Cleaning, Move-In & Move-Out Cleaning, Post-Construction Cleaning

---

## 13. Specialty Cleaning service-page copy

### 13.1 Extreme-Condition Cleaning

**Route:** `/extreme-condition-cleaning`  
**SEO title:** Extreme-Condition Cleaning in San Jose | Aseptaclean  
**Meta description:** Planned cleaning for heavily soiled and difficult-property conditions in San Jose and Santa Clara County.  
**H1:** Extreme-Condition Cleaning

**Lead**  
For heavily soiled properties where routine cleaning is unrealistic and the work needs condition review, priorities, exclusions and a controlled scope.

**This service may fit when**

- Multiple rooms have severe buildup
- Access is limited by contents or condition
- The property needs staged recovery
- A normal cleaning quote would be unreliable

**Outcome heading**  
A difficult property broken into controllable work.

**Outcome body**  
The goal is not to hide the condition behind a generic cleaning package. We identify the priority areas, define what can be safely handled and document what remains outside scope.

**Work can include**

- Condition-based work plan
- Priority-area cleaning
- Heavy soil removal within current scope
- Approved contents handling
- Progress checkpoints for multi-stage work

**Quote variables**

- Severity and affected square footage
- Contents volume and access
- Waste type and disposal requirements
- Utilities, ventilation and occupancy
- Crew size and project duration

**Boundaries**

- Human biological material or trauma scenes
- Regulated medical or hazardous waste
- Structural repair, demolition or pest treatment
- Conditions outside current training, insurance or lawful scope

**FAQ**

**Can you quote this from photos?**  
Photos can support an initial range. Severe or complicated conditions usually require an in-person walkthrough before a firm scope.

**Is every extreme-condition job accepted?**  
No. We decline or refer conditions that exceed our current legal, insurance, training or equipment scope.

**Related services:** Hoarding Cleanup, Property Cleanouts, Animal Waste Cleanup

### 13.2 Animal Waste Cleanup — gated

**Route:** `/animal-waste-cleanup`  
**Search status:** `noindex, follow` pending compliance release  
**SEO title after release:** Animal Waste Cleanup in San Jose | Aseptaclean  
**Meta description:** Non-human animal waste cleanup for accepted residential and property conditions in Santa Clara County.  
**H1:** Animal Waste Cleanup

**Lead**  
Condition-based cleanup for accepted non-human animal waste, odor sources and heavily affected surfaces after the animal issue is controlled.

**This service may fit when**

- Pet waste affects floors or hard surfaces
- A vacant property has animal-related soil
- The source is non-human and can be safely accessed
- The scope needs separation from pest or repair work

**Outcome heading**  
Cleanup after the animal source is controlled.

**Outcome body**  
We separate cleaning from pest treatment, veterinary issues and structural replacement. The quote covers only the surfaces and materials we can reasonably clean within the approved scope.

**Work can include**

- Initial condition and material review
- Removal of accepted surface waste
- Cleaning of approved nonporous surfaces
- Odor-source reduction within cleanable materials
- Bagging and staging as defined in the scope

**Quote variables**

- Waste type, amount and age
- Porous versus nonporous surfaces
- Affected rooms and contents
- Ventilation and safe access
- Disposal path and local requirements

**Boundaries**

- Live animal handling or pest control
- Human waste or human biological material
- Removal of contaminated structural materials
- Guaranteed odor removal from damaged porous materials

**FAQ**

**Do you remove live animals?**  
No. Animal control or a pest professional must address live animals and active entry before cleanup.

**Will the odor be completely gone?**  
Not always. Waste absorbed into subfloor, drywall or other porous materials may require removal or repair by an appropriate provider.

**Related services:** Rodent Dropping Cleanup, Pigeon Dropping Cleanup, Extreme-Condition Cleaning

### 13.3 Rodent Dropping Cleanup — gated

**Route:** `/rodent-dropping-cleanup`  
**Search status:** `noindex, follow` pending compliance release  
**SEO title after release:** Rodent Dropping Cleanup in San Jose | Aseptaclean  
**Meta description:** Condition-reviewed rodent dropping cleanup for homes and properties across Santa Clara County.  
**H1:** Rodent Dropping Cleanup

**Lead**  
Cleanup of accepted rodent-dropping conditions after active pest control and entry-point work are handled by the appropriate provider.

**This service may fit when**

- Droppings remain after pest activity
- The affected areas can be safely accessed
- Pest control has addressed the active source
- The property needs a written cleanup scope

**Outcome heading**  
Cleanup separated from pest control and construction.

**Outcome body**  
Aseptaclean defines the cleanable surfaces and affected areas. Extermination, exclusion, insulation and structural work remain separate trades.

**Work can include**

- Affected-area review and work-zone planning
- Controlled collection using appropriate wet methods
- Cleaning of approved accessible surfaces
- Contents handling when specifically included
- Final visual review against the scope

**Quote variables**

- Extent and age of contamination
- Attic, crawlspace or living-area access
- Insulation and porous materials
- Contents volume
- Pest-control status

**Boundaries**

- Pest extermination or entry-point sealing
- Insulation removal or replacement
- Structural demolition or repair
- Conditions requiring a different regulated remediation provider

**FAQ**

**Should pest control come first?**  
Yes. Active infestation and entry points should be addressed before final cleanup so the condition does not immediately return.

**Do you remove attic insulation?**  
No. Insulation removal and replacement are outside this cleaning scope and may require an appropriately licensed provider.

**Related services:** Animal Waste Cleanup, Pigeon Dropping Cleanup, Extreme-Condition Cleaning

### 13.4 Pigeon Dropping Cleanup — gated

**Route:** `/pigeon-dropping-cleanup`  
**Search status:** `noindex, follow` pending compliance release  
**SEO title after release:** Pigeon Dropping Cleanup in San Jose | Aseptaclean  
**Meta description:** Condition-reviewed pigeon dropping cleanup for accessible residential and commercial property areas in Santa Clara County.  
**H1:** Pigeon Dropping Cleanup

**Lead**  
Cleanup for accepted pigeon-dropping conditions on safely accessible surfaces after roosting, exclusion and active bird issues are addressed.

**This service may fit when**

- Droppings affect an accessible balcony or surface
- The active bird source has been addressed
- The work area can be controlled
- The property needs a defined cleaning scope

**Outcome heading**  
A controlled cleanup plan for accessible affected areas.

**Outcome body**  
The assessment determines whether the work can be handled as cleaning or needs a specialized access, bird-control or remediation provider.

**Work can include**

- Condition and access review
- Controlled wet cleanup of accepted deposits
- Cleaning of approved nonporous surfaces
- Bagging and staging as defined
- Work-area closeout review

**Quote variables**

- Deposit amount and affected surface
- Height and fall exposure
- Ventilation and public access
- Surface porosity and damage
- Bird-exclusion status

**Boundaries**

- Bird removal, trapping or exclusion
- Roof work or unsafe high access
- Structural repair or damaged-material replacement
- Conditions beyond current equipment or regulatory scope

**FAQ**

**Do you install bird spikes or exclusion systems?**  
No. Bird exclusion is separate from cleanup and should be completed by the appropriate provider.

**Can you clean a roof?**  
Only safely accessible areas are considered. Roof and high-access conditions may be declined or referred.

**Related services:** Animal Waste Cleanup, Rodent Dropping Cleanup, Debris Removal

---

## 14. Property Clearing service-page copy

### 14.1 Property Cleanouts

**Route:** `/property-cleanouts`  
**SEO title:** Property Cleanout Services in San Jose | Aseptaclean  
**Meta description:** Planned property cleanouts for homes, rentals and difficult properties across Santa Clara County.  
**H1:** Property Cleanouts

**Lead**  
Structured clearing for properties with unwanted contents, debris or accumulated material—organized around access, decision rights and the next use of the property.

**This service may fit when**

- A property cannot be cleaned until contents are cleared
- Items must be separated into keep, remove and uncertain
- A landlord or owner needs a turnover plan
- The volume requires staging or container coordination

**Outcome heading**  
A property cleared with decisions made before removal.

**Outcome body**  
Cleanouts go wrong when every item is treated as trash. We define authority, sorting rules, staging and disposal before the crew begins.

**Work can include**

- Walkthrough and contents-volume review
- Defined keep, remove and do-not-touch zones
- Bagging, sorting and staging
- Container or approved disposal coordination
- Optional cleaning after clearing

**Quote variables**

- Volume, weight and material types
- Stairs, elevators and loading access
- Decision-maker availability
- Container and disposal requirements
- Cleaning required after removal

**Boundaries**

- Unknown hazardous materials
- Documents, valuables or keepsakes without direction
- Structural demolition
- Unpermitted hauling or disposal

**FAQ**

**Do you haul everything away yourself?**  
Disposal may use containers or appropriate third-party providers depending on the city, volume and material type.

**Can cleaning be added after the cleanout?**  
Yes. A separate cleaning phase can be scoped once surfaces and rooms become accessible.

**Related services:** Estate Cleanouts, Hoarding Cleanup, Debris Removal

### 14.2 Hoarding Cleanup

**Route:** `/hoarding-cleanup`  
**SEO title:** Hoarding Cleanup in San Jose | Aseptaclean  
**Meta description:** Structured hoarding cleanup and property clearing for accepted non-human conditions in Santa Clara County.  
**H1:** Hoarding Cleanup

**Lead**  
A staged clearing and cleaning process for heavily accumulated properties, with decisions, priorities and boundaries established before items are moved.

**This service may fit when**

- Accumulated contents block rooms or pathways
- A family or owner needs a staged plan
- Items require keep/remove review
- Cleaning cannot begin until access is restored

**Outcome heading**  
Progress without treating the property like a dumpster.

**Outcome body**  
The work is divided into zones and decisions. That protects important items, keeps the crew productive and makes the next phase of cleaning possible.

**Work can include**

- Condition and access walkthrough
- Keep, remove and review categories
- Room-by-room clearing plan
- Bagging, staging and disposal coordination
- Cleaning of released areas when included

**Quote variables**

- Volume and density of contents
- Decision-making requirements
- Waste types and pests
- Utilities and safe access
- Number of stages and crew days

**Boundaries**

- Forced removal without authorized direction
- Human biological material or regulated waste
- Pest treatment or structural repair
- Unknown chemicals, weapons or hazardous materials

**FAQ**

**Do you throw everything away?**  
No. Removal rules are agreed in advance, and uncertain items can be placed in a review area for the authorized decision-maker.

**Can the cleanup happen in stages?**  
Yes. Staging is often the safest and most practical approach for dense or emotionally difficult properties.

**Related services:** Property Cleanouts, Estate Cleanouts, Extreme-Condition Cleaning

### 14.3 Estate Cleanouts

**Route:** `/estate-cleanouts`  
**SEO title:** Estate Cleanout Services in San Jose | Aseptaclean  
**Meta description:** Estate cleanout, contents clearing and follow-on cleaning across San Jose and Santa Clara County.  
**H1:** Estate Cleanouts

**Lead**  
A deliberate process for sorting, staging and clearing estate contents before sale, transfer, renovation or family handoff.

**This service may fit when**

- A family or representative is managing estate contents
- Items must be separated before removal
- The property is being prepared for sale or transfer
- Cleaning is needed after rooms are cleared

**Outcome heading**  
A respectful clearout built around authority and decisions.

**Outcome body**  
The person authorizing removal identifies what must be preserved. The scope then separates sorting, staging, disposal and final cleaning.

**Work can include**

- Authorized decision-maker walkthrough
- Keep, donate, remove and review zones
- Contents staging and bagging
- Container or disposal coordination
- Optional post-clearout cleaning

**Quote variables**

- Property and contents volume
- Required sorting detail
- Stairs, access and parking
- Donation or disposal instructions
- Deadline for sale or handoff

**Boundaries**

- Valuation, appraisal or estate-sale services
- Legal decisions about ownership
- Removal without authorized direction
- Hazardous materials or structural work

**FAQ**

**Do you buy or appraise estate items?**  
No. Appraisal, resale and estate-sale services are separate. We follow the authorized sorting and removal plan.

**Can you clean the home afterward?**  
Yes. Move-out or detailed cleaning can be added after the rooms are cleared and accessible.

**Related services:** Property Cleanouts, Debris Removal, Move-In & Move-Out Cleaning

### 14.4 Debris Removal

**Route:** `/debris-removal`  
**SEO title:** Property Debris Removal in San Jose | Aseptaclean  
**Meta description:** Property debris removal, staging and disposal coordination for accepted materials in Santa Clara County.  
**H1:** Debris Removal

**Lead**  
Removal planning for loose, non-hazardous property debris that must be cleared before cleaning, turnover or the next phase of work.

**This service may fit when**

- Loose debris blocks cleaning or access
- A turnover left approved discard material
- A container or disposal route must be planned
- The material can be identified before removal

**Outcome heading**  
Debris removed through a defined and legal disposal plan.

**Outcome body**  
The quote separates labor, containers, third-party hauling and follow-on cleaning so disposal costs are not hidden inside a vague cleanout number.

**Work can include**

- Material and volume review
- Bagging and staging of approved debris
- Loading coordination
- Container or appropriate hauler coordination
- Broom-clean or detailed cleaning when included

**Quote variables**

- Material type, weight and volume
- Distance from debris to loading area
- Stairs, elevators and parking
- Container fees and local rules
- Labor required for sorting

**Boundaries**

- Hazardous or unknown materials
- Construction demolition
- Unpermitted transport or disposal
- Items not authorized for removal

**FAQ**

**Are disposal fees included?**  
The written quote states whether container, facility or third-party hauling fees are included, estimated or billed separately.

**Do you take hazardous materials?**  
No. Unknown chemicals, regulated waste and other hazardous materials require an appropriate disposal provider.

**Related services:** Property Cleanouts, Estate Cleanouts, Eviction Cleanouts

### 14.5 Eviction Cleanouts

**Route:** `/eviction-cleanouts`  
**SEO title:** Eviction Cleanout Services in San Jose | Aseptaclean  
**Meta description:** Eviction cleanout and turnover cleaning for property owners and managers in Santa Clara County.  
**H1:** Eviction Cleanouts

**Lead**  
Contents clearing and cleaning after lawful possession has been restored and the property owner or manager has authority to direct removal.

**This service may fit when**

- Possession has been lawfully returned
- Abandoned contents require authorized handling
- The unit needs clearing before repairs or turnover
- A deadline is tied to re-rental or inspection

**Outcome heading**  
A cleanout that begins only after authority is clear.

**Outcome body**  
Aseptaclean does not decide what is legally abandoned. The authorized owner or manager provides direction; we then execute the approved clearing and cleaning scope.

**Work can include**

- Authorized walkthrough and documentation
- Approved contents bagging and staging
- Debris and container coordination
- Condition-based cleaning after access is restored
- Scope changes documented when hidden conditions appear

**Quote variables**

- Contents and debris volume
- Legal authorization and removal instructions
- Property condition and pests
- Access, elevators and parking
- Turnover deadline

**Boundaries**

- Legal eviction activity or tenant communication
- Removal before lawful possession
- Unknown hazardous materials
- Repairs, demolition or pest treatment

**FAQ**

**Can you remove items before the eviction is complete?**  
No. The owner or manager must confirm lawful possession and authority before contents are handled.

**Can you clean after the unit is emptied?**  
Yes. Turnover cleaning can be included as a second phase after access to surfaces is restored.

**Related services:** Property Cleanouts, Debris Removal, Move-In & Move-Out Cleaning

---

## 15. Commercial service-page copy

### Commercial & Janitorial Cleaning

**Route:** `/janitorial-services`  
**SEO title:** Commercial Janitorial Cleaning in San Jose | Aseptaclean  
**Meta description:** Project-based and select recurring commercial janitorial cleaning for small facilities in Santa Clara County.  
**H1:** Commercial & Janitorial Cleaning

**Lead**  
Defined cleaning programs for small commercial properties that need reliable scope, clear frequencies and direct owner communication.

**This service may fit when**

- A small facility needs a written cleaning scope
- The current service misses important details
- A one-time commercial deep clean is needed
- Management wants one accountable point of contact

**Outcome heading**  
A commercial scope that can actually be inspected.

**Outcome body**  
The agreement identifies frequencies, areas and periodic tasks. That prevents the common failure where every expectation is buried under the word “janitorial.”

**Work can include**

- Restroom and break-area cleaning
- Touchpoint and common-area cleaning
- Floor care within the agreed method
- Waste removal to onsite receptacles
- Periodic detail tasks when scheduled

**Quote variables**

- Facility type and square footage
- Frequency and service window
- Occupancy and security requirements
- Consumables and onsite equipment
- Floor types and periodic tasks

**Boundaries**

- Clinical infection-control programs unless separately qualified
- Industrial production cleaning
- High-access exterior work
- Repairs, pest control or regulated waste

**FAQ**

**Do you offer nightly janitorial service?**  
Select schedules may be available depending on location, facility type, service window and current capacity.

**Do you provide supplies?**  
Cleaning supplies can be included. Paper goods, liners and client consumables are defined separately in the proposal.

**Related services:** One-Time Deep Cleaning, Post-Construction Cleaning, Window Cleaning

---

## 16. Service Areas page

**Route:** `/service-areas`  
**SEO title:** South Bay & Peninsula Service Area | Aseptaclean  
**Meta description:** Aseptaclean provides owner-operated cleaning and property clearing across the South Bay and Peninsula.

**Eyebrow**  
Service area

**H1**  
South Bay and Peninsula properties, reviewed one address at a time.

**Lead**  
Travel, access, parking, building rules and the project condition are considered before a scope is scheduled.

**Section label**  
By area

> **Reconciled 2026-08-19 — code is truth.** Was: ~~*Primary service area*~~. The port ships
> *"By area"* in this slot (`dist/service-areas/index.html`). The H2 and the body below it
> match the build exactly and were never in question.
>
> **The city presentation also changed and is not reconciled here.** This section specifies two
> flat lists, *Primary cities* (5, each "Assessment requests accepted") and *Also reviewed* (5).
> The build groups the same nine cities as prose under **West Valley**, **Peninsula edge**, and
> **South County**, each with a sentence about what shapes access there. Every city named in
> this section appears on the page, so nothing is missing — but the structure this section
> describes is not the structure that ships. Recorded as register item **P7**; reconciling it
> means rewriting the list into the built grouping, which is a copy rewrite and wants an owner
> read, not a documentation pass.

**Body**  
We currently review work in the cities below. Availability depends on the service, property condition, access and schedule.

**Primary cities**

- San Jose — Assessment requests accepted
- Mountain View — Assessment requests accepted
- Sunnyvale — Assessment requests accepted
- Santa Clara — Assessment requests accepted
- Campbell — Assessment requests accepted

**Also reviewed**

- Los Altos
- Los Altos Hills
- Los Gatos
- Palo Alto
- Atherton

**Publishing note — internal policy, DOES NOT SHIP**  
Individual city guides will be published only after each page has verified local operating details and real project proof. That keeps the site useful and avoids thin location pages.

> **Marked non-shipping 2026-08-19.** This was reported as a gate-6 absence, which was the
> gate working correctly on a mislabelled input: it is a **policy statement about when to
> publish**, not copy any visitor reads. It was never built because it was never meant to be.
> Marking it here stops it being re-reported every run and stops a future session "fixing" the
> absence by rendering an internal note onto a public page.
>
> **The policy itself stands and is load-bearing** — it is the city-page gate that
> `docs/SITEMAP-MASTER.md` refers to as "as earned (real job + original content)", and
> `cityPages` is currently `[]` in the build, which is consistent with it. Do not read
> "does not ship" as "no longer applies".

---

## 17. Company-page copy

### 17.1 Process

**Route:** `/handoff-standard/`  
**SEO title:** Our Process | Aseptaclean  
**Meta description:** How Aseptaclean scopes, protects, clears, resets and documents property work.

> **Route corrected 2026-08-19 — code is truth.** Was `/process`, which has never been built
> and does not resolve. The page ships at `/handoff-standard/`; `docs/SITEMAP-MASTER.md`
> already recorded it as "`/handoff-standard/` (= Process)". Title and meta match the build
> exactly and are unchanged.

**Eyebrow**  
The five-stage handoff standard

**H1**  
Decisions first. Work second. Proof at closeout.

**Lead**  
The operating system is designed for properties where vague instructions create expensive mistakes.

**Scope**  
We write down what stays, what goes, what gets cleaned, what is excluded, and what the project will require.

**Protect**  
Keep areas are identified. Uncertain and important discovered items are separated and reported. We do not decide what mattered to your family.

**Clear**  
Approved unwanted contents are consolidated, removed, or coordinated for disposal within the signed scope.

**Reset**  
The property receives the detailed cleaning included for its next handoff, including animal and organic conditions within lawful scope.

**Verify**  
You receive completion photographs, documented exceptions, and a Property Handoff Record showing how the approved scope was closed.

**Record heading**  
Property Handoff Record — annotated

**Record body**  
Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.

> **Reconciled to the build 2026-08-19 — code is truth. All five stages, plus the record
> block.** Read out of `dist/handoff-standard/index.html`. Superseded wording, kept for the
> record:
>
> | Slot | Was |
> | --- | --- |
> | Scope | ~~We document decision authority, the rooms involved, what stays, what may leave, what gets cleaned and what is excluded.~~ |
> | Protect | ~~Keep areas and uncertain items are marked. Documents, keys and valuables are separated for review.~~ |
> | Clear | ~~Only approved nonhazardous contents are consolidated, staged or coordinated for lawful disposal.~~ |
> | Reset | ~~The defined rooms and surfaces receive the approved detailed cleaning work.~~ |
> | Verify | ~~Completion photographs, documented exceptions and the Property Handoff Record close the scope.~~ |
> | Record heading | ~~A clear end point for the approved work.~~ |
> | Record body | ~~The Property Handoff Record summarizes the approved scope, completion status and documented exceptions. It is a project record—not a regulatory clearance…~~ |
>
> This is the same class of staleness as register item P4: the visual port rewrote the page and
> this section was never updated, so it described a page that no longer existed. Five of the
> seven absences gate 6 was reporting against `27` §17.1 were this one cause.
>
> **Two things checked before accepting the build's wording, because "code is truth" does not
> extend to claims.**
>
> 1. **The record disclaimer survived the rewrite.** The old Record body carried the
> regulatory-clearance disclaimer inline. The build carries it as its own sentence pair — a
> different construction, the same four denials (regulatory clearance / inspection approval /
> environmental certification / safe-or-habitable), and it renders on **36 of 37 routes**, not
> just this page. Nothing was lost; coverage widened. Had it been dropped, the correct action
> would have been to fix the code, not the document.
> 2. **Reset now names organic conditions.** *"…including animal and organic conditions within
> lawful scope"* is new in the build. It is cleaning language bounded by "within lawful scope",
> which is the construction `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` permits, and it does not use
> any prohibited term. Recorded explicitly because a claims-relevant phrase entering canon by
> way of a documentation pass is exactly the kind of change that should never happen quietly.
> **This is a documentation reconciliation, not a claims approval** — if the phrase is to be
> re-examined, that is a doc-21 review, and this note is the pointer to it.

### 17.2 Projects

**Route:** `/projects`  
**SEO title:** Projects & Property Handoffs | Aseptaclean  
**Meta description:** The project types Aseptaclean reviews and the proof required before work is shown publicly.

**Eyebrow**  
Projects

**H1**  
Real work will appear here only when it can be shown honestly.

**Lead**  
No stock transformations, borrowed photographs or invented case studies. Public project records require client permission and verifiable scope details.

**H2**  
Property work with a defined handoff.

**Project types**

- Estate and family-directed cleanouts
- Hoarding and heavy-content properties
- Move-out and listing-ready resets
- Post-construction final cleaning
- Small commercial detail projects

**Publication standard heading**  
What a future case study must include.

**Publication standard body**  
Every published project should state the original condition, approved scope, important exclusions, work completed and documented exceptions. Before-and-after images must belong to Aseptaclean and have permission for public use.

Until that proof exists, this page describes project types rather than pretending to be a portfolio.

### 17.3 About

**Route:** `/about`  
**SEO title:** About Aseptaclean | Owner-Operated Property Cleaning  
**Meta description:** Meet Matthew Ruiz and learn how Aseptaclean approaches cleaning and property clearing work.

**Eyebrow**  
About Aseptaclean

**H1**  
A controlled-process mindset for properties that need careful decisions.

**Lead**  
Aseptaclean is an owner-operated cleaning and property clearing business serving the South Bay and Peninsula.

**Founder heading**  
Matthew Ruiz stays close to the scope.

**Founder body**  
Matthew is directly involved in scope review, project planning and operating oversight. His background includes a B.S. in Biochemistry from UC Riverside, pharmaceutical manufacturing, and histology and surgical pathology.

**Required disclaimer**

> This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.

**Operating principles**

#### Clear authority

We identify who can approve contents decisions and scope changes.

#### Written boundaries

Inclusions, exclusions and assumptions are written before scheduling.

#### Direct accountability

You speak with the operator reviewing the property—not a distant call center.

### 17.4 FAQ

**Route:** `/faq`  
**SEO title:** Frequently Asked Questions | Aseptaclean  
**Meta description:** Answers about Aseptaclean estimates, photos, scope, pricing, access and service boundaries.

**Eyebrow**  
FAQ

**H1**  
Straight answers before the property is scheduled.

**Lead**  
If a condition cannot be responsibly assessed online, we will say so.

#### Can you assess a property from photos?

Photos can support an initial review or range when they clearly show every affected room, access, contents volume and condition. Larger or uncertain projects usually need a walkthrough before a firm quote.

#### Do you list prices online?

No. Property condition, contents, access, disposal needs, cleaning detail and deadline materially change the work. The agreed price is written after review.

#### Will you remove anything without approval?

No. The scope identifies keep, remove and review areas. Uncertain items are held for a decision.

#### Are you insured?

Yes. A certificate of insurance is available on request.

#### Do you handle hazardous or human biological material?

No. Human biological material, regulated medical waste, hazardous chemicals and other out-of-scope conditions are stopped and referred to an appropriate provider.

#### Do you perform repairs or demolition?

No. Aseptaclean is not a contractor. Structural work, demolition, pest treatment and specialty remediation are outside the current scope.

#### Can I manage the project remotely?

Often, yes. Access, decision authority, scope approvals, updates and closeout can be handled electronically when the project allows.

#### How soon will you respond?

Assessment requests are reviewed within one business day. Job scheduling depends on scope, access, labor and deadline.

### 17.5 Contact

**Route:** `/contact`  
**SEO title:** Request a Property Assessment | Aseptaclean  
**Meta description:** Request an Aseptaclean cleaning or property clearing assessment in the South Bay and Peninsula.

**Eyebrow**  
Contact

**H1**  
Start with the property details.

**Lead**  
Share the city, approximate size, current condition, access and deadline. Clear photos help us decide whether a walkthrough is needed.

**Call**  
{site.business.phone}  
For immediate questions about fit and timing.

**Text photos**  
{site.business.phone}  
Stand in the doorway and get the whole room, then step in close on the worst spots.

**Service area**  
{site.business.region}  
Availability depends on the address, scope and schedule.

> **Amended 2026-08-19 — two changes to this block, both in `docs/27-COPY-CANONICAL.md`.**
>
> **1. §9.15.2 humanization amendment 5, applied.** Text-photos line was: *"Send wide views and
> close details of the affected areas."* Verified present on `/contact/` and `/thank-you/`.
>
> **2. Three hardcoded business facts replaced with tokens.** This block carried the literal
> `408-785-7588` twice and `South Bay & Peninsula` once. `AGENTS.md` §3 makes
> `src/data/site.ts` the single source for both, and `AGENTS.md` outranks this document on
> business facts. The literal also used a different format from the one the site renders
> everywhere else (`(408) 785-7588`), so the canon specified a spelling the build does not
> use — the identical defect corrected in §9.15.5's submission-error string on 2026-08-19.
>
> This also removes a **false gate-6 absence**. `qa:gate6` joins the lines under one bold
> label, so it searched the build for *"408-785-7588 Stand in the doorway…"* as a single string
> and never found it, while the sentence itself was present on two routes. A literal fact
> stapled to a copy line is unmatchable by construction; a token is not.

---

## 18. Assessment forms

### Homepage compact form

Fields:

- Name — required
- Phone — required
- Description — required
- Consent checkbox — required
- Hidden service value: Assessment request
- Hidden anti-spam field
- Automatically captured page path and available campaign source values

Description placeholder:

> ~~Property city, condition, approximate size and deadline.~~

**Struck 2026-08-19 — owner ruling. The shipped wording wins:** *"A quick description of the
property and what needs to happen."* (`src/components/QuickHandoffForm.astro`). Do not restore
this line or re-open the comparison; the conflict was adjudicated, not overlooked. See
`docs/05-DECISIONS-LOG.md`, 2026-08-19.

Phone helper:

> ~~So Matthew can follow up about the property.~~

**Struck 2026-08-19 — owner ruling. The shipped wording wins:** *"We call this number back —
usually same business day."* (`src/components/QuickHandoffForm.astro`). It states the commitment
rather than the reason for the field, which is the more useful thing at that point in the form.
Do not restore. See `docs/05-DECISIONS-LOG.md`, 2026-08-19.

Submit label:

> Send the details

Submission clarification:

> This only starts the conversation. It does not book or authorize work.

Consent:

> I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.

**Amended 2026-08-19 — owner ruling. This is a merge, not a replacement.** The original §18
consent read *"I agree that Aseptaclean may call or text me about this request. Consent is not a
condition of purchase."*; the shipped consent read *"I agree to be contacted about this project
by phone, text, or email. I have read the Privacy Policy."* Each carried something the other
lacked — §18 the *"not a condition of purchase"* disclosure, the build the Privacy Policy link —
so both were kept and `email` was added to the channel list to match what the build already
disclosed. "Privacy Policy" ships as a link.

**10DLC-relevant. Pending owner/counsel confirmation.** This is consent language on a site cited
in an active Twilio 10DLC campaign review (release checklist C9). It is not a copy preference and
must not be edited on style grounds. The full assessment form's consent
(`AssessmentForm.astro`) is a **different and broader** string covering property-media use and
the Terms — deliberately not changed by this ruling, and worth reading alongside this one if a
carrier reviewer raises consent.

Success message:

> Got it. I’ll review the details and contact you about the next step.

### Full assessment form

**Reconciled to the build 2026-08-19 (register item P4). Code is truth.** This section
previously specified a single-step, eleven-field form with a `Service needed` dropdown and one
free-text `Property description`. `src/components/AssessmentForm.astro` is a **three-step
wizard with 47 named fields**. That is not a string swap — the form described here was
superseded by what was built, and the section was never updated. What follows is read out of
`dist/request-assessment/index.html`.

**Step 1 of 3 — Property fit**

| Field | Type | Required |
| --- | --- | --- |
| `property_city` | text | required |
| `property_type` | select | required |
| `vacant_status` | radio | required |
| `property_situation` | select | required |
| `desired_completion_date` | date | required |
| `approximate_square_footage` | select | required |

**Step 2 of 3 — Scope and condition**

| Field | Type | Required |
| --- | --- | --- |
| `areas_involved[]` | checkbox | optional |
| `contents_removal`, `heavy_cleaning`, `garage_storage`, `appliance_interiors`, `cabinet_interiors` | radio | required |
| `animal_waste`, `human_biological_material`, `needles_sharps`, `sewage`, `mold`, `pest_activity` | radio | required |
| `number_of_levels`, `occupancy_status`, `safety_routing` | select | required |
| `priority_rooms`, `detail_priorities` | textarea | required |
| `must_remain`, `must_remove` | textarea | required |
| `important_finishes`, `access_notes` | textarea | optional |
| `pets`, `someone_present`, `investment_range` | mixed | optional |
| `property_media[]` | file | optional |

The six condition radios (`animal_waste` … `pest_activity`) are a **fit-review screen, not a
service menu.** They exist so a project that falls outside lawful scope is caught before a
scope is written. Do not restyle them as selling points and do not remove one without reading
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §3.

**Step 3 of 3 — Authority and contact**

| Field | Type | Required |
| --- | --- | --- |
| `full_name`, `phone`, `email` | text / tel / email | **all required** |
| `relationship_to_property` | select | required |
| `authority_to_approve` | radio | required |
| `property_address` | textarea | required |
| `preferred_contact_method` | radio | required |
| `property_zip`, `best_contact_time`, `additional_notes` | mixed | optional |
| `privacy_consent` | checkbox | required |
| `scope_acknowledgment` | checkbox | required |

**Email is required here.** This section previously called it optional; the build requires it.
Noted because it is the one field where the old text would have caused a real behavioural
change if someone "fixed" the code to match the doc.

Hidden/captured: `form_version`, `offer_type`, `entry_route`, `submitted_from`, `utm_*`,
`gclid`, `landing_page`, `referrer`, `submission_timestamp`, `idempotency_key`, and
`company_website` (honeypot).

Consent and acknowledgment wording for this form is **not** restated here — it lives in
`src/data/site.ts` (`legal.consentBase` + `legal.consentAssessmentAppendix`) and is
10DLC-relevant. See `docs/05-DECISIONS-LOG.md`, 2026-08-19.

Description placeholder:

> ~~Describe the rooms, condition, approximate size and anything that may affect access or scope.~~

**Struck 2026-08-19 — the field it describes does not exist.** The build has no single
description textarea; that intent is carried by four structured fields (`priority_rooms`,
`detail_priorities`, `must_remain`, `must_remove`), each with its own placeholder. Restoring
this line would re-specify a superseded form. Closes gate-6 absence `27:1949`.

### Intended form behavior

- Forms submit to **`/api/lead`** (singular), implemented at `functions/api/lead.ts`.
- The request sends JSON.
- The current page path and available UTM source/campaign values are captured.
- Successful submission resets the form and displays a confirmation.
- Failed submission displays a visible error and instructs the customer to call or text.
- Form submission does not represent a booking, approval, or service agreement.
- All forms remain single-column to reduce mobile friction.

**Endpoint corrected 2026-08-19.** This list previously read `/api/leads`, plural. That route
has never existed in this repository. Flagged in `docs/27-SECTION-9-15-CONNECTIVE-COPY.md`
§9.15.5 and fenced in `PORT-PROMPT.md` §4; corrected here at the source. See `AGENTS.md` §0.1.

### ~~Current critical blocker~~ — struck 2026-08-19, the blocker does not exist

> ~~The current website source does **not** contain an implemented `/api/leads` route. The forms render correctly, but a live submission cannot complete successfully until a lead endpoint and delivery destination are added.~~
>
> ~~This must be treated as a release blocker before paid traffic or broad promotion.~~

**Struck because it is factually false and dangerous to act on.** `functions/api/lead.ts` is
implemented, wired to HubSpot + Resend + Turnstile, and verified end-to-end. An agent reading
this section as live would have concluded the endpoint was missing and built one — and the
standing rule in `AGENTS.md` §0.1 exists precisely because a previous version of that
instruction would have deleted the only working lead endpoint in the repository.

The implementation checklist this section demanded is satisfied, not outstanding:

| Requirement | Where it is met |
| --- | --- |
| Where leads are stored | HubSpot CRM via `functions/api/lead.ts` |
| Who receives the notification | Resend email to the owner; SMS gated behind 10DLC approval |
| Environment variables / bindings | `.dev.vars.example`, `.env.example`, `wrangler.toml [vars]` |
| Spam and rate-limit controls | Cloudflare Turnstile + hidden honeypot field |
| Server-side validation | `functions/_lib/lead.ts` |
| Error logging | Endpoint returns structured failure; see register item P3 |
| Privacy-policy disclosure | Consent line links `/privacy/` on both forms |
| End-to-end success testing | `npm run qa:phase3:endpoint`; PORT-PROMPT gate 9 |

### Required operational test

Before broad promotion, submit one test lead from:

1. Homepage compact form
2. Contact page full form
3. One individual service page

Verify the destination, notification, stored fields, source data, and customer-facing confirmation.

---

## 19. SEO system

### Homepage metadata

**Title**  
Property Cleanout & Deep Cleaning | San Jose | Aseptaclean

**Description**  
Whole-property cleanout and deep cleaning in San Jose & the South Bay. Written scope before work, nothing removed without approval, documented closeout.

> **Reconciled to the build 2026-08-19 (register item P5). Code is truth.**
>
> Title was: ~~*Aseptaclean | Deep Cleaning & Property Cleanup San Jose*~~
> Description was: ~~*Detailed deep cleaning, move-out cleaning, post-construction cleaning and
> difficult-property cleanup in San Jose and the South Bay.*~~
>
> Both were replaced by the 2026-08-17 SEO/meta pass, which this section was never updated to
> record. The shipped title leads with the primary term instead of the brand and keeps the
> brand last, which is the pattern the rest of the site follows. The shipped description
> carries the three scope commitments rather than a service list. Read out of
> `dist/index.html`. Closes gate-6 absence `27:1992`.
>
> **The description was also stale and is corrected here** — P5 named only the title. Anyone
> checking P5 against the build would have found a second divergence in the same block.

### Technical SEO requirements

- One canonical URL per page
- Unique title and meta description per indexable page
- One descriptive H1 per page
- Descriptive H2 and H3 structure
- Internal links between hubs and related services
- XML sitemap containing only approved indexable routes
- Robots file referencing the sitemap
- `noindex, follow` on gated specialty pages
- No deferred city pages in the sitemap
- No duplicate root-level city routes
- No fake review or aggregate-rating schema
- No unsupported certification schema

### Structured data

Use `LocalBusiness` with:

- Name: Aseptaclean
- URL: https://aseptaclean.com
- Telephone: +1-408-785-7588
- Description: Deep cleaning and property cleanup in San Jose and across the South Bay.
- Area served: San Jose, Mountain View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos, Palo Alto, and Atherton

### Primary search targets

| Route | Primary target |
| --- | --- |
| `/deep-cleaning` | deep cleaning service |
| `/move-in-move-out-cleaning` | move-out and apartment cleaning |
| `/post-construction-cleaning` | post-construction cleaning |
| `/window-cleaning` | window cleaning |
| `/extreme-condition-cleaning` | extreme cleaning service |
| `/property-cleanouts` | property cleanout service |
| `/hoarding-cleanup` | hoarding cleanup |
| `/estate-cleanouts` | estate cleanout service |
| `/debris-removal` | debris removal service |
| `/eviction-cleanouts` | eviction cleanout service |
| `/janitorial-services` | janitorial cleaning |
| `/animal-waste-cleanup` | animal waste cleanup after release |
| `/rodent-dropping-cleanup` | rodent dropping cleanup after release |
| `/pigeon-dropping-cleanup` | pigeon dropping cleanup after release |

### Internal linking rules

- Every service hub links to every child service.
- Every service page links back to relevant sibling services.
- Property clearing pages link to detailed cleaning where cleaning may follow clearing.
- Post-construction links to window cleaning and debris removal.
- Service-area hub links to the Contact page.
- Future case studies link to their actual service and city pages.
- Future city pages link to locally relevant service pages and verified projects.

### SEO content rule

Do not create pages just to increase page count. A page must satisfy a distinct search intent, provide unique useful information, and match an actually offered service.

---

## 20. City-page release specification

Individual city pages are deferred until they are strong enough to rank and accurate enough to trust.

### Required city-page inputs

- Verified city-specific business licensing or registration facts
- Verified hauling, container, and disposal requirements relevant to the service
- Real completed job or other verifiable local proof
- At least 400 words of unique local content
- Accurate neighborhood, building-access, parking, loading, or property-type context
- Unique title, meta description, H1, lead, FAQ, and internal links
- At least five sentences that become false if the city name is swapped
- No claims based solely on geography

### City-page structure

1. City-specific H1 and lead
2. Locally relevant property types
3. Services actually available in that city
4. Access, parking, building, deadline, or disposal considerations
5. Real project evidence
6. City-specific FAQ
7. Related nearby cities
8. Assessment CTA

### Release order

1. San Jose
2. Mountain View
3. Sunnyvale
4. Santa Clara
5. Campbell

Publish one complete city page at a time. Do not launch five duplicated pages together.

---

## 21. Specialty-page compliance release

### Gated routes

- `/animal-waste-cleanup`
- `/rodent-dropping-cleanup`
- `/pigeon-dropping-cleanup`

### Current status

- Pages are built and available for internal review.
- Pages use `noindex, follow`.
- Pages are excluded from the XML sitemap.
- The Specialty Cleaning hub may describe them as condition-reviewed services, but final acceptance remains subject to scope verification.

### Release inputs

- Written insurance confirmation for the specific service and terminology
- Confirmation of applicable pest-control or cleanup licensing boundaries
- Confirmed waste-handling and disposal procedure
- Confirmed equipment, PPE, work-zone, and access limitations
- Final claims review
- Confirmation that public language matches actual training and field capacity

### Prohibited public claims without separate authority

- Disinfection guarantee
- Sterilization
- Decontamination certification
- Disease elimination
- Environmental clearance
- Remediation completion
- Safe-to-occupy determination
- Human biohazard service
- Pest extermination
- Bird exclusion
- Insulation removal
- Structural repair

---

## 22. Projects and proof system

### Project evidence to capture

- Customer and decision-maker permission
- Property type and city
- Initial condition
- Wide before views
- Detailed before views
- Approved scope
- Important exclusions
- Work stages
- Progress photographs
- Final handoff views
- Documented exceptions
- Customer review request

### Minimum case-study structure

1. Property and situation
2. Customer's deadline or handoff objective
3. Condition observed
4. Scope approved
5. What was excluded
6. Work completed
7. Closeout evidence
8. Customer result, stated without exaggeration
9. Service-page link
10. City-page link after the city page qualifies

### Photography rules

- Use Aseptaclean-owned images only.
- Obtain written permission before public use.
- Do not display personal documents, faces, addresses, license plates, medications, financial information, or other private details.
- Match before-and-after framing when practical.
- Do not alter images in a way that misrepresents the condition or result.
- Do not use generic stock cleaning photos as proof.

---

## 23. Footer

### Brand copy

Aseptaclean  
Detailed cleaning, specialty cleanup and property clearing across Santa Clara County.

### Service groups

- Detailed Cleaning
- Specialty Cleaning
- Property Clearing
- Commercial

### Company

- Process
- Projects
- About
- FAQ

### Contact

- 408-785-7588
- Service Areas
- Request an Assessment

### Legal line

> ~~Aseptaclean performs services only within its current lawful and insured scope. Structural work, pest treatment, regulated materials and other specialist conditions are excluded or referred when required.~~

**Struck 2026-08-19 — owner ruling, claims-sensitive. Second of two occurrences; see §3 "Footer
scope statement" above for the full reasoning.** The shipped wording (`src/data/site.ts` →
`legal.scopeDisclaimer`) wins because it uses doc 21 §2's credentials-not-held construction,
which doc 21 governs and which outranks this document. Do not restore.

Copyright:

> © 2026 Aseptaclean, LLC

---

## 24. Accessibility and usability requirements

- Maintain visible keyboard focus.
- Use semantic headings in logical order.
- Use descriptive link labels.
- Give navigation a visible accessible label.
- Use native `details` and `summary` for dropdowns and FAQs where practical.
- Maintain color contrast for body copy, labels, buttons, and links.
- Do not communicate status by color alone.
- Label required form fields.
- Keep tap targets large enough for mobile use.
- Keep the phone number clickable.
- Keep the mobile call and text bar visible on small screens.
- Avoid auto-playing animation or video.
- Do not rely on hover for essential information.

---

## 25. Technical architecture

### Platform

- Next.js-style App Router implementation
- Vinext/Vite build system for Sites hosting
- TypeScript React components
- CSS-based design system
- Server endpoint for lead submission

### Core application files

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Global metadata, fonts, structured data, global styles |
| `app/page.tsx` | Approved editorial homepage |
| `app/site-components.tsx` | Header, navigation, contact section, footer, mobile actions |
| `app/lead-form.tsx` | Compact and full assessment forms |
| `app/site-content.ts` | Service content, SEO metadata, hubs, route lists |
| `app/seo-components.tsx` | Shared service, hub, area, and information page layouts |
| `app/globals.css` | Legacy shared styles and base form/site rules |
| `app/restoration-home.css` | Current editorial homepage and page-system styles |
| `app/sitemap.ts` | XML sitemap from approved indexable routes |
| `app/robots.ts` | Crawler rules and sitemap reference |
| `/api/leads` | Required lead endpoint; not yet implemented in the current source |

### Content architecture rule

Service copy lives in a centralized content model. Individual service route files should remain thin wrappers that select the correct service record and export its metadata. This keeps layout consistent while preserving unique copy.

### Page-level metadata rule

Every page must provide:

- Title
- Description
- Canonical route
- Open Graph title and description when appropriate
- Robots directive when gated

### Deployment state

- The production build passes.
- The current Sites deployment succeeded.
- The current review URL is owner-controlled.
- The rendered forms are not operational because the lead endpoint is missing.
- The final public domain should be connected only after business facts, form delivery, and launch gates are confirmed.

---

## 26. Analytics and conversion measurement

### Minimum events

- `phone_click`
- `text_click`
- `assessment_start`
- `assessment_submit`
- `assessment_success`
- `assessment_error`
- `service_page_view`
- `service_area_view`

### Required attribution fields

- Landing page
- Submission page
- UTM source
- UTM medium
- UTM campaign
- Referrer when available
- Service selected
- Property city
- Deadline

### Conversion questions to answer

- Which pages generate assessment requests?
- Which services produce qualified calls?
- Which sources produce high-value projects rather than cheap price shoppers?
- How often do prospects start but not submit the form?
- Which pages create calls instead of form submissions?
- Which service pages lead to booked walkthroughs?

Do not optimize for traffic volume alone. Optimize for qualified assessment requests and profitable booked work.

---

## 27. Quality-assurance checklist

### Content

- [ ] Business name is correct everywhere.
- [ ] Phone number is correct everywhere.
- [ ] Founder credentials are accurate.
- [ ] Insurance statement is accurate.
- [ ] No unsupported license, certification, or authority claims appear.
- [ ] No public price tables appear.
- [ ] No fake projects, reviews, or statistics appear.
- [ ] Every page has a distinct H1.
- [ ] Every service page has unique copy.
- [ ] Every exclusion matches actual operating scope.

### Navigation

- [ ] Every header link resolves.
- [ ] Every mobile menu group opens.
- [ ] Every hub links to its child pages.
- [ ] Every related-service card resolves.
- [ ] Service-area anchors land on the correct city.
- [ ] Footer links resolve.

### Forms

- [ ] Homepage compact form submits.
- [ ] Full Contact form submits.
- [ ] Service default value is captured.
- [ ] Required fields block incomplete submission.
- [ ] Consent is required.
- [ ] Success message appears.
- [ ] Error state provides phone/text fallback.
- [ ] Lead notification reaches the correct destination.
- [ ] Source and campaign values are stored.

### SEO

- [ ] Canonicals use the final public domain.
- [ ] Sitemap contains only indexable pages.
- [ ] Gated specialty pages remain noindex.
- [ ] Deferred city routes are absent from the sitemap.
- [ ] Robots file references the sitemap.
- [ ] Structured data contains accurate business facts.
- [ ] No review schema exists without real reviews.

### Visual and responsive

- [ ] Homepage first viewport works on desktop.
- [ ] Homepage first viewport works on mobile.
- [ ] No headline clips or creates orphan words.
- [ ] Navigation does not overflow.
- [ ] Cards collapse cleanly.
- [ ] Handoff Record remains readable on mobile.
- [ ] Forms remain one column.
- [ ] Buttons and phone links remain easy to tap.
- [ ] Footer remains readable.
- [ ] No broken images exist.

### Performance

- [ ] Fonts load without blocking failures.
- [ ] No unused stock-image assets are requested.
- [ ] No critical console errors appear.
- [ ] Build completes successfully.
- [ ] Main pages respond successfully.

---

## 28. Launch checklist

### Must complete before sending meaningful paid traffic

1. Implement the missing `/api/leads` endpoint and lead-delivery destination.
2. Test all lead forms end to end.
3. Confirm final domain and connect it.
4. Confirm lead response ownership and response-time standard.
5. Confirm service-area accuracy.
6. Confirm insurance statement.
7. Confirm specialty-page compliance status.
8. Add privacy policy and terms appropriate to the final lead-capture implementation.
9. Install conversion analytics.
10. Verify Google Business Profile information matches the site.
11. Create a simple lead follow-up workflow.

### Lead response standard

- Respond within one business day at maximum.
- For urgent, qualified requests, respond as quickly as operationally possible.
- Do not quote a complicated property blindly.
- Ask for the city, size, condition, access, deadline, and clear photos.
- Book a walkthrough when photographs cannot establish the scope.
- Send written scope, assumptions, exclusions, and price before scheduling.

---

## 29. Post-launch growth sequence

### Phase 1 — Conversion reliability

- Verify calls and forms.
- Track qualified leads.
- Improve CTA placement only from actual behavior.
- Remove friction from the assessment process.

### Phase 2 — Proof

- Complete profitable projects.
- Capture systematic before, progress, and after photos.
- Secure written permission.
- Request reviews.
- Publish the first real case study.

### Phase 3 — Local authority

- Build San Jose page from verified local facts and real proof.
- Build Mountain View page next.
- Continue city by city only when each page qualifies.
- Connect each city page to real case studies and the relevant service pages.

### Phase 4 — Specialty release

- Clear insurance and regulatory gates.
- Finalize procedures.
- Review claims.
- Remove noindex from qualified specialty pages.
- Add them to the sitemap.

### Phase 5 — Commercial pipeline

- Add one commercial scope example.
- Add a facilities assessment form if recurring demand develops.
- Create a written inspection checklist for recurring janitorial work.
- Add recurring-service proof only after real accounts exist.

---

## 30. What should not be done next

- Do not redesign the site again before collecting conversion and proof data.
- Do not add stock photographs just to fill space.
- Do not add a testimonial section without real testimonials.
- Do not publish five thin city pages at once.
- Do not broaden into regulated claims merely because the page is already built.
- Do not add a cheap package table to increase form volume.
- Do not present founder experience as a license or certification.
- Do not describe project documentation as clearance.
- Do not run broad paid traffic before form delivery and tracking are verified.
- Do not confuse more pages with more authority.

---

## 31. Strategic recommendation

The site is visually and structurally strong enough to support sales, but it is not ready for paid traffic until lead submission works. After that blocker is fixed, the limiting factors become proof and distribution—not another redesign.

The next highest-leverage actions are:

1. Build and verify the lead path.
2. Get the site onto the final domain.
3. Drive qualified people to the relevant service pages.
4. Close work using the assessment and written-scope process.
5. Capture real project evidence.
6. Turn that evidence into case studies, reviews, and city authority.

The website should now evolve from real customer objections, actual booked jobs, and verified proof—not another round of speculative design changes.

---

## 32. Ownership and change control

Any future site change should answer four questions:

1. What customer or operating problem does this solve?
2. What evidence supports the change?
3. Does it strengthen or weaken premium positioning?
4. Does it create a legal, compliance, insurance, or credibility risk?

Update this master document when:

- A route is added or removed.
- A service changes scope.
- A compliance gate is cleared.
- A city page launches.
- A case study is approved.
- Pricing strategy changes.
- The lead form or destination changes.
- The final domain changes.
- A material visual-system decision changes.

This document should remain the single operating reference for the whole website build.
