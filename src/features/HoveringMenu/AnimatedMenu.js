import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import useMenuCoords from './useMenuCoords'
import { useMount } from 'utils'


const AnimatedMenu = ({ isInputShown, selection, children }) => {
    const menu = useRef()

    // prevent the initial left/top animation
    const justMounted = useMount(true)

    const { x, y } = useMenuCoords(menu, isInputShown, selection)

    return (
        <Div ref={menu}
            style={{ left: x, top: y }}
            variants={variants}
            initial='hidden'
            animate='shown'
            exit='hidden'
            positionTransition={() => {
                if (justMounted) return { duration: 0 }
                return transition
            }} >

            {children}
        </Div>
    )
}


const Div = styled(motion.div)`
    background: var(--black);
    border-radius: 5px;
    border: 1px solid var(--gray4);
    position: absolute;
    z-index: 200;
    box-shadow: 0 2px 15px 2px black;
`;

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

export default AnimatedMenu