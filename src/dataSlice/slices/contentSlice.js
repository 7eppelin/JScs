
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
            const item = action.payload
            state[item.id] = item
        },

        removeContentItem: (state, action) => {
            const id = action.payload
            delete state[id]
        }
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            const { id } = action.payload
            delete state[id]
        },

        [removeSubsec]: (state, action) => {
            const { id } = action.payload
            delete state[id]
        },

        [removeFeature]: (state, action) => {
            const { id } = action.payload
            delete state[id]
        }
    }
})


const { reducer, actions } = contentSlice

export default reducer

export const { 
    addContentItem, 
    removeContentItem 
} = actions
