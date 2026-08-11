# 20 — Alignment Audit and Fix Register

**Rev. 2 — 2026-08-11, corrected against the repository state report.**
Rev. 1 was written from documentation alone. Six of its findings were wrong and are struck
below. The repository is in materially better shape than the documents implied.

---

## Verdict

**The code is disciplined. The documentation is not, and neither is the git state.**

The Astro compile is clean with zero warnings. The lead pipeline is genuinely well built —
one endpoint, correct failure isolation, provider failures logged rather than fatal. The
claims discipline is the best part of the whole project: no `certified`, no `free assessment`,
no `gross filth`, no `post-infestation`, no `hantavirus`, no affirmative guarantee anywhere.
Every hit for a banned word is either a code comment enforcing its absence or a disclaimer
using it to narrow scope. That is rare and it was done on purpose.

The problems are **git state, route wiring, and one content-drift bug** — not craft.

| Priority | Count | Nature |
| --- | --- | --- |
| P0 — act today | 2 | Unversioned work; a redirect that may be shadowing two live routes |
| P1 — before cutover | 5 | Crawl path into placeholder drafts, FAQ drift, ratio floor, insurance string |
| P2 — before or just after | 5 | `.env.production` in git, dead code, orphaned route, shipped unused fonts |
| P3 — housekeeping | 3 | Docs cleanup |

---

## Corrections to Rev. 1 — I was wrong about these

| Rev. 1 claim | Reality |
| --- | --- |
| B2: the discretion assurance item was removed | **Renders.** `ConfidenceAndFit.astro:56-65`, sixth of six, full operational wording — unmarked vehicles, plain clothing, no signage, no discussion with neighbors, scheduling around visibility. |
| B3: the fit/non-fit sentence was removed | **Renders verbatim.** `ConfidenceAndFit.astro:19-22`. |
| `ConfidenceAndFit.astro` was dropped from the render | **Imported and rendering** at `index.astro:88`, section 4 of 14. |
| B5: four inline `style="font-size"` on `<h2>` elements | **Zero inline font-size attributes anywhere in `src/`.** |
| `wrangler.toml` still carries `REPLACE_WITH_REAL_KV_NAMESPACE_ID` | **Fixed** in commit `3b61a3d`. Real 32-hex namespace ID present. The placeholder survives only in the gitignored local `.wrangler/` dev state. |
| Termly consent is disabled and untracked | **Enabled.** `PUBLIC_TERMLY_CONSENT_ENABLED=true`, website UUID and all three policy IDs set. Launch gate item 13 is largely closed — verify the banner renders, do not rebuild it. |

Also settled: the font-preload dispute. `BaseLayout.astro:57-77` contains three
`<link rel="preload" as="font">` tags for Newsreader, Inter, and IBM Plex Mono 400. The
session-3 log was right; `04-RELEASE-CHECKLIST.md` was wrong.

---

## P0 — act today

### P0-1. Two live pages exist only in the working tree

`git status` shows untracked `src/pages/services/index.astro` and
`src/pages/who-we-help/index.astro`, plus uncommitted modifications to `Footer.astro`,
`servicePages.ts`, `site.ts`, and `sitemap.xml.ts`.

These are not scratch files. Both pages are **linked from the header nav and the footer, and
added to the sitemap allowlist.** A code comment at `site.ts:180-184` calls this "Chunk 3 of
the IA expansion (owner-approved plan, 2026-08-11)."

**If this working tree is lost, the entire IA expansion is gone and the site's navigation
breaks**, because `Footer.astro` and `site.ts` link to routes that would no longer exist.
Commit it. Today. Before any other work.

Note also: neither route appears in `19-SYSTEM-AND-SITEMAP.md`. The architecture authority
does not know these pages exist. Add them to doc 19 in the same pass.

### P0-2. A redirect may be shadowing two real pages — test this

`public/_redirects` lines 21 and 24:

```
/estate-cleanout-san-jose/    /    301
/hoarding-cleanup-san-jose/   /    301
```

Both of those routes **now exist as real, built pages** — they were created after the redirect
sweep and the sweep was never revisited. Both are linked from `/services/` and
`/service-areas/`.

The prior audit checked that every redirect *destination* resolves. It did not check whether
any redirect *source* collides with a route that now exists. Cloudflare Pages precedence
between `_redirects` and static assets is the deciding factor and it must be **tested against
a deployed preview, not reasoned about.** `curl -I` both URLs.

If the redirects win, two finished pages are unreachable and every internal link to them is
dead. If the assets win, the redirect rules are harmless but should still be removed as
misleading. Either way: `/estate-cleanout-san-jose/` and `/hoarding-cleanup-san-jose/` cannot
be listed both as retired and as live.

---

## P1 — before DNS cutover

### P1-1. Indexable hubs now link into noindex drafts full of `[OWNER INPUT:` placeholders

`/services/` and `/who-we-help/` are `noindex=false` and in the sitemap. They link to eight
pages that are `noindex=true` drafts, and `servicePages.ts` carries **11 genuine
`[OWNER INPUT: …]` strings** across those drafts.

