import { createHash } from 'node:crypto'
import { lstat, readFile, realpath } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { parseDocument } from 'yaml'

const args = process.argv.slice(2)
const templateMode = args.includes('--template')
const input = args.find((arg) => !arg.startsWith('--')) ?? 'handoff/launchpad-handoff.yaml'
const manifestPath = resolve(input)
const root = dirname(manifestPath)
const text = await readFile(manifestPath, 'utf8')
const errors: string[] = []
const unquotedFlowUrlLine = text.split('\n').findIndex((line) => /\{[^\n]*:\s+https?:\/\//.test(line))
if (unquotedFlowUrlLine >= 0) errors.push(`YAML: quote URL values inside flow mappings (line ${unquotedFlowUrlLine + 1})`)
const document = parseDocument(text, { uniqueKeys: true, maxAliasCount: 0, strict: true })
for (const error of document.errors) errors.push(`YAML: ${error.message}`)
const data = document.toJS({ maxAliasCount: 0 }) as Record<string, any>

const object = (value: any, label: string): Record<string, any> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) { errors.push(`${label} must be an object`); return {} }
  return value
}
const exactKeys = (value: Record<string, any>, allowed: string[], label: string) => {
  for (const key of Object.keys(value)) if (!allowed.includes(key)) errors.push(`${label} has unknown field ${key}`)
}
const required = (value: Record<string, any>, keys: string[], label: string) => {
  for (const key of keys) if (!(key in value)) errors.push(`${label} is missing ${key}`)
}
const sha = /^[0-9a-f]{64}$/
const revision = /^[0-9a-f]{40}$/
const image = /^[^\s@]+@sha256:[0-9a-f]{64}$/
const placeholder = (value: string) => /^0+$/.test(value.replace(/^sha256:/, ''))
const expectString = (value: any, label: string, pattern?: RegExp) => {
  if (typeof value !== 'string' || !value || (pattern && !pattern.test(value))) errors.push(`${label} is invalid`)
}
const expectFalse = (value: any, label: string) => { if (value !== false) errors.push(`${label} must be false`) }
const expectInteger = (value: any, label: string, allowZero = false) => {
  if (!Number.isInteger(value) || value < (allowZero ? 0 : 1)) errors.push(`${label} must be ${allowZero ? 'non-negative' : 'positive'} integer`)
}

if (data?.schema_version !== 'demo-story.redhat-intel.com/launchpad-handoff/v1') errors.push('schema_version is invalid')
exactKeys(data ?? {}, ['schema_version', 'factory_receipt', 'proposed_launchpad_intake'], 'root')
const factory = object(data?.factory_receipt, 'factory_receipt')
required(factory, ['identity', 'authority', 'presentation_source', 'artifacts', 'factory_evidence', 'contracts', 'known_blockers'], 'factory_receipt')
exactKeys(factory, ['identity', 'authority', 'presentation_source', 'artifacts', 'factory_evidence', 'contracts', 'known_blockers'], 'factory_receipt')
const identity = object(factory.identity, 'factory_receipt.identity')
required(identity, ['catalog_item_id', 'display_name', 'proposed_track', 'proposed_learning_level'], 'factory_receipt.identity')
if (!['101', '201', '301', '401', '501', '601'].includes(identity.proposed_learning_level)) errors.push('proposed_learning_level is invalid')
const authority = object(factory.authority, 'factory_receipt.authority')
const authorityKeys = ['orderable', 'certified', 'promotion_eligible', 'may_modify_launchpad_catalog', 'may_provision', 'may_publish']
required(authority, authorityKeys, 'factory_receipt.authority'); exactKeys(authority, authorityKeys, 'factory_receipt.authority')
for (const key of authorityKeys) expectFalse(authority[key], `factory_receipt.authority.${key}`)
const presentationSource = object(factory.presentation_source, 'factory_receipt.presentation_source')
required(presentationSource, ['repository', 'revision', 'tree_dirty'], 'factory_receipt.presentation_source')
expectString(presentationSource.revision, 'presentation source revision', revision); expectFalse(presentationSource.tree_dirty, 'presentation source tree_dirty')

const artifacts = object(factory.artifacts, 'factory_receipt.artifacts')
required(artifacts, ['workload', 'presentation', 'showroom_content'], 'factory_receipt.artifacts')
const evidenceRefs: { label: string; path: string; digest: string }[] = []
for (const component of ['workload', 'presentation']) {
  const artifact = object(artifacts[component], `artifact ${component}`)
  required(artifact, ['image', 'architecture', 'source_repository', 'source_revision', 'release_receipt'], `artifact ${component}`)
  expectString(artifact.image, `${component} image`, image)
  if (artifact.architecture !== 'linux/amd64') errors.push(`${component} architecture must be linux/amd64`)
  expectString(artifact.source_revision, `${component} source revision`, revision)
  const receipt = object(artifact.release_receipt, `${component} release_receipt`)
  required(receipt, ['path', 'sha256'], `${component} release_receipt`); expectString(receipt.sha256, `${component} receipt sha256`, sha)
  evidenceRefs.push({ label: `${component} release receipt`, path: receipt.path, digest: receipt.sha256 })
  if (!templateMode && (placeholder(artifact.source_revision) || placeholder(artifact.image?.split('sha256:')[1] ?? '') || placeholder(receipt.sha256))) errors.push(`${component} contains placeholder identity`)
}
const content = object(artifacts.showroom_content, 'showroom_content')
required(content, ['repository', 'revision', 'bundle_digest'], 'showroom_content')
expectString(content.revision, 'showroom revision', revision); expectString(content.bundle_digest, 'showroom bundle digest', /^sha256:[0-9a-f]{64}$/)
if (!templateMode && (placeholder(content.revision) || placeholder(content.bundle_digest))) errors.push('showroom content contains placeholder identity')
const factoryEvidence = object(factory.factory_evidence, 'factory_evidence')
for (const key of ['development_journey', 'presentation_verification', 'zero_residue']) {
  const receipt = object(factoryEvidence[key], `factory_evidence.${key}`)
  required(receipt, ['path', 'sha256'], `factory_evidence.${key}`); expectString(receipt.sha256, `factory_evidence.${key}.sha256`, sha)
  evidenceRefs.push({ label: key, path: receipt.path, digest: receipt.sha256 })
  if (!templateMode && placeholder(receipt.sha256)) errors.push(`${key} contains placeholder digest`)
}

