# AGENTS.md — Aseptaclean repository operating rules

**Version:** 2026-08-11. Replaces `docs/AGENTS-PRECEDENCE-BLOCK.md` in full.
**Why this file exists:** an alignment audit on 2026-08-11 found five competing precedence
chains in `docs/`, three of them pointing at files that do not exist, and a standing rule that
forbade the only working lead endpoint in the repository. This file is the single operative
chain. If any other document disagrees with this one, this one wins and the conflict goes in
`docs/05-DECISIONS-LOG.md`.

---

## 0. Read this before touching anything

Three rules have caused, or nearly caused, production damage. They are absolute.

### 0.1 The lead endpoint

**`functions/api/lead.ts` is the only lead endpoint. It is correct. Do not touch it.**

- Do **not** create `src/pages/api/lead.ts`. It has never existed.
- Do **not** install `@astrojs/cloudflare`. The adapter emits `_worker.js`, which causes
  Cloudflare Pages to ignore `functions/` entirely and silently kills lead delivery.
- The public URL contract is `/api/lead`. That is preserved by Pages routing, not by Astro.
- Deploy target is **Cloudflare Pages**. `output: "static"` plus a `functions/` directory.

The previous version of this file said the opposite. If you find a document that still says
"one endpoint: `src/pages/api/lead.ts`," it is wrong — flag it, do not act on it.

### 0.2 Claims

`docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` governs every public-facing word on this site,
including titles, meta descriptions, alt text, JSON-LD, form copy, and third-party profiles.
It outranks every design, copy, and composition document. Read it before writing copy.

Historically this pointer went to `04-CLAIMS-GUARDRAILS.md`, which does not exist. Doc 21 is
that file, written.

### 0.3 Never invent

No fabricated review, rating, testimonial, project count, case study, client logo, statistic,
badge, before/after image, or credential. No AI-generated people, properties, documents, or
crews. If a proof slot has no real asset, **the slot ships empty**. Empty beats fake, always.

---

## 1. Precedence chain

Conflicts resolve **up** this list. Never silently merge contradictory instructions — record
every material conflict in `docs/05-DECISIONS-LOG.md`.

| # | Authority | Governs |
| --- | --- | --- |
| 1 | Current law, active insurance, verified business facts, explicit owner decisions | Everything |
| 2 | `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` | Every public word, claim, and regulated-service boundary |
| 3 | `docs/01-QUALITY-GUARDRAILS.md` | Execution quality, anti-generic, evidence standards |
| 4 | `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | Phase 4 canonical spec — architecture, acceptance |
| 5 | `docs/18-VISUAL-DIRECTION.md` | Visual system, section map, imagery, accent discipline |
| 6 | `docs/19-SYSTEM-AND-SITEMAP.md` | Route architecture, phased sitemap, growth |
| 7 | `docs/27-COPY-CANONICAL.md` | Copy authority — finished copy for the routes it covers (§9–18: homepage, service hubs, individual service pages, service areas, company pages) |
| 8 | `docs/20-COPY-VOICE.md` | Voice rules for copy doc 27 doesn't cover yet; QA standard doc 27's own copy must pass |
| 9 | `docs/aseptaclean-FINAL-v2.html` | `/` only — markup, tokens, structure (copy for `/` is now rank 7) |
| 10 | `docs/06-APPROVED-HOMEPAGE-COPY.md` | Copy for routes doc 27 doesn't cover |
| 11 | `docs/11-COMPOSITION-AND-TYPE.md` | Type scale, measure, rhythm (where 18 has not struck it) |
| 12 | `docs/02-OWNER-INPUTS.md` | Business facts, where not contradicted by the decisions log |
| 13 | `docs/07-ONE-PAGE-DIRECTIVE.md` | §3 conflicts, §6 guarantees, §7 forms, §11 QA only |
| 14 | `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | `/private-residence-reset/` only |

**Rank 12 note.** `07` §10 says "if they disagree, `02-OWNER-INPUTS.md` wins." That is
**revoked**. `02` is demonstrably stale on the primary CTA, the city list, and the county
label. The decisions log (rank 1) wins. `02` is being corrected — until it is, treat any
`02` value contradicted by a dated log entry as void.

**Rank 7 note.** Doc 27 governs copy text only — homepage §9, service-hub copy §10,
individual service-page copy §12–15, service-areas copy §16, company-page copy §17,
assessment-form copy §18. It does **not** govern architecture, URLs, SEO waves (`19` still
owns those), or the visual system (`18` still owns that) — doc 27's own header disclaims
those, and two conflicts have already been adjudicated on exactly that boundary: doc 19's
"H1 in buyer's words" rule beat doc 27's literal service-name H1s, and doc 18's
three-card homepage rule beat doc 27's four-card copy (both logged in
`docs/05-DECISIONS-LOG.md`, 2026-08-16). Doc 27 §25 and every platform/deployment
reference inside doc 27 describe an abandoned ChatGPT-hosted build that was never live —
ignore them; the live stack is Astro on Cloudflare Pages per §0.1 above.

