import { readPortfolio, validatePortfolio } from './catalog-portfolio-lib.mjs'

const path = process.argv[2] ? new URL(process.argv[2], `file://${process.cwd()}/`) : undefined
const data = await readPortfolio(path)
const errors = await validatePortfolio(data)
if (errors.length) {
  console.error('Catalog portfolio validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log(`Catalog portfolio v2 is valid: ${data.items.length} items, zero Launchpad authority granted.`)
