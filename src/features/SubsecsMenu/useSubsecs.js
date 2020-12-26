
import { useRef } from 'react'
import { useSelector } from 'react-redux';

const useSubsecs = sectionName => {
    const subsecs = useSelector(state => state.data.subsecs[sectionName])

    // if we were simply returning the subsecs,
    // the entire menu would dissapear from the ui
    // whenever the user goes from the content section to the frontpage,
    // because in this case subsecs would be undefined
    const subsecsRef = useRef(null)
    if (sectionName) subsecsRef.current = subsecs

    return subsecsRef.current
}

export default useSubsecs