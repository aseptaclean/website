# 12 — One-Page Build: Session Prompts

Nine sessions, one per Codex session, in order. Each block is self-contained — paste it whole.
Do not run two in one session.

**Before Session 1:**

1. Confirm `docs/07-ONE-PAGE-DIRECTIVE.md` and `docs/11-COMPOSITION-AND-TYPE.md` are in place.
2. Apply the `AGENTS.md` precedence block from `AGENTS-PRECEDENCE-BLOCK.md`.
3. **Commit or stash the 48 uncommitted changes on `main`, then branch.** Session 2 deletes
   routes and archives documents. Doing that on top of uncommitted work leaves no rollback point.

**Placeholders.** `{CANONICAL}` = the Phase 4 canonical master specification, expected to be
`10-PHASE-4-DEEP-DIVE-REPAIR…`. Session 1 confirms the exact filename and you substitute it into
every later prompt before pasting. Do not let Codex guess.

**Standing rule for every session:** verify what already exists before creating anything.
Triple-check file paths, component names, and token names against the live repo. This repo
already contains a decisions log, an asset manifest, and a release checklist — append to them,
never create parallel files.

---

## Session 1 — Audit and baseline

```
Read AGENTS.md and docs/07-ONE-PAGE-DIRECTIVE.md in full.

Do not write or modify any application code this session. Produce an audit only.

1. Resolve docs/07-ONE-PAGE-DIRECTIVE.md §0. Open every file in docs/ and report its full
   filename and one-line purpose. State plainly which file is the Phase 4 canonical master
   specification, which is the Private Residence Reset strategy, and which is the older premium
   visual and typography document. If you cannot identify the canonical spec with certainty,
   stop and ask.

2. Inventory the repository: every route in src/pages, every component, every stylesheet, the
   contents of functions/, scripts/, artifacts/, and sites/, and the installed versions of
   astro, @astrojs/cloudflare, and every other direct dependency.

3. Report whether functions/ contains a lead endpoint that duplicates src/pages/api/lead.ts.
   If both exist, determine which one actually receives traffic in the current Cloudflare
   configuration. Do not delete anything yet.

4. Mark every route KEEP, DELETE, or ABSORB against directive §2. Mark every component KEEP,
   DELETE, or REWRITE. Flag any component whose name references a retired concept: the four
   named guarantees, Defined Scope Document, Completion Record, or the Assess/Define/Authorize/
   Clear/Document sequence.

5. Grep the whole repo and report every occurrence of:
   - a hardcoded phone number, email, or street address
   - "free assessment", "free on-site", "free consultation"
   - "hoarder" used as a noun
   - "Nothing Leaves", "Fixed Scope", "Discretion Standard", "Next-Day Scope"
   - Montserrat, Open Sans
   - any proof placeholder block

6. Report the current --ac-* token inventory: name, value, and every consumption site.

7. Locate the existing config module holding phone, email, hours, and service area. Report its
   path. Do not create a new one.

8. Screenshot the rendered homepage at 390px and 1440px into docs/baseline/.

Write the result to docs/PHASE-4-AUDIT.md. Append the §0 resolution to docs/05-DECISIONS-LOG.md.
Then stop and ask before proceeding.
```

---

## Session 2 — Prune, consolidate, configure

```
Read docs/07-ONE-PAGE-DIRECTIVE.md §1, §2, §10, §12 and docs/PHASE-4-AUDIT.md.

Confirm you are on a working branch and the tree is clean before you begin. If not, stop.

1. Delete every route marked DELETE. Delete their components where nothing else consumes them.
   Leave no orphaned imports and no dead CSS.

2. Resolve the duplicate lead endpoint per audit item 3. One endpoint survives. Record which and
   why in docs/05-DECISIONS-LOG.md.

3. Apply directive §12 document collisions:
   - move the older premium visual and typography document to docs/archive/
   - add a superseded-scope banner to the top of docs/03-BUILD-PLAN.md and docs/00-MASTER-BRIEF.md
   - do not delete either; they stay as reference

4. Write the directive §10 config values into the existing config module found in the audit.
   Cross-check every value against docs/02-OWNER-INPUTS.md first — if they disagree,
   02-OWNER-INPUTS.md wins and the conflict goes in the decisions log. Where §10 says OWNER
   DECISION REQUIRED, use a named placeholder constant and fail the production build if it is
   still set at build time.

5. Replace every hardcoded phone, email, hours, service-area, insurance, and price string from
   audit item 5 with a config import.

6. Add _redirects: every deleted route 301s to / with query strings preserved. No 404s on
   previously live paths. No chain longer than one hop.

7. Append to docs/05-DECISIONS-LOG.md: the Astro version freeze (directive §8), the --ac- prefix
   retention (§3 row 8), the deferred QA scope (§11), and the endpoint resolution.

Report the deleted file list and the redirect map. Do not touch styling this session.
```

