// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: Copyright(c) 2020 Titus Wormer < tituswormer@gmail.com>
//
// This file is based on remark-gfm provided under The MIT License
// Although alterations have been made, they are not considered to be copyrighted
// by the modifier because they do not include copyrightable changes.

import { combineExtensions } from 'micromark-util-combine-extensions';
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmTable } from 'micromark-extension-gfm-table';

import { gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown } from 'mdast-util-gfm-strikethrough';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';

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

export function remarkGfm(options = {}) {
    const data = this.data();
    add('micromarkExtensions', gfm(options));
    add('fromMarkdownExtensions', gfmFromMarkdown());
    add('toMarkdownExtensions', gfmToMarkdown(options));
    function add(field, value) {
        const list = (data[field] ? data[field] : (data[field] = []));
        list.push(value);
    }
}
