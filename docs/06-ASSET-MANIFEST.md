# Current asset policy and inventory contract

This replaces the stale photographic inventory and three-image cap. The docs-only upload does not provide the actual current image folder. Never report it as “no images exist in the repository” or treat an old listed file as present without checking.

## Required inventory rows

For every asset actually used, record: file path; dimensions; source/owner; license or permission evidence; real proof versus illustration; page/component; crop/focal point; alt text. Reuse current verified assets before sourcing replacements.

Real proof means actual Aseptaclean founder/team/jobs/equipment/vehicle/documentation. Use genuine assets only. Licensed stock may illustrate service conditions or cleanup work, including restrained trauma-related context, but must not be presented as an Aseptaclean job, employee, result, or capability the company does not have. No competitor images, badges, maps, watermarked placeholders, or fake testimonials. Do not demand real job imagery as the sole route to a photographic design.

Keep any disclosure outside the hero's horizontal grid; it must not steal the form column's width. Alt text describes what is visible and does not imply an illustrative subject works for Aseptaclean. Avoid graphic victim imagery and identifiable private incident details.

## Slots to fill from the actual image inventory

| Page type | Required visual roles |
| --- | --- |
| Home | Hero; introductory property/cleanup split; five service-card images; dark scope split; real founder portrait if available; original optional geographic graphic |
| Services | Compact hero and five contextual service-row images |
| Each service | Service-specific hero and 2–4 substantial supporting photographs where content warrants them |
| About | Compact relevant photograph and real founder portrait |
| Contact | No decorative photograph required; verified geography may be used |
| Legal pages | No marketing photography required |

Reuse appropriate images across routes deliberately, but avoid repeating the same photograph in adjacent sections. A fixed numerical count does not justify filler. Match photo scale and placement to the PDF; do not substitute icons for every missing photo.

Missing image record: page/component, required subject, real-versus-illustrative role, dimensions/aspect ratio, known source options. Work can continue on layout while sourcing is pending; visual completion requires actual suitable imagery.

---

## Inventory — `/hoarding-cleanup-san-jose/assessment/` (Hoarding PPC, 2026-09-05)

