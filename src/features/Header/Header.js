import React from 'react';
import styled from 'styled-components/macro';

import Logo from './Logo.js';
import AddFormContainer from '../AddForm/AddFormContainer.js';
import Auth from './Auth';


const Header = () => (
    <StyledHeader>
        <div>
            <Logo />
            <AddFormContainer />
            <Auth />
        </div>
    </StyledHeader>
)

const StyledHeader = styled.header`
    height: 80px;
    background: var(--gray6);
    box-shadow: 0 1px 5px 2px var(--black);
    position: relative;

    & > div {
        width: 85%;
        margin: 0 auto;
    }
`;

export default Header;