# Red Hat × Intel lab factory roadmap

## Purpose

This roadmap governs how candidate repositories become a verified presentation,
an orderable hands-on lab, and an immutable artifact bundle that can be handed to
the Launchpad team for onboarding and certification.

It is deliberately separate from the Launchpad product-delivery roadmap.
Launchpad owns catalog approval, trusted rendering, live seat certification,
capacity graduation, promotion, and publication. This repository owns discovery,
story conversion, lab construction, local verification, immutable image creation,
and a source-bound handoff package.

## Portfolio model

The portfolio has three equal technical tracks. Shared platform and inference
foundations feed all three; industry scenarios layer across them.

### Agentic AI

Agentic AI is the established end-to-end track. The 101 row remains a proposal
that must prove it adds a distinct learner outcome beyond shared CPU Inference
101. Agentic 401 is already inside Launchpad: its draft catalog item, onboarding
contract, digest-pinned workload and presentation, certification contract, and
Flightpath one-seat `GREEN-live` 100/100 result exist. It is not yet active or
generally orderable; Launchpad still owns its remaining capacity, reclaim,
operational, promotion, and publication gates. Agentic 501 and 601 now have
factory-built, signed, digest-pinned workload and presentation candidates plus
zero-seat handoffs. Their existence does not waive prerequisite certification:
501 remains blocked on 401, and 601 remains blocked on both 401 and 501.

| Level | Catalog journey | Current state | Intended outcome |
|---|---|---|---|
| 101 | Understand Agentic Workflows | planned | Trace prompt, model, tool, evidence, policy, and human authority. |
| 201 | Build an AI Agent on Intel Xeon 6 | active in Launchpad | Build one agent with MCP tools and CPU inference. |
| 301 | Build Multi-Agent AI Systems with Open Protocols | active in Launchpad | Engineer the shared multi-agent blueprint. |
| 401 | Operate Evidence-Backed Multi-Agent Systems | Launchpad draft; one-seat GREEN-live | Govern, observe, deny, recover, and make a controlled change. |
| 501 | Scale and Certify Agentic Systems | immutable factory candidate; zero-seat handoff | Prove capacity, resilience, quality, and repeatability. |
| 601 | Earn the Right to Act | immutable research candidate; zero-seat handoff | Promote a measured agent from recommendation to bounded auto-remediation through evidence, confidence, validation, and revocable governance. |

#### Agentic AI 601 — earned auto-remediation

Agentic 601 closes the loop from observation to governed action. It is not a
generic “fully autonomous” lab and it does not grant authority based on model
confidence alone. The learner must prove that a narrowly classified condition
can be detected, explained, acted on inside a declared blast radius, validated,
learned from, and immediately suspended when evidence or policy degrades.

The canonical loop is:

1. **Signal** — collect the event, context, provenance, topology, health,
   business impact, and prior outcome without mutating the target.
2. **Decision** — classify and extract the condition; retrieve approved
   evidence; calculate calibrated confidence; evaluate deterministic policy;
   and choose `abstain`, `recommend`, `request approval`, or `act`.
3. **Action** — execute one versioned, idempotent, reversible runbook through a
   short-lived, least-privilege identity and a sandboxed tool boundary.
4. **Validate** — verify the expected state change, service health, policy
   compliance, side effects, and rollback trigger using evidence independent of
   the action request.
5. **Learn** — append the complete outcome, reviewer disposition, false-positive
   or false-negative classification, and policy/runbook version; update
   evaluation sets and confidence calibration offline rather than allowing the
   production agent to rewrite its own authority.

The authority ladder must be explicit and reversible:

| Stage | Permitted behavior | Promotion evidence |
|---|---|---|
| Observe | Read-only collection and extraction | provenance completeness, classification coverage, no mutation path |
| Recommend | Produce a proposed runbook and expected result | offline eval accuracy, calibrated confidence, policy result, human review |
| Shadow | Evaluate the recommendation against the real event without execution | agreement rate, abstention quality, false-positive/negative analysis |
| Approve | Execute only after named human approval | single-use authorization, least privilege, idempotency, rollback proof |
| Bounded auto-remediation | Act only on approved classes inside a fixed blast radius | sustained precision, validation success, recovery SLO, zero unauthorized action |
| Suspend or demote | Remove authority automatically when a gate fails | policy violation, drift, missing evidence, failed validation, or confidence decay |

