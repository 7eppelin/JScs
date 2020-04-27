import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { logIn } from 'features/Header/userSlice';


// app config

const firebaseConfig = {
    apiKey: "AIzaSyCqfDPElcxK_jEnkw9ClISo1m4I8TZd3n8",
    authDomain: "jscs-41882.firebaseapp.com",
    databaseURL: "https://jscs-41882.firebaseio.com",
    projectId: "jscs-41882",
    storageBucket: "jscs-41882.appspot.com",
    messagingSenderId: "863244981090",
    appId: "1:863244981090:web:203d3bdb599546dc95523b"
};

firebase.initializeApp(firebaseConfig);



// database

export const db = firebase.firestore();

export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
export const Timestamp = firebase.firestore.Timestamp;



// authentication

export const authRef = firebase.auth();

const authProvider = new firebase.auth.GithubAuthProvider().addScope('read:user');


export const loginWithGithub = () => async dispatch => {
    //  firebase's user displayName field
    //  is being set to null for some reason
    //  the only way to set it explicitly
    //  is to use additionalUserInfo

    const signInResult = await authRef.signInWithPopup(authProvider)

    const user = authRef.currentUser;
    if (!user.displayName) {
        await user.updateProfile({
            displayName: signInResult.additionalUserInfo.username
        })
    }
    dispatch(logIn(user))
}