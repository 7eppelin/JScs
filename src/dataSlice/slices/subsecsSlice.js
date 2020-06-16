
import { createSlice } from '@reduxjs/toolkit';

import { 
    addSubsec,
    removeSubsec,
    removeSection,
} from './sharedActions';


const subsecsSlice = createSlice({
    name: 'subsecs',
    initialState: {},
    reducers: {
        recieveSubsecs: (state, action) => {
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
            delete state[action.payload]
        },

        [removeSection]: (state, action) => {
            const secName = action.payload
            delete state[secName]
        },
    }
})


const { reducer, actions } = subsecsSlice;

export default reducer

export const { 
    recieveSubsecs,
    reorderSubsecs,
} = actions;