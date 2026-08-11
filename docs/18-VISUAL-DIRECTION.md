# 18 — Visual Direction Authority (Contractor-Professional)

**Status:** Active. Owner-directed, 2026-08-08. Binds `/` and every future page.
**Repo location:** `docs/18-VISUAL-DIRECTION.md`
**Precedence:** Sits directly below `01-QUALITY-GUARDRAILS.md`. Add to the `AGENTS.md`
precedence chain immediately after `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`.

**Supersedes, in `11-COMPOSITION-AND-TYPE.md` only:**
- §2 serif budget ("Newsreader appears in exactly nine places") — removed
- §6.1 eyebrow cap of seven — removed
- §6.5 The Mark, three-appearance cap — removed
- §9 failure-audit items: the icon+title+paragraph ban, the Newsreader count check,
  the hairline cap
- The 2px sharp-corner rule wherever it appears

**Explicitly retained from `11-COMPOSITION-AND-TYPE.md`** (these are why the good
sections work — do not discard them):
- §1 headings styled by role, never by tag. No `font-size` on any heading tag. Ever.
- §1/§2 the H1-to-body ratio floor: **≥2.5:1 at 390px, ≥4:1 at 1440px.** This is the
  actual fix for "the page looks flat." A font change does not fix a ratio.
- §3 measure variation — no two consecutive sections share a container width
- §4 rhythm ratios — adjacent sections differ by ≥1.5x or are exactly 1.0x
- §7 spend boldness once — the Property Handoff Record remains the single dramatic moment
- §10.2 document artifact rules, §10.4 interaction rules, §10.5 responsive art direction

---

## 1. The direction, stated plainly

The reference is a working contractor-professional site: **photo-forward, card-structured,
serif-headlined, warm-accented.** Owner selected this reference twice, a month apart. It is
the direction. It is not a newspaper and it is not a biotech interface.

**The serif stays.** The reference uses a heavy serif display for every section headline and
does not read as editorial. The prior conclusion that serif caused the "newspaper" feeling was
wrong. The actual causes were: no photography, no card containers, no accent color.

Three things make the reference feel expensive, in order of impact:

1. **Photography in nearly every section** — real work, not decoration
2. **Repeating card containers with images on top** — photo → icon chip → title → text
3. **One warm accent color doing real work** — buttons, chips, icons, and one full band

The gap between this site and that one is those three things. Nothing else.

---

## 2. Type

| Token | Role | Face |
| --- | --- | --- |
| `--ac-text-display` | The one line the page is remembered by. Once | Serif display |
| `--ac-text-h1` | Page thesis. Hero only | Serif display |
| `--ac-text-h2` | Section headline | Serif display |
| `--ac-text-h3` | Card titles, stage names, FAQ questions | Serif display |
| `--ac-text-lead` | Paragraph under an H1 or H2 | Sans |
| `--ac-text-body` | Reading copy | Sans |
| `--ac-text-sm` | Captions, helper text, form hints | Sans |
| `--ac-text-xs` | Eyebrows, labels, artifact fields, metadata | Sans |

Serif is now the heading system, not a spent budget. Use it on every H1–H3. Body, lead, and
all utility type stay sans.

The three-in-a-row ban from `11` §2 **stays**: no three consecutive text elements within 15%
of each other on size, weight, and colour simultaneously.

---

## 3. Cards — the structural unit

The card is the primary container. Anatomy, top to bottom:

1. **Image** — 16:9 or 4:3, flush to the card's top edge, no inset
2. **Icon chip** — small rounded square, accent-tinted background, line icon
3. **Title** — `--ac-text-h3`, serif
4. **Body** — 2–3 lines, sans, `--ac-text-body`

Card treatment:
- `--ac-radius-card: 12px` — soft, not sharp. This overrides the old 2px rule.
- White surface on a light-grey section background
- Shadow: soft and low — `0 1px 3px rgba(16,24,37,.06), 0 12px 24px -16px rgba(16,24,37,.18)`
- Border: 1px hairline, or none where the shadow carries it
- Internal padding: 24–28px

Cards sit in grids of 2, 3, or 4. Icon chips are permitted and expected — the old ban on
icon+title+paragraph modules is lifted for cards specifically.

---

## 4. Colour and the accent

Base palette is unchanged (`11` §10.1): Navy `#1C355E`, Deep Navy `#122840`, Slate Blue
`#6A9BC3`, Steel `#A8B8C8`, Warm White `#F7F8FA`, Text `#334155`.

**Accent = Slate Blue, promoted.** The reference uses yellow; yellow reads utility-contractor
and this business is positioned above that tier. Slate Blue carries the same structural job
without the register drop.

