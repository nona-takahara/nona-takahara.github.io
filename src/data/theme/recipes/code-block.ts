import { defineRecipe } from '@pandacss/dev'

export const codeBlock = defineRecipe({
  className: 'code-block',
  base: {
    bg: 'gray.subtle.bg',
    color: 'gray.subtle.fg',
    px: '4',
    py: '2',
    my: '4',
    borderRadius: 'l2',
    fontVariantNumeric: 'tabular-nums',
    overflowX: 'auto',
  },
})