That is a crawl path from an indexable hub into unfinished content, and a user path from the
main navigation into pages that say `[OWNER INPUT: …]` on screen.

Three options, pick one per link — do not leave it as-is:
- Remove the link until the target's gate clears
- Ship the target with real content
- Keep the link but resolve every `[OWNER INPUT:` on that specific target first

`ServiceProof.astro:5-6` documents the convention correctly — "insert clearly labeled
placeholders, never invent." The convention is right. The exposure is that those pages are now
reachable.

### P1-2. FAQ content drift — the hoarding question exists but does not render

Two FAQ arrays exist:

- `src/data/site.ts:478-535` — **11 questions**, including *"Do you handle properties with
  heavy accumulation or hoarding conditions?"* at `site.ts:530-531`. **Dead code.** Its only
  reference anywhere is a comment in `hoarding-cleanup-san-jose/index.astro:12`.
- `src/components/FAQ.astro:5-36` — **6 questions**, its own inline array. This is what renders.
  The hoarding question is not among them.

`FAQPage` JSON-LD maps over the same 6-item import, so schema and visible text match. That part
is correct.

Two defects: `07` §4 requires that question and it is missing — it is also the page's single
best hoarding and estate search signal, which is the whole point of `07` §4's SEO correction.
And **anyone editing `site.ts`'s FAQ will see no effect on the live page**, which is a trap for
the next person. Delete the dead array or wire it up. Do not leave both.

### P1-3. H1:body ratio is below the floor — confirmed by measurement

| Viewport | h1 | body | ratio | floor | result |
| --- | --- | --- | --- | --- | --- |
| 390px | 40px | 16px | 2.50:1 | 2.5:1 | at the floor, zero margin |
| 1440px | 60.8px | 16px | **3.80:1** | 4:1 | **FAIL** |

Measured against the hero lead paragraph (17.92px) instead of the 16px baseline, it is
**2.23:1 and 3.39:1** — well below on both.

Source: `.hero h1 { font-size: clamp(2.5rem, 5vw, 3.8rem); }` at `Hero.astro:101`. Raising the
clamp maximum from `3.8rem` to `4rem` puts 1440px at exactly 4:1; `4.25rem` gives real margin.
This is documented as the fix for "the page looks flat" and it is one number.

### P1-4. `font-size` on a heading selector — two real hits

- `Hero.astro:101` — `.hero h1 { font-size: clamp(...) }`
- `AssessmentForm.astro:2014` — `font-size: var(--ac-text-h2)`

The `.ac-type-h1/h2/h3` rules in `global.css` are **not** violations; that is the intended
mechanism. `global.css:60`'s comment is accurate for bare tag selectors. Move the hero's clamp
into `--ac-text-h1` — which already holds the identical value at `tokens.css` — and delete the
component rule. That fixes P1-3 and P1-4 in the same edit.

### P1-5. `.env.production` is downgrading the approved insurance string

`src/data/site.ts` defaults to the full approved string, *"Insured. Certificate of Insurance
available upon request."* `.env.production` sets `PUBLIC_INSURANCE_STATUS=Insured`, which
overrides it. The qualifier renders nowhere on the site.

An environment variable is actively overwriting approved copy with a weaker version. Set it to
the full string or unset it and let the default stand.

---

## P2

### P2-1. `.env.production` is committed to git despite being in `.gitignore`

Tracked, and edited across five commits. It holds the public phone number, the owner alert
email, four Termly UUIDs, and the Turnstile **site** key. None of those are server secrets —
those are correctly absent and belong in `wrangler pages secret put`. But the ignore rule was
added without `git rm --cached`, so the file is in history and the ignore rule is a lie.

Decide deliberately: either untrack it and move the values to Pages environment variables, or
remove it from `.gitignore` and treat it as intentional committed config. The current state —
ignored but tracked — will mislead every future session.

### P2-2. `npm run build` cannot succeed locally

The pipeline is `validate:env --mode production && astro build && prune-dev-routes`. It exits
1 at step one on six absent server secrets. `npx astro build` alone exits 0, builds 25 pages
in 2.15s, 1.5MB output, no warnings.

This is defensible design — secrets belong in Pages, not git. But it means no one can
reproduce a production build from the committed repo, and `prune-dev-routes.mjs` never runs,
so **`/dev/type-specimen/` and `/dev/type-compare/` remain in any locally produced `dist/`.**
Add an `npm run build:local` that skips the env gate, or a documented `--mode preview` path.

### P2-3. `/service-areas/` is an orphan that seven redirects point at

Zero internal links anywhere in `src/`. `noindex=true`. Excluded from the sitemap. And
`_redirects` lines 42–48 funnel `/locations/`, `/san-jose/`, `/santa-clara/`, `/sunnyvale/`,
`/mountain-view/`, `/campbell/`, and `/milpitas/` into it.

Anyone following an old city URL lands on a noindex page nothing links to. Either finish it and
link it — it is now reachable from `/services/`'s neighborhood anyway — or repoint those seven
redirects at `/`.

