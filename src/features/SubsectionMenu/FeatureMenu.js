import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { motion, useMotionValue, useDragControls } from 'framer-motion'
import { scroll } from 'utils'


import SubsectionLink from './SubsectionLink';
import FeatureList from './FeatureList';


// this component is way too big and messy
// probably need to extract smth
// not sure what though

const makeFeaturesSelector = () => createSelector(
    state => state.data.features,
    (_, ids) => ids,

    (features, ids) => {
        // make sure the subsection with features
        // has finished fetching. Otherwise, skip
        if (!ids?.length) return [];
        return ids.map(id => features[id])
    }
)


const FeatureMenu = ({ 
    i, 
    heights, 
    subsection, 
    moveSubsection,
    scrollbar,
    updateOrderInDB
}) => {
    const [ featuresOpen, setFeaturesOpen ] = useState(false)
    const [ isDragging, setDragging ] = useState(false)
    const dragOriginY = useMotionValue(0)
    const selectFeatures = useMemo(makeFeaturesSelector, [])

    const { name, id, sectionName, children: featuresIDs } = subsection

    // set the item's current height, so the siblings can know it
    heights.current[i] = featuresOpen ? 
        47 + featuresIDs.length * 32 : 47

    // array of features in the right order
    const features = useSelector(state => selectFeatures(state, featuresIDs));

    // dragging starts onMouseDown on a nested component (SubsectionLink)
    const dragControls = useDragControls();
    const startDrag = e => dragControls.start(e)

    const onDrag = useCallback((e, info) => {
        const dragged = info.point.y;

        // heights of the prev/next elem
        const nextHeight = heights.current[i + 1]
        const prevHeight = heights.current[i - 1]

        // calculated distance of when to swap positions
        const next = nextHeight / 2 + 8
        const prev = prevHeight / 2 + 8

        if (dragged > next) {
            moveSubsection(i, i + 1)
        }

        if (dragged < -prev) {
            moveSubsection(i, i - 1)
        }

        // scroll when dragging
        scroll(scrollbar.current, info.delta.y, dragOriginY)

    }, [ i, moveSubsection ])

    return (
        <StyledFeatures drag='y'
            dragControls={dragControls}
            dragElastic={1}
            dragOriginY={dragOriginY}
            dragConstraints={{ top: 0, bottom: 0 }}

            // this is for styling only (see StyledFeatures below)
            isDragging={isDragging}

            animate={isDragging ? 
                { zIndex: 5, scale: 0.92 } : 
                { zIndex: 1, scale: 1, transition: { delay: 0.3 } }
            }

            onDrag={onDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
                setDragging(false)
                updateOrderInDB()
            }}
            
            positionTransition={({ delta }) => {
                if (isDragging) dragOriginY.set(dragOriginY.get() + delta.y)
                return !isDragging
            }} 
            >

            <SubsectionLink 
                withToggler={features.length > 0}
                to={`/${sectionName}/${name}`}
                label={name}
                toggleFeatures={setFeaturesOpen}
                featuresOpen={featuresOpen}
                startDrag={startDrag}
                isDragging={isDragging} />

            <FeatureList 
                subsecID={id}
                ids={featuresIDs}
                features={features} 
                isOpen={featuresOpen} />

        </StyledFeatures>
    )
}


const StyledFeatures = styled(motion.li)`
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid var(--gray5);
    margin-bottom: 2px;
    box-shadow: ${props => props.isDragging && '0 0 35px -5px black'};
    transition: background .2s, box-shadow .2s;
`;


export default FeatureMenu;