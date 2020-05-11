import React from 'react';
import styled from 'styled-components/macro';
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
        <StyledList height={isOpen ? features.length * 34 + 'px' : '0px'}>

            {features.map((feature, i) => (
                <FeatureItem i={i}
                    key={feature.id} 
                    feature={feature}
                    moveItem={moveItem} />
            ))}
        </StyledList>
)}

const StyledList = styled.ul`
    overflow: hidden;
    height: ${props => props.height};
    transition: .2s;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

export default FeatureList;