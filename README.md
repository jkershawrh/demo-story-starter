# Demo Story Starter

A reusable Red Hat × Intel interactive presentation system derived from the Triforce demo story arc. It combines a guided hero’s-journey schema, a React/Vite presentation runtime, reusable animated scenes, honest live-data fallback states, and a Codex authoring skill.

Its central pattern is **discovery-led progressive proof**: repository or QuickStart → verified demo blueprint → story → guided causal architecture → live workflow → changed condition or scale trial → inline mechanism explanation → evidence-derived payoff → close → optional lab handoff. Triforce supplies the cadence; each source system supplies its own architecture and operational pattern.

For complete lab creation—not only the presentation—use the [lab factory roadmap](docs/lab-factory-roadmap.md). It organizes the portfolio into Agentic AI, Sovereign AI, and Virtualization + AI tracks and defines the gates from repository discovery through immutable images and a fail-closed Launchpad handoff. The [immutable candidate index](docs/immutable-candidate-index.md) records the exact factory artifacts currently available for independent Launchpad intake. Launchpad certification and publication remain independent downstream actions.

The [catalog portfolio v2](docs/catalog-portfolio-v2.md) turns that roadmap into a validated, machine-readable inventory. It separates track, usage, learning level, and experience type; generates zero-authority intake bundles; preserves existing Launchpad IDs in a migration map; and provides an offline [catalog preview](preview/catalog/index.html). Run `npm run generate:catalog` after editing the portfolio and `npm run verify:catalog-generated` before committing.

Value claims use a separate fail-closed lane. The factory vendors and pins the
canonical `vef.claim.v1alpha2` contract plus the exact Launchpad adapter
revision in
[`contracts/vef/launchpad-adapter-conformance.yaml`](contracts/vef/launchpad-adapter-conformance.yaml).
Run `npm run validate:vef-adapter` to verify the pin and fixture locally. This
validation never grants certification, promotion, publication, or financial
approval.

## Quick start

```bash
cd template
npm install
npm run dev
```

Open `http://localhost:5173`. Click the stage, use Space/Right Arrow to advance, Left Arrow to go back, Home to restart, `P` for presenter prompts, or `F` to enter fullscreen.

## Create a new demo

From the repository root:

```bash
npm run scaffold -- ../my-demo \
  --name my-demo \
  --title "The decision your audience must make" \
  --subtitle "A Red Hat × Intel live story"
cd ../my-demo
npm install
npm run check
```

The scaffold is a standalone application. Start with `demo-blueprint.yaml`, then author `story.brief.yaml` and replace the example in `src/demo.config.ts`; only add custom React scenes when the typed catalog cannot express the proof clearly.

The Codex skill accepts rough ideas, existing stories, architecture diagrams, technical documents, API definitions, or repositories. It first normalizes the source into a verified architecture, operational pattern, evidence inventory, decision model, and AI-necessity assessment. The story brief and scenes are downstream products of that blueprint.

For a repository or QuickStart, automate intake, discovery, and scaffolding:

```bash
npm run bootstrap -- /path/to/source ../source-demo \
  --name source-demo \
  --title "The decision this system proves" \
  --subtitle "Red Hat × Intel interactive demo"
```

The command scaffolds the standalone app, runs repository discovery, installs the resulting `demo-blueprint.yaml`, initializes `story.brief.yaml`, and writes `discovery-review.md` with detected artifacts, unresolved decisions, and the required verification sequence. Discovery identifies candidates and AI signals; it never promotes them to truth. Review the draft against contracts, manifests, tests, implementation, and live observations before changing its status from `draft`.

Lower-level discovery and validation commands remain available when needed:

```bash
npm run discover -- /path/to/source /tmp/demo-blueprint.discovered.yaml
npm run validate:blueprint -- /path/to/demo-blueprint.yaml
```

## Author the story

`DemoConfig` separates narrative content from presentation mechanics. Acts contain scenes, and each scene declares its hero’s-journey beat. The starter includes:

