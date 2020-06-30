

import { 
    isInside, 
    toggleMark, 
    toggleCode,
    insertElem,
} from './'

import { handleEnter } from './keysHandlers/handleEnter'
import { handleTab } from './keysHandlers/handleTab'
import { handleApi } from './keysHandlers/handleApi'



export const handleKeyDown = (event, editor) => {

    if (isInside(editor, 'api')) {
        handleApi(editor, event)
        return
    }

    const char = event.nativeEvent.code

    if (char === 'Enter') handleEnter(editor, event)
    if (char === 'Tab') handleTab(editor, event)

    // hotkeys. Ctrl + key
    if (!event.ctrlKey && !event.metaKey) return

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