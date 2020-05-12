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

    return (
        <StyledItem drag='y'
            isDragging={isDragging}
            dragElastic={1}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragOriginY={dragOriginY}
            animate={isDragging ? 
                { zIndex: 5 } 
                : 
                { zIndex: 1, transition: { delay: .3} }
            }

            onDrag={(e, info) => {
                const dragged = info.point.y;

                if (dragged > 18) {
                    moveItem(i, i + 1)
                } 

                if (dragged < -18) {
                    moveItem(i, i - 1)
                }
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
            }}

            >

            <NavLink activeClassName='active'
                to={`/${feature.sectionName}/${feature.subsectionName}/${feature.name}`} >
                    {feature.name}
            </NavLink>
        </StyledItem>
    )
}


const StyledItem = styled(motion.li)`
    flex-grow: 1;
    box-shadow: ${props => props.isDragging && '0 0 25px -5px black'};

    a {
        display: block;
        transform: scale(${props => props.isDragging ? 1.15 : 1});
        height: 100%;
        padding-top: 8px;
        font-size: 1.4rem;
        text-align: left;
        padding-left: 36px;
        background: ${props => props.isDragging ? 'var(--black)' : 'var(--gray6)'};
        color: ${props => props.isDragging ? 'var(--orange2)' : 'var(--gray2)'};
        transition: .2s, transform .35s;
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