**Rank 8 note.** Doc 20 Part 2's verbatim rewrites are retired — doc 27 superseded them.
Part 1's rules (contractions, aphorism limits, rhythm, read-aloud gate, untouchable
sentences) remain the standard for any new copy doc 27 doesn't cover, and are the QA
standard doc 27's own copy must pass before publish.

**Rank 9 note.** FINAL-v2's copy authority for `/` is revoked as of the doc-27 promotion
above — it retains markup, CSS custom property values, and section structure for `/` only.
It does **not** override ranks 2, 3, or 4. Where v2 conflicts with a claims rule, the claims
rule wins and v2 gets edited.

### Reference only — do not build from
`00-MASTER-BRIEF.md` · `03-BUILD-PLAN.md` · `12-SESSION-PROMPTS.md` (predates doc 18) ·
`13-REMEDIATION-PASS.md` (describes a build state that no longer exists) ·
`14-RESEARCH-FINDINGS.md` · `15-UX-DESIGN-RESEARCH-FINDINGS.md`

### Orphaned — never read for values
`17-REFERENCE-TRANSLATION-MARTEL.md` — depends on four files that do not exist and names
eight tokens and five components that do not exist. Read for reasoning only.

### Non-governing
`90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` — inert until all four gates clear and the owner
issues an explicit supersession note. `site map` — superseded architecture, see §5.

### Files that do not exist — stop if a document points you at one
`02-BUILD-SPEC.md` · `03-VOICE.md` · `04-CLAIMS-GUARDRAILS.md` · `05-OPERATIONS.md` ·
`01-STRATEGY.md` · `B01-home.md` · `07-PRIVATE-RESIDENCE-RESET-STRATEGY.md` ·
`09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` (archived)

---

## 2. Current route architecture

The site is **no longer one-page**. `19-SYSTEM-AND-SITEMAP.md` Part 2 supersedes `07` §2.
**`docs/SITEMAP-MASTER.md` (2026-08-16) is now the single source of truth for the full
route list and index status** — supersedes `19` §2.1 and `27` §7. The lists below are kept
in sync with it for quick reference; if they drift, master wins.

**Live and indexable**
```
/                          homepage (FINAL-v2)
/about/  /contact/  /handoff-standard/     corrected onto this list 2026-08-16 — all three
                            ship no `noindex` prop (BaseLayout default is indexable) and were
                            previously missing here / miscategorized below
/request-assessment/       progressive form — a real canonical route, never redirect it
/private-residence-reset/  campaign page, out of nav, one low-emphasis crawlable link
/thank-you/                noindex
/privacy/  /terms/  /cookie-policy/        Termly-controlled
/data-request/             live compliance surface — must resolve before DNS cutover
/sms-notification-consent/ byte-preserved, under Twilio 10DLC carrier review — DO NOT EDIT
/api/lead                  Cloudflare Pages Function
```

**Built, `noindex`, excluded from `sitemap.xml.ts`, unlinked from nav and footer**
```
/estate-cleanout-san-jose/          /hoarding-cleanup-san-jose/
/animal-waste-cleanup-san-jose/     /senior-downsizing-san-jose/
/deep-cleaning-san-jose/            /property-cleanouts-san-jose/ (renamed 2026-08-16,
/service-areas/  (cityPages = [])                                was .../for-managers/)
/estate-cleanout-checklist/
/detailed-cleaning/  /specialty-cleaning/  /property-clearing/   (hub pages, added 2026-08-16)
/commercial-cleaning-san-jose/                                   (gate: crew, added 2026-08-16)
```
Each stays noindex until its own gate clears. Do not bulk-flip.

**Do not build, in any form — no route, draft, stub, sitemap entry, or nav link**
```
/biohazard-cleanup*/  /blood-cleanup/  /unattended-death-cleanup/
/crime-scene-cleanup/ /human-waste-cleanup/  /sharps-cleanup/
/encampment-cleanup/  /vehicle-biohazard-cleanup/
garage-cleanout · basement-cleanout · furniture-removal · mattress-disposal
any reviews page, until reviews exist
any /services/* or /locations/* route (that is the superseded `site map` architecture)
```
`19` §2.1 Phase 3b's single-gate `/biohazard-cleanup-san-jose/` line is **void** — Phase 5's
four-gate rule governs. If you find that Phase 3b line, delete it.

**City pages** nest under `/service-areas/{city}/` and require ≥1 completed job in that city
plus original content that could only be about that city. No verified content → no page.

---

## 3. Business facts — single source of truth

Everything below lives in `src/data/site.ts`. Never hardcode any of it in a component.

