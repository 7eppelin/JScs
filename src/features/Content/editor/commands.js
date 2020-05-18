
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



// toggles simple marks on the currently selected text
// simple marks are the marks that can only have true/false values

export const toggleMark = (editor, mark) => {
    const isActive = isMarkActive(editor, mark);
    Transforms.setNodes(editor, 
        { [mark]: isActive ? false : true }, 
        { match: n => Text.isText(n), split: true }
    )
}



// toggles link/tooltip marks
// these marks have strings as values

// normally, we wouldn't need the selection arg, 
// because setNodes oparates with the editor's selection by default
// but in our case, the user enters the value in the input,
// which means that selection is lost (since the input is focused)

export const toggleComplexMark = (editor, mark, value, selection) => {

    // add mark
    if (value !== '') {
        Transforms.setNodes(
            editor, 
            { [mark]: value }, 
            { at: selection, match: n => Text.isText(n), split: true }
        )
        return
    }

    // if the mark is active, remove it
    const isActive = isMarkActive(editor, mark)
    if (isActive) {
        Transforms.unsetNodes(editor, mark, { 
            at: selection,
            match: n => Text.isText(n), 
            split: true 
        })
    }
}