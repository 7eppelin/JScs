import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { compose } from '@reduxjs/toolkit'

const withVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = el => {
        return el.type === 'links' ? true : isVoid(el);
    }
    
    return editor;
}

const createMyEditor = compose(
    withVoids, 
    withHistory, 
    withReact, 
    createEditor
)


export {createMyEditor as createEditor}
