import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';


const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const StyledTitle = styled(motion.h1)`
    color: var(--orange1);
    padding: 45px 15% 25px 20%;
    background-color: var(--gray4);
    font-size: 3rem;
    text-shadow: 3px 3px 0 var(--gray6);
`;

const TitleElement = ({ attributes, children }) => (
    <StyledTitle variants={elem} {...attributes}>
        {children}
    </StyledTitle>
)

export default TitleElement;