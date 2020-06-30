

import { isInside } from './../commands'

// make the links panel undeletable

export const withDelete = editor => {
    
    const { deleteBackward, deleteFragment } = editor

    // this method is getting called whenever the user
    // attempts to delete a single character
    editor.deleteBackward = (...args) => {
        const anchor = editor.selection.anchor

        // if selection is at the start of the elem
        // that is next to the panel, skip
        if (anchor.path[0] === 2 && anchor.offset === 0) return

        deleteBackward(...args)
    }

    // this is getting called whenever the user 
    // attempts to delete the selected range
    editor.deleteFragment = (...args) => {
        if (isInside(editor, 'links')) return;
        deleteFragment(...args)
    }

    return editor;
}