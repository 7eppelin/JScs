
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

        [removeSubsec]: (state, action) => {
            const { id } = action.payload
            delete state[id]
        },
        
        [removeSection]: (state, action) => {
            const secName = action.payload.name

            for (const key in state) {
                // take array of features
                const features = state[key]
                // take the first feature's sectionName field
                const section = features[0]?.sectionName

                // if it's equal to the given secName
                // delete the entire array
                if (section === secName) delete state[key]
            }
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