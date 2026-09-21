// Regenerates the `.prose` rules of the Claude Design project's colors_and_type.css from Panda's CSS.
//
//   npx panda cssgen --config scripts/panda.static.config.ts --outfile panda.css
//   node scripts/gen-design-prose.mjs panda.css <path to colors_and_type.css>   > updated.css
//
// Inside `.prose`, a bare element (`<h2>`, `<ul>`, `<blockquote>`, ...) gets the rules the site gives it in
// an article. The site does that by mapping element names to components (layout/MdxComponents.tsx,
// layout/MdxCode.tsx), and each component carries Panda classes. Here each mapped element takes the rules
// of those classes, copied from Panda's own CSS, so the values are the site's and are never written twice.
//
// Only the text between `BEGIN GENERATED: prose` and `END GENERATED: prose` is replaced. Running it twice
// gives the same file.
import fs from 'node:fs';

const [pandaPath, targetPath] = process.argv.slice(2);
if (!pandaPath || !targetPath) {
  console.error('usage: node scripts/gen-design-prose.mjs <panda.css> <path to colors_and_type.css>');
  process.exit(1);
}

// Element inside `.prose` -> the Panda classes the site puts on it. Later classes win over earlier ones.
// The table follows MdxComponents.tsx: h1 fontSize 3xl mt 5, h2 2xl mt 4, h3 xl mt 3, h4-h6 lg mt 2, p mt 1,
// and MdxCode.tsx: inline code is the `code` recipe with colorPalette gray.
const MAP = [
  ['h1', ['heading', 'fs_3xl', 'mt_5']],
  ['h2', ['heading', 'fs_2xl', 'mt_4']],
  ['h3', ['heading', 'fs_xl', 'mt_3']],
  ['h4', ['heading', 'fs_lg', 'mt_2']],
  ['h5', ['heading', 'fs_lg', 'mt_2']],
  ['h6', ['heading', 'fs_lg', 'mt_2']],
  ['p', ['text', 'mt_1']],
  ['a', ['link', 'link--variant_underline']],
  ['ul', ['unordered-list']],
  ['ol', ['ordered-list']],
  ['li', ['list-item']],
  ['blockquote', ['blockquote']],
  ['hr', ['horizontal-rule']],
  ['pre', ['code-block']],
  ['code:not([data-lang])', ['code', 'code--size_md', 'code--variant_subtle', 'color-palette_gray']],
  ['aside[data-variant="callout"]', ['callout', 'callout--kind_callout']],
  ['aside[data-variant="note"]', ['callout', 'callout--kind_note']],
  ['aside[data-variant="warning"]', ['callout', 'callout--kind_warning']],
];

// The site is the source of the table above. Stop when MdxComponents.tsx no longer says what MAP says.
const mdx = fs.readFileSync(new URL('../src/data/components/layout/MdxComponents.tsx', import.meta.url), 'utf8');
const stale = [];
const utility = (classes, prefix) => classes.find((c) => c.startsWith(prefix))?.slice(prefix.length);
for (const [element, classes] of MAP) {
  const level = /^h([1-6])$/.exec(element)?.[1];
  if (level) {
    const found = new RegExp(`h${level}: \\(props: \\w+\\) => <Heading as="h${level}" fontSize="(\\w+)" mt="([\\d.]+)"`).exec(mdx);
    if (found?.[1] !== utility(classes, 'fs_') || found?.[2] !== utility(classes, 'mt_')) stale.push(element);
  }
}
if (!/p: \(props: \w+\) => <Text mt="1"/.test(mdx)) stale.push('p');
const components = { a: 'Link', ul: 'UnorderedList', ol: 'OrderedList', li: 'ListItem', blockquote: 'Blockquote', hr: 'HorizontalRule', pre: 'MdxPre', code: 'MdxCode', '"mdn-callout"': 'Callout' };
for (const [element, component] of Object.entries(components)) {
  if (!new RegExp(`${element}: ${component}\\b`).test(mdx)) stale.push(element);
}
if (stale.length) {
  console.error(`MdxComponents.tsx and the MAP in this script disagree about: ${stale.join(', ')}`);
  process.exit(1);
}

// Panda's output is flat: rules inside nested @layer blocks, and @media / @supports blocks around some rules.
function parseRules(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const walk = (start, end, at) => {
    let i = start;
    while (i < end) {
      const open = css.indexOf('{', i);
      const semi = css.indexOf(';', i);
      if (open < 0 || open >= end) break;
      if (semi >= 0 && semi < open && css.slice(i, semi).trim().startsWith('@')) { i = semi + 1; continue; } // `@layer a, b;`
      const prelude = css.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (depth > 0) { const c = css[j++]; if (c === '{') depth++; else if (c === '}') depth--; }
      const inner = [open + 1, j - 1];
      if (prelude.startsWith('@layer')) walk(...inner, at);
      else if (prelude.startsWith('@')) walk(...inner, [...at, prelude]);
      else rules.push({ selectors: splitSelectors(prelude), body: css.slice(...inner).trim(), at });
      i = j;
    }
  };
  walk(0, css.length, []);
  return rules;
}

// Split a selector list at top-level commas (commas inside :is(...) or [...] stay).
function splitSelectors(text) {
  const out = []; let depth = 0, cur = '';
  for (const c of text) {
    if ('([' .includes(c)) depth++;
    if (')]'.includes(c)) depth--;
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += c;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const declarations = (body) => body.split(';').map((d) => d.trim()).filter(Boolean);

const panda = parseRules(fs.readFileSync(pandaPath, 'utf8'));

const out = [];
for (const [element, classes] of MAP) {
  const base = `.prose ${element}`;
  const blocks = new Map(); // "at|selector" -> declarations, in the order the classes are applied
  for (const cls of classes) {
    // `.cls` followed by the end of the selector or by a pseudo-class / combinator, not by more name characters.
    const head = new RegExp(`^\\.${escapeRe(cls)}(?![A-Za-z0-9_\\\\-])`);
    let found = false;
    for (const rule of panda) {
      for (const sel of rule.selectors) {
        if (!head.test(sel)) continue;
        found = true;
        const key = `${rule.at.join(' ')}|${sel.replace(head, base)}`;
        blocks.set(key, [...(blocks.get(key) ?? []), ...declarations(rule.body)]);
      }
    }
    if (!found) {
      console.error(`class ".${cls}" (for "${element}") is not in ${pandaPath}`);
      process.exit(1);
    }
  }
  for (const [key, decls] of blocks) {
    const [at, selector] = [key.slice(0, key.indexOf('|')), key.slice(key.indexOf('|') + 1)];
    const line = `${selector} { ${decls.join('; ')}; }`;
    out.push(at ? `${at} { ${line} }` : line);
  }
}

const header = `/* Generated from Panda's CSS by scripts/gen-design-prose.mjs: what the site's MDX gives each element in an article. */`;
const region = [header, ...out];

const text = fs.readFileSync(targetPath, 'utf8');
const begin = text.indexOf('/* BEGIN GENERATED: prose');
const end = text.indexOf('/* END GENERATED: prose');
if (begin < 0 || end < begin) {
  console.error(`markers for region "prose" not found in ${targetPath}`);
  process.exit(1);
}
const afterBegin = text.indexOf('\n', begin) + 1;
const endLineStart = text.lastIndexOf('\n', end) + 1;
process.stdout.write(text.slice(0, afterBegin) + region.join('\n') + '\n' + text.slice(endLineStart));
