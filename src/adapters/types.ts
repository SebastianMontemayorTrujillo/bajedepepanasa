import type { Aoi, DatePair } from '../modules/types';

export type Granule = {
  id: string;
  title: string;
  platform: string;
  dataset: string;
  processingLevel?: string;
  startTime: string;
  stopTime?: string;
  polarizations?: string[];
  browseUrl?: string;
  downloadUrl?: string;
  footprint?: {
    type: string;
    coordinates: number[][][] | number[][];
  };
  source: 'asf' | 'cmr' | 'demo';
  requiresEarthdata?: boolean;
};

export type CatalogSearchParams = {
  aoi: Aoi;
  dates: DatePair;
  demoMode?: boolean;
  limit?: number;
};
