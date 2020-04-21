import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { Range } from 'slate';
import { Editor } from 'features/Content/editor';
import { useSlate } from 'slate-react';

import Portal from 'components/Portal';
import HoveringMenuControls from './HoveringMenuControls';


const Div = styled(motion.div)`
    background: var(--black);
    opacity: .8;
    position: absolute;
    z-index: 200;
    top: ${props => `${props.coords.y}px`};
    left: ${props => `${props.coords.x}px`};
    box-shadow: 0 2px 5px 2px var(--black);
`;

const variants = {
    hidden: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.1 }
    },
    shown: {
        scale: 1,
        opacity: 1,
    }
}

const HoveringMenu = () => {
    const editor = useSlate();
    const menuRef = useRef();
    const inputRef = useRef(null);
    const [ inputType, setInputType ] = useState(null);
    const [ editorSelection, setEditorSelection ] = useState(null);
    const [ isShown, setIsShown ] = useState(false);
    const [ coords, setCoords ] = useState({ x: -10000, y: -10000 });

    useEffect(() => {

        const { selection } = editor;

        // this is necessary if we don't want the menu to hide
        // when the user focuses on the input in the menu
        if (inputRef.current === document.activeElement) return;


        // if there's no selection, hide the menu
        if (!selection || Range.isCollapsed(selection) || Editor.isInsideCode(editor)) {
            setInputType(null);
            setIsShown(false);
            setCoords({ x: -10000, y: -10000 })
            return;
        }

        // when the user presses a button or focuses on the input
        // in the HoveringMenu, editor's selection is lost
        // memoize it, so we can pass it to Editor's transforming functions
        setEditorSelection(selection)

        // show the menu
        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        const el = menuRef.current;

        const y = rect.top - el.offsetHeight - 15;
        const x = rect.left - el.offsetWidth / 2 + rect.width / 2;

        setCoords({x, y})
        setIsShown(true);
    }, [editor.selection])

    return (
        <Portal>
            <Div coords={coords}
                variants={variants}
                initial='hidden'
                animate={isShown ? 'shown' : 'hidden'}
                ref={menuRef} >

                <HoveringMenuControls 
                    inputRef={inputRef} 
                    inputType={inputType}
                    setInputType={setInputType}
                    selection={editorSelection}
                />
        
            </Div>
        </Portal>
)}

export default HoveringMenu;