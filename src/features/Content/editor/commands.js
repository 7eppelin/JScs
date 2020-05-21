
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'


// commands to manipulate the editor


// checks whether the given mark is active 
// on the currently selected text

export const isMarkActive = (editor, mark) => {
    const [ match ] = Editor.nodes(editor, {
        match: n => n[mark],
        universal: true
    })
    return !!match
}



// checks whether the caret is currently
// inside of an elem of the given type

export const isInside = (editor, type) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === type,
      })
    
    return !!match
}



// sets a mark on the selected text

export const setMark = (editor, mark, value, selection) => {

    // add/removeMark operates on the currently selected text
    // in some scenarios selection is being lost, 
    // e.g. when the user has focused on an input
    // in such cases the caller must provide the selection arg
    if (selection) {
        Transforms.select(editor, selection)
    }

    if (value) {
        editor.addMark(mark, value)
    } else {
        editor.removeMark(mark)
    }
}



// inserts an elem with the given type at the current selection
// if there's no selection, inserts at the end of the doc
// focuses the editor

export const insertElem = (editor, type) => {
    ReactEditor.focus(editor)

    if (type === 'ul') {
        insertUl(editor)
        return
    }

    Transforms.insertNodes(editor, {
        type,
        children: [{ text: `[ ${type} ]` }]
    })
}


const insertUl = editor => {
    const li = { 
        type: 'li', 
        children: [{ text: '[ list-item ]'}] 
    }
    const ul ={
        type: 'ul',
    }

    Transforms.insertNodes(editor, li)
    Transforms.wrapNodes(editor, ul)
}



// sets a new links array as a property of the links panel
// the panel is always located at [1] (where [0] is the title of the page)
// see EditableElements/Links

export const setLinks = (editor, links) => {
    Transforms.setNodes(
        editor, 
        { links }, 
        { at: [1] }
    )
}