# About Aseptaclean

Expected route: /about/. Reference ClearPath PDF p26/p32 for large human photograph/text composition; master spec for brand and spacing.

Header → CompactPhotoHero → FounderSplit → OperatingPrinciples → factual company context → FinalCallSection → Footer.

Use main Homepage → Why Aseptaclean as the current introductory source. Supplement with actual repository About copy for Matthew Ruiz, his role, background, and the three existing operating principles (Clear authority, Written boundaries, Direct accountability). The supplied reference/company-page-snapshot.md is historical comparison material, not an automatic substitute for current source. Keep the real founder qualification where applicable; do not restore the old business-wide prohibition of the now-recorded trauma service.

Show a real founder portrait prominently, approximately half of the main founder split. No stock founder or invented quote. Retain the established quote only if it is still current approved About copy. Do not add corporate staff photographs, fabricated history, numbers, or generic value cards.

Primary Call Aseptaclean (`tel:+14087857588` via `src/data/site.ts`). Secondary Send a Message goes to Contact's form (`/contact/#contact-form`). A full form on About is not required. If actual About source is unavailable, complete the layout and source-grounded main-copy section, and flag the exact dedicated copy slot rather than inventing a founder biography.

## Section purposes — one idea each

Drawing About from **both** Homepage → "Why Aseptaclean" and the dedicated About copy is what
produced the duplication fixed on 2026-09-04. The two sources say the same thing about the
founder in different words. Use them for different jobs:

| Section | Its one job | Source |
| --- | --- | --- |
| CompactPhotoHero | Concise introduction: who Aseptaclean is. Nothing else. | `aboutPage.eyebrow` / `.h1` / `.lead` |
| AcTrustStrip | The verified operating facts — the page's only place for them. | `src/data/site.ts` |
| FounderSplit | Matthew Ruiz, his background **once**, and how it informs the approach. | `aboutPage.founderHeading` / `.founderBody`, then `home.why.body[1]` + `home.why.close` + `home.why.pullQuote` |
| OperatingPrinciples | Clear authority, Written boundaries, Direct accountability — explained once. | `aboutPage.operatingPrinciples` |
| Company context (Scope) | Only facts not already covered: the scope and documentation boundaries. | `legal.scopeDisclaimer`, `legal.documentationDisclaimer` |
| FinalCallSection | A concise next step. | page copy |

## Intentional omissions — do not restore

These occurrences were removed on 2026-09-04 because the page already said them. Every one is
still present in its own source document, and most still render on `/`. Restoring any of them
re-creates the defect. Full reasoning in `docs/05-CURRENT-DECISIONS.md`.

- **Hero `assurances`** — "Owner-operated" and "Serving the {area}" duplicated `AcTrustStrip`
  verbatim, ~30px apart. The trust strip keeps them (and adds the response time).
- **`home.why.body[0]`** — "Our founder's background includes biochemistry, pharmaceutical
  manufacturing, and surgical pathology." A generic restatement of `aboutPage.founderBody`,
  which is more specific and names Matthew. `home.why.body[1]` is kept: it is the transition
  into the pull quote. Both still render on `/` via `HomeFounder`.
- **`homepage.founderCredentials`** on About — the same four facts a third time in the same
  section. It added only the word "communication". Still renders on `/`.
- **The "Real trust starts with clear expectations." dark band** — restatement only: its
  "not… every small problem into a large project" is `home.why.close`'s "we do not assume every
  difficult property is a major remediation project", and its closing line was verbatim the
  heading of the next section. `20-COPY-MAP.md` already parks this block for `/`; the source
  text is intact in `aseptaclean-all-website-copy.md`. Its dark treatment and photograph were
  inherited by the Scope section so the page keeps its 70/30 dark break and second image.
- **The unsourced hero paragraph** "We work on properties where the condition is the problem —
  not properties that need a routine visit…" — resolved to no named source, which
  `20-COPY-MAP.md` § Copy trace forbids, and restated the condition-first point that
  `home.why.close` makes in the founder section.

`legal.scopeDisclaimer` / `legal.documentationDisclaimer` appearing both here and in the footer
is **not** duplication to remove: doc 21 §6 places these "in the footer and near exclusions where
practical", the pattern every service page follows.

## Above-the-fold

About is one of the eight photo-hero pages under profile **AC-CP70-91130-1.1 §7**: the complete
compact hero must sit above `V − B − 16px` at 1440×900, 1536×864, 1366×768 and 1280×800, and the
headline plus primary call must be visible at 390×844. Verify with
`node scripts/about-fold-check.mjs --label <run>` against a real build — never by inspection.
The hero carries eyebrow, H1, lead and the two actions; anything more has overflowed 1366×768
before. Keep new material in the sections below it.
