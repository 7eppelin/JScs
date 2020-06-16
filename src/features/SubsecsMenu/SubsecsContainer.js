import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { fetchSubsecs } from 'dataSlice';
import { updateItemsOrderInDB } from 'utils'
import useSubsecs from './useSubsecs'

import Subsections from './Subsections'


const SubsecsContainer = ({ sectionName, isAdmin, delayAnimation }) => {
    const dispatch = useDispatch();

    // sorted arr of subsecs and a func to change their order onDrag
    const [ subsecs, reorderSubsecs ] = useSubsecs(sectionName)

    // fetch subsections and features whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs) return;
        dispatch(fetchSubsecs(sectionName));
    }, [sectionName, subsecs, dispatch])

    // save the new subsecs' order onDragEnd
    const saveNewOrder = useCallback(() => {
        if (!isAdmin) return
        const ids = subsecs.map(sub => sub.id)
        updateItemsOrderInDB(sectionName, ids)
    }, [isAdmin, subsecs])

    return (
        <Subsections
            subsecs={subsecs}
            reorderSubsecs={reorderSubsecs}
            saveNewOrder={saveNewOrder}
            delayAnimation={delayAnimation} />
    )
}


export default SubsecsContainer;