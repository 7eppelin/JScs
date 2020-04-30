import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(motion.li)`
    display: block;
    margin: 2px 0;
    background-color: var(--gray5);

    a {
        display: block;
        padding: 15px;
        height: 100%;
        border-radius: 3px;
        color: var(--gray1);
        transition: .2s;
    }

    a:hover {
        background: var(--gray4);
        color: var(--white);
    }

    a.active {
        background: var(--gray4);
        box-shadow: inset 0 0 15px 0 var(--gray6);
        color: var(--white);
    }
`;


const SectionLink = ({ label }) => (
    <StyledLink variants={item}>

        <NavLink to={`/${label}`} activeClassName='active'>
            {label}
        </NavLink>

    </StyledLink>
)


const item = {
    hidden: { 
        opacity: 0,
        scaleY: 0.6,
        y: -10
    },
    visible: { 
        opacity: 1,
        scaleY: 1,
        y: 0
    },
}

export default SectionLink;