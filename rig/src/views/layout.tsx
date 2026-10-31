import { raw } from 'hono/html';
import type { Child } from 'hono/jsx';
import type { Lane } from '../lane.js';

// One layout, one stylesheet, no client JS (ADR 0001). The banner is on every page: whoever
// looks at a copy of a rig page must be able to tell which lane it came from.
const css = `
  :root { color-scheme: light dark; --fg: #1d1d1b; --bg: #f6f4ee; --mute: #6b6a64; --line: #d9d5c9; --warn: #a14a12; }
  @media (prefers-color-scheme: dark) { :root { --fg: #e8e6df; --bg: #161614; --mute: #9a988f; --line: #33322e; --warn: #e08a4f; } }
  body { margin: 0; font: 15px/1.5 ui-monospace, "SF Mono", Menlo, Consolas, monospace; color: var(--fg); background: var(--bg); }
  header { display: flex; gap: 1.5rem; padding: .75rem 1.25rem; border-bottom: 1px solid var(--line); }
  header .marker { margin-left: auto; color: var(--mute); }
  main { padding: 1.25rem; max-width: 60rem; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: .35rem .75rem .35rem 0; border-bottom: 1px solid var(--line); }
  th { color: var(--mute); font-weight: normal; }
  .warn { color: var(--warn); }
  .mute { color: var(--mute); }
`;

export function Layout(props: { title: string; lane: Lane; children: Child }) {
  return (
    <>
      {raw('<!doctype html>')}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>rig · {props.title}</title>
          <style>{raw(css)}</style>
        </head>
        <body>
          <header>
            <strong>rig</strong>
            <span>{props.lane.id}</span>
            <span class="marker">{props.lane.marker ?? 'no marker set'}</span>
          </header>
          <main>{props.children}</main>
        </body>
      </html>
    </>
  );
}
