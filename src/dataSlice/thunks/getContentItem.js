
import { db } from 'firebase.js'
import { findSectionID, findSubsecID, findFeatureID } from 'utils'
import { addContentItem } from 'dataSlice'


export const getContentItem = url => async dispatch => {
    // cut the opening slash off off the url;
    url = url.slice(1);

    // find the id of the target item
    const [ secName, subsecName, featureName ] = url.split('/');

    let id;
    if (featureName) {
        id = await findFeatureID(featureName, secName, subsecName);
    } else if (subsecName) {
        id = await findSubsecID(subsecName, secName);
    } else if (secName) {
        id = await findSectionID(secName);
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