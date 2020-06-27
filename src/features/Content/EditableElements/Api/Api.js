import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import variants from './../variants'


const Api = ({ attributes, children }) => (
    <Div variants={variants}
        {...attributes}>
            {children}
    </Div>
)


const Div = styled(motion.div)`
    padding: 12px;
    padding-left: 15%;
    padding-right: 23%;
`

export default Api