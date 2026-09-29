import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = dirname(fileURLToPath(new URL('../contracts/vef/', import.meta.url)))
const sourcePath = new URL('../contracts/vef/launchpad-adapter-conformance.yaml', import.meta.url)
const schemaPath = new URL('../contracts/vef/claim.v1alpha2.json', import.meta.url)
const source = await readFile(sourcePath, 'utf8')
const schema = await readFile(schemaPath, 'utf8')
const validator = new URL('../skills/demo-story-builder/scripts/validate-vef-adapter.ts', import.meta.url).pathname
const dir = await mkdtemp(join(tmpdir(), 'vef-adapter-test-'))
const fixture = async (name, text) => {
  const fixtureDir = join(dir, name)
  await import('node:fs/promises').then(({ mkdir }) => mkdir(fixtureDir, { recursive: true }))
  await writeFile(join(fixtureDir, 'claim.v1alpha2.json'), schema)
  const manifest = join(fixtureDir, 'adapter.yaml')
  await writeFile(manifest, text)
  return manifest
}
const run = (path) => spawnSync(process.execPath, ['--experimental-strip-types', validator, path], { encoding: 'utf8', cwd: root })

assert.equal(run(await fixture('valid', source)).status, 0)
assert.notEqual(run(await fixture('authority', source.replace('  may_publish_value_claim: false', '  may_publish_value_claim: true'))).status, 0)
assert.notEqual(run(await fixture('mutable-revision', source.replace(/revision: [0-9a-f]{40}/, 'revision: main'))).status, 0)
assert.notEqual(run(await fixture('schema-digest', source.replace(/sha256: 900b[0-9a-f]+/, `sha256: ${'0'.repeat(64)}`))).status, 0)
assert.notEqual(run(await fixture('legacy-source', source.replace(/      - id: launchpad-source-conformance[\s\S]*?        validation_state: accepted/, '      - legacy-string-source'))).status, 0)
assert.notEqual(run(await fixture('weak-counterfactual', source.replace('    method: matched_control', '    method: expert_estimate'))).status, 0)
assert.notEqual(run(await fixture('benchmark-provenance', source.replace('        kind: launchpad_receipt', '        kind: industry_benchmark'))).status, 0)
assert.notEqual(run(await fixture('secret', `${source}\nclient_secret: exposed\n`)).status, 0)

console.log('VEF adapter conformance adversarial tests passed.')
