---
name: ui-copy
description: Write the words people read in the apps — labels, headings, buttons, messages, warnings, errors, empty states, and emails — in plain words a sailing-center staffer would say. Use when writing or reviewing any text a person sees on screen or in their inbox, including warning and error messages built in code.
---

# UI Copy

House style for the words people read in cyc-seattle apps. The readers are staff, coaches, volunteers, and
households. None of them read the code, the schema, or the plan.

## Scope

Applies to every word a person sees:

- labels, headings, buttons, links, and menu items
- messages, warnings, and errors, including ones built in code, such as the planning engine's
- empty states and confirmations
- emails and other notifications

Prose that ships in a repo, such as docs and comments, follows `technical-writing` instead.

## Rules

### Words

1. **Say it the way a staffer would say it out loud.** If no one at the sailing center would say the sentence to a
   coworker, rewrite it.
2. **Use the name people know.** Use the label they see on the screen, not the field, table, or code name. Write
   "Lodging per night", not `lodging_per_night_cents`. Write "the Operations Plan's rates", not `plan_rates`.
3. **No invented terms.** Do not make up a noun for something people already have a word for. Write "coach", not
   "staff capacity". Write "boats", not "fleet allocation".
4. **No jargon.** Spell out an abbreviation the reader may not know the first time it appears on a page, unless it's
   on the form they fill in.
5. **No AI-slop idioms.** Do not write "the staff can take", "leverage", "seamless", "robust", "ensure", "utilize",
   "streamline", "effortless", "empower", or "unlock".
6. **Name the organization.** CYC is a club. CSC is a sailing center. Never write "the club" or "the organization"
   for either one. Use the name, or the name from the data.

### What a message says

7. **Say what's wrong, then what to do.** A warning or error names the thing that's wrong, in the reader's terms.
   When the fix isn't obvious, the next sentence says what to change and where.
8. **Lead with the thing it's about.** Start with the offering, the boat, or the person. Not with the rule.
9. **Numbers have units.** Write "14 sailors", "3 hours", "2 RIBs". Never a bare number. Write "no", not "0", when
   there are none: "no coach", not "0 coaches".
10. **Give the numbers that show how far off it is.** "14 sailors, but enough qualified coaches for only 10" tells
    the reader how many coaches short they are.
11. **One message, one problem.** Do not chain causes with "so" more than once.
12. **No blame and no alarm.** Do not write "invalid", "illegal", "failed to", or "error:" in front of a message.
    Write "has no hourly rate", not "invalid hourly rate".

### Layout

13. **A title, and no subtitle.** Do not add a subtitle, help text, a tooltip, or an intro paragraph unless the
    maintainer asks for it.
14. **Buttons say what they do.** Use a verb and its object: "Save draft", "Delete plan". Not "OK", "Submit", or
    "Continue".
15. **An empty state says what's missing.** "No warnings", "No sailors yet". Do not explain the feature.
16. **Sentence case.** Capitalize only the first word and names: "Save draft", not "Save Draft".

## Before and after

Real warnings from the planning engine in [cyc-seattle/platform](https://github.com/cyc-seattle/platform):

| Before                                                                                         | After                                                                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| K Pod Spring 2026: 14 sailors, but the staff can take 0                                        | K Pod Spring 2026 has 14 sailors and no qualified coach                                           |
| Guppies Week 2: 14 sailors, but the staff can take 10                                          | Guppies Week 2 has 14 sailors, but enough qualified coaches for only 10                           |
| Guppies Week 2: 14 sailors, but the boats can take 10                                          | Guppies Week 2 has 14 sailors, but the boats hold only 10                                         |
| 14 Sailqubes out, but CSC has 12, for Guppies Week 3                                           | 14 Sailqubes out at once for Guppies Week 3, but CSC has only 12                                  |
| Head Coach has hours charged to programs but no paid_hours_per_year, so they cost nothing      | Head Coach has hours charged to programs but no paid hours per year, so those hours cost nothing  |
| More than one plan_rates row, so the first is used                                             | The Operations Plan has more than one set of rates. Only the first one counts                     |
| No offering in the plan year has MTDC, so the shared costs stay with the organization          | No offering this year has costs that count toward MTDC, so CSC keeps all the shared costs         |
| The Operations Plan doesn't say how many Sailqube the organization has, so they aren't checked | The Operations Plan doesn't say how many Sailqubes CSC has. Add it to check that there are enough |

Each "after" names the offering or the thing first, gives every number a unit, uses the label on the form, and names
the organization.

## Reviewing a change

When a diff adds or changes any text a person sees, check each string against the rules above. Report each one that
breaks a rule, with the rule's number and a suggested rewrite. Strings built in code count, so read the template
literals as the reader would see them, with real values filled in.

## Editing existing copy

Fix the wording of strings you touch for another reason. Do not rewrite every string in an app as a standalone task
unless the maintainer asks.
