# Progressive Proof Pattern

Use this pattern when the audience must understand and trust a technical system before entering a lab. It is derived from the repeatable structure shared by Triforce and Deepfield Multimodal, not from either project's domain copy or component names.

## The pre-lab contract

The experience must answer these questions in order:

1. **Why should I care?** Establish a recognizable reality, measurable stakes, root cause, and reframe.
2. **Why is the system shaped this way?** Reveal architecture causally. Ask a question, let the room reason, then reveal the component, runtime object, protocol, and boundary that answer it.
3. **Does it actually run?** Execute the smallest real workflow that proves the central claim. Keep the revealed architecture visible and activate its path as results arrive.
4. **Does the claim survive change?** Change input, task, hardware, load, failure, or policy. Show the decision boundary and limitation, not merely a winner.
5. **Why did it behave that way?** Explain the optimization, policy, or operating mechanisms inline, at the depth needed to make the observed result understandable and repeatable.
6. **What did we prove here?** Build the payoff from evidence generated in the current session. Never substitute a memorized number or static success statement.
7. **What depth comes next?** Offer live, guided, lab, or platform inspection as continuations of the same system and evidence—not unrelated destinations.

## Continuous journey state

Architecture, proof results, source labels, selected conditions, and completed checkpoints form one journey state. Preserve them across acts and deeper modules. A lab begins with context the presentation already earned.

Required state:

- current act, scene, and internal reveal step;
- completed proof steps and returned evidence;
- `LIVE`, `REHEARSAL`, or `OFFLINE` source state and collection time;
- selected comparison condition;
- completed guided prerequisites.

## Modes, not separate products

One deployment may expose several depths:

- **Story:** presenter-paced, five to seven minutes, no more than seven top-level scenes.
- **Guided:** audience questions, controlled reveals, and explicit checkpoints.
- **Live/manual:** operator runs the real workflow and changes a condition.
- **Auto:** optional backend-orchestrated journey with streaming events and pause points.
- **Lab:** participants construct, break, and qualify the pattern.
- **Platform:** inspect runtime objects, health, events, and evidence.

Do not make each depth restart the explanation. They share architecture and evidence and progressively disclose more control.

## Scene compression

Triforce's cold open contains many internal beats, but they do not need to become many top-level scenes. Use a scene's internal reveals for sourced stakes and synthesis. Reserve top-level scenes for changes in the audience's question.

The canonical seven-scene budget is:

1. cold open and stakes;
2. reframe and promise;
3. guided causal architecture;
4. live workflow with at least two conditions;
5. comparison, scale, failure, or tradeoff trial;
6. inline mechanism explanation;
7. evidence-derived payoff and handoff.

## Acceptance checks

- The architecture can be stepped through before it is run.
- The live proof activates the same architecture, not a separate decorative diagram.
- At least one consequential condition changes.
- A limitation or failure boundary is visible.
- Mechanisms are explained before the payoff without sending the audience into a side journey.
- The payoff changes based on session evidence or explicitly says proof has not run.
- The lab continues the established journey instead of starting a new one.
- Every performance, latency, throughput, scale, confidence, and cost metric comes from the live infrastructure in the current session. Fallback fixtures remain labeled rehearsal or offline and are never described as measured live results.
