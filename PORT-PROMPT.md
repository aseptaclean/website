# PORT-PROMPT — Visual redesign port (owner-approved 2026-08-18)

Read this file in full before touching anything. Then read `AGENTS.md`. Where this prompt and
`AGENTS.md` conflict on **scope or visual direction**, this prompt wins — it carries an explicit
owner decision dated 2026-08-18 (see §7). On **claims, safety, and business facts**, `AGENTS.md`
and `docs/01-QUALITY-GUARDRAILS.md` still win.

## 0. What this session is

A verbatim visual port. The owner has approved 12 HTML mockups in `docs/mockups/` as the pixel
target for the entire 36-route site. Your job is to make the built site match them — structure,
type, spacing, color, components — while changing **no plumbing and no copy sources**.

This is not a redesign session. Do not improve, reinterpret, or "modernize" the mockups. Where a
mockup and this prompt are silent, match the mockup pixel-for-pixel. If a mockup seems wrong,
STOP and report; do not fix it silently.

## 1. Authority for this session

1. Current law, claims guardrails, verified business facts (unchanged, always first)
2. This file
3. `docs/mockups/*.html` — pixel authority for all visual decisions
4. `docs/27-SECTION-9-15-CONNECTIVE-COPY.md` — sole source for connective copy (eyebrows,
   section labels, card blurbs, CTA strings, nav one-liners, form states, footer legal line)
5. `docs/27-COPY-CANONICAL.md` — sole source for all body copy, H1s, leads,
   FAQs, boundaries, disclaimers, SEO titles/metas
   *(Corrected 2026-08-19. This entry previously named `docs/27-ASEPTACLEAN-COMPLETE-WEBSITE-BUILD.md`,
   which has never existed in this repository. Under `AGENTS.md` §1 "Files that do not exist"
   that is a stop-condition, and it is the probable root of the §9.15.5 copy gap — see
   `docs/05-DECISIONS-LOG.md`, 2026-08-19.)*
6. Everything else in `docs/` — reference only this session

Copy rule: every visible string on the built site must trace to source 4 or 5. If a slot exists
in a mockup with no matching approved string, STOP and report the slot. Do not write copy.

## 2. Mockup → route mapping

| Mockup | Builds | Routes served |
| --- | --- | --- |
| `aseptaclean-homepage-v3.html` | Homepage | `/` |
| `template-service-hub.html` | Hub template | `/detailed-cleaning/`, `/specialty-cleaning/`, `/property-clearing/`, `/commercial/` |
| `template-service-page-v2.html` | Service template | all 14 city-suffixed service routes |
| `page-about.html` | About | `/about/` |
| `page-process.html` | Process | `/handoff-standard/` |
| `page-service-areas.html` | Service areas | `/service-areas/` |
| `page-contact.html` | Contact | `/contact/` |
| `page-request-assessment.html` | Full-form page | `/request-assessment/` |
| `page-faq.html` | FAQ | `/faq/` |
| `page-projects.html` | Projects | `/projects/` (stays noindex; do not change its gate) |
| `page-thank-you.html` | Post-submit | `/thank-you/` |
| `template-legal.html` | Legal shell | privacy, terms, `/data-request/` |

Hub and service templates are populated per-route from doc 27 §10–§15 copy. Existing index/
noindex status of every route is preserved exactly as built today — this session changes zero
robots directives, zero sitemap entries, zero redirects.

## 3. Component work

Rebuild or restyle components to match the mockups. Expected component-level outcomes (names
may map onto existing components; verify against the live tree before creating anything new —
standing rule: never create a parallel file where one exists):

- Header: utility ribbon → main nav with full-width mega-menu panels per group → flush
  right-edge full-height CTA. Mobile ≤1050px: hamburger + full-screen drawer (checkbox +
  `<details>` accordions, no JS), bottom action bar (Request / Call).
- Cards: 6px radius, soft shadow, image area with bottom chevron clip
  (`polygon(0 0,100% 0,100% calc(100% - 24px),50% 100%,0 calc(100% - 24px))`), navy semibold
  title, hover-reveal overlay variant on homepage tiles.
- Section label = pill chip (light navy fill), NOT mono eyebrow with rule. Grep gate below.
- Steri-Clean-geometry sweep bands in every inner-page header (`.marks` in mockups).
- Overlay-card-on-photo-band with flush bottom CTA bar (Handoff Record, quote-variables).
- Saturated navy rounded field sections (Why, principles, publication standard).
- Stepped form: 01/02/03 rail + white 8px-radius card, on every form instance.
- Curved hero divider on homepage only.
- Five-stage and four-step rails per mockups.

