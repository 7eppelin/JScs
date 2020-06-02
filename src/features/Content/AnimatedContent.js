import React from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'


const AnimatedContent = ({ isShown, children, isMount }) => (
    <AnimatePresence>
        {isShown && (
            <StyledContent 
                variants={variants}
                initial={isMount ? false : 'initial'}
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
    stiffness: 120,
    damping: 12,
    mass: 0.9,
}


const variants = {
    initial: {
        scale: .86,
        right: -800,
    },

    exit: {
        scale: .86,
        right: -800,
        transition: {
            right: { delay: 0.25 },
        }
    },

    enter: {
        scale: 1,
        right: 0,
        transition: {
            right: {delay: 0.61},
            scale: { 
                ...transition,
                delay: 0.96 
            }
        }
    }
}

export default AnimatedContent