Required data and tracking include immutable event and workload identity;
correlation IDs from signal through validation; raw and normalized signal;
classification label and taxonomy version; extracted entities; evidence IDs and
provenance; model, prompt, tool, runbook, policy, and evaluation-set versions;
calibrated confidence and abstention reason; requested and granted authority;
approver or auto-policy identity; action parameters; before/after state;
validation and rollback results; latency, resource, and cost measures; reviewer
disposition; and the learning-set update receipt. Accuracy must be reported by
class and consequence—not only as one aggregate score.

Promotion is fail closed. A class may advance only when its versioned evaluation
set proves agreed thresholds for precision, recall, extraction accuracy,
calibration error, abstention quality, policy compliance, successful validation,
bounded recovery, and zero unauthorized actions. Promotion applies to one
condition, runbook, target class, environment, and blast radius. It does not
transfer automatically to another incident or tool. Every grant is time-bound,
auditable, revocable, and independently reviewed.

##### Technology alignment and research boundary

Use supported or documented Red Hat-aligned capabilities where they fit:

- Red Hat OpenShift for namespace, RBAC, admission, NetworkPolicy, quotas,
  operators, jobs, and controlled execution.
- Red Hat OpenShift AI for model serving, evaluation workflows, and the agent
  runtime surface where the required capability is available.
- OpenShift GitOps and Pipelines for versioned policy/runbook promotion and
  reviewable change delivery.
- OpenShift Logging and OpenTelemetry for correlated evidence and audit export.
- OpenShift sandboxed containers/Kata for workload isolation.
- OpenShell for process, filesystem, network, and tool-policy sandboxing only
  where the target Red Hat OpenShift AI release exposes it; it is currently a
  Developer Preview/upstream integration and must not be represented as a
  generally supported production control.
- SPIFFE/SPIRE-compatible workload identity may underpin short-lived agent
  identity when approved for the target architecture.

The following names are retained as **research concepts until an authoritative
product source and implementation are attached**:

- **GCL** — candidate governance control layer for authority evaluation and
  promotion; the acronym is not treated as a verified Red Hat product.
- **Immutable ledger** — append-only, signed decision/action/validation evidence;
  this is an architecture requirement, not a named Red Hat product.
- **Agent passport** — portable identity, capability, policy, evaluation, and
  promotion record; research pattern that may use SPIFFE/SPIRE and signed
  attestations.
- **`rossoctl`** — proposed operator/reviewer CLI for inspection, approval,
  suspension, rollback, and passport/ledger queries; not treated as a verified
  Red Hat product until sourced.

The 601 exit artifact is a human-approved authority envelope plus an immutable
Signal → Decision → Action → Validate → Learn record. The agent earns a narrowly
scoped right to act; it never earns unrestricted autonomy.

### Sovereign AI

The track now has factory-built, signed, digest-pinned candidates and canonical
zero-seat handoffs for levels 101 through 501. Launchpad does not yet define a `sovereign_ai` solution family or
Sovereign catalog/onboarding records; taxonomy, level assignments, runtime
compatibility, certification, and publication remain intake hypotheses until
Launchpad approves them.

| Level | Catalog journey | Current state | Intended outcome |
|---|---|---|---|
| 101 | Understand Sovereign AI | immutable factory candidate; zero-seat handoff | Distinguish ownership and control from simple data location. |
| 201 | Build a Governed Sovereign AI Workload | immutable factory candidate; zero-seat handoff | Establish model identity, residency policy, and an evidence record. |
| 301 | Govern Models, Data, and Agents | immutable factory candidate; zero-seat handoff | Enforce provenance, identity, routing, policy, and audit boundaries. |
| 401 | Confidential AI with Intel TDX | immutable rehearsal candidate; live TDX proof blocked | Prove attestation, protected use, and gated secret release. |
| 501 | Prove and Certify Sovereign AI | immutable factory candidate; zero-seat handoff | Validate the complete control and evidence envelope. |

The `sovereign-ai-lab` repository is the principal discovery source. Triforce
Secure contributes the guided-attestation story, but it is not a second runtime.

### Virtualization + AI

