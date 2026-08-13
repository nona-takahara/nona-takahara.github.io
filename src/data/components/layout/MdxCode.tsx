import type { ComponentProps } from 'react';
import { Code as InlineCode } from '@data/components/ui';

type MdxCodeProps = ComponentProps<'code'> & { 'data-lang'?: string };

// markparse.mjs の remarkCodeLanguage が、フェンス付きコードブロックには
// `data-lang="language-<言語名>"` を付ける。インラインコードには言語指定が
// 無い限り付かないので、これでブロックとインラインを判別する。
export const MdxCode = (props: MdxCodeProps) => {
    const { ['data-lang']: dataLang, className, ...rest } = props;

    if (dataLang?.includes('language-')) {
        // ブロックはハイライトスクリプトが language-* クラスを見て処理するため、
        // レシピを当てずに素の <code> のまま通す。
        return <code {...rest} data-lang={dataLang} className={mergeClassNames(className, dataLang)} />;
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
