# 0002 · Plans are files, work is issues

- Status: accepted · 2026-10-13 · amended by 0004 (issues as files, the course tracker read-only)

## Context

Plans written into chat vanish with the session. Plans written into one big issue get worked
top to bottom by a single agent, including the parts that should have waited.

## Decision

- A plan is a file, `plan.md` at the root, reviewed like code. Finished plans move to
  `docs/plans/done/` with their issue list.
- Work happens in issues split from the plan (skill `plan-to-issues`), one per unit of
  work, each with its source section, scope, a checkable done condition, and what it's blocked by.
- Issues are worked by workers, one issue each. The closing comment records which model did it
  (format in AGENTS.md), so we can see later which models are worth their cost per kind of task.

## Consequences

- Anyone, human or agent, picks up a plan cold from the repo alone.
- The split is the plan's real review. A bad split is a bad plan.
