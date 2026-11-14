/** Client-side SAR guide answers — works on static Vercel with no Node server. */

export function answerSarGuide(question: string, localeHint?: 'en' | 'es'): {
  reply: string;
  tools_hint: string[];
} {
  const q = question.trim();
  const lang =
    localeHint ??
    (/[áéíóúñ¿¡]/i.test(q) || /\b(agua|inundación|polarización|embalse)\b/i.test(q)
      ? 'es'
      : 'en');

  const tools_hint = [
    'search_nisar_gcov',
    'search_opera_fallback',
    'explain_polarization',
    'hypothesize_drivers',
  ];

  const lower = q.toLowerCase();
  if (/\b(hh|hv|polar)/i.test(lower)) {
    return {
      tools_hint,
      reply:
        lang === 'es'
          ? 'HH (co-polar) suele contrastar agua abierta y cauces lisos frente al clutter urbano. HV (cruzada) aporta textura de vegetación y rugosidad — alterna ambas para separar agua de dosel húmedo.'
          : 'HH (co-pol) often contrasts open water and smooth channels against urban clutter. HV (cross-pol) adds vegetation and roughness texture — toggle both to separate water from wet canopy.',
    };
  }
  if (/\b(dswx|opera|extensi[oó]n)\b/i.test(lower)) {
    return {
      tools_hint,
      reply:
        lang === 'es'
          ? 'OPERA DSWx-HLS da una capa de extensión de agua óptica/HLS. Úsala como contraste de GCOV cuando quieras confirmar dónde hay agua superficial clasificada, no solo brillo radar.'
          : 'OPERA DSWx-HLS provides an optical/HLS water-extent layer. Use it to cross-check GCOV when you need classified surface water, not only radar brightness.',
    };
  }
  if (/\b(lluvia|rain|embalse|reservoir|impermeab|urban|canal)/i.test(lower)) {
    return {
      tools_hint,
      reply:
        lang === 'es'
          ? 'Hipótesis locales: lluvia convectiva, crecimiento impermeable (Apodaca/Guadalupe/Santa Catarina), descargas de embalses (La Boca, Cerro Prieto, El Cuchillo) y canalización del Santa Catarina. Contrasta fechas GCOV con el momento de cada driver.'
          : 'Local hypotheses: convective rain, impermeable growth (Apodaca/Guadalupe/Santa Catarina), reservoir releases (La Boca, Cerro Prieto, El Cuchillo), and Santa Catarina channelization. Align GCOV dates with each driver’s timing.',
    };
  }

  return {
    tools_hint,
    reply:
      lang === 'es'
        ? 'Modo demo: NISAR L2 GCOV sobre Monterrey. HH suele contrastar agua abierta; HV aporta textura de vegetación. Cruza con OPERA DSWx-HLS y considera lluvia, impermeabilización urbana y descargas de embalses en el Santa Catarina.'
        : 'Demo mode: NISAR L2 GCOV over Monterrey. HH often contrasts open water; HV adds vegetation texture. Cross-check OPERA DSWx-HLS and weigh rainfall, impermeable growth, and reservoir releases along Santa Catarina.',
  };
}
