import { styled } from "@/styled-system/jsx";

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

export const MdxPre = (props: any) => {
    const codeProps = props.children?.props?.value;
    if (codeProps?.includes("data-lang")) {
        return (
            <CodePre {...props} />
        )
    }

    return (
        <pre {...props} />
    );
};
