
import { db, arrayRemove } from 'firebase.js'

import { 
    findIDsByNames,
    validateDelete,
    getIdsFromDB,
    deleteItemRefFromDB,
    deleteRefsDoc,
} from 'utils'

import { 
    removeSection, 
    removeSubsec, 
    removeFeature 
} from 'dataSlice'

import deleteDemoItem from './deleteDemoItem'


export const deleteItem = address => async (dispatch, getState) => {
    const names = address.split('/')
    const [ secName, subsecName, featureName ] = names

    // [ sectionID, subsectionID, featureID ]
    const ids = await findIDsByNames(names, getState().data)

    validateDelete(names, ids)

    const isAdmin = getState().user?.isAdmin
    if (!isAdmin) {
        // delete the item only from the redux store
        return dispatch(deleteDemoItem(names, ids))
    }

    if (featureName) {
        return await dispatch(deleteFeature(names, ids))
    
    } else if (subsecName) {
        return await dispatch(deleteSubsec(names, ids))

    } else {
        return await dispatch(deleteSection(secName, ids[0]))
    }
}



export const deleteSection = (name, id) => async dispatch => {

    // delete the reference to the section
    await deleteItemRefFromDB('sections', id)

    // now, we need to not only delete the section
    // but all the nested items aswell

    // get the array of the children subsecs ids
    const subs = await getIdsFromDB(name) || []
    
    // same goes for features
    // const features = await db.collection('features')
    //     .where('sectionName', '==', name)
    //     .get()
    //     .then(features => features.docs.map(doc => doc.id));

    const features = subs.reduce(
        async (prev, sub) => {
            const ids = await getIdsFromDB(sub)
            return ids ? [...prev, ...ids] : prev
        }, 
        []
    )

    // instead of executing operations for every single item
    // batch them together and commit once
    const batch = db.batch()

    batch.delete(db.doc(`sections/${id}`))
    batch.delete(db.doc(`content/${id}`))
    batch.delete(db.doc(`order/${name}`))

    subs.forEach(sub => {
        batch.delete(db.doc(`subsecs/${sub}`))
        batch.delete(db.doc(`content/${sub}`))
        batch.delete(db.doc(`order/${sub}`))
    })

    features.forEach(feature => {
        batch.delete(db.doc(`features/${feature}`))
        batch.delete(db.doc(`features/${feature}`))
    })

    await batch.commit()

    dispatch(removeSection(name))

    return `The {{${name}}} section has been {{deleted}}.`
}



export const deleteSubsec = (names, ids) => async dispatch => {

    const [ secName, name ] = names
    const [ secID, id ] = ids

    // delete the reference to the subsection
    await deleteItemRefFromDB(secName, id)

    // find all the nested features' ids
    const features = await getIdsFromDB(id)
    
    // batch all the operations together before commiting
    const batch = db.batch();

    batch.delete(db.doc(`subsecs/${id}`))
    batch.delete(db.doc(`content/${id}`))
    batch.delete(db.doc(`order/${id}`))

    features.forEach(feature => {
        batch.delete(db.doc(`features/${feature}`))
        batch.delete(db.doc(`features/${feature}`))
    });

    await batch.commit();

    dispatch(removeSubsec({ id, secName }))

    return `The {{${name}}} subsection has been deleted from {{${secName}}}/.`
}



export const deleteFeature = (names, ids) => async dispatch => {

    const [ secName, subsecName, name ] = names
    const [ sectionID, subsecID, id ] = ids

    // delete the reference to the feature
    // from the parent subsection's children field
    await deleteItemRefFromDB(subsecID, id)

    // delete the feature
    await db.doc(`features/${id}`).delete()
    await db.doc(`features/${id}`).delete()

    dispatch(removeFeature({ id, subsecID }))

    return `
        The {{${name}}} feature has been deleted 
        from {{${secName}}}/{{${subsecName}}}/.
    `
}