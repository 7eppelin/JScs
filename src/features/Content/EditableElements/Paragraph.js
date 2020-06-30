import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'


const StyledP = styled(motion.p)`
    padding: 12px 0;
    margin: 0;
`;

const ParagraphElement = ({ attributes, children }) => (
    <StyledP
        variants={variants} 
        {...attributes}>

            {children}

    </StyledP>
)

export default ParagraphElement;