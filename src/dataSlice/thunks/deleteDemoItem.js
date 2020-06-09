
import { batch } from 'react-redux'

import { 
    findSubsecIDinDB, 
    findFeatureIDinDB,
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
        return await dispatch(deleteDemoFeature(name));
    
    } else if (subsecName) {
        return await dispatch(deleteDemoSubsection(name));

    } else {
        return await dispatch(deleteDemoSection(name));
    }
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoSection = name => (dispatch, getState) => {

    // check whether a section with the given name exists
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



const deleteDemoSubsection = address => async (dispatch, getState) => {

    const [ secName, name ] = address.split('/')

    // check whether a section with the given name exists
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, secName)

    if (!sectionID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)


    // check whether a subsection with the given name exists
    const subsecs = getState().data.subsections
    const subsecID = (
        // look up in the state first
        findItemWithParent(subsecs, name, secName)?.id
        // then in the database
        || await findSubsecIDinDB(name, secName)
    )

    if (!subsecID) throw Error(`
        The {{${name}}} subsection does {{not exist}} 
        in {{${secName}}}/.
    `)

    batch(() => {
        dispatch(removeSubsection(subsecID))
        dispatch(removeContentItem(subsecID))
    })

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} subsection has been deleted 
        from {{${secName}}}/ from {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const deleteDemoFeature = address => async (dispatch, getState) => {

    const [ secName, subsecName, name ] = address.split('/')

    // check whether a section with the given name exists
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, secName)
    
    if (!sectionID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)


    // check whether a subsection with the given name exists
    const subsecs = getState().data.subsections
    const subsecID = (
        // look up in the state first
        findItemWithParent(subsecs, subsecName, secName)?.id
        // then in the database
        || await findSubsecIDinDB(subsecName, secName)
    )

    if (!subsecID) throw Error(`
        The {{${subsecName}}} subsection does {{not exist}} 
        in {{${secName}}}/.
    `)


    // check whether a feature with the given name exists
    const features = getState().data.features
    const featureID = (
        // look up in the state first
        findItemWithParent(features, name, secName, subsecName)?.id
        // then in the database
        || await findFeatureIDinDB(name, secName, subsecName)        
    )

    if (!featureID) throw Error(`
        The {{${name}}} feature does {{not exist}} 
        in {{${secName}}}/{{${subsecName}}}/.
    `)

    batch(() => {
        dispatch(removeFeature(featureID))
        dispatch(removeContentItem(featureID))
    })

    return `
        !!Database: insufficient permissions! !!
        The {{${name}}} feature has been deleted from
        {{${secName}}}/{{${subsecName}}}/ from {{state}}.
    `
}