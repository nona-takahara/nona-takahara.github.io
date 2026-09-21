import { defineRecipe } from '@pandacss/dev'

export const blockquote = defineRecipe({
  className: 'blockquote',
  base: {
    borderInlineStartWidth: 'ultraThick',
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: 'gray.12',
    borderEndRadius: 'l2',
    bg: 'gray.3',
    py: '2',
    pl: '4',
    m: '2',
  },
})
