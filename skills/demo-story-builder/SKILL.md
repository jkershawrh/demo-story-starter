---
name: demo-story-builder
description: Convert architecture diagrams, repositories, technical documents, rough ideas, or existing stories into a standalone Red Hat × Intel React/Vite presentation demo, using the demo-story-starter hero’s-journey schema, live-proof adapters, offline rehearsal fallbacks, and presenter controls. Use for new interactive preso demos; do not use for PowerPoint or ordinary product UIs.
metadata:
  short-description: Build a live narrative demo app
---

# Demo Story Builder

Create a new standalone presentation from the canonical `template/` in this repository. Never copy Triforce application code or invent a second starter.

## Workflow

1. Identify the source mode: rough idea, existing story/deck, architecture image, technical document, API definition, or repository. Read [intake-and-conversion.md](references/intake-and-conversion.md) and [discovery-blueprint.md](references/discovery-blueprint.md). For repositories, run the automated bootstrap command below. It performs deterministic discovery, scaffolds the app, installs the draft blueprint, initializes the story brief, and writes a review report. Verify its findings against contracts, deployment manifests, tests, observability, and implementation. Do not author scenes before `demo-blueprint.yaml` is reviewable.
2. Confirm or infer the audience, desired decision, short-pitch duration, core tension, proof points, live systems, guided-demo depth, hands-on outcome, and closing CTA. Clearly mark consequential assumptions instead of silently filling them in.
3. Complete `demo-blueprint.yaml` before `story.brief.yaml`. The blueprint is the source of truth for actors, runtime objects, boundaries, flows, operational pattern, evidence, decisions, and AI involvement. Validate it with `npm run validate:blueprint -- <path>`. Then create `story.brief.yaml`; read [evidence-ledger.md](references/evidence-ledger.md), classify every material claim, and separate observed behavior from aspiration.
4. Read [story-framework.md](references/story-framework.md), [journey-system.md](references/journey-system.md), and [progressive-proof-pattern.md](references/progressive-proof-pattern.md), then design the complete experience before converting the short story into acts. Make the audience's decision—not the component inventory—the organizing spine.
5. For architecture-heavy sources, read [architecture-storytelling.md](references/architecture-storytelling.md). Omit components that do not change the causal explanation, proof, risk, or decision.
6. Read [scene-catalog.md](references/scene-catalog.md) when mapping beats to scene types or adding a custom scene.
7. Read [brand-system.md](references/brand-system.md) before changing logos, colors, typography, or spacing.
8. For a repository or QuickStart, run the complete intake automation from this repository:

   ```bash
   npm run bootstrap -- <source-repository> <destination> \
     --name <package-name> --title "<title>" --subtitle "<subtitle>"
   ```

   Use `npm run scaffold` directly only for non-repository inputs. After bootstrap, read `discovery-review.md`, resolve every blocking unknown, promote verified items in `demo-blueprint.yaml`, and validate it. Automation may create a draft; it may never self-approve discovered claims.

9. Replace the generated example in `src/demo.config.ts` from the approved blueprint and story brief. Derive guided architecture from `architecture.flows`, the live journey from `operational_pattern`, and LLM scenes only from `ai_assessment`. Keep content, live adapters, and presentation mechanics separate.
10. For each live scene, add a typed adapter and a representative checked-in fixture. Fallback results must remain visibly labeled `REHEARSAL` or `OFFLINE`. When proof requires multiple conditions or services, use `live-journey` so returned evidence activates the same architecture revealed in the story. Follow it with a changed condition, concise inline mechanism explanation, and `evidence-payoff`; the payoff must consume the current session's proof state.
11. Use a custom React scene only when the catalog cannot express the proof clearly.
12. Run `npm run check`. When a browser is available, run `npx playwright install chromium` once and then `npm run test:visual`.
13. Visually rehearse the built experience at 1920×1080 and 1440×900. Click through every internal reveal—not only the top-level acts—and run every live condition. Reject any desktop scene that scrolls, any live result that replaces earlier evidence instead of building the case, and any architecture view that reveals boxes without first earning them through an audience question.
14. Deliver the story brief, journey acceptance matrix, and rehearsal checklist covering endpoint health, fallback labels, fullscreen, presenter prompts, keyboard/touch navigation, 1920×1080 layout, journey handoffs, and offline assets.
15. When the user requests a lab rather than only a presentation, follow `docs/lab-factory-roadmap.md` through contract-first lab implementation, Showroom verification, measured resources, immutable Linux AMD64 workload and presentation images, SBOM/signature/provenance/scan/pull evidence, and zero-residue development proof. Read [launchpad-handoff.md](references/launchpad-handoff.md), create `handoff/launchpad-handoff.yaml`, and validate it. Stop at the handoff boundary: Launchpad independently owns source approval, trusted rendering, live seat certification, capacity graduation, promotion, and publication.
16. For an Agentic 601 or auto-remediation request, preserve the roadmap's Signal → Decision → Action → Validate → Learn loop and reversible authority ladder. Require class-specific evaluation, calibrated confidence, deterministic policy, immutable action/validation evidence, sandboxed least-privilege execution, rollback, human-owned promotion, and automatic demotion. Mark GCL, immutable ledger, agent passport, and `rossoctl` as research concepts unless authoritative product and implementation sources are attached; treat OpenShell support status as release-specific.
17. When a story or lab includes cost, risk, operational-value, or ROI claims, keep experience telemetry, VEF value evidence, and GTM attribution separate. Validate the claim against the pinned `vef.claim.v1alpha2` contract with `npm run validate:vef-adapter`. Structured benchmark sources must retain URL, locator, geography, effective and retrieval dates, unit, transformation, confidence, and validation state. The skill may package a candidate claim but may not upgrade confidence, grant financial approval, or publish it as accepted value evidence.

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
- Match the Triforce cadence: one sparse claim per opening beat; challenge then technical answer in architecture; live infrastructure responses accumulated into an inspectable evidence case; a payoff populated only from the current session.
- Desktop presentation scenes must fit inside one viewport without page scrolling. Narrow rehearsal views may scroll.
- A live topology is a narrated path, not a static diagram. Advance one meaningful boundary per click; at every step show what is happening, why that boundary matters, and the live measurement or decision produced there.
- For agentic demos, distinguish the agent journey, workload/data flow, and LLM role. Show whether the LLM actually participated, its configured identity when available, and the exact boundary on its evidence and action authority.
- Never infer auto-remediation authority from model confidence alone. Authority is scoped to a versioned condition class, runbook, target, environment, and blast radius, and must be revocable.
- End with one deliberate guided handoff and an explicit `Close presentation` control. Do not replace a close with a menu of competing demo depths.
- Discovery precedes storytelling. Never force a repository into Triforce's domain flow; preserve Triforce's evidence-led cadence while deriving operational steps from the source system.
- Do not add an LLM to make a demo sound intelligent. Show an LLM only when repository evidence establishes its runtime role, inputs, outputs, model identity, authority, and fallback behavior.
