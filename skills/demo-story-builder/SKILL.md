---
name: demo-story-builder
description: Convert architecture diagrams, repositories, technical documents, rough ideas, or existing stories into a standalone Red Hat × Intel React/Vite presentation demo, using the demo-story-starter hero’s-journey schema, live-proof adapters, offline rehearsal fallbacks, and presenter controls. Use for new interactive preso demos; do not use for PowerPoint or ordinary product UIs.
metadata:
  short-description: Build a live narrative demo app
---

# Demo Story Builder

Create a new standalone presentation from the canonical `template/` in this repository. Never copy Triforce application code or invent a second starter.

## Workflow

1. Identify the source mode: rough idea, existing story/deck, architecture image, technical document, API definition, or repository. Read [intake-and-conversion.md](references/intake-and-conversion.md) and inspect only the artifacts needed to understand the system and intended proof.
2. Confirm or infer the audience, desired decision, short-pitch duration, core tension, proof points, live systems, guided-demo depth, hands-on outcome, and closing CTA. Clearly mark consequential assumptions instead of silently filling them in.
3. Create `story.brief.yaml` from the canonical template before writing React. Read [evidence-ledger.md](references/evidence-ledger.md), classify every material claim, and separate observed behavior from aspiration.
4. Read [story-framework.md](references/story-framework.md), [journey-system.md](references/journey-system.md), and [progressive-proof-pattern.md](references/progressive-proof-pattern.md), then design the complete experience before converting the short story into acts. Make the audience's decision—not the component inventory—the organizing spine.
5. For architecture-heavy sources, read [architecture-storytelling.md](references/architecture-storytelling.md). Omit components that do not change the causal explanation, proof, risk, or decision.
6. Read [scene-catalog.md](references/scene-catalog.md) when mapping beats to scene types or adding a custom scene.
7. Read [brand-system.md](references/brand-system.md) before changing logos, colors, typography, or spacing.
8. Run the scaffold script from this repository:

   ```bash
   npm run scaffold -- <destination> --name <package-name> --title "<title>" --subtitle "<subtitle>"
   ```

9. Replace the generated example in `src/demo.config.ts` from the approved story brief. Keep content, live adapters, and presentation mechanics separate.
10. For each live scene, add a typed adapter and a representative checked-in fixture. Fallback results must remain visibly labeled `REHEARSAL` or `OFFLINE`. When proof requires multiple conditions or services, use `live-journey` so returned evidence activates the same architecture revealed in the story. Follow it with a changed condition, concise inline mechanism explanation, and `evidence-payoff`; the payoff must consume the current session's proof state.
11. Use a custom React scene only when the catalog cannot express the proof clearly.
12. Run `npm run check`. When a browser is available, run `npx playwright install chromium` once and then `npm run test:visual`.
13. Deliver the story brief, journey acceptance matrix, and rehearsal checklist covering endpoint health, fallback labels, fullscreen, presenter prompts, keyboard/touch navigation, 1920×1080 layout, journey handoffs, and offline assets.

## Non-negotiable constraints

- Preserve the fixed Red Hat × Intel lockup and locally hosted fonts.
- Do not publish unverified claims or silently substitute fallback data for live data.
- Do not hard-code quantitative demo metrics. Performance, latency, throughput, scale, confidence, and cost values must come from a typed live-infrastructure adapter in the current session; fallback values must remain visibly labeled rehearsal or offline.
- Preserve reduced-motion support, keyboard access, deep links, and narrow-screen rehearsal behavior.
- Add sources to externally verifiable statistics.
- Keep API credentials out of source and fixtures.
- Never turn a repository inventory into a component tour. Every included box must advance the story or validate the claim.
- Keep the presenter story to 5–7 minutes and no more than seven top-level scenes unless the user explicitly requires a different format.
- Treat presentation, live demonstration, guided demo, and hands-on lab as progressive depths of one journey. Preserve architecture, evidence, and source state between them.