Type: Inter only. Display weights 500 (hero/hub H1) / 700 (inner band H1) / 600 (H2-H4).
Newsreader is retired sitewide (owner ruling D5) — remove its font loading. Zero `font-size`
declarations on heading tags (AGENTS.md type law #1 stays absolute); extend the `.ac-` scale
with role classes matching mockup sizes and log the token additions.

Colors: existing `--ac-` navy system only, plus three functional additions to tokenize:
accent amber `#C8912E` (deadline band — owner ruling D1: keep), status green `#2F7D5B`,
exclusion red `#8C3B32`. Add as `--ac-` tokens; no other new color.

## 4. Do not touch

- `functions/api/lead.ts` and everything it calls. Forms keep posting to `/api/lead` exactly
  as wired today. (Doc 27 §18 says `/api/leads` and calls the endpoint missing — that text is
  stale; the correction is approved in §9.15.5. Code is truth.)
- Turnstile, HubSpot, Resend integration, `/thank-you/` redirect wiring.
- `/sms-notification-consent/` — byte-preserved under carrier review. Zero changes, including
  global CSS that would restyle it; verify rendered bytes are identical pre/post.
- All noindex/index status, sitemap.xml contents, `_redirects`.
- Astro version, adapter status (`output: "static"`, no adapter).

## 5. Assets

- Every image slot renders the flat gray placeholder block from the mockups, with its label.
  Photos arrive later by filename swap; their absence does not block this port.
  These labeled gray slots are the approved exception to the zero-placeholder rule — the
  placeholder gate below applies to `[OWNER INPUT`/`TODO`/`FIXME`/`LOREM` text, not to them.
- Header wordmark: use the owner-supplied horizontal wordmark from the asset manifest
  (2026-07-30 entry). The mockups' text logotype is a stand-in; do not ship it.
- Icons: inline SVG as in mockups.

## 6. Evidence gates — all required before reporting done

1. `npm run build:local` passes; route count unchanged from current build.
2. **No `font-size` reaches a heading — verified by cross-reference against the built output,
   never by grepping selector text.** Build, then: collect every class that declares a
   `font-size` in `src/` (strip CSS comments first, or mockup references like `/* .hero h1 */`
   produce false positives), collect every class actually applied to an `<h1>`–`<h6>` in
   `dist/`, and intersect. Anything in the intersection that is not an `.ac-type-*` role class
   is a violation, as is any bare `h1`–`h6` selector declaring a size or any inline
   `style="font-size"` on a heading. Zero violations required.
   *(Corrected 2026-08-19. This gate previously read
   `grep -ri "font-size" src/ --include="*.astro" --include="*.css"` → zero hits on h1–h6
   selectors. That command cannot answer the question: it returns 256 hits on a clean tree, and
   a plain class that sets a size and lands on a heading — `.referral-note__heading` on an
   `<h2>` — is invisible to it. Exactly that method passed a live violation on 2026-08-18, which
   is why `AGENTS.md` §6 law 1 was amended the same day to require computed-style resolution.
   The gate text was never updated to match the amended law.)*
3. `grep -ri "font-family.*mono\|JetBrains\|ui-monospace" src/` → zero hits.
4. `grep -ri "Newsreader" src/` → zero hits.
5. `grep -ri "OWNER INPUT\|TODO\|FIXME\|lorem" dist/` → zero hits.
6. Every visible string diffs clean against §9.15 or doc 27. Produce the trace table for any
   string you were unsure about.
7. Screenshots: `/`, one hub, one service page, `/request-assessment/`, `/about/` — each at
   390px and 1440px — plus the mobile drawer OPEN at 390px.
8. `/sms-notification-consent/` rendered output byte-identical to pre-port.
9. Lead form on `/` and `/request-assessment/` submits successfully to `/api/lead` in local
   test (do not touch the endpoint to make this pass).

Report-before-change discipline applies: post your plan and component mapping against the live
tree FIRST, wait for nothing, but record it; then execute; then report with the evidence above.
Do not report done because it compiles.

## 7. AGENTS.md amendment (same session, last step)

Replace the Scope section's one-page restriction with the 36-route architecture per
`docs/SITEMAP-MASTER.md`, and correct the endpoint rule to name `functions/api/lead.ts` as the
one canonical endpoint. Append to `docs/05-DECISIONS-LOG.md`:

> 2026-08-18 — Owner approved the PDF-derived visual direction (12 mockups in docs/mockups/)
> as port target, superseding aseptaclean-FINAL-v2.html. Doc 27 §9.15 adopted as connective
> copy canon with humanization amendments 1–6. Rulings D1–D5 per §9.15.3. Doc 27 §18 endpoint
> corrected to /api/lead. Doc 27 §30 re-armed against the new direction: no further redesign
> before conversion and proof data.

## 8. If anything is ambiguous

STOP and report the specific conflict with file and line. Do not silently resolve. A shorter
correct port beats a complete guessed one.
