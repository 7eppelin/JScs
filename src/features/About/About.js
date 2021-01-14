import React, { Suspense } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'

const Pages = React.lazy(() => import('./Pages'))


const About = () => (
    <Section variants={variants}
        initial='initial'
        animate='enter'
        exit='exit'>

        <Suspense fallback=''>
            <Pages />
        </Suspense>
    </Section>
)


const Section = styled(motion.section)`
    background: var(--gray6);
    padding: 4px;
    padding-bottom: 10px;
    position: absolute;
    width: 78vw;
    height: calc(100% - 50px);
    top: 25px;
    box-shadow: 0 0 30px -5px black;
    border-radius: 5px;
`

const transition = {
    type: 'spring',
    stiffness: 240,
    damping: 14,
    mass: 0.5,
}

const variants = {
    initial: {
        scale: .88,
        left: '-100vw',
    },

    exit: {
        scale: .88,
        left: '-100vw',
        transition: {
            ...transition,
            left: { delay: 0.2 },
        }
    },

    enter: {
        scale: 1,
        left: '4vw',
        transition: {
            delay: 0.05,
            scale: { 
                ...transition,
                delay: 0.38 
            }
        }

    }
}

export default About