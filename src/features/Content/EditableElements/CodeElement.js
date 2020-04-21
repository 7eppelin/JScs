import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const Code = styled(motion.pre)`
    padding: 15px 30px 15px 50px;
`;

const CodeElement = ({ attributes, children }) => (
    <Code className='language-js' variants={elem}>
        <code {...attributes}>{children}</code>
    </Code>
)

export default CodeElement;