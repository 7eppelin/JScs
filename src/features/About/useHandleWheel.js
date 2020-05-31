import { useRef, useCallback } from 'react'
import { useElementScroll } from 'framer-motion'


const useHandleWheel = (
    pageRef, 
    activePage, 
    scrollPages, 
    setAnimationDirection
) => {
    const scroll = useElementScroll(pageRef)
    const counter = useRef(0)

    const handleWheel = useCallback(e => {
        // if the page isn't scrollable, 
        // its scrollProgress will always be 0
        const page = pageRef.current
        const isScrollable = page.scrollHeight > page.offsetHeight

        // scroll progress. values between 0 and 1
        const progress = scroll.scrollYProgress.current

        // if page is scrollable, progress = 1, 
        // and the user keeps scrolling down
        // OR
        // page is NOT scrollable && user scrolls down
        // 
        // scroll to the next page
        if ((isScrollable && progress === 1 && e.deltaY > 0) 
            || (!isScrollable && e.deltaY > 0)
        ) {
            if (counter.current < 0) counter.current = 0
            ++counter.current
            setAnimationDirection('up')
            if (counter.current > 8) {
                scrollPages('down', activePage)
            }
        }

        // scroll to the prev page
        if (progress === 0 && e.deltaY < 0) {
            if (counter.current > 0) counter.current = 0
            --counter.current
            setAnimationDirection('down')
            if (counter.current < -8) {
                scrollPages('up', activePage)
            }
        }
    }, [])

    return handleWheel
}

export default useHandleWheel