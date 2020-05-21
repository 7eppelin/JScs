import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const StyledH3 = styled(motion.h3)`
    color: var(--white);
    text-shadow: 2px 2px 1px var(--gray4);
    font-size: 1.6rem;
    padding: 25px 23% 12px 15%;
`;

const H3Element = ({ attributes, children }) => (
    <StyledH3 variants={elem} {...attributes}>{children}</StyledH3>
)

export default H3Element;