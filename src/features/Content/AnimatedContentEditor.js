import React from 'react';
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion';
import ContentFallback from './ContentFallback.js'


// animates ContentEditor

const AnimatedContentEditor = ({ children, id, delayAnimation }) => {
    if (delayAnimation && !id) return <ContentFallback />

    return (
        <AnimatePresence exitBeforeEnter>
            {id && (
                <Div key={id}
                    variants={variants}
                    initial={delayAnimation ? false : 'exit'}
                    animate='enter'
                    exit='exit'>

                    {children}

                </Div>
            )}
        </AnimatePresence>
    )
}


const Div = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 6px 9px;
    height: calc(100% - 12px);
    color: var(--gray1); 
`;

const variants = {
    enter: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
            when: 'beforeChildren',
            staggerChildren: 0.09,
            ease: 'circOut'
        }
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