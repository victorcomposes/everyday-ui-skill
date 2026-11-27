// Writes proof/proof-standalone.html: proof/index.html with every ../*.png <img> inlined as a data URI.
// Run from anywhere: node scripts/inline-proof.mjs
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'proof/index.html');
const out = resolve(root, 'proof/proof-standalone.html');
const MAX = 16 * 1024 * 1024;

const cache = new Map();
const missing = [];
const dataUri = (rel) => {
  if (!cache.has(rel)) {
    const file = resolve(root, 'proof', rel);
    if (!existsSync(file)) { missing.push(rel); return rel; }
    cache.set(rel, `data:image/png;base64,${readFileSync(file).toString('base64')}`);
  }
  return cache.get(rel);
};

let html = readFileSync(src, 'utf8');
// Drop the link around a thumbnail: a data: URL cannot be opened from a link in most browsers.
html = html.replace(/<a href="\.\.\/[^"]+\.png">(<img [^>]*>)<\/a>/g, '$1');
html = html.replace(/(<img [^>]*?\bsrc=")(\.\.\/[^"]+\.png)(")/g, (_, a, rel, c) => a + dataUri(rel) + c);
html = html.replace(/(<img [^>]*?) loading="lazy"/g, '$1');

if (missing.length) { console.error('Missing files:\n' + [...new Set(missing)].join('\n')); process.exit(1); }
if (/<img [^>]*src="\.\./.test(html)) { console.error('An <img> still points outside proof/.'); process.exit(1); }
writeFileSync(out, html);
const size = statSync(out).size;
console.log(`${cache.size} images inlined, ${out} is ${(size / 1048576).toFixed(2)} MB`);
if (size >= MAX) { console.error('Output is 16 MB or more.'); process.exit(1); }