---

## Session 3 — Type and composition system

```
Read docs/11-COMPOSITION-AND-TYPE.md in full, plus the design, color, typography, spacing, and
CSS architecture sections of {CANONICAL}.

This session rebuilds the type and composition system. Do not patch the new system alongside the
old one — remove the old one.

1. Fonts: remove Montserrat and Open Sans entirely. Self-host Newsreader Variable and Instrument
   Sans Variable as WOFF2. font-display: swap. Preload only first-viewport files and weights
   actually used. Record source and license in docs/06-ASSET-MANIFEST.md — append, do not create
   a new manifest.

2. Tokens: keep the --ac- prefix. Implement the §2 type scale, §3 measure tokens, §4 rhythm
   tokens, and the canonical color values. Write the old-to-new map to docs/TOKEN-MAP.md. Delete
   every token no longer consumed. Exactly one token file survives.

3. Enforce §1 globally: strip every font-size declaration from every heading tag in every
   component. Headings carry semantics only. All visible sizing comes from explicit role classes.
   Report every file changed.

4. Apply the §5 composition map exactly. Container, rhythm, surface, and type entry per movement
   are given values, not suggestions. Implement the asymmetric internal grid on movement 5.

5. Build the §6 detail layer: eyebrows, stage numerals, hairline rules, artifact metadata, and
   The Mark at three appearances maximum.

6. Enforce the canonical cascade rules. Watch specifically for specificity collisions between
   section-level and element-level selectors on padding and margin — that is where the current
   spacing inconsistency lives. Report and fix every CSS audit failure the canonical spec lists.

7. Render /dev/type-specimen, noindex, excluded from the sitemap: the full scale, every surface,
   every container width, every rhythm value, at 320, 390, 768, 1024, 1280, 1440 and at 200% zoom.

Run the §9 failure audit against the rendered homepage. Report every line PASS or FAIL with a
screenshot. Stop and show me the specimen and the audit before touching page copy.
```

---

## Session 4 — Homepage movements 1–4

```
Read {CANONICAL} movements 1-4, docs/06-APPROVED-HOMEPAGE-COPY.md, docs/01-QUALITY-GUARDRAILS.md,
docs/07-ONE-PAGE-DIRECTIVE.md §4 and §9, and docs/11-COMPOSITION-AND-TYPE.md §5.

Build movements 1-4 of / only.

06-APPROVED-HOMEPAGE-COPY.md wording is authoritative. Do not paraphrase it into generic
cleaning-company language. Preserve the sentence rhythm and concrete imagery.

Movement 1 — hero: dominant display H1, compact lead, ONE primary CTA, CTA microcopy, trust
line, the 3-field inline form per directive §7, one purposeful visual. No generic split hero with
copy left and a rounded card right. First proof discoverable without a full-screen scroll.

Movement 2 — recognition: intimate measure, quieter surface, no service-card row. Carries the
situational search language per directive §4 — heavy accumulation, inherited and estate property,
whole-house cleanout, a property nobody can get to — written as situations, never as a keyword
block. "Hoarder" never appears as a noun.

Movement 3 — what finished feels like: bleed container, content held intimate, vast rhythm. One
display line, one paragraph, nothing else. No before/after imagery, no emotional stock photography.

Movement 4 — category contrast: one continuous comparison ending on "emptied versus
handoff-ready." Not three equal cards.

Composition values come from 11-COMPOSITION-AND-TYPE.md §5 and are not negotiable. Check every
section against the canonical anti-AI blacklist before finishing and report what you checked.

Run docs/01-QUALITY-GUARDRAILS.md against every sentence and report failures.
```