**Primary buttons are Navy 800 (`--ac-color-navy-800`) with white text — not Slate Blue.**
Slate Blue at full fill on the site's light surfaces measures low contrast against white/warm-white
backgrounds and reads as washed-out or disabled, which is disqualifying for a primary CTA. Slate
Blue is reserved for: icon chips, the credential chip, and the accent band fill. It never fills a
button. Button hover state moves to Navy 900 for a clearly-differentiated interaction state.

The accent (Slate Blue) appears on: icon chips, the credential chip, and exactly one
full-width accent band. Nowhere else. An accent used everywhere is not an accent.

**One accent band per page, maximum.** It replaces the reference's emergency-services strip.

---

## 5. Imagery — the policy that governs every slot

Ask one question per image slot: **does this image imply Aseptaclean performed this work?**

**If no → licensed or self-shot atmosphere is permitted.**
Residential exteriors, empty presentation-ready rooms, clean material and detail crops,
neutral document or desk compositions. These set tone and make no claim.

**If yes → the image must be owned, or the slot stays empty.**
Before/afters, crews working, cleared rooms, vehicles in service, anything a reader would
take as a completed job. A fabricated proof image in a trust-led category destroys the
entire proposition. Empty beats fake. Always.

**Permanently prohibited** (carried forward from `11` §10.3): fake before/after, AI-generated
people, smiling cleaning crews, staged maids, branded fleet not owned, sensational hoarding
imagery, hazmat/PPE theatre, images implying regulated services, generic moving-box motif.

**Every image is logged in `06-ASSET-MANIFEST.md`** with source, licence, and whether it is
owned or atmosphere. No exceptions, including free-licence images.

**Captions:** atmosphere images are never captioned as work and never sit inside a card that
names a completed project.

### 5.1 Launch asset set — owner-shot, Phase 0

Five setups, horizontal, natural light. These are genuine and carry no claims risk:

1. **Founder portrait** — plain wall or vehicle background, mid-shoulder, composed
2. **Process kit, flat-lay** — set-aside bags and labels, clipboard, scope forms, gloves,
   tablet, shot from above on a clean surface. This is the strongest owned asset available:
   it shows method without showing a job.
3. **Vehicle** — three-quarter angle, clean, residential street
4. **Hands + clipboard at a threshold** — doorway, scope document, no face required
5. **3–4 South Bay residential exteriors** — public sidewalk, no identifiable addresses,
   no people

### 5.2 Atmosphere slots at launch — three maximum

Licensed interior/architectural stock, used as tone only:
- Empty presentation-ready room
- Clean kitchen or bath detail
- Neutral document/desk composition

### 5.3 Upgrade path

Every completed job replaces one atmosphere slot with owned work — shot with written
permission, faces and addresses excluded, logged in the manifest. Build the slots so the
swap is a file replacement, not a redesign. Target: zero atmosphere images by the fifth
completed project.

---

## 6. Section map — binding

Sections carrying images are marked. `[OWNED]` = must be owner-shot. `[ATMOS]` = licensed
atmosphere permitted. `[NONE]` = no image.

| # | Section | Image | Notes |
| --- | --- | --- | --- |
| 1 | Hero | `[ATMOS]` | Dark overlay on a South Bay exterior. Credential chip, serif H1, two CTAs |
| 2 | Credential bar | `[NONE]` | Four items. See §7 — not a stat bar |
| 3 | Service cards | `[OWNED]` + `[ATMOS]` | **Three cards only at launch.** See §6.1 |
| 4 | Why Aseptaclean | `[NONE]` | Four-item icon grid |
| 5 | Accent band | `[NONE]` | "Working against a listing, transfer, or family deadline?" + primary CTA button + call link, right-aligned, vertically centered |
| 6 | Five-stage standard | `[OWNED]` | Threshold/clipboard image alongside the stage rail |
| 7 | **Property Handoff Record** | `[NONE]` | Unchanged. Full width. The one dramatic moment |
| 8 | Areas we serve | `[NONE]` | Pill list, existing city set |
| 9 | Founder / operator | `[OWNED]` | Portrait, credentials, authority-limit disclaimer verbatim |
| 10 | FAQ | `[NONE]` | Accordions |
| 11 | Final CTA | `[NONE]` | Deep navy band |
| — | Footer | `[NONE]` | Deep navy, full legal block |

The Handoff Record stays the single bold moment. It is the one asset the reference does not
have. It does not compete with photography — it outranks it.

### 6.1 Three cards, not six

The reference runs six service cards because it has six sets of real job photos. Three cards
filled honestly beat six padded with atmosphere. Launch set:

1. **Complex property clearing** — nonhazardous contents, signed scope
2. **Reset & restoration cleaning** — kitchens, baths, interiors, accessible surfaces
3. **Animal & organic condition cleaning** — see §7 for mandatory wording

