import React from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion';

import { NavLink } from 'react-router-dom';


const SubsectionLink = ({ 
    to, 
    label, 
    withToggler, 
    featuresOpen, 
    toggleFeatures,
    startDrag,
    isDragging
}) => {
    return (
        <StyledSub isDragging={isDragging}>

            <NavLink to={to} 
                activeClassName='active'
                onMouseDown={startDrag}>
                {label}
            </NavLink>

            {withToggler && (
                <StyledToggler 
                    rotate={featuresOpen ? '180deg' : '0deg'} 
                    className="fas fa-angle-up"
                    onClick={() => toggleFeatures(!featuresOpen)} 
                />
            )}
        </StyledSub>
)}


const StyledSub = styled(motion.div)`
    position: relative;
    text-align: left;

    a {
        color: var(--gray1);
        background: ${props => props.isDragging ? 'var(--gray4)' : 'var(--gray5)'};
        padding: 12px;
        padding-left: 22px;
        display: block;
        height: 100%;
        font-size: 1.4rem;
        transition: .2s;
    }

    a:hover {
        background: var(--gray4);
    }

    a.active {
        background: var(--gray4);
        color: var(--orange2);
    }
`;

const StyledToggler = styled.i`
    position: absolute;
    top: 6px;
    right: 10px;
    padding: 5px 8px;
    border-radius: 50%;
    border: 1px solid transparent;
    transition: .2s;
    transform: ${props => `rotate(${props.rotate})`};
    cursor: pointer;

    &:hover {
        color: var(--orange2);
    }
`;


export default SubsectionLink;