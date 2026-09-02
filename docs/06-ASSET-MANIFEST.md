# 06 — Asset Manifest

**Regenerated 2026-08-11** from the real inventory. The previous version listed a retired
typeface, omitted two live ones, and described a placeholder treatment that no longer matches
the build — which meant the manifest failed `18` §9's own rule that any asset absent from it
is a release blocker.

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

## 4. Image slots — six, all unfilled

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

Fake before/after · AI-generated people, properties, documents, or crews · smiling cleaning
crews · staged maids · branded fleet not owned · sensational hoarding interiors · hazmat or PPE
theatre · any image implying a regulated service · the generic moving-box motif · any interior
of an overwhelmed property that could be mistaken for Aseptaclean's work · stock photography
selected to make the company look larger, older, busier, or more credentialed than it is.
