// #12: a missing owner renders as —, never as `null`.
export const NO_OWNER = '—';

export function ownerOf(owner: string | null | undefined): string {
  return owner?.trim() || NO_OWNER;
}
