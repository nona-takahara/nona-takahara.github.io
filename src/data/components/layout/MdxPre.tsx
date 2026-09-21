import type { ComponentProps } from "react";
import { styled } from "styled-system/jsx";
import { codeBlock } from "styled-system/recipes";

const CodePre = styled("pre", codeBlock)

// 記事中の <pre> はフェンス付きコードブロックからしか生成されないため、
// 常にコードブロックとして装飾する。
export const MdxPre = (props: ComponentProps<"pre">) => <CodePre {...props} />;
