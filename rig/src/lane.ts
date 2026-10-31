// Who this rig serves. Read once per request, so a changed .env needs only a restart.
export type Lane = { id: string; marker: string | null };

export function lane(env: NodeJS.ProcessEnv = process.env): Lane {
  return { id: env.LANE_ID ?? 'lane-07', marker: env.LANE_MARKER?.trim() || null };
}
