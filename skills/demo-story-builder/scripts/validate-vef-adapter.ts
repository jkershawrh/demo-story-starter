import { createHash } from 'node:crypto'
import { lstat, readFile, realpath } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { parseDocument } from 'yaml'

const input = process.argv.slice(2).find((arg) => !arg.startsWith('--'))
  ?? 'contracts/vef/launchpad-adapter-conformance.yaml'
const manifestPath = resolve(input)
const root = dirname(manifestPath)
const text = await readFile(manifestPath, 'utf8')
const errors: string[] = []
const document = parseDocument(text, { uniqueKeys: true, maxAliasCount: 0, strict: true })
for (const error of document.errors) errors.push(`YAML: ${error.message}`)
const data = document.toJS({ maxAliasCount: 0 }) as Record<string, any>

const object = (value: any, label: string): Record<string, any> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push(`${label} must be an object`)
    return {}
  }
  return value
}
const required = (value: Record<string, any>, keys: string[], label: string) => {
  for (const key of keys) if (!(key in value)) errors.push(`${label} is missing ${key}`)
}
const exactKeys = (value: Record<string, any>, allowed: string[], label: string) => {
  for (const key of Object.keys(value)) if (!allowed.includes(key)) errors.push(`${label} has unknown field ${key}`)
}
const sha = /^[0-9a-f]{64}$/
const revision = /^[0-9a-f]{40}$/
const expectString = (value: any, label: string, pattern?: RegExp) => {
  if (typeof value !== 'string' || !value || (pattern && !pattern.test(value))) errors.push(`${label} is invalid`)
}

if (data?.schema_version !== 'demo-story.redhat-intel.com/vef-adapter-conformance/v1') errors.push('schema_version is invalid')
if (data?.kind !== 'VEFAdapterConformance') errors.push('kind is invalid')
exactKeys(data ?? {}, ['schema_version', 'kind', 'metadata', 'authority', 'contract', 'adapter', 'claim'], 'root')

const metadata = object(data?.metadata, 'metadata')
required(metadata, ['owner', 'fixture_only', 'purpose'], 'metadata')
if (metadata.fixture_only !== true) errors.push('metadata.fixture_only must be true')

const authority = object(data?.authority, 'authority')
const authorityKeys = ['may_modify_launchpad', 'may_certify', 'may_promote', 'may_publish_value_claim']
required(authority, authorityKeys, 'authority')
exactKeys(authority, authorityKeys, 'authority')
for (const key of authorityKeys) if (authority[key] !== false) errors.push(`authority.${key} must be false`)

const contract = object(data?.contract, 'contract')
required(contract, ['id', 'repository', 'revision', 'canonical_path', 'local_schema', 'sha256'], 'contract')
if (contract.id !== 'vef.claim.v1alpha2') errors.push('contract.id is invalid')
expectString(contract.revision, 'contract.revision', revision)
expectString(contract.sha256, 'contract.sha256', sha)

const adapter = object(data?.adapter, 'adapter')
required(adapter, ['owner', 'repository', 'revision', 'source_path', 'source_sha256', 'input_contract', 'output_envelope', 'output_schema_path', 'output_schema_sha256'], 'adapter')
if (adapter.owner !== 'launchpad') errors.push('adapter.owner must be launchpad')
expectString(adapter.revision, 'adapter.revision', revision)
expectString(adapter.source_sha256, 'adapter.source_sha256', sha)
expectString(adapter.output_schema_sha256, 'adapter.output_schema_sha256', sha)
if (adapter.input_contract !== 'launchpad.vef-pilot-input.v1alpha2') errors.push('adapter.input_contract is invalid')
if (adapter.output_envelope !== 'launchpad.vef-pilot-claim.v1alpha2') errors.push('adapter.output_envelope is invalid')

let schema: Record<string, any> = {}
try {
  const rootReal = await realpath(root)
  const schemaPath = resolve(root, contract.local_schema)
  if (relative(root, schemaPath).startsWith('..')) throw new Error('local schema escapes conformance root')
  const stat = await lstat(schemaPath)
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('local schema is not a regular file')
  const schemaReal = await realpath(schemaPath)
  if (relative(rootReal, schemaReal).startsWith('..')) throw new Error('local schema resolves outside conformance root')
  const bytes = await readFile(schemaPath)
  const actual = createHash('sha256').update(bytes).digest('hex')
  if (actual !== contract.sha256) errors.push('contract schema digest does not match the pinned canonical revision')
  schema = JSON.parse(bytes.toString('utf8'))
} catch (error) {
  errors.push(`contract schema is not readable: ${(error as Error).message}`)
}

if (Object.keys(schema).length) {
  const ajv = new Ajv2020({ allErrors: true, strict: false })
  addFormats(ajv)
  const validate = ajv.compile(schema)
  if (!validate(data?.claim)) {
    for (const error of validate.errors ?? []) errors.push(`claim${error.instancePath}: ${error.message}`)
  }
}

const secretKey = /(password|client_secret|bearer_token|authorization|private_key|kubeconfig|dockerconfigjson|api[_-]?key[_-]?value|token[_-]?value)/i
const walk = (value: any, path = 'root') => {
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${path}[${index}]`))
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if (secretKey.test(key)) errors.push(`forbidden secret-like field ${path}.${key}`)
    if (typeof child === 'string' && (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(child) || /https?:\/\/[^/@\s]+:[^/@\s]+@/.test(child))) errors.push(`secret-like value at ${path}.${key}`)
    walk(child, `${path}.${key}`)
  }
}
walk(data)

if (errors.length) {
  console.error(`VEF adapter conformance failed for ${manifestPath}:`)
  for (const error of [...new Set(errors)]) console.error(`- ${error}`)
  process.exit(1)
}
console.log(`Launchpad adapter is pinned to ${contract.id} at ${contract.revision}.`)
console.log('This conformance fixture grants no certification, promotion, publication, or financial authority.')
