
import { db } from 'firebase.js'
import { batch } from 'react-redux'
import { addSections, reorderSections } from 'dataSlice'


export const getSections = () => async dispatch => {

    // get the sections
    const secs = await db.collection('sections').get()

    const sections = secs.docs.map(sec => ({
        id: sec.id,
        ...sec.data()
    }))

    // get the ids array responsible for the order
    // in which sections will be rendered in the list
    const ids = await db.doc('order/sections')
        .get()
        .then(doc => {
            if (!doc.exists) return [];
            return doc.data().ids;
        })


    batch(() => {
        dispatch(addSections(sections))
        dispatch(reorderSections(ids))
    })
}