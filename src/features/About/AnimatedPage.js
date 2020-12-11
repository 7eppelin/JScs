import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'

import useHandleWheel from './useHandleWheel'


const AnimatedPage = ({ 
    children,
    pageIndex,
    lastPage,
    scrollToPage,
    animationDirection,
    setAnimationDirection,
    wheelRef,
}) => {
    const pageRef = useRef()

    const handleWheel = useHandleWheel(
        pageRef,
        pageIndex,
        lastPage,
        scrollToPage,
        setAnimationDirection,
        wheelRef
    )

    return (
        <Section ref={pageRef}
            className='scrollbar'
            variants={variants}
            initial={animationDirection === 'up' ? 'exit-down' : 'exit-up'}
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