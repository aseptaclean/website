---
name: claims-check
description: Verifies Aseptaclean public-facing copy against the regulated-service claims law in docs/21-CLAIMS-AND-COMPLIANCE-LAW.md. Use this skill whenever you write, edit, or review ANY string a visitor could read — page copy, headings, meta titles and descriptions, alt text, JSON-LD, form labels and helper text, confirmation emails, SMS templates, the answering-service script, referral letters, or Google Business Profile fields — and before any commit that touches src/data/site.ts, src/data/servicePages.ts, or any .astro file under src/pages or src/components. Also use it when asked to run a claims sweep, a compliance check, a pre-launch copy review, or to check whether a phrase is safe to publish. This business operates under real statutory constraints where an unlawful sentence is a regulatory exposure, not a style problem, so run it even when the change seems small.
---

# Claims check

Aseptaclean is a property clearing and cleaning company operating inside three hard legal
boundaries: it is not a licensed contractor, it is not a licensed structural pest control
operator, and it is not a registered trauma scene waste practitioner. California **B&P §8550(a)**
makes it unlawful to *advertise* structural pest control unlicensed — which means page copy
itself is the regulated surface, not just the work. A sentence that overclaims here is a legal
exposure, not a tone problem.

The authority is `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`. Read it before judging any borderline
string. This skill is the procedure for applying it.

## What makes this repo unusual

The existing copy is already disciplined — audits found zero instances of `certified`,
`free assessment`, `gross filth`, `post-infestation`, `hantavirus`, or an affirmative
guarantee. Every hit for a banned word is either a code comment enforcing its absence or a
disclaimer using it to narrow scope.

**That means your default assumption should be that an existing string is deliberate.** The
common failure mode here is not missing a violation; it is "fixing" a correct disclaimer or
stripping a comment that documents why a word is absent. When you find a banned word, your
first question is *is this a claim or a negation?* — not *how do I remove it?*

## Procedure

**1. Identify the surface.** List every string your change adds or modifies that a visitor,
a crawler, or a carrier reviewer could read. Include JSON-LD and meta tags — those are public.

**2. Apply the three questions to each.**
- Is it true *today*? Not planned, not pending, not "essentially."
- Is it inside the active insurance policy's covered operations?
- Does the wording imply a credential, license, or capability not currently held?

Any "no" and the string does not ship. There is no version of this where an unverified claim
ships behind a hedge.

**3. Grep for the banned vocabulary** across the files you touched:

```
licensed · certified · remediation · remediate · biohazard · decontaminat ·
sanitiz · steriliz · clearance · habitable · medical-grade · pharmaceutical-grade ·
hoarder · gross filth · free assessment · free consultation · hantavirus · post-infestation
```

For each hit, classify it before acting:

| Classification | Example | Action |
| --- | --- | --- |
| Code comment enforcing absence | `// never "licensed"` | Leave it. It is the control. |
| Disclaimer narrowing scope | "...not a licensed general contractor, remediation contractor, pest-control operator..." | Leave it. This is the one legitimate use. |
| Affirmative claim | "certified technicians" | Remove. Report it. |
| Ambiguous | "restoration" | Check context — finish restoration through cleaning is permitted; water/fire/smoke damage restoration is a different licensed industry and never appears. |

**4. Check the two mandatory verbatim clauses.** These are not paraphrasable. A prior pass
silently dropped a word from the first one and it took an audit to catch.

Wherever animal or organic work is described:
> Cleaning only — not a decontamination, sterilization, or health-safety determination.

Wherever the founder's background appears:
> This background reflects controlled-process discipline. It does not grant contractor,
> remediation, medical, environmental, or regulatory authority.

**5. Check the structural prohibitions.** No fabricated review, rating, testimonial, project
count, years-in-business figure, case study, client logo, badge, statistic, or before/after
image. No stat bar of any kind. No stock or AI-generated crews, properties, or documents. No
human biohazard service in any form. No pest inspection, identification, exclusion, or
treatment implied. No hauling, transport, or disposal implied as self-performed — disposal is
described only as "handled by a City-authorized hauler engaged for the project." No price
figure other than the $195 assessment fee.

**6. Check for placeholders reaching a public surface.** `[OWNER INPUT:`, `REPLACE_WITH`,
`$NaN`, empty required values. On a noindex draft these are acceptable and documented; on
anything indexable or linked from an indexable hub they are not.

## Report format

Report only what you found and what you did. Do not restate the rules back.

```
## Claims check — <what changed>

Surfaces reviewed: <count> strings across <files>

### Violations found
<file:line> — <the exact string>
  Why: <which rule>
  Fix: <what you changed, or "needs owner decision because...">

### Left deliberately
<file:line> — <string> — <why this is a negation or a comment, not a claim>

### Needs an owner call
<anything you could not resolve without a business fact you do not have>
```

If nothing failed, say so in one line. A clean check is a real result and does not need padding.

## When to escalate rather than fix

Four things require external confirmation and must not be resolved by editing copy:

- Anything about Palo Alto service — PAMC 5.20.040(b) reaches labor-only companies and is
  unconfirmed
- Anything asserting the SPCB boundary in a new way
- Any household hazardous waste removal promise
- Any insurance or endorsement wording not already matched to the current COI

Flag these and stop. Guessing at a legal boundary in copy is the failure this whole document
set exists to prevent.
