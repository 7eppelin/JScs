
import { db } from 'firebase.js'
import { recieveSubsecs } from 'dataSlice'
import { retrieveSubsecsFromDB, getIdsFromDB } from 'utils'



export const fetchSubsecs = secName => async dispatch => {

    // get all subsections with sub.sectionName == secName;
    const subsecs = await retrieveSubsecsFromDB(secName)

    // get the ids array
    const ids = await getIdsFromDB(secName)

    if (!subsecs) return

    // sort the subsecs according to the ids array
    const subs = ids.map(id => (
        subsecs.find(sub => sub.id === id)
    ))

    dispatch(recieveSubsecs(subs))
}