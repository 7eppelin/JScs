
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getSections } from 'dataSlice';

import { reorderSections } from 'dataSlice';
import { arrayMove } from 'utils';


const useSections = () => {
    const dispatch = useDispatch()

    // fetch sections once
    useEffect(() => {
        dispatch(getSections())
    }, [dispatch])    

    const sections = useSelector(state => state.data.sections.byID)
    const ids = useSelector(state => state.data.sections.ids)

    const sortedSections = ids.map(id => sections[id])

    // reorder sections
    const reorder = useCallback((current, target) => {
        if (target === ids.length || target < 0) return

        const newOrder = arrayMove(ids, current, target)
        dispatch(reorderSections(newOrder)) 
    }, [ids, dispatch])

    return [ sortedSections, reorder ]
}

export default useSections