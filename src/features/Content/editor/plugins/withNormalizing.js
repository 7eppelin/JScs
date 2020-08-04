

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

            default: normalizeNode(entry)
        }
    }

    return editor
}