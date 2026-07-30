# Phase 4 — One-Page Collapse Directive

**Status:** Active. Supersedes the multi-page sprint plan.
**Date:** July 30, 2026
**Repo location:** `docs/PHASE-4-ONE-PAGE-DIRECTIVE.md`
**Read with:** `PHASE-4-CANONICAL-MASTER-SPEC.md` (the canonical file), `04-CLAIMS-GUARDRAILS.md`

This file does one job: it tells you and the build agent **what the canonical Phase 4 spec
changes about the existing repo**, and **what is now out of scope for launch.**

The canonical spec already describes a four-route site. It is a one-page spec. The problem
is not that it needs collapsing — it is that 20 sessions of work were built against a
28-page brief system that the canonical spec silently invalidates. This file makes that
invalidation explicit so nothing gets half-migrated.

---

## 1. Precedence chain — replaces the previous chain

1. Current law, active insurance, verified business facts, explicit owner decisions
2. `04-CLAIMS-GUARDRAILS.md` — retained in full; it is stricter than canonical §3.7
3. `PHASE-4-CANONICAL-MASTER-SPEC.md`
4. Canonical Appendix A — approved homepage copy (controls wording)
5. Canonical Appendix B — Private Residence Reset strategy
6. Everything else, only where it does not conflict

`01-STRATEGY.md`, `02-BUILD-SPEC.md`, `03-VOICE.md`, `05-OPERATIONS.md`, `07-VISUAL-SYSTEM.md`,
`09-PREMIUM-EXECUTION-BAR.md` drop to reference status. They are no longer fed to the build
agent. See §3 for the specific clauses that survive.

---

## 2. Route collapse — final

**Build these. Nothing else.**

```text
/                            Flagship one-page sales page (Handoff Reset)
/request-assessment/         Full progressive form
/thank-you/                  noindex, conversion destination
/privacy-policy/  /terms/  /cookie-policy/    Termly-controlled
/api/lead                    Single endpoint
```

**Phase 2, after `/` is live and converting:**

```text
/private-residence-reset/    Campaign page, out of nav, one crawlable internal link
```

**Deleted from scope. Archive the briefs outside the repo; do not leave them in `docs/`.**

| Killed | Where its value goes |
| --- | --- |
| `B02` hoarding cleanup service page | Search language folded into `/` recognition + FAQ copy |
| `B05–B09` commercial / B2B landing pages | Dead for launch. Also unblocks the crew-capacity gate |
| `B10` deep cleaning page | Absorbed into the Reset stage and Private Residence Reset |
| `B11–B17` remaining service pages | Absorbed into `/` scope section |
| `B18–B21` city pages | Dead. They were gated on research nobody has done |
| `/guarantees/` `/process/` `/about/` `/pricing/` `/who-we-help/*` `/locations/*` `/projects/` `/resources/` | All become sections of `/` |
| `10-DOCUMENT-DESTRUCTION.md` | Parked. No NAID vendor contracted; no "certified" language ships |

**Deleting these removes four active blockers at once:** crew capacity, deep-clean checklist
scope, deep-clean price range, and city-page research.

---

## 3. Conflict resolution — pre-resolved, do not re-litigate

Every row below is a material contradiction between the canonical spec and the locked v2
system. The **Decision** column is binding.

