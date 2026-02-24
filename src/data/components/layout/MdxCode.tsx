import { Code as InlineCode, type CodeProps } from '@data/components/ui';

export const MdxCode = (props: CodeProps & { 'data-lang'?: string }) => {
    const { ['data-lang']: dataLang, className, ...rest } = props;
    const isBlock = dataLang?.includes('language-');
    const codeClassName = mergeClassNames(className, dataLang);

    if (isBlock) {
        //@ts-ignore
        return <code {...rest} data-lang={dataLang} className={codeClassName} />;
    }

    return <InlineCode colorPalette="gray" {...rest} className={className} data-lang={dataLang} />;
};

function mergeClassNames(...values: Array<string | undefined>) {
    const merged = new Set<string>();
    for (const value of values) {
        if (!value) continue;
        for (const name of value.split(/\s+/)) {
            if (name) merged.add(name);
        }
    }

    return merged.size ? Array.from(merged).join(' ') : undefined;
}
