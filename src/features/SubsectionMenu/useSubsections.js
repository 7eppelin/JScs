
import { useRef, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectAndSortSubsecs, selectIDs } from './selectors'
import { reorderSubsections } from 'dataSlice';
import { arrayMove } from 'utils'


const useSubsections = secName => {
    const dispatch = useDispatch()

    // array of sorted subsections
    const newSubsecs = useSelector(state => selectAndSortSubsecs(state, secName))
    // array of subsecs' ids
    const ids = useSelector(state => selectIDs(state, secName))

    // now, if we were simply returning the selector's result,
    // when the user transitions from the content section to the frontpage
    // newSubsecs would be null, and subsecs 
    // would disappear from the ui during the animation
    const subsecs = useRef([])
    if (secName) subsecs.current = newSubsecs

    // reorder subsections when dragging
    const reorderSubsecs = useCallback((current, target) => {
        const newOrder = arrayMove(ids, current, target);
        const sectionID = subsecs.current[0].sectionID;
        dispatch(reorderSubsections({ sectionID, newOrder }));
    }, [ids, dispatch])    

    return [ subsecs.current, reorderSubsecs ]
}

export default useSubsections