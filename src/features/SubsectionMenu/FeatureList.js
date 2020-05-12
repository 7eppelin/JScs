import React from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { arrayMove } from 'utils'
import { reorderFeatures } from 'dataSlice'

import FeatureItem from './FeatureItem';


const FeatureList = ({ 
    subsecID,
    ids,
    features, 
    isOpen 
}) => {
    const dispatch = useDispatch()

    const moveItem = (current, target) => {
        const newOrder = arrayMove(ids, current, target);
        if (ids === newOrder) return;
        dispatch(reorderFeatures({ subsecID, newOrder }))
    }

    return (
        <StyledList variants={variants}
            animate={isOpen ? 'open' : 'closed'}>

            {features.map((feature, i) => (
                <FeatureItem i={i}
                    key={feature.id} 
                    feature={feature}
                    moveItem={moveItem} />
            ))}
        </StyledList>
)}

const StyledList = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    transform-origin: 50% 0;
`;

const variants = {
    open: {
        display: 'flex',
        scaleY: 1
    },
    closed: {
        scaleY: 0,
        transitionEnd: { display: 'none' }
    }
}

export default FeatureList;