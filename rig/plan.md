---
plan: pulse
status: ready
owner: rook
opened: 2026-10-30
---

# Pulse

rig is in the lane now, and the lane is empty most of the day. Rook still wants to know where
things stand, and he won't open anyone's machine to find out. He asks the pulse directly. The
answer has to come from whatever stays up when nobody is at the keyboard.

Out of scope: dashboards, notifications, answering anywhere but the reply address Rook gives.

## 1. The pulse

An agent on a host with a public https address: a Cloudflare Worker, a VPS, a container, any
host. Rook asks by a signed POST to that address: `pulse? <phrase>`. The phrase is new every
time. The pulse answers to the reply address that same POST carries.

What the pulse may do is written in one file on that host, `/.well-known/mega-pulse.json`
(format in `docs/course-api.md`).

Done when: Rook's ask gets an answer without anyone touching anything.

## 2. What it reads

- this file, and `docs/plans/done/` for what already happened
- the tracker: the course tracker (`docs/course-api.md`), not a copy of it

Done when: every issue the pulse names is one the tracker shows that way when it answers.

## 3. What it posts

One answer to the reply address:

- Rook's phrase, quoted
- one open issue that matters for this plan, as `#N`
- one recommendation tied to that issue

Never call an open issue shipped.

Done when: Rook reads the answer and doesn't have to ask twice.

## 4. When it stops

A check fails (no phrase, no tracker, nothing open): answer `pulse stopped: <what failed>`, in
one line, and stop.

Done when: a failed check leaves one line, not silence and not a guess.

## 5. Real work

The pulse isn't the only agent that wakes alone. Rook also sends a signed `test` POST: the
test writer (`docs/agents/test-writer.md`, ADR 0006) wakes on it, writes the test for the open
bug it names, and sends that test back, while nobody is at the keyboard.

Done when: the test writer's test is in, red without the fix.

## Known issues (as of 30 Oct)

| # | Issue | State |
|---|-------|-------|
| 8 | Board shows a stale beat after the laptop sleeps | open |
| 9 | Digest counts a retried-then-ok job as failed | open |
| 10 | Board link 404s for a night with an empty file | open |
| 11 | Heartbeat drifts a few seconds an hour | open |
| 12 | Digest prints `null` instead of `—` for a missing owner | shipped |
