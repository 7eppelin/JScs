
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



// sets a mark on the selected text
// there are scenarios where editor's selection is lost
// for these cases setMark accepts the selection arg 

export const setMark = (editor, mark, value, selection) => {

    if (selection) {
        Transforms.select(editor, selection)
    }

    if (value) {
        editor.addMark(mark, value)
    } else {
        editor.removeMark(mark)
    }
}


// checks whether the caret is currently
// inside an elem with the given type

export const isInside = (editor, type) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === type,
      })
    
      return !!match
}



export const insertElem = (editor, type) => {

    Transforms.insertNodes(editor, {
        type,
        children: [{ text: `[${type}]` }]
    })

    ReactEditor.focus(editor)
}