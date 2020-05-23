import React from 'react';
import styled from 'styled-components/macro';

import { loginWithGithub } from 'firebase.js'
import { useDispatch } from 'react-redux';

import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'


const Login = () => {
    const dispatch = useDispatch()

    return (
        <Tooltip position='bottom' 
            tip='click to log in with GitHub'>
            <button onClick={() => dispatch(loginWithGithub())}>
                Welcome, <span>guest</span>
                <StyledIcon icon='github' size={30} />
            </button>
        </Tooltip>
)}

const StyledIcon = styled(Icon)`
    margin-left: 8px;
    path { fill: var(--white) }
`

export default Login