---

## Session 5 — Homepage movements 5–8, FAQ, footer

```
Read {CANONICAL} movements 5-8, docs/06-APPROVED-HOMEPAGE-COPY.md, docs/01-QUALITY-GUARDRAILS.md,
docs/07-ONE-PAGE-DIRECTIVE.md §6 and §9, docs/11-COMPOSITION-AND-TYPE.md §5.

Movement 5 — Five-Stage Handoff Standard: Scope → Protect → Clear → Reset → Verify as a
continuous rail showing decision and documentation relationships. Not five identical icon cards.
The Assess/Define/Authorize/Clear/Document sequence must not survive anywhere, including alt text
and schema.

Movement 6 — leave a marked placeholder slot. The artifact is Session 6.

Movement 7 — confidence and fit as ONE movement: Handoff Assurance, starting price, $195
assessment, founder accountability, insurance line, fit and non-fit. Per directive §6, add
discretion as a sixth assurance item written operationally — unmarked vehicles, plain clothing,
no signage, no conversation with neighbors, scheduling around visibility. Ship only what is true
today. Do not scatter this into five repetitive card sections.

Movement 8 — final decision: return to the outcome, the 3-field form, the call CTA.

FAQ: the approved question set plus one addition — "Do you handle properties with heavy
accumulation or hoarding conditions?" — answered factually inside the lawful scope with the
exclusion list attached. Native <details>. FAQPage schema matching visible text exactly.

Footer: NAP from config, Termly links, Cookie Preferences, and both required disclaimers.

Run docs/01-QUALITY-GUARDRAILS.md and report failures.
```

---

## Session 6 — Property Handoff Record

```
Read the artifact system section of {CANONICAL} and docs/11-COMPOSITION-AND-TYPE.md §5 and §7.

Build the Property Handoff Record component and place it in movement 6. This is the single
dramatic moment on the page — everything around it stays quiet.

It must read as a credible operating document, not a decorative dashboard. Include: project
identifier, authorized decision-maker, room and area list, keep/remove/review status, approved
clearing scope, approved cleaning scope, excluded conditions, change authorization references,
discovered-item log references, exception status, completion photograph index, final review
status, closeout date, and a visible SAMPLE label.

Permitted: paper hierarchy, tabs, thin rules, restrained check states, date or status stamps,
numbered photo references, layered documents.

Prohibited: fake dashboards, invented metrics, decorative charts, fabricated client data, fake
signatures, fake project dates presented as real, tiny unreadable text used to look detailed.

Composition: bleed container, artifact at 1320px, vast rhythm both sides, steel canvas, artifact
on white with a paper edge. Field labels at --ac-text-xs.

Mobile: a readable excerpt or sequential document sections. Do not shrink a desktop sheet until
it is illegible. Legibility at 390px is a release blocker.

Caption carries the documentation disclaimer from docs/01-QUALITY-GUARDRAILS.md.

One scroll-triggered reveal, prefers-reduced-motion respected. No other motion on the page.

Show screenshots at 390 and 1440 before finishing.
```

---

## Session 7 — Form engine and /request-assessment/

```
Read the assessment form architecture section of {CANONICAL} and docs/07-ONE-PAGE-DIRECTIVE.md §7.

Build one form engine, two entry points, one endpoint. Do not duplicate the form, endpoint, or
integration layer.

A. Inline short form on / — 3 fields: name, phone, "What are you looking at?" textarea. Consent
   line, honeypot, hidden context values. No wizard, no progress bar, no additional required
   fields. Present in the hero and the final movement.

B. /request-assessment/ — three-step progressive disclosure with the full Handoff Reset field
   set. Visible progress, next/back, input preservation, error summary, field-level errors,
   loading and disabled states.

Both post to /api/lead with offer_type=handoff_reset. Required hidden values: entry_route,
landing_page, referrer, all five UTM parameters, submission timestamp, business-hours status,
idempotency key.

Every field: correct keyboard type, inputmode, autocomplete, and label. Completable with keyboard
only. Must submit successfully with JavaScript disabled.

/thank-you/ is a real route, noindex, safe on direct access, with business-hours-aware callback
wording.

Do not wire providers this session. Stub /api/lead to validate, log, and return success. Fail the
build if the endpoint environment variable is unset.
```

