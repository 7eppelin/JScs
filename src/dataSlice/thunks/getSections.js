
import { db } from 'firebase.js'
import { batch } from 'react-redux'
import { recieveSections, reorderSections } from 'dataSlice'


export const getSections = () => async dispatch => {

    // get the sections
    const snapshot = await db.collection('sections').get()

    const sections = {}
    snapshot.docs.forEach(doc => {
        sections[doc.id] = {
            id: doc.id,
            ...doc.data()
        }
    })

    // get the ids array responsible for the order
    const ids = await db.doc('order/sections')
        .get()
        .then(doc => {
            if (!doc.exists) return [];
            return doc.data().ids;
        })

    batch(() => {
        dispatch(recieveSections(sections))
        dispatch(reorderSections(ids))
    })
}