| # | v2 system says | Canonical Phase 4 says | Decision |
| --- | --- | --- | --- |
| 1 | Offer is hoarding / estate / severe-condition clearing | Offer is **Aseptaclean Handoff Reset** — clearing + deep clean + documented closeout | **Adopt Phase 4.** But see §4 — the hoarding/estate search language does not get deleted |
| 2 | $6,500–12,000, $8,000 planning average | "Projects generally begin at **$1,500**" | **Flagged. See §5. Do not ship $1,500 without reading it.** |
| 3 | Free on-site assessment, 7-deliverable value stack | Photo review free; **on-site $195, credited within 7 days** | **Adopt Phase 4.** Purge every "free on-site assessment" string in the repo |
| 4 | Four named guarantees incl. **Discretion Standard** and **Next-Day Scope ($250 off)** | Handoff Assurance: 5 bullets + Scope-Completion Guarantee | **Adopt Phase 4 structure, re-insert discretion.** See §6 |
| 5 | Assess → Define → Authorize → Clear → Document | **Scope → Protect → Clear → Reset → Verify** | **Adopt Phase 4.** The old five steps had no cleaning stage; the offer now sells one. Purge the old sequence everywhere including alt text and schema |
| 6 | Defined Scope Document + Completion Record (two artifacts) | **Property Handoff Record** (one) | **Adopt Phase 4.** One artifact, one signature moment. Retire the second component |
| 7 | Montserrat 600/700 + Open Sans 400/600 | **Newsreader Variable + Instrument Sans Variable** | **Adopt Phase 4.** Canonical §9.1 supersedes explicitly. This voids the in-flight H1 sizing bug — the whole scale is replaced, do not audit the old one |
| 8 | Token prefix `--ac-*` | Unprefixed `--color-*`, `--text-*` | **Keep the `--ac-` prefix. Adopt Phase 4 values, scale, and fonts.** A global rename is churn with zero user-visible benefit and high regression risk 20 sessions in. Map 1:1, document the map, move on |
| 9 | 3 fields only, no wizard, no progress bar | 3-step progressive disclosure, ~20 fields, visible progress | **Both, split by route.** See §7 |
| 10 | Worker → HubSpot → Zapier/Make → 302 | Astro endpoint → Turnstile → store → HubSpot → Resend → Twilio → record outcomes | **Adopt Phase 4.** Drop Zapier/Make entirely — it is a failure surface with no owner |
| 11 | Astro 5, Cloudflare Pages | **Astro 7.1.x** | **Freeze at the installed major for launch.** See §8 |
| 12 | The Mark (navy rectangle) as signature device | Not mentioned; canonical §7.3 bans decorative repetition | **Keep The Mark, used at most 3 times on `/`.** It is the only carryover from the visual retrofit that survives the type change |
| 13 | Stock photography actively harms trust; Tier 1 self-shot only | Canonical §15 — same conclusion, longer list | **No conflict.** Canonical §15 governs. Asset manifest required |
| 14 | NAP phone unverified | **(408) 785-7588** / `tel:+14087857588` / `sms:+14087857588` | **Blocker closed.** Write to `config.ts`, mirror to GBP character-for-character |
| 15 | Owner answers; voicemail otherwise | Speed-to-lead ~5 min business hours | **Unchanged and still the highest-ROI spend.** The site cannot fix voicemail. Live answering service before paid traffic |

---

## 4. The one thing the canonical spec gets strategically wrong on SEO

Canonical §23.3 sets the homepage title to
`Property Cleanout & Deep Cleaning in San Jose | Aseptaclean`.

That term competes against junk removal and maid services — high volume, low intent, and a
field where a zero-review business loses on proximity and budget. Meanwhile the v2 system
correctly identified `hoarding cleanup san jose` as the highest-intent commercial query in
the category, with the weakest incumbent content on the SERP.

Collapsing to one page does not require abandoning that. It requires the page to earn both.

**Binding resolution:**

- Keep the canonical title and meta exactly as written. It matches the offer.
- The recognition section (Appendix A §8.8) and the FAQ **must** carry the situational
  language a hoarding/estate searcher types: heavy accumulation, inherited property, estate
  cleanout, whole-house cleanout, property nobody can get to. Written as situations, per
  `03-VOICE.md` §6 vocabulary rules, never as a keyword block.
- `hoarder` never appears as a noun. `gross filth` does not appear at all on a one-pager.
- Add one FAQ: *"Do you handle properties with heavy accumulation or hoarding conditions?"*
  Answer it factually, inside the lawful scope, with the exclusion list attached.

If organic on that query matters later, it earns a dedicated page in Phase 3 — with the
volume to justify it, not on speculation.

---

## 5. The $1,500 problem — owner decision required before build

