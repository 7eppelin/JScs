import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'


const StyledP = styled(motion.p)`
    margin: 0;
    padding: 12px;
    padding-left: 15%;
    padding-right: 23%;
`;

const ParagraphElement = ({ attributes, children }) => (
    <StyledP 
        variants={variants} 
        {...attributes}>

            {children}

    </StyledP>
)

export default ParagraphElement;