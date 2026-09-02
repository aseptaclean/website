# Full Site Current-State Audit

**Audit date:** 2026-08-24  
**Basis:** current dirty worktree, fresh production build, generated HTML, source inspection,
46-route browser audit, six viewport widths, Axe, sitemap/robots/schema/link checks, and current
repository authority.

> **2026-08-25 documentation addendum:** This remains evidence of the 2026-08-24 generated
> technical state, not future strategy authority. The owner has since approved documentation
> direction for the homepage and `/request-assessment/`; no public implementation, route,
> platform, sitemap, or indexation change was authorized or made by that reconciliation.

## Launch answers

1. **Is the site ready to launch? NO.** The code and generated site are technically sound, but
   required human release decisions and external confirmations remain open.
2. **Readiness score: 86/100.** The remaining risk is concentrated in publication authority,
   insurance verification, live-host checks, and the provider-backed privacy workflow—not in
   build stability or basic page quality.
3. **Are the nine city pages ready to index? NO.**
4. **What prevents indexing?** Owner confirmation that Aseptaclean currently serves Mountain
   View, Sunnyvale, and Campbell for the represented services. All nine remain `noindex, follow`
   and outside `sitemap.xml`. Passing `qa:seo` is technical eligibility, not publication approval.
5. **Five highest-priority remaining issues:**

   1. Resolve the release-checklist C10 crawl/publication decision for links from indexable pages
      into gated `noindex` service and city content.
   2. Obtain explicit owner service-availability confirmation before changing any of the nine
      city publication records.
   3. Verify the Organic Pathogen Endorsement and public insurance wording against the current
      Certificate of Insurance; suppress the claims if they do not match.
   4. Supply and verify the provider-backed DSAR workflow for `/data-request/`; the current email
      path works and no longer looks unfinished, but the route intentionally remains noindex.
   5. Complete live-host release checks: full redirect audit, protected SMS-consent URL and its
      carrier-reviewed links, Termly behavior, inbox/spam placement, and production performance.

## What changed

- Replaced public “Also serving” availability claims on the San Jose hoarding and estate pages
  with neutral “Local planning guides” blocks. The links remain for crawl context, but the text
  now explicitly says the guides do not confirm service availability.
- Removed visible photo/founder/image development placeholders from homepage, service, hub,
  about, and city templates. Sections now use finished text-first cards or deliberate navy
  fields. No photography or project proof was invented.
- Reworked `/data-request/` into a complete email-based privacy-request path. It no longer says
  that a form is unpublished or that the visitor is viewing a preview. It remains noindex until
  the provider workflow is supplied and verified.
- Corrected the remaining ordinary-page Axe contrast failure on the Hoarding page closing band.
- Added `npm run qa:current`, which audits every deployable route at 320, 375, 390, 768, 1024,
  and 1440 pixels, runs Axe on every route at 390px, and checks metadata identity, JSON-LD,
  breadcrumbs, internal links, visible development strings, city robots, and sitemap exclusion.
- Removed unused Newsreader and IBM Plex Mono packages and reconciled the documented typography
  stack to the actual Inter-only implementation.
- Applied npm's available non-breaking security updates. `npm audit` now reports zero known
  vulnerabilities.
- Reconciled `AGENTS.md` into the single authority chain and added a short documentation index.

## What was intentionally preserved

- `functions/api/lead.ts` was not edited. `/api/lead` remains the only lead endpoint, with static
  Astro output and Cloudflare Pages Functions routing intact.
- `/sms-notification-consent/` was not edited. Its missing shared canonical/schema, legacy links,
  external fonts, and one Axe finding remain recorded exceptions during active carrier review.
- Homepage H1: “Some properties need more than a routine cleaning.”
- Shared region: “South Bay & Peninsula.”
- Private Residence Reset: no public range; only the $195 on-site assessment fee; sequence
  Scope → Protect → Clear → Reset → Verify.
