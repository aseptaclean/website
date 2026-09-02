---
name: doc-precedence
description: Resolves conflicts between Aseptaclean's specification documents using the operative precedence chain in the repository root AGENTS.md, and records every resolution in docs/05-DECISIONS-LOG.md. Use this skill the moment two documents disagree, when a document points at a file that does not exist, when you are unsure which spec governs a decision, when a document's instruction contradicts what the code actually does, or when asked which doc wins or what the current authority is. This document set has a history of one document silently overriding four higher-ranked ones through a log entry, and of a standing rule that would have deleted the only working lead endpoint, so an unresolved conflict here is a production risk rather than a filing inconvenience.
---

# Doc precedence

This repository's specifications have contradicted each other in ways that reached production
risk. The controls below exist because of specific incidents, not hypotheticals.

## The chain — owner-reconciled 2026-08-25

The operative chain lives in the repository root `AGENTS.md`. **Read it there.** The summary
below is a convenience copy and has already drifted once — treat any disagreement between it
and `AGENTS.md` as `AGENTS.md` winning, and fix this list when you find one.

1. Verified business, legal, licensing, scope, insurance, and compliance facts
2. Explicit current owner decisions
3. `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`
4. `docs/27-COPY-CANONICAL.md` only where copy is specifically locked
5. `docs/30-WEBSITE-MASTER-SPEC.md` for website strategy, customer focus, UX, UI,
   conversion architecture, responsive behavior, design system, evidence strategy, SEO
   implementation standards, and AI build rules — **the single governing website document**
6. Specialized route, city, system, voice, and quality documents where they do not conflict
   with ranks 1–5, including `docs/ASEPTACLEAN-SERVICE-LANDING-PAGE-SYSTEM.md` for
   service-page content only
7. Existing implementation and a fresh production build as evidence of current technical
   behavior, not as authority to reverse approved strategy
8. AI preference

`docs/30-WEBSITE-MASTER-SPEC-CHANGELOG.md` is historical explanation only. It cannot override
the master. Archived files, reference HTML, screenshots, mockups, past audits, filenames such
as `FINAL` or `CANONICAL`, and old root prompts do not acquire authority from their names.

**The three homepage briefs are retired — 2026-08-26.**
`ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF.md`,
`ASEPTACLEAN-CODEX-HOMEPAGE-REBUILD-BRIEF-SEVENSON.md`, and
`ASEPTACLEAN-CODEX-HOMEPAGE-BRIEF-V3-LEAN-SEVENSON.md` are historical rationale only. Doc 30 §17
is the homepage architecture. They keep their paths so `src/` comments and log entries that cite
them stay resolvable; each carries a superseded banner. The 2026-08-25 log entry that ranked the
V3 brief above doc 30 is spent — it decided a build that has shipped, and doc 30 §17 now carries
the same section order.

## Four things that make this set unusual

**Historical implementation artifacts have overridden governing documents before.** A prior
visual port changed fonts, structure, and copy while its governing documents remained live.
Current implementation now sits at rank 7: use it to establish what exists, never to reverse
an approved owner decision or the active master strategy.

**`02-OWNER-INPUTS.md` used to claim it wins over the decisions log.** The deleted one-page
directive §10 said "if they disagree, `02` wins." That is revoked, and the file carrying it no
longer exists — `02` is demonstrably stale on the primary CTA, the city list, and the region
label. A log entry records an owner decision but has no blanket rank of its own; it governs only
the scope actually decided. If you see the old rule cited, it is wrong.

**Several documents have pointed at files that do not exist.** One historical chain named
`04-CLAIMS-GUARDRAILS.md`; that file was never written, and doc 21 fills that role. If a current
document points at a missing file, report the stale pointer rather than inferring its contents.

**Technical reality and strategic authority are different questions.** A fresh build governs
claims about what currently emits. Higher-ranked documents govern what should be built next.
Do not make code changes during a documentation-only reconciliation merely because a stale
description is found.

## Procedure

1. **Name both sides precisely** — file, section, and the exact conflicting text. A conflict
   you cannot quote is usually a misreading.
2. **Rank them.** Higher wins. If they are the same rank, or one is not in the chain, escalate
   rather than picking.
3. **Ask whether the loser is describing reality or prescribing a rule.** A stale description
   gets corrected. A violated rule gets enforced. These need opposite responses and confusing
   them is how the FINAL-v2 override went unrecorded.
4. **Check whether the conflict is already resolved** in `05-DECISIONS-LOG.md` before deciding
   anything. It is 2,000 lines and it holds most of the answers.
5. **Amend the losing document.** Do not leave two live contradictory statements. A conflict
   resolved only in your head recurs next session, resolved the other way.
6. **Log it** — what conflicted, which won, why, what you changed, and anything you chose not
   to change.

## When to stop and ask

- Both sides are the same rank
- A document points at a file that does not exist
- The resolution would change a claim, a price, a credential, or a regulated-service boundary
- The resolution would delete or disable working code
- The conflict implies an owner decision was never actually made

That last one is the most common and the easiest to paper over. Several "decisions" in this
repo were recorded as pending and then built anyway. If you cannot find where a decision was
made, it probably was not.

## Report format

```
## Conflict: <one line>

A: <file §section> — "<quote>"  (rank N)
B: <file §section> — "<quote>"  (rank M)

Resolution: <which wins, and why>
Type: <stale description → corrected doc | violated rule → fixed code>
Changed: <files edited>
Logged: <the entry appended to 05-DECISIONS-LOG.md>
Not changed: <anything left, and why>
```

A conflict resolved silently is a defect even when the resolution was right — because the next
session has no way to know it was ever decided.
