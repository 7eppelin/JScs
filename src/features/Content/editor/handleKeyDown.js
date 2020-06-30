
import { Transforms } from 'slate'

import { 
    isInside, 
    toggleMark, 
    toggleCode,
    insertElem,
    insertComma,
} from './'


// TODO
// get rid of the switch and simplify hotkeys handling
// using ./constants

export const handleKeyDown = (event, editor) => {

    if (isInside(editor, 'api')) {
        return handleApi(editor, event)
    }

    const char = event.nativeEvent.code

    if (char === 'Enter') handleEnter(editor, event)
    if (char === 'Tab') handleTab(editor, event)


    // hotkeys. Ctrl + key
    if (!event.ctrlKey && !event.metaKey) return;

    switch (char) {
        // format text
        case 'KeyB': 
            event.preventDefault();
            toggleMark(editor, 'bold');
            break;
        
        case 'KeyI':
            event.preventDefault();
            toggleMark(editor, 'italic');
            break;

        case 'Backquote':
            event.preventDefault();
            toggleCode(editor);
            break;

        // insert elem
        case 'Digit2':
            event.preventDefault();
            insertElem(editor, 'h2');
            break

        case 'Digit3':
            event.preventDefault();
            insertElem(editor, 'h3');
            break;

        case 'KeyP':
            event.preventDefault();
            insertElem(editor, 'paragraph');
            break;

        case 'KeyU':
            event.preventDefault();
            insertElem(editor, 'ul');
            break;

        case 'KeyH':
            event.preventDefault();
            insertElem(editor, 'code-block');
            break;

        case 'KeyA':
            event.preventDefault()
            insertElem(editor, 'api');
            break;

        default: return
    }  
}


// default behavior 'onEnter' is to insert a new elem
// of the same type as the elem at the selection

const handleEnter = (editor, event) => {

    // sometimes, when the user toggles off readOnly,
    // and focuses at the end of the title
    // selection is not being set for some reason
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


const handleTab = (editor, event) => {
    if (isInside(editor, 'code-block')) {
        event.preventDefault()
        editor.insertText('    ')
    }
}


const handleApi = (editor, event) => {
    const char = event.nativeEvent.code

    if (event.key === '(') {
        event.preventDefault()
        insertElem(editor, 'api-args', '()')
        Transforms.move(editor, { reverse: true })
        return
    }

    if (isInside(editor, 'api-args')) {
        if (!isInside(editor, 'api-arg')
            && event.key.length === 1
            && char !== 'Comma') {
                event.preventDefault()
                insertElem(editor, 'api-arg', event.key)
        }

        if (char === 'Comma') {
            event.preventDefault()
            insertComma(editor)
        }
    }
}