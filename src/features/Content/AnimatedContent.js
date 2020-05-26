import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'


const AnimatedContent = ({ isShown, children }) => (
    <AnimatePresence>
        {isShown && (
            <StyledContent 
                variants={variants}
                initial='initial'
                animate='enter'
                exit='exit'>

                    {children}

            </StyledContent>
        )}
    </AnimatePresence>
)


const StyledContent = styled(motion.section)`
    width: 63vw;
    position: absolute;
    right: 0;
    height: calc(100% - 50px);
    top: 25px;
    background: var(--gray6);
    box-shadow: 0 0 30px -5px black;
`;


const transition = {
    type: 'spring',
}


const variants = {
    initial: {
        scale: .88,
        right: -1000,
    },

    exit: {
        scale: [ 1, .88, .88 ],
        right: [ 0, 0, -1000 ],
        transition
    },

    enter: {
        scale: [ .88, .88, 1 ],
        right: [ -1000, 0, 0 ],
        transition: {
            ...transition,
            delay: 0.63,
        }
    }
}

export default AnimatedContent