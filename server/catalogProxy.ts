/**
 * Lightweight catalog proxy — keeps browser CORS-safe and never stores Earthdata passwords.
 * Credentials (if any) stay server-side via env or ~/.netrc.
 */
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const PORT = Number(process.env.CATALOG_PORT ?? 8787);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'bajedepepanasa-catalog', demo: true });
});

app.get('/api/demo/:name', async (req, res) => {
  const name = req.params.name.replace(/[^a-z0-9-]/gi, '');
  try {
    const file = path.join(root, 'public', 'demo', `${name}.json`);
    const body = await readFile(file, 'utf8');
    res.type('json').send(body);
  } catch {
    res.status(404).json({ error: 'demo fixture not found', name });
  }
});

/** Proxy ASF Search — no credentials needed for metadata */
app.get('/api/asf', async (req, res) => {
  const qs = new URLSearchParams(req.query as Record<string, string>);
  qs.set('output', qs.get('output') ?? 'json');
  try {
    const url = `https://api.daac.asf.alaska.edu/services/search/param?${qs}`;
    const upstream = await fetch(url);
    const text = await upstream.text();
    res.status(upstream.status).type('json').send(text);
  } catch (err) {
    res.status(502).json({
      error: 'ASF proxy failed',
      detail: String(err),
      hint: 'Use demo mode fixtures under /api/demo/*',
    });
  }
});

/** Proxy CMR granule search */
app.get('/api/cmr/granules', async (req, res) => {
  const qs = new URLSearchParams(req.query as Record<string, string>);
  try {
    const url = `https://cmr.earthdata.nasa.gov/search/granules.json?${qs}`;
    const upstream = await fetch(url);
    const text = await upstream.text();
    res.status(upstream.status).type('json').send(text);
  } catch (err) {
    res.status(502).json({ error: 'CMR proxy failed', detail: String(err) });
  }
});

app.get('/api/earthdata/status', (_req, res) => {
  const hasUser = Boolean(process.env.EARTHDATA_USERNAME);
  const hasPass = Boolean(process.env.EARTHDATA_PASSWORD);
  res.json({
    configured: hasUser && hasPass,
    note:
      'Never put Earthdata passwords in the repo. Use env EARTHDATA_USERNAME / EARTHDATA_PASSWORD or ~/.netrc. Search works without credentials; downloads need login.',
  });
});

/** Fixture answers for the SAR guide when Agent SDK is offline */
app.post('/api/sar-guide/stub', (req, res) => {
  const q = String(req.body?.question ?? req.body?.message ?? '');
  const lang = /[áéíóúñ¿¡]/i.test(q) || /\b(agua|inundación|polarización)\b/i.test(q)
    ? 'es'
    : 'en';
  const answers =
    lang === 'es'
      ? {
          reply:
            'Modo demo: NISAR L2 GCOV sobre Monterrey. HH suele contrastar agua abierta; HV aporta textura de vegetación. Cruza con OPERA DSWx-HLS para extensión de agua y considera lluvia, impermeabilización urbana y descargas de embalses en el Santa Catarina.',
          tools_hint: [
            'search_nisar_gcov',
            'search_opera_fallback',
            'explain_polarization',
            'hypothesize_drivers',
          ],
        }
      : {
          reply:
            'Demo mode: NISAR L2 GCOV over Monterrey. HH often contrasts open water; HV adds vegetation texture. Cross-check OPERA DSWx-HLS for water extent and weigh rainfall, impermeable growth, and reservoir releases along Santa Catarina.',
          tools_hint: [
            'search_nisar_gcov',
            'search_opera_fallback',
            'explain_polarization',
            'hypothesize_drivers',
          ],
        };
  res.json(answers);
});

app.listen(PORT, () => {
  console.log(`[catalog] http://127.0.0.1:${PORT}`);
});
