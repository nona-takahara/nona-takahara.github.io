// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: Copyright (C) 2023 Nona Takahara

import { visit } from 'unist-util-visit';
import { is } from 'unist-util-is';

export function underLine() {
    return (tree, file) => {
        visit(tree, 'strong', (node) => {
            const startCode = node.children[0].position.start.offset - 2;
            if (file.toString().substring(startCode, startCode + 2) === '__') {
                node.data = { hName: 'u' };
            }
        });
    }
}

export function MDNblock() {
    return (tree, file) => {
        visit(tree, 'blockquote', (node) => {
            const firstChildren = node?.children?.[0];
            if (is(firstChildren, 'paragraph') && is(firstChildren?.children?.[0], 'strong')) {
                const boxType = firstChildren.children[0].children[0].value;

                if (boxType === "Key:") {
                    petitcomKey(node);
                } else if (boxType === "Callout:") {
                    callout(node);
                } else if (boxType === "Warning:" || boxType === "Note:") {
                    note(node, boxType);
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

function callout(node) {
    node.type = 'columnbox';
    node.data = {
        hProperties: {
            className: ['callout']
        }
    };
    node.children[0].children = node.children[0].children.slice(1);
}

function note(node, type) {
    const typename = type.replace(":", "").toLowerCase();
    node.type = 'columnbox';
    node.data = {
        hProperties: {
            className: ['callout', typename]
        }
    };
    const emoji = {
        "warning": "警告：",
        "note": "メモ："
    }
    node.children[0].children[0].children[0].value = emoji[typename] || type;
}

export function remarkCodeLanguage() {
    return (tree) => {
        visit(tree, 'code', (node) => {
            node.data = node.data || {};
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties['data-lang'] = `language-${String(node.lang)}`;
        });
    };
}
