
import { isInside } from './'

import { createEditor, Transforms, Node, Text } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { compose } from '@reduxjs/toolkit'



// voids are the elements that slate treats as black boxes
// allowing us to have not editable elements within the editor
// (images, videos, forms, inputs etc)
// default isVoid simply returns false every time
// extend it to treat the links panel as a void elem

const withVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = el => (
        el.type === 'links' ? true : isVoid(el)
    )
    
    return editor;
}


// just like the default isVoid, isInline returns false every time
const withInlines = editor => {
    const { isInline } = editor;

    const inlines = ['link', 'code-inline', 'api-args', 'api-comma', 'api-arg']

    editor.isInline = el => (
        inlines.includes(el.type) ? true : isInline(el)
    )

    return editor;
}



// slate normalizes editor's elements after every change
// here we can add some custom constraints to our editor

const withNormalizing = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {

        // ensure that an UL can only contain LI's
        if (node.type === 'ul') {
            for (const [el] of Node.children(editor, path)) {
                if (el.type !== 'li') {
                    Transforms.liftNodes(editor)
                    return
                }
            }
        }

        // delete empty 'api-arg' elements
        if (node.type === 'api-args') {
            const first = node.children[0]
            const last = node.children[node.children.length - 1]

            if (!Text.isText(first) || 
                !Text.isText(last) ||
                first.text !== '(' ||
                last.text !== ')') {

                    if (first === last && first.text === '()') return
                    if (last.text === ',)') return
                    Transforms.removeNodes(editor, { at: path })
                    return
                }

            for (const [elem] of Node.children(editor, path)) {

                if (elem.type === 'api-arg') {
                    const text = Node.string(elem)
                    if (!text) {
                        const match = n => n.type === 'api-arg'
                        Transforms.removeNodes(editor, { match })
                        return
                    }
                }
            }
        }

        normalizeNode([node, path])
    }

    return editor
}



// make the links panel undeletable

const withDelete = editor => {
    const { deleteBackward, deleteFragment } = editor

    // this method is getting called whenever the user
    // attempts to delete a single character
    editor.deleteBackward = (...args) => {
        const anchor = editor.selection.anchor

        // if selection is at the start of the elem
        // that is next to the panel, skip
        if (anchor.path[0] === 2 && anchor.offset === 0) return

        // otherwise, call the default method
        deleteBackward(...args)
    }

    // this is getting called whenever the user 
    // attempts to delete the selected range
    editor.deleteFragment = (...args) => {
        if (isInside(editor, 'links')) return;
        deleteFragment(...args)
    }

    return editor;
}


const createMyEditor = compose(
    withDelete,
    withVoids,
    withInlines,
    withNormalizing, 
    withHistory, 
    withReact, 
    createEditor
)


export {createMyEditor as createEditor}
