
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getSections } from 'dataSlice';
import { selectAndSortSections } from './selectors'

import { reorderSections } from 'dataSlice';
import { arrayMove } from 'utils';


const useSections = () => {
    const dispatch = useDispatch()

    // fetch sections once
    useEffect(() => {
        dispatch(getSections())
    }, [dispatch])    

    // arr of sections
    const sections = useSelector(state => selectAndSortSections(state))

    // reorder sections
    const setNewSectionOrder = useCallback((current, target) => {
        const ids = sections.map(sec => sec.id)
        if (target >= ids.length) return
        const newOrder = arrayMove(ids, current, target)
        dispatch(reorderSections(newOrder)) 
    }, [sections, dispatch])

    return [ sections, setNewSectionOrder ]
}

export default useSections