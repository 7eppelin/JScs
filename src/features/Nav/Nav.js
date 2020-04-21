import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';

import SectionMenu from 'features/SectionMenu/SectionMenu';
import SubsectionMenu from 'features/SubsectionMenu/SubsectionMenu';

const StyledNav = styled.nav`
    box-shadow: 0 0 8px 1px var(--black);
    flex-basis: 400px;
    margin-right: 30px;
    display: flex;
`;


const Nav = () => (
    <StyledNav>
        <SectionMenu />
        <Route path='/:sectionName?/:subsecName?/:featureName?'>
            <SubsectionMenu />
        </Route>
    </StyledNav>
)

export default Nav;