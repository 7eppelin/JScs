
import { Editor, Node, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'


// commands to manipulate the content

export const isMarkActive = (editor, mark) => {
    const [ match ] = Editor.nodes(editor, {
        match: n => n[mark],
        universal: true
    })
    return !!match
}

