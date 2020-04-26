import React from 'react';
import styled from 'styled-components/macro';

import { motion } from 'framer-motion';
import Tooltip from 'components/Tooltip';


const StyledButton = styled.button`
    margin: 8px 6px;
    padding: 4px;
    width: 50px;
    color: var(--orange1);
    background-color: var(--gray6);
    outline: 1px solid transparent;
    border: 1px solid var(--gray4);
    border-radius: 3px;
    box-shadow: 0 0 5px 1px var(--gray6);
    cursor: pointer;
    transition: .15s;
    font-size: 1.2rem;

    &:hover {
        color: var(--orange3);
    }

    &:active {
        color: var(--orange3);
        transform: scale(.95);
    }
`;


const child = {
    open: {
        x: 0,
        scale: 1,
        opacity: 1,
    },
    hidden: {
        x: -40,
        scale: 0,
        opacity: 0,
    }
}


const EditorToolbarButton = ({ onClick, children, tooltip }) => {
    return (
        <motion.div variants={child}>
            <Tooltip tip={tooltip} >
                <StyledButton onClick={onClick}>
                    {children}
                </StyledButton>
            </Tooltip>
        </motion.div>
    )
}

export default EditorToolbarButton;