import React from 'react'

export const ELEMS = [
    'paragraph',
    'h2',
    'h3',
    'ul',
    'code-block'
]

export const MARKS = [
    'bold',
    'italic',
    'code',
    'link',
    'tooltip'
]

export const HOTKEYS = {
    'code-block': 'ctrl + h',
    'paragraph': 'ctrl + p',
    'h2': 'ctrl + 2',
    'h3': 'ctrl + 3',
    'ul': 'ctrl + u',
    'bold': 'ctrl + b',
    'italic': 'ctrl + i',
    'code': 'ctrl + `'
}

export const ICONS = {
    'code-block': '<C>',
    'paragraph': 'P',
    h2: 'H2',
    h3: 'H3',
    ul: 'UL',
    bold: 'B',
    italic: 'I',
    code: '</>',
    link: <i className="fas fa-link" />,
    tooltip: <i className="far fa-comment-alt" />
}