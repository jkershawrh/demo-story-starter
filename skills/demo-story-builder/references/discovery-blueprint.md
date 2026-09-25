# Discovery Blueprint

`demo-blueprint.yaml` is the contract between source discovery and presentation authoring. It records what the system actually does before anyone chooses scenes, copy, or animation.

## Discovery order

1. Read the repository's purpose, entry points, contracts, manifests, tests, and operations documentation.
2. Inventory actors, runtime objects, external dependencies, boundaries, protocols, and observable evidence.
3. Trace the important request, event, data, evidence, decision, and human-authority paths end to end.
4. Identify the operational pattern in the system's own language. Do not assume every project follows detect → investigate → decide.
5. Assess whether AI participates. Distinguish deterministic logic, classical ML, embeddings, agents, and generative LLMs.
6. Record discrepancies and unknowns. Generated discoveries are candidates until a source or owner verifies them.
7. Choose the smallest audience decision and proof that the discovered system can honestly support.

## Required blueprint sections

- `source`: repository identity, revision, discovery time, inspected artifacts, and unresolved discrepancies.
- `intent`: users, workload, recognized problem, audience decision, and desired outcome.
- `architecture`: actors, runtime objects, boundaries, dependencies, and typed flows with protocols and evidence points.
- `operational_pattern`: the domain-specific sequence that operators or data actually follow, including the changed condition and close.
- `evidence`: available observations, provenance, source state, collection mechanism, and the claim each item can support.
- `decisions`: deterministic policies, decision owners, fail-closed behavior, and human authority.
- `ai_assessment`: whether AI is needed, what kind, exact role, inputs, outputs, model/hardware identity when observable, evidence access, action authority, and fallback.
- `story_mapping`: candidate beats and diagrams derived from the blueprint. This section is downstream guidance, not source evidence.

## Diagram derivation

Generate diagrams from typed flows, not from a manually arranged box inventory.

- Architecture view: nodes participating in the selected causal explanation.
- Flow view: ordered edges for one named request, event, or evidence path.
- Trust view: boundaries crossed by sensitive data, authority, or external calls.
- Live view: the same flow with current-session source state, evidence, latency, and decisions.
- AI view: model input, retrieved context, prompt boundary, output, deterministic checks, and human review.

Every visible edge needs a source node, target node, purpose, and—when known—protocol. Every live result needs an evidence identifier and collection source.

## AI necessity test

Set `needed: false` when deterministic rules, search, metrics, or ordinary application logic fully produce the claimed outcome. Set it to `true` only when the demonstrated outcome depends on AI behavior. If AI is optional, mark it optional and make the non-AI decision path visible.

For generative models, answer all of the following before creating an LLM scene:

1. What exact task is delegated to the model?
2. What prompt and evidence can it see?
3. What output is accepted?
4. What validates or constrains that output?
5. Can it execute actions, or only explain/recommend?
6. Who owns the final decision?
7. What happens when the model is unavailable or wrong?

An unanswered authority question blocks release of an agentic story.

## Status model

- `discovered`: inferred by deterministic repository inspection.
- `verified`: confirmed by a source artifact or live observation.
- `assumed`: supplied to keep discovery moving; must be called out.
- `unknown`: intentionally unresolved.
- `excluded`: accurate but not relevant to the audience decision.

The discovery script creates candidates, never final truth. Review and promote each material item before building the presentation.
