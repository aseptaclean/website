# Current owner decisions — 2026-09-04

1. Main copy is aseptaclean-all-website-copy.md; trauma uses its dedicated supplemental source.
2. Visual direction is 70% ClearPath / 30% 911 Bio Clean, as shown in the supplied PDF.
3. Scope is twelve pages, enumerated in SITEMAP-MASTER.md.
4. Call Aseptaclean replaces assessment as the primary marketing CTA. Forms remain.
5. User names the severe-condition service Extreme Cleaning; map the existing source label and retain its route.

Implementation choices made explicit in this package: preserve the main copy bytes; apply display transformations; group source content into page briefs; use five process steps when the source has five; keep the existing assessment URL as a secondary utility; preserve provider-managed legal documents; use the supplied phone pending comparison with actual repository data.

Homepage editorial consolidation is listed in 20-COPY-MAP.md. It changes placement, not the original text. It is not represented as a separately reviewed visual mockup.

Historical specifications, source snapshots, and long decisions logs remain unchanged under archive/2026-09-04-before-consolidation/. They are evidence only. Future decisions must update the affected active file in the same change, not exist solely in this log.

---

## Implementation record — 2026-09-04, twelve-page build

The consolidated documentation package described in this file was **not installed** when
implementation began: the repository still carried the pre-consolidation docs (Sevenson-led
master, 45/30/25 design system, doc 27, the long decisions log), and `docs/30-WEBSITE-MASTER-SPEC.md`
did not contain the "Home and the five service pages share one responsive HeroWithForm component"
sentence. The package was located, verified byte-identical on both copy sources and the reference
PDF, and installed. Originals are preserved under `archive/2026-09-04-before-consolidation/`.

### Conflicts resolved

| Conflict | Resolution |
|---|---|
| Master spec permitted the hero form on `/` only; consolidated §3 shares HeroWithForm across home + five service pages | Consolidated package wins (rank 2 owner decision). One shared component now serves all six. |
| `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §5 said "nothing publishes ahead of TSWMP registration" | Registration is active (TSW #933). §5.1's condition is **satisfied, not waived**; §5.2's discovery trigger and referral duty stand. Reconciliation note added in doc 21 itself. |
| `AGENTS.md` §7 bans `biohazard` as a service claim; the trauma source uses "Regulated biohazard waste" | Scoped exception recorded in §7: that factual waste-pathway wording publishes on the trauma route only, under the active registration. `remediation`/`decontamination` stay banned everywhere. |
| Secondary CTA was `Request an Assessment`; integration contract sets `Send a Message` | Contract wins. `/request-assessment/` stays a working, indexable utility route; it is no longer the primary CTA or a nav item. |
| Assessment situation labels vs. CRM enum | Visible labels and order follow the integration contract; `value` strings are frozen and byte-identical to what HubSpot and the notification email already expect. |

### Unresolved factual dependency — carried forward

`/rodent-dropping-cleanup-san-jose/` is fully built and linked but ships `noindex, follow`. The
gate is the specialty-page compliance release: written insurance confirmation for the service and
terminology; pest-control/cleanup licensing boundaries; waste-handling and disposal procedure;
equipment, PPE, work-zone and access limits; final claims review; and confirmation that public
language matches actual training and field capacity. **None is recorded as cleared**, and the
2026-08-16 owner decision chose the gated path over the ungated column. A design task cannot clear
an operational fact. Recorded in `src/data/launchArchitecture.ts` as `launchIndexableExceptions`
with the clearing procedure. This is an indexation hold only — it is not a statement that the
service is unavailable (`AGENTS.md` §2.1 keeps those three questions separate).

### Missing asset — blocks visual completion of one slot

**Real founder portrait of Matthew Ruiz.** Owner-shot, portrait or 5:4, for `/about/` (primary)
and `/` (secondary). No such file exists in the repository; the only founder-named files are
viewport screenshots under `artifacts/`. Both founder sections now render as a single readable
column rather than holding open an empty rectangle. Stock and AI portraits remain forbidden.

### Stale checks updated (none disabled)

- `scripts/phase3-endpoint-check.mjs` — fixture was missing `property_detail`, required since the
  2026-09-03 lean-form rebuild; the required-field case asserted on `property_city`, which that
  same rebuild made optional. Both fixed, and the negative case now covers all three required
  fields. Delivery assertions realigned from the retired long-questionnaire fields to the fields
  the lean form actually posts.
- `scripts/launch-architecture-check.mjs` — hand-synced route list had drifted; now parses
  `src/data/launchArchitecture.ts`, and reports documented indexation exceptions as a NOTE.
- `scripts/copy-fidelity-audit.mjs` — rewritten against `20-COPY-MAP.md` and the twelve briefs:
  placement, display transformations, and the explicit homepage omissions.
- `scripts/gate6-copy-trace.mjs` — read the archived doc 27 and crashed; now runs the current
  copy-fidelity check, which asks the same question against current sources.
- `scripts/locked-copy-browser-check.mjs` — asserted the retired navigation and the retired
  long-form field set; expectations updated to the documented contract.

### Client/server contract defect found and fixed

`QuickHandoffForm.astro`'s `property_detail` textarea had no `required` attribute while the
server has required it since 2026-09-03, so its remaining callers (`RequestForm.astro`,
`CityHero.astro`) could submit empty and take a 422 with no client-side guard. Client aligned to
the server; the endpoint contract is unchanged.

---

## 2026-09-04 — About deduplication, and the v1.1 descriptor blocked on claims grounds

### Conflict: the version 1.1 shared brand descriptor

**A.** Profile **AC-CP70-91130-1.1** § "Approved descriptor update in version 1.1",
`docs/reference/INSTALL.md`, and `docs/reference/descriptor-update.patch` — "Use **Biohazard
Remediation & Specialty Property Cleanup** in place of the standalone 'Specialty Property
Cleanup' descriptor. This is an explicit owner-authorized display transformation." Applies to the
homepage hero eyebrow, the services hub H1, and the shared brand descriptor. *(Rank 6 —
specialized visual/quality document.)*

**B.** `AGENTS.md` §7 — "No `remediation`, `biohazard`, `decontamination`, `sanitization`,
`sterilization` as a service claim… **One scoped exception, 2026-09-04:** on
`/crime-scene-trauma-cleanup-san-jose/` only… `remediation`, `decontamination` and contractor
language stay forbidden **everywhere, including that page**." With
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.1, §2.2, and §5 — TSW #933 "authorizes **one registered
scope**, not `remediation`, `decontamination`, contractor work, or an **unlimited biohazard
service family**." *(Rank 3, resting on rank 1 licensing/scope facts.)*

**C. Owner decision, 2026-09-04 — the escalation was answered.** The conflict above was put to
the owner in full: all three objections quoted verbatim, the fact that `remediation` has no
exception anywhere, that doc 21 §5 names an "unlimited biohazard service family" as precisely
what TSW #933 does not authorize, and that the footer of the same page reads "not a … remediation
contractor." Presented with that, **the owner directed that the descriptor publish as specified.**
*(Rank 2 — explicit current owner decision.)*

**Resolution: C governs, and the descriptor IS published.** Ranks decide this. A rank-2 explicit
owner decision outranks doc 21 at rank 3, so the descriptor now carries the authority the rank-6
profile could not supply on its own. This reverses the earlier ruling in this same entry, which
was correct on the evidence available before the escalation was answered.

**Published in exactly three display roles:** the homepage hero eyebrow
(`src/data/publicCopy.ts` `home.hero.eyebrow`), the Services hub H1
(`src/pages/services/index.astro`), and the shared brand descriptor. The homepage main H1, the
About H1, and all five service-page H1s are preserved and were verified in the built output.

**Scope of the override — narrow, and it does not generalize.** `AGENTS.md` §7 and doc 21 §2.2
still ban `remediation`, `biohazard`, `decontamination`, `sanitization` and `sterilization` as
service claims in every other string. The trauma-route exception is unchanged. No new service,
credential, capability or price is claimed. A future agent may not cite this entry to relax any
other prohibition.

**Risk recorded, not dissolved.** The override does not make the underlying concern false. Cal.
B&P §8550(a) treats advertising a regulated service as its own exposure, and `legal.scopeDisclaimer`
still renders "not a … remediation contractor" in the footer of the same pages. The owner accepted
that tension knowingly. If registration or insurance scope is ever reviewed, this string is the
first to re-check.

**Type:** rank-2 owner decision → higher-ranked authority applied; the losing documents were
amended so no two live statements contradict each other.

**Changed:** `docs/20-COPY-MAP.md` (both rows carry the descriptor; the BLOCKED section is
replaced by an OWNER OVERRIDE section stating the scope and the residual risk),
`docs/page-briefs/HOME.md` and `docs/page-briefs/SERVICES.md`, `AGENTS.md` §7 and
`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.2 (each carries the scoped exception so neither reads
as an unqualified ban that contradicts the shipped page), and the code sites
`src/data/publicCopy.ts` and `src/pages/services/index.astro`, whose comments now record the
override rather than the block.

