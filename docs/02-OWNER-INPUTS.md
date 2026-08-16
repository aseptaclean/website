# 02 — Owner Inputs and Production Fact Gate

**Corrected 2026-08-11.** Three values in the previous version were stale and this file is the
one `07` §10 told agents to cross-check against — so the stale values propagated. That
instruction is revoked (see §0).

---

## 0. Precedence

**Where this file and `05-DECISIONS-LOG.md` disagree, the decisions log wins.** It is rank 1;
this file is rank 10. `07` §10's opposite instruction — *"if they disagree, `02-OWNER-INPUTS.md`
wins"* — is **revoked** as of 2026-08-11, because this file was demonstrably the stale one on
the primary CTA, the city list, and the region label.

---

## 1. Approved for the current build

| Fact | Value |
| --- | --- |
| Public brand | Aseptaclean |
| Legal entity | Aseptaclean, LLC |
| Founder | Matthew Ruiz |
| Founder title | Founder & Principal Operator |
| Website | `https://aseptaclean.com` |
| Public email | `info@aseptaclean.com` — **final inbox test still required** |
| Public phone and SMS | `(408) 785-7588` · `tel:+14087857588` · `sms:+14087857588` |
| Business hours | Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday |
| Address policy | Service-area business. **No published street address, ever.** |
| Region label | **South Bay & Peninsula** |
| Cities served (10) | San Jose, Mountain View, Sunnyvale, Santa Clara, Campbell, Los Altos, Los Altos Hills, Los Gatos, Palo Alto, Atherton |
| Flagship offer | Aseptaclean Handoff Reset |
| Category | Whole-property clearing, deep cleaning, and documented closeout |
| Lead offer | Property Handoff Plan |
| **Primary CTA** | **Request an assessment** |
| Secondary CTA | Text a photo |
| Response commitment | Within one business day |
| Callback standard | Owner calls within 5 minutes during published hours; next business window otherwise |
| On-site assessment | **$195**, credited toward an approved project booked within 7 days |
| Published starting price | **None.** See §2. |
| Insurance line | Insured. Certificate of Insurance available upon request. |
| Endorsement | Organic Pathogen Endorsed — **cleaning language only** |
| TSWMP | Pending / unverified. Never published in any form. |
| Environmental remediation | Not offered. Absent from the live site entirely — not even "coming soon." |
| Launch proof state | No reviews, no case studies, no completed-project portfolio, no before/after |

### Corrected from the previous version

| Field | Was | Now | Authority |
| --- | --- | --- | --- |
| Primary CTA | `Get My 24-Hour Handoff Plan` | `Request an assessment` | Decisions log, 2026-08-09 |
| Cities | 5-city list | 10-city list | Decisions log, 2026-08-09 |
| Region | `Santa Clara County` | `South Bay & Peninsula` | Decisions log, 2026-08-09 — Atherton is San Mateo County |
| Lead offer | `24-Hour Property Handoff Plan` | `Property Handoff Plan` | Decisions log, 2026-08-16 — "24-Hour" read as a literal turnaround promise the business-day response commitment can't always honor |

Note: `PUBLIC_SERVICE_COUNTY` is unset in `.env.production`, so `site.ts` falls back to a
hardcoded `"Santa Clara County"`. Find every surface where that string renders and confirm none
contradicts the region label.

---

## 2. Pricing — owner decision, 2026-08-11

**No price figure is published anywhere on the site.** Rationale: with zero reviews and zero
documented project proof, a published floor invites price shoppers and undercuts the
positioning.

This closes the long-open `07` §5 decision.

- The **$195 assessment fee stays published.** It is real, fixed, defensible, and it is the
  only figure on the site.
- The pricing section keeps the **cost drivers** — property size and access, volume of approved
  contents, sorting and review required, cleaning condition, disposal requirements, labor and
  schedule, concealed conditions — and routes to the assessment. Silence is weaker than
  transparency about what moves the number.
- `/private-residence-reset/`'s `$2,000` anchor is removed under the same rule.
- `PUBLIC_STARTING_PRICE` and `PUBLIC_RESIDENCE_STARTING_PRICE` are still set in
  `.env.production`. Trace every consumer; if nothing renders them, delete the variables and
  their `validate-env` gates. A gate on a value nothing consumes is worse than no gate.
- Revisit at ≥5 completed projects with photographs and ≥5 Google reviews.

---

## 3. Founder credentials — approved for careful public framing

- BS Biochemistry, University of California, Riverside
- Prior pharmaceutical manufacturing experience
- Prior histology and surgical pathology experience
- Experience in procedure-driven, documentation-sensitive environments
- Direct involvement in scope review, planning, communication, and operating oversight

**Hard limit, verbatim wherever the background appears:**

> This background reflects controlled-process discipline. It does not grant contractor,
> remediation, medical, environmental, or regulatory authority.

Never `medical-grade`, `pharmaceutical-grade`, `hospital-grade`, or `certified remediation`.

---

## 4. Suppression rules — all six absolute

1. If insurance wording is unverified, suppress the insurance trust statement.
2. If a social account is inactive, omit it.
3. Never render an empty phone link.
4. Never show a success state against a non-working endpoint.
5. Never expose a placeholder in a production build.
6. Never infer a physical office from service-area coverage.

---

## 5. Must be confirmed before production release

- [ ] `info@aseptaclean.com` inbox test
- [ ] Insurance wording matched to the current COI
- [ ] Organic pathogen endorsement matched to the current COI
- [ ] The six Cloudflare Pages secrets set via `wrangler pages secret put` — `TURNSTILE_SECRET_KEY`,
      `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_PIPELINE_ID`, `HUBSPOT_DEAL_STAGE_ID`, `RESEND_API_KEY`,
      `EMAIL_FROM_ADDRESS`
- [ ] Resend DNS — SPF, DKIM, DMARC all showing Verified, not merely added
- [ ] Five real-credential lead sends, end to end
- [ ] Google Business Profile URL and primary category — **category still unrecorded**
- [ ] Analytics IDs and consent configuration
- [ ] Any business-license wording displayed publicly

### Deferred, not launch blockers

Public mailing address — **do not publish one.** Public business-license number — **do not
imply contractor licensure.** Active social URLs. SMS lead alerts, gated behind
`SMS_ALERTS_ENABLED` pending 10DLC approval; email-only is the intended launch configuration.

---

## 6. Brand assets

Owner-supplied 2026-07-30 and in production: horizontal wordmark, reversed wordmark, 512px
site icon. **Founder portrait not yet supplied** — the page shows a plain bordered placeholder,
never a stock or AI-generated image. Six image slots remain unfilled; four cannot be filled by
purchase and gate on the Phase 0 shoot. See `06-ASSET-MANIFEST.md`.

---

## 7. Open verification items with legal consequence

From `21-CLAIMS-AND-COMPLIANCE-LAW.md` §7. Each blocks the corresponding copy.

| Item | Blocks | Ask |
| --- | --- | --- |
| SJMC §9.10.020 definition of "collect" | Confirms the whole labor-only disposal position | San José ESD |
| SPCB scope boundary for post-pest cleaning | `/animal-waste-cleanup-san-jose/` launch | California counsel |
| Contractor delivery of a resident's HHW | Any HHW language in a scope of work | Santa Clara County HHW |
| PAMC 5.20.040(b) — "receive, collect, remove" | **Any Palo Alto work or location page** | Palo Alto Public Works |

Palo Alto is on the 10-city list. Its location page does not ship until item 4 clears.
