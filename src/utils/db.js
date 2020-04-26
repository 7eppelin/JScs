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
            .where('sectionName', '==', secName)
            .get();

    const subsec = snapshot.docs[0];
    return subsec ? subsec.id : null;
}


export const findFeatureID = async (name, secName, subsecName) => {
    const snapshot = await
        db.collection('features')
            .where('name', '==', name)
            .where('sectionName', '==', secName)
            .where('subsectionName', '==', subsecName)
            .get();
    
    const feature = snapshot.docs[0];
    return feature ? feature.id : null;
}


export const createContentItem = async (id, name, url) => {
    // initial content's data in the slate.js' format
    const data = [{
            type: 'title',
            children: [{ text: name }]
        }, {
            type: 'links',
            links: [],
            children: [{ text: '' }]
        }, {
            type: 'paragraph',
            children: [{ text: 'Description is missing... '}]
        }, {
            type: 'paragraph',
            children: [{ text: 'This page is editable. Try it out!' }]
        }
    ]

    const item = {
        id,
        name,
        url,
        edited: Date.now(),
        data
    }

    await db.collection('content').doc(id).set(item);
    return item;
}


export const deleteContentItem = async id => {
    db.collection('content').doc(id).delete();
}