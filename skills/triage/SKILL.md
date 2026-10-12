---
name: triage
description: Triage open GitHub issues in the current cyc-seattle repo — ensure each has an issue type and a priority label, find duplicates/overlaps, flag unclear issues, and recommend close/rescope. Use when the user asks to triage, review the issue backlog, or clean up issues.
---

# Triage Issues

Review the open issue backlog for the current repo and bring it to a consistent, actionable state. Get the repo's name with `gh repo view --json nameWithOwner --jq .nameWithOwner`.

## Steps

1. **Pull the backlog with types and labels:**
   ```sh
   gh issue list --state open --limit 100 --json number,title,issueType,labels \
     --jq 'sort_by(.number) | .[] | "\(.number)\t\(.issueType.name // "-")\t[\(.labels|map(.name)|join(","))]\t\(.title)"'
   ```
   Read the body of anything untyped, unlabeled, or ambiguous: `gh issue view <N> --json body --jq .body`.
2. **Check every issue for a type and a priority.** The type is an issue type: `Bug`, `Feature`, or `Task`. The priority is a label: `P0`–`P3`. Add whatever's missing:
   - type: `gh issue edit <N> --type "<type>"`, or the GraphQL `updateIssueIssueType` mutation if the installed `gh` has no `--type` flag
   - priority: `gh issue edit <N> --add-label "<priority>"`
3. **Find duplicates and overlaps.** Compare titles and bodies. For a true duplicate, move any unique content, then recommend closing the newer one (`gh issue close <N> --reason "not planned"`). For a partial overlap, keep both but cross-link them and clarify the boundary.
4. **Flag unclear or stale issues:** missing repro/context, a proposed solution that's now outdated, or scope that's drifted. Recommend a rescope (edit title/body) rather than silently leaving it.
5. **Assign priorities** per the rubric below for anything missing one.
6. **Summarize** as a table (number, type, priority, status/recommendation). Call out close and duplicate candidates explicitly.

## Priority rubric (P0–P3)

- **P0 — Critical:** data integrity/corruption, production broken, security-critical.
- **P1 — High:** significant bug or regular friction, no safe workaround.
- **P2 — Medium:** real improvement or bug with a workaround.
- **P3 — Low:** cleanup, docs, polish.

## What to act on vs. recommend

- **Act directly** (cheap, reversible): setting issue types, adding or adjusting labels, assigning priorities.
- **Recommend, then confirm** (content decisions): closing as a duplicate or not planned, rewriting an issue's title/body/scope. Present the recommendation and let the user approve before editing bodies or closing.

## Notes

- The standard labels are `P0`–`P3`, `epic`, `plan-review`, `dependencies`, `good first issue`, and `help wanted`. Don't invent new ones.
- Gaps in issue numbers are usually pull requests. Don't assume they are missing issues.
