import { readFile } from 'node:fs/promises'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { parse } from 'yaml'

export const portfolioPath = new URL('../contracts/catalog/portfolio-v2.yaml', import.meta.url)
export const schemaPath = new URL('../contracts/catalog/portfolio-v2.schema.json', import.meta.url)

export async function readPortfolio(path = portfolioPath) {
  return parse(await readFile(path, 'utf8'), { maxAliasCount: 100, merge: true })
}

export async function validatePortfolio(data) {
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'))
  const ajv = new Ajv2020({ allErrors: true, strict: true })
  addFormats(ajv)
  const validate = ajv.compile(schema)
  const errors = []
  if (!validate(data)) {
    for (const error of validate.errors ?? []) errors.push(`${error.instancePath || '/'} ${error.message}`)
  }

  const items = Array.isArray(data?.items) ? data.items : []
  const ids = new Set()
  const launchpadIds = new Set()
  for (const item of items) {
    if (ids.has(item.id)) errors.push(`duplicate item id ${item.id}`)
    ids.add(item.id)
    const catalogId = item.launchpad?.catalog_item_id
    if (catalogId) {
      if (launchpadIds.has(catalogId)) errors.push(`duplicate Launchpad catalog id ${catalogId}`)
      launchpadIds.add(catalogId)
    }
  }

  for (const item of items) {
    const references = [...(item.prerequisites ?? []), ...(item.recommended_next_items ?? []), item.branches_from].filter(Boolean)
    for (const reference of references) if (!ids.has(reference)) errors.push(`${item.id} references unknown item ${reference}`)
    if (item.experience_type === 'sales_entry' && item.learning_level !== null) errors.push(`${item.id} sales entry must not claim a learning level`)
    if (item.experience_type !== 'sales_entry' && item.learning_level === null) errors.push(`${item.id} must declare a learning level`)
    if (item.journey_role === 'specialty' && (!item.specialty_family || !item.branches_from)) errors.push(`${item.id} specialty requires specialty_family and branches_from`)
    if (item.learning_level === '601' && item.launchpad?.lifecycle !== 'research_only') errors.push(`${item.id} level 601 must remain research_only`)
    if (item.launchpad?.lifecycle === 'launchpad_active' && (!item.launchpad.catalog_item_id || item.launchpad.certified_seats < 1)) errors.push(`${item.id} active Launchpad record requires an ID and certified seats`)
    if (['intake_ready', 'research_only', 'factory_only', 'planned'].includes(item.launchpad?.lifecycle) && item.launchpad?.certified_seats !== 0) errors.push(`${item.id} factory-side state must remain zero-seat`)
    if (item.launchpad?.lifecycle === 'intake_ready' && (!item.source_revision || (!item.artifacts?.presentation && !item.artifacts?.workload))) errors.push(`${item.id} intake_ready requires source and immutable artifact identity`)
  }
  return [...new Set(errors)]
}

export function readinessGaps(item) {
  return applicableReadinessKeys(item).filter((gate) => !item.readiness?.[gate]).map((gate) => gate.replaceAll('_', ' '))
}

export function applicableReadinessKeys(item) {
  if (item.experience_type === 'sales_entry') return ['source_bound', 'signed', 'sbom', 'runtime_secret_contract']
  if (item.experience_type === 'research') return ['source_bound', 'signed', 'sbom', 'runtime_secret_contract']
  return ['source_bound', 'signed', 'sbom', 'runtime_secret_contract', 'resource_estimate', 'one_seat', 'five_seat', 'reclaim']
}

export function trackLabel(track) {
  return ({ shared_foundation: 'Shared foundation', agentic_ai: 'Agentic AI', sovereign_ai: 'Sovereign AI', virtualization_ai: 'Virtualization + AI' })[track] ?? track
}
