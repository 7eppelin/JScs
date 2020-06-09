
import { db, arrayRemove } from 'firebase.js'

import { 
    findIDsByNames,
    validateDelete,
} from 'utils'

import { 
    removeSection, 
    removeSubsection, 
    removeFeature 
} from 'dataSlice'

import deleteDemoItem from './deleteDemoItem'


export const deleteItem = address => async (dispatch, getState) => {

    // the address arg is AddForm's input value
    // the format is sectionName/subsectionName/featureName

    const names = address.split('/')
    const ids = findIDsByNames(names, getState().data)

    // throws errors
    validateDelete(names, ids)


    const isAdmin = getState().user?.isAdmin
    if (!isAdmin) {
        return dispatch(
            deleteDemoItem(names, ids)
        )
    }


    const [ secName, subsecName, featureName ] = names

    if (featureName) {
        return await dispatch(
            deleteFeature(names, ids)
        )
    
    } else if (subsecName) {
        return await dispatch(
            deleteSubsection(names, ids)
        )

    } else {
        return await dispatch(
            deleteSection(secName, ids[0])
        )
    }
}





export const deleteSection = (name, id) => async dispatch => {

    // delete the reference to the section from the 'ids'
    await db.doc('order/sections')
        .update({ ids: arrayRemove(id) })


    // now, we need to not only delete the section
    // but all the items nested within it aswell

    // make an array of ids of the subsections
    // whose sectionName field equals to the given name
    const subs = await db.collection('subsections')
            .where('sectionName', '==', name)
            .get()
            .then(subs => subs.docs.map(sub => sub.id))
    
    // same goes for features
    const features = await db.collection('features')
        .where('sectionName', '==', name)
        .get()
        .then(features => features.docs.map(feature => feature.id));
    

    // delete the items from the db
    // aswell as related content items

    // instead of executing operations for every single item
    // batch them together and commit once

    const firestoreBatch = db.batch();

    firestoreBatch.delete(db.collection('sections').doc(id));
    firestoreBatch.delete(db.collection('content').doc(id));

    subs.forEach(sub => {
        firestoreBatch.delete(db.collection('subsections').doc(sub));
        firestoreBatch.delete(db.collection('content').doc(sub));
    });

    features.forEach(feature => {
        firestoreBatch.delete(db.collection('features').doc(feature));
        firestoreBatch.delete(db.collection('content').doc(feature));
    });

    await firestoreBatch.commit();

    dispatch(removeSection(id))

    return `The {{${name}}} section has been {{deleted}}.`
}



export const deleteSubsection = (names, ids) => async dispatch => {

    const [ secName, name ] = names
    const [ secID, id ] = ids

    // delete the reference to the subsection
    // from the parent section's children field
    await db.doc(`sections/${secID}`)
        .update({ children: arrayRemove(id) })

    // delete the subsection and all nested features

    // find ids of all features with 
    // feature.subsectionName === name && feature.sectionName === sectionName
    const features = await db.collection('features')
        .where('sectionName', '==', secName)
        .where('subsectionName', '==', name)
        .get()
        .then(features => features.docs.map(doc => doc.id))
    
    // batch all the deletion operations together before commiting
    const firestoreBatch = db.batch();

    firestoreBatch.delete(db.collection('subsections').doc(id));
    firestoreBatch.delete(db.collection('content').doc(id));

    features.forEach(feature => {
        firestoreBatch.delete(db.collection('features').doc(feature));
        firestoreBatch.delete(db.collection('content').doc(feature));
    });

    await firestoreBatch.commit();

    dispatch(removeSubsection(id))

    return `The {{${name}}} subsection has been deleted from {{${secName}}}/.`
}



export const deleteFeature = (names, ids) => async dispatch => {

    const [ secName, subsecName, name ] = names
    const [ sectionID, subsecID, id ] = ids

    // delete the reference to the feature
    // from the parent subsection's children field
    await db.doc(`subsections/${subsecID}`)
        .update({ children: arrayRemove(id) })

    // delete the feature
    await db.collection('features').doc(id).delete();
    await db.collection('content').doc(id).delete();

    dispatch(removeFeature(id));

    return `
        The {{${name}}} feature has been deleted 
        from {{${secName}}}/{{${subsecName}}}/.
    `
}