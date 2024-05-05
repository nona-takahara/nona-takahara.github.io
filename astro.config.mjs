import { defineConfig } from 'astro/config';

import { remarkGfm } from './nonagfm.mjs'
import { underLine, MDNblock } from './markparse.mjs';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  site: 'https://nona-takahara.github.io',
  build: {
    format: 'file'
  },
  markdown: {
    remarkPlugins: [
      remarkGfm, remarkMath, underLine, MDNblock
    ],
    syntaxHighlight: false
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            // 現在のビルド順序では404.cssが生成されるが、
            // 今後順序などが変更になった場合に対処が必要
            // 以下のIssueを追っている。
            // https://github.com/rollup/rollup/issues/4724
            if (assetInfo.name === '404.css') {
              return 'common.css';
            }
            return '[name][extname]';
          }
        }
      }
    }
  }
});