**Not changed:** the profile, `INSTALL.md` and `descriptor-update.patch` keep their bytes.
`docs/aseptaclean-all-website-copy.md` is untouched. SEO `<title>` strings ("Specialty Property
Cleanup in San Jose | Aseptaclean") were never in the patch's scope and are unchanged — the
profile's audit target is the display label and it forbids blanket replacement.
`src/components/Hero.astro` and `src/data/servicePages.ts` keep the previous wording: neither is
reachable from any page or layout, so changing them would alter no rendered string.

**Escalated, not resolved here.** Per `.claude/skills/claims-check`, a regulated-service boundary
requires external confirmation and must not be settled by editing copy. This needs an explicit
owner decision plus confirmation that the wording sits inside the active registration and the
current COI. Do not re-apply the patch rows without it.

### About page — repetition removed

`/about/` stated the founder's background three times in one section, and rendered two sections
whose content the page had already said. Removed, with the source documents untouched:

1. Hero `assurances` ("Owner-operated", "Serving the South Bay & Peninsula") — rendered verbatim
   ~30px above `AcTrustStrip`, which renders the same two strings plus the response time. The
   trust strip is the shared sitewide band and kept the facts.
2. `home.why.body[0]` ("Our founder's background includes biochemistry, pharmaceutical
   manufacturing, and surgical pathology.") — the homepage's generic restatement of
   `aboutPage.founderBody`, which is more specific and names Matthew. Still renders on `/`.
3. `homepage.founderCredentials` check list — the same four facts a third time. Still renders
   on `/`.
4. The "Real trust starts with clear expectations." dark band — no fact the page had not already
   stated, and its closing line was verbatim the heading of the next section. `20-COPY-MAP.md`
   already parks this block; its source text is intact in `aseptaclean-all-website-copy.md`.
5. An unsourced hero paragraph ("We work on properties where the condition is the problem…")
   that resolved to no named source, contrary to `20-COPY-MAP.md` § Copy trace.

The scope/documentation disclaimers were **kept** and inherited the removed band's dark treatment
and photograph. `legal.*` appearing there and in the footer is the doc 21 §6 placement pattern
used on every service page, not editorial repetition.

Removing 1 and 5 is also what brought the hero inside the profile §7 desktop budget: `/about/`
failed at 1366×768 (+40.61px) and 1280×800 (+2.17px) and now passes all four desktop viewports
plus 390×844. Measured by `scripts/about-fold-check.mjs`; evidence under
`artifacts/css-profile-1.1/about/`.

---

## 2026-09-05 — Hoarding PPC landing page built at `/hoarding-cleanup-san-jose/assessment/`

Implements `docs/page-briefs/PPC-HOARDING-SAN-JOSE.md` (AC-PPC-HOARDING-1.0) on the shared
AC-CP70-91130-1.1 system. Route inventory entry added to `docs/SITEMAP-MASTER.md`
§ "Campaign routes"; index pointer added to `docs/README.md`.

**Route collision checked before creation.** `src/pages/hoarding-cleanup-san-jose/` held only
`index.astro`; nothing built, linked or redirected to the campaign path, and `public/_redirects`
has no rule matching it. The SEO route `/hoarding-cleanup-san-jose/` is untouched — no copy was
moved in either direction. Indexation is `noindex, follow` with structured data suppressed, and
the route is absent from `sitemap.xml`; both follow automatically from its absence in
`launchArchitecture.ts` and are verified in `dist/`, not assumed. `npm run qa:launch` passes.

### Conflicts resolved

| Conflict | Resolution |
|---|---|
| Brief's hero eyebrow reads "SAN JOSE & SANTA CLARA COUNTY" | `AGENTS.md` §3 (rank 2, on a rank-1 verified fact) names one service-area string and explicitly rejects "Santa Clara County" — Atherton is San Mateo — and `02-CURRENT-FACTS.md` forbids widening coverage from a copy document. Renders `Hoarding Cleanup · San Jose · South Bay & Peninsula` from `site.location.serviceArea`, byte-identical to the shipped SEO hoarding eyebrow. |
| Brief's §08 lists TSW #933 as a company credential | `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §5 (rank 3) authorizes that credential on `/crime-scene-trauma-cleanup-san-jose/` "plus its named cross-links (footer, `/services/`)"; `AGENTS.md` §3 repeats it. A PPC landing page is not on that list. **The line does not ship.** Recorded as a launch dependency below. |
| Brief's §02 and §08 list "Insured" | Already conditional in the brief and kept conditional: it renders only when `site.business.insuranceStatus` carries a verified value. `PUBLIC_INSURANCE_STATUS` is empty pending COI verification (`AGENTS.md` §3 suppression rule), so the trust strip ships three items and the credentials block ships empty rather than fake. |
| Brief's scoped CSS sets `font-size: 24px` on `.ac-form__title`, which lands on an `<h2>` | Typography law #1 (`AGENTS.md` §6) permits a heading's size only from a bare `.ac-type-*` role class, and `scripts/type-law-check.mjs` resolves this against computed styles. The recipe's value ships through a new role class, `.ac-type-ppc-form-title`, declared in `PpcLayout.astro`'s `is:global` block so the selector is not rewritten by Astro scoping. No other route emits it. Type-law check: CLEAN on rule 1, and rule 2's 1.9:1 floor holds at 2.000 worst case. |
| Brief's compact desktop query is `>=1200px and <=850px tall`; the §7 matrix includes 900px and 864px | Compact geometry now runs to `<=950px` tall on this route only. Space-only: 20px hero padding, compact H1 clamp, 18px panel padding, 8px gaps, 64px textarea minimum. Every §7 readable floor holds — inputs measured 16px/44px, submit 48px, helpers and consent 14px — and nothing is hidden, clipped, scaled or made to scroll. Reason: this form carries an upload control and the wider media-consent scope the shared hero form does not. |
| Campaign `<title>` duplicated the SEO page's | `npm run qa:seo`'s unique-title guard caught it. The campaign title is now "Hoarding Cleanup in San Jose — Send Property Details \| Aseptaclean". The H1 is unchanged; the brief fixes that string. `qa:seo` passes. |

### Above-the-fold result — one PASS, three measured FAILs, reported not papered over

Measured from `dist/` at scroll zero, 100% zoom, DPR 1, consent-handled state, no bottom
obstruction (`B = 0`). Header stack `T` = 73px (72px row + 1px rule). Evidence:
`artifacts/ppc-hoarding/ppc-fold-audit.json` and `shots/`.

| Viewport | V | Hero bottom | Form bottom | Budget (V−T−16) | Clearance | Overflow |
|---|---|---|---|---|---|---|
| 1440×900 | 900 | 877.48 | 857.48 | 811 | **+22.52** | 0 — PASS |
| 1536×864 | 864 | 877.48 | 857.48 | 775 | −13.48 | **29.48 — FAIL** |
| 1366×768 | 768 | 877.48 | 857.48 | 679 | −109.48 | **125.48 — FAIL** |
| 1280×800 | 800 | 897.78 | 877.78 | 711 | −97.78 | **113.78 — FAIL** |

The profile §7 repair order was worked in full and is exhausted: unintended space removed (the
section-rhythm double padding, the hero photo credit moved to the footer, the empty upload list's
margin, the `<noscript>` row); the cascade confirmed (grid resolves to the brief's own table —
708/52/560 at 1440, 690/52/560 at 1366, 640.2/52/523.8 at 1280); only hero-assigned copy placed
in the hero; helper, consent and anti-spam sizing rechecked.

**Cause, measured per block at 1366×768** (`artifacts/ppc-hoarding/ppc-form-ledger.json`): the
form is 764.48px. Header 53.09 · field grid 410.72 (name/phone 70.39, ZIP/email 70.39,
description + helper 124.06, photos + helper 121.88) · consent 81.19 · Turnstile 73.19 · submit
48 · microcopy 20.3 · 5 gaps 40 · padding 36. Against the profile's own 640px content budget at
that viewport, the irreducible remainder is roughly 125px, and it is attributable to two blocks
the shared hero form does not carry: **the optional Photos control with its required limits
notice (~130px)** and **the media-scope consent appendix (~40px beyond contact consent alone)**.
Every other block is at its documented floor.

Nothing was clipped, hidden, scaled or made to scroll to improve these numbers, and no
`100vh` or fixed height exists on the hero. Below-fold content remains fully accessible.

**Smallest explicit revision, for owner decision — not applied.** Move the optional Photos
control from the hero panel to a visible, keyboard-reachable disclosure immediately beneath the
submit button, still inside the same single form. That removes ~130px and brings 1536×864,
1366×768 and 1280×800 inside budget. It is not applied unilaterally because the brief places
Photos in the hero form and profile §7 forbids buying fit by removing approved content. The
alternatives are a recorded per-viewport exception for this campaign route, or shortening the
approved upload-limits string — both also owner calls.

### Claims review

`.claude/skills/claims-check` run over every rendered string. No violation. The banned
vocabulary appears only inside `legal.scopeDisclaimer`, `legal.documentationDisclaimer` and
`legal.founderAuthorityLimit`, all as negations, all verbatim from `src/data/site.ts`. No price
figure, no rating, review, job count, badge, guarantee, availability or response-time claim, no
placeholder. §2.4's founder authority limit ships verbatim.

Two items recorded rather than changed:

1. **§2.3's animal/organic clause is not on this page.** Section 05 names "Rodent droppings or
   animal waste" in a condition-recognition list. The shipped `/hoarding-cleanup-san-jose/` and
   `/extreme-cleaning-san-jose/` pages name the same conditions the same way and also carry no
   §2.3 clause, so this page matches audited precedent. If the owner wants the clause on
   condition-recognition lists, it must be applied to all three pages together, not to the
   campaign page alone.
2. **The $195 assessment fee is on no page in the current build**, including
   `/request-assessment/`, while `AGENTS.md` §4 says it "stays published". Pre-existing and
   sitewide; not introduced by this route and not fixed from here, because it means changing
   approved copy on six other pages.

### Asset dependencies

- **Real founder portrait of Matthew Ruiz.** Still absent (`2026-09-04` entry above). Section 08
  renders as a single readable column with `data-needs-asset` recorded, not as an empty
  rectangle. Stock and generated people remain forbidden.
- **TSW #933 display scope.** An owner decision extending the credential beyond the trauma route
  and its named cross-links is required before the Company Credentials block can render anything.
- Photography reuses four approved production assets already shipping on this site. The brief's
  Adobe IDs are a candidate shortlist, not licensed files; no Adobe preview and nothing
  watermarked is used. One footer disclosure covers all four.

---

## Implementation record — 2026-09-05, owner image package installed

`aseptaclean-website-images-labeled-with-founder.zip` installed: 18 illustrative property
images plus **the real founder portrait**. Full inventory, placements, treatment and alt text:
`docs/06-ASSET-MANIFEST.md` § "Owner image package — installed 2026-09-05".

### What changed

Images only. **No approved copy sentence, heading, CTA label, form field, consent string,
endpoint or route was changed.** `npm run qa:copy` and `npm run qa:gate6` both pass, which is
the check that the locked copy is byte-intact.

- Masters in `src/assets/aseptaclean/`, wired through `astro:assets` — the existing pipeline —
  not `public/`. The package's "let the build pipeline create responsive compressed
  derivatives" is satisfied by the pipeline already in use, and `public/` would have bypassed
  derivative generation, intrinsic dimensions and lazy-loading entirely.
- `src/components/imageWidths.ts` (new) clamps every responsive width ladder to the master's
  intrinsic width. The ladders were written for 1920px-plus assets; the package masters are
  1672px and smaller, so a fixed 1920 rung would have upscaled. Landscape assets already wider
  than every rung are unaffected, so this is a no-op for everything that shipped before.
- `AcSplit` gained a `3/4` portrait ratio and a width-capped `is-portrait` plate. The three
  existing ratios are all landscape and cover-cropping the 3:4 portrait into any of them removes
  the half of the frame holding the face and the embroidered logo. Landscape splits emit exactly
  what they emitted before.

### Two claims decisions, both recorded rather than assumed

1. **The founder portrait carries no illustrative caption or disclosure, deliberately.** Every
   other photograph on this site is captioned "Illustrative reference photograph · not
   Aseptaclean project work". Applying that to a genuine photograph of the owner would be a
   false statement in the opposite direction. The PPC page's page-level blanket disclosure was
   therefore narrowed from "Photographs on this page are illustrative…" to "**Property**
   photographs on this page are illustrative… The portrait is a photograph of Aseptaclean's
   founder." Left unqualified it would have denied the authenticity of the only real asset on
   the page.
2. **The PPC route's four property images were repointed to package files** even though the
   package's placement index does not name that campaign route. It maps the numbered images to
   the twelve public pages only. No new image slot was created: each of the four kept its
   brief-specified subject and only the file behind it improved, under the manifest's standing
   "Reuse current verified assets before sourcing replacements". If the owner wants the campaign
   route frozen on its previous assets, this is the entry to reverse.

### Verified, not assumed

Fresh `dist/` build, then measured: `ac-fold-audit` **32/32 desktop and 8/8 mobile PASS**,
identical to the pre-change baseline (1440×900, 1536×864, 1366×768, 1280×800, 390×844) — hero
geometry did not move, because the hero image is an absolutely-positioned `object-fit: cover`
background and cannot contribute height. `astro check` 0 errors. `qa:copy`, `qa:gate6`,
`qa:launch` pass. Nine affected routes rendered in Chrome at 1440×900 and 390×844: **zero broken
images, zero horizontal overflow**, every emitted derivative measured `<=` its master.

### Not done, and why

- **`alternates/` remains uninstalled.** Review-only per the package; five trauma alternates
  would violate its own no-incident direction for slots 13/14.
- **Sections outside the placement index were left alone**, rather than given a package image
  the guide did not assign to them.
- **Licence evidence for the pre-existing stock/Commons photography is still unrecorded.**
  Pre-existing sitewide gap, unchanged by this install, still blocking a paid campaign.

### Compliance gap found while checking, NOT introduced here, NOT fixed here

**All five launch service routes describe animal or organic conditions and none renders doc 21
§2.3's mandatory verbatim clause** — "Cleaning only — not a decontamination, sterilization, or
health-safety determination." Measured in `dist/`: the clause survives only on
`/animal-waste-cleanup-san-jose/`, `/pigeon-dropping-cleanup-san-jose/`,
`/estate-cleanout-san-jose/`, `/property-cleanouts-san-jose/` and `/specialty-cleaning/`, which
still use the pre-rebuild components.

`git show HEAD:src/pages/rodent-dropping-cleanup-san-jose/index.astro` **does** contain the
clause. It was dropped when that page was rebuilt onto `AcServicePage` + `servicePageCopy.ts` —
uncommitted work already in the tree before this image install, which touched no rendered
sentence. The 2026-09-04 PPC entry above already noted the hoarding and extreme pages lacked it
and treated that as precedent; the measurement now shows it is all five, and that HEAD had it.

Not fixed from here: restoring it changes approved page copy on five routes, which is outside an
image install and is a doc 21 authority decision. **Owner call required.**

---

## 2026-09-06 — The hoarding PPC campaign walkthrough is free (scoped to one route)

**Confirmed owner business decision.** The walkthrough offered through the PPC hoarding campaign
is free. Recorded here because it reverses a standing sitewide rule inside a narrow scope, and a
conflict resolved only in conversation recurs next session resolved the other way.

### Conflict

| Side | Text | Rank |
| --- | --- | --- |
| A | Owner decision 2026-09-06: "the walkthrough offered through the PPC hoarding campaign is FREE" | 2 — explicit current owner decision |
| B | `AGENTS.md` §4: "The **$195 on-site assessment fee stays published** … it is the only figure on the site"; §7: "No `free assessment` or `free consultation` — the on-site assessment is $195" | 2 — earlier owner decision, 2026-08-11 |

**Resolution: A wins, inside its own scope only.** Both sides are rank 2, which normally means
escalate. It is decidable here because the later decision is the same authority speaking again
and it names its own scope: one campaign. A log entry "governs only the scope actually decided",
so this reaches `/hoarding-cleanup-san-jose/assessment/` and nothing else. B remains in force
everywhere else and both documents were amended rather than left contradicting each other.

**Type:** violated rule → rule scoped, code changed to match.

### What "free" is attached to

A **walkthrough**, never an assessment or a consultation. `free assessment` and `free
consultation` remain banned sitewide (`AGENTS.md` §7, `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`
§2.2) and no new string uses either. No price figure was added; the campaign route publishes
none and never rendered `site.offer.assessmentFraming()`.

### Changed

| File | Change |
| --- | --- |
| `src/data/ppcHoarding.ts` | `hero.secondaryLabel` and `form.submitLabel` → "Request a Free Walkthrough"; `form.intro` → "…discuss the situation and arrange a free walkthrough."; FAQ 5 "an onsite assessment" → "a free walkthrough"; `thankYou.body[0]` rewritten; `thankYou.boundary` gained "it does not confirm an appointment" |
| `functions/_lib/providers.ts` | Third branch in `sendCustomerEmail`, selected by entry route via `isHoardingCampaignLead()` |
| `AGENTS.md` | §4 and §7 amended with the scoped exception |
| `docs/page-briefs/ASEPTACLEAN-PPC-HERO-COPY-UPDATE.md` | Revision AC-PPC-HERO-ROOMS-1.1; superseded strings replaced in place |
| `docs/page-briefs/PPC-HOARDING-SAN-JOSE.md` | Same wording merged in place; stale "Send Message" submit-label note corrected |

**The confirmation email is keyed on the entry route, not `offer_type`.** The campaign form posts
the shared `handoff_reset` offer type. Keying the branch on that would have rewritten the
confirmation email for every other form on the site and repriced an assessment the owner did not
reprice. `isHoardingCampaignLead()` matches `entry_route`, `landing_page` or `submitted_from`
against `/hoarding-cleanup-san-jose/assessment/`, and `isResidence` still wins where both match.

### A submission requests contact; it does not confirm an appointment

Offering a free walkthrough raises the risk that a visitor reads a confirmation as a booked
visit, so the boundary is now stated outright rather than inferred from "schedule". The campaign
copy **arranges** a walkthrough; no string on the page, the thank-you route or the email confirms
one. The under-button microcopy ("Sending this form does not schedule or authorize work") is
unchanged.

### Not changed

- **The $195 on-site assessment fee**, `PUBLIC_ASSESSMENT_FEE`, `site.offer.assessmentFee` and
  `site.offer.assessmentFraming()` — untouched, on every other surface and in the masked
  negation clause in `scripts/city-seo-guards.mjs`.
- **`site.offer.formSubmitCta` ("Send Message")** — still labels every other form on the site.
  No shared template string moved; `PpcHeroForm.astro`'s `submitLabel` prop already defaulted to
  the sitewide value and still does.
- **`stickyBar.secondaryLabel` ("Start With Photos")** — a photos-first path, not a pricing
  claim, so it carries no conflict and was left alone.
- **The owner SMS alert** ("New ASSESSMENT REQUEST …") — internal, not customer-facing, and
  outside the surfaces named in the decision.
- **Form integrations and image work** — no endpoint, field name, validation rule, consent
  string, upload limit, redirect contract, HubSpot mapping or image was touched.

---

## 2026-09-06 — Trauma hero stacked geometry (route exception), and image B ruled out

Second pass on the 2026-09-06 image work. The first pass placed images A and C, reported image B
as unplaceable, and reported the trauma hero's mobile crop as an unresolved limit. The owner ruled
on both.

### Ruling 1 — `trauma-affected-carpet-detail.png` (image B): leave unused

The image stays outside the production page, and **no service, claim or exclusions section may be
added in order to accommodate it.** That closes both of the options the first pass had put
forward (add the scope line; add a scope-boundary section). Recorded as *supplied but not
selected for publication*.

Nothing in code changed — the file was already installed and already absent from
`AcServicePage.astro`'s image registry, with zero occurrences in `dist/`. What changed is that
three places which described the absence as *pending* now describe it as *settled*:
`docs/06-ASSET-MANIFEST.md`, the registry comment in `AcServicePage.astro`, and the §04 comment
in `src/data/servicePageCopy.ts`. The service offer was not broadened and no section was invented.

### Ruling 2 — the mobile hero photograph may be sized against the copy region

**The conflict.** `docs/30-WEBSITE-MASTER-SPEC.md` §3 governs one shared `HeroWithForm` across
the homepage and all five service pages, with one media box behind copy and form at every width.
Honouring that on `/crime-scene-trauma-cleanup-san-jose/` produced a 390×1575 media box for a
1672×941 master, which `object-fit: cover` reduced to **13.9% of the source width**, with the form
panel over everything past ~47% of the height. The owner-approved subject — a suited worker
cleaning a stained floor — was simply not on screen; a hood and a respirator were. The first pass
declined to change the shared hero and reported this instead, correctly: §3 is rank-3 authority
and the fix is a geometry decision, not an image swap.

**The resolution.** The owner authorised the geometry change, scoped to this route. Doc 30 gains
§3.1 stating the exception, its measured before/after, and an explicit "do not generalise this to
another hero without its own recorded owner decision."

**What it does.** Below 1200px — the width at which this hero already stacked — the photograph is
sized against the copy region only, and the form follows it in normal flow on the section's own
solid navy. Implemented as `stackedLayout="split-band"` on `AcHeroWithForm`, **opt-in and
defaulted to the previous behaviour**, fed from a new `heroStackedLayout` field on the trauma
record. `acx-hero--split` appears in exactly one built page; the homepage and the other four
service heroes emit the same markup as before apart from one unused custom property.

**Mechanism worth knowing, because it is easy to get wrong.** The media and overlay stay
`position: absolute` but take a definite grid position, so CSS Grid resolves their `inset: 0`
against their grid area instead of the section. The first attempt used the shorthand
`grid-row: 1`, which leaves the end line `auto` — and for an absolutely positioned grid child
`auto` means the grid container's padding edge, so the media still spanned the form and the
measured result was unchanged. `grid-area: 1 / 1 / 2 / 2` is what actually bounds it. The bug was
caught by measuring, not by looking.

### Verified

| Check | Result |
|---|---|
| `scripts/trauma-hero-mobile-check.mjs` (new) | Trauma at 390/768/1024: media bounded to the copy region, form after copy, call action ahead of the form, no horizontal overflow, no `max-height`, no `overflow: hidden` |
| Source retained at 390 / 768 / 1024 | 29.3% / 89.2% / 100% of width; 100% / 100% / 81.8% of height |
| Desktop 1280×800, 1366×768, 1440×900, 1536×864 | `display: block` — the exception is not entered; crop identical to before |
| Rendered text + all 7 `alt` strings, before vs after | **Byte-identical.** Built both ways and diffed |
| Form field inventory, consent, submit | Unchanged at every width |
| `scripts/ppc-fold-audit.mjs` | **7/7 PASS** — desktop 4/4, stacked 3/3, same as before |
| `npm run qa:copy` | PASS — all 21 trauma blocks, all mapped blocks on every route |
| `npm run qa:gate6` | PASS |
| `scripts/type-law-check.mjs` | Rule 1 CLEAN; Rule 2 all 47 routes ≥1.9:1 |
| `npm run build:local` | PASS — 52 pages |

Evidence: `artifacts/trauma-hero-mobile-2026-09-06/` (screenshots + `measurements.json`).

### Reported, not fixed

- **390px still overlays the copy on the photograph**, and the two full-width call actions cross
  the band where the gloved hands are. The action is recognisable — posture, arms, one gloved hand
  with a cloth, the stained floor — but not unobstructed. The owner's fallback (a separate bounded
  image region with the copy off the picture) was **not** taken: it changes the hero's character,
  and the stated bar ("rather than showing only a hood and respirator") is met. Available on
  request. 768px and 1024px have no obstruction.
- **The PPC hero has the same class of crop problem and was left alone.** At 390px
  `/hoarding-cleanup-san-jose/assessment/` keeps **13% of `hoarding-living-room`'s width** for the
  same reason — its media box spans copy and form. That route's hero is `PpcHero`, a different
  component, its fold audit passes 7/7, and the instruction was not to change unrelated page
  heroes. Flagged so it is a known state rather than an oversight.
- **Cross-link card images unchanged**, as instructed. The home card, Services hub row and
  related-service cards still carry `trauma-residential-context`, so a cross-link card and the
  page it opens still do not show the same scene.

### Not changed

- No page copy, heading, alt string, meta title or description, consent line, helper text,
  disclosure or submit label.
- No form field, required state, validation rule, endpoint, redirect or CRM mapping.
- No image placement. PPC recognition (`hoarding-restricted-walkway`), PPC hero
  (`hoarding-living-room`), PPC decisions (`hoarding-garage-contents`), PPC hidden conditions
  (`extreme-cleaning-floor-edges`), the founder portraits, trauma hero (image A) and trauma
  affected-surfaces (image C) all stand exactly as approved.
- No other hero, on any route, at any width.
- Nothing published or deployed. `npm run build:local` only; `dist/` is local output.

---

## 2026-09-06 — PPC mobile hero fix; estate-cleanout legacy hero closed out

Two items from the "Reported, not fixed" / "STILL SHIPPING" backlog above, actioned during
launch-preparation pass.

### PPC stacked hero: media bounded to the copy region

The gap flagged two entries up ("The PPC hero has the same class of crop problem and was left
alone... keeps 13% of `hoarding-living-room`'s width") is fixed in `src/components/ppc/PpcHero.astro`,
using the same bounded-grid mechanism already shipped for the trauma hero (`AcHeroWithForm`'s
`.acx-hero--split`): below 1200px the media and overlay get a definite grid position (row 1 only)
instead of spanning the whole stacked section, so `object-fit: cover` sizes against the copy
column alone and the form drops to row 2 on the section's own solid navy. Desktop (>=1200px) is
untouched — verified `display: block` at 1280/1366/1440/1536, unchanged from before.

Measured via `scripts/trauma-hero-mobile-check.mjs ROUTES=ppc` against a fresh `dist/`: source
width retained at 390px went from 13.9% to 36.1% (68px→68px hoarding row visible, boxes/bins/
storage clearly legible in screenshots), 98% at 768px, 100% at 1024px; media bounded to copy at
all three stacked widths (`mediaBoundedToCopy: true`); form follows copy in DOM and visual order;
zero horizontal overflow; all 22 form fields and consent unchanged. `scripts/ppc-fold-audit.mjs`
re-run clean: desktop 4/4 PASS, stacked 3/3 PASS — unchanged from the pre-fix baseline, confirming
the desktop above-the-fold budget was not touched.

No copy, field, consent, endpoint, or trauma-route change. Cross-link card images (home, Services
hub, related-service cards) untouched, per the standing instruction not to make hero images match
their card thumbnails.

### Estate Cleanout hero: unattributed Commons file repointed

`hero-development-residence-asurnipal.jpg` (Asurnipal, Wikimedia Commons, CC BY-SA 4.0) — flagged
in `docs/06-ASSET-MANIFEST.md` as "STILL SHIPPING — one file, unattributed... a live exposure" —
is repointed to the owner package's `hoarding-garage-contents.png`, the same treatment already
applied to Property Cleanouts (`home-property-scope-detail`) and Move-Out
(`property-interior-introduction`) in the 2026-09-05 image pass. Subject match: this page's
mechanism is the Save List (protect named items before an authorized clearance), and the package
image shows belongings staged for sorting — the same decision the Save List runs before clearing
starts. The Commons file it replaces was actually a hoarding-condition living room (per its own
Wikimedia filename), which this page's design notes say it deliberately does not run.

The replaced file's justification for reuse ("already used as the full-bleed hero on `/`") was
also stale: the 2026-09-05 owner image install had already moved the homepage hero to
`home-hero-neglected-interior`, so by the time of this fix the Commons file was serving no other
role on the site. `hero-development-residence-asurnipal.jpg` is no longer imported by any route;
swept `dist/` for zero references. Sibling-hero distinctness holds: Estate, Property Cleanouts and
Move-Out each open on a different photograph.

No copy, heading, alt text (still `alt=""`, decorative, unchanged), route, canonical, or indexing
change. `npm run build:local` — 52 pages, no errors.

---

## 2026-09-06 — Standalone Request Assessment page retired

**Confirmed owner instruction**, given directly and explicitly: "The standalone Request
Assessment page, expected at `/request-assessment/`, must be unavailable... `noindex` alone is
insufficient... verify the standalone URL returns a proper not-found response." The owner also
explicitly distinguished this from `/hoarding-cleanup-san-jose/assessment/` (the approved PPC
landing page, unaffected) — a distinction prior verification reports had gotten wrong by
conflating the two routes.

### Conflict

A: This session's live owner instruction, 2026-09-06 — "must be unavailable," no redirect, no
noindex-only treatment, "remove it from production page output, navigation and internal links,
CTA destinations, sitemap." (rank 2 — explicit current owner decision)

B: `AGENTS.md` §2.2.6 and §3 — "`/request-assessment/` survives as a working, indexable utility
route... is no longer the default secondary action" (owner decision, 2026-09-04). `docs/SITEMAP-
MASTER.md` "Existing utility and legacy routes" — "Keep `/request-assessment/` working as an
existing form destination." `docs/page-briefs/REQUEST-ASSESSMENT.md` — "Keep
`/request-assessment/`; do not create a replacement route." `src/data/launchArchitecture.ts` —
the path was included in `launchPrimaryPaths` (indexable, in `sitemap.xml`). (rank 2 — explicit
owner decision, 2026-09-04, and the rank-6 documents implementing it)

**Resolution: A wins, scoped to this one route.** Both sides are rank 2. This resolves the same
way the 2026-09-06 free-walkthrough decision earlier in this log did: a later owner decision that
names its own scope outranks an earlier one within that scope, because it is the same authority
speaking again, not a different one. The scope named here is exactly one route.

**Type:** violated rule → rule reversed, code and docs changed to match.

### What changed

| File | Change |
| --- | --- |
| `src/pages/request-assessment.astro` | Deleted. The route now returns Cloudflare Pages' real 404, unconditionally — no redirect, no noindexed stub. |
| `src/data/launchArchitecture.ts` | `/request-assessment/` removed from `launchPrimaryPaths`; comment corrected. `sitemap.xml.ts` reads `launchIndexablePaths`, so the route left the sitemap automatically. |
| `src/data/site.ts` | `offer.assessmentUrl` field removed (its only consumer, `Footer.astro`, now uses `offer.contactFormUrl`). `residenceOffer.assessmentUrl` repointed from `/request-assessment/?offer=private-residence-reset` to `/contact/#contact-form` — see note below. |
| `src/components/Footer.astro` | Sitewide "Send a Message" footer link now points at `contactFormUrl` instead of the retired `assessmentUrl`. This was also a live label/destination mismatch (label already said "Send a Message" while linking to the assessment page) that this fix incidentally corrects. |
| `src/components/ServiceHub.astro`, `AccentBand.astro` (default prop), `CityCloseBand.astro`, `src/pages/faq/index.astro` | CTA hrefs changed from `/request-assessment/` to `#request` — every caller of these components also renders `<RequestForm />` or an equivalent embedded form (`id="request"`) lower on the same page, so the fix is "scroll to the form that is already there," per the embedded-form-first fallback rule. |
| `src/pages/{move-out-cleaning,animal-waste-cleanup,property-cleanouts,estate-cleanout}-san-jose/index.astro` | These four pages carry "NO EMBEDDED FORM" by design and linked out to `/request-assessment/?service=<x>` for a query-preselected intake. Changed to `/contact/#contact-form` per the explicit fallback rule ("if the current page has no form, link to the available Contact page"). The `?service=` preselect mechanism was local to `AssessmentForm.astro` (now unreferenced by any route) and is not reproduced on the Contact form. |
| `src/pages/thank-you.astro` | "Start the assessment" fallback link (shown only when no valid submission is detected) now points at `/contact/#contact-form`. |
| `scripts/launch-architecture-check.mjs` (`npm run qa:launch`) | Added an explicit failing check if `/request-assessment/` is ever rebuilt into `dist/`, so a future edit cannot silently resurrect the route. The existing broken-internal-link scanner in this same script also caught (by construction) any of the twelve launch pages that still pointed at the retired route. |
| `AGENTS.md` §2.2.6, §3 | Amended in place: the "stays a working, indexable utility route" language is struck and replaced with the retirement, cross-referencing this entry. |
| `docs/SITEMAP-MASTER.md` "Existing utility and legacy routes" | Amended: `/request-assessment/` removed from the preserve-list; retirement recorded with a pointer here. |
| `docs/page-briefs/REQUEST-ASSESSMENT.md` | Marked retired/superseded at the top, kept as historical record, explicit "do not build from this" and "do not recreate this route." |

### Not changed, and why

- **`functions/_lib/lead.ts` and `functions/_lib/providers.ts`** — untouched. AGENTS.md §0.1: this
  is the one lead endpoint and it is correct. Their comments describing "the lean
  request-assessment form" name a `form_version`/`offer_type` validation branch
  (`AssessmentForm.astro`'s field contract), not a live route; that branch is now unreachable from
  any UI entry point but is harmless left in place, and touching the endpoint was out of scope and
  against standing instruction.
- **`src/components/AssessmentForm.astro` and `src/data/assessment.ts`** — left in the tree,
  unimported by any route after this change. `assessment.ts` is shared CRM-contract data
  (`situations` enum, upload limits) that other components' comments reference by name; deleting
  it would risk an unrelated regression for a cosmetic dead-code cleanup that was not requested.
  Reported here rather than silently removed.
- **`site.residenceOffer.assessmentUrl` → `/contact/#contact-form` loses the
  `offer=private-residence-reset` context.** `/private-residence-reset/` has no embedded form, so
  the fallback rule applies, but the generic Contact form does not set `offer_type` and cannot
  reproduce the backend's `private_residence_reset` branch. That branch in `functions/_lib/lead.ts`
  is now unreachable from any UI entry point. This is a real fidelity loss (a residence-reset lead
  submitted via Contact will not get that offer's distinct thank-you/confirmation wording); flagged
  as a launch dependency rather than silently accepted. Owner call if reproducing the distinction
  matters: either give `/private-residence-reset/` its own embedded form, or accept the Contact
  fallback as final.
- **Historical, non-gate audit/screenshot scripts** (`scripts/v3-homepage-check.mjs`,
  `port-shots.mjs`, `design-fidelity-capture.mjs`, `full-site-audit.mjs`, `visual-capture.mjs`,
  `hoarding-page-check.mjs`, `ppc-production-pipeline-check.mjs`,
  `contact-quick-form-production-check.mjs`, and the `qa:phase*` / `qa:copy:browser` scripts still
  wired into `package.json`) mention `/request-assessment/` in comments or as a probe target from
  earlier phases of this project. They are not part of the enforced `qa:launch`/`qa:gate6` gate
  and were not individually edited — `qa:launch`'s new check is the actual regression guard. Any
  of these scripts that are re-run manually against a route that no longer exists will report it
  as missing, which is the correct behavior, not a defect to fix.
- **`/hoarding-cleanup-san-jose/assessment/` (the PPC landing page) is untouched.** It is a
  different route, a different brief, and the owner's instruction named it explicitly as the one
  to preserve.

### Verified

Fresh `npm run build:local`, then `npm run qa:launch`: PASS, and grep of the built `dist/` for
`/request-assessment` returns zero matches in any rendered HTML (see verification log for the
full command and output). `astro check` and `npm run qa:copy` / `npm run qa:gate6` also re-run
clean — no approved copy string changed, only link destinations.

---

## 2026-09-06 — Email required on every active form; HubSpot contact matching

**Confirmed owner instruction**, given directly and explicitly: "Add a required Email field
wherever it is missing… The lack of an email field is an implementation gap to fix, not an
acceptable 'N/A.'" Scoped to the homepage, the available service pages, Contact, and the PPC
hoarding landing page, with an explicit instruction to also find and fix any other currently
live form missing the field.

### The gap

Three distinct form implementations exist, not one shared component:

| Implementation | Component | Pages | Email before this fix |
| --- | --- | --- | --- |
| Form A | `src/components/ac/AcCompactForm.astro` | `/`, the 5 canonical service pages, `/contact/` | **Absent** |
| Form B | `src/components/QuickHandoffForm.astro` (via `RequestForm.astro` and `CityHero.astro`) | 10 legacy pages (noindex, still built and live — see the full inventory in the 2026-09-06 handoff) plus the noindex dynamic city pages | **Absent** |
| Form C | `src/components/ppc/PpcHeroForm.astro` | `/hoarding-cleanup-san-jose/assessment/` | Present but **optional** |

Because Form A and Form B never sent `email`, `functions/_lib/providers.ts`'s
`sendCustomerEmail()` skipped unconditionally on those paths — a customer confirmation email was
structurally impossible from the homepage, any service page, Contact, or any Form B page.

### What changed

| File | Change |
| --- | --- |
| `functions/_lib/lead.ts` | `email` added to `commonRequiredFields`, which every submission shape includes — this makes it required on every branch (short/common, lean/detailed, residence) in one place instead of one branch at a time. The residence branch's own explicit `"email"` entry (already required there) was removed as now-redundant. |
| `src/components/ac/AcCompactForm.astro` | Added a required `Email` field (`type="email"`, `autocomplete="email"`) between Phone and ZIP in the two-column grid. Added its client-side error message. Redirect to `/thank-you/` now reports three email states (`sent` / `attention` / `none`) instead of collapsing a delivery failure into `none`. |
| `src/components/QuickHandoffForm.astro` | Same required `Email` field, added between Phone and the (optional) detail field. Same error-message and three-state redirect fix. This is Form B — the fix reaches all 10 live pages that render it through `RequestForm.astro`, plus `CityHero.astro`, from one component edit. |
| `src/components/ppc/PpcHeroForm.astro` | Email's `(optional)` label and its absent `required` attribute are gone; the field is required like every other field on this form. Client-side message updated from "…or leave it blank" to reflect the new requirement. |
| `functions/_lib/providers.ts` | HubSpot contact matching hardened — see below. |
| `docs/03-INTEGRATION-CONTRACT.md` "Desired compact fields" | Not amended in this pass — the field list there predates this owner instruction and is superseded within its own stated boundary ("If the actual schema includes additional required fields, accommodate them rather than silently removing them"), which this change follows precisely. |

### HubSpot contact matching — reviewed per explicit instruction

The owner instruction included: "Review contact matching when email and phone point to different
existing records. Do not overwrite an unrelated contact or merge records solely because a phone
number matches." Before this fix, `syncHubSpot()` already searched by email when one was present
(never by phone in that case) — but it unconditionally wrote the submitted phone onto whichever
contact the email search matched, even if that phone number was already the identifying phone on
a *different* contact record. `syncHubSpot()` now:

1. Searches by email (the identifier, now that every active form collects one) and, separately,
   by phone — purely to detect whether the phone belongs to a different existing contact.
2. Never selects which contact to update based on a phone match alone (unchanged from before,
   now the only live path since email is always present).
3. **New:** skips writing `phone` onto the matched contact when that number is already the
   identifying phone on a different contact, and appends a `Phone conflict: …` line to the
   deal's `description` naming both HubSpot contact IDs, so the owner reconciles manually instead
   of the pipeline silently merging or overwriting either record.
4. The `!email` branch (search/update by phone) is kept only as a defensive fallback for a
   submission that somehow arrives with no email — which no active form can produce after this
   fix — rather than deleted, so such a request still reaches a CRM record instead of being
   dropped.

### Not changed

- No page copy, heading, consent wording, service pricing, or campaign-specific wording (PPC's
  "free walkthrough" framing, submit label, thank-you copy) — all preserved exactly.
- No other required/optional field state, no endpoint, no service enum, no upload logic.
- `src/components/AssessmentForm.astro` and `src/data/assessment.ts` — left exactly as the
  2026-09-06 request-assessment retirement entry above described them: unimported by any live
  route, so out of scope for an "active form" fix.

### Verified

Fresh `npm run build:local` — 51 pages, no errors. `npm run check` — 0 errors, 0 new warnings.
`npm run qa:launch`, `npm run qa:copy`, `npm run qa:gate6` — all PASS, unchanged from before this
change. A Playwright layout check across 5 representative pages (one per distinct implementation
plus Contact) × 5 desktop/mobile breakpoints (390×844, 1280×800, 1366×768, 1440×900, 1536×864)
confirmed the email field renders required, `type="email"`, `autocomplete="email"`, ≥44px control
height, with consent and submit still fully visible and no horizontal overflow at every
combination — 25/25 checks clean. `scripts/launch-e2e-form-check.mjs` extended with a fifth
surface (`request-form`, Form B via `/faq/`) and a `confirmationEmailSent` assertion on every
surface; see the launch verification log for the live production run.

---

## Production incident and fix — 2026-09-06, crime-scene service value rejected

### What was broken

`src/data/assessment.ts` renders six service options in the `property_situation` `<select>`.
`allowedValues.property_situation` in `functions/_lib/lead.ts` listed only five of them.
**`"Crime scene or trauma cleanup"`** was never accepted by the endpoint.

`validateLead()` runs *before* `verifyTurnstile()`, R2 storage, HubSpot and both emails, so every
submission that selected that option returned `422 {"property_situation":"Select a valid
option."}` and the lead was lost outright — no record, no CRM entry, no notification. The visitor
saw a field error on a dropdown they had answered correctly.

Blast radius: the option is selectable on the homepage hero, `/contact/`, and all five
service-page heroes; and it is **preselected** on `/crime-scene-trauma-cleanup-san-jose/`, so that
page's form failed for every visitor who did not change the dropdown.

Reproduced in a headed browser on the live custom domain before the fix: Turnstile issued a valid
token, `POST https://aseptaclean.com/api/lead` returned HTTP 422 with that error body.

### Conflict resolved

| Conflict | Resolution |
|---|---|
| The 2026-09-04 entry above records "Assessment situation labels vs. CRM enum → `value` strings are frozen and byte-identical to what HubSpot and the notification email already expect." `src/data/assessment.ts` carried the same assertion in a comment. | **The assertion was false for one value.** The 2026-09-04 display-label change introduced `"Crime scene or trauma cleanup"` as a genuinely NEW sixth option, not a relabel of an existing one, and did not add it to the endpoint. The form value stays frozen (it is the CRM contract, rank 1 fact); the **endpoint** moved to accept it. The false comment in `assessment.ts` is corrected in the same change. |

### Changed

- `functions/_lib/lead.ts` — `"Crime scene or trauma cleanup"` added to
  `allowedValues.property_situation`. No other validation rule touched.
- `scripts/situation-enum-guard.mjs` — **new.** Runs the real `validateLead()` against the real
  `assessment.situations` list and exits non-zero on any drift. Wired into `npm run build` (so a
  recurrence fails the Cloudflare Pages build instead of deploying) and exposed as
  `npm run qa:situations`.
- `package.json` — `esbuild` promoted from a transitive dependency of `astro` to an explicit
  pinned devDependency (`0.28.1`, the version already resolved), because the build now depends on
  it. Same resolved tree; the lockfile gained one line.
- `src/data/assessment.ts` — comment corrected, and adding an option is now documented as the
  two-file change it actually is.

### Not changed

- No page copy, heading, consent wording, layout, imagery, or campaign wording. The PPC hoarding
  campaign's "free walkthrough" framing, its `Request a Free Walkthrough` submit label, its
  campaign-scoped confirmation email and its "does not confirm an appointment" boundary are all
  untouched and were re-verified live after deploy.
- No form value renamed, no endpoint added or moved, no security control weakened. The origin
  allowlist, honeypot, Turnstile verification and the 5-per-15-minute rate limit are all as they
  were.

### Minimum description length — did not exist

The 2026-09-06 request asked for any minimum word/character count on "Tell us what's going on" and
equivalent fields to be removed. **No such rule existed anywhere** and none was removed: no
`minlength` attribute in any component or in `dist/`, no length or word-count logic in any client
script, and no length check in `validateLead()`. The endpoint requires a non-empty
`property_detail` on the `form_version` branches via `leanRequiredFields` and trims with `clean()`,
so a single character already passed and whitespace-only already returned the required-field
error. Verified on the live endpoint after deploy: 1-character ACCEPTED, short description
ACCEPTED, whitespace-only rejected with `{"property_detail":"This field is required."}`.

### Verified on https://aseptaclean.com after deploy (commit b917370, Pages deployment 9ad7adf1)

- Isolated exhaustive `validateLead()` suite: 46/46 pass (2 failed before the fix, both the
  crime-scene value).
- Live endpoint, all six rendered options: every one accepted (validation passed, stopped at
  Turnstile, no lead created).
- Real browser submissions, all HTTP 201 with correct thank-you navigation, HubSpot deal and both
  emails delivered: `AC-1PXDAZ` (crime-scene service page, preselected value, 1-char description),
  `AC-M64XZD` (homepage, crime-scene selected from the dropdown), `AC-5E8REG` (`/faq/`, Form B
  short-form branch), `AC-6QVAN6` (PPC landing page, photo upload, "We received your walkthrough
  request" campaign email).

### Observations recorded, not acted on

- **Rate limit compounds a validation failure.** The 5-per-15-minute-per-IP limit is counted
  *before* validation, so a visitor who hits a validation error five times is locked out for 15
  minutes. During this incident, a crime-scene visitor retrying could reach that state. The limit
  is a deliberate security control and was left alone.
- **`QuickHandoffForm.astro`'s description field is inconsistent but harmless.** It is labelled
  "(optional)", carries a `required` attribute, and is not server-required (that form sends no
  `form_version`, so `leanRequiredFields` never applies). Because the script sets
  `form.noValidate = true`, the attribute never fires and the field behaves as its label says. The
  comment above it claiming a 422 risk is wrong. Left as-is: the label is approved copy and the
  behaviour is correct.
- **`src/components/AssessmentForm.astro` is dead code.** No page imports it. It contains no
  minimum-length rule either.

---

## Conversion measurement installed — 2026-09-06, GTM container + canonical lead event

Google Tag Manager container `GTM-WSSQ62BN` is installed sitewide and the site now raises one
authoritative lead event. Google Ads has not been launched and was not touched.

### The architecture that was actually found — not what the documents implied

Verified by reading `dist/`, by fetching five live routes from `https://aseptaclean.com`, and by
reading the live Termly bundle for this website UUID. Recorded because three separate assumptions
about it were wrong.

- **There was no Google tag on the production site at all.** Not GA4, not GTM, not gtag.js, not
  Cloudflare Zaraz. `PUBLIC_GA_ID` and `PUBLIC_GTM_ID` are both consumed by
  `src/components/Analytics.astro`, and **neither was ever set** in `wrangler.toml [vars]` or
  `.env.production`, so every conditional in that component rendered nothing. GA4 property
  `G-40K4ETN1NX` appears nowhere in this repository and appears nowhere in the served HTML of `/`,
  `/contact/`, `/hoarding-cleanup-san-jose/`, `/hoarding-cleanup-san-jose/assessment/` or
  `/thank-you/`. Whatever traffic that property is reporting is **not arriving from this site's
  production HTML**, and that is a finding for the owner, not something this change can fix from
  the repository.
- **`dataLayer` had producers and no consumer.** `Analytics.astro`, `PpcHeroForm.astro` and
  `404.astro` all pushed events into an array that nothing ever read, because no container existed
  to read it. This is the actual root cause of "zero key events in GA4": not a mis-mapped tag, but
  no tag.
- **The `[data-assessment-form]` mismatch was real and was worse than reported.** That selector
  matched exactly one component, `AssessmentForm.astro`, which this log already records as dead
  code that no page imports. So the sitewide listener ran on all 47 routes, found nothing, and
  fired neither `assessment_start` nor `assessment_submit` — while the live PPC form at
  `[data-ppc-form]` raised its own separate events. Two scripts, one user action, neither
  authoritative.
- **The Termly manual-block attribute in `Analytics.astro` was wrong.** It used
  `data-type="analytics"`. Termly's blocker selects on `[data-categories]` and has no handling for
  any other attribute name — confirmed by reading the live bundle. Had an ID ever been configured,
  the script would have sat at `type="text/plain"` forever and loaded nothing. This never misfired
  only because the feature was never switched on.

### How Termly actually controls Google tags — measured, not assumed

From the live resource-blocker bundle and from a real browser run against `dist/`:

- Region config is `"consent_mode": "opt_in"` with `"enable_google_consent_mode": false`.
- Termly's auto-blocker classifies `googletagmanager.com` `_default` as **essential**, so an
  ungated container would have loaded *before* consent. The manual `data-categories="analytics"`
  gate is what prevents that. It is not decoration and must not be removed to "make the tag fire".
- Because `enable_google_consent_mode` is false, Termly emits **no** `consent default`. A
  default-denied Consent Mode v2 stub was therefore deliberately **not** added: with nothing
  granting it, GA4 would have been permanently denied. Gating the loader is stricter anyway — on
  refusal the container is never requested and no Google cookie can exist.
- Termly **does** push `gtag('consent', 'update', …)` when consent is saved, so a Consent Mode
  signal reaches the container on the accept path regardless of the dashboard toggle. Observed
  twice per save in a real run.

Measured behaviour, all three states: **no decision yet** → container not requested, script stays
`type="text/plain"`. **Decline** → container never requested, never loads. **Accept** → Termly
rewrites the script, `gtm.js` is fetched, `google_tag_manager["GTM-WSSQ62BN"]` exists, consent
update signals present.

### Changed

- `src/components/AnalyticsHead.astro` — **new.** The only place a Google tag is installed.
  Renders in the shared `<head>` immediately after the Termly blocker. `gtmId` and `gaId` are
  mutually exclusive in code, so a second GA4 base tag cannot be produced by configuration.
- `src/components/AnalyticsNoscript.astro` — **new.** The standard GTM `<noscript>` iframe,
  immediately after the opening `<body>`.
- `src/components/Analytics.astro` — reduced to sitewide behavioural events. Tag loaders removed
  (they moved to the head component). The dead `[data-assessment-form]` listener and its two
  events are **deleted**. `phone_click` gains `page_path` and a derived `link_location`.
- `src/components/ppc/PpcHeroForm.astro` — now the single canonical form-tracking implementation.
  Adds `form_start` (once per page load, on first real interaction), `ppc_form_error` (fixed
  diagnostic categories derived from the status line only), an `inFlight` guard, a `sessionStorage`
  claim keyed on the endpoint's confirmation code, and an awaited `eventCallback` window before the
  thank-you redirect. `ppc_form_success` still fires only on `2xx && ok === true`.
- `src/pages/hoarding-cleanup-san-jose/assessment/thank-you.astro` — explicit once-only lead
  recovery. Requires the confirmation flag **and** a structurally valid code **and** an unclaimed
  key. A bare thank-you view is never a lead.
- `src/layouts/BaseLayout.astro`, `src/layouts/PpcLayout.astro` — the two shared layouts render
  both new components. No page installs a container of its own.
- `wrangler.toml`, `.env.production` — `PUBLIC_GTM_ID = "GTM-WSSQ62BN"`. `PUBLIC_GA_ID` stays
  unset on purpose: GA4 is a tag inside the container, not a second base installation.
- `scripts/analytics-tagging-check.mjs`, `scripts/analytics-events-check.mjs` — **new**, wired as
  `npm run qa:analytics` and `npm run qa:analytics:events`.

### Not changed

No page copy, heading, consent wording, layout, styling, imagery, navigation, service option or
legal text. No route added, removed or reindexed. `functions/api/lead.ts` and `functions/_lib/`
untouched — no endpoint, validation rule, Turnstile check, rate limit, upload path, HubSpot
mapping, email or SMS behaviour was modified. No Google Ads campaign was created or altered.
`/sms-notification-consent/` is byte-preserved under carrier review, does not use `BaseLayout`, and
therefore carries no container — correct, and exempted explicitly in the tagging guard.

### Conflict resolved

| Conflict | Resolution |
|---|---|
| The task specifies a GA4 `form_start` event. GA4 Enhanced Measurement also emits an automatic `form_start`. | Implemented as specified. Neither is a conversion, so the overlap cannot corrupt `generate_lead`. Enhanced Measurement is **not** disabled — AGENTS-level guidance is to preserve it absent a verified technical conflict, and this is an overlap in a supporting event, not a conflict. The site's own event is distinguishable by its `form_id` parameter. |
| A standard GTM install puts an ungated `<noscript>` iframe after `<body>`; the consent rule says advertising and analytics must respect consent state. | The standard snippet ships. `<noscript>` content is parsed only when scripting is off, which is the one condition in which Termly cannot run either, so a `data-categories` attribute there would do nothing. The iframe is inert for measurement — GA4 and Ads tags need JavaScript. Recorded here rather than papered over. |

### Verified

- `npm run build` — 51 pages, clean. `npm run check` — 0 errors.
- `npm run qa:analytics` — 8/8. One container per page across 47 pages, in `<head>`, Termly-gated,
  `<noscript>` immediately after `<body>`, and **no second GA4 base tag anywhere in the build**.
- `npm run qa:analytics:events` — 34/34 in a real browser: the three consent states above;
  `phone_click` once with `page_path` + `link_location`; `form_start` once across four
  interactions and never on page view; a 422 and a network failure each raising `ppc_form_error`
  with **no** `ppc_form_success`; a locally invalid submit raising nothing at all; three rapid
  submits producing one request, one attempt, one success; the thank-you recovery firing once for
  an unrecorded lead and never twice; no name, phone, email, ZIP, description or filename in any
  event; and all five UTMs plus `gclid` surviving from the landing URL into the `/api/lead` body.
- `scripts/ppc-interaction-check.mjs` — 51/51, unchanged. `qa:launch`, `qa:copy`, `qa:gate6`,
  `qa:situations`, `qa:phase3:endpoint`, `type-law-check` all pass.
- No non-environmental console errors on `/`, `/contact/`, `/hoarding-cleanup-san-jose/`, the PPC
  route, its thank-you route, `/services/` or `/404`.
- `npm run qa:seo` reports 42 publish blockers. **Pre-existing** — an identical build of `HEAD`
  before this change reports the same 42. They are the city-route inbound-link gates left by the
  2026-09-03 launch reduction, not a regression, and AGENTS.md §2's "9/9 clean, 0 publish
  blockers" note is stale as of that reduction.

### What is NOT done, and is not claimed to be

The container is installed and the `dataLayer` contract is verified end to end. **No tag, trigger
or variable exists inside the GTM workspace** — that needs the GTM UI, which is not reachable from
this repository. Until that is done, GA4 still receives nothing from this site. The exact required
configuration, the GA4 key-event step, and the Google Ads import steps are in the handoff delivered
with this change. `generate_lead` must be **observed in GA4 before** it is marked a key event or
imported into Google Ads.

---

## 2026-09-09 — Estate campaign landing page, and its layout refresh

Two owner documents arrived the same day and both are implemented:
`docs/aseptaclean-estate-landing-page.md` (copy, offer, form, tracking, readiness table) and
`docs/aseptaclean-layout-refresh.md`, which explicitly **supersedes the first document's layout
and section order** while preserving its service boundaries, conditional offer claims, backend,
consent and tracking requirements.

### Route

`/estate-cleanout-san-jose/assessment/` — new, plus its confirmation route
`/estate-cleanout-san-jose/assessment/thank-you/`. Checked before creation: no equivalent estate
assessment route existed (`/estate-cleanout-san-jose/`, `/estate-cleanout-checklist/`,
`/property-cleanouts-san-jose/` and the three `/service-areas/{city}/estate-cleanout/` pages are
different pages with different jobs), `public/_redirects` has no matching rule, and nothing linked
to it. **`/hoarding-cleanup-san-jose/assessment/` is untouched** — its own copy record, its own
dark hero, its own thank-you route, verified 34/34 and 51/51 on its existing browser checks after
every shared-component change below.

Indexation follows the existing policy and changes nothing sitewide: `noindex` is passed
explicitly **and** the route is absent from `launchIndexablePaths`, which is what `sitemap.xml.ts`
iterates. `npm run qa:launch` still reports exactly 11 indexable routes and no public page linking
into a hidden marketing route.

### Conflicts resolved

| Conflict | Resolution |
|---|---|
| The copy writes the coverage area as "SAN JOSE & SANTA CLARA COUNTY". `AGENTS.md` §3 names the verified region string and explicitly rejects that wording ("Atherton is San Mateo"); `docs/02-CURRENT-FACTS.md` "Geography" forbids changing coverage from a copy document. | Both occurrences render `site.location.serviceArea`. Same resolution `src/data/ppcHoarding.ts` recorded for the same phrase. Rank 1/2 over rank 4. |
| The copy's call CTA is "Call (408) 785-7588". `AGENTS.md` §2.2.2 fixes the primary marketing CTA as "Call Aseptaclean", rendered from `src/data/site.ts` only. | Assembled as "Call Aseptaclean · (408) 785-7588", the shape the hoarding campaign already uses, so the approved label and the visible number both ship and no number is typed into a component. The founder section's "Call Matthew · (408) 785-7588" is a distinct personal label and is preserved, also assembled from site data. |
| **`free walkthrough` on a second route.** `AGENTS.md` §7's scoped exception (2026-09-06) says the free-walkthrough wording "reaches no other route" than the hoarding PPC page, and `free assessment` / `free consultation` stay banned everywhere. This brief's entire offer is built on "Request a Free Walkthrough" and supplies no fallback for it. | **Implemented on the hoarding exception's exact terms and no wider, and FLAGGED as the one release item needing explicit owner sign-off before this page goes public.** This route publishes no price figure at all; `site.offer.assessmentFee`, `assessmentFraming()` and the $195 on-site fee are untouched and still published everywhere else; nothing here calls the walkthrough an "assessment" or a "consultation"; and `site.offer.formSubmitCta` ("Send Message") still labels every other form on the site. |
| Doc 21 §2.3 (animal/organic clause), §3.1 (pest boundary) and §4.2 (disposal wording) are mandatory wherever that work is described. The copy document describes a rodent-droppings condition and describes arranging disposal three times, and carries none of the three clauses. | All three added, verbatim, from the wording `/estate-cleanout-san-jose/` already publishes — not new formulations. Doc 21 is rank 3 and outranks the copy document at rank 4. §2.3 and §3.1 are appended to the rodent FAQ answer; §4.2 sits in the offer section, which is this page's scope section. The layout refresh independently asks for the same disposal distinction. |
| The layout refresh requires a visible "Illustrative image" caption on each new scene. The 2026-09-05 owner instruction removed captions sitewide. | Captions restored **for these two images on this route only** — a later rank-2 owner instruction over an earlier one, within the scope it actually decided. No other image on this site regains a caption. |
| The refresh specifies H1 36–54px and H2 28–38px. The site's role-class tokens resolve to 34–52px and 29.6–40px. | Tokens left alone. `AGENTS.md` §6 law 1 forbids declaring `font-size` on a heading anywhere, and law 2's note forbids raising a heading token to chase a number; both tokens are sitewide. Deltas are ≤2px at the extremes. `scripts/type-law-check.mjs` is clean on both laws for all four affected routes. |

### Readiness fallbacks applied, and the evidence for each

Recorded in full in `src/data/ppcEstate.ts` §B. Summary:

- **Document shredding — omitted entirely.** No provider, approval process or destruction-record
  deliverable exists anywhere in the repository. The shredding offer card, the shredding FAQ and
  the shredding line in the completion package are all absent.
- **Inventory and handoff records — omitted; belongings instructions retained.** The site
  establishes that discovered items are isolated and reported; it does not establish a
  designated-item photograph and list, labeled-box handoff, or a belongings handover record.
- **Donation coordination — retained**, with the source's own hedges intact. Established by
  `/estate-cleanout-san-jose/`'s owner-approved donation section.
- **Completion photographs and work summary — retained** (the Property Handoff Record, published
  sitewide). **Scheduled updates — omitted**; no update cadence is established anywhere.
- **Missed-task correction — the brief's supplied fallback sentence ships instead.** No service
  agreement exists in the repository to read, and the nearest published commitment is narrower
  than the brief's ("no additional **labor** charge", inside a 24-hour window). The layout refresh
  independently instructs that this not be reinstated.
- **Financing — off.** No APR, approval odds, monthly payment or provider name anywhere.

### Backend changes — additive, route-scoped, and guarded

`functions/api/lead.ts` is untouched. In `functions/_lib/`:

- `property_detail` is optional **only** for submissions whose entry route is this campaign
  (`detailOptionalCampaignRoutes`), the same route-scoping `providers.ts` already uses for the
  hoarding confirmation email. Keying on `offer_type` was rejected for the same reason it was
  there: campaign forms post the shared `handoff_reset` value. No minimum length exists in the
  browser or on the server. `scripts/estate-campaign-form-check.mjs` case 3 is the regression
  guard — the identical payload from `/contact/` is still rejected.
- `property_status` added as a new **optional** scalar with four allowed values, surfaced on the
  HubSpot deal and the owner alert only when answered.
- The service value is `"Inherited or estate property"` — already in
  `allowedValues.property_situation` and already named as the estate mapping by
  `/estate-cleanout-san-jose/`. It is now declared in `assessment.campaignSituations` and
  `scripts/situation-enum-guard.mjs` runs the real validator against campaign-fixed values too:
  a PPC form posts its service as a hidden input, so a mismatch there is invisible in the UI and
  still loses every lead — the crime-scene failure mode minus its only visible clue.

### Measurement

No new tag, no second container, no new event name, no consent bypass. The estate form is the same
`PpcHeroForm` and raises the same four events; `ppc_form_success` is still the only one that may
map to a conversion and still fires only on `2xx && ok === true`, once, claimed on the endpoint's
confirmation code and shared with the thank-you route's recovery path.
`Analytics.astro`'s CTA-click matcher gained `request-walkthrough` (listed before `request` —
alternation is first-match and `#request` followed by `-` fails the boundary), so estate CTA
clicks are measured on the same intent event as every other form anchor. A phone click is still
`phone_click` and still not a lead.

### Not done, and not claimed

`generate_lead` remains a **GTM-side mapping that does not exist yet** — the 2026-09-06 entry
above records that no tag, trigger or variable has been created in the workspace. Nothing in this
change alters that, and nothing here can verify it from the repository. Email delivery, HubSpot
writes and GA4 receipt were exercised against stubs, not live accounts.

### 2026-09-09 (later) — Estate campaign trust bar

A three-item trust bar was requested below the hero and form. The layout is built in full to the
requested specification. **Two of the three items are release-gated and do not publish today**;
both are wired to their real verification flags rather than hardcoded, so each appears
automatically the moment its fact is recorded and cannot appear before then.

| Item | State | Gate |
|---|---|---|
| CDPH Registered · Trauma Scene Waste Management Practitioner · TSW 933 | **Withheld** | Not a missing fact — the registration is verified active. Its **publication scope** blocks it: doc 21 §5 authorizes the credential on `/crime-scene-trauma-cleanup-san-jose/` "plus its named cross-links (footer, `/services/`)", and `AGENTS.md` §3 repeats it. Measured against the build, `933` appears in exactly one emitted page. §5 is explicit that registration authorizes "one registered scope", not a company-wide credential. **The identical request was already escalated and refused on the sibling campaign route** — `src/data/ppcHoarding.ts` exception 2 and its `credentialsDependency`, 2026-09-05. Needs an explicit owner decision widening §5's display scope, recorded here. Then flip `publishTswOnEstateCampaign`. |
| Insured · Certificate available upon request | **Suppressed** | `AGENTS.md` §3 suppression rule and doc 21 §2.5. `PUBLIC_INSURANCE_STATUS` is empty and `wrangler.toml` carries an explicit comment saying it is intentionally absent pending a COI. Same gate `CredentialBar`, `HomeTrustStrip`, `HomeRegulatedAuthority`, `ServicesAuthority` and the hoarding trust strip already use. Set that value from a verified COI and the item ships with the approved §2.5 wording. |
| Owner-Led Projects · Work directly with Matthew Ruiz | **Ships** | Founder identity and accountability is named in doc 21 §6 as permitted proof today. No credential, rating, count or capability claim. |

**The offered insurance fallback is deliberately not used.** "Business insurance coverage" is
still an affirmative statement about policy coverage, and doc 21 §2.5 extends the suppression to
"every statement about policy coverage, limits, specialty coverage, or insurance-linked
certification." A softer wording does not clear the gate; a verified COI does. The slot ships
empty instead — `AGENTS.md` §0.3, "empty beats fake, always."

Column proportions are derived from the items that actually render, so the bar stays balanced at
one, two or three rather than leaving an empty track behind a suppressed claim. Verified by
temporarily opening both gates and rebuilding: tracks resolve to 477.5 / 249.1 / 311.4 px of a
1038px content box — exactly 46 / 24 / 30 — with all three items top-aligned at the same pixel and
the requested line breaks intact. Both gates were closed again and the revert confirmed against
the build.

Type law: the item titles are `<p>`, not `<h3>`. The requested 16px semibold is a `font-size`
declaration, and `AGENTS.md` §6 law 1 forbids one on anything resolving to a heading element.
These are control labels in a trust strip, not document structure.

Checked at 320, 390, 768, 1024 and 1440px plus a 200% root font: no clipping, no ellipsis, no
justified text, `nowrap` scoped to `TSW 933` alone and never to a description, and the bar does not
widen the document at any width. **Pre-existing observation, not a regression:** at a 32px root
font on a 320px viewport the document reflows to 640px on this route *and equally on the untouched
hoarding route* — a campaign-layout property of the large H1, measured with the bar removed to
confirm it is not the cause.

### 2026-09-09 (owner confirmation) — Estate campaign release exceptions

- `Free Walkthrough` is explicitly approved for `/estate-cleanout-san-jose/assessment/`, its
  thank-you route, and the matching confirmation-email branch. It is a walkthrough only, never a
  free assessment or free consultation. The route renders no price; the shared $195 on-site
  assessment fee and every other route's pricing rule are unchanged.
- The trust bar directly below that route's hero is approved with exactly three items:
  `CDPH Registered · Trauma Scene Waste Management Practitioner · TSW 933`; `Insured`; and
  `Owner-Led Projects · Work directly with Matthew Ruiz`. This widens the TSW credential's
  display scope only to this route and makes no additional trauma-service claim. The one-word
  insurance item is route-scoped; shared insurance and endorsement surfaces remain gated.
- Presentation: one white strip, small navy outline icons, top-aligned text, 46/24/30 desktop
  proportions, and a single-column mobile stack. No government seals and no blanket OSHA claim.

### 2026-09-09 (current verification) — Analytics and one authorized live inquiry

This verification supersedes the September 6 account-state snapshot as evidence of what the
published GTM container contains now. It does not rewrite that historical entry.

**Analytics, separated by layer:**

- Current source and browser checks: `PpcHeroForm` emits one `ppc_form_success` only after an
  HTTP success with `ok: true`; failure, invalid input, phone clicks, refreshes, and repeated
  submits do not emit a lead event. `npm run qa:analytics:events` passed 34/34 and
  `npm run qa:estate:page` passed 140/140 against the fresh build. These suites stub the provider
  or container where documented; they prove the browser/dataLayer contract, not GA4 receipt.
- Current published GTM container: the public `GTM-WSSQ62BN` script fetched during this pass
  contains the GA4 base tag for `G-40K4ETN1NX`, a custom-event trigger for
  `ppc_form_success`, and a GA4 event tag named `generate_lead`. Its rule table maps that trigger
  to that tag. The same container carries the separate `phone_click`, `form_start`, attempt, and
  error mappings. The fresh build passes `npm run qa:analytics` 8/8: one consent-gated container
  and no duplicate gtag base installation.
- GA4 property receipt is still **unverified**. No GA4 account/API access is available in this
  session, so the repository and public container can prove emission and configuration but not
  that GA4 stored a resulting event. Verify `generate_lead` in GA4 Realtime/DebugView or Recent
  events before treating receipt as closed.
- `scripts/current-site-verification.mjs` was reconciled with the existing launch contract: it
  still requires canonical metadata on every ordinary route, but applies search-identity
  uniqueness, BreadcrumbList, and inbound-crawl-path gates only to indexable pages. Requiring
  structured data or public inbound links on intentionally noindex PPC/utility routes directly
  contradicted `BaseLayout`/`PpcLayout`, which suppress structured data for those routes. After
  that correction, `npm run qa:current` passes 50 routes at six widths plus the 390px Axe scan.

**One real production inquiry — not stubbed:**

- Exactly one inquiry was submitted through the currently deployed `/contact/` form using the
  existing Aseptaclean business contact details and the marker
  `ASEPTACLEAN WEBSITE TEST — 2026-09-10T04:06:39Z`. Earlier attempts against the retired
  `/request-assessment/` path and from an unresolved temporary script both stopped before any
  form submission.
- The real `/api/lead` returned HTTP 201 with submission
  `1bc12d52-527d-4e55-a616-cf9ca41510f5` / confirmation `AC-3F0JTM`; the browser reached
  `/thank-you/`. The production R2 ledger records core storage succeeded, no files supplied,
  HubSpot succeeded (`Contact 549571718903; deal 347542280900`), customer email accepted by
  Resend (`accf7e54-88dd-4fcd-b926-9dc03ed7cc1a`), SMS skipped because 10DLC alerts are disabled,
  and the owner fallback email accepted by Resend (`9af56129-f912-48fd-9ec6-19fbdcb72500`).
- Provider acceptance is verified; inbox placement/opening was not observed because this session
  has no mailbox access. The HubSpot API returned real contact and deal IDs only after accepting
  the contact upsert, associated deal creation, pipeline/stage fields, offer type, confirmation
  code, and description payload. The record was not separately opened in the HubSpot UI because
  this session has no HubSpot account access or retrievable API secret.

### 2026-09-10 — Google Ads destination and estate-lead conversion handoff

- Inspection before editing found one Termly-gated GTM installation, `GTM-WSSQ62BN`, on the
  shared Base and PPC layouts. Its published container carries the GA4 Google tag for
  `G-40K4ETN1NX` and maps the accepted-lead-only `ppc_form_success` dataLayer event to the GA4
  event `generate_lead`. It did not contain `AW-18340008320` or a native Google Ads conversion
  tag. The detected Google tag ID `GT-NFDGKKNW` is provider-managed identity, not a second loader
  in repository source.
- `AW-18340008320` is added as a destination through the existing Google tag/dataLayer. No new
  GTM or gtag.js loader is installed. The destination config is manually blocked under Termly's
  Advertising category and sets `send_page_view:false`; the existing GTM loader remains under
  Analytics consent. Refusing consent leaves both inert.
- Native Google Ads conversion tracking is deliberately incomplete until Google Ads supplies the
  action-specific conversion label (the value after `AW-18340008320/` in the event snippet, or
  the Conversion Label shown under “Use Google Tag Manager”). Do not invent it. The future native
  Ads tag must trigger only on custom event `ppc_form_success` with `form_id` exactly
  `request-walkthrough`. That stable form ID is carried by both the immediate success event and
  the once-only thank-you recovery, while excluding the hoarding campaign's `assessment-form`.
- Measurement choice: use one native Google Ads conversion action for the estate lead once that
  label is available. Do not also import GA4 `generate_lead` as a Google Ads conversion—the
  existing GA4 event covers both PPC forms, while the requested Ads conversion is estate-specific,
  and enabling both would double-count the estate submission.
- Verification must intercept or stub `/api/lead` and Google hosts. No production submission or
  real conversion may be generated merely to test this installation.

## 2026-09-15 — Owner-requested rodent and assessment-page indexing

The owner requested Google indexing for the rodent service page and both assessment
landing pages, reviewed the proposed allow-list change, and authorized direct repository edits.
This supersedes the older rodent indexation exception and the campaign briefs' noindex
requirements for these three routes only:

- `/rodent-dropping-cleanup-san-jose/`
- `/estate-cleanout-san-jose/assessment/`
- `/hoarding-cleanup-san-jose/assessment/`

The shared indexable set includes all three; the two landing pages no longer pass explicit
`noindex={true}`. Fresh source inspection shows the current rodent route uses AcServicePage
without its own noindex override; the old sitemap comment claiming otherwise was stale.
Sitemap comments and the launch architecture check now match the expanded set.

This records an SEO decision, not evidence that the six historical operational inputs have
been satisfied. No business-fact records, service claims, navigation, forms, tracking,
endpoints, consent documents, protected SMS files, or other route publication states change.
Thank-you pages remain explicitly noindex and outside the sitemap. Verification: production `npm run build` passed using the checked-in public variables in
`wrangler.toml`; `npm run check` reported 0 errors, 0 warnings and 11 hints;
`npm run qa:launch` passed across 53 built routes with exactly 14 sitemap URLs.
Independent XML/HTML inspection confirmed self-canonicals and `index, follow` for all three
requested pages, and `noindex, follow` plus sitemap exclusion for both campaign thank-you
pages. `robots.txt` allows crawling and points to the correct sitemap. `git diff --check`
passed. No visual or form behavior changed, so no live lead submissions were made.

### 2026-09-16 — Rodent service page rebuilt on new owner copy; new rodent assessment landing page

The owner supplied two new approved copy documents — `docs/Aseptaclean_Rodent_Service_Page_Copy.md`
for `/rodent-dropping-cleanup-san-jose/` and `docs/Aseptaclean_Rodent_Landing_Page_Copy.md` for a
new landing page — plus explicit design instructions for both. Both are rank-2 explicit current
owner decisions (AGENTS.md §1), scoped to these two routes only.

#### Conflict 1 — pricing

| Side | Text | Rank |
| --- | --- | --- |
| A | The two new copy files: small-area cleanup "starts at $500", larger jobs "start at $1,500", on-site assessment "$145", "the full $145 counts toward your cleanup bill" (no 7-day condition). Owner-supplied, 2026-09-16. | 2 |
| B | `AGENTS.md` §4, 2026-08-11: "No price figure is published anywhere on the site." §3: assessment fee is $195, "credited toward an approved project booked within 7 days." | 2 (earlier) |

**Resolution: A wins, scoped to exactly these two routes**, on the same reasoning as the
2026-09-06 hoarding-walkthrough and 2026-09-09 estate-walkthrough entries above — a later rank-2
owner decision that names its own scope outranks an earlier one within that scope only. Unlike
those two entries this is a **price figure**, not a "free" relabeling, and it is the first
published general starting price on the site. `AGENTS.md` §3 and §4 amended in place with scoped
exceptions rather than left contradicting the new pages. The $195 fee, `site.offer.assessmentFee`,
`assessmentFraming()`, and the sitewide no-starting-price rule are unchanged everywhere else. The
figures ship as literal strings in the two new data files, not through `site.offer`.

**Type:** violated rule → rule scoped, both documents amended.

#### Conflict 2 — hero form placement

| Side | Text | Rank |
| --- | --- | --- |
| A | Owner design instructions, 2026-09-16: "Use a split hero with text on the left and a relevant image on the right... Place the contact form at the bottom of each page, not in the hero... Make every 'Request a Property Assessment' button scroll to that page's bottom form," for both the service page and the new landing page. | 2 |
| B | `AGENTS.md` §2.2.3: "Home and the five service pages share one responsive `HeroWithForm`." The existing PPC assessment-page pattern (`/hoarding-cleanup-san-jose/assessment/`, `/estate-cleanout-san-jose/assessment/`) also puts the intake form inside `PpcHero`. | 2 (earlier), plus doc 30 §3 (rank 5) |

**Resolution: A wins, scoped to exactly these two routes.** Every existing reusable
hero/form pairing on the site (`AcHeroWithForm`, `AcServicePage`, `PpcHero`+`PpcHeroForm`-in-hero)
bundles the intake form into the hero, so satisfying the owner's explicit instruction required a
scoped departure rather than reuse of an existing page-level composition. Implementation reuses
every existing ATOMIC piece unmodified except where noted — `PpcHeroForm` (relocated out of the
hero into its own bottom section, unmodified field set/validation/consent/backend/analytics),
`AcActions`, `AcTrustStrip`, `AcSteps`, `AcCheckList`, `FaqAccordion`, `AcSplit` (for body
sections).

**First attempt, corrected same day.** The hero was initially built as a brand-new component,
`AcSplitHero.astro` — a literal two-column layout (light background, contained photo box, text
left) — reading "text on the left, image on the right" as a rejection of the sitewide full-bleed
photo hero. Once built, it did not visually match any other page on the site, and the owner said
so directly ("the design looks different from the other pages") without further specifying what.
A side-by-side screenshot comparison against `/hoarding-cleanup-san-jose/` confirmed it: every
other hero on the site is a full-bleed photograph with a flat navy overlay and white left-aligned
text; the new component was a light, boxed, two-column layout that read as a different product.
`AcPageHero.astro`'s own header comment states this exact pattern — "a white text hero with a
small contained photograph on the right" — was deliberately retired sitewide in the 2026-09-04
visual port, with doc 30 §1 naming it "the thing NOT to do." Building it back, even for a good
literal reading of "text left, image right," reproduced a rejected pattern.

**Corrected implementation.** `AcSplitHero.astro` is deleted. Both pages use `AcPageHero` — the
same full-bleed photo + navy overlay, no-form hero already used on About, Contact and the Services
hub — extended with two small additive props: `primaryLabel` (so the button can read "Call (408)
785-7588" per the approved copy instead of the sitewide default "Call Aseptaclean," the same
override `AcActions` already supported) and `strongBody` (a bold paragraph rendered after the
regular body paragraphs, for the landing page's second bold hero line). Both props default to
unset, so the three existing `AcPageHero` callers (About, Contact, Services hub) render
byte-identically. `AcHeroWithForm.astro`, `AcServicePage.astro`, `PpcHero.astro` and every route
using any of them, including the three existing `AcPageHero` callers, are otherwise untouched.
`AGENTS.md` §2.2.3 amended with the corrected scoped exception.

**Type:** violated rule → rule scoped; first implementation attempt also violated the visual
system it was scoped inside of, caught by the owner's direct feedback and fixed same-session
rather than left as a second, undiscovered defect.

#### Doc 21 mandatory clauses applied (rank 3, over the rank-4 copy documents)

Both new pages describe rodent/animal-waste cleaning throughout, and both describe the pest
boundary explicitly ("We do not: trap rodents... seal holes..." / "We do not trap rodents, treat
pests, or seal entry holes"). Per the precedent set on `/estate-cleanout-san-jose/assessment/`
(2026-09-09 entry above), doc 21's mandatory verbatim clauses are added ON TOP OF the approved
copy, not as a replacement for it:

- **§2.3 animal/organic clause** — "Cleaning only — not a decontamination, sterilization, or
  health-safety determination." Added once per page, at the end of the section that most directly
  describes the cleaning/pest boundary (service page: "What if rodents are still getting in?";
  landing page: the matching FAQ answer).
- **§3.1 pest-boundary sentence** — "Aseptaclean may clean accepted conditions left behind after
  an appropriately licensed pest operator has confirmed the active pest issue is resolved.
  Aseptaclean does not inspect for, identify, exclude, trap, or treat pests." Added in the same
  place, verbatim, not a paraphrase of the copy's own similar sentences.
- **§4.2 disposal wording** was evaluated and NOT added: neither copy file describes arranging
  disposal or transport (only on-property removal, "we remove the droppings... included in your
  approved plan"), so the clause is not triggered on these two pages — unlike the estate page,
  which described arranging disposal three times.

#### Route creation — `/rodent-dropping-cleanup-san-jose/assessment/`

Checked before creation: no existing rodent landing/assessment route anywhere in `src/pages`,
`src/data/ppc*.ts`, or `public/_redirects`. New route + `.../assessment/thank-you/`, mirroring the
hoarding/estate campaign pattern exactly (`PpcLayout`, own `PpcHeroForm` field set/validation/
consent/backend, own thank-you page with the same query contract and lead-event recovery script).
`noindex` was initially passed explicitly, believing the route absent from `launchIndexablePaths`
put it "out of `sitemap.xml` by the same mechanism as the two existing PPC routes." That premise
was already stale the day it was written: this branch was cut before the 2026-09-15 owner
indexing decision above landed on `main`, and never rebased. **Corrected 2026-09-17** — see that
date's entry below. `functions/_lib/providers.ts` needed **no new confirmation-email branch**:
unlike the hoarding/estate campaigns, this page does not offer a free walkthrough (it publishes
the real $145 fee), so the existing default "Assessment request" branch already says the correct
thing and required no code change. `offer_type` posts the existing `handoff_reset` value (the only
other allowed value, `private_residence_reset`, does not apply); `property_situation` posts the
existing frozen enum value `"Rodent droppings or animal waste"`.

`/rodent-dropping-cleanup-san-jose/` itself was described here as keeping its existing `noindex,
follow` status via `launchIndexableExceptions` — also already stale when written, for the same
reason. See 2026-09-17 below for the correction; this copy rebuild never touched indexation code
either way.

#### Component changes

- **`src/components/FaqAccordion.astro`** — added one optional field, `link?: { label, href }`,
  rendered as a trailing sentence inside the existing answer `<p>`. Every existing caller omits it
  and renders byte-identically; it exists so the CDC and EPA links the two approved copy files
  require inside specific FAQ answers can render as real links instead of being dropped or moved
  out of their approved placement.
- **`src/components/ac/AcPageHero.astro`** — two additive props, `primaryLabel` and `strongBody`,
  both defaulting to unset. See Conflict 2 above; `AcSplitHero.astro`, built and then deleted the
  same session, is not part of the shipped result.
- **`src/data/servicePageCopy.ts`** — the old rodent record removed (superseded by
  `src/data/rodentServicePage.ts`); the file's header comment's source list updated to drop
  "Rodent" now that its copy source is the new dedicated file, not
  `docs/aseptaclean-all-website-copy.md`.

#### Not changed

`src/data/site.ts`, `src/data/assessment.ts`, `functions/_lib/lead.ts`, `functions/_lib/providers.ts`,
`src/data/launchArchitecture.ts`, `AcHeroWithForm.astro`, `AcServicePage.astro`, `PpcHero.astro`,
`PpcHeroForm.astro`, and every other route's copy, navigation, or metadata.

#### Second round of owner feedback, same day — page rhythm did not match its siblings

After the hero fix above, the owner flagged (twice) that the pages still did not look like the
rest of the site. The hero was right by then; the rest of the body was not. Full-page screenshot
comparison against `/hoarding-cleanup-san-jose/` (the service page's true sibling) found three
concrete, fixable gaps, none of them the hero:

1. **No numbered eyebrow labels** ("01 / …", "02 / …") above section headings. Every
   `AcServicePage`-based sibling has these; the rodent service page had none. Added to all eight
   body sections in sequence (`01 / The spaces` through `08 / Questions`).
2. **No dark navy band anywhere in the body.** Doc 30 §4 calls for "one or two dark breaks in a
   long service page"; every sibling has at least one, the rodent page had zero. The "What if
   rodents are still getting in?" section is now `AcDarkBand` instead of `AcIntro` (copy-only —
   no fourth distinct rodent photograph exists without repeating one already used above). Its
   exclusion list ("We do not: …") needed its own small dark-surface styling, since
   `AcCheckList`'s `tone` prop cannot combine "exclude" marks with light-on-dark coloring (`quiet`
   is the include-only dark variant) — a bespoke `.rodent-exclude__list` was added rather than
   extending the shared component for one non-composable combination.
3. **Missing the "Not the right service?" cross-link row.** Every `AcServicePage` sibling ends its
   body with a four-card row linking the other services. This page, not being built through
   `AcServicePage`, never had one. Rebuilt using the same `AcServiceCards` component and the same
   image/blurb mapping `AcServicePage.astro` uses (`launchServiceLinks`, filtered to exclude self),
   placed directly before the bottom form.

**The landing page's true siblings are the two existing PPC pages, which are visually different
from each other** (hoarding: dark full-bleed hero, one dark band, no eyebrows; estate: light
white-background hero, no dark bands, per its own later "layout refresh" brief). Since the rodent
landing page's hero already matches hoarding's, it was brought in line with hoarding's rhythm, not
estate's: no eyebrows added (hoarding has none), one dark band added ("Help with small areas or a
larger mess.", converted from `AcSplit` to `AcDarkBand`, reusing the same image), no related-
services row added (neither PPC page has one — cross-linking away from a paid-traffic landing page
works against its purpose).

Rebuilt, re-ran `astro check` (0 errors), `qa:copy`/`qa:launch` (pass), and the type-law sweep on
both routes (clean) after each round of changes.

#### Conflict 3 — "disinfect" as an outcome claim (found during claims-check, fixed before publish)

Both approved copy files use "disinfect"/"disinfecting"/"disinfected" repeatedly as something
Aseptaclean itself does — the hero body on both pages ("We clean the affected areas and disinfect
surfaces that can be treated"), a service-page process step titled "Disinfect surfaces that can be
treated," a landing-page step ("When we disinfect, we follow the product's directions..."), and a
landing-page FAQ, "Are sanitizing and disinfecting the same?", naming what sanitizers and
disinfectants can kill.

| Side | Text | Rank |
| --- | --- | --- |
| A | The two approved copy files, owner-supplied 2026-09-16, using "disinfect" as an outcome repeatedly. | 4 (copy source) |
| B | `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.2: "disinfect" is banned "as an outcome claim... no permitted-negation carve-out covers it." | 3 |

**Resolution: B wins, in full**, on the identical reasoning already recorded in
`src/pages/animal-waste-cleanup-san-jose/index.astro`'s own top-of-file comment ("THE DISINFECT/
DECONTAMINATION RECONCILIATION") for the same word in the same kind of source copy on a sibling
route: doc 21 is rank 3 and this specific ban has no hedge that survives it — not a softened
version, not a generic-education framing. Unlike the pricing and hero-form exceptions above, this
is **not** treated as a fresh owner override: nothing indicates the owner was presented with this
specific §2.2 conflict (the way the one standing "Biohazard Remediation" descriptor exception was,
per doc 21 §2.1 and `docs/20-COPY-MAP.md`'s OWNER OVERRIDE section) before supplying the copy, so
the default rule — rank 3 governs public wording — applies without an escalation step.

**Type:** violated rule → fixed code.

**Changed**, in both `src/data/rodentServicePage.ts` and `src/data/ppcRodent.ts`:
- Every hero/body/step/FAQ sentence claiming Aseptaclean disinfects, or naming disinfecting as
  part of the work, is reworded to "clean" only, or the disinfect-specific clause is dropped from
  an otherwise-surviving sentence.
- The service page's entire "Disinfect surfaces that can be treated." process step (5th of 5) is
  removed rather than reworded — the step existed only to describe a disinfectant product-method
  claim, matching the sibling page's "drop the whole step" resolution for the identical conflict.
  The process section now has four steps.
- The landing page's entire "Are sanitizing and disinfecting the same?" FAQ item, **including its
  EPA link**, is removed rather than kept in a hedged, generic-education form — the sibling page's
  own reconciliation explicitly rejected that middle ground for its analogous enzyme-cleaner FAQ
  ("naming a product category at all is a method claim this page has no approved documentation
  for"; here, naming what disinfectants and sanitizers kill has the same problem). **This means
  the EPA link is not on either rodent page** — only the CDC link (attached to "What should I do
  before your visit?", which is a general public-safety warning quoted from the CDC and does not
  make a claim about Aseptaclean's own process) survives. This is flagged in the final report to
  the owner as a departure from the literal "keep CDC and EPA links wherever included" instruction,
  made because the instruction's own premise — a compliant sentence to attach the link to — did
  not survive the claims check.
- The mandatory §2.3 clause ("Cleaning only — not a decontamination, sterilization, or
  health-safety determination") already carries the correct negation and needed no change; it does
  not itself use the word "disinfect."

### 2026-09-17 — Rodent assessment page indexation corrected while merging to `main`

`estate-cleanout-assessment-landing-page` was cut before the 2026-09-15 entry above
(`bbd69c9`, PR #1) merged to `main`, and was never rebased onto it. Surfaced while preparing
that branch for a production merge and Cloudflare Pages deploy.

#### Conflict — is the rodent service page still noindex?

| Side | Text | Rank |
| --- | --- | --- |
| A | `main`, 2026-09-15 entry above: `launchIndexableExceptions` gate on `/rodent-dropping-cleanup-san-jose/` removed; ships `index, follow`. | 2 (owner decision) |
| B | This document's 2026-09-16 entry (now corrected above) and `src/pages/rodent-dropping-cleanup-san-jose/index.astro`'s top-of-file comment: page "remains in `launchIndexableExceptions` (noindex, follow) — an unresolved specialty-page compliance release." | not a decision — a stale description |

**Resolution: A wins**, and B was never actually a competing rank-2 decision — it is a
description of code state, written one day after that state changed, by a branch that could
not see the change. Not ambiguous enough to escalate.

**Type:** stale description → corrected doc. **Changed:** this document's 2026-09-16 entry
(route-creation paragraph and the indexation sentence following it), and
`src/pages/rodent-dropping-cleanup-san-jose/index.astro`'s top comment.

#### Conflict — should the new rodent assessment landing page be indexed?

| Side | Text | Rank |
| --- | --- | --- |
| A | 2026-09-16 entry: new route ships `noindex={true}`, justified as matching "the two existing PPC routes" — a premise already false by that date (see above). | not a decision — an inference from a stale premise |
| B | The 2026-09-15 owner decision names three specific routes; `/rodent-dropping-cleanup-san-jose/assessment/` did not exist yet on 2026-09-15 and is not literally one of them. | 2, but scope doesn't cover this route |

Neither side is an actual owner decision about this specific route — the 09-16 build inferred
noindex from a stale pattern, and the 09-15 decision predates the route's existence. Per this
skill's "when to stop and ask" rule (an owner decision implied but never actually made), this
was put to the owner directly on 2026-09-17 rather than inferred either way.

**Resolution: owner chose index, follow** — the same visibility treatment as the rodent service
page and the two sibling PPC assessment pages, on the reasoning that this route is the same
kind of page or gate.

**Type:** no decision on record → owner asked and decided. **Changed:** `noindex={true}` removed
from `src/pages/rodent-dropping-cleanup-san-jose/assessment/index.astro`; the route added to
`launchLandingPaths` in `src/data/launchArchitecture.ts`; `docs/SITEMAP-MASTER.md`'s Campaign
routes table and its rodent-service-page row updated to match.

**Not changed:** the 2026-09-15 entry above (correct as written and left standing); the 2026-09-16
entry's account of what was actually built that day (kept, with the stale sentences corrected in
place rather than deleted, so the record of the mistake survives); pricing, claims wording, forms,
navigation, or any other route's indexation.

### 2026-09-17 — Rodent pricing/assessment/contact layout rebuilt on the owner's dated brief

New file `docs/Aseptaclean_Rodent_Pages_Layout_Brief.md` ("Implementation brief · September 17,
2026") was handed directly to the assistant by the owner on 2026-09-17 with explicit approved
copy for the pricing cards, the $145 assessment strip, and the contact-form intro on both
`/rodent-dropping-cleanup-san-jose/` and `/rodent-dropping-cleanup-san-jose/assessment/`.

#### Conflict — which pricing/form copy governs these two routes' pricing and contact sections?

| Side | Text | Rank |
| --- | --- | --- |
| A | This document's 2026-09-16 entries + `src/data/rodentServicePage.ts` `pricing`/`form` and `src/data/ppcRodent.ts` `cost`/`form`, built on `docs/Aseptaclean_Rodent_Service_Page_Copy.md` / `docs/Aseptaclean_Rodent_Landing_Page_Copy.md`, owner-approved 2026-09-16. Card titles embed the price ("Small-area cleanup — starts at $500"); pricing factors render as a 5-item bullet checklist; the contact section renders its heading/lead twice (once outside `PpcHeroForm`, once inside its own header). | 2 (owner decision, 2026-09-16) |
| B | `docs/Aseptaclean_Rodent_Pages_Layout_Brief.md` §4/§6, handed to the assistant directly by the owner today: eyebrow "Cleanup pricing", H2 "Know where pricing starts.", card title separate from a "Starting at $X" label and the price itself, one shared sentence replacing the bullet checklist, one visible "Tell us what you found." heading with eyebrow "Start with a free phone and photo review", centered ~680px form container with no empty side column. | 2 (owner decision, 2026-09-17 — newer, delivered live in-session) |

**Resolution: B wins**, on the same logic AGENTS.md §2.2 uses for its own supersession clause —
"these supersede every lower-ranked statement of the same fact, including statements made
earlier." Both sides are rank-2 owner decisions; B is the newer one on the identical narrow
fact (how this pricing/assessment/contact section reads and lays out on these two routes only),
and it was delivered as a live, explicit, dated instruction to implement now — not inferred, so
this does not meet the "owner decision implied but never actually made" bar that would otherwise
call for stopping to ask.

**Type:** owner decision superseded by a newer owner decision → data/copy and markup changed.

**Changed:** `src/data/rodentServicePage.ts` `pricing` and `form` blocks; `src/data/ppcRodent.ts`
`cost` and `form` blocks — restructured to the brief's exact wording (card title/price/body
split, one-sentence factor note, assessment strip copy, contact eyebrow/heading/lead). New shared
component `src/components/rodent/RodentPricing.astro` renders the pricing cards + assessment
strip identically on both routes (brief §9, "prefer reusable... markup or components... for
these two pages"). `src/components/ppc/PpcHeroForm.astro` gained two additive, default-off props
(`headingId`, `emailBeforeZip`) so the rodent routes can show one visible form heading and the
brief's field order without touching the hoarding/estate campaigns that share this component —
every other caller renders exactly as before.

**Not changed:** the underlying facts the brief's copy still asserts — $500 / $1,500 starting
prices, the $145 assessment fee and its full credit, doc 21's compliance clauses on the "still
getting in" section, consent wording, upload limits, the lead endpoint, analytics events, or
confirmation routes. The brief's removal of the 5-item pricing-factors checklist in favor of one
sentence is a layout simplification of the same underlying facts (amount of waste, access,
materials, protective measures, disposal needs — all five are still named, just in prose), not a
claims change; verified against doc 21 via the claims-check skill before publishing. The 12
non-pricing/contact sections of the service page (spaces, keep, process, assessment-visit,
still-getting-in, founder, FAQ, serving, related-services) and the landing page's equivalent
sections are untouched, per the brief's own "this is a focused redesign... preserve the current
approved copy elsewhere."

---

## 2026-09-17 — Rodent spaces section rebuilt; no-form hero generalized to all five service pages

Implements `docs/Aseptaclean_Service_Hero_And_Spaces_Update.md`, an owner-authored implementation
brief delivered directly in this session. Three parts: (A) fix the rodent service page's
"The spaces" section, which rendered its four groups in one column instead of the intended grid;
(B) standardize every service-detail-page hero on the rodent page's full-width-photo/navy-overlay,
no-form composition; (C) relocate each affected page's existing form to one centered contact
section near the page's bottom.

### Conflict: does the no-form hero generalize past the rodent routes?

A: This session's live owner instruction — "The owner has explicitly asked to move forms out of
the other service-page heroes to match the rodent service page. This instruction supersedes the
older hero-form placement requirement for service pages and the old restriction that the no-form
treatment applies only to rodent routes." Scope named explicitly: the five service-detail pages,
not the homepage, Services hub, About, Contact, legal pages, or paid-traffic landing pages. (rank
2 — explicit current owner decision)

B: `AGENTS.md` "Hero-form scope" (2026-09-04 owner decision) — "the homepage and all five service
pages share one responsive `HeroWithForm`" — and the 2026-09-16 entry immediately below it (also
rank 2) — "`AcHeroWithForm`, `AcServicePage`, `PpcHero` and every other page using them are
untouched; this exception does not generalize past these two routes."
`docs/30-WEBSITE-MASTER-SPEC.md` §3 carries the same "home and the five service pages share one
responsive HeroWithForm" sentence implementing the 2026-09-04 side. (rank 2 owner decision, and
rank 5 doc implementing it)

**Resolution: A wins, scoped to the five service-detail pages exactly as it names itself.** This
resolves the same way the 2026-09-06 free-walkthrough and request-assessment-retirement entries
in this log did: a later owner decision that names its own scope outranks an earlier one within
that scope, because it is the same authority speaking again, not a different one. The 2026-09-16
entry's closing sentence is exactly what this instruction targets ("the old restriction that the
no-form treatment applies only to rodent routes"); the rest of that entry — why `AcPageHero`
was chosen, why the boxed-photo alternative was rejected, that `PpcHeroForm` is reused unmodified
— remains an accurate description of the rodent routes and is not disturbed. `AGENTS.md` and doc
30 §3 are amended in place rather than left contradicting the shipped pages; both keep the
superseded text, struck through or quoted, so the "why" is not lost.

**Type:** owner decision superseded by a newer owner decision, generalizing its scope → rule
amended, code changed to match, no two live documents left contradicting each other.

### Part A — the rodent "spaces" section

`.rodent-groups` (the shared class also used, unmodified, by the process section immediately
below it) declared `display: grid` with no column template, so its four groups rendered in one
column — exactly the source-file defect the brief's evidence review named. Fixed with a
spaces-only modifier, `.rodent-spaces-grid`, applied only to that one `<div>`:
two columns / two rows at normal widths, one column at ≤44rem (`44rem` is this page's existing
narrow-mobile breakpoint, reused rather than inventing a new one), 24px gap, and each of the four
groups now renders as an understated bordered panel (`--ac-color-line-strong` border, 12px
radius, `--ac-color-warm-white` fill, 26px padding) against the section's white background —
brief §"Recommended composition": "white or warm-white surfaces, a subtle existing border token,
and restrained corner treatment." `.rodent-groups--cols` (the process section's own two-column
modifier) is untouched, and neither modifier reaches the other section. The intro's `AcIntro` call
gained `align="start"`, left-aligning its eyebrow/heading/lead/body with the grid below instead of
centering them above a left-aligned grid — the exact disconnect the brief's evidence review
flagged. No copy changed; all four category headings and bodies, and the "finding waste in one
room does not mean every room needs the same work" qualification, are byte-identical. Grid rows
size to content (no fixed heights, no `align-items` override), so a taller panel never clips a
shorter one's text — verified in the screenshots below.

**File:** `src/pages/rodent-dropping-cleanup-san-jose/index.astro`. The `/assessment/` landing
page's analogous "plan" section already had a two-column grid (unscoped, its only consumer) and
was not part of the brief's Part A scope, so it was not touched.

### Part B — the shared no-form hero

`AcHeroWithForm.astro` (the homepage's and, until now, four of the five service pages' hero
component) gained two additive props, both defaulted so the homepage — the only other caller — is
byte-identical to before:

- `showForm` (default `true`): `false` skips rendering `AcCompactForm` entirely and collapses
  `.acx-hero__grid` from the two-column `minmax(0,1fr) minmax(520px,560px)` template to one fluid
  column via a `.acx-hero--no-form` modifier, so no abandoned empty form track is left behind
  (brief: "Eliminate the abandoned form grid column"). Each hero text element already caps its own
  measure (h1 18ch, lead 52ch, body 56ch), so the single wide column does not stretch the copy
  full-bleed.
- `secondaryHref` (default `` `#${formId}` ``, i.e. the previous behaviour exactly): overrides the
  secondary action's target for a caller that relocated the form elsewhere.

`AcServicePage.astro` (hoarding, extreme cleaning, deep cleaning, crime scene & trauma) now passes
`showForm={false}` and `secondaryHref="#service-contact"`. The image, alt text, focal point
(`heroImagePosition`), stacked-layout exception (`heroStackedLayout`/`heroStackedImagePosition` —
trauma's `split-band` route exception, doc 30 §3.1), eyebrow, H1, lead, body paragraphs and
assurances are all read from the same `page` record as before and are byte-identical; only the
form panel and its grid column are gone. Trauma's stacked-hero crop measurably improved as a
side effect: with no form beneath the copy at stacked widths, the media box the `split-band`
exception bounds is now exactly the copy region by construction, the same effect that exception
was built to force — see the updated note in doc 30 §3.1. `AcPageHero`-based routes (rodent, and
the pages that already used it — About, Contact, the Services hub) are unaffected; they already
had no hero form.

### Part C — the relocated contact section

Each of the four sibling pages gained one new bottom section, replacing the old `AcFinalCta`
closing band (deleted from `AcServicePage.astro`'s render list, not from the file, since `AcFinalCta`
is a shared component `Contact`'s own page still uses unmodified):

```
<section class="svc-contact" id="service-contact" aria-labelledby="service-contact-heading">
  <h2 id="service-contact-heading">{page.finalHeading}</h2>
  {page.finalBody...}
  <AcCompactForm formId="service-form" headingId="service-contact-heading"
                 entryRoute={`${page.slug}#service-form`} preselectRoute={page.slug} tone="light" />
  <p>Prefer to talk? Call {site.business.phone}.</p>
</section>
```

`page.finalHeading`/`finalBody` — the same approved closing copy each page's old `AcFinalCta` band
rendered, verified byte-identical in `dist/` and still asserted by `scripts/copy-fidelity-audit.mjs`
— is reused as this section's one visible introduction, per the brief's "Reuse approved final copy
as the contact introduction where appropriate. Do not repeat both in an outer wrapper."
`AcCompactForm` gained an additive `headingId` prop (mirroring the identical, already-shipped
convention on `PpcHeroForm`): when set, the form suppresses its own default `<h2>`+lede and labels
itself via the caller's heading instead, so there is exactly one heading per section, not two.
Every other `AcCompactForm` caller (homepage hero, Contact) leaves it unset and is unchanged.

**Duplicate-ID resolution, matching the brief's own instruction ("preserve an existing form ID
where possible, such as `service-form`... give its outer section a different ID if needed").**
`scripts/launch-e2e-form-check.mjs` hardcodes `formSelector: "#service-form"` plus its
`-name`/`-phone`/`-email`/`-zip`/`-detail` child ids for exactly this route (`service-page`
surface) — an "internal hook" the brief names by example. `formId="service-form"` is therefore
passed to `AcCompactForm` unchanged, so `<form id="service-form">` and its child ids are
byte-identical to what that script already expects. The wrapping `<section>` carries the new,
previously-unused id `service-contact` instead, and every CTA that used to point at the hero form
(`#service-form`) now points at `#service-contact` — the section, not the bare form — so
`html`'s existing `scroll-padding-top` (already sized to the sticky header) lands the visitor with
the section's heading visible, not just the form fields. Verified:
`document.querySelectorAll("[id]")` reports zero duplicate ids on all four routes; clicking the
hero's "Send a Message"
action lands with the heading fully in view and focus on the Full Name field (via `AcActions`'
existing `data-focus-target` mechanism, unmodified).

**Service selection, hidden fields and consent are unchanged.** `preselectRoute={page.slug}` is
the exact value `AcHeroWithForm` used to pass as `route` when the form lived in the hero — the
"What are you dealing with?" select still preselects the correct service (verified: Hoarding
Cleanup / Crime Scene & Trauma Cleanup / etc. render pre-selected on their own pages).
`entryRoute` changed only in its fragment (`#service-form` instead of `#hero-form`-style), which is
descriptive metadata on the lead, not a functional lookup key.

**The same duplicate-ID pattern already existed, unfixed, on both rodent routes** — flagged by the
brief's own evidence review (finding #8) and confirmed still present in the working tree: the
outer `<section id={page.formId}>` and the nested `<PpcHeroForm formId={page.formId}>`'s `<form>`
shared the literal id `rodent-form`. Fixed the other direction from the four sibling pages, because
`#rodent-form` (unlike `#service-form`) is an already-shipped, load-bearing value: Analytics.astro's
click-tracking regex matches `#rodent-form` by name, and the `/assessment/` landing page's sticky
bar (`stickyFormHref`) points at it too. Both must keep resolving to the section (so the heading
stays visible and the analytics event keeps firing on the same fragment), so the section kept
`id={page.formId}` and the nested `<PpcHeroForm>` instead received a new, purely-internal id
(`` `${page.formId}-panel` ``) — nothing queries the `<form>` tag by its literal id on either rodent
route. Verified: zero duplicate ids on both rodent routes post-fix; `#rodent-form` still resolves
to the section on both.

### Verification

- `npm run check` — 0 errors.
- `npm run build:local` — 55 pages built, no errors.
- `npm run qa:copy` / `npm run qa:gate6` — PASS; every route's mapped source blocks present,
  including the four `finalHeading` strings each script's `PLACEMENT` table names for hoarding,
  extreme cleaning, deep cleaning and trauma — unaffected by moving that copy from `AcFinalCta`
  into the new contact section, since the check greps rendered text, not a specific component.
- `npm run qa:launch` — PASS, unchanged from before this change.
- `npm run qa:seo` — same pre-existing city-route publish-blocker count as before this change
  (42, all on `/service-areas/*` routes this task did not touch); PASSED.
- `scripts/type-law-check.mjs`, scoped to the seven touched routes plus `/` — Rule 1 CLEAN (every
  heading, including the new `.svc-contact`/`.rodent-spaces-grid` markup, sizes through an
  `.ac-type-*` role class); Rule 2 all seven routes clear 1.9:1 at every width; no one-word H1
  final lines introduced.
- Playwright sweep across `/`, all five service-detail routes, both PPC assessment landing pages
  (hoarding, rodent) and `/contact/` at 1440×900, 1366×768, 768×1024, 390×844 and 320×700: zero
  horizontal overflow at any combination. Targeted checks on the four migrated routes confirmed
  zero duplicate DOM ids, exactly one `<h2>` inside `#service-contact`, the form nested inside that
  section, and the hero's secondary action landing on the visible heading with focus in the first
  field.
- Trauma's mobile hero crop was re-measured against the 2026-09-06 baseline in
  `docs/30-WEBSITE-MASTER-SPEC.md` §3.1: visually confirms materially more of the source photograph
  is visible at 390px now that no form sits beneath the copy in the stacked layout (qualitative
  screenshot comparison, not a re-run of `scripts/trauma-hero-mobile-check.mjs`, which is a
  diagnostic capture script with no pass/fail gate and was left unmodified — its `form`-keyed
  fields now legitimately report `null` for these routes rather than measuring a removed element).
- Claims-check re-run over every rendered string this change touched (the four relocated
  `finalHeading`/`finalBody` blocks, the new "Prefer to talk? Call…" line, the unchanged rodent
  spaces copy): no violation: no new claim, price, credential, or wording was introduced; every
  string moved verbatim from where it already rendered.

### Not changed

- Homepage, Services hub, About, Contact, legal pages: no file touched, no layout change.
- Every PPC/paid-landing-page route (`/hoarding-cleanup-san-jose/assessment/`,
  `/estate-cleanout-san-jose/assessment/`, `/rodent-dropping-cleanup-san-jose/assessment/`):
  `PpcHero`/`PpcHeroForm`/`AcPageHero` and their existing hero-form or bottom-form compositions are
  untouched by this entry. The rodent landing page's duplicate-id fix (Part C) is the only change
  it received here.
- No service claim, price, credential, meta title/description, canonical, indexing rule, or legal
  wording. No form field, required state, validation rule, endpoint, redirect, CRM mapping,
  upload limit, or analytics event definition.
- `functions/api/lead.ts` and the rest of the canonical backend: untouched, per the brief's own
  "Leave the canonical backend untouched for this layout task." The disabled-submit "Online
  submission is not fully configured in this preview" message still renders in the local `astro
  preview` environment used to verify this change — expected, since Cloudflare Pages Functions do
  not run under that preview server; not concealed, not faked, and not a defect introduced here.
- `AcFinalCta.astro` itself: left in the tree, unmodified, and still rendered by `/contact/`.

### Blockers / follow-ups for a separately authorized session

- Real end-to-end submission (Turnstile solve, live `/api/lead`, confirmation email) was not
  exercised for the four migrated pages in this session — that requires the deployed Cloudflare
  Pages Functions environment and, per standing instruction, explicit authorization plus a
  designated test inbox before sending a real test lead. `scripts/launch-e2e-form-check.mjs`
  already covers the hoarding service page (`service-page` surface) against production and needs
  no changes for this task, since `#service-form`'s child ids are unchanged.
- Nothing was deployed. All verification above ran against `npm run build:local`'s `dist/` output
  served by `astro preview` on `localhost`.

---

## 2026-09-17 (same day, second decision) — Homepage hero form relocated too

Live owner instruction, delivered directly in chat immediately after the entry above shipped:
"can you change the home page hero to match the service page design." No written brief this time
— the entry above already established what "the service page design" means in this session (the
rodent-page composition, generalized), so this is a scope widening of that exact decision, not a
new design direction.

### Conflict: the entry immediately above this one explicitly excluded the homepage

A: This message — an explicit, current, live owner instruction to apply the same no-form-hero
treatment to `/`. (rank 2)

B: The entry immediately above — "The homepage, Services hub, About, Contact, legal pages, and
every PPC/paid-landing-page route... are explicitly untouched and keep their current layouts,"
and `AGENTS.md`'s matching "Hero-form scope — the homepage only" sentence, both written earlier
today. (rank 2, same session, same day)

**Resolution: A wins.** Same rule this log already applies repeatedly: a later owner decision
that names its own scope outranks an earlier one within that scope, because it is the same
authority speaking again. This is the tightest case of that rule so far — the two decisions are
roughly an hour apart in the same conversation — but the mechanism is identical, and "the
homepage is deliberately out of scope" was never a fact independent of the owner's own stated
intent; it was that intent, now updated.

**Type:** owner decision superseded by a newer owner decision, minutes later, same conversation →
rule amended again, code changed to match.

### What changed

`src/pages/index.astro`:

- `<AcHeroWithForm>` gained `showForm={false}` and `secondaryHref="#home-contact"`; dropped the
  now-unused `formId="hero-form"` and `route="/"` props (both were only consumed by the form panel
  this hero no longer renders).
- The closing `<AcFinalCta heading={home.final.heading} body={home.final.body} />` is replaced by
  a new `.home-contact` section, id `home-contact`, reusing `home.final.heading`/`body` verbatim
  as its one visible introduction. `AcCompactForm` renders inside it with `formId="hero-form"`
  (preserved literally — see below), `headingId="home-contact-heading"` (suppresses the form's own
  default heading so there is exactly one), `tone="light"`, `entryRoute="/#hero-form"`,
  `preselectRoute="/"` (the same value `AcHeroWithForm` used to pass by default, so the situation
  select's behavior — no service preselected on the homepage — is unchanged). A "Prefer to talk?
  Call…" line matches the wording already shipped on the rodent and service-page contact
  sections.

**Duplicate-ID / anchor resolution, same pattern as the entry above.**
`scripts/launch-e2e-form-check.mjs`'s `homepage` surface hardcodes `formSelector: "#hero-form"`
plus `-name`/`-phone`/`-email`/`-zip`/`-detail`/`-situation` child ids. `formId="hero-form"` is
therefore unchanged on `AcCompactForm`, so the `<form>` and its children are byte-identical to
before. The new `home-contact` id lives on the wrapping `<section>` instead, and the hero's
secondary action now points there — so the visitor lands with the heading visible (verified:
heading top 152px, inside the viewport, at 1440×900 after the click), not just the bare form.

**`src/components/Analytics.astro`:** the click-tracking regex gained `home-contact` as a tracked
fragment (full pattern now `hero-form|home-contact|request-walkthrough|request|contact-form|
assessment-form|rodent-form`, unbroken in the source file — wrapped here only for this log's line
width), because the homepage's secondary action now points at `#home-contact`, not
`#hero-form`, and that CTA is the site's single highest-traffic conversion click — it must keep
firing `handoff_plan_click`. `hero-form` stays in the alternation even though no current `<a href>`
targets it directly: `AcCompactForm`'s default `entryRoute` prop and this page's own `entryRoute`
string still reference it as descriptive metadata, and removing a previously-live tracked fragment
is exactly the kind of quiet regression this log exists to prevent, for zero benefit.

**`AGENTS.md`** "Hero-form scope" and **`docs/30-WEBSITE-MASTER-SPEC.md`** §3 (including the §1
"Home hero" table row) amended in place: both now state that no page's hero embeds a form via
`AcHeroWithForm`, with the superseded "homepage only" language struck through/quoted rather than
deleted. **`docs/page-briefs/HOME.md`** gained the same one-line supersession note already added
to the four service-page briefs.

### Verification

`npm run check` (0 errors) · `npm run build:local` (55 pages) · `qa:copy`/`qa:gate6` PASS
(`home.final.heading`'s text — "You do not need to know exactly what kind of cleanup you need." —
is still present in `dist/index.html`, just inside `.home-contact` instead of `AcFinalCta`;
neither script asserts which component renders it) · `qa:launch` PASS. Playwright: zero horizontal
overflow at 1440×900, 1366×768, 390×844, 320×700; zero duplicate DOM ids on `/`; `#home-contact`
contains exactly one `<h2>` and the `<form>`; clicking the hero's "Send a Message" action lands
with the heading visible and focus on the Full Name field.

### Not changed

Everything the entry above already scoped as untouched, still untouched: Services hub, About,
Contact, legal pages, every PPC/paid-landing-page route. No service claim, price, credential,
meta title/description, field, validation rule, endpoint, or analytics event *definition* — only
one tracked fragment was *added* to the existing click regex, not redefined. `functions/api/lead.ts`
untouched. Nothing deployed.

### Blocker, unchanged from the entry above

Real end-to-end submission for the homepage's relocated form was not exercised this session for
the same reason as the four service pages — needs the deployed Pages Functions environment and
separate authorization. `scripts/launch-e2e-form-check.mjs`'s `homepage` surface needs no code
change, since `#hero-form`'s child ids are unchanged.

---

## 2026-09-18 — Owner design blueprint implemented: homepage rebuild, Services hub retired,
## Estate Cleanout added to navigation, shared hero sizing, estate campaign form relocated

Implements `docs/Aseptaclean_Website_Design_Blueprint.md`, an owner-authored implementation brief
(dated internally September 18, 2026) delivered directly in this session, following the same
pattern as the two 2026-09-17 entries above. This is the largest single change this log records:
a full homepage rebuild to the owner's exact 11-section order, retirement of the standalone
`/services/` hub with a permanent redirect, a sixth public service (Estate Cleanout) wired into
navigation/homepage/footer, a shared hero-sizing rule applied across nine public pages plus the
two reviewed campaign landing pages, and the estate assessment landing page's form moved out of
its hero per the owner's earlier, now-generalized instruction.

### Conflicts resolved

**A — the homepage's row order and content.** `docs/page-briefs/HOME.md` and doc 30 §1/§5
described a 12-row homepage (including two standalone "difference"/"scope" sections, a five-step
process, and a standalone FAQ). The blueprint specifies an exact 11-section order (navbar, hero +
trust, Why Aseptaclean, Services, Who We Help, CTA, Process, Service Area, CTA, Contact form,
footer) and explicitly directs several consolidations. Resolution: the blueprint is a current,
explicit owner decision (rank 2) naming its own scope in detail; it supersedes doc 30 §5 and
HOME.md's row order for the homepage specifically, the same way the 2026-09-17 entries above
resolved a scope-widening owner decision against an earlier one. HOME.md and doc 30 §1/§3/§4 are
amended in place (struck/quoted, not deleted) rather than left contradicting the shipped page.

**B — "Services hub is a live, indexable page" (§1.2/§2, `docs/SITEMAP-MASTER.md`) vs. "retire the
standalone Services hub" (blueprint).** The blueprint is explicit and names its own scope: "Remove
the standalone `/services/` overview page from the active site... Implement a permanent redirect
from the old `/services/` route to `/#services`." Resolution: A wins. `src/pages/services/index.astro`
is deleted; `public/_redirects` gained one rule (`/services/ → /#services`, 301); every internal
reference (`Header.astro`, `Footer.astro`, `AcServicePage.astro`'s and the rodent page's
BreadcrumbList schema, `launchArchitecture.ts`) was updated or removed. No dead route, no redirect
chain: Cloudflare Pages applies `_redirects` before checking for a real asset (existing project
knowledge, same mechanism already documented for the historical retirements in that file), and the
deleted page means nothing can shadow the rule either way.

**C — "five current public services, unchanged order" (AGENTS.md §2.2.6 route table, doc 30) vs.
"append Estate Cleanout as the sixth public service" (blueprint).** The public
`/estate-cleanout-san-jose/` page already existed, fully built (a bespoke, extensively documented
gold-standard page, not the generic template), but had never been added to
`launchArchitecture.ts`'s `launchServiceLinks` — so it was invisible in the header dropdown and
footer, and (a pre-existing gap this pass also closes) it inherited `noindex` from
`isLaunchPublicPath`/`BaseLayout` and was absent from `sitemap.xml`. Resolution: the blueprint's
instruction is additive, not a conflict with anything the five-service table actually decided
(it does not forbid a sixth service, only describes the five that existed at the time). Estate
Cleanout joins `launchServiceLinks` as the sixth, ordered last per the blueprint's explicit
"Preserve the relative order of the five current public services and append the newly requested
Estate Cleanout service." This single data-file change is what fixes the pre-existing indexation
gap, since `launchPrimaryPaths` spreads `launchServiceLinks`' hrefs.

**D — "never a giant minimum-height copied from an old mockup" (doc 30 §3) vs. "mandatory shared
hero sizing... 600/560/440px" (blueprint).** Resolution: not a real conflict once read precisely —
doc 30 §3 amended in place to say so. The old warning targets a *fixed* height that clips or hides
content; the blueprint's floor is a *minimum*, applied to a hero whose content region
(`.acx-hero__shell` / `.acx-phero__shell` / `.ec-hero__shell`) stays in normal document flow, so a
page whose approved copy needs more room still grows taller instead of being clipped or
compressed. Both rules are satisfied simultaneously by a `min-height` rather than a `height`.

### What changed

**Shared hero sizing** — `src/components/ac/AcHeroWithForm.astro`, `src/components/ac/AcPageHero.astro`,
`src/pages/estate-cleanout-san-jose/index.astro` (`.ec-hero`), and `src/components/ppc/PpcBrightHero.astro`
(`.est-hero`, the estate campaign's own hero) all gained the same stepped rule set: `min-height`
440px base / 560px at `min-width: 48rem` (768px) / 600px at `min-width: 64rem` (1024px), and a
matching stepped content inset (40px / 48px / 64px, replacing several pre-existing flat or fluid
`clamp()` values that did not land on the blueprint's exact breakpoints). This reaches all nine
public marketing pages the blueprint names (home; hoarding, extreme cleaning, deep cleaning, crime
scene & trauma, rodent and estate cleanout service pages; About; Contact — the first four service
pages and the homepage via `AcHeroWithForm`, rodent/About/Contact via `AcPageHero`, estate via its
own component) plus the two reviewed campaign pages (rodent assessment via `AcPageHero`, estate
assessment via `PpcBrightHero`). The estate service page's hero (`.ec-hero`) also moved from
`display:flex; align-items:center` (vertically centering its copy) to normal top-aligned block flow
with the same stepped padding, matching the blueprint's "Align text from the top inset rather than
vertically centering different amounts of copy" and the other eight pages' own approach. No copy
was changed on any of these pages; only the measured geometry.

**Homepage (`src/pages/index.astro`), full rewrite** to the blueprint's 11-section order. Every
sentence from the previous homepage's `home.intro`, `home.why`, `home.scope`, and `home.steps` data
is preserved somewhere on the page (see the file's own header comment for the exact mapping); two
structural, minimal edits were required to fit the blueprint's mandated shape and are called out
explicitly in that comment and below:
  - Section 3 ("Why Aseptaclean") combines the former standalone "difference" intro and the
    founder "Why" split into one 45/55 (text-left/image-right) section, per the blueprint's own
    "'The difference' and current founder/Why material become the early Why section." `home.why.close`'s
    three sentences become the section's "up to three brief evidence/benefit rows."
  - The homepage process (section 7) is consolidated from five steps to four, per the blueprint's
    explicit "Replace five narrow process columns with four concise steps." Steps 2 and 3 ("We
    review the condition." / "We define the work.") merge into one step with both bodies
    concatenated verbatim; steps 1, 4 and 5 are otherwise unchanged. This is a homepage-only
    change — the four sibling service pages' own process sections are untouched.
  - The former standalone dark "Scope" band (`home.scope`) is folded into the process section as a
    "what you will know before we start" block — heading, lead, body, the seven scope questions,
    and the pull quote all preserved verbatim, per "The oversized 'Scope' block becomes concise
    written-plan proof within Why and process."
  - The homepage FAQ (`home.faq`, six questions plus the rebuilt service-area answer) moved to
    `/contact/` rather than being deleted, per "Existing standalone homepage FAQs can move to
    appropriate service/Contact content... Do not destroy useful answers or leave stale FAQ
    structured data." `/contact/` gained a new FAQ section (`AcIntro` + `FaqAccordion`) and its own
    `FAQPage` JSON-LD; the homepage no longer emits one.

**New homepage sections** (not present before this pass):
  - "Who We Help" (45/55, text-left/image-right): four audience groups per the blueprint's own
    proposed labels (homeowners and families; executors, trustees and fiduciaries; property
    managers and landlords; businesses and facility managers), each with one newly drafted
    sentence describing the cleanup need only — flagged as new copy below.
  - Two `AcCtaBand` sections (new shared component, `src/components/ac/AcCtaBand.astro`): a compact
    deep-navy band after Who We Help (one new one-sentence invitation, flagged below) and a
    warm-white/fine-divider band before the contact form, reusing `home.final.heading`/`body`
    verbatim as a *different* heading from the contact form's own ("Tell us about the property.",
    `site.offer.formHeading`) — satisfying the blueprint's "Its heading invites action; the next
    section's heading identifies the form. Do not repeat the same heading twice."
  - Service Area, restructured to text-left (~40%) / two grouped city lists right (~60%) — South
    Bay (8 cities) and Peninsula (Palo Alto, Atherton) — rather than a single five-column city
    grid. No map asset exists anywhere in this repository (`find src/assets public -iname
    "*map*"` returns nothing); the blueprint's own fallback — "If an appropriate map asset is
    unavailable, use two neatly grouped city lists; no decorative empty map box in production" —
    governs. The South Bay/Peninsula split is the same distinction AGENTS.md §3 already uses to
    reject "Santa Clara County" as the region label (Atherton is San Mateo County).

**Estate Cleanout added to navigation and the homepage card grid.** `launchServiceLinks`
(`src/data/launchArchitecture.ts`) gained a sixth entry, which automatically reaches the header
dropdown, the footer Services column, `launchPrimaryPaths`, and therefore `sitemap.xml` (see
Conflict C above). The homepage's service-card grid moved from `AcServiceCards`' "five" layout
(3+2 centered) to a new "six" layout (plain 3×2 desktop / 2 tablet / 1 mobile, per the blueprint)
and gained a sixth card whose description is the public estate page's own hero lede, reused
verbatim (not new copy) so the card and its destination open on the same statement. A "Help Me
Choose a Service" text link was added beneath the grid, linking to the homepage's own contact form
— the blueprint's required bottom CTA, replacing the retired hub's "View All Services" link.

**Services hub retirement.** `src/pages/services/index.astro` deleted. `public/_redirects` gained
`/services/ → /#services` (301). `src/data/launchArchitecture.ts`: `launchPrimaryNavLinks`'
"Services" entry now points at `/#services` instead of the deleted route; `/services/` removed
from `launchPrimaryPaths`. `Header.astro`'s desktop/mobile Services-dropdown branch now matches on
`link.label === "Services"` instead of `link.href === "/services/"` (the href changed, so the old
check silently stopped matching — label-based matching survives any future destination change).
`Footer.astro`'s "Company" column "Services" link now points at `/#services`. The BreadcrumbList
JSON-LD on the four `AcServicePage`-rendered routes and on the rodent page's own hand-duplicated
schema both had a "Services" node pointing at the now-deleted `/services/`; removed (no other real
hub sits between Home and these five pages, so the trail now goes Home → the page directly, the
same shape the estate page's own breadcrumb already uses with its real `/property-clearing/`
parent). The homepage's services section carries the stable `id="services"` the blueprint
requires; `AcIntro.astro` gained an optional `id` prop to make that possible (previously silently
dropped any `id` passed to it). Dead code identified but deliberately NOT touched, since nothing
renders it and editing it carries risk for zero behavior change: `src/data/site.ts`'s `megaNav`
and `navigation` exports, `src/data/servicePages.ts`'s separate `servicesHub` record, and roughly
a dozen orphaned `Services*`/`HomeService*` components (`HomeServiceGrid.astro`, `WhatWeHandle.astro`,
`ServicesHero.astro`, etc.) — none has a live importer under `src/pages/`, confirmed by import-graph
search before this pass, so none was a "consumer" this retirement needed to update.

**Estate assessment landing page (`/estate-cleanout-san-jose/assessment/`) — form moved out of the
hero.** The blueprint's campaign review is explicit: "Apply the owner's earlier direction: text
left, meaningful image right, call and form-anchor buttons, one centered form near the bottom."
`src/components/ppc/PpcBrightHero.astro` gained an additive `image`/`imageAlt` prop pair (defaulted
so its behavior is unchanged when omitted — it has exactly one consumer today) that swaps the
`slot="form"` column for a 4:3 photograph. The page now passes the public estate page's own hero
image (`hoarding-garage-contents.png`) rather than either of the two illustrations used one and two
sections below the hero (both are already placed elsewhere on this same page; reusing either in the
hero would put the same image in two sections a scroll apart). The `PpcHeroForm` that used to render
inside the hero moved to the former "07 · LET'S MAKE A PLAN FOR THE HOUSE" section, which kept that
section's own approved `copy.final.heading`/`body`/`areaLine` as its introduction (reused, not
duplicated) and gained the actual working form beneath it — the same "reuse approved closing copy as
the contact introduction" pattern the 2026-09-17 entries above established for the sibling service
pages and the homepage. That section's background moved from deep navy to the shared warm-paper
surface those relocated contact sections use, since it is now a real form panel (`tone="light"`)
rather than a dark closing statement.

**Duplicate-ID fix, same pattern as the 2026-09-17 entries.** The section wrapping the relocated
estate form keeps the literal id `copy.formId` ("request-walkthrough") — the sticky bar's
`stickyFormHref`, every in-page "walkthrough" CTA, and the Analytics.astro click-tracking regex all
target `#request-walkthrough` and must keep resolving to the section so its heading stays visible on
scroll. The `<form>` itself (via `PpcHeroForm`) received a distinct, purely-internal id
(`request-walkthrough-panel`). Verified: zero duplicate DOM ids on the built page.

**FAQ container fix, applied broadly.** The blueprint's evidence review flags the same defect on
five separate routes (rodent, and by the same mechanism the four `AcServicePage` routes, plus this
session's new Contact FAQ): "Heading is centered across a broad area while the accordion occupies
the left portion, leaving a disconnected right void." `AcIntro.astro` gained an additive `narrow`
prop: when set, the heading and the slotted content share one centered ~820px container, both
left-aligned, instead of a centered ~992px heading sitting above a separately-positioned slot.
Applied to `AcServicePage.astro`'s FAQ section (reaches hoarding, extreme cleaning, deep cleaning,
and crime scene & trauma), the rodent service page's own FAQ, the rodent assessment landing page's
FAQ, and the new Contact FAQ. Every other `AcIntro` caller omits the prop and is unchanged.

**45/55 split and 3×2 card grid, as reusable component options rather than one-off CSS.**
`AcSplit.astro` gained an additive `splitFr` prop (`readonly [number, number]`, default `[1, 1]` —
50/50, every existing caller unchanged) so a caller can request an exact fr ratio instead of the
component's default equal columns; used with `reverse` (text-first DOM order) it gives the
text-left/image-right 45/55 split the blueprint requires for both "Why Aseptaclean" and "Who We
Help." `AcServiceCards.astro` gained a `layout="six"` option (plain 3-column grid, 2 at
`max-width: 74.9375rem`, 1 at `max-width: 40rem` — the same breakpoints its existing `"five"`
layout already uses) alongside the existing `"five"` (kept for any future caller) and `"even"`.

### New copy — flagged for owner review, per the blueprint's own instruction #6

Everything else on the rebuilt homepage and the estate campaign hero is either unchanged source
copy (via `src/data/publicCopy.ts`) or reused verbatim from another already-approved page (the
Estate Cleanout homepage card description, and the estate campaign hero's reused image). The
following strings are new, minimal, and were checked against AGENTS.md §0.3/§7 and doc 21 before
writing (no claim, price, credential, guarantee, or service not already described elsewhere on the
site):

  - "Who We Help" section lede: "Families, fiduciaries, property managers and businesses all reach
    Aseptaclean the same way — by telling us what is happening at the property."
  - The four audience one-sentence descriptions under "Homeowners and families," "Executors,
    trustees and fiduciaries," "Property managers and landlords," and "Businesses and facility
    managers" (see `src/pages/index.astro`'s `audiences` constant for the exact wording). The four
    group *labels* are the blueprint's own proposed text, not new.
  - The first CTA band's heading/invitation: "Not sure where to start? You do not need to know the
    name of the service before you contact us." (the second clause is `home.doorsIntro.lead`,
    already-approved; the first clause is new).
  - The homepage process section's one merged step title, "We review the condition and define the
    work." (both step *bodies* underneath are unchanged verbatim source text).

### Verification

  - `npm run check` — 0 errors (11 pre-existing hints/warnings in unrelated files, unchanged by
    this pass).
  - `npm run build:local` — 54 pages built (was 55 before this session; the retired `/services/`
    page accounts for the exact difference), no errors.
  - `grep` against `dist/`: zero duplicate `id` attributes on the homepage, the estate service
    page, and the estate assessment landing page; `id="services"` present on the homepage;
    `/services/` absent from the build output; `/services/` redirect rule present in the copied
    `_redirects` file; `estate-cleanout-san-jose` present in the homepage's rendered dropdown/card
    markup; the Contact page's FAQ section renders with the expected heading id.
  - Full route-level browser verification (desktop/tablet/mobile viewport screenshots, dropdown
    and redirect interaction, safe-mode form behavior) is recorded separately in this session's
    final report to the owner rather than duplicated here.

### Not changed

  - `functions/api/lead.ts` and the rest of the canonical backend, all form field names, required
    states, consent text, upload limits, and analytics event definitions.
  - The hoarding assessment landing page (`/hoarding-cleanup-san-jose/assessment/`) — the blueprint
    explicitly says it "still needs its own review when its current screenshots or source are
    available," so it is untouched by this pass.
  - Page-specific composition changes the blueprint recommends for the four `AcServicePage` routes
    individually (Detailed Deep Cleaning's three-room-column checklist restructuring, Extreme
    Cleaning's repeated-explanation consolidation, Crime Scene & Trauma's 2×3 situations grid,
    Hoarding's process/pricing refinements) and for About — these are real, itemized
    recommendations in the blueprint that this pass did not implement, given the volume of
    higher-priority, explicitly-enumerated work (homepage rebuild, hub retirement, Estate Cleanout
    launch, shared hero sizing, campaign form relocation) completed in the same session. Each is a
    smaller, page-scoped follow-up.
  - No service claim, price, credential, meta title/description, canonical, indexing rule beyond
    what Conflict C already required, legal wording, or campaign offer. Nothing deployed.

### Blockers / follow-ups for a separately authorized session

  - Real end-to-end submission (Turnstile solve, live `/api/lead`, confirmation email) for the
    estate assessment landing page's relocated form was not exercised — same standing reason as
    every other relocated form in this log: requires the deployed Cloudflare Pages Functions
    environment and explicit authorization before a real test lead is sent.
  - The four page-specific `AcServicePage` refinements and the About page recomposition listed
    under "Not changed" above remain open work, each requiring its own focused pass.
  - The "Who We Help" section's four descriptive sentences and the first CTA band's invitation
    sentence (listed under "New copy" above) are drafted, minimal, and claims-checked, but have not
    been separately owner-approved as locked marketing copy the way `docs/aseptaclean-all-website-copy.md`'s
    strings have.

---

## 2026-09-18 (same day, second decision) — Blueprint expanded in place into a literal MUST/MUST-NOT
## specification mid-session; DOM/CSS contract reconciled against the entry above's implementation

While the entry above's implementation was already complete and mid-QA, the owner expanded
`docs/Aseptaclean_Website_Design_Blueprint.md` **in place**, roughly doubling it (476 → 987 lines)
into a formal MUST/MUST-NOT contract with exact CSS to install (§8), exact per-page section-ID
matrices for the homepage and all six service pages (§3–§4), a browser-acceptance contract with a
read-only DOM measurement helper (§12.4), required tracking documents (§1), and a §14 "pasteable
implementation instruction" restating the task. The owner's live instruction accompanying this
directed: "Read the entire attached specification before editing. Implement it exactly... Follow
the implementation instruction in section 14."

### Conflict: a completed, verified implementation vs. a newly-literal contract for the same work

A: The entry above — a complete, verified homepage rebuild, hub retirement, Estate Cleanout launch,
shared hero sizing, and campaign form relocation, built against the *original* (pre-expansion)
blueprint text, using the repository's existing `Ac*`/`.acx-*` component and class system.

B: The expanded specification's §8 ("This is CSS, not pseudo-code... do not substitute approximate
styling") and its own §0.3 ("MUST NOT... substitute your own design"), which read literally as
requiring the exact `.ac-site`/`.ac-hero`/`.ac-split`/etc. class contract to be installed and
attached across the site.

**Resolution: both stand, reconciled via the spec's own explicit escape valve.** Spec §7 states
"Reuse suitable existing components rather than creating parallel implementations... filenames may
match existing names" and §8 permits "If an existing component uses different names, attach these
classes or document an exact mapping; do not substitute approximate styling" — an explicit
either/or. The already-completed work (entry above) was not thrown away and rebuilt against a
parallel class system; instead:

1. The exact numeric contract (§2.1's pixel/breakpoint table) was verified against the existing
   implementation and corrected where it measured wrong (see "What changed" below) — the *values*
   are now exactly compliant, independent of which class names carry them.
2. The exact DOM contract needed for the spec's own §12.4 measurement helper to run (`.ac-site`,
   `.ac-hero`, `.ac-hero__copy`, `.ac-split`, `.ac-split__text`/`__media`, `.ac-dropdown__panel`,
   `main > section` with `data-section`/`id` matching the exact expected array) was attached as
   *additional* marker classes on the real elements, not a replacement of the working classes.
3. Everywhere the two structural contracts (existing whole-card-link service cards; the five
   pre-existing service pages' internal section matrices; About/Contact's exact section IDs) could
   not both be satisfied without a much larger rebuild, the gap is recorded explicitly rather than
   claimed closed — see `docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md` §10's "Honest scope statement."

This is the same rule this log applies repeatedly: a later, more specific owner instruction wins
within the scope it actually decided, but where it explicitly offers an equivalence path (§7/§8's
"or document an exact mapping"), taking that path over a costlier literal rewrite is compliance,
not a deviation — provided the equivalence is actually documented, which it now is.

**Type:** owner specification substantially expanded mid-session, read in full, reconciled against
already-completed work via the spec's own documented-mapping allowance → four new tracking
documents created, DOM/CSS contract partially attached, one real defect found and fixed (see
below), one real gap disclosed rather than hidden.

### What changed as a direct result of re-reading the expanded spec

- **`docs/ASEPTACLEAN-DESIGN-SPEC.md`** created — a byte-identical canonical copy of the (now
  expanded) blueprint file, at the exact path the spec's own §1 requires.
- **`docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md`, `docs/ASEPTACLEAN-COPY-MAP.md`,
  `docs/ASEPTACLEAN-DESIGN-QA.md`** created — the three tracking records §1 requires.
- **AGENTS.md §0.4 and `CLAUDE.md`** updated to carry the spec's §11 rule text verbatim (previously
  they carried an earlier, differently-worded rule drafted from the pre-expansion blueprint text).
- **A real, measured defect was found and fixed: hero-height inequality across pages.** Re-measuring
  against the spec's exact 1440/820/390 viewport table (rather than the earlier, less rigorous
  spot-check) showed the nine-page/two-campaign hero heights were NOT equal at the original
  600px-desktop/560px-tablet target — Extreme Cleaning's approved copy naturally renders at 736px
  desktop / 589px tablet, taller than every other page. Per the spec's own §2.2 repair rule, the
  shared token was raised to 736px desktop / 592px tablet (the next 8px increment) across all four
  hero implementations (`AcHeroWithForm`, `AcPageHero`, the estate service page's `.ec-hero`, and
  the estate campaign's `.est-hero`) and re-verified: **exact 0px-variance equality at both
  breakpoints on 10 of 11 reviewed pages**, with one disclosed exception (below). Two pre-existing,
  previously-unnoticed page-specific `min-height` overrides on the estate service page (500px at
  `≤70rem`, 460px at `≤44rem`, both predating this session) were found during this pass and removed
  — they were silently winning the cascade over the shared floor.
- **One disclosed, unresolved exception**: the estate campaign's hero uses the spec's permitted
  "split" composition (text/image side by side), with its own internal stacking breakpoint at
  992px — wider than the tablet range's ceiling (1023px) but positioned such that an 820px
  viewport is already in its stacked (much taller) layout. Root-caused, not fixed this session
  (would need a readability check of the 54/46 columns at 820–991px width); recorded in
  `docs/ASEPTACLEAN-DESIGN-QA.md` §2.
- **DOM/CSS contract**: `src/styles/aseptaclean-layout.css` saved (the spec's exact §8 CSS,
  verbatim, as a reference file — not loaded, same treatment `docs/styles/website-reference.css`
  already gets per AGENTS.md §1.1, for the identical reason of not running two independent global
  stylesheets against one production site). `.ac-site` attached to `<body>`; `.ac-hero`/
  `.ac-hero__copy`/`.ac-split`/`.ac-split__text`/`.ac-split__media`/`.ac-dropdown__panel` attached
  as additional marker classes alongside their existing classes on the relevant components; the
  homepage's nine `main > section` children given the spec's exact `id`/`data-section` values
  (hero, why, services, who-we-help, cta-mid, process, service-area, cta-close, contact) — required
  wrapping the hero and trust strip in one outer section, since the spec counts them as one part.
  `AcSplit.astro`, `AcIntro.astro`, and `AcCtaBand.astro` each gained additive `id`/`dataSection`
  props to make this possible without hardcoding markup per page.
- **Full re-verification** run against the corrected build: `npm run check` (0 errors), `npm run
  build:local` (54 pages), and a Playwright sweep across all 11 reviewed routes at 1440/820/390
  reproducing the spec's own §12.4 measurement helper. Zero horizontal overflow, zero duplicate
  DOM ids, exact homepage section-order match, six correct dropdown links, confirmed `/services/`
  redirect (fragment survives), confirmed estate campaign hero has no form and does have an image,
  confirmed its bottom form anchor resolves and scrolls correctly, confirmed the relocated Contact
  FAQ renders 7 accordion rows. Full results, per-route hero-height table, and the explicit "not
  verified this session" list are in `docs/ASEPTACLEAN-DESIGN-QA.md`. Screenshots:
  `artifacts/design-spec-2026-09-18/`.

### Not changed by this reconciliation pass

Nothing from the entry above was reverted or rebuilt from scratch. No copy was rewritten. No new
claim, price, or credential was introduced. The five pre-existing service pages' internal section
structure (spec §4.1–§4.5's exact matrices) and About/Contact's exact section IDs (§5.1/§5.2) were
not rebuilt — this is the single largest disclosed gap, spelled out route-by-route in
`docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md` §10 rather than left implicit. Nothing deployed.

---

### 2026-09-18 (later the same day) — `aseptaclean-home.css` installed, homepage only

A distinct, later owner instruction attached a second, simpler, self-contained CSS file
(`docs/aseptaclean-home.css`) with its own `.ac-home`-scoped class/DOM contract, and asked for it to
be installed literally (saved at `src/styles/aseptaclean-home.css`, imported once, homepage markup
restructured to carry its classes) rather than mapped onto the existing component system the way
§ "Implementation-map §11" — i.e. the entry immediately above — mapped the sitewide spec's own CSS.
Full narrative, class-by-class mapping, and every conflict resolution:
`docs/ASEPTACLEAN-IMPLEMENTATION-MAP.md` §11. Checks actually run: `docs/ASEPTACLEAN-DESIGN-QA.md`
§8. Summary of the material resolutions, since this file is the required record of "what conflicted
and what you did about it":

1. **No mockup image was attached or found.** Reported to the owner rather than guessed; the CSS
   file's own header comments and DOM contract were used as the structural reference instead.
2. **Hero minimum heights 560/520/440px supersede the 696/680/440px figure this same file recorded
   earlier today**, but for the homepage only — an explicit, same-day, more specific owner
   instruction ("do not carry over the older 736px rule") wins under this file's own precedence
   rule (later explicit instructions supersede). `AcHeroWithForm.astro`, still used by the four
   sibling service pages, was not touched; the homepage stopped calling it instead.
3. **Type Law conflict, resolved in favor of Type Law.** The attached file sizes every heading via
   bare-tag/class+element selectors (`.ac-home h1`, `.ac-home .ac-cta h2`, etc.) — precisely what
   AGENTS.md's zero-exception Type Law forbids, confirmed with an isolated, independent browser
   check before concluding it was real. Resolved by moving every such value into a same-valued,
   standalone `.ac-type-home-*` role class (full table in the implementation map) — the file was
   installed literally as attached, then this one mechanism was corrected, not its numbers, colors,
   spacing, or DOM shape. This is the smallest concrete resolution available: AGENTS.md §0 states
   its rules "override any default behavior," and this repository's own instructions direct running
   the `type-law` skill/check on exactly this kind of change rather than shipping around it.
4. **Header and Footer were not restructured to the new contract and are excluded from `.ac-home`'s
   scope** (applied to `<main>` only, not `<body>`) — both to avoid the Type Law violation Footer's
   existing `.ac-type-label-head`-sized column headings would otherwise trigger, and because both
   are shared, working, sitewide chrome that an explicit "preserve … working navigation" instruction
   and the homepage-only scope of this task both argue against touching. Disclosed, minor,
   unresolved consequence: Header's existing 1184px nav breakpoint is ~16px narrower than the new
   file's own 1199px breakpoint.
5. **Two class-name collisions with `src/styles/global.css`** (`.ac-eyebrow`, `.ac-split`) were
   found by systematically diffing the new file's class list against the existing global
   stylesheet, not only by visual discovery. `.ac-eyebrow` was a real, visible defect (light text on
   a light pill-chip background, inherited from an unrelated ~20-site pill-chip utility) and was
   fixed inside the new file's own rule, not by editing the shared global one. `.ac-split` was
   checked and found benign (the new rule's higher specificity covers every property the colliding
   rule also sets).
6. **Found and fixed, unrelated to the CSS itself:** `scripts/type-law-check.mjs`'s Rule 1 silently
   always passed on current Chrome (CSS Nesting gives ordinary style rules an empty-but-truthy
   `.cssRules`, which the walker misread as "this is a container, skip it"). Fixed and re-verified
   against four routes with no new false positives — left broken, it would have given false
   confidence on every future typography change.
7. **Found, not fixed — pre-existing, sitewide, out of scope:** a 23px horizontal overflow at 320px
   caused by the Cloudflare Turnstile widget rendering at a fixed ~300px in this local/unverified
   environment. Reproduced identically on `/contact/`, a page this pass never touched, confirming it
   predates this session and is not homepage-specific.

Not verified this pass: 200% zoom; a live lead submission (would require an actual Turnstile pass
and send a real lead — not run without separate authorization). Nothing deployed; no `git push`.

## 2026-09-18 — Homepage correction to the approved mockup

Authority: the owner's explicit correction request (`pasted-text.txt`, attachment
8beecc71-a2e6-4004-a77f-5eb2e7398041) and subsequently supplied
`ChatGPT Image Sep 18, 2026, 10_43_54 AM.png`. A review copy of the reference is at
`output/homepage-correction/approved-mockup.png`.

The request supersedes the prior homepage copy-preservation ruling and the previous decision to
exclude shared chrome from homepage styling. Homepage-only variants now cover header, main,
footer, and the existing form. The supplied homepage CSS's 560/520/440px hero minimums apply;
mobile grows for text. Other routes keep their existing hero sizes and presentation.

The homepage uses the exact requested headline, supporting copy, Why section, process, CTA and
form wording. This includes the explicitly requested affirmative “Biohazard remediation” hero
sentence, a current owner display instruction superseding doc 21's earlier limited display
exception **on this homepage only**; no regulatory capability or credential was independently
inferred. Registration remains the verified trauma scope. The trust strip carries CDPH / TSW 933,
owner operation, and written plan/price; no insurance or response-time promise is added.
“Request an Assessment” is now this homepage's form CTA and actual submit-button label. Shared
offer data and other pages' CTA labels are unchanged. The long biography and scope/pricing block
were removed from this page, not from About or service pages.

The form retains its id, route attribution, required fields, CRM values, consent, anti-spam,
`/api/lead` endpoint and genuine success redirect. Optional photos use the existing
`property_media[]` backend/R2 contract; the lead endpoint was not edited. Homepage Turnstile uses
its supported compact size (150px wide) to fit the 280px form at a 320px viewport. Actual widget
errors now produce a visible failure message and disabled submit button; a successful challenge
restores it. Local preview fails hostname authorization (110200); no production submission was
made. The existing backend is preserved, not replaced by a preview simulation.

No suitable approved individual photos exist here for the mockup's technician hero,
work/documentation split or customer consultation split. The two split-image slots ship empty;
the hero retains the existing owner-supplied property-condition image. Service cards retain the
existing condition illustrations. No generated people, cropped mockup fragments or unrelated
stock figures were substituted. These gaps prevent an exact visual-match claim.

Actual browser evidence, checks and remaining differences are in
`output/homepage-correction/REVIEW.md` and the appended design QA record. No push or deployment.
Repository rules, source copy files, canonical routes and unrelated page sources were not edited
for this correction. Pre-existing uncommitted changes were preserved.

Side-by-side refinement: the mockup's approximately 96px desktop gutters map to a 1248px
content maximum at 1440px. Desktop section padding is 36px (44px tablet/mobile) to remove the
rejected stylesheet's excessive vertical space; hero minimums and typography role sizes remain
unchanged. Footer cities use two columns. Form rows use 16px gaps and a 112px minimum message
box, without shrinking labels, line heights or the 48px controls. The homepage photo-upload form
reuses the **existing** `legal.consentAssessmentAppendix` verbatim, as the other media-collecting
form already does. Its required consent base is unchanged. The homepage footer retains doc 21's
verbatim cleaning-only scope clause for the animal-waste card without lengthening that card.

## 2026-09-18 — Approved Rodent & Animal Waste public-page kit

Implemented the owner's attached request on the existing `/rodent-dropping-cleanup-san-jose/`
route, using `docs/rodent-approved-fragment.html` and the approved stylesheet/visual reference.
Kit files were found directly in `docs/`; the kit's START-HERE is `docs/START-HERE copy.md`.
Original kit files remain untouched. The public rodent page brief now points to these sources.

This is a later, explicit, route-scoped design/copy decision. It supersedes the older rodent body,
pricing sections, founder/related sections, shared fixed hero sizing, flat-overlay requirement and
CTA defaults for this public page. Its hero is content-driven and its CTA labels are `Request an
Assessment` and `Call (408) 785-7588`; the submit button also uses the approved assessment label.
No shared hero token, global navigation, route, indexation rule or campaign content was changed.
The approved city list remains page-local, including Menlo Park, Redwood City and San Mateo; this
owner-supplied coverage copy does not change shared business-location data or other pages.

Owner expressly requested the supplied illustrative subjects and crops. Extracted the embedded
photo grid and landscape documentation image byte-for-byte, retained their illustrative labels,
and created no new imagery. This narrow authorization does not permit fabricated job proof or
image generation elsewhere. The supplied assets themselves contain thin collage-edge strips;
those existing reference crop artifacts were retained rather than silently altering the images.

Integration overrides are deliberate: BaseLayout retains the actual shared header/footer/logo
instead of mockup utility/local navigation; all body assessment anchors use existing `#rodent-form`
to preserve analytics; unmodified PpcHeroForm preserves `/api/lead`, required/optional field states,
`Rodent droppings or animal waste`, uploads, consent, Turnstile, honeypot, attribution, existing fee
microcopy and `/thank-you/`. No demo area selector or demo success handler ships. Mandatory doc 21
§2.3 and §3.1 disclosures remain below the before-work scope columns without adding a section.

The stylesheet is imported only by this public route. Heading sizes use dedicated typography roles
at the exact reference values. Its Inter family maps to the existing local Inter Variable face;
the reference's Arial fallback wraps differently, so natural height is preserved without shrinking
or rewriting text. Inherited global paragraph measures are reset within the scope so the approved
local text widths prevail. Final reference cascade/contrast/landscape overrides remain ordered.

Updated the public rodent fixture in the existing copy-fidelity audit and added optional `ROUTES`
filtering; default still runs the full audit. Full audit currently stops at the already-retired
`dist/services/index.html` fixture; unrelated fixture migration is outside this task. Verification,
actual screenshots and integration limitations are recorded in
`docs/aseptaclean-rodent-approved/IMPLEMENTATION-PROGRESS.md`. No push, deployment or production lead.


## 2026-09-18 — Legacy estate-cleanout URL redirect

Owner requested permanent redirects for `/estate-cleanout` and `/estate-cleanout/` to the
existing estate campaign. Added two exact 301 rules in `public/_redirects`, both targeting
`/estate-cleanout-san-jose/assessment/`. The live destination returned HTTP 200 with no
redirect and declares that trailing-slash URL as canonical; the fresh build agrees.
No conflicting instruction required resolution. No old-address internal links were found
in source or built HTML, so no link edits were needed. Existing unrelated working-tree
changes were preserved. Rodent public/campaign source files are byte-unchanged from this
task's starting hashes; no page copy, layout, lead endpoint or form behavior was edited.

Verification: `npm run build` passed; `npm run check` passed (237 files, zero errors,
zero warnings, 14 hints). In `wrangler pages dev dist` on localhost:8792, both legacy
paths with and without query strings returned 301 directly to the destination, then 200
with no second redirect. Exact query-string preservation passed for UTM source/medium/
campaign, gclid, gbraid, wbraid, gad_source, encoded custom values and repeated parameters.
The destination HTML contains its expected canonical and request-walkthrough form anchor.
The public estate route and both rodent routes still returned 200. Built `_redirects`
matches its source; the built-HTML link scan found zero links to the legacy paths.

No push or deployment. Production redirect behavior must be checked after owner-approved
deployment; the redirect results above are from the local Cloudflare Pages runtime.


## 2026-09-18 — Estate redirect deployed and verified live

Owner authorized deployment after reviewing local test results. To preserve unrelated
uncommitted page changes, cloned production main into `/tmp/aseptaclean-redirect-deploy`
at `7637beb` and committed only the two estate rules plus their decision record. Pushed
`fd03f97` through the existing GitHub-to-Cloudflare Pages workflow. Production deployment
`6437cf4d-e736-4c62-8527-e9d6cddb7838` completed successfully at 23:48:59 UTC.

Live HTTP tests on aseptaclean.com passed for `/estate-cleanout` and `/estate-cleanout/`,
each with and without tracking queries: exactly one 301 to
`https://aseptaclean.com/estate-cleanout-san-jose/assessment/`, then HTTP 200 and no further
redirect. Destination canonical matches. Query strings survived byte-for-byte, including
utm_source, utm_medium, utm_campaign, gclid, gbraid, wbraid, gad_source, encoded values and
repeated keys. Evidence: `/tmp/aseptaclean-live-redirect-results.json`.
No unrelated local changes were deployed. No form submissions or notifications sent.
The original workspace remains on its prior commit with its pre-existing changes intact;
the production commit was made and pushed from the isolated checkout.

Durable live-test evidence: `output/estate-redirect/live-verification.json`. Both rodent
routes returned 200; comparison with the prior production deployment showed only the
custom domain Cloudflare email-obfuscation rewrite and its decoding script. Application
HTML otherwise matched. The production commit changes only `_redirects` and the decision log.


## 2026-09-19 — Homepage search metadata and business positioning

Implemented the owner's exact title/description in `src/pages/index.astro`, restored the existing
approved descriptor through `home.hero.eyebrow` in the current hero eyebrow, and preserved its H1,
body, images, CTA markup and CSS. Added the two owner-approved business descriptions to
`src/data/site.ts`. Both public and campaign footers use the short description and exclude only
visible disclaimer spans from snippets. `SeoHead.astro` adds the description to the existing
LocalBusiness entity and emits Twitter title/description from the page's own inputs; it has no
brand-appending template.

Conflict resolution: the current explicit owner wording supersedes doc 21's older three-role-only
positioning exception and doc 20's historical unchanged-SEO statement for these exact strings.
The controlling copy map and claims exception are updated. No credential or operating-scope fact
is inferred. Disclaimer text is preserved. No changes to routes, redirects, analytics, Ads, forms
or the lead endpoint. Existing unrelated uncommitted work is preserved.

Validation and screenshots: `output/seo-positioning/` and the matching entry in
`docs/ASEPTACLEAN-DESIGN-QA.md`. No push or deployment: the existing local-only authorization
remains in effect; this request did not explicitly authorize a production release. External
Google Business Profile, Nextdoor, LinkedIn and Thumbtack edits remain a separate task.


## 2026-09-19 — SEO positioning deployed and verified live

Owner explicitly authorized deployment. Isolated production main at `fd03f97` in
`/tmp/aseptaclean-seo-release`; committed and pushed only eight positioning/documentation files as
`d0b9c3e7cd248fe60fa95f825bf8a0b53a14e5c9`. The broader uncommitted homepage/service/form/design
work remains local and unchanged. Production already had the exact hero descriptor, so it needed
no hero change. The prior estate redirects are preserved. This supersedes the previous entry's
local-only deployment status for the scoped SEO changes, not for the unrelated redesign.

Cloudflare Pages production deployment `c4413de8-02e0-4033-bbef-47b491d5fce9` completed through
GitHub integration. Live normal and cache-busted homepage verified at 2026-09-19 17:45:34 UTC:
HTTP 200; exact title, meta and social descriptions; no duplicate metadata; exact descriptor and
business descriptions; one valid LocalBusiness with other fields unchanged; visible disclaimers
in two disclaimer-only data-nosnippet spans; canonical https://aseptaclean.com/; index, follow;
no blocking HTTP robots headers. Representative service/campaign checks and the prior estate
301 with tracking-query preservation pass. No real lead or external profile edit.

The isolated production candidate passes build, type, launch, copy and analytics-tag checks;
52-page metadata/route comparison and 204 responsive checks pass. Existing city publication
blockers remain outside release scope. Earlier workspace-only launch/copy failures do not occur
in this isolated release. All original file hashes were preserved before appending this record
and adding evidence. Original checkout remains on its prior commit to avoid disturbing edits.
Evidence and remaining limitations: `output/seo-positioning-deployment/REVIEW.md`,
`release.json`, `live-verification.json`, `live-extra-checks.json` and HTTP captures.


## 2026-09-19 — Build kits inventoried; implementation not started

Owner requested extraction, route inventory and one reusable installation checklist only.
Preserved the dirty working tree and extracted the 88-file r01 bundle byte-for-byte under
`docs/reference/build-kits-2026-09-19-r01/`, preserving all package folders. Read master index
and all ten package status/start files; verified 80 checksum entries. Route mappings,
provisional-copy status, source authorities, receipt/email integration gaps and future QA
are recorded in `docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`. The owner's request for this
checklist supersedes the homepage kit's historical prohibition on another progress document.
Older integration-document hero/assessment-route instructions are superseded by existing
AGENTS.md owner decisions; no retired route or layout was restored. No package installed,
no source/redirect/backend changed, no build or visual QA claimed, no push/deployment or sends.


## 2026-09-19 — Homepage build kit v1.2 installed locally

Owner requested only `aseptaclean-home`, preserving routes/navigation/form functionality and
prohibiting push/deployment. The kit's `01-APPROVED-COPY.md` controls homepage wording; its
final preview and CSS control composition. This scoped owner decision supersedes older homepage
CTA, hero equality, section-layout and imagery instructions. The supplied atlas is preserved
as illustrative imagery, never company-job evidence. Other pages retain their existing rules.

Installed the approved hero, full-width headings, horizontal service cards, Why points beneath
the unstretched image/text pair, 34-city area and bottom working form. Existing About/Contact
navigation destinations win over the kit's proposed destinations per the current user request.
Legacy anchors and assessment-click tracking remain working; metadata/JSON-LD/redirects/backend
are preserved. Header/footer use homepage slots; the shared form has an opt-in display variant.
The original slate focus color was 2.96:1 on white, repaired using the kit's darker slate.

Progress, exact changed files, source/role mappings, screenshots and actual checks are in
`docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, reused as requested rather than creating PROGRESS.md.
Build/type, homepage copy/metadata, responsive/accessibility, analytics and controlled endpoint/UI
checks pass. Live Turnstile/provider delivery is not verified locally; stale Services copy audit,
five estate launch-link findings and two unrelated 320px service-form overflows remain recorded.
No other package installed, no live inquiry/email sent, no push or deployment.

## 2026-09-19 — Estate public-service kit installation (local only)

Owner requested only `aseptaclean-estate-service` on `/estate-cleanout-san-jose/`, with the
advertising page untouched. The decoded `estate-service-preview.html` contains the exact
`estate-service-fragment.html`; the three style blocks retain their source order in one
route-scoped stylesheet. This later scoped instruction supersedes the old public estate copy,
shared hero sizing, CTA defaults and illustrative-image restrictions for this supplied reference
only. Preserve its explicit hero break, belongings steps/caption, landscape documentation crop,
Stanford Health Care/BioMarin founder passage, quiet strip, seven FAQs and 34-city list. No new
numeric pricing, free offer, employer endorsement or wider service capability is authorized.

The real logo and public navigation destinations replace preview chrome. Mandatory documentation,
founder, disposal, pest and scope qualifications remain visible. Footer policies and cookie
preferences remain functional. Existing metadata/canonical/indexation remain; FAQ structured data
now follows the actual approved answers, and breadcrumbs use the public home/estate hierarchy.

The bottom form uses the existing `AcCompactForm` with an opt-in estate display/mapping variant.
Its six approved need choices map to `Inherited or estate property`; the selected need is prepended
to the supported `property_detail` payload so it is not lost. Other callers retain their field
choices and submission behavior. Required consent, multipart photos, anti-spam, idempotency,
security checks and server-accepted receipt routing remain. The new local CTA anchor is included
in the existing analytics intent event. The protected endpoint is unchanged.

Only this package is installed; campaign source, pricing, offer, form and assets are unchanged.
Actual checks, screenshots and any unresolved verification are recorded in
`docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, under “Estate service installation”. No push,
deployment, live inquiry or production email is authorized or performed.


## 2026-09-19 — Hoarding public service package installed locally

Owner requested only `aseptaclean-hoarding-service` on `/hoarding-cleanup-san-jose/`, using its
fragment and preview. This scoped decision supersedes older hoarding copy, CTA and shared hero
geometry defaults. Preserved both exact hero phrases, full-width headings, supporting processes
below both columns, quote-only section, seven FAQs and bottom form. No starting prices/tiers or
advertising offer imported. Supplied illustrative images are retained as illustrations, not proof.

Page-scoped styles/header/icons preserve the fragment; local Inter, real navigation/logo,
mandatory qualifications and the existing production form replace demo integrations. A tablet
photo-overlay contrast repair changes no copy or dimensions. Submit remains Send Message under
the standing form rule. Hoarding need selections map to the existing enum and message; actual
optional photo uploads use the existing upload contract. Endpoint untouched; advertising page
source untouched. Full checks, screenshots, live-delivery limitations and an intermittent
advertising-mobile overflow observation are recorded in `docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`.
No push, deployment, live lead or other package installation. Existing unrelated edits preserved.

## 2026-09-19 — Install only the approved rodent public-service kit

Owner requested `aseptaclean-rodent-service` on `/rodent-dropping-cleanup-san-jose/`, using its
fragment and preview, with no push/deployment. This latest scoped package replaces the older
rodent composition/copy, hero sizing and default marketing CTA wording on that public route only.
The exact $500 small-job / $1,500 larger-job starting prices and $145 assessment credited toward
cleanup if the customer proceeds appear in their approved pricing/FAQ/form locations. No added
expiry, price ceiling or location-based price category. The advertising route and its offer/data
remain unchanged.

Installed the original CSS cascade once, local Inter, byte-preserved illustrative JPEGs and existing
SVG icons. Kept the 3:2 documentation crop, full-width headings, attic points and belongings steps
beneath both columns, centered single-column FAQ and bottom production form. Existing shared
Header/Footer, six-service menu, logo, policies and cookie controls remain; the supplied utility
bar is route-local. Existing mandatory animal/pest scope qualifications remain beside exclusions.
Supplied photos remain accessible illustrations, not completed-job evidence. These package-specific
assets and geometry supersede older reference restrictions only for this explicit installation.

The demo handler/consent were not installed. `PpcHeroForm` retains `rodent-form-panel`, original
`entry_route` ending `#rodent-form`, endpoint, frozen service enum, validation, uploads, consent,
Turnstile, idempotency, analytics and accepted-response thank-you flow. A default-empty named slot
adds the package's required Affected Area selector only here; a page-local `formdata` handler carries
it losslessly in `property_detail`, without adding a backend enum. All assessment links focus the
bottom form. Submit uses standing production label **Send Message**; assessment links retain
**Request an Assessment**. Analytics recognizes the new `#rodent-contact` anchor alongside the
preserved old anchor. No endpoint or advertising-page source edits.

Verification and exact paths are recorded in `BUILD-KITS-INSTALLATION-CHECKLIST.md`, rodent install
entry, with evidence under `output/rodent-service-install/`. Local browser submissions are intercepted;
no production inquiry, CRM delivery or email was sent. Stop after this package; nothing pushed or
deployed. Other pre-existing work is preserved.

## 2026-09-19 — Trauma public-service kit installation (local only)

Owner requested only `aseptaclean-trauma-service` on the existing
`/crime-scene-trauma-cleanup-san-jose/` public route. Implemented the approved
`trauma-service-fragment.html`; the decoded standalone preview contains that exact fragment
and is used only as visual evidence. Original package files are unchanged.

Within this route, the latest owner request supersedes the older service matrix, shared hero
height, default marketing CTA wording, and older trauma imagery. Preserve the package's exact
hero, attached trust strip, six situations, support section, belongings decision row, navy band,
four process steps, scope section, centered FAQ, 34 cities, closing strip and bottom form.
No numeric price, assessment fee, or free offer. Registration remains the verified TSW 933
trauma scope; treatment language does not promise a health/safety outcome or insurance payment.
The supplied images are retained byte-for-byte as illustrative service visuals, never job proof.
The preview's thin image-sheet edge strips are preserved, not replaced or retouched.

Production adaptations: real logo, existing six public service destinations, local Inter,
inline SVG icons, configured telephone links, working policy/cookie controls and mandatory
scope/documentation disclaimers. Keep the standing **Send Message** submit label and original
service-form consent. The approved optional message and photos use `AcCompactForm`'s opt-in
`traumaKit` branch: six cleanup labels map to the frozen `Crime scene or trauma cleanup` CRM
value and are carried in `property_detail`, allowing an empty optional message without changing
the backend schema. Retain `service-form`, route attribution, Turnstile, idempotency, timestamps,
validation/error handling and accepted-response redirect. Use Turnstile's supported compact size
on this route. No endpoint/provider edits or live inquiries.

Typography remains in `.ac-type-trauma-*` roles within `#ac-trauma`; one imported stylesheet
preserves the fragment's cascade. Measured photographic contrast required a stronger desktop/
tablet navy overlay; geometry, typography, wording and image positions are unchanged. The
existing type-law script misclassifies scoped role selectors; a QA-only copy recognizes the
root-qualified roles and verifies actual CSSOM matches. No weakening of the standing law.

Verification and evidence are in `docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, trauma installation
entry, and `output/trauma-service-install/`. Other packages, campaign pages, global styling,
route/indexation data and protected functions are untouched. No push or deployment.

## 2026-09-19 — Extreme public service kit installed locally

Owner requested only `aseptaclean-extreme-service` on the existing
`/extreme-cleaning-san-jose/` public route. Its exact fragment and matching exported preview now
control this route's copy, section order, hero blocks, geometry, image proportions and marketing
CTA labels. This supersedes the earlier generic service-page copy/shared hero sizing within this
route only. No numeric pricing, fee or another service's wording was introduced.

Production adaptations retain canonical/metadata/indexation, public service destinations, actual
logo and configured phone, mandatory scope/documentation/legal notices, provider controls and the
existing form contract. Submit remains `Send Message`; six approved need labels map to the frozen
`Severe property condition` enum and are carried losslessly in `property_detail`. The message and
supported photo upload are optional. `functions/api/lead.ts` is untouched. Shared form/layout
additions are opt-in; analytics recognizes the new local assessment anchor.

The owner's supplied illustrative imagery is retained byte-for-byte under the explicit package
instruction; it is not actual company job evidence and no image was generated. Original atlas
edge strips remain. A stronger route-local navy overlay above 620px fixes measured photographic
contrast without changing copy, dimensions or crops. Production-photo provenance remains a
release follow-up. These narrow package decisions do not change other routes or claims boundaries.

Actual results, screenshot paths, shared-consumer checks and remaining live-provider/estate-campaign
limitations are recorded in `docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, Extreme installation section,
and `output/extreme-service-install/`. Build/type, six-width preview comparison, accessibility,
native 200% zoom and controlled form checks completed. No other kit installed, push/deploy or live
inquiry. Stop at this installation.

## 2026-09-19 — Estate campaign kit installed locally; copy remains provisional

Owner requested only `aseptaclean-estate-landing` at the checklist's existing
`/estate-cleanout-san-jose/assessment/` route, comparison to its supplied preview, real form
integration, local checks without inquiries, and no push/deploy. The public estate service page
is unchanged. The newer route-specific package controls composition and dimensions over the
older blueprint §6.2 and campaign layout; it does **not** approve its provisional wording or
photographs. Supplied marketing paragraphs, section order, photographic rows, atlas crops and
FAQ remain intact. No new imagery was generated.

The package's demonstration form is replaced with the existing `PpcHeroForm` flow. Preserve
`request-walkthrough-panel`, the legacy `#request-walkthrough` anchor and entry attribution,
service enum, optional property-description/details/photos, required email and production
consent, uploads, security, idempotency, URL attribution, server-confirmed events and campaign
receipt route. The supplied required role selector maps to existing `additional_notes` as
`Role: <choice>`; it is not a new backend field. Email-before-ZIP matches the kit. Submit is
`Send Message` under the standing production rule. All demo handlers/notices are removed.
The existing Free Walkthrough offer remains visible beside the bottom form. The kit's
“assessment” terminology is retained provisionally, **not** a pricing/offer change; reconcile
it with the free-walkthrough offer before launch. No endpoint, provider, receipt, redirect,
canonical, metadata or campaign-data change.

Production adaptations retain configured logos/phone links, policy links, Termly preferences,
existing disposal/scope/documentation limits, and the campaign sticky contact bar. `PpcLayout`
gains optional header/footer slots and an estate root flag; defaults remain unchanged.
`PpcHeroForm` gains an optional compact Turnstile size; existing callers keep `flexible`.
CSS remains route-scoped, in supplied cascade order, with equivalent `.ac-type-*` heading roles
and the site's local Inter font. Required form/footer content accounts for preview differences;
hero dimensions and all five photo rectangles match at all six checked widths.

Release blockers: provisional copy approval, especially inventory/document handling/shredding
readiness previously gated in `ppcEstate.ts`; assessment/walkthrough terminology reconciliation;
provisional illustrative photo provenance/approval; deployed Turnstile and real delivery checks.
Local acceptance simulations prove browser behavior, not CRM/email delivery. No real inquiry,
push or deployment. Full checks, adaptations, screenshots and remaining limits are recorded in
`docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, estate landing entry.

## 2026-09-20 — Rodent campaign build kit installed locally

Owner scope: only `aseptaclean-rodent-landing` at
`/rodent-dropping-cleanup-san-jose/assessment/`, from its fragment and preview;
no push/deployment or real inquiries. The package's editorial hero, photographic service rows,
overlapping planning panel, three process steps, call band, FAQ and bottom form supersede the
older campaign composition/shared hero sizing **on this route only**. Public rodent source,
pricing component, campaign data/metadata/offer, endpoint, receipts and redirects are unchanged.
Supplied copy remains provisional; package source bytes remain unchanged.

Concrete conflicts resolved under the requested standing rules:

- Package utility label `Estate Cleanout` → `Rodent Dropping Cleanup`; this is the rodent campaign.
- Doc 21 prohibits affirmative disinfection claims: the hero lead uses the existing campaign
  sentence “Aseptaclean removes rodent droppings, nests, and materials soiled by rodent waste.”
  The third process item is “Review” / “We show you what we cleaned and removed.” from the
  existing campaign review step instead of “Disinfect” / “Suitable surfaces that can be treated.”
  These are explicit claims adaptations, not new copy approval. Other draft marketing text remains.
- Add the mandatory cleaning-only and licensed-pest-operator boundaries to the pest FAQ, existing
  third-party disposal boundary below service rows, and air-sealing exclusion to the insulation
  boundary (explicitly required by the package instructions). Insulation-removal capability and
  the remaining provisional wording require owner review before launch.
- Demo optional email/details cannot relax existing production required fields. Preserve actual
  names, validation, consent, uploads, challenge, timestamps, idempotency, attribution and receipt;
  real submit says `Send Message`. Retain the campaign's existing $145 disclosure in its form
  and unchanged metadata. Do not import public-page price cards or any free-walkthrough offer.
- Required affected-area selection posts through supported `additional_notes`; route-only
  `formdata` handling prefixes it to outgoing `property_detail`, which existing CRM/owner
  summaries actually consume. Typed textarea values are unchanged, including on retries.
  No shared form or backend change.
- Supplied CSS heading declarations map to explicit `.ac-type-rodent-landing-*` roles. Original
  responsive H1 floors of 25/27px violate AGENTS §6's 1.9 ratio: raise the minimum to 31px,
  preserving line-height and all wording; mobile hero grows naturally. Desktop/tablet hero and
  all photo dimensions match the preview. Do not force this editorial hero onto other pages.
- Reuse the existing PPC document/analytics/consent shell, header/footer slots, compact Turnstile
  option, and static SVG icon renderer. New `rodentLandingKit` shell flag defaults false.
  Original atlas bytes retained and labeled illustrative; no generated/replacement photos.
  Hero aria-label corrected to describe the actual discussion image selected by the kit's final CSS.

Actual QA, adaptations, screenshot paths, changed files and launch blockers are recorded in
`docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, “Rodent campaign landing installation — 2026-09-20”.
This is local installation, not copy/photo approval or verified live provider delivery.

## 2026-09-20 — Install only the Contact package

Owner requested `aseptaclean-contact` in the existing `/contact/`, preserving its locked open
white layout and provisional copy while connecting the production form. This newer scoped
instruction supersedes the older Contact section order/photo-hero/shared-height direction in
doc 30, the Contact brief and design spec §5.2 for this route only. No other package installed.

Use the original fragment's 19 CSS blocks in order, one route-scoped import, existing BaseLayout
header/footer slots and an opt-in root ID. Keep metadata, canonical/indexation, schema, analytics,
Termly, phone configuration and backend. No endpoint/provider/receipt edits. Original package
files preserved. Introduction and column geometry match the locally rendered standalone preview.

Production contract outranks demo form semantics: email and details remain required; submit
remains `Send Message`; production consent/security/legal controls replace demo text. Package
service labels map to existing accepted enums. `contact-form` and `/contact/` identity remain.
The backend demonstrably supports multipart `property_media[]` private R2 uploads; retain the
optional control and existing limits. Local tests verify exact uploaded bytes and visible storage
failure without falsely claiming success. Add contact-only native constraint checking and busy
submission protection; all other AcCompactForm consumers retain defaults.

Hours use verified `site.business.hours`, including operating days, instead of the provisional
short hours line. Copy stays provisional; this installation does not approve it. Heading rules
map to type roles; raise only the 30px clamp floor to 31px to meet AGENTS §6's ratio at intermediate
widths. All six requested comparison widths retain identical reference introduction heights.
Footer retains existing legal/scope/documentation and cookie controls, explaining extra height.

QA: build/check pass; 147 local form/additional assertions, 36 regression renders, six contact
viewport comparisons, axe checks and native 200% zoom pass. Full results, exact adaptations,
file list and screenshots are in `BUILD-KITS-INSTALLATION-CHECKLIST.md`, Contact installation.
Live providers remain unverified. No real inquiries, push, deployment or submission-flow work.

## 2026-09-20 — Estate inherited-home campaign replacement

Owner scope: replace only the existing `/estate-cleanout-san-jose/assessment/` design with
`aseptaclean-estate-inherited-landing-2026-09-20-r01.zip`. This explicit instruction supersedes the
older estate campaign landing design and the ZIP's packaging-time statement that the archive did
not itself authorize replacement. It does not modify the public estate service page or general
hoarding service page.

Use the inherited-home fragment as implementation authority, its preview as the visual reference
and its copy extraction for proofreading. Preserve the exact two-line hero, CTA wording, cascade,
image proportions and supplied section sequence. The audience is families, executors, trustees and
authorized representatives after a death; hoarding/heavy clutter is a possible property condition,
not a separate general-hoarding offer. No substantive copy rewrite, price or invented promise.

Preserve the route, canonical/indexation, redirects, campaign identity, attribution, analytics and
receipt flow. Use the existing production form and private upload path. Store and deliver the new
role, contents-level and timeline values through route-scoped validation, owner notifications and
CRM summary. Keep consent, spam protection, server/client validation, error handling and genuine-
acceptance-only conversion behavior. No preview iframe or duplicate stylesheet.

The checked-in package is the current estate campaign design reference. Its source required no
obvious spelling, punctuation or accidental-spacing corrections; this does not convert the
package's stated editorial/draft status into final copy or photo approval. Full local QA and
remaining live-provider/photo-approval blockers are recorded in
`docs/BUILD-KITS-INSTALLATION-CHECKLIST.md`, “Estate inherited-home campaign replacement —
2026-09-20”. Nothing was pushed or deployed.

## 2026-09-20 — Public-page heading wording and authored line breaks

The owner's heading list supplied in the current work context supersedes earlier wording and
line-break requirements for those headings only. Apply the replacements to the homepage and the
six public service routes (Hoarding, Extreme Cleaning, Detailed Deep Cleaning, Trauma & Crime
Scene, Rodent, and Estate), preserving one semantic heading per item. Directed lines render as
separate block spans; the homepage Who We Help phrase and two estate phrases each remain one span
and avoid an internal desktop break when space permits. Narrow layouts and 200% zoom may wrap
inside any span without clipping or type reduction. Do not propagate these edits to campaign
landing pages. Copy sources remain byte-preserved. Local implementation and evidence are recorded
in `docs/ASEPTACLEAN-DESIGN-QA.md`, “Public heading copy and line-break QA — 2026-09-20”.

## 2026-09-22 — inquiry-form verification and local reliability fixes

The owner requested rendered, route-by-route verification of every installed inquiry form rather
than shared-component sampling. The fresh build contains 36 form routes with one form each; About
contains none. Each installed instance is now covered independently at desktop and mobile for
validation, keyboard access, complete field/page attribution, upload behavior where offered,
failure retention, repeat-click suppression, accepted receipt navigation and exactly-once tracking.

Two implementation defects were corrected locally. AcCompact and Quick Handoff now publish the
same privacy-safe accepted-lead event contract as campaign forms, including session-level receipt
deduplication. Quick Handoff now renders its configured form ID, and RequestForm records its actual
page as `entry_route` rather than the stale shared `/#request` value. These changes do not alter
public copy, form fields, consent, anti-spam, campaign attribution, approved layout or the protected
`functions/api/lead.ts` endpoint.

Production testing revealed deployment drift which the local passing result does not override:
the deployed Estate service route has no form; several deployed public forms lack their local
photo control; deployed Trauma and Extreme forms submit the Hoarding situation. Current local
route assertions carry the intended mappings, but production remains failed/pending until an
authorized deployment and route-by-route retest.

Five new controlled production inquiries plus the existing Contact control reached private R2,
HubSpot and separate customer/owner Resend acceptance. One rodent photo was retrieved through
authenticated R2 access and matched the submitted bytes. Provider acceptance is not inbox receipt.
No Resend delivery-event or inbox access was available, and the five-attempt/15-minute production
rate limiter prevented the remaining thirty live submissions in this work window. The limiter was
not bypassed or weakened. Advertising hosts were blocked and analytics consent withheld during the
controlled sends. Full evidence and blockers are recorded in `docs/04-RELEASE-CHECKLIST.md`,
“2026-09-22 — exhaustive route-by-route inquiry-form QA”. Nothing was pushed or deployed.

## 2026-09-23 — Shorten the Rodent and Estate campaign forms only

The two current campaign routes `/rodent-dropping-cleanup-san-jose/assessment/` and
`/estate-cleanout-san-jose/assessment/` now show, in order: required Name; required Phone;
optional Email; route-relevant optional Role; optional Additional info; optional Photos; then the
existing required consent, security verification and submit control. ZIP, condition/affected-area,
contents-level and timeline inputs are removed from these two rendered forms. Rodent retains
`Send Message`; Estate retains `Request an Assessment`.

Each route posts a validated `campaign_context` paired with its fixed existing service enum and
campaign source route. The endpoint relaxes email, ZIP and detail requirements only for a valid
pair; all legacy and non-target form contracts remain unchanged. Owner notification runs with or
without customer email. Customer confirmation is skipped when no email is supplied and sent when
a valid address is present. Role, details, attribution and private photo references remain in lead
storage, CRM summaries and owner email when supplied. No endpoint route, consent language, spam
control, upload limit, attribution field or conversion event was changed.

Local endpoint and browser matrices passed for both routes, including minimal/all-optional
payloads, with/without photos, invalid fields, spoofed route/service identity, storage failure,
repeat submission, owner/customer email branches and campaign thank-you redirects. Advertising
hosts were blocked in browser testing. The two routes also opt into hiding their mobile sticky
actions whenever the bottom form is visible, preventing the fixed bar from covering consent; the
Hoarding campaign remains unchanged. No live email was sent, and nothing was deployed.

## 2026-09-18 — Legacy estate redirect deployment

Owner authorized deployment of the tested estate redirect fix. Added exact 301 rules for
`/estate-cleanout` and `/estate-cleanout/` to `/estate-cleanout-san-jose/assessment/` in
`public/_redirects`. Local Cloudflare Pages tests passed one-hop redirects, destination 200,
and exact tracking query preservation. Live destination canonical and 200 verified before
deployment. No old-address internal links were found. No conflicts or rule exceptions.
Deployment is isolated from unrelated workspace changes; rodent pages, lead endpoint,
forms, copy and layout remain unchanged. Live redirect verification follows deployment.


## 2026-09-19 — Authorized SEO positioning release

Owner authorized deployment through the existing GitHub main → Cloudflare Pages workflow.
Prepared an isolated production checkout based on `fd03f97` to preserve the unrelated homepage,
service, navigation, form and design work in the original workspace. This release changes only
homepage title/description, shared Twitter metadata, business-description data, and public/PPC
footer positioning with disclaimer-only `data-nosnippet` spans. The production homepage already
renders `home.hero.eyebrow` with the exact approved descriptor, so it is preserved without duplication.
No homepage redesign, hero headline/CTA change, new disclaimer, route retirement, tracking change,
form change or endpoint change is part of this release. The estate redirects in `fd03f97` remain.

The exact owner-approved strings and scoped exception to the older display-only positioning rule
are recorded in `20-COPY-MAP.md` and `21-CLAIMS-AND-COMPLIANCE-LAW.md`. This does not establish
new operating authority or credentials; existing business identity and disclaimer text remain.
Earlier local-layout evidence relates to the broader uncommitted workspace and is not proof of
this release. This isolated production candidate is built and checked independently, and live
homepage HTML must be verified after the GitHub-triggered deployment before claiming success.
External Google Business Profile, Nextdoor, LinkedIn and Thumbtack edits are not included.
