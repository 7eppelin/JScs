
import { db } from 'firebase.js'
import { receiveSections } from 'dataSlice'
import { getIdsFromDB } from 'utils'


export const fetchSections = () => async dispatch => {

    // get the sections
    const snapshot = await db.collection('sections').get()

    // an arr of sections in arbitrary order
    const secs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    // an arr of sections' ids responsible for the order
    const ids = await getIdsFromDB('sections')

    // sort the sections according to the ids
    const sections = ids.map(id => (
        secs.find(sec => sec.id === id)
    ))

    dispatch(receiveSections(sections))
}