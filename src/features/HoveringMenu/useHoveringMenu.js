import { useState, useEffect } from 'react'
import { Editor } from 'features/Content/editor';
import { useSlate, ReactEditor } from 'slate-react';
import { Range } from 'slate';


const useHoveringMenu = (inputRef) => {
    const [isShown, setShown] = useState(false)
    const editor = useSlate()
    const { selection } = editor

    const readOnly = ReactEditor.isReadOnly(editor)

    useEffect(() => {
        // don't let the menu hide when the user focuses on the input
        if (inputRef.current === document.activeElement) return;

        // if there's no selection, hide the menu
        if (!selection 
            || Range.isCollapsed(selection) 
            || Editor.isInsideCode(editor)
            || readOnly
        ) {
            setShown(false)
            return;
        }

        setShown(true);
    }, [selection, readOnly, inputRef.current])

    return isShown
}

export default useHoveringMenu