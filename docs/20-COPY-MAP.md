# Copy source, exact display changes, and placement

Main source: aseptaclean-all-website-copy.md, unchanged from the supplied file. Supplemental trauma source: aseptaclean-crime-scene-trauma-cleanup.md, also unchanged. Do not use embedded copy in archived build specifications to overrule these files.

## Explicit display transformations

| Source/UI role | Current rendered treatment | Limit |
| --- | --- | --- |
| Request an Assessment / Request a Private Assessment / Tell Us About the Property used as a marketing action link | Call Aseptaclean → central tel link | Applies to marketing action controls, not arbitrary explanatory sentences. |
| Request an Assessment used as form submit | Send Message → existing form submission | Preserve backend/CRM/action identifiers and consent. |
| Secondary message action | Send a Message | Scroll/focus local form or /contact/#contact-form. |
| Source page/service label Severe Property Cleanup | Extreme Cleaning | Apply to page title/eyebrow, navigation, card title, form option label, and service-name references. Preserve existing route/internal enum. |
| Terms page label | Terms and Conditions | Preserve policy/provider text. |
| Contact H1 | Contact Aseptaclean | Current UI adaptation supporting the owner's call-first instruction. |
| Generic form heading | Tell us about the property. | Source wording from the main assessment block. |
| Homepage hero eyebrow / shared brand descriptor | Biohazard Remediation & Specialty Property Cleanup | Owner-authorized replacement for the standalone Specialty Property Cleanup descriptor; preserve homepage main H1 and individual service names. **Published under the owner override below — read it before changing this row.** |
| Main services hub H1 | Biohazard Remediation & Specialty Property Cleanup | Owner-authorized display transformation of the source Services heading; navigation label stays Services. The source heading "When the property needs more than a normal cleaning company." is preserved as the hub's outcome subheading, not deleted. |

### OWNER OVERRIDE, 2026-09-04: the version 1.1 descriptor “Biohazard Remediation & Specialty Property Cleanup” **is published**

**Status: PUBLISHED on `/` (hero eyebrow) and `/services/` (H1). Do not revert without the owner.**

This descriptor was applied, auto-reverted once, escalated, and then **explicitly re-authorized by the owner on 2026-09-04** with the conflict below stated in full. It now ships. An agent that re-reads only the claims documents will conclude this string is illegal and remove it — that has already happened once. It is a recorded, owner-accepted exception, not an oversight.

**The conflict the owner overrode.** The descriptor fails these authorities on their plain text:

- `AGENTS.md` §7 — “No `remediation`, `biohazard`, `decontamination`, `sanitization`, `sterilization` as a service claim.” The one scoped exception is `/crime-scene-trauma-cleanup-san-jose/` for the trauma source's factual waste-pathway wording only, and it states that `remediation` “stay[s] forbidden everywhere, **including that page**.” The descriptor uses both banned words, on `/` and `/services/`, which are outside that exception.
- `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md` §2.1 (never state or imply Aseptaclean “performs **remediation**, **biohazard** … work”), §2.2 (both words banned as service claims; permitted only inside a scope-narrowing negation), and §5 — TSW #933 “authorizes **one registered scope**, not `remediation`, `decontamination`, contractor work, or an **unlimited biohazard service family**.”
- Rank 1 in the `AGENTS.md` §1 chain — verified licensing and scope facts. The business is not a remediation contractor, and `legal.scopeDisclaimer` says so in the footer of every page. Shipping the descriptor would put “Biohazard Remediation” in the hero and “not a … remediation contractor” in the footer of the same page.

The CSS profile could not carry this change on its own authority: its own “Authority and scope” section says it “does not authorize new claims, changed services, rewritten policies or deployment,” and it sits below doc 21 in the chain.

**What resolved it.** Per `.claude/skills/claims-check` and `.claude/skills/doc-precedence`, a regulated-service boundary is escalated, never settled by editing copy. It was escalated on 2026-09-04 with all three objections above quoted verbatim, including the fact that the footer of the same page reads “not a … remediation contractor.” The owner directed that the descriptor publish as specified. That is a **rank 2 explicit current owner decision**, which outranks doc 21 at rank 3, so the descriptor now has the authority the profile alone lacked.

**Scope of the override — this is narrow.** It covers this one descriptor string in exactly three display roles: the homepage hero eyebrow, the Services hub H1, and the shared brand descriptor. It does **not** relax `AGENTS.md` §7 or doc 21 §2.2 for any other string. `remediation`, `biohazard`, `decontamination`, `sanitization` and `sterilization` remain banned as service claims everywhere else on the site, and no new service, credential or capability is claimed by this label.

**Deliberately not changed.** SEO `<title>` strings (“Specialty Property Cleanup in San Jose | Aseptaclean”, “Specialty Property Cleanup Services | San Jose | Aseptaclean”) were never in the patch's scope and are unchanged — the profile's audit target is the display label, and it warns against “a blanket text replacement across source prose.” `docs/aseptaclean-all-website-copy.md` keeps its bytes. `legal.scopeDisclaimer` is unchanged and still renders in the footer; the owner accepted that tension knowingly.

