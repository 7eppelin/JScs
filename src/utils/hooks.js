import { useRef, useState, useEffect } from 'react'


// returns a value from the previous render
// useful to access prev props/state
export const usePrevious = value => {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}


// can be used to skip the initial animation
export const useMount = () => {
    const [ isMount, setIsMount ] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsMount(false), 100)
    }, [])

    return isMount
}