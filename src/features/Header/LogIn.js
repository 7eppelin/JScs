import React from 'react';
import styled from 'styled-components/macro';

import {gitLogo} from 'assets/GitHub-Mark-Light-32px.png'


const StyledLogin = styled.button`
    width: 100%;
    height: 100%;
    background: transparent;
    color: var(--white);
    font-size: 1.1rem;
    padding: 5px;

    span {
        font-size: 1.4rem;
        color: var(--orange1);
    }
`;


const LogIn = ({ logIn }) => (
    <StyledLogin onClick={logIn} >
        Welcome, <span>guest</span>
        <img src={gitLogo} alt='GitHub Logo' />
    </StyledLogin>
)

export default LogIn