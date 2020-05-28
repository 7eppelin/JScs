import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { NavLink } from 'react-router-dom';
import Icon from 'components/Icon'


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
                draggable={false}
                activeClassName='active'
                onMouseDown={startDrag}>
                {label}
            </NavLink>

            {withToggler && (
                <StyledToggler 
                    rotate={featuresOpen ? '180deg' : '0deg'} 
                    onClick={() => toggleFeatures(!featuresOpen)} >

                    <Icon icon='down' />
                </StyledToggler>
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

const StyledToggler = styled.div`
    position: absolute;
    top: 5px;
    right: 8px;
    padding: 5px 8px;
    transition: .2s;
    transform: ${props => `rotate(${props.rotate})`};
    cursor: pointer;

    &:hover path {
        fill: var(--orange2);
    }
`;


export default SubsectionLink;