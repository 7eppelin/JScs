import { createSlice } from '@reduxjs/toolkit';


const editorStatusSlice = createSlice({
    name: 'editor',
    initialState: { 
        type: 'success',
        message: 'You can edit this page!'
    },
    reducers: {
        setEditorStatus: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer, actions } = editorStatusSlice;
export const { setEditorStatus } = actions;
export default reducer;