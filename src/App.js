import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { logIn, logOut } from 'userSlice';
import { authRef } from './firebase';

import Header from 'features/Header/Header';
import Footer from 'features/Footer/Footer';
import Main from 'features/Main/Main';


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		authRef.onAuthStateChanged(user => {
			if (!user) return dispatch(logOut())
			dispatch(logIn(user))
		})
	});

	return (
		<StyledApp>
			<Header />
			<Main />
			<Footer />
		</StyledApp>
	);
}


const StyledApp = styled.div`
	height: 100%;
	position: relative;
	background:
        radial-gradient(black 15%, transparent 16%) 0 0,
        radial-gradient(black 15%, transparent 16%) 8px 8px,
        radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
        radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
    background-color:#282828;
    background-size:16px 16px;
`;

export default App