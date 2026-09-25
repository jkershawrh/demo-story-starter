# Demo Story Starter

A reusable Red Hat × Intel interactive presentation system derived from the Triforce demo story arc. It combines a guided hero’s-journey schema, a React/Vite presentation runtime, reusable animated scenes, honest live-data fallback states, and a Codex authoring skill.

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

The scaffold is a standalone application. Start with `story.brief.yaml`, then replace the example in `src/demo.config.ts`; only add custom React scenes when the typed catalog cannot express the proof clearly.

The Codex skill accepts rough ideas, existing stories, architecture diagrams, technical documents, API definitions, or repositories. It normalizes these inputs into the story brief and evidence ledger before generating scenes.

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
- Punchline/CTA
- Custom React escape hatch

Configuration validation warns when stakes, proof, transformation, guided architecture, live proof, or explicit live-demo/guided-demo/lab handoffs are missing. By default, keep the presenter story to 5–7 minutes and no more than seven scenes; move deeper comparison and construction into the connected experiences.

`story.brief.yaml` is the checkpoint between source material and implementation. It records the audience decision, narrative tension, architecture elements, consequential assumptions, story beats, live systems, and an evidence classification for every material claim. Keep it with the generated demo so future revisions can distinguish proven behavior from intended behavior.

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

Successful responses display as `LIVE`. Failures display the fixture as `REHEARSAL`, or `OFFLINE` when the browser has no network. The runtime never labels fallback data as live and preserves the latest result for the browser session.

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
