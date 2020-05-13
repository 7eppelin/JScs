
import { db } from 'firebase.js'
import { addContentItem } from 'dataSlice'

export const updateContentItem = newItem => async dispatch => {
    dispatch(addContentItem(newItem));

    db.collection('content')
        .doc(newItem.id)
        .update(newItem);     
}