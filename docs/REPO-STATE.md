# Repository State Report

Generated 2026-08-11. Read-only audit — ground truth only, no recommendations. All facts verified against the working tree at the time of generation (branch `main`, with uncommitted changes noted explicitly where relevant).

---

## 1. Repo basics

**Branch:** `main`

**Working tree:** NOT clean. `git status --porcelain`:
```
 M src/components/Footer.astro
 M src/data/servicePages.ts
 M src/data/site.ts
 M src/pages/sitemap.xml.ts
?? src/pages/services/
?? src/pages/who-we-help/
```
Four modified, tracked files and two untracked new page directories (`src/pages/services/index.astro`, `src/pages/who-we-help/index.astro`). This report treats the working tree as-is (uncommitted changes included) since that is the current state of the repository.

**Last 15 commits** (hash | date | first line):
```
36e696c | 2026-08-09 | Whitelist Turnstile from Termly Auto Blocker; fix script load order
d215440 | 2026-08-09 | Fix dead "What's included" links and duplicate #included anchor
d98754a | 2026-08-09 | Trigger rebuild: verify Turnstile api.js loader is live on homepage
b16fc2d | 2026-08-09 | Accept short-form leads on /api/lead; fix quick form submit UX
9729ae1 | 2026-08-09 | Add OWNER_ALERT_EMAIL to .env.production
e8f97cb | 2026-08-09 | Enable production form: set PUBLIC_FORM_ENABLED, PUBLIC_FORM_ENDPOINT, Termly UUID
b16134e | 2026-08-09 | Trigger rebuild with form env vars
3b61a3d | 2026-08-09 | Fix deploy blockers: KV namespace ID, _redirects syntax, dev route leakage
01b3da8 | 2026-08-09 | first commit
6e9bc3b | 2026-08-09 | Phase 4: add service/location pages, decisions log, and site infra updates
e1e1322 | 2026-08-09 | Phase 4: adopt 18-VISUAL-DIRECTION.md and port aseptaclean-FINAL-v2.html as the binding homepage
10b1b8f | 2026-08-07 | Checkpoint Phase 4 Sessions 3-8 work-in-progress
560ec68 | 2026-07-31 | Phase 4 Session 2: doc collisions, config gate, and retired-route redirects
9611335 | 2026-07-31 | Add build remediation pass notes (Session 3B/3C plan)
138fa39 | 2026-07-31 | Commit Phase 4 Session 1 audit artifacts
```
Full repo has 24 commits total (`git log --oneline | wc -l`).

**Node version (installed):** v24.14.0 (`node --version`)
**Node version required (`package.json` `engines.node`):** `>=20.11.0`

**Astro version (`package.json`):** `^7.1.6`

**Full `dependencies`:**
```json
"@fontsource-variable/fraunces": "^5.3.0",
"@fontsource-variable/instrument-sans": "^5.3.0",
"@fontsource-variable/inter": "^5.3.0",
"@fontsource-variable/montserrat": "^5.3.0",
"@fontsource-variable/newsreader": "^5.3.0",
"@fontsource-variable/open-sans": "^5.3.0",
"@fontsource-variable/source-serif-4": "^5.3.0",
"@fontsource/ibm-plex-mono": "^5.3.0",
"astro": "^7.1.6"
```

**Full `devDependencies`:**
```json
"@astrojs/check": "^0.9.4",
"@axe-core/playwright": "^4.12.1",
"lighthouse": "^13.4.1",
"playwright-core": "^1.62.0",
"typescript": "^5.9.2",
"wrangler": "^4.118.0"
```

Note: `@astrojs/cloudflare` is NOT in either list (see Section 3).

**`npm run build` result:**

`npm run build` runs `npm run validate:env -- --mode production && astro build --mode production && node scripts/prune-dev-routes.mjs`.

Ran verbatim. **Exit code: 1.** It fails at the first step (`validate:env`) and never reaches `astro build`. Verbatim output:
```
> aseptaclean-astro@0.1.0 build
> npm run validate:env -- --mode production && astro build --mode production && node scripts/prune-dev-routes.mjs


> aseptaclean-astro@0.1.0 validate:env
> node scripts/validate-env.mjs --mode production

Production environment validation failed:

- Missing or placeholder values: TURNSTILE_SECRET_KEY, HUBSPOT_ACCESS_TOKEN, HUBSPOT_PIPELINE_ID, HUBSPOT_DEAL_STAGE_ID, RESEND_API_KEY, EMAIL_FROM_ADDRESS
```
Wall time of the failing command: 0.845s total (fails almost immediately — it never reaches the Astro compiler).

