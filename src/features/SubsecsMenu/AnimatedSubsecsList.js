import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrevious } from 'utils'


const AnimatedSubsecsList = ({ 
    isShown, 
    keyValue,
    delayAnimation,
    children
}) => {
    // prevents the List from animating
    // when the user goes to the front-page (keyValue = undefined)
    const prevKey = usePrevious(keyValue)

    return (
        <AnimatePresence exitBeforeEnter>
            {isShown && 
                <motion.ul
                    key={keyValue || prevKey}
                    variants={variants}
                    initial='hide'
                    animate='appear'
                    exit='hide'
                    transition={delayAnimation ? { delay: 0.94 } : true }>

                    {children}
                </motion.ul>}
        </AnimatePresence>
    )
}

const variants = {
    appear: {
        opacity: 1,
        scale: 1,
    },
    hide: {
        opacity: 0,
        scale: 0.7,
        transition: { duration: .15 }
    }
}

export default AnimatedSubsecsList