
import { isInside, isMarkActive, setMark, insertElem } from './'



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
            isActive = isMarkActive(editor, 'bold')
            setMark(editor, 'bold', !isActive);
            break;
        
        case 'KeyI':
            event.preventDefault();
            isActive = isMarkActive(editor, 'italic')
            setMark(editor, 'italic', !isActive);
            break;

        case 'Backquote':
            event.preventDefault();
            isActive = isMarkActive(editor, 'code')
            setMark(editor, 'code', !isActive);
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
    }  
}



// default behavior 'onEnter' is to insert a new elem
// of the same type as the elem at the selection

const handleEnter = (editor, event) => {
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