
import { createSlice } from '@reduxjs/toolkit';

import {
    removeSection,
    addSubsec,
    removeSubsec
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

        reorderSubsecs: (state, action) => {
            const { sectionID, newOrder } = action.payload
            state.byID[sectionID].children = newOrder
        },
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            const id = action.payload
            return state.filter(sec => sec.id !== id)
        },

        [addSubsec]: (state, action) => {
            const { id, sectionID } = action.payload
            state.byID[sectionID].children.push(id)
        },

        [removeSubsec]: (state, action) => {
            const { id, secID } = action.payload
            const sec = state.byID[secID]
            sec.children = sec.children.filter(i => i !== id)
        }
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