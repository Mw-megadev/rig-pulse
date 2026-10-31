import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NO_OWNER, ownerOf } from './owner.js';
import type { DigestRow, Night, RunLine, RunStatus } from './types.js';

const STATUSES: RunStatus[] = ['ok', 'retry', 'fail'];

function parse(line: string): RunLine | null {
  try {
    const j = JSON.parse(line);
    if (typeof j.at !== 'string' || typeof j.job !== 'string' || !STATUSES.includes(j.status)) return null;
    return { at: j.at, job: j.job, status: j.status, owner: j.owner ?? null, error: j.error };
  } catch {
    return null;
  }
}

// runs/<night>.jsonl → one row per job, sorted by job. A night with no file is null; a line that
// doesn't parse is counted, never thrown.
export function readNight(runsDir: string, night: string): Night | null {
  let text: string;
  try {
    text = readFileSync(join(runsDir, `${night}.jsonl`), 'utf8');
  } catch {
    return null;
  }

  const rows = new Map<string, DigestRow>();
  let badLines = 0;
  for (const raw of text.split('\n')) {
    if (!raw.trim()) continue;
    const line = parse(raw);
    if (!line) {
      badLines++;
      continue;
    }
    // #12: a row that already carries the placeholder is one the digest wrote back, not a job.
    if (line.owner === NO_OWNER) continue;

    const row = rows.get(line.job);
    if (!row) {
      rows.set(line.job, {
        job: line.job,
        owner: ownerOf(line.owner),
        runs: 1,
        retries: line.status === 'retry' ? 1 : 0,
        last: line.status,
        lastError: line.error ?? null,
        first: line.at,
        lastAt: line.at,
      });
      continue;
    }
    row.runs++;
    if (line.status === 'retry') row.retries++;
    row.last = line.status; // #9: last status wins, retries counted on their own
    row.lastError = line.error ?? null;
    row.lastAt = line.at;
  }

  return { night, rows: [...rows.values()].sort((a, b) => a.job.localeCompare(b.job)), badLines };
}

export function counts(night: Night): Record<RunStatus, number> {
  const c = { ok: 0, retry: 0, fail: 0 };
  for (const r of night.rows) c[r.last]++;
  return c;
}
