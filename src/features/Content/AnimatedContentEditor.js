import React from 'react';
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion';


// animates ContentEditor

const AnimatedContentEditor = ({ children, id, delayAnimation }) => (
    <AnimatePresence exitBeforeEnter>
        {id && (
            <Div key={id}
                variants={variants}
                initial='exit'
                animate='enter'
                exit='exit'
                transition={delayAnimation ? 
                    {...enterTransition, delay: .8} : enterTransition }>

                {children}

            </Div>
        )}
    </AnimatePresence>
)


const Div = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 6px 9px;
    height: calc(100% - 12px);
    font-size: 1.4rem;
    color: var(--gray1); 
`;

const enterTransition = {
    duration: 0.3,
    when: 'beforeChildren',
    staggerChildren: 0.09,
    ease: 'circOut'
}

const variants = {
    enter: {
        scale: 1,
        opacity: 1,
    },
    exit: {
        scale: 0.7,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: 'circOut'
        }
    }
}

export default AnimatedContentEditor