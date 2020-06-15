
import { createSlice } from '@reduxjs/toolkit';

import {
    removeSection,
} from './sharedActions'



const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        addSection: (state, action) => {
            state.push(action.payload)
        },

        recieveSections: (_, action) => {
            return action.payload
        },

        reorderSections: (_, action) => {
            return action.payload
        },
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            const id = action.payload
            return state.filter(sec => sec.id !== id)
        },
    }
})


const { reducer, actions } = sectionsSlice;

export default reducer

export const { 
    addSection,
    recieveSections,
    reorderSections,
    reorderSubsecs
} = actions;