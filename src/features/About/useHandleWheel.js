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

    console.log('scroooooooooooooooooll')

    // should we scroll to the next page?
    const shouldScrollDown = e => {

        // if the user is not scrolling down, false
        if (e.deltaY < 0) return false
        // if this is the last page, false
        if (activePage === lastPage) return false

        const page = pageRef.current
        const isScrollable = page.scrollHeight > page.offsetHeight
        // scroll progress. values between 0 and 1
        const progress = scroll.scrollYProgress.current

        if (isScrollable && progress === 1) return true
        if (!isScrollable) return true
    }

    // scroll to the next page
    const scrollDown = () => {
        // reset the counter if needed and increment it
        if (counter.current < 0) counter.current = 0
        ++counter.current

        // spin the wheel. See ./PagesNav & ./PagesNavWheel
        wheel.current.spin(counter.current)
        // must set animationDirection before the actual scroll
        setAnimationDirection('up')

        if (counter.current > 15) {
            // reset the wheel and scroll to the next page
            wheel.current.spin(0)
            scrollPages(activePage + 1)
        }
    }

    // should we scroll to the prev page?
    const shouldScrollUp = e => {
        const progress = scroll.scrollYProgress.current

        // if at the start of the current page and
        // scrolling up and this is not the first page
        if (progress === 0 
            && e.deltaY < 0 
            && activePage !== 0
        ) { return true }

        return false
    }

    // scroll to the prev page
    const scrollUp = () => {
        // reset the counter if needed and decrement it
        if (counter.current > 0) counter.current = 0
        --counter.current

        // spin the wheel (arg should be positive)
        wheel.current.spin(-counter.current)
        // set animationDirection before scrolling
        setAnimationDirection('down')

        if (counter.current < -15) {
            // reset the wheel and scroll
            wheel.current.spin(0)
            scrollPages(activePage - 1)
        }
    }


    const handleWheel = e => {
        if (shouldScrollUp(e)) {
            scrollUp()
            return
        }
        if (shouldScrollDown(e)) {
            scrollDown()
        }
    }

    return handleWheel
}

export default useHandleWheel