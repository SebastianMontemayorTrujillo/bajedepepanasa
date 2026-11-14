import { defineTool } from '@grok/agent-sdk/tools';
import * as z from 'zod/v4';

export default defineTool({
  description:
    'Hypothesize physical drivers of surface-water change in Monterrey: rainfall, impermeable urban growth, reservoir/release, Santa Catarina channelization.',
  effect: 'read',
  execution: 'server',
  inputSchema: z.object({
    locale: z.enum(['en', 'es']).default('es'),
    focus: z
      .enum(['rainfall', 'urban', 'reservoir', 'channel', 'all'])
      .default('all'),
  }),
  async execute(input) {
    const all = {
      en: [
        {
          id: 'rainfall',
          text: 'Convective storms: radar still images water under cloud — compare GCOV after peak rain.',
        },
        {
          id: 'urban',
          text: 'Impermeable growth in Apodaca/Guadalupe/Santa Catarina raises runoff for the same rainfall.',
        },
        {
          id: 'reservoir',
          text: 'La Boca / Cerro Prieto / El Cuchillo releases can raise downstream water without local rain.',
        },
        {
          id: 'channel',
          text: 'Santa Catarina channelization stores less floodplain water — look for linear bright/dark corridors, then confirm with DSWx.',
        },
      ],
      es: [
        {
          id: 'rainfall',
          text: 'Tormentas convectivas: el radar imagina agua bajo nubes — compara GCOV tras el pico de lluvia.',
        },
        {
          id: 'urban',
          text: 'Crecimiento impermeable en Apodaca/Guadalupe/Santa Catarina eleva el escurrimiento con la misma lluvia.',
        },
        {
          id: 'reservoir',
          text: 'Descargas de La Boca / Cerro Prieto / El Cuchillo pueden elevar agua río abajo sin lluvia local.',
        },
        {
          id: 'channel',
          text: 'La canalización del Santa Catarina reduce almacenamiento en planicie — busca corredores lineales y confirma con DSWx.',
        },
      ],
    };
    const list = all[input.locale];
    return {
      locale: input.locale,
      hypotheses:
        input.focus === 'all'
          ? list
          : list.filter((h) => h.id === input.focus),
      disclaimer:
        input.locale === 'es'
          ? 'Hipótesis para discusión con Protección Civil — no es un pronóstico operativo.'
          : 'Hypotheses for discussion with Protección Civil — not an operational forecast.',
    };
  },
});
