import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import userReducer from 'userSlice';
import dataReducer from 'dataSlice';
import editorStatusReducer from 'features/Content/editorSlice';


const middleware = process.env.NODE_ENV !== 'production' ?
                [...getDefaultMiddleware(), createLogger({collapsed: true})] :
                [...getDefaultMiddleware()];
                

const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        editorStatus: editorStatusReducer
    },
    middleware,
});


export default store;