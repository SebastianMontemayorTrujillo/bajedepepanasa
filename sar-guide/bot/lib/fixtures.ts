/** Curated Monterrey demo granules — mirrors public/demo/*.json */

export type DemoGranule = {
  id: string;
  title: string;
  dataset: string;
  startTime: string;
  polarizations?: string[];
  browseUrl?: string;
};

export const NISAR_GCOV: DemoGranule[] = [
  {
    id: 'NISAR_L2_GCOV_MTY_20240601_DEMO',
    title: 'NISAR GCOV Monterrey before (demo)',
    dataset: 'NISAR_L2_GCOV_PROVISIONAL_V1',
    startTime: '2024-06-01T12:00:00Z',
    polarizations: ['HH', 'HV'],
    browseUrl: '/demo/layers/gcov-before.svg',
  },
  {
    id: 'NISAR_L2_GCOV_MTY_20240915_DEMO',
    title: 'NISAR GCOV Monterrey after (demo)',
    dataset: 'NISAR_L2_GCOV_PROVISIONAL_V1',
    startTime: '2024-09-15T12:00:00Z',
    polarizations: ['HH', 'HV'],
    browseUrl: '/demo/layers/gcov-after.svg',
  },
];

export const OPERA_RTC: DemoGranule[] = [
  {
    id: 'OPERA_L2_RTC-S1_MTY_20240910_DEMO',
    title: 'OPERA RTC-S1 Monterrey (demo fallback)',
    dataset: 'OPERA_L2_RTC-S1_V1',
    startTime: '2024-09-10T18:22:00Z',
    polarizations: ['VV', 'VH'],
  },
];

export const OPERA_DSWX: DemoGranule[] = [
  {
    id: 'OPERA_L3_DSWX-HLS_MTY_20240914_DEMO',
    title: 'OPERA DSWx-HLS Monterrey water extent (demo)',
    dataset: 'OPERA_L3_DSWX-HLS_V1',
    startTime: '2024-09-14T17:05:00Z',
  },
];

export const DEFAULT_AOI = {
  west: -100.55,
  south: 25.5,
  east: -100.05,
  north: 25.85,
  label: 'Monterrey metro / Santa Catarina',
};
