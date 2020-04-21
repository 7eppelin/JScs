import React from 'react';
import styled from 'styled-components/macro';

import Logo from './Logo.js';
import AddFormContainer from '../AddForm/AddFormContainer.js';
import Auth from './Auth';


const StyledHeader = styled.header`
    height: 80px;
    background: var(--gray5);
    box-shadow: 0 1px 5px 2px var(--black);
    position: relative;

    & > div {
        width: 85%;
        margin: 0 auto;
    }
`;


const Header = () => (
    <StyledHeader>
        <div>
            <Logo />
            <AddFormContainer />
            <Auth />
        </div>
    </StyledHeader>
)

export default Header;