Add cards only as completed jobs generate owned photography.

---

## 7. Claims constraints — non-negotiable, override all design intent

`01-QUALITY-GUARDRAILS.md` outranks this file. These are the specific collisions between the
reference's patterns and this business's actual standing:

**The credential chip must never say "licensed."** The reference's chip reads
"Licensed & Insured — CT #…". Aseptaclean is not a licensed contractor. The chip reads:

> Insured · Organic Pathogen Endorsed · Owner-Operated

**No stat bar.** The reference runs "20+ Years / 24/7 / 100% / All CT". There are no
completed-job counts, years-in-business figures, or review counts to state truthfully.
Section 2 is a **credential bar** — same visual weight, verifiable content:

> Insured · Organic Pathogen Endorsed · Owner-Operated · Santa Clara County

**Animal/organic scope is worded as cleaning.** Under the organic pathogen endorsement.
Never "remediation," "biohazard," "decontamination," "sanitization," or "sterilization."
Card and FAQ copy carries the limiting clause: *cleaning only — not a decontamination,
sterilization, or health-safety determination.* Endorsement wording must be verified against
the actual COI before production release.

**Environmental / human biohazard remediation does not appear on the live site** until the
credential is held. Human bloodborne material, sewage, and active mold remain on the
exclusion list and are referred out.

**Hantavirus and rodent-specific handling are not named anywhere** until crew PPE and
protocol are confirmed in writing.

**No pricing figure ships unverified.** Any starting number is confirmed against real project
data or rendered as a text fallback. `$NaN` or any placeholder is a release blocker.

---

## 8. Performance and motion

- Total JS under 50KB gzipped
- Lighthouse mobile ≥95 performance, 100 accessibility
- All images: modern format, explicit width/height, lazy below the fold, meaningful alt text
- Motion budget: one scroll-triggered reveal on the Handoff Record. Nothing else.
  Fade-up on every section is prohibited.
- `prefers-reduced-motion` respected
- Visible focus states non-negotiable

---

## 9. Failure audit — run before calling the page done

Screenshot `/` at 390px and 1440px, then answer in writing:

- [ ] Is any `font-size` declared on a heading tag anywhere in the codebase? → fail
- [ ] Is the H1-to-body ratio below 2.5:1 at 390px or 4:1 at 1440px? → fail
- [ ] Do any two adjacent sections share container width *and* vertical padding? → fail
- [ ] Three consecutive text elements within 15% on size, weight, and colour? → fail
- [ ] More than one dramatic moment competing with the Handoff Record? → fail
- [ ] More than one accent band? → fail
- [ ] Any image in an `[OWNED]` slot that is not owner-shot? → fail, hard release blocker
- [ ] Any atmosphere image captioned as, or placed inside, a completed-job claim? → fail
- [ ] Any image absent from `06-ASSET-MANIFEST.md`? → fail
- [ ] Does the credential chip or bar contain "licensed," a job count, or a years figure? → fail
- [ ] Does any copy use remediation, biohazard, decontamination, sanitize, or sterilize? → fail
- [ ] Cover the logo. Could this be a generic cleaning company, a SaaS product, or a junk
      hauler? → fail, and name which sections caused it

Record the result in `05-DECISIONS-LOG.md`.

---

## 10. Sequencing

**Phase 0 — owner shoot.** The five setups in §5.1. Nothing in Phase 2 renders honestly
without them. This gates the build and cannot be delegated.

**Phase 1 — this document lands in the repo**, `AGENTS.md` precedence updated, the
superseded sections of `11-COMPOSITION-AND-TYPE.md` struck with a pointer here, direction
change logged in `05-DECISIONS-LOG.md`.

**Phase 2 — build to §6.** Image slots ship as labelled placeholders until Phase 0 assets
land. Placeholders are acceptable in development; they are a release blocker in production.

**Phase 3 — swap atmosphere for owned work** as completed jobs accumulate.

**Note on `17-REFERENCE-TRANSLATION-MARTEL.md`:** deleted 2026-08-11 per
`docs/22DOCDISPOSITION.md` §1 — it was orphaned (its token vocabulary and component names
never matched this codebase) and specified a TrustBar reading "licensed," which this file §7
and `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` forbid outright. Its *analysis* of the reference
(spacing rhythm, card structure, two-colour discipline) was sound and already informed this
file before deletion; nothing further needs to be read from it.

---

## 11. What this direction does not change

Design does not outrank operations. A site matching this specification, deployed, still does
not earn revenue while the phone rings to voicemail. Live answering, crew capacity, DNS
cutover, and lead-alert delivery remain ahead of visual work in priority order.
