# Aseptaclean design-spec copy map

Required by `docs/ASEPTACLEAN-DESIGN-SPEC.md` §1/§10. Records the source and destination of every
copy block moved by this session's homepage rebuild, marks new estate-adjacent draft text clearly,
and records removed verbatim duplicates with their retained location. Every source string below is
`src/data/publicCopy.ts`'s `home` export unless noted otherwise; nothing in this table was typed in
without a recorded source.

## Homepage — block-by-block disposition

| Old heading / block (source) | Old location | Destination | Action | New wording? |
| --- | --- | --- | --- | --- |
| `home.hero` (eyebrow, heading, body) | Hero (was row 2) | Hero (`hero` section) | Keep, unchanged | No |
| `home.intro` (heading "Some properties need / more than cleaning.", body×3, pullQuote) | Standalone "01 / The difference" `AcSplit` (was row 4) | `why` section — heading renders as the section's H2; body renders as the first 3 of 5 body paragraphs; pullQuote renders as a styled line in the slot | Move + combine | No — same strings, new container |
| `home.doorsIntro` (heading "What are you dealing with?", lead, body) | Services intro (was row 5) | `services` section intro | Keep, unchanged | No |
| `home.serviceCards` (5 entries) | Service grid (was row 5) | `services` section, cards 1–5 of 6 | Keep, unchanged | No |
| `home.scope` (heading, lead, body, pullQuote) + `home.scopeQuestions` (7 items) | Standalone dark "03 / Scope" `AcDarkBand` (was row 6) | `process` section, folded in as a bordered "what you will know before we start" block beneath the 4 steps | Move, verbatim | No |
| `home.steps` (5 entries: title + body) | "04 / How it starts" `AcSteps` (was row 7) | `process` section, consolidated to 4 steps | Move + **merge** (see below) | Title merge only |
| `home.why` (heading "Built around careful work.", lead, body×2, pullQuote, close×3) | Standalone "05 / Why Aseptaclean" `AcSplit` (was row 8) | `why` section — heading folds into the bold lead line (`${home.why.heading} ${home.why.lead}`); body×2 appends to the section's body array; pullQuote renders as a second styled line; close×3 become the "up to three evidence rows" | Move + combine | No — same strings, new container/role |
| `site.location.cities` (10 cities) + verified service-area lede | "06 / Service area" `AcIntro` (was row 9) | `service-area` section, split into South Bay (8) / Peninsula (2) grouped lists | Move + regroup | No — same city list, no new city added |
| `home.faq` (6 Qs) + rebuilt "What areas do you serve?" answer | Standalone "07 / Questions" `FaqAccordion` (was row 10) | **`/contact/`**, new FAQ section | Move to a different page | No — verbatim, relocated per spec's evidence-appendix instruction that homepage FAQs may move to Contact |
| `home.final` (heading, body×2) | `AcFinalCta` closing band (was row 11) | Split across two destinations: (a) `cta-close` section uses it as the CTA band's own heading/body; (b) no longer duplicated into the `contact` section (which now shows `site.offer.formHeading` instead — see below) | Move, verbatim, used once | No |
| `site.offer.formHeading` / `formLede` | Always rendered by `AcCompactForm`'s own default header when no `headingId` override is passed | `contact` section (this session removed the earlier `headingId` suppression used on the intermediate build, so the form shows its own approved heading again) | Unchanged existing string, restored to visible | No |

