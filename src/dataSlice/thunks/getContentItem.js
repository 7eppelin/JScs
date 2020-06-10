
import { db } from 'firebase.js'

import { 
    findSectionIDinDB, 
    findSubsecIDinDB, 
    findFeatureIDinDB 
} from 'utils'

import { addContentItem } from 'dataSlice'


export const getContentItem = url => async dispatch => {
    // cut the opening slash off off the url;
    url = url.slice(1);

    // find the id of the target item
    const names = url.split('/');
    const [ secName, subsecName, featureName ] = names


    const id = (
        featureName ? await findFeatureIDinDB(names) :
        subsecName ? await findSubsecIDinDB(names) :
                    await findSectionIDinDB(secName)
    )

    if (!id) return

    // retrieve the corresponding content item
    const content = await db.collection('content')
        .doc(id)
        .get()
        .then(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

    dispatch(addContentItem(content))
}