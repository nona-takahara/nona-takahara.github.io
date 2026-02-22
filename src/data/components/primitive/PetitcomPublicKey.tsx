import { styled } from "styled-system/jsx";

export const PetitcomPublicKey = styled("div", {
  base: {
    borderWidth: "thin",
    borderColor: "colorPalette.outline.border",
    borderRadius: "l2",
    bg: "colorPalette.surface.bg",
    display: "inline-flex",
    gap: "1",
    padding: "2",
    margin: "2",
    width: "fit-content",
    alignContent: "baseline",
    maxWidth: "full",
    "& .key-target": {
      alignContent: "baseline",
      color: "fg.muted",
    },
    "& .key": {
      fontFamily: "var(--font-mono)",
      fontSize: "xl",
      fontWeight: "bold",
      letterSpacing: "0.08em",
      wordBreak: "break-all",
    },
  },
});