- Branded intro
- Metric hero
- Quote/claim with citation
- Statistic grid
- Problem/reframe
- Architecture reveal
- Guided question-and-answer architecture reveal
- Request/data-flow architecture
- Layered architecture
- Before/after architecture
- Trust and security boundaries
- Deployment topology
- Sequential pipeline
- Live-proof panel
- Comparison/benchmark
- Scale progression
- Tradeoff/decision
- Inline mechanism explanation
- Evidence-derived payoff from the current browser session
- Punchline/CTA
- Custom React escape hatch

Configuration validation warns when stakes, proof, transformation, guided architecture, live proof, or explicit live-demo/guided-demo/lab handoffs are missing. By default, keep the presenter story to 5–7 minutes and no more than seven scenes; move deeper comparison and construction into the connected experiences.

`demo-blueprint.yaml` is the checkpoint between source discovery and storytelling. It records the actors, runtime objects, typed flows, boundaries, operational pattern, evidence, decisions, and exact AI/LLM role. `story.brief.yaml` then records the audience decision and narrative compression chosen from that verified foundation. Keep both with the demo so future revisions can distinguish source truth, interpretation, and intended behavior.

## Connect live data

Register a typed adapter in `src/live/` and reference its `id` from a `live-proof` scene. An adapter defines a bounded timeout, a cancellable loader, and a checked-in rehearsal fixture.

```ts
registerAdapter(createJsonAdapter({
  id: 'latency-proof',
  url: '/api/metrics',
  timeoutMs: 5000,
  rehearsal: {
    data: { latency: 612 },
    collectedAt: '2026-01-15T12:00:00Z',
  },
}))
```

Successful responses display as `LIVE`. Failures display the fixture as `REHEARSAL`, or `OFFLINE` when the browser has no network. The runtime never labels fallback data as live and preserves the latest result for the browser session. An `evidence-payoff` scene reads that state so the close reflects what the audience actually ran; if nothing ran, it says so.

Quantitative demo metrics—performance, latency, throughput, scale, confidence, and cost—must come from the live infrastructure adapter during the current session. Do not place those numbers in scene configuration. Rehearsal fixtures are continuity aids, not live measurements, and retain their visible source label throughout the payoff.

Keep credentials in deployment secrets or a backend proxy—never in the browser config or fixtures.

## Branding and assets

The v1 visual identity is fixed to Red Hat × Intel. Approved logos and Red Hat Display/Text/Mono fonts are bundled under `template/public/` so the production build works without internet access. Replace logo files only with approved assets of the same brands; do not redraw, distort, or recolor them.

## Test and build

```bash
cd template
npm run test             # schema, scenes, navigation, live/fallback behavior
npm run build            # TypeScript + production Vite build
npm run verify:offline   # fonts and logos present locally
npx playwright install chromium
npm run test:visual      # 1920×1080, 1440×900, and mobile rehearsal views
```

`npm run check` runs unit tests, build, and offline verification.

## Deploy

Static hosting requires SPA fallback to `index.html`. A production `Containerfile` and unprivileged nginx configuration are included:

```bash
podman build --platform linux/amd64 -t demo-story:latest .
podman run --rm -p 8080:8080 demo-story:latest
```

The output in `dist/` can also be served from OpenShift, object storage, Pages, or any static host that supports fallback routing.

## Install the Codex skill

From the repository root:

```bash
npm run install-skill
```

This creates a symlink from the canonical repository skill into `${CODEX_HOME:-~/.codex}/skills/demo-story-builder`, preventing the skill instructions from drifting from the starter. Invoke it with `$demo-story-builder` or ask Codex to create a Red Hat × Intel live presentation demo.

## Rehearsal checklist

- Confirm every statistic has an approved citation.
- Exercise every live endpoint, then deliberately test its fallback.
- Confirm fallback badges read `REHEARSAL` or `OFFLINE`.
- Test Space, arrows, Home, touch swipe, restart, deep links, and fullscreen.
- Review at 1920×1080 and 1440×900.
- Run the production build without internet access.
- Keep a direct URL for each critical proof scene.
