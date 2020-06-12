
import { db } from 'firebase.js'
import { batch } from 'react-redux'
import { recieveSubsecs, recieveFeatures } from 'dataSlice'



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
        dispatch(recieveSubsecs(subs))
        dispatch(recieveFeatures(features))
    })
}