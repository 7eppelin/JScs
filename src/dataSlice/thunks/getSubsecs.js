
import { db } from 'firebase.js'
import { recieveSubsecs } from 'dataSlice'



export const getSubsecs = secName => async dispatch => {

    // get all subsections with sub.sectionName == secName;
    const subsecs = await db.collection('subsections')
        .where('sectionName', '==', secName)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            })
        ))

    if (!subsecs.length) return;

    dispatch(recieveSubsecs(subsecs))
}