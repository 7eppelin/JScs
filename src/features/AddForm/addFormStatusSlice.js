import { createSlice } from '@reduxjs/toolkit';

const addFormStatusSlice = createSlice({

    name: 'addFormStatus',
    initialState: {
        type: 'success',
        message: 'Specify sectionName/subsectionName/featureName (separated with forward-slashes) of the item you want to create/delete',
    },
    reducers: {
        setStatus: (state, action) => action.payload,
    }
})

const { reducer, actions } = addFormStatusSlice;
export const { setStatus } = actions;
export default reducer;