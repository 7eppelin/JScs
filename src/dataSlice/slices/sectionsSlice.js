
import { createSlice } from '@reduxjs/toolkit'
import { removeSection } from './sharedActions'
import { arrayMove } from 'utils';


const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        addSection: (state, action) => {
            state.push(action.payload)
        },

        receiveSections: (_, action) => {
            return action.payload
        },

        reorderSections: (state, action) => {
            const { current, target } = action.payload
            return arrayMove(state, current, target)
        }
    },

    extraReducers: {
        [removeSection]: (state, action) => {
            const { name } = action.payload
            return state.filter(sec => sec.name !== name)
        },
    }
})


const { reducer, actions } = sectionsSlice;

export default reducer

export const { 
    addSection,
    receiveSections,
    reorderSections,
} = actions;