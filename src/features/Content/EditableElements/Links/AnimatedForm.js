import React, { Suspense } from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';

const Form = React.lazy(() => import('./Form'))


const AnimatedForm = ({ isEditing, links, closeForm }) => (
    <AnimatePresence>
        {/* isEditing can be 0
            which corresponds to the first link */}
        {isEditing !== false && (
            <Wrapper variants={variants}
                initial='hidden'
                animate='shown'
                exit='hidden'>
                <Suspense fallback=' ' >
                    <Form editing={isEditing}
                        links={links}
                        closeForm={closeForm} />
                </Suspense>
            </Wrapper>
        )}
    </AnimatePresence>
)

const Wrapper = styled(motion.div)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    text-align: center;
    background: rgba(13, 13, 13, 0.88);
    z-index: 200;
`

const variants = {
    shown: {
        opacity: 1, 
        scale: 1
    },
    hidden: {
        opacity: 0, 
        scale: 0.6
    }
}

export default AnimatedForm