### P2-4. Three orphaned components, and five unused font packages shipping bytes

Unimported: `CategoryContrast.astro` (115 lines), `OutcomeComparison.astro` (44),
`Qualification.astro` (84). Delete them or render them — see §Section-map below.

`package.json` installs seven font packages. Only three have `@font-face` rules: Newsreader,
Inter, IBM Plex Mono. **Fraunces, Instrument Sans, Montserrat, Open Sans, and Source Serif 4
are unused** — and Montserrat and Open Sans are the *retired* typefaces. Worse, the report
found `fraunces-*.woff2`, `montserrat-*.woff2`, and `open-sans-*.woff2` in `dist/_astro/`,
almost certainly pulled in by `dev-type-compare-fonts.css` via the two `/dev/` pages. Since
`prune-dev-routes.mjs` never runs locally, those fonts are shipping. Remove the packages, or
confirm the prune step strips them in the real Pages build.

### P2-5. Small correctness bugs

- `functions/api/lead.ts` enforces an 80MB payload cap and tells the user "larger than 75 MB."
- `sms-notification-consent.astro:6` hardcodes `<meta name="robots" content="index,follow">`,
  bypassing the `PUBLIC_DEPLOYMENT_ENV` gate that governs every other page. It will index from
  a staging build. **Do not edit this page** — it is under Twilio 10DLC carrier review. Note it
  and leave it.
- `sms-notification-consent.astro:87,137` links to `https://aseptaclean.com/terms-and-conditions`,
  which is a `_redirects` source, not a live route. It resolves via 301, but it is the one page
  that must not 404 for a carrier reviewer. Verify the hop works on the deployed preview.
- The two forms are distinguished at the backend only by the silent presence of a hidden
  `form_version` field, documented in one code comment. Name it in `lead.ts` explicitly.

---

## The section-map decision, now answerable

Rev. 1 asked whether the five "removed" components had lost real content. Four of the five are
in fact rendering, and the fourteen-section homepage carries every content obligation:

| Requirement | Status |
| --- | --- |
| Discretion assurance item (`07` §6) | Renders — `ConfidenceAndFit` |
| Fit/non-fit qualification (`07` §4) | Renders — `ConfidenceAndFit` |
| Five-stage rail, all five stages | Renders — `HandoffStandard`, Scope/Protect/Clear/Reset/Verify |
| Hoarding search language (`07` §4) | **Missing** — the FAQ question, P1-2 |
| One h1 | Confirmed, `Hero.astro:15` |

So the answer is: **amend doc 10 item 7 and `11` §5 to the fourteen-section reality, fix the
FAQ, and delete the three orphaned components.** There is no content worth restoring in
`CategoryContrast`, `OutcomeComparison`, or `Qualification` that the current page does not
already carry — except the hoarding question, which belongs in the FAQ, not in a resurrected
section.

One duplication worth noting: `Hero.astro:38-51` renders a **hardcoded static five-row
"Handoff Status" panel** that is not driven by `homepage.handoffStages`. `HandoffStandard.astro`
renders the same five stages from data. If a stage is ever renamed, the hero will silently
disagree with the rail.

---

## P3 — housekeeping

**All four items below are resolved as of the 2026-08-11 `docs/22DOCDISPOSITION.md` cleanup
pass — kept as the historical record of what this audit originally found, not as an open
task list.**

- **Nine dangling doc-to-doc references confirmed**, including `01-QUALITY-GUARDRAILS.md:1174`
  pointing at its own former filename, and `08`'s reference to a strategy doc that has never
  existed. Full list was in the state report §11 (`docs/REPO-STATE.md`, a frozen snapshot, not
  re-verified since). Resolved: the two references still landing in live files were repaired
  during the doc-cleanup pass; the rest lived in files since deleted or in historical log
  narration.
- ~~`docs/AGENTS-PRECEDENCE-BLOCK.md` still on disk. Delete it — its endpoint rule is
  inverted.~~ Deleted.
- ~~`01-QUALITY-GUARDRAILS.md` still titled `# 10 — $20K Website Quality…`, colliding with
  `10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`.~~ Retitled to `# 01 — Execution Quality and
  Anti-Generic Guardrails`.
- **Astro is 7.1.6.** The `07` §8 "freeze at Astro 5, migrate later" decision is moot — the
  migration already happened. (`07-ONE-PAGE-DIRECTIVE.md` itself is now deleted; this fact is
  preserved in `docs/05-DECISIONS-LOG.md`'s migrated §3 row 11.)

---

## What still outranks all of it

Unchanged. Zero completed documented projects, zero reviews, and six server secrets not yet
set in Cloudflare Pages.

1. Set the six secrets via `wrangler pages secret put` — `TURNSTILE_SECRET_KEY`,
   `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`,
   `EMAIL_FROM_ADDRESS`. Nothing ships until these exist. Then run the five real sends.
2. Live answering service, contracted and tested, before any paid traffic.
3. First 3–5 jobs bid for proof — photographs with signed release, a case study, a review.

The site is closer to done than the documents suggest. The gap is operational.
