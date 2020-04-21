import React from 'react';

const LogOut = ({ user, logOut }) => (
    <button onClick={logOut}>
        Welcome, <span>{user.displayName}</span>
        <img src={user.photoURL} alt='user avatar' />
    </button>

)

export default LogOut;