```
brand            Aseptaclean
legal            Aseptaclean, LLC
founder          Matthew Ruiz — Founder & Principal Operator
phone            (408) 785-7588   tel:+14087857588   sms:+14087857588
email            info@aseptaclean.com        (inbox test still required)
hours            Mon–Sat 7:00 AM – 7:00 PM PT, closed Sunday
address          service-area business — no published street address, ever
region           South Bay & Peninsula        (NOT "Santa Clara County" — Atherton is San Mateo)
insurance        Insured. Certificate of Insurance available upon request.
endorsement      Organic Pathogen Endorsed    (cleaning language only — see doc 21)
primary CTA      Request an assessment
secondary CTA    Text a photo
assessment fee   $195, credited toward an approved project booked within 7 days
starting price   NOT PUBLISHED — see §4
response         within one business day
TSWMP            pending / unverified — never published in any form
```

**Suppression rules — all six are absolute.** Unverified insurance wording → suppress the
insurance statement. Inactive social account → omit it. Never render an empty phone link.
Never show a success state against a non-working endpoint. Never expose a placeholder in a
production build. Never infer a physical office from service-area coverage.

---

## 4. Pricing — owner decision, 2026-08-11

**No price figure is published anywhere on the site.** Owner rationale: with zero reviews and
zero completed-project proof, a published floor invites price shoppers and undercuts the
positioning. This closes `07` §5.

Implementation:
- Remove `PUBLIC_STARTING_PRICE` from every rendered surface. Keep the env var and the
  build-time validation only if the value is genuinely consumed; if nothing renders it,
  delete the variable and its gate rather than leaving a dead check.
- **Keep the cost drivers.** Silence is weaker than "here is what moves the number." The
  pricing section states what determines price — property size and access, volume of approved
  contents, sorting and review required, cleaning condition, disposal requirements, labor and
  schedule, concealed conditions — and then routes to the assessment.
- The **$195 on-site assessment fee stays published.** It is a real, fixed, defensible number
  and it is the only figure on the site.
- `/private-residence-reset/`'s `$2,000` anchor is removed under the same rule.
- Revisit once there are ≥5 completed projects with photographs and ≥5 Google reviews.

---

## 5. `site map` — superseded, do not build from

The project doc named `site map` describes a `/services/*` + `/locations/*` architecture with
biohazard, trauma-scene, decomposition, rodent-droppings, rodent-urine, and post-infestation
routes, plus a `/projects/` hub with named case studies. **All of it is superseded and parts
of it are unlawful to publish.**

- Biohazard/trauma routes violate the Phase 5 four-gate rule and the owner's TSWMP deferral.
- Rodent- and infestation-named service routes carry real Structural Pest Control Board
  exposure — see doc 21 §3.
- The `/projects/` case studies do not exist. Zero completed jobs are documented.

`19-SYSTEM-AND-SITEMAP.md` is the architecture authority. Give `site map` a superseded banner
or remove it from the working set.

---

## 6. Typography — amended 2026-08-11

`10` item 3 mandates "Newsreader Variable + Instrument Sans Variable." **That mandate is
amended.** The shipping stack is:

```
--serif   Newsreader Variable      (display, H1–H3)
--sans    Inter Variable           (body, UI)
--mono    IBM Plex Mono            (artifact field labels, status metadata only)
```

Rationale: the FINAL-v2 port swapped the sans face and the build is measured and working.
Reverting re-opens font loading, LCP, and every H1:body ratio measurement on a near-done
site for no user-visible benefit. Instrument Sans is removed from `06-ASSET-MANIFEST.md`;
Inter Variable and IBM Plex Mono are added, with source and license.

All three are self-hosted WOFF2 via `@fontsource`. **Never a Google Fonts CDN request in
production.** One exception, deliberate and fenced: `/sms-notification-consent/` is
byte-preserved under carrier review and loads Montserrat/Open Sans from Google. Do not
"fix" that page. Exclude it from any font grep gate.

### The two typography laws that do not bend

1. **No `font-size` declaration on any heading tag. Zero exceptions.** Not in a component
   `<style>` block, not inline. Headings get size from their `.ac-type-*` role class.
2. **H1:body ratio floor — ≥2.5:1 at 390px, ≥4:1 at 1440px.** Measured on computed styles,
   not on token values. This is the fix for "the page looks flat"; it is not negotiable.

---

## 7. Standing prohibitions

- No `licensed` in any credential chip, bar, schema, or answering-service script.
- No `remediation`, `biohazard`, `decontamination`, `sanitization`, `sterilization` as a
  service claim. See doc 21 for the exact permitted and forbidden constructions.
- No `hoarder` as a noun. No `gross filth` anywhere.
- No hantavirus or rodent-specific handling language until written crew protocol exists.
- No stat bar — no job counts, years in business, or review counts.
- No `free assessment` or `free consultation` — the on-site assessment is $195.
- No retired mechanism names: `Assess → Define → Authorize → Clear → Document` is dead.
  The sequence is `Scope → Protect → Clear → Reset → Verify`.
- No retired guarantee names. The block is the **Handoff Assurance**.
- No placeholder, `[OWNER INPUT: …]` string, or `REPLACE_WITH_*` value in a production build.

---

## 8. Before you close a session

Append to `docs/05-DECISIONS-LOG.md`: what changed, what conflicted, what you did not do and
why, and any rule in this file you had to work around. A conflict you resolved silently is a
defect, even when the resolution was right.
