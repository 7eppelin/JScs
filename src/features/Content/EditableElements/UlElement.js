import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

const elem = {
    shown: { opacity: 1 },
    hidden: { opacity: 0 }
}


const Ul = styled(motion.ul)`
    padding: 15px 30px 10px 50px;

    li {
        margin-left: 12px;
        padding: 7px 0;
    }
`;
const UlElement = ({ attributes, children }) => (
    <Ul variants={elem} {...attributes}>{children}</Ul>
);

export default UlElement;