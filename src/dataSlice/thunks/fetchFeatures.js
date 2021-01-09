
import { db } from 'firebase.js'
import { receiveFeatures } from 'dataSlice'
import { getIdsFromDB } from 'utils'


export const fetchFeatures = subsecID => async dispatch => {

    // get all the features that belong to the given subsection
    const items = await db.collection('features')
        .where('subsecID', '==', subsecID)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))

    // get the ids array that is responsible for the order
    const ids = await getIdsFromDB(subsecID)

    // sort the features according to the ids
    const features = ids.map(id => (
        items.find(item => item.id === id)
    ))
    
    dispatch(receiveFeatures({ features, subsecID }))
} 