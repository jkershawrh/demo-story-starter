#!/usr/bin/env node
import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const destinationArg = args[0]
const value = (flag: string) => {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : undefined
}

if (!destinationArg || destinationArg.startsWith('--')) {
  console.error('Usage: npm run scaffold -- <destination> --name <package-name> --title "Title" --subtitle "Subtitle"')
  process.exit(1)
}

const destination = resolve(destinationArg)
const name = value('--name') ?? basename(destination).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
const title = value('--title') ?? 'A live story worth remembering'
const subtitle = value('--subtitle') ?? 'Red Hat × Intel interactive demo'
const force = args.includes('--force')
const skillDir = dirname(fileURLToPath(import.meta.url))
const template = resolve(skillDir, '../../../template')

try {
  await stat(destination)
  if (!force) throw new Error(`Destination exists: ${destination}. Use --force only when replacing a disposable scaffold.`)
} catch (error) {
  if (error instanceof Error && !error.message.includes('ENOENT') && !error.message.includes('Destination exists')) throw error
  if (error instanceof Error && error.message.includes('Destination exists')) throw error
}

await mkdir(dirname(destination), { recursive: true })
const excluded = new Set(['node_modules', 'dist', 'test-results', 'playwright-report'])
await cp(template, destination, {
  recursive: true,
  force,
  filter: (source) => !excluded.has(basename(source)),
})

const packagePath = join(destination, 'package.json')
const pkg = JSON.parse(await readFile(packagePath, 'utf8'))
pkg.name = name
await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`)

const configPath = join(destination, 'src/demo.config.ts')
const config = (await readFile(configPath, 'utf8'))
  .replace("id: 'enterprise-ai-proof'", `id: '${name}'`)
  .replace("title: 'Build the proof, not just the pitch'", `title: ${JSON.stringify(title)}`)
  .replace("subtitle: 'A reusable Red Hat × Intel live-demo story'", `subtitle: ${JSON.stringify(subtitle)}`)
await writeFile(configPath, config)

const briefPath = join(destination, 'story.brief.yaml')
const brief = (await readFile(briefPath, 'utf8'))
  .replace('title: Build the proof, not just the pitch', `title: ${JSON.stringify(title)}`)
await writeFile(briefPath, brief)

console.log(`Created ${name} at ${destination}`)
console.log('Next: complete story.brief.yaml, then npm install && npm run check')
