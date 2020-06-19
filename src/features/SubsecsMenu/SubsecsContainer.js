import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchSubsecs } from 'dataSlice';
import useSubsecs from './useSubsecs'

import SubsecsList from './SubsecsList'


const SubsecsContainer = ({ sectionName, delayAnimation }) => {
    const dispatch = useDispatch();

    // sorted arr of subsecs and a func to change their order onDrag
    const subsecs = useSubsecs(sectionName)

    // fetch subsections and features whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs) return;
        dispatch(fetchSubsecs(sectionName));
    }, [sectionName, subsecs, dispatch])

    return (
        <SubsecsList
            subsecs={subsecs}
            sectionName={sectionName}
            delayAnimation={delayAnimation} />
    )
}


export default SubsecsContainer;