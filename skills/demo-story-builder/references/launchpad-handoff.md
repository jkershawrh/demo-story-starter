# Launchpad Handoff

Use this handoff only after the presentation and lab have passed the factory
gates in `docs/lab-factory-roadmap.md` and immutable images exist.

Copy `handoff/launchpad-handoff.example.yaml` into the candidate repository as
`handoff/launchpad-handoff.yaml`, replace every example value with source-bound
evidence, and run `npm run validate:handoff -- <path>` from this repository.
The non-template command rejects placeholder identities and verifies referenced
evidence files against their declared SHA-256 digests.

The handoff contains a factory receipt and a Launchpad-shaped intake proposal.
Also generate `catalog-onboarding.proposed.yaml` and
`catalog-certification.proposed.yaml` so the Launchpad session reviews contracts
instead of translating free-form notes. The presentation remains a workload
component and participant tab; it is not a third Launchpad source class.

The handoff is a request for independent onboarding. It is never a catalog
certification receipt. Keep all authority fields false. Never include Secret
values, tokens, Kubeconfigs, raw rendered manifests, or unredacted runtime data.

The Launchpad session must independently approve the source and rerun its intake,
render, artifact, runtime, capacity, reclaim, and promotion gates. Findings from
the factory should accelerate that work, not bypass it.
