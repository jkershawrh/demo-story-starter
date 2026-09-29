import assert from 'node:assert/strict'
import { readPortfolio, validatePortfolio } from './catalog-portfolio-lib.mjs'

const valid = await readPortfolio()
assert.deepEqual(await validatePortfolio(valid), [])

const clone = () => structuredClone(valid)
const duplicate = clone(); duplicate.items.push(structuredClone(duplicate.items[0]))
assert((await validatePortfolio(duplicate)).some((error) => error.includes('duplicate item id')))

const authority = clone(); authority.authority.grants_launchpad_authority = true
assert((await validatePortfolio(authority)).some((error) => error.includes('must be equal to constant')))

const brokenReference = clone(); brokenReference.items[0].recommended_next_items = ['missing-item']
assert((await validatePortfolio(brokenReference)).some((error) => error.includes('unknown item')))

const mutableImage = clone(); mutableImage.items[0].artifacts.presentation = 'ghcr.io/example/presentation:latest'
assert((await validatePortfolio(mutableImage)).some((error) => error.includes('must match pattern')))

const promotedResearch = clone(); promotedResearch.items.find((item) => item.learning_level === '601').launchpad.lifecycle = 'launchpad_active'
assert((await validatePortfolio(promotedResearch)).some((error) => error.includes('must remain research_only')))

console.log('Catalog portfolio adversarial tests passed.')