`05-OPERATIONS.md` §7 declines single-room pickups as a matter of policy and filters on
economics at the phone stage. `01-STRATEGY.md` sets a $8,000 planning average and an
allowable CAC of $900 derived from it.

**Publishing "projects generally begin at $1,500" anchors the entire funnel at 19% of the
planning average.** The predictable result is a lead mix dominated by exactly the jobs the
operations doc says to refuse, a collapsing qualified rate, and CAC math that stops working.

Three options, in order of preference:

1. **Raise the published floor to a number you would actually accept.** If the smallest
   project worth a crew day is $2,800, publish $2,800. The number's job is to filter, not
   to be inviting.
2. **Publish a band, not a floor.** "Most Handoff Reset projects fall between $3,500 and
   $12,000." A band anchors correctly and still answers the question that brought them.
3. **Keep $1,500 deliberately** as a Handoff Finish entry point — clean-only, already-emptied
   property — and label it as that, not as the Handoff Reset floor.

Option 3 is defensible. Option 1 is cleanest. Publishing $1,500 as the flagship floor
unlabeled is the one choice with no upside.

**This is a config value.** Whatever is chosen goes in `config.ts` and nowhere else.

---

## 6. Guarantee reconciliation

Canonical Appendix A §8.13 lists five Handoff Assurance items. Adopt that block. Then:

- **Re-insert discretion.** "Someone will find out" is one of the three fears that block this
  sale, and the canonical spec drops it entirely. Add a sixth item, written operationally,
  not adjectivally: unmarked vehicles, plain clothing, no signage, no conversation with
  neighbors, scheduling around visibility. Only ship the items that are true today.
- **Keep the response commitment concrete.** "Within one business day" is canonical and
  forward-looking, so it passes §1 of the guardrails. Do not attach the $250 penalty unless
  you are certain you will hold it every week — a broken named guarantee costs more than an
  unmade one.
- The name "Handoff Assurance" replaces "the four named guarantees" sitewide. Purge the old
  names from components, copy, footer, and schema.

---

## 7. Form architecture — the split that resolves conflict #9

**On `/` — inline, 3 fields, no wizard, no progress bar.**
Name · phone · "What are you looking at?" (textarea). Plus consent line, honeypot, hidden
tracking fields. This appears twice: once in the hero, once in the final CTA movement.
Its only job is to capture a person who is ready now, before qualification can scare them off.

**On `/request-assessment/` — canonical §20, in full.**
Three-step progressive disclosure, the full Handoff Reset field set, uploads, visible
progress, back/next, input preservation. This is where the qualification data is collected,
from someone who has already decided.

Both post to `/api/lead` with `offer_type=handoff_reset`. The short form creates the same
record with fewer properties populated. `entry_route` distinguishes them.

**Photo upload is the highest-value field in the system.** A photo is easier to send than a
description and gives visual scope in one tap. If R2 upload handling threatens the launch
date, ship the SMS photo path (`sms:+14087857588` with prefilled body) as the launch
mechanism and add uploads immediately after — do not delay launch for it, and do not ship a
broken upload control.

---

## 8. Astro version — freeze, do not migrate before launch

Canonical §19.1 targets Astro 7.1.x. Astro 7.0 shipped June 22, 2026; the repo is on Astro 5.
That is a two-major migration with a rewritten Rust compiler enforcing stricter HTML parsing,
Vite 8 with Rolldown, and a Cloudflare adapter major bump — mid-launch, on the only revenue
asset, for zero conversion benefit.

**Decision: document a version freeze at the installed major, per canonical §19.1 step 7.
Ship. Migrate on a branch after the first leads land.** Record the freeze in the decision log
so it does not read as an oversight.

---

## 9. `/` section map — the one page

Canonical §16 movements, with the absorbed content named. Appendix A controls wording.

