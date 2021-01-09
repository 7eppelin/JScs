
import { db } from 'firebase.js'

import { 
    findIDsByNames,
    validateDelete,
    getIdsFromDB,
    deleteItemRefFromDB,
    getFeaturesIdsFromDB,
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

    // either throws an error, or, if everything is ok, does nothing
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
    // but all the nested items as well

    // instead of executing operations for each related item
    // batch the operations together and commit once
    const batch = db.batch()

    batch.delete(db.doc(`sections/${id}`))
    batch.delete(db.doc(`content/${id}`))
    batch.delete(db.doc(`order/${name}`))

    // arr of all the nested subsecs' ids
    const subsecs = await getIdsFromDB(name)
    
    subsecs.forEach(sub => {
        batch.delete(db.doc(`subsecs/${sub}`))
        batch.delete(db.doc(`content/${sub}`))
        batch.delete(db.doc(`order/${sub}`))
    })

    // arr of all the nested features' ids
    const features = await getFeaturesIdsFromDB(subsecs)

    features.forEach(f => {
        batch.delete(db.doc(`features/${f}`))
        batch.delete(db.doc(`content/${f}`))
    })

    await batch.commit()
    dispatch(removeSection({ name, id }))
    return `The {{${name}}} section has been {{deleted}}.`
}



export const deleteSubsec = (names, ids) => async dispatch => {
    const [ secName, name ] = names
    const [ , id ] = ids

    // delete the reference to the subsection
    await deleteItemRefFromDB(secName, id)
    
    // batch all the operations together before executing
    const batch = db.batch();

    batch.delete(db.doc(`subsecs/${id}`))
    batch.delete(db.doc(`content/${id}`))
    batch.delete(db.doc(`order/${id}`))

    // find all the nested features' ids
    const features = await getIdsFromDB(id)

    features.forEach(f => {
        batch.delete(db.doc(`features/${f}`))
        batch.delete(db.doc(`features/${f}`))
    });

    await batch.commit()
    dispatch(removeSubsec({ id, secName }))
    return `The {{${name}}} subsection has been deleted from {{${secName}}}/.`
}



export const deleteFeature = (names, ids) => async dispatch => {
    const [ secName, subsecName, name ] = names
    const [ , subsecID, id ] = ids

    // delete the reference to the feature
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