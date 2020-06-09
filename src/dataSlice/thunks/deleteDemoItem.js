
import { 
    findSectionID, 
    findSubsecID, 
    findFeatureID,
    findItemByName,
    findIdByName,
    findItemWithParent,
    createContentItem 
} from 'utils'

import { 
    removeSection, 
    removeSubsection, 
    removeFeature,
    removeContentItem
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

    // check whether a section with the given name exist
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, name)

    if (!sectionID) throw Error(`
        The {{${name}}} section does {{not exist}}.
    `)

    dispatch(removeSection(sectionID))
    dispatch(removeContentItem(sectionID))

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} section has been deleted from {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoSubsection = (name, secName) => (dispatch, getState) => {

}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoFeature = (name, secName, subsecName) => (dispatch, getState) => {

}