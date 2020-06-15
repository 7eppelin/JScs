
import { db } from 'firebase.js'
import { recieveSections } from 'dataSlice'


export const fetchSections = () => async dispatch => {

    // get the sections
    const snapshot = await db.collection('sections').get()

    // arr of sections
    const secs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    // arr of sections' ids responsible for the order
    const ids = await db.doc('order/sections')
        .get()
        .then(doc => {
            if (!doc.exists) return [];
            return doc.data().ids;
        })

    const sections = ids.map(id => (
        secs.find(sec => sec.id === id)
    ))

    dispatch(recieveSections(sections))
}