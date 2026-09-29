import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stringify } from 'yaml'
import { applicableReadinessKeys, readPortfolio, readinessGaps, trackLabel, validatePortfolio } from './catalog-portfolio-lib.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const portfolio = await readPortfolio()
const errors = await validatePortfolio(portfolio)
if (errors.length) throw new Error(`Refusing to generate from invalid portfolio:\n${errors.join('\n')}`)

const handoffDir = resolve(root, 'handoff/generated')
const docsDir = resolve(root, 'docs/generated')
const previewDir = resolve(root, 'preview/catalog')
await rm(handoffDir, { recursive: true, force: true })
await Promise.all([mkdir(handoffDir, { recursive: true }), mkdir(docsDir, { recursive: true }), mkdir(previewDir, { recursive: true })])

const candidates = portfolio.items.filter((item) => ['intake_ready', 'research_only'].includes(item.launchpad.lifecycle))
for (const item of candidates) {
  const bundle = {
    schema_version: 'demo-story.redhat-intel.com/catalog-intake-bundle/v2',
    identity: {
      portfolio_id: item.id,
      proposed_catalog_item_id: item.launchpad.catalog_item_id,
      display_name: item.display_name,
      track: item.track,
      solution_family: item.solution_family,
      learning_level: item.learning_level,
      experience_type: item.experience_type,
      journey_role: item.journey_role,
    },
    authority: { orderable: false, certified: false, promotion_eligible: false, may_provision: false, may_publish: false },
    source: { repository: item.repository, revision: item.source_revision },
    artifacts: item.artifacts,
    journey: { prerequisites: item.prerequisites, recommended_next_items: item.recommended_next_items, branches_from: item.branches_from },
    proposed_surface: item.experience_type === 'sales_entry' ? 'start_here' : item.launchpad.lifecycle === 'research_only' ? 'research' : 'orderable_catalog',
    launchpad_request: item.experience_type === 'sales_entry'
      ? 'review_non_orderable_start_here_surface'
      : item.launchpad.lifecycle === 'research_only'
        ? 'review_only'
        : 'approve_source_and_run_discovery',
    independent_gates_remaining: readinessGaps(item),
    known_boundary: item.notes,
  }
  await writeFile(resolve(handoffDir, `${item.id}.yaml`), stringify(bundle, { lineWidth: 120 }))
}

const migration = {
  schema_version: 'demo-story.redhat-intel.com/launchpad-catalog-migration-map/v2',
  rule: 'Catalog IDs and release identities remain stable; taxonomy metadata never transfers certification.',
  mappings: portfolio.items.filter((item) => item.launchpad.catalog_item_id).map((item) => ({
    portfolio_id: item.id,
    launchpad_catalog_item_id: item.launchpad.catalog_item_id,
    track: item.track,
    solution_family: item.solution_family,
    learning_level: item.learning_level,
    lifecycle: item.launchpad.lifecycle,
  })),
}
await writeFile(resolve(root, 'contracts/catalog/launchpad-migration-map.generated.yaml'), stringify(migration, { lineWidth: 120 }))

