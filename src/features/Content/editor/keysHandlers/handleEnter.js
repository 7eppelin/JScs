
import { isInside } from './../commands'

// default behavior 'onEnter' is to insert a new elem
// of the same type as the currently selected elem

export const handleEnter = (editor, event) => {

    // sometimes, when the user toggles off readOnly,
    // and focuses at the end of the title
    // selection is not being set properly for some reason
    if (!editor.selection) {
        event.preventDefault()
    }
    
    // if the user is inside the title elem
    if (isInside(editor, 'title')) {
        return event.preventDefault()
    }

    // if the user is inside of a code-block
    // or pressed shift+enter, create a new line
    if (isInside(editor, 'code-block') || event.shiftKey) {
        editor.insertText('\n');
        return event.preventDefault();
    }
}