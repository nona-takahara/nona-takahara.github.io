import type { HTMLAttributes } from "react";
import { styled } from "styled-system/jsx";

const Root = styled("aside", {
  base: {
    borderWidth: "thin",
    borderStyle: "solid",
    borderInlineStartWidth: "ultraThick",
    borderInlineStartStyle: "solid",
    borderRadius: "l2",
    display: "flex",
    flexDirection: "column",
    gap: "2",
    marginBlock: "4",
    paddingInline: "4",
    paddingBlock: "3",
    "& p": {
      marginBlock: "0",
    },
    "& p + p": {
      marginTop: "2",
    },
  },
  variants: {
    kind: {
      callout: {
        borderColor: "gray.7",
        bg: "gray.2",
      },
      note: {
        borderColor: "colorPalette.7",
        bg: "colorPalette.2",
      },
      warning: {
        borderColor: "error.7",
        bg: "error.2",
      },
    },
  },
  defaultVariants: {
    kind: "callout",
  },
});

type CalloutKind = "callout" | "note" | "warning";
type CalloutProps = HTMLAttributes<HTMLElement> & {
  "data-variant"?: string;
};

function resolveKind(dataVariant: string | undefined): CalloutKind {
  if (dataVariant === "warning") {
    return "warning";
  }

  if (dataVariant === "note") {
    return "note";
  }

  return "callout";
}

export function Callout({ "data-variant": dataVariant, ...props }: CalloutProps) {
  const kind = resolveKind(dataVariant);

  return (
    <Root
      kind={kind}
      data-variant={dataVariant || kind}
      {...props}
    />
  );
}
