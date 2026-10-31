# 0001 · Server-rendered JSX, no client JS

- Status: accepted · 2026-10-12

## Context

rig's pages are read, not used. They are looked at in a browser, in a screenshot, or by an
agent fetching the HTML. Any of the three must see the same thing.

## Decision

Hono with `hono/jsx`, rendered on the server. One layout, one inline stylesheet, no client
scripts, no build step for the front end.

## Consequences

- An agent's `fetch` of a page and a human's screenshot match, by construction.
- Anything interactive is out of scope; if a page needs it, it's the wrong page.
