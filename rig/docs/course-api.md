# The course API

What the course sends rig's agents, and what they send back. `<course>` is the address
start-challenge gives.

## The tracker

Base: `<course>/rig/tracker`. Reading is free, no token.

- `GET <course>/rig/tracker/issues` → `{ "issues": [ { "number", "title", "state", "labels", "by", "body", "comments" } ] }`
- `GET <course>/rig/tracker/issues/<n>` → one issue, same fields.

`state` is `open` or `closed`. `comments` is a list of `{ "by", "body" }`, oldest first.

Changing an issue:

- `POST <course>/rig/tracker/issues/<n>/<action>`, where `<action>` is `comment`, `label`, `close`
  or `reopen`.
- Header `Authorization: Bearer <reply token>`: the token at the end of the reply address the
  agent's ping carried.
- JSON body: `{ "body": "..." }` for `comment`, `{ "label": "..." }` for `label`, `{}` otherwise.
- The course allows it only if the agent's entry in `mega-pulse.json` lists that action in `may`.
  Otherwise: `403`.

## The agents' file

`https://<host>/.well-known/mega-pulse.json`, on the host the agents run on:

```json
{
  "owner": "<owner code from start-challenge>",
  "agents": {
    "<name>": { "wakes": "pulse", "may": ["<action>", "..."] }
  }
}
```

- `owner`: the owner code start-challenge gives. It tells the course the host is yours.
- `wakes`: what wakes that agent, `pulse` or `test`. One value per agent.
- `may`: what that agent may do. Actions: `answer`, `test`, `comment`, `label`, `close`, `reopen`.

## Pings

The course POSTs JSON to the address the harness registers. Pings follow the Standard Webhooks
spec (https://www.standardwebhooks.com), so its libraries can check them. Headers:

- `webhook-id`: the ping's id. When the course sends a ping again (after a 5xx or a dropped
  connection), the id stays the same.
- `webhook-timestamp`: unix seconds when this copy left. The course never sends a copy more than
  5 minutes old.
- `webhook-signature`: `v1,<base64 signature>`, an HMAC-SHA256 over `<id>.<timestamp>.<raw body>`.
  The HMAC key is the ping key's bytes: the part after `whsec_`, base64-decoded. After a key change
  there are two, separated by a space (see below).
- `user-agent`: `mega-course-pings/1 (+<course>/rig)`.

The ping key is the one start-challenge gives. A wrong signature means the request is not from
the course. `reply` and `tracker` always start with `<course>`.

### A new ping key

If the key leaks, send claim-challenge `{ "rotate": "pingKey" }`, then call start-challenge for the
new key. For one hour after that, each ping carries two signatures, one with the old key and one
with the new, so the host can switch at any time in that hour. Three new keys a day at most.

A pulse ping:

```json
{
  "kind": "pulse",
  "text": "pulse? <phrase>",
  "phrase": "<phrase>",
  "reply": "<reply URL>",
  "tracker": "<course>/rig/tracker/issues"
}
```

A test ping:

```json
{
  "kind": "test",
  "issue": 12,
  "reply": "<reply URL>",
  "files": { "<path>": "<text>" }
}
```

## Replies

`POST <reply URL>`, JSON. One answer per ping.

- pulse: `{ "text": "<answer>" }`, at most 2000 characters.
- test: `{ "path": "test/<name>.test.ts", "test": "<source>", "red": "<how it failed on the base>" }`, at most 20 KB.

| Status | Means |
|--------|-------|
| 202 | received |
| 409 | that ping was already answered |
| 404 | unknown reply address |
| 410 | too late for that ping |
