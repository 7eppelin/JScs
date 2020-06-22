
import { 
    isInside, 
    toggleMark, 
    toggleCode,
    insertElem 
} from './'


// TODO
// get rid of the switch and simplify hotkeys handling
// using ./constants

export const handleKeyDown = (event, editor) => {
    const char = event.nativeEvent.code

    // func definitions below
    if (char === 'Enter') handleEnter(editor, event)
    if (char === 'Tab') handleTab(editor, event)

    if (!event.ctrlKey && !event.metaKey) return;

    let isActive;

    switch (char) {

        // text formatting
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

            
        // block insertion
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
        event.preventDefault()
        return
    }

    // if the user is inside of a code-block
    // or pressed shift+enter, create a new line
    if (isInside(editor, 'code-block') || event.shiftKey) {
        editor.insertText('\n');
        event.preventDefault();
    }
}


const handleTab = (editor, event) => {
    if (isInside(editor, 'code-block')) {
        event.preventDefault()
        editor.insertText('    ')
    }
}