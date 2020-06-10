import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit';

import { arrayMove, updateFeaturesOrderInDB } from 'utils'
import { reorderFeatures } from 'dataSlice'

import FeatureItem from './FeatureItem';



const makeFeaturesSelector = () => createSelector(
    state => state.data.features,
    (_, ids) => ids,

    (features, ids) => {
        // make sure the subsection with features
        // has finished fetching. Otherwise, skip
        const arr = Object.values(features)
        if (!ids?.length || !arr.length) return [];
        return ids.map(id => features[id])
    }
)


const FeatureList = ({ 
    subsecID,
    ids, 
    isOpen 
}) => {
    const dispatch = useDispatch()
    const selectFeatures = useMemo(makeFeaturesSelector, [])

    // array of features in the right order
    const features = useSelector(state => selectFeatures(state, ids));

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