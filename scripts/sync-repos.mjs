#!/usr/bin/env node
/**
 * Rafraîchit les champs mécaniques de `src/data/projects.ts` (langage, étoiles,
 * date de mise à jour) à partir de l'API GitHub, et signale les dépôts publics
 * qui manquent ou qui ne devraient plus figurer sur la page.
 *
 * Les titres, catégories et descriptions restent écrits à la main : le script
 * ne les touche jamais.
 *
 *   node scripts/sync-repos.mjs          # rapport seul
 *   node scripts/sync-repos.mjs --write  # applique les mises à jour
 *
 * Nécessite la CLI `gh` authentifiée.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const USER = 'FabriceBoyer'
const SELF = `${USER}.github.io`
const FILE = new URL('../src/data/projects.ts', import.meta.url)

const fields = 'name,description,primaryLanguage,stargazerCount,updatedAt,homepageUrl'
const raw = execFileSync(
  'gh',
  ['repo', 'list', USER, '--limit', '200', '--no-archived', '--source', '--visibility', 'public', '--json', fields],
  { encoding: 'utf8' },
)
const remote = JSON.parse(raw).filter((r) => r.name !== SELF)

let source = readFileSync(FILE, 'utf8')
const listed = [...source.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])

const missing = remote.filter((r) => !listed.includes(r.name))
const stale = listed.filter((s) => !remote.some((r) => r.name === s))

let changes = 0
for (const repo of remote) {
  if (!listed.includes(repo.name)) continue

  // Isole le bloc de l'objet correspondant à ce dépôt.
  const start = source.indexOf(`slug: '${repo.name}'`)
  const end = source.indexOf("\n  {", start)
  const block = source.slice(start, end === -1 ? source.length : end)

  const patched = block
    .replace(/lang: '[^']*'/, `lang: '${repo.primaryLanguage?.name ?? 'Other'}'`)
    .replace(/stars: \d+/, `stars: ${repo.stargazerCount}`)
    .replace(/updated: '[^']*'/, `updated: '${repo.updatedAt.slice(0, 10)}'`)

  if (patched !== block) {
    source = source.slice(0, start) + patched + source.slice(start + block.length)
    changes++
    console.log(`~ ${repo.name}`)
  }
}

if (missing.length) {
  console.log('\nDépôts publics absents de la page (à décrire à la main) :')
  for (const r of missing) console.log(`  + ${r.name} — ${r.description || '(sans description)'}`)
}
if (stale.length) {
  console.log('\nEntrées sans dépôt public correspondant (archivé, forké ou renommé ?) :')
  for (const s of stale) console.log(`  - ${s}`)
}

if (process.argv.includes('--write')) {
  writeFileSync(FILE, source)
  console.log(`\n${changes} entrée(s) mise(s) à jour dans src/data/projects.ts`)
} else if (changes) {
  console.log(`\n${changes} entrée(s) à mettre à jour — relancer avec --write`)
} else {
  console.log('\nRien à mettre à jour.')
}
