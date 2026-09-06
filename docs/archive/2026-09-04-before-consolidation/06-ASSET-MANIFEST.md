# 06 — Asset Manifest

**Regenerated 2026-08-11** from the real inventory. The previous version listed a retired
typeface, omitted two live ones, and described a placeholder treatment that no longer matches
the build — which meant the manifest failed `18` §9's own rule that any asset absent from it
is a release blocker.

**Policy superseded 2026-09-03 — owner decision, "current approved image policy."** Everything
in §4 and §6 below dated before 2026-09-03 describing a three-slot atmosphere-image cap is
**historical, not current policy.** It is kept for record only. See §4.2 for the rule that
replaces it. `docs/05-DECISIONS-LOG.md`, "Image policy superseded — licensed illustrative
photography approved" (2026-09-03) records the ruling and the conflict it resolves.

**Rule:** no image enters production without a row here. No exceptions, including
free-licence images.

---

## 1. Brand assets — the entire shipped image inventory

| File | Size | Dimensions | Source | Licence | Purpose | Proof status |
| --- | --- | --- | --- | --- | --- | --- |
| `public/assets/brand/aseptaclean-wordmark.png` | 86,930 B | 900 × 215 | Owner-supplied 2026-07-30, resized from 2127 × 510 | Owned | Header, light surfaces | Authentic brand asset — not project proof |
| `public/assets/brand/aseptaclean-wordmark-reversed.png` | 64,857 B | 900 × 215 | Owner-supplied 2026-07-30 | Owned | Footer, dark surfaces | Authentic brand asset — not project proof |
| `public/assets/brand/aseptaclean-site-icon-512.png` | 104,103 B | 512 × 512 | Owner-supplied 2026-07-30 | Owned | Favicon, PWA, schema logo | Authentic brand asset — not project proof |

**That is the complete list.** There are no photographic assets anywhere in the repository —
no files under `src/assets/`, and no `.png`, `.jpg`, `.svg`, or `.webp` anywhere in `src/`.

---

## 2. Type assets

Cross-checked against `package.json` `dependencies` as committed (2026-08-11): only three
font packages are installed. Instrument Sans Variable, Fraunces, Montserrat, Open Sans, and
Source Serif 4 have already been removed from `dependencies` — they are not merely unused,
they are no longer installed at all.

| Family | Package | Licence | Status |
| --- | --- | --- | --- |
| Newsreader Variable | `@fontsource-variable/newsreader` | OFL 1.1 | **Live** — `--ac-font-display`, preloaded |
| Inter Variable | `@fontsource-variable/inter` | OFL 1.1 | **Live** — `--ac-font-sans`, preloaded |
| IBM Plex Mono 400 | `@fontsource/ibm-plex-mono` | OFL 1.1 | **Live** — `--ac-font-mono`, preloaded |
| Instrument Sans Variable | `@fontsource-variable/instrument-sans` | OFL 1.1 | **Retired and removed.** Not in `package.json`. No `@font-face` rule remains. |
| Fraunces | `@fontsource-variable/fraunces` | OFL 1.1 | **Removed.** Not in `package.json`. |
| Montserrat | `@fontsource-variable/montserrat` | OFL 1.1 | **Removed as an installed package.** Still loaded from Google Fonts CDN on one page — see exception below. |
| Open Sans | `@fontsource-variable/open-sans` | OFL 1.1 | **Removed as an installed package.** Still loaded from Google Fonts CDN on one page — see exception below. |
| Source Serif 4 | `@fontsource-variable/source-serif-4` | OFL 1.1 | **Removed.** Not in `package.json`. |

**Exception, deliberate:** `/sms-notification-consent/` loads Montserrat and Open Sans from
Google Fonts (`fonts.googleapis.com`, not the removed local packages). Byte-preserved under
Twilio 10DLC carrier review. Do not edit that page or "fix" its font loading — this is the one
sanctioned Google Fonts CDN request on the entire site; see `AGENTS.md` §6.

