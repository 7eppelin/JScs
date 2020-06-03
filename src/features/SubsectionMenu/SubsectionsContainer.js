import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { getSubsections } from 'dataSlice';
import { updateSubsectionsOrderInDB } from 'utils'
import useSubsections from './useSubsections'

import Subsections from './Subsections'


const SubsectionsContainer = ({ sectionName, isAdmin, delayAnimation }) => {
    const dispatch = useDispatch();

    // sorted arr of subsecs and a func to change their order onDrag
    const [ subsecs, reorderSubsecs ] = useSubsections(sectionName)

    // fetch subsections and features whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs) return;
        dispatch(getSubsections(sectionName));
    }, [sectionName, subsecs, dispatch])

    // save the new subsecs' order onDragEnd
    const saveNewOrder = useCallback(() => {
        if (!isAdmin) return
        const secID = subsecs[0].sectionID
        const ids = subsecs.map(sub => sub.id)
        updateSubsectionsOrderInDB(secID, ids)
    }, [isAdmin, subsecs])

    return (
        <Subsections
            subsecs={subsecs}
            reorderSubsecs={reorderSubsecs}
            saveNewOrder={saveNewOrder}
            delayAnimation={delayAnimation} />
    )
}


export default SubsectionsContainer;