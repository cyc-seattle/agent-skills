---
name: review
description: Review the session diff with the reviewer agent, which checks correctness, secrets and auth, infrastructure, tests, prose, and scope, plus the repo-specific checks in AGENTS.md. Use before opening a PR, or when the user asks for a review of the current branch.
---

# Review the Diff

Dispatch the `reviewer` agent to review everything on the session branch. It reports findings. It does not fix them.

## 1. Collect the diff

```sh
git fetch origin main
git diff origin/main...HEAD --stat
git log origin/main..HEAD --oneline
```

If the diff is empty, say so and stop.

## 2. Dispatch the reviewer

Dispatch the `reviewer` agent. In Claude Code it is `cyc:reviewer`.

The checklist lives in the agent file. The repo-specific checks come from the repo's `AGENTS.md`. Do not repeat either in the prompt. Tell the agent only:

- the branch point to diff against, normally `origin/main...HEAD`
- anything in the batch that deserves extra attention, such as a change to auth or IAM
- anything already known and deliberate, so it does not report it as a finding

The agent is read-only. It cannot fix what it finds.

Without sub-agents, review the diff yourself against the `reviewer` agent file. Do not edit while you review.

## 3. Skip it when it cannot help

**Never skip a review when the diff touches auth, IAM, secrets, or infrastructure code.**

Otherwise, skip it and say why when the whole diff is prose — markdown, comments, docs. Every item on the checklist is about code. Read the diff yourself instead.

## 4. Report

Give the user the findings grouped by severity. For each one, say whether you recommend fixing it now or capturing it as an issue.

Ask before fixing anything. The user decides. To fix, dispatch through `implement` so the fix gets its own commit.
