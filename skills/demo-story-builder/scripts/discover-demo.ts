#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { basename, join, relative, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = resolve(process.argv[2] ?? '.')
const output = resolve(process.argv[3] ?? join(root, 'demo-blueprint.discovered.yaml'))
const ignored = new Set(['.git', '.claude', '.codex', 'node_modules', 'dist', 'build', 'coverage', 'target', 'vendor', '.next'])
const interesting = /(^|\/)(readme(?:\.[^/]+)?|agents(?:\.[^/]+)?|architecture(?:\.[^/]+)?|openapi(?:\.[^/]+)?|asyncapi(?:\.[^/]+)?|dockerfile|containerfile|compose(?:\.[^/]+)?|chart(?:\.[^/]+)?|values(?:\.[^/]+)?|deployment(?:\.[^/]+)?|service(?:\.[^/]+)?|route(?:\.[^/]+)?|ingress(?:\.[^/]+)?|package\.json|pyproject\.toml|go\.mod|pom\.xml|cargo\.toml|.*\.(ya?ml|json|md|adoc|py|ts|tsx|go|java|rs))$/i

async function walk(path: string, files: string[] = []): Promise<string[]> {
  for (const item of await readdir(path, { withFileTypes: true })) {
    if (ignored.has(item.name) || item.name.startsWith('.env')) continue
    const full = join(path, item.name)
    if (item.isDirectory()) await walk(full, files)
    else if (interesting.test(relative(root, full))) files.push(full)
    if (files.length >= 600) break
  }
  return files
}

const files = (await walk(root)).sort()
const inspected = files.map((file) => relative(root, file)).slice(0, 120)
const corpus: Array<{ file: string; text: string }> = []
for (const file of files.slice(0, 240)) {
  if ((await stat(file)).size > 500_000) continue
  corpus.push({ file: relative(root, file), text: await readFile(file, 'utf8').catch(() => '') })
}

const detectors = [
  ['route', /\b(kind:\s*Route|ingress|route)\b/i],
  ['service', /\bkind:\s*Service\b/i],
  ['deployment', /\bkind:\s*(Deployment|StatefulSet|DaemonSet)\b/i],
  ['broker', /\b(kafka|amq streams|redpanda|pulsar|nats)\b/i],
  ['database', /\b(postgres(?:ql)?|mysql|mongodb|redis|database)\b/i],
  ['mcp', /\b(model context protocol|mcp gateway|mcp server|mcp tool)\b/i],
  ['model-endpoint', /\b(vllm|litellm|model endpoint|inference endpoint|maas)\b/i],
] as const

const runtimeObjects = detectors.flatMap(([kind, pattern]) => {
  const hit = corpus.find(({ text }) => pattern.test(text))
  return hit ? [{ id: kind, name: kind.replace('-', ' '), kind, source: hit.file }] : []
})

const aiSignals = corpus.filter(({ text }) => /\b(llm|large language model|vllm|litellm|openai|anthropic|ollama|huggingface|embedding|semantic router)\b/i.test(text))
const aiKind = aiSignals.some(({ text }) => /\b(agent|tool call|mcp)\b/i.test(text)) ? 'agentic'
  : aiSignals.some(({ text }) => /\b(llm|vllm|litellm|openai|anthropic|ollama)\b/i.test(text)) ? 'generative-llm'
  : aiSignals.some(({ text }) => /\bembedding|semantic router\b/i.test(text)) ? 'embeddings' : 'none'

let revision = 'unknown'
try { revision = execFileSync('git', ['-C', root, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim() } catch { /* not a git repository */ }

const quote = (value: unknown) => JSON.stringify(String(value))
const lines = [
  'version: 1',
  'status: draft',
  'source:',
  `  name: ${quote(basename(root))}`,
  '  kind: repository',
  `  location: ${quote(root)}`,
  `  revision: ${quote(revision)}`,
  `  discovered_at: ${quote(new Date().toISOString())}`,
  '  inspected_artifacts:',
  ...inspected.map((file) => `    - ${quote(file)}`),
  '  discrepancies: []',
  'intent:',
  '  primary_user: unknown',
  '  workload: unknown',
  '  recognized_problem: unknown',
  '  audience_decision: unknown',
  '  desired_outcome: unknown',
  'architecture:',
  '  actors: []',
  '  runtime_objects:',
  ...(runtimeObjects.length ? runtimeObjects.flatMap((node) => [
    `    - id: ${node.id}`,
    `      name: ${quote(node.name)}`,
    `      kind: ${node.kind}`,
    '      responsibility: unknown',
    '      status: discovered',
    `      source: ${quote(node.source)}`,
  ]) : ['    []']),
  '  boundaries: []',
  '  external_dependencies: []',
  '  flows: []',
  'operational_pattern:',
  '  name: unknown',
  '  rationale: Must be derived from domain workflows, contracts, and tests.',
  '  steps: []',
  '  changed_condition: null',
  '  close: null',
  'evidence: []',
  'decisions: []',
  'ai_assessment:',
  `  needed: ${aiKind === 'none' ? 'false' : 'unknown'}`,
  `  kind: ${aiKind}`,
  `  rationale: ${quote(aiKind === 'none' ? 'No AI runtime signal was discovered.' : 'AI signals were discovered; runtime necessity and authority require verification.')}`,
  '  tasks: []',
  '  inputs: []',
  '  outputs: []',
  `  model_identity_source: ${aiSignals[0] ? quote(aiSignals[0].file) : 'null'}`,
  '  hardware_identity_source: null',
  '  evidence_access: []',
  '  action_authority: unknown',
  '  validation: []',
  '  fallback: unknown',
  '  final_decision_owner: unknown',
  'story_mapping:',
  '  audience_question: unknown',
  '  stakes: []',
  '  architecture_flow_ids: []',
  '  live_proof_flow_ids: []',
  '  comparison: null',
  '  payoff: unknown',
  '  next_journey: unknown',
  '',
]

await writeFile(output, lines.join('\n'))
console.log(`Discovered ${inspected.length} source artifacts and ${runtimeObjects.length} runtime-object candidates.`)
console.log(`Wrote draft blueprint to ${output}`)
console.log('Review every discovered item; discovery is evidence collection, not automatic truth.')