- Campbell: 51.7% owner occupied, 2020–2024, with no property-access inference.
- Mountain View's 36-foot rule remains conditional; no claim says particular residential streets
  fall below it.
- No renter-majority, housing-skews-multifamily, unsupported prevalence, fabricated review,
  case-study, project, credential, person, property, or before/after claim was added.
- Off-site transport remains assigned to the applicable authorized/franchised provider.

## Documentation archived

Historical audits, implementation reports, old visual specifications, the former approved
homepage copy, superseded connective-copy and conversion drafts, baseline reports, HTML mockups,
reference screenshots, the FINAL-v2 reference, and the large PDF were moved under
`docs/archive/2026-08-24-reconciliation/`.

The archive is preserved for traceability but is explicitly non-authoritative. Active authority
is documented in `AGENTS.md` and `docs/README.md`.

## Verification results

| Check | Result |
| --- | --- |
| `npm run check` | PASS — 0 errors, 0 warnings; 4 pre-existing hints |
| `npm run build` | PASS — 48 Astro pages; 46 deployable after two `/dev/*` routes are pruned |
| `npm run qa:seo` | PASS — 9/9 city routes clean; 0 errors; 0 technical publish blockers |
| `npm run qa:gate6` | PASS — 0 approved active-canon strings absent |
| `npm run qa:current` | PASS — 46 routes × 6 widths; Axe on every route at 390px |
| Responsive | PASS — no horizontal overflow, clipped content, H1-count failure, or H1/body ratio failure |
| Accessibility | PASS on all ordinary pages — no serious/critical Axe violations; SMS exception recorded and untouched |
| SEO identity | PASS — unique ordinary-page titles, descriptions, and H1s; correct self-canonicals; valid JSON-LD; BreadcrumbList on supporting pages |
| Links | PASS — no broken internal links outside the protected SMS page's carrier-reviewed legacy URLs |
| City indexation | PASS — all 9 `noindex, follow`; none in `sitemap.xml` |
| Visible development text | PASS — no photo slot, founder-pending, image-placeholder, temporary-proof, unpublished-preview, owner-input, or replacement token in ordinary generated pages |
| Dependency audit | PASS — 0 known vulnerabilities after non-breaking audit fix |

The browser report is stored at `artifacts/current-site-verification.json`.

## Generated-output integrity checks

The final generated output contains none of the following on ordinary pages:

- the old homepage H1 or the older “Walk Back Into a Property…” hero;
- `$2,000–$6,000+` or the removed PRR investment bands;
- the retired PRR process;
- Campbell 50.5% / 2019–2023;
- unsupported renter-majority, multifamily-skew, local-street, or prevalence claims;
- “Also serving” on the gated city-link blocks;
- visible photo/founder/image placeholders;
- affirmative self-performed off-site hauling language.

## Route-level exceptions

- `/404`: permanently noindex; no self-canonical required.
- `/sms-notification-consent/`: byte-preserved carrier-review document; deliberately bypasses
  the shared SEO/layout path and is absent from the sitemap. Revisit only after carrier review.
- `/data-request/`: complete email path, but `noindex, follow` until the provider DSAR mechanism
  is configured and verified.
- `/projects/`: honest, proof-limited state; no case studies or project images; `noindex, follow`.
- `/thank-you/`: noindex and intentionally not linked as a destination page.
- Nine city routes: finished technical drafts, human-gated, `noindex, follow`, not in sitemap.
- Remaining gated service routes: publication status remains route-specific. Do not bulk-flip.

## Unresolved human-gated items

- City/service availability confirmation.
- Current COI and Organic Pathogen Endorsement match.
- Provider-backed DSAR configuration.
- Live redirect and protected SMS-route verification.
- Final production-domain consent, inbox, and performance checks.
- Real owner-approved photography and project proof. Their absence is handled honestly and does
  not justify placeholders or fabricated assets.
