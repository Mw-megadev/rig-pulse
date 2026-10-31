import { serve } from '@hono/node-server';
import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { startBeating } from './heartbeat.js';
import { lane } from './lane.js';

const config = loadConfig();
const port = Number(process.env.PORT ?? 8787);

startBeating(lane().id, config.beatEverySeconds);
serve({ fetch: createApp(config).fetch, port }, () => {
  console.log(`rig · ${lane().id} · http://localhost:${port}`);
});