---

## 3. Document artifacts

| Component | Purpose | Proof status |
| --- | --- | --- |
| `HandoffRecord.astro` | Property Handoff Record — the page's signature moment | **Visibly labeled SAMPLE. Not a client record.** |
| `ResidenceBaselineRecord.astro` | Residence Baseline Record | **Visibly labeled SAMPLE. Not a client record.** |

Both must carry the documentation disclaimer from `21` §6 wherever they appear.

---

## 4.2 Current image policy — licensed illustrative photography approved, 2026-09-03

**This section is current policy. §4 below it is historical — read it for the record of what
was true through 2026-09-03, not for what governs now.**

**Two categories, kept strictly separate:**

**REAL PROOF** — requires an actual Aseptaclean asset. Founder portrait, actual equipment,
actual job photos, actual before/after, actual team photos, actual vehicle, real project
documentation. **Never stock, never AI-generated, never substituted.** This is unchanged from
`AGENTS.md` §0.3 and is not touched by this policy update.

**ILLUSTRATIVE PHOTOGRAPHY** — licensed stock **may** be used, on any public marketing page,
including regulated-service pages, to depict: property conditions, interiors, cluttered
properties, severe-condition interiors, detailed cleaning, rodent-affected environments,
technician/gloved-hand cleanup imagery, controlled specialty-cleanup environments, residential
interiors, commercial interiors, vehicle interiors, and neutral contextual imagery relevant to
the service. **The three-slot atmosphere cap in §4 below no longer applies.** Approximate
density target: 5–8 meaningful photographic moments on the homepage, 3–5 on a long service page,
owner/implementer judgment on shorter pages. Do not insert an image merely to hit a number —
each one has to serve the page's composition.

**The one rule that does not change:** illustrative photography must never be captioned, framed,
or composed in a way that implies it is a real Aseptaclean project, employee, customer,
before/after, or proof of work Aseptaclean personally completed. No caption may say or imply
"our work," "a recent project," "our team," or similar. If a visitor could reasonably read the
image as a real Aseptaclean result, it does not ship.

**Regulated-service imagery — the blanket prohibition is replaced.** `06`'s former "any image
implying a regulated service" line (old §6) is struck. In its place: licensed illustrative
photography **may** support Crime Scene & Trauma Cleanup and other regulated-service pages,
provided it stays restrained and professional. Allowed: a technician performing controlled
cleanup, gloved hands on an affected surface, PPE used naturally (not as spectacle), waste
packaging/handling context, a discreet residential or commercial interior, a vehicle interior,
controlled work-area imagery, neutral biohazard-cleanup context. Barred, absolutely and without
exception: dead bodies, visible human remains, gore, excessive blood, sensational crime
photography, theatrical hazmat imagery, fake law-enforcement scenes, a stock or AI person
presented as an Aseptaclean technician, and any image whose primary purpose is to frighten the
visitor rather than inform them. "Hazmat/PPE theatre" (old §6) is narrowed to mean exaggerated,
sensationalized PPE imagery — not a prohibition on ordinary, contextually appropriate PPE.

**Sourcing constraint, current as of 2026-09-03: no image-search, browse, or download tool is
available in an implementation session.** That is an environment limitation, not a reason to
redesign pages around its absence. The correct response, in order:

1. Rebuild page composition now with the correct image-led layout (image/copy split sections,
   correct proportions, correct rhythm) even before an image file exists for every slot.
2. Build each slot as a real, named, responsive component with the correct aspect ratio and
   crop behavior — not a placeholder box and not simulated with more typography.
