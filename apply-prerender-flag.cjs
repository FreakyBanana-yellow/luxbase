New-Item -ItemType Directory -Force scripts | Out-Null
Set-Content -Path scripts\apply-prerender-flag.cjs -Value @'
const fs = require('fs');
const path = require('path');

const roots = ['src/pages/dashboard', 'src/pages/agency', 'src/pages/admin'];

function listAstroFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listAstroFiles(full));
    else if (entry.isFile() && full.endsWith('.astro')) out.push(full);
  }
  return out;
}

function ensureFlag(file) {
  const txt = fs.readFileSync(file, 'utf8');
  if (txt.includes('export const prerender = false')) return;

  const fm = /^---[\s\S]*?---/.exec(txt);
  if (fm) {
    const injected = txt.replace(fm[0], `${fm[0]}\nexport const prerender = false;\n`);
    fs.writeFileSync(file, injected, 'utf8');
    console.log('Injected (frontmatter):', file);
    return;
  }
  const injected = 'export const prerender = false;\n' + txt;
  fs.writeFileSync(file, injected, 'utf8');
  console.log('Injected (top):', file);
}

for (const root of roots) for (const f of listAstroFiles(root)) ensureFlag(f);
console.log('Done (apply-prerender-flag).');
'@