| # | Movement | Absorbs | Notes |
| --- | --- | --- | --- |
| 1 | Emotional outcome hero | — | H1 per A§8.2. One primary CTA. 3-field form. Trust line. No SaaS split hero |
| 2 | Recognition | old `/services/*` situation framing | Carries the hoarding/estate search language per §4. Narrow measure, quiet surface |
| 3 | What finished feels like | — | Signature emotional section. Expansive. Restrained artifact |
| 4 | Category contrast | old "why the usual options don't fit" | One continuous comparison. Not three cards |
| 5 | Five-Stage Handoff Standard | old `/process/` | Continuous rail. No five identical icon cards |
| 6 | Property Handoff Record | old `/process/` + DocumentSample | Artifact-led. The single signature moment. Sample label. Documentation disclaimer in caption |
| 7 | Confidence and fit | old `/guarantees/` `/pricing/` `/about/` `/who-we-help/` | Assurance + starting price + $195 assessment + founder + insurance + fit/non-fit, composed as **one** movement, not five card rows |
| 8 | Final decision | old final CTA band | "You do not need to solve the entire property today." 3-field form + call |
| — | FAQ | old FAQ blocks across 6 pages | 10 questions per A§8.17, plus the accumulation question from §4. `FAQPage` schema matching visible text exactly |
| — | Footer | — | NAP from `config.ts`, Termly links, scope + documentation disclaimers, Cookie Preferences |

**Rhythm rule (canonical §7.4, §8):** no two consecutive movements share vertical padding,
container width, background, and grid. No more than two deep-dark sections in a row.

---

## 10. `config.ts` — single source of truth

Nothing below is hardcoded anywhere else.

```ts
phone: "(408) 785-7588"
phoneUri: "tel:+14087857588"
smsUri:   "sms:+14087857588"
email:    "info@aseptaclean.com"          // pending inbox verification
hours:    "Mon–Sat 7:00 AM – 7:00 PM PT"  // closed Sunday
serviceArea: "San Jose, Mountain View, Sunnyvale, Santa Clara, Campbell and surrounding South Bay"
addressPolicy: "service-area business — no published street address"
insuranceLine: "Insured. Certificate of Insurance available upon request."
projectFloor:  "[OWNER DECISION REQUIRED — see §5]"
assessmentFee: "$195, credited toward an approved project booked within 7 days"
responseTime:  "within one business day"
founder: { name: "Matthew Ruiz", title: "Founder & Principal Operator" }
```

---

## 11. Launch-blocking QA subset

Canonical §29–§31 specify a full evidence package: visual regression baselines, cross-browser
matrices, failure simulations, a 24-item deliverable list, a scored release decision. That
apparatus is correct for a mature site and it is the single largest threat to the launch date.

**Adopt these before launch. Defer the rest to a post-launch pass.**

- [ ] Every canonical §30.2 release blocker checked and clear
- [ ] `04-CLAIMS-GUARDRAILS.md` §5 checklist run against every sentence on `/`, failures reported
- [ ] 5 real staging submissions land in HubSpot with all hidden fields mapped
- [ ] Owner SMS arrives within 60 seconds; confirmation email sends
- [ ] Provider-failure test: HubSpot down → lead still stored, customer still sees success
- [ ] `/thank-you/` live, noindex, fires the conversion event, safe on direct access
- [ ] Termly banner functional on desktop and mobile; Cookie Preferences reachable
- [ ] No horizontal overflow at 320px; 200% zoom clean
- [ ] Keyboard-only path from landing to submitted
- [ ] Screenshots at 390 / 768 / 1440 for the record
- [ ] Zero proof placeholders in the production build
- [ ] Logo-swap test: could this page belong to a generic cleaner? If yes, it is not done

Deferred without argument: Playwright visual baselines, full browser matrix, the 24-item
deliverable package, the 100-point score. Ship, then harden.

---

## 12. What has not changed and still outranks the website

1. **Phone coverage.** Voicemail during jobs and after hours is the largest lead leak in the
   business. A live answering service is still the highest-return expenditure in the launch,
   ahead of the site and ahead of ads.
2. **Proof.** Zero completed jobs, zero reviews. Bid the first 3–5 jobs at reduced margin in
   exchange for photographs with signed release, a case study, and a Google review. That is
   acquisition spend.

A one-page site is the right call for speed. It does not touch either of these.
