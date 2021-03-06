import React, { useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateItemsOrderInDB, arrayMove } from 'utils'
import { reorderSubsecs } from 'dataSlice'

import Subsec from './Subsec'


const SubsecsList = ({ 
    subsecs, 
    scrollbar,
    sectionName,
}) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.user?.isAdmin)

    // feature menus' heights change as the user toggles open/close
    // we collect all menu's current heights in an array
    // this way each FeatureMenu will know the height of the prev/next item
    // so it can know when to swap positions when dragging
    const heights = useRef([])

    // reorder subsections when dragging
    const reorder = useCallback((current, target) => {
        const newOrder = arrayMove(subsecs, current, target)
        dispatch(reorderSubsecs({ sectionName, newOrder}))
    }, [subsecs, sectionName, dispatch])    

    // save the new subsecs' order onDragEnd
    const saveNewOrder = useCallback(() => {
        if (!isAdmin) return
        const ids = subsecs.map(sub => sub.id)
        updateItemsOrderInDB(sectionName, ids)
    }, [isAdmin, sectionName, subsecs])


    return (subsecs.map((subsec, i) => (
        <Subsec i={i}
            heights={heights}
            key={subsec.id} 
            subsec={subsec}
            reorder={reorder}
            scrollbar={scrollbar}
            saveNewOrder={saveNewOrder} />
    )))
}


export default SubsecsList