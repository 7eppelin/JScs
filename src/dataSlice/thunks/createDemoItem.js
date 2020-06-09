
import { 
    addSections, 
    addNewSubsection, 
    addNewFeature,
    addContentItem
} from 'dataSlice'


import { 
    findSubsecID, 
    findFeatureID, 
    findItemByName,
    findIdByName,
    findItemWithParent,
    createContentItem 
} from 'utils'


// when a regular user tries to craete an item via the AddForm
// this function is being dispatched

// creates sections/subsections/features only in the redux store

export default name => async dispatch => {
    const [secName, subsecName, featureName] = name.split('/');

    if (featureName) {
        return await dispatch(createDemoFeature(featureName, subsecName, secName))

    } else if (subsecName) {
        return await dispatch(createDemoSubsec(subsecName, secName))

    } else {
        return dispatch(createDemoSection(secName))
    }
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// items' ids
let counter = 1;


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const createDemoSection = name => (dispatch, getState) => {

    // the new section's object
    const newSec = {
        name,
        id: counter++,
        children: []
    }

    // check whether a section with the given name already exists
    const sections = getState().data.sections.byID
    const sec = findItemByName(sections, name)

    if (sec) throw Error(`
        The {{${name}}} section already {{exists}}.
    `)

    // add the section to the state
    dispatch(addSections([ newSec ]))

    // create the corresponding content item
    // and add it to the state
    const url = `/${name}`;
    const content = createContentItem(newSec.id, name, url);
    dispatch(addContentItem(content))

    // return the status message
    return `
        !!Database: Insufficient permissions! !! 
        The {{${name}}} section has been created in {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const createDemoSubsec = (name, secName) => async (dispatch, getState) => {

    // check whether a section with the given name exists
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, secName)

    if (!sectionID) throw Error(
        `The {{${secName}}} section does {{not exist}}.`
    )

    // check whether a subsec with the given name 
    // already exists in the section
    const subsecs = getState().data.subsections
    const subsec = (
        // look up in the state first
        findItemWithParent(subsecs, name, secName)
        // then in the database
        || await findSubsecID(name, secName)
    )

    if (subsec) throw Error(`
        The {{${name}}} subsection already {{exists}} in {{${secName}}}/.
    `)


    // create the subsec's object
    const newSubsec = {
        name,
        id: counter++,
        sectionName: secName,
        sectionID,
        children: []
    }

    // add the subsec to the store
    dispatch(addNewSubsection(newSubsec))

    // create the corresponding content item and add it to the store
    const url = `/${secName}/${name}`;
    const content = createContentItem(newSubsec.id, name, url);
    dispatch(addContentItem(content))

    // return the status message
    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} subsection 
        has been created in {{${secName}}}/ in {{state}}.
    `
}



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



const createDemoFeature = (name, subsecName, secName) => async (dispatch, getState) => {

    // check whether a section with the given name exists
    const sections = getState().data.sections.byID
    const sectionID = findIdByName(sections, secName)

    if (!sectionID) throw Error(`
        The {{${secName}}} section does {{not exist}}.
    `)


    // check whether a subsection with the given name exists
    const subsecs = getState().data.subsections

    const subsectionID = (
        // look up in the state first
        findItemWithParent(subsecs, subsecName, secName)?.id
        // then in the database
        || await findSubsecID(name, secName)
    )

    if (!subsectionID) throw Error(`
        The {{${subsecName}}} subsection
        does {{not exist}} in {{${secName}}}/.
    `)


    // check whether a feature with the given name already exists
    const features = getState().data.features
    const feature = (
        // look up in the state first
        findItemWithParent(features, name, secName, subsecName)
        // then in the database
        || await findFeatureID(name, secName, subsecName)
    )
    if (feature) {
        throw Error(`
            The {{${name}}} feature already
            exists in {{${secName}}}/{{${subsecName}}}/.
        `)
    }

    const newFeature = {
        name,
        id: counter++,
        sectionName: secName,
        sectionID,
        subsectionName: subsecName,
        subsectionID,
        children: []
    }

    dispatch(addNewFeature(newFeature))

    const url = `/${secName}/${subsecName}/${name}`;
    const content = createContentItem(newFeature.id, name, url);
    dispatch(addContentItem(content))

    return `
        !!Database: Insufficient permissions.!! 
        The {{${name}}} feature has been 
        created in {{${secName}}}/{{${subsecName}}}/ in {{state}}.
    `
}