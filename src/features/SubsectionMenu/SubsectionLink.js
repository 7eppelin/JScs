import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

const StyledSub = styled.div`
    position: relative;
    text-align: left;

    a {
        padding: 10px;
        padding-left: 16px;
        display: block;
        height: 100%;
        font-size: 1.4rem;
        transition: .2s;
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


const SubsectionLink = ({ to, label, withToggler, featuresOpen, toggleFeatures }) => (
    <StyledSub>
        <NavLink to={to} activeClassName='active'>
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
)

export default SubsectionLink;