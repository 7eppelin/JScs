import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'

import useHandleWheel from './useHandleWheel'


const AnimatedPage = ({ 
    children,
    pageIndex, // current acive page's index in the content arr
    lastPage, // last page' index
    scrollPages, // func to scroll between pages
    justMounted, // is it the first render of the front page (to skip initial animation)
    animationDirection,
    setAnimationDirection,
    wheelRef, // ./PagesNavWheel
}) => {
    const pageRef = useRef()

    const handleWheel = useHandleWheel(
        pageRef,
        pageIndex,
        lastPage,
        scrollPages,
        setAnimationDirection,
        wheelRef
    )

    return (
        <Section 
            ref={pageRef}
            className='scrollbar'
            variants={variants}
            // if this is the mount of ./Pages, don't animate
            // otherwise opposite of animattionDirection
            initial={justMounted ? false :
                animationDirection === 'up' ? 'exit-down' : 'exit-up'
            }
            animate='enter'
            exit={`exit-${animationDirection}`}
            onWheel={handleWheel}>

            {children}
        
        </Section>
    )
}


const Section = styled(motion.section)`
    height: 100%;
    text-align: left;
    color: var(--gray1);
`


const delay = { delay: 0.35 }

const exitTransition = {
    background: { duration: 0.2 },
    y: delay,
    opacity: delay
}

const variants = {

    'exit-up': {
        scale: 0.8,
        opacity: 0,
        background: 'var(--gray5)',
        y: -1000,
        transition: exitTransition
    },

    'exit-down': {
        scale: 0.8,
        opacity: 0,
        background: 'var(--gray5)',
        y: 1000,
        transition: exitTransition
    },

    'enter': {
        scale: 1,
        opacity: 1,
        background: 'var(--gray6)',
        y: 0,
        transition: {
            background: delay,
            scale: delay,
        },
    },
}

export default AnimatedPage