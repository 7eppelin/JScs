
import { useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getSections } from 'dataSlice';

import { reorderSections } from 'dataSlice';
import { arrayMove } from 'utils';


const useSections = () => {
    const dispatch = useDispatch()

    // object of sections: { id: { ...sec }, id2: { ...sec2 }}
    const sections = useSelector(state => state.data.sections.byID)

    // sections ids in the order they should appear in the list
    const ids = useSelector(state => state.data.sections.ids)

    // fetch sections once
    useEffect(() => {
        dispatch(getSections())
    }, [dispatch])

    // reorder sections
    const setNewSectionOrder = useCallback((current, target) => {
        const newOrder = arrayMove(ids, current, target)
        dispatch(reorderSections(newOrder)) 
    }, [ids, dispatch])

    // sort sections according to the ids array
    const sortedSections = useMemo(() => {
        return ids.map(id => sections[id])
    }, [sections, ids])

    // return [ sections, reorderSections ]
    return [ sortedSections, setNewSectionOrder ]
}

export default useSections