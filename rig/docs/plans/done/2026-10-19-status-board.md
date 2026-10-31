---
plan: status-board
status: done
owner: rook
opened: 2026-10-16
closed: 2026-10-21
---

# Status board

One page with the lane's state, readable in under a minute.

## 1. Status model

`src/status.ts`: adapter + install time from `rig.json`, last beat, nights on disk (newest
first).

Done when: unit-tested against a temp dir.

## 2. Board view

`GET /` with the layout: the lane banner (lane id + marker) on every page, then the status
table and the nights list. Missing beat renders as a warning, not an empty cell.

Done when: route test checks the banner and the nights.

## 3. Preview for review

Save `/` as one HTML file and send Rook the link.

Done when: Rook has reviewed it.

## Issues

| # | Issue | Blocked by | Worker | Closed |
|---|-------|-----------|--------|--------|
| 4 | Status model | — | codex · gpt-5.5 · medium | 2026-10-17 |
| 5 | Board view | #4 | claude-code · sonnet-5.5 · low | 2026-10-18 |
| 6 | Preview for review | #5 | claude-code · sonnet-5.5 · low | 2026-10-19 |

The preview link stayed up until 21 October. See ADR 0003.
