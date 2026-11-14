import { defineTool } from '@grok/agent-sdk/tools';
import * as z from 'zod/v4';
import { OPERA_DSWX, OPERA_RTC } from '../lib/fixtures';

export default defineTool({
  description:
    'Search OPERA RTC-S1 and/or OPERA DSWx-HLS fallbacks for surface-water context when NISAR GCOV is sparse or for optical/water-extent cross-check.',
  effect: 'read',
  execution: 'server',
  inputSchema: z.object({
    product: z.enum(['rtc', 'dswx', 'both']).default('both'),
    before: z.string(),
    after: z.string(),
  }),
  async execute(input) {
    const rtc = input.product === 'dswx' ? [] : OPERA_RTC;
    const dswx = input.product === 'rtc' ? [] : OPERA_DSWX;
    return {
      mode: 'demo',
      window: { before: input.before, after: input.after },
      opera_rtc: rtc,
      opera_dswx: dswx,
      datasets: ['OPERA_L2_RTC-S1_V1', 'OPERA_L3_DSWX-HLS_V1'],
    };
  },
});
