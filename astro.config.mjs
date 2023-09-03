import { defineConfig } from 'astro/config';

import { combineExtensions } from 'micromark-util-combine-extensions';
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';

import { gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown } from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';
import { visit } from 'unist-util-visit';
import { is } from 'unist-util-is';

import remarkMath from 'remark-math';

function gfm(options) {
    return combineExtensions([gfmStrikethrough(options), gfmTable]);
}

function gfmFromMarkdown() {
    return [gfmStrikethroughFromMarkdown, gfmTableFromMarkdown];
}

function gfmToMarkdown(options) {
    return ({
        extensions: [gfmStrikethroughToMarkdown, gfmTableToMarkdown(options)]
    });
}

function remarkGfm(options = {}) {
    const data = this.data();
    add('micromarkExtensions', gfm(options));
    add('fromMarkdownExtensions', gfmFromMarkdown());
    add('toMarkdownExtensions', gfmToMarkdown(options));
    function add(field, value) {
        const list = (data[field] ? data[field] : (data[field] = []));
        list.push(value);
    }
}

function underLine() {
    return (tree, file) => {
        visit(tree, 'strong', (node) => {
            const startCode = node.children[0].position.start.offset - 2;
            if (file.toString().substring(startCode, startCode + 2) === '__') {
                node.data = { hName: 'u' };
            }
        });
    }
}

function MDNblock() {
    return (tree, file) => {
        visit(tree, 'blockquote', (node) => {
            const firstChildren = node?.children?.[0];
            if (is(firstChildren, 'paragraph') && is(firstChildren?.children?.[0], 'strong')) {
                const boxType = firstChildren.children[0].children[0].value;

                if (boxType.includes("Key")) {
                    petitcomKey(node);
                }
            }
        });
    }
}

function petitcomKey(node) {
    const valueString = node.children[0].children?.[1]?.value?.split(/\((.+)\)/);
    const keyTarget = valueString?.[1];
    const keyValue = valueString?.[2];

    node.type = 'columnbox';
    node.data = {
        hProperties: {
            className: ['petitcom-key']
        },
        hChildren: [
            {
                type: 'element',
                tagName: 'span',
                properties: { className: ['key-target'] },
                children: [{ type: 'text', value: keyTarget }]
            },
            {
                type: 'element',
                tagName: 'span',
                properties: { className: ['key'] },
                children: [{ type: 'text', value: keyValue }]
            }
        ]
    };
    node.children = [];
}

// https://astro.build/config
export default defineConfig({
    build: {
        format: 'file'
    },
    markdown: {
        remarkPlugins: [
            remarkGfm, remarkMath, underLine, MDNblock
        ],
        syntaxHighlight: false
    }
});