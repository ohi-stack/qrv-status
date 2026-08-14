import express from 'express';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const VERSION = process.env.APP_VERSION || '1.0.0';

const SERVICES = [
  ['verify', process.env.VERIFY_URL || 'https://verify.qrv.network/healthz'],
  ['registry', process.env.REGISTRY_URL || 'https://registry.qrv.network/health'],
  ['api', process.env.API_URL || 'https://api.qrv.network/healthz'],
  ['issuer', process.env.ISSUER_URL || 'https://issuer.qrv.network/healthz'],
  ['docs', process.env.DOCS_URL || 'https://docs.qrv.network'],
  ['developers', process.env.DEVELOPERS_URL || 'https://developers.qrv.network']
];

app.disable('x-powered-by');
app.use(express.json());

async function checkService([name, url]) {
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: 'manual' });
    return { name, url, ok: response.status >= 200 && response.status < 400, status: response.status, latencyMs: Date.now() - started };
  } catch (error) {
    return { name, url, ok: false, status: 0, latencyMs: Date.now() - started, error: error.message };
  }
}

app.get('/healthz', (_req, res) => res.json({ status: 'ok', service: 'qrv-status', version: VERSION }));
app.get('/version', (_req, res) => res.json({ service: 'qrv-status', version: VERSION }));

app.get('/api/status', async (_req, res) => {
  const services = await Promise.all(SERVICES.map(checkService));
  const ok = services.every((service) => service.ok);
  res.status(ok ? 200 : 207).json({ ok, checkedAt: new Date().toISOString(), services });
});

app.get('/', async (_req, res) => {
  const services = await Promise.all(SERVICES.map(checkService));
  const rows = services.map((service) => `<tr><td>${service.name}</td><td><code>${service.url}</code></td><td>${service.ok ? 'ONLINE' : 'DEGRADED'}</td><td>${service.status}</td><td>${service.latencyMs} ms</td></tr>`).join('');
  res.type('html').send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QR-V Status</title><style>body{font-family:Inter,Arial,sans-serif;background:#071126;color:#eef6ff;margin:0}.wrap{max-width:1100px;margin:auto;padding:40px 20px}.card{background:#101b36;border:1px solid #2d3f70;border-radius:18px;padding:24px}table{width:100%;border-collapse:collapse;margin-top:20px}td,th{border-bottom:1px solid #2d3f70;padding:12px;text-align:left}code{color:#9ec1ff}</style></head><body><main class="wrap"><section class="card"><h1>QR-V™ Network Status</h1><p>Live health aggregation for QR-V infrastructure nodes.</p><table><thead><tr><th>Service</th><th>Endpoint</th><th>Status</th><th>HTTP</th><th>Latency</th></tr></thead><tbody>${rows}</tbody></table></section></main></body></html>`);
});

app.listen(PORT, '0.0.0.0', () => console.log(`qrv-status running on ${PORT}`));
