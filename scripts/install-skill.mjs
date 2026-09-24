import { lstat, mkdir, symlink } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'skills/demo-story-builder')
const codexHome = process.env.CODEX_HOME || resolve(process.env.HOME, '.codex')
const destination = resolve(codexHome, 'skills/demo-story-builder')

try {
  await lstat(destination)
  console.error(`Skill already exists at ${destination}. Remove or relocate it before installing this canonical symlink.`)
  process.exit(1)
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

await mkdir(dirname(destination), { recursive: true })
await symlink(source, destination, 'dir')
console.log(`Installed demo-story-builder at ${destination}`)