The track now has factory-built, signed, digest-pinned candidates and canonical
zero-seat handoffs for levels 101 through 501. Virtualization currently appears in Launchpad as a platform capability,
not an approved learning family. Levels must still be accepted through intake
and certified from the discovered learner work rather than inferred from the
existence of a complete sequence.

| Level | Catalog journey | Current state | Intended outcome |
|---|---|---|---|
| 101 | Understand VM and AI Coexistence | immutable factory candidate; zero-seat handoff | Trace an established application to a managed AI service. |
| 201 | Connect a VM to AI | immutable factory candidate; zero-seat handoff | Configure and prove one real VM-to-AI request. |
| 301 | Modernize VMs with AI | immutable factory candidate; zero-seat handoff | Add identity, networking, placement, observability, and measured behavior. |
| 401 | Operate Hybrid VM and AI Workloads | immutable factory candidate; zero-seat handoff | Exercise migration, resilience, recovery, policy, and day-two operations. |
| 501 | Scale Governed AI Modernization | immutable factory candidate; zero-seat handoff | Earn 501 through fleet-scale migration and certification evidence. |

Triforce Virt supplies the focused causal story. The OpenShift Virtualization
roadshow supplies selected implementation modules. The full roadshow must not be
copied into a single lab.

## Industry overlays

Network operations, Cloud RAN, financial services, healthcare, and future
industries are not additional technical tracks. Each is an episode that binds a
recognizable business problem, domain evidence, standards, policies, and success
criteria to one or more track levels.

An industry episode may reuse the same runtime blueprint, but it must own its
domain data contract, MCP tools, authority model, live conditions, claims, and
tests. The catalog name must expose both dimensions, such as `Agentic AI 301 —
Network Operations`.

## Sales entry experiences and value evidence

Sales experiences are a tracked entry layer, not weaker versions of numbered
labs. Each experience combines a five-to-seven-minute evidence-led presentation,
a ten-to-fifteen-minute guided proof, and one deliberate handoff into a deeper
101–601 journey. The initial play set is:

1. Red Hat × Intel AI Strategy — one platform, three technical tracks;
2. AI on Intel Xeon — model fit, placement, latency, capacity, and economics;
3. Governed Agentic AI — evidence, deterministic policy, human authority, and
   the path toward earned action;
4. Sovereign and Confidential AI — control, provenance, attestation, and TDX;
5. Virtualization + AI — modernize AI-enabled workloads without requiring an
   immediate replatform; and
6. industry episodes, beginning with Network Operations and Cloud RAN.

Track the funnel as distinct states: invited, registered, environment claimed,
experience opened, proof started, checkpoint reached, completed, technical lab
selected, follow-up requested, POC proposed, accepted opportunity influence,
and customer outcome. Store campaign, event, anonymous session, `sales_play_id`,
proof state, CTA, destination lab, and consented follow-up state. Do not infer
revenue attribution from attendance or completion.

Keep three evidence lanes independent:

- experience telemetry proves what a participant viewed, ran, and completed;
- the Value Evidence Framework (VEF) calculates sourced cost, operational,
  risk, and business-value claims; and
- GTM attribution records consented account/opportunity linkage and accepted
  influence.

VEF owns the canonical claim language, validation, attribution, confidence
policy, calculations, and scorecard projections. Product repositories own raw
measurements, extraction, privacy, provenance, and semantic correctness.
Launchpad owns its `launchpad.vef-pilot-input.*` schemas and the adapter that
maps those sanitized inputs into VEF.

VEF code health is not evidence quality. Before a benchmark enters sales copy,
its claim must include the source URL, table or section, geography, effective
date, retrieval date, units, transformation, confidence, and validation state.
Illustrative assumptions remain hypotheses. Launchpad's local
The Launchpad adapter currently names `vef.claim.v1alpha2`, but VEF has not
published that JSON Schema identifier. Treat the output as a provisional
Launchpad adapter shape until VEF publishes the contract and Launchpad pins and
passes conformance against its immutable revision.

## Factory workflow and gates

No stage implies authority to perform a later stage.

### F0 — Source nomination

- Identify repository, owner, audience, intended track, proposed level, and lab outcome.
- Record whether the source is a QuickStart, application repository, technical
  document, architecture, or rough idea.
- Pin the source revision before formal discovery.

