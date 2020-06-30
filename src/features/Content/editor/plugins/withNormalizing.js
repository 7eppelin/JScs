

import { Transforms, Node } from 'slate'

// slate normalizes editor's elements after every change
// here we can add some custom constraints to our editor


// ensure that an UL can only contain LI's
const normalizeUl = (editor, entry) => {
    const [, path] = entry
    for (const [el] of Node.children(editor, path)) {
        if (el.type !== 'li') {
            Transforms.liftNodes(editor)
        }
    }
}


const normalizeApiArgs = (editor, entry) => {
    const [node, path] = entry

    // if the first child of an api-args elem is not '('
    // and the last child is not ')'
    // delete the elem
    const first = node.children[0]
    const last = node.children[node.children.length - 1]

    if (first.text !== '(' || last.text !== ')') {
        if (first.text === '()') return
        if (last.text === ',)') return
        Transforms.removeNodes(editor, { at: path })
        return
    }

    // delete empty 'api-arg' elements
    for (const [elem] of Node.children(editor, path)) {
        if (elem.type !== 'api-arg') continue
        const text = Node.string(elem)
        if (!text) {
            const match = n => n.type === 'api-arg'
            Transforms.removeNodes(editor, { match })
        }
    }
}



// plugin

export const withNormalizing = editor => {
    const { normalizeNode } = editor

    // entry = [ node, path ]
    editor.normalizeNode = entry => {
        const [node] = entry
        
        switch (node.type) {
            case 'ul':
                normalizeUl(editor, entry)
                break

            case 'api-args':
                normalizeApiArgs(editor, entry)
                break

            default: normalizeNode(entry)
        }
    }

    return editor
}