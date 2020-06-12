
import { useRef, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectSubsecs, selectIDs } from './selectors'
import { reorderSubsecs } from 'dataSlice';
import { arrayMove } from 'utils'


const useSubsections = secName => {
    const dispatch = useDispatch()

    // array of sorted subsections
    const subsecs = useSelector(state => selectSubsecs(state, secName))
    // array of subsecs' ids
    const ids = useSelector(state => selectIDs(state, secName))

    // now, if we were simply returning the selector's result,
    // when the user transitions from the content section to the frontpage
    // newSubsecs would be null, and subsecs 
    // would disappear from the ui during the animation
    const subsecsRef = useRef(null)
    if (secName) {
        if (subsecs && ids) {
            subsecsRef.current = ids.map(id => subsecs[id])
        } else {
            subsecsRef.current = null
        }
    }

    // reorder subsections when dragging
    const reorder = useCallback((current, target) => {
        const newOrder = arrayMove(ids, current, target);
        const sectionID = subsecs.current[0].sectionID;
        dispatch(reorderSubsecs({ sectionID, newOrder }));
    }, [ids, dispatch])    

    return [ subsecsRef.current, reorder ]
}

export default useSubsections