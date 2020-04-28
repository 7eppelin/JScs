
import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { setStatus } from 'features/AddForm/addFormStatusSlice';
import { db } from 'firebase.js';
import { 
    findSectionID, 
    findSubsecID, 
    findFeatureID,
    createContentItem,
} from 'utils/db.js';


const itemsSlice = createSlice({

    name: 'data',

    initialState: {
        sections: {
            byID: {},
            ids: []
        },
        subsections: {
            byID: {},
            ids: []
        },
        features: {
            byID: {},
            ids: []
        }, 
        content: {}
    },

    reducers: {
        // redux-toolkit's createSlice() uses
        // immerjs internally https://github.com/immerjs/immer
        // which allows us to 'mutate' the state

        addItems: (state, action) => {
            const { collection, items } = action.payload;
            items.forEach(item => {
                state[collection].byID[item.id] = item;
                state[collection].ids.push(item.id)
            });
        },

        removeItems: (state, action) => {
            const { collection, items } = action.payload;
            items.forEach(item => {
                delete state[collection].byID[item];
                state[collection].ids = state[collection].ids.filter(id => id !== item);
            })
        },

        addContentItem: (state, action) => {
            state.content[action.payload.id] = action.payload;
        },

        removeContentItem: (state, action) => {
            delete state.content[action.payload];
        }
    }
});


const { reducer, actions } = itemsSlice;

export const { addItems, removeItems, addContentItem } = actions;

export default reducer;





// thunks

// The general rules for the data:
// a section may contain subsections, which in turn may contain features
// a section can not contain 2 subsections with the same names
// However, subsections with the same names may co-exist within different sections
// Same applies to the subsections => features relationships


// create

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
    const newSec = { name };
    const sec = await db.collection('sections').add(newSec);
    newSec.id = sec.id;

    // create a corresponding content item
    const url = `/${name}`;
    await createContentItem(newSec.id, name, url);

    batch(() => {
        dispatch(addItems({
            collection: 'sections',
            items: [ newSec ]
        }))
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
    const subsec = { name, sectionID, sectionName }
    const newSubsec = await db.collection('subsections').add(subsec);
    subsec.id = newSubsec.id;

    // create a corresponding content item
    const url = `/${sectionName}/${name}`
    await createContentItem(subsec.id, name, url);

    batch(() => {
        dispatch(addItems({ 
            collection: 'subsections',
            items: [ subsec ]
        }));
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
        subsectionName: subsecName 
    }

    const newFeature = await db.collection('features').add(feature);
    feature.id = newFeature.id;

    // create a corresponding content item
    const url = `/${secName}/${subsecName}/${name}`
    await createContentItem(feature.id, name, url);

    batch(() => {
        dispatch(addItems({
            collection: 'features',
            items: [feature]
        }));
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} feature has been created in ${secName}/${subsecName}`
        }))
    })
}





// delete

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
        dispatch(removeItems({
            collection: 'features',
            items: features
        }));
        dispatch(removeItems({
            collection: 'subsections',
            items: subs
        }))
        dispatch(removeItems({
            collection: 'sections',
            items: [secID]
        }));
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
        dispatch(removeItems({
            collection: 'features',
            items: features
        }));
        dispatch(removeItems({
            collection: 'subsections',
            items: [subsecID]
        }));
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

    // delete the feature
    await db.collection('features').doc(id).delete();
    await db.collection('content').doc(id).delete();

    batch(() => {
        dispatch(removeItems({
            collection: 'features',
            items: [id]
        }));
        dispatch(setStatus({
            type: 'success',
            message: `The ${name} feature has been deleted from ${section}/${subsection}`
        }))
    })
}




// retrieve

export const getSections = () => async dispatch => {
    const sectionsSnapshot = await db.collection('sections').get()

    const sections = sectionsSnapshot.docs.map(sec => ({
        id: sec.id,
        ...sec.data()
    }))

    dispatch(addItems({
        collection: 'sections',
        items: sections
    }))
}



export const getSubsections = secName => async dispatch => {

    // get all subsections with sub.sectionName == secName;
    const subs = await db.collection('subsections')
        .where('sectionName', '==', secName)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            })
        ))

    if (!subs.length) return;
    
    // get all the features with 
    // feature.sectionName == secName
    const features = await db.collection('features')
        .where('sectionName', '==', secName)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))

    batch(() => {
        dispatch(addItems({
            collection: 'features',
            items: features
        }));
        dispatch(addItems({
            collection: 'subsections',
            items: subs
        }))
    })
}



export const getContentItem = url => async dispatch => {
    // cut the opening slash off off the url;
    url = url.slice(1);

    // find the id of the target item
    const [ secName, subsecName, featureName ] = url.split('/');

    let id;
    if (featureName) {
        id = await findFeatureID(featureName, secName, subsecName);
    } else if (subsecName) {
        id = await findSubsecID(subsecName, secName);
    } else {
        id = await findSectionID(secName || 'JavaScript');
    }

    // retrieve the corresponding content item
    const content = await db.collection('content')
        .doc(id)
        .get()
        .then(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

    dispatch(addContentItem(content))
}


export const updateContentItem = newItem => async dispatch => {
    dispatch(addContentItem(newItem));

    db.collection('content')
        .doc(newItem.id)
        .update(newItem);     
}