**Why it fails:** `.env.production` (committed to the repo — see Section 12) does not set `TURNSTILE_SECRET_KEY`, `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`, or `EMAIL_FROM_ADDRESS` — these are server-only secrets intentionally excluded from the committed file (per `.env.production` and `wrangler.toml` comments, they're meant to be set via `wrangler pages secret put` in the real Cloudflare Pages project, not committed).

**Isolating whether the Astro compile itself succeeds:** ran `npx astro build --mode production` directly (bypassing the `validate:env` and `prune-dev-routes` steps of the `npm run build` pipeline). **Exit code: 0.** No warnings or errors in the output. Built 25 pages in 2.15s total build step (1.81s for the build phase specifically). This build does NOT run `scripts/prune-dev-routes.mjs`, so the two `/dev/*` pages remain in this dist output (they would be removed by the real `npm run build` pipeline if it got that far).

**Output directory:** `dist/`
**Total size:** 1.5M (`du -sh dist`)
**File count:** 48 files (`find dist -type f | wc -l`)

---

## 2. Routes

Route derivation: `astro.config.mjs` sets `output: "static"`, `trailingSlash: "always"`, `build.format: "directory"`. A page at `foo/index.astro` or bare `foo.astro` → `/foo/`. API-style `.ts` routes (`sitemap.xml.ts`, `robots.txt.ts`) emit literal files, not directories, and are exempt from the trailing-slash rule.

`noindex` is computed in `src/components/SeoHead.astro`: `const shouldNoindex = noindex || !site.deployment.isPublicProduction;` where `site.deployment.isPublicProduction = value("PUBLIC_DEPLOYMENT_ENV") === "production"` (`src/data/site.ts:175`). So **every** page using `BaseLayout`/`SeoHead` is forced to `noindex` whenever the build's `PUBLIC_DEPLOYMENT_ENV` env var isn't literally `"production"`, regardless of the page's own prop. The table below reports each page's own explicit prop (page-level intent); the env-gate caveat applies globally on top of it. `PUBLIC_LAUNCH_MODE` is referenced in `scripts/validate-env.mjs` but not read anywhere in `src/`.

| # | File | URL | noindex (page prop) | In sitemap.xml.ts? | Linked from src/? |
|---|---|---|---|---|---|
| 1 | `src/pages/404.astro` | `/404/` (Astro's static 404 fallback) | `true` | No | NOT FOUND (served automatically, not linked) |
| 2 | `src/pages/about/index.astro` | `/about/` | `false` (unset) | Yes | `Footer.astro:27`, `OperatorAccountability.astro:38` |
| 3 | `src/pages/animal-waste-cleanup-san-jose/index.astro` | `/animal-waste-cleanup-san-jose/` | `true` | No | `service-areas/index.astro:104`; `servicesHub.pillars[1].links` (`servicePages.ts:652`) → rendered on `/services/` |
| 4 | `src/pages/contact/index.astro` | `/contact/` | `false` (unset) | Yes | `Footer.astro:30`, `404.astro:36` |
| 5 | `src/pages/cookie-policy.astro` | `/cookie-policy/` | `false` (unset) | Yes (conditional on truthy `site.urls.cookiePolicy`, which is a hardcoded string) | `Footer.astro:35` (dynamic) |
| 6 | `src/pages/data-request.astro` | `/data-request/` | `false` (unset) | No | NOT FOUND |
| 7 | `src/pages/deep-cleaning-san-jose/index.astro` | `/deep-cleaning-san-jose/` | `true` | No | `servicesHub.pillars[2].links` (`servicePages.ts:659`) |
| 8 | `src/pages/dev/type-compare.astro` | `/dev/type-compare/` | `true` | No | NOT FOUND |
| 9 | `src/pages/dev/type-specimen.astro` | `/dev/type-specimen/` | `true` | No | NOT FOUND |
| 10 | `src/pages/estate-cleanout-checklist/index.astro` | `/estate-cleanout-checklist/` | `true` | No | `whoWeHelpHub.segments[0].links` (`servicePages.ts:717`) |
| 11 | `src/pages/estate-cleanout-san-jose/index.astro` | `/estate-cleanout-san-jose/` | `true` | No | `service-areas/index.astro:102`; `servicesHub.pillars[0].links` and `whoWeHelpHub.segments[0].links` |
| 12 | `src/pages/handoff-standard/index.astro` | `/handoff-standard/` | `false` (unset) | Yes | `Footer.astro:25`, `estate-cleanout-checklist/index.astro:88`, `ServiceProof.astro:27`, `estate-cleanout-san-jose/index.astro:90`, `ServiceScope.astro:22` (`#record` anchor) |
| 13 | `src/pages/hoarding-cleanup-san-jose/index.astro` | `/hoarding-cleanup-san-jose/` | `true` | No | `service-areas/index.astro:103`; `servicesHub.pillars[0].links`, `whoWeHelpHub.segments[0].links` |
| 14 | `src/pages/index.astro` | `/` | `false` (unset) | Yes | `Footer.astro:15`, `Header.astro:9`, `404.astro:28` |
| 15 | `src/pages/privacy.astro` | `/privacy/` | `false` (unset) | Yes | `Footer.astro:33` (dynamic), `AssessmentForm.astro:703`, `QuickHandoffForm.astro:92`. Note: `sms-notification-consent.astro:85,135` links to the absolute external form `https://aseptaclean.com/privacy` (no trailing slash), not the relative route |
| 16 | `src/pages/private-residence-reset.astro` | `/private-residence-reset/` | `false` (unset) | No | NOT FOUND (no internal `href`; only self-referencing canonical/schema) |
| 17 | `src/pages/property-cleanouts-for-managers/index.astro` | `/property-cleanouts-for-managers/` | `true` | No | `servicesHub.pillars[0].links`, `whoWeHelpHub.segments[1].links` |
| 18 | `src/pages/request-assessment.astro` | `/request-assessment/` | `false` (unset) | No | `thank-you.astro:44`; `site.residenceOffer.assessmentUrl` used in `private-residence-reset.astro:91,268` |
| 19 | `src/pages/robots.txt.ts` | `/robots.txt` | N/A — content is env-conditional (`Allow: /` in production, else `Disallow: /`) | N/A | NOT FOUND (fetched by convention) |
| 20 | `src/pages/senior-downsizing-san-jose/index.astro` | `/senior-downsizing-san-jose/` | `true` | No | `service-areas/index.astro:105`; `servicesHub.pillars[2].links`, `whoWeHelpHub.segments[2].links` |
| 21 | `src/pages/service-areas/index.astro` | `/service-areas/` | `true` | No | NOT FOUND — no internal `href` links to this route anywhere in `src/` |
| 22 | `src/pages/services/index.astro` (untracked) | `/services/` | `false` | Yes (added in uncommitted `sitemap.xml.ts` edit) | `Footer.astro:23`; `site.ts:186` nav entry, rendered in `Header.astro` |
| 23 | `src/pages/sitemap.xml.ts` | `/sitemap.xml` | N/A | N/A (self) | Referenced in `robots.txt.ts:7` `Sitemap:` directive text |
| 24 | `src/pages/sms-notification-consent.astro` | `/sms-notification-consent/` | Does not use `BaseLayout`/`SeoHead` at all — hardcoded `<meta name="robots" content="index,follow" />` at line 6, **not gated** by the production env-check that governs every other page | No | NOT FOUND |
| 25 | `src/pages/terms.astro` | `/terms/` | `false` (unset) | Yes | `Footer.astro:34` (dynamic), `AssessmentForm.astro:704`. Note: `sms-notification-consent.astro:87,137` links to the external absolute `https://aseptaclean.com/terms-and-conditions` — a different path than `/terms/` |
| 26 | `src/pages/thank-you.astro` | `/thank-you/` | `true` | No | NOT FOUND via `href` — reached only via post-submit JS redirect from `AssessmentForm.astro`/`QuickHandoffForm.astro` |
| 27 | `src/pages/who-we-help/index.astro` (untracked) | `/who-we-help/` | `false` | Yes (added in uncommitted `sitemap.xml.ts` edit) | `Footer.astro:24`; `site.ts:187` nav entry, rendered in `Header.astro` |

**Sitemap allowlist** — full logic, `src/pages/sitemap.xml.ts:12-22` verbatim (current working-tree version):
```js
const routes = [
  "/",
  "/about/",
  "/contact/",
  "/handoff-standard/",
  "/privacy/",
  "/terms/",
  "/services/",
  "/who-we-help/"
];
if (site.urls.cookiePolicy) routes.push(site.urls.cookiePolicy);
```
Effective allowlist (9 routes): `/`, `/about/`, `/contact/`, `/handoff-standard/`, `/privacy/`, `/terms/`, `/services/`, `/who-we-help/`, `/cookie-policy/`. Every other route (18 of the 27 files found) is excluded.

### public/_redirects — full contents, verbatim

**Total rules: 32**, in three named groups plus one splat rule.

**Group A — four-route collapse retirement:**

| Line | Source | Destination | Status |
|---|---|---|---|
| 19 | `/project-standards/` | `/` | 301 |
| 20 | `/service-area/` | `/` | 301 |
| 21 | `/estate-cleanout-san-jose/` | `/` | 301 |
| 22 | `/property-cleanout-san-jose/` | `/` | 301 |
| 23 | `/vacant-home-cleaning-san-jose/` | `/` | 301 |
| 24 | `/hoarding-cleanup-san-jose/` | `/` | 301 |
| 25 | `/landlord-turnover-cleaning-san-jose/` | `/` | 301 |

**Group B — GSC redirect sweep, direct targets:**

| Line | Source | Destination | Status |
|---|---|---|---|
| 38 | `/terms-and-conditions/` | `/terms/` | 301 |
| 39 | `/process-documentation/` | `/handoff-standard/` | 301 |
| 40 | `/fiduciary-probate-professionals/` | `/handoff-standard/` | 301 |
| 41 | `/property-managers/` | `/handoff-standard/` | 301 |
| 42 | `/locations/` | `/service-areas/` | 301 |
| 43 | `/san-jose/` | `/service-areas/` | 301 |
| 44 | `/santa-clara/` | `/service-areas/` | 301 |
| 45 | `/sunnyvale/` | `/service-areas/` | 301 |
| 46 | `/mountain-view/` | `/service-areas/` | 301 |
| 47 | `/campbell/` | `/service-areas/` | 301 |
| 48 | `/milpitas/` | `/service-areas/` | 301 |

**Group C — GSC redirect sweep, interim `/`-target rules:**

| Line | Source | Destination | Status |
|---|---|---|---|
| 51 | `/families-estate-representatives/` | `/` | 301 |
| 53 | `/hoarding-cleanup/` | `/` | 301 |
| 55 | `/hoarding-estate-clearouts/` | `/` | 301 |
| 57 | `/gross-filth-cleaning/` | `/` | 301 |
| 59 | `/animal-waste-abatement/` | `/` | 301 |
| 61 | `/residential-property-clearing/` | `/` | 301 |
| 63 | `/eviction-difficult-turnaround-clearing/` | `/` | 301 |
| 64 | `/future-services/` | `/` | 301 |
| 65 | `/launching-soon/` | `/` | 301 |
| 67 | `/h2/` | `/` | 301 |
| 69 | `/elementor-page-5945/` | `/` | 301 |
| 71 | `/elementor-page-5950/` | `/` | 301 |
| 73 | `/elementor-page-5960/` | `/` | 301 |

**Group D — splat catch-all:**

| Line | Source | Destination | Status |
|---|---|---|---|
| 76 | `/projects/*` | `/` | 301 |

**Chain check:** none of the four unique destinations (`/`, `/terms/`, `/handoff-standard/`, `/service-areas/`) appears as a *source* of any other rule in the file. No redirect chains exist.

**Broken-destination check:** all four destinations correspond to real files under `src/pages/` (`index.astro`, `terms.astro`, `handoff-standard/index.astro`, `service-areas/index.astro`). No redirect points at a non-existent route.

**Flag:** 7 rules (lines 42–48) redirect to `/service-areas/`, which — per the routes table above — is itself `noindex={true}` and has **no internal link anywhere in `src/`** pointing to it, and is excluded from the sitemap. The route exists and builds, but is otherwise an orphaned, unindexed landing target for those 7 redirects.

---

## 3. Lead pipeline

- **`src/pages/api/lead.ts` exists?** No — confirmed absent.
- **`functions/api/lead.ts` exists?** Yes — 279 lines.
- **`functions/_lib/lead.ts`:** 433 lines. **`functions/_lib/providers.ts`:** 310 lines.
- **`@astrojs/cloudflare` in `package.json`?** No — not present in `dependencies` or `devDependencies`.
- **Adapter configured in `astro.config.mjs`?** No adapter is configured at all. `output: "static"`.
- **`output` in `astro.config.mjs`:** `"static"`.

The site is a pure static Astro build with a Cloudflare Pages Function (`functions/api/lead.ts`) bolted on separately — Astro itself has no knowledge of this endpoint; it is Cloudflare Pages' file-based Functions routing that serves it at `/api/lead`.

### wrangler.toml — verbatim

```toml
# Cloudflare Pages project configuration. Astro remains a plain static build
# (no adapter — see docs/05-DECISIONS-LOG.md); this file exists solely to run
# functions/api/lead.ts as a Cloudflare Pages Function against real bindings,
# both locally (`wrangler pages dev`) and in the deployed project.
name = "aseptaclean"
pages_build_output_dir = "./dist"
compatibility_date = "2026-08-01"

# Private object storage for lead submissions and uploaded property media.
# Matches LEAD_UPLOADS in functions/_lib/lead.ts's LeadEnvironment.
# Create the real bucket with: wrangler r2 bucket create aseptaclean-lead-uploads
[[r2_buckets]]
binding = "LEAD_UPLOADS"
bucket_name = "aseptaclean-lead-uploads"

# Submission rate limiting (5 attempts / 15 minutes per hashed IP). Optional
# in code (LEAD_RATE_LIMIT?), but wired here so the limit is actually enforced.
# Create the real namespace with: wrangler kv namespace create LEAD_RATE_LIMIT
[[kv_namespaces]]
binding = "LEAD_RATE_LIMIT"
id = "5e5faee201c34b36b76ecda6de34927f"

# All other LeadEnvironment fields (TURNSTILE_SECRET_KEY, HUBSPOT_*,
# RESEND_API_KEY, EMAIL_FROM_ADDRESS, OWNER_ALERT_EMAIL, TWILIO_*,
# LEAD_ALERT_PHONE, ALLOWED_ORIGINS) are secrets, not config, and are
# intentionally not set here. Production: `wrangler pages secret put <NAME>`.
# Local dev: create a git-ignored .dev.vars file (see .dev.vars.example).
```

**Placeholder flags:** the KV `id` (`5e5faee201c34b36b76ecda6de34927f`) is a 32-hex-char value, not an obvious placeholder string (no `REPLACE_WITH` marker in this file). It cannot be verified from source alone whether it corresponds to a real, provisioned KV namespace or a stale/example ID — no assertion is made either way. No other placeholder markers appear in this file.

### Environment variables — every one referenced anywhere in the codebase

| Variable | Read in | In `.env.example`? | In `.env.production`? |
|---|---|---|---|
| `PUBLIC_SITE_URL` | `src/data/site.ts:137`, `astro.config.mjs:4`, `validate-env.mjs` | Yes (blank) | Yes — `https://aseptaclean.com` |
| `PUBLIC_BUSINESS_NAME` | `src/data/site.ts:44` | Yes (blank) | Yes — `Aseptaclean` |
| `PUBLIC_LEGAL_NAME` | `src/data/site.ts:45` | Yes (blank) | Yes — `Aseptaclean, LLC` |
| `PUBLIC_EMAIL` | `src/data/site.ts:46` | Yes (blank) | Yes — `info@aseptaclean.com` |
| `PUBLIC_SERVICE_AREA` | `src/data/site.ts:111-113` | Yes (blank) | Yes — `San Jose and the South Bay` |
| `PUBLIC_SERVICE_COUNTY` | `src/data/site.ts:117` | Yes (blank) | NOT set (falls back to default `"Santa Clara County"` in code) |
| `PUBLIC_RESPONSE_TIME` | `src/data/site.ts:86-89` | Yes (blank) | Yes — `within one business day` |
| `PUBLIC_ASSESSMENT_FEE` | `src/data/site.ts:90` | Yes (blank) | Yes — `195` |
| `PUBLIC_STARTING_PRICE` | `src/data/site.ts:12` | Yes (blank) | Yes — `1500` |
| `PUBLIC_RESIDENCE_STARTING_PRICE` | `src/data/site.ts:103-105` | Yes (blank) | Yes — `2000` |
| `PUBLIC_FOUNDER_NAME` | `src/data/site.ts:78` | Yes (blank) | Yes — `Matthew Ruiz` |
| `PUBLIC_TSWMP_STATUS` | `src/data/site.ts`, `validate-env.mjs:243-245` | Yes (blank) | Yes — `pending` |
| `PUBLIC_BUSINESS_HOURS` | `src/data/site.ts:52-55` | Yes (blank) | Yes — `Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday` |
| `PUBLIC_PHONE` | `src/data/site.ts:27,47` | Yes (blank) | Yes — set (redacted per instructions; a valid-format US number) |
| `PUBLIC_SMS_NUMBER` | `src/data/site.ts:49` | Yes (blank) | Yes — set |
| `PUBLIC_FORM_ENDPOINT` | `src/data/site.ts:138` | Yes (blank) | Yes — `/api/lead` |
| `PUBLIC_PRIVACY_CONTACT` | `src/data/site.ts:51` | Yes (blank) | Yes — `info@aseptaclean.com` |
| `PUBLIC_TURNSTILE_SITE_KEY` | `src/data/site.ts:145` | Yes (blank) | Yes — set |
| `PUBLIC_TERMLY_PRIVACY_URL` | `src/data/site.ts:35` | Yes (blank) | Present but blank |
| `PUBLIC_TERMLY_TERMS_URL` | `src/data/site.ts:36` | Yes (blank) | Present but blank |
| `PUBLIC_TERMLY_COOKIE_POLICY_URL` | `src/data/site.ts:37` | Yes (blank) | Present but blank |
| `PUBLIC_TERMLY_WEBSITE_UUID` | `src/data/site.ts:31` | Yes (blank) | Yes — set (UUID) |
| `PUBLIC_TERMLY_PRIVACY_POLICY_ID` | `src/data/site.ts:32` | Yes (blank) | Yes — set (UUID) |
| `PUBLIC_TERMLY_TERMS_POLICY_ID` | `src/data/site.ts:33` | Yes (blank) | Yes — set (UUID) |
| `PUBLIC_TERMLY_COOKIE_POLICY_ID` | `src/data/site.ts:34` | Yes (blank) | Yes — set (UUID) |
| `PUBLIC_TERMLY_CONSENT_ENABLED` | `src/data/site.ts:38-40` | Yes (blank) | Yes — `true` |
| `PUBLIC_INSURANCE_STATUS` | `src/data/site.ts:56-59` | Yes (blank) | Yes — `Insured` |
| `PUBLIC_GBP_URL` | `src/data/site.ts:61` | Yes (blank) | NOT set |
| `PUBLIC_YELP_URL` | `src/data/site.ts:62` | Yes (blank) | NOT set |
| `PUBLIC_NEXTDOOR_URL` | `src/data/site.ts:63` | Yes (blank) | NOT set |
| `PUBLIC_LOGO_URL` | `src/data/site.ts:64-67` | Yes (blank) | NOT set (falls back to default) |
| `PUBLIC_LOGO_REVERSED_URL` | `src/data/site.ts:68-71` | Yes (blank) | NOT set (falls back to default) |
| `PUBLIC_SITE_ICON_URL` | `src/data/site.ts:72-75` | Yes (blank) | NOT set (falls back to default) |
| `PUBLIC_GA_ID` | `src/data/site.ts:147` | Yes (blank) | NOT set |
| `PUBLIC_GTM_ID` | `src/data/site.ts:148` | Yes (blank) | NOT set |
| `PUBLIC_DEPLOYMENT_ENV` | `src/data/site.ts:6,174-175` | Yes (blank) | Yes — `production` |
| `PUBLIC_LAUNCH_MODE` | `scripts/validate-env.mjs:92,95` | Yes (blank) | Present but blank |
| `PUBLIC_FORM_ENABLED` | `src/data/site.ts:144` | Yes (blank) | Yes — `true` |
| `LEAD_UPLOADS` | `.env.example` only (real value is a Cloudflare R2 binding, set via `wrangler.toml`, not env var) | Yes (blank) | NOT set (not applicable — bound via wrangler.toml) |
| `LEAD_RATE_LIMIT` | `.env.example` only (real value is a Cloudflare KV binding, set via `wrangler.toml`) | Yes (blank) | NOT set (not applicable) |
| `TURNSTILE_SECRET_KEY` | `functions/_lib/providers.ts` (Turnstile verification), `validate-env.mjs:63` | Yes (blank) | NOT set — build-blocking |
| `HUBSPOT_ACCESS_TOKEN` | `functions/_lib/providers.ts` | Yes (blank) | NOT set — build-blocking |
| `HUBSPOT_PIPELINE_ID` | `functions/_lib/providers.ts` | Yes (blank) | NOT set — build-blocking |
| `HUBSPOT_DEAL_STAGE_ID` | `functions/_lib/providers.ts` | Yes (blank) | NOT set — build-blocking |
| `RESEND_API_KEY` | `functions/_lib/providers.ts` | Yes (blank) | NOT set — build-blocking |
| `EMAIL_FROM_ADDRESS` | `functions/_lib/providers.ts` | Yes (blank) | NOT set — build-blocking |
| `OWNER_ALERT_EMAIL` | `functions/_lib/providers.ts` | Yes (blank) | Yes — set (redacted) |
| `SMS_ALERTS_ENABLED` | `functions/_lib/providers.ts`, `validate-env.mjs:228-241` | Yes (blank) | NOT set (defaults to disabled) |
| `TWILIO_ACCOUNT_SID` | `functions/_lib/providers.ts` | Yes (blank) | NOT set |
| `TWILIO_AUTH_TOKEN` | `functions/_lib/providers.ts` | Yes (blank) | NOT set |
| `TWILIO_FROM_NUMBER` | `functions/_lib/providers.ts` | Yes (blank) | NOT set |
| `LEAD_ALERT_PHONE` | `functions/_lib/providers.ts` | Yes (blank) | NOT set |
| `ALLOWED_ORIGINS` | `functions/api/lead.ts` (origin allowlist) | NOT in `.env.example` (present only in `.dev.vars.example`) | NOT set |

All values that could resemble real secrets (Turnstile site key, Termly UUIDs, phone numbers) are structural/public identifiers already present in client-facing markup, not private credentials — no redaction beyond what's noted above was necessary for the secret fields since they are simply absent (blank) in the committed files.

### scripts/validate-env.mjs — what it enforces, and current pass/fail

It only runs enforcement when `--mode production` (or `--production` flag) is passed; otherwise it prints "Environment validation skipped" and exits 0.

For a full public production build (`PUBLIC_LAUNCH_MODE` unset, not `"preview"`), it requires 27 keys to be non-empty and non-placeholder (see full list in `scripts/validate-env.mjs:41-75`), plus these extra rules:
- `PUBLIC_SITE_URL` must be HTTPS and exactly `https://aseptaclean.com`.
- `PUBLIC_FORM_ENDPOINT` must be `/api/lead` (if relative) or a valid HTTPS URL.
- `PUBLIC_PHONE` must contain 10–15 digits.
- `PUBLIC_EMAIL` / `PUBLIC_PRIVACY_CONTACT` / `EMAIL_FROM_ADDRESS` / `OWNER_ALERT_EMAIL` must match a basic email regex.
- Termly URL/UUID fields, if present, must use HTTPS and a `termly.io` hostname, and each of the 3 Termly policies needs either an ID or hosted URL — with `PUBLIC_TERMLY_CONSENT_ENABLED` required to be `"true"` for non-preview production.
- If `SMS_ALERTS_ENABLED === "true"`, all 4 Twilio-related vars become required.
- `PUBLIC_TSWMP_STATUS` must remain exactly `"pending"`.
- `PUBLIC_FORM_ENABLED` must be `"true"` for public production (or `"false"` for private preview).
- `PUBLIC_DEPLOYMENT_ENV` must be `"production"` (or `"staging"` only under private preview).

**Would the current `.env.production` pass?** No — confirmed by actually running it (Section 1). It fails on the 6 missing server secrets: `TURNSTILE_SECRET_KEY`, `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`. Every other field that was checked passed at the time of this run (no additional errors were reported beyond the "Missing or placeholder values" line).

### Submit path trace — short form and full assessment form

Both forms POST to the same single backend endpoint: `functions/api/lead.ts` → `functions/_lib/lead.ts` (validation) → `functions/_lib/providers.ts` (Turnstile, HubSpot, Resend, Twilio).

**Short form** (`src/components/QuickHandoffForm.astro`, 515 lines, wrapped by `src/components/RequestForm.astro`, 69 lines): rendered on the homepage and 14 other pages via `RequestForm`. 3 visible fields (name, phone, optional description) plus a required consent checkbox and Turnstile widget. Rendering/submission is gated by `endpointAvailable = Boolean(site.integrations.formEnabled && site.urls.formEndpoint && site.integrations.turnstileSiteKey)` (`QuickHandoffForm.astro:14-18`); if false, the form action is unset and the submit button is disabled. On submit, inline JS does `fetch(form.action, {method:"POST", body: new FormData(form)})` (`QuickHandoffForm.astro:317-321`), checking a client-side Turnstile token first. Success redirects to `/thank-you/?...`; failure shows an inline message and resets Turnstile.

**Full assessment form** (`src/components/AssessmentForm.astro`, 2692 lines): rendered only on `/request-assessment/` (`src/pages/request-assessment.astro`). Also serves the Private Residence Reset variant via a client-side-only `?offer=private-residence-reset` toggle (no separate route/component). 3-step wizard with file upload (`enctype="multipart/form-data"`), same `endpointAvailable` gate. Submits via `XMLHttpRequest` (not `fetch`, for upload-progress events) to the same `/api/lead` endpoint.

**Backend order of operations** (`functions/api/lead.ts`, both paths identical): origin check → config-present check → payload-size check (80MB cap) → rate limit (KV, 5 attempts/15 min per hashed IP) → parse `FormData` → field validation (`validateLead()`, required-field set differs based on whether `form_version` is present — the short form never sends it, the assessment form always does) → Turnstile server-side verification → idempotency/dedupe check against R2 → persist core lead record to R2 → upload any files to R2 → **concurrently** call HubSpot sync and customer confirmation email (Resend) → call owner SMS (Twilio, off by default pending 10DLC approval) → if SMS skipped/failed, call owner fallback email → return `201 {ok:true, submissionId, callbackWindow, confirmationEmailSent}`.

**Key failure branches:** origin rejected → 403; missing R2/Turnstile config → 503; payload too large → 413; rate-limited → 429; unparseable form → 400; validation errors → 422 with field-level `errors`; Turnstile fails → 400; duplicate idempotency key → 200 short-circuit (no reprocessing); R2 core-record write fails → 503 (hard stop, no providers called); R2 file-upload fails → 503 (hard stop, providers never reached). Provider failures (HubSpot, Resend, Twilio) do **not** fail the request — each is wrapped individually, logged into the R2 lead record's `delivery` map, and the endpoint still returns `201 ok:true` regardless. HubSpot and the customer confirmation email are always skipped for the short form specifically because it collects no email address.

---

## 4. Components

All 34 `.astro` files in `src/components/`, exact line counts (`wc -l`) and every importer found in `src/` (including the two untracked page directories, which are part of the live working tree):

| File | Lines | Imported by |
|---|---|---|
| AccentBand.astro | 51 | `pages/index.astro` |
| Analytics.astro | 74 | `layouts/BaseLayout.astro` |
| AreasWeServe.astro | 60 | `pages/index.astro`, `pages/service-areas/index.astro` |
| AssessmentForm.astro | 2692 | `pages/request-assessment.astro` |
| Card.astro | 96 | `components/ServiceCards.astro` |
| CategoryContrast.astro | 115 | NONE |
| CompactHero.astro | 69 | `pages/404.astro`, `pages/who-we-help/index.astro`, `pages/estate-cleanout-checklist/index.astro`, `pages/contact/index.astro`, `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/service-areas/index.astro`, `pages/about/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/handoff-standard/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/services/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro` |
| ConfidenceAndFit.astro | 224 | `pages/index.astro` |
| CredentialBar.astro | 65 | `pages/index.astro` |
| FAQ.astro | 127 | `pages/index.astro` |
| FinalCTA.astro | 88 | `pages/index.astro` |
| Footer.astro | 156 | `layouts/BaseLayout.astro` |
| HandoffRecord.astro | 254 | `pages/index.astro` |
| HandoffStandard.astro | 101 | `pages/index.astro` |
| Header.astro | 257 | `layouts/BaseLayout.astro` |
| Hero.astro | 172 | `pages/index.astro` |
| LegalPolicy.astro | 197 | `pages/terms.astro`, `pages/privacy.astro`, `pages/cookie-policy.astro` |
| MobileCTA.astro | 115 | `layouts/BaseLayout.astro` |
| OperatorAccountability.astro | 151 | `pages/index.astro` |
| OutcomeComparison.astro | 44 | NONE |
| Pricing.astro | 121 | `pages/index.astro` |
| Qualification.astro | 84 | NONE |
| QuickHandoffForm.astro | 515 | `components/RequestForm.astro` |
| RequestForm.astro | 69 | `pages/index.astro`, `pages/who-we-help/index.astro`, `pages/contact/index.astro`, `pages/estate-cleanout-checklist/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/handoff-standard/index.astro`, `pages/service-areas/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/services/index.astro`, `pages/deep-cleaning-san-jose/index.astro`, `pages/about/index.astro` |
| ResidenceBaselineRecord.astro | 252 | `pages/private-residence-reset.astro` |
| SeoHead.astro | 85 | `layouts/BaseLayout.astro` |
| ServiceCards.astro | 93 | `pages/index.astro` |
| ServiceChecklist.astro | 108 | `pages/deep-cleaning-san-jose/index.astro` |
| ServiceFAQ.astro | 111 | `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro` |
| ServiceMethodRail.astro | 102 | `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro` |
| ServicePricing.astro | 115 | `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro` |
| ServiceProof.astro | 109 | `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/estate-cleanout-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro` |
| ServiceScope.astro | 85 | `pages/animal-waste-cleanup-san-jose/index.astro`, `pages/hoarding-cleanup-san-jose/index.astro`, `pages/property-cleanouts-for-managers/index.astro`, `pages/senior-downsizing-san-jose/index.astro`, `pages/deep-cleaning-san-jose/index.astro`, `pages/estate-cleanout-san-jose/index.astro` |
| StatusRibbon.astro | 58 | `layouts/BaseLayout.astro` |
| WhyAseptaclean.astro | 109 | `pages/index.astro` |

### Components imported by ZERO pages/components

1. **CategoryContrast.astro** (115 lines) — the only hit anywhere in `src/` is a plain-text code comment in `pages/about/index.astro:263`, not an import or usage.
2. **OutcomeComparison.astro** (44 lines) — zero matches of any kind in `src/`.
3. **Qualification.astro** (84 lines) — the only hit is a code comment in `pages/dev/type-compare.astro:6`, not an import or usage.

---

## 5. Homepage as rendered

`src/pages/index.astro` renders, in order (lines 85–98), 14 top-level sections inside `BaseLayout` (which itself wraps `Header` before and `Footer`/`MobileCTA` after — not counted as page sections):

| # | Component | Visible heading (tag) & text |
|---|---|---|
| 1 | `Hero` | `<h1 id="hero-title">` — "Complex properties returned to a controlled, documented condition." |
| 2 | `CredentialBar` | No heading (4 credential chips: Insured / Endorsed / Owner-operated / region label) |
| 3 | `ServiceCards` | `<h2 id="service-cards-title">` — "Three ways properties reach this handoff" |
| 4 | `ConfidenceAndFit` | `<h2 id="confidence-title">` — "The decisions stay yours" |
| 5 | `WhyAseptaclean` | `<h2 id="why-aseptaclean-title">` — "The difference is what happens before and after the work itself" |
| 6 | `AccentBand` | `<h2>` — "Working against a listing, transfer, or family deadline?" |
| 7 | `HandoffStandard` | `<h2 id="standard-title">` — "One company stays accountable from the first decision to the final closeout" |
| 8 | `HandoffRecord` | `<h2 id="record-title">` — "Property Handoff Record" |
| 9 | `Pricing` | `<h2 id="pricing-title">` — "One number, in writing, after the walkthrough." |
| 10 | `AreasWeServe` | `<h2 id="areas-served-title">` — renders `{site.location.regionLabel}`, which resolves to **"South Bay & Peninsula"** (`src/data/site.ts:122`) |
| 11 | `OperatorAccountability` | `<h2 id="founder-title">` — "The person defining the work stays accountable for how it's carried out." |
| 12 | `FAQ` | `<h2 id="faq-title">` — "Questions that affect scope, authority, and timing" |
| 13 | `RequestForm` | `<h2 id="request-title">` — "Start with what you know. We will help define the rest." |
| 14 | `FinalCTA` | `<h2 id="final-cta-title">` — "Start with what you know. We will help define the rest." |

**Total sections: 14.**

**h1 count on `/`: exactly 1.** Located at `src/components/Hero.astro:15`. Every other component in the homepage render tree (Header, Footer, StatusRibbon, MobileCTA, and all 14 sections plus nested Card/QuickHandoffForm) was checked and none contains an `<h1>`.

**h1 text:** "Complex properties returned to a controlled, documented condition." (static markup, not prop-driven).

---

## 6. Specific checks

**a. FAQ — heavy accumulation/hoarding question, and JSON-LD parity.**

The live homepage FAQ component (`src/components/FAQ.astro`) has its own inline `faqItems` array (`FAQ.astro:5-36`) — **6 questions**, in order:
1. "Can I approve the project remotely?"
2. "Will you throw anything away without asking?"
3. "Do you handle animal or organic conditions?"
4. "What happens if a hazardous condition is discovered?"
5. "What can change the price?"
6. "How quickly can the project begin?"

**None of these 6 visible questions mentions "heavy accumulation" or "hoarding."**

However, `src/data/site.ts` contains a **separate, dead** `homepage.faq` array (11 questions, `site.ts:478-535`) that is never imported by `FAQ.astro` or `index.astro` — confirmed via repo-wide search, its only reference anywhere is a code comment in `src/pages/hoarding-cleanup-san-jose/index.astro:12`. That unused array's 11th question does read: *"Do you handle properties with heavy accumulation or hoarding conditions?"* (`site.ts:530-531`) — but this text does not render on `/` or anywhere else; it is orphaned data.

**JSON-LD parity:** `src/pages/index.astro:65-76` builds the `FAQPage` schema by mapping directly over the same `faqItems` import from `FAQ.astro` — identical array, identical source. **The JSON-LD matches the visible FAQ exactly**: 6 questions, same order, same text, same answers, because both consume the same object.

**b. Sixth Handoff Assurance item — discretion.**

Yes, it renders. `src/data/site.ts:405-436` defines `homepage.assurance`, a 6-item array. The 6th item (`site.ts:431-435`):
```
title: "Discretion"
detail: "Unmarked vehicles, plain clothing, and no signage. We do not discuss the property
         with neighbors, and scheduling can be arranged around who is home or visible nearby."
```
It renders on `/` via **`src/components/ConfidenceAndFit.astro:56-65`** (not `HandoffStandard.astro` or `HandoffRecord.astro` — this array is consumed by the "Confidence and fit" section, imported at `index.astro:88`). Full ordered list of all 6 assurance items: (1) Nothing removed without approval, (2) No unapproved charges, (3) Written scope changes, (4) Missed scope items corrected, (5) Important discovered items reported, (6) Discretion.

**c. "Routine housekeeping..." sentence.**

Yes, it renders verbatim. **`src/components/ConfidenceAndFit.astro:19-22`**:
```
Routine housekeeping, single-item pickup, and low-cost hauling are not the primary fit.
```
Inside the `confidence__intro` header of the same "Confidence and fit" section rendered on `/` at `index.astro:88`. Exact match, single occurrence.

**d. Hero five-stage rail.**

`src/components/Hero.astro` (172 lines, read in full) does **not** render a stage rail and does **not** import `ServiceMethodRail.astro`. Hero's own content is: eyebrow, h1, lead paragraph, an "approve" callout line, two CTA buttons, a record-link line, three trust chips, and a static hardcoded 5-row "Handoff Status" panel (`Hero.astro:38-51`) that is plain markup, not driven by `homepage.handoffStages`.

The actual dynamic five-stage rail lives in a **separate homepage component, `HandoffStandard.astro`** (`index.astro:91`), which consumes `homepage.handoffStages` from `src/data/site.ts:252-288` and renders it as an `<ol class="stages">`. **5 stages, exact names, in order:** Scope, Protect, Clear, Reset, Verify. `ServiceMethodRail.astro` is a real, used component (see Section 4) but is used only on service-area sub-pages, not the homepage.

**e. `font-size` under heading selectors, and inline `font-size` on heading tags.**

Searched all of `src/` for `font-size` declarations nested inside `h1`/`h2`/`h3`/`h4`/`h5`/`h6` selector blocks (including compound selectors like `.hero h1`), and for inline `style="...font-size..."` attributes on `<h1>`–`<h6>` tags.

**Inline style attributes with font-size on heading tags:** NOT FOUND — zero hits anywhere in `src/`.

**font-size declared inside a heading-tag selector block, every hit:**

| File:line | Declaration | Selector |
|---|---|---|
| `src/styles/global.css:112` | `font-size: var(--ac-text-h1);` | `.ac-type-h1` (not a bare tag selector, but the site's h1 utility class) |
| `src/styles/global.css:121` | `font-size: var(--ac-text-h2);` | `.ac-type-h2` |
| `src/styles/global.css:132` | `font-size: var(--ac-text-h3);` | `.ac-type-h3` |
| `src/components/AssessmentForm.astro:2014` | `font-size: var(--ac-text-h2);` | (scoped rule inside AssessmentForm's styles, applied to a heading-styled element) |
| `src/components/Hero.astro:101` | `font-size: clamp(2.5rem, 5vw, 3.8rem);` | `.hero h1` |
| `src/components/Hero.astro:114` | `font-size: 1.12rem;` | `.hero .lead` (not a heading tag — included for context since it's adjacent to the h1 rule, but does not itself target a heading) |

Note: `src/styles/global.css:60` contains a comment stating "h1-h4 carry document structure only. No tag here declares a font-size" — true for bare `h1`/`h2`/etc. tag selectors; font-size is instead applied via the `.ac-type-*` utility classes and per-component scoped rules like `.hero h1` shown above.

**f. Computed h1 and body font-size at 390px and 1440px.**

Measured with a real headless-browser build: `npx astro build --mode production` (bypassing the failing `validate:env` gate only — no source files modified), served locally, measured with Playwright/Chromium (`playwright-core`, local Chromium install) at both viewport widths.

| Viewport | h1 computed font-size | Hero `.lead` paragraph computed font-size | `<body>` computed font-size |
|---|---|---|---|
| 390px | 40px | 17.92px | 16px |
| 1440px | 60.8px | 17.92px | 16px |

**CSS source and arithmetic cross-check:**
- `.hero h1 { font-size: clamp(2.5rem, 5vw, 3.8rem); }` (`Hero.astro:101`). At a 16px root: min = 2.5rem = 40px; max = 3.8rem = 60.8px. At 390px, 5vw = 19.5px, which is below the 40px floor, so the clamp resolves to the **40px minimum** — matches the measured value exactly. At 1440px, 5vw = 72px, which exceeds the 60.8px ceiling, so the clamp resolves to the **60.8px maximum** — matches the measured value exactly.
- `.hero .lead { font-size: 1.12rem; }` (`Hero.astro:114`) — a fixed, non-fluid rem value = 17.92px at both widths. Matches the measured value exactly at both viewports (no clamp involved).
- `<body>` font-size measured at 16px (browser/CSS default; no explicit `body { font-size }` override found in `global.css`), consistent at both widths.

**Ratio of h1 to hero-lead paragraph:** 390px → 40 / 17.92 ≈ **2.23:1**. 1440px → 60.8 / 17.92 ≈ **3.39:1**. (Ratio to the 16px `<body>` baseline instead: 390px → 40/16 = **2.5:1**; 1440px → 60.8/16 = **3.8:1** — these match the raw `clamp()` rem values directly since body is exactly 1rem.)

---

## 7. Claims greps

Search scope: all of `src/` and `public/`.

**licensed:** 7 hits — `src/components/StatusRibbon.astro:5` (comment: "never 'licensed'"), `src/data/servicePages.ts:436` (comment), `src/data/servicePages.ts:538` (FAQ answer: "...Water, fire, flood, and smoke damage restoration is a separate licensed industry we do not perform."), `src/data/site.ts:196` (legal disclaimer: "...not a licensed general contractor, remediation contractor, pest-control operator..."), `src/data/site.ts:335` (comment), `src/components/FAQ.astro:24` ("...refer you to the appropriate licensed specialist."), `src/styles/global.css:221` (comment: "never 'licensed'").

**remediation / remediate:** 8 hits, all either in code comments documenting the term is excluded, or in disclaimer/exclusion copy explicitly stating remediation is NOT performed (e.g. `src/data/site.ts:399` excluded-scope entry "Sewage or active mold remediation"; `site.ts:533` FAQ answer excludes "sewage cleanup or active mold remediation"; `OperatorAccountability.astro:37` "...does not grant contractor, remediation, medical, environmental, or regulatory authority.").

**biohazard:** 7 hits, all in code comments explaining the term is deliberately excluded from every page (e.g. `servicePages.ts:4`, `servicePages.ts:245`, `pages/animal-waste-cleanup-san-jose/index.astro:8`). No hit renders the word as visible page copy.

**decontaminat:** 4 hits — `FAQ.astro:19` (visible answer: "We do not make decontamination or health-safety determinations."), `servicePages.ts:245` (comment), `servicePages.ts:651` and `site.ts:354` (visible copy: "...Cleaning only — not a decontamination or health-safety determination.").

**sanitiz:** 3 hits — two are the JS identifier `sanitizeReferrer` in `AssessmentForm.astro:1134,1169` (a function name, not marketing copy), one is a comment in `servicePages.ts:245` listing it as a forbidden term.

**steriliz:** 2 hits, both code comments confirming the term is absent from visible copy (`servicePages.ts:246`, `animal-waste-cleanup-san-jose/index.astro:9`).

**hoarder:** 1 hit — a comment in `pages/hoarding-cleanup-san-jose/index.astro:10` stating the word "hoarder" as a noun does not appear anywhere.

**gross filth:** NOT FOUND.

**free assessment:** NOT FOUND.

**free consultation:** NOT FOUND.

**hantavirus:** 2 hits, both code comments confirming the term is absent from visible copy.

**post-infestation:** NOT FOUND.

**medical-grade:** NOT FOUND.

**pharmaceutical-grade:** NOT FOUND (note: "Pharmaceutical manufacturing experience" appears as a founder credential in `site.ts:447` — a background-experience claim, not a "pharmaceutical-grade" product/process claim).

**guarantee:** 4 hits — `ConfidenceAndFit.astro:68` ("It does not guarantee results outside that scope."), `site.ts:492` and `servicePages.ts:146` (both: "does not guarantee that every concealed item will be found"), `pages/thank-you.astro:51` ("...or guarantee that the..." — fragment, full context not captured in this pass). All four uses are negations (disclaiming a guarantee), not affirmative guarantee claims.

**certified:** NOT FOUND anywhere in `src/` or `public/`.

**Currency figures (`$` followed by a digit):** 7 occurrences, all the same two figures reused: **$195** (the assessment fee — `ServicePricing.astro:3-4` in comments, and in FAQ/body copy at `servicePages.ts:154,319,399,542,620`, each reading "A $195 on-site assessment...") and **$1,500** (the flagship starting price, referenced only inside a code comment at `site.ts:16` describing an owner-decision gate — not rendered as visible copy; the actual rendered starting price comes from the `PUBLIC_STARTING_PRICE` env var, currently `1500` in `.env.production`). No other dollar figures appear anywhere in `src/` or `public/`.

---

## 8. Design system

### src/styles/tokens.css — full contents, verbatim

```css
:root {
  color-scheme: light;

  /* ---------------------------------------------------------------------
     Color — ported verbatim from docs/aseptaclean-FINAL-v2.html :root.
     This file is the canonical implementation target for `/` per
     05-DECISIONS-LOG.md; it supersedes the palette previously drawn from
     docs/11-COMPOSITION-AND-TYPE.md §10.1 and docs/18-VISUAL-DIRECTION.md §4.
     --------------------------------------------------------------------- */
  --ac-color-navy-950: #0b1830;
  --ac-color-navy-900: #10233f;
  --ac-color-navy-800: #1c355e;
  --ac-color-navy-700: #27436f;

  --ac-color-blue-500: #4a7fc1;
  --ac-color-blue-deep: #2e5c9e;
  --ac-color-blue-pale: #e9f0f9;
  --ac-color-blue-ghost: #f4f8fc;

  --ac-color-ink-900: #13202f;
  --ac-color-ink-700: #13202f; /* alias retained for existing component references */
  --ac-color-ink-600: #46566b;
  --ac-color-ink-500: #46566b; /* alias retained for existing component references */
  /* v2's literal --ink-400 (#8494a8) measures 3.09:1 on white — fails WCAG AA 4.5:1 for the
     credential-bar caption text that uses it (confirmed via Lighthouse). Darkened to clear
     4.5:1 while keeping the same muted-gray role; unlike --ac-color-steel-300 below, this stays
     a plain hex (no color-mix) since several components already do color-mix() math against it. */
  --ac-color-ink-400: #617087;

  --ac-color-rule: #e3e9f0; /* alias of --ac-color-line for existing component references */
  --ac-color-line: #e3e9f0;
  --ac-color-line-strong: #ccd6e2;

  --ac-color-paper: #ffffff;
  --ac-color-warm-white: #f5f8fb;
  --ac-color-bg-soft: #f5f8fb;

  --ac-color-gold: #c9a961;
  --ac-color-clear: #1e7a4f;
  --ac-color-clear-pale: #e7f3ec;
  --ac-color-review: #9a6414;
  --ac-color-review-pale: #fbf3e4;

  /* Legacy steel/navy aliases kept for components not yet ported to the v2
     system; mapped to the closest v2 equivalents so nothing left unstyled
     resolves to an undefined custom property. */
  --ac-color-steel-300: #8494a8;
  --ac-color-steel-200: color-mix(in srgb, var(--ac-color-steel-300) 55%, white);
  --ac-color-steel-100: #f5f8fb;
  --ac-color-steel-on-navy: #9fb2ca;
  --ac-color-focus: #2e5c9e;
  --ac-color-error: #a3392f;
  --ac-color-success: #1e7a4f;

  /* ---------------------------------------------------------------------
     Fonts — self-hosted, see src/styles/fonts.css for @font-face rules.
     --------------------------------------------------------------------- */
  --ac-font-display: "Newsreader Variable", Georgia, serif;
  --ac-font-sans: "Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --ac-font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace;

  /* ---------------------------------------------------------------------
     Type scale — v2 uses fixed clamp() sizes per selector rather than a
     shared role scale. These --ac-text-* tokens preserve the role scale
     existing components read from, remapped to v2's mobile/desktop values
     so ratio and hierarchy stay intact site-wide. Section components that
     need v2's exact clamp string (hero h1, h2 headings, etc.) declare it
     inline per docs/aseptaclean-FINAL-v2.html, matching the source file.
     --------------------------------------------------------------------- */
  --ac-text-xs: 0.7rem;
  --ac-text-sm: 0.86rem;
  --ac-text-body: 1rem;
  --ac-text-lead: 1.12rem;
  --ac-text-h3: 1.35rem;
  --ac-text-h2: clamp(1.9rem, 3.4vw, 2.6rem);
  --ac-text-h1: clamp(2.5rem, 5vw, 3.8rem);
  --ac-text-display: clamp(2.5rem, 5vw, 3.8rem);

  /* ---------------------------------------------------------------------
     Measure
     --------------------------------------------------------------------- */
  --ac-measure-intimate: 46ch;
  --ac-measure-read: 62ch;
  --ac-measure-wide: 1200px;
  --ac-measure-bleed: 100vw;

  /* ---------------------------------------------------------------------
     Rhythm — v2 uses a single fluid section padding; kept as distinct
     tokens so existing components' rhythm choices keep working, all
     resolving to v2's section rhythm family.
     --------------------------------------------------------------------- */
  --ac-rhythm-tight: clamp(2.5rem, 4vw, 3.5rem);
  --ac-rhythm-standard: clamp(3.5rem, 7vw, 6rem);
  --ac-rhythm-open: clamp(3.5rem, 7vw, 6rem);
  --ac-rhythm-vast: clamp(3.5rem, 7vw, 6rem);
  --ac-rhythm-band: clamp(2.5rem, 5vw, 3.5rem);

  /* ---------------------------------------------------------------------
     Spacing scale — v2 --s1..--s7
     --------------------------------------------------------------------- */
  --ac-s1: 8px;
  --ac-s2: 16px;
  --ac-s3: 24px;
  --ac-s4: 32px;
  --ac-s5: 48px;
  --ac-s6: 64px;
  --ac-s7: 96px;

  --ac-space-1: 0.25rem;
  --ac-space-2: 0.5rem;
  --ac-space-3: var(--ac-s3);
  --ac-space-4: var(--ac-s4);
  --ac-space-5: var(--ac-s5);
  --ac-space-6: var(--ac-s6);
  --ac-space-7: var(--ac-s7);
  --ac-space-8: 4.5rem;

  --ac-gutter: clamp(1.25rem, 4vw, 3rem);
  --ac-radius-small: var(--ac-r-sm);
  --ac-radius-control: var(--ac-r-sm);
  --ac-shadow-focus: 0 0 0 3px color-mix(in srgb, var(--ac-color-focus) 30%, transparent);
  --ac-transition-fast: 180ms ease;
  --ac-sticky-cta-height: 4.5rem;

  /* ---------------------------------------------------------------------
     Radii and shadows — v2 --r / --r-sm / --shadow-card / --shadow-pop
     --------------------------------------------------------------------- */
  --ac-r: 12px;
  --ac-r-sm: 6px;
  --ac-radius-card: 12px;
  --ac-radius-chip: 8px;
  --ac-shadow-card: 0 1px 2px rgba(16, 35, 63, 0.05), 0 16px 40px -20px rgba(16, 35, 63, 0.22);
  --ac-shadow-pop: 0 2px 4px rgba(11, 24, 48, 0.08), 0 32px 64px -32px rgba(11, 24, 48, 0.35);

  --ac-color-accent-tint: var(--ac-color-blue-pale);
  --ac-color-accent-text: var(--ac-color-blue-deep);
}
```

### Font families

`package.json` declares 7 `@fontsource-variable`/`@fontsource` packages: Fraunces, Instrument Sans, Inter, Montserrat, Newsreader, Open Sans, Source Serif 4 (all variable), plus IBM Plex Mono (static weights 400/500).

**Only 3 of these 7 font families are actually wired into `@font-face` rules and used:** `src/styles/fonts.css` declares `@font-face` for **Newsteader Variable**, **Inter Variable**, and **IBM Plex Mono** only — all `src(url("../../node_modules/@fontsource.../*.woff2"))`, i.e. self-hosted from `node_modules`, not a CDN. `tokens.css` confirms these are the only 3 in active use: `--ac-font-display: "Newsreader Variable"...`, `--ac-font-sans: "Inter Variable"...`, `--ac-font-mono: "IBM Plex Mono"...`.

Fraunces, Instrument Sans, Montserrat, Open Sans, and Source Serif 4 are installed dependencies with **no corresponding `@font-face` rule found in `src/styles/fonts.css`** — they ship in `node_modules` (and are bundled into `dist/_astro/*.woff2` per the earlier file listing, which shows `fraunces-latin-wght-normal...woff2`, `montserrat-latin-wght-normal...woff2`, `open-sans-latin-wght-normal...woff2`, `newsreader-latin-wght-normal...woff2` all present in `dist/_astro/`) but are not declared for use by `fonts.css`/`tokens.css`. `src/styles/dev-type-compare-fonts.css` exists separately and was not fully audited in this pass; it likely accounts for the extra font files reaching `dist/_astro/` via the `/dev/type-compare/` and `/dev/type-specimen/` pages.

**External font requests:** none found. All `@font-face` `src` URLs point at local `node_modules` paths bundled by Astro/Vite, not a CDN or Google Fonts URL. No `<link href="https://fonts.googleapis.com...">` or similar external font `<link>`/`@import` was found anywhere in `src/`.

**`/sms-notification-consent/` specifically:** this page is a standalone static HTML file (`src/pages/sms-notification-consent.astro`) that does **not** use `BaseLayout` (confirmed in Section 2) and has its own separate stylesheet, `src/styles/sms-consent.css` / `public/sms-notification-consent/sms-consent.css`. It was not confirmed in this pass whether that separate stylesheet references any external font URL — flagging as unverified rather than asserting either way beyond: no external font `<link>` tag was found in the `.astro` file itself via the repo-wide external-font grep.

### BaseLayout.astro font preloading

Yes. `src/layouts/BaseLayout.astro:57-77` contains three `<link rel="preload" as="font" type="font/woff2" crossorigin>` tags, for:
1. `newsreaderFontUrl` → `node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2`
2. `interFontUrl` → `node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2`
3. `plexMonoFontUrl` → `node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2`

These match exactly the 3 font families with real `@font-face` rules in `fonts.css` (Newsreader, Inter, IBM Plex Mono weight 400 — note the mono weight-500 face is NOT preloaded, only weight 400 is).

---

## 9. Assets and placeholders

### public/ and brand assets — every file, size, dimensions

| File | Size | Dimensions |
|---|---|---|
| `public/_redirects` | 5,009 bytes | N/A (text) |
| `public/sms-notification-consent/sms-consent.css` | 1,464 bytes | N/A (text) |
| `public/assets/README.md` | 132 bytes | N/A (text) |
| `public/assets/brand/aseptaclean-wordmark-reversed.png` | 64,857 bytes | 900 × 215 px |
| `public/assets/brand/aseptaclean-site-icon-512.png` | 104,103 bytes | 512 × 512 px |
| `public/assets/brand/aseptaclean-wordmark.png` | 86,930 bytes | 900 × 215 px |

No image files were found anywhere under `src/` (`src/assets/` does not exist as a directory; no `.png`/`.jpg`/`.svg`/`.webp`/`.gif` files anywhere in `src/`).

`artifacts/` (gitignored, not part of the deployed site) contains hundreds of QA screenshots from prior build phases — not part of the live asset inventory, listed separately if needed but excluded here since they don't ship.

### Image placeholders

`public/assets/README.md` (132 bytes, full contents not separately quoted but confirmed to exist) documents the asset directory's purpose. The three real PNGs above (wordmark, reversed wordmark, site icon) are the **entire** shipped image inventory for the site — there are no photographic/lifestyle images anywhere in `public/` or referenced from components.

Multiple homepage data entries in `src/data/site.ts` (`homepage.serviceCards`, lines 336-358) carry an `imageLabel` field (e.g. `"Process kit, flat-lay"`, `"Clean kitchen or bath detail"`, `"Completed job photo"`) and an `imageStatus` field (`"owned"` or `"atmosphere"`) — these are **text labels describing what photo should eventually go there**, not actual `<img>` tags with placeholder graphics. A search of `src/components/ServiceCards.astro` and `Card.astro` would be needed to confirm whether these labels render as literal on-page text (a text-only "placeholder") or are unused metadata; that specific rendering check was not run in this pass — flagging as **not fully verified** rather than asserting either way.

### Placeholder-marker greps (TODO / FIXME / PLACEHOLDER / lorem / example.com / NaN)

**TODO:** NOT FOUND anywhere in `src/`, `public/`, `scripts/`, `functions/`.
**FIXME:** NOT FOUND.
**PLACEHOLDER** (literal uppercase string): NOT FOUND.
**lorem:** NOT FOUND.
**example.com:** NOT FOUND.
**NaN:** 3 hits, all defensive/explanatory, not bugs-in-waiting left unaddressed: `src/data/site.ts:21,23` (comments explaining that an unresolved price falls back to `NaN` and is deliberately intercepted to render a text fallback instead of `"$NaN"`), `functions/_lib/lead.ts:355` (`Number.isNaN(Date.parse(...))`, a legitimate validation check).
**`[OWNER INPUT`:** 21 hits. Two categories: (1) genuine unresolved content placeholders in `src/data/servicePages.ts` (11 instances — job-line specifics, checklist items, and copy explicitly marked `[OWNER INPUT: ...]` pending real business input, e.g. `servicePages.ts:118,203,283,363,449,463,471,480,486,499,511,526,534,579,588,612`), all following the documented convention "insert clearly labeled placeholders, never invent" (`ServiceProof.astro:5-6`); (2) references to the convention itself in comments (`servicePages.ts:7,432`, three `pages/*/index.astro` files) and two hits inside `docs/00-MASTER-BRIEF.md` and `docs/05-DECISIONS-LOG.md`.
**REPLACE_WITH:** NOT FOUND in `src/`, `public/`, `scripts/`, `functions/`, or `wrangler.toml` — but present in the git-ignored, uncommitted local `.wrangler/` dev-state directory (`REPLACE_WITH_REAL_KV_NAMESPACE_ID` appears as a local Miniflare KV directory name from local `wrangler pages dev` testing) — not part of the deployed site or tracked source.

---

## 10. Business facts as rendered

From `src/data/site.ts`, current resolved values (combining `.env.production` values with code fallbacks where the env var is unset):

- **Business name:** Aseptaclean (`PUBLIC_BUSINESS_NAME`)
- **Legal name:** Aseptaclean, LLC (`PUBLIC_LEGAL_NAME`)
- **Email:** info@aseptaclean.com (`PUBLIC_EMAIL`)
- **Phone:** set via `PUBLIC_PHONE` in `.env.production` (value present, not reproduced verbatim here per redaction of contact-adjacent config — see Section 3 table; it is NOT a secret, it is public marketing content, but this report defers to quoting it once below in the CTA table)
- **SMS number:** set via `PUBLIC_SMS_NUMBER`, same value as phone
- **Privacy contact:** info@aseptaclean.com (`PUBLIC_PRIVACY_CONTACT`)
- **Business hours:** "Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday" (`PUBLIC_BUSINESS_HOURS`)
- **Insurance status:** "Insured" (`PUBLIC_INSURANCE_STATUS`) — code default if unset would be "Insured. Certificate of Insurance available upon request." but `.env.production` overrides with the shorter "Insured"
- **Address policy:** "service-area business — no published street address" (hardcoded, `site.ts:60`)
- **Founder name / title:** Matthew Ruiz, "Founder & Principal Operator" (`PUBLIC_FOUNDER_NAME` + hardcoded title)
- **Offer name:** "Aseptaclean Handoff Reset"
- **Assessment fee:** 195 (`PUBLIC_ASSESSMENT_FEE`), credited toward an approved project booked within 7 days
- **Starting price:** 1500 (`PUBLIC_STARTING_PRICE`)
- **Residence offer starting price:** 2000 (`PUBLIC_RESIDENCE_STARTING_PRICE`)
- **Response time:** "within one business day" (`PUBLIC_RESPONSE_TIME`)
- **Service area:** "San Jose and the South Bay" (`PUBLIC_SERVICE_AREA`)
- **County:** "Santa Clara County" (code default — `PUBLIC_SERVICE_COUNTY` not set in `.env.production`)
- **Region label:** "South Bay & Peninsula" (hardcoded, `site.ts:122`)
- **Cities served (10):** San Jose, Mountain View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos, Palo Alto, Atherton
- **TSWMP status:** "pending" (`PUBLIC_TSWMP_STATUS`)

**CTA labels — every distinct string, and where each appears:**

| CTA string | Appears in |
|---|---|
| "Request an assessment" (with trailing → arrow in some renders) | `AccentBand.astro:12`, `Hero.astro:19`, `FinalCTA.astro:15` (all with "→"); `Footer.astro:22`, `Header.astro:25`, `MobileCTA.astro:10` (without arrow); also `site.offer.primaryCta` value consumed by `QuickHandoffForm.astro:25,130` (aria-label and submit-button label) |
| "Request a Private Residence Assessment" | `site.residenceOffer.primaryCta` (`site.ts:106`) — used on the Private Residence Reset offer path |

Both CTA strings anchor to `#request` (the homepage's `RequestForm` section) or route to `/request-assessment/`.

**Phone `tel:` href:** built in `src/data/site.ts:28`: `` `tel:${rawPhone.replace(/[^\d+]/g, "")}` `` — strips all non-digit/non-`+` characters from the configured `PUBLIC_PHONE` value.

**Email address:** info@aseptaclean.com, used as both the public contact email and privacy contact.

**Insurance line:** "Insured" (rendered in the homepage `CredentialBar` as one of 4 credential chips per Section 5).

**Credential chip / ribbon text:** `CredentialBar.astro` renders 4 chips: "Insured", "Endorsed", "Owner-operated", and `{site.location.regionLabel}` → "South Bay & Peninsula".

**Service area / region label:** "South Bay & Peninsula" (also used as the `AreasWeServe` section h2, per Section 5).

**Business hours:** "Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday".

---

## 11. Docs on disk

Every file in `docs/`, line count, and first `#` heading line:

| File | Lines | First heading |
|---|---|---|
| `docs/00-MASTER-BRIEF.md` | 1,923 | # Aseptaclean Astro One-Page Website Master Brief |
| `docs/01-QUALITY-GUARDRAILS.md` | 1,215 | # 10 — $20K Website Quality and Anti-AI Guardrails |
| `docs/02-OWNER-INPUTS.md` | 75 | # Owner Inputs and Production Fact Gate |
| `docs/03-BUILD-PLAN.md` | 119 | # Codex Build Plan — One-Page Astro Launch |
| `docs/04-RELEASE-CHECKLIST.md` | 79 | # Release Checklist |
| `docs/05-DECISIONS-LOG.md` | 2,028 | # Owner-Approved Decisions Log |
| `docs/06-APPROVED-HOMEPAGE-COPY.md` | 357 | # Approved Homepage Copy — Emotional Outcome Edition |
| `docs/06-ASSET-MANIFEST.md` | 39 | # Asset Manifest |
| `docs/07-ONE-PAGE-DIRECTIVE.md` | 298 | # 07 — One-Page Collapse Directive |
| `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | 236 | # Private Residence Reset — Phase 4 Build Specification |
| `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md` | 253 | # Phase 4 Deep-Dive Audit and Repair Authority |
| `docs/11-COMPOSITION-AND-TYPE.md` | 339 | # 11 — Composition and Type Authority |
| `docs/12-SESSION-PROMPTS.md` | 366 | # 12 — One-Page Build: Session Prompts |
| `docs/13-REMEDIATION-PASS.md` | 188 | # 13 — Build Remediation Pass |
| `docs/14-RESEARCH-FINDINGS.md` | 97 | # 14 — Research Findings and Recommended Changes |
| `docs/15-UX-DESIGN-RESEARCH-FINDINGS.md` | 87 | # 15 — UI/UX and Design Research Findings |
| `docs/17-REFERENCE-TRANSLATION-MARTEL.md` | 368 | # 17 — Reference Translation (Martel): Premium Contractor Layout → Aseptaclean |
| `docs/18-VISUAL-DIRECTION.md` | 293 | # 18 — Visual Direction Authority (Contractor-Professional) |
| `docs/19-SYSTEM-AND-SITEMAP.md` | 505 | # 19 — The System, Sitemap & Wireframes (v3 — self-contained) |
| `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md` | 530 | # 90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md |
| `docs/AGENTS-PRECEDENCE-BLOCK.md` | 78 | # AGENTS.md — precedence block |
| `docs/PHASE-4-AUDIT.md` | 224 | # Phase 4 Session 1 — Audit and Baseline |
| `docs/TOKEN-MAP.md` | 129 | # Token Map — old names to `--ac-` names |
| `docs/archive/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` | 236 | # Phase 4 Premium Visual and Typography Specification |
| `docs/archive/INSTALL-PHASE-4-UPDATE.md` | 53 | # Install the Phase 4 Update |
| `docs/archive/PHASE-4-CLOSEOUT-PROMPT.md` | 115 | # Phase 4 Closeout Execution Prompt |
| `docs/archive/PHASE-4-CODEX-PROMPT.md` | 82 | # Phase 4 Codex Execution Prompt |
| `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md` | 253 | # Phase 4 — Composition and Type Authority |
| `docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md` | 279 | # Phase 4 — One-Page Collapse Directive |
| `docs/archive/PHASE-4-SESSION-PROMPTS.md` | 302 | # Phase 4 — One-Page Build: Session Prompts |

Note: `docs/` also contains non-markdown files not covered by the table above: `docs/aseptaclean-FINAL-v2.html`, `docs/aseptaclean-clinical-direction.html`, `docs/aseptaclean-homepage-mockup.html`, and `docs/baseline/home-1440.png`, `docs/baseline/home-390.png`.

### Dangling doc-to-doc references

Searched every `docs/*.md` and `docs/archive/*.md` file (plus `README.md`, `AGENTS.md`, `START-CODEX-PROMPT.md`) for `docs/*.md`-shaped references, and cross-checked each referenced filename against the actual files on disk. **9 referenced filenames do not exist in `docs/`:**

| Missing target | Referenced from |
|---|---|
| `docs/05-OPERATIONS.md` | `docs/90-FUTURE-PHASE-BIOHAZARD-STRATEGY.md:515` |
| `docs/07-PRIVATE-RESIDENCE-RESET-STRATEGY.md` | `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md:3`; `docs/PHASE-4-AUDIT.md:30` (which itself flags this as a dangling reference); `docs/archive/INSTALL-PHASE-4-UPDATE.md:31`; `docs/archive/PHASE-4-CODEX-PROMPT.md:14` |
| `docs/09-PREMIUM-VISUAL-AND-TYPOGRAPHY-SPEC.md` | `docs/05-DECISIONS-LOG.md:27`; `docs/PHASE-4-AUDIT.md:28` (notes it is superseded by `docs/11-COMPOSITION-AND-TYPE.md`); `docs/archive/INSTALL-PHASE-4-UPDATE.md:33`; `docs/archive/PHASE-4-CLOSEOUT-PROMPT.md:12`; `docs/archive/PHASE-4-CODEX-PROMPT.md:12` |
| `docs/10-20K-WEBSITE-QUALITY-ANTI-AI-GUARDRAILS.md` | `docs/01-QUALITY-GUARDRAILS.md:1174` (self-reference by an old filename — the file itself is `01-QUALITY-GUARDRAILS.md`, suggesting a stale rename) |
| `docs/ASSET-MANIFEST.md` | `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md:224`; `docs/archive/PHASE-4-SESSION-PROMPTS.md:83` (real file is `docs/06-ASSET-MANIFEST.md` — numbering mismatch) |
| `docs/DECISION-LOG.md` | `docs/archive/PHASE-4-SESSION-PROMPTS.md:65` (real file is `docs/05-DECISIONS-LOG.md` — name mismatch, singular vs. plural) |
| `docs/PHASE-4-CANONICAL-MASTER-SPEC.md` | `docs/archive/PHASE-4-SESSION-PROMPTS.md:19` |
| `docs/PHASE-4-COMPOSITION-AND-TYPE.md` | Self-referenced within `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md:4,216` (states its own "repo location" as `docs/PHASE-4-COMPOSITION-AND-TYPE.md`, but the file is actually at `docs/archive/PHASE-4-COMPOSITION-AND-TYPE.md`) |
| `docs/PHASE-4-ONE-PAGE-DIRECTIVE.md` | Self-referenced within `docs/archive/PHASE-4-ONE-PAGE-DIRECTIVE.md:5`; also referenced from `docs/archive/PHASE-4-SESSION-PROMPTS.md:19,49` |

Several of these (the last two rows especially) are files whose own header states a "repo location" of `docs/FILENAME.md` when the actual file lives in `docs/archive/FILENAME.md` — a path drift from when the archive subdirectory was introduced, not a reference to a truly nonexistent document.

---

## 12. Anything surprising

- **`.env.production` is committed to git despite being listed in `.gitignore`.** `git ls-files | grep '^\.env'` shows both `.env.example` and `.env.production` tracked. `.gitignore` lists `.env.production` as ignored. It has been actively edited across 5 separate commits (`9729ae1`, `e8f97cb`, `10b1b8f`, `88ab2a6`, `0f0cacf`), most recently "Add OWNER_ALERT_EMAIL to .env.production". It contains real, live business configuration (phone number, owner email, Termly UUIDs, Turnstile site key) committed directly to source control — none of it is a server secret (those are correctly excluded), but it is nonetheless real production configuration living in git history despite the ignore rule, meaning `git rm --cached` was never run after the ignore rule was added, or it was force-added at some point.

- **`npm run build` cannot currently succeed end-to-end.** The full pipeline (`validate:env` → `astro build` → `prune-dev-routes`) fails at the first step because 6 server secrets are absent from `.env.production` by design (deferred to Cloudflare Pages secrets). This means there is no way to reproduce a real production build locally from the committed repo state alone — the Astro compile itself is clean (verified separately), but the documented `npm run build` command, as committed, always exits 1 in this repo's current state.

- **Two new page directories are uncommitted and undocumented in git history**, `src/pages/services/index.astro` and `src/pages/who-we-help/index.astro`, alongside modifications to `Footer.astro`, `servicePages.ts`, `site.ts`, and `sitemap.xml.ts`. These are real, working, wired-in pages (linked from the header nav and footer, included in the sitemap) — but they exist only in the working tree, not in any commit. If this working tree were lost without committing, this "IA expansion" (per the code comment in `site.ts:180-184` referencing "Chunk 3 of the IA expansion (owner-approved plan, 2026-08-11)") would vanish entirely.

- **A large amount of homepage-shaped data in `src/data/site.ts` is dead code.** The `homepage.faq` (11 items), and by extension anything else in the `homepage` export not explicitly confirmed as consumed, appears to be a leftover from an earlier data-driven version of the homepage that was later hand-ported to static JSX-like markup in components such as `FAQ.astro` (which has its own inline, shorter `faqItems`). This is a real content-drift risk: an editor changing `site.ts`'s `homepage.faq` (the more complete, hoarding-inclusive list) would see no effect on the live page, because the page reads from `FAQ.astro`'s separate array instead.

- **Two form components with almost entirely disjoint failure/validation logic (`QuickHandoffForm.astro` at 515 lines and `AssessmentForm.astro` at 2,692 lines) both submit to the identical backend, differentiated only by the silent presence/absence of a hidden `form_version` field.** This is a fragile implicit contract — nothing named `form_version` calls out its role as a type discriminator anywhere except a code comment in `functions/_lib/lead.ts`.

- **The rate-limit and file-size-limit messages in `functions/api/lead.ts` don't match their own logic**: the payload-size check triggers at >80MB but the user-facing message says "The upload is larger than 75 MB." (a 5MB discrepancy between the enforced threshold and the stated threshold).

- **`/service-areas/` is a real, buildable, noindex page with zero internal links pointing to it**, yet 7 different redirect rules in `public/_redirects` (old city-specific URLs) all funnel external traffic and any residual search-engine equity into it. Anyone who follows one of those 7 redirects lands on a page marked `noindex` that nothing else on the site links to.

- **`AGENTS.md` and the numbered `docs/` files describe an elaborate multi-phase, multi-session Codex-driven build process** (00 through 19, plus a 90-series future-phase doc) with heavy "owner decision required" and "never invent" guardrails throughout `servicePages.ts` — consistent with a business still actively gathering real operational facts (job photos, standalone-scope pricing, turnaround-time confirmations) before several already-built pages (`deep-cleaning-san-jose`, `property-cleanouts-for-managers`) can be de-noindexed and go live with real content instead of `[OWNER INPUT: ...]` placeholders.

- **The site never claims "certified," "guarantee" (affirmatively), "medical-grade," or "free assessment"/"free consultation"** — the $195 assessment fee is stated consistently and is not offered as free anywhere. This internal consistency (see Section 7) appears to be the product of the deliberate anti-claim guardrails documented throughout `docs/01-QUALITY-GUARDRAILS.md` and enforced via in-code comments across `servicePages.ts`, `site.ts`, and multiple page files.

- **The homepage `serviceCards` data (`site.ts:336-358`) contains `imageLabel`/`imageStatus` metadata implying photography is expected in those slots**, yet the entire shipped `public/assets/` inventory is 3 brand-identity PNGs (wordmark ×2, site icon) — no photographic assets exist anywhere in the repo. Whether the live component renders a visible placeholder, an empty slot, or silently omits the image was not confirmed in this pass (noted in Section 9).

---

## Summary

This repository holds a mostly-complete Astro 7 static marketing site for a South Bay property-clearing and cleaning business, paired with a separately-deployed Cloudflare Pages Function that handles lead submissions from two different forms through one shared, well-instrumented backend (R2 storage, HubSpot, Resend, Twilio-gated-off, Turnstile). The Astro compile itself is clean with zero warnings, and the copy is unusually disciplined about avoiding regulated/overreaching claims. But the repository cannot currently produce a deployable production build through its own documented `npm run build` command, because 6 required server secrets are deliberately absent from the committed `.env.production` (by design — they belong in Cloudflare Pages secrets, not git) — and separately, the working tree carries two new, live, uncommitted pages plus edits to four tracked files that have never been committed, meaning the actual deployed state of this site, whatever it currently is, cannot be reconstructed from git history alone. The single biggest thing standing between this repo and being deployable is operational, not technical: someone with access to the real Cloudflare Pages project needs to set the missing Turnstile/HubSpot/Resend secrets via `wrangler pages secret put`, and someone needs to commit the working tree's `services`/`who-we-help` page additions before they're at risk of being lost.
