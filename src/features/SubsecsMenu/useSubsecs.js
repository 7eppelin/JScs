
import { useRef, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { reorderSubsecs } from 'dataSlice';
import { arrayMove } from 'utils'


const useSubsecs = sectionName => {
    const dispatch = useDispatch()

    const subsecs = useSelector(state => state.data.subsecs[sectionName])

    // now, if we were simply returning the selector's result,
    // when the user transitions from the content section to the frontpage
    // newSubsecs would be null, and subsecs 
    // would disappear from the ui during the animation
    const subsecsRef = useRef(null)
    if (sectionName) subsecsRef.current = subsecs

    // reorder subsections when dragging
    const reorder = useCallback((current, target) => {
        const newOrder = arrayMove(subsecs, current, target)
        dispatch(reorderSubsecs({ sectionName, newOrder}))
    }, [subsecs, dispatch])

    return [ subsecsRef.current, reorder ]
}

export default useSubsecs