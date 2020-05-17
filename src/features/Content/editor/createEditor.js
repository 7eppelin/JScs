import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { compose } from '@reduxjs/toolkit'

const withVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = element => {
        return element.type === 'links' ? true : isVoid(element);
    }
    return editor;
}

// export const createMyEditor = () => withVoids(withHistory(withReact(createEditor())))
const createMyEditor = compose(
    withVoids, 
    withHistory, 
    withReact, 
    createEditor
)


export {createMyEditor as createEditor}
