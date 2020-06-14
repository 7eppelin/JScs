
import { db, arrayUnion } from 'firebase.js'

import { 
    findIDsByNames,
    validateCreate,
    createContentItem,
    saveContentItem,
    createSectionInDB,
    createSubsecInDB,
    createFeatureInDB
} from 'utils'

import { 
    addSection, 
    addSubsec, 
    addFeature,
} from 'dataSlice'

import createDemoItem from './createDemoItem'


export const createItem = address => async (dispatch, getState) => {

    // array [ 'sectionName', 'subsecName', 'featureName' ]
    const names = address.split('/')

    // array [ sectionID, subsecID, featureID ]
    const ids = await findIDsByNames(names, getState().data)

    const [ secName, subsecName, featureName ] = names
    const [ secID ] = ids

    // validate the address
    validateCreate(names, ids)


    const isAdmin = getState().user?.isAdmin;
    if (!isAdmin) {
        // create the item only in the redux store
        return dispatch(createDemoItem(names, ids))
    }

    if (featureName) {
        return await dispatch(createFeature(names, ids))

    } else if (subsecName) {
        return await dispatch(createSubsec(names, secID))

    } else {
        return await dispatch(createSection(secName))
    }
}




export const createSection = name => async dispatch => {

    const newSec = { name, children: [] }

    // create the section in db
    await db.collection('sections')
        .add(newSec)
        .then(sec => newSec.id = sec.id)

    // create the reference in the ids arr
    await db.doc('order/sections')
        .update({ ids: arrayUnion(newSec.id) })
    
    // create the corresponding content item
    // with the same ID
    const content = createContentItem(newSec);
    await saveContentItem(content);

    dispatch(addSection(newSec))
    
    return `The {{${name}}} section has been {{created}}.`
}



export const createSubsec = (names, sectionID) => async dispatch => {

    const [ sectionName, name ] = names

    const newSubsec = { 
        name, 
        sectionID, 
        sectionName, 
        children: [] 
    }

    // create the subsec and save it's ID in newSubsec
    await db.collection('subsections')
        .add(newSubsec)
        .then(subsec => newSubsec.id = subsec.id)

    // create a reference to the subsection
    // in the parent section's children array
    await db.doc(`sections/${sectionID}`)
        .update({ children: arrayUnion(newSubsec.id) })

    // create a corresponding content item
    const content = createContentItem(newSubsec)
    await saveContentItem(content)

    dispatch(addSubsec(newSubsec));

    return `
        The {{${name}}} subsections has been 
        created in {{${sectionName}}}/.
    `
}



export const createFeature = (names, ids) => async dispatch => {

    const [ sectionName, subsectionName, name ] = names
    const [ sectionID, subsectionID ] = ids

    // create the feature;
    const newFeature = { 
        name, 
        sectionID, 
        sectionName, 
        subsectionID, 
        subsectionName
    }

    await db.collection('features')
        .add(newFeature)
        .then(feature => newFeature.id = feature.id)

    // create a reference to the feature
    // in the parent subsection's children array
    await db.doc(`subsections/${subsectionID}`)
        .update({ children: arrayUnion(newFeature.id)})

    // create a corresponding content item
    const content = createContentItem(newFeature)
    await saveContentItem(content)

    dispatch(addFeature(newFeature))

    return `
        The {{${name}}} feature has been created 
        in {{${sectionName}}}/{{${subsectionName}}}/.
    `
}