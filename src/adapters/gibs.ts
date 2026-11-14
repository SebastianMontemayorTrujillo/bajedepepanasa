/**
 * NASA GIBS WMTS helpers for basemap + browse preview tiles.
 * Docs: https://nasa-gibs.github.io/gibs-api-docs/
 *
 * Blue Marble is public (no Earthdata Login).
 * NISAR/OPERA browse layers appear in GIBS when documented; until then
 * we expose Blue Marble + VIIRS Corrected Reflectance as optical context.
 */

export type GibsLayerId =
  | 'blueMarble'
  | 'viirsCorrected'
  | 'modisTerraTrueColor';

const GIBS_WMTS =
  'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best';

const LAYER_MAP: Record<
  GibsLayerId,
  { product: string; matrix: string; format: string; time?: boolean }
> = {
  blueMarble: {
    product: 'BlueMarble_NextGeneration',
    matrix: 'GoogleMapsCompatible_Level8',
    format: 'jpg',
    time: false,
  },
  viirsCorrected: {
    product: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    matrix: 'GoogleMapsCompatible_Level9',
    format: 'jpg',
    time: true,
  },
  modisTerraTrueColor: {
    product: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    matrix: 'GoogleMapsCompatible_Level9',
    format: 'jpg',
    time: true,
  },
};

/** Leaflet TileLayer URL template for a GIBS WMTS product */
export function gibsTileUrl(
  layer: GibsLayerId = 'blueMarble',
  date = '2024-09-01',
): string {
  const cfg = LAYER_MAP[layer];
  const timeSeg = cfg.time ? `${date}/` : '';
  return `${GIBS_WMTS}/${cfg.product}/default/${timeSeg}${cfg.matrix}/{z}/{y}/{x}.${cfg.format}`;
}

export function gibsAttribution(): string {
  return 'Imagery © NASA GIBS / Earthdata';
}

/** Documented note for future NISAR browse layers in GIBS */
export const GIBS_NISAR_NOTE =
  'When NISAR/OPERA browse products are published in GIBS, swap layer ids here. ' +
  'Until then, Blue Marble + VIIRS provide zero-credential optical context over Monterrey.';
