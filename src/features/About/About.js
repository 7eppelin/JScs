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
    position: absolute;
    width: 78vw;
    height: calc(100% - 50px);
    top: 25px;
    box-shadow: 0 0 30px -5px black;
    border-radius: 5px;
`


const variants = {
    initial: {
        scale: .88,
        left: '-100vw',
    },

    exit: {
        scale: [ 1, .88, .88 ],
        left: [ '4vw', '4vw', '-100vw' ],
    },

    enter: {
        scale: [ .88, .88, 1 ],
        left: [ '-100vw', '4vw', '4vw' ],
        transition: {
            left: { delay: 0.63 }
        }

    }
}

export default About