const checks = ['source_bound', 'signed', 'sbom', 'runtime_secret_contract', 'resource_estimate', 'one_seat', 'five_seat', 'reclaim']
const mark = (item, key) => applicableReadinessKeys(item).includes(key) ? (item.readiness[key] ? '✓' : '—') : 'n/a'
const rows = portfolio.items.map((item) => `| ${item.display_name} | ${trackLabel(item.track)} | ${item.learning_level ?? 'Entry'} | ${item.launchpad.lifecycle} | ${checks.map((key) => mark(item, key)).join(' | ')} |`)
const report = `# Catalog portfolio readiness\n\nGenerated from \`contracts/catalog/portfolio-v2.yaml\` on ${portfolio.verified_at}. This is factory evidence, not Launchpad certification or promotion authority. A \`—\` is an applicable open gate; \`n/a\` means the gate does not apply to that experience type.\n\n| Experience | Track | Level | Lifecycle | Source | Signed | SBOM | Secret contract | Resources | 1 seat | 5 seat | Reclaim |\n|---|---|---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n${rows.join('\n')}\n\n## Intake bundles\n\nThese bundles transfer factory evidence for review. They grant no certification, publication, provisioning, or promotion authority.\n\n${candidates.map((item) => `- \`${item.id}\`: ${readinessGaps(item).join(', ') || 'factory evidence complete; independent Launchpad review still required'}`).join('\n')}\n`
await writeFile(resolve(docsDir, 'catalog-readiness.md'), report)

const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
const cards = portfolio.items.map((item) => `<article class="card" data-id="${item.id}" data-track="${item.track}" data-kind="${item.experience_type}"><div class="meta"><span>${escape(item.learning_level ?? 'START')}</span><span>${escape(item.launchpad.lifecycle.replaceAll('_', ' '))}</span></div><h3>${escape(item.display_name)}</h3><p>${escape(item.notes)}</p><footer><b>${escape(trackLabel(item.track))}</b><small>${escape(item.solution_family.replaceAll('_', ' '))}</small></footer></article>`).join('')
const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Red Hat × Intel AI catalog preview</title><style>:root{color-scheme:dark;--bg:#111;--surface:#1f1f1f;--line:#3b3b3b;--text:#f5f5f5;--dim:#aaa;--red:#ee0000;--blue:#00aeef;--green:#3e8635}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.45 system-ui,sans-serif}header,main{max-width:1480px;margin:auto;padding:32px}header{border-bottom:1px solid var(--line)}.eyebrow{color:var(--blue);font-weight:800;letter-spacing:.16em;text-transform:uppercase;font-size:12px}h1{font-size:clamp(36px,5vw,72px);line-height:1;margin:.25em 0}header p{color:var(--dim);max-width:850px}.filters{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}button{border:1px solid var(--line);background:#222;color:var(--text);padding:9px 14px;border-radius:999px;cursor:pointer}button.active{background:var(--green);border-color:var(--green)}section{margin:38px 0}h2{font-size:26px;border-bottom:1px solid var(--line);padding-bottom:12px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.card{background:var(--surface);border:1px solid var(--line);border-top:3px solid var(--red);padding:20px;min-height:240px;display:flex;flex-direction:column}.card[data-track=sovereign_ai]{border-top-color:var(--green)}.card[data-track=virtualization_ai]{border-top-color:#f0ab00}.card[data-track=shared_foundation]{border-top-color:var(--blue)}.meta{display:flex;justify-content:space-between;color:var(--dim);font-size:11px;text-transform:uppercase;letter-spacing:.08em}.card h3{font-size:20px}.card p{color:var(--dim);font-size:14px}.card footer{display:flex;justify-content:space-between;align-items:end;margin-top:auto}.card footer b{color:var(--blue)}.card footer small{color:var(--dim);text-transform:capitalize}.hidden{display:none}.boundary{border-left:3px solid var(--blue);padding:12px 16px;background:#182126;color:var(--dim)}</style></head><body><header><div class="eyebrow">Factory preview · no Launchpad authority</div><h1>One portfolio. Three tracks. Clear next journeys.</h1><p>Start with a business decision, move into a shared foundation or technical track, then apply an industry episode. Track, usage, level, and lifecycle remain independent.</p><div class="filters"><button class="active" data-filter="all">All</button><button data-filter="sales_entry">Start here</button><button data-filter="shared_foundation">Shared foundation</button><button data-filter="agentic_ai">Agentic AI</button><button data-filter="sovereign_ai">Sovereign AI</button><button data-filter="virtualization_ai">Virtualization + AI</button></div></header><main><p class="boundary">Only Launchpad-active items are orderable. Factory candidates remain zero-seat until independent intake, certification, reclaim, and promotion gates pass.</p><section><h2>Portfolio experiences</h2><div class="grid">${cards}</div></section></main><script>document.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('button').forEach(x=>x.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.kind!==filter&&card.dataset.track!==filter))}))</script></body></html>`
await writeFile(resolve(previewDir, 'index.html'), preview)

console.log(`Generated ${candidates.length} zero-seat intake bundles, migration map, readiness report, and catalog preview.`)
