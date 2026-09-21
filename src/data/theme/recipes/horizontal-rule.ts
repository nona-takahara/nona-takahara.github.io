import { defineRecipe } from '@pandacss/dev'

export const horizontalRule = defineRecipe({
  className: 'horizontal-rule',
  base: {
    border: 'none',
    borderTopWidth: 'thin',
    borderTopStyle: 'solid',
    borderTopColor: 'colorPalette.outline.border',
    marginBlock: '6',
  },
})
