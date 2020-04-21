import { createSlice } from '@reduxjs/toolkit';

const addFormStatusSlice = createSlice({

    name: 'addFormStatus',
    initialState: {
        type: 'success',
        message: '',
    },
    reducers: {
        setStatus: (state, action) => action.payload,
    }
})

const { reducer, actions } = addFormStatusSlice;
export const { setStatus } = actions;
export default reducer;