---
name: capture
description: Capture a new GitHub issue in the current cyc-seattle repo with the correct issue type, priority, and a clear Problem/Fix body. Use when the user wants to file an issue, log a bug, or record a TODO ("capture this", "file an issue", "make an issue for X").
---

# Capture an Issue

Turn a problem — from the current conversation or the user's description — into a well-formed GitHub issue in the current repo. Get its name with `gh repo view --json nameWithOwner --jq .nameWithOwner`.

## When to file one

File an issue when the work will outlive the current session:

- a problem found mid-task that you are deliberately not fixing now
- a known defect with no owner
- work that needs to be scheduled
- work that needs a plan. The plan is the issue body.

Do **not** file an issue for a small change you make in this session. The session's pull request records it.

## Steps

1. **Gather the problem.** Pull details from the conversation or ask the user. A good issue needs: what's wrong or wanted, where in the code (`path:line`), and why it matters.
2. **Check for duplicates first.** `gh issue list --state open --limit 100 --json number,title,issueType,labels`. If it overlaps an existing issue, tell the user. Offer to comment on or rescope that issue instead of filing a duplicate.
3. **Pick an issue type:** `Bug`, `Feature`, or `Task`.
4. **Pick a priority label** using the rubric below.
5. **Write the body** using the template below. Reference concrete files as `path:line`.
6. **Create it:** `gh issue create --title "<imperative title>" --type "<type>" --label "<priority>" --body "$(cat <<'EOF' ... EOF)"`. If the installed `gh` has no `--type` flag, create the issue without it. Then set the type with the GraphQL `updateIssueIssueType` mutation.
7. **Report** the issue number and URL back to the user.

## Priority rubric (P0–P3)

- **P0 — Critical:** data integrity/corruption, production broken, or a security-critical hole. Work starts immediately.
- **P1 — High:** a significant bug or friction the user hits regularly, with no safe workaround (e.g. auth/tooling breakage).
- **P2 — Medium:** a real improvement or a bug with a workaround (added tests, hardening, moderate bugs).
- **P3 — Low:** cleanup, docs, polish, low-risk nice-to-haves.

## Body template

Keep it tight. Use `## Problem` always. Then use `## Fix` for a bug, or `## Proposed changes` / `## Scope` for a feature or task. Add `## Impact` when the "why" isn't obvious.

```markdown
## Problem

<what's wrong/wanted, with `path:line` references and a code snippet if useful>

## Fix

<concrete change; mention adding a regression test for bugs>

## Impact

<why it matters — omit if self-evident>
```

## Conventions

- **Title:** short, imperative, no priority prefix (priority lives in the label). e.g. "safeCall retries non-retryable errors with a 60s delay".
- **Labels:** `P0`–`P3`, `epic`, `plan-review`, `dependencies`, `good first issue`, and `help wanted` already exist. Don't invent new ones without asking.
- For bugs, always note that the fix should include a regression test. The repo's `AGENTS.md` says where tests live.
- Cross-link related issues with `#N` and note dependencies ("land #47 first").
