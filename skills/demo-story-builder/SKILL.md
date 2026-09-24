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
2. Confirm or infer the audience, desired decision, duration, core tension, proof points, live systems, and closing CTA. Clearly mark consequential assumptions instead of silently filling them in.
3. Create `story.brief.yaml` from the canonical template before writing React. Read [evidence-ledger.md](references/evidence-ledger.md), classify every material claim, and separate observed behavior from aspiration.
4. Read [story-framework.md](references/story-framework.md), then convert the brief into acts. Make the audience's decision—not the component inventory—the organizing spine.
5. For architecture-heavy sources, read [architecture-storytelling.md](references/architecture-storytelling.md). Omit components that do not change the causal explanation, proof, risk, or decision.
6. Read [scene-catalog.md](references/scene-catalog.md) when mapping beats to scene types or adding a custom scene.
7. Read [brand-system.md](references/brand-system.md) before changing logos, colors, typography, or spacing.
8. Run the scaffold script from this repository:

   ```bash
   npm run scaffold -- <destination> --name <package-name> --title "<title>" --subtitle "<subtitle>"
   ```

9. Replace the generated example in `src/demo.config.ts` from the approved story brief. Keep content, live adapters, and presentation mechanics separate.
10. For each live scene, add a typed adapter and a representative checked-in fixture. Fallback results must remain visibly labeled `REHEARSAL` or `OFFLINE`.
11. Use a custom React scene only when the catalog cannot express the proof clearly.
12. Run `npm run check`. When a browser is available, run `npx playwright install chromium` once and then `npm run test:visual`.
13. Deliver the story brief and a rehearsal checklist covering endpoint health, fallback labels, fullscreen, keyboard/touch navigation, 1920×1080 layout, and offline assets.

## Non-negotiable constraints

- Preserve the fixed Red Hat × Intel lockup and locally hosted fonts.
- Do not publish unverified claims or silently substitute fallback data for live data.
- Preserve reduced-motion support, keyboard access, deep links, and narrow-screen rehearsal behavior.
- Add sources to externally verifiable statistics.
- Keep API credentials out of source and fixtures.
- Never turn a repository inventory into a component tour. Every included box must advance the story or validate the claim.
