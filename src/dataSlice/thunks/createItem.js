

import { 
    findIDsByNames,
    validateCreate,
    createContentItem,
    saveContentItem,
    createSectionInDB,
    createSubsecInDB,
    createFeatureInDB,
    createItemRefInDB,
    createRefsDoc
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
    const section = await createSectionInDB(name)

    // create the reference in the ids arr
    await createItemRefInDB('sections', section.id)

    // create the doc that will contain
    // children subsecs ids
    await createRefsDoc(name)
    
    // create the corresponding content item
    const content = createContentItem(section);
    await saveContentItem(content);

    dispatch(addSection(section))
    return `The {{${name}}} section has been {{created}}.`
}



export const createSubsec = (names, sectionID) => async dispatch => {

    const [ sectionName, name ] = names
    
    const subsec = await createSubsecInDB(names, sectionID)

    // create a reference to the subsection
    // in the ids array respobsible for the order
    await createItemRefInDB(sectionName, subsec.id)

    // create the doc that will contain
    // children features ids
    await createRefsDoc(subsec.id)

    // create a corresponding content item
    const content = createContentItem(subsec)
    await saveContentItem(content)

    dispatch(addSubsec(subsec));
    return `
        The {{${name}}} subsections has been 
        created in {{${sectionName}}}/.
    `
}



export const createFeature = (names, ids) => async dispatch => {

    const [ sectionName, subsecName, name ] = names
    const [ _, subsecID ] = ids

    // create the feature
    const feature = await createFeatureInDB(names, ids)

    // create a reference to the feature
    // in the ids array respobsible for the order
    await createItemRefInDB(subsecID, feature.id)

    // create a corresponding content item
    const content = createContentItem(feature)
    await saveContentItem(content)

    dispatch(addFeature(feature))

    return `
        The {{${name}}} feature has been created 
        in {{${sectionName}}}/{{${subsecName}}}/.
    `
}