const intake = object(data?.proposed_launchpad_intake, 'proposed_launchpad_intake')
required(intake, ['api_version', 'catalog', 'learning', 'sources', 'runtime', 'certification_proposal', 'requested_pipeline_actions', 'subsequent_independent_gates'], 'proposed_launchpad_intake')
if (intake.api_version !== 'launchpad.redhat.com/v1alpha1') errors.push('proposed Launchpad api_version is invalid')
const catalog = object(intake.catalog, 'catalog'); required(catalog, ['catalog_item_id', 'display_name', 'description', 'category', 'version', 'status'], 'catalog')
if (catalog.status !== 'draft') errors.push('proposed catalog status must be draft')
if (catalog.catalog_item_id !== identity.catalog_item_id) errors.push('catalog_item_id mismatch')
const learning = object(intake.learning, 'learning')
required(learning, ['learning_level', 'learning_stage', 'experience_type', 'prerequisites', 'recommended_next_items', 'journey_role', 'specialty_family', 'branches_from', 'returns_to', 'shared_blueprint', 'solution_family'], 'learning')
if (learning.learning_level !== identity.proposed_learning_level) errors.push('learning level mismatch')
const sources = object(intake.sources, 'sources')
for (const name of ['showroom', 'workload']) {
  const source = object(sources[name], `sources.${name}`)
  required(source, name === 'showroom' ? ['repo_url', 'revision', 'playbook', 'start_path'] : ['repo_url', 'revision', 'deploy_path'], `sources.${name}`)
  expectString(source.revision, `sources.${name}.revision`, revision)
  if (!templateMode && placeholder(source.revision)) errors.push(`sources.${name}.revision is a placeholder`)
}
const runtime = object(intake.runtime, 'runtime')
required(runtime, ['deployment_type', 'deployment_class', 'deployment_scope', 'supported_architectures', 'supported_openshift_versions', 'required_operators', 'required_capabilities', 'required_models', 'exposure_policy', 'ingress', 'egress', 'cluster_scoped_resources', 'cleanup_owner', 'workload', 'resources', 'tabs', 'readiness_checks'], 'runtime')
const resources = object(runtime.resources, 'runtime.resources')
for (const section of ['steady_per_seat', 'peak_per_seat', 'workshop_shared']) {
  const values = object(resources[section], `runtime.resources.${section}`)
  for (const key of ['cpu_millicores', 'memory_mib', 'pods']) expectInteger(values[key], `${section}.${key}`, section === 'workshop_shared')
}
expectInteger(resources.provisioning_concurrency, 'provisioning_concurrency'); expectInteger(resources.observed_largest_run, 'observed_largest_run'); expectInteger(resources.safety_margin_percent, 'safety_margin_percent')
if (!Array.isArray(runtime.tabs) || !runtime.tabs.length) errors.push('runtime.tabs must be non-empty')
else { const ids = runtime.tabs.map((tab: any) => tab?.id); if (new Set(ids).size !== ids.length) errors.push('runtime.tabs ids must be unique'); for (const tab of runtime.tabs) required(object(tab, 'runtime tab'), ['id', 'title', 'source'], 'runtime tab') }
const requested = intake.requested_pipeline_actions
if (!Array.isArray(requested) || requested.some((item) => !['approve_source', 'run_discovery'].includes(item))) errors.push('requested_pipeline_actions may contain only approve_source and run_discovery')

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

if (!templateMode) {
  const rootReal = await realpath(root)
  for (const ref of evidenceRefs) {
    if (typeof ref.path !== 'string') { errors.push(`${ref.label} path is invalid`); continue }
    const candidate = resolve(root, ref.path)
    if (relative(root, candidate).startsWith('..')) { errors.push(`${ref.label} escapes handoff root`); continue }
    try {
      const stat = await lstat(candidate); if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('not a regular file')
      const candidateReal = await realpath(candidate); if (relative(rootReal, candidateReal).startsWith('..')) throw new Error('symlink escape')
      const actual = createHash('sha256').update(await readFile(candidate)).digest('hex')
      if (actual !== ref.digest) errors.push(`${ref.label} digest mismatch`)
    } catch (error) { errors.push(`${ref.label} is not readable: ${(error as Error).message}`) }
  }
}
if (errors.length) { console.error(`Handoff validation failed for ${manifestPath}:`); for (const error of [...new Set(errors)]) console.error(`- ${error}`); process.exit(1) }
console.log(`Launchpad handoff ${templateMode ? 'template' : 'manifest'} is structurally valid: ${manifestPath}`)
console.log('This grants no Launchpad approval, certification, provisioning, promotion, or publication authority.')
