import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { motion, useMotionValue } from 'framer-motion'
import { NavLink } from 'react-router-dom'


const FeatureItem = ({ 
    i,
    feature,
    moveItem,
    updateOrderInDB
}) => {
    const [ isDragging, setDragging ] = useState(false)
    const dragOriginY = useMotionValue(0);

    const { name, sectionName, subsectionName } = feature;

    return (
        <StyledItem drag='y'
            dragElastic={1}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragOriginY={dragOriginY}

            isDragging={isDragging}
            animate={isDragging ? { scale: .92 } : { scale: 1 } }

            onDrag={(e, info) => {
                const dragged = info.point.y;
                if (dragged > 20) moveItem(i, i + 1)
                if (dragged < -20) moveItem(i, i - 1)
            }}

            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
                setDragging(false)
                updateOrderInDB()
            }}

            positionTransition={({ delta }) => {
                if (isDragging) {
                    dragOriginY.set(dragOriginY.get() + delta.y)
                }
                return !isDragging
            }} >

            <NavLink activeClassName='active'
                draggable={false}
                to={`/${sectionName}/${subsectionName}/${name}`} >
                    {name}
            </NavLink>
        </StyledItem>
    )
}


const StyledItem = styled(motion.li)`
    box-shadow: ${props => props.isDragging && '0 0 30px -6px black'};
    position: relative;
    z-index: ${props => props.isDragging ? 5 : 0 };

    a {
        display: block;
        height: 100%;
        padding: 7px;
        padding-left: 36px;
        font-size: 1.4rem;
        text-align: left;
        background: ${props => props.isDragging ? 'var(--black)' : 'var(--gray6)'};
        color: ${props => props.isDragging ? 'var(--orange2)' : 'var(--gray2)'};
    }

    a:hover {
        background: var(--black);
        color: var(--orange2);
    }

    a.active {
        background: var(--black);
        color: var(--orange2);
    }
`;

export default FeatureItem;