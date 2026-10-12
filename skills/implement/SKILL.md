---
name: implement
description: Brief and dispatch the implementer agent to make one scoped code change on the current branch, then review what it did. Use for any task too large to do inline, and for each step of an approved plan.
---

# Implement a Task

Hand one scoped change to the `implementer` agent. The agent edits, verifies, and commits. You review the result.

The agent starts cold. It knows nothing about the session, the previous tasks, or the conversation. Everything it needs goes in the brief.

## 1. Prepare the brief

Find the exact `path:line` anchors yourself before you write the brief. A brief that names a file and a line is worth far more than one that describes a symptom.

## 2. Dispatch

Dispatch the `implementer` agent. In Claude Code it is `cyc:implementer`.

The agent already knows the conventions, the mise tasks, and the git rules from its agent file. It reads the repo's `AGENTS.md` for the layout and the test pattern. Do not repeat any of that. The brief carries only what is specific to this task:

**Task.** What to change, concretely, with `path:line` anchors.

**Scope fence.** The exact boundary of this change. Name anything adjacent it must not touch.

**Context it cannot derive.** A decision already made, a constraint from the plan, a reason the obvious approach is wrong. If a plan issue covers this step, give the issue number and the step.

**Never ask for a comment.** Give the agent the constraint and let the comment rule in `AGENTS.md` decide whether it earns a comment. A brief that says "leave a comment explaining why" overrides that rule, and the agent writes five lines where none were needed.

**Acceptance.** How to know the change worked — the behavior that should differ, or the test that should now pass.

Without sub-agents, make the change yourself and follow the `implementer` agent file. Keep the same scope fence and the same single commit.

## 3. Review the result

1. Run `git show --stat HEAD`. Read the full diff if the change is non-trivial.
2. Check that the diff stayed inside the scope fence.
3. Summarize for the user in two or three lines: what changed, whether the checks passed, and anything the agent flagged.

If the work is wrong or too wide, dispatch a follow-up or run `git revert`. Do not patch it by hand. That defeats the point of delegating.

## Rules

- Dispatch agents in parallel only when their file sets are disjoint. Serialize anything that shares a file or a package, and anything `AGENTS.md` says must be serialized.
- Every agent stages explicit paths, never `-A` or `.`. The git index is shared, and a sweep commits another agent's unfinished work.
- One commit per task. A bad task can then be reverted without unpicking the batch.
- If the agent reports the task is bigger than described, stop and move it to `design`.
- If `mise run check` or `mise run test` does not pass after two honest attempts, stop and ask the user.
