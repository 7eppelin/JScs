import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const Code = styled(motion.pre)`
    margin-left: 16%;
    margin-right: 28%;
    border-radius: 3px;
    padding: 15px 20px;
`;

const CodeElement = ({ attributes, children }) => (
    <Code className='language-js scrollbar' variants={elem}>
        <code {...attributes}>{children}</code>
    </Code>
)

export default CodeElement;