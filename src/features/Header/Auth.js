import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import Login from './Login'
import Logout from './Logout'



const Auth = () => {
    const user = useSelector(state => state.user);
    if (user === 'initializing') return null;

    return (
        <StyledAuth>
            {user ?  <Logout user={user} /> : <Login />}
        </StyledAuth>
    )
}

const StyledAuth = styled.div`
    float: right;
    font-size: 1.5rem;
    margin-top: 25px;
    color: var(--white1);

    button {
        background: transparent;
        color: var(--white);
        font-size: 1.2rem;
        padding: 5px 15px;
        border-radius: 5px;
        transition: .5s;
    }

    button:hover { background: var(--gray5) }
    button:hover span { color: var(--orange2) }

    span {
        color: var(--orange1);
        transition: .2s;
    }

    img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border: 1px solid var(--gray2);
        vertical-align: middle;
        margin-left: 8px;
    }
`;

export default Auth;