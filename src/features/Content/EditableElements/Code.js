import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './variants'


const Code = styled(motion.pre)`
    margin-left: 16%;
    margin-right: 28%;
    border-radius: 3px;
    padding: 15px 20px;
`;

const CodeElement = ({ attributes, children }) => (
    <Code 
        className='language-js scrollbar' 
        variants={variants}
        {...attributes}>

        <code>
            {children}
        </code>
    </Code>
)

export default CodeElement;