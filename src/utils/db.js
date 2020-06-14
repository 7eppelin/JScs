import { db, arrayUnion } from '../firebase';


export const findSectionIDinDB = async name => {
    const snapshot = await
        db.collection('sections')
            .where('name', '==', name)
            .get();
    const sec = snapshot.docs[0];
    return sec ? sec.id : null;
}


export const findSubsecIDinDB = async names => {
    const [ secName, name ] = names

    const snapshot = await
        db.collection('subsections')
            .where('name', '==', name)
            // subsection names are unique only within the same section
            .where('sectionName', '==', secName)
            .get();

    const subsec = snapshot.docs[0];
    return subsec ? subsec.id : null;
}


export const findFeatureIDinDB = async names => {
    const [ secName, subsecName, name ] = names
    
    const snapshot = await
        db.collection('features')
            .where('name', '==', name)
            // feature names are unique only within the same subsection
            .where('subsectionName', '==', subsecName)
            // subsection names are unique only within the same section
            .where('sectionName', '==', secName)
            .get();
    
    const feature = snapshot.docs[0];
    return feature ? feature.id : null;
}



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



export const createSectionInDB = async name => {
    const newSec = { name, children: [] }

    await db.collection('sections')
        .add(newSec)
        .then(sec => newSec.id = sec.id)

    await db.doc('order/sections')
        .update({ ids: arrayUnion(newSec.id) })

    await db.collection('order')
        .doc(newSec.id)
        .set({ ids: [] })
    
    return newSec
}


export const createSubsecInDB = async () => {

}


export const createFeatureInDB = async () => {

}



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



export const saveContentItem = async item => {
    return await db.collection('content')
        .doc(item.id).set(item);
}



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



export const updateSectionsOrderInDB = ids => {
    db.doc('order/sections')
        .update({ ids })
}

export const updateSubsecsOrderInDB = (sectionID, newOrder) => {
    db.doc(`sections/${sectionID}`)
        .update({ children: newOrder })
}

export const updateFeaturesOrderInDB = (subsecID, newOrder) => {
    db.doc(`subsections/${subsecID}`)
        .update({ children: newOrder })
}