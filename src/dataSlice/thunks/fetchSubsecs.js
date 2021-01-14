
import { db } from 'firebase.js'
import { receiveSubsecs } from 'dataSlice'
import { getIdsFromDB } from 'utils'



export const fetchSubsecs = sectionName => async dispatch => {

    // get all the subsections that belong to the given section
    const items = await db.collection('subsecs')
        .where('sectionName', '==', sectionName)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))

    // get the ids array that is responsible for the order
    const ids = await getIdsFromDB(sectionName)

    // sort the subsecs according to the ids array
    const subsecs = ids.map(id => (
        items.find(item => item.id === id)
    ))

    dispatch(receiveSubsecs({ sectionName, subsecs }))
}