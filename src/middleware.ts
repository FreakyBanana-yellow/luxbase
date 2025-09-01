// scripts/apply-prerender-flag.js
const fs = require('fs');
const path = require('path');

const roots = [
  'src/pages/dashboard',
  'src/pages/agency',
  'src/pages/admin',
  // ggf. ergänzen: 'src/pages/vault', 'src/pages/vipbot', ...
];

function listAstroFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listAstroFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.astro')) out.push(full);
  }
  return out;
}

function ensureFlag(file) {
  let txt = fs.readFileSync(file, 'utf8');
  if (/export\s+const\s+prerender\s*=\s*false\s*;/.test(txt)) {
    console.log('OK:', file);
    return;
  }
  if (txt.startsWith('---')) {
    const end = txt.indexOf('---', 3);
    if (end !== -1) {
      const before = txt.slice(0, end + 3);
      const after = txt.slice(end + 3);
      const injected = before + '\nexport const prerender = false;\n' + after;
      fs.writeFileSync(file, injected, 'utf8');
      console.log('Injected (frontmatter):', file);
      return;
    }
  }
  const injected = 'export const prerender = false;\n' + txt;
  fs.writeFileSync(file, injected, 'utf8');
  console.log('Injected (top):', file);
}

for (const root of roots) {
  for (const f of listAstroFiles(root)) ensureFlag(f);
}
console.log('Done.');
