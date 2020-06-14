
import { 
    addSection, 
    addSubsec, 
    addFeature,
    addContentItem
} from 'dataSlice'

import { nanoid } from '@reduxjs/toolkit'

import { createContentItem } from 'utils'


// when a regular user tries to craete an item via the AddForm
// this function is being dispatched

// creates sections/subsections/features only in the redux store

export default (names, ids) => async dispatch => {
    const [ secName, subsecName, featureName ] = names
    const [ secID, subsecID, featureID ] = ids

    if (featureName) {
        return dispatch(
            createDemoFeature(names, ids)
        )

    } else if (subsecName) {
        return dispatch(
            createDemoSubsec(names, secID)
        )

    } else {
        return dispatch(createDemoSection(secName))
    }
}



const createDemoSection = name => dispatch => {

    const newSec = {
        name,
        id: nanoid(),
        children: []
    }

    // add the section to the state
    dispatch(addSection(newSec))

    // create the corresponding content item
    // and add it to the state
    const content = createContentItem(newSec);
    dispatch(addContentItem(content))

    return `
        !!Database: Insufficient permissions! !! 
        The {{${name}}} section has been created in {{state}}.
    `
}



const createDemoSubsec = (names, sectionID) => dispatch => {

    const [ sectionName, name ] = names

    const newSubsec = {
        name,
        id: nanoid(),
        sectionName,
        sectionID,
        children: []
    }

    // add the subsec to the store
    dispatch(addSubsec(newSubsec))

    // create the corresponding content item and add it to the store
    const content = createContentItem(newSubsec)
    dispatch(addContentItem(content))

    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} subsection 
        has been created in {{${sectionName}}}/ in {{state}}.
    `
}



const createDemoFeature = (names, ids) => dispatch => {

    const [ sectionName, subsectionName, name ] = names
    const [ sectionID, subsectionID ] = ids

    const newFeature = {
        name,
        id: nanoid(),
        sectionName,
        sectionID,
        subsectionName,
        subsectionID,
        children: []
    }

    dispatch(addFeature(newFeature))

    const content = createContentItem(newFeature)
    dispatch(addContentItem(content))

    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} feature has been created in 
        {{${sectionName}}}/{{${subsectionName}}}/ in {{state}}.
    `
}