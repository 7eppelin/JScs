
import { db } from 'firebase.js'
import { receiveFeatures } from 'dataSlice'
import { getIdsFromDB } from 'utils'


export const fetchFeatures = subsecID => async dispatch => {
    const items = await db
        .collection('features')
        .where('subsecID', '==', subsecID)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))

    const ids = await getIdsFromDB(subsecID)

    const features = ids.map(id => (
        items.find(item => item.id === id)
    ))
    
    dispatch(receiveFeatures({ features, subsecID }))
} 