**SUPERSEDED — this table describes the route's pre-package imagery and is retained only as the
record of what was there.** All four slots were repointed to the owner image package (see "Owner
image package" below): hero → `hoarding-living-room`, §03–04 decisions →
`hoarding-garage-contents`, §05 recognition → `extreme-cleaning-neglected-kitchen`, §07 hidden
conditions → `extreme-cleaning-floor-edges`, and §08 now carries the real founder portrait. None
of the four files below still ships on this route or anywhere else on the site.

Four assets, all already shipping elsewhere on this site at the time. Reused rather than
re-sourced, per "Reuse current verified assets before sourcing replacements." The campaign brief's
Adobe stock IDs are a **candidate shortlist, not licensed files** — no Adobe preview was used and
nothing watermarked shipped. None of the four contained a person.

| File | Dimensions | Role | Slot / component | Crop | Alt text |
| --- | --- | --- | --- | --- | --- |
| `src/assets/homepage/condition-development-hoarding-asurnipal.jpg` | 3264×2448 | Illustration | Hero background, `PpcHero` | `cover`, full-bleed | "A room where household belongings, bags, boxes and papers have accumulated across the floor and furniture." |
| `src/assets/homepage/service-development-cleanup-asurnipal.jpg` | 4624×3468 | Illustration | §03–04 decisions, `PpcDecisions` | 6:5 desktop / 4:3 mobile | "A table covered with mixed household items — papers, packaging, kitchenware and small personal belongings." |
| `src/assets/homepage/condition-development-neglected-kolforn.jpg` | 3840×2880 | Illustration | §05 recognition, `AcSplit` | 4:3 | "A worn kitchen with dated tile, an aged cooker and a small sink, opening onto a hallway." |
| `src/assets/stock/garage_cluttered.jpg` | 1920×2880 | Illustration | §07 hidden conditions, `AcDarkBand` | 4:3 `cover` from portrait source | "A storage area with cardboard boxes, filled bags and stacked panels against a bare concrete wall." |

**Disclosure: REMOVED FROM THE PAGE 2026-09-05.** The footer previously rendered "Photographs on
this page are illustrative reference imagery of property conditions. They are not Aseptaclean
project work, results, or crew." The owner directed that the visitor-facing reference labels come
off the site; the provenance is retained here instead. See "Caption removal" below.

**Source / licence evidence: NOT RECORDED IN THIS REPOSITORY.** No licence file, receipt or
attribution record exists for any of these four, and none exists for the rest of the shipped
photography either — this is a **pre-existing, sitewide gap**, not something this campaign route
introduced. It is recorded here rather than resolved because inventing a licence is exactly what
this document forbids. Before any paid campaign runs, confirm the origin and permission for each
file. Do not treat the filename attributions as evidence.

**Founder portrait — SUPPLIED 2026-09-05.** Superseded by the owner image package below. §08 of
the campaign page now renders the real portrait. The paragraph this replaces recorded that no
photograph of Matthew Ruiz existed in the repository and that the slot rendered as a single
readable column with `data-needs-asset`; that dependency is closed.

---

## Owner image package — installed 2026-09-05

Source archive: `aseptaclean-website-images-labeled-with-founder.zip` (repository root), with
`README-ASSET-MAP.md` and `aseptaclean-image-placement-guide.md`. Masters live in
`src/assets/aseptaclean/` under their canonical package filenames, unmodified. Placement follows
the package's own placement index; the numbered slots are its assignments, not this repo's.

**Pipeline.** These go through `astro:assets`, the existing pipeline, not `public/`. Astro emits
WebP derivatives with intrinsic `width`/`height` on every `<img>`, hero images `eager` +
`fetchpriority="high"` and everything below the fold `lazy`. The PNG/JPEG masters are preserved
in `src/` and pruned from `dist/` by `scripts/prune-dev-routes.mjs`, so no multi-megabyte
original is served.

**No upscaling.** The package masters are 1672×941 (and 1448×1086, 1152×1536), smaller than the
1920px-plus assets the components' width ladders were written for. `src/components/imageWidths.ts`
clamps each ladder to the master and appends the master's own width, so the largest derivative
equals the source and never exceeds it. Verified by measuring every emitted `.webp` in `dist/`.

### Illustrative — the 18 numbered images

Original illustrative photographs of property conditions. **Not** company job documentation,
projects, results, crews, case studies or before/after material. That provenance is recorded in
this table and nowhere on the site — see "Caption removal" below. Alt text describes what is
visible and never claims a photograph is Aseptaclean project work; the service cards stay
decorative (`alt=""`) because their link text carries the meaning.

| # | File (`src/assets/aseptaclean/…`) | Page · section |
| --- | --- | --- |
| 01 | `home-hero-neglected-interior.png` | Home · hero |
| 02 | `property-interior-introduction.png` | Home · 01 The difference · Services hub compact hero · About compact hero |
| 03 | `hoarding-living-room.png` | Hoarding hero · Home card · Services row · PPC hero · related cards |
| 04 | `hoarding-restricted-walkway.png` | Hoarding · 01 Start here · **PPC 05 recognition (added 2026-09-06)** |
| 05 | `hoarding-garage-contents.png` | Hoarding · 04 Belongings · PPC 03–04 decisions · Trauma · 07 Belongings |
| 06 | `extreme-cleaning-neglected-kitchen.png` | Extreme hero · Home card · Services row · related cards — **PPC 05 recognition removed 2026-09-06** |
| 07 | `extreme-cleaning-bathroom-buildup.png` | Extreme · 05 The real problem |
| 08 | `extreme-cleaning-floor-edges.png` | Extreme · 01 As it is · PPC 07 hidden conditions |
| 09 | `detailed-deep-cleaning-kitchen.png` | Deep Cleaning hero · Home card · Services row · related cards |
| 10 | `deep-cleaning-shower-deposits.png` | Deep Cleaning · 05 Surfaces |
| 11 | `deep-cleaning-window-track.png` | Deep Cleaning · 03 What detailed means |
| 12 | `deep-cleaning-baseboard-edge.png` | Deep Cleaning · 04 The difference |
| 13 | `trauma-residential-context.png` | Home card · Services row · related cards — **Trauma hero removed 2026-09-06** |
| 14 | `trauma-residential-surfaces.png` | **Unplaced from 2026-09-06** (was Trauma · 03 Why it differs) |
| 15 | `rodent-utility-room-context.png` | Rodent hero · Home card · Services row · related cards |
| 16 | `rodent-hard-surface-detail.png` | Rodent · 06 Surfaces |
| 17 | `rodent-storage-contents.png` | Rodent · 05 Scope |
| 18 | `home-property-scope-detail.png` | Home · 03 Scope dark band |

Dimensions: all 1672×941 except `deep-cleaning-window-track.png` at 1448×1086. Source/owner:
supplied by the owner in the package above; generated illustrative origin recorded here as the
placement guide requires. Crop: CSS `object-fit: cover` inside the existing ratios — no source
was resized, stretched or re-exported.

### Genuine company asset — the founder portrait

| File | Dimensions | Role | Placements | Alt text |
| --- | --- | --- | --- | --- |
| `founder-matthew-ruiz.jpeg` | 1152×1536 (3:4) | **Real proof** | `/about/` 01 The operator · `/` 05 Why Aseptaclean · `/hoarding-cleanup-san-jose/assessment/` 08 Why Aseptaclean · **added 2026-09-05:** `/services/` 06 · `/hoarding-cleanup-san-jose/` 06 · `/extreme-cleaning-san-jose/` 06 · `/rodent-dropping-cleanup-san-jose/` 07 · `/deep-cleaning-san-jose/` 08 — every "Why Aseptaclean" section, replacing four stock figures in PPE | `Matthew Ruiz, founder of Aseptaclean` |

This is a genuine photograph of the founder. It never carried an illustrative caption, and since
the 2026-09-05 caption removal no image on the site carries one either.

Treatment: contained portrait plate, `ratio="3/4"` capped at 360px on desktop (480px tall, the
top of doc 30 §2's 380–480px split-image band) and 300px at 4:5 on mobile — the package's own
founder instruction. At 3:4 the master renders at its native aspect, so the desktop crop is
zero; the mobile 4:5 step trims 6.25% of height centred, which keeps both the face and the
embroidered logo. No stretching, no wide banner, no retouching, no background replacement.

### Alternates — NOT installed

None of the 13 files in `alternates/` ships. The package marks them review-only, and five of the
trauma alternates (visible red-brown stain, police tape, equipment staging) would violate the
guide's own no-incident direction for slot 13/14. Installing any of them needs an explicit owner
approval recorded here first.

**Still true after 2026-09-06.** The owner approval recorded below covers three separately
supplied attachments by name — it is not an approval of this `alternates/` folder, and it does
not transfer to police tape, evidence markers or equipment staging. The trauma hero and §03 now
carry owner-approved incident and cleanup content, so the "no-incident direction for slot 13/14"
above is superseded *for those two slots by those two named files only*; these 13 alternates
remain uninstalled and still need their own recorded approval.

### Assets this package did NOT replace — CLOSED 2026-09-05

This section previously recorded that sections outside the package's placement index kept the
stock and Commons images they already had, on the reasoning that the guide assigns them no image
and inventing one was not the install's decision.

**That reasoning is now spent.** Not being in the placement index is a reason not to invent a new
numbered slot; it is not a reason to keep a gloved-hands stock photograph or an unattributed
Commons file on a public page. Every one of those sections — the Services hub
choosing/honest-scope/why sections, the service pages' remaining dark bands and `why-aseptaclean`
splits, the About scope band, and the Property Cleanouts and Move-Out heroes — has since been
resolved on its own subject, by cross-route reuse of an assigned package image, by the founder
portrait, or by removing the image where the section's subject is not a visible property
condition. See "Legacy image cleanup" below for the full table, the one unresolved slot, and the
attribution position.

---

## Owner-approved supplementary images — Crime & Trauma, 2026-09-06

Three images supplied by the owner as direct attachments, **not** part of the 2026-09-05 package
zip and not among its review-only `alternates/`. They were inspected individually before install.

### The scoped approval — read this before reusing any of them

The owner's approval, recorded verbatim in intent:

> I am approving these three supplied images for the Crime & Trauma page. This supersedes the
> earlier blanket restriction on generated people for these specific assets and this page.
> Do not restore previously removed stock technicians elsewhere.

**What this does.** It supersedes `AGENTS.md` §0.3 ("No AI-generated people, properties,
documents, or crews") and doc 21 §6 ("No stock or AI-generated crews, properties, documents, or
people") **for these three named files, on `/crime-scene-trauma-cleanup-san-jose/` only.** These
are the first images on the site showing a person since the 2026-09-05 stock-figure removal.

**What this does not do.** It is not a general re-opening of generated people. It does not
restore `ppe_technician_1`, `ppe_technician_2`, `cleaning_crew` or any other removed stock
figure, on this page or anywhere else — those stay removed. It does not extend to the home page
card, the Services hub row, or the related-service cross-link cards, which still carry
`trauma-residential-context`. Any further placement needs its own recorded approval.

**Standing constraints that still apply, and were applied.** These are service visuals, not
photographs of Aseptaclean employees or completed jobs. No Aseptaclean logo, wordmark or vehicle
appears in any of them. No "our team" caption, project claim, result claim or before/after
framing accompanies any of them. Alt text describes only the visible activity and never implies
the figure works for Aseptaclean or that the scene is Aseptaclean's work. No "illustrative
reference" label is printed — consistent with the 2026-09-05 caption removal, provenance lives
here. The real founder portrait continues to hold every founder section.

### Inventory

Dimensions 1672×941, identical to the package masters, so `src/components/imageWidths.ts` clamps
each ladder to the source exactly as it does for the package — **no upscaling**, largest
derivative equals the source. Installed byte-identical to the supplied originals (`sha256`
below); no resize, re-encode, crop or retouch. Delivered through `astro:assets`, not `public/`.

| Production file (`src/assets/aseptaclean/…`) | Supplied original | `sha256` (first 16) | Placement | Alt text |
| --- | --- | --- | --- | --- |
| `trauma-residential-floor-cleanup.png` | `ChatGPT Image Sep 6, 2026, 05_17_07 AM.png` | `b7f7de3c7515ab4a` | Trauma · **hero** (replaces `trauma-residential-context`) | "A worker in a protective suit and respirator kneeling to clean a stained hardwood floor in a residential room" |
| `trauma-floor-surface-cleaning.png` | `ChatGPT Image Sep 6, 2026, 05_18_25 AM.png` | `ba37a831c8928c34` | Trauma · **03 Why it differs** (replaces `trauma-residential-surfaces`) | "A worker in a protective suit and respirator cleaning an exposed wood floor in a residential bedroom, with carpet pulled back at the edges" |
| `trauma-affected-carpet-detail.png` | `ChatGPT Image Sep 6, 2026, 05_17_26 AM.png` | `0cbb800ff8c5324b` | **Supplied but not selected for publication** — owner ruling 2026-09-06, see below | — (not rendered) |

**Editorial consequence of the hero change, recorded not hidden.** The previous hero was chosen
precisely because it depicted no incident. The approved replacement shows a stained floor being
cleaned, so this page's hero now carries visible incident content and a person. That is the
owner's call and is implemented as instructed; it is noted here because the earlier reasoning is
now superseded and a future reader should not "restore" the empty room as a correction.

### `trauma-affected-carpet-detail.png` — supplied, not selected for publication (RESOLVED 2026-09-06)

**Owner ruling, 2026-09-06:** leave the image unused. It stays outside the production page, and
**no service, claim or exclusions section is to be added in order to accommodate it.** That
closes options (a) and (b) below; the outcome is (c) in effect — the file is retained in the
source tree, not withdrawn from it, but it is not publication material.

Status in code is unchanged and remains correct: installed at
`src/assets/aseptaclean/trauma-affected-carpet-detail.png`, deliberately **absent from
`AcServicePage.astro`'s image registry**, zero occurrences in `dist/`. No copy record can place
it by naming it. Nothing about the trauma route's scope, sections or claims was altered to make
room for it.

The original analysis is kept below because it is the reasoning the ruling accepted, and because
it is the reason a future reader must not "fix" the unused file by inventing a slot for it.

---

#### Original finding — scope conflict (now resolved by the ruling above)

**Requested placement:** "supporting section explaining affected materials and scope boundaries,"
with the owner's own instruction not to place it beside cleaning-only copy in a way that implies
Aseptaclean performs excluded removal work, and to report rather than broaden the offer if no
suitable section exists.

**Finding: no suitable section exists on this route.** The image shows affected carpet being cut
with a blade and lifted — material removal, as the owner noted.

1. **The route's only scope statement excludes it.** Section 04 "What Aseptaclean does" lists
   nine items: assessment, establishing the work area, blood and bodily fluid cleanup, cleaning
   and disinfection of accepted affected surfaces, handling of affected personal contents,
   packaging of regulated trauma-scene waste, coordination of regulated waste transportation and
   disposal, documentation, and final review. **No line covers removal of affected building
   materials.** The source of record, `docs/aseptaclean-crime-scene-trauma-cleanup.md` "What
   Aseptaclean does", carries the same nine lines and no removal line either.
2. **The page publishes no scope-boundary or exclusions section.** Sections 01–10 are situations,
   after-release, why-it-differs, scope, process, discretion, belongings, regulated waste,
   why-Aseptaclean, FAQ, cost. There is no "what we do not do" band to host it.
3. **Section 03 is not a substitute.** It explains affected *materials* but makes no boundary
   statement. Placing a carpet-cutting image against "a hard surface may require a different
   approach than fabric, carpeting, or personal contents" reads as Aseptaclean's answer for
   carpet — the exact implication the owner ruled out.
4. **Sections 04, 06 and 08 render no image slot** (`kind: "intro"`, and the two deliberate
   copy-only bands). Adding one would mean building a visual slot to host a capability the copy
   does not claim.

**Status.** The file is installed and preserved in `src/assets/aseptaclean/` but is deliberately
**absent from `AcServicePage.astro`'s image registry**, so no copy record can place it by naming
it. Nothing was published, and the service offer was not broadened.

**Options put to the owner:** (a) confirm affected-material removal *is* in lawful scope and add
the scope line to both this page and the source doc — then §04 can carry the image once it has an
image slot; (b) add a scope-boundary section stating what is excluded, and place the image there
as an illustration of work that is *outside* the offer; or (c) withdraw the image. Note that doc
21 §6's scope disclaimer already states Aseptaclean "is not a licensed general contractor,
remediation contractor" — option (a) would have needed a claims check before it shipped.

**The owner chose neither (a) nor (b): the image is left unused.** See the ruling at the head of
this section.

---

## Stacked hero geometry — Crime & Trauma, 2026-09-06 (second pass)

The image placements above are unchanged by this. What changed is the box the hero photograph is
measured against below 1200px, so that the placement the owner approved is actually legible on a
phone.

The first pass recorded an honest limit: with the shared hero's media box spanning copy **and**
form, a 390px viewport kept only 13.9% of `trauma-residential-floor-cleanup`'s width and the form
panel hid everything past ~47% of its height. The result was a hood and a respirator — the
approved subject, the floor-level cleaning action, was not on screen at all, and no
`object-position` could raise it.

The owner authorised the geometry change for this route. Below 1200px the photograph is now sized
against the hero's copy region only and the form follows beneath it. At 390px the crop keeps
**29.3% of the source width and 100% of its height**; at 768px, 89.2% of the width; at 1024px the
full width. The kneeling worker, both gloved hands with cloths, and the stained floor are all in
frame. Desktop was already correct and is untouched.

Recorded in full at `docs/30-WEBSITE-MASTER-SPEC.md` §3.1. Verified by
`scripts/trauma-hero-mobile-check.mjs`; evidence in `artifacts/trauma-hero-mobile-2026-09-06/`.

**Alt text, page copy, form fields, consent and submit behaviour are unchanged** — the rendered
text of the route and all seven `alt` strings are byte-identical before and after.

**Residual, reported not hidden.** At 390px the copy still overlays the photograph, and the two
full-width call actions sit across the band where the gloved hands are. The action is recognisable
— posture, arms, one gloved hand with a cloth and the stained floor all read — but it is not
unobstructed. Making it unobstructed at 390px would mean a separate bounded photo band with the
copy moved off the picture, which changes this hero's character; it was not taken unilaterally.
The 768px and 1024px renders have no such obstruction.

---

## Subject-relevance correction — Hoarding PPC, 2026-09-06

`/hoarding-cleanup-san-jose/assessment/` §05 recognition held
`extreme-cleaning-neglected-kitchen`, a grease-and-grime kitchen detail, under the heading
"When everything is mixed together, the project can feel impossible." with the lead "Accumulated
belongings may be only one part of the condition." The slot's subject is accumulation and
restricted access; the cleaning-detail photograph answered the section's *list* while
contradicting its heading and lead.

**Repointed to `hoarding-restricted-walkway.png`** (package 04) — belongings narrowing a passage
through a home. Alt: "Accumulated household belongings narrowing a passage through a home."

The route's other three photographic slots were re-checked in the same pass for the same
mismatch. All three stand:

| Slot | Asset | Verdict |
| --- | --- | --- |
| Hero | `hoarding-living-room` | Correct — accumulation across a room. Owner instructed no change; unchanged. |
| §03–04 decisions | `hoarding-garage-contents` | Correct — belongings to be sorted, matching "what stays, what goes, what needs review". |
| §05 recognition | ~~`extreme-cleaning-neglected-kitchen`~~ → `hoarding-restricted-walkway` | **Corrected.** |
| §07 hidden conditions | `extreme-cleaning-floor-edges` | **Correct as-is — retained.** This is the one section whose copy is specifically about cleaning beneath removed contents: "A floor that has not been visible for years may look different once accumulated belongings are removed." Swapping it to hoarding imagery would have been the same error in reverse. |
| §08 why Aseptaclean | `founder-matthew-ruiz.jpeg` | Real founder portrait. Owner instructed no change; unchanged. |

---

## Caption removal — 2026-09-05

The owner directed that visitor-facing reference labels come off the site. Every instance is
gone; image provenance lives in this document only. Verified by sweeping all 52 built pages in
`dist/` for "illustrative reference", "reference image", "representative image", "sample image",
"image placeholder", "development reference" and "not Aseptaclean project work" — zero matches.

Removed:

| Where | What went |
| --- | --- |
| `AcHeroWithForm`, `AcPageHero`, `AcSplit`, `AcDarkBand` | The `caption` prop, its `<figcaption>`/`<p>` container and its CSS rule, in each component |
| `/`, `/about/`, `/services/`, the five service pages via `AcServicePage` | 14 `caption={ILLUSTRATIVE}` passes and the four `ILLUSTRATIVE` constants |
| `/hoarding-cleanup-san-jose/assessment/` | The footer `photoDisclosure`, and its now-dead plumbing through `PpcLayout` → `PpcFooter` |
| `/estate-cleanout-san-jose/`, `/move-out-cleaning-san-jose/`, `/property-cleanouts-san-jose/` | The absolutely-positioned `…-hero__development-note` hero overlay and its CSS |

No empty containers or residual spacing remain: the captions were conditionally rendered, so the
element is absent rather than blank, and each removal took its CSS rule with it. The three hero
overlays were `position: absolute`, so they occupied no layout space to reclaim.

**Preserved:** all alt text; the founder portrait's `Matthew Ruiz, founder of Aseptaclean`; every
`alt=""` on decorative service-card images.

**Attribution note.** No legally required attribution was rendered inside any removed caption, so
none was lost. The three hero overlays read only "Development reference photograph · not
Aseptaclean project work"; the CC BY-SA credits for the Commons files exist solely as source-code
comments and were never on the page. That is the **pre-existing licence gap recorded above**, not
something this change introduced, and CC BY-SA attribution for the Commons images is still owed
wherever they ship.

**Exposure this change opened — RESOLVED 2026-09-05, see "Legacy image cleanup" below.** With the
captions gone, four stock photographs that depict people rendered unlabelled: `ppe_technician_1`
(Hoarding §, Rodent §), `ppe_technician_2` (Extreme §, Trauma §) and `equipment_gear` (gloved
hands — Hoarding, Rodent, About, Services hub). The caption was their only mitigation. Doc 21 §6
forbids "stock or AI-generated crews … or people" and its image rule asks whether a slot implies
Aseptaclean performed the work.

**Correction to this document, 2026-09-05.** An earlier revision of this paragraph stated that
"the owner was shown this and elected to keep the photographs uncaptioned." **That was not an
owner decision and should never have been recorded as one.** The owner's actual instruction was
narrow: remove the visitor-facing "illustrative reference" labels. Retaining non-Aseptaclean
technicians, crews or gloved-hand imagery was an inference drawn from that instruction by the
pass that made the change — not something the owner authorized, was asked about, or ruled on. The
inference is withdrawn. Nothing in this document may record inferred consent as an explicit
decision; where a decision has not actually been made, this file says so and names the open
question instead.

---

## Legacy image cleanup — 2026-09-05

Extends the owner package to the placements the install left behind. "Outside the package's
placement index" was the reason those sections were not renumbered; it was never a reason to keep
unattributed stock or stock people, and the previous pass wrongly treated it as one.

**Ten legacy assets audited, every public placement resolved. No public page now renders a
non-Aseptaclean person, technician, crew or gloved hand.** The only human on the site is the real
founder portrait. The visitor-facing reference labels stay removed, and no image anywhere is
described as Aseptaclean project work.

### Replacements

| Page · section | Old asset | Resolution |
| --- | --- | --- |
| Hoarding · 05 Beyond clutter | `equipment_gear` (gloved hands) | → slot 08 `extreme-cleaning-floor-edges` |
| Hoarding · 06 Why Aseptaclean | `ppe_technician_1` (person) | → `founder-matthew-ruiz`, `ratio="3/4"` |
| Extreme · 03 Diagnosis | `close-development-property-sanfranman59` | → slot 17 `rodent-storage-contents` |
| Extreme · 06 Why Aseptaclean | `ppe_technician_2` (person) | → `founder-matthew-ruiz`, `ratio="3/4"` |
| Rodent · 01 Before you clean | `equipment_gear` (gloved hands) | → slot 16 `rodent-hard-surface-detail` |
| Rodent · 03 Extent | `condition-development-neglected-kolforn` | → slot 05 `hoarding-garage-contents` |
| Rodent · 07 Why Aseptaclean | `ppe_technician_1` (person) | → `founder-matthew-ruiz`, `ratio="3/4"` |
| Deep Cleaning · 01 Condition first | `condition-development-neglected-kolforn` | → slot 07 `extreme-cleaning-bathroom-buildup` |
| Deep Cleaning · 08 Why Aseptaclean | `residential_exterior_2` | → `founder-matthew-ruiz`, `ratio="3/4"` |
| Trauma · 02 After the scene is released | `empty_clean_room` | → slot 02 `property-interior-introduction` |
| Trauma · 07 Belongings | `condition-development-reset-aismallard` | → slot 05 `hoarding-garage-contents` |
| Services hub · 03 Choosing | `empty_clean_room` | → slot 08 `extreme-cleaning-floor-edges` |
| Services hub · 06 Why Aseptaclean | `equipment_gear` (gloved hands) | → `founder-matthew-ruiz`, `ratio="3/4"` |
| About · 03 Scope | `equipment_gear` (gloved hands) | → slot 18 `home-property-scope-detail` |
| Property Cleanouts · hero | `condition-development-neglected-kolforn` | → slot 18 `home-property-scope-detail` |
| Move-Out Cleaning · hero | `condition-development-reset-aismallard` | → slot 02 `property-interior-introduction` |

**The founder portrait now carries every "Why Aseptaclean" section**, because that section's
subject is his background — the copy names biochemistry, pharmaceutical manufacturing and
surgical pathology. Four stock figures in coveralls are replaced by the one genuine photograph the
company has. It is the same contained 3:4 portrait plate the About and PPC pages already use, so
no new treatment was introduced, and the mandatory founder-authority clause renders beneath every
instance. Cross-page reuse is deliberate and no photograph repeats in adjacent sections.

### Removals — sections that work better without an image

| Page · section | Old asset | Why removed rather than refilled |
| --- | --- | --- |
| Trauma · 06 Discretion | `ppe_technician_2` (person) | The subject is a communication practice — who we speak to, what we do not disclose. Not a visible property condition; the package has no honest picture of one. |
| Trauma · 08 Regulated waste | `waste_disposal` | See the unresolved slot below. |
| Services hub · 04 Honest scope | `garage_cluttered` | The subject is a business practice — not overselling scope. Same reasoning as Trauma 06. |

All three render as a single centred readable column. `AcSplit` already had that behaviour;
`AcDarkBand` did not, and both were capped at the wrong width — the grid ran to 62rem/1320px while
`global.css` holds `:where(p, li)` to `--ac-measure-read`, so a heading spanned the full width and
every paragraph stopped short of it. Both components now match the grid to that token, so a
copy-only section reads as a deliberate column instead of a broken split. No empty plate, no
`data-needs-asset` placeholder box, no reclaimed-space gap.

### Unresolved slot — needs imagery this repository does not have

**`/crime-scene-trauma-cleanup-san-jose/` · section 08, "Regulated biohazard waste."** Required
subject: regulated-waste handling, containment or waste documentation. The owner package is
eighteen property-condition photographs plus the founder portrait and contains nothing of the
kind, and the alternates are review-only. The section currently ships copy-only, which is correct
but leaves the page's closing technical section without a visual.

The asset it replaced was actively wrong, not merely unlicensed: a marked clinical-waste bin
photographed on a public street with passers-by in frame. Beyond the people, placing it beside the
TSW #933 registration read as Aseptaclean's own waste operation — a capability this very section
attributes to a third-party transport partner. It should not be restored.

### Attribution — what still ships after this cleanup

Removing a visible placement does not by itself resolve a licence gap, so this is tracked
separately from the placement work above.

**Resolved by removal.** Four Wikimedia Commons files carried CC BY-SA attribution that existed
only in source-code comments and never rendered on the page. Three no longer appear on any public
route: `condition-development-neglected-kolforn.jpg` (Kolforn, CC BY-SA 4.0),
`condition-development-reset-aismallard.jpg` (aismallard, CC BY-SA 3.0) and
`close-development-property-sanfranman59.jpg`. `condition-development-hoarding-asurnipal.jpg` and
`service-development-cleanup-asurnipal.jpg` (Asurnipal, CC BY-SA 4.0) are also no longer reachable
— see the dead-component note below.

**RESOLVED 2026-09-06.** `hero-development-residence-asurnipal.jpg` (Asurnipal, Wikimedia
Commons, CC BY-SA 4.0) was the full-bleed hero of `/estate-cleanout-san-jose/`, unattributed on
the rendered page — the live exposure this entry originally flagged. It is repointed to the owner
package's `hoarding-garage-contents` (belongings staged for sorting, matching this page's Save
List mechanism), the same resolution already applied to Property Cleanouts and Move-Out above.
Full reasoning in that page's own hero-import comment. The file is no longer imported by any
built route; `dist/` was swept to confirm zero references.

**Unchanged.** No licence file, receipt or permission record exists in this repository for any of
the remaining legacy stock. That pre-existing sitewide gap is narrower than it was — the shipped
photography is now the owner package plus the one Commons file above — but it is not closed, and
it still needs confirming before any paid campaign runs.

### Files still present in the source tree but not shipped

The ten legacy assets remain in `src/assets/stock/` and `src/assets/homepage/`, referenced only by
components no page imports (`HomeServiceGrid`, `HomeReframeSplit`, `HomeScopeAuthority`,
`HomeDarkReframe`, `WhatWeHandle`, `ServiceDirectory`, `ServiceProblemChooser`,
`OperatingEvidence`, `ServicesHero`, `FinalCTA`) and by `/dev/*`, which
`scripts/prune-dev-routes.mjs` strips from every production build. Astro emits only what a
rendered page imports, so none of them reaches `dist/`. Verified by sweeping the built output:
zero matching files in `dist/_astro`, and zero references in any built HTML, CSS or JS across all
52 pages. Deleting the dead components and their assets is a separate cleanup, deliberately not
folded into this image pass.

`AcServicePage`'s image registry no longer contains any legacy key. A copy record cannot
reintroduce one by naming it: an unknown hero key throws at build time, and an unknown section key
renders copy-only.
