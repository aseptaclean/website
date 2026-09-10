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
  Ads tag must trigger only on custom event `ppc_form_success` with `page_path` exactly
  `/estate-cleanout-san-jose/assessment/`.
- Measurement choice: use one native Google Ads conversion action for the estate lead once that
  label is available. Do not also import GA4 `generate_lead` as a Google Ads conversion—the
  existing GA4 event covers both PPC forms, while the requested Ads conversion is estate-specific,
  and enabling both would double-count the estate submission.
- Verification must intercept or stub `/api/lead` and Google hosts. No production submission or
  real conversion may be generated merely to test this installation.
