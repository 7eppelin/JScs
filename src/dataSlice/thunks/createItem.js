
import { db, arrayUnion } from 'firebase.js'
import { batch } from 'react-redux';
import { setStatus } from 'features/AddForm/addFormStatusSlice';
import { findSectionID, findSubsecID, findFeatureID, createContentItem } from 'utils'
import { addSections, addNewSubsection, addNewFeature } from 'dataSlice'


export const createItem = name => async dispatch => {

    try {   
        // the name arg is AddForm's input value
        // the format is sectionName/subsectionName/featureName
        const [secName, subsecName, featureName] = name.split('/');

        // define what kind of item we are creating
        // and dispatch a corresponding thunk
        if (featureName) {
            await dispatch(createFeature(featureName, subsecName, secName));

        } else if (subsecName) {
            await dispatch(createSubsection(subsecName, secName))

        } else {
            await dispatch(createSection(secName))
        }

    } catch(e) {
        dispatch(setStatus({
            type: 'error',
            message: e.message
        }))
    }
}



const createSection = name => async dispatch => {

    // if a section with the given name already exists, throw
    if (await findSectionID(name)) {
        throw Error('A section with the given name already exists')
    }

    //  create the section
    const newSec = { 
        name, 
        children: [] 
    };

    const sec = await db.collection('sections').add(newSec);
    newSec.id = sec.id;


    // create a reference to the section in the ids array
    // responsible for the order in which items appear in the nav
    await db.doc('order/sections')
        .update({ ids: arrayUnion(sec.id) })


    // create a corresponding content item
    const url = `/${name}`;
    await createContentItem(newSec.id, name, url);

    batch(() => {
        dispatch(addSections([ newSec ]))
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} section has been created`
        }))
    })
}



const createSubsection = (name, sectionName) => async dispatch => {

    // find the target section's id
    // if it doesnt exist, throw
    const sectionID = await findSectionID(sectionName);
    if (!sectionID) throw Error(`The ${sectionName} section does not exist`);

    // check whether a subsection with the given name already exists
    if (await findSubsecID(name, sectionName)) {
        throw Error('A subsection with the given name already exists')
    }

    // create the subsection
    const subsec = { 
        name, 
        sectionID, 
        sectionName, 
        children: [] 
    }

    const newSubsec = await db.collection('subsections').add(subsec);
    subsec.id = newSubsec.id;

    // create a reference to the subsection
    // in the parent section's children array
    await db.doc(`sections/${sectionID}`).update({
        children: arrayUnion(subsec.id)
    })

    // create a corresponding content item
    const url = `/${sectionName}/${name}`
    await createContentItem(subsec.id, name, url);

    batch(() => {
        dispatch(addNewSubsection(subsec));
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} subsections has been created in ${sectionName}`
        }))
    })
}



const createFeature = (name, subsecName, secName) => async dispatch => {

    // find the target section' id
    // if it doesnt exist, throw
    const secID = await findSectionID(secName)
    if (!secID) {
        throw Error(`The ${secName} section does not exist`);
    }

    // find the target subsection's id
    const subsecID = await findSubsecID(subsecName, secName);
    if (!subsecID) {
        throw Error(`The ${subsecName} subsection does not exist`)
    }

    // check whether a feature with the given name already exists
    const featureID = await findFeatureID(name, secName, subsecName);
    if (featureID) {
        throw Error(`A feature with the given name already exists`)
    }

    // create the feature;
    const feature = { 
        name, 
        sectionID: secID, 
        sectionName: secName, 
        subsectionID: subsecID, 
        subsectionName: subsecName,
    }

    const newFeature = await db.collection('features').add(feature);
    feature.id = newFeature.id;

    // create a reference to the feature
    // in the parent subsection's children array
    await db.doc(`subsections/${subsecID}`).update({
        children: arrayUnion(feature.id)
    })

    // create a corresponding content item
    const url = `/${secName}/${subsecName}/${name}`
    await createContentItem(feature.id, name, url);

    batch(() => {
        dispatch(addNewFeature(feature));
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} feature has been created in ${secName}/${subsecName}`
        }))
    })
}