# 0006 · Agents that write

- Status: accepted · 2026-10-30
- Amends: 0005 (for one agent)

## Context

The pulse only answers. The test writer (`docs/agents/test-writer.md`) has to hand back a file.

## Decision

The test writer is the one agent that writes. It writes tests, and sends tests only.

## Consequences

- Two agents that wake alone, and only one of them writes.
