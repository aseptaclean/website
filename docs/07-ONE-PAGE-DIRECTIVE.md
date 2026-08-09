# 07 — One-Page Collapse Directive

**Status:** Superseded for scope as of 2026-08-08 by `docs/19-SYSTEM-AND-SITEMAP.md`, the
current growth-architecture authority — the site is no longer one-page-only; see that doc's
Part 2 phased sitemap for the binding route architecture. This file is kept for reference: its
conflict-resolution decisions (§3), form architecture (§7), guarantee reconciliation (§6), and
launch-phase QA reconciliation (§11) are not superseded and still apply to the routes and
content they govern. Do not use §1's precedence chain or §2's route collapse as current — see
`AGENTS.md` instead. Previously: Active. Supersedes the multi-page sprint plan in
`03-BUILD-PLAN.md`.
**Date:** July 30, 2026
**Repo location:** `docs/07-ONE-PAGE-DIRECTIVE.md`
**Agent:** Codex. This file is referenced from `AGENTS.md`.

This file records what the Phase 4 canonical specification changes about this repository, and
what is now out of scope for launch. The canonical spec already describes a four-route site —
it is a one-page spec. The work is not collapsing it. The work is making the invalidation of
the older multi-page plan explicit so nothing gets half-migrated.

---

## 0. Unresolved repo facts — Session 1 must close these first

Three documents in `docs/` could not be read at the time this file was written. Codex resolves
them in Session 1 and records the result in `05-DECISIONS-LOG.md` before any other session runs.

| Placeholder used in this file | Expected to be | Action |
| --- | --- | --- |
| `{CANONICAL}` | `10-PHASE-4-DEEP-DIVE-REPAIR…` (probable) | Confirm which file is the Phase 4 canonical master specification. Every session prompt reads it |
| `{RESIDENCE}` | `08-PRIVATE-RESIDENCE-RESET…` | Confirm. Phase 2 only |
| `{OLD-VISUAL}` | `09-PREMIUM-VISUAL-AND-TYP…` | Confirm, then resolve against §12 of this file |

Do not guess. If `{CANONICAL}` cannot be identified with certainty, stop and ask.

---

## 1. Precedence chain

1. Current law, active insurance, verified business facts, explicit owner decisions
2. `01-QUALITY-GUARDRAILS.md`
3. `{CANONICAL}` — the Phase 4 master specification
4. `06-APPROVED-HOMEPAGE-COPY.md` — controls wording
5. `07-ONE-PAGE-DIRECTIVE.md` (this file) — controls scope and route architecture
6. `11-COMPOSITION-AND-TYPE.md` — controls type scale, measure, and rhythm
7. `02-OWNER-INPUTS.md` — business facts and confirmed values
8. `{RESIDENCE}` — Phase 2 only
9. Everything else, only where it does not conflict

**Demoted to reference:** `00-MASTER-BRIEF.md` and `03-BUILD-PLAN.md`. `{CANONICAL}` is the
Phase 4 authority; `00-MASTER-BRIEF.md` is its parent and is superseded wherever they differ.
`03-BUILD-PLAN.md` describes the multi-page build this file cancels.

**Superseded outright:** `{OLD-VISUAL}` — see §12.

Conflicts resolve up this chain. Do not silently merge contradictory instructions. Record every
material conflict in `05-DECISIONS-LOG.md`.

---

## 2. Route collapse — final

**Build these. Nothing else.**

```text
/                        Flagship one-page sales page (Handoff Reset)
/request-assessment/     Full progressive form
/thank-you/              noindex, conversion destination
/privacy-policy/  /terms/  /cookie-policy/    Termly-controlled
/api/lead                Single endpoint
```

**Phase 2, after `/` is live and converting:**

```text
/private-residence-reset/    Campaign page, out of nav, one crawlable internal link
```

Every other route is deleted and 301s to `/`. Every page-level concept from the multi-page plan
— services, guarantees, process, pricing, about, who-we-help, locations, projects, resources —
becomes a section of `/` per §9 or is dropped.

