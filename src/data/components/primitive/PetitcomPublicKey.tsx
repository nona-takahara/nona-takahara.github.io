import { styled } from "styled-system/jsx";

export const PetitcomPublicKey = styled("div", {
  base: {
    borderWidth: "thin",
    borderColor: "colorPalette.outline.border",
    borderRadius: "l2",
    bg: "colorPalette.solid.bg",
    display: "inline-flex",
    padding: "1",
    margin: "1",
    alignItems: "center",
    fontWeight: "medium",
    "& .key-target": {
      paddingX: "2",
      display: "inline-block",
      color: "colorPalette.solid.fg",
    },
    "& .key": {
      paddingY: "0.5",
      paddingX: "2.5",
      display: "inline-block",
      fontFamily: "var(--font-mono)",
      fontSize: "xl",
      fontWeight: "bold",
      bg: "gray.1",
      color: "gray.12",
      borderRadius: "l2",
    },
  },
});

