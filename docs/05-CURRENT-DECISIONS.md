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
