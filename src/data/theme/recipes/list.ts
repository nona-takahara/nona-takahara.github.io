import { defineRecipe } from '@pandacss/dev'

export const unorderedList = defineRecipe({
  className: 'unordered-list',
  base: {
    listStyleType: 'disc',
    marginBlock: '2',
    paddingInlineStart: '6',
    '& ul': {
      listStyleType: 'circle',
      marginBlock: '1',
    },
    '& ul ul': {
      listStyleType: 'square',
    },
    '& ol': {
      marginBlock: '1',
    },
  },
})

export const orderedList = defineRecipe({
  className: 'ordered-list',
  base: {
    listStyleType: 'decimal',
    marginBlock: '2',
    paddingInlineStart: '6',
    '& ol': {
      listStyleType: 'lower-alpha',
      marginBlock: '1',
    },
    '& ol ol': {
      listStyleType: 'lower-roman',
    },
    '& ul': {
      marginBlock: '1',
    },
  },
})

export const listItem = defineRecipe({
  className: 'list-item',
  base: {
    marginBlock: '0.5',
  },
})
