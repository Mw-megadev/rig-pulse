import { readFileSync } from 'node:fs';

export type RigConfig = {
  adapter: string;
  installed: string;
  beatEverySeconds: number;
  runsDir: string;
};

export function loadConfig(path = 'rig.json'): RigConfig {
  return JSON.parse(readFileSync(path, 'utf8')) as RigConfig;
}
