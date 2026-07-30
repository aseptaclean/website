# Phase 4 — One-Page Build: Session Prompts

Nine sessions. One per Claude Code session, in order. Each block is self-contained — paste it
whole. Do not run two in one session; that is how context dilution produced the flat output
the canonical spec is now repairing.

**Before Session 1:** place `PHASE-4-CANONICAL-MASTER-SPEC.md` and
`PHASE-4-ONE-PAGE-DIRECTIVE.md` in `docs/`.

**Standing rule for every session:** verify what already exists before creating anything.
Triple-check file paths, component names, and token names against the live repo. Do not
generate a file that already exists under another name.

---

## Session 1 — Audit and baseline

```
Read docs/PHASE-4-CANONICAL-MASTER-SPEC.md §0-§3 and docs/PHASE-4-ONE-PAGE-DIRECTIVE.md in full.

Do not write or modify any application code this session. Produce an audit only.

1. Inventory the repository. List every route in src/pages, every component, every stylesheet,
   every doc in docs/, and the installed versions of astro, @astrojs/cloudflare, and any other
   direct dependency.
2. For each route, mark KEEP, DELETE, or ABSORB against §2 of the directive.
3. For each component, mark KEEP, DELETE, or REWRITE. Flag any component whose name references
   a retired concept: the four named guarantees, Defined Scope Document, Completion Record, the
   old five-step method (Assess/Define/Authorize/Clear/Document).
4. Grep the whole repo and report every occurrence of:
   - a hardcoded phone number, email, or address
   - "free assessment", "free on-site", "free consultation"
   - "hoarder" used as a noun
   - "Assess", "Define", "Authorize", "Clear", "Document" as a process sequence
   - "Nothing Leaves", "Fixed Scope", "Discretion Standard", "Next-Day Scope"
   - Montserrat, Open Sans
   - any [PROOF PLACEHOLDER] block
5. Report the current --ac-* token inventory: name, value, and where each is consumed.
6. Screenshot the current rendered homepage at 390px and 1440px and save to docs/baseline/.

Output docs/PHASE-4-AUDIT.md with all six sections. Ask before proceeding.
```

---

## Session 2 — Prune, consolidate, configure

```
Read docs/PHASE-4-ONE-PAGE-DIRECTIVE.md §1, §2, §10 and docs/PHASE-4-AUDIT.md.

1. Delete every route marked DELETE in the audit. Delete their components where nothing else
   consumes them. Do not leave orphaned imports or dead CSS.
2. Move every superseded doc out of docs/ into docs/archive/. Superseded: 01-STRATEGY.md,
   02-BUILD-SPEC.md, 05-OPERATIONS.md, 07-VISUAL-SYSTEM.md, 09-PREMIUM-EXECUTION-BAR.md,
   10-DOCUMENT-DESTRUCTION.md, and every B-series page brief.
   Keep in docs/: PHASE-4-CANONICAL-MASTER-SPEC.md, PHASE-4-ONE-PAGE-DIRECTIVE.md,
   03-VOICE.md, 04-CLAIMS-GUARDRAILS.md.
3. Write src/lib/config.ts with exactly the values in directive §10. Where §10 says
   OWNER DECISION REQUIRED, use a clearly named placeholder constant and fail the production
   build if it is still set at build time.
4. Replace every hardcoded phone, email, hours, service-area, insurance, and price string found
   in the audit with a config import.
5. Add _redirects entries: every deleted route 301s to / with its query string preserved.
   No route 404s. No chain longer than one hop.
6. Create docs/DECISION-LOG.md. First entries: the Astro version freeze (directive §8), the
   --ac- prefix retention (§3 row 8), and the deferred QA scope (§11).

Report the deleted file list and the redirect map. Do not touch styling this session.
```

---

## Session 3 — Design system repair

```
Read canonical spec §7, §8, §9, §10, §11, §12 and directive §3 rows 7, 8, 12.

Replace the type and token system. Do not patch it alongside the old one.

1. Fonts: remove Montserrat and Open Sans entirely. Self-host Newsreader Variable and
   Instrument Sans Variable as WOFF2 in src/assets/fonts. font-display: swap. Preload only the
   first-viewport files and weights actually used. Record source and license in
   docs/ASSET-MANIFEST.md.
2. Tokens: keep the --ac- prefix. Adopt the canonical §8 color values and §9.2 type scale,
   mapped into --ac- names. Write the old-to-new map into docs/TOKEN-MAP.md. Delete every
   token no longer consumed. There must be exactly one token file.
3. Apply canonical §9.3 type rules: body 17-18px, body line-height 1.6-1.72, display 0.96-1.08,
   long-form measure 56-68ch, lead measure 42-54ch. No paragraph below 16px.
4. Apply canonical §10 spacing, container, and gutter targets and §11 border/radius/shadow/
   motion tokens.
5. Enforce canonical §12.2 cascade rules. Report and fix every §12.4 audit failure you find:
   duplicated declarations, ID selectors, !important, inline style patches, orphaned rules.
6. Render a temporary /dev/type-specimen route, noindex, excluded from the sitemap, showing
   the full type scale and every surface treatment at 320, 390, 768, 1024, 1280, 1440 and at
   200% zoom.

Stop and show me the specimen. Do not build page sections this session.
```

