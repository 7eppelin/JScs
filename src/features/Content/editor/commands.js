
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react'


// commands to manipulate the editor



export const select = (editor, selection) => {
    Transforms.select(editor, selection)
    ReactEditor.focus(editor)
}



// checks whether the given mark is active 
// on the currently selected text

export const isMarkActive = (editor, mark, selection) => {
    const [ match ] = Editor.nodes(editor, {
        match: n => n[mark],
        at: selection,
        universal: true
    })
    return !!match
}



// checks whether the caret is currently
// inside of an elem of one of the given types
// or an elem is inside the currently selected range of text

export const isInside = (editor, ...types) => {
    const match = n => types.includes(n.type)
    const [node] = Editor.nodes(editor, { match })
    return !!node
}



// toggles a mark on the selected text

export const toggleMark = (editor, mark, selection) => {
    if (selection) Transforms.select(editor, selection)

    const isActive = isMarkActive(editor, mark)
    editor.addMark(mark, !isActive)
}



export const toggleLink = (editor, href, selection) => {
    if (selection) Transforms.select(editor, selection)

    if (isActiveLink(editor)) unwrapLink(editor)

    if (href) {
        wrapLink(editor, href)
    } else {
        unwrapLink(editor)
    }
}

const isActiveLink = editor => {
    const match = n => n.type === 'link'
    const [ link ] = Editor.nodes(editor, { match })
    return !!link
}

const wrapLink = (editor, href) => {
    const link = { type: 'link', href, children: [] }
    Transforms.wrapNodes(editor, link, {split: true})
}

const unwrapLink = editor => {
    const match = n => n.type === 'link'
    Transforms.unwrapNodes(editor, { match })
}




export const toggleCode = (editor, selection) => {
    if (selection) select(editor, selection)

    if (isInside(editor, 'code-inline')) {
        const match = n => n.type === 'code-inline'
        Transforms.unwrapNodes(editor, { match })

    } else {
        const elem = { type: 'code-inline', children: [] }
        Transforms.wrapNodes(editor, elem, {split: true})
    }
}




// inserts an elem with the given type at the current selection
// if there's no selection, inserts at the end of the doc

export const insertElem = (editor, type, initialText) => {
    ReactEditor.focus(editor)

    // if the selection is inside the title
    // insert the elem right after the links panel
    const insertAt = isInside(editor, 'title') ? [2] : undefined

    if (type === 'ul') return insertUl(editor, insertAt)
    if (type === 'api') return insertAPI(editor, insertAt)

    const text = initialText || ''
    const elem = { type, children: [{ text }] }

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


const insertAPI = (editor, insertAt) => {
    const title = {
        type: 'api-title',
        children: [{ text: 'func()' }]
    }

    const description = {
        type: 'api-description',
        children: [{ text: 'description...' }]
    }

    const elem = {
        type: 'api',
        children: [title, description]
    }

    Transforms.insertNodes(editor, elem, { at: insertAt })
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