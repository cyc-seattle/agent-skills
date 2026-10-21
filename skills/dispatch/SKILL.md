---
name: dispatch
description: Brief and dispatch an implementation worker — a separate agent session that works in its own checkout and opens its own PR. Settle the features and the open decisions with the maintainer first, then fill in the worker-brief template. Use when a coordinator hands a plan step to another agent session, not a sub-agent in the same session.
---

# Dispatch a Worker

Hand one plan step to a **worker**: a separate agent session with its own checkout. The worker branches, commits, pushes, and opens a PR. The coordinator verifies the work, and the maintainer merges it.

For a sub-agent that commits on the current branch, use `implement` instead.

The worker starts cold. It knows nothing about the conversation, the plan's history, or the other workers. Everything it needs goes in the brief.

## Coordinator checklist

1. **Settle the features and the decisions first.** Agree the `.feature` files and every open question with the maintainer. If a decision is still open, ask it, and do not dispatch. A question settled after dispatch costs a second PR.
2. **One repo per worker.** No two workers share a checkout. Two workers in one checkout fight over the branch, the index, and the working tree.
3. **Fill in every section of the brief.** Write "None" in a section that has nothing in it, so the worker knows it was not forgotten.
4. **Verify the work before merge.** Read the diff. Check that every required check passed. Run the prod preview if the change touches prod. Only then ask the maintainer to merge.

## The brief

Copy this template. Replace each `<...>` with the task's details. Keep the standard constraints and reporting rules as they are, and add to them only what this task needs.

```markdown
# <Worker name>: <one-line summary of the change>

Part of <owner/repo#N>, step <M>.

## Target

- **Repo:** <path to the checkout, and owner/repo>
- **Branch:** start from an up-to-date `main`, on a new branch named `<branch>`.
- **PR:** <a new PR, or the existing PR to update>
- **Environment:** <dev, or none>. Never prod.

Read the plan issue first. Then read the `AGENTS.md` of each repo you touch.

## Already decided

- <the spec, or the plan step, with links>
- <the `.feature` files agreed with the maintainer, by path>
- <each decision already made, and the reason the obvious alternative lost>

Do not reopen these. If the code contradicts one, stop and ask.

## Decisions needed

None. <The coordinator settles every open question before dispatch. If this section is not "None", do not start. Ask the coordinator.>

## Change

1. <a concrete step, with `path:line` anchors>
2. <the next step>

Stay inside these steps. Report anything else you find. Do not fix it.

## Constraints

- Never touch prod. Never run a prod deploy, a prod preview, or a prod command.
- Start no long-lived process. Stop every process you start before you finish.
- Put a timeout on any command that might hang.
- Never switch the machine's kube context. Pass `--context` to every `kubectl` command, or use a private `KUBECONFIG`.
- Never drop or recreate dev's Directus database, and never change its `PUBLIC_URL`. Each new instance spends one of the license's activations. <Delete this line if the task does not touch Directus.>
- <any constraint specific to this task>

## Reporting rules

- Report done as soon as the PR is green. Do not merge it.
- Never wait on a scheduled run. Report, and name the run that is still to come.
- If you are blocked, ask the coordinator. Wait for the answer as long as it takes. Never give up because a question is unanswered.
- Before you report done, check for stray processes that you started, and stop them.

## Acceptance

Put this evidence in the done report:

- <the PR URL>
- <the URL of each CI run, and its result>
- <the behavior to show, or the test that must now pass>
- confirmation that no stray process is left running
```

## Rules

- Never dispatch with an open decision. Ask it first.
- Never dispatch two workers into one checkout.
- Name each step's issue in the brief, so the worker's PR can link it.
- If a worker reports the step is bigger than the brief describes, stop. Change the plan on the issue, and get the maintainer's agreement before you dispatch again.

## Orca

In Orca, the worker reports through `orca orchestration` instead of chat. Add this section to the brief, after "Reporting rules":

```markdown
## Orca

- Report done once with `orca orchestration send --type worker_done`, with the PR and run URLs in the body.
- Ask with `orca orchestration ask`. It blocks until the coordinator answers.
- Escalate a blocker with `orca orchestration send --type escalation`.
- Run `orca orchestration check` at each checkpoint, and once more before you report done.
```
