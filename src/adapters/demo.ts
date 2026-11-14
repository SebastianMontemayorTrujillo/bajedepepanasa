import type { Granule } from './types';

const DEMO_FILES: Record<string, string> = {
  'nisar-gcov': '/demo/nisar-gcov.json',
  'opera-rtc': '/demo/opera-rtc.json',
  'opera-dswx': '/demo/opera-dswx.json',
};

export async function loadDemoGranules(
  key: keyof typeof DEMO_FILES | string,
): Promise<Granule[]> {
  const path = DEMO_FILES[key];
  if (!path) return [];
  try {
    const res = await fetch(path);
    if (!res.ok) return [];
    const data = (await res.json()) as Granule[];
    return data.map((g) => ({ ...g, source: 'demo' as const }));
  } catch {
    return [];
  }
}
