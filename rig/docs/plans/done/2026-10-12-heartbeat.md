---
plan: heartbeat
status: done
owner: rook
opened: 2026-10-12
closed: 2026-10-14
---

# Heartbeat

rig has to prove it's alive without anyone asking it. One file, overwritten every beat, that a
supervisor or another agent can read.

## 1. Beat writer

`src/heartbeat.ts`: write `{ at, pid, laneId }` to `var/heartbeat.json` every
`beatEverySeconds` (from `rig.json`). Overwrite, never append.

Done when: the file updates while `pnpm dev` runs.

## 2. Health route

`GET /health` → `{ ok, lane }`. No beat data: health says the process answers, the beat says
it's been answering.

Done when: route test passes.

## Issues

| # | Issue | Blocked by | Worker | Closed |
|---|-------|-----------|--------|--------|
| 1 | Beat writer | — | pi · opus-5.5 · medium | 2026-10-13 |
| 2 | Health route | — | claude-code · haiku-4.5 · low | 2026-10-13 |
| 3 | Beat on start, not after the first interval | #1 | pi · opus-5.5 · low | 2026-10-14 |

#3 came from review of #1, not from the plan.
