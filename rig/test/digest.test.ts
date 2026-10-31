import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { readNight } from '../src/digest/read.js';

describe('run log reader', () => {
  it('reads 2026-10-28: 5 jobs, 1 bad line', () => {
    const night = readNight('runs', '2026-10-28')!;
    expect(night.rows.map((r) => r.job)).toEqual([
      'digest/render',
      'fixtures/refresh',
      'lane/sync',
      'notes/backup',
      'rig/rotate-logs',
    ]);
    expect(night.badLines).toBe(1);
  });

  it('shows a null owner as —', () => {
    const row = readNight('runs', '2026-10-28')!.rows.find((r) => r.job === 'digest/render')!;
    expect(row.owner).toBe('—');
  });

  it('last status wins, retries counted on their own', () => {
    const row = readNight('runs', '2026-10-28')!.rows.find((r) => r.job === 'fixtures/refresh')!;
    expect(row.last).toBe('ok');
    expect(row.retries).toBe(3);
  });

  it('a night with no file is null', () => {
    expect(readNight('runs', '1999-01-01')).toBeNull();
  });
});

describe('digest routes', () => {
  const runsDir = mkdtempSync(join(tmpdir(), 'rig-runs-'));
  writeFileSync(join(runsDir, '2026-01-01.jsonl'), '');
  writeFileSync(
    join(runsDir, '2026-01-02.jsonl'),
    '{"at":"2026-01-02T01:00:00+01:00","job":"a/job","status":"ok","owner":"rook"}\nnot json\n',
  );
  const config = { adapter: 'shim', installed: '2026-10-29T14:06:00+01:00', beatEverySeconds: 60, runsDir };

  it('renders a night', async () => {
    const res = await createApp(config).request('/digest/2026-01-02');
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain('a/job');
    expect(html).toContain('1 bad line(s)');
  });

  it('404s a night with no file', async () => {
    expect((await createApp(config).request('/digest/2026-01-03')).status).toBe(404);
    expect((await createApp(config).request('/api/digest/2026-01-03')).status).toBe(404);
  });

  it('an empty night renders "nothing ran"', async () => {
    expect(await (await createApp(config).request('/digest/2026-01-01')).text()).toContain('nothing ran');
  });

  it('page and JSON list the same jobs in the same order', async () => {
    const json = await (await createApp({ ...config, runsDir: 'runs' }).request('/api/digest/2026-10-28')).json();
    const html = await (await createApp({ ...config, runsDir: 'runs' }).request('/digest/2026-10-28')).text();
    const order = json.rows.map((r: { job: string }) => html.indexOf(`<td>${r.job}</td>`));
    expect(order.every((i: number) => i > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
