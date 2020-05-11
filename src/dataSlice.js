
import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { setStatus } from 'features/AddForm/addFormStatusSlice';

import { 
    db, 
    arrayRemove, 
    arrayUnion 
} from 'firebase.js';

import { 
    findSectionID, 
    findSubsecID, 
    findFeatureID,
    createContentItem,
} from 'utils/db.js';


const itemsSlice = createSlice({

    name: 'data',

    initialState: {
        sections: { byID: {}, ids: [] },
        subsections: {},
        features: {}, 
        content: {}
    },

    reducers: {
        // redux-toolkit's createSlice() uses
        // immerjs internally https://github.com/immerjs/immer
        // which allows us to 'mutate' the state

        // add* are dispatched when retrieving items from the db
        addSections: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.sections.byID[item.id] = item;
                state.sections.ids.push(item.id)
            })
        },

        addSubsections: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.subsections[item.id] = item
            })
        },

        addFeatures: (state, action) => {
            const items = action.payload;

            items.forEach(item => {
                state.features[item.id] = item
            })
        },


        // addNew* are dispatch when creating a new item
        // addSection is used in both retrieving
        // and creating scenatios for sections
        addNewSubsection: (state, action) => {
            const item = action.payload

            state.subsections[item.id] = item

            // add a reference to the subsec
            // to the parent section's children field
            const sec = state.sections.byID[item.sectionID]
            sec.children.push(item.id)
        },

        addNewFeature: (state, action) => {
            const item = action.payload

            state.features[item.id] = item

            // add a reference to the feature
            // to the parent subsection's children field
            const sub = state.subsections[item.subsectionID]
            sub.children.push(item.id)
        },


        removeSection: (state, action) => {
            const itemID = action.payload;

            // not only delete the section
            // but all the nested items aswell
            const secs = state.sections.byID;
            const subs = secs[itemID].children;
            let features = [];

            for (let id of subs) {
                features = [ 
                    ...features, 
                    ...state.subsections[id].children 
                ]
                delete state.subsections[id]
            }

            features.forEach(id => delete state.features[id])

            delete secs[itemID];
            state.sections.ids = state.sections.ids.filter(id => id !== itemID)
        },

        removeSubsection: (state, action) => {
            const itemID = action.payload;

            // not only delete the subsection
            // but all the nested items aswell
            const sub = state.subsections[itemID];

            sub.children.forEach(id => delete state.features[id])

            // del the reference to the subsec
            // from the parent section's children field
            const sec = state.sections.byID[sub.sectionID]
            sec.children = sec.children.filter(id => id !== itemID)

            // del the subsection
            delete state.subsections[itemID]
        },

        removeFeature: (state, action) => {
            const itemID = action.payload;

            // delete the reference to the feature
            // from the parent subsection's children field
            const f = state.features[itemID]
            const sub = state.subsections[f.subsectionID]
            sub.children = sub.children.filter(id => id !== itemID)

            // del the subsection
            delete state.features[itemID]
        },


        reorderSections: (state, action) => {
            // action.payload is an array of ids in a new order;
            state.sections.ids = action.payload;
        },

        reorderSubsections: (state, action) => {
            const { sectionID, newOrder } = action.payload
            state.sections.byID[sectionID].children = newOrder
        },

        reorderFeatures: (state, action) => {
            const { subsectionID, newOrder } = action.payload
            state.subsections[subsectionID].children = newOrder
        },


        addContentItem: (state, action) => {
            state.content[action.payload.id] = action.payload;
        },
    }
});


const { reducer, actions } = itemsSlice;

export const { 
    addSections,
    addSubsections,
    addFeatures, 
    addNewSubsection,
    addNewFeature,
    removeSection,
    removeSubsection,
    removeFeature,
    reorderSections,
    reorderSubsections,
    reorderFeatures,
    addContentItem 
} = actions;

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




// retrieve

export const getSections = () => async dispatch => {

    // get the sections
    const secs = await db.collection('sections').get()

    const sections = secs.docs.map(sec => ({
        id: sec.id,
        ...sec.data()
    }))

    // get the ids array responsible for the order
    // in which sections will be rendered in the list
    const ids = await db.doc('order/sections')
        .get()
        .then(doc => {
            if (!doc.exists) return [];
            return doc.data().ids;
        })


    batch(() => {
        dispatch(addSections(sections))
        dispatch(reorderSections(ids))
    })
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
        dispatch(addSubsections(subs))
        dispatch(addFeatures(features))
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
    } else if (secName) {
        id = await findSectionID(secName);
    } else {
        // id = await findSectionID('JavaScript')
    }

    if (!id) return;

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