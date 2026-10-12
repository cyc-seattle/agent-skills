---
name: write-feature
description: Write integration scenarios in Gherkin for vitest-cucumber in cyc-seattle repos — one behavior per scenario, steps in domain words, data named with the run ID. Use when a change adds or alters behavior, before any code is written, and whenever a .feature file changes.
---

# Write a Feature

The `.feature` files are the spec. They describe what the apps do, and they stay after the work lands. `@amiceli/vitest-cucumber` runs them under Vitest, so a repo has one test runner.

Read the repo's `AGENTS.md` first. If it gives a layout that differs from the one below, follow `AGENTS.md`.

## Layout

- `features/<name>.feature` holds the scenarios. Keep the feature files apart from their code.
- `test/features/<name>.test.ts` holds the step definitions for `<name>.feature`. Steps that more than one feature uses go in a shared file in `test/features/`.
- Load a feature with a path from the repo root: `loadFeature("features/<name>.feature")`. vitest-cucumber resolves only `./` paths against the calling file.
- `vitest.config.ts` excludes `test/features/**`, so `mise run test` stays fast and needs no Docker. `vitest.integration.config.ts` includes it, and `mise run integration` runs it.
- If the scenarios need a fake started first, start it in the integration config's `globalSetup`, not in a wrapper script.

## Features first

1. Start a change with its scenarios. Write new `.feature` files or change existing ones.
2. Get the scenarios reviewed before you write the code.
3. Run them. The new scenarios start red. vitest-cucumber fails a scenario whose steps do not exist, so nothing is skipped by accident.
4. Write the step definitions and the code until the scenarios pass.
5. Cover the logic under the steps with unit tests. A scenario checks the behavior. A unit test checks each case of the logic.

## Example

```gherkin
Feature: Clubspot registrations become people in the CRM

  Scenario: A guardian registers a new participant
    Given the fake club has a camp "Summer Optis 1"
    And "Ann Lee" registers "Ada Lee" for "Summer Optis 1"
    When clubspot-sync runs
    Then the CRM has a person "Ada Lee"
    And "Ann Lee" is a guardian of "Ada Lee"
```

## Rules

- **One behavior per scenario.** If the title needs "and", write two scenarios.
- **Write steps in domain words**: people, camps, sessions, registrations. Never name a page, a button, a URL, an HTTP status, or a database table.
- **`Given` sets state through builders.** It never depends on data that already exists.
- **`When` does one action.**
- **`Then` checks an outcome that a user would see.** Do not check internal state.
- **Name all data with the run ID.** The step definitions add the run ID to each name, such as a camp or a person. A run then never reads or breaks another run's data. The `.feature` file keeps the plain name.
- **Never schedule a run.** Scenarios run on a PR, after a merge, or by hand.
- **Reuse steps.** Search the existing step definitions before you write a new one. Keep one wording for one action.

## Step definitions

Load the file with `loadFeature`. Bind it with `describeFeature`, then define each `Scenario` and its `Given`, `When`, and `Then` steps. Each step's text must match the `.feature` file exactly.

A step definition is thin. It calls a builder, runs the app, or reads a result. Logic belongs in the code under test, where unit tests cover it.

## Checklist

- The scenario reads as a sentence about the domain to someone who has not seen the code.
- It ran red before the code changed, and it runs green now.
- No step depends on another scenario or another run.
