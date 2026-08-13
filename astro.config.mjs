import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import { remarkGfm } from './nonagfm.mjs'
import { underLine, MDNblock, remarkCodeLanguage } from './markparse.mjs';
import remarkMath from 'remark-math';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://nonasaba.net',

  build: {
    format: 'preserve',
    inlineStylesheets: 'never',
    assets: 'assets'
  },

  markdown: {
    remarkPlugins: [
      remarkGfm, remarkMath, underLine, MDNblock, remarkCodeLanguage
    ],
    syntaxHighlight: false
  },

  integrations: [react(), mdx({
    extendMarkdownConfig: true
  })],

  vite: {
    resolve: {
      alias: [
        {
          find: /^styled-system\/(.*)$/,
          replacement: fileURLToPath(new URL('./styled-system/$1', import.meta.url)),
        },
      ],
    },
  },
});