**Title merge, flagged explicitly (spec §10 "if a new summary is required, show it as a proposed
copy edit; do not silently replace the approved sentence")**: `home.steps[1].title` ("We review the
condition.") and `home.steps[2].title` ("We define the work.") were merged into one new title, "We
review the condition and define the work.", because the spec's homepage process is fixed at four
steps and steps 2–3 are the closest semantic pair to combine. **Both original body paragraphs are
concatenated verbatim beneath the merged title — no body sentence was shortened or dropped.** This
is the one heading-level wording change on the entire homepage; every other heading, lead, and
body paragraph is byte-identical to its source.

## New copy — clearly marked, not present in any approved source document

Per spec §0.2 ("Add Estate Cleanout to the homepage services grid, dropdown, and public footer")
and §4.6 ("New copy is a clearly identified draft based on current approved material; do not
change existing locked copy to harmonize with it"), the following strings are new. Each was
checked against AGENTS.md §0.3/§7 and doc 21 before writing: no claim, price, credential,
guarantee, or service not already described elsewhere on the site.

| String | Location | Basis |
| --- | --- | --- |
| "Whoever is responsible for the property" (heading) | `who-we-help` section | Reused verbatim from the existing `/who-we-help/` page's own H1 (`src/pages/who-we-help/index.astro`) — not new, corrected from an earlier draft of this map |
| "Families, fiduciaries, property managers and businesses all reach Aseptaclean the same way — by telling us what is happening at the property." | `who-we-help` section lede | New. Written for this section's specific four-group framing, since the existing `/who-we-help/` page's own lede describes a different three-segment set |
| "A property that has become difficult to live in or manage, cleared and cleaned under one written plan." | `who-we-help`, "Homeowners and families" row | New. Restates existing hoarding/extreme-cleaning/deep-cleaning service scope, invents nothing |
| "An estate or trust property prepared for its next step, with important items protected and documented." | `who-we-help`, "Executors, trustees and fiduciaries" row | New. Restates the existing Estate Cleanout page's own "protect what matters" thesis |
| "A rental unit or vacated property turned over between tenants, on a schedule you set." | `who-we-help`, "Property managers and landlords" row | New. Restates the existing Property Cleanouts page's scope |
| "A commercial space with a cleanup project or scope that needs to be clearly defined before work starts." | `who-we-help`, "Businesses and facility managers" row | New. Restates the existing Commercial page's scope framing |
| "Not sure where to start? You do not need to know the name of the service before you contact us." | `cta-mid` heading | The second clause is `home.doorsIntro.lead`, already approved. The first clause ("Not sure where to start?") is new, minimal connective copy |
| Estate Cleanout homepage card description: "A full home can hold years of papers, photos, furniture and family items. We build the plan before anything is approved to leave the property." | `services` section, sixth card | **Not new** — reused verbatim from the live `/estate-cleanout-san-jose/` page's own hero lede (`src/pages/estate-cleanout-san-jose/index.astro`, `.ec-hero__lede`) |

**None of these strings have been separately owner-approved as locked marketing copy** the way
`docs/aseptaclean-all-website-copy.md`'s strings have. They are drafted, minimal, and
claims-checked, flagged here for the owner's review per spec §4.6's explicit instruction.

## Estate campaign (`/estate-cleanout-san-jose/assessment/`) — copy disposition

No copy was rewritten on this page. The only change was structural: the `PpcHeroForm` instance
moved from the hero to the former "07 · LET'S MAKE A PLAN FOR THE HOUSE" section, which **reused**
its own existing `copy.final.heading`/`body`/`areaLine` (from `src/data/ppcEstate.ts`) as the new
form section's introduction — the same text, now doing double duty as both closing statement and
form intro, per the same pattern already established for the homepage and four sibling service
pages in the 2026-09-17 session (see `docs/05-CURRENT-DECISIONS.md`). No sentence was added,
removed, or reworded. The hero's own copy (eyebrow, heading, lead, body, three trust points) is
completely unchanged; only the image that now sits beside it was added (see
`ASEPTACLEAN-IMPLEMENTATION-MAP.md` §9 for that asset's provenance).

**Preserved verbatim, explicitly confirmed not touched:** the free-walkthrough offer
(`site.offer` scoped exception, AGENTS.md §4), the founder section's wording, the FAQ answers, and
the plan/price/commitments section's three navy-band commitments.

## Verbatim duplicates removed

The only duplicate-copy removal on the homepage was structural, not textual: `AcCompactForm`'s
default heading (`site.offer.formHeading`, "Tell us about the property.") was, in an earlier
intermediate version of this session's homepage build, suppressed via a `headingId` override so
the adjacent CTA band's heading wouldn't read as a duplicate. The final structure instead gives the
CTA band (`cta-close`) and the contact form (`contact`) two genuinely different headings —
`home.final.heading` and `site.offer.formHeading` respectively — so no suppression was needed and
no copy was actually duplicated or deleted; this row is recorded because an intermediate build
briefly hid a string that the final build restores to visible.

No other exact duplicate statement was found or removed during this session's homepage rebuild.

## 2026-09-18 — Homepage replacement copy authorized by correction request

The owner's pasted correction request supersedes the earlier homepage copy-preservation mapping.
`src/pages/index.astro` contains its exact hero headline/support, Why heading/paragraph/benefits,
four audience labels, mid CTA, four process steps, closing CTA and form heading/support. Service
summaries and audience support are concise, scope-limited connective copy. Shared `publicCopy`
and the two original owner copy-source files were not modified. About retains its biography.

Homepage assessment links target `#home-contact`; the actual submit label is “Request an
Assessment.” The phone remains sourced from `site.business`. The source form's consent and
agreement clarification remain verbatim. The reference image's extra cities and unverified
health/safety service claims are not copied. The homepage hero sentence's specific affirmative
“Biohazard remediation” wording is the owner's explicit newer display instruction, recorded in
the current decisions log rather than silently generalized to other copy.

## Contact package override — 2026-09-20

Current source for Contact's visible layout/copy is the owner-requested `aseptaclean-contact/
contact-fragment.html`, supported by `contact-copy-provisional.txt`; **copy remains provisional**.
Header, introduction, inquiry heading and right-column copy map to their same named sections in
`src/pages/contact/index.astro`. Hours instead read verified `site.business.hours`. Existing
`contactPage` SEO title/description remain. Production-required email/details lose demo Optional
labels; existing consent/security/helper text and `Send Message` supersede demo form text. Seven
service labels map to accepted existing values; legal/cookie content remains in the compact footer.
No supplied reference/copy file edited. Exact differences and verification are in the Contact
installation entry of `BUILD-KITS-INSTALLATION-CHECKLIST.md`.
