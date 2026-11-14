import { gibsAttribution, gibsTileUrl } from '../../adapters/gibs';
import { searchNisarGcov } from '../../adapters/nisarGcov';
import { searchOperaDswx } from '../../adapters/operaDswx';
import { AOI_BOUNDS, MONTERREY_AOI } from '../../lib/monterrey';
import type { ChangeModule, LayerDescriptor, ModuleContext } from '../types';
import { floodNarrativeHooks } from './narratives';

export const floodWaterModule: ChangeModule = {
  id: 'flood-water',
  title: {
    en: 'Flood & surface water',
    es: 'Inundación y agua superficial',
  },
  description: {
    en: 'NISAR GCOV + OPERA DSWx over Monterrey / Santa Catarina — see water through storms.',
    es: 'NISAR GCOV + OPERA DSWx sobre Monterrey / Santa Catarina — el agua a través de la tormenta.',
  },
  defaultAoi: MONTERREY_AOI,
  supportedLayers: [
    'gcov-browse',
    'opera-dswx',
    'gibs-basemap',
    'polarization-hh',
    'polarization-hv',
  ],
  narrativeHooks: floodNarrativeHooks,
  async buildLayers(ctx: ModuleContext): Promise<LayerDescriptor[]> {
    const layers: LayerDescriptor[] = [
      {
        id: 'gibs-blue-marble',
        kind: 'gibs-basemap',
        title: { en: 'GIBS Blue Marble', es: 'GIBS Blue Marble' },
        url: gibsTileUrl('blueMarble'),
        opacity: 1,
        attribution: gibsAttribution(),
        dateRole: 'both',
      },
    ];

    const gcov = await searchNisarGcov({
      aoi: ctx.aoi,
      dates: ctx.dates,
      demoMode: ctx.demoMode,
      limit: 4,
    });

    const beforeGcov = gcov[0];
    const afterGcov = gcov[1] ?? gcov[0];

    if (beforeGcov?.browseUrl) {
      layers.push({
        id: 'gcov-before',
        kind: 'gcov-browse',
        title: {
          en: `GCOV before (${ctx.dates.before})`,
          es: `GCOV antes (${ctx.dates.before})`,
        },
        url: beforeGcov.browseUrl,
        opacity: 0.75,
        bounds: AOI_BOUNDS,
        dateRole: 'before',
        metadata: { granuleId: beforeGcov.id, polarization: 'HH' },
      });
    }

    if (afterGcov?.browseUrl) {
      layers.push({
        id: 'gcov-after',
        kind: 'gcov-browse',
        title: {
          en: `GCOV after (${ctx.dates.after})`,
          es: `GCOV después (${ctx.dates.after})`,
        },
        url: afterGcov.browseUrl,
        opacity: 0.75,
        bounds: AOI_BOUNDS,
        dateRole: 'after',
        metadata: { granuleId: afterGcov.id, polarization: 'HH' },
      });
    }

    // Polarization overlays (demo simulates labeled HH/HV)
    if (ctx.polarization === 'HH' || ctx.polarization === 'both') {
      layers.push({
        id: 'pol-hh',
        kind: 'polarization-hh',
        title: { en: 'HH polarization', es: 'Polarización HH' },
        url: '/demo/layers/hh-overlay.svg',
        opacity: 0.55,
        bounds: AOI_BOUNDS,
        dateRole: 'after',
      });
    }
    if (ctx.polarization === 'HV' || ctx.polarization === 'both') {
      layers.push({
        id: 'pol-hv',
        kind: 'polarization-hv',
        title: { en: 'HV polarization', es: 'Polarización HV' },
        url: '/demo/layers/hv-overlay.svg',
        opacity: 0.45,
        bounds: AOI_BOUNDS,
        dateRole: 'after',
      });
    }

    const dswx = await searchOperaDswx({
      aoi: ctx.aoi,
      dates: ctx.dates,
      demoMode: ctx.demoMode,
      limit: 2,
    });
    const dswxBrowse = dswx[0]?.browseUrl ?? '/demo/layers/dswx-overlay.svg';
    layers.push({
      id: 'opera-dswx',
      kind: 'opera-dswx',
      title: {
        en: 'OPERA DSWx water extent',
        es: 'Extensión de agua OPERA DSWx',
      },
      url: dswxBrowse,
      opacity: 0.6,
      bounds: AOI_BOUNDS,
      dateRole: 'after',
      metadata: { granuleId: dswx[0]?.id },
    });

    return layers;
  },
};
