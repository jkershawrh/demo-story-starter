# Architecture Storytelling

Architecture is a causal explanation, not an inventory.

Choose the view that best supports the audience's decision:

- `architecture`: a compact set of components and responsibilities.
- `architecture-flow`: the request or data path, including meaningful transitions.
- `architecture-layers`: responsibilities separated by platform or abstraction layer.
- `architecture-compare`: the structural change from current to proposed state.
- `trust-boundary`: security, ownership, network, or data-governance zones.
- `deployment-topology`: runtime placement across clusters, sites, or hardware pools.

Reveal the minimum architecture needed before the proof. Use stable audience language in labels and move implementation trivia into speaker prompts. Highlight the component that causes the outcome, the boundary where risk changes, and the telemetry that proves the system behaved as claimed.

The primary architecture view must also be technically credible. When the source is a deployed system, name the runtime objects that matter (for example Route/Ingress, Service, Deployment, broker, database, model endpoint), the protocol or API on each meaningful edge, ports when they clarify the boundary, control versus data/evidence paths, trust or namespace boundaries, optional integrations, and the human authority point. Audience-friendly labels may sit above these details, but must not replace them.

For failure-path stories, show the normal path first, then the failure boundary, fallback, and visible recovery evidence. Do not imply resiliency from a topology diagram alone.
