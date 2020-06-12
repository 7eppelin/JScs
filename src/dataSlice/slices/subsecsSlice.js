
import { createSlice } from '@reduxjs/toolkit';

import { 
    addSubsec,
    removeSubsec,
    removeSection,
    addFeature,
    removeFeature 
} from './sharedActions';



const subsecsSlice = createSlice({
    name: 'subsecs',
    initialState: {},
    reducers: {
        recieveSubsecs: (state, action) => {
            const items = action.payload;
            items.forEach(item => state[item.id] = item)
        },

        reorderFeatures: (state, action) => {
            const { subsecID, newOrder } = action.payload
            state[subsecID].children = newOrder
        },
    },

    extraReducers: {
        [addSubsec]: (state, action) => {
            const sub = action.payload
            state[sub.id] = sub
        },

        [removeSubsec]: (state, action) => {
            delete state[action.payload]
        },

        [removeSection]: (state, action) => {
        // del all features with f.sectionID === action.payload
            const secID = action.payload
            for (const sub in state) {
                if (sub.sectionID === secID) delete state[sub.id]
            }           
        },

        [addFeature]: (state, action) => {
        // add feature's id to the parent subsec children
            const { id, subsectionID } = action.payload
            state[subsectionID].children.push(id)
        },

        [removeFeature]: (state, action) => {
        // remove feature's id from the parent subsec children
            const { id, subsecID } = action.payload
            const sub = state[subsecID]
            sub.children = sub.children.filter(f => f !== id)
        }
    }
})


const { reducer, actions } = subsecsSlice;

export default reducer

export const { 
    recieveSubsecs,
    reorderFeatures,
} = actions;