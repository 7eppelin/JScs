import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';


const AddButton = ({ handleClick, readOnly }) => (
    <Button variants={button}
        animate={readOnly ? 'hidden' : 'shown'}
        onClick={handleClick}
        >
        <i className="fas fa-plus"></i>
    </Button>
)


const Button = styled(motion.button)`
    position: absolute;
    top: 6px;
    left: 11px;
    z-index: 10;
    border: 1px solid var(--gray5);
    box-shadow: 0 0 5px -1px black;
    background: var(--black2);
    color: var(--gray1);
    border-radius: 3px;
    font-size: 1.4rem;
    padding: 10px 11px;
    transition: .15s;

    &:hover { color: var(--green) }
`

const button = {
    shown: {
        display: '',
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 150,
            damping: 8,
        },
    },
    hidden: {
        opacity: 0,
        x: -80,
        scale: 0.7,
        transitionEnd: {
            display: 'none'
        }
    }
}

export default AddButton