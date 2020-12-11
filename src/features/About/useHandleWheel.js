import { useRef } from 'react'
import { useElementScroll } from 'framer-motion'


const useHandleWheel = (
    pageRef, 
    activePage, 
    lastPage,
    scrollPages, 
    setAnimationDirection,
    wheel
) => {
    const scroll = useElementScroll(pageRef)
    const counter = useRef(0)

    const shouldScrollDown = () => {
        if (activePage === lastPage) return false

        const page = pageRef.current
        const isScrollable = page.scrollHeight > page.offsetHeight
        // scroll progress. values between 0 and 1
        const progress = scroll.scrollYProgress.current

        if (isScrollable && progress === 1) return true
        if (!isScrollable) return true
    }

    const scrollDown = () => {
        ++counter.current
        wheel.current.spin(counter.current)
        setAnimationDirection('up')

        if (counter.current > 15) {
            wheel.current.spin(0)
            scrollPages(activePage + 1)
        }
    }

    const shouldScrollUp = () => {
        const progress = scroll.scrollYProgress.current
        return progress === 0 && activePage !== 0
    }

    const scrollUp = () => {
        --counter.current

        wheel.current.spin(-counter.current)
        setAnimationDirection('down')

        if (counter.current < -15) {
            wheel.current.spin(0)
            scrollPages(activePage - 1)
        }
    }


    const handleWheel = e => {
        // if the user scrolls down 
        if (e.deltaY > 0) {
            // if previously was scrolling up, reset
            if (counter.current < 0) {
                counter.current = 0
                wheel.current.spin(0)
            }
            if (shouldScrollDown()) scrollDown()
            
        // if the user scrolls up
        } else if (e.deltaY < 0) {
            // if previously was scrolling down, reset
            if (counter.current > 0) {
                counter.current = 0
                wheel.current.spin(0)
            }
            if (shouldScrollUp()) scrollUp()
        } 
    }

    return handleWheel
}

export default useHandleWheel