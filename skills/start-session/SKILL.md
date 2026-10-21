---
name: start-session
description: Open a work session — set up one worktree and one branch, then sort each request the user makes into one of three tiers and dispatch it. Stays responsive between tasks. Use when the user starts a work session, says "let's work on some things", or begins a batch of changes meant to land as one PR.
---

# Start a Session

Entry point for the workflow. A **session** is one git worktree, one branch, one batch of related work, and one pull request at the end.

Your job is to orchestrate, not to disappear into a task. The user treats this session like a browser main thread. Keep it free.

## Companion skills

Each step of the workflow is its own skill. Call them. Do not re-implement them.

| Skill               | When                                                |
| ------------------- | --------------------------------------------------- |
| `capture`           | File a GitHub issue                                 |
| `triage`            | Clean up the issue backlog                          |
| `design`            | Tier 3 — write a plan, get it approved, post it     |
| `implement`         | Tier 2 and 3 — brief and dispatch the `implementer` |
| `dispatch`          | Tier 3 — brief a worker session in another checkout |
| `review`            | Review the session diff                             |
| `end-session`       | Verify, open the PR, review, and hand off           |
| `technical-writing` | Any prose you write                                 |

Repo facts come from the repo's `AGENTS.md`: the package layout, the test pattern, and the files that must be serialized. Read it first.

## 1. Open the session

Every session runs in its own **git worktree**. The user runs sessions in parallel, and a worktree keeps them from fighting over one working tree.

Do this once, at the start.

1. **Check where you are.** Run `git status --short` and `git branch --show-current`.
   - Already in a session worktree — use it. Do not nest worktrees.
   - The tree is dirty with unrelated changes — ask the user what to do first.
   - On a branch that is not `main` in the main checkout — ask whether to continue there or open a fresh worktree.

2. **Pick a name.** Propose a short slug for the work, such as `roster-reports` or `auth-cleanup`. Fall back to `session-YYYY-MM-DD` when the session has no theme yet. Confirm it with the user.

3. **Create the worktree and the branch together**, so the branch gets a real name. Where the worktree lives is the harness's business. Use the harness's worktree action if it has one, and name the branch `session/<slug>`. Otherwise use git:

   ```sh
   git fetch origin
   git worktree add <path> -b session/<slug> origin/main
   ```

   Then work from that path.

4. **Set the worktree up** with `mise run install`. A new worktree has no dependencies and no git hooks until this runs.

5. **Start a task list.** It becomes the PR body at the end of the session.

6. Tell the user the session is open and name the worktree path. They can now describe tasks one at a time.

Never repeat this step. One worktree and one branch per session.

## 2. Sort each request into a tier

The user describes something they want. Decide how big it is **before** you touch anything. Read the relevant code first. A two-minute read prevents a wrong tier.

State the tier you chose in one line, then act. Do not ask the user to confirm the tier. If you get it wrong, change tiers mid-task and say so.

### Tier 1 — do it inline

The change is small, obvious, and local. One or two files. No design choice to make.

Examples: a typo, a rename, a wrong constant, a doc tweak, a one-line bug fix with an obvious cause.

Do it yourself, now. Run `mise run check`. Commit it. Report in two lines. A sub-agent costs more than the change.

### Tier 2 — clarify, then dispatch

The change is real work, but the approach is not in doubt. It touches one package, or several files in a clear pattern.

Examples: add a test suite for a module, fix a bug that needs a regression test, refactor a function and its callers, add a CLI flag.

1. Ask only the questions whose answers change the work. Ask them as direct questions, with the harness's question tool if it has one. A question typed into ordinary output was not asked. Zero questions is common. Cap it at one round.
2. Find the exact `path:line` anchors yourself.
3. Call `implement` to brief and dispatch the `implementer` agent.
4. Stay available while it runs.

### Tier 3 — plan first

The change needs a decision, spans packages or repos, touches infrastructure or auth, or will take more than one PR.

Examples: a new package, a schema change, an auth model change, an infrastructure change that alters topology.

1. Call `design`. It drafts a plan in `.plans/`, revises it with the user, and posts it as an issue.
2. Call `implement` for the step this session works on.

One session ships one PR, so it usually covers one plan step. The PR says `Part of #N` unless the step is the last one.

A GitHub issue is needed only for work that outlives the session or has a plan. Tier 1 and tier 2 work needs none.

## 3. Stay responsive

Dispatch sub-agents in parallel when their file sets are disjoint. Two implementers in different packages are usually safe. Serialize these:

- anything that shares a file or a package
- anything the repo's `AGENTS.md` says must be serialized

The worktree isolates this session from the user's _other_ sessions. It does not isolate your sub-agents from each other. The git index is the real shared resource. Every agent stages its own explicit paths, never `-A` or `.`, or one agent commits another's unfinished work.

The lefthook pre-commit hook only checks. It never stashes or rewrites the tree. If a commit fails the hook, run `mise run format`, then commit again.

A running sub-agent is not a reason to hold a question. If you find one that blocks a later step, ask it while the agent works. That is the cheapest moment to ask. A question saved for the end turns a decision into a fait accompli.

While a sub-agent runs, you are still free. Do this:

- Answer the user's questions, read code, and explain things.
- Plan the next task and find its anchors.
- Run read-only commands.
- Dispatch read-only research sub-agents if it helps.
- Dispatch another writing sub-agent whose files are disjoint from ones already running.

Do not do this:

- Edit a file or commit yourself. Queue that work and say it is queued.
- Dispatch a second writing sub-agent whose files overlap one already running.

When the sub-agent returns, run `git show --stat HEAD`, read the diff if it is non-trivial, and give the user a short summary. Tick the task off the list.

If the work is wrong, dispatch a follow-up or revert the commit. Do not patch it by hand.

## 4. End the session

When the user says they are done, call `end-session`.

## Guardrails

- One worktree, one branch, one PR.
- **Never deploy or run `mise run ci` while a writing sub-agent has uncommitted changes.** Both use the working tree, not `HEAD`, and would ship or test half-finished work. Wait for the agent to commit.
- **Never run bare `git stash`.** Every worktree shares one stash stack. A `git stash pop` here can swallow another session's work. Make a temporary commit instead.
- Stage explicit paths only.
- Never push to `main`. Never merge a PR. The human merges, and that merge is the approval.
- Keep each commit scoped to one task, so a bad one can be reverted on its own.
- Unrelated problems found mid-task — tell the user or run `capture`. Never widen the diff.
- If a tier-2 task turns out to need a design decision, stop it and move to tier 3.
