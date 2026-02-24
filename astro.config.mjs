import { defineConfig } from 'astro/config';

import { remarkGfm } from './nonagfm.mjs'
import { underLine, MDNblock, remarkCodeLanguage } from './markparse.mjs';
import remarkMath from 'remark-math';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://nona-takahara.github.io',

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
    assets: 'assets'
  },
  trailingSlash: 'always',

  markdown: {
    remarkPlugins: [
      remarkGfm, remarkMath, underLine, MDNblock, remarkCodeLanguage
    ],
    syntaxHighlight: false
  },

  integrations: [react(), mdx({
    extendMarkdownConfig: true
  })]
});
