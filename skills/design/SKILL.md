---
name: design
description: Plan a change before any code is written — draft it in .plans/, revise it with the user until they approve, then post it as a GitHub issue with the steps as a task list and work against it one PR per step. Use for work that needs a decision, spans packages or repos, touches infrastructure or auth, or will take more than one PR.
---

# Design a Change

Write a plan, get the user to approve it, post it as an issue, and work against it. No code is written until the user approves the plan.

Use this only for tier-3 work:

- the work needs a decision
- it spans packages or repos
- it touches infrastructure or auth
- it will take more than one PR

Most tasks do not need a plan. If the approach is obvious, go straight to `implement`.

## 1. Research the problem

Answer three questions from the actual code, not from assumption:

1. Where does this behavior live today?
2. What already exists that can be reused?
3. What breaks if this changes?

Read the repo's `AGENTS.md` first. It holds the layout, the auth model, and the pitfalls.

For a large investigation, dispatch the `designer` agent. In Claude Code it is `cyc:designer`. The agent knows the plan shape and the investigation questions. Its prompt carries only:

- the problem, in the user's own words where possible
- any constraint or preference the user has already stated
- anything already ruled out, and why

Without sub-agents, do the research yourself and follow the `designer` agent file.

Stay available while the agent works. This is the longest dispatch in the workflow.

## 2. Draft the plan

Write it to `.plans/<slug>.md`. Git ignores `.plans/`. Never commit a plan file.

Use this shape:

```markdown
## Context

<the problem and why it matters, with `path:line` references>

## Approach

<what will change, and how>

## Alternatives

- **<option>.** <why it lost>

## Steps

1. <one PR-sized step>
2. <the next step>
```

If the `designer` agent wrote the draft, read it yourself before the user sees it. You are accountable for what you put in front of them. Check these points:

- It cites real code.
- Each step is one PR and can merge on its own.
- Each open question is a real decision, not research that was skipped.

Send it back if not.

## 3. Revise until approved

Tell the user the plan is ready and give its path and a three-line summary. They review it in their agent harness and may send line comments.

A comment's line number can point at an older version of the file. Match each comment by its quoted text, not by its line number.

Ask each decision that changes the work as a direct question. Use the harness's question tool if it has one. Never bury a question in the plan or in a summary.

Edit the plan until the user approves it. Do not start implementing while questions are open.

## 4. Post the plan

Ask before posting. Then file it as an issue in the current repo. Get the repo's name with `gh repo view --json nameWithOwner --jq .nameWithOwner`.

1. Use the plan as the issue body. Write the steps as a task list (`- [ ] <step>`).
2. Pick the issue type and the priority label as `capture` describes.
3. Do not create sub-issues.
4. If the work belongs to a larger effort, link the new issue from the parent issue.

## 5. Work against the plan

- **One PR per step.** Run `implement` for the step's changes.
- **A step's PR says `Part of #N`**, not `Closes #N`. Only the last step's PR says `Closes #N`.
- **Tick a step when its PR merges**, not when it opens.
- **If a step turns out wrong, stop.** Change the plan on the issue first. Then tell the user what changed and get agreement before you continue.

## 6. Retire the plan

When the work ends:

1. Move any long-lived fact into `docs/`, a README, or `AGENTS.md`. The issue closes, so nothing that a future reader needs may live only there.
2. Delete the local draft in `.plans/`.

Closing the issue retires the plan.
