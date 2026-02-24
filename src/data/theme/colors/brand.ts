import { defineSemanticTokens } from '@pandacss/dev'

export const brand = defineSemanticTokens.colors({
    '1': { value: { _light: '#fcfdff', _dark: '#09111e' } },
    '2': { value: { _light: '#f5faff', _dark: '#0f1827' } },
    '3': { value: { _light: '#eaf3ff', _dark: '#0d264c' } },
    '4': { value: { _light: '#daebff', _dark: '#072f69' } },
    '5': { value: { _light: '#c7e1ff', _dark: '#0f3b7c' } },
    '6': { value: { _light: '#b2d4ff', _dark: '#1a488e' } },
    '7': { value: { _light: '#98c2ff', _dark: '#2557a5' } },
    '8': { value: { _light: '#72a9fe', _dark: '#2c68c5' } },
    '9': { value: { _light: '#73aaff', _dark: '#285ba9' } },
    '10': { value: { _light: '#689ef2', _dark: '#1f4d93' } },
    '11': { value: { _light: '#376ab9', _dark: '#7db5ff' } },
    '12': { value: { _light: '#082f68', _dark: '#cce2ff' } },
    a1: { value: { _light: '#0055ff03', _dark: '#0012fe0e' } },
    a2: { value: { _light: '#0080ff0a', _dark: '#005cfb18' } },
    a3: { value: { _light: '#006eff15', _dark: '#0265fd40' } },
    a4: { value: { _light: '#0076ff25', _dark: '#0061fd5f' } },
    a5: { value: { _light: '#0077ff38', _dark: '#0d6fff73' } },
    a6: { value: { _light: '#0071ff4d', _dark: '#237aff86' } },
    a7: { value: { _light: '#0068ff67', _dark: '#3282ff9f' } },
    a8: { value: { _light: '#0064fe8d', _dark: '#3584ffc1' } },
    a9: { value: { _light: '#0065ff8c', _dark: '#3585ffa3' } },
    a10: { value: { _light: '#005ce997', _dark: '#2a7efe8c' } },
    a11: { value: { _light: '#0041a6c8', _dark: '#7db5ff' } },
    a12: { value: { _light: '#002863f7', _dark: '#cce2ff' } },
    solid: {
        bg: {
            DEFAULT: { value: { _light: '{colors.brand.9}', _dark: '{colors.brand.9}' } },
            hover: { value: { _light: '{colors.brand.10}', _dark: '{colors.brand.10}' } },
        },
        fg: { DEFAULT: { value: { _light: 'white', _dark: 'white' } } },
    },
    subtle: {
        bg: {
            DEFAULT: { value: { _light: '{colors.brand.a3}', _dark: '{colors.brand.a3}' } },
            hover: { value: { _light: '{colors.brand.a4}', _dark: '{colors.brand.a4}' } },
            active: { value: { _light: '{colors.brand.a5}', _dark: '{colors.brand.a5}' } },
        },
        fg: { DEFAULT: { value: { _light: '{colors.brand.a11}', _dark: '{colors.brand.a11}' } } },
    },
    surface: {
        bg: {
            DEFAULT: { value: { _light: '{colors.brand.a2}', _dark: '{colors.brand.a2}' } },
            active: { value: { _light: '{colors.brand.a3}', _dark: '{colors.brand.a3}' } },
        },
        border: {
            DEFAULT: { value: { _light: '{colors.brand.a6}', _dark: '{colors.brand.a6}' } },
            hover: { value: { _light: '{colors.brand.a7}', _dark: '{colors.brand.a7}' } },
        },
        fg: { DEFAULT: { value: { _light: '{colors.brand.a11}', _dark: '{colors.brand.a11}' } } },
    },
    outline: {
        bg: {
            hover: { value: { _light: '{colors.brand.a2}', _dark: '{colors.brand.a2}' } },
            active: { value: { _light: '{colors.brand.a3}', _dark: '{colors.brand.a3}' } },
        },
        border: { DEFAULT: { value: { _light: '{colors.brand.a7}', _dark: '{colors.brand.a7}' } } },
        fg: { DEFAULT: { value: { _light: '{colors.brand.a11}', _dark: '{colors.brand.a11}' } } },
    },
    plain: {
        bg: {
            hover: { value: { _light: '{colors.brand.a3}', _dark: '{colors.brand.a3}' } },
            active: { value: { _light: '{colors.brand.a4}', _dark: '{colors.brand.a4}' } },
        },
        fg: { DEFAULT: { value: { _light: '{colors.brand.a11}', _dark: '{colors.brand.a11}' } } },
    },
})