**Deleting the multi-page scope closes four open blockers at once:** crew capacity, deep-clean
checklist scope, deep-clean price publication, and city-page research.

---

## 3. Conflict resolution — pre-resolved, binding

| # | Older plan | `{CANONICAL}` | Decision |
| --- | --- | --- | --- |
| 1 | Hoarding / estate / severe-condition clearing | **Aseptaclean Handoff Reset** — clearing + deep clean + documented closeout | **Adopt canonical.** But see §4 — situational search language is not deleted |
| 2 | $6,500–12,000, $8,000 planning average | "Projects generally begin at **$1,500**" | **Owner decision required. See §5. Do not build until resolved** |
| 3 | Free on-site assessment | Photo review free; **on-site $195**, credited within 7 days | **Adopt canonical.** Purge every "free assessment / free consultation" string |
| 4 | Four named guarantees incl. Discretion Standard | Handoff Assurance: 5 items + Scope-Completion Guarantee | **Adopt canonical structure, re-insert discretion.** See §6 |
| 5 | Assess → Define → Authorize → Clear → Document | **Scope → Protect → Clear → Reset → Verify** | **Adopt canonical.** The old sequence has no cleaning stage; the offer now sells one. Purge it from copy, component names, alt text, and schema |
| 6 | Defined Scope Document + Completion Record | **Property Handoff Record** (one artifact) | **Adopt canonical.** One artifact, one signature moment |
| 7 | Montserrat + Open Sans | **Newsreader Variable + Instrument Sans Variable** | **Adopt canonical.** This voids the in-flight H1 sizing bug — the whole scale is replaced. Do not audit the old one |
| 8 | Token prefix `--ac-*` | Unprefixed `--color-*`, `--text-*` | **Keep `--ac-`. Adopt canonical values, scale, and fonts.** A global rename is churn with regression risk and no user-visible benefit. Map 1:1 in `docs/TOKEN-MAP.md` |
| 9 | 3 fields only, no wizard | 3-step progressive disclosure, ~20 fields | **Both, split by route.** See §7 |
| 10 | Worker → HubSpot → Zapier/Make | Astro endpoint → Turnstile → store → HubSpot → Resend → Twilio | **Adopt canonical.** Drop Zapier/Make — a failure surface with no owner |
| 11 | Astro 5 | **Astro 7.1.x** | **Freeze at installed major for launch.** See §8 |
| 12 | The Mark (navy rectangle) | Not mentioned | **Keep, 3 appearances maximum on `/`.** The only decorative device |
| 13 | Stock photography harms trust | Canonical §15 — same conclusion | **No conflict.** Canonical governs. Log every asset in `06-ASSET-MANIFEST.md` |
| 14 | Phone unverified | **(408) 785-7588** | **Blocker closed.** Write to config, mirror to GBP character-for-character |

---

## 4. The SEO correction

The canonical homepage title targets property cleanout and deep cleaning. That term competes
against junk removal and maid services — high volume, low intent, and a fight a zero-review
business loses on proximity and budget. The higher-intent, weaker-incumbent query is hoarding
and estate cleanout language.

Collapsing to one page does not require abandoning it. The page earns both.

- Keep the canonical title and meta exactly as written. They match the offer.
- The recognition movement and the FAQ **must** carry the situational language a hoarding or
  estate searcher types: heavy accumulation, inherited property, estate cleanout, whole-house
  cleanout, a property nobody can get to. Written as situations, never as a keyword block.
- `hoarder` never appears as a noun. `gross filth` does not appear at all.
- Add one FAQ: *"Do you handle properties with heavy accumulation or hoarding conditions?"*
  Answer factually, inside the lawful scope, with the exclusion list attached.

A dedicated page earns its place in Phase 3 on measured volume, not speculation.

---

## 5. The $1,500 problem — owner decision, blocks Session 2

