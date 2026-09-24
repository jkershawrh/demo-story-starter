# Demo Story Starter Agent Guidance

- The `template/` directory is the canonical runtime. Do not create a second copy inside the skill.
- Keep story content in `src/demo.config.ts`, mechanics in components/scenes, and external I/O in live adapters.
- Preserve fixed Red Hat × Intel branding, locally bundled fonts, reduced-motion behavior, keyboard navigation, and honest fallback labels.
- Never call rehearsal or fixture data live.
- Run `npm run check` from `template/` after changes. Run visual tests when Chromium is available.
