import type { Bilingual, Locale } from '../modules/types';

export function t(text: Bilingual, locale: Locale): string {
  return text[locale];
}

export const ui = {
  brand: 'Vals del Agua',
  brandSub: { en: 'Flood Waltz', es: 'Vals del Agua' } satisfies Bilingual,
  tagline: {
    en: 'See Monterrey’s water through the storm — NISAR radar for Protección Civil.',
    es: 'El agua de Monterrey a través de la tormenta — radar NISAR para Protección Civil.',
  } satisfies Bilingual,
  openExplorer: { en: 'Open explorer', es: 'Abrir explorador' } satisfies Bilingual,
  before: { en: 'Before', es: 'Antes' } satisfies Bilingual,
  after: { en: 'After', es: 'Después' } satisfies Bilingual,
  layers: { en: 'Layers', es: 'Capas' } satisfies Bilingual,
  narratives: {
    en: 'Physical drivers',
    es: 'Drivers físicos',
  } satisfies Bilingual,
  demoOn: { en: 'Demo mode', es: 'Modo demo' } satisfies Bilingual,
  askGuide: { en: 'Ask SAR guide', es: 'Preguntar guía SAR' } satisfies Bilingual,
  compare: { en: 'Compare', es: 'Comparar' } satisfies Bilingual,
  opacity: { en: 'After opacity', es: 'Opacidad después' } satisfies Bilingual,
  polarization: { en: 'Polarization', es: 'Polarización' } satisfies Bilingual,
  language: { en: 'ES', es: 'EN' } satisfies Bilingual,
} as const;
