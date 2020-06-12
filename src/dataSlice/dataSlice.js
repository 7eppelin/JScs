
import { combineReducers } from '@reduxjs/toolkit'

import sectionsReducer from './slices/sectionsSlice'
import subsecsReducer from './slices/subsecsSlice'
import featuresReducer from './slices/featuresSlice'
import contentReducer from './slices/contentSlice'



const reducer = combineReducers({
    sections: sectionsReducer,
    subsecs: subsecsReducer,
    features: featuresReducer,
    content: contentReducer
})

export default reducer