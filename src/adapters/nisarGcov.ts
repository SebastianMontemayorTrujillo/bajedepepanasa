import type { CatalogSearchParams, Granule } from './types';
import { loadDemoGranules } from './demo';

/**
 * NISAR L2 GCOV adapter.
 *
 * Live search: ASF Search API (no credentials required for search metadata).
 * Download / stream of product files requires Earthdata Login —
 * set EARTHDATA_USERNAME / EARTHDATA_PASSWORD or ~/.netrc (never commit secrets).
 *
 * Earthdata short_name (earthaccess): NISAR_L2_GCOV_PROVISIONAL_V1
 * Docs: https://nisar-docs.asf.alaska.edu/
 */
const ASF_SEARCH = 'https://api.daac.asf.alaska.edu/services/search/param';

export async function searchNisarGcov(
  params: CatalogSearchParams,
): Promise<Granule[]> {
  if (params.demoMode) {
    return loadDemoGranules('nisar-gcov');
  }

  const { aoi, dates, limit = 20 } = params;
  const qs = new URLSearchParams({
    platform: 'NISAR',
    processingLevel: 'GCOV',
    bbox: `${aoi.west},${aoi.south},${aoi.east},${aoi.north}`,
    start: `${dates.before}T00:00:00Z`,
    end: `${dates.after}T23:59:59Z`,
    output: 'json',
    maxResults: String(limit),
  });

  try {
    const res = await fetch(`${ASF_SEARCH}?${qs.toString()}`);
    if (!res.ok) {
      console.warn('[nisarGcov] ASF search failed', res.status);
      return loadDemoGranules('nisar-gcov');
    }
    const data = (await res.json()) as unknown;
    return normalizeAsf(data);
  } catch (err) {
    console.warn('[nisarGcov] network error, falling back to demo', err);
    return loadDemoGranules('nisar-gcov');
  }
}

function normalizeAsf(data: unknown): Granule[] {
  const rows = Array.isArray(data)
    ? data
    : Array.isArray((data as { results?: unknown[] })?.results)
      ? (data as { results: unknown[] }).results
      : [];

  return rows.map((row, i) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.granuleName ?? r.sceneName ?? r.fileID ?? `nisar-gcov-${i}`),
      title: String(r.granuleName ?? r.sceneName ?? `NISAR GCOV ${i + 1}`),
      platform: 'NISAR',
      dataset: 'NISAR_L2_GCOV_PROVISIONAL_V1',
      processingLevel: 'GCOV',
      startTime: String(r.startTime ?? r.sensingStart ?? ''),
      stopTime: String(r.stopTime ?? r.sensingStop ?? ''),
      polarizations: parsePols(r.polarization ?? r.polarizations),
      browseUrl: String(r.browse ?? r.browseUrl ?? '') || undefined,
      downloadUrl: String(r.downloadUrl ?? r.url ?? '') || undefined,
      source: 'asf' as const,
      requiresEarthdata: true,
    };
  });
}

function parsePols(v: unknown): string[] | undefined {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string' && v.length) return v.split(/[+,\s]+/);
  return ['HH', 'HV'];
}
