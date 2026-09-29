import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { readPortfolio } from './catalog-portfolio-lib.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const generatedRoots = [
  'contracts/catalog/launchpad-migration-map.generated.yaml',
  'docs/generated/catalog-readiness.md',
  'handoff/generated',
  'preview/catalog/index.html',
]

async function filesAt(relativePath) {
  const absolutePath = resolve(root, relativePath)
  const entry = await readdir(absolutePath, { withFileTypes: true }).catch(() => null)
  if (!entry) return [relativePath]
  const nested = await Promise.all(entry.map((child) => filesAt(`${relativePath}/${child.name}`)))
  return nested.flat()
}

async function fingerprints() {
  const files = (await Promise.all(generatedRoots.map(filesAt))).flat().sort()
  return Object.fromEntries(await Promise.all(files.map(async (relativePath) => {
    const content = await readFile(resolve(root, relativePath))
    return [relativePath, createHash('sha256').update(content).digest('hex')]
  })))
}

const before = await fingerprints()
const generated = spawnSync(process.execPath, ['scripts/generate-catalog-assets.mjs'], { cwd: root, encoding: 'utf8' })
assert.equal(generated.status, 0, generated.stderr || generated.stdout)
const after = await fingerprints()
assert.deepEqual(after, before, 'Generated catalog assets are stale; run npm run generate:catalog and commit the result.')

const portfolio = await readPortfolio()
const intakeCandidates = portfolio.items.filter((item) => ['intake_ready', 'research_only'].includes(item.launchpad.lifecycle))
const handoffs = Object.keys(after).filter((path) => path.startsWith('handoff/generated/'))
assert.equal(handoffs.length, intakeCandidates.length, 'Every intake or research candidate needs exactly one handoff bundle.')

for (const path of handoffs) {
  const bundle = parse(await readFile(resolve(root, path), 'utf8'))
  assert.deepEqual(bundle.authority, { orderable: false, certified: false, promotion_eligible: false, may_provision: false, may_publish: false })
}

const preview = await readFile(resolve(root, 'preview/catalog/index.html'), 'utf8')
for (const item of portfolio.items) assert(preview.includes(`data-id="${item.id}"`), `Preview is missing ${item.id}`)

console.log(`Generated catalog assets are deterministic and complete (${handoffs.length} zero-authority bundles).`)
