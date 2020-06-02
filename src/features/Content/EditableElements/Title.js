import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'


const TitleElement = ({ attributes, children }) => (
    <StyledTitle 
        variants={variants} 
        {...attributes}>

        {children}

    </StyledTitle>
)


const StyledTitle = styled(motion.h1)`
    color: var(--orange1);
    padding: 45px 15% 25px 20%;
    background-color: var(--gray4);
    font-size: 3rem;
    text-shadow: 3px 3px 0 var(--gray6);
`;

export default TitleElement;