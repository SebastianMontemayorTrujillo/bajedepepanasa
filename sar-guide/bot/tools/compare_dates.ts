import { defineTool } from '@grok/agent-sdk/tools';
import * as z from 'zod/v4';
import { NISAR_GCOV, OPERA_DSWX } from '../lib/fixtures';

export default defineTool({
  description:
    'Compare before/after dates for Monterrey flood context using demo GCOV + DSWx scenes.',
  effect: 'read',
  execution: 'server',
  inputSchema: z.object({
    before: z.string(),
    after: z.string(),
  }),
  async execute(input) {
    return {
      before: {
        date: input.before,
        gcov: NISAR_GCOV[0],
        narrative_en:
          'Baseline channel signature along Santa Catarina; limited peri-urban wet pockets.',
        narrative_es:
          'Firma basal del cauce del Santa Catarina; pocos bolsones húmedos periurbanos.',
      },
      after: {
        date: input.after,
        gcov: NISAR_GCOV[1],
        dswx: OPERA_DSWX[0],
        narrative_en:
          'Brighter HH corridor and DSWx water class expansion — consistent with storm runoff / wet pavement.',
        narrative_es:
          'Corredor HH más brillante y expansión de clase de agua DSWx — consistente con escurrimiento / pavimento húmedo.',
      },
      compare_hint:
        'Toggle HH vs HV and opacity-compare GCOV before/after; overlay OPERA DSWx for extent.',
    };
  },
});
