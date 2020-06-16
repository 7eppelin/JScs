
import { 
    addSection, 
    addSubsec, 
    addFeature,
    addContentItem
} from 'dataSlice'

import { nanoid } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { createContentItem } from 'utils'


// when a regular user tries to craete an item via the AddForm
// this function is being dispatched

// creates sections/subsections/features only in the redux store

export default (names, ids) => async dispatch => {
    const [ secName, subsecName, featureName ] = names
    const [ secID ] = ids

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

    const newSec = { name, id: nanoid() }

    const content = createContentItem(newSec)

    batch(() => {
        dispatch(addSection(newSec))
        dispatch(addContentItem(content))
    })

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
    }

    const content = createContentItem(newSubsec)

    batch(() => {
        dispatch(addSubsec(newSubsec))
        dispatch(addContentItem(content))
    })

    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} subsection 
        has been created in {{${sectionName}}}/ in {{state}}.
    `
}



const createDemoFeature = (names, ids) => dispatch => {

    const [ sectionName, subsecName, name ] = names
    const [ sectionID, subsecID ] = ids

    const newFeature = {
        name,
        id: nanoid(),
        sectionName,
        sectionID,
        subsecName,
        subsecID,
    }

    const content = createContentItem(newFeature)

    batch(() => {
        dispatch(addFeature(newFeature))
        dispatch(addContentItem(content))
    })

    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} feature has been created in 
        {{${sectionName}}}/{{${subsecName}}}/ in {{state}}.
    `
}