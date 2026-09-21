// Panda config for the Claude Design project's panda.css. It is panda.config.ts plus two changes.
//
//   npx panda cssgen --config scripts/panda.design.config.ts --outfile panda.css
//
// The output is Panda's own CSS, not a translation of it, so the project's components get exactly the
// styles the site gets. Nothing outside this repository is a source of truth for it.
//
// 1. `staticCss`: the site's build emits only the recipe variants its pages use. Claude Design needs every
//    variant of every recipe, and each colorPalette class, so they are all emitted.
// 2. `dark`: the site follows the OS (`prefers-color-scheme`). Claude Design switches themes with
//    `data-theme="dark"` on <html>, so the condition is that attribute instead.
import base from '../panda.config'

export default {
  ...base,
  conditions: { extend: { ...base.conditions.extend, dark: '[data-theme=dark] &' } },
  staticCss: {
    recipes: '*',
    css: [{ properties: { colorPalette: ['brand', 'gray', 'green', 'red'] } }],
  },
}
