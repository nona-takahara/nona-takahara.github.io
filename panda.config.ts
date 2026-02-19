import { green } from "@data/theme/colors/green";
import { red } from "@data/theme/colors/red";
import { neutral } from "@data/theme/colors/neutral";
import { violet } from "@data/theme/colors/violet";
import { animationStyles } from "@data/theme/animation-styles";
import { zIndex } from "@data/theme/tokens/z-index";
import { shadows } from "@data/theme/tokens/shadows";
import { durations } from "@data/theme/tokens/durations";
import { colors } from "@data/theme/tokens/colors";
import { textStyles } from "@data/theme/text-styles";
import { layerStyles } from "@data/theme/layer-styles";
import { keyframes } from "@data/theme/keyframes";
import { globalCss } from "@data/theme/global-css";
import { conditions } from "@data/theme/conditions";
import { slotRecipes, recipes } from "@data/theme/recipes";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      tokens: {
        colors: colors,
        durations: durations,
        zIndex: zIndex
      },

      semanticTokens: {
        colors: {
          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}"
              }
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}"
              }
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}"
              }
            }
          },

          border: {
            value: {
              _light: "{colors.gray.4}",
              _dark: "{colors.gray.4}"
            }
          },

          error: {
            value: {
              _light: "{colors.red.9}",
              _dark: "{colors.red.9}"
            }
          },

          violet: violet,
          gray: neutral,
          red: red,
          green: green
        },

        shadows: shadows,

        radii: {
          l1: {
            value: "{radii.xs}"
          },

          l2: {
            value: "{radii.sm}"
          },

          l3: {
            value: "{radii.md}"
          }
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss: globalCss,
  conditions: conditions
});
