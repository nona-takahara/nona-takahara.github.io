/*!
 * こーげんやさい ビルドスクリプト (Kogen Yasai Build)
 * 
 * Some part is under the MIT License (source code by Titus Wormer)
 * 
 * The other parts are CC0
 */

import fs from 'fs/promises';
import 'date-utils';
import ejs from 'ejs';
import glob from 'glob-promise';
import fetch from 'node-fetch';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import yaml from 'yaml';

/*!
 * Begin a part under the MIT License.
 *
 * This part comes from remark-gfm and its dependances.
 *
 * Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>
 * 
 */
import { combineExtensions } from 'micromark-util-combine-extensions';
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';

import { gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown } from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';
import path from 'path';
import { visit } from 'unist-util-visit';
import { is } from 'unist-util-is';

function gfm(options) {
  return combineExtensions([gfmStrikethrough(options), gfmTable]);
}

function gfmFromMarkdown() {
  return [gfmStrikethroughFromMarkdown, gfmTableFromMarkdown];
}

function gfmToMarkdown(options) {
  return ({
    extensions: [gfmStrikethroughToMarkdown, gfmTableToMarkdown(options)]
  });
}

function remarkGfm(options = {}) {
  const data = this.data();
  add('micromarkExtensions', gfm(options));
  add('fromMarkdownExtensions', gfmFromMarkdown());
  add('toMarkdownExtensions', gfmToMarkdown(options));
  function add(field, value) {
    const list = (data[field] ? data[field] : (data[field] = []));
    list.push(value);
  }
}

/*! MIT License Part End */

// ここからMarkdownパースに関する諸設定

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'u'],
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...(defaultSchema.attributes.div || []),
      ['className', 'math', 'math-display', 'petitcom-key']
    ],
    span: [
      ...(defaultSchema.attributes.span || []),
      ['className', 'math', 'math-inline', 'key-target', 'key']
    ]
  }
};

const kogenStyleParser = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, [{
    type: 'yaml',
    marker: '-',
    anywhere: false
  }])
  .use(remarkExtractFrontmatter, {
    yaml: yaml.parse
  })
  .use(remarkGfm)
  .use(remarkMath)
  .use(underLine)
  .use(MDNblock)
  .use(remarkRehype)
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeStringify);

async function kogenStyleParse(processData) {
  return await kogenStyleParser.process(processData);
}

const TODAY = (() => {
  let k = new Date();
  k = k.add({ "minutes": k.getTimezoneOffset() });
  k = k.add({ "minutes": 540 });
  return k;
})();

// 諸設定ここまで
// ここから各ページ・ディレクトリの生成

async function makeIndexHtml() {
  const files = await glob('src/data/applist/!(_)*.md', {});
  const datas = await Promise.all(files.map(async function (v) {
    const d = await kogenStyleParse(await fs.readFile(v));

    if (d.data.latest?.dateiso) {
      let k = TODAY;
      if (d.data.latest.dateiso != 'today') {
        k = new Date(d.data.latest.dateiso);
      }
      d.data.latest.dateiso = k.toFormat('YYYY-MM-DD');
      d.data.latest.date = k.toFormat('YYYY年M月D日');
    }

    return ({ ...d.data, html: String(d) });
  }));

  datas.sort((v1, v2) => {
    return (v1.order || datas.length) - (v2.order || datas.length);
  });

  ejs.renderFile('src/template/index.ejs', { data: datas }, {}, (err, str) => {
    fs.writeFile('build/index.html', str);
  });
}

async function makeLinksHtml() {
  ejs.renderFile('src/template/links.ejs', { data: yaml.parse((await fs.readFile('src/data/links.yaml')).toString()) }, {}, (err, str) => {
    fs.writeFile('build/links.html', str);
  })
}

