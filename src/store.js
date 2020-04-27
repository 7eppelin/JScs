import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import userReducer from 'userSlice';
import addFormStatusReducer from 'features/AddForm/addFormStatusSlice';
import dataReducer from 'dataSlice.js';
import editorStatusReducer from 'features/Content/editorSlice';


const middleware = process.env.NODE_ENV !== 'production' ?
                [...getDefaultMiddleware(), createLogger({collapsed: true})] :
                [...getDefaultMiddleware()];
                

const store = configureStore({
    reducer: {
        user: userReducer,
        addFormStatus: addFormStatusReducer,
        data: dataReducer,
        editorStatus: editorStatusReducer
    },
    middleware,
});


export default store;