
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
// for now, we need to ensure that an UL can only contain LI's

const withNormalizing = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {
        if (node.type === 'ul') {
            const children = Node.children(editor, path)
            for (const [child, childPath] of children) {
                if (child.type !== 'li') {
                    Transforms.liftNodes(editor)
                    return;
                }
            }
        }
        normalizeNode([node, path])
    }

    return editor
}



const createMyEditor = compose(
    withVoids,
    withNormalizing, 
    withHistory, 
    withReact, 
    createEditor
)


export {createMyEditor as createEditor}
