import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({

    name: 'user',

    initialState: 'initializing', 
    // so i can delay rendering the Auth component or display a fallback
    // until after user resolved either to an obj or a null

    reducers: {
        // firebase provides us with an overly complicated user object
        // i want to make it simplier: just a few properties i can make use of
        // the 'prepare' function below is a middleware for action creators
        // it takes the argument provided to an action creator 
        // and must return a new object with a payload field
        // that new object will become the dispatched action 
        // (action.type is added automatically)
        
        logIn: {
            prepare: user => ({ 
            // user is the original firebase user obj provided via dispatch(logIn(user))
                payload: {
                    id: user.uid,
                    name: user.displayName,
                    photoURL: user.photoURL,
                    isAdmin: user.uid === 'HsccJuK5aMMy2j6aUbcEueZG8S82'
                }
            }),
            reducer: (state, action) => action.payload,
        },
        logOut: () => null,
    }
});

const { actions, reducer } = userSlice;

export const { logIn, logOut } = actions;
export default reducer;

