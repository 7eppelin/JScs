import React, { Suspense } from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';

const AddForm = React.lazy(() => import('./AddForm'))

const AnimatedAddForm = ({ isOpen, hide }) => (
        <AnimatePresence>
            {isOpen && (
                <StyledDiv variants={variants}
                        initial='hidden'
                        exit='hidden'
                        animate='open'
                        transition={{ duration: .2 }}>

                    <Suspense fallback=''>
                    <AddForm hide={hide} />
                    </Suspense>
                </StyledDiv>
            )}
        </AnimatePresence>
)

const StyledDiv = styled(motion.div)`
    position: absolute;
    left: -115px;
    top: 75px;
    z-index: 1000;
    background: var(--gray6);
    border: 1px solid var(--gray5);
    width: 320px;
    height: 250px;
    box-shadow: 0 2px 20px -2px black;
`;

const variants = {
    open: {
        opacity: 1,
        scale: 1,
    },
    hidden: {
        opacity: 0,
        scale: 1.16,
    }
}

export default AnimatedAddForm;