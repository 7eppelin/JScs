import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}

const StyledH2 = styled(motion.h2)`
    color: var(--white);
    text-shadow: 2px 2px 1px var(--gray4);
    font-size: 1.8rem;
    padding: 25px 30px 12px 50px;
`;
const H2Element = ({ attributes, children }) => (
    <StyledH2 variants={elem} {...attributes}>{children}</StyledH2>
)

export default H2Element;