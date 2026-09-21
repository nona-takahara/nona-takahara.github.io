// panda.config.ts plus two changes. It writes Panda's CSS on its own, apart from the site build.
//
//   npx panda cssgen --config scripts/panda.static.config.ts --outfile panda.css
//
// 1. `staticCss`: the site build emits only the recipe variants and utilities its pages use. This config emits
//    every variant of every recipe, each colorPalette class, and a class for every textStyle and fontSize.
// 2. `dark`: the site follows the OS (`prefers-color-scheme`). Here the condition is `data-theme="dark"`
//    on an ancestor, for a page that switches themes with that attribute.
import base from '../panda.config'
import { textStyles } from '../src/data/theme/text-styles'
import { fontSizes } from '../src/data/theme/tokens/font-sizes'

export default {
  ...base,
  conditions: { extend: { ...base.conditions?.extend, dark: '[data-theme=dark] &' } },
  staticCss: {
    recipes: '*',
    css: [{
      properties: {
        colorPalette: ['brand', 'gray', 'green', 'red'],
        textStyle: Object.keys(textStyles),
        fontSize: Object.keys(fontSizes),
      },
    }],
  },
}
