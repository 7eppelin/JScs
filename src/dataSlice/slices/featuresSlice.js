
import { createSlice } from '@reduxjs/toolkit';

import { 
    removeFeature,
    removeSection, 
    removeSubsec,
} from './sharedActions'


/*

state = {
    subsecID: [ { feature }, { feature2 }, ... ],
    subsecID-2: [ { feature3 }, { faeture4 }, ... ],
    ... 
}

*/

const featuresSlice = createSlice({
    name: 'features',
    initialState: {},

    reducers: {
        addFeature: (state, action) => {
            const feature = action.payload
            const { subsecID } = feature

            if (state[subsecID]) {
                state[subsecID].push(feature)
            } else {
                state[subsecID] = [ feature ]
            }
        },

        receiveFeatures: (state, action) => {
            const { features, subsecID } = action.payload;
            state[subsecID] = features
        },

        reorderFeatures: (state, action) => {
            const { subsecID, newOrder } = action.payload
            state[subsecID] = newOrder
        }
    },

    
    extraReducers: {
        [removeFeature]: (state, action) => {
            const { id, subsecID } = action.payload
            state[subsecID] = state[subsecID].filter(f => f.id !== id)
        },
        
        [removeSection]: (state, action) => {
            // arr of ids
            const { subsecs } = action.payload
            subsecs.forEach(sub => delete state[sub])
        },

        [removeSubsec]: (state, action) => {
            const { id } = action.payload
            delete state[id]
        },
    }
})


const { reducer, actions } = featuresSlice

export default reducer

export const {
    addFeature,
    receiveFeatures,
    reorderFeatures
} = actions