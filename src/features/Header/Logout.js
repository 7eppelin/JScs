import React from 'react';
import styled from 'styled-components/macro';

import { authRef } from 'firebase.js';
import Tooltip from 'components/Tooltip'

const Logout = ({ user }) => (
    <Tooltip tip='click to log out' >
        <button onClick={() => authRef.signOut()}>
            Welcome, <span>{user.name}</span>
            <img src={user.photoURL} />
        </button>
    </Tooltip>
)

export default Logout