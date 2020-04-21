import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
    padding: 15px;
    display: block;
    height: 100%;
    transition: .2s;
    color: var(--gray1);
    background-color: var(--gray5);

    &:hover {
        background: var(--gray4);
        box-shadow: inset 0 0 10px 0 var(--gray6);
        color: var(--white);
    }

    &.active {
        background-color: var(--gray3);
        box-shadow: inset 0 0 10px 0 var(--gray6);
        color: var(--white);
    }
`;


const SectionLink = ({ label }) => (
    <StyledLink to={`/${label}`} activeClassName='active'>
        {label}
    </StyledLink>
)

export default SectionLink;