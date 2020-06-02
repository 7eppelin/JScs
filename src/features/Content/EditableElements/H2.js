import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'

const StyledH2 = styled(motion.h2)`
    color: var(--white);
    text-shadow: 2px 2px 1px var(--gray4);
    font-size: 1.8rem;
    padding: 25px 23% 12px 15%;
`;
const H2Element = ({ attributes, children }) => (
    <StyledH2 
        variants={variants} 
        {...attributes}>
        
            {children}
            
    </StyledH2>
)

export default H2Element;