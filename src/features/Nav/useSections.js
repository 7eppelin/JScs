
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections } from 'dataSlice';

import { reorderSections } from 'dataSlice';
import { arrayMove } from 'utils';


const useSections = () => {
    const dispatch = useDispatch()

    // fetch sections once
    useEffect(() => {
        dispatch(fetchSections())
    }, [dispatch])        

    const sections = useSelector(state => state.data.sections)

    // reorder sections
    const reorder = useCallback((current, target) => {
        if (target === sections.length || target < 0) return

        const newOrder = arrayMove(sections, current, target)
        dispatch(reorderSections(newOrder)) 
    }, [sections, dispatch])       
 
    return [ sections, reorder ]
}

export default useSections