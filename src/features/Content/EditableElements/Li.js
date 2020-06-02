
import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'

const StyledLi = styled(motion.li)`
    list-style: inside;
    margin-left: 10px;
    padding: 7px 0;
`


const Li = ({ attributes, children }) => (
    <StyledLi 
        variants={variants} 
        {...attributes}>

            {children}

    </StyledLi>
)

export default Li