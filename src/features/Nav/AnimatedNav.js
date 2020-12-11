import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion'


const AnimatedNav = ({ activeSection, children }) => {
    return (
        <StyledNav variants={variants}
            initial={false}
            animate={activeSection ? 'content' : 'about'}>

                {children}
        </StyledNav>
    )
}


const StyledNav = styled(motion.nav)`
    position: absolute;
    box-shadow: 0 0 30px -5px black;
    background: var(--gray6);
    width: 32vw;
    height: calc(100% - 50px);
    top: 25px;
    margin-right: 30px;
    display: flex;
`;

const transition = {
    left: {
        delay: 0.42,
        type: 'spring',
        stiffness: 130,
        damping: 14,
        mass: 0.8,
    }
}

const variants = {
    content: {
        left: '0vw',
        scaleY: 1,
        transition
    },
    about: {
        left: '86vw',
        scaleY: 0.92,
        transition
    }
}


export default AnimatedNav