The qualification standard declines single-room jobs. The CAC math is derived from an $8,000
planning average. Publishing "projects generally begin at $1,500" anchors the funnel at 19% of
that average, and the predictable result is a lead mix dominated by exactly the jobs the
operating standard says to refuse.

Three options, in order of preference:

1. **Raise the published floor to a number you would actually accept.** If the smallest project
   worth a crew day is $2,800, publish $2,800. The number's job is to filter, not to invite.
2. **Publish a band, not a floor.** "Most Handoff Reset projects fall between $3,500 and
   $12,000." A band anchors correctly and still answers the question that brought them.
3. **Keep $1,500 deliberately** as a Handoff Finish entry point — clean-only, already-emptied
   property — and label it as exactly that, not as the flagship floor.

Option 3 is defensible. Option 1 is cleanest. Publishing $1,500 unlabeled as the flagship floor
is the only choice with no upside.

Record the decision in `05-DECISIONS-LOG.md` and store the value in config.

---

## 6. Guarantee reconciliation

Adopt the Handoff Assurance block from `06-APPROVED-HOMEPAGE-COPY.md`. Then:

- **Re-insert discretion as a sixth item.** "Someone will find out" is one of the three fears
  that block this sale and the canonical spec drops it. Write it operationally, not
  adjectivally: unmarked vehicles, plain clothing, no signage, no conversation with neighbors,
  scheduling around visibility. Ship only what is true today.
- **Keep the response commitment concrete.** "Within one business day" is forward-looking and
  passes the guardrails. Do not attach a financial penalty unless you will hold it every week.
- "Handoff Assurance" replaces "the four named guarantees" repo-wide. Purge the old names from
  components, copy, footer, and schema.

---

## 7. Form architecture

**On `/` — inline, 3 fields, no wizard, no progress bar.**
Name, phone, "What are you looking at?" textarea. Consent line, honeypot, hidden context
values. Appears twice: hero and final movement. Its only job is to capture someone ready now,
before qualification can scare them off.

**On `/request-assessment/` — canonical §20 in full.**
Three-step progressive disclosure, full Handoff Reset field set, uploads, visible progress,
back/next, input preservation.

Both post to `/api/lead` with `offer_type=handoff_reset`. `entry_route` distinguishes them.

**Photo upload is the highest-value field in the system.** If R2 handling threatens the launch
date, ship the SMS photo path as the launch mechanism and add uploads immediately after. Do not
delay launch for it. Do not ship a broken upload control.

---

## 8. Astro version — freeze, do not migrate before launch

Astro 7.0 shipped June 22, 2026 with a Rust compiler enforcing stricter HTML parsing, Vite 8
with Rolldown, and a Cloudflare adapter major bump. This repo is on Astro 5. That is a
two-major migration on the only revenue asset, mid-launch, for zero conversion benefit.

**Freeze at the installed major. Ship. Migrate on a branch after the first leads land.** Record
the freeze in `05-DECISIONS-LOG.md` so it does not read as an oversight.

---

## 9. `/` section map

Canonical movements, with absorbed content named. `06-APPROVED-HOMEPAGE-COPY.md` controls
wording. `11-COMPOSITION-AND-TYPE.md` controls container, rhythm, surface, and type.

| # | Movement | Absorbs | Notes |
| --- | --- | --- | --- |
| 1 | Emotional outcome hero | — | One primary CTA. 3-field form. Trust line. No SaaS split hero |
| 2 | Recognition | old service-page situation framing | Carries the search language per §4 |
| 3 | What finished feels like | — | Signature emotional section. Expansive |
| 4 | Category contrast | "why the usual options don't fit" | One continuous comparison. Not three cards |
| 5 | Five-Stage Handoff Standard | old process page | Continuous rail. No five identical icon cards |
| 6 | Property Handoff Record | old process page + document sample | The single signature moment. Sample label. Documentation disclaimer in caption |
| 7 | Confidence and fit | guarantees + pricing + about + who-we-help | Assurance, starting price, $195 assessment, founder, insurance, fit/non-fit as **one** movement |
| 8 | Final decision | final CTA band | "You do not need to solve the entire property today" |
| — | FAQ | FAQ blocks from six pages | Canonical set plus the §4 addition. `FAQPage` schema matching visible text exactly |
| — | Footer | — | NAP from config, Termly links, scope + documentation disclaimers |

