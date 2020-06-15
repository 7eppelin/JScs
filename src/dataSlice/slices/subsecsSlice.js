
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
            const sub = action.payload
            state[sub.sectionName].push(sub)
        },

        [removeSubsec]: (state, action) => {
            delete state[action.payload]
        },

        [removeSection]: (state, action) => {
        // del all subsecs with subsec.sectionID === action.payload
            const secID = action.payload
            for (const sub in state) {
                if (sub.sectionID === secID) delete state[sub.id]
            }           
        },
    }
})


const { reducer, actions } = subsecsSlice;

export default reducer

export const { 
    recieveSubsecs,
    reorderSubsecs,
} = actions;