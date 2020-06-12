
import { createSlice } from '@reduxjs/toolkit';

import { 
    addFeature,
    removeFeature,
    removeSection, 
    removeSubsec 
} from './sharedActions'


const featuresSlice = createSlice({
    name: 'features',
    initialState: {},

    reducers: {
        recieveFeatures: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state[item.id] = item
            })
        },
    },

    
    extraReducers: {
        [addFeature]: (state, action) => {
            const item = action.payload
            state[item.id] = item
        },

        [removeFeature]: (state, action) => {
            const id = action.payload
            delete state[id]
        },
        
        [removeSection]: (state, action) => {
        // del all features with f.sectionID === action.payload
            const secID = action.payload
            for (const f in state) {
                if (f.sectionID === secID) {
                    delete state[f.id]
                }
            }
        },

        [removeSubsec]: (state, action) => {
        // del all features with f.subsectionID === action.payload
            const subsecID = action.payload
            for (const f in state) {
                if (f.subsectionID === subsecID) {
                    delete state[f.id]
                }
            }
        }
    }
})


const { reducer, actions } = featuresSlice

export default reducer

export const {
    recieveFeatures,
} = actions