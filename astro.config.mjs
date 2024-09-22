import { defineConfig } from 'astro/config';

import { remarkGfm } from './nonagfm.mjs'
import { underLine, MDNblock } from './markparse.mjs';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  site: 'https://nona-takahara.github.io',
  build: {
    format: 'preserve',
    inlineStylesheets: 'never',
    assets: 'assets'
  },
  markdown: {
    remarkPlugins: [
      remarkGfm, remarkMath, underLine, MDNblock
    ],
    syntaxHighlight: false
  }
});
