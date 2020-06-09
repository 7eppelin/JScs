
import { batch } from 'react-redux'

import { 
    findSectionID, 
    findSubsecID, 
    findFeatureID,
    findItemByName,
    findIdByName,
    findItemWithParent,
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

    batch(() => {
        dispatch(removeSection(sectionID))
        dispatch(removeContentItem(sectionID))
    })

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} section has been deleted from {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoSubsection = (name, secName) => async (dispatch, getState) => {

    // check whether a section with the given name exist
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, secName)

    if (!sectionID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)


    // check whether a subsection with the given name exists
    const subsecs = getState().data.subsections
    const subsec = (
        // look up in the state first
        findItemWithParent(subsecs, name, secName)
        // then in the database
        || await findSubsecID(name, secName)
    )

    if (!subsec) throw Error(`
        The {{${name}}} subsection does {{not exist}} 
        in {{${secName}}}/.
    `)

    batch(() => {
        dispatch(removeSubsection(subsec.id))
        dispatch(removeContentItem(subsec.id))
    })

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} subsection has been deleted 
        from {{${secName}}}/ from {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoFeature = (name, secName, subsecName) => (dispatch, getState) => {

}