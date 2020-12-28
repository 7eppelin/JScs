
import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { arrayMove, updateItemsOrderInDB } from 'utils'
import { reorderFeatures } from 'dataSlice'

import FeatureItem from './FeatureItem'


const FeaturesList = ({ 
    isOpen, 
    items = [], 
    subsecID 
}) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.user?.isAdmin)

    const saveNewOrder = () => {
        if (!isAdmin) return
        const ids = items.map(item => item.id)
        updateItemsOrderInDB(subsecID, ids)
    }

    const moveItem = (index, dragged) => {
        let target = index
        if (dragged > 20) target += 1
        if (dragged < -20) target -= 1

        if (target === items.length || target < 0 || index === target) return

        const newOrder = arrayMove(items, index, target)
        dispatch(reorderFeatures({ subsecID, newOrder }))
    }

    return (
        <motion.ul variants={variants}
            style={{ background: 'var(--gray4)' }}
            initial='closed'
            animate={isOpen && items.length ? 'open' : 'closed'}>

            {items.map((item, i) => (
                <FeatureItem key={item.id} 
                    handleDrag={dragged => moveItem(i, dragged)}
                    feature={item}
                    saveNewOrder={saveNewOrder} />
            ))}
        </motion.ul>
    )
}

const variants = {
    open: { height: 'auto' },
    closed: { height: 0, transition: {duration: .12} }
}


export default FeaturesList