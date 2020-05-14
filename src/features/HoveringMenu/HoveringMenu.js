import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { Range } from 'slate';
import { Editor } from 'features/Content/editor';
import { useSlate, ReactEditor } from 'slate-react';

import Portal from 'components/Portal';
import HoveringMenuControls from './HoveringMenuControls';


const HoveringMenu = () => {
    const editor = useSlate()
    const inputRef = useRef(null)
    const [inputType, setInputType] = useState(null)
    const [isShown, setIsShown] = useState(false)

    const readOnly = ReactEditor.isReadOnly(editor)
    const editorSelection = useRef(null)

    const [coords, setCoords] = useState({})

    useEffect(() => {

        const { selection } = editor;

        // don't let the menu to hide when the user focuses on the input
        if (inputRef.current === document.activeElement) return;

        // if there's no selection, hide the menu
        if (!selection 
            || Range.isCollapsed(selection) 
            || Editor.isInsideCode(editor)
            || readOnly
        ) {
            setInputType(null)
            setIsShown(false)
            return;
        }

        // when the user presses a button or focuses on the input
        // in the HoveringMenu, editor's selection is lost
        // memoize it, so we can pass it to Editor's transforming functions
        editorSelection.current = selection

        // show the menu
        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        const input = inputType ? 39 : 0;

        const elHeight = 41 + input;
        const elWidth = 227;

        const y = rect.top - elHeight - 16;
        const x = rect.left - elWidth / 2 + rect.width / 2;

        setCoords({ x, y })
        setIsShown(true);
    }, [editor.selection, inputType, readOnly])


    return (
        <Portal>
            <Div style={{ left: coords.x, top: coords.y }}
                variants={variants}
                animate={isShown ? 'shown' : 'hidden'}
                positionTransition={{
                    type: 'spring',
                    damping: 14,
                    stiffness: 150,
                    mass: 0.7,
                }} >

                <HoveringMenuControls 
                    inputRef={inputRef} 
                    inputType={inputType}
                    setInputType={setInputType}
                    selection={editorSelection.current}
                />
        
            </Div>
        </Portal>
    )
}


const Div = styled(motion.div)`
    background: var(--black);
    border-radius: 5px;
    border: 1px solid var(--gray4);
    position: absolute;
    z-index: 200;
    box-shadow: 0 2px 10px 2px var(--black);
`;

const variants = {
    hidden: {
        scale: 0.3,
        opacity: 0,
        transition: { duration: .2, delay: .25 },
        transitionEnd: { display: 'none' }
    },
    shown: {
        display: '',
        scale: 1,
        opacity: 1,
    }
}


export default HoveringMenu;