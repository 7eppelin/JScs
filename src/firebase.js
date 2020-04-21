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


export const loginWithGithub = () => dispatch => {
    //  firebase's user displayName field
    //  is being set to null for some reason
    //  the only way to set it explicitly is 
    //  to use additionalUserInfo from signInWithPopup() response

    authRef.signInWithPopup(authProvider)
        .then(result => {
            const user = authRef.currentUser;
            if (user.displayName) return;
            user.updateProfile({
                displayName: result.additionalUserInfo.username
            })
            .then(() => dispatch(logIn(user)))
        })
}



// export const authConfig = {
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.GithubAuthProvider.PROVIDER_ID,
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     ],

//     callbacks: {
//         signInSuccessWithAuthResult: (authResult, redirectURL) => {
//             // console.log(authResult);
//         },
//         uiShown: () => {
//             // may want to hide the signup form here
//         },
//     },

//     signInFlow: 'popup', // default value is 'redirect'
//     //signInSuccessUrl: '<url-to-redirect-to-on-success>',
// }