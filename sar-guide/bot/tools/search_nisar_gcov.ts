import { defineTool } from '@grok/agent-sdk/tools';
import * as z from 'zod/v4';
import { DEFAULT_AOI, NISAR_GCOV } from '../lib/fixtures';

export default defineTool({
  description:
    'Search NISAR L2 GCOV granules for Monterrey/NE Mexico. Uses curated demo fixtures when live ASF/Earthdata is unavailable. Search metadata does not require Earthdata Login; downloads do.',
  effect: 'read',
  execution: 'server',
  inputSchema: z.object({
    before: z.string().describe('ISO date YYYY-MM-DD'),
    after: z.string().describe('ISO date YYYY-MM-DD'),
    west: z.number().optional(),
    south: z.number().optional(),
    east: z.number().optional(),
    north: z.number().optional(),
  }),
  async execute(input) {
    const aoi = {
      west: input.west ?? DEFAULT_AOI.west,
      south: input.south ?? DEFAULT_AOI.south,
      east: input.east ?? DEFAULT_AOI.east,
      north: input.north ?? DEFAULT_AOI.north,
    };
    return {
      mode: 'demo',
      dataset: 'NISAR_L2_GCOV_PROVISIONAL_V1',
      aoi,
      window: { before: input.before, after: input.after },
      granules: NISAR_GCOV,
      note: 'Live ASF search: platform=NISAR processingLevel=GCOV. Earthdata short_name NISAR_L2_GCOV_PROVISIONAL_V1.',
    };
  },
});
