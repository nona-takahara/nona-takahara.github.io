import { Code as InlineCode, type CodeProps } from '@data/components/ui';

export const MdxCode = (props: CodeProps & { 'data-lang'?: string }) => {
    const isBlock = props['data-lang']?.includes('language-');

    if (isBlock) {
        //@ts-ignore
        return <code className={props['data-lang'] || ''} {...props} />;
    }

    return <InlineCode colorPalette="gray" {...props} />;
};
