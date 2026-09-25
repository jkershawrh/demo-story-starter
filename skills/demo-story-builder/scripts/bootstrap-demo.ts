#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const sourceArg = args[0]
const destinationArg = args[1]
const value = (flag: string) => {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : undefined
}

if (!sourceArg || !destinationArg || sourceArg.startsWith('--') || destinationArg.startsWith('--')) {
  console.error('Usage: npm run bootstrap -- <source-repository> <destination> --name <name> --title "Title" --subtitle "Subtitle"')
  process.exit(1)
}

const source = resolve(sourceArg)
const destination = resolve(destinationArg)
const name = value('--name') ?? `${basename(source).toLowerCase().replace(/[^a-z0-9-]+/g, '-')}-demo`
const title = value('--title') ?? `Prove ${basename(source)} from live evidence`
const subtitle = value('--subtitle') ?? 'Red Hat × Intel interactive demo'
const scriptDir = dirname(fileURLToPath(import.meta.url))
const run = (script: string, scriptArgs: string[]) => {
  const result = spawnSync(process.execPath, ['--experimental-strip-types', join(scriptDir, script), ...scriptArgs], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run('scaffold-demo.ts', [destination, '--name', name, '--title', title, '--subtitle', subtitle])
run('discover-demo.ts', [source, join(destination, 'demo-blueprint.yaml')])

const blueprint = await readFile(join(destination, 'demo-blueprint.yaml'), 'utf8')
const artifactCount = (blueprint.match(/^    - /gm) ?? []).length
const candidateCount = (blueprint.match(/^    - id:/gm) ?? []).length
const aiKind = blueprint.match(/ai_assessment:[\s\S]*?^  kind: (.+)$/m)?.[1] ?? 'unknown'
const aiNeeded = blueprint.match(/ai_assessment:[\s\S]*?^  needed: (.+)$/m)?.[1] ?? 'unknown'

const briefPath = join(destination, 'story.brief.yaml')
const brief = (await readFile(briefPath, 'utf8'))
  .replace('mode: rough-idea', 'mode: repository')
  .replace('  items: []', `  items:\n    - ${JSON.stringify(source)}\n    - demo-blueprint.yaml`)
  .replace('  consequential_assumptions: []', '  consequential_assumptions:\n    - Discovery candidates remain unverified until reviewed against source artifacts and live behavior.')
await writeFile(briefPath, brief)

const report = `# Discovery review\n\n` +
  `Source: \`${source}\`  \nDestination: \`${destination}\`  \nBlueprint status: **draft**\n\n` +
  `## Automated findings\n\n- ${artifactCount} candidate source artifacts recorded.\n- ${candidateCount} runtime-object candidates detected.\n- AI signal: \`${aiKind}\`; necessity: \`${aiNeeded}\`.\n\n` +
  `These are discovery candidates, not approved presentation claims.\n\n` +
  `## Required review\n\n` +
  `- Confirm the primary user, workload, recognized problem, audience decision, and desired outcome.\n` +
  `- Verify every runtime object against contracts, manifests, implementation, or a live deployment.\n` +
  `- Trace at least one typed end-to-end architecture flow with protocols and evidence IDs.\n` +
  `- Define the source system's operational pattern in domain language, including one changed condition and the close.\n` +
  `- Inventory live evidence and distinguish live, rehearsal, simulated, and future-state behavior.\n` +
  `- Resolve deterministic policy, fail-closed behavior, action authority, and final decision ownership.\n` +
  `- If AI participates, verify its task, exact inputs and outputs, model/hardware identity sources, evidence access, validation, and fallback.\n` +
  `- Record discrepancies rather than silently reconciling documentation and implementation.\n\n` +
  `## Promotion gate\n\n` +
  `Do not change \`status: draft\` until material findings are sourced. Then run:\n\n` +
  `\`\`\`bash\nnpm run validate:blueprint -- ${join(destination, 'demo-blueprint.yaml')}\n\`\`\`\n\n` +
  `Validation requires a domain-specific operational step, a typed architecture flow, evidence, and resolved AI authority when AI is used.\n`
await writeFile(join(destination, 'discovery-review.md'), report)

console.log(`Bootstrapped ${name} from ${source}`)
console.log(`Review ${join(destination, 'discovery-review.md')} before authoring scenes.`)
