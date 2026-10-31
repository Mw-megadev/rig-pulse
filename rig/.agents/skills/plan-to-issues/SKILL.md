---
name: plan-to-issues
description: Split this repo's plan.md into issue files under docs/issues/, one per unit of work, after a human has reviewed the split. Use when a plan is ready and has no issues yet.
---

# plan-to-issues

Turns `plan.md` into issues that workers can pick up cold, as files (ADR 0004).

## Steps

1. Read `plan.md`, `AGENTS.md` and `docs/adr/`.
2. Draft the split as a table: title · plan section · scope · done when · blocked by.
   One issue per unit of work.
3. **Stop and show the table to the human.** Write nothing until they approve it.
4. Ask the human what every issue here must carry (fields, labels, wording), unless it is
   already written down in this session or in the repo.
5. Write each issue in dependency order, so blocked-by can cite real numbers:
   `docs/issues/<NNN>-<slug>.md`, format in ADR 0004.
6. Reply with the list of files.

Closing one: set its frontmatter and add the closing comment from AGENTS.md (ADR 0004).

## Don'ts

- Don't paste the whole plan into one issue, and don't keep issues only in chat.
- Don't invent sections the plan doesn't have. If the plan is unclear, ask.
- Don't open issues on the course tracker: it is read-only from here.
