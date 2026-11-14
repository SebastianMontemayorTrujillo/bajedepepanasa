import type { CatalogSearchParams, Granule } from './types';
import { loadDemoGranules } from './demo';

/**
 * OPERA L2 RTC-S1 fallback adapter.
 * Dataset: OPERA_L2_RTC-S1_V1
 * Search via ASF (platform=SENTINEL-1, dataset OPERA) or CMR.
 */
const ASF_SEARCH = 'https://api.daac.asf.alaska.edu/services/search/param';

export async function searchOperaRtc(
  params: CatalogSearchParams,
): Promise<Granule[]> {
  if (params.demoMode) {
    return loadDemoGranules('opera-rtc');
  }

  const { aoi, dates, limit = 20 } = params;
  const qs = new URLSearchParams({
    dataset: 'OPERA-S1',
    processingLevel: 'RTC',
    bbox: `${aoi.west},${aoi.south},${aoi.east},${aoi.north}`,
    start: `${dates.before}T00:00:00Z`,
    end: `${dates.after}T23:59:59Z`,
    output: 'json',
    maxResults: String(limit),
  });

  try {
    const res = await fetch(`${ASF_SEARCH}?${qs.toString()}`);
    if (!res.ok) {
      console.warn('[operaRtc] ASF search failed', res.status);
      return loadDemoGranules('opera-rtc');
    }
    const data = (await res.json()) as unknown;
    return normalize(data, 'OPERA_L2_RTC-S1_V1');
  } catch (err) {
    console.warn('[operaRtc] network error, falling back to demo', err);
    return loadDemoGranules('opera-rtc');
  }
}

function normalize(data: unknown, dataset: string): Granule[] {
  const rows = Array.isArray(data)
    ? data
    : Array.isArray((data as { results?: unknown[] })?.results)
      ? (data as { results: unknown[] }).results
      : [];

  return rows.map((row, i) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.granuleName ?? r.fileID ?? `opera-rtc-${i}`),
      title: String(r.granuleName ?? `OPERA RTC ${i + 1}`),
      platform: 'SENTINEL-1',
      dataset,
      processingLevel: 'RTC',
      startTime: String(r.startTime ?? ''),
      browseUrl: String(r.browse ?? r.browseUrl ?? '') || undefined,
      downloadUrl: String(r.downloadUrl ?? r.url ?? '') || undefined,
      source: 'asf' as const,
      requiresEarthdata: true,
    };
  });
}
