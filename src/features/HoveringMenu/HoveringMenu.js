import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useSlate } from 'slate-react'

import useHoveringMenu from './useHoveringMenu'
import useMenuCoords from './useMenuCoords'

import Portal from 'components/Portal';
import Menu from './Menu';


const HoveringMenu = () => {
    const inputRef = useRef(null)
    const editor = useSlate()

    // null || 'link' || 'tooltip'
    const [inputType, setInputType] = useState(null)

    // in order to transform the selected text, we need the current selection
    // but it's getting lost once the user focuses on the input
    // we'll keep it in a ref, and update it every time
    // but only if it exists
    const editorSelection = useRef()
    if (editor.selection) editorSelection.current = editor.selection

    // decides whether to show or to hide the menu
    const isShown = useHoveringMenu(inputRef)

    // returns the menu's coords
    const { x, y } = useMenuCoords(isShown, inputType)

    // hide input along with menu
    useEffect(() => {
        if (!isShown && inputType) setInputType(null)
    }, [isShown, inputType])

    return (
        <Portal>
            <Div style={{ left: x, top: y }}
                variants={variants}
                animate={isShown ? 'shown' : 'hidden'}
                positionTransition={transition} 
                >

                <Menu
                    inputRef={inputRef} 
                    inputType={inputType}
                    setInputType={setInputType}
                    selection={editorSelection.current}
                />
        
            </Div>
        </Portal>
    )
}

const transition = {
    type: 'spring',
    damping: 14,
    stiffness: 150,
    mass: 0.7,
}

const variants = {
    hidden: {
        scale: 0.4,
        opacity: 0,
        transition: { duration: .15, delay: .25 },
        transitionEnd: { display: 'none' }
    },
    shown: {
        display: '',
        scale: 1,
        opacity: 1,
    }
}


const Div = styled(motion.div)`
    background: var(--black);
    border-radius: 5px;
    border: 1px solid var(--gray4);
    position: absolute;
    z-index: 200;
    box-shadow: 0 2px 10px 2px var(--black);
`;


export default HoveringMenu;