**Standing risk note, recorded not resolved.** Cal. B&P §8550(a) makes advertising a regulated service you are not licensed for an exposure in itself, and doc 21 §5 states TSW #933 authorizes “one registered scope,” not an unlimited biohazard service family. This override does not make that concern false — it records that the owner accepted it. If insurance or registration scope is ever reviewed, this string is the first one to re-check. Logged in `docs/05-CURRENT-DECISIONS.md`, 2026-09-04.

A normal sentence about reviewing a property or approving an assessment remains meaningful and must not be mechanically replaced with “call.” Consent/provider text is not transformed by this table. Preserve working Send Photos actions only where a real destination exists.

## Placement rules

Each brief names source headings. Read the entire named source section, including nested lists and FAQ answers. Render every selected sentence verbatim, changing only authorized labels, HTML escaping, heading semantics, and whitespace. Do not turn every markdown # into an HTML H1. Service page name is H1; source outcome line can be a subheading. Homepage's source main promise is its H1.

Hero copy must be compact. For each service, put the source page name, its first outcome subheading, and the first two prose paragraphs in the hero; move the remaining opening paragraphs into the first white introduction directly below. Preserve the remaining text there, rather than shrinking the entire page introduction into the hero. Telephone and form actions use the table above. Trauma uses its source page name, “Professional cleanup after a traumatic event.”, and first opening paragraph in the hero, with the rest immediately below.

Source-derived copy must not become verified proof simply by placement. Apply 02-CURRENT-FACTS.md to insurance, service coverage, timing, and regulated-scope claims. Keep a trace of any fact-dependent line withheld and its concrete reason.

## Homepage selection (explicit editorial consolidation)

Use these whole source sections: hero; What are you dealing with?; Some properties need more than cleaning.; You should know what you are paying us to solve.; How it starts; Why Aseptaclean; Frequently Asked Questions; final “You do not need to know exactly what kind of cleanup you need.”

Do not render these as additional homepage sections: Show us the condition first.; We do not pretend every problem belongs to us.; Real trust starts with clear expectations.; Who calls Aseptaclean?; What affects the cost? Their original text remains in the main source. Scope/process/cost detail remains on the service and hub pages. This is an explicit placement proposal in this consolidated build package, not a rewrite of the source.

For service cards, use the corresponding Services block's service name and first two prose paragraphs after its descriptive subheading. Use the following precise trauma routing excerpt from the trauma source hero: “Professional cleanup after a traumatic event.” Link the card to the existing trauma route. Do not invent a broader homepage service claim from the archived standalone file.

Within “What are you dealing with?”, retain the introductory sentences above the grid; the service descriptions are represented by the specified card excerpts instead of a second duplicate set of service blocks. Public service order follows SITEMAP-MASTER.md. Use the hub service block as source for a longer service row on /services/.

The homepage process source has five steps; keep five. Do not silently combine them into four because an old design demanded four. The verified service-area section is supplemental company data, not a fabricated source paragraph. Keep source wording for the region label where current verified data agrees.

## Other main service and hub pages

Retain all substantive source blocks on the five service pages and the Services hub, grouping related paragraphs into the components in the briefs. FAQ-like questions can become accordions; lists remain lists. Do not add five redundant page-level final CTAs just because bold source actions occur repeatedly. Apply one contextual call action where appropriate and a final call section; the action hierarchy is sitewide.

Services gains one trauma row from the trauma hero and “Crime Scene & Trauma Cleanup Services” block. The five-card/row architecture changes the former four-service presentation explicitly. Do not expand the standalone trauma subservices into additional routes.

## About and Contact supplemental content

The main source has no dedicated About/Contact pages. First read actual current repository content. The supplied archived snapshot is preserved separately as reference/company-page-snapshot.md for comparison only. Prefer the main Homepage → Why Aseptaclean for current founder-introduction wording, and use current dedicated About copy for the founder's name, real background, and operating principles. If the repository differs, do not silently resurrect historical guarantees, exclusions, or service claims.

About source map: Homepage → Why Aseptaclean, plus actual About page → Founder & Principal Operator and Operating principles. Preserve the background qualification where currently required. The real portrait is an asset, not an inferred detail. Omit archived links to /handoff-standard/ unless that route is deliberately retained and valid in the current navigation plan.

Contact source map: current contact values + main Request an Assessment → Show us what is happening.; Tell us about the property; Photos help us understand the property faster.; What happens next? Use the compact form contract, not every question in the long source questionnaire. Keep any existing longer assessment flow as its utility route.

## Legal copy

Actual Privacy, Terms, and Cookie documents come from the current policy provider. The supplied snapshots contain wrappers only. This package does not supply or pretend to approve policy bodies. Build the requested page shells and preserve the provider content and preference controls. Do not fill a missing policy with marketing prose.

## Copy trace

In the implementation report, record page → rendered component → source file/heading → exact excerpt boundaries → any display transformation. Every visible marketing sentence must resolve to a named source or the explicit UI-string table above. Existing legal/consent strings resolve to the actual provider/application source. A stale copy validator should be updated to reflect this documented map; do not disable it or report its old failures as a pass.
