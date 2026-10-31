import type { Night } from '../digest/types.js';

export function Digest({ night }: { night: Night }) {
  return (
    <>
      <h1>digest · {night.night}</h1>
      {night.rows.length === 0 ? (
        <p class="mute">nothing ran</p>
      ) : (
        <table>
          <thead>
            <tr><th>job</th><th>owner</th><th>runs</th><th>retries</th><th>last</th><th>error</th><th>first</th><th>last at</th></tr>
          </thead>
          <tbody>
            {night.rows.map((r) => (
              <tr>
                <td>{r.job}</td>
                <td>{r.owner}</td>
                <td>{r.runs}</td>
                <td class={r.retries >= 3 ? 'warn' : ''}>{r.retries}</td>
                <td class={r.last === 'fail' ? 'warn' : ''}>{r.last}</td>
                <td>{r.lastError ?? ''}</td>
                <td>{r.first.slice(11, 19)}</td>
                <td>{r.lastAt.slice(11, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {night.badLines > 0 && <p class="warn">{night.badLines} bad line(s), not shown</p>}
    </>
  );
}
