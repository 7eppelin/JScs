import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import SubsectionLink from './SubsectionLink';
import FeatureList from './FeatureList';


const makeFeaturesSelector = () => createSelector(
    state => state.data.features,
    (_, ids) => ids,

    (features, ids) => {
        // make sure the subsection with features finished fetching
        // otherwise, skip
        if (!ids?.length) return [];
        return ids.map(id => features[id])
    }
)


const FeatureMenu = ({ sub }) => {
    const [ featuresOpen, setFeaturesOpen ] = useState(false);
    const selectFeatures = useMemo(makeFeaturesSelector, []);

    // array of features in the right order
    const features = useSelector(state => selectFeatures(state, sub.children));


    return (
        <StyledFeatures>
            <SubsectionLink 
                withToggler={features.length > 0}
                to={`/${sub.sectionName}/${sub.name}`}
                label={sub.name}
                toggleFeatures={setFeaturesOpen}
                featuresOpen={featuresOpen} />

            <FeatureList subsecID={sub.id}
                ids={sub.children}
                features={features} 
                isOpen={featuresOpen} />
        </StyledFeatures>
    )
}


const StyledFeatures = styled.li`
    background: var(--gray5);
    border-radius: 3px;
    border: 1px solid var(--gray5);
    margin-bottom: 2px;
    transition: .2s;

    &:hover {
        background: var(--gray4);
    }
`;


export default FeatureMenu;