import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom'


const StyledItem = styled.li`
    flex-basis: 50%;
    flex-grow: 1;
    background: var(--gray6);

    a {
        display: block;
        height: 100%;
        padding-top: 8px;
        font-size: 1.4rem;
        color: var(--gray2);
        transition: .2s;
    }

    a:hover {
        background: var(--gray5);
        color: var(--orange2);
    }

    a.active {
        background: var(--gray5);
        color: var(--orange2);
    }
`;


const FeatureItem = ({ feature }) => (
    <StyledItem>
        <NavLink activeClassName='active'
            to={`/${feature.sectionName}/${feature.subsectionName}/${feature.name}`} >
                {feature.name}
        </NavLink>
    </StyledItem>
)

export default FeatureItem;