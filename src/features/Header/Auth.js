import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { loginWithGithub, authRef } from 'firebase.js';

import Tooltip from 'components/Tooltip';
import gitLogo from 'assets/GitHub-Mark-Light-32px.png';


const StyledAuth = styled.div`
    float: right;
    font-size: 1.5rem;
    margin-top: 25px;

    button {
        background: transparent;
        color: var(--white);
        font-size: 1.2rem;
        padding: 5px 15px;
        border-radius: 5px;
        transition: .5s;
    }

    button:hover { background: var(--gray6) }
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


const Auth = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    if (user === 'initializing') return null;

    return (
        <StyledAuth>
        <Tooltip position='bottom' tip={user ? 'click to log out' : 'click to log in with GitHub'} >
            <button onClick={user ? 
                () => authRef.signOut() :
                () => dispatch(loginWithGithub())
                } >
                Welcome, <span>{user ? user.name : 'guest'}</span>
                <img src={user ? user.photoURL : gitLogo} 
                    alt={user ? 'user avatar' : 'github logo'} 
                />
            </button>
        </Tooltip>
        </StyledAuth>
    )
}

export default Auth;