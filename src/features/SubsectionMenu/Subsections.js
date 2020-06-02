import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import FeatureMenu from './FeatureMenu';


const Subsections = ({ 
    subsecs, 
    reorderSubsecs, 
    saveNewOrder,
    shouldDelayAnimation }) => {

    const scrollbar = useRef();

    // feature menus' heights change as the user toggles open/close
    // we collect all menu's current heights in an array
    // this way each FeatureMenu will know the height of the prev/next item
    // so it can know when to swap positions when dragging
    const heights = useRef([])

    return (
        <div className='scrollbar'
            ref={scrollbar}>

            <AnimatePresence exitBeforeEnter>

                {subsecs && 
                    <motion.ul key={subsecs[0].id}
                        variants={variants}
                        initial='hide'
                        animate='appear'
                        exit='hide'
                        transition={shouldDelayAnimation ?
                            { delay: 0.94 } : true }>

                        {subsecs.map((subsec, i) => (
                            <FeatureMenu i={i}
                                heights={heights}
                                key={subsec.id} 
                                subsection={subsec}
                                reorderSubsecs={reorderSubsecs}
                                scrollbar={scrollbar}
                                saveNewOrder={saveNewOrder} />
                        ))}
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    )
}


const variants = {
    appear: {
        opacity: 1,
        scale: 1,
    },
    hide: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: .15 }
    }
}

export default Subsections