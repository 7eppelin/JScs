
import { 
    findSectionID, 
    findSubsecID, 
    findFeatureID 
} from 'utils'

import { 
    removeSection, 
    removeSubsection, 
    removeFeature 
} from 'dataSlice'



// when a regular user tries to delete an item via the AddForm
// this function is being dispatched

// deletes sections/subsections/features only from the redux store

export default name => async dispatch => {

    const [ secName, subsecName, featureName ] = name.split('/');

    if (featureName) {
        return await dispatch(deleteDemoFeature(featureName, subsecName, secName));
    
    } else if (subsecName) {
        return await dispatch(deleteDemoSubsection(subsecName, secName));

    } else {
        return await dispatch(deleteDemoSection(name));
    }
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoSection = name => (dispatch, getState) => {

}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoSubsection = (name, secName) => (dispatch, getState) => {

}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoFeature = (name, secName, subsecName) => (dispatch, getState) => {

}