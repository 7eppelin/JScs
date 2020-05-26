import React from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'


const About = () => {
    const location = useLocation()
    const url = location.pathname

    return (
        <AnimatePresence>
            {(url === '/') && (
                <Section variants={variants}
                    initial='initial'
                    animate='enter'
                    exit='exit'>

                        THIS IS THE FRONT PAGE OF THE APP
                </Section>
            )}
        </AnimatePresence>
    )
}

const Section = styled(motion.section)`
    background: var(--gray6);
    flex-basis: 50vw;
    flex-grow: 1;
    margin: 0 4vw;
    box-shadow: 0 0 30px -5px black;
    border-radius: 5px;
`


const transition = {
    type: 'spring',
}


const variants = {
    initial: {
        opacity: 0,
        scale: .9,
        x: -1000,
    },

    exit: {
        opacity: [ 1, .8, 0 ],
        scale: [ 1, .9, .9 ],
        x: [ 0, 0, -1000 ],
        transition
    },

    enter: {
        opacity: [ 0, .8, 1 ],
        scale: [ .9, .9, 1 ],
        x: [ -1000, 0, 0 ],
        transition: {
            ...transition,
            delay: 0.5,
        }
    }
}

export default About