import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const temp = await mkdtemp(join(tmpdir(), 'demo-bootstrap-'))
const source = join(temp, 'source-system')
const destination = join(temp, 'generated-demo')
await mkdir(join(source, 'deploy'), { recursive: true })
await writeFile(join(source, 'README.md'), '# Evidence assistant\nAn agent uses MCP tools and an OpenAI-compatible model endpoint.\n')
await writeFile(join(source, 'deploy', 'service.yaml'), 'apiVersion: v1\nkind: Service\nmetadata:\n  name: assistant\n')

const result = spawnSync(process.execPath, [
  '--experimental-strip-types',
  join(root, 'skills/demo-story-builder/scripts/bootstrap-demo.ts'),
  source,
  destination,
  '--name', 'evidence-assistant-demo',
  '--title', 'Evidence before action',
  '--subtitle', 'Automated intake test',
], { encoding: 'utf8' })

if (result.status !== 0) throw new Error(`${result.stdout}\n${result.stderr}`)
const blueprint = await readFile(join(destination, 'demo-blueprint.yaml'), 'utf8')
const brief = await readFile(join(destination, 'story.brief.yaml'), 'utf8')
const report = await readFile(join(destination, 'discovery-review.md'), 'utf8')
const pkg = JSON.parse(await readFile(join(destination, 'package.json'), 'utf8'))

if (!blueprint.includes('status: draft') || !blueprint.includes('kind: agentic')) throw new Error('bootstrap did not install the discovered AI blueprint')
if (!brief.includes('mode: repository') || !brief.includes(source)) throw new Error('bootstrap did not initialize repository story intake')
if (!report.includes('Required review') || !report.includes('Promotion gate')) throw new Error('bootstrap did not create the review gate')
if (pkg.name !== 'evidence-assistant-demo') throw new Error('bootstrap did not name the generated package')
console.log('Automated repository bootstrap verified.')
