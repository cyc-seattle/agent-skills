# agent-skills

Agent skills shared by the cyc-seattle repos. Each skill is a directory under `skills/` with a `SKILL.md` in the [Agent Skills](https://agentskills.io) format.

| Skill               | Use it to                                               |
| ------------------- | ------------------------------------------------------- |
| `technical-writing` | Write prose that ships in a repo                        |
| `capture`           | File a GitHub issue with a type, a priority, and a body |
| `triage`            | Bring the open issues to a consistent, actionable state |
| `start-session`     | Open a work session and sort each request into a tier   |
| `design`            | Plan a change in `.plans/`, then post it as an issue    |
| `implement`         | Hand one scoped change to the `implementer` agent       |
| `dispatch`          | Brief a worker session that opens its own PR            |
| `review`            | Review the session diff with the `reviewer` agent       |
| `end-session`       | Run `mise run ci`, open the PR, and hand off            |
| `write-feature`     | Write integration scenarios in Gherkin                  |

## Sub-agents

The `agents/` directory holds the `designer`, `implementer`, and `reviewer` sub-agents that the session skills dispatch. They use Claude Code's format, which Cursor and VS Code also read. The Claude Code plugin installs them.

## Install

### Claude Code

```text
/plugin marketplace add cyc-seattle/agent-skills
/plugin install cyc@cyc-seattle
```

The skills are namespaced under the plugin, for example `cyc:capture`.

### Codex, Cursor, Copilot, and Gemini CLI

```sh
npx skills add cyc-seattle/agent-skills
```

This uses [vercel-labs/skills](https://github.com/vercel-labs/skills). It installs the skills into `.agents/skills/`. To update them, run `npx skills update`.

## Add a skill

1. Create `skills/<name>/SKILL.md`. Its frontmatter needs a `name` that matches the directory and a `description`.
2. Write it in the style of the `technical-writing` skill.
3. Run `mise run ci`.
