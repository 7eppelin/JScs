import React, { Suspense } from 'react';
import styled from 'styled-components/macro'
import { motion } from 'framer-motion';

const ContentEditorWrapper = React.lazy(() => import('./ContentEditorWrapper'))


// animates the entire content section
// renders ContentEditorWrapper

const Content = ({ delayAnimation }) => (
    <Section variants={variants}
        initial='initial'
        animate='enter'
        exit='exit'>

        <Suspense fallback=''>
            <ContentEditorWrapper 
                delayAnimation={delayAnimation} />
        </Suspense>

    </Section>
)


const Section = styled(motion.section)`
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
    stiffness: 250,
    damping: 20,
    mass: 0.5,
}


const variants = {
    initial: {
        scale: .8,
        right: -800,
    },

    exit: {
        scale: .8,
        right: -800,
        transition: {
            ...transition,
            right: { delay: 0.25 },
        }
    },

    enter: {
        scale: 1,
        right: 0,
        transition: {
            right: { delay: 0.05 },
            scale: { 
                ...transition,
                delay: 0.45 
            }
        }
    }
}

export default Content;