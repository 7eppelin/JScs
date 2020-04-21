import React from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';

import AddForm from './AddForm';


const StyledDiv = styled(motion.div)`
    position: absolute;
    left: -125px;
    top: 75px;
    z-index: 1000;
`;

const variants = {
    open: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 },
    },
    hidden: {
        opacity: 0,
        scale: 1.1,
    }
}


const AnimateAddForm = ({ isOpen, hide}) => (
    <AnimatePresence>
        {isOpen && (
            <StyledDiv variants={variants}
                    initial='hidden'
                    exit='hidden'
                    animate='open'>
                <AddForm hide={hide} />
            </StyledDiv>
        )}
    </AnimatePresence>
)

export default AnimateAddForm;