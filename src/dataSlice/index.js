
import reducer from './dataSlice'


export {     
    addSection,
    recieveSections,
    reorderSections,
    reorderSubsecs
} from './slices/sectionsSlice'


export {
    recieveSubsecs,
    reorderFeatures,
} from './slices/subsecsSlice'


export { 
    recieveFeatures 
} from './slices/featuresSlice'


export { 
    addContentItem, 
    removeContentItem 
} from './slices/contentSlice'


export {
    removeSection,
    addSubsec,
    removeSubsec,
    addFeature,
    removeFeature,
} from './slices/sharedActions'



export { createItem } from './thunks/createItem'
export { deleteItem } from './thunks/deleteItem'
export { getSections } from './thunks/getSections'
export { getSubsecs } from './thunks/getSubsecs'
export { getFeatures } from './thunks/getFeatures'
export { getContentItem } from './thunks/getContentItem'
export { updateContentItem } from './thunks/updateContentItem'


export default reducer