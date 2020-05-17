import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useSlate } from 'slate-react';

import MenuControls from './MenuControls'
import useMenuCoords from './useMenuCoords'


const Menu = ({ inputRef }) => {
    const editor = useSlate();

    // null || 'link' || 'tooltip'
    const [inputType, setInputType] = useState(null)
    
    // in order to be able to apply text formatting 
    // to the selected text, we need the current selection
    // but it's getting lost once the user focuses on the input
    // we'll create a ref, and keep it updated
    // with the latest non-null selection
    const memoizedSelection = useRef()
    if (editor.selection) memoizedSelection.current = editor.selection

    const elem = useRef()
    // menu's coords
    const { x, y } = useMenuCoords(elem, inputType, memoizedSelection.current)

    // this is to prevent the initial left/top animation
    // see Div's positionTransition
    const justMounted = useRef(true)
    useEffect(() => {
        setTimeout(() => justMounted.current = false, 50)
    }, [])


    return (
        <Div ref={elem}
            style={{ left: x, top: y }}
            variants={variants}
            initial='hidden'
            animate='shown'
            exit='hidden'
            positionTransition={() => {
                if (justMounted.current) return { duration: 0 }
                return transition
            }} >

            <MenuControls
                inputType={inputType}
                setInputType={setInputType}
                inputRef={inputRef}
                selection={memoizedSelection} />

        </Div>
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
        scale: 0.3,
        opacity: 0,
        transition: { duration: .25, delay: .25 },
    },
    shown: {
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

export default Menu;