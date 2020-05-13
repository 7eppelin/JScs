import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import { arrayMove } from 'utils'
import { reorderFeatures } from 'dataSlice'
import { updateFeaturesOrderInDB } from 'utils'

import FeatureItem from './FeatureItem';


const FeatureList = ({ 
    subsecID,
    ids,
    features, 
    isOpen 
}) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.user?.isAdmin)

    const updateOrderInDB = () => {
        if (isAdmin) updateFeaturesOrderInDB(subsecID, ids)
    }

    const moveItem = (current, target) => {
        const newOrder = arrayMove(ids, current, target);
        if (ids === newOrder) return;
        dispatch(reorderFeatures({ subsecID, newOrder }))
    }

    return (
        <StyledList variants={variants}
            initial={isOpen ? 'open' : 'closed'}
            animate={isOpen ? 'open' : 'closed'}>

            {features.map((feature, i) => (
                <FeatureItem i={i}
                    key={feature.id} 
                    feature={feature}
                    moveItem={moveItem}
                    updateOrderInDB={updateOrderInDB} />
            ))}
        </StyledList>
)}

const StyledList = styled(motion.ul)`
    
`;

const variants = {
    open: { height: 'auto' },
    closed: { height: 0 }
}

export default FeatureList;