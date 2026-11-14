import { defineEval } from '@grok/agent-sdk/evals';

export default defineEval({
  tags: ['smoke'],
  description: 'Polarization tool returns HH/HV explanations.',
  async test(t) {
    await t.send(
      'Use explain_polarization for HH and HV in Spanish (locale es).',
    );
    t.succeeded();
    t.calledTool('explain_polarization');
  },
});
