import { defineRecipe } from '@pandacss/dev'

export const callout = defineRecipe({
  className: 'callout',
  base: {
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderInlineStartWidth: 'ultraThick',
    borderInlineStartStyle: 'solid',
    borderRadius: 'l2',
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    marginBlock: '4',
    paddingInline: '4',
    paddingBlock: '3',
    // Panda always emits utilities after recipes, so a recipe cannot override the `mt="1"` that every
    // article paragraph carries (MdxComponents). `!important` is what lets these two rules win.
    '& p': {
      marginBlock: '0 !important',
    },
    '& p + p': {
      marginTop: '2 !important',
    },
  },
  defaultVariants: {
    kind: 'callout',
  },
  variants: {
    kind: {
      callout: {
        borderColor: 'gray.7',
        bg: 'gray.2',
      },
      note: {
        borderColor: 'colorPalette.7',
        bg: 'colorPalette.2',
      },
      warning: {
        borderColor: 'red.7',
        bg: 'red.2',
      },
    },
  },
})
