
import { createSlice } from '@reduxjs/toolkit';

import { 
    addSubsec,
    removeSubsec,
    removeSection,
} from './sharedActions';


/*
state = {
    sectionName: [ { subsec }, { subsec2 }, ...],
    anotherSection: [ { subsec42 }, { subsec66 }, ...],
    ...
}
 */

const subsecsSlice = createSlice({
    name: 'subsecs',
    initialState: {},
    reducers: {
        receiveSubsecs: (state, action) => {
            const subs = action.payload
            const secName = subs[0].sectionName
            state[secName] = subs
        },

        reorderSubsecs: (state, action) => {
            const { sectionName, newOrder } = action.payload
            state[sectionName] = newOrder
        },
    },

    extraReducers: {
        [addSubsec]: (state, action) => {
            const subsec = action.payload
            const secName = subsec.sectionName
            if (state[secName]) {
                state[secName].push(subsec)
            } else {
                state[secName] = [ subsec ]
            }
        },

        [removeSubsec]: (state, action) => {
            const { secName, id } = action.payload
            state[secName] = state[secName].filter(
                sub => sub.id !== id
            )
        },

        [removeSection]: (state, action) => {
            const secName = action.payload.name
            delete state[secName]
        },
    }
})


const { reducer, actions } = subsecsSlice;

export default reducer

export const { reorderSubsecs, receiveSubsecs } = actions;