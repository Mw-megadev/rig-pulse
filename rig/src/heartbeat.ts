import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

// Plan 2026-10-12-heartbeat. One file, overwritten each beat — the status board reads it,
// anything else (a supervisor, another agent) can too.
export const BEAT_FILE = 'var/heartbeat.json';

export type Beat = { at: string; pid: number; laneId: string };

export function beat(laneId: string, file = BEAT_FILE, now = new Date()): Beat {
  const b: Beat = { at: now.toISOString(), pid: process.pid, laneId };
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(b));
  return b;
}

export function lastBeat(file = BEAT_FILE): Beat | null {
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as Beat;
  } catch {
    return null;
  }
}

export function startBeating(laneId: string, everySeconds: number): () => void {
  beat(laneId);
  const t = setInterval(() => beat(laneId), everySeconds * 1000);
  return () => clearInterval(t);
}
