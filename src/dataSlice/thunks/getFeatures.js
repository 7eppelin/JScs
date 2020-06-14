
import { db } from 'firebase.js'
import { recieveFeatures } from 'dataSlice'


export const getFeatures = subsecID => async dispatch => {
    const features = await db
        .collection('features')
        .where('subsecID', '==', subsecID)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))
    
    dispatch(recieveFeatures(features))
} 