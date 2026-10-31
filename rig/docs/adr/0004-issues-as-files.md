# 0004 · Issues as files; the course tracker is read-only

- Status: accepted · 2026-10-26
- Amends: 0002 (work is issues)

## Context

Work is issues (ADR 0002). rig's known issues live on the course tracker (`docs/course-api.md`),
which this lane reads but does not open issues on. Without a place of our own, the split ends up
in chat, and chat vanishes with the session, which 0002 was written to stop.

## Decision

1. **The course tracker is the state of the known issues.** Read it live; don't copy it.
2. **New work is files.** The split, the same human review, written to `docs/issues/`.
3. **One place per plan, never both.** Don't keep a copy of the other.

### Issues as files

One file per issue: `docs/issues/<NNN>-<slug>.md`. `NNN` is the issue number, three digits, from
`001`, never reused. It is what `#n` means in `Blocked by` and in commit messages.

YAML frontmatter holds the issue's fields. The body is the issue, word for word.

| Field | Value |
|-------|-------|
| `id` | the number, same as `NNN` |
| `title` | quoted string |
| `state` | `open` or `closed` |
| `labels` | list (may be empty) |
| `created` | ISO 8601 with time zone |
| `closed` | ISO 8601, or `null` while open |

```md
---
id: 3
title: "Digest page: GET /digest/:night"
state: open
labels: []
created: 2026-10-29T14:20:00+01:00
closed: null
---

<the issue body: whatever this repo's issues carry>
```

Closing it: `state: closed`, `closed: <time>`, then the closing comment from AGENTS.md under its
own heading at the end of the file:

```md
## Closing comment

done: GET /digest/:night renders the rows
worker: <harness> · <model> · <effort>
commit: 4f2a9c1
```

- Frontmatter discipline (agents break it most): one opening and one closing `---`, every key once
  and in lower case, quote any value with a `:` or a `#`, lists as `[a, b]`, no tabs. Change a
  key in place, never append a second one.
- Nothing else in `docs/issues/` is an issue. A file that isn't `<NNN>-<slug>.md` with frontmatter
  doesn't count.

## Considered

- **Issues in one file (`ISSUES.md`):** every agent edits the same file, and parallel workers
  conflict on every close.
- **`Status:` lines in the body instead of frontmatter:** easy to write, easy to write twice. The
  frontmatter is the one place a parser looks.

## Consequences

- No lane is left without issues. The split, review and handoff go through files.
- Two trackers for one plan would drift, so rule 3 forbids it.
