import type { CatalogSearchParams, Granule } from './types';
import { loadDemoGranules } from './demo';

/**
 * OPERA L3 DSWx-HLS surface-water extent adapter.
 * Dataset: OPERA_L3_DSWX-HLS_V1
 * CMR short_name: OPERA_L3_DSWX-HLS_V1
 */
const CMR_GRANULES =
  'https://cmr.earthdata.nasa.gov/search/granules.json';

export async function searchOperaDswx(
  params: CatalogSearchParams,
): Promise<Granule[]> {
  if (params.demoMode) {
    return loadDemoGranules('opera-dswx');
  }

  const { aoi, dates, limit = 20 } = params;
  const qs = new URLSearchParams({
    short_name: 'OPERA_L3_DSWX-HLS_V1',
    bounding_box: `${aoi.west},${aoi.south},${aoi.east},${aoi.north}`,
    temporal: `${dates.before}T00:00:00Z,${dates.after}T23:59:59Z`,
    page_size: String(limit),
  });

  try {
    const res = await fetch(`${CMR_GRANULES}?${qs.toString()}`);
    if (!res.ok) {
      console.warn('[operaDswx] CMR search failed', res.status);
      return loadDemoGranules('opera-dswx');
    }
    const data = (await res.json()) as {
      feed?: { entry?: Record<string, unknown>[] };
    };
    const entries = data.feed?.entry ?? [];
    return entries.map((e, i) => ({
      id: String(e.id ?? `opera-dswx-${i}`),
      title: String(e.title ?? `OPERA DSWx ${i + 1}`),
      platform: 'HLS',
      dataset: 'OPERA_L3_DSWX-HLS_V1',
      processingLevel: 'L3',
      startTime: String(e.time_start ?? ''),
      stopTime: String(e.time_end ?? ''),
      browseUrl: extractBrowse(e),
      downloadUrl: extractHref(e),
      source: 'cmr' as const,
      requiresEarthdata: true,
    }));
  } catch (err) {
    console.warn('[operaDswx] network error, falling back to demo', err);
    return loadDemoGranules('opera-dswx');
  }
}

function extractBrowse(e: Record<string, unknown>): string | undefined {
  const links = e.links as { rel?: string; href?: string }[] | undefined;
  const browse = links?.find((l) => l.rel?.includes('browse') || l.rel?.includes('icon'));
  return browse?.href;
}

function extractHref(e: Record<string, unknown>): string | undefined {
  const links = e.links as { rel?: string; href?: string }[] | undefined;
  const data = links?.find((l) => l.rel?.includes('data') || l.rel?.includes('http'));
  return data?.href;
}
