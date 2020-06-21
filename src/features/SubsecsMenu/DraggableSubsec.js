import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion'
import { scroll } from 'utils'



const DraggableSubsec = ({
    i,
    heights,
    reorder,
    scrollbar,
    dragControls,
    saveNewOrder,
    children,
}) => {
    const [ isDragging, setDragging ] = useState(false)
    const dragOriginY = useMotionValue(0)

    if (isDragging) console.log('subsec dragging')

    const onDrag = useCallback((_, info) => {
        const dragged = info.point.y;

        // heights of the prev/next elem
        const nextHeight = heights.current[i + 1]
        const prevHeight = heights.current[i - 1]

        // calculated distance of when to swap positions
        const next = nextHeight / 2 + 8
        const prev = prevHeight / 2 + 8

        if (dragged > next) reorder(i, i + 1)
        if (dragged < -prev) reorder(i, i - 1)

        // scroll when dragging
        scroll(scrollbar.current, info.delta.y, dragOriginY)
    }, [ i, reorder, dragOriginY, heights, scrollbar ])

    return (
        <StyledSubsec drag='y'
            dragControls={dragControls}
            dragElastic={1}
            dragOriginY={dragOriginY}
            dragConstraints={{ top: 0, bottom: 0 }}
            // this is for styling only (see StyledFeatures below)
            isDragging={isDragging}
            animate={isDragging ? 
                { zIndex: 5, scale: .92 } : 
                { zIndex: 1, scale: 1, transition: { delay: .3 }}
            }
            onDrag={onDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
                setDragging(false)
                saveNewOrder()
            }}
            positionTransition={({ delta }) => {
                if (isDragging) dragOriginY.set(dragOriginY.get() + delta.y)
                return !isDragging
            }} >

            {children}

        </StyledSubsec>
    )
}


const StyledSubsec = styled(motion.li)`
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid var(--gray5);
    margin-bottom: 2px;
    box-shadow: ${props => props.isDragging ? 
        '0 0 35px -5px black' : '' };
    transition: background .2s, box-shadow .2s;

    & a {
        background: ${props => props.isDragging && 'var(--gray4)'}
    }
`;

export default DraggableSubsec