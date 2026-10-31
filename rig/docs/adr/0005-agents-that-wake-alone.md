# 0005 · Agents that wake alone

- Status: accepted · 2026-10-30

## Context

Until now every agent in this repo ran with someone watching: a harness in a session, a human
reading along. The pulse (plan: pulse) is the first one that wakes when nobody is there, because
someone asked it something.

## Decision

The pulse runs on a host, not on anyone's machine. A signed request wakes it, and it answers to
the address that request names.

## Consequences

- Nobody watches it run. Whatever its file lets it do, it can do with nobody there.
