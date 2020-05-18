
import { Editor, Node, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'


// commands to manipulate the content


// checks whether the given mark is active 
// on the currently selected text

export const isMarkActive = (editor, mark) => {
    const [ match ] = Editor.nodes(editor, {
        match: n => n[mark],
        universal: true
    })
    return !!match
}



// toggles the mark on the currently selected text

export const toggleMark = (editor, mark) => {
    const isActive = isMarkActive(editor, mark);
    Transforms.setNodes(editor, 
        { [mark]: isActive ? false : true }, 
        { match: n => Text.isText(n), split: true }
    )
}