---

## Session 4 — Homepage movements 1–4

```
Read canonical spec §16 (movements 1-4), Appendix A §8.1-§8.10, plus 03-VOICE.md and
04-CLAIMS-GUARDRAILS.md. Read directive §4 and §9.

Build movements 1-4 of / only.

Appendix A wording is authoritative. Do not paraphrase it into generic cleaning-company copy.
Preserve the sentence rhythm and the concrete imagery.

Movement 1 — hero: dominant display H1, compact lead, ONE primary CTA
("Get My 24-Hour Handoff Plan"), CTA microcopy, trust line, the 3-field inline form per
directive §7, and one purposeful visual. No generic split hero with copy left and a rounded
card right. First proof must be discoverable without a full-screen scroll.

Movement 2 — recognition: narrow measure, quieter surface, no service-card row. This section
carries the situational search language per directive §4 — heavy accumulation, inherited and
estate property, whole-house cleanout, a property nobody can get to — written as situations,
never as a keyword block. "Hoarder" never appears as a noun.

Movement 3 — what finished feels like: expansive whitespace, one major editorial line, few
elements, strong hierarchy. This is a signature emotional section. No before/after imagery,
no emotional stock photography.

Movement 4 — category contrast: one continuous comparison or decision path ending on
"emptied versus handoff-ready." Not three equal cards.

Constraints: no two of these four movements may share the same vertical padding, container
width, background, and grid. Check every section against the canonical §7.3 anti-AI blacklist
before you finish, and report what you checked.

Run the 04-CLAIMS-GUARDRAILS.md §5 checklist against every sentence and report failures.
```

---

## Session 5 — Homepage movements 5–8, FAQ, footer

```
Read canonical spec §16 (movements 5-8), Appendix A §8.11-§8.18, directive §6 and §9.

Build movements 5-8, the FAQ, and the footer.

Movement 5 — Five-Stage Handoff Standard: Scope → Protect → Clear → Reset → Verify, rendered
as a continuous rail or sequential editorial system showing decision and documentation
relationships. Not five identical icon cards. The old Assess/Define/Authorize/Clear/Document
sequence must not survive anywhere, including alt text and schema.

Movement 6 — placeholder only this session. Leave a marked slot; the artifact is Session 6.

Movement 7 — confidence and fit, composed as ONE movement: Handoff Assurance, starting price,
$195 assessment, founder accountability, insurance line, fit and non-fit. Per directive §6,
add discretion as an additional assurance item written operationally — unmarked vehicles,
plain clothing, no signage, no conversation with neighbors, scheduling around visibility.
Ship only what is true today. Do not scatter this into five repetitive card sections.

Movement 8 — final decision: return to the outcome, core line "You do not need to solve the
entire property today," the 3-field form, and the call CTA.

FAQ: the 10 questions in Appendix A §8.17 plus one addition — "Do you handle properties with
heavy accumulation or hoarding conditions?" — answered factually inside the lawful scope with
the exclusion list attached. Native <details>. FAQPage schema matching visible text exactly.

Footer: NAP from config.ts, Termly links, Cookie Preferences, and both required disclaimers
from 04-CLAIMS-GUARDRAILS.md §4.

Run the guardrails checklist and report failures.
```

---

## Session 6 — Property Handoff Record

```
Read canonical spec §14 and §16 movement 6.

Build the Property Handoff Record artifact component and place it in movement 6. This is the
single signature moment on the page — everything around it stays restrained.

It must read as a credible operating document, not a decorative dashboard. Include: project
identifier, authorized decision-maker, room/area list, keep-remove-review status, approved
clearing scope, approved cleaning scope, excluded conditions, change authorization references,
discovered-item log references, exception status, completion photograph index, final review
status, closeout date, and a visible SAMPLE label.

Permitted: paper hierarchy, tabs, thin rules, restrained check states, date or status stamps,
numbered photo references, layered documents.

Prohibited: fake dashboards, invented metrics, decorative charts, fabricated client data, fake
signatures, fake project dates presented as real, tiny unreadable text used to look detailed.

Mobile: a readable excerpt or sequential document sections. Do not shrink a desktop sheet until
it is illegible. Legibility at 390px is a release blocker.

Caption carries the documentation disclaimer from 04-CLAIMS-GUARDRAILS.md §4.

Show me screenshots at 390 and 1440 before finishing.
```

