import React from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import Pages from './Pages'


const About = ({ isFirstRender }) => {
    const location = useLocation()
    const url = location.pathname

    return (
        <AnimatePresence>
            {(url === '/') && (
                <Section variants={variants}
                    initial={isFirstRender.current ? false : 'initial'}
                    animate='enter'
                    exit='exit'>

                        <Pages />
                </Section>
            )}
        </AnimatePresence>
    )
}

const Section = styled(motion.section)`
    background: var(--gray6);
    position: absolute;
    width: 78vw;
    height: calc(100% - 50px);
    top: 25px;
    box-shadow: 0 0 30px -5px black;
    border-radius: 5px;
`


const transition = {
    type: 'spring',
    stiffness: 120,
    damping: 12,
    mass: 0.9,
}


const variants = {
    initial: {
        scale: .86,
        left: '-100vw',
    },

    exit: {
        scale: .86,
        left: '-100vw',
        transition: {
            left: { delay: 0.25 },
        }
    },

    enter: {
        scale: 1,
        left: '4vw',
        transition: {
            delay: 0.61,
            scale: { 
                ...transition,
                delay: 0.96 
            }
        }

    }
}

export default About