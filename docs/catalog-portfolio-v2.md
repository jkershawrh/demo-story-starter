# Catalog portfolio v2

The catalog portfolio is the factory-side map of the Red Hat × Intel AI journey. It keeps four questions independent:

1. **Track** — shared foundation, Agentic AI, Sovereign AI, or Virtualization + AI.
2. **Solution family** — the usage lens already used by Launchpad, such as inference, agentic AI, operations and reliability, or industry solutions.
3. **Learning level** — entry, 001, 101, 201, 301, 401, 501, or research-only 601.
4. **Experience type** — non-orderable sales entry, guided demo, hands-on lab, or research.

Keeping these dimensions separate prevents a specialty episode such as Network Operations from being mistaken for an entire track, and prevents a sales demo from being mistaken for a certified lab.

## Source of truth

- `contracts/catalog/portfolio-v2.yaml` contains the portfolio records and journey links.
- `contracts/catalog/portfolio-v2.schema.json` defines the machine-readable contract.
- `contracts/catalog/launchpad-migration-map.generated.yaml` preserves existing Launchpad catalog IDs while proposing the additional taxonomy.
- `handoff/generated/` contains one zero-authority intake bundle per factory candidate.
- `docs/generated/catalog-readiness.md` shows evidence and open gates.
- `preview/catalog/index.html` is a standalone, offline-readable catalog preview.

Regenerate and verify all derived artifacts with:

```bash
npm run generate:catalog
npm run validate:catalog
npm run test:catalog
npm run verify:catalog-generated
```

## Authority boundary

This repository discovers, structures, builds, and transfers evidence. It does not certify, provision, publish, promote, or make a catalog item orderable. Every generated handoff explicitly sets those authority fields to `false`.

Sales-entry experiences belong on a non-orderable **Start Here** surface. Their applicable gates are source binding, signatures, SBOM, and runtime-secret handling; seat capacity and reclaim do not apply. Hands-on labs retain the full resource, one-seat, five-seat, and reclaim gates. Level 601 remains research-only and cannot be promoted from this repository.

## Safe Launchpad integration

After current certifications settle, Launchpad can consume the migration map without replacing its working solution-family filters:

1. Preserve every existing `catalog_item_id` and promoted release identity.
2. Add `track` and `experience_type` as independent metadata.
3. Render sales entries on a non-orderable Start Here surface.
4. Intake candidate bundles one at a time through Launchpad's own discovery and certification workflow.
5. Never infer orderability from a factory lifecycle, immutable image, readiness check, or presentation state.
