---
name: demo-story-builder
description: Create a standalone Red Hat × Intel React/Vite presentation demo from a narrative brief, using the demo-story-starter hero’s-journey schema, live-proof adapters, offline rehearsal fallbacks, and presenter controls. Use for new interactive preso demos; do not use for PowerPoint or ordinary product UIs.
metadata:
  short-description: Build a live narrative demo app
---

# Demo Story Builder

Create a new standalone presentation from the canonical `template/` in this repository. Never copy Triforce application code or invent a second starter.

## Workflow

1. Confirm the audience, desired decision, duration, core tension, verified proof points, live systems, and closing CTA. Infer only low-impact presentation wording.
2. Read [story-framework.md](references/story-framework.md) before outlining the acts.
3. Read [scene-catalog.md](references/scene-catalog.md) when mapping beats to scene types or adding a custom scene.
4. Read [brand-system.md](references/brand-system.md) before changing logos, colors, typography, or spacing.
5. Run the scaffold script from this repository:

   ```bash
   npm run scaffold -- <destination> --name <package-name> --title "<title>" --subtitle "<subtitle>"
   ```

6. Edit the generated `src/demo.config.ts`. Keep content, live adapters, and presentation mechanics separate.
7. For each live scene, add a typed adapter and a representative checked-in fixture. Fallback results must remain visibly labeled `REHEARSAL` or `OFFLINE`.
8. Use a custom React scene only when the catalog cannot express the proof clearly.
9. Run `npm run check`. When a browser is available, run `npx playwright install chromium` once and then `npm run test:visual`.
10. Deliver a rehearsal checklist covering endpoint health, fallback labels, fullscreen, keyboard/touch navigation, 1920×1080 layout, and offline assets.

## Non-negotiable constraints

- Preserve the fixed Red Hat × Intel lockup and locally hosted fonts.
- Do not publish unverified claims or silently substitute fallback data for live data.
- Preserve reduced-motion support, keyboard access, deep links, and narrow-screen rehearsal behavior.
- Add sources to externally verifiable statistics.
- Keep API credentials out of source and fixtures.