**Exit evidence:** named owner, immutable source revision, track/level hypothesis,
and no secrets in source.

### F1 — Deterministic repository discovery

Run the canonical bootstrap:

```bash
npm run bootstrap -- /path/to/source ../candidate-demo \
  --name candidate-demo \
  --title "The decision this system proves" \
  --subtitle "Red Hat × Intel interactive demo"
```

Inspect contracts, manifests, tests, entry points, observability, model usage,
network exposure, secrets, and operational documentation. Discovery findings
remain candidates until reviewed.

**Exit evidence:** `demo-blueprint.yaml`, `discovery-review.md`, source inventory,
discrepancies, unknowns, and AI-necessity assessment.

### F2 — Blueprint and level review

- Verify actors, runtime objects, boundaries, dependencies, and typed flows.
- Identify the source system's natural operational pattern.
- Determine whether AI is required, optional, or absent.
- Check that learner work materially earns the proposed 101–501 level.
- Reject inventory tours and unsupported architecture boxes.
- Propose deployment class and scope, isolation rationale, supported platform
  versions and architectures, Operators, hardware/node labels, storage behavior,
  ingress/egress, cluster-scoped resources, and cleanup ownership. Unknown target
  compatibility becomes an activation blocker rather than inferred support.

**Exit evidence:** validated blueprint with every material item classified as
verified, assumed, unknown, excluded, or blocked.

### F3 — Coupled experience design

Design four depths as one journey:

1. short presentation;
2. guided causal architecture;
3. live proof against the same runtime;
4. hands-on construction and verification.

The presentation must close before handing off to the lab. The lab must not be
embedded into the presentation. Architecture, evidence identifiers, source
states, and terminology must remain consistent across both artifacts.

**Exit evidence:** `story.brief.yaml`, journey acceptance matrix, lab objectives,
and explicit presentation-to-lab handoff.

### F4 — Contract-first implementation

- Define API, event, MCP, agent, evidence, and lab contracts before implementation.
- Write RED tests against those contracts.
- Implement the workload, adapters, manifests, Showroom content, and presentation.
- Keep LLM output advisory unless an explicitly tested policy grants authority.
- Use Secret references for endpoints and credentials.

**Exit evidence:** passing contract/unit/integration tests and a fail-closed
authority model.

### F5 — Triforce presentation verification

- Keep the presenter path to 5–7 minutes and at most seven top-level scenes.
- Reveal one meaningful boundary per click.
- Accumulate evidence instead of replacing earlier proof.
- Show workload flow, agent flow, and the exact LLM role.
- Source quantitative claims from current-session live adapters.
- Label fixtures as `REHEARSAL` or `OFFLINE`.
- Fit desktop scenes at 1920×1080 and 1440×900 without scrolling.
- End with `Close presentation`, then offer one lab handoff.

**Exit evidence:** unit, build, offline-asset, accessibility, screenshot, live-path,
fallback, navigation, and rehearsal receipts.

### F6 — Lab verification

- Build Showroom content from a clean checkout.
- Execute every learner command in a disposable namespace.
- Verify expected observations and failure paths.
- Test restart, resume, reclaim, secret isolation, and zero residue.
- Measure steady and peak per-seat CPU, memory, pods, and storage; workshop-shared
  resources; provisioning concurrency; model requests, tokens, and concurrency;
  readiness and cleanup duration; largest observed run; and proposed safety margin.
- Validate the demo and lab against the same API and evidence contracts.

**Exit evidence:** one complete local or development-cluster journey and measured
resource proposal. This is not Launchpad certification.

### F7 — Immutable artifact production

Build Linux AMD64 workload and presentation images from pinned source
revision. Produce digest references, SBOMs, signatures, provenance, vulnerability
results, and local/public exact-digest pull evidence. Pin every runtime image and
external content revision. Launchpad destination qualification, cold-pull,
registry-certificate, credential, signature, architecture, and cache-loss proof
remain required for every eligible target or mirror.

Do not commit a produced image digest back into the commit that built it. Supply
the digest as reviewed deployment or intake values so source and image remain
independently bindable.

**Exit evidence:** immutable workload, presentation, and content identities with
their verification receipts. For each image, use Launchpad's
`artifact-release-evidence/v1` shape so the receipt binds a clean source revision,
digest, Linux AMD64 architecture, builder, scan, SBOM, signature, provenance,
license policy, and retention evidence. Structural compatibility does not make
the receipt trusted; Launchpad independently verifies it.

