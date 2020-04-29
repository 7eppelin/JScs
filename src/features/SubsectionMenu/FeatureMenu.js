import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import SubsectionLink from './SubsectionLink';
import FeatureList from './FeatureList';

const makeFeaturesSelector = () => 
    createSelector(
        state => state.data.features.byID,
        (_, subsec) => subsec,
        (features, subsec) => {
            const featuresArr = Object.values(features);
            return featuresArr.filter(feature => (
                feature.sectionName === subsec.sectionName 
                && 
                feature.subsectionName === subsec.name
            ))
        }
    )


const StyledFeatures = styled.li`
    background: var(--gray5);
    border-radius: 3px;
    border: 1px solid var(--gray5);
    margin-bottom: 2px;
    transition: .2s;

    &:hover {
        background: var(--gray4);
    }

    a {
        color: var(--white);
    }
`;


const FeatureMenu = ({ sub }) => {
    const [ featuresOpen, setFeaturesOpen ] = useState(false);
    const featuresSelector = useMemo(makeFeaturesSelector, []);
    const features = useSelector(state => featuresSelector(state, sub))

    return (
        <StyledFeatures>
            <SubsectionLink withToggler={features.length > 0}
                        to={`/${sub.sectionName}/${sub.name}`}
                        label={sub.name}
                        toggleFeatures={setFeaturesOpen}
                        featuresOpen={featuresOpen} />
            <FeatureList features={features} isOpen={featuresOpen} />
        </StyledFeatures>
    )
}

export default FeatureMenu;