---
name: doc-precedence
description: Resolves conflicts between Aseptaclean's specification documents using the operative precedence chain in the repository root AGENTS.md, and records every resolution in docs/05-DECISIONS-LOG.md. Use this skill the moment two documents disagree, when a document points at a file that does not exist, when you are unsure which spec governs a decision, when a document's instruction contradicts what the code actually does, or when asked which doc wins or what the current authority is. This document set has a history of one document silently overriding four higher-ranked ones through a log entry, and of a standing rule that would have deleted the only working lead endpoint, so an unresolved conflict here is a production risk rather than a filing inconvenience.
---

# Doc precedence

This repository's specifications have contradicted each other in ways that reached production
risk. The controls below exist because of specific incidents, not hypotheticals.

## The chain

The operative chain lives in the repository root `AGENTS.md`. Read it there rather than
memorizing it — it is the one file kept current. In summary, conflicts resolve up:

1. Current law, active insurance, verified business facts, explicit owner decisions
2. `docs/21-CLAIMS-AND-COMPLIANCE-LAW.md`
3. `docs/01-QUALITY-GUARDRAILS.md`
4. `docs/10-PHASE-4-DEEP-DIVE-REPAIR-AUDIT.md`
5. `docs/18-VISUAL-DIRECTION.md`
6. `docs/19-SYSTEM-AND-SITEMAP.md`
7. `docs/aseptaclean-FINAL-v2.html` — for `/` only, including copy
8. `docs/06-APPROVED-HOMEPAGE-COPY.md` — every route except `/`
9. `docs/11-COMPOSITION-AND-TYPE.md`
10. `docs/02-OWNER-INPUTS.md`
11. `docs/07-ONE-PAGE-DIRECTIVE.md` — §3, §6, §7, §11 only
12. `docs/08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` — its own route only

## Four things that make this set unusual

**A lower-ranked document has overridden a higher-ranked one before.** The FINAL-v2 port
changed fonts, section structure, and copy through a log entry without amending doc 10. That
is why rank 7 exists explicitly in the chain — the override was ratified rather than left
implicit. When you find yourself about to do the same thing, amend the document instead.

**`02-OWNER-INPUTS.md` used to claim it wins over the decisions log.** `07` §10 said "if they
disagree, `02` wins." That is revoked — `02` is demonstrably stale on the primary CTA, the
city list, and the region label. The log is rank 1. If you see `07` §10 cited, it is wrong.

**Several documents point at files that do not exist.** `01-QUALITY-GUARDRAILS.md`'s own
precedence block ranks itself 7th below four nonexistent files, with `04-CLAIMS-GUARDRAILS.md`
at #1. That file was never written; `21-CLAIMS-AND-COMPLIANCE-LAW.md` is it. Nine dangling
doc-to-doc references exist in total. **If a document points you at a missing file, stop and
report — do not infer what it would have said.**

**The code is ahead of the documents.** Routes, fonts, and section counts all drifted past
their specs. Where a document describes reality incorrectly, correct the document. Where a
document describes a *rule* the code violates, fix the code. Telling those two apart is the
actual judgment call, and it is worth slowing down for.

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
