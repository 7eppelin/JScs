import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { fetchSubsecs } from 'dataSlice';
import useSubsecs from './useSubsecs'

import AnimatedSubsecsList from './AnimatedSubsecsList'
import SubsecsList from './SubsecsList'


const SubsecsContainer = ({ sectionName, delayAnimation }) => {
    const dispatch = useDispatch()
    const scrollbar = useRef()

    const subsecs = useSubsecs(sectionName)

    // fetch subsections whenever the url changes
    useEffect(() => {
        if (!sectionName || subsecs) return
        dispatch(fetchSubsecs(sectionName))
    }, [sectionName, subsecs, dispatch])

    return (
        <div className='scrollbar'
            ref={scrollbar}>

            <AnimatedSubsecsList
                keyValue={sectionName}
                isShown={subsecs?.length > 0}
                delayAnimation={delayAnimation}>

                <SubsecsList
                    subsecs={subsecs}
                    scrollbar={scrollbar}
                    sectionName={sectionName} />

            </AnimatedSubsecsList>
        </div>
    )
}


export default SubsecsContainer;