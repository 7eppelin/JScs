import React from 'react';
import styled from 'styled-components/macro';

import FeatureItem from './FeatureItem';


const StyledList = styled.ul`
    overflow: hidden;
    height: ${props => props.height};
    transition: .2s;
    display: flex;
    flex-wrap: wrap;
`;

const calcHeight = (listLength) => {
    const rows = Math.ceil(listLength / 2);
    return rows * 34 + 'px';
} 

const FeatureList = ({ features, isOpen }) => (
    <StyledList height={isOpen ? calcHeight(features.length) : '0px'}>
        {features.map(feature => (
            <FeatureItem key={feature.id} feature={feature} />
        ))}
    </StyledList>
)

export default FeatureList;