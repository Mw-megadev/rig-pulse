// Plan 2026-10-29-morning-digest §1. Everything in section 2 builds against this file.
export type RunStatus = 'ok' | 'retry' | 'fail';

// One line of runs/<night>.jsonl.
export type RunLine = {
  at: string;
  job: string;
  status: RunStatus;
  owner: string | null;
  error?: string;
};

// One row per job.
export type DigestRow = {
  job: string;
  owner: string;
  runs: number;
  retries: number;
  last: RunStatus;
  lastError: string | null;
  first: string;
  lastAt: string;
};

export type Night = {
  night: string;
  rows: DigestRow[];
  badLines: number;
};

export type ReadNight = (runsDir: string, night: string) => Night | null;
