import React, { useState, useRef } from 'react';
import { useSlate } from 'slate-react';

import MenuControls from './MenuControls'
import AnimatedMenu from './AnimatedMenu'


const Menu = ({ inputRef }) => {
    const editor = useSlate();

    // null || 'link' || 'tooltip'
    const [isInputShown, setInputShown] = useState(false)
    
    // in order to be able to manipulate the selected text, 
    // we need the current selection
    // but it's getting lost once the user focuses on the input
    // we'll hold the latest *non-null* selection in a ref
    const memoizedSelection = useRef()
    if (editor.selection) memoizedSelection.current = editor.selection

    return (
        <AnimatedMenu
            isInputShown={isInputShown}
            selection={memoizedSelection.current}>

            <MenuControls
                isInputShown={isInputShown}
                setInputShown={setInputShown}
                inputRef={inputRef}
                selection={memoizedSelection.current} />

        </AnimatedMenu>
    )
}

export default Menu;