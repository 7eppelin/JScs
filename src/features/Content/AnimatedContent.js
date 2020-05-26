import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'


const AnimatedContent = ({ isShown, children }) => (
    <AnimatePresence>
        {isShown && (
            <StyledContent 
                variants={variants}
                layoutTransition
                initial='initial'
                animate='enter'
                exit='exit'>

                    {children}

            </StyledContent>
        )}
    </AnimatePresence>
)


const StyledContent = styled(motion.section)`
    flex-basis: 50vw;
    flex-grow: 1;
    background: var(--gray6);
    box-shadow: 0 0 30px -5px black;
    height: 100%;
`;


const transition = {
    type: 'spring',
}


const variants = {
    initial: {
        scale: .9,
        x: 1000,
    },

    exit: {
        scale: [ 1, .9, .9 ],
        x: [ 0, 0, 1000 ],
        transition
    },

    enter: {
        scale: [ .9, .9, 1 ],
        x: [ 1000, 0, 0 ],
        transition: {
            ...transition,
            delay: 0.5,
        }
    }
}

export default AnimatedContent