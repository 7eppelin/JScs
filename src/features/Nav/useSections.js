
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

    const sections = useSelector(state => state.data.sections)

    // reorder sections
    const reorder = useCallback((current, target) => {
        if (target === sections.length || target < 0) return

        const newOrder = arrayMove(sections, current, target)
        dispatch(reorderSections(newOrder)) 
    }, [sections, dispatch])       
 
    return [ 
        sections.length ? sections : null, 
        reorder 
    ]
}

export default useSections