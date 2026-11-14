import type { Bilingual, ModuleContext } from '../types';

export function floodNarrativeHooks(ctx: ModuleContext): Bilingual[] {
  const { before, after } = ctx.dates;
  return [
    {
      en: `Between ${before} and ${after}, brighter HH returns near the Santa Catarina channel can mark open water or wet pavement after convective storms — radar still “sees” through cloud.`,
      es: `Entre ${before} y ${after}, retornos HH más brillantes cerca del cauce del Santa Catarina pueden marcar agua abierta o pavimento húmedo tras tormentas convectivas — el radar “ve” a través de nubes.`,
    },
    {
      en: 'Impermeable urban growth in Apodaca / Guadalupe / Santa Catarina reduces infiltration; the same rainfall produces higher runoff and flashier hydrographs.',
      es: 'El crecimiento urbano impermeable en Apodaca / Guadalupe / Santa Catarina reduce la infiltración; la misma lluvia genera más escurrimiento e hidrogramas más rápidos.',
    },
    {
      en: 'Reservoir operations (La Boca, Cerro Prieto, El Cuchillo) and releases can raise downstream surface water independent of local rainfall — check timing against GCOV/OPERA scenes.',
      es: 'Operaciones de embalses (La Boca, Cerro Prieto, El Cuchillo) y descargas pueden elevar el agua superficial río abajo sin lluvia local — contraste fechas con escenas GCOV/OPERA.',
    },
    {
      en: 'Santa Catarina channelization constrains floodplain storage; water appears as linear bright/dark corridors rather than broad inundation — compare with OPERA DSWx extent.',
      es: 'La canalización del Santa Catarina limita el almacenamiento de la planicie; el agua aparece como corredores lineales claros/oscuros — compara con la extensión OPERA DSWx.',
    },
    {
      en: 'HV (cross-pol) is more sensitive to volume scattering from vegetation and rough surfaces; HH often contrasts smoother open water. Toggle both to separate wet soil from canopy.',
      es: 'HV (cruzada) es más sensible a dispersión volumétrica de vegetación y superficies rugosas; HH suele contrastar mejor agua abierta lisa. Alterna ambas para separar suelo húmedo de dosel.',
    },
  ];
}
