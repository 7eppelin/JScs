
import { db, arrayRemove } from 'firebase.js'
import { batch } from 'react-redux'
import { setStatus } from 'features/AddForm/addFormStatusSlice'
import { findSectionID, findSubsecID, findFeatureID } from 'utils'
import { removeSection, removeSubsection, removeFeature } from 'dataSlice'



export const deleteItem = name => async dispatch => {
    
    try {
        const [ secName, subsecName, featureName ] = name.split('/');

        if (featureName) {
            await dispatch(deleteFeature(featureName, subsecName, secName));
    
        } else if (subsecName) {
            await dispatch(deleteSubsection(subsecName, secName));

        } else {
            await dispatch(deleteSection(name));
        }

    } catch (e) {
        dispatch(setStatus({
            type: 'error',
            message: e.message
        }))
    }
}


export const deleteSection = name => async dispatch => {

    // check whether the target section exists
    const secID = await findSectionID(name);
    if (!secID) throw Error("There's no such section in the database")


    // delete the reference to the section from the 'ids'
    await db.doc('order/sections')
        .update({ ids: arrayRemove(secID) })


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

    firestoreBatch.delete(db.collection('sections').doc(secID));
    firestoreBatch.delete(db.collection('content').doc(secID));

    subs.forEach(sub => {
        firestoreBatch.delete(db.collection('subsections').doc(sub));
        firestoreBatch.delete(db.collection('content').doc(sub));
    });

    features.forEach(feature => {
        firestoreBatch.delete(db.collection('features').doc(feature));
        firestoreBatch.delete(db.collection('content').doc(feature));
    });

    await firestoreBatch.commit();


    batch(() => {
        dispatch(removeSection(secID))
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} section has been deleted`
        }))
    })
}


export const deleteSubsection = (name, sectionName) => async dispatch => {

    // check if a section with the given name exists or not
    // if not, display an error
    const secID = await findSectionID(sectionName);
    if (!secID) throw Error(`The ${sectionName} section does not exist`)

    // check whether the target subsection exists
    const subsecID = await findSubsecID(name, sectionName);
    if (!subsecID) throw Error(`The ${name} subsection does not exist in ${sectionName}`)


    // delete the reference to the subsection
    // from the parent section's children field
    await db.doc(`sections/${secID}`)
        .update({ children: arrayRemove(subsecID) })

    // delete the subsection and all nested features

    // find ids of all features with 
    // feature.subsectionName === name && feature.sectionName === sectionName
    const features = await db.collection('features')
        .where('sectionName', '==', sectionName)
        .where('subsectionName', '==', name)
        .get()
        .then(features => features.docs.map(doc => doc.id))
    
    // batch all the deletion operations together before commiting
    const firestoreBatch = db.batch();

    firestoreBatch.delete(db.collection('subsections').doc(subsecID));
    firestoreBatch.delete(db.collection('content').doc(subsecID));

    features.forEach(feature => {
        firestoreBatch.delete(db.collection('features').doc(feature));
        firestoreBatch.delete(db.collection('content').doc(feature));
    });

    await firestoreBatch.commit();

    batch(() => {
        dispatch(removeSubsection(subsecID))
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} subsection has been deleted from ${sectionName}`
        }))
    })

}


export const deleteFeature = (name, subsection, section) => async dispatch => {

    // verify that a section with the given name exists
    const secID = await findSectionID(section);
    if (!secID) throw Error(`The ${section} section does not exist`)

    // verify that a subsection with the given name exists
    const subsecID = await findSubsecID(subsection, section);
    if (!subsecID) {
        throw Error(`The ${subsection} subsection does not exist in ${section}`)
    }

    // check whether a feature with the given name exists
    const id = await findFeatureID(name, section, subsection);
    if (!id) throw Error(`The ${name} feature does not exist in ${section}/${subsection}`)


    // delete the reference to the feature
    // from the parent subsection's children field
    await db.doc(`subsections/${subsecID}`)
        .update({ children: arrayRemove(id) })

    // delete the feature
    await db.collection('features').doc(id).delete();
    await db.collection('content').doc(id).delete();

    batch(() => {
        dispatch(removeFeature(id));
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} feature has been deleted from ${section}/${subsection}`
        }))
    })
}