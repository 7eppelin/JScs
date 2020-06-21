import React from 'react';

import { authRef } from 'firebase.js';
import Tooltip from 'components/Tooltip'

const Logout = ({ user }) => (
    <Tooltip tip='click to log out' >
        <button onClick={() => authRef.signOut()}>
            Welcome, <span>{user.name}</span>
            <img src={user.photoURL} alt="user avatar" />
        </button>
    </Tooltip>
)

export default Logout