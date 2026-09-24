import type { DemoConfig } from './types'

export const demoConfig: DemoConfig = {
  id: 'enterprise-ai-proof',
  title: 'Build the proof, not just the pitch',
  subtitle: 'A reusable Red Hat × Intel live-demo story',
  event: 'Customer briefing',
  audience: 'Enterprise technology leaders',
  cta: 'Turn the claim into a live, measurable decision.',
  brand: {
    primary: { name: 'Red Hat', logo: '/logos/redhat.svg', alt: 'Red Hat' },
    partner: { name: 'Intel', logo: '/logos/intel.png', alt: 'Intel' },
    attribution: 'Red Hat × Intel',
  },
  acts: [
    {
      id: 'story', label: '00', title: 'The Stakes', scenes: [
        { id: 'intro', type: 'intro', beat: 'ordinary-world', title: 'Build the proof, not just the pitch', subtitle: 'A reusable Red Hat × Intel live-demo story' },
        { id: 'stakes', type: 'metric', beat: 'stakes', eyebrow: 'The stakes', value: '80%+', label: 'of ambitious technology stories lose the room before the proof', tone: 'danger', citation: { label: 'Replace with a verified source for your story' } },
        { id: 'root', type: 'quote', beat: 'root-cause', title: 'The problem is not the technology', quote: 'The audience cannot see themselves crossing the gap between the claim and the result.', attribution: 'Demo Story principle' },
        { id: 'reframe', type: 'reframe', beat: 'reframe', title: 'Reframe the presentation', before: 'A sequence of feature slides', after: 'A decision the audience experiences', detail: 'Every claim earns a visible mechanism, proof, and honest tradeoff.' },
      ],
    },
    {
      id: 'system', label: '01', title: 'The System', scenes: [
        { id: 'architecture', type: 'architecture', beat: 'system-reveal', eyebrow: 'System reveal', title: 'One story runtime, three separable layers', body: 'Content, presentation mechanics, and live integrations stay independently replaceable.', nodes: [
          { id: 'story-schema', label: 'Story schema', detail: 'Acts, beats, scenes', tone: 'primary' },
          { id: 'runtime', label: 'Presentation runtime', detail: 'Navigation, motion, accessibility', tone: 'partner' },
          { id: 'proof', label: 'Proof adapters', detail: 'Live data with honest fallback', tone: 'success' },
        ] },
        { id: 'pipeline', type: 'pipeline', beat: 'system-reveal', title: 'The audience follows a causal chain', steps: [
          { label: 'Tension', detail: 'Why change?' }, { label: 'Mechanism', detail: 'How it works' }, { label: 'Proof', detail: 'Show it running' }, { label: 'Decision', detail: 'What to do next' },
        ] },
      ],
    },
    {
      id: 'proof', label: '02', title: 'Live Proof', scenes: [
        { id: 'live', type: 'live-proof', beat: 'live-proof', eyebrow: 'Live proof', title: 'Measure the claim in front of the audience', body: 'This example intentionally falls back to a checked-in rehearsal fixture when no API is configured.', adapterId: 'demo-proof', cta: 'Run live proof', resultFields: [
          { key: 'latency', label: 'Latency', suffix: 'ms' }, { key: 'throughput', label: 'Throughput', suffix: '/s' }, { key: 'outcome', label: 'Outcome' },
        ] },
        { id: 'comparison', type: 'comparison', beat: 'trials', title: 'Show the tradeoff, not just the winner', columns: [
          { label: 'Before', value: 'Static claim', detail: 'Easy to present, hard to trust', tone: 'danger' },
          { label: 'After', value: 'Measured proof', detail: 'Observable, repeatable, honest', tone: 'success' },
        ] },
        { id: 'scale', type: 'scale', beat: 'trials', title: 'Move from moment to system', stages: [
          { label: 'One request', value: 'Proof', detail: 'Can it work?' }, { label: 'One workflow', value: 'Confidence', detail: 'Does it fit?' }, { label: 'At scale', value: 'Decision', detail: 'Is it durable?' },
        ] },
        { id: 'tradeoff', type: 'tradeoff', beat: 'trials', title: 'Make the choice explicit', options: [
          { title: 'Live', strength: 'Maximum credibility', tradeoff: 'Depends on services and venue connectivity.' },
          { title: 'Rehearsal', strength: 'Reliable delivery', tradeoff: 'Must be visibly labeled and timestamped.' },
        ], decision: 'Prepare both. Never disguise rehearsal data as live.' },
      ],
    },
    {
      id: 'payoff', label: '03', title: 'The Payoff', scenes: [
        { id: 'punchline', type: 'punchline', beat: 'transformation', eyebrow: 'The transformation', line1: 'The audience does not remember every feature.', line2: 'They remember the moment the claim became real.', cta: 'Build the next story →' },
      ],
    },
  ],
  relatedStories: [
    { title: 'Secure AI', question: 'Can the proof include sensitive data?', technology: 'Confidential computing · Attestation · Policy' },
    { title: 'AI at Scale', question: 'Can the result survive production load?', technology: 'OpenShift · Routing · Observability' },
  ],
}
