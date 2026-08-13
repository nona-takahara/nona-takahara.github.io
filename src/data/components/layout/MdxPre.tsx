import type { ComponentProps } from "react";
import { styled } from "styled-system/jsx";

const CodePre = styled("pre", {
    base: {
        bg: 'gray.subtle.bg',
        color: 'gray.subtle.fg',
        px: '4',
        py: '2',
        my: '4',
        borderRadius: 'l2',
        fontVariantNumeric: 'tabular-nums',
        overflowX: 'auto'
    },
})

// 記事中の <pre> はフェンス付きコードブロックからしか生成されないため、
// 常にコードブロックとして装飾する。
export const MdxPre = (props: ComponentProps<"pre">) => <CodePre {...props} />;
