import { db } from '../firebase';


export const findSectionID = async name => {
    const snapshot = await
        db.collection('sections')
            .where('name', '==', name)
            .get();
    const sec = snapshot.docs[0];
    return sec ? sec.id : null;
}


export const findSubsecID = async (name, secName) => {
    const snapshot = await
        db.collection('subsections')
            .where('name', '==', name)
            // subsection names are unique only within the same section
            .where('sectionName', '==', secName)
            .get();

    const subsec = snapshot.docs[0];
    return subsec ? subsec.id : null;
}


export const findFeatureID = async (name, secName, subsecName) => {
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


export const saveContentItem = async item => {
    return await db.collection('content')
        .doc(item.id).set(item);
}


export const updateSectionsOrderInDB = ids => {
    db.doc('order/sections')
        .update({ ids })
}

export const updateSubsectionsOrderInDB = (sectionID, newOrder) => {
    db.doc(`sections/${sectionID}`)
        .update({ children: newOrder })
}

export const updateFeaturesOrderInDB = (subsecID, newOrder) => {
    db.doc(`subsections/${subsecID}`)
        .update({ children: newOrder })
}