### F8 — Launchpad-ready handoff

Produce four separately reviewable outputs:

- `handoff/launchpad-handoff.yaml` — factory receipt and proposed intake;
- `handoff/catalog-onboarding.proposed.yaml` — Launchpad-shaped intake proposal;
- `handoff/catalog-certification.proposed.yaml` — certification contract proposal;
- source-bound artifact and factory-journey evidence receipts.

Complete `handoff/launchpad-handoff.yaml` and validate it:

```bash
npm run validate:handoff -- handoff/launchpad-handoff.yaml
```

The handoff includes only source-bound references and evidence locations. It
contains no credentials and grants no promotion authority. Structural validation
and filesystem evidence verification remain distinct from Launchpad trust.

**Exit evidence:** validated handoff manifest, clean immutable source, known
blockers, and a proposed fail-closed onboarding intake.

### F9 — Launchpad intake and certification

The Launchpad session independently:

1. approves the source;
2. runs repository discovery;
3. generates and reviews the catalog intake draft;
4. performs trusted rendered-output review;
5. verifies registry artifacts and runtime secrets;
6. runs the complete one-seat browser and workload journey;
7. graduates through five- and twenty-five-seat certification where applicable;
8. proves reclaim and zero residue;
9. promotes only through Launchpad's approval path.

The factory may assist with fixes, but it may not mark the item certified,
orderable, promotion-eligible, or published.

## Immutable handoff definition of done

A lab is ready to hand to a Launchpad session only when all of the following are
true:

- workload, presentation, and content repositories are pinned to full commits;
- local checkouts are clean;
- every deployed image uses an immutable digest;
- workload and presentation images identify their source revision;
- SBOM, signature, provenance, scan, and pull evidence are available;
- deployment manifests render without unresolved unsafe exposure;
- credentials and endpoints are supplied only through runtime Secret references;
- required models and capabilities are explicit;
- the presentation and lab share architecture, evidence, and terminology;
- live and fallback states are visibly distinct;
- every material claim has a source-state classification;
- measured per-seat resources replace placeholders;
- one complete development journey passes, including failure and reclaim;
- all remaining blockers are explicit; and
- the handoff declares `orderable: false`, `certified: false`, and
  `promotion_eligible: false`.

## Initial delivery order

1. Use the already-onboarded Agentic 401 candidate and its GREEN-live one-seat
   Flightpath result as the reference handoff. Launchpad completes its remaining
   capacity, reclaim, operational, promotion, and organization-owned artifact
   gates.
2. Hand Agentic 501 to Launchpad with zero seats and the 401 prerequisite still
   enforced. Do not begin live 501 certification until Launchpad records that
   prerequisite as satisfied.
3. Keep Agentic 601 non-orderable and execution-disabled. Begin live earned-
   authority qualification only after 401 and 501 certify the workload,
   evidence, policy, recovery, and human-promotion envelope.
4. Hand Sovereign 101–501 to Launchpad as separate zero-seat candidates. Require real TDX runtime proof before
   promoting any 401 confidential-compute claim beyond rehearsal.
5. Hand Virtualization + AI 101–501 to Launchpad as separate zero-seat
   candidates.
6. Standardize Network Operations, Hybrid Fraud, and Agent Reliability on the
   canonical handoff without erasing their existing Launchpad evidence. Add
   Cloud RAN and healthcare only when source candidates and domain contracts
   exist.
7. Decide whether Agentic 101 materially adds to shared CPU Inference 101 before
   creating it.
8. The Red Hat × Intel AI Strategy umbrella plus the Governed Agentic AI,
   Sovereign AI, and Virtualization + AI track entries are complete as signed
   immutable experiences connected to their technical journeys. Keep future
   sales entries connected to an existing evidence contract and lab path.
9. VEF and Launchpad ownership boundaries are now explicit. Publish the
   canonical VEF claim schema, pin Launchpad adapter conformance, and source
   every benchmark assumption before enabling value claims in sales telemetry
   or talk tracks.

This sequence establishes the factory contract once, then reuses it without
turning every new repository into a custom Launchpad onboarding exercise.
