// Regenerates the colour tokens of the Claude Design project's colors_and_type.css from the Panda theme.
// Source of truth: src/data/theme/colors/*.ts and src/data/theme/tokens/colors.ts.
//
//   node scripts/gen-design-tokens.mjs <path to colors_and_type.css>   > updated.css
//
// Only the text between the `BEGIN GENERATED: <name>` and `END GENERATED: <name>` comments is replaced.
// Everything outside those comments is hand-written and is left alone. Running it twice gives the same file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2];
if (!target) {
  console.error('usage: node scripts/gen-design-tokens.mjs <path to colors_and_type.css>');
  process.exit(1);
}
const load = (rel) => import(pathToFileURL(path.join(repo, rel)).href);

const { neutral } = await load('src/data/theme/colors/neutral.ts');
const { brand } = await load('src/data/theme/colors/brand.ts');
const { green } = await load('src/data/theme/colors/green.ts');
const { red } = await load('src/data/theme/colors/red.ts');
const { colors: primitives } = await load('src/data/theme/tokens/colors.ts');

// CSS name -> theme object. panda.config.ts publishes `neutral` as `gray`.
const PALETTES = [['gray', neutral], ['brand', brand], ['green', green], ['red', red]];
const ROLE_GROUPS = ['solid', 'subtle', 'surface', 'outline', 'plain'];

// '{colors.brand.9}' -> var(--brand-9)   '{colors.white}' -> var(--white)   'white' -> white
function ref(v) {
  const m = /^\{colors\.([a-z]+)(?:\.([a0-9]+))?\}$/.exec(v);
  if (!m) return v;
  return m[2] ? `var(--${m[1]}-${m[2]})` : `var(--${m[1]})`;
}
const light = (val) => ref(typeof val === 'string' ? val : val._light);
const dark = (val) => ref(typeof val === 'string' ? val : val._dark);

// a role group -> [[css suffix, value], ...]   e.g. ['solid-bg-hover', ...]
function roleLeaves(group, node, trail = []) {
  const out = [];
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object' && 'value' in v) {
      out.push([[group, ...trail, ...(k === 'DEFAULT' ? [] : [k])].join('-'), v.value]);
    } else if (v && typeof v === 'object') {
      out.push(...roleLeaves(group, v, [...trail, k]));
    }
  }
  return out;
}

const rampKeys = (p) => Object.keys(p).filter((k) => /^a?\d+$/.test(k))
  .sort((a, b) => (a.startsWith('a') - b.startsWith('a')) || (parseInt(a.replace('a', '')) - parseInt(b.replace('a', ''))));

// Every palette must expose the same role vocabulary; otherwise `--color-palette-*` would have holes.
const roleNames = Object.fromEntries(PALETTES.map(([n, p]) =>
  [n, ROLE_GROUPS.flatMap((g) => roleLeaves(g, p[g]).map(([s]) => s)).sort()]));
for (const [n] of PALETTES) {
  if (JSON.stringify(roleNames[n]) !== JSON.stringify(roleNames.gray)) {
    console.error(`role vocabulary of "${n}" differs from "gray":\n${roleNames[n]}\nvs\n${roleNames.gray}`);
    process.exit(1);
  }
}
const ROLES = roleNames.gray;

const banner = (title) => ['', `  /* ${'='.repeat(71)} */`, `  /*  ${title.padEnd(69)}*/`, `  /* ${'='.repeat(71)} */`];
const paletteBlock = (name) => [
  ...ROLES.map((r) => `  --color-palette-${r}: var(--${name}-${r});`),
  ...rampKeys(PALETTES.find(([n]) => n === name)[1]).map((k) => `  --color-palette-${k}: var(--${name}-${k});`),
];

// ---- region "light": inside :root ------------------------------------------------------------
const L = [];
for (const [name, ramp] of [['black', primitives.black], ['white', primitives.white]]) {
  L.push(`  --${name}: ${ramp.DEFAULT.value};`);
  for (let i = 1; i <= 12; i++) L.push(`  --${name}-a${i}: ${ramp['a' + i].value};`);
}
const D = []; // dark overrides
for (const [name, p] of PALETTES) {
  L.push(...banner(`${name.toUpperCase()} — ramp 1→12 + alpha a1→a12 (light)`));
  D.push('', `  /* ${name} */`);
  for (const k of rampKeys(p)) {
    L.push(`  --${name}-${k}: ${light(p[k].value)};`);
    D.push(`  --${name}-${k}: ${dark(p[k].value)};`);
  }
}
for (const [name, p] of PALETTES) {
  L.push(...banner(`${name.toUpperCase()} — role tokens`));
  const d = [];
  for (const g of ROLE_GROUPS) {
    for (const [suffix, val] of roleLeaves(g, p[g])) {
      L.push(`  --${name}-${suffix}: ${light(val)};`);
      if (dark(val) !== light(val)) d.push(`  --${name}-${suffix}: ${dark(val)};`);
    }
  }
  if (d.length) D.push('', `  /* ${name} roles whose dark reference differs from light */`, ...d);
}
L.push(...banner('colorPalette — default brand (html { colorPalette: brand })'), ...paletteBlock('brand'));

// ---- region "palettes and dark": after :root -------------------------------------------------
const P = [
  `/* Panda's other palettes. Put the class on an element, like <Button colorPalette="gray">. */`,
  ...['gray', 'green', 'red', 'brand'].flatMap((n) => [`.color-palette_${n} {`, ...paletteBlock(n), '}']),
  '',
  '/* ============================================================================',
  '   DARK THEME  —  data-theme="dark"',
  '   ========================================================================== */',
  '[data-theme="dark"] {',
  ...D.filter((l, i, a) => !(l === '' && a[i - 1] === '')),
  '}',
];

function replaceRegion(text, name, bodyLines) {
  const begin = text.indexOf(`/* BEGIN GENERATED: ${name}`);
  const end = text.indexOf(`/* END GENERATED: ${name}`);
  if (begin < 0 || end < begin) {
    console.error(`markers for region "${name}" not found in ${target}`);
    process.exit(1);
  }
  const afterBegin = text.indexOf('\n', begin) + 1;
  const endLineStart = text.lastIndexOf('\n', end) + 1;
  return text.slice(0, afterBegin) + bodyLines.join('\n') + '\n' + text.slice(endLineStart);
}

let css = fs.readFileSync(target, 'utf8');
css = replaceRegion(css, 'light', L);
css = replaceRegion(css, 'palettes and dark', P);
process.stdout.write(css);