3. Document the exact required subject, framing, and aspect ratio for every unfilled slot in
   this file (see each service page's entry below).
4. Use any already-approved suitable asset currently in the repository where it genuinely fits
   the slot's subject — do not force a mismatched asset into a slot just to fill it.
5. Leave a slot's underlying image reference pointing at a clearly named placeholder path
   (e.g. `NEEDS_ASSET: rodent-hero-16x9`) that a future asset drop can fill by replacing one file,
   not by re-touching page markup.

**A named, undelivered slot is not a placeholder violation under `18` §10 or `AGENTS.md` §0.3**
— those rules bar a *visible*, *shipped* placeholder graphic or fabricated photo reaching a
production build. A component built correctly and waiting for a real file, with nothing rendered
in its place that a visitor would see as broken or fake, is normal in-progress asset management,
not a release blocker. Do not render a visible "image coming soon" box on a public page; where no
asset exists yet, the containing section either uses an already-approved existing asset that
genuinely fits, or the component renders without an `<img>` until one is supplied — never a
broken image, alt-only box, or placeholder graphic.

---

## 4. Image slots — six, all unfilled (historical — §4.2 above is current policy)

`homepage.serviceCards` in `src/data/site.ts:336-358` carries `imageLabel` and `imageStatus`
fields describing what should eventually occupy each slot. These are text descriptors, not
`<img>` elements. **Whether they render as visible on-page text has not been confirmed** —
verify before launch, since a visible "Photo slot · owned" caption on an indexable page reads
as unfinished.

| Slot | Component | Class | Can it be filled by purchase? |
| --- | --- | --- | --- |
| Hero — South Bay exterior, dark overlay | `Hero.astro` | `[ATMOS]` | Yes. **Filled 2026-08-25** with a temporary development photograph, visibly labelled. |
| Recognition 1 — heavy buildup / neglected property | `ConditionRecognition.astro` | `[ATMOS]` | Yes. **Filled 2026-08-25**, temporary, visibly labelled. |
| Recognition 2 — hoarding / overwhelming contents | `ConditionRecognition.astro` | `[ATMOS]` | Yes. **Filled 2026-08-25**, temporary, visibly labelled. |
| Recognition 3 — estate / move-out / property reset | `ConditionRecognition.astro` | `[ATMOS]` | Yes. **Filled 2026-08-25**, temporary, visibly labelled. |
| Service card 1 — process kit flat-lay | `ServiceCards.astro` | `[OWNED]` | **No** |
| Service card 2 — kitchen or bath detail | `ServiceCards.astro` | `[ATMOS]` | Yes |
| Service card 3 — completed job photo | `ServiceCards.astro` | `[OWNED]` | **No** — slot stays empty rather than substitute stock |
| Five-stage — hands and clipboard at a threshold | `HandoffStandard.astro` | `[OWNED]` | **No** |
| Founder portrait | `OperatorAccountability.astro` | `[OWNED]` | **No** |

**Four slots cannot be filled by any purchase.** They gate on the Phase 0 owner shoot, which
has not happened. Per `18` §9, a non-owner-shot image in an `[OWNED]` slot is a hard release
blocker. Per `18` §10, placeholders are a production release blocker.

**Empty beats fake. Always.** The one test per slot: *does this image imply Aseptaclean
performed this work?* Yes → owner-shot or empty. No → licensed or self-shot atmosphere,
capped at three slots total.

**Cap exceeded by one, knowingly, 2026-08-25.** Four atmosphere slots are now filled (hero plus
the three recognition panels) against a cap of three. See the ruling in `05-DECISIONS-LOG.md`:
resolved under `AGENTS.md` §1 in favour of an explicit owner instruction, on the conditions that
every one of the four carries a visible development label and that all four are replaced by the
Phase 0 owner shoot. **Do not add a fifth without a new owner decision.** Two questions on the
current four are still open for the owner: whether CC BY-SA attribution is acceptable on a
commercial page even temporarily, and whether the bare-room photograph in recognition slot 3
reads as an implied "after".

### 4.1 Reuse across routes — no new asset has been acquired since 2026-08-25

Three route rebuilds have needed photography and none added a file. Each reuses an asset the owner
has already accepted as temporary, in a different role and a different crop, because sourcing new
CC BY-SA imagery would deepen the unresolved licensing question above rather than answer it.

| File | `/` | `/services/` | `/hoarding-cleanup-san-jose/` |
| --- | --- | --- | --- |
| `hero-development-residence-asurnipal.jpg` | full-bleed hero | — | — |
| `condition-development-hoarding-asurnipal.jpg` | 4:5 recognition panel | — | **full-bleed hero** (2026-08-26) |
| `condition-development-neglected-kolforn.jpg` | 4:5 recognition panel | — | — |
| `condition-development-reset-aismallard.jpg` | 4:5 recognition panel | — | **deliberately not used** — see below |
| `service-development-cleanup-asurnipal.jpg` | 4:5 side figure | 21:9 hero | **3:2 editorial panel** (2026-08-26) |
| `close-development-property-sanfranman59.jpg` | close-CTA image | — | — |

**The empty-room photograph is barred from the hoarding page specifically.** The open owner
question above — whether it reads as an implied "after" — becomes a hard failure on a route whose
whole argument is *start → sorted → cleared → cleaned*. A bare room placed anywhere near that
sequence reads as a fabricated after-shot, which `AGENTS.md` §0.3 forbids outright. It stays on `/`,
where it sits beside two other conditions and carries no sequence, until the owner rules on it.

**Reuse is a constraint being respected, not a design preference.** Two visitors following
`/` → `/hoarding-cleanup-san-jose/`, or `/services/` → `/hoarding-cleanup-san-jose/`, will each see
one photograph twice at different scales. That is a real cost and it is the Phase 0 owner shoot's
to fix — not a reason to add a seventh licensed file against a cap already exceeded.

---

## 4.3 Current — image slots on the four rebuilt service pages, 2026-09-03

**Current policy (§4.2 governs). Built under the sourcing-constraint procedure in §4.2**: each
slot below is a real, named, responsive component at the correct aspect ratio, composed into an
image/copy split section. No licensed file was available to source in this implementation
session (no image-search/browse/download tool). Each slot's `<img>` currently resolves to an
already-approved existing repository asset **only where the subject genuinely fits**; where
nothing in the repository fits, the component renders with no `<img>` (background-color block
matching the section's surface token, no placeholder graphic, no broken-image state) and is
marked `NEEDS_ASSET` in a source comment naming the exact required subject and ratio. Replacing a
`NEEDS_ASSET` slot is a one-file swap, not a markup change.

| Page | Slot | Section | Required subject | Ratio | Status |
| --- | --- | --- | --- | --- | --- |
| Severe Property Cleanup | Hero | 01 hero | Severely neglected residential interior, heavy buildup, no people, no identifiable address | 4:3 | `NEEDS_ASSET` |
| Severe Property Cleanup | Recognition | 02 recognize | Affected room / accumulated material, illustrative | 4:3 | `NEEDS_ASSET` |
| Severe Property Cleanup | Plan | 04 property plan | Cleanup/reset work in progress, illustrative | 5:4 | `NEEDS_ASSET` |
| Rodent Droppings & Animal Waste | Hero | 01 hero | Garage, cabinet, or storage-area property condition — no rodents as subject | 4:3 | `NEEDS_ASSET` |
| Rodent Droppings & Animal Waste | Recognition | 02 reframe | Storage/cabinet/garage interior, illustrative | 5:4 | `NEEDS_ASSET` |
| Rodent Droppings & Animal Waste | Cleanup context | 05 plan | Gloved-hand or technician controlled cleaning, illustrative, restrained | 4:3 | `NEEDS_ASSET` |
| Detailed Deep Cleaning | Hero | 01 hero | High-quality residential interior, bright, refined, no people | 4:3 | `NEEDS_ASSET` |
| Detailed Deep Cleaning | Kitchen detail | 03 look closer | Kitchen surface/detail cleaning, illustrative | 5:4 | `NEEDS_ASSET` |
| Detailed Deep Cleaning | Bathroom/surface detail | 04 scope | Bathroom or close-up surface detail, illustrative | 4:3 | `NEEDS_ASSET` |
| Crime Scene & Trauma Cleanup | Hero | 01 hero | Discreet, restrained specialty-cleanup or controlled work context — no gore, no remains | 4:3 | **Filled** 2026-09-04, `ppe_technician_1.jpg` |
| Crime Scene & Trauma Cleanup | Recognition | 04 after the scene | Discreet residential or commercial property interior | 5:4 | **Filled** 2026-09-04, `empty_clean_room.jpg` |
| Crime Scene & Trauma Cleanup | Professional cleanup | 06 scope | Technician/gloved-hand controlled cleanup, PPE used naturally, restrained | 4:3 | **Filled** 2026-09-04, `equipment_gear.jpg` |
| Crime Scene & Trauma Cleanup | Regulated waste | 10 authority | Waste packaging/handling context, neutral, no theatrical hazmat imagery | 16:9 | **Filled** 2026-09-04, `waste_disposal.jpg` |

**Assets still needed — precise list, not a placeholder request.** Nine licensed stock files
remain unfilled (the nine rows above the Crime Scene & Trauma Cleanup group), one per row, each
matching its "Required subject" column exactly and cleared for commercial/editorial use. None may
depict an identifiable real person as an implied Aseptaclean employee; none may be captioned in a
way that implies a real Aseptaclean project. Until supplied, every remaining `NEEDS_ASSET` slot
renders as a flat surface-color block (no `<img>`, no icon, no placeholder graphic) so the layout
composition is correct and visible today, and a future asset drop is a one-file replacement per
slot.

**Crime Scene & Trauma Cleanup's four slots — licence provenance not on file.** The four files
above landed in `src/assets/stock/` (untracked in git) before this entry was written, with no
recoverable source/licence citation in git history or elsewhere in this repository. They were
reviewed for subject-matter fit and swapped where wrong (see
`docs/05-DECISIONS-LOG.md`, "Crime Scene & Trauma Cleanup redesign pass," 2026-09-04), but "no
image enters production without a row here" (this file's own top-of-file rule) is only half
satisfied: the row exists, the licence does not. Confirm commercial-use licensing before this
route is treated as fully release-ready.

---

## 5. Phase 0 owner shoot — five setups

Cannot be delegated. Nothing in the `[OWNED]` column renders honestly until this happens.

1. **Founder portrait** — real, current, not stock, not AI
2. **Process-kit flat-lay** — the strongest owned asset available before any job exists
3. **Vehicle, three-quarter** — only if the discretion copy's "unmarked" claim is accurate;
   **verify the vehicle is actually unmarked before shipping that word**
4. **Hands and clipboard at a threshold** — no faces, no identifiable interior
5. **3–4 South Bay exteriors** — no identifiable addresses, no people

Target: **zero atmosphere images by the fifth completed project.** Every atmosphere slot is a
placeholder for real proof, not a permanent solution.

---

## 6. Permanently prohibited

**Amended 2026-09-03 — see §4.2.** Two items below are struck as blanket rules and replaced by
§4.2's narrower versions; the rest of this list is unchanged and still absolute.

Fake before/after · AI-generated people, properties, documents, or crews · smiling cleaning
crews · staged maids · branded fleet not owned · sensational hoarding interiors ·
~~hazmat or PPE theatre~~ **narrowed to: exaggerated/sensationalized PPE imagery — see §4.2**  ·
~~any image implying a regulated service~~ **struck — restrained, professional illustrative
photography may now support regulated-service pages, see §4.2** · the generic moving-box motif ·
any interior of an overwhelmed property presented so it could be mistaken for a genuine
Aseptaclean project photo · stock photography selected to make the company look larger, older,
busier, or more credentialed than it is · dead bodies, visible human remains, gore, excessive
blood, or sensational crime photography on any page · any stock or AI-generated person presented
or captioned as an Aseptaclean technician, employee, or customer.
