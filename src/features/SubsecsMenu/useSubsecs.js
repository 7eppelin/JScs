
import { useRef } from 'react'

import { useSelector } from 'react-redux';


const useSubsecs = sectionName => {
    const subsecs = useSelector(state => state.data.subsecs[sectionName])

    // now, if we were simply returning the selector's result,
    // when the user transitions from the content section to the frontpage
    // newSubsecs would be null, and subsecs 
    // would disappear from the ui during the animation
    const subsecsRef = useRef(null)
    if (sectionName) subsecsRef.current = subsecs

    return subsecsRef.current
}

export default useSubsecs