
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

export const isInside = (editor, ...types) => {
    const [match] = Editor.nodes(editor, {
        match: n => types.includes(n.type),
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


// focuses the editor
// inserts an elem with the given type at the current selection
// if there's no selection, inserts at the end of the doc

export const insertElem = (editor, type) => {
    ReactEditor.focus(editor)

    // we don't want to insert the elem between the title and the links panel
    // nor to split the title and insert it between

    // if the selection is inside the title
    // specify the explicit location where to insert the elem
    // and that would be right after the links panel

    const insertAt = isInside(editor, 'title') ? [2] : undefined

    if (type === 'ul') {
        insertUl(editor, insertAt)
        return
    }

    const elem = {
        type,
        children: [{ text: `[ ${type} ]` }]
    }

    Transforms.insertNodes(editor, elem, { at: insertAt })
}


const insertUl = (editor, insertAt) => {
    const li = { 
        type: 'li', 
        children: [{ text: '[ list-item ]'}] 
    }
    const ul = { type: 'ul' }

    Transforms.insertNodes(editor, li, { at: insertAt })
    Transforms.wrapNodes(editor, ul, { at: insertAt })
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