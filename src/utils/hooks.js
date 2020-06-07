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


// takes element's ref and a func to call 
// whenever the user clicks outside of the element
// useful for hiding elements on click outside
export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {

        const listener = event => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        }
  
        document.addEventListener('click', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('click', listener);
          document.removeEventListener('touchstart', listener);
        };
      }, [ref, handler])
  }