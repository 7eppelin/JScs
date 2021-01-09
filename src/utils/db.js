
import { 
    db, 
    arrayUnion, 
    arrayRemove 
} from 'firebase.js';


///////////////////////////////////////////////////////////////////////

////////                    Find IDs in DB                     ////////

///////////////////////////////////////////////////////////////////////



// sectionName => sectionID
export const findSectionIDinDB = async name => {
    const snapshot = await db
        .collection('sections')
        .where('name', '==', name)
        .get()

    const sec = snapshot.docs[0]
    return sec ? sec.id : null
}


// subsecName =>  subsecID
export const findSubsecIDinDB = async names => {
    const [ secName, name ] = names

    const snapshot = await db
        .collection('subsecs')
        .where('name', '==', name)
        // subsection names are unique only within the same section
        .where('sectionName', '==', secName)
        .get()

    const subsec = snapshot.docs[0]
    return subsec ? subsec.id : null
}


// featureName => featureID
export const findFeatureIDinDB = async names => {
    const [ secName, subsecName, name ] = names
    
    const snapshot = await
        db.collection('features')
            .where('name', '==', name)
            // feature names are unique only within the same subsection
            .where('subsecName', '==', subsecName)
            // subsection names are unique only within the same section
            .where('sectionName', '==', secName)
            .get();
    
    const feature = snapshot.docs[0];
    return feature ? feature.id : null;
}



// sectionName => arr of nested subsecs' ids
// subsecID => arr of nested features' ids
export const getIdsFromDB = async docName => {
    const doc = await db
        .doc(`order/${docName}`)
        .get()

    if (!doc.exists) return []
    return doc.data().ids
}


// arr of subsecs' ids => arr of all the nested features 'ids
export const getFeaturesIdsFromDB = subsecs => (
    // make an arr of promises out of the arr of subsecs
    Promise.all(subsecs.map(getIdsFromDB))
        // result is an array of arrays of ids
        // turn it into an array of ids
        .then(result => result.reduce(
            (prev, curr) => [...prev, ...curr], []
        ))
)





///////////////////////////////////////////////////////////////////////

////////                    Create item in DB                  ////////

///////////////////////////////////////////////////////////////////////



export const createSectionInDB = async name => {
    const newSec = { name }

    // create the new section and save it's id in newSec
    await db.collection('sections')
        .add(newSec)
        .then(sec => newSec.id = sec.id)
    
    return newSec
}


export const createSubsecInDB = async (names, sectionID) => {
    const [ sectionName, name ] = names
    
    const newSubsec = { name, sectionID, sectionName }

    // create the subsec and save it's ID in newSubsec
    await db.collection('subsecs')
        .add(newSubsec)
        .then(subsec => newSubsec.id = subsec.id)
    
    return newSubsec
}


export const createFeatureInDB = async (names, ids) => {
    const [ sectionName, subsecName, name ] = names
    const [ sectionID, subsecID ] = ids

    const newFeature = { 
        name, 
        sectionID, 
        sectionName, 
        subsecID, 
        subsecName
    }

    await db.collection('features')
        .add(newFeature)
        .then(feature => newFeature.id = feature.id)
    
    return newFeature
}


export const saveContentItem = item => {
    return db.collection('content')
        .doc(item.id)
        .set(item)
}




///////////////////////////////////////////////////////////////////////

////////                    Manipulate Refs                    ////////

///////////////////////////////////////////////////////////////////////



export const createItemRefInDB = (docName, id) => {
    return db.doc(`order/${docName}`)
        .update({ ids: arrayUnion(id) })
}

export const deleteItemRefFromDB = (docName, id) => {
    return db.doc(`order/${docName}`)
        .update({ ids: arrayRemove(id) })
}

export const createRefsDoc = docName => {
    return db.doc(`order/${docName}`)
        .set({ ids: [] })
}

export const deleteRefsDoc = docName => {
    return db.doc(`order/${docName}`).delete()
}




///////////////////////////////////////////////////////////////////////

////////              Save new items order in DB               ////////

///////////////////////////////////////////////////////////////////////


export const updateItemsOrderInDB = (docName, ids) => {
    return db.doc(`order/${docName}`)
        .update({ ids })
}