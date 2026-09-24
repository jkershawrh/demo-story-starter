# Intake and Conversion

Choose the source mode before outlining the presentation.

- **Rough idea or notes:** extract the audience, decision, tension, desired future state, and testable proof. Flag missing proof instead of manufacturing it.
- **Existing story or deck:** preserve the strongest tension and evidence, remove repetition, and remap content to the guided beats. Do not preserve slide order merely because it already exists.
- **Architecture image:** identify boundaries, actors, request/data paths, bottlenecks, trust transitions, and the component responsible for the claimed outcome. Ask for labels only when ambiguity changes the story.
- **Technical document:** distinguish requirements, current implementation, benchmark results, roadmap claims, and open questions.
- **API or schema:** identify the smallest request and response that demonstrates the claim, then design the live proof and its honest fixture.
- **Repository:** inspect entry points, contracts, deployment manifests, tests, and observability before low-level implementation. Prefer documented architecture over inferred coupling, and record discrepancies.

Normalize the source into `story.brief.yaml`. Keep source wording only when it is accurate, concise, and audience-appropriate.

## Conversion test

The result should answer, in order:

1. What reality does the audience recognize?
2. Why does it matter now?
3. What has been misunderstood?
4. What mechanism changes the outcome?
5. What can be observed or measured?
6. What are the limits and decision criteria?
7. What should the audience do next?

If a component does not help answer one of these questions, omit it from the main story. It may belong in a related journey or speaker prompt.