---

## Session 8 — Providers, security, and the lead path

```
Read the lead storage, security, and environment sections of {CANONICAL}. Check .env.example and
.env.production against the required variable list and report any gap before you begin.

Implement /api/lead in the canonical order:
validate → verify Turnstile server-side → create submission ID and idempotency record → store
recoverable lead data → store private uploads → create or update HubSpot contact → create and
associate HubSpot deal → send customer confirmation via Resend → send owner SMS via Twilio →
send owner fallback email if SMS fails → record every provider outcome → return a safe response.

Hard requirements:
- The customer sees success only after the lead is recoverably stored.
- A provider failure must never silently lose a lead. Simulate HubSpot down, Twilio down, and a
  network failure, and show me the lead survives all three.
- No secret exposed client-side. Apply the canonical security headers.
- Private uploads: no public URLs, validated types and sizes, retention per the canonical spec.

If R2 upload handling is not fully working and tested, ship without it and use the SMS photo path
from config as the launch mechanism. Do not ship a broken upload control and do not delay launch
for uploads.

Run 5 real staging submissions end to end and show me the HubSpot records with every hidden field
mapped.
```

---

## Session 9 — Termly, SEO, analytics, launch QA

```
Read the Termly, SEO, analytics, and release sections of {CANONICAL}, plus
docs/04-RELEASE-CHECKLIST.md and docs/07-ONE-PAGE-DIRECTIVE.md §11.

1. Termly: Privacy, Terms, Cookie Policy, consent banner, Cookie Preferences persistently
   reachable. Do not draft substitute legal policies. No duplicate Termly script. Optional
   analytics and marketing scripts must not load before consent. Sticky elements must not cover
   Termly UI. Test desktop and mobile.

2. SEO: canonical on-page requirements on every indexable route. Homepage title and meta exactly
   as the canonical spec gives them. Sitemap includes indexable routes only. /thank-you/ noindex.
   Absolute canonicals. No broken internal links.

3. Schema: accurate JSON-LD only — Organization, the appropriate LocalBusiness subtype, WebPage,
   FAQPage matching visible text. No rating, review, project-count, founded-date, address, or
   credential markup that is not verified. Business hours, phone, and service area must match
   visible copy character for character.

4. Analytics, gated behind consent.

5. Reconcile docs/04-RELEASE-CHECKLIST.md with directive §11: mark each existing item
   LAUNCH-BLOCKING or DEFERRED and add anything missing. Do not create a second checklist file.
   Then run every LAUNCH-BLOCKING item and report PASS or FAIL with evidence — screenshots at
   390/768/1440, the keyboard-only path, the 320px overflow check, the 200% zoom check, and the
   provider-failure results from Session 8.

6. Run the docs/11-COMPOSITION-AND-TYPE.md §9 failure audit one final time.

Then apply the logo-swap test to the finished homepage: if this page could belong to a generic
cleaning company with the logo changed, say so plainly and name which movements fail it.

Give one final answer: SHIP, REVISE, or BLOCKED. Do not say SHIP with an unresolved blocker.
Append the decision and its evidence to docs/05-DECISIONS-LOG.md.
```

---

## After launch, in this order

Items 1 and 2 are the highest-priority operational work after launch — ahead of any further
design or copy work on the page itself (items 3–5). `docs/14-RESEARCH-FINDINGS.md` §2.1: 93–97%
of consumers read reviews before choosing a local business, and a review-backed profile makes a
business roughly 2.7x more likely to be perceived as reputable. A review count of zero is closer
to a pass/fail gate on whether a stranger calls at all than a soft trust signal — no page
structure fix substitutes for it. Item 2 cannot start before item 1 (there is no one to answer
the calls those first jobs generate), so it is sequenced second, not deprioritized.

1. Live answering service contracted and tested — before any paid traffic.
2. **First 3–5 jobs bid for proof: photographs with signed release, case study, Google review.**
   The single highest-priority operational item after launch once phone coverage is live.
3. R2 uploads if deferred; real photography into the artifact and movement 3.
4. `/private-residence-reset/` per the canonical spec and the Private Residence Reset strategy doc.
5. Astro major migration on a branch, with visual baselines, once leads are flowing.
