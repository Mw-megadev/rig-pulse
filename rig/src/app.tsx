import { Hono } from 'hono';
import { loadConfig, type RigConfig } from './config.js';
import { counts, readNight } from './digest/read.js';
import { lane } from './lane.js';
import { readStatus } from './status.js';
import { Digest } from './views/digest.js';
import { Layout } from './views/layout.js';
import { StatusBoard } from './views/status.js';

export function createApp(config: RigConfig = loadConfig()) {
  const app = new Hono();

  app.get('/health', (c) => c.json({ ok: true, lane: lane().id }));

  app.get('/', (c) => {
    const status = readStatus(config);
    const nights = status.nights.map((n) => {
      const night = readNight(config.runsDir, n);
      return { night: n, counts: night ? counts(night) : null };
    });
    return c.html(
      <Layout title="status" lane={lane()}>
        <StatusBoard status={status} nights={nights} />
      </Layout>,
    );
  });

  // Page and JSON come from the same readNight: they never disagree (ADR 0001).
  app.get('/digest/:night', (c) => {
    const night = readNight(config.runsDir, c.req.param('night'));
    if (!night) return c.notFound();
    return c.html(
      <Layout title={`digest ${night.night}`} lane={lane()}>
        <Digest night={night} />
      </Layout>,
    );
  });

  app.get('/api/digest/:night', (c) => {
    const night = readNight(config.runsDir, c.req.param('night'));
    if (!night) return c.json({ error: 'no such night' }, 404);
    return c.json(night);
  });

  return app;
}