---

## 10. Config — single source of truth

Locate the existing config module before creating one. Nothing below is hardcoded anywhere else.

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

Cross-check every value against `02-OWNER-INPUTS.md` before writing. If they disagree,
`02-OWNER-INPUTS.md` wins and the conflict goes in the decisions log.

---

## 11. Launch-blocking QA — reconciled with `04-RELEASE-CHECKLIST.md`

The canonical spec specifies a full evidence package: visual regression baselines, cross-browser
matrices, failure simulations, a 24-item deliverable list, a scored release decision. Correct
for a mature site, and the single largest threat to the launch date.

**Do not create a new checklist file.** `04-RELEASE-CHECKLIST.md` already exists. Reconcile
against it: mark each existing item LAUNCH-BLOCKING or DEFERRED, and add anything below that
is missing.

Launch-blocking:

- [ ] Every canonical release blocker checked and clear
- [ ] `01-QUALITY-GUARDRAILS.md` run against every sentence on `/`, failures reported
- [ ] 5 real staging submissions land in HubSpot with all hidden fields mapped
- [ ] Owner SMS within 60 seconds; confirmation email sends
- [ ] Provider-failure test: HubSpot down → lead still stored, customer still sees success
- [ ] `/thank-you/` live, noindex, fires conversion, safe on direct access
- [ ] Termly banner functional desktop and mobile; Cookie Preferences reachable
- [ ] No horizontal overflow at 320px; 200% zoom clean
- [ ] Keyboard-only path from landing to submitted
- [ ] Screenshots at 390 / 768 / 1440 recorded
- [ ] Zero proof placeholders in the production build
- [ ] Logo-swap test passed

Deferred without argument: Playwright visual baselines, full browser matrix, the 24-item
deliverable package, the 100-point score. Ship, then harden.

---

## 12. Document collisions to resolve — do this in Session 2

Two typography authorities in one folder will produce a wrong answer in some future session and
you will not know which file caused it.

| Collision | Resolution |
| --- | --- |
| `{OLD-VISUAL}` vs `11-COMPOSITION-AND-TYPE.md` | Move `{OLD-VISUAL}` to `docs/archive/`. If any part of it is still true, it moves into `11-` first. Do not leave both in `docs/` |
| `03-BUILD-PLAN.md` multi-page sprints vs §2 of this file | Add a status banner at the top of `03-BUILD-PLAN.md`: superseded for routes and scope by `07-ONE-PAGE-DIRECTIVE.md`. Keep it for reference |
| `00-MASTER-BRIEF.md` vs `{CANONICAL}` | Same treatment. Banner, not deletion |
| Duplicate `06-` prefix on two files | Cosmetic. Leave it. Every prompt uses full filenames |
| `functions/` vs `src/pages/api/lead.ts` | Canonical §19.2 bans a duplicate endpoint. Identify which one receives traffic, delete the other, record it |

---

## 13. What has not changed and still outranks the website

1. **Phone coverage.** Voicemail during jobs and after hours is the largest lead leak in the
   business. A live answering service is the highest-return expenditure in the launch, ahead of
   the site and ahead of ads.
2. **Proof.** Zero completed jobs, zero reviews. Bid the first 3–5 jobs at reduced margin for
   photographs with signed release, a case study, and a Google review. That is acquisition
   spend, not discounting. Per `docs/14-RESEARCH-FINDINGS.md` §2.1, this is the single
   highest-priority operational item after launch, ahead of any further design or copy work on
   the page — see the ordered list in `docs/12-SESSION-PROMPTS.md`'s "After launch, in this
   order."

A one-page site is the right call for speed. It does not touch either of these.
