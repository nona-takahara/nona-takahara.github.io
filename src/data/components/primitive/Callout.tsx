import type { HTMLAttributes } from "react";
import { styled } from "styled-system/jsx";
import { callout } from "styled-system/recipes";

const Root = styled("aside", callout);

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
