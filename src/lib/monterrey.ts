import type { Aoi, DatePair } from '../modules/types';

/** Monterrey metro — Santa Catarina corridor + reservoirs */
export const MONTERREY_AOI: Aoi = {
  west: -100.55,
  south: 25.5,
  east: -100.05,
  north: 25.85,
  label: 'Monterrey metro / Santa Catarina',
};

export const DEFAULT_DATES: DatePair = {
  before: '2024-06-01',
  after: '2024-09-15',
};

export const AOI_BOUNDS: [[number, number], [number, number]] = [
  [MONTERREY_AOI.south, MONTERREY_AOI.west],
  [MONTERREY_AOI.north, MONTERREY_AOI.east],
];

export const MAP_CENTER: [number, number] = [25.675, -100.3];
