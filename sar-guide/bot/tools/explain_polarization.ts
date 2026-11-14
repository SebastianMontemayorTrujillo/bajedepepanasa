import { defineTool } from '@grok/agent-sdk/tools';
import * as z from 'zod/v4';

export default defineTool({
  description:
    'Explain HH vs HV (and VV/VH for Sentinel/OPERA RTC) for flood and surface-water interpretation.',
  effect: 'read',
  execution: 'server',
  inputSchema: z.object({
    polarization: z.enum(['HH', 'HV', 'VV', 'VH', 'both']).default('both'),
    locale: z.enum(['en', 'es']).default('es'),
  }),
  async execute(input) {
    const en = {
      HH: 'Co-pol HH: smoother open water often appears darker or as a strong contrast against rough urban clutter depending on incidence; useful for channel and open-water contrast.',
      HV: 'Cross-pol HV: sensitive to volume scattering (vegetation, rough surfaces). Helps separate wet soil/canopy from smoother water when toggled against HH.',
      VV: 'VV (Sentinel/OPERA RTC): common co-pol for C-band; similar role to HH for open-water contrast.',
      VH: 'VH: cross-pol companion to VV; vegetation and roughness texture.',
    };
    const es = {
      HH: 'HH co-polar: el agua abierta lisa suele contrastar frente al clutter urbano; útil para cauce y agua abierta.',
      HV: 'HV cruzada: sensible a dispersión volumétrica (vegetación, rugosidad). Ayuda a separar suelo húmedo/dosel del agua más lisa al compararla con HH.',
      VV: 'VV (Sentinel/OPERA RTC): co-polar C-band; rol similar a HH para contraste de agua.',
      VH: 'VH: cruzada compañera de VV; textura de vegetación y rugosidad.',
    };
    const dict = input.locale === 'es' ? es : en;
    const keys =
      input.polarization === 'both'
        ? (['HH', 'HV'] as const)
        : ([input.polarization] as const);
    return {
      locale: input.locale,
      explanations: Object.fromEntries(keys.map((k) => [k, dict[k]])),
    };
  },
});
