# styleguide

- TypeScript strict. No `any`; parse input at the edge, trust types after.
- Server-rendered JSX only (`hono/jsx`). One layout, one inline stylesheet, no client JS.
- Pure logic in `src/<feature>/`, views in `src/views/`, routes in `src/app.tsx`.
- Missing data renders as `—`, never as an empty cell and never dropped.
- Times: keep the offset from the log; never convert to UTC for display.
- Tests: vitest, next to nothing. Test through `app.request()` for routes.
- Small commits, one issue each, `closes #n` in the message.
