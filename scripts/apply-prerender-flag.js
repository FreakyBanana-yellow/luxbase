// scripts/apply-prerender-flag.js
const fs = require('fs')
const path = require('path')

const targets = [
  'src/pages/dashboard/model.astro',
  'src/pages/dashboard/index.astro',
  'src/pages/dashboard/profile.astro',
  'src/pages/dashboard/vipbot-einstellungen.astro',
  'src/pages/agency/index.astro',
  'src/pages/admin/index.astro',
]

function ensureFlag(file) {
  if (!fs.existsSync(file)) return
  let txt = fs.readFileSync(file, 'utf8')
  if (/export\s+const\s+prerender\s*=\s*false\s*;/.test(txt)) {
    console.log('OK (already set):', file); return
  }
  if (txt.startsWith('---')) {
    const end = txt.indexOf('---', 3)
    if (end !== -1) {
      const before = txt.slice(0, end+3)
      const after = txt.slice(end+3)
      const injected = before + "\nexport const prerender = false;\n" + after
      fs.writeFileSync(file, injected, 'utf8')
      console.log('Injected (frontmatter):', file); return
    }
  }
  const injected = "export const prerender = false;\n" + txt
  fs.writeFileSync(file, injected, 'utf8')
  console.log('Injected (top):', file)
}

for (const f of targets) ensureFlag(path.resolve(process.cwd(), f))
console.log('Done.')
