import { createJsonAdapter, registerAdapter } from './adapters'

registerAdapter(createJsonAdapter({
  id: 'demo-proof',
  url: '/api/demo-proof',
  timeoutMs: 2_500,
  rehearsal: {
    data: {
      latency: 612,
      throughput: 42,
      outcome: 'Validated on enterprise infrastructure',
    },
    collectedAt: '2026-01-15T12:00:00.000Z',
  },
}))
