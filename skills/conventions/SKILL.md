---
name: conventions
description: The rules every agent follows in every cyc-seattle repo — how to name the organization and its people, how to link issues, what never goes in a public repo, where open questions go, and how to review a UI change. Use at the start of any work in a cyc-seattle repo. A repo's AGENTS.md points here with "Follow cyc:conventions."
---

# Conventions

The rules for every cyc-seattle repo. A repo's `AGENTS.md` adds the rules for that repo only. If the two disagree, the repo's `AGENTS.md` wins.

## Writing

- Write in plain words that a staffer at the sailing center would say. Follow the `technical-writing` skill.
- No AI filler. Do not write "seamless", "robust", "leverage", "delve", or "comprehensive". Do not open with praise or close with a summary of what you just said.

## Names

- **CYC** (CYC of Seattle) is a club. **CSC** (CYC Community Sailing Center) is a sailing center. They are two organizations. Name the one you mean.
- Never write "the club" for the organization in general.
- Write "household", not "family", for the people who register together. See [cyc-seattle/sail-team#29](https://github.com/cyc-seattle/sail-team/issues/29).

## Links

Link every issue and PR in full: `[owner/repo#N](https://github.com/owner/repo/issues/N)`, or `/pull/N` for a PR. Never write a bare `#N`. This applies in chat, plans, commit messages, PR bodies, and issues.

## Public by default

Every repo, PR, and issue is public.

- Never write a real person's name, email address, or phone number.
- Never write a money figure: a fee, a price, a balance, or a budget.
- Use made-up data in tests, stories, fixtures, and screenshots.

## Secrets

Never print a secret value to the terminal.

- Do not read a secret to look at it.
- Do not dump state, environment variables, or config that holds secrets.
- To check that a secret exists, check its name or its length, not its value.

## Questions and decisions

- Ask the maintainer each open question before you write code.
- Never leave an open question in a PR body or an issue.
- Record each decision as a comment on the issue it belongs to.

## UI changes

Review every UI change at two sizes:

- Laptop: 1440×900
- Phone: 390×844
