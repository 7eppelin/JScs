

import { isInside } from './../commands'

export const handleTab = (editor, event) => {
    if (isInside(editor, 'code-block')) {
        event.preventDefault()
        editor.insertText('    ')
    }
}