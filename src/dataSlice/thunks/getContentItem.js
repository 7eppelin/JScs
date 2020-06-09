
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
    const [ secName, subsecName, featureName ] = url.split('/');

    let id;
    if (featureName) {
        id = await findFeatureIDinDB(featureName, secName, subsecName);
    } else if (subsecName) {
        id = await findSubsecIDinDB(subsecName, secName);
    } else if (secName) {
        id = await findSectionIDinDB(secName);
    } else {
        // id = await findSectionID('JavaScript')
    }

    if (!id) return;

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