
import { useRef } from 'react'
import { useSelector } from 'react-redux';

const useSubsecs = sectionName => {
    const subsecs = useSelector(state => state.data.subsecs[sectionName])

    // if we were simply returning the subsecs,
    // when the user transitions from the content section to the frontpage
    // subsecs would be null, and the subsecs menu
    // would disappear from the ui during the animation
    const subsecsRef = useRef(null)
    if (sectionName) subsecsRef.current = subsecs

    return subsecsRef.current
}

export default useSubsecs