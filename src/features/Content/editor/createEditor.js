
import { isInside } from './'

import { createEditor, Transforms, Node } from 'slate'
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

    editor.isVoid = el => {
        return el.type === 'links' ? true : isVoid(el);
    }
    
    return editor;
}



// slate normalizes the editor's content after every change
// here we can add some custom constraints to our editor

const withNormalizing = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {

        // ensure that an UL can only contain LI's
        if (node.type === 'ul') {
            const children = Node.children(editor, path)
            for (const [child] of children) {
                if (child.type !== 'li') {
                    Transforms.liftNodes(editor)
                    return
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

    // this is getting called whenever the user
    // attempts to delete a single character
    editor.deleteBackward = (...args) => {
        const anchor = editor.selection.anchor

        // if selection is at the start of the elem
        // that is next to the panel, skip
        
        if (anchor.path[0] == 2 && anchor.offset == 0) {
            return
        }

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
    withNormalizing, 
    withHistory, 
    withReact, 
    createEditor
)


export {createMyEditor as createEditor}
