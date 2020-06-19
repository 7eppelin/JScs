import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const AnimatedSubsecsList = ({ 
    isShown, 
    keyValue,
    delayAnimation,
    children
}) => (
    <AnimatePresence exitBeforeEnter>
        {isShown && 
            <motion.ul
                key={keyValue}
                variants={variants}
                initial='hide'
                animate='appear'
                exit='hide'
                transition={delayAnimation ? { delay: 0.94 } : true }>

                {children}
            </motion.ul>}
    </AnimatePresence>
)

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