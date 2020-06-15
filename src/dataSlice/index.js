
import reducer from './dataSlice'


export {     
    addSection,
    recieveSections,
    reorderSections,
} from './slices/sectionsSlice'


export {
    recieveSubsecs,
    reorderSubsecs,
} from './slices/subsecsSlice'


export { 
    recieveFeatures,
    reorderFeatures
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
export { fetchSections } from './thunks/fetchSections'
export { fetchSubsecs } from './thunks/fetchSubsecs'
export { fetchFeatures } from './thunks/fetchFeatures'
export { fetchContentItem } from './thunks/fetchContentItem'
export { updateContentItem } from './thunks/updateContentItem'


export default reducer