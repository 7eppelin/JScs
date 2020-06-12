
import { createSlice } from '@reduxjs/toolkit';

import {
    removeSection,
    addSubsec,
    removeSubsec
} from './sharedActions'



const sectionsSlice = createSlice({
    name: 'sections',
    initialState: { byID: {}, ids: [] },
    reducers: {
        addSection: (state, action) => {
            const sec = action.payload;
            state.byID[sec.id] = sec
            state.ids.push(sec.id)
        },

        recieveSections: (state, action) => {
            state.byID = action.payload
        },

        reorderSections: (state, action) => {
            state.ids = action.payload;
        },

        reorderSubsecs: (state, action) => {
            const { sectionID, newOrder } = action.payload
            state.byID[sectionID].children = newOrder
        },
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            const id = action.payload
            delete state.byID[id]
            state.ids = state.ids.filter(s => s !== id)
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