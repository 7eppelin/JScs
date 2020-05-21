
import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const StyledLi = styled(motion.li)`
    list-style: inside;
    margin-left: 10px;
    padding: 7px 0;
`

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}

const Li = ({ attributes, children }) => (
    <StyledLi variants={elem} {...attributes}>
        {children}
    </StyledLi>
)

export default Li