---

## Session 7 — Form engine and /request-assessment/

```
Read canonical spec §20, directive §7.

Build one form engine with two entry points and one endpoint. Do not duplicate the form,
endpoint, or integration layer.

A. Inline short form on / — 3 fields: name, phone, "What are you looking at?" textarea.
   Consent line, honeypot, hidden context values. No wizard, no progress bar, no additional
   required fields. Present in the hero and the final movement.

B. /request-assessment/ — canonical §20.2 three-step progressive disclosure with the full
   §20.3 Handoff Reset field set. Visible progress, next/back, input preservation, error
   summary, field-level errors, loading and disabled states.

Both post to /api/lead with offer_type=handoff_reset. Required hidden values per §20.1:
entry_route, landing_page, referrer, all five UTM parameters, submission timestamp,
business-hours status, and an idempotency key.

Every field: correct keyboard type, inputmode, autocomplete, and label. The form must be
completable with keyboard only. It must submit successfully with JavaScript disabled.

/thank-you/ is a real route, noindex, safe on direct access, with business-hours-aware
callback wording.

Do not wire providers this session. Stub /api/lead to validate, log, and return success.
Do not ship a placeholder endpoint to production — fail the build if the endpoint env var
is unset.
```

---

## Session 8 — Providers, security, and the lead path

```
Read canonical spec §21, §26, §28.

Implement /api/lead in the exact order given in §21.1:
validate → verify Turnstile server-side → create submission ID and idempotency record →
store recoverable lead data → store private uploads → create/update HubSpot contact →
create and associate HubSpot deal → send customer confirmation via Resend → send owner SMS
via Twilio → send owner fallback email if SMS fails → record every provider outcome →
return a safe response.

Hard requirements:
- The customer sees success only after the lead is recoverably stored.
- A provider failure must never silently lose a lead. Simulate HubSpot down, Twilio down, and
  a network failure, and show me that the lead survives all three.
- No secret is ever exposed client-side. Apply the §26.3 security headers.
- Private uploads follow §21.6: no public URLs, validated types and sizes, retention per §26.4.

If R2 upload handling is not fully working and tested, ship without it and use the SMS photo
path as the launch mechanism — sms link prefilled from config.ts. Do not ship a broken upload
control and do not delay the launch for uploads.

Then run 5 real staging submissions end to end and show me the HubSpot records with every
hidden field mapped.
```

---

## Session 9 — Termly, SEO, analytics, launch QA

```
Read canonical spec §22, §23, §27, §30 and directive §11.

1. Termly: Privacy, Terms, Cookie Policy, consent banner, Cookie Preferences persistently
   reachable. Do not draft substitute legal policies. No duplicate Termly script. Optional
   analytics and marketing scripts must not load before consent. Sticky elements must not
   cover Termly UI. Test on desktop and mobile.
2. SEO: canonical §23.5 on every indexable route. Homepage title and meta exactly as canonical
   §23.3. Sitemap includes indexable routes only. /thank-you/ noindex. Absolute canonicals.
   No broken internal links.
3. Schema: accurate JSON-LD only — Organization, the appropriate LocalBusiness subtype,
   WebPage, and FAQPage matching visible text. No rating, review, project-count, founded-date,
   address, or credential markup that is not verified. Business hours, phone, and service area
   must match visible copy character for character.
4. Analytics per §27, gated behind consent.
5. Run the directive §11 launch-blocking QA list in full. Check every canonical §30.2 release
   blocker. Report each as PASS or FAIL with evidence — screenshots at 390/768/1440, the
   keyboard-only path, the 320px overflow check, the 200% zoom check, and the provider-failure
   results from Session 8.

Then apply the logo-swap test to the finished homepage: if this page could belong to a generic
cleaning company with the logo changed, say so plainly and tell me which movements fail it.

Give me one final answer: SHIP, REVISE, or BLOCKED. Do not say SHIP with an unresolved blocker.
```

---

## After launch, in this order

1. Live answering service contracted and tested — before any paid traffic.
2. First 3–5 jobs bid for proof: photographs with signed release, case study, Google review.
3. R2 uploads if deferred; real project photography into the artifact and movement 3.
4. `/private-residence-reset/` per canonical §17 and Appendix B.
5. Astro major migration on a branch, with visual baselines, once leads are flowing.
