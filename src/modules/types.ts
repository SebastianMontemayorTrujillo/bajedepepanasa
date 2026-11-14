/** Shared bilingual string */
export type Bilingual = { en: string; es: string };

/** Bounding box for an area of interest */
export type Aoi = {
  west: number;
  south: number;
  east: number;
  north: number;
  label?: string;
};

/** Before/after ISO date pair (YYYY-MM-DD) */
export type DatePair = {
  before: string;
  after: string;
};

export type Locale = 'en' | 'es';

export type LayerKind =
  | 'gcov-browse'
  | 'opera-dswx'
  | 'opera-rtc'
  | 'gibs-basemap'
  | 'polarization-hh'
  | 'polarization-hv'
  | 'overlay';

export type LayerDescriptor = {
  id: string;
  kind: LayerKind;
  title: Bilingual;
  /** Leaflet ImageOverlay / tile URL template */
  url: string;
  opacity?: number;
  bounds?: [[number, number], [number, number]];
  /** Which date this layer belongs to */
  dateRole?: 'before' | 'after' | 'both';
  attribution?: string;
  metadata?: Record<string, unknown>;
};

export type ModuleContext = {
  aoi: Aoi;
  dates: DatePair;
  locale: Locale;
  polarization: 'HH' | 'HV' | 'both';
  demoMode: boolean;
};

export interface ChangeModule {
  id: string;
  title: Bilingual;
  description: Bilingual;
  defaultAoi: Aoi;
  supportedLayers: string[];
  narrativeHooks: (ctx: ModuleContext) => Bilingual[];
  buildLayers: (ctx: ModuleContext) => Promise<LayerDescriptor[]>;
}
