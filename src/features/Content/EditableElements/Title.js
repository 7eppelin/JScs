import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';


const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const StyledTitle = styled(motion.h1)`
    color: var(--orange1);
    padding: 40px 30px 20px 50px;
    background-color: var(--gray4);
    box-shadow: inset 0 0 5px 0 black;
    font-size: 3rem;
    text-shadow: 3px 3px 0 var(--gray6);
`;

const TitleElement = ({ attributes, children }) => (
    <StyledTitle variants={elem} {...attributes}>
        {children}
    </StyledTitle>
)

export default TitleElement;