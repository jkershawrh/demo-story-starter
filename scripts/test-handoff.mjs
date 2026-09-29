import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const source = await readFile(new URL('../handoff/launchpad-handoff.example.yaml', import.meta.url), 'utf8')
const validator = new URL('../skills/demo-story-builder/scripts/validate-handoff.ts', import.meta.url).pathname
const run = (path) => spawnSync(process.execPath, ['--experimental-strip-types', validator, '--template', path], { encoding: 'utf8' })
const dir = await mkdtemp(join(tmpdir(), 'handoff-test-'))
const fixture = async (name, text) => { const path = join(dir, name); await writeFile(path, text); return path }

assert.doesNotMatch(source, /\{[^\n]*:\s+https?:\/\//, 'flow-mapping URLs must be quoted for YAML parser portability')
assert.equal(run(await fixture('valid.yaml', source)).status, 0)
assert.equal(run(await fixture('level-601.yaml', source.replaceAll('"301"', '"601"'))).status, 0)
assert.notEqual(run(await fixture('unquoted-flow-url.yaml', source.replace('repo_url: "https://example.invalid/workload.git"', 'repo_url: https://example.invalid/workload.git'))).status, 0)
assert.notEqual(run(await fixture('authority.yaml', source.replace('    certified: false', '    certified: true'))).status, 0)
assert.notEqual(run(await fixture('duplicate.yaml', source.replace('    orderable: false', '    orderable: false\n    orderable: true'))).status, 0)
assert.notEqual(run(await fixture('secret.yaml', `${source}\nclient_secret: exposed\n`)).status, 0)
assert.notEqual(run(await fixture('missing.yaml', source.replace('  factory_evidence:', '  removed_factory_evidence:'))).status, 0)
assert.notEqual(run(await fixture('mutable.yaml', source.replace(/registry\.example\.invalid\/workload@sha256:[0-9a-f]{64}/g, 'registry.example.invalid/workload:latest'))).status, 0)
assert.notEqual(run(await fixture('level.yaml', source.replace('proposed_learning_level: "301"', 'proposed_learning_level: "999"'))).status, 0)

console.log('Handoff validator adversarial tests passed.')
