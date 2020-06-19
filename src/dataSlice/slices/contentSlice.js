
import { createSlice } from '@reduxjs/toolkit';

import { 
    removeSection,
    removeSubsec,
    removeFeature
} from './sharedActions'

const contentSlice = createSlice({
    name: 'content',
    initialState: {},
    reducers: {
        addContentItem: (state, action) => {
            state[action.payload.id] = action.payload;
        },

        removeContentItem: (state, action) => {
            delete state[action.payload]
        }
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            delete state[action.payload]
        },

        [removeSubsec]: (state, action) => {
            delete state[action.payload]
        },

        [removeFeature]: (state, action) => {
            delete state[action.payload]
        }
    }
})


const { reducer, actions } = contentSlice

export default reducer

export const { 
    addContentItem, 
    removeContentItem 
} = actions