async function makeBlog() {
  const files = await glob('src/data/blog/entry*.md', {});
  const template = ejs.compile(String(await fs.readFile('src/template/blog.ejs')), { filename: 'src/template/blog.ejs' });
  const datas = await Promise.all(files.map(async function (v) {
    const d = await kogenStyleParse(await fs.readFile(v));
    const srcPath = path.format(
      {
        dir: 'build/blog', name: path.basename(v, '.md'), ext: '.html'
      }
    );
    const timestamp = await findFirstAndLatestTimeStamp(v);
    if (timestamp.first_commit) {
      d.data.first_dateiso = timestamp.first_commit.toFormat('YYYY-MM-DD');
      d.data.first_date = timestamp.first_commit.toFormat('YYYY年M月D日');
    }
    if (timestamp.latest_commit) {
      d.data.latest_dateiso = timestamp.latest_commit.toFormat('YYYY-MM-DD');
      d.data.latest_date = timestamp.latest_commit.toFormat('YYYY年M月D日');
    }
    d.data.fileName = path.basename(srcPath);

    await fs.mkdir('build/blog', { recursive: true });
    await fs.writeFile(srcPath, await template({ data: { ...d.data, html: String(d) }}));
    return d.data;
  }));

  datas.sort((v1, v2) => -v1.fileName.localeCompare(v2.fileName));

  ejs.renderFile('src/template/blog-index.ejs', { entries: datas }, {}, (err, str) => {
    fs.writeFile('build/blog/index.html', str);
  })
}

// ここまで各ページ・ディレクトリ生成
// ここから諸環境への対応処理

// 現状はGitHub APIから検索するが、今後違う方法になった場合に備える
async function findFirstAndLatestTimeStamp(fileName) {
  const res = await fetch(
    'https://api.github.com/repos/nona-takahara/' +
    'nona-takahara.github.io/commits' +
    `?path=${encodeURIComponent(fileName)}`);

  let first = null, latest = null;

  if (res.ok) {
    const commitData = await res.json();
    for (const k of commitData) {
      let d = k?.commit?.committer?.date;
      if (d) {
        d = (new Date(d)).add({ "minutes": 540 });
        if (first === null || d < first) {
          first = d;
        }
        if (latest === null || d > latest) {
          latest = d;
        }
      }
    }
  }

  return { first_commit: first, latest_commit: latest };
}

function underLine() {
  return (tree, file) => {
    visit(tree, 'strong', (node) => {
      const startCode = node.children[0].position.start.offset - 2;
      if (file.toString().substring(startCode, startCode + 2) === '__') {
        node.data = { hName: 'u' };
      }
    });
  }
}

function MDNblock() {
  return (tree, file) => {
    visit(tree, 'blockquote', (node) => {
      const firstChildren = node?.children?.[0];
      if (is(firstChildren, 'paragraph') && is(firstChildren?.children?.[0], 'strong')) {
        const boxType = firstChildren.children[0].children[0].value;

        if (boxType.includes("Key")) {
          petitcomKey(node);
        }
      }
    });
  }
}

function petitcomKey(node) {
  const valueString = node.children[0].children?.[1]?.value?.split(/\((.+)\)/);
  const keyTarget = valueString?.[1];
  const keyValue = valueString?.[2];

  node.type = 'columnbox';
  node.data = {
    hProperties: {
      className: ['petitcom-key']
    },
    hChildren: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['key-target'] },
        children: [{ type: 'text', value: keyTarget }]
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['key'] },
        children: [{ type: 'text', value: keyValue }]
      }
    ]
  };
  node.children = [];
}

// cpxが脆弱性のアレでマズかったので吹き飛ばしましたゆえ
async function myCp(src, dest) {
  const list = await glob(src, {});
  list.forEach(async (v) => {
    await fs.mkdir(dest, { recursive: true });
    fs.copyFile(v, path.format(
      {
        dir: dest,
        name: path.basename(v)
      }
    ));
  });
}

myCp("src/res/image/*.{html,png,jpg,ico,svg}", "build/image");
myCp("src/res/*.{html,png,jpg,ico,svg}", "build");
myCp("src/items/*.{html,png,jpg,ico,svg}", "build");
myCp("src/data/blog/*.{png,jpg,svg}", "build/blog");

makeIndexHtml();
makeLinksHtml();
makeBlog();
