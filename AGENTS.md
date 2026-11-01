# AGENTS.md

Guidance for coding agents working in this repository.

## Overview

The agent skills and sub-agents shared by the cyc-seattle repos. Each skill is `skills/<name>/SKILL.md`, and each
sub-agent is `agents/<name>.md`. The repo is also the `cyc` Claude Code plugin (`.claude-plugin/`). See `README.md`
for the list and for how each tool installs them.

There's no code to build. Repos pick up a change when they update the plugin or run `npx skills update`.

## Tasks

mise provides the tools. Run `mise trust`, then `mise run install`.

- `mise run ci`: `check`, then `test`
- `mise run check`: Prettier check
- `mise run format`: fix formatting
- `mise run test`: check the plugin files and each skill's and sub-agent's frontmatter (`scripts/check-skills.mjs`)

## Writing a skill

Follow `README.md`'s "Add a skill", and write in the style of the `technical-writing` skill. Add the skill to the
table in `README.md`. A skill here serves every repo, so keep repo-specific detail out of it, or name the repo it
applies to.

PR titles are conventional commits. Never push to `main`.
