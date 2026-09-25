# Complete Demo Journey

Design four connected depths before authoring scenes. They may share one
environment, but they do not serve the same audience behavior.

| Depth | Default duration | Purpose | Exit condition |
|---|---:|---|---|
| Presenter story | 5–7 minutes | Establish tension, reveal architecture, run the smallest proof, and state the transformation | The room understands the claim and chooses what to inspect next |
| Live demonstration | 5–10 minutes | Change an input or condition and inspect observable evidence | The claim survives comparison without hiding source state or limits |
| Guided demo | 20–35 minutes | Trace components, trust boundaries, evidence, and operating surfaces with an instructor | Participants can explain who owns each claim and boundary |
| Hands-on lab | 60–90 minutes | Extend, break, qualify, and communicate the pattern | Participants leave with a reviewable artifact |

## Journey acceptance matrix

Use red, amber, and green status during authoring:

- **Presentation length:** red above ten scenes; amber at eight to ten; green at seven or fewer.
- **Architecture:** red for a static inventory; amber for unexplained animation; green when each reveal answers an audience question and identifies responsibility and boundary.
- **Proof:** red when fixtures appear live; amber when fallback is honest but disconnected; green when source state is explicit and proof leads into a workspace.
- **Guided experience:** red when no instructor path exists; amber when commands and diagrams are disconnected; green when the guide connects UI, evidence, architecture, and platform resources.
- **Lab:** red for a read-only tour; amber for edits without qualification; green when the learner builds, tests failures, qualifies behavior, and produces a takeaway artifact.
- **Handoff:** red when the presentation simply ends; amber for a vague CTA; green when the finale names the next depth, duration, and destination.

Any red row blocks release. Amber is acceptable only for an internal rehearsal
with the limitation stated before the run.

## Architecture interaction

The primary architecture act should normally use `guided-architecture`.
Sequence each layer as:

1. Ask the audience-facing question.
2. Pause and invite an answer.
3. Reveal the component and its responsibility.
4. Name its boundary, failure behavior, or authority limit.
5. Connect it causally to the next question.

Do not place every repository component in this sequence. Include a component
only if it changes the causal explanation, proof, risk, or audience decision.
