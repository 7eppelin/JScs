import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const StyledP = styled(motion.p)`
    margin: 0;
    color: var(--gray1);
    padding: 12px;
    padding-left: 15%;
    padding-right: 23%;
`;

const ParagraphElement = ({ attributes, children }) => (
    <StyledP variants={elem} {...attributes}>
        {children}
    </StyledP>
)

export default ParagraphElement;