export const globalCss = {
  extend: {
    '*': {
      '--global-color-border': 'colors.border',
      '--global-color-placeholder': 'colors.fg.subtle',
      '--global-color-selection': 'colors.colorPalette.subtle.bg',
      '--global-color-focus-ring': 'colors.colorPalette.solid.bg',
    },
    html: {
      colorPalette: 'brand',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg.default',
      color: 'fg.default',
      fontFamily: 'sans',
    },
    'code, pre, kbd, samp': {
      fontFamily: 'mono',
    },
  },
}
